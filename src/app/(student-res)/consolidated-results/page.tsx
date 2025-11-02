'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/Adsense";
import AD_SLOTS from "@/config/adSlots";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

// Module-level cache to prevent duplicate fetches
const fetchCache = new Map<string, { data: any; timestamp: number }>();
const pendingFetches = new Map<string, Promise<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface Subject {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grades: string;
  credits: number;
}

interface Exam {
  examCode: string;
  rcrv: boolean;
  graceMarks: boolean;
  subjects: Subject[];
}

interface SemesterResult {
  semester: string;
  exams: Exam[];
}

interface StudentDetails {
  name: string;
  rollNumber: string;
  collegeCode: string;
  fatherName: string;
  branch: string;
}

interface ConsolidatedResult {
  details: StudentDetails;
  results: SemesterResult[];
}

export default function ConsolidatedResults() {
  const searchParams = useSearchParams();
  const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ConsolidatedResult | null>(null);
  const [error, setError] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  // Track if we've already fetched to prevent duplicate calls
  const hasFetchedRef = useRef(false);
  const lastFetchedRollNumber = useRef<string>('');

  // Load results if rollNumber is in URL params
  useEffect(() => {
    const urlRollNumber = searchParams?.get('rollNumber');

    if (urlRollNumber && !hasFetchedRef.current) {
      setRollNumber(urlRollNumber);
      hasFetchedRef.current = true;
      fetchResults(urlRollNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResults = async (roll: string) => {
    // Check module-level cache first
    const cached = fetchCache.get(roll);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setResults(cached.data);
      lastFetchedRollNumber.current = roll;

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);
      return;
    }

    // Check if there's already a pending fetch
    if (pendingFetches.has(roll)) {
      setLoading(true);
      try {
        const data = await pendingFetches.get(roll);
        setResults(data);
        lastFetchedRollNumber.current = roll;

        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set('rollNumber', roll);
        window.history.pushState({}, '', url);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching results');
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError('');
    lastFetchedRollNumber.current = roll;

    // Create a promise for this fetch and store it
    const fetchPromise = (async () => {
      try {
        const response = await fetch(`https://jntuhresults.dhethi.com/api/getAllResult?rollNumber=${roll}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch results');
        }

        const data = await response.json();

        // Cache the result
        fetchCache.set(roll, { data, timestamp: Date.now() });

        return data;
      } finally {
        // Remove from pending fetches
        pendingFetches.delete(roll);
      }
    })();

    pendingFetches.set(roll, fetchPromise);

    try {
      const data = await fetchPromise;
      setResults(data);

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching results');
      lastFetchedRollNumber.current = '';
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollNumber) {
      setError('Please enter a roll number');
      return;
    }

    hasFetchedRef.current = false;
    fetchResults(rollNumber);
  };

  // Get color based on grade
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'O': return 'bg-green-600 text-white';
      case 'A+': return 'bg-green-500 text-white';
      case 'A': return 'bg-blue-500 text-white';
      case 'B+': return 'bg-cyan-500 text-white';
      case 'B': return 'bg-yellow-500 text-white';
      case 'C': return 'bg-orange-500 text-white';
      case 'F': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Calculate overall statistics
  const getOverallStats = () => {
    if (!results) return null;

    let totalCredits = 0;
    let earnedCredits = 0;
    const subjectMap = new Map<string, Subject>();

    results.results.forEach(semester => {
      semester.exams.forEach(exam => {
        exam.subjects.forEach(subject => {
          const existing = subjectMap.get(subject.subjectCode);
          if (!existing || subject.totalMarks > existing.totalMarks) {
            subjectMap.set(subject.subjectCode, subject);
          }
        });
      });
    });

    subjectMap.forEach(subject => {
      if (subject.credits > 0) {
        totalCredits += subject.credits;
        if (subject.grades !== 'F') {
          earnedCredits += subject.credits;
        }
      }
    });

    return { totalCredits, earnedCredits };
  };

  const handlePrint = () => {
    window.print();
  };

  // Flatten all subjects across all semesters with only the best attempt
  const getAllSubjects = () => {
    if (!results) return [];

    const subjectMap = new Map<string, Subject & { semester: string; examCode: string }>();

    results.results.forEach(semester => {
      semester.exams.forEach(exam => {
        exam.subjects.forEach(subject => {
          const key = `${semester.semester}-${subject.subjectCode}`;
          const existing = subjectMap.get(key);

          // Keep the best attempt (highest marks)
          if (!existing || subject.totalMarks > existing.totalMarks) {
            subjectMap.set(key, {
              ...subject,
              semester: semester.semester,
              examCode: exam.examCode
            });
          }
        });
      });
    });

    return Array.from(subjectMap.values());
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 print:p-0 print:bg-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search Section - Hide on print */}
        <div className="print:hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center justify-center p-3 bg-[#1C61E7] rounded-2xl shadow-lg mb-4">
              <AcademicCapIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Consolidated Results
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Complete Academic Performance Report
            </p>
          </motion.div>

          {/* Top Ad */}
          <ResponsiveAd
            adSlot={AD_SLOTS.CONSOLIDATED.TOP_BANNER}
            format="horizontal"
          />

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-200 dark:border-gray-700 mb-6"
          >
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label
                  htmlFor="rollNumber"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Enter Roll Number
                </label>
                <div className={`relative rounded-xl transition-all ${searchFocus ? 'ring-2 ring-[#1C61E7]' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="rollNumber"
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    placeholder="20J25A0201"
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#1C61E7] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-lg font-semibold uppercase"
                    maxLength={10}
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-red-50 dark:bg-red-900/30 p-4 border-2 border-red-200 dark:border-red-800"
                >
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-3" />
                    <p className="text-sm font-semibold text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1C61E7] hover:bg-[#1552c4] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="animate-spin h-6 w-6 mr-2" />
                    Loading Results...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-6 w-6 mr-2" />
                    Get Consolidated Results
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Results Display - Print-friendly A4 single page */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Print Button */}
              <div className="print:hidden flex justify-end mb-4">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 dark:text-gray-300 font-semibold"
                >
                  <PrinterIcon className="h-5 w-5 mr-2" />
                  Print Results
                </button>
              </div>

              {/* Ad - Hide on print */}
              <div className="print:hidden mb-6">
                <InContentAd adSlot={AD_SLOTS.CONSOLIDATED.INLINE_1} />
              </div>

              {/* A4 Result Sheet - Compact single page design */}
              <div className="bg-white shadow-2xl print:shadow-none rounded-lg overflow-hidden print:rounded-none print:w-full print:max-w-none print:m-0">
                {/* Header Section - Compact */}
                <div className="bg-gradient-to-r from-[#1C61E7] to-[#21C15E] text-white p-4 print:bg-white print:text-black print:border-b-2 print:border-black print:p-3">
                  <div className="text-center">
                    <h1 className="text-lg md:text-xl font-bold print:text-black print:text-base">
                      JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY HYDERABAD
                    </h1>
                    <h2 className="text-sm md:text-base font-semibold print:text-black print:text-xs">
                      Consolidated Academic Results
                    </h2>
                  </div>
                </div>

                {/* Student Information - Compact */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 print:bg-white print:border-black print:p-2">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs print:text-[9px]">
                    <div className="flex">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-24 print:w-20">Name:</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{results.details.name}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-24 print:w-20">Roll Number:</span>
                      <span className="text-gray-900 dark:text-white font-mono font-semibold">{results.details.rollNumber}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-24 print:w-20">Father Name:</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{results.details.fatherName}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-24 print:w-20">College:</span>
                      <span className="text-gray-900 dark:text-white font-mono font-semibold">{results.details.collegeCode}</span>
                    </div>
                    <div className="flex col-span-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-24 print:w-20">Branch:</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{results.details.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Consolidated Results Table - Very Compact */}
                <div className="p-4 print:p-2">
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 dark:border-gray-600 print:border-black text-xs print:text-[8px]">
                      <thead>
                        <tr className="bg-gray-800 dark:bg-gray-700 text-white print:bg-gray-200 print:text-black">
                          <th className="border border-gray-600 dark:border-gray-500 px-1 py-1 text-left font-bold print:border-black print:px-0.5 print:py-0.5">Sem</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-2 py-1 text-left font-bold print:border-black print:px-1 print:py-0.5">Code</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-2 py-1 text-left font-bold print:border-black print:px-1 print:py-0.5">Subject Name</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-1 py-1 text-center font-bold print:border-black print:px-0.5 print:py-0.5">Int</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-1 py-1 text-center font-bold print:border-black print:px-0.5 print:py-0.5">Ext</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-1 py-1 text-center font-bold print:border-black print:px-0.5 print:py-0.5">Tot</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-1 py-1 text-center font-bold print:border-black print:px-0.5 print:py-0.5">Gr</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-1 py-1 text-center font-bold print:border-black print:px-0.5 print:py-0.5">Cr</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllSubjects().map((subject, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                            } print:bg-white hover:bg-gray-100 dark:hover:bg-gray-700`}
                          >
                            <td className="border border-gray-300 dark:border-gray-600 px-1 py-0.5 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5">
                              {subject.semester}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-2 py-0.5 font-mono font-semibold text-gray-900 dark:text-white print:border-black print:px-1">
                              {subject.subjectCode}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-2 py-0.5 font-medium text-gray-700 dark:text-gray-300 print:border-black print:px-1">
                              {subject.subjectName}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-1 py-0.5 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5">
                              {subject.internalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-1 py-0.5 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5">
                              {subject.externalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-1 py-0.5 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5">
                              {subject.totalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-1 py-0.5 text-center print:border-black print:px-0.5">
                              <span className={`inline-block px-1 py-0.5 rounded font-bold ${getGradeColor(subject.grades)} print:bg-white print:text-black print:border print:border-black print:px-0.5`}>
                                {subject.grades}
                              </span>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-1 py-0.5 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5">
                              {subject.credits}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer - Compact */}
                <div className="bg-gray-100 dark:bg-gray-900 p-2 border-t border-gray-300 dark:border-gray-700 print:bg-white print:border-black print:p-1">
                  <div className="flex justify-between items-center text-[10px] print:text-[8px]">
                    <p className="text-gray-600 dark:text-gray-400 print:text-black">
                      Computer-generated document
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 print:text-black">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  {(() => {
                    const stats = getOverallStats();
                    return stats ? (
                      <p className="text-center text-xs print:text-[8px] font-bold text-gray-900 dark:text-white print:text-black mt-1">
                        Total Credits: {stats.earnedCredits} / {stats.totalCredits}
                      </p>
                    ) : null;
                  })()}
                </div>
              </div>

              {/* Bottom Ad - Hide on print */}
              <div className="print:hidden mt-6">
                <ResponsiveAd
                  adSlot={AD_SLOTS.CONSOLIDATED.BOTTOM_RECTANGLE}
                  format="auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print styles for A4 single page */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          body {
            background: white;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          table {
            font-size: 7px !important;
          }

          td, th {
            padding: 1px 2px !important;
          }
        }

        @media screen {
          /* Make it look similar on web */
          table {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
