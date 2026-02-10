# JNTUH Results - The Skypedia

A Next.js platform for JNTUH students to check results, calculate CGPA/SGPA, and access academic resources. Built with App Router, TypeScript, and Tailwind CSS.

Live demo: https://jntuhresults.theskypedia.com

---

## Features

- Results: semester-wise, consolidated, backlogs, credit eligibility
- Calculators: CGPA, SGPA, percentage conversions, marks-to-percentage
- Academic resources: syllabus, previous papers, calendar, notifications
- PWA support with manifest and service worker
- SEO: dynamic metadata, sitemap, robots
- Ads and analytics integrations

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS + shadcn/ui + Radix UI
- Supabase (auth/data)
- Redis (optional caching)
- Resend/Brevo (email)
- Vitest (tests)

---

## Project Structure

```
.
├── .github/                 # CI workflows
├── docs/                    # Architecture, analytics, ops docs
├── public/                  # Static assets, PWA files
├── scripts/                 # Local scripts (bundle budget)
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # UI and feature components
│   ├── config/              # App configuration
│   ├── hooks/               # React hooks
│   ├── lib/                 # Core logic and services
│   │   ├── email/           # Email helpers
│   │   ├── metadata/        # Metadata helpers
│   │   ├── seo/             # SEO utilities
│   │   └── supabase/        # Supabase clients/middleware
│   └── types/               # Type definitions
├── tests/                   # Vitest tests
├── next.config.js
├── tailwind.config.js
├── vitest.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Install

```
pnpm install
```

### Development

```
pnpm dev
```

Open http://localhost:3000

### Build

```
pnpm build
pnpm start
```

---

## Environment Variables

Create `.env.local` in the project root. The following are used in code:

Required (for core features):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Email (contact, alerts, notifications):
- `RESEND_API_KEY` (required for `/api/contact`, alerts, notifications)
- `BREVO_API_KEY` (required for `/api/subscribe`)

Google OAuth (calendar sync/auth routes):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`

Site URL (used in verification links):
- `NEXT_PUBLIC_SITE_URL` (defaults to production URL if not set)

Analytics (optional):
- `NEXT_PUBLIC_GA_ENABLED`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_CLARITY_ENABLED`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `NEXT_PUBLIC_FB_PIXEL_ENABLED`
- `NEXT_PUBLIC_FB_PIXEL_ID`
- `NEXT_PUBLIC_HOTJAR_ENABLED`
- `NEXT_PUBLIC_HOTJAR_SITE_ID`
- `NEXT_PUBLIC_LINKEDIN_ENABLED`
- `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- `NEXT_PUBLIC_TWITTER_PIXEL_ENABLED`
- `NEXT_PUBLIC_TWITTER_PIXEL_ID`

---

## Scripts

```
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm start         # Start production server
pnpm lint          # ESLint
pnpm test          # Run tests (Vitest)
pnpm test:watch    # Watch tests
pnpm check:bundle  # Bundle size budget check
```

---

## Tests

- Unit tests and route handler tests live in `tests/`.
- Run `pnpm test` locally or via CI.

---

## Performance Budget

- CI enforces a JS+CSS size budget via `pnpm check:bundle`.
- Adjust budget with `BUNDLE_BUDGET_KB` in CI or locally.

---

## Deployment

- Deploys via Vercel Git integration.
- GitHub Actions deploy is manual-only to avoid double deploys.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-change`
3. Commit: `git commit -m "feat: your change"`
4. Push and open a PR

---

## License

MIT
