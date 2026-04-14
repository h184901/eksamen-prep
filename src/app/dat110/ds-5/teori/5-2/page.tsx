"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

// --- Vektorklokke-kalkulator (eksamensstil: 4 prosesser) ---
// Eksempel fra eksamen jan-2024 og mai-2024 (4 prosesser, si/ri events)
// P1: s1  a  s2  b
// P2: c   d   e   f
// P3: r1  g  s3  r4
// P4: r2  h  r3  s4

type VCRow = { event: string; vc: [number, number, number, number]; note: string };

const EXAMPLE_STEPS: VCRow[] = [
  // P1 events (index 0)
  { event: "P1: s₁", vc: [1, 0, 0, 0], note: "Lokal hendelse → P1 øker sin egen teller: [0+1,0,0,0]" },
  { event: "P1: a",  vc: [2, 0, 0, 0], note: "Lokal hendelse → P1 øker: [1+1,0,0,0]" },
  { event: "P1: s₂", vc: [3, 0, 0, 0], note: "Send s₂ → P1 øker FØRST, sender vektor [3,0,0,0]" },
  { event: "P1: b",  vc: [4, 0, 0, 0], note: "Lokal hendelse → P1 øker: [3+1,0,0,0]" },
  // P2 events (index 1)
  { event: "P2: c",  vc: [0, 1, 0, 0], note: "Lokal hendelse → P2 øker sin egen teller: [0,0+1,0,0]" },
  { event: "P2: d",  vc: [0, 2, 0, 0], note: "Lokal hendelse → P2 øker: [0,1+1,0,0]" },
  { event: "P2: e",  vc: [0, 3, 0, 0], note: "Lokal hendelse → P2 øker: [0,2+1,0,0]" },
  { event: "P2: f",  vc: [0, 4, 0, 0], note: "Lokal hendelse → P2 øker: [0,3+1,0,0]" },
  // P3 events (index 2)
  { event: "P3: r₁", vc: [1, 0, 1, 0], note: "Mottak fra P1 (s₁ sendte [1,0,0,0]): max([0,0,0,0],[1,0,0,0])+P3++ = [1,0,0+1,0]" },
  { event: "P3: g",  vc: [1, 0, 2, 0], note: "Lokal hendelse → P3 øker: [1,0,1+1,0]" },
  { event: "P3: s₃", vc: [1, 0, 3, 0], note: "Send s₃ → P3 øker FØRST, sender vektor [1,0,3,0]" },
  { event: "P3: r₄", vc: [3, 0, 4, 4], note: "Mottak fra P4 (s₄ sendte [3,0,3,4]): max([1,0,3,0],[3,0,3,4])+P3++ = [3,0,3+1,4]" },
  // P4 events (index 3)
  { event: "P4: r₂", vc: [3, 0, 0, 1], note: "Mottak fra P1 (s₂ sendte [3,0,0,0]): max([0,0,0,0],[3,0,0,0])+P4++ = [3,0,0,0+1]" },
  { event: "P4: h",  vc: [3, 0, 0, 2], note: "Lokal hendelse → P4 øker: [3,0,0,1+1]" },
  { event: "P4: r₃", vc: [3, 0, 3, 3], note: "Mottak fra P3 (s₃ sendte [1,0,3,0]): max([3,0,0,2],[1,0,3,0])+P4++ = [3,0,3,2+1]" },
  { event: "P4: s₄", vc: [3, 0, 3, 4], note: "Send s₄ → P4 øker FØRST, sender vektor [3,0,3,4]" },
];

