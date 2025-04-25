// import React from 'react';
// import AdBanner from "../Adsense/AdBanner";

// const Hero: React.FC = () => {
//   const handleWhatsAppContact = () => {
//     window.open("https://api.whatsapp.com/send?phone=919550421866", "_blank");
//   };

//   const handleWebsiteVisit = () => {
//     window.open(
//       "https://kspelectronics.in/?utm_source=website&utm_medium=button&utm_campaign=jntuh_results",
//       "_blank"
//     );
//   };

//   return (
//     <div className="py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-gray-900 dark:text-white mb-6">
//           Instant Access to
//           <br />
//           <span className="relative inline-block mt-2">
//             <span className="relative z-10 text-blue-600">JNTUH Results</span>
//             <svg
//               aria-hidden="true"
//               viewBox="0 0 418 42"
//               className="absolute top-3/4 left-0 h-[0.58em] w-full fill-blue-300/70"
//               preserveAspectRatio="none"
//             >
//               <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
//             </svg>
//           </span>
//         </h1>
//         <p className="mt-6 max-w-2xl mx-auto text-xl text-center text-gray-600 dark:text-gray-300">
//           Get quick and easy access to your JNTUH (Jawaharlal Nehru Technological
//           University Hyderabad) exam results on The Skypedia.
//         </p>

//         <div className="mt-12 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
//           <div className="p-6 sm:p-10">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               Explore IoT Kit and ML Projects for College Students
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//               Unlock the world of innovation and technology!
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <button
//                 className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center"
//                 onClick={handleWhatsAppContact}
//               >
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
//                 </svg>
//                 Contact via WhatsApp
//               </button>
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center"
//                 onClick={handleWebsiteVisit}
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
//                 </svg>
//                 Visit Website
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12">
//           <AdBanner
//             adSlot="5967398818"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import Link from "next/link";
import { MessageSquare, Globe } from "lucide-react";
import AdBanner from "../Adsense/AdBanner";


// interface AdBannerProps {
//   adSlot: string;
// }

// const AdBanner: React.FC<AdBannerProps> = ({ adSlot }) => {
//   // Implementation remains the same or use your actual AdBanner component
//   return (
//     <div className="w-full py-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
//       Ad Banner Slot: {adSlot}
//     </div>
//   );
// };

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
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-5xl mx-auto">
        {/* Hero title with animation */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Instant Access to{" "}
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-blue-600 dark:text-blue-400">
                JNTUH Results
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-3/4 left-0 h-12 w-full fill-blue-300 dark:fill-blue-500 opacity-70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Get quick and easy access to your Jawaharlal Nehru Technological
            University Hyderabad exam results on The Skypedia.
          </p>
        </div>

        {/* Call to action card with subtle hover effects */}
        <div className="mt-12 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Explore IoT Kit and ML Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Unlock the world of innovation and technology for your college
              projects!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center justify-center py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                aria-label="Contact via WhatsApp"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Contact via WhatsApp</span>
              </button>

              <button
                onClick={handleWebsiteVisit}
                className="flex items-center justify-center py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                aria-label="Visit Website"
              >
                <Globe className="w-5 h-5 mr-2" />
                <span>Visit Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results search box - a new feature for better UX */}
        {/* <div className="mt-12 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Check Your Results
          </h2>

          <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="hallTicket" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hall Ticket Number
              </label>
              <input
                type="text"
                id="hallTicket"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your hall ticket number"
              />
            </div>

            <button
              type="submit"
              className="mt-6 sm:mt-0 sm:self-end px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Get Results
            </button>
          </form>
        </div> */}

        {/* Ad banner */}
        {/* <div className="mt-12">
          <AdBanner adSlot="5967398818" />
        </div> */}

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
