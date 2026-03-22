import Script from 'next/script';
import { AD_SLOTS } from '@/config/adSlots';

const AdScript = () => (
  <Script
    id="adsbygoogle-init"
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_SLOTS.PUBLISHER_ID}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
);

export default AdScript;
