"use client";

import React, { useRef } from 'react';
import ResultCheckerHero from '@/components/results/ResultCheckerHero';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';
import { ResponsiveAd, InContentAd, MultiplexAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';
import Link from 'next/link';
import { Calculator, BookOpen, Clock, Calendar, Loader2 } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useConsolidatedResults } from '@/hooks/useConsolidatedResults';
import ConsolidatedResultDisplay from '@/components/results/ConsolidatedResultDisplay';
import { motion, AnimatePresence } from 'framer-motion';

const quickGuides = [
    {
        title: "Calculate CGPA",
        desc: "Convert your JNTUH semester grades into a single CGPA with our accurate calculator.",
        link: "/cgpa-calculator",
        icon: Calculator,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Check Backlogs",
        desc: "View your complete backlog history and pending subjects in one simple report.",
        link: "/check-backlogs",
        icon: BookOpen,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "Academic Calendar",
        desc: "Stay updated with JNTUH exam dates, semester starting, and holiday lists.",
        link: "/calendar",
        icon: Calendar,
        color: "text-purple-600",
        bg: "bg-purple-50"
    }
];

const resultsFaqs = [
    {
        question: "Is this the official JNTUH results website?",
        answer: "No, this is an independent student resource platform (TheSkypedia) that provides a simplified interface to check JNTUH results. For official verification and certificates, please visit official JNTUH university portals."
    },
    {
        question: "How soon are results updated on this portal?",
        answer: "We aim to display results as soon as they are officially announced by JNTUH. Our portal uses high-speed APIs to ensure you get your marks without server crashes often seen on official sites during peak hours."
    },
    {
        question: "Can I check my backlog results here?",
        answer: "Yes, you can check both regular and supply/backlog results by entering your Hall Ticket number. Our Consolidated Results tool provides a complete history across all semesters."
    },
    {
        question: "What is needed to check JNTUH results?",
        answer: "You only need your 10-digit Hall Ticket Number (Roll Number) to check your results. No registration or login is required for standard result checks."
    }
];

export default function JntuhResultsClient() {
    const { loading, results, error, fetchResults } = useConsolidatedResults();
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (roll: string) => {
        await fetchResults(roll);
        // smooth scroll to results after a short delay to ensure rendering
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <main className="bg-white dark:bg-gray-950">
            <BreadcrumbSchema
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'JNTUH Results', path: '/jntuh-results' }
                ]}
            />
            {/* Hero Section */}
            <ResultCheckerHero onSearch={handleSearch} />

            {/* Top Ad */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.TOP_BANNER} />
            </div>

            {/* Results Display Area */}
            <div ref={resultsRef} className="scroll-mt-24">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gray-50 dark:bg-gray-900 py-12 flex items-center justify-center"
                        >
                            <div className="flex flex-col items-center">
                                <Loader2 className="h-10 w-10 text-[#1C61E7] animate-spin mb-4" />
                                <p className="text-gray-600 dark:text-gray-400 font-medium">Fetching your results...</p>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="max-w-2xl mx-auto px-4 py-8"
                        >
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {results && (
                        <div className="bg-gray-50 dark:bg-gray-900 py-8 px-4 border-y border-gray-200 dark:border-gray-800">
                            <div className="max-w-6xl mx-auto">
                                <ConsolidatedResultDisplay results={results} />
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>


            {/* Content Section */}
            <section className="py-12 md:py-20 lg:py-24 px-4 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Sidebar Content */}
                        <div className="lg:col-span-8 space-y-12">
                            <article className="prose prose-lg dark:prose-invert max-w-none">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                                    How to Check JNTUH Results Online?
                                </h2>
                                <p>
                                    Jawaharlal Nehru Technological University Hyderabad (JNTUH) announces results for B.Tech, M.Tech, and other autonomous and non-autonomous colleges. To check your results instantly on our portal, follow these simple steps:
                                </p>
                                <ol className="space-y-4">
                                    <li>Enter your <strong>10-digit Hall Ticket Number</strong> (e.g., 20J21A0501) in the search box above.</li>
                                    <li>Click on the <strong>"Check Results"</strong> button.</li>
                                    <li>Our system will fetch your latest academic records from the JNTUH database.</li>
                                    <li>View your semester-wise internal marks, external scores, and total grades.</li>
                                </ol>

                                <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_1} />

                                <h3 className="text-2xl font-bold mt-12 mb-4">Understanding JNTUH Grading System</h3>
                                <p>
                                    JNTUH follows a Choice Based Credit System (CBCS). Grades range from 'O' (Outstanding) to 'F' (Fail). A student must secure a minimum of 35% in external exams and 40% aggregate to pass a subject under R18, R20, and R22 regulations.
                                </p>

                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 my-8">
                                    <h4 className="text-blue-900 dark:text-blue-300 font-bold mb-2 flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        Fast Fact
                                    </h4>
                                    <p className="text-blue-800/80 dark:text-blue-400/80 m-0">
                                        Our portal handles over 50,000+ concurrent users during result release spikes, ensuring you don't face "Server Error" issues.
                                    </p>
                                </div>
                            </article>

                            <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_2} />
                        </div>

                        {/* Sticky Tools Sidebar */}
                        <div className="lg:col-span-4 sticky top-24 space-y-8">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Academic Tools</h3>
                                <div className="space-y-6">
                                    {quickGuides.map((guide, idx) => (
                                        <Link key={idx} href={guide.link} className="group flex gap-4 items-start">
                                            <div className={`${guide.bg} p-3 rounded-2xl ${guide.color} group-hover:scale-110 transition-transform`}>
                                                <guide.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:underline">{guide.title}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{guide.desc}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/syllabus"
                                    className="mt-8 block w-full py-4 text-center bg-[#1C61E7] text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    Explore Syllabus
                                </Link>
                            </div>

                            {/* Sidebar Ad */}
                            <MultiplexAd adSlot={AD_SLOTS.SEMESTER.SIDEBAR_WIDGET} />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSectionDynamic
                faqs={resultsFaqs}
                title="JNTUH Results FAQs"
                description="Everything you need to know about checking your academic performance."
            />

            {/* Bottom Ad */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <MultiplexAd adSlot={AD_SLOTS.SEMESTER.BOTTOM_BANNER} />
            </div>
        </main>
    );
}
