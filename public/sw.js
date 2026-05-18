// Scripture Theory — service worker
//
// Offline support so the persecuted Church, the global south, and anyone on
// a spotty connection can still open today's chapter, the Daily Office,
// the Lord's Prayer, and their own data.
//
// Strategy:
//   - HTML navigations: network-first → cache → offline fallback
//   - Bible API: cache-first, revalidate in background (immutable text)
//   - Audio API: cache-first, opaque-safe (so MP3 plays offline once heard)
//   - Static assets: cache-first
//   - Everything else (cross-origin, POST): pass through

const VERSION = "v3";
const CORE_CACHE = `st-core-${VERSION}`;
const PAGE_CACHE = `st-pages-${VERSION}`;
const BIBLE_CACHE = `st-bible-${VERSION}`;
const STATIC_CACHE = `st-static-${VERSION}`;

// Pre-cache the routes most likely to be needed offline.
const CORE_URLS = [
  "/",
  "/today",
  "/bible",
  "/gospel",
  "/pray",
  "/hours",
  "/me",
  "/secret-place",
  "/offline",
  "/icon.svg",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CORE_CACHE);
      // Pre-cache opportunistically — failures here must not block install.
      await Promise.allSettled(CORE_URLS.map((u) => cache.add(u)));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const live = new Set([CORE_CACHE, PAGE_CACHE, BIBLE_CACHE, STATIC_CACHE]);
      await Promise.all(keys.filter((k) => !live.has(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function isNavigation(req) {
  return req.mode === "navigate" || (req.method === "GET" && req.headers.get("accept")?.includes("text/html"));
}

function isBibleApi(url) {
  return url.pathname.startsWith("/api/bible/");
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    url.pathname === "/icon.svg" ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".ttf") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js")
  );
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok && req.method === "GET") {
      cache.put(req, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    const cached = await cache.match(req);
    if (cached) return cached;
    // For navigations, fall back to /offline
    if (isNavigation(req)) {
      const offline = await cache.match("/offline") || await (await caches.open(CORE_CACHE)).match("/offline");
      if (offline) return offline;
    }
    return new Response("Offline — and we don't have this page cached yet.", {
      status: 503,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) {
    // Revalidate in the background (stale-while-revalidate)
    fetch(req)
      .then((r) => {
        if (r && r.ok) cache.put(req, r.clone()).catch(() => {});
      })
      .catch(() => {});
    return cached;
  }
  try {
    const fresh = await fetch(req);
    if (fresh && (fresh.ok || fresh.type === "opaque")) {
      cache.put(req, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    return new Response("Offline.", { status: 503 });
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  if (isBibleApi(url)) {
    event.respondWith(cacheFirst(req, BIBLE_CACHE));
    return;
  }
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }
  if (isNavigation(req)) {
    event.respondWith(networkFirst(req, PAGE_CACHE));
    return;
  }
  // Default: try network, fall back to cache
  event.respondWith(networkFirst(req, PAGE_CACHE));
});

// Listen for an explicit "skip waiting" trigger from the page
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
