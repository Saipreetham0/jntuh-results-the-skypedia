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
  description: '#1 JNTUH Results portal — Check B.Tech & M.Tech semester results, calculate CGPA & SGPA, convert to percentage. Trusted by 100K+ students. Supports R22, R20, R18 regulations. Free & instant.',

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
    'JNTUH Results 2026',
    'JNTUH CGPA Calculator',
    'CGPA Calculator JNTUH',
    'JNTUH CGPA to Percentage',
    'CGPA to Percentage JNTUH',
    'JNTUH R22 Results',
    'JNTUH R22 Grading System',
    'JNTUH B.Tech Results',
    'JNTUH M.Tech Results',
    'SGPA to CGPA Calculator',
    'SGPA to CGPA JNTUH',
    'JNTUH Percentage Calculator',
    'JNTUH Previous Papers',
    'JNTUH Syllabus',
    'JNTUH Academic Calendar',
    'JNTUH Consolidated Results',
    'JNTUH Backlog Check',
    'JNTUH Grade Points Table',
    'JNTUH Pass Marks',
  ],
} as const;

/**
 * Type-safe site configuration
 */
export type SiteConfig = typeof siteConfig;
