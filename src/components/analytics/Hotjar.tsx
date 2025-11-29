"use client";

import Script from "next/script";

interface HotjarProps {
  siteId: string;
  hotjarVersion?: number;
}

/**
 * Hotjar Analytics Component
 *
 * @param siteId - Your Hotjar Site ID
 * @param hotjarVersion - Hotjar script version (default: 6)
 *
 * Features:
 * - Heatmaps
 * - Session recordings
 * - Conversion funnels
 * - Form analysis
 * - Feedback polls
 * - Surveys
 */
export default function Hotjar({ siteId, hotjarVersion = 6 }: HotjarProps) {
  if (!siteId || siteId === "YOUR_HOTJAR_SITE_ID") {
    console.warn("Hotjar: No valid site ID provided");
    return null;
  }

  return (
    <Script
      id="hotjar"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${siteId},hjsv:${hotjarVersion}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}
