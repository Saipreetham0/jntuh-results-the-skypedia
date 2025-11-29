"use client";

import Script from "next/script";

interface MicrosoftClarityProps {
  projectId: string;
}

/**
 * Microsoft Clarity Component
 *
 * @param projectId - Your Microsoft Clarity Project ID
 *
 * Features:
 * - Session recordings
 * - Heatmaps
 * - User behavior analytics
 * - Rage clicks detection
 * - Dead clicks detection
 * - Excessive scrolling detection
 */
export default function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  if (!projectId || projectId === "n6vruy6vlg") {
    console.warn("MicrosoftClarity: No valid project ID provided");
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${projectId}");
        `,
      }}
    />
  );
}
