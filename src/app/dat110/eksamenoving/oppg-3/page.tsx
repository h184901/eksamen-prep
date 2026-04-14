"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er formelen for sendingsforsinkelse (transmission delay)?", back: "d_trans = L / R, der L = pakkestorrelse (bits) og R = linkkapasitet (bps)." },
  { front: "Hva er formelen for forplantningsforsinkelse (propagation delay)?", back: "d_prop = d / s, der d = avstand (meter) og s = forplantningshastighet (~2*10^8 m/s i kabel, ~3*10^8 i luft)." },
  { front: "Hva er trafikkintensitet og nar er det problem?", back: "La = L*a/R, der a = pakker per sekund. Nar La > 1 vokser koen uendelig. La naer 1 gir stor ko-forsinkelse." },
  { front: "Hva er total end-to-end forsinkelse?", back: "d_total = d_proc + d_queue + d_trans + d_prop. Summeres for hvert ledd i stien." },
  { front: "Hva er gjennomstromning (throughput)?", back: "Effektiv datahastighet mellom kilde og mottaker. Begrenset av flaskehalsen: min(R1, R2, ..., Rn)." },
  { front: "Hva er store-and-forward forsinkelse?", back: "Hele pakken ma mottas for den sendes videre. Forsinkelse = N * (L/R) for N lenker (uten propagering og ko)." },
];

const quizQuestions = [
  {
    question: "En pakke pA 1500 bytes sendes over en link med kapasitet 10 Mbps. Hva er sendingsforsinkelsen?",
    options: ["0.15 ms", "1.2 ms", "1.5 ms", "15 ms"],
    correctIndex: 1,
    explanation: "d_trans = L/R = (1500 * 8) / (10 * 10^6) = 12000 / 10000000 = 0.0012 s = 1.2 ms.",
  },
  {
    question: "Hva er forplantningsforsinkelsen over en 200 km fiberlink (s = 2*10^8 m/s)?",
    options: ["0.1 ms", "0.5 ms", "1.0 ms", "2.0 ms"],
    correctIndex: 2,
    explanation: "d_prop = d/s = 200000 / (2*10^8) = 10^-3 s = 1.0 ms.",
  },
  {
    question: "Med trafikkintensitet La = 0.8, hva forventer vi?",
    options: ["Ingen forsinkelse", "Moderat ko-forsinkelse", "Uendelig ko-forsinkelse", "Pakketap"],
    correctIndex: 1,
    explanation: "La < 1 betyr at systemet er stabilt, men 0.8 er hoy — det vil vaere merkbar ko-forsinkelse. La >= 1 gir uendelig ko.",
  },
  {
    question: "To lenker i serie: R1 = 100 Mbps, R2 = 10 Mbps. Hva er gjennomstromningen?",
    options: ["100 Mbps", "55 Mbps", "10 Mbps", "110 Mbps"],
    correctIndex: 2,
    explanation: "Gjennomstromning = min(R1, R2) = min(100, 10) = 10 Mbps. Flaskehalsen bestemmer.",
  },
  {
    question: "En pakke (1000 bits) sendes over 3 lenker (store-and-forward), hver med R = 1 Mbps. Total forsinkelse (kun transmisjon)?",
    options: ["1 ms", "2 ms", "3 ms", "4 ms"],
    correctIndex: 2,
    explanation: "Store-and-forward: 3 lenker * (1000 / 10^6) = 3 * 1 ms = 3 ms.",
  },
];

export default function Oppg3Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 3: Forsinkelser</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 3: Forsinkelser</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Beregn de fire typene forsinkelse: prosessering, ko, sending og forplantning.
        OgsA trafikkintensitet, gjennomstromning og store-and-forward.
      </p>

      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-network-700 dark:text-network-400 mb-2">
          Strategi
        </h3>
        <ol className="text-sm text-network-900 dark:text-network-200 space-y-1 list-decimal list-inside">
          <li>Identifiser hva slags forsinkelse det sporres om</li>
          <li>Finn verdiene: pakkestorrelse L, linkkapasitet R, avstand d, hastighet s</li>
          <li>Bruk riktig formel: d_trans = L/R, d_prop = d/s</li>
          <li>For end-to-end: summer alle forsinkelsestyper per ledd</li>
          <li>Sjekk enhetene! bits vs bytes, Mbps vs Kbps</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/cn-1" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 1</span>
          <span>Nettverksintroduksjon og metrikker</span>
        </Link>
        <Link href="/dat110/cn-1/formler" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">Formler</span>
          <span>Forsinkelsesformler med forklaring</span>
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
