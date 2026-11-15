"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

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
export const trackGAEvent = (
  action: string,
  params?: Record<string, unknown> | string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    if (typeof params === "string") {
      window.gtag("event", action, {
        event_category: params,
        event_label: label,
        value: value,
      });
    } else {
      window.gtag("event", action, params || {});
    }
  }
};

/**
 * Subcomponent to track pageviews, route transitions & query params
 */
function GAPageTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Send page_view on every pathname or query param transition
  useEffect(() => {
    if (!measurementId || measurementId === "YOUR_GA4_MEASUREMENT_ID" || measurementId === "G-XXXXXXXXXX") {
      return;
    }

    const search = searchParams?.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_title: typeof document !== "undefined" ? document.title : "",
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: fullPath,
        send_to: measurementId,
      });
    }
  }, [pathname, searchParams, measurementId]);

  // Global listeners for automatic engagement tracking:
  // - PDF/file downloads (e.g. Syllabus, Question Papers)
  // - Outbound link clicks (e.g. official JNTUH portals)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target || !target.href) return;

      try {
        const url = new URL(target.href, window.location.origin);
        const isExternal = url.origin !== window.location.origin;

        // Track PDF / Syllabus / Question Paper downloads
        if (url.pathname.match(/\.(pdf|zip|docx?|xlsx?)$/i)) {
          trackGAEvent("file_download", {
            file_name: url.pathname.split("/").pop(),
            file_extension: url.pathname.split(".").pop(),
            link_url: target.href,
            link_text: target.textContent?.trim() || "",
          });
          return;
        }

        // Track Outbound clicks (e.g. to JNTUH official sites)
        if (isExternal) {
          trackGAEvent("click", {
            event_category: "outbound",
            link_domain: url.hostname,
            link_url: target.href,
            link_text: target.textContent?.trim() || "",
          });
        }
      } catch {
        // Ignore invalid URL clicks
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

/**
 * Google Analytics 4 (GA4) Component
 *
 * @param measurementId - Your GA4 Measurement ID (e.g., G-N1FJ0X03GL)
 *
 * Features:
 * - Comprehensive page view tracking across all Next.js App Router pages and query params
 * - Outbound link click tracking
 * - File / Syllabus PDF download tracking
 * - Event tracking helper
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
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
              page_path: window.location.pathname + window.location.search,
              send_page_view: true
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GAPageTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
