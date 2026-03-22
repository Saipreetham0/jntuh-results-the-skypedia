import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  subject: string;
  duration: string;
  color?: string;
}

interface ExamCalendarProps {
  onEventClick: (event: ExamEvent) => void;
  branch?: string;
  semester?: string;
}

type ViewType = "month" | "week" | "day";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const useExams = (branch?: string, semester?: string) => {
  const [events, setEvents] = useState<ExamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
    setEvents([]);
  }, [branch, semester]);

  return { events, loading, error };
};

export default function ExamCalendar({ onEventClick, branch, semester }: ExamCalendarProps) {
  const { events, loading, error } = useExams(branch, semester);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<ViewType>("month");

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#1C61E7] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center h-64">
        <p className="text-sm text-red-500">Error loading exams: {error}</p>
      </div>
    );
  }

  const navigateToday = () => setCurrentDate(new Date());
  const navigatePrevious = () => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() - 1);
    else if (view === "week") d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const navigateNext = () => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() + 1);
    else if (view === "week") d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const getEventsForDate = (date: Date) =>
    events.filter((e) => {
      const ed = new Date(e.date);
      return ed.getDate() === date.getDate() && ed.getMonth() === date.getMonth() && ed.getFullYear() === date.getFullYear();
    });

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getMonthGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    for (let i = firstDay - 1; i >= 0; i--)
      days.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    for (let i = 1; i <= daysInMonth; i++)
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    for (let i = 1; days.length < 42; i++)
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });

    return days;
  };

  const today = new Date();
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isSelected = (date: Date) => selectedDate?.toDateString() === date.toDateString();

  const renderMonthView = () => (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="py-2.5 text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {getMonthGrid().map(({ date, isCurrentMonth }, i) => {
          const dayEvents = getEventsForDate(date);
          const todayCell = isToday(date);
          const selectedCell = isSelected(date);

          return (
            <div
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`
                min-h-[88px] p-1.5 border-b border-r border-gray-50 dark:border-gray-800/60 cursor-pointer transition-colors
                ${isCurrentMonth ? "bg-white dark:bg-gray-900 hover:bg-blue-50/40 dark:hover:bg-blue-900/10" : "bg-gray-50/60 dark:bg-gray-800/30"}
                ${selectedCell ? "ring-2 ring-inset ring-[#1C61E7]/40" : ""}
                ${i % 7 === 0 ? "border-l-0" : ""}
              `}
            >
              {/* Date number */}
              <div className="flex justify-start mb-1">
                <span className={`
                  inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold
                  ${todayCell ? "bg-[#1C61E7] text-white" : isCurrentMonth ? "text-gray-700 dark:text-gray-200" : "text-gray-300 dark:text-gray-600"}
                `}>
                  {date.getDate()}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-0.5">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                    className="text-[10px] px-1.5 py-0.5 rounded-md font-medium truncate cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: event.color || "#1C61E7", color: "white" }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-[10px] text-gray-400 px-1">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {events.length === 0 && (
        <div className="py-16 text-center border-t border-gray-50 dark:border-gray-800">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
            <CalendarDays className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          </div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">No exams scheduled</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Exam dates will appear here once announced by JNTUH.</p>
        </div>
      )}
    </div>
  );

  const renderWeekView = () => (
    <div>
      {/* Week day headers */}
      <div className="grid grid-cols-8 border-b border-gray-100 dark:border-gray-800">
        <div className="py-3 border-r border-gray-100 dark:border-gray-800" />
        {getWeekDates().map((date, i) => {
          const todayCell = isToday(date);
          return (
            <div key={i} className={`py-3 text-center ${todayCell ? "bg-blue-50/60 dark:bg-blue-900/10" : ""}`}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{DAYS_SHORT[date.getDay()]}</div>
              <div className={`mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${todayCell ? "bg-[#1C61E7] text-white" : "text-gray-700 dark:text-gray-200"}`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="overflow-auto max-h-[520px]">
        {Array.from({ length: 24 }, (_, h) => (
          <div key={h} className="grid grid-cols-8 border-b border-gray-50 dark:border-gray-800/50 min-h-[52px]">
            <div className="px-3 py-1 border-r border-gray-100 dark:border-gray-800 text-xs text-gray-400 font-medium">
              {h.toString().padStart(2, "0")}:00
            </div>
            {getWeekDates().map((date, i) => {
              const dayEvents = getEventsForDate(date).filter((e) => new Date(e.date).getHours() === h);
              return (
                <div key={i} className="p-1 relative">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-[10px] px-1.5 py-0.5 rounded-md font-medium cursor-pointer truncate"
                      style={{ backgroundColor: event.color || "#1C61E7", color: "white" }}
                      onClick={() => onEventClick(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayView = () => (
    <div>
      <div className="py-3 px-4 border-b border-gray-100 dark:border-gray-800 text-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {DAYS_SHORT[currentDate.getDay()]}, {currentDate.getDate()} {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
      </div>
      <div className="overflow-auto max-h-[520px]">
        {Array.from({ length: 24 }, (_, h) => {
          const dayEvents = getEventsForDate(currentDate).filter((e) => new Date(e.date).getHours() === h);
          return (
            <div key={h} className="flex border-b border-gray-50 dark:border-gray-800/50 min-h-[52px]">
              <div className="w-16 flex-shrink-0 px-3 py-1 text-xs text-gray-400 font-medium border-r border-gray-100 dark:border-gray-800">
                {h.toString().padStart(2, "0")}:00
              </div>
              <div className="flex-1 p-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs px-2 py-1 rounded-md font-medium cursor-pointer inline-block"
                    style={{ backgroundColor: event.color || "#1C61E7", color: "white" }}
                    onClick={() => onEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const viewLabel = view === "month"
    ? `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    : view === "week"
    ? (() => { const w = getWeekDates(); return `${w[0].getDate()} – ${w[6].getDate()} ${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`; })()
    : `${currentDate.getDate()} ${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">

        {/* Left: nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={navigateToday}
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
          >
            Today
          </button>
          <div className="flex items-center">
            <button
              onClick={navigatePrevious}
              className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={navigateNext}
              className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            {viewLabel}
          </h2>
        </div>

        {/* Right: view toggle */}
        <div className="flex bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-0.5">
          {(["month", "week", "day"] as ViewType[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                view === v
                  ? "bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Body */}
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
    </div>
  );
}
