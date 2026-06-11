import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Results Blog | Guides, Tips & Academic Resources',
  description: 'Expert guides on JNTUH results, CGPA calculation, grading system, backlog clearing, and academic strategies. Stay informed with the latest JNTUH updates and tips.',
  path: '/blog',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
