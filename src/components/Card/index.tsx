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

  // Generate a dynamic background color based on the title's first character
  // This creates visual variety in the cards
  const getCardAccentColor = (title: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-indigo-500 to-indigo-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-cyan-500 to-cyan-600',
      'from-teal-500 to-teal-600',
    ];

    const index = title.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const cardContent = (
    <div className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Card header with colorful accent */}
      <div className={`h-2 bg-gradient-to-r ${getCardAccentColor(title)}`}></div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Card icon */}
        <div className="mb-3">
          {icon || (
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getCardAccentColor(title)} flex items-center justify-center text-white font-bold text-lg`}>
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Card title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>

        {/* Card content */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{content}</p>

        {/* Card action */}
        <div className="mt-auto flex items-center text-blue-600 dark:text-blue-400 font-medium">
          <span>Access Now</span>
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          {isExternal && <ExternalLink className="w-4 h-4 ml-1" />}
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
