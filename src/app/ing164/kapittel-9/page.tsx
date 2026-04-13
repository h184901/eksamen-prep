"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 9)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interaktiv analogi-tabell: Lineær ↔ Rotasjon ─── */
function LinearRotationalAnalogy() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const analogies = [
    { linear: "x", linDesc: "Posisjon", rot: "\\theta", rotDesc: "Vinkelposisjon", unit: "m ↔ rad" },
    { linear: "v = \\frac{dx}{dt}", linDesc: "Hastighet", rot: "\\omega = \\frac{d\\theta}{dt}", rotDesc: "Vinkelhastighet", unit: "m/s ↔ rad/s" },
    { linear: "a = \\frac{dv}{dt}", linDesc: "Akselerasjon", rot: "\\alpha = \\frac{d\\omega}{dt}", rotDesc: "Vinkelakselerasjon", unit: "m/s² ↔ rad/s²" },
    { linear: "m", linDesc: "Masse (treghet)", rot: "I = \\sum m_i r_i^2", rotDesc: "Treghetsmoment", unit: "kg ↔ kg·m²" },
    { linear: "F", linDesc: "Kraft", rot: "\\tau = rF\\sin\\phi", rotDesc: "Kraftmoment (dreiemoment)", unit: "N ↔ N·m" },
    { linear: "F = ma", linDesc: "Newtons 2. lov", rot: "\\tau = I\\alpha", rotDesc: "Newtons 2. lov (rot.)", unit: "" },
    { linear: "p = mv", linDesc: "Bevegelsesmengde", rot: "L = I\\omega", rotDesc: "Angulært moment", unit: "kg·m/s ↔ kg·m²/s" },
    { linear: "W = F \\cdot d", linDesc: "Arbeid", rot: "W = \\tau \\cdot \\Delta\\theta", rotDesc: "Arbeid (rotasjon)", unit: "J ↔ J" },
    { linear: "K = \\tfrac{1}{2}mv^2", linDesc: "Kinetisk energi", rot: "K = \\tfrac{1}{2}I\\omega^2", rotDesc: "Rotasjonsenergi", unit: "J ↔ J" },
    { linear: "P = Fv", linDesc: "Effekt", rot: "P = \\tau\\omega", rotDesc: "Effekt (rotasjon)", unit: "W ↔ W" },
  ];

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4 overflow-x-auto">
      <h3 className="font-semibold text-lg mb-2">Interaktiv analogi: Lineær ↔ Rotasjon</h3>
      <p className="text-sm text-[var(--muted)] mb-4">Klikk på en rad for å fremheve sammenhengen. Hver lineær størrelse har en rotasjonsanalog!</p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[var(--card-border)]">
            <th className="py-2 px-3 text-left text-blue-500 font-bold">Lineær</th>
            <th className="py-2 px-3 text-left text-blue-500">Beskrivelse</th>
            <th className="py-2 px-3 text-center text-[var(--muted)]">↔</th>
            <th className="py-2 px-3 text-left text-orange-500 font-bold">Rotasjon</th>
            <th className="py-2 px-3 text-left text-orange-500">Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          {analogies.map((row, i) => (
            <tr
              key={i}
              onClick={() => setActiveRow(activeRow === i ? null : i)}
              className={`cursor-pointer border-b border-[var(--card-border)] transition-all duration-200 ${
                activeRow === i
                  ? "bg-amber-100 dark:bg-amber-950/40 scale-[1.01]"
                  : activeRow !== null
                  ? "opacity-40"
                  : "hover:bg-[var(--card-border)]/30"
              }`}
            >
              <td className="py-3 px-3">
                <InlineLatex latex={row.linear} />
              </td>
              <td className="py-3 px-3 text-[var(--muted)]">{row.linDesc}</td>
              <td className="py-3 px-3 text-center text-lg">
                {activeRow === i ? "⟷" : "↔"}
              </td>
              <td className="py-3 px-3">
                <InlineLatex latex={row.rot} />
              </td>
              <td className="py-3 px-3 text-[var(--muted)]">{row.rotDesc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeRow !== null && analogies[activeRow].unit && (
        <p className="text-sm text-center mt-3 text-amber-600 dark:text-amber-400">
          Enheter: {analogies[activeRow].unit}
        </p>
      )}
    </div>
  );
}

/* ─── Interaktiv: Treghetsmoment-visualisering ─── */
function MomentOfInertiaVisualizer() {
  const [shape, setShape] = useState<"disk" | "ring" | "stav-senter" | "stav-ende" | "kule-hul" | "kule-massiv">("disk");
  const [mass, setMass] = useState(2.0);
  const [radius, setRadius] = useState(0.5);
  const [length, setLength] = useState(1.0);

  const shapes: Record<string, { name: string; formula: string; calc: () => number; desc: string }> = {
    "disk": {
      name: "Massiv sylinder / disk",
      formula: "I = \\tfrac{1}{2}MR^2",
      calc: () => 0.5 * mass * radius * radius,
      desc: "Jevnt fordelt masse, rotasjon om symmetriaksen",
    },
    "ring": {
      name: "Tynnvegget ring / hul sylinder",
      formula: "I = MR^2",
      calc: () => mass * radius * radius,
      desc: "All masse i avstand R fra aksen",
    },
    "stav-senter": {
      name: "Tynn stav (akse gjennom senter)",
      formula: "I = \\tfrac{1}{12}ML^2",
      calc: () => (1 / 12) * mass * length * length,
      desc: "Rotasjon om midtpunktet av staven",
    },
    "stav-ende": {
      name: "Tynn stav (akse gjennom ende)",
      formula: "I = \\tfrac{1}{3}ML^2",
      calc: () => (1 / 3) * mass * length * length,
      desc: "Rotasjon om en ende av staven",
    },
    "kule-massiv": {
      name: "Massiv kule",
      formula: "I = \\tfrac{2}{5}MR^2",
      calc: () => 0.4 * mass * radius * radius,
      desc: "Jevnt fordelt masse, rotasjon om diameter",
    },
    "kule-hul": {
      name: "Tynnvegget hul kule",
      formula: "I = \\tfrac{2}{3}MR^2",
      calc: () => (2 / 3) * mass * radius * radius,
      desc: "All masse på overflaten",
    },
  };

  const current = shapes[shape];
  const I = current.calc();
  const useRadius = shape !== "stav-senter" && shape !== "stav-ende";

  // SVG shapes
  const cx = 200, cy = 130;
  const drawR = useRadius ? 30 + radius * 80 : 0;
  const drawL = !useRadius ? 30 + length * 60 : 0;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Treghetsmoment for ulike geometrier</h3>

      {/* Shape selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(shapes).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setShape(key as typeof shape)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              shape === key
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Parameters */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse M (kg)</label>
          <input type="range" min={0.5} max={10} step={0.5} value={mass} onChange={(e) => setMass(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mass.toFixed(1)} kg</p>
        </div>
        {useRadius ? (
          <div>
            <label className="text-sm text-[var(--muted)] block mb-1">Radius R (m)</label>
            <input type="range" min={0.1} max={2} step={0.1} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <p className="text-center text-sm font-mono mt-1">{radius.toFixed(1)} m</p>
          </div>
        ) : (
          <div>
            <label className="text-sm text-[var(--muted)] block mb-1">Lengde L (m)</label>
            <input type="range" min={0.2} max={3} step={0.1} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <p className="text-center text-sm font-mono mt-1">{length.toFixed(1)} m</p>
          </div>
        )}
      </div>

      {/* SVG */}
      <svg viewBox="0 0 400 260" className="w-full max-w-md mx-auto mb-4">
        {/* Rotation axis */}
        {shape === "stav-ende" ? (
          <line x1={cx - drawL} y1="30" x2={cx - drawL} y2="230" stroke="var(--muted)" strokeWidth="1" strokeDasharray="6 3" />
        ) : (
          <line x1={cx} y1="30" x2={cx} y2="230" stroke="var(--muted)" strokeWidth="1" strokeDasharray="6 3" />
        )}
        <text x={shape === "stav-ende" ? cx - drawL : cx} y="24" textAnchor="middle" fill="var(--muted)" fontSize="10">rotasjonsakse</text>

        {/* Shape drawing */}
        {(shape === "disk" || shape === "kule-massiv") && (
          <g>
            <ellipse cx={cx} cy={cy} rx={drawR} ry={drawR * 0.35} fill="#f9731640" stroke="#f97316" strokeWidth="2" />
            <line x1={cx} y1={cy} x2={cx + drawR} y2={cy} stroke="var(--accent)" strokeWidth="1.5" />
            <text x={cx + drawR / 2} y={cy - 8} textAnchor="middle" fill="var(--accent)" fontSize="11">R</text>
            {shape === "kule-massiv" && <circle cx={cx} cy={cy} r={drawR * 0.95} fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4 3" />}
            {/* Curved arrow for rotation */}
            <path d={`M ${cx + drawR + 15} ${cy - 10} A 20 20 0 0 1 ${cx + drawR + 15} ${cy + 10}`} fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#rot-arrow)" />
            <text x={cx + drawR + 30} y={cy + 4} fill="#22c55e" fontSize="11">ω</text>
          </g>
        )}
        {shape === "ring" && (
          <g>
            <ellipse cx={cx} cy={cy} rx={drawR} ry={drawR * 0.35} fill="none" stroke="#f97316" strokeWidth="3" />
            <line x1={cx} y1={cy} x2={cx + drawR} y2={cy} stroke="var(--accent)" strokeWidth="1.5" />
            <text x={cx + drawR / 2} y={cy - 8} textAnchor="middle" fill="var(--accent)" fontSize="11">R</text>
            <path d={`M ${cx + drawR + 15} ${cy - 10} A 20 20 0 0 1 ${cx + drawR + 15} ${cy + 10}`} fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#rot-arrow)" />
          </g>
        )}
        {shape === "kule-hul" && (
          <g>
            <circle cx={cx} cy={cy} r={drawR} fill="none" stroke="#f97316" strokeWidth="2.5" />
            <line x1={cx} y1={cy} x2={cx + drawR} y2={cy} stroke="var(--accent)" strokeWidth="1.5" />
            <text x={cx + drawR / 2} y={cy - 8} textAnchor="middle" fill="var(--accent)" fontSize="11">R</text>
          </g>
        )}
        {shape === "stav-senter" && (
          <g>
            <line x1={cx - drawL} y1={cy} x2={cx + drawL} y2={cy} stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <line x1={cx} y1={cy + 5} x2={cx + drawL} y2={cy + 5} stroke="var(--accent)" strokeWidth="1" />
            <text x={cx + drawL / 2} y={cy + 20} textAnchor="middle" fill="var(--accent)" fontSize="11">L/2</text>
            <path d={`M ${cx + 20} ${cy - 25} A 25 25 0 0 1 ${cx - 20} ${cy - 25}`} fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#rot-arrow)" />
            <text x={cx} y={cy - 35} textAnchor="middle" fill="#22c55e" fontSize="11">ω</text>
          </g>
        )}
        {shape === "stav-ende" && (
          <g>
            <line x1={cx - drawL} y1={cy} x2={cx + drawL} y2={cy} stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <line x1={cx - drawL} y1={cy + 5} x2={cx + drawL} y2={cy + 5} stroke="var(--accent)" strokeWidth="1" />
            <text x={cx} y={cy + 20} textAnchor="middle" fill="var(--accent)" fontSize="11">L</text>
            <circle cx={cx - drawL} cy={cy} r="4" fill="var(--muted)" />
          </g>
        )}

        {/* Mass distribution indicator */}
        <text x={cx} y="240" textAnchor="middle" fill="var(--muted)" fontSize="10">{current.desc}</text>

        <defs>
          <marker id="rot-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      {/* Results */}
      <div className="grid sm:grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Formel</p>
          <p className="text-lg font-bold"><InlineLatex latex={current.formula} /></p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">I (treghetsmoment)</p>
          <p className="text-lg font-bold">{I.toFixed(3)} kg·m²</p>
        </div>
      </div>
      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Jo lenger massen er fra rotasjonsaksen, desto <strong>større</strong> treghetsmoment → vanskeligere å sette i rotasjon.
        Sammenlign ring (<InlineLatex latex="I = MR^2" />) med massiv disk (<InlineLatex latex="I = \\tfrac{1}{2}MR^2" />) — ringen har dobbelt så stort I!
      </p>
    </div>
  );
}

/* ─── Interaktiv: Parallellakse-teoremet ─── */
function ParallelAxisVisualizer() {
  const [dVal, setDVal] = useState(0.3); // m — offset from CM
  const mass = 4.0;
  const R = 0.2;
  const Icm = 0.5 * mass * R * R; // disk
  const Ip = Icm + mass * dVal * dVal;

  const cx = 200, cy = 120;
  const drawR = 50;
  const drawD = dVal * 150;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Parallellakse-teoremet</h3>
      <p className="text-sm text-[var(--muted)] mb-4">
        <InlineLatex latex="I_P = I_{CM} + Md^2" /> — treghetsmomentet om en parallell akse i avstand <InlineLatex latex="d" /> fra massesenteret.
      </p>
      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1">Avstand d fra massesenter (m)</label>
        <input type="range" min={0} max={1} step={0.05} value={dVal} onChange={(e) => setDVal(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
        <p className="text-center text-sm font-mono mt-1">d = {dVal.toFixed(2)} m</p>
      </div>

      <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto mb-4">
        {/* Disk */}
        <ellipse cx={cx} cy={cy} rx={drawR} ry={drawR * 0.35} fill="#f9731630" stroke="#f97316" strokeWidth="2" />
        {/* CM axis */}
        <line x1={cx} y1="30" x2={cx} y2="220" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x={cx + 5} y="28" fill="#3b82f6" fontSize="10">CM-akse</text>
        <circle cx={cx} cy={cy} r="3" fill="#3b82f6" />

        {/* P axis */}
        {drawD > 0 && (
          <g>
            <line x1={cx + drawD} y1="30" x2={cx + drawD} y2="220" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" />
            <text x={cx + drawD + 5} y="28" fill="#ef4444" fontSize="10">P-akse</text>
            {/* d arrow */}
            <line x1={cx} y1={cy + 30} x2={cx + drawD} y2={cy + 30} stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx={cx} cy={cy + 30} r="2" fill="var(--accent)" />
            <circle cx={cx + drawD} cy={cy + 30} r="2" fill="var(--accent)" />
            <text x={cx + drawD / 2} y={cy + 45} textAnchor="middle" fill="var(--accent)" fontSize="11">d</text>
          </g>
        )}

        <text x={cx} y="235" textAnchor="middle" fill="var(--muted)" fontSize="10">Massiv disk: M = {mass} kg, R = {R} m</text>
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]"><InlineLatex latex="I_{CM}" /></p>
          <p className="text-lg font-bold">{Icm.toFixed(3)} kg·m²</p>
        </div>
        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-3">
          <p className="text-xs text-[var(--muted)]"><InlineLatex latex="Md^2" /></p>
          <p className="text-lg font-bold">{(mass * dVal * dVal).toFixed(3)} kg·m²</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]"><InlineLatex latex="I_P = I_{CM} + Md^2" /></p>
          <p className="text-lg font-bold">{Ip.toFixed(3)} kg·m²</p>
        </div>
      </div>
    </div>
  );
}

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ═══════════ TEORISAMMENDRAG ═══════════ */}
      <div id="teorisammendrag" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

        <TheorySummary
          title="9.1 Vinkelhastighet og vinkelakselerasjon"
          mustKnow={[
            "Vinkelposisjon θ måles i radianer (1 omdreining = 2π rad)",
            "Gjennomsnittlig vinkelhastighet: ω_gj = Δθ/Δt",
            "Momentan vinkelhastighet: ω = dθ/dt",
            "Vinkelakselerasjon: α = dω/dt = d²θ/dt²",
            "Positiv ω: mot klokka (sett fra +z), negativ: med klokka",
          ]}
          defaultOpen
        >
          <p className="mb-3">
            Rotasjon er den andre grunnleggende bevegelsesformen i mekanikk. Mens lineær bevegelse beskrives av posisjon <InlineLatex latex="x" />, hastighet <InlineLatex latex="v" /> og akselerasjon <InlineLatex latex="a" />, beskrives rotasjon av <strong>vinkelposisjon</strong> <InlineLatex latex="\theta" />, <strong>vinkelhastighet</strong> <InlineLatex latex="\omega" /> og <strong>vinkelakselerasjon</strong> <InlineLatex latex="\alpha" />.
          </p>
          <p className="mb-3">
            <strong>Viktig:</strong> Vinkler MÅ oppgis i <strong>radianer</strong> i alle formler. Omregning: <InlineLatex latex="1 \text{ rev} = 2\pi \text{ rad} = 360°" />. Enheten <InlineLatex latex="\text{rad}" /> er dimensjonsløs, men vi skriver den for klarhet.
          </p>
          <p>
            Fortegnskonvensjon (høyrehåndsregelen): Krum fingrene i rotasjonsretningen — tommelen peker langs <InlineLatex latex="\omega" />-vektoren. Mot klokka (sett fra positiv akse) gir <InlineLatex latex="\omega > 0" />.
          </p>
        </TheorySummary>

        <TheorySummary
          title="9.2 Rotasjon med konstant vinkelakselerasjon"
          mustKnow={[
            "Kinematikkformlene er identiske med lineær bevegelse — bare bytt ut x→θ, v→ω, a→α",
            "Bruk samme problemløsningsstrategi som ved rettlinjet bevegelse",
          ]}
        >
          <p className="mb-3">
            Når <InlineLatex latex="\alpha" /> er konstant, får vi fire kinematikkligninger som er <strong>helt analoge</strong> med dem for rettlinjet bevegelse med konstant <InlineLatex latex="a" />:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg text-sm">
              <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Lineær</p>
              <p><InlineLatex latex="v = v_0 + at" /></p>
              <p><InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" /></p>
              <p><InlineLatex latex="v^2 = v_0^2 + 2a(x-x_0)" /></p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg text-sm">
              <p className="font-semibold text-orange-600 dark:text-orange-400 mb-1">Rotasjon</p>
              <p><InlineLatex latex="\omega = \omega_0 + \alpha t" /></p>
              <p><InlineLatex latex="\theta = \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2" /></p>
              <p><InlineLatex latex="\omega^2 = \omega_0^2 + 2\alpha(\theta-\theta_0)" /></p>
            </div>
          </div>
        </TheorySummary>

        <TheorySummary
          title="9.3 Sammenheng mellom lineær og vinkelstørrelser"
          mustKnow={[
            "v = rω — linjefart er avstand fra akse ganger vinkelhastighet",
            "a_tan = rα — tangentiell akselerasjon",
            "a_rad = v²/r = rω² — sentripetalakselerasjon (mot sentrum)",
          ]}
        >
          <p className="mb-3">
            Et punkt på et roterende legeme i avstand <InlineLatex latex="r" /> fra aksen har lineær fart <InlineLatex latex="v = r\omega" />. Dette knytter lineær og rotasjonsbevegelse sammen.
          </p>
          <p className="mb-3">
            Akselerasjonen har to komponenter: <InlineLatex latex="a_\text{tan} = r\alpha" /> (langs tangenten, endrer farten) og <InlineLatex latex="a_\text{rad} = r\omega^2" /> (mot sentrum, endrer retningen). Totalakselerasjonen er <InlineLatex latex="a = \sqrt{a_\text{tan}^2 + a_\text{rad}^2}" />.
          </p>
          <p>
            <strong>Nøkkelinnsikt:</strong> Alle punkter på et stivt legeme har <em>samme</em> <InlineLatex latex="\omega" /> og <InlineLatex latex="\alpha" />, men ulik lineær fart <InlineLatex latex="v" /> — punkter lenger fra aksen beveger seg raskere.
          </p>
        </TheorySummary>

        <TheorySummary
          title="9.4 Treghetsmoment og rotasjonsenergi"
          mustKnow={[
            "I = Σ m_i r_i² er rotasjonens svar på masse",
            "Kinetisk rotasjonsenergi: K = ½Iω²",
            "I avhenger av massefordelingen OG valg av rotasjonsakse",
            "Kjenn formlene for disk, ring, stav, kule!",
          ]}
        >
          <p className="mb-3">
            <strong>Treghetsmoment</strong> <InlineLatex latex="I" /> er rotasjonens svar på masse — det beskriver hvor vanskelig det er å endre rotasjonstilstanden. Definisjonen er <InlineLatex latex="I = \sum m_i r_i^2" />, der <InlineLatex latex="r_i" /> er avstand fra masse <InlineLatex latex="m_i" /> til rotasjonsaksen.
          </p>
          <p className="mb-3">
            <strong>Hvorfor I og ikke bare m?</strong> Masse i seg selv er ikke nok — det spiller også rolle <em>hvor</em> massen er. En ring og en disk med samme masse har forskjellig I fordi massen er fordelt ulikt relativt til aksen. Ringen har all masse i maksimal avstand, og er dermed tyngre å rotere.
          </p>
          <p>
            Kinetisk rotasjonsenergi: <InlineLatex latex="K_\text{rot} = \tfrac{1}{2}I\omega^2" /> — analogt med <InlineLatex latex="K = \tfrac{1}{2}mv^2" />.
          </p>
        </TheorySummary>

        <TheorySummary
          title="9.5 Parallellakse-teoremet"
          mustKnow={[
            "I_P = I_CM + Md² — treghetsmoment om vilkårlig parallell akse",
            "I er alltid minst om en akse gjennom massesenteret",
            "d er avstanden mellom CM-aksen og den nye aksen",
          ]}
        >
          <p className="mb-3">
            Parallellakse-teoremet lar deg beregne <InlineLatex latex="I" /> om en vilkårlig akse hvis du kjenner <InlineLatex latex="I_{CM}" /> om en parallell akse gjennom massesenteret:
          </p>
          <p className="mb-3 text-center font-semibold">
            <InlineLatex latex="I_P = I_{CM} + Md^2" />
          </p>
          <p>
            Merk: <InlineLatex latex="I_{CM}" /> er alltid den <em>minste</em> verdien. Enhver forskyvning av aksen <em>øker</em> I med <InlineLatex latex="Md^2" />. Eksempel: Tynn stav om senter har <InlineLatex latex="I = \tfrac{1}{12}ML^2" />, om enden: <InlineLatex latex="I = \tfrac{1}{12}ML^2 + M(\tfrac{L}{2})^2 = \tfrac{1}{3}ML^2" />.
          </p>
        </TheorySummary>
      </div>

      {/* ═══════════ FORMLER ═══════════ */}
      <div id="formler" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Formler</h2>

        <FormulaBox
          variant="gold"
          title="Kinematikk ved konstant vinkelakselerasjon"
          latex="\\begin{aligned} \\omega &= \\omega_0 + \\alpha t \\\\ \\theta &= \\theta_0 + \\omega_0 t + \\tfrac{1}{2}\\alpha t^2 \\\\ \\omega^2 &= \\omega_0^2 + 2\\alpha(\\theta - \\theta_0) \\\\ \\theta - \\theta_0 &= \\tfrac{1}{2}(\\omega_0 + \\omega)t \\end{aligned}"
        />

        <FormulaBox
          variant="gold"
          title="Lineær ↔ vinkelsammenheng"
          latex="\\begin{aligned} v &= r\\omega \\\\ a_\\text{tan} &= r\\alpha \\\\ a_\\text{rad} &= \\frac{v^2}{r} = r\\omega^2 \\end{aligned}"
        />

        <FormulaBox
          variant="gold"
          title="Treghetsmoment og rotasjonsenergi"
          latex="I = \\sum_i m_i r_i^2 \\qquad K_\\text{rot} = \\tfrac{1}{2}I\\omega^2"
        />

        <FormulaBox
          variant="blue"
          title="Treghetsmoment for vanlige former"
          latex="\\begin{aligned} \\text{Massiv disk:}\\; I &= \\tfrac{1}{2}MR^2 &\\quad \\text{Ring:}\\; I &= MR^2 \\\\ \\text{Stav (senter):}\\; I &= \\tfrac{1}{12}ML^2 &\\quad \\text{Stav (ende):}\\; I &= \\tfrac{1}{3}ML^2 \\\\ \\text{Massiv kule:}\\; I &= \\tfrac{2}{5}MR^2 &\\quad \\text{Hul kule:}\\; I &= \\tfrac{2}{3}MR^2 \\end{aligned}"
        />

        <FormulaBox
          variant="gold"
          title="Parallellakse-teoremet"
          latex="I_P = I_{CM} + Md^2"
        />
      </div>

      {/* ═══════════ INTERAKTIVE VISUALISERINGER ═══════════ */}
      <div id="interaktive-visualiseringer" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Interaktive visualiseringer</h2>
        <LinearRotationalAnalogy />
        <MomentOfInertiaVisualizer />
        <ParallelAxisVisualizer />
      </div>

      {/* ═══════════ GJENNOMGÅTTE EKSEMPLER ═══════════ */}
      <div id="gjennomgåtte-eksempler" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Konstant vinkelakselerasjon */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 1: Slipestein med konstant α</h3>
          <p className="text-[var(--muted)] mb-4">
            En slipestein starter fra ro og akselererer med <InlineLatex latex="\alpha = 0{,}60 \text{ rad/s}^2" /> i 8,0 s. Finn (a) vinkelhastigheten, (b) antall omdreininger.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
              <p className="text-sm"><InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="\alpha = 0{,}60 \text{ rad/s}^2" />, <InlineLatex latex="t = 8{,}0 \text{ s}" /></p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2">(a) <InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 0{,}60 \times 8{,}0 = 4{,}8 \text{ rad/s}" /></p>
              <p className="text-sm mb-2">(b) <InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2 = 0 + \tfrac{1}{2}(0{,}60)(8{,}0)^2 = 19{,}2 \text{ rad}" /></p>
              <p className="text-sm"><InlineLatex latex="\text{Omdreininger} = \frac{19{,}2}{2\pi} = 3{,}06 \approx 3{,}1 \text{ omdreininger}" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Formlene er identiske med rettlinjet kinematikk — bare bruk <InlineLatex latex="\theta, \omega, \alpha" /> i stedet for <InlineLatex latex="x, v, a" />. Husk å konvertere omdreininger ↔ radianer!</p>
            </div>
          </div>
        </div>

        {/* Eksempel 2: Lineær-vinkel sammenheng */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 2: CD-spiller</h3>
          <p className="text-[var(--muted)] mb-4">
            En CD med radius 6,0 cm roterer med 200 rpm. Finn (a) vinkelhastigheten i rad/s, (b) lineær fart på kanten, (c) sentripetalakselerasjonen.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
              <p className="text-sm"><InlineLatex latex="R = 0{,}060 \text{ m}" />, <InlineLatex latex="n = 200 \text{ rpm}" /></p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2">(a) <InlineLatex latex="\omega = 200 \times \frac{2\pi}{60} = 20{,}9 \text{ rad/s}" /></p>
              <p className="text-sm mb-2">(b) <InlineLatex latex="v = r\omega = 0{,}060 \times 20{,}9 = 1{,}26 \text{ m/s}" /></p>
              <p className="text-sm">(c) <InlineLatex latex="a_\text{rad} = r\omega^2 = 0{,}060 \times (20{,}9)^2 = 26{,}2 \text{ m/s}^2" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Konverter alltid rpm til rad/s: <InlineLatex latex="\omega = n \times \frac{2\pi}{60}" />. Bruk <InlineLatex latex="v = r\omega" /> for linjefart.</p>
            </div>
          </div>
        </div>

        {/* Eksempel 3: Treghetsmoment beregning */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 3: Treghetsmoment for et system</h3>
          <p className="text-[var(--muted)] mb-4">
            Fire partikler med masse 0,50 kg sitter i hjørnene av et kvadrat med side 0,40 m. Finn treghetsmomentet om en akse gjennom sentrum, vinkelrett på planet.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
              <p className="text-sm"><InlineLatex latex="m = 0{,}50 \text{ kg}" /> per partikkel, side <InlineLatex latex="a = 0{,}40 \text{ m}" /></p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2">Avstand fra sentrum til hjørne: <InlineLatex latex="r = \frac{a\sqrt{2}}{2} = \frac{0{,}40\sqrt{2}}{2} = 0{,}283 \text{ m}" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="I = \sum m_i r_i^2 = 4 \times 0{,}50 \times (0{,}283)^2 = 0{,}16 \text{ kg·m}^2" /></p>
              <p className="text-sm">Alternativt: <InlineLatex latex="I = 4m \cdot \frac{a^2}{2} = 4 \times 0{,}50 \times \frac{(0{,}40)^2}{2} = 0{,}16 \text{ kg·m}^2" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Finn avstand <InlineLatex latex="r" /> fra aksen til hvert masseelement, bruk <InlineLatex latex="I = \sum m_i r_i^2" />. Symmetri forenkler ofte regnestykket.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ OPPGAVESTRATEGIER ═══════════ */}
      <div id="oppgavestrategier" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Oppgavestrategier</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <h3 className="font-semibold text-lg mb-3">Strategi: Kinematikk-oppgaver (konstant α)</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser kjente og ukjente (<InlineLatex latex="\theta_0, \omega_0, \alpha, t, \theta, \omega" />)</li>
            <li>Velg riktig kinematikkformel (som i kap 2, bare rotasjonsversjonen)</li>
            <li>Konverter enheter: rpm → rad/s, omdreininger → rad</li>
            <li>Løs for den ukjente</li>
            <li>Sjekk: Stemmer fortegn? Er svaret rimelig?</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <h3 className="font-semibold text-lg mb-3">Strategi: Treghetsmoment-oppgaver</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser formen (disk, stav, kule, ring) → velg riktig <InlineLatex latex="I" />-formel</li>
            <li>Sjekk rotasjonsaksen — er den gjennom CM eller forskjøvet?</li>
            <li>Hvis forskjøvet: bruk parallellakseteoremet <InlineLatex latex="I_P = I_{CM} + Md^2" /></li>
            <li>Sammensatt legeme: <InlineLatex latex="I_\text{tot} = I_1 + I_2 + \ldots" /> (om SAMME akse)</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-400">
            <li>Glemmer å konvertere rpm til rad/s eller omdreininger til rad</li>
            <li>Bruker feil formel for I (f.eks. disk-formelen for en ring)</li>
            <li>Forveksler <InlineLatex latex="r" /> (avstand fra akse) med <InlineLatex latex="R" /> (radius til legemet)</li>
            <li>Bruker parallellakseteoremet med en akse som IKKE er gjennom CM som utgangspunkt</li>
            <li>Glemmer at <InlineLatex latex="v = r\omega" /> krever at <InlineLatex latex="\omega" /> er i rad/s</li>
          </ul>
        </div>
      </div>

      {/* ═══════════ ØVINGSOPPGAVER ═══════════ */}
      <div id="øvingsoppgaver" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Øvingsoppgaver</h2>

        <ExerciseCard
          number={1}
          title="Roterende hjul"
          difficulty="lett"
          source="Oppgave 9.1"
          problem={<p>Et hjul akselererer fra ro med <InlineLatex latex="\alpha = 3{,}0 \text{ rad/s}^2" />. (a) Finn vinkelhastigheten etter 4,0 s. (b) Hvor mange omdreininger har hjulet gjort?</p>}
          hints={[
            { label: "Hint 1", content: "Start med ω = ω₀ + αt for (a)" },
            { label: "Hint 2", content: "Bruk Δθ = ω₀t + ½αt² for (b), konverter til omdreininger" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p>(a) <InlineLatex latex="\omega = 0 + 3{,}0 \times 4{,}0 = 12 \text{ rad/s}" /></p>
              <p>(b) <InlineLatex latex="\Delta\theta = 0 + \tfrac{1}{2}(3{,}0)(4{,}0)^2 = 24 \text{ rad} = \frac{24}{2\pi} = 3{,}8 \text{ omdreininger}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Bremseplate"
          difficulty="middels"
          source="Oppgave 9.7"
          problem={<p>Et svinghjul roterer med 500 rpm og bremses til stillstand på 30,0 s. (a) Finn vinkelakselerasjonen. (b) Hvor mange omdreininger gjør det mens det bremser?</p>}
          hints={[
            { label: "Hint 1", content: "Konverter: ω₀ = 500 × 2π/60 rad/s, ω = 0" },
            { label: "Hint 2", content: "α = (ω − ω₀)/t. For (b) bruk Δθ = ½(ω₀+ω)t" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="\omega_0 = 500 \times \frac{2\pi}{60} = 52{,}4 \text{ rad/s}" /></p>
              <p>(a) <InlineLatex latex="\alpha = \frac{0 - 52{,}4}{30{,}0} = -1{,}75 \text{ rad/s}^2" /></p>
              <p>(b) <InlineLatex latex="\Delta\theta = \tfrac{1}{2}(52{,}4 + 0)(30{,}0) = 786 \text{ rad} = 125 \text{ omdreininger}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Treghetsmoment med parallellakseteoremet"
          difficulty="middels"
          source="Oppgave 9.38"
          problem={<p>En tynn stav med masse 2,0 kg og lengde 1,2 m roterer om en akse 0,30 m fra ene enden. Finn treghetsmomentet.</p>}
          hints={[
            { label: "Hint 1", content: "Finn først I om CM (midten av staven): I_CM = (1/12)ML²" },
            { label: "Hint 2", content: "Finn avstand d fra CM til den nye aksen. CM er i midten (0,60 m fra enden), aksen er 0,30 m fra enden → d = 0,30 m" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="I_{CM} = \tfrac{1}{12}ML^2 = \tfrac{1}{12}(2{,}0)(1{,}2)^2 = 0{,}24 \text{ kg·m}^2" /></p>
              <p>Avstand: <InlineLatex latex="d = 0{,}60 - 0{,}30 = 0{,}30 \text{ m}" /></p>
              <p><InlineLatex latex="I_P = I_{CM} + Md^2 = 0{,}24 + 2{,}0 \times (0{,}30)^2 = 0{,}24 + 0{,}18 = 0{,}42 \text{ kg·m}^2" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={4}
          title="Rotasjonsenergi"
          difficulty="middels"
          source="Oppgave 9.44"
          problem={<p>Et svinghjul (massiv sylinder) med masse 40 kg og radius 0,20 m roterer med 3000 rpm. Hvor mye kinetisk energi er lagret?</p>}
          hints={[
            { label: "Hint 1", content: "I = ½MR² for massiv sylinder" },
            { label: "Hint 2", content: "Konverter til rad/s, bruk K = ½Iω²" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="I = \tfrac{1}{2}(40)(0{,}20)^2 = 0{,}80 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="\omega = 3000 \times \frac{2\pi}{60} = 314 \text{ rad/s}" /></p>
              <p><InlineLatex latex="K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(0{,}80)(314)^2 = 39{,}5 \text{ kJ}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={5}
          title="Kombinert rotasjon og translasjon"
          difficulty="vanskelig"
          source="Oppgave 9.64"
          problem={<p>Et tau er kveilet rundt en massiv sylinder (M = 50 kg, R = 0,10 m). Tauet trekkes med en kraft F = 9,0 N. Sylinderen starter fra ro. (a) Finn vinkelakselerasjonen. (b) Finn vinkelhastigheten etter 2,0 s.</p>}
          hints={[
            { label: "Hint 1", content: "Kraftmomentet er τ = FR (kraften virker tangentielt i avstand R)" },
            { label: "Hint 2", content: "Bruk τ = Iα der I = ½MR² for å finne α" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(50)(0{,}10)^2 = 0{,}25 \text{ kg·m}^2" /></p>
              <p>(a) <InlineLatex latex="\tau = FR = 9{,}0 \times 0{,}10 = 0{,}90 \text{ N·m}" /></p>
              <p><InlineLatex latex="\alpha = \frac{\tau}{I} = \frac{0{,}90}{0{,}25} = 3{,}6 \text{ rad/s}^2" /></p>
              <p>(b) <InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 3{,}6 \times 2{,}0 = 7{,}2 \text{ rad/s}" /></p>
            </div>
          }
        />
      </div>

      {/* ═══════════ EKSAMENSOPPGAVER ═══════════ */}
      <div id="eksamensoppgaver" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Eksamensoppgaver</h2>

        <div className="rounded-xl border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 p-4 mb-6">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Eksamenstips</p>
          <p className="text-sm text-[var(--muted)]">Treghetsmoment og kinematikk er basis for kapittel 10-oppgaver. Sørg for at du kan alle I-formlene og parallellakseteoremet — de dukker opp i nesten alle rotasjonsoppgaver på eksamen.</p>
        </div>

        <ExerciseCard
          number={1}
          title="Eksamensoppgave: Sammensatt treghetsmoment"
          difficulty="vanskelig"
          source="Basert på tidligere eksamener"
          problem={
            <div>
              <p className="mb-2">En anordning består av en tynn stav (masse M = 4,0 kg, lengde L = 1,0 m) med en liten kule (masse m = 2,0 kg) festet i ene enden. Staven roterer om den andre enden.</p>
              <p>(a) Finn det totale treghetsmomentet om rotasjonsaksen.</p>
              <p>(b) Staven slippes fra horisontal posisjon. Finn vinkelhastigheten når staven er vertikal (bruk energibevaring).</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: "I_tot = I_stav(ende) + I_kule. Kulen er i avstand L fra aksen: I_kule = mL²" },
            { label: "Hint 2", content: "Energibevaring: Potensielt tap = rotasjonsenergi. CM av staven faller L/2, kulen faller L." },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p className="font-semibold">a) Treghetsmoment:</p>
              <p><InlineLatex latex="I_\text{stav} = \tfrac{1}{3}ML^2 = \tfrac{1}{3}(4{,}0)(1{,}0)^2 = 1{,}33 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="I_\text{kule} = mL^2 = 2{,}0 \times (1{,}0)^2 = 2{,}0 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="I_\text{tot} = 1{,}33 + 2{,}0 = 3{,}33 \text{ kg·m}^2" /></p>
              <p className="font-semibold mt-3">b) Energibevaring:</p>
              <p><InlineLatex latex="Mg\frac{L}{2} + mgL = \tfrac{1}{2}I_\text{tot}\omega^2" /></p>
              <p><InlineLatex latex="4{,}0 \times 9{,}81 \times 0{,}50 + 2{,}0 \times 9{,}81 \times 1{,}0 = \tfrac{1}{2}(3{,}33)\omega^2" /></p>
              <p><InlineLatex latex="19{,}62 + 19{,}62 = 1{,}667\omega^2" /></p>
              <p><InlineLatex latex="\omega = \sqrt{\frac{39{,}24}{1{,}667}} = 4{,}85 \text{ rad/s}" /></p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
