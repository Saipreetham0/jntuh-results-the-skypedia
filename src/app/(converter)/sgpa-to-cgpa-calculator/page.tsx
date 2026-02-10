"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Calculator,
  TrendingUp,
  Award,
  RefreshCw,
  GraduationCap,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Star,
  Share2,
  HelpCircle,
  BookOpen,
  Lightbulb,
  Download
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { RWebShare } from "react-web-share";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GlassCard } from "@/components/ui/glass-card";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';
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

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Components ---

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
      // Ease out quart
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
  const [showExample, setShowExample] = useState<boolean>(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('sgpa-calculator-data');
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
      localStorage.setItem('sgpa-calculator-data', JSON.stringify({ semesters, scale }));
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

  // SEO Structured Data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate CGPA from SGPA",
    "description": "Step-by-step guide to calculating your Cumulative Grade Point Average (CGPA) from Semester Grade Point Averages (SGPA).",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Gather SGPA and Credits",
        "text": "Collect your SGPA and total credits for each completed semester."
      },
      {
        "@type": "HowToStep",
        "name": "Select Grading Scale",
        "text": "Choose the appropriate grading scale (10.0, 5.0, or 4.0) used by your institution."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Data",
        "text": "Input the SGPA and credit values for each semester into the calculator."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate",
        "text": "Click the 'Calculate CGPA' button to get your precise cumulative GPA."
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SGPA to CGPA Calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const sgpaFaqs = [
    {
      question: "How is CGPA calculated from SGPA?",
      answer: "CGPA is calculated by dividing the sum of (SGPA × Credits) for all semesters by the total number of credits. Formula: Σ(SGPA × Credits) / Σ(Credits)."
    },
    {
      question: "Why do credits matter in CGPA calculation?",
      answer: "Credits represent the weight of a semester. A semester with more credits has a larger impact on your overall CGPA than one with fewer credits."
    },
    {
      question: "Can I convert my CGPA to Percentage?",
      answer: "Yes! For JNTUH and many Indian universities, the formula is (CGPA - 0.5) * 10. You can use our dedicated converter tool for this."
    }
  ];

  // --- Handlers ---

  const handleAddSemester = () => {
    setSemesters([...semesters, { id: Math.random().toString(36).substr(2, 9), sgpa: "", credits: "" }]);
  };

  const handleRemoveSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== id));
    }
  };

  const handleSemesterChange = (id: string, field: keyof SemesterData, value: string) => {
    setSemesters(semesters.map(sem => sem.id === id ? { ...sem, [field]: value } : sem));
    // Clear warning when user types
    if (warning) setWarning("");
  };

  const getPerformanceDetails = (cgpa: number, scaleMax: number) => {
    const percentage = (cgpa / scaleMax) * 100;
    if (percentage >= 90) return { label: "Outstanding", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (percentage >= 80) return { label: "Excellent", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (percentage >= 70) return { label: "Very Good", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
    if (percentage >= 60) return { label: "Good", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
    if (percentage >= 50) return { label: "Average", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    return { label: "Needs Improvement", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
  };

  const handleCalculate = () => {
    const scaleMax = GradeScales[scale].max;

    // Validation
    const filledSemesters = semesters.filter(s => s.sgpa || s.credits);
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
        setWarning(`SGPA must be between 0 and ${GradeScales[scale].max} for the selected scale.`);
        return;
      }
      if (!sem.credits || isNaN(creditsNum) || creditsNum <= 0) {
        setWarning("Credit hours must be a positive number (usually 18-24).");
        return;
      }
    }
    setLoading(true);

    // Simulate network delay for "app-like" feel
    setTimeout(() => {
      const totalWeightedScore = semesters.reduce((sum, sem) => sum + (parseFloat(sem.sgpa) * parseFloat(sem.credits)), 0);
      const totalCredits = semesters.reduce((sum, sem) => sum + parseFloat(sem.credits), 0);

      const calculatedCgpa = totalWeightedScore / totalCredits;

      // Calculate Grade
      const percentage = (calculatedCgpa / scaleMax) * 100;
      let grade = "F";
      let remarks = "Needs Improvement";

      if (percentage >= 90) { grade = "O"; remarks = "Outstanding"; }
      else if (percentage >= 80) { grade = "A+"; remarks = "Excellent"; }
      else if (percentage >= 70) { grade = "A"; remarks = "Very Good"; }
      else if (percentage >= 60) { grade = "B+"; remarks = "Good"; }
      else if (percentage >= 50) { grade = "B"; remarks = "Above Average"; }
      else if (percentage >= 40) { grade = "C"; remarks = "Average"; }
      else { grade = "P"; remarks = "Pass"; } // Assuming P for pass in some contexts, simplified logic

      setResult({
        cgpa: calculatedCgpa,
        grade,
        remarks,
        percentage: (calculatedCgpa / scaleMax) * 100, // Generic percentage
        totalCredits
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

      // Scroll to result on mobile
      if (window.innerWidth < 768) {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  const handleReset = () => {
    setSemesters([{ id: Math.random().toString(36).substr(2, 9), sgpa: "", credits: "" }]);
    setResult(null);
    setWarning("");
    localStorage.removeItem('sgpa-calculator-data');
  };

  const loadExample = () => {
    setScale("10.0"); // Set scale to 10.0 for the example
    setSemesters([
      { id: "1", sgpa: "8.5", credits: "22" },
      { id: "2", sgpa: "8.8", credits: "24" },
      { id: "3", sgpa: "9.0", credits: "23" },
      { id: "4", sgpa: "8.7", credits: "24" }
    ]);
    setShowExample(true);
  };

  return (
    <TooltipProvider>
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />

      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">

        {/* Background Mesh Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 dark:bg-emerald-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
        </div>

        <main className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

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

          {/* Main Layout: Split Screen */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: Calculator Input Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-3/5 space-y-6"
            >
              <GlassCard className="p-1">
                <div className="p-6 md:p-8 space-y-8">

                  {/* Scale Selector Segmented Control */}
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
            </motion.div>

            {/* Right: Sticky Result Dashboard */}
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
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{result.grade}</p>
                                    <p className={`text-xs font-medium ${perf.color}`}>{result.remarks}</p>
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
                              text: `I just calculated my CGPA using JNTUH Results SkyPedia! My CGPA is ${result.cgpa} (${result.remarks}). Check yours now!`,
                              url: "https://jntuhresults.theskypedia.com/sgpa-to-cgpa-calculator",
                              title: "SGPA to CGPA Calculator",
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

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              Used by <span className="font-semibold text-slate-900 dark:text-white">50,000+ JNTUH students</span> this month
            </p>
          </motion.div>

          {/* How to Use Guide Section - Optimized */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full mb-4">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Quick Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  How to Use This Calculator
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Calculate your CGPA in 4 simple steps
                </p>
              </div>

              <GlassCard className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Select Your Grading Scale",
                      description: "Choose the grading scale used by your university (10.0 for JNTUH/Indian universities, 4.0 for US universities, or 5.0 scale).",
                      icon: GraduationCap,
                      color: "from-blue-500 to-indigo-500"
                    },
                    {
                      step: "2",
                      title: "Enter Semester Details",
                      description: "Input your SGPA and total credits for each completed semester. Add more semesters using the 'Add Semester' button.",
                      icon: Plus,
                      color: "from-indigo-500 to-purple-500"
                    },
                    {
                      step: "3",
                      title: "Calculate Your CGPA",
                      description: "Click the 'Calculate My CGPA' button to get your cumulative GPA, letter grade, and performance analysis.",
                      icon: Calculator,
                      color: "from-purple-500 to-pink-500"
                    },
                    {
                      step: "4",
                      title: "Share Your Results",
                      description: "Share your achievement with friends or save it for your records using the Share button.",
                      icon: Share2,
                      color: "from-pink-500 to-rose-500"
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group relative"
                    >
                      <div className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-800/30 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                        {/* Step Number with Gradient */}
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-xl font-bold text-white">{item.step}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            <item.icon className="w-5 h-5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </section>

          {/* Example Calculations Section */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Example Calculations</h2>
                  <p className="text-slate-600 dark:text-slate-400">See how CGPA is calculated with real examples</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "4-Year B.Tech Student",
                    scale: "10.0",
                    semesters: [
                      { sem: "Semester 1", sgpa: "8.5", credits: "22" },
                      { sem: "Semester 2", sgpa: "8.8", credits: "24" },
                      { sem: "Semester 3", sgpa: "9.0", credits: "23" },
                      { sem: "Semester 4", sgpa: "8.7", credits: "24" }
                    ],
                    result: "8.76",
                    grade: "A+"
                  },
                  {
                    title: "US University Student",
                    scale: "4.0",
                    semesters: [
                      { sem: "Fall 2023", sgpa: "3.7", credits: "15" },
                      { sem: "Spring 2024", sgpa: "3.8", credits: "16" },
                      { sem: "Fall 2024", sgpa: "3.9", credits: "15" }
                    ],
                    result: "3.80",
                    grade: "A"
                  }
                ].map((example, idx) => (
                  <GlassCard key={idx} className="p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{example.title}</h3>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{example.scale} Scale</Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      {example.semesters.map((sem, semIdx) => (
                        <div key={semIdx} className="flex justify-between text-sm p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                          <span className="text-slate-600 dark:text-slate-400">{sem.sem}</span>
                          <span className="font-semibold text-slate-900 dark:text-white">SGPA: {sem.sgpa} | Credits: {sem.credits}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Calculated CGPA</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{example.result}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Grade</p>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{example.grade}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Grade Interpretation Guide */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Understanding Your CGPA</h2>
                  <p className="text-slate-600 dark:text-slate-400">What your grade means for your academic performance</p>
                </div>
              </div>

              <GlassCard className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { range: "9.0 - 10.0", grade: "O", label: "Outstanding", color: "from-emerald-500 to-teal-600", textColor: "text-emerald-600 dark:text-emerald-400" },
                    { range: "8.0 - 8.9", grade: "A+", label: "Excellent", color: "from-blue-500 to-indigo-600", textColor: "text-blue-600 dark:text-blue-400" },
                    { range: "7.0 - 7.9", grade: "A", label: "Very Good", color: "from-indigo-500 to-purple-600", textColor: "text-indigo-600 dark:text-indigo-400" },
                    { range: "6.0 - 6.9", grade: "B+", label: "Good", color: "from-green-500 to-emerald-600", textColor: "text-green-600 dark:text-green-400" },
                    { range: "5.0 - 5.9", grade: "B", label: "Above Average", color: "from-yellow-500 to-orange-600", textColor: "text-yellow-600 dark:text-yellow-400" },
                    { range: "< 5.0", grade: "C/P", label: "Pass", color: "from-orange-500 to-red-600", textColor: "text-orange-600 dark:text-orange-400" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:scale-105 transition-transform">
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
                      <div className="text-center">
                        <p className="text-2xl font-bold mb-1 ${item.textColor}">{item.grade}</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.range}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Pro Tip for Students
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Maintain a consistent CGPA above 7.5 to be eligible for most campus placements and higher education opportunities. Focus on improving your performance in subjects with higher credit hours as they have more impact on your overall CGPA.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </section>

          {/* Ad Slot */}
          <div className="my-16">
            <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} />
          </div>

          {/* Related Tools Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> More Student Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "CGPA Calculator",
                  desc: "Cumulative Grade Point Avg",
                  color: "bg-purple-500",
                  icon: Calculator,
                  href: "/cgpa-calculator"
                },
                {
                  title: "Percentage to CGPA",
                  desc: "Convert % marks to CGPA",
                  color: "bg-pink-500",
                  icon: RefreshCw,
                  href: "/percentage-to-cgpa-calculator"
                },
                {
                  title: "B.Tech Marks",
                  desc: "Calculate total percentage",
                  color: "bg-emerald-500",
                  icon: Award,
                  href: "/btech-marks-percentage-calculator"
                },
              ].map((tool, i) => (
                <Link key={i} href={tool.href} className="group">
                  <GlassCard className="p-6 h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 hover:border-t-blue-500 relative overflow-hidden">
                    <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{tool.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{tool.desc}</p>
                    <div className="absolute top-4 right-4 text-slate-300 group-hover:text-blue-500 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSectionDynamic
            faqs={sgpaFaqs}
            title="Frequently Asked Questions"
            description="Everything you need to know about SGPA to CGPA conversion."
          />

        </main>
      </div>
    </TooltipProvider>
  );
}
