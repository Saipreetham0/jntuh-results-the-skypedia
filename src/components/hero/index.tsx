"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Globe, Search, TrendingUp, Award, Users } from "lucide-react";
import AdBanner from "../adsense/AdBanner";

const Hero: React.FC = () => {
  const handleWhatsAppContact = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=919550421866",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleWebsiteVisit = () => {
    window.open(
      "https://kspelectronics.in/?utm_source=website&utm_medium=button&utm_campaign=jntuh_results",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black">
      {/* Animated background elements - Optimized for both Mobile & Desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mobile: Static gradients using CSS for better performance */}
        <div className="md:hidden absolute -top-20 -right-20 w-60 h-60 bg-[#1C61E7]/5 rounded-full blur-3xl"></div>
        <div className="md:hidden absolute -bottom-20 -left-20 w-60 h-60 bg-[#21C15E]/5 rounded-full blur-3xl"></div>

        {/* Desktop: Animated pulses */}
        <div className="hidden md:block absolute -top-40 -right-40 w-80 h-80 bg-[#1C61E7]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden md:block absolute -bottom-40 -left-40 w-96 h-96 bg-[#21C15E]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-24">
        {/* Hero title with animation - mobile optimized */}
        <div className="text-center mb-6 md:mb-12 lg:mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2.5 md:py-2 mb-5 md:mb-6 bg-[#1C61E7]/10 rounded-full text-[#1C61E7] text-sm md:text-sm font-medium">
            <Award className="w-5 h-5 md:w-4 md:h-4 mr-2" />
            Trusted by 100,000+ students
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 dark:text-white mb-5 md:mb-6 tracking-tight px-2">
            Instant Access to{" "}
            <span className="relative inline-block mt-1 md:mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#1C61E7] to-[#1C61E7]/70">
                JNTUH Results
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-3/4 left-0 h-[0.58em] w-full fill-[#1C61E7]/20"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </span>
          </h1>

          <p className="mt-5 md:mt-6 max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4">
            Get quick and easy access to your Jawaharlal Nehru Technological
            University Hyderabad exam results with <span className="font-semibold text-gray-900 dark:text-gray-100">advanced analytics</span> and <span className="font-semibold text-gray-900 dark:text-gray-100">insights</span>.
          </p>

          {/* CTA Buttons - mobile optimized */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center px-4">
            <Link
              href="/consolidated-results"
              className="group inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white bg-[#1C61E7] rounded-full active:bg-[#1C61E7]/80 md:hover:bg-[#1C61E7]/90 transform transition-all duration-300 active:scale-95 md:hover:scale-105 md:hover:shadow-xl shadow-lg min-h-[48px]"
            >
              <Search className="w-5 h-5 mr-2" />
              Check Results Now
              <svg className="w-5 h-5 ml-2 md:group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="/cgpa-calculator"
              className="inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 text-base md:text-lg font-semibold text-[#1C61E7] bg-white dark:bg-gray-800 border-2 border-[#1C61E7] rounded-full active:bg-[#1C61E7]/10 md:hover:bg-[#1C61E7]/5 dark:md:hover:bg-gray-700 transform transition-all duration-300 active:scale-95 md:hover:scale-105 shadow-md min-h-[48px]"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Calculate CGPA
            </Link>
          </div>
        </div>

        {/* Stats Section - mobile optimized */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {[
            { icon: Users, label: "Active Students", value: "100K+" },
            { icon: Search, label: "Result Searches", value: "500K+" },
            { icon: TrendingUp, label: "Avg. Response", value: "<2s" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 text-center transform transition-all duration-300 active:scale-95 md:hover:scale-105 md:hover:shadow-lg border border-gray-200 dark:border-gray-700 shadow-md"
            >
              <stat.icon className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-[#1C61E7]" />
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Card - mobile optimized */}
        <div className="relative bg-[#1C61E7] rounded-2xl overflow-hidden shadow-2xl">
          <div className="hidden md:block absolute inset-0 bg-grid-white/10"></div>
          <div className="relative p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
              <div className="text-center md:text-left flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 md:mb-3">
                  Explore IoT Kit and ML Projects
                </h2>
                <p className="text-base md:text-lg text-white/90 mb-5 md:mb-6">
                  Unlock the world of innovation and technology for your college projects!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button
                    onClick={handleWhatsAppContact}
                    className="group flex items-center justify-center py-3 px-6 bg-[#21C15E] text-white font-semibold rounded-full transition-all duration-300 active:scale-95 md:hover:scale-105 md:hover:shadow-xl md:hover:bg-[#21C15E]/90 shadow-lg min-h-[48px]"
                    aria-label="Contact via WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5 mr-2 md:group-hover:rotate-12 transition-transform" />
                    <span>Contact via WhatsApp</span>
                  </button>

                  <button
                    onClick={handleWebsiteVisit}
                    className="flex items-center justify-center py-3 px-6 bg-white text-[#1C61E7] font-semibold rounded-full active:bg-white/80 md:hover:bg-white/90 transition-all duration-300 shadow-lg min-h-[48px]"
                    aria-label="Visit Website"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    <span>Visit Website</span>
                  </button>
                </div>
              </div>

              {/* Decorative element - desktop only */}
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad banner */}
        <div className="mt-12">
          <AdBanner adSlot="5967398818" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

// Add these styles to your global CSS file
/*
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
*/
