"use client";

import { useMemo, useState } from "react";
import { traditionLabels, type ChurchTradition } from "@/data/churches";

const INTAKE_EMAIL = "onboarding@scripture-theory.org";

type Form = {
  pastorName: string;
  pastorRole: string;
  churchName: string;
  city: string;
  country: string;
  tradition: ChurchTradition | "";
  languages: string;
  members: string;
  discipleship: string;
  welcome: string;
  contact: string;
  consent: boolean;
};

const empty: Form = {
  pastorName: "",
  pastorRole: "Senior pastor",
  churchName: "",
  city: "",
  country: "",
  tradition: "",
  languages: "",
  members: "",
  discipleship: "",
  welcome: "",
  contact: "",
  consent: false,
};

type SendState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent" }
  | { status: "queued"; message: string }
  | { status: "error"; message: string };

export default function ClaimForm() {
  const [form, setForm] = useState<Form>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [send, setSend] = useState<SendState>({ status: "idle" });

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isReady = useMemo(() => {
    return (
      form.pastorName.trim() &&
      form.churchName.trim() &&
      form.city.trim() &&
      form.country.trim() &&
      form.tradition &&
      form.languages.trim() &&
      form.discipleship.trim() &&
      form.contact.trim() &&
      form.consent
    );
  }, [form]);

  const subject = `Pastor claim: ${form.churchName || "(church name)"} — ${form.city || ""}, ${form.country || ""}`;

  const body = useMemo(() => {
    const traditionLabel = form.tradition
      ? traditionLabels[form.tradition as ChurchTradition]
      : "(not selected)";
    return [
      "Hello Scripture Theory team,",
      "",
      "I would like to claim our church's listing in the One Body directory.",
      "",
      `Pastor / leader:  ${form.pastorName} (${form.pastorRole})`,
      `Church:           ${form.churchName}`,
      `Location:         ${form.city}, ${form.country}`,
      `Tradition:        ${traditionLabel}`,
      `Languages used:   ${form.languages}`,
      form.members ? `Approx. members:  ${form.members}` : null,
      "",
      "Our discipleship culture:",
      form.discipleship,
      "",
      form.welcome ? "How we welcome newcomers:" : null,
      form.welcome || null,
      form.welcome ? "" : null,
      "Best way to reach me:",
      form.contact,
      "",
      "I have read and agree with the Scripture Theory pastoral covenant:",
      "- We center Jesus and the ONE Gospel.",
      "- We will not use this introduction to recruit members away from another local body.",
      "- We will respond to warm intros from newcomers within 7 days.",
      "",
      "In Christ,",
      form.pastorName,
    ]
      .filter((x) => x !== null)
      .join("\n");
  }, [form]);

  const mailto = `mailto:${INTAKE_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${INTAKE_EMAIL}\nSubject: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  async function sendViaSite() {
    setSend({ status: "sending" });
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "claim",
          subject,
          body,
          replyTo: form.contact.includes("@") ? form.contact : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSend({
          status: "error",
          message: (data && data.error) || "We could not reach the server. Please use email or copy.",
        });
        return;
      }
      if (data.delivered) {
        setSend({ status: "sent" });
      } else {
        setSend({
          status: "queued",
          message:
            data.message ||
            "Your message was validated. The website is in pilot mode — please use the email or copy options to reach our team directly.",
        });
      }
    } catch (err) {
      setSend({
        status: "error",
        message: "Network error. Please use the email or copy options to reach our team.",
      });
    }
  }

  return (
    <div className="space-y-6">
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isReady) setSubmitted(true);
          }}
          className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your full name" required>
              <input
                value={form.pastorName}
                onChange={(e) => set("pastorName", e.target.value)}
                className={inputCls}
                required
              />
            </Field>
            <Field label="Your role">
              <select
                value={form.pastorRole}
                onChange={(e) => set("pastorRole", e.target.value)}
                className={inputCls}
              >
                <option>Senior pastor</option>
                <option>Associate pastor</option>
                <option>Priest / Father</option>
                <option>Bishop</option>
                <option>Deacon</option>
                <option>Elder</option>
                <option>Small-group leader</option>
                <option>Welcome team lead</option>
              </select>
            </Field>
          </div>

          <Field label="Church name" required>
            <input
              value={form.churchName}
              onChange={(e) => set("churchName", e.target.value)}
              className={inputCls}
              required
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="City / neighborhood" required>
              <input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className={inputCls}
                required
              />
            </Field>
            <Field label="Country" required>
              <input
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                className={inputCls}
                required
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Tradition" required>
              <select
                value={form.tradition}
                onChange={(e) => set("tradition", e.target.value as ChurchTradition | "")}
                className={inputCls}
                required
              >
                <option value="">Select…</option>
                {(Object.entries(traditionLabels) as [string, string][]).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Languages used in services">
              <input
                value={form.languages}
                onChange={(e) => set("languages", e.target.value)}
                placeholder="English, Yoruba, Pidgin…"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Approx. members or weekly attendance (optional)">
            <input
              value={form.members}
              onChange={(e) => set("members", e.target.value)}
              placeholder="e.g. 120 weekly"
              className={inputCls}
            />
          </Field>

          <Field label="Your discipleship culture (1–3 sentences)" required>
            <textarea
              value={form.discipleship}
              onChange={(e) => set("discipleship", e.target.value)}
              rows={3}
              placeholder="What does it look like to grow as a disciple in your church?"
              className={inputCls}
              required
            />
          </Field>

          <Field label="How a newcomer is welcomed (optional)">
            <textarea
              value={form.welcome}
              onChange={(e) => set("welcome", e.target.value)}
              rows={2}
              placeholder="What happens in the first 2 weeks of someone joining you?"
              className={inputCls}
            />
          </Field>

          <Field label="Best way for our team to reach you" required>
            <input
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
              placeholder="Email or WhatsApp"
              className={inputCls}
              required
            />
          </Field>

          <label className="flex items-start gap-3 rounded-2xl bg-ink-50 border border-ink-200 p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-1"
              required
            />
            <span className="text-sm text-ink-800 leading-relaxed">
              I agree to the Scripture Theory pastoral covenant: <strong>we center Jesus and the
              ONE Gospel</strong>, we will not use warm intros to recruit members away from another
              local body, and we will respond to a newcomer's intro within 7 days.
            </span>
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!isReady}
              className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review & send →
            </button>
            <span className="text-xs text-ink-500 self-center">
              Nothing leaves your device until you click send in the next step.
            </span>
          </div>
        </form>
      ) : (
        <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
          <div className="text-xs uppercase tracking-widest text-flame-700">Final step</div>
          <h3 className="font-serif text-2xl text-ink-900 mt-1">Review & send</h3>
          <p className="text-sm text-ink-600 mt-2">
            Here's the message that will go to our onboarding team. Open it in your email client or
            copy the whole thing — whichever you prefer.
          </p>

          <pre className="mt-5 whitespace-pre-wrap bg-ink-50 border border-ink-200 rounded-2xl p-5 text-sm text-ink-800 leading-relaxed font-sans">
{`To: ${INTAKE_EMAIL}
Subject: ${subject}

${body}`}
          </pre>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={sendViaSite}
              disabled={send.status === "sending" || send.status === "sent"}
              className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {send.status === "sending"
                ? "Sending…"
                : send.status === "sent"
                  ? "Sent ✓"
                  : "Send via Scripture Theory"}
            </button>
            <a
              href={mailto}
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700"
            >
              Open in my email client
            </a>
            <button
              onClick={copy}
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900"
            >
              {copied ? "Copied!" : "Copy the whole message"}
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setSend({ status: "idle" });
              }}
              className="inline-flex items-center rounded-full border border-ink-200 px-5 py-2.5 text-sm text-ink-500 hover:border-ink-400"
            >
              Edit my answers
            </button>
          </div>

          {send.status === "sent" && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Sent. Our onboarding team will reply personally within five business days.
            </div>
          )}
          {send.status === "queued" && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {send.message}
            </div>
          )}
          {send.status === "error" && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              {send.message}
            </div>
          )}

          <p className="mt-6 text-xs text-ink-500 leading-relaxed">
            Pilot note: during Q3 we hand-onboard every claimed church and verify each pastor before
            their listing replaces the illustrative entry. Expect a personal reply within five
            business days.
          </p>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-ink-400">
        {label} {required && <span className="text-flame-700">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
