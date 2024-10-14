// // components/SyllabusCard.tsx
// "use client";
// import React from 'react';
// import Link from 'next/link';

// interface SyllabusItem {
//   course: string;
//   link: string;
// }

// const SyllabusCard: React.FC<{ item: SyllabusItem }> = ({ item }) => {
//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     alert("Due to SSL certificate issues, this link cannot be opened directly. Please copy and paste the following URL into your browser: " + item.link);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 m-2">
//       <h2 className="text-xl font-bold mb-2">{item.course}</h2>
//       <a
//         href={item.link}
//         onClick={handleClick}
//         className="text-blue-500 hover:underline cursor-pointer block mb-2"
//       >
//         View Syllabus
//       </a>
//       <Link
//         href={`/subcategories/${encodeURIComponent(item.course)}`}
//         className="text-green-500 hover:underline cursor-pointer"
//       >
//         View Sub-categories
//       </Link>
//     </div>
//   );
// };

// export default SyllabusCard;

"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface SyllabusItem {
  course: string;
  link: string;
}

const SyllabusCard: React.FC<{ item: SyllabusItem }> = ({ item }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/subcategories/${encodeURIComponent(item.course)}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 m-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold mb-2">{item.course}</h2>
    </div>
  );
};

export default SyllabusCard;
