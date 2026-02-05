"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, School, ChevronRight, Trash2, Plus, TrendingUp, Award, Info } from "lucide-react";
import { ResponsiveAd, InContentAd, StickyAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

interface CalculatorCard {
  title: string;
  content: string;
  url: string;
}

const calculatorCards: CalculatorCard[] = [
  {
    title: "CGPA to Percentage",
    content: "Convert CGPA to percentage easily",
    url: "/cgpa-percentage-converter"
  },
  {
    title: "Percentage to CGPA",
    content: "Convert percentage to CGPA quickly",
    url: "/percentage-to-cgpa-calculator"
  },
  {
    title: "SGPA to CGPA Calculator",
    content: "Convert your SGPA to CGPA easily and accurately.",
    url: "/sgpa-to-cgpa-calculator",
  },
  {
    title: "Marks Percentage Calculator",
    content: "Calculate your percentage based on marks obtained.",
    url: "/marks-percentage-calculator",
  },
];

interface SemesterInput {
  credits: string;
  grade: string;
  semesterName: string;
}

const gradePoints: { [key: string]: number } = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "F": 0
};

const CGPACalculator = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [warning, setWarning] = useState("");
  const [manualInputs, setManualInputs] = useState<SemesterInput[]>([
    { credits: "", grade: "", semesterName: "Semester 1" }
  ]);
  const [result, setResult] = useState<number | null>(null);
  const [showGradeHelper, setShowGradeHelper] = useState(false);

  const handleRollNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setRollNumber(value);
    setWarning("");
  };

  const handleAutoSubmit = () => {
    if (rollNumber.length !== 10) {
      setWarning("Roll Number must be 10 digits long");
      return;
    }
    setWarning("Fetching results...");
    // API call would go here
  };

  const addSemester = () => {
    const newSemesterNumber = manualInputs.length + 1;
    setManualInputs([...manualInputs, {
      credits: "",
      grade: "",
      semesterName: `Semester ${newSemesterNumber}`
    }]);
  };

  const removeSemester = (index: number) => {
    if (manualInputs.length > 1) {
      const newInputs = manualInputs.filter((_, i) => i !== index);
      setManualInputs(newInputs);
    }
  };

  const updateSemesterInput = (index: number, field: keyof SemesterInput, value: string) => {
    const newInputs = [...manualInputs];
    newInputs[index][field] = value;
    setManualInputs(newInputs);
  };

  const calculateManualCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let hasValidInput = false;

    manualInputs.forEach(input => {
      const credits = parseFloat(input.credits) || 0;
      const grade = parseFloat(input.grade) || 0;

      if (credits > 0 && grade > 0 && grade <= 10) {
        totalCredits += credits;
        totalPoints += credits * grade;
        hasValidInput = true;
      }
    });

    if (hasValidInput && totalCredits > 0) {
      setResult(totalPoints / totalCredits);
      setWarning("");
    } else {
      setWarning("Please enter valid credits and grade points (0-10)");
      setResult(null);
    }
  };

  const getPerformanceLevel = (cgpa: number) => {
    if (cgpa >= 9) return { label: "Outstanding", color: "text-[#21C15E]", bgColor: "bg-[#21C15E]/10" };
    if (cgpa >= 8) return { label: "Excellent", color: "text-[#1C61E7]", bgColor: "bg-[#1C61E7]/10" };
    if (cgpa >= 7) return { label: "Very Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (cgpa >= 6) return { label: "Good", color: "text-green-600", bgColor: "bg-green-100" };
    if (cgpa >= 5) return { label: "Average", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { label: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-100" };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        {/* Sticky Sidebar Ad - Desktop Only */}
        {/* <div className="hidden lg:block absolute -right-32 top-0 w-32">
          <StickyAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_STICKY} position="sidebar" />
        </div> */}

        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 mb-4 bg-[#1C61E7]/10 rounded-full text-[#1C61E7] text-sm font-medium">
              <Calculator className="w-4 h-4 mr-2" />
              Academic Performance Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              CGPA Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Calculate your Cumulative Grade Point Average automatically or manually with detailed insights
            </p>
          </div>

          {/* Top Ad Banner */}
          <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} format="horizontal" className="mb-8" />

          {/* Main Calculator Card */}
          <div className="mb-8 animate-slide-up">
            <Tabs defaultValue="manual" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
                <TabsTrigger
                  value="auto"
                  className="data-[state=active]:bg-[#1C61E7] data-[state=active]:text-white rounded-lg transition-all"
                >
                  <School className="mr-2 h-4 w-4" />
                  Automatic
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="data-[state=active]:bg-[#1C61E7] data-[state=active]:text-white rounded-lg transition-all"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Manual
                </TabsTrigger>
              </TabsList>

              {/* Automatic Tab */}
              <TabsContent value="auto">
                <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <School className="w-6 h-6 text-[#1C61E7]" />
                      Automatic CGPA Calculation
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enter your roll number to fetch and calculate your CGPA automatically from our database
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Roll Number
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter 10-digit Roll Number (e.g., 21A81A0501)"
                          value={rollNumber}
                          onChange={handleRollNumberChange}
                          maxLength={10}
                          className="text-center text-lg h-12 border-2 focus:border-[#1C61E7] focus:ring-[#1C61E7]"
                        />
                      </div>

                      {warning && (
                        <Alert className="border-[#1C61E7] bg-[#1C61E7]/5">
                          <Info className="h-4 w-4 text-[#1C61E7]" />
                          <AlertDescription className="text-[#1C61E7]">{warning}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        onClick={handleAutoSubmit}
                        className="w-full h-12 text-base font-semibold bg-[#1C61E7] hover:bg-[#1C61E7]/90 transition-all"
                      >
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Calculate CGPA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Manual Tab */}
              <TabsContent value="manual">
                <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Calculator className="w-6 h-6 text-[#1C61E7]" />
                          Manual CGPA Calculation
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          Enter your semester-wise credits and grade points to calculate CGPA
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowGradeHelper(!showGradeHelper)}
                        className="border-[#1C61E7] text-[#1C61E7] hover:bg-[#1C61E7]/10"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Grade Guide
                      </Button>
                    </div>

                    {showGradeHelper && (
                      <div className="mt-4 p-4 bg-[#1C61E7]/5 rounded-lg border border-[#1C61E7]/20">
                        <h4 className="font-semibold text-sm text-[#1C61E7] mb-2">Grade Point System</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          {Object.entries(gradePoints).map(([grade, points]) => (
                            <div key={grade} className="flex justify-between px-2 py-1 bg-white dark:bg-gray-800 rounded">
                              <span className="font-medium">{grade}:</span>
                              <span className="text-[#1C61E7]">{points}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {manualInputs.map((input, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-[#1C61E7]">
                              {input.semesterName}
                            </span>
                            {manualInputs.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSemester(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Credits
                              </label>
                              <Input
                                type="number"
                                placeholder="e.g., 20"
                                value={input.credits}
                                onChange={(e) => updateSemesterInput(index, "credits", e.target.value)}
                                className="h-11 border-2 focus:border-[#1C61E7] focus:ring-[#1C61E7]"
                                min="0"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Grade Points (0-10)
                              </label>
                              <Input
                                type="number"
                                placeholder="e.g., 8.5"
                                value={input.grade}
                                onChange={(e) => updateSemesterInput(index, "grade", e.target.value)}
                                className="h-11 border-2 focus:border-[#1C61E7] focus:ring-[#1C61E7]"
                                min="0"
                                max="10"
                                step="0.1"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        onClick={addSemester}
                        className="w-full h-11 border-2 border-dashed border-[#1C61E7] text-[#1C61E7] hover:bg-[#1C61E7]/5"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Semester
                      </Button>

                      {warning && (
                        <Alert variant="destructive">
                          <AlertDescription>{warning}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        onClick={calculateManualCGPA}
                        className="w-full h-12 text-base font-semibold bg-[#1C61E7] hover:bg-[#1C61E7]/90 transition-all"
                      >
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Calculate CGPA
                      </Button>
                    </div>

                    {/* Result Display */}
                    {result !== null && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 rounded-2xl border-2 border-[#1C61E7]/20 animate-scale-in">
                        <div className="text-center">
                          <Award className="w-12 h-12 mx-auto mb-3 text-[#1C61E7]" />
                          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Your CGPA
                          </h3>
                          <div className="text-5xl font-bold text-[#1C61E7] mb-3">
                            {result.toFixed(2)}
                          </div>
                          <div className={`inline-flex items-center px-4 py-2 rounded-full ${getPerformanceLevel(result).bgColor}`}>
                            <span className={`font-semibold ${getPerformanceLevel(result).color}`}>
                              {getPerformanceLevel(result).label}
                            </span>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <div className="text-gray-500 dark:text-gray-400">Percentage</div>
                              <div className="text-xl font-bold text-[#1C61E7]">
                                {(result * 9.5).toFixed(2)}%
                              </div>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <div className="text-gray-500 dark:text-gray-400">Semesters</div>
                              <div className="text-xl font-bold text-[#1C61E7]">
                                {manualInputs.filter(i => i.credits && i.grade).length}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mid Ad */}
          <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} className="my-8" />

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculatorCards.map((card, index) => (
                <Link href={card.url} key={index}>
                  <Card className="h-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center text-lg group-hover:text-[#1C61E7] transition-colors">
                        {card.title}
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </CardTitle>
                      <CardDescription className="text-sm">{card.content}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Ad */}
          <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} format="auto" className="mt-8" />
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JNTUH CGPA Calculator",
            "description": "Free online CGPA calculator for JNTUH students. Calculate cumulative GPA for R22, R20, R18 regulations with semester-wise grade input.",
            "url": "https://jntuhresults.theskypedia.com/cgpa-calculator",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Any",
            "price": "0",
            "priceCurrency": "USD",
            "ratingValue": "4.8",
            "ratingCount": "2547",
            "author": {
              "@type": "Organization",
              "name": "TheSkypedia"
            },
            "screenshot": "https://jntuhresults.theskypedia.com/og-image.jpg"
          })
        }}
      />
    </div>
  );
};

export default CGPACalculator;
