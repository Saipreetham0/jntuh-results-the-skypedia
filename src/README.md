# 📂 Source Code Architecture & Organization

Authoritative directory layout, patterns, and conventions for the **JNTUH Results The Skypedia** codebase.

---

## 📁 Root Directory Layout

```
src/
├── app/                  # Next.js 16 App Router (grouped routes, APIs, pages)
│   ├── (academic)/       # Syllabus, Question Papers, Telangana Colleges
│   ├── (auth)/           # Authentication (Login, Signup)
│   ├── (content)/        # Editorial & Informational (Blog, Guides, FAQs, Contact)
│   ├── (converter)/      # Mark & Grade Converters (CGPA, SGPA, Percentage)
│   ├── (features)/       # Interactive utilities (Calendar, Alerts, Notifications)
│   ├── (legal)/          # Mandatory AdSense policy pages (Privacy, Terms, Cookies)
│   ├── (student-res)/    # Primary Result Portals (Consolidated, Backlogs, Toppers)
│   ├── admin/            # Admin tools & examination timetable management
│   ├── api/              # Edge API Route Handlers (cached upstream proxies)
│   ├── layout.tsx        # Root HTML layout with providers & global fonts
│   ├── page.tsx          # Main high-performance landing page
│   ├── robots.ts         # Dynamic robots.txt generation
│   └── sitemap.ts        # Comprehensive dynamic sitemap generator
│
├── components/           # Modular React 19 UI Components
│   ├── adsense/          # Compliant AdSense units with CLS reservation & ad slots
│   ├── analytics/        # WebVitals, Google Analytics & tracking integrations
│   ├── blog/             # Blog article viewers and post cards
│   ├── calendar/         # Academic calendar & Google Calendar modals
│   ├── common/           # Shared utilities (ErrorBoundary, ServiceWorkerRegistration)
│   ├── emails/           # React email notification templates
│   ├── features/         # Complex feature widgets (StudentResultsTables, alerts)
│   ├── home/             # Homepage components (Hero, FAQSection, Ticker, Features)
│   ├── layout/           # Global chrome (Navbar, Footer, AnnouncementBar, Providers)
│   ├── results/          # Search input cards, marksheets, shareable result cards
│   ├── seo/              # Dynamic JSON-LD structured schemas (FAQ, Breadcrumbs)
│   └── ui/               # shadcn/ui & Radix UI accessible primitive components
│
├── config/               # Application-wide Static Configuration
│   ├── adSlots.ts        # Google AdSense ad unit mapping
│   ├── analytics.ts      # Google Analytics, GTM, and Tag configuration
│   └── site.ts           # Domain canonicals, metadata, and brand constants
│
├── data/                 # Bundled Static Data & Scraped Catalogs
│   ├── branch_codes.json # B.Tech / B.Pharm branch mappings
│   ├── college_codes.json# JNTUH affiliated college directory
│   ├── syllabus.json     # R18 & R22 regulation subject syllabi
│   └── telangana_colleges.json # 515 Accredited Telangana Engineering Colleges
│
├── hooks/                # Custom React Client Hooks
│   ├── useBacklogs.ts    # Backlog status querying & local caching
│   └── useConsolidatedResults.ts # Hall ticket marksheet fetching & offline sync
│
├── lib/                  # Shared Business Logic & Helpers
│   ├── api.ts            # Client-side HTTP fetch helpers
│   ├── metadata/         # OpenGraph & SEO dynamic metadata builders
│   ├── seo/              # Schema.org structured data generators
│   └── utils.ts          # Tailwind merge (`cn`), date formatters, math calculations
│
├── server/               # Server-Only Modules (Never bundled to client)
│   ├── rate-limit.ts     # IP-based token bucket rate limiter
│   └── upstream.ts       # JNTUH upstream scraper proxy with timeout & failover
│
└── types/                # Central TypeScript Interfaces & Type Declarations
    ├── api.ts            # Result payload & API error definitions
    ├── env.d.ts          # Environment variables typing
    ├── html2pdf.d.ts     # PDF generation canvas definitions
    ├── index.ts          # Consolidated re-exports
    └── results.ts        # Student marksheet & semester subject models
```

---

## 🧭 App Router Route Groups

Next.js route groups `(name)` organize routes without affecting the public URL:

| Route Group | Example URL Path | Description |
| :--- | :--- | :--- |
| `(student-res)` | `/consolidated-results`, `/check-backlogs`, `/cgpa-calculator` | Core JNTUH student grade & marksheet lookups |
| `(academic)` | `/syllabus`, `/btech-colleges-tg`, `/jntuh-previous-question-papers` | Syllabi, college directories, and question banks |
| `(converter)` | `/cgpa-percentage-converter`, `/marks-percentage-calculator` | Interactive score conversion & target planners |
| `(content)` | `/blog`, `/guides`, `/faq`, `/about-us`, `/results-hub` | SEO landing pages and student advisory guides |
| `(features)` | `/result-alerts`, `/calendar`, `/dashboard` | Email alerts, examination calendar, and saved profiles |
| `(legal)` | `/privacy`, `/terms`, `/disclaimer`, `/cookies` | Required compliance and Google AdSense transparency |
| `(auth)` | `/login`, `/signup` | User account management |

---

## ⚡ Component Import Conventions

Use the configured TypeScript `@/*` path aliases:

```tsx
// Layout & Chrome
import { Navbar, Footer, AnnouncementBar } from '@/components/layout';

// Homepage Sections
import { Hero, FAQSection, NotificationTicker, FeaturesSection } from '@/components/home';

// UI Primitives
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// AdSense Units
import { ResponsiveAd, MultiplexAd, InFeedAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';

// Common Utilities
import { ErrorBoundary, themeProvider } from '@/components/common';
```

---

## 🛡️ Coding & Architectural Standards

1. **Server Components First**: All route pages in `src/app/` are React Server Components by default. Add `'use client'` strictly to interactive leaf components.
2. **Offline-Resilient**: Hall ticket lookups cache successfully fetched marksheets to `localStorage` for offline access during server downtimes.
3. **No Cumulative Layout Shift (CLS)**: All ad slots define explicit minimum heights matching Google AdSense responsive unit specifications.
4. **Edge Cache Headers**: Upstream API proxies in `src/app/api/` enforce `Cache-Control: public, s-maxage=1800, stale-while-revalidate=86400` to prevent rate-limiting from university origin servers.
