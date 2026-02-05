"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Search, Download, Printer, Calendar, School, RefreshCw, GraduationCap, Trophy, XCircle } from "lucide-react";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

// Site domain constant
const SITE_DOMAIN = "https://jntuhresults.theskypedia.com";

// Error types
type ErrorDetail = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

type APIError = {
  detail?: ErrorDetail[] | string;
  message?: string;
  error?: string;
  statusCode?: number;
};

// Interfaces for type checking
interface Subject {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grades: string;
  credits: number;
}

interface SemesterData {
  semester: string;
  subjects: Subject[];
  semesterSGPA: string;
  semesterCredits: number;
  semesterGrades: number;
  backlogs: number;
  failed: boolean;
}

interface StudentDetails {
  name: string;
  rollNumber: string;
  collegeCode: string;
  fatherName: string;
}

interface BacklogsResponse {
  details: StudentDetails;
  results: {
    semesters: SemesterData[];
    totalBacklogs: number;
  };
}

const LoadingState = () => (
  <div className="space-y-6">
    <div className="text-center p-8">
      <div className="animate-spin w-16 h-16 border-4 border-[#1C61E7] border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-lg font-semibold text-gray-700">Checking backlogs...</p>
      <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your results</p>
    </div>
    <ResponsiveAd adSlot={AD_SLOTS.RESULTS.INLINE_1} format="horizontal" className="my-4" />
  </div>
);

