"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-purple-400/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
        >
          Vis løsning
        </button>
      ) : (
        <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40 p-4 text-sm space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function ExamYear({
  year,
  title,
  project,
  children,
}: {
  year: string;
  title: string;
  project: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            {year}
          </span>
          <div>
            <span className="font-bold">{title}</span>
            <span className="ml-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
              {project}
            </span>
          </div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-6">{children}</div>}
    </div>
  );
}

function SubQuestion({ label, question, children }: { label: string; question: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-purple-300 dark:border-purple-700 pl-4">
      <p className="font-semibold text-sm">
        <span className="font-mono text-purple-600 dark:text-purple-400 mr-1">{label})</span>
        {question}
      </p>
      <Answer>{children}</Answer>
    </div>
  );
}

export default function Oppg2Tidligere() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Oppgave 2 handler alltid om ett av de tre obligatoriske prosjektene.
        Prøv å besvare spørsmålene selv før du ser løsningen.
      </p>

      {/* Jan 2025 — Prosjekt 1 (RPC) */}
      <ExamYear
        year="Jan 2025"
        title="Oppg 2 — Oblig-prosjekt"
        project="Prosjekt 1: RPC over sockets"
      >
        <p className="text-sm text-[var(--muted)]">
          Prosjektet implementerte et IoT-system med temperatursensor, kontroller og display
          koblet via RPC-mekanisme bygget oppå TCP-sockets.
        </p>

        {/* Arkitekturdiagram */}
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4">
          <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-3">Prosjektarkitektur</p>
          <svg viewBox="0 0 480 180" className="w-full max-w-lg" fill="none">
            {/* Laginndeling */}
            <rect x="10" y="10" width="460" height="50" rx="6" stroke="#a855f7" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
            <text x="240" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-purple-600 dark:fill-purple-400">RPC-lag (klient-stub / server-stub)</text>
            <text x="240" y="48" textAnchor="middle" fontSize="9" className="fill-current text-neutral-500">marshalling, unmarshalling, metode-ID, service-ID</text>

            <rect x="10" y="70" width="460" height="50" rx="6" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
            <text x="240" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-indigo-600 dark:fill-indigo-400">Messaging-lag</text>
            <text x="240" y="108" textAnchor="middle" fontSize="9" className="fill-current text-neutral-500">fast meldingsstørrelse (128 bytes), send/receive</text>

            <rect x="10" y="130" width="460" height="40" rx="6" stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
            <text x="240" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-sky-600 dark:fill-sky-400">Connection-lag (TCP Sockets)</text>
            <text x="240" y="162" textAnchor="middle" fontSize="9" className="fill-current text-neutral-500">fysisk forbindelse, IP + port</text>
          </svg>
        </div>

        <SubQuestion
          label="a"
          question="Hvilke tre protokollag består prosjekt 1 av? Forklar hva hvert lag gjør."
        >
          <p><strong>1) Connection-lag:</strong> Administrerer TCP-socket-forbindelsene. Gir primitiver for å åpne/lukke forbindelser mellom klient og server.</p>
          <p><strong>2) Messaging-lag:</strong> Sender og mottar meldinger med fast størrelse (128 bytes). Skjuler TCP-bytestøm-semantikk og sørger for at hele meldingen leses.</p>
          <p><strong>3) RPC-lag:</strong> Implementerer metode-kall via stubs. Klient-stub marshaller kall og parametere til bytes; server-stub unmarshaller, kaller lokal metode og returnerer svaret.</p>
        </SubQuestion>

        <SubQuestion
          label="b"
          question="Hva er meldingsformatet? Hva koder de første 8 bitene?"
        >
          <p><strong>Total størrelse:</strong> 128 bytes (fast).</p>
          <p><strong>Første 8 bits = meldingstype:</strong></p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li>REQUEST: klient sender et RPC-kall</li>
            <li>RESPONSE: server sender svaret</li>
            <li>ERROR: feilmelding</li>
          </ul>
          <p><strong>Resten av nyttelasten:</strong> service-ID, method-ID, serialiserte parametere/returverdi.</p>
        </SubQuestion>

        <SubQuestion
          label="c"
          question="Hva identifiserer en socket-forbindelse unikt?"
        >
          <p><strong>IP-adresse + portnummer</strong> (begge deler).</p>
          <p>IP-adressen identifiserer verten i nettverket. Portnummeret identifiserer prosessen/tjenesten på verten. Kun IP er ikke nok — det kan kjøre mange prosesser på samme vert.</p>
        </SubQuestion>

        <SubQuestion
          label="d"
          question="Hvordan identifiseres en spesifikk RPC-metode?"
        >
          <p><strong>Via service-ID + method-ID</strong> i meldingsformatet.</p>
          <p>Service-ID angir hvilken tjeneste (f.eks. TemperaturSensor-tjeneste). Method-ID angir hvilken metode innen tjenesten (f.eks. getTemperature). Server-stub bruker disse to for å route kallet til riktig Java-metode.</p>
        </SubQuestion>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Tips: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Tegn alltid arkitekturskissen. Eksaminator forventer at du kan navn på lagene og hva de gjør.
          </span>
        </div>
      </ExamYear>

      {/* Mai 2024 — Prosjekt 3 (ChordDHT) */}
      <ExamYear
        year="Mai 2024"
        title="Oppg 2 — Oblig-prosjekt"
        project="Prosjekt 3: Chord DHT"
      >
        <p className="text-sm text-[var(--muted)]">
          Prosjektet implementerte et distribuert fillagrings-system (cooperative mirroring)
          basert på Chord DHT med konsistent hashing og replikering.
        </p>

        <SubQuestion
          label="a"
          question="Hva er formålet med Chord DHT i prosjekt 3?"
        >
          <p>Chord DHT gir <strong>distribuert lagring</strong> der filer (nøkler) fordeles jevnt over noder i en ring via konsistent hashing.</p>
          <p>Systemet kan finne hvilken node som er ansvarlig for en nøkkel i O(log N) hopp via fingertabellen — uten sentral koordinering.</p>
        </SubQuestion>

        <SubQuestion
          label="b"
          question="Hva er adressestørrelsen (m bits) og hva betyr det for nøkkelplassering?"
        >
          <p><strong>m bits</strong> gir adresserom [0, 2^m - 1]. Noder og filer hashes (MD5 trunkert til m bits) til tall i dette intervallet.</p>
          <p><strong>Nøkkelansvar:</strong> nøkkel k tilhører første node n der n ≥ k (med wrap-around). Kalles successor(k).</p>
        </SubQuestion>

        <SubQuestion
          label="c"
          question="Hvilke entiteter (noder) finnes i systemet?"
        >
          <p>Noder i Chord-ringen representerer <strong>peer-maskiner</strong> som både lagrer data og deltar i rutingen. Hver node har:</p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li>Node-ID (hash av IP/navn)</li>
            <li>Fingertabell (m oppføringer)</li>
            <li>Predecessor og successor-pekere</li>
            <li>Ansvar for nøkler i intervallet (pred, node]</li>
          </ul>
        </SubQuestion>

        <SubQuestion
          label="d"
          question="Hva er fingertabellens formål og formel?"
        >
          <p><strong>Formål:</strong> effektiv oppslag i O(log N) hopp fremfor O(N) i lineær søk.</p>
          <p><strong>Formel:</strong> FT[i] = successor(n + 2^(i-1)) mod 2^m, for i = 1, 2, ..., m</p>
          <p>Hvert oppslag hopper ca. halvveis mot målet, slik at log₂N hopp er nok.</p>
        </SubQuestion>

        <SubQuestion
          label="e"
          question="Hvorfor krever concurrent access spesiell håndtering?"
        >
          <p>Flere klienter kan lese/skrive samme ressurs samtidig → race conditions.</p>
          <p>Løsning: <strong>distribuert mutex</strong> med Lamport-klokker. Forespørsler ordnes etter (timestamp, node-ID). Lavest timestamp går først inn i kritisk seksjon. Krever 2(N-1) meldinger for N noder.</p>
        </SubQuestion>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Tips: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Lær FT-formelen utenat og øv på å beregne FT[i] for gitte verdier. Det er et typisk beregningsspørsmål.
          </span>
        </div>
      </ExamYear>

      {/* Jan 2024 — Prosjekt 2 (Pub/Sub) */}
      <ExamYear
        year="Jan 2024"
        title="Oppg 2 — Oblig-prosjekt"
        project="Prosjekt 2: Publish-Subscribe"
      >
        <p className="text-sm text-[var(--muted)]">
          Prosjektet implementerte en publish-subscribe middleware (PB-MOM) med broker,
          topics og chat-applikasjon oppå messaging-laget fra prosjekt 1.
        </p>

        <SubQuestion
          label="a"
          question="Hvilke komponenter inneholder broker i prosjekt 2?"
        >
          <p><strong>Broker inneholder:</strong></p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li><strong>TopicManager:</strong> opprette og administrere topics</li>
            <li><strong>SubscriptionManager:</strong> håndtere subscribe/unsubscribe-forespørsler</li>
            <li><strong>MessageDistributor:</strong> videresende publiserte meldinger til alle subscribers på topicet</li>
            <li><strong>ConnectHandler:</strong> håndtere klienttilkoblinger og tildele klient-IDer</li>
          </ul>
        </SubQuestion>

        <SubQuestion
          label="b"
          question="Hvilken tjeneste tilbyr messaging-laget i prosjekt 2?"
        >
          <p>Messaging-laget (arvet fra prosjekt 1) gir <strong>pålitelig, ordnet levering</strong> av meldinger mellom klienter og broker over TCP.</p>
          <p>Det abstraherer TCP-bytestøm til diskrete meldinger med fast størrelse, slik at pub/sub-laget slipper å håndtere TCP-framing.</p>
        </SubQuestion>

        <SubQuestion
          label="c"
          question="Hvordan identifiseres klienter i prosjekt 2?"
        >
          <p><strong>Via klient-ID</strong> tildelt av broker ved tilkobling (connect-melding).</p>
          <p>Broker bruker ID til å:</p>
          <ul className="list-disc list-inside ml-2 text-xs">
            <li>Holde oversikt over hvilke topics klienten abonnerer på</li>
            <li>Sende distribuserte meldinger til riktig klient</li>
            <li>Håndtere disconnect gracefully</li>
          </ul>
        </SubQuestion>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Tips: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Sammenlign pub/sub med MQTT: begge bruker topics, broker, publish og subscribe. Prosjekt 2 er en forenklet versjon av MQTT-konseptet.
          </span>
        </div>
      </ExamYear>

      {/* 2023 — Prosjekt 3 (ChordDHT) */}
      <ExamYear
        year="2023"
        title="Oppg 2 — Oblig-prosjekt"
        project="Prosjekt 3: Chord DHT (variant)"
      >
        <p className="text-sm text-[var(--muted)]">
          En variant av Chord-oppgaven med fokus på hashing, oppslags-algoritmene
          og Lamport-klokker for distribuert koordinering.
        </p>

        <SubQuestion
          label="a"
          question="Hvorfor brukes MD5-hashing for filnavn i prosjektet?"
        >
          <p>MD5 konverterer filnavn (strings) til <strong>konsistente numeriske nøkler</strong> i [0, 2^128-1].</p>
          <p>Trunkeres til m bits for Chord-ringen. Gir jevn fordeling av nøkler over ringen uten forhåndsbestemt rekkefølge.</p>
        </SubQuestion>

        <SubQuestion
          label="b"
          question="Forklar findSuccessor() og closestPrecedingNode()."
        >
          <p><strong>findSuccessor(id):</strong> finn noden som er ansvarlig for nøkkel id. Kaller closestPrecedingNode() iterativt og følger successor-pekere inntil ansvarlig node er funnet.</p>
          <p><strong>closestPrecedingNode(id):</strong> søker bakover i fingertabellen og returnerer den noden FT[i] der FT[i] er i intervallet (n, id). &ldquo;Kom så nær id som mulig uten å gå forbi.&rdquo;</p>
        </SubQuestion>

        <SubQuestion
          label="c"
          question="Hva er LamportClock og hvordan brukes det til mutex?"
        >
          <p><strong>LamportClock:</strong> logisk klokke som økes ved hvert send/receive-event. max(lokal, mottatt) + 1 ved mottak.</p>
          <p><strong>Distribuert mutex:</strong></p>
          <ol className="list-decimal list-inside ml-2 text-xs">
            <li>Send REQUEST(timestamp, node-ID) til alle andre noder</li>
            <li>Vent på REPLY fra alle</li>
            <li>Gå inn i kritisk seksjon</li>
            <li>Send RELEASE til alle etter ferdig</li>
          </ol>
          <p>Ordnelsesprinsipp: lavest (timestamp, node-ID) går først.</p>
        </SubQuestion>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Chord-prosjektet testes oftere enn de andre. Prioriter å forstå fingertabellen og oppslags-algoritmene.
          </span>
        </div>
      </ExamYear>
    </div>
  );
}
