"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "When are JNTUH results usually released?",
    answer: (
      <>
        JNTUH typically releases results 45–60 days after the completion of exams. This timeline varies by semester and academic calendar. Check our{" "}
        <Link href="/consolidated-results" className="text-[#1C61E7] font-medium hover:underline underline-offset-2">Consolidated Results</Link>{" "}
        tool for the latest updates.
      </>
    ),
  },
  {
    question: "How do I calculate my CGPA from SGPA?",
    answer: (
      <>
        The formula is: <strong className="text-gray-900 dark:text-white">CGPA = Σ(Cᵢ × Sᵢ) / ΣCᵢ</strong>, where <em>Cᵢ</em> is credits and <em>Sᵢ</em> is SGPA per semester. Use our{" "}
        <Link href="/cgpa-calculator" className="text-[#1C61E7] font-medium hover:underline underline-offset-2">CGPA Calculator</Link>{" "}
        for an instant, regulation-aware result.
      </>
    ),
  },
  {
    question: "What is the pass percentage for JNTUH B.Tech?",
    answer:
      "For R18 and R22 regulations, students must secure at least 35% in internal exams and 35% in external exams, with a combined aggregate of 40% to pass a subject.",
  },
  {
    question: "How can I convert my CGPA to percentage?",
    answer: (
      <>
        For JNTUH, use <strong className="text-gray-900 dark:text-white">Percentage = (CGPA − 0.5) × 10</strong>. Try our{" "}
        <Link href="/cgpa-percentage-converter" className="text-[#1C61E7] font-medium hover:underline underline-offset-2">CGPA to Percentage Converter</Link>{" "}
        for instant, accurate conversion.
      </>
    ),
  },
  {
    question: "How can I check my complete backlog history?",
    answer: (
      <>
        Use our{" "}
        <Link href="/check-backlogs" className="text-[#1C61E7] font-medium hover:underline underline-offset-2">Check Backlogs</Link>{" "}
        tool — enter your Hall Ticket Number to get a full report of active and cleared backlogs across all semesters.
      </>
    ),
  },
  {
    question: "Is this website officially affiliated with JNTUH?",
    answer:
      "No. This is an independent student resource platform. For official notifications, certificates, and verification, visit the official JNTUH website.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <div className="mb-12 md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1C61E7] dark:text-blue-400 mb-3">
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
            return (
              <div key={index}>
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-6 focus-visible:outline-none group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-[15px] md:text-base font-semibold leading-snug transition-colors duration-150 ${isOpen ? "text-[#1C61E7] dark:text-blue-400" : "text-gray-900 dark:text-white group-hover:text-[#1C61E7] dark:group-hover:text-blue-400"}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150 ${isOpen ? "bg-[#1C61E7] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-[#1C61E7]/10 group-hover:text-[#1C61E7]"}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 pb-5 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
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
