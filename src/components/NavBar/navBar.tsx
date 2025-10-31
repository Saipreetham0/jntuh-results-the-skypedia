

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X, Sun, Moon, Bell, ChevronDown, Sparkles } from "lucide-react";
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
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-gray-200 dark:border-gray-800"
          : "bg-white dark:bg-gray-900 border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between h-16 md:h-18"
          aria-label="Global"
        >
          {/* Logo section */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="sr-only">JNTUH Results</span>
              <span className="text-xl md:text-2xl font-bold text-[#1C61E7] dark:text-[#1C61E7]">
                JNTUH
              </span>
              <span className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                Results
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-200 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] rounded-lg transition-colors"
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
              className="inline-flex items-center justify-center p-2 text-gray-700 dark:text-gray-200 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-1 xl:gap-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenSubmenu(item.name)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1C61E7] dark:text-gray-200 dark:hover:text-[#1C61E7] transition-colors duration-200 rounded-lg hover:bg-[#1C61E7]/5"
                      aria-expanded={openSubmenu === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {openSubmenu === item.name && (
                      <div className="absolute left-0 top-full mt-1 w-60 origin-top-left rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-50 border-t-2 border-[#1C61E7] animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="py-2 rounded-xl overflow-hidden">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="group/item flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#1C61E7]/10 hover:text-[#1C61E7] dark:text-gray-200 dark:hover:bg-[#1C61E7]/20 dark:hover:text-[#1C61E7] transition-all duration-150"
                            >
                              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover/item:bg-[#1C61E7] transition-colors" />
                              <span className="group-hover/item:translate-x-0.5 transition-transform">
                                {subitem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1C61E7] dark:text-gray-200 dark:hover:text-[#1C61E7] transition-colors duration-200 rounded-lg hover:bg-[#1C61E7]/5"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop right section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] rounded-lg transition-all duration-200"
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

            <Link
              href="/notifications"
              className="relative p-2 text-gray-700 dark:text-gray-200 hover:bg-[#21C15E]/10 dark:hover:bg-[#21C15E]/20 hover:text-[#21C15E] rounded-lg transition-all duration-200 group"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#21C15E] rounded-full animate-pulse group-hover:scale-110 transition-transform">
                2
              </span>
            </Link>

            <Link
              href="/login"
              className="group relative ml-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#1C61E7] hover:bg-[#1C61E7]/90 rounded-lg transition-all duration-200 shadow-lg shadow-[#1C61E7]/25 hover:shadow-xl hover:shadow-[#1C61E7]/30 hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
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
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 border-l-4 border-[#1C61E7]">
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center gap-1.5"
                  onClick={closeMobileMenu}
                >
                  <span className="text-2xl font-bold text-[#1C61E7]">
                    JNTUH
                  </span>
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Results
                  </span>
                </Link>
                <button
                  type="button"
                  className="p-2.5 text-gray-700 dark:text-gray-200 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] rounded-lg transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile nav items */}
              <div className="flow-root">
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.submenu ? (
                        <div>
                          <button
                            className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-gray-900 dark:text-gray-200 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] rounded-xl transition-all"
                            onClick={() => toggleMobileSubmenu(item.name)}
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-200 ${
                                mobileOpenSubmenu === item.name
                                  ? "rotate-180 text-[#1C61E7]"
                                  : ""
                              }`}
                            />
                          </button>

                          {/* Mobile submenu with animation */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              mobileOpenSubmenu === item.name
                                ? "max-h-96 opacity-100 mt-2"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="space-y-1 px-2 py-2 bg-[#1C61E7]/5 dark:bg-[#1C61E7]/10 rounded-xl">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-[#1C61E7] rounded-lg transition-all"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#1C61E7]" />
                                  {subitem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-4 py-3 text-base font-semibold text-gray-900 dark:text-gray-200 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] rounded-xl transition-all"
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile action buttons */}
                <div className="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700 space-y-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-center text-white bg-[#1C61E7] hover:bg-[#1C61E7]/90 font-semibold shadow-lg shadow-[#1C61E7]/25 hover:shadow-xl hover:shadow-[#1C61E7]/30 transition-all"
                    onClick={closeMobileMenu}
                  >
                    <Sparkles className="h-4 w-4" />
                    Login
                  </Link>

                  {/* Notification link */}
                  <Link
                    href="/notifications"
                    className="flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-200 bg-[#21C15E]/10 dark:bg-[#21C15E]/20 hover:bg-[#21C15E]/20 dark:hover:bg-[#21C15E]/30 rounded-xl transition-all"
                    onClick={closeMobileMenu}
                  >
                    <span className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-[#21C15E]" />
                      Notifications
                    </span>
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#21C15E] rounded-full animate-pulse">
                      2
                    </span>
                  </Link>
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
