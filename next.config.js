/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy.
// - script/style 'unsafe-inline': Next's App Router streams inline bootstrap
//   scripts and the app ships one trusted static inline theme-boot script;
//   Tailwind + CSS-variable theming emit inline styles. There is no
//   user-controlled HTML/script sink in the app, so this is a bounded risk.
//   (A nonce-based CSP is the recommended next hardening step.)
// - img: self + the three whitelisted remote image hosts + data/blob.
// - connect: self + Supabase (REST over https, realtime over wss).
// - dev also needs 'unsafe-eval' and ws: for Turbopack HMR.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://flagcdn.com https://cdn.jsdelivr.net https://upload.wikimedia.org",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' https://*.supabase.co wss://*.supabase.co${isDev ? " ws: http://localhost:*" : ""}`,
  "media-src 'self' data:",
  "manifest-src 'self'",
  "worker-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Only features the app actually uses (geolocation for the church finder).
  { key: "Permissions-Policy", value: "camera=(), microphone=(), payment=(), usb=(), geolocation=(self), interest-cohort=()" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
    ];
  },
};

module.exports = nextConfig;
