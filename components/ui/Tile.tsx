"use client";

import Link from "next/link";
import { forwardRef, useRef, type ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────────
   Tile — the shared interactive card primitive.
   Mouse-tracked spotlight, soft aurora wash, lift-and-glow on hover.
   Used across ExploreGrid, PracticesHub, ResourcesHub, Pray, etc.
────────────────────────────────────────────────────────────────── */

export type TileTone = "light" | "dark" | "flame";
export type TileSize = "default" | "wide" | "tall" | "hero";

type Props = {
  href?: string;
  onClick?: () => void;
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  tag?: ReactNode;
  /** Inline content rendered below the title/sub (live data, chips, etc.) */
  children?: ReactNode;
  /** Decorative SVG glyph rendered in the corner. */
  glyph?: ReactNode;
  tone?: TileTone;
  size?: TileSize;
  className?: string;
  /** Optional inline image / illustration to render at the top */
  visual?: ReactNode;
  /** Disable the spotlight effect (e.g. on static cards) */
  noSpotlight?: boolean;
  /** External link */
  external?: boolean;
};

export const Tile = forwardRef<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement, Props>(
  function Tile(
    {
      href,
      onClick,
      eyebrow,
      title,
      sub,
      tag,
      children,
      glyph,
      tone = "light",
      size = "default",
      className = "",
      visual,
      noSpotlight,
      external,
    }: Props,
    ref
  ) {
    const innerRef = useRef<HTMLElement | null>(null);

    function setRef(el: HTMLElement | null) {
      innerRef.current = el;
      if (typeof ref === "function") ref(el as never);
      else if (ref) (ref as { current: HTMLElement | null }).current = el;
    }

    function onMove(e: React.MouseEvent) {
      if (noSpotlight) return;
      const el = innerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }

    const layout =
      size === "hero"
        ? "md:col-span-6 md:row-span-2"
        : size === "tall"
        ? "md:col-span-3 md:row-span-2"
        : size === "wide"
        ? "md:col-span-6"
        : "md:col-span-4";

    const baseClasses = [
      "tile group relative block h-full overflow-hidden rounded-3xl p-5 md:p-6",
      "border transition-all duration-300",
      tone === "dark"
        ? "bg-ink-900 text-ink-50 border-ink-800 hover:border-flame-500/60"
        : tone === "flame"
        ? "bg-gradient-to-br from-flame-600 to-flame-700 text-ink-50 border-flame-500 hover:from-flame-500 hover:to-flame-600"
        : "bg-card border-ink-200 hover:border-flame-500/60",
      "hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(249,115,22,0.32)]",
      layout,
      className,
    ].join(" ");

    const content = (
      <>
        {!noSpotlight && (
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                tone === "dark"
                  ? "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(253,186,116,0.20), transparent 45%)"
                  : "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(249,115,22,0.14), transparent 45%)",
            }}
          />
        )}
        {tone === "dark" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.13), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.10), transparent 60%)",
            }}
          />
        )}

        {glyph && (
          <span
            aria-hidden
            className={[
              "pointer-events-none absolute right-4 top-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3",
              tone === "dark" || tone === "flame" ? "text-flame-300/40" : "text-flame-700/25 group-hover:text-flame-700/60",
            ].join(" ")}
          >
            {glyph}
          </span>
        )}

        {visual && <div className="relative -mx-5 -mt-5 mb-4 md:-mx-6 md:-mt-6">{visual}</div>}

        <div className="relative">
          {eyebrow && (
            <div
              className={[
                "text-[10px] uppercase tracking-[0.18em]",
                tone === "dark" || tone === "flame" ? "text-flame-300" : "text-flame-700",
              ].join(" ")}
            >
              {eyebrow}
            </div>
          )}
          <h3
            className={[
              "font-serif tracking-tight leading-tight",
              size === "hero" ? "text-4xl md:text-5xl mt-2" : "text-2xl mt-1.5",
              tone === "dark" || tone === "flame" ? "text-ink-50" : "text-ink-900",
              "group-hover:[text-shadow:0_0_22px_rgba(249,115,22,0.25)]",
              "pr-12",
            ].join(" ")}
          >
            {title}
          </h3>
          {tag && (
            <div
              className={[
                "mt-1 text-[10px] uppercase tracking-widest",
                tone === "dark" || tone === "flame" ? "text-ink-300" : "text-ink-500",
              ].join(" ")}
            >
              {tag}
            </div>
          )}
          {sub && (
            <p
              className={[
                "mt-3 text-sm leading-relaxed pr-6",
                tone === "dark" || tone === "flame" ? "text-ink-300" : "text-ink-600",
              ].join(" ")}
            >
              {sub}
            </p>
          )}

          {children && <div className="relative mt-3">{children}</div>}

          {href && (
            <div
              className={[
                "mt-5 text-xs inline-flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1",
                tone === "dark" || tone === "flame" ? "text-flame-300" : "text-flame-700",
              ].join(" ")}
            >
              Open <span aria-hidden>→</span>
            </div>
          )}
        </div>
      </>
    );

    if (href) {
      return (
        <Link
          ref={(el) => setRef(el as never)}
          href={href}
          onMouseMove={onMove}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={baseClasses}
        >
          {content}
        </Link>
      );
    }
    if (onClick) {
      return (
        <button
          ref={(el) => setRef(el as never)}
          onClick={onClick}
          onMouseMove={onMove}
          className={`text-left ${baseClasses}`}
        >
          {content}
        </button>
      );
    }
    return (
      <div ref={(el) => setRef(el as never)} onMouseMove={onMove} className={baseClasses}>
        {content}
      </div>
    );
  }
);

/* ──────────────────────────────────────────────────────────────────
   Bento — the asymmetric grid layout used by tile collections.
────────────────────────────────────────────────────────────────── */

export function Bento({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(120px,auto)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PageHero — eyebrow + gradient title + intro paragraph.
────────────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  intro,
  scripture,
  scriptureRef,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  titleAccent?: ReactNode;
  intro?: ReactNode;
  scripture?: string;
  scriptureRef?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative">
      <span className="text-xs uppercase tracking-[0.18em] text-flame-700">{eyebrow}</span>
      <h1 className="font-serif text-4xl md:text-6xl mt-2 text-ink-900 leading-[1.05] tracking-tight">
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </h1>
      {intro && (
        <p className="mt-5 text-ink-700 max-w-2xl leading-relaxed">{intro}</p>
      )}
      {scripture && (
        <p className="mt-3 text-xs text-ink-500 max-w-2xl italic">
          "{scripture}"{scriptureRef && <span className="not-italic"> — {scriptureRef}</span>}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
