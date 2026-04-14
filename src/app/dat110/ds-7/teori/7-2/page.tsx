"use client";

import { useState } from "react";
import Link from "next/link";

type Model = "strict" | "sequential" | "causal" | "eventual";

const modelInfo: Record<Model, {
  name: string;
  tagline: string;
  definition: string;
  intuition: string;
  legal: string;
  illegal: string;
  examples: string[];
  strength: number; // 1-4
  pros: string[];
  cons: string[];
  color: string;
  lightBg: string;
  border: string;
}> = {
  strict: {
    name: "Strict Consistency",
    tagline: "Absolutt sterkest — og umulig i DS",
    definition: "Enhver lesing returnerer alltid resultatet av den aller siste skriveoperasjonen, uansett hvilken node du leser fra.",
    intuition: "Tenk deg en enkelt-prosessor datamaskin: det finnes én global tidsorden. Dessverre krever dette en perfekt global klokke, som ikke eksisterer i distribuerte systemer.",
    legal: "W(x)1 på P1, deretter R(x) på P2 → returnerer alltid 1",
    illegal: "W(x)1 på P1, R(x) på P2 returnerer gammel verdi (0) — selv med liten forsinkelse",
    examples: ["Enkelt-prosessor RAM", "Enkelt-node database (ikke distribuert)"],
    strength: 4,
    pros: ["Enklest å resonnere om", "Ingen uventede verdier"],
    cons: ["Krever global synkron klokke — umulig i DS", "Ekstremt høy ytelseskostnad", "Brukes ikke i praksis"],
    color: "text-purple-600 dark:text-purple-400",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-300 dark:border-purple-700",
  },
  sequential: {
    name: "Sequential Consistency",
    tagline: "Alle ser samme rekkefølge (men ikke real-time)",
    definition: "Resultatet av enhver utførelse er det samme som om operasjonene til alle prosessene ble utført i en global sekvensiell orden, og operasjonene til hver enkelt prosess forekommer i den rekkefølgen de er spesifisert i programmet.",
    intuition: "Det trenger ikke være real-time rekkefølge — men alle prosesser MÅ se den SAMME interleaving. Hvis P1 ser W(x)1 etterfulgt av W(x)2, må P2 også se dem i denne rekkefølgen.",
    legal: "P1: W(x)1, P2: W(x)2 → alle prosesser ser enten [W(x)1, W(x)2] eller [W(x)2, W(x)1] — men alle ser det SAMME.",
    illegal: "P3 ser [W(x)1, W(x)2] mens P4 ser [W(x)2, W(x)1] — ulike prosesser ser ulik rekkefølge.",
    examples: ["Prosjekt 3 (ChordDHT) bruker sekvensiell konsistens", "Zookeeper (primær-basert)"],
    strength: 3,
    pros: ["Sterk nok for mange applikasjoner", "Implementerbar i distribuerte systemer", "Intuitiv: programrekkefølge bevares"],
    cons: ["Ingen real-time garanti", "Koordineringskostnader ved skriving"],
    color: "text-blue-600 dark:text-blue-400",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-300 dark:border-blue-700",
  },
  causal: {
    name: "Causal Consistency",
    tagline: "Kausalrelaterte operasjoner i riktig rekkefølge",
    definition: "Skriveoperasjoner som er kausalt relaterte (den ene avhenger av den andre) MÅ ses i riktig rekkefølge av alle prosesser. Samtidige (concurrent) skriveoperasjoner kan ses i ulik rekkefølge.",
    intuition: "Årsak og virkning: hvis P1 leser W(x)1 og deretter skriver W(y)2, er W(y)2 kausalt avhengig av W(x)1. Andre prosesser MÅ se W(x)1 før W(y)2. Men to urelaterte skrivinger (samtidige) kan ses i vilkårlig rekkefølge.",
    legal: "P1: W(x)1. P2 leser x=1, skriver W(y)2. P3 MÅ se W(x)1 før W(y)2, men kan se samtidige skrivinger i ulik rekkefølge.",
    illegal: "P3 ser W(y)2 (effekten) uten å ha sett W(x)1 (årsaken) — bryter kausalitet.",
    examples: ["Sosiale medier-kommentarer (svar skal ses etter original)", "Git (commit-historikk)"],
    strength: 2,
    pros: ["Svakere krav enn sekvensiell", "Lavere koordineringskostnader", "Naturlig for mange applikasjoner"],
    cons: ["Samtidige oppdateringer kan ses ulikt", "Kan overraske om man ikke er klar over det"],
    color: "text-teal-600 dark:text-teal-400",
    lightBg: "bg-teal-50 dark:bg-teal-950/30",
    border: "border-teal-300 dark:border-teal-700",
  },
  eventual: {
    name: "Eventual Consistency",
    tagline: "Konvergerer til slutt — brukt av DNS, Dynamo, Cassandra",
    definition: "Gitt at det ikke skjer nye oppdateringer på et dataelement, vil til slutt alle replikaer konvergere til den samme verdien. Det gis ingen garanti om NÅR dette skjer.",
    intuition: "Tenk på DNS: når du oppdaterer en DNS-oppføring, vil ikke alle DNS-servere i verden se den umiddelbart. Men etter noen timer vil alle til slutt ha den nye verdien. I mellomtiden kan du få ulike svar fra ulike DNS-servere.",
    legal: "P1 skriver W(x)5. P2 leser x=3 (gammel). P3 leser x=5 (ny). Etter at propagering er ferdig: alle leser x=5.",
    illegal: "(Nesten ingenting er ulovlig — systemet garanterer kun eventuell konvergens)",
    examples: ["DNS (Domain Name System)", "Amazon DynamoDB", "Apache Cassandra", "CouchDB", "Sosiale medier likes/views"],
    strength: 1,
    pros: ["Svært høy ytelse", "Høy tilgjengelighet", "Skalerer godt", "AP i CAP-teoremet"],
    cons: ["Ingen garanti om når", "Klienter kan se utdaterte data", "Vanskelig å resonnere om"],
    color: "text-green-600 dark:text-green-400",
    lightBg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-300 dark:border-green-700",
  },
};

