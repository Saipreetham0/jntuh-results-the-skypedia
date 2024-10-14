// "use client";
// import React from "react";

// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import copy from "clipboard-copy";

// export default function ShareButton() {
//   let [isOpen, setIsOpen] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   const handleCopyClick = async () => {
//     try {
//       await copy("https://jntuhresults.theskypedia.com");
//       setIsCopied(true);
//     } catch (error) {
//       console.error("Failed to copy text: ", error);
//     }
//   };

//   return (
//     <>
//       <div className="">
//         <button
//           onClick={openModal}
//           className="flex items-center  dark:bg-gray-800 bg-white    text-white dark:text-gray-800 px-2 py-2 mr-2 rounded-full border bottom-1 border-gray-300 dark:border-gray-600 "
//         >
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M15 6.66666C16.3807 6.66666 17.5 5.54737 17.5 4.16666C17.5 2.78594 16.3807 1.66666 15 1.66666C13.6193 1.66666 12.5 2.78594 12.5 4.16666C12.5 5.54737 13.6193 6.66666 15 6.66666Z"
//               stroke="#707375"
//               strokeWidth="1.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
//               stroke="#707375"
//               strokeWidth="1.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M15 18.3333C16.3807 18.3333 17.5 17.2141 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.2141 13.6193 18.3333 15 18.3333Z"
//               stroke="#707375"
//               strokeWidth="1.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M7.1582 11.2581L12.8499 14.5748"
//               stroke="#707375"
//               strokeWidth="1.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M12.8415 5.4256L7.1582 8.74227"
//               stroke="#707375"
//               strokeWidth="1.2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl  bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-700">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-3xl font-bold leading-6 text-gray-900 mb-5 mt-5 dark:text-white"
//                   >
//                     Show Us Some Love
//                   </Dialog.Title>
//                   <div className="mt-5 mb-5">
//                     <p className="text-sm text-gray-500 dark:text-gray-300">
//                       Tell the world about Jntuh Results TheSkypedia
//                     </p>
//                   </div>

//                   <div className="flex gap-3 mt-4 mb-5">
//                     <input
//                       type="text"
//                       name="price"
//                       disabled="true"
//                       id="price"
//                       className="block w-full rounded-md border-0 py-1 pl-7 pr-20 text-gray-900 ring-1 "
//                       placeholder="https://jntuhresults.theskypedia.com"
//                     />
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={handleCopyClick}
//                     >
//                       Copy
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }
// app/components/ShareButton.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Share2, X, Copy, Check } from "lucide-react";
import dynamic from "next/dynamic";

const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { ssr: false }
);

interface ShareButtonProps {
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(url || window.location.href);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [url]);

  const handleShare = () => {
    if (isMobile && navigator.share) {
      navigator.share({ url: shareUrl });
    } else {
      setIsOpen(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
        aria-label="Share this page"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {isOpen && !isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full shadow-lg transition-transform transform scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Share This Page</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close share modal"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Scan the QR code or copy the link to share this page with others!
            </p>
            <div className="flex justify-center mb-4">
              <QRCodeSVG value={shareUrl} size={200} />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />
              <button
                onClick={handleCopy}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition duration-150 ease-in-out ${
                  copied ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                aria-label={copied ? "Copied!" : "Copy link"}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            {/* <div className="flex justify-around mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Link:</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">{shareUrl}</span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;