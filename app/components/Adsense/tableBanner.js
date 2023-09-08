import React, { useEffect } from "react";

const TableBanner = ({ adSlot }) => {
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


        // style="display:block; text-align:center;"
        style={{ display: "block"  }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4870864326886980"
        data-ad-slot="8279758421"
      ></ins>
    </div>
  );
};

export default TableBanner;
