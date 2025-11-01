// "use client";

// import React, { useState } from 'react';
// import { Search, AlertCircle, Moon, Sun } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useRouter } from 'next/navigation';
// import AdBanner from '@/components/Adsense/AdBanner';

// const ResultsSearch = () => {
//   const [hallTicket, setHallTicket] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const router = useRouter();

//   const validateHallTicket = (htno: string) => {
//     const pattern = /^[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{4}$/;
//     return pattern.test(htno);
//   };

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!hallTicket.trim()) {
//       setError('Please enter a hall ticket number');
//       return;
//     }

//     if (!validateHallTicket(hallTicket.trim().toUpperCase())) {
//       setError('Please enter a valid hall ticket number (e.g., 21U81A0528)');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       router.push(`/consolidated-results/${hallTicket.trim().toUpperCase()}`);
//     } catch (err) {
//       setError('Unable to fetch results. Please try again.');
//       setIsLoading(false);
//     }
//   };



//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">


//       {/* Top Ad Banner */}
//       {/* <AdBanner
//         adSlot="5967398818"
//         adFormat="horizontal"
//         fullWidthResponsive={true}
//       /> */}

//       <div className="container mx-auto px-4 max-w-2xl">
//         <div className="space-y-6">
//           {/* Header Section */}
//           <div className="text-center space-y-2">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
//               JNTUH Results Portal
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-lg">
//               Quick access to your academic performance
//             </p>
//           </div>

//           {/* Middle Ad Banner */}
//           <AdBanner
//             adSlot="4312571525"
//             adFormat="horizontal"
//             fullWidthResponsive={true}
//           />

//           {/* Search Card */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle>Results Search</CardTitle>
//               <CardDescription>
//                 Enter your hall ticket number to view your consolidated results
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSearch} className="space-y-4">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="hallTicket"
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     Hall Ticket Number
//                   </label>
//                   <div className="flex space-x-2">
//                     <div className="relative flex-1">
//                       <Input
//                         id="hallTicket"
//                         type="text"
//                         value={hallTicket}
//                         onChange={(e) => {
//                           setHallTicket(e.target.value.toUpperCase());
//                           setError('');
//                         }}
//                         placeholder="Enter hall ticket number..."
//                         className="pl-10 uppercase"
//                         maxLength={10}
//                       />
//                       <Search
//                         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                         size={18}
//                       />
//                     </div>
//                     <Button
//                       type="submit"
//                       disabled={isLoading}
//                       className="min-w-[100px]"
//                     >
//                       {isLoading ? (
//                         <span className="flex items-center gap-2">
//                           <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
//                           Searching
//                         </span>
//                       ) : (
//                         'Search'
//                       )}
//                     </Button>
//                   </div>

//                   {error && (
//                     <Alert variant="destructive">
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertDescription>{error}</AlertDescription>
//                     </Alert>
//                   )}

//                   <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
//                     <p>Example format: 20J25A0201</p>
//                   </div>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Side Advertisement */}
//         <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2">
//           <AdBanner
//             adSlot="7365503095"
//             adFormat="vertical"
//           />
//         </div>

//         {/* Bottom Advertisement */}
//         <div className="mt-6">
//           <AdBanner
//             adSlot="8113957727"
//             adFormat="horizontal"
//             fullWidthResponsive={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsSearch;



"use client";

import React, { useState } from 'react';
import { Search, AlertCircle, Loader2, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { ResponsiveAd, InContentAd } from '@/components/Adsense';
import AD_SLOTS from '@/config/adSlots';

const ResultsSearch = () => {
  const [hallTicket, setHallTicket] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const validateHallTicket = (htno: string) => {
    const pattern = /^[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{4}$/;
    return pattern.test(htno);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!hallTicket.trim()) {
      setError('Please enter a hall ticket number');
      return;
    }

    if (!validateHallTicket(hallTicket.trim().toUpperCase())) {
      setError('Please enter a valid hall ticket number (e.g., 21U81A0528)');
      return;
    }

    setIsLoading(true);
    try {
      router.push(`/consolidated-results/${hallTicket.trim().toUpperCase()}`);
    } catch (err) {
      setError('Unable to fetch results. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 rounded-xl bg-[#1C61E7] flex items-center justify-center mr-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Consolidated Results
              </h1>
              <p className="text-sm text-[#1C61E7] dark:text-[#1C61E7] font-semibold mt-0.5">JNTUH Results Portal</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base font-medium max-w-2xl mx-auto">
            Access your complete academic performance with detailed semester-wise breakdown
          </p>
        </div>

        {/* Top Ad Banner */}
        <ResponsiveAd
          adSlot={AD_SLOTS.CONSOLIDATED.TOP_BANNER}
          format="horizontal"
          className="mb-6"
        />

        {/* Search Card */}
        <Card className="shadow-xl border-l-4 border-l-[#1C61E7] bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-slide-up">
          <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700 pb-6 pt-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-4 bg-[#1C61E7] rounded-xl shadow-lg">
                <Search className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Find Your Results
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base mt-1.5 font-medium">
                  Enter your hall ticket number to view consolidated results
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8 pb-6">
            <form onSubmit={handleSearch} className="space-y-5">
              <div className="space-y-3">
                <label
                  htmlFor="hallTicket"
                  className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide"
                >
                  Hall Ticket Number
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search size={22} />
                    </div>
                    <Input
                      id="hallTicket"
                      type="text"
                      value={hallTicket}
                      onChange={(e) => {
                        setHallTicket(e.target.value.toUpperCase());
                        setError('');
                      }}
                      placeholder="Enter Hall Ticket Number"
                      className="pl-12 uppercase bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-[#1C61E7] focus:ring-4 focus:ring-[#1C61E7]/20 h-14 text-lg font-bold rounded-xl shadow-md transition-all"
                      maxLength={10}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white h-14 px-10 font-bold text-base rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Searching...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        <span>Search</span>
                      </span>
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-3 border-2">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription className="font-semibold">{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t-2 border-gray-200 dark:border-gray-700 px-8 py-7">
            <div className="w-full space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#1C61E7]"></div>
                  <p className="font-bold text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wide">Example Format</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#1C61E7] px-6 py-4 font-mono text-2xl font-bold text-[#1C61E7] dark:text-[#1C61E7] shadow-lg text-center">
                  20J25A0201
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                <AlertCircle className="h-5 w-5 mt-0.5 text-[#1C61E7] flex-shrink-0" />
                <p className="font-medium">Enter your 10-digit JNTUH hall ticket number exactly as it appears on your admit card</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Inline Ad */}
        <InContentAd
          adSlot={AD_SLOTS.CONSOLIDATED.INLINE_1}
          className="my-6"
        />

        {/* Bottom Advertisement */}
        <ResponsiveAd
          adSlot={AD_SLOTS.CONSOLIDATED.BOTTOM_RECTANGLE}
          format="auto"
          className="mt-6"
        />
      </div>
    </div>
  );
};

export default ResultsSearch;