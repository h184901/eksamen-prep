"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 27)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Magnetisk kraft-kalkulator ─── */
function LorentzForceCalculator() {
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
            // Force direction: v × B (B into page = -z), so F = q(v × B)
            // For v in xy-plane and B in -z: F direction is perpendicular to v, pointing "left" of v direction
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

/* ─── Interactive: Sirkelbane i magnetfelt ─── */
function CircularMotionVisualizer() {
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

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ══════════════════════════════════════════════
          1. TEORISAMMENDRAG
          ══════════════════════════════════════════════ */}
      <div id="teorisammendrag">
        <h2 className="text-2xl font-bold mt-10 mb-6">Teorisammendrag</h2>

        {/* 27.1 Magnetisme */}
        <TheorySummary
          title="27.1 Magnetisme"
          mustKnow={[
            "Alle magneter har to poler: nordpol og sørpol",
            "Like poler frastøter, ulike poler tiltrekker",
            "Magnetiske poler opptrer alltid i par — man kan ikke isolere én pol",
            "Jordkloden er en stor magnet (geografisk nordpol ≈ magnetisk sørpol)",
          ]}
        >
          <p>
            Alle permanente magneter har to poler: <strong>nordpol (N)</strong> og <strong>sørpol (S)</strong>.
            Like poler frastøter hverandre, ulike poler tiltrekker — akkurat som elektriske ladninger,
            men med en viktig forskjell: man kan <em>aldri</em> separere polene. Bryter du en magnet i to,
            får du to mindre magneter, hver med N og S.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Analogi: Elektrisitet vs. magnetisme</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--card-border)]">
                    <th className="text-left py-1 pr-4">Elektrisitet</th>
                    <th className="text-left py-1">Magnetisme</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--card-border)]">
                    <td className="py-1 pr-4">Positiv/negativ ladning</td>
                    <td className="py-1">Nordpol/sørpol</td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)]">
                    <td className="py-1 pr-4">Enkeltladninger finnes</td>
                    <td className="py-1">Enkeltpoler finnes IKKE</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">Felt: E (N/C)</td>
                    <td className="py-1">Felt: B (Tesla)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4">
            <strong>Magnetfelt:</strong> Området rundt en magnet hvor det virker magnetiske krefter kalles et
            magnetfelt. Feltets retning er den retningen nordpolen på en kompassnål peker.
          </p>
        </TheorySummary>

        {/* 27.2 Magnetfelt */}
        <TheorySummary
          title="27.2 Magnetfelt og magnetisk kraft på ladede partikler"
          mustKnow={[
            "Magnetisk kraft: F = qv × B (kryssproduktet!)",
            "Størrelse: F = |q|vB sin θ",
            "Kraften er ALLTID vinkelrett på både v og B",
            "Retning: Høyrehåndsregel (for positiv ladning)",
            "Enhet for B: Tesla (T) = N/(C·m/s) = Ns/(C·m)",
          ]}
        >
          <p>
            Eksperimenter viser at det virker <strong>magnetiske krefter på ladede partikler som
            beveger seg i magnetfelt</strong>. Kraften er:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Proporsjonal med ladningens verdi |q|</li>
            <li>Proporsjonal med normalkomponenten av farten (den delen som er vinkelrett på B)</li>
          </ul>

          <FormulaBox
            latex="\vec{F}_m = q\vec{v} \times \vec{B}"
            title="Magnetisk kraft (Lorentzkraften)"
            variant="gold"
            description="Kryssproduktet gir en kraft vinkelrett på BÅDE v og B. Retning fra høyrehåndsregelen."
          />

          <FormulaBox
            latex="F_m = |q| v B \sin\theta"
            title="Størrelsen av magnetkraften"
            variant="gold"
            description="θ er vinkelen mellom v og B. Maks kraft når θ = 90° (v ⊥ B). Null kraft når θ = 0° (v ∥ B)."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Høyrehåndsregelen</p>
            <ol className="text-sm space-y-1">
              <li>1. Pek fingrene i retning <strong>v</strong> (partikkelens fart)</li>
              <li>2. Bøy fingrene mot <strong>B</strong> (magnetfeltets retning)</li>
              <li>3. Tommelen peker i retning <strong>F</strong> (kraften) for <em>positiv</em> ladning</li>
              <li>4. For negativ ladning: <strong>snu retningen</strong></li>
            </ol>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig: Magnetkraften gjør IKKE arbeid</p>
            <p className="text-sm">
              Siden kraften alltid står vinkelrett på farten, endrer den bare <em>retningen</em> — aldri
              <em> farten</em> (kinetisk energi). Magnetkraften gjør derfor null arbeid: <InlineLatex latex="W = 0" />.
            </p>
          </div>
        </TheorySummary>

        {/* 27.3 Magnetiske feltlinjer og magnetisk fluks */}
        <TheorySummary
          title="27.3 Magnetiske feltlinjer og magnetisk fluks"
          mustKnow={[
            "Feltlinjer: alltid parallelle med B, fra N til S utenfor magneten",
            "Magnetiske feltlinjer er lukkede kurver (ingen start/slutt)",
            "Magnetisk fluks: Φ_B = BA cos φ",
            "Enhet for fluks: Weber (Wb) = T·m²",
            "Konvensjon: · = ut av arket, × = inn i arket",
          ]}
        >
          <p>
            Magnetfelt kan representeres med <strong>magnetiske feltlinjer</strong>.
            De er overalt parallelle med <InlineLatex latex="\vec{B}" />.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Feltlinjekonvensjon</p>
            <ul className="text-sm space-y-1">
              <li>• <strong>Prikker (·)</strong> = magnetfeltet peker <strong>ut av arket</strong> (mot deg)</li>
              <li>• <strong>Kryss (×)</strong> = magnetfeltet peker <strong>inn i arket</strong> (bort fra deg)</li>
              <li>• Tenk på en pil: <em>spissen</em> (·) = mot deg, <em>halen</em> (×) = bort fra deg</li>
            </ul>
          </div>

          <p className="mt-4"><strong>Magnetisk fluks</strong> gjennom en flate med areal A:</p>

          <FormulaBox
            latex="\Phi_B = B_\perp A = BA\cos\varphi"
            title="Magnetisk fluks"
            variant="gold"
            description="φ er vinkelen mellom B og flatens normalvektor. Enhet: Weber (Wb) = T·m²."
          />

          <p className="mt-2">
            Når B varierer over flaten: <InlineLatex latex="\Phi_B = \int B_\perp \, dA = \int B\cos\varphi \, dA" />
          </p>
        </TheorySummary>

        {/* 27.4 Bevegelse av ladede partikler */}
        <TheorySummary
          title="27.4 Bevegelse av ladede partikler i magnetfelt"
          mustKnow={[
            "v ⊥ B → sirkelbane med radius r = mv/(|q|B)",
            "Vinkelfart: ω = |q|B/m (uavhengig av v!)",
            "v ikke ⊥ B → spiralbane (heliks)",
            "Parallell komponent v∥ endres ikke",
          ]}
        >
          <p>
            Siden magnetkraften alltid står vinkelrett på farten, kan den ikke endre fartens
            <em> verdi</em> — bare fartens <em>retning</em>. Når <InlineLatex latex="\vec{v} \perp \vec{B}" />,
            følger ladningen en <strong>sirkelbane</strong>.
          </p>

          <p className="mt-2">Fra Newtons 2. lov med sentripetalkraft:</p>
          <FormulaBox
            latex="|q|vB = m\frac{v^2}{r} \quad \Rightarrow \quad r = \frac{mv}{|q|B}"
            title="Radius i sirkelbane"
            variant="gold"
            description="Større masse eller fart → større radius. Sterkere felt eller mer ladning → mindre radius."
          />

          <FormulaBox
            latex="\omega = \frac{v}{r} = \frac{|q|B}{m}"
            title="Syklotronfrekvens (vinkelfart)"
            variant="blue"
            description="Bemerk: ω er uavhengig av farten v! Alle partikler med lik q/m roterer med samme frekvens."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Spiralbane (heliks)</p>
            <p className="text-sm">
              Dersom <InlineLatex latex="\vec{v}" /> ikke er vinkelrett på <InlineLatex latex="\vec{B}" />,
              dekomponerer vi: <InlineLatex latex="v_\perp" /> (gir sirkelbane) og <InlineLatex latex="v_\parallel" /> (endres ikke).
              Resultatet er en spiralbane med radius <InlineLatex latex="r = mv_\perp / (|q|B)" />.
            </p>
          </div>
        </TheorySummary>

        {/* 27.5 Anvendelser */}
        <TheorySummary
          title="27.5 Anvendelser: Fartsvelger og massespektrometer"
          mustKnow={[
            "Fartsvelger: v = E/B når Fe = Fm",
            "Massespektrometer: R = mv/(qB') → bestem masse m",
          ]}
        >
          <p><strong>Fartsvelger:</strong> E-felt og B-felt står vinkelrett på hverandre og på partikkelens fart.
            Når den elektriske og magnetiske kraften balanserer:
          </p>
          <FormulaBox
            latex="qE = qvB \quad \Rightarrow \quad v = \frac{E}{B}"
            title="Fartsvelger"
            variant="gold"
            description="Bare partikler med denne farten passerer uavbøyd. Uavhengig av masse og ladning!"
          />

          <p className="mt-4">
            <strong>Massespektrometer:</strong> Partikler med kjent fart (fra fartsvelger) sendes inn
            i et nytt magnetfelt B&apos;. De følger en sirkelbane med radius:
          </p>
          <FormulaBox
            latex="R = \frac{mv}{qB'}"
            variant="blue"
            description="R kan måles, v er kjent, q = e, B' er kjent → m kan beregnes."
          />
        </TheorySummary>

        {/* 27.6 Magnetkraft på strømførende leder */}
        <TheorySummary
          title="27.6 Magnetkraft på en strømførende leder"
          mustKnow={[
            "Kraft på strømførende leder: F = IlB sin θ",
            "Vektorform: F = Il × B",
            "l-vektoren peker i strømretningen",
            "Retning: Høyrehåndsregelen (pek fingrene i strømretningen)",
          ]}
        >
          <p>
            Inne i en strømførende leder har vi ladninger q som beveger seg med driftsfart <InlineLatex latex="v_d" />.
            I et magnetfelt virker det magnetkrefter på lederen.
          </p>

          <FormulaBox
            latex="F_m = IlB\sin\theta"
            title="Magnetkraft på strømførende leder"
            variant="gold"
            description="I = strøm, l = lederens lengde, B = feltstyrke, θ = vinkel mellom l og B."
          />

          <FormulaBox
            latex="\vec{F}_m = I\vec{l} \times \vec{B}"
            title="Vektorform"
            variant="gold"
            description="l-vektoren peker i strømretningen. Kraften er vinkelrett på både strøm og felt."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Utledning fra Lorentzkraften</p>
            <p className="text-sm">
              Antall ladninger i lederen: <InlineLatex latex="N = nAl" /> (n = ladningskonsentrasjon).
              Total kraft = N · kraft per ladning: <InlineLatex latex="F = (nAlqv_d)B\sin\theta = (nqv_d)(AlB\sin\theta)" />.
              Siden <InlineLatex latex="I = nqv_dA" />, får vi <InlineLatex latex="F = IlB\sin\theta" />.
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
            latex="\vec{F}_m = q\vec{v} \times \vec{B}"
            title="Magnetisk kraft (vektor)"
            variant="gold"
          />
          <FormulaBox
            latex="F_m = |q|vB\sin\theta"
            title="Magnetisk kraft (størrelse)"
            variant="gold"
          />
          <FormulaBox
            latex="r = \frac{mv}{|q|B}"
            title="Sirkelradius i B-felt"
            variant="gold"
          />
          <FormulaBox
            latex="\omega = \frac{|q|B}{m}"
            title="Syklotronfrekvens"
            variant="gold"
          />
          <FormulaBox
            latex="\Phi_B = BA\cos\varphi"
            title="Magnetisk fluks"
            variant="gold"
          />
          <FormulaBox
            latex="v = \frac{E}{B}"
            title="Fartsvelger"
            variant="blue"
          />
          <FormulaBox
            latex="F_m = IlB\sin\theta"
            title="Kraft på strømførende leder"
            variant="gold"
          />
          <FormulaBox
            latex="\vec{F}_m = I\vec{l} \times \vec{B}"
            title="Kraft på leder (vektor)"
            variant="gold"
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
                  <td className="py-2 pr-4">Kraft på ladet partikkel i B-felt</td>
                  <td className="py-2 pr-4"><InlineLatex latex="F = |q|vB\sin\theta" /></td>
                  <td className="py-2">Retning: høyrehåndsregelen</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Sirkelbane-radius</td>
                  <td className="py-2 pr-4"><InlineLatex latex="r = mv/(|q|B)" /></td>
                  <td className="py-2">Bruk v⊥ hvis farten ikke er vinkelrett på B</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Fart i fartsvelger</td>
                  <td className="py-2 pr-4"><InlineLatex latex="v = E/B" /></td>
                  <td className="py-2">Balanse mellom Fe og Fm</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kraft på strømførende leder</td>
                  <td className="py-2 pr-4"><InlineLatex latex="F = IlB\sin\theta" /></td>
                  <td className="py-2">θ er mellom I-retning og B</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Magnetisk fluks</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\Phi_B = BA\cos\varphi" /></td>
                  <td className="py-2">φ er mellom B og normalen til flaten</td>
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
        <LorentzForceCalculator />
        <CircularMotionVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Proton i magnetfelt */}
        <ExerciseCard
          number={1}
          title="Proton i uniformt magnetfelt"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                Protoner beveger seg med <InlineLatex latex="v = 3{,}0 \cdot 10^5\;\text{m/s}" /> gjennom
                et uniformt magnetfelt <InlineLatex latex="B = 2{,}0\;\text{T}" /> rettet langs z-aksen.
                Fartsvektoren danner en vinkel på 30° med +z-aksen (mot x-aksen).
              </p>
              <p className="mt-2">Finn størrelsen og retningen på kraften.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bruk <InlineLatex latex="F = |q|vB\sin\theta" /> med θ = 30°.</p> },
            { label: "Hint 2", content: <p>Bruk høyrehåndsregelen for retningen: v × B.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Størrelse:</strong></p>
              <FormulaBox
                latex="F_m = |q|vB\sin 30° = 1{,}60 \cdot 10^{-19} \cdot 3{,}0 \cdot 10^5 \cdot 2{,}0 \cdot 0{,}5 = \underline{\underline{4{,}8 \cdot 10^{-14}\;\text{N}}}"
                variant="gold"
              />
              <p><strong>Retning:</strong></p>
              <p className="text-sm">
                Høyrehåndsregelen: v har komponent i xz-planet (mot +x og +z), B langs +z.
                Kraften peker i <strong>negativ y-retning</strong>.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Bare normalkomponenten v⊥ = v sin θ bidrar til kraften. Parallellkomponenten v∥ = v cos θ gir ingen kraft.</p>
            </div>
          }
        />

        {/* Eksempel 2: Proton i spiralbane */}
        <ExerciseCard
          number={2}
          title="Proton i spiralbane"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En proton (<InlineLatex latex="q = 1{,}60 \cdot 10^{-19}\;\text{C}" />,{" "}
                <InlineLatex latex="m = 1{,}67 \cdot 10^{-27}\;\text{kg}" />) beveger seg i et magnetfelt{" "}
                <InlineLatex latex="B = 0{,}5\;\text{T}" /> langs x-aksen.
                Farten har komponenter <InlineLatex latex="v_{0x} = 1{,}50 \cdot 10^5\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_{0y} = 0" />, <InlineLatex latex="v_{0z} = 2{,}0 \cdot 10^5\;\text{m/s}" />.
              </p>
              <p className="mt-2">a) Finn kraften.</p>
              <p>b) Finn radius i spiralbanen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>v_x er parallell med B → gir ingen kraft. Bare v_z (vinkelrett) gir kraft.</p> },
            { label: "Hint 2", content: <p>Radius bruker <InlineLatex latex="v_\perp = v_{0z}" />: <InlineLatex latex="r = mv_\perp/(|q|B)" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kraft:</strong></p>
              <p className="text-sm">Bare <InlineLatex latex="v_\perp = v_{0z} = 2{,}0 \cdot 10^5\;\text{m/s}" /> bidrar (v_x ∥ B).</p>
              <FormulaBox
                latex="F_m = |q|v_\perp B = 1{,}60 \cdot 10^{-19} \cdot 2{,}0 \cdot 10^5 \cdot 0{,}5 = \underline{\underline{1{,}60 \cdot 10^{-14}\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm">Retning: i y-retningen (fra høyrehåndsregelen).</p>

              <p><strong>b) Radius i spiralbanen:</strong></p>
              <FormulaBox
                latex="r = \frac{mv_\perp}{|q|B} = \frac{1{,}67 \cdot 10^{-27} \cdot 2{,}0 \cdot 10^5}{1{,}60 \cdot 10^{-19} \cdot 0{,}5} = \underline{\underline{4{,}18\;\text{mm}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Dekomponér farten i v∥ og v⊥. Parallellkomponenten gir rettlinjet bevegelse, normalkomponenten gir sirkelbane → spiralbane.</p>
            </div>
          }
        />

        {/* Eksempel 3: Kraft på strømførende leder */}
        <ExerciseCard
          number={3}
          title="Kraft på strømførende leder"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En rett leder med lengde <InlineLatex latex="l = 1{,}00\;\text{m}" /> fører
                en strøm <InlineLatex latex="I = 50\;\text{A}" />.
                Lederen befinner seg i et magnetfelt <InlineLatex latex="B = 1{,}20\;\text{T}" />.
                Vinkelen mellom lederen og B er 45°.
              </p>
              <p className="mt-2">a) Finn kraften.</p>
              <p>b) Hva er maks kraft? Når er F = 0?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p><InlineLatex latex="F = IlB\sin\theta" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a)</strong></p>
              <FormulaBox
                latex="F_m = IlB\sin 45° = 50 \cdot 1{,}00 \cdot 1{,}20 \cdot \sin 45° = \underline{\underline{42{,}4\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm">Rettet ut av arket (høyrehåndsregelen).</p>

              <p><strong>b) Maks og null:</strong></p>
              <FormulaBox latex="F_\text{maks} = IlB = 50 \cdot 1{,}00 \cdot 1{,}20 = \underline{\underline{60\;\text{N}}} \quad (\theta = 90°)" variant="gold" />
              <p className="text-sm">Når <InlineLatex latex="\theta = 0°" /> (strøm parallell med B): <InlineLatex latex="F_m = 0" />.</p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Helt likt som for enkeltladninger — maks kraft ved θ = 90°, null kraft ved θ = 0°.</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          5. OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <div id="strategier">
        <h2 className="text-2xl font-bold mt-12 mb-6">Oppgavestrategier</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Kraft på ladet partikkel i B-felt</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Tegn figur med v, B og koordinatsystem</li>
              <li>Finn vinkelen θ mellom v og B</li>
              <li>Beregn <InlineLatex latex="F = |q|vB\sin\theta" /></li>
              <li>Finn retning med høyrehåndsregelen (husk: snu for negativ ladning!)</li>
              <li>Hvis v ikke er ⊥ B: dekomponér i <InlineLatex latex="v_\perp" /> og <InlineLatex latex="v_\parallel" /></li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Sirkelbane i B-felt</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Identifiser: Er v ⊥ B? Hvis ikke → spiralbane, bruk <InlineLatex latex="v_\perp" /></li>
              <li>Sett <InlineLatex latex="|q|vB = mv^2/r" /> og løs for ukjent (r, v, B, eller m)</li>
              <li>Husk: <InlineLatex latex="\omega = |q|B/m" /> er uavhengig av fart</li>
              <li>Periode: <InlineLatex latex="T = 2\pi r/v = 2\pi m/(|q|B)" /></li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Kraft på strømførende leder</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Identifiser strømretning, lederens lengde, og vinkelen med B</li>
              <li>Bruk <InlineLatex latex="F = IlB\sin\theta" /></li>
              <li>For bøyde ledere: del opp i segmenter, integrer <InlineLatex latex="d\vec{F} = I\,d\vec{l} \times \vec{B}" /></li>
              <li>Bruk symmetri der mulig (f.eks. halvsirkel: x-komponent kansellerer)</li>
            </ol>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
            <ul className="space-y-1.5 text-sm">
              <li>• Glemmer sin θ — kraften er IKKE bare qvB</li>
              <li>• Bruker feil vinkel (θ er mellom v og B, IKKE mellom v og normalen)</li>
              <li>• Blander retning for positiv vs. negativ ladning i høyrehåndsregelen</li>
              <li>• Glemmer at magnetkraften ikke gjør arbeid (kan ikke endre kinetisk energi)</li>
              <li>• Bruker v (total fart) istedenfor v⊥ ved spiralbane</li>
              <li>• Forveksler magnetisk fluks (Φ = BA cos φ, vinkelen φ er mellom B og normalen) med magnetkraft (F = qvB sin θ, θ mellom v og B)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. ØVINGSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="ovingsoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Øvingsoppgaver</h2>

        <ExerciseCard
          number={1}
          title="Elektron i magnetfelt"
          difficulty="lett"
          problem={
            <div>
              <p>
                Et elektron (<InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" />) beveger seg med
                fart <InlineLatex latex="v = 5{,}0 \cdot 10^6\;\text{m/s}" /> vinkelrett på et uniformt
                magnetfelt <InlineLatex latex="B = 0{,}10\;\text{T}" />.
              </p>
              <p className="mt-2">a) Finn kraften på elektronet.</p>
              <p>b) Finn radius og periode for sirkelbanen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>v ⊥ B betyr θ = 90° og sin θ = 1.</p> },
            { label: "Hint 2", content: <p>Radius: <InlineLatex latex="r = m_e v/(eB)" />. Periode: <InlineLatex latex="T = 2\pi r/v" />.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kraft:</strong></p>
              <FormulaBox
                latex="F = eVB = 1{,}60 \cdot 10^{-19} \cdot 5{,}0 \cdot 10^6 \cdot 0{,}10 = \underline{\underline{8{,}0 \cdot 10^{-14}\;\text{N}}}"
                variant="gold"
              />
              <p><strong>b) Radius:</strong></p>
              <FormulaBox
                latex="r = \frac{m_e v}{eB} = \frac{9{,}11 \cdot 10^{-31} \cdot 5{,}0 \cdot 10^6}{1{,}60 \cdot 10^{-19} \cdot 0{,}10} = \underline{\underline{2{,}85 \cdot 10^{-4}\;\text{m} \approx 0{,}285\;\text{mm}}}"
                variant="gold"
              />
              <p><strong>Periode:</strong></p>
              <FormulaBox
                latex="T = \frac{2\pi r}{v} = \frac{2\pi \cdot 2{,}85 \cdot 10^{-4}}{5{,}0 \cdot 10^6} = \underline{\underline{3{,}58 \cdot 10^{-10}\;\text{s} \approx 0{,}36\;\text{ns}}}"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Fartsvelger"
          difficulty="middels"
          problem={
            <div>
              <p>
                I en fartsvelger er <InlineLatex latex="E = 2{,}0 \cdot 10^5\;\text{V/m}" /> og{" "}
                <InlineLatex latex="B = 0{,}40\;\text{T}" />.
              </p>
              <p className="mt-2">a) Hvilken fart har partiklene som passerer uavbøyd?</p>
              <p>b) Partiklene sendes inn i et nytt felt <InlineLatex latex="B' = 0{,}80\;\text{T}" /> og følger en sirkelbane med radius R = 0,012 m. Finn massen til partiklene dersom de har ladning +e.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Fartsvelger: <InlineLatex latex="v = E/B" /></p> },
            { label: "Hint 2", content: <p>Massespektrometer: <InlineLatex latex="m = qB'R/v" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a)</strong></p>
              <FormulaBox latex="v = \frac{E}{B} = \frac{2{,}0 \cdot 10^5}{0{,}40} = \underline{\underline{5{,}0 \cdot 10^5\;\text{m/s}}}" variant="gold" />
              <p><strong>b)</strong></p>
              <FormulaBox
                latex="m = \frac{qB'R}{v} = \frac{1{,}60 \cdot 10^{-19} \cdot 0{,}80 \cdot 0{,}012}{5{,}0 \cdot 10^5} = \underline{\underline{3{,}07 \cdot 10^{-25}\;\text{kg}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Sammenlign med protonmasse 1,67 × 10⁻²⁷ kg — dette er ca. 184 protonmasser,
                noe som tilsvarer et tungt ion.
              </p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Magnetisk fluks"
          difficulty="middels"
          problem={
            <div>
              <p>
                Et uniformt magnetfelt med flukstetthet B går gjennom en rektangulær sløyfe
                med areal <InlineLatex latex="A = 3{,}0\;\text{cm}^2 = 3{,}0 \cdot 10^{-4}\;\text{m}^2" />.
                Vinkelen mellom B og flatens normal er <InlineLatex latex="\varphi = 60°" />.
                Magnetisk fluks gjennom sløyfen er <InlineLatex latex="\Phi_B = 0{,}90 \cdot 10^{-3}\;\text{Wb}" />.
              </p>
              <p className="mt-2">Finn B.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p><InlineLatex latex="\Phi_B = BA\cos\varphi" />. Løs for B.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <FormulaBox
                latex="B = \frac{\Phi_B}{A\cos\varphi} = \frac{0{,}90 \cdot 10^{-3}}{3{,}0 \cdot 10^{-4} \cdot \cos 60°} = \frac{0{,}90 \cdot 10^{-3}}{1{,}5 \cdot 10^{-4}} = \underline{\underline{6{,}0\;\text{T}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Husk at φ er vinkelen mellom B og <em>normalen</em> til flaten, ikke mellom B og selve flaten.</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          7. EKSAMENSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="eksamensoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Eksamensoppgaver</h2>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips</h4>
          <p className="text-sm">
            Magnetisme-oppgaver på eksamen tester ofte: (1) kraft og retning med høyrehåndsregelen,
            (2) sirkelbane/spiralbane med radius-beregning, (3) kraft på strømførende leder.
            Tegn ALLTID figur med v, B, F og koordinatsystem. Bruk høyrehåndsregelen systematisk.
          </p>
        </div>

        <ExerciseCard
          number={1}
          title="Leder med rett del og halvsirkel i magnetfelt"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En leder fører strøm I i et uniformt magnetfelt <InlineLatex latex="\vec{B}" /> (inn i arket).
                Lederen består av en rett del med lengde L (langs x-aksen) og en halvsirkel med radius R
                (i xy-planet, over den rette delen).
              </p>
              <p className="mt-2">Finn total kraft på lederen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Del opp: rett del gir <InlineLatex latex="F_1 = ILB" /> i y-retning. Halvsirkelen krever integrasjon.</p> },
            { label: "Hint 2", content: <p>For halvsirkelen: <InlineLatex latex="dl = R\,d\theta" />. Pga. symmetri kansellerer x-komponentene. Integrer bare y-komponenten.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Rett del:</strong></p>
              <FormulaBox latex="\vec{F}_1 = I\vec{l} \times \vec{B} = ILB\,\hat{\jmath}" variant="blue" />

              <p><strong>Halvsirkel:</strong></p>
              <p className="text-sm">Pga. symmetri er <InlineLatex latex="F_{2x} = 0" />. Y-komponenten:</p>
              <FormulaBox latex="F_{2y} = \int_0^\pi I \cdot B \cdot R\,d\theta \cdot \sin\theta = BIR \int_0^\pi \sin\theta\,d\theta = BIR \cdot 2 = 2BIR" variant="blue" />

              <p><strong>Total kraft:</strong></p>
              <FormulaBox latex="\vec{F}_\text{tot} = \vec{F}_1 + \vec{F}_2 = ILB\,\hat{\jmath} + 2BIR\,\hat{\jmath} = \underline{\underline{BI(L + 2R)\,\hat{\jmath}}}" variant="gold" />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Bruk symmetri for å forenkle integrasjon. For lukkede strømsløyfer i uniformt felt: nettokraften er null, men det kan virke et dreiemoment.</p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Kombinert E- og B-felt — partikkelbane"
          difficulty="vanskelig"
          problem={
            <div>
              <p>
                Et proton akselereres fra ro gjennom en potensialdifferanse <InlineLatex latex="\Delta V = 500\;\text{V}" />.
                Det sendes deretter inn i et område med uniformt magnetfelt <InlineLatex latex="B = 0{,}20\;\text{T}" /> vinkelrett
                på farten.
              </p>
              <p className="mt-2">a) Finn farten til protonet etter akselerasjonen.</p>
              <p>b) Finn radius for sirkelbanen i magnetfeltet.</p>
              <p>c) Hvor lang tid bruker protonet på en halv omdreining?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Energibevaring: <InlineLatex latex="q\Delta V = \frac{1}{2}mv^2" /></p> },
            { label: "Hint 2", content: <p>Radius: <InlineLatex latex="r = mv/(eB)" />. Halv omdreining = <InlineLatex latex="T/2 = \pi r/v" /></p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Fart etter akselerasjon:</strong></p>
              <FormulaBox latex="e\Delta V = \frac{1}{2}m_p v^2 \quad \Rightarrow \quad v = \sqrt{\frac{2e\Delta V}{m_p}}" variant="blue" />
              <FormulaBox
                latex="v = \sqrt{\frac{2 \cdot 1{,}60 \cdot 10^{-19} \cdot 500}{1{,}67 \cdot 10^{-27}}} = \underline{\underline{3{,}10 \cdot 10^5\;\text{m/s}}}"
                variant="gold"
              />

              <p><strong>b) Radius:</strong></p>
              <FormulaBox
                latex="r = \frac{m_p v}{eB} = \frac{1{,}67 \cdot 10^{-27} \cdot 3{,}10 \cdot 10^5}{1{,}60 \cdot 10^{-19} \cdot 0{,}20} = \underline{\underline{0{,}0162\;\text{m} \approx 16{,}2\;\text{mm}}}"
                variant="gold"
              />

              <p><strong>c) Tid for halv omdreining:</strong></p>
              <FormulaBox
                latex="t = \frac{\pi r}{v} = \frac{\pi \cdot 0{,}0162}{3{,}10 \cdot 10^5} = \underline{\underline{1{,}64 \cdot 10^{-7}\;\text{s} \approx 164\;\text{ns}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Kombiner energibevaring (fra E-feltet) med sirkelbane-analyse (i B-feltet). Dette er et typisk mønster i eksamensoppgaver.</p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
