
"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const StudentResultsDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [stats, setStats] = useState(null);
  const [semesterData, setSemesterData] = useState([]);

  // Fetch student data
  const fetchStudentData = async (rollNum) => {
    if (!rollNum) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jntuhresults.dhethi.com/api/getAllResult?rollNumber=${rollNum}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || data.error) {
        throw new Error(data?.error || "No data found for this roll number");
      }

      setStudentData(data);

      // Process the data
      const calculatedStats = processResults(data.results);
      const calculatedSemesterData = generateSemesterData(data.results);

      setStats(calculatedStats);
      setSemesterData(calculatedSemesterData);
    } catch (err) {
      console.error("Error fetching student data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo/development, use stored data if available
  useEffect(() => {
    // Check if we have a stored roll number in session storage
    const storedRollNumber = sessionStorage.getItem('jntuhRollNumber');

    if (storedRollNumber) {
      setRollNumber(storedRollNumber);
      fetchStudentData(storedRollNumber);
    } else {
      // For demo purposes, we could use a default roll number
      setIsLoading(false);
    }
  }, []);

  const handleRollNumberSubmit = (e) => {
    e.preventDefault();
    if (rollNumber) {
      sessionStorage.setItem('jntuhRollNumber', rollNumber);
      fetchStudentData(rollNumber);
    }
  };

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value.trim().toUpperCase());
  };

  const processResults = (results) => {
    if (!results || !Array.isArray(results)) {
      return {
        totalCredits: 0,
        totalSubjects: 0,
        passedSubjects: 0,
        backlogCount: 0,
        passPercentage: 0
      };
    }

    // Calculate overall stats
    let totalCredits = 0;
    let totalSubjects = 0;
    let passedSubjects = 0;
    let backlogSubjects = new Set();
    let completedSubjects = new Set();

    // Process each semester
    results.forEach(semester => {
      if (!semester.exams || !Array.isArray(semester.exams)) return;

      // Track the latest result for each subject
      const subjectLatestResults = new Map();

      semester.exams.forEach(exam => {
        if (!exam.subjects || !Array.isArray(exam.subjects)) return;

        exam.subjects.forEach(subject => {
          // Skip subjects without a code
          if (!subject.subjectCode) return;

          // Only count credited subjects for overall stats (non-zero credits)
          if (subject.credits > 0) {
            // Check if we've seen this subject before and if this is a newer exam
            if (!subjectLatestResults.has(subject.subjectCode) ||
                ['F', 'Ab'].includes(subjectLatestResults.get(subject.subjectCode).grades)) {
              subjectLatestResults.set(subject.subjectCode, subject);
            }
          }
        });
      });

      // Process latest results for each subject
      subjectLatestResults.forEach((subject, code) => {
        totalSubjects++;

        if (!['F', 'Ab'].includes(subject.grades)) {
          passedSubjects++;
          completedSubjects.add(code);
          totalCredits += subject.credits || 0;
        } else {
          backlogSubjects.add(code);
        }
      });
    });

    // Remove subjects that were eventually passed
    completedSubjects.forEach(code => {
      if (backlogSubjects.has(code)) {
        backlogSubjects.delete(code);
      }
    });

    return {
      totalCredits,
      totalSubjects,
      passedSubjects,
      backlogCount: backlogSubjects.size,
      passPercentage: totalSubjects > 0 ? (passedSubjects / totalSubjects * 100).toFixed(1) : 0
    };
  };

  const generateSemesterData = (results) => {
    if (!results || !Array.isArray(results)) {
      return [];
    }

    return results.map(semester => {
      if (!semester.exams || !Array.isArray(semester.exams)) {
        return {
          name: semester.semester || "Unknown",
          totalSubjects: 0,
          passedSubjects: 0,
          backlogCount: 0,
          earnedCredits: 0,
          passRate: 0
        };
      }

      // Count passed and total subjects for the semester
      const semesterCode = semester.semester;

      // Find the latest result for each subject
      const uniqueSubjects = new Map();

      semester.exams.forEach(exam => {
        if (!exam.subjects || !Array.isArray(exam.subjects)) return;

        exam.subjects.forEach(subject => {
          if (!subject.subjectCode) return;

          if (subject.credits > 0) { // Only count main subjects
            // Add to unique subjects, updating if we find a later attempt
            if (!uniqueSubjects.has(subject.subjectCode) ||
                ['F', 'Ab'].includes(uniqueSubjects.get(subject.subjectCode).grades)) {
              uniqueSubjects.set(subject.subjectCode, subject);
            }
          }
        });
      });

      // Calculate semester statistics
      let totalSubjects = uniqueSubjects.size;
      let passedSubjects = 0;
      let earnedCredits = 0;
      let backlogCount = 0;

      uniqueSubjects.forEach((subject) => {
        if (!['F', 'Ab'].includes(subject.grades)) {
          passedSubjects++;
          earnedCredits += subject.credits || 0;
        } else {
          backlogCount++;
        }
      });

      return {
        name: semesterCode,
        totalSubjects,
        passedSubjects,
        backlogCount,
        earnedCredits,
        passRate: totalSubjects > 0 ? (passedSubjects / totalSubjects * 100).toFixed(0) : 0
      };
    });
  };

  const SemesterAccordion = ({ semester, index }) => {
    const [isOpen, setIsOpen] = useState(index === 0); // Open first semester by default

    if (!semester || !semester.exams || !Array.isArray(semester.exams)) {
      return null;
    }

    // Find the latest exam attempt for each subject
    const latestExamsBySubject = new Map();

    semester.exams.forEach(exam => {
      if (!exam.subjects || !Array.isArray(exam.subjects)) return;

      exam.subjects.forEach(subject => {
        if (!subject.subjectCode) return;

        // Skip updating if we've already found a passing grade for this subject
        if (!latestExamsBySubject.has(subject.subjectCode) ||
            ['F', 'Ab'].includes(latestExamsBySubject.get(subject.subjectCode).grades)) {
          latestExamsBySubject.set(subject.subjectCode, subject);
        }
      });
    });

    // Convert to array and sort
    const latestSubjects = Array.from(latestExamsBySubject.values()).sort((a, b) => {
      // If one has credits and the other doesn't, prioritize credited subjects
      if ((a.credits > 0) && (b.credits === 0)) return -1;
      if ((a.credits === 0) && (b.credits > 0)) return 1;

      // Otherwise sort by name
      return a.subjectName?.localeCompare(b.subjectName) || 0;
    });

    const totalCreditsEarned = latestSubjects.reduce((sum, subject) => {
      return sum + ((!['F', 'Ab'].includes(subject.grades)) ? (subject.credits || 0) : 0);
    }, 0);

    const passedSubjects = latestSubjects.filter(subject => !['F', 'Ab'].includes(subject.grades)).length;
    const totalSubjects = latestSubjects.length;

    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-4 overflow-hidden">
        <div
          className="px-4 py-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Semester {semester.semester}
            </h3>
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {passedSubjects}/{totalSubjects} Subjects
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {totalCreditsEarned} Credits
            </span>
          </div>
          <div className="flex items-center">
            {isOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="px-4 pb-5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-left">Subject</th>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Internal</th>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">External</th>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Total</th>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Grade</th>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Credits</th>
                    <th className="px-3 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {latestSubjects.map((subject, idx) => (
                    <tr key={idx} className={`${subject.credits > 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"}`}>
                      <td className="px-3 py-4 text-sm text-gray-800 dark:text-gray-200">
                        <div className="font-medium">{subject.subjectName || "Unknown Subject"}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{subject.subjectCode}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800 dark:text-gray-200 text-center">{subject.internalMarks || "-"}</td>
                      <td className="px-3 py-4 text-sm text-gray-800 dark:text-gray-200 text-center">{subject.externalMarks || "-"}</td>
                      <td className="px-3 py-4 text-sm text-gray-800 dark:text-gray-200 text-center font-medium">{subject.totalMarks || "-"}</td>
                      <td className={`px-3 py-4 text-sm text-center font-medium ${
                        subject.grades === 'F' ? 'text-red-600 dark:text-red-400' :
                        subject.grades === 'Ab' ? 'text-red-600 dark:text-red-400' :
                        subject.grades === 'O' ? 'text-green-600 dark:text-green-400' :
                        subject.grades?.startsWith('A') ? 'text-green-600 dark:text-green-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {subject.grades || "-"}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800 dark:text-gray-200 text-center">
                        {subject.credits > 0 ? subject.credits : '-'}
                      </td>
                      <td className="px-3 py-4 text-sm text-center">
                        {!['F', 'Ab'].includes(subject.grades) ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircleIcon className="mr-1.5 h-3 w-3" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <XCircleIcon className="mr-1.5 h-3 w-3" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render loading state
  if (isLoading && !studentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-md w-full text-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Loading Results</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we fetch your academic records...
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !studentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Error Loading Results</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6">{error}</p>

          <form onSubmit={handleRollNumberSubmit} className="space-y-4">
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Enter your JNTUH Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                placeholder="Example: 20J25A0501"
                value={rollNumber}
                onChange={handleRollNumberChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retry
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render roll number input if no data yet
  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <AcademicCapIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">JNTUH Results Portal</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Enter your roll number to view your academic results
            </p>
          </div>

          <form onSubmit={handleRollNumberSubmit} className="space-y-4">
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                JNTUH Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                placeholder="Example: 20J25A0501"
                value={rollNumber}
                onChange={handleRollNumberChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Results
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render dashboard
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Student Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="flex items-center mb-2">
                <AcademicCapIcon className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{studentData.details?.name || "Student"}</h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-8">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Roll Number:</span> {studentData.details?.rollNumber}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">College Code:</span> {studentData.details?.collegeCode}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Father's Name:</span> {studentData.details?.fatherName}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col justify-end text-right">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Credits Earned</span>
              <span className="text-3xl font-bold text-blue-600">{stats?.totalCredits || 0}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Subjects</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.passedSubjects || 0}</p>
              <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">/ {stats?.totalSubjects || 0}</p>
            </div>
            <div className="mt-4 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-blue-600 rounded-full"
                style={{ width: `${stats?.passPercentage || 0}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {stats?.passPercentage || 0}% completion rate
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Backlogs</p>
            <div className="flex items-baseline">
              <p className={`text-3xl font-bold ${(stats?.backlogCount || 0) > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {stats?.backlogCount || 0}
              </p>
              <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">subjects</p>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {(stats?.backlogCount || 0) > 0 ? (
                <span className="flex items-center text-red-600 dark:text-red-400">
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  You need to clear these backlogs
                </span>
              ) : (
                <span className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  No backlogs! Great job!
                </span>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Academic Performance</p>
            {semesterData.length > 0 ? (
              <div className="w-full h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={semesterData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="passRate" name="Pass Rate %" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-400 dark:text-gray-500">
                No semester data available
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => fetchStudentData(studentData.details?.rollNumber)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Refreshing...
              </>
            ) : (
              <>
                <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
                Refresh Data
              </>
            )}
          </button>
        </div>

        {/* Semester Results */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Semester Results</h2>
          {studentData.results && studentData.results.length > 0 ? (
            studentData.results.map((semester, idx) => (
              <SemesterAccordion key={idx} semester={semester} index={idx} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">No semester results available</p>
            </div>
          )}
        </div>

        {/* Footer with API Credit */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 pb-8">
          <p>
            Data provided by JNTUH Results API. <a href="https://jntuhresults.dhethi.com" className="text-blue-600 hover:text-blue-500 dark:text-blue-400" target="_blank" rel="noopener noreferrer">Visit API Website</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentResultsDashboard;