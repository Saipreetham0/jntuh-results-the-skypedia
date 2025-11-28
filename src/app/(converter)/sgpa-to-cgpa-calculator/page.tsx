"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Calculator, TrendingUp, Info, Award, RefreshCw, GraduationCap, Trophy } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd, InContentAd, StickyAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

interface SemesterData {
  sgpa: string;
  credits: string;
}

interface CalculationResult {
  cgpa: number;
  grade: string;
  remarks: string;
}

interface GradeScale {
  max: number;
}

const GradeScales: Record<string, GradeScale> = {
  "4.0": { max: 4.0 },
  "5.0": { max: 5.0 },
  "10.0": { max: 10.0 },
};

export default function SGPAToCGPACalculator() {
  const [scale, setScale] = useState<string>("10.0");
  const [semesters, setSemesters] = useState<SemesterData[]>([
    { sgpa: "", credits: "" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateGrade = (cgpa: number, scale: string): string => {
    const maxScale = GradeScales[scale].max;
    const percentage = (cgpa / maxScale) * 100;
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
      F: "Needs Improvement",
    };
    return remarks[grade as keyof typeof remarks] || "";
  };

  const getPerformanceLevel = (cgpa: number, scale: string) => {
    const maxScale = GradeScales[scale].max;
    const percentage = (cgpa / maxScale) * 100;

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

  const handleAddSemester = () => {
    setSemesters([...semesters, { sgpa: "", credits: "" }]);
  };

  const handleRemoveSemester = (index: number) => {
    const newSemesters = semesters.filter((_, i) => i !== index);
    setSemesters(newSemesters);
  };

  const handleSemesterChange = (
    index: number,
    field: keyof SemesterData,
    value: string
  ) => {
    const newSemesters = [...semesters];
    newSemesters[index][field] = value;
    setSemesters(newSemesters);
  };

  const handleSubmit = () => {
    setWarning("");
    const currentScale = GradeScales[scale];

    if (semesters.some((sem) => !sem.sgpa || !sem.credits)) {
      setWarning("Please enter SGPA and credits for all semesters");
      return;
    }

    if (
      semesters.some((sem) => {
        const sgpaNum = parseFloat(sem.sgpa);
        return isNaN(sgpaNum) || sgpaNum < 0 || sgpaNum > currentScale.max;
      })
    ) {
      setWarning(
        `Please enter valid SGPA values between 0 and ${currentScale.max}`
      );
      return;
    }

    if (
      semesters.some((sem) => {
        const creditsNum = parseFloat(sem.credits);
        return isNaN(creditsNum) || creditsNum <= 0;
      })
    ) {
      setWarning("Please enter valid credit values (positive numbers)");
      return;
    }

    setLoading(true);

    // Simulate calculation delay
    setTimeout(() => {
      const totalWeightedScore = semesters.reduce((sum, sem) => {
        return sum + parseFloat(sem.sgpa) * parseFloat(sem.credits);
      }, 0);

      const totalCredits = semesters.reduce(
        (sum, sem) => sum + parseFloat(sem.credits),
        0
      );

      const cgpa = totalWeightedScore / totalCredits;
      const grade = calculateGrade(cgpa, scale);
      const remarks = getRemarks(grade);

      setResult({
        cgpa,
        grade,
        remarks,
      });
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setSemesters([{ sgpa: "", credits: "" }]);
    setResult(null);
    setWarning("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto relative">
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
                  SGPA to CGPA
                </h1>
                <p className="text-sm text-[#1C61E7] font-semibold mt-0.5">Calculator</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl mx-auto">
              Calculate your cumulative GPA from semester GPAs with weighted credits
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
                {/* Scale Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    CGPA Scale
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
                      <SelectItem value="10.0">10.0 Scale (JNTUH)</SelectItem>
                      <SelectItem value="4.0">4.0 Scale</SelectItem>
                      <SelectItem value="5.0">5.0 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Semester Inputs */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Semester Details
                  </label>
                  <div className="space-y-4">
                    {semesters.map((semester, index) => (
                      <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-[#1C61E7] uppercase tracking-wide">
                            Semester {index + 1}
                          </span>
                          {index > 0 && (
                            <Button
                              onClick={() => handleRemoveSemester(index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor={`sgpa-${index}`}
                              className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide"
                            >
                              SGPA (0-{GradeScales[scale].max})
                            </label>
                            <Input
                              type="number"
                              id={`sgpa-${index}`}
                              value={semester.sgpa}
                              onChange={(e) =>
                                handleSemesterChange(index, "sgpa", e.target.value)
                              }
                              step="0.01"
                              min="0"
                              max={GradeScales[scale].max}
                              className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20"
                              placeholder={`e.g., ${(GradeScales[scale].max * 0.85).toFixed(2)}`}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`credits-${index}`}
                              className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide"
                            >
                              Credits
                            </label>
                            <Input
                              type="number"
                              id={`credits-${index}`}
                              value={semester.credits}
                              onChange={(e) =>
                                handleSemesterChange(index, "credits", e.target.value)
                              }
                              min="1"
                              className="h-12 text-base font-semibold border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20"
                              placeholder="e.g., 20"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Semester Button */}
                <Button
                  onClick={handleAddSemester}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-[#21C15E] text-[#21C15E] hover:bg-[#21C15E]/5 hover:border-[#21C15E] font-bold"
                >
                  <Plus size={20} className="mr-2" />
                  Add Another Semester
                </Button>

                {/* Warning Alert */}
                {warning && (
                  <Alert variant="destructive" className="border-2">
                    <Info className="h-5 w-5" />
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
                    {loading ? "Calculating..." : "Calculate CGPA"}
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
                    Your Results
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-5">
                  {/* Main CGPA Result */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-md text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-[#1C61E7]" />
                      <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Your CGPA
                      </h3>
                    </div>
                    <p className="text-5xl font-bold text-[#1C61E7] mb-1">
                      {result.cgpa.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      on {scale} scale
                    </p>
                  </div>

                  {/* Grade and Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-[#1C61E7]" />
                        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Letter Grade
                        </h3>
                      </div>
                      <p className="text-4xl font-bold text-[#1C61E7] mb-1">
                        {result.grade}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {result.remarks}
                      </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#21C15E]" />
                        <h3 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Performance Level
                        </h3>
                      </div>
                      <p className={`text-2xl font-bold ${getPerformanceLevel(result.cgpa, scale).color} mb-1`}>
                        {getPerformanceLevel(result.cgpa, scale).label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Academic standing
                      </p>
                    </div>
                  </div>

                  {/* Calculation Details */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Calculation Details
                    </h3>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      CGPA calculated from <span className="text-[#1C61E7]">{semesters.length}</span> {semesters.length === 1 ? 'semester' : 'semesters'} with weighted credits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mid Ad */}
          <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} className="my-8" />

          {/* Related Calculators */}
          <Card className="mt-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
            <CardHeader className="border-b-2 border-gray-200 dark:border-gray-700 pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Related Calculators</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore more academic calculation tools
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/cgpa-calculator"
                  className="group p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1C61E7] flex items-center justify-center shadow-md">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        CGPA Calculator
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Calculate your CGPA
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/cgpa-percentage-converter"
                  className="group p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#21C15E] transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#21C15E] flex items-center justify-center shadow-md">
                      <RefreshCw className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        CGPA to Percentage
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Convert CGPA to %
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/percentage-to-cgpa-calculator"
                  className="group p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1C61E7] flex items-center justify-center shadow-md">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        Percentage to CGPA
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Convert % to CGPA
                      </p>
                    </div>
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
