import React, { useEffect } from "react";

const AdBanner = ({ adSlot }) => {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Error loading Google AdSense ads:", error);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        // style={{ display: "block" }}
        // style={{ display: 'inline-block', width: '728px', height: '90px' }}
        style={{ display: "block" }}
        data-ad-client="ca-pub-4870864326886980"
        data-ad-slot={adSlot}
        data-ad-format="auto"
      ></ins>
    </div>
  );
};

export default AdBanner;
