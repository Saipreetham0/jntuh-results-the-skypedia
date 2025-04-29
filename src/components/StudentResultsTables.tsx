
// "use client";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Download, Printer, FileText, AlertTriangle } from "lucide-react";
// import { JNTUHService } from "@/lib/api";
// import { Progress } from "@/components/ui/progress";
// import AdBanner from "@/components/Adsense/AdBanner";

// // Loading State with improved UI
// const LoadingState = () => (
//   <div className="space-y-6 max-w-4xl mx-auto p-4">
//     <Card>
//       <CardHeader className="space-y-4">
//         <Skeleton className="h-8 w-64 mx-auto" />
//         <Skeleton className="h-4 w-48 mx-auto" />
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <Skeleton className="h-6 w-full" />
//           <Skeleton className="h-6 w-full" />
//           <Skeleton className="h-6 w-full" />
//           <Skeleton className="h-6 w-full" />
//         </div>
//         <div className="py-4 text-center">
//           <Progress value={75} className="w-full h-2" />
//           <p className="mt-2 text-sm text-muted-foreground">Loading results...</p>
//         </div>
//       </CardContent>
//     </Card>
//     <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
//   </div>
// );

// // Error State with improved UI
// const ErrorState = ({ message, debug }: { message: string; debug?: string }) => (
//   <div className="max-w-4xl mx-auto p-4">
//     <Card className="border-red-200 bg-red-50">
//       <CardHeader>
//         <div className="flex items-center justify-center mb-2">
//           <AlertTriangle className="h-10 w-10 text-red-500" />
//         </div>
//         <CardTitle className="text-center text-red-700">Error Loading Results</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-center text-red-600">{message}</p>
//         {debug && (
//           <div className="mt-4 bg-white p-3 rounded border border-red-200 overflow-auto max-h-40">
//             <p className="text-xs font-semibold mb-2">Debug Information:</p>
//             <pre className="text-xs text-gray-700">{debug}</pre>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter>
//         <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
//           Try Again
//         </Button>
//       </CardFooter>
//     </Card>
//     <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-4" />
//   </div>
// );

// type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "F";

// const getGradeColor = (grade: Grade): string => {
//   const colors: Record<Grade, string> = {
//     O: "text-green-600",
//     "A+": "text-green-500",
//     A: "text-green-400",
//     "B+": "text-blue-500",
//     B: "text-blue-400",
//     C: "text-yellow-500",
//     F: "text-red-500",
//   };
//   return colors[grade] || "text-gray-600";
// };

// // Updated interface for the data structure
// interface NewSubject {
//   subjectCode: string;
//   subjectName: string;
//   internalMarks: number;
//   externalMarks: number;
//   totalMarks: number;
//   grades: string;
//   credits: number;
// }

// interface SemesterData {
//   semester: string;
//   subjects: NewSubject[];
//   semesterSGPA: string;
//   semesterCredits: number;
//   semesterGrades: number;
//   backlogs: number;
//   failed: boolean;
// }

// interface ResultsTableProps {
//   semesterData: SemesterData;
//   showAd?: boolean;
// }

// // SGPA Gauge Component
// const SGPAGauge: React.FC<{ sgpa: string }> = ({ sgpa }) => {
//   const sgpaValue = parseFloat(sgpa);
//   let color = "bg-red-500";

//   if (sgpaValue >= 9) color = "bg-green-500";
//   else if (sgpaValue >= 8) color = "bg-green-400";
//   else if (sgpaValue >= 7) color = "bg-blue-500";
//   else if (sgpaValue >= 6) color = "bg-yellow-500";

//   return (
//     <div className="w-full mt-2">
//       <div className="flex justify-between text-xs mb-1">
//         <span>0</span>
//         <span>10</span>
//       </div>
//       <div className="h-2 w-full bg-gray-200 rounded-full">
//         <div
//           className={`h-2 rounded-full ${color}`}
//           style={{ width: `${(sgpaValue/10)*100}%` }}
//         ></div>
//       </div>
//       <div className="text-center font-semibold mt-1">{sgpa}</div>
//     </div>
//   );
// };

// // Enhanced ResultsTable component with better UI
// const ResultsTable: React.FC<ResultsTableProps> = ({
//   semesterData,
//   showAd,
// }) => {
//   return (
//     <div className="mb-8 break-inside-avoid">
//       <Card>
//         <CardHeader className="pb-2">
//           <div className="flex justify-between items-center">
//             <CardTitle className="text-lg">
//               Semester {semesterData.semester}
//             </CardTitle>
//             <Badge variant={parseFloat(semesterData.semesterSGPA) >= 7 ? "success" : parseFloat(semesterData.semesterSGPA) >= 6 ? "default" : "destructive"}>
//               SGPA: {semesterData.semesterSGPA}
//             </Badge>
//           </div>
//           <SGPAGauge sgpa={semesterData.semesterSGPA} />
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto -mx-6">
//             <Table className="w-full">
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="w-20 font-medium">Code</TableHead>
//                   <TableHead className="w-40 md:w-48 font-medium">Subject</TableHead>
//                   <TableHead className="w-16 text-center font-medium">Internal</TableHead>
//                   <TableHead className="w-16 text-center font-medium">External</TableHead>
//                   <TableHead className="w-16 text-center font-medium">Credits</TableHead>
//                   <TableHead className="w-16 text-center font-medium">Grade</TableHead>
//                   <TableHead className="w-20 text-center font-medium">Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {semesterData.subjects.map((subject) => (
//                   <TableRow key={subject.subjectCode} className="hover:bg-gray-50">
//                     <TableCell className="font-mono text-xs">
//                       {subject.subjectCode}
//                     </TableCell>
//                     <TableCell
//                       className="relative group"
//                       title={subject.subjectName}
//                     >
//                       {/* Mobile view with more aggressive truncation */}
//                       <div className="md:hidden overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[120px]">
//                         {subject.subjectName}
//                       </div>

