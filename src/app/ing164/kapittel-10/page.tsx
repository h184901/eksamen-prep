"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 10)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interaktiv: Kraftmoment (torque) ─── */
function TorqueCalculator() {
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
function RollingWithoutSlipping() {
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
  const contactV = 0; // bottom
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
function AngularMomentumVisualizer() {
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

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ═══════════ TEORISAMMENDRAG ═══════════ */}
      <div id="teorisammendrag" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

        <TheorySummary
          title="10.1 Kraftmoment (dreiemoment / torque)"
          mustKnow={[
            "τ = rF sin φ — kraftmoment avhenger av kraft, arm og vinkel",
            "Alternativt: τ = (momentarm) × F, der momentarm = r sin φ",
            "Fortegn: mot klokka = positiv, med klokka = negativ",
            "Kraftmoment er rotasjonens svar på kraft",
          ]}
          defaultOpen
        >
          <p className="mb-3">
            <strong>Kraftmoment</strong> (torque) <InlineLatex latex="\tau" /> er det som får et legeme til å rotere, akkurat som kraft <InlineLatex latex="F" /> får det til å akselerere lineært. Definisjonen er:
          </p>
          <p className="mb-3 text-center">
            <InlineLatex latex="\tau = rF\sin\phi" />
          </p>
          <p className="mb-3">
            der <InlineLatex latex="r" /> er avstanden fra rotasjonsaksen til angrepspunktet, <InlineLatex latex="F" /> er kraften, og <InlineLatex latex="\phi" /> er vinkelen mellom <InlineLatex latex="\vec{r}" /> og <InlineLatex latex="\vec{F}" />.
          </p>
          <p>
            <strong>Nøkkelinnsikt:</strong> Bare kraftkomponenten <em>vinkelrett</em> på armen bidrar til rotasjon. En kraft langs armen (φ = 0° eller 180°) gir null dreiemoment — tenk dørhåndtak vs. å dytte rett mot hengslet!
          </p>
        </TheorySummary>

        <TheorySummary
          title="10.2 Newtons 2. lov for rotasjon"
          mustKnow={[
            "Στ = Iα — summen av kraftmomentene bestemmer vinkelakselerasjonen",
            "Analogt med ΣF = ma for lineær bevegelse",
            "Bruk samme fremgangsmåte som for Newtons 2. lov: frilegemediagram, summer τ, sett lik Iα",
          ]}
        >
          <p className="mb-3">
            Newtons andre lov for rotasjon er <InlineLatex latex="\sum\tau = I\alpha" />, som er direkte analog med <InlineLatex latex="\sum F = ma" />. Strategien er den samme:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
            <li>Tegn frilegemediagram med alle krefter</li>
            <li>Velg rotasjonsakse</li>
            <li>Beregn <InlineLatex latex="\tau" /> fra hver kraft (med fortegn!)</li>
            <li>Summer til <InlineLatex latex="\sum\tau" /> og sett lik <InlineLatex latex="I\alpha" /></li>
            <li>Løs for ukjent (<InlineLatex latex="\alpha" />, <InlineLatex latex="F" />, eller annet)</li>
          </ol>
          <p>
            <strong>Viktig detalj:</strong> Tyngdekraften virker i massesenteret. Normalkraft og friksjon virker i kontaktpunktet.
          </p>
        </TheorySummary>

        <TheorySummary
          title="10.3 Rulling uten glidning"
          mustKnow={[
            "v_CM = Rω — betingelse for rulling uten glidning",
            "Kontaktpunktet har null hastighet (momentant)",
            "Total kinetisk energi: K = ½mv²_CM + ½Iω²",
            "Statisk friksjon driver rullingen — IKKE kinetisk",
          ]}
        >
          <p className="mb-3">
            Et objekt som ruller uten å gli har en spesiell sammenheng mellom <InlineLatex latex="v_{CM}" /> og <InlineLatex latex="\omega" />:
          </p>
          <p className="mb-3 text-center font-semibold">
            <InlineLatex latex="v_{CM} = R\omega" />
          </p>
          <p className="mb-3">
            <strong>Hastighet på ulike punkter:</strong> Kontaktpunktet har <InlineLatex latex="v = 0" /> (momentan stillstand), massesenteret har <InlineLatex latex="v = v_{CM}" />, og toppen har <InlineLatex latex="v = 2v_{CM}" />.
          </p>
          <p className="mb-3">
            <strong>Energi ved rulling:</strong> <InlineLatex latex="K_\text{tot} = \tfrac{1}{2}mv_{CM}^2 + \tfrac{1}{2}I\omega^2" />. For en disk: <InlineLatex latex="K = \tfrac{3}{4}mv_{CM}^2" />, for en ring: <InlineLatex latex="K = mv_{CM}^2" />.
          </p>
          <p>
            <strong>Friksjon:</strong> Det er <em>statisk</em> friksjon som sørger for rulling uten glidning. Den gjør ingen arbeid (kontaktpunktet har <InlineLatex latex="v = 0" />), men den skaper kraftmomentet som gir vinkelakselerasjon.
          </p>
        </TheorySummary>

        <TheorySummary
          title="10.4 Arbeid og effekt i rotasjon"
          mustKnow={[
            "W = τ Δθ — arbeid utført av et konstant kraftmoment",
            "P = τω — effekt i rotasjon",
            "Arbeid-energi-teoremet: W_tot = ΔK_rot = ½Iω² − ½Iω₀²",
          ]}
        >
          <p className="mb-3">
            Akkurat som lineært arbeid er <InlineLatex latex="W = F \cdot d" />, er rotasjonsarbeid <InlineLatex latex="W = \tau \cdot \Delta\theta" />. Effekten er <InlineLatex latex="P = \tau\omega" />.
          </p>
          <p>
            Arbeid-energi-teoremet fungerer også her: det totale arbeidet utført av alle kraftmomenter er lik endringen i rotasjonsenergi.
          </p>
        </TheorySummary>

        <TheorySummary
          title="10.5 Angulært moment (dreieimpuls)"
          mustKnow={[
            "L = r × mv for en partikkel (vektorprodukt!)",
            "L = Iω for et stivt legeme",
            "τ = dL/dt — kraftmoment er endringsrate av angulært moment",
            "Analogt med F = dp/dt for lineær bevegelse",
          ]}
        >
          <p className="mb-3">
            <strong>Angulært moment</strong> (dreieimpuls) er rotasjonens svar på lineær bevegelsesmengde. For en partikkel: <InlineLatex latex="\vec{L} = \vec{r} \times m\vec{v}" />, med størrelse <InlineLatex latex="|\vec{L}| = rmv\sin\phi" />.
          </p>
          <p className="mb-3">
            For et stivt legeme som roterer om en fast akse: <InlineLatex latex="L = I\omega" />.
          </p>
          <p>
            Sammenhengen med kraftmoment: <InlineLatex latex="\sum\vec{\tau} = \frac{d\vec{L}}{dt}" />, analogt med <InlineLatex latex="\vec{F} = \frac{d\vec{p}}{dt}" />. Dersom <InlineLatex latex="I" /> er konstant gir dette <InlineLatex latex="\sum\tau = I\alpha" /> som vi kjenner fra 10.2.
          </p>
        </TheorySummary>

        <TheorySummary
          title="10.6 Bevaring av angulært moment"
          mustKnow={[
            "Hvis Στ_ext = 0, er L = Iω = konstant",
            "I₁ω₁ = I₂ω₂ — brukes for å finne ny ω når I endres",
            "Kinetisk energi er IKKE bevart ved endring av I",
            "Eksempler: piruett, kollaps av stjerner, syklende som snur hjul",
          ]}
        >
          <p className="mb-3">
            Dersom summen av ytre kraftmoment på et system er null, er angulært moment bevart:
          </p>
          <p className="mb-3 text-center font-semibold">
            <InlineLatex latex="\sum\tau_\text{ext} = 0 \implies L = I\omega = \text{konstant}" />
          </p>
          <p className="mb-3">
            <strong>Konsekvens:</strong> Når <InlineLatex latex="I" /> minker, MÅ <InlineLatex latex="\omega" /> øke (og omvendt). Kunstløperen som trekker armene inn spinner fortere!
          </p>
          <p>
            <strong>OBS:</strong> Selv om <InlineLatex latex="L" /> er bevart, er <InlineLatex latex="K_\text{rot}" /> generelt IKKE bevart. Når kunstløperen trekker armene inn gjør hun arbeid, og <InlineLatex latex="K" /> øker.
          </p>
        </TheorySummary>
      </div>

      {/* ═══════════ FORMLER ═══════════ */}
      <div id="formler" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Formler</h2>

        <FormulaBox
          variant="gold"
          title="Kraftmoment og Newtons 2. lov"
          latex="\tau = rF\sin\phi \qquad \sum\tau = I\alpha"
        />

        <FormulaBox variant="gold" title="Rulling uten glidning" latex="v_{CM} = R\omega \qquad a_{CM} = R\alpha" />
        <FormulaBox variant="gold" latex="K_\text{tot} = \tfrac{1}{2}mv_{CM}^2 + \tfrac{1}{2}I\omega^2" />

        <FormulaBox
          variant="gold"
          title="Arbeid og effekt i rotasjon"
          latex="W = \tau \Delta\theta \qquad P = \tau\omega \qquad W_\text{tot} = \tfrac{1}{2}I\omega^2 - \tfrac{1}{2}I\omega_0^2"
        />

        <FormulaBox variant="gold" title="Angulært moment — partikkel" latex="\vec{L} = \vec{r} \times m\vec{v}" />
        <FormulaBox variant="gold" title="Angulært moment — stivt legeme" latex="L = I\omega" />
        <FormulaBox variant="gold" latex="\sum\tau = \frac{dL}{dt}" />

        <FormulaBox
          variant="blue"
          title="Bevaring av angulært moment"
          latex="\sum\tau_\text{ext} = 0 \implies I_1\omega_1 = I_2\omega_2"
        />

        <FormulaBox
          variant="blue"
          title="Disk på skråplan (rulling uten glidning)"
          latex="a_{CM} = \frac{2}{3}g\sin\beta \qquad \mu_s \geq \tfrac{1}{3}\tan\beta"
        />
      </div>

      {/* ═══════════ INTERAKTIVE VISUALISERINGER ═══════════ */}
      <div id="interaktive-visualiseringer" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Interaktive visualiseringer</h2>
        <TorqueCalculator />
        <RollingWithoutSlipping />
        <AngularMomentumVisualizer />
      </div>

      {/* ═══════════ GJENNOMGÅTTE EKSEMPLER ═══════════ */}
      <div id="gjennomgåtte-eksempler" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Møllesten */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 1: Møllesten — arbeid og effekt</h3>
          <p className="text-[var(--muted)] mb-4">
            Fra forelesningen: En møllesten med <InlineLatex latex="I = 2{,}0 \text{ kg·m}^2" /> utsettes for et konstant kraftmoment <InlineLatex latex="\tau = 10 \text{ N·m}" /> fra ro i <InlineLatex latex="t = 8{,}0 \text{ s}" />. Finn arbeid, kinetisk energi og gjennomsnittlig effekt.
          </p>
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hva vet vi?</p>
              <p className="text-sm"><InlineLatex latex="\tau = 10 \text{ N·m}" />, <InlineLatex latex="I = 2{,}0 \text{ kg·m}^2" />, <InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="t = 8{,}0 \text{ s}" /></p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2"><InlineLatex latex="\alpha = \frac{\tau}{I} = \frac{10}{2{,}0} = 5{,}0 \text{ rad/s}^2" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="\Delta\theta = \omega_0 t + \tfrac{1}{2}\alpha t^2 = 0 + \tfrac{1}{2}(5{,}0)(8{,}0)^2 = 160 \text{ rad}" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 5{,}0 \times 8{,}0 = 40 \text{ rad/s}" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="W = \tau \cdot \Delta\theta = 10 \times 160 = 1600 \text{ J}" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(2{,}0)(40)^2 = 1600 \text{ J} \checkmark" /></p>
              <p className="text-sm"><InlineLatex latex="\bar{P} = \frac{W}{t} = \frac{1600}{8{,}0} = 200 \text{ W}" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm"><InlineLatex latex="W = \tau\Delta\theta = \Delta K_\text{rot}" /> — arbeid-energi-teoremet bekrefter svaret. Gjennomsnittlig effekt er <InlineLatex latex="\bar{P} = W/t" />.</p>
            </div>
          </div>
        </div>

        {/* Eksempel 2: Turbinvifte (angular momentum) */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 2: Turbinvifte — angulært moment</h3>
          <p className="text-[var(--muted)] mb-4">
            Fra forelesningen: En turbinvifte i en jetmotor har <InlineLatex latex="I = 2{,}5 \text{ kg·m}^2" /> og <InlineLatex latex="\omega(t) = (40 \text{ rad/s}^3) \cdot t^2" />. Finn (a) angulært moment <InlineLatex latex="L(t)" /> og verdien ved <InlineLatex latex="t = 3{,}0 \text{ s}" />, (b) kraftmomentet <InlineLatex latex="\tau(t)" /> ved <InlineLatex latex="t = 3{,}0 \text{ s}" />.
          </p>
          <div className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2">(a) <InlineLatex latex="L(t) = I\omega(t) = 2{,}5 \times 40t^2 = (100 \text{ kg·m}^2\text{/s}^3) \cdot t^2" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="L(3{,}0) = 100 \times (3{,}0)^2 = 900 \text{ kg·m}^2\text{/s}" /></p>
              <p className="text-sm mb-2">(b) <InlineLatex latex="\tau(t) = \frac{dL}{dt} = (200 \text{ kg·m}^2\text{/s}^3) \cdot t" /></p>
              <p className="text-sm"><InlineLatex latex="\tau(3{,}0) = 200 \times 3{,}0 = 600 \text{ N·m}" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm"><InlineLatex latex="\tau = dL/dt" /> er den generelle formen av Newtons 2. lov for rotasjon. Når <InlineLatex latex="\omega" /> ikke er lineær i tid, er <InlineLatex latex="\alpha" /> og <InlineLatex latex="\tau" /> tidsavhengige.</p>
            </div>
          </div>
        </div>

        {/* Eksempel 3: Kunstløper-piruett */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 3: Kunstløper — bevaring av L</h3>
          <p className="text-[var(--muted)] mb-4">
            Fra forelesningen: En kunstløper spinner med <InlineLatex latex="\omega_1 = 1{,}5 \text{ rad/s}" /> og <InlineLatex latex="I_1 = 2{,}5 \text{ kg·m}^2" /> (armer ut). Hun trekker armene inn slik at <InlineLatex latex="I_2 = 0{,}5 \text{ kg·m}^2" />. Finn <InlineLatex latex="\omega_2" />.
          </p>
          <div className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2">Ingen ytre kraftmoment → <InlineLatex latex="L" /> er bevart:</p>
              <p className="text-sm mb-2"><InlineLatex latex="I_1\omega_1 = I_2\omega_2" /></p>
              <p className="text-sm"><InlineLatex latex="\omega_2 = \frac{I_1}{I_2}\omega_1 = \frac{2{,}5}{0{,}5} \times 1{,}5 = 7{,}5 \text{ rad/s}" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Ved halvering av I dobles ω, osv. Denne oppgavetypen dukker opp veldig ofte — sjekk alltid om ytre τ = 0 for å bruke L-bevaring.</p>
            </div>
          </div>
        </div>

        {/* Eksempel 4: Disk på skråplan */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <h3 className="font-semibold text-lg mb-3">Eksempel 4: Disk som ruller ned skråplan (fra oblig 2)</h3>
          <p className="text-[var(--muted)] mb-4">
            En massiv disk med masse <InlineLatex latex="m" /> og radius <InlineLatex latex="R" /> ruller uten glidning ned et skråplan med vinkel <InlineLatex latex="\beta" />. Vis at <InlineLatex latex="a_{CM} = \frac{2}{3}g\sin\beta" /> og finn betingelsen for <InlineLatex latex="\mu_s" />.
          </p>
          <div className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Løsning</p>
              <p className="text-sm mb-2">Newtons 2. lov langs planet: <InlineLatex latex="mg\sin\beta - f_s = ma_{CM}" /></p>
              <p className="text-sm mb-2">Rotasjon om CM: <InlineLatex latex="f_s \cdot R = I\alpha = \tfrac{1}{2}mR^2 \cdot \frac{a_{CM}}{R}" /></p>
              <p className="text-sm mb-2">Fra rotasjonsligningen: <InlineLatex latex="f_s = \tfrac{1}{2}ma_{CM}" /></p>
              <p className="text-sm mb-2">Sett inn: <InlineLatex latex="mg\sin\beta - \tfrac{1}{2}ma_{CM} = ma_{CM}" /></p>
              <p className="text-sm mb-2"><InlineLatex latex="mg\sin\beta = \tfrac{3}{2}ma_{CM} \implies a_{CM} = \frac{2}{3}g\sin\beta" /></p>
              <p className="text-sm mb-2">Friksjonskrav: <InlineLatex latex="f_s \leq \mu_s N" />, der <InlineLatex latex="N = mg\cos\beta" /></p>
              <p className="text-sm"><InlineLatex latex="\tfrac{1}{2}m \cdot \frac{2}{3}g\sin\beta \leq \mu_s mg\cos\beta \implies \mu_s \geq \frac{1}{3}\tan\beta" /></p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Rulling uten glidning krever to ligninger: ΣF = ma for translasjon OG Στ = Iα for rotasjon, pluss betingelsen <InlineLatex latex="a = R\alpha" />. Akselerasjonen er <em>lavere</em> enn for ren glidning (<InlineLatex latex="g\sin\beta" />) fordi energi går til rotasjon.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ OPPGAVESTRATEGIER ═══════════ */}
      <div id="oppgavestrategier" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Oppgavestrategier</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <h3 className="font-semibold text-lg mb-3">Strategi: Στ = Iα-oppgaver</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Tegn frilegemediagram med alle krefter</li>
            <li>Velg rotasjonsakse (ofte gjennom pivotpunktet — da bidrar ikke ukjente reaksjonskrefter)</li>
            <li>Beregn τ fra hver kraft: <InlineLatex latex="\tau = rF\sin\phi" />, med riktig fortegn</li>
            <li>Summer: <InlineLatex latex="\sum\tau = I\alpha" /></li>
            <li>Hvis objektet også beveger seg lineært: skriv <InlineLatex latex="\sum F = ma" /> i tillegg</li>
            <li>Koble med <InlineLatex latex="a = R\alpha" /> hvis det er tau/trinse eller rulling</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <h3 className="font-semibold text-lg mb-3">Strategi: Rulling-oppgaver</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Bruk energibevaring hvis du trenger fart/høyde (enklere!): <InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" /></li>
            <li>Bruk Newtons lover hvis du trenger akselerasjon eller krefter</li>
            <li>Husk <InlineLatex latex="v_{CM} = R\omega" /> og <InlineLatex latex="a_{CM} = R\alpha" /></li>
            <li>Statisk friksjon gjør <em>ingen arbeid</em> ved rulling</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <h3 className="font-semibold text-lg mb-3">Strategi: Angulært moment-oppgaver</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Er summen av ytre kraftmoment null? → <InlineLatex latex="L" /> er bevart!</li>
            <li>Skriv <InlineLatex latex="I_1\omega_1 = I_2\omega_2" /> og løs for ukjent</li>
            <li>Husk: <InlineLatex latex="K" /> er generelt IKKE bevart (beregn <InlineLatex latex="\Delta K" /> separat om nødvendig)</li>
            <li>Ved kollisjoner med rotasjon: angulært moment bevart, kinetisk energi kan gå tapt</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-red-600 dark:text-red-400">
            <li>Glemmer å bruke BÅDE Newtons 2. lov for translasjon OG rotasjon i rullingsoppgaver</li>
            <li>Bruker kinetisk friksjon i stedet for statisk ved rulling uten glidning</li>
            <li>Antar at kinetisk energi er bevart når L er bevart (det er den generelt IKKE)</li>
            <li>Forveksler kraftmoment om CM med kraftmoment om kontaktpunktet</li>
            <li>Glemmer <InlineLatex latex="a = R\alpha" />-betingelsen ved rulling</li>
          </ul>
        </div>
      </div>

      {/* ═══════════ ØVINGSOPPGAVER ═══════════ */}
      <div id="øvingsoppgaver" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Øvingsoppgaver</h2>

        <ExerciseCard
          number={1}
          title="Kraftmoment"
          difficulty="lett"
          source="Oppgave 10.2"
          problem={<p>En kraft på 15 N virker i enden av en 0,40 m lang momentnøkkel i en vinkel på 60° fra nøkkelen. Finn kraftmomentet om bolten.</p>}
          hints={[
            { label: "Hint 1", content: "τ = rF sin φ" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="\tau = rF\sin\phi = 0{,}40 \times 15 \times \sin 60° = 5{,}2 \text{ N·m}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Newtons 2. lov for rotasjon"
          difficulty="middels"
          source="Oppgave 10.10"
          problem={<p>Et svinghjul (massiv sylinder) med masse 25 kg og radius 0,15 m bremses av en friksjonsbremsekloss som utøver en tangentiell kraft på 12 N. Hjulet roterer med 200 rpm. (a) Finn vinkelakselerasjonen. (b) Hvor lang tid tar det å stoppe?</p>}
          hints={[
            { label: "Hint 1", content: "I = ½MR² for massiv sylinder. τ = FR (tangentiell kraft)." },
            { label: "Hint 2", content: "α = −τ/I (negativ fordi den bremser). ω = ω₀ + αt, sett ω = 0." },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="I = \tfrac{1}{2}(25)(0{,}15)^2 = 0{,}281 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="\tau = FR = 12 \times 0{,}15 = 1{,}80 \text{ N·m}" /></p>
              <p>(a) <InlineLatex latex="\alpha = -\frac{\tau}{I} = -\frac{1{,}80}{0{,}281} = -6{,}40 \text{ rad/s}^2" /></p>
              <p><InlineLatex latex="\omega_0 = 200 \times \frac{2\pi}{60} = 20{,}9 \text{ rad/s}" /></p>
              <p>(b) <InlineLatex latex="0 = 20{,}9 + (-6{,}40)t \implies t = 3{,}3 \text{ s}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Rulling ned skråplan med energibevaring"
          difficulty="middels"
          source="Oppgave 10.22"
          problem={<p>En massiv kule (<InlineLatex latex="I = \frac{2}{5}MR^2" />) med masse 1,5 kg ruller uten glidning ned fra en høyde på 2,0 m. Finn farten i bunnen.</p>}
          hints={[
            { label: "Hint 1", content: "Energibevaring: mgh = ½mv² + ½Iω². Bruk ω = v/R." },
            { label: "Hint 2", content: "mgh = ½mv² + ½(2/5)mR²(v/R)² = ½mv² + (1/5)mv² = (7/10)mv²" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2} \cdot \tfrac{2}{5}mR^2 \cdot \frac{v^2}{R^2}" /></p>
              <p><InlineLatex latex="gh = \tfrac{1}{2}v^2 + \tfrac{1}{5}v^2 = \tfrac{7}{10}v^2" /></p>
              <p><InlineLatex latex="v = \sqrt{\frac{10gh}{7}} = \sqrt{\frac{10 \times 9{,}81 \times 2{,}0}{7}} = 5{,}29 \text{ m/s}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={4}
          title="Bevaring av angulært moment"
          difficulty="middels"
          source="Oppgave 10.34"
          problem={<p>En snurrende plate med <InlineLatex latex="I_1 = 4{,}0 \text{ kg·m}^2" /> og <InlineLatex latex="\omega_1 = 6{,}0 \text{ rad/s}" /> kobles til en stillestående plate med <InlineLatex latex="I_2 = 2{,}0 \text{ kg·m}^2" />. Finn den felles vinkelhastigheten og tap av kinetisk energi.</p>}
          hints={[
            { label: "Hint 1", content: "Ingen ytre τ → L er bevart: I₁ω₁ = (I₁+I₂)ω_f" },
            { label: "Hint 2", content: "ΔK = ½(I₁+I₂)ω_f² − ½I₁ω₁²" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="\omega_f = \frac{I_1\omega_1}{I_1 + I_2} = \frac{4{,}0 \times 6{,}0}{4{,}0 + 2{,}0} = 4{,}0 \text{ rad/s}" /></p>
              <p><InlineLatex latex="K_1 = \tfrac{1}{2}(4{,}0)(6{,}0)^2 = 72 \text{ J}" /></p>
              <p><InlineLatex latex="K_f = \tfrac{1}{2}(6{,}0)(4{,}0)^2 = 48 \text{ J}" /></p>
              <p><InlineLatex latex="\Delta K = 48 - 72 = -24 \text{ J}" /> (tapt til varme via friksjon mellom platene)</p>
            </div>
          }
        />

        <ExerciseCard
          number={5}
          title="Jojo-oppgave"
          difficulty="vanskelig"
          source="Oppgave 10.20"
          problem={<p>En jojo (massiv sylinder, M = 0,20 kg, R = 0,030 m) kvernes ut. Tauet er festet rundt akselen med radius r = 0,005 m. Finn (a) vinkelakselerasjonen, (b) snorkraften i tauet.</p>}
          hints={[
            { label: "Hint 1", content: "Krefter på jojoen: tyngdekraft Mg ned, snorkraft T opp. Translasjon: Mg − T = Ma. Rotasjon: τ = Tr = Iα" },
            { label: "Hint 2", content: "Betingelse: a = rα (obs: bruk r, ikke R). Tre ligninger, tre ukjente." },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p><InlineLatex latex="I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(0{,}20)(0{,}030)^2 = 9{,}0 \times 10^{-5} \text{ kg·m}^2" /></p>
              <p>Translasjon: <InlineLatex latex="Mg - T = Ma" /></p>
              <p>Rotasjon: <InlineLatex latex="Tr = I\alpha" />, og <InlineLatex latex="a = r\alpha" /></p>
              <p>Fra rotasjon: <InlineLatex latex="T = \frac{I\alpha}{r} = \frac{Ia}{r^2}" /></p>
              <p>Sett inn: <InlineLatex latex="Mg = Ma + \frac{Ia}{r^2} = a\left(M + \frac{I}{r^2}\right)" /></p>
              <p><InlineLatex latex="a = \frac{Mg}{M + I/r^2} = \frac{0{,}20 \times 9{,}81}{0{,}20 + 9{,}0 \times 10^{-5}/(0{,}005)^2} = \frac{1{,}962}{0{,}20 + 3{,}6} = 0{,}516 \text{ m/s}^2" /></p>
              <p>(a) <InlineLatex latex="\alpha = \frac{a}{r} = \frac{0{,}516}{0{,}005} = 103 \text{ rad/s}^2" /></p>
              <p>(b) <InlineLatex latex="T = M(g - a) = 0{,}20(9{,}81 - 0{,}516) = 1{,}86 \text{ N}" /></p>
            </div>
          }
        />
      </div>

      {/* ═══════════ EKSAMENSOPPGAVER ═══════════ */}
      <div id="eksamensoppgaver" className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Eksamensoppgaver</h2>

        <div className="rounded-xl border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 p-4 mb-6">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Eksamenstips</p>
          <p className="text-sm text-[var(--muted)]">Rotasjonsoppgaver er ALLTID på eksamen. Du MÅ kunne: (1) Στ = Iα med frilegemediagram, (2) Energibevaring med rotasjon, (3) Bevaring av angulært moment. Rulling uten glidning er en gjenganger!</p>
        </div>

        <ExerciseCard
          number={1}
          title="Bowlingkule: glidning → rulling (Høst 2023)"
          difficulty="vanskelig"
          source="Eksamen Høst 2023, Oppgave 3"
          problem={
            <div>
              <p className="mb-2">En bowlingkule (massiv kule, <InlineLatex latex="m = 6{,}0 \text{ kg}" />, <InlineLatex latex="R = 0{,}11 \text{ m}" />) kastes ut med <InlineLatex latex="v_0 = 10{,}0 \text{ m/s}" /> og <InlineLatex latex="\omega_0 = 0" /> på et gulv med <InlineLatex latex="\mu_k = 0{,}25" />.</p>
              <p className="mb-1">(a) Finn lineær akselerasjon og vinkelakselerasjon.</p>
              <p className="mb-1">(b) Finn tiden til kulen ruller uten glidning.</p>
              <p>(c) Finn farten ved dette tidspunktet.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: "Friksjonskraften f = μ_k mg bremser translasjon og akselererer rotasjon" },
            { label: "Hint 2", content: "Rulling uten glidning: v = Rω. Finn t der v(t) = Rω(t)." },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p className="font-semibold">(a) Akselerasjoner:</p>
              <p><InlineLatex latex="f_k = \mu_k mg = 0{,}25 \times 6{,}0 \times 9{,}81 = 14{,}7 \text{ N}" /></p>
              <p><InlineLatex latex="a = -\frac{f_k}{m} = -\frac{14{,}7}{6{,}0} = -2{,}45 \text{ m/s}^2" /></p>
              <p><InlineLatex latex="I = \tfrac{2}{5}mR^2 = \tfrac{2}{5}(6{,}0)(0{,}11)^2 = 0{,}02904 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="\alpha = \frac{f_k R}{I} = \frac{14{,}7 \times 0{,}11}{0{,}02904} = 55{,}7 \text{ rad/s}^2" /></p>
              <p className="font-semibold mt-2">(b) Tidspunkt for rulling:</p>
              <p><InlineLatex latex="v(t) = v_0 + at = 10{,}0 - 2{,}45t" /></p>
              <p><InlineLatex latex="\omega(t) = \alpha t = 55{,}7t" /></p>
              <p>Betingelse: <InlineLatex latex="v = R\omega" /></p>
              <p><InlineLatex latex="10{,}0 - 2{,}45t = 0{,}11 \times 55{,}7t = 6{,}13t" /></p>
              <p><InlineLatex latex="10{,}0 = 8{,}58t \implies t = 1{,}17 \text{ s}" /></p>
              <p className="font-semibold mt-2">(c) Fart:</p>
              <p><InlineLatex latex="v = 10{,}0 - 2{,}45 \times 1{,}17 = 7{,}1 \text{ m/s}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Svingdør med prosjektil (Vår 2023)"
          difficulty="vanskelig"
          source="Eksamen Vår 2023, Oppgave 3"
          problem={
            <div>
              <p className="mb-2">En svingdør (tynn stav, <InlineLatex latex="M = 15 \text{ kg}" />, <InlineLatex latex="l = 1{,}00 \text{ m}" />) roterer om en ende. En kule (<InlineLatex latex="m = 0{,}010 \text{ kg}" />, <InlineLatex latex="v = 400 \text{ m/s}" />) treffer døra i midten og setter seg fast.</p>
              <p className="mb-1">(a) Finn treghetsmomentet for dør + kule.</p>
              <p className="mb-1">(b) Finn vinkelhastigheten etter treffet.</p>
              <p>(c) Finn tap av kinetisk energi.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: "I_dør = ⅓Ml², I_kule = m(l/2)²" },
            { label: "Hint 2", content: "L bevart: m·v·(l/2) = (I_dør + I_kule)·ω" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p className="font-semibold">(a) Treghetsmoment:</p>
              <p><InlineLatex latex="I_\text{dør} = \tfrac{1}{3}Ml^2 = \tfrac{1}{3}(15)(1{,}00)^2 = 5{,}0 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="I_\text{kule} = m\left(\frac{l}{2}\right)^2 = 0{,}010 \times (0{,}50)^2 = 0{,}0025 \text{ kg·m}^2" /></p>
              <p><InlineLatex latex="I_\text{tot} = 5{,}0 + 0{,}0025 = 5{,}0025 \text{ kg·m}^2" /></p>

              <p className="font-semibold mt-2">(b) Angulært moment bevart:</p>
              <p><InlineLatex latex="L_\text{før} = mv \cdot \frac{l}{2} = 0{,}010 \times 400 \times 0{,}50 = 2{,}0 \text{ kg·m}^2\text{/s}" /></p>
              <p><InlineLatex latex="\omega = \frac{L}{I_\text{tot}} = \frac{2{,}0}{5{,}0025} \approx 0{,}40 \text{ rad/s}" /></p>

              <p className="font-semibold mt-2">(c) Energitap:</p>
              <p><InlineLatex latex="K_1 = \tfrac{1}{2}mv^2 = \tfrac{1}{2}(0{,}010)(400)^2 = 800 \text{ J}" /></p>
              <p><InlineLatex latex="K_2 = \tfrac{1}{2}I_\text{tot}\omega^2 = \tfrac{1}{2}(5{,}0025)(0{,}40)^2 = 0{,}40 \text{ J}" /></p>
              <p><InlineLatex latex="\Delta K = 0{,}40 - 800 = -799{,}6 \text{ J}" /></p>
              <p className="text-red-500">Nesten all energi går tapt til deformasjon og varme!</p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="To sylindre — angulært moment (Oblig 3)"
          difficulty="vanskelig"
          source="Oblig 3, Oppgave 1"
          problem={
            <div>
              <p className="mb-2">En sylindrisk plate (øverst) med <InlineLatex latex="I_\text{øvre} = 50 \text{ kg·m}^2" /> og <InlineLatex latex="\omega_0 = 20 \text{ rad/s}" /> slippes ned på en stillestående plate (nederst) med <InlineLatex latex="I_\text{nedre} = 100 \text{ kg·m}^2" />. Friksjon mellom platene gjør at de til slutt roterer med samme ω.</p>
              <p className="mb-1">(a) Finn felles vinkelhastighet.</p>
              <p>(b) Finn arbeidet utført av friksjonen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: "L bevart: I_øvre·ω₀ = (I_øvre + I_nedre)·ω_f" },
            { label: "Hint 2", content: "W_friksjon = ΔK = K_f − K_i" },
          ]}
          solution={
            <div className="space-y-2 text-sm">
              <p className="font-semibold">(a)</p>
              <p><InlineLatex latex="\omega_f = \frac{I_\text{øvre}\omega_0}{I_\text{øvre} + I_\text{nedre}} = \frac{50 \times 20}{50 + 100} = \frac{1000}{150} = \frac{10}{3} \approx 3{,}33 \text{ rad/s}" /></p>
              <p className="font-semibold mt-2">(b)</p>
              <p><InlineLatex latex="K_i = \tfrac{1}{2}I_\text{øvre}\omega_0^2 = \tfrac{1}{2}(50)(20)^2 = 10\,000 \text{ J}" /></p>
              <p><InlineLatex latex="K_f = \tfrac{1}{2}(150)\left(\frac{10}{3}\right)^2 = \tfrac{1}{2}(150)\frac{100}{9} = 833 \text{ J}" /></p>
              <p><InlineLatex latex="W_\text{friksjon} = 833 - 10\,000 = -9167 \text{ J}" /></p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
