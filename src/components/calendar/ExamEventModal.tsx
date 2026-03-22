import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { CalendarDays, Clock, BookOpen, Timer } from 'lucide-react';

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  subject: string;
  duration: string;
  color?: string;
}

interface ExamEventModalProps {
  event: ExamEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExamEventModal({ event, isOpen, onClose }: ExamEventModalProps) {
  if (!event) return null;

  const endTime = new Date(event.date.getTime() + parseInt(event.duration) * 60000);
  const durationHours = parseInt(event.duration) / 60;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[360px] p-0 overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl gap-0">

        {/* Colour accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: event.color || '#1C61E7' }} />

        <div className="px-5 py-5">
          <DialogTitle className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-4">
            {event.title}
          </DialogTitle>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <CalendarDays className="h-4 w-4 text-[#1C61E7] flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                {event.date.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <Clock className="h-4 w-4 text-[#1C61E7] flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {' – '}
                {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Subject</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{event.subject}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{durationHours} hr{durationHours !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
