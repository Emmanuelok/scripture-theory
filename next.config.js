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
// - Neural voice (Kokoro / onnxruntime-web, in-browser TTS):
//     · 'wasm-unsafe-eval' lets the browser compile the WebAssembly runtime.
//       (dev already grants the broader 'unsafe-eval' for Turbopack HMR.)
//     · The onnxruntime-web runtime (its `.mjs` glue + `.wasm` binary) is
//       self-hosted at /ort (committed under public/ort), so 'self' covers both
//       — no third-party script host. connect to huggingface.co (+ its CDN/Xet
//       subdomains) fetches the model weights + voices once.
//     · media/worker blob: — generated audio plays from blob: URLs.
// - dev also needs 'unsafe-eval' and ws: for Turbopack HMR.
const hfModelHosts = "https://huggingface.co https://*.huggingface.co https://*.hf.co";

// Pre-generated Bible audio is served from object storage (R2 / CDN). Allow that
// origin so the <audio> element can play it. Driven by config, so it adapts to
// whatever base URL is set (an R2 pub-*.r2.dev URL, a custom domain, etc.).
let audioOrigin = "";
try {
  const b = process.env.NEXT_PUBLIC_BIBLE_AUDIO_BASE_URL;
  if (b) audioOrigin = new URL(b).origin;
} catch {
  /* ignore a malformed value */
}
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://flagcdn.com https://cdn.jsdelivr.net https://upload.wikimedia.org",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' https://*.supabase.co wss://*.supabase.co ${hfModelHosts}${audioOrigin ? " " + audioOrigin : ""}${isDev ? " ws: http://localhost:*" : ""}`,
  `media-src 'self' data: blob:${audioOrigin ? " " + audioOrigin : ""}`,
  "manifest-src 'self'",
  "worker-src 'self' blob:",
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
  // Next 16 builds with Turbopack by default. kokoro-js imports a few Node
  // built-ins at module scope that are only reached on its Node code path; in
  // the browser bundle we alias them to an empty stub so the graph resolves.
  turbopack: {
    resolveAlias: {
      fs: { browser: "./lib/tts/node-stub.js" },
      "fs/promises": { browser: "./lib/tts/node-stub.js" },
      path: { browser: "./lib/tts/node-stub.js" },
    },
  },
  // Kept for parity when building with the legacy `--webpack` builder.
  webpack: (config, { isServer }) => {
    // kokoro-js (and transformers.js) reference Node built-ins that only matter
    // in a Node runtime. In the browser bundle they're never reached (we use
    // the web/wasm path), so map them to empty modules to keep the build clean.
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        "fs/promises": false,
        path: false,
        crypto: false,
        "onnxruntime-node": false,
        sharp: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
