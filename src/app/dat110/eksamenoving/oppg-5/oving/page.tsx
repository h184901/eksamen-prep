"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er Bellman-Ford-ligningen?",
    back: "D_x(y) = min_v [ c(x,v) + D_v(y) ] — billigste vei fra x til y er minimum over alle naboer v av (kostnad til v + vs kjente avstand til y).",
  },
  {
    front: "Hva er startbetingelsene i avstandsvektoralgoritmen?",
    back: "Avstand til seg selv = 0. Avstand til direkte naboer = linkkostnad. Avstand til alle andre = ∞.",
  },
  {
    front: "Hva er count-to-infinity-problemet?",
    back: "Når en link feiler, kan to noder telle opp mot uendelig i gjensidige oppdateringer fordi de tror hverandre har en sti. Eksempel: X mener Y har en sti via Z, og Z mener X har en sti via Y.",
  },
  {
    front: "Hva er poison reverse?",
    back: "Løsning på count-to-infinity: en node annonserer ∞ (forgiftet rute) tilbake til naboen den allerede ruter gjennom. Bryter løkken mellom to noder.",
  },
  {
    front: "Hva er CIDR-notasjon?",
    back: "Classless Inter-Domain Routing: a.b.c.d/x der x er antall nettverksbiter. Eksempel: 192.168.1.0/24 gir 256 adresser (2^8).",
  },
  {
    front: "Hva er longest-prefix match?",
    back: "Rutere matcher destinasjons-IP mot forwardingtabellen og velger oppføringen med flest matchende bits (lengst prefiks). Mer spesifikk rute vinner alltid.",
  },
  {
    front: "Hva er forskjellen på link-state og avstandsvektor?",
    back: "Link-state: global topologiinformasjon, Dijkstra. Avstandsvektor: lokal info (kun naboer), Bellman-Ford, distribuert. LS konvergerer raskere men krever mer minne.",
  },
  {
    front: "Hvem annonserer avstandsvektorer til hvem?",
    back: "Hver ruter sender kun DV til sine direkte naboer. Naboene oppdaterer sine tabeller og sender videre ved endringer. Fullstendig informasjon spres gradvis.",
  },
  {
    front: "Hva betyr det at DV-algoritmen har konvergert?",
    back: "Ingen ruter har oppdatert sin DV i siste runde — alle avstander er stabile og reflekterer faktisk optimale stier.",
  },
];

const quizQuestions = [
  {
    question:
      "Nettverk: R1–R2 kost 5, R2–R3 kost 2, R3–R4 kost 1, R1–R4 kost 8. Hva er R1s initielle avstand til R3?",
    options: ["2", "5", "8", "∞"],
    correctIndex: 3,
    explanation:
      "R3 er ikke direkte nabo til R1. R1 kjenner bare R2 (kost 5) og R4 (kost 8) initielt. Avstand til R3 er ∞ helt til R2 sender sin DV.",
  },
  {
    question:
      "Etter at R1 har mottatt DVer fra R2 (D_R2(R3)=2) og R4 (D_R4(R3)=1): hva er D_R1(R3)?",
    options: [
      "min[5+2, 8+1] = 7",
      "min[5+2, 8+1] = 9",
      "5 + 2 = 7",
      "8 + 1 = 9",
    ],
    correctIndex: 0,
    explanation:
      "D_R1(R3) = min[c(R1,R2)+D_R2(R3), c(R1,R4)+D_R4(R3)] = min[5+2, 8+1] = min[7,9] = 7. Neste hopp er R2.",
  },
  {
    question:
      "Et subnett har prefiks 192.168.10.0/26. Hvor mange adresser finnes i dette subnettet?",
    options: ["26", "32", "62", "64"],
    correctIndex: 3,
    explanation:
      "32 - 26 = 6 hostbiter. 2^6 = 64 adresser totalt (inkl. nettverks- og broadcast-adresse). Brukbare host-adresser = 62.",
  },
  {
    question:
      "Forwardingtabell: 200.23.16.0/21 og 200.23.18.0/23. Pakke til 200.23.18.100 — hvilken brukes?",
    options: [
      "200.23.16.0/21",
      "200.23.18.0/23",
      "Ingen passer",
      "Standard rute",
    ],
    correctIndex: 1,
    explanation:
      "Begge prefiks matcher, men /23 er lengre (mer spesifikk). Longest-prefix match velger 200.23.18.0/23.",
  },
  {
    question:
      "Hva er neste hopp for R4 til R2 etter første DV-runde? Nettverk: R1–R2=5, R2–R3=2, R3–R4=1, R1–R4=8.",
    options: [
      "R3 (kost 1+2=3)",
      "R1 (kost 8+5=13)",
      "Direkte til R2 (∞)",
      "Ingen rute",
    ],
    correctIndex: 0,
    explanation:
      "D_R4(R2) = min[c(R4,R3)+D_R3(R2), c(R4,R1)+D_R1(R2)] = min[1+2, 8+5] = min[3,13] = 3 via R3.",
  },
  {
    question:
      "Hva er poison reverse?",
    options: [
      "En ruter sender uendelig kostnad tilbake til naboen den ruter gjennom",
      "En ruter sletter ruter med for høy kostnad",
      "Krypteringsprotokoll for rutingmeldinger",
      "En teknkikk for å balansere last mellom to like-kostnad lenker",
    ],
    correctIndex: 0,
    explanation:
      "Poison reverse: hvis X ruter til Z via Y, annonserer X overfor Y at D_X(Z)=∞. Dette forhindrer Y fra å tro at X har en alternativ sti, og bryter dermed potensielle løkker.",
  },
  {
    question:
      "Nettverk: R1–R2=8, R2–R3=2, R3–R4=1, R1–R4=5. Billigste sti R1→R3?",
    options: [
      "R1→R2→R3: kost 10",
      "R1→R4→R3: kost 6",
      "R1→R2→R3: kost 8",
      "R1→R4→R3: kost 5",
    ],
    correctIndex: 1,
    explanation:
      "Via R2: 8+2=10. Via R4: 5+1=6. Billigste er R1→R4→R3 med kost 6.",
  },
];

export default function Oppg5Oving() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på kortet for å se svaret. Øv til du kan alle uten å nøle.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Quiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Bellman-Ford-beregninger og CIDR i eksamensstil. Bruk formelen
          systematisk!
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
