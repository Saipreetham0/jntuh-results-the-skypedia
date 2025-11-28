// // Example usage in your pages:
// import ComingSoon from "@/components/coming-soon";
// import BacklogsPage from '@/components/features/backlogs-page';


// // page.tsx
// export default function FeaturePage() {
//   return (
//     <ComingSoon
//       title="Grade Analytics Coming Soon"
//       description="Advanced analytics and insights for your academic performance"
//       features={[
//         "Semester-wise Analysis 📊",
//         "Performance Trends 📈",
//         "Custom Reports 📄",
//         "Grade Predictions 🎯",
//       ]}
//       googleFormUrl="https://wa.me/919550421866"
//     />
//   );
// }


// app/backlogs/page.tsx
import BacklogsPage from '@/components/features/backlogs-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JNTUH Backlogs Checker - Check Your Pending Subjects',
  description: 'Check all your pending backlogs from JNTUH engineering courses. Get a complete list of failed subjects across all semesters.',
  keywords: 'JNTUH backlogs, JNTUH failed subjects, JNTUH pending exams, JNTU Hyderabad results, engineering backlogs'
};

export default function BacklogsChecker() {
  return <BacklogsPage />;
}