export const metadata = {
  title: "Local Body Connect — Scripture Theory",
  description:
    "We exist under, not over, the local church. Local Body Connect hands each disciple off to a real pastor — not just a pin on a map.",
};

const principles = [
  {
    title: "We are a bridge, not a destination.",
    body: "Scripture Theory is designed to make itself the second-most-used Christian tool in your life. Your local church should always be first.",
  },
  {
    title: "Warm intros, not cold pins.",
    body: "Instead of a map of churches you'll never visit, we connect you to a vetted local pastor or small-group leader with a brief, optional introduction.",
  },
  {
    title: "Confession-honest filtering.",
    body: "Filter by language, distance, accessibility, and tradition — Orthodox, Catholic, Anglican, Reformed, Lutheran, Wesleyan, Baptist, Pentecostal, Anabaptist, African-Independent, Messianic, Non-denominational.",
  },
  {
    title: "Pastor in the loop.",
    body: "Local pastors can claim their listing, set their discipleship culture, and over-ride AI answers for their own congregation.",
  },
];

const pilots = [
  { city: "Lagos, Nigeria", note: "African Independent + Pentecostal + Anglican" },
  { city: "São Paulo, Brazil", note: "Pentecostal + Roman Catholic + Reformed" },
  { city: "Manila, Philippines", note: "Roman Catholic + Evangelical + Charismatic" },
  { city: "Nairobi, Kenya", note: "Anglican + Pentecostal + Reformed" },
  { city: "Phoenix, USA", note: "Non-denominational + Roman Catholic + Reformed" },
];

export default function ConnectPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">One Body</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">
        Jesus has one Church. Find your room in it.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The Christian life is not lived alone. Jesus prayed His people would be one — and He has
        a real, local body of His people near you. We exist to introduce you to them, not to
        replace them.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white border border-ink-200 p-6">
            <div className="font-serif text-xl text-ink-900">{p.title}</div>
            <p className="mt-2 text-ink-700 leading-relaxed text-sm">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-ink-200 bg-ink-50 p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">Five pilot cities (Q3)</h2>
        <p className="mt-2 text-sm text-ink-600">
          We are starting where the global Church is most plural and most growing.
        </p>
        <ul className="mt-5 grid md:grid-cols-5 gap-3">
          {pilots.map((p) => (
            <li
              key={p.city}
              className="rounded-xl bg-white border border-ink-200 p-4"
            >
              <div className="font-serif text-ink-900">{p.city}</div>
              <div className="text-xs text-ink-500 mt-1 leading-snug">{p.note}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 rounded-2xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl">
          "And let us consider how to stir up one another to love and good works, not neglecting to
          meet together..."
        </p>
        <p className="mt-2 text-ink-300">Hebrews 10:24–25</p>
      </div>
    </section>
  );
}
