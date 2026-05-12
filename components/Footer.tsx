import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 md:grid-cols-4 text-sm text-ink-500">
        <div className="md:col-span-2">
          <div className="font-serif text-ink-900 text-lg">Scripture Theory</div>
          <p className="mt-2 max-w-md leading-relaxed">
            JESUS at the center. The ONE Gospel as our message. The Word as our food. The Body as
            our home. A non-denominational, Christ-centered platform for the world.
          </p>
        </div>
        <div>
          <div className="text-ink-700 font-medium">Day one</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/gospel" className="hover:text-ink-900">The Gospel</Link></li>
            <li><Link href="/read" className="hover:text-ink-900">Read the Word</Link></li>
            <li><Link href="/pray" className="hover:text-ink-900">Pray</Link></li>
            <li><Link href="/witness" className="hover:text-ink-900">Witness</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink-700 font-medium">Grow & go</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/disciple" className="hover:text-ink-900">The Path</Link></li>
            <li><Link href="/connect" className="hover:text-ink-900">One Body (local church)</Link></li>
            <li><Link href="/lens" className="hover:text-ink-900">Jesus in the Word</Link></li>
            <li><Link href="/roadmap" className="hover:text-ink-900">Roadmap</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-200">
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-ink-400 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Scripture Theory.</span>
          <span className="italic">
            "Jesus Christ is the same yesterday and today and forever." — Hebrews 13:8
          </span>
        </div>
      </div>
    </footer>
  );
}
