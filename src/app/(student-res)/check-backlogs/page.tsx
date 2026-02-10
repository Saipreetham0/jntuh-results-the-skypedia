// app/backlogs/page.tsx
import BacklogsPage from '@/components/features/backlogs-page';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Backlogs Checker - Check Your Pending Subjects (R22, R18, R16)',
  description: 'Check all your pending backlogs from JNTUH engineering courses. Get a complete list of failed subjects across all semesters instantly.',
  path: '/check-backlogs'
});

export default function BacklogsChecker() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Check Backlogs', path: '/check-backlogs' }
        ]}
      />
      <WebApplicationSchema
        name="JNTUH Backlog Checker"
        description="Automated tool to fetch and display pending subjects for JNTUH students."
        url="/check-backlogs"
      />
      <BacklogsPage />
    </>
  );
}