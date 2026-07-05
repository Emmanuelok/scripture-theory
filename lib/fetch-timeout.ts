/**
 * fetch() with an enforced timeout.
 *
 * Node/undici's fetch has no default timeout, so a hung upstream (a slow
 * Overpass mirror, a stalled geocoder) can pin a request handler open until
 * the platform kills it. This wraps fetch with an AbortController so every
 * external call fails fast and predictably.
 *
 * Any caller-supplied `signal` is honoured too — aborting either the caller's
 * signal or the timeout aborts the request.
 */
export async function fetchWithTimeout(
  input: string | URL | Request,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 8000, signal: callerSignal, ...rest } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs);

  const onCallerAbort = () => controller.abort((callerSignal as AbortSignal)?.reason);
  if (callerSignal) {
    if (callerSignal.aborted) controller.abort(callerSignal.reason);
    else callerSignal.addEventListener("abort", onCallerAbort, { once: true });
  }

  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timer);
    if (callerSignal) callerSignal.removeEventListener("abort", onCallerAbort);
  }
}
