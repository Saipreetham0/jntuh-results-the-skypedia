"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Calculator,
  TrendingUp,
  Award,
  RefreshCw,
  Share2,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Star,
} from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import confetti from "canvas-confetti";
import { RWebShare } from "react-web-share";

import { InContentAd, ResponsiveAd } from "@/components/adsense";
import FAQSectionDynamic from "@/components/seo/FAQSectionDynamic";
import AD_SLOTS from "@/config/adSlots";

// --- Types & Interfaces ---
interface SemesterData {
  id: string;
  sgpa: string;
  credits: string;
}

interface CalculationResult {
  cgpa: number;
  grade: string;
  remarks: string;
  percentage: number;
  totalCredits: number;
}

interface GradeScale {
  max: number;
  label: string;
}

const GradeScales: Record<string, GradeScale> = {
  "10.0": { max: 10.0, label: "10.0 Scale (India/JNTUH)" },
  "5.0": { max: 5.0, label: "5.0 Scale" },
  "4.0": { max: 4.0, label: "4.0 Scale (US)" },
};

// --- Animated Counter ---
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = value;
    const totalFrames = Math.round((duration * 1000) / 16);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = 0 + (end - 0) * ease;

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

export default function SGPAToCGPACalculator() {
  // --- State ---
  const [scale, setScale] = useState<string>("10.0");
  const [semesters, setSemesters] = useState<SemesterData[]>([
    { id: "1", sgpa: "", credits: "" },
    { id: "2", sgpa: "", credits: "" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("sgpa-calculator-data");
    if (savedData) {
      try {
        const { semesters: savedSemesters, scale: savedScale } = JSON.parse(savedData);
        if (savedSemesters && savedSemesters.length > 0) {
          setSemesters(savedSemesters);
          setScale(savedScale || "10.0");
        }
      } catch {}
    }
  }, []);

  // Save to localStorage whenever semesters or scale changes
  useEffect(() => {
    if (semesters.length > 0 && semesters.some((s) => s.sgpa || s.credits)) {
      localStorage.setItem("sgpa-calculator-data", JSON.stringify({ semesters, scale }));
    }
  }, [semesters, scale]);

  // Keyboard shortcut: Enter to calculate
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !loading) {
        const hasData = semesters.some((s) => s.sgpa && s.credits);
        if (hasData) {
          handleCalculate();
        }
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [semesters, loading]);

  // SEO Structured Data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate CGPA from SGPA",
    description:
      "Step-by-step guide to calculating your Cumulative Grade Point Average (CGPA) from Semester Grade Point Averages (SGPA).",
    step: [
      {
        "@type": "HowToStep",
        name: "Gather SGPA and Credits",
        text: "Collect your SGPA and total credits for each completed semester.",
      },
      {
        "@type": "HowToStep",
        name: "Select Grading Scale",
        text: "Choose the appropriate grading scale (10.0, 5.0, or 4.0) used by your institution.",
      },
      {
        "@type": "HowToStep",
        name: "Enter Data",
        text: "Input the SGPA and credit values for each semester into the calculator.",
      },
      {
        "@type": "HowToStep",
        name: "Calculate",
        text: "Click the 'Calculate CGPA' button to get your precise cumulative GPA.",
      },
    ],
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SGPA to CGPA Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const sgpaFaqs = [
    {
      question: "How is CGPA calculated from SGPA?",
      answer:
        "CGPA is calculated by dividing the sum of (SGPA × Credits) for all semesters by the total number of credits. Formula: Σ(SGPA × Credits) / Σ(Credits).",
    },
    {
      question: "Why do credits matter in CGPA calculation?",
      answer:
        "Credits represent the weight of a semester. A semester with more credits has a larger impact on your overall CGPA than one with fewer credits.",
    },
    {
      question: "Can I convert my CGPA to Percentage?",
      answer:
        "Yes! For JNTUH and many Indian universities, the formula is (CGPA - 0.5) * 10. You can use our dedicated converter tool for this.",
    },
  ];

  // --- Handlers ---
  const addSemester = () => {
    setSemesters([
      ...semesters,
      { id: Math.random().toString(36).substr(2, 9), sgpa: "", credits: "" },
    ]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((sem) => sem.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof SemesterData, value: string) => {
    setSemesters(semesters.map((sem) => (sem.id === id ? { ...sem, [field]: value } : sem)));
    if (warning) setWarning("");
  };

  const getPerformanceDetails = (cgpa: number, scaleMax: number) => {
    const percentage = (cgpa / scaleMax) * 100;
    if (percentage >= 90)
      return {
        label: "Outstanding",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
      };
    if (percentage >= 80)
      return {
        label: "Excellent",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
      };
    if (percentage >= 70)
      return {
        label: "Very Good",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
      };
    if (percentage >= 60)
      return {
        label: "Good",
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
      };
    if (percentage >= 50)
      return {
        label: "Average",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
      };
    return {
      label: "Needs Improvement",
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    };
  };

  const handleCalculate = () => {
    const scaleMax = GradeScales[scale].max;

    const filledSemesters = semesters.filter((s) => s.sgpa || s.credits);
    if (filledSemesters.length === 0) {
      setWarning("Please enter at least one semester's SGPA and credits.");
      return;
    }

    for (const sem of filledSemesters) {
      const sgpaNum = parseFloat(sem.sgpa);
      const creditsNum = parseFloat(sem.credits);

      if (!sem.sgpa || isNaN(sgpaNum)) {
        setWarning("Please enter a valid SGPA for all semesters.");
        return;
      }
      if (sgpaNum < 0 || sgpaNum > GradeScales[scale].max) {
        setWarning(
          `SGPA must be between 0 and ${GradeScales[scale].max} for the selected scale.`
        );
        return;
      }
      if (!sem.credits || isNaN(creditsNum) || creditsNum <= 0) {
        setWarning("Credit hours must be a positive number (usually 18-24).");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      const totalWeightedScore = semesters.reduce(
        (sum, sem) => sum + parseFloat(sem.sgpa) * parseFloat(sem.credits),
        0
      );
      const totalCredits = semesters.reduce((sum, sem) => sum + parseFloat(sem.credits), 0);
      const calculatedCgpa = totalWeightedScore / totalCredits;

      const percentage = (calculatedCgpa / scaleMax) * 100;
      let grade = "F";
      let remarks = "Needs Improvement";

      if (percentage >= 90) {
        grade = "O";
        remarks = "Outstanding";
      } else if (percentage >= 80) {
        grade = "A+";
        remarks = "Excellent";
      } else if (percentage >= 70) {
        grade = "A";
        remarks = "Very Good";
      } else if (percentage >= 60) {
        grade = "B+";
        remarks = "Good";
      } else if (percentage >= 50) {
        grade = "B";
        remarks = "Above Average";
      } else if (percentage >= 40) {
        grade = "C";
        remarks = "Average";
      } else {
        grade = "P";
        remarks = "Pass";
      }

      setResult({
        cgpa: calculatedCgpa,
        grade,
        remarks,
        percentage: (calculatedCgpa / scaleMax) * 100,
        totalCredits,
      });

      setLoading(false);

      if (percentage >= 70) {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function () {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
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

      if (window.innerWidth < 768) {
        document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  const handleReset = () => {
    setSemesters([{ id: Math.random().toString(36).substr(2, 9), sgpa: "", credits: "" }]);
    setResult(null);
    setWarning("");
    localStorage.removeItem("sgpa-calculator-data");
  };

  return (
    <>
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
              SGPA to CGPA Calculator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base mb-5">
              Add all your semester grades with credit weights to compute your CGPA.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["Free", "Credit Weighted", "All Semesters", "JNTUH R22 · R20 · R18"].map((b) => (
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

        {/* Main Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

            {/* Left: Semester Inputs Card */}
            <div className="lg:col-span-3">
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
                        onClick={() => {
                          setScale(key);
                          setResult(null);
                        }}
                        className={`flex-1 py-3 min-h-11 rounded-lg text-sm font-bold transition-all ${
                          scale === key
                            ? "bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Semester Rows */}
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-2 mb-1">
                    <div className="col-span-1" />
                    <div className="col-span-5">
                      <label className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400">
                        SGPA
                      </label>
                    </div>
                    <div className="col-span-5">
                      <label className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400">
                        Credits
                      </label>
                    </div>
                    <div className="col-span-1" />
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    {semesters.map((sem, idx) => (
                      <motion.div
                        key={sem.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <div className="col-span-1 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-black text-gray-500">
                          {idx + 1}
                        </div>
                        <div className="col-span-5">
                          <input
                            type="number"
                            inputMode="decimal"
                            placeholder="e.g. 8.5"
                            value={sem.sgpa}
                            onChange={(e) => updateSemester(sem.id, "sgpa", e.target.value)}
                            className="w-full px-3 py-3.5 min-h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                          />
                        </div>
                        <div className="col-span-5">
                          <input
                            type="number"
                            inputMode="numeric"
                            placeholder="e.g. 25"
                            value={sem.credits}
                            onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                            className="w-full px-3 py-3.5 min-h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          {semesters.length > 1 && (
                            <button
                              onClick={() => removeSemester(sem.id)}
                              className="w-9 h-9 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors"
                              aria-label={`Remove semester ${idx + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Add Semester */}
                <button
                  onClick={addSemester}
                  className="flex items-center gap-2 text-sm font-bold text-[#1C61E7] hover:text-[#1a56d1] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Semester
                </button>

                {/* Error */}
                {warning && (
                  <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <ExclamationCircleIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{warning}</p>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-[#1C61E7] hover:bg-[#1a56d1] active:scale-[0.99] text-white font-display font-bold py-4 rounded-xl text-sm shadow-lg shadow-[#1C61E7]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" /> Calculate CGPA
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-400">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono border border-gray-200 dark:border-gray-700">
                    Enter ↵
                  </kbd>{" "}
                  to calculate
                </p>
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
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                  >
                    {/* Blue Header */}
                    <div className="bg-[#1C61E7] px-6 pt-8 pb-6 text-white text-center">
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-blue-200 mb-3">
                        Your CGPA
                      </p>
                      <div className="font-display text-7xl font-extrabold tracking-tight mb-1 drop-shadow">
                        <AnimatedCounter value={result.cgpa} />
                      </div>
                      <p className="text-blue-200 text-xs font-semibold mb-4">on {scale} Scale</p>

                      {/* Progress bar */}
                      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(result.cgpa / GradeScales[scale].max) * 100}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-blue-200/70 mt-1">
                        <span>0</span>
                        <span>{GradeScales[scale].max}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                      {/* Grade Badge */}
                      {(() => {
                        const perf = getPerformanceDetails(result.cgpa, GradeScales[scale].max);
                        return (
                          <div
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border ${perf.bg} ${perf.border}`}
                          >
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400 mb-0.5">
                                Grade
                              </p>
                              <p className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
                                {result.grade}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${perf.color}`}>{result.remarks}</p>
                              <p className="text-xs text-gray-400">Performance</p>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                          <p className="font-display text-xl font-extrabold text-gray-900 dark:text-white">
                            {result.percentage.toFixed(1)}%
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400 mt-0.5">
                            Equiv. %
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                          <p className="font-display text-xl font-extrabold text-gray-900 dark:text-white">
                            {result.totalCredits}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400 mt-0.5">
                            Credits
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                          <p className="font-display text-xl font-extrabold text-gray-900 dark:text-white">
                            {semesters.filter((s) => s.sgpa && s.credits).length}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400 mt-0.5">
                            Semesters
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-1">
                        <button
                          onClick={handleReset}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <RWebShare
                          data={{
                            text: `I just calculated my CGPA using JNTUH Results SkyPedia! My CGPA is ${result.cgpa.toFixed(2)} (${result.remarks}). Check yours now!`,
                            url: "https://jntuhresults.theskypedia.com/sgpa-to-cgpa-calculator",
                            title: "SGPA to CGPA Calculator",
                          }}
                          onClick={() => {}}
                        >
                          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1C61E7] hover:bg-[#1a56d1] text-white text-sm font-bold transition-colors">
                            <Share2 className="w-3.5 h-3.5" /> Share
                          </button>
                        </RWebShare>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 min-h-[340px] flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Ready to Calculate?
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[200px]">
                      Enter your semester details and hit Calculate CGPA.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Below Sections */}
          <div className="mt-12 space-y-12">

            {/* How It Works */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-[#1C61E7]" />
                  <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">
                    How It Works
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: "1",
                      title: "Select Grading Scale",
                      desc: "Choose the scale your university uses — 10.0 for JNTUH, 4.0 for US universities, or 5.0.",
                    },
                    {
                      step: "2",
                      title: "Enter Semester Data",
                      desc: "Input your SGPA and total credit hours for each completed semester.",
                    },
                    {
                      step: "3",
                      title: "Get Your CGPA",
                      desc: "Click Calculate to instantly see your weighted cumulative GPA, grade, and performance insights.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center mb-3">
                        <span className="text-[13px] font-black text-[#1C61E7]">{item.step}</span>
                      </div>
                      <h3 className="font-display text-sm font-extrabold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Grade Reference */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-[#1C61E7]" />
                  <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">
                    Grade Reference
                  </h2>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  {[
                    {
                      range: "9.0 – 10.0",
                      grade: "O",
                      label: "Outstanding",
                      dot: "bg-emerald-400",
                    },
                    { range: "8.0 – 8.9", grade: "A+", label: "Excellent", dot: "bg-blue-400" },
                    { range: "7.0 – 7.9", grade: "A", label: "Very Good", dot: "bg-indigo-400" },
                    { range: "6.0 – 6.9", grade: "B+", label: "Good", dot: "bg-green-400" },
                    {
                      range: "5.0 – 5.9",
                      grade: "B",
                      label: "Above Average",
                      dot: "bg-yellow-400",
                    },
                    {
                      range: "< 5.0",
                      grade: "C / P",
                      label: "Pass",
                      dot: "bg-orange-400",
                    },
                  ].map((item, idx, arr) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-5 py-3.5 ${
                        idx !== arr.length - 1
                          ? "border-b border-gray-100 dark:border-gray-800"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                        <span className="text-xs font-bold text-gray-400 tabular-nums">
                          {item.range}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                        <span className="text-xs font-black text-[#1C61E7] w-8 text-right">
                          {item.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Between-sections Ad */}
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BETWEEN_SECTIONS} format="auto" />

            {/* Pro Tip */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-5 flex gap-3"
              >
                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-amber-800 dark:text-amber-300 mb-1">
                    Pro Tip
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                    Maintain a CGPA above 7.5 to stay eligible for most campus placements and
                    higher education. Semesters with higher credits carry more weight — focus your
                    effort there for the biggest CGPA gains.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Ad Slot */}
            <div>
              <InContentAd adSlot={AD_SLOTS.CALCULATOR.IN_CONTENT} variant="in-article" />
            </div>

            {/* Related Calculators */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white">
                  Related Calculators
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "CGPA Calculator",
                    desc: "Compute cumulative grade point average",
                    href: "/cgpa-calculator",
                    icon: Calculator,
                  },
                  {
                    title: "Percentage to CGPA",
                    desc: "Convert percentage marks to CGPA",
                    href: "/percentage-to-cgpa-calculator",
                    icon: RefreshCw,
                  },
                  {
                    title: "B.Tech Marks %",
                    desc: "Calculate your total percentage",
                    href: "/btech-marks-percentage-calculator",
                    icon: Award,
                  },
                ].map((tool, i) => (
                  <Link key={i} href={tool.href} className="group">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:border-[#1C61E7]/40 transition-all hover:shadow-sm flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center flex-shrink-0">
                          <tool.icon className="w-4.5 h-4.5 text-[#1C61E7]" />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-gray-900 dark:text-white mb-0.5">
                            {tool.title}
                          </p>
                          <p className="text-xs text-gray-400">{tool.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#1C61E7] transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <FAQSectionDynamic
              faqs={sgpaFaqs}
              title="Frequently Asked Questions"
              description="Everything you need to know about SGPA to CGPA conversion."
            />
          </div>
        </div>
      </div>
    </>
  );
}
