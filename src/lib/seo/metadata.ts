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
    title: 'CGPA to Percentage Converter JNTUH - 6.76, 7.5, 8.0 CGPA in % Free',
    description: 'Convert any JNTUH CGPA to percentage instantly. Official formula: CGPA × 10 = %. Supports 6.76, 7.5, 8.0, 9.0 and all CGPA values. Get conversion certificate formula for R22, R20, R18. Free tool.',
    keywords: [
      'CGPA to Percentage JNTUH',
      'JNTUH CGPA to Percentage',
      'CGPA to Percentage Calculator JNTUH',
      '6.76 CGPA to Percentage',
      '6.13 CGPA to Percentage',
      'JNTUH CGPA to Percentage Conversion Formula',
      'JNTUH CGPA to Percentage Conversion Certificate',
      'JNTUH CGPA to Percentage Converter',
      'CGPA Percentage Conversion',
      'JNTUH Grade to Percentage',
      'JNTUH R22 CGPA to Percentage',
      'CGPA to Percentage Conversion Formula',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/cgpa-percentage-converter',
    ogImage: 'https://jntuhresults.theskypedia.com/og-cgpa-percentage.jpg',
  }),

  percentageToCgpa: (): Metadata => generatePageMetadata({
    title: 'Percentage to CGPA Calculator JNTUH - Free % to Grade Points Converter',
    description: 'Convert percentage to CGPA instantly for JNTUH R22, R20, R18. Enter your % and get CGPA on 10.0, 4.0 or 5.0 scale with grade, remarks and performance breakdown. Free online tool.',
    keywords: [
      'Percentage to CGPA Calculator JNTUH',
      'Percentage to CGPA JNTUH',
      'Convert Percentage to CGPA JNTUH',
      'JNTUH Percentage to CGPA',
      'Marks to CGPA Converter',
      'JNTUH Percentage Calculator',
      'Grade Conversion Calculator',
      'Percentage to Grade Point JNTUH',
      'CGPA from Percentage JNTUH',
      'JNTUH % to CGPA',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/percentage-to-cgpa-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-percentage-cgpa.jpg',
  }),

  sgpaToCgpa: (): Metadata => generatePageMetadata({
    title: 'SGPA to CGPA Calculator JNTUH - Convert Semester GPA to Cumulative Free',
    description: 'Convert SGPA to CGPA for JNTUH R22, R20, R18. Enter semester-wise SGPA and credits to get your cumulative CGPA instantly with weighted average formula. Supports up to 8 semesters.',
    keywords: [
      'SGPA to CGPA Calculator JNTUH',
      'SGPA to CGPA JNTUH',
      'JNTUH SGPA Calculator',
      'Convert SGPA to CGPA',
      'JNTUH SGPA to CGPA Calculator R22',
      'Semester GPA to CGPA',
      'JNTUH SGPA Calculator R22',
      'SGPA CGPA Converter',
      'JNTUH Grade Calculator',
      'SGPA to CGPA Calculator with Credits',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/sgpa-to-cgpa-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-sgpa-cgpa.jpg',
  }),

  marksPercentage: (): Metadata => generatePageMetadata({
    title: 'Marks to Percentage Calculator JNTUH - Convert Exam Marks Instantly Free',
    description: 'Calculate your percentage from obtained marks and total marks for JNTUH exams. Get grade, letter grade (A, B, C) and performance remarks instantly. Free marks percentage calculator for B.Tech students.',
    keywords: [
      'Marks to Percentage Calculator JNTUH',
      'Marks Percentage Calculator',
      'JNTUH Marks Calculator',
      'Convert Marks to Percentage',
      'Calculate Percentage from Marks',
      'Exam Marks Percentage Calculator',
      'JNTUH Score Calculator',
      'Marks to Percentage',
      'Percentage from Marks Calculator',
      'B.Tech Marks Percentage',
      'Obtained Marks to Percentage',
    ],
    canonical: 'https://jntuhresults.theskypedia.com/marks-percentage-calculator',
    ogImage: 'https://jntuhresults.theskypedia.com/og-marks-percentage.jpg',
  }),
};
