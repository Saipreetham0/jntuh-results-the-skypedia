// components/Adsense/AdScript.tsx
'use client';

import Script from 'next/script';

const AdScript: React.FC = () => (
  <Script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID"
    crossOrigin="anonymous"
    strategy="lazyOnload"
  />
);

export default AdScript;