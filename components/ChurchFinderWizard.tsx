"use client";

import { useEffect, useState } from "react";
import { formatDistance } from "@/lib/geo";
import type { OsmChurch } from "@/lib/overpass";

type Step = "location" | "distance" | "tradition" | "language" | "results";

const TRADITION_OPTIONS: { id: string; label: string; note?: string }[] = [
  { id: "any", label: "Open to any Christian tradition" },
  { id: "catholic", label: "Roman Catholic" },
  { id: "orthodox", label: "Orthodox", note: "Greek · Russian · Coptic · others" },
  { id: "anglican", label: "Anglican / Episcopal" },
  { id: "baptist", label: "Baptist" },
  { id: "methodist", label: "Methodist" },
  { id: "lutheran", label: "Lutheran" },
  { id: "presbyterian", label: "Presbyterian" },
  { id: "reformed", label: "Reformed" },
  { id: "pentecostal", label: "Pentecostal / Charismatic" },
  { id: "evangelical", label: "Evangelical" },
  { id: "nondenominational", label: "Non-denominational" },
  { id: "adventist", label: "Seventh-day Adventist" },
];

const RADII = [
  { km: 1, label: "Walking distance" },
  { km: 5, label: "Short drive" },
  { km: 15, label: "Across town" },
  { km: 50, label: "Anywhere in the region" },
];

type Place = { lat: number; lng: number; displayName: string };
type DecoratedChurch = OsmChurch & { distanceKm: number };

