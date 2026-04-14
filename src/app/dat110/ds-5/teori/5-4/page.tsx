"use client";

import { useState } from "react";
import Link from "next/link";

type ElectionAlgo = "bully" | "ring";

// Bully-algoritmen steg-for-steg
// 5 prosesser (P1–P5), P5 er koordinator, P5 krasjer, P3 oppdager det
const bullySteps = [
  {
    title: "Starttilstand",
    desc: "5 prosesser: P1, P2, P3, P4, P5. P5 (høyest ID) er koordinator.",
    detail: "Alle prosesser vet hvem koordinatoren er. Systemet fungerer normalt.",
    active: [1,2,3,4],
    coordinator: 5,
    crashed: [] as number[],
  },
  {
    title: "P5 krasjer",
    desc: "Koordinator P5 svarer ikke lenger. P3 oppdager dette (timeout).",
    detail: "P3 prøver å kontakte P5, men får ikke svar innen timeout.",
    active: [1,2,3,4],
    coordinator: 5,
    crashed: [5],
  },
  {
    title: "P3 sender ELECTION til prosesser med HØYERE ID",
    desc: "P3 sender ELECTION-melding kun til P4 (P5 er krasjet).",
    detail: "VIKTIG: Bully sender ELECTION kun til prosesser med HØYERE ID enn seg selv, ikke til alle!",
    active: [1,2,3,4],
    coordinator: null,
    crashed: [5],
  },
  {
    title: "P4 svarer OK til P3, starter sin egen election",
    desc: "P4 mottar ELECTION fra P3. Siden P4 > P3 svarer P4 med OK.",
    detail: "P4 sier til P3: «Jeg tar over herfra». P3 stopper sin election. P4 sender ELECTION til P5 (men P5 er krasjet — ingen svar).",
    active: [1,2,3,4],
    coordinator: null,
    crashed: [5],
  },
  {
    title: "P4 vinner — ingen svar fra høyere ID",
    desc: "P4 ventet, fikk ikke OK fra noen høyere prosess (P5 er krasjet).",
    detail: "P4 erklærer seg selv som ny koordinator og sender COORDINATOR til alle.",
    active: [1,2,3,4],
    coordinator: 4,
    crashed: [5],
  },
  {
    title: "Alle prosesser kjenner den nye koordinatoren",
    desc: "P1, P2, P3, P4 har alle mottatt COORDINATOR-meldingen fra P4.",
    detail: "P4 er nå koordinator. Systemet fungerer igjen. Hvis P5 gjenopprettes, starter den en ny election og vinner (siden den har høyest ID).",
    active: [1,2,3,4],
    coordinator: 4,
    crashed: [5],
  },
];

// Ring-algoritmen steg-for-steg
const ringSteps = [
  {
    title: "Starttilstand — ring av prosesser",
    desc: "Prosessene P1–P5 er organisert i en ring. P5 (koordinator) krasjer.",
    detail: "Ring-rekkefølge: P1 → P2 → P3 → P4 → P5 → P1. P3 oppdager at P5 er krasjet.",
  },
  {
    title: "P3 sender ELECTION([3]) til neste i ringen — P4",
    desc: "P3 starter election ved å sende ELECTION med sin ID i en liste.",
    detail: "Meldingen inneholder listen [3]. P4 mottar den.",
  },
  {
    title: "P4 legger til sin ID og videresender",
    desc: "P4 legger sin ID til listen: [3, 4]. Sender til P5.",
    detail: "Men P5 er krasjet! P4 hopper over P5 og sender til P1. Liste: [3, 4].",
  },
  {
    title: "P1 legger til: [3, 4, 1]. Sender til P2.",
    desc: "P1 ser sin ID er ikke i listen, legger til: [3, 4, 1].",
    detail: "Sender videre til P2.",
  },
  {
    title: "P2 legger til: [3, 4, 1, 2]. Sender til P3.",
    desc: "P2 ser sin ID er ikke i listen, legger til.",
    detail: "Sender videre til P3 (initiator).",
  },
  {
    title: "P3 mottar listen tilbake: [3, 4, 1, 2]",
    desc: "P3 ser sin egen ID (3) er i listen — listen har gått rundt!",
    detail: "P3 finner høyeste ID i listen: max(3, 4, 1, 2) = 4. P4 er den nye koordinatoren!",
  },
  {
    title: "P3 sender COORDINATOR(4) rundt ringen",
    desc: "P3 sender en COORDINATOR-melding med ID 4 rundt ringen.",
    detail: "Alle prosesser mottar COORDINATOR(4) og oppdaterer sin koordinator til P4.",
  },
];

