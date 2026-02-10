import React from "react";
import CGPACalculatorComponent from "@/components/features/converter/CGPACalculator";
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export const metadata: Metadata = generateMetadata({
  title: 'CGPA to Percentage Converter - JNTUH & International Scales',
  description: 'Convert your JNTUH CGPA into a percentage instantly. Supports 10.0, 4.0, and 5.0 scales with official university conversion formulas.',
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
