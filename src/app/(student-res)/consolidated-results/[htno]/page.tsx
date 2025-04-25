// consolidated-results/[htno]/page.tsx
"use client";;
import { use } from "react";

import StudentResultsTables from "@/components/StudentResultsTables";
// import PrintableStudentResultsTables from "@/components/StudentResultsTables";

export default function StudentPage(props: { params: Promise<{ htno: string }> }) {
  const params = use(props.params);
  return (
    <div className="container mx-auto  ">
      <StudentResultsTables htno={params.htno} />
      {/* <PrintableStudentResultsTables htno={params.htno} /> */}



    </div>
  );
}
