import Script from 'next/script';

interface AdScriptProps {
  publisherId?: string;
}

const AdScript = ({
  publisherId = 'ca-pub-4870864326886980',
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
