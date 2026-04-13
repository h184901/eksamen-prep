"use client";

import { useState, useMemo } from "react";

/* ─── Interactive: 1D Kollisjon ─── */
export function CollisionVisualizer() {
  const [mA, setMA] = useState(2.0);
  const [mB, setMB] = useState(1.0);
  const [vA1, setVA1] = useState(5.0);
  const [vB1, setVB1] = useState(-2.0);
  const [type, setType] = useState<"elastic" | "inelastic">("inelastic");

  const result = useMemo(() => {
    if (type === "inelastic") {
      const v2 = (mA * vA1 + mB * vB1) / (mA + mB);
      const ekBefore = 0.5 * mA * vA1 * vA1 + 0.5 * mB * vB1 * vB1;
      const ekAfter = 0.5 * (mA + mB) * v2 * v2;
      return { vA2: v2, vB2: v2, ekBefore, ekAfter, energyLoss: ekBefore - ekAfter };
    } else {
      const vA2 = ((mA - mB) * vA1 + 2 * mB * vB1) / (mA + mB);
      const vB2 = ((mB - mA) * vB1 + 2 * mA * vA1) / (mA + mB);
      const ekBefore = 0.5 * mA * vA1 * vA1 + 0.5 * mB * vB1 * vB1;
      const ekAfter = 0.5 * mA * vA2 * vA2 + 0.5 * mB * vB2 * vB2;
      return { vA2, vB2, ekBefore, ekAfter, energyLoss: ekBefore - ekAfter };
    }
  }, [mA, mB, vA1, vB1, type]);

  const pBefore = mA * vA1 + mB * vB1;
  const pAfter = type === "inelastic"
    ? (mA + mB) * result.vA2
    : mA * result.vA2 + mB * result.vB2;

  const aXBefore = 80;
  const bXBefore = 260;
  const aRadius = 10 + mA * 3;
  const bRadius = 10 + mB * 3;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">1D Kollisjon — Elastisk vs. Inelastisk</h3>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setType("inelastic")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${type === "inelastic" ? "bg-[var(--accent)] text-white" : "bg-[var(--card-border)] text-[var(--foreground)]"}`}
        >
          Fullstendig inelastisk
        </button>
        <button
          onClick={() => setType("elastic")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${type === "elastic" ? "bg-[var(--accent)] text-white" : "bg-[var(--card-border)] text-[var(--foreground)]"}`}
        >
          Elastisk
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">m<sub>A</sub> (kg)</label>
          <input type="range" min={0.5} max={10} step={0.5} value={mA}
            onChange={(e) => setMA(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mA.toFixed(1)} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">m<sub>B</sub> (kg)</label>
          <input type="range" min={0.5} max={10} step={0.5} value={mB}
            onChange={(e) => setMB(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mB.toFixed(1)} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">v<sub>A</sub> (m/s)</label>
          <input type="range" min={-10} max={10} step={0.5} value={vA1}
            onChange={(e) => setVA1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{vA1.toFixed(1)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">v<sub>B</sub> (m/s)</label>
          <input type="range" min={-10} max={10} step={0.5} value={vB1}
            onChange={(e) => setVB1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{vB1.toFixed(1)} m/s</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <svg viewBox="0 0 360 130" className="w-full max-w-md">
          <line x1="20" y1="90" x2="340" y2="90" stroke="var(--muted)" strokeWidth="1" />
          <text x="170" y="15" fill="var(--muted)" fontSize="10" textAnchor="middle">FØR</text>
          <circle cx={aXBefore} cy={70} r={aRadius} fill="#3b82f6" opacity="0.8" />
          <text x={aXBefore} y={74} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">A</text>
          {Math.abs(vA1) > 0.1 && (
            <line x1={aXBefore + aRadius + 2} y1={70}
              x2={aXBefore + aRadius + 2 + vA1 * 6} y2={70}
              stroke="#ef4444" strokeWidth="2" markerEnd="url(#coll-arrow)" />
          )}
          <circle cx={bXBefore} cy={70} r={bRadius} fill="#f59e0b" opacity="0.8" />
          <text x={bXBefore} y={74} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">B</text>
          {Math.abs(vB1) > 0.1 && (
            <line x1={bXBefore - bRadius - 2} y1={70}
              x2={bXBefore - bRadius - 2 + vB1 * 6} y2={70}
              stroke="#ef4444" strokeWidth="2" markerEnd="url(#coll-arrow)" />
          )}
          <defs>
            <marker id="coll-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L6,2.5 L0,5" fill="#ef4444" />
            </marker>
          </defs>
          <text x="170" y="74" fill="var(--muted)" fontSize="16" textAnchor="middle">💥</text>
          <text x="170" y="115" fill="var(--muted)" fontSize="10" textAnchor="middle">
            {type === "inelastic" ? `ETTER: v = ${result.vA2.toFixed(2)} m/s` : `ETTER: vA = ${result.vA2.toFixed(2)}, vB = ${result.vB2.toFixed(2)} m/s`}
          </text>
        </svg>

        <div className="grid grid-cols-2 gap-3 text-sm w-full max-w-xs">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">p<sub>før</sub></p>
            <p className="font-bold">{pBefore.toFixed(1)} kg·m/s</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">p<sub>etter</sub></p>
            <p className="font-bold">{pAfter.toFixed(1)} kg·m/s</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">E<sub>K,før</sub></p>
            <p className="font-bold">{result.ekBefore.toFixed(1)} J</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">E<sub>K,etter</sub></p>
            <p className="font-bold">{result.ekAfter.toFixed(1)} J</p>
          </div>
          <div className="col-span-2 rounded-lg bg-red-50 dark:bg-red-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Energitap</p>
            <p className="font-bold">{result.energyLoss.toFixed(1)} J ({result.ekBefore > 0 ? ((result.energyLoss / result.ekBefore) * 100).toFixed(0) : 0}%)</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Bevegelsesmengden er alltid bevart (p<sub>før</sub> = p<sub>etter</sub>). Ved elastisk kollisjon er også E<sub>K</sub> bevart. Ved inelastisk går energi tapt til varme/deformasjon.
      </p>
    </div>
  );
}

/* ─── Interactive: Ballistisk pendel ─── */
export function BallisticPendulumVisualizer() {
  const [bulletMass, setBulletMass] = useState(5); // grams
  const [blockMass, setBlockMass] = useState(2.0); // kg
  const [bulletSpeed, setBulletSpeed] = useState(300); // m/s
  const [ropeLength, setRopeLength] = useState(1.5); // m

  const m = bulletMass / 1000; // kg
  const M = blockMass;
  const g = 9.81;

  const V = (m * bulletSpeed) / (m + M);
  const h = (V * V) / (2 * g);
  const maxAngle = Math.acos(Math.max(1 - h / ropeLength, -1));
  const maxAngleDeg = (maxAngle * 180) / Math.PI;

  const ekBullet = 0.5 * m * bulletSpeed * bulletSpeed;
  const ekAfterCollision = 0.5 * (m + M) * V * V;
  const energyLostPercent = ((ekBullet - ekAfterCollision) / ekBullet) * 100;

  const pivotX = 200;
  const pivotY = 20;
  const angleDraw = Math.min(maxAngle, Math.PI / 2);
  const blockX = pivotX + ropeLength * 60 * Math.sin(angleDraw);
  const blockY = pivotY + ropeLength * 60 * Math.cos(angleDraw);
  const blockRestX = pivotX;
  const blockRestY = pivotY + ropeLength * 60;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Ballistisk pendel — Klassisk kombinasjonsoppgave</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Kulemasse (g)</label>
          <input type="range" min={1} max={50} step={1} value={bulletMass}
            onChange={(e) => setBulletMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{bulletMass} g</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Klossmasse (kg)</label>
          <input type="range" min={0.5} max={10} step={0.5} value={blockMass}
            onChange={(e) => setBlockMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{blockMass.toFixed(1)} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Kulefart (m/s)</label>
          <input type="range" min={50} max={800} step={10} value={bulletSpeed}
            onChange={(e) => setBulletSpeed(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{bulletSpeed} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Taulengde (m)</label>
          <input type="range" min={0.5} max={3} step={0.1} value={ropeLength}
            onChange={(e) => setRopeLength(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{ropeLength.toFixed(1)} m</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <svg viewBox="0 0 360 160" className="w-full max-w-sm">
          <line x1="140" y1={pivotY} x2="260" y2={pivotY} stroke="var(--muted)" strokeWidth="2" />
          <line x1="140" y1={pivotY} x2="140" y2={pivotY - 5} stroke="var(--muted)" strokeWidth="1" />
          <line x1="260" y1={pivotY} x2="260" y2={pivotY - 5} stroke="var(--muted)" strokeWidth="1" />
          <line x1={blockRestX} y1={pivotY} x2={blockRestX} y2={blockRestY}
            stroke="var(--muted)" strokeWidth="1" strokeDasharray="3" opacity="0.4" />
          <rect x={blockRestX - 12} y={blockRestY - 8} width={24} height={16}
            fill="var(--muted)" opacity="0.2" rx="2" />
          <line x1={pivotX} y1={pivotY} x2={blockX} y2={blockY}
            stroke="var(--foreground)" strokeWidth="1.5" />
          <rect x={blockX - 12} y={blockY - 8} width={24} height={16}
            fill="#f59e0b" rx="2" />
          <line x1="30" y1={blockRestY} x2={blockRestX - 20} y2={blockRestY}
            stroke="#ef4444" strokeWidth="2" markerEnd="url(#bp-arrow)" />
          <circle cx="30" cy={blockRestY} r="3" fill="#ef4444" />
          <text x="30" y={blockRestY + 15} fill="#ef4444" fontSize="8" textAnchor="middle">kule</text>
          {h > 0.01 && (
            <>
              <line x1={blockX + 20} y1={blockY} x2={blockX + 20} y2={blockRestY}
                stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
              <text x={blockX + 30} y={(blockY + blockRestY) / 2 + 3}
                fill="#3b82f6" fontSize="9" textAnchor="start">h</text>
            </>
          )}
          {maxAngleDeg > 1 && (
            <path
              d={`M ${pivotX} ${pivotY + 25} A 25 25 0 0 1 ${pivotX + 25 * Math.sin(angleDraw)} ${pivotY + 25 * Math.cos(angleDraw)}`}
              fill="none" stroke="#10b981" strokeWidth="1" />
          )}
          {maxAngleDeg > 1 && (
            <text x={pivotX + 15} y={pivotY + 40} fill="#10b981" fontSize="8">
              {maxAngleDeg.toFixed(1)}°
            </text>
          )}
          <defs>
            <marker id="bp-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L6,2.5 L0,5" fill="#ef4444" />
            </marker>
          </defs>
        </svg>

        <div className="grid grid-cols-2 gap-3 text-sm w-full max-w-xs">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">V etter støt</p>
            <p className="font-bold">{V.toFixed(2)} m/s</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Maks høyde h</p>
            <p className="font-bold">{h < 100 ? h.toFixed(3) : h.toFixed(1)} m</p>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Maks vinkel</p>
            <p className="font-bold">{maxAngleDeg.toFixed(1)}°</p>
          </div>
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Energitap</p>
            <p className="font-bold">{energyLostPercent.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[var(--card-border)] p-4 text-sm">
        <p className="font-semibold mb-1">Hvorfor to steg?</p>
        <p><strong>Steg 1 (støtet):</strong> Bevegelsesmengde er bevart, men energi er IKKE bevart → bruk p-bevaring.</p>
        <p><strong>Steg 2 (svinget):</strong> Energi ER bevart (ingen friksjon), men bevegelsesmengde er IKKE bevart (snorkraft!) → bruk energibevaring.</p>
      </div>
    </div>
  );
}

/* ─── Interactive: Kraftimpuls ─── */
export function ImpulseVisualizer() {
  const [mass, setMass] = useState(0.4);
  const [v1, setV1] = useState(30);
  const [v2, setV2] = useState(-20);
  const [dt, setDt] = useState(0.01);

  const impulse = mass * v2 - mass * v1;
  const avgForce = impulse / dt;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Kraftimpuls — Ball mot vegg</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse (kg)</label>
          <input type="range" min={0.1} max={2} step={0.05} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{mass.toFixed(2)} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">v<sub>før</sub> (m/s)</label>
          <input type="range" min={0} max={50} step={1} value={v1}
            onChange={(e) => setV1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{v1} m/s →</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">v<sub>etter</sub> (m/s, negativt = tilbake)</label>
          <input type="range" min={-50} max={0} step={1} value={v2}
            onChange={(e) => setV2(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">← {Math.abs(v2)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Kontakttid Δt (s)</label>
          <input type="range" min={0.001} max={0.5} step={0.001} value={dt}
            onChange={(e) => setDt(Number(e.target.value))}
            className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{dt.toFixed(3)} s</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4">
          <p className="text-sm text-[var(--muted)]">Kraftimpuls J</p>
          <p className="text-xl font-bold">{impulse.toFixed(1)} N·s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-sm text-[var(--muted)]">Gjennomsnittlig kraft F̄</p>
          <p className="text-xl font-bold">{Math.abs(avgForce) > 1000 ? (avgForce / 1000).toFixed(1) + " kN" : avgForce.toFixed(0) + " N"}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4">
          <p className="text-sm text-[var(--muted)]">Δp = p₂ − p₁</p>
          <p className="text-xl font-bold">{impulse.toFixed(1)} N·s</p>
          <p className="text-xs text-[var(--muted)] mt-1">J = Δp ✓</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Kortere kontakttid → større kraft! Prøv å øke Δt og se hvordan kraften synker.
      </p>
    </div>
  );
}
