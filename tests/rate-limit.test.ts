import { describe, it, expect } from "vitest";
import { rateLimit, clientIp } from "@/lib/rate-limit";

describe("rate-limit", () => {
  it("allows up to the limit then blocks with a retry hint", () => {
    const key = `test-${Math.random()}`;
    const limit = 3;
    const window = 60_000;
    expect(rateLimit(key, limit, window).ok).toBe(true);
    expect(rateLimit(key, limit, window).ok).toBe(true);
    const third = rateLimit(key, limit, window);
    expect(third.ok).toBe(true);
    expect(third.remaining).toBe(0);
    const blocked = rateLimit(key, limit, window);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("tracks buckets independently per key", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, 1, 60_000);
    expect(rateLimit(a, 1, 60_000).ok).toBe(false);
    expect(rateLimit(b, 1, 60_000).ok).toBe(true);
  });

  it("clientIp reads the first x-forwarded-for hop", () => {
    const req = new Request("https://example.com", {
      headers: { "x-forwarded-for": "203.0.113.9, 10.0.0.1" },
    });
    expect(clientIp(req)).toBe("203.0.113.9");
  });

  it("clientIp falls back to 'unknown' with no proxy headers", () => {
    expect(clientIp(new Request("https://example.com"))).toBe("unknown");
  });
});
