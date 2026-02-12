'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import {
  MagnifyingGlassIcon,
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

function ConsolidatedResultsContent() {
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
        // Use internal API route to avoid CORS issues
        const response = await fetch(`/api/consolidated-results?htno=${roll}`);

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
    let passedSubjects = 0;
    let failedSubjects = 0;
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
          passedSubjects++;
        } else {
          failedSubjects++;
        }
      }
    });

    return { totalCredits, earnedCredits, passedSubjects, failedSubjects, totalSubjects: subjectMap.size };
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 print:p-0 print:bg-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Section - Hide on print */}
        <div className="print:hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Consolidated Results
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View your complete academic record
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
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="rollNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Roll Number
                  </label>
                  <input
                    id="rollNumber"
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                    placeholder="e.g., 20J25A0201"
                    className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-base font-mono"
                    maxLength={10}
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg bg-red-50 dark:bg-red-900/30 p-3 border border-red-200 dark:border-red-800"
                  >
                    <div className="flex gap-2">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                      <span>Get Results</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Results Display */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Statistics Cards - Hide on print */}
              {(() => {
                const stats = getOverallStats();
                return stats && (
                  <div className="print:hidden grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Subjects</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSubjects}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Passed</p>
                      <p className="text-2xl font-bold text-green-600">{stats.passedSubjects}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Failed</p>
                      <p className="text-2xl font-bold text-red-600">{stats.failedSubjects}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Credits</p>
                      <p className="text-2xl font-bold text-[#1C61E7]">{stats.earnedCredits}/{stats.totalCredits}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Print Button */}
              <div className="print:hidden flex justify-end mb-4">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md transition-all text-sm font-medium"
                >
                  <PrinterIcon className="h-4 w-4" />
                  <span>Print</span>
                </button>
              </div>

              {/* Ad - Hide on print */}
              <div className="print:hidden mb-6">
                <InContentAd adSlot={AD_SLOTS.CONSOLIDATED.INLINE_1} />
              </div>

              {/* A4 Result Sheet */}
              <div className="bg-white dark:bg-gray-800 shadow-lg print:shadow-none rounded-lg print:rounded-none overflow-hidden print:w-full print:max-w-none print:m-0 border border-gray-200 dark:border-gray-700 print:border-0">
                {/* Header Section */}
                <div className="bg-[#1C61E7] text-white p-4 print:bg-white print:text-black print:border-b-2 print:border-black print:p-1">
                  <div className="text-center">
                    <h2 className="text-lg md:text-xl font-bold print:text-black print:text-[10px]">
                      JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY HYDERABAD
                    </h2>
                    <p className="text-sm print:text-black print:text-[8px] mt-1 print:mt-0">
                      Consolidated Academic Results
                    </p>
                  </div>
                </div>

                {/* Student Information */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 print:bg-white print:border-black print:p-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm print:text-[7px] print:gap-0.5 print:grid-cols-3">
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Name:</span>
                      <span className="text-gray-900 dark:text-white font-semibold print:text-black">{results.details.name}</span>
                    </div>
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Roll No:</span>
                      <span className="text-gray-900 dark:text-white font-mono font-semibold print:text-black">{results.details.rollNumber}</span>
                    </div>
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">College:</span>
                      <span className="text-gray-900 dark:text-white font-mono font-semibold print:text-black">{results.details.collegeCode}</span>
                    </div>
                    <div className="flex items-center print:gap-1 md:col-span-2 print:col-span-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Father:</span>
                      <span className="text-gray-900 dark:text-white font-semibold print:text-black">{results.details.fatherName}</span>
                    </div>
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Branch:</span>
                      <span className="text-gray-900 dark:text-white font-semibold print:text-black">{results.details.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="p-6 print:p-1">
                  <div className="overflow-x-auto">
                    <table className="w-full border-2 border-gray-300 dark:border-gray-600 print:border-black text-sm print:text-[6.5px]">
                      <thead>
                        <tr className="bg-gray-800 dark:bg-gray-700 text-white print:bg-gray-200 print:text-black">
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-left font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Sem</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-4 py-2 text-left font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Code</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-4 py-2 text-left font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Subject Name</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Int</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Ext</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Tot</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Grd</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Cr</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllSubjects().map((subject, index) => (
                          <tr
                            key={index}
                            className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                              } print:bg-white hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors`}
                          >
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.semester}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.subjectCode}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black print:text-left">
                              {subject.subjectName}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.internalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.externalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.totalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center print:border-black print:px-0.5 print:py-0.5">
                              <span className={`inline-block px-3 py-1 rounded-lg font-bold ${getGradeColor(subject.grades)} print:bg-white print:text-black print:px-0 print:py-0 print:rounded-none`}>
                                {subject.grades}
                              </span>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.credits}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 dark:bg-gray-900 p-4 border-t-2 border-gray-300 dark:border-gray-700 print:bg-white print:border-black print:p-0.5">
                  <div className="flex justify-between items-center text-xs print:text-[6px] print:mb-0">
                    <p className="text-gray-600 dark:text-gray-400 print:text-black font-medium">
                      Computer-generated document - No signature required
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 print:text-black">
                      Generated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  {(() => {
                    const stats = getOverallStats();
                    return stats ? (
                      <p className="text-center text-sm print:text-[6px] font-bold text-gray-900 dark:text-white print:text-black mt-2 print:mt-0">
                        Credits Earned: {stats.earnedCredits} / {stats.totalCredits}
                      </p>
                    ) : null;
                  })()}
                </div>
              </div>

              {/* Bottom Ad */}
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

      {/* Print styles for A4 professional sheet */}
      <style jsx global>{`
        @media print {
          /* A4 page setup - remove browser headers/footers */
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }

          /* Remove browser print elements */
          html, body {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm;
            height: 297mm;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide all screen-only elements */
          .print\\:hidden {
            display: none !important;
          }

          /* Compact table for single page */
          table {
            font-size: 6.5px !important;
            line-height: 1.1 !important;
            width: 100% !important;
            border-collapse: collapse !important;
            page-break-inside: auto !important;
          }

          thead {
            display: table-header-group !important;
          }

          tbody {
            display: table-row-group !important;
          }

          tr {
            page-break-inside: avoid !important;
            page-break-after: auto !important;
          }

          td, th {
            padding: 0.5px 1px !important;
            font-size: 6.5px !important;
            line-height: 1.1 !important;
            word-break: break-word !important;
          }

          /* Header styling */
          h1, h2 {
            margin: 0 !important;
            padding: 2px 0 !important;
            line-height: 1.2 !important;
          }

          /* Ensure proper spacing */
          .print\\:p-3 {
            padding: 3mm !important;
          }

          .print\\:p-2 {
            padding: 2mm !important;
          }

          .print\\:p-1 {
            padding: 1mm !important;
          }

          /* Force black borders */
          .print\\:border-black {
            border-color: black !important;
          }

          /* Remove background colors in print */
          .print\\:bg-white {
            background: white !important;
          }

          .print\\:text-black {
            color: black !important;
          }

          /* Prevent orphans and widows */
          p, div {
            orphans: 3;
            widows: 3;
          }

          /* Ensure no extra margins */
          * {
            box-sizing: border-box;
          }
        }

        /* Screen view */
        @media screen {
          table {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

// Wrap with Error Boundary to handle HMR errors
export default function ConsolidatedResults() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <ArrowPathIcon className="h-10 w-10 text-[#1C61E7] animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading Results...</p>
          </div>
        </div>
      }>
        <ConsolidatedResultsContent />
      </React.Suspense>
    </ErrorBoundary>
  );
}
