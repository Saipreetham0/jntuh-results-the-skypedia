# GitHub Actions Workflows

This repository uses GitHub Actions to automate core CI and Deployment tasks.

## 📋 Active Workflows

We have **2 essential workflows**:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| CI/CD Pipeline | Push, PR | Lint, type-check, run tests, and build |
| Deploy to Vercel | Manual | Manually trigger a Vercel production deployment |

---

### 1. CI/CD Pipeline (`ci.yml`)
**Triggers:** Push & PRs to `main` and `develop`
- **Lint Check:** Ensures code style consistency with ESLint.
- **Type Check:** Validates TypeScript strictly.
- **Test:** Runs the vitest test suite.
- **Build:** Builds the Next.js application to ensure no production build errors.

### 2. Manual Deploy (`deploy.yml`)
**Triggers:** `workflow_dispatch` (Manual via GitHub Actions UI)
- **Deploy:** Deploys the built Next.js application directly to Vercel using the Vercel CLI.
- **Requirements:** Requires numerous environment variables to be set in GitHub Actions Secrets (e.g., `VERCEL_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, etc).

---

## Required Secrets for Deployment

If you are using the manual Vercel deploy, ensure these secrets are set in **Settings → Secrets and variables → Actions**:

- `VERCEL_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `MAILCHIMP_API_KEY` / `MAILCHIMP_API_SERVER` / `MAILCHIMP_AUDIENCE_ID`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `REDIS_URL`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
- `RESEND_API_KEY`
- `BREVO_API_KEY`

*Note: Automated PRs and pushes to main are typically handled directly by the Vercel GitHub integration. The manual deploy workflow is an alternative/fallback.*
