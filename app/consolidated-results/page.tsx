"use client";
// import React, { useState } from "react";
// import axios from "axios";
// import AcademicReportPage from "../components/AcademicReport/AcademicReportPage";
// import Head from "next/head";

// export default function Cgpa() {
//   const [htno, setHtno] = useState("");
//   const [warning, setWarning] = useState("");
//   const [data, setData] = useState(null);

//   const submit = async () => {
//     if (htno.length !== 10) {
//       setWarning("The Hall Ticket Should be 10 digits");
//     } else {
//       setWarning("");
//       try {
//         const response = await axios.get(
//           `https://jntuhresults.vercel.app/api/redisdata?htno=${htno}`
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setWarning("Failed to fetch data. Please try again later.");
//       }
//     }
//   };

//   const inputEvent = (event) => {
//     event.target.value = event.target.value.toUpperCase();
//     setHtno(event.target.value);
//   };

//   return (
//     <div className="p-10 flex flex-col items-center">
//       <h1 className="mb-2 font-bold text-3xl text-center">
//         Consolidated Results
//       </h1>
//       <p className="text-red-500">{warning}</p>
//       <div className="w-1/2 lg:w-1/6 md:w-1/4 mt-3">
//         <div className="mt-1">
//           <input
//             type="text"
//             name="htno"
//             onChange={inputEvent}
//             maxLength="10"
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center dark:bg-gray-800"
//             placeholder="Roll Number"
//           />
//         </div>
//         <button
//           onClick={submit}
//           className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Submit
//         </button>
//       </div>

//       {data && (
//         <div className="mt-5 w-full lg:w-1/2">
//           <table className="table-auto w-full text-left border-collapse border border-gray-400">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Subject</th>
//                 <th className="border border-gray-300 px-4 py-2">Grade</th>
//                 <th className="border border-gray-300 px-4 py-2">Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {item.subject}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {item.grade}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {item.credits}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* <AcademicReportPage backlog={false} /> */}
//     </div>
//   );
// }



// // "use client";
// import React, { useState } from "react";
// import axios from "axios";

// export default function Cgpa() {
//   const [htno, setHtno] = useState("");
//   const [warning, setWarning] = useState("");
//   const [data, setData] = useState(null);

//   const submit = async () => {
//     if (htno.length !== 10) {
//       setWarning("The Hall Ticket Should be 10 digits");
//     } else {
//       setWarning("");
//       try {
//         const response = await axios.get(`https://jntuhresults.vercel.app/api/redisdata?htno=${htno}`);
//         console.log("API Response:", response);
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         if (error.response) {
//           console.error("Error response data:", error.response.data);
//           console.error("Error response status:", error.response.status);
//           console.error("Error response headers:", error.response.headers);
//         }
//         setWarning("Failed to fetch data. Please try again later.");
//       }
//     }
//   };

//   const inputEvent = (event) => {
//     event.target.value = event.target.value.toUpperCase();
//     setHtno(event.target.value);
//   };

//   return (
//     <div className="p-10 flex flex-col items-center">
//       <h1 className="mb-2 font-bold text-3xl text-center">Consolidated Results</h1>
//       <p className="text-red-500">{warning}</p>
//       <div className="w-1/2 lg:w-1/6 md:w-1/4 mt-3">
//         <div className="mt-1">
//           <input
//             type="text"
//             name="htno"
//             onChange={inputEvent}
//             maxLength="10"
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center dark:bg-gray-800"
//             placeholder="Roll Number"
//           />
//         </div>
//         <button
//           onClick={submit}
//           className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Submit
//         </button>
//       </div>

//       {data && (
//         <div className="mt-5 w-full lg:w-1/2">
//           <table className="table-auto w-full text-left border-collapse border border-gray-400">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Subject</th>
//                 <th className="border border-gray-300 px-4 py-2">Grade</th>
//                 <th className="border border-gray-300 px-4 py-2">Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.grade}</td>
//                   <td className="border border-gray-300 px-4 py-2">{item.credits}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";


interface ResultItem {
  subject: string;
  grade: string;
  credits: number;
}

export default function ConsolidatedResults() {
  const [htno, setHtno] = useState("");
  const [warning, setWarning] = useState("");
  const [data, setData] = useState<ResultItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const isDarkMode = localStorage.getItem('darkMode') === 'true';
  //     setDarkMode(isDarkMode);
  //     if (isDarkMode) {
  //       document.documentElement.classList.add('dark');
  //     }
  //   }
  // }, []);

  // const toggleDarkMode = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   localStorage.setItem('darkMode', newDarkMode.toString());
  //   document.documentElement.classList.toggle('dark');
  // };

  const submit = async () => {
    if (htno.length !== 10) {
      setWarning("The Hall Ticket Number should be 10 digits");
      return;
    }

    setWarning("");
    setLoading(true);

    try {
      const response = await axios.get<ResultItem[]>(`https://jntuhresults.vercel.app/api/redisdata?htno=${htno}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setWarning("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setHtno(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Consolidated Results
          </h1>

        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="htno" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hall Ticket Number
            </label>
            <input
              type="text"
              id="htno"
              name="htno"
              value={htno}
              onChange={inputEvent}
              maxLength={10}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your 10-digit Hall Ticket Number"
            />
          </div>

          {warning && (
            <p className="text-red-500 dark:text-red-400 text-sm mb-4">{warning}</p>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>

        {data && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Credits
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}