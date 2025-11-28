# 📂 Source Code Organization

Professional folder structure for the JNTUH Results application source code.

---

## 📁 Folder Structure

```
src/
├── app/                          # Next.js 16 App Router
│   ├── (converter)/             # Calculator route group (public)
│   ├── (student-res)/           # Student features route group
│   ├── api/                     # API routes
│   ├── auth/                    # Authentication pages
│   └── [other-routes]/          # Individual pages
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   ├── common/                  # Shared/utility components
│   ├── features/                # Feature-specific components
│   ├── calendar/                # Calendar-related components
│   ├── ui/                      # shadcn/ui components
│   ├── Adsense/                 # AdSense ad components
│   └── [other-categories]/      # Additional component groups
│
├── lib/                         # Core libraries & utilities
│   ├── email/                   # Email services
│   ├── seo/                     # SEO utilities
│   └── [services]/              # Other services
│
├── types/                       # TypeScript type definitions
│   ├── alerts.ts                # Alert/notification types
│   ├── calendar.ts              # Calendar types
│   ├── index.ts                 # Central type exports
│   └── env.d.ts                 # Environment variable types
│
├── config/                      # Configuration files
│   └── adSlots.ts              # AdSense slot configuration
│
├── hooks/                       # Custom React hooks
│
├── utils/                       # Utility functions
│   └── supabase/               # Supabase client utilities
│
└── firebase/                    # Firebase configuration

```

---

## 📦 Component Organization

