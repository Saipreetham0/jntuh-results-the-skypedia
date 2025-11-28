// consolidated-results/[htno]/page.tsx
"use client";;
import { use } from "react";

import StudentResultsTables from "@/components/features/StudentResultsTables";
// import PrintableStudentResultsTables from "@/components/features/StudentResultsTables";

export default function StudentPage(props: { params: Promise<{ htno: string }> }) {
  const params = use(props.params);
  return (
    <div className="container mx-auto  ">
      <StudentResultsTables htno={params.htno} />
      {/* <PrintableStudentResultsTables htno={params.htno} /> */}



    </div>
  );
}
