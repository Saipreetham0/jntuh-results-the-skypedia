// import React, { useEffect, useState, type JSX } from "react";
// import supabase from "../../utils/supabase/client";
// import TableBanner from "../../components/Adsense/tableBanner";

// // Define the type for the data fetched from Supabase
// interface College {
//   S_no: number;
//   code: string;
//   Institute: string;
//   Place: string;
//   Dist: string;
//   Region: string;
//   Type: string;
//   Minority: string;
//   Mode: string;
// }

// const JntuhTable: React.FC = () => {
//   const [data, setData] = useState<College[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const adFrequency = 20; // Define ad frequency here

//   useEffect(() => {
//     async function fetchData() {
//       const { data, error } = await supabase.from("college_list").select("*");

//       if (error) {
//         console.error("Supabase Error fetching data:", error);
//         setError(error.message);
//       } else {
//         setData(data);
//         console.log("All rows:", data);
//       }
//     }

//     fetchData();
//   }, []);

//   const insertAds = (list: College[]) => {
//     const adRows: JSX.Element[] = [];
//     let adCount = 0;

//     for (let i = adFrequency; i < list.length; i += adFrequency) {
//       if (adCount === 0) {
//         adRows.push(
//           <tr key={`ad-${i}`}>
//             <td className="px-6 py-4 whitespace-nowrap" colSpan={9}>
//               <TableBanner adSlot="8279758421" />
//             </td>
//           </tr>
//         );
//         adCount++;
//       }
//     }
//     return adRows;
//   };

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 md:px-8">
//       <div>
//         <h3 className="text-gray-800 text-xl font-bold sm:text-2xl dark:text-white">
//           Institute-wise Courses offered in Telangana
//         </h3>
//         <p className="text-gray-600 mt-2 dark:text-white">
//           <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
//             OU = Osmania University
//           </span>
//           <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
//             NA = Not Applicable
//           </span>
//           <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
//             COED = Co-Education
//           </span>
//         </p>
//       </div>

//       <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
//         <table className="min-w-full table-auto text-sm text-left ">
//           <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-300 dark:bg-gray-700 dark:text-white">
//             <tr>
//               <th
//                 scope="col"
//                 className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 sm:pl-6 dark:text-white"
//               >
//                 S.No
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Code
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Institute
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Place
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 District
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Region
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Type
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Minority
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
//               >
//                 Mode
//               </th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-600 divide-y border border-gray-200 dark:bg-gray-800 dark:text-white">
//             {data.map((item, idx) => (
//               <React.Fragment key={idx}>
//                 {idx % adFrequency === 0 &&
//                   idx > 0 &&
//                   insertAds(data).length > 0 &&
//                   insertAds(data)}

//                 <tr>
//                   <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 dark:text-white">
//                     {item.S_no}
//                   </td>
//                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     {item.code}
//                   </td>
//                   <td className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     {item.Institute}
//                   </td>
//                   <td className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     {item.Place}
//                   </td>
//                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     {item.Dist}
//                   </td>
//                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     <span
//                       className={`${
//                         item.Region === "OU"
//                           ? "bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
//                           : "bg-pink-100 text-pink-800 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
//                       }`}
//                     >
//                       {item.Region}
//                     </span>
//                   </td>
//                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     <span
//                       className={`${
//                         item.Type === "PVT"
//                           ? "bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
//                           : "bg-pink-100 text-pink-800 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
//                       }`}
//                     >
//                       {item.Type}
//                     </span>
//                   </td>
//                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     <span
//                       className={`${
//                         item.Minority === "NA"
//                           ? "bg-green-100 text-green-800 mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
//                           : "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
//                       }`}
//                     >
//                       {item.Minority}
//                     </span>
//                   </td>
//                   <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
//                     <span
//                       className={`${
//                         item.Mode === "COED"
//                           ? "bg-indigo-100 text-indigo-800 mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
//                           : "bg-pink-100 text-pink-800 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
//                       }`}
//                     >
//                       {item.Mode}
//                     </span>
//                   </td>
//                 </tr>
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default JntuhTable;


'use client'; // This is essential for client components in App Router

import React, { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import TableBanner from "../../components/Adsense/tableBanner";

// Define the type for the data fetched from Supabase
interface College {
  S_no: number;
  code: string;
  Institute: string;
  Place: string;
  Dist: string;
  Region: string;
  Type: string;
  Minority: string;
  Mode: string;
}

const JntuhTable: React.FC = () => {
  const [data, setData] = useState<College[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const adFrequency = 20; // Define ad frequency here

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("college_list").select("*");

      if (error) {
        console.error("Supabase Error fetching data:", error);
        setError(error.message);
      } else {
        setData(data);
        console.log("All rows:", data);
      }
    }

    fetchData();
  }, []);

  const insertAds = (list: College[]) => {
    const adRows: React.ReactNode[] = [];
    let adCount = 0;

    for (let i = adFrequency; i < list.length; i += adFrequency) {
      if (adCount === 0) {
        adRows.push(
          <tr key={`ad-${i}`}>
            <td className="px-6 py-4 whitespace-nowrap" colSpan={9}>
              <TableBanner adSlot="8279758421" />
            </td>
          </tr>
        );
        adCount++;
      }
    }
    return adRows;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div>
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl dark:text-white">
          Institute-wise Courses offered in Telangana
        </h3>
        <p className="text-gray-600 mt-2 dark:text-white">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            OU = Osmania University
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            NA = Not Applicable
          </span>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
            COED = Co-Education
          </span>
        </p>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left ">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-300 dark:bg-gray-700 dark:text-white">
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 sm:pl-6 dark:text-white"
              >
                S.No
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Code
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Institute
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Place
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                District
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Region
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Minority
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-900 dark:text-white"
              >
                Mode
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-600 divide-y border border-gray-200 dark:bg-gray-800 dark:text-white">
            {data.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx % adFrequency === 0 &&
                  idx > 0 &&
                  insertAds(data).length > 0 &&
                  insertAds(data)}

                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 dark:text-white">
                    {item.S_no}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.code}
                  </td>
                  <td className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.Institute}
                  </td>
                  <td className="whitespace-normal break-words px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.Place}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    {item.Dist}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={`${
                        item.Region === "OU"
                          ? "bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                          : "bg-pink-100 text-pink-800 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
                      }`}
                    >
                      {item.Region}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={`${
                        item.Type === "PVT"
                          ? "bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-pink-100 text-pink-800 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
                      }`}
                    >
                      {item.Type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={`${
                        item.Minority === "NA"
                          ? "bg-green-100 text-green-800 mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {item.Minority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">
                    <span
                      className={`${
                        item.Mode === "COED"
                          ? "bg-indigo-100 text-indigo-800 mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300"
                          : "bg-pink-100 text-pink-800 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300"
                      }`}
                    >
                      {item.Mode}
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JntuhTable;