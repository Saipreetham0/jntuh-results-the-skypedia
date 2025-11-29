"use client";

import Script from "next/script";

interface TwitterPixelProps {
  pixelId: string;
}

/**
 * Twitter (X) Pixel Component
 *
 * @param pixelId - Your Twitter Pixel ID
 *
 * Features:
 * - Conversion tracking
 * - Event tracking
 * - Retargeting
 * - Website tag analytics
 */
export default function TwitterPixel({ pixelId }: TwitterPixelProps) {
  if (!pixelId || pixelId === "YOUR_TWITTER_PIXEL_ID") {
    console.warn("TwitterPixel: No valid pixel ID provided");
    return null;
  }

  return (
    <Script
      id="twitter-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','${pixelId}');
        `,
      }}
    />
  );
}
