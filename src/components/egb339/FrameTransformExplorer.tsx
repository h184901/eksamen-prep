"use client";

import { useMemo, useState } from "react";
import InlineLatex from "@/components/InlineLatex";
import { explorerViewport } from "./explorer-viewport";

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between gap-3 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        <span>{label}</span>
        <span className="font-mono text-robotics-700 dark:text-robotics-300">
          {value.toFixed(step < 1 ? 1 : 0)}{unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-600"
      />
    </label>
  );
}

export default function FrameTransformExplorer() {
  const [angle, setAngle] = useState(35);
  const [tx, setTx] = useState(1.8);
  const [ty, setTy] = useState(1.1);
  const [px, setPx] = useState(1.4);
  const [py, setPy] = useState(0.8);

  const result = useMemo(() => {
    const radians = (angle * Math.PI) / 180;
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    return {
      c,
      s,
      x: c * px - s * py + tx,
      y: s * px + c * py + ty,
    };
  }, [angle, px, py, tx, ty]);

  const origin = { x: 230, y: 190 };
  const scale = 42;
  const frameB = { x: origin.x + tx * scale, y: origin.y - ty * scale };
  const point = { x: origin.x + result.x * scale, y: origin.y - result.y * scale };
  const viewport = explorerViewport(500, 330, [
    frameB,
    { x: frameB.x + 64, y: frameB.y + 19 },
    { x: frameB.x + result.c * 68, y: frameB.y - result.s * 68 },
    { x: frameB.x - result.s * 68, y: frameB.y - result.c * 68 },
    { x: point.x + 18, y: point.y - 9 },
    point,
  ]);

  return (
    <section className="overflow-hidden rounded-2xl border border-robotics-300/60 bg-[var(--card)] dark:border-robotics-800">
      <div className="border-b border-[var(--card-border)] bg-gradient-to-r from-robotics-50 to-sky-50 px-5 py-4 dark:from-robotics-950/70 dark:to-sky-950/50">
        <p className="text-sm font-bold uppercase tracking-wide text-robotics-700 dark:text-robotics-300">
          Interaktivt laboratorium
        </p>
        <h2 className="mt-1 text-xl font-bold text-neutral-950 dark:text-white">
          Fra lokal ramme til verdensrammen
        </h2>
        <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
          Endre pose og lokalt punkt. Den lilla prikken viser samme fysiske punkt uttrykt i verdensrammen.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)]">
        <div className="min-w-0 bg-slate-950 p-3 sm:p-5">
          <svg viewBox={viewport.viewBox} role="img" aria-label="To koordinatrammer og et transformert punkt" className="w-full">
            <defs>
              <pattern id="egb-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#1e293b" strokeWidth="1" />
              </pattern>
              <marker id="egb-arrow-cyan" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#22d3ee" />
              </marker>
              <marker id="egb-arrow-amber" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#f59e0b" />
              </marker>
            </defs>
            <rect x={viewport.x} y={viewport.y} width={viewport.width} height={viewport.height} fill="url(#egb-grid)" />

            <line x1="28" y1={origin.y} x2="475" y2={origin.y} stroke="#475569" strokeWidth="1.5" />
            <line x1={origin.x} y1="305" x2={origin.x} y2="25" stroke="#475569" strokeWidth="1.5" />
            <text x="468" y={origin.y - 8} fill="#94a3b8" fontSize="12">x₀</text>
            <text x={origin.x + 8} y="30" fill="#94a3b8" fontSize="12">y₀</text>

            <line
              x1={frameB.x}
              y1={frameB.y}
              x2={frameB.x + result.c * 68}
              y2={frameB.y - result.s * 68}
              stroke="#22d3ee"
              strokeWidth="3"
              markerEnd="url(#egb-arrow-cyan)"
            />
            <line
              x1={frameB.x}
              y1={frameB.y}
              x2={frameB.x - result.s * 68}
              y2={frameB.y - result.c * 68}
              stroke="#f59e0b"
              strokeWidth="3"
              markerEnd="url(#egb-arrow-amber)"
            />
            <circle cx={frameB.x} cy={frameB.y} r="5" fill="#f8fafc" />
            <text x={frameB.x + 9} y={frameB.y + 19} fill="#f8fafc" fontSize="13" fontWeight="600">ramme A</text>

            <line x1={frameB.x} y1={frameB.y} x2={point.x} y2={point.y} stroke="#c084fc" strokeWidth="2" strokeDasharray="6 5" />
            <circle cx={point.x} cy={point.y} r="7" fill="#c084fc" />
            <text x={point.x + 10} y={point.y - 9} fill="#e9d5ff" fontSize="13" fontWeight="600">P</text>
          </svg>
        </div>

        <div className="space-y-4 p-5">
          <Slider label="Rotasjon θ" value={angle} min={-180} max={180} unit="°" onChange={setAngle} />
          <Slider label="Translasjon x" value={tx} min={-3} max={3} step={0.1} onChange={setTx} />
          <Slider label="Translasjon y" value={ty} min={-2.5} max={2.5} step={0.1} onChange={setTy} />
          <div className="grid grid-cols-2 gap-3">
            <Slider label="Pₐ, x" value={px} min={-2} max={2} step={0.1} onChange={setPx} />
            <Slider label="Pₐ, y" value={py} min={-2} max={2} step={0.1} onChange={setPy} />
          </div>

          <div className="rounded-xl border border-robotics-200 bg-robotics-50/70 p-4 dark:border-robotics-800 dark:bg-robotics-950/35">
            <div className="text-center text-neutral-950 dark:text-white">
              <InlineLatex latex="p_0 = R(\theta)p_A + t" />
            </div>
            <p className="mt-3 text-center font-mono text-sm font-semibold text-robotics-800 dark:text-robotics-200">
              p₀ = [{result.x.toFixed(2)}, {result.y.toFixed(2)}]ᵀ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
