"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, TrendingUp, Trophy, AlertCircle } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd, InContentAd, StickyAd } from "@/components/Adsense";
import AD_SLOTS from "@/config/adSlots";

interface CalculationResult {
  cgpa: number;
  percentage: number;
  grade: string;
  remarks: string;
}

interface GradeScale {
  max: number;
  percentageMultiplier: number;
  description: string;
}

const GradeScales: Record<string, GradeScale> = {
  "4.0": { max: 4.0, percentageMultiplier: 25, description: "US Grading System" },
  "5.0": { max: 5.0, percentageMultiplier: 20, description: "German Grading System" },
  "10.0": { max: 10.0, percentageMultiplier: 9.5, description: "Indian Grading System (JNTUH)" }
};

export default function CGPACalculator() {
  const [cgpa, setCgpa] = useState<string>("");
  const [scale, setScale] = useState<string>("10.0");
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const getRemarks = (grade: string): string => {
    const remarks = {
      "A+": "Outstanding Performance",
      A: "Excellent Performance",
      B: "Good Performance",
      C: "Average Performance",
      D: "Below Average",
      F: "Needs Improvement"
    };
    return remarks[grade as keyof typeof remarks] || "";
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90)
      return { label: "Outstanding", color: "text-[#21C15E]", bgColor: "bg-[#21C15E]/10", borderColor: "border-[#21C15E]/30" };
    if (percentage >= 80)
      return { label: "Excellent", color: "text-[#1C61E7]", bgColor: "bg-[#1C61E7]/10", borderColor: "border-[#1C61E7]/30" };
    if (percentage >= 70)
      return { label: "Very Good", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" };
    if (percentage >= 60)
      return { label: "Good", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
    if (percentage >= 50)
      return { label: "Average", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
    return { label: "Below Average", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
  };

  const handleSubmit = () => {
    setWarning("");
    const cgpaNum = parseFloat(cgpa);
    const currentScale = GradeScales[scale];

    if (!cgpa) {
      setWarning("Please enter your CGPA");
      return;
    }

    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > currentScale.max) {
      setWarning(`Please enter a valid CGPA between 0 and ${currentScale.max}`);
      return;
    }

    setLoading(true);

    // Simulate calculation delay
    setTimeout(() => {
      const percentage = cgpaNum * currentScale.percentageMultiplier;
      const grade = calculateGrade(percentage);
      const remarks = getRemarks(grade);

      setResult({
        cgpa: cgpaNum,
        percentage,
        grade,
        remarks
      });
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setCgpa("");
    setResult(null);
    setWarning("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto relative">
        {/* Sticky Sidebar Ad - Desktop Only */}
        <div className="hidden lg:block absolute -right-32 top-0 w-32">
          <StickyAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_STICKY} position="sidebar" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700">
            <div className="w-14 h-14 rounded-xl bg-[#1C61E7] flex items-center justify-center mr-4 shadow-md">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                CGPA Converter
              </h1>
              <p className="text-sm text-[#1C61E7] font-semibold mt-0.5">To Percentage</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
            Convert your CGPA to percentage across multiple international grading scales
          </p>
        </div>

        {/* Top Ad Banner */}
        <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} format="horizontal" className="mb-8" />

        {/* Calculator Card */}
        <Card className="shadow-xl border-l-4 border-l-[#1C61E7] rounded-xl overflow-hidden">
          <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1C61E7] rounded-lg shadow-md">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Convert Your CGPA
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
            {/* Grading Scale Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                Grading Scale
              </label>
              <Select
                value={scale}
                onValueChange={(value) => {
                  setScale(value);
                  handleReset();
                }}
              >
                <SelectTrigger className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20">
                  <SelectValue placeholder="Select scale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10.0">
                    <div className="flex flex-col">
                      <span className="font-medium">10.0 Scale</span>
                      <span className="text-xs text-gray-500">{GradeScales["10.0"].description}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="4.0">
                    <div className="flex flex-col">
                      <span className="font-medium">4.0 Scale</span>
                      <span className="text-xs text-gray-500">{GradeScales["4.0"].description}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="5.0">
                    <div className="flex flex-col">
                      <span className="font-medium">5.0 Scale</span>
                      <span className="text-xs text-gray-500">{GradeScales["5.0"].description}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CGPA Input */}
            <div>
              <label htmlFor="cgpa" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                Your CGPA (0 - {GradeScales[scale].max})
              </label>
              <Input
                type="number"
                id="cgpa"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                step="0.01"
                min="0"
                max={GradeScales[scale].max}
                placeholder={`e.g., ${(GradeScales[scale].max * 0.85).toFixed(2)}`}
                className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Multiplier: {GradeScales[scale].percentageMultiplier}x ({GradeScales[scale].description})
              </p>
            </div>

            {/* Warning Alert */}
            {warning && (
              <Alert variant="destructive" className="border-2">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="font-semibold">{warning}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-12 bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? "Converting..." : "Convert"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-8 border-2 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold"
              >
                Reset
              </Button>
            </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card className="mt-8 shadow-xl border-l-4 border-l-[#21C15E] rounded-xl overflow-hidden animate-fade-in">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#21C15E] rounded-lg shadow-md">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Conversion Results
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* CGPA Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4 text-[#1C61E7]" />
                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Your CGPA
                    </h3>
                  </div>
                  <p className="text-4xl font-bold text-[#1C61E7] mb-1">
                    {result.cgpa.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    on {scale} scale
                  </p>
                </div>

                {/* Percentage Card */}
                <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#21C15E]" />
                    <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Percentage
                    </h3>
                  </div>
                  <p className="text-4xl font-bold text-[#21C15E] mb-1">
                    {result.percentage.toFixed(2)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    equivalent marks
                  </p>
                </div>

                {/* Grade Card */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Letter Grade
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {result.grade}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.remarks}
                  </p>
                </div>

                {/* Performance Level Card */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Performance Level
                  </h3>
                  <p className={`text-3xl font-bold mb-1 ${getPerformanceLevel(result.percentage).color}`}>
                    {getPerformanceLevel(result.percentage).label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Academic standing
                  </p>
                </div>

                {/* Conversion Formula Info */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 col-span-2 shadow-md">
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Conversion Formula
                  </h3>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {result.cgpa.toFixed(2)} × {GradeScales[scale].percentageMultiplier} = {result.percentage.toFixed(2)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {GradeScales[scale].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mid Ad */}
        <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} className="my-8" />

        {/* Related Calculators */}
        <Card className="mt-8 shadow-xl border-2 border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Related Calculators</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore more academic calculation tools
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/percentage-to-cgpa-calculator"
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-[#1C61E7] flex items-center justify-center mb-3 shadow-md">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Percentage to CGPA
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Convert percentage to CGPA
                  </p>
                </div>
              </Link>

              <Link
                href="/cgpa-calculator"
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#21C15E] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-[#21C15E] flex items-center justify-center mb-3 shadow-md">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    CGPA Calculator
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Calculate your CGPA
                  </p>
                </div>
              </Link>

              <Link
                href="/sgpa-to-cgpa-calculator"
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-lg bg-[#1C61E7] flex items-center justify-center mb-3 shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    SGPA to CGPA
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Convert SGPA to CGPA
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} format="auto" className="mt-8" />
        </div>
      </div>
    </div>
  );
}