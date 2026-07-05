import next from "eslint-config-next/core-web-vitals";

// Next 16 removed `next lint`; ESLint is invoked directly. eslint-config-next
// v16 ships a native flat config array, so spread it in directly.
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
      "scripts/**",
      "**/*.mjs",
    ],
  },
  ...next,
  {
    rules: {
      // The app deliberately uses <img> for a few remote CDN flags rather than
      // next/image (unused by design). Keep as a hint, not a failure.
      "@next/next/no-img-element": "warn",

      // Content-heavy devotional/Scripture prose legitimately contains
      // apostrophes and quotes in JSX text; React escapes these safely, so
      // this legacy rule is pure noise here.
      "react/no-unescaped-entities": "off",

      // Next 16 bundles the new, aggressive React-Compiler hook rules. They
      // fire en masse on the app's intentional SSR-safe pattern (reading
      // localStorage in a mount effect and calling setState for hydration).
      // Keep them as visible hints rather than hard failures — flipping them
      // to errors would demand a risky, app-wide hook refactor with no bug
      // behind it.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/immutability": "warn",
    },
  },
];

export default config;
