// consolidated-results/[htno]/page.tsx
"use client";

import StudentResultsTables from "@/components/StudentResultsTables";

export default function StudentPage({ params }: { params: { htno: string } }) {
  return (
    <div className="container mx-auto py-8 p-4">
      <StudentResultsTables htno={params.htno} />
    </div>
  );
}
