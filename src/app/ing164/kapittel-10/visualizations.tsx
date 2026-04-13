"use client";

import { useState } from "react";
import InlineLatex from "@/components/InlineLatex";

/* ─── Interaktiv: Kraftmoment (torque) ─── */
export function TorqueCalculator() {
  const [force, setForce] = useState(20);
  const [armLength, setArmLength] = useState(0.5);
  const [angle, setAngle] = useState(90);

  const phi = (angle * Math.PI) / 180;
  const torque = force * armLength * Math.sin(phi);
  const momentArm = armLength * Math.sin(phi);

  const cx = 200, cy = 130;
  const armPx = 140 * (armLength / 1.0);
  const endX = cx + armPx * Math.cos(0);
  const endY = cy;

  // Force arrow direction (at angle phi from the arm)
  const fLen = 40;
  const fRad = (angle * Math.PI) / 180;
  const fX = endX + fLen * Math.cos(fRad);
  const fY = endY - fLen * Math.sin(fRad);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Kraftmoment (Torque)</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Kraft F (N)</label>
          <input type="range" min={5} max={100} step={5} value={force} onChange={(e) => setForce(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{force} N</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Arm r (m)</label>
          <input type="range" min={0.1} max={1.0} step={0.05} value={armLength} onChange={(e) => setArmLength(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{armLength.toFixed(2)} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Vinkel φ (°)</label>
          <input type="range" min={0} max={180} step={5} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      <svg viewBox="0 0 400 260" className="w-full max-w-md mx-auto mb-4">
        {/* Pivot point */}
        <circle cx={cx} cy={cy} r="6" fill="var(--muted)" />
        <text x={cx} y={cy + 22} textAnchor="middle" fill="var(--muted)" fontSize="10">pivot</text>

        {/* Arm */}
        <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="#f97316" strokeWidth="3" />
        <text x={(cx + endX) / 2} y={cy + 18} textAnchor="middle" fill="#f97316" fontSize="10">r</text>

        {/* Force arrow */}
        <line x1={endX} y1={endY} x2={fX} y2={fY} stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#torque-f)" />
        <text x={fX + 5} y={fY - 5} fill="#3b82f6" fontSize="12" fontWeight="bold">F</text>

        {/* Angle arc */}
        <path
          d={`M ${endX + 25} ${endY} A 25 25 0 0 ${angle <= 180 ? 1 : 0} ${endX + 25 * Math.cos(fRad)} ${endY - 25 * Math.sin(fRad)}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1"
        />
        <text x={endX + 32 * Math.cos(fRad / 2)} y={endY - 32 * Math.sin(fRad / 2)} fill="var(--muted)" fontSize="10">φ</text>

        {/* Moment arm (perpendicular distance) */}
        {angle !== 0 && angle !== 180 && (
          <g>
            <line x1={cx} y1={cy} x2={cx + armPx * Math.cos(fRad)} y2={cy - armPx * Math.sin(fRad)} stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" />
            <text x={cx + 15} y={cy - 15} fill="#22c55e" fontSize="10">l = r sin φ</text>
          </g>
        )}

        {/* Rotation direction arrow */}
        <path d={`M ${cx - 20} ${cy - 30} A 30 30 0 0 0 ${cx + 20} ${cy - 30}`} fill="none" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#torque-rot)" />
        <text x={cx} y={cy - 42} textAnchor="middle" fill="#22c55e" fontSize="10">τ</text>

        <defs>
          <marker id="torque-f" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
          </marker>
          <marker id="torque-rot" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">τ = rF sin φ</p>
          <p className="text-lg font-bold">{torque.toFixed(1)} N·m</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">Momentarm l = r sin φ</p>
          <p className="text-lg font-bold">{momentArm.toFixed(3)} m</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">sin φ</p>
          <p className="text-lg font-bold">{Math.sin(phi).toFixed(3)}</p>
        </div>
      </div>
      {angle === 0 || angle === 180 ? (
        <p className="text-sm text-red-500 text-center mt-2">φ = {angle}° → sin φ = 0 → ingen kraftmoment! Kraften virker langs armen.</p>
      ) : angle === 90 ? (
        <p className="text-sm text-green-600 dark:text-green-400 text-center mt-2">φ = 90° → maksimalt kraftmoment! Kraften virker vinkelrett på armen.</p>
      ) : null}
    </div>
  );
}

/* ─── Interaktiv: Rulling uten glidning ─── */
export function RollingWithoutSlipping() {
  const [vcm, setVcm] = useState(3.0);
  const [shape, setShape] = useState<"disk" | "ring" | "kule">("disk");

  const R = 0.3; // fixed radius for visualization
  const omega = vcm / R;
  const Ifactor = shape === "disk" ? 0.5 : shape === "ring" ? 1.0 : 0.4;
  const mass = 2.0;
  const I = Ifactor * mass * R * R;
  const Ktrans = 0.5 * mass * vcm * vcm;
  const Krot = 0.5 * I * omega * omega;
  const Ktot = Ktrans + Krot;

  // SVG params
  const cx = 200, cy = 120, drawR = 50;

  // Velocity at different points on the wheel
  const topV = 2 * vcm; // top
  const centerV = vcm; // center

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-2">Rulling uten glidning</h3>
      <p className="text-sm text-[var(--muted)] mb-4">
        Betingelse: <InlineLatex latex="v_{CM} = R\omega" />. Kontaktpunktet har null hastighet!
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">v_CM (m/s)</label>
          <input type="range" min={0.5} max={8} step={0.5} value={vcm} onChange={(e) => setVcm(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{vcm.toFixed(1)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Form</label>
          <div className="flex gap-2 mt-1">
            {(["disk", "ring", "kule"] as const).map((s) => (
              <button key={s} onClick={() => setShape(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${shape === s ? "bg-[var(--accent)] text-white" : "bg-[var(--card-border)] text-[var(--muted)]"}`}>
                {s === "disk" ? "Disk (½MR²)" : s === "ring" ? "Ring (MR²)" : "Kule (⅖MR²)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <svg viewBox="0 0 400 240" className="w-full max-w-lg mx-auto mb-4">
        {/* Ground */}
        <line x1="20" y1={cy + drawR} x2="380" y2={cy + drawR} stroke="var(--muted)" strokeWidth="2" />
        {/* Ground hatching */}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={20 + i * 20} y1={cy + drawR} x2={30 + i * 20} y2={cy + drawR + 10} stroke="var(--muted)" strokeWidth="0.8" />
        ))}

        {/* Wheel */}
        <circle cx={cx} cy={cy} r={drawR} fill={shape === "ring" ? "none" : "#f9731620"} stroke="#f97316" strokeWidth={shape === "ring" ? 4 : 2} />
        {/* Spokes */}
        {[0, 60, 120].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return <line key={deg} x1={cx + drawR * 0.9 * Math.cos(rad)} y1={cy - drawR * 0.9 * Math.sin(rad)} x2={cx - drawR * 0.9 * Math.cos(rad)} y2={cy + drawR * 0.9 * Math.sin(rad)} stroke="#f97316" strokeWidth="0.8" opacity="0.5" />;
        })}
        <circle cx={cx} cy={cy} r="3" fill="#f97316" />

        {/* Velocity arrows */}
        {/* Center: v_CM (to the right) */}
        <line x1={cx + 8} y1={cy} x2={cx + 8 + centerV * 8} y2={cy} stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#roll-v)" />
        <text x={cx + 15 + centerV * 8} y={cy + 4} fill="#3b82f6" fontSize="11" fontWeight="bold">v_CM = {vcm.toFixed(1)}</text>

        {/* Top: 2v_CM */}
        <line x1={cx + 8} y1={cy - drawR} x2={cx + 8 + topV * 4} y2={cy - drawR} stroke="#22c55e" strokeWidth="2" markerEnd="url(#roll-v2)" />
        <text x={cx + 15 + topV * 4} y={cy - drawR + 4} fill="#22c55e" fontSize="10">2v_CM = {(2 * vcm).toFixed(1)}</text>

        {/* Bottom: v = 0 */}
        <circle cx={cx} cy={cy + drawR} r="4" fill="#ef4444" />
        <text x={cx + 10} y={cy + drawR + 4} fill="#ef4444" fontSize="10" fontWeight="bold">v = 0</text>

        {/* Rotation arrow */}
        <path d={`M ${cx + drawR + 12} ${cy - 15} A 20 20 0 0 1 ${cx + drawR + 12} ${cy + 15}`} fill="none" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#roll-rot)" />
        <text x={cx + drawR + 22} y={cy + 4} fill="#f97316" fontSize="10">ω = {omega.toFixed(1)}</text>

        {/* Labels */}
        <text x={cx} y="230" textAnchor="middle" fill="var(--muted)" fontSize="10">M = {mass} kg, R = {R} m</text>

        <defs>
          <marker id="roll-v" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
          </marker>
          <marker id="roll-v2" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
          <marker id="roll-rot" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#f97316" />
          </marker>
        </defs>
      </svg>

      {/* Energy breakdown */}
      <div className="grid sm:grid-cols-3 gap-3 text-center mb-3">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]"><InlineLatex latex="K_\text{trans} = \tfrac{1}{2}mv^2" /></p>
          <p className="text-lg font-bold">{Ktrans.toFixed(1)} J</p>
        </div>
        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-3">
          <p className="text-xs text-[var(--muted)]"><InlineLatex latex="K_\text{rot} = \tfrac{1}{2}I\omega^2" /></p>
          <p className="text-lg font-bold">{Krot.toFixed(1)} J</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]"><InlineLatex latex="K_\text{tot}" /></p>
          <p className="text-lg font-bold">{Ktot.toFixed(1)} J</p>
        </div>
      </div>
      {/* Energy bar */}
      <div className="h-6 rounded-full overflow-hidden flex bg-gray-200 dark:bg-gray-800">
        <div className="bg-blue-500 h-full transition-all" style={{ width: `${(Ktrans / Ktot) * 100}%` }} />
        <div className="bg-orange-500 h-full transition-all" style={{ width: `${(Krot / Ktot) * 100}%` }} />
      </div>
      <div className="flex justify-between text-xs mt-1 text-[var(--muted)]">
        <span className="text-blue-500">Translasjon: {((Ktrans / Ktot) * 100).toFixed(0)}%</span>
        <span className="text-orange-500">Rotasjon: {((Krot / Ktot) * 100).toFixed(0)}%</span>
      </div>
      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {shape === "disk" ? "Disk: ⅓ av energien er rotasjon, ⅔ er translasjon" : shape === "ring" ? "Ring: halvparten av energien er rotasjon!" : "Massiv kule: 2/7 av energien er rotasjon"}
      </p>
    </div>
  );
}

