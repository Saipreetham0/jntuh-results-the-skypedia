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
import { Plus, Trash2, Calculator, TrendingUp, Info, Award, RefreshCw, GraduationCap } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-[#1C61E7]/10 rounded-full text-[#1C61E7] text-sm font-medium">
            <GraduationCap className="w-4 h-4 mr-2" />
            Academic Performance Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SGPA to CGPA Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate your cumulative GPA by converting multiple semester GPAs with weighted credits
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="shadow-xl border-t-4 border-[#1C61E7] animate-slide-up">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#1C61E7]" />
              </div>
              Calculate Your CGPA
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your semester-wise SGPA and credits to calculate overall CGPA
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scale Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                CGPA Scale
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
                  <SelectItem value="10.0">10.0 Scale (JNTUH)</SelectItem>
                  <SelectItem value="4.0">4.0 Scale</SelectItem>
                  <SelectItem value="5.0">5.0 Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Semester Inputs */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                Semester Details
              </label>
              {semesters.map((semester, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-[#1C61E7]">
                      Semester {index + 1}
                    </span>
                    {index > 0 && (
                      <Button
                        onClick={() => handleRemoveSemester(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                        className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                        className="h-11 border-2 focus:ring-[#1C61E7] focus:border-[#1C61E7]"
                        placeholder={`e.g., ${(GradeScales[scale].max * 0.85).toFixed(2)}`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`credits-${index}`}
                        className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                        className="h-11 border-2 focus:ring-[#1C61E7] focus:border-[#1C61E7]"
                        placeholder="e.g., 20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Semester Button */}
            <Button
              onClick={handleAddSemester}
              variant="outline"
              className="w-full h-12 border-2 border-dashed border-[#21C15E] text-[#21C15E] hover:bg-[#21C15E]/5 hover:border-[#21C15E] font-semibold"
            >
              <Plus size={20} className="mr-2" />
              Add Another Semester
            </Button>

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
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate CGPA
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
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Result */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 rounded-2xl p-8 border-2 border-[#1C61E7]/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1C61E7]/10 rounded-full blur-3xl" />
                <div className="relative text-center">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Your CGPA
                  </p>
                  <div className="text-6xl font-bold text-[#1C61E7] mb-2">
                    {result.cgpa.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    on {scale} scale
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Grade */}
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

                {/* Performance Level */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border-2 border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Performance Level
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl ${getPerformanceLevel(result.cgpa, scale).bgColor} flex items-center justify-center`}>
                      <TrendingUp className={`w-7 h-7 ${getPerformanceLevel(result.cgpa, scale).color}`} />
                    </div>
                    <div>
                      <p className={`text-lg font-semibold ${getPerformanceLevel(result.cgpa, scale).color}`}>
                        {getPerformanceLevel(result.cgpa, scale).label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Academic standing
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Semester Count */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Calculation Details
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      CGPA calculated from <span className="font-semibold">{semesters.length}</span> {semesters.length === 1 ? 'semester' : 'semesters'} with weighted credits
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
                href="/cgpa-calculator"
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center group-hover:bg-[#1C61E7] transition-colors">
                    <Calculator className="w-5 h-5 text-[#1C61E7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#1C61E7] transition-colors mb-1">
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
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#21C15E] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#21C15E]/10 flex items-center justify-center group-hover:bg-[#21C15E] transition-colors">
                    <RefreshCw className="w-5 h-5 text-[#21C15E] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#21C15E] transition-colors mb-1">
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
                className="group p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center group-hover:bg-[#1C61E7] transition-colors">
                    <TrendingUp className="w-5 h-5 text-[#1C61E7] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#1C61E7] transition-colors mb-1">
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
      </div>
    </div>
  );
}
