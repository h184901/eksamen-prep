"use client";

import Link from "next/link";

const topics = [
  {
    id: "nettverk",
    slug: "nettverk",
    title: "Nettverkslag og protokoller",
    description:
      "TCP/IP-modellen, HTTP, DNS, UDP, TCP, forsinkelser og gjennomstrømning",
    weight: "~30%",
    icon: "globe",
  },
  {
    id: "ruting",
    slug: "ruting",
    title: "IP-ruting og adressering",
    description:
      "IPv4-datagram, fragmentering, CIDR, longest-prefix matching, avstandsvektoralgoritme",
    weight: "~25%",
    icon: "route",
  },
  {
    id: "distribuerte",
    slug: "distribuerte",
    title: "Distribuerte systemer",
    description:
      "RPC, konsistensmodeller, replikering, feiltoleranse, klokkesett og overlay-nettverk",
    weight: "~30%",
    icon: "network",
  },
  {
    id: "chord",
    slug: "chord",
    title: "DHT og Chord",
    description:
      "Distribuert hash-tabell, fingertabeller, nøkkelansvar og skalerbar søking — O(log n)",
    weight: "~15%",
    icon: "ring",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  route: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  network: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  ring: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  clipboard: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function DAT110Page() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">DAT110 Nettverksteknologi</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">DAT110 Nettverksteknologi</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Nettverksprotokoller (TCP/IP, HTTP, DNS), IP-adressering og ruting,
          distribuerte systemer, feiltoleranse og Chord DHT.
        </p>
      </div>

      {/* Eksamenformat */}
      <div className="rounded-xl border-2 border-network-400/40 bg-gradient-to-br from-network-50 to-blue-50 dark:from-network-950/30 dark:to-blue-950/20 p-6 mb-10">
        <h2 className="font-bold text-lg mb-3 text-network-700 dark:text-network-400">
          Eksamenformat
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          10 oppgaver à 10–15% — alltid samme struktur. Oppgave 2 handler alltid om det obligatoriske
          prosjektet. Oppgave 10 (DHT/Chord, 15%) er den tyngste enkeltoppgaven.
        </p>
        <div className="grid sm:grid-cols-5 gap-2">
          {[
            { label: "Oppg. 1", topic: "Multiple choice", pct: "10%" },
            { label: "Oppg. 2", topic: "Oblig-prosjekt", pct: "10%" },
            { label: "Oppg. 3–6", topic: "Nettverkslag", pct: "40%" },
            { label: "Oppg. 7–9", topic: "Distribuerte sys.", pct: "25%" },
            { label: "Oppg. 10", topic: "DHT/Chord", pct: "15%" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-network-200 dark:border-network-800/40 p-3 text-center"
            >
              <p className="text-xs font-medium text-[var(--muted)] mb-1">
                {item.label}
              </p>
              <p className="font-bold text-xs">{item.topic}</p>
              <p className="text-xs font-bold text-network-600 dark:text-network-400 mt-1">
                {item.pct}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hurtigtips */}
      <div className="rounded-xl border border-amber-400/40 bg-amber-50 dark:bg-amber-950/20 p-4 mb-10">
        <h3 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">
          Gjentakende mønstre fra alle eksamener (2022–2025)
        </h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
          <li>Forsinkelsesberegning: L/R (sending), d/s (forplantning), sum av alle fire typer</li>
          <li>Avstandsvektoralgoritme: initialiser, oppdater med Bellman-Ford, vis steg for steg</li>
          <li>CIDR og binær konvertering: longest-prefix matching i forwardingstabell</li>
          <li>ARP-tabell og switch-tabell: læringsalgoritmen, hva skjer steg for steg</li>
          <li>DHT/Chord fingertabell: succ(n + 2^(i-1)), nøkkelansvar, O(log n) søking</li>
          <li>Konsistensmodeller: klient-sentrert vs data-sentrert — vit forskjellen</li>
          <li>RPC-feil: de fem klassene — klient finner ikke server, req/reply lost, krasj</li>
          <li>Overlay RDP = overlay-sti / beste fysiske sti — nær 1.0 er effektivt</li>
        </ul>
      </div>

      {/* Emner */}
      <h2 className="text-xl font-bold mb-4">Emner</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/dat110/${topic.slug}`}
            className="group rounded-xl border-2 border-network-500/30 hover:border-network-500/60 bg-[var(--card)] p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-network-100 dark:bg-network-900/30 text-network-600 dark:text-network-400 flex items-center justify-center">
                {iconMap[topic.icon]}
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
                {topic.weight}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-network-600 dark:group-hover:text-network-400 transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-[var(--muted)]">{topic.description}</p>
          </Link>
        ))}
      </div>

      {/* Verktøy */}
      <h2 className="text-xl font-bold mb-4">Verktøy</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/dat110/eksamen"
          className="group relative overflow-hidden rounded-xl border-2 border-red-400/40 hover:border-red-400/80 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
              {iconMap.target}
            </div>
            <h3 className="font-bold text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Eksamensoppgaver
            </h3>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Alle 5 eksamener (2022–2025) med fullstendige løsningsforslag — sorterbart etter tema
          </p>
        </Link>
      </div>
    </div>
  );
}
