// components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const siteName = 'Your Blog Name';
  const defaultDescription = 'Your default meta description';
  const defaultImage = '/default-image.jpg'; // Path to your default image
  const defaultUrl = 'https://jntuhresults.theskypedia.com';

  return (
    <Head>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <link rel="canonical" href={url || defaultUrl} />
    </Head>
  );
};

export default SEO;
