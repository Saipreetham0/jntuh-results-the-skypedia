import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, HelpCircle, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export function SEOContent() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How to check JNTUH Backlogs instantly?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Enter your 10-digit Hall Ticket Number in the search box above and click 'Check Backlogs'. Our tool fetches data directly from JNTUH servers to show your complete credit history."
                }
            },
            {
                "@type": "Question",
                "name": "Is this JNTUH Backlog Checker accurate for 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our system is updated for the 2026 academic year and supports R22, R18, R16, and R13 regulations. It fetches real-time data including the latest supply results."
                }
            },
            {
                "@type": "Question",
                "name": "How are JNTUH credits calculated for promotion?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For promotion from 1st to 2nd year, you need 50% of secured credits. For 2nd to 3rd year, you need 60% of total credits up to 2-1 semester. Our tool automatically calculates your total secured credits."
                }
            }
        ]
    };

    return (
        <div className="space-y-12 mt-12 animate-fade-in text-gray-700 dark:text-gray-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* 1. Primary Keyword Section */}
            <section className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                    JNTUH Backlogs Checker 2026: Fast, Accurate & Detailed
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    <strong>Tracking your academic progress</strong> shouldn't be a hassle. The <span className="text-blue-600 font-bold">JNTUH Backlogs Checker</span> is designed for B.Tech and B.Pharmacy students under Jawaharlal Nehru Technological University Hyderabad. Whether you belong to <strong>R22, R18, R16, or R13 regulations</strong>, our tool provides an instant, comprehensive analysis of your semester-wise performance.
                </p>
                <p className="leading-relaxed mb-6">
                    Stop searching through dozens of PDF results. Just enter your hall ticket number to get a single consolidated report of your <strong>active backlogs, total credits secured, and SGPA/CGPA</strong> status.
                </p>
            </section>

            {/* 2. Feature Highlights (Visual Break) */}
            <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                    <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Real-Time Data</h3>
                    <p className="text-sm">Fetches directly from JNTUH servers. No stale data. Updated within seconds of official result declaration.</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                    <CheckCircle2 className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Credit Calculator</h3>
                    <p className="text-sm">Automatically sums up your credits to help you check eligibility for promotion to next year.</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
                    <BookOpen className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Supply Tracking</h3>
                    <p className="text-sm">Separate view for regular and supply attempts. Know exactly which subject is holding you back.</p>
                </div>
            </div>

            {/* 3. Detailed Guide */}
            <section className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Understanding JNTUH Grading System (R22 & R18)
                </h3>
                <p className="mb-4">
                    JNTUH follows a Choice Based Credit System (CBCS). Your performance is evaluated based on:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li><strong>O (Outstanding):</strong> 10 Grade Points (Marks ≥ 90)</li>
                    <li><strong>A+ (Excellent):</strong> 9 Grade Points (Marks 80-89)</li>
                    <li><strong>A (Very Good):</strong> 8 Grade Points (Marks 70-79)</li>
                    <li><strong>B+ (Good):</strong> 7 Grade Points (Marks 60-69)</li>
                    <li><strong>B (Above Average):</strong> 6 Grade Points (Marks 50-59)</li>
                    <li><strong>C (Average):</strong> 5 Grade Points (Marks 40-49)</li>
                    <li><strong>F (Fail):</strong> 0 Grade Points (Marks &lt; 40) - <strong>Simultaneously counted as a Backlog.</strong></li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-4 my-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-yellow-800 dark:text-yellow-500 text-sm">Promotion Rule Warning</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                                To get promoted from <strong>1st Year to 2nd Year</strong>, you typically need 50% of total credits. For <strong>2nd to 3rd Year</strong>, you need 60% of total credits up to 2-1 semester. Always verify with your college exam branch.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FAQ Section */}
            <section className="mt-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-indigo-600" />
                    Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <AccordionItem value="item-1" className="border-b border-gray-100 dark:border-gray-700">
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left font-semibold">
                            How do I check my total backlogs?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-900/50">
                            Simply enter your hall ticket number in the tool above. It scans all semesters and lists out subjects where you have secured an 'F' grade or were Absent ('Ab').
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b border-gray-100 dark:border-gray-700">
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left font-semibold">
                            Is the data officially from JNTUH?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-900/50">
                            Yes, our tool fetches data from the public JNTUH results portal. We do not store or modify your results. We only present them in a consolidated, easy-to-read format.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b border-gray-100 dark:border-gray-700">
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left font-semibold">
                            Can I calculate CGPA with backlogs?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-900/50">
                            No, you can only verify your SGPA for cleared semesters. To calculate accurate CGPA, you must clear all active backlogs. Use our <a href="/sgpa-to-cgpa-calculator" className="text-blue-600 hover:underline">SGPA to CGPA Calculator</a> for estimation.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left font-semibold">
                            What does 'Ab' mean in results?
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-900/50">
                            'Ab' stands for Absent. It means you did not appear for the exam. This is treated equivalently to a Fail grade ('F') for credit calculation purposes and counts as a backlog.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}
