"use client";

import React, { useState, useEffect } from 'react';
import Card from '../card';
import RecentlyVisited, { addToHistory } from './RecentlyVisited';
import { Search, BookOpen, Calculator, FileText, BarChart2, CheckCircle, Users, AlertCircle, FileQuestion, Percent, RefreshCw, Calendar, Clock, Sparkles, X } from 'lucide-react';
import { ResponsiveAd } from '../adsense';
import AD_SLOTS from '@/config/adSlots';

interface CardData {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

const cardsData: CardData[] = [
  {
    title: "Consolidated Results",
    content: "Access All Your Semester Results in One Place",
    url: "consolidated-results",
    icon: <FileText className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "View Semester-wise Results",
    content: "Access Results for Specific Semesters",
    url: "semester-wise-results",
    icon: <BookOpen className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Calculate Your CGPA",
    content: "Calculate Your Cumulative GPA and Detailed Result Performance",
    url: "cgpa-calculator",
    icon: <Calculator className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "CGPA to Percentage Converter",
    content: "Convert CGPA to percentage and calculate GPA easily.",
    url: "cgpa-percentage-converter",
    icon: <RefreshCw className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Percentage to CGPA Calculator",
    content: "Convert percentage to CGPA quickly and accurately.",
    url: "percentage-to-cgpa-calculator",
    icon: <Percent className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Credit Eligibility Check",
    content: "Verify Your Eligibility for Course Credits Here",
    url: "credit-eligibility-check",
    icon: <CheckCircle className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Compare Performance",
    content: "Compare Your Overall Performance with Classmates",
    url: "compare-performance",
    icon: <BarChart2 className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Check Backlogs",
    content: "View Your Complete List of Pending Courses",
    url: "check-backlogs",
    icon: <AlertCircle className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Syllabus",
    content: "Access the syllabus for each course or semester to plan your studies.",
    url: "/syllabus",
    icon: <BookOpen className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Previous Question Papers",
    content: "Download or view previous years' question papers to help with exam preparation.",
    url: "/previous-question-papers",
    icon: <FileQuestion className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Academic Calendar",
    content: "Stay updated with JNTUH exam dates, semester starting, and holiday lists.",
    url: "/academic-calendar",
    icon: <Calendar className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Exam Timetables",
    content: "View the latest schedules for regular and supplementary examinations.",
    url: "/exam-timetable",
    icon: <Clock className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Marks Percentage Calculator",
    content: "Calculate your percentage based on marks obtained.",
    url: "/marks-percentage-calculator",
    icon: <Calculator className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "SGPA to CGPA Calculator",
    content: "Convert your SGPA to CGPA easily and accurately.",
    url: "/sgpa-to-cgpa-calculator",
    icon: <RefreshCw className="w-8 h-8 text-[#1C61E7]" />,
  },
];

const ResultsBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cardsData);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Categories based on card types
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'results', name: 'Results' },
    { id: 'calculators', name: 'Calculators' },
    { id: 'academic', name: 'Academic' }
  ];

  // Robust filtering logic
  useEffect(() => {
    let results = cardsData;

    // First filter by category
    if (activeCategory !== "all") {
      results = results.filter(card => {
        const title = card.title.toLowerCase();
        if (activeCategory === "results") {
          return title.includes("result") ||
            title.includes("backlog") ||
            title.includes("credit");
        }
        if (activeCategory === "calculators") {
          return title.includes("calculator") ||
            title.includes("convert") ||
            title.includes("cgpa") ||
            title.includes("percentage") ||
            title.includes("sgpa");
        }
        if (activeCategory === "academic") {
          return title.includes("syllabus") ||
            title.includes("question") ||
            title.includes("calendar") ||
            title.includes("timetable");
        }
        return true;
      });
    }

    // Then filter by search term
    if (searchTerm) {
      results = results.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCards(results);
  }, [searchTerm, activeCategory]);

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-slate-50 dark:bg-[#020617]">
      {/* Dynamic Background Mesh Gradients - Premium Look */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-lighten" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header section with enhanced styling - Premium Typography */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-1.5 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300">
            <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Power Up Your Academics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resources</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to excel in your academic journey, meticulously crafted for JNTUH students.
          </p>
        </div>

        {/* Enhanced search and filters - Glassmorphism */}
        <div className="mb-16 max-w-4xl mx-auto space-y-8 animate-slide-up">
          {/* Recently Visited Section - Integrated smoothly */}
          <RecentlyVisited />

          {/* Search bar with glassmorphism */}
          <div className="relative group z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl">
              <Search className="absolute left-6 text-slate-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search for calculators, results, syllabus..."
                className="w-full pl-16 pr-6 py-5 bg-transparent border-none focus:ring-0 text-lg text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-6 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced category filter tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                  ${activeCategory === category.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results visualization */}
        {filteredCards.length > 0 && (
          <div className="mb-8 flex justify-between items-center px-2">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Showing <span className="text-slate-900 dark:text-white font-bold">{filteredCards.length}</span> tools
            </div>
            {/* Divider line could go here if needed */}
          </div>
        )}

        {/* Cards grid with premium spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
          {filteredCards.map((card, index) => (
            <React.Fragment key={index}>
              <div
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
                onClick={() => addToHistory(card.title, card.url)}
              >
                <Card {...card} />
              </div>

              {/* Intelligent Ad Placement - Less intrusive */}
              {(index + 1) === 6 && (
                <div className="col-span-full my-8">
                  <div className="bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-800 p-1 shadow-inner">
                    <div className="w-full flex justify-center items-center min-h-[100px] rounded-2xl bg-white dark:bg-slate-950/50 overflow-hidden">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest absolute top-2 right-4">Ad</p>
                      <ResponsiveAd adSlot={AD_SLOTS.RESULTS.INLINE_1} format="horizontal" />
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Premium Empty State */}
        {filteredCards.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 mb-6 shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Search className="w-10 h-10 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              No results found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              We couldn't find anything matching <span className="font-semibold text-slate-900 dark:text-white">"{searchTerm}"</span>.
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsBox;
