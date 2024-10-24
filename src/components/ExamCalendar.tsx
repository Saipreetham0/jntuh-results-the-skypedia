import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Types
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
}

type ViewType = "month" | "week" | "day";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ExamCalendarProps {
  onEventClick: (event: ExamEvent) => void;
  branch?: string;
  semester?: string;
}

// Custom hook for fetching exam data
const useExams = (branch?: string, semester?: string) => {
  const [events, setEvents] = useState<ExamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        let query = supabase.from("exams").select("*");

        if (branch) {
          query = query.eq("branch", branch);
        }
        if (semester) {
          query = query.eq("semester", semester);
        }

        const { data, error } = await query;

        if (error) throw error;

        const formattedEvents = data.map((exam) => ({
          ...exam,
          date: new Date(exam.date),
          id: exam.id.toString(),
        }));

        setEvents(formattedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [branch, semester]);

  return { events, loading, error };
};

// export default function ExamCalendar({ onEventClick }: ExamCalendarProps) {

export default function ExamCalendar({
  onEventClick,
  branch,
  semester,
}: ExamCalendarProps) {
  //   const [events] = useState<ExamEvent[]>([
  //     {
  //       id: "1",
  //       title: "Mathematics Final",
  //       date: new Date(2024, 9, 15, 10, 0),
  //       subject: "Mathematics",
  //       duration: "180",
  //       color: "#4285f4",
  //     },
  //     {
  //       id: "2",
  //       title: "Physics Lab",
  //       date: new Date(2024, 9, 16, 14, 30),
  //       subject: "Physics",
  //       duration: "120",
  //       color: "#ea4335",
  //     },
  //   ]);
  const { events, loading, error } = useExams(branch, semester);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<ViewType>("month");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading exams: {error}
      </div>
    );
  }

  // Navigation functions
  const navigateToday = () => setCurrentDate(new Date());
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case "day":
        newDate.setDate(currentDate.getDate() - 1);
        break;
    }
    setCurrentDate(newDate);
  };
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case "day":
        newDate.setDate(currentDate.getDate() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get week dates
  const getWeekDates = () => {
    const dates = [];
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Get hours for day view
  const getHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  // Get month grid
  const getMonthGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month, -i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const renderMonthView = () => (
    <div className="grid grid-cols-7 flex-1">
      {/* Day headers */}
      {DAYS.map((day) => (
        <div key={day} className="p-2 border-b font-semibold text-center">
          <span className="hidden sm:inline">{day}</span>
          <span className="sm:hidden">{day.slice(0, 3)}</span>
        </div>
      ))}

      {/* Calendar days */}
      {getMonthGrid().map(({ date, isCurrentMonth }, index) => {
        const dayEvents = getEventsForDate(date);
        const isToday = date.toDateString() === new Date().toDateString();
        const isSelected = selectedDate?.toDateString() === date.toDateString();

        return (
          <div
            key={index}
            className={`min-h-[80px] sm:min-h-[120px] p-1 border relative ${
              isCurrentMonth ? "bg-white" : "bg-gray-50"
            } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            <div
              className={`flex justify-center items-center h-6 w-6 rounded-full mb-1 ${
                isToday ? "bg-blue-500 text-white" : ""
              }`}
            >
              {date.getDate()}
            </div>
            <div className="space-y-1">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="text-xs p-1 rounded cursor-pointer truncate"
                  style={{ backgroundColor: event.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <span className="text-white">{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderWeekView = () => (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 border-r"></div>
        {getWeekDates().map((date, index) => (
          <div
            key={index}
            className={`p-2 text-center ${
              date.toDateString() === new Date().toDateString()
                ? "bg-blue-50"
                : ""
            }`}
          >
            <div className="font-semibold">
              <span className="hidden sm:inline">{DAYS[date.getDay()]}</span>
              <span className="sm:hidden">{DAYS_SHORT[date.getDay()]}</span>
            </div>
            <div>{date.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        {getHours().map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
            <div className="p-1 border-r text-xs">
              {hour.toString().padStart(2, "0")}:00
            </div>
            {getWeekDates().map((date, index) => {
              const dayEvents = getEventsForDate(date).filter(
                (event) => new Date(event.date).getHours() === hour
              );
              return (
                <div key={index} className="p-1 relative">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded cursor-pointer absolute w-full"
                      style={{ backgroundColor: event.color }}
                      onClick={() => onEventClick(event)}
                    >
                      <span className="text-white truncate">{event.title}</span>
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
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b text-center font-semibold">
        {DAYS[currentDate.getDay()]}, {currentDate.getDate()}{" "}
        {MONTHS[currentDate.getMonth()]}
      </div>
      <div className="flex-1 overflow-auto">
        {getHours().map((hour) => {
          const dayEvents = getEventsForDate(currentDate).filter(
            (event) => new Date(event.date).getHours() === hour
          );
          return (
            <div key={hour} className="grid grid-cols-1 border-b min-h-[60px]">
              <div className="p-2 relative">
                <span className="text-xs">
                  {hour.toString().padStart(2, "0")}:00
                </span>
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded cursor-pointer ml-12"
                    style={{ backgroundColor: event.color }}
                    onClick={() => onEventClick(event)}
                  >
                    <span className="text-white">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      {/* <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={navigateToday}
              className="text-sm"
            >
              Today
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <Select
            value={view}
            onValueChange={(value: ViewType) => setView(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div> */}

<div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={navigateToday} className="text-sm">
              Today
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <Select value={view} onValueChange={(value: ViewType) => setView(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-auto">
        {view === "month" && renderMonthView()}
        {view === "week" && renderWeekView()}
        {view === "day" && renderDayView()}
      </div>
    </div>
  );
}
