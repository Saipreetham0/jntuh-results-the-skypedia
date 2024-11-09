import { Results, SemesterResult, StudentResult, Subject } from "./types";

// app/lib/api.ts
const API_BASE_URL = 'https://jntuhresults.up.railway.app';

export class JNTUHService {
  static async getStudentResults(htno: string): Promise<StudentResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/academicresult?htno=${htno}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch student results:', error);
      throw error;
    }
  }

  // Helper method to get semester-wise results
  static getSemesterSubjects(results: Results, semester: string): Subject[] {
    const semResult = results[semester] as SemesterResult;
    if (!semResult) return [];

    return Object.entries(semResult)
      .filter(([key, value]) =>
        typeof value === 'object' &&
        'subject_code' in value &&
        'subject_name' in value
      )
      .map(([_, subject]) => subject as Subject);
  }

  // Helper to get all semesters
  static getSemestersList(results: Results): string[] {
    return Object.keys(results).filter(key =>
      key !== 'Total' &&
      typeof results[key] === 'object'
    );
  }

  // Helper to calculate GPA for specific semester
  static getSemesterGPA(results: Results, semester: string): string {
    const semResult = results[semester] as SemesterResult;
    return semResult?.CGPA || '0';
  }
}

// Example components usage: