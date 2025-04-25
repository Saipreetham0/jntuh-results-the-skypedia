
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
// import { JNTUHService } from "@/lib/api";
// import { Results, SemesterResult, StudentResult, Subject } from "@/lib/types";

// import AdBanner from "@/components/Adsense/AdBanner";
// // // import Script from "next/script";

// // // Loading State with Ad
// const LoadingState = () => (
//   <div className="space-y-6">
//     <div className="text-center p-8 animate-pulse">
//       <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
//       <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
//     </div>
//     <p className="text-center">Loading....</p>
//     <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
//   </div>
// );

// // // Error State with Ad
// const ErrorState = ({ message }: { message: string }) => (
//   <div className="space-y-6">
//     <div className="text-center text-red-500 p-8">{message}</div>
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

// interface ResultsTableProps {
//   subjects: Subject[];
//   semesterNumber: string;
//   gpa: string;
//   semesterData: SemesterResult;
//   showAd?: boolean;
// }

// const ResultsTable: React.FC<ResultsTableProps> = ({
//   subjects,
//   semesterNumber,
//   gpa,
//   semesterData,
//   showAd,
// }) => {
//   return (
//     <div className="mb-4 break-inside-avoid">
//       <h3 className="text-lg font-semibold mb-2">
//         Semester {semesterNumber} - SGPA: {gpa}
//       </h3>
//       <div className="overflow-x-auto mb-10">
//         <Table className="w-full text-xs">
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-20">Code</TableHead>
//               <TableHead className="min-w-[150px]">Subject</TableHead>
//               <TableHead className="w-16 text-center">Internal</TableHead>
//               <TableHead className="w-16 text-center">External</TableHead>
//               <TableHead className="w-16 text-center">Credits</TableHead>
//               <TableHead className="w-16 text-center">Grade</TableHead>
//               <TableHead className="w-20 text-center">Total Marks</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {subjects.map((subject) => (
//               <TableRow key={subject.subject_code}>
//                 <TableCell className="font-mono">
//                   {subject.subject_code}
//                 </TableCell>
//                 <TableCell
//                   className="truncate max-w-[200px]"
//                   title={subject.subject_name}
//                 >
//                   {subject.subject_name}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.subject_internal}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.subject_external}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.subject_credits}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <span
//                     className={`font-bold ${getGradeColor(
//                       subject.subject_grade as Grade
//                     )}`}
//                   >
//                     {subject.subject_grade}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.subject_total || "-"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
//         <div>Total Credits: {(semesterData as any).credits}</div>
//         <div>Total Marks: {(semesterData as any).total}</div>
//       </div>
//       {showAd && (
//         <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
//       )}
//     </div>
//   );
// };
// const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
//   const [results, setResults] = useState<Results | null>(null);
//   const [studentResult, setStudentResult] = useState<StudentResult | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const printRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const result = await JNTUHService.getStudentResults(htno);
//         setStudentResult(result);
//         setResults(result.Results);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [htno]);

//   // const handlePrint = () => {
//   //   if (printRef.current) {
//   //     const printContents = printRef.current.innerHTML;
//   //     const originalContents = document.body.innerHTML;
//   //     document.body.innerHTML = printContents;
//   //     window.print();
//   //     document.body.innerHTML = originalContents;
//   //   }
//   // };

//   const handleDownloadPDF = async () => {
//     if (printRef.current && studentResult?.Details) {
//       // Generate file name using student's name and roll number
//       const studentName = studentResult.Details.NAME.replace(/\s+/g, "_");
//       const rollNumber = studentResult.Details.Roll_No;
//       const fileName = `${studentName}_${rollNumber}.pdf`;

//       const element = printRef.current;

//       // A4 size dimensions in points (mm converted to points for jsPDF)
//       const A4_WIDTH = 210; // A4 width in mm
//       const A4_HEIGHT = 297; // A4 height in mm

