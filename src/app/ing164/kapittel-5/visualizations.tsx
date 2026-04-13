"use client";

import { useState } from "react";

/* ─── Interactive: Skråplan-simulator ─── */
export function SkraplanSimulator() {
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
export function FriksjonVisualiser() {
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
export function SirkelbevegelsSimulator() {
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
