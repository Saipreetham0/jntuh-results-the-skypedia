"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calculator,
    TrendingUp,
    Award,
    RefreshCw,
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
import { ResponsiveAd } from "@/components/adsense";
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';
import AD_SLOTS from "@/config/adSlots";

// Types & Interfaces
interface CalculationResult {
    cgpa: number;
    percentage: number;
    grade: string;
    remarks: string;
    scale: string;
}

interface GradeScale {
    max: number;
    percentageMultiplier: number;
    label: string;
}

const GradeScales: Record<string, GradeScale> = {
    "10.0": { max: 10.0, percentageMultiplier: 9.5, label: "10.0 Scale (India/JNTUH)" },
    "5.0": { max: 5.0, percentageMultiplier: 20, label: "5.0 Scale" },
    "4.0": { max: 4.0, percentageMultiplier: 25, label: "4.0 Scale (US)" },
};

// Animations
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

export default function CGPAToPercentageCalculator() {
    // State
    const [scale, setScale] = useState<string>("10.0");
    const [cgpa, setCgpa] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [warning, setWarning] = useState<string>("");
    const [result, setResult] = useState<CalculationResult | null>(null);

    // SEO Structured Data
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Convert CGPA to Percentage",
        "description": "Step-by-step guide to converting your Cumulative Grade Point Average (CGPA) to percentage.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Select Grading Scale",
                "text": "Choose the appropriate grading scale (10.0, 5.0, or 4.0) used by your institution."
            },
            {
                "@type": "HowToStep",
                "name": "Enter CGPA",
                "text": "Input your Cumulative Grade Point Average value."
            },
            {
                "@type": "HowToStep",
                "name": "Calculate",
                "text": "Click the 'Calculate Percentage' button to get your precise percentage."
            }
        ]
    };

    const calculatorSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CGPA to Percentage Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    const cgpaFaqs = [
        {
            question: "How to convert CGPA to percentage?",
            answer: "For JNTUH (10.0 scale), multiply CGPA by 9.5. For 4.0 scale, multiply by 25. For 5.0 scale, multiply by 20. Different universities may use different formulas."
        },
        {
            question: "Is the conversion accurate for all universities?",
            answer: "The conversion is approximate. Each university may have its own formula. JNTUH uses (CGPA × 9.5), while many other Indian universities use (CGPA - 0.5) × 10."
        },
        {
            question: "Can I convert percentage back to CGPA?",
            answer: "Yes! You can use our Percentage to CGPA converter tool for reverse calculation."
        }
    ];

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('cgpa-percentage-data');
        if (savedData) {
            try {
                const { cgpa: savedCgpa, scale: savedScale } = JSON.parse(savedData);
                if (savedCgpa) {
                    setCgpa(savedCgpa);
                    setScale(savedScale || "10.0");
                }
            } catch {}
        }
    }, []);

    // Save to localStorage whenever cgpa or scale changes
    useEffect(() => {
        if (cgpa) {
            localStorage.setItem('cgpa-percentage-data', JSON.stringify({ cgpa, scale }));
        }
    }, [cgpa, scale]);

    // Keyboard shortcut: Enter to calculate
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !loading && cgpa) {
                handleCalculate();
            }
        };
        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [cgpa, loading]);

    // Handlers
    const getPerformanceDetails = (percentage: number) => {
        if (percentage >= 90) return { label: "Outstanding", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
        if (percentage >= 80) return { label: "Excellent", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
        if (percentage >= 70) return { label: "Very Good", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
        if (percentage >= 60) return { label: "Good", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
        if (percentage >= 50) return { label: "Average", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
        return { label: "Needs Improvement", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
    };

    const handleCalculate = () => {
        const cgpaNum = parseFloat(cgpa);
        const scaleMax = GradeScales[scale].max;

        // Validation
        if (!cgpa) {
            setWarning("Please enter your CGPA.");
            return;
        }

        if (isNaN(cgpaNum)) {
            setWarning("Please enter a valid CGPA.");
            return;
        }

        if (cgpaNum < 0 || cgpaNum > scaleMax) {
            setWarning(`CGPA must be between 0 and ${scaleMax} for the selected scale.`);
            return;
        }

        setLoading(true);

        // Simulate processing
        setTimeout(() => {
            const percentage = cgpaNum * GradeScales[scale].percentageMultiplier;

            // Calculate Grade
            let grade = "F";
            let remarks = "Needs Improvement";

            const pct = Math.min(percentage, 100);
            if (pct >= 90) { grade = "O"; remarks = "Outstanding"; }
            else if (pct >= 80) { grade = "A+"; remarks = "Excellent"; }
            else if (pct >= 70) { grade = "A"; remarks = "Very Good"; }
            else if (pct >= 60) { grade = "B+"; remarks = "Good"; }
            else if (pct >= 50) { grade = "B"; remarks = "Above Average"; }
            else if (pct >= 40) { grade = "C"; remarks = "Average"; }
            else { grade = "P"; remarks = "Pass"; }

            setResult({
                cgpa: cgpaNum,
                percentage: pct,
                grade,
                remarks,
                scale
            });

            setLoading(false);

            // Trigger Confetti if good score
            if (pct >= 70) {
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

            // Scroll to result on mobile
            if (window.innerWidth < 768) {
                document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 800);
    };

    const handleReset = () => {
        setCgpa("");
        setResult(null);
        setWarning("");
        localStorage.removeItem('cgpa-percentage-data');
    };

    const loadExample = () => {
        setScale("10.0");
        setCgpa("8.5");
    };

    const steps = [
        {
            title: "Select Your Scale",
            desc: "Choose 10.0 for JNTUH/Indian universities, 4.0 for US universities, or 5.0 scale based on your institution's grading system."
        },
        {
            title: "Enter Your CGPA",
            desc: "Input your Cumulative GPA value. You can also tap \"Try Example\" to see how the calculator works with a sample value."
        },
        {
            title: "Get Your Percentage",
            desc: "Hit Calculate (or press Enter) to instantly see your converted percentage along with your grade and performance analysis."
        }
    ];

    const grades = [
        { range: "90 – 100%", grade: "O", label: "Outstanding", dot: "bg-emerald-400", color: "text-emerald-600 dark:text-emerald-400" },
        { range: "80 – 89%", grade: "A+", label: "Excellent", dot: "bg-blue-400", color: "text-blue-600 dark:text-blue-400" },
        { range: "70 – 79%", grade: "A", label: "Very Good", dot: "bg-indigo-400", color: "text-indigo-600 dark:text-indigo-400" },
        { range: "60 – 69%", grade: "B+", label: "Good", dot: "bg-green-400", color: "text-green-600 dark:text-green-400" },
        { range: "50 – 59%", grade: "B", label: "Above Average", dot: "bg-yellow-400", color: "text-yellow-600 dark:text-yellow-400" },
        { range: "40 – 49%", grade: "C", label: "Average", dot: "bg-orange-400", color: "text-orange-600 dark:text-orange-400" },
        { range: "Below 40%", grade: "P", label: "Pass / Needs Improvement", dot: "bg-red-400", color: "text-red-600 dark:text-red-400" },
    ];

    const relatedCalculators = [
        {
            title: "Percentage to CGPA",
            desc: "Convert percentage back to CGPA on any scale.",
            link: "/percentage-to-cgpa-calculator",
            Icon: Calculator,
        },
        {
            title: "Marks to Percentage",
            desc: "Calculate your overall marks percentage easily.",
            link: "/marks-percentage-calculator",
            Icon: TrendingUp,
        },
        {
            title: "SGPA to CGPA",
            desc: "Combine semester GPAs into your cumulative GPA.",
            link: "/sgpa-to-cgpa-calculator",
            Icon: Award,
        },
    ];

    return (
        <TooltipProvider>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

                {/* Page Header */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                        {/* Back link */}
                        <Link
                            href="/calculators"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 uppercase tracking-[0.1em] mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" /> All Calculators
                        </Link>
                        {/* Eyebrow */}
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">CGPA Calculator</p>
                        {/* Heading */}
                        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
                            CGPA to Percentage Converter
                        </h1>
                        {/* Subtitle */}
                        <p className="text-gray-500 dark:text-gray-400 text-base mb-5">Official JNTUH formula — instant, free conversion.</p>
                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            {["Free", "Instant Results", "JNTUH R22 · R20 · R18", "All Scales Supported"].map(b => (
                                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[11px] font-bold text-gray-600 dark:text-gray-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />{b}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* 2-col layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

                        {/* Left: Calculator Card */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="lg:col-span-3"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6">

                                {/* Scale Selector */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400 mb-3">Grading Scale</p>
                                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl gap-1">
                                        {Object.entries(GradeScales).map(([key, data]) => (
                                            <button
                                                key={key}
                                                onClick={() => { setScale(key); setResult(null); }}
                                                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${
                                                    scale === key
                                                        ? "bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm"
                                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                                }`}
                                            >
                                                {key}
                                                <span className="block text-[10px] font-medium opacity-60 mt-0.5">{data.label.split(" ")[0]} Scale</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CGPA Input */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label htmlFor="cgpa" className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">
                                            Your CGPA
                                        </label>
                                        <button
                                            onClick={loadExample}
                                            className="text-[11px] font-bold text-[#1C61E7] hover:text-[#1a56d1] transition-colors"
                                        >
                                            Try Example
                                        </button>
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <input
                                                id="cgpa"
                                                type="number"
                                                placeholder="e.g. 8.5"
                                                step="0.01"
                                                inputMode="decimal"
                                                value={cgpa}
                                                onChange={(e) => { setCgpa(e.target.value); setWarning(""); }}
                                                className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7]/50 transition-all"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-sm">Your Cumulative Grade Point Average — overall GPA across all semesters</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>

                                {/* Warning */}
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
                                    className="w-full bg-[#1C61E7] hover:bg-[#1a56d1] active:scale-[0.99] text-white font-display font-bold py-4 rounded-xl text-sm shadow-lg shadow-[#1C61E7]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Calculating…
                                        </span>
                                    ) : (
                                        "Calculate My Percentage"
                                    )}
                                </button>

                                {/* Keyboard hint */}
                                {cgpa && !loading && (
                                    <p className="text-center text-xs text-gray-400">
                                        Press{" "}
                                        <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-[11px]">
                                            Enter ↵
                                        </kbd>{" "}
                                        to calculate
                                    </p>
                                )}
                            </div>

                            {/* Ad Slot */}
                            <div className="mt-6">
                                <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} format="auto" className="rounded-2xl overflow-hidden" />
                            </div>
                        </motion.div>

                        {/* Right: Result Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:col-span-2 lg:sticky lg:top-6"
                            id="result-section"
                        >
                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    >
                                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                            {/* Blue header */}
                                            <div className="bg-[#1C61E7] px-6 py-8 text-center relative overflow-hidden">
                                                <div
                                                    className="absolute inset-0 opacity-5"
                                                    style={{
                                                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                                                        backgroundSize: "20px 20px"
                                                    }}
                                                />
                                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200 mb-2">Your Percentage</p>
                                                <div className="font-display text-7xl font-black text-white tracking-tight leading-none mb-1">
                                                    <AnimatedCounter value={result.percentage} />
                                                    <span className="text-4xl">%</span>
                                                </div>
                                                <p className="text-blue-200 text-sm mt-2">from {result.cgpa} CGPA · {scale} Scale</p>
                                                {/* Progress bar */}
                                                <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden max-w-xs mx-auto">
                                                    <div
                                                        className="h-full bg-white rounded-full transition-all duration-1000"
                                                        style={{ width: `${Math.min(result.percentage, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                            {/* White body */}
                                            <div className="p-5">
                                                {/* Grade badge */}
                                                <div className={`flex items-center justify-between p-3 rounded-xl mb-4 ${getPerformanceDetails(result.percentage).bg} border ${getPerformanceDetails(result.percentage).border}`}>
                                                    <div>
                                                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">Grade</p>
                                                        <p className={`font-display text-2xl font-black ${getPerformanceDetails(result.percentage).color}`}>{result.grade}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400">Performance</p>
                                                        <p className={`font-bold text-sm ${getPerformanceDetails(result.percentage).color}`}>{result.remarks}</p>
                                                    </div>
                                                </div>
                                                {/* Stats */}
                                                <div className="grid grid-cols-2 gap-3 mb-4">
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-1">Scale</p>
                                                        <p className="font-display font-black text-xl text-gray-900 dark:text-white">{scale}</p>
                                                    </div>
                                                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 mb-1">Multiplier</p>
                                                        <p className="font-display font-black text-xl text-gray-900 dark:text-white">×{GradeScales[scale].percentageMultiplier}</p>
                                                    </div>
                                                </div>
                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleReset}
                                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                    >
                                                        <RefreshCw className="w-3.5 h-3.5" /> Reset
                                                    </button>
                                                    <RWebShare
                                                        data={{
                                                            text: `I got ${result.percentage.toFixed(2)}% from ${result.cgpa} CGPA!`,
                                                            url: "https://jntuhresults.theskypedia.com/cgpa-percentage-converter",
                                                            title: "CGPA to Percentage Calculator",
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
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                                <Percent className="w-7 h-7 text-gray-400" />
                                            </div>
                                            <p className="font-display font-bold text-gray-700 dark:text-gray-300 mb-1">Your result appears here</p>
                                            <p className="text-sm text-gray-400">Enter your CGPA and hit Calculate</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Below sections */}
                    <div className="mt-12 space-y-12">

                        {/* How it works */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">Guide</p>
                            <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">How to use this calculator</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {steps.map((step, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                                        <div className="w-9 h-9 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center mb-4">
                                            <span className="font-display font-black text-sm text-[#1C61E7]">{i + 1}</span>
                                        </div>
                                        <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Grade reference */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">Reference</p>
                            <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">Understanding percentage grades</h2>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
                                {grades.map((g, i) => (
                                    <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className={`w-2.5 h-2.5 rounded-full ${g.dot}`} />
                                            <span className="font-display font-bold text-gray-900 dark:text-white">{g.range}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-right">
                                            <span className={`text-sm font-bold ${g.color}`}>{g.label}</span>
                                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 font-display font-black text-sm text-gray-700 dark:text-gray-300">{g.grade}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Pro tip */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-6 flex items-start gap-4">
                                <div className="flex-none w-10 h-10 rounded-xl bg-amber-400/20 dark:bg-amber-400/10 flex items-center justify-center">
                                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="font-display font-bold text-amber-900 dark:text-amber-300 mb-1">Pro Tip for Students</p>
                                    <p className="text-sm text-amber-800 dark:text-amber-400/80 leading-relaxed">
                                        Different universities use different formulas. For JNTUH, the standard formula is{" "}
                                        <strong>CGPA × 9.5</strong>. Some universities use{" "}
                                        <strong>(CGPA − 0.5) × 10</strong>. Always verify with your institution's official conversion formula for accurate results.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Related calculators */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1C61E7] mb-2">More Tools</p>
                            <h2 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">Related calculators</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {relatedCalculators.map(({ title, desc, link, Icon }) => (
                                    <Link
                                        key={title}
                                        href={link}
                                        className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:border-[#1C61E7]/30 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-[#1C61E7]" />
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#1C61E7] transition-colors" />
                                        </div>
                                        <h3 className="font-display font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>

                        {/* FAQ */}
                        <FAQSectionDynamic faqs={cgpaFaqs} />

                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
