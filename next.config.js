/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // flagcdn.com — free, public-domain country flag SVGs (no API key).
      { protocol: "https", hostname: "flagcdn.com" },
    ],
  },
};

module.exports = nextConfig;
