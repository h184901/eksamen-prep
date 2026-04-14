"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er et overlay-nettverk?", back: "Logisk nettverk bygget oppA det fysiske nettverket. Noder er prosesser, lenker er logiske forbindelser som kan gA over flere fysiske hopp." },
  { front: "Hva er Relative Delay Penalty (RDP)?", back: "RDP = forsinkelse via overlay / forsinkelse via beste fysiske sti. RDP = 1.0 betyr at overlayet er like effektivt som det fysiske nettverket." },
  { front: "Hva er forskjellen pA strukturert og ustrukturert overlay?", back: "Strukturert: deterministisk topologi (f.eks. Chord DHT, CAN). Ustrukturert: tilfeldig topologi (f.eks. Gnutella), soking ved flooding." },
  { front: "Hva er multicast vs broadcast?", back: "Multicast: send til en delmengde (gruppe) av noder. Broadcast: send til alle noder i nettverket." },
  { front: "Hva er et multicast-tre?", back: "Tre-topologi der kilden er roten og mottakerne er lov. Sikrer at hver mottaker fAr noyaktig en kopi uten looper." },
  { front: "Hva er gossip-basert dataspredning?", back: "Epidemisk protokoll: en node velger tilfeldig nabo og deler data. Spres eksponentielt raskt. Brukes for oppdateringer i store distribuerte systemer." },
];

const quizQuestions = [
  {
    question: "Overlay-sti mellom A og B har forsinkelse 45 ms. Optimal fysisk sti er 15 ms. Hva er RDP?",
    options: ["0.33", "1.0", "3.0", "45"],
    correctIndex: 2,
    explanation: "RDP = overlay-forsinkelse / fysisk forsinkelse = 45/15 = 3.0. Overlayet er 3x saktere enn optimalt.",
  },
  {
    question: "Chord DHT er et eksempel pA hvilket type overlay?",
    options: ["Ustrukturert", "Strukturert", "Hierarkisk", "Flat"],
    correctIndex: 1,
    explanation: "Chord er strukturert: deterministisk ring-topologi med fingertabeller for O(log N) oppslag.",
  },
  {
    question: "Hva er fordelen med gossip/epidemisk spredning?",
    options: ["Garanterer levering til alle", "Veldig rask spredning med lav overhead per node", "Bruker minst mulig bAndbredde", "Ordnet levering"],
    correctIndex: 1,
    explanation: "Gossip sprer data eksponentielt raskt (O(log N) runder) med lav overhead — hver node kontakter kun en tilfeldig nabo per runde.",
  },
  {
    question: "Nar er RDP = 1.0?",
    options: [
      "Overlay er dobbelt sA raskt som fysisk",
      "Overlay-stien er identisk med beste fysiske sti",
      "Overlay er uendelig tregt",
      "Det fysiske nettverket er nede"
    ],
    correctIndex: 1,
    explanation: "RDP = 1.0 betyr overlay-forsinkelse = fysisk forsinkelse. Overlayet tilforer ingen ekstra forsinkelse — optimalt.",
  },
];

export default function Oppg8Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 8: Overlay og multicast</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          ~7.5%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 8: Overlay og multicast</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Overlay-nettverk, Relative Delay Penalty (RDP), multicast-trar og
        gossip-basert dataspredning. Typisk: beregn RDP og analyser overlay-topologi.
      </p>

      <div className="rounded-xl border border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
          Strategi
        </h3>
        <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li>Identifiser overlay-stien og den fysiske stien mellom nodene</li>
          <li>Summer forsinkelsene langs overlay-stien</li>
          <li>Finn optimal fysisk sti (kortest forsinkelse)</li>
          <li>RDP = overlay / fysisk — lavere er bedre, 1.0 er perfekt</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/ds-4" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 4</span>
          <span>Kommunikasjon: RPC, overlay og MQTT</span>
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
