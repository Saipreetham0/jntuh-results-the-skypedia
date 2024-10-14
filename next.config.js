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
      "pagead2.googlesyndication.com"
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },

};

module.exports = nextConfig;