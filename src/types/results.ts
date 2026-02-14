export interface Subject {
    subjectCode: string;
    subjectName: string;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    grades: string;
    credits: number;
}

export interface Exam {
    examCode: string;
    rcrv: boolean;
    graceMarks: boolean;
    subjects: Subject[];
}

export interface SemesterResult {
    semester: string;
    exams: Exam[];
}

export interface StudentDetails {
    name: string;
    rollNumber: string;
    collegeCode: string;
    fatherName: string;
    branch: string;
}

export interface ConsolidatedResult {
    details: StudentDetails;
    results: SemesterResult[];
}
