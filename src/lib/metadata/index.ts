/**
 * Metadata Configuration Module
 *
 * Generates Next.js metadata configuration following best practices.
 * Separated for better maintainability and testing.
 *
 * @module lib/metadata
 */

import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Generates the base metadata configuration for the application
 * 
 * @param params - Optional overrides for title, description, and canonical path
 * @returns {Metadata} Next.js metadata object
 */
export function generateMetadata(params?: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, path = '', image, noIndex = false } = params || {};

  const siteTitle = title
    ? `${title} | JNTUH Results`
    : 'JNTUH Results 2025 - Check Semester Results & CGPA Instantly';

  const siteDescription = description || siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '');
  const ogImage = image || siteConfig.ogImage;

  return {
    // ========================================================================
    // Base Configuration
    // ========================================================================
    metadataBase: new URL(siteConfig.url),

    // ========================================================================
    // Title Configuration
    // ========================================================================
    title: {
      default: siteTitle,
      template: `%s | JNTUH Results Portal`,
    },

    // ========================================================================
    // Description
    // ========================================================================
    description: siteDescription,

    // ========================================================================
    // Keywords for SEO
    // ========================================================================
    keywords: [...siteConfig.keywords],

    // ========================================================================
    // Authors and Publisher
    // ========================================================================
    authors: [
      {
        name: siteConfig.brand.creator,
        url: siteConfig.brand.authorUrl,
      },
    ],
    creator: siteConfig.brand.creator,
    publisher: siteConfig.brand.publisher,

    // ========================================================================
    // Format Detection
    // ========================================================================
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // ========================================================================
    // Open Graph Configuration
    // ========================================================================
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: canonicalUrl,
      siteName: 'JNTUH Results - TheSkypedia',
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'JNTUH Results Portal',
          type: 'image/jpeg',
        },
      ],
    },

    // ========================================================================
    // Twitter Card Configuration
    // ========================================================================
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
      creator: siteConfig.social.twitter,
      site: siteConfig.social.twitter,
    },

    // ========================================================================
    // Robots Configuration
    // ========================================================================
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // ========================================================================
    // Icons Configuration
    // ========================================================================
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },

    // ========================================================================
    // PWA Manifest
    // ========================================================================
    manifest: '/manifest.webmanifest',

    // ========================================================================
    // Verification
    // ========================================================================
    verification: {
      google: siteConfig.google.verificationCode,
    },

    // ========================================================================
    // Canonical URL
    // ========================================================================
    alternates: {
      canonical: canonicalUrl,
    },

    // ========================================================================
    // Category & Focus
    // ========================================================================
    category: 'education',

    // ========================================================================
    // Apple Web App Configuration
    // ========================================================================
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'JNTUH RESULTS',
    },

    // ========================================================================
    // Other Meta Tags
    // ========================================================================
    other: {
      'theme-color': siteConfig.theme.color,
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'msapplication-TileColor': '#ffffff',
    },
  };
}
