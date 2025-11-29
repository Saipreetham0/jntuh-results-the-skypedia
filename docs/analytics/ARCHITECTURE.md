# Analytics Architecture

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      User's Browser                              │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ Page Load
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│                    src/app/layout.tsx                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Line 185: <AnalyticsProvider />                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│         src/components/analytics/index.tsx                       │
│                  (AnalyticsProvider)                             │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  Reads configuration from src/config/analytics.ts      │     │
│  │  Conditionally loads enabled analytics components      │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────────────┬───────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────┐
        │              │               │              │
        ▼              ▼               ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────┐
│   Google     │ │  Microsoft   │ │ Facebook │ │ Hotjar   │
│  Analytics   │ │   Clarity    │ │  Pixel   │ │(Optional)│
│              │ │              │ │          │ │          │
│G-N1FJ0X03GL │ │ n6vruy6vlg   │ │27624...  │ │          │
└──────────────┘ └──────────────┘ └──────────┘ └──────────┘
```

---

## 🔄 Data Flow

### 1. **Initialization**

```
Application Start
       │
       ▼
layout.tsx loads
       │
       ▼
AnalyticsProvider mounts
       │
       ▼
Reads analyticsConfig
       │
       ├──► GA enabled? ──► Load GoogleAnalytics.tsx
       ├──► Clarity enabled? ──► Load MicrosoftClarity.tsx
       ├──► FB Pixel enabled? ──► Load FacebookPixel.tsx
       └──► Hotjar enabled? ──► Load Hotjar.tsx
```

### 2. **Event Tracking**

```
User Action
    │
    ▼
Component calls tracking function
    │
    ▼
src/lib/analytics-utils.ts
    │
    ├──► trackGAEvent() ──► window.gtag()
    ├──► trackFBEvent() ──► window.fbq()
    ├──► trackTwitterEvent() ──► window.twq()
    └──► trackUniversalEvent() ──► All platforms
```

### 3. **Configuration Hierarchy**

```
Priority Order:
    │
    ▼
1. Environment Variables (.env.local)
    │
    ▼
2. Fallback Values (src/config/analytics.ts)
    │
    ▼
3. Component Defaults
```

---

## 🗃️ File Dependencies

```
src/app/layout.tsx
    │
    └──imports──► src/components/analytics/index.tsx
                      │
                      ├──imports──► src/config/analytics.ts
                      │                  │
                      │                  └──reads──► .env.local
                      │
                      ├──imports──► GoogleAnalytics.tsx
                      ├──imports──► MicrosoftClarity.tsx
                      ├──imports──► FacebookPixel.tsx
                      ├──imports──► Hotjar.tsx
                      ├──imports──► LinkedInInsightTag.tsx
                      └──imports──► TwitterPixel.tsx

Application Components
    │
    └──imports──► src/lib/analytics-utils.ts
                      │
                      └──uses──► window.gtag
                      └──uses──► window.fbq
                      └──uses──► window.clarity
                      └──uses──► window.hj
```

---

## 🔐 Environment Configuration

```
.env.local (Optional)
    │
    ▼
src/config/analytics.ts
    │
    ├──► NEXT_PUBLIC_GA_ENABLED
    │    NEXT_PUBLIC_GA_MEASUREMENT_ID
    │
    ├──► NEXT_PUBLIC_CLARITY_ENABLED
    │    NEXT_PUBLIC_CLARITY_PROJECT_ID
    │
    ├──► NEXT_PUBLIC_FB_PIXEL_ENABLED
    │    NEXT_PUBLIC_FB_PIXEL_ID
    │
    └──► (More platforms...)
```

### Fallback Logic

```typescript
// Example from src/config/analytics.ts
googleAnalytics: {
  enabled: process.env.NEXT_PUBLIC_GA_ENABLED === "true" || true,
  //       └── Env Variable ───────────────────────┘    └─ Fallback
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-N1FJ0X03GL"
  //              └── Env Variable ───────────────────────┘  └─ Fallback
}
```

---

## 🎯 Component Lifecycle

### Google Analytics Component

```
Component Mount
    │
    ▼
Check if measurementId is valid
    │
    ├──► Invalid ──► Log warning ──► Return null
    │
    ▼
Valid
    │
    ▼
Load Google Tag Manager script
    │
    ▼
Initialize gtag
    │
    ▼
Configure with measurementId
    │
    ▼
Track PageView
    │
    ▼
Ready for custom events
```

### Facebook Pixel Component

```
Component Mount
    │
    ▼
Check if pixelId is valid
    │
    ├──► Invalid ──► Log warning ──► Return null
    │
    ▼
Valid
    │
    ▼
Load Facebook Pixel script
    │
    ▼
Initialize fbq
    │
    ▼
Track initial PageView
    │
    ▼
Set up pathname listener
    │
    └──► On route change ──► Track PageView
```

---

## 📊 Event Flow

### Universal Event Tracking

```
trackUniversalEvent("conversion", params)
    │
    ├──► Google Analytics
    │       └──► gtag("event", "conversion", params)
    │
    ├──► Facebook Pixel
    │       └──► fbq("track", "conversion", params)
    │
    ├──► Twitter Pixel
    │       └──► twq("track", "conversion", params)
    │
    └──► Hotjar
            └──► hj("event", "conversion")
```

### Platform-Specific Events

```
trackGAEvent("calculator_use", params)
    │
    └──► if (analyticsConfig.googleAnalytics.enabled)
            │
            └──► if (window.gtag exists)
                    │
                    └──► gtag("event", "calculator_use", params)
```

---

## 🏗️ Build Process

```
Build Time
    │
    ▼
