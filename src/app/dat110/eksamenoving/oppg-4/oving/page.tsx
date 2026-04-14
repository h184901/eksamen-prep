"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva betyr Protocol-feltet 6 i et IP-datagram?",
    back: "Protocol=6 betyr TCP. Protocol=17 betyr UDP. Protocol=1 betyr ICMP. IP-laget bruker dette feltet til å demultiplekse innkommende datagrammer til riktig transportlagsprotokoll.",
  },
  {
    front: "Hva er TTL-feltet i IPv4 og hva skjer når det når 0?",
    back: "TTL (Time To Live) er et 8-bits felt som dekrementeres med 1 i hvert ruterhopp. Når TTL=0 kastes pakken og ICMP 'Time Exceeded' sendes til avsenderen. Hindrer pakker fra å sirkulere evig i rutingløkker.",
  },
  {
    front: "Hva er formålet med Identifier-feltet i IP-headeren?",
    back: "Identifier identifiserer hvilke fragmenter som tilhører samme originale datagram. Alle fragmenter av samme datagram har identisk Identifier-verdi — brukes til reassemblering hos mottakeren.",
  },
  {
    front: "Hva betyr MF-biten (More Fragments) i IP Flags-feltet?",
    back: "MF=1 betyr at det finnes flere fragmenter etter dette. MF=0 betyr at dette er det siste fragmentet. DF-biten (Don't Fragment) = 1 betyr at rutere ikke får fragmentere pakken.",
  },
  {
    front: "Hva er Fragment Offset og hvilken enhet brukes?",
    back: "Fragment Offset angir posisjonen til fragmentets data i det originale datagrammet, målt i enheter av 8 bytes. Første fragment har offset=0. Eksempel: Offset=185 betyr at data starter på byte 185×8=1480.",
  },
  {
    front: "Hva er de tre fasene i TCP 3-veis handshake?",
    back: "1) SYN: Klient sender SYN=1 med ISN=x. 2) SYN-ACK: Server svarer SYN=1, ACK=1, seq=y, ack=x+1. 3) ACK: Klient sender ACK=1, ack=y+1. Etter dette er forbindelsen etablert på begge sider.",
  },
  {
    front: "Hva er den viktigste forskjellen mellom TCP og UDP?",
    back: "TCP er pålitelig og forbindelsesorientert (garantert levering, rekkefølge, flyt-kontroll, congestion control, 20B header). UDP er upålitelig og forbindelsesløs (ingen garanti, lav overhead, 8B header). Bruk TCP for korrekthet, UDP for hastighet.",
  },
  {
    front: "Hva er Go-Back-N (GBN)?",
    back: "En sliding-window protokoll der mottakeren KUN aksepterer pakker i riktig rekkefølge. Ved pakketap kastes alle out-of-order pakker og senderen retransmitterer pakke k og alle etterfølgende (k, k+1, ..., N). Sender-vindu: ≤ 2^n - 1.",
  },
  {
    front: "Hva er Selective Repeat (SR)?",
    back: "En sliding-window protokoll der mottakeren bufferer out-of-order pakker. Ved pakketap retransmitteres KUN den tapte pakken. Individuell ACK per pakke. Vindu-størrelse ≤ 2^(n-1) for å unngå tvetydighet. Mer effektivt enn GBN.",
  },
  {
    front: "Hva er TCP slow start?",
    back: "TCP starter med congestion window (cwnd) = 1 MSS og dobler cwnd hvert RTT (eksponensielt) inntil cwnd > ssthresh (slow start threshold). Deretter byttes til congestion avoidance (lineær økning). Ved tap halveres ssthresh og cwnd resettes.",
  },
  {
    front: "Hva er kumulativ ACK og hva er individuell ACK?",
    back: "Kumulativ ACK (GBN): ACK(n) betyr alle segmenter med sekvensnummer ≤ n er mottatt. Individuell ACK (SR): ACK for hvert enkelt segment separat. TCP bruker kumulativ ACK med NACK-mekanisme via 3 dupliserte ACK.",
  },
  {
    front: "Hva er IPv4s fire grunnleggende egenskaper?",
    back: "1) Forbindelsesløs (ingen tilstandsoppsett i nettverket). 2) Upålitelig / beste-innsats (pakker kan tapes, dupliseres, reordres). 3) Datagram-basert (hvert hop er uavhengig). 4) Adressering med 32-bit IPv4-adresser.",
  },
];

