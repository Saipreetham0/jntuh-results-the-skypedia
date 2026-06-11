import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Contact Us | JNTUH Results - TheSkypedia',
  description: 'Get in touch with the JNTUH Results team at TheSkypedia. Report issues, request features, or ask questions about CGPA calculators and result tools.',
  path: '/contact',
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