Next.js processes src/app/layout.tsx
    │
    ▼
Includes AnalyticsProvider
    │
    ▼
Tree-shaking (removes unused components)
    │
    ├──► GA enabled? ──► Include GoogleAnalytics.tsx
    ├──► Clarity enabled? ──► Include MicrosoftClarity.tsx
    └──► Hotjar disabled? ──► Exclude Hotjar.tsx
    │
    ▼
Bundle optimization
    │
    ▼
Output: Optimized analytics bundle
```

---

## 🔄 Runtime Behavior

### Script Loading Strategy

All analytics use `strategy="afterInteractive"`:

```
Page Load
    │
    ▼
Parse HTML
    │
    ▼
Execute critical JavaScript
    │
    ▼
Page Interactive ◄─── User can interact
    │
    ▼
Load Analytics Scripts ◄─── afterInteractive
    │
    └──► Google Analytics
    └──► Microsoft Clarity
    └──► Facebook Pixel
    └──► Other analytics
```

Benefits:
- ✅ Doesn't block initial page load
- ✅ Doesn't affect First Contentful Paint (FCP)
- ✅ Doesn't affect Time to Interactive (TTI)
- ✅ Loads after user can interact with page

---

## 🎨 Component Hierarchy

```
RootLayout (layout.tsx)
    │
    ├──► <head>
    │      ├──► JSON-LD Schemas
    │      ├──► Google Tag Manager
    │      └──► AdScript
    │
    └──► <body>
           ├──► SpeedInsights
           ├──► AnalyticsProvider ◄────┐
           │      │                     │
           │      ├──► GoogleAnalytics  │ Managed by
           │      ├──► MicrosoftClarity │ AnalyticsProvider
           │      ├──► FacebookPixel    │
           │      └──► (More...)       ─┘
           │
           ├──► GTM NoScript
           └──► ThemeProvider
                  └──► App Content
```

---

## 🔍 Debugging Flow

```
Issue with Analytics
    │
    ├──► Check if analytics is enabled
    │      └──► src/config/analytics.ts
    │
    ├──► Check environment variables
    │      └──► .env.local
    │
    ├──► Check browser console
    │      ├──► window.gtag exists?
    │      ├──► window.fbq exists?
    │      └──► Any error messages?
    │
    ├──► Check Network tab
    │      ├──► Scripts loading?
    │      └──► API calls successful?
    │
    └──► Check analytics dashboards
           ├──► GA4: Realtime events
           ├──► Clarity: Session recordings
           └──► Facebook: Events Manager
```

---

## 📱 Client vs Server

### Server Components (SSR)
```
src/app/layout.tsx (Server Component)
    │
    └──► Renders AnalyticsProvider location
         (Actual execution happens on client)
```

### Client Components
```
All analytics components use "use client" directive:

src/components/analytics/GoogleAnalytics.tsx
    ├──► "use client" ◄─── Executes in browser
    └──► Uses window object, Script component

src/components/analytics/FacebookPixel.tsx
    ├──► "use client"
    ├──► usePathname() ◄─── Client-side routing
    └──► useEffect() ◄───── Client-side effects
```

---

## 🚀 Performance Optimization

### Code Splitting

```
Next.js Automatic Code Splitting
    │
    ▼
Each analytics component is separate chunk
    │
    ├──► GoogleAnalytics.tsx ──► chunk-GA.js
    ├──► MicrosoftClarity.tsx ──► chunk-Clarity.js
    └──► FacebookPixel.tsx ──► chunk-FB.js
    │
    ▼
Only enabled components loaded
```

### Tree Shaking

```
Build Process
    │
    ▼
Analyze analyticsConfig
    │
    ├──► Hotjar disabled? ──► Remove Hotjar imports
    ├──► LinkedIn disabled? ──► Remove LinkedIn imports
    └──► Twitter disabled? ──► Remove Twitter imports
    │
    ▼
Smaller bundle size
```

---

## 🔒 Security Considerations

```
Analytics Scripts
    │
    ├──► Loaded from trusted CDNs
    ├──► No user PII tracked
    ├──► HTTPS only
    └──► CSP compatible
    │
    ▼
Data Privacy
    │
    ├──► Anonymized tracking
    ├──► No sensitive data
    ├──► GDPR compliant
    └──► User can opt-out (ad blockers)
```

---

## 📊 Data Collection Flow

```
User Action
    │
    ▼
Event Trigger
    │
    ▼
Analytics Utility Function
    │ (src/lib/analytics-utils.ts)
    │
    ├──► Browser Check
    │      └──► window !== undefined?
    │
    ├──► Platform Check
    │      └──► Analytics enabled?
    │
    ├──► Script Check
    │      └──► window.gtag/fbq exists?
    │
    ▼
Send to Analytics Platform
    │
    ├──► Google Analytics ──► GA4 Dashboard
    ├──► Facebook Pixel ──► Events Manager
    ├──► Microsoft Clarity ──► Clarity Dashboard
    └──► Hotjar ──► Hotjar Dashboard
```

---

## 🎯 Best Practices

### ✅ DO
- Use trackUniversalEvent for important actions
- Track anonymized data only
- Use descriptive event names
- Check if analytics is enabled before tracking
- Use TypeScript for type safety

### ❌ DON'T
- Track personally identifiable information (PII)
- Block page rendering with analytics
- Track every single user action
- Use hardcoded IDs in components
- Forget to check window exists

---

This architecture ensures:
- ✅ Scalability
- ✅ Maintainability
- ✅ Performance
- ✅ Privacy
- ✅ Developer experience
