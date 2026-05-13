"use client";

import { useEffect } from "react";

/**
 * Registers the offline service worker once, in production.
 * Silent if unsupported or blocked. Skipped in dev so HMR isn't stale.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const onLoad = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          // If a new SW is waiting, ask it to take over.
          if (reg.waiting) reg.waiting.postMessage("skipWaiting");
          reg.addEventListener("updatefound", () => {
            const sw = reg.installing;
            if (!sw) return;
            sw.addEventListener("statechange", () => {
              if (sw.state === "installed" && navigator.serviceWorker.controller) {
                sw.postMessage("skipWaiting");
              }
            });
          });
        })
        .catch(() => {
          /* registration failures are non-fatal */
        });
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
  }, []);

  return null;
}
