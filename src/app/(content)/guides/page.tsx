import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, TrendingUp, Clock, ArrowRight, Star, Lightbulb } from 'lucide-react';
import { ResponsiveAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import YouMightAlsoNeed from '@/components/ui/YouMightAlsoNeed';
import NextStepCTA from '@/components/ui/NextStepCTA';

export const metadata: Metadata = {
    title: 'JNTUH Guides Hub | Complete How-To Guides & Tutorials',
    description: 'Comprehensive guides for JNTUH students. Learn how to calculate CGPA, download certificates, check results, understand regulations, and more.',
    keywords: 'JNTUH guides, how-to tutorials, CGPA calculation, mark sheet download, regulations guide, JNTUH help',
};

const guideCategories = [
    {
        title: 'How to Calculate CGPA - Complete Guide',
        description: 'Step-by-step guide to calculating your CGPA for all JNTUH regulations. Includes examples and formulas.',
        href: '/blog/how-to-calculate-cgpa',
        readTime: '5 min',
        popularity: 98,
        category: 'Featured',
        icon: <Lightbulb className="w-6 h-6" />,
        difficulty: 'Beginner',
    },
    {
        title: 'Understanding JNTUH Grading System',
        description: 'Complete explanation of grade points, CGPA calculation, and result interpretation.',
        href: '/blog/jntuh-grading-system',
        readTime: '6 min',
        popularity: 95,
        category: 'Featured',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Beginner',
    },
    {
        title: 'How to Download JNTUH Mark Sheet',
        description: 'Step-by-step guide with screenshots to download your official mark sheet and certificates.',
        href: '/blog/download-marksheet-guide',
        readTime: '4 min',
        popularity: 92,
        category: 'Academic',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Beginner',
    },
    {
        title: 'R22 Regulation Changes Explained',
        description: 'Understand all the major changes in R22 regulation compared to R20 and R18.',
        href: '/blog/r22-regulation-changes',
        readTime: '7 min',
        popularity: 88,
        category: 'Regulations',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Intermediate',
    },
    {
        title: 'Credit System & Eligibility Guide',
        description: 'Learn about credit requirements for exams, promotions, and graduation.',
        href: '/blog/credit-system-guide',
        readTime: '5 min',
        popularity: 85,
        category: 'Academic',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Beginner',
    },
    {
        title: 'Supply Exam Strategy & Tips',
        description: 'How to prepare for and clear backlog exams effectively.',
        href: '/blog/supply-exam-tips',
        readTime: '6 min',
        popularity: 80,
        category: 'Exam Tips',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Intermediate',
    },
    {
        title: 'CGPA to Percentage: Formula Explained',
        description: 'Detailed explanation of CGPA to percentage conversion with examples.',
        href: '/blog/cgpa-percentage-formula',
        readTime: '4 min',
        popularity: 90,
        category: 'Academic',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Beginner',
    },
    {
        title: 'How to Check Consolidated Results',
        description: 'View all semester results together and understand your academic progress.',
        href: '/blog/consolidated-results-guide',
        readTime: '3 min',
        popularity: 75,
        category: 'Results',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Beginner',
    },
    {
        title: 'Degree Certificate Application Process',
        description: 'Complete guide to applying for and collecting your degree certificate.',
        href: '/blog/degree-certificate-process',
        readTime: '8 min',
        popularity: 70,
        category: 'Certificates',
        icon: <BookOpen className="w-6 h-6" />,
        difficulty: 'Advanced',
    },
];

const relatedResources = [
    {
        title: 'Use Our Calculators',
        description: 'Free CGPA and conversion tools',
        href: '/calculators',
    },
    {
        title: 'Check Your Results',
        description: 'Fast results server access',
        href: '/results-hub',
    },
];

export default function GuidesHubPage() {
    const breadcrumbItems = [
        { label: 'Guides', href: '/guides' },
    ];

    const featuredGuides = guideCategories.filter((g) => g.category === 'Featured');
    const otherGuides = guideCategories.filter((g) => g.category !== 'Featured');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white mb-4">
                        <BookOpen className="w-8 h-8" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        JNTUH Student Guides
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Step-by-step tutorials and comprehensive guides for everything JNTUH-related.
                        Learn at your own pace with clear examples.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4" />
                            Expert Written
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                            <BookOpen className="w-4 h-4" />
                            9+ Guides
                        </span>
                    </div>
                </div>

                <div className="mb-12">
                    <ResponsiveAd adSlot={AD_SLOTS.BLOG.TOP_BANNER} format="auto" />
                </div>

                {/* Featured Guides */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                        Most Popular Guides
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredGuides.map((guide, index) => (
                            <Link
                                key={index}
                                href={guide.href}
                                className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-200 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all"
                            >
                                <div className="absolute top-4 right-4">
                                    <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                                        {guide.popularity}% ★
                                    </span>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                        {guide.icon}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                                            {guide.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {guide.description}
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                                <Clock className="w-3.5 h-3.5" />
                                                {guide.readTime}
                                            </span>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${guide.difficulty === 'Beginner'
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                                }`}>
                                                {guide.difficulty}
                                            </span>
                                            <span className="ml-auto inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:gap-2 transition-all">
                                                Read Guide
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
                    <ResponsiveAd adSlot={AD_SLOTS.BLOG.IN_CONTENT} format="rectangle" />
                </div>

                {/* All Guides by Category */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        All Guides & Tutorials
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherGuides.map((guide, index) => (
                            <Link
                                key={index}
                                href={guide.href}
                                className="group p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                                        {guide.icon}
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                        {guide.category}
                                    </span>
                                </div>

                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                                    {guide.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                    {guide.description}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">{guide.readTime}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <YouMightAlsoNeed
                    title="🔗 Related Resources"
                    links={relatedResources.map((r) => ({ title: r.title, description: r.description, href: r.href }))}
                    variant="compact"
                />

                <div className="mt-12">
                    <ResponsiveAd adSlot={AD_SLOTS.BLOG.BOTTOM_BANNER} format="auto" />
                </div>

                <NextStepCTA
                    title="Try Our Free Calculators"
                    description="Calculate CGPA, convert to percentage, and more"
                    href="/calculators"
                    variant="accent"
                />
            </section>
        </div>
    );
}
