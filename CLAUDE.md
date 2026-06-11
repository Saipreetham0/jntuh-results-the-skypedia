# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start dev server (localhost:3000)
pnpm build         # Production build
pnpm lint          # ESLint
pnpm test          # Run all tests (Vitest)
pnpm test:watch    # Watch mode
pnpm check:bundle  # JS+CSS size budget check
pnpm build:check   # tsc --noEmit + next build
```

To run a single test file:
```bash
pnpm vitest run tests/unit/lib-utils.test.ts
```

## Architecture

**Next.js 16 App Router** with TypeScript, Tailwind CSS, shadcn/ui.

**Route groups** in `src/app/`:
- `(student-res)/` — results checker, consolidated results, backlogs, credit eligibility, CGPA calculator
- `(converter)/` — standalone calculator pages (CGPA↔%, SGPA→CGPA, marks%)
- `(academic)/` — syllabus, previous papers, college list
- `(features)/` — dashboard, calendar, notifications, result-alerts
- `(content)/` — blog, guides, FAQ, calculators index
- `(auth)/` — login/signup (Supabase)
- `(legal)/` — privacy, terms, cookies
- `api/` — internal proxy routes (see below)

**API layer** — all routes in `src/app/api/` act as CORS proxies to `https://jntuhresults.dhethi.com`. The browser never calls the external API directly. Each route uses `src/server/rate-limit.ts` (in-memory, 30 req/min per IP; not multi-instance-safe — use Redis for scale).

**External upstream**: `https://jntuhresults.dhethi.com/api/` — endpoints include `getAllResult`, `getResult`, `getBacklogs`, `creditEligibility`.

**Key config files**:
- `src/config/site.ts` — single source of truth for site name, URL, OG image, keywords, GTM ID
- `src/config/adSlots.ts` — all AdSense slot IDs. Never reuse the same slot ID on one page; display ads use `format=auto`, in-article use `format=fluid + layout=in-article`, multiplex uses `format=autorelaxed`
- `src/config/analytics.ts` — toggle flags for GA, Clarity, FB Pixel, Hotjar, LinkedIn, Twitter

**Metadata** is generated via `src/lib/metadata/index.ts` and page-level `generateMetadata()`. SEO schema helpers live in `src/lib/seo/schema.ts`. Structured data is injected in `src/components/layout/scripts/StructuredData.tsx` using native `<script>` tags (not `next/script`) to avoid the `data-nscript` attribute.

**Auth & data** — Supabase (PostgreSQL + Auth). Clients: `src/lib/supabase/client.ts` (browser), `src/lib/supabase/server.ts` (RSC), middleware at `src/lib/supabase/middleware.ts`. `SUPABASE_SERVICE_ROLE_KEY` is server-only.

**Email** — Resend for contact/alerts, Brevo (`@getbrevo/brevo`) for newsletter subscribe at `/api/subscribe`.

**Fonts** — Inter (`--font-inter`) and Plus Jakarta Sans (`--font-display`) loaded in root layout via `next/font/google`.

## Key Patterns

- Default to **Server Components**; add `'use client'` only when using state, effects, event handlers, or browser APIs.
- `@/` path alias maps to `src/`.
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional class names.
- All API route handlers validate input and return structured errors matching FastAPI's format (`{ detail: [...] }`).
- Tests in `tests/integration/` import route handler functions directly and call them with `new Request(...)` — no test server needed.

## Environment Variables

Copy `.env.example` to `.env.local`. Minimum for local dev:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

Email features require `RESEND_API_KEY` (contact/alerts) and `BREVO_API_KEY` (subscribe). Calendar sync needs Google OAuth vars.
