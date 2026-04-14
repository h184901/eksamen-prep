"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er CIDR-notasjon?", back: "Classless Inter-Domain Routing. a.b.c.d/x der x = antall nettverksbiter. Eks: 200.23.16.0/23 gir 2^(32-23) = 512 adresser." },
  { front: "Hva er longest-prefix match?", back: "Ruter matcher dest-IP mot forwardingtabell og velger oppforingen med lengst matchende prefiks. Mer spesifikk rute vinner." },
  { front: "Hva er Bellman-Ford-ligningen?", back: "dx(y) = min_v { c(x,v) + dv(y) } — korteste avstand fra x til y er minimum over alle naboer v av (kostnad til v + vs avstand til y)." },
  { front: "Hvordan fungerer avstandsvektoralgoritmen?", back: "Iterativt: 1) Initialiser (0 til seg selv, uendelig til alle andre). 2) Motta DV fra naboer. 3) Oppdater med Bellman-Ford. 4) Send oppdatert DV til naboer. Gjenta til stabil." },
  { front: "Hva er count-to-infinity-problemet?", back: "I DV-ruting: nar en link feiler, kan noder telle kostnaden oppover mot uendelig fordi de tror naboen har en sti. Loses med poison reverse." },
  { front: "Hva er forskjellen pA link-state og distance-vector?", back: "LS: global info (hele topologien), Dijkstra, raskere konvergens. DV: lokal info (kun naboer), Bellman-Ford, distribuert, kan ha count-to-infinity." },
];

const quizQuestions = [
  {
    question: "IP-adressen 192.168.1.0/26 gir hvor mange brukbare host-adresser?",
    options: ["26", "62", "64", "256"],
    correctIndex: 1,
    explanation: "26 nettverksbiter -> 32-26 = 6 host-biter -> 2^6 = 64 adresser. Minus nettverks- og broadcast-adresse = 62 brukbare.",
  },
  {
    question: "En ruter har to oppforinger: 200.23.16.0/20 og 200.23.18.0/23. En pakke til 200.23.18.5 matcher hvilken?",
    options: ["200.23.16.0/20", "200.23.18.0/23", "Begge like", "Ingen"],
    correctIndex: 1,
    explanation: "Begge matcher, men /23 er lengre (mer spesifikk). Longest-prefix match velger /23.",
  },
  {
    question: "I avstandsvektoralgoritmen, hva er initial-verdien for avstand til seg selv?",
    options: ["1", "Uendelig", "0", "Antall naboer"],
    correctIndex: 2,
    explanation: "Avstanden fra en node til seg selv er alltid 0. Avstand til alle andre initialiseres til uendelig (eller direkte link-kostnad for naboer).",
  },
  {
    question: "Hva er poison reverse brukt til?",
    options: ["Kryptere rutingmeldinger", "Forhindre count-to-infinity", "Fjerne doble ruter", "Balansere last mellom linker"],
    correctIndex: 1,
    explanation: "Poison reverse: en node annonserer uendelig kostnad tilbake til naboen den ruter gjennom. Forhindrer rutinglooper.",
  },
  {
    question: "En forwardingtabell har oppforinger for /0, /16, /24 og /32. Hvilken prefereres?",
    options: ["/0 (default route)", "/16", "/24", "/32 (mest spesifikk)"],
    correctIndex: 3,
    explanation: "Longest-prefix match: /32 er lengst og mest spesifikk. /0 er default route som kun brukes nar ingen annen matcher.",
  },
];

export default function Oppg5Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 5: Ruting</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 5: Ruting</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        CIDR-adressering, subnett, longest-prefix match, avstandsvektoralgoritme
        og forwardingtabeller. Typisk: beregn DV steg-for-steg eller finn riktig
        rute i forwardingtabell.
      </p>

      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-network-700 dark:text-network-400 mb-2">
          Strategi
        </h3>
        <ol className="text-sm text-network-900 dark:text-network-200 space-y-1 list-decimal list-inside">
          <li>Konverter IP-adresser til binar for CIDR-oppgaver</li>
          <li>Tell nettverksbiter og beregn antall adresser (2^host-biter)</li>
          <li>For DV: sett opp initialtabell, oppdater med Bellman-Ford per runde</li>
          <li>For forwarding: match dest-IP mot tabellen, bruk longest prefix</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/cn-4" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 4-5</span>
          <span>Nettverkslaget og ruting</span>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Ov-quiz</h2>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
