import { NextResponse } from "next/server";
import { getBook } from "@/data/bible/canon";
import { getChapterResult } from "@/lib/bible";
import {
  translationOrder,
  translations,
  translationSupportsTestament,
  type TranslationId,
} from "@/data/bible/translations";
import { isRuntimeFetchable } from "@/lib/bible-fetch";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { translation: string; book: string; chapter: string };

function errorResponse(
  error: string,
  code: string,
  status: number,
  retryAfterSec?: number,
  retryable = status >= 500 || status === 429,
) {
  return NextResponse.json(
    { ok: false, error, code, retryable },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(retryAfterSec ? { "Retry-After": String(retryAfterSec) } : {}),
      },
    },
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const { translation, book, chapter } = await params;
  const upper = translation.toUpperCase() as TranslationId;
  if (!translationOrder.includes(upper)) {
    return errorResponse("Unknown translation", "UNKNOWN_TRANSLATION", 400);
  }

  const bookMeta = getBook(book);
  if (!bookMeta) return errorResponse("Unknown book", "UNKNOWN_BOOK", 404);

  const chapterNumber = Number(chapter);
  if (
    !Number.isInteger(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > bookMeta.chapters
  ) {
    return errorResponse("Invalid chapter", "INVALID_CHAPTER", 400);
  }

  const meta = translations[upper];
  if (
    meta.coverage !== "selected" &&
    !translationSupportsTestament(upper, bookMeta.testament)
  ) {
    return errorResponse(
      `${meta.name} does not include ${bookMeta.name}.`,
      "BOOK_NOT_IN_TRANSLATION",
      404,
    );
  }

  if (meta.provider === "crossway" && !isRuntimeFetchable(upper, book)) {
    return errorResponse(
      `${meta.name} is not configured on this deployment yet.`,
      "PROVIDER_NOT_CONFIGURED",
      503,
      undefined,
      false,
    );
  }

  if (upper === "ESV") {
    // Crossway's published ceiling is 60 requests/minute and 1,000/hour.
    // Stay below both with per-caller and best-effort per-instance guards.
    const caller = clientIp(request);
    const perIpMinute = rateLimit(`bible:esv:ip:${caller}:minute`, 12, 60_000);
    const perIpHour = rateLimit(
      `bible:esv:ip:${caller}:hour`,
      120,
      60 * 60_000,
    );
    const perInstanceMinute = rateLimit(
      "bible:esv:instance:minute",
      55,
      60_000,
    );
    const perInstanceHour = rateLimit(
      "bible:esv:instance:hour",
      900,
      60 * 60_000,
    );
    const perInstanceDay = rateLimit(
      "bible:esv:instance:day",
      4_500,
      24 * 60 * 60_000,
    );
    const blocked = [
      perIpMinute,
      perIpHour,
      perInstanceMinute,
      perInstanceHour,
      perInstanceDay,
    ].find((result) => !result.ok);
    if (blocked) {
      return errorResponse(
        "The ESV request limit has been reached. Please try again shortly.",
        "RATE_LIMITED",
        429,
        blocked.retryAfterSec,
      );
    }
  }

  const result = await getChapterResult(book, chapterNumber, upper);
  if (!result.ok) {
    const { code, retryable, retryAfterSec } = result.error;
    const selectedOnly = meta.coverage === "selected";
    const status =
      code === "INVALID_REQUEST"
        ? 400
        : code === "UNSUPPORTED_BOOK" || code === "NO_RUNTIME_SOURCE"
          ? 404
          : code === "MISSING_API_KEY"
            ? 503
            : code === "UPSTREAM_RATE_LIMITED"
              ? 429
              : code === "UPSTREAM_TIMEOUT"
                ? 504
                : 502;
    const message = selectedOnly
      ? `${meta.name} is currently available for selected passages only.`
      : code === "UPSTREAM_RATE_LIMITED"
        ? `${meta.name} is receiving too many requests. Please try again shortly.`
        : code === "UPSTREAM_TIMEOUT"
          ? `${meta.name} took too long to respond. Please try again.`
          : code === "MISSING_API_KEY"
            ? `${meta.name} is not configured on this deployment yet.`
            : `${meta.name} is temporarily unavailable for this chapter.`;
    return NextResponse.json(
      { ok: false, error: message, code, retryable },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          ...(retryAfterSec ? { "Retry-After": String(retryAfterSec) } : {}),
        },
      },
    );
  }

  // Public-domain chapters may be cached. Licensed ESV text is deliberately
  // no-store in the upstream request, this response, the browser, and the PWA.
  const cacheControl =
    meta.provider === "crossway"
      ? "private, no-store, max-age=0, must-revalidate"
      : "public, s-maxage=86400, stale-while-revalidate=604800";

  return NextResponse.json(result.chapter, {
    headers: { "Cache-Control": cacheControl },
  });
}
