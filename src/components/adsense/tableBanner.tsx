'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || adLoaded || typeof window === 'undefined' || !adRef.current) return;

    try {
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      if (
        adRef.current.getAttribute('data-adsbygoogle-status') ||
        adRef.current.getAttribute('data-ad-status') ||
        adRef.current.children.length > 0
      ) {
        setAdLoaded(true);
        return;
      }

      window.adsbygoogle.push({});
      setAdLoaded(true);
    } catch (error) {
      console.error('Error loading Google AdSense ad:', error);
    }
  }, [isMounted, adLoaded, adSlot]);

  if (!isMounted) return null;

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