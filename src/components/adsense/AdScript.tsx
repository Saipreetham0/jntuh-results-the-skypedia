'use client';

import { useEffect } from 'react';
import { AD_SLOTS } from '@/config/adSlots';

const AdScript = () => {
  useEffect(() => {
    if (document.getElementById('adsbygoogle-init')) return;
    const script = document.createElement('script');
    script.id = 'adsbygoogle-init';
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_SLOTS.PUBLISHER_ID}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
};

export default AdScript;
