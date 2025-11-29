"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics 4 (GA4) Component
 *
 * @param measurementId - Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)
 *
 * Features:
 * - Page view tracking
 * - Event tracking
 * - User engagement metrics
 * - Conversion tracking
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId || measurementId === "YOUR_GA4_MEASUREMENT_ID") {
    console.warn("GoogleAnalytics: No valid measurement ID provided");
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
