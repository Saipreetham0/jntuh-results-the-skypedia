import { useState } from "react";

export interface Subject {
    subjectCode: string;
    subjectName: string;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    grades: string;
    credits: number;
}

export interface SemesterData {
    semester: string;
    subjects: Subject[];
    semesterSGPA: string;
    semesterCredits: number;
    semesterGrades: number;
    backlogs: number;
    failed: boolean;
}

export interface StudentDetails {
    name: string;
    rollNumber: string;
    collegeCode: string;
    fatherName: string;
}

export interface BacklogsResponse {
    details: StudentDetails;
    results: {
        semesters: SemesterData[];
        totalBacklogs: number;
    };
}

export interface APIError {
    detail?: string | { msg: string }[];
    message?: string;
    statusCode?: number;
}

export function useBacklogs() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<BacklogsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchBacklogs = async (rollNumber: string) => {
        if (!rollNumber.trim()) {
            setError("Please enter a roll number");
            return;
        }

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(`/api/backlogs?rollNumber=${rollNumber.trim().toUpperCase()}`);
            const result = await response.json();

            if (!response.ok) {
                let errorMessage = "Failed to fetch backlogs";
                if (result.detail) {
                    errorMessage = typeof result.detail === 'string'
                        ? result.detail
                        : Array.isArray(result.detail)
                            ? result.detail.map((d: any) => d.msg).join(". ")
                            : "Unknown error";
                }
                throw new Error(errorMessage);
            }

            // Validate response structure
            if (!result || !result.details || !result.results) {
                throw new Error("Invalid response format");
            }

            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => {
        setData(null);
        setError(null);
    };

    return {
        loading,
        data,
        error,
        fetchBacklogs,
        clearResults
    };
}
