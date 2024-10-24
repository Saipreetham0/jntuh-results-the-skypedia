// app/calendar/page.tsx
'use client';

import { useState } from 'react';
import ExamCalendar from '@/components/ExamCalendar';
import { ExamEventModal } from '@/components/ExamEventModal';

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  subject: string;
  duration: string;
  color?: string;
}

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<ExamEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event: ExamEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    // <div className="container mx-auto p-4">
    // min-h-screen
     <div className="p-2 sm:p-4  mx-auto bg-gray-50">
      <ExamCalendar onEventClick={handleEventClick} />
      <ExamEventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}