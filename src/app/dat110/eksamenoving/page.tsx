"use client";

import Link from "next/link";

const oppgaver = [
  { id: 1, label: "Oppg 1", title: "Flervalg", weight: "10%", description: "10 flervalgssporsmol som dekker hele pensum fra begge boker. Tester bred forstaelse av alle kapitler.", format: "10 sporsmol med 4 alternativer", chapters: ["Alle CN- og DS-kapitler"], color: "emerald" },
  { id: 2, label: "Oppg 2", title: "Oblig-prosjekt", weight: "10%", description: "Sporsmol om arkitektur, konsepter og design-valg fra de obligatoriske prosjektene.", format: "Aapne sporsmol om prosjektarkitektur", chapters: ["Prosjekt 1: RPC", "Prosjekt 2: Pub/Sub", "Prosjekt 3: DHT"], color: "purple" },
  { id: 3, label: "Oppg 3", title: "Forsinkelser", weight: "10%", description: "Beregn sending-, forplantnings-, ko- og prosesseringsforsinkelse. Trafikkintensitet og gjennomstromning.", format: "Beregningsoppgaver med formler", chapters: ["CN 1: Nettverksmetrikker"], color: "network" },
  { id: 4, label: "Oppg 4", title: "Protokoller", weight: "10%", description: "TCP 3-veis handshake, UDP-segmentering, IP-header-felt og protokollmekanismer.", format: "Tegn og forklar protokollmekansimer", chapters: ["CN 3: Transport", "CN 4: Nettverk"], color: "network" },
  { id: 5, label: "Oppg 5", title: "Ruting", weight: "10%", description: "CIDR-adressering, longest-prefix match, avstandsvektoralgoritme og forwarding-tabell.", format: "Beregninger og tabelloppgaver", chapters: ["CN 4-5: IP og ruting"], color: "network" },
  { id: 6, label: "Oppg 6", title: "ARP og Switch", weight: "10%", description: "ARP-tabell, switch self-learning, MAC-adresser og Ethernet-rammer.", format: "Steg-for-steg nettverksscenario", chapters: ["CN 6: Linklaget"], color: "network" },
  { id: 7, label: "Oppg 7", title: "RPC", weight: "~7.5%", description: "Remote Procedure Call: arkitektur, feilklasser, klient- og server-stubs.", format: "Forklar og analyser RPC-scenarier", chapters: ["DS 4: Kommunikasjon"], color: "blue" },
  { id: 8, label: "Oppg 8", title: "Overlay og multicast", weight: "~7.5%", description: "Overlay-nettverk, Relative Delay Penalty, multicast-trar og gossip.", format: "Beregn RDP og analyser overlay", chapters: ["DS 4: Kommunikasjon"], color: "blue" },
  { id: 9, label: "Oppg 9", title: "Konsistens og klokker", weight: "10%", description: "Lamport-klokker, vektorklokker, konsistensmodeller og happens-before.", format: "Tidsdiagram og klokkeoppdatering", chapters: ["DS 5: Koordinering", "DS 7: Konsistens"], color: "blue" },
  { id: 10, label: "Oppg 10", title: "DHT/Chord", weight: "15%", description: "Chord-ring, fingertabeller, nokkelansvar, O(log N) oppslag og noder join/leave.", format: "Beregn fingertabell og sok etter nokler", chapters: ["DS 6: Navngiving og DHT"], color: "blue" },
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
        <span className="text-[var(--foreground)]">Eksamensorving</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Eksamensorving</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        DAT110-eksamen har alltid 10 oppgaver med fast struktur. Ov pA hver
        oppgavetype med quiz, flashcards og forklaringer koblet til relevant teori.
      </p>

      <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
          Slik bruker du denne seksjonen
        </h3>
        <ul className="text-sm text-emerald-900 dark:text-emerald-200 space-y-1 list-disc list-inside">
          <li>Velg en oppgavetype du vil ove pA</li>
          <li>Les formatet og hva som typisk sporres om</li>
          <li>Test deg selv med quiz og flashcards</li>
          <li>Folg lenkene til relevant teori i CN/DS-kapitlene</li>
        </ul>
      </div>

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
