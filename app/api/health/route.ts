import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // never cache a health probe

/**
 * Liveness/readiness probe for uptime monitors and load balancers.
 * Reports only whether optional integrations are *configured* — never any
 * secret value. Safe to expose publicly.
 */
export async function GET() {
  const config = {
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    esv: Boolean(process.env.ESV_API_KEY),
    email: Boolean(process.env.RESEND_API_KEY),
    siteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  };

  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      uptimeSec: Math.round(process.uptime()),
      config,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
