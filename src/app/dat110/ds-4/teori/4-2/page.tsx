"use client";
import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

const rpcSteps = [
  { step: 1, who: "Klient", desc: "Klienten kaller klient-stubben som om det var en lokal prosedyre. Klientkoden er identisk enten prosedyren er lokal eller fjern — dette er access transparency." },
  { step: 2, who: "Klient-stub", desc: "Marshaller parametere: konverterer dem fra lokale datatyper til en universell byte-strøm. Løser endianness-problemet og adresseromsproblemet." },
  { step: 3, who: "Klient-stub → OS", desc: "Klient-stubben overfører meldingen til klientens operativsystem via et system call." },
  { step: 4, who: "Klient OS → Server OS", desc: "Klientens OS sender meldingen over nettverket (via TCP/IP) til serverens OS." },
  { step: 5, who: "Server OS → Server-stub", desc: "Serverens OS mottar meldingen og videresender til server-stubben (også kalt skeleton)." },
  { step: 6, who: "Server-stub", desc: "Unmarshaller parametere: trekker ut verdiene fra byte-strømmen og konverterer til serverens lokale datatyper og endianness." },
  { step: 7, who: "Server-stub → Prosedyre", desc: "Server-stubben kaller den faktiske server-prosedyren med de unmarshallede parameterne som vanlige argumenter." },
  { step: 8, who: "Server-prosedyren", desc: "Utfører det faktiske arbeidet og returnerer resultater til server-stubben." },
  { step: 9, who: "Server-stub → Klient", desc: "Server-stubben marshaller resultater og sender dem tilbake til klienten gjennom samme pipeline (OS → nettverk → klient OS → klient-stub)." },
  { step: 10, who: "Klient-stub → Klient", desc: "Klient-stubben unmarshaller svaret og returnerer resultatet til klient-prosessen. Fra klientens perspektiv var dette et vanlig funksjonskall." },
];

const failureClasses = [
  {
    num: 1,
    title: "Klienten kan ikke finne serveren",
    color: "red",
    cause: "Serveren er ikke startet, har krasjet, eller er ikke registrert i navnetjenesten.",
    solution: "Stub kaster et unntak eller returnerer en feilkode til klienten. Ingen retransmit vil hjelpe uten at serveren er tilgjengelig.",
    exam: "Enklest failure class — klienten vet umiddelbart at noe er galt, uten å vente på timeout.",
    detail: null,
  },
  {
    num: 2,
    title: "Request-meldingen gikk tapt",
    color: "orange",
    cause: "Nettverkspakken med RPC-forespørselen ble droppet i nettverket.",
    solution: "Klienten venter på timeout, deretter retransmit. TRYGT å sende på nytt — serveren har aldri mottatt forespørselen, ingen dobbelt utførelse.",
    exam: "Tryggest failure class å håndtere. Retransmit er alltid trygt her.",
    detail: null,
  },
  {
    num: 3,
    title: "Serveren krasjer",
    color: "red",
    cause: "Serveren krasjer ENTEN (a) før prosedyren ble utført, ELLER (b) etter prosedyren ble utført.",
    solution: "Klienten venter på timeout og vet ikke hva som skjedde. Avhenger av om krasjet var FØR eller ETTER utførelse.",
    exam: "KRITISK: Skill mellom krasj FØR vs ETTER. Idempotente operasjoner er trygge å gjenta. Ikke-idempotente er farlige.",
    detail: "Krasj FØR utførelse → retransmit er trygt (som failure class 2). Krasj ETTER utførelse → retransmit kan gi dobbelt utførelse for ikke-idempotente operasjoner (som legge til penger på konto).",
  },
  {
    num: 4,
    title: "Reply-meldingen gikk tapt",
    color: "orange",
    cause: "Serveren utførte operasjonen og sendte svar, men svarmeldingen ble droppet i nettverket.",
    solution: "Klienten venter på timeout, vet ikke om operasjonen ble utført. Retransmit kan gi dobbelt utførelse for ikke-idempotente operasjoner!",
    exam: "Ligner failure class 3b (krasj etter) — klienten er i identisk uvitende tilstand. Idempotency er avgjørende.",
    detail: null,
  },
  {
    num: 5,
    title: "Klienten krasjer — Orphan problem",
    color: "purple",
    cause: "Klienten krasjer mens serveren holder på å behandle forespørselen.",
    solution: "Serveren fullfører jobben (orphan computation), men ingen vil motta svaret. Løsninger: (1) Extermination — klient dreper alle orphans ved oppstart. (2) Reincarnation — ny 'epoke', alle gammel-epoch orphans termineres.",
    exam: "Orphan = server jobber for ingen. Unikt problem — de andre failure classene handler om meldinger, denne om klientkrasj.",
    detail: null,
  },
];

