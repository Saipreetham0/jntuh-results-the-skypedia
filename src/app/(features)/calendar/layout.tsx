import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Academic Calendar 2025-26 | Exam Schedule & Important Dates',
  description: 'Track the JNTUH academic calendar 2025-26. View semester exam schedules, mid-term dates, university holidays, and all key academic events in one place.',
  path: '/calendar',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
