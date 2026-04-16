"use client";

import { useState } from "react";
import InlineLatex from "@/components/InlineLatex";

/* ─── Interaktiv analogi-tabell: Lineær ↔ Rotasjon ─── */
export function LinearRotationalAnalogy() {
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
    { linear: "E_k = \\tfrac{1}{2}mv^2", linDesc: "Kinetisk energi", rot: "E_k = \\tfrac{1}{2}I\\omega^2", rotDesc: "Rotasjonsenergi", unit: "J ↔ J" },
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
export function MomentOfInertiaVisualizer() {
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
        Sammenlign ring (<InlineLatex latex="I = MR^2" />) med massiv disk (<InlineLatex latex="I = \tfrac{1}{2}MR^2" />) — ringen har dobbelt så stort I!
      </p>
    </div>
  );
}

/* ─── Interaktiv: Parallellakse-teoremet ─── */
export function ParallelAxisVisualizer() {
  const [dVal, setDVal] = useState(0.3);
  const mass = 4.0;
  const R = 0.2;
  const Icm = 0.5 * mass * R * R;
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
