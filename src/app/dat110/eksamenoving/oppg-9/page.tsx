"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er Lamport-klokke?", back: "Logisk klokke: LC(e) oker med 1 for lokal hendelse. Ved sending: inkluder LC i melding. Ved mottak: LC = max(egen LC, mottatt LC) + 1. Gir partiell ordning." },
  { front: "Hva er vektorklokke?", back: "Vektor med en klokke per prosess. Fanger kausalitet: a -> b iff VC(a) < VC(b) (alle elementer <=, minst ett <). Kan skille kausal og concurrent." },
  { front: "Hva er forskjellen mellom Lamport- og vektorklokker?", back: "Lamport: LC(a) < LC(b) betyr IKKE at a -> b. Vektorklokker: VC(a) < VC(b) betyr GARANTERT at a -> b. Vektorklokker er sterkere." },
  { front: "Hva er sekvensiell konsistens?", back: "Alle prosesser ser operasjonene i SAMME rekkefølge, og rekkefølgen respekterer programordenen innad i hver prosess. Sterkere enn kausal." },
  { front: "Hva er read-your-writes konsistens?", back: "Klient-sentrert modell: en prosess ser alltid effekten av sine egne skriveoperasjoner. Svakere enn sekvensiell, men viktig i praksis." },
  { front: "Hva er forskjellen pA data-sentrerte og klient-sentrerte konsistensmodeller?", back: "Data-sentrerte: global garanti for alle prosesser (sekvensiell, kausal, eventual). Klient-sentrerte: garantier for EN klients perspektiv (read-your-writes, monotonic reads)." },
  { front: "Hva er happens-before-relasjonen (->)?", back: "a -> b hvis: 1) a og b er i samme prosess og a kommer for b, ELLER 2) a er sending og b er mottak av samme melding. Transitiv: a->b og b->c => a->c." },
];

const quizQuestions = [
  {
    question: "Prosess P1 har VC=(3,1,0), prosess P2 har VC=(2,4,0). Er disse hendelsene kausalt relaterte?",
    options: [
      "P1 -> P2 (P1 skjedde for P2)",
      "P2 -> P1 (P2 skjedde for P1)",
      "De er samtidige (concurrent)",
      "Kan ikke avgjores"
    ],
    correctIndex: 2,
    explanation: "P1[0]=3 > P2[0]=2, men P1[1]=1 < P2[1]=4. Ingen dominerer den andre, sA hendelsene er samtidige (concurrent).",
  },
  {
    question: "I Lamport-klokker, prosess P1 sender melding med LC=5 til P2 som har LC=3. Hva blir P2s nye LC?",
    options: ["4", "5", "6", "8"],
    correctIndex: 2,
    explanation: "Ved mottak: LC = max(egen LC, mottatt LC) + 1 = max(3, 5) + 1 = 6.",
  },
  {
    question: "Hvilken konsistensmodell garanterer at alle prosesser ser skriveoperasjoner i same rekkefølge?",
    options: ["Eventual consistency", "Read-your-writes", "Sekvensiell konsistens", "Monotonic reads"],
    correctIndex: 2,
    explanation: "Sekvensiell konsistens: det finnes en global ordning av alle operasjoner som alle prosesser er enige om, og den respekterer programordenen.",
  },
  {
    question: "Hva er eventual consistency?",
    options: [
      "Alle leser alltid siste skrivning",
      "Uten nye skrivninger konvergerer alle replikaer til samme verdi",
      "Operasjoner utfores i programrekkefølge",
      "Kun en replika kan skrives til"
    ],
    correctIndex: 1,
    explanation: "Eventual consistency: hvis skrivninger stopper, vil alle replikaer til slutt ha same verdi. Ingen garanti om nar. Svakeste modell.",
  },
  {
    question: "To hendelser har Lamport-tid LC(a)=4 og LC(b)=7. Kan vi si at a -> b?",
    options: ["Ja, alltid", "Nei, aldri", "Bare hvis de er i samme prosess", "Nei — LC(a) < LC(b) betyr IKKE at a -> b"],
    correctIndex: 3,
    explanation: "Lamport: a -> b => LC(a) < LC(b), men IKKE omvendt. LC(a) < LC(b) kan ogsA bety concurrent. Kun vektorklokker kan avgjore kausalitet.",
  },
];

export default function Oppg9Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 9: Konsistens og klokker</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 9: Konsistens og klokker</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Lamport-klokker, vektorklokker, konsistensmodeller og happens-before.
        Typisk: oppdater klokker i tidsdiagram, identifiser konsistensmodell.
      </p>

      <div className="rounded-xl border border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
          Viktige regler
        </h3>
        <ul className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li><strong>Lamport:</strong> a -&gt; b =&gt; LC(a) &lt; LC(b), men IKKE omvendt</li>
          <li><strong>Vektor:</strong> a -&gt; b &lt;=&gt; VC(a) &lt; VC(b) — begge retninger holder</li>
          <li><strong>Concurrent:</strong> verken VC(a) &lt; VC(b) eller VC(b) &lt; VC(a)</li>
          <li><strong>Sekvensiell:</strong> global ordning + programordre. <strong>Kausal:</strong> respekterer happens-before</li>
        </ul>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/ds-5" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 5</span>
          <span>Koordinering (klokker, mutex)</span>
        </Link>
        <Link href="/dat110/ds-7" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 7</span>
          <span>Konsistens og replikering</span>
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
