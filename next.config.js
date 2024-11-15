import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // disable:false
  buildExcludes: [/middleware-manifest.json$/], // Exclude middleware manifest

});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

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
    // forceSwcTransforms: true,
    turbopack: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },

  headers: async () => {
    return [
      {
        source: "/service-worker.js",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
};

// module.exports = nextConfig;
export default withPWA(nextConfig);
