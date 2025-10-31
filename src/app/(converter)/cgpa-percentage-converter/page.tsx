"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, ArrowRight, TrendingUp, Info, Award, Percent, RefreshCw } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-[#1C61E7]/10 rounded-full text-[#1C61E7] text-sm font-medium">
            <Calculator className="w-4 h-4 mr-2" />
            Conversion Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CGPA to Percentage Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert your CGPA to percentage across multiple international grading scales with instant results
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="shadow-xl border-t-4 border-[#1C61E7] animate-slide-up">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#1C61E7]" />
              </div>
              Convert Your CGPA
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select your grading scale and enter your CGPA to get instant conversion
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grading Scale Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                Grading Scale
              </label>
              <Select
                value={scale}
                onValueChange={(value) => {
                  setScale(value);
                  handleReset();
                }}
              >
                <SelectTrigger className="w-full h-12 text-base border-2 focus:ring-[#1C61E7] focus:border-[#1C61E7]">
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
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  Selected scale uses a multiplier of <span className="font-semibold">{GradeScales[scale].percentageMultiplier}</span> for conversion
                </p>
              </div>
            </div>

            {/* CGPA Input */}
            <div className="space-y-3">
              <label htmlFor="cgpa" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                Your CGPA (0 - {GradeScales[scale].max})
              </label>
              <div className="relative">
                <Input
                  type="number"
                  id="cgpa"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  step="0.01"
                  min="0"
                  max={GradeScales[scale].max}
                  className="h-12 text-lg border-2 focus:ring-[#1C61E7] focus:border-[#1C61E7] pr-12"
                  placeholder={`e.g., ${(GradeScales[scale].max * 0.85).toFixed(2)}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Warning Alert */}
            {warning && (
              <Alert variant="destructive" className="animate-shake">
                <AlertDescription className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {warning}
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-12 text-base bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-semibold shadow-lg shadow-[#1C61E7]/25"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    Convert
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card className="mt-8 shadow-xl animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-[#21C15E]/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#21C15E]" />
                </div>
                Conversion Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Result Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CGPA Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1C61E7]/10 to-[#1C61E7]/5 rounded-2xl p-6 border-2 border-[#1C61E7]/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1C61E7]/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="w-5 h-5 text-[#1C61E7]" />
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Your CGPA
                      </h3>
                    </div>
                    <p className="text-5xl font-bold text-[#1C61E7] mb-2">
                      {result.cgpa.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      on {scale} scale
                    </p>
                  </div>
                </div>

                {/* Percentage Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#21C15E]/10 to-[#21C15E]/5 rounded-2xl p-6 border-2 border-[#21C15E]/20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#21C15E]/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Percent className="w-5 h-5 text-[#21C15E]" />
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Percentage
                      </h3>
                    </div>
                    <p className="text-5xl font-bold text-[#21C15E] mb-2">
                      {result.percentage.toFixed(2)}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      equivalent marks
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Grade Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border-2 border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Letter Grade
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1C61E7]">{result.grade}</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Grade {result.grade}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {result.remarks}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Level Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border-2 border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Performance Level
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl ${getPerformanceLevel(result.percentage).bgColor} flex items-center justify-center`}>
                      <TrendingUp className={`w-7 h-7 ${getPerformanceLevel(result.percentage).color}`} />
                    </div>
                    <div>
                      <p className={`text-lg font-semibold ${getPerformanceLevel(result.percentage).color}`}>
                        {getPerformanceLevel(result.percentage).label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Academic standing
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Formula Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Conversion Formula
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Percentage = CGPA × {GradeScales[scale].percentageMultiplier}
                      <span className="ml-2 text-xs">
                        ({result.cgpa.toFixed(2)} × {GradeScales[scale].percentageMultiplier} = {result.percentage.toFixed(2)}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Calculators */}
        <Card className="mt-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Related Calculators</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore more academic calculation tools
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/percentage-to-cgpa-calculator"
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center group-hover:bg-[#1C61E7] transition-colors">
                    <ArrowRight className="w-5 h-5 text-[#1C61E7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#1C61E7] transition-colors mb-1">
                      Percentage to CGPA
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Convert percentage to CGPA
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/cgpa-calculator"
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#21C15E] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#21C15E]/10 flex items-center justify-center group-hover:bg-[#21C15E] transition-colors">
                    <Calculator className="w-5 h-5 text-[#21C15E] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#21C15E] transition-colors mb-1">
                      CGPA Calculator
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Calculate your CGPA
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/sgpa-to-cgpa-calculator"
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center group-hover:bg-[#1C61E7] transition-colors">
                    <TrendingUp className="w-5 h-5 text-[#1C61E7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#1C61E7] transition-colors mb-1">
                      SGPA to CGPA
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Convert SGPA to CGPA
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}