/* ─── Interaktiv: Angulært moment og bevaring ─── */
export function AngularMomentumVisualizer() {
  const [I1, setI1] = useState(2.5);
  const [omega1, setOmega1] = useState(1.5);
  const [I2, setI2] = useState(0.5);

  const L = I1 * omega1;
  const omega2 = L / I2;
  const K1 = 0.5 * I1 * omega1 * omega1;
  const K2 = 0.5 * I2 * omega2 * omega2;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-2">Bevaring av angulært moment — Piruett</h3>
      <p className="text-sm text-[var(--muted)] mb-4">
        Kunstløper: Armer ut → stort I, lav ω. Armer inn → lite I, høy ω. <InlineLatex latex="L = I\omega = \text{konstant}" />
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1"><InlineLatex latex="I_1" /> (armer ut) kg·m²</label>
          <input type="range" min={1} max={5} step={0.5} value={I1} onChange={(e) => setI1(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{I1.toFixed(1)}</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1"><InlineLatex latex="\omega_1" /> (rad/s)</label>
          <input type="range" min={0.5} max={5} step={0.5} value={omega1} onChange={(e) => setOmega1(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{omega1.toFixed(1)}</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1"><InlineLatex latex="I_2" /> (armer inn) kg·m²</label>
          <input type="range" min={0.2} max={I1} step={0.1} value={Math.min(I2, I1)} onChange={(e) => setI2(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{Math.min(I2, I1).toFixed(1)}</p>
        </div>
      </div>

      <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto mb-4">
        {/* Before - arms out */}
        <g>
          <text x="100" y="20" textAnchor="middle" fill="var(--muted)" fontSize="12" fontWeight="bold">Før</text>
          {/* Stick figure with arms out */}
          <circle cx="100" cy="50" r="10" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="100" y1="60" x2="100" y2="110" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="100" y1="110" x2="85" y2="140" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="100" y1="110" x2="115" y2="140" stroke="var(--foreground)" strokeWidth="1.5" />
          {/* Arms out */}
          <line x1="100" y1="75" x2={100 - 30 - I1 * 5} y2="75" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="100" y1="75" x2={100 + 30 + I1 * 5} y2="75" stroke="var(--foreground)" strokeWidth="1.5" />
          {/* Slow rotation arrow */}
          <path d="M 125 30 A 25 25 0 0 1 75 30" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#am-arr)" />
          <text x="100" y="25" textAnchor="middle" fill="#3b82f6" fontSize="10">ω₁ = {omega1.toFixed(1)}</text>
        </g>

        {/* Arrow between */}
        <text x="200" y="90" textAnchor="middle" fill="var(--accent)" fontSize="20">→</text>
        <text x="200" y="110" textAnchor="middle" fill="var(--accent)" fontSize="10">L bevart</text>

        {/* After - arms in */}
        <g>
          <text x="300" y="20" textAnchor="middle" fill="var(--muted)" fontSize="12" fontWeight="bold">Etter</text>
          <circle cx="300" cy="50" r="10" fill="none" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="300" y1="60" x2="300" y2="110" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="300" y1="110" x2="290" y2="140" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="300" y1="110" x2="310" y2="140" stroke="var(--foreground)" strokeWidth="1.5" />
          {/* Arms in (close to body) */}
          <line x1="300" y1="75" x2={300 - 8} y2="90" stroke="var(--foreground)" strokeWidth="1.5" />
          <line x1="300" y1="75" x2={300 + 8} y2="90" stroke="var(--foreground)" strokeWidth="1.5" />
          {/* Fast rotation arrow */}
          <path d="M 330 30 A 30 30 0 0 1 270 30" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#am-arr2)" />
          <text x="300" y="25" textAnchor="middle" fill="#ef4444" fontSize="10">ω₂ = {omega2.toFixed(1)}</text>
        </g>

        {/* L bar at bottom */}
        <text x="200" y="175" textAnchor="middle" fill="var(--muted)" fontSize="11">L = I₁ω₁ = I₂ω₂ = {L.toFixed(2)} kg·m²/s</text>

        <defs>
          <marker id="am-arr" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#3b82f6" />
          </marker>
          <marker id="am-arr2" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-4 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-2">
          <p className="text-xs text-[var(--muted)]">L (bevart)</p>
          <p className="text-sm font-bold">{L.toFixed(2)} kg·m²/s</p>
        </div>
        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-2">
          <p className="text-xs text-[var(--muted)]">ω₂</p>
          <p className="text-sm font-bold">{omega2.toFixed(1)} rad/s</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-2">
          <p className="text-xs text-[var(--muted)]">K₁</p>
          <p className="text-sm font-bold">{K1.toFixed(1)} J</p>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-2">
          <p className="text-xs text-[var(--muted)]">K₂</p>
          <p className="text-sm font-bold">{K2.toFixed(1)} J</p>
        </div>
      </div>
      <p className="text-sm text-[var(--muted)] text-center mt-3">
        <InlineLatex latex="K_2 > K_1" /> — kinetisk energi er <strong>ikke</strong> bevart! Kunstløperen gjør arbeid ved å trekke armene inn.
      </p>
    </div>
  );
}
