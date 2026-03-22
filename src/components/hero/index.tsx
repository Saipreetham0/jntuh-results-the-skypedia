"use client";

import React from "react";
import Link from "next/link";
import { Search, TrendingUp, Award, Users, Zap, FileText, Calculator, AlertCircle } from "lucide-react";

const quickLinks = [
  {
    label: "Consolidated Results",
    href: "/consolidated-results",
    icon: FileText,
    color: "text-[#1C61E7]",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    label: "CGPA Calculator",
    href: "/cgpa-calculator",
    icon: Calculator,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    label: "Check Backlogs",
    href: "/check-backlogs",
    icon: AlertCircle,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    label: "Semester Results",
    href: "/semester-wise-results",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#1C61E7]/6 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1C61E7]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 md:pt-20 md:pb-16 lg:pt-28 lg:pb-20">

        {/* Trust badge */}
        <div className="flex justify-center mb-7 md:mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C61E7]/8 border border-[#1C61E7]/15 text-[#1C61E7] dark:text-blue-400 text-sm font-semibold">
            <Award className="w-4 h-4" />
            Trusted by 100,000+ JNTUH students
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8 md:mb-10 animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.08] tracking-tight px-2">
            Your JNTUH Academic{" "}
            <span className="relative inline-block mt-1">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1C61E7] via-[#2d75f5] to-[#1C61E7]">
                Hub
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-[85%] left-0 h-[0.45em] w-full fill-[#1C61E7]/20"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium px-4">
            Instantly access results, calculate your CGPA, check backlogs, and
            explore academic tools — all in one place.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4 mb-12 md:mb-16 animate-fade-in">
          <Link
            href="/consolidated-results"
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 md:px-8 md:py-4 text-base md:text-[17px] font-bold text-white bg-gradient-to-r from-[#1C61E7] via-indigo-500 to-[#1C61E7] bg-[length:200%_auto] rounded-2xl md:hover:bg-right transition-all duration-500 shadow-[0_0_30px_-5px_rgba(28,97,231,0.5)] md:hover:shadow-[0_0_40px_0px_rgba(28,97,231,0.7)] md:hover:-translate-y-1 active:scale-95 border border-white/20 min-h-[52px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Search className="relative z-10 w-5 h-5" />
            <span className="relative z-10">Check My Results</span>
            <svg className="relative z-10 w-4 h-4 md:group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            href="/cgpa-calculator"
            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 md:px-8 md:py-4 text-base md:text-[17px] font-bold text-[#1C61E7] dark:text-blue-400 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:border-[#1C61E7]/30 dark:hover:border-blue-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 md:hover:-translate-y-1 active:scale-95 min-h-[52px]"
          >
            <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Calculate CGPA
            </span>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-16 max-w-2xl mx-auto">
          {[
            { icon: Users, label: "Active Students", value: "100K+" },
            { icon: Search, label: "Searches Done", value: "500K+" },
            { icon: Zap, label: "Avg. Response", value: "<2s" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 md:p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 mb-2 text-[#1C61E7]" />
              <div className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white font-display tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick access links */}
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Quick Access
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 md:hover:border-[#1C61E7]/25 md:hover:shadow-md transition-all duration-200 md:hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.bg} ${link.color} group-hover:scale-110 transition-transform duration-200`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center leading-snug">
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
