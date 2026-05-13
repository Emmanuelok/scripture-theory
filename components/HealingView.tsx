"use client";

import { useState } from "react";
import Link from "next/link";
import { useProfile, type HealingRequest } from "@/lib/profile";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const STATUS_LABEL: Record<HealingRequest["status"], string> = {
  praying: "Still praying",
  improving: "Improving",
  answered: "Answered — thanks be to God",
  released: "Released into His hands",
};

export default function HealingView() {
  const { profile, update, mounted } = useProfile();
  const requests = profile.healing ?? [];
  const [adding, setAdding] = useState(false);
  const [who, setWho] = useState("");
  const [forWhat, setForWhat] = useState("");

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function add() {
    if (!who.trim() || !forWhat.trim()) return;
    const r: HealingRequest = {
      id: newId(),
      who: who.trim(),
      forWhat: forWhat.trim(),
      startedAt: new Date().toISOString(),
      status: "praying",
    };
    update({ healing: [r, ...requests] });
    setWho("");
    setForWhat("");
    setAdding(false);
  }

  function patchOne(id: string, patch: Partial<HealingRequest>) {
    update({ healing: requests.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  }

  function deleteOne(id: string) {
    if (typeof window !== "undefined" && window.confirm("Delete this prayer record?")) {
      update({ healing: requests.filter((r) => r.id !== id) });
    }
  }

  function appendUpdate(id: string, note: string) {
    const r = requests.find((x) => x.id === id);
    if (!r) return;
    patchOne(id, {
      updates: [{ at: new Date().toISOString(), note }, ...(r.updates ?? [])],
    });
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-10 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">James 5:14-16</div>
        <h1 className="font-serif text-3xl md:text-4xl mt-1">"Is anyone among you sick?"</h1>
        <p className="mt-4 text-ink-200 leading-relaxed">
          "Let him call for the elders of the church, and let them pray over him, anointing him
          with oil in the name of the Lord. And the prayer of faith will save the sick, and the
          Lord will raise him up. And if he has committed sins, he will be forgiven. Confess your
          trespasses to one another, and pray for one another, that you may be healed."
        </p>
      </section>

      <Section title="Before you pray" eyebrow="One">
        <ul className="space-y-3 text-ink-800 leading-relaxed">
          <li><strong>Confession.</strong> James pairs healing with confession. Bring sin into the light first (1 John 1:9). Not all illness has a moral cause — but unconfessed sin can hinder prayer (1 Pet 3:7).</li>
          <li><strong>Forgive.</strong> Walk the <Link href="/forgive" className="text-flame-700 hover:underline">forgiveness path</Link> if bitterness is alive. Jesus tied healing to forgiveness (Matt 9:2-6).</li>
          <li><strong>Call the elders.</strong> Don't pray alone if you can help it. Healing prayer is a corporate, embodied act. Ask your local pastors or two mature believers to come.</li>
          <li><strong>Anoint with oil.</strong> Plain olive oil. A small dab on the forehead. The oil is a sign, not magic — it externalizes what the Spirit is doing.</li>
        </ul>
      </Section>

      <Section title="The prayer of faith" eyebrow="Two">
        <p className="text-ink-800 leading-relaxed italic">
          Lord Jesus, You are the same yesterday, today, and forever (Heb 13:8). By Your stripes
          we are healed (Isa 53:5). You bore our sicknesses and carried our sorrows. We come now
          for ____ — for healing of body, of soul, of relationship, of mind. We anoint with oil
          in Your name. Stretch out Your hand. Touch. Restore. We trust You with the outcome,
          whether by sudden miracle, by the slow gift of medicine, or by Your perfect "no" that
          we will not understand until we see You face to face. Whatever You do, we will love You.
          In Your name, amen.
        </p>
      </Section>

      <Section title="When God says 'wait' or 'no'" eyebrow="Three">
        <ul className="space-y-3 text-ink-800 leading-relaxed text-sm">
          <li>Paul prayed three times for the thorn to be removed. The answer was: <em>"My grace is sufficient for you, for My strength is made perfect in weakness"</em> (2 Cor 12:7-10). Paul stopped asking. He did not stop trusting.</li>
          <li>Not every "no" means a hidden sin. Mystery remains. Some of God's most beloved have not yet been healed.</li>
          <li>Continue medical care. Doctors, surgeons, and medication are also gifts of God's providence (Col 4:14 — "Luke the beloved physician"). Faith and medicine are not enemies.</li>
          <li>Whatever the outcome, the deepest healing is to know God Himself. <em>"This is eternal life: that they may know You."</em> (John 17:3)</li>
        </ul>
      </Section>

      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">Healing journal</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">Whom are we praying for?</h2>
          </div>
          <button
            onClick={() => setAdding((v) => !v)}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            {adding ? "Cancel" : "+ Add a request"}
          </button>
        </div>

        {adding && (
          <div className="mt-5 space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-flame-700">Who</label>
              <input
                value={who}
                onChange={(e) => setWho(e.target.value)}
                placeholder="My mother · Myself · J.M."
                className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-flame-700">For what</label>
              <textarea
                value={forWhat}
                onChange={(e) => setForWhat(e.target.value)}
                rows={3}
                placeholder="Cancer in the lymph nodes · depression · marriage healing · chronic pain…"
                className="mt-1 w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-ink-900"
              />
            </div>
            <button
              onClick={add}
              disabled={!who.trim() || !forWhat.trim()}
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 disabled:opacity-40"
            >
              Begin praying
            </button>
          </div>
        )}

        {requests.length > 0 && (
          <ul className="mt-6 space-y-3">
            {requests.map((r) => (
              <RequestCard
                key={r.id}
                r={r}
                onPatch={(p) => patchOne(r.id, p)}
                onDelete={() => deleteOne(r.id)}
                onUpdate={(note) => appendUpdate(r.id, note)}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="text-[10px] uppercase tracking-widest text-flame-700">Step {eyebrow}</div>
      <h2 className="font-serif text-2xl text-ink-900 mt-1">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function RequestCard({
  r,
  onPatch,
  onDelete,
  onUpdate,
}: {
  r: HealingRequest;
  onPatch: (p: Partial<HealingRequest>) => void;
  onDelete: () => void;
  onUpdate: (note: string) => void;
}) {
  const [note, setNote] = useState("");
  const [adding, setAdding] = useState(false);
  return (
    <li className="rounded-2xl border border-ink-200 bg-card-subtle p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="font-serif text-ink-900">{r.who}</div>
          <div className="text-sm text-ink-700 mt-0.5">{r.forWhat}</div>
          <div className="text-xs text-ink-500 mt-1">
            Began {new Date(r.startedAt).toLocaleDateString()}
          </div>
        </div>
        <select
          value={r.status}
          onChange={(e) => onPatch({ status: e.target.value as HealingRequest["status"] })}
          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700"
        >
          {(Object.keys(STATUS_LABEL) as HealingRequest["status"][]).map((k) => (
            <option key={k} value={k}>{STATUS_LABEL[k]}</option>
          ))}
        </select>
      </div>

      {r.updates && r.updates.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-xs text-ink-600">
          {r.updates.map((u, i) => (
            <li key={i}>
              <span className="text-flame-700">{new Date(u.at).toLocaleDateString()}:</span>{" "}
              {u.note}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="text-xs text-flame-700 hover:underline"
          >
            + Add update
          </button>
        ) : (
          <div className="w-full flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What changed? What did God show you?"
              className="flex-1 rounded-xl border border-ink-300 bg-card px-3 py-1.5 text-sm text-ink-900"
            />
            <button
              onClick={() => {
                if (note.trim()) {
                  onUpdate(note.trim());
                  setNote("");
                  setAdding(false);
                }
              }}
              className="rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-xs hover:bg-flame-700"
            >
              Save
            </button>
          </div>
        )}
        <button
          onClick={onDelete}
          className="ml-auto text-xs text-ink-400 hover:text-flame-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
