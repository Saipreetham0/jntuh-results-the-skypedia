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
 * @returns {Metadata} Next.js metadata object
 */
export function generateMetadata(): Metadata {
  return {
    // ========================================================================
    // Base Configuration
    // ========================================================================
    metadataBase: new URL(siteConfig.url),

    // ========================================================================
    // Title Configuration
    // ========================================================================
    title: {
      default: 'JNTUH Results - Check B.Tech, M.Tech Results | CGPA Calculator',
      template: '%s | JNTUH Results - TheSkypedia',
    },

    // ========================================================================
    // Description
    // ========================================================================
    description: siteConfig.description,

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
      locale: 'en_US',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: 'JNTUH Results - Check B.Tech, M.Tech Results | CGPA Calculator',
      description: siteConfig.shortDescription,
      images: [
        {
          url: siteConfig.ogImage,
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
      title: 'JNTUH Results - Check Results & Calculate CGPA',
      description: siteConfig.shortDescription,
      images: [siteConfig.ogImage],
      creator: siteConfig.social.twitter,
      site: siteConfig.social.twitter,
    },

    // ========================================================================
    // Robots Configuration
    // ========================================================================
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
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
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
      other: [
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },

    // ========================================================================
    // PWA Manifest
    // ========================================================================
    manifest: '/site.webmanifest',

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
      canonical: siteConfig.url,
    },

    // ========================================================================
    // Category
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
