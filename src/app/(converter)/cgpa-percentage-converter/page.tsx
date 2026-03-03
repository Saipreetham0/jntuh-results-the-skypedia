import React from "react";
import CGPACalculatorComponent from "@/components/features/converter/CGPACalculator";
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export const metadata: Metadata = generateMetadata({
  title: 'CGPA to Percentage Converter — JNTUH (R22, R18) Free Online',
  description: 'Convert JNTUH CGPA to percentage using official formula (CGPA - 0.5) × 10. Supports R22, R18 regulations and 10.0, 4.0, 5.0 scales. Free instant conversion.',
  path: '/cgpa-percentage-converter'
});

export default function CGPAConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'CGPA to Percentage Converter', path: '/cgpa-percentage-converter' }
        ]}
      />
      <WebApplicationSchema
        name="CGPA to Percentage Converter"
        description="A multi-scale GPA/CGPA to marks percentage conversion tool."
        url="/cgpa-percentage-converter"
      />
      <CGPACalculatorComponent />
    </>
  );
}
