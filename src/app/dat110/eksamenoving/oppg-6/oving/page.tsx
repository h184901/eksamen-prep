"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er ARP og hva løser den?",
    back: "Address Resolution Protocol. Løser IP→MAC-oversettelse på et lokalt LAN. Sender ARP-request som broadcast (FF:FF:FF:FF:FF:FF), mottar unicast ARP-reply fra den som eier IP-adressen.",
  },
  {
    front: "Hva inneholder en ARP-tabell?",
    back: "Mapping: IP-adresse → MAC-adresse, med TTL (typisk 20 min). Oppdateres automatisk ved ARP-reply. Utløpte oppføringer fjernes og ARP gjentas ved behov.",
  },
  {
    front: "Hva gjør en switch når den mottar en ramme med ukjent destinasjons-MAC?",
    back: "Flooding: sender rammen ut på ALLE porter unntatt innkommende port. Når svaret kommer tilbake, læres destinasjonens plassering.",
  },
  {
    front: "Hva gjør en switch når kilde og destinasjon er på samme port?",
    back: "Dropper rammen — filtrering. Rammen trenger ikke å videresendes siden begge parter er på samme segment.",
  },
  {
    front: "Hva er switch self-learning?",
    back: "Switchen leser kildeadressen (src MAC) i hver innkommende ramme og lagrer (MAC, port, tidsstempel). Ingen manuell konfigurasjon nødvendig.",
  },
  {
    front: "Hva er CIDR-notasjon og hvordan beregner du antall adresser?",
    back: "Classless Inter-Domain Routing: a.b.c.d/x der x = antall nettverksbiter. Antall adresser = 2^(32−x). Eks: /22 → 2^10 = 1024 adresser.",
  },
  {
    front: "Hva er longest-prefix match i en forwardingtabell?",
    back: "Ruteren matcher dest-IP mot alle oppføringer og velger den med lengst matchende prefiks. Mer spesifikk rute vinner alltid. /32 > /24 > /16 > /0.",
  },
  {
    front: "Hva skjer når H1 sender til H4 som er på et annet subnett?",
    back: "1) H1 oppdager at H4 er på annet subnett. 2) ARP-oppslag for gateway (ruterens MAC). 3) Rammen sendes til ruteren med dst_MAC=gateway_MAC. 4) Ruteren gjør nytt ARP-oppslag og videresender.",
  },
  {
    front: "Hvilke to adressetyper endres (og ikke endres) ved ruter-hopp?",
    back: "IP-adresser (src og dst) endres IKKE end-to-end. MAC-adresser endres i HVERT hopp — ruteren erstatter src_MAC med sin egen og dst_MAC med neste hops MAC.",
  },
];

const quizQuestions = [
  {
    question: "H1 (192.168.1.5) vil sende til H2 (192.168.1.9). H1 har ikke H2s MAC. Hva er destinasjons-MAC i ARP-requesten?",
    options: [
      "H2s MAC-adresse",
      "FF:FF:FF:FF:FF:FF (broadcast)",
      "Ruterens MAC-adresse",
      "H1s egen MAC-adresse",
    ],
    correctIndex: 1,
    explanation: "ARP-requesten sendes som Ethernet-broadcast med dst=FF:FF:FF:FF:FF:FF. Alle enheter på LAN-et mottar den, men kun H2 svarer.",
  },
  {
    question: "Switch S har en tom tabell. Vert A (MAC AA:BB, port 1) sender en ramme til vert B (ukjent). Hva gjør S?",
    options: [
      "Dropper rammen — ukjent destinasjon",
      "Sender til ruteren for hjelp",
      "Lagrer (AA:BB, port 1) og flooder rammen til alle andre porter",
      "Ignorerer rammen og venter",
    ],
    correctIndex: 2,
    explanation: "Self-learning: S lagrer kildeadressen AA:BB på port 1. Ukjent destinasjon → flooding til alle porter unntatt port 1.",
  },
  {
    question: "Nettverket 172.20.0.0/14 — hva er siste adresse i blokken?",
    options: [
      "172.20.255.255",
      "172.23.255.255",
      "172.21.255.255",
      "172.255.255.255",
    ],
    correctIndex: 1,
    explanation: "/14 → 18 host-biter. 172.20 i binær: 10101100.00010100. De to siste bitene i 2. oktet er host-biter (00→11=23). Siste adresse: 172.23.255.255.",
  },
  {
    question: "Forwardingtabell har: 10.0.0.0/8 → R1 og 10.1.0.0/16 → R2. Pakke til 10.1.5.3 — hvilken rute?",
    options: [
      "10.0.0.0/8 → R1 (kortere prefiks)",
      "10.1.0.0/16 → R2 (lengre prefiks)",
      "Begge like gode, tilfeldig valg",
      "Ingen match, dropp",
    ],
    correctIndex: 1,
    explanation: "Longest-prefix match: /16 er lengre enn /8 og matcher. R2 velges. Begge prefiks-er matcher 10.1.5.3, men den mest spesifikke vinner.",
  },
  {
    question: "H1 på subnett A sender en IP-pakke til H5 på subnett B via ruter R. Hva er sant om IP-adressene i pakken hos R?",
    options: [
      "src_IP er R sin adresse, dst_IP er H5 sin adresse",
      "src_IP er H1 sin adresse, dst_IP er H5 sin adresse (uendret)",
      "Begge IP-adressene endres av R",
      "src_IP og dst_IP er begge R sin adresse",
    ],
    correctIndex: 1,
    explanation: "IP-adressene src (H1) og dst (H5) endres ikke gjennom rutere — de er end-to-end. Kun MAC-adressene byttes ut i hvert hopp.",
  },
  {
    question: "Hva er /22-prefiks sitt adresserom for 192.168.8.0/22?",
    options: [
      "192.168.8.0 – 192.168.8.255 (256 adresser)",
      "192.168.8.0 – 192.168.11.255 (1024 adresser)",
      "192.168.8.0 – 192.168.15.255 (2048 adresser)",
      "192.168.0.0 – 192.168.8.255 (2304 adresser)",
    ],
    correctIndex: 1,
    explanation: "/22 → 32−22=10 host-biter → 2^10=1024 adresser. 3. oktet starter på 8 (= 00001000), de 2 siste bitene er host-biter: 00→11 gir 8,9,10,11. Siste: 192.168.11.255.",
  },
];

export default function Oppg6OvingPage() {
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
