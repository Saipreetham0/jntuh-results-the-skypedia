// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";

// interface CardProps {
//   title: string;
//   content: string;
//   url: string;
//   imageUrl?: string;
// }

// const Card: React.FC<CardProps> = ({ title, content, url, imageUrl }) => {
//   return (
//     <div className="max-w-sm mb-4 overflow-hidden transition-all duration-300 transform bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
//       <Link href={url} className="block">
//         {imageUrl && (
//           <div className="relative h-48 overflow-hidden">
//             <Image
//               src={imageUrl}
//               layout="fill"
//               objectFit="cover"
//               alt={title}
//               className="transition-transform duration-300 transform hover:scale-105"
//             />
//           </div>
//         )}
//         <div className="p-6">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {title}
//           </h5>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//             {content}
//           </p>
//           <div className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
//             Read more
//             <ArrowRight className="w-4 h-4 ml-2" />
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Card;



import React from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight } from 'lucide-react';

interface CardProps {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, url, icon }) => {
  // Determine if URL is external (starts with http or https)
  const isExternal = url.startsWith('http');

  const cardContent = (
    <div className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
      {/* Card header with brand color accent */}
      <div className="h-1 bg-[#1C61E7]"></div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Card icon */}
        <div className="mb-4">
          {icon ? (
            <div className="w-12 h-12 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center text-[#1C61E7]">
              {icon}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#1C61E7]/10 flex items-center justify-center text-[#1C61E7] font-bold text-xl">
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Card title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#1C61E7] transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Card content */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
          {content}
        </p>

        {/* Card action */}
        <div className="mt-auto flex items-center text-[#1C61E7] font-semibold text-sm">
          <span>Access Now</span>
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-2" />
          {isExternal && <ExternalLink className="w-4 h-4 ml-2" />}
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="h-full">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={url} className="h-full">
      {cardContent}
    </Link>
  );
};

export default Card;
