import Link from "next/link";
import { logoStudies } from "@/components/LogoStudies";

export const metadata = {
  title: "Brand — Logo Studies — Scripture Theory",
  description:
    "Eight monogram directions for Scripture Theory — Lapidary, Vesica, Crossbar, Illuminated, Stacked Plate, Seal, Ligature, Compass. Pick the one that fits the platform's voice.",
};

// Design tokens carried over from the handoff bundle (ccai-global tokens.css),
// scoped to this page only so the rest of the site keeps its own palette
// until a direction is chosen.
const PAGE_TOKENS = `
  .brand-page {
    --st-ink: #120a06;
    --st-ink-2: #1a0f08;
    --st-ink-line: #2e1f15;
    --st-vellum: #f3e7c8;
    --st-vellum-3: #faf2dc;
    --st-gold: #c89557;
    --st-gold-soft: #d4a574;
    --st-gold-faint: #6b4e2a;
    --st-oxblood: #7a2222;
    --st-text: #f1e5c4;
    --st-text-mute: rgba(241, 229, 196, 0.62);
    --ff-display: "Cormorant Garamond", "EB Garamond", Georgia, serif;
    --ff-text: "Newsreader", "EB Garamond", Georgia, serif;

    background: var(--st-ink);
    color: var(--st-text);
    font-family: var(--ff-text);
  }
  .brand-page .display { font-family: var(--ff-display); }
  .brand-page .eyebrow {
    font-family: var(--ff-display);
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-size: 11px;
    color: var(--st-gold-soft);
  }
  .brand-page .logo-frame {
    background: var(--st-ink);
    border: 1px solid rgba(200, 149, 87, 0.16);
    position: relative;
  }
  .brand-page .logo-frame::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212, 165, 116, 0.05), transparent 70%),
      radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 0, 0, 0.4), transparent 70%);
    pointer-events: none;
  }
`;

export default function BrandPage() {
  return (
    <>
      {/* Page-scoped tokens and the Cormorant + Newsreader fonts. Loaded only
          here so the rest of the platform keeps its current typography. */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: PAGE_TOKENS }} />

      <section className="brand-page">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-24">
          {/* Top intro */}
          <span className="eyebrow">Brand · monogram studies</span>
          <h1 className="display mt-3 text-4xl md:text-6xl leading-[1.05]">
            Eight directions for the mark.
          </h1>
          <p
            className="mt-4 max-w-2xl leading-relaxed"
            style={{ color: "var(--st-text-mute)" }}
          >
            Ported from the design handoff. Each candidate sits on the ink
            palette of the platform with vellum, gold, and oxblood accents,
            set in Cormorant Garamond. Pick a direction and the existing
            `&lt;Logo&gt;` component can be swapped in for it across the
            site.
          </p>

          {/* Palette + type swatch */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--st-ink-2)",
                border: "1px solid var(--st-ink-line)",
              }}
            >
              <div className="eyebrow">Palette</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { c: "#120a06", n: "Ink" },
                  { c: "#1a0f08", n: "Ink 2" },
                  { c: "#f3e7c8", n: "Vellum" },
                  { c: "#c89557", n: "Gold" },
                  { c: "#d4a574", n: "Gold soft" },
                  { c: "#6b4e2a", n: "Gold faint" },
                  { c: "#7a2222", n: "Oxblood" },
                  { c: "#233b66", n: "Lapis" },
                ].map((sw) => (
                  <div key={sw.c} className="flex items-center gap-2">
                    <span
                      className="h-6 w-6 rounded-md inline-block"
                      style={{
                        background: sw.c,
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      aria-hidden
                    />
                    <span className="text-xs" style={{ color: "var(--st-text-mute)" }}>
                      {sw.n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--st-ink-2)",
                border: "1px solid var(--st-ink-line)",
              }}
            >
              <div className="eyebrow">Type pairing</div>
              <p className="display mt-2 text-3xl leading-tight">
                Cormorant Garamond
              </p>
              <p className="display italic mt-1 text-base" style={{ color: "var(--st-gold-soft)" }}>
                display — headlines, monogram, lockup
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Newsreader sets the body — calm, readable, with a literary
                tilt. The platform's existing UI type stays where it lives
                today; this pairing is reserved for the brand surface.
              </p>
            </div>
          </div>

          {/* The eight studies */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {logoStudies.map((s) => {
              const Comp = s.Comp;
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: "var(--st-ink-2)",
                    border: "1px solid var(--st-ink-line)",
                  }}
                >
                  {/* Top tag row */}
                  <div className="flex items-start justify-between px-6 pt-5">
                    <span className="eyebrow">
                      {s.num} · {s.tag}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--st-text-mute)" }}>
                      {s.id}
                    </span>
                  </div>
                  {/* The logo on its dark stage */}
                  <div className="logo-frame mt-3 mx-6 mb-4 rounded-lg" style={{ aspectRatio: "3 / 2" }}>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Comp />
                    </div>
                  </div>
                  {/* Name + concept */}
                  <div className="px-6 pb-6">
                    <h2 className="display text-3xl">{s.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--st-text-mute)" }}>
                      {s.concept}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* How to pick */}
          <div
            className="mt-12 rounded-2xl p-6"
            style={{
              background: "var(--st-ink-2)",
              border: "1px solid var(--st-ink-line)",
            }}
          >
            <div className="eyebrow">Pick one</div>
            <h2 className="display mt-2 text-2xl md:text-3xl">
              Which direction fits the platform's voice?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed">
              Tell me the number (01–08) and I'll wire the chosen monogram
              into <code style={{ color: "var(--st-gold-soft)" }}>components/Logo.tsx</code>,
              regenerate the favicon and PWA icons in matching style, and
              produce the lockup pack (full lockup, monogram-only, social
              avatar, dark / light variants) the original design bundle
              promised.
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/about"
              className="text-sm"
              style={{ color: "var(--st-gold-soft)" }}
            >
              ← About Scripture Theory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
