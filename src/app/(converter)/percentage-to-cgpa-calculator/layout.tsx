import { Metadata } from 'next';
import { calculatorMetadata } from '@/lib/seo/metadata';
import { calculatorSchemas, generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = calculatorMetadata.percentageToCgpa();

export default function PercentageToCgpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const calculatorSchema = calculatorSchemas.percentageToCgpa();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jntuhresults.theskypedia.com' },
    { name: 'Percentage to CGPA Calculator', url: 'https://jntuhresults.theskypedia.com/percentage-to-cgpa-calculator' },
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
