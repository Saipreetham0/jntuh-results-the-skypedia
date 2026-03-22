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
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !adRef.current) return;

    if (
      adRef.current.getAttribute('data-adsbygoogle-status') ||
      adRef.current.getAttribute('data-ad-status')
    ) {
      pushed.current = true;
      return;
    }

    const doPush = () => {
      if (pushed.current) return;
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e: any) {
        console.error(`TableBanner (slot ${adSlot}):`, e?.message ?? e);
      }
    };

    if (adRef.current.offsetWidth > 0) {
      doPush();
      return;
    }

    const observer = new ResizeObserver(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        observer.disconnect();
        doPush();
      }
    });
    observer.observe(adRef.current);

    return () => observer.disconnect();
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
