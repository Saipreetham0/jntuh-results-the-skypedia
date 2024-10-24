// types/calendar.ts
export interface ExamEvent {
    id: string;
    title: string;
    date: Date;
    subject: string;
    duration: string;
    color?: string;
  }