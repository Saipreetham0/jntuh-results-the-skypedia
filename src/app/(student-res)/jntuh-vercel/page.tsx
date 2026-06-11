import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/metadata';
import { ArrowRight, CheckCircle, Zap, Shield, Bell, Calculator } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';

export const metadata: Metadata = generateMetadata({
  title: 'JNTUH Results (jntuh.vercel.app Alternative) | Faster & Free | TheSkypedia',
  description: "Looking for jntuh.vercel.app or the JNTUH Vercel results tool? You've found the right place. TheSkypedia is the fastest JNTUH results portal — check B.Tech results, CGPA calculator, backlogs & more.",
  path: '/jntuh-vercel',
});

const features = [
  { icon: Zap, title: 'Instant Results', desc: 'Results load in under 2 seconds, even during peak traffic after result announcements.' },
  { icon: Calculator, title: 'CGPA Calculator', desc: 'Calculate CGPA, SGPA, convert to percentage — all official JNTUH R22/R18/R16 formulas.' },
  { icon: Shield, title: 'Consolidated View', desc: 'View all your semester results, grade history, and CGPA trend in a single dashboard.' },
  { icon: Bell, title: 'Result Alerts', desc: 'Get email alerts the moment new JNTUH results are published — never miss a result.' },
];

const faqs = [
  {
    question: 'Is this the same as jntuh.vercel.app?',
    answer: 'TheSkypedia\'s JNTUH Results portal (jntuhresults.theskypedia.com) is the evolved, feature-rich version of the popular Vercel-hosted JNTUH results tool. It includes all the same result-checking functionality plus a CGPA calculator, consolidated results, backlog checker, result alerts, and much more.',
  },
  {
    question: 'Why is jntuh.vercel.app not working?',
    answer: 'The old jntuh.vercel.app deployment may be down or inactive. TheSkypedia is the actively maintained alternative — always online and updated for the latest JNTUH regulations including R22.',
  },
  {
    question: 'How do I check my JNTUH result on this site?',
    answer: 'Go to the JNTUH Results page, enter your 10-digit hall ticket number (e.g. 21B91A0501), select your regulation and semester, then click Check Results. Your marks, grades, and SGPA appear instantly.',
  },
  {
    question: 'Does this support R22 results?',
    answer: 'Yes. TheSkypedia supports all active JNTUH regulations: R22, R20, R18, R16, and older. Both B.Tech and M.Tech results are available.',
  },
  {
    question: 'Can I check my backlogs and consolidated results here?',
    answer: 'Yes. Use the Consolidated Results tool to see all semesters at once with CGPA history, and the Backlog Checker to view all your pending subjects across regulations.',
  },
];

export default function JntuhVercelPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'JNTUH Results (Vercel Alternative)', path: '/jntuh-vercel' },
        ]}
      />

      <main className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/40 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              You found the right site
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              JNTUH Results — The New Home<br className="hidden sm:block" /> of jntuh.vercel.app
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              If you were looking for the JNTUH results tool on Vercel, this is it — same results,
              now faster, always online, with CGPA calculator, backlogs, and result alerts built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/jntuh-results"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Check Your Results
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cgpa-calculator"
                className="inline-flex items-center justify-center gap-2 bg-blue-500/30 border border-blue-400/50 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500/40 transition-colors"
              >
                CGPA Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Everything You Need in One Place
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools grid */}
        <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Popular Tools
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { href: '/jntuh-results', label: 'Semester Results' },
                { href: '/consolidated-results', label: 'Consolidated Results' },
                { href: '/check-backlogs', label: 'Backlog Checker' },
                { href: '/cgpa-calculator', label: 'CGPA Calculator' },
                { href: '/cgpa-percentage-converter', label: 'CGPA → Percentage' },
                { href: '/sgpa-to-cgpa-calculator', label: 'SGPA → CGPA' },
                { href: '/marks-percentage-calculator', label: 'Marks % Calculator' },
                { href: '/cgpa-target-planner', label: 'CGPA Target Planner' },
                { href: '/result-alerts', label: 'Result Alerts' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            About This JNTUH Results Portal
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed space-y-3 text-gray-600 dark:text-gray-400">
            <p>
              TheSkypedia&apos;s JNTUH Results portal is the most comprehensive results-checking tool
              for Jawaharlal Nehru Technological University Hyderabad (JNTUH) students. Whether
              you were using the previous Vercel-hosted JNTUH results tool or looking for a faster
              alternative, this portal provides instant access to B.Tech, M.Tech, MBA, and MCA
              semester results for all active regulations — R22, R20, R18, R16, and R13.
            </p>
            <p>
              Beyond basic result checking, the portal offers a complete CGPA calculator supporting
              JNTUH&apos;s official grading formula (O=10, A+=9, A=8, B+=7, B=6, C=5), a CGPA-to-percentage
              converter using the standard <strong>(CGPA − 0.5) × 10</strong> formula, consolidated
              results across all semesters, backlog detection, and real-time result alert subscriptions
              via email.
            </p>
            <p>
              The portal is maintained by TheSkypedia and is fully free to use. It is not affiliated
              with the official JNTUH university website but aggregates publicly available result data
              for faster, more convenient student access.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FAQSectionDynamic faqs={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Check Your Results?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            Enter your hall ticket number and get your JNTUH results in seconds.
          </p>
          <Link
            href="/jntuh-results"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Check JNTUH Results Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </>
  );
}
