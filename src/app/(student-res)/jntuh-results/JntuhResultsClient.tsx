"use client";

import React, { useRef } from 'react';
import ResultCheckerHero from '@/components/results/ResultCheckerHero';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';
import { ResponsiveAd, InContentAd, MultiplexAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';
import Link from 'next/link';
import { Calculator, BookOpen, Calendar, Loader2, Clock, ArrowRight } from 'lucide-react';
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
        color: "text-[#1C61E7]",
        bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        title: "Check Backlogs",
        desc: "View your complete backlog history and pending subjects in one simple report.",
        link: "/check-backlogs",
        icon: BookOpen,
        color: "text-emerald-600",
        bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
        title: "Academic Calendar",
        desc: "Stay updated with JNTUH exam dates, semester starting, and holiday lists.",
        link: "/calendar",
        icon: Calendar,
        color: "text-purple-600",
        bg: "bg-purple-50 dark:bg-purple-900/20",
    },
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
        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <main className="bg-gray-50 dark:bg-gray-950">
            <BreadcrumbSchema
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'JNTUH Results', path: '/jntuh-results' }
                ]}
            />

            {/* Hero */}
            <ResultCheckerHero onSearch={handleSearch} />

            {/* Top Ad */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.TOP_BANNER} />
            </div>

            {/* Results Display */}
            <div ref={resultsRef} className="scroll-mt-24">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-16 flex flex-col items-center justify-center gap-3"
                        >
                            <Loader2 className="h-8 w-8 text-[#1C61E7] animate-spin" />
                            <p className="text-sm text-gray-500 font-medium">Fetching your results...</p>
                        </motion.div>
                    )}

                    {error && !loading && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="max-w-xl mx-auto px-4 py-8"
                        >
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 text-center">
                                <p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {results && !loading && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 py-8 px-4"
                        >
                            <div className="max-w-5xl mx-auto">
                                <ConsolidatedResultDisplay results={results} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Content + Sidebar */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Article */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                                How to Check JNTUH Results Online?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 text-sm">
                                Jawaharlal Nehru Technological University Hyderabad (JNTUH) announces results for B.Tech, M.Tech, and other autonomous and non-autonomous colleges. To check your results instantly on our portal, follow these simple steps:
                            </p>
                            <ol className="space-y-3 mb-6">
                                {[
                                    <>Enter your <strong className="text-gray-900 dark:text-white font-semibold">10-digit Hall Ticket Number</strong> (e.g., 20J21A0501) in the search box above.</>,
                                    <>Click on the <strong className="text-gray-900 dark:text-white font-semibold">&ldquo;Check All Results&rdquo;</strong> button.</>,
                                    <>Our system will fetch your latest academic records from the JNTUH database.</>,
                                    <>View your semester-wise internal marks, external scores, and total grades.</>,
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        <span className="w-5 h-5 rounded-full bg-[#1C61E7]/10 text-[#1C61E7] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>

                            <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_1} />

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">Understanding JNTUH Grading System</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 text-sm">
                                JNTUH follows a Choice Based Credit System (CBCS). Grades range from &lsquo;O&rsquo; (Outstanding) to &lsquo;F&rsquo; (Fail). A student must secure a minimum of 35% in external exams and 40% aggregate to pass a subject under R18, R20, and R22 regulations.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                                <Clock className="w-5 h-5 text-[#1C61E7] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-[#1C61E7] mb-1">Fast Fact</p>
                                    <p className="text-sm text-blue-800/80 dark:text-blue-300/80">
                                        Our portal handles over 50,000+ concurrent users during result release spikes, ensuring you don&apos;t face &ldquo;Server Error&rdquo; issues.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_2} />
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4 sticky top-24 space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Quick Academic Tools</h3>
                            <div className="space-y-1">
                                {quickGuides.map((guide, idx) => (
                                    <Link
                                        key={idx}
                                        href={guide.link}
                                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className={`${guide.bg} p-2 rounded-xl ${guide.color} flex-shrink-0`}>
                                            <guide.icon className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#1C61E7] transition-colors">{guide.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{guide.desc}</p>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 group-hover:text-[#1C61E7] group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                ))}
                            </div>
                            <Link
                                href="/syllabus"
                                className="mt-4 block w-full py-3 text-center bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl transition-colors text-sm"
                            >
                                Explore Syllabus
                            </Link>
                        </div>

                        <MultiplexAd adSlot={AD_SLOTS.SEMESTER.SIDEBAR_WIDGET} />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSectionDynamic
                faqs={resultsFaqs}
                title="JNTUH Results FAQs"
                description="Everything you need to know about checking your academic performance."
            />

            {/* Bottom Ad */}
            <div className="max-w-5xl mx-auto px-4 py-10">
                <MultiplexAd adSlot={AD_SLOTS.SEMESTER.BOTTOM_BANNER} />
            </div>
        </main>
    );
}
