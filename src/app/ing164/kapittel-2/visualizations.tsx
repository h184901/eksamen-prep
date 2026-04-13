"use client";

import { useState, useMemo } from "react";
import InlineLatex from "@/components/InlineLatex";

/* ─── Interactive: x-t / v-t / a-t graf-simulator ─── */
export function KinematicsGraphs() {
  const [v0, setV0] = useState(10);
  const [a, setA] = useState(-2);
  const [x0, setX0] = useState(0);
  const tMax = 8;
  const steps = 80;

  const data = useMemo(() => {
    const pts: { t: number; x: number; v: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = (tMax * i) / steps;
      const v = v0 + a * t;
      const x = x0 + v0 * t + 0.5 * a * t * t;
      pts.push({ t, x, v });
    }
    return pts;
  }, [v0, a, x0]);

  const xMin = Math.min(...data.map((d) => d.x));
  const xMax = Math.max(...data.map((d) => d.x));
  const vMin = Math.min(...data.map((d) => d.v));
  const vMax = Math.max(...data.map((d) => d.v));

  function toSvgX(t: number) {
    return 50 + (t / tMax) * 300;
  }
  function toSvgY(val: number, min: number, max: number) {
    const range = max - min || 1;
    return 160 - ((val - min) / range) * 140;
  }

  function makePath(
    pts: { t: number; val: number }[],
    min: number,
    max: number
  ) {
    return pts
      .map((p, i) => {
        const cmd = i === 0 ? "M" : "L";
        return `${cmd}${toSvgX(p.t).toFixed(1)},${toSvgY(p.val, min, max).toFixed(1)}`;
      })
      .join(" ");
  }

  const xPath = makePath(
    data.map((d) => ({ t: d.t, val: d.x })),
    xMin,
    xMax
  );
  const vPath = makePath(
    data.map((d) => ({ t: d.t, val: d.v })),
    vMin,
    vMax
  );

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">
        Bevegelse med konstant akselerasjon — Grafer
      </h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            v₀ (m/s)
          </label>
          <input
            type="range"
            min={-20}
            max={20}
            step={1}
            value={v0}
            onChange={(e) => setV0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v0} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            a (m/s²)
          </label>
          <input
            type="range"
            min={-5}
            max={5}
            step={0.5}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{a} m/s²</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            x₀ (m)
          </label>
          <input
            type="range"
            min={-20}
            max={20}
            step={1}
            value={x0}
            onChange={(e) => setX0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{x0} m</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* x-t graf */}
        <div>
          <p className="text-sm font-semibold text-center mb-1">
            Posisjon x(t)
          </p>
          <svg viewBox="0 0 380 180" className="w-full">
            <line x1="50" y1="160" x2="360" y2="160" stroke="var(--muted)" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="160" stroke="var(--muted)" strokeWidth="1" />
            <text x="370" y="165" fontSize="10" fill="var(--muted)">t</text>
            <text x="30" y="15" fontSize="10" fill="var(--muted)">x</text>
            {xMin < 0 && xMax > 0 && (
              <line
                x1="50"
                y1={toSvgY(0, xMin, xMax)}
                x2="360"
                y2={toSvgY(0, xMin, xMax)}
                stroke="var(--muted)"
                strokeWidth="0.5"
                strokeDasharray="4"
              />
            )}
            <path d={xPath} fill="none" stroke="#f97316" strokeWidth="2.5" />
            <text x="55" y="175" fontSize="9" fill="var(--muted)">
              {xMin.toFixed(0)}
            </text>
            <text x="55" y="20" fontSize="9" fill="var(--muted)">
              {xMax.toFixed(0)}
            </text>
          </svg>
        </div>

        {/* v-t graf */}
        <div>
          <p className="text-sm font-semibold text-center mb-1">Fart v(t)</p>
          <svg viewBox="0 0 380 180" className="w-full">
            <line x1="50" y1="160" x2="360" y2="160" stroke="var(--muted)" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="160" stroke="var(--muted)" strokeWidth="1" />
            <text x="370" y="165" fontSize="10" fill="var(--muted)">t</text>
            <text x="30" y="15" fontSize="10" fill="var(--muted)">v</text>
            {vMin < 0 && vMax > 0 && (
              <line
                x1="50"
                y1={toSvgY(0, vMin, vMax)}
                x2="360"
                y2={toSvgY(0, vMin, vMax)}
                stroke="var(--muted)"
                strokeWidth="0.5"
                strokeDasharray="4"
              />
            )}
            <path d={vPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="55" y="175" fontSize="9" fill="var(--muted)">
              {vMin.toFixed(0)}
            </text>
            <text x="55" y="20" fontSize="9" fill="var(--muted)">
              {vMax.toFixed(0)}
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-4 text-center space-y-1 text-sm">
        <p>
          <span className="inline-block w-3 h-0.5 bg-[#f97316] mr-1 align-middle" />{" "}
          <InlineLatex latex={`x(t) = ${x0} + ${v0}t + \\frac{1}{2}(${a})t^2`} />
        </p>
        <p>
          <span className="inline-block w-3 h-0.5 bg-[#3b82f6] mr-1 align-middle" />{" "}
          <InlineLatex latex={`v(t) = ${v0} + (${a})t`} />
        </p>
        <p className="text-[var(--muted)]">
          a = {a} m/s² (konstant)
        </p>
      </div>
    </div>
  );
}

