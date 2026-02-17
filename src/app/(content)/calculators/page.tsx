import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingUp, Clock, ArrowRight, Star } from 'lucide-react';
import { ResponsiveAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import YouMightAlsoNeed from '@/components/ui/YouMightAlsoNeed';
import NextStepCTA from '@/components/ui/NextStepCTA';

export const metadata: Metadata = {
    title: 'JNTUH CGPA Calculators & Tools Hub | R22, R20, R18 Regulations',
    description: 'Complete collection of CGPA calculators for JNTUH students. Calculate CGPA, convert to percentage, calculate marks percentage, and more. Free tools for R22, R20, R18 regulations.',
    keywords: 'JNTUH CGPA calculator, CGPA to percentage, marks percentage, SGPA to CGPA, percentage to CGPA, R22, R20, R18',
};

// Hub data
const calculators = [
    {
        title: 'CGPA to Percentage Converter',
        description: 'Convert your CGPA to percentage instantly with our accurate calculator. Works for all regulations.',
        href: '/cgpa-to-percentage',
        readTime: '2 min',
        popularity: 98,
        category: 'Featured',
        icon: <TrendingUp className="w-6 h-6" />,
    },
    {
        title: 'Marks to Percentage Calculator',
        description: 'Calculate your marks percentage from grade points. Support for all JNTUH regulations.',
        href: '/marks-percentage-calculator',
        readTime: '3 min',
        popularity: 95,
        category: 'Featured',
        icon: <Calculator className="w-6 h-6" />,
    },
    {
        title: 'SGPA to CGPA Calculator',
        description: 'Convert semester GPA to cumulative GPA. Accurate calculations for R22, R20, and R18.',
        href: '/sgpa-to-cgpa-calculator',
        readTime: '2 min',
        popularity: 92,
        category: 'Conversion',
        icon: <Calculator className="w-6 h-6" />,
    },
    {
        title: 'Percentage to CGPA Converter',
        description: 'Convert percentage marks to CGPA for JNTUH regulations. Fast and accurate.',
        href: '/percentage-to-cgpa',
        readTime: '2 min',
        popularity: 88,
        category: 'Conversion',
        icon: <Calculator className="w-6 h-6" />,
    },
    {
        title: 'Credit Eligibility Checker',
        description: 'Check if you have enough credits to appear for exams or graduate.',
        href: '/credit-eligibility-check',
        readTime: '3 min',
        popularity: 85,
        category: 'Tools',
        icon: <Calculator className="w-6 h-6" />,
    },
    {
        title: 'CGPA Calculator',
        description: 'Calculate your cumulative GPA from semester grades. All regulations supported.',
        href: '/cgpa-calculator',
        readTime: '4 min',
        popularity: 90,
        category: 'Core',
        icon: <Calculator className="w-6 h-6" />,
    },
];

const guides = [
    {
        title: 'How to Calculate CGPA - Complete Guide',
        href: '/blog/how-to-calculate-cgpa-jntuh',
    },
    {
        title: 'CGPA vs Percentage: Conversion Formula Explained',
        href: '/blog/cgpa-to-percentage-conversion',
    },
    {
        title: 'Understanding JNTUH Grading System',
        href: '/blog/jntuh-grading-system-explained',
    },
];

export default function CalculatorHubPage() {
    const breadcrumbItems = [
        { label: 'Calculators', href: '/calculators' },
    ];

    const featuredCalculators = calculators.filter((c) => c.category === 'Featured');
    const otherCalculators = calculators.filter((c) => c.category !== 'Featured');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
                        <Calculator className="w-8 h-8" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        CGPA Calculators & Tools
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Complete collection of free calculators and conversion tools for JNTUH students.
                        Accurate, fast, and easy to use.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                            <Star className="w-4 h-4" />
                            All Regulations Supported
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                            <Calculator className="w-4 h-4" />
                            6 Free Tools
                        </span>
                    </div>
                </div>

                {/* Top Banner Ad */}
                <div className="mb-12">
                    <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} format="auto" />
                </div>

                {/* Featured Calculators */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        Most Popular Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredCalculators.map((calc, index) => (
                            <Link
                                key={index}
                                href={calc.href}
                                className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-200 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all"
                            >
                                {/* Popularity Badge */}
                                <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                                    {calc.popularity}% ★
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        {calc.icon}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                                            {calc.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {calc.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                                                <Clock className="w-3.5 h-3.5" />
                                                {calc.readTime}
                                            </span>

                                            <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                                                Use Calculator
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mid-page Ad */}
                <div className="my-12">
                    <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} format="rectangle" />
                </div>

                {/* All Tools */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        All Calculator Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherCalculators.map((calc, index) => (
                            <Link
                                key={index}
                                href={calc.href}
                                className="group p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
                                        {calc.icon}
                                    </div>
                                    <span className="text-xs text-gray-500">{calc.popularity}%</span>
                                </div>

                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                                    {calc.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                    {calc.description}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">{calc.readTime}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Related Guides */}
                <YouMightAlsoNeed
                    title="📚 Understanding CGPA - Read Our Guides"
                    links={guides.map((g) => ({ title: g.title, href: g.href }))}
                    variant="compact"
                />

                {/* Bottom Ad */}
                <div className="mt-12">
                    <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} format="auto" />
                </div>

                {/* Next Step CTA */}
                <NextStepCTA
                    title="Check Your Results"
                    description="View your JNTUH exam results and download mark sheets"
                    href="/results"
                    variant="primary"
                />
            </section>
        </div>
    );
}
