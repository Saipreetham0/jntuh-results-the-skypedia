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
    domains: ["www.facebook.com"], // Add Facebook as an allowed domain
  },

  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
