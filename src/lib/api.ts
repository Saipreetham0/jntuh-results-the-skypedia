import { Results, SemesterResult, StudentResult, Subject } from "@/types/api";

export class JNTUHService {
  static async getStudentResults(htno: string): Promise<StudentResult> {
    try {
      const response = await fetch(`/api/consolidated-results${htno}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Helper method to get semester-wise results
  static getSemesterSubjects(results: Results, semester: string): Subject[] {
    // Add null check for results
    if (!results) return [];

    const semResult = results[semester] as SemesterResult;
    if (!semResult) return [];

    return Object.entries(semResult)
      .filter(
        ([key, value]) =>
          typeof value === "object" &&
          value !== null && // Add null check here
          "subject_code" in value &&
          "subject_name" in value
      )
      .map(([_, subject]) => subject as Subject);
  }

  // Helper to get all semesters - Fixed with proper null checks
  static getSemestersList(results: Results): string[] {
    // Check if results is null or undefined
    if (!results) return [];

    try {
      return Object.keys(results).filter(
        (key) => key !== "Total" &&
          results[key] !== null &&
          typeof results[key] === "object"
      );
    } catch {
      return [];
    }
  }

  // Helper to calculate GPA for specific semester
  static getSemesterGPA(results: Results, semester: string): string {
    // Add null check for results
    if (!results) return "0";

    const semResult = results[semester] as SemesterResult;
    return semResult?.CGPA || "0";
  }
}
