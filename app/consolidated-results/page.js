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



// "use client";
import React, { useState } from "react";
import axios from "axios";

export default function Cgpa() {
  const [htno, setHtno] = useState("");
  const [warning, setWarning] = useState("");
  const [data, setData] = useState(null);

  const submit = async () => {
    if (htno.length !== 10) {
      setWarning("The Hall Ticket Should be 10 digits");
    } else {
      setWarning("");
      try {
        const response = await axios.get(`https://jntuhresults.vercel.app/api/redisdata?htno=${htno}`);
        console.log("API Response:", response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
        setWarning("Failed to fetch data. Please try again later.");
      }
    }
  };

  const inputEvent = (event) => {
    event.target.value = event.target.value.toUpperCase();
    setHtno(event.target.value);
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="mb-2 font-bold text-3xl text-center">Consolidated Results</h1>
      <p className="text-red-500">{warning}</p>
      <div className="w-1/2 lg:w-1/6 md:w-1/4 mt-3">
        <div className="mt-1">
          <input
            type="text"
            name="htno"
            onChange={inputEvent}
            maxLength="10"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center dark:bg-gray-800"
            placeholder="Roll Number"
          />
        </div>
        <button
          onClick={submit}
          className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>

      {data && (
        <div className="mt-5 w-full lg:w-1/2">
          <table className="table-auto w-full text-left border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Subject</th>
                <th className="border border-gray-300 px-4 py-2">Grade</th>
                <th className="border border-gray-300 px-4 py-2">Credits</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.grade}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}