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
