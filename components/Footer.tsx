export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-6 md:grid-cols-3 text-sm text-ink-500">
        <div>
          <div className="font-serif text-ink-900 text-lg">Scripture Theory</div>
          <p className="mt-2 max-w-sm">
            An inter-denominational, Scripture-centered platform for global discipleship.
            JESUS at the center. The Word as the source. The Body as the home.
          </p>
        </div>
        <div>
          <div className="text-ink-700 font-medium">Pillars</div>
          <ul className="mt-2 space-y-1">
            <li>Encounter — meeting JESUS</li>
            <li>Engage — the Word, faithfully read</li>
            <li>Embody — the Kingdom message lived</li>
            <li>Belong — the local Body</li>
          </ul>
        </div>
        <div>
          <div className="text-ink-700 font-medium">Posture</div>
          <ul className="mt-2 space-y-1">
            <li>Citation-grounded. No invented verses.</li>
            <li>Inter-denominational. Many lenses, one Lord.</li>
            <li>Globally accessible. Built for every tongue.</li>
            <li>Youth-aware. Leader-equipping.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-200">
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-ink-400 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Scripture Theory.</span>
          <span className="italic">
            "Sanctify them in the truth; your word is truth." — John 17:17
          </span>
        </div>
      </div>
    </footer>
  );
}
