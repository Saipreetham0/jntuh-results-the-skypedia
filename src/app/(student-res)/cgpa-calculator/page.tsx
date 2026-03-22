"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Trash2,
  Plus,
  TrendingUp,
  RefreshCw,
  Share2,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { RWebShare } from "react-web-share";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

interface CalculatorCard {
  title: string;
  content: string;
  url: string;
}

const calculatorCards: CalculatorCard[] = [
  {
    title: "CGPA to Percentage",
    content: "Official JNTUH conversion (CGPA-0.5)*10 mapping.",
    url: "/cgpa-percentage-converter",
  },
  {
    title: "Percentage to CGPA",
    content: "Reverse mapping for academic requirements.",
    url: "/percentage-to-cgpa-calculator",
  },
  {
    title: "SGPA to CGPA Mapper",
    content: "Semester-wise weighted credit tracking.",
    url: "/sgpa-to-cgpa-calculator",
  },
  {
    title: "Marks Calculator",
    content: "Calculate aggregate scores from raw marks.",
    url: "/marks-percentage-calculator",
  },
];

interface SemesterData {
  id: string;
  sgpa: string;
  credits: string;
}

interface CalculationResult {
  cgpa: number;
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

// Animated Counter Component
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

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JNTUH CGPA Calculator",
  description:
    "Free online CGPA calculator for JNTUH students. Calculate cumulative GPA with semester-wise grade input.",
  url: "https://jntuhresults.theskypedia.com/cgpa-calculator",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  price: "0",
  priceCurrency: "USD",
};

