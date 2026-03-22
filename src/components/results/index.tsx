"use client";

import React, { useState, useEffect } from 'react';
import Card from '../card';
import RecentlyVisited, { addToHistory } from './RecentlyVisited';
import {
  Search, BookOpen, Calculator, FileText, BarChart2,
  CheckCircle, AlertCircle, FileQuestion, Percent,
  RefreshCw, Calendar, Clock, X, LayoutGrid,
} from 'lucide-react';
import { ResponsiveAd } from '../adsense';
import AD_SLOTS from '@/config/adSlots';

interface CardData {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
  category: 'results' | 'calculators' | 'academic';
}

const cardsData: CardData[] = [
  {
    title: "Consolidated Results",
    content: "View your complete academic transcript — all semesters, all subjects, in one place.",
    url: "consolidated-results",
    icon: <FileText className="w-7 h-7 text-[#1C61E7]" />,
    category: 'results',
  },
  {
    title: "Semester Results",
    content: "Look up results for any specific semester quickly and accurately.",
    url: "semester-wise-results",
    icon: <BookOpen className="w-7 h-7 text-emerald-600" />,
    category: 'results',
  },
  {
    title: "CGPA Calculator",
    content: "Compute your cumulative GPA with R22, R20, and R18 regulation support.",
    url: "cgpa-calculator",
    icon: <Calculator className="w-7 h-7 text-[#1C61E7]" />,
    category: 'calculators',
  },
  {
    title: "CGPA to Percentage",
    content: "Convert your CGPA to percentage using the official JNTUH formula.",
    url: "cgpa-percentage-converter",
    icon: <RefreshCw className="w-7 h-7 text-emerald-600" />,
    category: 'calculators',
  },
  {
    title: "Percentage to CGPA",
    content: "Reverse-convert your percentage score to an equivalent CGPA.",
    url: "percentage-to-cgpa-calculator",
    icon: <Percent className="w-7 h-7 text-[#1C61E7]" />,
    category: 'calculators',
  },
  {
    title: "Credit Eligibility Check",
    content: "Instantly verify whether you meet the credit requirements for promotions.",
    url: "credit-eligibility-check",
    icon: <CheckCircle className="w-7 h-7 text-emerald-600" />,
    category: 'results',
  },
  {
    title: "Compare Performance",
    content: "Benchmark your CGPA and marks against classmates and batch averages.",
    url: "compare-performance",
    icon: <BarChart2 className="w-7 h-7 text-[#1C61E7]" />,
    category: 'results',
  },
  {
    title: "Check Backlogs",
    content: "Get a full report of active and cleared backlogs across every semester.",
    url: "check-backlogs",
    icon: <AlertCircle className="w-7 h-7 text-red-500" />,
    category: 'results',
  },
  {
    title: "Syllabus",
    content: "Browse course syllabi by regulation and semester to plan your studies.",
    url: "/syllabus",
    icon: <BookOpen className="w-7 h-7 text-emerald-600" />,
    category: 'academic',
  },
  {
    title: "Previous Question Papers",
    content: "Download previous years' exam papers to sharpen your exam preparation.",
    url: "/previous-question-papers",
    icon: <FileQuestion className="w-7 h-7 text-[#1C61E7]" />,
    category: 'academic',
  },
  {
    title: "Academic Calendar",
    content: "Track exam dates, semester schedules, and official JNTUH holidays.",
    url: "/calendar",
    icon: <Calendar className="w-7 h-7 text-emerald-600" />,
    category: 'academic',
  },
  {
    title: "Marks to Percentage",
    content: "Convert marks obtained to a precise percentage in seconds.",
    url: "/marks-percentage-calculator",
    icon: <Calculator className="w-7 h-7 text-emerald-600" />,
    category: 'calculators',
  },
  {
    title: "SGPA to CGPA",
    content: "Aggregate your semester GPAs into an accurate cumulative GPA.",
    url: "/sgpa-to-cgpa-calculator",
    icon: <RefreshCw className="w-7 h-7 text-[#1C61E7]" />,
    category: 'calculators',
  },
];

const categories = [
  { id: 'all', name: 'All', icon: LayoutGrid },
  { id: 'results', name: 'Results' },
  { id: 'calculators', name: 'Calculators' },
  { id: 'academic', name: 'Academic' },
] as const;

const ResultsBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cardsData);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    let results = cardsData;
    if (activeCategory !== "all") {
      results = results.filter(card => card.category === activeCategory);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      results = results.filter(
        card =>
          card.title.toLowerCase().includes(q) ||
          card.content.toLowerCase().includes(q)
      );
    }
    setFilteredCards(results);
  }, [searchTerm, activeCategory]);

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-gray-950">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 dark:bg-emerald-950/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* ── Section Header ───────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1C61E7] dark:text-blue-400 mb-3">
              Student Resources
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Every tool you need,<br className="hidden sm:block" /> in one place.
            </h2>
          </div>
          <p className="max-w-sm text-base text-gray-500 dark:text-gray-400 leading-relaxed md:text-right">
            14 purpose-built tools covering results, GPA calculations, and academic resources for all JNTUH regulations.
          </p>
        </div>

        {/* ── Recently Visited ─────────────────────────────────────── */}
        <RecentlyVisited />

        {/* ── Search + Filter ──────────────────────────────────────── */}
        <div className="mb-10 md:mb-12 max-w-4xl space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools — e.g. CGPA, backlogs, syllabus…"
              className="w-full pl-14 pr-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/30 focus:border-[#1C61E7]/50 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                {'icon' in cat && cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                {cat.name}
              </button>
            ))}

            {/* Count badge */}
            {filteredCards.length > 0 && (
              <span className="ml-auto flex items-center text-sm text-gray-400 dark:text-gray-500 font-medium">
                <span className="font-bold text-gray-700 dark:text-gray-300">{filteredCards.length}</span>
                &nbsp;tools
              </span>
            )}
          </div>
        </div>

        {/* ── Cards Grid ───────────────────────────────────────────── */}
        {filteredCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filteredCards.map((card, index) => (
              <React.Fragment key={card.url}>
                <div
                  style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
                  className="animate-fade-in"
                  onClick={() => addToHistory(card.title, card.url)}
                >
                  <Card {...card} />
                </div>

                {/* Mid-grid ad after 6th card */}
                {(index + 1) === 6 && (
                  <div className="col-span-full">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden flex items-center justify-center min-h-[100px]">
                      <ResponsiveAd adSlot={AD_SLOTS.RESULTS.INLINE_1} format="auto" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── Empty State ──────────────────────────────────────────── */}
        {filteredCards.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-5">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              No tools found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto text-sm leading-relaxed">
              No match for{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">&ldquo;{searchTerm}&rdquo;</span>.
              Try a different keyword or clear the filters.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsBox;
