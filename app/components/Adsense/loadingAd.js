// components/LoadingAd.js
import React, { useEffect } from "react";

const LoadingAd = ({ adSlot }) => {
  // useEffect(() => {
  //   // (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, []);

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Error loading Google AdSense ads:", error);
    }
  }, []);

  return (
    <div className="ads-container ">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4870864326886980"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default LoadingAd;
