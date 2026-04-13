"use client";

import { useState } from "react";

/* ─── Interactive: Biot-Savart felt fra strømelement ─── */
export function BiotSavartCalculator() {
  const [current, setCurrent] = useState(10); // A
  const [dl, setDl] = useState(1.0); // cm
  const [distance, setDistance] = useState(5.0); // cm
  const [angle, setAngle] = useState(90); // degrees

  const mu0 = 4 * Math.PI * 1e-7;
  const dlM = dl * 0.01;
  const rM = distance * 0.01;
  const theta = (angle * Math.PI) / 180;
  const dB = (mu0 / (4 * Math.PI)) * (current * dlM * Math.sin(theta)) / (rM * rM);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Biot-Savarts lov — Feltbidrag fra strømelement</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Strøm I (A)</label>
          <input type="range" min={1} max={100} step={1} value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{current} A</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Elementlengde dl (cm)</label>
          <input type="range" min={0.1} max={5} step={0.1} value={dl} onChange={(e) => setDl(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{dl.toFixed(1)} cm</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Avstand r (cm)</label>
          <input type="range" min={0.5} max={20} step={0.5} value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{distance.toFixed(1)} cm</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Vinkel φ (mellom dl og r̂)</label>
          <input type="range" min={0} max={180} step={1} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      {/* SVG visualization */}
      <svg viewBox="0 0 400 220" className="w-full max-w-lg mx-auto mb-4">
        {/* Wire segment */}
        <line x1="60" y1="110" x2="180" y2="110" stroke="var(--muted)" strokeWidth="3" />
        <line x1="180" y1="110" x2="200" y2="110" stroke="#f97316" strokeWidth="4" />
        <line x1="200" y1="110" x2="340" y2="110" stroke="var(--muted)" strokeWidth="3" />

        {/* Current arrow */}
        <text x="320" y="100" fill="var(--accent)" fontSize="13" fontWeight="bold">I →</text>

        {/* dl label */}
        <text x="190" y="135" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">dl</text>

        {/* Point P with r-vector */}
        {(() => {
          const rad = (angle * Math.PI) / 180;
          const rLen = 100;
          const px = 190 + rLen * Math.cos(rad);
          const py = 110 - rLen * Math.sin(rad);
          return (
            <g>
              <line x1="190" y1="110" x2={px} y2={py} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 3" />
              <circle cx={px} cy={py} r="5" fill="#3b82f6" />
              <text x={px + 10} y={py + 4} fill="#3b82f6" fontSize="13" fontWeight="bold">P</text>
              <text x={(190 + px) / 2 + 8} y={(110 + py) / 2 - 5} fill="#3b82f6" fontSize="11">r</text>

              {/* dB arrow (out of page at P, represented by a dot symbol) */}
              <circle cx={px} cy={py - 18} r="7" fill="none" stroke="#22c55e" strokeWidth="1.5" />
              <circle cx={px} cy={py - 18} r="2" fill="#22c55e" />
              <text x={px + 12} y={py - 14} fill="#22c55e" fontSize="11" fontWeight="bold">dB</text>

              {/* Angle arc */}
              <path
                d={`M 210 110 A 20 20 0 0 ${angle > 0 ? 1 : 0} ${190 + 20 * Math.cos(rad)} ${110 - 20 * Math.sin(rad)}`}
                fill="none"
                stroke="var(--muted)"
                strokeWidth="1"
              />
              <text x="218" y={angle > 90 ? 100 : 105} fill="var(--muted)" fontSize="10">φ</text>
            </g>
          );
        })()}

        <defs>
          <marker id="bs-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#f97316" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">dB (feltbidrag)</p>
          <p className="text-lg font-bold">{dB < 1e-6 ? dB.toExponential(2) : (dB * 1e6).toFixed(3) + " µT"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">sin φ</p>
          <p className="text-lg font-bold">{Math.sin(theta).toFixed(3)}</p>
        </div>
      </div>
      {angle === 0 || angle === 180 ? (
        <p className="text-sm text-amber-600 dark:text-amber-400 text-center mt-2">φ = {angle}° → sin φ = 0 → ingen feltbidrag! Punktet ligger langs lederen.</p>
      ) : angle === 90 ? (
        <p className="text-sm text-green-600 dark:text-green-400 text-center mt-2">φ = 90° → maksimalt feltbidrag (punktet er rett ut fra lederen)</p>
      ) : null}
    </div>
  );
}

/* ─── Interactive: B-felt fra lang rett leder ─── */
export function LongWireFieldVisualizer() {
  const [current, setCurrent] = useState(5.0); // A
  const [distance, setDistance] = useState(2.0); // cm

  const mu0 = 4 * Math.PI * 1e-7;
  const rM = distance * 0.01;
  const B = (mu0 * current) / (2 * Math.PI * rM);

  // For visualization: show concentric circles around wire
  const maxR = 120;
  const displayR = Math.min(maxR, Math.max(15, (distance / 10) * maxR));

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">B-felt rundt lang rett strømførende leder</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Strøm I (A)</label>
          <input type="range" min={0.5} max={50} step={0.5} value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{current.toFixed(1)} A</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Avstand r (cm)</label>
          <input type="range" min={0.1} max={10} step={0.1} value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{distance.toFixed(1)} cm</p>
        </div>
      </div>

      <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto mb-4">
        {/* Concentric B-field circles */}
        {[30, 60, 90, 120].map((r) => (
          <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity={0.15 + 0.15 * (1 - r / 120)} strokeDasharray="4 3" />
        ))}

        {/* Wire (current out of page) */}
        <circle cx="150" cy="150" r="10" fill="#f97316" />
        <circle cx="150" cy="150" r="3" fill="white" />
        <text x="150" y="175" textAnchor="middle" fill="var(--muted)" fontSize="11">I ⊙ (ut av arket)</text>

        {/* Distance indicator */}
        <line x1="150" y1="150" x2={150 + displayR} y2="150" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx={150 + displayR} cy="150" r="4" fill="var(--accent)" />
        <text x={150 + displayR / 2} y="142" textAnchor="middle" fill="var(--accent)" fontSize="10">r</text>
        <text x={150 + displayR + 10} y="154" fill="var(--accent)" fontSize="11" fontWeight="bold">P</text>

        {/* B-field direction arrow at point P (tangent = upward for I out of page) */}
        <line x1={150 + displayR} y1="148" x2={150 + displayR} y2="108" stroke="#22c55e" strokeWidth="2" markerEnd="url(#wire-b)" />
        <text x={150 + displayR + 14} y="115" fill="#22c55e" fontSize="11" fontWeight="bold">B</text>

        {/* Small arrows showing circular B direction */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 150 + 70 * Math.cos(rad);
          const cy = 150 - 70 * Math.sin(rad);
          // Tangent direction (counterclockwise for I out of page)
          const tx = Math.sin(rad);
          const ty = Math.cos(rad);
          return (
            <line
              key={deg}
              x1={cx - tx * 6}
              y1={cy - ty * 6}
              x2={cx + tx * 6}
              y2={cy + ty * 6}
              stroke="#3b82f6"
              strokeWidth="1.5"
              markerEnd="url(#wire-dir)"
              opacity="0.5"
            />
          );
        })}

        <defs>
          <marker id="wire-b" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
          <marker id="wire-dir" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L5,2 L0,4" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">B-felt ved avstand r</p>
          <p className="text-lg font-bold">{B < 1e-3 ? (B * 1e6).toFixed(1) + " µT" : (B * 1e3).toFixed(2) + " mT"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">Feltretning</p>
          <p className="text-lg font-bold">Sirkler (mot klokka)</p>
        </div>
      </div>
      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Feltlinjene er konsentriske sirkler rundt lederen. Retning fra <strong>høyrehåndsregelen</strong>: tommel langs I → fingrene krummer i B-retning.
      </p>
    </div>
  );
}

