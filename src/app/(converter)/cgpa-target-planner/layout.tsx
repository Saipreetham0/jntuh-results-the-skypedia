import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'CGPA Target Planner | Calculate Required SGPA per Semester - JNTUH',
  description: 'Plan your academic path with the JNTUH CGPA Target Planner. Enter your current CGPA and target, and instantly see the SGPA you need each remaining semester to reach your goal.',
  path: '/cgpa-target-planner',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
