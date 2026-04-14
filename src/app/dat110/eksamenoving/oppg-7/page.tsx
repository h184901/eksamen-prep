"use client";

import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er RPC (Remote Procedure Call)?", back: "Mekanisme som lar et program kalle en prosedyre pA en fjern maskin som om den var lokal. Stubs abstraherer nettverkskommunikasjonen." },
  { front: "Hva er de fem RPC-feilklassene?", back: "1) Klient kan ikke finne server. 2) Request-melding tapt. 3) Server krasjer etter mottak. 4) Reply-melding tapt. 5) Klient krasjer etter sending." },
  { front: "Hva gjor klient-stub og server-stub?", back: "Klient-stub: marshaller parametere, sender request, venter pA reply, unmarshaller resultat. Server-stub: unmarshaller request, kaller lokal prosedyre, marshaller resultat, sender reply." },
  { front: "Hva er idempotent operasjon og hvorfor er det viktig for RPC?", back: "En operasjon som gir samme resultat uansett hvor mange ganger den kjores. Viktig fordi tapte replies kan fore til retransmission — idempotente operasjoner tAler dette." },
  { front: "Hva er at-least-once og at-most-once semantikk?", back: "At-least-once: retransmitter til ACK — kan kjore flere ganger (ok for idempotent). At-most-once: sjekk for duplikater — kjores maks en gang." },
  { front: "Hva er forskjellen mellom RPC og REST?", back: "RPC: kaller spesifikke prosedyrer, tett kobling. REST: ressursbasert med HTTP-verb (GET/POST/PUT/DELETE), los kobling, stateless." },
];

const quizQuestions = [
  {
    question: "En klient sender et RPC-kall, men serveren krasjer ETTER at den har mottatt requestet. Hvilken feilklasse er dette?",
    options: ["Klasse 1: klient finner ikke server", "Klasse 2: request tapt", "Klasse 3: server krasjer", "Klasse 4: reply tapt"],
    correctIndex: 2,
    explanation: "Klasse 3: serveren mottok requestet og kan ha begynt a utfore det, men krasjet for den sendte reply. Klienten vet ikke om operasjonen ble utfort.",
  },
  {
    question: "Hvilken semantikk er trygg for operasjonen 'overfar 100 kr fra konto A til B'?",
    options: ["At-least-once", "At-most-once", "Begge er trygge", "Ingen av dem"],
    correctIndex: 1,
    explanation: "Bankoverforing er IKKE idempotent — a kjore den to ganger overforer 200 kr. At-most-once sikrer at den ikke kjores mer enn en gang.",
  },
  {
    question: "Hva gjor marshalling i RPC?",
    options: ["Krypterer data for sikker overforing", "Konverterer parametere til et format egnet for nettverkssending", "Finner riktig server", "Komprimerer data"],
    correctIndex: 1,
    explanation: "Marshalling (serialisering) konverterer programobjekter til en byte-representasjon som kan sendes over nettverket og forstAs av begge sider.",
  },
  {
    question: "Hva er den storste utfordringen med RPC sammenlignet med lokale kall?",
    options: ["Ytelse", "Feiltransparens — nettverksfeil kan oppstA", "ProgrammeringssprAk", "Minnebruk"],
    correctIndex: 1,
    explanation: "Den storste forskjellen er at nettverksfeil (alle 5 klasser) kan oppstA. Lokale kall feiler nesten aldri pA denne mAten.",
  },
];

export default function Oppg7Page() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 7: RPC</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          ~7.5%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 7: RPC</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Remote Procedure Call: arkitektur med stubs, de fem feilklassene,
        marshalling/unmarshalling og semantikk (at-least-once, at-most-once).
      </p>

      <div className="rounded-xl border border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
          De 5 feilklassene — MA kunne!
        </h3>
        <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li><strong>Klient finner ikke server</strong> — server er nede eller feil versjon</li>
          <li><strong>Request-melding tapt</strong> — nettverksfeil, retransmitt med timeout</li>
          <li><strong>Server krasjer</strong> — etter mottak, for/etter utforelse</li>
          <li><strong>Reply-melding tapt</strong> — klient vet ikke om det lyktes</li>
          <li><strong>Klient krasjer</strong> — orphan-beregninger pA serveren</li>
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/dat110/ds-4" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-blue-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-blue-600 dark:text-blue-400">DS 4</span>
          <span>Kommunikasjon: RPC og MQTT</span>
        </Link>
        <Link href="/dat110/obliger" className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-purple-400/60 transition-colors text-sm">
          <span className="font-bold text-xs text-purple-600 dark:text-purple-400">Obliger</span>
          <span>Prosjekt 1: RPC-implementasjon</span>
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
