"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Award,
  RefreshCw,
  Sparkles,
  Share2,
  Lightbulb,
  Percent,
  ArrowLeft,
  ArrowUpRight,
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
  percentage: number;
  cgpa: number;
  grade: string;
  remarks: string;
  scale: string;
}

interface GradeScale {
  max: number;
  percentageDivisor: number;
  label: string;
}

const GradeScales: Record<string, GradeScale> = {
  "10.0": { max: 10.0, percentageDivisor: 9.5, label: "10.0 Scale (India/JNTUH)" },
  "5.0": { max: 5.0, percentageDivisor: 20, label: "5.0 Scale" },
  "4.0": { max: 4.0, percentageDivisor: 25, label: "4.0 Scale (US)" },
};

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

// SEO schemas
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert Percentage to CGPA",
  description: "Step-by-step guide to converting percentage to CGPA on different grading scales.",
  step: [
    {
      "@type": "HowToStep",
      name: "Select Grading Scale",
      text: "Choose the target grading scale (10.0, 5.0, or 4.0) for conversion.",
    },
    {
      "@type": "HowToStep",
      name: "Enter Percentage",
      text: "Input your aggregate percentage value.",
    },
    {
      "@type": "HowToStep",
      name: "Calculate",
      text: "Click calculate to get your CGPA result.",
    },
  ],
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Percentage to CGPA Calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const percentageFaqs = [
  {
    question: "How to convert percentage to CGPA?",
    answer:
      "For JNTUH (10.0 scale), divide percentage by 9.5. For 4.0 scale, divide by 25. For 5.0 scale, divide by 20. Formula: CGPA = Percentage ÷ Divisor.",
  },
  {
    question: "Is this conversion accurate?",
    answer:
      "The conversion is approximate. Different universities may use different formulas. Always verify with your institution's official conversion policy.",
  },
  {
    question: "Can I convert CGPA back to percentage?",
    answer:
      "Yes! Use our CGPA to Percentage converter tool for reverse calculation.",
  },
];

const steps = [
  {
    title: "Select Your Scale",
    desc: "Choose the target grading scale — 10.0 for JNTUH/India, 4.0 for US universities, or 5.0 for European systems.",
  },
  {
    title: "Enter Percentage",
    desc: "Input your aggregate percentage. You can also try the example button to see how the conversion works.",
  },
  {
    title: "Get Your CGPA",
    desc: "View your converted CGPA instantly along with your grade letter, remarks, and a performance breakdown.",
  },
];

const gradeReferenceRows = [
  { range: "90 – 100%", cgpa10: "9.47 – 10.0", grade: "O", remarks: "Outstanding", color: "text-emerald-600 dark:text-emerald-400" },
  { range: "80 – 89%",  cgpa10: "8.42 – 9.36", grade: "A+", remarks: "Excellent",   color: "text-blue-600 dark:text-blue-400" },
  { range: "70 – 79%",  cgpa10: "7.37 – 8.31", grade: "A",  remarks: "Very Good",   color: "text-indigo-600 dark:text-indigo-400" },
  { range: "60 – 69%",  cgpa10: "6.32 – 7.26", grade: "B+", remarks: "Good",        color: "text-violet-600 dark:text-violet-400" },
  { range: "50 – 59%",  cgpa10: "5.26 – 6.21", grade: "B",  remarks: "Above Average", color: "text-yellow-600 dark:text-yellow-400" },
  { range: "40 – 49%",  cgpa10: "4.21 – 5.15", grade: "C",  remarks: "Average",     color: "text-orange-600 dark:text-orange-400" },
  { range: "< 40%",     cgpa10: "< 4.21",       grade: "P",  remarks: "Pass/Fail",   color: "text-red-600 dark:text-red-400" },
];

const relatedCalculators = [
  {
    title: "CGPA to Percentage",
    desc: "Convert CGPA back to percentage",
    link: "/cgpa-percentage-converter",
    Icon: Percent,
  },
  {
    title: "Marks to Percentage",
    desc: "Calculate your marks percentage",
    link: "/marks-percentage-calculator",
    Icon: Calculator,
  },
  {
    title: "SGPA to CGPA",
    desc: "Calculate cumulative GPA from SGPA",
    link: "/sgpa-to-cgpa-calculator",
    Icon: Award,
  },
];

