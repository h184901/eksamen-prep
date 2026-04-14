"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

type MutexAlgo = "sentralisert" | "distribuert" | "token" | "desentralisert";

export default function DS5_3Page() {
  const [activeAlgo, setActiveAlgo] = useState<MutexAlgo>("sentralisert");
  const [raStep, setRaStep] = useState(0);
  const [showRaSolution, setShowRaSolution] = useState(false);

  // Ricart-Agrawala steg-for-steg eksempel
  // 3 prosesser, P1 og P2 ønsker CR samtidig, P3 ønsker ikke
  const raSteps = [
    {
      title: "Starttilstand",
      desc: "P1, P2, P3 kjører. P1 (ts=1) og P2 (ts=2) vil inn i kritisk region (CR).",
      detail: "P1 og P2 sender REQUEST til alle andre. P3 vil ikke inn i CR.",
    },
    {
      title: "P1 sender REQUEST(ts=1) til P2 og P3",
      desc: "P1 multicast-sender REQUEST med Lamport-tidsstempel 1 til alle andre prosesser.",
      detail: "P1 setter egne klokke til 1 og sender. P2 og P3 mottar forespørselen.",
    },
    {
      title: "P2 sender REQUEST(ts=2) til P1 og P3",
      desc: "P2 multicast-sender REQUEST med tidsstempel 2 til alle.",
      detail: "P2 setter sin klokke til 2. P1 og P3 mottar P2 sin forespørsel.",
    },
    {
      title: "P3 svarer OK til begge",
      desc: "P3 vil ikke inn i CR, sender umiddelbart OK til P1 og P2.",
      detail: "P3 er ikke interessert → sender alltid OK umiddelbart.",
    },
    {
      title: "P1 mottar P2 sin REQUEST — hva gjør P1?",
      desc: "P1 er i CR? Nei. P1 har sendt REQUEST med ts=1 < P2 sin ts=2.",
      detail: "Regel: P1 sin ts (1) < P2 sin ts (2) → P1 venter IKKE. P1 sender OK til P2.",
    },
    {
      title: "P2 mottar P1 sin REQUEST — hva gjør P2?",
      desc: "P2 har sendt REQUEST med ts=2 > P1 sin ts=1.",
      detail: "Regel: P2 sin ts (2) > P1 sin ts (1) → P2 venter. P2 utsetter OK til P1.",
    },
    {
      title: "P1 har mottatt OK fra P3 og P2",
      desc: "P1 har N-1 = 2 OK-er. P1 kan nå gå inn i kritisk region!",
      detail: "P1 er i CR. P2 venter fremdeles.",
    },
    {
      title: "P1 forlater CR — sender OK til P2",
      desc: "P1 er ferdig i CR. Sender den utsatte OK til P2.",
      detail: "P2 har nå OK fra P1 og P3 (N-1=2 OK). P2 går inn i CR.",
    },
    {
      title: "P2 går inn i CR",
      desc: "P2 har mottatt alle N-1 OK. P2 er nå i kritisk region.",
      detail: "Meldingskompleksitet totalt: 2(N-1) = 4 meldinger per prosess som vil inn.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-5/teori" className="hover:text-[var(--accent)]">
          ← Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">5.3 Gjensidig utelukkelse</span>
      </div>

      <h1 className="text-2xl font-bold">5.3 Gjensidig utelukkelse (Mutex)</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Hvordan sikre at maksimalt én prosess er i kritisk region om gangen —
        uten delt minne, kun meldingsutveksling. Ricart-Agrawala er den sentrale algoritmen.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
          Eksamenstips (Oppgave 1 og 7)
        </p>
        <p className="text-amber-900 dark:text-amber-200">
          Mai-2024 oppgave 1f: «Which mutual exclusion algorithm requires 2(N-1) messages?»
          (Svar: Distribuert / Ricart-Agrawala). Mai-2022 oppgave 1h: samme spørsmål.
          Du MÅ kjenne meldingskompleksiteten til alle fire algoritmer og kunne forklare Ricart-Agrawala.
        </p>
      </div>

      {/* ===== 1. PROBLEMET ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Problemet: Kritisk region i DS
        </h2>
        <p className="text-sm leading-relaxed">
          Tenk deg N prosesser som alle kan ønske å oppdatere en felles databaseoppføring.
          Uten koordinering vil to prosesser overlappe og ødelegge dataene. Vi trenger
          <strong> gjensidig utelukkelse</strong>.
        </p>

        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-3 text-sm">
          <p className="font-semibold text-blue-700 dark:text-blue-300">
            Tre krav til en korrekt mutex-algoritme:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Safety (sikkerhet):</strong> Maks én prosess er i kritisk region
              (CR) om gangen. Aldri to samtidig.
            </li>
            <li>
              <strong>Liveness (levenhet):</strong> Alle prosesser som ønsker å gå inn i CR
              vil til slutt lykkes. Ingen starvation (sulting).
            </li>
            <li>
              <strong>Ordering (ordning):</strong> Forespørsler betjenes i FIFO-rekkefølge
              — den som spurte først, kommer inn først.
            </li>
          </ol>
        </div>
      </section>

      {/* ===== 2. FIRE ALGORITMER ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Fire mutex-algoritmer
        </h2>

        {/* Velg algoritme */}
        <div className="flex gap-2 flex-wrap">
          {(["sentralisert", "distribuert", "token", "desentralisert"] as MutexAlgo[]).map(algo => (
            <button
              key={algo}
              onClick={() => setActiveAlgo(algo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeAlgo === algo
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {algo === "sentralisert" ? "Sentralisert"
               : algo === "distribuert" ? "Distribuert (R-A)"
               : algo === "token" ? "Token-ring"
               : "Desentralisert"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">

          {/* SENTRALISERT */}
          {activeAlgo === "sentralisert" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Sentralisert løsning — koordinator
              </h3>
              <p className="text-sm">
                En dedikert <strong>koordinator</strong> (prosess) styrer tilgangen til CR.
                Alle andre sender REQUEST til koordinatoren, venter på GRANT, og sender
                RELEASE når de er ferdige.
              </p>

              {/* SVG: sentralisert */}
              <div className="overflow-x-auto">
                <svg viewBox="0 0 500 200" className="w-full max-w-lg">
                  <defs>
                    <marker id="c-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
                    </marker>
                  </defs>
                  {/* Koordinator */}
                  <rect x="190" y="10" width="120" height="40" rx="6" fill="#3b82f6" opacity="0.9"/>
                  <text x="250" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Koordinator</text>

                  {/* P1, P2, P3 */}
                  {[["P1",60,140],["P2",200,140],["P3",340,140]].map(([label, x, y]) => (
                    <g key={String(label)}>
                      <rect x={Number(x)} y={Number(y)} width="80" height="35" rx="5"
                        fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
                      <text x={Number(x)+40} y={Number(y)+22} textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
                        {label}
                      </text>
                    </g>
                  ))}

                  {/* Piler */}
                  <line x1="100" y1="140" x2="220" y2="52" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#c-arrow)"/>
                  <text x="140" y="90" fontSize="9" fill="#dc2626">REQUEST</text>
                  <line x1="230" y1="52" x2="120" y2="140" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#c-arrow)"/>
                  <text x="160" y="110" fontSize="9" fill="#16a34a">GRANT</text>
                  <line x1="130" y1="140" x2="225" y2="52" stroke="#6b7280" strokeWidth="1" strokeDasharray="3" markerEnd="url(#c-arrow)"/>
                  <text x="170" y="75" fontSize="9" fill="#6b7280">RELEASE</text>
                </svg>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                  <p className="font-bold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Enkel å implementere</li>
                    <li>Fair (FIFO-kø hos koordinator)</li>
                    <li>Kun 3 meldinger per inngang (REQUEST + GRANT + RELEASE)</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="font-bold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Single point of failure — koordinatoren krasjer = system stopper</li>
                    <li>Koordinator kan bli flaskehals (performance)</li>
                    <li>Kan ikke skille «koordinator krasjet» fra «koordinator opptatt»</li>
                  </ul>
                </div>
              </div>
              <div className="rounded bg-blue-50 dark:bg-blue-900/20 p-3 text-sm">
                <p>
                  <strong>Meldingskompleksitet:</strong> 3 meldinger per CR-inngang
                  (REQUEST → GRANT → RELEASE)
                </p>
              </div>
            </div>
          )}

          {/* DISTRIBUERT (Ricart-Agrawala) */}
          {activeAlgo === "distribuert" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Distribuert løsning — Ricart-Agrawala-algoritmen
              </h3>
              <p className="text-sm">
                Ingen koordinator! En prosess som vil inn i CR sender{" "}
                <strong>REQUEST til alle andre</strong> med et Lamport-tidsstempel.
                Prosessen venter til den har fått <strong>OK fra alle</strong>.
              </p>

              <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm space-y-2">
                <p className="font-bold text-blue-700 dark:text-blue-300">
                  Regler for å svare på REQUEST(ts, prosess_j):
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Ikke interessert i CR:</strong> Send OK umiddelbart.
                  </li>
                  <li>
                    <strong>Er i CR:</strong> Utsett OK til du forlater CR.
                  </li>
                  <li>
                    <strong>Vil inn i CR (ventemodus):</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Hvis din ts {"<"} ts_j (du spurte først): Send OK til j.</li>
                      <li>Hvis din ts {">"} ts_j (j spurte først): Utsett OK til du forlater CR.</li>
                      <li>Hvis ts like: bruk prosess-ID som tiebreaker (lavest ID vinner).</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <FormulaBox
                variant="blue"
                title="Meldingskompleksitet — Ricart-Agrawala"
                latex="2(N-1) \text{ meldinger per CR-inngang}"
                description="(N-1) REQUEST-er ut + (N-1) OK-er tilbake = 2(N-1). For N=5: 8 meldinger."
              />

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                  <p className="font-bold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Ingen single point of failure</li>
                    <li>Fair (ts-basert FIFO-ordning)</li>
                    <li>Distribuert — ingen koordinator nødvendig</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="font-bold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>2(N-1) meldinger — mye trafikk ved stort N</li>
                    <li>Én krasjet prosess blokkerer alle andre</li>
                    <li>Alle prosesser må delta aktivt</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TOKEN-RING */}
          {activeAlgo === "token" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Token-ring løsning
              </h3>
              <p className="text-sm">
                Prosessene er logisk organisert i en ring. Et <strong>token</strong> sendes
                rundt ringen kontinuerlig. Kun prosessen som holder token kan gå inn i CR.
              </p>

              {/* SVG: token ring */}
              <div className="overflow-x-auto">
                <svg viewBox="0 0 300 220" className="w-full max-w-xs mx-auto">
                  <defs>
                    <marker id="tr-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
                    </marker>
                  </defs>
                  {/* Ring-forbindelser */}
                  <circle cx="150" cy="110" r="70" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6"/>
                  {/* Prosesser på ringen */}
                  {[
                    ["P1", 150, 40],
                    ["P2", 220, 145],
                    ["P3", 110, 180],
                    ["P4", 80,  145],
                  ].map(([label, x, y]) => (
                    <g key={String(label)}>
                      <circle cx={Number(x)} cy={Number(y)} r="22" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                      <text x={Number(x)} y={Number(y)+4} textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
                        {label}
                      </text>
                    </g>
                  ))}
                  {/* Token (hos P1) */}
                  <rect x="155" y="12" width="40" height="18" rx="4" fill="#f59e0b" opacity="0.9"/>
                  <text x="175" y="25" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TOKEN</text>
                  {/* Pil-retning */}
                  <text x="150" y="115" textAnchor="middle" fill="#6b7280" fontSize="10">→ ring-retning</text>
                </svg>
              </div>

              <div className="text-sm space-y-2">
                <p>
                  <strong>Prosedyre:</strong> Når en prosess mottar token og ønsker CR:
                  hold token, gå inn i CR, forlat CR, send token videre.
                  Ønsker den ikke CR: videresend token umiddelbart.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                  <p className="font-bold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Enkelt å forstå og implementere</li>
                    <li>Ingen starvation — alle får token etter N-1 passes</li>
                    <li>Lav overhead når prosesser sjelden trenger CR</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="font-bold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Tap av token: vanskelig å oppdage, system stopper</li>
                    <li>Krasj av prosess: bryter ringen, krever rekonstruksjon</li>
                    <li>Token sirkulerer selv om ingen trenger CR (overhead)</li>
                  </ul>
                </div>
              </div>
              <div className="rounded bg-blue-50 dark:bg-blue-900/20 p-3 text-sm">
                <p>
                  <strong>Meldingskompleksitet:</strong> Varierer — 0 til N meldinger for å
                  nå CR (avhenger av token-posisjon).
                </p>
              </div>
            </div>
          )}

          {/* DESENTRALISERT */}
          {activeAlgo === "desentralisert" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Desentralisert løsning — Majority-quorum (stemmegivning)
              </h3>
              <p className="text-sm">
                I stedet for en koordinator brukes <strong>flertallsstemming</strong> (majority voting).
                En prosess ber om tillatelse fra et quorum (flertall) av koordinatorer.
                Brukes i systemer der koordinatorer repliseres for feiltoleranse.
              </p>

              <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm space-y-2">
                <p className="font-bold text-blue-700 dark:text-blue-300">Prinsipp:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Systemet har m koordinatorer. Prosessen sender REQUEST til alle m.
                  </li>
                  <li>
                    Prosessen venter til den har mottatt OK fra{" "}
                    <InlineLatex latex="\lfloor m/2 \rfloor + 1" /> koordinatorer (flertall).
                  </li>
                  <li>
                    Koordinatorene holder styr på hvem de har «stemt for» — de kan
                    trekke tilbake sin stemme og gi den til en annen med lavere ts.
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                  <p className="font-bold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Tåler feil hos koordinatorer (trenger bare flertall)</li>
                    <li>God feiltoleranse</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="font-bold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Kan lede til deadlock (hvis to prosesser har hvert sitt halvflertall)</li>
                    <li>Kompleks å implementere korrekt</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== 3. RICART-AGRAWALA STEG-FOR-STEG ===== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Ricart-Agrawala — steg-for-steg eksempel
        </h2>
        <p className="text-sm text-[var(--muted)]">
          3 prosesser. P1 (ts=1) og P2 (ts=2) vil inn i CR samtidig. P3 er uinteressert.
        </p>

        <div className="rounded-xl border border-blue-300 dark:border-blue-700 bg-[var(--card)] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">
              Steg {raStep + 1}/{raSteps.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setRaStep(Math.max(0, raStep - 1))}
                disabled={raStep === 0}
                className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] disabled:opacity-40 hover:border-blue-400"
              >
                ← Forrige
              </button>
              <button
                onClick={() => setRaStep(Math.min(raSteps.length - 1, raStep + 1))}
                disabled={raStep === raSteps.length - 1}
                className="px-3 py-1.5 rounded text-xs bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700"
              >
                Neste →
              </button>
              <button
                onClick={() => setRaStep(0)}
                className="px-3 py-1.5 rounded text-xs bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 space-y-2">
            <p className="font-bold text-blue-700 dark:text-blue-300">
              {raSteps[raStep].title}
            </p>
            <p className="text-sm">{raSteps[raStep].desc}</p>
            <p className="text-sm text-[var(--muted)]">{raSteps[raStep].detail}</p>
          </div>

          {/* Tilstandsindikator */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            {["P1 (ts=1)", "P2 (ts=2)", "P3"].map((p, i) => {
              let color = "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
              let status = "Normal";
              if (raStep >= 6 && raStep <= 7 && i === 0) { color = "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"; status = "I CR"; }
              if (raStep >= 8 && i === 1) { color = "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"; status = "I CR"; }
              if (raStep >= 2 && raStep < 6 && i === 1) { color = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"; status = "Venter"; }
              if (raStep >= 5 && raStep < 8 && i === 1) { color = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"; status = "Venter (utsatt OK)"; }
              return (
                <div key={p} className={`rounded-lg p-2 text-center border ${color}`}>
                  <p className="font-bold">{p}</p>
                  <p>{status}</p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setShowRaSolution(!showRaSolution)}
          className="text-sm text-blue-600 dark:text-blue-400 underline"
        >
          {showRaSolution ? "Skjul reglene" : "Vis reglene for svar på REQUEST"}
        </button>

        {showRaSolution && (
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm space-y-2">
            <p className="font-bold text-blue-700 dark:text-blue-300">
              Algoritme: Prosess Pᵢ mottar REQUEST(ts_j, j) fra Pⱼ:
            </p>
            <div className="font-mono text-xs bg-white dark:bg-slate-900 p-3 rounded space-y-1">
              <p>if (Pᵢ er i CR) {"{"}  utsett OK til CR forlates  {"}"}</p>
              <p>else if (Pᵢ vil ikke inn i CR) {"{"}  send OK umiddelbart  {"}"}</p>
              <p>else if (Pᵢ har sendt REQUEST) {"{"}</p>
              <p>  if (ts_i {"<"} ts_j) {"{"} send OK umiddelbart {"}"}</p>
              <p>  else if (ts_i {">"} ts_j) {"{"} utsett OK {"}"}</p>
              <p>  else {"{"} bruk prosess-ID som tiebreaker {"}"}</p>
              <p>{"}"}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== 4. SAMMENLIGNINGSTABELLEN ===== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Sammenligningstabellen — viktigste eksamenstoff
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Denne tabellen er svaret på eksamensspørsmål som «Which algorithm requires 2(N-1) messages?»
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30">
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Algoritme</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Meldinger (inngang)</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Forsinkelse</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">SPOF?</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700 dark:text-blue-300">Starvation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {[
                ["Sentralisert", "3", "2 rtt", "Ja (koordinator)", "Nei"],
                ["Distribuert (R-A)", "2(N-1)", "2(N-1) meldinger", "Nei", "Nei"],
                ["Token-ring", "0–N", "0–N passes", "Nei*", "Nei"],
                ["Desentralisert (voting)", "3m", "Varierer", "Nei", "Mulig"],
              ].map(([algo, msg, delay, spof, starv], i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-blue-50/20 dark:bg-blue-900/10"}>
                  <td className="px-4 py-2 font-medium">{algo}</td>
                  <td className={`px-4 py-2 font-mono ${i === 1 ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}>{msg}</td>
                  <td className="px-4 py-2">{delay}</td>
                  <td className={`px-4 py-2 ${spof === "Ja (koordinator)" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{spof}</td>
                  <td className={`px-4 py-2 ${starv === "Mulig" ? "text-amber-600 dark:text-amber-400" : ""}`}>{starv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--muted)]">
          * Token-ring har ikke SPOF i klassisk form, men tap av token stopper systemet.
          rtt = round-trip time. m = antall koordinatorer i desentralisert.
        </p>
      </section>

      {/* ===== 5. HVA DU MÅ KUNNE ===== */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">
          Hva du MÅ kunne til eksamen
        </h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>De tre kravene til mutex: safety, liveness, ordering</li>
          <li>Sentralisert: 3 meldinger, SPOF, enkel implementasjon</li>
          <li>Ricart-Agrawala: 2(N-1) meldinger, ingen SPOF, Lamport-ts for prioritering</li>
          <li>Token-ring: ingen starvation, risiko for tap av token</li>
          <li>Desentralisert: majority quorum, feiltoleranse men mulig deadlock</li>
          <li>Hvilken algoritme som bruker 2(N-1) meldinger: Distribuert (Ricart-Agrawala)</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>
            <strong>Feil:</strong> «Sentralisert bruker 2(N-1) meldinger» — NEI, det er
            Ricart-Agrawala (distribuert).
          </li>
          <li>
            <strong>Feil:</strong> Glemme at prosessen som har sendt REQUEST (og ts er lavest)
            sender OK umiddelbart — ikke venter.
          </li>
          <li>
            <strong>Feil:</strong> Anta at token-ring aldri kan ha problemer med starvation —
            tap av token er det faktiske problemet.
          </li>
          <li>
            <strong>Feil:</strong> Tro at «desentralisert» er det samme som «distribuert» —
            de er forskjellige algoritmer.
          </li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-5/teori/5-2" className="hover:text-[var(--accent)] text-sm">
          ← 5.2 Logiske klokker
        </Link>
        <Link href="/dat110/ds-5/teori/5-4" className="hover:text-[var(--accent)] text-sm">
          5.4 Ledervalg →
        </Link>
      </div>
    </div>
  );
}
