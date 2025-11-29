# Analytics Quick Reference

## 🎯 Common Tracking Functions

### Import
```tsx
import {
  trackResultCheck,
  trackCalculatorUse,
  trackAlertSubscription,
  trackFormSubmission,
  trackResourceDownload,
  trackShare,
  trackError,
  trackOutboundLink,
} from "@/lib/analytics-utils";
```

---

## 📊 Tracking Cheat Sheet

| Action | Function | Example |
|--------|----------|---------|
| **Check Results** | `trackResultCheck(rollNo, type)` | `trackResultCheck("20J2", "semester")` |
| **Use Calculator** | `trackCalculatorUse(name)` | `trackCalculatorUse("CGPA Calculator")` |
| **Subscribe to Alerts** | `trackAlertSubscription(type)` | `trackAlertSubscription("notifications")` |
| **Submit Form** | `trackFormSubmission(name)` | `trackFormSubmission("contact_form")` |
| **Download Resource** | `trackResourceDownload(type, name)` | `trackResourceDownload("Paper", "CSE R22")` |
| **Share Content** | `trackShare(platform, type)` | `trackShare("WhatsApp", "results")` |
| **Track Error** | `trackError(type, message)` | `trackError("API", error.message)` |
| **External Link** | `trackOutboundLink(url, text)` | `trackOutboundLink(href, "JNTUH")` |

---

## 🔧 Environment Variables

```env
# Google Analytics
NEXT_PUBLIC_GA_ENABLED=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ENABLED=true
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_id

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ENABLED=true
NEXT_PUBLIC_FB_PIXEL_ID=your_id

# Hotjar
NEXT_PUBLIC_HOTJAR_ENABLED=false
NEXT_PUBLIC_HOTJAR_SITE_ID=your_id

# LinkedIn
NEXT_PUBLIC_LINKEDIN_ENABLED=false
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=your_id

# Twitter
NEXT_PUBLIC_TWITTER_PIXEL_ENABLED=false
NEXT_PUBLIC_TWITTER_PIXEL_ID=your_id
```

---

## 📍 File Locations

| Component | Path |
|-----------|------|
| **Main Provider** | `src/components/analytics/index.tsx` |
| **Configuration** | `src/config/analytics.ts` |
| **Utilities** | `src/lib/analytics-utils.ts` |
| **Layout Integration** | `src/app/layout.tsx:185` |
| **Env Template** | `.env.analytics.example` |

---

## 💡 Quick Examples

### Track Calculator Usage
```tsx
function CGPACalculator() {
  useEffect(() => {
    trackCalculatorUse("CGPA Calculator");
  }, []);

  // ... component
}
```

### Track Form Submission
```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  trackFormSubmission("contact_form");
  // ... submit logic
};
```

### Track Result Check
```tsx
const checkResults = async (rollNo) => {
  trackResultCheck(rollNo, "consolidated_results");
  // ... fetch results
};
```

### Track Downloads
```tsx
const downloadPaper = (paperName) => {
  trackResourceDownload("Previous Paper", paperName);
  window.open(paperUrl);
};
```

---

## 🔍 Debug Commands

```javascript
// Browser console
console.log(window.gtag);          // Google Analytics
console.log(window.fbq);           // Facebook Pixel
console.log(window.clarity);       // Microsoft Clarity
console.log(window.hj);            // Hotjar
console.log(window.twq);           // Twitter
console.log(window.lintrk);        // LinkedIn
```

---

## ✅ Currently Active

- ✅ **Google Analytics**: G-N1FJ0X03GL
- ✅ **Microsoft Clarity**: n6vruy6vlg
- ✅ **Facebook Pixel**: 27624496020475115
- ✅ **Google Tag Manager**: GTM-W6TSKNVX

---

## 📖 Full Documentation

See [ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md) for complete documentation.
