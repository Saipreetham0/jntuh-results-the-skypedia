import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jntuhresults.theskypedia.com';
  const now = new Date();
  const blogDate = new Date('2026-04-09');

  return [
    // ── Homepage ─────────────────────────────────────────────
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },

    // ── Results pages ─────────────────────────────────────────
    { url: `${baseUrl}/jntuh-results-checker-fast-server`, lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${baseUrl}/jntuh-results`,                     lastModified: now, changeFrequency: 'daily',  priority: 1.0 },
    { url: `${baseUrl}/results-hub`,                       lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/consolidated-results`,              lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/semester-wise-results`,             lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/check-backlogs`,                    lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${baseUrl}/mba-results`,                       lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/mtech-results`,                     lastModified: now, changeFrequency: 'weekly', priority: 0.8 },

    // ── Calculators ───────────────────────────────────────────
    { url: `${baseUrl}/calculators`,                    lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cgpa-calculator`,                lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cgpa-percentage-converter`,      lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/sgpa-to-cgpa-calculator`,        lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/percentage-to-cgpa-calculator`,  lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/marks-percentage-calculator`,    lastModified: now, changeFrequency: 'weekly', priority: 0.8 },

    // ── Academic resources ────────────────────────────────────
    { url: `${baseUrl}/jntuh-previous-question-papers`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/syllabus`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/calendar`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/btech-colleges-tg`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // ── Tools ─────────────────────────────────────────────────
    { url: `${baseUrl}/result-alerts`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/guides`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/notifications`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.5 },

    // ── Content pages ─────────────────────────────────────────
    { url: `${baseUrl}/faq`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // ── Legal pages ───────────────────────────────────────────
    { url: `${baseUrl}/privacy`,    lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`,      lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`,    lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },

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
