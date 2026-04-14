"use client";

import Link from "next/link";
import { QuizSet } from "@/components/QuizQuestion";
import { FlashcardDeck } from "@/components/Flashcard";

const flashcards = [
  { front: "Hva er de fire typene forsinkelse i et pakkesvitsjet nettverk?", back: "Prosessering, ko (queuing), sending (transmission) og forplantning (propagation)." },
  { front: "Hva er forskjellen mellom TCP og UDP?", back: "TCP: tilkoblingsbasert, palitelig, flytkontroll, metningskontroll. UDP: tilkoblingslost, ingen garantier, raskere." },
  { front: "Hva er ARP (Address Resolution Protocol)?", back: "Protokoll som mapper IP-adresser til MAC-adresser pA lokalt nettverk (LAN). Bruker broadcast ARP-request." },
  { front: "Hva betyr transparency i distribuerte systemer?", back: "Skjule at systemet er distribuert. Typer: location, migration, replication, concurrency, failure transparency." },
  { front: "Hva er Chord DHT?", back: "Distribuert hash-tabell med ring-topologi. Nokkler plasseres pA noder med konsistent hashing. O(log N) oppslag via fingertabell." },
  { front: "Hva er forskjellen mellom link-state og distance-vector ruting?", back: "LS: alle noder kjenner hele topologien (Dijkstra). DV: noder kjenner kun naboers kostnader (Bellman-Ford, distribuert)." },
  { front: "Hva er RPC (Remote Procedure Call)?", back: "Lar et program kalle en prosedyre pA en annen maskin som om den var lokal. Stubs handterer marshalling/unmarshalling." },
  { front: "Hva er CIDR-notasjon?", back: "Classless Inter-Domain Routing. Format: a.b.c.d/x der x = antall nettverksbiter. F.eks. 200.23.16.0/23 = 512 adresser." },
  { front: "Hva er vektorklokker?", back: "Hver prosess har en vektor med en klokke per prosess. Fanger opp kausalitet (happens-before) — bedre enn Lamport-klokker." },
  { front: "Hva er MQTT QoS-nivoene?", back: "QoS 0: at-most-once (fire-and-forget). QoS 1: at-least-once (ACK). QoS 2: exactly-once (4-veis handshake)." },
];

const quizQuestions = [
  {
    question: "Hvilken forsinkelsestype avhenger av pakkestorrelse og linkkapasitet?",
    options: ["Propageringsforsinkelse", "Sendingsforsinkelse (transmission)", "Ko-forsinkelse", "Prosesseringsforsinkelse"],
    correctIndex: 1,
    explanation: "Sendingsforsinkelse = L/R, der L er pakkestorrelse (bits) og R er linkkapasitet (bps). Propagering avhenger av avstand/hastighet.",
  },
  {
    question: "Hva skjer i TCP 3-veis handshake?",
    options: ["SYN, ACK, DATA", "SYN, SYN-ACK, ACK", "SYN, SYN, ACK", "ACK, SYN-ACK, SYN"],
    correctIndex: 1,
    explanation: "Klienten sender SYN, serveren svarer med SYN-ACK, og klienten bekrefter med ACK. Da er forbindelsen opprettet.",
  },
  {
    question: "Hva brukes longest-prefix match til?",
    options: ["DNS-oppslag", "ARP-oppslag", "IP-forwarding i rutere", "MAC-adresse-laring i switcher"],
    correctIndex: 2,
    explanation: "Rutere bruker longest-prefix match for a finne riktig utgaende grensesnitt i forwardingtabellen nar flere regler matcher.",
  },
  {
    question: "Hvor mange feilklasser har RPC?",
    options: ["3", "4", "5", "6"],
    correctIndex: 2,
    explanation: "5 klasser: 1) Klient finner ikke server, 2) Request tapt, 3) Server krasjer, 4) Reply tapt, 5) Klient krasjer.",
  },
  {
    question: "I Chord DHT med m=5 bits, hva er FT[3] for node 4?",
    options: ["succ(4 + 2) = succ(6)", "succ(4 + 4) = succ(8)", "succ(4 + 8) = succ(12)", "succ(4 + 3) = succ(7)"],
    correctIndex: 1,
    explanation: "FT[i] = succ(n + 2^(i-1)). For i=3: succ(4 + 2^2) = succ(4 + 4) = succ(8). Finn noden som er ansvarlig for nokkel 8.",
  },
  {
    question: "Hvilken konsistensmodell tillater at klienter alltid ser sine egne oppdateringer?",
    options: ["Sekvensiell konsistens", "Read-your-writes konsistens", "Monotonic reads", "Kausal konsistens"],
    correctIndex: 1,
    explanation: "Read-your-writes: en prosess ser alltid effekten av sine egne skriveoperasjoner. Det er en klient-sentrert modell.",
  },
  {
    question: "Hva er en switch sin self-learning-algoritme?",
    options: [
      "Switchen sender ARP-foresporsler til alle porter",
      "Switchen laerer MAC-adresser fra innkommende rammer og lagrer port-mapping",
      "Switchen bruker Dijkstras algoritme for a finne beste sti",
      "Switchen oppdaterer sin forwarding-tabell fra en sentral server"
    ],
    correctIndex: 1,
    explanation: "Nar en ramme ankommer pA en port, lagrer switchen kildens MAC-adresse og portnummeret i sin switchtabell. Ukjente destinasjoner flodes.",
  },
  {
    question: "Hva er Relative Delay Penalty (RDP)?",
    options: [
      "Forsinkelse i overlay / forsinkelse i underliggende nettverk",
      "Sendeforsinkelse / propageringsforsinkelse",
      "RTT / enveis forsinkelse",
      "Forsinkelse med kryptering / forsinkelse uten"
    ],
    correctIndex: 0,
    explanation: "RDP = overlay-sti-forsinkelse / optimal fysisk sti-forsinkelse. RDP = 1.0 betyr at overlayet er like effektivt som det fysiske nettverket.",
  },
];

