"use client";

import Link from "next/link";

const oppgaver = [
  { id: 1, label: "Oppg 1", title: "Flervalg", weight: "10%", description: "10 flervalgsspørsmål som dekker hele pensum fra begge bøker. Tester bred forståelse av alle kapitler.", format: "10 spørsmål med 3–4 alternativer", chapters: ["Alle CN- og DS-kapitler"], color: "emerald" },
  { id: 2, label: "Oppg 2", title: "Oblig-prosjekt", weight: "10%", description: "Spørsmål om arkitektur, konsepter og design-valg fra de obligatoriske prosjektene.", format: "Åpne spørsmål om prosjektarkitektur", chapters: ["Prosjekt 1: RPC", "Prosjekt 2: Pub/Sub", "Prosjekt 3: DHT"], color: "purple" },
  { id: 3, label: "Oppg 3", title: "Forsinkelser", weight: "10%", description: "Beregn sendings-, forplantnings-, kø- og prosesseringsforsinkelse. Trafikkintensitet og gjennomstrømning.", format: "Beregningsoppgaver med formler", chapters: ["CN 1: Nettverksmetrikker"], color: "network" },
  { id: 4, label: "Oppg 4", title: "Protokoller", weight: "10%", description: "IP-headerfelt, TCP/UDP-forskjeller, pålitelig dataoverføring og protokollmekanismer.", format: "Forklar felt og mekanismer", chapters: ["CN 3: Transport", "CN 4: Nettverk"], color: "network" },
  { id: 5, label: "Oppg 5", title: "Ruting", weight: "10%", description: "Avstandsvektoralgoritme med Bellman-Ford. Steg-for-steg oppdatering av DV-tabeller.", format: "Beregninger og tabelloppgaver", chapters: ["CN 4–5: IP og ruting"], color: "network" },
  { id: 6, label: "Oppg 6", title: "ARP og Switch", weight: "10%", description: "ARP-tabell, switch self-learning, CIDR-adressering og forwardingtabell.", format: "Steg-for-steg nettverksscenario", chapters: ["CN 6: Linklaget"], color: "network" },
  { id: 7, label: "Oppg 7", title: "DS-teori", weight: "5%", description: "Serverdesign, transparens, stateful/stateless, synkron/asynkron kommunikasjon.", format: "Korte åpne spørsmål (2–3 setninger)", chapters: ["DS 3–4: Prosesser og kommunikasjon"], color: "blue" },
  { id: 8, label: "Oppg 8", title: "Overlay og multicast", weight: "10%", description: "Tegn overlay-graf, beregn RDP og sammenlign multicast-trær.", format: "Tegn graf, beregn RDP og trækostnad", chapters: ["DS 4: Kommunikasjon"], color: "blue" },
  { id: 9, label: "Oppg 9", title: "Konsistens og klokker", weight: "10%", description: "Vektorklokker, RPC-feilklasser, replikering og feiltoleranse.", format: "Vektorklokke-beregning + teori", chapters: ["DS 5: Koordinering", "DS 7–8: Konsistens og feiltoleranse"], color: "blue" },
  { id: 10, label: "Oppg 10", title: "DHT/Chord", weight: "15%", description: "Chord-ring, fingertabeller, nøkkelansvar og steg-for-steg oppslag.", format: "Beregn fingertabell, finn nøkkelansvar, vis oppslag", chapters: ["DS 6: Navngiving og DHT"], color: "blue" },
];

const colorStyles: Record<string, { border: string; badge: string; accent: string }> = {
  emerald: {
    border: "border-emerald-400/30 hover:border-emerald-400/60",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  purple: {
    border: "border-purple-400/30 hover:border-purple-400/60",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    accent: "text-purple-600 dark:text-purple-400",
  },
  network: {
    border: "border-network-400/30 hover:border-network-400/60",
    badge: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
    accent: "text-network-600 dark:text-network-400",
  },
  blue: {
    border: "border-blue-400/30 hover:border-blue-400/60",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    accent: "text-blue-600 dark:text-blue-400",
  },
};

export default function EksamenovingPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamensøving</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Eksamensøving</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        DAT110-eksamen har alltid 10 oppgaver med fast struktur. Øv på hver
        oppgavetype med quiz, flashcards, forklaringer og ekte eksamensoppgaver
        fra 2022–2025 med trinnvise løsninger.
      </p>

      {/* Oppsummering og Eksamensoppgaver widgets */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/dat110/eksamenoving/oppsummering"
          className="group relative overflow-hidden rounded-xl border-2 border-amber-400/40 hover:border-amber-400/80 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-bold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Oppsummering
            </h3>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Komplett referanseark med alle formler, nøkkelkonsepter, tabeller og
            strategier — alt du må kunne til eksamen i én oversikt.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["Formler", "Tabeller", "Konsepter", "Strategier"].map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {tag}
              </span>
            ))}
          </div>
        </Link>

        <Link
          href="/dat110/eksamenoving/eksamensoppgaver"
          className="group relative overflow-hidden rounded-xl border-2 border-red-400/40 hover:border-red-400/80 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/20 p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="font-bold text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Eksamensoppgaver
            </h3>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Grundig gjennomgang av alle eksamener (2022–2025) med strategi,
            steg-for-steg løsninger, illustrasjoner og hint.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {["2022", "Jan 2024", "Mai 2024", "Jan 2025"].map((year) => (
              <span key={year} className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {year}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
          Slik bruker du denne seksjonen
        </h3>
        <ul className="text-sm text-emerald-900 dark:text-emerald-200 space-y-1 list-disc list-inside">
          <li>Hver oppgavetype har tre faner: <strong>Oversikt</strong> (strategi og nøkkelkonsepter), <strong>Tidligere oppgaver</strong> (ekte eksamensoppgaver med løsninger), og <strong>Øving</strong> (flashcards og quiz)</li>
          <li>Start med <strong>Oppsummering</strong> for en komplett oversikt over alt du må kunne</li>
          <li>Bruk <strong>Eksamensoppgaver</strong> for å gå gjennom hele eksamener med grundig gjennomgang</li>
          <li>Test deg selv med flashcards og quiz under øving-fanen for hver oppgavetype</li>
          <li>Følg lenkene til relevant teori i CN/DS-kapitlene for å lese mer</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold mb-4">10 oppgavetyper</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {oppgaver.map((oppg) => {
          const styles = colorStyles[oppg.color];
          return (
            <Link
              key={oppg.id}
              href={`/dat110/eksamenoving/oppg-${oppg.id}`}
              className={`group rounded-xl border-2 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 bg-[var(--card)] ${styles.border}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${styles.badge}`}>
                  {oppg.weight}
                </span>
                <span className="text-[10px] text-[var(--muted)]">{oppg.format}</span>
              </div>
              <p className={`text-xs font-bold mb-0.5 ${styles.accent}`}>{oppg.label}</p>
              <h2 className="text-lg font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                {oppg.title}
              </h2>
              <p className="text-sm text-[var(--muted)] mb-3">{oppg.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {oppg.chapters.map((ch) => (
                  <span key={ch} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                    {ch}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
