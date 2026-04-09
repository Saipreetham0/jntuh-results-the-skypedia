import { Metadata } from 'next';
import { calculatorMetadata } from '@/lib/seo/metadata';
import { calculatorSchemas, generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = calculatorMetadata.marksPercentage();

export default function MarksPercentageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const calculatorSchema = calculatorSchemas.marksPercentage();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jntuhresults.theskypedia.com' },
    { name: 'Marks to Percentage Calculator', url: 'https://jntuhresults.theskypedia.com/marks-percentage-calculator' },
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
