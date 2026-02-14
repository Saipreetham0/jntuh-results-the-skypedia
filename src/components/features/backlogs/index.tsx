"use client";

import React, { useRef } from "react";
import { Download, Printer, AlertCircle, RefreshCw, GraduationCap, ArrowRight, Zap, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import { AD_SLOTS } from "@/config/adSlots";
import { useBacklogs } from "@/hooks/useBacklogs";
import { BacklogSearch } from "./BacklogSearch";
import { BacklogStats } from "./BacklogStats";
import { BacklogResults } from "./BacklogResults";
import { BacklogSkeleton } from "./BacklogSkeleton";
import { SEOContent } from "./SEOContent";
import { TrendingUpdates } from "./TrendingUpdates";
import { RelatedTools } from "./RelatedTools";
import { StudentCounter } from "./StudentCounter";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SITE_DOMAIN = "https://jntuhresults.theskypedia.com";

// Custom Print CSS
const PrintStyles = () => (
    <style jsx global>{`
      @media print {
        header, nav, footer, .print-hide, button, .ad-container {
          display: none !important;
        }
        body, html {
          background-color: white !important;
        }
        .print-container {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .print-only {
          display: block !important;
        }
        .print-break-inside-avoid {
          break-inside: avoid;
        }
        .print-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .print-page-break {
          page-break-after: always;
        }
      }
      .print-only {
        display: none;
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
    `}</style>
);

export default function BacklogsPage() {
    const { loading, data, error, fetchBacklogs, clearResults } = useBacklogs();
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        if (!printRef.current || !data) return;

        try {
            const loadingElement = document.createElement('div');
            loadingElement.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm';
            loadingElement.innerHTML = '<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4"><div class="w-8 h-8 border-4 border-[#1C61E7] border-t-transparent rounded-full animate-spin"></div><p class="font-medium">Generating PDF Report...</p></div>';
            document.body.appendChild(loadingElement);

            const tempContainer = document.createElement('div');
            tempContainer.className = 'pdf-container';
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            tempContainer.style.width = '794px';
            tempContainer.style.backgroundColor = 'white';
            tempContainer.style.padding = '40px';
            document.body.appendChild(tempContainer);

            // PDF Content Generation
            tempContainer.innerHTML = `
        <div style="font-family: sans-serif; color: #111;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px;">
                <h1 style="color: #1C61E7; margin: 0; font-size: 24px;">JNTUH Backlogs Report</h1>
                <p style="color: #666; margin: 5px 0 0;">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px; font-size: 18px;">Student Details</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <p style="margin: 0;"><strong>Name:</strong> ${data.details.name}</p>
                    <p style="margin: 0;"><strong>Roll Number:</strong> ${data.details.rollNumber}</p>
                    <p style="margin: 0;"><strong>College Code:</strong> ${data.details.collegeCode}</p>
                    <p style="margin: 0;"><strong>Father's Name:</strong> ${data.details.fatherName}</p>
                </div>
            </div>
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; padding: 15px 30px; background: ${data.results.totalBacklogs > 0 ? '#fef2f2' : '#f0fdf4'}; border: 1px solid ${data.results.totalBacklogs > 0 ? '#fecaca' : '#bbf7d0'}; border-radius: 8px;">
                    <span style="display: block; font-size: 32px; font-weight: bold; color: ${data.results.totalBacklogs > 0 ? '#dc2626' : '#16a34a'};">${data.results.totalBacklogs}</span>
                    <span style="font-size: 12px; text-transform: uppercase; color: #666; font-weight: bold;">Total Backlogs</span>
                </div>
            </div>
            ${data.results.semesters.map(sem => `
                <div style="margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <div style="background: #f1f5f9; padding: 10px 15px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin: 0; font-size: 16px;">Semester ${sem.semester}</h3>
                        <span style="font-size: 14px; font-weight: bold; color: ${sem.backlogs > 0 ? '#dc2626' : '#666'};">${sem.backlogs} Backlogs</span>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #f8fafc; text-align: left;">
                                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Code</th>
                                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Subject Name</th>
                                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">Credits</th>
                                <th style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sem.subjects.map(sub => `
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 8px 10px;">${sub.subjectCode}</td>
                                    <td style="padding: 8px 10px;">${sub.subjectName}</td>
                                    <td style="padding: 8px 10px; text-align: center;">${sub.credits}</td>
                                    <td style="padding: 8px 10px; text-align: center; font-weight: bold; color: ${sub.grades === 'F' || sub.grades === 'Ab' ? '#dc2626' : '#333'};">${sub.grades}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `).join('')}
            <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; font-size: 10px; color: #999;">
                <p>This report is generated for informational purposes. Please verify with official JNTUH memos.</p>
                <p>${SITE_DOMAIN}</p>
            </div>
        </div>
      `;

            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = 210;
            const pdfHeight = 297;
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`${data.details.rollNumber}_Backlogs_Report.pdf`);
            document.body.removeChild(tempContainer);
            document.body.removeChild(loadingElement);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. You can use the Print option instead.');
            const loading = document.querySelector('.fixed.inset-0');
            if (loading) loading.remove();
        }
    };

    return (
        <>
            <PrintStyles />
            <div className="relative min-h-screen bg-gray-50/50 dark:bg-gray-950/50 font-sans selection:bg-blue-100 selection:text-blue-900">

                {/* Ad: Leaderboard (Heatmap: Top Visibility) */}
                <div className="print-hide w-full flex justify-center py-2 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="horizontal" />
                </div>

                {/* Engagement: Trending Ticker */}
                <TrendingUpdates />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 print-container">

                    <div className="text-center space-y-4 mb-8 animate-fade-in print-header">
                        <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-2">
                            <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                            <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">
                                JNTUH Backlogs Checker 2026
                            </h1>
                        </div>
                        <StudentCounter />
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* Left Column: Main Content (8 cols) */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* Search Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-1">
                                <BacklogSearch onSearch={fetchBacklogs} loading={loading} />
                            </div>

                            {/* Error State */}
                            {error && (
                                <Alert variant="destructive" className="animate-slide-up border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Unable to Fetch Results</AlertTitle>
                                    <AlertDescription className="flex flex-col gap-2">
                                        <p>{error}</p>
                                        <Button variant="outline" size="sm" onClick={clearResults} className="w-fit mt-2 bg-white dark:bg-gray-800 hover:bg-gray-100">
                                            <RefreshCw className="h-3 w-3 mr-2" /> Try Again
                                        </Button>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Loading Skeleton */}
                            {loading && <BacklogSkeleton />}

                            {/* Results Display */}
                            {!loading && data && (
                                <div ref={printRef} className="space-y-6 animate-slide-up">
                                    <div id="backlogsResults" className="space-y-8">

                                        {/* Stats Overview */}
                                        <BacklogStats data={data} />

                                        {/* Ad: In-Content (Heatmap: High Interaction Point) */}
                                        <div className="print-hide my-4">
                                            <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />
                                        </div>

                                        {/* Action Bar */}
                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm print-hide">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Data Synced Successfully</span>
                                            </div>
                                            <div className="flex gap-3 w-full sm:w-auto">
                                                <Button variant="ghost" onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: 'JNTUH Backlogs Checker',
                                                            text: 'Check your detailed JNTUH backlog history instantly!',
                                                            url: window.location.href,
                                                        })
                                                    }
                                                }} className="flex-1 sm:flex-none text-blue-600 hover:bg-blue-50">
                                                    <Share2 className="h-4 w-4 mr-2" /> Share
                                                </Button>
                                                <Button variant="outline" onClick={handlePrint} className="flex-1 sm:flex-none">
                                                    <Printer className="h-4 w-4 mr-2" /> Print
                                                </Button>
                                                <Button onClick={handleDownload} className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                                                    <Download className="h-4 w-4 mr-2" /> PDF
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Detailed Tables */}
                                        <div className="space-y-4">
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white px-1">Detailed Semester Breakdown</h2>
                                            <BacklogResults semesters={data.results.semesters} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Engagement: Related Tools Grid */}
                            <RelatedTools />

                            {/* SEO Content Block */}
                            <SEOContent />

                        </div>

                        {/* Right Column: Sticky Sidebar (4 cols) - Desktop Only */}
                        <div className="lg:col-span-4 space-y-6 print-hide">
                            <div className="sticky top-24 space-y-6">

                                {/* Ad: Sidebar Sticky (Heatmap: Persistent Visibility) */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex justify-center min-h-[600px] items-center text-gray-400 bg-grid-pattern relative overflow-hidden">
                                    <div className="absolute top-2 right-2 text-[10px] text-gray-300 uppercase tracking-widest font-semibold">Advertisement</div>
                                    <ResponsiveAd adSlot={AD_SLOTS.SIDEBAR.STICKY_MID} format="vertical" />
                                </div>

                                {/* Quick Links Widget */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-yellow-500 fill-current" />
                                            Quick Shortcuts
                                        </h3>
                                    </div>
                                    <div className="p-2">
                                        {[
                                            { label: 'SGPA to CGPA Calculator', url: '/sgpa-to-cgpa-calculator' },
                                            { label: 'Marks to Percentage', url: '/marks-percentage-calculator' },
                                            { label: 'B.Tech Syllabus (R22/R18)', url: '/syllabus' },
                                            { label: 'Previous Question Papers', url: '/previous-question-papers' },
                                        ].map((link, idx) => (
                                            <a key={idx} href={link.url} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                                <span className="font-medium text-sm">{link.label}</span>
                                                <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Ad: Sidebar Block 2 */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex justify-center min-h-[300px] items-center text-gray-400 bg-grid-pattern">
                                    <ResponsiveAd adSlot={AD_SLOTS.SIDEBAR.STICKY_TOP} format="rectangle" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Ad: Footer (Heatmap: Exit Intent) */}
                <div className="print-hide w-full flex justify-center py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
                    <ResponsiveAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} format="horizontal" />
                </div>

            </div>
        </>
    );
}