// Forenklet, mer oversiktlig steg-for-steg eksempel for læring
// 3 prosesser, 2022-stil oppgave
type SimpleStep = { proc: number; event: string; action: string; v: [number,number,number]; highlight: boolean };
const SIMPLE_STEPS: SimpleStep[] = [
  { proc: 0, event: "a", action: "Lokal hendelse på P1", v: [1,0,0], highlight: false },
  { proc: 0, event: "s₁ (send til P2)", action: "Send: P1 øker sin teller, sender [2,0,0]", v: [2,0,0], highlight: true },
  { proc: 1, event: "c", action: "Lokal hendelse på P2", v: [0,1,0], highlight: false },
  { proc: 1, event: "r₁ (mottak fra P1)", action: "Mottak [2,0,0]: max([0,1,0],[2,0,0])+1 på P2 → [2,2,0]", v: [2,2,0], highlight: true },
  { proc: 0, event: "b", action: "Lokal hendelse på P1", v: [3,0,0], highlight: false },
  { proc: 2, event: "e", action: "Lokal hendelse på P3", v: [0,0,1], highlight: false },
  { proc: 1, event: "s₂ (send til P3)", action: "Send: P2 øker, sender [2,3,0]", v: [2,3,0], highlight: true },
  { proc: 2, event: "r₂ (mottak fra P2)", action: "Mottak [2,3,0]: max([0,0,1],[2,3,0])+1 på P3 → [2,3,2]", v: [2,3,2], highlight: true },
  { proc: 2, event: "f", action: "Lokal hendelse på P3", v: [2,3,3], highlight: false },
];

