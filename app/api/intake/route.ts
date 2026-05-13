import { NextResponse } from "next/server";

export const runtime = "nodejs";

type IntakeKind = "claim" | "testimony";

type IntakePayload = {
  kind: IntakeKind;
  subject: string;
  body: string;
  replyTo?: string;
};

const INTAKE_TO: Record<IntakeKind, string> = {
  claim: process.env.INTAKE_CLAIM_TO ?? "onboarding@scripture-theory.org",
  testimony: process.env.INTAKE_TESTIMONY_TO ?? "testimonies@scripture-theory.org",
};

const INTAKE_FROM = process.env.INTAKE_FROM ?? "Scripture Theory <noreply@scripture-theory.org>";

function isValid(input: unknown): input is IntakePayload {
  if (!input || typeof input !== "object") return false;
  const p = input as Record<string, unknown>;
  if (p.kind !== "claim" && p.kind !== "testimony") return false;
  if (typeof p.subject !== "string" || !p.subject.trim()) return false;
  if (typeof p.body !== "string" || !p.body.trim()) return false;
  if (p.subject.length > 300) return false;
  if (p.body.length > 20_000) return false;
  if (p.replyTo !== undefined && typeof p.replyTo !== "string") return false;
  return true;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        mode: "queued",
        message:
          "The website is in pilot mode. Your submission was validated but not transmitted — please use the email or copy options to reach our team directly.",
      },
      { status: 202 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: INTAKE_FROM,
        to: [INTAKE_TO[payload.kind]],
        reply_to: payload.replyTo ? [payload.replyTo] : undefined,
        subject: payload.subject,
        text: payload.body,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Upstream delivery failed", status: res.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true, mode: "sent" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Delivery error", detail: String(err) },
      { status: 502 }
    );
  }
}