//                       {/* Desktop view with better handling */}
//                       <div className="hidden md:block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
//                         {subject.subjectName}
//                       </div>

//                       {/* Tooltip for both mobile and desktop */}
//                       <div className="hidden group-hover:block absolute z-10 bg-black text-white text-xs rounded p-2 left-0 -mt-1 w-48 shadow-lg">
//                         {subject.subjectName}
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {subject.internalMarks}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {subject.externalMarks}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {subject.credits}
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <span
//                         className={`font-bold ${getGradeColor(
//                           subject.grades as Grade
//                         )}`}
//                       >
//                         {subject.grades}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       {subject.totalMarks || "-"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-wrap justify-between items-center text-xs text-gray-600 border-t pt-4">
//           <div className="flex gap-4">
//             <div>Credits: {semesterData.semesterCredits}</div>
//             <div>Grade Points: {semesterData.semesterGrades}</div>
//           </div>
//           {semesterData.backlogs > 0 && (
//             <Badge variant="destructive">Backlogs: {semesterData.backlogs}</Badge>
//           )}
//         </CardFooter>
//       </Card>

//       {showAd && (
//         <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
//       )}
//     </div>
//   );
// };

// const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
//   const [studentResult, setStudentResult] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [debug, setDebug] = useState<string | null>(null);
//   const [isPdfLoading, setIsPdfLoading] = useState(false);
//   const [isPrinting, setIsPrinting] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const printRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const result = await JNTUHService.getStudentResults(htno);
//         console.log("API Response:", result); // Debug log

//         if (!result) {
//           setDebug("API returned empty result");
//           setError("No results data returned from API");
//           return;
//         }

//         setStudentResult(result);
//         console.log("Student result set:", result);

