/**
 * Site Configuration
 *
 * Centralized configuration for site-wide constants and settings.
 * This follows the Single Source of Truth (SSOT) principle.
 *
 * @module config/site
 */

export const siteConfig = {
  /**
   * Site Metadata
   */
  name: 'JNTUH Results - TheSkypedia',
  url: 'https://jntuhresults.theskypedia.com',
  ogImage: '/homepage.jpg',

  /**
   * Site Description
   */
  description: 'Official JNTUH Results portal by TheSkypedia. Check B.Tech, M.Tech semester results, calculate CGPA/SGPA, convert grades to percentage, access previous papers, syllabus & academic resources for all regulations (R22, R20, R18).',

  /**
   * Short Description for Twitter/Social
   */
  shortDescription: 'Check JNTUH Results, calculate CGPA/SGPA, convert grades, and access academic resources for all JNTUH regulations.',

  /**
   * Brand Information
   */
  brand: {
    creator: 'TheSkypedia',
    publisher: 'TheSkypedia',
    authorUrl: 'https://theskypedia.com',
  },

  /**
   * Contact Information
   */
  contact: {
    email: 'info@theskypedia.com',
    location: 'Hyderabad, Telangana',
    address: 'Hyderabad, Telangana, India',
  },

  /**
   * Social Media
   */
  social: {
    twitter: '@theskypedia',
    instagram: 'https://www.instagram.com/theskypedia',
    github: 'https://github.com/TheSkypedia',
    youtube: 'https://www.youtube.com/@theskypedia',
  },

  /**
   * Theme Configuration
   */
  theme: {
    color: '#1C61E7',
    colorDark: '#1a56d1',
  },

  /**
   * Google Services
   */
  google: {
    tagManagerId: 'GTM-W6TSKNVX',
    verificationCode: 'w6urUAImoYyrv-5UIio0rfpmxsgVLwTlDg6KxWyeV_o',
  },

  /**
   * SEO Keywords
   */
  keywords: [
    'JNTUH Results',
    'JNTUH CGPA Calculator',
    'CGPA to Percentage JNTUH',
    'JNTUH R22 Results',
    'JNTUH B.Tech Results',
    'JNTUH M.Tech Results',
    'SGPA to CGPA Calculator',
    'JNTUH Previous Papers',
    'JNTUH Syllabus',
    'JNTUH Academic Calendar',
    'JNTUH Consolidated Results',
    'JNTUH Backlog Check',
  ],
} as const;

/**
 * Type-safe site configuration
 */
export type SiteConfig = typeof siteConfig;
