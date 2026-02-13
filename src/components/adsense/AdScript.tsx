import Script from 'next/script';
import { AD_SLOTS } from '@/config/adSlots';

interface AdScriptProps {
  publisherId?: string;
}

const AdScript = ({
  publisherId = AD_SLOTS.PUBLISHER_ID,
}: AdScriptProps) => {
  return (
    <Script
      id="adsbygoogle-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default AdScript;
