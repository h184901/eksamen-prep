"use client";

import Link from "next/link";
import { useState } from "react";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const obliger = [
  {
    id: 1,
    title: "Prosjekt 1: Socket Programming og RPC",
    description: "IoT-system med temperatursensor, kontroller og display via RPC oppA TCP-sockets.",
    flashcards: [
      { front: "Hva er de tre lagene i prosjekt 1?", back: "Connection-layer (TCP sockets), Messaging-layer (send/receive meldinger), RPC-layer (metode-kall over nettverket)." },
      { front: "Hva gjor klient-stub i RPC?", back: "Serialiserer metodekall og parametere (marshalling), sender over nettverket, og mottar/deserialiserer svaret." },
      { front: "Hva er marshalling og unmarshalling?", back: "Marshalling: konvertere Java-objekter til byte-array for sending. Unmarshalling: konvertere byte-array tilbake til Java-objekter." },
      { front: "Hvorfor ser Sensor.read() ut som et lokalt kall?", back: "RPC-stubs skjuler nettverkskommunikasjonen. Klienten kaller stub-metoden som om den var lokal, men stubben sender det remote." },
    ],
    quiz: [
      {
        question: "Hvilken rekkefølge har lagene i prosjekt 1?",
        options: ["RPC -> Messaging -> Connection", "Connection -> RPC -> Messaging", "Connection -> Messaging -> RPC", "Messaging -> Connection -> RPC"],
        correctIndex: 2,
        explanation: "Lagene bygger pA hverandre: Connection (TCP) er bunnen, Messaging bruker Connection for meldinger, RPC bruker Messaging for metode-kall.",
      },
      {
        question: "Hva er server-stub sin rolle?",
        options: ["Opprette TCP-forbindelsen", "Deserialisere innkommende kall og utfore metoden lokalt", "Sende ARP-foresporsler", "Kryptere meldinger"],
        correctIndex: 1,
        explanation: "Server-stub mottar marshallede data, deserialiserer (unmarshalling) til metodenavn og parametere, og kaller den faktiske metoden lokalt.",
      },
    ],
  },
  {
    id: 2,
    title: "Prosjekt 2: Publish-Subscribe Middleware",
    description: "PB-MOM med broker, topics og subscribers oppA messaging-laget fra prosjekt 1.",
    flashcards: [
      { front: "Hva er broker sin rolle i pub/sub?", back: "Mellommann som administrerer topics, holder oversikt over subscribers, og distribuerer publiserte meldinger til riktige mottakere." },
      { front: "Hva er forskjellen pA publish og subscribe?", back: "Publish: sender melding til et topic. Subscribe: registrerer seg for a motta meldinger fra et topic." },
      { front: "Hva er likheten mellom prosjekt 2 og MQTT?", back: "Begge bruker pub/sub-monster med topics, broker, publish og subscribe. Prosjekt 2 er en forenklet versjon av MQTT-konseptet." },
      { front: "Hva er ChApp i prosjekt 2?", back: "Chat-applikasjon som demonstrerer pub/sub i praksis. Brukere sender meldinger til topics, og alle subscribers pA topicet mottar dem." },
    ],
    quiz: [
      {
        question: "Hvem bestemmer hvilke meldinger en subscriber mottar?",
        options: ["Publisheren", "Subscriberen selv (via topics)", "Nettverket", "Operativsystemet"],
        correctIndex: 1,
        explanation: "Subscriberen velger hvilke topics den abonnerer pA. Brokeren sender kun meldinger fra abonnerte topics.",
      },
      {
        question: "Hva skjer nar en publisher sender en melding til et topic uten subscribers?",
        options: ["Meldingen lagres til en subscriber kobler seg pA", "Meldingen kastes/ignoreres", "Brokeren krasjer", "Meldingen sendes til alle topics"],
        correctIndex: 1,
        explanation: "Uten subscribers er det ingen a sende til. Meldingen forsvinner (med mindre brokeren har persistens, som ikke er tilfelle i prosjektet).",
      },
    ],
  },
  {
    id: 3,
    title: "Prosjekt 3: DHT Cooperative Mirroring",
    description: "Chord DHT-ring med konsistent hashing, replikering og distribuert mutex.",
    flashcards: [
      { front: "Hva er nokkelansvar i Chord?", back: "Nokkel k tilhorer forste node n slik at k <= n (med wrap-around). Formelt: ansvar = (pred(n), n]." },
      { front: "Hva er konsistensprotokollen i prosjekt 3?", back: "Sikrer at replikaer er oppdaterte. Nar en node oppdaterer data, propageres endringen til alle replikaer." },
      { front: "Hva er distribuert mutex i prosjektet?", back: "Koordinerer tilgang til delte ressurser pA tvers av noder. Sikrer at kun en node om gangen modifiserer en ressurs." },
      { front: "Hvorfor brukes replikering i DHT?", back: "Feiltoleranse: om en node feiler, finnes dataene fortsatt pA andre noder. OgsA bedre leseytelse." },
    ],
    quiz: [
      {
        question: "Hva brukes konsistent hashing til i Chord?",
        options: ["Kryptere data", "Fordele nokler jevnt over noder i ringen", "Sortere noder etter IP-adresse", "Komprimere data for lagring"],
        correctIndex: 1,
        explanation: "Konsistent hashing sikrer jevn fordeling av nokler og minimerer refordeling nar noder legges til/fjernes.",
      },
    ],
  },
];

