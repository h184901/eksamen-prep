"use client";

import { useState } from "react";
import InlineLatex from "@/components/InlineLatex";

/* ─── Interactive: Faradays lov — indusert ems ─── */
export function FaradayCalculator() {
  const [bField, setBField] = useState(0.5); // T
  const [area, setArea] = useState(100); // cm²
  const [angleDeg, setAngleDeg] = useState(0); // degrees between B and normal
  const [dBdt, setDbdt] = useState(0.02); // T/s
  const [nTurns, setNTurns] = useState(1);

  const areaM2 = area * 1e-4;
  const angleRad = (angleDeg * Math.PI) / 180;
  const flux = bField * areaM2 * Math.cos(angleRad);
  const emf = nTurns * areaM2 * Math.cos(angleRad) * dBdt;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Faradays lov — Indusert EMF fra endring i B</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">B-felt (T)</label>
          <input type="range" min={0.01} max={2} step={0.01} value={bField} onChange={(e) => setBField(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{bField.toFixed(2)} T</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Areal A (cm²)</label>
          <input type="range" min={1} max={500} step={1} value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{area} cm² = {areaM2.toFixed(4)} m²</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Vinkel φ (B vs. normal)</label>
          <input type="range" min={0} max={90} step={1} value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{angleDeg}° → cos φ = {Math.cos(angleRad).toFixed(3)}</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">dB/dt (T/s)</label>
          <input type="range" min={0.001} max={1} step={0.001} value={dBdt} onChange={(e) => setDbdt(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{dBdt.toFixed(3)} T/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Antall vindinger N</label>
          <input type="range" min={1} max={1000} step={1} value={nTurns} onChange={(e) => setNTurns(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{nTurns}</p>
        </div>
      </div>

      {/* SVG showing loop in B-field */}
      <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto mb-4">
        {/* B-field arrows */}
        {[60, 120, 180, 240, 300, 350].map((x) =>
          [30, 70, 110, 150].map((y) => (
            <g key={`${x}-${y}`}>
              <line x1={x} y1={y} x2={x + 20} y2={y} stroke="#3b82f6" strokeWidth="1" opacity="0.3" markerEnd="url(#far-b)" />
            </g>
          ))
        )}
        <text x="375" y="22" fill="#3b82f6" fontSize="11" fontWeight="bold">B →</text>

        {/* Loop (tilted based on angle) */}
        {(() => {
          const cx = 200;
          const cy = 90;
          const rx = 50;
          const ry = 50 * Math.cos(angleRad);
          return (
            <g>
              <ellipse cx={cx} cy={cy} rx={rx} ry={Math.max(5, ry)} fill="none" stroke="#f97316" strokeWidth="2.5" />
              {/* Normal vector */}
              <line
                x1={cx}
                y1={cy}
                x2={cx + 40 * Math.cos(angleRad)}
                y2={cy - 40 * Math.sin(angleRad)}
                stroke="#22c55e"
                strokeWidth="2"
                markerEnd="url(#far-n)"
              />
              <text
                x={cx + 45 * Math.cos(angleRad)}
                y={cy - 45 * Math.sin(angleRad)}
                fill="#22c55e"
                fontSize="11"
                fontWeight="bold"
              >
                A⃗
              </text>

              {/* Angle arc */}
              {angleDeg > 5 && (
                <path
                  d={`M ${cx + 20} ${cy} A 20 20 0 0 0 ${cx + 20 * Math.cos(angleRad)} ${cy - 20 * Math.sin(angleRad)}`}
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="1"
                />
              )}
              {angleDeg > 10 && (
                <text x={cx + 25} y={cy - 5} fill="var(--muted)" fontSize="9">φ</text>
              )}
            </g>
          );
        })()}

        <defs>
          <marker id="far-b" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L5,2 L0,4" fill="#3b82f6" />
          </marker>
          <marker id="far-n" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Magnetisk fluks Φ_B</p>
          <p className="text-lg font-bold">{flux < 0.001 ? (flux * 1000).toFixed(3) + " mWb" : flux.toFixed(4) + " Wb"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">|dΦ/dt|</p>
          <p className="text-lg font-bold">{(areaM2 * Math.cos(angleRad) * dBdt).toExponential(2)} Wb/s</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">Indusert |ε| (N={nTurns})</p>
          <p className="text-lg font-bold">{emf < 0.001 ? (emf * 1000).toFixed(2) + " mV" : emf.toFixed(4) + " V"}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: Leder i bevegelse (stav på skinner) ─── */
export function MovingConductorVisualizer() {
  const [bField, setBField] = useState(0.6); // T
  const [length, setLength] = useState(10); // cm
  const [velocity, setVelocity] = useState(2.5); // m/s
  const [resistance, setResistance] = useState(0.03); // Ω

  const L = length * 0.01;
  const emf = bField * L * velocity;
  const current = emf / resistance;
  const power = emf * emf / resistance;

  // Animation: position of bar
  const [barPos, setBarPos] = useState(50);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Leder i bevegelse — Stav på skinner i B-felt</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">B-felt (T) — inn i arket</label>
          <input type="range" min={0.1} max={2} step={0.1} value={bField} onChange={(e) => setBField(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{bField.toFixed(1)} T</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Stavlengde L (cm)</label>
          <input type="range" min={1} max={50} step={1} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{length} cm = {L.toFixed(2)} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Fart v (m/s)</label>
          <input type="range" min={0.1} max={10} step={0.1} value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{velocity.toFixed(1)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Resistans R (Ω)</label>
          <input type="range" min={0.01} max={1} step={0.01} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{resistance.toFixed(2)} Ω</p>
        </div>
      </div>

      {/* Slider for bar position */}
      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1 text-center">Dra staven →</label>
        <input type="range" min={20} max={90} step={1} value={barPos} onChange={(e) => setBarPos(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
      </div>

      <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto mb-4">
        {/* B-field crosses */}
        {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) =>
          [30, 60, 90, 120, 150, 180].map((y) => (
            <g key={`${x}-${y}`}>
              <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} stroke="#3b82f6" strokeWidth="0.7" opacity="0.2" />
              <line x1={x + 4} y1={y - 4} x2={x - 4} y2={y + 4} stroke="#3b82f6" strokeWidth="0.7" opacity="0.2" />
            </g>
          ))
        )}
        <text x="370" y="18" fill="#3b82f6" fontSize="10" fontWeight="bold">B ⊗</text>

        {/* Rails (top and bottom horizontal lines) */}
        <line x1="30" y1="40" x2="370" y2="40" stroke="var(--muted)" strokeWidth="2.5" />
        <line x1="30" y1="170" x2="370" y2="170" stroke="var(--muted)" strokeWidth="2.5" />

        {/* Left end (resistor) */}
        <line x1="30" y1="40" x2="30" y2="170" stroke="var(--muted)" strokeWidth="2.5" />
        <text x="17" y="110" fill="var(--muted)" fontSize="11" textAnchor="middle">R</text>

        {/* Moving bar */}
        {(() => {
          const bx = 30 + (barPos / 100) * 340;
          return (
            <g>
              <line x1={bx} y1="35" x2={bx} y2="175" stroke="#f97316" strokeWidth="4" />

              {/* Velocity arrow */}
              <line x1={bx + 5} y1="105" x2={bx + 35} y2="105" stroke="#22c55e" strokeWidth="2" markerEnd="url(#mc-v)" />
              <text x={bx + 40} y="109" fill="#22c55e" fontSize="11" fontWeight="bold">v</text>

              {/* Current direction (counterclockwise for B into page, bar moving right) */}
              <text x={bx - 12} y="55" fill="#ef4444" fontSize="10">↑ I</text>
              <text x={(30 + bx) / 2} y="35" fill="#ef4444" fontSize="10" textAnchor="middle">← I</text>
            </g>
          );
        })()}

        {/* Length label */}
        <line x1="25" y1="40" x2="25" y2="170" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3" />
        <text x="12" y="110" fill="var(--accent)" fontSize="10" textAnchor="middle">L</text>

        <defs>
          <marker id="mc-v" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Indusert EMF |ε| = BLv</p>
          <p className="text-lg font-bold">{emf < 0.01 ? (emf * 1000).toFixed(1) + " mV" : emf.toFixed(3) + " V"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">Strøm I = ε/R</p>
          <p className="text-lg font-bold">{current < 1 ? (current * 1000).toFixed(0) + " mA" : current.toFixed(2) + " A"}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">Effekt P = ε²/R</p>
          <p className="text-lg font-bold">{power < 1 ? (power * 1000).toFixed(1) + " mW" : power.toFixed(2) + " W"}</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Staven beveger seg til høyre → arealet øker → fluksen øker → indusert ems motvirker økningen (Lenz&apos; lov) → strøm mot klokka.
      </p>
    </div>
  );
}

/* ─── Interactive: Roterende spole (vekselstrøm) ─── */
export function ACGeneratorVisualizer() {
  const [nTurns, setNTurns] = useState(500);
  const [bField, setBField] = useState(0.2); // T
  const [radius, setRadius] = useState(4); // cm
  const [omega, setOmega] = useState(50); // rad/s
  const [time, setTime] = useState(0); // phase

  const R = radius * 0.01;
  const A = Math.PI * R * R;
  const emfMax = nTurns * A * bField * omega;
  const emfNow = emfMax * Math.sin(omega * time);
  const fluxNow = nTurns * A * bField * Math.cos(omega * time);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Roterende spole — Vekselstrømgenerator</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">N vindinger</label>
          <input type="range" min={1} max={1000} step={1} value={nTurns} onChange={(e) => setNTurns(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{nTurns}</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">B-felt (T)</label>
          <input type="range" min={0.01} max={1} step={0.01} value={bField} onChange={(e) => setBField(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{bField.toFixed(2)} T</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Radius r (cm)</label>
          <input type="range" min={1} max={20} step={0.5} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{radius} cm</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Vinkelfart ω (rad/s)</label>
          <input type="range" min={1} max={500} step={1} value={omega} onChange={(e) => setOmega(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{omega} rad/s</p>
        </div>
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="text-sm text-[var(--muted)] block mb-1">Tid t (s) — dra for å se endring</label>
          <input type="range" min={0} max={0.5} step={0.001} value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">t = {time.toFixed(3)} s → ωt = {((omega * time) % (2 * Math.PI)).toFixed(2)} rad</p>
        </div>
      </div>

      {/* Sinusoidal EMF visualization */}
      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto mb-4">
        {/* Axes */}
        <line x1="40" y1="60" x2="380" y2="60" stroke="var(--muted)" strokeWidth="1" />
        <line x1="40" y1="10" x2="40" y2="110" stroke="var(--muted)" strokeWidth="1" />
        <text x="385" y="64" fill="var(--muted)" fontSize="9">t</text>
        <text x="30" y="15" fill="var(--muted)" fontSize="9">ε</text>

        {/* Sine wave */}
        <path
          d={Array.from({ length: 340 }, (_, i) => {
            const t = (i / 340) * 0.5;
            const y = 60 - 40 * Math.sin(omega * t);
            return `${i === 0 ? "M" : "L"} ${40 + i} ${y}`;
          }).join(" ")}
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
        />

        {/* Current time marker */}
        {(() => {
          const tx = 40 + (time / 0.5) * 340;
          const ty = 60 - 40 * Math.sin(omega * time);
          return (
            <g>
              <line x1={tx} y1="10" x2={tx} y2="110" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3" opacity="0.5" />
              <circle cx={tx} cy={ty} r="4" fill="#f97316" />
            </g>
          );
        })()}

        {/* Labels */}
        <text x="45" y="22" fill="#f97316" fontSize="9">+ε_max</text>
        <text x="45" y="108" fill="#f97316" fontSize="9">−ε_max</text>
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">ε_max = NABω</p>
          <p className="text-lg font-bold">{emfMax < 1 ? (emfMax * 1000).toFixed(1) + " mV" : emfMax.toFixed(2) + " V"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">ε(t) nå</p>
          <p className="text-lg font-bold">{Math.abs(emfNow) < 1 ? (emfNow * 1000).toFixed(1) + " mV" : emfNow.toFixed(2) + " V"}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">Φ(t) nå</p>
          <p className="text-lg font-bold">{Math.abs(fluxNow) < 0.01 ? (fluxNow * 1000).toFixed(2) + " mWb" : fluxNow.toFixed(4) + " Wb"}</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        <InlineLatex latex="\mathcal{E} = NAB\omega\sin(\omega t)" /> — Spenningen varierer sinusformig. Dette er prinsippet bak <strong>vekselstrøm</strong>.
      </p>
    </div>
  );
}
