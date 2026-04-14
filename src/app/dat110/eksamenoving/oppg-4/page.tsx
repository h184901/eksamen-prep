"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er de viktigste forskjellene mellom TCP og UDP?", back: "TCP: tilkoblingsbasert, palitelig leveranse, flytkontroll, metningskontroll, rekkefolgekontroll. UDP: tilkoblingslost, best-effort, raskere, mindre overhead." },
  { front: "Hva er TCP 3-veis handshake?", back: "1) Klient sender SYN (seq=x). 2) Server svarer SYN-ACK (seq=y, ack=x+1). 3) Klient sender ACK (ack=y+1). Forbindelse opprettet." },
  { front: "Hva er de viktigste feltene i IP-headeren?", back: "Version, Header Length, TTL, Protocol (TCP=6, UDP=17), Source IP, Destination IP, Total Length, Fragment Offset." },
  { front: "Hva er UDP pseudo-header og checksum?", back: "Pseudo-headeren inkluderer source/dest IP, protocol, UDP-lengde. Brukes i checksum-beregningen for a oppdage feil i data og feil-levering." },
  { front: "Hva er MSS (Maximum Segment Size)?", back: "Storste mengde data i et TCP-segment (ekskl. header). Typisk 1460 bytes (1500 MTU - 20 IP - 20 TCP)." },
  { front: "Hva er forskjellen pA port og socket?", back: "Port: 16-bit nummer som identifiserer en prosess. Socket: (IP, port)-par som unikt identifiserer en endepunkt." },
];

const quizQuestions = [
  {
    question: "Hvilket transportlagsprotokoll bruker DNS som standard?",
    options: ["TCP", "UDP", "Bade TCP og UDP", "Ingen — DNS bruker IP direkte"],
    correctIndex: 1,
    explanation: "DNS bruker UDP port 53 som standard for rask oppslag. TCP brukes for sonesoverforinger og svar >512 bytes.",
  },
  {
    question: "Hva er TCP sequence number brukt til?",
    options: ["Identifisere avsenderprosessen", "Nummerere bytes i datastrommen", "Angi TTL for segmentet", "Beregne checksum"],
    correctIndex: 1,
    explanation: "TCP nummererer bytes — sequence number angir forste byte i segmentets data innen hele datastrommen.",
  },
  {
    question: "Hvilket felt i IP-headeren avgjor om pakken inneholder TCP eller UDP?",
    options: ["Version", "TTL", "Protocol", "Header Checksum"],
    correctIndex: 2,
    explanation: "Protocol-feltet: 6 = TCP, 17 = UDP, 1 = ICMP. Forteller neste lag hvilken protokoll payloaden bruker.",
  },
  {
    question: "Hva skjer nar TCP sender et segment og ikke mottar ACK innen timeout?",
    options: ["Segmentet forkastes", "Segmentet sendes pA nytt (retransmission)", "Forbindelsen lukkes umiddelbart", "UDP brukes som fallback"],
    correctIndex: 1,
    explanation: "TCP er palitelig — segmentet retransmitteres ved timeout. Timer dobbles (exponential backoff) ved gjentatte tap.",
  },
  {
    question: "Hva er well-known portnumre?",
    options: ["Port 0-1023 reservert for standard tjenester", "Port 1024-49151", "Port 49152-65535", "Alle porter under 80"],
    correctIndex: 0,
    explanation: "Port 0-1023 er well-known: HTTP=80, HTTPS=443, DNS=53, SSH=22, SMTP=25, FTP=21.",
  },
];

export default function Oppg4Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 4: Protokoller</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 4: Protokoller</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        TCP 3-veis handshake, UDP-segmentering, IP-headerfelt og protokollmekanismer.
        Typisk: tegn tidsdiagram, forklar felt, beregn checksum.
      </p>

      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-network-700 dark:text-network-400 mb-2">
          Strategi
        </h3>
        <ol className="text-sm text-network-900 dark:text-network-200 space-y-1 list-decimal list-inside">
          <li>Kan du forskjellene mellom TCP og UDP?</li>
          <li>Kan du tegne TCP 3-veis handshake med seq/ack-numre?</li>
          <li>Vet du hva de viktigste IP-headerfeltene gjor?</li>
          <li>Kan du beregne UDP checksum med 1s-komplement?</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/cn-3" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 3</span>
          <span>Transportlaget (TCP, UDP)</span>
        </Link>
        <Link href="/dat110/cn-4" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 4</span>
          <span>Nettverkslaget (IP)</span>
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
