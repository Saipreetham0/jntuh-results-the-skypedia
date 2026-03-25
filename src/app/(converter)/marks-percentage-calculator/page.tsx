"use client";

import React, { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  Trophy,
  RefreshCw,
  Sparkles,
  Star,
  Share2,
  BookOpen,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import confetti from "canvas-confetti";
import { RWebShare } from "react-web-share";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import FAQSectionDynamic from "@/components/seo/FAQSectionDynamic";
import AD_SLOTS from "@/config/adSlots";

// Types
interface CalculationResult {
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
}

// Animated Counter
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const totalFrames = Math.round((duration * 1000) / 16);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * ease;

      if (frame === totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, duration]);

  return <>{count.toFixed(2)}</>;
};

// SEO Structured Data
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Percentage from Marks",
  description: "Simple guide to calculating percentage from obtained marks and total marks.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter Total Marks",
      text: "Input the maximum marks for your exam or test.",
    },
    {
      "@type": "HowToStep",
      name: "Enter Obtained Marks",
      text: "Input the marks you scored.",
    },
    {
      "@type": "HowToStep",
      name: "Calculate",
      text: "Click calculate to get your percentage.",
    },
  ],
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marks to Percentage Calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const marksFaqs = [
  {
    question: "How is percentage calculated from marks?",
    answer:
      "Percentage = (Obtained Marks / Total Marks) × 100. For example, if you scored 425 out of 500, your percentage is (425/500) × 100 = 85%.",
  },
  {
    question: "What is a good percentage in exams?",
    answer:
      "Generally, 85%+ is considered excellent, 70-85% is good, 60-70% is above average, and 50-60% is average. Requirements vary by institution.",
  },
  {
    question: "Can I convert my percentage to CGPA?",
    answer:
      "Yes! Use our Percentage to CGPA calculator to convert your percentage to the corresponding CGPA on your grading scale.",
  },
];