// Timeline-scenariet for visualisering
type TimelineScenario = {
  label: string;
  events: { process: string; time: number; type: "write" | "read"; value: string; legal: boolean }[];
  isLegal: boolean;
  explanation: string;
};

const scenarios: Record<Model, { legal: TimelineScenario; illegal: TimelineScenario }> = {
  strict: {
    legal: {
      label: "Lovlig (strict): Alle leser etter skriving",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=1", legal: true },
        { process: "P2", time: 3, type: "read", value: "R(x)=1", legal: true },
        { process: "P3", time: 4, type: "read", value: "R(x)=1", legal: true },
      ],
      isLegal: true,
      explanation: "P2 og P3 leser ALLTID den siste skrevne verdien.",
    },
    illegal: {
      label: "ULOVLIG (strict): Noen leser gammel verdi",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=1", legal: true },
        { process: "P2", time: 2, type: "read", value: "R(x)=0", legal: false },
        { process: "P3", time: 3, type: "read", value: "R(x)=1", legal: true },
      ],
      isLegal: false,
      explanation: "P2 leser gammel verdi 0 selv etter at W(x)=1 skjedde — brudd på strict consistency.",
    },
  },
  sequential: {
    legal: {
      label: "Lovlig (sequential): Alle ser samme rekkefølge",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=1", legal: true },
        { process: "P2", time: 2, type: "write", value: "W(x)=2", legal: true },
        { process: "P3", time: 3, type: "read", value: "R(x)=2", legal: true },
        { process: "P4", time: 4, type: "read", value: "R(x)=2", legal: true },
      ],
      isLegal: true,
      explanation: "P3 og P4 ser begge W(x)=2 som siste verdi — samme rekkefølge.",
    },
    illegal: {
      label: "ULOVLIG (sequential): P3 og P4 ser ulik rekkefølge",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=1", legal: true },
        { process: "P2", time: 2, type: "write", value: "W(x)=2", legal: true },
        { process: "P3", time: 3, type: "read", value: "R(x)=2 (sist)", legal: true },
        { process: "P4", time: 3, type: "read", value: "R(x)=1 (sist?!)", legal: false },
      ],
      isLegal: false,
      explanation: "P3 ser W(x)=2 som den siste skrivingen, men P4 ser W(x)=1 som sist — ulik global rekkefølge = ULOVLIG.",
    },
  },
  causal: {
    legal: {
      label: "Lovlig (causal): Samtidige operasjoner kan ses ulikt",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=1", legal: true },
        { process: "P2", time: 1, type: "write", value: "W(y)=2", legal: true },
        { process: "P3", time: 3, type: "read", value: "R(x)=1, R(y)=2", legal: true },
        { process: "P4", time: 3, type: "read", value: "R(x)=0, R(y)=2", legal: true },
      ],
      isLegal: true,
      explanation: "W(x)=1 og W(y)=2 er samtidige (ikke kausalt relatert). P4 kan se dem i annen rekkefølge — LOVLIG under causal.",
    },
    illegal: {
      label: "ULOVLIG (causal): P3 ser effekt uten årsak",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=1", legal: true },
        { process: "P2", time: 2, type: "read", value: "leser x=1", legal: true },
        { process: "P2", time: 3, type: "write", value: "W(y)=2", legal: true },
        { process: "P3", time: 4, type: "read", value: "R(y)=2, R(x)=0 !!", legal: false },
      ],
      isLegal: false,
      explanation: "P3 ser W(y)=2 som er kausalt avhengig av W(x)=1, men ser ikke x=1 ennå. Kausal avhengighet brytes — ULOVLIG.",
    },
  },
  eventual: {
    legal: {
      label: "Lovlig (eventual): Midlertidig inkonsistens OK",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=5", legal: true },
        { process: "P2", time: 2, type: "read", value: "R(x)=3 (gammel)", legal: true },
        { process: "P3", time: 2, type: "read", value: "R(x)=5 (ny)", legal: true },
        { process: "P2", time: 5, type: "read", value: "R(x)=5 (konv.)", legal: true },
      ],
      isLegal: true,
      explanation: "P2 leser gammel verdi, P3 ny verdi — begge lovlig! Etter propagering ser alle x=5.",
    },
    illegal: {
      label: "Nesten ingenting er ulovlig under eventual",
      events: [
        { process: "P1", time: 1, type: "write", value: "W(x)=5", legal: true },
        { process: "P2", time: 10, type: "read", value: "R(x)=3 (fortsatt gammel)", legal: true },
        { process: "P3", time: 20, type: "read", value: "R(x)=5 (til slutt)", legal: true },
      ],
      isLegal: true,
      explanation: "Under eventual consistency er nesten ingen scenario ulovlig — systemet trenger bare å konvergere TIL SLUTT.",
    },
  },
};

