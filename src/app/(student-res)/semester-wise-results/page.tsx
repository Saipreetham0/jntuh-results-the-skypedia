
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Subject {
//   subjectCode: string;
//   subjectName: string;
//   internalMarks: number;
//   externalMarks: number;
//   totalMarks: number;
//   grades: string;
//   credits: number;
// }

// interface SemesterResult {
//   semester: string;
//   latestResults?: Subject[];
//   semesterGPA?: number;
//   totalCredits?: number;
// }

// interface StudentResult {
//   details: {
//     name: string;
//     rollNumber: string;
//     collegeCode: string;
//     fatherName: string;
//   };
//   results: SemesterResult[];
//   overallGPA?: number;
//   totalCredits?: number;
// }

// export default function SemesterResults() {
//   const searchParams = useSearchParams();
//   const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || '');
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<StudentResult | null>(null);
//   const [error, setError] = useState('');
//   const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
//   const [searchFocus, setSearchFocus] = useState(false);

//   // Load results if rollNumber is in URL params
//   useEffect(() => {
//     const urlRollNumber = searchParams?.get('rollNumber');
//     if (urlRollNumber) {
//       setRollNumber(urlRollNumber);
//       fetchResults(urlRollNumber);
//     }
//   }, [searchParams]);

//   const fetchResults = async (roll: string) => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`/api/semester-wise-results?rollNumber=${roll}`);

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to fetch results');
//       }

//       const data = await response.json();
//       setResults(data);

//       // Update URL with the roll number parameter without navigation
//       const url = new URL(window.location.href);
//       url.searchParams.set('rollNumber', roll);
//       window.history.pushState({}, '', url);

//       // Expand the latest semester by default
//       if (data.results && data.results.length > 0) {
//         setExpandedSemester(data.results[data.results.length - 1].semester);
//       }
//     } catch (err: any) {
//       setError(err.message || 'An error occurred while fetching results');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!rollNumber) {
//       setError('Please enter a roll number');
//       return;
//     }

//     fetchResults(rollNumber);
//   };

//   // Function to get color based on grade
//   const getGradeColor = (grade: string): string => {
//     switch (grade) {
//       case 'O': return 'bg-green-100 text-green-800';
//       case 'A+': return 'bg-green-50 text-green-700';
//       case 'A': return 'bg-blue-100 text-blue-800';
//       case 'B+': return 'bg-blue-50 text-blue-700';
//       case 'B': return 'bg-indigo-50 text-indigo-700';
//       case 'C': return 'bg-yellow-50 text-yellow-800';
//       case 'P': return 'bg-yellow-100 text-yellow-800';
//       case 'F': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Calculate GPA color
//   const getGPAColor = (gpa: number): string => {
//     if (gpa >= 9) return 'text-green-600';
//     if (gpa >= 8) return 'text-blue-600';
//     if (gpa >= 7) return 'text-indigo-600';
//     if (gpa >= 6) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const toggleSemester = (semester: string) => {
//     setExpandedSemester(expandedSemester === semester ? null : semester);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-bold text-slate-900 tracking-tight">JNTUH Results Portal</h1>
//           <p className="mt-3 text-lg text-slate-600">View your complete semester-wise academic performance</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className={`bg-white shadow-lg rounded-xl mb-8 transition-all duration-300 ${searchFocus ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''}`}
//         >
//           <div className="px-6 py-8">
//             <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
//               <div className="flex-1 max-w-md relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="rollNumber"
//                   name="rollNumber"
//                   value={rollNumber}
//                   onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
//                   onFocus={() => setSearchFocus(true)}
//                   onBlur={() => setSearchFocus(false)}
//                   placeholder="Enter Roll Number (e.g., 20J25A0501)"
//                   className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center min-w-[120px]"
//               >
//                 {loading ? (
//                   <div className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Loading</span>
//                   </div>
//                 ) : (
//                   <span>Search</span>
//                 )}
//               </button>
//             </form>

//             <AnimatePresence>
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-4 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg flex items-center justify-center"
//                 >
//                   <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {error}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>

//         <AnimatePresence>
//           {results && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="space-y-6"
//             >
//               {/* Student Details Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//                 className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100"
//               >
//                 <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
//                   <h2 className="text-lg font-semibold text-white">Student Information</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex flex-col">
//                       <span className="text-sm font-medium text-slate-500">Student Name</span>
//                       <span className="mt-1 text-base font-medium text-slate-900">{results.details.name}</span>
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="text-sm font-medium text-slate-500">Roll Number</span>
//                       <span className="mt-1 text-base font-medium text-slate-900">{results.details.rollNumber}</span>
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="text-sm font-medium text-slate-500">College Code</span>
//                       <span className="mt-1 text-base font-medium text-slate-900">{results.details.collegeCode}</span>
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="text-sm font-medium text-slate-500">Father's Name</span>
//                       <span className="mt-1 text-base font-medium text-slate-900">{results.details.fatherName}</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Overall Performance Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.3 }}
//                 className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100"
//               >
//                 <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
//                   <h2 className="text-lg font-semibold text-white">Academic Overview</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50">
//                       <span className="text-sm font-medium text-slate-500">OVERALL CGPA</span>
//                       <span className={`mt-2 text-4xl font-bold ${getGPAColor(results.overallGPA || 0)}`}>
//                         {results.overallGPA?.toFixed(2)}
//                       </span>
//                       <div className="mt-3 w-full bg-slate-200 rounded-full h-2.5">
//                         <div
//                           className="bg-indigo-600 h-2.5 rounded-full"
//                           style={{ width: `${Math.min(results.overallGPA || 0, 10) * 10}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50">
//                       <span className="text-sm font-medium text-slate-500">TOTAL CREDITS EARNED</span>
//                       <span className="mt-2 text-4xl font-bold text-emerald-600">{results.totalCredits}</span>
//                       <span className="mt-1 text-sm text-slate-600">out of program requirement</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Semester Results */}
//               <div className="space-y-4">
//                 {results.results.map((semester, index) => (
//                   <motion.div
//                     key={semester.semester}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
//                     className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100"
//                   >
//                     <div
//                       onClick={() => toggleSemester(semester.semester)}
//                       className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors duration-150"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                           <span className="text-sm font-medium text-indigo-800">{semester.semester}</span>
//                         </div>
//                         <h2 className="text-lg font-medium text-slate-900">Semester {semester.semester}</h2>
//                       </div>
//                       <div className="flex items-center space-x-6">
//                         <div className="flex flex-col items-end">
//                           <span className="text-sm font-medium text-slate-500">GPA</span>
//                           <span className={`text-lg font-bold ${getGPAColor(semester.semesterGPA || 0)}`}>
//                             {semester.semesterGPA?.toFixed(2)}
//                           </span>
//                         </div>
//                         <div className="flex flex-col items-end">
//                           <span className="text-sm font-medium text-slate-500">Credits</span>
//                           <span className="text-lg font-bold text-slate-900">{semester.totalCredits}</span>
//                         </div>
//                         <svg
//                           className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedSemester === semester.semester ? 'transform rotate-180' : ''}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </div>

//                     <AnimatePresence>
//                       {expandedSemester === semester.semester && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: 'auto', opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="overflow-hidden"
//                         >
//                           <div className="border-t border-slate-200 p-1">
//                             <div className="overflow-x-auto">
//                               <table className="min-w-full divide-y divide-slate-200">
//                                 <thead className="bg-slate-50">
//                                   <tr>
//                                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
//                                       Subject
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
//                                       Internal
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
//                                       External
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
//                                       Total
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
//                                       Grade
//                                     </th>
//                                     <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
//                                       Credits
//                                     </th>
//                                   </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-slate-200">
//                                   {semester.latestResults?.map((subject) => (
//                                     <tr key={subject.subjectCode} className="hover:bg-slate-50 transition-colors duration-150">
//                                       <td className="px-3 py-4 text-sm text-slate-900">
//                                         <div className="font-medium">{subject.subjectName}</div>
//                                         <div className="text-xs text-slate-500 mt-1">{subject.subjectCode}</div>
//                                       </td>
//                                       <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-slate-900">
//                                         {subject.internalMarks}
//                                       </td>
//                                       <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-slate-900">
//                                         {subject.externalMarks}
//                                       </td>
//                                       <td className="px-3 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900">
//                                         {subject.totalMarks}
//                                       </td>
//                                       <td className="px-3 py-4 whitespace-nowrap text-sm text-center">
//                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(subject.grades)}`}>
//                                           {subject.grades}
//                                         </span>
//                                       </td>
//                                       <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-slate-900">
//                                         {subject.credits}
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Footer with instructions */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.4, delay: 0.7 }}
//                 className="text-center mt-8 text-sm text-slate-500"
//               >
//                 <p>Click on a semester row to expand and see detailed results.</p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AdBanner from "@/components/Adsense/AdBanner";

