"use client";

import { useMemo, useState } from "react";

const INTAKE_EMAIL = "testimonies@scripture-theory.org";

type Form = {
  firstName: string;
  city: string;
  country: string;
  before: string;
  encounter: string;
  now: string;
  verse: string;
  contact: string;
  consent: boolean;
  initialsOnly: boolean;
};

const empty: Form = {
  firstName: "",
  city: "",
  country: "",
  before: "",
  encounter: "",
  now: "",
  verse: "",
  contact: "",
  consent: false,
  initialsOnly: false,
};

type SendState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent" }
  | { status: "queued"; message: string }
  | { status: "error"; message: string };

export default function TestimonyForm() {
  const [form, setForm] = useState<Form>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [send, setSend] = useState<SendState>({ status: "idle" });

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isReady = useMemo(
    () =>
      form.firstName.trim() &&
      form.before.trim() &&
      form.encounter.trim() &&
      form.now.trim() &&
      form.consent,
    [form]
  );

  const subject = `Testimony of Jesus: ${form.firstName || "(name)"} ${form.city ? `· ${form.city}` : ""}`;

  const body = useMemo(() => {
    return [
      "A testimony to Jesus submitted through Scripture Theory.",
      "",
      `Name:     ${form.firstName}${form.initialsOnly ? " (publish initials only)" : ""}`,
      form.city || form.country ? `Place:    ${[form.city, form.country].filter(Boolean).join(", ")}` : null,
      form.verse ? `Verse:    ${form.verse}` : null,
      form.contact ? `Contact:  ${form.contact}` : "Contact:  (declined)",
      "",
      "Before:",
      form.before,
      "",
      "Jesus met me:",
      form.encounter,
      "",
      "Now:",
      form.now,
      "",
      "Consent:",
      "I confirm this is my own story, and I give permission for the editorial team to review and (with my approval before publication) share it on Scripture Theory.",
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
    } catch {}
  }

  async function sendViaSite() {
    setSend({ status: "sending" });
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "testimony",
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
            "Your testimony was validated. The website is in pilot mode — please use the email or copy options to reach our team directly.",
        });
      }
    } catch {
      setSend({
        status: "error",
        message: "Network error. Please use the email or copy options to reach our team.",
      });
    }
  }

  return !submitted ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isReady) setSubmitted(true);
      }}
      className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring space-y-6"
    >
      <Field label="First name" required>
        <input
          value={form.firstName}
          onChange={(e) => set("firstName", e.target.value)}
          className={inputCls}
          required
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="City (optional)">
          <input
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Country (optional)">
          <input
            value={form.country}
            onChange={(e) => set("country", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Before — what your life looked like before Jesus met you" required>
        <textarea
          value={form.before}
          onChange={(e) => set("before", e.target.value)}
          rows={3}
          className={inputCls}
          placeholder="A few honest sentences."
          required
        />
      </Field>

      <Field label="Jesus met me — the moment, the verse, the friend, the prayer" required>
        <textarea
          value={form.encounter}
          onChange={(e) => set("encounter", e.target.value)}
          rows={3}
          className={inputCls}
          placeholder="Tell us what happened."
          required
        />
      </Field>

      <Field label="Now — what your life is like with Him today" required>
        <textarea
          value={form.now}
          onChange={(e) => set("now", e.target.value)}
          rows={3}
          className={inputCls}
          placeholder="One or two sentences is plenty."
          required
        />
      </Field>

      <Field label="A verse that holds your story (optional)">
        <input
          value={form.verse}
          onChange={(e) => set("verse", e.target.value)}
          className={inputCls}
          placeholder="e.g. John 8:11 or Romans 8:38–39"
        />
      </Field>

      <Field label="How can our editor reach you, if needed? (optional)">
        <input
          value={form.contact}
          onChange={(e) => set("contact", e.target.value)}
          className={inputCls}
          placeholder="Email or WhatsApp"
        />
      </Field>

      <label className="flex items-start gap-3 rounded-2xl bg-ink-50 border border-ink-200 p-4 cursor-pointer">
        <input
          type="checkbox"
          checked={form.initialsOnly}
          onChange={(e) => set("initialsOnly", e.target.checked)}
          className="mt-1"
        />
        <span className="text-sm text-ink-800 leading-relaxed">
          Publish my initials only, not my full first name.
        </span>
      </label>

      <label className="flex items-start gap-3 rounded-2xl bg-flame-50/60 border border-flame-200 p-4 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1"
          required
        />
        <span className="text-sm text-ink-800 leading-relaxed">
          This is my own story. I give the editorial team permission to review it and (with my
          approval before publication) share it on Scripture Theory so that Jesus may be lifted up.
        </span>
      </label>

      <button
        type="submit"
        disabled={!isReady}
        className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Review & send →
      </button>
    </form>
  ) : (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring">
      <div className="text-xs uppercase tracking-widest text-flame-700">Final step</div>
      <h3 className="font-serif text-2xl text-ink-900 mt-1">Send your testimony</h3>
      <p className="text-sm text-ink-600 mt-2">
        Here's exactly what will be sent to our editorial team. Nothing has left your device yet.
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
          Sent. Our editor will reply personally with a draft for your approval.
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
        Our editor reads every submission personally. We'll reply with a draft for your approval
        before anything is published.
      </p>
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
