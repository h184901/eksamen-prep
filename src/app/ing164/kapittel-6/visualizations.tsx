"use client";

import { useState } from "react";

/* ─── Interactive: Arbeid-kalkulator ─── */
export function WorkCalculator() {
  const [force, setForce] = useState(210);
  const [distance, setDistance] = useState(18);
  const [angle, setAngle] = useState(30);

  const angleRad = (angle * Math.PI) / 180;
  const work = force * distance * Math.cos(angleRad);
  const Fx = force * Math.cos(angleRad);

  const arrowLen = 80;
  const arrowX = arrowLen * Math.cos(angleRad);
  const arrowY = -arrowLen * Math.sin(angleRad);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Arbeid — Kalkulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Kraft F (N)
          </label>
          <input
            type="range"
            min={10}
            max={500}
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{force} N</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Strekning s (m)
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{distance} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Vinkel &phi; (grader)
          </label>
          <input
            type="range"
            min={0}
            max={180}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      {/* Visual */}
      <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto mb-4">
        {/* Ground */}
        <line x1="30" y1="130" x2="370" y2="130" stroke="var(--muted)" strokeWidth="1.5" />
        {/* Object */}
        <rect x="80" y="100" width="40" height="30" rx="4" fill="var(--accent)" opacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
        {/* Displacement arrow */}
        <line x1="100" y1="145" x2="300" y2="145" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-w)" />
        <text x="200" y="165" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
          s = {distance} m
        </text>
        {/* Force arrow */}
        <line
          x1="120"
          y1="115"
          x2={120 + arrowX}
          y2={115 + arrowY}
          stroke="#ef4444"
          strokeWidth="2.5"
          markerEnd="url(#arrow-red-w)"
        />
        <text x={125 + arrowX * 0.5} y={110 + arrowY * 0.5 - 8} textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
          F = {force} N
        </text>
        {/* Angle arc */}
        {angle > 0 && angle < 180 && (
          <>
            <path
              d={`M 155 115 A 35 35 0 0 ${angle > 0 ? 0 : 1} ${120 + 35 * Math.cos(angleRad)} ${115 - 35 * Math.sin(angleRad)}`}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="3"
            />
            <text x="165" y={angle > 20 ? 108 : 112} fill="var(--muted)" fontSize="11">
              &phi; = {angle}°
            </text>
          </>
        )}
        <defs>
          <marker id="arrow-blue-w" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
          </marker>
          <marker id="arrow-red-w" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-[var(--muted)]">F-komponent langs s</p>
          <p className="text-lg font-bold">{Fx.toFixed(1)} N</p>
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">cos &phi;</p>
          <p className="text-lg font-bold">{Math.cos(angleRad).toFixed(3)}</p>
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">
            {work >= 0 ? "Positivt arbeid" : "Negativt arbeid"}
          </p>
          <p className={`text-2xl font-bold ${work >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            W = {(work / 1000).toFixed(2)} kJ
          </p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {angle < 90 ? "Kraftkomponenten i bevegelsesretningen er positiv — arbeidet er positivt." :
         angle === 90 ? "Kraften er vinkelrett på bevegelsen — arbeidet er null!" :
         "Kraftkomponenten er motsatt bevegelsesretningen — arbeidet er negativt."}
      </p>
    </div>
  );
}

/* ─── Interactive: Arbeid-energi visualisering ─── */
export function WorkEnergyVisualizer() {
  const [mass, setMass] = useState(1500);
  const [v1, setV1] = useState(2.0);
  const [workTotal, setWorkTotal] = useState(10);

  const ek1 = 0.5 * mass * v1 * v1;
  const ek2 = ek1 + workTotal * 1000;
  const v2 = ek2 > 0 ? Math.sqrt((2 * ek2) / mass) : 0;

  const maxEk = Math.max(ek1, ek2, 1);
  const bar1 = (ek1 / maxEk) * 100;
  const bar2 = ek2 > 0 ? (ek2 / maxEk) * 100 : 0;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Arbeid-energi-teoremet</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse m (kg)</label>
          <input
            type="range" min={100} max={3000} step={100} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{mass} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Startfart v₁ (m/s)</label>
          <input
            type="range" min={0} max={30} step={0.5} value={v1}
            onChange={(e) => setV1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v1.toFixed(1)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Totalt arbeid W (kJ)</label>
          <input
            type="range" min={-50} max={50} step={1} value={workTotal}
            onChange={(e) => setWorkTotal(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{workTotal} kJ</p>
        </div>
      </div>

      {/* Energy bars */}
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>E<sub>K1</sub> = &frac12;mv₁²</span>
            <span className="font-mono">{(ek1 / 1000).toFixed(1)} kJ</span>
          </div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-lg transition-all duration-300"
              style={{ width: `${Math.max(bar1, 2)}%` }}
            />
          </div>
        </div>
        <div className="text-center text-sm font-bold">
          <span className={workTotal >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            + W<sub>tot</sub> = {workTotal >= 0 ? "+" : ""}{workTotal} kJ
          </span>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>E<sub>K2</sub> = &frac12;mv₂²</span>
            <span className="font-mono">{ek2 > 0 ? (ek2 / 1000).toFixed(1) : "0.0"} kJ</span>
          </div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
            <div
              className={`h-full rounded-lg transition-all duration-300 ${ek2 > 0 ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${Math.max(bar2, 2)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Startfart v₁</p>
          <p className="text-xl font-bold">{v1.toFixed(1)} m/s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Sluttfart v₂</p>
          <p className="text-xl font-bold">{ek2 > 0 ? v2.toFixed(1) : "Stopper!"} m/s</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {workTotal > 0 ? "Positivt arbeid øker kinetisk energi — farten øker." :
         workTotal === 0 ? "Null arbeid — kinetisk energi er uendret." :
         ek2 > 0 ? "Negativt arbeid reduserer kinetisk energi — farten minker." :
         "Arbeidet er for stort negativt — legemet stopper før all energi er brukt opp."}
      </p>
    </div>
  );
}
