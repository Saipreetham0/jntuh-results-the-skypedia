import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH B.Tech Syllabus 2026 | R22, R18, R16 All Branches',
  description: 'Access the complete JNTUH B.Tech syllabus for all branches and regulations. Download subject-wise syllabi for CSE, ECE, EEE, ME, CE in R22, R18, and R16.',
  path: '/syllabus',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
