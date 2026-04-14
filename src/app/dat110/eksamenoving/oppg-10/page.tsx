"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er Chord DHT?", back: "Distribuert hash-tabell organisert som en ring med 2^m posisjoner. Nokkler plasseres pA noder med konsistent hashing. Stotter O(log N) oppslag via fingertabeller." },
  { front: "Hva er formelen for fingertabell?", back: "FT[i] = succ(n + 2^(i-1) mod 2^m) for i = 1, 2, ..., m. FT[1] er alltid successor." },
  { front: "Hva betyr nokkelansvar i Chord?", back: "Nokkel k tilhorer forste node n i klokkeretning slik at k <= n. Formelt: n er ansvarlig for (pred(n), n]." },
  { front: "Hva skjer ved node-join i Chord?", back: "Ny node fAr et ID, finner sin successor og predecessor. Overtar ansvar for nokkler i (pred(n), n]. Fingertabeller oppdateres." },
  { front: "Hva skjer ved node-leave i Chord?", back: "Noden overforer sine nokkler til successor. Predecessor oppdaterer sin successor-peker. Fingertabeller oppdateres (stabiliseringsprotokoll)." },
  { front: "Hvorfor er Chord O(log N) for oppslag?", back: "Med m-bits identifikator og N noder, er fingertabellen m lang. Hvert hopp halverer gjenstaende avstand i ringen => O(log N) hopp." },
  { front: "Hva er stabilisering i Chord?", back: "Periodisk protokoll der noder sjekker og oppdaterer sine successor/predecessor-pekere og fingertabeller. Handterer node-join/leave." },
];

const quizQuestions = [
  {
    question: "I en Chord-ring med m=4 (16 posisjoner), noder pA posisjon 1, 4, 7, 12, 15. Hvilken node er ansvarlig for nokkel 5?",
    options: ["Node 1", "Node 4", "Node 7", "Node 12"],
    correctIndex: 2,
    explanation: "Nokkel 5: fA i klokkeretning fra 5. Node 4 er for 5, sA den nAr vi ikke. Node 7 er forste node >= 5. Nokkelansvar: (4, 7], og 5 er i dette intervallet.",
  },
  {
    question: "For node 4 i m=4 Chord, hva er FT[1]?",
    options: ["succ(4) — neste node", "succ(5)", "succ(6)", "succ(8)"],
    correctIndex: 1,
    explanation: "FT[1] = succ(n + 2^0) = succ(4 + 1) = succ(5). Finn forste node i ringen >= 5.",
  },
  {
    question: "For node 4 i m=4, hva er FT[3]?",
    options: ["succ(5)", "succ(6)", "succ(8)", "succ(12)"],
    correctIndex: 2,
    explanation: "FT[3] = succ(n + 2^(3-1)) = succ(4 + 4) = succ(8). Finn forste node >= 8.",
  },
  {
    question: "Node 4 vil finne nokkel 14 i m=4 Chord med noder 1,4,7,12,15. Hva er forste hopp?",
    options: ["Direkte til node 15", "Til node 12 (via FT[4])", "Til node 7 (via FT[2])", "Til node 1"],
    correctIndex: 1,
    explanation: "FT[4] = succ(4 + 8) = succ(12) = node 12. Node 12 er storste FT-oppforing <= 14, sA vi hopper dit. Node 12 videresender til 15 som har nokkelen.",
  },
  {
    question: "Hvor mange meldinger trenger et oppslag i Chord med N noder (i verste fall)?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
    correctIndex: 1,
    explanation: "O(log N) meldinger. Fingertabellen halverer gjenstaende avstand for hvert hopp. Med N=1000 noder trenger man ~10 hopp.",
  },
];

export default function Oppg10Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 10: DHT/Chord</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          15%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 10: DHT/Chord</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Tyngste enkeltoppgave pA eksamen (15%). Chord-ring, fingertabeller,
        nokkelansvar og O(log N) oppslag. Typisk: beregn fingertabell, finn
        ansvarlig node, vis oppslag steg-for-steg.
      </p>

      <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2">
          Viktig — dette MA du kunne!
        </h3>
        <ol className="text-sm text-red-900 dark:text-red-200 space-y-1 list-decimal list-inside">
          <li><strong>Fingertabell:</strong> FT[i] = succ(n + 2^(i-1) mod 2^m)</li>
          <li><strong>Nokkelansvar:</strong> Nokkel k tilhorer forste node n der k &lt;= n (klokkeretning)</li>
          <li><strong>Oppslag:</strong> Finn storste FT-oppforing &lt;= nokkel, hopp dit, gjenta</li>
          <li><strong>Node join/leave:</strong> Overforing av nokler, oppdatering av pekere</li>
        </ol>
      </div>

      <div className="rounded-xl border border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
          Oppskrift for Chord-oppgaver
        </h3>
        <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li>Tegn ringen med alle noder</li>
          <li>Beregn FT for den aktuelle noden: n + 2^0, n + 2^1, ..., n + 2^(m-1)</li>
          <li>Finn succ() for hver verdi — forste node i klokkeretning &gt;= verdien</li>
          <li>For oppslag: start pA noden, finn storste FT &lt;= nokkel, hopp, gjenta</li>
          <li>Tell hopp — dette er antall meldinger</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/ds-6" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 6</span>
          <span>Navngiving og Chord DHT</span>
        </Link>
        <Link href="/dat110/ds-6/visualiseringer" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">Interaktiv</span>
          <span>Chord-ring kalkulator</span>
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
