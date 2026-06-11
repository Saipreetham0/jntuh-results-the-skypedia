import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Notifications | Latest University Circulars & Exam Alerts',
  description: 'Stay updated with the latest JNTUH notifications, circulars, exam schedules, and result announcements. Get instant alerts for all JNTUH academic updates.',
  path: '/notifications',
});

export default function NotificationsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