//       // Use html2canvas to render the content
//       const canvas = await html2canvas(element, {
//         scale: 2, // Increase scale for better quality
//         useCORS: true, // To handle cross-origin images
//       });

//       // Convert the canvas to an image
//       const imgData = canvas.toDataURL("image/png");

//       // Create jsPDF instance
//       const pdf = new jsPDF("p", "mm", "a4");

//       // Calculate the image height to maintain aspect ratio
//       const imgWidth = A4_WIDTH;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       // Add the image to the PDF
//       let y = 0; // Y-axis offset
//       if (imgHeight <= A4_HEIGHT) {
//         // If content fits on one page
//         pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
//       } else {
//         // If content spans multiple pages
//         while (y < imgHeight) {
//           pdf.addImage(imgData, "PNG", 0, y ? 0 : y, imgWidth, A4_HEIGHT);
//           y += A4_HEIGHT; // Move to the next page
//           if (y < imgHeight) {
//             pdf.addPage();
//           }
//         }
//       }

//       // Save the generated PDF
//       pdf.save(fileName);
//     } else {
//       console.error("Content or student details not available for download.");
//     }
//   };


//   const handlePrint = () => {
//     const printContents = printRef.current?.innerHTML;

//     if (printContents && studentResult?.Details) {
//       // Get student name and roll number
//       const studentName = studentResult.Details.NAME.replace(/\s+/g, "_"); // Replace spaces with underscores
//       const rollNumber = studentResult.Details.Roll_No;
//       const title = `${studentName}_${rollNumber}`; // Combine name and roll number

//       const printWindow = window.open("", "_blank");

//       printWindow?.document.write(`
//         <html>
//           <head>
//             <title>${title}</title> <!-- Dynamically set the title -->
//             <link
//               href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
//               rel="stylesheet"
//             >
//             <style>
//               @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
//               body {
//                 font-family: 'Inter', sans-serif;
//                 -webkit-print-color-adjust: exact;
//                 print-color-adjust: exact;
//               }
//               @page {
//                 size: A4;
//                 margin: 10mm;
//               }
//               .watermark {
//                 display: block;
//                 position: fixed;
//                 bottom: 10mm;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//                 font-size: 9pt;
//                 color: #666;
//               }
//             </style>
//           </head>
//           <body>
//             ${printContents}
//           </body>
//         </html>
//       `);

//       // Close the tab after printing
//       printWindow?.addEventListener("afterprint", () => {
//         printWindow.close();
//       });

//       printWindow?.document.close();
//       printWindow?.focus();
//       printWindow?.print();
//     } else {
//       console.error("Student details not found for printing.");
//     }
//   };

//   useEffect(() => {
//     const handlePrintShortcut = (event: KeyboardEvent) => {
//       // Check if the user pressed Ctrl+P or Cmd+P
//       if ((event.ctrlKey || event.metaKey) && event.key === "p") {
//         event.preventDefault(); // Prevent default browser print behavior
//         handlePrint(); // Trigger the custom print handler
//       }
//     };

//     // Add the event listener
//     window.addEventListener("keydown", handlePrintShortcut);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("keydown", handlePrintShortcut);
//     };
//   }, [handlePrint]); // Add handlePrint to the dependency array

//   // useEffect(() => {
//   //   const handlePrintShortcut = (event: KeyboardEvent) => {
//   //     // Check if the user pressed Ctrl+P or Cmd+P
//   //     if ((event.ctrlKey || event.metaKey) && event.key === "p") {
//   //       event.preventDefault(); // Prevent default browser print behavior
//   //       handlePrint(); // Trigger the custom print handler
//   //     }
//   //   };

//   //   // Add the event listener
//   //   window.addEventListener("keydown", handlePrintShortcut);

//   //   // Cleanup the event listener on component unmount
//   //   return () => {
//   //     window.removeEventListener("keydown", handlePrintShortcut);
//   //   };
//   // }, );

//   if (isLoading) {
//     // return <div className="text-center p-8">Loading...</div>;
//     return <LoadingState />;
//   }

