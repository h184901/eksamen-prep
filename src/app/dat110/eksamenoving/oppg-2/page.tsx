"use client";

import { useState } from "react";
import Link from "next/link";
import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const obliger = [
  {
    id: 1,
    title: "Prosjekt 1: Socket Programming og RPC",
    description:
      "IoT-system med temperatursensor, kontroller og display via RPC oppå TCP-sockets.",
    color: "purple",
    flashcards: [
      {
        front: "Hva er de tre lagene i prosjekt 1?",
        back: "Connection-layer (TCP sockets), Messaging-layer (send/receive meldinger med fast format), RPC-layer (metode-kall over nettverket via stubs).",
      },
      {
        front: "Hva er meldingsformatet i prosjekt 1?",
        back: "128 bytes fast størrelse. Første 8 bits = meldingstype (REQUEST, RESPONSE, ERROR). Resten = nyttelast (service ID, method ID, parametere serialisert som bytes).",
      },
      {
        front: "Hva gjør klient-stub i RPC?",
        back: "Serialiserer (marshalling) metodekall og parametere til bytes, sender via messaging-laget, venter på svar, og deserialiserer (unmarshalling) svaret tilbake til Java-typer.",
      },
      {
        front: "Hva er marshalling og unmarshalling?",
        back: "Marshalling: konvertere Java-objekter/primitiver til byte-array for nettverksoverføring. Unmarshalling: konvertere byte-array tilbake til Java-typer på mottakersiden.",
      },
      {
        front: "Hvordan identifiseres en socket-forbindelse i prosjekt 1?",
        back: "Via (IP-adresse, portnummer)-paret. Serveren lytter på en bestemt port; klienten oppretter forbindelsen med serverens IP og port.",
      },
      {
        front: "Hvordan identifiseres en RPC-metode?",
        back: "Via service-ID (hvilken tjeneste) + method-ID (hvilken metode innen tjenesten). Begge kodes inn i meldingsformatet.",
      },
    ],
    quiz: [
      {
        question: "Hvilken rekkefølge har lagene i prosjekt 1?",
        options: [
          "RPC → Messaging → Connection",
          "Connection → RPC → Messaging",
          "Connection → Messaging → RPC",
          "Messaging → Connection → RPC",
        ],
        correctIndex: 2,
        explanation:
          "Lagene bygger på hverandre: Connection (TCP-sockets) er grunnlaget, Messaging bruker Connection for å sende/motta meldinger med fast format, RPC bruker Messaging for å kalle metoder.",
      },
      {
        question: "Hva er server-stub sin rolle?",
        options: [
          "Opprette TCP-forbindelsen til klienten",
          "Deserialisere innkommende kall og utføre den lokale metoden",
          "Sende ARP-forespørsler",
          "Kryptere alle meldinger",
        ],
        correctIndex: 1,
        explanation:
          "Server-stub mottar marshallede bytes, deserialiserer (unmarshalling) til metodenavn og parametere, kaller den faktiske lokale metoden, og sender svaret tilbake marshallet.",
      },
      {
        question: "Hvorfor er meldingsstørrelsen fast (128 bytes)?",
        options: [
          "For å spare båndbredde",
          "For å forenkle implementasjonen av send/receive i messaging-laget",
          "Fordi TCP krever det",
          "For å støtte kryptering",
        ],
        correctIndex: 1,
        explanation:
          "Fast meldingsstørrelse forenkler messaging-laget enormt: send() skriver alltid N bytes, receive() leser alltid N bytes. Ingen lengdeprefiks eller framing-logikk nødvendig.",
      },
    ],
  },
  {
    id: 2,
    title: "Prosjekt 2: Publish-Subscribe Middleware",
    description:
      "PB-MOM med broker, topics og subscribers oppå messaging-laget fra prosjekt 1.",
    color: "indigo",
    flashcards: [
      {
        front: "Hva er broker sin rolle i pub/sub?",
        back: "Mellommann som: 1) administrerer topics, 2) holder oversikt over subscribers per topic, 3) mottar publiserte meldinger, 4) distribuerer til alle subscribers på topicet.",
      },
      {
        front: "Hvilke komponenter inneholder broker i prosjekt 2?",
        back: "TopicManager (opprette/slette topics), SubscriptionManager (håndtere subscribe/unsubscribe), MessageDistributor (videresende meldinger til subscribers), og Connection-håndtering.",
      },
      {
        front: "Hvilken tjeneste tilbyr messaging-laget i prosjekt 2?",
        back: "Pålitelig, ordnet levering av meldinger mellom klienter via broker. Bygger på TCP (connection-layer fra prosjekt 1). Garanterer at meldinger mottas i sendt rekkefølge.",
      },
      {
        front: "Hvordan identifiseres klienter i prosjekt 2?",
        back: "Via klient-ID tildelt ved tilkobling (connect-melding). Broker bruker ID til å holde styr på subscriptions og sende meldinger til riktig klient.",
      },
      {
        front: "Hva er forskjellen mellom publish og subscribe?",
        back: "Publish: send melding til et topic (produsent). Subscribe: registrer seg for å motta meldinger fra et topic (konsument). Broker kobler dem — produsent og konsument kjenner ikke hverandre.",
      },
    ],
    quiz: [
      {
        question: "Hvem bestemmer hvilke meldinger en subscriber mottar?",
        options: [
          "Publisheren",
          "Subscriberen selv (via topics den abonnerer på)",
          "Nettverket",
          "Operativsystemet",
        ],
        correctIndex: 1,
        explanation:
          "Subscriberen velger hvilke topics den abonnerer på via subscribe()-kall. Brokeren sender kun meldinger fra abonnerte topics.",
      },
      {
        question: "Hva skjer når en publisher sender melding til topic uten subscribers?",
        options: [
          "Meldingen lagres til en subscriber kobler seg på",
          "Meldingen forkastes/ignoreres",
          "Brokeren krasjer",
          "Meldingen sendes til alle topics",
        ],
        correctIndex: 1,
        explanation:
          "Uten subscribers finnes ingen å sende til. Meldingen forkastes (med mindre brokeren implementerer persistens, noe prosjektet ikke gjør).",
      },
      {
        question: "Hvilket lag fra prosjekt 1 bruker prosjekt 2 direkte?",
        options: [
          "RPC-laget",
          "Messaging-laget",
          "Connection-laget",
          "Alle tre lagene",
        ],
        correctIndex: 1,
        explanation:
          "Prosjekt 2 bruker messaging-laget fra prosjekt 1 for å sende/motta meldinger mellom klienter og broker. RPC-laget brukes ikke — pub/sub er et annet kommunikasjonsmønster.",
      },
    ],
  },
  {
    id: 3,
    title: "Prosjekt 3: DHT Cooperative Mirroring",
    description:
      "Chord DHT-ring med konsistent hashing, replikering og distribuert mutex.",
    color: "emerald",
    flashcards: [
      {
        front: "Hva er formålet med Chord DHT i prosjekt 3?",
        back: "Distribuert lagring med konsistent hashing: filer (nøkler) fordeles jevnt over noder i en ring. Gjør det mulig å finne hvilken node som er ansvarlig for en fil i O(log N) hopp.",
      },
      {
        front: "Hva er adressestørrelsen i Chord og hva betyr det?",
        back: "m bits adresserom (f.eks. m=5 gir 2⁵=32 mulige ID-er). Noder og nøkler hashes til tall i [0, 2^m-1]. Nøkkel k tilhører første node n ≥ k (med wrap-around).",
      },
      {
        front: "Hva er fingertabellen og formelen for FT[i]?",
        back: "Tabell med m oppføringer for raskere oppslag. FT[i] = successor(n + 2^(i-1)) mod 2^m. Lar noden hoppe ~halvveis mot målet for hvert steg → O(log N) hopp.",
      },
      {
        front: "Hva er formålet med MD5-hashing i prosjekt 3?",
        back: "Konvertere filnavn (strings) til konsistente numeriske nøkler som kan plasseres i Chord-ringen. MD5 gir 128-bit hash, men trunkeres til m bits for Chord.",
      },
      {
        front: "Hva gjør findSuccessor() og closestPrecedingNode()?",
        back: "findSuccessor(id): finner noden ansvarlig for nøkkel id. closestPrecedingNode(id): finner den noden i fingertabellen som er nærmest foran id (uten å gå forbi). Brukes i kombinsjon for oppslag.",
      },
      {
        front: "Hva er distribuert mutex i prosjekt 3 og hva er Lamport-klokkers rolle?",
        back: "Koordinerer eksklusiv tilgang til delte ressurser mellom noder. Lamport-klokker brukes til å ordne forespørsler kausal-korrekt: lavest timestamp prioriteres, og timestamps økes ved hvert event.",
      },
    ],
    quiz: [
      {
        question: "Hva brukes konsistent hashing til i Chord?",
        options: [
          "Kryptere data som lagres i ringen",
          "Fordele nøkler jevnt over noder og minimere refordeling ved join/leave",
          "Sortere noder etter IP-adresse",
          "Komprimere data for lagring",
        ],
        correctIndex: 1,
        explanation:
          "Konsistent hashing: når en node legges til/fjernes, flyttes kun nøkler til/fra den noden. Ingen total omfordeling. Fordeles tilnærmet jevnt. Tradisjonell hashing (modulo N) krever omfordeling av nesten alle nøkler.",
      },
      {
        question: "For Chord med m=4 bits og node 6: hva er FT[2] = ?",
        options: [
          "successor(6 + 1) = successor(7)",
          "successor(6 + 2) = successor(8)",
          "successor(6 + 4) = successor(10)",
          "successor(6 + 8) = successor(14)",
        ],
        correctIndex: 1,
        explanation:
          "FT[i] = successor(n + 2^(i-1)). For i=2: successor(6 + 2^1) = successor(6 + 2) = successor(8).",
      },
      {
        question: "Hva gir replikering i prosjekt 3?",
        options: [
          "Raskere oppslag via fingertabellen",
          "Feiltoleranse: data finnes på flere noder selv om en krasjer",
          "Kryptert lagring av sensitive data",
          "Automatisk sletting av utdaterte filer",
        ],
        correctIndex: 1,
        explanation:
          "Replikering: kopier av data lagres på flere noder. Hvis én node krasjer, finnes dataene fortsatt på andre. Gir også bedre leseytelse ved å fordele leseforespørsler.",
      },
    ],
  },
];

