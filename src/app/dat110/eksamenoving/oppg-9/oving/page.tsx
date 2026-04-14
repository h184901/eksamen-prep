"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er vektorklokker og hva kan de avgjøre?",
    back: "Vektor med én teller per prosess. Kan avgjøre kausalitet: a→b ≡ VC(a) < VC(b) (alle komponenter ≤, minst én <). Kan også avgjøre at hendelser er samtidige (concurrent).",
  },
  {
    front: "Hva er regelen ved mottak av melding i vektorklokker?",
    back: "For prosess j som mottar fra i: 1) VC[j][k] = max(VC[j][k], m[k]) for ALLE k. 2) VC[j][j]++. Begge skritt må utføres i riktig rekkefølge.",
  },
  {
    front: "Hva er Lamport-klokke og hva er dens begrensning?",
    back: "Skalær logisk klokke. Regel: lokal++, send med klokke, mottak: max(lokal, mottatt)+1. Begrensning: LC(a)<LC(b) betyr IKKE nødvendigvis a→b. Kan ikke avgjøre kausalitet.",
  },
  {
    front: "Hva er happens-before (→)?",
    back: "a→b hvis: 1) a og b i samme prosess og a kommer før b, ELLER 2) a er sending og b er mottak av samme melding. Transitiv: a→b og b→c ⟹ a→c.",
  },
  {
    front: "Hva er concurrent (samtidige) hendelser?",
    back: "Hendelser a og b er samtidige (a ∥ b) hvis verken a→b ei heller b→a. I vektorklokker: verken VC(a)≤VC(b) eller VC(b)≤VC(a).",
  },
  {
    front: "Hva er flat vs. hierarkisk feiltolerante grupper?",
    back: "Flat: alle likestilte, beslutning ved konsensus, robust mot enkeltfeil. Hierarkisk: koordinator + arbeidere, enklere koordinering, men koordinator er single point of failure.",
  },
  {
    front: "Hva er failure transparency?",
    back: "Systemet skjuler feil og gjenoppretting fra brukere. Vanskeligst å oppnå. Krever replikering og automatisk failover. Problemet: umulig å skille treg node fra krasjet node.",
  },
  {
    front: "Nevn tre årsaker til replikering.",
    back: "1) Feiltoleranse: data overlever krasj. 2) Ytelse: data nær brukere, lavere latens. 3) Tilgjengelighet: system oppe selv ved noen noder nede. Utfordring: konsistens mellom replikaer.",
  },
];

const quizQuestions = [
  {
    question: "P1 har VC=[2,1,0] og P2 har VC=[1,3,0]. Er disse kausalt relaterte?",
    options: [
      "P1→P2 (P1 skjedde før P2)",
      "P2→P1 (P2 skjedde før P1)",
      "Samtidige (concurrent) — ingen dominerer",
      "Kan ikke avgjøres med vektorklokker",
    ],
    correctIndex: 2,
    explanation: "P1[0]=2 > P2[0]=1, men P1[1]=1 < P2[1]=3. Ingen av dem er ≤ den andre i alle komponenter. Dermed er de samtidige.",
  },
  {
    question: "P2 (VC=[0,2,0]) mottar en melding med vedlagt VC=[3,0,1]. Hva er P2s VC etter mottak?",
    options: [
      "[3,2,1]",
      "[3,3,1]",
      "[3,2,0]",
      "[0,2,0]",
    ],
    correctIndex: 1,
    explanation: "Steg 1: max([0,2,0], [3,0,1]) = [3,2,1]. Steg 2: P2s teller++: [3,3,1].",
  },
  {
    question: "Hva er den fundamentale begrensningen ved Lamport-klokker sammenlignet med vektorklokker?",
    options: [
      "Lamport-klokker er tregere å beregne",
      "Lamport garanterer ikke kausalitet: LC(a)<LC(b) betyr ikke at a→b",
      "Lamport krever flere bits å lagre",
      "Lamport er kun for to prosesser",
    ],
    correctIndex: 1,
    explanation: "Med Lamport: a→b ⟹ LC(a)<LC(b), men IKKE omvendt. To samtidige hendelser kan ha LC(a)<LC(b). Vektorklokker er sterke nok til å avgjøre kausalitet begge veier.",
  },
  {
    question: "En koordinator krasjer i en hierarkisk gruppe. Hva skjer?",
    options: [
      "Ingenting — arbeiderne tar over automatisk",
      "Gruppen slutter å fungere inntil en ny koordinator velges",
      "Den siste arbeider overtar koordinatorrollen umiddelbart",
      "Alle prosesser krasjer",
    ],
    correctIndex: 1,
    explanation: "Koordinatoren er single point of failure i hierarkisk gruppe. Gruppen kan ikke koordinere nye forespørsler inntil ledervalg-algoritmen velger en ny koordinator.",
  },
  {
    question: "P1 (VC=[1,0,0]) sender en melding til P3 (VC=[0,0,2]). P1 inkrementerer før sending. Hva vedlegger P1?",
    options: [
      "Vedlegger [1,0,0]",
      "Vedlegger [2,0,0]",
      "Vedlegger [0,0,0]",
      "Vedlegger [1,0,2]",
    ],
    correctIndex: 1,
    explanation: "Ved sending: P1 inkrementerer sin egen teller først: [1,0,0] → [2,0,0]. Deretter sendes hele vektoren [2,0,0] som del av meldingen.",
  },
  {
    question: "Hva er at-most-once semantikk for RPC?",
    options: [
      "Operasjonen kjøres minst én gang",
      "Operasjonen kjøres nøyaktig én gang, eller ikke i det hele tatt",
      "Klienten sender forespørselen bare én gang",
      "Serveren lagrer resultater i én time",
    ],
    correctIndex: 1,
    explanation: "At-most-once: server sjekker for duplikate request-IDer og avviser retransmisjoner. Viktig for ikke-idempotente operasjoner som bankoverføringer.",
  },
];

export default function Oppg9OvingPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Øvingsquiz</h2>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
