"use client";

import Link from "next/link";
import { useState } from "react";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import TheorySummary from "@/components/TheorySummary";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

/* =====================================================================
   Inline SVG-komponenter — pedagogiske diagrammer
   ===================================================================== */

/** Klasse vs Objekt: én klasse → flere objekter (instanser) */
function KlasseVsObjektDiagram() {
  return (
    <div className="my-4 rounded-xl border border-[var(--card-border)] bg-white dark:bg-neutral-900/60 p-4 overflow-x-auto">
      <svg
        viewBox="0 0 720 320"
        className="w-full h-auto max-w-3xl mx-auto"
        role="img"
        aria-label="Klasse Spiller med tre objekt-instanser"
      >
        {/* Klasse-boks (mal) */}
        <g>
          <rect
            x="40"
            y="40"
            width="220"
            height="170"
            rx="8"
            fill="#ecfdf5"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <rect
            x="40"
            y="40"
            width="220"
            height="32"
            rx="8"
            fill="#16a34a"
          />
          <text
            x="150"
            y="61"
            textAnchor="middle"
            fill="white"
            fontSize="15"
            fontWeight="bold"
          >
            Spiller (klasse — malen)
          </text>
          <line x1="40" y1="105" x2="260" y2="105" stroke="#16a34a" />
          <text x="55" y="92" fontSize="12" fill="#065f46">
            - navn : String
          </text>
          <text x="55" y="125" fontSize="12" fill="#065f46">
            - poeng : int
          </text>
          <line x1="40" y1="145" x2="260" y2="145" stroke="#16a34a" />
          <text x="55" y="165" fontSize="12" fill="#065f46">
            + flyttBrikke(antall : int)
          </text>
          <text x="55" y="185" fontSize="12" fill="#065f46">
            + leggTilPoeng(p : int)
          </text>
          <text x="55" y="205" fontSize="12" fill="#065f46">
            + getNavn() : String
          </text>
        </g>

        {/* Pil */}
        <defs>
          <marker
            id="arrowGreen"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#16a34a" />
          </marker>
        </defs>
        <line
          x1="270"
          y1="125"
          x2="350"
          y2="125"
          stroke="#16a34a"
          strokeWidth="2"
          markerEnd="url(#arrowGreen)"
        />
        <text x="280" y="115" fontSize="11" fill="#065f46" fontStyle="italic">
          new Spiller(...)
        </text>

        {/* Tre objekter (instanser) */}
        <g>
          <rect
            x="370"
            y="40"
            width="160"
            height="80"
            rx="8"
            fill="#fffbeb"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text
            x="450"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fontWeight="bold"
            fill="#7c2d12"
          >
            erlend : Spiller
          </text>
          <line x1="370" y1="72" x2="530" y2="72" stroke="#d97706" />
          <text x="385" y="92" fontSize="11" fill="#7c2d12">
            navn = &quot;Erlend&quot;
          </text>
          <text x="385" y="108" fontSize="11" fill="#7c2d12">
            poeng = 1500
          </text>
        </g>
        <g>
          <rect
            x="370"
            y="135"
            width="160"
            height="80"
            rx="8"
            fill="#fffbeb"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text
            x="450"
            y="157"
            textAnchor="middle"
            fontSize="13"
            fontWeight="bold"
            fill="#7c2d12"
          >
            atle : Spiller
          </text>
          <line x1="370" y1="167" x2="530" y2="167" stroke="#d97706" />
          <text x="385" y="187" fontSize="11" fill="#7c2d12">
            navn = &quot;Atle&quot;
          </text>
          <text x="385" y="203" fontSize="11" fill="#7c2d12">
            poeng = 200
          </text>
        </g>
        <g>
          <rect
            x="370"
            y="230"
            width="160"
            height="80"
            rx="8"
            fill="#fffbeb"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text
            x="450"
            y="252"
            textAnchor="middle"
            fontSize="13"
            fontWeight="bold"
            fill="#7c2d12"
          >
            kari : Spiller
          </text>
          <line x1="370" y1="262" x2="530" y2="262" stroke="#d97706" />
          <text x="385" y="282" fontSize="11" fill="#7c2d12">
            navn = &quot;Kari&quot;
          </text>
          <text x="385" y="298" fontSize="11" fill="#7c2d12">
            poeng = 0
          </text>
        </g>

        {/* Forklaring */}
        <text
          x="600"
          y="80"
          fontSize="11"
          fill="#525252"
          fontStyle="italic"
        >
          tre objekt-
        </text>
        <text
          x="600"
          y="95"
          fontSize="11"
          fill="#525252"
          fontStyle="italic"
        >
          instanser
        </text>
        <text
          x="600"
          y="110"
          fontSize="11"
          fill="#525252"
          fontStyle="italic"
        >
          av samme
        </text>
        <text
          x="600"
          y="125"
          fontSize="11"
          fill="#525252"
          fontStyle="italic"
        >
          klasse
        </text>

        <text x="40" y="240" fontSize="11" fill="#525252" fontStyle="italic">
          ETT sett med definisjoner
        </text>
        <text x="40" y="256" fontSize="11" fill="#525252" fontStyle="italic">
          (felt, metoder, regler)
        </text>
        <text x="40" y="272" fontSize="11" fill="#525252" fontStyle="italic">
          delt av alle objekter.
        </text>
        <text x="40" y="294" fontSize="11" fill="#525252" fontStyle="italic">
          Hvert objekt har sine
        </text>
        <text x="40" y="310" fontSize="11" fill="#525252" fontStyle="italic">
          egne verdier i feltene.
        </text>
      </svg>
    </div>
  );
}

/** State / Behaviour / Identity — tre søyler */
function StateBehaviourIdentityDiagram() {
  return (
    <div className="my-4 rounded-xl border border-[var(--card-border)] bg-white dark:bg-neutral-900/60 p-4 overflow-x-auto">
      <svg
        viewBox="0 0 720 240"
        className="w-full h-auto max-w-3xl mx-auto"
        role="img"
        aria-label="State, behaviour og identity for et objekt"
      >
        {/* Hovedboks: objektet */}
        <rect
          x="280"
          y="20"
          width="160"
          height="50"
          rx="6"
          fill="#a855f7"
          opacity="0.9"
        />
        <text
          x="360"
          y="50"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          erlend : Spiller
        </text>

        {/* Tre søyler */}
        {/* STATE */}
        <line x1="320" y1="70" x2="120" y2="110" stroke="#a855f7" strokeWidth="1.5" />
        <rect
          x="40"
          y="110"
          width="180"
          height="110"
          rx="8"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="130" y="135" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
          State (tilstand)
        </text>
        <text x="130" y="155" textAnchor="middle" fontSize="11" fill="#1e3a8a">
          Verdiene i feltene akkurat nå
        </text>
        <text x="55" y="180" fontSize="11" fill="#1e3a8a" fontFamily="monospace">
          navn = &quot;Erlend&quot;
        </text>
        <text x="55" y="198" fontSize="11" fill="#1e3a8a" fontFamily="monospace">
          poeng = 1500
        </text>
        <text x="55" y="214" fontSize="11" fill="#1e3a8a" fontFamily="monospace">
          rute = 7
        </text>

        {/* BEHAVIOUR */}
        <line x1="360" y1="70" x2="360" y2="110" stroke="#a855f7" strokeWidth="1.5" />
        <rect
          x="270"
          y="110"
          width="180"
          height="110"
          rx="8"
          fill="#dcfce7"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <text x="360" y="135" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">
          Behaviour (oppførsel)
        </text>
        <text x="360" y="155" textAnchor="middle" fontSize="11" fill="#14532d">
          Hva objektet KAN gjøre
        </text>
        <text x="285" y="180" fontSize="11" fill="#14532d" fontFamily="monospace">
          flyttBrikke(int)
        </text>
        <text x="285" y="198" fontSize="11" fill="#14532d" fontFamily="monospace">
          leggTilPoeng(int)
        </text>
        <text x="285" y="214" fontSize="11" fill="#14532d" fontFamily="monospace">
          getNavn()
        </text>

        {/* IDENTITY */}
        <line x1="400" y1="70" x2="600" y2="110" stroke="#a855f7" strokeWidth="1.5" />
        <rect
          x="500"
          y="110"
          width="180"
          height="110"
          rx="8"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="2"
        />
        <text x="590" y="135" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c2d12">
          Identity (identitet)
        </text>
        <text x="590" y="155" textAnchor="middle" fontSize="11" fill="#7c2d12">
          Unik adresse i minnet
        </text>
        <text x="515" y="180" fontSize="11" fill="#7c2d12" fontFamily="monospace">
          @0x7ffe9b40
        </text>
        <text x="515" y="200" fontSize="10" fill="#7c2d12" fontStyle="italic">
          To objekter med
        </text>
        <text x="515" y="214" fontSize="10" fill="#7c2d12" fontStyle="italic">
          samme verdier =
        </text>
        <text x="515" y="228" fontSize="10" fill="#7c2d12" fontStyle="italic">
          ulik identitet
        </text>
      </svg>
    </div>
  );
}

