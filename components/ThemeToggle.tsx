"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE = "scripture-theory-theme";

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const resolved =
    t === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : t;
  html.setAttribute("data-theme", resolved);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      (window.localStorage.getItem(STORAGE) as Theme | null)) || "system";
    setTheme(saved);
    setMounted(true);

    // Listen for system changes when on system mode.
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (window.localStorage.getItem(STORAGE) === "system") applyTheme("system");
    };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  function pick(t: Theme) {
    setTheme(t);
    try {
      window.localStorage.setItem(STORAGE, t);
    } catch {}
    applyTheme(t);
  }

  if (!mounted) {
    return <div className="h-8 w-[110px]" aria-hidden />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center rounded-full border border-ink-200 bg-card p-0.5 shadow-sm"
    >
      <ThemeButton current={theme} value="light" onClick={pick} label="Light">
        {sunIcon}
      </ThemeButton>
      <ThemeButton current={theme} value="system" onClick={pick} label="System">
        {systemIcon}
      </ThemeButton>
      <ThemeButton current={theme} value="dark" onClick={pick} label="Dark">
        {moonIcon}
      </ThemeButton>
    </div>
  );
}

function ThemeButton({
  current,
  value,
  onClick,
  label,
  children,
}: {
  current: Theme;
  value: Theme;
  onClick: (t: Theme) => void;
  label: string;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <button
      role="radio"
      aria-checked={active}
      aria-label={label}
      title={label}
      onClick={() => onClick(value)}
      className={`inline-flex h-7 w-8 items-center justify-center rounded-full transition-colors ${
        active
          ? "bg-ink-900 text-ink-50"
          : "text-ink-500 hover:text-ink-900"
      }`}
    >
      {children}
    </button>
  );
}

const sunIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const moonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const systemIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M8 20h8M12 18v2" />
  </svg>
);
