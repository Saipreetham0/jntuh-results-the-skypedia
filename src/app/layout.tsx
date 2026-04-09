import type { ReactNode } from 'react';
// HMR Final Refresh: 2026-02-05 12:15 - PURGED NEXT/IMAGE CACHE
import ScrollToTop from '@/components/ui/ScrollToTop';
import type { Metadata } from 'next';

// import { SpeedInsights } from '@vercel/speed-insights/next';

import { generateMetadata } from '@/lib/metadata';

import Navbar from '@/components/layout/nav-bar/navBar';
import Footer from '@/components/layout/footer';
import AnnouncementBar from '@/components/layout/announcement-bar';

import { Providers } from '@/components/layout/providers';

import AnalyticsProvider from '@/components/analytics';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/layout/scripts/GoogleTagManager';
import { StructuredData } from '@/components/layout/scripts/StructuredData';


import { AnchorAd, AdDebug } from '@/components/adsense';

import AD_SLOTS from '@/config/adSlots';

import '@/app/globals.css';

export const metadata: Metadata = generateMetadata();

interface RootLayoutProps {
  readonly children: ReactNode;
}

import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* AdSense — plain <script> avoids the data-nscript attribute next/script adds */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4870864326886980"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${plusJakarta.variable} font-sans`}>
        <StructuredData />
        <GoogleTagManager />

        {/* <SpeedInsights /> */}
        <AnalyticsProvider />
        <GoogleTagManagerNoScript />
        <ScrollToTop />
        <AdDebug />

        <Providers>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 pb-20 lg:pb-0">
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


          <AnchorAd adSlot={AD_SLOTS.MOBILE.ANCHOR_BOTTOM} />
        </Providers>
      </body>
    </html>
  );
}
