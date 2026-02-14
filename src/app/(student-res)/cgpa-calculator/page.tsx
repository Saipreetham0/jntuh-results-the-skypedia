"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GlassCard } from "@/components/ui/glass-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  ChevronRight,
  Trash2,
  Plus,
  TrendingUp,
  Award,
  Trophy,
  Star,
  AlertCircle,
  GraduationCap,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Share2
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
    url: "/cgpa-percentage-converter"
  },
  {
    title: "Percentage to CGPA",
    content: "Reverse mapping for academic requirements.",
    url: "/percentage-to-cgpa-calculator"
  },
  {
    title: "SGPA to CGPA Mapper",
    content: "Semester-wise weighted  credit tracking.",
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

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
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
    const savedData = localStorage.getItem('cgpa-calculator-data');
    if (savedData) {
      try {
        const { semesters: savedSemesters, scale: savedScale } = JSON.parse(savedData);
        if (savedSemesters && savedSemesters.length > 0) {
          setSemesters(savedSemesters);
          setScale(savedScale || "10.0");
        }
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Save to localStorage whenever semesters or scale changes
  useEffect(() => {
    if (semesters.length > 0 && semesters.some(s => s.sgpa || s.credits)) {
      localStorage.setItem('cgpa-calculator-data', JSON.stringify({ semesters, scale }));
    }
  }, [semesters, scale]);

  // Keyboard shortcut: Enter to calculate
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading) {
        const hasData = semesters.some(s => s.sgpa && s.credits);
        if (hasData) {
          handleCalculate();
        }
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [semesters, loading]);

  const handleAddSemester = () => {
    const newId = String(Math.max(...semesters.map(s => parseInt(s.id)), 0) + 1);
    setSemesters([...semesters, { id: newId, sgpa: "", credits: "" }]);
  };

  const handleRemoveSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  const handleSemesterChange = (id: string, field: keyof SemesterData, value: string) => {
    setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const getPerformanceDetails = (cgpa: number, scaleMax: number) => {
    const percentage = (cgpa / scaleMax) * 100;

    if (percentage >= 90) return { grade: "O", remarks: "Outstanding", color: "text-emerald-600", bg: "bg-emerald-500" };
    if (percentage >= 80) return { grade: "A+", remarks: "Excellent", color: "text-blue-600", bg: "bg-blue-500" };
    if (percentage >= 70) return { grade: "A", remarks: "Very Good", color: "text-indigo-600", bg: "bg-indigo-500" };
    if (percentage >= 60) return { grade: "B+", remarks: "Good", color: "text-green-600", bg: "bg-green-500" };
    if (percentage >= 50) return { grade: "B", remarks: "Average", color: "text-yellow-600", bg: "bg-yellow-500" };
    return { grade: "C", remarks: "Below Average", color: "text-red-600", bg: "bg-red-500" };
  };

  const handleCalculate = () => {
    setLoading(true);
    setWarning("");

    // Validate inputs
    const validSemesters = semesters.filter(s => {
      const sgpa = parseFloat(s.sgpa);
      const credits = parseFloat(s.credits);
      return !isNaN(sgpa) && !isNaN(credits) && credits > 0 && sgpa >= 0 && sgpa <= GradeScales[scale].max;
    });

    if (validSemesters.length === 0) {
      setWarning(`Please enter valid SGPA (0-${GradeScales[scale].max}) and Credits for at least one semester.`);
      setLoading(false);
      return;
    }

    // Calculate weighted CGPA
    setTimeout(() => {
      let totalWeightedPoints = 0;
      let totalCredits = 0;

      validSemesters.forEach(s => {
        const sgpa = parseFloat(s.sgpa);
        const credits = parseFloat(s.credits);
        totalWeightedPoints += sgpa * credits;
        totalCredits += credits;
      });

      const cgpa = totalWeightedPoints / totalCredits;
      const percentage = (cgpa - 0.5) * 10; // JNTUH formula

      setResult({
        cgpa,
        percentage: percentage,
        totalCredits
      });

      setLoading(false);

      // Confetti for high scores
      if (cgpa >= GradeScales[scale].max * 0.8) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Scroll to result
      const resultSection = document.getElementById('result-section');
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    localStorage.removeItem('cgpa-calculator-data');
  };

  const loadExample = () => {
    setSemesters([
      { id: "1", sgpa: "8.5", credits: "20" },
      { id: "2", sgpa: "9.0", credits: "22" },
      { id: "3", sgpa: "8.7", credits: "21" },
      { id: "4", sgpa: "9.2", credits: "23" },
    ]);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JNTUH CGPA Calculator",
    "description": "Free online CGPA calculator for JNTUH students. Calculate cumulative GPA with semester-wise grade input.",
    "url": "https://jntuhresults.theskypedia.com/cgpa-calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "price": "0",
    "priceCurrency": "USD"
  };

  return (
    <TooltipProvider>
      <Script id="schema-markup" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">

        {/* Background Mesh Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
        </div>

        <main className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

          {/* Top Ad */}
          <div className="mb-8">
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} />
          </div>

          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Calculate Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CGPA</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              From semester grades to cumulative GPA in seconds
            </p>
          </motion.div>

          {/* Main Layout: Two-Column Split */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left Column: Calculator Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-3/5 space-y-6"
            >
              <GlassCard className="p-1">
                <div className="p-6 md:p-8 space-y-8">

                  {/* Grading Scale Selector */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                      Select Your Grading Scale
                    </label>
                    <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl">
                      {Object.entries(GradeScales).map(([key, data]) => (
                        <button
                          key={key}
                          onClick={() => { setScale(key); handleReset(); }}
                          className={`
                            py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300 flex flex-col items-center gap-1
                            ${scale === key
                              ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-lg scale-[1.02] ring-1 ring-black/5 dark:ring-white/5'
                              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'}
                          `}
                        >
                          {key}
                          <span className="text-[10px] font-medium opacity-70 hidden sm:block">{data.max} Scale</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-slate-200 dark:bg-slate-700/50" />

                  {/* Semester Inputs */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-500" /> Enter Your Semester Grades
                      </label>
                      <Button
                        onClick={loadExample}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Sparkles className="w-3 h-3 mr-1" /> Try Example
                      </Button>
                    </div>
                    <span className="text-xs text-slate-500 font-medium block mb-4">{semesters.length} Semesters Added</span>

                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {semesters.map((semester, index) => (
                          <motion.div
                            key={semester.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                              <div className="flex items-start gap-4">
                                <div className="flex-none mt-3">
                                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                  </div>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5">
                                      <label htmlFor={`sgpa-${semester.id}`} className="text-xs font-medium text-slate-500 uppercase tracking-wider">SGPA (Semester GPA)</label>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs">
                                          <p className="text-sm">Semester Grade Point Average - Your GPA for this specific semester</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                    <Input
                                      id={`sgpa-${semester.id}`}
                                      type="number"
                                      placeholder={`e.g., 8.5`}
                                      step="0.01"
                                      inputMode="decimal"
                                      value={semester.sgpa}
                                      onChange={(e) => handleSemesterChange(semester.id, 'sgpa', e.target.value)}
                                      className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 font-semibold transition-all"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5">
                                      <label htmlFor={`credits-${semester.id}`} className="text-xs font-medium text-slate-500 uppercase tracking-wider">Credit Hours</label>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs">
                                          <p className="text-sm">Total credit hours for this semester (usually 18-24 for full-time students)</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                    <Input
                                      id={`credits-${semester.id}`}
                                      type="number"
                                      placeholder="e.g., 22"
                                      step="1"
                                      inputMode="numeric"
                                      value={semester.credits}
                                      onChange={(e) => handleSemesterChange(semester.id, 'credits', e.target.value)}
                                      className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 font-semibold transition-all"
                                    />
                                  </div>
                                </div>
                                {semesters.length > 1 && (
                                  <button
                                    onClick={() => handleRemoveSemester(semester.id)}
                                    className="flex-none mt-3 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                                    aria-label={`Remove semester ${index + 1}`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <Button
                      onClick={handleAddSemester}
                      variant="outline"
                      className="w-full h-12 border-dashed border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all rounded-xl mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Semester
                    </Button>
                  </div>

                  {warning && (
                    <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50 dark:bg-red-900/10 dark:text-red-200">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{warning}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Calculator className="w-5 h-5 mr-2" />}
                    {loading ? "Calculating..." : "Calculate My CGPA"}
                  </Button>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                    Press <kbd className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-xs font-mono">Enter ↵</kbd> to calculate
                  </p>
                </div>
              </GlassCard>

              {/* Middle Ad */}
              <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} />
            </motion.div>

            {/* Right Column: Sticky Result Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-2/5 lg:sticky lg:top-8"
              id="result-section"
            >
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <GlassCard className="overflow-hidden border-0 ring-4 ring-white/20 dark:ring-black/20" variant="gradient">
                      <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-8 text-white text-center relative overflow-hidden">
                        {/* Abstract shapes in background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/30 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>

                        <p className="font-medium text-blue-100 uppercase tracking-widest text-xs mb-4">🎉 Your CGPA is Ready!</p>
                        <div className="relative inline-block">
                          <h2 className="text-8xl md:text-9xl font-bold tracking-tighter mb-3 drop-shadow-lg">
                            <AnimatedCounter value={result.cgpa} />
                          </h2>
                          {/* Star Rating */}
                          <div className="flex justify-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => {
                              const filled = (result.cgpa / GradeScales[scale].max) * 5 > i;
                              return (
                                <Star
                                  key={i}
                                  className={`w-6 h-6 ${filled ? 'fill-yellow-300 text-yellow-300' : 'text-white/30'} transition-all duration-300`}
                                  style={{ animationDelay: `${i * 100}ms` }}
                                />
                              );
                            })}
                          </div>
                          {/* Progress Bar */}
                          <div className="w-full max-w-xs mx-auto mb-2">
                            <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(result.cgpa / GradeScales[scale].max) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-blue-100/60 mt-1">
                              <span>0</span>
                              <span>{GradeScales[scale].max}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-blue-100/80 font-medium">on {scale} Scale</p>
                      </div>

                      <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                        {/* Performance Details */}
                        <div className="p-6 space-y-4">
                          {(() => {
                            const perf = getPerformanceDetails(result.cgpa, GradeScales[scale].max);
                            return (
                              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <div className={`w-3 h-3 rounded-full ${perf.bg}`} />
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{perf.grade}</p>
                                    <p className={`text-xs font-medium ${perf.color}`}>{perf.remarks}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.percentage.toFixed(1)}%</p>
                                  <p className="text-xs text-slate-500">Percentage</p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Performance Breakdown */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Total Credits</p>
                              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.totalCredits}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">Semesters</p>
                              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{semesters.filter(s => s.sgpa && s.credits).length}</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                          <Button
                            onClick={handleReset}
                            variant="outline"
                            className="flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" /> Clear All
                          </Button>
                          <RWebShare
                            data={{
                              text: `I just calculated my CGPA using JNTUH Results SkyPedia! My CGPA is ${result.cgpa.toFixed(2)} (${getPerformanceDetails(result.cgpa, GradeScales[scale].max).remarks}). Check yours now!`,
                              url: "https://jntuhresults.theskypedia.com/cgpa-calculator",
                              title: "CGPA Calculator",
                            }}
                            onClick={() => console.log("Shared successfully!")}
                          >
                            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                              <Share2 className="w-4 h-4 mr-2" /> Share Result
                            </Button>
                          </RWebShare>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <GlassCard className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/20">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-6">
                        <TrendingUp className="w-10 h-10 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Ready to Calculate?</h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                        Enter your semester details on the left, and we'll analyze your academic performance instantly.
                      </p>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Related Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Academic <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Ecosystem</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400">Explore our suite of academic calculators</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculatorCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link href={card.url}>
                    <GlassCard className="h-full p-6 hover:scale-[1.02] transition-all cursor-pointer group border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700">
                      <div className="flex flex-col h-full">
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                          <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow mb-4">
                          {card.content}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                          Explore <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Ad */}
          <div className="mt-12">
            <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} />
          </div>

        </main>
      </div>
    </TooltipProvider >
  );
};

export default CGPACalculator;
