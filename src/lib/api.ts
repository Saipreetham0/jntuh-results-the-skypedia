
import { Results, SemesterResult, StudentResult, Subject } from "./types";

// app/lib/api.ts
// const API_BASE_URL = 'https://jntuhresults.up.railway.app';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jntuhresults.up.railway.app';

// Add proxy configuration
const PROXY_CONFIG = {
  target: API_BASE_URL,
  agent: {
    proxyHost: 'proxy.toolip.io',
    proxyPort: 31112,
    proxyUsername: '8c5906b99fbd1c0bcd0f916d545c565a294fa18417499a6b43babf4c07a63a5b376a6e57c8fe6374336efa7732b34fe03eb6db89c17b3d5907c671770cc67ea3d59b066f8696adba47c3e6e3a1d06603',
    proxyPassword: 'o2dyouia1i7b',
    rejectUnauthorized: false,
  },
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/api': '/api',
  },
};


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