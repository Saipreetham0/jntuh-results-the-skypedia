import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  // Only truly dynamic pages (result data changes every build) get `now`.
  // Static-content pages use a fixed date so every deploy doesn't look like a content update.
  const now = new Date();
  const contentDate = new Date('2026-04-09');
  const blogDate = new Date('2026-06-01');

  return [
    // ── Homepage ─────────────────────────────────────────────
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },

    // ── Results pages (dynamic — update with every build) ─────
    { url: `${baseUrl}/jntuh-results-checker-fast-server`, lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${baseUrl}/jntuh-results`,                     lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${baseUrl}/jntuh-vercel`,                      lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/results-hub`,                       lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/consolidated-results`,              lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/semester-wise-results`,             lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/check-backlogs`,                    lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/mba-results`,                       lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/mtech-results`,                     lastModified: now, changeFrequency: 'weekly', priority: 0.8 },

    // ── Calculators (static content) ──────────────────────────
    { url: `${baseUrl}/calculators`,                    lastModified: contentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cgpa-target-planner`,            lastModified: contentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/cgpa-calculator`,                lastModified: contentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cgpa-percentage-converter`,      lastModified: contentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/sgpa-to-cgpa-calculator`,        lastModified: contentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/percentage-to-cgpa-calculator`,  lastModified: contentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/marks-percentage-calculator`,    lastModified: contentDate, changeFrequency: 'weekly', priority: 0.8 },

    // ── Academic resources (static content) ───────────────────
    { url: `${baseUrl}/jntuh-previous-question-papers`, lastModified: contentDate, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/syllabus`,                        lastModified: contentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calendar`,                        lastModified: contentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/btech-colleges-tg`,               lastModified: contentDate, changeFrequency: 'monthly', priority: 0.7 },

    // ── Tools (static content) ────────────────────────────────
    { url: `${baseUrl}/grace-marks-eligibility`, lastModified: contentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/class-toppers`,           lastModified: contentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/result-alerts`,           lastModified: contentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`,           lastModified: contentDate, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/notifications`,    lastModified: contentDate, changeFrequency: 'weekly',  priority: 0.5 },

    // ── Content pages (static content) ───────────────────────
    { url: `${baseUrl}/faq`,      lastModified: contentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about-us`, lastModified: contentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`,  lastModified: contentDate, changeFrequency: 'monthly', priority: 0.6 },

    // ── Legal pages (static content) ─────────────────────────
    { url: `${baseUrl}/privacy`,    lastModified: contentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`,      lastModified: contentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`,    lastModified: contentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: contentDate, changeFrequency: 'yearly', priority: 0.3 },

    // ── Blog index ────────────────────────────────────────────
    { url: `${baseUrl}/blog`, lastModified: blogDate, changeFrequency: 'weekly', priority: 0.8 },

    // ── Blog posts (all 15) ───────────────────────────────────
    { url: `${baseUrl}/blog/how-to-calculate-cgpa-in-jntuh`,                lastModified: new Date('2025-01-20'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/jntuh-cgpa-to-percentage-formula`,              lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/cgpa-to-percentage-jntuh-common-values`,        lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/jntuh-cgpa-percentage-conversion-certificate`,  lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/how-to-calculate-sgpa-to-cgpa-jntuh`,           lastModified: new Date('2024-02-14'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/jntuh-grading-system-explained`,                lastModified: new Date('2024-02-15'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/jntuh-grace-marks-rules-eligibility`,           lastModified: new Date('2024-02-13'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/marks-percentage-calculator-guide`,             lastModified: new Date('2025-02-05'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/percentage-to-cgpa-converter-jntuh`,            lastModified: new Date('2025-02-04'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/jntuh-supplementary-exam-guide`,                lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/jntuh-attendance-rules-shortage-condonation`,   lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/how-to-clear-jntuh-backlogs-fast`,              lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/jntuh-r22-regulation-complete-guide`,           lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/jntuh-internal-marks-calculation`,              lastModified: blogDate,               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/top-jntuh-engineering-colleges-2026-rankings`,  lastModified: new Date('2026-02-14'), changeFrequency: 'monthly', priority: 0.6 },

    // ── Programmatic: regulation × semester result pages ──────
    ...(['r22', 'r18'] as const).flatMap(reg =>
      (['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'] as const).map(sem => ({
        url: `${baseUrl}/results/${reg}/${sem}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    ),
  ];
}
