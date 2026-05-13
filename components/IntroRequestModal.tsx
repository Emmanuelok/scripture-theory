"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { submitIntroRequest } from "@/lib/pastor";

type Props = {
  stage: number;
  defaultAlias?: string;
  onClose: () => void;
};

/**
 * Modal a disciple opens from the Path tracker to request a real
 * introduction to a pastor. Saves to Supabase when signed in; gracefully
 * tells the user what to do otherwise.
 */
export default function IntroRequestModal({ stage, defaultAlias, onClose }: Props) {
  const { configured, ready, user } = useAuth();
  const [alias, setAlias] = useState(defaultAlias ?? "");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!city.trim()) {
      setStatus("Tell us your city so we can route this to a pastor near you.");
      return;
    }
    setBusy(true);
    setStatus("");
    const res = await submitIntroRequest({
      alias: anonymous ? undefined : alias.trim() || undefined,
      contact: anonymous ? undefined : contact.trim() || undefined,
      stage,
      note: note.trim() || undefined,
      target_city: city.trim(),
      target_country: country.trim() || undefined,
      anonymous,
    });
    setBusy(false);
    if (!res.ok) {
      setStatus(res.error ?? "Could not submit. Try again.");
      return;
    }
    setDone(true);
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-ink-900/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Request a pastor introduction"
      >
        <div
          className="relative w-full max-w-lg rounded-3xl border border-ink-200 bg-card p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-xs text-ink-500 hover:text-ink-900"
            aria-label="Close"
          >
            Close ✕
          </button>

          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            Stage {stage} · Pastor introduction
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
            Ask a pastor to reach back.
          </h2>

          {done ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="text-[10px] uppercase tracking-widest text-emerald-700">
                  Sent
                </div>
                <p className="mt-1 text-sm text-emerald-900 leading-relaxed">
                  Your request is in the queue for any pastor who has claimed a church in{" "}
                  <strong>{city}</strong>. We'll never share more than what you put here.
                </p>
              </div>
              <p className="text-xs text-ink-600 leading-relaxed">
                <strong>What happens next:</strong> a pastor in your city will accept or decline.
                Watch your email (if you shared it) or sign in on any device to see status.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={onClose}
                  className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
                >
                  Done
                </button>
                <Link
                  href="/connect"
                  className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
                >
                  Browse churches near me →
                </Link>
              </div>
            </div>
          ) : !configured || !ready ? (
            <NotConfigured city={city} setCity={setCity} onClose={onClose} />
          ) : !user ? (
            <NotSignedIn />
          ) : (
            <form onSubmit={submit} className="mt-5 space-y-4">
              <p className="text-sm text-ink-600 leading-relaxed">
                A pastor who has claimed a church in your city will see this and reach back. The
                only people who see it are pastors verified for that city — never the public.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field
                  label="Your city"
                  required
                  value={city}
                  onChange={setCity}
                  placeholder="Lagos"
                />
                <Field
                  label="Country"
                  value={country}
                  onChange={setCountry}
                  placeholder="Nigeria"
                />
              </div>

              {!anonymous && (
                <>
                  <Field
                    label="Your first name (or any name)"
                    value={alias}
                    onChange={setAlias}
                    placeholder="Emma"
                  />
                  <Field
                    label="How can they reach back?"
                    value={contact}
                    onChange={setContact}
                    placeholder="email or phone"
                  />
                </>
              )}

              <div>
                <label className="text-[10px] uppercase tracking-widest text-flame-700">
                  Anything you'd like to share (optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    stage === 3
                      ? "Where you are in your walk; what you'd like to talk about (baptism, doubts, your story)."
                      : "Where you are in your walk; what you'd like to talk about."
                  }
                  className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <strong className="text-ink-900">Send anonymously.</strong> The pastor will only
                  see your city and your note — no name, no contact, no identifier. They can't
                  reach you back, but you can see the response status when you sign in.
                </span>
              </label>

              {status && (
                <p className="text-sm text-ink-600" role="status">
                  {status}
                </p>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 disabled:opacity-50"
                >
                  {busy ? "Sending…" : "Send to a pastor in my city"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
                >
                  Not now
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function NotConfigured({
  city,
  setCity,
  onClose,
}: {
  city: string;
  setCity: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="mt-5 space-y-4">
      <p className="text-sm text-ink-700 leading-relaxed">
        Real pastor routing requires the platform's cloud sync, which isn't configured on this
        deployment yet. In the meantime, your request can stay on this device, and you can take
        the next concrete step right now:
      </p>
      <Field label="Your city (for your records)" value={city} onChange={setCity} placeholder="Lagos" />
      <div className="flex flex-wrap gap-2 pt-2">
        <Link
          href="/connect"
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Find a church near me →
        </Link>
        <button
          onClick={onClose}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function NotSignedIn() {
  return (
    <div className="mt-5 space-y-4">
      <p className="text-sm text-ink-700 leading-relaxed">
        Send-a-pastor-an-intro requires sign-in (a passwordless email link) so the pastor's reply
        can find its way back to you — and so the platform never broadcasts your name publicly.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/account"
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Sign in to send →
        </Link>
        <Link
          href="/connect"
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
        >
          Or just find a church near me
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-flame-700">{label}</span>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
      />
    </label>
  );
}
