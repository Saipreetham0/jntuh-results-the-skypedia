

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  BookOpen,
  Calculator,
  FileText,
  Calendar,
  GraduationCap,
  HelpCircle,
  FileQuestion,
  Building2,
  Sparkles,
  Phone,
  Info,
  Newspaper
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import ShareButton from "../../share-button";
import { SubscribeModal } from "../../features/result-alerts";

// --- Types ---
interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ElementType;
}

interface NavItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
  isSpecial?: boolean;
}

// --- Navigation Data ---
const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Results",
    href: "#",
    submenu: [
      { name: "JNTUH Results", href: "/jntuh-results", description: "Latest exam results", icon: FileText },
      { name: "Consolidated Results", href: "/consolidated-results", description: "All semesters in one view", icon: BookOpen },
      { name: "Backlogs", href: "/check-backlogs", description: "Check pending subjects", icon: FileQuestion },
      { name: "Credit Eligibility", href: "/credit-eligibility-calculator", description: "Verify promotion status", icon: GraduationCap },
    ],
  },
  {
    name: "Calculators",
    href: "#",
    submenu: [
      { name: "CGPA Calculator", href: "/cgpa-calculator", description: "Calculate your CGPA", icon: Calculator },
      { name: "Percentage to CGPA", href: "/percentage-to-cgpa-calculator", description: "Convert % to CGPA", icon: Sparkles },
      { name: "SGPA to CGPA", href: "/sgpa-to-cgpa-calculator", description: "Track semester progress", icon: Calculator },
      { name: "Marks to Percentage", href: "/marks-percentage-calculator", description: "Aggregate score check", icon: Calculator },
    ],
  },
  {
    name: "Resources",
    href: "#",
    submenu: [
      { name: "Academic Calendar", href: "/calendar", description: "Important dates & events", icon: Calendar },
      { name: "Syllabus", href: "/syllabus", description: "Course curriculum", icon: BookOpen },
      { name: "Question Papers", href: "/jntuh-previous-question-papers", description: "Previous year papers", icon: FileQuestion },
      { name: "B.Tech Colleges", href: "/btech-colleges-tg", description: "College information", icon: Building2 },
      { name: "FAQ", href: "/faq", description: "Common queries", icon: HelpCircle },
    ],
  },
  {
    name: "More",
    href: "#",
    submenu: [
      { name: "Blog", href: "/blog", description: "Latest updates & news", icon: Newspaper },
      { name: "About", href: "/about-us", description: "Who we are", icon: Info },
      { name: "Contact", href: "/contact", description: "Get in touch", icon: Phone },
    ],
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const { theme, setTheme, systemTheme } = useTheme();

  const isDarkMode = (theme === "system" ? systemTheme : theme) === "dark";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => setTheme(isDarkMode ? "light" : "dark");

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
        : "h-20 bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">

          {/* --- Logo --- */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              {/* <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 relative z-10" /> */}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">
                JNTUH <span className="text-blue-600 dark:text-blue-400">Results</span>
              </span>
            </div>
          </Link>

          {/* --- Desktop Navigation --- */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredNavItem(null)}>
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredNavItem(item.name)}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 flex items-center gap-1 ${hoveredNavItem === item.name || pathname === item.href
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${hoveredNavItem === item.name ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.submenu && hoveredNavItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] z-50"
                    >
                      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 backdrop-blur-3xl overflow-hidden relative">
                        {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="grid grid-cols-2 gap-4 relative z-10">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group flex items-start p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                {subItem.icon ? <subItem.icon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {subItem.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {subItem.description || "Learn more"}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* --- Action Buttons --- */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <ShareButton url="https://jntuhresults.theskypedia.com" />
            <SubscribeModal
              trigger={
                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Subscribe
                </button>
              }
            />
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 z-[100]">
                <div className="flex flex-col h-full bg-white dark:bg-gray-950">
                  {/* 1. Mobile Header */}
                  <SheetHeader className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex flex-row items-center justify-between bg-white/50 dark:bg-gray-950/50 backdrop-blur-md sticky top-0 z-20">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <span className="font-bold text-lg">J</span>
                      </div>
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Menu
                      </span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">Mobile Navigation</SheetDescription>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle Theme"
                      >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Close Menu"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    {/* 2. Quick Actions Grid */}
                    <div className="p-6 pb-2">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Access</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/jntuh-results"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 active:scale-95 transition-all text-center gap-2"
                        >
                          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-bold text-gray-700 dark:text-blue-100">Latest Results</span>
                        </Link>
                        <Link
                          href="/cgpa-calculator"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 active:scale-95 transition-all text-center gap-2"
                        >
                          <Calculator className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                          <span className="text-xs font-bold text-gray-700 dark:text-amber-100">CGPA Calc</span>
                        </Link>
                        <Link
                          href="/bus-pass-status"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 active:scale-95 transition-all text-center gap-2"
                        >
                          <div className="w-6 h-6 text-emerald-600 dark:text-emerald-400">🚌</div>
                          <span className="text-xs font-bold text-gray-700 dark:text-emerald-100">Bus Pass</span>
                        </Link>
                        <Link
                          href="/syllabus"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 active:scale-95 transition-all text-center gap-2"
                        >
                          <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-bold text-gray-700 dark:text-purple-100">Syllabus</span>
                        </Link>
                      </div>
                    </div>

                    {/* 3. Main Navigation List */}
                    <div className="p-6 pt-2 space-y-2">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Discover</h3>
                      {navItems.map((item) => (
                        <div key={item.name} className="overflow-hidden">
                          {item.submenu ? (
                            <div className="bg-white dark:bg-gray-900/40 rounded-2xl transition-all duration-300">
                              <button
                                onClick={() => setMobileExpandedItem(mobileExpandedItem === item.name ? null : item.name)}
                                className={`flex items-center justify-between w-full p-4 font-semibold text-left transition-colors rounded-2xl ${mobileExpandedItem === item.name
                                  ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                  }`}
                              >
                                {item.name}
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileExpandedItem === item.name ? "rotate-180" : ""}`} />
                              </button>
                              <AnimatePresence>
                                {mobileExpandedItem === item.name && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-2 space-y-1">
                                      {item.submenu.map((sub) => (
                                        <Link
                                          key={sub.name}
                                          href={sub.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ml-2 border-l-2 border-transparent hover:border-blue-500"
                                        >
                                          <div className="text-gray-500 dark:text-gray-400">
                                            {sub.icon ? <sub.icon className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                          </div>
                                          <div>
                                            <p className="font-medium text-gray-900 dark:text-white text-sm leading-none">{sub.name}</p>
                                            {sub.description && <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{sub.description}</p>}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block p-4 font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Sticky Mobile Footer */}
                  <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                    <div className="space-y-4">
                      <SubscribeModal
                        trigger={
                          <button className="w-full py-4 bg-[#1C61E7] text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 text-base">
                            <Bell className="w-5 h-5" />
                            <span>Get Result Alerts</span>
                          </button>
                        }
                      />
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-gray-400 font-medium pl-1">Spread the word</p>
                        <ShareButton
                          url="https://jntuhresults.theskypedia.com"
                          className="!static" // Override relative positioning for mobile
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
