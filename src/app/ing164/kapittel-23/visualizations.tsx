"use client";

import { useState } from "react";

/* ─── Potensial fra punktladning ─── */
export function PotentialVisualizer() {
  const [charge, setCharge] = useState(5); // µC
  const [distance, setDistance] = useState(2.0); // m
  const k = 8.99e9;
  const V = charge !== 0 ? k * (charge * 1e-6) / distance : 0;

  const numRings = 6;
  const rings = Array.from({ length: numRings }, (_, i) => {
    const r = 20 + (i * 60) / numRings;
    const rMeters = distance * (r / (20 + 60 * (numRings - 1) / numRings));
    const pot = charge !== 0 ? k * (charge * 1e-6) / rMeters : 0;
    return { r, pot };
  });

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Elektrisk potensial fra punktladning</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Ladning q (µC)</label>
          <input
            type="range"
            min={-10}
            max={10}
            value={charge}
            onChange={(e) => setCharge(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{charge} µC</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Avstand r (m)</label>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.1}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{distance.toFixed(1)} m</p>
        </div>
      </div>

      <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto mb-4">
        {/* Equipotential rings */}
        {charge !== 0 &&
          rings.map((ring, i) => (
            <circle
              key={i}
              cx="150"
              cy="100"
              r={ring.r}
              fill="none"
              stroke={charge > 0 ? "#ef4444" : "#3b82f6"}
              strokeWidth="1"
              opacity={0.15 + 0.12 * (numRings - i)}
            />
          ))}
        {/* Charge */}
        <circle cx="150" cy="100" r="14"
          fill={charge > 0 ? "#ef4444" : charge < 0 ? "#3b82f6" : "#737373"}
        />
        <text x="150" y="105" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          {charge > 0 ? "+" : charge < 0 ? "−" : "0"}
        </text>
        {/* Point P */}
        {charge !== 0 && (
          <>
            <circle cx="250" cy="100" r="4" fill="var(--foreground)" />
            <text x="255" y="95" fill="var(--foreground)" fontSize="11">P</text>
            <line x1="164" y1="100" x2="246" y2="100" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4" />
            <text x="205" y="118" textAnchor="middle" fill="var(--muted)" fontSize="10">
              r = {distance.toFixed(1)} m
            </text>
          </>
        )}
      </svg>

      <div className="text-center space-y-1">
        <p className="text-sm text-[var(--muted)]">
          {charge === 0
            ? "Ingen ladning"
            : charge > 0
            ? "Positivt potensial — avtar med avstand"
            : "Negativt potensial — øker (mot null) med avstand"}
        </p>
        <p className="text-2xl font-bold">
          V = {Math.abs(V) < 1
            ? V.toFixed(3)
            : Math.abs(V) >= 1e6
            ? (V / 1e6).toFixed(2) + " MV"
            : Math.abs(V) >= 1e3
            ? (V / 1e3).toFixed(2) + " kV"
            : V.toFixed(1) + " V"}
        </p>
      </div>
    </div>
  );
}

/* ─── Energibevaring for ladet partikkel ─── */
export function EnergyConservation() {
  const [voltage, setVoltage] = useState(500); // V
  const [separation, setSeparation] = useState(5.0); // cm
  const e = 1.6e-19;
  const me = 9.11e-31;
  const E_field = voltage / (separation * 0.01);
  const v_final = Math.sqrt((2 * e * voltage) / me);
  const t = v_final / (e * E_field / me);
  const posPercent = Math.min(95, 20 + (voltage / 1000) * 60);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Energibevaring — elektron mellom plater</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Spenning V (V)</label>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{voltage} V</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Plateavstand d (cm)</label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={separation}
            onChange={(e) => setSeparation(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{separation.toFixed(1)} cm</p>
        </div>
      </div>

      {/* Visual */}
      <svg viewBox="0 0 360 140" className="w-full max-w-lg mx-auto mb-4">
        {/* Negative plate (left) */}
        <rect x="40" y="20" width="8" height="100" fill="#3b82f6" rx="2" />
        <text x="44" y="135" textAnchor="middle" fill="#3b82f6" fontSize="11">−</text>
        {/* Positive plate (right) */}
        <rect x="312" y="20" width="8" height="100" fill="#ef4444" rx="2" />
        <text x="316" y="135" textAnchor="middle" fill="#ef4444" fontSize="11">+</text>
        {/* E-field arrows */}
        {[30, 50, 70, 90].map((y) => (
          <g key={y}>
            <line x1="60" y1={y} x2="305" y2={y} stroke="var(--muted)" strokeWidth="0.8" opacity="0.3" />
            <polygon points={`305,${y - 3} 311,${y} 305,${y + 3}`} fill="var(--muted)" opacity="0.3" />
          </g>
        ))}
        <text x="180" y="115" textAnchor="middle" fill="var(--muted)" fontSize="10">E = {E_field.toExponential(2)} V/m</text>
        {/* Electron */}
        <circle cx={55 + posPercent * 2.5} cy="60" r="6" fill="#3b82f6" />
        <text x={55 + posPercent * 2.5} y="64" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">e⁻</text>
        {/* Arrow showing direction */}
        <line x1={55 + posPercent * 2.5 + 10} y1="60" x2={55 + posPercent * 2.5 + 30} y2="60"
          stroke="#22c55e" strokeWidth="2" markerEnd="url(#e-arrow)" />
        <defs>
          <marker id="e-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-[var(--muted)]">E-felt</p>
          <p className="font-bold text-sm">{E_field.toExponential(2)} V/m</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">Sluttfart</p>
          <p className="font-bold text-sm">{v_final.toExponential(3)} m/s</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">Tid</p>
          <p className="font-bold text-sm">{t.toExponential(3)} s</p>
        </div>
      </div>
    </div>
  );
}