/* ─── Interactive: Fritt fall-simulator ─── */
export function FreeFallSimulator() {
  const [y0, setY0] = useState(50);
  const [v0y, setV0y] = useState(15);
  const g = 9.81;

  const tLand = useMemo(() => {
    const disc = v0y * v0y + 2 * g * y0;
    if (disc < 0) return 5;
    return (v0y + Math.sqrt(disc)) / g;
  }, [y0, v0y]);

  const tTop = v0y / g;
  const yMax = y0 + (v0y * v0y) / (2 * g);

  const steps = 60;
  const data = useMemo(() => {
    const pts: { t: number; y: number; vy: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = (tLand * i) / steps;
      const y = y0 + v0y * t - 0.5 * g * t * t;
      const vy = v0y - g * t;
      if (y >= 0) pts.push({ t, y, vy });
    }
    return pts;
  }, [y0, v0y, tLand]);

  const tMaxPlot = Math.max(tLand, 1);
  const yMaxPlot = Math.max(yMax, y0, 1);

  function toSvgX(t: number) {
    return 50 + (t / tMaxPlot) * 250;
  }
  function toSvgY(y: number) {
    return 170 - (y / yMaxPlot) * 150;
  }

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${toSvgX(d.t).toFixed(1)},${toSvgY(d.y).toFixed(1)}`)
    .join(" ");

  const [time, setTime] = useState(0);
  const tClamped = Math.min(Math.max(time, 0), tLand);
  const ballY = y0 + v0y * tClamped - 0.5 * g * tClamped * tClamped;
  const ballVy = v0y - g * tClamped;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Fritt fall — Simulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Starthøyde y₀ (m)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={y0}
            onChange={(e) => setY0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{y0} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Startfart v₀ (m/s, opp +)
          </label>
          <input
            type="range"
            min={-20}
            max={30}
            step={1}
            value={v0y}
            onChange={(e) => setV0y(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v0y} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Tid t (s)
          </label>
          <input
            type="range"
            min={0}
            max={tLand}
            step={0.05}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{tClamped.toFixed(2)} s</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* y-t graf */}
        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-center mb-1">y(t)-graf</p>
          <svg viewBox="0 0 330 190" className="w-full">
            <line x1="50" y1="170" x2="310" y2="170" stroke="var(--muted)" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="170" stroke="var(--muted)" strokeWidth="1" />
            <text x="320" y="175" fontSize="10" fill="var(--muted)">t</text>
            <text x="30" y="15" fontSize="10" fill="var(--muted)">y</text>
            <path d={path} fill="none" stroke="#f97316" strokeWidth="2" />
            {ballY >= 0 && (
              <circle
                cx={toSvgX(tClamped)}
                cy={toSvgY(Math.max(ballY, 0))}
                r="5"
                fill="#f97316"
              />
            )}
            {v0y > 0 && tTop < tLand && (
              <>
                <circle cx={toSvgX(tTop)} cy={toSvgY(yMax)} r="3" fill="var(--muted)" />
                <text x={toSvgX(tTop) + 5} y={toSvgY(yMax) - 5} fontSize="9" fill="var(--muted)">
                  topp
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Side visual */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 80 200" className="h-48">
            <line x1="10" y1="190" x2="70" y2="190" stroke="var(--muted)" strokeWidth="2" />
            <rect x="25" y={190 - (y0 / yMaxPlot) * 170} width="30" height={(y0 / yMaxPlot) * 170} fill="var(--card-border)" rx="2" />
            {ballY >= 0 && (
              <>
                <circle
                  cx="40"
                  cy={190 - (Math.max(ballY, 0) / yMaxPlot) * 170}
                  r="6"
                  fill="#f97316"
                />
                {Math.abs(ballVy) > 0.5 && (
                  <line
                    x1="40"
                    y1={190 - (Math.max(ballY, 0) / yMaxPlot) * 170}
                    x2="40"
                    y2={190 - (Math.max(ballY, 0) / yMaxPlot) * 170 - ballVy * 1.5}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    markerEnd="url(#ff-arrow)"
                  />
                )}
              </>
            )}
            <defs>
              <marker id="ff-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5" fill="#3b82f6" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm mt-2 space-y-0.5">
            <p>y = <strong>{ballY >= 0 ? ballY.toFixed(1) : "0.0"} m</strong></p>
            <p>v = <strong>{ballVy.toFixed(1)} m/s</strong></p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Maks høyde</p>
          <p className="font-bold">{yMax.toFixed(1)} m</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Tid til topp</p>
          <p className="font-bold">{v0y > 0 ? tTop.toFixed(2) : "—"} s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Tid til bakken</p>
          <p className="font-bold">{tLand.toFixed(2)} s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2">
          <p className="text-[var(--muted)] text-xs">Fart ved landing</p>
          <p className="font-bold">{Math.abs(v0y - g * tLand).toFixed(1)} m/s</p>
        </div>
      </div>
    </div>
  );
}
