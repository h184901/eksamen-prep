"use client";

import { useState, useMemo } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 3)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Prosjektilbevegelse-simulator ─── */
function ProjectileSimulator() {
  const [v0, setV0] = useState(25); // m/s
  const [angle, setAngle] = useState(45); // grader
  const [y0, setY0] = useState(0); // starthøyde i meter
  const g = 9.81;

  const rad = (angle * Math.PI) / 180;
  const v0x = v0 * Math.cos(rad);
  const v0y = v0 * Math.sin(rad);

  // Tid til landing: y0 + v0y*t - 0.5*g*t² = 0
  const disc = v0y * v0y + 2 * g * y0;
  const tLand = disc >= 0 ? (v0y + Math.sqrt(disc)) / g : 1;

  const tTop = v0y / g;
  const yMax = y0 + (v0y * v0y) / (2 * g);
  const xLand = v0x * tLand;

  const steps = 80;
  const trajectory = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = (tLand * i) / steps;
      const x = v0x * t;
      const y = y0 + v0y * t - 0.5 * g * t * t;
      if (y >= 0) pts.push({ x, y });
    }
    return pts;
  }, [v0x, v0y, y0, tLand]);

  const xMaxPlot = Math.max(xLand, 1) * 1.1;
  const yMaxPlot = Math.max(yMax, y0, 1) * 1.2;

  function toSvgX(x: number) {
    return 50 + (x / xMaxPlot) * 320;
  }
  function toSvgY(y: number) {
    return 190 - (y / yMaxPlot) * 170;
  }

  const path = trajectory
    .map((p, i) => `${i === 0 ? "M" : "L"}${toSvgX(p.x).toFixed(1)},${toSvgY(p.y).toFixed(1)}`)
    .join(" ");

  // Velocity at landing
  const vyLand = v0y - g * tLand;
  const vLand = Math.sqrt(v0x * v0x + vyLand * vyLand);
  const angleLand = (Math.atan2(Math.abs(vyLand), v0x) * 180) / Math.PI;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Prosjektilbevegelse — Simulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Startfart v₀ (m/s)
          </label>
          <input
            type="range"
            min={5}
            max={65}
            step={1}
            value={v0}
            onChange={(e) => setV0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v0} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Utgangsvinkel α₀ (°)
          </label>
          <input
            type="range"
            min={-20}
            max={85}
            step={1}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Starthøyde y₀ (m)
          </label>
          <input
            type="range"
            min={0}
            max={120}
            step={5}
            value={y0}
            onChange={(e) => setY0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{y0} m</p>
        </div>
      </div>

      {/* Trajectory SVG */}
      <svg viewBox="0 0 400 210" className="w-full mb-4">
        {/* Axes */}
        <line x1="50" y1="190" x2="380" y2="190" stroke="var(--muted)" strokeWidth="1" />
        <line x1="50" y1="10" x2="50" y2="190" stroke="var(--muted)" strokeWidth="1" />
        <text x="385" y="195" fontSize="10" fill="var(--muted)">x</text>
        <text x="35" y="15" fontSize="10" fill="var(--muted)">y</text>

        {/* Ground */}
        <line x1="50" y1="190" x2="380" y2="190" stroke="var(--muted)" strokeWidth="2" />

        {/* Starting height indicator */}
        {y0 > 0 && (
          <>
            <rect x="43" y={toSvgY(y0)} width="14" height={190 - toSvgY(y0)} fill="var(--card-border)" rx="1" />
            <text x="35" y={toSvgY(y0) - 4} fontSize="8" fill="var(--muted)" textAnchor="middle">
              {y0}m
            </text>
          </>
        )}

        {/* Trajectory */}
        <path d={path} fill="none" stroke="#f97316" strokeWidth="2.5" />

        {/* Top point */}
        {v0y > 0 && (
          <>
            <circle cx={toSvgX(v0x * tTop)} cy={toSvgY(yMax)} r="3" fill="#3b82f6" />
            <text x={toSvgX(v0x * tTop)} y={toSvgY(yMax) - 8} textAnchor="middle" fontSize="9" fill="#3b82f6">
              ({(v0x * tTop).toFixed(0)} m, {yMax.toFixed(1)} m)
            </text>
          </>
        )}

        {/* Landing point */}
        <circle cx={toSvgX(xLand)} cy={toSvgY(0)} r="3" fill="#ef4444" />
        <text x={toSvgX(xLand)} y={toSvgY(0) + 14} textAnchor="middle" fontSize="9" fill="#ef4444">
          x = {xLand.toFixed(1)} m
        </text>

        {/* Start velocity arrow */}
        {v0 > 0 && (
          <>
            <line
              x1={toSvgX(0)}
              y1={toSvgY(y0)}
              x2={toSvgX(0) + 35 * Math.cos(rad)}
              y2={toSvgY(y0) - 35 * Math.sin(rad)}
              stroke="#22c55e"
              strokeWidth="2"
              markerEnd="url(#proj-arrow)"
            />
            <text
              x={toSvgX(0) + 40 * Math.cos(rad)}
              y={toSvgY(y0) - 40 * Math.sin(rad)}
              fontSize="9"
              fill="#22c55e"
            >
              v₀
            </text>
          </>
        )}

        {/* Angle arc */}
        {v0 > 0 && angle > 0 && (
          <path
            d={`M${toSvgX(0) + 20},${toSvgY(y0)} A20,20 0 0,0 ${toSvgX(0) + 20 * Math.cos(rad)},${toSvgY(y0) - 20 * Math.sin(rad)}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="1"
          />
        )}

        <defs>
          <marker id="proj-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      {/* Data */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Rekkevidde</p>
          <p className="font-bold">{xLand.toFixed(1)} m</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Maks høyde</p>
          <p className="font-bold">{yMax.toFixed(1)} m</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Flytid</p>
          <p className="font-bold">{tLand.toFixed(2)} s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Fart ved landing</p>
          <p className="font-bold">{vLand.toFixed(1)} m/s</p>
        </div>
      </div>
      <div className="text-center text-xs text-[var(--muted)] mt-2">
        Landingsvinkel: {angleLand.toFixed(1)}° under horisontal |{" "}
        v₀ₓ = {v0x.toFixed(1)} m/s, v₀ᵧ = {v0y.toFixed(1)} m/s
      </div>
    </div>
  );
}

/* ─── Interactive: Sirkelbevegelse-visualisering ─── */
function CircularMotionVisualizer() {
  const [speed, setSpeed] = useState(3.0); // m/s
  const [radius, setRadius] = useState(4.0); // m
  const [theta, setTheta] = useState(45); // grader — posisjon på sirkelen

  const aCent = (speed * speed) / radius;
  const T = (2 * Math.PI * radius) / speed;
  const thetaRad = (theta * Math.PI) / 180;

  // Position on circle
  const cx = 150;
  const cy = 150;
  const r = 80;
  const px = cx + r * Math.cos(thetaRad);
  const py = cy - r * Math.sin(thetaRad);

  // Velocity direction (tangent = perpendicular to radius, counterclockwise)
  const vLen = 35;
  const vx = px - vLen * Math.sin(thetaRad);
  const vy = py - vLen * Math.cos(thetaRad);

  // Acceleration direction (centripetal = towards center)
  const aLen = Math.min(35, aCent * 8);
  const ax = px + (cx - px) * (aLen / r);
  const ay = py + (cy - py) * (aLen / r);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Sirkelbevegelse — Visualisering</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Banefart v (m/s)
          </label>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{speed.toFixed(1)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Radius R (m)
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{radius.toFixed(1)} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Posisjon θ (°)
          </label>
          <input
            type="range"
            min={0}
            max={360}
            step={5}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{theta}°</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <svg viewBox="0 0 300 300" className="w-full max-w-xs">
          {/* Circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4" />

          {/* Center */}
          <circle cx={cx} cy={cy} r="3" fill="var(--muted)" />
          <text x={cx + 8} y={cy + 4} fontSize="10" fill="var(--muted)">O</text>

          {/* Radius line */}
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3" />

          {/* Object */}
          <circle cx={px} cy={py} r="8" fill="#f97316" />

          {/* Velocity vector (tangent, green) */}
          <line
            x1={px}
            y1={py}
            x2={vx}
            y2={vy}
            stroke="#22c55e"
            strokeWidth="2.5"
            markerEnd="url(#circ-v-arrow)"
          />
          <text x={vx - 5} y={vy - 5} fontSize="11" fill="#22c55e" fontWeight="bold">v</text>

          {/* Acceleration vector (centripetal, red) */}
          <line
            x1={px}
            y1={py}
            x2={ax}
            y2={ay}
            stroke="#ef4444"
            strokeWidth="2.5"
            markerEnd="url(#circ-a-arrow)"
          />
          <text x={(px + ax) / 2 + 8} y={(py + ay) / 2} fontSize="11" fill="#ef4444" fontWeight="bold">a</text>

          {/* R label */}
          <text x={(cx + px) / 2 + 5} y={(cy + py) / 2 - 5} fontSize="10" fill="var(--muted)">R</text>

          <defs>
            <marker id="circ-v-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
            </marker>
            <marker id="circ-a-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L6,2.5 L0,5" fill="#ef4444" />
            </marker>
          </defs>
        </svg>

        <div className="space-y-2 text-sm">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
            <p className="text-[var(--muted)] text-xs">Sentripetaakselerasjon</p>
            <p className="font-bold text-lg">{aCent.toFixed(2)} m/s²</p>
            <p className="text-xs text-[var(--muted)]">
              <InlineLatex latex={`a = \\frac{v^2}{R} = \\frac{${speed.toFixed(1)}^2}{${radius.toFixed(1)}}`} />
            </p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
            <p className="text-[var(--muted)] text-xs">Omløpstid T</p>
            <p className="font-bold text-lg">{T.toFixed(2)} s</p>
            <p className="text-xs text-[var(--muted)]">
              <InlineLatex latex={`T = \\frac{2\\pi R}{v} = \\frac{2\\pi \\cdot ${radius.toFixed(1)}}{${speed.toFixed(1)}}`} />
            </p>
          </div>
          <div className="flex gap-3 text-xs mt-2">
            <span><span className="inline-block w-3 h-0.5 bg-[#22c55e] mr-1 align-middle" /> Fart (tangent)</span>
            <span><span className="inline-block w-3 h-0.5 bg-[#ef4444] mr-1 align-middle" /> Akselerasjon (mot sentrum)</span>
          </div>
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

        {/* 3.1 Posisjons- og fartsvektorer */}
        <TheorySummary
          title="3.1 Posisjons- og fartsvektorer"
          mustKnow={[
            "Posisjonsvektoren r⃗ = xî + yĵ + zk̂",
            "Momentanfart v⃗ = dr⃗/dt (tangent til banen)",
            "Fartens størrelse: v = √(vₓ² + vᵧ²)",
            "Komponentform: vₓ = dx/dt, vᵧ = dy/dt",
          ]}
        >
          <p>
            I to og tre dimensjoner beskriver vi bevegelsen med <strong>vektorer</strong>.
            Posisjonen til et legeme angis med en posisjonsvektoren fra origo:
          </p>

          <FormulaBox
            latex="\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}"
            title="Posisjonsvektoren"
            variant="gold"
            description="x, y, z er koordinatene i et kartesisk koordinatsystem."
          />

          <p className="mt-4">
            <strong>Gjennomsnittsfarten</strong> er endringen i posisjonsvektoren delt på tidsintervallet:
          </p>
          <FormulaBox
            latex="\vec{\bar{v}} = \frac{\Delta\vec{r}}{\Delta t} = \frac{\vec{r}_2 - \vec{r}_1}{t_2 - t_1}"
            title="Gjennomsnittsfart (vektor)"
            variant="blue"
          />

          <FormulaBox
            latex="\vec{v} = \frac{d\vec{r}}{dt} = \frac{dx}{dt}\hat{i} + \frac{dy}{dt}\hat{j} = v_x\hat{i} + v_y\hat{j}"
            title="Momentanfart"
            variant="gold"
            description="Momentanfarten er tangent til banen i hvert punkt."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig geometrisk egenskap</p>
            <p>
              Fartsvektoren <InlineLatex latex="\vec{v}" /> er alltid <strong>tangent til banen</strong>.
              Fartens størrelse (skalar):
            </p>
            <div className="mt-2">
              <InlineLatex latex="v = |\vec{v}| = \sqrt{v_x^2 + v_y^2 + v_z^2}" />
            </div>
          </div>
        </TheorySummary>

        {/* 3.2 Akselerasjonsvektoren */}
        <TheorySummary
          title="3.2 Akselerasjonsvektoren"
          mustKnow={[
            "a⃗ = dv⃗/dt = d²r⃗/dt²",
            "Akselerasjon oppstår når farten endrer verdi, retning, eller begge",
            "a∥ (parallell) → fartsendring, a⊥ (normal) → retningsendring",
            "Konstant fart + kurvet bane → akselerasjon (retningsendring!)",
          ]}
        >
          <FormulaBox
            latex="\vec{a} = \frac{d\vec{v}}{dt} = a_x\hat{i} + a_y\hat{j}"
            title="Momentanakselerasjon"
            variant="gold"
            description="Komponentvis: aₓ = dvₓ/dt = d²x/dt², aᵧ = dvᵧ/dt = d²y/dt²."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tre årsaker til akselerasjon</p>
            <p className="text-sm">Et legeme har akselerasjon dersom farten endrer:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
              <li><strong>Verdi</strong> (legemet akselererer eller bremser langs banen)</li>
              <li><strong>Retning</strong> (legemet endrer kurs — selv med konstant fart!)</li>
              <li><strong>Både verdi og retning</strong> (mest generelle tilfelle)</li>
            </ol>
          </div>

          <p className="mt-4">
            Det er nyttig å dekomponere akselerasjonen i to komponenter:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <InlineLatex latex="a_\parallel" /> — <strong>parallelt</strong> med farten → endrer fartens <em>størrelse</em>
            </li>
            <li>
              <InlineLatex latex="a_\perp" /> — <strong>normalt</strong> på farten → endrer fartens <em>retning</em>
            </li>
          </ul>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig intuisjon</p>
            <ul className="space-y-1 text-sm">
              <li>• Konstant fart langs rett linje: <InlineLatex latex="\vec{a} = 0" /></li>
              <li>• Konstant fart langs kurve: <InlineLatex latex="\vec{a} \perp \vec{v}" /> (kun retningsendring)</li>
              <li>• Økende fart langs kurve: <InlineLatex latex="\vec{a}" /> har komponent fremover + innover</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 3.3 Prosjektilbevegelse */}
        <TheorySummary
          title="3.3 Prosjektilbevegelse"
          mustKnow={[
            "Prosjektilbevegelse = to uavhengige bevegelser: horisontal (a = 0) + vertikal (a = −g)",
            "v₀ₓ = v₀ cos α₀, v₀ᵧ = v₀ sin α₀",
            "Horisontal: vₓ = v₀ₓ (konstant!), x = v₀ₓ · t",
            "Vertikal: vᵧ = v₀ᵧ − gt, y = y₀ + v₀ᵧt − ½gt²",
            "Banen er en parabel",
            "Toppunkt: vᵧ = 0, Landing: y = 0",
          ]}
        >
          <p>
            Prosjektilbevegelse er bevegelse under påvirkning av <strong>kun tyngdekraften</strong>
            (ingen luftmotstand). Nøkkelen er å <strong>dekomponere</strong> bevegelsen i to
            uavhengige retninger:
          </p>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">x-retning (horisontal)</th>
                  <th className="text-left py-2">y-retning (vertikal)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="a_x = 0" /></td>
                  <td className="py-2"><InlineLatex latex="a_y = -g" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="v_x = v_{0x}" /> (konstant)</td>
                  <td className="py-2"><InlineLatex latex="v_y = v_{0y} - gt" /></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4"><InlineLatex latex="x = x_0 + v_{0x}\,t" /></td>
                  <td className="py-2"><InlineLatex latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <FormulaBox
            latex="v_{0x} = v_0 \cos\alpha_0, \quad v_{0y} = v_0 \sin\alpha_0"
            title="Dekomposisjon av startfart"
            variant="gold"
            description="Bruk trigonometri til å finne komponentene av startfarten."
          />

          <FormulaBox
            latex="y = \frac{v_{0y}}{v_{0x}}\,x - \frac{g}{2v_{0x}^2}\,x^2"
            title="Baneligning (parabel)"
            variant="blue"
            description="Eliminerer t for å finne y som funksjon av x. Gjelder fra origo."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Sentrale resultater</p>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Toppunkt:</strong> <InlineLatex latex="v_y = 0 \;\Rightarrow\; t_{\text{topp}} = v_{0y}/g" /></li>
              <li>• <strong>Maks høyde:</strong> <InlineLatex latex="y_{\max} = y_0 + v_{0y}^2/(2g)" /></li>
              <li>• <strong>Landing (y = 0):</strong> Løs <InlineLatex latex="y_0 + v_{0y}t - \tfrac{1}{2}gt^2 = 0" /> for t</li>
              <li>• <strong>Rekkevidde (fra y₀ = 0):</strong> <InlineLatex latex="R = v_0^2 \sin(2\alpha_0)/g" /></li>
              <li>• <strong>Maks rekkevidde:</strong> ved <InlineLatex latex="\alpha_0 = 45°" /> (kun fra bakkenivå)</li>
            </ul>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil!</p>
            <ul className="space-y-1 text-sm">
              <li>• Glemmer at vₓ er konstant (ingen horisontal akselerasjon!)</li>
              <li>• Bruker v₀ istedenfor v₀ₓ eller v₀ᵧ — dekomponér alltid først</li>
              <li>• Glemmer å sette y₀ ≠ 0 når skuddet/kastet er fra en høyde</li>
              <li>• Blander grader og radianer i trigonometriske funksjoner</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 3.4 Sirkelbevegelse */}
        <TheorySummary
          title="3.4 Sirkelbevegelse"
          mustKnow={[
            "Sentripetaakselerasjon: a = v²/R (rettet mot sentrum)",
            "Alternativ form: a = 4π²R/T²",
            "Farten v = 2πR/T",
            "Ved konstant fart: akselerasjon ⊥ fart (bare retningsendring)",
            "Variabel fart: a⊥ = v²/R (sentripetal) + a∥ = dv/dt (tangentiell)",
          ]}
        >
          <p>
            Når et legeme beveger seg langs en sirkel med radius <InlineLatex latex="R" />,
            har det <strong>alltid akselerasjon</strong> — selv om farten er konstant.
            Akselerasjonen skyldes <em>retningsendringen</em>.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Geometrisk utledning</p>
            <p className="text-sm">
              Professorens argument: Trekanten dannet av <InlineLatex latex="\Delta\vec{r}" /> og
              trekanten dannet av <InlineLatex latex="\Delta\vec{v}" /> er <strong>geometrisk like</strong>.
              Derfor:
            </p>
            <div className="mt-2 text-sm">
              <InlineLatex latex="\frac{|\Delta\vec{v}|}{v} = \frac{|\Delta\vec{r}|}{R} \;\Rightarrow\; a = \frac{v}{R} \cdot \frac{|\Delta\vec{r}|}{\Delta t} = \frac{v^2}{R}" />
            </div>
          </div>

          <FormulaBox
            latex="a = \frac{v^2}{R}"
            title="Sentripetaakselerasjon"
            variant="gold"
            description="Akselerasjonen peker alltid mot sirkelsenter. Enhet: m/s²."
          />

          <div className="grid sm:grid-cols-2 gap-3 my-4">
            <FormulaBox
              latex="v = \frac{2\pi R}{T}"
              title="Banefart"
              variant="blue"
              description="T = omløpstid (perioden)."
            />
            <FormulaBox
              latex="a = \frac{4\pi^2 R}{T^2}"
              title="Sentripetaakselerasjon (med T)"
              variant="blue"
              description="Nyttig når omløpstiden er gitt."
            />
          </div>

          <h4 className="font-semibold mt-6 mb-2">Sirkelbevegelse med variabel fart</h4>
          <p>
            Når farten endrer seg langs sirkelbanen, har akselerasjonen <strong>to komponenter</strong>:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 my-4">
            <FormulaBox
              latex="a_\perp = \frac{v^2}{R}"
              title="Normalakselerasjon (sentripetal)"
              variant="gold"
              description="Endrer retning. Peker mot sentrum."
            />
            <FormulaBox
              latex="a_\parallel = \frac{d|\vec{v}|}{dt}"
              title="Baneakselerasjon (tangentiell)"
              variant="gold"
              description="Endrer fartens størrelse. Langs banen."
            />
          </div>
          <FormulaBox
            latex="a = \sqrt{a_\perp^2 + a_\parallel^2}"
            title="Total akselerasjon"
            variant="blue"
          />
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <h3 className="font-semibold text-lg mb-3">Vektorer og bevegelse</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}" title="Posisjonsvektoren" variant="blue" />
          <FormulaBox latex="\vec{v} = \frac{d\vec{r}}{dt} = v_x\hat{i} + v_y\hat{j}" title="Momentanfart" variant="gold" />
          <FormulaBox latex="v = \sqrt{v_x^2 + v_y^2}" title="Fartens størrelse" variant="blue" />
          <FormulaBox latex="\vec{a} = \frac{d\vec{v}}{dt} = a_x\hat{i} + a_y\hat{j}" title="Akselerasjon" variant="gold" />
        </div>

        <h3 className="font-semibold text-lg mt-8 mb-3">Prosjektilbevegelse</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="v_{0x} = v_0\cos\alpha_0" title="Horisontal startfart" variant="gold" />
          <FormulaBox latex="v_{0y} = v_0\sin\alpha_0" title="Vertikal startfart" variant="gold" />
          <FormulaBox latex="x = x_0 + v_{0x}\,t" title="Horisontal posisjon" variant="gold" />
          <FormulaBox latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2" title="Vertikal posisjon" variant="gold" />
          <FormulaBox latex="v_x = v_{0x}" title="Horisontal fart (konstant)" variant="blue" />
          <FormulaBox latex="v_y = v_{0y} - gt" title="Vertikal fart" variant="gold" />
          <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y-y_0)" title="Fart–posisjon (vertikal)" variant="gold" />
          <FormulaBox latex="R = \frac{v_0^2 \sin 2\alpha_0}{g}" title="Rekkevidde (fra bakkenivå)" variant="blue" />
        </div>

        <h3 className="font-semibold text-lg mt-8 mb-3">Sirkelbevegelse</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="a = \frac{v^2}{R}" title="Sentripetaakselerasjon" variant="gold" />
          <FormulaBox latex="v = \frac{2\pi R}{T}" title="Banefart" variant="gold" />
          <FormulaBox latex="a = \frac{4\pi^2 R}{T^2}" title="Sentripetal med omløpstid" variant="blue" />
          <FormulaBox latex="a_\parallel = \frac{d|\vec{v}|}{dt}" title="Baneakselerasjon" variant="blue" />
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
                  <td className="py-2 pr-4">Startfart-komponenter</td>
                  <td className="py-2 pr-4">Trigonometri</td>
                  <td className="py-2"><InlineLatex latex="v_{0x} = v_0\cos\alpha" />, <InlineLatex latex="v_{0y} = v_0\sin\alpha" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Tid til toppunkt</td>
                  <td className="py-2 pr-4">Sett <InlineLatex latex="v_y = 0" /></td>
                  <td className="py-2"><InlineLatex latex="t = v_{0y}/g" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Maks høyde</td>
                  <td className="py-2 pr-4">Sett inn <InlineLatex latex="t_{\text{topp}}" /></td>
                  <td className="py-2">Eller: <InlineLatex latex="v_y^2 = 0" /> → løs for y</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Tid til landing</td>
                  <td className="py-2 pr-4">Sett <InlineLatex latex="y = 0" /></td>
                  <td className="py-2">Løs andregradsligning, forkast negativ t</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Fart ved et punkt</td>
                  <td className="py-2 pr-4"><InlineLatex latex="v = \sqrt{v_x^2+v_y^2}" /></td>
                  <td className="py-2">Vinkel: <InlineLatex latex="\alpha = \tan^{-1}|v_y/v_x|" /></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Sentripetaakselerasjon</td>
                  <td className="py-2 pr-4"><InlineLatex latex="a = v^2/R" /></td>
                  <td className="py-2">Alltid mot sentrum</td>
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
        <ProjectileSimulator />
        <CircularMotionVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Robot på Mars */}
        <ExerciseCard
          number={1}
          title="Robot på Mars (vektorbevegelse)"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>En robot beveger seg i xy-planet på Mars. Posisjonen er:</p>
              <FormulaBox latex="x = 2{,}0 - 0{,}25t^2 \;\;\text{[m]}, \quad y = 1{,}0t + 0{,}025t^3 \;\;\text{[m]}" variant="blue" />
              <p className="mt-2">a) Finn koordinatene og avstanden fra origo ved t = 2,0 s.</p>
              <p>b) Finn forflytningen og gjennomsnittsfarten fra t = 0 til t = 2,0 s.</p>
              <p>c) Finn momentanfarten (vektor og størrelse) ved t = 2,0 s.</p>
              <p>d) Finn akselerasjonen ved t = 2,0 s.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Sett t = 2,0 inn i x(t) og y(t) for posisjon. Deriver for fart.</p> },
            { label: "Hint 2", content: <p>Fart: v⃗ = (dx/dt)î + (dy/dt)ĵ. Akselerasjon: a⃗ = (dv_x/dt)î + (dv_y/dt)ĵ.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Koordinater ved t = 2,0 s:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="x = 2{,}0 - 0{,}25(4) = 1{,}0\;\text{m}" />,{" "}
                <InlineLatex latex="y = 2{,}0 + 0{,}025(8) = 2{,}2\;\text{m}" />
              </p>
              <FormulaBox latex="r = \sqrt{1{,}0^2 + 2{,}2^2} = \underline{\underline{2{,}42\;\text{m}}}" variant="gold" />

              <p><strong>b) Forflytning og gjennomsnittsfart:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="\vec{r}_0 = 2{,}0\hat{i}" /> m,{" "}
                <InlineLatex latex="\vec{r}_2 = 1{,}0\hat{i} + 2{,}2\hat{j}" /> m
              </p>
              <FormulaBox latex="\Delta\vec{r} = -1{,}0\hat{i} + 2{,}2\hat{j} \;\;\text{[m]}" variant="blue" />
              <FormulaBox latex="\vec{\bar{v}} = \frac{\Delta\vec{r}}{2{,}0} = \underline{\underline{-0{,}50\hat{i} + 1{,}1\hat{j} \;\;\text{[m/s]}}}" variant="gold" />

              <p><strong>c) Momentanfart:</strong></p>
              <FormulaBox latex="\vec{v} = (-0{,}50t)\hat{i} + (1{,}0 + 0{,}075t^2)\hat{j} \;\;\text{[m/s]}" variant="blue" />
              <p className="text-sm">
                Ved t = 2,0 s: <InlineLatex latex="\vec{v} = \underline{\underline{-1{,}0\hat{i} + 1{,}3\hat{j}}}" /> m/s
              </p>
              <FormulaBox latex="v = \sqrt{1{,}0^2 + 1{,}3^2} = \underline{\underline{1{,}64\;\text{m/s}}}" variant="gold" />

              <p><strong>d) Akselerasjon ved t = 2,0 s:</strong></p>
              <FormulaBox latex="\vec{a} = -0{,}50\hat{i} + 0{,}15t\hat{j} \;\;\text{[m/s}^2\text{]}" variant="blue" />
              <p className="text-sm">
                Ved t = 2,0 s: <InlineLatex latex="\vec{a} = \underline{\underline{-0{,}50\hat{i} + 0{,}30\hat{j}}}" /> m/s²
              </p>
              <FormulaBox latex="a = \sqrt{0{,}50^2 + 0{,}30^2} = \underline{\underline{0{,}58\;\text{m/s}^2}}" variant="gold" />

              <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D: deriver hver komponent separat. Farten er tangent til banen. Størrelsen finnes alltid med Pytagoras.</p>
            </div>
          }
        />

        {/* Eksempel 2: Motorsykkel (horisontalt skråkast) */}
        <ExerciseCard
          number={2}
          title="Motorsykkel — Horisontal startfart"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En motorsykkel kjører utfor en kant med horisontal fart{" "}
                <InlineLatex latex="v_0 = 9{,}0" /> m/s (ingen vertikal startfart).
              </p>
              <p className="mt-2">a) Finn posisjon og avstand fra origo etter t = 0,50 s.</p>
              <p>b) Finn fart (størrelse og retning) etter t = 0,50 s.</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Horisontal start: v₀ₓ = 9,0 m/s, v₀ᵧ = 0. Prosjektillikningene gjelder.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_{0x} = 9{,}0\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_{0y} = 0" />,{" "}
                <InlineLatex latex="t = 0{,}50\;\text{s}" />
              </p>

              <p><strong>a) Posisjon:</strong></p>
              <FormulaBox latex="x = 9{,}0 \cdot 0{,}50 = \underline{\underline{4{,}5\;\text{m}}}" variant="gold" />
              <FormulaBox latex="y = 0 - \tfrac{1}{2}(9{,}81)(0{,}50)^2 = \underline{\underline{-1{,}23\;\text{m}}}" variant="gold" />
              <FormulaBox latex="r = \sqrt{4{,}5^2 + 1{,}23^2} = \underline{\underline{4{,}67\;\text{m}}}" variant="blue" />

              <p><strong>b) Fart:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_x = 9{,}0\;\text{m/s}" /> (konstant),{" "}
                <InlineLatex latex="v_y = -9{,}81 \cdot 0{,}50 = -4{,}91\;\text{m/s}" />
              </p>
              <FormulaBox latex="v = \sqrt{9{,}0^2 + 4{,}91^2} = \underline{\underline{10{,}2\;\text{m/s}}}" variant="gold" />
              <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{4{,}91}{9{,}0}\right) = \underline{\underline{28{,}6°}}\;\text{under horisontal}" variant="gold" />

              <p className="mt-2"><strong>Hva lærte vi?</strong> Med horisontal start: v₀ᵧ = 0, men legemet akselererer nedover pga. tyngdekraften. x-farten er konstant hele tiden.</p>
            </div>
          }
        />

        {/* Eksempel 3: Baseball (skrå startfart) */}
        <ExerciseCard
          number={3}
          title="Baseball — Skrå startfart"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En baseball slås av gårde med fart <InlineLatex latex="v_0 = 37{,}0" /> m/s i vinkel{" "}
                <InlineLatex latex="\alpha_0 = 53{,}1°" /> med horisontalen.
              </p>
              <p className="mt-2">a) Finn posisjon og fart etter t = 2,00 s.</p>
              <p>b) Finn høyeste punkt og tidspunktet.</p>
              <p>c) Finn hvor ballen treffer bakken (y = 0).</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Dekomponér: v₀ₓ = v₀ cos α₀, v₀ᵧ = v₀ sin α₀.</p> },
            { label: "Hint 2", content: <p>Toppunkt: vᵧ = 0. Landing: y = 0 → løs for t (forkast t = 0).</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Dekomposisjon:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_{0x} = 37{,}0 \cos 53{,}1° = 22{,}2\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_{0y} = 37{,}0 \sin 53{,}1° = 29{,}6\;\text{m/s}" />
              </p>

              <p><strong>a) Ved t = 2,00 s:</strong></p>
              <FormulaBox latex="x = 22{,}2 \cdot 2{,}00 = \underline{\underline{44{,}4\;\text{m}}}" variant="gold" />
              <FormulaBox latex="y = 29{,}6 \cdot 2{,}00 - 4{,}905 \cdot 4{,}00 = \underline{\underline{39{,}6\;\text{m}}}" variant="gold" />
              <p className="text-sm">
                <InlineLatex latex="v_x = 22{,}2\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_y = 29{,}6 - 9{,}81 \cdot 2{,}00 = 9{,}98\;\text{m/s}" />
              </p>
              <FormulaBox latex="v = \sqrt{22{,}2^2 + 9{,}98^2} = \underline{\underline{24{,}3\;\text{m/s}}}" variant="gold" />

              <p><strong>b) Toppunkt (<InlineLatex latex="v_y = 0" />):</strong></p>
              <FormulaBox latex="t = \frac{29{,}6}{9{,}81} = \underline{\underline{3{,}02\;\text{s}}}" variant="gold" />
              <FormulaBox latex="y_{\max} = 29{,}6 \cdot 3{,}02 - 4{,}905 \cdot 3{,}02^2 = \underline{\underline{44{,}7\;\text{m}}}" variant="gold" />

              <p><strong>c) Landing (y = 0):</strong></p>
              <FormulaBox latex="t(29{,}6 - 4{,}905t) = 0 \;\Rightarrow\; t = 0 \;\text{eller}\; t = \frac{29{,}6}{4{,}905} = \underline{\underline{6{,}0\;\text{s}}}" variant="blue" />
              <FormulaBox latex="x = 22{,}2 \cdot 6{,}0 = \underline{\underline{134\;\text{m}}}" variant="gold" />

              <p className="mt-2"><strong>Hva lærte vi?</strong> Alltid dekomponér startfarten. Toppunkt: vᵧ = 0. Tiden i luft = 2 × tid til toppunkt (kun fra bakkenivå). Merk symmetrien.</p>
            </div>
          }
        />

        {/* Eksempel 4: Sirkelbevegelse med konstant fart */}
        <ExerciseCard
          number={4}
          title="Sirkelbevegelse med konstant fart"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et legeme beveger seg med konstant fart <InlineLatex latex="v = 3{,}0" /> m/s i en
                sirkel med radius <InlineLatex latex="R = 8{,}0" /> m.
              </p>
              <p className="mt-2">a) Finn sentripetaakselerasjonen.</p>
              <p>b) Finn omløpstiden.</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Bruk a = v²/R og T = 2πR/v.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Sentripetaakselerasjon:</strong></p>
              <FormulaBox latex="a = \frac{v^2}{R} = \frac{3{,}0^2}{8{,}0} = \underline{\underline{1{,}13\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm">Rettet mot sirkelsenter.</p>

              <p><strong>b) Omløpstid:</strong></p>
              <FormulaBox latex="T = \frac{2\pi R}{v} = \frac{2\pi \cdot 8{,}0}{3{,}0} = \underline{\underline{16{,}8\;\text{s}}}" variant="gold" />
            </div>
          }
        />

        {/* Eksempel 5: Sirkelbevegelse med variabel fart */}
        <ExerciseCard
          number={5}
          title="Sirkelbevegelse med variabel fart"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et legeme beveger seg i en sirkel med radius <InlineLatex latex="R = 2{,}0" /> m.
                Banefarten varierer: <InlineLatex latex="v(t) = 1{,}0 + 0{,}50\,t" /> m/s.
              </p>
              <p className="mt-2">
                Finn total akselerasjon (størrelse og retning mhp. normalen) ved t = 2,0 s.
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>To komponenter: a⊥ = v²/R og a∥ = dv/dt. Bruk Pytagoras for total.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Fart ved t = 2,0 s:</strong></p>
              <p className="text-sm"><InlineLatex latex="v(2{,}0) = 1{,}0 + 0{,}50 \cdot 2{,}0 = 2{,}0\;\text{m/s}" /></p>

              <p><strong>Normalakselerasjon (sentripetal):</strong></p>
              <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{2{,}0^2}{2{,}0} = \underline{\underline{2{,}0\;\text{m/s}^2}}" variant="gold" />

              <p><strong>Baneakselerasjon (tangentiell):</strong></p>
              <FormulaBox latex="a_\parallel = \frac{dv}{dt} = \underline{\underline{0{,}50\;\text{m/s}^2}}" variant="gold" />

              <p><strong>Total akselerasjon:</strong></p>
              <FormulaBox latex="a = \sqrt{2{,}0^2 + 0{,}50^2} = \underline{\underline{2{,}06\;\text{m/s}^2}}" variant="gold" />

              <p className="text-sm">
                Vinkel fra normalen: <InlineLatex latex="\alpha = \tan^{-1}(0{,}50/2{,}0) = \underline{\underline{14°}}" />
              </p>

              <p className="mt-2"><strong>Hva lærte vi?</strong> Når farten varierer i sirkelbevegelse, har du to akselerasjonskomponenter. Den normale endrer retning, den tangentielle endrer fartens størrelse.</p>
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
            <h3 className="font-semibold text-lg mb-3">Oppskrift: Prosjektilbevegelse</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Velg koordinatsystem:</strong> x horisontalt, y vertikalt opp, origo i startpunktet.</li>
              <li><strong>Dekomponér startfarten:</strong> <InlineLatex latex="v_{0x} = v_0\cos\alpha_0" />, <InlineLatex latex="v_{0y} = v_0\sin\alpha_0" />.</li>
              <li><strong>Skriv opp likningene</strong> for begge retninger separat.</li>
              <li><strong>Identifiser hva oppgaven spør om:</strong>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Toppunkt → sett <InlineLatex latex="v_y = 0" /></li>
                  <li>Landing → sett <InlineLatex latex="y = 0" /> (eller annen landingshøyde)</li>
                  <li>Fart → finn <InlineLatex latex="v_x" /> og <InlineLatex latex="v_y" />, bruk Pytagoras</li>
                </ul>
              </li>
              <li><strong>Husk:</strong> Tiden t er den <em>samme</em> i x- og y-retning — det er koblingen.</li>
              <li><strong>Sjekk svaret:</strong> Er fortegn, enheter og størrelsesorden rimelige?</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Sjekkliste: Sirkelbevegelse</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Er farten <strong>konstant</strong>? → Kun sentripetal: <InlineLatex latex="a = v^2/R" />.</li>
              <li>Varierer farten? → To komponenter: <InlineLatex latex="a_\perp = v^2/R" /> + <InlineLatex latex="a_\parallel = dv/dt" />.</li>
              <li>Er omløpstiden gitt? → Bruk <InlineLatex latex="v = 2\pi R/T" /> og <InlineLatex latex="a = 4\pi^2 R/T^2" />.</li>
              <li>Total akselerasjon: <InlineLatex latex="a = \sqrt{a_\perp^2 + a_\parallel^2}" />.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Glemmer at vₓ er konstant i prosjektilbevegelse</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Bruker v₀ direkte istedenfor å dekomponere til v₀ₓ og v₀ᵧ</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Tror akselerasjon = 0 i toppunktet (a = −g hele tiden!)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Glemmer at sirkelbevegelse med konstant fart HAR akselerasjon</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>Blander radianer og grader i kalkulasjoner</span>
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

        {/* Oblig 1 Oppg 2 */}
        <ExerciseCard
          number={1}
          title="Stein kastet fra stup"
          difficulty="middels"
          source="Oblig 1, Oppgave 2"
          problem={
            <div>
              <p>
                En stein kastes skrått oppover fra toppen av et bratt stup. Nedenfor er
                landskapet flatt, 30 m lavere enn toppen. Startfart <InlineLatex latex="v_0 = 25" /> m/s,
                vinkel <InlineLatex latex="\alpha_0 = 70°" /> med horisontalplanet.
              </p>
              <p className="mt-2">a) Hvor høyt over utgangspunktet er steinen i det høyeste punktet?</p>
              <p>b) Hvor lang tid tar det før steinen treffer bakken? Hvor treffer den?</p>
              <p>c) Fartens verdi og retning idet den treffer bakken.</p>
              <p>d) Finnes en annen vinkel med samme v₀ som treffer samme punkt?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Origo i startpunktet. Bakken er y = −30 m.</p> },
            { label: "Hint 2", content: <p>For d): bruk baneligningen og løs for α₀. To vinkler gir samme x for gitt y.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Dekomposisjon:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_{0x} = 25\cos 70° = 8{,}55\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_{0y} = 25\sin 70° = 23{,}49\;\text{m/s}" />
              </p>

              <p><strong>a) Toppunkt (<InlineLatex latex="v_y = 0" />):</strong></p>
              <FormulaBox latex="t_{\text{topp}} = \frac{23{,}49}{9{,}81} = 2{,}39\;\text{s}" variant="blue" />
              <FormulaBox latex="y_{\max} = 23{,}49(2{,}39) - 4{,}905(2{,}39)^2 = \underline{\underline{28{,}1\;\text{m}}}" variant="gold" />

              <p><strong>b) Landing (y = −30 m):</strong></p>
              <FormulaBox latex="-30 = 23{,}49t - 4{,}905t^2" variant="blue" />
              <p className="text-sm">
                Andregradsformelen: <InlineLatex latex="t = -1{,}05" /> s (forkastes) eller <InlineLatex latex="\underline{\underline{t = 5{,}84\;\text{s}}}" />
              </p>
              <FormulaBox latex="x = 8{,}55 \cdot 5{,}84 = \underline{\underline{49{,}9\;\text{m}}}" variant="gold" />

              <p><strong>c) Fart ved landing:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_x = 8{,}55\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_y = 23{,}49 - 9{,}81(5{,}84) = -33{,}8\;\text{m/s}" />
              </p>
              <FormulaBox latex="v = \sqrt{8{,}55^2 + 33{,}8^2} = \underline{\underline{34{,}9\;\text{m/s}}}" variant="gold" />
              <FormulaBox latex="\alpha = \tan^{-1}\!\left(\frac{33{,}8}{8{,}55}\right) = \underline{\underline{75{,}8°}}\;\text{under horisontal}" variant="gold" />

              <p><strong>d) Alternativ vinkel:</strong></p>
              <p className="text-sm">
                Ja! Ved å løse baneligningen for den alternative vinkelen får man{" "}
                <InlineLatex latex="\alpha_0 = -11°" /> (11° under horisontalplanet). Man kan altså
                kaste steinen <em>nedover</em> med 11° og treffe samme punkt.
              </p>

              <p className="mt-2"><strong>Hva lærte vi?</strong> Når landingshøyden ≠ starthøyden, må du sette y = riktig verdi (her −30 m). To ulike vinkler kan gi samme treffpunkt.</p>
            </div>
          }
        />

        {/* Oblig 1 Oppg 3b — Sirkelbevegelse */}
        <ExerciseCard
          number={2}
          title="Sirkelbevegelse med bremseakselerasjon"
          difficulty="middels"
          source="Oblig 1, Oppgave 3b"
          problem={
            <div>
              <p>
                Et legeme beveger seg med urviseren i en sirkelbane med radius{" "}
                <InlineLatex latex="R = 2{,}0" /> m. Banefarten varierer:
              </p>
              <FormulaBox latex="v(t) = 5{,}0 - 0{,}10\,t \;\;\text{[m/s]}" variant="blue" />
              <p className="mt-2">
                Regn ut akselerasjonens normalkomponent og parallellkomponent etter 5,0 s.
              </p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Finn v(5,0 s), deretter a⊥ = v²/R og a∥ = dv/dt.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Fart ved t = 5,0 s:</strong></p>
              <p className="text-sm"><InlineLatex latex="v(5{,}0) = 5{,}0 - 0{,}10 \cdot 5{,}0 = 4{,}5\;\text{m/s}" /></p>

              <p><strong>Normalkomponent (sentripetal):</strong></p>
              <FormulaBox latex="a_\perp = \frac{v^2}{R} = \frac{4{,}5^2}{2{,}0} = \underline{\underline{10{,}1\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm">Rettet mot sentrum av sirkelen.</p>

              <p><strong>Parallellkomponent (tangentiell):</strong></p>
              <FormulaBox latex="a_\parallel = \frac{dv}{dt} = \underline{\underline{-0{,}10\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm">Negativ → legemet bremser opp (farten minker).</p>
            </div>
          }
        />

        {/* Selvlaget oppgave */}
        <ExerciseCard
          number={3}
          title="Fotball sparkes skrått"
          difficulty="lett"
          problem={
            <div>
              <p>
                En fotball sparkes fra bakken med fart 20 m/s i vinkel 30° med horisontalen.
              </p>
              <p className="mt-2">a) Finn maks høyde.</p>
              <p>b) Finn total flytid.</p>
              <p>c) Finn rekkevidden.</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>y₀ = 0. Startfartkomponenter: v₀ₓ = 20 cos 30° ≈ 17,3 m/s, v₀ᵧ = 20 sin 30° = 10 m/s.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Startfart:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_{0x} = 20\cos 30° = 17{,}3\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_{0y} = 20\sin 30° = 10{,}0\;\text{m/s}" />
              </p>

              <p><strong>a) Maks høyde:</strong></p>
              <FormulaBox latex="y_{\max} = \frac{v_{0y}^2}{2g} = \frac{100}{19{,}62} = \underline{\underline{5{,}10\;\text{m}}}" variant="gold" />

              <p><strong>b) Flytid (y₀ = 0, lander ved y = 0):</strong></p>
              <FormulaBox latex="t = \frac{2v_{0y}}{g} = \frac{20}{9{,}81} = \underline{\underline{2{,}04\;\text{s}}}" variant="gold" />

              <p><strong>c) Rekkevidde:</strong></p>
              <FormulaBox latex="R = v_{0x} \cdot t = 17{,}3 \cdot 2{,}04 = \underline{\underline{35{,}3\;\text{m}}}" variant="gold" />
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
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 3</p>
          <ul className="space-y-1 text-sm">
            <li>• <strong>Prosjektilbevegelse er det klart hyppigste temaet</strong> på eksamen — alle eksamener har minst én slik oppgave</li>
            <li>• Typisk: skråkast fra høyde, finn tid, posisjon, fart, vinkel</li>
            <li>• Avansert: kombinert med bevegelsesmengde (eksplosjon i toppunkt)</li>
            <li>• Sirkelbevegelse kan dukke opp som del av kraftoppgaver (kap. 5)</li>
          </ul>
        </div>

        {/* Eksamen Høst 2023 Oppg 1 */}
        <ExerciseCard
          number={1}
          title="Prosjektil fra klippetopp"
          difficulty="vanskelig"
          source="Eksamen Høst 2023"
          problem={
            <div>
              <p>
                Et prosjektil skytes ut 115 m over bakkenivå med fart{" "}
                <InlineLatex latex="v_0 = 65{,}0" /> m/s i vinkel 35,0° over horisontalen.
              </p>
              <p className="mt-2">a) Hvor lang tid tar det før prosjektilet treffer punkt P på bakkenivå? Bestem lengden X.</p>
              <p>b) Fartens størrelse og vinkel med bakken idet det treffer P.</p>
              <p>c) Prosjektilets maksimale høyde over bakkenivå.</p>
              <p>d) Prosjektilet sprenges i to like deler i toppunktet. Den ene faller loddrett ned. Hvor treffer den andre delen bakken?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Origo i skuddpunktet: y₀ = 0, bakken er ved y = −115 m.</p> },
            { label: "Hint 2", content: <p>I d): bruk bevaring av bevegelsesmengde i toppunktet. Del 1: vₓ = 0 → del 2: Vₓ = 2v₀ₓ.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Dekomposisjon:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_{0x} = 65{,}0\cos 35° = 53{,}2\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_{0y} = 65{,}0\sin 35° = 37{,}3\;\text{m/s}" />
              </p>

              <p><strong>a) Landing (y = −115 m):</strong></p>
              <FormulaBox latex="-115 = 37{,}3t - 4{,}905t^2" variant="blue" />
              <FormulaBox latex="4{,}905t^2 - 37{,}3t - 115 = 0" variant="blue" />
              <p className="text-sm">
                <InlineLatex latex="t = -2{,}36" /> s (forkastes) eller <InlineLatex latex="\underline{\underline{t = 9{,}96\;\text{s}}}" />
              </p>
              <FormulaBox latex="X = v_{0x} \cdot t = 53{,}2 \cdot 9{,}96 = \underline{\underline{530\;\text{m}}}" variant="gold" />

              <p><strong>b) Fart ved landing:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_x = 53{,}2\;\text{m/s}" />,{" "}
                <InlineLatex latex="v_y = 37{,}3 - 9{,}81(9{,}96) = -60{,}4\;\text{m/s}" />
              </p>
              <FormulaBox latex="v = \sqrt{53{,}2^2 + 60{,}4^2} = \underline{\underline{80{,}5\;\text{m/s}}}" variant="gold" />
              <FormulaBox latex="\theta = \tan^{-1}\!\left(\frac{60{,}4}{53{,}2}\right) = \underline{\underline{48{,}6°}}\;\text{under horisontal}" variant="gold" />

              <p><strong>c) Maks høyde over bakkenivå:</strong></p>
              <FormulaBox latex="t_{\text{topp}} = \frac{37{,}3}{9{,}81} = 3{,}80\;\text{s}" variant="blue" />
              <FormulaBox latex="y_{\text{over origo}} = \frac{37{,}3^2}{2(9{,}81)} = 70{,}9\;\text{m}" variant="blue" />
              <FormulaBox latex="h_{\max} = 115 + 70{,}9 = \underline{\underline{186\;\text{m over bakkenivå}}}" variant="gold" />

              <p><strong>d) Eksplosjon i toppunkt:</strong></p>
              <p className="text-sm">
                I toppunktet: <InlineLatex latex="v_x = 53{,}2\;\text{m/s}" />, <InlineLatex latex="v_y = 0" />.
              </p>
              <p className="text-sm">
                Del 1 faller loddrett (<InlineLatex latex="v_{x1} = 0" />). Bevaring av bevegelsesmengde:
              </p>
              <FormulaBox latex="m \cdot v_{0x} = \frac{m}{2} \cdot 0 + \frac{m}{2} \cdot V_{x2} \;\Rightarrow\; V_{x2} = 2v_{0x} = 106{,}5\;\text{m/s}" variant="blue" />
              <p className="text-sm">
                Del 2 starter ved høyde 186 m over bakken med <InlineLatex latex="V_{x2} = 106{,}5" /> m/s, <InlineLatex latex="V_{y2} = 0" />.
              </p>
              <FormulaBox latex="t_{\text{fall}} = \sqrt{\frac{2 \cdot 186}{9{,}81}} = 6{,}16\;\text{s}" variant="blue" />
              <p className="text-sm">
                x-posisjon av toppunkt: <InlineLatex latex="x_{\text{topp}} = 53{,}2 \cdot 3{,}80 = 202\;\text{m}" />
              </p>
              <FormulaBox latex="x_{\text{del2}} = 202 + 106{,}5 \cdot 6{,}16 = \underline{\underline{858\;\text{m fra klippefoten}}}" variant="gold" />

              <p className="mt-2"><strong>Hva lærte vi?</strong> Denne oppgaven kombinerer prosjektilbevegelse med bevaring av bevegelsesmengde. I toppunktet er vᵧ = 0, kun horisontal fart. Etter eksplosjonen behandles del 2 som et nytt prosjektil.</p>
            </div>
          }
        />

        {/* Eksamen Vår 2023 Oppg 1 */}
        <ExerciseCard
          number={2}
          title="Basketballkast"
          difficulty="middels"
          source="Eksamen Vår 2023"
          problem={
            <div>
              <p>
                En basketballspiller kaster ballen (masse 600 g) mot kurven med vinkel{" "}
                <InlineLatex latex="\theta = 50°" />. Kurven er 4,0 m horisontalt unna og 0,90 m
                høyere enn kasthøyden.
              </p>
              <p className="mt-2">a) Vis at startfarten <InlineLatex latex="v_0 = 7{,}0" /> m/s.</p>
              <p>b) Hva er ballens kinetiske energi når den treffer kurven?</p>
              <p>c) Hva er ballens maksimale høyde over bakken? (Kastes fra 2,1 m.)</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>I a): skriv x- og y-ligningene, eliminer t, og løs for v₀.</p> },
            { label: "Hint 2", content: <p>I b): bruk energibevaring: E_K = ½mv₀² − mgΔy.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Vis at v₀ = 7,0 m/s:</strong></p>
              <p className="text-sm">
                Fra x-likningen: <InlineLatex latex="t = x/(v_0\cos\theta)" />. Sett inn i y-likningen:
              </p>
              <FormulaBox latex="y = x\tan\theta - \frac{gx^2}{2v_0^2\cos^2\theta}" variant="blue" />
              <p className="text-sm">
                Med x = 4,0 m, y = 0,90 m, θ = 50°:
              </p>
              <FormulaBox latex="v_0 = \sqrt{\frac{-gx^2}{2\cos^2\theta\,(y - x\tan\theta)}} = \underline{\underline{7{,}0\;\text{m/s}}} \;\checkmark" variant="gold" />

              <p><strong>b) Kinetisk energi ved kurven:</strong></p>
              <p className="text-sm">Bruker energibevaring (tyngdekraften er konservativ):</p>
              <FormulaBox latex="E_K = \tfrac{1}{2}mv_0^2 - mg\Delta y = \tfrac{1}{2}(0{,}600)(7{,}0)^2 - (0{,}600)(9{,}81)(0{,}90)" variant="blue" />
              <FormulaBox latex="E_K = 14{,}7 - 5{,}3 = \underline{\underline{9{,}4\;\text{J}}}" variant="gold" />

              <p><strong>c) Maks høyde over bakken:</strong></p>
              <FormulaBox latex="t_{\text{topp}} = \frac{v_0\sin 50°}{g} = \frac{7{,}0 \cdot 0{,}766}{9{,}81} = 0{,}547\;\text{s}" variant="blue" />
              <FormulaBox latex="y_{\text{over kast}} = v_0\sin 50° \cdot t - \tfrac{1}{2}gt^2 = 1{,}47\;\text{m}" variant="blue" />
              <FormulaBox latex="h = 2{,}1 + 1{,}47 = \underline{\underline{3{,}6\;\text{m over bakken}}}" variant="gold" />

              <p className="mt-2"><strong>Hva lærte vi?</strong> «Vis at»-oppgaver krever at du finner uttrykket algebraisk. Energibevaring er et effektivt alternativ til kinematikk for å finne fart.</p>
            </div>
          }
        />

        {/* Eksamen Høst 2023 Oppg 3d — Bowlingkule */}
        <ExerciseCard
          number={3}
          title="Bowlingkule i fritt fall fra kant"
          difficulty="middels"
          source="Eksamen Høst 2023"
          problem={
            <div>
              <p>
                En bowlingkule (5,2 kg) ruller utfor en 2,0 m høy kant med horisontal fart 7,3 m/s
                og er i fritt fall før den lander.
              </p>
              <p className="mt-2">a) Hvor langt fra kanten treffer kula bakken?</p>
              <p>b) Hva er kulas bevegelsesmengde ved landing?</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Horisontal start (v₀ᵧ = 0). Finn falltid fra y₀ = 2,0 m.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Falltid:</strong></p>
              <FormulaBox latex="t = \sqrt{\frac{2y_0}{g}} = \sqrt{\frac{2 \cdot 2{,}0}{9{,}81}} = 0{,}639\;\text{s}" variant="blue" />
              <FormulaBox latex="x = v_x \cdot t = 7{,}3 \cdot 0{,}639 = \underline{\underline{4{,}7\;\text{m}}}" variant="gold" />

              <p><strong>b) Bevegelsesmengde:</strong></p>
              <p className="text-sm">
                <InlineLatex latex="v_y = gt = 9{,}81 \cdot 0{,}639 = 6{,}27\;\text{m/s}" />
              </p>
              <FormulaBox latex="v = \sqrt{7{,}3^2 + 6{,}27^2} = 9{,}6\;\text{m/s}" variant="blue" />
              <FormulaBox latex="p = mv = 5{,}2 \cdot 9{,}6 = \underline{\underline{50\;\text{kg·m/s}}}" variant="gold" />
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