const CGPACalculator = () => {
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
    const savedData = localStorage.getItem("cgpa-calculator-data");
    if (savedData) {
      try {
        const { semesters: savedSemesters, scale: savedScale } = JSON.parse(savedData);
        if (savedSemesters && savedSemesters.length > 0) {
          setSemesters(savedSemesters);
          setScale(savedScale || "10.0");
        }
      } catch {
        // silent
      }
    }
  }, []);

  // Save to localStorage whenever semesters or scale changes
  useEffect(() => {
    if (semesters.length > 0 && semesters.some((s) => s.sgpa || s.credits)) {
      localStorage.setItem(
        "cgpa-calculator-data",
        JSON.stringify({ semesters, scale })
      );
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semesters, loading]);

  const addSemester = () => {
    const newId = String(Math.max(...semesters.map((s) => parseInt(s.id)), 0) + 1);
    setSemesters([...semesters, { id: newId, sgpa: "", credits: "" }]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof SemesterData, value: string) => {
    setSemesters(semesters.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const getPerformanceDetails = (cgpa: number, scaleMax: number) => {
    const percentage = (cgpa / scaleMax) * 100;
    if (percentage >= 90)
      return { grade: "O", remarks: "Outstanding", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500" };
    if (percentage >= 80)
      return { grade: "A+", remarks: "Excellent", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500" };
    if (percentage >= 70)
      return { grade: "A", remarks: "Very Good", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500" };
    if (percentage >= 60)
      return { grade: "B+", remarks: "Good", color: "text-green-600 dark:text-green-400", bg: "bg-green-500" };
    if (percentage >= 50)
      return { grade: "B", remarks: "Average", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500" };
    return { grade: "C", remarks: "Below Average", color: "text-red-600 dark:text-red-400", bg: "bg-red-500" };
  };

  const handleCalculate = () => {
    setLoading(true);
    setWarning("");

    const validSemesters = semesters.filter((s) => {
      const sgpa = parseFloat(s.sgpa);
      const credits = parseFloat(s.credits);
      return (
        !isNaN(sgpa) &&
        !isNaN(credits) &&
        credits > 0 &&
        sgpa >= 0 &&
        sgpa <= GradeScales[scale].max
      );
    });

    if (validSemesters.length === 0) {
      setWarning(
        `Please enter valid SGPA (0-${GradeScales[scale].max}) and Credits for at least one semester.`
      );
      setLoading(false);
      return;
    }

    setTimeout(() => {
      let totalWeightedPoints = 0;
      let totalCredits = 0;

      validSemesters.forEach((s) => {
        const sgpa = parseFloat(s.sgpa);
        const credits = parseFloat(s.credits);
        totalWeightedPoints += sgpa * credits;
        totalCredits += credits;
      });

      const cgpa = totalWeightedPoints / totalCredits;
      const percentage = (cgpa - 0.5) * 10; // JNTUH formula

      setResult({ cgpa, percentage, totalCredits });
      setLoading(false);

      // Confetti for high scores
      if (cgpa >= GradeScales[scale].max * 0.8) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      // Scroll to result
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 800);
  };

  const handleReset = () => {
    setSemesters([
      { id: "1", sgpa: "", credits: "" },
      { id: "2", sgpa: "", credits: "" },
    ]);
    setResult(null);
    setWarning("");
    localStorage.removeItem("cgpa-calculator-data");
  };

  const loadExample = () => {
    setSemesters([
      { id: "1", sgpa: "8.5", credits: "20" },
      { id: "2", sgpa: "9.0", credits: "22" },
      { id: "3", sgpa: "8.7", credits: "21" },
      { id: "4", sgpa: "9.2", credits: "23" },
    ]);
  };

  return (
    <TooltipProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* Page Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">
              CGPA Calculator
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              CGPA Calculator
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base mb-5">
              Calculate your CGPA from semester SGPA and credit hours.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {["Free", "Credit Weighted", "JNTUH Formula", "All Regulations"].map((b) => (
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

          {/* Top Ad */}
          <div className="mt-6">
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start mt-8">

            {/* Left: Calculator Input */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Semester Grades</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {semesters.length} semester{semesters.length !== 1 ? "s" : ""} added
                    </p>
                  </div>
                  <button
                    onClick={loadExample}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#1C61E7] hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Try Example
                  </button>
                </div>

                {/* Scale selector tabs */}
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Grading Scale
                  </p>
                  <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl gap-1">
                    {Object.entries(GradeScales).map(([key]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setScale(key);
                          setResult(null);
                        }}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          scale === key
                            ? "bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm"
                            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column labels */}
                <div className="grid grid-cols-12 gap-2 px-0.5">
                  <div className="col-span-1" />
                  <div className="col-span-5">
                    <div className="flex items-center gap-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">SGPA</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Semester Grade Point Average — your GPA for this specific semester.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="col-span-5">
                    <div className="flex items-center gap-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Credits</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3 h-3 text-gray-300 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Total credit hours for this semester (usually 18–24 for full-time students).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="col-span-1" />
                </div>

                {/* Semester rows */}
                <div className="space-y-3">
                  {semesters.map((sem, idx) => (
                    <div key={sem.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-1 w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[11px] font-black text-gray-500">
                        {idx + 1}
                      </div>
                      <div className="col-span-5">
                        <input
                          type="number"
                          placeholder="SGPA"
                          step="0.01"
                          inputMode="decimal"
                          value={sem.sgpa}
                          onChange={(e) => updateSemester(sem.id, "sgpa", e.target.value)}
                          className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                        />
                      </div>
                      <div className="col-span-5">
                        <input
                          type="number"
                          placeholder="Credits"
                          step="1"
                          inputMode="numeric"
                          value={sem.credits}
                          onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                          className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {semesters.length > 1 && (
                          <button
                            onClick={() => removeSemester(sem.id)}
                            aria-label={`Remove semester ${idx + 1}`}
                            className="w-7 h-7 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Warning */}
                {warning && (
                  <div className="flex items-start gap-2 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
                    <span className="mt-0.5 w-4 h-4 flex-none text-red-500">!</span>
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{warning}</p>
                  </div>
                )}

                {/* Add Semester + CTA */}
                <div className="space-y-3 pt-1">
                  <button
                    onClick={addSemester}
                    className="flex items-center gap-2 text-sm font-bold text-[#1C61E7] hover:text-[#1a56d1] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Semester
                  </button>

                  <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full bg-[#1C61E7] hover:bg-[#1a56d1] text-white font-display font-bold py-4 rounded-xl text-sm shadow-lg shadow-[#1C61E7]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
                    {loading ? "Calculating..." : "Calculate CGPA"}
                  </button>

                  <p className="text-xs text-center text-gray-400">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-gray-600 dark:text-gray-300">
                      Enter ↵
                    </kbd>{" "}
                    to calculate
                  </p>
                </div>
              </div>

              {/* Middle Ad */}
              <div className="mt-6">
                <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} />
              </div>
            </div>

            {/* Right: Result card */}
            <div className="lg:col-span-2 lg:sticky lg:top-6" id="result-section">
              {result ? (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                  {/* Blue header */}
                  <div className="bg-[#1C61E7] px-6 pt-8 pb-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-800/30 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-blue-200 mb-3">
                      Your CGPA
                    </p>
                    <p className="font-display text-7xl md:text-8xl font-extrabold tracking-tight leading-none drop-shadow-lg mb-4">
                      <AnimatedCounter value={result.cgpa} />
                    </p>

                    {/* Progress bar */}
                    <div className="w-full max-w-[200px] mx-auto mb-2">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(result.cgpa / GradeScales[scale].max) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-blue-200/70 mt-1">
                        <span>0</span>
                        <span>{GradeScales[scale].max}</span>
                      </div>
                    </div>

                    <p className="text-xs text-blue-200 font-medium">on {scale} scale</p>
                  </div>

                  {/* White body */}
                  <div className="p-6 space-y-4">
                    {/* Grade/performance badge */}
                    {(() => {
                      const perf = getPerformanceDetails(result.cgpa, GradeScales[scale].max);
                      return (
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-2.5 h-2.5 rounded-full ${perf.bg}`} />
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                                Grade {perf.grade}
                              </p>
                              <p className={`text-xs font-semibold mt-0.5 ${perf.color}`}>
                                {perf.remarks}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-2xl font-extrabold text-gray-900 dark:text-white leading-none">
                              {result.percentage.toFixed(1)}%
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Percentage</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-1">
                          Total Credits
                        </p>
                        <p className="font-display text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                          {result.totalCredits}
                        </p>
                      </div>
                      <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
                          Semesters
                        </p>
                        <p className="font-display text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                          {semesters.filter((s) => s.sgpa && s.credits).length}
                        </p>
                      </div>
                    </div>

                    {/* Reset + Share */}
                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={handleReset}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset
                      </button>
                      <RWebShare
                        data={{
                          text: `I just calculated my CGPA using JNTUH Results SkyPedia! My CGPA is ${result.cgpa.toFixed(2)} (${getPerformanceDetails(result.cgpa, GradeScales[scale].max).remarks}). Check yours now!`,
                          url: "https://jntuhresults.theskypedia.com/cgpa-calculator",
                          title: "CGPA Calculator",
                        }}
                        onClick={() => {}}
                      >
                        <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C61E7] hover:bg-[#1a56d1] text-white text-sm font-bold transition-colors shadow-md shadow-[#1C61E7]/20">
                          <Share2 className="w-3.5 h-3.5" />
                          Share
                        </button>
                      </RWebShare>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 min-h-[380px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/30 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-[#1C61E7]" />
                  </div>
                  <p className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                    Ready to Calculate?
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                    Enter your semester grades on the left and hit{" "}
                    <span className="font-semibold text-[#1C61E7]">Calculate CGPA</span> to see
                    your results instantly.
                  </p>
                </div>
              )}

              {/* In-content ad below result panel */}
              <div className="mt-6">
                <InContentAd adSlot={AD_SLOTS.CALCULATOR.IN_CONTENT} />
              </div>
            </div>
          </div>

          {/* Related calculator cards */}
          <div className="mt-12">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">
              Tools
            </p>
            <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              More calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {calculatorCards.map((card) => (
                <Link
                  key={card.url}
                  href={card.url}
                  className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:border-[#1C61E7]/30 hover:shadow-md transition-all"
                >
                  <h3 className="font-display font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-[#1C61E7] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {card.content}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="mt-6">
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.RESULT_BOTTOM} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CGPACalculator;
