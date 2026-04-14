"use client";

import Link from "next/link";
import { useState } from "react";

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

const obliger = [
  {
    id: 1,
    title: "Prosjekt 1: Socket Programming og RPC Middleware",
    description: "Implementer et IoT-system med temperatursensor, kontroller og display. Bygger RPC-middleware oppA TCP-sockets.",
    concepts: ["TCP-sockets", "RPC (Remote Procedure Call)", "Marshalling/unmarshalling", "Klient-server arkitektur", "Lagdelt arkitektur", "Kapsling/dekapsling"],
    examRelevance: "Oppg 2 spor ofte om RPC-arkitekturen fra dette prosjektet. Forstaa lagdelingen: Connection-layer, Messaging-layer, RPC-layer.",
    keyPoints: [
      "IoT-system: sensor -> kontroller -> display via RPC",
      "Tre lag: Connection (TCP sockets), Messaging (send/receive), RPC (metode-kall)",
      "Stubs: klient-stub serialiserer kall, server-stub deserialiserer og utforer",
      "Marshalling: konverter Java-objekter til byte-array for sending",
      "Unmarshalling: konverter byte-array tilbake til Java-objekter",
      "Sensor.read() og Display.write() ser ut som lokale kall, men utfores remote",
    ],
  },
  {
    id: 2,
    title: "Prosjekt 2: Publish-Subscribe Messaging Middleware",
    description: "Implementer PB-MOM (Publish-Subscribe Message-Oriented Middleware) med broker, topics og subscribers oppA messaging-laget fra prosjekt 1.",
    concepts: ["Publish-subscribe monster", "Broker", "Topics", "MQTT-konsepter", "Message-oriented middleware", "Event-drevet arkitektur"],
    examRelevance: "Oppg 2 kan sporre om pub/sub-arkitekturen. Forstaa broker-rollen, topic-handtering og hvordan meldinger distribueres til subscribers.",
    keyPoints: [
      "Publisher sender melding til topic via broker",
      "Subscriber registrerer seg pA topics og mottar meldinger",
      "Broker: mellommann som styrer topics, subscriptions og meldingsdistribusjon",
      "Create/delete topics, subscribe/unsubscribe, publish meldinger",
      "ChApp: chat-applikasjon som demonstrerer pub/sub i praksis",
      "Likhet med MQTT: topics, publish, subscribe — men forenklet",
    ],
  },
  {
    id: 3,
    title: "Prosjekt 3: DHT Cooperative Mirroring",
    description: "Implementer distribuert hash-tabell (DHT) med Chord-lignende ring, konsistensprotokoll og distribuert gjensidig utelukkelse.",
    concepts: ["DHT (Chord)", "Konsistent hashing", "Replikering", "Distribuert mutex", "Konsistensprotokoll", "Fingertabell"],
    examRelevance: "Sterkt knyttet til Oppg 10 (Chord DHT, 15%). Prosjektet gir hands-on erfaring med nokkelansvar, fingertabeller og oppslag.",
    keyPoints: [
      "Chord-ring med konsistent hashing for nokkelplassering",
      "Noder har ansvar for nokkelintervall: pred(n) < key <= n",
      "Replikering: data lagres pA flere noder for feiltoleranse",
      "Konsistensprotokoll: sikrer at replikaene er oppdaterte",
      "Distribuert mutex: koordinerer tilgang til delte ressurser",
      "Fingertabell: FT[i] = succ(n + 2^(i-1) mod 2^m) for O(log N) oppslag",
    ],
  },
];

export default function ObligerPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Obligatoriske prosjekter</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Obligatoriske prosjekter</h1>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        Tre prosjekter som bygger pA hverandre: sockets og RPC, publish-subscribe, og DHT.
        Oppgave 2 pA eksamen handler alltid om obliger — forstA konseptene bak koden.
      </p>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4 mb-8">
        <h3 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">
          Eksamenrelevans
        </h3>
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Oppgave 2 (~10%) handler alltid om det obligatoriske prosjektet.
          Typiske sporsmal: &ldquo;Forklar arkitekturen i prosjektet&rdquo;,
          &ldquo;Hva er fordelen med RPC?&rdquo;, &ldquo;Beskriv publish-subscribe&rdquo;.
          Fokuser pA a forstA <strong>konseptene og arkitekturen</strong>, ikke implementasjonsdetaljene.
        </p>
      </div>

      <div className="space-y-6">
        {obliger.map(oblig => (
          <div key={oblig.id} className="rounded-xl border-2 border-purple-400/40 bg-[var(--card)] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  Prosjekt {oblig.id}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{oblig.title}</h2>
              <p className="text-sm text-[var(--muted)] mb-4">{oblig.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {oblig.concepts.map(concept => (
                  <span key={concept} className="text-xs px-2.5 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
                    {concept}
                  </span>
                ))}
              </div>

              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-3 mb-4">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Eksamen: </strong>{oblig.examRelevance}
                </p>
              </div>

              <Collapsible title="Nokkelkonsepter for eksamen" defaultOpen={oblig.id === 1}>
                <ul className="space-y-2">
                  {oblig.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-purple-500 mt-0.5 shrink-0">*</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
