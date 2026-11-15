"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  TrendingUp,
  Award,
  FileText,
  Calculator,
  AlertCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { trackGAEvent } from "@/components/analytics/GoogleAnalytics";

const quickLinks = [
  {
    label: "Consolidated Results",
    href: "/consolidated-results",
    icon: FileText,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    label: "Syllabus (518 PDFs)",
    href: "/syllabus",
    icon: BookOpen,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    label: "CGPA Calculator",
    href: "/cgpa-calculator",
    icon: Calculator,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    label: "Check Backlogs",
    href: "/check-backlogs",
    icon: AlertCircle,
    color: "text-orange-500 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
  },
  {
    label: "Semester Results",
    href: "/semester-wise-results",
    icon: TrendingUp,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40",
  },
];

export const Hero: React.FC = () => {
  const [rollNumber, setRollNumber] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = rollNumber.trim().toUpperCase();
    if (!trimmed) {
      router.push("/consolidated-results");
      return;
    }
    trackGAEvent("search", { search_term: trimmed, search_type: "hero_hall_ticket" });
    router.push(`/consolidated-results?rollNumber=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16">
        {/* Trust badge */}
        <div className="flex justify-center mb-6 md:mb-7 motion-safe:animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-sm font-semibold">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Trusted by 100,000+ JNTUH students
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8 md:mb-10 motion-safe:animate-fade-up motion-safe:delay-75">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.08] tracking-tight px-2">
            Your JNTUH Academic{" "}
            <span className="relative inline-block mt-1">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
                Hub
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-[85%] left-0 h-[0.45em] w-full fill-blue-600/20"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium px-4">
            Instantly access results, calculate your CGPA, check backlogs, and
            download official syllabus PDFs — without server crashes.
          </p>
        </div>

        {/* 1-Click Instant Hall Ticket Search Form */}
        <div className="max-w-2xl mx-auto mb-12 px-4 motion-safe:animate-fade-up motion-safe:delay-150">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-xl shadow-blue-500/5 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all"
          >
            <div className="flex items-center gap-3 w-full px-3 py-1">
              <Search className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />
              <input
                id="hero-htno-input"
                type="text"
                placeholder="Enter Hall Ticket Number (e.g. 21J21A0501)"
                aria-label="Hall Ticket Number for instant results"
                maxLength={10}
                pattern="[A-Za-z0-9]{10}"
                title="Hall Ticket Number must be 10 letters/digits, e.g. 21J21A0501"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                className="w-full bg-transparent border-0 px-0 focus:ring-0 text-base font-bold text-gray-900 dark:text-white uppercase placeholder:text-gray-400 placeholder:normal-case placeholder:font-normal focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/20 whitespace-nowrap"
            >
              <span>Get Results</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Quick access links (5 primary tools including Syllabus) */}
        <div className="max-w-4xl mx-auto motion-safe:animate-fade-up motion-safe:delay-200">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
            Quick Access
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.bg} ${link.color} group-hover:scale-110 transition-transform duration-200`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 text-center leading-snug">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
