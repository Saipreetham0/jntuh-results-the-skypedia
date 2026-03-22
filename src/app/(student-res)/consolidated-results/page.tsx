'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  PrinterIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
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

  const hasFetchedRef = useRef(false);
  const lastFetchedRollNumber = useRef<string>('');

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
    const cached = fetchCache.get(roll);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setResults(cached.data);
      lastFetchedRollNumber.current = roll;
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);
      return;
    }

    if (pendingFetches.has(roll)) {
      setLoading(true);
      try {
        const data = await pendingFetches.get(roll);
        setResults(data);
        lastFetchedRollNumber.current = roll;
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

    const fetchPromise = (async () => {
      try {
        const response = await fetch(`/api/consolidated-results?htno=${roll}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to fetch results');
        }
        const data = await response.json();
        fetchCache.set(roll, { data, timestamp: Date.now() });
        return data;
      } finally {
        pendingFetches.delete(roll);
      }
    })();

    pendingFetches.set(roll, fetchPromise);

    try {
      const data = await fetchPromise;
      setResults(data);
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

  const handlePrint = () => window.print();

  const getAllSubjects = () => {
    if (!results) return [];
    const subjectMap = new Map<string, Subject & { semester: string; examCode: string }>();

    results.results.forEach(semester => {
      semester.exams.forEach(exam => {
        exam.subjects.forEach(subject => {
          const key = `${semester.semester}-${subject.subjectCode}`;
          const existing = subjectMap.get(key);
          if (!existing || subject.totalMarks > existing.totalMarks) {
            subjectMap.set(key, { ...subject, semester: semester.semester, examCode: exam.examCode });
          }
        });
      });
    });

    return Array.from(subjectMap.values());
  };

  const stats = results ? getOverallStats() : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 print:bg-white">

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1C61E7] transition-colors mb-4">
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1C61E7] mb-2">JNTUH Results</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Consolidated Results
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            View your complete academic transcript — all semesters, all subjects, in one place.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 print:p-0 print:max-w-none">

        {/* Top Ad */}
        <div className="print:hidden">
          <ResponsiveAd adSlot={AD_SLOTS.CONSOLIDATED.TOP_BANNER} format="horizontal" />
        </div>

        {/* Search Form */}
        <div className="print:hidden">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#1C61E7] flex items-center justify-center flex-shrink-0">
                <DocumentTextIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Enter Hall Ticket Number</p>
                <p className="text-xs text-gray-500">We&apos;ll fetch your full academic record instantly</p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                id="rollNumber"
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                placeholder="e.g., 20J25A0201"
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm font-mono"
                maxLength={10}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="animate-spin h-4 w-4" />
                    Loading...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    Get Results
                  </>
                )}
              </button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3"
              >
                <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Stats row */}
              {stats && (
                <div className="print:hidden grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Total Subjects', value: stats.totalSubjects, color: 'text-gray-900 dark:text-white' },
                    { label: 'Passed', value: stats.passedSubjects, color: 'text-green-600' },
                    { label: 'Failed', value: stats.failedSubjects, color: 'text-red-600' },
                    { label: 'Credits Earned', value: `${stats.earnedCredits}/${stats.totalCredits}`, color: 'text-[#1C61E7]' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="print:hidden flex justify-end">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:border-[#1C61E7] hover:text-[#1C61E7] transition-colors"
                >
                  <PrinterIcon className="h-4 w-4" />
                  Print / Save
                </button>
              </div>

              {/* In-content Ad */}
              <div className="print:hidden">
                <InContentAd adSlot={AD_SLOTS.CONSOLIDATED.INLINE_1} />
              </div>

              {/* A4 Result Sheet */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden print:rounded-none print:shadow-none print:border-0 print:w-full print:max-w-none print:m-0">

                {/* Sheet Header */}
                <div className="bg-[#1C61E7] text-white px-6 py-4 text-center print:bg-white print:text-black print:border-b-2 print:border-black print:px-2 print:py-1">
                  <h2 className="text-base md:text-lg font-bold print:text-[10px] print:text-black">
                    JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY HYDERABAD
                  </h2>
                  <p className="text-sm opacity-80 mt-0.5 print:text-[8px] print:text-black print:opacity-100">
                    Consolidated Academic Results
                  </p>
                </div>

                {/* Student Info */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 print:bg-white print:border-black print:px-2 print:py-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm print:text-[7px] print:gap-1 print:grid-cols-3">
                    {[
                      { label: 'Name', value: results.details.name },
                      { label: 'Roll No', value: results.details.rollNumber },
                      { label: 'College', value: results.details.collegeCode },
                      { label: "Father's Name", value: results.details.fatherName },
                      { label: 'Branch', value: results.details.branch },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center gap-2 print:gap-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-400 w-28 flex-shrink-0 print:w-auto print:text-black">{label}:</span>
                        <span className="text-gray-900 dark:text-white font-medium print:text-black">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto print:overflow-visible">
                  <table className="w-full border-collapse text-sm print:text-[6.5px]">
                    <thead>
                      <tr className="bg-gray-900 dark:bg-gray-700 text-white print:bg-gray-200 print:text-black">
                        {['Sem', 'Code', 'Subject Name', 'Int', 'Ext', 'Tot', 'Grd', 'Cr'].map((h) => (
                          <th key={h} className="border border-gray-700 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-xs print:border-black print:px-0.5 print:py-0.5 print:text-black">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getAllSubjects().map((subject, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/60 dark:bg-gray-800/40'} hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors print:bg-white`}
                        >
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.semester}</td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 font-mono text-xs text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.subjectCode}</td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.subjectName}</td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.internalMarks}</td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-center font-medium text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.externalMarks}</td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.totalMarks}</td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-center print:border-black print:px-0.5 print:py-0.5">
                            <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${getGradeColor(subject.grades)} print:bg-white print:text-black print:rounded-none`}>
                              {subject.grades}
                            </span>
                          </td>
                          <td className="border border-gray-100 dark:border-gray-800 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">{subject.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sheet Footer */}
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 print:bg-white print:border-black print:px-2 print:py-0.5 print:text-[6px] print:text-black">
                  <p>Computer-generated document — No signature required</p>
                  {stats && <p className="font-bold">Credits Earned: {stats.earnedCredits} / {stats.totalCredits}</p>}
                  <p>Generated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Bottom Ad */}
              <div className="print:hidden">
                <ResponsiveAd adSlot={AD_SLOTS.CONSOLIDATED.BOTTOM_RECTANGLE} format="auto" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 8mm 10mm; }
          html, body {
            background: white !important; color: black !important;
            margin: 0 !important; padding: 0 !important;
            print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important;
          }
          .print\\:hidden { display: none !important; }
          table { font-size: 6.5px !important; line-height: 1.1 !important; width: 100% !important; border-collapse: collapse !important; }
          thead { display: table-header-group !important; }
          tr { page-break-inside: avoid !important; }
          td, th { padding: 0.5px 1px !important; font-size: 6.5px !important; word-break: break-word !important; }
          * { box-sizing: border-box; }
        }
        @media screen { table { font-size: 13px; } }
      `}</style>
    </div>
  );
}

export default function ConsolidatedResults() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <ArrowPathIcon className="h-8 w-8 text-[#1C61E7] animate-spin" />
            <p className="text-sm text-gray-500">Loading Results...</p>
          </div>
        </div>
      }>
        <ConsolidatedResultsContent />
      </React.Suspense>
    </ErrorBoundary>
  );
}
