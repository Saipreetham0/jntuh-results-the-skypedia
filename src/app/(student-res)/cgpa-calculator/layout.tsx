import { Metadata } from 'next';
import { calculatorMetadata } from '@/lib/seo/metadata';
import { calculatorSchemas, generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = calculatorMetadata.cgpaCalculator();

export default function CGPACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const calculatorSchema = calculatorSchemas.cgpaCalculator();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jntuhresults.theskypedia.com' },
    { name: 'CGPA Calculator', url: 'https://jntuhresults.theskypedia.com/cgpa-calculator' },
  ]);

  return (
    <>
      <script
        id="calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
