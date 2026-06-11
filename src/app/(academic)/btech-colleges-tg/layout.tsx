import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Top B.Tech Colleges in Telangana 2026 | JNTUH Engineering Colleges List',
  description: 'Explore the best B.Tech engineering colleges in Telangana affiliated with JNTUH. Compare rankings, courses, fees, and facilities for CSE, ECE, EEE, ME, and Civil branches.',
  path: '/btech-colleges-tg',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
