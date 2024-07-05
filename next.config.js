/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // pwa: {
  //   dest: "public",
  //   disable: process.env.NODE_ENV === "development",
  // },
  // images: {
  //   domains: ["www.gstatic.com", "*"],
  //   domains: ["images.unsplash.com", "*"],
  // },

  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
