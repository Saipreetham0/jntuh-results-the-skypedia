"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import Script from "next/script";

interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

interface FAQSectionDynamicProps {
    faqs: FAQItem[];
    title?: string;
    description?: string;
}

const FAQSectionDynamic: React.FC<FAQSectionDynamicProps> = ({
    faqs,
    title = "Frequently Asked Questions",
    description = "Common queries about JNTUH results, grading, and exams."
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Prepare JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof faq.answer === 'string' ? faq.answer : "Please refer to the detailed answer on our website."
            }
        }))
    };

    return (
        <section className="py-12 md:py-20 px-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-4">
                        <HelpCircle className="w-8 h-8 text-[#1C61E7] dark:text-blue-400" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border-2 rounded-2xl transition-all duration-300 ${openIndex === index
                                ? "border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5"
                                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-100 dark:hover:border-blue-900"
                                }`}
                        >
                            <button
                                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-bold text-gray-900 dark:text-white text-lg pr-4">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-6 h-6 text-[#1C61E7] flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSectionDynamic;