export default function MarksPercentageCalculator() {
  // State
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [obtainedMarks, setObtainedMarks] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("marks-percentage-data");
    if (savedData) {
      try {
        const { totalMarks: savedTotal, obtainedMarks: savedObtained } = JSON.parse(savedData);
        if (savedTotal && savedObtained) {
          setTotalMarks(savedTotal);
          setObtainedMarks(savedObtained);
        }
      } catch {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (totalMarks && obtainedMarks) {
      localStorage.setItem(
        "marks-percentage-data",
        JSON.stringify({ totalMarks, obtainedMarks })
      );
    }
  }, [totalMarks, obtainedMarks]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !loading && totalMarks && obtainedMarks) {
        handleCalculate();
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [totalMarks, obtainedMarks, loading]);

  // Handlers
  const getPerformanceDetails = (percentage: number) => {
    if (percentage >= 90) return { label: "Outstanding", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (percentage >= 80) return { label: "Excellent", color: "text-blue-500", bg: "bg-blue-500/10" };
    if (percentage >= 70) return { label: "Very Good", color: "text-indigo-500", bg: "bg-indigo-500/10" };
    if (percentage >= 60) return { label: "Good", color: "text-green-500", bg: "bg-green-500/10" };
    if (percentage >= 50) return { label: "Average", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { label: "Needs Improvement", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const handleCalculate = () => {
    const totalMarksNum = parseFloat(totalMarks);
    const obtainedMarksNum = parseFloat(obtainedMarks);

    if (!totalMarks || !obtainedMarks) {
      setWarning("Please enter both total marks and obtained marks");
      return;
    }

    if (
      isNaN(totalMarksNum) ||
      isNaN(obtainedMarksNum) ||
      totalMarksNum <= 0 ||
      obtainedMarksNum < 0
    ) {
      setWarning("Please enter valid marks");
      return;
    }

    if (obtainedMarksNum > totalMarksNum) {
      setWarning("Obtained marks cannot be greater than total marks");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const percentage = (obtainedMarksNum / totalMarksNum) * 100;
      let grade = "F";
      let remarks = "Needs Improvement";

      if (percentage >= 90) { grade = "O"; remarks = "Outstanding"; }
      else if (percentage >= 80) { grade = "A+"; remarks = "Excellent"; }
      else if (percentage >= 70) { grade = "A"; remarks = "Very Good"; }
      else if (percentage >= 60) { grade = "B+"; remarks = "Good"; }
      else if (percentage >= 50) { grade = "B"; remarks = "Above Average"; }
      else if (percentage >= 40) { grade = "C"; remarks = "Average"; }
      else { grade = "P"; remarks = "Pass"; }

      setResult({
        totalMarks: totalMarksNum,
        obtainedMarks: obtainedMarksNum,
        percentage,
        grade,
        remarks,
      });

      setLoading(false);

      // Trigger Confetti if good score
      if (percentage >= 70) {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      }

      // Scroll to result on mobile
      if (window.innerWidth < 768) {
        document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  const handleReset = () => {
    setTotalMarks("");
    setObtainedMarks("");
    setResult(null);
    setWarning("");
    localStorage.removeItem("marks-percentage-data");
  };

  const loadExample = () => {
    setTotalMarks("500");
    setObtainedMarks("425");
  };

  return (
    <TooltipProvider>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* Page Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 uppercase tracking-[0.1em] mb-6 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> All Calculators
            </Link>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">
              Marks Calculator
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Marks to Percentage Calculator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base mb-5">
              Calculate your percentage from obtained and total marks instantly.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["Free", "Instant Results", "Any Exam", "Grade Analysis Included"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[11px] font-bold text-gray-600 dark:text-gray-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

            {/* Left: Calculator Card */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">

                {/* Section Label + Try Example */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#1C61E7]" />
                    Enter Your Marks
                  </p>
                  <button
                    onClick={loadExample}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C61E7] hover:text-[#1a56d1] transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    Try Example
                  </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="obtainedMarks"
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-gray-500"
                    >
                      Marks Obtained
                    </label>
                    <input
                      id="obtainedMarks"
                      type="number"
                      placeholder="e.g., 425"
                      inputMode="numeric"
                      value={obtainedMarks}
                      onChange={(e) => {
                        setObtainedMarks(e.target.value);
                        setWarning("");
                      }}
                      className="w-full px-4 py-3.5 min-h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="totalMarks"
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-gray-500"
                    >
                      Total Marks
                    </label>
                    <input
                      id="totalMarks"
                      type="number"
                      placeholder="e.g., 500"
                      inputMode="numeric"
                      value={totalMarks}
                      onChange={(e) => {
                        setTotalMarks(e.target.value);
                        setWarning("");
                      }}
                      className="w-full px-4 py-3.5 min-h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                {totalMarks &&
                  obtainedMarks &&
                  !warning &&
                  parseFloat(obtainedMarks) <= parseFloat(totalMarks) && (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <TrendingUp className="w-4 h-4 text-[#1C61E7] shrink-0" />
                      <p className="text-sm font-semibold text-[#1C61E7]">
                        Preview:{" "}
                        {((parseFloat(obtainedMarks) / parseFloat(totalMarks)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}

                {/* Error */}
                {warning && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400">
                    <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
                    {warning}
                  </div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-[#1C61E7] hover:bg-[#1a56d1] active:scale-[0.99] text-white font-display font-bold py-4 rounded-xl text-sm shadow-lg shadow-[#1C61E7]/20 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Calculating...
                    </span>
                  ) : (
                    "Calculate My Percentage"
                  )}
                </button>

                {/* Keyboard hint */}
                {totalMarks && obtainedMarks && !loading && (
                  <p className="text-center text-xs text-gray-400">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-[11px]">
                      Enter ↵
                    </kbd>{" "}
                    to calculate
                  </p>
                )}
              </div>

              {/* Mid Ad */}
              <div className="mt-6">
                <ResponsiveAd
                  adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE}
                  format="auto"
                  className="rounded-2xl overflow-hidden"
                />
              </div>
            </div>

            {/* Right: Result Card */}
            <div className="lg:col-span-2 lg:sticky lg:top-6" id="result-section">
              {result ? (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  {/* Blue Header Band */}
                  <div className="bg-[#1C61E7] px-6 py-8 text-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-200 mb-3">
                      Your Percentage
                    </p>
                    <p className="font-display text-7xl font-extrabold text-white tracking-tight leading-none mb-1">
                      <AnimatedCounter value={result.percentage} />
                      <span className="text-3xl font-bold">%</span>
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-1 mt-3 mb-4">
                      {[...Array(5)].map((_, i) => {
                        const filled = (result.percentage / 100) * 5 > i;
                        return (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              filled
                                ? "fill-yellow-300 text-yellow-300"
                                : "text-white/30"
                            } transition-all duration-300`}
                          />
                        );
                      })}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-[220px] mx-auto">
                      <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-yellow-300 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(result.percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-blue-200/60 mt-1">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <p className="text-blue-100/70 text-xs mt-3 font-medium">
                      {result.obtainedMarks} out of {result.totalMarks} marks
                    </p>
                  </div>

                  {/* White Body */}
                  <div className="p-6 space-y-4">
                    {/* Grade Badge */}
                    {(() => {
                      const perf = getPerformanceDetails(result.percentage);
                      return (
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${perf.bg}`} />
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">
                                Grade: {result.grade}
                              </p>
                              <p className={`text-xs font-semibold ${perf.color}`}>
                                {result.remarks}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-display font-extrabold text-gray-900 dark:text-white">
                              {result.percentage.toFixed(2)}%
                            </p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Score</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-500 mb-1">
                          Obtained
                        </p>
                        <p className="font-display text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                          {result.obtainedMarks}
                        </p>
                      </div>
                      <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-500 mb-1">
                          Total
                        </p>
                        <p className="font-display text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                          {result.totalMarks}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={handleReset}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                      </button>
                      <RWebShare
                        data={{
                          text: `I scored ${result.percentage.toFixed(2)}% (${result.obtainedMarks}/${result.totalMarks})!`,
                          url: "https://jntuhresults.theskypedia.com/marks-percentage-calculator",
                          title: "Marks to Percentage Calculator",
                        }}
                        onClick={() => {}}
                      >
                        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C61E7] hover:bg-[#1a56d1] text-sm font-semibold text-white transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </RWebShare>
                    </div>
                  </div>
                </div>
              ) : (
                /* Placeholder */
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 min-h-[360px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                    <Calculator className="w-8 h-8 text-[#1C61E7]" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Ready to Calculate?
                  </h3>
                  <p className="text-sm text-gray-400 max-w-[220px] leading-relaxed">
                    Enter your marks on the left and your percentage will appear here instantly.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* In-Content Ad after calculator grid */}
          <div className="mt-8">
            <InContentAd adSlot={AD_SLOTS.CALCULATOR.IN_CONTENT} variant="in-article" />
          </div>

          {/* Below Sections */}
          <div className="mt-12 space-y-12">

            {/* 1. How It Works */}
            <section>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-xl bg-[#1C61E7] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                    How It Works
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      num: "1",
                      title: "Enter Total Marks",
                      desc: "Input the maximum marks for your exam or test.",
                      accent: "bg-blue-600",
                    },
                    {
                      num: "2",
                      title: "Enter Obtained Marks",
                      desc: "Input the marks you scored. A live preview will appear automatically.",
                      accent: "bg-indigo-600",
                    },
                    {
                      num: "3",
                      title: "Get Your Percentage",
                      desc: "View your percentage with grade, remarks, and performance analysis.",
                      accent: "bg-violet-600",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div
                        className={`shrink-0 w-10 h-10 rounded-xl ${step.accent} flex items-center justify-center`}
                      >
                        <span className="font-display text-base font-extrabold text-white">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Grade Reference Table */}
            <section>
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Grade Reference
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Percentage ranges and their corresponding grades
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {[
                  { range: "90 – 100%", grade: "O", label: "Outstanding", dot: "bg-emerald-400" },
                  { range: "80 – 90%", grade: "A+", label: "Excellent", dot: "bg-blue-400" },
                  { range: "70 – 80%", grade: "A", label: "Very Good", dot: "bg-indigo-400" },
                  { range: "60 – 70%", grade: "B+", label: "Good", dot: "bg-green-400" },
                  { range: "50 – 60%", grade: "B", label: "Above Average", dot: "bg-yellow-400" },
                  { range: "40 – 50%", grade: "C", label: "Average", dot: "bg-orange-400" },
                  { range: "Below 40%", grade: "P / F", label: "Needs Improvement", dot: "bg-red-400" },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                      idx !== 0 ? "border-t border-gray-100 dark:border-gray-800" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {row.range}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 dark:text-gray-500">{row.label}</span>
                      <span className="text-sm font-black text-gray-900 dark:text-white w-10 text-right">
                        {row.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Between-sections Ad */}
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BETWEEN_SECTIONS} format="auto" />

            {/* 3. Pro Tip Callout */}
            <section>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-amber-900 dark:text-amber-200 mb-1.5">
                      Pro Tip for Students
                    </h3>
                    <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                      Keep track of your marks regularly! The formula is simple:{" "}
                      <strong>(Obtained Marks ÷ Total Marks) × 100</strong>. Knowing your
                      percentage helps you understand where you stand and set realistic academic
                      goals. Use our other calculators to also convert your percentage to CGPA.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Related Calculators */}
            <section>
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Related Calculators
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore more academic tools
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "CGPA to Percentage",
                    desc: "Convert CGPA to percentage scale",
                    link: "/cgpa-percentage-converter",
                    Icon: Calculator,
                    iconBg: "bg-blue-100 dark:bg-blue-900/20",
                    iconColor: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    title: "Percentage to CGPA",
                    desc: "Convert percentage to CGPA",
                    link: "/percentage-to-cgpa-calculator",
                    Icon: TrendingUp,
                    iconBg: "bg-indigo-100 dark:bg-indigo-900/20",
                    iconColor: "text-indigo-600 dark:text-indigo-400",
                  },
                  {
                    title: "SGPA to CGPA",
                    desc: "Calculate cumulative GPA",
                    link: "/sgpa-to-cgpa-calculator",
                    Icon: Trophy,
                    iconBg: "bg-violet-100 dark:bg-violet-900/20",
                    iconColor: "text-violet-600 dark:text-violet-400",
                  },
                ].map((tool) => (
                  <Link
                    key={tool.link}
                    href={tool.link}
                    className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:border-[#1C61E7]/40 hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center mb-3`}
                    >
                      <tool.Icon className={`w-5 h-5 ${tool.iconColor}`} />
                    </div>
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#1C61E7] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* 5. FAQ */}
            <FAQSectionDynamic
              faqs={marksFaqs}
              title="Frequently Asked Questions"
              description="Common questions about marks and percentage calculation."
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
