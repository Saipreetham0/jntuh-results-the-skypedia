"use client";
import { JNTUHService } from "@/lib/api";
import { ResultsCard } from "@/components/ResultsCard";
import StudentResultsTables from "@/components/StudentResultsTables";

export default async function StudentPage({
  params,
}: {
  params: { htno: string };
}) {
  const results = await JNTUHService.getStudentResults(params.htno);
  const semesters = JNTUHService.getSemestersList(results.Results);

  return (
    <div className="max-w-4xl mx-auto p-4">
    <StudentResultsTables  results={results.Results} />
    </div>

    // <div className="max-w-4xl mx-auto p-4">

    //   <div className="mb-6">
    //     <h1 className="text-2xl font-bold">{results.Details.NAME}</h1>
    //     <p className="text-gray-600">Roll No: {results.Details.Roll_No}</p>
    //     <p className="text-gray-600">
    //       College Code: {results.Details.COLLEGE_CODE}
    //     </p>
    //   </div>

    //   <div className="space-y-4">
    //     {semesters.map((semester) => (
    //       <ResultsCard
    //         key={semester}
    //         semester={semester}
    //         subjects={JNTUHService.getSemesterSubjects(
    //           results.Results,
    //           semester
    //         )}
    //         gpa={JNTUHService.getSemesterGPA(results.Results, semester)}
    //       />
    //     ))}

    //     <div className="mt-8 text-center">
    //       <p className="text-2xl font-bold">
    //         Overall CGPA: {results.Results.Total}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}
