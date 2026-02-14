/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConsolidatedResult, Subject } from '@/types/results';
import { PrinterIcon } from 'lucide-react';
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

interface ConsolidatedResultDisplayProps {
    results: ConsolidatedResult | null;
}

export default function ConsolidatedResultDisplay({ results }: ConsolidatedResultDisplayProps) {
    if (!results) return null;

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

        const subjectMap = new Map<string, Subject & { semester: string }>();

        results.results.forEach(semester => {
            semester.exams.forEach(exam => {
                exam.subjects.forEach(subject => {
                    const key = `${semester.semester}-${subject.subjectCode}`;
                    const existing = subjectMap.get(key);

                    // Keep the best attempt (highest marks)
                    if (!existing || subject.totalMarks > existing.totalMarks) {
                        subjectMap.set(key, {
                            ...subject,
                            semester: semester.semester
                        });
                    }
                });
            });
        });

        return Array.from(subjectMap.values());
    };

    return (
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

            {/* Global Styles for Print */}
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
        </motion.div>
    );
}
