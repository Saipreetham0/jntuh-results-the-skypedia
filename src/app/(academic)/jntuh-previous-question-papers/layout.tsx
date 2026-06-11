import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Previous Question Papers 2024-2026 | All Branches & Regulations PDF',
  description: 'Download JNTUH previous question papers for all branches (CSE, ECE, EEE, ME, CE) and regulations (R22, R18, R16). Free PDF downloads to ace your semester exams.',
  path: '/jntuh-previous-question-papers',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
