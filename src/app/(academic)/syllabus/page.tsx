// "use client";
// import React, { useState } from "react";
// import syllabusData from "../../_data/syllabus.json";
// import PdfModal from "../components/PdfModal"; // Import the modal component

// interface SyllabusItem {
//   course?: string;
//   syllabusName?: string; // Updated property name
//   name?: string;
//   link: string;
//   children?: SyllabusItem[];
// }

// const SyllabusCard: React.FC<{
//   item: SyllabusItem;
//   onItemClick: (item: SyllabusItem) => void;
// }> = ({ item, onItemClick }) => (
//   <div
//     className="border border-gray-300 rounded-md p-4 m-2 cursor-pointer hover:bg-gray-100"
//     onClick={() => onItemClick(item)}
//   >
//     <h3 className="font-semibold">{item.course || item.syllabusName || item.name}</h3>
//     {item.link.endsWith(".pdf") && <p className="text-sm text-green-600">PDF Available</p>}
//   </div>
// );

// const SyllabusComponent: React.FC = () => {
//   const [currentData, setCurrentData] = useState<SyllabusItem[]>(syllabusData);
//   const [breadcrumbs, setBreadcrumbs] = useState<SyllabusItem[]>([]);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to hold PDF URL

//   const handleItemClick = (item: SyllabusItem) => {
//     if (item.children && item.children.length > 0) {
//       setCurrentData(item.children);
//       setBreadcrumbs([...breadcrumbs, item]);
//     } else if (item.link.endsWith(".pdf")) {
//       // setPdfUrl(item.link); // Set PDF URL to state to display it
//       window.open(item.link, "_blank");
//     }
//   };

//   const handleBreadcrumbClick = (index: number) => {
//     if (index === -1) {
//       setCurrentData(syllabusData);
//       setBreadcrumbs([]);
//       setPdfUrl(null); // Reset PDF URL
//     } else {
//       const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
//       const lastItem = newBreadcrumbs[newBreadcrumbs.length - 1];
//       if (lastItem.children && lastItem.children.length > 0) {
//         setCurrentData(lastItem.children);
//       }
//       setBreadcrumbs(newBreadcrumbs);
//       setPdfUrl(null); // Reset PDF URL
//     }
//   };

//   const closePdfModal = () => setPdfUrl(null); // Close modal function

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">JNTUH Syllabus</h1>

//       <div className="mb-4">
//         <button
//           onClick={() => handleBreadcrumbClick(-1)}
//           className="text-blue-500 hover:underline mr-2"
//         >
//           Home
//         </button>
//         {breadcrumbs.map((item, index) => (
//           <React.Fragment key={index}>
//             <span className="mx-2">&gt;</span>
//             <button
//               onClick={() => handleBreadcrumbClick(index)}
//               className="text-blue-500 hover:underline mr-2"
//             >
//               {item.course || item.syllabusName || item.name}
//             </button>
//           </React.Fragment>
//         ))}
//       </div>

//       {currentData.length === 0 ? (
//         <p className="text-gray-600">No syllabus data available.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {currentData.map((item, index) => (
//             <SyllabusCard key={index} item={item} onItemClick={handleItemClick} />
//           ))}
//         </div>
//       )}

//       {/* Render the PDF modal if a PDF is selected */}
//       <PdfModal pdfUrl={pdfUrl} onClose={closePdfModal} />
//     </div>
//   );
// };

// export default SyllabusComponent;

"use client";
import React, { useState } from "react";
import syllabusData from "../../_data/syllabus.json";
import PdfModal from "@/components/pdf-modal"; // Import the modal component

interface SyllabusItem {
  course?: string;
  syllabusName?: string; // Updated property name
  name?: string;
  link: string;
  children?: SyllabusItem[];
}

const SyllabusCard: React.FC<{
  item: SyllabusItem;
  onItemClick: (item: SyllabusItem) => void;
}> = ({ item, onItemClick }) => (
  <div
    className="border border-gray-300 rounded-lg p-4 m-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md"
    onClick={() => onItemClick(item)}
  >
    <h3 className="font-semibold text-lg">
      {item.course || item.syllabusName || item.name}
    </h3>
    {item.link.endsWith(".pdf") && (
      <p className="text-sm text-green-600">PDF Available</p>
    )}
  </div>
);

const SyllabusComponent: React.FC = () => {
  const [currentData, setCurrentData] = useState<SyllabusItem[]>(syllabusData);
  const [breadcrumbs, setBreadcrumbs] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to hold PDF URL

  const handleItemClick = (item: SyllabusItem) => {
    if (item.children && item.children.length > 0) {
      setLoading(true); // Start loading
      setCurrentData(item.children);
      setBreadcrumbs([...breadcrumbs, item]);
      setLoading(false); // End loading
    } else if (item.link.endsWith(".pdf")) {
      window.open(item.link, "_blank");
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentData(syllabusData);
      setBreadcrumbs([]);
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      const lastItem = newBreadcrumbs[newBreadcrumbs.length - 1];
      if (lastItem.children && lastItem.children.length > 0) {
        setCurrentData(lastItem.children);
      }
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const closePdfModal = () => setPdfUrl(null); // Close modal function

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        JNTUH Syllabus
      </h1>

      {/* Breadcrumb Navigation */}
      <div className="mb-4">
        <button
          onClick={() => handleBreadcrumbClick(-1)}
          className="text-blue-500 hover:underline mr-2"
        >
          Home
        </button>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <span className="mx-2">&gt;</span>
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className="text-blue-500 hover:underline mr-2"
            >
              {item.course || item.syllabusName || item.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-600 text-center">Loading...</p>}

      {/* Syllabus Items */}
      {currentData.length === 0 ? (
        <p className="text-gray-600 text-center">No syllabus data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.map((item, index) => (
            <SyllabusCard
              key={index}
              item={item}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      )}

      {/* Render the PDF modal if a PDF is selected */}
      <PdfModal pdfUrl={pdfUrl} onClose={closePdfModal} />
    </div>
  );
};

export default SyllabusComponent;
