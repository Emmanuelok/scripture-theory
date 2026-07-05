import { describe, it, expect, afterEach } from "vitest";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

const realFetch = global.fetch;
afterEach(() => {
  global.fetch = realFetch;
});

describe("fetchWithTimeout", () => {
  it("aborts a hung request after timeoutMs", async () => {
    // A fetch that never resolves unless its signal aborts.
    global.fetch = ((_input: unknown, init: { signal: AbortSignal }) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () =>
          reject(init.signal.reason ?? new Error("aborted")),
        );
      })) as unknown as typeof fetch;

    await expect(fetchWithTimeout("https://example.com", { timeoutMs: 20 })).rejects.toBeTruthy();
  });

  it("returns a fast successful response untouched", async () => {
    global.fetch = (async () => new Response("ok")) as unknown as typeof fetch;
    const res = await fetchWithTimeout("https://example.com", { timeoutMs: 1000 });
    expect(await res.text()).toBe("ok");
  });
});
