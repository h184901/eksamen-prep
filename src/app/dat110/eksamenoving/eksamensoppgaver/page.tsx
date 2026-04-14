"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Lokale komponenter ────────────────────────────────────────────────────

function ExamTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
        active
          ? "bg-rose-600 text-white border-rose-600 shadow"
          : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-rose-400 hover:text-rose-600"
      }`}
    >
      {label}
    </button>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-rose-400/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
        >
          Vis løsning
        </button>
      ) : (
        <div className="rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 p-4 text-sm space-y-2">
          <button
            onClick={() => setShow(false)}
            className="text-xs text-rose-500 hover:text-rose-700 float-right"
          >
            Skjul
          </button>
          {children}
        </div>
      )}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-amber-400/50 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
        >
          Vis hint
        </button>
      ) : (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 p-3 text-sm text-amber-800 dark:text-amber-300">
          <span className="font-semibold">Hint: </span>
          {children}
        </div>
      )}
    </div>
  );
}

function Strategy({
  title,
  checklist,
  children,
}: {
  title: string;
  checklist?: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 p-4 text-sm space-y-2">
      <p className="font-bold text-blue-700 dark:text-blue-400">Strategi: {title}</p>
      {children && <p className="text-blue-800 dark:text-blue-300">{children}</p>}
      {checklist && checklist.length > 0 && (
        <ul className="space-y-1 mt-2">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-blue-700 dark:text-blue-300">
              <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border border-blue-400 flex items-center justify-center text-xs">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Formula({ label, formula }: { label?: string; formula: string }) {
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700 px-4 py-2 my-1">
      {label && <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-0.5">{label}</span>}
      <code className="font-mono text-sm text-neutral-800 dark:text-neutral-200">{formula}</code>
    </div>
  );
}

function OppgaveLink({ href, label, chapter }: { href: string; label: string; chapter?: string }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        {label}
      </Link>
      {chapter && (
        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          CN: {chapter}
        </span>
      )}
    </div>
  );
}

function Laerdom({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 p-3 text-sm mt-3">
      <span className="font-bold text-green-700 dark:text-green-400">Lærdom: </span>
      <span className="text-green-800 dark:text-green-300">{children}</span>
    </div>
  );
}

function OppgaveCard({
  nummer,
  tittel,
  poeng,
  children,
}: {
  nummer: number;
  tittel: string;
  poeng: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-600 text-white text-sm font-bold flex items-center justify-center">
            {nummer}
          </span>
          <div>
            <p className="font-bold text-sm">{tittel}</p>
            <p className="text-xs text-[var(--muted)]">{poeng} %</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform text-[var(--muted)] ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-6 space-y-4 border-t border-[var(--card-border)]">{children}</div>}
    </div>
  );
}

// ─── SVG Diagrammer ───────────────────────────────────────────────────────

function NetworkDiagramOppg3() {
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 440 160" className="w-full max-w-lg" fill="none">
        {/* H1 */}
        <rect x="10" y="20" width="50" height="30" rx="5" stroke="#94a3b8" strokeWidth="1.5" fill="white" />
        <text x="35" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">H1</text>
        {/* H2 */}
        <rect x="10" y="110" width="50" height="30" rx="5" stroke="#94a3b8" strokeWidth="1.5" fill="white" />
        <text x="35" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">H2</text>
        {/* R1 */}
        <circle cx="170" cy="80" r="28" stroke="#3b82f6" strokeWidth="2" fill="#eff6ff" />
        <text x="170" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">R1</text>
        {/* R2 */}
        <circle cx="300" cy="80" r="28" stroke="#3b82f6" strokeWidth="2" fill="#eff6ff" />
        <text x="300" y="85" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">R2</text>
        {/* H3 */}
        <rect x="375" y="65" width="50" height="30" rx="5" stroke="#94a3b8" strokeWidth="1.5" fill="white" />
        <text x="400" y="85" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">H3</text>
        {/* Linjer */}
        <line x1="60" y1="35" x2="143" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="60" y1="125" x2="143" y2="92" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="198" y1="80" x2="272" y2="80" stroke="#3b82f6" strokeWidth="2" />
        <text x="235" y="73" textAnchor="middle" fontSize="9" fill="#3b82f6">R=10⁶ b/s</text>
        <text x="235" y="95" textAnchor="middle" fontSize="9" fill="#6b7280">d=10⁴m, s=5×10⁸m/s</text>
        <line x1="328" y1="80" x2="375" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function RouterDiagramOppg5() {
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 380 220" className="w-full max-w-sm" fill="none">
        {/* R1 */}
        <circle cx="60" cy="140" r="28" stroke="#3b82f6" strokeWidth="2" fill="#eff6ff" />
        <text x="60" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">R1</text>
        {/* R2 */}
        <circle cx="200" cy="50" r="28" stroke="#3b82f6" strokeWidth="2" fill="#eff6ff" />
        <text x="200" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">R2</text>
        {/* R3 */}
        <circle cx="200" cy="160" r="28" stroke="#10b981" strokeWidth="2" fill="#f0fdf4" />
        <text x="200" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#059669">R3</text>
        {/* R4 */}
        <circle cx="320" cy="100" r="28" stroke="#3b82f6" strokeWidth="2" fill="#eff6ff" />
        <text x="320" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb">R4</text>
        {/* R1—R3: kost 5 */}
        <line x1="87" y1="132" x2="172" y2="152" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="125" y="148" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="bold">5</text>
        {/* R2—R3: kost 2 */}
        <line x1="200" y1="78" x2="200" y2="132" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="212" y="112" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="bold">2</text>
        {/* R2—R4: kost 8 */}
        <line x1="227" y1="62" x2="296" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="268" y="68" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="bold">8</text>
        {/* R3—R4: kost 1 */}
        <line x1="228" y1="152" x2="295" y2="115" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3" />
        <text x="268" y="140" textAnchor="middle" fontSize="11" fill="#059669" fontWeight="bold">1</text>
        {/* Optimal vei label */}
        <text x="200" y="205" textAnchor="middle" fontSize="10" fill="#059669">Beste vei: R1→R3→R4 (kost 6)</text>
      </svg>
    </div>
  );
}

function SwitchDiagramOppg6() {
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 400 200" className="w-full max-w-md" fill="none">
        {/* Switch */}
        <circle cx="220" cy="100" r="32" stroke="#7c3aed" strokeWidth="2" fill="#f5f3ff" />
        <text x="220" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">S</text>
        <text x="220" y="112" textAnchor="middle" fontSize="9" fill="#6d28d9">switch</text>
        {/* Interface labels */}
        <text x="260" y="78" fontSize="10" fill="#7c3aed" fontWeight="bold">3</text>
        <text x="258" y="122" fontSize="10" fill="#7c3aed" fontWeight="bold">2</text>
        <text x="195" y="135" fontSize="10" fill="#7c3aed" fontWeight="bold">1</text>
        {/* H1 */}
        <rect x="30" y="20" width="90" height="45" rx="6" stroke="#94a3b8" strokeWidth="1.5" fill="white" />
        <text x="75" y="37" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">H1 (192.168.0.1)</text>
        <text x="75" y="51" textAnchor="middle" fontSize="9" fill="#6b7280">1A:1B:1C:1D:1E:1F</text>
        {/* H2 */}
        <rect x="30" y="90" width="90" height="45" rx="6" stroke="#94a3b8" strokeWidth="1.5" fill="white" />
        <text x="75" y="107" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">H2 (192.168.0.2)</text>
        <text x="75" y="121" textAnchor="middle" fontSize="9" fill="#6b7280">2A:2B:2C:2D:2E:2F</text>
        {/* H3 */}
        <rect x="30" y="155" width="90" height="35" rx="6" stroke="#94a3b8" strokeWidth="1.5" fill="white" />
        <text x="75" y="170" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">H3 (192.168.0.3)</text>
        <text x="75" y="182" textAnchor="middle" fontSize="9" fill="#6b7280">3A:3B:3C:3D:3E:3F</text>
        {/* Linjer */}
        <line x1="120" y1="42" x2="193" y2="82" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="120" y1="112" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="120" y1="170" x2="190" y2="118" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function OverlayDiagramOppg8() {
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 440 240" className="w-full max-w-lg" fill="none">
        {/* Cloud/Internet background */}
        <ellipse cx="220" cy="130" rx="175" ry="80" stroke="#cbd5e1" strokeWidth="1" fill="#f8fafc" strokeDasharray="6,3" />
        <text x="340" y="185" fontSize="10" fill="#94a3b8">Internet</text>
        {/* Routers */}
        <rect x="60" y="90" width="35" height="25" rx="3" stroke="#3b82f6" strokeWidth="1.5" fill="#dbeafe" />
        <text x="77" y="107" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">Ra</text>
        <rect x="100" y="135" width="35" height="25" rx="3" stroke="#3b82f6" strokeWidth="1.5" fill="#dbeafe" />
        <text x="117" y="152" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">Rb</text>
        <rect x="185" y="145" width="35" height="25" rx="3" stroke="#3b82f6" strokeWidth="1.5" fill="#dbeafe" />
        <text x="202" y="162" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">Rc</text>
        <rect x="270" y="135" width="35" height="25" rx="3" stroke="#3b82f6" strokeWidth="1.5" fill="#dbeafe" />
        <text x="287" y="152" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">Rd</text>
        <rect x="325" y="90" width="35" height="25" rx="3" stroke="#3b82f6" strokeWidth="1.5" fill="#dbeafe" />
        <text x="342" y="107" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">Re</text>
        {/* Router links with costs */}
        <line x1="95" y1="103" x2="325" y2="103" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" />
        <text x="210" y="98" textAnchor="middle" fontSize="9" fill="#64748b">40</text>
        <line x1="77" y1="115" x2="117" y2="135" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" />
        <text x="90" y="128" fontSize="9" fill="#64748b">5</text>
        <line x1="135" y1="147" x2="185" y2="153" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" />
        <text x="160" y="146" fontSize="9" fill="#64748b">10</text>
        <line x1="220" y1="153" x2="270" y2="148" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" />
        <text x="245" y="146" fontSize="9" fill="#64748b">5</text>
        <line x1="305" y1="140" x2="325" y2="115" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" />
        <text x="320" y="130" fontSize="9" fill="#64748b">5</text>
        <line x1="202" y1="145" x2="342" y2="115" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" />
        {/* Processes A–E */}
        <circle cx="55" cy="45" r="18" stroke="#f97316" strokeWidth="2" fill="#fff7ed" />
        <text x="55" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c">A</text>
        <circle cx="55" cy="185" r="18" stroke="#f97316" strokeWidth="2" fill="#fff7ed" />
        <text x="55" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c">B</text>
        <circle cx="202" cy="195" r="18" stroke="#f97316" strokeWidth="2" fill="#fff7ed" />
        <text x="202" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c">C</text>
        <circle cx="387" cy="185" r="18" stroke="#f97316" strokeWidth="2" fill="#fff7ed" />
        <text x="387" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c">D</text>
        <circle cx="400" cy="45" r="18" stroke="#f97316" strokeWidth="2" fill="#fff7ed" />
        <text x="400" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c">E</text>
        {/* Process–Router links */}
        <line x1="55" y1="63" x2="70" y2="90" stroke="#f97316" strokeWidth="1.5" />
        <text x="56" y="79" fontSize="9" fill="#f97316">1</text>
        <line x1="55" y1="167" x2="105" y2="155" stroke="#f97316" strokeWidth="1.5" />
        <text x="69" y="158" fontSize="9" fill="#f97316">1</text>
        <line x1="202" y1="177" x2="202" y2="170" stroke="#f97316" strokeWidth="1.5" />
        <text x="210" y="175" fontSize="9" fill="#f97316">1</text>
        <line x1="375" y1="172" x2="305" y2="155" stroke="#f97316" strokeWidth="1.5" />
        <text x="348" y="161" fontSize="9" fill="#f97316">1</text>
        <line x1="400" y1="63" x2="352" y2="90" stroke="#f97316" strokeWidth="1.5" />
        <text x="382" y="78" fontSize="9" fill="#f97316">1</text>
      </svg>
    </div>
  );
}

function ChordRingOppg10() {
  const cx = 200, cy = 130, r = 95;
  const nodes = [
    { id: 3, angle: -72 },
    { id: 12, angle: 18 },
    { id: 21, angle: 108 },
    { id: 31, angle: 198 },
  ];
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
      <svg viewBox="0 0 400 270" className="w-full max-w-md" fill="none">
        <circle cx={cx} cy={cy} r={r} stroke="#94a3b8" strokeWidth="1.5" fill="none" />
        {nodes.map(({ id, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return (
            <g key={id}>
              <circle cx={x} cy={y} r="18" stroke="#10b981" strokeWidth="2" fill="#f0fdf4" />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#059669">
                {id}
              </text>
            </g>
          );
        })}
        <text x="200" y="255" textAnchor="middle" fontSize="10" fill="#6b7280">
          m=5 bit ring: noder 3, 12, 21, 31 (maks verdi 31)
        </text>
        {/* Successor arrows antydet */}
        <path d="M217 64 A95 95 0 0 1 293 148" stroke="#10b981" strokeWidth="1" strokeDasharray="4,2" />
        <text x="270" y="100" fontSize="9" fill="#10b981">succ()</text>
      </svg>
    </div>
  );
}

// ─── Fingertebell ─────────────────────────────────────────────────────────

function FingerTable({ node, entries }: { node: number; entries: number[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="text-xs border-collapse w-full max-w-xs">
        <thead>
          <tr className="bg-green-100 dark:bg-green-900/30">
            <th className="border border-green-200 dark:border-green-800 px-3 py-1 text-green-700 dark:text-green-400">i</th>
            <th className="border border-green-200 dark:border-green-800 px-3 py-1 text-green-700 dark:text-green-400">n+2^(i-1)</th>
            <th className="border border-green-200 dark:border-green-800 px-3 py-1 text-green-700 dark:text-green-400">succ()</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((val, i) => {
            const lookup = node + Math.pow(2, i);
            return (
              <tr key={i} className="hover:bg-green-50 dark:hover:bg-green-900/20">
                <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">{i + 1}</td>
                <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center font-mono">{lookup % 32}</td>
                <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center font-bold text-green-700 dark:text-green-400">{val}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-xs text-[var(--muted)] mt-1">Node {node} — fingertabell (m=5, ring mod 32)</p>
    </div>
  );
}

// ─── DVR Tabell ─────────────────────────────────────────────────────────

function DVTable({
  node,
  values,
}: {
  node: string;
  values: { R1: number | string; R2: number | string; R3: number | string; R4: number | string };
}) {
  const inf = "∞";
  return (
    <div className="overflow-x-auto">
      <table className="text-xs border-collapse">
        <thead>
          <tr className="bg-blue-50 dark:bg-blue-900/30">
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">y</th>
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">R1</th>
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">R2</th>
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">R3</th>
            <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">R4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono">D_{node}(y)</td>
            <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">{values.R1}</td>
            <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">{values.R2}</td>
            <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">{values.R3}</td>
            <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">{values.R4}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Eksamen Jan 2025 ─────────────────────────────────────────────────────

function Eksamen2025Jan() {
  return (
    <div className="space-y-4">

      {/* Oppgave 1 */}
      <OppgaveCard nummer={1} tittel="Flervalgsquiz — Canvas-quiz" poeng={10}>
        <div className="pt-3 space-y-3">
          <Strategy
            title="Les alle alternativer nøye"
            checklist={[
              "Spørsmålene er direkte fra Canvas-quizene — repeter dem",
              "Bruk eliminasjon: stryk åpenbart gale svar",
              "Husk nøkkeldefinisjoner: lag, protokoller, formål",
            ]}
          />
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">a) Linklaget i TCP/IP gir generelt:</p>
              <p className="text-xs text-[var(--muted)]">1. Multi-hop forwarding   2. Pålitelig overføring over én link   3. Upålitelig overføring over én link</p>
              <Answer>
                <p><strong>Svar: 3</strong> — Linklaget overfører frames over <em>én</em> kommunikasjonsforbindelse, upålitelig (ingen garanti). Multi-hop er nettverklaget (IP), og pålitelig overføring er transportlaget (TCP).</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">b) Trafikkintensitet er et mål på:</p>
              <Answer>
                <p><strong>Svar: 2</strong> — Trafikkintensitet = La/R, dvs. forholdet mellom bits presentert per tidsenhet (La) og overføringshastigheten R. Hvis La/R &gt; 1 vokser køen uten grense.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">c) Kommunikasjonsendepunkt ved transportlaget identifiseres med:</p>
              <Answer>
                <p><strong>Svar: 3</strong> — IP-adresse + portnummer identifiserer en socket. IP alene er nettverklaget. Prosess-ID brukes ikke i TCP/IP.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">d) Hvilken mediumaksessprotokoll kan ha kollisjon?</p>
              <Answer>
                <p><strong>Svar: 2 — CSMA</strong> — CSMA er en random access-protokoll der noder "hører" men kan likevel kollidere. FDM og TDM er partisjonerte protokoller (ingen kollisjon fordi kanalen er delt deterministisk).</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">e) DNS sitt hovedformål:</p>
              <Answer>
                <p><strong>Svar: 3</strong> — DNS mapper hostnavn til IP-adresser. ARP mapper IP til MAC-adresser (alternativ 1 er delvis beskrivelse av ARP).</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">f) Probabilistisk flooding i multicast er for å:</p>
              <Answer>
                <p><strong>Svar: 3</strong> — Probabilistisk flooding videresender pakker med sannsynlighet p &lt; 1 for å redusere antallet meldinger i nettverket og unngå broadcast-storm.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">g) Rapid elasticity i sky relaterer til:</p>
              <Answer>
                <p><strong>Svar: 1 — Skalerbarhet</strong> — Rapid elasticity betyr at ressurser kan skaleres raskt opp/ned etter behov. Dette er et kjerneprinsipp i cloud computing.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">h) RPC sin hovedidé:</p>
              <Answer>
                <p><strong>Svar: 3</strong> — RPC lar en klientprosess kalle en funksjon på en fjernserver som om det var et lokalt funksjonskall. Transparens er nøkkelidéen.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">i) Prosessresiliense i distribuerte systemer:</p>
              <Answer>
                <p><strong>Svar: 1</strong> — Organisere identiske prosesser i en gruppe (prosessreplikasjon) slik at systemet fortsetter å fungere selv om én prosess feiler.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1">
              <p className="font-semibold">j) Sikkerhet: integritet OG ikke-avvisning:</p>
              <Answer>
                <p><strong>Svar: 2 — Digital signatur</strong> — Digital signatur gir både integritet (kan ikke endres uten deteksjon) og ikke-avvisning (avsenderen kan ikke nekte for å ha sendt). MAC gir integritet men ikke ikke-avvisning.</p>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 1 er alltid Canvas-quiz. Les pensum fra begge bøker, fokuser på presise definisjoner og formål med hvert lag/protokoll.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-1" label="Se Oppg 1: Quiz-trening" />
        </div>
      </OppgaveCard>

      {/* Oppgave 2 */}
      <OppgaveCard nummer={2} tittel="Oblig 1 — Socket-programmering og RPC" poeng={10}>
        <div className="pt-3 space-y-3">
          <Strategy
            title="Koble teori til prosjektkoden din"
            checklist={[
              "Husk de tre protokollagene i oblig 1",
              "Forstå meldingsformatet: 128 bytes totalt",
              "Socket = IP-adresse + portnummer",
              "RPC-metode identifiseres via metodenummer i payload",
            ]}
          />
          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) List de tre protokollagene i prosjektet og forklar sammenhengen.</p>
              <Hint>Tenk IoT-applikasjon, RPC og meldingslag. Hvilket lag bruker hvilket?</Hint>
              <Answer>
                <p><strong>De tre lagene:</strong></p>
                <ol className="list-decimal list-inside space-y-1 mt-1">
                  <li><strong>IoT-applikasjonslaget</strong> — sensor-display-kontroller-systemet</li>
                  <li><strong>RPC-laget</strong> — implementerer fjernanrop mellom klient og server</li>
                  <li><strong>Meldingslaget</strong> — implementerer meldingsutveksling på toppen av TCP</li>
                </ol>
                <p className="mt-2">Meldingslaget brukes av RPC-laget, som igjen brukes av IoT-applikasjonslaget. Hvert lag skjuler kompleksiteten for laget over.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Meldinger er 128 bytes. Hva er formålet med de første 8 bitene?</p>
              <Hint>128 bytes er fast lengde, men ikke alltid 127 bytes med data. Trenger mottaker å vite noe?</Hint>
              <Answer>
                <p>De første 8 bitene spesifiserer antall payload-bytes (0–127) i de resterende 127 bytene. Siden meldingen alltid er 128 bytes, men ikke alltid har 127 bytes nyttedata, må mottaker vite hvor mange bytes som faktisk inneholder data.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) To elementer for å identifisere en socket ved transportlaget?</p>
              <Answer>
                <p><strong>IP-adresse</strong> og <strong>portnummer</strong>. En socket er et kommunikasjonsendepunkt som entydig identifiseres av disse to elementene i TCP/IP-protokollstabelen.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">d) Hvordan identifiserer serveren metoden ved RPC-forespørsel?</p>
              <Answer>
                <p>Den første byten i RPC-forespørselsmeldingen (payload-data i meldingslaget) spesifiserer et <strong>metodenummer</strong>. Serveren slår opp dette nummeret i en RPC-tabell for å finne og kalle riktig metode.</p>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 2 er alltid relatert til oblig 1. Forstå lagarkitekturen og protokollformater grundig — dette er lett poeng om du husker prosjektet.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-2" label="Se Oppg 2: Obliger" />
        </div>
      </OppgaveCard>

      {/* Oppgave 3 */}
      <OppgaveCard nummer={3} tittel="Forsinkelsesberegning — H1, H2 → R1 → R2 → H3" poeng={10}>
        <div className="pt-3 space-y-3">
          <NetworkDiagramOppg3 />
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 text-sm space-y-1">
            <p className="font-semibold text-[var(--muted)]">Gitte verdier:</p>
            <p>R = 10⁶ bits/s, d = 10⁴ m, s = 5×10⁸ m/s, L = 10³ bits</p>
            <p>d_proc = 0,002 s, d_queue = 0,01 s</p>
          </div>
          <Strategy
            title="Systematisk forsinkelsesberegning"
            checklist={[
              "d_trans = L/R (sendingsforsinkelse)",
              "d_prop = d/s (forplantningsforsinkelse)",
              "d_nodal = d_proc + d_queue + d_prop + d_trans",
              "Ende-til-ende = summen av nodalforsinkelser langs ruten",
              "Flaskehals = lenken med lavest kapasitet",
            ]}
          />
          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Sendingsforsinkelse for L = 10³ bits på R1→R2-lenken?</p>
              <Formula label="Formel" formula="d_trans = L/R" />
              <Hint>Del pakkestørrelsen på overføringshastigheten.</Hint>
              <Answer>
                <p><strong>d_trans = L/R = 10³ / 10⁶ = 0,001 s = 1 ms</strong></p>
                <p className="text-xs text-[var(--muted)] mt-1">Det tar 1 millisekund å "skyve" hele pakken ut på lenken.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Nodalforsinkelse ved R1 for en pakke med L = 1000 bits?</p>
              <Formula label="Formel" formula="d_nodal = d_proc + d_queue + d_prop + d_trans" />
              <Hint>Beregn d_prop = d/s først, deretter summer alle fire komponenter.</Hint>
              <Answer>
                <div className="space-y-1">
                  <p>d_prop = d/s = 10⁴ / (5×10⁸) = 0,00002 s = 0,02 ms</p>
                  <p>d_nodal = 0,002 + 0,01 + 0,00002 + 0,001 = <strong>0,01302 s ≈ 13,02 ms</strong></p>
                  <p className="text-xs text-[var(--muted)] mt-1">Merk: d_prop er mye mindre enn d_queue og d_proc her.</p>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) Ende-til-ende-forsinkelse fra H1 til H3?</p>
              <Hint>H1, R1 og R2 har alle samme nodalforsinkelse. Summer dem.</Hint>
              <Answer>
                <div className="space-y-1">
                  <p>Pakken passerer H1, R1, R2 (3 noder med samme forsinkelse)</p>
                  <p><strong>d_e2e = 3 × 0,01302 = 0,03906 s ≈ 39,06 ms</strong></p>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">d) H1,H2→R1: 50 Mbps | R1→R2: 100 Mbps | R2→H3: 10 Mbps — hvilken er flaskehalsen?</p>
              <Hint>Flaskehalsen er alltid lenken med lavest kapasitet i ruten.</Hint>
              <Answer>
                <p><strong>Flaskehalsen er R2→H3 med 10 Mbps</strong> — den laveste overføringshastigheten langs ruten. Selv om R1→R2 har 100 Mbps, begrenses total gjennomstrøm av det svakeste leddet.</p>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 3 er nesten identisk hvert år. Lær de fire forsinkelseskomponentene utenat og øv på å beregne dem raskt.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-3" label="Se Oppg 3: Forsinkelser" chapter="Kap 1.4" />
        </div>
      </OppgaveCard>

      {/* Oppgave 4 */}
      <OppgaveCard nummer={4} tittel="IPv4 datagramformat" poeng={10}>
        <div className="pt-3 space-y-3">
          {/* IPv4 header SVG */}
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-3 overflow-x-auto">
            <svg viewBox="0 0 500 230" className="w-full max-w-lg" fill="none">
              <text x="250" y="18" textAnchor="middle" fontSize="10" fill="#6b7280">32 bits</text>
              {[
                { y: 25, cells: [{ w: 60, label: "Version" }, { w: 70, label: "Hdr len" }, { w: 110, label: "Type of service" }, { w: 160, label: "Datagram length" }] },
                { y: 65, cells: [{ w: 200, label: "16-bit Identifier" }, { w: 50, label: "Flags" }, { w: 150, label: "13-bit Frag. offset" }] },
                { y: 105, cells: [{ w: 80, label: "Time-to-live" }, { w: 110, label: "Upper-layer prot." }, { w: 210, label: "Header checksum" }] },
                { y: 145, cells: [{ w: 400, label: "32-bit Source IP address" }] },
                { y: 185, cells: [{ w: 400, label: "32-bit Destination IP address" }] },
              ].map(({ y, cells }, ri) => {
                let x = 50;
                return cells.map((cell, ci) => {
                  const rect = (
                    <g key={`${ri}-${ci}`}>
                      <rect x={x} y={y} width={cell.w} height={34} stroke="#94a3b8" strokeWidth="1" fill={ri === 0 ? "#dbeafe" : ri === 1 ? "#fef3c7" : ri === 2 ? "#dcfce7" : "#f0fdf4"} />
                      <text x={x + cell.w / 2} y={y + 21} textAnchor="middle" fontSize="9" fill="#374151">{cell.label}</text>
                    </g>
                  );
                  x += cell.w;
                  return rect;
                });
              })}
              <rect x="50" y="225" width="400" height="0" />
            </svg>
          </div>
          <Strategy
            title="IPv4-felt: lær hvert felts formål"
            checklist={[
              "IP er upålitelig, ende-til-ende, multi-hop",
              "Fragmenteringsfeltene: Identifier, Flags, Offset",
              "TTL avtar med 1 per hopp — forhindrer routing-løkker",
              "Upper-layer protocol skiller TCP (6) fra UDP (17)",
            ]}
          />
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Hvilken tjeneste gir IP-protokollen?</p>
              <Answer>
                <p><strong>Upålitelig multi-hop ende-til-ende overføring av datagrammer.</strong> IP garanterer ikke levering, rekkefølge eller at pakker ikke dupliseres. Disse garantiene er eventuelt TCP sitt ansvar.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Forklar Identifier, Flags og Fragmentation offset.</p>
              <Hint>Alle tre brukes sammen for fragmentering og reassemblering av store pakker.</Hint>
              <Answer>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Identifier:</strong> Unikt nummer som identifiserer hvilket original-datagram fragmentene tilhører</li>
                  <li><strong>Flags:</strong> Bit som angir om reassemblering er ferdig (Flag=0 = siste fragment)</li>
                  <li><strong>Fragmentation offset:</strong> Angir hvor i original-datagrammet dette fragmentet var plassert</li>
                </ul>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) Forklar Time-to-live, Source/Destination IP address og Data.</p>
              <Answer>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Time-to-live (TTL):</strong> Dekrementeres med 1 ved hvert hopp. Datagram kastes ved TTL=0. Forhindrer routing-løkker.</li>
                  <li><strong>32-bit Source IP:</strong> IP-adressen til avsenderen</li>
                  <li><strong>32-bit Destination IP:</strong> IP-adressen til mottakeren</li>
                  <li><strong>Data:</strong> Selve nyttelasten (f.eks. et TCP-segment)</li>
                </ul>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">d) Hvordan spesifiseres om datagrammet inneholder UDP eller TCP?</p>
              <Answer>
                <p>Via <strong>Upper-layer protocol</strong>-feltet: 6 = TCP, 17 = UDP. Mottaker bruker dette feltet til å demultiplekse datagrammet til riktig transportlagsprotokoll.</p>
              </Answer>
            </div>
          </div>
          <Laerdom>IPv4-header er eksamensklassiker. Lær alle feltene og spesielt hva fragmenteringsfeltene gjør — sensorveiledningen gir presise svar.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-4" label="Se Oppg 4: IP-protokollen" chapter="Kap 4.3" />
        </div>
      </OppgaveCard>

      {/* Oppgave 5 */}
      <OppgaveCard nummer={5} tittel="Distance Vector Routing — R1, R2, R3, R4" poeng={10}>
        <div className="pt-3 space-y-3">
          <RouterDiagramOppg5 />
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 text-sm">
            <p className="font-semibold mb-1">Nettverksgraf:</p>
            <p>R1—R3: kost 5 | R2—R3: kost 2 | R2—R4: kost 8 | R3—R4: kost 1</p>
          </div>
          <Strategy
            title="Distance Vector: Bellman-Ford"
            checklist={[
              "Initialisering: D_x(y) = c(x,y) om nabo, ∞ ellers, 0 til seg selv",
              "Loop: D_x(y) = min_v{c(x,v) + D_v(y)} for alle v",
              "Beste vei: legg sammen kostnadene langs ruten",
              "Beregn alltid alle mulige veier og velg minimum",
            ]}
          />
          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Billigste vei fra R1 til R4?</p>
              <Hint>R1 har bare én nabo (R3). Deretter kan du gå til R4 direkte via R3.</Hint>
              <Answer>
                <p><strong>R1 → R3 → R4</strong> med total kost <strong>5 + 1 = 6</strong></p>
                <p className="text-xs text-[var(--muted)]">Alternativ: R1→R3→R2→R4 = 5+2+8 = 15 (mye dyrere)</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Initialiser avstandsvektorer for alle fire rutere.</p>
              <Hint>D_x(x)=0, D_x(nabo)=c(x,nabo), D_x(ikke-nabo)=∞</Hint>
              <Answer>
                <div className="space-y-2">
                  <DVTable node="R1" values={{ R1: 0, R2: "∞", R3: 5, R4: "∞" }} />
                  <DVTable node="R2" values={{ R1: "∞", R2: 0, R3: 2, R4: 8 }} />
                  <DVTable node="R3" values={{ R1: 5, R2: 2, R3: 0, R4: 1 }} />
                  <DVTable node="R4" values={{ R1: "∞", R2: 8, R3: 1, R4: 0 }} />
                  <p className="text-xs text-[var(--muted)]">R1 og R2 er ikke naboer (ingen direkte link), så D_R1(R2)=∞.</p>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) R1 har D_R1 = [0, 7, 5, 6] og mottar D_R3 = [5, 2, 0, 1]. Ny D_R1?</p>
              <Hint>Bruk loop-formelen: D_R1(y) = min(D_R1(y), c(R1,R3) + D_R3(y)). c(R1,R3)=5.</Hint>
              <Answer>
                <div className="space-y-1">
                  <p>c(R1,R3) = 5. Bellman-Ford for hvert mål y:</p>
                  <p>R1: min(0, 5+5=10) = <strong>0</strong></p>
                  <p>R2: min(7, 5+2=7) = <strong>7</strong></p>
                  <p>R3: min(5, 5+0=5) = <strong>5</strong></p>
                  <p>R4: min(6, 5+1=6) = <strong>6</strong></p>
                  <DVTable node="R1" values={{ R1: 0, R2: 7, R3: 5, R4: 6 }} />
                  <p className="text-xs text-[var(--muted)]">Ingen endring — vektoren er allerede konvergert.</p>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">d) R4 har D_R4 = [6, 3, 1, 0] og mottar D_R2=[7,0,2,3] og D_R3=[5,2,0,1]. Ny D_R4?</p>
              <Hint>R4s naboer er R2 (kost 8) og R3 (kost 1). Beregn via begge naboer og ta minimum.</Hint>
              <Answer>
                <div className="space-y-1">
                  <p>Via R2 (c=8): R1=8+7=15, R2=8+0=8, R3=8+2=10, R4=8+3=11</p>
                  <p>Via R3 (c=1): R1=1+5=6, R2=1+2=3, R3=1+0=1, R4=1+1=2</p>
                  <p>D_R4(y) = min av begge og nåværende verdi:</p>
                  <DVTable node="R4" values={{ R1: 6, R2: 3, R3: 1, R4: 0 }} />
                  <p className="text-xs text-[var(--muted)]">Ingen endring fra forrige iterasjon.</p>
                </div>
              </Answer>
            </div>
          </div>
          <Laerdom>DVR er en fast oppgave. Lær Bellman-Ford-ligningen utenat: D_x(y) = min_v&#123;c(x,v) + D_v(y)&#125;. Initialiser alltid riktig først.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-5" label="Se Oppg 5: Ruting" chapter="Kap 5.2" />
        </div>
      </OppgaveCard>

      {/* Oppgave 6 */}
      <OppgaveCard nummer={6} tittel="ARP, svitsjtabell, CIDR og IP-binærkonvertering" poeng={10}>
        <div className="pt-3 space-y-3">
          <SwitchDiagramOppg6 />
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 text-sm space-y-1">
            <p>H1: 192.168.0.1 / 1A:1B:1C:1D:1E:1F — port 3</p>
            <p>H2: 192.168.0.2 / 2A:2B:2C:2D:2E:2F — port 2</p>
            <p>H3: 192.168.0.3 / 3A:3B:3C:3D:3E:3F — port 1</p>
          </div>
          <Strategy
            title="ARP + svitsj: følg pakken steg for steg"
            checklist={[
              "ARP-tabell: lagres på AVSENDER-host etter ARP-prosessen",
              "Svitsjtabell: læres av svitsjen fra innkommende frames (kildemaske)",
              "CIDR /22: 32−22=10 host-bits → 2¹⁰=1024 adresser",
              "IP til binær: konverter hvert oktet separat (0–255 → 8 bit)",
            ]}
          />
          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Innholdet i ARP-tabellen på H1 etter at et IP-datagram er sendt fra H1 til H3?</p>
              <Hint>H1 må bruke ARP for å finne MAC-adressen til H3 (siden de er på samme LAN). Hva lærer H1 av ARP-svaret?</Hint>
              <Answer>
                <div className="overflow-x-auto">
                  <table className="text-xs border-collapse w-full max-w-xs">
                    <thead>
                      <tr className="bg-blue-50 dark:bg-blue-900/30">
                        <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">IP-adresse</th>
                        <th className="border border-blue-200 dark:border-blue-700 px-3 py-1">MAC-adresse</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono">192.168.0.3</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono">3A:3B:3C:3D:3E:3F</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">H1 sender ARP broadcast, H3 svarer med sin MAC. H1 cacher IP↔MAC for H3.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Innholdet i svitsjtabellen etter at et datagram er sendt fra H1 til H3?</p>
              <Hint>Svitsjen lærer kildeadressen på innkommende frames. ARP-broadcast kommer inn på port 3 (fra H1), svaret fra H3 kommer inn på port 1.</Hint>
              <Answer>
                <div className="overflow-x-auto">
                  <table className="text-xs border-collapse w-full max-w-xs">
                    <thead>
                      <tr className="bg-purple-50 dark:bg-purple-900/30">
                        <th className="border border-purple-200 dark:border-purple-700 px-3 py-1">MAC-adresse</th>
                        <th className="border border-purple-200 dark:border-purple-700 px-3 py-1">Grensesnitt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono">1A:1B:1C:1D:1E:1F</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">3</td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono">3A:3B:3C:3D:3E:3F</td>
                        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">H2 sendte aldri noe, så 2A:... er ikke i tabellen.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) CIDR-blokk 224.192.40.0/22 — hvilke adresser?</p>
              <Hint>22 nettverksbits → 32−22=10 host-bits. Start: alle host-bits=0, Slutt: alle host-bits=1.</Hint>
              <Answer>
                <p>224.192.40.0 i binær: <code className="text-xs">11100000 11000000 00101000 00000000</code></p>
                <p>22 nettverksbits → de første 22 bitene er fast.</p>
                <p>Startadresse: 224.192.40.0 (host-bits = alle 0)</p>
                <p>Sluttadresse: 224.192.43.255 (host-bits = alle 1: 10 bits → 00/01/10/11 i tredje oktet → .43.255)</p>
                <p className="font-bold mt-1">Intervall: 224.192.40.0 — 224.192.43.255 (1024 adresser)</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">d) 32-bit mønster for 200.193.57.14?</p>
              <Hint>Konverter hvert oktet til 8 bits. 200=11001000, 193=11000001, 57=00111001, 14=00001110</Hint>
              <Answer>
                <p className="font-mono text-xs">11001000 11000001 00111001 00001110</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">e) Videresendingstabell — ved hvilket grensesnitt sendes 200.193.42.10, 200.193.57.14, 10.53.40.7?</p>
              <div className="overflow-x-auto mt-1">
                <table className="text-xs border-collapse w-full">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-800">
                      <th className="border border-neutral-200 dark:border-neutral-700 px-3 py-1">Destinasjon (binær prefix)</th>
                      <th className="border border-neutral-200 dark:border-neutral-700 px-3 py-1">Grensesnitt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono text-xs">11001000 11000001 001010</td><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">1</td></tr>
                    <tr><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono text-xs">11001000 11000001 001111</td><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">2</td></tr>
                    <tr><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-mono text-xs">00101000 00110101 0010100</td><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">3</td></tr>
                    <tr><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1">otherwise</td><td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center">4</td></tr>
                  </tbody>
                </table>
              </div>
              <Hint>Konverter destinasjonsadressen til binær og se om de første bitene matcher prefikset i tabellen.</Hint>
              <Answer>
                <div className="space-y-2">
                  <p><strong>200.193.42.10</strong> = 11001000 11000001 00101010 00001010</p>
                  <p>Matcher prefix 1: <span className="font-mono text-xs">11001000 11000001 001010</span> → <strong>Grensesnitt 1</strong></p>
                  <hr className="border-neutral-200 dark:border-neutral-700" />
                  <p><strong>200.193.57.14</strong> = 11001000 11000001 00111001 00001110</p>
                  <p>Matcher ingen av prefiksene → <strong>Grensesnitt 4 (otherwise)</strong></p>
                  <hr className="border-neutral-200 dark:border-neutral-700" />
                  <p><strong>10.53.40.7</strong> = 00001010 00110101 00101000 00000111</p>
                  <p>Matcher ingen av prefiksene → <strong>Grensesnitt 4 (otherwise)</strong></p>
                </div>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 6 kombinerer ARP, svitsj og IP-adressering. Øv deg på binærkonvertering og CIDR-beregning — det er poeng som er lette å tape på unøyaktige beregninger.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-6" label="Se Oppg 6: ARP og svitsjer" chapter="Kap 4.3, 6.4" />
        </div>
      </OppgaveCard>

      {/* Oppgave 7 */}
      <OppgaveCard nummer={7} tittel="Distribuerte systemer — Servere og kommunikasjon" poeng={5}>
        <div className="pt-3 space-y-3">
          <Strategy
            title="Korte definisjoner — vær presis"
            checklist={[
              "Tilstandsfull: husker klientinfo mellom forespørsler",
              "Tilstandsløs: husker ingenting, behandler hver forespørsel selvstendig",
              "Synkron: sender blokkerer til svar er mottatt",
              "Asynkron: sender fortsetter umiddelbart etter sending",
            ]}
          />
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Forskjellen mellom tilstandsfull og tilstandsløs server?</p>
              <Answer>
                <p><strong>Tilstandsfull server</strong> lagrer persistent informasjon om klienter mellom forespørsler (f.eks. hvem som er logget inn, sesjoner).</p>
                <p className="mt-1"><strong>Tilstandsløs server</strong> lagrer ingen klientinformasjon. Kan endre sin egen tilstand uten å informere klienter. Enklere å skalere og mer feiltolerante.</p>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Forskjellen mellom synkron og asynkron kommunikasjon?</p>
              <Answer>
                <p><strong>Synkron kommunikasjon:</strong> Avsenderen blokkeres inntil forespørselen er kjent å ha blitt akseptert. Venter på bekreftelse.</p>
                <p className="mt-1"><strong>Asynkron kommunikasjon:</strong> Avsenderen fortsetter umiddelbart (blokkeres ikke) etter å ha sendt meldingen for overføring. Svar mottas eventuelt senere.</p>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 7 er typisk 2 korte definisjonsspørsmål fra DS-boken. Hold svarene konsise — 2–3 setninger er nok.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-7" label="Se Oppg 7: Distribuerte systemer" />
        </div>
      </OppgaveCard>

      {/* Oppgave 8 */}
      <OppgaveCard nummer={8} tittel="Overleggsnettverk og multicast — RDP og trekostnader" poeng={10}>
        <div className="pt-3 space-y-3">
          <OverlayDiagramOppg8 />
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 text-sm space-y-1">
            <p className="font-semibold">Fysiske routerkostnader:</p>
            <p>Ra—Rb: 5 | Rb—Rc: 10 | Rc—Rd: 5 | Re—Rd: 5 | Ra—Re: 40</p>
            <p>Prosess—router: A→Ra: 1, B→Rb: 1, C→Rc: 1, D→Rd: 1, E→Re: 1</p>
          </div>
          <Strategy
            title="Overlay: beregn minste forsinkelse mellom prosesser"
            checklist={[
              "Finn minste fysiske vei mellom alle par av prosesser",
              "E = N(N-1)/2 kanter i fullt koblet overlay (N=5 → 10 kanter)",
              "RDP = overlay_cost / physical_best_cost",
              "Trekostnad = sum av alle kanter i treet",
            ]}
          />
          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Tegn fullt koblet overlay-graf med minste forsinkelser mellom prosessene.</p>
              <Hint>Beregn korteste vei mellom hvert par. A–B: A→Ra→Rb→B = 1+5+1=7. A–D: A→Ra→Rb→Rc→Rd→D = 1+5+10+5+1=22.</Hint>
              <Answer>
                <div className="overflow-x-auto">
                  <table className="text-xs border-collapse">
                    <thead>
                      <tr className="bg-blue-50 dark:bg-blue-900/30">
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">Par</th>
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">Rute</th>
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">Kost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { pair: "A–B", route: "A→Ra→Rb→B", cost: 7 },
                        { pair: "A–C", route: "A→Ra→Rb→Rc→C", cost: 17 },
                        { pair: "A–D", route: "A→Ra→Rb→Rc→Rd→D", cost: 22 },
                        { pair: "A–E", route: "A→Ra→Rb→Rc→Rd→Re→E (eller Ra→Re)", cost: 27 },
                        { pair: "B–C", route: "B→Rb→Rc→C", cost: 12 },
                        { pair: "B–D", route: "B→Rb→Rc→Rd→D", cost: 17 },
                        { pair: "B–E", route: "B→Rb→Rc→Rd→Re→E", cost: 22 },
                        { pair: "C–D", route: "C→Rc→Rd→D", cost: 7 },
                        { pair: "C–E", route: "C→Rc→Rd→Re→E", cost: 12 },
                        { pair: "D–E", route: "D→Rd→Re→E", cost: 7 },
                      ].map(({ pair, route, cost }) => (
                        <tr key={pair} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                          <td className="border border-neutral-200 dark:border-neutral-700 px-2 py-1 font-semibold">{pair}</td>
                          <td className="border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-xs">{route}</td>
                          <td className="border border-neutral-200 dark:border-neutral-700 px-2 py-1 text-center font-bold">{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) RDP fra A til D med Tree1 (A–E–D–B–C) og Tree2 (A–B–C–E–D)?</p>
              <Hint>RDP = overlay-kostnad for A→D via treet / beste fysiske kostnad fra A til D direkte.</Hint>
              <Answer>
                <div className="space-y-2">
                  <p><strong>Beste fysiske vei A→D</strong> = A→Ra→Rb→Rc→Rd→D = <strong>22</strong></p>
                  <p><strong>Tree 1: A–E–D–B–C</strong></p>
                  <p>A→D via Tree1: A→E (27) + E→D (7) = 34</p>
                  <p>RDP₁ = 34/22 = <strong>1,54</strong></p>
                  <p><strong>Tree 2: A–B–C–E–D</strong></p>
                  <p>A→D via Tree2: A→B (7) + B→C (12) + C→E (12) + E→D (7) = 38</p>
                  <p>RDP₂ = 38/22 = <strong>1,73</strong></p>
                  <p className="mt-1 font-bold text-green-700 dark:text-green-400">Tree 1 er mer effektivt (lavere RDP = nærmere fysisk rute).</p>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) Trekostnader for Tree1 og Tree2. Hvilket tre er mest effektivt for gruppemeldinger?</p>
              <Answer>
                <div className="space-y-1">
                  <p><strong>Tree 1 (A–E–D–B–C):</strong></p>
                  <p>A–E=27, E–D=7, D–B=17, B–C=12 → Trekostnad = 27+7+17+12 = <strong>63</strong></p>
                  <p><strong>Tree 2 (A–B–C–E–D):</strong></p>
                  <p>A–B=7, B–C=12, C–E=12, E–D=7 → Trekostnad = 7+12+12+7 = <strong>38</strong></p>
                  <p className="mt-1 font-bold text-green-700 dark:text-green-400">Tree 2 er mer effektivt for gruppemeldinger (lavere trekostnad = lavere total overhead).</p>
                  <p className="text-xs text-[var(--muted)] mt-1">OBS: RDP og trekostnad gir ulike svar — avhengig av spørsmålet!</p>
                </div>
              </Answer>
            </div>
          </div>
          <Laerdom>Skillet mellom RDP (effektivitet for ett par) og trekostnad (effektivitet for alle i gruppen) er viktig. Les spørsmålet nøye for å velge riktig metrikk.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-8" label="Se Oppg 8: Multicast og overlay" />
        </div>
      </OppgaveCard>

      {/* Oppgave 9 */}
      <OppgaveCard nummer={9} tittel="Feil i RPC, konsistens og hierarkisk feedback" poeng={10}>
        <div className="pt-3 space-y-3">
          <Strategy
            title="DS-teori: lær klassene og definisjonene"
            checklist={[
              "5 RPC-feilklasser: husk årsak og hva klienten opplever",
              "Hierarkisk feedback: koordinatorer i subgrupper",
              "Data-sentrisk vs. klient-sentrisk konsistens: scope er forskjellig",
            ]}
          />
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Hierarkisk tilbakemeldingskontroll i pålitelig gruppe-multicast?</p>
              <Answer>
                <div className="space-y-1">
                  <p>For svært store mottakergrupper er sentralisert tilbakemelding ikke skalerbart. Hierarkisk kontroll løser dette:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Mottakerne deles inn i <strong>subgrupper</strong> organisert i et tre</li>
                    <li>Hver subgruppe velger en <strong>lokal koordinator C</strong></li>
                    <li>C håndterer retransmisjonsforespørsler innen sin subgruppe</li>
                    <li>Koordinatorer kommuniserer med hverandre (ACK/NACK), ikke alle individuelle noder</li>
                    <li>Resultatet: dramatisk færre tilbakemeldingsmeldinger til senderen</li>
                  </ul>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) De fem feilklassene i RPC-systemer?</p>
              <Hint>Tenk på hvert steg: finn server, send forespørsel, server behandler, svar returneres, klient mottar.</Hint>
              <Answer>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Klienten kan ikke <strong>lokalisere serveren</strong> — ingen forespørsel sendes</li>
                  <li>Klientens <strong>forespørsel går tapt</strong> — ingen respons fra serveren</li>
                  <li>Serveren <strong>krasjer etter mottak</strong> — tjenesten starter men fullføres ikke</li>
                  <li>Serverens <strong>svar går tapt</strong> — tjeneste er fullført, men klienten vet ikke</li>
                  <li>Klienten <strong>krasjer etter sending</strong> — serveren sender svar til en klient som ikke venter</li>
                </ol>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) Datasentrisk vs. klientsentrisk konsistens?</p>
              <Answer>
                <p><strong>Datasentrisk konsistens</strong> opprettholder konsistens for <em>alle</em> replikaer i datalageret systemomfattende, uavhengig av enkeltklieneter. Eksempel: sekvensielt konsistent lager.</p>
                <p className="mt-1"><strong>Klientsentrisk konsistens</strong> garanterer konsistens for <em>én enkelt klient</em> som beveger seg mellom replikaer. Eksempel: monoton lesekonsistens (klient ser aldri "eldre" data enn sist leste).</p>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 9 er ren DS-teori. De fem RPC-feilklassene er eksamensklassiker — lær dem som en liste.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-9" label="Se Oppg 9: RPC og konsistens" />
        </div>
      </OppgaveCard>

      {/* Oppgave 10 */}
      <OppgaveCard nummer={10} tittel="ChordDHT — Fingertabeller, nøkkellokalisering og oppslag" poeng={15}>
        <div className="pt-3 space-y-3">
          <ChordRingOppg10 />
          <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 text-sm space-y-1">
            <p><strong>Ring:</strong> m=5 bit → ring mod 32 (0–31)</p>
            <p><strong>Noder:</strong> 3, 12, 21, 31</p>
            <p><strong>Formler:</strong> succ(n+2^(i-1)) for i=1..5</p>
          </div>
          <Strategy
            title="ChordDHT: systematisk fremgangsmåte"
            checklist={[
              "Beregn n+2^(i-1) for i=1,2,3,4,5 (bruk mod 32 om nødvendig)",
              "succ(k) = første node ≥ k i ringen (med wrap-around)",
              "Nøkkelansvar: pred(server) < key ≤ server",
              "Oppslag: start fra node, sjekk om succ(n) ≥ key, ellers hopp via fingertabell",
            ]}
          />
          <div className="space-y-4 text-sm">
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">a) Beregn fingertabellene for alle fire noder.</p>
              <Hint>succ(k) = minste node-ID ≥ k. Nodene er 3, 12, 21, 31. Husk mod 32 for n+2^(i-1) ≥ 32.</Hint>
              <Answer>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-1 text-green-700 dark:text-green-400">Node 3:</p>
                    <p className="text-xs text-[var(--muted)] mb-1">i=1: succ(4)=12 | i=2: succ(5)=12 | i=3: succ(7)=12 | i=4: succ(11)=12 | i=5: succ(19)=21</p>
                    <FingerTable node={3} entries={[12, 12, 12, 12, 21]} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-green-700 dark:text-green-400">Node 12:</p>
                    <p className="text-xs text-[var(--muted)] mb-1">i=1: succ(13)=21 | i=2: succ(14)=21 | i=3: succ(16)=21 | i=4: succ(20)=21 | i=5: succ(28)=31</p>
                    <FingerTable node={12} entries={[21, 21, 21, 21, 31]} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-green-700 dark:text-green-400">Node 21:</p>
                    <p className="text-xs text-[var(--muted)] mb-1">i=1: succ(22)=31 | i=2: succ(23)=31 | i=3: succ(25)=31 | i=4: succ(29)=31 | i=5: succ(37 mod 32=5)=12</p>
                    <FingerTable node={21} entries={[31, 31, 31, 31, 12]} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-green-700 dark:text-green-400">Node 31:</p>
                    <p className="text-xs text-[var(--muted)] mb-1">i=1: succ(32 mod 32=0)=3 | i=2: succ(33 mod 32=1)=3 | i=3: succ(35 mod 32=3)=3 | i=4: succ(39 mod 32=7)=12 | i=5: succ(47 mod 32=15)=21</p>
                    <FingerTable node={31} entries={[3, 3, 3, 12, 21]} />
                  </div>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">b) Fil replisert 4 ganger med nøkler &#123;6, 9, 15, 29&#125;. Hvilke noder er ansvarlige?</p>
              <Formula label="Regel" formula="pred(server) < key ≤ server" />
              <Hint>For hver nøkkel: finn første node ≥ nøkkelen i ringen.</Hint>
              <Answer>
                <div className="overflow-x-auto">
                  <table className="text-xs border-collapse">
                    <thead>
                      <tr className="bg-green-50 dark:bg-green-900/30">
                        <th className="border border-green-200 dark:border-green-700 px-3 py-1">Nøkkel</th>
                        <th className="border border-green-200 dark:border-green-700 px-3 py-1">Ansvarlig node</th>
                        <th className="border border-green-200 dark:border-green-700 px-3 py-1">Begrunnelse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { key: 6, node: 12, reason: "3 < 6 ≤ 12" },
                        { key: 9, node: 12, reason: "3 < 9 ≤ 12" },
                        { key: 15, node: 21, reason: "12 < 15 ≤ 21" },
                        { key: 29, node: 31, reason: "21 < 29 ≤ 31" },
                      ].map(({ key, node, reason }) => (
                        <tr key={key} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                          <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 font-bold text-center">{key}</td>
                          <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-center font-bold text-green-700 dark:text-green-400">{node}</td>
                          <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs">{reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">c) Finn filen med nøkkel=15 fra node 31. Vis stegene.</p>
              <Hint>Steg 1: Er k mellom n og succ(n)? Steg 2: Nei → finn nærmeste forgjenger til k i fingertabellen, start på bunnen.</Hint>
              <Answer>
                <div className="space-y-2">
                  <p><strong>Runde 1 — start på node 31:</strong></p>
                  <p>n=31, k=15, succ(31)=3</p>
                  <p>Er 31 &lt; 15 ≤ 3? NEI (med wrap: 31→3 wrapper, 15 er ikke i dette intervallet). Gå til Steg 2.</p>
                  <p>Steg 2: Let fra bunnen av finger[31]:</p>
                  <p>finger[5]=21: Er 31 &lt; 21 &lt; 15? NEI</p>
                  <p>finger[4]=12: Er 31 &lt; 12 &lt; 15? JA → returner 12 som nytt oppslagsnode</p>
                  <hr className="border-neutral-200 dark:border-neutral-700" />
                  <p><strong>Runde 2 — på node 12:</strong></p>
                  <p>n=12, k=15, succ(12)=21</p>
                  <p>Er 12 &lt; 15 ≤ 21? JA → <strong>Node 21 lagrer nøkkel=15</strong></p>
                </div>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">d) Hvorfor replikere servere og filer i ChordDHT?</p>
              <Answer>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Feiltoleranse:</strong> Om én node feiler, kan en annen node ta over</li>
                  <li><strong>Tilgjengelighet:</strong> Data er tilgjengelig selv under nodesvikt</li>
                  <li><strong>Ytelse:</strong> Forespørsler kan rutes til nærmeste replika</li>
                  <li><strong>Skalerbarhet:</strong> Distribuerer last over flere noder</li>
                </ul>
              </Answer>
            </div>
            <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-2">
              <p className="font-semibold">e) Hva er formålet med fingertabellen i ChordDHT?</p>
              <Answer>
                <p>Fingertabellen gir <strong>skalerbart oppslag i O(log n) tid</strong>. I stedet for å spørre alle noder sekvensielt, lagrer fingertabellen noder som er eksponentielt langt unna (2¹, 2², ..., 2^m), slik at hvert hopp halverer søkerommet. Uten fingertabell ville oppslag ta O(n) hopp.</p>
              </Answer>
            </div>
          </div>
          <Laerdom>Oppgave 10 (15 %) er den tyngste oppgaven. Øv fingertabell-beregning til du kan gjøre det automatisk. Husk alltid mod 32 (2^m) og at succ() er første node ≥ k.</Laerdom>
          <OppgaveLink href="/dat110/eksamenoving/oppg-10" label="Se Oppg 10: ChordDHT" />
        </div>
      </OppgaveCard>

    </div>
  );
}

// ─── Kortversjon for andre år ─────────────────────────────────────────────

function EksamenPlaceholder({ year }: { year: string }) {
  return (
    <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-[var(--muted)] text-sm space-y-2">
      <p className="font-semibold text-base">Eksamen {year}</p>
      <p>Detaljert gjennomgang kommer. I mellomtiden: strukturen er svært lik Jan 2025.</p>
      <p className="text-xs">Oppg 1: Canvas-quiz | Oppg 2: Oblig | Oppg 3: Forsinkelse | Oppg 4: IP | Oppg 5: Ruting | Oppg 6: ARP/CIDR | Oppg 7: DS-teori | Oppg 8: Overlay | Oppg 9: RPC/konsistens | Oppg 10: ChordDHT</p>
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <Link
            key={n}
            href={`/dat110/eksamenoving/oppg-${n}`}
            className="text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 transition-colors"
          >
            Oppg {n}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Hoved-side ───────────────────────────────────────────────────────────

const EXAMS = [
  { id: "jan2025", label: "Jan 2025", badge: "Nyeste" },
  { id: "mai2024", label: "Mai 2024", badge: null },
  { id: "jan2024", label: "Jan 2024", badge: null },
  { id: "mai2022", label: "Mai 2022", badge: null },
];

export default function EksamensoppgaverPage() {
  const [activeExam, setActiveExam] = useState("jan2025");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--foreground)] transition-colors">DAT110</Link>
        <span>/</span>
        <Link href="/dat110/eksamenoving" className="hover:text-[var(--foreground)] transition-colors">Eksamensøving</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">Eksamensoppgaver</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-bold tracking-wide uppercase">
            DAT110
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
            Alle eksamener 2022–2025
          </span>
        </div>
        <h1 className="text-3xl font-bold">Eksamensoppgaver — Fullstendige gjennomganger</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Komplette gjennomganger av alle oppgaver fra DAT110-eksamenene 2022–2025.
          Velg eksamenår under, les oppgaveteksten, og bruk hint og løsninger steg for steg.
          Jan 2025 er den mest detaljerte gjennomgangen.
        </p>
        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            { label: "Eksamener", val: "4" },
            { label: "Oppgaver per eksamen", val: "10" },
            { label: "Strategibokser", val: "10+" },
            { label: "SVG-diagrammer", val: "6" },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="font-bold text-rose-600 dark:text-rose-400">{val}</span>
              <span className="text-[var(--muted)]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* År-velger */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
        <p className="text-sm font-semibold text-[var(--muted)]">Velg eksamen:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMS.map(({ id, label, badge }) => (
            <div key={id} className="relative">
              <ExamTab label={label} active={activeExam === id} onClick={() => setActiveExam(id)} />
              {badge && (
                <span className="absolute -top-2 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-900 leading-none">
                  {badge}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">
          Alle eksamenene har 10 oppgaver med samme struktur. Oppgave 1 er Canvas-quiz, oppgave 2 er obligrelatert, oppgavene 3–6 er nettverksteknologi, 7–9 er distribuerte systemer og oppgave 10 er alltid ChordDHT (15 %).
        </p>
      </div>

      {/* Innhold basert på valgt år */}
      {activeExam === "jan2025" && <Eksamen2025Jan />}
      {activeExam === "mai2024" && <EksamenPlaceholder year="Mai 2024" />}
      {activeExam === "jan2024" && <EksamenPlaceholder year="Jan 2024" />}
      {activeExam === "mai2022" && <EksamenPlaceholder year="Mai 2022" />}

      {/* Generell eksamensstrategi */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/20 p-5 space-y-3">
        <h2 className="font-bold text-amber-800 dark:text-amber-400">Generell eksamensstrategi for DAT110</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-amber-800 dark:text-amber-300">
          {[
            { title: "Oppg 1 (10%)", desc: "Canvas-quiz: repeter quizene, lær definisjoner utenat" },
            { title: "Oppg 2 (10%)", desc: "Oblig-relatert: kjenn prosjektarkitekturen og protokollene" },
            { title: "Oppg 3 (10%)", desc: "Forsinkelse: lær alle 4 komponenter, øv på utregning" },
            { title: "Oppg 4 (10%)", desc: "IPv4-header: lær alle felt og fragmenteringsprosessen" },
            { title: "Oppg 5 (10%)", desc: "DVR: øv Bellman-Ford til du kan gjøre det automatisk" },
            { title: "Oppg 6 (10%)", desc: "ARP/CIDR: øv binærkonvertering og nettverksberegning" },
            { title: "Oppg 7 (5%)", desc: "DS-teori: korte svar, vær presis med definisjonene" },
            { title: "Oppg 8 (10%)", desc: "Overlay/multicast: husk RDP vs. trekostnad er forskjellig" },
            { title: "Oppg 9 (10%)", desc: "RPC-feil + konsistens: lær de 5 feilklassene utenat" },
            { title: "Oppg 10 (15%)", desc: "ChordDHT: høyest vektet — øv mye, bruk mod 32 alltid" },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-2">
              <span className="font-bold whitespace-nowrap">{title}:</span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lenker til oppgavesider */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3">
        <h2 className="font-bold">Gå til individuelle oppgavesider</h2>
        <p className="text-sm text-[var(--muted)]">Hvert oppgavenummer har en egen side med teori, visualiseringer og øvingsoppgaver fra alle år.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <Link
              key={n}
              href={`/dat110/eksamenoving/oppg-${n}`}
              className="flex items-center justify-center gap-1 py-2 rounded-lg border border-[var(--card-border)] hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors text-sm font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold">{n}</span>
              <span>Oppg {n}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
