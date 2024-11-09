
"use client";
"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import AdBanner from '@/components/Adsense/AdBanner';

// interface AdBannerProps {
//   adSlot: string;
//   adFormat: "horizontal" | "vertical";
//   fullWidthResponsive?: boolean;
// }

// const AdBanner = ({ adSlot, adFormat, fullWidthResponsive = false }: AdBannerProps) => {
//   return (
//     <div className={`ad-container my-4 ${fullWidthResponsive ? 'w-full' : ''}`}>
//       <div className={`mx-auto ${adFormat === 'horizontal' ? 'h-[90px]' : 'h-[600px]'} bg-gray-100 rounded-lg flex items-center justify-center`}>
//         <div className="text-gray-400 text-sm">Advertisement {adSlot}</div>
//       </div>
//     </div>
//   );
// };

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
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Top Advertisement */}
      <AdBanner
        adSlot="5967398818"
        adFormat="horizontal"
        fullWidthResponsive={true}
      />

      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            JNTUH Results
          </h1>
          <p className="text-gray-600">
            Enter your hall ticket number to view your results
          </p>
        </div>

        {/* Middle Advertisement */}
        <AdBanner
          adSlot="4312571525"
          adFormat="horizontal"
          fullWidthResponsive={true}
        />

        <Card className="my-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="hallTicket"
                  className="text-sm font-medium text-gray-700"
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
                      className="pl-10 uppercase"
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
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Example: 21U81A0528</p>
            </div>
          </CardContent>
        </Card>

        {/* Side Advertisement */}
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2">
          <AdBanner
            adSlot="7365503095"
            adFormat="vertical"
          />
        </div>

        {/* Bottom Advertisement */}
        <AdBanner
          adSlot="8113957727"
          adFormat="horizontal"
          fullWidthResponsive={true}
        />
      </div>
    </div>
  );
};

export default ResultsSearch;