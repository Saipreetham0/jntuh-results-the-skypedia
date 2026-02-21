'use client';

import React, { useEffect, useRef } from 'react';
import { AD_SLOTS } from '@/config/adSlots';

interface TableBannerProps {
  adSlot: string;
  adClient?: string;
}

const TableBanner: React.FC<TableBannerProps> = ({
  adSlot,
  adClient = AD_SLOTS.PUBLISHER_ID,
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
  }, [adSlot]);

  return (
    <div className="ad-container w-full min-w-[250px]">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', width: '100%' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      />
    </div>
  );
};

export default TableBanner;