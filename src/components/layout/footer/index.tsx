// import React, { type JSX } from 'react';

// interface SocialLink {
//   name: string;
//   href: string;
//   icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
// }

// const socialLinks: SocialLink[] = [
//   {
//     name: "Instagram",
//     href: "https://www.instagram.com/theskypedia",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "GitHub",
//     href: "https://github.com/TheSkypedia",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "https://www.youtube.com/@theskypedia",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white dark:bg-gray-900">
//       <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         <div className="flex flex-col items-center justify-between space-y-6 sm:flex-row sm:space-y-0">
//           <div className="flex space-x-6">
//             {socialLinks.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-400 hover:text-gray-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={`${item.name} (opens in a new tab)`}
//               >
//                 <item.icon className="h-6 w-6" aria-hidden="true" />
//               </a>
//             ))}
//           </div>
//           <p className="text-center text-sm text-gray-500">
//             &copy; {new Date().getFullYear()} THE SKYPEDIA . All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { type JSX } from 'react';
import Link from 'next/link';
import { Mail, MapPin, ArrowRight, Heart } from 'lucide-react';

interface SocialLink {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

interface FooterLink {
  name: string;
  href: string;
}

// Social links with your existing icons
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/theskypedia",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/TheSkypedia",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@theskypedia",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

// Quick links for navigation
const quickLinks: FooterLink[] = [
  { name: "Home", href: "/" },
  { name: "Results", href: "/results" },
  { name: "Colleges", href: "/colleges" },
  { name: "Resources", href: "/resources" },
  { name: "About Us", href: "https://theskypedia.com/about-us" },
  { name: "Contact", href: "/contact" },
];

// Resource links for students
const resourceLinks: FooterLink[] = [
  { name: "CGPA Calculator", href: "/cgpa-calculator" },
  { name: "Syllabus", href: "/syllabus" },
  { name: "Question Papers", href: "/previous-question-papers" },
  { name: "Credit Eligibility", href: "/credit-eligibility-check" },
  { name: "Academic Calendar", href: "/calendar" },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t-4 border-[#1C61E7]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1C61E7]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#21C15E]/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-16">
          {/* Column 1: About */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#1C61E7] to-[#21C15E] bg-clip-text text-transparent mb-3">
                THE SKYPEDIA
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Empowering JNTUH students with instant access to results, academic resources, and powerful calculation tools.
              </p>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#1C61E7] dark:hover:bg-[#1C61E7] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1C61E7]/25"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} (opens in a new tab)`}
                >
                  <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#1C61E7] rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-600 hover:text-[#1C61E7] dark:text-gray-400 dark:hover:text-[#1C61E7] text-sm transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#21C15E] rounded-full" />
              Student Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-600 hover:text-[#21C15E] dark:text-gray-400 dark:hover:text-[#21C15E] text-sm transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#1C61E7] rounded-full" />
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <a
                  href="mailto:info@theskypedia.com"
                  className="flex items-start hover:text-[#1C61E7] transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1C61E7]/10 group-hover:bg-[#1C61E7] flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-200">
                    <Mail className="h-4 w-4 text-[#1C61E7] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Email</p>
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                      info@theskypedia.com
                    </span>
                  </div>
                </a>
              </li>
              <li className="group">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#21C15E]/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPin className="h-4 w-4 text-[#21C15E]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Location</p>
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                      Hyderabad, Telangana
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="relative bg-gradient-to-r from-[#1C61E7]/5 via-[#21C15E]/5 to-[#1C61E7]/5 px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Mail className="w-4 h-4 text-[#1C61E7] mr-2" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Stay Updated</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Get Latest Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-xl mx-auto">
              Subscribe to receive notifications about new results, resources, and features directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-5 py-3 w-full sm:flex-1 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="group px-6 py-3 bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#1C61E7]/25 hover:shadow-xl hover:shadow-[#1C61E7]/30 hover:scale-105"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t-2 border-gray-200 dark:border-gray-800 px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>&copy; {new Date().getFullYear()} THE SKYPEDIA. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#21C15E] fill-[#21C15E] animate-pulse" />
              <span>for JNTUH Students</span>
            </div>
            {/* <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-[#1C61E7] dark:text-gray-400 dark:hover:text-[#1C61E7] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-[#1C61E7] dark:text-gray-400 dark:hover:text-[#1C61E7] transition-colors"
              >
                Terms of Service
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;