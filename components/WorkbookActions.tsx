"use client";

import Link from "next/link";

export default function WorkbookActions() {
  return (
    <div className="mt-5 flex flex-wrap gap-2 no-print">
      <button
        onClick={() => typeof window !== "undefined" && window.print()}
        className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
      >
        ↓ Print or save as PDF
      </button>
      <Link
        href="/course"
        className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
      >
        Back to the course
      </Link>
    </div>
  );
}
