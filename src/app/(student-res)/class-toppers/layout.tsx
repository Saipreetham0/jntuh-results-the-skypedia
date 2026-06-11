import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Class Toppers & Analytics | Compare Your Batch Performance',
  description: 'See the JNTUH class toppers for your batch and compare your CGPA ranking. View grade distribution charts, batch statistics, and find out where you stand in your class.',
  path: '/class-toppers',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
