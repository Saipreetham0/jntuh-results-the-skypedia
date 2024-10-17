// components/Adsense/AdScript.tsx
// 'use client';

// import Script from 'next/script';

// const AdScript: React.FC = () => (
//   <Script
//     async
//     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4870864326886980"
//     crossOrigin="anonymous"
//     strategy="lazyOnload"
//   />
// );

// export default AdScript;


'use client';

import Script from 'next/script';

interface AdScriptProps {
  publisherId?: string; // Optional prop to allow different publisher IDs
}

const AdScript: React.FC<AdScriptProps> = ({
  publisherId = 'ca-pub-4870864326886980' // Your default publisher ID
}) => {
  // Initialize ads after the script loads
  const handleAdScriptLoad = () => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({
        google_ad_client: publisherId,
        enable_page_level_ads: true
      });
    } catch (error) {
      console.error('Error initializing ads:', error);
    }
  };

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={handleAdScriptLoad}
      />
    </>
  );
};

export default AdScript;