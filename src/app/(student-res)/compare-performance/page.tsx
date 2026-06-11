import type { Metadata } from 'next';
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

// page.tsx
export default function FeaturePage() {
  return (
    <ComingSoon
      title="Grade Analytics Coming Soon"
      description="Advanced analytics and insights for your academic performance"
      features={[
        "Semester-wise Analysis 📊",
        "Performance Trends 📈",
        "Custom Reports 📄",
        "Grade Predictions 🎯",
      ]}
      googleFormUrl="https://wa.me/919550421866"
    />
  );
}
