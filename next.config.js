/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // pwa: {
  //   dest: "public",
  //   disable: process.env.NODE_ENV === "development",
  // },
  images: {
    domains: ["www.gstatic.com"],
    domains: ["images.unsplash.com"],
    domains: ['www.facebook.com'],
    domains: ["studentservices.jntuh.ac.in"],
  },

  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
