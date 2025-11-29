# Analytics Integration Guide

## Overview

This project includes a comprehensive analytics setup with organized components for multiple analytics platforms. All analytics are centrally managed and can be easily enabled/disabled via environment variables.

## 📊 Supported Analytics Platforms

### ✅ Currently Active (Already Configured)
- **Google Analytics 4** (G-N1FJ0X03GL)
- **Microsoft Clarity** (n6vruy6vlg)
- **Facebook Pixel** (27624496020475115)
- **Google Tag Manager** (GTM-W6TSKNVX)

### 🔄 Available (Ready to Enable)
- **Hotjar** - Heatmaps & session recordings
- **LinkedIn Insight Tag** - B2B conversion tracking
- **Twitter (X) Pixel** - Social media tracking

---

## 🗂️ File Structure

```
src/
├── components/
│   └── analytics/
│       ├── index.tsx                    # Main provider (import this)
│       ├── GoogleAnalytics.tsx          # GA4 component
│       ├── MicrosoftClarity.tsx         # Clarity component
│       ├── FacebookPixel.tsx            # FB Pixel component
│       ├── Hotjar.tsx                   # Hotjar component
│       ├── LinkedInInsightTag.tsx       # LinkedIn component
│       └── TwitterPixel.tsx             # Twitter component
├── config/
│   └── analytics.ts                     # Central configuration
└── lib/
    └── analytics-utils.ts               # Tracking helper functions

.env.analytics.example                   # Environment variable template
```

---

## 🚀 Quick Start

### 1. Set Up Environment Variables

Copy the example file and configure your IDs:

```bash
cp .env.analytics.example .env.local
```

Edit `.env.local` with your analytics IDs:

```env
# Enable/disable individual platforms
NEXT_PUBLIC_GA_ENABLED=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

NEXT_PUBLIC_CLARITY_ENABLED=true
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id

NEXT_PUBLIC_FB_PIXEL_ENABLED=true
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id
```

### 2. Analytics Provider (Already Integrated)

