import Link from "next/link";
import { referenceHref } from "@/lib/reference";

/**
 * Renders a Scripture reference (e.g. "Acts 17:27", "Psalm 23", "Rom 5:6–8")
 * as a hyperlink to the focused single-verse view when the reference has a
 * verse, or to the chapter reader when it's chapter-only. Falls back to a
 * plain span if the reference can't be parsed.
 */
export default function ScriptureRef({
  reference,
  className,
  underline = true,
}: {
  reference: string;
  className?: string;
  /** Set to false for places where you want a hyperlink behavior without an underline (e.g. inside a pill). */
  underline?: boolean;
}) {
  const href = referenceHref(reference);
  if (!href) {
    return <span className={className}>{reference}</span>;
  }
  return (
    <Link
      href={href}
      className={`${className ?? ""} ${
        underline ? "hover:underline" : ""
      } text-flame-700 hover:text-flame-800 transition-colors`}
    >
      {reference}
    </Link>
  );
}
