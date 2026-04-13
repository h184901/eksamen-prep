"use client";

import { useState } from "react";
import FormulaBox from "@/components/FormulaBox";

/* ─── Kraftdekomponering ─── */
export function KraftDekomponering() {
  const [F, setF] = useState(250);
  const [angle, setAngle] = useState(53);

  const rad = (angle * Math.PI) / 180;
  const Fx = F * Math.cos(rad);
  const Fy = F * Math.sin(rad);
  const Fmag = Math.sqrt(Fx * Fx + Fy * Fy);

  const cx = 200, cy = 160;
  const scale = 0.4;
  const tipX = cx + Fx * scale;
  const tipY = cy - Fy * scale;
  const compXtip = cx + Fx * scale;
  const compYtip = cy - Fy * scale;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">
        Kraftdekomponering — Splitt en kraft i komponenter
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Kraftens størrelse F (N)
          </label>
          <input
            type="range" min={10} max={500} step={10} value={F}
            onChange={(e) => setF(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{F} N</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Vinkel med x-aksen (grader)
          </label>
          <input
            type="range" min={0} max={90} step={1} value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <svg viewBox="0 0 400 320" className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <defs>
            <marker id="arr-f" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#f97316" />
            </marker>
            <marker id="arr-fx" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
            </marker>
            <marker id="arr-fy" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
            </marker>
          </defs>
          {/* Axes */}
          <line x1="30" y1={cy} x2="380" y2={cy} stroke="var(--muted)" strokeWidth="1" />
          <line x1={cx} y1="10" x2={cx} y2="310" stroke="var(--muted)" strokeWidth="1" />
          <text x="385" y={cy + 4} fontSize="12" fill="var(--muted)">x</text>
          <text x={cx + 4} y="14" fontSize="12" fill="var(--muted)">y</text>

          {/* Fx component (blue, dashed) */}
          <line x1={cx} y1={cy} x2={compXtip} y2={cy}
            stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#arr-fx)" />
          <text x={(cx + compXtip) / 2} y={cy + 20} fontSize="11" fill="#3b82f6" textAnchor="middle">
            Fx = {Fx.toFixed(0)} N
          </text>

          {/* Fy component (green, dashed) */}
          <line x1={compXtip} y1={cy} x2={compXtip} y2={compYtip}
            stroke="#22c55e" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#arr-fy)" />
          <text x={compXtip + 15} y={(cy + compYtip) / 2} fontSize="11" fill="#22c55e">
            Fy = {Fy.toFixed(0)} N
          </text>

          {/* F vector (orange) */}
          <line x1={cx} y1={cy} x2={tipX} y2={tipY}
            stroke="#f97316" strokeWidth="3" markerEnd="url(#arr-f)" />
          <text x={(cx + tipX) / 2 - 30} y={(cy + tipY) / 2 - 5} fontSize="12" fill="#f97316" fontWeight="bold">
            F = {Fmag.toFixed(0)} N
          </text>

          {/* Angle arc */}
          {angle > 0 && (
            <>
              <path
                d={`M ${cx + 40} ${cy} A 40 40 0 0 0 ${cx + 40 * Math.cos(rad)} ${cy - 40 * Math.sin(rad)}`}
                fill="none" stroke="var(--muted)" strokeWidth="1"
              />
              <text x={cx + 50} y={cy - 10} fontSize="11" fill="var(--muted)">{angle}°</text>
            </>
          )}
        </svg>

        <div className="space-y-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-2">Komponenter</p>
            <p className="font-mono text-sm">Fx = F cos({angle}°) = <strong>{Fx.toFixed(1)} N</strong></p>
            <p className="font-mono text-sm">Fy = F sin({angle}°) = <strong>{Fy.toFixed(1)} N</strong></p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-2">Verifisering</p>
            <p className="font-mono text-sm">
              |F| = √(Fx² + Fy²) = √({Fx.toFixed(0)}² + {Fy.toFixed(0)}²) = <strong>{Fmag.toFixed(1)} N</strong>
            </p>
            <p className="font-mono text-sm">
              θ = tan⁻¹(Fy/Fx) = tan⁻¹({Fy.toFixed(0)}/{Fx.toFixed(0)}) = <strong>{(Math.atan2(Fy, Fx) * 180 / Math.PI).toFixed(1)}°</strong>
            </p>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Dra i sliderne for å endre kraft og vinkel. Legg merke til hvordan komponentene endres.
            Ved 0° er all kraft langs x-aksen. Ved 90° er all kraft langs y-aksen.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Tyngde på jord vs. måne ─── */
export function TyngdeKalkulator() {
  const [masse, setMasse] = useState(75);
  const gJord = 9.81;
  const gMaane = 1.6;
  const Gj = masse * gJord;
  const Gm = masse * gMaane;

  const maxG = 120 * gJord;
  const barJord = (Gj / maxG) * 200;
  const barMaane = (Gm / maxG) * 200;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Masse vs. tyngde — Jorda og månen</h3>
      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1">Masse (kg)</label>
        <input
          type="range" min={1} max={120} step={1} value={masse}
          onChange={(e) => setMasse(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <p className="text-center text-sm font-mono mt-1">{masse} kg</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Jorda (g = 9,81 m/s²)</p>
          <svg viewBox="0 0 220 120" className="w-full max-w-[220px] mx-auto">
            <rect x="10" y="80" width={barJord} height="30" fill="#f97316" rx="4" />
            <text x={Math.max(barJord / 2 + 10, 40)} y="100" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
              {Gj.toFixed(0)} N
            </text>
            {/* Person icon */}
            <circle cx="110" cy="30" r="12" fill="var(--muted)" opacity="0.5" />
            <line x1="110" y1="42" x2="110" y2="65" stroke="var(--muted)" strokeWidth="2" opacity="0.5" />
            {/* Weight arrow */}
            <line x1="110" y1="65" x2="110" y2="78" stroke="#f97316" strokeWidth="2.5" />
            <polygon points="105,78 115,78 110,85" fill="#f97316" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-2">Månen (g = 1,6 m/s²)</p>
          <svg viewBox="0 0 220 120" className="w-full max-w-[220px] mx-auto">
            <rect x="10" y="80" width={barMaane} height="30" fill="#3b82f6" rx="4" />
            <text x={Math.max(barMaane / 2 + 10, 40)} y="100" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
              {Gm.toFixed(0)} N
            </text>
            <circle cx="110" cy="30" r="12" fill="var(--muted)" opacity="0.5" />
            <line x1="110" y1="42" x2="110" y2="65" stroke="var(--muted)" strokeWidth="2" opacity="0.5" />
            <line x1="110" y1="65" x2="110" y2="78" stroke="#3b82f6" strokeWidth="2.5" />
            <polygon points="105,78 115,78 110,85" fill="#3b82f6" />
          </svg>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm text-center">
        <p>Massen er den <strong>samme</strong> overalt: <strong>{masse} kg</strong></p>
        <p>Tyngden er <strong>forskjellig</strong>: {Gj.toFixed(0)} N på jorda vs. {Gm.toFixed(0)} N på månen</p>
        <p className="text-[var(--muted)]">Tyngden på månen er bare {((Gm / Gj) * 100).toFixed(0)}% av tyngden på jorda!</p>
      </div>
    </div>
  );
}

/* ─── Fritt-legeme-diagram ─── */
export function FrittLegemeDiagram() {
  const [scenario, setScenario] = useState<"ro" | "akselererer" | "skraaplan">("ro");

  const scenarios = {
    ro: {
      label: "Kloss i ro på bord",
      forces: [
        { name: "N", x: 0, y: -60, color: "#3b82f6", desc: "Normalkraft (fra bordet)" },
        { name: "G", x: 0, y: 60, color: "#ef4444", desc: "Tyngdekraft (fra jorda)" },
      ],
      eq: "\\sum F_y = N - G = 0 \\;\\Rightarrow\\; N = G = mg",
      info: "Klossen er i ro → ΣF = 0. Normalkraften balanserer tyngden.",
    },
    akselererer: {
      label: "Kloss dyttes horisontalt",
      forces: [
        { name: "N", x: 0, y: -60, color: "#3b82f6", desc: "Normalkraft" },
        { name: "G", x: 0, y: 60, color: "#ef4444", desc: "Tyngdekraft" },
        { name: "F", x: 70, y: 0, color: "#f97316", desc: "Dyttekraft" },
      ],
      eq: "\\sum F_x = F = ma, \\quad \\sum F_y = N - mg = 0",
      info: "Klossen akselererer mot høyre. Vertikalt er det likevekt.",
    },
    skraaplan: {
      label: "Kloss på skråplan (friksjonsløst)",
      forces: [
        { name: "N", x: -42, y: -42, color: "#3b82f6", desc: "Normalkraft (vinkelrett på planet)" },
        { name: "G", x: 0, y: 60, color: "#ef4444", desc: "Tyngdekraft (loddrett ned)" },
      ],
      eq: "\\sum F_x = mg\\sin\\alpha = ma, \\quad \\sum F_y = N - mg\\cos\\alpha = 0",
      info: "Aksene roteres langs planet. Tyngden dekomponeres i to komponenter.",
    },
  };

  const s = scenarios[scenario];

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Fritt-legeme-diagram — Velg scenario</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
          <button key={key} onClick={() => setScenario(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              scenario === key
                ? "bg-[var(--accent)] text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-[var(--foreground)] hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {scenarios[key].label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <svg viewBox="0 0 300 260" className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <defs>
            <marker id="fbd-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="context-stroke" />
            </marker>
          </defs>

          {/* Object */}
          <rect x="125" y="105" width="50" height="50" fill="var(--card-border)" stroke="var(--muted)" strokeWidth="1.5" rx="4" />
          <text x="150" y="135" fontSize="12" fill="var(--foreground)" textAnchor="middle">m</text>

          {/* Forces */}
          {s.forces.map((f, i) => {
            const ox = 150, oy = 130;
            return (
              <g key={i}>
                <line x1={ox} y1={oy} x2={ox + f.x} y2={oy + f.y}
                  stroke={f.color} strokeWidth="3" markerEnd="url(#fbd-arr)" />
                <text x={ox + f.x * 1.25} y={oy + f.y * 1.25 + 4}
                  fontSize="14" fill={f.color} fontWeight="bold" textAnchor="middle">
                  {f.name}
                </text>
              </g>
            );
          })}

          {/* Ground or incline */}
          {scenario !== "skraaplan" ? (
            <line x1="50" y1="156" x2="250" y2="156" stroke="var(--muted)" strokeWidth="2" />
          ) : (
            <line x1="50" y1="220" x2="250" y2="100" stroke="var(--muted)" strokeWidth="2" />
          )}
        </svg>

        <div className="space-y-3">
          <div className="space-y-1">
            {s.forces.map((f, i) => (
              <p key={i} className="text-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                <strong>{f.name}</strong>: {f.desc}
              </p>
            ))}
          </div>
          <FormulaBox latex={s.eq} variant="blue" />
          <p className="text-sm text-[var(--muted)]">{s.info}</p>
        </div>
      </div>
    </div>
  );
}
