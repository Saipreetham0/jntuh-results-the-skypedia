import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import TableBanner from "../components/Adsense/tableBanner"

const JntuhTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const adFrequency = 20; // Define ad frequency here

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("college_list").select("*");

      if (error) {
        console.error("Superbase Error fetching data:", error);
        setError(error.message);
      } else {
        setData(data);
        console.log("All rows:", data);
      }
    }

    fetchData();
  }, []);

  const insertAds = (list) => {
    const adRows = [];
    let adCount = 0;

    for (let i = adFrequency; i < list.length; i += adFrequency) {
      if (adCount === 0) {
        adRows.push(
          <tr key={`ad-${i}`}>
            <td className="px-6 py-4 whitespace-nowrap" colSpan="9">
              {/* Your ad content goes here */}
              {/* <div className="text-center py-4 text-gray-600">
                Advertisement
              </div> */}
              <TableBanner/>
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
      <div className="">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl dark:text-white">
          Institute-wise Courses offered in Telangana
        </h3>
        <p className="text-gray-600 mt-2 dark:text-white">
          OU = Osmania University, NA = Not Applicable, SW = State-wide, COED =
          Co-Education
        </p>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left ">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b dark:bg-gray-700 dark:text-white">
            <tr>
              <th className="py-3 px-6 border border-gray-300">S.No</th>
              <th className="py-3 px-6 border border-gray-300">Code</th>
              <th className="py-3 px-6 border border-gray-300">Institute</th>
              <th className="py-3 px-6 border border-gray-300">Place</th>
              <th className="py-3 px-6 border border-gray-300">District</th>
              <th className="py-3 px-6 border border-gray-300">Region</th>
              <th className="py-3 px-6 border border-gray-300">Type</th>
              <th className="py-3 px-6 border border-gray-300">Minority</th>
              <th className="py-3 px-6 border border-gray-300">Mode</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 divide-y border  border-gray-300 dark:bg-gray-800 dark:text-white">
            {data.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* {idx === Math.floor(data.length / 10) && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan="9">

                      <div className="text-center py-4 text-gray-600">
                        Advertisement
                      </div>
                    </td>
                  </tr>
                )} */}

                {idx % adFrequency === 0 &&
                  idx > 0 &&
                  insertAds(data).length > 0 &&
                  /* Insert ads after every 25 rows except for the first row */
                  insertAds(data)}

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">{item.S_no}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Institute}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Place}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Dist}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Region}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Minority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Mode}</td>
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
