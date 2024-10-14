// import Image from "next/image";
// const posts = [
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
//     author: {
//       name: "Paul York",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     readingTime: "6 min",
//   },
//   // {
//   //   title: "How to use search engine optimization to drive sales",
//   //   href: "#",
//   //   category: { name: "Video", href: "#", color: "bg-pink-100 text-pink-800" },
//   //   description:
//   //     "Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.",
//   //   date: "Mar 10, 2020",
//   //   datetime: "2020-03-10",
//   //   author: {
//   //     name: "Dessie Ryan",
//   //     href: "#",
//   //     imageUrl:
//   //       "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   //   },
//   //   readingTime: "4 min",
//   // },
//   // {
//   //   title: "Improve your customer experience",
//   //   href: "#",
//   //   category: {
//   //     name: "Case Study",
//   //     href: "#",
//   //     color: "bg-green-100 text-green-800",
//   //   },
//   //   description:
//   //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iure iusto fugiat commodi sequi.",
//   //   date: "Feb 12, 2020",
//   //   datetime: "2020-02-12",
//   //   author: {
//   //     name: "Easer Collins",
//   //     href: "#",
//   //     imageUrl:
//   //       "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   //   },
//   //   readingTime: "11 min",
//   // },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function HomepageBlog() {
//   return (
//     <div className="bg-white mx-11 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28 dark:bg-gray-900">
//       <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl dark:divide-gray-600">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
//             Colleges List
//           </h2>

//         </div>
//         <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
//           {posts.map((post) => (
//             <div key={post.title}>
//               <div>
//                 <a href={post.category.href} className="inline-block">
//                   <span
//                     className={classNames(
//                       post.category.color,
//                       "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium "
//                     )}
//                   >
//                     {post.category.name}
//                   </span>
//                 </a>
//               </div>
//               <a href={post.href} className="mt-4 block">
//                 <p className="text-xl font-semibold text-gray-900 dark:text-white">
//                   {post.title}
//                 </p>
//                 <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
//                   {post.description}
//                 </p>
//               </a>
//               {/* <div className="mt-6 flex items-center">
//                 <div className="flex-shrink-0">
//                   <a href={post.author.href}>
//                     <span className="sr-only">{post.author.name}</span>
//                     <Image
//                       className="h-10 w-10 rounded-full"
//                       src={post.author.imageUrl}
//                       width={10}
//                       height={10}
//                       alt=""
//                     />
//                   </a>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-900">
//                     <a href={post.author.href}>{post.author.name}</a>
//                   </p>
//                   <div className="flex space-x-1 text-sm text-gray-500">
//                     <time dateTime={post.datetime}>{post.date}</time>
//                     <span aria-hidden="true">&middot;</span>
//                     <span>{post.readingTime} read</span>
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

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
}

const posts: Post[] = [
  {
    title: "Btech Colleges in Telangana - Find the Best Engineering Institutes",
    href: "/btech-colleges-tg",
    category: {
      name: "Education",
      href: "#",
      color: "bg-indigo-100 text-indigo-800",
    },
    description:
      "Discover the Btech colleges in Telangana for quality education. Find the best engineering institutes in Telangana for a bright future.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",

    readingTime: "6 min",
  },
  

  // Add more posts here if needed
];

const HomepageBlog: React.FC = () => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
          Colleges List
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.title}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
                hoveredPost === post.title ? "transform scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredPost(post.title)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="p-6">
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${post.category.color}`}
                  >
                    {post.category.name}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.description}
                </p>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date} • {post.readingTime} read
                </div>
                <a
                  href={post.href}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition duration-150 ease-in-out"
                >
                  Read more
                  <svg
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageBlog;
