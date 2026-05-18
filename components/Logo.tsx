import { forwardRef } from "react";

type Props = {
  size?: number;
  className?: string;
  /** Show the wordmark beside the mark. Off by default — the Nav already
   *  renders the wordmark next to the logo. */
  withWordmark?: boolean;
  title?: string;
};

/**
 * Scripture Theory logomark — the Compass monogram.
 *
 * Adopted from the Claude Design handoff bundle (Logo Studies — direction 08,
 * "Compass · Medallion · for the nations"). A roundel with 24 ticks (the world
 * the Body is sent to), a serif ST monogram at the center, cardinal marks in
 * gold-bright. Reads cleanly from a 16px favicon up to a hero banner.
 *
 * Palette: ink #120a06, vellum #f3e7c8, gold #c89557, gold-bright #d4a574,
 * gold-faint #6b4e2a — the design tokens defined in the handoff bundle.
 */
const Logo = forwardRef<SVGSVGElement, Props>(function Logo(
  { size = 32, className, withWordmark = false, title = "Scripture Theory" },
  ref,
) {
  // viewBox 64×64 (no wordmark) keeps the mark perfectly round for icon
  // contexts. When the wordmark is requested we widen to 240×64 with the
  // medallion on the left.
  const viewBox = withWordmark ? "0 0 240 64" : "0 0 64 64";
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size * (withWordmark ? 3.75 : 1)}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="st-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0f08" />
          <stop offset="100%" stopColor="#0a0604" />
        </linearGradient>
        <linearGradient id="st-gold" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#c89557" />
        </linearGradient>
      </defs>

      {/* Roundel — soft warm ink */}
      <rect width="64" height="64" rx="14" fill="url(#st-bg)" />

      {/* Compass medallion */}
      <g transform="translate(32 32)">
        {/* Outer + inner ring */}
        <circle r="24" fill="none" stroke="#c89557" strokeWidth="0.9" />
        <circle r="22" fill="none" stroke="#6b4e2a" strokeWidth="0.45" />

        {/* 24 tick marks — major (cardinal) every 6, minor in between */}
        {Array.from({ length: 24 }).map((_, i) => {
          const isMajor = i % 6 === 0;
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const r1 = 22;
          const r2 = isMajor ? 18.6 : 20.2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * r1}
              y1={Math.sin(a) * r1}
              x2={Math.cos(a) * r2}
              y2={Math.sin(a) * r2}
              stroke={isMajor ? "#d4a574" : "#6b4e2a"}
              strokeWidth={isMajor ? 1 : 0.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* ST monogram at the center — vellum S, gold-bright T */}
        <text
          y="8"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
          fontSize="26"
          fontWeight="500"
          fill="#f3e7c8"
        >
          S
          <tspan dx="-2.5" fill="#d4a574">
            T
          </tspan>
        </text>
      </g>

      {/* Optional wordmark beside the medallion */}
      {withWordmark && (
        <g transform="translate(72 0)">
          <text
            x="0"
            y="36"
            fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
            fontSize="22"
            fontWeight="500"
            fill="url(#st-gold)"
            letterSpacing="0.5"
          >
            Scripture
          </text>
          <text
            x="0"
            y="56"
            fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
            fontSize="22"
            fontStyle="italic"
            fontWeight="500"
            fill="#f3e7c8"
            letterSpacing="0.5"
          >
            Theory
          </text>
        </g>
      )}
    </svg>
  );
});

export default Logo;
