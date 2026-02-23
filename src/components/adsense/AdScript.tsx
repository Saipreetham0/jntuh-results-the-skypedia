'use client';

import Script from 'next/script';
import { AD_SLOTS } from '@/config/adSlots';

const AdScript = () => {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_SLOTS.PUBLISHER_ID}`}
    />
  );
};

export default AdScript;
