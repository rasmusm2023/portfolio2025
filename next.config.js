/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
