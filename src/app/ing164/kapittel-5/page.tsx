"use client";

import { useState, useMemo } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 5)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Skråplan-simulator ─── */
function SkraplanSimulator() {
  const [angle, setAngle] = useState(30);
  const [mass, setMass] = useState(10);
  const [mu, setMu] = useState(0);
  const [scenario, setScenario] = useState<"ned" | "opp">("ned");

  const rad = (angle * Math.PI) / 180;
  const g = 9.81;
  const G = mass * g;
  const Gx = G * Math.sin(rad);
  const Gy = G * Math.cos(rad);
  const N = Gy;
  const R = mu * N;

  const aNet = scenario === "ned"
    ? g * (Math.sin(rad) - mu * Math.cos(rad))
    : -g * (Math.sin(rad) + mu * Math.cos(rad));

  const willSlide = scenario === "ned" ? Math.tan(rad) > mu : true;

  // SVG coords for incline
  const w = 400, h = 280;
  const baseX = 40, baseY = 240;
  const topX = 360, topY = baseY - (topX - baseX) * Math.tan(rad);
  const clampedTopY = Math.max(topY, 30);
  const slopeLen = Math.sqrt((topX - baseX) ** 2 + (baseY - clampedTopY) ** 2);

  // Box position (midway up slope)
  const frac = 0.45;
  const bx = baseX + (topX - baseX) * frac;
  const by = baseY - (baseY - clampedTopY) * frac;

  // Force scale
  const fScale = 0.8;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Skråplan — Krefter og akselerasjon</h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Vinkel α (°)</label>
          <input type="range" min={5} max={75} step={1} value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse (kg)</label>
          <input type="range" min={1} max={50} step={1} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mass} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Friksjonstall μ</label>
          <input type="range" min={0} max={1} step={0.05} value={mu}
            onChange={(e) => setMu(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mu.toFixed(2)}</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Retning</label>
          <div className="flex gap-2 mt-1">
            <button onClick={() => setScenario("ned")}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium ${scenario === "ned" ? "bg-[var(--accent)] text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}>
              Glir ned
            </button>
            <button onClick={() => setScenario("opp")}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium ${scenario === "opp" ? "bg-[var(--accent)] text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}>
              Dyttes opp
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <defs>
            <marker id="sp-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
            <marker id="sp-n" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
            </marker>
            <marker id="sp-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
            </marker>
            <marker id="sp-a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#f97316" />
            </marker>
          </defs>

          {/* Incline surface */}
          <polygon points={`${baseX},${baseY} ${topX},${clampedTopY} ${topX},${baseY}`}
            fill="var(--card-border)" opacity="0.3" />
          <line x1={baseX} y1={baseY} x2={topX} y2={clampedTopY} stroke="var(--muted)" strokeWidth="2" />
          {/* Ground */}
          <line x1="20" y1={baseY} x2={w - 20} y2={baseY} stroke="var(--muted)" strokeWidth="1.5" />

          {/* Box */}
          <rect x={bx - 15} y={by - 20} width="30" height="20" fill="var(--card-border)"
            stroke="var(--foreground)" strokeWidth="1.5" rx="2"
            transform={`rotate(${-angle}, ${bx}, ${by - 10})`} />
          <text x={bx} y={by - 8} fontSize="10" fill="var(--foreground)" textAnchor="middle"
            transform={`rotate(${-angle}, ${bx}, ${by - 10})`}>m</text>

          {/* G vector (straight down) */}
          <line x1={bx} y1={by} x2={bx} y2={by + G * fScale} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#sp-g)" />
          <text x={bx + 12} y={by + G * fScale * 0.6} fontSize="11" fill="#ef4444" fontWeight="bold">G</text>

          {/* N vector (perpendicular to surface) */}
          {(() => {
            const nx = -Math.sin(rad) * N * fScale;
            const ny = -Math.cos(rad) * N * fScale;
            return (
              <>
                <line x1={bx} y1={by} x2={bx + nx} y2={by + ny} stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#sp-n)" />
                <text x={bx + nx * 1.15} y={by + ny * 1.15} fontSize="11" fill="#3b82f6" fontWeight="bold">N</text>
              </>
            );
          })()}

          {/* Friction vector (along surface) */}
          {mu > 0 && (
            (() => {
              const dir = scenario === "ned" ? 1 : -1;
              const rx = dir * Math.cos(rad) * R * fScale;
              const ry = -dir * Math.sin(rad) * R * fScale;
              return (
                <>
                  <line x1={bx} y1={by} x2={bx + rx} y2={by + ry} stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#sp-r)" />
                  <text x={bx + rx * 1.15} y={by + ry * 1.15 - 4} fontSize="11" fill="#22c55e" fontWeight="bold">R</text>
                </>
              );
            })()
          )}

          {/* Angle label */}
          <path d={`M ${baseX + 50} ${baseY} A 50 50 0 0 0 ${baseX + 50 * Math.cos(rad)} ${baseY - 50 * Math.sin(rad)}`}
            fill="none" stroke="var(--muted)" strokeWidth="1" />
          <text x={baseX + 60} y={baseY - 10} fontSize="11" fill="var(--muted)">α</text>
        </svg>

        <div className="space-y-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-2">Kraftkomponenter</p>
            <p className="font-mono text-sm">G = mg = {G.toFixed(1)} N</p>
            <p className="font-mono text-sm">mg sin α = {Gx.toFixed(1)} N (langs planet, nedover)</p>
            <p className="font-mono text-sm">mg cos α = {Gy.toFixed(1)} N (vinkelrett på planet)</p>
            <p className="font-mono text-sm">N = mg cos α = {N.toFixed(1)} N</p>
            {mu > 0 && <p className="font-mono text-sm">R = μN = {R.toFixed(1)} N</p>}
          </div>
          <div className={`rounded-lg p-4 border ${willSlide && scenario === "ned" ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"}`}>
            <p className="font-semibold text-sm mb-1">
              {scenario === "ned" ? (willSlide ? "Klossen glir nedover!" : "Klossen forblir i ro") : "Akselerasjon (dyttes oppover)"}
            </p>
            <p className="font-mono text-sm">
              a = g(sin α {scenario === "ned" ? "−" : "+"} μ cos α) = {Math.abs(aNet).toFixed(2)} m/s²
              {scenario === "ned" && !willSlide && " → statisk friksjon holder igjen"}
            </p>
            {scenario === "ned" && mu > 0 && (
              <p className="text-xs text-[var(--muted)] mt-1">
                Kritisk vinkel: α = tan⁻¹(μ) = {(Math.atan(mu) * 180 / Math.PI).toFixed(1)}°
                {angle < (Math.atan(mu) * 180 / Math.PI) ? " → under kritisk vinkel (i ro)" : " → over kritisk vinkel (glir)"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: Friksjon-visualisering ─── */
function FriksjonVisualiser() {
  const [pushForce, setPushForce] = useState(0);
  const mass = 50;
  const g = 9.81;
  const N = mass * g;
  const muS = 0.46;
  const muK = 0.40;
  const maxStaticR = muS * N;
  const kineticR = muK * N;

  const isSliding = pushForce > maxStaticR;
  const frictionForce = isSliding ? kineticR : pushForce;
  const netForce = isSliding ? pushForce - kineticR : 0;
  const acceleration = netForce / mass;

  const maxF = 400;
  const dataPoints = 100;
  const chartW = 350, chartH = 180;
  const margin = { left: 50, bottom: 30, top: 10, right: 10 };
  const plotW = chartW - margin.left - margin.right;
  const plotH = chartH - margin.top - margin.bottom;

  function toX(f: number) { return margin.left + (f / maxF) * plotW; }
  function toY(r: number) { return margin.top + plotH - (r / maxF) * plotH; }

  // Build friction vs applied force curve
  const curvePts = [];
  for (let i = 0; i <= dataPoints; i++) {
    const f = (maxF * i) / dataPoints;
    const r = f <= maxStaticR ? f : kineticR;
    curvePts.push({ f, r });
  }
  const curvePath = curvePts.map((p, i) =>
    `${i === 0 ? "M" : "L"}${toX(p.f).toFixed(1)},${toY(p.r).toFixed(1)}`
  ).join(" ");

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Friksjon — Statisk vs. glidefriksjon</h3>
      <p className="text-sm text-[var(--muted)] mb-3">
        En kasse på {mass} kg står på en flate. μs = {muS}, μk = {muK}. Dra i slideren for å øke dyttekraften.
      </p>

      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1">Dyttekraft F (N)</label>
        <input type="range" min={0} max={maxF} step={1} value={pushForce}
          onChange={(e) => setPushForce(Number(e.target.value))}
          className="w-full accent-[var(--accent)]" />
        <p className="text-center text-sm font-mono mt-1">{pushForce} N</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart */}
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          {/* Axes */}
          <line x1={margin.left} y1={margin.top + plotH} x2={margin.left + plotW} y2={margin.top + plotH}
            stroke="var(--muted)" strokeWidth="1" />
          <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + plotH}
            stroke="var(--muted)" strokeWidth="1" />
          <text x={margin.left + plotW + 5} y={margin.top + plotH + 4} fontSize="10" fill="var(--muted)">F</text>
          <text x={margin.left - 5} y={margin.top - 2} fontSize="10" fill="var(--muted)">R</text>

          {/* Max static friction line */}
          <line x1={margin.left} y1={toY(maxStaticR)} x2={margin.left + plotW} y2={toY(maxStaticR)}
            stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="4" />
          <text x={margin.left + plotW + 2} y={toY(maxStaticR) + 4} fontSize="8" fill="var(--muted)">μsN</text>

          {/* Kinetic friction line */}
          <line x1={margin.left} y1={toY(kineticR)} x2={margin.left + plotW} y2={toY(kineticR)}
            stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="4" />
          <text x={margin.left + plotW + 2} y={toY(kineticR) + 4} fontSize="8" fill="var(--muted)">μkN</text>

          {/* Friction curve */}
          <path d={curvePath} fill="none" stroke="#f97316" strokeWidth="2.5" />

          {/* Current point */}
          <circle cx={toX(pushForce)} cy={toY(frictionForce)} r="5" fill={isSliding ? "#ef4444" : "#22c55e"} />

          {/* Labels */}
          <text x={margin.left + plotW * 0.25} y={margin.top + plotH - 10} fontSize="9" fill="var(--muted)">statisk</text>
          <text x={margin.left + plotW * 0.7} y={margin.top + plotH - 10} fontSize="9" fill="var(--muted)">glidning</text>
        </svg>

        <div className="space-y-3">
          <div className={`rounded-lg p-4 border ${isSliding ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800" : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"}`}>
            <p className="font-semibold text-sm mb-1">
              {isSliding ? "Kassen glir!" : "Kassen er i ro"}
            </p>
            <p className="text-sm">Dyttekraft: F = {pushForce} N</p>
            <p className="text-sm">Friksjon: R = {frictionForce.toFixed(0)} N</p>
            <p className="text-sm">Nettokraft: ΣF = {netForce.toFixed(0)} N</p>
            {isSliding && <p className="text-sm">Akselerasjon: a = {acceleration.toFixed(2)} m/s²</p>}
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm">
            <p>Max statisk friksjon: R_max = μsN = {maxStaticR.toFixed(0)} N</p>
            <p>Glidefriksjon: R_k = μkN = {kineticR.toFixed(0)} N</p>
            <p>Normalkraft: N = mg = {N.toFixed(0)} N</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: Sirkelbevegelse ─── */
function SirkelbevegelsSimulator() {
  const [radius, setRadius] = useState(5);
  const [speed, setSpeed] = useState(5);
  const [mass, setMass] = useState(25);

  const aRad = (speed * speed) / radius;
  const Frad = mass * aRad;
  const T = (2 * Math.PI * radius) / speed;

  const [position, setPosition] = useState<"topp" | "bunn" | "side">("side");
  const g = 9.81;

  const Ntopp = mass * (aRad - g);
  const Nbunn = mass * (aRad + g);
  const vMinTopp = Math.sqrt(g * radius);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Sirkelbevegelse — Sentripetalakselerasjon og krefter</h3>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Radius (m)</label>
          <input type="range" min={1} max={20} step={0.5} value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{radius} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Fart (m/s)</label>
          <input type="range" min={1} max={20} step={0.5} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{speed} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse (kg)</label>
          <input type="range" min={1} max={100} step={1} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mass} kg</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(["side", "topp", "bunn"] as const).map((pos) => (
          <button key={pos} onClick={() => setPosition(pos)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              position === pos
                ? "bg-[var(--accent)] text-white"
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}>
            {pos === "side" ? "Horisontal sirkel" : pos === "topp" ? "Vertikal (topp)" : "Vertikal (bunn)"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <svg viewBox="0 0 300 300" className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <defs>
            <marker id="circ-a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#f97316" />
            </marker>
          </defs>

          {/* Circle */}
          <circle cx="150" cy="150" r="80" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4" />
          <circle cx="150" cy="150" r="3" fill="var(--muted)" />

          {position === "side" && (
            <>
              {/* Object at right */}
              <circle cx="230" cy="150" r="10" fill="#f97316" />
              {/* Velocity arrow (up) */}
              <line x1="230" y1="150" x2="230" y2="100" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#circ-a)" />
              <text x="240" y="120" fontSize="11" fill="#3b82f6" fontWeight="bold">v</text>
              {/* Centripetal arrow (left) */}
              <line x1="230" y1="150" x2="175" y2="150" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#circ-a)" />
              <text x="195" y="145" fontSize="11" fill="#f97316" fontWeight="bold">a⊥</text>
              {/* String */}
              <line x1="150" y1="150" x2="220" y2="150" stroke="var(--foreground)" strokeWidth="1" />
              <text x="185" y="165" fontSize="9" fill="var(--muted)">S</text>
            </>
          )}

          {position === "topp" && (
            <>
              {/* Object at top */}
              <circle cx="150" cy="70" r="10" fill="#f97316" />
              {/* N and G both point down */}
              <line x1="150" y1="80" x2="150" y2="120" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#circ-a)" />
              <text x="160" y="105" fontSize="11" fill="#ef4444" fontWeight="bold">G</text>
              <line x1="140" y1="80" x2="140" y2="105" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#circ-a)" />
              <text x="126" y="98" fontSize="11" fill="#3b82f6" fontWeight="bold">N</text>
              {/* Centripetal direction */}
              <text x="150" y="160" fontSize="10" fill="var(--muted)" textAnchor="middle">sentrum ↓</text>
            </>
          )}

          {position === "bunn" && (
            <>
              {/* Object at bottom */}
              <circle cx="150" cy="230" r="10" fill="#f97316" />
              {/* N points up, G down */}
              <line x1="150" y1="220" x2="150" y2="175" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#circ-a)" />
              <text x="160" y="193" fontSize="11" fill="#3b82f6" fontWeight="bold">N</text>
              <line x1="140" y1="240" x2="140" y2="265" stroke="#ef4444" strokeWidth="2" markerEnd="url(#circ-a)" />
              <text x="126" y="258" fontSize="11" fill="#ef4444" fontWeight="bold">G</text>
              <text x="150" y="160" fontSize="10" fill="var(--muted)" textAnchor="middle">sentrum ↑</text>
            </>
          )}
        </svg>

        <div className="space-y-3">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-2">Beregninger</p>
            <p className="font-mono text-sm">a⊥ = v²/r = {speed}²/{radius} = <strong>{aRad.toFixed(2)} m/s²</strong></p>
            <p className="font-mono text-sm">ΣF = ma⊥ = {mass} · {aRad.toFixed(2)} = <strong>{Frad.toFixed(1)} N</strong></p>
            <p className="font-mono text-sm">T = 2πr/v = {T.toFixed(2)} s</p>
          </div>

          {position === "topp" && (
            <div className={`rounded-lg p-4 border ${Ntopp >= 0 ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"}`}>
              <p className="font-semibold text-sm mb-1">{Ntopp >= 0 ? "Kontakt opprettholdes" : "Mister kontakt!"}</p>
              <p className="text-sm">N = m(v²/r − g) = {Ntopp.toFixed(1)} N</p>
              <p className="text-xs text-[var(--muted)]">Min. fart i topp: v = √(gr) = {vMinTopp.toFixed(1)} m/s</p>
            </div>
          )}

          {position === "bunn" && (
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-sm mb-1">Normalkraft i bunn</p>
              <p className="text-sm">N = m(v²/r + g) = {Nbunn.toFixed(1)} N</p>
              <p className="text-xs text-[var(--muted)]">Du føler deg {((Nbunn / (mass * g))).toFixed(1)}× tyngre enn normalt</p>
            </div>
          )}

          {position === "side" && (
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-sm mb-1">Horisontalsirkel (f.eks. karusell)</p>
              <p className="text-sm">Snordrag: S = mv²/r = {Frad.toFixed(1)} N</p>
              <p className="text-xs text-[var(--muted)]">Snoren peker alltid inn mot sentrum</p>
            </div>
          )}
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

        {/* 5.1 Partikler i likevekt */}
        <TheorySummary
          title="5.1 Anvendelse av N1L: Partikler i likevekt"
          mustKnow={[
            "ΣF = 0 betyr at legemet har konstant fart (eller er i ro)",
            "Sett opp ΣFx = 0 og ΣFy = 0 for å finne ukjente krefter",
            "Strategi: figur → FBD → koordinatsystem → likninger → løs → vurder",
            "I et masseløst tau er snordraget likt overalt",
          ]}
        >
          <p>
            Når kraftsummen er null, er legemet i <strong>likevekt</strong> — det beveger seg med konstant
            fart (som kan være null). Dette gir oss et kraftig verktøy for å finne ukjente krefter.
          </p>

          <FormulaBox
            latex="\sum\vec{F} = 0 \;\Longleftrightarrow\; \vec{v} = \text{konstant}"
            title="Likevektsbetingelsen"
            variant="gold"
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Løsningsstrategi</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Tegn figur av situasjonen</li>
              <li>Fritt-legeme-diagram for alle legemer</li>
              <li>Tegn inn alle krefter som virker på legemene</li>
              <li>Velg koordinatsystem, dekomponer kreftene</li>
              <li>Anvend Newtons første lov: <InlineLatex latex="\sum F_x = 0" /> og <InlineLatex latex="\sum F_y = 0" /></li>
              <li>Løs likningene</li>
              <li>Vurder svaret</li>
            </ol>
          </div>

          <p className="mt-3">
            <strong>Viktig om snordrag i tau:</strong> I et masseløst tau er snordraget likt i begge ender.
            I et tau med masse øker snordraget fra bunn til topp (tauet bærer sin egen vekt).
          </p>
        </TheorySummary>

        {/* 5.2 Partikkeldynamikk */}
        <TheorySummary
          title="5.2 Anvendelse av N2L: Partikkeldynamikk"
          mustKnow={[
            "ΣF = ma brukes når legemet akselererer",
            "Samme FBD-strategi som likevekt, men sett ΣF = ma i stedet for 0",
            "Kombiner med kinematikk (kap. 2) for å finne fart, posisjon etc.",
            "Kraft kan variere med tiden — bruk derivasjon",
          ]}
        >
          <p>
            Når kraftsummen ikke er null, akselererer legemet. Vi bruker{" "}
            <InlineLatex latex="\sum\vec{F} = m\vec{a}" /> i kombinasjon med kinematikkens likninger
            for å finne akselerasjon, fart og posisjon.
          </p>

          <FormulaBox
            latex="\sum\vec{F} = m\vec{a} \;\Longrightarrow\; \vec{a} = \frac{\sum\vec{F}}{m}"
            title="Dynamikklikningen"
            variant="gold"
          />

          <p className="mt-3">
            <strong>Viktig:</strong> Hvis kraften varierer med tiden, varierer også akselerasjonen.
            Da kan vi bruke derivasjon for å finne akselerasjonen ved et bestemt tidspunkt.
          </p>
        </TheorySummary>

        {/* 5.3 Friksjonskrefter */}
        <TheorySummary
          title="5.3 Friksjonskrefter"
          mustKnow={[
            "Friksjonskoeffisienten μ = R/N (forholdet mellom friksjon og normalkraft)",
            "Glidefriksjon: R = μk·N (konstant under glidning)",
            "Hvilefriksjon: R ≤ μs·N (tilpasser seg, maks μs·N)",
            "Alltid μs > μk — det er tyngre å løsne noe enn å holde det i bevegelse",
            "Friksjon virker alltid MOTSATT bevegelsesretningen",
          ]}
        >
          <p>
            Friksjon oppstår mellom to flater i kontakt. Den virker alltid <strong>motsatt</strong>{" "}
            bevegelsesretningen (eller retningen legemet ville beveget seg).
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">To typer friksjon</p>
            <p>
              <strong>Hvilefriksjon (statisk):</strong> Når legemet er i ro. Tilpasser seg den påførte kraften
              opp til en maksverdi: <InlineLatex latex="R \leq \mu_s N" />.
            </p>
            <p className="mt-1">
              <strong>Glidefriksjon (kinetisk):</strong> Når legemet glir. Konstant verdi:{" "}
              <InlineLatex latex="R = \mu_k N" />.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 my-4">
            <FormulaBox
              latex="R = \mu_k N"
              title="Glidefriksjon"
              variant="gold"
              description="Konstant under bevegelse"
            />
            <FormulaBox
              latex="R \leq \mu_s N"
              title="Hvilefriksjon (maks)"
              variant="gold"
              description="Tilpasser seg opp til denne verdien"
            />
          </div>

          <FormulaBox
            latex="\mu = \frac{R}{N}"
            title="Friksjonskoeffisient"
            variant="blue"
            description="μs (statisk) er alltid litt høyere enn μk (kinetisk). Dimensjonsløst tall."
          />

          <p className="mt-3">
            <strong>Rullefriksjon:</strong> Hjul som ruller gir også motstand (rullefriksjon), men denne er
            typisk mye mindre enn glidefriksjon. Friksjonskoeffisienten for rulling (<InlineLatex latex="\mu_r" />)
            er ofte svært liten.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Luftmotstand og væskemotstand</p>
            <p className="text-sm">
              Legemer som beveger seg i væske eller gass møter motstand som virker mot fartsretningen.
              Motstanden øker med farten:
            </p>
            <p className="text-sm mt-1">
              Liten hastighet: <InlineLatex latex="L \approx kv" /> (lineær).
              Stor hastighet: <InlineLatex latex="L \approx Dv^2" /> (kvadratisk).
            </p>
            <p className="text-sm mt-1">
              Når motstanden balanserer tyngden, har vi nådd <strong>terminalfarten</strong>:{" "}
              <InlineLatex latex="v_T = mg/k" />.
            </p>
          </div>
        </TheorySummary>

        {/* 5.4 Sirkelbevegelse */}
        <TheorySummary
          title="5.4 Dynamikk i sirkelbevegelse"
          mustKnow={[
            "Sentripetalakselerasjon: a⊥ = v²/R (peker alltid inn mot sentrum)",
            "ΣF = mv²/R — nettokraften inn mot sentrum gir sirkelbevegelse",
            "Det finnes ingen 'sentrifugalkraft' — det er tregheten som gir følelsen",
            "I topp av loop: N og G peker begge ned; i bunn: N opp, G ned",
          ]}
        >
          <p>
            For et legeme i sirkelbevegelse med konstant fart er akselerasjonen rettet inn mot sentrum
            (sentripetalakselerasjon). Newtons 2. lov gir da at nettokraften også peker inn mot sentrum.
          </p>

          <FormulaBox
            latex="a_\perp = \frac{v^2}{R}, \qquad \sum F = m\frac{v^2}{R} \;\;\text{(inn mot sentrum)}"
            title="Sentripetalakselerasjon og -kraft"
            variant="gold"
            description="R = sirkelbevegelsens radius, v = banefarten. ΣF peker ALLTID inn mot sentrum."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Vertikal sirkelbevegelse</p>
            <p className="text-sm">
              <strong>I topp av loop:</strong> Både N og G peker ned (mot sentrum).{" "}
              <InlineLatex latex="mg + N = mv^2/r" /> → <InlineLatex latex="N = m(v^2/r - g)" />.
            </p>
            <p className="text-sm mt-1">
              <strong>I bunn av loop:</strong> N peker opp (mot sentrum), G ned.{" "}
              <InlineLatex latex="N - mg = mv^2/r" /> → <InlineLatex latex="N = m(v^2/r + g)" />.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 my-4">
            <FormulaBox
              latex="v = \frac{s}{T} = \frac{2\pi R}{T}"
              title="Banefart og omløpstid"
              variant="blue"
            />
            <FormulaBox
              latex="v_{\min,\text{topp}} = \sqrt{gR}"
              title="Min. fart i topp av loop"
              variant="blue"
              description="For å opprettholde kontakt (N = 0)"
            />
          </div>

          <p className="mt-3">
            <strong>Dossert sving:</strong> Ved å helle veibanen i en sving (dossering med vinkel β) kan
            normalkraftens horisontale komponent bidra til sentripetalkraften. Ved en bestemt fart er
            friksjonen null: <InlineLatex latex="v = \sqrt{gr\tan\beta}" />.
          </p>
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaBox
            latex="\sum F_x = 0, \quad \sum F_y = 0"
            title="Likevekt (N1L)"
            variant="gold"
            description="For legemer i ro eller konstant fart"
          />
          <FormulaBox
            latex="\sum F_x = ma_x, \quad \sum F_y = ma_y"
            title="Dynamikk (N2L)"
            variant="gold"
            description="For legemer som akselererer"
          />
          <FormulaBox
            latex="R = \mu_k N \quad (\text{glidning})"
            title="Glidefriksjon"
            variant="gold"
          />
          <FormulaBox
            latex="R \leq \mu_s N \quad (\text{hvile})"
            title="Maks hvilefriksjon"
            variant="gold"
          />
          <FormulaBox
            latex="a_\perp = \frac{v^2}{R}"
            title="Sentripetalakselerasjon"
            variant="gold"
          />
          <FormulaBox
            latex="\sum F = m\frac{v^2}{R}"
            title="Sentripetalkraft"
            variant="gold"
            description="Nettokraften inn mot sentrum"
          />
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-3">Nyttige resultater for skråplan</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaBox
            latex="a = g\sin\alpha \quad (\text{uten friksjon})"
            title="Akselerasjon ned skråplan"
            variant="blue"
          />
          <FormulaBox
            latex="a = g(\sin\alpha - \mu_k\cos\alpha)"
            title="Med glidefriksjon nedover"
            variant="blue"
          />
          <FormulaBox
            latex="N = mg\cos\alpha"
            title="Normalkraft på skråplan"
            variant="blue"
          />
          <FormulaBox
            latex="\alpha_{\text{kritisk}} = \tan^{-1}(\mu_s)"
            title="Kritisk vinkel"
            variant="blue"
            description="Vinkelen der legemet begynner å gli"
          />
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-4">
          <h3 className="font-semibold text-lg mb-3">Når bruker du hva?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Situasjon</th>
                  <th className="text-left py-2">Nøkkellikning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">I ro / konstant fart</td>
                  <td className="py-2"><InlineLatex latex="\sum F = 0" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Akselerasjon langs rett linje</td>
                  <td className="py-2"><InlineLatex latex="\sum F = ma" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Skråplan</td>
                  <td className="py-2">Dekomponer G: <InlineLatex latex="mg\sin\alpha" /> langs, <InlineLatex latex="mg\cos\alpha" /> normalt</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Friksjon</td>
                  <td className="py-2"><InlineLatex latex="R = \mu N" /> (finn N fra FBD først!)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Sirkelbevegelse</td>
                  <td className="py-2"><InlineLatex latex="\sum F = mv^2/R" /> (inn mot sentrum)</td>
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
        <SkraplanSimulator />
        <FriksjonVisualiser />
        <SirkelbevegelsSimulator />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eks 1: Skråplan uten friksjon */}
        <ExerciseCard
          number={1}
          title="Kjelke ned skråplan (friksjonsløst)"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kjelke med total tyngde <InlineLatex latex="mg" /> sklir nedover et skråplan med vinkel{" "}
                <InlineLatex latex="\alpha" />. Ingen friksjon. Finn akselerasjonen og normalkraften.
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Velg x-akse langs planet (nedover positivt) og y-akse normalt ut fra planet.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>FBD:</strong> N (normalt ut fra planet), G = mg (loddrett ned). Dekomponer G:</p>
              <FormulaBox latex="\sum F_y = 0: \quad N - mg\cos\alpha = 0 \;\Rightarrow\; \underline{\underline{N = mg\cos\alpha}}" variant="gold" />
              <FormulaBox latex="\sum F_x = ma: \quad mg\sin\alpha = ma \;\Rightarrow\; \underline{\underline{a = g\sin\alpha}}" variant="gold" />
              <p className="text-sm"><strong>Hva lærte vi?</strong> Akselerasjonen på friksjonsløst skråplan avhenger kun av vinkelen, ikke av massen! (Galileo visste dette.)</p>
            </div>
          }
        />

        {/* Eks 2: Vogn og lodd (Atwood) */}
        <ExerciseCard
          number={2}
          title="Kloss og lodd over trinse"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kloss (<InlineLatex latex="m_1" />) på friksjonsløst bord er koblet med et tau over en
                friksjonsløs trinse til et hengende lodd (<InlineLatex latex="m_2" />). Finn akselerasjonen
                og snordraget.
              </p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Begge legemer har samme akselerasjon (ustrekt tau).</p> },
            { label: "Hint 2", content: <p>FBD for kloss: S = m₁a. FBD for lodd: m₂g − S = m₂a. Eliminer S.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>FBD for kloss (horisontalt):</strong></p>
              <FormulaBox latex="\sum F_x = m_1 a: \quad S = m_1 a" variant="blue" />

              <p><strong>FBD for lodd (vertikalt, + nedover):</strong></p>
              <FormulaBox latex="\sum F_y = m_2 a: \quad m_2 g - S = m_2 a" variant="blue" />

              <p><strong>Eliminer S:</strong></p>
              <FormulaBox latex="m_2 g - m_1 a = m_2 a \;\Rightarrow\; m_2 g = a(m_1 + m_2)" variant="blue" />
              <FormulaBox latex="\underline{\underline{a = \frac{m_2 g}{m_1 + m_2}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{S = \frac{m_1 m_2 g}{m_1 + m_2}}}" variant="gold" />
              <p className="text-sm"><strong>Sjekk grenseverdier:</strong> Hvis m₂ → 0: a → 0, S → 0. Hvis m₁ → 0: a → g, S → 0 (loddet faller fritt). Rimelig! ✓</p>
            </div>
          }
        />

        {/* Eks 3: Friksjon — finn μ */}
        <ExerciseCard
          number={3}
          title="Finne friksjonskoeffisienter"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kasse på 50 kg skyves langs gulvet. Kassen &ldquo;løsner&rdquo; (begynner å gli) ved en
                dyttekraft på 230 N. Den glir med konstant fart ved 200 N. Tyngden er mg = 500 N.
              </p>
              <p className="mt-2">a) Finn μs og μk.</p>
              <p>b) Hva var friksjonen R da dyttekraften var 50 N (kassen sto i ro)?</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Ved &ldquo;løsning&rdquo;: R = Fmax = μsN. Ved konstant glidning: R = F (likevekt).</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) N = mg = 500 N</strong> (flatt underlag, ingen vertikale ekstra-krefter).</p>
              <p className="text-sm"><strong>Statisk:</strong> Kassen løsner ved F = 230 N → R_max = 230 N.</p>
              <FormulaBox latex="\mu_s = \frac{R_s}{N} = \frac{230}{500} = \underline{\underline{0{,}46}}" variant="gold" />

              <p className="text-sm"><strong>Kinetisk:</strong> Glir med konstant fart ved F = 200 N → R_k = F = 200 N.</p>
              <FormulaBox latex="\mu_k = \frac{R_k}{N} = \frac{200}{500} = \underline{\underline{0{,}40}}" variant="gold" />

              <p><strong>b) Ved F = 50 N (i ro):</strong></p>
              <p className="text-sm">Kassen er i ro → likevekt: R = F = <strong>50 N</strong>.</p>
              <p className="text-sm">Friksjonen tilpasser seg den påførte kraften (R ≤ μsN = 230 N). Den er IKKE 230 N!</p>
            </div>
          }
        />

        {/* Eks 4: Optimal dravinkel */}
        <ExerciseCard
          number={4}
          title="Optimal dravinkel med friksjon"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kasse med tyngde mg = 500 N dras langs gulvet med en kraft <InlineLatex latex="F" /> i
                en vinkel 30° over horisontalplanet. Glidefriksjonstallet er <InlineLatex latex="\mu_k = 0{,}40" />.
              </p>
              <p className="mt-2">a) Finn F for konstant fart.</p>
              <p>b) Hvilken vinkel gir minst drakraft?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>ΣFy = 0 gir N = mg − F sin 30°. ΣFx = 0 gir F cos 30° = μN.</p> },
            { label: "Hint 2", content: <p>For optimal vinkel: deriver F(α) mhp. α og sett = 0. Du får α = tan⁻¹(μk).</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Likevekt (konstant fart):</strong></p>
              <FormulaBox latex="\sum F_y = 0: \quad N + F\sin 30° - mg = 0 \;\Rightarrow\; N = mg - F\sin 30°" variant="blue" />
              <FormulaBox latex="\sum F_x = 0: \quad F\cos 30° - \mu_k N = 0" variant="blue" />
              <p className="text-sm">Sett inn N:</p>
              <FormulaBox latex="F\cos 30° - \mu_k(mg - F\sin 30°) = 0" variant="blue" />
              <FormulaBox latex="F(\cos 30° + \mu_k\sin 30°) = \mu_k mg" variant="blue" />
              <FormulaBox latex="F = \frac{\mu_k mg}{\cos 30° + \mu_k \sin 30°} = \frac{0{,}40 \cdot 500}{0{,}866 + 0{,}40 \cdot 0{,}5} = \underline{\underline{188\;\text{N}}}" variant="gold" />

              <p><strong>b) Optimal vinkel (minst kraft):</strong></p>
              <FormulaBox latex="F(\alpha) = \frac{\mu_k mg}{\cos\alpha + \mu_k\sin\alpha}" variant="blue" />
              <p className="text-sm">Minimiser F → maksimer nevneren. Derivere og sett = 0:</p>
              <FormulaBox latex="-\sin\alpha + \mu_k\cos\alpha = 0 \;\Rightarrow\; \alpha = \tan^{-1}(\mu_k) = \tan^{-1}(0{,}40) = \underline{\underline{21{,}8°}}" variant="gold" />
              <FormulaBox latex="F(21{,}8°) = \underline{\underline{186\;\text{N}}}" variant="gold" />
              <p className="text-sm"><strong>Hva lærte vi?</strong> Det er lettere å dra i en vinkel enn horisontalt! Komponenten oppover avlaster normalkraften, som reduserer friksjonen.</p>
            </div>
          }
        />

        {/* Eks 5: Sirkelbevegelse — karusell */}
        <ExerciseCard
          number={5}
          title="Karusell — horisontalsirkel"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kule med masse <InlineLatex latex="m = 2{,}5\;\text{kg}" /> henger i en snor med lengde{" "}
                <InlineLatex latex="L" /> og svinges i en horisontal sirkel med radius{" "}
                <InlineLatex latex="R = 5{,}00\;\text{m}" /> med 5 omdreininger per minutt.
                Finn snordraget.
              </p>
            </div>
          }
          solution={
            <div className="space-y-3">
              <p><strong>Finn banefarten:</strong></p>
              <FormulaBox latex="v = \frac{s}{T} = \frac{5 \cdot 2\pi R}{60} = \frac{5 \cdot 2\pi \cdot 5{,}00}{60} = 2{,}62\;\text{m/s}" variant="blue" />

              <p><strong>Sentripetalkraft = snordrag (horisontalsirkel):</strong></p>
              <FormulaBox latex="\sum F = m\frac{v^2}{R} = 2{,}5 \cdot \frac{2{,}62^2}{5{,}00} = \underline{\underline{3{,}4\;\text{N}}}" variant="gold" />
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          5. OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <div id="strategier">
        <h2 className="text-2xl font-bold mt-12 mb-6">Oppgavestrategier</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Skråplan-oppskrift</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Tegn skråplanet med legemet</li>
              <li>Velg <strong>x langs planet</strong> og <strong>y normalt ut</strong></li>
              <li>Dekomponer <InlineLatex latex="mg" />: <InlineLatex latex="mg\sin\alpha" /> langs, <InlineLatex latex="mg\cos\alpha" /> normalt</li>
              <li><InlineLatex latex="\sum F_y = 0" /> gir <InlineLatex latex="N = mg\cos\alpha" /> (+ evt. ekstra)</li>
              <li>Friksjon: <InlineLatex latex="R = \mu N" /></li>
              <li><InlineLatex latex="\sum F_x = ma" /> gir akselerasjonen</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Sirkelbevegelse-oppskrift</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Identifiser sentrum av sirkelen</li>
              <li>Velg <strong>positiv retning inn mot sentrum</strong></li>
              <li>List opp alle krefter og finn deres komponent mot sentrum</li>
              <li>Sett opp <InlineLatex latex="\sum F = mv^2/R" /> i retning mot sentrum</li>
              <li>Husk: i topp av loop peker N og G begge mot sentrum</li>
              <li>Bruk <InlineLatex latex="v = 2\pi R/T" /> for å koble fart og periode</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 md:col-span-2">
            <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Skriver N = mg på skråplan (feil! <InlineLatex latex="N = mg\cos\alpha" />)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Bruker μsN som friksjon når legemet er i ro og dyttekraften er liten (friksjonen tilpasser seg!)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Tegner &ldquo;sentrifugalkraft&rdquo; i FBD — den eksisterer ikke i et inertialreferansesystem</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Glemmer at normalkraften endres når en skrå kraft har vertikal komponent</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Blander skråplan-aksene med horisontalt/vertikalt</span>
              </li>
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
          title="Slede ned skråplan med friksjon"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En slede glir nedover et skråplan med vinkel <InlineLatex latex="\alpha" /> og
                glidefriksjonskoeffisient <InlineLatex latex="\mu_k" />.
              </p>
              <p className="mt-2">a) Finn den kritiske vinkelen der sleden glir med konstant fart (uttrykt ved μk).</p>
              <p>b) Finn akselerasjonen når vinkelen er brattere enn kritisk vinkel.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Konstant fart: ΣFx = 0 → mg sinα = R = μkN = μk mg cosα.</p> },
            { label: "Hint 2", content: <p>For del b: ΣFx = ma → mg sinα − μk mg cosα = ma.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Konstant fart → ΣFx = 0:</strong></p>
              <FormulaBox latex="mg\sin\alpha - R = 0, \quad R = \mu_k N = \mu_k mg\cos\alpha" variant="blue" />
              <FormulaBox latex="mg\sin\alpha = \mu_k mg\cos\alpha \;\Rightarrow\; \frac{\sin\alpha}{\cos\alpha} = \mu_k" variant="blue" />
              <FormulaBox latex="\underline{\underline{\alpha = \tan^{-1}(\mu_k)}}" variant="gold" />

              <p><strong>b) Brattere (akselererer):</strong></p>
              <FormulaBox latex="mg\sin\alpha - \mu_k mg\cos\alpha = ma" variant="blue" />
              <FormulaBox latex="\underline{\underline{a = g(\sin\alpha - \mu_k\cos\alpha)}}" variant="gold" />
            </div>
          }
        />

        {/* Oblig 2, Oppg 1a: Loop-the-loop */}
        <ExerciseCard
          number={2}
          title="Pilot i loop-the-loop"
          difficulty="middels"
          source="Oblig 2, Oppgave 1a–b"
          problem={
            <div>
              <p>
                Et fly beveger seg i en sirkelformet loop med baneradius 500 m. Piloten har masse 80,0 kg.
                Banefarten er konstant 100 m/s.
              </p>
              <p className="mt-2">a) Tegn krefter og beregn normalkraften i topp og bunn av loopen.</p>
              <p>b) Hvor stor fart har piloten når han mister kontakt med setet i toppunktet?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>I topp: N og G peker begge ned (mot sentrum). I bunn: N opp, G ned.</p> },
            { label: "Hint 2", content: <p>Mister kontakt: N = 0. Sett inn i toppunkt-likningen.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Sentripetalakselerasjon:</strong></p>
              <FormulaBox latex="a_\perp = \frac{v^2}{r} = \frac{100^2}{500} = 20{,}0\;\text{m/s}^2" variant="blue" />

              <p><strong>Topp (N og G begge mot sentrum = nedover):</strong></p>
              <FormulaBox latex="N + mg = m\frac{v^2}{r} \;\Rightarrow\; N = m\left(\frac{v^2}{r} - g\right) = 80(20{,}0 - 9{,}81) = \underline{\underline{815\;\text{N}}}" variant="gold" />

              <p><strong>Bunn (N opp, G ned, sentrum oppover):</strong></p>
              <FormulaBox latex="N - mg = m\frac{v^2}{r} \;\Rightarrow\; N = m\left(\frac{v^2}{r} + g\right) = 80(20{,}0 + 9{,}81) = \underline{\underline{2{,}38\;\text{kN}}}" variant="gold" />

              <p><strong>b) Mister kontakt i topp (N = 0):</strong></p>
              <FormulaBox latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 500} = \underline{\underline{70{,}0\;\text{m/s}}}" variant="gold" />
            </div>
          }
        />

        {/* Oblig 2, Oppg 1c–d: Bil i sving */}
        <ExerciseCard
          number={3}
          title="Bil i sving — maks fart"
          difficulty="middels"
          source="Oblig 2, Oppgave 1c–d"
          problem={
            <div>
              <p>
                c) En bil svinger mot høyre. En kule i snor henger i vinkel 10,0° fra loddlinjen.
                Bilens fart er 70,0 km/h. Finn svingens radius.
              </p>
              <p className="mt-2">
                d) Friksjonstallet mellom hjul og asfalt er 0,80. Hva er bilens maks fart gjennom svingen?
              </p>
            </div>
          }
          solution={
            <div className="space-y-3">
              <p><strong>c) Kulependel:</strong> Snoren danner vinkel 10° med loddlinjen.</p>
              <FormulaBox latex="g\tan\alpha = \frac{v^2}{r} \;\Rightarrow\; r = \frac{v^2}{g\tan\alpha} = \frac{19{,}44^2}{9{,}81\cdot\tan 10°} = \underline{\underline{219\;\text{m}}}" variant="gold" />

              <p><strong>d) Friksjon gir sentripetalkraft:</strong></p>
              <FormulaBox latex="\mu_s mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{\mu_s g r} = \sqrt{0{,}80 \cdot 9{,}81 \cdot 219} = 41{,}5\;\text{m/s} = \underline{\underline{149\;\text{km/h}}}" variant="gold" />
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
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 5</p>
          <ul className="space-y-1 text-sm">
            <li>• FBD med friksjon + skrå kraft er et yndet eksamenstema (se kranbil-oppgaven!)</li>
            <li>• Husk at normalkraften endres når en kraft trekker i vinkel</li>
            <li>• &ldquo;Optimal vinkel&rdquo;-oppgaver (derivasjon) kommer ofte — α = tan⁻¹(μ)</li>
            <li>• Kombiner N2L med kinematikk: finn a fra krefter, bruk deretter v² = v₀² + 2as</li>
            <li>• Sirkelbevegelse: topp/bunn-analyse av pariserhjul/loop er svært eksamensrelevant</li>
          </ul>
        </div>

        <ExerciseCard
          number={1}
          title="Kranbil med container — friksjon og skrå kraft"
          difficulty="vanskelig"
          source="Eksamen Vår 2023, Oppgave 2"
          problem={
            <div>
              <p>
                En kranbil flytter en container på 1000 kg ved å slepe den langs bakken (horisontalt)
                med konstant fart. Glidefriksjonstallet er 0,65.
              </p>
              <p className="mt-2">a) Vaieren danner 25° med bakken. Hva er snordraget? Hvor mye arbeid gjør kranbilen over 15 m?</p>
              <p>b) Hvor mye arbeid gjør friksjonskraften over 15 m?</p>
              <p>c) Hvilken vinkel mellom vaier og bakken gir minst snordrag?</p>
              <p>d) Vaieren ryker når containeren har fart 2,5 m/s. Finn akselerasjon og bremselengde.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Konstant fart → likevekt. Vaierens vertikale komponent avlaster normalkraften.</p> },
            { label: "Hint 2", content: <p>ΣFy: N + F sinα = mg → N = mg − F sinα. ΣFx: F cosα = μkN.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>FBD:</strong> F (vaier, 25° over horisontalen), N (opp), mg (ned), R = μN (horisontalt bakover).</p>

              <p><strong>a) Likevekt (konstant fart):</strong></p>
              <FormulaBox latex="\sum F_y = 0: \quad N + F\sin 25° - mg = 0 \;\Rightarrow\; N = mg - F\sin 25°" variant="blue" />
              <FormulaBox latex="\sum F_x = 0: \quad F\cos 25° - \mu_k N = 0" variant="blue" />
              <p className="text-sm">Sett inn N:</p>
              <FormulaBox latex="F\cos 25° = \mu_k(mg - F\sin 25°)" variant="blue" />
              <FormulaBox latex="F(\cos 25° + \mu_k\sin 25°) = \mu_k mg" variant="blue" />
              <FormulaBox latex="F = \frac{0{,}65 \cdot 1000 \cdot 9{,}81}{0{,}906 + 0{,}65 \cdot 0{,}423} = \frac{6377}{1{,}181} = \underline{\underline{5{,}4\;\text{kN}}}" variant="gold" />
              <FormulaBox latex="W_F = Fs\cos 25° = 5400 \cdot 15 \cdot \cos 25° = \underline{\underline{73\;\text{kJ}}}" variant="gold" />

              <p><strong>b) Friksjonskraftens arbeid:</strong></p>
              <FormulaBox latex="N = mg - F\sin 25° = 9810 - 5400 \cdot 0{,}423 = 7527\;\text{N}" variant="blue" />
              <FormulaBox latex="R = \mu_k N = 0{,}65 \cdot 7527 = 4893\;\text{N}" variant="blue" />
              <FormulaBox latex="W_R = -Rs = -4893 \cdot 15 = \underline{\underline{-73\;\text{kJ}}}" variant="gold" />
              <p className="text-sm">Arbeidet fra friksjon er negativt og like stort som krabibliens arbeid (logisk — konstant fart → ΔK = 0).</p>

              <p><strong>c) Optimal vinkel:</strong></p>
              <FormulaBox latex="\alpha_{\text{opt}} = \tan^{-1}(\mu_k) = \tan^{-1}(0{,}65) = \underline{\underline{33°}}" variant="gold" />

              <p><strong>d) Etter vaieren ryker:</strong></p>
              <p className="text-sm">Eneste horisontale kraft er friksjon. N = mg (ingen vertikal komponent lenger).</p>
              <FormulaBox latex="a = -\mu_k g = -0{,}65 \cdot 9{,}81 = -6{,}4\;\text{m/s}^2" variant="blue" />
              <FormulaBox latex="v^2 = v_0^2 + 2as \;\Rightarrow\; s = \frac{0 - 2{,}5^2}{2(-6{,}4)} = \underline{\underline{0{,}49\;\text{m}}}" variant="gold" />
              <p className="text-sm"><strong>Hva lærte vi?</strong> Denne oppgaven kombinerer alt fra kap. 5: FBD, friksjon, skrå kraft, optimal vinkel (derivasjon), og kinematikk etter kraftbortfall.</p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Pariserhjul — normalkraft i topp og bunn"
          difficulty="middels"
          source="Forelesning / eksamensrelevant"
          problem={
            <div>
              <p>
                Et pariserhjul har radius <InlineLatex latex="r = 8\;\text{m}" />. En passasjer har masse 60 kg
                og farten i laveste punkt er 5 m/s.
              </p>
              <p className="mt-2">a) Finn normalkraften på passasjeren i topp og bunn.</p>
              <p>b) Hva er minimumsfarten i topp for at passasjeren skal miste kontakt med setet?</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>I topp: mg − N = mv²/r. I bunn: N − mg = mv²/r.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Topp (sentrum under passasjeren):</strong></p>
              <FormulaBox latex="mg - N = m\frac{v^2}{r} \;\Rightarrow\; N = mg - m\frac{v^2}{r} = 60\left(9{,}81 - \frac{25}{8}\right) = \underline{\underline{401\;\text{N}}}" variant="gold" />

              <p><strong>Bunn (sentrum over passasjeren):</strong></p>
              <FormulaBox latex="N - mg = m\frac{v^2}{r} \;\Rightarrow\; N = mg + m\frac{v^2}{r} = 60\left(9{,}81 + \frac{25}{8}\right) = \underline{\underline{776\;\text{N}}}" variant="gold" />

              <p><strong>b) Mister kontakt i topp (N = 0):</strong></p>
              <FormulaBox latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 8} = \underline{\underline{8{,}9\;\text{m/s}}}" variant="gold" />
              <p className="text-sm">Over denne farten ville passasjeren &ldquo;sveve&rdquo; i toppunktet.</p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
