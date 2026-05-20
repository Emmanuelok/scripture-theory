"use client";

import { Component, type ReactNode } from "react";

/**
 * Local error boundary for the SVG figure cards. Stops one broken
 * figure from blanking the page — falls back to a quiet "this figure
 * is unavailable" panel that keeps the surrounding content readable.
 */
export default class FigureBoundary extends Component<
  { children: ReactNode; label?: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (typeof console !== "undefined") {
      console.warn("[FigureBoundary]", this.props.label ?? "(unlabeled)", error);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <figure className="rounded-3xl border border-ink-200 bg-card-subtle p-6 text-sm text-ink-600 leading-relaxed">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          {this.props.label ?? "Figure"} · unavailable
        </div>
        <p className="mt-2">
          This figure couldn&apos;t render in your browser right now. The text on the page
          is unchanged — please refresh, or read on. We&apos;ve logged the issue.
        </p>
      </figure>
    );
  }
}