const quizQuestions = [
  {
    question: "Hvilket felt i IP-headeren brukes til å bestemme om innholdet er TCP eller UDP?",
    options: [
      "TTL-feltet",
      "Protocol-feltet (6=TCP, 17=UDP)",
      "Fragment Offset-feltet",
      "Source IP-feltet",
    ],
    correctIndex: 1,
    explanation: "Protocol-feltet (8 bit) i IP-headeren angir transport-protokollen. 6=TCP, 17=UDP, 1=ICMP. Dette brukes til demultipleksing i transportlaget.",
  },
  {
    question: "Et 4000-byte datagram fragmenteres over en link med MTU=1500. Hva er Fragment Offset for det andre fragmentet?",
    options: [
      "1480",
      "185",
      "1500",
      "0",
    ],
    correctIndex: 1,
    explanation: "Fragment Offset måles i 8-byte enheter. Det andre fragmentet starter på byte 1480 (1500 MTU - 20 byte IP-header = 1480 bytes data). Offset = 1480 / 8 = 185.",
  },
  {
    question: "En TCP-tilkobling avsluttes. Hva er TTL-verdien i IP-datagrammer som reiser over 10 rutere med start-TTL=64?",
    options: [
      "64",
      "54",
      "10",
      "0",
    ],
    correctIndex: 1,
    explanation: "TTL dekrementeres med 1 per ruterhopp. Start=64, etter 10 hopp: 64-10=54. Pakken er fortsatt gyldig (TTL>0).",
  },
  {
    question: "TCP 3-veis handshake: Klient sender SYN med seq=100. Server svarer. Hva er korrekt svar fra server?",
    options: [
      "SYN=1, ACK=1, seq=200, ack=100",
      "SYN=1, ACK=1, seq=200, ack=101",
      "ACK=1, seq=200, ack=101",
      "SYN=1, seq=200",
    ],
    correctIndex: 1,
    explanation: "Server svarer SYN-ACK: SYN=1, ACK=1, eget startsekvens (seq=y), og ack=klientens_seq+1=100+1=101. ACK-feltet er alltid neste forventede sekvens.",
  },
  {
    question: "Go-Back-N med vinduestørrelse N=4. Pakke 2 går tapt. Pakke 3 og 4 ankommer. Hva gjør mottakeren?",
    options: [
      "Buffrer pakke 3 og 4, venter på 2",
      "Aksepterer 3 og 4, sender ACK(4)",
      "Kaster 3 og 4, sender ACK(1) (siste korrekte i rekkefølge)",
      "Sender NACK for pakke 2",
    ],
    correctIndex: 2,
    explanation: "GBN mottaker aksepterer KUN pakker i riktig rekkefølge. Pakke 3 og 4 kastes (out-of-order). Kumulativ ACK(1) sendes — forrige korrekte mottak. Senderen retransmitterer 2, 3, 4.",
  },
  {
    question: "Selective Repeat vs Go-Back-N: Hva er den maksimale vinduestørrelsen for SR med n=3 bits sekvensnummer?",
    options: [
      "8 (= 2^3)",
      "7 (= 2^3 - 1)",
      "4 (= 2^3 / 2)",
      "6 (= 2^3 - 2)",
    ],
    correctIndex: 2,
    explanation: "Selective Repeat krever vindustørrelse ≤ 2^(n-1). Med n=3: vindu ≤ 2^2 = 4. Dette er nødvendig for å unngå tvetydighet mellom nye og retransmitterte pakker. GBN kan ha vindu ≤ 2^n - 1 = 7.",
  },
  {
    question: "TCP slow start: cwnd starter på 1 MSS. Etter 3 RTT uten tap, hva er cwnd (forutsatt ssthresh=∞)?",
    options: [
      "3 MSS",
      "4 MSS",
      "8 MSS",
      "16 MSS",
    ],
    correctIndex: 2,
    explanation: "Slow start dobler cwnd hvert RTT: RTT1: 1→2, RTT2: 2→4, RTT3: 4→8. Etter 3 RTT er cwnd=8 MSS (2^3=8).",
  },
  {
    question: "Hva betyr en UDP-header på 8 byte sammenlignet med TCP-header på 20 byte?",
    options: [
      "UDP er sikrere enn TCP",
      "UDP har lavere overhead og er raskere — brukes når hastighet er viktigere enn pålitelighet",
      "UDP kan ikke fragmenteres",
      "UDP har innebygd congestion control",
    ],
    correctIndex: 1,
    explanation: "UDP har kun 4 felter: src port (16b), dst port (16b), lengde (16b), checksum (16b) = 8 byte total. TCP har minimum 20 byte med mange tilleggsfelt. Lavere overhead = lavere forsinkelse — viktig for DNS, VoIP, gaming.",
  },
];

export default function Oppg4Oving() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på kortet for å se svaret. Fokus: IP-headerfelter, TCP vs UDP, GBN vs SR og congestion control.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Quiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Protokollkunnskap i eksamensstil. Tenk gjennom hvert alternativ før du svarer!
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
