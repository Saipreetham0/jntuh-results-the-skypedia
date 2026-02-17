'use client';

import { useEffect } from 'react';
import { AD_SLOTS } from '@/config/adSlots';

const AdScript = () => {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.getElementById('adsbygoogle-init')) return;

    const script = document.createElement('script');
    script.id = 'adsbygoogle-init';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_SLOTS.PUBLISHER_ID}`;

    // Add to head to ensure early loading
    document.head.appendChild(script);
  }, []);

  return null;
};

export default AdScript;
