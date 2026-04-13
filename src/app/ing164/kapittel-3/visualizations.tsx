"use client";

import { useState, useMemo } from "react";
import InlineLatex from "@/components/InlineLatex";

/* ─── Interactive: Prosjektilbevegelse-simulator ─── */
export function ProjectileSimulator() {
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
export function CircularMotionVisualizer() {
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
