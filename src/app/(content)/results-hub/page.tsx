import type { Metadata } from 'next';
import Link from 'next/link';
import { FileSearch, TrendingUp, Clock, ArrowRight, Star, BookOpen } from 'lucide-react';
import { ResponsiveAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import YouMightAlsoNeed from '@/components/ui/YouMightAlsoNeed';
import NextStepCTA from '@/components/ui/NextStepCTA';

export const metadata: Metadata = {
    title: 'JNTUH Results Hub | Check B.Tech, B.Pharmacy, MBA, M.Tech Results',
    description: 'One-stop hub for all JNTUH results. Check regular, supply, and fast server results. Download mark sheets and check backlogs.',
    keywords: 'JNTUH results, B.Tech results, supply results, fast results, mark sheet download, JNTUH exam results',
};

const resultCategories = [
    {
        title: 'Fast Results Server',
        description: 'Lightning-fast results checking without slowdowns. Our dedicated server ensures instant access.',
        href: '/results/fast',
        readTime: '1 min',
        popularity: 99,
        category: 'Featured',
        icon: <TrendingUp className="w-6 h-6" />,
        badge: 'Fastest',
    },
    {
        title: 'Regular Results',
        description: 'Check official JNTUH regular exam results for all courses and semesters.',
        href: '/results',
        readTime: '2 min',
        popularity: 95,
        category: 'Featured',
        icon: <FileSearch className="w-6 h-6" />,
        badge: 'Most Used',
    },
    {
        title: 'Supply Results',
        description: 'Check supplementary exam results and backlog clearance information.',
        href: '/results/supply',
        readTime: '2 min',
        popularity: 88,
        category: 'Results',
        icon: <FileSearch className="w-6 h-6" />,
    },
    {
        title: 'Backlog Checker',
        description: 'Check all your backlogs in one place. Track and plan your backlog clearance.',
        href: '/backlogs',
        readTime: '3 min',
        popularity: 85,
        category: 'Tools',
        icon: <FileSearch className="w-6 h-6" />,
    },
    {
        title: 'Consolidated Results',
        description: 'View all semester results in one consolidated view.',
        href: '/results/consolidated',
        readTime: '3 min',
        popularity: 80,
        category: 'Results',
        icon: <FileSearch className="w-6 h-6" />,
    },
    {
        title: 'Semester Results Archive',
        description: 'Access previous semester results and historical data.',
        href: '/results/archive',
        readTime: '2 min',
        popularity: 75,
        category: 'Results',
        icon: <FileSearch className="w-6 h-6" />,
    },
];

const relatedTools = [
    {
        title: 'CGPA Calculator',
        description: 'Calculate your CGPA from semester results',
        href: '/calculators',
    },
    {
        title: 'Mark Sheet Download Guide',
        href: '/blog/how-to-download-jntuh-marksheet',
    },
    {
        title: 'Result Analysis Tips',
        href: '/blog/understanding-jntuh-results',
    },
];

export default function ResultsHubPage() {
    const breadcrumbItems = [
        { label: 'Results', href: '/results-hub' },
    ];

    const featuredResults = resultCategories.filter((c) => c.category === 'Featured');
    const otherResults = resultCategories.filter((c) => c.category !== 'Featured');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mb-4">
                        <FileSearch className="w-8 h-8" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        JNTUH Results Hub
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Check all JNTUH exam results from one place. Fast, reliable, and easy to use.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4" />
                            99.9% Uptime
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                            <FileSearch className="w-4 h-4" />
                            All Courses
                        </span>
                    </div>
                </div>

                <div className="mb-12">
                    <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="auto" />
                </div>

                {/* Featured Results */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        Quick Access
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredResults.map((result, index) => (
                            <Link
                                key={index}
                                href={result.href}
                                className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-green-200 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-lg transition-all"
                            >
                                {result.badge && (
                                    <div className="absolute top-4 right-4 px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                                        {result.badge}
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center">
                                        {result.icon}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                                            {result.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {result.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                                <Clock className="w-3.5 h-3.5" />
                                                {result.readTime}
                                            </span>

                                            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium text-sm group-hover:gap-2 transition-all">
                                                Check Now
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="my-12">
                    <ResponsiveAd adSlot={AD_SLOTS.RESULTS.INLINE_1} format="rectangle" />
                </div>

                {/* All Results */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        All Results & Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherResults.map((result, index) => (
                            <Link
                                key={index}
                                href={result.href}
                                className="group p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-md transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center mb-3">
                                    {result.icon}
                                </div>

                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                                    {result.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                    {result.description}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">{result.readTime}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <YouMightAlsoNeed
                    title="🧮 Related Tools & Guides"
                    links={relatedTools.map((t) => ({ title: t.title, description: t.description, href: t.href }))}
                    variant="compact"
                />

                <div className="mt-12">
                    <ResponsiveAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} format="auto" />
                </div>

                <NextStepCTA
                    title="Calculate Your CGPA"
                    description="Use our free calculators to convert results to CGPA and percentage"
                    href="/calculators"
                    variant="primary"
                />
            </section>
        </div>
    );
}