### 🎨 Layout Components (`components/layout/`)
Components that define the page structure and navigation:
- **NavBar/** - Main navigation bar
- **Footer/** - Site footer
- **Header/** - Page headers
- **AnnouncementBar/** - Top announcement banner
- **InstallPWA.tsx** - PWA install prompt

**Import pattern:**
```tsx
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
```

---

### 🔧 Common Components (`components/common/`)
Reusable utility components used across the application:
- **ErrorBoundary.tsx** - Error boundary wrapper
- **Button.jsx** - Custom button component
- **ResultsCard.tsx** - Results display card
- **SyllabusCard.tsx** - Syllabus card component
- **theme-provider.tsx** - Dark mode theme provider

**Import pattern:**
```tsx
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ResultsCard } from '@/components/common/ResultsCard';
```

---

### ⚡ Feature Components (`components/features/`)
Feature-specific components with complex logic:
- **ResultAlerts/** - Email alert subscription system
- **AcademicReport/** - Academic report display
- **BacklogsPage/** - Backlog checking interface
- **StudentResultsTables.tsx** - Comprehensive results tables

**Import pattern:**
```tsx
import { SubscriptionForm } from '@/components/features/ResultAlerts';
import { AcademicReport } from '@/components/features/AcademicReport';
```

---

### 📅 Calendar Components (`components/calendar/`)
Exam calendar and Google Calendar integration:
- **ExamCalendar.tsx** - Main exam calendar component
- **ExamCalendarWithAuth.tsx** - Calendar with authentication
- **ExamEventModal.tsx** - Event details modal
- **GoogleCalendarAuth.tsx** - Google Calendar OAuth

**Import pattern:**
```tsx
import { ExamCalendar } from '@/components/calendar/ExamCalendar';
```

---

### 🎯 UI Components (`components/ui/`)
shadcn/ui primitive components:
- button, card, input, select, dialog, etc.
- Radix UI-based with Tailwind styling

**Import pattern:**
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

---

### 💰 AdSense Components (`components/Adsense/`)
Google AdSense ad integration:
- **AdScript.tsx** - AdSense script loader
- **AdBanner.tsx** - Banner ads
- **ResponsiveAd.tsx** - Responsive ad units
- **StickyAd.tsx** - Sticky sidebar ads
- **AnchorAd.tsx** - Mobile anchor ads
- **MultiplexAd.tsx** - Grid ad units
- **InArticleAd.tsx** - In-article ads
- **InContentAd.tsx** - Content-embedded ads

**Import pattern:**
```tsx
import { ResponsiveAd } from '@/components/Adsense';
import { AD_SLOTS } from '@/config/adSlots';
```

---

### 📝 Other Component Categories

**Alert/** - Alert/notification components
**Card/** - Card-based UI components
**Hero/** - Hero/landing sections
**Theme/** - Theme switcher
**ShareButton/** - Social sharing buttons
**PdfModal/** - PDF viewer modal
**Blog-seo/** - Blog SEO components
**blog/** - Blog-specific components
**newsletter/** - Newsletter subscription
**results/** - Results display components
**emails/** - Email templates
**ComingSoon/** - Coming soon pages

---

## 📚 Libraries (`lib/`)

### Core Services
- **api.ts** - JNTUH API client (legacy/commented)
- **firebase.ts** - Firebase configuration
- **supabase.ts** - Supabase client setup
- **redis.js** - Redis caching client
- **subscribers-storage.ts** - **Shared email subscription storage** ⚠️ Important!

### Email Services (`lib/email/`)
- Email sending utilities
- Resend API integration

### SEO Utilities (`lib/seo/`)
- Metadata generators
- Schema.org structured data
- Open Graph helpers

### Important Notes
- **subscribers-storage.ts** is a singleton - never create separate instances
- Most API files contain commented-out code - check before implementing

---

## 🎯 Types (`types/`)

Centralized TypeScript type definitions:

- **alerts.ts** - Result alert subscription types
- **calendar.ts** - Calendar event types
- **index.ts** - Central type exports
- **env.d.ts** - Environment variable types

**Note:** There's also `src/app/types/index.ts` - consider consolidating

**Import pattern:**
```tsx
import type { ResultAlert } from '@/types/alerts';
import type { CalendarEvent } from '@/types/calendar';
```

---

## ⚙️ Configuration (`config/`)

Application configuration files:

- **adSlots.ts** - AdSense slot IDs and configuration
  ```tsx
  import { AD_SLOTS } from '@/config/adSlots';
  ```

---

## 🎣 Hooks (`hooks/`)

Custom React hooks for reusable logic:

**Import pattern:**
```tsx
import { useCustomHook } from '@/hooks/useCustomHook';
```

---

## 🛠️ Utilities (`utils/`)

Helper functions and utilities:

### Supabase Utilities (`utils/supabase/`)
- **client.ts** - Browser client
- **server.ts** - Server-side client
- **middleware.ts** - Auth middleware

**Import pattern:**
```tsx
import { createClient } from '@/utils/supabase/client';
import { createClient as createServerClient } from '@/utils/supabase/server';
```

---

## 🔥 Firebase (`firebase/`)

Firebase SDK configuration and initialization.

---

## 📋 App Router Structure (`app/`)

### Route Groups

#### `(converter)/` - Calculator Tools (Public)
- cgpa-percentage-converter
- percentage-to-cgpa-calculator
- sgpa-to-cgpa-calculator
- marks-percentage-calculator

#### `(student-res)/` - Student Features
- cgpa-calculator
- consolidated-results
- semester-wise-results
- check-backlogs
- credit-eligibility-check
- compare-performance
- previous-question-papers

### API Routes (`api/`)
- **consolidated-results/** - Fetch student results (CORS proxy)
- **semester-wise-results/** - Semester-specific results
- **backlogs/** - Backlog checking
- **credit-eligibility/** - Credit verification (CORS proxy)
- **result-alerts/subscribe/** - Email subscription
- **result-alerts/verify/** - Email verification
- **auth/google/** - Google OAuth flow
- **calendar/sync/** - Google Calendar sync
- **contact/** - Contact form

**Important:** Many API routes use internal proxy pattern to avoid CORS:
```
Browser → /api/internal-route → External API
```

---

## 🎨 Styling

### Global Styles
- **app/styles/globals.css** - Global CSS and Tailwind directives

### Tailwind Configuration
- Uses Tailwind CSS 3.4 utility-first framework
- Custom theme configuration in `tailwind.config.ts`
- Dark mode support via `next-themes`

---

## 🚀 Import Aliases

The project uses TypeScript path aliases:

```tsx
import { Component } from '@/components/...'  // → src/components/...
import { utils } from '@/lib/...'              // → src/lib/...
import type { Type } from '@/types/...'       // → src/types/...
import { config } from '@/config/...'         // → src/config/...
```

Configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 📝 Best Practices

### Component Organization
1. **Layout components** → General page structure
2. **Common components** → Reusable utilities
3. **Feature components** → Complex, feature-specific logic
4. **UI components** → Primitive building blocks

### File Naming
- **Components:** PascalCase folders and files (`NavBar/NavBar.tsx`)
- **Utilities:** camelCase files (`api.ts`, `utils.ts`)
- **Types:** camelCase files (`alerts.ts`, `calendar.ts`)
- **Config:** camelCase files (`adSlots.ts`)

### Import Order
```tsx
// 1. External packages
import React from 'react';
import { NextResponse } from 'next/server';

// 2. Internal components
import { NavBar } from '@/components/layout/NavBar';

// 3. Internal utilities
import { createClient } from '@/utils/supabase/client';

// 4. Types
import type { ResultAlert } from '@/types/alerts';

// 5. Styles
import './styles.css';
```

### Server vs Client Components
- **Default to Server Components** (no 'use client')
- **Use Client Components** when you need:
  - useState, useEffect, event handlers
  - Browser APIs (localStorage, window)
  - Third-party libraries requiring browser

---

## ⚠️ Known Issues

1. **Duplicate types folders:** `src/types/` and `src/app/types/` - consider consolidating
2. **lib/types.ts exists:** Conflicts with `types/` folder - should be consolidated
3. **lib/ResultScraper.ts empty:** Placeholder file, may need implementation
4. **Many commented API routes:** Check before implementing new features
5. **In-memory storage:** `lib/subscribers-storage.ts` needs database for production

---

## 🔍 Finding Code

### Search by Feature
- **Results checking:** `app/(student-res)/` + `components/features/`
- **Calculators:** `app/(converter)/`
- **Email alerts:** `components/features/ResultAlerts/` + `lib/subscribers-storage.ts`
- **AdSense:** `components/Adsense/` + `config/adSlots.ts`
- **Authentication:** `app/auth/` + `utils/supabase/`

### Search by Type
- **Pages:** `app/**/*.tsx` (excluding components)
- **API Routes:** `app/api/**/route.ts`
- **Components:** `components/**/*.tsx`
- **Types:** `types/**/*.ts`
- **Utilities:** `lib/**/*.ts`

---

## 📚 Related Documentation

- [Main README](../README.md) - Project overview
- [CLAUDE.md](../CLAUDE.md) - Development guide
- [docs/](../docs/) - Complete documentation

---

**Last Updated:** November 28, 2025
**Structure Version:** 2.0 (Organized)
