/**
 * Ad Placement Configuration (Compatible with existing codebase)
 * 
 * Enhanced with monetization blueprint strategy while maintaining backward compatibility.
 * Uses NAMED EXPORT to match existing imports: import { AD_SLOTS } from '@/config/adSlots'
 */

export const AD_SLOTS = {
  // Publisher ID
  PUBLISHER_ID: 'ca-pub-8569567515057281',

  /**
   * BLOG/ARTICLE PAGES - PRIMARY REVENUE SOURCE
   * Existing slots maintained + new strategic positions documented
   */
  BLOG: {
    // Existing slots (keep for compatibility)
    TOP_BANNER: '1365713287',
    HEADER: '1365713287',
    IN_ARTICLE_1: '3537523006', // Use for "after-intro" position (RPM: 1.8-2.5)
    IN_CONTENT: '3537523006', // Use for "mid-article" position (RPM: 2.0-2.8)
    IN_ARTICLE_2: '2854054771', // Use for "money-zone" 60% position (RPM: 2.5-3.2 ⭐)
    BOTTOM_RECTANGLE: '7970650085', // Use for "after-article" position (RPM: 1.2-1.8)
    BOTTOM_BANNER: '8014882116', // Full-width bottom banner

    // New positions documented (map to existing slots above for now)
    // TODO: Create dedicated ad units in AdSense for these positions
    SIDEBAR_STICKY: '3537523006', // Desktop 300x600 - Future dedicated unit
    MOBILE_ANCHOR: '2854054771', // Bottom 320x100 - Future dedicated unit
    IN_RELATED: '7970650085', // Within related articles - Use existing
  },

  /**
   * HOMEPAGE - TRAFFIC DRIVER
   */
  HOMEPAGE: {
    TOP_BANNER: '7628680768',
    MID_BANNER: '8505787982',
    MID_RECTANGLE: '8505787982', // Mid-page rectangle ad
    BOTTOM_BANNER: '4389191990',
    MOBILE_ANCHOR: '7628680768', // Bottom sticky for mobile
  },

  /**
   * CALCULATOR PAGES - HIGHEST RPM ($5-12)
   */
  CALCULATOR: {
    TOP_BANNER: '1672437770',
    MID_RECTANGLE: '3626650269', // Mid-page ad
    RESULT_TOP: '4749544012',
    RESULT_MIDDLE: '3626650269',
    RESULT_BOTTOM: '2503756516',
    BOTTOM_RECTANGLE: '2503756516', // Same as RESULT_BOTTOM
    SIDEBAR_STICKY: '4749544012', // Desktop sidebar
    IN_CONTENT: '3626650269', // In explanation content
  },

  /**
   * TABLE/RESULTS PAGES
   */
  TABLE: {
    ABOVE: '5885932779',
    BELOW: '4762973794',
  },

  /**
   * OTHER PAGE TYPES
   */
  SYLLABUS: {
    TOP_BANNER: '2234193272',
    MID_CONTENT: '1111299529',
    BOTTOM_BANNER: '9988405786',
  },

  BACKLOGS: {
    TOP_BANNER: '8865512043',
    BOTTOM_BANNER: '7742618300',
  },

  CAMPUS_CONNECT: {
    TOP_BANNER: '3250785268',
    BOTTOM_BANNER: '2127891525',
  },

  QUESTION_PAPERS: {
    TOP_BANNER: '1004997782',
    IN_CONTENT: '9882104039',
    MULTIPLEX: '8759210296',
  },

  COLLEGES: {
    TOP_BANNER: '7636316553',
    TABLE_TOP: '6513422810',
    TABLE_BOTTOM: '5390529067',
  },

  MBA_RESULTS: {
    TOP: '4267635324',
    MIDDLE: '3144741581',
    BOTTOM: '2021847838',
  },

  MTECH_RESULTS: {
    TOP: '8898954095',
    MIDDLE: '7776060352',
    BOTTOM: '6653166609',
  },

  /**
   * RESULTS PAGES - Missing section
   */
  RESULTS: {
    TOP_BANNER: '1365713287',
    INLINE_1: '2008818916',
    INLINE_2: '5388718770',
    INLINE_3: '7285196323',
    BOTTOM_BANNER: '8014882116',
    SIDEBAR_WIDGET: '2416013028',
  },

  /**
   * CONSOLIDATED RESULTS
   */
  CONSOLIDATED: {
    TOP_BANNER: '1365713287',
    INLINE_1: '2008818916',
    INLINE_2: '5388718770',
    BOTTOM_RECTANGLE: '7970650085',
  },

  /**
   * SEMESTER RESULTS
   */
  SEMESTER: {
    TOP_BANNER: '1365713287',
    INLINE_1: '2008818916',
    INLINE_2: '5388718770',
    BOTTOM_RECTANGLE: '7970650085',
    BOTTOM_BANNER: '8014882116',
    SIDEBAR_WIDGET: '2416013028',
  },

  /**
   * ACTIONS/INTERACTIVE PAGES
   */
  ACTIONS: {
    TOP_BEFORE_BUTTON: '7970650085', // Top before CTA
    TOP_AFTER_BUTTON: '7970650085', // Top after CTA
    BOTTOM_BEFORE_BUTTON: '7970650085',
    BOTTOM_AFTER_BUTTON: '7970650085',
  },

  /**
   * SIDEBAR ADS (General purpose sidebar ads)
   */
  SIDEBAR: {
    STICKY_TOP: '3537523006',
    STICKY_MIDDLE: '2854054771',
  },

  /**
   * MOBILE-SPECIFIC ADS
   */
  MOBILE: {
    ANCHOR_BOTTOM: '2854054771', // Bottom sticky anchors
  },

  /**
   * SPECIALIZED/OTHER
   */
  SPECIALIZED: {
    TABLE_ADS: '5390529067', // For college tables and other specialized tables
    HOMEPAGE_MIDDLE: '8505787982', // Mid-page ad on homepage
  },
} as const;