//       } catch (err) {
//         console.error("Error fetching results:", err);
//         setDebug(`Fetch error: ${err instanceof Error ? err.message : String(err)}`);
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (htno) {
//       fetchResults();
//     } else {
//       setError("No hall ticket number provided");
//       setIsLoading(false);
//     }
//   }, [htno]);

//   const handleDownloadPDF = async () => {
//     if (printRef.current && studentResult?.details) {
//       try {
//         setIsPdfLoading(true);
//         const studentName = studentResult.details.name.replace(/\s+/g, "_");
//         const rollNumber = studentResult.details.rollNumber;
//         const fileName = `${studentName}_${rollNumber}_Results.pdf`;

//         // Hide ads and buttons for PDF generation
//         const adsElements = printRef.current.querySelectorAll('.ad-banner');
//         const buttonsElements = printRef.current.querySelectorAll('button');

//         // Store original display values
//         const adsDisplays = Array.from(adsElements).map(el => (el as HTMLElement).style.display);
//         const buttonsDisplays = Array.from(buttonsElements).map(el => (el as HTMLElement).style.display);

//         // Hide elements
//         adsElements.forEach((el) => {
//           (el as HTMLElement).style.display = 'none';
//         });
//         buttonsElements.forEach((el) => {
//           (el as HTMLElement).style.display = 'none';
//         });

//         // Better quality settings for html2canvas
//         const canvas = await html2canvas(printRef.current, {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           allowTaint: true,
//           backgroundColor: '#ffffff',
//         });

//         // Restore original display values
//         adsElements.forEach((el, i) => {
//           (el as HTMLElement).style.display = adsDisplays[i];
//         });
//         buttonsElements.forEach((el, i) => {
//           (el as HTMLElement).style.display = buttonsDisplays[i];
//         });

//         const imgData = canvas.toDataURL("image/png");

//         // Use A4 size
//         const pdf = new jsPDF({
//           orientation: "portrait",
//           unit: "mm",
//           format: "a4",
//         });

//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();

//         // Calculate the scaled dimensions
//         const imgWidth = pageWidth - 20; // 10mm margin on each side
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         // Add header to PDF
//         pdf.setFontSize(16);
//         pdf.setTextColor(0, 0, 0);
//         pdf.text("JNTUH Results", pageWidth / 2, 15, { align: "center" });

//         // Add image to PDF with proper paging
//         let heightLeft = imgHeight;
//         let position = 25; // Starting position after header
//         let pageNumber = 1;

//         // First page
//         pdf.addImage(
//           imgData,
//           "PNG",
//           10, // x-coordinate (10mm from left)
//           position, // y-coordinate
//           imgWidth,
//           imgHeight
//         );

//         heightLeft -= (pageHeight - position);

//         // Add more pages if needed
//         while (heightLeft > 0) {
//           position = 10; // Reset position for new page
//           heightLeft -= pageHeight;
//           pageNumber++;

//           pdf.addPage();
//           pdf.setFontSize(12);
//           pdf.text(`Page ${pageNumber}`, pageWidth - 20, pageHeight - 10);

//           pdf.addImage(
//             imgData,
//             "PNG",
//             10, // x-coordinate
//             position - heightLeft, // y-coordinate adjusted
//             imgWidth,
//             imgHeight
//           );
//         }

//         // Add footer with timestamp and source URL
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(
//           "Generated on: " + new Date().toLocaleString(),
//           10,
//           pageHeight - 5
//         );
//         pdf.text(
//           "https://jntuhresults.theskypedia.com",
//           pageWidth - 10,
//           pageHeight - 5,
//           { align: "right" }
//         );

//         pdf.save(fileName);
//       } catch (error) {
//         console.error("PDF generation error:", error);
//       } finally {
//         setIsPdfLoading(false);
//       }
//     }
//   };

//   const handlePrint = () => {
//     if (printRef.current && studentResult?.details) {
//       try {
//         setIsPrinting(true);
//         const studentName = studentResult.details.name.replace(/\s+/g, "_");
//         const rollNumber = studentResult.details.rollNumber;
//         const title = `${studentName}_${rollNumber}_Results`;

//         const printWindow = window.open("", "_blank");
//         if (!printWindow) {
//           alert("Please allow pop-ups to print the results");
//           setIsPrinting(false);
//           return;
//         }

//         // Clone the content to modify it for printing
//         const printContent = printRef.current.cloneNode(true) as HTMLElement;

//         // Remove ads and other non-printable elements
//         const adsToRemove = printContent.querySelectorAll('.ad-banner');
//         adsToRemove.forEach(ad => ad.parentNode?.removeChild(ad));

//         const buttonsToRemove = printContent.querySelectorAll('button');
//         buttonsToRemove.forEach(button => button.parentNode?.removeChild(button));

//         printWindow.document.write(`
//           <!DOCTYPE html>
//           <html>
//             <head>
//               <title>${title}</title>
//               <link
//                 href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
//                 rel="stylesheet"
//               >
//               <style>
//                 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
//                 body {
//                   font-family: 'Inter', sans-serif;
//                   -webkit-print-color-adjust: exact;
//                   print-color-adjust: exact;
//                   color-adjust: exact;
//                   padding: 20px;
//                 }
//                 @page {
//                   size: A4;
//                   margin: 15mm;
//                 }
//                 .watermark {
//                   position: fixed;
//                   bottom: 10mm;
//                   left: 0;
//                   right: 0;
//                   text-align: center;
//                   font-size: 9pt;
//                   color: #666;
//                 }
//                 table {
//                   width: 100%;
//                   border-collapse: collapse;
//                 }
//                 th, td {
//                   border: 1px solid #ddd;
//                   padding: 8px;
//                 }
//                 th {
//                   background-color: #f2f2f2;
//                 }
//                 .card {
//                   border: 1px solid #e2e8f0;
//                   border-radius: 0.5rem;
//                   margin-bottom: 1.5rem;
//                 }
//                 .card-header {
//                   border-bottom: 1px solid #e2e8f0;
//                   padding: 1rem;
//                 }
//                 .card-content {
//                   padding: 1rem;
//                 }
//                 .card-footer {
//                   border-top: 1px solid #e2e8f0;
//                   padding: 1rem;
//                 }
//                 @media print {
//                   .no-print {
//                     display: none !important;
//                   }
//                   .page-break {
//                     page-break-before: always;
//                   }
//                 }
//               </style>
//             </head>
//             <body>
//               <div class="max-w-4xl mx-auto">
//                 <div class="text-center mb-6">
//                   <h1 class="text-3xl font-bold">JNTUH Results</h1>
//                   <p class="text-gray-500 mt-2">Generated on ${new Date().toLocaleString()}</p>
//                 </div>
//                 ${printContent.innerHTML}
//                 <div class="watermark">Generated from https://jntuhresults.theskypedia.com</div>
//               </div>
//               <script>
//                 window.onload = () => {
//                   setTimeout(() => {
//                     window.print();
//                     window.onafterprint = () => window.close();
//                   }, 1000);
//                 }
//               </script>
//             </body>
//           </html>
//         `);

//         printWindow.document.close();
//       } catch (error) {
//         console.error("Print error:", error);
//       } finally {
//         setIsPrinting(false);
//       }
//     }
//   };

//   useEffect(() => {
//     const handlePrintShortcut = (event: KeyboardEvent) => {
//       if ((event.ctrlKey || event.metaKey) && event.key === "p") {
//         event.preventDefault();
//         handlePrint();
//       }
//     };

//     window.addEventListener("keydown", handlePrintShortcut);
//     return () => {
//       window.removeEventListener("keydown", handlePrintShortcut);
//     };
//   }, [studentResult]);

//   if (isLoading) {
//     return <LoadingState />;
//   }

//   if (error) {
//     return <ErrorState message={error} debug={debug || undefined} />;
//   }

//   if (!studentResult || !studentResult.details || !studentResult.results) {
//     return <ErrorState message="No results data found" debug={debug || undefined} />;
//   }

//   // Get semesters from the structure
//   const semesters = studentResult.results.semesters || [];

//   // Sort semesters
//   const orderedSemesters = [...semesters].sort((a, b) => {
//     const [aYear, aSem] = a.semester.split("-").map(Number);
//     const [bYear, bSem] = b.semester.split("-").map(Number);
//     return aYear === bYear ? aSem - bSem : aYear - bYear;
//   });

//   // Filter semesters based on active tab
//   const filteredSemesters = activeTab === "all"
//     ? orderedSemesters
//     : activeTab === "backlogs"
//       ? orderedSemesters.filter(sem => sem.backlogs > 0)
//       : activeTab === "passed"
//         ? orderedSemesters.filter(sem => sem.backlogs === 0)
//         : orderedSemesters;

//   // Calculate overall stats
//   const totalCredits = studentResult.results.credits || 0;
//   const totalBacklogs = studentResult.results.backlogs || 0;
//   const cgpa = studentResult.results.CGPA || "0.00";

//   // Calculate grade status
//   let gradeStatus = "Good";
//   const cgpaValue = parseFloat(cgpa);

//   if (cgpaValue >= 9) gradeStatus = "Excellent";
//   else if (cgpaValue >= 8) gradeStatus = "Very Good";
//   else if (cgpaValue >= 7) gradeStatus = "Good";
//   else if (cgpaValue >= 6) gradeStatus = "Satisfactory";
//   else gradeStatus = "Needs Improvement";

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* Top Ad */}
//       <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6 ad-banner" />

//       <div ref={printRef} className="bg-white">
//         {/* Student Details Card */}
//         <Card className="mb-6">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle>Student Results</CardTitle>
//               <Badge variant={totalBacklogs > 0 ? "outline" : "success"}>
//                 CGPA: {cgpa}
//               </Badge>
//             </div>
//             <CardDescription>
//               Comprehensive academic performance report
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div className="space-y-2">
//                 <div className="flex justify-between border-b pb-1">
//                   <span className="font-medium">Name:</span>
//                   <span>{studentResult.details.name}</span>
//                 </div>
//                 <div className="flex justify-between border-b pb-1">
//                   <span className="font-medium">Father's Name:</span>
//                   <span>{studentResult.details.fatherName}</span>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between border-b pb-1">
//                   <span className="font-medium">Hall Ticket:</span>
//                   <span className="font-mono">{studentResult.details.rollNumber}</span>
//                 </div>
//                 <div className="flex justify-between border-b pb-1">
//                   <span className="font-medium">College Code:</span>
//                   <span>{studentResult.details.collegeCode}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Summary Statistics */}
//             <div className="mt-6 grid grid-cols-3 gap-4 text-center">
//               <div className="p-3 bg-blue-50 rounded-lg">
//                 <p className="text-2xl font-bold text-blue-700">{cgpa}</p>
//                 <p className="text-xs text-blue-600">CGPA</p>
//               </div>
//               <div className="p-3 bg-green-50 rounded-lg">
//                 <p className="text-2xl font-bold text-green-700">{totalCredits}</p>
//                 <p className="text-xs text-green-600">Total Credits</p>
//               </div>
//               <div className="p-3 bg-orange-50 rounded-lg">
//                 <p className="text-2xl font-bold text-orange-700">{totalBacklogs}</p>
//                 <p className="text-xs text-orange-600">Total Backlogs</p>
//               </div>
//             </div>

//             <div className="mt-4 p-3 rounded-lg bg-gray-50">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-medium">Overall Performance:</span>
//                 <span className="text-sm font-semibold">{gradeStatus}</span>
//               </div>
//               <SGPAGauge sgpa={cgpa} />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Filter tabs for semesters */}
//         <div className="mb-6 print:hidden">
//           <Tabs defaultValue="all" onValueChange={setActiveTab}>
//             <TabsList className="grid grid-cols-3">
//               <TabsTrigger value="all">All Semesters</TabsTrigger>
//               <TabsTrigger value="passed">Passed</TabsTrigger>
//               <TabsTrigger value="backlogs">With Backlogs</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Semesters Results */}
//         {filteredSemesters.length > 0 ? (
//           filteredSemesters.map((semester, index) => (
//             <ResultsTable
//               key={semester.semester}
//               semesterData={semester}
//               showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
//             />
//           ))
//         ) : (
//           <Card className="text-center p-6 bg-yellow-50">
//             <CardContent>
//               <p className="text-yellow-600">No semester data available</p>
//             </CardContent>
//           </Card>
//         )}

//         {/* Overall Summary Card */}
//         <Card className="mt-6">
//           <CardHeader>
//             <CardTitle className="text-xl text-center">Academic Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-center items-center space-x-6 text-center">
//               <div>
//                 <p className="text-3xl font-bold">{cgpa}</p>
//                 <p className="text-sm text-gray-600">CGPA</p>
//               </div>
//               <div className="h-12 w-px bg-gray-200"></div>
//               <div>
//                 <p className="text-3xl font-bold">{totalCredits}</p>
//                 <p className="text-sm text-gray-600">Credits</p>
//               </div>
//               <div className="h-12 w-px bg-gray-200"></div>
//               <div>
//                 <p className="text-3xl font-bold">{totalBacklogs}</p>
//                 <p className="text-sm text-gray-600">Backlogs</p>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-center text-xs text-gray-500">
//             <p>Performance status: {gradeStatus}</p>
//           </CardFooter>
//         </Card>
//       </div>

//       {/* Bottom Ad */}
//       <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6 ad-banner" />

//       {/* Action Buttons */}
//       <div className="flex flex-wrap gap-4 mt-6">
//         <Button
//           onClick={handlePrint}
//           disabled={isPrinting}
//           className="flex items-center gap-2"
//         >
//           <Printer size={16} />
//           {isPrinting ? "Preparing..." : "Print Results"}
//         </Button>

//         <Button
//           onClick={handleDownloadPDF}
//           disabled={isPdfLoading}
//           variant="secondary"
//           className="flex items-center gap-2"
//         >
//           <Download size={16} />
//           {isPdfLoading ? "Generating..." : "Download PDF"}
//         </Button>

//         <Button
//           variant="outline"
//           className="flex items-center gap-2"
//           onClick={() => {
//             // Copy results link
//             const url = window.location.href;
//             navigator.clipboard.writeText(url);
//             alert("Results link copied to clipboard!");
//           }}
//         >
//           <FileText size={16} />
//           Share Results
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default StudentResultsTables;



"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Printer, FileText, AlertTriangle } from "lucide-react";
import { JNTUHService } from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import AdBanner from "@/components/Adsense/AdBanner";

// Loading State with improved UI
const LoadingState = () => (
  <div className="space-y-6 max-w-4xl mx-auto p-4">
    <Card>
      <CardHeader className="space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="py-4 text-center">
          <Progress value={75} className="w-full h-2" />
          <p className="mt-2 text-sm text-muted-foreground">Loading results...</p>
        </div>
      </CardContent>
    </Card>
    <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
  </div>
);

// Error State with improved UI
const ErrorState = ({ message, debug }: { message: string; debug?: string }) => (
  <div className="max-w-4xl mx-auto p-4">
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <CardTitle className="text-center text-red-700">Error Loading Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-red-600">{message}</p>
        {debug && (
          <div className="mt-4 bg-white p-3 rounded border border-red-200 overflow-auto max-h-40">
            <p className="text-xs font-semibold mb-2">Debug Information:</p>
            <pre className="text-xs text-gray-700">{debug}</pre>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </CardFooter>
    </Card>
    <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-4" />
  </div>
);

type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "F";

const getGradeColor = (grade: Grade): string => {
  const colors: Record<Grade, string> = {
    O: "text-green-600",
    "A+": "text-green-500",
    A: "text-green-400",
    "B+": "text-blue-500",
    B: "text-blue-400",
    C: "text-yellow-500",
    F: "text-red-500",
  };
  return colors[grade] || "text-gray-600";
};

// Updated interface for the data structure
interface NewSubject {
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
  subjects: NewSubject[];
  semesterSGPA: string;
  semesterCredits: number;
  semesterGrades: number;
  backlogs: number;
  failed: boolean;
}

interface ResultsTableProps {
  semesterData: SemesterData;
  showAd?: boolean;
}

// SGPA Gauge Component
const SGPAGauge: React.FC<{ sgpa: string }> = ({ sgpa }) => {
  const sgpaValue = parseFloat(sgpa);
  let color = "bg-red-500";

  if (sgpaValue >= 9) color = "bg-green-500";
  else if (sgpaValue >= 8) color = "bg-green-400";
  else if (sgpaValue >= 7) color = "bg-blue-500";
  else if (sgpaValue >= 6) color = "bg-yellow-500";

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs mb-1">
        <span>0</span>
        <span>10</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${(sgpaValue/10)*100}%` }}
        ></div>
      </div>
      <div className="text-center font-semibold mt-1">{sgpa}</div>
    </div>
  );
};

// Enhanced ResultsTable component with better UI
const ResultsTable: React.FC<ResultsTableProps> = ({
  semesterData,
  showAd,
}) => {
  return (
    <div className="mb-8 break-inside-avoid">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Semester {semesterData.semester}
            </CardTitle>
            <Badge variant={parseFloat(semesterData.semesterSGPA) >= 7 ? "outline" : parseFloat(semesterData.semesterSGPA) >= 6 ? "default" : "destructive"}>
              SGPA: {semesterData.semesterSGPA}
            </Badge>
          </div>
          <SGPAGauge sgpa={semesterData.semesterSGPA} />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-20 font-medium">Code</TableHead>
                  <TableHead className="w-40 md:w-48 font-medium">Subject</TableHead>
                  <TableHead className="w-16 text-center font-medium">Internal</TableHead>
                  <TableHead className="w-16 text-center font-medium">External</TableHead>
                  <TableHead className="w-16 text-center font-medium">Credits</TableHead>
                  <TableHead className="w-16 text-center font-medium">Grade</TableHead>
                  <TableHead className="w-20 text-center font-medium">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semesterData.subjects.map((subject) => (
                  <TableRow key={subject.subjectCode} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-xs">
                      {subject.subjectCode}
                    </TableCell>
                    <TableCell
                      className="relative group"
                      title={subject.subjectName}
                    >
                      {/* Mobile view with more aggressive truncation */}
                      <div className="md:hidden overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[120px]">
                        {subject.subjectName}
                      </div>

                      {/* Desktop view with better handling */}
                      <div className="hidden md:block overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">
                        {subject.subjectName}
                      </div>

                      {/* Tooltip for both mobile and desktop */}
                      <div className="hidden group-hover:block absolute z-10 bg-black text-white text-xs rounded p-2 left-0 -mt-1 w-48 shadow-lg">
                        {subject.subjectName}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {subject.internalMarks}
                    </TableCell>
                    <TableCell className="text-center">
                      {subject.externalMarks}
                    </TableCell>
                    <TableCell className="text-center">
                      {subject.credits}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`font-bold ${getGradeColor(
                          subject.grades as Grade
                        )}`}
                      >
                        {subject.grades}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {subject.totalMarks || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between items-center text-xs text-gray-600 border-t pt-4">
          <div className="flex gap-4">
            <div>Credits: {semesterData.semesterCredits}</div>
            <div>Grade Points: {semesterData.semesterGrades}</div>
          </div>
          {semesterData.backlogs > 0 && (
            <Badge variant="destructive">Backlogs: {semesterData.backlogs}</Badge>
          )}
        </CardFooter>
      </Card>

      {showAd && (
        <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
      )}
    </div>
  );
};

const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
  const [studentResult, setStudentResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await JNTUHService.getStudentResults(htno);
        console.log("API Response:", result); // Debug log

        if (!result) {
          setDebug("API returned empty result");
          setError("No results data returned from API");
          return;
        }

        setStudentResult(result);
        console.log("Student result set:", result);

      } catch (err) {
        console.error("Error fetching results:", err);
        setDebug(`Fetch error: ${err instanceof Error ? err.message : String(err)}`);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (htno) {
      fetchResults();
    } else {
      setError("No hall ticket number provided");
      setIsLoading(false);
    }
  }, [htno]);

  const handleDownloadPDF = async () => {
    if (printRef.current && studentResult?.details) {
      try {
        setIsPdfLoading(true);
        const studentName = studentResult.details.name.replace(/\s+/g, "_");
        const rollNumber = studentResult.details.rollNumber;
        const fileName = `${studentName}_${rollNumber}_Results.pdf`;

        // Create a new PDF directly without using html2canvas
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true, // Reduce file size
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15; // Margin in mm

        // Add header
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text("JNTUH Results", pageWidth / 2, margin, { align: "center" });

        // Add student details
        pdf.setFontSize(12);
        pdf.text(`Name: ${studentResult.details.name}`, margin, margin + 10);
        pdf.text(`Hall Ticket: ${studentResult.details.rollNumber}`, margin, margin + 15);
        pdf.text(`Father's Name: ${studentResult.details.fatherName}`, margin, margin + 20);
        pdf.text(`College Code: ${studentResult.details.collegeCode}`, margin, margin + 25);

        // Add summary
        pdf.setFontSize(14);
        pdf.text("Academic Summary", pageWidth / 2, margin + 35, { align: "center" });
        pdf.setFontSize(12);
        pdf.text(`CGPA: ${studentResult.results.CGPA}`, margin, margin + 45);
        pdf.text(`Total Credits: ${studentResult.results.credits}`, margin + 60, margin + 45);
        pdf.text(`Backlogs: ${studentResult.results.backlogs}`, margin + 120, margin + 45);

        // Draw a line
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, margin + 50, pageWidth - margin, margin + 50);

        // Add semester details - one semester per page
        let currentY = margin + 55;
        let pageNum = 1;

        // Sort semesters
        const orderedSemesters = [...studentResult.results.semesters].sort((a, b) => {
          const [aYear, aSem] = a.semester.split("-").map(Number);
          const [bYear, bSem] = b.semester.split("-").map(Number);
          return aYear === bYear ? aSem - bSem : aYear - bYear;
        });

        for (let i = 0; i < orderedSemesters.length; i++) {
          const sem = orderedSemesters[i];

          // Check if we need a new page
          if (i > 0) {
            pdf.addPage();
            currentY = margin;
            pageNum++;
          }

          // Semester header
          pdf.setFontSize(14);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`Semester ${sem.semester} - SGPA: ${sem.semesterSGPA}`, margin, currentY);
          currentY += 8;

          // Create table headers
          const colWidths = [20, 50, 15, 15, 15, 15, 15];
          const headers = ["Code", "Subject", "Internal", "External", "Credits", "Grade", "Total"];

          // Draw table header
          pdf.setFillColor(240, 240, 240);
          pdf.rect(margin, currentY, pageWidth - 2 * margin, 7, 'F');
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(9);
          pdf.setFont("helvetica", "bold");

          let xPos = margin;
          for (let j = 0; j < headers.length; j++) {
            pdf.text(headers[j], xPos + 2, currentY + 5);
            xPos += colWidths[j];
          }
          currentY += 7;

          // Draw subject rows
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8);

          for (let j = 0; j < sem.subjects.length; j++) {
            const subj = sem.subjects[j];

            // Alternate row colors
            if (j % 2 === 1) {
              pdf.setFillColor(248, 248, 248);
              pdf.rect(margin, currentY, pageWidth - 2 * margin, 7, 'F');
            }

            // Draw cell borders
            pdf.setDrawColor(220, 220, 220);
            pdf.line(margin, currentY, pageWidth - margin, currentY);

            xPos = margin;

            // Subject code
            pdf.text(subj.subjectCode, xPos + 2, currentY + 5);
            xPos += colWidths[0];

            // Subject name (truncate if too long)
            const subjectName = subj.subjectName;
            const truncName = subjectName.length > 30 ?
              subjectName.substring(0, 27) + "..." :
              subjectName;
            pdf.text(truncName, xPos + 2, currentY + 5);
            xPos += colWidths[1];

            // Internal marks
            pdf.text(subj.internalMarks.toString(), xPos + colWidths[2]/2, currentY + 5, { align: "center" });
            xPos += colWidths[2];

            // External marks
            pdf.text(subj.externalMarks.toString(), xPos + colWidths[3]/2, currentY + 5, { align: "center" });
            xPos += colWidths[3];

            // Credits
            pdf.text(subj.credits.toString(), xPos + colWidths[4]/2, currentY + 5, { align: "center" });
            xPos += colWidths[4];

            // Grade with color
            const grade = subj.grades.toString();
            if (grade === "F") {
              pdf.setTextColor(255, 0, 0); // Red for failed
            } else if (grade === "O" || grade === "A+" || grade === "A") {
              pdf.setTextColor(0, 128, 0); // Green for top grades
            } else {
              pdf.setTextColor(0, 0, 0); // Black for other grades
            }
            pdf.setFont("helvetica", "bold");
            pdf.text(grade, xPos + colWidths[5]/2, currentY + 5, { align: "center" });
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            xPos += colWidths[5];

            // Total marks
            pdf.text(subj.totalMarks?.toString() || "-", xPos + colWidths[6]/2, currentY + 5, { align: "center" });

            currentY += 7;

            // Check if we need a new page for next row
            if (currentY > pageHeight - margin - 20 && j < sem.subjects.length - 1) {
              pdf.addPage();
              currentY = margin;
              pageNum++;

              // Repeat headers on new page
              pdf.setFillColor(240, 240, 240);
              pdf.rect(margin, currentY, pageWidth - 2 * margin, 7, 'F');
              pdf.setTextColor(0, 0, 0);
              pdf.setFontSize(9);
              pdf.setFont("helvetica", "bold");

              let xPos = margin;
              for (let k = 0; k < headers.length; k++) {
                pdf.text(headers[k], xPos + 2, currentY + 5);
                xPos += colWidths[k];
              }
              currentY += 7;
              pdf.setFont("helvetica", "normal");
              pdf.setFontSize(8);
            }
          }

          // Add semester summary
          currentY += 5;
          pdf.setFontSize(9);
          pdf.text(`Total Credits: ${sem.semesterCredits}`, margin, currentY);
          pdf.text(`Total Grade Points: ${sem.semesterGrades}`, margin + 60, currentY);

          if (sem.backlogs > 0) {
            pdf.setTextColor(255, 0, 0);
            pdf.text(`Backlogs: ${sem.backlogs}`, margin + 120, currentY);
            pdf.setTextColor(0, 0, 0);
          }

          currentY += 10;
        }

        // Add footer to each page
        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(100, 100, 100);

          // Add page number
          pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: "right" });

          // Add generation information and source
          pdf.text(
            "Generated on: " + new Date().toLocaleString(),
            margin,
            pageHeight - 5
          );
          pdf.text(
            "Generated from: https://jntuhresults.theskypedia.com",
            pageWidth - margin,
            pageHeight - 5,
            { align: "right" }
          );
        }

        pdf.save(fileName);
      } catch (error) {
        console.error("PDF generation error:", error);
      } finally {
        setIsPdfLoading(false);
      }
    }
  };

  const handlePrint = () => {
    if (printRef.current && studentResult?.details) {
      try {
        setIsPrinting(true);
        const studentName = studentResult.details.name.replace(/\s+/g, "_");
        const rollNumber = studentResult.details.rollNumber;
        const title = `${studentName}_${rollNumber}_Results`;

        const printWindow = window.open("", "_blank");
        if (!printWindow) {
          alert("Please allow pop-ups to print the results");
          setIsPrinting(false);
          return;
        }

        // Clone the content to modify it for printing
        const printContent = printRef.current.cloneNode(true) as HTMLElement;

        // Remove ads and other non-printable elements
        const adsToRemove = printContent.querySelectorAll('.ad-banner');
        adsToRemove.forEach(ad => ad.parentNode?.removeChild(ad));

        const buttonsToRemove = printContent.querySelectorAll('button');
        buttonsToRemove.forEach(button => button.parentNode?.removeChild(button));

        // Remove tabs section which is not needed for printing
        const tabsToRemove = printContent.querySelectorAll('[role="tablist"]');
        tabsToRemove.forEach(tab => tab.parentNode?.removeChild(tab));

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title}</title>
              <link
                href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
                rel="stylesheet"
              >
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
                body {
                  font-family: 'Inter', sans-serif;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                  color-adjust: exact;
                  padding: 20px;
                }
                @page {
                  size: A4;
                  margin: 15mm;
                }
                .watermark {
                  position: fixed;
                  bottom: 10mm;
                  left: 0;
                  right: 0;
                  text-align: center;
                  font-size: 9pt;
                  color: #666;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 10px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 6px;
                  text-align: center;
                }
                th {
                  background-color: #f2f2f2;
                  font-weight: bold;
                }
                td:nth-child(2) {
                  text-align: left;
                }
                .card {
                  border: 1px solid #e2e8f0;
                  border-radius: 0.5rem;
                  margin-bottom: 1.5rem;
                  page-break-inside: avoid;
                }
                .card-header {
                  border-bottom: 1px solid #e2e8f0;
                  padding: 1rem;
                }
                .card-content {
                  padding: 1rem;
                }
                .card-footer {
                  border-top: 1px solid #e2e8f0;
                  padding: 1rem;
                }
                @media print {
                  .no-print {
                    display: none !important;
                  }
                  .page-break {
                    page-break-before: always;
                  }
                  @page {
                    margin: 15mm;
                  }
                  table {
                    page-break-inside: auto;
                  }
                  tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                  }
                  thead {
                    display: table-header-group;
                  }
                  tfoot {
                    display: table-footer-group;
                  }
                }
              </style>
            </head>
            <body>
              <div class="max-w-4xl mx-auto">
                <div class="text-center mb-6">
                  <h1 class="text-3xl font-bold">JNTUH Results</h1>
                  <p class="text-gray-500 mt-2">Generated on ${new Date().toLocaleString()}</p>
                </div>
                ${printContent.innerHTML}
                <div class="text-center mt-6 mb-4 text-sm text-gray-600">
                  <p>Total CGPA: ${studentResult.results.CGPA} | Total Credits: ${studentResult.results.credits}</p>
                  ${studentResult.results.backlogs > 0 ? `<p class="text-red-500">Total Backlogs: ${studentResult.results.backlogs}</p>` : ''}
                </div>
                <div class="watermark">Generated from: https://jntuhresults.theskypedia.com</div>
              </div>
              <script>
                window.onload = () => {
                  // Fix table layout issues before printing
                  const tables = document.querySelectorAll('table');
                  tables.forEach(table => {
                    table.setAttribute('cellspacing', '0');
                    table.setAttribute('cellpadding', '5');

                    // Add headers to tables that might span pages
                    const header = table.querySelector('thead');
                    if (header) {
                      const originalHeader = header.cloneNode(true);
                      table.tHead = originalHeader as HTMLTableSectionElement;
                    }
                  });

                  setTimeout(() => {
                    window.print();
                    window.onafterprint = () => window.close();
                  }, 1000);
                }
              </script>
            </body>
          </html>
        `);

        printWindow.document.close();
      } catch (error) {
        console.error("Print error:", error);
      } finally {
        setIsPrinting(false);
      }
    }
  };

  useEffect(() => {
    const handlePrintShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", handlePrintShortcut);
    return () => {
      window.removeEventListener("keydown", handlePrintShortcut);
    };
  }, [studentResult]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} debug={debug || undefined} />;
  }

  if (!studentResult || !studentResult.details || !studentResult.results) {
    return <ErrorState message="No results data found" debug={debug || undefined} />;
  }

  // Get semesters from the structure
  const semesters = studentResult.results.semesters || [];

  // Sort semesters
  const orderedSemesters = [...semesters].sort((a, b) => {
    const [aYear, aSem] = a.semester.split("-").map(Number);
    const [bYear, bSem] = b.semester.split("-").map(Number);
    return aYear === bYear ? aSem - bSem : aYear - bYear;
  });

  // Filter semesters based on active tab
  const filteredSemesters = activeTab === "all"
    ? orderedSemesters
    : activeTab === "backlogs"
      ? orderedSemesters.filter(sem => sem.backlogs > 0)
      : activeTab === "passed"
        ? orderedSemesters.filter(sem => sem.backlogs === 0)
        : orderedSemesters;

  // Calculate overall stats
  const totalCredits = studentResult.results.credits || 0;
  const totalBacklogs = studentResult.results.backlogs || 0;
  const cgpa = studentResult.results.CGPA || "0.00";

  // Calculate grade status
  let gradeStatus = "Good";
  const cgpaValue = parseFloat(cgpa);

  if (cgpaValue >= 9) gradeStatus = "Excellent";
  else if (cgpaValue >= 8) gradeStatus = "Very Good";
  else if (cgpaValue >= 7) gradeStatus = "Good";
  else if (cgpaValue >= 6) gradeStatus = "Satisfactory";
  else gradeStatus = "Needs Improvement";

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Top Ad */}
      <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6 ad-banner" />

      <div ref={printRef} className="bg-white">
        {/* Student Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Student Results</CardTitle>
              <Badge variant={totalBacklogs > 0 ? "outline" : "default"}>
                CGPA: {cgpa}
              </Badge>
            </div>
            <CardDescription>
              Comprehensive academic performance report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Name:</span>
                  <span>{studentResult.details.name}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Father's Name:</span>
                  <span>{studentResult.details.fatherName}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">Hall Ticket:</span>
                  <span className="font-mono">{studentResult.details.rollNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="font-medium">College Code:</span>
                  <span>{studentResult.details.collegeCode}</span>
                </div>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">{cgpa}</p>
                <p className="text-xs text-blue-600">CGPA</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">{totalCredits}</p>
                <p className="text-xs text-green-600">Total Credits</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-700">{totalBacklogs}</p>
                <p className="text-xs text-orange-600">Total Backlogs</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Performance:</span>
                <span className="text-sm font-semibold">{gradeStatus}</span>
              </div>
              <SGPAGauge sgpa={cgpa} />
            </div>
          </CardContent>
        </Card>

        {/* Filter tabs for semesters */}
        <div className="mb-6 print:hidden">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All Semesters</TabsTrigger>
              <TabsTrigger value="passed">Passed</TabsTrigger>
              <TabsTrigger value="backlogs">With Backlogs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Semesters Results */}
        {filteredSemesters.length > 0 ? (
          filteredSemesters.map((semester, index) => (
            <ResultsTable
              key={semester.semester}
              semesterData={semester}
              showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
            />
          ))
        ) : (
          <Card className="text-center p-6 bg-yellow-50">
            <CardContent>
              <p className="text-yellow-600">No semester data available</p>
            </CardContent>
          </Card>
        )}

        {/* Overall Summary Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-center">Academic Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center space-x-6 text-center">
              <div>
                <p className="text-3xl font-bold">{cgpa}</p>
                <p className="text-sm text-gray-600">CGPA</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold">{totalCredits}</p>
                <p className="text-sm text-gray-600">Credits</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold">{totalBacklogs}</p>
                <p className="text-sm text-gray-600">Backlogs</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-xs text-gray-500">
            <p>Performance status: {gradeStatus}</p>
          </CardFooter>
        </Card>
      </div>

      {/* Bottom Ad */}
      <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6 ad-banner" />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          onClick={handlePrint}
          disabled={isPrinting}
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          {isPrinting ? "Preparing..." : "Print Results"}
        </Button>

        <Button
          onClick={handleDownloadPDF}
          disabled={isPdfLoading}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Download size={16} />
          {isPdfLoading ? "Generating..." : "Download PDF"}
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            // Copy results link
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            alert("Results link copied to clipboard!");
          }}
        >
          <FileText size={16} />
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default StudentResultsTables;