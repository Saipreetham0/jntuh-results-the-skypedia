# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JNTUH Results - The Skypedia** is a Next.js 16 application that provides JNTUH (Jawaharlal Nehru Technological University Hyderabad) students with tools to check results, calculate CGPA/SGPA, convert grades, and access academic resources. The application uses the App Router architecture with React 19 Server Components.

**Live URL**: https://jntuhresults.theskypedia.com
**Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS, Supabase (PostgreSQL), MySQL, Redis
**Package Manager**: pnpm (required)

---

## Development Commands

### Essential Commands
```bash
pnpm dev          # Start development server with Turbopack (default)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Database
- The project uses multiple database systems: MySQL (mysql2), Supabase (PostgreSQL), and Redis for caching
- No Prisma migrations needed - uses TypeORM and direct database connections
- Environment variables must be configured in `.env.local` (see README.md for full list)

### Testing & Analysis
- No test suite currently configured
- Bundle analysis: Install `@next/bundle-analyzer` if needed (already in devDependencies)

---

## Architecture Overview

### Route Organization

The application uses Next.js App Router with **route groups** for logical organization:

1. **`(student-res)/`** - Student-focused features (protected routes when auth enabled)
   - `cgpa-calculator/` - CGPA calculation tool
   - `consolidated-results/` - Full academic transcript view
   - `semester-wise-results/` - Individual semester results
   - `check-backlogs/` - Backlog identification
   - `credit-eligibility-check/` - Credit verification
   - `compare-performance/` - Peer comparison
   - `previous-question-papers/` - Past exam papers

2. **`(converter)/`** - Calculator tools (public routes)
   - `cgpa-percentage-converter/` - CGPA ↔ Percentage conversion
   - `percentage-to-cgpa-calculator/` - Percentage → CGPA
   - `sgpa-to-cgpa-calculator/` - SGPA → CGPA
   - `marks-percentage-calculator/` - Marks → Percentage

3. **Other routes**: `admin/`, `blog/`, `contact/`, `dashboard/`, `login/`, `signup/`, etc.

### API Routes (`src/app/api/`)

Key API endpoints:
- `consolidated-results/route.ts` - Fetch complete student results
- `semester-wise-results/route.ts` - Fetch semester-specific results
- `backlogs/route.ts` - Check backlogs
- `contact/route.ts` - Contact form submission
- `auth/google/` - Google OAuth flow
- `calendar/sync/route.ts` - Google Calendar integration

**Note**: Most API route files contain commented-out code. The actual implementation may use external APIs or proxy services.

### Component Structure

Key component directories:
- `components/Adsense/` - Google AdSense integration (configured in `src/config/adSlots.ts`)
- `components/NavBar/` - Main navigation (`navBar.tsx`)
- `components/Footer/` - Site footer
- `components/AcademicReport/` - Result display components
- `components/BacklogsPage/` - Backlog checking UI
- `components/ErrorBoundary.tsx` - Error boundary wrapper

### State & Data Flow

- **Server Components**: Most pages use React Server Components for initial data fetching
- **Client Components**: Interactive features (calculators, forms) use client-side state
- **Authentication**: Supabase Auth with NextAuth.js + Firebase adapter
  - **IMPORTANT**: Authentication is currently **DISABLED** (see `AUTH_DISABLED_README.md`)
  - Middleware checks auth but doesn't enforce redirects (lines 43-54 in `src/utils/supabase/middleware.ts` are commented)
  - To re-enable: uncomment redirect logic in `src/utils/supabase/middleware.ts`

### Key Libraries & Utilities

- **`src/lib/api.ts`**: Commented-out JNTUH API service (legacy code)
- **`src/lib/ResultScraper.ts`**: Result scraping logic (appears minimal/empty)
- **`src/lib/firebase.ts`**: Firebase configuration
- **`src/lib/supabase.ts`**: Supabase client setup
- **`src/lib/seo/`**: SEO metadata and schema.org structured data generators
- **`src/utils/supabase/`**: Supabase client, server, and middleware utilities

### Styling & UI

- **Tailwind CSS 3.4**: Utility-first CSS framework
- **shadcn/ui**: Radix UI primitives with custom styling
- **Theme**: Dark mode support via `next-themes` (ThemeProvider in `src/app/providers.tsx`)
- **Global styles**: `src/app/styles/globals.css`

---

## Important Configuration Files

### `next.config.js`
- **PWA**: Configured with `next-pwa`, disabled in development
- **Image optimization**: AVIF/WebP formats, remote patterns for external images
- **Experimental features**: `optimizeCss`, `optimizePackageImports` for lucide-react, Radix UI, Heroicons
- **Headers**: Security headers, caching policies for static assets
- **Webpack**: Fallback for `punycode` on client-side
- **External packages**: `googleapis`, `google-auth-library` marked as server-only

### `middleware.ts` (root)
- Calls `updateSession` from `src/utils/supabase/middleware.ts`
- Applies to all routes except static files, images, and Next.js internals

### `src/app/layout.tsx`
- Includes global components: Navbar, Footer, AnnouncementBar, InstallPWA
- Loads AdScript for Google AdSense
- SEO metadata configured with Open Graph and Twitter cards
- Google Tag Manager integration (GTM-W6TSKNVX)
- Speed Insights from Vercel

### `src/config/adSlots.ts`
- Centralized Google AdSense slot configuration
- Publisher ID: `ca-pub-4870864326886980`
- Organized by page type (HOMEPAGE, CALCULATOR, RESULTS, BLOG, etc.)
- Helper functions: `getAdSlot()`, `isValidAdSlot()`

### TypeScript Configuration
- **Base URL**: `@/*` maps to `src/*`
- **Strict mode**: Disabled (`strict: false`)
- **Target**: ES2017
- **JSX**: `react-jsx` (automatic React import)

---

## SEO & Performance

- **Metadata**: Centralized in `src/app/layout.tsx` with template support
- **Structured Data**: Organization and Website schemas generated in `src/lib/seo/schema.ts`
- **PWA**: Manifest at `public/manifest.json`, service worker caching for fonts and images
- **Sitemap**: Generated dynamically at `src/app/sitemap.ts`
- **Robots.txt**: Static file at `public/robots.txt`
- **Speed Insights**: Vercel Speed Insights integrated

---

## Authentication System (Currently Disabled)

**Status**: Authentication is **temporarily disabled** as documented in `AUTH_DISABLED_README.md`

**Current Behavior**:
- All pages are publicly accessible without login
- Supabase auth session is still checked but not enforced
- Redirect logic in `src/utils/supabase/middleware.ts` is commented out (lines 43-54)

**To Re-enable**:
1. Uncomment lines 43-54 in `src/utils/supabase/middleware.ts`
2. Remove yellow notice banners from `src/app/login/page.tsx` and `src/app/signup/page.tsx`
3. Test authentication flow thoroughly

**Protected Routes** (when auth is enabled):
- `/dashboard` - User dashboard
- Any route not starting with `/login`, `/auth`, or public calculators/results

**Authentication Stack**:
- Supabase Auth for session management
- NextAuth.js with Firebase adapter
- Google OAuth integration (`src/app/api/auth/google/`)

---

## Data Fetching & External APIs

The application fetches JNTUH results from external APIs:
- Primary API: `https://jntuhresults.up.railway.app/api/academicresult?htno={htno}`
- Proxy configuration exists in commented code (using `https-proxy-agent`)
- Redis caching layer for performance optimization
- Axios used for HTTP requests with proxy support

**Note**: Many API route implementations are commented out. Check route files for active vs. legacy code.

---

## AdSense Integration

Google AdSense is integrated throughout the application:

**Configuration**: `src/config/adSlots.ts`
- Different ad slots for different page types (homepage, calculators, results, blog)
- Responsive ads, sticky ads, in-article ads, and banners

**Components** (`src/components/Adsense/`):
- `AdScript.tsx` - Loads AdSense script in layout
- `AdBanner.tsx` - Standard banner ads
- `ResponsiveAd.tsx` - Responsive ad units
- `StickyAd.tsx` - Sticky sidebar ads
- `InArticleAd.tsx` - In-article ad placements
- `InContentAd.tsx` - Content-embedded ads

**Usage**: Import from `@/components/Adsense` and reference slots from `adSlots.ts`

---

## PWA Configuration

Progressive Web App features:
- **Manifest**: `public/manifest.json` with app metadata
- **Service Worker**: Auto-generated by `next-pwa`, disabled in development
- **Icons**: Various sizes in `public/` (android-chrome, apple-touch-icon, favicon)
- **Install Prompt**: `components/InstallPWA` component
- **Offline Support**: Runtime caching for fonts and images
- **Splash Screens**: Located in `public/splashscreens/`

---

## Key Files Reference

- **Root Layout**: `src/app/layout.tsx` - Global metadata, providers, scripts
- **Homepage**: `src/app/page.tsx` - Landing page
- **Middleware**: `middleware.ts` → `src/utils/supabase/middleware.ts` - Auth session management
- **Theme Provider**: `src/app/providers.tsx` - Dark mode support
- **Navigation**: `src/components/NavBar/navBar.tsx` - Main navigation
- **Error Handling**: `src/components/ErrorBoundary.tsx`, `src/app/not-found.tsx`

---

## Environment Variables

Required environment variables (create `.env.local`):

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/jntuh_results

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-4870864326886980

# Email Services
BREVO_API_KEY=your-brevo-api-key
RESEND_API_KEY=your-resend-api-key

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# API Proxy (Optional)
API_PROXY_URL=your-api-proxy-url
```

See `README.md` for complete list and descriptions.

---

## Common Patterns

### Creating a New Calculator Page
1. Add route in `src/app/(converter)/your-calculator/page.tsx`
2. Use client component (`'use client'`) for interactivity
3. Follow existing calculator patterns (see `cgpa-percentage-converter/`)
4. Add AdSense placements using slots from `src/config/adSlots.ts`
5. Include metadata export for SEO

### Creating a New API Route
1. Create `route.ts` in `src/app/api/your-endpoint/`
2. Export named functions: `GET`, `POST`, etc.
3. Use `NextResponse` for responses
4. Add error handling and validation
5. Consider Redis caching for performance

### Adding AdSense to a Page
```tsx
import { ResponsiveAd } from '@/components/Adsense';
import { AD_SLOTS } from '@/config/adSlots';

// In your component:
<ResponsiveAd
  adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER}
  adFormat="auto"
/>
```

---

## Git Workflow

**Commit Convention**: Conventional Commits
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Current Branch**: `main`
**Main Branch**: `main`

---

## Known Issues & Technical Debt

1. **Authentication Disabled**: Temporarily disabled for open access (see `AUTH_DISABLED_README.md`)
2. **Commented Code**: Many API routes and lib files contain commented-out implementations
3. **Type Safety**: TypeScript strict mode is disabled (`strict: false`)
4. **Mixed Dependencies**: Project uses both MySQL and Supabase - consider consolidating
5. **ResultScraper**: `src/lib/ResultScraper.ts` appears empty/minimal - may need implementation

---

## Additional Resources

- **README.md**: Full project documentation, features, tech stack
- **AUTH_DISABLED_README.md**: Authentication re-enabling instructions
- **CHANGELOG.md**: Version history and updates
- **SEO_IMPLEMENTATION_COMPLETE.md**: SEO audit and implementation details
- **ADSENSE_*.md**: AdSense implementation and troubleshooting guides
- **UPGRADE_SUMMARY.md**: Recent upgrade notes
- **EMAIL_ALERTS_SUMMARY.md**: Email alerts feature implementation
- **VERIFICATION_BUG_FIX.md**: Fixed "Subscription not found" verification error
- **docs/**: Organized documentation (adsense/, features/, archived/)

---

## Email Alerts Feature

**Status:** ✅ Implemented and Working

**Key Components:**
- `src/components/ResultAlerts/SubscriptionForm.tsx` - Subscription form
- `src/app/api/result-alerts/subscribe/route.ts` - Subscription API
- `src/app/api/result-alerts/verify/route.ts` - Verification API
- `src/lib/subscribers-storage.ts` - **Shared storage singleton** (critical!)

**Important:** The subscribe and verify routes **must use the same storage instance**. This is handled by the `subscribersStorage` singleton in `src/lib/subscribers-storage.ts`. Never create separate Map instances in API routes.

**Current Storage:** In-memory (cleared on restart) - needs database for production

**Setup Required:**
```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SITE_URL=https://jntuhresults.theskypedia.com
```

**Pages:**
- `/` - Homepage with compact subscription form
- `/result-alerts` - Dedicated subscription page
- `/result-alerts/verify?token=xxx&id=xxx` - Email verification page

**Bug Fix Applied:** Fixed "Subscription not found" error by using shared storage singleton instead of separate Map instances per route. See `VERIFICATION_BUG_FIX.md` for details.

---

## Tips for Working in This Codebase

1. **Always use pnpm**, not npm or yarn
2. **Check for commented code** before implementing new features - existing logic may be available
3. **Respect route groups** - understand whether routes should be in `(student-res)` or `(converter)`
4. **AdSense slots must be unique** - never reuse the same slot ID across different ad placements
5. **Authentication is disabled** - don't assume protected routes are enforced
6. **Server vs. Client Components** - default to Server Components unless interactivity is needed
7. **Path aliases** - use `@/` prefix for imports from `src/` directory
8. **Images** - use Next.js `<Image>` component for optimization, remote patterns are configured
9. **Metadata** - export metadata objects from page files for SEO
10. **Dark mode** - test components in both light and dark themes
