"use client";

import { useState } from "react";
import Link from "next/link";

// 2PC steg-for-steg med 3 deltakere
const TWO_PC_STEPS = [
  {
    phase: "Initialtilstand",
    phaseNum: 0,
    desc: "En distribuert transaksjon involverer koordinatoren (K) og tre deltakere (D1, D2, D3). Alle er i INIT-tilstand. Transaksjonen er i gang lokalt hos alle.",
    coordinator: "INIT",
    participants: ["INIT", "INIT", "INIT"],
    msgs: [],
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
  },
  {
    phase: "Fase 1 — K sender VOTE-REQUEST",
    phaseNum: 1,
    desc: "Koordinatoren sender VOTE-REQUEST til alle deltakere og går til WAIT-tilstand. Spør: «Kan dere committe?»",
    coordinator: "WAIT",
    participants: ["INIT", "INIT", "INIT"],
    msgs: ["K → D1: VOTE-REQUEST", "K → D2: VOTE-REQUEST", "K → D3: VOTE-REQUEST"],
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    phase: "Fase 1 — Deltakere svarer",
    phaseNum: 1,
    desc: "Hver deltaker sjekker om den kan committe lokalt. D1 og D2 svarer VOTE-COMMIT. D3 svarer også VOTE-COMMIT. Alle går til READY-tilstand.",
    coordinator: "WAIT",
    participants: ["READY", "READY", "READY"],
    msgs: ["D1 → K: VOTE-COMMIT", "D2 → K: VOTE-COMMIT", "D3 → K: VOTE-COMMIT"],
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    phase: "Fase 2 — K sender GLOBAL-COMMIT",
    phaseNum: 2,
    desc: "Koordinatoren har mottatt VOTE-COMMIT fra alle. Beslutning: COMMIT. Sender GLOBAL-COMMIT til alle deltakere og går til COMMIT-tilstand.",
    coordinator: "COMMIT",
    participants: ["READY", "READY", "READY"],
    msgs: ["K → D1: GLOBAL-COMMIT", "K → D2: GLOBAL-COMMIT", "K → D3: GLOBAL-COMMIT"],
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    phase: "Fase 2 — Deltakere committer + ACK",
    phaseNum: 2,
    desc: "Alle deltakere mottar GLOBAL-COMMIT, committer lokalt og sender ACK til koordinatoren. Transaksjonen er ferdig!",
    coordinator: "COMMIT",
    participants: ["COMMIT", "COMMIT", "COMMIT"],
    msgs: ["D1 → K: ACK", "D2 → K: ACK", "D3 → K: ACK"],
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
];

const ABORT_STEPS = [
  {
    phase: "Fase 1 — En deltaker stemmer ABORT",
    desc: "D2 kan ikke committe (f.eks. lokal constraint-feil) og sender VOTE-ABORT til koordinatoren.",
    coordinator: "WAIT",
    participants: ["READY", "ABORT", "READY"],
    msgs: ["D1 → K: VOTE-COMMIT", "D2 → K: VOTE-ABORT", "D3 → K: VOTE-COMMIT"],
  },
  {
    phase: "Fase 2 — K sender GLOBAL-ABORT",
    desc: "Koordinatoren mottar minst ett VOTE-ABORT → transaksjonen må avbrytes. Sender GLOBAL-ABORT til alle.",
    coordinator: "ABORT",
    participants: ["READY", "ABORT", "READY"],
    msgs: ["K → D1: GLOBAL-ABORT", "K → D2: GLOBAL-ABORT", "K → D3: GLOBAL-ABORT"],
  },
  {
    phase: "Alle rullerer tilbake",
    desc: "D1 og D3 mottar GLOBAL-ABORT og ruller tilbake lokalt. D2 har allerede abortert. Alle sender ACK.",
    coordinator: "ABORT",
    participants: ["ABORT", "ABORT", "ABORT"],
    msgs: ["D1 → K: ACK", "D2 → K: ACK", "D3 → K: ACK"],
  },
];

const STATE_COLORS: Record<string, string> = {
  INIT: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  WAIT: "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200",
  READY: "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200",
  COMMIT: "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200",
  ABORT: "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200",
  PRECOMMIT: "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200",
};

const BLOCKING_STATES = [
  { state: "Q = COMMIT", action: "P gjør overgang til COMMIT", safe: true },
  { state: "Q = ABORT", action: "P gjør overgang til ABORT", safe: true },
  { state: "Q = INIT", action: "P gjør overgang til ABORT (trygt — koordinator krasjet under multicast)", safe: true },
  { state: "Q = READY", action: "P kan ikke bestemme — kontakt annen deltaker", safe: false },
];

export default function DS8_5Page() {
  const [twopcStep, setTwopcStep] = useState(0);
  const [abortStep, setAbortStep] = useState(0);
  const [showAbort, setShowAbort] = useState(false);
  const [showBlocking, setShowBlocking] = useState(false);
  const [threepcStep, setThreepcStep] = useState(0);

  const step = TWO_PC_STEPS[twopcStep];

  const THREE_PC_STEPS = [
    {
      phase: "Fase 1 — Voting (samme som 2PC)",
      desc: "K sender VOTE-REQUEST. Deltakere svarer VOTE-COMMIT eller VOTE-ABORT. Identisk med 2PC fase 1.",
      coordinator: "WAIT",
      participants: ["READY", "READY", "READY"],
      msgs: ["K → alle: VOTE-REQUEST", "Alle → K: VOTE-COMMIT"],
      highlight: false,
    },
    {
      phase: "Fase 2 — PREPARE-COMMIT (NY!)",
      desc: "3PC legger til en ekstra fase: K sender PREPARE-COMMIT til alle. Deltakerne går til PRECOMMIT-tilstand. Dette er det avgjørende steget som gjør protokollen non-blocking.",
      coordinator: "PRECOMMIT",
      participants: ["PRECOMMIT", "PRECOMMIT", "PRECOMMIT"],
      msgs: ["K → alle: PREPARE-COMMIT", "Alle → K: READY-COMMIT (ACK)"],
      highlight: true,
    },
    {
      phase: "Fase 3 — GLOBAL-COMMIT",
      desc: "K sender GLOBAL-COMMIT. Alle committer. Nøkkelforskjell: siden deltakere er i PRECOMMIT, vet de at alle andre har stemt commit — de kan avgjøre selv hvis K krasjer.",
      coordinator: "COMMIT",
      participants: ["COMMIT", "COMMIT", "COMMIT"],
      msgs: ["K → alle: GLOBAL-COMMIT", "Alle → K: ACK"],
      highlight: false,
    },
  ];

  const threeStep = THREE_PC_STEPS[threepcStep];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-8/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">8.5 Distribuert commit</span>
      </div>

      <h1 className="text-2xl font-bold">8.5 Distribuert commit</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Distribuert commit løser problemet med atomisk gjennomføring av transaksjoner som spenner over flere maskiner: enten committer alle, eller ingen gjør det. To protokoller: 2PC og 3PC.
      </p>

      {/* Eksamensvarsel */}
      <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-4">
        <p className="font-semibold text-red-700 dark:text-red-300 mb-1">Eksamens-kritisk — Distribuert commit</p>
        <p className="text-sm text-red-700 dark:text-red-300">
          Oppgave 7 og oppgave 9 spør om 2PC og 3PC på ALLE eksamener. Lær protokoll-stegene, blokkering-problemet, og hva 3PC gjør annerledes.
        </p>
      </div>

      {/* Problemet */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Problemet: atomisk commit</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            En distribuert transaksjon berører data på flere maskiner. For eksempel: bankoverføring fra konto A (maskin 1) til konto B (maskin 2). Enten skal <em>begge</em> operasjonene utføres, eller <em>ingen</em>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
              <p className="font-semibold text-red-700 dark:text-red-400 mb-1">One-phase commit — problem</p>
              <p className="text-[var(--muted)]">Koordinatoren forteller alle: «commit!». Men hva hvis én deltaker ikke kan committe lokalt? Koordinatoren vet det ikke.</p>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Two-phase commit (2PC)</p>
              <p className="text-[var(--muted)]">Fase 1: samle stemmer. Fase 2: ta global beslutning. Løser problemet — men blokkerer hvis koordinator krasjer.</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Three-phase commit (3PC)</p>
              <p className="text-[var(--muted)]">Legger til PREPARE-COMMIT-fase. Non-blocking: deltakere kan bestemme selv ved timeout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2PC interaktiv */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Two-Phase Commit (2PC) — steg for steg</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mb-4">
          {/* SVG sekvensdiagram */}
          <div className={`rounded-xl ${step.bgColor} border border-[var(--card-border)] p-4 mb-4`}>
            <svg viewBox="0 0 500 130" className="w-full max-w-2xl mx-auto">
              {/* Kolonner */}
              {["K", "D1", "D2", "D3"].map((label, i) => {
                const x = 60 + i * 115;
                return (
                  <g key={i}>
                    <text x={x} y="18" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">{label}</text>
                    <line x1={x} y1="22" x2={x} y2="120" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
                  </g>
                );
              })}
              {/* Tilstandsbokser */}
              {[step.coordinator, ...step.participants].map((state, i) => {
                const x = 60 + i * 115;
                const colors = {
                  INIT: "#6B7280", WAIT: "#3B82F6", READY: "#EAB308",
                  COMMIT: "#10B981", ABORT: "#EF4444", PRECOMMIT: "#A855F7",
                };
                const c = colors[state as keyof typeof colors] || "#6B7280";
                return (
                  <g key={i}>
                    <rect x={x - 28} y="90" width="56" height="18" rx="4" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="1.2"/>
                    <text x={x} y="102" textAnchor="middle" fontSize="9" fill={c} fontWeight="bold">{state}</text>
                  </g>
                );
              })}
              {/* Meldingspiler */}
              {step.msgs.map((msg, i) => {
                const parts = msg.split(" → ");
                if (parts.length !== 2) return null;
                const [from, rest] = parts;
                const [to, label] = rest.split(": ");
                const actors = { K: 0, D1: 1, D2: 2, D3: 3 };
                const fx = 60 + (actors[from as keyof typeof actors] || 0) * 115;
                const tx = 60 + (actors[to as keyof typeof actors] || 0) * 115;
                const y = 40 + i * 16;
                const isCommit = label?.includes("COMMIT");
                const isAbort = label?.includes("ABORT");
                const color = isCommit ? "#10B981" : isAbort ? "#EF4444" : "#6B7280";
                return (
                  <g key={i}>
                    <line x1={fx} y1={y} x2={tx} y2={y} stroke={color} strokeWidth="1.2" markerEnd={`url(#arr-${i})`}/>
                    <text x={(fx + tx) / 2} y={y - 3} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{label}</text>
                    <defs>
                      <marker id={`arr-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6 Z" fill={color}/>
                      </marker>
                    </defs>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Steg-kontroller */}
          <div className="flex gap-2 flex-wrap mb-3">
            {TWO_PC_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setTwopcStep(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  twopcStep === i
                    ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                    : "bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                {i + 1}. {s.phase.split(" — ")[0]}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-[var(--background)] border border-[var(--card-border)] p-4 mb-3">
            <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">{step.phase}</p>
            <p className="text-sm text-[var(--muted)]">{step.desc}</p>
            {step.msgs.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {step.msgs.map((m, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono">{m}</span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setTwopcStep(Math.max(0, twopcStep - 1))} disabled={twopcStep === 0} className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40">← Forrige</button>
            <span className="text-xs text-[var(--muted)] self-center">Steg {twopcStep + 1} av {TWO_PC_STEPS.length}</span>
            <button onClick={() => setTwopcStep(Math.min(TWO_PC_STEPS.length - 1, twopcStep + 1))} disabled={twopcStep === TWO_PC_STEPS.length - 1} className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40">Neste →</button>
          </div>
        </div>

        {/* Abort-scenario */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Abort-scenario: hva skjer hvis én stemmer ABORT?</h3>
            <button onClick={() => setShowAbort(!showAbort)} className="text-sm text-blue-600 dark:text-blue-400 underline">
              {showAbort ? "Skjul" : "Vis"} abort-eksempel
            </button>
          </div>
          {showAbort && (
            <div>
              <div className="flex gap-2 flex-wrap mb-3">
                {ABORT_STEPS.map((s, i) => (
                  <button key={i} onClick={() => setAbortStep(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${abortStep === i ? "bg-red-600 text-white border-red-600" : "bg-[var(--card)] border-[var(--card-border)] hover:border-red-400"}`}>
                    {i + 1}. {s.phase}
                  </button>
                ))}
              </div>
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                <p className="font-semibold text-red-700 dark:text-red-400 mb-1">{ABORT_STEPS[abortStep].phase}</p>
                <p className="text-sm text-[var(--muted)] mb-2">{ABORT_STEPS[abortStep].desc}</p>
                <div className="flex flex-wrap gap-1">
                  {ABORT_STEPS[abortStep].msgs.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-xs bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-mono">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blokkering-problemet */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Blokkering-problemet i 2PC</h2>
        <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-5 mb-4">
          <p className="font-semibold text-red-700 dark:text-red-300 mb-2">2PC er en blokkerende protokoll</p>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            Hva skjer hvis koordinatoren krasjer mens deltakerne er i READY-tilstand (etter å ha sendt VOTE-COMMIT)?
          </p>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            Deltakerne har lovet å committe, men vet ikke om koordinatoren sendte GLOBAL-COMMIT eller GLOBAL-ABORT. De kan ikke bestemme selv — de må vente på at koordinatoren kommer tilbake.
          </p>
          <div className="rounded-lg bg-white dark:bg-gray-800 p-3 text-sm">
            <p className="font-medium mb-2">Deltaker P er i READY og kontakter annen deltaker Q:</p>
            <div className="grid grid-cols-2 gap-2">
              {BLOCKING_STATES.map((b) => (
                <div key={b.state} className={`rounded p-2 border ${b.safe ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20" : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"}`}>
                  <p className="font-mono text-xs font-semibold mb-1">{b.state}</p>
                  <p className="text-xs text-[var(--muted)]">{b.action}</p>
                  <span className={`text-xs font-medium ${b.safe ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{b.safe ? "✓ Trygt" : "✗ Blokker og vent"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <button onClick={() => setShowBlocking(!showBlocking)} className="flex justify-between w-full text-left">
            <span className="font-semibold">Løsninger på blokkering</span>
            <span className="text-blue-600 dark:text-blue-400 text-sm underline">{showBlocking ? "Skjul" : "Vis"}</span>
          </button>
          {showBlocking && (
            <div className="mt-3 text-sm text-[var(--muted)] space-y-2">
              <p><strong>1. Timeout + kontakt andre deltakere:</strong> P venter en stund, kontakter alle Q for å finne ut hva de vet. Virker bare hvis noen Q har nådd en endelig tilstand (COMMIT eller ABORT).</p>
              <p><strong>2. Multicast av beslutning:</strong> Hver deltaker som mottar en global beslutning, multicast-er den videre. Andre kan da lese den fra en overlevende deltaker.</p>
              <p><strong>3. Three-phase commit (3PC):</strong> Legge til en ekstra fase som gjør at deltakerne alltid kan avgjøre. Se neste seksjon.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3PC */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Three-Phase Commit (3PC)</h2>
        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
          <p className="text-sm text-[var(--muted)]">
            3PC løser blokkering-problemet ved å legge til en mellomfase: <strong>PREPARE-COMMIT</strong> (eller PRECOMMIT). Det viktige: ingen tilstand eksisterer der det er mulig å gå direkte fra en «ikke-commit» tilstand til en COMMIT-tilstand — og ingen tilstand der man venter på en endelig beslutning og kan gå til COMMIT.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 mb-4">
          {/* Steg-kontroller for 3PC */}
          <div className="flex gap-2 flex-wrap mb-4">
            {THREE_PC_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setThreepcStep(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  threepcStep === i
                    ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600"
                    : "bg-[var(--card)] border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                {i + 1}. {i === 1 ? "PREPARE-COMMIT ⭐" : s.phase.split(" — ")[0]}
              </button>
            ))}
          </div>

          {/* 3PC Sekvensdiagram */}
          <div className={`rounded-xl border border-[var(--card-border)] p-4 mb-3 ${threeStep.highlight ? "bg-purple-50 dark:bg-purple-900/20" : "bg-[var(--background)]"}`}>
            <svg viewBox="0 0 500 110" className="w-full max-w-2xl mx-auto">
              {["K", "D1", "D2", "D3"].map((label, i) => {
                const x = 60 + i * 115;
                return (
                  <g key={i}>
                    <text x={x} y="16" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">{label}</text>
                    <line x1={x} y1="20" x2={x} y2="100" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
                  </g>
                );
              })}
              {[threeStep.coordinator, ...threeStep.participants].map((state, i) => {
                const x = 60 + i * 115;
                const colors: Record<string, string> = { INIT: "#6B7280", WAIT: "#3B82F6", READY: "#EAB308", COMMIT: "#10B981", ABORT: "#EF4444", PRECOMMIT: "#A855F7" };
                const c = colors[state] || "#6B7280";
                return (
                  <g key={i}>
                    <rect x={x - 30} y="78" width="60" height="18" rx="4" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="1.5"/>
                    <text x={x} y="90" textAnchor="middle" fontSize="9" fill={c} fontWeight="bold">{state}</text>
                  </g>
                );
              })}
              {threeStep.msgs.map((msg, mi) => {
                const parts = msg.split(" → ");
                if (parts.length !== 2) return null;
                const [from, rest] = parts;
                const [to, label] = rest.split(": ");
                const actors: Record<string, number> = { K: 0, D1: 1, D2: 2, D3: 3, alle: -1 };
                if (to === "alle") {
                  return [1,2,3].map((ti) => {
                    const fx = 60;
                    const tx = 60 + ti * 115;
                    const y = 32 + mi * 18;
                    const color = label?.includes("PREPARE") ? "#A855F7" : label?.includes("COMMIT") ? "#10B981" : "#6B7280";
                    return (
                      <g key={`${mi}-${ti}`}>
                        <line x1={fx} y1={y} x2={tx} y2={y} stroke={color} strokeWidth="1.2"/>
                        {ti === 3 && <text x={(fx + tx) / 2} y={y - 3} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{label}</text>}
                      </g>
                    );
                  });
                }
                const fx = 60 + (actors[from] || 0) * 115;
                const tx = 60 + (actors[to] || 0) * 115;
                const y = 32 + mi * 18;
                const color = label?.includes("PREPARE") ? "#A855F7" : label?.includes("COMMIT") ? "#10B981" : "#6B7280";
                return (
                  <g key={mi}>
                    <line x1={fx} y1={y} x2={tx} y2={y} stroke={color} strokeWidth="1.2"/>
                    <text x={(fx + tx) / 2} y={y - 3} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{label}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="rounded-xl bg-[var(--background)] border border-[var(--card-border)] p-4 mb-3">
            <p className={`font-semibold mb-1 ${threeStep.highlight ? "text-purple-700 dark:text-purple-300" : "text-blue-700 dark:text-blue-300"}`}>{threeStep.phase}</p>
            <p className="text-sm text-[var(--muted)]">{threeStep.desc}</p>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setThreepcStep(Math.max(0, threepcStep - 1))} disabled={threepcStep === 0} className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40">← Forrige</button>
            <span className="text-xs text-[var(--muted)] self-center">Steg {threepcStep + 1} av {THREE_PC_STEPS.length}</span>
            <button onClick={() => setThreepcStep(Math.min(THREE_PC_STEPS.length - 1, threepcStep + 1))} disabled={threepcStep === THREE_PC_STEPS.length - 1} className="px-3 py-1.5 rounded-lg text-sm border border-[var(--card-border)] disabled:opacity-40">Neste →</button>
          </div>
        </div>

        {/* Hvorfor 3PC er non-blocking */}
        <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-5">
          <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Hvorfor er 3PC non-blocking?</p>
          <p className="text-sm text-[var(--muted)] mb-3">
            I 2PC: når en deltaker er i READY, vet den ikke om koordinatoren valgte COMMIT eller ABORT. Den MÅ vente.
          </p>
          <p className="text-sm text-[var(--muted)] mb-3">
            I 3PC: når en deltaker er i PRECOMMIT, vet den at <em>alle</em> andre deltakere også har fått PREPARE-COMMIT (ellers hadde ikke koordinatoren sendt det). Derfor: ved timeout i PRECOMMIT-tilstand kan deltakeren trygt gå til COMMIT uten å vente.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-white dark:bg-gray-800 p-3 border border-purple-200 dark:border-purple-700">
              <p className="font-medium text-purple-700 dark:text-purple-300 mb-1">READY-tilstand (3PC)</p>
              <p className="text-[var(--muted)]">Koordinator kan ha krasjet. Hva gjør andre deltakere? Kontakt dem. Hvis alle er i READY → trygt å ABORT.</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-800 p-3 border border-purple-200 dark:border-purple-700">
              <p className="font-medium text-purple-700 dark:text-purple-300 mb-1">PRECOMMIT-tilstand (3PC)</p>
              <p className="text-[var(--muted)]">Alle stemte commit, alle fikk PREPARE-COMMIT. Trygt å COMMIT selv om koordinatoren krasjet!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2PC vs 3PC sammenligning */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">2PC vs 3PC — sammenligning</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 dark:bg-blue-900/30">
              <tr>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">Egenskap</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">2PC</th>
                <th className="p-3 text-left font-semibold text-blue-700 dark:text-blue-300">3PC</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Antall faser", "2 (voting + beslutning)", "3 (voting + prepare + beslutning)"],
                ["Blokkerende?", "Ja — ved koordinator-krasj i fase 2", "Nei — deltakere kan bestemme selv"],
                ["Antall meldinger", "4N (N deltakere)", "6N (mer overhead)"],
                ["Kompleksitet", "Middels", "Høy"],
                ["Praktisk bruk", "Vanligst i praksis (blokkering sjelden)", "Sjelden — overhead for høy"],
                ["Feiltoleranse", "Krever koordinator-recovery", "Tåler koordinator-krasj"],
                ["Tilstander (coordinator)", "INIT → WAIT → COMMIT/ABORT", "INIT → WAIT → PRECOMMIT → COMMIT/ABORT"],
                ["Tilstander (deltaker)", "INIT → READY → COMMIT/ABORT", "INIT → READY → PRECOMMIT → COMMIT/ABORT"],
              ].map(([prop, twopc, threepc], i) => (
                <tr key={prop} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--background)]"}>
                  <td className="p-3 font-medium">{prop}</td>
                  <td className="p-3 text-[var(--muted)]">{twopc}</td>
                  <td className="p-3 text-[var(--muted)]">{threepc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tilstandsdiagrammer */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Tilstandsmaskiner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 2PC koordinator */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-3">2PC Koordinator</p>
            <svg viewBox="0 0 200 180" className="w-full max-w-xs mx-auto">
              {[
                { label: "INIT", x: 100, y: 20, color: "#6B7280" },
                { label: "WAIT", x: 100, y: 80, color: "#3B82F6" },
                { label: "COMMIT", x: 50, y: 150, color: "#10B981" },
                { label: "ABORT", x: 155, y: 150, color: "#EF4444" },
              ].map((node) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r="22" fill={node.color} fillOpacity="0.2" stroke={node.color} strokeWidth="1.5"/>
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="9" fill={node.color} fontWeight="bold">{node.label}</text>
                </g>
              ))}
              <line x1="100" y1="42" x2="100" y2="58" stroke="#6B7280" strokeWidth="1.2" markerEnd="url(#a1)"/>
              <line x1="85" y1="100" x2="65" y2="128" stroke="#10B981" strokeWidth="1.2" markerEnd="url(#a2)"/>
              <line x1="115" y1="100" x2="140" y2="128" stroke="#EF4444" strokeWidth="1.2" markerEnd="url(#a3)"/>
              <text x="60" y="118" fontSize="7" fill="#10B981">alle VOTE-COMMIT</text>
              <text x="118" y="118" fontSize="7" fill="#EF4444">noen VOTE-ABORT</text>
              <defs>
                {["a1","a2","a3"].map(id => (
                  <marker key={id} id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#6B7280"/>
                  </marker>
                ))}
              </defs>
            </svg>
          </div>

          {/* 3PC koordinator */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-3">3PC Koordinator (+ PRECOMMIT)</p>
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
              {[
                { label: "INIT", x: 100, y: 20, color: "#6B7280" },
                { label: "WAIT", x: 100, y: 75, color: "#3B82F6" },
                { label: "PRECOMMIT", x: 100, y: 135, color: "#A855F7" },
                { label: "COMMIT", x: 55, y: 185, color: "#10B981" },
                { label: "ABORT", x: 155, y: 75, color: "#EF4444" },
              ].map((node) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r="22" fill={node.color} fillOpacity="0.2" stroke={node.color} strokeWidth="1.5"/>
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="8" fill={node.color} fontWeight="bold">{node.label}</text>
                </g>
              ))}
              <line x1="100" y1="42" x2="100" y2="53" stroke="#6B7280" strokeWidth="1.2"/>
              <line x1="100" y1="97" x2="100" y2="113" stroke="#A855F7" strokeWidth="1.2"/>
              <line x1="85" y1="155" x2="68" y2="163" stroke="#10B981" strokeWidth="1.2"/>
              <line x1="120" y1="80" x2="133" y2="78" stroke="#EF4444" strokeWidth="1.2"/>
              <text x="52" y="52" fontSize="7" fill="#6B7280">VOTE-REQUEST</text>
              <text x="105" y="110" fontSize="7" fill="#A855F7">alle COMMIT</text>
              <text x="108" y="76" fontSize="7" fill="#EF4444">noen ABORT</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Oppsummering */}
      <section className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne (til eksamen)</h3>
        <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
          <li>Distribuert commit = atomisk gjennomføring over flere maskiner</li>
          <li><strong>2PC fase 1:</strong> VOTE-REQUEST → VOTE-COMMIT/VOTE-ABORT</li>
          <li><strong>2PC fase 2:</strong> GLOBAL-COMMIT/GLOBAL-ABORT → ACK</li>
          <li>2PC blokkerer hvis koordinator krasjer i WAIT-tilstand</li>
          <li>Deltaker i READY kan ikke avgjøre uten koordinator</li>
          <li><strong>3PC legger til:</strong> PREPARE-COMMIT-fase (PRECOMMIT-tilstand)</li>
          <li>3PC er non-blocking: deltaker i PRECOMMIT kan committe autonomt</li>
          <li>3PC krever mer overhead (6N vs 4N meldinger) — sjelden brukt i praksis</li>
          <li>To betingelser for non-blocking: ingen direkte overgang ikke-commit → commit, og ingen tilstand der commit er mulig uten at en final beslutning er tatt</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-8/teori/8-4" className="hover:text-[var(--accent)] text-sm">← 8.4 Feilgjenoppretting</Link>
        <div />
      </div>
    </div>
  );
}
