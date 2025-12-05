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
import { ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

interface CardProps {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, url, icon }) => {
  const isExternal = url.startsWith('http');

  const cardContent = (
    <div className="group relative h-full flex flex-col bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C61E7]/0 via-[#1C61E7]/0 to-[#21C15E]/0 group-hover:from-[#1C61E7]/5 group-hover:via-[#1C61E7]/3 group-hover:to-[#21C15E]/5 transition-all duration-500 pointer-events-none"></div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      {/* Top accent bar with gradient */}
      <div className="h-1.5 bg-gradient-to-r from-[#1C61E7] via-[#1C61E7] to-[#21C15E] group-hover:h-2 transition-all duration-300"></div>

      <div className="relative p-6 flex flex-col flex-grow">
        {/* Icon container with enhanced styling */}
        <div className="mb-5">
          {icon ? (
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 dark:from-[#1C61E7]/20 dark:to-[#21C15E]/20 flex items-center justify-center text-[#1C61E7] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#1C61E7]/10">
              {icon}
              {/* Sparkle effect on popular cards */}
              {(title.includes('CGPA') || title.includes('Calculator')) && (
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#21C15E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
          ) : (
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 flex items-center justify-center text-[#1C61E7] font-bold text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#1C61E7]/10">
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Title with enhanced hover effect */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#1C61E7] dark:group-hover:text-[#1C61E7] transition-colors duration-300 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Description with better readability */}
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-5 flex-grow line-clamp-3">
          {content}
        </p>

        {/* Enhanced CTA button */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center text-[#1C61E7] dark:text-[#1C61E7] font-semibold text-sm group-hover:gap-2 transition-all duration-300">
            <span className="relative">
              Access Now
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1C61E7] group-hover:w-full transition-all duration-300"></span>
            </span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          {isExternal && (
            <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1C61E7]/5 to-transparent rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="h-full block">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={url} className="h-full block">
      {cardContent}
    </Link>
  );
};

export default Card;