export default function DS5_4Page() {
  const [activeAlgo, setActiveAlgo] = useState<ElectionAlgo>("bully");
  const [bullyStep, setBullyStep] = useState(0);
  const [ringStep, setRingStep] = useState(0);

  const currentBully = bullySteps[bullyStep];
  const currentRing = ringSteps[ringStep];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-5/teori" className="hover:text-[var(--accent)]">
          ← Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">5.4 Ledervalg</span>
      </div>

      <h1 className="text-2xl font-bold">5.4 Ledervalg (Election Algorithms)</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Når koordinatoren krasjer, må prosessene bli enige om hvem som tar over.
        Bully-algoritmen og ring-algoritmen er de to klassiske tilnærmingene.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips</p>
        <p className="text-amber-900 dark:text-amber-200">
          Ledervalg er pensum og kan komme i oppgave 7 eller 9. Du bør kjenne begge algoritmene,
          meldingstypene, og spesielt den vanligste feilen: «Bully sender ELECTION til ALLE» — nei,
          kun til prosesser med <strong>høyere ID</strong>.
        </p>
      </div>

      {/* ===== 1. HVORFOR TRENGER VI LEDERVALG? ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Hvorfor trenger vi ledervalg?
        </h2>
        <p className="text-sm leading-relaxed">
          Mange algoritmer i DS krever en <strong>koordinator</strong> — en prosess som tar
          spesielle avgjørelser på vegne av gruppen (f.eks. mutex-koordinator, konsensus-leder,
          database-primær). Koordinatoren er i teorien alltid prosessen med høyest identifikator (ID).
        </p>
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm space-y-2">
          <p className="font-semibold text-blue-700 dark:text-blue-300">Forutsetning for ledervalg:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Alle prosesser har <strong>unike identifikatorer</strong> (ID-er).</li>
            <li>Prosessene vet ikke nødvendigvis hvem som er koordinator etter en krasj.</li>
            <li>Mål: alle gjenlevende prosesser skal bli <strong>enige</strong> om ny leder.</li>
            <li>Lederen er alltid prosessen med <strong>høyest ID</strong> blant de aktive.</li>
          </ul>
        </div>
      </section>

      {/* ===== 2. VELG ALGORITME ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Ledervalg-algoritmer
        </h2>

        <div className="flex gap-2">
          {(["bully", "ring"] as ElectionAlgo[]).map(algo => (
            <button
              key={algo}
              onClick={() => setActiveAlgo(algo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeAlgo === algo
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {algo === "bully" ? "Bully-algoritmen" : "Ring-algoritmen"}
            </button>
          ))}
        </div>

        {/* BULLY */}
        {activeAlgo === "bully" && (
          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Bully-algoritmen
              </h3>
              <p className="text-sm">
                Kalles «bully» fordi høyere prosesser «mopper» (bully) lavere prosesser ut av
                konkurransen. Prosessen med høyest ID vinner alltid — den er den sterkeste.
              </p>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
                <p className="font-bold text-blue-700 dark:text-blue-300">
                  Tre meldingstyper:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    ["ELECTION", "Sendes til prosesser med HØYERE ID for å starte valg", "#3b82f6"],
                    ["OK", "Svar fra høyere prosess: «Jeg tar over, stopp din election»", "#16a34a"],
                    ["COORDINATOR", "Kunngjøring til ALLE prosesser: «Jeg er den nye koordinatoren»", "#7c3aed"],
                  ].map(([type, desc, color]) => (
                    <div key={String(type)} className="rounded-lg border p-3" style={{ borderColor: String(color) }}>
                      <p className="font-bold font-mono text-xs mb-1" style={{ color: String(color) }}>
                        {type}
                      </p>
                      <p className="text-xs text-[var(--muted)]">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Algoritme-pseudokode */}
              <div className="rounded-lg bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] p-4 font-mono text-xs space-y-1">
                <p className="text-[var(--muted)] not-italic font-sans text-xs mb-2">Pseudokode — Bully (prosess Pᵢ oppdager krasj):</p>
                <p>if (ingen høyere prosesser eksisterer) {"{"}</p>
                <p>  send COORDINATOR til alle; bli koordinator;</p>
                <p>{"}"} else {"{"}</p>
                <p>  send ELECTION til alle j der j {">"} i;</p>
                <p>  if (ingen OK mottatt innen timeout) {"{"}</p>
                <p>    send COORDINATOR til alle; bli koordinator;</p>
                <p>  {"}"}</p>
                <p>{"}"}</p>
                <p className="text-[var(--muted)] not-italic font-sans mt-2">Når Pᵢ mottar ELECTION fra Pⱼ (j {"<"} i):</p>
                <p>  send OK til j; start egen election (hvis ikke allerede);</p>
              </div>
            </div>

            {/* Interaktiv steg-for-steg */}
            <div className="rounded-xl border border-blue-300 dark:border-blue-700 bg-[var(--card)] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">
                  Steg {bullyStep + 1}/{bullySteps.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBullyStep(Math.max(0, bullyStep - 1))}
                    disabled={bullyStep === 0}
                    className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400"
                  >
                    ← Forrige
                  </button>
                  <button
                    onClick={() => setBullyStep(Math.min(bullySteps.length - 1, bullyStep + 1))}
                    disabled={bullyStep === bullySteps.length - 1}
                    className="px-3 py-1.5 rounded text-xs bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
                  >
                    Neste →
                  </button>
                  <button
                    onClick={() => setBullyStep(0)}
                    className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Prosess-diagram */}
              <div className="overflow-x-auto">
                <svg viewBox="0 0 560 120" className="w-full max-w-xl mx-auto">
                  <defs>
                    <marker id="bully-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
                    </marker>
                  </defs>
                  {[1,2,3,4,5].map((pid, i) => {
                    const x = 40 + i * 100;
                    const y = 40;
                    const isCrashed = currentBully.crashed.includes(pid);
                    const isCoord = currentBully.coordinator === pid;
                    const isActive = currentBully.active.includes(pid) && !isCrashed;

                    return (
                      <g key={pid}>
                        <circle
                          cx={x}
                          cy={y}
                          r="28"
                          fill={isCrashed ? "#fca5a5" : isCoord ? "#86efac" : "#bfdbfe"}
                          stroke={isCrashed ? "#dc2626" : isCoord ? "#16a34a" : "#3b82f6"}
                          strokeWidth={isCoord ? 3 : 2}
                          opacity={isCrashed ? 0.5 : 1}
                        />
                        <text x={x} y={y + 4} textAnchor="middle" fill={isCrashed ? "#991b1b" : "#1e40af"} fontSize="13" fontWeight="bold">
                          P{pid}
                        </text>
                        {isCrashed && (
                          <>
                            <line x1={x - 15} y1={y - 15} x2={x + 15} y2={y + 15} stroke="#dc2626" strokeWidth="2.5"/>
                            <line x1={x + 15} y1={y - 15} x2={x - 15} y2={y + 15} stroke="#dc2626" strokeWidth="2.5"/>
                          </>
                        )}
                        {isCoord && (
                          <text x={x} y={y + 58} textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="bold">
                            KOORDINATOR
                          </text>
                        )}
                        <text x={x} y={y + 70} textAnchor="middle" fill="#6b7280" fontSize="9">
                          {isCrashed ? "KRASJET" : isActive ? "aktiv" : ""}
                        </text>
                      </g>
                    );
                  })}

                  {/* ELECTION-piler (steg 2-3) */}
                  {bullyStep === 2 && (
                    <line x1="280" y1="40" x2="378" y2="40" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#bully-arrow)"/>
                  )}
                  {bullyStep === 2 && (
                    <text x="330" y="30" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">ELECTION</text>
                  )}

                  {/* OK-pil (steg 3) */}
                  {bullyStep === 3 && (
                    <>
                      <line x1="378" y1="44" x2="282" y2="44" stroke="#16a34a" strokeWidth="2" markerEnd="url(#bully-arrow)"/>
                      <text x="330" y="58" textAnchor="middle" fill="#16a34a" fontSize="9" fontWeight="bold">OK</text>
                    </>
                  )}

                  {/* COORDINATOR-pil (steg 4) */}
                  {bullyStep >= 4 && !currentBully.crashed.includes(5) === false && (
                    <text x="280" y="100" textAnchor="middle" fill="#7c3aed" fontSize="9" fontWeight="bold">
                      {bullyStep === 4 ? "P4 sender COORDINATOR til alle →" : ""}
                    </text>
                  )}
                </svg>
              </div>

              {/* Forklaring */}
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 space-y-2">
                <p className="font-bold text-blue-700 dark:text-blue-300">
                  {currentBully.title}
                </p>
                <p className="text-sm">{currentBully.desc}</p>
                <p className="text-sm text-[var(--muted)]">{currentBully.detail}</p>
              </div>
            </div>

            {/* Egenskaper */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
                <h4 className="font-bold text-blue-600 dark:text-blue-400">Egenskaper</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Prosessen med høyest ID vinner alltid</li>
                  <li>Maks <strong>O(N²)</strong> meldinger i verste fall</li>
                  <li>Rask konvergering (høy prosess avslutter raskt)</li>
                  <li>Virker når krasjet prosess gjenoppstår (starter ny election)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
                <h4 className="font-bold text-red-700 dark:text-red-400">Vanlig feil</h4>
                <p className="text-red-800 dark:text-red-300">
                  «Bully sender ELECTION til alle prosesser» — <strong>FEIL</strong>!
                  <br/>
                  Riktig: ELECTION sendes kun til prosesser med <strong>høyere ID</strong> enn seg selv.
                  <br/>
                  COORDINATOR sendes til alle gjenlevende prosesser.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RING */}
        {activeAlgo === "ring" && (
          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Ring-algoritmen
              </h3>
              <p className="text-sm">
                Prosessene er logisk organisert i en ring. En melding sendes rundt ringen
                med en voksende liste av IDer. Når initiator mottar sin melding tilbake,
                er den høyeste IDen i listen den nye koordinatoren.
              </p>

              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
                <p className="font-bold text-blue-700 dark:text-blue-300">To meldingstyper:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-blue-400 p-3">
                    <p className="font-bold font-mono text-xs text-blue-600 dark:text-blue-400 mb-1">ELECTION([id₁, id₂, ...])</p>
                    <p className="text-xs text-[var(--muted)]">
                      Melding som sendes rundt ringen med en liste av prosess-IDer som har deltatt.
                      Hver prosess legger til sin ID og videresender.
                    </p>
                  </div>
                  <div className="rounded-lg border border-purple-400 p-3">
                    <p className="font-bold font-mono text-xs text-purple-600 dark:text-purple-400 mb-1">COORDINATOR(id)</p>
                    <p className="text-xs text-[var(--muted)]">
                      Sendes rundt ringen etter at leder er valgt.
                      Inneholder IDen til den nye koordinatoren.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ring SVG */}
              <div className="overflow-x-auto">
                <svg viewBox="0 0 300 240" className="w-full max-w-xs mx-auto">
                  <defs>
                    <marker id="ring-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
                    </marker>
                  </defs>
                  {/* Ring */}
                  <circle cx="150" cy="120" r="80" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="5"/>
                  {/* Ring-pil */}
                  <path d="M 150 40 A 80 80 0 0 1 220 175" fill="none" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#ring-arrow)"/>
                  <text x="195" y="100" fontSize="10" fill="#3b82f6">ring-retning</text>

                  {/* Prosesser (P1=top, P2=right, P3=bottom-right, P4=bottom-left, P5=left) */}
                  {[
                    [1, 150, 40,   false],
                    [2, 230, 120,  false],
                    [3, 200, 195,  false],
                    [4, 100, 195,  false],
                    [5, 70,  120,  true],   // krasjet
                  ].map(([pid, x, y, crashed]) => (
                    <g key={String(pid)}>
                      <circle cx={Number(x)} cy={Number(y)} r="22"
                        fill={crashed ? "#fca5a5" : "#dbeafe"}
                        stroke={crashed ? "#dc2626" : "#3b82f6"}
                        strokeWidth="2"
                        opacity={crashed ? 0.6 : 1}
                      />
                      <text x={Number(x)} y={Number(y)+4} textAnchor="middle"
                        fill={crashed ? "#991b1b" : "#1e40af"} fontSize="12" fontWeight="bold">
                        P{pid}
                      </text>
                      {crashed && (
                        <>
                          <line x1={Number(x)-12} y1={Number(y)-12} x2={Number(x)+12} y2={Number(y)+12} stroke="#dc2626" strokeWidth="2"/>
                          <line x1={Number(x)+12} y1={Number(y)-12} x2={Number(x)-12} y2={Number(y)+12} stroke="#dc2626" strokeWidth="2"/>
                        </>
                      )}
                    </g>
                  ))}

                  {/* Legende */}
                  <circle cx="20" cy="220" r="6" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5"/>
                  <text x="30" y="224" fontSize="9" fill="#6b7280">krasjet</text>
                  <circle cx="90" cy="220" r="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                  <text x="100" y="224" fontSize="9" fill="#6b7280">aktiv</text>
                </svg>
              </div>
            </div>

            {/* Interaktiv steg-for-steg */}
            <div className="rounded-xl border border-blue-300 dark:border-blue-700 bg-[var(--card)] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">
                  Steg {ringStep + 1}/{ringSteps.length}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRingStep(Math.max(0, ringStep - 1))}
                    disabled={ringStep === 0}
                    className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400"
                  >
                    ← Forrige
                  </button>
                  <button
                    onClick={() => setRingStep(Math.min(ringSteps.length - 1, ringStep + 1))}
                    disabled={ringStep === ringSteps.length - 1}
                    className="px-3 py-1.5 rounded text-xs bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
                  >
                    Neste →
                  </button>
                  <button
                    onClick={() => setRingStep(0)}
                    className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Meldingsliste som vokser */}
              {ringStep >= 1 && (
                <div className="rounded-lg bg-slate-50 dark:bg-slate-900 border border-[var(--card-border)] p-3 font-mono text-sm">
                  <span className="text-[var(--muted)] not-italic font-sans text-xs mr-2">
                    ELECTION-liste:
                  </span>
                  {ringStep === 1 && <span className="text-blue-600">[3]</span>}
                  {ringStep === 2 && <span className="text-blue-600">[3, 4]</span>}
                  {ringStep === 3 && <span className="text-blue-600">[3, 4, 1]</span>}
                  {ringStep === 4 && <span className="text-blue-600">[3, 4, 1, 2]</span>}
                  {ringStep >= 5 && (
                    <span>
                      <span className="text-blue-600">[3, 4, 1, 2]</span>
                      {ringStep >= 6 && (
                        <span className="ml-3 text-purple-600">→ COORDINATOR(4)</span>
                      )}
                    </span>
                  )}
                </div>
              )}

              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 space-y-2">
                <p className="font-bold text-blue-700 dark:text-blue-300">
                  {currentRing.title}
                </p>
                <p className="text-sm">{currentRing.desc}</p>
                <p className="text-sm text-[var(--muted)]">{currentRing.detail}</p>
              </div>
            </div>

            {/* Egenskaper */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
                <h4 className="font-bold text-blue-600 dark:text-blue-400">Egenskaper</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Enkelt og forutsigbart</li>
                  <li><strong>O(N)</strong> meldinger for å sende rundt ringen</li>
                  <li>Tåler krasj av prosesser (hopper over dem)</li>
                  <li>Ingen risiko for at feil prosess vinner</li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 p-4 space-y-2">
                <h4 className="font-bold text-amber-700 dark:text-amber-400">Begrensninger</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Trenger at prosessene kjenner sine naboer i ringen</li>
                  <li>Mange krasjer = mange ELECTION-meldinger sirkulerer</li>
                  <li>Langsomt hvis ringen er stor</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== 3. SAMMENLIGNING ===== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Sammenligning: Bully vs Ring
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30">
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Egenskap</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Bully-algoritmen</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Ring-algoritmen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {[
                ["Meldingstyper", "ELECTION, OK, COORDINATOR", "ELECTION([liste]), COORDINATOR(id)"],
                ["Meldingskompleksitet", "O(N²) i verste fall", "O(N) — én runde i ringen"],
                ["Hvem mottar ELECTION", "Kun prosesser med HØYERE ID", "Neste prosess i ringen"],
                ["Hvem mottar COORDINATOR", "Alle gjenlevende prosesser", "Alle via ring-sirkulasjon"],
                ["Topologi", "Full nettverkstilgang", "Logisk ring (naboer)"],
                ["Vinner", "Prosessen med høyest ID", "max(ID i listen)"],
                ["Ved krasj av initiator", "Ny election fra neste høye", "Melding når frem via alternative"],
              ].map(([egenskap, bully, ring]) => (
                <tr key={String(egenskap)} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10">
                  <td className="px-4 py-2 font-medium">{egenskap}</td>
                  <td className="px-4 py-2">{bully}</td>
                  <td className="px-4 py-2">{ring}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== 4. HVA DU MÅ KUNNE ===== */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">
          Hva du MÅ kunne til eksamen
        </h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Hvorfor vi trenger ledervalg (koordinator krasjer, prosessene må bli enige)</li>
          <li>Bully: tre meldingstyper (ELECTION, OK, COORDINATOR) og flyten</li>
          <li>Bully: ELECTION sendes kun til høyere ID — ikke til alle!</li>
          <li>Ring: ELECTION-liste som vokser rundt ringen, max(liste) er vinner</li>
          <li>Ring: to meldingstyper (ELECTION([...]), COORDINATOR(id))</li>
          <li>Sammenligne bully og ring mht. meldingskompleksitet og topologi</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>
            <strong>Feil:</strong> «Bully sender ELECTION til alle» — NEI! Kun til prosesser med
            høyere ID. COORDINATOR sendes til alle.
          </li>
          <li>
            <strong>Feil:</strong> «Ring-algoritmen krever at alle prosesser er aktive» — NEI.
            Krasjet prosess hoppes over ved å gå videre til neste nabo.
          </li>
          <li>
            <strong>Feil:</strong> Tro at ring-algoritmen er raskere enn bully generelt —
            det avhenger av nettverkstopologi og antall krasj.
          </li>
          <li>
            <strong>Feil:</strong> Glemme at når en krasjet prosess gjenoppstår i Bully,
            starter den en ny election og vinner hvis den har høyest ID.
          </li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-5/teori/5-3" className="hover:text-[var(--accent)] text-sm">
          ← 5.3 Gjensidig utelukkelse
        </Link>
        <div />
      </div>
    </div>
  );
}