export default function Oppg1Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 1: Flervalg</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 1: Flervalg</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        10 flervalgssporsmol som dekker hele pensum. Hvert sporsmol har 4
        alternativer og tester bred forstaelse av bade CN- og DS-boken.
      </p>

      <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
          Tips til flervalg
        </h3>
        <ul className="text-sm text-emerald-900 dark:text-emerald-200 space-y-1 list-disc list-inside">
          <li>Les alle alternativene for du svarer — det er ofte to som ligner</li>
          <li>Eliminer alternativer du vet er feil forst</li>
          <li>Flervalgssporsmolene kommer fra ALLE kapitler — bred oversikt lonner seg</li>
          <li>Typiske emner: forsinkelsestyper, protokollforskjeller, konsistensmodeller, DHT-begreper</li>
        </ul>
      </div>

      {/* Relevant chapters */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Relevante kapitler</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[
            { href: "/dat110/cn-1", label: "CN 1", title: "Nettverksintroduksjon" },
            { href: "/dat110/cn-2", label: "CN 2", title: "Applikasjonslaget" },
            { href: "/dat110/cn-3", label: "CN 3", title: "Transportlaget" },
            { href: "/dat110/cn-4", label: "CN 4-5", title: "Nettverkslaget" },
            { href: "/dat110/cn-6", label: "CN 6", title: "Linklaget" },
            { href: "/dat110/cn-8", label: "CN 8", title: "Sikkerhet" },
            { href: "/dat110/ds-1", label: "DS 1", title: "Intro dist. systemer" },
            { href: "/dat110/ds-3", label: "DS 3", title: "Prosesser og trader" },
            { href: "/dat110/ds-4", label: "DS 4", title: "Kommunikasjon" },
            { href: "/dat110/ds-5", label: "DS 5", title: "Koordinering" },
            { href: "/dat110/ds-6", label: "DS 6", title: "Navngiving og DHT" },
            { href: "/dat110/ds-7", label: "DS 7", title: "Konsistens" },
          ].map((ch) => (
            <Link
              key={ch.href}
              href={ch.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm"
            >
              <span className="font-bold text-xs text-network-600 dark:text-network-400">{ch.label}</span>
              <span>{ch.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Flashcards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk pA kortet for a se svaret. Ov til du kan alle uten a nole.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      {/* Quiz */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Ov-quiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Test deg selv med sporsmol som ligner pA eksamen. Velg riktig alternativ.
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
