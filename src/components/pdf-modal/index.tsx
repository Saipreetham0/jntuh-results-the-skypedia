import React from 'react';

interface PdfModalProps {
  pdfUrl: string | null;
  onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ pdfUrl, onClose }) => {
  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-3xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          &times; {/* Close icon */}
        </button>
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
          className="border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default PdfModal;
