"use client";

import { useMemo, useState } from "react";
import InlineLatex from "@/components/InlineLatex";
import { explorerViewport } from "./explorer-viewport";

export default function PlanarArmExplorer() {
  const [q1, setQ1] = useState(35);
  const [q2, setQ2] = useState(-55);
  const l1 = 120;
  const l2 = 100;

  const pose = useMemo(() => {
    const a = (q1 * Math.PI) / 180;
    const b = ((q1 + q2) * Math.PI) / 180;
    const joint = { x: l1 * Math.cos(a), y: l1 * Math.sin(a) };
    const end = {
      x: joint.x + l2 * Math.cos(b),
      y: joint.y + l2 * Math.sin(b),
    };
    return { joint, end };
  }, [q1, q2]);

  const base = { x: 250, y: 250 };
  const point = (p: { x: number; y: number }) => ({ x: base.x + p.x, y: base.y - p.y });
  const joint = point(pose.joint);
  const end = point(pose.end);
  const viewport = explorerViewport(500, 310, [base, joint, end]);

  return (
    <section className="overflow-hidden rounded-2xl border border-amber-300/60 bg-[var(--card)] dark:border-amber-800">
      <div className="border-b border-[var(--card-border)] bg-gradient-to-r from-amber-50 to-robotics-50 px-5 py-4 dark:from-amber-950/60 dark:to-robotics-950/50">
        <p className="text-sm font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Forward kinematics</p>
        <h2 className="mt-1 text-xl font-bold text-neutral-950 dark:text-white">Se transformasjonskjeden bevege seg</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-200">
          Hvert ledd endrer rammen til alle lenkene etter seg. Derfor bruker ledd 2 summen av vinklene.
        </p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
        <div className="bg-slate-950 p-3 sm:p-5">
          <svg viewBox={viewport.viewBox} role="img" aria-label="Plan robotarm med to ledd" className="w-full">
            <defs>
              <pattern id="arm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="#1e293b" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x={viewport.x} y={viewport.y} width={viewport.width} height={viewport.height} fill="url(#arm-grid)" />
            <line x1="30" y1={base.y} x2="470" y2={base.y} stroke="#475569" />
            <line x1={base.x} y1="285" x2={base.x} y2="28" stroke="#475569" />
            <circle cx={base.x} cy={base.y} r="13" fill="#0891b2" stroke="#67e8f9" strokeWidth="3" />
            <line x1={base.x} y1={base.y} x2={joint.x} y2={joint.y} stroke="#22d3ee" strokeWidth="14" strokeLinecap="round" />
            <circle cx={joint.x} cy={joint.y} r="11" fill="#f59e0b" stroke="#fde68a" strokeWidth="3" />
            <line x1={joint.x} y1={joint.y} x2={end.x} y2={end.y} stroke="#fbbf24" strokeWidth="12" strokeLinecap="round" />
            <circle cx={end.x} cy={end.y} r="8" fill="#c084fc" stroke="#f5d0fe" strokeWidth="3" />
            <text x={end.x + (end.x > base.x ? -12 : 12)} y={end.y - 14} textAnchor={end.x > base.x ? "end" : "start"} fill="#f5d0fe" fontSize="13" fontWeight="600">end-effektor</text>
          </svg>
        </div>
        <div className="space-y-5 p-5">
          {[
            { label: "Ledd 1", value: q1, setter: setQ1 },
            { label: "Ledd 2", value: q2, setter: setQ2 },
          ].map((slider) => (
            <label key={slider.label} className="block">
              <span className="mb-1.5 flex justify-between text-sm font-medium text-neutral-700 dark:text-neutral-200">
                <span>{slider.label}</span>
                <span className="font-mono text-amber-700 dark:text-amber-300">{slider.value}°</span>
              </span>
              <input
                type="range"
                min={-150}
                max={150}
                value={slider.value}
                onChange={(event) => slider.setter(Number(event.target.value))}
                className="w-full accent-amber-500"
              />
            </label>
          ))}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-950/30">
            <div className="space-y-2 text-sm text-neutral-800 dark:text-neutral-100">
              <div><InlineLatex latex="x=L_1\cos q_1+L_2\cos(q_1+q_2)" /></div>
              <div><InlineLatex latex="y=L_1\sin q_1+L_2\sin(q_1+q_2)" /></div>
            </div>
            <p className="mt-3 font-mono text-sm font-semibold text-amber-800 dark:text-amber-200">
              p = [{pose.end.x.toFixed(1)}, {pose.end.y.toFixed(1)}] mm
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
