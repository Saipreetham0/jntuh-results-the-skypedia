import type { ReactNode } from 'react';
// HMR Final Refresh: 2026-02-05 12:15 - PURGED NEXT/IMAGE CACHE
import type { Metadata } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { generateMetadata } from '@/lib/metadata';

import Navbar from '@/components/layout/nav-bar/navBar';
import Footer from '@/components/layout/footer';
import AnnouncementBar from '@/components/layout/announcement-bar';
import { InstallPWA } from '@/components/layout/InstallPWA';

import { Providers } from '@/components/layout/providers';
import NavigationProgressBar from '@/components/layout/NavigationProgressBar';

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/layout/scripts/GoogleTagManager';
import { StructuredData } from '@/components/layout/scripts/StructuredData';

import AnalyticsProvider from '@/components/analytics';
import AdScript from '@/components/adsense/AdScript';
import { AnchorAd } from '@/components/adsense';

import AD_SLOTS from '@/config/adSlots';

import '@/app/_shared/styles/globals.css';

export const metadata: Metadata = generateMetadata();

interface RootLayoutProps {
  readonly children: ReactNode;
}

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <GoogleTagManager />
        <AdScript />
      </head>

      <body suppressHydrationWarning className={`${inter.variable} font-sans`}>
        <NavigationProgressBar />
        <SpeedInsights />
        <AnalyticsProvider />
        <GoogleTagManagerNoScript />

        <Providers>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <AnnouncementBar
              message="🚀 NEW: Check your Backlogs & Consolidated Results now available!"
              link="/check-backlogs"
              bgColor="bg-[#1C61E7]"
              textColor="text-white"
              isDismissible={true}
            />

            <Navbar />

            <main className="flex-grow bg-gray-50 dark:bg-gray-900">
              {children}
            </main>

            <Footer />
          </div>

          <InstallPWA />
          <AnchorAd adSlot={AD_SLOTS.MOBILE.ANCHOR_BOTTOM} />
        </Providers>
      </body>
    </html>
  );
}