export default function PercentageToCGPACalculator() {
  // State
  const [scale, setScale] = useState<string>("10.0");
  const [percentage, setPercentage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("percentage-cgpa-data");
    if (savedData) {
      try {
        const { percentage: savedPercentage, scale: savedScale } = JSON.parse(savedData);
        if (savedPercentage) {
          setPercentage(savedPercentage);
          setScale(savedScale || "10.0");
        }
      } catch {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (percentage) {
      localStorage.setItem("percentage-cgpa-data", JSON.stringify({ percentage, scale }));
    }
  }, [percentage, scale]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !loading && percentage) {
        handleCalculate();
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [percentage, loading]);

  // Handlers
  const getPerformanceDetails = (pct: number) => {
    if (pct >= 90) return { label: "Outstanding",      color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800" };
    if (pct >= 80) return { label: "Excellent",        color: "text-blue-600 dark:text-blue-400",       bg: "bg-blue-50 dark:bg-blue-900/20",       border: "border-blue-200 dark:border-blue-800" };
    if (pct >= 70) return { label: "Very Good",        color: "text-indigo-600 dark:text-indigo-400",   bg: "bg-indigo-50 dark:bg-indigo-900/20",   border: "border-indigo-200 dark:border-indigo-800" };
    if (pct >= 60) return { label: "Good",             color: "text-violet-600 dark:text-violet-400",   bg: "bg-violet-50 dark:bg-violet-900/20",   border: "border-violet-200 dark:border-violet-800" };
    if (pct >= 50) return { label: "Average",          color: "text-yellow-600 dark:text-yellow-400",   bg: "bg-yellow-50 dark:bg-yellow-900/20",   border: "border-yellow-200 dark:border-yellow-800" };
    return           { label: "Needs Improvement",     color: "text-red-600 dark:text-red-400",         bg: "bg-red-50 dark:bg-red-900/20",         border: "border-red-200 dark:border-red-800" };
  };

  const handleCalculate = () => {
    const percentageNum = parseFloat(percentage);
    const currentScale = GradeScales[scale];

    if (!percentage) {
      setWarning("Please enter your percentage");
      return;
    }

    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
      setWarning("Please enter a valid percentage between 0 and 100");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const cgpa = +(percentageNum / currentScale.percentageDivisor).toFixed(2);
      const finalCGPA = Math.min(cgpa, currentScale.max);

      let grade = "F";
      let remarks = "Needs Improvement";

      if (percentageNum >= 90)      { grade = "O";  remarks = "Outstanding"; }
      else if (percentageNum >= 80) { grade = "A+"; remarks = "Excellent"; }
      else if (percentageNum >= 70) { grade = "A";  remarks = "Very Good"; }
      else if (percentageNum >= 60) { grade = "B+"; remarks = "Good"; }
      else if (percentageNum >= 50) { grade = "B";  remarks = "Above Average"; }
      else if (percentageNum >= 40) { grade = "C";  remarks = "Average"; }
      else                          { grade = "P";  remarks = "Pass"; }

      setResult({ percentage: percentageNum, cgpa: finalCGPA, grade, remarks, scale });
      setLoading(false);

      // Trigger confetti if good score
      if (percentageNum >= 70) {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function () {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      }

      // Scroll to result on mobile
      if (window.innerWidth < 768) {
        document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  const handleReset = () => {
    setPercentage("");
    setResult(null);
    setWarning("");
    localStorage.removeItem("percentage-cgpa-data");
  };

  const loadExample = () => {
    setScale("10.0");
    setPercentage("85");
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
              CGPA Calculator
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Percentage to CGPA Calculator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base mb-5">
              Convert your percentage to CGPA across any grading scale.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["Free", "Instant Results", "JNTUH R22 · R20 · R18", "All Scales Supported"].map(
                (b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[11px] font-bold text-gray-600 dark:text-gray-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    {b}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

            {/* LEFT — Calculator Card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">

                {/* Scale Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-gray-400 mb-3">
                    Grading Scale
                  </label>
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl gap-1">
                    {Object.entries(GradeScales).map(([key]) => (
                      <button
                        key={key}
                        onClick={() => { setScale(key); setResult(null); }}
                        className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-bold transition-all leading-tight ${
                          scale === key
                            ? "bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        {key}
                        <span className="block text-[10px] font-medium opacity-60 mt-0.5">Scale</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Percentage Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
                      Percentage
                    </label>
                    <button
                      onClick={loadExample}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C61E7] hover:text-[#1a56d1] transition-colors"
                    >
                      <Sparkles className="w-3 h-3" /> Try Example
                    </button>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <input
                        id="percentage"
                        type="number"
                        placeholder="e.g., 85"
                        step="0.01"
                        min="0"
                        max="100"
                        inputMode="decimal"
                        value={percentage}
                        onChange={(e) => { setPercentage(e.target.value); setWarning(""); }}
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Your aggregate percentage from all semesters</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Error */}
                {warning && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
                    <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />
                    {warning}
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-[#1C61E7] hover:bg-[#1a56d1] active:scale-[0.99] text-white font-display font-bold py-4 rounded-xl text-sm shadow-lg shadow-[#1C61E7]/20 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Calculating…
                    </span>
                  ) : (
                    "Calculate My CGPA"
                  )}
                </button>

                {/* Keyboard hint */}
                {percentage && !loading && (
                  <p className="text-center text-xs text-gray-400">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-[11px]">
                      Enter ↵
                    </kbd>{" "}
                    to calculate
                  </p>
                )}

                {/* Disclaimer */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 flex gap-2">
                  <ExclamationCircleIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    <strong>Note:</strong> This is an approximate conversion. Different universities
                    use different formulas. Always verify with your institution.
                  </p>
                </div>
              </div>

              {/* Ad Slot */}
              <div className="mt-6">
                <ResponsiveAd
                  adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE}
                  format="auto"
                  className="rounded-2xl overflow-hidden"
                />
              </div>
            </motion.div>

            {/* RIGHT — Result Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 lg:sticky lg:top-6"
              id="result-section"
            >
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <Calculator className="w-7 h-7 text-gray-400" />
                      </div>
                      <p className="font-display font-bold text-gray-700 dark:text-gray-300 mb-1">
                        Your CGPA appears here
                      </p>
                      <p className="text-sm text-gray-400">
                        Enter your percentage and hit Calculate
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                      {/* Blue hero band */}
                      <div className="bg-[#1C61E7] px-6 py-8 text-center relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        />
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200 mb-2">
                          Your CGPA
                        </p>
                        <div className="font-display text-7xl font-black text-white tracking-tight leading-none mb-1">
                          <AnimatedCounter value={result.cgpa} />
                        </div>
                        <p className="text-blue-200 text-sm mt-2">
                          from {result.percentage}% · {scale} Scale
                        </p>
                        <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden max-w-xs mx-auto">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-1000"
                            style={{
                              width: `${Math.min(
                                (result.cgpa / GradeScales[scale].max) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5">
                        {/* Grade + Remarks row */}
                        <div
                          className={`flex items-center justify-between p-3 rounded-xl mb-4 ${getPerformanceDetails(result.percentage).bg} border ${getPerformanceDetails(result.percentage).border}`}
                        >
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">
                              Grade
                            </p>
                            <p
                              className={`font-display text-2xl font-black ${getPerformanceDetails(result.percentage).color}`}
                            >
                              {result.grade}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">
                              Remarks
                            </p>
                            <p
                              className={`font-bold text-sm ${getPerformanceDetails(result.percentage).color}`}
                            >
                              {result.remarks}
                            </p>
                          </div>
                        </div>

                        {/* Scale + Divisor mini-cards */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-1">
                              Scale
                            </p>
                            <p className="font-display font-black text-xl text-gray-900 dark:text-white">
                              {scale}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-1">
                              Divisor
                            </p>
                            <p className="font-display font-black text-xl text-gray-900 dark:text-white">
                              ÷{GradeScales[scale].percentageDivisor}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={handleReset}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Reset
                          </button>
                          <RWebShare
                            data={{
                              text: `My CGPA is ${result.cgpa.toFixed(2)} from ${result.percentage}%!`,
                              url: "https://jntuhresults.theskypedia.com/percentage-to-cgpa-calculator",
                              title: "Percentage to CGPA Calculator",
                            }}
                          >
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C61E7] text-sm font-bold text-white hover:bg-[#1a56d1] transition-colors">
                              <Share2 className="w-3.5 h-3.5" /> Share
                            </button>
                          </RWebShare>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* In-Content Ad after calculator grid */}
          <div className="mt-8">
            <InContentAd adSlot={AD_SLOTS.CALCULATOR.IN_CONTENT} variant="in-article" />
          </div>

          {/* Below-grid sections */}
          <div className="mt-12 space-y-12">

            {/* 1. How it works */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">
                Guide
              </p>
              <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
                How to use this calculator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center mb-4">
                      <span className="font-display font-black text-sm text-[#1C61E7]">{i + 1}</span>
                    </div>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 2. Grade Reference Table */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">
                Reference
              </p>
              <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
                Grade scale reference (10.0)
              </h2>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {gradeReferenceRows.map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                      i !== gradeReferenceRows.length - 1
                        ? "border-b border-gray-100 dark:border-gray-800"
                        : ""
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-28">
                      {row.range}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex-1 text-center">
                      {row.cgpa10}
                    </span>
                    <span className={`font-display font-black text-base w-8 text-right ${row.color}`}>
                      {row.grade}
                    </span>
                    <span className={`text-xs font-bold w-32 text-right ${row.color}`}>
                      {row.remarks}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Between-sections Ad */}
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BETWEEN_SECTIONS} format="auto" />

            {/* 3. Pro Tip */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-800/40 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-display font-bold text-amber-900 dark:text-amber-200 mb-1">
                    Pro Tip
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    This conversion is <strong>approximate</strong>. Different universities have
                    different conversion formulas — some use{" "}
                    <code className="font-mono text-[12px] bg-amber-100 dark:bg-amber-900/40 px-1 rounded">
                      CGPA = (% − 0.5) × 10
                    </code>
                    , others use{" "}
                    <code className="font-mono text-[12px] bg-amber-100 dark:bg-amber-900/40 px-1 rounded">
                      % ÷ 9.5
                    </code>
                    . Always check with your institution's official policy before using converted
                    values in applications or official documents.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 4. Related Calculators */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">
                Tools
              </p>
              <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
                Related calculators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedCalculators.map(({ title, desc, link, Icon }) => (
                  <Link
                    key={link}
                    href={link}
                    className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:border-[#1C61E7]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-[#1C61E7]" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#1C61E7] transition-colors" />
                    </div>
                    <p className="font-display font-bold text-gray-900 dark:text-white text-sm mb-1">
                      {title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* 5. FAQ */}
            <div>
              <FAQSectionDynamic faqs={percentageFaqs} />
            </div>

          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
