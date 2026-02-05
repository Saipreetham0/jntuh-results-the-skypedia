"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

const faqs: FAQItem[] = [
    {
        question: "When are JNTUH results usually released?",
        answer:
            "JNTUH typically releases results 45-60 days after the completion of exams. However, this timeline can vary based on the specific semester and academic calendar. We recommend checking our Consolidated Results tool for the most up-to-date information.",
    },
    {
        question: "How do I calculate my CGPA from SGPA?",
        answer: (
            <>
                To calculate CGPA, you need the SGPA of all semesters. The formula is:
                <br />
                <strong>CGPA = (Σ (Ci × Si)) / (Σ Ci)</strong>
                <br />
                Where <em>Ci</em> is credits for the ith semester and <em>Si</em> is SGPA for the ith semester. You can use our{" "}
                <Link href="/cgpa-calculator" className="text-blue-600 hover:underline">
                    CGPA Calculator
                </Link>{" "}
                for instant calculation.
            </>
        ),
    },
    {
        question: "What is the pass percentage for JNTUH B.Tech?",
        answer:
            "For R18/R22 regulations, a student needs to secure a minimum of 35% marks in the internal exams and 35% in the external exams, with an aggregate of 40% to pass a subject.",
    },
    {
        question: "How can I check my complete backlog history?",
        answer:
            "You can view your complete history of backlogs, including cleared and active ones, by using our 'Check Backlogs' tool. Simply enter your Hall Ticket Number to get a detailed report.",
    },
    {
        question: "Is this website officially affiliated with JNTUH?",
        answer:
            "No, this is a student resource platform designed to simplify access to results and academic tools. For official notifications and certificate verification, please visit the official JNTUH website.",
    },
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 md:py-16 px-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
                        <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Common queries about JNTUH results, grading, and exams.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl transition-all duration-300 ${openIndex === index
                                ? "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10 shadow-sm"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-100 dark:hover:border-blue-900"
                                }`}
                        >
                            <button
                                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-blue-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
