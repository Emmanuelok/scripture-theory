import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchChapterResultFromApi,
  type BibleFetchResult,
} from "@/lib/bible-fetch";

const ORIGINAL_ESV_API_KEY = process.env.ESV_API_KEY;

function publicChapter({
  identifier = "web",
  bookId = "JUD",
  chapter = 1,
}: {
  identifier?: string;
  bookId?: string;
  chapter?: number;
} = {}) {
  return {
    translation: { identifier },
    verses: [
      {
        book_id: bookId,
        chapter,
        verse: 1,
        text: "Jude, a servant of Jesus Christ.\n",
      },
      {
        book_id: bookId,
        chapter,
        verse: 2,
        text: "Mercy, peace, and love be multiplied.\n",
      },
    ],
  };
}

function expectFailure(result: BibleFetchResult, code: string) {
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.error.code).toBe(code);
}

afterEach(() => {
  vi.unstubAllGlobals();
  if (ORIGINAL_ESV_API_KEY === undefined) delete process.env.ESV_API_KEY;
  else process.env.ESV_API_KEY = ORIGINAL_ESV_API_KEY;
});

describe("public-domain Bible provider", () => {
  it("uses the structured USFM endpoint for an entire single-chapter book", async () => {
    let requestedInput: string | URL | Request | undefined;
    let requestedInit: RequestInit | undefined;
    const fetchMock = vi.fn(
      async (input: string | URL | Request, init?: RequestInit) => {
        requestedInput = input;
        requestedInit = init;
        return new Response(JSON.stringify(publicChapter()), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchChapterResultFromApi("WEB", "jude", 1);
    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(requestedInput).toBe("https://bible-api.com/data/web/JUD/1");
    expect(requestedInit).toMatchObject({
      next: { revalidate: 86_400, tags: ["bible:WEB:jude:1"] },
    });
  });

  it("rejects a book outside a translation's verified coverage before fetching", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchChapterResultFromApi("CHEROKEE", "genesis", 1);
    expectFailure(result, "UNSUPPORTED_BOOK");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects mismatched provider identity instead of serving the wrong text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify(publicChapter({ identifier: "kjv" })), {
            status: 200,
          }),
      ),
    );
    expectFailure(
      await fetchChapterResultFromApi("WEB", "jude", 1),
      "INVALID_UPSTREAM_RESPONSE",
    );
  });

  it("preserves upstream throttling as a retryable typed error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("rate limited", {
            status: 429,
            headers: { "Retry-After": "30" },
          }),
      ),
    );
    const result = await fetchChapterResultFromApi("WEB", "jude", 1);
    expectFailure(result, "UPSTREAM_RATE_LIMITED");
    if (!result.ok) {
      expect(result.error.retryable).toBe(true);
      expect(result.error.retryAfterSec).toBe(30);
    }
  });
});

describe("Crossway ESV provider", () => {
  it("performs no request when the server token is missing", async () => {
    delete process.env.ESV_API_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expectFailure(
      await fetchChapterResultFromApi("ESV", "john", 3),
      "MISSING_API_KEY",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the token server-side and explicitly disables storage", async () => {
    process.env.ESV_API_KEY = "test-token";
    let requestedInit: RequestInit | undefined;
    const fetchMock = vi.fn(
      async (_input: string | URL | Request, init?: RequestInit) => {
        requestedInit = init;
        return new Response(
          JSON.stringify({
            passages: [
              "[1] In the beginning was the Word.\n[2] He was in the beginning with God.",
            ],
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchChapterResultFromApi("ESV", "john", 1);
    expect(result.ok).toBe(true);
    expect(requestedInit).toMatchObject({
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: "Token test-token",
      },
    });
    expect(requestedInit).not.toHaveProperty("next");
  });
});
