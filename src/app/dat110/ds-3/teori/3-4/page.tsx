"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS3_4Page() {
  const [serverType, setServerType] = useState<"iterativ" | "concurrent">("iterativ");
  const [threadModel, setThreadModel] = useState<"per-request" | "pool">("per-request");
  const [stateType, setStateType] = useState<"stateless" | "stateful">("stateless");
  const [reqStep, setReqStep] = useState(0);

  const steps = [
    { label: "Klient A sender forespørsel", color: "#3b82f6" },
    { label: "Dispatcher mottar — velger worker", color: "#8b5cf6" },
    { label: "Worker 1 håndterer A", color: "#10b981" },
    { label: "Klient B sender forespørsel parallelt", color: "#f59e0b" },
    { label: "Worker 2 håndterer B", color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-3/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">3.4 Server-design</span>
      </div>

      <h1 className="text-2xl font-bold">3.4 Server-design</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Server-design er direkte eksamensrelevant. Forstå iterativ vs concurrent, stateful vs stateless,
        og how tråder brukes for å gi distribusjonssransparens til klienter.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips — Oppgave 7 (direkte relevant)</p>
        <ul className="text-amber-900 dark:text-amber-200 list-disc pl-4 space-y-1">
          <li><strong>Januar 2025:</strong> "Beskriv forskjellen mellom stateful og stateless server"</li>
          <li><strong>Mai 2024:</strong> "Hva er formålet med multithreading og callback i RPC-design?"</li>
          <li><strong>Fra forelesning (slide 7–12):</strong> Iterativ vs concurrent server, dispatcher/worker-modellen, stateful/stateless</li>
        </ul>
      </div>

      {/* Iterativ vs concurrent */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Iterativ vs Concurrent server</h2>

        <div className="flex gap-2">
          {(["iterativ", "concurrent"] as const).map(t => (
            <button
              key={t}
              onClick={() => setServerType(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                serverType === t
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {t === "iterativ" ? "Iterativ server" : "Concurrent server"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
          {serverType === "iterativ" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Iterativ server</h3>
              <p className="text-sm">
                Serveren håndterer forespørsler <strong>én etter én</strong>. Den behandler én forespørsel
                til den er ferdig, og sender svar — deretter tar den neste. Ingen parallellisme.
              </p>
              <svg viewBox="0 0 460 140" className="w-full max-w-md">
                {/* Clients */}
                <rect x="10" y="20" width="70" height="30" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="45" y="39" textAnchor="middle" fill="#1e40af" fontSize="10">Klient A</text>
                <rect x="10" y="70" width="70" height="30" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
                <text x="45" y="89" textAnchor="middle" fill="#92400e" fontSize="10">Klient B</text>
                <rect x="10" y="100" width="70" height="30" rx="4" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" opacity="0.5"/>
                <text x="45" y="119" textAnchor="middle" fill="#991b1b" fontSize="10" opacity="0.5">Klient C</text>
                {/* Server */}
                <rect x="180" y="10" width="150" height="120" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
                <text x="255" y="30" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Iterativ Server</text>
                <rect x="195" y="38" width="120" height="85" rx="4" fill="#a7f3d0"/>
                <text x="255" y="58" textAnchor="middle" fill="#065f46" fontSize="10">Behandler A...</text>
                <text x="255" y="75" textAnchor="middle" fill="#6b7280" fontSize="9">(B venter)</text>
                <text x="255" y="92" textAnchor="middle" fill="#6b7280" fontSize="9">(C venter)</text>
                <text x="255" y="112" textAnchor="middle" fill="#ef4444" fontSize="9">Kø! ❌</text>
                {/* Arrows */}
                <line x1="80" y1="35" x2="178" y2="50" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrs)"/>
                <line x1="80" y1="85" x2="178" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4"/>
                <line x1="80" y1="115" x2="178" y2="110" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="120" y="68" textAnchor="middle" fill="#6b7280" fontSize="8">venter...</text>
                {/* Queue label */}
                <rect x="350" y="40" width="100" height="80" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5"/>
                <text x="400" y="60" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Problem:</text>
                <text x="400" y="78" textAnchor="middle" fill="#991b1b" fontSize="9">B og C må</text>
                <text x="400" y="93" textAnchor="middle" fill="#991b1b" fontSize="9">vente selv</text>
                <text x="400" y="108" textAnchor="middle" fill="#991b1b" fontSize="9">om A er lang</text>
                <defs>
                  <marker id="arrs" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                  </marker>
                </defs>
              </svg>
              <div className="text-sm bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="font-semibold mb-1">Fra forelesning (definisjon):</p>
                <p className="text-xs italic">"Iterative server: the server itself handles the request and, if necessary, returns a response to the requesting client."</p>
                <p className="text-xs mt-2">Brukes når forespørsler er raske og jevne (f.eks. enkel DNS-server).</p>
              </div>
            </>
          )}

          {serverType === "concurrent" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Concurrent server (Multithreaded)</h3>
              <p className="text-sm">
                Serveren håndterer forespørsler <strong>parallelt</strong>. Den mottar en forespørsel
                og sender den videre til en tråd eller prosess, og er straks klar for neste forespørsel.
                Eksempel: multithreaded webserver.
              </p>
              <svg viewBox="0 0 460 150" className="w-full max-w-md">
                <rect x="10" y="20" width="70" height="30" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="45" y="39" textAnchor="middle" fill="#1e40af" fontSize="10">Klient A</text>
                <rect x="10" y="70" width="70" height="30" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
                <text x="45" y="89" textAnchor="middle" fill="#92400e" fontSize="10">Klient B</text>
                <rect x="10" y="110" width="70" height="30" rx="4" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5"/>
                <text x="45" y="129" textAnchor="middle" fill="#991b1b" fontSize="10">Klient C</text>
                {/* Dispatcher */}
                <rect x="150" y="50" width="90" height="50" rx="5" fill="#c7d2fe" stroke="#818cf8" strokeWidth="2"/>
                <text x="195" y="72" textAnchor="middle" fill="#3730a3" fontSize="10" fontWeight="bold">Dispatcher</text>
                <text x="195" y="87" textAnchor="middle" fill="#3730a3" fontSize="9">tråd</text>
                {/* Arrows to dispatcher */}
                <line x1="80" y1="35" x2="148" y2="65" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrs2)"/>
                <line x1="80" y1="85" x2="148" y2="75" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrs2)"/>
                <line x1="80" y1="125" x2="148" y2="85" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrs2)"/>
                {/* Workers */}
                <rect x="300" y="10" width="90" height="30" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
                <text x="345" y="29" textAnchor="middle" fill="#065f46" fontSize="10">Worker 1 (A)</text>
                <rect x="300" y="55" width="90" height="30" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
                <text x="345" y="74" textAnchor="middle" fill="#065f46" fontSize="10">Worker 2 (B)</text>
                <rect x="300" y="100" width="90" height="30" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
                <text x="345" y="119" textAnchor="middle" fill="#065f46" fontSize="10">Worker 3 (C)</text>
                {/* Arrows from dispatcher to workers */}
                <line x1="240" y1="65" x2="298" y2="27" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrs2)"/>
                <line x1="240" y1="75" x2="298" y2="70" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrs2)"/>
                <line x1="240" y1="85" x2="298" y2="113" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrs2)"/>
                <text x="345" y="148" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Alle kjorer parallelt!</text>
                <defs>
                  <marker id="arrs2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                  </marker>
                </defs>
              </svg>
              <div className="text-sm bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-xs">
                <p className="font-semibold mb-1">Fra forelesning (definisjon):</p>
                <p className="italic">"Concurrent server: it does not handle the request itself, but passes it to a separate thread or another process, after which it immediately waits for the next incoming request. E.g. Multithreaded server."</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Thread-per-request vs Thread pool */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Thread-per-request vs Thread pool</h2>

        <div className="flex gap-2">
          {(["per-request", "pool"] as const).map(t => (
            <button
              key={t}
              onClick={() => setThreadModel(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                threadModel === t
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {t === "per-request" ? "Thread-per-request" : "Thread pool"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3 text-sm">
          {threadModel === "per-request" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Thread-per-request</h3>
              <p>En ny tråd opprettes for <em>hver</em> innkommende forespørsel. Tråden avsluttes etter at forespørselen er håndtert.</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Enkel implementasjon</li>
                    <li>Ingen tråd-grense a priori</li>
                    <li>Fullstendig isolasjon per forespørsel</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Høy overhead: opprett og slett tråd per forespørsel</li>
                    <li>Kan lage for mange tråder ved høy last</li>
                    <li>Minnebruk vokser ukontrollert</li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {threadModel === "pool" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Thread pool</h3>
              <p>Et fast sett av tråder opprettes ved oppstart. Forespørsler legges i en kø og hentes av ledige tråder fra poolen.</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Lav overhead (tråder gjenbrukes)</li>
                    <li>Kontrollert ressursbruk (begrenset antall tråder)</li>
                    <li>Bedre ytelse ved høy last</li>
                    <li>Standard i produksjons-webservere (Tomcat, Nginx)</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Forespørsler kan vente i kø hvis alle tråder er opptatt</li>
                    <li>Pool-størrelse må konfigureres riktig</li>
                    <li>Mer kompleks implementasjon</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Interaktiv steg-for-steg */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Visualisering: Dispatcher/Worker-modellen
        </h2>
        <p className="text-sm text-[var(--muted)]">Klikk gjennom stegene for å se hva som skjer:</p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setReqStep(Math.max(0, reqStep - 1))}
              disabled={reqStep === 0}
              className="px-3 py-1 rounded-lg border border-[var(--card-border)] text-sm disabled:opacity-40 hover:border-blue-400 transition-colors"
            >
              ← Forrige
            </button>
            <span className="text-sm text-[var(--muted)]">Steg {reqStep + 1} av {steps.length}</span>
            <button
              onClick={() => setReqStep(Math.min(steps.length - 1, reqStep + 1))}
              disabled={reqStep === steps.length - 1}
              className="px-3 py-1 rounded-lg border border-[var(--card-border)] text-sm disabled:opacity-40 hover:border-blue-400 transition-colors"
            >
              Neste →
            </button>
            <button
              onClick={() => setReqStep(0)}
              className="px-3 py-1 rounded-lg text-xs border border-[var(--card-border)] hover:border-blue-400 transition-colors"
            >
              Tilbakestill
            </button>
          </div>
          <div
            className="rounded-lg p-4 text-sm font-medium border-2 transition-all"
            style={{ borderColor: steps[reqStep].color, backgroundColor: steps[reqStep].color + "22" }}
          >
            {steps[reqStep].label}
          </div>
          <div className="space-y-1 text-xs text-[var(--muted)]">
            {steps.slice(0, reqStep + 1).map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full flex-shrink-0 inline-block" style={{ backgroundColor: s.color }}/>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stateful vs Stateless */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Stateful vs Stateless server</h2>
        <p className="text-sm text-[var(--muted)]">
          Dette er et hyppig eksamenstema (oppgave 7, januar 2025).
        </p>

        <div className="flex gap-2">
          {(["stateless", "stateful"] as const).map(t => (
            <button
              key={t}
              onClick={() => setStateType(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                stateType === t
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {t === "stateless" ? "Stateless server" : "Stateful server"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
          {stateType === "stateless" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Stateless server (tilstandsløs)</h3>
              <p className="text-sm">
                En stateless server <strong>lagrer ingen informasjon om klienter mellom forespørsler</strong>.
                Hver forespørsel er selvstendig og inneholder all nødvendig informasjon.
                Serveren kan endre sin egen interne tilstand uten å informere klienter.
              </p>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                <p className="text-xs font-semibold mb-2">Eksempel fra forelesning: Web Server (HTTP)</p>
                <svg viewBox="0 0 420 120" className="w-full max-w-md">
                  <rect x="10" y="10" width="80" height="100" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5"/>
                  <text x="50" y="35" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">Klienter</text>
                  <line x1="90" y1="40" x2="200" y2="40" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs3)"/>
                  <text x="145" y="33" textAnchor="middle" fill="#6b7280" fontSize="8">REQUEST</text>
                  <line x1="200" y1="55" x2="90" y2="55" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs3)"/>
                  <text x="145" y="67" textAnchor="middle" fill="#6b7280" fontSize="8">REPLY: file1.html</text>
                  <line x1="90" y1="80" x2="200" y2="80" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs3)"/>
                  <text x="145" y="73" textAnchor="middle" fill="#6b7280" fontSize="8">REQUEST</text>
                  <line x1="200" y1="95" x2="90" y2="95" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs3)"/>
                  <text x="145" y="107" textAnchor="middle" fill="#6b7280" fontSize="8">REPLY: file2.html</text>
                  <rect x="200" y="10" width="110" height="100" rx="4" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
                  <text x="255" y="30" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold">Web Server</text>
                  <text x="255" y="55" textAnchor="middle" fill="#065f46" fontSize="9">file1.html</text>
                  <text x="255" y="72" textAnchor="middle" fill="#065f46" fontSize="9">file2.html</text>
                  <text x="255" y="100" textAnchor="middle" fill="#6b7280" fontSize="8">Husker ingenting om klient</text>
                  <rect x="320" y="40" width="90" height="40" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" strokeDasharray="3"/>
                  <text x="365" y="58" textAnchor="middle" fill="#991b1b" fontSize="9">Ingen klient-</text>
                  <text x="365" y="72" textAnchor="middle" fill="#991b1b" fontSize="9">tilstand lagret</text>
                  <defs>
                    <marker id="arrs3" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                      <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Enkel å replisere (alle replika er like)</li>
                    <li>God feiltolerans — krasj mister ingen klienttilstand</li>
                    <li>Enkel å skalere horisontalt</li>
                    <li>Kan avsluttes/startes uten å varsle klienter</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Klienten må sende all kontekst i hver forespørsel</li>
                    <li>Større forespørsler (redundant informasjon)</li>
                    <li>Vanskeligere å implementere sesjoner</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)]">Eksempler: HTTP web server (uten cookies), DNS, NFS (til en viss grad)</p>
            </>
          )}
          {stateType === "stateful" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Stateful server (tilstandsfull)</h3>
              <p className="text-sm">
                En stateful server <strong>lagrer persistent informasjon om klienter</strong> mellom forespørsler.
                Den husker hvem klienten er og hva klienten har gjort tidligere.
              </p>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 text-xs">
                <p className="font-semibold mb-2">Eksempel fra forelesning: File Server</p>
                <ul className="list-disc pl-3 space-y-1">
                  <li>Klient kaller <code className="bg-white dark:bg-gray-900 px-1 rounded">open()</code> på server — server returnerer filbeskrivelse (fd)</li>
                  <li>Klient kaller <code className="bg-white dark:bg-gray-900 px-1 rounded">read(fd)</code> — server holder styr på filpeker per klient</li>
                  <li>Server husker åpne filer og filposisjon for <em>hver</em> klient</li>
                  <li>Klient kan ha en lokal kopi av filen</li>
                </ul>
                <p className="mt-2 font-semibold text-blue-700 dark:text-blue-300">
                  Fra forelesning: "A stateful server does maintain persistent information on its clients"
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Effektiv kommunikasjon (ikke send hele kontekst)</li>
                    <li>Kan forutse klientbehov (prefetching)</li>
                    <li>Naturlig for sesjonsbaserte tjenester</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Krasj mister klienttilstand — vanskelig å gjenopprette</li>
                    <li>Vanskeligere å replisere (tilstand må synkroniseres)</li>
                    <li>Må varsle klienter ved avslutning</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)]">Eksempler: FTP server (holder styr på katalogsessjon), database-tilkoblinger, spillservere</p>
            </>
          )}
        </div>
      </section>

      {/* Eksamenstips stateless replikering */}
      <section className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm space-y-2">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300">Eksamens-diskusjon: Stateless autentiseringsserver</h3>
        <p className="text-xs">
          Fra forelesning: Diskuter hvordan man designer en <em>ekte stateless</em> autentiseringsserver-replika.
          Problemet: switchen kan sende forespørselen til <em>hvilken som helst</em> replika,
          men vi vil ikke at replakaen lagrer sesjonstilstand.
        </p>
        <p className="text-xs font-semibold">Løsning — tips fra forelesning:</p>
        <ul className="text-xs list-disc pl-4 space-y-1">
          <li><strong>Authentication tokens (JWT)</strong>: Klienten bærer all tilstandsinformasjon i en signert token</li>
          <li><strong>Kryptografisk signering</strong>: Serveren verifiserer token uten å huske noe</li>
          <li><strong>Hashing</strong>: Passord lagres hashet i delt database, ikke i server-minne</li>
        </ul>
      </section>

      {/* Server clusters tre-lags */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Server clusters: Tre-lags arkitektur (LAN-cluster)
        </h2>
        <p className="text-sm">
          Fra forelesningen: LAN-clustere bruker tre lag for å gi replikerings-transparens.
          Klienter tror de snakker med én server.
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <svg viewBox="0 0 500 180" className="w-full max-w-lg">
            {/* Client requests */}
            <rect x="10" y="70" width="80" height="40" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5"/>
            <text x="50" y="87" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Klient-</text>
            <text x="50" y="100" textAnchor="middle" fill="#1e40af" fontSize="10">forespørsler</text>
            <line x1="90" y1="90" x2="120" y2="90" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrs4)"/>
            {/* First tier: switch */}
            <rect x="120" y="40" width="90" height="100" rx="6" fill="#c7d2fe" stroke="#818cf8" strokeWidth="2"/>
            <text x="165" y="65" textAnchor="middle" fill="#3730a3" fontSize="10" fontWeight="bold">Logisk</text>
            <text x="165" y="80" textAnchor="middle" fill="#3730a3" fontSize="10" fontWeight="bold">Switch</text>
            <text x="165" y="100" textAnchor="middle" fill="#6b7280" fontSize="8">(1. lag)</text>
            <text x="165" y="115" textAnchor="middle" fill="#6b7280" fontSize="8">request</text>
            <text x="165" y="128" textAnchor="middle" fill="#6b7280" fontSize="8">dispatching</text>
            {/* Second tier: app servers */}
            <rect x="270" y="10" width="90" height="40" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <text x="315" y="34" textAnchor="middle" fill="#065f46" fontSize="9">App-server 1</text>
            <rect x="270" y="70" width="90" height="40" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <text x="315" y="94" textAnchor="middle" fill="#065f46" fontSize="9">App-server 2</text>
            <rect x="270" y="130" width="90" height="40" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <text x="315" y="154" textAnchor="middle" fill="#065f46" fontSize="9">App-server 3</text>
            <text x="315" y="175" textAnchor="middle" fill="#6b7280" fontSize="8">(2. lag)</text>
            {/* Arrows switch to app servers */}
            <line x1="210" y1="75" x2="268" y2="28" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs4)"/>
            <line x1="210" y1="90" x2="268" y2="90" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs4)"/>
            <line x1="210" y1="105" x2="268" y2="148" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrs4)"/>
            {/* Third tier: databases */}
            <rect x="410" y="50" width="75" height="35" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="447" y="72" textAnchor="middle" fill="#92400e" fontSize="9">Database 1</text>
            <rect x="410" y="100" width="75" height="35" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x="447" y="122" textAnchor="middle" fill="#92400e" fontSize="9">Database 2</text>
            <text x="447" y="155" textAnchor="middle" fill="#6b7280" fontSize="8">(3. lag)</text>
            <line x1="360" y1="30" x2="408" y2="63" stroke="#6b7280" strokeWidth="1" strokeDasharray="3"/>
            <line x1="360" y1="90" x2="408" y2="90" stroke="#6b7280" strokeWidth="1" strokeDasharray="3"/>
            <line x1="360" y1="150" x2="408" y2="120" stroke="#6b7280" strokeWidth="1" strokeDasharray="3"/>
            <defs>
              <marker id="arrs4" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
              </marker>
            </defs>
          </svg>
          <p className="text-xs text-[var(--muted)] mt-2">
            Lag 1: Logisk switch (request dispatching). Lag 2: Applikasjons-/beregningsservere. Lag 3: Distribuert fil/database-system.
          </p>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">Hva du MÅ kunne til eksamen</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Iterativ server: håndterer én forespørsel av gangen — enkel men ikke skalerbar</li>
          <li>Concurrent server: delegerer til tråd/prosess og er straks klar — multithreaded (eks. webserver)</li>
          <li>Stateless server: lagrer ingen klienttilstand — enkel å replisere, god feiltolerans (eks. HTTP)</li>
          <li>Stateful server: husker klienttilstand mellom forespørsler — effektivt men vanskeligere å replisere (eks. file server med open/read)</li>
          <li>Dispatcher/worker-modellen: dispatcher-tråd mottar, worker-tråder behandler</li>
          <li>Thread pool vs thread-per-request: pool gjenbruker tråder, lavere overhead</li>
          <li>LAN-cluster tre-lags: switch (lag 1) → app-servere (lag 2) → database (lag 3)</li>
          <li>Multithreading i RPC-design: skjuler kommunikasjonslatens for klient (callback-mekanisme)</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li><strong>Feil:</strong> "Stateless er alltid bedre" — stateful er mer effektivt for sesjonsbaserte tjenester</li>
          <li><strong>Feil:</strong> Forveksle concurrent og parallell — concurrent betyr at serveren tar neste forespørsel, ikke at worker-tråden er ferdig</li>
          <li><strong>Feil:</strong> Glemme at stateful server er vanskeligere å replisere (tilstand må synkroniseres mellom replikaer)</li>
          <li><strong>Feil:</strong> Blande thread-per-request og thread pool — pool er mer effektivt i produksjon</li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-3/teori/3-3" className="hover:text-[var(--accent)] text-sm">← 3.3 Klient-design</Link>
        <Link href="/dat110/ds-3/teori/3-5" className="hover:text-[var(--accent)] text-sm">3.5 Kode-migrasjon →</Link>
      </div>
    </div>
  );
}
