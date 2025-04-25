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
import { AlertCircle, Search, Download, Printer, Calendar, School, RefreshCw } from "lucide-react";
import AdBanner from "@/components/Adsense/AdBanner";

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
    <div className="text-center p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
    </div>
    <p className="text-center">Checking backlogs...</p>
    <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
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
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
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
        <div className="text-center mb-8 print-header">
          <h1 className="text-2xl font-bold mb-2">JNTUH Backlogs Checker</h1>
          <p className="text-gray-600">Check your current backlogs status</p>
        </div>

        {/* Search Form - Hide in print */}
        <Card className="mb-8 print-hide">
          <CardHeader>
            <CardTitle>Enter Roll Number</CardTitle>
            <CardDescription>
              Enter your JNTUH hall ticket number to check backlogs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={fetchBacklogs} className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="e.g., 20J25A0501"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="uppercase"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Check
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Top Ad Banner - Hide in print */}
        <div className="print-hide">
          <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6" />
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
            <Card className="mb-6 print-break-inside-avoid">
              <CardHeader>
                <div className="flex justify-between items-center flex-wrap">
                  <CardTitle>{backlogsData.details.name}</CardTitle>
                  <span className="text-lg font-semibold text-red-600">
                    {backlogsData.results.totalBacklogs} Total Backlogs
                  </span>
                </div>
                <CardDescription>
                  Roll Number: {backlogsData.details.rollNumber} | College Code: {backlogsData.details.collegeCode}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <School className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-2">Father's Name:</span>
                    {backlogsData.details.fatherName}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium mr-2">Report Date:</span>
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t print-hide">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={printResults}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadResults}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Semesters with Backlogs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Semester Backlogs</h2>

              {backlogsData.results.semesters.length > 0 ? (
                backlogsData.results.semesters.map((semester) => (
                  <SemesterBacklogsCard key={semester.semester} semesterData={semester} />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-green-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Backlogs Found</h3>
                    <p className="text-gray-600">Congratulations! You have no pending backlogs.</p>
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
          <AdBanner adSlot="8973292958" adFormat="horizontal" className="mt-8" />
        </div>
      </div>
    </>
  );
};

export default BacklogsPage;