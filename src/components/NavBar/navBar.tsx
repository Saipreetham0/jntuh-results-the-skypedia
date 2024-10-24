// "use client";
// import { useState } from "react";
// import { Dialog, Popover } from "@headlessui/react";

// import Link from "next/link"; // Import Link from Next.js
// import Image from "next/image"; // Import Image from Next.js
// import ThemeButton from "../Theme";
// import ShareButton from "../ShareButton";

// const products = [
//   //   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
// ];
// const callsToAction = [
//   //   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
// ];

// function classs(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 bg-white dark:bg-gray-900">
//       <nav
//         className=" mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 "
//         aria-label="Global"
//       >
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <span className="sr-only">Open main menu</span>
//             {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-6 h-6 dark:text-white"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="flex lg:flex-1 ">
//           <Link href="/" className="-m-1.5 p-1.5">
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
//               JNTUH Results
//             </span>
//             {/* <Image
//                 className="h-8 w-auto"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 alt=""
//                 width={32} // Set the width of the image
//                 height={32} // Set the height of the image
//               /> */}
//           </Link>
//         </div>
//         <div className="flex lg:hidden">
//           <ThemeButton />
//           <ShareButton />
//         </div>

//         <Popover.Group className="hidden lg:flex lg:gap-x-12">
//           {/* Add your Popover content here */}

//           {/* <Link
//             href="/about-us"
//             className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
//           >
//             About us
//           </Link> */}
//           <Link
//             href="/blog"
//             className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
//           >
//             Blog
//           </Link>
//           <Link
//             href="/contact"
//             className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
//           >
//             Contact
//           </Link>
//         </Popover.Group>

//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <ThemeButton />
//           <ShareButton />
//           <Link
//             href="/login"
//             className="cursor-pointer flex lg:shrink-0 justify-center items-center gap-2 font-semibold transition-all duration-300 rounded-full focus-visible:ring focus-visible:ring-red-800 focus-visible:ring-opacity-10 ring-red-800 focus:outline-none select-none disabled:cursor-not-allowed disabled:opacity-80 text-gray-50 dark:text-gray-900 bg-indigo-600 dark:bg-blue-300 hover:bg-blue-500 dark:hover:bg-blue-400 lg:px-7 px-6 lg:py-3 py-2 lg:text-md text-sm group relative w-1/5"
//           >
//             Login
//           </Link>
//         </div>
//       </nav>
//       <div className="w-full border-t border-gray-300" />

//       <Dialog
//         as="div"
//         className="lg:hidden"
//         open={mobileMenuOpen}
//         onClose={() => setMobileMenuOpen(false)}
//       >
//         {/* Add your mobile menu content here */}
//         <div className="fixed inset-0 z-10" />
//         <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-800">
//           <div className="flex items-center justify-between">
//             <Link href="/" className="-m-1.5 p-1.5">
//               <span className="sr-only">Slam Book</span>
//               <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//                 JNTUH Results
//               </span>
//               {/* <img
//                 className="h-8 w-auto"
//                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 alt=""
//               /> */}
//             </Link>

//             <button
//               type="button"
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <span className="sr-only">Close menu</span>
//               {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-6 h-6 dark:text-white"
//                 aria-hidden="true"
//               >
//                 <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
//               </svg>
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 {/* <Disclosure as="div" className="-mx-3">
//                   {({ open }) => (
//                     <>
//                       <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
//                         Product
//                         <ChevronDownIcon
//                           className={classs(
//                             open ? "rotate-180" : "",
//                             "h-5 w-5 flex-none"
//                           )}
//                           aria-hidden="true"
//                         />
//                       </Disclosure.Button>
//                       <Disclosure.Panel className="mt-2 space-y-2">
//                         {[...products, ...callsToAction].map((item) => (
//                           <Disclosure.Button
//                             key={item.name}
//                             as="a"
//                             href={item.href}
//                             className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                           >
//                             {item.name}
//                           </Disclosure.Button>
//                         ))}
//                       </Disclosure.Panel>
//                     </>
//                   )}
//                 </Disclosure> */}
//                 <Link
//                   href="/about-us"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50   dark:text-white dark:hover:bg-gray-700"
//                 >
//                   About us
//                 </Link>
//                 <Link
//                   href="/blog"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   Blog
//                 </Link>
//                 <Link
//                   href="/contact"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   Contact
//                 </Link>
//               </div>
//               <div className="py-6">
//                 <Link
//                   href="/login"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700"
//                 >
//                   login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Dialog.Panel>
//       </Dialog>
//     </header>
//   );
// }

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { Menu, X, Sun, Moon, Share2 } from "lucide-react";
import { useTheme } from "next-themes";
import ShareButton from "../ShareButton";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleShare = () => {
    // Add your share logic here
    console.log("Share functionality");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center -m-1.5 p-1.5">
            <span className="sr-only">JNTUH Results</span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              JNTUH
            </span>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              Results
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          {/* <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
            aria-label="Share this page"
          >
            <Share2 className="h-5 w-5" />
          </button> */}
          <ShareButton url="https://jntuhresults.theskypedia.com" />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400 transition duration-150 ease-in-out"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          {/* <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            <Share2 className="h-5 w-5" />
          </button> */}
          <ShareButton url="https://jntuhresults.theskypedia.com" />

          <Link
            href="/login"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out"
          >
            Login
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={closeMobileMenu}>
              <span className="sr-only">JNTUH Results</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                JNTUH
              </span>
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                Results
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
