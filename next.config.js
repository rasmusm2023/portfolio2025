/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "gsap",
      "@phosphor-icons/react",
      "@fortawesome/react-fontawesome",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  eslint: {
    // Warning: This allows the production build to complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // Enable preloading for better navigation performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
