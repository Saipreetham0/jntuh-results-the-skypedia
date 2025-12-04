import type { Metadata } from 'next';

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
    title: 'JNTUH CGPA Calculator Online - Free GPA Calculator for R22, R20, R18',
    description: 'Calculate JNTUH CGPA instantly with our free online calculator. Supports R22, R20, R18, R16 regulations. Get semester-wise CGPA, percentage conversion, and grade analysis for B.Tech & M.Tech students.',
    keywords: [
      'JNTUH CGPA Calculator',
      'CGPA Calculator JNTUH',
      'JNTUH CGPA Calculator Online',
      'Free JNTUH CGPA Calculator',
      'JNTU CGPA Calculator',
      'JNTUH R22 CGPA Calculator',
      'JNTUH R20 CGPA Calculator',
      'Calculate CGPA JNTUH',
      'JNTUH B.Tech CGPA',
      'Semester wise CGPA',
      'JNTUH Grade Calculator',
      'CGPA Calculator for JNTUH Students',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/cgpa-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-cgpa-calculator.jpg',
  }),

  cgpaToPercentage: (): Metadata => generatePageMetadata({
    title: 'CGPA to Percentage Converter - JNTUH Grade to Marks Calculator',
    description: 'Convert JNTUH CGPA to Percentage instantly with accurate formula. Supports 10.0, 4.0, 5.0 grading scales. Free converter for R22, R20, R18 regulations with detailed grade breakdown and performance analysis.',
    keywords: [
      'CGPA to Percentage JNTUH',
      'JNTUH CGPA to Percentage',
      'CGPA to Percentage Calculator JNTUH',
      'JNTUH Percentage Calculator',
      'JNTUH CGPA to Percentage Converter',
      'CGPA Percentage Conversion',
      'JNTUH Grade to Percentage',
      'Convert CGPA to Marks',
      'JNTUH R22 CGPA to Percentage',
      'GPA to Percentage',
      'CGPA to Percentage Conversion Formula',
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
    title: 'Marks to Percentage Calculator - JNTUH Exam Score Converter',
    description: 'Calculate percentage from marks instantly for JNTUH exams. Free online marks calculator with grade analysis, letter grades, and performance remarks. Perfect for B.Tech & M.Tech students.',
    keywords: [
      'Marks to Percentage Calculator',
      'Marks Percentage Calculator JNTUH',
      'JNTUH Marks Calculator',
      'JNTUH Percentage Calculator',
      'Convert Marks to Percentage',
      'Percentage Calculator',
      'JNTUH Score Calculator',
      'Calculate Percentage from Marks',
      'Exam Marks Calculator',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/marks-percentage-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-marks-percentage.jpg',
  }),
};
