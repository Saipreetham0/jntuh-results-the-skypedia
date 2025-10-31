
// import React, { useState } from "react";

// interface Author {
//   name: string;
//   href: string;
//   imageUrl: string;
// }

// interface Category {
//   name: string;
//   href: string;
//   color: string;
// }

// interface Post {
//   title: string;
//   href: string;
//   category: Category;
//   description: string;
//   date: string;
//   datetime: string;

//   readingTime: string;
// }

// const posts: Post[] = [
//   {
//     title: "Btech Colleges in Telangana - Find the Best Engineering Institutes",
//     href: "/btech-colleges-tg",
//     category: {
//       name: "Education",
//       href: "#",
//       color: "bg-indigo-100 text-indigo-800",
//     },
//     description:
//       "Discover the Btech colleges in Telangana for quality education. Find the best engineering institutes in Telangana for a bright future.",
//     date: "Mar 16, 2020",
//     datetime: "2020-03-16",

//     readingTime: "6 min",
//   },


//   // Add more posts here if needed
// ];

// const HomepageBlog: React.FC = () => {
//   const [hoveredPost, setHoveredPost] = useState<string | null>(null);

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
//           Colleges List
//         </h2>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <div
//               key={post.title}
//               className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
//                 hoveredPost === post.title ? "transform scale-105" : ""
//               }`}
//               onMouseEnter={() => setHoveredPost(post.title)}
//               onMouseLeave={() => setHoveredPost(null)}
//             >
//               <div className="p-6">
//                 <div className="mb-4">
//                   <span
//                     className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${post.category.color}`}
//                   >
//                     {post.category.name}
//                   </span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-4">
//                   {post.description}
//                 </p>
//               </div>
//               <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   {post.date} • {post.readingTime} read
//                 </div>
//                 <a
//                   href={post.href}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition duration-150 ease-in-out"
//                 >
//                   Read more
//                   <svg
//                     className="ml-2 -mr-1 w-4 h-4"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomepageBlog;



import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

interface Author {
  name: string;
  href: string;
  imageUrl: string;
}

interface Category {
  name: string;
  href: string;
  color: string;
}

interface Post {
  title: string;
  href: string;
  category: Category;
  description: string;
  date: string;
  datetime: string;
  readingTime: string;
  image?: string;
}

// Sample posts data with added image field
const posts: Post[] = [
  {
    title: "Btech Colleges in Telangana - Find the Best Engineering Institutes",
    href: "/btech-colleges-tg",
    category: {
      name: "Education",
      href: "#",
      color: "bg-[#1C61E7]/10 text-[#1C61E7]",
    },
    description:
      "Discover the Btech colleges in Telangana for quality education. Find the best engineering institutes in Telangana for a bright future.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    readingTime: "6 min",
    image: "/api/placeholder/800/450"  // Placeholder image
  },
  // Add more posts here as needed
];

// We'll augment the data with a couple more posts for demo purposes
const extendedPosts = [
  ...posts,
  {
    title: "Top Engineering Specializations in Demand for 2025",
    href: "/engineering-specializations-2025",
    category: {
      name: "Career",
      href: "#",
      color: "bg-[#21C15E]/10 text-[#21C15E]",
    },
    description:
      "Explore the most sought-after engineering disciplines that offer excellent career prospects and opportunities in the evolving job market.",
    date: "Apr 5, 2024",
    datetime: "2024-04-05",
    readingTime: "8 min",
    image: "/api/placeholder/800/450"
  },
  {
    title: "Admission Process for Engineering Colleges in Telangana",
    href: "/telangana-engineering-admission-guide",
    category: {
      name: "Admissions",
      href: "#",
      color: "bg-[#1C61E7]/10 text-[#1C61E7]",
    },
    description:
      "A comprehensive guide to the admission process, important dates, eligibility criteria, and required documents for engineering colleges in Telangana.",
    date: "Apr 10, 2024",
    datetime: "2024-04-10",
    readingTime: "7 min",
    image: "/api/placeholder/800/450"
  }
];

const HomepageBlog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  // Categories extracted from posts for tabs
  const categories = ["All", ...new Set(extendedPosts.map(post => post.category.name))];

  // Filter posts based on active tab
  const filteredPosts = activeTab === "All"
    ? extendedPosts
    : extendedPosts.filter(post => post.category.name === activeTab);

  return (
    <section className="bg-white dark:bg-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 mb-4 bg-[#21C15E]/10 rounded-full text-[#21C15E] text-sm font-medium">
            <BookOpen className="w-4 h-4 mr-2" />
            Explore & Learn
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            College Resources & Guides
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover comprehensive guides and information about colleges, admissions, and career opportunities.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === category
                  ? "bg-[#21C15E] text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              href={post.href}
              key={post.title}
              className="group block"
            >
              <article
                className={`h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                  hoveredPost === post.title
                    ? "shadow-xl transform -translate-y-1"
                    : "hover:shadow-lg"
                }`}
                onMouseEnter={() => setHoveredPost(post.title)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* Image section */}
                <div className="relative w-full h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-gray-200 dark:bg-gray-700"
                    style={{
                      backgroundImage: post.image ? `url(${post.image})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  {/* Category badge - positioned over image */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full shadow-sm ${post.category.color}`}
                    >
                      {post.category.name}
                    </span>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#1C61E7] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {post.description}
                  </p>

                  {/* Footer with metadata */}
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.datetime}>
                        {post.date}
                      </time>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readingTime}
                      </span>
                    </div>

                    <div className="text-[#1C61E7] flex items-center font-medium">
                      <span className="mr-1 group-hover:mr-2 transition-all">Read</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View all button */}
        {/* <div className="mt-12 text-center">
          <Link
            href="/colleges"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Browse All Colleges
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default HomepageBlog;