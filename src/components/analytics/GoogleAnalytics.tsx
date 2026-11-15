"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Track custom events in Google Analytics 4
 */
export const trackGAEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Google Analytics 4 (GA4) Component
 *
 * @param measurementId - Your GA4 Measurement ID (e.g., G-N1FJ0X03GL)
 *
 * Features:
 * - Page view tracking across SPA navigation
 * - Event tracking
 * - User engagement metrics
 * - Conversion tracking
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  // Send page view on client-side route changes
  useEffect(() => {
    if (!measurementId || measurementId === "YOUR_GA4_MEASUREMENT_ID" || measurementId === "G-XXXXXXXXXX") {
      return;
    }
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", measurementId, {
        page_path: pathname,
      });
    }
  }, [pathname, measurementId]);

  if (!measurementId || measurementId === "YOUR_GA4_MEASUREMENT_ID" || measurementId === "G-XXXXXXXXXX") {
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
