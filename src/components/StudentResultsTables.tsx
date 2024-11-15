// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { JNTUHService } from "@/lib/api";
// import { Results, SemesterResult, StudentResult, Subject } from "@/lib/types";

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
// }

// const ResultsTable: React.FC<ResultsTableProps> = ({
//   subjects,
//   semesterNumber,
//   gpa,
//   semesterData,
// }) => {
//   return (
//     <Card className="w-full mb-6">
//       <CardHeader>
//         <CardTitle className="flex justify-between items-center">
//           <span>Semester {semesterNumber}</span>
//           <span className="text-lg">
//             SGPA: <span className="font-bold">{gpa}</span>
//           </span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-24">Code</TableHead>
//               <TableHead>Subject</TableHead>
//               <TableHead className="w-24 text-center">Credits</TableHead>
//               <TableHead className="w-24 text-center">Grade</TableHead>
//               <TableHead className="w-32 text-center">Total Marks</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {subjects.map((subject) => (
//               <TableRow key={subject.subject_code}>
//                 <TableCell className="font-mono">
//                   {subject.subject_code}
//                 </TableCell>
//                 <TableCell>{subject.subject_name}</TableCell>
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

//         <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//           <div>Total Credits: {(semesterData as any).credits}</div>
//           <div>Total Marks: {(semesterData as any).total}</div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
//   const [results, setResults] = useState<Results | null>(null);
//   const [studentResult, setStudentResult] = useState<StudentResult | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

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

//   if (isLoading) {
//     return <div className="text-center p-8">Loading results...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 p-8">{error}</div>;
//   }

//   if (!results || !studentResult) {
//     return <div className="text-center p-8">No results found</div>;
//   }

//   const semesters = JNTUHService.getSemestersList(results).sort((a, b) => {
//     const [aYear, aSem] = a.split("-").map(Number);
//     const [bYear, bSem] = b.split("-").map(Number);
//     return aYear === bYear ? aSem - bSem : aYear - bYear;
//   });

//   return (
//     <div className="space-y-6">
//       {studentResult.Details && (
//         <Card className="mb-6">
//           <CardContent className="pt-6">
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="font-semibold">Name:</p>
//                 <p>{studentResult.Details.NAME}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Hall Ticket:</p>
//                 <p>{studentResult.Details.Roll_No}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">Father Name:</p>
//                 <p>{studentResult.Details.FATHER_NAME}</p>
//               </div>
//               <div>
//                 <p className="font-semibold">College Code:</p>
//                 <p>{studentResult.Details.COLLEGE_CODE}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {semesters.map((semester) => (
//         <ResultsTable
//           key={semester}
//           subjects={JNTUHService.getSemesterSubjects(results, semester)}
//           semesterNumber={semester}
//           gpa={JNTUHService.getSemesterGPA(results, semester)}
//           semesterData={results[semester] as SemesterResult}
//         />
//       ))}

//       <Card className="bg-gray-50">
//         <CardContent className="pt-6">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold">
//               Overall CGPA: {results.Total}
//             </h2>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default StudentResultsTables;

"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JNTUHService } from "@/lib/api";
import { Results, SemesterResult, StudentResult, Subject } from "@/lib/types";
import AdBanner from "@/components/Adsense/AdBanner";
// import Script from "next/script";

// Loading State with Ad
const LoadingState = () => (
  <div className="space-y-6">
    <div className="text-center p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
    </div>
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

interface ResultsTableProps {
  subjects: Subject[];
  semesterNumber: string;
  gpa: string;
  semesterData: SemesterResult;
  showAd?: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  subjects,
  semesterNumber,
  gpa,
  semesterData,
  showAd,
}) => {
  return (
    <>
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Semester {semesterNumber}</span>
            <span className="text-lg">
              SGPA: <span className="font-bold">{gpa}</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Code</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-24 text-center">Credits</TableHead>
                <TableHead className="w-24 text-center">Grade</TableHead>
                <TableHead className="w-32 text-center">Total Marks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.subject_code}>
                  <TableCell className="font-mono">
                    {subject.subject_code}
                  </TableCell>
                  <TableCell>{subject.subject_name}</TableCell>
                  <TableCell className="text-center">
                    {subject.subject_credits}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-bold ${getGradeColor(
                        subject.subject_grade as Grade
                      )}`}
                    >
                      {subject.subject_grade}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {subject.subject_total || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>Total Credits: {(semesterData as any).credits}</div>
            <div>Total Marks: {(semesterData as any).total}</div>
          </div>
        </CardContent>
      </Card>
      {showAd && (
        <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
      )}
    </>
  );
};

const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
  const [results, setResults] = useState<Results | null>(null);
  const [studentResult, setStudentResult] = useState<StudentResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await JNTUHService.getStudentResults(htno);
        setStudentResult(result);
        setResults(result.Results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [htno]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!results || !studentResult) {
    return <ErrorState message="No results found" />;
  }

  const semesters = JNTUHService.getSemestersList(results).sort((a, b) => {
    const [aYear, aSem] = a.split("-").map(Number);
    const [bYear, bSem] = b.split("-").map(Number);
    return aYear === bYear ? aSem - bSem : aYear - bYear;
  });

  return (
    <>
   

      <div className="space-y-6">
        {/* Top Ad */}
        <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6" />

        {studentResult.Details && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Name:</p>
                  <p>{studentResult.Details.NAME}</p>
                </div>
                <div>
                  <p className="font-semibold">Hall Ticket:</p>
                  <p>{studentResult.Details.Roll_No}</p>
                </div>
                <div>
                  <p className="font-semibold">Father Name:</p>
                  <p>{studentResult.Details.FATHER_NAME}</p>
                </div>
                <div>
                  <p className="font-semibold">College Code:</p>
                  <p>{studentResult.Details.COLLEGE_CODE}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {semesters.map((semester, index) => (
          <ResultsTable
            key={semester}
            subjects={JNTUHService.getSemesterSubjects(results, semester)}
            semesterNumber={semester}
            gpa={JNTUHService.getSemesterGPA(results, semester)}
            semesterData={results[semester] as SemesterResult}
            showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
          />
        ))}

        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                Overall CGPA: {results.Total}
              </h2>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <AdBanner adSlot="8973292958" adFormat="horizontal" className="mt-6" />
      </div>
    </>
  );
};

export default StudentResultsTables;
