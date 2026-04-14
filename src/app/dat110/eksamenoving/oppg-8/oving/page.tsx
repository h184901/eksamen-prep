"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er et overlay-nettverk?",
    back: "Et logisk nettverk bygget oppå det fysiske nettverket. Noder er prosesser (ikke rutere), og kantene er logiske forbindelser som kan gå over mange fysiske hopp. Brukes til P2P-systemer, multicast, DHT og gossip-spredning.",
  },
  {
    front: "Hva er RDP? Hva er formelen?",
    back: "Relative Delay Penalty. Formelen: RDP = forsinkelse via overlay-stien / forsinkelse via beste fysiske sti. RDP = 1.0 er perfekt (like raskt som optimal fysisk ruting). RDP kan aldri være under 1.0.",
  },
  {
    front: "Hva er en overlay-kant? Hva er forsinkelsen?",
    back: "En overlay-kant mellom prosess A og B er den beste (korteste forsinkelse) fysiske stien mellom de to prosessenes tilkoblede rutere. Man bruker Dijkstra eller inspeksjon på det fysiske nettverket for å finne denne verdien.",
  },
  {
    front: "Hva er et multicast-tre?",
    back: "Et spenningtre over overlay-nodene der én kildenode er rot og alle mottakernoder er løvnoder. Sikrer at hver mottaker får nøyaktig én kopi av meldingen uten løkker. Mer effektivt enn individuelle unicast-sendinger.",
  },
  {
    front: "Hva er forskjellen mellom source-specific tree og shared tree i multicast?",
    back: "Source-specific tree: separat tre per kilde, optimalisert for den kilden. Gir lavere RDP per kilde-mottaker-par, men krever mer state.\n\nShared tree: ett felles tre for alle kilder i gruppen. Deler tilstand, men kan gi høyere RDP for individuelle par.",
  },
  {
    front: "Hva er et strukturert overlay? Gi et eksempel.",
    back: "Strukturert overlay: deterministisk topologi der noder plasseres etter en definert algoritme. Eksempel: Chord DHT (ring-topologi med fingertabeller). Gir O(log N) oppslag og selvorganisering. Motsetning: ustrukturert overlay (tilfeldig, flooding).",
  },
  {
    front: "Hva er gossip (epidemisk) spredning?",
    back: "Protokoll for å spre data i distribuerte systemer: hver node velger tilfeldig én nabo og deler data med den. Spredningen er eksponentiell — O(log N) runder for å nå alle N noder. Robust og skalerbar.",
  },
  {
    front: "Hvem er overlay-noder vs. rutere?",
    back: "Overlay-noder er prosesser (applikasjonsinstanser) som aktivt deltar i overlay-protokollen. Rutere i det fysiske nettverket er usynlige for overlayet — de videresender pakker uten å kjenne til overlay-logikken.",
  },
  {
    front: "Hva er total trekkostnad, og når er den viktig?",
    back: "Total trekkostnad = summen av overlay-kantforsinkelsene for alle kanter i multicast-treet. Viktig for global sammenligning: et tre med lavere total kostnad bruker mindre nettverksressurser selv om RDP for et spesifikt par kan variere.",
  },
  {
    front: "Kan et overlay-nettverk gi kortere forsinkelse enn det fysiske nettverket?",
    back: "Nei, aldri. RDP ≥ 1.0 alltid. Overlay-kanten mellom to noder ER allerede den beste fysiske stien. Overlayet kan ikke gjøre det bedre enn optimal fysisk ruting, men kan gjøre det verre ved unødvendige mellomnoder i treet.",
  },
  {
    front: "Hva er DHT (Distributed Hash Table)?",
    back: "En type strukturert overlay der nøkler mappes til noder via en hashfunksjon. Ansvar fordeles jevnt. Chord-eksempel: succ((n + 2^(i-1)) mod 2^m) for fingertabeller. Gir O(log N) oppslag, selvorganisering og feiltoleranse.",
  },
  {
    front: "For 5 prosesser i et overlay — hvor mange kanter har den fullstendige grafen?",
    back: "N*(N-1)/2 = 5*4/2 = 10 kanter. For 6 prosesser: 6*5/2 = 15 kanter. Hvert par av noder har én kant. Alltid tegn hele grafen på eksamen, selv om du bare trenger noen kanter!",
  },
];