//   if (error) {
//     // return <div className="text-center text-red-500 p-8">{error}</div>;
//     return <ErrorState message={error} />;
//   }

//   if (!results || !studentResult) {
//     // return <div className="text-center text-red-500 p-8">No results found</div>;
//     //     return <ErrorState message="No results found" />;
//   }

//   const semesters = JNTUHService.getSemestersList(results).sort((a, b) => {
//     const [aYear, aSem] = a.split("-").map(Number);
//     const [bYear, bSem] = b.split("-").map(Number);
//     return aYear === bYear ? aSem - bSem : aYear - bYear;
//   });

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* <Button onClick={handlePrint} className="mb-4">
//         Print Results
//       </Button> */}
//       {/* Top Ad */}
//       <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6" />
//       <div ref={printRef} className="bg-white p-4">
//         <style type="text/css">{`
//           @page {
//             size: A4;
//             margin: 10mm;
//           }
//           body {
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }


//            .watermark {
//            display: none; /* Hide in all views */
//   }
//   @media print {
//     .watermark {
//       display: block; /* Show only in print view */
//       position: fixed;
//       bottom: 10mm;
//       left: 0;
//       right: 0;
//       text-align: center;
//       font-size: 9pt;
//       color: #666;
//     }
//   }
//         `}</style>
//         <div className="text-center mb-4">
//           <h1 className="text-2xl  font-bold">Student Results</h1>
//         </div>
//         {studentResult.Details && (
//           <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//             <div>
//               <strong>Name:</strong> {studentResult.Details.NAME}
//             </div>
//             <div>
//               <strong>Hall Ticket:</strong> {studentResult.Details.Roll_No}
//             </div>
//             <div>
//               <strong>Father's Name:</strong>{" "}
//               {studentResult.Details.FATHER_NAME}
//             </div>
//             <div>
//               <strong>College Code:</strong>{" "}
//               {studentResult.Details.COLLEGE_CODE}
//             </div>
//           </div>
//         )}
//         {semesters.map((semester, index) => (
//           <ResultsTable
//             key={semester}
//             subjects={JNTUHService.getSemesterSubjects(results, semester)}
//             semesterNumber={semester}
//             gpa={JNTUHService.getSemesterGPA(results, semester)}
//             semesterData={results[semester] as SemesterResult}
//             showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
//           />
//         ))}
//         <div className="mt-6 text-center">
//           <h2 className="text-xl font-bold">Overall CGPA: {results.Total}</h2>
//         </div>
//         <div className="watermark">https://jntuhresults.theskypedia.com</div>
//       </div>
//       {/* Bottom Ad */}
//       <AdBanner adSlot="8973292958" adFormat="horizontal" className="mt-6" />
//       <Button onClick={handlePrint} className="mb-4">
//         Print Results
//       </Button>

//       {/* Download Button for Mobile View */}
//       {/* <div className="fixed bottom-4 left-4 right-4 md:hidden">
//         <Button
//           onClick={handleDownloadPDF}
//           className="w-full bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Download PDF
//         </Button>
//       </div> */}
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
import { JNTUHService } from "@/lib/api";
import { Results, SemesterResult, StudentResult, Subject } from "@/lib/types";

import AdBanner from "@/components/Adsense/AdBanner";

// Loading State with Ad
const LoadingState = () => (
  <div className="space-y-6">
    <div className="text-center p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
    </div>
    <p className="text-center">Loading....</p>
    <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
  </div>
);

