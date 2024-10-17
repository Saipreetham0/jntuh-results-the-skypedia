/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // pwa: {
  //   dest: "public",
  //   disable: process.env.NODE_ENV === "development",
  // },
  images: {
    domains: [
      "www.gstatic.com",
      "images.unsplash.com",
      "www.facebook.com",
      "studentservices.jntuh.ac.in",
      "pagead2.googlesyndication.com",
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://www.google-analytics.com https://www.googletagservices.com https://tpc.googlesyndication.com https://www.google.com https://www.gstatic.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
