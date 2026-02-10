

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X, Sun, Moon, Bell, ChevronDown, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import ShareButton from "../../share-button";
import { SubscribeModal } from "../../features/result-alerts";

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
      { name: "JNTUH Results", href: "/jntuh-results" },
      { name: "Consolidated Results", href: "/consolidated-results" },
      { name: "Backlogs", href: "/check-backlogs" },
      { name: "Credit Eligibility", href: "/credit-eligibility-calculator" },
    ],
  },
  {
    name: "Calculators",
    href: "#",
    submenu: [
      { name: "CGPA Calculator", href: "/cgpa-calculator" },
      { name: "CGPA to Percentage", href: "/jntuh-cgpa-to-percentage-formula" },
      { name: "Percentage to CGPA", href: "/percentage-to-cgpa-calculator" },
      { name: "SGPA to CGPA", href: "/sgpa-to-cgpa-calculator" },
      { name: "Marks to Percentage", href: "/marks-percentage-calculator" },
    ],
  },
  {
    name: "Resources",
    href: "#",
    submenu: [
      { name: "Academic Calendar", href: "/calendar" },
      { name: "Syllabus", href: "/syllabus" },
      { name: "Question Papers", href: "/jntuh-previous-question-papers" },
      { name: "B.Tech Colleges", href: "/btech-colleges-tg" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    name: "About",
    href: "/about-us",
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
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(
    null
  );
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";

  // Prevent hydration mismatch by rendering nothing or a placeholder until mounted
  if (!mounted) return null;

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
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
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
            <Link href="/" className="flex items-center gap-2 group">
              <span className="sr-only">JNTUH Results</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl md:text-2xl font-bold text-[#1C61E7] dark:text-[#1C61E7] tracking-tight group-hover:scale-105 transition-transform">
                  JNTUH
                </span>
                <span className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                  Results
                </span>
              </div>
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
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${openSubmenu === item.name || item.submenu.some(sub => pathname === sub.href)
                        ? "text-[#1C61E7] bg-[#1C61E7]/5"
                        : "text-gray-600 hover:text-[#1C61E7] dark:text-gray-300 dark:hover:text-[#1C61E7] hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      aria-expanded={openSubmenu === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {openSubmenu === item.name && (
                      <div className="absolute left-0 top-full pt-2 w-64 origin-top-left z-50">
                        <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 border border-gray-100 dark:border-gray-800 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className={`group/item flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 ${pathname === subitem.href
                                ? "bg-[#1C61E7]/10 text-[#1C61E7]"
                                : "text-gray-600 dark:text-gray-300 hover:bg-[#1C61E7]/5 hover:text-[#1C61E7]"
                                }`}
                            >
                              <span>{subitem.name}</span>
                              <ChevronDown className="-rotate-90 h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-all transform group-hover/item:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${pathname === item.href
                      ? "text-[#1C61E7] bg-[#1C61E7]/5"
                      : "text-gray-600 hover:text-[#1C61E7] dark:text-gray-300 dark:hover:text-[#1C61E7] hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
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

            <SubscribeModal
              trigger={
                <button
                  className="group relative ml-2 px-6 py-2.5 text-sm font-bold text-white bg-[#1C61E7] hover:bg-[#1C61E7]/90 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  Subscribe
                </button>
              }
            />
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
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 border-l border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#1C61E7] tracking-tight">
                      JNTUH
                    </span>
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                      Results
                    </span>
                  </div>
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
                            className={`flex items-center justify-between w-full px-4 py-4 text-base font-bold rounded-2xl transition-all ${mobileOpenSubmenu === item.name
                              ? "text-[#1C61E7] bg-[#1C61E7]/5"
                              : "text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                            onClick={() => toggleMobileSubmenu(item.name)}
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${mobileOpenSubmenu === item.name
                                ? "rotate-180 text-[#1C61E7]"
                                : "text-gray-400"
                                }`}
                            />
                          </button>

                          {/* Mobile submenu with animation */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileOpenSubmenu === item.name
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
                          className={`block px-4 py-4 text-base font-bold rounded-2xl transition-all ${pathname === item.href
                            ? "text-[#1C61E7] bg-[#1C61E7]/5"
                            : "text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile action buttons */}
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 shadow-xl">
                  <SubscribeModal
                    trigger={
                      <button
                        className="flex items-center justify-center gap-2 w-full py-4.5 px-4 rounded-2xl text-center text-white bg-[#1C61E7] hover:bg-[#1C61E7]/90 font-bold shadow-xl shadow-blue-500/25 active:scale-95 transition-all text-lg"
                        onClick={closeMobileMenu}
                      >
                        <Bell className="h-5 w-5" />
                        Subscribe
                      </button>
                    }
                  />

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
