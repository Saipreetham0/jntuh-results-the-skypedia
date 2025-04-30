// app/api/semester-wise-results/route.ts
import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

/**
 * Error response structure following FastAPI error format
 */
interface APIErrorResponse {
  detail: string | {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
  statusCode: number;
}

/**
 * Interface for a subject result
 */
interface Subject {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grades: string;
  credits: number;
}

/**
 * Interface for an exam result
 */
interface Exam {
  examCode: string;
  rcrv: boolean;
  subjects: Subject[];
}

/**
 * Interface for a semester result
 */
interface SemesterResult {
  semester: string;
  exams: Exam[];
  latestResults?: Subject[]; // Latest results for each subject
  semesterGPA?: number; // Calculated GPA for the semester
  totalCredits?: number; // Total credits for the semester
}

/**
 * Interface for the complete student result
 */
interface StudentResult {
  details: {
    name: string;
    rollNumber: string;
    collegeCode: string;
    fatherName: string;
  };
  results: SemesterResult[];
  overallGPA?: number; // Overall GPA across all semesters
  totalCredits?: number; // Total credits earned
}

/**
 * GET handler for semester-wise results API
 *
 * @param request - The incoming request object
 * @returns - JSON response with semester-wise results data or error details
 */
export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('rollNumber');

    // Validate roll number
    if (!rollNumber) {
      return NextResponse.json(
        {
          detail: [
            {
              loc: ["query", "rollNumber"],
              msg: "Roll number is required",
              type: "value_error.missing"
            }
          ]
        } as APIErrorResponse,
        { status: 422 }
      );
    }

    // Validate roll number format
    const rollNumberRegex = /^[0-9]{1,2}[A-Z][0-9]{2}[A-Z][0-9]{4}$/;
    if (!rollNumberRegex.test(rollNumber)) {
      return NextResponse.json(
        {
          detail: [
            {
              loc: ["query", "rollNumber"],
              msg: "Invalid roll number format. Expected pattern: 20J25A0501",
              type: "value_error.pattern"
            }
          ]
        } as APIErrorResponse,
        { status: 422 }
      );
    }

    // Make request to external API
    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getAllResult?rollNumber=${rollNumber}`,
      {
        timeout: 15000, // 15 second timeout
        headers: {
          'User-Agent': 'JNTUHResultsPortal/1.0'
        }
      }
    );

    // Check if the response is valid
    if (!response.data || typeof response.data !== 'object') {
      return NextResponse.json(
        { detail: "Invalid response from upstream API" },
        { status: 502 }
      );
    }

    // Process the data to get the latest results for each subject in each semester
    const data = response.data as StudentResult;

    // Process each semester to add the latest results for each subject
    if (data.results && Array.isArray(data.results)) {
      data.results.forEach(semester => {
        const latestSubjectResults = new Map<string, Subject>();

        // Iterate through exams in reverse order (assuming newer exams come later)
        if (semester.exams && Array.isArray(semester.exams)) {
          [...semester.exams].reverse().forEach(exam => {
            if (exam.subjects && Array.isArray(exam.subjects)) {
              exam.subjects.forEach(subject => {
                // Only add the subject if it's not already in the map (since we're going newest to oldest)
                if (!latestSubjectResults.has(subject.subjectCode)) {
                  latestSubjectResults.set(subject.subjectCode, subject);
                }
              });
            }
          });
        }

        // Add the latest results to the semester object
        semester.latestResults = Array.from(latestSubjectResults.values());

        // Calculate semester GPA and total credits
        let totalPoints = 0;
        let totalCredits = 0;

        semester.latestResults.forEach(subject => {
          if (subject.credits > 0) {
            // Map grades to points
            const gradePoints: { [key: string]: number } = {
              'O': 10,
              'A+': 9,
              'A': 8,
              'B+': 7,
              'B': 6,
              'C': 5,
              'P': 4,
              'F': 0
            };

            const points = gradePoints[subject.grades] || 0;

            if (points > 0) { // Only count passing grades
              totalPoints += points * subject.credits;
              totalCredits += subject.credits;
            }
          }
        });

        semester.semesterGPA = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
        semester.totalCredits = totalCredits;
      });

      // Calculate overall GPA
      let overallTotalPoints = 0;
      let overallTotalCredits = 0;

      data.results.forEach(semester => {
        if (semester.semesterGPA && semester.totalCredits) {
          overallTotalPoints += semester.semesterGPA * semester.totalCredits;
          overallTotalCredits += semester.totalCredits;
        }
      });

      data.overallGPA = overallTotalCredits > 0 ? parseFloat((overallTotalPoints / overallTotalCredits).toFixed(2)) : 0;
      data.totalCredits = overallTotalCredits;
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Semester-wise results request failed:', error);

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // Handle specific error codes
      if (axiosError.code === 'ECONNABORTED') {
        return NextResponse.json(
          { detail: "Request timed out. Please try again later." },
          { status: 504 }
        );
      }

      if (axiosError.code === 'ECONNREFUSED') {
        return NextResponse.json(
          { detail: "Unable to connect to results server. Please try again later." },
          { status: 503 }
        );
      }

      // Handle response errors
      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 404) {
          return NextResponse.json(
            { detail: "Roll number not found" },
            { status: 404 }
          );
        }

        if (status === 429) {
          return NextResponse.json(
            { detail: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }

        // Pass through other status codes
        return NextResponse.json(
          { detail: `External API error: ${axiosError.message}` },
          { status: status >= 400 && status < 600 ? status : 502 }
        );
      }
    }

    // Default error response
    return NextResponse.json(
      { detail: "Failed to fetch semester-wise results" },
      { status: 500 }
    );
  }
}