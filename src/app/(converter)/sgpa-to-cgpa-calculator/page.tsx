"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

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
      "A+": "Outstanding Performance! 🌟",
      A: "Excellent Performance! ⭐",
      B: "Good Performance! 👏",
      C: "Average Performance 📚",
      D: "Below Average 💪",
      F: "Needs Improvement 📝",
    };
    return remarks[grade as keyof typeof remarks] || "";
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            SGPA to CGPA Calculator
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Convert multiple SGPAs to CGPA across different grading scales
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your CGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select CGPA Scale
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

              {semesters.map((semester, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label
                      htmlFor={`sgpa-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      SGPA for Semester {index + 1} (0-{GradeScales[scale].max})
                    </label>
                    <input
                      type="number"
                      id={`sgpa-${index}`}
                      value={semester.sgpa}
                      onChange={(e) =>
                        handleSemesterChange(index, "sgpa", e.target.value)
                      }
                      step="0.01"
                      min="0"
                      max={GradeScales[scale].max}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={`Enter SGPA (e.g., ${(
                        GradeScales[scale].max / 2
                      ).toFixed(2)})`}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor={`credits-${index}`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Credits for Semester {index + 1}
                    </label>
                    <input
                      type="number"
                      id={`credits-${index}`}
                      value={semester.credits}
                      onChange={(e) =>
                        handleSemesterChange(index, "credits", e.target.value)
                      }
                      min="1"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter credits (e.g., 20)"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveSemester(index)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={handleAddSemester}
                className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus size={20} className="mr-2" />
                Add Semester
              </button>

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
                  {loading ? "Calculating..." : "Calculate CGPA"}
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
