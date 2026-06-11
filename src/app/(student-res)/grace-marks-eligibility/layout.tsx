import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Grace Marks Eligibility Checker | Check If You Qualify',
  description: 'Check your JNTUH grace marks eligibility instantly. Find out which subjects qualify for grace marks based on internal marks, attendance, and JNTUH R22/R18 rules.',
  path: '/grace-marks-eligibility',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