/* ─── Interactive: Kraft mellom parallelle ledere ─── */
export function ParallelWiresForce() {
  const [i1, setI1] = useState(10); // A
  const [i2, setI2] = useState(10); // A
  const [dist, setDist] = useState(2.0); // cm
  const [sameDir, setSameDir] = useState(true);

  const mu0 = 4 * Math.PI * 1e-7;
  const rM = dist * 0.01;
  const forcePerLength = (mu0 * Math.abs(i1) * Math.abs(i2)) / (2 * Math.PI * rM);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Kraft mellom parallelle ledere</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">I₁ (A)</label>
          <input type="range" min={1} max={100} step={1} value={i1} onChange={(e) => setI1(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{i1} A</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">I₂ (A)</label>
          <input type="range" min={1} max={100} step={1} value={i2} onChange={(e) => setI2(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{i2} A</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Avstand r (cm)</label>
          <input type="range" min={0.5} max={10} step={0.1} value={dist} onChange={(e) => setDist(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{dist.toFixed(1)} cm</p>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setSameDir(!sameDir)}
          className="px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:bg-amber-50 dark:hover:bg-amber-950/20 transition text-sm font-medium"
        >
          Strømretning: {sameDir ? "Samme vei →→" : "Motsatt vei →←"}
        </button>
      </div>

      <svg viewBox="0 0 300 180" className="w-full max-w-md mx-auto mb-4">
        {/* Wire 1 */}
        <line x1="100" y1="30" x2="100" y2="150" stroke="#f97316" strokeWidth="3" />
        <text x="100" y="22" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">I₁ ↑</text>

        {/* Wire 2 */}
        <line x1="200" y1="30" x2="200" y2="150" stroke="#3b82f6" strokeWidth="3" />
        <text x="200" y="22" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
          I₂ {sameDir ? "↑" : "↓"}
        </text>

        {/* Distance label */}
        <line x1="100" y1="165" x2="200" y2="165" stroke="var(--muted)" strokeWidth="1" />
        <line x1="100" y1="160" x2="100" y2="170" stroke="var(--muted)" strokeWidth="1" />
        <line x1="200" y1="160" x2="200" y2="170" stroke="var(--muted)" strokeWidth="1" />
        <text x="150" y="178" textAnchor="middle" fill="var(--muted)" fontSize="10">r = {dist.toFixed(1)} cm</text>

        {/* Force arrows */}
        {sameDir ? (
          <>
            {/* Attract: arrows point inward */}
            <line x1="95" y1="90" x2="115" y2="90" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#pw-arr)" />
            <text x="77" y="94" fill="#22c55e" fontSize="10" fontWeight="bold">F</text>
            <line x1="205" y1="90" x2="185" y2="90" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#pw-arr)" />
            <text x="212" y="94" fill="#22c55e" fontSize="10" fontWeight="bold">F</text>
            <text x="150" y="80" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Tiltrekking</text>
          </>
        ) : (
          <>
            {/* Repel: arrows point outward */}
            <line x1="105" y1="90" x2="80" y2="90" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#pw-rep)" />
            <text x="67" y="94" fill="#ef4444" fontSize="10" fontWeight="bold">F</text>
            <line x1="195" y1="90" x2="220" y2="90" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#pw-rep)" />
            <text x="225" y="94" fill="#ef4444" fontSize="10" fontWeight="bold">F</text>
            <text x="150" y="80" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Frastøting</text>
          </>
        )}

        <defs>
          <marker id="pw-arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#22c55e" />
          </marker>
          <marker id="pw-rep" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Kraft per lengdeenhet F/L</p>
          <p className="text-lg font-bold">
            {forcePerLength < 1e-3 ? (forcePerLength * 1e6).toFixed(1) + " µN/m" : forcePerLength < 1 ? (forcePerLength * 1e3).toFixed(2) + " mN/m" : forcePerLength.toFixed(2) + " N/m"}
          </p>
        </div>
        <div className={`rounded-lg p-3 ${sameDir ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"}`}>
          <p className="text-xs text-[var(--muted)]">Type kraft</p>
          <p className="text-lg font-bold">{sameDir ? "Tiltrekkende" : "Frastøtende"}</p>
        </div>
      </div>
    </div>
  );
}
