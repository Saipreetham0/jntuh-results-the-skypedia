"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { homepageFaqs as faqs } from "./faqs";


const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <div className="mb-12 md:mb-14 motion-safe:animate-reveal">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400 mb-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Common questions
          </h2>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Everything students ask about JNTUH results, grading, and our tools.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-b border-gray-100 dark:border-gray-800">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-heading-${index}`;
            const answerId = `faq-region-${index}`;
            return (
              <div key={index} className="motion-safe:animate-reveal">
                <button
                  id={questionId}
                  type="button"
                  className="w-full text-left py-5 flex items-start justify-between gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className={`font-display text-[15px] md:text-base font-semibold leading-snug transition-colors duration-150 ${isOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150 ${isOpen ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-blue-600/10 group-hover:text-blue-600"}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" aria-hidden="true" /> : <Plus className="w-3.5 h-3.5" aria-hidden="true" />}
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className="pb-5"
                >
                  <div className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                    {faq.link && (
                      <>
                        {" "}
                        <Link href={faq.link.href} className="text-blue-600 dark:text-blue-400 font-medium hover:underline underline-offset-2">
                          {faq.link.label} →
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
