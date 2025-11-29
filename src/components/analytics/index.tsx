"use client";

import GoogleAnalytics from "./GoogleAnalytics";
import MicrosoftClarity from "./MicrosoftClarity";
import FacebookPixel from "./FacebookPixel";
import Hotjar from "./Hotjar";
import LinkedInInsightTag from "./LinkedInInsightTag";
import TwitterPixel from "./TwitterPixel";
import { analyticsConfig } from "@/config/analytics";

/**
 * Analytics Provider Component
 *
 * This component loads all enabled analytics scripts based on the configuration.
 * Add this component to your root layout to enable analytics across the entire site.
 *
 * @example
 * ```tsx
 * import AnalyticsProvider from "@/components/analytics";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <AnalyticsProvider />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function AnalyticsProvider() {
  return (
    <>
      {/* Google Analytics 4 */}
      {analyticsConfig.googleAnalytics.enabled &&
        analyticsConfig.googleAnalytics.measurementId && (
          <GoogleAnalytics
            measurementId={analyticsConfig.googleAnalytics.measurementId}
          />
        )}

      {/* Microsoft Clarity */}
      {analyticsConfig.microsoftClarity.enabled &&
        analyticsConfig.microsoftClarity.projectId && (
          <MicrosoftClarity
            projectId={analyticsConfig.microsoftClarity.projectId}
          />
        )}

      {/* Facebook Pixel */}
      {analyticsConfig.facebookPixel.enabled &&
        analyticsConfig.facebookPixel.pixelId && (
          <FacebookPixel pixelId={analyticsConfig.facebookPixel.pixelId} />
        )}

      {/* Hotjar */}
      {analyticsConfig.hotjar.enabled && analyticsConfig.hotjar.siteId && (
        <Hotjar
          siteId={analyticsConfig.hotjar.siteId}
          hotjarVersion={analyticsConfig.hotjar.version}
        />
      )}

      {/* LinkedIn Insight Tag */}
      {analyticsConfig.linkedInInsight.enabled &&
        analyticsConfig.linkedInInsight.partnerId && (
          <LinkedInInsightTag
            partnerId={analyticsConfig.linkedInInsight.partnerId}
          />
        )}

      {/* Twitter Pixel */}
      {analyticsConfig.twitterPixel.enabled &&
        analyticsConfig.twitterPixel.pixelId && (
          <TwitterPixel pixelId={analyticsConfig.twitterPixel.pixelId} />
        )}
    </>
  );
}

// Export individual components for custom usage
export {
  GoogleAnalytics,
  MicrosoftClarity,
  FacebookPixel,
  Hotjar,
  LinkedInInsightTag,
  TwitterPixel,
};
