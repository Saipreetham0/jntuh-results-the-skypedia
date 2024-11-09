"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getGradeColor = (grade) => {
  const colors = {
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

const ResultsTable = ({ semesterData, semesterNumber }) => {
  // Filter out non-subject entries
  const subjects = Object.entries(semesterData)
    .filter(
      ([key, value]) =>
        typeof value === "object" &&
        "subject_code" in value &&
        "subject_name" in value
    )
    .map(([_, subject]) => subject);

  const semesterStats = {
    total: semesterData.total,
    credits: semesterData.credits,
    cgpa: semesterData.CGPA,
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Semester {semesterNumber}</span>
          <span className="text-lg">
            SGPA: <span className="font-bold">{semesterStats.cgpa}</span>
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
                      subject.subject_grade
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
          <div>Total Credits: {semesterStats.credits}</div>
          <div>Total Marks: {semesterStats.total}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const StudentResultsTables = ({ results }) => {
  // Get all semester keys (excluding 'Total')
  const semesters = Object.keys(results)
    .filter((key) => key !== "Total")
    .sort((a, b) => {
      const [aYear, aSem] = a.split("-");
      const [bYear, bSem] = b.split("-");
      return aYear === bYear ? aSem - bSem : aYear - bYear;
    });

  return (
    <div className="space-y-6">
      {semesters.map((semester) => (
        <ResultsTable
          key={semester}
          semesterData={results[semester]}
          semesterNumber={semester}
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
    </div>
  );
};

export default StudentResultsTables;