export default function Oppg2Page() {
  const [selectedOblig, setSelectedOblig] = useState<number | null>(null);
  const activeOblig = obliger.find((o) => o.id === selectedOblig);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--accent)]">Eksamensorving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppg 2: Oblig-prosjekt</span>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          10%
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Oppg 2: Oblig-prosjekt</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Denne oppgaven handler alltid om de obligatoriske prosjektene. Du ma
        forsta arkitekturen og konseptene bak koden — ikke implementasjonsdetaljer.
      </p>

      <div className="rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-purple-700 dark:text-purple-400 mb-2">
          Typiske sporsmol fra eksamen
        </h3>
        <ul className="text-sm text-purple-900 dark:text-purple-200 space-y-1 list-disc list-inside">
          <li>&ldquo;Forklar arkitekturen i prosjekt X&rdquo;</li>
          <li>&ldquo;Hva er fordelen med RPC fremfor raa sockets?&rdquo;</li>
          <li>&ldquo;Beskriv publish-subscribe-monsteret&rdquo;</li>
          <li>&ldquo;Hva gjor klient-stub og server-stub?&rdquo;</li>
          <li>&ldquo;Hvordan handterer Chord-ringen nokkler?&rdquo;</li>
        </ul>
      </div>

      {/* Oblig selector */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Velg prosjekt</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {obliger.map((oblig) => (
            <button
              key={oblig.id}
              onClick={() => setSelectedOblig(oblig.id === selectedOblig ? null : oblig.id)}
              className={`text-left rounded-xl border-2 p-4 transition-all ${
                selectedOblig === oblig.id
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30 shadow-md"
                  : "border-[var(--card-border)] hover:border-purple-400/60"
              }`}
            >
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                Prosjekt {oblig.id}
              </span>
              <h3 className="font-bold text-sm mt-2 mb-1">{oblig.title}</h3>
              <p className="text-xs text-[var(--muted)]">{oblig.description}</p>
            </button>
          ))}
        </div>
      </div>

      {activeOblig && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-3">
              Flashcards — {activeOblig.title}
            </h2>
            <FlashcardDeck cards={activeOblig.flashcards} />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Quiz — {activeOblig.title}</h2>
            <QuizSet questions={activeOblig.quiz} />
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
        <h2 className="text-lg font-bold mb-3">Se ogsA</h2>
        <Link
          href="/dat110/obliger"
          className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
        >
          Detaljert oversikt over alle obligatoriske prosjekter
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