interface Subject {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grades: string;
  credits: number;
}

interface SemesterResult {
  semester: string;
  latestResults?: Subject[];
  semesterGPA?: number;
  totalCredits?: number;
}

interface StudentResult {
  details: {
    name: string;
    rollNumber: string;
    collegeCode: string;
    fatherName: string;
  };
  results: SemesterResult[];
  overallGPA?: number;
  totalCredits?: number;
}

export default function SemesterResults() {
  const searchParams = useSearchParams();
  const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StudentResult | null>(null);
  const [error, setError] = useState('');
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [searchFocus, setSearchFocus] = useState(false);

  // Load results if rollNumber is in URL params
  useEffect(() => {
    const urlRollNumber = searchParams?.get('rollNumber');
    if (urlRollNumber) {
      setRollNumber(urlRollNumber);
      fetchResults(urlRollNumber);
    }
  }, [searchParams]);

  const fetchResults = async (roll: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/semester-wise-results?rollNumber=${roll}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch results');
      }

      const data = await response.json();
      setResults(data);

      // Update URL with the roll number parameter without navigation
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);

      // Expand the latest semester by default
      if (data.results && data.results.length > 0) {
        setExpandedSemester(data.results[data.results.length - 1].semester);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching results');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollNumber) {
      setError('Please enter a roll number');
      return;
    }

    fetchResults(rollNumber);
  };

  // Function to get color based on grade
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'O': return 'bg-green-100 text-green-800';
      case 'A+': return 'bg-green-50 text-green-700';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-blue-50 text-blue-700';
      case 'B': return 'bg-indigo-50 text-indigo-700';
      case 'C': return 'bg-yellow-50 text-yellow-800';
      case 'P': return 'bg-yellow-100 text-yellow-800';
      case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate GPA color
  const getGPAColor = (gpa: number): string => {
    if (gpa >= 9) return 'text-green-600';
    if (gpa >= 8) return 'text-blue-600';
    if (gpa >= 7) return 'text-indigo-600';
    if (gpa >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const toggleSemester = (semester: string) => {
    setExpandedSemester(expandedSemester === semester ? null : semester);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">JNTUH Results Portal</h1>
          <p className="mt-3 text-lg text-slate-600">View your complete semester-wise academic performance</p>
        </motion.div>

        {/* Top Ad Banner */}
        <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`bg-white shadow-lg rounded-xl mb-8 transition-all duration-300 ${searchFocus ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''}`}
        >
          <div className="px-6 py-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex-1 max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                  placeholder="Enter Roll Number (e.g., 20J25A0501)"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading</span>
                  </div>
                ) : (
                  <span>Search</span>
                )}
              </button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Ad Banner when no results are shown */}
        {!results && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-8" />
          </motion.div>
        )}

        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Student Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <h2 className="text-lg font-semibold text-white">Student Information</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-500">Student Name</span>
                      <span className="mt-1 text-base font-medium text-slate-900">{results.details.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-500">Roll Number</span>
                      <span className="mt-1 text-base font-medium text-slate-900">{results.details.rollNumber}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-500">College Code</span>
                      <span className="mt-1 text-base font-medium text-slate-900">{results.details.collegeCode}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-500">Father's Name</span>
                      <span className="mt-1 text-base font-medium text-slate-900">{results.details.fatherName}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ad Banner between student details and overview */}
              <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />

              {/* Overall Performance Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
                  <h2 className="text-lg font-semibold text-white">Academic Overview</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50">
                      <span className="text-sm font-medium text-slate-500">OVERALL CGPA</span>
                      <span className={`mt-2 text-4xl font-bold ${getGPAColor(results.overallGPA || 0)}`}>
                        {results.overallGPA?.toFixed(2)}
                      </span>
                      <div className="mt-3 w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${Math.min(results.overallGPA || 0, 10) * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-slate-50">
                      <span className="text-sm font-medium text-slate-500">TOTAL CREDITS EARNED</span>
                      <span className="mt-2 text-4xl font-bold text-emerald-600">{results.totalCredits}</span>
                      <span className="mt-1 text-sm text-slate-600">out of program requirement</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Semester Results */}
              <div className="space-y-4">
                {results.results.map((semester, index) => (
                  <motion.div
                    key={semester.semester}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-100"
                  >
                    <div
                      onClick={() => toggleSemester(semester.semester)}
                      className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-indigo-800">{semester.semester}</span>
                        </div>
                        <h2 className="text-lg font-medium text-slate-900">Semester {semester.semester}</h2>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-slate-500">GPA</span>
                          <span className={`text-lg font-bold ${getGPAColor(semester.semesterGPA || 0)}`}>
                            {semester.semesterGPA?.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-slate-500">Credits</span>
                          <span className="text-lg font-bold text-slate-900">{semester.totalCredits}</span>
                        </div>
                        <svg
                          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedSemester === semester.semester ? 'transform rotate-180' : ''}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedSemester === semester.semester && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-200 p-1">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                  <tr>
                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Subject
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Internal
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      External
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Total
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Grade
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                                      Credits
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                  {semester.latestResults?.map((subject) => (
                                    <tr key={subject.subjectCode} className="hover:bg-slate-50 transition-colors duration-150">
                                      <td className="px-3 py-4 text-sm text-slate-900">
                                        <div className="font-medium">{subject.subjectName}</div>
                                        <div className="text-xs text-slate-500 mt-1">{subject.subjectCode}</div>
                                      </td>
                                      <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-slate-900">
                                        {subject.internalMarks}
                                      </td>
                                      <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-slate-900">
                                        {subject.externalMarks}
                                      </td>
                                      <td className="px-3 py-4 whitespace-nowrap text-sm text-center font-medium text-slate-900">
                                        {subject.totalMarks}
                                      </td>
                                      <td className="px-3 py-4 whitespace-nowrap text-sm text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(subject.grades)}`}>
                                          {subject.grades}
                                        </span>
                                      </td>
                                      <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-slate-900">
                                        {subject.credits}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Footer with instructions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="text-center mt-8 text-sm text-slate-500"
              >
                <p>Click on a semester row to expand and see detailed results.</p>
              </motion.div>

              {/* Bottom Ad Banner */}
              <AdBanner adSlot="8973292958" adFormat="rectangle" className="mt-8 mb-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}