export default function DS4_2Page() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeFailure, setActiveFailure] = useState<number | null>(null);
  const [showIdempotent, setShowIdempotent] = useState(false);
  const [showStubDetail, setShowStubDetail] = useState(false);
  const [activeVariant, setActiveVariant] = useState<string>("sync");

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.2 RPC — Remote Procedure Call</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">4.2 RPC — Remote Procedure Call</h1>
        <p className="text-[var(--muted)] max-w-2xl mt-2">
          RPC er den mest grunnleggende kommunikasjonsmekanismen i distribuerte systemer. Målet er{" "}
          <strong>access transparency</strong>: klienten kaller en prosedyre som om den var lokal,
          men den kjøres faktisk på en annen maskin.
        </p>
      </div>

      {/* EXAM BANNER */}
      <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm">
        <div className="font-bold text-red-700 dark:text-red-400 mb-1">EKSAMENSGARANTI — Alle 5 failure classes</div>
        <p className="text-red-700 dark:text-red-400">
          De 5 RPC failure classes er eksamensgarantert. Lær dem med årsak, konsekvens og løsning.
          Spesielt viktig: krasj FØR vs ETTER utførelse, og idempotent vs ikke-idempotent.
        </p>
      </div>

      {/* 1. MOTIVASJON */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">1. Motivasjon og utfordringer</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4 space-y-2">
            <div className="font-semibold text-red-700 dark:text-red-400">Problem 1: Separate adresserom</div>
            <p className="text-sm text-[var(--muted)]">
              I et distribuert system har klient og server separate adresserom på forskjellige maskiner.
              En funksjonspeker på klientmaskinen er meningsløs på servermaskinen.
              Parametere kan <strong>ikke</strong> overføres ved referanse over nettverk — bare ved verdi.
            </p>
          </div>
          <div className="rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-4 space-y-2">
            <div className="font-semibold text-orange-700 dark:text-orange-400">Problem 2: Endianness</div>
            <p className="text-sm text-[var(--muted)]">
              Intel x86 bruker <strong>little-endian</strong> (laveste byte først).
              IBM og mange andre bruker <strong>big-endian</strong> (høyeste byte først).
              Tallet 258 = 0x00000102: little-endian → [02,01,00,00]; big-endian → [00,00,01,02].
              RPC-systemet må konvertere mellom disse under marshalling.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 px-4 py-3 text-sm">
          <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Løsning: Access Transparency via stubs</div>
          <p className="text-blue-700 dark:text-blue-400">
            Klienten kaller <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">result = add(3, 5)</code> og får tilbake 8.
            Klientkoden er identisk enten prosedyren kjører lokalt eller på en server i Tokyo.
            All kompleksitet er skjult i <strong>stub-laget</strong> som RPC-systemet genererer automatisk.
          </p>
        </div>
      </section>

      {/* 2. DE 10 STEGENE */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">2. RPC — Steg for steg (10 steg)</h2>
        <p className="text-sm text-[var(--muted)]">Klikk på hvert steg for detaljert forklaring.</p>

        {/* Arkitektur-diagram */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <svg viewBox="0 0 700 210" className="w-full max-w-2xl mx-auto" aria-label="RPC-arkitektur">
            {/* Klient-maskin boks */}
            <rect x="10" y="10" width="145" height="190" rx="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5"/>
            <text x="82" y="28" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="bold">KLIENT-MASKIN</text>
            {/* Klient-prosess */}
            <rect x="22" y="35" width="120" height="38" rx="5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1"/>
            <text x="82" y="56" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">Klient-prosess</text>
            {/* Klient-stub */}
            <rect x="22" y="98" width="120" height="38" rx="5" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1"/>
            <text x="82" y="119" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">Klient-stub</text>
            {/* Klient OS */}
            <rect x="22" y="156" width="120" height="35" rx="5" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="82" y="178" textAnchor="middle" fontSize="10" fill="#1e3a8a" fontWeight="bold">Klient OS</text>

            {/* Server-maskin boks */}
            <rect x="545" y="10" width="145" height="190" rx="8" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5"/>
            <text x="617" y="28" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">SERVER-MASKIN</text>
            {/* Server-prosedyre */}
            <rect x="558" y="35" width="120" height="38" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
            <text x="618" y="56" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="bold">Server-prosedyre</text>
            {/* Server-stub */}
            <rect x="558" y="98" width="120" height="38" rx="5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
            <text x="618" y="119" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="bold">Server-stub</text>
            {/* Server OS */}
            <rect x="558" y="156" width="120" height="35" rx="5" fill="#86efac" stroke="#16a34a" strokeWidth="1.5"/>
            <text x="618" y="178" textAnchor="middle" fontSize="10" fill="#14532d" fontWeight="bold">Server OS</text>

            {/* Nettverk */}
            <text x="350" y="180" textAnchor="middle" fontSize="10" fill="#6b7280" fontStyle="italic">Nettverk</text>
            <line x1="142" y1="173" x2="558" y2="173" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4"/>

            {/* Kall-piler (blå, ned) */}
            <path d="M82 73 L82 98" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-b)"/>
            <text x="88" y="90" fontSize="9" fill="#3b82f6">① kall</text>
            <path d="M82 136 L82 156" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arr-b)"/>
            <text x="88" y="150" fontSize="9" fill="#3b82f6">②③</text>

            {/* Retur-piler klient (grå, opp) */}
            <path d="M76 98 L76 73" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arr-g)"/>
            <text x="48" y="90" fontSize="9" fill="#9ca3af">⑩ retur</text>

            {/* Server ned-piler */}
            <path d="M618 136 L618 98" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr-gr)"/>
            <text x="624" y="121" fontSize="9" fill="#16a34a">⑥</text>
            <path d="M618 98 L618 73" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr-gr)"/>
            <text x="624" y="90" fontSize="9" fill="#16a34a">⑦ kall</text>

            {/* Server retur-piler (grå) */}
            <path d="M612 73 L612 98" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arr-g)"/>
            <text x="574" y="90" fontSize="9" fill="#9ca3af">⑧ retur</text>
            <path d="M612 98 L612 136" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arr-g)"/>
            <text x="574" y="121" fontSize="9" fill="#9ca3af">⑨</text>

            {/* Nettverk-piler */}
            <path d="M142 168 L558 168" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arr-g)"/>
            <text x="350" y="163" textAnchor="middle" fontSize="8" fill="#6b7280">④ send →</text>
            <path d="M558 178 L142 178" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arr-g)"/>
            <text x="350" y="193" textAnchor="middle" fontSize="8" fill="#9ca3af">← ⑤ mottak</text>

            <defs>
              <marker id="arr-b" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/>
              </marker>
              <marker id="arr-gr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a"/>
              </marker>
              <marker id="arr-g" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af"/>
              </marker>
            </defs>
          </svg>
        </div>

        {/* Steg-liste */}
        <div className="space-y-2">
          {rpcSteps.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(activeStep === s.step ? null : s.step)}
              className="w-full text-left rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-bold shrink-0">
                  {s.step}
                </span>
                <span className="font-medium text-sm">{s.who}</span>
                <span className="ml-auto text-[var(--muted)] text-xs">{activeStep === s.step ? "▲" : "▼"}</span>
              </div>
              {activeStep === s.step && (
                <p className="mt-2 text-sm text-[var(--muted)] pl-10">{s.desc}</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 3. STUBS OG MARSHALLING */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">3. Stubs og Marshalling</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-[var(--card)] p-4 space-y-3">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Klient-stub</div>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Ser ut som et normalt lokalt funksjonskall for klienten</li>
              <li><strong>Marshaller</strong> parametere → nøytral byte-strøm</li>
              <li>Sender byte-strømmen via OS over nettverket</li>
              <li>Venter på svar (blokkerer ved synkron RPC)</li>
              <li><strong>Unmarshaller</strong> svaret → lokal returverdi</li>
              <li>Returnerer verdien til klienten</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-[var(--card)] p-4 space-y-3">
            <div className="font-semibold text-green-600 dark:text-green-400">Server-stub (Skeleton)</div>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Lytter på innkommende forespørsler</li>
              <li><strong>Unmarshaller</strong> byte-strøm → lokale parametere</li>
              <li>Kaller den faktiske server-prosedyren</li>
              <li>Mottar resultater fra prosedyren</li>
              <li><strong>Marshaller</strong> resultater → byte-strøm</li>
              <li>Sender byte-strøm tilbake til klienten</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
          <button
            onClick={() => setShowStubDetail(!showStubDetail)}
            className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--background)] rounded-lg transition-colors"
          >
            <span className="font-semibold">Stub-generering: Manuell vs IDL</span>
            <span className="text-[var(--muted)] text-sm">{showStubDetail ? "▲ Skjul" : "▼ Vis"}</span>
          </button>
          {showStubDetail && (
            <div className="px-4 pb-4 space-y-3 text-sm text-[var(--muted)]">
              <div>
                <div className="font-medium text-[var(--foreground)] mb-1">Manuell (alternativ 1)</div>
                <p>Programmerer skriver oversettelsesrutiner for hvert datatype. Tidkrevende og feilutsatt. Krever kunnskap om begge siders dataformater.</p>
              </div>
              <div>
                <div className="font-medium text-[var(--foreground)] mb-1">IDL — Interface Description Language (alternativ 2)</div>
                <p>
                  Programmerer beskriver grensesnittet i et språknøytralt IDL (parameternavn og typer).
                  En <strong>stub-kompilator (precompiler)</strong> genererer automatisk klient-stub og server-stub i ønsket programmeringsspråk.
                  Brukes i moderne systemer (gRPC bruker Protocol Buffers som IDL).
                </p>
              </div>
              <div className="rounded border border-[var(--card-border)] bg-[var(--background)] p-3 font-mono text-xs">
                <div className="text-[var(--muted)] mb-1">// Eksempel IDL-definisjon</div>
                <div>int add(in int a, in int b);</div>
                <div className="text-[var(--muted)] mt-2">// IDL-kompilatoren genererer:</div>
                <div>// - client_stub_add.c (klient-side)</div>
                <div>// - server_skeleton_add.c (server-side)</div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <div className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Marshalling løser endianness-problemet</div>
          <p className="text-amber-700 dark:text-amber-400">
            Under marshalling konverteres data til et nøytralt nettverksformat (typisk big-endian / "network byte order").
            Mottakeren konverterer tilbake til sin lokale byte-rekkefølge under unmarshalling.
            Dermed kommuniserer Intel (little-endian) og IBM (big-endian) feilfritt.
          </p>
        </div>
      </section>

      {/* 4. FAILURE CLASSES */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">4. De 5 RPC Failure Classes</h2>

        <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm mb-2">
          <div className="font-bold text-red-700 dark:text-red-400">Dette er eksamensgarantert!</div>
          <p className="text-red-700 dark:text-red-400">
            Klikk på hver klasse for å se årsak, konsekvens og løsning. Husk: failure classes er nummerert og navngitt.
          </p>
        </div>

        <div className="space-y-3">
          {failureClasses.map((f) => {
            const styles: Record<string, { border: string; head: string; badge: string }> = {
              red: {
                border: "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20",
                head: "text-red-700 dark:text-red-400",
                badge: "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200",
              },
              orange: {
                border: "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/20",
                head: "text-orange-700 dark:text-orange-400",
                badge: "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200",
              },
              purple: {
                border: "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20",
                head: "text-purple-700 dark:text-purple-400",
                badge: "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200",
              },
            };
            const s = styles[f.color];
            return (
              <div key={f.num} className={`rounded-lg border ${s.border} overflow-hidden`}>
                <button
                  onClick={() => setActiveFailure(activeFailure === f.num ? null : f.num)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3"
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${s.badge}`}>
                    {f.num}
                  </span>
                  <span className={`font-semibold ${s.head}`}>{f.title}</span>
                  <span className={`ml-auto text-xs ${s.head}`}>
                    {activeFailure === f.num ? "▲ Lukk" : "▼ Åpne"}
                  </span>
                </button>
                {activeFailure === f.num && (
                  <div className={`px-4 pb-4 space-y-2 text-sm ${s.head}`}>
                    <div><span className="font-medium">Årsak: </span>{f.cause}</div>
                    <div><span className="font-medium">Løsning: </span>{f.solution}</div>
                    {f.detail && <div><span className="font-medium">Viktig detalj: </span>{f.detail}</div>}
                    <div className="italic"><span className="font-medium">Eksamenstips: </span>{f.exam}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. IDEMPOTENT */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">5. Idempotente operasjoner</h2>

        <button
          onClick={() => setShowIdempotent(!showIdempotent)}
          className="w-full text-left rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 flex items-center justify-between hover:border-blue-400 transition-colors"
        >
          <span className="font-medium">Hva betyr idempotent? (Klikk for forklaring)</span>
          <span className="text-[var(--muted)] text-sm">{showIdempotent ? "▲" : "▼"}</span>
        </button>

        {showIdempotent && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4">
              <div className="font-bold text-green-700 dark:text-green-400 mb-2">Idempotent — trygt å gjenta</div>
              <p className="text-sm text-green-700 dark:text-green-400 mb-3">
                Å utføre operasjonen flere ganger gir samme resultat. Retransmit er alltid trygt.
              </p>
              <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 list-disc list-inside">
                <li>Les fil (uendret ved gjentakelse)</li>
                <li>Sett pris = 100 kr (setter alltid til samme verdi)</li>
                <li>Søk i database</li>
                <li>HTTP GET-request</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-4">
              <div className="font-bold text-red-700 dark:text-red-400 mb-2">Ikke-idempotent — farlig å gjenta</div>
              <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                Å utføre operasjonen flere ganger gir forskjellig resultat. Retransmit kan gi uønsket effekt!
              </p>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-1 list-disc list-inside">
                <li>Legg til 100 kr på konto (dobbeltbetaling!)</li>
                <li>Append til fil (dobbelinnhold!)</li>
                <li>Inkrementer teller</li>
                <li>Send e-post</li>
              </ul>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <div className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips: Failure class 3 og 4</div>
          <p className="text-amber-700 dark:text-amber-400">
            Når klienten ikke vet om serveren utførte operasjonen (krasj etter utførelse / reply tapt),
            er idempotency avgjørende. Idempotente operasjoner → retransmit trygt.
            Ikke-idempotente → trenger sequence numbers eller eksplisitt sjekk fra server.
          </p>
        </div>
      </section>

      {/* 6. RPC-VARIANTER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">6. RPC-varianter</h2>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "sync", label: "Synkron RPC" },
            { key: "async", label: "Asynkron RPC" },
            { key: "deferred", label: "Utsatt synkron" },
            { key: "multicast", label: "Multicast RPC" },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setActiveVariant(v.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeVariant === v.key
                  ? "bg-blue-600 text-white"
                  : "border border-[var(--card-border)] text-[var(--muted)] hover:border-blue-400"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {activeVariant === "sync" && (
          <div className="rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-4 space-y-3">
            <div className="font-bold text-blue-700 dark:text-blue-400">Synkron RPC — blokkerende</div>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Klienten <strong>blokkerer</strong> helt til serveren returnerer det fulle resultatet.
              Tradisjonell modell — enklest å programmere, men ineffektiv ved lange operasjoner.
            </p>
            <div className="text-sm">
              <div className="font-medium text-blue-700 dark:text-blue-400">Tidslinje:</div>
              <div className="font-mono text-xs bg-blue-100 dark:bg-blue-900/40 p-2 rounded mt-1">
                Klient: ─── kall ──→ [BLOKKERT] ←── resultat ─── fortsetter<br/>
                Server:              ←── mottar ─── behandler ─── sender svar →
              </div>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              <span className="font-medium">Brukstilfelle:</span> Databasespørringer, beregninger der klienten trenger svaret umiddelbart.
            </div>
          </div>
        )}

        {activeVariant === "async" && (
          <div className="rounded-lg border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 p-4 space-y-3">
            <div className="font-bold text-green-700 dark:text-green-400">Asynkron RPC — ikke-blokkerende</div>
            <p className="text-sm text-green-700 dark:text-green-400">
              Klienten sender forespørselen, venter kun på <strong>ACK</strong> (aksepteringskvittering) fra serveren,
              og fortsetter umiddelbart. Resultatet mottas aldri direkte — one-way RPC.
            </p>
            <div className="text-sm">
              <div className="font-medium text-green-700 dark:text-green-400">Tidslinje:</div>
              <div className="font-mono text-xs bg-green-100 dark:bg-green-900/40 p-2 rounded mt-1">
                Klient: ─── kall ──→ ←── ACK ─── [fortsetter umiddelbart]<br/>
                Server:              ←── mottar ─── behandler (klienten vet ikke om resultatet)
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">
              <span className="font-medium">Brukstilfelle:</span> Logging, e-post sending, hendelsesregistrering, fire-and-forget.
            </div>
          </div>
        )}

        {activeVariant === "deferred" && (
          <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-3">
            <div className="font-bold text-amber-700 dark:text-amber-400">Utsatt synkron RPC — to async + callback</div>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Kombinerer to asynkrone RPC-er: klienten sender forespørsel (async), får ACK og fortsetter.
              Når serveren er ferdig, <strong>kaller serveren tilbake</strong> til klienten med resultatet (callback).
              Klienten må ha en dedikert tråd som lytter på callback-en.
            </p>
            <div className="text-sm">
              <div className="font-medium text-amber-700 dark:text-amber-400">Tidslinje:</div>
              <div className="font-mono text-xs bg-amber-100 dark:bg-amber-900/40 p-2 rounded mt-1">
                Klient: ─── request ──→ ←── ACK ─── [gjør annet arbeid] ←── callback ───<br/>
                Server:  ←── mottar ─────────────── behandler ──────────── sender callback →
              </div>
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400">
              <span className="font-medium">Krever:</span> Klienten har en tråd klar for å ta imot callback. Server opptrer som klient ved callback.{" "}
              <span className="font-medium">Brukstilfelle:</span> Fil-konvertering, lange beregninger der klienten trenger resultatet til slutt.
            </div>
          </div>
        )}

        {activeVariant === "multicast" && (
          <div className="rounded-lg border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20 p-4 space-y-3">
            <div className="font-bold text-purple-700 dark:text-purple-400">Multicast RPC — parallell til mange servere</div>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              Sender én RPC-forespørsel til <strong>flere servere samtidig</strong>.
              Brukes for parallell beregning eller redundans/replikering.
              Klienten kan vente på første svar (racing) eller alle svar.
            </p>
            <div className="text-sm">
              <div className="font-medium text-purple-700 dark:text-purple-400">Eksempel:</div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Parallell passordsøk: klient sender ett passord-hash til 100 servere.
                Hver server sjekker sin del av ordboken. Første server som finner match svarer.
              </p>
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              <span className="font-medium">Brukstilfelle:</span> Distribuert søk, replikerte databaser (skriv til alle), parallelle beregninger.
            </div>
          </div>
        )}
      </section>

      {/* 7. Sammendrag tabell */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">7. Sammendragtabell</h2>

        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">RPC-type</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Klient blokkerer til</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Får resultat?</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Typisk bruk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Synkron RPC</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-red-600 dark:text-red-400">Komplett resultat</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Ja — direkte</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">DB-spørringer</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Asynkron RPC</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">ACK-akseptering</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-red-600 dark:text-red-400">Nei</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Logging, e-post</td>
              </tr>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Utsatt synkron</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">ACK-akseptering</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-amber-600 dark:text-amber-400">Ja — via callback</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Fil-konvertering</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Multicast RPC</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Varierer</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-purple-600 dark:text-purple-400">Ja — fra mange</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Parallell søk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-4/teori/4-1" className="hover:text-[var(--accent)] text-sm">
          ← 4.1 Kommunikasjonsgrunnlag
        </Link>
        <Link href="/dat110/ds-4/teori/4-3" className="hover:text-[var(--accent)] text-sm">
          4.3 MQTT og meldingsorientert kommunikasjon →
        </Link>
      </div>
    </div>
  );
}
