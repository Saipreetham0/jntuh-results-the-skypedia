import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon, Clock } from 'lucide-react';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="space-y-4 p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>
                {event.date.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {event.date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {' - '}
                {new Date(event.date.getTime() + parseInt(event.duration) * 60000)
                  .toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </span>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium">Subject</h4>
              <p className="text-sm text-gray-600">{event.subject}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium">Duration</h4>
              <p className="text-sm text-gray-600">
                {parseInt(event.duration) / 60} hours
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}