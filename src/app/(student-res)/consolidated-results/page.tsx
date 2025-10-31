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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header Section */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center mb-2">
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              JNTUH <span className="text-indigo-600 dark:text-indigo-400">Results</span>
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Check your consolidated academic results
          </p>
        </div>

        {/* Top Ad Banner */}
        <ResponsiveAd
          adSlot={AD_SLOTS.CONSOLIDATED.TOP_BANNER}
          format="horizontal"
          className="mb-6"
        />

        {/* Search Card */}
        <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Consolidated Results
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Enter your hall ticket number to view your complete results
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="hallTicket"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Hall Ticket Number
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="hallTicket"
                      type="text"
                      value={hallTicket}
                      onChange={(e) => {
                        setHallTicket(e.target.value.toUpperCase());
                        setError('');
                      }}
                      placeholder="Enter hall ticket number..."
                      className="pl-10 uppercase bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      maxLength={10}
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Searching</span>
                      </span>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="w-full">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="font-medium mb-1">Example Format:</p>
                <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 px-3 py-2 font-mono">
                20J25A0201
                </div>
                {/* <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Format: YY[Branch Code]YYAXXX where YY = Year, A = College Code, XXX = Number
                </p> */}
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