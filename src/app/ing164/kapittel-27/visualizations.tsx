"use client";

import { useState } from "react";

/* ─── Lorentzkraft-kalkulator ─── */
export function LorentzForceCalculator() {
  const [charge, setCharge] = useState(1.6); // ×10⁻¹⁹ C
  const [speed, setSpeed] = useState(3.0); // ×10⁵ m/s
  const [bField, setBField] = useState(2.0); // T
  const [angle, setAngle] = useState(90); // degrees

  const q = charge * 1e-19;
  const v = speed * 1e5;
  const B = bField;
  const theta = (angle * Math.PI) / 180;
  const force = Math.abs(q) * v * B * Math.sin(theta);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Magnetisk kraft — Lorentzkraft-kalkulator</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Ladning |q| (×10⁻¹⁹ C)
          </label>
          <input
            type="range"
            min={0.1}
            max={10}
            step={0.1}
            value={charge}
            onChange={(e) => setCharge(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{charge.toFixed(1)} × 10⁻¹⁹ C</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Fart v (×10⁵ m/s)
          </label>
          <input
            type="range"
            min={0.1}
            max={10}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{speed.toFixed(1)} × 10⁵ m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Magnetfelt B (T)
          </label>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={bField}
            onChange={(e) => setBField(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{bField.toFixed(1)} T</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Vinkel θ (mellom v og B)
          </label>
          <input
            type="range"
            min={0}
            max={180}
            step={1}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      {/* SVG */}
      <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto mb-4">
        {/* B-field (into page) crosses */}
        {[60, 120, 180, 240, 300, 340].map((x) =>
          [40, 80, 120, 160].map((y) => (
            <g key={`${x}-${y}`}>
              <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
              <line x1={x + 5} y1={y - 5} x2={x - 5} y2={y + 5} stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
            </g>
          ))
        )}
        <text x="360" y="20" fill="#3b82f6" fontSize="12" fontWeight="bold">B ⊗</text>

        {/* Charge */}
        <circle cx="200" cy="100" r="14" fill="#ef4444" />
        <text x="200" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">+</text>

        {/* Velocity arrow */}
        {(() => {
          const rad = (angle * Math.PI) / 180;
          const vx = Math.cos(rad);
          const vy = -Math.sin(rad);
          const len = 70;
          return (
            <g>
              <line
                x1="200"
                y1="100"
                x2={200 + vx * len}
                y2={100 + vy * len}
                stroke="#22c55e"
                strokeWidth="2.5"
                markerEnd="url(#v-arrow)"
              />
              <text
                x={200 + vx * len + vx * 12}
                y={100 + vy * len + vy * 12}
                textAnchor="middle"
                fill="#22c55e"
                fontSize="13"
                fontWeight="bold"
              >
                v
              </text>
            </g>
          );
        })()}

        {/* Force arrow (perpendicular to v, using right-hand rule for +q in B into page) */}
        {angle > 0 && angle < 180 && (
          (() => {
            const rad = (angle * Math.PI) / 180;
            const fx = Math.sin(rad);
            const fy = Math.cos(rad);
            const fLen = Math.min(50, 50 * Math.sin(theta));
            return (
              <g>
                <line
                  x1="200"
                  y1="100"
                  x2={200 + fx * fLen}
                  y2={100 + fy * fLen}
                  stroke="#f97316"
                  strokeWidth="2.5"
                  markerEnd="url(#f-arrow)"
                />
                <text
                  x={200 + fx * fLen + fx * 14}
                  y={100 + fy * fLen + fy * 14}
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="13"
                  fontWeight="bold"
                >
                  F
                </text>
              </g>
            );
          })()
        )}

        {/* Angle arc */}
        <text x="200" y="195" textAnchor="middle" fill="var(--muted)" fontSize="11">
          θ = {angle}°
        </text>

        <defs>
          <marker id="v-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
          </marker>
          <marker id="f-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#f97316" />
          </marker>
        </defs>
      </svg>

      <div className="text-center space-y-1">
        <p className="text-sm text-[var(--muted)]">
          <span className="text-[#22c55e] font-semibold">grønn</span> = fart v,{" "}
          <span className="text-[#f97316] font-semibold">oransje</span> = kraft F,{" "}
          <span className="text-[#3b82f6] font-semibold">blå ×</span> = B inn i arket
        </p>
        <p className="text-2xl font-bold">
          F = {force < 1e-10 ? force.toExponential(2) : force.toExponential(3)} N
        </p>
        {angle === 0 || angle === 180 ? (
          <p className="text-sm text-amber-600 dark:text-amber-400">θ = {angle}° → sin θ = 0 → ingen kraft!</p>
        ) : angle === 90 ? (
          <p className="text-sm text-green-600 dark:text-green-400">θ = 90° → maksimal kraft (v ⊥ B)</p>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Sirkelbane i magnetfelt ─── */
export function CircularMotionVisualizer() {
  const [mass, setMass] = useState(1.67); // ×10⁻²⁷ kg (proton default)
  const [speed, setSpeed] = useState(2.0); // ×10⁵ m/s
  const [bField, setBField] = useState(0.5); // T
  const [chargeVal, setChargeVal] = useState(1.6); // ×10⁻¹⁹ C

  const m = mass * 1e-27;
  const v = speed * 1e5;
  const B = bField;
  const q = chargeVal * 1e-19;

  const radius = (m * v) / (q * B);
  const omega = (q * B) / m;
  const period = (2 * Math.PI) / omega;

  // Scale radius for SVG display (max ~120px)
  const displayR = Math.min(120, Math.max(20, radius * 1e4));

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Sirkelbane i magnetfelt</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse (×10⁻²⁷ kg)</label>
          <input type="range" min={0.1} max={10} step={0.01} value={mass} onChange={(e) => setMass(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mass.toFixed(2)} × 10⁻²⁷ kg {Math.abs(mass - 1.67) < 0.05 ? "(proton)" : Math.abs(mass - 0.00091) < 0.001 ? "(elektron)" : ""}</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Fart (×10⁵ m/s)</label>
          <input type="range" min={0.1} max={10} step={0.1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{speed.toFixed(1)} × 10⁵ m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">B-felt (T)</label>
          <input type="range" min={0.01} max={3} step={0.01} value={bField} onChange={(e) => setBField(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{bField.toFixed(2)} T</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Ladning (×10⁻¹⁹ C)</label>
          <input type="range" min={0.1} max={5} step={0.1} value={chargeVal} onChange={(e) => setChargeVal(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{chargeVal.toFixed(1)} × 10⁻¹⁹ C</p>
        </div>
      </div>

      <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto mb-4">
        {/* B-field crosses */}
        {[40, 80, 120, 160, 200, 240, 260].map((x) =>
          [40, 80, 120, 160, 200, 240, 260].map((y) => {
            const dist = Math.sqrt((x - 150) ** 2 + (y - 150) ** 2);
            if (dist > 135) return null;
            return (
              <g key={`${x}-${y}`}>
                <line x1={x - 3} y1={y - 3} x2={x + 3} y2={y + 3} stroke="#3b82f6" strokeWidth="0.8" opacity="0.25" />
                <line x1={x + 3} y1={y - 3} x2={x - 3} y2={y + 3} stroke="#3b82f6" strokeWidth="0.8" opacity="0.25" />
              </g>
            );
          })
        )}

        {/* Circular orbit */}
        <circle cx="150" cy="150" r={displayR} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 3" />

        {/* Charge on orbit */}
        <circle cx={150 + displayR} cy="150" r="8" fill="#ef4444" />
        <text x={150 + displayR} y="154" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">+</text>

        {/* Velocity arrow (tangent = upward at rightmost point) */}
        <line x1={150 + displayR} y1="150" x2={150 + displayR} y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#circ-v)" />
        <text x={150 + displayR + 12} y="105" fill="#22c55e" fontSize="11" fontWeight="bold">v</text>

        {/* Force arrow (centripetal = toward center) */}
        <line x1={150 + displayR} y1="150" x2={150 + displayR - 30} y2="150" stroke="#f97316" strokeWidth="2" markerEnd="url(#circ-f)" />
        <text x={150 + displayR - 35} y="145" fill="#f97316" fontSize="11" fontWeight="bold">F</text>

        {/* Radius label */}
        <line x1="150" y1="150" x2={150 + displayR} y2="150" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3" />
        <text x={150 + displayR / 2} y="168" textAnchor="middle" fill="var(--muted)" fontSize="10">r</text>

        {/* Center dot */}
        <circle cx="150" cy="150" r="2" fill="var(--muted)" />

        <defs>
          <marker id="circ-v" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
          <marker id="circ-f" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#f97316" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Radius r</p>
          <p className="text-lg font-bold">{radius < 0.01 ? (radius * 1000).toFixed(2) + " mm" : radius.toFixed(4) + " m"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">Vinkelfart ω</p>
          <p className="text-lg font-bold">{omega.toExponential(2)} rad/s</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">Periode T</p>
          <p className="text-lg font-bold">{period < 1e-6 ? (period * 1e9).toFixed(1) + " ns" : (period * 1e6).toFixed(2) + " µs"}</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Magnetkraften er alltid vinkelrett på farten → endrer retning, ikke fart → sirkelbane.
      </p>
    </div>
  );
}
