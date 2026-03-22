/**
 * Ad Placement Configuration
 *
 * All slot IDs verified against AdSense dashboard for ca-pub-4870864326886980.
 * Last synced: Mar 23, 2026
 *
 * FORMAT RULES (critical — wrong format = ads won't serve):
 *   Display ads  → data-ad-format="auto"                              (no data-ad-layout)
 *   In-article   → data-ad-format="fluid" + data-ad-layout="in-article"
 *   In-feed      → data-ad-format="fluid" + data-ad-layout="in-feed"
 *   Multiplex    → data-ad-format="autorelaxed"                       (no data-ad-layout)
 *
 * IMPORTANT: Never reuse the same slot ID more than once on the same page.
 */

export const AD_SLOTS = {
  PUBLISHER_ID: 'ca-pub-4870864326886980',

  // ─── CORE SLOTS (named by position) ─────────────────────────────────────
  TOP_BANNER:        '1365713287', // Display
  BOTTOM_BANNER:     '8014882116', // Display
  BOTTOM_RECTANGLE:  '7970650085', // Display
  MID_RECTANGLE:     '3832094528', // Display
  INLINE_1:          '2008818916', // Display
  INLINE_2:          '5388718770', // Display
  INLINE_3:          '7285196323', // Display
  SIDEBAR_STICKY:    '2032869647', // Display
  SIDEBAR_MID:       '3729094695', // Display
  STICKY_TOP:        '2416013028', // Display
  ANCHOR_BOTTOM:     '5042176362', // Display
  IN_ARTICLE_1:      '3537523006', // In-article  ← must use format=fluid + layout=in-article
  IN_ARTICLE_2:      '2854054771', // In-article  ← must use format=fluid + layout=in-article
  IN_ARTICLE_3:      '1853036550', // In-article  ← must use format=fluid + layout=in-article
  IN_FEED:           '7680078303', // In-feed     ← must use format=fluid + layout=in-feed
  MULTIPLEX:         '3066073345', // Multiplex

  // ─── DISPLAY SLOTS ───────────────────────────────────────────────────────
  ABOVE_HEADER:      '7959001633', // Display — top of page header
  FOOTER_STICKY:     '6260923533', // Display — footer sticky
  LEADERBOARD:       '1262009617', // Display — 728×90 leaderboard
  BETWEEN:           '1142590115', // Display — between content sections
  LOADING_PAGE:      '8973292958', // Display — loading/waiting screen
  RESULTS_JNTUH:     '5967398818', // Display — results pages
  AFTER_TITLE:       '7696637594', // Display — after article title
  ELECTRO_CAL:       '2275692392', // Display — calculator pages
  TABLE_ABOVE:       '8279758421', // In-article — above/below tables  ← format=fluid + layout=in-article
  TABLE_BELOW:       '3139095070', // Display — below tables
  COLLEGES_BOTTOM:   '6319792181', // Display — college listings bottom
  ACTIONS_TOP_BEFORE:    '1787426367', // Display — before top CTA button
  ACTIONS_TOP_AFTER:     '5879135768', // Display — after top CTA button
  ACTIONS_BOTTOM_BEFORE: '4312571525', // Display — before bottom CTA button
  ACTIONS_BOTTOM_AFTER:  '8113957727', // Display — after bottom CTA button

  // ─── PAGE GROUPS (map to core slots above) ───────────────────────────────

  HOMEPAGE: {
    TOP_BANNER:    '1365713287', // Display
    MID_RECTANGLE: '3832094528', // Display
    MID_BANNER:    '2067299138', // Display — "homepage middle"
    BOTTOM_BANNER: '8014882116', // Display
  },

  BLOG: {
    TOP_BANNER:       '1365713287', // Display
    IN_ARTICLE_1:     '3537523006', // In-article ← format=fluid + layout=in-article
    IN_ARTICLE_2:     '2854054771', // In-article ← format=fluid + layout=in-article
    BOTTOM_RECTANGLE: '7970650085', // Display
    BOTTOM_BANNER:    '8014882116', // Display
    SIDEBAR_STICKY:   '2032869647', // Display
    IN_RELATED:       '5592333174', // Display
    MOBILE_ANCHOR:    '5042176362', // Display
  },

  CALCULATOR: {
    TOP_BANNER:    '1365713287', // Display
    MID_RECTANGLE: '3832094528', // Display
    RESULT_TOP:    '2008818916', // Display
    RESULT_MIDDLE: '1082242520', // Display
    RESULT_BOTTOM: '7970650085', // Display
    SIDEBAR_STICKY:'2032869647', // Display
    IN_CONTENT:    '1853036550', // In-article ← format=fluid + layout=in-article
    ELECTRO_CAL:   '2275692392', // Display
  },

  RESULTS: {
    TOP_BANNER:     '1365713287', // Display
    INLINE_1:       '2008818916', // Display
    INLINE_2:       '5388718770', // Display
    INLINE_3:       '7285196323', // Display
    BOTTOM_BANNER:  '8014882116', // Display
    SIDEBAR_WIDGET: '2416013028', // Display
    RESULTS_JNTUH:  '5967398818', // Display
  },

  SEMESTER: {
    TOP_BANNER:      '1365713287', // Display
    INLINE_1:        '2008818916', // Display
    INLINE_2:        '5388718770', // Display
    BOTTOM_RECTANGLE:'7970650085', // Display
    BOTTOM_BANNER:   '8014882116', // Display
    SIDEBAR_WIDGET:  '2416013028', // Display
  },

  CONSOLIDATED: {
    TOP_BANNER:      '1365713287', // Display
    INLINE_1:        '2008818916', // Display
    INLINE_2:        '5388718770', // Display
    BOTTOM_RECTANGLE:'7970650085', // Display
  },

  SIDEBAR: {
    STICKY_TOP: '2416013028', // Display
    STICKY_MID: '3729094695', // Display
  },

  MOBILE: {
    ANCHOR_BOTTOM: '5042176362', // Display
  },

  SYLLABUS: {
    TOP_BANNER:  '1365713287', // Display
    MID_CONTENT: '1853036550', // In-article ← format=fluid + layout=in-article
    BOTTOM_BANNER:'8014882116', // Display
  },

  BACKLOGS: {
    TOP_BANNER:   '1365713287', // Display
    BOTTOM_BANNER:'8014882116', // Display
  },

  TABLE: {
    ABOVE: '8279758421', // In-article ← format=fluid + layout=in-article
    BELOW: '3139095070', // Display
  },

  COLLEGES: {
    TOP_BANNER:   '1365713287', // Display
    TABLE_TOP:    '8279758421', // In-article ← format=fluid + layout=in-article
    TABLE_BOTTOM: '6319792181', // Display
  },

  ACTIONS: {
    TOP_BEFORE_BUTTON:    '1787426367', // Display
    TOP_AFTER_BUTTON:     '5879135768', // Display
    BOTTOM_BEFORE_BUTTON: '4312571525', // Display
    BOTTOM_AFTER_BUTTON:  '8113957727', // Display
  },

  QUESTION_PAPERS: {
    TOP_BANNER: '1365713287', // Display
    IN_CONTENT: '1853036550', // In-article ← format=fluid + layout=in-article
    MULTIPLEX:  '3066073345', // Multiplex
  },

  MBA_RESULTS: {
    TOP:    '1365713287', // Display
    MIDDLE: '2008818916', // Display
    BOTTOM: '8014882116', // Display
  },

  MTECH_RESULTS: {
    TOP:    '1365713287', // Display
    MIDDLE: '2008818916', // Display
    BOTTOM: '8014882116', // Display
  },

  SPECIALIZED: {
    TABLE_ADS:       '8279758421', // In-article ← format=fluid + layout=in-article
    HOMEPAGE_MIDDLE: '2067299138', // Display
    IN_FEED:         '7680078303', // In-feed ← format=fluid + layout=in-feed
    IN_ARTICLE:      '1853036550', // In-article ← format=fluid + layout=in-article
    LOADING_PAGE:    '8973292958', // Display
  },
} as const;

export default AD_SLOTS;
