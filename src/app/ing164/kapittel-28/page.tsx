"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 28)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Biot-Savart felt fra strømelement ─── */
function BiotSavartCalculator() {
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
function LongWireFieldVisualizer() {
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
function ParallelWiresForce() {
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

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ══════════════════════════════════════════════
          1. TEORISAMMENDRAG
          ══════════════════════════════════════════════ */}
      <div id="teorisammendrag">
        <h2 className="text-2xl font-bold mt-10 mb-6">Teorisammendrag</h2>

        {/* 28.1 Magnetfelt til en ladning i bevegelse */}
        <TheorySummary
          title="28.1 Magnetfelt til en ladning i bevegelse"
          mustKnow={[
            "En ladet partikkel i bevegelse skaper et magnetfelt rundt seg",
            "Feltstyrken avhenger av ladning, fart, avstand og vinkel",
            "B = (μ₀/4π) · |q|v sin φ / r²",
            "Feltlinjene er sirkler rundt fartsvektoren (høyrehåndsregelen)",
            "μ₀ = 4π × 10⁻⁷ T·m/A (permeabiliteten i vakuum)",
          ]}
          defaultOpen
        >
          <p>
            I kapittel 27 så vi at et magnetfelt virker en <em>kraft</em> på en ladet partikkel i bevegelse.
            Nå snur vi perspektivet: <strong>en ladet partikkel i bevegelse er selv en kilde til magnetfelt</strong>.
          </p>

          <p className="mt-3">
            Eksperimenter viser at en ladning <InlineLatex latex="q" /> som beveger seg med konstant fart{" "}
            <InlineLatex latex="\vec{v}" /> skaper et magnetfelt <InlineLatex latex="\vec{B}" /> i rommet
            rundt seg. Feltet har størrelse:
          </p>

          <FormulaBox
            latex="B = \frac{\mu_0}{4\pi} \cdot \frac{|q|v\sin\varphi}{r^2}"
            title="B-felt fra ladning i bevegelse"
            variant="gold"
            description="φ er vinkelen mellom v og retningsvektoren r̂ (fra ladningen til punktet). r er avstanden."
          />

          <p className="mt-3">På vektorform:</p>
          <FormulaBox
            latex="\vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{q\vec{v} \times \hat{r}}{r^2}"
            title="B-felt (vektorform)"
            variant="gold"
            description="Kryssproduktet v × r̂ gir retning vinkelrett på både v og r̂. Retning: høyrehåndsregelen."
          />

          <p className="mt-3">
            Her er <InlineLatex latex="\mu_0 = 4\pi \times 10^{-7}\;\text{T·m/A}" /> <strong>permeabiliteten i vakuum</strong> —
            magnetismens svar på <InlineLatex latex="\varepsilon_0" /> i elektrostatikk.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Analogi: Coulombs lov ↔ magnetfelt fra ladning</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--card-border)]">
                    <th className="text-left py-1 pr-4">Elektrisk (kap 21)</th>
                    <th className="text-left py-1">Magnetisk (kap 28)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--card-border)]">
                    <td className="py-1 pr-4"><InlineLatex latex="E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}" /></td>
                    <td className="py-1"><InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)]">
                    <td className="py-1 pr-4">Avhenger av q og r</td>
                    <td className="py-1">Avhenger av q, v, r og vinkel φ</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">Radialt felt (utover/innover)</td>
                    <td className="py-1">Sirkulært felt (rundt v-retning)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Viktige spesialtilfeller</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>φ = 90°</strong> (vinkelrett på v): B er <em>maksimal</em></li>
              <li>• <strong>φ = 0° eller 180°</strong> (langs v): B = 0, <em>ingen felt foran/bak ladningen</em></li>
              <li>• Feltet avtar som <InlineLatex latex="1/r^2" />, akkurat som Coulombs lov</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 28.2 Magnetfelt fra et strømelement — Biot-Savarts lov */}
        <TheorySummary
          title="28.2 Magnetfelt fra et strømelement — Biot-Savarts lov"
          mustKnow={[
            "Strøm = mange ladninger i bevegelse → lederen lager magnetfelt",
            "Biot-Savarts lov: dB = (μ₀/4π) · I dl sin φ / r²",
            "Totalt felt: integrer (summer) bidragene fra hele lederen",
            "Retning: dl × r̂ (høyrehåndsregelen)",
          ]}
        >
          <p>
            I en strømførende leder er det ladninger i bevegelse. Derfor skaper lederen et magnetfelt rundt seg.
            Vi deler lederen inn i små elementer med lengde <InlineLatex latex="d\vec{l}" />.
          </p>

          <p className="mt-3">
            Hvert element bidrar med et lite felt <InlineLatex latex="d\vec{B}" />. Total ladning i elementet
            er <InlineLatex latex="dQ = nqA\,dl" /> (n = ladningskonsentrasjon, A = tverrsnitt). Siden{" "}
            <InlineLatex latex="nqv_dA = I" />, får vi:
          </p>

          <FormulaBox
            latex="dB = \frac{\mu_0}{4\pi} \cdot \frac{I\,dl\,\sin\varphi}{r^2}"
            title="Biot-Savarts lov (størrelse)"
            variant="gold"
            description="dl = lengde av strømelementet, r = avstand til punktet, φ = vinkel mellom dl og r̂."
          />

          <FormulaBox
            latex="d\vec{B} = \frac{\mu_0}{4\pi} \cdot \frac{I\,d\vec{l} \times \hat{r}}{r^2}"
            title="Biot-Savarts lov (vektorform)"
            variant="gold"
            description="Retningen gis av kryssproduktet dl × r̂. Dette er den fundamentale loven for B fra strøm."
          />

          <p className="mt-3">For å finne det totale magnetfeltet fra hele lederen, integrerer vi over alle elementer:</p>
          <FormulaBox
            latex="\vec{B} = \frac{\mu_0}{4\pi} \int \frac{I\,d\vec{l} \times \hat{r}}{r^2}"
            title="Totalt B-felt fra en leder"
            variant="blue"
            description="Integrasjonen summerer bidragene fra alle strømelementer langs lederen."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Slik bruker du Biot-Savarts lov</p>
            <ol className="text-sm space-y-1">
              <li>1. Identifiser strømelementet <InlineLatex latex="d\vec{l}" /> og retningen</li>
              <li>2. Finn avstanden <InlineLatex latex="r" /> og retningsvektoren <InlineLatex latex="\hat{r}" /> til punktet</li>
              <li>3. Finn vinkelen <InlineLatex latex="\varphi" /> mellom <InlineLatex latex="d\vec{l}" /> og <InlineLatex latex="\hat{r}" /></li>
              <li>4. Regn ut <InlineLatex latex="dB" /> og bestem retningen med høyrehåndsregelen</li>
              <li>5. Integrer for å finne totalt felt</li>
            </ol>
          </div>
        </TheorySummary>

        {/* 28.3 Magnetfelt fra en rett strømførende leder */}
        <TheorySummary
          title="28.3 Magnetfelt fra en rett strømførende leder"
          mustKnow={[
            "Lang rett leder: B = μ₀I / (2πr)",
            "Feltet avtar som 1/r (ikke 1/r² som for punktladning!)",
            "Feltlinjene er konsentriske sirkler rundt lederen",
            "Retning: Høyrehåndsregelen — tommel langs I, fingrene krummer i B-retning",
          ]}
        >
          <p>
            Ved å bruke Biot-Savarts lov på en rett leder med lengde <InlineLatex latex="2a" /> finner vi
            feltet i avstand <InlineLatex latex="x" /> fra midten:
          </p>

          <FormulaBox
            latex="B = \frac{\mu_0 I}{4\pi} \cdot \frac{2a}{x\sqrt{x^2 + a^2}}"
            title="Endelig rett leder"
            variant="blue"
            description="a = halve lengden av lederen, x = vinkelrett avstand fra lederen."
          />

          <p className="mt-3">
            For en <strong>uendelig lang</strong> leder (<InlineLatex latex="a \gg x" />) forenkles dette til:
          </p>

          <FormulaBox
            latex="B = \frac{\mu_0 I}{2\pi r}"
            title="Uendelig lang rett leder"
            variant="gold"
            description="r = vinkelrett avstand fra lederen. Dette er formelen du bruker mest!"
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Høyrehåndsregelen for rett leder</p>
            <ol className="text-sm space-y-1">
              <li>1. Pek <strong>tommelen</strong> i strømretningen I</li>
              <li>2. <strong>Fingrene krummer</strong> i retningen til B-feltlinjene</li>
              <li>3. Feltlinjene er <strong>konsentriske sirkler</strong> rundt lederen</li>
            </ol>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Merk: 1/r vs. 1/r²</p>
            <p className="text-sm">
              B-feltet fra en lang rett leder avtar som <InlineLatex latex="1/r" />, ikke{" "}
              <InlineLatex latex="1/r^2" />. Dette er fordi vi summerer bidragene fra <em>uendelig mange</em>{" "}
              strømelementer langs lederen. Sammenlign med E-feltet fra en uendelig lang linjeladning:{" "}
              <InlineLatex latex="E = \lambda/(2\pi\varepsilon_0 r)" /> — samme <InlineLatex latex="1/r" />-avhengighet!
            </p>
          </div>
        </TheorySummary>

        {/* 28.4 Krefter mellom parallelle ledere */}
        <TheorySummary
          title="28.4 Krefter mellom parallelle ledere"
          mustKnow={[
            "Kraft per lengdeenhet: F/L = μ₀II′ / (2πr)",
            "Samme strømretning → tiltrekkende kraft",
            "Motsatt strømretning → frastøtende kraft",
            "Definisjonen av Ampere er basert på denne kraften",
          ]}
        >
          <p>
            To parallelle strømførende ledere påvirker hverandre magnetisk. Den ene lederen skaper et
            B-felt, og den andre lederen (med strøm i B-feltet) opplever en kraft.
          </p>

          <p className="mt-3">
            Leder 1 med strøm <InlineLatex latex="I" /> lager et felt{" "}
            <InlineLatex latex="B = \mu_0 I / (2\pi r)" /> ved leder 2.
            Kraften på leder 2 (med strøm <InlineLatex latex="I'" /> og lengde <InlineLatex latex="L" />) blir:
          </p>

          <FormulaBox
            latex="\frac{F_m}{L} = \frac{\mu_0 I I'}{2\pi r}"
            title="Kraft per lengdeenhet mellom parallelle ledere"
            variant="gold"
            description="r = avstand mellom lederne, I og I' = strømmene. Tiltrekkende for lik strømretning."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Retning på kraften</p>
            <ul className="text-sm space-y-2">
              <li>• <strong>Samme strømretning:</strong> Lederne <span className="text-green-600 dark:text-green-400 font-semibold">tiltrekker</span> hverandre</li>
              <li>• <strong>Motsatt strømretning:</strong> Lederne <span className="text-red-600 dark:text-red-400 font-semibold">frastøter</span> hverandre</li>
            </ul>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Definisjonen av Ampere</p>
            <p className="text-sm">
              Denne kraften brukes til å definere enheten <strong>Ampere</strong>: To uendelig lange parallelle ledere
              med 1 meters avstand, som fører lik strøm, definerer 1 Ampere når den magnetiske kraften
              per lengdeenhet er nøyaktig <InlineLatex latex="F_m/L = 2 \times 10^{-7}\;\text{N/m}" />.
              Dermed følger også: <InlineLatex latex="1\;\text{C} = 1\;\text{A} \cdot 1\;\text{s}" />.
            </p>
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
            latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}"
            title="B fra ladning i bevegelse"
            variant="gold"
          />
          <FormulaBox
            latex="\vec{B} = \frac{\mu_0}{4\pi}\frac{q\vec{v}\times\hat{r}}{r^2}"
            title="B fra ladning (vektor)"
            variant="gold"
          />
          <FormulaBox
            latex="d\vec{B} = \frac{\mu_0}{4\pi}\frac{I\,d\vec{l}\times\hat{r}}{r^2}"
            title="Biot-Savarts lov"
            variant="gold"
          />
          <FormulaBox
            latex="B = \frac{\mu_0 I}{2\pi r}"
            title="Lang rett leder"
            variant="gold"
          />
          <FormulaBox
            latex="\frac{F_m}{L} = \frac{\mu_0 I I'}{2\pi r}"
            title="Kraft mellom parallelle ledere"
            variant="gold"
          />
          <FormulaBox
            latex="\mu_0 = 4\pi \times 10^{-7}\;\text{T·m/A}"
            title="Permeabiliteten i vakuum"
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
                  <th className="text-left py-2 pr-4">Du vil finne…</th>
                  <th className="text-left py-2 pr-4">Bruk…</th>
                  <th className="text-left py-2">Husk…</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">B-felt fra en ladet partikkel</td>
                  <td className="py-2 pr-4"><InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></td>
                  <td className="py-2">φ mellom v og retning til punktet</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">B-felt fra et strømelement</td>
                  <td className="py-2 pr-4"><InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\sin\varphi}{r^2}" /></td>
                  <td className="py-2">Må integreres for totalt felt</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">B-felt fra lang rett leder</td>
                  <td className="py-2 pr-4"><InlineLatex latex="B = \frac{\mu_0 I}{2\pi r}" /></td>
                  <td className="py-2">r = vinkelrett avstand. Felt i sirkler.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Kraft mellom to ledere</td>
                  <td className="py-2 pr-4"><InlineLatex latex="F/L = \frac{\mu_0 II'}{2\pi r}" /></td>
                  <td className="py-2">Lik retning → tiltrekker</td>
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
        <BiotSavartCalculator />
        <LongWireFieldVisualizer />
        <ParallelWiresForce />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: To protoner — fra forelesning */}
        <ExerciseCard
          number={1}
          title="To protoner i bevegelse — elektrisk og magnetisk kraft"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                To protoner beveger seg i <em>motsatte retninger</em> langs x-aksen med fart{" "}
                <InlineLatex latex="v" />. Avstanden mellom dem er <InlineLatex latex="r" /> (langs y-aksen).
              </p>
              <p className="mt-2">
                a) Finn den elektriske kraften mellom protonene.
              </p>
              <p>
                b) Finn B-feltet som det nederste protonet skaper ved det øverste.
              </p>
              <p>
                c) Finn den magnetiske kraften på det øverste protonet.
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Elektrisk kraft: Coulombs lov med <InlineLatex latex="q = e" />.</p> },
            { label: "Hint 2", content: <p>B-felt: Det nederste protonet beveger seg i +x, og punktet er i +y-retning. Vinkelen φ = 90°.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Elektrisk kraft:</strong></p>
              <FormulaBox
                latex="F_e = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} \quad \text{(i y-retningen, frastøtende)}"
                variant="gold"
              />

              <p><strong>b) B-felt fra det nederste protonet:</strong></p>
              <p className="text-sm">
                Det nederste protonet beveger seg i +x-retning. Punktet (der det øverste protonet er) ligger
                i +y-retning, altså φ = 90°.
              </p>
              <FormulaBox
                latex="B = \frac{\mu_0}{4\pi}\frac{ev}{r^2}"
                variant="gold"
              />

              <p><strong>c) Magnetisk kraft:</strong></p>
              <p className="text-sm">
                Det øverste protonet har fart i −x-retning og er i B-feltet fra det nederste:
              </p>
              <FormulaBox
                latex="F_m = qvB = e \cdot v \cdot \frac{\mu_0}{4\pi}\frac{ev}{r^2} = \frac{\mu_0}{4\pi}\frac{e^2 v^2}{r^2}"
                variant="gold"
              />
              <p className="text-sm">
                Retning: <strong>tiltrekkende</strong> (mot det andre protonet) — altså <em>motsatt</em> av den elektriske kraften.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Elektrisk kraft frastøter, magnetisk kraft tiltrekker.
                Men for ladninger med <InlineLatex latex="v \ll c" /> er <InlineLatex latex="F_m \ll F_e" /> (den magnetiske kraften er mye svakere).</p>
            </div>
          }
        />

        {/* Eksempel 2: Biot-Savart fra et strømelement */}
        <ExerciseCard
          number={2}
          title="Feltbidrag fra et strømelement (Biot-Savart)"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kobbertråd fører strøm <InlineLatex latex="I = 125\;\text{A}" />.
                Vi ser på et lite element med lengde <InlineLatex latex="dl = 0{,}01\;\text{m} = 1\;\text{cm}" />.
                Finn feltbidraget <InlineLatex latex="dB" /> i et punkt P som er{" "}
                <InlineLatex latex="r = 1{,}2\;\text{m}" /> unna elementet:
              </p>
              <p className="mt-2">a) Punktet P ligger rett ut fra lederen (φ = 90°).</p>
              <p>b) Punktet P ligger 30° fra lederens retning (φ = 30°).</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bruk <InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin\varphi}{r^2}" /></p> },
            { label: "Hint 2", content: <p>Husk: <InlineLatex latex="\mu_0/(4\pi) = 10^{-7}\;\text{T·m/A}" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) φ = 90°:</strong></p>
              <FormulaBox
                latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 90°}{r^2} = 10^{-7} \cdot \frac{125 \cdot 0{,}01 \cdot 1}{1{,}2^2} = \underline{\underline{8{,}7 \times 10^{-8}\;\text{T}}}"
                variant="gold"
              />
              <p className="text-sm">Retning: ut av arket (høyrehåndsregelen: dl × r̂).</p>

              <p><strong>b) φ = 30°:</strong></p>
              <FormulaBox
                latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 30°}{r^2} = 10^{-7} \cdot \frac{125 \cdot 0{,}01 \cdot 0{,}5}{1{,}2^2} = \underline{\underline{4{,}3 \times 10^{-8}\;\text{T}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> sin φ-faktoren er avgjørende. Ved φ = 30° er feltet halvparten av φ = 90°.
                Ved φ = 0° (langs lederen) er feltet null.</p>
            </div>
          }
        />

        {/* Eksempel 3: Lang rett leder — avstand */}
        <ExerciseCard
          number={3}
          title="Avstand fra lang rett leder for gitt B-felt"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En lang, rett strømførende leder fører <InlineLatex latex="I = 1{,}0\;\text{A}" />.
                Vi måler magnetfeltet til <InlineLatex latex="B = 0{,}5 \times 10^{-4}\;\text{T}" />.
              </p>
              <p className="mt-2">
                Hvor langt unna lederen er vi?
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Bruk <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> og løs for r.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Løsning:</strong></p>
              <p className="text-sm">Vi løser <InlineLatex latex="B = \mu_0 I / (2\pi r)" /> for r:</p>
              <FormulaBox
                latex="r = \frac{\mu_0 I}{2\pi B} = \frac{4\pi \times 10^{-7} \cdot 1{,}0}{2\pi \cdot 0{,}5 \times 10^{-4}} = 4 \times 10^{-3}\;\text{m} = \underline{\underline{4\;\text{mm}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Vi kan omforme formelen for å finne avstand.
                Legg merke til at 4 mm er svært nært lederen — magnetfeltet fra en vanlig leder er ganske svakt.</p>
            </div>
          }
        />

        {/* Eksempel 4: Kraft mellom superledere */}
        <ExerciseCard
          number={4}
          title="Kraft mellom parallelle superledere"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                To rette, parallelle superledere plasseres med innbyrdes avstand{" "}
                <InlineLatex latex="r = 4{,}5\;\text{mm}" />. De fører lik strøm{" "}
                <InlineLatex latex="I = 15\,000\;\text{A}" /> i <em>motsatte</em> retninger.
              </p>
              <p className="mt-2">Hva er magnetkraften per lengdeenhet?</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Bruk <InlineLatex latex="F_m/L = \mu_0 II'/(2\pi r)" />. Husk å konvertere mm til m.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <FormulaBox
                latex="\frac{F_m}{L} = \frac{\mu_0 I \cdot I'}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 15000 \cdot 15000}{2\pi \cdot 4{,}5 \times 10^{-3}} = \underline{\underline{1{,}0 \times 10^4\;\text{N/m}}}"
                variant="gold"
              />
              <p className="text-sm">
                Siden strømmene er i <strong>motsatte retninger</strong>, er kraften <strong>frastøtende</strong>.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> 10 kN per meter er en enorm kraft!
                Med superledere som fører store strømmer, blir de magnetiske kreftene svært betydelige.
                Superledermagnetene i LHC (CERN) må designes for å tåle slike krefter.</p>
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
            <h3 className="font-semibold text-lg mb-3">Strategi: B-felt fra en ladning i bevegelse (28.1)</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Tegn situasjonen: ladning med fart <InlineLatex latex="\vec{v}" />, punkt P, avstand r.</li>
              <li><strong>2.</strong> Finn vinkelen φ mellom <InlineLatex latex="\vec{v}" /> og <InlineLatex latex="\hat{r}" /> (retning fra ladning til P).</li>
              <li><strong>3.</strong> Beregn størrelse: <InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" /></li>
              <li><strong>4.</strong> Bestem retning: Bruk høyrehåndsregelen (<InlineLatex latex="\vec{v} \times \hat{r}" />).
                For positiv ladning peker fingrene fra v mot r̂, tommel gir B-retning.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Biot-Savart (28.2-28.3)</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Identifiser geometrien: rett leder, sirkulær sløyfe, etc.</li>
              <li><strong>2.</strong> For et enkelt element: bruk <InlineLatex latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin\varphi}{r^2}" /></li>
              <li><strong>3.</strong> For lang rett leder: bruk direkte <InlineLatex latex="B = \frac{\mu_0 I}{2\pi r}" /></li>
              <li><strong>4.</strong> Husk at r er <em>vinkelrett</em> avstand for lang leder.</li>
            </ol>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Vanlig feil:</p>
              <p className="text-sm">Blander r i Biot-Savart (avstand fra element til punkt) med r i lang-leder-formelen (vinkelrett avstand). De er forskjellige!</p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Kraft mellom parallelle ledere (28.4)</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Identifiser strømmene <InlineLatex latex="I" /> og <InlineLatex latex="I'" />, og avstand r.</li>
              <li><strong>2.</strong> Bruk <InlineLatex latex="F_m/L = \mu_0 II'/(2\pi r)" /> for kraft per lengdeenhet.</li>
              <li><strong>3.</strong> Bestem retning:
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Samme retning → <strong>tiltrekker</strong></li>
                  <li>• Motsatt retning → <strong>frastøter</strong></li>
                </ul>
              </li>
              <li><strong>4.</strong> For total kraft: <InlineLatex latex="F = (F/L) \cdot L" /></li>
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
          title="Magnetfelt fra en ladning"
          difficulty="lett"
          source="Oppgave 28.1"
          problem={
            <div>
              <p>
                Et proton (<InlineLatex latex="q = 1{,}60 \times 10^{-19}\;\text{C}" />) beveger seg med
                fart <InlineLatex latex="v = 4{,}0 \times 10^6\;\text{m/s}" /> i +x-retning.
              </p>
              <p className="mt-2">
                Finn magnetfeltet (størrelse og retning) i et punkt som ligger 0,50 m fra protonet i:
              </p>
              <p>a) +y-retning (φ = 90°)</p>
              <p>b) en retning som danner 45° med x-aksen</p>
              <p>c) +x-retning (φ = 0°)</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bruk <InlineLatex latex="B = \frac{\mu_0}{4\pi}\frac{|q|v\sin\varphi}{r^2}" />. Sett inn r = 0,50 m.</p> },
            { label: "Hint 2", content: <p>For retning: <InlineLatex latex="\vec{v} \times \hat{r}" />. Bruk høyrehåndsregelen.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) φ = 90°:</strong></p>
              <FormulaBox
                latex="B = 10^{-7} \cdot \frac{1{,}60 \times 10^{-19} \cdot 4{,}0 \times 10^6 \cdot \sin 90°}{0{,}50^2} = \underline{\underline{2{,}56 \times 10^{-19}\;\text{T}}}"
                variant="gold"
              />
              <p className="text-sm">Retning: <InlineLatex latex="\hat{x} \times \hat{y} = \hat{z}" /> → i −z-retning (inn i arket).</p>

              <p><strong>b) φ = 45°:</strong></p>
              <FormulaBox
                latex="B = 10^{-7} \cdot \frac{1{,}60 \times 10^{-19} \cdot 4{,}0 \times 10^6 \cdot \sin 45°}{0{,}50^2} = \underline{\underline{1{,}81 \times 10^{-19}\;\text{T}}}"
                variant="gold"
              />

              <p><strong>c) φ = 0°:</strong></p>
              <p className="text-sm"><InlineLatex latex="\sin 0° = 0 \Rightarrow B = 0" />. Ingen felt langs bevegelsesretningen!</p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Biot-Savart fra et strømelement"
          difficulty="lett"
          source="Oppgave 28.11"
          problem={
            <div>
              <p>
                Et kort stykke av en ledning bærer strøm <InlineLatex latex="I = 10{,}0\;\text{A}" />.
                Elementet <InlineLatex latex="dl = 0{,}50\;\text{mm} = 5{,}0 \times 10^{-4}\;\text{m}" />{" "}
                peker i +y-retning. Finn <InlineLatex latex="d\vec{B}" /> i punktet{" "}
                <InlineLatex latex="(x, y, z) = (2{,}0\;\text{m},\, 0,\, 0)" />.
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>dl er i +y, r̂ er i +x (fra elementet til punktet). φ = 90°.</p> },
            { label: "Hint 2", content: <p><InlineLatex latex="\hat{y} \times \hat{x} = -\hat{z}" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p className="text-sm"><InlineLatex latex="d\vec{l} = dl\,\hat{y}" />, <InlineLatex latex="\hat{r} = \hat{x}" />, <InlineLatex latex="r = 2{,}0\;\text{m}" />, <InlineLatex latex="\varphi = 90°" /></p>
              <FormulaBox
                latex="dB = \frac{\mu_0}{4\pi}\frac{I\,dl\,\sin 90°}{r^2} = 10^{-7}\cdot\frac{10{,}0 \cdot 5{,}0\times10^{-4}}{(2{,}0)^2} = \underline{\underline{1{,}25 \times 10^{-10}\;\text{T}}}"
                variant="gold"
              />
              <p className="text-sm">Retning: <InlineLatex latex="\hat{y}\times\hat{x} = -\hat{z}" /> → feltet peker i <strong>−z-retning</strong> (inn i arket).</p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Magnetfelt fra lang rett ledning"
          difficulty="lett"
          source="Oppgave 28.19"
          problem={
            <div>
              <p>
                En lang, rett ledning fører strøm <InlineLatex latex="I = 4{,}00\;\text{A}" />.
                Finn magnetfeltet i avstand <InlineLatex latex="r = 0{,}10\;\text{m}" /> fra ledningen.
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Bruk direkte: <InlineLatex latex="B = \mu_0 I/(2\pi r)" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <FormulaBox
                latex="B = \frac{\mu_0 I}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 4{,}00}{2\pi \cdot 0{,}10} = \underline{\underline{8{,}0 \times 10^{-6}\;\text{T} = 8{,}0\;\mu\text{T}}}"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={4}
          title="Kraft mellom parallelle ledere"
          difficulty="middels"
          source="Oppgave 28.27"
          problem={
            <div>
              <p>
                To parallelle ledere med avstand <InlineLatex latex="r = 0{,}40\;\text{m}" /> fører strømmer{" "}
                <InlineLatex latex="I_1 = 5{,}0\;\text{A}" /> og <InlineLatex latex="I_2 = 2{,}0\;\text{A}" /> i
                samme retning. Lederne er <InlineLatex latex="L = 3{,}0\;\text{m}" /> lange.
              </p>
              <p className="mt-2">
                a) Finn kraften mellom dem.
              </p>
              <p>
                b) Er kraften tiltrekkende eller frastøtende?
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Finn kraft per lengdeenhet først, gang med L.</p> },
            { label: "Hint 2", content: <p>Samme strømretning → tiltrekkende.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kraft:</strong></p>
              <FormulaBox
                latex="F = \frac{\mu_0 I_1 I_2}{2\pi r} \cdot L = \frac{4\pi \times 10^{-7} \cdot 5{,}0 \cdot 2{,}0}{2\pi \cdot 0{,}40} \cdot 3{,}0 = \underline{\underline{1{,}5 \times 10^{-5}\;\text{N} = 15\;\mu\text{N}}}"
                variant="gold"
              />
              <p><strong>b)</strong> Strømmene er i <strong>samme retning</strong>, så kraften er <strong>tiltrekkende</strong>.</p>
            </div>
          }
        />

        <ExerciseCard
          number={5}
          title="Superposisjon av B-felt fra to ledere"
          difficulty="vanskelig"
          source="Problem 28.61"
          problem={
            <div>
              <p>
                To lange, parallelle ledere er atskilt med avstand <InlineLatex latex="d" />.
                De fører strømmer <InlineLatex latex="I_1" /> og <InlineLatex latex="I_2" /> i <em>motsatte</em> retninger.
              </p>
              <p className="mt-2">
                Finn magnetfeltet i et punkt P som ligger midt mellom de to lederne.
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Hvert B-felt er <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> med <InlineLatex latex="r = d/2" />.</p> },
            { label: "Hint 2", content: <p>Bruk superposisjon: siden strømmene er i motsatte retninger, peker begge B-feltene i <em>samme</em> retning i punktet midt mellom. Legg dem sammen!</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p className="text-sm">
                I punktet midt mellom er avstanden fra begge lederne <InlineLatex latex="r = d/2" />.
              </p>
              <p className="text-sm">
                Høyrehåndsregelen viser at B-feltene fra begge lederne peker i <strong>samme retning</strong> i midtpunktet
                (motsatte strømmer gir felt som adderer):
              </p>
              <FormulaBox
                latex="B_{\text{tot}} = B_1 + B_2 = \frac{\mu_0 I_1}{2\pi(d/2)} + \frac{\mu_0 I_2}{2\pi(d/2)} = \frac{\mu_0(I_1 + I_2)}{\pi d}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> For to ledere med <em>motsatte</em> strømmer adderer B-feltene i midten.
                Hadde strømmene vært i <em>samme</em> retning, ville de subtrahert (pekt i motsatte retninger i midtpunktet).</p>
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
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Eksamenstips — Kapittel 28</p>
          <ul className="text-sm space-y-1">
            <li>• <strong>Lang rett leder</strong> er den vanligste oppgavetypen — ha <InlineLatex latex="B = \mu_0 I/(2\pi r)" /> i fingrene</li>
            <li>• <strong>Kraft mellom ledere</strong> dukker ofte opp — husk å sjekke retningen (same/opposite)</li>
            <li>• <strong>Biot-Savart for et element</strong> kan komme — pass på vinkelen φ</li>
            <li>• <strong>Superposisjon</strong> av felt fra flere ledere — tegn retningene nøye!</li>
            <li>• Husk: <InlineLatex latex="\mu_0/(4\pi) = 10^{-7}" /> for rask regning</li>
          </ul>
        </div>

        <ExerciseCard
          number={1}
          title="Eksamenstype: B-felt og kraft med parallelle ledere"
          difficulty="middels"
          source="Eksamenstype"
          problem={
            <div>
              <p>
                Tre lange, parallelle ledere er plassert i et plan. Leder A og C er adskilt med 10 cm
                og fører begge <InlineLatex latex="I_A = I_C = 5{,}0\;\text{A}" /> oppover.
                Leder B er midt mellom (5 cm fra hver) og fører <InlineLatex latex="I_B = 10{,}0\;\text{A}" /> nedover.
              </p>
              <p className="mt-2">
                a) Finn det totale magnetfeltet i leder B sin posisjon (fra A og C).
              </p>
              <p>b) Finn kraft per lengdeenhet på leder B.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Finn B fra A og B fra C separat. Begge har r = 5 cm.</p> },
            { label: "Hint 2", content: <p>A fører strøm oppover, C fører strøm oppover. Bruk høyrehåndsregelen for å finne B-retning ved B sin posisjon.</p> },
            { label: "Hint 3", content: <p>Kraft per lengdeenhet: <InlineLatex latex="F/L = I_B \cdot B_{\text{tot}}" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) B-felt ved leder B:</strong></p>
              <p className="text-sm">
                B fra leder A ved B (r = 0,05 m):
              </p>
              <FormulaBox
                latex="B_A = \frac{\mu_0 I_A}{2\pi r} = \frac{4\pi \times 10^{-7} \cdot 5{,}0}{2\pi \cdot 0{,}05} = 2{,}0 \times 10^{-5}\;\text{T}"
                variant="blue"
              />
              <p className="text-sm">
                B fra leder C ved B (r = 0,05 m) er like stort. Høyrehåndsregelen viser at begge peker
                i <strong>samme retning</strong> ved B sin posisjon (begge har oppover strøm, og B er mellom dem).
              </p>
              <FormulaBox
                latex="B_{\text{tot}} = B_A + B_C = 2 \times 2{,}0 \times 10^{-5} = \underline{\underline{4{,}0 \times 10^{-5}\;\text{T}}}"
                variant="gold"
              />

              <p><strong>b) Kraft per lengdeenhet på B:</strong></p>
              <FormulaBox
                latex="\frac{F}{L} = I_B \cdot B_{\text{tot}} = 10{,}0 \cdot 4{,}0 \times 10^{-5} = \underline{\underline{4{,}0 \times 10^{-4}\;\text{N/m}}}"
                variant="gold"
              />
              <p className="text-sm">
                Retning: Bruk <InlineLatex latex="\vec{F} = I\vec{l} \times \vec{B}" />. Kraften er vinkelrett på
                B-feltet og strømretningen i B. Leder B (med motsatt strøm) frastøtes fra begge sidene.
              </p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
