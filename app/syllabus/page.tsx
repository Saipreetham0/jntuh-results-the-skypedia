"use client";
import React, { useState } from "react";
import syllabusData from "../json/syllabus.json";
import PdfModal from "../components/PdfModal"; // Import the modal component

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
    className="border border-gray-300 rounded-md p-4 m-2 cursor-pointer hover:bg-gray-100"
    onClick={() => onItemClick(item)}
  >
    <h3 className="font-semibold">{item.course || item.syllabusName || item.name}</h3>
    {item.link.endsWith(".pdf") && <p className="text-sm text-green-600">PDF Available</p>}
  </div>
);

const SyllabusComponent: React.FC = () => {
  const [currentData, setCurrentData] = useState<SyllabusItem[]>(syllabusData);
  const [breadcrumbs, setBreadcrumbs] = useState<SyllabusItem[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to hold PDF URL

  const handleItemClick = (item: SyllabusItem) => {
    if (item.children && item.children.length > 0) {
      setCurrentData(item.children);
      setBreadcrumbs([...breadcrumbs, item]);
    } else if (item.link.endsWith(".pdf")) {
      setPdfUrl(item.link); // Set PDF URL to state to display it
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentData(syllabusData);
      setBreadcrumbs([]);
      setPdfUrl(null); // Reset PDF URL
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      const lastItem = newBreadcrumbs[newBreadcrumbs.length - 1];
      if (lastItem.children && lastItem.children.length > 0) {
        setCurrentData(lastItem.children);
      }
      setBreadcrumbs(newBreadcrumbs);
      setPdfUrl(null); // Reset PDF URL
    }
  };

  const closePdfModal = () => setPdfUrl(null); // Close modal function

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">JNTUH Syllabus</h1>

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

      {currentData.length === 0 ? (
        <p className="text-gray-600">No syllabus data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.map((item, index) => (
            <SyllabusCard key={index} item={item} onItemClick={handleItemClick} />
          ))}
        </div>
      )}

      {/* Render the PDF modal if a PDF is selected */}
      <PdfModal pdfUrl={pdfUrl} onClose={closePdfModal} />
    </div>
  );
};

export default SyllabusComponent;
