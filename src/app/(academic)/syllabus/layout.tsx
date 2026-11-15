import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { generateMetadata } from '@/lib/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Syllabus 2026 PDF - R22, R18, R16 All Branches & Regulations',
  description: 'Download official JNTUH syllabus PDF for all branches (CSE, ECE, EEE, ME, Civil, IT) and regulations (R22, R18, R16). Access course structure and subject curriculum.',
  path: '/syllabus',
});

const syllabusFaqs = [
  {
    question: 'Where can I download the official JNTUH R22 syllabus PDF?',
    answer: 'You can download the official JNTUH R22 B.Tech, M.Tech, and B.Pharmacy syllabus PDFs directly from our repository or from the JNTUH Online Student Services (OSS) portal. All semesters (1st to 4th year) are available for all branches.',
  },
  {
    question: 'What is the internal and external marks weightage in JNTUH R22?',
    answer: 'Under the JNTUH R22 regulation, the assessment pattern is 40 marks for Continuous Internal Evaluation (CIE) and 60 marks for Semester End Examination (SEE), compared to 25/75 in R18.',
  },
  {
    question: 'How many credits are required to complete B.Tech in JNTUH R22 & R18?',
    answer: 'For both R22 and R18 regulations, a student must secure 160 credits for the award of a B.Tech regular degree (120 credits for lateral entry students).',
  },
  {
    question: 'Are autonomous colleges under JNTUH following the same syllabus?',
    answer: 'No. Autonomous colleges affiliated with JNTUH design their own curriculum approved by their Academic Council. Non-autonomous affiliated colleges strictly follow the university syllabus provided here.',
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Syllabus', path: '/syllabus' },
        ]}
      />
      <FAQSchema faqs={syllabusFaqs} />
      {children}
    </>
  );
}