/** De 7 OO-egenskapene — sirkulært tankekart */
function SyvOOEgenskaperDiagram() {
  const labels = [
    { name: "Abstraksjon", color: "#7c3aed", short: "Forenkle" },
    { name: "Innkapsling", color: "#2563eb", short: "Skjul detaljer" },
    { name: "Modularitet", color: "#0891b2", short: "Del opp" },
    { name: "Hierarki", color: "#16a34a", short: "Klassifiser" },
    { name: "Typing", color: "#ca8a04", short: "Sjekk typer" },
    { name: "Samtidighet", color: "#dc2626", short: "Parallelt" },
    { name: "Persistens", color: "#db2777", short: "Lagre data" },
  ];
  const cx = 280;
  const cy = 220;
  const r = 165;

  return (
    <div className="my-4 rounded-xl border border-[var(--card-border)] bg-white dark:bg-neutral-900/60 p-4 overflow-x-auto">
      <svg
        viewBox="0 0 560 460"
        className="w-full h-auto max-w-2xl mx-auto"
        role="img"
        aria-label="Grady Boochs syv OO-egenskaper"
      >
        {/* Senter */}
        <circle cx={cx} cy={cy} r="64" fill="#a855f7" />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          7 OO-
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          egenskaper
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="white" fontSize="10">
          (Booch)
        </text>

        {labels.map((l, i) => {
          const angle = (i / labels.length) * 2 * Math.PI - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <g key={l.name}>
              <line
                x1={cx + 64 * Math.cos(angle)}
                y1={cy + 64 * Math.sin(angle)}
                x2={x - 50 * Math.cos(angle)}
                y2={y - 28 * Math.sin(angle)}
                stroke={l.color}
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <rect
                x={x - 70}
                y={y - 24}
                width="140"
                height="48"
                rx="8"
                fill={l.color}
              />
              <text
                x={x}
                y={y - 4}
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="bold"
              >
                {i + 1}. {l.name}
              </text>
              <text
                x={x}
                y={y + 14}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                opacity="0.85"
              >
                {l.short}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Abstraksjon vs Innkapsling — to perspektiver */
function AbstraksjonVsInnkapslingDiagram() {
  return (
    <div className="my-4 rounded-xl border border-[var(--card-border)] bg-white dark:bg-neutral-900/60 p-4 overflow-x-auto">
      <svg
        viewBox="0 0 720 260"
        className="w-full h-auto max-w-3xl mx-auto"
        role="img"
        aria-label="Abstraksjon (utenfra) vs innkapsling (innenfra)"
      >
        {/* Bilkjøring som metafor */}
        <rect
          x="20"
          y="20"
          width="320"
          height="220"
          rx="12"
          fill="#ede9fe"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        <text x="180" y="48" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">
          ABSTRAKSJON
        </text>
        <text x="180" y="66" textAnchor="middle" fontSize="11" fill="#5b21b6" fontStyle="italic">
          Hva objektet GJØR (utsiden)
        </text>
        <text x="40" y="100" fontSize="12" fill="#3b0764">
          Sjåføren ser kun:
        </text>
        <text x="60" y="122" fontSize="12" fill="#3b0764">
          • Ratt
        </text>
        <text x="60" y="142" fontSize="12" fill="#3b0764">
          • Pedaler
        </text>
        <text x="60" y="162" fontSize="12" fill="#3b0764">
          • Speedometer
        </text>
        <text x="40" y="195" fontSize="11" fill="#3b0764" fontStyle="italic">
          Designerens spørsmål:
        </text>
        <text x="40" y="212" fontSize="11" fill="#3b0764" fontStyle="italic">
          &quot;Hva trenger brukeren?&quot;
        </text>
        <text x="40" y="228" fontSize="10" fill="#3b0764">
          → public-grensesnittet
        </text>

        {/* Pil */}
        <text x="350" y="135" fontSize="22" fill="#525252">
          vs
        </text>

        {/* Innkapsling */}
        <rect
          x="380"
          y="20"
          width="320"
          height="220"
          rx="12"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="540" y="48" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
          INNKAPSLING
        </text>
        <text x="540" y="66" textAnchor="middle" fontSize="11" fill="#1e3a8a" fontStyle="italic">
          Hvordan det er SKJULT (innsiden)
        </text>
        <text x="400" y="100" fontSize="12" fill="#172554">
          Skjult bak panseret:
        </text>
        <text x="420" y="122" fontSize="12" fill="#172554">
          • Forbrenningsmotor
        </text>
        <text x="420" y="142" fontSize="12" fill="#172554">
          • Drivstoffsystem
        </text>
        <text x="420" y="162" fontSize="12" fill="#172554">
          • Girkasse
        </text>
        <text x="400" y="195" fontSize="11" fill="#172554" fontStyle="italic">
          Implementerers spørsmål:
        </text>
        <text x="400" y="212" fontSize="11" fill="#172554" fontStyle="italic">
          &quot;Hvordan skjuler jeg dette?&quot;
        </text>
        <text x="400" y="228" fontSize="10" fill="#172554">
          → private felt + getter/setter
        </text>
      </svg>
    </div>
  );
}

/* =====================================================================
   Inline kvadratet for kodeblokker
   ===================================================================== */

function CodeBlock({
  label,
  variant = "neutral",
  children,
}: {
  label?: string;
  variant?: "neutral" | "good" | "bad";
  children: string;
}) {
  const styles =
    variant === "good"
      ? "border-green-400 dark:border-green-600 bg-green-50/40 dark:bg-green-950/20"
      : variant === "bad"
        ? "border-red-400 dark:border-red-600 bg-red-50/40 dark:bg-red-950/20"
        : "border-neutral-200 dark:border-neutral-700 bg-neutral-50/40 dark:bg-neutral-900/40";
  const labelColor =
    variant === "good"
      ? "text-green-700 dark:text-green-400"
      : variant === "bad"
        ? "text-red-700 dark:text-red-400"
        : "text-neutral-600 dark:text-neutral-300";
  const icon = variant === "good" ? "✓" : variant === "bad" ? "✗" : "▸";
  return (
    <div className={`my-3 rounded-lg border-2 ${styles} p-3`}>
      {label && (
        <div className={`mb-2 text-xs font-bold uppercase tracking-wide ${labelColor}`}>
          {icon} {label}
        </div>
      )}
      <pre className="overflow-x-auto rounded-md bg-neutral-900 p-3 text-[12.5px] leading-relaxed text-neutral-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* =====================================================================
   Sitat-boks
   ===================================================================== */

function Sitat({ kilde, children }: { kilde: string; children: React.ReactNode }) {
  return (
    <blockquote className="my-3 border-l-4 border-sysdev-500 bg-sysdev-50 dark:bg-sysdev-950/20 px-4 py-3 italic text-neutral-800 dark:text-neutral-200 not-prose">
      <div>{children}</div>
      <div className="mt-2 text-xs not-italic font-semibold text-sysdev-700 dark:text-sysdev-400">
        — {kilde}
      </div>
    </blockquote>
  );
}

/* =====================================================================
   "Vanlig misforståelse" og "Eksamenstips"
   ===================================================================== */

function VanligMisforstaelse({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-lg border-l-4 border-rose-400 bg-rose-50 dark:bg-rose-950/30 px-4 py-3">
      <div className="text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-400 mb-1">
        Vanlig misforståelse
      </div>
      <div className="text-sm text-neutral-800 dark:text-neutral-200">{children}</div>
    </div>
  );
}

function Eksamenstips({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
      <div className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-1">
        Eksamenstips
      </div>
      <div className="text-sm text-neutral-800 dark:text-neutral-200">{children}</div>
    </div>
  );
}

/* =====================================================================
   Mini-quiz med flervalg (vis svar)
   ===================================================================== */

interface QuizValg {
  tekst: string;
  riktig?: boolean;
}

interface QuizSporsmalProps {
  nummer: number;
  sporsmal: string;
  valg: QuizValg[];
  forklaring: string;
}

function QuizSporsmal({ nummer, sporsmal, valg, forklaring }: QuizSporsmalProps) {
  const [valgt, setValgt] = useState<number | null>(null);
  const [vist, setVist] = useState(false);

  return (
    <div className="my-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sysdev-500 text-sm font-bold text-white">
          {nummer}
        </span>
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
          {sporsmal}
        </p>
      </div>

      <div className="space-y-2">
        {valg.map((v, i) => {
          const valgtNa = valgt === i;
          let stil = "border-[var(--card-border)] bg-white dark:bg-neutral-900/40 hover:border-sysdev-400";
          if (vist) {
            if (v.riktig) {
              stil = "border-green-400 bg-green-50 dark:bg-green-950/30";
            } else if (valgtNa) {
              stil = "border-red-400 bg-red-50 dark:bg-red-950/30";
            } else {
              stil = "border-neutral-200 dark:border-neutral-700 opacity-60";
            }
          } else if (valgtNa) {
            stil = "border-sysdev-500 bg-sysdev-50 dark:bg-sysdev-950/30";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!vist) setValgt(i);
              }}
              className={`flex w-full items-start gap-3 rounded-lg border-2 px-3 py-2 text-left text-sm transition-all ${stil}`}
            >
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {String.fromCharCode(97 + i)})
              </span>
              <span className="text-neutral-800 dark:text-neutral-200">{v.tekst}</span>
              {vist && v.riktig && (
                <span className="ml-auto text-green-600 dark:text-green-400 font-bold">
                  ✓
                </span>
              )}
              {vist && !v.riktig && valgtNa && (
                <span className="ml-auto text-red-600 dark:text-red-400 font-bold">
                  ✗
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setVist(!vist)}
          className="rounded-lg bg-sysdev-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-sysdev-600"
        >
          {vist ? "Skjul fasit" : "Vis fasit"}
        </button>
        {vist && (
          <button
            type="button"
            onClick={() => {
              setVist(false);
              setValgt(null);
            }}
            className="text-sm text-[var(--muted)] underline hover:text-[var(--foreground)]"
          >
            Prøv på nytt
          </button>
        )}
      </div>

      {vist && (
        <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 text-sm text-neutral-800 dark:text-neutral-200">
          <span className="font-bold text-amber-700 dark:text-amber-400">Forklaring: </span>
          {forklaring}
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   Hovedside
   ===================================================================== */

export default function OopFundamenterPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <Link href="/dat109/ooa-ood" className="hover:text-[var(--accent)]">
          OOA og OOD
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">OOP-fundamenter</span>
      </div>

      {/* Header */}
      <header className="mb-8 rounded-2xl border border-[var(--card-border)] bg-gradient-to-br from-sysdev-50 to-white dark:from-sysdev-950/40 dark:to-neutral-900/30 p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-sysdev-500 px-3 py-1 text-xs font-bold text-white">
            OOA / OOD
          </span>
          <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 text-xs font-bold">
            NY — testet i V2024
          </span>
          <span className="text-xs text-[var(--muted)]">Del av oppgave 2 (~20%)</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          OOP-fundamenter
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Grady Boochs syv OO-egenskaper, klasse vs objekt, state-behaviour-identity
          og de fire essensielle OOP-prinsippene. V2024 testet hele dette stoffet
          ordrett som flervalg — du må kunne hver definisjon på fingerspissene.
        </p>
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg bg-white/80 dark:bg-neutral-900/90 border border-[var(--card-border)] p-3">
            <div className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-200 font-semibold">
              Pensumkilde
            </div>
            <div className="text-neutral-900 dark:text-neutral-50 mt-1">
              F02 (UML), F06 (slides 70+), F16 (slides 5–11, 29–32)
            </div>
          </div>
          <div className="rounded-lg bg-white/80 dark:bg-neutral-900/90 border border-[var(--card-border)] p-3">
            <div className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-200 font-semibold">
              Eksamen
            </div>
            <div className="text-neutral-900 dark:text-neutral-50 mt-1">
              V2024 oppgave 2 — flervalg om abstraction, encapsulation, klasse vs
              objekt, essensielle OOP-prinsipper
            </div>
          </div>
          <div className="rounded-lg bg-white/80 dark:bg-neutral-900/90 border border-[var(--card-border)] p-3">
            <div className="text-xs uppercase tracking-wide text-neutral-700 dark:text-neutral-200 font-semibold">
              Forfatter
            </div>
            <div className="text-neutral-900 dark:text-neutral-50 mt-1">
              Grady Booch (1990-tallet) — far til mye av moderne OO-tenkning
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          SEKSJON 1 — Hva er OOP og hvorfor bruker vi det?
          ======================================================== */}
      <TheorySummary
        title="1. Hva er OOP — og hvorfor bruker vi det?"
        mustKnow={[
          "OOP modellerer programvare som samvirkende objekter, hvert med data og oppførsel.",
          "Drivkraften: gjøre programvare lettere å forstå, gjenbruke og endre.",
          "De fire essensielle prinsippene: Abstraksjon, Innkapsling, Arv, Polymorfi.",
          "Generalisering er IKKE et eget essensielt prinsipp — det er en form for arv (testet ordrett i V2024).",
        ]}
      >
        <h3>Et lite stykke historie — hvorfor OOP overhodet?</h3>
        <p>
          For å forstå hvorfor objektorientering ble en revolusjon, må du se hvor vi
          kom fra. Programvareutvikling har gjennomgått tre store paradigmer:
        </p>
        <ol>
          <li>
            <strong>Imperativ / prosedyrisk</strong> (1950–60-tallet, FORTRAN, COBOL):
            programmet er en lang oppskrift. Globale variabler kan endres fra hvor som
            helst. Når programmet vokser, blir det umulig å vite hvem som rører hvilken
            data.
          </li>
          <li>
            <strong>Strukturert programmering</strong> (1970-tallet, C, Pascal):
            funksjoner og lokale variabler. Bedre struktur, men data og funksjoner
            ligger fortsatt hver for seg. Du kan endre en datatype og må jakte på alle
            funksjoner som rører den.
          </li>
          <li>
            <strong>Objektorientering</strong> (Smalltalk 1980, C++, deretter Java
            1995): pakker data og funksjoner sammen i &quot;objekter&quot;. Et objekt
            <em>eier</em> dataene sine og bestemmer selv hvem som får lov til å endre
            dem.
          </li>
        </ol>

        <Sitat kilde="Atle, F16 slide 5">
          &quot;Objektorientering er en måte å organisere programvare som speiler
          virkeligheten — du modellerer ting i problemområdet som objekter med
          tilstand, oppførsel og identitet.&quot;
        </Sitat>

        <h3>Hvorfor OOP fortsatt dominerer</h3>
        <p>
          OOP løser tre problemer som er avgjørende for stor programvare:
        </p>
        <ul>
          <li>
            <strong>Modellering av virkeligheten:</strong> Programvare blir lettere å
            forstå når koden ligner på problemet den løser. En <code>Spiller</code>
            -klasse i en Monopol-simulator er gjenkjennelig — i motsetning til en
            samling globale arrays.
          </li>
          <li>
            <strong>Gjenbruk:</strong> En velskreven klasse kan brukes på nytt i
            mange systemer. Arv lar oss bygge spesialiserte varianter uten å skrive
            alt på nytt.
          </li>
          <li>
            <strong>Vedlikehold:</strong> Når data og oppførsel ligger sammen i én
            klasse, vet du hvor du skal endre noe. Innkapsling beskytter resten av
            systemet mot indre endringer.
          </li>
        </ul>

        <h3>De fire essensielle OOP-prinsippene</h3>
        <p>
          Disse fire er den klassiske kjernen i objektorientering. Mange lærebøker
          (Sommerville, Booch, Larman) lister akkurat disse fire:
        </p>
        <ul>
          <li>
            <strong>Abstraksjon</strong> — fokuser på det viktige, ignorer
            irrelevante detaljer.
          </li>
          <li>
            <strong>Innkapsling</strong> — skjul interne detaljer bak et grensesnitt.
          </li>
          <li>
            <strong>Arv</strong> (Inheritance) — la én klasse arve egenskaper fra en
            annen for å unngå duplikat-kode.
          </li>
          <li>
            <strong>Polymorfi</strong> — la samme metodekall oppføre seg ulikt
            avhengig av hvilken konkret type objektet har.
          </li>
        </ul>

        <Eksamenstips>
          V2024 spurte: <em>&quot;Which of the following is NOT one of the
          essential principles of OOP?&quot;</em> — med <strong>Generalization</strong>{" "}
          som ett av alternativene. Generalisering er <em>resultatet</em> av arv (vi
          generaliserer felles trekk opp til en superklasse), men det regnes ikke som
          et eget essensielt prinsipp på linje med de fire over. Hvis du ser
          Generalization i et &quot;NOT&quot;-spørsmål om essensielle OOP-prinsipper —
          det er svaret.
        </Eksamenstips>

        <VanligMisforstaelse>
          Mange tror at &quot;klasse&quot; og &quot;objekt&quot; er synonymt med
          &quot;abstraksjon&quot; og &quot;innkapsling&quot;. Det er feil. Klasser
          og objekter er <em>byggesteinene</em>; abstraksjon, innkapsling, arv og
          polymorfi er <em>prinsippene</em> du følger når du designer dem.
        </VanligMisforstaelse>
      </TheorySummary>

      {/* ========================================================
          SEKSJON 2 — Klasse vs Objekt
          ======================================================== */}
      <TheorySummary
        title="2. Klasse vs objekt — den viktigste forskjellen"
        mustKnow={[
          "Klasse = mal/blueprint. Objekt = en konkret instans laget fra malen.",
          "Du kan lage 0, 1 eller millioner av objekter fra samme klasse.",
          "Hvert objekt har sine egne verdier i feltene; metodene er felles.",
          "V2024-svar: 'En klasse beskriver en samling av objekter som har like egenskaper og atferd, mens et objekt er en spesifikk instans av en klasse.'",
        ]}
      >
        <h3>Den korte definisjonen</h3>
        <p>
          En <strong>klasse</strong> er en <em>mal</em> — en beskrivelse av hvilke
          felt og metoder objekter av denne typen skal ha. Et <strong>objekt</strong>{" "}
          er en konkret <em>forekomst</em> (instans) av klassen, opprettet i minnet med
          <code>new</code>.
        </p>

        <Sitat kilde="V2024 oppgave 2 — riktig svar (ordrett)">
          En klasse beskriver en samling av objekter som har like egenskaper og
          atferd, mens et objekt er en spesifikk instans av en klasse.
        </Sitat>

        <p>
          Tenk på en kakeoppskrift: <em>oppskriften</em> er klassen (den finnes i
          boka, du kan ikke spise den). <em>Selve kakene</em> du baker er objekter —
          du kan ha mange av dem, hver med sin egen mengde glasur.
        </p>

        <h3>Diagram: én klasse, mange objekter</h3>
        <KlasseVsObjektDiagram />

        <h3>Java-eksempel</h3>
        <CodeBlock label="Klassen — definisjonen, malen" variant="neutral">
{`// 1) Klassen Spiller — DEFINISJONEN. Ingen Spillere finnes ennå.
public class Spiller {
    private String navn;     // hvert objekt får sin egen verdi
    private int poeng;       // hvert objekt får sin egen verdi

    public Spiller(String navn) {
        this.navn = navn;
        this.poeng = 0;
    }

    public void leggTilPoeng(int p) {
        this.poeng += p;
    }

    public String getNavn() { return navn; }
    public int getPoeng()   { return poeng; }
}`}
        </CodeBlock>

        <CodeBlock label="Bruk klassen til å lage tre OBJEKTER" variant="good">
{`// 2) Vi oppretter tre OBJEKTER (instanser) fra samme klasse.
//    Hvert objekt er en egen "boks" i minnet.
Spiller erlend = new Spiller("Erlend");
Spiller atle   = new Spiller("Atle");
Spiller kari   = new Spiller("Kari");

// Endrer kun Erlends poeng — Atle og Kari er upåvirket.
erlend.leggTilPoeng(1500);

System.out.println(erlend.getPoeng()); // 1500
System.out.println(atle.getPoeng());   // 0
System.out.println(kari.getPoeng());   // 0`}
        </CodeBlock>

        <Eksamenstips>
          Kjenn igjen de tre nøkkelordene: <strong>klasse</strong> = mal,{" "}
          <strong>instans / objekt</strong> = konkret forekomst i minnet,{" "}
          <strong>new</strong> = operatoren som lager objektet. Hvis V2024-stilen
          spør &quot;Hva er forskjellen mellom en klasse og et objekt?&quot; — svaret
          ditt skal nevne &quot;mal&quot; og &quot;instans&quot;.
        </Eksamenstips>

        <VanligMisforstaelse>
          Studenter sier ofte &quot;klassen Spiller har navnet Erlend&quot;. Nei!{" "}
          Klassen <em>definerer</em> at det skal finnes et navn-felt. Det er det
          konkrete <em>objektet</em> som har verdien &quot;Erlend&quot; lagret i
          sitt navn-felt. Klassen er en oppskrift — den vet ingenting om hvilke navn
          de bakte kakene har.
        </VanligMisforstaelse>
      </TheorySummary>

      {/* ========================================================
          SEKSJON 3 — Et objekt har State, Behaviour, Identity
          ======================================================== */}
      <TheorySummary
        title="3. Et objekt har — State, Behaviour og Identity"
        mustKnow={[
          "State (tilstand) = verdiene i feltene akkurat nå.",
          "Behaviour (oppførsel) = metodene objektet kan utføre.",
          "Identity (identitet) = unik adresse i minnet — to objekter med samme verdier er IKKE samme objekt.",
          "V2024 spurte 'An object has _________.' — svaret er 'All of these'.",
        ]}
      >
        <h3>Atles klassiske definisjon</h3>
        <p>
          F16 slide 6 oppsummerer det med tre ord: et objekt har{" "}
          <strong>tilstand, oppførsel og identitet</strong>. Dette er ikke pugg uten
          mening — det er tre helt forskjellige aspekter av hva et objekt er, og du
          trenger alle tre for å programmere riktig.
        </p>

        <Sitat kilde="Booch, gjengitt i F16 slide 6">
          An object has state, behaviour, and identity.
        </Sitat>

        <StateBehaviourIdentityDiagram />

        <h3>State — tilstanden (data, felt, attributter)</h3>
        <p>
          State er <strong>verdiene i objektets felt akkurat nå</strong>. Tilstanden
          endrer seg over tid — Erlend kan ha 0 poeng nå og 1500 om fem minutter.
          Tilstanden er det som gjør Erlend &quot;Erlend&quot;: hans navn, hans
          poeng, hans posisjon på brettet.
        </p>
        <CodeBlock label="State i kode = feltene" variant="neutral">
{`public class Spiller {
    // Disse tre feltene utgjør STATE-en til objektet:
    private String navn;
    private int poeng;
    private int rute;
}

// Når vi skriver:
Spiller s = new Spiller("Erlend");
s.leggTilPoeng(1500);

// ...har s.state endret seg fra (Erlend, 0, 0) til (Erlend, 1500, 0).`}
        </CodeBlock>

        <h3>Behaviour — oppførselen (metodene)</h3>
        <p>
          Behaviour er <strong>hva objektet KAN gjøre</strong> — metodene. Når du
          kaller en metode på et objekt, &quot;sender du en melding&quot; (Smalltalk-
          terminologien). Objektet kan svare ved å endre sin egen state, returnere
          en verdi, eller ringe metoder på andre objekter.
        </p>
        <CodeBlock label="Behaviour i kode = metodene" variant="neutral">
{`public class Spiller {
    private int poeng;

    // Metodene UTGJØR oppførselen:
    public void leggTilPoeng(int p)  { this.poeng += p; }   // endrer state
    public int  getPoeng()           { return poeng; }      // leser state
    public void flyttBrikke(int n)   { /* ... */ }          // gjør noe
}`}
        </CodeBlock>

        <h3>Identity — identiteten (referansen i minnet)</h3>
        <p>
          Identity er det mest subtile begrepet. To objekter kan ha{" "}
          <em>nøyaktig</em> samme verdier i alle feltene, men være to forskjellige
          objekter med to forskjellige identiteter. Identiteten er{" "}
          <strong>adressen i minnet</strong> — eller mer presist, referansen som
          peker dit. I Java sjekker du identitet med <code>==</code>, og likhet med{" "}
          <code>.equals()</code>.
        </p>

        <CodeBlock label="Identitet vs likhet — den klassiske fellen" variant="bad">
{`Spiller a = new Spiller("Erlend");
Spiller b = new Spiller("Erlend");   // samme navn — men nytt objekt!

// IDENTITET: er a og b det SAMME objektet i minnet?
System.out.println(a == b);          // false — to forskjellige objekter

// LIKHET (hvis equals er implementert): har de samme verdier?
System.out.println(a.equals(b));     // true — hvis equals sammenligner navn

// Men her:
Spiller c = a;                       // c peker på SAMME objekt som a
System.out.println(a == c);          // true — samme identitet`}
        </CodeBlock>

        <Sitat kilde="Slide 7 (F16) parafrasert">
          Two objects are == only if they share the same reference in memory. Equal
          values is not the same as same identity.
        </Sitat>

        <Eksamenstips>
          Hvis V2024-stilen spør <em>&quot;An object has _________&quot;</em> og
          alternativene er &quot;state&quot;, &quot;behaviour&quot;,
          &quot;identity&quot; eller &quot;all of these&quot; — svaret er{" "}
          <strong>all of these</strong>. Et objekt har <em>alle tre</em> samtidig.
        </Eksamenstips>

        <VanligMisforstaelse>
          Mange forveksler <code>==</code> og <code>.equals()</code> i Java.{" "}
          <code>==</code> sammenligner identitet (samme objekt i minnet).{" "}
          <code>.equals()</code> sammenligner verdier (hvis klassen overstyrer den —
          ellers gjør den faktisk det samme som <code>==</code>). For Strings: bruk
          ALLTID <code>.equals()</code>.
        </VanligMisforstaelse>
      </TheorySummary>

      {/* ========================================================
          SEKSJON 4 — De 7 OO-egenskapene (Booch)
          ======================================================== */}
      <TheorySummary
        title="4. Grady Boochs syv OO-egenskaper"
        mustKnow={[
          "De fire HOVED-egenskapene må alle objektorienterte språk ha: Abstraksjon, Innkapsling, Modularitet, Hierarki.",
          "De tre TILLEGGS-egenskapene er nyttige men ikke obligatoriske: Typing, Samtidighet, Persistens.",
          "Lær å gjenkjenne hver egenskap i kode + ett eksempel fra Monopol/Stigespill per egenskap.",
          "Forskjell på Abstraksjon (HVA, utenfra) og Innkapsling (HVORDAN det skjules, innenfra).",
        ]}
      >
        <h3>Hva er dette, og hvorfor er det viktig?</h3>
        <p>
          Grady Booch er en av de tre &quot;fedrene&quot; til UML (sammen med Rumbaugh
          og Jacobson). I boka <em>Object-Oriented Analysis and Design with
          Applications</em> (1991) listet han syv egenskaper som karakteriserer
          objektorienterte systemer. Atle bruker akkurat denne listen i F06 (slide
          70+) og F16 (slides 29–32) — det er listen du må kunne på eksamen.
        </p>

        <p>
          De fire første er <strong>obligatoriske</strong> (et språk er ikke ekte
          OO uten dem). De tre siste er <strong>fordelaktige</strong> — moderne
          språk som Java har dem, men du kan i prinsippet ha OO uten.
        </p>

        <SyvOOEgenskaperDiagram />

        {/* --- 1. Abstraksjon --- */}
        <h3 className="!mt-8">1. Abstraksjon (Abstraction)</h3>
        <Sitat kilde="V2024 (engelsk svaralternativ)">
          Abstraction allows us to consider complex ideas while ignoring irrelevant
          detail.
        </Sitat>
        <p>
          Abstraksjon betyr å <strong>fokusere på det vesentlige og overse
          detaljene</strong>. Når du modellerer en Spiller i en Monopol-simulator,
          tar du ikke med alle 30 milliarder hjerneceller eller hjertet hans. Du tar
          bare med det <em>spillet</em> bryr seg om: navn, poeng, posisjon på
          brettet.
        </p>
        <CodeBlock label="Abstraksjon i praksis" variant="good">
{`// I virkeligheten har en spiller utallige egenskaper. I vår
// modell abstraherer vi bort alt unntatt det Monopol bryr seg om:
public class Spiller {
    private String navn;     // navn — relevant
    private int poeng;       // poeng — relevant
    private Brikke brikke;   // brikke — relevant
    // Vi tar IKKE med fødselsdato, høyde, øyenfarge, ...
}`}
        </CodeBlock>
        <Eksamenstips>
          Hvis V2024 spør <em>&quot;Which of the following best describes
          abstraction?&quot;</em> — let etter alternativ med &quot;ignoring
          irrelevant detail&quot; eller &quot;considering complex ideas&quot;. Det
          er svaret.
        </Eksamenstips>

        {/* --- 2. Innkapsling --- */}
        <h3 className="!mt-8">2. Innkapsling (Encapsulation)</h3>
        <Sitat kilde="V2024 (engelsk svaralternativ)">
          Encapsulation allows us to focus on what something does without considering
          the complexities of how it works.
        </Sitat>
        <p>
          Innkapsling er å <strong>skjule de interne detaljene bak et
          grensesnitt</strong>. Du gjør felter <code>private</code> og tilbyr{" "}
          <code>public</code> metoder (getters/setters, evt. forretningslogikk).
          Resten av systemet bryr seg ikke om HVORDAN poengene lagres — bare at
          det finnes en <code>leggTilPoeng()</code>-metode.
        </p>
        <CodeBlock label="UTEN innkapsling — alle kan rote med dataene" variant="bad">
{`public class Spiller {
    public int poeng;   // public felt — hvem som helst kan endre
}

// Andre steder i koden:
Spiller s = new Spiller("Erlend");
s.poeng = -9999;        // OPS! Ingen kontroll. Negative poeng?`}
        </CodeBlock>
        <CodeBlock label="MED innkapsling — klassen kontrollerer selv" variant="good">
{`public class Spiller {
    private int poeng;                                   // skjult
    public int getPoeng() { return poeng; }              // les
    public void leggTilPoeng(int p) {                    // skriv via metode
        if (p < 0) throw new IllegalArgumentException();
        this.poeng += p;
    }
}

// Andre steder:
s.leggTilPoeng(500);      // OK — kontrollert tilgang
// s.poeng = -9999;       // KOMPILERER IKKE — feltet er privat`}
        </CodeBlock>
        <p>
          Innkapsling henger tett sammen med <strong>Open/Closed Principle</strong>{" "}
          (SOLID O): hvis du skjuler interne detaljer, kan du endre
          implementasjonen senere uten å bryte koden som bruker klassen.
        </p>

        {/* --- 3. Modularitet --- */}
        <h3 className="!mt-8">3. Modularitet (Modularity)</h3>
        <p>
          Modularitet betyr å <strong>dele systemet inn i uavhengige
          moduler</strong> som hver løser én avgrenset oppgave. I Java betyr en
          modul typisk en pakke (eller en klasse). Modulene snakker sammen via klart
          definerte grensesnitt.
        </p>
        <p>
          I Atles Monopol-eksempel er <code>Brett</code>, <code>Kopp</code>,{" "}
          <code>Spiller</code> og <code>Rute</code> separate klasser i hver sin
          rolle. <code>Brett</code> vet ingenting om hvordan terninger trilles —
          det er <code>Kopp</code> sin jobb. Hvis terningen trenger nye regler,
          trenger du bare endre <code>Kopp</code>.
        </p>
        <Eksamenstips>
          Modularitet er &quot;makro-versjonen&quot; av høy samhørighet (High
          Cohesion fra GRASP) og lav kobling (Low Coupling fra GRASP). Disse tre
          begrepene drar i samme retning: hold relaterte ting samlet, og hold
          urelaterte ting fra hverandre.
        </Eksamenstips>

        {/* --- 4. Hierarki --- */}
        <h3 className="!mt-8">4. Hierarki (Hierarchy)</h3>
        <p>
          Hierarki betyr å <strong>klassifisere klasser i en rangordning</strong>.
          De to viktigste hierarkiene i OO er:
        </p>
        <ul>
          <li>
            <strong>&quot;er-en&quot;-hierarki (arv / generalisering)</strong>:{" "}
            <code>StartRute</code> <em>er-en</em> <code>Rute</code>. Subklassen
            arver felt og metoder fra superklassen og kan overstyre dem.
          </li>
          <li>
            <strong>&quot;har-en&quot;-hierarki (komposisjon / aggregering)</strong>:{" "}
            <code>Brett</code> <em>har-en</em> samling av <code>Rute</code>-objekter.{" "}
            Brettet eier rutene; hvis brettet slettes, forsvinner rutene.
          </li>
        </ul>
        <CodeBlock label="Arv — er-en-hierarki" variant="neutral">
{`public abstract class Rute {
    public abstract void landetPaa(Spiller s);
}

public class StartRute extends Rute {
    public void landetPaa(Spiller s) { s.leggTilPoeng(2000); }
}

public class InntektsskattRute extends Rute {
    public void landetPaa(Spiller s) { s.trekkFraPoeng(2000); }
}`}
        </CodeBlock>
        <VanligMisforstaelse>
          Ikke bruk arv bare fordi to klasser har noe til felles. Bruk arv kun når
          subklassen <em>virkelig er en</em> superklassen og kan brukes overalt der
          superklassen brukes (LSP fra SOLID). Hvis ikke — bruk komposisjon.
        </VanligMisforstaelse>

        {/* --- 5. Typing --- */}
        <h3 className="!mt-8">5. Typing (Typing)</h3>
        <p>
          Typing betyr at <strong>kompilatoren håndhever at objekter brukes
          riktig</strong>. Java er sterkt typet: hvis en metode forventer en{" "}
          <code>Spiller</code>, kan du ikke gi den en <code>Terning</code> uten å
          få kompilatorfeil.
        </p>
        <CodeBlock label="Generics gir typesikker kode" variant="good">
{`// Med generics: kompilatoren vet at lista bare inneholder Spiller-objekter.
List<Spiller> spillere = new ArrayList<>();
spillere.add(new Spiller("Erlend"));
// spillere.add("ikke en spiller");  // KOMPILERER IKKE — typesjekk

Spiller s = spillere.get(0);  // ingen cast nødvendig`}
        </CodeBlock>
        <p>
          Sterk typing gir tidlig feilfangst: feil som ellers ville krasjet under
          kjøring, fanges allerede ved kompilering. Det er en stor del av grunnen
          til at Java foretrekkes i store systemer.
        </p>

        {/* --- 6. Samtidighet --- */}
        <h3 className="!mt-8">6. Samtidighet (Concurrency)</h3>
        <p>
          Samtidighet er at <strong>flere prosesser eller tråder kan jobbe
          parallelt</strong>. I OO-sammenheng betyr det at vi kan ha flere objekter
          som lever &quot;samtidig&quot; — typisk ved at hver tråd kjører sin egen
          sekvens av metodekall.
        </p>
        <p>
          I DAT109 er dette mest et konseptuelt punkt. Du trenger ikke kunne skrive
          komplisert flertrådet kode på eksamen, men du må vite at samtidighet er en
          av Boochs syv egenskaper, og at Java støtter det via <code>Thread</code>,{" "}
          <code>Runnable</code>, og <code>synchronized</code>.
        </p>
        <CodeBlock label="Et minimalt eksempel" variant="neutral">
{`Thread t1 = new Thread(() -> System.out.println("Tråd A jobber"));
Thread t2 = new Thread(() -> System.out.println("Tråd B jobber"));
t1.start();
t2.start();   // de kjører parallelt`}
        </CodeBlock>

        {/* --- 7. Persistens --- */}
        <h3 className="!mt-8">7. Persistens (Persistence)</h3>
        <p>
          Persistens er at <strong>data overlever programmets kjøring</strong>. Når
          du lukker programmet, forsvinner alle objektene fra minnet. Men hvis du
          har lagret dem til en database eller en fil, kan du laste dem inn igjen
          neste gang programmet starter.
        </p>
        <p>
          I Øvelse 1 brukte du <strong>JPA</strong> (Java Persistence API) for å
          lagre objekter til database. Det er Atles eksempel på objektpersistens:{" "}
          du annoterer en Java-klasse med <code>@Entity</code>, og JPA håndterer
          lagring/lasting til en relasjonsdatabase.
        </p>
        <CodeBlock label="JPA — persistente objekter" variant="neutral">
{`@Entity
public class Spiller {
    @Id @GeneratedValue
    private Long id;
    private String navn;
    private int poeng;
    // ... gettere/settere
}

// Lagre til databasen:
em.persist(new Spiller("Erlend"));
em.getTransaction().commit();
// Spiller-objektet finnes nå i databasen — overlever programstopp.`}
        </CodeBlock>

        <Eksamenstips>
          Hvis du blir spurt &quot;Hvilken av Boochs egenskaper handler om
          databaselagring?&quot; — svar <strong>Persistens</strong>. Hvis spørsmålet
          er &quot;... om at flere ting kan skje samtidig?&quot; — svar{" "}
          <strong>Samtidighet</strong>. Begge er tilleggs-egenskaper, ikke
          obligatoriske, men begge er viktige i moderne systemer.
        </Eksamenstips>
      </TheorySummary>

      {/* ========================================================
          SEKSJON 5 — Abstraksjon vs Innkapsling
          ======================================================== */}
      <TheorySummary
        title="5. Abstraksjon vs innkapsling — den nyansen V2024 testet"
        mustKnow={[
          "Abstraksjon = HVA klassen gjør, sett utenfra (designperspektiv).",
          "Innkapsling = HVORDAN detaljene skjules, sett innenfra (implementasjonsperspektiv).",
          "De to går alltid hånd i hånd, men beskriver to forskjellige sider av samme mynt.",
        ]}
      >
        <p>
          Mange studenter (og lærebøker!) blander de to. V2024 hadde to separate
          flervalg — ett for hver — så du må kjenne forskjellen.
        </p>

        <AbstraksjonVsInnkapslingDiagram />

        <h3>Definisjonene satt opp mot hverandre</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="text-left p-2">Aspekt</th>
              <th className="text-left p-2">Abstraksjon</th>
              <th className="text-left p-2">Innkapsling</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--card-border)]">
              <td className="p-2 font-semibold">Spørsmål</td>
              <td className="p-2">HVA gjør klassen?</td>
              <td className="p-2">HVORDAN skjuler vi det?</td>
            </tr>
            <tr className="border-b border-[var(--card-border)]">
              <td className="p-2 font-semibold">Perspektiv</td>
              <td className="p-2">Brukerens / utsiden</td>
              <td className="p-2">Implementerers / innsiden</td>
            </tr>
            <tr className="border-b border-[var(--card-border)]">
              <td className="p-2 font-semibold">Verktøy</td>
              <td className="p-2">Klassenavn, public-grensesnitt</td>
              <td className="p-2">private-felt, getter/setter</td>
            </tr>
            <tr className="border-b border-[var(--card-border)]">
              <td className="p-2 font-semibold">V2024-formulering</td>
              <td className="p-2">
                &quot;ignoring irrelevant detail&quot;
              </td>
              <td className="p-2">
                &quot;focus on what without considering how&quot;
              </td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Bilanalogi</td>
              <td className="p-2">Bilen ER et transportmiddel som beveger seg</td>
              <td className="p-2">Motoren er skjult under panseret</td>
            </tr>
          </tbody>
        </table>

        <Sitat kilde="Sammenstilling fra V2024-alternativer">
          Abstraksjon handler om hvilke detaljer vi velger å vise. Innkapsling
          handler om hvordan vi tekniskt skjuler det vi velger å skjule.
        </Sitat>

        <VanligMisforstaelse>
          Mange tror at &quot;å skrive private felt&quot; ER abstraksjon. Det er
          innkapsling. Abstraksjon er beslutningen om at &quot;Spiller-klassen
          trenger ikke fødselsdato i denne modellen&quot; — altså et designvalg,
          ikke en kodeteknikk.
        </VanligMisforstaelse>
      </TheorySummary>

      {/* ========================================================
          SEKSJON 6 — Mini-quiz (V2024-stil)
          ======================================================== */}
      <section className="my-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="text-2xl font-bold mb-2">
          6. Mini-quiz — drill V2024-stil
        </h2>
        <p className="text-[var(--muted)] mb-4 text-sm">
          Disse 10 spørsmålene speiler nøyaktig formen på flervalg fra V2024
          oppgave 2. Klikk et alternativ, deretter <em>Vis fasit</em>.
        </p>

        <QuizSporsmal
          nummer={1}
          sporsmal="Hvilket av følgende er IKKE et essensielt prinsipp innen objektorientert programmering?"
          valg={[
            { tekst: "Abstraction" },
            { tekst: "Encapsulation" },
            { tekst: "Inheritance" },
            { tekst: "Generalization", riktig: true },
            { tekst: "Polymorphism" },
          ]}
          forklaring="De fire essensielle OOP-prinsippene er Abstraction, Encapsulation, Inheritance og Polymorphism. Generalization er en form for arv (når vi trekker felles trekk opp i en superklasse), men regnes ikke som et eget essensielt prinsipp. Dette er et ordrett V2024-spørsmål."
        />

        <QuizSporsmal
          nummer={2}
          sporsmal="Hva er forskjellen mellom en klasse og et objekt?"
          valg={[
            {
              tekst:
                "En klasse er en spesifikk forekomst, mens et objekt er en mal for å lage forekomster.",
            },
            {
              tekst:
                "En klasse beskriver en samling av objekter som har like egenskaper og atferd, mens et objekt er en spesifikk instans av en klasse.",
              riktig: true,
            },
            {
              tekst:
                "En klasse og et objekt er det samme — bare to navn på samme konsept.",
            },
            {
              tekst:
                "Et objekt er en ferdig kompilert klasse; en klasse er kildekoden.",
            },
          ]}
          forklaring="Dette er den ordrette formuleringen V2024 brukte. Klassen er malen / blueprint, objektet er en konkret instans laget med 'new'."
        />

        <QuizSporsmal
          nummer={3}
          sporsmal="An object has _________."
          valg={[
            { tekst: "state" },
            { tekst: "behaviour" },
            { tekst: "identity" },
            { tekst: "All of these.", riktig: true },
          ]}
          forklaring="Booch sin klassiske definisjon: et objekt har tilstand (verdier i felt), oppførsel (metoder) og identitet (unik adresse i minnet). Alle tre samtidig."
        />

        <QuizSporsmal
          nummer={4}
          sporsmal="Which of the following best describes ABSTRACTION in OOP?"
          valg={[
            {
              tekst:
                "Allows us to consider complex ideas while ignoring irrelevant detail.",
              riktig: true,
            },
            {
              tekst:
                "Allows us to focus on what something does without considering the complexities of how it works.",
            },
            { tekst: "Allows us to inherit attributes and methods from a parent class." },
            { tekst: "Allows the same method call to behave differently depending on the receiver type." },
          ]}
          forklaring="Abstraksjon = forenkle ved å ignorere det irrelevante. Alternativ b) er innkapsling. c) er arv. d) er polymorfi."
        />

        <QuizSporsmal
          nummer={5}
          sporsmal="Which of the following best describes ENCAPSULATION in OOP?"
          valg={[
            {
              tekst:
                "Allows us to consider complex ideas while ignoring irrelevant detail.",
            },
            {
              tekst:
                "Allows us to focus on what something does without considering the complexities of how it works.",
              riktig: true,
            },
            { tekst: "Means that subclasses inherit fields from superclasses." },
            { tekst: "Means that the same operation can be implemented differently in subclasses." },
          ]}
          forklaring="Innkapsling = skjul interne detaljer bak et grensesnitt; brukeren bryr seg bare om HVA, ikke HVORDAN. Alternativ a) er abstraksjon."
        />

        <QuizSporsmal
          nummer={6}
          sporsmal="Hvilken av Grady Boochs syv OO-egenskaper handler om at data overlever programkjøring (f.eks. lagres i database)?"
          valg={[
            { tekst: "Modularitet" },
            { tekst: "Hierarki" },
            { tekst: "Persistens", riktig: true },
            { tekst: "Samtidighet" },
          ]}
          forklaring="Persistens handler om at objekter kan lagres permanent (typisk via JPA til database) og lastes inn igjen. Samtidighet handler om parallell utførelse — ikke lagring."
        />

        <QuizSporsmal
          nummer={7}
          sporsmal="I Java sammenligner == identitet og .equals() likhet. Hva returnerer dette?"
          valg={[
            { tekst: "true / true" },
            { tekst: "true / false" },
            { tekst: "false / true", riktig: true },
            { tekst: "false / false" },
          ]}
          forklaring="String a = new String('hei'); String b = new String('hei'); a == b returnerer false (to forskjellige objekter i minnet — ulik identitet), mens a.equals(b) returnerer true (samme tegn — lik verdi)."
        />

        <QuizSporsmal
          nummer={8}
          sporsmal="Hvilken egenskap brukes når Brett-klassen inneholder en samling Rute-objekter, og rutene ikke kan eksistere uten brettet?"
          valg={[
            { tekst: "Arv (er-en)" },
            { tekst: "Komposisjon (har-en, sterk)", riktig: true },
            { tekst: "Aggregering (har-en, svak)" },
            { tekst: "Polymorfi" },
          ]}
          forklaring="Komposisjon er den sterke 'har-en'-relasjonen der delene ikke kan eksistere uten helheten — fylt diamant ◆ i UML. Aggregering (åpen diamant ◇) er svakere; delene kan eksistere uavhengig."
        />

        <QuizSporsmal
          nummer={9}
          sporsmal="Hvilken av disse formuleringene er Atles definisjon av objektets tre kjernebestanddeler?"
          valg={[
            { tekst: "Felt, metoder og konstruktør" },
            { tekst: "State, behaviour og identity", riktig: true },
            { tekst: "Public, private og protected" },
            { tekst: "Abstraksjon, innkapsling og polymorfi" },
          ]}
          forklaring="Booch sin klassiske trio. Slide 6 i F16: 'Et objekt har tilstand, oppførsel og identitet.'"
        />

        <QuizSporsmal
          nummer={10}
          sporsmal="Hvorfor bruker vi private felt og public getter/setter-metoder i Java?"
          valg={[
            { tekst: "Det er en konvensjon — ingen reell nytte." },
            {
              tekst:
                "For å bruke innkapsling: skjule interne detaljer og kontrollere hvordan andre klasser leser/endrer feltene.",
              riktig: true,
            },
            { tekst: "Fordi Java krever at alle felt er private." },
            {
              tekst:
                "For å oppnå polymorfi — getters og setters er polymorfe metoder.",
            },
          ]}
          forklaring="Dette er innkapsling i praksis. Ved å skjule felt bak metoder kan klassen validere input, beregne verdier dynamisk, og endre intern lagring uten å bryte koden som bruker den."
        />
      </section>

      {/* ========================================================
          Sammenheng med øvrige tema
          ======================================================== */}
      <section className="my-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h2 className="text-2xl font-bold mb-3">
          Sammenheng med andre temaer
        </h2>
        <p className="mb-4 text-[var(--muted)]">
          OOP-fundamentene er <em>grunnmuren</em> — alt annet i OOA/OOD bygger på
          dem. Slik henger de sammen:
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Innkapsling → SOLID Open/Closed:</strong> ved å skjule interne
            detaljer kan du endre implementasjonen uten å bryte klienter. Se{" "}
            <Link href="/dat109/ooa-ood/solid" className="text-sysdev-600 dark:text-sysdev-400 underline">
              SOLID-prinsippene
            </Link>
            .
          </li>
          <li>
            <strong>Modularitet → GRASP Low Coupling / High Cohesion:</strong>{" "}
            modulinndeling er &quot;makro-versjonen&quot; av GRASP-prinsippene
            for ansvarsfordeling. Se{" "}
            <Link href="/dat109/ooa-ood/grasp" className="text-sysdev-600 dark:text-sysdev-400 underline">
              GRASP-mønstrene
            </Link>
            .
          </li>
          <li>
            <strong>Hierarki + Polymorfi → erstatte if/else-kjeder:</strong> Atles
            klassiske eksempel er <code>Rute.landetPaa(Spiller)</code> som er
            abstrakt i superklassen og overstyrt i hver subklasse. Det er ekte OO i
            praksis.
          </li>
          <li>
            <strong>Klasse vs objekt → UML klassediagram vs sekvensdiagram:</strong>{" "}
            klassediagrammet viser klassene; sekvensdiagrammet viser konkrete{" "}
            objekter (instanser) som sender meldinger. Se{" "}
            <Link href="/dat109/ooa-ood/uml" className="text-sysdev-600 dark:text-sysdev-400 underline">
              UML-grunnlag
            </Link>
            .
          </li>
          <li>
            <strong>Persistens → JPA i Øvelse 1:</strong> du har allerede praktisert
            denne egenskapen ved å annotere klasser med <code>@Entity</code> og
            lagre dem til database.
          </li>
        </ul>
      </section>

      {/* ========================================================
          Bunntekst — pensumkilder
          ======================================================== */}
      <section className="my-8 rounded-xl border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900/40 p-5 text-sm">
        <h3 className="font-bold mb-2">Pensumkilder for denne siden</h3>
        <ul className="space-y-1 text-[var(--muted)]">
          <li>• F02 2025 — UML.pptx (klasser, objekter, attributter, synligheter)</li>
          <li>
            • F06 2026 — Mer om utformingsprinsipper, UML og OOAD - Monopol.pptx
            (slide 70+: Boochs syv egenskaper)
          </li>
          <li>
            • F16 2026 — Oppsummering og eksamen.pptx (slides 5–11 og 29–32: OO-
            grunnleggende)
          </li>
          <li>
            • DAT109 - Eksamen vår 2024 oppgave 2 (alle V2024-flervalg om
            abstraksjon, innkapsling, klasse vs objekt, essensielle prinsipper og
            object-state-behaviour-identity)
          </li>
          <li>• Grady Booch (1991): Object-Oriented Analysis and Design with Applications</li>
        </ul>
      </section>
    </div>
  );
}
