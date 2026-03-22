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
  Phone,
  Info,
  Newspaper,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import ShareButton from "../../share-button";
import { SubscribeModal } from "../../features/result-alerts";

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
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Results",
    href: "#",
    submenu: [
      { name: "JNTUH Results", href: "/jntuh-results", description: "Latest semester exam results", icon: FileText },
      { name: "Consolidated Results", href: "/consolidated-results", description: "All semesters in one view", icon: BookOpen },
      { name: "Check Backlogs", href: "/check-backlogs", description: "Pending subjects at a glance", icon: FileQuestion },
      { name: "Credit Eligibility", href: "/credit-eligibility-check", description: "Verify promotion status", icon: GraduationCap },
    ],
  },
  {
    name: "Calculators",
    href: "#",
    submenu: [
      { name: "CGPA Calculator", href: "/cgpa-calculator", description: "Cumulative GPA for all regulations", icon: Calculator },
      { name: "CGPA to Percentage", href: "/cgpa-percentage-converter", description: "Official JNTUH formula", icon: Zap },
      { name: "Percentage to CGPA", href: "/percentage-to-cgpa-calculator", description: "Reverse-convert your score", icon: Calculator },
      { name: "SGPA to CGPA", href: "/sgpa-to-cgpa-calculator", description: "Aggregate semester GPAs", icon: Calculator },
      { name: "Marks to Percentage", href: "/marks-percentage-calculator", description: "Quick percentage checker", icon: Calculator },
    ],
  },
  {
    name: "Resources",
    href: "#",
    submenu: [
      { name: "Academic Calendar", href: "/calendar", description: "Important dates & events", icon: Calendar },
      { name: "Syllabus", href: "/syllabus", description: "Course curriculum by regulation", icon: BookOpen },
      { name: "Question Papers", href: "/jntuh-previous-question-papers", description: "Previous year exam papers", icon: FileQuestion },
      { name: "B.Tech Colleges", href: "/btech-colleges-tg", description: "Telangana college directory", icon: Building2 },
      { name: "FAQ", href: "/faq", description: "Common queries answered", icon: HelpCircle },
    ],
  },
  {
    name: "More",
    href: "#",
    submenu: [
      { name: "Blog", href: "/blog", description: "Guides, tips & updates", icon: Newspaper },
      { name: "About", href: "/about-us", description: "Our story and mission", icon: Info },
      { name: "Contact", href: "/contact", description: "Get in touch with us", icon: Phone },
    ],
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme, systemTheme } = useTheme();
  const isDarkMode = (theme === "system" ? systemTheme : theme) === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => setTheme(isDarkMode ? "light" : "dark");

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/60 shadow-sm"
          : "bg-white dark:bg-gray-950 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[62px]">

          {/* ── Logo ───────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#1C61E7] flex items-center justify-center shadow-sm group-hover:shadow-[#1C61E7]/30 transition-shadow">
              <span className="font-display font-black text-white text-base leading-none">J</span>
            </div>
            <span className="font-display text-[17px] font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
              JNTUH <span className="text-[#1C61E7]">Results</span>
            </span>
          </Link>

          {/* ── Desktop Nav ────────────────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            onMouseLeave={() => setHoveredNavItem(null)}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredNavItem === item.name;

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredNavItem(item.name)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold font-display transition-colors duration-150 ${
                      isActive || isHovered
                        ? "text-[#1C61E7] dark:text-blue-400 bg-[#1C61E7]/6 dark:bg-blue-900/15"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.submenu && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                        style={{ width: item.submenu.length > 4 ? 520 : 420 }}
                      >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/30 p-3">
                          <div className={`grid gap-0.5 ${item.submenu.length > 4 ? "grid-cols-2" : "grid-cols-1"}`}>
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="group/sub flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover/sub:bg-[#1C61E7]/8 group-hover/sub:text-[#1C61E7] dark:group-hover/sub:text-blue-400 transition-colors shrink-0">
                                  {sub.icon
                                    ? <sub.icon className="w-4 h-4" />
                                    : <FileText className="w-4 h-4" />
                                  }
                                </div>
                                <div className="min-w-0">
                                  <p className="font-display text-sm font-semibold text-gray-900 dark:text-white group-hover/sub:text-[#1C61E7] dark:group-hover/sub:text-blue-400 transition-colors truncate">
                                    {sub.name}
                                  </p>
                                  {sub.description && (
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* ── Desktop Actions ────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <ShareButton url="https://jntuhresults.theskypedia.com" />

            <SubscribeModal
              trigger={
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C61E7] hover:bg-[#1a56d1] text-white text-sm font-bold font-display rounded-xl shadow-sm shadow-[#1C61E7]/20 hover:shadow-[#1C61E7]/30 transition-all">
                  <Bell className="w-4 h-4" />
                  Get Alerts
                </button>
              }
            />
          </div>

          {/* ── Mobile Actions ─────────────────────────────────────── */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:w-[380px] p-0 bg-white dark:bg-gray-950 border-l border-gray-100 dark:border-gray-800 z-[100]"
              >
                <div className="flex flex-col h-full">

                  {/* Mobile header */}
                  <SheetHeader className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex flex-row items-center justify-between">
                    <SheetTitle asChild>
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#1C61E7] flex items-center justify-center">
                          <span className="font-display font-black text-white text-sm">J</span>
                        </div>
                        <span className="font-display text-base font-extrabold text-gray-900 dark:text-white tracking-tight">
                          JNTUH <span className="text-[#1C61E7]">Results</span>
                        </span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">

                    {/* Quick access grid */}
                    <div className="px-5 pt-5 pb-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-3">
                        Quick Access
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { label: "Latest Results", href: "/jntuh-results", Icon: FileText, color: "text-[#1C61E7]", bg: "bg-blue-50 dark:bg-blue-900/15 border-blue-100 dark:border-blue-900/30" },
                          { label: "CGPA Calc", href: "/cgpa-calculator", Icon: Calculator, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/15 border-amber-100 dark:border-amber-900/30" },
                          { label: "Check Backlogs", href: "/check-backlogs", Icon: FileQuestion, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/15 border-red-100 dark:border-red-900/30" },
                          { label: "Syllabus", href: "/syllabus", Icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/15 border-purple-100 dark:border-purple-900/30" },
                        ].map(({ label, href, Icon, color, bg }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${bg} active:scale-95 transition-all`}
                          >
                            <Icon className={`w-5 h-5 ${color}`} />
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-200 text-center leading-tight">
                              {label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Nav tree */}
                    <div className="px-5 pb-4 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-3 pt-2">
                        Navigate
                      </p>
                      {navItems.map((item) => (
                        <div key={item.name}>
                          {item.submenu ? (
                            <div>
                              <button
                                onClick={() => setMobileExpandedItem(
                                  mobileExpandedItem === item.name ? null : item.name
                                )}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors ${
                                  mobileExpandedItem === item.name
                                    ? "bg-[#1C61E7]/8 text-[#1C61E7] dark:text-blue-400"
                                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                                }`}
                              >
                                {item.name}
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileExpandedItem === item.name ? "rotate-180" : ""}`} />
                              </button>

                              <AnimatePresence>
                                {mobileExpandedItem === item.name && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pl-3 pt-1 pb-1 space-y-0.5">
                                      {item.submenu.map((sub) => (
                                        <Link
                                          key={sub.name}
                                          href={sub.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group/sub"
                                        >
                                          <span className="text-gray-400 dark:text-gray-500 group-hover/sub:text-[#1C61E7] dark:group-hover/sub:text-blue-400 transition-colors">
                                            {sub.icon ? <sub.icon className="w-4 h-4" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                                          </span>
                                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover/sub:text-gray-900 dark:group-hover/sub:text-white transition-colors">
                                            {sub.name}
                                          </span>
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
                              className={`block px-3 py-2.5 rounded-xl text-sm font-display font-semibold transition-colors ${
                                pathname === item.href
                                  ? "text-[#1C61E7] dark:text-blue-400 bg-[#1C61E7]/6"
                                  : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                              }`}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile footer CTA */}
                  <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    <SubscribeModal
                      trigger={
                        <button className="w-full py-3.5 bg-[#1C61E7] hover:bg-[#1a56d1] text-white font-display font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-sm shadow-[#1C61E7]/25">
                          <Bell className="w-4 h-4" />
                          Get Result Alerts
                        </button>
                      }
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400 font-medium">Share with friends</p>
                      <ShareButton url="https://jntuhresults.theskypedia.com" />
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
