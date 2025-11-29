# Analytics Documentation

## 📁 Contents

- **[ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md)** - Complete analytics integration guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for common tracking functions

---

## 🎯 Overview

The JNTUH Results website uses a comprehensive analytics setup with multiple platforms to track user behavior, conversions, and performance metrics.

### Active Analytics Platforms

| Platform | ID/Code | Purpose | Status |
|----------|---------|---------|--------|
| **Google Analytics 4** | G-N1FJ0X03GL | Page views, events, user behavior | ✅ Active |
| **Microsoft Clarity** | n6vruy6vlg | Heatmaps, session recordings | ✅ Active |
| **Facebook Pixel** | 27624496020475115 | Conversion tracking, retargeting | ✅ Active |
| **Google Tag Manager** | GTM-W6TSKNVX | Tag management | ✅ Active |
| **Hotjar** | - | Heatmaps, feedback | 🔄 Ready to enable |
| **LinkedIn Insight** | - | B2B tracking | 🔄 Ready to enable |
| **Twitter Pixel** | - | Social tracking | 🔄 Ready to enable |

---

## 🚀 Quick Start

### 1. View Configuration

All analytics are configured in:
- **Components**: `src/components/analytics/`
- **Config**: `src/config/analytics.ts`
- **Utils**: `src/lib/analytics-utils.ts`

### 2. Track Events

```tsx
import { trackCalculatorUse } from "@/lib/analytics-utils";

trackCalculatorUse("CGPA Calculator");
```

### 3. Enable New Analytics

```bash
# Edit .env.local
NEXT_PUBLIC_HOTJAR_ENABLED=true
NEXT_PUBLIC_HOTJAR_SITE_ID=your_site_id
```

---

## 📊 Key Metrics Tracked

### User Engagement
- ✅ Page views
- ✅ Session duration
- ✅ Bounce rate
- ✅ User flow

### Feature Usage
- ✅ Result checks (by exam type)
- ✅ Calculator usage (CGPA, SGPA, etc.)
- ✅ Alert subscriptions
- ✅ Resource downloads

### Performance
- ✅ Page load time
- ✅ API response time
- ✅ Error tracking

### Conversions
- ✅ Form submissions
- ✅ Alert subscriptions
- ✅ Resource downloads

---

## 🔧 Adding New Analytics

### Step 1: Create Component
```tsx
// src/components/analytics/NewAnalytics.tsx
export default function NewAnalytics({ id }: { id: string }) {
  return <Script ... />;
}
```

### Step 2: Add to Config
```typescript
// src/config/analytics.ts
export const analyticsConfig = {
  newAnalytics: {
    enabled: process.env.NEXT_PUBLIC_NEW_ANALYTICS_ENABLED === "true",
    id: process.env.NEXT_PUBLIC_NEW_ANALYTICS_ID || "",
  },
};
```

### Step 3: Update Provider
```tsx
// src/components/analytics/index.tsx
import NewAnalytics from "./NewAnalytics";

export default function AnalyticsProvider() {
  return (
    <>
      {/* ... existing analytics */}
      {analyticsConfig.newAnalytics.enabled && (
        <NewAnalytics id={analyticsConfig.newAnalytics.id} />
      )}
    </>
  );
}
```

---

## 🎓 Learn More

- **Full Guide**: [ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md)
- **Quick Reference**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## 📞 Support

For questions or issues:
1. Check the [ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md)
2. Verify environment variables
3. Test in browser console
4. Check analytics platform dashboards

---

## 🔐 Privacy

All analytics implementations:
- ✅ Respect user privacy
- ✅ No PII tracking
- ✅ GDPR compliant
- ✅ Anonymized data
- ✅ User opt-out support (via ad blockers)

---

Last Updated: November 2025
