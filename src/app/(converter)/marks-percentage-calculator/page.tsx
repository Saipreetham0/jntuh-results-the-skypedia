"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponsiveAd, InContentAd, StickyAd } from "@/components/Adsense";
import AD_SLOTS from "@/config/adSlots";
import { Calculator, Trophy, TrendingUp, AlertCircle, BookOpen } from "lucide-react";
import Link from "next/link";

interface CalculationResult {
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
}

export default function MarksPercentageCalculator() {
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [obtainedMarks, setObtainedMarks] = useState<string>("");
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

  const getGradeColor = (grade: string) => {
    if (grade === "A+" || grade === "A") return "text-[#21C15E]";
    if (grade === "B") return "text-blue-600";
    if (grade === "C") return "text-yellow-600";
    if (grade === "D") return "text-orange-600";
    return "text-red-600";
  };

  const handleSubmit = () => {
    setWarning("");
    const totalMarksNum = parseFloat(totalMarks);
    const obtainedMarksNum = parseFloat(obtainedMarks);

    if (!totalMarks || !obtainedMarks) {
      setWarning("Please enter both total marks and obtained marks");
      return;
    }

    if (
      isNaN(totalMarksNum) ||
      isNaN(obtainedMarksNum) ||
      totalMarksNum <= 0 ||
      obtainedMarksNum < 0
    ) {
      setWarning("Please enter valid marks");
      return;
    }

    if (obtainedMarksNum > totalMarksNum) {
      setWarning("Obtained marks cannot be greater than total marks");
      return;
    }

    setLoading(true);

    // Simulate calculation delay
    setTimeout(() => {
      const percentage = (obtainedMarksNum / totalMarksNum) * 100;
      const grade = calculateGrade(percentage);
      const remarks = getRemarks(grade);

      setResult({
        totalMarks: totalMarksNum,
        obtainedMarks: obtainedMarksNum,
        percentage,
        grade,
        remarks,
      });
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setTotalMarks("");
    setObtainedMarks("");
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
                  Marks Calculator
                </h1>
                <p className="text-sm text-[#1C61E7] font-semibold mt-0.5">Percentage & Grade</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
              Calculate your percentage and grade based on your marks
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
                  Calculate Your Result
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="totalMarks"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Total Marks
                  </label>
                  <Input
                    type="number"
                    id="totalMarks"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    placeholder="Enter total marks (e.g., 500)"
                    className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="obtainedMarks"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Obtained Marks
                  </label>
                  <Input
                    type="number"
                    id="obtainedMarks"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    placeholder="Enter obtained marks (e.g., 425)"
                    className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 transition-all"
                  />
                  {totalMarks && obtainedMarks && !warning && parseFloat(obtainedMarks) <= parseFloat(totalMarks) && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Preview: {((parseFloat(obtainedMarks) / parseFloat(totalMarks)) * 100).toFixed(2)}%
                    </p>
                  )}
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

          {/* Mid Ad - Between Calculator and Results */}
          {result && <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} className="my-8" />}

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
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Total Marks
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {result.totalMarks}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Obtained Marks
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {result.obtainedMarks}
                    </p>
                  </div>
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
                      <Trophy className="w-4 h-4 text-[#21C15E]" />
                      <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Grade
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-[#21C15E]">
                      {result.grade}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 col-span-2 shadow-md">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Performance Remarks
                    </h3>
                    <p className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
                      {result.remarks}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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
                  href="/cgpa-percentage-converter"
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#1C61E7] flex items-center justify-center mb-3 shadow-md">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      CGPA to Percentage
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Convert CGPA to percentage
                    </p>
                  </div>
                </Link>

                <Link
                  href="/percentage-to-cgpa-calculator"
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#21C15E] transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#21C15E] flex items-center justify-center mb-3 shadow-md">
                      <TrendingUp className="w-6 h-6 text-white" />
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
                  href="/sgpa-to-cgpa-calculator"
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-[#1C61E7] flex items-center justify-center mb-3 shadow-md">
                      <BookOpen className="w-6 h-6 text-white" />
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