// Error State with Ad
const ErrorState = ({ message }: { message: string }) => (
  <div className="space-y-6">
    <div className="text-center text-red-500 p-8">{message}</div>
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

// Updated interface for the new data structure
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

// const ResultsTable: React.FC<ResultsTableProps> = ({
//   semesterData,
//   showAd,
// }) => {
//   return (
//     <div className="mb-4 break-inside-avoid">
//       <h3 className="text-lg font-semibold mb-2">
//         Semester {semesterData.semester} - SGPA: {semesterData.semesterSGPA}
//       </h3>
//       <div className="overflow-x-auto mb-10">
//         <Table className="w-full text-xs">
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-20">Code</TableHead>
//               <TableHead className="min-w-[150px]">Subject</TableHead>
//               <TableHead className="w-16 text-center">Internal</TableHead>
//               <TableHead className="w-16 text-center">External</TableHead>
//               <TableHead className="w-16 text-center">Credits</TableHead>
//               <TableHead className="w-16 text-center">Grade</TableHead>
//               <TableHead className="w-20 text-center">Total Marks</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {semesterData.subjects.map((subject) => (
//               <TableRow key={subject.subjectCode}>
//                 <TableCell className="font-mono">
//                   {subject.subjectCode}
//                 </TableCell>
//                 <TableCell
//                   className="truncate max-w-[200px]"
//                   title={subject.subjectName}
//                 >
//                   {subject.subjectName}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.internalMarks}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.externalMarks}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.credits}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <span
//                     className={`font-bold ${getGradeColor(
//                       subject.grades as Grade
//                     )}`}
//                   >
//                     {subject.grades}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {subject.totalMarks || "-"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
//         <div>Total Credits: {semesterData.semesterCredits}</div>
//         <div>Total Grades: {semesterData.semesterGrades}</div>
//         {semesterData.backlogs > 0 && (
//           <div className="text-red-500">Backlogs: {semesterData.backlogs}</div>
//         )}
//       </div>
//       {showAd && (
//         <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
//       )}
//     </div>
//   );
// };


// ResultsTable component with better handling for long subject names
const ResultsTable: React.FC<ResultsTableProps> = ({
  semesterData,
  showAd,
}) => {
  return (
    <div className="mb-4 break-inside-avoid">
      <h3 className="text-lg font-semibold mb-2">
        Semester {semesterData.semester} - SGPA: {semesterData.semesterSGPA}
      </h3>
      <div className="overflow-x-auto mb-10">
        <Table className="w-full text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Code</TableHead>
              <TableHead className="w-40 md:w-48">Subject</TableHead>
              <TableHead className="w-16 text-center">Internal</TableHead>
              <TableHead className="w-16 text-center">External</TableHead>
              <TableHead className="w-16 text-center">Credits</TableHead>
              <TableHead className="w-16 text-center">Grade</TableHead>
              <TableHead className="w-20 text-center">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesterData.subjects.map((subject) => (
              <TableRow key={subject.subjectCode}>
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
      <div className="mt-2 flex flex-wrap justify-between items-center text-xs text-gray-600">
        <div>Total Credits: {semesterData.semesterCredits}</div>
        <div>Total Grades: {semesterData.semesterGrades}</div>
        {semesterData.backlogs > 0 && (
          <div className="text-red-500">Backlogs: {semesterData.backlogs}</div>
        )}
      </div>
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
      const studentName = studentResult.details.name.replace(/\s+/g, "_");
      const rollNumber = studentResult.details.rollNumber;
      const fileName = `${studentName}_${rollNumber}.pdf`;

      const element = printRef.current;
      const A4_WIDTH = 210;
      const A4_HEIGHT = 297;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = A4_WIDTH;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let y = 0;
      if (imgHeight <= A4_HEIGHT) {
        pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
      } else {
        while (y < imgHeight) {
          pdf.addImage(imgData, "PNG", 0, y ? 0 : y, imgWidth, A4_HEIGHT);
          y += A4_HEIGHT;
          if (y < imgHeight) {
            pdf.addPage();
          }
        }
      }

      pdf.save(fileName);
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;

    if (printContents && studentResult?.details) {
      const studentName = studentResult.details.name.replace(/\s+/g, "_");
      const rollNumber = studentResult.details.rollNumber;
      const title = `${studentName}_${rollNumber}`;

      const printWindow = window.open("", "_blank");

      printWindow?.document.write(`
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
              }
              @page {
                size: A4;
                margin: 10mm;
              }
              .watermark {
                display: block;
                position: fixed;
                bottom: 10mm;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 9pt;
                color: #666;
              }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);

      printWindow?.addEventListener("afterprint", () => {
        printWindow.close();
      });

      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
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
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <>
        <ErrorState message={error} />
        {debug && (
          <div className="bg-gray-100 p-4 mt-4 rounded text-xs overflow-auto max-h-40">
            <p className="font-semibold mb-2">Debug Info:</p>
            <pre>{debug}</pre>
          </div>
        )}
      </>
    );
  }

  if (!studentResult || !studentResult.details || !studentResult.results) {
    return (
      <>
        <ErrorState message="No results data found" />
        {debug && (
          <div className="bg-gray-100 p-4 mt-4 rounded text-xs overflow-auto max-h-40">
            <p className="font-semibold mb-2">Debug Info:</p>
            <pre>{debug}</pre>
            <pre>Student result: {JSON.stringify(studentResult)}</pre>
          </div>
        )}
      </>
    );
  }

  // Get semesters from the new structure - they're in an array
  const semesters = studentResult.results.semesters || [];

  // Sort semesters if needed
  const orderedSemesters = [...semesters].sort((a, b) => {
    const [aYear, aSem] = a.semester.split("-").map(Number);
    const [bYear, bSem] = b.semester.split("-").map(Number);
    return aYear === bYear ? aSem - bSem : aYear - bYear;
  });

  console.log("Ordered semesters:", orderedSemesters);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Debug info in development mode */}
      {/* {process.env.NODE_ENV !== 'production' && (
        <div className="bg-gray-100 p-4 mb-4 rounded text-xs overflow-auto max-h-40">
          <p className="font-semibold mb-2">Debug Info:</p>
          <pre>Semesters count: {orderedSemesters.length}</pre>
          <pre>CGPA: {studentResult.results.CGPA}</pre>
          {debug && <pre>Debug: {debug}</pre>}
        </div>
      )} */}

      {/* Top Ad */}
      <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6" />
      <div ref={printRef} className="bg-white p-4">
        <style type="text/css">{`
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

           .watermark {
           display: none;
          }
          @media print {
            .watermark {
              display: block;
              position: fixed;
              bottom: 10mm;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 9pt;
              color: #666;
            }
          }
        `}</style>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Student Results</h1>
        </div>

        {/* Student Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <strong>Name:</strong> {studentResult.details.name}
          </div>
          <div>
            <strong>Hall Ticket:</strong> {studentResult.details.rollNumber}
          </div>
          <div>
            <strong>Father's Name:</strong> {studentResult.details.fatherName}
          </div>
          <div>
            <strong>College Code:</strong> {studentResult.details.collegeCode}
          </div>
        </div>

        {/* Semesters */}
        {orderedSemesters.length > 0 ? (
          orderedSemesters.map((semester, index) => (
            <ResultsTable
              key={semester.semester}
              semesterData={semester}
              showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
            />
          ))
        ) : (
          <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-600">No semester data available</p>
          </div>
        )}

        {/* Overall CGPA */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Overall CGPA: {studentResult.results.CGPA}</h2>
          <p className="text-sm text-gray-600 mt-2">
            Total Credits: {studentResult.results.credits} |
            Total Backlogs: {studentResult.results.backlogs}
          </p>
        </div>
        <div className="watermark">https://jntuhresults.theskypedia.com</div>
      </div>

      {/* Bottom Ad */}
      <AdBanner adSlot="8973292958" adFormat="horizontal" className="mt-6" />
      <Button onClick={handlePrint} className="mr-4 mb-4">
        Print Results
      </Button>
      <Button onClick={handleDownloadPDF} className="mb-4">
        Download PDF
      </Button>
    </div>
  );
};

export default StudentResultsTables;