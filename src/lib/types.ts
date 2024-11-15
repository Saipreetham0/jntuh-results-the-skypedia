//  app/lib/types.ts
// export interface StudentDetails {
//     NAME: string;
//     Roll_No: string;
//     COLLEGE_CODE: string;
//     FATHER_NAME: string;
//   }

  export interface Subject {
    subject_code: string;
    subject_name: string;
    subject_internal: string;
    subject_external: string;
    subject_total: string;
    subject_grade: string;
    subject_credits: string;
  }

//   export interface SemesterResult {
//     [key: string]: Subject | number | string;
//     total: number;
//     credits: number;
//     CGPA: string;
//   }

//   export interface Results {
//     [key: string]: SemesterResult | string;
//     Total: string;
//   }

  export interface StudentResult {
    Details: StudentDetails;
    Results: Results;
  }


// types.ts

// export interface Subject {
//   subject_code: string;
//   subject_name: string;
//   subject_credits: string;  // Changed to string
//   subject_grade: string;
//   subject_total?: string;   // Changed to string
// }

export interface SemesterResult {
  [key: string]: string | number | Subject;
  total: string;           // Changed to string
  credits: string;         // Changed to string
  CGPA: string;
}

export interface Results {
  [key: string]: string | SemesterResult;
  Total: string;
}

// interface Results {
//   [key: string]: SemesterData | string;
//   Total: string;  // Changed from number to string
// }

export interface StudentDetails {
  NAME: string;
  Roll_No: string;
  COLLEGE_CODE: string;
  FATHER_NAME: string;
}

export interface APIResponse {
  Details: StudentDetails;
  Results: Results;
}