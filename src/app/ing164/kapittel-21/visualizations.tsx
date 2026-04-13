"use client";

import { useState } from "react";

/* ─── Coulombs lov-kalkulator ─── */
export function CoulombCalculator() {
  const [q1, setQ1] = useState(25); // nC
  const [q2, setQ2] = useState(-75); // nC
  const [r, setR] = useState(3.0); // cm
  const k = 8.99e9;
  const force =
    k * (Math.abs(q1) * 1e-9 * Math.abs(q2) * 1e-9) / (r * 0.01) ** 2;
  const attractive = q1 * q2 < 0;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Coulombs lov — Kalkulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            q₁ (nC)
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={q1}
            onChange={(e) => setQ1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{q1} nC</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            q₂ (nC)
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={q2}
            onChange={(e) => setQ2(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{q2} nC</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            r (cm)
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{r.toFixed(1)} cm</p>
        </div>
      </div>

      {/* Visual */}
      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto mb-4">
        {/* Line between charges */}
        <line x1="80" y1="60" x2="320" y2="60" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4" />
        {/* q1 */}
        <circle cx="80" cy="60" r="20" fill={q1 >= 0 ? "#ef4444" : "#3b82f6"} opacity="0.2" />
        <circle cx="80" cy="60" r="12" fill={q1 >= 0 ? "#ef4444" : "#3b82f6"} />
        <text x="80" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {q1 >= 0 ? "+" : "−"}
        </text>
        <text x="80" y="95" textAnchor="middle" fill="var(--muted)" fontSize="11">
          q₁
        </text>
        {/* q2 */}
        <circle cx="320" cy="60" r="20" fill={q2 >= 0 ? "#ef4444" : "#3b82f6"} opacity="0.2" />
        <circle cx="320" cy="60" r="12" fill={q2 >= 0 ? "#ef4444" : "#3b82f6"} />
        <text x="320" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {q2 >= 0 ? "+" : "−"}
        </text>
        <text x="320" y="95" textAnchor="middle" fill="var(--muted)" fontSize="11">
          q₂
        </text>
        {/* Force arrows */}
        {q1 !== 0 && q2 !== 0 && (
          <>
            {/* Arrow on q1 */}
            <line
              x1="80"
              y1="35"
              x2={attractive ? "115" : "45"}
              y2="35"
              stroke={attractive ? "#22c55e" : "#ef4444"}
              strokeWidth="2.5"
              markerEnd={`url(#arrow-${attractive ? "green" : "red"})`}
            />
            <text x={attractive ? "97" : "63"} y="28" textAnchor="middle" fill={attractive ? "#22c55e" : "#ef4444"} fontSize="10">
              F
            </text>
            {/* Arrow on q2 */}
            <line
              x1="320"
              y1="35"
              x2={attractive ? "285" : "355"}
              y2="35"
              stroke={attractive ? "#22c55e" : "#ef4444"}
              strokeWidth="2.5"
              markerEnd={`url(#arrow-${attractive ? "green" : "red"})`}
            />
          </>
        )}
        {/* Distance label */}
        <text x="200" y="75" textAnchor="middle" fill="var(--muted)" fontSize="11">
          r = {r.toFixed(1)} cm
        </text>
        <defs>
          <marker id="arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
          </marker>
          <marker id="arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      <div className="text-center space-y-1">
        <p className="text-sm text-[var(--muted)]">
          {attractive ? "Tiltrekkende kraft (ulike fortegn)" : "Frastøtende kraft (like fortegn)"}
        </p>
        <p className="text-2xl font-bold">
          F = {force < 0.001 ? force.toExponential(3) : force.toFixed(4)} N
        </p>
      </div>
    </div>
  );
}

/* ─── E-felt fra punktladning ─── */
export function ElectricFieldVisualizer() {
  const [charge, setCharge] = useState(5); // µC
  const positive = charge >= 0;

  const fieldLines = 12;
  const arrows: { x1: number; y1: number; x2: number; y2: number; angle: number }[] = [];
  for (let i = 0; i < fieldLines; i++) {
    const angle = (2 * Math.PI * i) / fieldLines;
    const r1 = 25;
    const r2 = 85;
    arrows.push({
      x1: 150 + r1 * Math.cos(angle),
      y1: 150 + r1 * Math.sin(angle),
      x2: 150 + r2 * Math.cos(angle),
      y2: 150 + r2 * Math.sin(angle),
      angle: (angle * 180) / Math.PI,
    });
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Elektrisk felt fra punktladning</h3>
      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1">
          Ladning q (µC)
        </label>
        <input
          type="range"
          min={-10}
          max={10}
          value={charge}
          onChange={(e) => setCharge(Number(e.target.value))}
          className="w-full max-w-xs accent-[var(--accent)]"
        />
        <p className="text-sm font-mono mt-1">{charge} µC</p>
      </div>

      <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto">
        {/* Field lines with arrows */}
        {charge !== 0 &&
          arrows.map((a, i) => (
            <g key={i}>
              <line
                x1={positive ? a.x1 : a.x2}
                y1={positive ? a.y1 : a.y2}
                x2={positive ? a.x2 : a.x1}
                y2={positive ? a.y2 : a.y1}
                stroke="var(--muted)"
                strokeWidth="1.5"
                opacity={0.5}
                markerEnd="url(#field-arrow)"
              />
            </g>
          ))}
        {/* Charge */}
        <circle
          cx="150"
          cy="150"
          r="18"
          fill={positive ? "#ef4444" : "#3b82f6"}
        />
        <text x="150" y="156" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          {positive ? "+" : "−"}
        </text>
        <defs>
          <marker id="field-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="var(--muted)" />
          </marker>
        </defs>
      </svg>

      <p className="text-sm text-[var(--muted)] text-center mt-2">
        {charge === 0
          ? "Ingen ladning — ingen felt"
          : positive
          ? "Positiv ladning: Feltlinjene peker BORT fra ladningen"
          : "Negativ ladning: Feltlinjene peker MOT ladningen"}
      </p>
    </div>
  );
}