export default function Oppg2Page() {
  const [selectedOblig, setSelectedOblig] = useState<number | null>(null);
  const activeOblig = obliger.find((o) => o.id === selectedOblig);

  return (
    <div>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Eksamen tester alltid arkitektur og konsepter fra de obligatoriske prosjektene.
        Du trenger ikke memorere kode — forstå lagene, kommunikasjonsmønstrene og
        designvalgene.
      </p>

      {/* Hva forvente deg */}
      <div className="rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800 p-5 mb-8">
        <h3 className="font-bold text-sm text-purple-700 dark:text-purple-400 mb-3">
          Typiske eksamensoppgaver om obliger
        </h3>
        <ul className="text-sm text-purple-900 dark:text-purple-200 space-y-2 list-disc list-inside">
          <li>&ldquo;Forklar de tre lagene i prosjekt 1 og hva hvert lag gjør&rdquo;</li>
          <li>&ldquo;Hva er meldingsformatet? Hva betyr de første 8 bitene?&rdquo;</li>
          <li>&ldquo;Hva er forskjellen mellom klient-stub og server-stub?&rdquo;</li>
          <li>&ldquo;Forklar publish-subscribe-mønsteret og brokerens rolle&rdquo;</li>
          <li>&ldquo;Hva er formålet med fingertabellen i Chord?&rdquo;</li>
          <li>&ldquo;Beregn FT[i] for node n med gitt m&rdquo;</li>
          <li>&ldquo;Hvordan brukes Lamport-klokker til distribuert mutex?&rdquo;</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5 mb-8">
        <h3 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">
          Strategi for oblig-oppgaven
        </h3>
        <ol className="text-sm text-amber-900 dark:text-amber-200 space-y-1.5 list-decimal list-inside">
          <li>Tegn en arkitekturskisse av prosjektet (lag/komponenter)</li>
          <li>Forklar hva hvert lag gjør med egne ord</li>
          <li>Husk spesifikke detaljer: meldingsformat, identifikatorer, protokollmønstre</li>
          <li>Koble til teori: RPC = DS kap 4, pub/sub = MOM-kommunikasjon, Chord = DS kap 6</li>
        </ol>
      </div>

      {/* Velg prosjekt */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Velg prosjekt for øving</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {obliger.map((oblig) => (
            <button
              key={oblig.id}
              onClick={() =>
                setSelectedOblig(oblig.id === selectedOblig ? null : oblig.id)
              }
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
            <h2 className="text-xl font-bold mb-3">
              Quiz — {activeOblig.title}
            </h2>
            <QuizSet questions={activeOblig.quiz} />
          </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-[var(--card-border)]">
        <h2 className="text-lg font-bold mb-3">Se også</h2>
        <Link
          href="/dat110/obliger"
          className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
        >
          Detaljert oversikt over alle obligatoriske prosjekter
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
