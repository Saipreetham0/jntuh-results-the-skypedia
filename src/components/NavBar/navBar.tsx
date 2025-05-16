

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X, Sun, Moon, Search, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import ShareButton from "../ShareButton";

interface NavItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Results",
    href: "#",
    submenu: [
      { name: "Consolidated Results", href: "/consolidated-results" },
      { name: "Semester Results", href: "/semester-wise-results" },
      { name: "Backlogs", href: "/check-backlogs" },
      { name: "Credits Check", href: "/credit-eligibility-check" },
    ],
  },
  {
    name: "Calculators",
    href: "#",
    submenu: [
      { name: "CGPA Calculator", href: "/cgpa-calculator" },
      { name: "CGPA to Percentage", href: "/cgpa-percentage-converter" },
      { name: "SGPA to CGPA", href: "/sgpa-to-cgpa-calculator" },
    ],
  },
  {
    name: "Resources",
    href: "#",
    submenu: [
      { name: "Syllabus", href: "/syllabus" },
      { name: "Question Papers", href: "/previous-question-papers" },
      { name: "Academic Calendar", href: "/academic-calendar" },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(
    null
  );
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";

  // Track scroll position to add shadow and background opacity to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileOpenSubmenu(null);
  };

  const toggleMobileSubmenu = (name: string) => {
    setMobileOpenSubmenu(mobileOpenSubmenu === name ? null : name);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Global"
        >
          {/* Logo section */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="sr-only">JNTUH Results</span>
              <span className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                JNTUH
              </span>
              <span className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                Results
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              onClick={toggleDarkMode}
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

            <ShareButton url="https://jntuhresults.theskypedia.com" />

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-1 xl:gap-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative px-3">
                {item.submenu ? (
                  <div
                    className="group"
                    onMouseEnter={() => setOpenSubmenu(item.name)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <button
                      className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition duration-150 ease-in-out"
                      aria-expanded={openSubmenu === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    <div
                      className={`absolute left-0 mt-1 w-56 origin-top-left rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 z-50 ${
                        openSubmenu === item.name
                          ? "opacity-100 transform scale-100"
                          : "opacity-0 transform scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="py-1 rounded-lg overflow-hidden">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-indigo-400"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition duration-150 ease-in-out"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
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

            <ShareButton url="https://jntuhresults.theskypedia.com" />

            <Link href="/notifications" className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                2
              </span>
            </Link>

            <Link
              href="/login"
              className="ml-1 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile menu dialog */}
      <Transition show={mobileMenuOpen} as={React.Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="transition ease-out duration-300"
            enterFrom="transform translate-x-full"
            enterTo="transform translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="transform translate-x-0"
            leaveTo="transform translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-1"
                  onClick={closeMobileMenu}
                >
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    JNTUH
                  </span>
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Results
                  </span>
                </Link>
                <button
                  type="button"
                  className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  onClick={closeMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile search removed */}

              {/* Mobile nav items */}
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="space-y-2 py-6">
                    {navItems.map((item) => (
                      <div key={item.name}>
                        {item.submenu ? (
                          <div className="mb-2">
                            <button
                              className="flex items-center justify-between w-full px-4 py-2.5 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                              onClick={() => toggleMobileSubmenu(item.name)}
                            >
                              {item.name}
                              <ChevronDown
                                className={`ml-1 h-5 w-5 transition-transform ${
                                  mobileOpenSubmenu === item.name
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>

                            {/* Mobile submenu with animation */}
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                mobileOpenSubmenu === item.name
                                  ? "max-h-96 opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              <div className="mt-1 space-y-1 px-2">
                                {item.submenu.map((subitem) => (
                                  <Link
                                    key={subitem.name}
                                    href={subitem.href}
                                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    onClick={closeMobileMenu}
                                  >
                                    {subitem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-4 py-2.5 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            onClick={closeMobileMenu}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile login button */}
                  <div className="py-6 space-y-6">
                    <Link
                      href="/login"
                      className="block w-full py-3 px-4 rounded-lg text-center text-white bg-indigo-600 hover:bg-indigo-700 font-medium shadow-sm"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>

                    {/* Notification count */}
                    <Link href="/notifications" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>Notifications</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                        1
                      </span>
                    </Link>  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Navbar;
