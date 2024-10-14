// import React, { useEffect, useRef } from 'react';

// interface AdBannerProps {
//   adSlot: string;
//   adClient: string;
//   width?: string;
//   height?: string;
// }

// declare global {
//   interface Window {
//     adsbygoogle: any[];
//   }
// }

// const AdBanner: React.FC<AdBannerProps> = ({ adSlot, adClient, width = '728px', height = '90px' }) => {
//   const adRef = useRef<HTMLDivElement>(null);
//   const adLoaded = useRef(false);

//   useEffect(() => {
//     if (adRef.current && !adLoaded.current) {
//       try {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//         adLoaded.current = true;
//       } catch (error) {
//         console.error("Error loading Google AdSense ads:", error);
//       }
//     }
//   }, []);

//   return (
//     <div className="ad-container" ref={adRef}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: 'inline-block', width, height }}
//         data-ad-client={adClient}
//         data-ad-slot={adSlot}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       />
//     </div>
//   );
// };

// export default AdBanner;



// components/Adsense/AdBanner.tsx
'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current && !adLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      } catch (error) {
        console.error('Error loading Google AdSense ad:', error);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4870864326886980"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  );
};



export default AdBanner;