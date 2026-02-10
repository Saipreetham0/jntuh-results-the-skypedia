"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  Award,
  RefreshCw,
  GraduationCap,
  AlertCircle,
  Sparkles,
  Star,
  Share2,
  HelpCircle,
  BookOpen,
  Lightbulb,
  Percent
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Animated Counter
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

export default function PercentageToCGPACalculator() {
  // State
  const [scale, setScale] = useState<string>("10.0");
  const [percentage, setPercentage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('percentage-cgpa-data');
    if (savedData) {
      try {
        const { percentage: savedPercentage, scale: savedScale } = JSON.parse(savedData);
        if (savedPercentage) {
          setPercentage(savedPercentage);
          setScale(savedScale || "10.0");
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (percentage) {
      localStorage.setItem('percentage-cgpa-data', JSON.stringify({ percentage, scale }));
    }
  }, [percentage, scale]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading && percentage) {
        handleCalculate();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [percentage, loading]);

  // SEO Structured Data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert Percentage to CGPA",
    "description": "Step-by-step guide to converting percentage to CGPA on different grading scales.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select Grading Scale",
        "text": "Choose the target grading scale (10.0, 5.0, or 4.0) for conversion."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Percentage",
        "text": "Input your aggregate percentage value."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate",
        "text": "Click calculate to get your CGPA result."
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Percentage to CGPA Calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const percentageFaqs = [
    {
      question: "How to convert percentage to CGPA?",
      answer: "For JNTUH (10.0 scale), divide percentage by 9.5. For 4.0 scale, divide by 25. For 5.0 scale, divide by 20. Formula: CGPA = Percentage ÷ Divisor."
    },
    {
      question: "Is this conversion accurate?",
      answer: "The conversion is approximate. Different universities may use different formulas. Always verify with your institution's official conversion policy."
    },
    {
      question: "Can I convert CGPA back to percentage?",
      answer: "Yes! Use our CGPA to Percentage converter tool for reverse calculation."
    }
  ];

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

      if (percentageNum >= 90) { grade = "O"; remarks = "Outstanding"; }
      else if (percentageNum >= 80) { grade = "A+"; remarks = "Excellent"; }
      else if (percentageNum >= 70) { grade = "A"; remarks = "Very Good"; }
      else if (percentageNum >= 60) { grade = "B+"; remarks = "Good"; }
      else if (percentageNum >= 50) { grade = "B"; remarks = "Above Average"; }
      else if (percentageNum >= 40) { grade = "C"; remarks = "Average"; }
      else { grade = "P"; remarks = "Pass"; }

      setResult({
        percentage: percentageNum,
        cgpa: finalCGPA,
        grade,
        remarks,
        scale
      });

      setLoading(false);

      // Trigger Confetti if good score
      if (percentageNum >= 70) {
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
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  const handleReset = () => {
    setPercentage("");
    setResult(null);
    setWarning("");
    localStorage.removeItem('percentage-cgpa-data');
  };

  const loadExample = () => {
    setScale("10.0");
    setPercentage("85");
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
              From percentage to CGPA in seconds
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

                  {/* Scale Selector */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                      Select Target Grading Scale
                    </label>
                    <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl">
                      {Object.entries(GradeScales).map(([key, data]) => (
                        <button
                          key={key}
                          onClick={() => { setScale(key); setResult(null); }}
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

                  {/* Percentage Input */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-500" /> Enter Your Percentage
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

                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <label htmlFor="percentage" className="text-xs font-medium text-slate-500 uppercase tracking-wider">Percentage (%)</label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">Your aggregate percentage from all semesters</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="relative">
                          <Input
                            id="percentage"
                            type="number"
                            placeholder="e.g., 85"
                            step="0.01"
                            min="0"
                            max="100"
                            inputMode="decimal"
                            value={percentage}
                            onChange={(e) => { setPercentage(e.target.value); setWarning(""); }}
                            className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 font-semibold text-lg transition-all pr-12"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                            <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  {warning && (
                    <Alert variant="destructive" className="border-2 rounded-xl">
                      <AlertCircle className="h-5 w-5" />
                      <AlertDescription className="font-semibold">{warning}</AlertDescription>
                    </Alert>
                  )}

                  {/* Calculate Button */}
                  <Button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Calculating...
                      </div>
                    ) : (
                      "Calculate My CGPA"
                    )}
                  </Button>

                  {/* Keyboard Hint */}
                  {percentage && !loading && (
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                      Press <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 font-mono text-xs">Enter ↵</kbd> to calculate
                    </p>
                  )}

                  {/* Disclaimer */}
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="flex gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 dark:text-amber-300">
                        <strong>Note:</strong> This is an approximate conversion. Different universities use different formulas. Always verify with your institution.
                      </p>
                    </div>
                  </div>

                </div>
              </GlassCard>

              {/* Ad Slot */}
              <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} format="auto" className="rounded-2xl overflow-hidden" />

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
                        <p className="text-blue-100/80 font-medium">from {result.percentage}% on {scale} Scale</p>
                      </div>

                      <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                        <div className="p-6 space-y-4">
                          {(() => {
                            const perf = getPerformanceDetails(result.percentage);
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
                                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.percentage}%</p>
                                  <p className="text-xs text-slate-500">Input</p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Performance Breakdown */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Scale</p>
                              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{scale}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">Divisor</p>
                              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">÷{GradeScales[scale].percentageDivisor}</p>
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
                              text: `I got ${result.cgpa} CGPA from ${result.percentage}%!`,
                              url: "https://jntuhresults.theskypedia.com/percentage-to-cgpa-calculator",
                              title: "Percentage to CGPA Calculator",
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
                        Select your scale and enter your percentage on the left, and we'll show your CGPA instantly.
                      </p>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* How to Use Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <GlassCard className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Use This Calculator</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    num: "1",
                    title: "Select Your Scale",
                    desc: "Choose the target grading scale (10.0 for JNTUH, 4.0 for US, etc.)",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    num: "2",
                    title: "Enter Percentage",
                    desc: "Input your aggregate percentage. Try the example to see how it works",
                    color: "from-indigo-500 to-purple-500"
                  },
                  {
                    num: "3",
                    title: "Get CGPA",
                    desc: "View your converted CGPA with grade and performance analysis",
                    color: "from-purple-500 to-pink-500"
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className={`flex-none w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-xl font-bold text-white">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.section>

          {/* Understanding CGPA Scales */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Understanding CGPA Scales</h2>
              <p className="text-slate-600 dark:text-slate-400">Different regions use different grading systems</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  scale: "10.0 Scale",
                  region: "India / JNTUH",
                  desc: "Used by most Indian universities. Divide percentage by 9.5 to get CGPA.",
                  formula: "CGPA = % ÷ 9.5",
                  color: "blue"
                },
                {
                  scale: "4.0 Scale",
                  region: "US / Canada",
                  desc: "Standard in North American universities. Divide percentage by 25.",
                  formula: "CGPA = % ÷ 25",
                  color: "indigo"
                },
                {
                  scale: "5.0 Scale",
                  region: "Germany / Europe",
                  desc: "Common in European universities. Divide percentage by 20.",
                  formula: "CGPA = % ÷ 20",
                  color: "purple"
                }
              ].map((item, idx) => (
                <GlassCard key={idx} className="p-6 hover:shadow-xl transition-all">
                  <div className={`inline-block px-3 py-1 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/20 mb-3`}>
                    <span className={`text-sm font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.scale}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.region}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{item.desc}</p>
                  <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <code className="text-sm font-mono text-slate-900 dark:text-white">{item.formula}</code>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.section>

          {/* Pro Tip */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlassCard className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-none w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">💡 Important Note</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    This conversion is <strong>approximate</strong>. Different universities have different conversion formulas. Some use CGPA = (% - 0.5) × 10, others use % ÷ 9.5.
                    Always check with your institution's official policy before using converted values for applications or official documents.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Related Calculators */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Related Tools</h2>
              <p className="text-slate-600 dark:text-slate-400">Explore more academic calculators</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "CGPA to Percentage",
                  desc: "Convert CGPA back to percentage",
                  link: "/cgpa-percentage-converter",
                  icon: Percent,
                  color: "blue"
                },
                {
                  title: "Marks to Percentage",
                  desc: "Calculate your marks percentage",
                  link: "/marks-percentage-calculator",
                  icon: Calculator,
                  color: "indigo"
                },
                {
                  title: "SGPA to CGPA",
                  desc: "Calculate cumulative GPA",
                  link: "/sgpa-to-cgpa-calculator",
                  icon: Award,
                  color: "purple"
                }
              ].map((tool, idx) => (
                <GlassCard key={idx} className="p-6 h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 hover:border-t-blue-500">
                  <Link href={tool.link} className="block">
                    <div className={`w-12 h-12 rounded-xl bg-${tool.color}-100 dark:bg-${tool.color}-900/20 flex items-center justify-center mb-4`}>
                      <tool.icon className={`w-6 h-6 text-${tool.color}-600 dark:text-${tool.color}-400`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tool.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tool.desc}</p>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQSectionDynamic faqs={percentageFaqs} />
          </div>

        </main>
      </div>
    </TooltipProvider>
  );
}
