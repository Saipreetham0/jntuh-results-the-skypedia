"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveAd, InContentAd, StickyAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";
import { Calculator, Trophy, TrendingUp, AlertCircle } from "lucide-react";

interface CalculationResult {
  percentage: number;
  cgpa: number;
  grade: string;
  remarks: string;
}

interface GradeScale {
  max: number;
  percentageDivisor: number;
}

const GradeScales: Record<string, GradeScale> = {
  "4.0": { max: 4.0, percentageDivisor: 25 },
  "5.0": { max: 5.0, percentageDivisor: 20 },
  "10.0": { max: 10.0, percentageDivisor: 9.5 },
};

export default function PercentageToCGPACalculator() {
  const [percentage, setPercentage] = useState<string>("");
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
      "A+": "Outstanding Performance! 🌟",
      A: "Excellent Performance! ⭐",
      B: "Good Performance! 👏",
      C: "Average Performance 📚",
      D: "Below Average 💪",
      F: "Needs Improvement 📝",
    };
    return remarks[grade as keyof typeof remarks] || "";
  };

  const handleSubmit = () => {
    setWarning("");
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

    // Simulate calculation delay
    setTimeout(() => {
      const cgpa = +(percentageNum / currentScale.percentageDivisor).toFixed(2);
      const grade = calculateGrade(percentageNum);
      const remarks = getRemarks(grade);

      // Ensure CGPA doesn't exceed scale maximum
      const finalCGPA = Math.min(cgpa, currentScale.max);

      setResult({
        percentage: percentageNum,
        cgpa: finalCGPA,
        grade,
        remarks,
      });
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setPercentage("");
    setResult(null);
    setWarning("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto relative">
        {/* Sticky Sidebar Ad - Desktop Only */}
        <div className="hidden lg:block absolute -right-32 top-0 w-32">
          <StickyAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_STICKY} position="sidebar" />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 rounded-xl bg-[#1C61E7] flex items-center justify-center mr-4 shadow-md">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  CGPA Calculator
                </h1>
                <p className="text-sm text-[#1C61E7] font-semibold mt-0.5">Percentage to CGPA</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
              Convert your percentage to CGPA across different grading scales
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
                  Calculate Your CGPA
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Select Target CGPA Scale
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
                      <SelectItem value="4.0">4.0 Scale</SelectItem>
                      <SelectItem value="5.0">5.0 Scale</SelectItem>
                      <SelectItem value="10.0">10.0 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="percentage"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Percentage (0-100)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      id="percentage"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder="Enter your percentage (e.g., 85.5)"
                      className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 pr-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 text-base font-semibold">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                {warning && (
                  <Alert variant="destructive" className="border-2">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription className="font-semibold">{warning}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 h-12 bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? "Calculating..." : "Calculate"}
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

          {result && (
            <Card className="mt-8 shadow-xl border-l-4 border-l-[#21C15E] rounded-xl overflow-hidden animate-fade-in">
              <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#21C15E] rounded-lg shadow-md">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your Results
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-[#1C61E7]" />
                      <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Percentage
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-[#1C61E7]">
                      {result.percentage.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-4 h-4 text-[#21C15E]" />
                      <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        CGPA ({scale} scale)
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-[#21C15E]">
                      {result.cgpa.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Grade
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {result.grade}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Performance Remarks
                    </h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {result.remarks}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mid Ad */}
          <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} className="my-8" />
        </div>
      </div>

      {/* Bottom Ad */}
      <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} format="auto" className="mt-8" />
    </div>
  );
}
