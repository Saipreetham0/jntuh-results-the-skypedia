import { Metadata } from 'next';
import Script from 'next/script';
import { calculatorMetadata } from '@/lib/seo/metadata';
import { calculatorSchemas, generateBreadcrumbSchema } from '@/lib/seo/schema';

// Generate metadata
export const metadata: Metadata = calculatorMetadata.cgpaCalculator();

export default function CGPACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate schemas
  const calculatorSchema = calculatorSchemas.cgpaCalculator();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jntuhresults.theskypedia.com' },
    { name: 'CGPA Calculator', url: 'https://jntuhresults.theskypedia.com/cgpa-calculator' },
  ]);

  return (
    <>
      {/* JSON-LD Schemas */}
      <Script
        id="calculator-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
