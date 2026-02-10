/**
 * Analytics Utilities
 *
 * Helper functions for tracking events across different analytics platforms.
 */

import { analyticsConfig } from "@/config/analytics";

// Declare global types for analytics
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    fbq?: (command: string, eventName: string, params?: object) => void;
    twq?: (command: string, eventName: string, params?: object) => void;
    lintrk?: (command: string, params?: object) => void;
    hj?: (command: string, ...args: any[]) => void;
  }
}

/**
 * Track custom event in Google Analytics
 */
export const trackGAEvent = (
  eventName: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (!analyticsConfig.googleAnalytics.enabled) return;

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

/**
 * Track custom event in Facebook Pixel
 */
export const trackFBEvent = (
  eventName: string,
  params?: {
    value?: number;
    currency?: string;
    content_name?: string;
    [key: string]: any;
  }
) => {
  if (!analyticsConfig.facebookPixel.enabled) return;

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
};

/**
 * Track custom event in Twitter Pixel
 */
export const trackTwitterEvent = (
  eventName: string,
  params?: {
    value?: number;
    currency?: string;
    [key: string]: any;
  }
) => {
  if (!analyticsConfig.twitterPixel.enabled) return;

  if (typeof window !== "undefined" && window.twq) {
    window.twq("track", eventName, params);
  }
};

/**
 * Track conversion in LinkedIn Insight
 */
export const trackLinkedInConversion = (conversionId: string) => {
  if (!analyticsConfig.linkedInInsight.enabled) return;

  if (typeof window !== "undefined" && window.lintrk) {
    window.lintrk("track", { conversion_id: conversionId });
  }
};

/**
 * Trigger Hotjar event
 */
export const triggerHotjarEvent = (eventName: string) => {
  if (!analyticsConfig.hotjar.enabled) return;

  if (typeof window !== "undefined" && window.hj) {
    window.hj("event", eventName);
  }
};

/**
 * Track all analytics platforms at once
 * Useful for important events like conversions, sign-ups, etc.
 */
export const trackUniversalEvent = (
  eventName: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    currency?: string;
    [key: string]: any;
  }
) => {
  // Google Analytics
  trackGAEvent(eventName, params);

  // Facebook Pixel
  trackFBEvent(eventName, params);

  // Twitter Pixel
  trackTwitterEvent(eventName, params);

  // Hotjar
  triggerHotjarEvent(eventName);
};

/**
 * Common event tracking functions for JNTUH Results website
 */

// Track when user checks results
export const trackResultCheck = (rollNumber: string, examType: string) => {
  trackUniversalEvent("result_check", {
    category: "Results",
    label: examType,
    roll_number: rollNumber.substring(0, 4), // Only track first 4 digits for privacy
  });
};

// Track when user uses calculator
export const trackCalculatorUse = (calculatorType: string) => {
  trackUniversalEvent("calculator_use", {
    category: "Tools",
    label: calculatorType,
  });
};

// Track when user subscribes to alerts
export const trackAlertSubscription = (subscriptionType: string) => {
  trackUniversalEvent("alert_subscription", {
    category: "Engagement",
    label: subscriptionType,
    value: 1,
  });
};

// Track when user downloads resources
export const trackResourceDownload = (resourceType: string, resourceName: string) => {
  trackUniversalEvent("resource_download", {
    category: "Resources",
    label: resourceType,
    resource_name: resourceName,
  });
};

// Track Formula Conversion (Detailed)
export const trackFormulaConversion = (input: number, result: number) => {
  trackGAEvent("formula_use", {
    category: "Tools",
    label: "CGPA to Percentage",
    input_value: input,
    output_result: result
  });
};

// Track PDF Export (Revenue generating action)
export const trackPDFExport = (reportType: string) => {
  trackUniversalEvent("export_pdf", {
    category: "Engagement",
    label: reportType,
    value: 1
  });
};

// Track when user shares content
export const trackShare = (platform: string, contentType: string) => {
  trackUniversalEvent("share", {
    category: "Social",
    label: platform,
    content_type: contentType,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackUniversalEvent("form_submission", {
    category: "Forms",
    label: formName,
  });
};

// Track errors
export const trackError = (errorType: string, errorMessage: string) => {
  trackGAEvent("error", {
    category: "Errors",
    label: errorType,
    error_message: errorMessage,
  });
};

// Track page load time
export const trackPageLoadTime = (pageName: string, loadTime: number) => {
  trackGAEvent("page_timing", {
    category: "Performance",
    label: pageName,
    value: Math.round(loadTime),
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText: string) => {
  trackUniversalEvent("outbound_link", {
    category: "Links",
    label: linkText,
    url: url,
  });
};
