"use client";

import { useState } from "react";

/* ─── Energibevaring-visualisering ─── */
export function EnergyConservationVisualizer() {
  const [height, setHeight] = useState(10);
  const [mass, setMass] = useState(2.0);
  const [position, setPosition] = useState(100); // 0=bunn, 100=topp
  const g = 9.81;

  const currentH = (position / 100) * height;
  const totalE = mass * g * height;
  const ep = mass * g * currentH;
  const ek = totalE - ep;
  const v = Math.sqrt(2 * g * (height - currentH));

  const barHeight = 120;
  const epBar = (ep / totalE) * barHeight;
  const ekBar = (ek / totalE) * barHeight;

  // Ball position on slope
  const ballX = 50 + (1 - position / 100) * 280;
  const ballY = 30 + (1 - position / 100) * 100;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Energibevaring — Ball på friksjonsfritt skråplan</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Høyde h (m)</label>
          <input
            type="range" min={1} max={30} step={0.5} value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{height.toFixed(1)} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse m (kg)</label>
          <input
            type="range" min={0.5} max={10} step={0.5} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{mass.toFixed(1)} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Posisjon (topp → bunn)</label>
          <input
            type="range" min={0} max={100} value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{(100 - position)}% ned</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {/* Slope visualization */}
        <svg viewBox="0 0 360 160" className="w-full max-w-sm">
          {/* Slope */}
          <polygon points="40,30 340,130 40,130" fill="var(--card-border)" opacity="0.3" />
          <line x1="40" y1="30" x2="340" y2="130" stroke="var(--muted)" strokeWidth="2" />
          <line x1="40" y1="130" x2="340" y2="130" stroke="var(--muted)" strokeWidth="2" />
          {/* Height line */}
          <line x1="40" y1="30" x2="40" y2="130" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
          <text x="25" y="85" fill="#3b82f6" fontSize="11" textAnchor="middle">h</text>
          {/* Ball */}
          <circle cx={ballX} cy={ballY} r="10" fill="var(--accent)" />
          {/* Labels */}
          <text x="40" y="20" fill="var(--muted)" fontSize="10" textAnchor="middle">Topp</text>
          <text x="340" y="148" fill="var(--muted)" fontSize="10" textAnchor="middle">Bunn</text>
        </svg>

        {/* Energy bars */}
        <div className="flex gap-6 items-end">
          <div className="text-center">
            <div className="w-14 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg relative" style={{ height: `${barHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-200"
                style={{ height: `${epBar}px` }}
              />
            </div>
            <p className="text-xs mt-1 font-semibold text-blue-600 dark:text-blue-400">E<sub>P</sub></p>
            <p className="text-xs font-mono">{ep.toFixed(0)} J</p>
          </div>
          <div className="text-center">
            <div className="w-14 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg relative" style={{ height: `${barHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-amber-500 rounded-t-lg transition-all duration-200"
                style={{ height: `${ekBar}px` }}
              />
            </div>
            <p className="text-xs mt-1 font-semibold text-amber-600 dark:text-amber-400">E<sub>K</sub></p>
            <p className="text-xs font-mono">{ek.toFixed(0)} J</p>
          </div>
          <div className="text-center">
            <div className="w-14 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg relative" style={{ height: `${barHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all duration-200"
                style={{ height: `${barHeight}px` }}
              />
            </div>
            <p className="text-xs mt-1 font-semibold text-green-600 dark:text-green-400">E<sub>tot</sub></p>
            <p className="text-xs font-mono">{totalE.toFixed(0)} J</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-center mt-4">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Høyde over bunn</p>
          <p className="text-lg font-bold">{currentH.toFixed(1)} m</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Fart</p>
          <p className="text-lg font-bold">{v.toFixed(1)} m/s</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Total energi (bevart!)</p>
          <p className="text-lg font-bold">{totalE.toFixed(0)} J</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Dra glideren for å flytte ballen. Legg merke til at E<sub>P</sub> + E<sub>K</sub> = E<sub>tot</sub> hele tiden!
      </p>
    </div>
  );
}

/* ─── Ball kastet opp ─── */
export function BallThrowVisualizer() {
  const [v0, setV0] = useState(20);
  const [currentTime, setCurrentTime] = useState(50); // percent
  const g = 9.81;

  const hMax = (v0 * v0) / (2 * g);
  const tTotal = (2 * v0) / g;
  const t = (currentTime / 100) * tTotal;
  const y = v0 * t - 0.5 * g * t * t;
  const vy = v0 - g * t;
  const ek = 0.5 * Math.abs(vy * vy);
  const ep = g * Math.max(y, 0);
  const totalE = 0.5 * v0 * v0;

  const ballYPos = 140 - (Math.max(y, 0) / Math.max(hMax, 0.1)) * 110;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Ball kastet rett opp — Energiomvandling</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Startfart v₀ (m/s)</label>
          <input
            type="range" min={5} max={40} step={1} value={v0}
            onChange={(e) => setV0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v0} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Tid (0 → tur-retur)</label>
          <input
            type="range" min={0} max={100} value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">t = {t.toFixed(2)} s</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {/* Ball trajectory */}
        <svg viewBox="0 0 100 160" className="w-24">
          {/* Ground */}
          <line x1="20" y1="140" x2="80" y2="140" stroke="var(--muted)" strokeWidth="2" />
          {/* Height marker */}
          <line x1="50" y1="140" x2="50" y2="25" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="3" />
          {/* Max height marker */}
          <line x1="35" y1="30" x2="65" y2="30" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2" />
          <text x="75" y="33" fill="#3b82f6" fontSize="7">h<tspan dy="2" fontSize="5">max</tspan></text>
          {/* Ball */}
          <circle cx="50" cy={Math.max(Math.min(ballYPos, 140), 25)} r="8" fill="var(--accent)" />
          {/* Velocity arrow */}
          {Math.abs(vy) > 0.5 && (
            <line
              x1="50"
              y1={Math.max(Math.min(ballYPos, 140), 25)}
              x2="50"
              y2={Math.max(Math.min(ballYPos - vy * 1.5, 140), 10)}
              stroke="#ef4444"
              strokeWidth="2"
              markerEnd="url(#ball-arrow)"
            />
          )}
          <defs>
            <marker id="ball-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L6,2.5 L0,5" fill="#ef4444" />
            </marker>
          </defs>
        </svg>

        {/* Energy info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Høyde y</p>
            <p className="font-bold">{Math.max(y, 0).toFixed(1)} m</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Fart |v|</p>
            <p className="font-bold">{Math.abs(vy).toFixed(1)} m/s</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">E<sub>P</sub>/m</p>
            <p className="font-bold">{ep.toFixed(0)} J/kg</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">E<sub>K</sub>/m</p>
            <p className="font-bold">{ek.toFixed(0)} J/kg</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Maks høyde: <strong>{hMax.toFixed(1)} m</strong> | Total energi per masse: <strong>{totalE.toFixed(0)} J/kg</strong> (konstant!)
        </p>
      </div>
    </div>
  );
}
