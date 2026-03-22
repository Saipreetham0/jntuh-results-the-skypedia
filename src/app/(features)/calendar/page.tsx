'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ExamCalendar from '@/components/calendar/ExamCalendar';
import { ExamEventModal } from '@/components/calendar/ExamEventModal';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1C61E7] transition-colors mb-4">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1C61E7] mb-2">JNTUH</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Academic Calendar
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Stay updated with JNTUH exam dates, semester schedules, and important deadlines.
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExamCalendar onEventClick={handleEventClick} />
      </div>

      <ExamEventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
