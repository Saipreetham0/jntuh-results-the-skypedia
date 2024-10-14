/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Script from "next/script";


export const metadata: Metadata = {
  title: "JNTUH RESULTS",
  description:
    "You can find the Results Of Your Entire UG & PG Courses (JNTUH).",
  openGraph: {
    title: "JNTUH RESULTS",
    description:
      "You can find the Results Of Your Entire UG & PG Courses (JNTUH).",
    url: "https://jntuhresults.theskypedia.com/",
    siteName: "JNTUH RESULTS",
    images: [
      {
        url: "https://jntuhresults.theskypedia.com/homepage.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JNTUH RESULTS",
    description:
      "You can find the Results Of Your Entire UG & PG Courses (JNTUH).",
    images: ["https://jntuhresults.theskypedia.com/homepage.jpg"],
  },
  robots: "index, follow",
  authors: [{ name: "The Skypedia" }, { name: "Mohd Moiz Uddin" }],
  keywords: ["jntuh Results", "results jntuh"],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  verification: {
    google: "w6urUAImoYyrv-5UIio0rfpmxsgVLwTlDg6KxWyeV_o",
  },
  alternates: {
    canonical: "https://jntuhresults.theskypedia.com/",
  },
};

const Header: React.FC = () => {
  return (
    <>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TheSkypedia",
            alternateName: "Jntuh Theskypedia",
            url: "https://jntuhresults.theskypedia.com/",
            logo: "https://theskypedia.com/wp-content/uploads/2022/06/cropped-theskypedia.com-logo.png",
            sameAs: [
              "https://www.linkedin.com/company/theskypedia/",
              "https://www.instagram.com/theskypedia",
              "https://theskypedia.com/",
              "https://www.youtube.com/@theskypedia",
            ],
          }),
        }}
      />



      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "n6vruy6vlg");
          `,
        }}
      />

      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '27624496020475115');
            fbq('track', 'PageView');
          `,
        }}
      />

   
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=27624496020475115&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N1FJ0X03GL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N1FJ0X03GL');
        `}
      </Script>

      {/* <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4870864326886980"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      /> */}
    </>
  );
};

export default Header;
