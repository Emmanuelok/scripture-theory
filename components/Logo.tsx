import { forwardRef } from "react";

type Props = {
  size?: number;
  className?: string;
  withFlame?: boolean;
  title?: string;
};

/**
 * Scripture Theory logomark.
 * A refined ST monogram in a roundel with a small tongue of flame rising
 * from the crossbar. Single SVG — scales cleanly, works in dark/light,
 * uses the project's flame palette.
 */
const Logo = forwardRef<SVGSVGElement, Props>(function Logo(
  { size = 32, className, withFlame = true, title = "Scripture Theory" },
  ref
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
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
        <linearGradient id="st-mono" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fff4e0" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
        <linearGradient id="st-flame" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fde6c0" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#b8420c" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="14" fill="url(#st-bg)" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#fdba74" strokeOpacity="0.22" strokeWidth="0.5" />

      {/* T — classic serif crossbar + stem */}
      <g fill="url(#st-mono)">
        <path d="M 16 22 Q 16 20 18 20 L 46 20 Q 48 20 48 22 L 48 25 Q 48 27 46 27 L 36 27 L 36 47 Q 36 49 38 50 L 41 51.5 Q 42 52 42 53 L 42 53.5 Q 42 54 41 54 L 23 54 Q 22 54 22 53.5 L 22 53 Q 22 52 23 51.5 L 26 50 Q 28 49 28 47 L 28 27 L 18 27 Q 16 27 16 25 Z" />
      </g>

      {/* S — overlaid, custom serif with thick/thin contrast */}
      <g fill="url(#st-mono)">
        <path d="M 40.5 30.5
                 Q 40.5 29 39 28.2
                 Q 37.5 27.4 35.5 27.4
                 Q 31.7 27.4 29.2 29.2
                 Q 27 30.9 27 33.6
                 Q 27 36.1 29 37.6
                 Q 31 39 34.8 40
                 Q 37.5 40.6 38.5 41.4
                 Q 39.5 42.1 39.5 43.3
                 Q 39.5 44.8 38 45.6
                 Q 36.7 46.3 34.7 46.3
                 Q 32.2 46.3 30.5 45.1
                 Q 28.8 43.8 28.3 41.7
                 L 26.3 41.7
                 Q 26.8 44.9 29.3 46.9
                 Q 32 49 35.5 49
                 Q 39.5 49 42 47.1
                 Q 44.2 45.4 44.2 42.5
                 Q 44.2 40 42.2 38.5
                 Q 40.2 37.1 36.5 36.1
                 Q 33.5 35.4 32.2 34.5
                 Q 31.2 33.8 31.2 32.8
                 Q 31.2 31.5 32.5 30.8
                 Q 34 30 35.8 30
                 Q 37.8 30 39.2 31
                 Q 40.7 32 41.2 33.8
                 L 43.2 33.8
                 Q 42.7 31.5 40.5 30.5 Z" />
      </g>

      {/* Tongue of flame above the crossbar */}
      {withFlame && (
        <g transform="translate(32 10)">
          <path
            d="M 0 -1
               C -2.2 1.5, -2.7 4, -1.2 6.5
               C -0.5 4.8, 0.2 4, 0.5 2.8
               C 0.7 4.8, 2 5.8, 2.2 7.8
               C 2.5 10.5, 1 12, -0.8 12
               C -2.7 12, -4.2 10.5, -4.2 7.8
               C -4.2 4.8, -2.2 2.2, 0 -1 Z"
            fill="url(#st-flame)"
          />
        </g>
      )}
    </svg>
  );
});

export default Logo;
