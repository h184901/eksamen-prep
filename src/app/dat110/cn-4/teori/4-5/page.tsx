"use client";

import Link from "next/link";
import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

// Graf-topology fra eksamener: R1-R2=8, R1-R3=5, R2-R3=2, R3-R4=1, R2-R4=8 (jan 2025)
// Og: R1-R3=8, R2-R3=2, R2-R4=1, R3-R4=5 (mai 2024)

// Interaktiv avstandsvektor-simulator basert på eksamens topologi
function DistanceVectorSimulator() {
  // Topologi jan 2025: R1-R2=8 nei (nei det er: R1-R3=5, R2-R3=2, R3-R4=1, R2-R4=8)
  // Fra eksamen jan 2025: R1-R2=? ikke oppgitt direkte, R1-R3=5, R2-R3=2, R3-R4=1, R2-R4=8
  // La oss bruke mai 2024: R1-R3=8, R2-R4=1, R2-R3=2, R3-R4=5
  // Naboer: R1↔R3 (kost 8), R2↔R3 (kost 2), R2↔R4 (kost 1), R3↔R4 (kost 5)

  const INF = 999;
  const topology = {
    nodes: ["R1", "R2", "R3", "R4"],
    links: [
      { a: "R1", b: "R3", cost: 8 },
      { a: "R2", b: "R3", cost: 2 },
      { a: "R2", b: "R4", cost: 1 },
      { a: "R3", b: "R4", cost: 5 },
    ]
  };

  function getCost(a: string, b: string): number {
    if (a === b) return 0;
    const link = topology.links.find(l => (l.a === a && l.b === b) || (l.a === b && l.b === a));
    return link ? link.cost : INF;
  }

  // Initiell avstandsvektor (etter initialisering)
  const initDV: Record<string, Record<string, number>> = {
    R1: { R1: 0, R2: INF, R3: 8, R4: INF },
    R2: { R1: INF, R2: 0, R3: 2, R4: 1 },
    R3: { R1: 8, R2: 2, R3: 0, R4: 5 },
    R4: { R1: INF, R2: 1, R3: 5, R4: 0 },
  };

  // Etter første iterasjon (naboer deler sine vektorer)
  const iter1DV: Record<string, Record<string, number>> = {
    R1: { R1: 0, R2: 8+2, R3: 8, R4: Math.min(INF, 8+5) },
    R2: { R1: 2+8, R2: 0, R3: 2, R4: 1 },
    R3: { R1: 8, R2: 2, R3: 0, R4: Math.min(5, 2+1) },
    R4: { R1: Math.min(INF, 1+INF, 5+8), R2: 1, R3: Math.min(5, 1+2), R4: 0 },
  };
  // R1: R2=min(INF, 8+2=10)=10, R4=min(INF, 8+5=13)=13
  // R3: R4=min(5, 2+1=3)=3
  // R4: R1=min(INF, 1+INF, 5+8=13)=13, R3=min(5, 1+2=3)=3

  // Korrigerte verdier
  const iter1: Record<string, Record<string, number>> = {
    R1: { R1: 0, R2: 10, R3: 8, R4: 13 },
    R2: { R1: 10, R2: 0, R3: 2, R4: 1 },
    R3: { R1: 8, R2: 2, R3: 0, R4: 3 },
    R4: { R1: 13, R2: 1, R3: 3, R4: 0 },
  };

  // Etter andre iterasjon
  const iter2: Record<string, Record<string, number>> = {
    R1: { R1: 0, R2: 10, R3: 8, R4: 11 }, // R4: min(13, 8+3=11)=11
    R2: { R1: 10, R2: 0, R3: 2, R4: 1 },
    R3: { R1: 8, R2: 2, R3: 0, R4: 3 },
    R4: { R1: 11, R2: 1, R3: 3, R4: 0 }, // R1: min(13, 1+10=11)=11
  };

  const steps = [
    { label: "Initialisering", dv: initDV, desc: "Hver node kjenner kun kostnaden til sine direkte naboer. Ikke-naboer settes til ∞." },
    { label: "Iterasjon 1", dv: iter1, desc: "Nodene deler sine avstandsvektorer med naboer og oppdaterer: R3 finner R4 via R2 (kost 3 < 5). R1 finner R2 via R3 (kost 10)." },
    { label: "Iterasjon 2", dv: iter2, desc: "R1 finner en bedre vei til R4 via R3 (8+3=11 < 13). R4 finner en bedre vei til R1 via R2 (1+10=11 < 13). Konvergens!" },
  ];

  const [step, setStep] = useState(0);
  const current = steps[step];

  const nodes = ["R1", "R2", "R3", "R4"];

  function fmt(v: number) {
    return v >= INF ? "∞" : String(v);
  }

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex gap-2 items-center flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              step === i
                ? "bg-network-600 text-white"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-network-50 dark:hover:bg-network-900"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4">
        <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-1">{current.label}</p>
        <p className="text-sm text-[var(--foreground)]">{current.desc}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nodes.map(node => (
          <div key={node} className="rounded-xl border-2 border-network-400 bg-[var(--card-bg)] overflow-hidden">
            <div className="bg-network-600 text-white text-center text-sm font-bold py-2">
              D<sub>{node}</sub>(y)
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-network-50 dark:bg-network-900">
                  <th className="p-1.5 border border-[var(--card-border)]">y</th>
                  <th className="p-1.5 border border-[var(--card-border)] text-network-600 dark:text-network-300">kost</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map(dest => {
                  const prev = step > 0 ? steps[step-1].dv[node][dest] : null;
                  const curr = current.dv[node][dest];
                  const changed = prev !== null && prev !== curr;
                  return (
                    <tr key={dest} className={changed ? "bg-green-100 dark:bg-green-900" : ""}>
                      <td className="p-1.5 border border-[var(--card-border)] text-center font-mono">{dest}</td>
                      <td className={`p-1.5 border border-[var(--card-border)] text-center font-mono font-bold ${changed ? "text-green-600 dark:text-green-400" : ""}`}>
                        {fmt(curr)}
                        {changed && <span className="text-xs ml-1">(↓{fmt(prev!)})</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <p className="text-xs text-[var(--muted)]">Topologi (mai 2024): R1↔R3=8, R2↔R3=2, R2↔R4=1, R3↔R4=5. Grønne celler = oppdaterte verdier.</p>
    </div>
  );
}

// Interaktiv Dijkstra-simulator for eksamen jan 2025
function DijkstraSimulator() {
  // Topologi jan 2025 eksamen: R1-R3=5, R2-R3=2, R3-R4=1, R2-R4=8 (R1 er ikke direkte nabo med R2 eller R4 ifølge grafen)
  // Faktisk fra grafen: R1-R2 (ingen direkte), R1-R3=5, R2-R3=2, R2-R4=8, R3-R4=1
  // NB: La oss bruke en klar topologi: u-v-w-x-y-z klassisk fra boken for Dijkstra

  const INF = 999;
  // Klar topologi for Dijkstra: 5 noder A,B,C,D,E
  // A-B=4, A-C=2, B-C=1, B-D=5, C-D=8, C-E=10, D-E=2
  const nodes = ["A", "B", "C", "D", "E"];
  const costs: Record<string, Record<string, number>> = {
    A: { A: 0, B: 4, C: 2, D: INF, E: INF },
    B: { A: 4, B: 0, C: 1, D: 5, E: INF },
    C: { A: 2, B: 1, C: 0, D: 8, E: 10 },
    D: { A: INF, B: 5, C: 8, D: 0, E: 2 },
    E: { A: INF, B: INF, C: 10, D: 2, E: 0 },
  };

  const steps = [
    {
      visited: ["A"],
      dist: { A: 0, B: 4, C: 2, D: INF, E: INF },
      prev: { A: "-", B: "A", C: "A", D: "-", E: "-" },
      note: "Start fra A. Initialiser: D(A)=0, D(B)=4, D(C)=2, resten=∞. Velg ubesøkt med lavest D: C (dist=2).",
    },
    {
      visited: ["A", "C"],
      dist: { A: 0, B: 3, C: 2, D: 10, E: 12 },
      prev: { A: "-", B: "C", C: "A", D: "C", E: "C" },
      note: "Besøk C. Oppdater naboer: D(B)=min(4, 2+1=3)=3 (via C). D(D)=min(∞,2+8=10)=10. D(E)=min(∞,2+10=12)=12. Velg ubesøkt med lavest D: B (dist=3).",
    },
    {
      visited: ["A", "C", "B"],
      dist: { A: 0, B: 3, C: 2, D: 8, E: 12 },
      prev: { A: "-", B: "C", C: "A", D: "B", E: "C" },
      note: "Besøk B. Oppdater: D(D)=min(10, 3+5=8)=8 (via B). D(E) ingen endring. Velg: D (dist=8).",
    },
    {
      visited: ["A", "C", "B", "D"],
      dist: { A: 0, B: 3, C: 2, D: 8, E: 10 },
      prev: { A: "-", B: "C", C: "A", D: "B", E: "D" },
      note: "Besøk D. Oppdater: D(E)=min(12, 8+2=10)=10 (via D). Velg: E (dist=10).",
    },
    {
      visited: ["A", "C", "B", "D", "E"],
      dist: { A: 0, B: 3, C: 2, D: 8, E: 10 },
      prev: { A: "-", B: "C", C: "A", D: "B", E: "D" },
      note: "Besøk E. Alle noder er besøkt. Algoritmen er ferdig! Korteste veier fra A: til B=3 (A→C→B), til C=2 (A→C), til D=8 (A→C→B→D), til E=10 (A→C→B→D→E).",
    },
  ];

  const [step, setStep] = useState(0);
  const current = steps[step];

  function fmt(v: number) { return v >= INF ? "∞" : String(v); }

  return (
    <div className="max-w-4xl space-y-4">
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-sm">
        <p className="font-bold mb-1">Topologi:</p>
        <p className="font-mono text-xs">A↔B=4, A↔C=2, B↔C=1, B↔D=5, C↔D=8, C↔E=10, D↔E=2</p>
        <p className="text-[var(--muted)] text-xs mt-1">Kilde: A. Mål: finn korteste vei til alle andre noder</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              step === i
                ? "bg-network-600 text-white"
                : "bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-network-50 dark:hover:bg-network-900"
            }`}
          >
            Iterasjon {i}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950 p-4">
        <p className="text-sm text-[var(--foreground)]">{current.note}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-network-100 dark:bg-network-900">
              <th className="border border-[var(--card-border)] p-2">Node</th>
              <th className="border border-[var(--card-border)] p-2">D(node)</th>
              <th className="border border-[var(--card-border)] p-2">Forgjenger</th>
              <th className="border border-[var(--card-border)] p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map(n => {
              const key = n as keyof typeof current.dist;
              const isVisited = current.visited.includes(n);
              const isJustVisited = current.visited[current.visited.length - 1] === n;
              const prevStep = step > 0 ? steps[step-1].dist[key] : null;
              const changed = prevStep !== null && prevStep !== current.dist[key];
              return (
                <tr key={n} className={isJustVisited ? "bg-green-100 dark:bg-green-900" : isVisited ? "bg-network-50 dark:bg-network-900" : ""}>
                  <td className="border border-[var(--card-border)] p-2 text-center font-bold">{n}</td>
                  <td className={`border border-[var(--card-border)] p-2 text-center font-mono font-bold ${changed ? "text-green-600 dark:text-green-400" : ""}`}>
                    {fmt(current.dist[key])}
                    {changed && <span className="text-xs ml-1 text-[var(--muted)]">(var {fmt(prevStep!)})</span>}
                  </td>
                  <td className="border border-[var(--card-border)] p-2 text-center font-mono">{current.prev[key]}</td>
                  <td className="border border-[var(--card-border)] p-2 text-center text-xs">
                    {isJustVisited ? <span className="text-green-600 dark:text-green-400 font-bold">✓ Nettopp besøkt</span>
                      : isVisited ? <span className="text-[var(--muted)]">Besøkt</span>
                      : <span className="text-orange-500">Ubesøkt</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CN4_5Page() {
  const [visEksamen2025, setVisEksamen2025] = useState(false);
  const [visEksamen2024, setVisEksamen2024] = useState(false);
  const [visCTI, setVisCTI] = useState(false);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.5 Rutealgoritmer</span>
      </div>

      <h1 className="text-3xl font-bold">4.5 Rutealgoritmer</h1>
      <p className="text-[var(--muted)] max-w-3xl text-lg">
        Rutealgoritmer beregner den laveste-kost-veien gjennom nettverket. Det finnes to fundamentalt ulike tilnærminger: link-state (alle kjenner hele grafen) og avstandsvektor (naboer deler informasjon). Oppgave 5 på BEGGE eksamener handler om dette.
      </p>

      {/* Viktig banner */}
      <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-5 max-w-4xl">
        <p className="text-sm font-bold text-red-700 dark:text-red-300 mb-2">Eksamensgaranti: Oppgave 5 handler om dette</p>
        <ul className="text-sm space-y-1 text-[var(--foreground)]">
          <li><strong>Jan 2025 Oppgave 5:</strong> Avstandsvektor (Bellman-Ford) — initialiseringstabeller + oppdatering fra nabo</li>
          <li><strong>Mai 2024 Oppgave 5:</strong> Avstandsvektor (Bellman-Ford) — identisk format og type spørsmål</li>
          <li>Begge eksamenene: 4 rutere (R1–R4), koster (1, 2, 5, 8), finn billigste vei + fyll ut DV-tabeller</li>
        </ul>
      </div>

      {/* Sammenligning */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Link-state vs Avstandsvektor: Sammenligning</h2>
        <div className="overflow-x-auto max-w-5xl">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-network-100 dark:bg-network-900">
                <th className="border border-[var(--card-border)] p-3 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] p-3 text-left text-network-600 dark:text-network-300">Link-state (LS)</th>
                <th className="border border-[var(--card-border)] p-3 text-left text-blue-600 dark:text-blue-300">Avstandsvektor (DV)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Algoritme", "Dijkstras korteste-vei-algoritme", "Bellman-Ford-ligningen"],
                ["Informasjon", "Kjenner HELE nettverkets topologi", "Kjenner bare naboers avstandsvektorer"],
                ["Meldingskompleksitet", "O(n²) — sender til alle", "Kun til naboer"],
                ["Konvergenshastighet", "Rask O(n²)", "Sakte — kan ta mange iterasjoner"],
                ["Robusthet", "God — lokale feil spres ikke", "Dårlig — count-to-infinity-problemet"],
                ["Protokoll-eksempel", "OSPF (intra-AS)", "RIP (legacy), BGP bruker varianter"],
                ["Global/lokal kunnskap", "Global (flooding av LSA-er)", "Lokal (kun naboer)"],
              ].map(([egenskap, ls, dv], i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-[var(--card-bg)]"}>
                  <td className="border border-[var(--card-border)] p-3 font-semibold">{egenskap}</td>
                  <td className="border border-[var(--card-border)] p-3">{ls}</td>
                  <td className="border border-[var(--card-border)] p-3">{dv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seksjon: Bellman-Ford */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Avstandsvektor-algoritmen (Bellman-Ford)</h2>

        <FormulaBox
          latex="D_x(y) = \\min_{v} \\{ c(x,v) + D_v(y) \\}"
          title="Bellman-Ford-ligningen"
          variant="gold"
          description="Korteste vei fra x til y = minimum over alle naboer v av (kost til v) + (vs korteste vei til y)"
        />

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold mb-2">Nøkkelbegreper</h3>
            <ul className="text-sm space-y-1 text-[var(--foreground)] list-disc list-inside">
              <li><InlineLatex latex="D_x(y)" /> = estimert korteste avstand fra x til y</li>
              <li><InlineLatex latex="c(x,v)" /> = direkte kantkostnad fra x til nabo v</li>
              <li>Avstandsvektor = tabellen <InlineLatex latex="[D_x(y) : y \in N]" /></li>
              <li>N = mengden av alle noder i nettverket</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold mb-2">Algoritmen i pseudokode</h3>
            <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
              <p className="font-bold">Initialisering:</p>
              <p>D_x(y) = c(x,y) for alle y</p>
              <p>{"// ∞ hvis y ikke er nabo"}</p>
              <p className="font-bold mt-2">Loop (evig):</p>
              <p>Vent på endring hos nabo</p>
              <p>For alle y: oppdater D_x(y)</p>
              <p>Hvis D_x endret: send til naboer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interaktiv DV-simulator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Interaktiv avstandsvektor-simulator</h2>
        <DistanceVectorSimulator />
      </section>

      {/* Eksamensoppgave jan 2025 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Eksamensoppgave 5 (jan 2025) — komplett gjennomgang</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 max-w-4xl">
          <p className="font-semibold mb-3">Topologi: R1, R2, R3, R4. Kanter: R1↔R3=5, R2↔R3=2, R3↔R4=1, R2↔R4=8</p>
          <div className="flex gap-4 flex-wrap text-sm font-mono">
            <span className="bg-network-100 dark:bg-network-900 px-3 py-1 rounded">R1↔R3 = 5</span>
            <span className="bg-network-100 dark:bg-network-900 px-3 py-1 rounded">R2↔R3 = 2</span>
            <span className="bg-network-100 dark:bg-network-900 px-3 py-1 rounded">R3↔R4 = 1</span>
            <span className="bg-network-100 dark:bg-network-900 px-3 py-1 rounded">R2↔R4 = 8</span>
          </div>
        </div>

        <button
          onClick={() => setVisEksamen2025(!visEksamen2025)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {visEksamen2025 ? "Skjul" : "Vis"} full løsning Jan 2025 Oppgave 5
        </button>

        {visEksamen2025 && (
          <div className="rounded-xl border-2 border-red-400 bg-[var(--card-bg)] p-6 max-w-5xl space-y-6">

            <div>
              <h3 className="font-bold text-xl text-red-700 dark:text-red-300 mb-3">Del a) Billigste vei fra R1 til R4</h3>
              <div className="font-mono text-sm bg-[var(--bg)] rounded-lg p-4 space-y-1">
                <p>Mulige veier:</p>
                <p>R1→R3→R4: kost = 5 + 1 = <span className="font-bold text-green-600 dark:text-green-400">6</span> ✓</p>
                <p>R1→R3→R2→R4: kost = 5 + 2 + 8 = 15</p>
                <p className="mt-2 font-bold text-network-600 dark:text-network-300">Svar: R1→R3→R4 med kost 6</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-red-700 dark:text-red-300 mb-3">Del b) Initialiseringstabeller</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Initialisering: D_x(y) = c(x,y) hvis y er nabo, 0 hvis y=x, ∞ ellers
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { node: "R1", data: { R1: 0, R2: "∞", R3: 5, R4: "∞" }, naboer: "R3" },
                  { node: "R2", data: { R1: "∞", R2: 0, R3: 2, R4: 8 }, naboer: "R3, R4" },
                  { node: "R3", data: { R1: 5, R2: 2, R3: 0, R4: 1 }, naboer: "R1, R2, R4" },
                  { node: "R4", data: { R1: "∞", R2: 8, R3: 1, R4: 0 }, naboer: "R2, R3" },
                ].map(({ node, data, naboer }) => (
                  <div key={node} className="rounded-xl border-2 border-network-400 overflow-hidden">
                    <div className="bg-network-600 text-white text-center text-sm font-bold py-2">D_{node}(y)</div>
                    <div className="p-1 text-xs text-center text-[var(--muted)]">Naboer: {naboer}</div>
                    <table className="w-full text-xs">
                      <tbody>
                        {Object.entries(data).map(([y, v]) => (
                          <tr key={y}>
                            <td className="border border-[var(--card-border)] p-1.5 text-center">{y}</td>
                            <td className={`border border-[var(--card-border)] p-1.5 text-center font-bold font-mono ${v === "∞" ? "text-[var(--muted)]" : "text-network-600 dark:text-network-300"}`}>{String(v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-red-700 dark:text-red-300 mb-3">Del c) Oppdatering av D_R1 etter å ha mottatt D_R3</h3>
              <div className="bg-[var(--bg)] rounded-lg p-4 text-sm space-y-3">
                <p className="font-bold">Gitt:</p>
                <div className="font-mono text-xs space-y-1">
                  <p>D_R1(y) (nåværende): R1=0, R2=7, R3=5, R4=6</p>
                  <p>D_R3(y) (mottatt fra R3): R1=5, R2=2, R3=0, R4=1</p>
                </div>
                <p className="font-bold mt-2">R1 sine naboer: kun R3. Kost R1→R3 = 5.</p>
                <p>Bruk BF-ligningen: D_R1(y) = min(nåværende, c(R1,R3) + D_R3(y))</p>
                <div className="font-mono text-xs space-y-1 mt-2">
                  <p>D_R1(R1) = min(0, 5+5=10) = <span className="text-green-600 dark:text-green-400 font-bold">0</span> (uendret)</p>
                  <p>D_R1(R2) = min(7, 5+2=7) = <span className="text-green-600 dark:text-green-400 font-bold">7</span> (uendret)</p>
                  <p>D_R1(R3) = min(5, 5+0=5) = <span className="text-green-600 dark:text-green-400 font-bold">5</span> (uendret)</p>
                  <p>D_R1(R4) = min(6, 5+1=6) = <span className="text-green-600 dark:text-green-400 font-bold">6</span> (uendret)</p>
                </div>
                <p className="text-network-600 dark:text-network-300 font-bold">Svar: D_R1 = [0, 7, 5, 6] — ingen endring i dette tilfellet</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-red-700 dark:text-red-300 mb-3">Del d) Oppdatering av D_R4 etter å ha mottatt D_R2 og D_R3</h3>
              <div className="bg-[var(--bg)] rounded-lg p-4 text-sm space-y-3">
                <div className="font-mono text-xs space-y-1">
                  <p>D_R4(y) nåværende: R1=6, R2=3, R3=1, R4=0</p>
                  <p>D_R2(y) fra R2: R1=7, R2=0, R3=2, R4=3</p>
                  <p>D_R3(y) fra R3: R1=5, R2=2, R3=0, R4=1</p>
                </div>
                <p className="font-bold mt-2">R4 sine naboer: R2 (kost 8), R3 (kost 1)</p>
                <div className="font-mono text-xs space-y-1 mt-2">
                  <p>D_R4(R1) = min(6, 8+7=15, 1+5=6) = <span className="text-green-600 dark:text-green-400 font-bold">6</span></p>
                  <p>D_R4(R2) = min(3, 8+0=8, 1+2=3) = <span className="text-green-600 dark:text-green-400 font-bold">3</span></p>
                  <p>D_R4(R3) = min(1, 8+2=10, 1+0=1) = <span className="text-green-600 dark:text-green-400 font-bold">1</span></p>
                  <p>D_R4(R4) = <span className="text-green-600 dark:text-green-400 font-bold">0</span></p>
                </div>
                <p className="text-network-600 dark:text-network-300 font-bold">Svar: D_R4 = [6, 3, 1, 0] — ingen endring</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Eksamensoppgave mai 2024 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Eksamensoppgave 5 (mai 2024) — komplett gjennomgang</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 max-w-4xl">
          <p className="font-semibold mb-3">Topologi: R1, R2, R3, R4. Kanter: R1↔R3=8, R2↔R3=2, R2↔R4=1, R3↔R4=5</p>
          <div className="flex gap-4 flex-wrap text-sm font-mono">
            <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">R1↔R3 = 8</span>
            <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">R2↔R3 = 2</span>
            <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">R2↔R4 = 1</span>
            <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded">R3↔R4 = 5</span>
          </div>
        </div>

        <button
          onClick={() => setVisEksamen2024(!visEksamen2024)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {visEksamen2024 ? "Skjul" : "Vis"} full løsning Mai 2024 Oppgave 5
        </button>

        {visEksamen2024 && (
          <div className="rounded-xl border-2 border-blue-400 bg-[var(--card-bg)] p-6 max-w-5xl space-y-6">

            <div>
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 mb-3">Del a) Billigste vei fra R1 til R4</h3>
              <div className="font-mono text-sm bg-[var(--bg)] rounded-lg p-4 space-y-1">
                <p>Mulige veier:</p>
                <p>R1→R3→R4: kost = 8 + 5 = 13</p>
                <p>R1→R3→R2→R4: kost = 8 + 2 + 1 = <span className="font-bold text-green-600 dark:text-green-400">11</span> ✓</p>
                <p className="mt-2 font-bold text-network-600 dark:text-network-300">Svar: R1→R3→R2→R4 med kost 11</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 mb-3">Del b) Initialiseringstabeller</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { node: "R1", data: { R1: 0, R2: "∞", R3: 8, R4: "∞" } },
                  { node: "R2", data: { R1: "∞", R2: 0, R3: 2, R4: 1 } },
                  { node: "R3", data: { R1: 8, R2: 2, R3: 0, R4: 5 } },
                  { node: "R4", data: { R1: "∞", R2: 1, R3: 5, R4: 0 } },
                ].map(({ node, data }) => (
                  <div key={node} className="rounded-xl border-2 border-blue-400 overflow-hidden">
                    <div className="bg-blue-600 text-white text-center text-sm font-bold py-2">D_{node}(y)</div>
                    <table className="w-full text-xs">
                      <tbody>
                        {Object.entries(data).map(([y, v]) => (
                          <tr key={y}>
                            <td className="border border-[var(--card-border)] p-1.5 text-center">{y}</td>
                            <td className={`border border-[var(--card-border)] p-1.5 text-center font-bold font-mono ${v === "∞" ? "text-[var(--muted)]" : "text-blue-600 dark:text-blue-300"}`}>{String(v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 mb-3">Del c) D_R1 etter å ha mottatt D_R3</h3>
              <div className="bg-[var(--bg)] rounded-lg p-4 text-sm space-y-3">
                <div className="font-mono text-xs space-y-1">
                  <p>D_R1(y) nåværende: R1=0, R2=10, R3=8, R4=13</p>
                  <p>D_R3(y) fra R3: R1=8, R2=2, R3=0, R4=3</p>
                </div>
                <p className="font-bold mt-2">R1 sin nabo: R3 (kost 8)</p>
                <div className="font-mono text-xs space-y-1 mt-2">
                  <p>D_R1(R1) = min(0, 8+8=16) = <span className="font-bold">0</span></p>
                  <p>D_R1(R2) = min(10, 8+2=10) = <span className="font-bold">10</span></p>
                  <p>D_R1(R3) = min(8, 8+0=8) = <span className="font-bold">8</span></p>
                  <p>D_R1(R4) = min(13, 8+3=11) = <span className="font-bold text-green-600 dark:text-green-400">11</span> ← FORBEDRING!</p>
                </div>
                <p className="text-blue-600 dark:text-blue-300 font-bold">Svar: D_R1 = [0, 10, 8, 11]</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Seksjon: Dijkstra */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Link-state algoritmen (Dijkstra)</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          I link-state-algoritmen broadcaster hver ruter sin lokale koblingsinformasjon (link state advertisements, LSA) til <em>alle</em> rutere i nettverket. Etter flooding kjenner alle rutere hele nettverkstopologien og kjører Dijkstras algoritme lokalt.
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 max-w-3xl">
          <h3 className="font-bold mb-2">Dijkstra — pseudokode</h3>
          <div className="font-mono text-xs bg-[var(--bg)] rounded-lg p-3 space-y-1">
            <p className="font-bold">Initialisering:</p>
            <p>N' = {"{u}"}  (u = startnoden)</p>
            <p>For alle v: D(v) = c(u,v)  (∞ hvis ikke nabo)</p>
            <p className="font-bold mt-2">Loop (gjenta n-1 ganger):</p>
            <p>Finn w ∉ N' med minst D(w)</p>
            <p>Legg w til N'</p>
            <p>Oppdater: for alle v ∉ N':</p>
            <p>  D(v) = min(D(v), D(w)+c(w,v))</p>
          </div>
        </div>

        <DijkstraSimulator />
      </section>

      {/* Count-to-infinity */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-network-700 dark:text-network-300">Count-to-infinity-problemet (DV)</h2>

        <p className="text-[var(--foreground)] max-w-3xl">
          Avstandsvektor-algoritmen har et alvorlig problem: ved en linknedgang kan vektorer "telle seg opp til uendelig" svært sakte. Dette kalles count-to-infinity.
        </p>

        <div className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-5 max-w-4xl space-y-3">
          <h3 className="font-bold text-red-700 dark:text-red-300">Eksempel: X–Y–Z, kost X→Y=4, Y→Z=1</h3>
          <div className="font-mono text-xs bg-white dark:bg-gray-900 rounded-lg p-4 space-y-1">
            <p>Opprinnelig: D_Y(X)=4, D_Z(X)=5 (via Y)</p>
            <p className="text-red-500 font-bold mt-2">X→Y-lenken feiler! D_Y(X) bør bli ∞</p>
            <p>Men Y tenker: "Z sier D_Z(X)=5, via Y med kost 1, så D_Y(X)=1+5=6"</p>
            <p>Y setter D_Y(X)=6 og sier det til Z</p>
            <p>Z oppdaterer D_Z(X)=1+6=7</p>
            <p>Y oppdaterer D_Y(X)=1+7=8</p>
            <p>... og slik teller de seg opp til uendelig</p>
          </div>
        </div>

        <button
          onClick={() => setVisCTI(!visCTI)}
          className="bg-network-600 hover:bg-network-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          {visCTI ? "Skjul" : "Vis"} løsning: Poisoned Reverse
        </button>

        {visCTI && (
          <div className="rounded-xl border-2 border-green-400 bg-green-50 dark:bg-green-950 p-5 max-w-4xl space-y-3">
            <h3 className="font-bold text-green-700 dark:text-green-300">Poisoned Reverse (giftig omvending)</h3>
            <p className="text-sm text-[var(--foreground)]">
              Idé: Dersom Z ruter til X via Y, sier Z til Y at D_Z(X)=∞. Y vil da ikke bruke Z som neste hopp for å nå X, og unngår routing-løkken.
            </p>
            <div className="font-mono text-xs bg-white dark:bg-gray-900 rounded-lg p-4 space-y-1">
              <p>Z ruter til X via Y:</p>
              <p>→ Z annonserer D_Z(X)=∞ til Y (løgn!)</p>
              <p>Når X→Y-lenken feiler:</p>
              <p>Y ser D_Z(X)=∞ og setter D_Y(X)=∞ umiddelbart ✓</p>
            </div>
            <p className="text-sm text-[var(--muted)]">Merk: Poisoned reverse løser ikke count-to-infinity for alle topologier — bare for to-node-løkker. For større løkker trengs split horizon med andre mekanismer.</p>
          </div>
        )}
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950 p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-network-700 dark:text-network-300 mb-3">Hva du MÅ kunne til eksamen</h2>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Bellman-Ford-ligningen og hva hvert symbol betyr</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Fylle ut initialiseringstabeller for DV-algoritmen</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Oppdatere en avstandsvektor etter å ha mottatt nabovektorer</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Finne billigste vei mellom to noder (alle mulige veier)</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare Dijkstras algoritme steg for steg</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Forklare count-to-infinity og poisoned reverse</li>
          <li className="flex gap-2"><span className="text-network-600 font-bold">✓</span> Sammenligne LS og DV (konvergenshastighet, robusthet, kompleksitet)</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-950 p-5 max-w-3xl space-y-2">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-300">Vanlige feil å unngå</h2>
        <ul className="text-sm space-y-2 text-[var(--foreground)]">
          <li><strong>Initialisering:</strong> Sett ∞ for IKKE-naboer — ikke 0! Bare D_x(x)=0</li>
          <li><strong>Naboer er nøkkelen:</strong> D_x(y) oppdateres via BF over NABOER — ikke alle noder</li>
          <li><strong>Min-operasjonen:</strong> Ta alltid minimum av nåværende og nytt estimat</li>
          <li><strong>Dijkstra-rekkefølge:</strong> Velg alltid den ubesøkte noden med MINST D(v)</li>
        </ul>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-4/teori/4-3" className="hover:text-[var(--accent)] text-sm">
          ← 4.3 NAT
        </Link>
        <Link href="/dat110/cn-4/teori/5-2" className="hover:text-[var(--accent)] text-sm">
          5.2 Rutingprotokoller →
        </Link>
      </div>
    </div>
  );
}