export default function ChurchFinderWizard() {
  const [step, setStep] = useState<Step>("location");
  const [place, setPlace] = useState<Place | null>(null);
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [tradition, setTradition] = useState<string>("any");
  const [language] = useState<string>("any"); // reserved for OSM extension
  void language;

  const [results, setResults] = useState<DecoratedChurch[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(p: Place, r: number, d: string) {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch(
        `/api/churches/search?lat=${p.lat}&lng=${p.lng}&radius=${r}&denomination=${encodeURIComponent(d)}&limit=30`
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.message || data?.error || "We couldn't reach the church directory.");
      } else {
        setResults((data.churches as DecoratedChurch[]) ?? []);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  function startOver() {
    setStep("location");
    setPlace(null);
    setRadiusKm(5);
    setTradition("any");
    setResults(null);
    setError(null);
  }

  return (
    <div className="space-y-6">
      <Stepper step={step} />

      {step === "location" && (
        <LocationStep
          onPicked={(p) => {
            setPlace(p);
            setStep("distance");
          }}
        />
      )}

      {step === "distance" && (
        <DistanceStep
          value={radiusKm}
          onPick={(km) => {
            setRadiusKm(km);
            setStep("tradition");
          }}
          onBack={() => setStep("location")}
        />
      )}

      {step === "tradition" && (
        <TraditionStep
          value={tradition}
          // CRITICAL: pass the freshly-picked `t` directly into runSearch.
          // If we relied on `tradition` state inside this closure, React's
          // async setState would leave us calling runSearch with the previous
          // value (e.g. "any") even though the user just chose "pentecostal".
          // That's the bug that returned Catholic churches when Pentecostal
          // was selected.
          onPick={(t) => {
            setTradition(t);
            setStep("results");
            if (place) runSearch(place, radiusKm, t);
          }}
          onBack={() => setStep("distance")}
        />
      )}

      {step === "results" && (
        <ResultsStep
          place={place}
          radiusKm={radiusKm}
          tradition={tradition}
          results={results}
          loading={loading}
          error={error}
          onStartOver={startOver}
          onWiden={() => {
            const nextKm = Math.min(50, radiusKm * 2);
            setRadiusKm(nextKm);
            if (place) runSearch(place, nextKm, tradition);
          }}
          onLoosenTradition={() => {
            setTradition("any");
            if (place) runSearch(place, radiusKm, "any");
          }}
        />
      )}
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: Step[] = ["location", "distance", "tradition", "results"];
  const idx = steps.indexOf(step);
  return (
    <ol className="flex gap-2" aria-label="Wizard progress">
      {steps.map((s, i) => (
        <li
          key={s}
          aria-current={i === idx ? "step" : undefined}
          className={`h-1.5 flex-1 rounded-full transition-colors ${i <= idx ? "bg-flame-500" : "bg-ink-200"}`}
        />
      ))}
    </ol>
  );
}

/* —— Step 1: Location —— */

function LocationStep({ onPicked }: { onPicked: (p: Place) => void }) {
  const [q, setQ] = useState("");
  const [matches, setMatches] = useState<Place[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [geoBusy, setGeoBusy] = useState(false);
  const [geoErr, setGeoErr] = useState<string | null>(null);

  async function lookup() {
    const term = q.trim();
    if (!term) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      const results = (data.results ?? []).map((r: { lat: number; lng: number; displayName: string }) => ({
        lat: r.lat, lng: r.lng, displayName: r.displayName,
      }));
      setMatches(results);
    } finally {
      setSearching(false);
    }
  }

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setGeoErr("Your browser doesn't support geolocation. Type a city or address instead.");
      return;
    }
    setGeoBusy(true);
    setGeoErr(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoBusy(false);
        onPicked({ lat: pos.coords.latitude, lng: pos.coords.longitude, displayName: "My location" });
      },
      (err) => {
        setGeoBusy(false);
        setGeoErr(err.message || "We couldn't read your location. Type a city or address instead.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60_000 }
    );
  }

  return (
    <Card eyebrow="Question 1 of 3" title="Where are you?">
      <p className="text-ink-700 leading-relaxed">
        We'll search OpenStreetMap for Christian churches near you. We only show what real
        community contributors have tagged — no fabricated listings.
      </p>

      <div className="mt-6 space-y-3">
        <button
          onClick={useMyLocation}
          disabled={geoBusy}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors disabled:opacity-60"
        >
          {geoBusy ? "Reading your location…" : "📍 Use my current location"}
        </button>
        {geoErr && <p className="text-xs text-amber-700">{geoErr}</p>}

        <div className="text-xs uppercase tracking-widest text-ink-400 pt-2">
          or type a city / address
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); lookup(); }}
          className="flex gap-2"
        >
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Lagos, Nigeria · 123 Main St, Austin · São Paulo"
            className="flex-1 rounded-xl border border-ink-200 bg-card px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-flame-300"
          />
          <button
            type="submit"
            disabled={!q.trim() || searching}
            className="rounded-full bg-flame-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-flame-700 disabled:opacity-60"
          >
            {searching ? "…" : "Search"}
          </button>
        </form>

        {matches && matches.length === 0 && (
          <p className="text-sm text-ink-500">No place matched that. Try a city name.</p>
        )}
        {matches && matches.length > 0 && (
          <ul className="mt-2 rounded-2xl border border-ink-200 bg-card divide-y divide-ink-100 overflow-hidden">
            {matches.map((m, i) => (
              <li key={i}>
                <button
                  onClick={() => onPicked(m)}
                  className="w-full text-left px-4 py-3 hover:bg-ink-100 transition-colors text-sm text-ink-900"
                >
                  {m.displayName}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-6 text-xs text-ink-500 leading-relaxed">
        Your location is sent only to OpenStreetMap (Nominatim) on this device — we don't track it.
      </p>
    </Card>
  );
}

/* —— Step 2: Distance —— */

function DistanceStep({
  value,
  onPick,
  onBack,
}: {
  value: number;
  onPick: (km: number) => void;
  onBack: () => void;
}) {
  return (
    <Card eyebrow="Question 2 of 3" title="How far are you willing to travel?">
      <p className="text-ink-700 leading-relaxed">
        Pick a starting radius. You can widen it on the next screen if needed.
      </p>
      <ul className="mt-6 grid gap-3">
        {RADII.map((r) => (
          <li key={r.km}>
            <button
              onClick={() => onPick(r.km)}
              className={`w-full text-left rounded-2xl border p-5 transition-colors ${
                value === r.km
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-card text-ink-900 border-ink-200 hover:border-flame-500"
              }`}
            >
              <div className="font-serif text-xl">
                {r.label} <span className={value === r.km ? "text-ink-300 text-base" : "text-ink-500 text-base"}>· up to {r.km} km</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <BackLink onClick={onBack} />
    </Card>
  );
}

/* —— Step 3: Tradition —— */

function TraditionStep({
  value,
  onPick,
  onBack,
}: {
  value: string;
  onPick: (t: string) => void;
  onBack: () => void;
}) {
  return (
    <Card eyebrow="Question 3 of 3" title="Any tradition you'd like to start with?">
      <p className="text-ink-700 leading-relaxed">
        Pick a starting point — you can widen this on the next screen. We never gatekeep which
        faithful church a believer can choose; we just help you narrow the first list.
      </p>
      <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
        {TRADITION_OPTIONS.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => onPick(t.id)}
              className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                value === t.id
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-card text-ink-900 border-ink-200 hover:border-flame-500"
              }`}
            >
              <div className="font-serif text-lg">{t.label}</div>
              {t.note && (
                <div className={`text-xs mt-0.5 ${value === t.id ? "text-ink-300" : "text-ink-500"}`}>
                  {t.note}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
      <BackLink onClick={onBack} />
    </Card>
  );
}

/* —— Step 4: Results —— */

function ResultsStep({
  place,
  radiusKm,
  tradition,
  results,
  loading,
  error,
  onStartOver,
  onWiden,
  onLoosenTradition,
}: {
  place: Place | null;
  radiusKm: number;
  tradition: string;
  results: DecoratedChurch[] | null;
  loading: boolean;
  error: string | null;
  onStartOver: () => void;
  onWiden: () => void;
  onLoosenTradition: () => void;
}) {
  const traditionLabel =
    TRADITION_OPTIONS.find((t) => t.id === tradition)?.label ?? "Any";

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <div className="text-xs uppercase tracking-widest text-ink-500">Searching near</div>
          <div className="text-ink-900 font-medium mt-0.5">
            {place?.displayName ?? "your location"}
          </div>
          <div className="text-xs text-ink-500 mt-0.5">
            within {radiusKm} km · {traditionLabel}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onStartOver}
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
          >
            Start over
          </button>
        </div>
      </div>

      {loading && <ResultsSkeleton />}

      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900">
          {error}
        </div>
      )}

      {!loading && results && results.length === 0 && (
        <div className="rounded-3xl border border-ink-200 bg-card p-8 text-center">
          <div className="text-4xl text-ink-300">⛪</div>
          <h3 className="mt-3 font-serif text-xl text-ink-900">No churches matched yet.</h3>
          <p className="mt-2 text-sm text-ink-600 max-w-md mx-auto leading-relaxed">
            OpenStreetMap may not have churches tagged in this area, or your filters may be
            narrow. Try widening the radius, or loosening the tradition.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {radiusKm < 50 && (
              <button
                onClick={onWiden}
                className="rounded-full bg-ink-900 text-ink-50 px-4 py-2 text-xs hover:bg-flame-700"
              >
                Widen to {Math.min(50, radiusKm * 2)} km
              </button>
            )}
            {tradition !== "any" && (
              <button
                onClick={onLoosenTradition}
                className="rounded-full border border-ink-300 bg-card px-4 py-2 text-xs text-ink-800 hover:border-ink-900"
              >
                Try any tradition
              </button>
            )}
          </div>
        </div>
      )}

      {!loading && results && results.length > 0 && (
        <>
          <div className="text-sm text-ink-700">
            <strong className="text-ink-900">{results.length}</strong> church{results.length === 1 ? "" : "es"} found, nearest first.
          </div>
          <ul className="space-y-3">
            {results.map((c) => (
              <ChurchCard key={c.id} church={c} userLat={place?.lat} userLng={place?.lng} />
            ))}
          </ul>
          <p className="text-[11px] text-ink-500 leading-relaxed">
            Data: © OpenStreetMap contributors (ODbL), community-edited. Some entries may be
            incomplete or out of date — please verify with the church directly before visiting.
          </p>
        </>
      )}
    </div>
  );
}

function ChurchCard({
  church,
  userLat,
  userLng,
}: {
  church: DecoratedChurch;
  userLat?: number;
  userLng?: number;
}) {
  const addressBits = [
    church.address.housenumber && church.address.street
      ? `${church.address.housenumber} ${church.address.street}`
      : church.address.street,
    church.address.city,
    church.address.state,
    church.address.postcode,
    church.address.country,
  ].filter(Boolean) as string[];
  const address = church.address.full ?? addressBits.join(", ");

  const directionsUrl = `https://www.google.com/maps/dir/?api=1${
    userLat !== undefined && userLng !== undefined
      ? `&origin=${userLat},${userLng}`
      : ""
  }&destination=${church.lat},${church.lng}`;

  const osmUrl = `https://www.openstreetmap.org/${church.osmType}/${church.id.split("/")[1]}`;

  return (
    <li className="rounded-2xl border border-ink-200 bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif text-xl text-ink-900">{church.name ?? "Unnamed church"}</h3>
        <span className="text-xs uppercase tracking-widest text-flame-700">
          {formatDistance(church.distanceKm)}
        </span>
      </div>

      <div className="mt-1 text-xs text-ink-500">
        {church.denomination ? (
          <span>{church.denomination}</span>
        ) : (
          <span className="italic">Denomination not listed in OpenStreetMap</span>
        )}
      </div>

      {address && (
        <div className="mt-2 text-sm text-ink-700 leading-relaxed">{address}</div>
      )}

      <ul className="mt-3 grid sm:grid-cols-2 gap-1 text-xs text-ink-600">
        {church.serviceTimes && (
          <li><strong className="text-ink-900">Services:</strong> {church.serviceTimes}</li>
        )}
        {church.openingHours && (
          <li><strong className="text-ink-900">Hours:</strong> {church.openingHours}</li>
        )}
        {church.phone && (
          <li>
            <strong className="text-ink-900">Phone:</strong>{" "}
            <a href={`tel:${church.phone}`} className="text-flame-700 hover:underline">{church.phone}</a>
          </li>
        )}
        {church.email && (
          <li>
            <strong className="text-ink-900">Email:</strong>{" "}
            <a href={`mailto:${church.email}`} className="text-flame-700 hover:underline">{church.email}</a>
          </li>
        )}
        {church.wheelchair && church.wheelchair !== "no" && (
          <li><strong className="text-ink-900">Accessibility:</strong> Wheelchair: {church.wheelchair}</li>
        )}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-xs hover:bg-flame-700"
        >
          Directions
        </a>
        {church.website && (
          <a
            href={church.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-ink-300 bg-card px-4 py-1.5 text-xs text-ink-800 hover:border-ink-900"
          >
            Website
          </a>
        )}
        <a
          href={osmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-ink-300 bg-card px-4 py-1.5 text-xs text-ink-600 hover:border-ink-900"
          title="See what OpenStreetMap knows about this church"
        >
          View on OSM
        </a>
      </div>
    </li>
  );
}

function ResultsSkeleton() {
  return (
    <ul className="space-y-3 animate-pulse">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="rounded-2xl border border-ink-200 bg-card p-5">
          <div className="h-4 bg-ink-100 rounded w-2/3" />
          <div className="mt-2 h-3 bg-ink-100 rounded w-1/3" />
          <div className="mt-3 h-3 bg-ink-100 rounded w-4/5" />
        </li>
      ))}
    </ul>
  );
}

function Card({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <div className="text-xs uppercase tracking-widest text-flame-700">{eyebrow}</div>
      <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900 leading-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-5">
      <button onClick={onClick} className="text-xs text-ink-500 hover:text-ink-900">
        ← Back
      </button>
    </div>
  );
}