// Enhanced Error component with different types
const ErrorDisplay = ({
  error,
  resetError
}: {
  error: string | APIError;
  resetError: () => void;
}) => {
  // Process error message
  let errorTitle = "Error";
  let errorMsg = "";
  let statusCode = "";

  if (typeof error === 'string') {
    errorMsg = error;
  } else {
    // Extract status code if available
    if (error.statusCode) {
      statusCode = `(${error.statusCode})`;

      // Set more specific titles based on status code
      if (error.statusCode === 404) {
        errorTitle = "Not Found";
      } else if (error.statusCode === 422) {
        errorTitle = "Validation Error";
      } else if (error.statusCode >= 500) {
        errorTitle = "Server Error";
      }
    }

    // Extract error message
    if (typeof error.detail === 'string') {
      errorMsg = error.detail;
    } else if (Array.isArray(error.detail) && error.detail.length > 0) {
      errorMsg = error.detail.map(d => d.msg).join(". ");
    } else if (error.message) {
      errorMsg = error.message;
    } else if (error.error) {
      errorMsg = error.error;
    }
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{errorTitle} {statusCode}</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{errorMsg || "An unexpected error occurred"}</p>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetError}
            className="mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

// Custom Print CSS that hides the navbar and other elements during printing
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
  `}</style>
);

const SemesterBacklogsCard = ({ semesterData }: { semesterData: SemesterData }) => {
  return (
    <Card className="mb-6 overflow-hidden print-break-inside-avoid">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Semester {semesterData.semester}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm">SGPA: {semesterData.semesterSGPA}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600 font-medium">
              {semesterData.backlogs} {semesterData.backlogs === 1 ? "Backlog" : "Backlogs"}
            </span>
          </div>
        </div>
        <CardDescription>
          Credits: {semesterData.semesterCredits} | Grades: {semesterData.semesterGrades}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Subject Code</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead className="text-center">Internal</TableHead>
                <TableHead className="text-center">External</TableHead>
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semesterData.subjects.map((subject) => (
                <TableRow key={subject.subjectCode} className="bg-red-50/50">
                  <TableCell className="font-mono text-sm">
                    {subject.subjectCode}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="relative group">
                      <div className="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[250px] md:max-w-[400px]">
                        {subject.subjectName}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-black text-white text-xs rounded p-2 left-0 mt-1 w-64 shadow-lg print-hide">
                        {subject.subjectName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {subject.internalMarks}
                  </TableCell>
                  <TableCell className="text-center">
                    {subject.externalMarks}
                  </TableCell>
                  <TableCell className="text-center font-medium text-red-600">
                    {subject.totalMarks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const BacklogsPage = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [backlogsData, setBacklogsData] = useState<BacklogsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | APIError | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const resetError = () => {
    setError(null);
  };

  const fetchBacklogs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber.trim()) {
      setError("Please enter a roll number");
      return;
    }

    setLoading(true);
    setError(null);
    setBacklogsData(null);

    try {
      const response = await fetch(`/api/backlogs?rollNumber=${rollNumber.trim().toUpperCase()}`);
      const data = await response.json();

      if (!response.ok) {
        // Format error based on response
        const apiError: APIError = {
          statusCode: response.status,
          ...data
        };

        throw apiError;
      }

      // Validate response data structure
      if (!data || !data.details || !data.results) {
        throw {
          statusCode: 500,
          message: "Invalid response format from server"
        };
      }

      // Check if there are any backlogs
      if (!data.results.semesters || data.results.semesters.length === 0) {
        setBacklogsData({
          ...data,
          results: {
            ...data.results,
            semesters: [],
            totalBacklogs: 0
          }
        });
        return;
      }

      setBacklogsData(data);
    } catch (err) {
      console.error("Error fetching backlogs:", err);

      if (err && typeof err === 'object') {
        setError(err as APIError);
      } else {
        setError("Failed to fetch backlogs data");
      }
    } finally {
      setLoading(false);
    }
  };

  const printResults = () => {
    window.print();
  };

  //   const downloadResults = async () => {
  //     if (!printRef.current || !backlogsData) return;

  //     try {
  //       // Show loading indicator
  //       const loadingElement = document.createElement('div');
  //       loadingElement.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
  //       loadingElement.innerHTML = '<div class="bg-white p-4 rounded shadow-lg">Generating PDF...</div>';
  //       document.body.appendChild(loadingElement);

  //       // Create a clone of the content to modify for PDF
  //       const element = printRef.current.cloneNode(true) as HTMLElement;

  //       // Apply print-specific styling
  //       element.classList.add('p-8');

  //       // Remove any elements with print-hide class
  //       const hideElements = element.querySelectorAll('.print-hide');
  //       hideElements.forEach(el => el.remove());

  //       // Add watermark
  //       const watermark = document.createElement('div');
  //       watermark.style.position = 'absolute';
  //       watermark.style.bottom = '20px';
  //       watermark.style.left = '0';
  //       watermark.style.right = '0';
  //       watermark.style.textAlign = 'center';
  //       watermark.style.color = '#aaa';
  //       watermark.style.fontSize = '12px';
  //       watermark.innerText = `Generated by JNTUH Results Portal - ${SITE_DOMAIN}`;
  //       element.appendChild(watermark);

  //       // Generate PDF
  //       const canvas = await html2canvas(element, {
  //         scale: 2,
  //         useCORS: true,
  //         logging: false,
  //         backgroundColor: '#ffffff'
  //       });

  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');

  //       // A4 dimensions
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();

  //       const imgWidth = pdfWidth;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       // Add image to PDF
  //       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

  //       // If content is taller than page, add additional pages
  //       if (imgHeight > pdfHeight) {
  //         let heightLeft = imgHeight - pdfHeight;
  //         let position = -pdfHeight;

  //         while (heightLeft > 0) {
  //           position = position - pdfHeight;
  //           pdf.addPage();
  //           pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //           heightLeft -= pdfHeight;
  //         }
  //       }

  //       // Generate filename using student details
  //       const studentName = backlogsData.details.name.replace(/\s+/g, '_');
  //       const studentRoll = backlogsData.details.rollNumber;
  //       const fileName = `${studentName}_${studentRoll}_Backlogs.pdf`;

  //       // Save the PDF
  //       pdf.save(fileName);

  //       // Remove loading indicator
  //       document.body.removeChild(loadingElement);

  //     } catch (error) {
  //       console.error('Error generating PDF:', error);
  //       alert('Failed to generate PDF. Please try again.');
  //     }
  //   };


  // More reliable PDF generation function
  const downloadResults = async () => {
    if (!printRef.current || !backlogsData) return;

    try {
      // Show loading indicator
      const loadingElement = document.createElement('div');
      loadingElement.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
      loadingElement.innerHTML = '<div class="bg-white p-4 rounded shadow-lg">Generating PDF...</div>';
      document.body.appendChild(loadingElement);

      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.className = 'pdf-container';
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '40px';
      tempContainer.style.zIndex = '-1000';
      document.body.appendChild(tempContainer);

      // Clone the content for PDF
      tempContainer.innerHTML = printRef.current.innerHTML;

      // Remove any problematic elements
      const elementsToRemove = tempContainer.querySelectorAll('.print-hide, button, a');
      elementsToRemove.forEach(el => el.remove());

      // Add watermark
      const watermark = document.createElement('div');
      watermark.style.position = 'absolute';
      watermark.style.bottom = '20px';
      watermark.style.left = '0';
      watermark.style.right = '0';
      watermark.style.textAlign = 'center';
      watermark.style.color = '#aaa';
      watermark.style.fontSize = '12px';
      watermark.innerText = `Generated by JNTUH Results Portal - ${SITE_DOMAIN}`;
      tempContainer.appendChild(watermark);

      // Force any images to load completely
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        // Generate PDF with improved settings
        const canvas = await html2canvas(tempContainer, {
          scale: 1.5, // Lower scale for better performance
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          imageTimeout: 15000, // Longer timeout for images
          onclone: (clonedDoc) => {
            // Any additional modifications to the cloned document can be done here
            const clonedContainer = clonedDoc.querySelector('.pdf-container');
            if (clonedContainer) {
              (clonedContainer as HTMLElement).style.width = '794px';
              (clonedContainer as HTMLElement).style.height = 'auto';
            }
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG for smaller file size

        // Create PDF with proper dimensions
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        // A4 dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;

        // Calculate dimensions for the image
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add first page
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

        // If content is taller than page, add additional pages
        if (imgHeight > pdfHeight) {
          let heightLeft = imgHeight - pdfHeight;
          let position = -pdfHeight;

          while (heightLeft > 0) {
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;
          }
        }

        // Generate filename using student details
        const studentName = backlogsData.details.name.replace(/\s+/g, '_');
        const studentRoll = backlogsData.details.rollNumber;
        const fileName = `${studentName}_${studentRoll}_Backlogs.pdf`;

        // Save the PDF
        pdf.save(fileName);

      } catch (canvasError) {
        console.error('Canvas error:', canvasError);

        // Fallback method using simpler approach
        try {
          alert('Using alternative PDF generation method. This may take longer...');

          // Create a simpler version with text only
          const simpleContent = document.createElement('div');
          simpleContent.style.padding = '20px';
          simpleContent.style.backgroundColor = 'white';
          simpleContent.style.color = 'black';

          // Add student details
          simpleContent.innerHTML = `
            <h1 style="text-align:center;font-size:24px;margin-bottom:20px;">JNTUH Backlogs Report</h1>
            <p style="text-align:center;margin-bottom:20px;">Generated on ${new Date().toLocaleDateString()}</p>
            <div style="margin-bottom:20px;border:1px solid #ddd;padding:15px;border-radius:5px;">
              <h2 style="font-size:18px;margin-bottom:10px;">${backlogsData.details.name}</h2>
              <p>Roll Number: ${backlogsData.details.rollNumber}</p>
              <p>College Code: ${backlogsData.details.collegeCode}</p>
              <p>Father's Name: ${backlogsData.details.fatherName}</p>
              <p>Total Backlogs: ${backlogsData.results.totalBacklogs}</p>
            </div>
          `;

          // Add semester details
          if (backlogsData.results.semesters.length > 0) {
            const semestersContent = document.createElement('div');
            semestersContent.innerHTML = '<h2 style="font-size:18px;margin-bottom:15px;">Semester Backlogs</h2>';

            backlogsData.results.semesters.forEach(semester => {
              const semesterDiv = document.createElement('div');
              semesterDiv.style.marginBottom = '20px';
              semesterDiv.style.padding = '15px';
              semesterDiv.style.border = '1px solid #ddd';
              semesterDiv.style.borderRadius = '5px';

              semesterDiv.innerHTML = `
                <h3 style="font-size:16px;margin-bottom:10px;">Semester ${semester.semester} - SGPA: ${semester.semesterSGPA}</h3>
                <p>Credits: ${semester.semesterCredits} | Backlogs: ${semester.backlogs}</p>
                <table style="width:100%;border-collapse:collapse;margin-top:10px;">
                  <tr style="background-color:#f3f4f6;">
                    <th style="padding:8px;text-align:left;border:1px solid #ddd;">Subject Code</th>
                    <th style="padding:8px;text-align:left;border:1px solid #ddd;">Subject Name</th>
                    <th style="padding:8px;text-align:center;border:1px solid #ddd;">Internal</th>
                    <th style="padding:8px;text-align:center;border:1px solid #ddd;">External</th>
                    <th style="padding:8px;text-align:center;border:1px solid #ddd;">Total</th>
                  </tr>
                  ${semester.subjects.map(subject => `
                    <tr style="background-color:#fee2e2;">
                      <td style="padding:8px;text-align:left;border:1px solid #ddd;font-family:monospace;">${subject.subjectCode}</td>
                      <td style="padding:8px;text-align:left;border:1px solid #ddd;">${subject.subjectName}</td>
                      <td style="padding:8px;text-align:center;border:1px solid #ddd;">${subject.internalMarks}</td>
                      <td style="padding:8px;text-align:center;border:1px solid #ddd;">${subject.externalMarks}</td>
                      <td style="padding:8px;text-align:center;border:1px solid #ddd;font-weight:bold;color:#dc2626;">${subject.totalMarks}</td>
                    </tr>
                  `).join('')}
                </table>
              `;

              semestersContent.appendChild(semesterDiv);
            });

            simpleContent.appendChild(semestersContent);
          } else {
            simpleContent.innerHTML += `
              <div style="text-align:center;padding:20px;border:1px solid #ddd;border-radius:5px;">
                <p style="font-size:18px;margin-bottom:10px;">No Backlogs Found</p>
                <p>Congratulations! You have no pending backlogs.</p>
              </div>
            `;
          }

          // Add disclaimer
          simpleContent.innerHTML += `
            <div style="margin-top:30px;padding-top:10px;border-top:1px solid #ddd;font-size:10px;color:#666;">
              <p>This information is provided for reference only. Please verify the results with the official JNTUH website.</p>
              <p style="margin-top:5px;">Generated on ${new Date().toLocaleDateString()} by JNTUH Results Portal - ${SITE_DOMAIN}</p>
            </div>
          `;

          document.body.appendChild(simpleContent);

          // Use html2pdf as a more reliable alternative
          const opt = {
            margin: 10,
            filename: `${backlogsData.details.name.replace(/\s+/g, '_')}_${backlogsData.details.rollNumber}_Backlogs.pdf`,
            image: { type: 'jpeg' as const, quality: 0.95 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
          };

          // Import html2pdf dynamically
          const html2pdf = (await import('html2pdf.js')).default;
          await html2pdf().from(simpleContent).set(opt).save();

          // Clean up
          document.body.removeChild(simpleContent);

        } catch (fallbackError) {
          console.error('Fallback PDF generation failed:', fallbackError);
          alert('PDF generation failed. Please try printing the page instead.');
        }
      }

      // Clean up
      document.body.removeChild(tempContainer);
      document.body.removeChild(loadingElement);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again or use the print function instead.');
    }
  };


  return (
    <>
      <PrintStyles />
      <div className="max-w-4xl mx-auto p-4 print-container">
        {/* Header */}
        <div className="text-center mb-10 print-header animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 rounded-xl bg-[#1C61E7] flex items-center justify-center mr-4 shadow-md">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                Backlogs Checker
              </h1>
              <p className="text-sm text-[#1C61E7] font-semibold">JNTUH Results Portal</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base">Check your current backlogs status instantly</p>
        </div>

        {/* Search Form - Hide in print */}
        <Card className="mb-8 print-hide shadow-xl border-l-4 border-l-[#1C61E7] rounded-xl overflow-hidden animate-slide-up">
          <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#1C61E7] rounded-lg shadow-md">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Enter Hall Ticket Number</CardTitle>
            </div>
            <CardDescription className="text-base">
              Enter your JNTUH hall ticket number to check your backlog status
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={fetchBacklogs} className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="e.g., 20J25A0501"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="uppercase h-12 text-lg font-medium border-2 focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white h-12 px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Check Backlogs
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Top Ad Banner - Hide in print */}
        <div className="print-hide">
          <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="horizontal" className="mb-6" />
        </div>

        {/* Error Message - Hide in print */}
        {error && (
          <div className="print-hide">
            <ErrorDisplay error={error} resetError={resetError} />
          </div>
        )}

        {/* Loading State - Hide in print */}
        {loading && <div className="print-hide"><LoadingState /></div>}

        {/* Results Section */}
        {!loading && backlogsData && (
          <div ref={printRef} className="space-y-6" id="backlogsResults">
            {/* Print-only header */}
            <div className="print-only print-header">
              <h1 className="text-3xl font-bold mb-2 text-center">JNTUH Backlogs Report</h1>
              <p className="text-center text-gray-600 mb-6">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Student Details Card */}
            <Card className="mb-6 print-break-inside-avoid border-l-4 border-l-[#1C61E7] shadow-xl overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#1C61E7]/10 rounded-xl border-2 border-[#1C61E7]/20">
                      <GraduationCap className="h-8 w-8 text-[#1C61E7]" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900 dark:text-white">{backlogsData.details.name}</CardTitle>
                      <CardDescription className="mt-1 text-base">
                        Roll Number: <span className="font-semibold text-gray-700 dark:text-gray-300">{backlogsData.details.rollNumber}</span> | College: <span className="font-semibold text-gray-700 dark:text-gray-300">{backlogsData.details.collegeCode}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className={`px-6 py-4 rounded-xl border-2 shadow-lg ${backlogsData.results.totalBacklogs > 0
                    ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    }`}>
                    <div className="flex items-center gap-3">
                      {backlogsData.results.totalBacklogs > 0 ? (
                        <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      ) : (
                        <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                      )}
                      <div>
                        <p className={`text-3xl font-bold ${backlogsData.results.totalBacklogs > 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                          }`}>{backlogsData.results.totalBacklogs}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Backlogs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <School className="h-5 w-5 mr-3 text-[#1C61E7]" />
                    <span className="font-medium mr-2 text-gray-600 dark:text-gray-400">Father's Name:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{backlogsData.details.fatherName}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Calendar className="h-5 w-5 mr-3 text-[#1C61E7]" />
                    <span className="font-medium mr-2 text-gray-600 dark:text-gray-400">Report Date:</span>
                    <span className="text-gray-900 dark:text-white font-semibold">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 print-hide">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={printResults}
                    className="bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Results
                  </Button>
                  <Button
                    onClick={downloadResults}
                    variant="outline"
                    className="border-2 border-[#21C15E] text-[#21C15E] hover:bg-[#21C15E] hover:text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Semesters with Backlogs */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#1C61E7]">
                <div className="w-1.5 h-7 bg-[#1C61E7] rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Semester Backlogs</h2>
              </div>

              {backlogsData.results.semesters.length > 0 ? (
                backlogsData.results.semesters.map((semester) => (
                  <SemesterBacklogsCard key={semester.semester} semesterData={semester} />
                ))
              ) : (
                <Card className="p-10 text-center border-2 border-[#21C15E] bg-green-50 dark:bg-green-900/20 shadow-xl">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-[#21C15E] flex items-center justify-center mb-5 shadow-lg">
                      <Trophy className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">No Backlogs Found!</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Congratulations! You have no pending backlogs.</p>
                  </div>
                </Card>
              )}
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 mt-8 p-4 border-t border-gray-200">
              <p>
                This information is provided for reference only. Please verify the results with the official JNTUH website.
              </p>
              <p className="mt-1">
                Generated on {new Date().toLocaleDateString()} by JNTUH Results Portal - {SITE_DOMAIN}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Ad Banner - Hide in print */}
        <div className="print-hide">
          <InContentAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} className="mt-8" />
        </div>
      </div>
    </>
  );
};

export default BacklogsPage;