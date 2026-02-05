/**
 * Google AdSense Ad Slots Configuration
 *
 * IMPORTANT: Update these with your actual ad slot IDs from Google AdSense
 * Go to: https://www.google.com/adsense → Ads → Ad units
 *
 * Each ad unit must be UNIQUE - never reuse the same slot ID
 */

export const AD_SLOTS = {
  // Publisher ID
  PUBLISHER_ID: 'ca-pub-4870864326886980',

  // Homepage Ads
  HOMEPAGE: {
    TOP_BANNER: '1365713287', // Replace with actual slot ID
    MID_RECTANGLE: '3832094528', // Replace with actual slot ID
    BOTTOM_BANNER: '8014882116', // Replace with actual slot ID
  },

  // Calculator Pages
  CALCULATOR: {
    TOP_BANNER: '1365713287', // Replace with actual slot ID
    MID_RECTANGLE: '3832094528', // Replace with actual slot ID
    BOTTOM_RECTANGLE: '7970650085', // Replace with actual slot ID
    SIDEBAR_STICKY: '2032869647', // Replace with actual slot ID
  },

  // Results Pages
  RESULTS: {
    TOP_BANNER: '1365713287', // Replace with actual slot ID
    INLINE_1: '2008818916', // Replace with actual slot ID
    INLINE_2: '5388718770', // Replace with actual slot ID
    INLINE_3: '7285196323', // Replace with actual slot ID
    BOTTOM_BANNER: '8014882116', // Replace with actual slot ID
  },

  // Consolidated Results
  CONSOLIDATED: {
    TOP_BANNER: '1365713287', // Replace with actual slot ID
    INLINE_1: '2008818916', // Replace with actual slot ID
    BOTTOM_RECTANGLE: '7970650085', // Replace with actual slot ID
  },

  // Semester Results
  SEMESTER: {
    TOP_BANNER: '1365713287', // Replace with actual slot ID
    INLINE_1: '2008818916', // Replace with actual slot ID
    INLINE_2: '5388718770', // Replace with actual slot ID
    BOTTOM_BANNER: '8014882116', // Replace with actual slot ID
  },

  // Blog Pages
  BLOG: {
    TOP_BANNER: '1365713287',
    HEADER: '1365713287', // Alias for TOP_BANNER
    IN_ARTICLE_1: '3537523006',
    IN_CONTENT: '3537523006', // Alias for IN_ARTICLE_1
    IN_ARTICLE_2: '2854054771',
    BOTTOM_RECTANGLE: '7970650085',
  },

  // Sidebar (Global)
  SIDEBAR: {
    STICKY_TOP: '2416013028', // Replace with actual slot ID
    STICKY_MID: '3729094695', // Replace with actual slot ID
  },

  // Mobile Specific
  MOBILE: {
    ANCHOR_BOTTOM: '5042176362', // Replace with actual slot ID
  },
};

/**
 * Helper function to get ad slot by key
 * @param category - Category like 'HOMEPAGE', 'CALCULATOR', etc.
 * @param position - Position like 'TOP_BANNER', 'MID_RECTANGLE', etc.
 */
export function getAdSlot(category: keyof typeof AD_SLOTS, position: string): string {
  const categorySlots = AD_SLOTS[category];
  if (typeof categorySlots === 'string') {
    return categorySlots;
  }
  return (categorySlots as any)[position] || '';
}

/**
 * Validate if ad slot is properly configured
 * Returns false if using placeholder slot
 */
export function isValidAdSlot(slotId: string): boolean {
  // Check if it's not a placeholder
  const placeholderPattern = /^897329(295[8-9]|29[6-8][0-9])$/;
  return !placeholderPattern.test(slotId);
}

export default AD_SLOTS;