export default function DS5_2Page() {
  const [vcStep, setVcStep] = useState(0);
  const [showLamportSolution, setShowLamportSolution] = useState(false);
  const [showExamSolution, setShowExamSolution] = useState(false);
  const [simpleStep, setSimpleStep] = useState(0);

  const currentSimple = SIMPLE_STEPS[simpleStep];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-5/teori" className="hover:text-[var(--accent)]">
          ← Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">5.2 Logiske klokker</span>
      </div>

      <h1 className="text-2xl font-bold">5.2 Logiske klokker</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Lamport-klokker og vektorklokker for å ordne hendelser i distribuerte systemer —
        uten en global klokke. Vektorklokker gir kausal ordning og er eksamensgaranti.
      </p>

      {/* EKSAMENSGARANTI-banner */}
      <div className="rounded-lg border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 px-4 py-3">
        <p className="font-bold text-red-700 dark:text-red-400 mb-1">
          EKSAMENSGARANTI — Oppgave 9 (10%)
        </p>
        <p className="text-sm text-red-800 dark:text-red-300">
          Vektorklokker er på eksamen <strong>hvert eneste år</strong> (jan-2024, mai-2024, mai-2023).
          Oppgaven er ALLTID: «Compute the vector clock values for all events at these four processes.»
          Du må beherske dette perfekt — det er rutinearbeid hvis du kan reglene.
        </p>
      </div>

      {/* ===== 1. PROBLEMET MED FYSISKE KLOKKER ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Hvorfor fysiske klokker ikke fungerer
        </h2>
        <p className="text-sm leading-relaxed">
          I et distribuert system kjører prosessene på ulike maskiner med ulike klokker.
          Problemet er todelt:
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-300">Clock drift</h3>
            <p>
              Fysiske klokker tikker ikke helt nøyaktig — de{" "}
              <em>drifter</em> fra hverandre. Selv om de synkroniseres (NTP),
              vil de etterhvert avvike med millisekunder til sekunder.
            </p>
          </div>
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-300">Ingen global klokke</h3>
            <p>
              Det finnes ingen global klokke alle prosesser kan lese atomisk.
              Nettverksforsinkelse gjør det umulig å si nøyaktig hva klokken
              er på en annen maskin akkurat nå.
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 text-sm">
          <p>
            <strong>Løsningen:</strong> Logiske klokker — tellere som øker ved hendelser og
            oppdateres ved kommunikasjon. De gir oss en <em>konsistent ordning</em> av hendelser
            uten å stole på fysisk tid.
          </p>
        </div>
      </section>

      {/* ===== 2. HAPPENS-BEFORE ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Happens-before-relasjonen (<InlineLatex latex="\rightarrow" />)
        </h2>
        <p className="text-sm leading-relaxed">
          Lamport definerte en partiellordering av hendelser kalt{" "}
          <strong>happens-before</strong>{" "}
          (<InlineLatex latex="a \rightarrow b" />: «a skjedde kausal forut for b»).
        </p>

        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-3 text-sm">
          <p className="font-semibold text-blue-700 dark:text-blue-300">
            De tre reglene for happens-before:
          </p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Samme prosess:</strong> Hvis a og b er hendelser i samme prosess, og a
              skjer før b, så <InlineLatex latex="a \rightarrow b" />.
            </li>
            <li>
              <strong>Send/mottak:</strong> Hvis a er sending av melding m, og b er mottaket av
              samme m, så <InlineLatex latex="a \rightarrow b" />.
            </li>
            <li>
              <strong>Transitivitet:</strong> Hvis{" "}
              <InlineLatex latex="a \rightarrow b" /> og <InlineLatex latex="b \rightarrow c" />
              , så <InlineLatex latex="a \rightarrow c" />.
            </li>
          </ol>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 text-sm">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">
            Samtidige hendelser (concurrent)
          </p>
          <p>
            Hvis verken <InlineLatex latex="a \rightarrow b" /> eller{" "}
            <InlineLatex latex="b \rightarrow a" />, sier vi at a og b er{" "}
            <strong>samtidige</strong>: <InlineLatex latex="a \parallel b" />.
            De kan ikke sammenlignes kausalt — ingen av dem «påvirket» den andre.
          </p>
        </div>

        {/* SVG-diagram: happens-before */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <p className="text-xs text-[var(--muted)] mb-3">
            Tidslinjediagram: tre prosesser med meldingsutveksling
          </p>
          <svg viewBox="0 0 560 200" className="w-full max-w-2xl mx-auto">
            <defs>
              <marker id="hb-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
              </marker>
            </defs>
            {/* Tidsakse */}
            <text x="30" y="18" fontSize="11" fill="#6b7280">tid →</text>
            <line x1="60" y1="14" x2="540" y2="14" stroke="#d1d5db" strokeWidth="1" markerEnd="url(#hb-arrow)"/>

            {/* Prosess-linjer */}
            {[60, 110, 160].map((y, i) => (
              <g key={i}>
                <text x="15" y={y + 4} fontSize="11" fontWeight="bold" fill="#3b82f6">P{i+1}</text>
                <line x1="50" y1={y} x2="530" y2={y} stroke="#93c5fd" strokeWidth="2"/>
              </g>
            ))}

            {/* P1: a → s1 → b → s2 */}
            <circle cx="100" cy="60" r="5" fill="#2563eb"/>
            <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">a</text>
            <circle cx="200" cy="60" r="5" fill="#dc2626"/>
            <text x="200" y="50" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">s₁</text>
            <circle cx="340" cy="60" r="5" fill="#2563eb"/>
            <text x="340" y="50" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">b</text>
            <circle cx="460" cy="60" r="5" fill="#dc2626"/>
            <text x="460" y="50" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">s₂</text>

            {/* P2: c → r1 → d */}
            <circle cx="120" cy="110" r="5" fill="#2563eb"/>
            <text x="120" y="100" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">c</text>
            <circle cx="280" cy="110" r="5" fill="#16a34a"/>
            <text x="280" y="100" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">r₁</text>
            <circle cx="400" cy="110" r="5" fill="#2563eb"/>
            <text x="400" y="100" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">d</text>

            {/* P3: e → r2 */}
            <circle cx="150" cy="160" r="5" fill="#2563eb"/>
            <text x="150" y="150" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">e</text>
            <circle cx="500" cy="160" r="5" fill="#16a34a"/>
            <text x="500" y="150" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">r₂</text>

            {/* Meldingspiler */}
            <line x1="200" y1="60" x2="278" y2="108" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5" markerEnd="url(#hb-arrow)"/>
            <text x="230" y="82" fontSize="9" fill="#dc2626">m₁</text>
            <line x1="460" y1="60" x2="498" y2="158" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5" markerEnd="url(#hb-arrow)"/>
            <text x="484" y="105" fontSize="9" fill="#dc2626">m₂</text>

            {/* Legend */}
            <circle cx="60" cy="185" r="4" fill="#2563eb"/>
            <text x="70" y="189" fontSize="9" fill="#6b7280">lokal hendelse</text>
            <circle cx="170" cy="185" r="4" fill="#dc2626"/>
            <text x="180" y="189" fontSize="9" fill="#6b7280">send</text>
            <circle cx="230" cy="185" r="4" fill="#16a34a"/>
            <text x="240" y="189" fontSize="9" fill="#6b7280">mottak</text>
            <text x="310" y="189" fontSize="9" fill="#6b7280">a→s₁→r₁ (transitivitet). e∥c (samtidige)</text>
          </svg>
        </div>
      </section>

      {/* ===== 3. LAMPORT-KLOKKER ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Lamport-klokker (skalare klokker)
        </h2>
        <p className="text-sm leading-relaxed">
          Lamport-klokker er enkle tellere. Hver prosess <InlineLatex latex="P_i" /> holder en teller{" "}
          <InlineLatex latex="C_i" />. Tre regler styrer oppdateringen:
        </p>

        <div className="space-y-3">
          <FormulaBox
            variant="blue"
            title="LC1 — Lokal hendelse"
            latex="C_i = C_i + 1"
            description="Før prosess Pᵢ utfører en hendelse, øker den sin teller med 1."
          />
          <FormulaBox
            variant="blue"
            title="LC2 — Sending av melding"
            latex="\text{ts}(m) = C_i \quad \text{(etter LC1)}"
            description="Tidsstempelet til meldingen er verdien til Cᵢ etter at LC1 er utført."
          />
          <FormulaBox
            variant="blue"
            title="LC3 — Mottak av melding"
            latex="C_j = \max(C_j,\, \text{ts}(m)) + 1"
            description="Pⱼ setter sin klokke til max av sin egen verdi og tidsstempelet i meldingen, deretter +1."
          />
        </div>

        {/* Lamport svakhet */}
        <div className="rounded-lg border-2 border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm space-y-2">
          <p className="font-bold text-amber-700 dark:text-amber-400">
            Viktig svakhet ved Lamport-klokker:
          </p>
          <p>
            <InlineLatex latex="a \rightarrow b \Rightarrow C(a) < C(b)" /> — alltid sant.
          </p>
          <p>
            Men <strong>omvendt gjelder IKKE</strong>:{" "}
            <InlineLatex latex="C(a) < C(b) \not\Rightarrow a \rightarrow b" />
          </p>
          <p>
            Du kan ikke bruke Lamport-klokker til å avgjøre om hendelser er kausalt relaterte
            eller samtidige. Til det trenger vi vektorklokker.
          </p>
        </div>

        {/* Gjennomgått Lamport-eksempel */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">
            Gjennomgått eksempel — Lamport-klokker (3 prosesser)
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Tre prosesser: P1 sender til P2, P2 sender til P3.
            Alle starter med C = 0.
          </p>
          <div className="overflow-x-auto">
            <table className="text-sm w-full">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/30">
                  <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-300">Hendelse</th>
                  <th className="px-3 py-2 text-center text-blue-700 dark:text-blue-300">C(P1)</th>
                  <th className="px-3 py-2 text-center text-blue-700 dark:text-blue-300">C(P2)</th>
                  <th className="px-3 py-2 text-center text-blue-700 dark:text-blue-300">C(P3)</th>
                  <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-300">Forklaring</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-border)]">
                {[
                  ["P1: a (lokal)", "1", "0", "0", "LC1: C1 = 0+1 = 1"],
                  ["P1: send m₁", "2", "0", "0", "LC1 først: C1=2, ts(m₁)=2"],
                  ["P2: b (lokal)", "2", "1", "0", "LC1: C2 = 0+1 = 1"],
                  ["P2: mottak m₁", "2", "3", "0", "LC3: max(1,2)+1 = 3"],
                  ["P2: send m₂", "2", "4", "0", "LC1+LC2: C2=4, ts(m₂)=4"],
                  ["P3: c (lokal)", "2", "4", "1", "LC1: C3 = 0+1 = 1"],
                  ["P3: mottak m₂", "2", "4", "5", "LC3: max(1,4)+1 = 5"],
                ].map(([h, c1, c2, c3, forklaring], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-blue-50/30 dark:bg-blue-900/10"}>
                    <td className="px-3 py-2 font-medium">{h}</td>
                    <td className="px-3 py-2 text-center font-mono">{c1}</td>
                    <td className="px-3 py-2 text-center font-mono">{c2}</td>
                    <td className="px-3 py-2 text-center font-mono">{c3}</td>
                    <td className="px-3 py-2 text-[var(--muted)]">{forklaring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setShowLamportSolution(!showLamportSolution)}
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            {showLamportSolution ? "Skjul oppsummering" : "Vis oppsummering og observasjon"}
          </button>
          {showLamportSolution && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-sm space-y-1">
              <p>
                <strong>Observasjon:</strong> send(m₁) har ts=2, mottak(m₁) har ts=3. ✓ ts(send) {"<"} ts(receive).
              </p>
              <p>
                <strong>Svakhet:</strong> C(P3:c)=1 {"<"} C(P1:send m₁)=2, men c og m₁ er samtidige — de påvirket ikke hverandre.
                Lamport-klokker kan ikke skille dette!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== 4. VEKTORKLOKKER ===== */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Vektorklokker — EKSAMENSGARANTI
          </h2>
          <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full border border-red-300 dark:border-red-700">
            ALLTID PÅ EKSAMEN
          </span>
        </div>

        <p className="text-sm leading-relaxed">
          Vektorklokker løser svakheten til Lamport-klokker. Med N prosesser
          holder hver prosess en <strong>N-dimensjonal vektor</strong>. Nå kan vi avgjøre
          kausalitet i begge retninger.
        </p>

        <div className="space-y-3">
          <FormulaBox
            variant="blue"
            title="VC1 — Lokal hendelse"
            latex="V_i[i] = V_i[i] + 1"
            description="Kun Pᵢ sin egen komponent økes. De andre forblir uendret."
          />
          <FormulaBox
            variant="blue"
            title="VC2 — Send melding"
            latex="V_i[i]++ \text{, deretter send } V_i \text{ med meldingen}"
            description="Pᵢ øker sin komponent (VC1), så sendes hele vektoren med meldingen."
          />
          <FormulaBox
            variant="blue"
            title="VC3 — Mottak av melding"
            latex="V_j[k] = \max(V_j[k],\, V_{\text{msg}}[k]) \text{ for alle } k, \text{ deretter } V_j[j]++"
            description="Ta komponentvis max med den mottatte vektoren, deretter øk Pⱼ sin egen komponent."
          />
        </div>

        {/* Styrken: kausalitet */}
        <div className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2 text-sm">
          <p className="font-bold text-blue-700 dark:text-blue-300">
            Styrken: kan bestemme kausalitet i begge retninger
          </p>
          <div className="space-y-1">
            <p>
              <InlineLatex latex="V(a) < V(b)" /> betyr:{" "}
              <InlineLatex latex="V(a)[k] \leq V(b)[k]" /> for alle k, og{" "}
              <InlineLatex latex="V(a)[k] < V(b)[k]" /> for minst én k.
            </p>
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              Da er <InlineLatex latex="a \rightarrow b" /> (a happened-before b).
            </p>
            <p>
              Hvis verken <InlineLatex latex="V(a) < V(b)" /> eller{" "}
              <InlineLatex latex="V(b) < V(a)" />, er a og b <strong>samtidige</strong>{" "}
              (<InlineLatex latex="a \parallel b" />).
            </p>
          </div>
          <div className="rounded bg-white dark:bg-slate-900 p-3 font-mono text-xs space-y-1">
            <p className="text-green-600 dark:text-green-400">✓ Lamport: a→b ⟹ C(a) {"<"} C(b)</p>
            <p className="text-green-600 dark:text-green-400">✓ Vektor: a→b ⟺ V(a) {"<"} V(b) (begge veier!)</p>
            <p className="text-red-500">✗ Lamport: C(a) {"<"} C(b) BETYR IKKE a→b</p>
          </div>
        </div>
      </section>

      {/* ===== 5. INTERAKTIV KLIKK-GJENNOM ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Interaktiv vektorklokke (3 prosesser — lær steg for steg)
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Klikk «Neste hendelse» for å se vektoren oppdatere seg steg for steg.
          Merket i rødt/grønt = send/mottak-hendelser.
        </p>

        <div className="rounded-xl border border-blue-300 dark:border-blue-700 bg-[var(--card)] p-5 space-y-4">
          {/* Prosesslinjer med vektorer */}
          <div className="space-y-3">
            {["P1", "P2", "P3"].map((p, pi) => {
              const stepsForProc = SIMPLE_STEPS.slice(0, simpleStep + 1).filter(s => s.proc === pi);
              const currentV = stepsForProc.length > 0 ? stepsForProc[stepsForProc.length - 1].v : [0, 0, 0];
              return (
                <div key={p} className="flex items-center gap-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400 w-6">{p}</span>
                  <div className="flex-1 h-0.5 bg-blue-200 dark:bg-blue-800 relative">
                    {SIMPLE_STEPS.slice(0, simpleStep + 1)
                      .map((s, si) => s.proc === pi ? si : -1)
                      .filter(x => x >= 0)
                      .map(si => {
                        const s = SIMPLE_STEPS[si];
                        return (
                          <div
                            key={si}
                            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
                              s.highlight
                                ? s.event.includes("send")
                                  ? "bg-red-500 border-red-700"
                                  : "bg-green-500 border-green-700"
                                : "bg-blue-500 border-blue-700"
                            }`}
                            style={{ left: `${(si + 1) * 10}%` }}
                            title={s.event}
                          />
                        );
                      })}
                  </div>
                  <span className="font-mono text-xs bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded border border-blue-200 dark:border-blue-700">
                    [{currentV.join(", ")}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Gjeldende hendelse */}
          <div className={`rounded-lg p-3 text-sm border-2 ${
            currentSimple.highlight
              ? currentSimple.event.includes("send")
                ? "bg-red-50 dark:bg-red-950/30 border-red-400 dark:border-red-700"
                : "bg-green-50 dark:bg-green-950/30 border-green-400 dark:border-green-700"
              : "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
          }`}>
            <p className="font-bold mb-1">
              Steg {simpleStep + 1}/{SIMPLE_STEPS.length}: {currentSimple.event}
            </p>
            <p className="text-[var(--muted)]">{currentSimple.action}</p>
            <p className="font-mono mt-2">
              V = [{currentSimple.v.join(", ")}]
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSimpleStep(Math.max(0, simpleStep - 1))}
              disabled={simpleStep === 0}
              className="px-4 py-2 rounded-lg text-sm bg-[var(--card)] border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400 transition-colors"
            >
              ← Forrige
            </button>
            <button
              onClick={() => setSimpleStep(Math.min(SIMPLE_STEPS.length - 1, simpleStep + 1))}
              disabled={simpleStep === SIMPLE_STEPS.length - 1}
              className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
            >
              Neste hendelse →
            </button>
            <button
              onClick={() => setSimpleStep(0)}
              className="px-4 py-2 rounded-lg text-sm bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400 transition-colors"
            >
              Start på nytt
            </button>
          </div>
        </div>
      </section>

      {/* ===== 6. EKSAMENSEKSEMPEL (4 prosesser) ===== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Eksamenseksempel — 4 prosesser (eksakt eksamensstil)
          </h2>
          <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold px-2 py-1 rounded border border-red-300 dark:border-red-700">
            Fra eksamen jan-2024
          </span>
        </div>

        {/* Oppgaveformulering */}
        <div className="rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3">
          <p className="font-semibold">Oppgave (Oppgave 9d, jan-2024):</p>
          <p className="text-sm">
            Consider the following sequence of events at the 4 processes below
            (sᵢ and rᵢ are corresponding send and receive events for i=1,2,3,4
            and the events (a, b, c, ..., g) are concurrent events).
            Compute the <strong>vector clock values</strong> for all the events at these four processes.
          </p>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-4 font-mono text-sm space-y-1">
            <p><strong>P₁</strong>: &nbsp; a &nbsp;&nbsp; s₁ &nbsp; s₂ &nbsp; b</p>
            <p><strong>P₂</strong>: &nbsp; c &nbsp;&nbsp; d &nbsp;&nbsp; e &nbsp;&nbsp; f</p>
            <p><strong>P₃</strong>: &nbsp; r₁ &nbsp; g &nbsp;&nbsp; s₃ &nbsp; r₄</p>
            <p><strong>P₄</strong>: &nbsp; r₂ &nbsp; h &nbsp;&nbsp; r₃ &nbsp; s₄</p>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Sammenheng: s₁ sendes til P3 (r₁), s₂ sendes til P4 (r₂), s₃ sendes til P4 (r₃), s₄ sendes til P3 (r₄)
          </p>
        </div>

        {/* Klikk-gjennom kalkulator */}
        <div className="rounded-xl border border-blue-300 dark:border-blue-700 bg-[var(--card)] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">
              Steg-for-steg løsning ({vcStep + 1}/{EXAMPLE_STEPS.length})
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setVcStep(Math.max(0, vcStep - 1))}
                disabled={vcStep === 0}
                className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400"
              >
                ← Forrige
              </button>
              <button
                onClick={() => setVcStep(Math.min(EXAMPLE_STEPS.length - 1, vcStep + 1))}
                disabled={vcStep === EXAMPLE_STEPS.length - 1}
                className="px-3 py-1.5 rounded text-xs bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
              >
                Neste →
              </button>
              <button
                onClick={() => setVcStep(0)}
                className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Gjeldende steg */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 text-sm">
            <p className="font-bold text-blue-700 dark:text-blue-300">
              {EXAMPLE_STEPS[vcStep].event}
            </p>
            <p className="font-mono text-lg mt-1">
              V = [{EXAMPLE_STEPS[vcStep].vc.join(", ")}]
            </p>
            <p className="text-[var(--muted)] text-xs mt-2">{EXAMPLE_STEPS[vcStep].note}</p>
          </div>

          <button
            onClick={() => setShowExamSolution(!showExamSolution)}
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            {showExamSolution ? "Skjul fasittabell" : "Vis komplett fasittabell (alle hendelser)"}
          </button>

          {showExamSolution && (
            <div className="overflow-x-auto">
              <table className="text-xs w-full">
                <thead>
                  <tr className="bg-blue-50 dark:bg-blue-900/30">
                    <th className="px-2 py-2 text-left text-blue-700 dark:text-blue-300">Prosess</th>
                    <th className="px-2 py-2 text-left text-blue-700 dark:text-blue-300">Hendelse</th>
                    <th className="px-2 py-2 text-left text-blue-700 dark:text-blue-300">Vektor [P1,P2,P3,P4]</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--card-border)]">
                  {[
                    ["P1", "a",   "[1, 0, 0, 0]"],
                    ["P1", "s₁",  "[2, 0, 0, 0]"],
                    ["P1", "s₂",  "[3, 0, 0, 0]"],
                    ["P1", "b",   "[4, 0, 0, 0]"],
                    ["P2", "c",   "[0, 1, 0, 0]"],
                    ["P2", "d",   "[0, 2, 0, 0]"],
                    ["P2", "e",   "[0, 3, 0, 0]"],
                    ["P2", "f",   "[0, 4, 0, 0]"],
                    ["P3", "r₁",  "[2, 0, 1, 0]"],
                    ["P3", "g",   "[2, 0, 2, 0]"],
                    ["P3", "s₃",  "[2, 0, 3, 0]"],
                    ["P3", "r₄",  "[3, 0, 4, 4]"],
                    ["P4", "r₂",  "[3, 0, 0, 1]"],
                    ["P4", "h",   "[3, 0, 0, 2]"],
                    ["P4", "r₃",  "[3, 0, 3, 3]"],
                    ["P4", "s₄",  "[3, 0, 3, 4]"],
                  ].map(([proc, evt, vc], i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-blue-50/30 dark:bg-blue-900/10"}>
                      <td className="px-2 py-1.5 font-semibold text-blue-600 dark:text-blue-400">{proc}</td>
                      <td className="px-2 py-1.5 font-mono">{evt}</td>
                      <td className="px-2 py-1.5 font-mono">{vc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ===== 7. EKSAMENSSTRATEGI ===== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Eksamensstrategi — slik løser du vektorklokke-oppgaven
        </h2>
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-[var(--card)] p-5 space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Identifiser N prosesser.</strong> Initialisér alle vektorer til [0,0,...,0].
            </li>
            <li>
              <strong>Les hendelsene prosess for prosess, venstre mot høyre.</strong>{" "}
              For <em>lokal hendelse</em>: øk kun din egen komponent med 1.
            </li>
            <li>
              <strong>Send-hendelse:</strong> Øk din komponent FØRST (VC1), deretter er
              sendingsvektoren klar (VC2). Skriv ned denne vektoren — mottakeren bruker den.
            </li>
            <li>
              <strong>Mottak-hendelse:</strong> Ta komponentvis max mellom din nåværende vektor og
              sendingsvektoren, deretter øk din EGEN komponent med 1 (VC3).
            </li>
            <li>
              <strong>Bekreft kausalitet:</strong> Sjekk at ts(send) {"<"} ts(mottak) for alle
              meldinger (ellers har du gjort feil).
            </li>
          </ol>
        </div>
      </section>

      {/* ===== 8. HVA DU MÅ KUNNE ===== */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">
          Hva du MÅ kunne til eksamen
        </h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Hvorfor fysiske klokker ikke fungerer i DS (clock drift, ingen global klokke)</li>
          <li>De tre happens-before-reglene og hva «samtidige hendelser» betyr</li>
          <li>Lamport-klokker: LC1, LC2, LC3 og beregning av tidsstempler</li>
          <li>Svakheten til Lamport: C(a) {"<"} C(b) betyr IKKE a→b</li>
          <li>Vektorklokker: VC1, VC2, VC3 og beregning steg for steg</li>
          <li>Styrken til vektorklokker: V(a) {"<"} V(b) ⟺ a→b (begge veier)</li>
          <li>Løse vektorklokke-oppgaven for 4 prosesser med send/mottak hendelser</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4 text-[var(--foreground)]">
          <li>
            <strong>Feil:</strong> Glemme å øke din egen komponent ved send (VC1) FØR du sender —
            sender vektoren UTEN å ha økt.
          </li>
          <li>
            <strong>Feil:</strong> Ved mottak, glemme å øke mottakerens komponent etter max.
            max er ikke nok — du må +1 på din komponent etterpå.
          </li>
          <li>
            <strong>Feil:</strong> Anta at Lamport-klokker kan avgjøre kausalitet i begge retninger.
            Det kan bare vektorklokker.
          </li>
          <li>
            <strong>Feil:</strong> Forveksle hvilken melding som kobler sᵢ til rᵢ —
            les oppgaven nøye, det er alltid oppgitt.
          </li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-5/teori/5-3" className="hover:text-[var(--accent)] text-sm">
          5.3 Gjensidig utelukkelse →
        </Link>
      </div>
    </div>
  );
}