export default function DS7_2Page() {
  const [activeModel, setActiveModel] = useState<Model>("sequential");
  const [showScenario, setShowScenario] = useState<"legal" | "illegal">("legal");

  const info = modelInfo[activeModel];
  const scenario = scenarios[activeModel][showScenario];

  const models: Model[] = ["strict", "sequential", "causal", "eventual"];
  const strengthLabels = ["Svakest", "Svak", "Sterk", "Sterkest"];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-7/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">7.2 Data-sentrerte konsistensmodeller</span>
      </div>

      <h1 className="text-2xl font-bold">7.2 Data-sentrerte konsistensmodeller</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        En konsistensmodell er en <strong>kontrakt mellom datalageret og prosessene</strong>: hvilke garantier gir systemet om hva prosessene kan observere?
        Dette er det viktigste temaet i kapittel 7 — og eksamensoppgaver spør direkte om dette.
      </p>

      {/* Viktigst for eksamen */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <strong className="text-amber-700 dark:text-amber-400">Eksamensfokus:</strong>{" "}
        Oppgave 9c (2025): "Beskriv kort forskjellen mellom datasentrert og klientsentrert konsistens."
        Oppgave 9c (2023): "Forklar primær-baserte vs. replicated-write protokoller."
        Du MÅ kunne definere og eksemplifisere alle 4 modeller.
      </div>

      {/* Hva du MÅ kunne */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Hva du MÅ kunne</h2>
        <ul className="space-y-1 text-sm list-disc list-inside text-[var(--foreground)]">
          <li>Definisjonen av alle 4 modeller (strict, sequential, causal, eventual)</li>
          <li>Styrkeorden: strict &gt; sequential &gt; causal &gt; eventual</li>
          <li>Hva som er lovlig og ulovlig under hver modell</li>
          <li>Konkrete eksempler og bruksområder for hver modell</li>
          <li>Hvorfor strict consistency er umulig i distribuerte systemer</li>
          <li>Hva "kausalitet" betyr i denne konteksten</li>
        </ul>
      </div>

      {/* Styrke-spekter */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Styrkeorden for konsistensmodeller</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {models.map((m, i) => (
            <div key={m} className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${modelInfo[m].lightBg} ${modelInfo[m].color} border ${modelInfo[m].border}`}>
                {modelInfo[m].name.split(" ")[0]}
              </div>
              {i < models.length - 1 && (
                <span className="text-[var(--muted)] font-bold">&gt;</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-0">
          <div className="h-2 flex-1 rounded-l-full bg-gradient-to-r from-purple-500 via-blue-500 via-teal-500 to-green-500" />
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)]">
          <span>Sterkere garanti, høyere kostnad</span>
          <span>Svakere garanti, lavere kostnad</span>
        </div>
      </section>

      {/* Interaktiv modell-utforsker */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Utforsk konsistensmodellene</h2>

        {/* Modelltabs */}
        <div className="flex gap-2 flex-wrap">
          {models.map((m) => (
            <button
              key={m}
              onClick={() => { setActiveModel(m); setShowScenario("legal"); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                activeModel === m
                  ? `${modelInfo[m].lightBg} ${modelInfo[m].color} ${modelInfo[m].border}`
                  : "border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {modelInfo[m].name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Modelldetaljer */}
        <div className={`rounded-xl border-2 ${info.border} ${info.lightBg} p-6 space-y-4`}>
          <div>
            <h3 className={`text-lg font-bold ${info.color}`}>{info.name}</h3>
            <p className="text-xs text-[var(--muted)] italic">{info.tagline}</p>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Definisjon</span>
              <p className="text-sm text-[var(--foreground)] mt-1 leading-relaxed">{info.definition}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Intuisjon</span>
              <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">{info.intuition}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Lovlig eksempel</p>
              <p className="text-xs text-[var(--muted)]">{info.legal}</p>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Ulovlig eksempel</p>
              <p className="text-xs text-[var(--muted)]">{info.illegal}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Fordeler</p>
              <ul className="text-xs text-[var(--muted)] space-y-0.5 list-disc list-inside">
                {info.pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Ulemper</p>
              <ul className="text-xs text-[var(--muted)] space-y-0.5 list-disc list-inside">
                {info.cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--muted)] mb-1">Brukes av</p>
            <div className="flex flex-wrap gap-2">
              {info.examples.map((ex, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-xs bg-white/60 dark:bg-black/30 text-[var(--foreground)] border border-[var(--card-border)]">
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tidslinje-visualisering */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold text-sm">Tidslinje-visualisering</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowScenario("legal")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  showScenario === "legal"
                    ? "bg-green-600 text-white"
                    : "border border-[var(--card-border)] hover:border-green-400"
                }`}
              >
                Lovlig scenario
              </button>
              <button
                onClick={() => setShowScenario("illegal")}
                className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                  showScenario === "illegal"
                    ? "bg-red-600 text-white"
                    : "border border-[var(--card-border)] hover:border-red-400"
                }`}
              >
                {activeModel === "eventual" ? "Grense-scenario" : "Ulovlig scenario"}
              </button>
            </div>
          </div>

          <div className={`text-xs font-semibold mb-3 ${scenario.isLegal ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {scenario.label}
          </div>

          {/* Tidslinje-SVG */}
          <svg viewBox="0 0 520 180" className="w-full">
            {/* Tidsaksen */}
            <line x1="80" y1="165" x2="510" y2="165" stroke="#6b7280" strokeWidth="1"/>
            <text x="80" y="175" fontSize="9" fill="#6b7280">t=0</text>
            {[1,2,3,4,5].map(t => (
              <g key={t}>
                <line x1={80 + t * 80} y1="160" x2={80 + t * 80} y2="170" stroke="#6b7280" strokeWidth="1"/>
                <text x={80 + t * 80} y="175" textAnchor="middle" fontSize="9" fill="#6b7280">t={t}</text>
              </g>
            ))}
            <text x="500" y="175" fontSize="9" fill="#6b7280">tid</text>

            {/* Prosess-labels */}
            {scenario.events.map((ev, i) => (
              <text key={`label-${i}`} x="10" y={25 + i * 35} fontSize="11" fill="currentColor" fontWeight="500">
                {ev.process}
              </text>
            ))}

            {/* Prosess-linjer */}
            {scenario.events.map((ev, i) => (
              <line key={`line-${i}`} x1="75" y1={20 + i * 35} x2="510" y2={20 + i * 35} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,2"/>
            ))}

            {/* Events */}
            {scenario.events.map((ev, i) => {
              const x = 80 + ev.time * 80;
              const y = 20 + i * 35;
              const color = ev.legal ? (ev.type === "write" ? "#3b82f6" : "#22c55e") : "#ef4444";
              return (
                <g key={`ev-${i}`}>
                  <circle cx={x} cy={y} r="5" fill={color}/>
                  <text x={x + 8} y={y + 4} fontSize="9" fill={color}>{ev.value}</text>
                  {!ev.legal && (
                    <text x={x - 3} y={y - 10} fontSize="12" fill="#ef4444">!</text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className={`mt-3 text-xs p-3 rounded-lg ${scenario.isLegal ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400"}`}>
            {scenario.explanation}
          </div>
        </div>
      </section>

      {/* Sammenligningstabellen */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Sammenligningstabellen</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-3 font-semibold">Modell</th>
                <th className="text-left py-2 pr-3 font-semibold">Styrke</th>
                <th className="text-left py-2 pr-3 font-semibold">Real-time?</th>
                <th className="text-left py-2 pr-3 font-semibold">Global ordre?</th>
                <th className="text-left py-2 pr-3 font-semibold">Concurrent OK?</th>
                <th className="text-left py-2 font-semibold">Eksempel</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                { name: "Strict", color: "text-purple-600 dark:text-purple-400", styrke: "★★★★", realtime: "Ja", global: "Ja", concurrent: "Nei", ex: "Enkelt-prosessor" },
                { name: "Sequential", color: "text-blue-600 dark:text-blue-400", styrke: "★★★", realtime: "Nei", global: "Ja (alle ser likt)", concurrent: "Nei", ex: "Zookeeper, Proj.3" },
                { name: "Causal", color: "text-teal-600 dark:text-teal-400", styrke: "★★", realtime: "Nei", global: "Kun kausal", concurrent: "Ja", ex: "Git, kommentarer" },
                { name: "Eventual", color: "text-green-600 dark:text-green-400", styrke: "★", realtime: "Nei", global: "Nei", concurrent: "Ja", ex: "DNS, Cassandra" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-[var(--card-border)]">
                  <td className={`py-2 pr-3 font-semibold ${row.color}`}>{row.name}</td>
                  <td className="py-2 pr-3">{row.styrke}</td>
                  <td className={`py-2 pr-3 ${row.realtime === "Ja" ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{row.realtime}</td>
                  <td className={`py-2 pr-3 ${row.global.startsWith("Ja") ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{row.global}</td>
                  <td className={`py-2 pr-3 ${row.concurrent === "Ja" ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{row.concurrent}</td>
                  <td className="py-2">{row.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Nøkkelpunkter om Sequential Consistency — viktigst for eksamen */}
      <section className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400">Fordypning: Sequential Consistency (viktigst for eksamen)</h2>
        <p className="text-sm text-[var(--muted)]">
          Sequential consistency er den sterkeste modellen som er <em>praktisk implementerbar</em> i et distribuert system.
          To krav MÅ være oppfylt:
        </p>
        <ol className="text-sm text-[var(--muted)] space-y-2 list-decimal list-inside">
          <li>
            <strong>Programrekkefølge bevares:</strong> Operasjonene til hver enkelt prosess skjer i den rekkefølgen de er spesifisert.
            P1 gjør A deretter B — alle ser A før B fra P1.
          </li>
          <li>
            <strong>Alle prosesser ser den SAMME interleaving:</strong> Selv om to prosesser skriver på omtrent samme tid,
            MÅ alle andre prosesser enes om en global rekkefølge. Det er ikke lov at P3 ser [W1, W2] mens P4 ser [W2, W1].
          </li>
        </ol>
        <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3 text-xs text-[var(--muted)]">
          <strong>Merk:</strong> Sequential consistency sier ingenting om real-time. W(x)=1 kan skje kl. 12:00, men andre prosesser kan
          "se" det kl. 12:05 — det er OK, så lenge alle ser det på <em>samme relative tidspunkt</em> i rekkefølgen.
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5">
        <h2 className="font-semibold text-red-700 dark:text-red-400 mb-3">Vanlige feil</h2>
        <ul className="space-y-2 text-sm text-[var(--muted)] list-disc list-inside">
          <li>Forveksle strict og sequential — strict krever real-time global klokke, sequential gjør ikke det.</li>
          <li>Tro at sequential konsistens betyr at alle skriveoperasjoner er synkrone — nei, men alle ser <em>samme rekkefølge</em>.</li>
          <li>Glemme at kausal konsistens tillater at samtidige (concurrent) operasjoner ses i ulik rekkefølge av ulike prosesser.</li>
          <li>Tro at eventual consistency aldri brukes i produksjon — DNS, Cassandra, DynamoDB bruker det daglig.</li>
          <li>Blande datasentrert og klientsentrert konsistens — se 7.3 for klientsentrert.</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-7/teori/7-1" className="hover:text-[var(--accent)] text-sm">
          ← 7.1 Introduksjon til replikering
        </Link>
        <Link href="/dat110/ds-7/teori/7-3" className="hover:text-[var(--accent)] text-sm">
          7.3 Klient-sentrerte konsistensmodeller →
        </Link>
      </div>
    </div>
  );
}
