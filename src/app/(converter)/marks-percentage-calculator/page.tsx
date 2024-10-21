"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Marks Percentage Calculator
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Calculate your percentage and grade based on your marks
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="totalMarks"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Total Marks
                </label>
                <Input
                  type="number"
                  id="totalMarks"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  placeholder="Enter total marks"
                />
              </div>

              <div>
                <label
                  htmlFor="obtainedMarks"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Obtained Marks
                </label>
                <Input
                  type="number"
                  id="obtainedMarks"
                  value={obtainedMarks}
                  onChange={(e) => setObtainedMarks(e.target.value)}
                  placeholder="Enter obtained marks"
                />
              </div>

              {warning && (
                <Alert variant="destructive">
                  <AlertDescription>{warning}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Calculating..." : "Calculate"}
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
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
                    Total Marks
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {result.totalMarks}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Obtained Marks
                  </h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {result.obtainedMarks}
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
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg col-span-2">
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
