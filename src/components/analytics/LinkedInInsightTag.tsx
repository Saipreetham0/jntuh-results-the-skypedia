"use client";

import Script from "next/script";

interface LinkedInInsightTagProps {
  partnerId: string;
}

/**
 * LinkedIn Insight Tag Component
 *
 * @param partnerId - Your LinkedIn Partner ID
 *
 * Features:
 * - Conversion tracking
 * - Website demographics
 * - Retargeting
 * - Campaign optimization
 */
export default function LinkedInInsightTag({ partnerId }: LinkedInInsightTagProps) {
  if (!partnerId || partnerId === "YOUR_LINKEDIN_PARTNER_ID") {
    console.warn("LinkedInInsightTag: No valid partner ID provided");
    return null;
  }

  return (
    <>
      <Script
        id="linkedin-insight"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "${partnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
      />
      <Script
        id="linkedin-insight-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`}
        />
      </noscript>
    </>
  );
}
