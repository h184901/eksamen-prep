"use client";

import { useState } from "react";

/* ─── Interactive: Platekondensator-kalkulator ─── */
export function CapacitorCalculator() {
  const [area, setArea] = useState(100); // cm²
  const [distance, setDistance] = useState(1.0); // mm
  const [voltage, setVoltage] = useState(100); // V
  const [K, setK] = useState(1.0); // dielektrikumkonstant

  const eps0 = 8.854e-12;
  const A_m2 = area * 1e-4;
  const d_m = distance * 1e-3;
  const C = K * eps0 * A_m2 / d_m;
  const Q = C * voltage;
  const E_field = voltage / d_m;
  const energy = 0.5 * C * voltage * voltage;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Platekondensator — Kalkulator</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Plateareal A (cm²)
          </label>
          <input
            type="range"
            min={1}
            max={500}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{area} cm²</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Plateavstand d (mm)
          </label>
          <input
            type="range"
            min={0.1}
            max={10}
            step={0.1}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{distance.toFixed(1)} mm</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Spenning V (Volt)
          </label>
          <input
            type="range"
            min={1}
            max={5000}
            step={1}
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{voltage} V</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Dielektrikumkonstant K
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={K}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">K = {K.toFixed(1)} {K === 1 ? "(vakuum)" : K <= 2.5 ? "(luft/plast)" : K <= 5 ? "(glass)" : "(keramikk)"}</p>
        </div>
      </div>

      {/* SVG Visualization */}
      <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto mb-4">
        {/* Plates */}
        <rect x="80" y="30" width="8" height="120" fill="#ef4444" rx="2" />
        <rect x="312" y="30" width="8" height="120" fill="#3b82f6" rx="2" />
        {/* + and - signs */}
        <text x="72" y="95" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">+</text>
        <text x="336" y="95" textAnchor="middle" fill="#3b82f6" fontSize="18" fontWeight="bold">−</text>
        {/* Electric field arrows */}
        {[50, 70, 90, 110, 130].map((y) => (
          <line key={y} x1="100" y1={y} x2="300" y2={y} stroke="var(--muted)" strokeWidth="1" opacity="0.4" markerEnd="url(#cap-arrow)" />
        ))}
        {/* Dielectric fill if K > 1 */}
        {K > 1 && (
          <rect x="95" y="32" width="213" height="116" fill="#22c55e" opacity="0.12" rx="4" />
        )}
        {K > 1 && (
          <text x="200" y="170" textAnchor="middle" fill="#22c55e" fontSize="11">dielektrikum (K = {K.toFixed(1)})</text>
        )}
        {/* Distance label */}
        <line x1="88" y1="158" x2="312" y2="158" stroke="var(--muted)" strokeWidth="1" />
        <text x="200" y="155" textAnchor="middle" fill="var(--muted)" fontSize="11">d = {distance.toFixed(1)} mm</text>
        {/* Labels */}
        <text x="84" y="22" textAnchor="middle" fill="var(--muted)" fontSize="10">+Q</text>
        <text x="316" y="22" textAnchor="middle" fill="var(--muted)" fontSize="10">−Q</text>
        <defs>
          <marker id="cap-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="var(--muted)" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Kapasitans C</p>
          <p className="text-lg font-bold">{C < 1e-9 ? (C * 1e12).toFixed(2) + " pF" : (C * 1e9).toFixed(3) + " nF"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">Ladning Q</p>
          <p className="text-lg font-bold">{Q < 1e-6 ? (Q * 1e9).toFixed(3) + " nC" : (Q * 1e6).toFixed(3) + " µC"}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">E-felt</p>
          <p className="text-lg font-bold">{E_field < 1e6 ? (E_field / 1e3).toFixed(1) + " kV/m" : (E_field / 1e6).toFixed(2) + " MV/m"}</p>
        </div>
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
          <p className="text-xs text-[var(--muted)]">Lagret energi</p>
          <p className="text-lg font-bold">{energy < 1e-6 ? (energy * 1e9).toFixed(2) + " nJ" : energy < 1e-3 ? (energy * 1e6).toFixed(2) + " µJ" : (energy * 1e3).toFixed(2) + " mJ"}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: Serie/parallell-kalkulator ─── */
export function SeriesParallelCalculator() {
  const [c1, setC1] = useState(6); // µF
  const [c2, setC2] = useState(3); // µF
  const [v, setV] = useState(18); // V
  const [mode, setMode] = useState<"serie" | "parallell">("serie");

  const C1 = c1 * 1e-6;
  const C2 = c2 * 1e-6;
  const Ctot = mode === "serie" ? 1 / (1 / C1 + 1 / C2) : C1 + C2;

  // Serie: same Q, different V
  // Parallell: same V, different Q
  const Q_serie = Ctot * v;
  const V1_serie = Q_serie / C1;
  const V2_serie = Q_serie / C2;

  const Q1_par = C1 * v;
  const Q2_par = C2 * v;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Serie- og parallellkobling</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("serie")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === "serie" ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] border border-[var(--card-border)]"}`}
        >
          Serie
        </button>
        <button
          onClick={() => setMode("parallell")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === "parallell" ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] border border-[var(--card-border)]"}`}
        >
          Parallell
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">C₁ (µF)</label>
          <input type="range" min={1} max={20} value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{c1} µF</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">C₂ (µF)</label>
          <input type="range" min={1} max={20} value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{c2} µF</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">V (Volt)</label>
          <input type="range" min={1} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{v} V</p>
        </div>
      </div>

      {/* SVG circuit diagram */}
      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto mb-4">
        {mode === "serie" ? (
          <>
            {/* Serie: C1 --||-- C2 --||-- */}
            <line x1="20" y1="60" x2="100" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <line x1="100" y1="30" x2="100" y2="90" stroke="#ef4444" strokeWidth="3" />
            <line x1="110" y1="30" x2="110" y2="90" stroke="#3b82f6" strokeWidth="3" />
            <line x1="110" y1="60" x2="200" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <line x1="200" y1="30" x2="200" y2="90" stroke="#ef4444" strokeWidth="3" />
            <line x1="210" y1="30" x2="210" y2="90" stroke="#3b82f6" strokeWidth="3" />
            <line x1="210" y1="60" x2="380" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <text x="105" y="105" textAnchor="middle" fill="var(--muted)" fontSize="11">C₁={c1}µF</text>
            <text x="205" y="105" textAnchor="middle" fill="var(--muted)" fontSize="11">C₂={c2}µF</text>
            <text x="20" y="50" fill="var(--muted)" fontSize="10">a</text>
            <text x="375" y="50" fill="var(--muted)" fontSize="10">b</text>
            <text x="200" y="18" textAnchor="middle" fill="var(--accent)" fontSize="11">V = {v} V</text>
          </>
        ) : (
          <>
            {/* Parallell */}
            <line x1="20" y1="60" x2="80" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <line x1="80" y1="30" x2="80" y2="90" stroke="var(--muted)" strokeWidth="2" />
            {/* C1 branch */}
            <line x1="80" y1="35" x2="160" y2="35" stroke="var(--muted)" strokeWidth="2" />
            <line x1="160" y1="20" x2="160" y2="50" stroke="#ef4444" strokeWidth="3" />
            <line x1="170" y1="20" x2="170" y2="50" stroke="#3b82f6" strokeWidth="3" />
            <line x1="170" y1="35" x2="280" y2="35" stroke="var(--muted)" strokeWidth="2" />
            <text x="165" y="15" textAnchor="middle" fill="var(--muted)" fontSize="10">C₁={c1}µF</text>
            {/* C2 branch */}
            <line x1="80" y1="85" x2="160" y2="85" stroke="var(--muted)" strokeWidth="2" />
            <line x1="160" y1="70" x2="160" y2="100" stroke="#ef4444" strokeWidth="3" />
            <line x1="170" y1="70" x2="170" y2="100" stroke="#3b82f6" strokeWidth="3" />
            <line x1="170" y1="85" x2="280" y2="85" stroke="var(--muted)" strokeWidth="2" />
            <text x="165" y="115" textAnchor="middle" fill="var(--muted)" fontSize="10">C₂={c2}µF</text>
            {/* Right join */}
            <line x1="280" y1="30" x2="280" y2="90" stroke="var(--muted)" strokeWidth="2" />
            <line x1="280" y1="60" x2="380" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <text x="20" y="50" fill="var(--muted)" fontSize="10">a</text>
            <text x="375" y="50" fill="var(--muted)" fontSize="10">b</text>
            <text x="200" y="65" textAnchor="middle" fill="var(--accent)" fontSize="11">V = {v} V</text>
          </>
        )}
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">C_tot</p>
          <p className="text-lg font-bold">{(Ctot * 1e6).toFixed(2)} µF</p>
        </div>
        {mode === "serie" ? (
          <>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="text-xs text-[var(--muted)]">Q (lik for begge)</p>
              <p className="text-lg font-bold">{(Q_serie * 1e6).toFixed(1)} µC</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="text-xs text-[var(--muted)]">V₁ / V₂</p>
              <p className="text-lg font-bold">{V1_serie.toFixed(1)} V / {V2_serie.toFixed(1)} V</p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="text-xs text-[var(--muted)]">Q₁ / Q₂</p>
              <p className="text-lg font-bold">{(Q1_par * 1e6).toFixed(1)} / {(Q2_par * 1e6).toFixed(1)} µC</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="text-xs text-[var(--muted)]">V (lik for begge)</p>
              <p className="text-lg font-bold">{v} V</p>
            </div>
          </>
        )}
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {mode === "serie"
          ? "Serie: Lik ladning Q på begge. Spenningen fordeles. C_tot < minste C."
          : "Parallell: Lik spenning V over begge. Ladningen fordeles. C_tot = summen."}
      </p>
    </div>
  );
}
