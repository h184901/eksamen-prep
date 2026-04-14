"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er Chord DHT?",
    back: "Distribuert hash-tabell organisert som en ring med 2^m posisjoner. Nøkler og noder tildeles ID-er via konsistent hashing. Støtter O(log N) oppslag via fingertabeller.",
  },
  {
    front: "Hva er formelen for fingertabell-oppføring i?",
    back: "FT[i] = succ(n + 2^(i−1) mod 2^m) for i = 1, 2, ..., m. FT[1] er alltid successor (neste node i klokkeretning).",
  },
  {
    front: "Hva betyr succ(k)?",
    back: "Første node i ringen i klokkeretning slik at node-ID ≥ k. Hvis k er større enn alle noder, wrapar vi rundt til den minste noden.",
  },
  {
    front: "Hva betyr nøkkelansvar i Chord?",
    back: "Nøkkel k tilhører node n = succ(k). Node n er ansvarlig for intervallet (pred(n), n] — dvs. alle nøkler fra forgjengeren (ekskludert) til seg selv (inkludert).",
  },
  {
    front: "Hvordan utføres et oppslag i Chord?",
    back: "1) Se om lokal successor eier nøkkelen. 2) Ellers: finn største FT-oppføring ≤ nøkkel, hopp dit. 3) Gjenta. Tar O(log N) hopp.",
  },
  {
    front: "Hva skjer ved node-join i Chord?",
    back: "Ny node n finner sin successor s. Overtar ansvar for nøkler i (pred(s), n]. Predecessor oppdateres. Fingertabeller stabiliseres gradvis.",
  },
  {
    front: "Hva skjer ved node-leave i Chord?",
    back: "Avtroppende node overfører sine nøkler til sin successor. Successor oppdaterer predecessor-peker. Fingertabeller stabiliseres via periodisk stabiliseringsprotokoll.",
  },
  {
    front: "Hvorfor er Chord O(log N) og ikke O(N)?",
    back: "Fingertabellen hopper eksponensielt: FT[1] = +1, FT[2] = +2, FT[3] = +4, ... FT[m] = +2^(m−1). Hvert hopp halverer gjenværende avstand i ringen.",
  },
  {
    front: "Hva er stabilisering i Chord?",
    back: "Periodisk protokoll der noder sjekker successor/predecessor-pekere og oppdaterer fingertabeller. Håndterer samtidige join/leave-hendelser og holder ringen konsistent.",
  },
  {
    front: "Hva er konsistent hashing?",
    back: "Hashing-teknikk der både noder og nøkler mappes til samme ring. Ved node-join/leave flyttes kun O(1/N) nøkler i gjennomsnitt, i motsetning til klassisk hashing der alle nøkler måtte rehashes.",
  },
];

const quizQuestions = [
  {
    question:
      "m=5, noder: 0, 9, 17, 30. Hva er FT[1] for node 0?",
    options: ["0", "1", "9", "17"],
    correctIndex: 2,
    explanation:
      "FT[1] = succ(0 + 2^0) = succ(1). Første node ≥ 1 i klokkeretning = node 9.",
  },
  {
    question:
      "m=5, noder: 0, 9, 17, 30. Hva er FT[5] for node 9?",
    options: ["17", "25", "30", "9"],
    correctIndex: 2,
    explanation:
      "FT[5] = succ(9 + 2^4) = succ(9 + 16) = succ(25). Første node ≥ 25 = node 30.",
  },
  {
    question:
      "m=5, noder: 0, 9, 17, 30. Hvilken node er ansvarlig for nøkkel 31?",
    options: ["node 30", "node 0", "node 9", "Ingen"],
    correctIndex: 1,
    explanation:
      "succ(31): ingen node ≥ 31 finnes (maks er 30), så vi wrapper rundt til node 0 (minste node).",
  },
  {
    question:
      "m=4, noder: 1, 6, 11, 15. Hva er FT[3] for node 6?",
    options: ["succ(9) = 11", "succ(10) = 11", "succ(14) = 15", "succ(7) = 11"],
    correctIndex: 0,
    explanation:
      "FT[3] = succ(6 + 2^2) = succ(6 + 4) = succ(10). Første node ≥ 10 = node 11. Merk: succ(10) = 11, ikke succ(9).",
  },
  {
    question:
      "Oppslag for nøkkel 20 fra node 0 (m=5, noder: 0, 9, 17, 30). Hva er første hopp?",
    options: [
      "Hopp til node 9 (FT[4]=9)",
      "Hopp til node 17 (FT[5]=17)",
      "Hopp til node 30 (FT[5] er succ(16)=17, velger 17)",
      "Hopp direkte til 30",
    ],
    correctIndex: 1,
    explanation:
      "Ansvarlig node = succ(20) = 30. Node 0 sin FT: FT[5]=succ(16)=17. 17 ≤ 20, og dette er den største FT-oppføringen ≤ 20. Hopp til node 17.",
  },
  {
    question:
      "Hvor mange oppføringer er det i fingertabellen til en node i et Chord-nettverk med m=5?",
    options: ["3", "4", "5", "32"],
    correctIndex: 2,
    explanation:
      "Fingertabellen har alltid m oppføringer (en per bit i identifikatoren). Med m=5 er det 5 oppføringer.",
  },
  {
    question:
      "m=5, noder: 1, 5, 10, 15, 20, 29. Hvilken node er ansvarlig for nøkkel 22?",
    options: ["node 20", "node 29", "node 15", "node 1 (wrap)"],
    correctIndex: 1,
    explanation:
      "succ(22): første node ≥ 22 i klokkeretning = node 29.",
  },
];

export default function Oppg10Oving() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på kortet for å se svaret. Chord krever at du forstår både
          konseptene og beregningene — øv til begge sitter.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Quiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Fingertabell-beregninger og nøkkeloppslag i eksamensstil. Disse
          ligner direkte på det som kommer på eksamen.
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
