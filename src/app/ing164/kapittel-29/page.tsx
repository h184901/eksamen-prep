"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 29)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Faradays lov — indusert ems ─── */
function FaradayCalculator() {
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
function MovingConductorVisualizer() {
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
function ACGeneratorVisualizer() {
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

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ══════════════════════════════════════════════
          1. TEORISAMMENDRAG
          ══════════════════════════════════════════════ */}
      <div id="teorisammendrag">
        <h2 className="text-2xl font-bold mt-10 mb-6">Teorisammendrag</h2>

        {/* 29.1 Induksjonsforsøk */}
        <TheorySummary
          title="29.1 Induksjonsforsøk"
          mustKnow={[
            "Endring i magnetisk fluks gjennom en strømsløyfe induserer en EMF",
            "Det spiller ingen rolle HOW fluksen endres — resultatet er det samme",
            "Tre måter å endre fluks: endre B, endre A, eller endre vinkel φ",
          ]}
          defaultOpen
        >
          <p>
            Flere forsøk med strømsløyfer plassert i magnetfelt viser det samme:
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-center">
              Når magnetisk fluks <InlineLatex latex="\Phi_B" /> gjennom strømsløyfen varierer,
              induseres en elektromotorisk spenning (EMF) <InlineLatex latex="\mathcal{E}" /> i strømsløyfen.
            </p>
          </div>

          <p className="mt-3">
            Husker du magnetisk fluks fra kapittel 27?{" "}
            <InlineLatex latex="\Phi_B = BA\cos\varphi" />, der φ er vinkelen mellom <InlineLatex latex="\vec{B}" />{" "}
            og normalvektoren til flaten. For å endre fluksen kan vi:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Endre feltstyrken B</strong> — f.eks. flytte en magnet nærmere/lenger bort</li>
            <li><strong>Endre strømsløyfens areal A</strong> — f.eks. en stav som glir langs skinner</li>
            <li><strong>Endre vinkelen φ</strong> mellom felt og strømsløyfe — f.eks. rotere sløyfen</li>
          </ul>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Analogi: Batteri vs. indusert EMF</p>
            <p className="text-sm">
              Et batteri gir en <em>konstant</em> EMF (likestrøm). Induksjon gir en EMF som varierer
              over tid — den eksisterer bare så lenge fluksen <em>endres</em>. Stopper endringen, stopper EMF-en.
            </p>
          </div>
        </TheorySummary>

        {/* 29.2 Faradays lov */}
        <TheorySummary
          title="29.2 Faradays lov"
          mustKnow={[
            "Faradays lov: ε = −dΦ_B/dt",
            "For N vindinger: ε = −N · dΦ_B/dt",
            "Minustegnet: Lenz' lov (neste seksjon)",
            "Enheter: [ε] = V, [Φ] = Wb, [dΦ/dt] = Wb/s = V",
          ]}
        >
          <p>
            Faraday oppsummerte alle forsøk med elektromagnetisk induksjon i én lov:
          </p>

          <FormulaBox
            latex="\mathcal{E} = -\frac{d\Phi_B}{dt}"
            title="Faradays lov"
            variant="gold"
            description="Den induserte EMF-en er lik den negative tidsderiverte av magnetisk fluks gjennom sløyfen."
          />

          <p className="mt-3">
            Dersom strømsløyfen er en <strong>spole med N vindinger</strong>:
          </p>

          <FormulaBox
            latex="\mathcal{E} = -N\frac{d\Phi_B}{dt}"
            title="Faradays lov for spole med N vindinger"
            variant="gold"
            description="Hver vinding bidrar med sin fluksendring. N vindinger gir N ganger så stor EMF."
          />

          <p className="mt-3">
            Siden <InlineLatex latex="\Phi_B = BA\cos\varphi" />, kan vi skrive:
          </p>

          <FormulaBox
            latex="\mathcal{E} = -N\frac{d}{dt}(BA\cos\varphi)"
            variant="blue"
            description="Nå ser vi tydelig: fluksen endres hvis B endres, A endres, eller φ endres."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Retning på indusert ems — fire steg</p>
            <ol className="text-sm space-y-1">
              <li>1. Velg en positiv retning for arealvektoren <InlineLatex latex="\vec{A}" /></li>
              <li>2. Bruk <InlineLatex latex="\vec{A}" /> og <InlineLatex latex="\vec{B}" /> til å finne fortegnet til <InlineLatex latex="\Phi_B" /> og <InlineLatex latex="d\Phi_B/dt" /></li>
              <li>3. Bestem fortegnet til <InlineLatex latex="\mathcal{E}" /></li>
              <li>4. Bestem strømretning ved høyrehåndsregelen</li>
            </ol>
          </div>
        </TheorySummary>

        {/* 29.3 Lenz' lov */}
        <TheorySummary
          title="29.3 Lenz' lov"
          mustKnow={[
            "Lenz' lov: Retningen på alle effekter av magnetisk induksjon motvirker sin årsak",
            "Øker fluks → indusert strøm lager felt som motvirker økningen",
            "Minker fluks → indusert strøm lager felt som prøver å opprettholde fluksen",
            "Lenz' lov er en konsekvens av energibevaring",
          ]}
        >
          <p>
            Minustegnet i Faradays lov (<InlineLatex latex="\mathcal{E} = -d\Phi_B/dt" />) har en
            dyp fysisk betydning som kalles <strong>Lenz&apos; lov</strong>:
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-center text-lg">
              Retningen på alle effekter av magnetisk induksjon vil være slik at de <em>motvirker</em> sin årsak.
            </p>
          </div>

          <p className="mt-3">Praktisk betyr dette:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>Fluks øker</strong> (f.eks. B-felt inn i sløyfen øker):
              → Indusert strøm lager B-felt <em>ut av</em> sløyfen (motvirker økningen)
              → Strøm <em>mot</em> klokka (sett fra B-retning)
            </li>
            <li>
              <strong>Fluks minker</strong> (f.eks. B-felt inn i sløyfen minker):
              → Indusert strøm lager B-felt <em>inn i</em> sløyfen (prøver å opprettholde)
              → Strøm <em>med</em> klokka
            </li>
          </ul>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hvorfor Lenz&apos; lov? — Energibevaring</p>
            <p className="text-sm">
              Tenk deg det motsatte: at den induserte strømmen <em>forsterket</em> fluksendringen.
              Da ville en liten endring gi mer strøm, som gir mer fluks, som gir mer strøm...
              En uendelig energisyklus uten kilde! Det bryter med energibevaring.
              Lenz&apos; lov sikrer at induksjonen alltid <em>bremser</em> endringen.
            </p>
          </div>
        </TheorySummary>

        {/* 29.4 Ems fra leder i bevegelse */}
        <TheorySummary
          title="29.4 EMF fra leder i bevegelse"
          mustKnow={[
            "Rett leder med fart v i felt B: ε = vBL",
            "Utledning: F_m = qvB på ladningene i lederen → spenningsforskjell V = vBL",
            "Generelt: ε = ∮(v × B) · dl",
            "Effekt: P = ε²/R = B²L²v²/R",
            "Faradays diskdynamo: ε = ½ωBR²",
          ]}
        >
          <p>
            Anta at en rett lederstav med lengde L beveger seg med fart v vinkelrett på et uniformt
            magnetfelt B (som peker inn i arket). Ladningene i staven opplever en magnetisk kraft{" "}
            <InlineLatex latex="\vec{F}_m = q\vec{v} \times \vec{B}" />, som skyver dem langs staven.
          </p>

          <p className="mt-3">
            Dette skaper en spenningsforskjell mellom stavens ender:
          </p>

          <FormulaBox
            latex="\mathcal{E} = vBL"
            title="EMF for rett leder i bevegelse"
            variant="gold"
            description="v = lederens fart, B = feltstyrke, L = lederens lengde. Gjelder når v ⊥ B ⊥ L."
          />

          <p className="mt-3">
            Dette resultatet er helt konsistent med Faradays lov: arealet endres med{" "}
            <InlineLatex latex="dA/dt = L \cdot dx/dt = Lv" />, så:
          </p>

          <FormulaBox
            latex="\mathcal{E} = -\frac{d\Phi_B}{dt} = -B\frac{dA}{dt} = -BL\frac{dx}{dt} = -BLv"
            variant="blue"
            description="Faraday gir nøyaktig samme resultat som kraftanalysen!"
          />

          <p className="mt-3">
            Dersom staven har resistans R (eller er koblet til en krets med resistans R):
          </p>

          <FormulaBox
            latex="P = \frac{\mathcal{E}^2}{R} = \frac{B^2L^2v^2}{R}"
            title="Effekt dissipert i kretsen"
            variant="blue"
            description="Energien kommer fra arbeidet som utføres for å holde staven i bevegelse."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Faradays diskdynamo</p>
            <p className="text-sm">
              En metallskive (radius R) roterer med konstant vinkelfart ω i et uniformt magnetfelt B.
              Kun den radielle linjen fra sentrum til kanten bidrar til EMF-en (tangentiell bevegelse, v = ωr):
            </p>
            <FormulaBox
              latex="\mathcal{E} = \int_0^R \omega r B\,dr = \frac{1}{2}\omega B R^2"
              title="Faradays diskdynamo"
              variant="gold"
              description="Denne gir konstant likestrøm (ikke vekselstrøm), fordi vinkelen mellom v og B er konstant."
            />
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Roterende spole → Vekselstrøm</p>
            <p className="text-sm">
              En spole med N vindinger, areal A, roterer med vinkelfart ω i et uniformt felt B.
              Vinkelen endres som <InlineLatex latex="\varphi = \omega t" />, som gir:
            </p>
            <FormulaBox
              latex="\mathcal{E} = NAB\omega\sin(\omega t)"
              title="Vekselstrømgenerator"
              variant="gold"
              description="Sinusformet spenning — grunnlaget for vekselstrøm (AC)."
            />
          </div>
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox
            latex="\mathcal{E} = -\frac{d\Phi_B}{dt}"
            title="Faradays lov"
            variant="gold"
          />
          <FormulaBox
            latex="\mathcal{E} = -N\frac{d\Phi_B}{dt}"
            title="Faradays lov (N vindinger)"
            variant="gold"
          />
          <FormulaBox
            latex="\Phi_B = BA\cos\varphi"
            title="Magnetisk fluks"
            variant="gold"
          />
          <FormulaBox
            latex="\mathcal{E} = vBL"
            title="EMF — leder i bevegelse"
            variant="gold"
          />
          <FormulaBox
            latex="\mathcal{E} = NAB\omega\sin(\omega t)"
            title="Vekselstrømgenerator"
            variant="gold"
          />
          <FormulaBox
            latex="\mathcal{E} = \tfrac{1}{2}\omega B R^2"
            title="Faradays diskdynamo"
            variant="blue"
          />
          <FormulaBox
            latex="P = \frac{\mathcal{E}^2}{R} = \frac{B^2L^2v^2}{R}"
            title="Effekt i kretsen"
            variant="blue"
          />
          <FormulaBox
            latex="\mathcal{E} = \oint (\vec{v}\times\vec{B})\cdot d\vec{l}"
            title="Generell EMF (bevegelig leder)"
            variant="blue"
          />
        </div>

        {/* Når bruker du hva? */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-6">
          <h3 className="font-semibold text-lg mb-4">Når bruker du hva?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Situasjon</th>
                  <th className="text-left py-2 pr-4">Bruk…</th>
                  <th className="text-left py-2">Kommentar</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">B-felt endres over tid</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = -N \cdot A\cos\varphi \cdot \frac{dB}{dt}" /></td>
                  <td className="py-2">A og φ er konstante</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Areal endres (glidende stav)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = BLv" /></td>
                  <td className="py-2">B konstant, A = Lx</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Spole roterer i konstant B</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = NAB\omega\sin(\omega t)" /></td>
                  <td className="py-2">Vekselstrøm!</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Roterende skive</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\mathcal{E} = \frac{1}{2}\omega BR^2" /></td>
                  <td className="py-2">Likestrøm</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Retning på indusert strøm</td>
                  <td className="py-2 pr-4">Lenz&apos; lov</td>
                  <td className="py-2">Motvirker årsaken</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. INTERAKTIVE VISUALISERINGER
          ══════════════════════════════════════════════ */}
      <div id="visualiseringer">
        <h2 className="text-2xl font-bold mt-12 mb-6">Interaktive visualiseringer</h2>
        <FaradayCalculator />
        <MovingConductorVisualizer />
        <ACGeneratorVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Enkel Faraday — fra forelesning */}
        <ExerciseCard
          number={1}
          title="Indusert EMF fra varierende magnetfelt"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et magnetfelt varierer slik at <InlineLatex latex="dB/dt = 0{,}020\;\text{T/s}" />.
                En strømsløyfe har areal <InlineLatex latex="A = 120\;\text{cm}^2 = 0{,}012\;\text{m}^2" />{" "}
                og resistans <InlineLatex latex="R = 5{,}0\;\Omega" />.
                B-feltet står vinkelrett på sløyfen (φ = 0°).
              </p>
              <p className="mt-2">a) Finn indusert EMF.</p>
              <p>b) Finn den induserte strømmen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bruk <InlineLatex latex="\mathcal{E} = -A\,dB/dt" /> (φ = 0° → cos φ = 1, N = 1).</p> },
            { label: "Hint 2", content: <p><InlineLatex latex="I = |\mathcal{E}|/R" /> (Ohms lov).</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Indusert EMF:</strong></p>
              <FormulaBox
                latex="\mathcal{E} = -\frac{d\Phi_B}{dt} = -A\frac{dB}{dt} = -0{,}012 \cdot 0{,}020 = -0{,}24\;\text{mV}"
                variant="gold"
              />
              <p className="text-sm"><InlineLatex latex="|\mathcal{E}| = 0{,}24\;\text{mV}" /></p>

              <p><strong>b) Indusert strøm:</strong></p>
              <FormulaBox
                latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}24 \times 10^{-3}}{5{,}0} = \underline{\underline{0{,}048\;\text{mA} = 48\;\mu\text{A}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Selv en liten endring i B-felt gir en målbar EMF.
                Strømmen avhenger av både EMF og resistans (Ohms lov i den induserte kretsen).</p>
            </div>
          }
        />

        {/* Eksempel 2: Spole i varierende B-felt med vinkel — fra forelesning */}
        <ExerciseCard
          number={2}
          title="Spole med 500 vindinger i varierende B-felt"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En spole med <InlineLatex latex="N = 500" /> vindinger og radius{" "}
                <InlineLatex latex="r = 4\;\text{cm} = 0{,}04\;\text{m}" /> er plassert i et uniformt magnetfelt.
                Vinkelen mellom B og normalvektoren til spolen er <InlineLatex latex="\varphi = 30°" />.
                Magnetfeltet endres med <InlineLatex latex="dB/dt = -0{,}200\;\text{T/s}" />.
              </p>
              <p className="mt-2">
                a) Finn den induserte EMF-en.
              </p>
              <p>
                b) La nå spolen rotere med konstant vinkelfart ω i et <em>konstant</em> B-felt.
                Vis at dette gir <InlineLatex latex="\mathcal{E} = NAB\omega\sin(\omega t)" />.
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>a) <InlineLatex latex="\mathcal{E} = -N \cdot A \cdot \cos\varphi \cdot dB/dt" />, der <InlineLatex latex="A = \pi r^2" />.</p> },
            { label: "Hint 2", content: <p>b) Sett <InlineLatex latex="\varphi = \omega t" /> og deriver <InlineLatex latex="\Phi = NAB\cos(\omega t)" />.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Indusert EMF:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="A = \pi r^2 = \pi \cdot (0{,}04)^2 = 5{,}03 \times 10^{-3}\;\text{m}^2" />
              </p>
              <FormulaBox
                latex="\mathcal{E} = -N \cdot A \cdot \cos 30° \cdot \frac{dB}{dt} = -500 \cdot 5{,}03 \times 10^{-3} \cdot 0{,}866 \cdot (-0{,}200) = \underline{\underline{0{,}435\;\text{V}}}"
                variant="gold"
              />

              <p><strong>b) Roterende spole:</strong></p>
              <p className="text-sm">Med <InlineLatex latex="\varphi = \omega t" /> og konstant B:</p>
              <FormulaBox
                latex="\mathcal{E} = -N\frac{d\Phi_B}{dt} = -N\frac{d}{dt}(AB\cos\omega t) = NAB\omega\sin(\omega t)"
                variant="gold"
              />
              <p className="text-sm">Dette er <strong>vekselstrøm</strong> — spenningen varierer sinusformig med tid!</p>

              <p className="mt-2"><strong>Hva lærte vi?</strong> To forskjellige situasjoner:
                (a) endring i B → EMF er konstant (likestrøm), (b) rotasjon → EMF varierer sinusformig (vekselstrøm).</p>
            </div>
          }
        />

        {/* Eksempel 3: Glidende stav — fra forelesning */}
        <ExerciseCard
          number={3}
          title="Glidende stav på skinner i magnetfelt"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En rett lederstav med lengde <InlineLatex latex="L = 0{,}10\;\text{m}" />{" "}
                glir med fart <InlineLatex latex="v = 2{,}5\;\text{m/s}" /> langs to parallelle skinner
                i et uniformt magnetfelt <InlineLatex latex="B = 0{,}60\;\text{T}" /> rettet inn i arket.
                Staven har resistans <InlineLatex latex="R = 0{,}030\;\Omega" />.
              </p>
              <p className="mt-2">
                a) Finn den induserte EMF-en.
              </p>
              <p>b) Finn strømmen og dens retning.</p>
              <p>c) Finn effekten.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>a) <InlineLatex latex="\mathcal{E} = vBL" /></p> },
            { label: "Hint 2", content: <p>b) Ohms lov + Lenz&apos; lov for retning.</p> },
            { label: "Hint 3", content: <p>c) <InlineLatex latex="P = \mathcal{E}^2/R" /> eller <InlineLatex latex="P = I^2R" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Indusert EMF:</strong></p>
              <FormulaBox
                latex="\mathcal{E} = vBL = 2{,}5 \cdot 0{,}60 \cdot 0{,}10 = \underline{\underline{0{,}15\;\text{V}}}"
                variant="gold"
              />

              <p><strong>b) Strøm:</strong></p>
              <FormulaBox
                latex="I = \frac{\mathcal{E}}{R} = \frac{0{,}15}{0{,}030} = \underline{\underline{5{,}0\;\text{A}}}"
                variant="gold"
              />
              <p className="text-sm">
                <strong>Retning (Lenz&apos; lov):</strong> Staven beveger seg til høyre → arealet øker → fluksen (inn i arket)
                øker → indusert strøm motvirker = lager felt <em>ut av</em> arket → strøm <strong>mot klokka</strong>.
              </p>

              <p><strong>c) Effekt:</strong></p>
              <FormulaBox
                latex="P = \frac{\mathcal{E}^2}{R} = \frac{0{,}15^2}{0{,}030} = \frac{B^2L^2v^2}{R} = \underline{\underline{0{,}75\;\text{W}}}"
                variant="gold"
              />
              <p className="text-sm">
                Verifisering: <InlineLatex latex="P_{\text{tilført}} = F \cdot v = ILB \cdot v = 5{,}0 \cdot 0{,}10 \cdot 0{,}60 \cdot 2{,}5 = 0{,}75\;\text{W}" /> — stemmer!
              </p>

              <p className="mt-2"><strong>Hva lærte vi?</strong> Effekten vi må tilføre for å holde staven i bevegelse er nøyaktig lik
                effekten som dissiperes i resistansen. Energibevaring!</p>
            </div>
          }
        />

        {/* Eksempel 4: Faradays diskdynamo — fra forelesning */}
        <ExerciseCard
          number={4}
          title="Faradays diskdynamo"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En metallskive med radius <InlineLatex latex="R" /> roterer med konstant vinkelfart{" "}
                <InlineLatex latex="\omega" /> i et uniformt magnetfelt B (vinkelrett på skiven).
                Børster leder strøm fra sentrum til kanten via en ekstern krets med resistans R<sub>krets</sub>.
              </p>
              <p className="mt-2">
                Vis at den induserte EMF-en er <InlineLatex latex="\mathcal{E} = \frac{1}{2}\omega BR^2" />.
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Kun den radielle linjen fra sentrum til kanten er i bevegelse. Farten til et punkt i avstand r fra sentrum er v = ωr.</p> },
            { label: "Hint 2", content: <p>Integrer bidraget <InlineLatex latex="d\mathcal{E} = vB\,dr = \omega r B\,dr" /> fra 0 til R.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p className="text-sm">
                Et punkt i avstand r fra sentrum har fart <InlineLatex latex="v = \omega r" />. Bidraget til EMF fra et
                lite element dr er:
              </p>
              <FormulaBox
                latex="d\mathcal{E} = vB\,dr = \omega r B\,dr"
                variant="blue"
              />
              <p className="text-sm">Vi integrerer fra sentrum (0) til kanten (R):</p>
              <FormulaBox
                latex="\mathcal{E} = \int_0^R \omega rB\,dr = \omega B \int_0^R r\,dr = \omega B \cdot \frac{R^2}{2} = \underline{\underline{\frac{1}{2}\omega B R^2}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Diskdynamoen gir <em>konstant likestrøm</em> (ikke vekselstrøm),
                fordi vinkelen mellom v og B er konstant — den endres ikke med rotasjonen.</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          5. OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <div id="oppgavestrategier">
        <h2 className="text-2xl font-bold mt-12 mb-6">Oppgavestrategier</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Faradays lov (29.2)</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Identifiser hva som endres: B, A, eller φ?</li>
              <li><strong>2.</strong> Skriv opp <InlineLatex latex="\Phi_B = NBA\cos\varphi" /> med riktige verdier.</li>
              <li><strong>3.</strong> Deriver: <InlineLatex latex="\mathcal{E} = -d\Phi_B/dt" /></li>
              <li><strong>4.</strong> For konstant dB/dt: <InlineLatex latex="\mathcal{E} = -NA\cos\varphi \cdot dB/dt" /></li>
              <li><strong>5.</strong> For konstant endring i areal: <InlineLatex latex="\mathcal{E} = -NB\cos\varphi \cdot dA/dt" /></li>
              <li><strong>6.</strong> Bruk Ohms lov for strøm: <InlineLatex latex="I = |\mathcal{E}|/R" /></li>
            </ol>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Vanlig feil:</p>
              <p className="text-sm">Glemmer cos φ! Hvis B ikke er vinkelrett på sløyfen (φ ≠ 0°), må du ta med cos φ-faktoren.</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Lenz&apos; lov — Bestemme strømretning (29.3)</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Bestem retningen på B-feltet gjennom sløyfen.</li>
              <li><strong>2.</strong> Bestem om fluksen <em>øker</em> eller <em>minker</em>.</li>
              <li><strong>3.</strong> Indusert strøm lager et felt som <em>motvirker</em> endringen:
                <ul className="ml-4 mt-1">
                  <li>• Øker → indusert B-felt i <em>motsatt</em> retning</li>
                  <li>• Minker → indusert B-felt i <em>samme</em> retning</li>
                </ul>
              </li>
              <li><strong>4.</strong> Bruk høyrehåndsregelen for å finne strømretningen som gir riktig B-felt.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Leder i bevegelse (29.4)</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Identifiser: Hva beveger seg? Hva er B-feltet?</li>
              <li><strong>2.</strong> For rett stav: <InlineLatex latex="\mathcal{E} = vBL" /> direkte.</li>
              <li><strong>3.</strong> For roterende system: bruk <InlineLatex latex="\mathcal{E} = \oint(\vec{v}\times\vec{B})\cdot d\vec{l}" /> eller Faradays lov.</li>
              <li><strong>4.</strong> Finn strøm, kraft, effekt etter behov.</li>
              <li><strong>5.</strong> <strong>Energisjekk:</strong> Effekten tilført for å bevege lederen = effekten dissipert i R.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. ØVINGSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="øvingsoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Øvingsoppgaver</h2>

        <ExerciseCard
          number={1}
          title="Enkel Faradays lov"
          difficulty="lett"
          source="Oppgave 29.1"
          problem={
            <div>
              <p>
                En flat, sirkulær spole med areal <InlineLatex latex="A = 0{,}250\;\text{m}^2" /> og 1 vinding
                er plassert vinkelrett på et uniformt magnetfelt. Feltet øker uniformt fra{" "}
                <InlineLatex latex="0{,}00\;\text{T}" /> til <InlineLatex latex="0{,}500\;\text{T}" /> i løpet av{" "}
                <InlineLatex latex="1{,}00\;\text{s}" />.
              </p>
              <p className="mt-2">Finn den induserte EMF-en.</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p><InlineLatex latex="\mathcal{E} = -A \cdot \Delta B / \Delta t" /> (φ = 0°, N = 1)</p> },
          ]}
          solution={
            <div className="space-y-3">
              <FormulaBox
                latex="\mathcal{E} = -A\frac{\Delta B}{\Delta t} = -0{,}250 \cdot \frac{0{,}500 - 0}{1{,}00} = \underline{\underline{-0{,}125\;\text{V}}}"
                variant="gold"
              />
              <p className="text-sm"><InlineLatex latex="|\mathcal{E}| = 0{,}125\;\text{V} = 125\;\text{mV}" /></p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Spole i varierende felt"
          difficulty="middels"
          source="Oppgave 29.8"
          problem={
            <div>
              <p>
                En sirkulær spole med 200 vindinger og radius <InlineLatex latex="r = 3{,}00\;\text{cm}" />{" "}
                er plassert vinkelrett på et magnetfelt. Feltet endres fra{" "}
                <InlineLatex latex="0{,}800\;\text{T}" /> til <InlineLatex latex="0{,}300\;\text{T}" />{" "}
                på <InlineLatex latex="0{,}400\;\text{s}" />.
              </p>
              <p className="mt-2">
                a) Finn den gjennomsnittlige induserte EMF-en.
              </p>
              <p>b) Hvis spolens resistans er <InlineLatex latex="40{,}0\;\Omega" />, finn den gjennomsnittlige strømmen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p><InlineLatex latex="A = \pi r^2 = \pi(0{,}03)^2" /></p> },
            { label: "Hint 2", content: <p><InlineLatex latex="\mathcal{E} = -N \cdot A \cdot \Delta B/\Delta t" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p className="text-sm"><InlineLatex latex="A = \pi(0{,}0300)^2 = 2{,}83 \times 10^{-3}\;\text{m}^2" /></p>
              <p><strong>a) EMF:</strong></p>
              <FormulaBox
                latex="\mathcal{E} = -N \cdot A \cdot \frac{\Delta B}{\Delta t} = -200 \cdot 2{,}83 \times 10^{-3} \cdot \frac{0{,}300 - 0{,}800}{0{,}400} = \underline{\underline{0{,}707\;\text{V}}}"
                variant="gold"
              />
              <p><strong>b) Strøm:</strong></p>
              <FormulaBox
                latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}707}{40{,}0} = \underline{\underline{17{,}7\;\text{mA}}}"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Lenz' lov — strømretning"
          difficulty="middels"
          source="Oppgave 29.15"
          problem={
            <div>
              <p>
                En sirkulær strømsløyfe ligger i xy-planet. Et uniformt magnetfelt peker i +z-retning
                (ut av arket). Feltet <em>øker</em> med tiden.
              </p>
              <p className="mt-2">
                I hvilken retning flyter den induserte strømmen (med eller mot klokka, sett ovenfra)?
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>B peker ut av arket og øker. Hva sier Lenz&apos; lov? Den induserte strømmen må lage et felt som motvirker økningen.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p className="text-sm">
                B peker ut av arket (+z) og <em>øker</em>. Lenz&apos; lov: indusert strøm motvirker → lager felt <em>inn i</em> arket (−z).
              </p>
              <p className="text-sm">
                Høyrehåndsregelen: for å lage felt i −z-retning, må strømmen gå <strong>med klokka</strong> (sett ovenfra).
              </p>
              <p className="mt-2 font-semibold">Svar: Med klokka.</p>
            </div>
          }
        />

        <ExerciseCard
          number={4}
          title="EMF fra bevegelig stav"
          difficulty="middels"
          source="Oppgave 29.24"
          problem={
            <div>
              <p>
                En rett lederstav med lengde <InlineLatex latex="L = 0{,}360\;\text{m}" /> beveger seg med
                fart <InlineLatex latex="v = 5{,}80\;\text{m/s}" /> i et magnetfelt <InlineLatex latex="B = 0{,}120\;\text{T}" />.
                Staven, farten og feltet er innbyrdes vinkelrette.
              </p>
              <p className="mt-2">
                a) Finn den induserte EMF-en.
              </p>
              <p>b) Hvilken ende av staven er på høyest potensial?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p><InlineLatex latex="\mathcal{E} = vBL" /></p> },
            { label: "Hint 2", content: <p>Bruk <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" /> for å se hvilken retning positive ladninger skyves.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a)</strong></p>
              <FormulaBox
                latex="\mathcal{E} = vBL = 5{,}80 \cdot 0{,}120 \cdot 0{,}360 = \underline{\underline{0{,}250\;\text{V}}}"
                variant="gold"
              />
              <p><strong>b)</strong></p>
              <p className="text-sm">
                Positive ladninger i staven opplever <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" />.
                Den enden der positive ladninger samles, har høyest potensial.
                Bruk høyrehåndsregelen med de gitte retningene for å avgjøre.
              </p>
            </div>
          }
        />

        <ExerciseCard
          number={5}
          title="Effekt og kraft på glidende stav"
          difficulty="vanskelig"
          source="Oppgave 29.27"
          problem={
            <div>
              <p>
                En metallstav med lengde <InlineLatex latex="L = 0{,}25\;\text{m}" /> og resistans{" "}
                <InlineLatex latex="R = 0{,}15\;\Omega" /> glir med konstant fart på friksjonsfrie skinner
                i et felt <InlineLatex latex="B = 0{,}40\;\text{T}" />.
              </p>
              <p className="mt-2">
                a) Finn farten v som gir indusert strøm <InlineLatex latex="I = 0{,}80\;\text{A}" />.
              </p>
              <p>b) Finn kraften som trengs for å holde staven i bevegelse.</p>
              <p>c) Finn effekten som tilføres og effekten som dissiperes. Sammenlign.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>a) <InlineLatex latex="I = \mathcal{E}/R = BLv/R" /> → løs for v.</p> },
            { label: "Hint 2", content: <p>b) Kraften på staven i feltet: <InlineLatex latex="F = ILB" />.</p> },
            { label: "Hint 3", content: <p>c) <InlineLatex latex="P_{\text{tilført}} = Fv" />, <InlineLatex latex="P_{\text{dissipiert}} = I^2R" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Fart:</strong></p>
              <FormulaBox
                latex="v = \frac{IR}{BL} = \frac{0{,}80 \cdot 0{,}15}{0{,}40 \cdot 0{,}25} = \underline{\underline{1{,}2\;\text{m/s}}}"
                variant="gold"
              />
              <p><strong>b) Kraft:</strong></p>
              <FormulaBox
                latex="F = ILB = 0{,}80 \cdot 0{,}25 \cdot 0{,}40 = \underline{\underline{0{,}080\;\text{N} = 80\;\text{mN}}}"
                variant="gold"
              />
              <p><strong>c) Effekt:</strong></p>
              <FormulaBox
                latex="P_{\text{tilført}} = Fv = 0{,}080 \cdot 1{,}2 = 0{,}096\;\text{W}"
                variant="blue"
              />
              <FormulaBox
                latex="P_{\text{dissipiert}} = I^2R = 0{,}80^2 \cdot 0{,}15 = 0{,}096\;\text{W} \quad \checkmark"
                variant="blue"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring: all tilført effekt dissiperes som varme i resistansen. Ingen energi «forsvinner».</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          7. EKSAMENSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="eksamensoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Eksamensoppgaver</h2>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-6">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Eksamenstips — Kapittel 29</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Faradays lov</strong> er den viktigste formelen — kan nesten alle oppgaver</li>
            <li>• <strong>Lenz&apos; lov</strong> for retning — øvd mye på dette!</li>
            <li>• <strong>ε = BLv</strong> for glidende stav er en klassiker</li>
            <li>• <strong>Energibevaring</strong>: sjekk at P_tilført = P_dissipiert</li>
            <li>• Husk: <InlineLatex latex="\Phi_B = BA\cos\varphi" /> — ikke glem cos φ!</li>
            <li>• Enhet-sjekk: [ε] = V = Wb/s = T·m²/s</li>
          </ul>
        </div>

        <ExerciseCard
          number={1}
          title="Eksamenstype: Kombinert Faraday + Lenz + energi"
          difficulty="vanskelig"
          source="Eksamenstype"
          problem={
            <div>
              <p>
                En rektangulær strømsløyfe med bredde <InlineLatex latex="w = 5{,}0\;\text{cm}" />{" "}
                og lengde <InlineLatex latex="l = 10{,}0\;\text{cm}" /> har resistans{" "}
                <InlineLatex latex="R = 2{,}0\;\Omega" />.
                Sløyfen trekkes med konstant fart <InlineLatex latex="v = 3{,}0\;\text{m/s}" />{" "}
                ut av et uniformt magnetfelt <InlineLatex latex="B = 1{,}5\;\text{T}" /> (inn i arket).
              </p>
              <p className="mt-2">
                a) Finn den induserte EMF-en mens sløyfen er delvis i feltet.
              </p>
              <p>b) Finn strømmen og dens retning.</p>
              <p>c) Finn kraften som trengs for å trekke sløyfen ut med konstant fart.</p>
              <p>d) Verifiser energibevaring.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bare den ene siden (bredden w) av sløyfen er i feltet og bidrar. Arealet som er i feltet minker.</p> },
            { label: "Hint 2", content: <p><InlineLatex latex="\mathcal{E} = Bwv" /> (som en glidende stav med lengde w).</p> },
            { label: "Hint 3", content: <p>Kraft: <InlineLatex latex="F = IwB" /> (kraft på strømførende leder i felt).</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) EMF:</strong></p>
              <p className="text-sm">Arealet i feltet minker: <InlineLatex latex="dA/dt = -w \cdot v" /></p>
              <FormulaBox
                latex="|\mathcal{E}| = Bwv = 1{,}5 \cdot 0{,}050 \cdot 3{,}0 = \underline{\underline{0{,}225\;\text{V}}}"
                variant="gold"
              />

              <p><strong>b) Strøm:</strong></p>
              <FormulaBox
                latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}225}{2{,}0} = \underline{\underline{0{,}1125\;\text{A}}}"
                variant="gold"
              />
              <p className="text-sm">
                <strong>Retning (Lenz&apos; lov):</strong> Fluks inn i arket minker → indusert strøm lager felt <em>inn i</em> arket
                → strøm <strong>med klokka</strong>.
              </p>

              <p><strong>c) Kraft:</strong></p>
              <p className="text-sm">
                Den strømførende siden (w) i feltet opplever en bremsende kraft (Lenz!):
              </p>
              <FormulaBox
                latex="F = IwB = 0{,}1125 \cdot 0{,}050 \cdot 1{,}5 = \underline{\underline{8{,}44 \times 10^{-3}\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm">Vi må tilføre en like stor kraft i trekkretningen.</p>

              <p><strong>d) Energibevaring:</strong></p>
              <FormulaBox
                latex="P_{\text{tilført}} = Fv = 8{,}44 \times 10^{-3} \cdot 3{,}0 = 0{,}0253\;\text{W}"
                variant="blue"
              />
              <FormulaBox
                latex="P_{\text{dissipiert}} = I^2R = 0{,}1125^2 \cdot 2{,}0 = 0{,}0253\;\text{W} \quad \checkmark"
                variant="blue"
              />
              <p className="text-sm font-semibold mt-2">Stemmer! All mekanisk energi tilført omdannes til varme i resistansen.</p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