const quizQuestions = [
  {
    question: "Overlay-sti A→D i et multicast-tre har forsinkelse 30 ms. Beste fysiske sti A→D er 20 ms. Hva er RDP?",
    options: ["0.67", "1.0", "1.5", "3.0"],
    correctIndex: 2,
    explanation: "RDP = overlay / fysisk-best = 30 / 20 = 1.5. Overlayet er 50% tregere enn optimalt for dette paret.",
  },
  {
    question: "Fysisk nettverk: Ra–Rb=5, Rb–Rc=10, Rc–Rd=5, Rd–Re=5. Hva er overlay-kantforsinkelsen A–C (A på Ra, C på Rc)?",
    options: ["10 ms", "15 ms", "20 ms", "5 ms"],
    correctIndex: 1,
    explanation: "Beste fysiske sti Ra→Rc = Ra→Rb→Rc = 5+10 = 15 ms. Overlay-kanten A–C = 15 ms.",
  },
  {
    question: "For 5 prosesser i et overlay, hvor mange kanter har den fullstendige overlay-grafen?",
    options: ["5", "8", "10", "20"],
    correctIndex: 2,
    explanation: "N*(N-1)/2 = 5*4/2 = 10 kanter. Alltid tegn hele overlay-grafen på eksamen!",
  },
  {
    question: "Tre 1 (stjerne fra A til B,C,D,E) har total kostnad 65. Tre 2 (linje A-B-C-D-E) har total kostnad 25. RDP for A→E er 1.0 i begge. Hvilket tre bør velges?",
    options: [
      "Tre 1 — stjerneform er alltid best for multicast",
      "Tre 2 — lavere total trekkostnad er bedre globalt",
      "Det spiller ingen rolle siden RDP er lik",
      "Tre 1 — høyere total kostnad betyr høyere kapasitet",
    ],
    correctIndex: 1,
    explanation: "Tre 2 er bedre: lavere total kostnad (25 vs 65) betyr færre nettverksressurser totalt. Når RDP er lik, er lavest total kostnad det riktige valget.",
  },
  {
    question: "Kan RDP for et overlay-par noensinne være lavere enn 1.0?",
    options: [
      "Ja, hvis overlayet finner en snarvei",
      "Ja, hvis rutingen er spesielt effektiv",
      "Nei, overlay kan aldri slå beste fysiske sti",
      "Ja, ved bruk av tunneling",
    ],
    correctIndex: 2,
    explanation: "Nei — overlay-kanten ER definert som beste fysiske sti mellom de to nodene. Overlayet kan ikke gjøre det bedre enn det. RDP ≥ 1.0 alltid.",
  },
  {
    question: "5 prosesser A–E på rutere Ra–Re. Ra↔Rb=5, Rb↔Rc=10, Rc↔Rd=5, Rd↔Re=5, Ra↔Re=40. Hva er overlay-kanten D–E?",
    options: ["5 ms", "10 ms", "15 ms", "40 ms"],
    correctIndex: 0,
    explanation: "Beste fysiske sti Rd→Re = 5 ms (direkte kobling). Overlay-kanten D–E = 5 ms.",
  },
  {
    question: "Samme nettverk som over. Hva er overlay-kanten A–E?",
    options: ["40 ms (direkte Ra→Re)", "25 ms (via Rb→Rc→Rd→Re)", "20 ms", "15 ms"],
    correctIndex: 1,
    explanation: "Beste fysiske sti Ra→Re: direkte = 40 ms, men via Rb→Rc→Rd→Re = 5+10+5+5 = 25 ms. Overlay-kanten bruker BEST fysisk sti = 25 ms, ikke den direkte lenken!",
  },
  {
    question: "Hva er Chord DHT et eksempel på?",
    options: [
      "Ustrukturert overlay med flooding-søk",
      "Strukturert overlay med O(log N) oppslag",
      "Gossip-protokoll",
      "Hierarkisk multicast-tre",
    ],
    correctIndex: 1,
    explanation: "Chord er strukturert overlay: deterministisk ring-topologi med fingertabeller for O(log N) oppslag. Noder og data plasseres deterministisk via hashfunksjon.",
  },
  {
    question: "Et multicast-tre med kilde A og mottakere B, C, D, E. Stien A→E i treet: A→C (15ms) → C→E (10ms). Beste fysiske A→E er 25ms. Hva er RDP?",
    options: ["1.0", "1.1", "1.5", "2.5"],
    correctIndex: 0,
    explanation: "Overlay-sti = 15+10 = 25 ms. Fysisk-best = 25 ms. RDP = 25/25 = 1.0. Perfekt effektivt for dette paret!",
  },
  {
    question: "Stien A→B i et overlay-tre går A→C→D→B med overlay-kostnader 15+5+15=35. Beste fysiske A→B er 5. Hva er RDP?",
    options: ["1.0", "5.0", "7.0", "35"],
    correctIndex: 2,
    explanation: "RDP = 35 / 5 = 7.0. Overlayet er 7 ganger tregere enn optimalt for dette paret — treet er svært ineffektivt for A→B.",
  },
];

export default function Oppg8OvingPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Overlay-nettverk, RDP og multicast-trær. Klikk for å se forklaring.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Øvingsquiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          RDP-beregninger og overlay-konsepter i eksamensstil. Husk: RDP = overlay / fysisk-best, og RDP ≥ 1.0 alltid.
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
