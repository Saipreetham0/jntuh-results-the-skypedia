# JNTUH Results - The Skypedia

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

A comprehensive platform for JNTUH (Jawaharlal Nehru Technological University Hyderabad) students to check results, calculate CGPA/SGPA, and access academic resources.

[Live Demo](https://jntuh-results-the-skypedia.vercel.app) • [Report Bug](https://github.com/yourusername/jntuh-results-the-skypedia/issues) • [Request Feature](https://github.com/yourusername/jntuh-results-the-skypedia/issues)

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
  - [Build](#build)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Student Results
- **Check Results**: Instant access to semester-wise results by roll number
- **Consolidated Results**: View complete academic transcript across all semesters
- **Semester-wise Results**: Detailed breakdown of each semester's performance
- **Backlogs Checker**: Identify pending subjects and plan reappearances
- **Credit Eligibility Check**: Verify credit requirements for progression

### Calculators & Converters
- **CGPA Calculator**: Calculate cumulative grade point average
- **SGPA to CGPA Converter**: Convert semester GPA to cumulative GPA
- **CGPA to Percentage Converter**: Convert CGPA to percentage and vice versa
- **Marks Percentage Calculator**: Calculate percentage from obtained marks

### Academic Resources
- **Previous Question Papers**: Access to past exam papers
- **Academic Calendar**: Important dates and events
- **Syllabus**: Course syllabi for all programs
- **B.Tech Colleges**: Directory of affiliated colleges in Telangana
- **Notifications**: Latest updates and announcements

### Additional Features
- **PWA Support**: Install as a mobile/desktop app
- **Dark Mode**: Eye-friendly dark theme support
- **PDF Export**: Download and print results
- **Performance Comparison**: Compare results with peers
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **SEO Optimized**: Enhanced discoverability
- **Ad Integration**: Google AdSense monetization

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **React**: 19.2.0 with Server Components
- **TypeScript**: Type-safe development
- **Styling**: Tailwind CSS 3.4
- **UI Components**:
  - Radix UI primitives
  - Headless UI components
  - Custom shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Heroicons, Lucide React, Radix Icons

### Backend & Database
- **Authentication**: NextAuth.js with Firebase adapter
- **Database**:
  - MySQL (MySQL2, TypeORM)
  - Supabase (PostgreSQL)
  - Redis (ioredis)
- **ORM**: TypeORM
- **API**: Next.js API Routes

### Tools & Services
- **Email**: Brevo, Resend, React Email
- **PDF Generation**: jsPDF, html2pdf.js, react-pdf
- **Charts**: Recharts
- **Forms**: Yup validation
- **Analytics**: Vercel Speed Insights
- **Ads**: Google AdSense
- **PWA**: next-pwa

### Development
- **Build Tool**: Turbopack (Next.js 16)
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Bundle Analyzer**: @next/bundle-analyzer
- **Package Manager**: pnpm

---

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher (recommended)
- **MySQL**: 8.x or higher (or access to Supabase)
- **Redis**: 6.x or higher (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jntuh-results-the-skypedia.git
   cd jntuh-results-the-skypedia
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Set up the database**
   ```bash
   # Run database migrations
   pnpm prisma generate
   # Or use your preferred migration tool
   ```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/jntuh_results"

# Supabase (Alternative)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Firebase (Authentication)
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-firebase-project-id"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxxxxxxx"

# Email Services
BREVO_API_KEY="your-brevo-api-key"
RESEND_API_KEY="your-resend-api-key"

# Redis (Optional)
REDIS_URL="redis://localhost:6379"

# API Proxy (if needed)
API_PROXY_URL="your-api-proxy-url"
```

### Development

Run the development server with Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the production application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

---

## Project Structure

```
jntuh-results-the-skypedia/
├── src/
│   ├── app/                          # Next.js 13+ App Router
│   │   ├── (converter)/              # Route group for converters
│   │   │   ├── cgpa-percentage-converter/
│   │   │   ├── percentage-to-cgpa-calculator/
│   │   │   ├── sgpa-to-cgpa-calculator/
│   │   │   └── marks-percentage-calculator/
│   │   ├── (student-res)/            # Route group for student features
│   │   │   ├── cgpa-calculator/
│   │   │   ├── check-backlogs/
│   │   │   ├── consolidated-results/
│   │   │   ├── semester-wise-results/
│   │   │   ├── credit-eligibility-check/
│   │   │   ├── compare-performance/
│   │   │   └── previous-question-papers/
│   │   ├── admin/                    # Admin panel
│   │   ├── about-us/
│   │   ├── calendar/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   ├── faq/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── notifications/
│   │   ├── syllabus/
│   │   ├── btech-colleges-tg/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── providers.tsx             # Context providers
│   │   └── not-found.tsx             # 404 page
│   ├── components/                   # Reusable components
│   │   ├── Adsense/                  # AdSense components
│   │   ├── ErrorBoundary.tsx         # Error boundary
│   │   ├── Hero.tsx                  # Hero section
│   │   ├── blog.tsx                  # Blog components
│   │   └── results.tsx               # Result components
│   ├── config/                       # Configuration files
│   │   └── adSlots.ts                # AdSense slot configuration
│   ├── lib/                          # Utility libraries
│   ├── styles/                       # Global styles
│   └── types/                        # TypeScript type definitions
├── public/                           # Static assets
├── .env.local                        # Environment variables (not committed)
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── pnpm-lock.yaml                    # Lock file
```

---

## Key Features

### 1. Results System
- Real-time result fetching from university APIs
- Caching layer for improved performance
- Error handling and retry mechanisms
- PDF generation for printing/downloading

### 2. Calculator Suite
- Multiple calculators with validation
- Instant calculations with visual feedback
- Export results as PDF
- Share functionality

### 3. Progressive Web App (PWA)
- Offline support
- Install on mobile/desktop
- Push notifications for new results
- App-like experience

### 4. Performance
- Server-side rendering (SSR)
- Static site generation (SSG) where applicable
- Image optimization
- Code splitting and lazy loading
- Turbopack for faster builds

### 5. SEO & Analytics
- Dynamic meta tags
- Structured data (schema.org)
- Sitemap generation
- Speed Insights integration

### 6. Accessibility
- WCAG 2.1 compliant
- Keyboard navigation
- Screen reader support
- High contrast mode

---

## Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm dev:old          # Start development server with Webpack

# Build & Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Run Prettier (if configured)

# Analysis
pnpm analyze          # Analyze bundle size (if configured)
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- JNTUH for providing the academic data APIs
- All contributors who have helped improve this project
- The open-source community for the amazing tools and libraries

---

## Contact

For questions or support, please contact:
- Email: support@theskypedia.com
- Website: [theskypedia.com](https://theskypedia.com)

---

<div align="center">

Made with ❤️ by The Skypedia Team

[⬆ Back to Top](#jntuh-results---the-skypedia)

</div>
