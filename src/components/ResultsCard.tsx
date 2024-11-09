// app/components/ResultsCard.tsx
"use client";

import { Subject } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ResultsCardProps {
  semester: string;
  subjects: Subject[];
  gpa: string;
}

export function ResultsCard({ semester, subjects, gpa }: ResultsCardProps) {
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>Semester {semester}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div
              key={subject.subject_code}
              className="grid grid-cols-2 gap-2 p-2 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{subject.subject_name}</p>
                <p className="text-sm text-gray-500">{subject.subject_code}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Grade: {subject.subject_grade}</p>
                <p className="text-sm">Credits: {subject.subject_credits}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">GPA: {gpa}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
