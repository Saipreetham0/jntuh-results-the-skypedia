import { Thing, WithContext, WebSite, Organization, BreadcrumbList, SoftwareApplication, FAQPage, Question } from 'schema-dts';

export function generateWebsiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'JNTUH Results - TheSkypedia',
    alternateName: ['TheSkypedia JNTUH', 'JNTUH Results Portal'],
    url: 'https://jntuhresults.theskypedia.com',
    description: 'Official JNTUH Results portal for checking B.Tech, M.Tech results, CGPA calculator, and academic resources',
    publisher: {
      '@type': 'Organization',
      name: 'TheSkypedia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jntuhresults.theskypedia.com/logo.png',
        width: '250',
        height: '60',
      },
    },
  };
}

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TheSkypedia',
    alternateName: 'JNTUH Results TheSkypedia',
    url: 'https://jntuhresults.theskypedia.com',
    logo: 'https://theskypedia.com/wp-content/uploads/2022/06/cropped-theskypedia.com-logo.png',
    description: 'Leading educational platform for JNTUH students providing results, calculators, and academic resources',
    sameAs: [
      'https://www.linkedin.com/company/theskypedia/',
      'https://www.instagram.com/theskypedia',
      'https://theskypedia.com/',
      'https://www.youtube.com/@theskypedia',
      'https://www.facebook.com/theskypedia',
      'https://twitter.com/theskypedia',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@theskypedia.com',
      availableLanguage: ['English', 'Telugu'],
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCalculatorSchema(
  name: string,
  description: string,
  url: string
): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2547',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'TheSkypedia',
      url: 'https://theskypedia.com',
    },
    datePublished: '2023-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    screenshot: `${url}/screenshot.jpg`,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Specific schemas for calculator pages
export const calculatorSchemas = {
  cgpaCalculator: () =>
    generateCalculatorSchema(
      'JNTUH CGPA Calculator',
      'Free online CGPA calculator for JNTUH students. Calculate cumulative GPA for R22, R20, R18 regulations with semester-wise grade input.',
      'https://jntuhresults.theskypedia.com/cgpa-calculator'
    ),

  cgpaToPercentage: () =>
    generateCalculatorSchema(
      'CGPA to Percentage Converter - JNTUH',
      'Convert JNTUH CGPA to percentage instantly with accurate conversion formula. Supports all regulations including R22, R20, R18.',
      'https://jntuhresults.theskypedia.com/cgpa-percentage-converter'
    ),

  sgpaToCgpa: () =>
    generateCalculatorSchema(
      'SGPA to CGPA Calculator - JNTUH',
      'Convert semester-wise SGPA to cumulative CGPA for JNTUH students. Supports multiple semesters with detailed performance analysis.',
      'https://jntuhresults.theskypedia.com/sgpa-to-cgpa-calculator'
    ),

  percentageToCgpa: () =>
    generateCalculatorSchema(
      'Percentage to CGPA Calculator - JNTUH',
      'Convert percentage to CGPA for JNTUH regulations. Accurate percentage to grade point conversion for B.Tech, M.Tech students.',
      'https://jntuhresults.theskypedia.com/percentage-to-cgpa-calculator'
    ),

  marksPercentage: () =>
    generateCalculatorSchema(
      'Marks to Percentage Calculator - JNTUH',
      'Calculate percentage from marks for JNTUH exams. Convert obtained marks to percentage with grade analysis.',
      'https://jntuhresults.theskypedia.com/marks-percentage-calculator'
    ),
};
