"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er ARP og hva gjor den?", back: "Address Resolution Protocol. Oversetter IP-adresse til MAC-adresse pA lokalt LAN. Sender broadcast ARP-request, mottar unicast ARP-reply." },
  { front: "Hva inneholder en ARP-tabell?", back: "Mapping fra IP-adresse til MAC-adresse, med TTL (time-to-live). Oppforinger utloper typisk etter 20 minutter." },
  { front: "Hva er switch self-learning?", back: "Switchen laerer MAC-adresser fra kildeadressen i innkommende rammer. Lagrer (MAC, port, tid) i switchtabellen." },
  { front: "Hva gjor en switch med ukjent destinasjons-MAC?", back: "Floding: sender rammen ut pA alle porter UNNTATT porten den kom inn pA. Nar svaret kommer, laeres adressen." },
  { front: "Hva er forskjellen pA switch og ruter?", back: "Switch: lag 2 (MAC-adresser), laerer automatisk, ingen konfigurasjon. Ruter: lag 3 (IP-adresser), rutingalgoritmer, forwardingtabell." },
  { front: "Hva skjer nar en vert vil sende til en IP pA annet subnett?", back: "ARP-oppslag pA default gateway (ruterens MAC). Rammen sendes til ruteren. Ruteren gjor nytt ARP-oppslag pA destination-subnettet." },
];

const quizQuestions = [
  {
    question: "Vert A (IP: 10.0.0.1) vil sende til vert B (IP: 10.0.0.5). A vet ikke Bs MAC-adresse. Hva skjer forst?",
    options: [
      "A sender pakken direkte med Bs IP-adresse",
      "A sender ARP-request som broadcast pA LAN",
      "A kontakter DNS for a finne Bs MAC",
      "A sender pakken til ruteren"
    ],
    correctIndex: 1,
    explanation: "A sender ARP-request (broadcast FF:FF:FF:FF:FF:FF) som spor 'Hvem har 10.0.0.5?'. B svarer med sin MAC-adresse (unicast ARP-reply).",
  },
  {
    question: "En switch mottar en ramme pA port 2 fra MAC-adresse AA:BB:CC:DD:EE:FF. Hva laerer switchen?",
    options: [
      "At destinasjonen er pA port 2",
      "At AA:BB:CC:DD:EE:FF nAs via port 2",
      "At alle MAC-adresser er pA port 2",
      "Ingenting — switcher laerer ikke"
    ],
    correctIndex: 1,
    explanation: "Self-learning: switchen lagrer (AA:BB:CC:DD:EE:FF, port 2, nAvaerende tid) i tabellen. Fremtidige rammer til denne MAC sendes til port 2.",
  },
  {
    question: "Hva skjer om en switch har en oppforing for destinasjons-MAC pA port 3, men rammen kom inn pA port 3?",
    options: ["Switchen floder", "Switchen sender pA port 3", "Switchen dropper rammen", "Switchen oppdaterer tabellen"],
    correctIndex: 2,
    explanation: "Rammen droppes (filtreres) fordi kilden og destinasjonen er pA samme port — pakken trenger ikke a videresendes.",
  },
  {
    question: "ARP opererer pA hvilket lag?",
    options: ["Applikasjonslaget", "Transportlaget", "Nettverkslaget", "Mellom lag 2 og lag 3"],
    correctIndex: 3,
    explanation: "ARP sitter mellom nettverkslaget (bruker IP) og linklaget (produserer MAC). Det kapsles inn i Ethernet-rammer (lag 2) men opererer med IP-adresser.",
  },
  {
    question: "Vert A pA subnett 1 sender til vert B pA subnett 2. Hvilken MAC-adresse stAr som destinasjon i rammen fra A?",
    options: ["Vert Bs MAC", "Ruterens MAC (interface pA subnett 1)", "Broadcast MAC", "Vert As egen MAC"],
    correctIndex: 1,
    explanation: "Nar destinasjonen er pA et annet subnett, bruker A ruterens MAC (default gateway) som destinasjon. IP-adressen er fortsatt Bs.",
  },
];

export default function Oppg6Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 6: ARP og Switch</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 6: ARP og Switch</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        ARP-tabell, switch self-learning, MAC-adresser og Ethernet-rammer.
        Typisk: steg-for-steg scenario med &ldquo;hva skjer nar vert A sender til B?&rdquo;
      </p>

      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-network-700 dark:text-network-400 mb-2">
          Strategi
        </h3>
        <ol className="text-sm text-network-900 dark:text-network-200 space-y-1 list-decimal list-inside">
          <li>Tegn topologien med verter, switcher og rutere</li>
          <li>Folg rammen steg for steg: MAC src, MAC dst, port</li>
          <li>Sjekk: er dest pA samme subnett? Bruk ARP. Annet subnett? Send til gateway</li>
          <li>Oppdater switch-tabellen for hvert steg</li>
          <li>Husk: switcher floder ved ukjent dest, dropper nar src/dst er pA samme port</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/cn-6" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 6</span>
          <span>Linklaget (ARP, Ethernet, Switch)</span>
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
