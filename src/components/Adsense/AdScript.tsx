'use client';

import Script from 'next/script';

interface AdScriptProps {
  publisherId?: string;
}

const AdScript: React.FC<AdScriptProps> = ({
  publisherId = 'ca-pub-4870864326886980',
}) => {
  return (
    <>
      <Script
        id="adsbygoogle-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        strategy="afterInteractive"
      />
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "${publisherId}",
                enable_page_level_ads: true
              });
            } catch (e) {
              console.error('AdSense error:', e);
            }
          `,
        }}
      />
    </>
  );
};

export default AdScript;