/**
 * AD PLACEMENT STRATEGY (From Monetization Blueprint)
 * 
 * ARTICLE PAGE OPTIMAL SEQUENCE:
 * 1. After 300 words (~40% scroll) → BLOG.IN_ARTICLE_1 (RPM: 1.8-2.5)
 * 2. After first H2 heading → BLOG.IN_CONTENT (RPM: 2.0-2.8)
 * 3. At 60% content (MONEY ZONE) → BLOG.IN_ARTICLE_2 (RPM: 2.5-3.2 ⭐)
 * 4. Before conclusion → BLOG.BOTTOM_RECTANGLE (RPM: 1.5-2.0)
 * 5. After article → BLOG.IN_RELATED (RPM: 1.2-1.8)
 * 
 * DESKTOP BONUS: Sticky sidebar → BLOG.SIDEBAR_STICKY (+$0.50-1.50/session)
 * MOBILE BONUS: Bottom anchor → BLOG.MOBILE_ANCHOR (+$0.30-0.60/session)
 * 
 * OPTIMAL AD DENSITY: 30-40%
 * - Mobile: 4-5 ad units per article
 * - Desktop: 6-8 ad units per article (includes sidebar)
 * 
 * SACRED ZONES (NEVER PLACE ADS):
 * - First 600px of any page
 * - Immediately before/after CTAs
 * - Within forms/calculators before submission
 * - Around author bios
 * 
 * REVENUE HIERARCHY BY PAGE TYPE:
 * 1. Calculator Pages: $5-12 RPM ⭐⭐
 * 2. Results Pages: $3-8 RPM
 * 3. How-To Guides: $2-6 RPM
 * 4. Homepage: $1-3 RPM (traffic driver)
 */

export default AD_SLOTS;
