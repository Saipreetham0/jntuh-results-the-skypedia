"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 

interface CalculationResult {
  cgpa: number;
  percentage: number;
  grade: string;
  remarks: string;
}

interface GradeScale {
  max: number;
  percentageMultiplier: number;
}

const GradeScales: Record<string, GradeScale> = {
  "4.0": { max: 4.0, percentageMultiplier: 25 },
  "5.0": { max: 5.0, percentageMultiplier: 20 },
  "10.0": { max: 10.0, percentageMultiplier: 9.5 }
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
      "A+": "Outstanding Performance! 🌟",
      A: "Excellent Performance! ⭐",
      B: "Good Performance! 👏",
      C: "Average Performance 📚",
      D: "Below Average 💪",
      F: "Needs Improvement 📝"
    };
    return remarks[grade as keyof typeof remarks] || "";
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            CGPA to Percentage Calculator
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Convert your CGPA to percentage across different grading scales
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Grading Scale
                </label>
                <Select
                  value={scale}
                  onValueChange={(value) => {
                    setScale(value);
                    handleReset();
                  }}
                >
                  <SelectTrigger className="w-full">
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
                  htmlFor="cgpa"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  CGPA (0-{GradeScales[scale].max})
                </label>
                <input
                  type="number"
                  id="cgpa"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  step="0.01"
                  min="0"
                  max={GradeScales[scale].max}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={`Enter your CGPA (e.g., ${GradeScales[scale].max / 2})`}
                />
              </div>

              {warning && (
                <Alert variant="destructive">
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loading
                      ? "bg-indigo-400 dark:bg-indigo-500"
                      : "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {loading ? "Calculating..." : "Calculate"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    CGPA ({scale} scale)
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {result.cgpa.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Percentage
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {result.percentage.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Grade
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {result.grade}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Remarks
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                    {result.remarks}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}