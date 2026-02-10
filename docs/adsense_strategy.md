# AdSense Revenue Optimization Strategy: JNTUH Results

This document outlines the strategic placement and configuration of Google AdSense units to maximize revenue while maintaining a fast, user-friendly experience during high-traffic academic seasons.

## 1. High-Performance Ad Placements

### Home & Result Portal
*   **Top Banner (Leaderboard)**: 728x90 desktop / 320x100 mobile. Placed immediately after the Navbar but before the Hero content.
*   **Anchor Ad (Mobile)**: Sticky bottom ad. This is the highest-performing mobile unit for student audiences who spend long durations reviewing their marks.
*   **In-Content (Square/Rectangle)**: Placed after the "Check Results" button. High visibility as users wait for result fetches.

### Blog & Guides
*   **In-Article (Fluid)**: Inserted every 300-400 words. These blend naturally with educational content.
*   **Multiplex (Bottom)**: Placed after the guide content. Encourages discovery and multiple clicks by showing a grid of relevant "sponsored" content.

### Calculator Tools
*   **Sticky Sidebar (Desktop)**: A vertical unit (300x600) that stays visible while users input scores for multiple subjects.
*   **Responsive Banner (Bottom)**: Placed under the "Results" card to capture attention after the user's primary goal (calculation) is completed.

## 2. Technical Implementation Rules

### Optimized Lazy Loading
Ad scripts should be loaded with `strategy="afterInteractive"`. However, the `ins` tags should only initialize when nearing the viewport to prevent slowing down the "Largest Contentful Paint" (LCP).

### Layout Shifting (CLS) Prevention
Always define a `min-height` for ad containers (e.g., `min-h-[90px]` or `min-h-[250px]`). This prevents the page content from "jumping" when an ad is filled, which improves SEO and user experience.

## 3. Revenue Maximization Tactics

1.  **High-Impression Days**: On result days, switch to a more aggressive layout on the `/jntuh-results-checker-fast-server` page, including a prominent banner above the roll number input.
2.  **Custom Channels**: Group ad units into "Tool Pages" and "Educational Guides" to target advertisers more effectively.
3.  **CTR Optimization**: Use "Vibrant" ad styles that match the site's primary blue (`#1C61E7`) and emerald (`#21C15E`) colors.
4.  **Multiplex Ads**: Use these on "No result found" or "Internal Error" pages to monetize exits.

## 4. Balanced UX Checklist
- [ ] No ads overlap primary "Check Result" buttons.
- [ ] Mobile anchor ads have a clear "Close" button.
- [ ] Maximum 4-5 total ad units per long-form page.
- [ ] Ad labels (e.g., "ADVERTISEMENT") are clear.
