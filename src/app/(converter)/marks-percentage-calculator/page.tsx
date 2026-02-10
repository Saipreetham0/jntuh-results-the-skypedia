"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  Trophy,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Star,
  Share2,
  HelpCircle,
  BookOpen,
  Lightbulb,
  Target
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
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
}

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

export default function MarksPercentageCalculator() {
  // State
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [obtainedMarks, setObtainedMarks] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('marks-percentage-data');
    if (savedData) {
      try {
        const { totalMarks: savedTotal, obtainedMarks: savedObtained } = JSON.parse(savedData);
        if (savedTotal && savedObtained) {
          setTotalMarks(savedTotal);
          setObtainedMarks(savedObtained);
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (totalMarks && obtainedMarks) {
      localStorage.setItem('marks-percentage-data', JSON.stringify({ totalMarks, obtainedMarks }));
    }
  }, [totalMarks, obtainedMarks]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading && totalMarks && obtainedMarks) {
        handleCalculate();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [totalMarks, obtainedMarks, loading]);

  // SEO Structured Data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Percentage from Marks",
    "description": "Simple guide to calculating percentage from obtained marks and total marks.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Total Marks",
        "text": "Input the maximum marks for your exam or test."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Obtained Marks",
        "text": "Input the marks you scored."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate",
        "text": "Click calculate to get your percentage."
      }
    ]
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Marks to Percentage Calculator",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const marksFaqs = [
    {
      question: "How is percentage calculated from marks?",
      answer: "Percentage = (Obtained Marks / Total Marks) × 100. For example, if you scored 425 out of 500, your percentage is (425/500) × 100 = 85%."
    },
    {
      question: "What is a good percentage in exams?",
      answer: "Generally, 85%+ is considered excellent, 70-85% is good, 60-70% is above average, and 50-60% is average. Requirements vary by institution."
    },
    {
      question: "Can I convert my percentage to CGPA?",
      answer: "Yes! Use our Percentage to CGPA calculator to convert your percentage to the corresponding CGPA on your grading scale."
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
    const totalMarksNum = parseFloat(totalMarks);
    const obtainedMarksNum = parseFloat(obtainedMarks);

    if (!totalMarks || !obtainedMarks) {
      setWarning("Please enter both total marks and obtained marks");
      return;
    }

    if (isNaN(totalMarksNum) || isNaN(obtainedMarksNum) || totalMarksNum <= 0 || obtainedMarksNum < 0) {
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
        remarks
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
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  const handleReset = () => {
    setTotalMarks("");
    setObtainedMarks("");
    setResult(null);
    setWarning("");
    localStorage.removeItem('marks-percentage-data');
  };

  const loadExample = () => {
    setTotalMarks("500");
    setObtainedMarks("425");
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
              Calculate Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Percentage</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              From marks to percentage in seconds
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

                  {/* Marks Input */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-indigo-500" /> Enter Your Marks
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

                    {/* Total Marks */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <label htmlFor="totalMarks" className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Marks</label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">Maximum marks for the exam or test</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="totalMarks"
                          type="number"
                          placeholder="e.g., 500"
                          inputMode="numeric"
                          value={totalMarks}
                          onChange={(e) => { setTotalMarks(e.target.value); setWarning(""); }}
                          className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 font-semibold text-lg transition-all"
                        />
                      </div>
                    </div>

                    {/* Obtained Marks */}
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <label htmlFor="obtainedMarks" className="text-xs font-medium text-slate-500 uppercase tracking-wider">Obtained Marks</label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">Marks you scored in the exam</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="obtainedMarks"
                          type="number"
                          placeholder="e.g., 425"
                          inputMode="numeric"
                          value={obtainedMarks}
                          onChange={(e) => { setObtainedMarks(e.target.value); setWarning(""); }}
                          className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20 font-semibold text-lg transition-all"
                        />
                      </div>
                      {/* Live Preview */}
                      {totalMarks && obtainedMarks && !warning && parseFloat(obtainedMarks) <= parseFloat(totalMarks) && (
                        <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            Preview: {((parseFloat(obtainedMarks) / parseFloat(totalMarks)) * 100).toFixed(1)}%
                          </p>
                        </div>
                      )}
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
                      "Calculate My Percentage"
                    )}
                  </Button>

                  {/* Keyboard Hint */}
                  {totalMarks && obtainedMarks && !loading && (
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                      Press <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 font-mono text-xs">Enter ↵</kbd> to calculate
                    </p>
                  )}

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

                        <p className="font-medium text-blue-100 uppercase tracking-widest text-xs mb-4">🎉 Your Percentage is Ready!</p>
                        <div className="relative inline-block">
                          <h2 className="text-8xl md:text-9xl font-bold tracking-tighter mb-3 drop-shadow-lg">
                            <AnimatedCounter value={result.percentage} />
                            <span className="text-5xl">%</span>
                          </h2>
                          {/* Star Rating */}
                          <div className="flex justify-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => {
                              const filled = (result.percentage / 100) * 5 > i;
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
                                style={{ width: `${result.percentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-blue-100/60 mt-1">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-blue-100/80 font-medium">{result.obtainedMarks} out of {result.totalMarks} marks</p>
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
                                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.percentage.toFixed(2)}%</p>
                                  <p className="text-xs text-slate-500">Score</p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Performance Breakdown */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Total Marks</p>
                              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.totalMarks}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">Obtained</p>
                              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{result.obtainedMarks}</p>
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
                              text: `I scored ${result.percentage.toFixed(2)}% (${result.obtainedMarks}/${result.totalMarks})!`,
                              url: "https://jntuhresults.theskypedia.com/marks-percentage-calculator",
                              title: "Marks to Percentage Calculator",
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
                        <Target className="w-10 h-10 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Ready to Calculate?</h3>
                      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                        Enter your marks on the left, and we'll show your percentage instantly.
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
                    title: "Enter Total Marks",
                    desc: "Input the maximum marks for your exam or test",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    num: "2",
                    title: "Enter Obtained Marks",
                    desc: "Input the marks you scored. Preview appears automatically",
                    color: "from-indigo-500 to-purple-500"
                  },
                  {
                    num: "3",
                    title: "Get Percentage",
                    desc: "View your percentage with grade and performance analysis",
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

          {/* Understanding Grades Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Understanding Your Grade</h2>
              <p className="text-slate-600 dark:text-slate-400">Percentage ranges and their meanings</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { range: "90-100%", grade: "O/A+", desc: "Outstanding Performance", color: "emerald" },
                { range: "80-90%", grade: "A", desc: "Excellent Work", color: "blue" },
                { range: "70-80%", grade: "B+", desc: "Very Good", color: "indigo" },
                { range: "60-70%", grade: "B", desc: "Good Performance", color: "green" },
                { range: "50-60%", grade: "C", desc: "Average Work", color: "yellow" },
                { range: "Below 50%", grade: "F", desc: "Needs Improvement", color: "red" }
              ].map((item, idx) => (
                <GlassCard key={idx} className="p-6 hover:shadow-xl transition-all">
                  <div className={`inline-block px-3 py-1 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/20 mb-3`}>
                    <span className={`text-sm font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.range}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.grade}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">💡 Pro Tip for Students</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Keep track of your marks regularly! The formula is simple: <strong>(Obtained Marks ÷ Total Marks) × 100</strong>.
                    Knowing your percentage helps you understand where you stand and set realistic academic goals.
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
                  desc: "Convert CGPA to percentage scale",
                  link: "/cgpa-percentage-converter",
                  icon: Calculator,
                  color: "blue"
                },
                {
                  title: "Percentage to CGPA",
                  desc: "Convert percentage to CGPA",
                  link: "/percentage-to-cgpa-calculator",
                  icon: TrendingUp,
                  color: "indigo"
                },
                {
                  title: "SGPA to CGPA",
                  desc: "Calculate cumulative GPA",
                  link: "/sgpa-to-cgpa-calculator",
                  icon: Trophy,
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
            <FAQSectionDynamic faqs={marksFaqs} />
          </div>

        </main>
      </div>
    </TooltipProvider>
  );
}
