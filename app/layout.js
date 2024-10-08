import "../app/styles/globals.css";
import Header from "./components/Header";
// import Head from "next/head";
import Script from "next/script";
import Providers from "./providers";
import Navbar from "./components/NavBar/navBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Jntuh Results",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="w6urUAImoYyrv-5UIio0rfpmxsgVLwTlDg6KxWyeV_o"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4870864326886980"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
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
        <script type="text/javascript">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "n6vruy6vlg");
  `}
        </script>
      </head>
      <Header />
      <body suppressHydrationWarning={true}>
        <Providers>
          {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          <Navbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
    // </ClerkProvider>
  );
}