The `AnalyticsProvider` component is already added to your root layout at [src/app/layout.tsx:185](../../src/app/layout.tsx#L185).

It automatically loads all enabled analytics based on your environment variables.

---

## 📝 Configuration

### Central Configuration File

All analytics settings are managed in [src/config/analytics.ts](../../src/config/analytics.ts).

```typescript
import { analyticsConfig } from "@/config/analytics";

// Check if Google Analytics is enabled
if (analyticsConfig.googleAnalytics.enabled) {
  console.log("GA4 is active");
}

// Get list of all enabled analytics
import { getEnabledAnalytics } from "@/config/analytics";
console.log(getEnabledAnalytics()); // ["Google Analytics", "Microsoft Clarity", ...]
```

### Individual Components

You can also use individual analytics components:

```tsx
import { GoogleAnalytics, MicrosoftClarity } from "@/components/analytics";

export default function MyPage() {
  return (
    <>
      <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
      <MicrosoftClarity projectId="your_project_id" />
      {/* Your page content */}
    </>
  );
}
```

---

## 📈 Tracking Custom Events

### Using Helper Functions

The project includes pre-built tracking functions in [src/lib/analytics-utils.ts](../../src/lib/analytics-utils.ts).

#### Track Result Check
```tsx
import { trackResultCheck } from "@/lib/analytics-utils";

function handleResultCheck(rollNumber: string) {
  trackResultCheck(rollNumber, "semester_results");
  // ... your logic
}
```

#### Track Calculator Usage
```tsx
import { trackCalculatorUse } from "@/lib/analytics-utils";

function CGPACalculator() {
  useEffect(() => {
    trackCalculatorUse("CGPA Calculator");
  }, []);

  // ... component logic
}
```

#### Track Alert Subscriptions
```tsx
import { trackAlertSubscription } from "@/lib/analytics-utils";

async function handleSubscribe(email: string) {
  // ... subscription logic
  trackAlertSubscription("notification_alerts");
}
```

#### Track Form Submissions
```tsx
import { trackFormSubmission } from "@/lib/analytics-utils";

function handleContactSubmit(formData: FormData) {
  trackFormSubmission("contact_form");
  // ... submit logic
}
```

### Universal Event Tracking

Track the same event across all platforms at once:

```tsx
import { trackUniversalEvent } from "@/lib/analytics-utils";

trackUniversalEvent("purchase_complete", {
  category: "Ecommerce",
  label: "Premium Plan",
  value: 99.99,
  currency: "INR",
});
```

### Platform-Specific Events

```tsx
import { trackGAEvent, trackFBEvent, trackTwitterEvent } from "@/lib/analytics-utils";

// Google Analytics only
trackGAEvent("video_play", {
  category: "Media",
  label: "Tutorial Video",
});

// Facebook Pixel only
trackFBEvent("Lead", {
  value: 50,
  currency: "INR",
  content_name: "Newsletter Signup",
});

// Twitter Pixel only
trackTwitterEvent("tw-signup", {
  value: 1,
});
```

---

## 🎯 Common Use Cases

### 1. Track Page Performance

```tsx
import { trackPageLoadTime } from "@/lib/analytics-utils";

useEffect(() => {
  const startTime = performance.now();

  // Your page loading logic

  const loadTime = performance.now() - startTime;
  trackPageLoadTime("Results Page", loadTime);
}, []);
```

### 2. Track Errors

```tsx
import { trackError } from "@/lib/analytics-utils";

try {
  // Your code
} catch (error) {
  trackError("API Error", error.message);
}
```

### 3. Track Outbound Links

```tsx
import { trackOutboundLink } from "@/lib/analytics-utils";

<a
  href="https://jntuh.ac.in"
  onClick={() => trackOutboundLink("https://jntuh.ac.in", "JNTUH Official")}
  target="_blank"
  rel="noopener noreferrer"
>
  Visit JNTUH
</a>
```

### 4. Track Resource Downloads

```tsx
import { trackResourceDownload } from "@/lib/analytics-utils";

function downloadPaper(paperName: string) {
  trackResourceDownload("Previous Papers", paperName);
  // ... download logic
}
```

---

## 🔧 Advanced Configuration

### Disable Analytics in Development

Analytics are automatically loaded in all environments. To disable in development:

```typescript
// src/config/analytics.ts
export const analyticsConfig = {
  googleAnalytics: {
    enabled: process.env.NODE_ENV === 'production' &&
             process.env.NEXT_PUBLIC_GA_ENABLED === "true",
    // ...
  },
};
```

### Custom Event Names

Create your own tracking functions in `src/lib/analytics-utils.ts`:

```typescript
export const trackCustomEvent = (eventName: string, params?: any) => {
  trackUniversalEvent(eventName, {
    category: "Custom",
    ...params,
  });
};
```

---

## 📊 Analytics Platform Setup Guides

### Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property (GA4)
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ENABLED=true
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Microsoft Clarity

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project
3. Get your Project ID
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLARITY_ENABLED=true
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id
   ```

### Facebook Pixel

1. Go to [Facebook Business Manager](https://business.facebook.com/)
2. Create a Pixel
3. Get your Pixel ID
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_FB_PIXEL_ENABLED=true
   NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id
   ```

### Hotjar

1. Go to [Hotjar](https://insights.hotjar.com/)
2. Create a new site
3. Get your Site ID
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_HOTJAR_ENABLED=true
   NEXT_PUBLIC_HOTJAR_SITE_ID=your_site_id
   ```

### LinkedIn Insight Tag

1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Create an Insight Tag
3. Get your Partner ID
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_LINKEDIN_ENABLED=true
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=your_partner_id
   ```

### Twitter (X) Pixel

1. Go to [Twitter Ads](https://ads.twitter.com/)
2. Create a Pixel
3. Get your Pixel ID
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_TWITTER_PIXEL_ENABLED=true
   NEXT_PUBLIC_TWITTER_PIXEL_ID=your_pixel_id
   ```

---

## 🔍 Debugging

### Check Which Analytics Are Loaded

```typescript
import { getEnabledAnalytics } from "@/config/analytics";

console.log("Enabled analytics:", getEnabledAnalytics());
```

### Verify Scripts in Browser

Open browser console and check:

```javascript
// Google Analytics
console.log(window.gtag);

// Facebook Pixel
console.log(window.fbq);

// Microsoft Clarity
console.log(window.clarity);

// Hotjar
console.log(window.hj);

// Twitter
console.log(window.twq);

// LinkedIn
console.log(window.lintrk);
```

### Test Events

```tsx
import { trackUniversalEvent } from "@/lib/analytics-utils";

// Trigger a test event
trackUniversalEvent("test_event", {
  category: "Testing",
  label: "Debug",
});
```

Then check in:
- GA4: Realtime > Events
- Clarity: Dashboard > Session recordings
- Facebook: Events Manager

---

## 🎨 Best Practices

### 1. Use Descriptive Event Names
```typescript
// ✅ Good
trackGAEvent("cgpa_calculator_submit", { ... });

// ❌ Bad
trackGAEvent("click", { ... });
```

### 2. Add Context with Parameters
```typescript
// ✅ Good
trackCalculatorUse("CGPA Calculator");

// ❌ Bad - Less useful data
trackGAEvent("calculator");
```

### 3. Track User Journey
```typescript
// Login
trackUniversalEvent("user_login");

// View results
trackResultCheck(rollNumber, "consolidated");

// Download resource
trackResourceDownload("Syllabus", "R22 CSE");
```

### 4. Respect Privacy
- Never track personally identifiable information (PII)
- Only track aggregated/anonymized data
- Follow GDPR/privacy regulations

```typescript
// ✅ Good - Anonymized
trackResultCheck("20J2", "semester_results"); // First 4 digits only

// ❌ Bad - Full roll number
trackResultCheck("20J25A0501", "semester_results");
```

---

## 📚 Additional Resources

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Facebook Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Hotjar Documentation](https://help.hotjar.com/)
- [LinkedIn Insight Tag](https://business.linkedin.com/marketing-solutions/insight-tag)
- [Twitter Pixel Documentation](https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html)

---

## 🤝 Contributing

When adding new analytics platforms:

1. Create a component in `src/components/analytics/`
2. Add configuration to `src/config/analytics.ts`
3. Add environment variables to `.env.analytics.example`
4. Update `src/components/analytics/index.tsx`
5. Document in this guide

---

## 📞 Support

For analytics issues:
- Check browser console for errors
- Verify environment variables are set
- Ensure tracking IDs are correct
- Test in incognito mode (ad blockers may interfere)
