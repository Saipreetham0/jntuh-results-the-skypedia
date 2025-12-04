# GitHub Actions Workflows Documentation

This repository uses GitHub Actions to automate various development, testing, security, and deployment tasks.

## 📋 Table of Contents

- [Overview](#overview)
- [Workflows](#workflows)
  - [CI/CD Pipeline](#cicd-pipeline)
  - [SEO & Performance Check](#seo--performance-check)
  - [Security Scan](#security-scan)
  - [Deployment](#deployment)
  - [Dependency Updates](#dependency-updates)
  - [Code Quality Checks](#code-quality-checks)
- [Setup Instructions](#setup-instructions)
- [Required Secrets](#required-secrets)
- [Badge Integration](#badge-integration)

---

## Overview

We have **6 automated workflows** that run on different triggers:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| CI/CD Pipeline | Push, PR | Lint, type-check, build |
| SEO Check | Push to main, Weekly | SEO audit, broken links |
| Security Scan | Push, PR, Weekly | Dependency audit, secret scan |
| Deploy | Push to main | Deploy to Vercel |
| Dependency Updates | Weekly | Check for outdated packages |
| Code Quality | Push, PR | Quality gate, bundle size |

---

## Workflows

### 1. CI/CD Pipeline
**File:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Jobs:**

#### 🔍 Lint
- Runs ESLint on the codebase
- Ensures code style consistency
- **Fails if:** Linting errors are found

#### 📝 Type Check
- Runs TypeScript type checking
- Catches type errors before build
- **Fails if:** Type errors exist

#### 🏗️ Build
- Builds the Next.js application
- Requires lint and type-check to pass
- Uploads build artifacts for 7 days
- **Fails if:** Build fails

#### 💡 Lighthouse CI
- Runs Lighthouse performance tests
- Tests key pages (homepage, calculators)
- Uploads performance reports
- Provides URL to view results

**Usage:**
```bash
# Runs automatically on push/PR
# Or manually trigger via GitHub Actions tab
```

---

### 2. SEO & Performance Check
**File:** `.github/workflows/seo-check.yml`

**Triggers:**
- Push to `main` branch
- Pull requests to `main`
- Weekly on Monday at midnight (cron: `0 0 * * 1`)

**Jobs:**

#### 🔎 SEO Audit
- Checks for essential meta tags
- Validates sitemap exists
- Verifies robots.txt
- Checks structured data implementation

#### 🔗 Broken Links
- Starts local server
- Crawls internal links
- Generates broken links report
- Uploads report for 30 days

#### ♿ Accessibility
- Checks for ARIA attributes
- Validates alt text on images
- Ensures accessibility standards

**Artifacts:**
- `broken-links-report` - JSON report of all links checked

---

### 3. Security Scan
**File:** `.github/workflows/security-scan.yml`

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main`
- Weekly on Sunday at midnight (cron: `0 0 * * 0`)

**Jobs:**

#### 🔒 Dependency Audit
- Runs `pnpm audit` for vulnerabilities
- Checks for outdated dependencies
- Audit level: moderate and above
- Continues on error (non-blocking)

#### 🕵️ Secret Scanning
- Uses TruffleHog to scan for exposed secrets
- Checks entire codebase history
- **Fails if:** Secrets are found in commits

#### 🛡️ CodeQL Analysis
- Runs GitHub CodeQL security analysis
- Scans for security vulnerabilities
- Analyzes JavaScript/TypeScript code
- Results appear in Security tab

#### ⚙️ Environment Variables Check
- Ensures no `.env` files are committed
- Checks for exposed API keys in source
- Validates environment variable usage

**Critical:** This workflow has elevated permissions for security scanning.

---

### 4. Deployment
**File:** `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` branch

**Jobs:**

#### 🚀 Build and Deploy
- Installs dependencies with pnpm
- Builds the Next.js application
- Deploys to Vercel using CLI
- Passes all environment variables

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_API_SERVER`
- `MAILCHIMP_AUDIENCE_ID`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `REDIS_URL`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
- `RESEND_API_KEY`
- `BREVO_API_KEY`

**Deployment URL:** https://jntuhresults.theskypedia.com

---

### 5. Dependency Updates
**File:** `.github/workflows/dependency-update.yml`

**Triggers:**
- Weekly on Monday at midnight (cron: `0 0 * * 1`)
- Manual trigger via `workflow_dispatch`

**Jobs:**

#### 📦 Update Dependencies
- Checks for outdated packages
- Runs security audit
- Generates update report
- Creates GitHub issue with findings

**Report Includes:**
- List of outdated packages
- Security vulnerabilities found
- Recommended updates

**Labels:** `dependencies`, `automated`

---

### 6. Code Quality Checks
**File:** `.github/workflows/code-quality.yml`

**Triggers:**
- Pull requests to `main` or `develop`
- Push to `main` or `develop`

**Jobs:**

#### ✅ Quality Gate
- Runs ESLint with JSON report
- Checks code formatting with Prettier
- Counts TODO/FIXME comments
- Identifies large files (>100KB)
- Finds console.log statements
- Comments PR with quality report

#### 📦 Bundle Size
- Builds application
- Analyzes bundle size
- Compares with previous builds
- Uploads size report

**Artifacts:**
- `code-quality-report` - Quality metrics and issues
- `bundle-size-report` - Bundle size analysis

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/jntuh-results-the-skypedia.git
cd jntuh-results-the-skypedia
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Secrets
Go to **Settings → Secrets and variables → Actions** in your GitHub repository and add:

#### Required Secrets:
```
VERCEL_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
MAILCHIMP_API_KEY
MAILCHIMP_API_SERVER
MAILCHIMP_AUDIENCE_ID
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLARITY_PROJECT_ID
REDIS_URL
REDIS_HOST
REDIS_PORT
REDIS_PASSWORD
RESEND_API_KEY
BREVO_API_KEY
```

#### Optional Secrets (for enhanced deployment):
```
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### 4. Enable GitHub Actions
- Go to **Actions** tab
- Click "I understand my workflows, go ahead and enable them"

### 5. First Run
```bash
git add .
git commit -m "feat: add GitHub Actions workflows"
git push origin main
```

---

## Required Secrets

### How to Get Each Secret:

#### Vercel
1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Generate new token → `VERCEL_TOKEN`
3. Project Settings → General → `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

#### Supabase
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Project Settings → API
3. Copy URL → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Mailchimp
1. Go to [Mailchimp Account](https://admin.mailchimp.com/)
2. Profile → Extras → API keys
3. Generate key → `MAILCHIMP_API_KEY`
4. Server prefix (e.g., us1, us2) → `MAILCHIMP_API_SERVER`
5. Audience → Settings → Audience ID → `MAILCHIMP_AUDIENCE_ID`

#### Clerk
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. API Keys → Copy publishable key → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
3. Copy secret key → `CLERK_SECRET_KEY`

#### Microsoft Clarity
1. Go to [Clarity Dashboard](https://clarity.microsoft.com/)
2. Settings → Project ID → `NEXT_PUBLIC_CLARITY_PROJECT_ID`

#### Redis
1. Your Redis provider dashboard
2. Copy connection details:
   - `REDIS_URL` (full connection string)
   - `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`

#### Email Services
1. **Resend:** [Resend Dashboard](https://resend.com/) → API Keys → `RESEND_API_KEY`
2. **Brevo:** [Brevo Dashboard](https://app.brevo.com/) → SMTP & API → `BREVO_API_KEY`

---

## Badge Integration

Add these badges to your README.md:

```markdown
[![CI/CD Pipeline](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/ci.yml)
[![Security Scan](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/security-scan.yml/badge.svg)](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/security-scan.yml)
[![SEO Check](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/seo-check.yml/badge.svg)](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/seo-check.yml)
[![Deploy](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/jntuh-results-the-skypedia/actions/workflows/deploy.yml)
```

---

## Workflow Status Monitoring

### View Workflow Runs
1. Go to **Actions** tab in your repository
2. Select workflow from left sidebar
3. View run history and logs

### Debug Failed Workflows
1. Click on failed workflow run
2. Expand failed job
3. Review logs for errors
4. Fix issues and push again

### Manual Triggers
Some workflows support manual triggering:
1. Go to **Actions** tab
2. Select workflow
3. Click **Run workflow** button
4. Choose branch and run

---

## Best Practices

### ✅ Do's
- Keep secrets up to date
- Review security scan reports weekly
- Monitor bundle size increases
- Fix linting errors before merging
- Check Lighthouse scores regularly
- Update dependencies monthly

### ❌ Don'ts
- Never commit `.env` files
- Don't ignore security vulnerabilities
- Don't skip CI checks
- Don't disable required workflows
- Don't push directly to main (use PRs)

---

## Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check locally first
pnpm install
pnpm build
```

#### Type Errors
```bash
# Run type check locally
pnpm tsc --noEmit
```

#### Lint Errors
```bash
# Fix automatically
pnpm lint --fix
```

#### Secret Not Found
- Verify secret name matches exactly (case-sensitive)
- Check secret is available in correct environment
- Ensure secret has value and is not empty

#### Workflow Not Triggering
- Check branch name matches trigger configuration
- Verify workflow file syntax is valid YAML
- Ensure GitHub Actions is enabled for repository

---

## Performance Benchmarks

### Expected CI Times
- **Lint:** ~30 seconds
- **Type Check:** ~45 seconds
- **Build:** ~2-3 minutes
- **Lighthouse:** ~2-3 minutes
- **Security Scan:** ~1-2 minutes
- **Full Deployment:** ~4-5 minutes

### Optimization Tips
- Use pnpm cache (already configured)
- Run jobs in parallel where possible
- Skip unnecessary jobs for draft PRs
- Use `--frozen-lockfile` to speed up installs

---

## Contributing

When adding new workflows:

1. **Test locally** using [act](https://github.com/nektos/act)
2. **Document** the workflow in this file
3. **Add secrets** to repository settings
4. **Test in PR** before merging to main
5. **Update badges** in README if needed

---

## Support

For issues with workflows:
- Check workflow logs in Actions tab
- Review this documentation
- Create an issue with workflow run link
- Tag with `ci/cd` label

---

## Changelog

### 2025-12-05
- ✅ Added CI/CD pipeline workflow
- ✅ Added SEO & performance check workflow
- ✅ Added security scanning workflow
- ✅ Added dependency update workflow
- ✅ Added code quality checks workflow
- 📝 Created comprehensive documentation

---

**Last Updated:** December 5, 2025
**Maintained By:** JNTUH Results Team
