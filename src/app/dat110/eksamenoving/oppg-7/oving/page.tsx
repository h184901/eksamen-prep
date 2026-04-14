"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er en stateful server?",
    back: "En server som husker tilstanden til hver klient mellom forespørsler. Eksempel: filserver som husker hvilke filer klienten har åpne og posisjonen i filen.",
  },
  {
    front: "Hva er en stateless server?",
    back: "En server som ikke husker noe mellom kall. Hvert kall er selvstendig og må inneholde all nødvendig informasjon. Lettere å gjøre feiltolerante — ingen tilstand å gjenopprette.",
  },
  {
    front: "Hva er synkron kommunikasjon?",
    back: "Avsender blokkerer (venter) til mottaker har mottatt og behandlet meldingen. Enklere å programmere, men kan skape flaskehalser hvis mottaker er treg.",
  },
  {
    front: "Hva er asynkron kommunikasjon?",
    back: "Avsender fortsetter umiddelbart etter sending — venter ikke på svar. Svaret håndteres via callback eller meldingskø. Høyere ytelse, men mer kompleks programmering.",
  },
  {
    front: "Hva er multithreading i en RPC-server?",
    back: "Serveren bruker dispatcher-tråd som tildeler innkommende forespørsler til worker-tråder fra en pool. Gir høy parallellitet, men krever synkronisering (mutex) for delte ressurser.",
  },
  {
    front: "Hva er failure transparency?",
    back: "Systemet skjuler feil og gjenopprettingsprosesser fra brukere — de merker ikke at komponenter krasjer. Oppnås med replikering og automatisk failover. Vanskeligst å realisere.",
  },
  {
    front: "Hva er access transparency?",
    back: "Skjuler om ressurser er lokale eller remote — tilgang ser identisk ut. I RPC realiseres det gjennom stubs. Programmereren kaller prosedyrer uten å tenke på nettverk.",
  },
  {
    front: "Hva er partial failure i distribuerte systemer?",
    back: "Én komponent feiler mens resten fortsetter å fungere. Dette er unikt for distribuerte systemer — i sentraliserte systemer feiler hele systemet. Gjør feilhåndtering komplisert.",
  },
  {
    front: "Hva er soft state vs hard state?",
    back: "Hard state: informasjon som ikke forsvinner uten eksplisitt sletting (f.eks. åpne filer på en FTP-server). Soft state: informasjon med utløpstid som forsvinner automatisk hvis den ikke fornyes (f.eks. DHCP-leaser). Soft state er lettere å gjenopprette etter feil.",
  },
  {
    front: "Hva er replication transparency?",
    back: "Brukere og applikasjoner er ikke klar over at det finnes flere kopier (replikaer) av en ressurs. Systemet fremstår som om det bare er én ressurs, selv om data er replikert for tilgjengelighet og ytelse.",
  },
  {
    front: "Hva er iterativ vs rekursiv DNS-oppslag?",
    back: "Iterativ: DNS-klienten spør én server om gangen og får referanser til neste server å spørre — klienten gjør alle forespørslene selv.\n\nRekursiv: DNS-serveren tar ansvar for å finne svaret og returnerer det ferdige resultatet til klienten — serveren gjør videresøkene.",
  },
];

