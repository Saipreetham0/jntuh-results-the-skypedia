import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Consolidated Results | All Semester Marks, CGPA & Grade Report',
  description: 'View your complete JNTUH consolidated results across all semesters in one place. Check CGPA, SGPA trends, subject grades, credits earned, and download your full grade report.',
  path: '/consolidated-results',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
