/**
 * Analytics Configuration
 *
 * Configure all analytics tracking IDs here.
 * Set environment variables in .env.local for sensitive data.
 */

export const analyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    enabled: process.env.NEXT_PUBLIC_GA_ENABLED === "true" || true, // Default enabled with fallback
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-N1FJ0X03GL",
  },

  // Microsoft Clarity
  microsoftClarity: {
    enabled: process.env.NEXT_PUBLIC_CLARITY_ENABLED === "true" || true, // Default enabled with fallback
    projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "n6vruy6vlg",
  },

  // Facebook Pixel
  facebookPixel: {
    enabled: process.env.NEXT_PUBLIC_FB_PIXEL_ENABLED === "true" || true, // Default enabled with fallback
    pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "27624496020475115",
  },

  // Hotjar
  hotjar: {
    enabled: process.env.NEXT_PUBLIC_HOTJAR_ENABLED === "true",
    siteId: process.env.NEXT_PUBLIC_HOTJAR_SITE_ID || "",
    version: 6,
  },

  // LinkedIn Insight Tag
  linkedInInsight: {
    enabled: process.env.NEXT_PUBLIC_LINKEDIN_ENABLED === "true",
    partnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "",
  },

  // Twitter (X) Pixel
  twitterPixel: {
    enabled: process.env.NEXT_PUBLIC_TWITTER_PIXEL_ENABLED === "true",
    pixelId: process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID || "",
  },

  // Google Tag Manager (Already configured in your project)
  googleTagManager: {
    enabled: true,
    containerId: "GTM-W6TSKNVX", // Already in your layout
  },
};

/**
 * Helper function to check if any analytics is enabled
 */
export const isAnalyticsEnabled = () => {
  return (
    analyticsConfig.googleAnalytics.enabled ||
    analyticsConfig.microsoftClarity.enabled ||
    analyticsConfig.facebookPixel.enabled ||
    analyticsConfig.hotjar.enabled ||
    analyticsConfig.linkedInInsight.enabled ||
    analyticsConfig.twitterPixel.enabled
  );
};

/**
 * Helper function to get all enabled analytics
 */
export const getEnabledAnalytics = () => {
  const enabled: string[] = [];

  if (analyticsConfig.googleAnalytics.enabled) enabled.push("Google Analytics");
  if (analyticsConfig.microsoftClarity.enabled) enabled.push("Microsoft Clarity");
  if (analyticsConfig.facebookPixel.enabled) enabled.push("Facebook Pixel");
  if (analyticsConfig.hotjar.enabled) enabled.push("Hotjar");
  if (analyticsConfig.linkedInInsight.enabled) enabled.push("LinkedIn Insight");
  if (analyticsConfig.twitterPixel.enabled) enabled.push("Twitter Pixel");
  if (analyticsConfig.googleTagManager.enabled) enabled.push("Google Tag Manager");

  return enabled;
};
