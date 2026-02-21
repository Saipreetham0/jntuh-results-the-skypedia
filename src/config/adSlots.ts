/**
 * Ad Placement Configuration
 *
 * All slot IDs sourced directly from AdSense dashboard for ca-pub-8569567515057281.
 * Last synced: Feb 20, 2026
 */

export const AD_SLOTS = {
  // Publisher ID
  PUBLISHER_ID: 'ca-pub-8569567515057281',

  /**
   * BLOG / ARTICLE PAGES — Primary revenue source
   */
  BLOG: {
    TOP_BANNER: '1365713287', // Display — "TOP_BANNER"
    HEADER: '1365713287', // same unit reused
    IN_ARTICLE_1: '3537523006', // In-article — "IN_ARTICLE_1"
    IN_CONTENT: '3537523006', // reuse in-article
    IN_ARTICLE_2: '2854054771', // In-article — "IN_ARTICLE_2" (money-zone)
    BOTTOM_RECTANGLE: '7970650085', // Display — "BOTTOM_RECTANGLE"
    BOTTOM_BANNER: '8014882116', // Display — "BOTTOM_BANNER"
    SIDEBAR_STICKY: '2032869647', // Display — "SIDEBAR_STICKY"
    MOBILE_ANCHOR: '5042176362', // Display — "ANCHOR_BOTTOM"
    IN_RELATED: '7970650085', // reuse bottom rect for related section
  },

  /**
   * HOMEPAGE
   */
  HOMEPAGE: {
    TOP_BANNER: '1365713287', // Display — "TOP_BANNER"
    MID_BANNER: '2067299138', // Display — "homepage middle"
    MID_RECTANGLE: '3832094528', // Display — "MID_RECTANGLE"
    BOTTOM_BANNER: '8014882116', // Display — "BOTTOM_BANNER"
    MOBILE_ANCHOR: '5042176362', // Display — "ANCHOR_BOTTOM"
  },

  /**
   * CALCULATOR PAGES — Highest RPM ($5-12)
   */
  CALCULATOR: {
    TOP_BANNER: '1365713287', // Display — "TOP_BANNER"
    MID_RECTANGLE: '3832094528', // Display — "MID_RECTANGLE"
    RESULT_TOP: '2008818916', // Display — "INLINE_1"
    RESULT_MIDDLE: '3832094528', // Display — "MID_RECTANGLE"
    RESULT_BOTTOM: '7970650085', // Display — "BOTTOM_RECTANGLE"
    BOTTOM_RECTANGLE: '7970650085', // Display — "BOTTOM_RECTANGLE"
    SIDEBAR_STICKY: '2032869647', // Display — "SIDEBAR_STICKY"
    IN_CONTENT: '1853036550', // In-article — "in artical ads"
  },

  /**
   * RESULTS PAGES
   */
  RESULTS: {
    TOP_BANNER: '1365713287', // Display — "TOP_BANNER"
    INLINE_1: '2008818916', // Display — "INLINE_1"
    INLINE_2: '5388718770', // Display — "INLINE_2"
    INLINE_3: '7285196323', // Display — "INLINE_3"
    BOTTOM_BANNER: '8014882116', // Display — "BOTTOM_BANNER"
    SIDEBAR_WIDGET: '2416013028', // Display — "STICKY_TOP"
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
   * CONSOLIDATED RESULTS
   */
  CONSOLIDATED: {
    TOP_BANNER: '1365713287',
    INLINE_1: '2008818916',
    INLINE_2: '5388718770',
    BOTTOM_RECTANGLE: '7970650085',
  },

  /**
   * SIDEBAR (general purpose)
   */
  SIDEBAR: {
    STICKY_TOP: '2416013028', // Display — "STICKY_TOP"
    STICKY_MIDDLE: '3729094695', // Display — "STICKY_MID"
  },

  /**
   * MOBILE-SPECIFIC
   */
  MOBILE: {
    ANCHOR_BOTTOM: '5042176362', // Display — "ANCHOR_BOTTOM"
  },

  /**
   * ACTION / INTERACTIVE PAGES (before/after CTA buttons)
   */
  ACTIONS: {
    TOP_BEFORE_BUTTON: '1787426367', // Display — "Advertisement Top (Before Button)"
    TOP_AFTER_BUTTON: '5879135768', // Display — "Advertisement Top (After Button)"
    BOTTOM_BEFORE_BUTTON: '4312571525', // Display — "Advertisement Bottom (Before Button)"
    BOTTOM_AFTER_BUTTON: '8113957727', // Display — "Advertisement Bottom (After Button)"
  },

  /**
   * SYLLABUS PAGES
   */
  SYLLABUS: {
    TOP_BANNER: '1365713287',
    MID_CONTENT: '1853036550', // In-article — "in artical ads"
    BOTTOM_BANNER: '8014882116',
  },

  /**
   * BACKLOGS
   */
  BACKLOGS: {
    TOP_BANNER: '1365713287',
    BOTTOM_BANNER: '8014882116',
  },

  /**
   * TABLE / COLLEGES
   */
  TABLE: {
    ABOVE: '8279758421', // In-article — "Table ads"
    BELOW: '8279758421',
  },

  COLLEGES: {
    TOP_BANNER: '1365713287',
    TABLE_TOP: '8279758421', // In-article — "Table ads"
    TABLE_BOTTOM: '8279758421',
  },

  /**
   * MULTIPLEX (related content grid)
   */
  MULTIPLEX: '3066073345', // Multiplex — "jntuh theskypedia"

  /**
   * QUESTION PAPERS
   */
  QUESTION_PAPERS: {
    TOP_BANNER: '1365713287',
    IN_CONTENT: '1853036550', // In-article — "in artical ads"
    MULTIPLEX: '3066073345',
  },

  /**
   * MBA / MTECH RESULTS
   */
  MBA_RESULTS: {
    TOP: '1365713287',
    MIDDLE: '2008818916',
    BOTTOM: '8014882116',
  },

  MTECH_RESULTS: {
    TOP: '1365713287',
    MIDDLE: '2008818916',
    BOTTOM: '8014882116',
  },

  CAMPUS_CONNECT: {
    TOP_BANNER: '1365713287',
    BOTTOM_BANNER: '8014882116',
  },

  /**
   * SPECIALIZED / OTHER
   */
  SPECIALIZED: {
    TABLE_ADS: '8279758421', // In-article — "Table ads"
    HOMEPAGE_MIDDLE: '2067299138', // Display  — "homepage middle"
    IN_FEED: '7680078303', // In-feed  — "feed ads"
    IN_ARTICLE: '1853036550', // In-article — "in artical ads"
    LOADING_PAGE: '8973292958', // Display  — "loading page"
  },
} as const;

export default AD_SLOTS;
