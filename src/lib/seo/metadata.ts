import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://jntuhresults.theskypedia.com/og-image-default.jpg',
  noindex = false,
}: PageMetadata): Metadata {
  const fullTitle = `${title} | JNTUH Results - TheSkypedia`;
  const baseUrl = 'https://jntuhresults.theskypedia.com';
  const canonicalUrl = canonical || baseUrl;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),

    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'JNTUH Results - TheSkypedia',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@theskypedia',
      site: '@theskypedia',
    },

    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: false,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    other: {
      'theme-color': '#1C61E7',
    },
  };
}

// Specific metadata generators for calculator pages
export const calculatorMetadata = {
  cgpaCalculator: (): Metadata => generatePageMetadata({
    title: 'JNTUH CGPA Calculator - Calculate Your Cumulative GPA Online',
    description: 'Free JNTUH CGPA Calculator for R22, R20, R18, R16 regulations. Calculate your cumulative GPA with semester-wise grades. Instant results with grade breakdown and performance analysis.',
    keywords: [
      'JNTUH CGPA Calculator',
      'CGPA Calculator JNTUH',
      'JNTUH R22 CGPA Calculator',
      'JNTUH R20 CGPA Calculator',
      'Calculate CGPA JNTUH',
      'JNTUH B.Tech CGPA',
      'Semester wise CGPA',
      'JNTUH Grade Calculator',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/cgpa-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-cgpa-calculator.jpg',
  }),

  cgpaToPercentage: (): Metadata => generatePageMetadata({
    title: 'CGPA to Percentage Converter - JNTUH Grade Conversion Tool',
    description: 'Convert JNTUH CGPA to Percentage instantly. Accurate conversion formula for R22, R20, R18 regulations. Free online tool with grade breakdown and performance level.',
    keywords: [
      'CGPA to Percentage JNTUH',
      'JNTUH CGPA to Percentage Converter',
      'CGPA Percentage Conversion',
      'JNTUH Grade to Percentage',
      'Convert CGPA to Marks',
      'JNTUH R22 CGPA to Percentage',
      'GPA to Percentage',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/cgpa-percentage-converter',
    ogImage: 'https://jntuhresults.theskypedia.com/og-cgpa-percentage.jpg',
  }),

  percentageToCgpa: (): Metadata => generatePageMetadata({
    title: 'Percentage to CGPA Calculator - Convert Marks to JNTUH Grade',
    description: 'Convert percentage to CGPA for JNTUH regulations. Accurate percentage to grade point conversion for B.Tech, M.Tech students. Free online calculator with instant results.',
    keywords: [
      'Percentage to CGPA',
      'Convert Percentage to CGPA JNTUH',
      'Marks to CGPA Converter',
      'JNTUH Percentage Calculator',
      'Grade Conversion Calculator',
      'Percentage to Grade Point',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/percentage-to-cgpa-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-percentage-cgpa.jpg',
  }),

  sgpaToCgpa: (): Metadata => generatePageMetadata({
    title: 'SGPA to CGPA Calculator - JNTUH Semester Grade Converter',
    description: 'Convert SGPA to CGPA for JNTUH students. Calculate cumulative GPA from semester-wise SGPA. Support for multiple semesters with detailed performance analysis.',
    keywords: [
      'SGPA to CGPA Calculator',
      'JNTUH SGPA Calculator',
      'Convert SGPA to CGPA',
      'Semester GPA to CGPA',
      'JNTUH Grade Calculator',
      'SGPA CGPA Converter',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/sgpa-to-cgpa-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-sgpa-cgpa.jpg',
  }),

  marksPercentage: (): Metadata => generatePageMetadata({
    title: 'Marks to Percentage Calculator - JNTUH Score Converter',
    description: 'Calculate percentage from marks for JNTUH exams. Convert obtained marks to percentage with grade analysis. Free online tool for B.Tech, M.Tech students.',
    keywords: [
      'Marks to Percentage Calculator',
      'JNTUH Marks Calculator',
      'Convert Marks to Percentage',
      'Percentage Calculator',
      'JNTUH Score Calculator',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/marks-percentage-calculator',
  }),
};