const quizQuestions = [
  {
    question: "En netthandelsserver husker handlekurven din mellom sidevisninger. Hva er dette et eksempel på?",
    options: [
      "Stateless server",
      "Stateful server",
      "Asynkron kommunikasjon",
      "Access transparency",
    ],
    correctIndex: 1,
    explanation: "Stateful server: serveren husker klientens tilstand (handlekurven) mellom forespørsler. REST APIer er typisk stateless — handlekurv lagres i database eller cookie i stedet.",
  },
  {
    question: "En klientapplikasjon sender en forespørsel og fortsetter å kjøre mens den venter på svar via callback. Hva er dette?",
    options: [
      "Synkron kommunikasjon",
      "Asynkron kommunikasjon",
      "Stateful kommunikasjon",
      "Failure transparency",
    ],
    correctIndex: 1,
    explanation: "Asynkron kommunikasjon: klienten blokkerer ikke, men registrerer en callback som kalles når svaret ankommer. Typisk i Node.js og moderne asynkron programmering.",
  },
  {
    question: "Hva er den største ulempen med multithreading i servere?",
    options: [
      "Kan kun håndtere én klient om gangen",
      "Race conditions og behovet for synkronisering av delte ressurser",
      "Bruker for lite minne",
      "For langsom oppstart",
    ],
    correctIndex: 1,
    explanation: "Multithreading krever mutex/semaforer for å beskytte delte datastrukturer mot race conditions. Feil synkronisering gir uforutsigbar oppførsel og data corruption.",
  },
  {
    question: "Failure transparency sier at systemet skal skjule feil. Hva er det fundamentale problemet med dette?",
    options: [
      "Det krever for mye nettverksbåndbredde",
      "Det er umulig å skille mellom en veldig treg komponent og en som har krasjet",
      "Det er for dyrt i hardware",
      "Protokollene er for kompliserte",
    ],
    correctIndex: 1,
    explanation: "Fundamental utfordring: timeout er eneste mekanisme for å oppdage feil, men en timeout kan skyldes sakthet — ikke krasj. Å vente for lenge reduserer ytelsen, å vente for kort gir falske alarmer.",
  },
  {
    question: "RPC-stubs muliggjør hvilken form for transparens?",
    options: [
      "Failure transparency",
      "Replication transparency",
      "Access transparency",
      "Location transparency",
    ],
    correctIndex: 2,
    explanation: "Access transparency: stubs skjuler marshalling, nettverkskommunikasjon og unmarshalling slik at fjernkall ser ut som lokale prosedyrekall for programmereren.",
  },
  {
    question: "Hva er soft state (i motsetning til hard state)?",
    options: [
      "Tilstand som aldri kan slettes",
      "Tilstand med utløpstid som forsvinner automatisk om den ikke fornyes",
      "Tilstand lagret i flyktig RAM",
      "Tilstand som deles mellom alle klienter",
    ],
    correctIndex: 1,
    explanation: "Soft state har en utløpstid (TTL). Eksempel: DHCP-leaser og DNS-oppføringer. Lettere å gjenopprette etter feil siden tilstanden regenereres automatisk uten eksplisitt opprydding.",
  },
  {
    question: "Hva er den viktigste fordelen med en stateless server kontra stateful?",
    options: [
      "Stateless er alltid raskere",
      "Stateless kan enkelt gjenopprettes etter krasj — ingen klienttilstand å gjenopprette",
      "Stateless trenger ikke nettverk",
      "Stateless støtter flere protokoller",
    ],
    correctIndex: 1,
    explanation: "Etter en krasj trenger en stateless server bare å starte opp igjen — ingen lagret klienttilstand å gjenopprette. En stateful server må gjenopprette all klienttilstand, noe som er komplekst og feilutsatt.",
  },
  {
    question: "Hva er forskjellen mellom iterativ og rekursiv DNS-oppslag?",
    options: [
      "Iterativ: serveren gjør all søking. Rekursiv: klienten gjør all søking",
      "Iterativ: klienten følger referanser selv. Rekursiv: serveren tar ansvar for hele søket",
      "Iterativ er alltid raskere enn rekursiv",
      "Iterativ brukes kun for IPv6, rekursiv for IPv4",
    ],
    correctIndex: 1,
    explanation: "Iterativ: DNS-klienten spør en server, får en referanse til neste server, og spør den neste selv — klienten gjør alt arbeidet. Rekursiv: serveren tar over og returnerer det ferdige svaret til klienten.",
  },
];

export default function Oppg7OvingPage() {
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
