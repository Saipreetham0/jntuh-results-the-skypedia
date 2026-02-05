'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MapPin, ArrowRight, Heart, ChevronUp, Github, Instagram, Youtube, Twitter } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

interface FooterLink {
  name: string;
  href: string;
}

// Social links configuration
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: siteConfig.social.instagram,
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    name: "GitHub",
    href: siteConfig.social.github,
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    name: "YouTube",
    href: siteConfig.social.youtube,
    icon: Youtube,
    color: "hover:text-red-500",
  },
  {
    name: "Twitter",
    href: `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
    icon: Twitter,
    color: "hover:text-blue-400",
  }
];

// Quick links for navigation
const quickLinks: FooterLink[] = [
  { name: "Home", href: "/" },
  { name: "Results Portal", href: "/results" },
  { name: "CGPA Calculator", href: "/cgpa-calculator" },
  { name: "Academic Resources", href: "/resources" },
  { name: "About TheSkypedia", href: siteConfig.brand.authorUrl + "/about-us" },
  { name: "Contact Support", href: "/contact" },
];

// Resource links for students
const resourceLinks: FooterLink[] = [
  { name: "JNTUH Syllabus", href: "/syllabus" },
  { name: "Previous Papers", href: "/previous-question-papers" },
  { name: "Credit Checking", href: "/credit-eligibility-check" },
  { name: "Academic Calendar", href: "/calendar" },
  { name: "Notification Alerts", href: "/notifications" },
];

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/favicon.ico`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": siteConfig.contact.email,
      "contactType": "customer support"
    },
    "sameAs": [
      siteConfig.social.instagram,
      siteConfig.social.github,
      siteConfig.social.youtube
    ]
  };
  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 overflow-hidden">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1C61E7]/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#21C15E]/5 rounded-full blur-[80px] -z-10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6 py-20">
          {/* Brand/About Section */}
          <div className="space-y-8">
            <div className="group inline-block">
              <Link href="/" className="flex items-baseline gap-1" title="Go to JNTUH Results Homepage">
                <span className="text-2xl font-bold text-[#1C61E7] tracking-tighter transition-all group-hover:scale-105">
                  JNTUH
                </span>
                <span className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tighter">
                  Results
                </span>
              </Link>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#1C61E7] to-[#21C15E] transition-all duration-300 rounded-full" />
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs font-normal">
              The ultimate academic companion for JNTUH students. Instant result tracking, accurate CGPA calculation, and professional student resources.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${item.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow JNTUH Results on ${item.name} (opens in new tab)`}
                  title={`${item.name} - ${siteConfig.brand.creator}`}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links with Hover Effects */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1C61E7] rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    title={link.name}
                    className="group flex items-center text-gray-500 hover:text-[#1C61E7] dark:text-gray-400 dark:hover:text-[#1C61E7] text-sm font-medium transition-all duration-200 w-fit"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-[#1C61E7] mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Tools Section */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#21C15E] rounded-full" />
              Student Tools
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    title={`Access ${link.name}`}
                    className="group flex items-center text-gray-500 hover:text-[#21C15E] dark:text-gray-400 dark:hover:text-[#21C15E] text-sm font-medium transition-all duration-200 w-fit"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-[#21C15E] mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section using Semantic <address> */}
          <div className="space-y-8">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1C61E7] rounded-full" />
              Office
            </h4>
            <address className="not-italic space-y-5">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                title="Send us an email"
                className="group flex items-center gap-4 text-gray-500 hover:text-[#1C61E7] transition-all p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-[#1C61E7]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Email</span>
                  <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-none">{siteConfig.contact.email}</span>
                </div>
              </a>

              <div className="group flex items-center gap-4 text-gray-500 transition-all p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center shadow-md">
                  <MapPin className="h-5 w-5 text-[#21C15E]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Location</span>
                  <span className="text-sm font-medium">{siteConfig.contact.location}</span>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Improved Subscription Section with Glassmorphism */}
        <div className="mx-6 mb-16 px-8 py-12 relative rounded-[40px] bg-gradient-to-br from-[#1C61E7]/5 to-[#21C15E]/5 border border-white/20 backdrop-blur-sm overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100/[0.03] [mask-image:linear-gradient(0deg,transparent,black)] -z-10" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 animate-bounce">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-[11px] font-semibold uppercase text-gray-900 dark:text-white tracking-widest">Join 50k+ Students</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tighter">
              Never Miss an Update
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-normal mb-10 max-w-lg mx-auto leading-relaxed">
              Get JNTUH results notifications, exam updates, and academic resource alerts directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="yourname@gmail.com"
                className="px-6 py-4 w-full sm:flex-1 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1C61E7] transition-all"
                required
                aria-label="Email address for result notifications"
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Notify Me</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Global Footer Bottom Bar */}
        <div className="px-6 py-12 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">&copy; {new Date().getFullYear()} {siteConfig.brand.creator.toUpperCase()}</span>
              <span className="text-xs font-medium text-gray-400">Official Results Companion • All rights reserved</span>
            </div>

            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Disclaimer', 'Cookies'].map((text) => (
                <Link
                  key={text}
                  href={`/${text.toLowerCase().replace(' ', '-')}`}
                  className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-[#1C61E7] transition-colors"
                >
                  {text}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-gray-700/50">
              <span className="text-xs font-medium text-gray-500">Built with</span>
              <Heart className="w-3.5 h-3.5 text-[#21C15E] fill-[#21C15E] animate-pulse" />
              <span className="text-xs font-medium text-gray-500">for JNTUH Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          title="Scroll to TOP"
          className="fixed bottom-8 right-8 z-[60] p-4 bg-[#1C61E7] text-white rounded-2xl shadow-2xl shadow-blue-500/30 border-2 border-white/20 backdrop-blur-lg hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in zoom-in slide-in-from-bottom-5"
          aria-label="Scroll back to top of the page"
        >
          <ChevronUp className="w-6 h-6 stroke-[3]" />
        </button>
      )}
    </footer>
  );
};

export default Footer;