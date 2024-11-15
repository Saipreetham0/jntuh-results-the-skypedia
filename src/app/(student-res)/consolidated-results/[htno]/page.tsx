// consolidated-results/[htno]/page.tsx
"use client";;
import { use } from "react";

import StudentResultsTables from "@/components/StudentResultsTables";

export default function StudentPage(props: { params: Promise<{ htno: string }> }) {
  const params = use(props.params);
  return (
    <div className="container mx-auto py-8 p-4">
      <StudentResultsTables htno={params.htno} />
    </div>
  );
}
