"use client";

import { useState, useMemo } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 8)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: 1D Kollisjon ─── */
function CollisionVisualizer() {
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

  // Positions for SVG
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
          {/* Ground */}
          <line x1="20" y1="90" x2="340" y2="90" stroke="var(--muted)" strokeWidth="1" />
          {/* Before label */}
          <text x="170" y="15" fill="var(--muted)" fontSize="10" textAnchor="middle">FØR</text>
          {/* Object A */}
          <circle cx={aXBefore} cy={70} r={aRadius} fill="#3b82f6" opacity="0.8" />
          <text x={aXBefore} y={74} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">A</text>
          {/* A velocity arrow */}
          {Math.abs(vA1) > 0.1 && (
            <line x1={aXBefore + aRadius + 2} y1={70}
              x2={aXBefore + aRadius + 2 + vA1 * 6} y2={70}
              stroke="#ef4444" strokeWidth="2" markerEnd="url(#coll-arrow)" />
          )}
          {/* Object B */}
          <circle cx={bXBefore} cy={70} r={bRadius} fill="#f59e0b" opacity="0.8" />
          <text x={bXBefore} y={74} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">B</text>
          {/* B velocity arrow */}
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
          {/* Collision symbol */}
          <text x="170" y="74" fill="var(--muted)" fontSize="16" textAnchor="middle">💥</text>
          {/* After label */}
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
function BallisticPendulumVisualizer() {
  const [bulletMass, setBulletMass] = useState(5); // grams
  const [blockMass, setBlockMass] = useState(2.0); // kg
  const [bulletSpeed, setBulletSpeed] = useState(300); // m/s
  const [ropeLength, setRopeLength] = useState(1.5); // m

  const m = bulletMass / 1000; // kg
  const M = blockMass;
  const g = 9.81;

  // Step 1: Conservation of momentum (inelastic collision)
  const V = (m * bulletSpeed) / (m + M);
  // Step 2: Conservation of energy (pendulum swing)
  const h = (V * V) / (2 * g);
  const maxAngle = Math.acos(Math.max(1 - h / ropeLength, -1));
  const maxAngleDeg = (maxAngle * 180) / Math.PI;

  // Energies
  const ekBullet = 0.5 * m * bulletSpeed * bulletSpeed;
  const ekAfterCollision = 0.5 * (m + M) * V * V;
  const energyLostPercent = ((ekBullet - ekAfterCollision) / ekBullet) * 100;

  // Pendulum SVG
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
          {/* Ceiling */}
          <line x1="140" y1={pivotY} x2="260" y2={pivotY} stroke="var(--muted)" strokeWidth="2" />
          <line x1="140" y1={pivotY} x2="140" y2={pivotY - 5} stroke="var(--muted)" strokeWidth="1" />
          <line x1="260" y1={pivotY} x2="260" y2={pivotY - 5} stroke="var(--muted)" strokeWidth="1" />
          {/* Rest rope */}
          <line x1={blockRestX} y1={pivotY} x2={blockRestX} y2={blockRestY}
            stroke="var(--muted)" strokeWidth="1" strokeDasharray="3" opacity="0.4" />
          {/* Rest block */}
          <rect x={blockRestX - 12} y={blockRestY - 8} width={24} height={16}
            fill="var(--muted)" opacity="0.2" rx="2" />
          {/* Swing rope */}
          <line x1={pivotX} y1={pivotY} x2={blockX} y2={blockY}
            stroke="var(--foreground)" strokeWidth="1.5" />
          {/* Swung block */}
          <rect x={blockX - 12} y={blockY - 8} width={24} height={16}
            fill="#f59e0b" rx="2" />
          {/* Bullet arrow */}
          <line x1="30" y1={blockRestY} x2={blockRestX - 20} y2={blockRestY}
            stroke="#ef4444" strokeWidth="2" markerEnd="url(#bp-arrow)" />
          <circle cx="30" cy={blockRestY} r="3" fill="#ef4444" />
          <text x="30" y={blockRestY + 15} fill="#ef4444" fontSize="8" textAnchor="middle">kule</text>
          {/* Height line */}
          {h > 0.01 && (
            <>
              <line x1={blockX + 20} y1={blockY} x2={blockX + 20} y2={blockRestY}
                stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
              <text x={blockX + 30} y={(blockY + blockRestY) / 2 + 3}
                fill="#3b82f6" fontSize="9" textAnchor="start">h</text>
            </>
          )}
          {/* Angle arc */}
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
function ImpulseVisualizer() {
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

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      {/* ══════════════════════════════════════════════
          1. TEORISAMMENDRAG
          ══════════════════════════════════════════════ */}
      <div id="teorisammendrag">
        <h2 className="text-2xl font-bold mt-10 mb-6">Teorisammendrag</h2>

        {/* 8.1 Bevegelsesmengde og kraftimpuls */}
        <TheorySummary
          title="8.1 Bevegelsesmengde og kraftimpuls"
          mustKnow={[
            "Bevegelsesmengde: p = mv (vektor!)",
            "Newtons 2. lov: ΣF = dp/dt",
            "Kraftimpuls: J = ΣF · Δt (konstant kraft) eller J = ∫F dt (variabel kraft)",
            "Impuls-momentum-teoremet: J = Δp = p₂ − p₁",
            "Husk retning! Velg positiv retning FØR du setter inn tall",
          ]}
        >
          <p>
            <strong>Bevegelsesmengde</strong> (lineært moment) er produktet av masse og hastighet.
            Det er en <em>vektor</em> — retningen er viktig!
          </p>

          <FormulaBox
            latex="\vec{p} = m\vec{v}"
            title="Bevegelsesmengde"
            variant="gold"
            description="Enhet: kg·m/s. Retning = samme som hastighetsretningen."
          />

          <p className="mt-4">
            Newtons andre lov kan skrives som endring i bevegelsesmengde over tid:
          </p>

          <FormulaBox
            latex="\sum \vec{F} = \frac{d\vec{p}}{dt}"
            title="Newtons 2. lov — momentform"
            variant="gold"
            description="Summen av krefter = endringsrate for bevegelsesmengde."
          />

          <p className="mt-4">
            <strong>Kraftimpuls</strong> er kraftens virkning over tid. Når en kraft virker i et kort
            tidsrom <InlineLatex latex="\Delta t" />, gir den et «dytt» som endrer bevegelsesmengden:
          </p>

          <FormulaBox
            latex="\vec{J} = \sum\vec{F} \cdot \Delta t = \Delta\vec{p} = \vec{p}_2 - \vec{p}_1"
            title="Impuls-momentum-teoremet"
            variant="gold"
            description="Kraftimpuls = endring i bevegelsesmengde. Gjelder alltid!"
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Intuisjon</p>
            <p>
              Tenk på det slik: en stor kraft i kort tid gir samme impuls som en liten kraft over lang tid.
              Derfor gjør det mindre vondt å hoppe ned på en myk matte (lang kontakttid → lav kraft) enn
              på betong (kort kontakttid → høy kraft), selv om <InlineLatex latex="\Delta p" /> er lik!
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil!</p>
            <p>
              Mange glemmer retningen når ballen spretter tilbake. Hvis en ball treffer veggen med
              <InlineLatex latex="v_1 = +30\;\text{m/s}" /> og spretter tilbake med
              <InlineLatex latex="v_2 = -20\;\text{m/s}" />, er
              <InlineLatex latex="\Delta p = m(v_2 - v_1) = m(-20-30) = -50m" />, IKKE <InlineLatex latex="m(20-30)" />.
            </p>
          </div>
        </TheorySummary>

        {/* 8.2 Bevaring av bevegelsesmengde */}
        <TheorySummary
          title="8.2 Bevaring av bevegelsesmengde"
          mustKnow={[
            "Bevaring: Når ΣF_ytre = 0, er total p bevart",
            "Gjelder komponentvis: px og py bevares uavhengig",
            "Gjelder også når ytre krefter er mye svakere enn støtkreftene",
            "Følger fra Newtons 3. lov: F_AB = −F_BA → indre krefter kansellerer",
          ]}
        >
          <p>
            Fra Newtons 3. lov: kreftene mellom to legemer er like store og motsatt rettet.
            Det betyr at de indre kreftene i et system alltid summerer til null:
          </p>

          <FormulaBox
            latex="\vec{F}_{AB} = -\vec{F}_{BA} \;\Rightarrow\; \frac{d}{dt}(\vec{p}_A + \vec{p}_B) = 0"
            title="Bevegelsesmengden er bevart"
            variant="gold"
          />

          <FormulaBox
            latex="\vec{p}_{\text{total,før}} = \vec{p}_{\text{total,etter}}"
            title="Bevaringsloven"
            variant="gold"
            description="Når summen av ytre krefter er null, er systemets totale bevegelsesmengde konstant."
          />

          <p className="mt-4">
            I en kollisjon er støtkreftene (indre krefter) typisk <em>mye</em> større enn ytre
            krefter som tyngden. Derfor er bevegelsesmengden <strong>tilnærmet bevart</strong> under
            selve kollisjonen, selv om ytre krefter virker.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">2D kollisjoner</p>
            <p>
              Bevegelsesmengden bevares <strong>komponentvis</strong>. I en 2D-kollisjon
              setter du opp to ligninger:
            </p>
            <div className="mt-2 space-y-1">
              <p>x-retning: <InlineLatex latex="\sum m_i v_{ix,\text{før}} = \sum m_i v_{ix,\text{etter}}" /></p>
              <p>y-retning: <InlineLatex latex="\sum m_i v_{iy,\text{før}} = \sum m_i v_{iy,\text{etter}}" /></p>
            </div>
          </div>
        </TheorySummary>

        {/* 8.3 Inelastiske kollisjoner */}
        <TheorySummary
          title="8.3 Inelastiske kollisjoner"
          mustKnow={[
            "Fullstendig inelastisk: legemene henger sammen → felles hastighet v₂",
            "Bevegelsesmengde er ALLTID bevart i kollisjoner (uansett type)",
            "Kinetisk energi er IKKE bevart i inelastiske kollisjoner",
            "Fullstendig inelastisk = størst mulig energitap",
            "Ballistisk pendel: to-stegs problem (p-bevaring + energibevaring)",
          ]}
        >
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">p bevart?</th>
                  <th className="text-left py-2 pr-4">E<sub>K</sub> bevart?</th>
                  <th className="text-left py-2">Kjennetegn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4 font-semibold">Elastisk</td>
                  <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                  <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                  <td className="py-2">Spretter fra hverandre (billardkuler, atomkjerner)</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4 font-semibold">Inelastisk</td>
                  <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                  <td className="py-2 pr-4 text-red-600 dark:text-red-400">Nei ✗</td>
                  <td className="py-2">Noe energi tapt til varme/deformasjon</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold">Fullst. inelastisk</td>
                  <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                  <td className="py-2 pr-4 text-red-600 dark:text-red-400">Nei ✗ (maks tap)</td>
                  <td className="py-2">Henger sammen, felles hastighet</td>
                </tr>
              </tbody>
            </table>
          </div>

          <FormulaBox
            latex="(m_A + m_B)\,v_2 = m_A v_{A1} + m_B v_{B1}"
            title="Fullstendig inelastisk kollisjon"
            variant="gold"
            description="Legemene henger sammen etter støtet → én felles hastighet v₂."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Ballistisk pendel — Klassiker!</p>
            <p>
              En kule fester seg i en kloss som henger i tau. <strong>To-stegs problem:</strong>
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><strong>Under støtet:</strong> Bevegelsesmengde bevart (energi IKKE bevart)</li>
              <li><strong>Etter støtet:</strong> Mekanisk energi bevart (bevegelsesmengde IKKE bevart — snorkraft!)</li>
            </ol>
          </div>

          <FormulaBox
            latex="v_0 = \frac{M + m}{m}\sqrt{2gh}"
            title="Ballistisk pendel — kulens startfart"
            variant="gold"
            description="Kombiner p-bevaring under støt med energibevaring under svingen."
          />
        </TheorySummary>

        {/* 8.4 Elastiske kollisjoner */}
        <TheorySummary
          title="8.4 Elastiske kollisjoner"
          mustKnow={[
            "Elastisk: BÅDE p og E_K er bevart → to ligninger, to ukjente",
            "1D: Resulterer i to ligninger som kan løses algebraisk",
            "Triviell løsning (ingenting skjer) forkastes alltid",
            "Spesialtilfeller: lik masse → hastigheter bytter; m_A >> m_B → A upåvirket",
          ]}
        >
          <p>
            I en elastisk kollisjon er <strong>både</strong> bevegelsesmengde og kinetisk energi bevart.
            Dette gir et ligningssystem med to ligninger:
          </p>

          <FormulaBox
            latex="\begin{cases} m_A v_{A1} + m_B v_{B1} = m_A v_{A2} + m_B v_{B2} \\ \tfrac{1}{2}m_A v_{A1}^2 + \tfrac{1}{2}m_B v_{B1}^2 = \tfrac{1}{2}m_A v_{A2}^2 + \tfrac{1}{2}m_B v_{B2}^2 \end{cases}"
            title="Elastisk 1D-kollisjon — to ligninger"
            variant="gold"
            description="Løs for v_A2 og v_B2. Forkast den trivielle løsningen."
          />

          <p className="mt-4">De generelle løsningene for 1D elastisk kollisjon er:</p>

          <FormulaBox
            latex="v_{A2} = \frac{m_A - m_B}{m_A + m_B}\,v_{A1} + \frac{2m_B}{m_A + m_B}\,v_{B1}"
            title="Hastighet A etter elastisk kollisjon"
            variant="blue"
          />

          <FormulaBox
            latex="v_{B2} = \frac{2m_A}{m_A + m_B}\,v_{A1} + \frac{m_B - m_A}{m_A + m_B}\,v_{B1}"
            title="Hastighet B etter elastisk kollisjon"
            variant="blue"
          />

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Spesialtilfeller</p>
            <ul className="space-y-2">
              <li>
                <strong>Like masser</strong> (<InlineLatex latex="m_A = m_B" />): Hastighetene <em>bytter</em>!
                <InlineLatex latex="v_{A2} = v_{B1}" /> og <InlineLatex latex="v_{B2} = v_{A1}" />
              </li>
              <li>
                <strong>B i ro</strong> (<InlineLatex latex="v_{B1} = 0" />), <strong>like masser</strong>:
                A stopper, B fortsetter med A sin fart. (Newtons vugge!)
              </li>
              <li>
                <strong>A mye tyngre</strong> (<InlineLatex latex="m_A \gg m_B" />):
                A nesten upåvirket, B «spretter» vekk med nesten dobbel fart.
              </li>
            </ul>
          </div>
        </TheorySummary>

        {/* 8.5 Massesenter */}
        <TheorySummary
          title="8.5 Massesenter"
          mustKnow={[
            "Massesenter: x_cm = Σ(m_i·x_i) / Σm_i",
            "Massesenteret oppfører seg som om all masse er samlet der",
            "ΣF_ytre = M·a_cm (Newtons 2. lov for systemet)",
            "Massesenteret fortsetter i samme bane ved intern sprengning",
            "Bruk symmetri når mulig for å forenkle",
          ]}
        >
          <p>
            <strong>Massesenteret</strong> er det massevektede gjennomsnittet av alle posisjonene i
            et system. Det er punktet der du kan tenke at «all massen er samlet».
          </p>

          <FormulaBox
            latex="\vec{r}_{cm} = \frac{\sum m_i \vec{r}_i}{\sum m_i} = \frac{m_1\vec{r}_1 + m_2\vec{r}_2 + \cdots}{m_1 + m_2 + \cdots}"
            title="Massesenterets posisjon"
            variant="gold"
          />

          <FormulaBox
            latex="\vec{v}_{cm} = \frac{\sum m_i \vec{v}_i}{M} \qquad \vec{a}_{cm} = \frac{\sum m_i \vec{a}_i}{M}"
            title="Massesenterets fart og akselerasjon"
            variant="blue"
          />

          <FormulaBox
            latex="\sum \vec{F}_{\text{ytre}} = M\,\vec{a}_{cm}"
            title="Newtons 2. lov for et system"
            variant="gold"
            description="Massesenteret akselereres kun av ytre krefter. Indre krefter kansellerer (Newtons 3. lov)."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksempel — Sprengning!</p>
            <p>
              Et prosjektil eksploderer i to deler i luften. Selv om delene flyr i vilt forskjellige
              retninger, fortsetter <em>massesenteret</em> på den opprinnelige parabelbanen.
              Ytre kraft (tyngden) er uendret, så <InlineLatex latex="\vec{a}_{cm} = \vec{g}" /> hele tiden.
            </p>
          </div>
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formelsamling</h2>

        <div className="space-y-3">
          <FormulaBox
            latex="\vec{p} = m\vec{v}"
            title="Bevegelsesmengde"
            variant="gold"
            description="Enhet: kg·m/s. Vektor — retningen er viktig!"
          />
          <FormulaBox
            latex="\vec{J} = \sum\vec{F}\,\Delta t = \Delta\vec{p}"
            title="Impuls-momentum-teoremet"
            variant="gold"
            description="Kraftimpuls = endring i bevegelsesmengde."
          />
          <FormulaBox
            latex="\bar{F} = \frac{\Delta p}{\Delta t} = \frac{m(v_2 - v_1)}{\Delta t}"
            title="Gjennomsnittlig kraft fra impuls"
            variant="blue"
            description="Brukes ofte: finn kraften fra kontakttid og hastighetsendring."
          />
          <FormulaBox
            latex="\vec{p}_{\text{total,før}} = \vec{p}_{\text{total,etter}}"
            title="Bevaring av bevegelsesmengde"
            variant="gold"
            description="Gjelder når ΣF_ytre = 0 (eller ΣF_ytre << støtkreftene)."
          />
          <FormulaBox
            latex="(m_A + m_B)\,v_2 = m_A v_{A1} + m_B v_{B1}"
            title="Fullstendig inelastisk kollisjon"
            variant="gold"
            description="Felles hastighet v₂ etter støt."
          />
          <FormulaBox
            latex="v_0 = \frac{M + m}{m}\sqrt{2gh}"
            title="Ballistisk pendel"
            variant="gold"
            description="Kulefart fra høyden kloss+kule svinger opp til."
          />
          <FormulaBox
            latex="\vec{r}_{cm} = \frac{\sum m_i \vec{r}_i}{\sum m_i}"
            title="Massesenter"
            variant="blue"
            description="Det massevektede gjennomsnittspunktet."
          />
          <FormulaBox
            latex="\sum \vec{F}_{\text{ytre}} = M\vec{a}_{cm}"
            title="Newtons 2. lov for system"
            variant="gold"
            description="Systemet som helhet oppfører seg som en partikkel i massesenteret."
          />
        </div>

        {/* Når bruker du hva */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mt-6">
          <h3 className="font-semibold text-lg mb-3">Når bruker du hva?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Situasjon</th>
                  <th className="text-left py-2">Formel / Prinsipp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kort støt / treff: finn kraft eller hastighetsendring</td>
                  <td className="py-2"><InlineLatex latex="J = F\Delta t = \Delta p" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">To ting krasjer og henger sammen</td>
                  <td className="py-2">Fullstendig inelastisk: <InlineLatex latex="(m_A+m_B)v_2 = m_Av_{A1} + m_Bv_{B1}" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">To ting spretter fra hverandre, ingen energitap</td>
                  <td className="py-2">Elastisk: p-bevaring + E<sub>K</sub>-bevaring</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kule treffer kloss i tau → svinger opp</td>
                  <td className="py-2">Ballistisk pendel (to steg!)</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Noe eksploderer / sprenges i deler</td>
                  <td className="py-2">p-bevaring baklengs (p<sub>total</sub> = konstant)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Finn tyngdepunkt / balansepunkt</td>
                  <td className="py-2">Massesenter: <InlineLatex latex="x_{cm} = \sum m_ix_i/\sum m_i" /></td>
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
        <ImpulseVisualizer />
        <CollisionVisualizer />
        <BallisticPendulumVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eks 1 — Ball mot vegg */}
        <ExerciseCard
          number={1}
          title="Ball treffer vegg — Kraftimpuls (1D)"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ball med masse <InlineLatex latex="m = 0{,}40\;\text{kg}" /> treffer veggen med
                fart <InlineLatex latex="v_1 = 30\;\text{m/s}" /> og spretter tilbake
                med <InlineLatex latex="v_2 = 20\;\text{m/s}" /> i motsatt retning.
                Sammenstøtet varer <InlineLatex latex="\Delta t = 0{,}010\;\text{s}" />.
              </p>
              <p className="mt-2">Finn gjennomsnittskraften fra veggen på ballen.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Velg positiv retning (f.eks. mot veggen). Ballen spretter TILBAKE, så v₂ har motsatt fortegn av v₁.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Bruk <InlineLatex latex="J = m(v_2 - v_1)" /> og <InlineLatex latex="\bar{F} = J / \Delta t" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong> m = 0,40 kg, v₁ = +30 m/s (mot vegg), v₂ = −20 m/s (tilbake), Δt = 0,010 s.</p>
              <p><strong>Impuls-momentum-teoremet:</strong></p>
              <FormulaBox
                latex="J = m(v_2 - v_1) = 0{,}40 \cdot (-20 - 30) = -20\;\text{N·s}"
                variant="blue"
              />
              <p><strong>Gjennomsnittskraft:</strong></p>
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{-20}{0{,}010} = \underline{\underline{-2000\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Negativt fortegn = kraften virker mot ballens innkommende retning (bort fra veggen). Størrelsen er 2000 N ≈ 200 ganger tyngdekraften på ballen!
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Husk alltid å ta med retningen. Når noe «spretter tilbake» har v₁ og v₂ motsatte fortegn, og Δp blir stor.</p>
            </div>
          }
        />

        {/* Eks 2 — Fotball 2D */}
        <ExerciseCard
          number={2}
          title="Fotball sparkes — Kraftimpuls i 2D"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En fotball (<InlineLatex latex="m = 0{,}40\;\text{kg}" />) beveger seg mot venstre
                med <InlineLatex latex="v_1 = 20\;\text{m/s}" />. Den sparkes slik at den etterpå
                har fart <InlineLatex latex="v_2 = 30\;\text{m/s}" /> i retning 45° oppover
                fra horisontal (mot høyre). Kontakttid: <InlineLatex latex="\Delta t = 0{,}010\;\text{s}" />.
              </p>
              <p className="mt-2">Finn kraftimpulsen og gjennomsnittlig kraft på ballen.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Dekomponér i x- og y-komponenter. Ballen beveger seg mot venstre → v₁ₓ er negativ.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Etter spark: v₂ₓ = v₂cos45°, v₂y = v₂sin45°. Finn Jx og Jy separat.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Komponenter etter spark:</strong></p>
              <FormulaBox
                latex="v_{2x} = 30\cos 45° = 21{,}2\;\text{m/s}, \quad v_{2y} = 30\sin 45° = 21{,}2\;\text{m/s}"
                variant="blue"
              />
              <p><strong>Kraftimpuls (komponentvis):</strong></p>
              <FormulaBox
                latex="J_x = m(v_{2x} - v_{1x}) = 0{,}40(21{,}2 - (-20)) = 0{,}40 \cdot 41{,}2 = 16{,}5\;\text{N·s}"
                variant="blue"
              />
              <FormulaBox
                latex="J_y = m(v_{2y} - v_{1y}) = 0{,}40(21{,}2 - 0) = 8{,}5\;\text{N·s}"
                variant="blue"
              />
              <FormulaBox
                latex="J = \sqrt{J_x^2 + J_y^2} = \sqrt{16{,}5^2 + 8{,}5^2} = \underline{\underline{18{,}5\;\text{N·s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{18{,}5}{0{,}010} = \underline{\underline{1{,}9\;\text{kN}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D beregner du impulsen komponentvis, deretter størrelsen med Pythagoras.</p>
            </div>
          }
        />

        {/* Eks 3 — Rifle rekyl */}
        <ExerciseCard
          number={3}
          title="Rifle og kule — Rekyl"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En rifle (<InlineLatex latex="m_A = 3{,}0\;\text{kg}" />) skyter en
                kule (<InlineLatex latex="m_B = 0{,}005\;\text{kg}" />) som forlater løpet
                med <InlineLatex latex="v_B = 300\;\text{m/s}" />. Begge er i ro før skuddet.
              </p>
              <p className="mt-2">Finn rekylfarten til rifla.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Systemet er i ro før skuddet → p<sub>total,før</sub> = 0. Bevegelsesmengden er bevart!</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Før:</strong> <InlineLatex latex="p_{\text{total}} = 0" /> (alt i ro).</p>
              <p><strong>Etter:</strong></p>
              <FormulaBox
                latex="m_A v_A + m_B v_B = 0 \;\Rightarrow\; v_A = -\frac{m_B}{m_A} v_B"
                variant="blue"
              />
              <FormulaBox
                latex="v_A = -\frac{0{,}005}{3{,}0} \cdot 300 = \underline{\underline{-0{,}50\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Negativt fortegn betyr rifla beveger seg bakover. Liten fart fordi rifla har mye større masse enn kulen.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Bevegelsesmengde bevares. Liten masse × stor fart = stor masse × liten fart. Derfor er rekylen moderat selv om kulen er rask.</p>
            </div>
          }
        />

        {/* Eks 4 — Fullstendig inelastisk 1D */}
        <ExerciseCard
          number={4}
          title="Fullstendig inelastisk kollisjon — To klosser"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Kloss A (<InlineLatex latex="m_A = 0{,}50\;\text{kg}" />, <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" /> →)
                kolliderer med kloss B (<InlineLatex latex="m_B = 0{,}30\;\text{kg}" />, <InlineLatex latex="v_{B1} = -2{,}0\;\text{m/s}" /> ←).
                De henger sammen etter støtet.
              </p>
              <p className="mt-2">Finn felles hastighet og energitapet.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Fullstendig inelastisk: <InlineLatex latex="(m_A + m_B)v_2 = m_Av_{A1} + m_Bv_{B1}" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Bevaring av bevegelsesmengde:</strong></p>
              <FormulaBox
                latex="v_2 = \frac{m_A v_{A1} + m_B v_{B1}}{m_A + m_B} = \frac{0{,}50 \cdot 2{,}0 + 0{,}30 \cdot (-2{,}0)}{0{,}80} = \frac{0{,}40}{0{,}80} = \underline{\underline{0{,}50\;\text{m/s}}}"
                variant="gold"
              />
              <p><strong>Energi før:</strong></p>
              <FormulaBox
                latex="E_{K1} = \tfrac{1}{2} \cdot 0{,}50 \cdot 2^2 + \tfrac{1}{2} \cdot 0{,}30 \cdot 2^2 = 1{,}0 + 0{,}60 = 1{,}60\;\text{J}"
                variant="blue"
              />
              <p><strong>Energi etter:</strong></p>
              <FormulaBox
                latex="E_{K2} = \tfrac{1}{2} \cdot 0{,}80 \cdot 0{,}50^2 = 0{,}10\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="\Delta E_K = 1{,}60 - 0{,}10 = \underline{\underline{1{,}50\;\text{J (tapt)}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Hele 94% av kinetisk energi er tapt til varme og deformasjon! Bevegelsesmengden er likevel bevart: p<sub>før</sub> = 0,40 = p<sub>etter</sub>.
              </p>
            </div>
          }
        />

        {/* Eks 5 — Ballistisk pendel */}
        <ExerciseCard
          number={5}
          title="Ballistisk pendel — Klassisk to-stegs problem"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kule (<InlineLatex latex="m = 0{,}005\;\text{kg}" />) med
                hastighet <InlineLatex latex="v_0" /> treffer og fester seg i en
                kloss (<InlineLatex latex="M = 2{,}0\;\text{kg}" />)
                som henger i et tau. Kloss+kule svinger opp til
                høyde <InlineLatex latex="y = 0{,}030\;\text{m}" />.
              </p>
              <p className="mt-2">Finn kulens startfart <InlineLatex latex="v_0" />.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p><strong>To steg!</strong> Støtet: p-bevaring. Svinget: energibevaring.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Fra energibevaring etter støtet: <InlineLatex latex="V = \sqrt{2gy}" />. Sett dette inn i p-ligningen.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1 — Bevaring av bevegelsesmengde (under støtet):</strong></p>
              <FormulaBox
                latex="mv_0 = (M+m)V \;\Rightarrow\; V = \frac{m}{M+m}\,v_0"
                variant="blue"
              />
              <p><strong>Steg 2 — Bevaring av mekanisk energi (etter støtet):</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}(M+m)V^2 = (M+m)gy \;\Rightarrow\; V = \sqrt{2gy}"
                variant="blue"
              />
              <p><strong>Kombinerer:</strong></p>
              <FormulaBox
                latex="v_0 = \frac{M+m}{m}\sqrt{2gy} = \frac{2{,}005}{0{,}005}\sqrt{2 \cdot 9{,}81 \cdot 0{,}030}"
                variant="blue"
              />
              <FormulaBox
                latex="v_0 = 401 \cdot 0{,}767 = \underline{\underline{308\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Du kan IKKE bruke energibevaring under støtet (energi går tapt), og du kan IKKE bruke p-bevaring under svinget (snorkraft er en ytre kraft). Du MÅ bruke riktig prinsipp i riktig steg!</p>
            </div>
          }
        />

        {/* Eks 6 — 2D inelastisk (biler) */}
        <ExerciseCard
          number={6}
          title="Bilkollisjon i kryss — 2D inelastisk"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                Bil A (<InlineLatex latex="m_A = 1000\;\text{kg}" />) kjører nordover
                med <InlineLatex latex="v_A = 15\;\text{m/s}" />. Bil B (<InlineLatex latex="m_B = 2000\;\text{kg}" />)
                kjører østover med <InlineLatex latex="v_B = 10\;\text{m/s}" />.
                De kolliderer og henger sammen.
              </p>
              <p className="mt-2">Finn felles hastighet (størrelse og retning) og energitapet.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>2D fullstendig inelastisk. Sett opp p-bevaring i x- og y-retning separat.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>x-retning (østover):</strong></p>
              <FormulaBox
                latex="(m_A+m_B)v_x = m_B v_B \;\Rightarrow\; v_x = \frac{2000 \cdot 10}{3000} = 6{,}67\;\text{m/s}"
                variant="blue"
              />
              <p><strong>y-retning (nordover):</strong></p>
              <FormulaBox
                latex="(m_A+m_B)v_y = m_A v_A \;\Rightarrow\; v_y = \frac{1000 \cdot 15}{3000} = 5{,}00\;\text{m/s}"
                variant="blue"
              />
              <FormulaBox
                latex="v = \sqrt{v_x^2 + v_y^2} = \sqrt{6{,}67^2 + 5{,}00^2} = \underline{\underline{8{,}3\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\alpha = \arctan\!\left(\frac{v_y}{v_x}\right) = \arctan\!\left(\frac{5{,}00}{6{,}67}\right) = \underline{\underline{37°\;\text{nord for øst}}}"
                variant="gold"
              />
              <p><strong>Energitap:</strong></p>
              <FormulaBox
                latex="E_{K,\text{før}} = \tfrac{1}{2} \cdot 1000 \cdot 15^2 + \tfrac{1}{2} \cdot 2000 \cdot 10^2 = 212\,500\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="E_{K,\text{etter}} = \tfrac{1}{2} \cdot 3000 \cdot 8{,}3^2 = 103\,335\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="\Delta E_K = 212\,500 - 103\,335 = \underline{\underline{109\;\text{kJ (tapt)}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D-kollisjoner bruker du p-bevaring komponentvis. Finn vₓ og vy separat, deretter Pythagoras for størrelsen.</p>
            </div>
          }
        />

        {/* Eks 7 — Elastisk 1D */}
        <ExerciseCard
          number={7}
          title="Elastisk 1D-kollisjon — Ligningssystem"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                Kloss A (<InlineLatex latex="m_A = 0{,}50\;\text{kg}" />, <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" /> →)
                kolliderer elastisk med kloss B (<InlineLatex latex="m_B = 0{,}30\;\text{kg}" />, <InlineLatex latex="v_{B1} = -2{,}0\;\text{m/s}" /> ←).
              </p>
              <p className="mt-2">Finn hastighetene etter kollisjonen.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>To ligninger: p-bevaring og E<sub>K</sub>-bevaring. Uttrykk v<sub>A2</sub> fra den ene og sett inn i den andre.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Du vil få en andregradslikning. En av løsningene er den trivielle (v<sub>A2</sub> = v<sub>A1</sub>, v<sub>B2</sub> = v<sub>B1</sub>) — forkast den.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Ligning 1 — Bevaring av bevegelsesmengde:</strong></p>
              <FormulaBox
                latex="0{,}50 \cdot v_{A2} + 0{,}30 \cdot v_{B2} = 0{,}50 \cdot 2 + 0{,}30 \cdot (-2) = 0{,}40"
                variant="blue"
              />
              <p><strong>Ligning 2 — Bevaring av kinetisk energi:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2} \cdot 0{,}50 \cdot v_{A2}^2 + \tfrac{1}{2} \cdot 0{,}30 \cdot v_{B2}^2 = 1{,}60"
                variant="blue"
              />
              <p><strong>Fra ligning 1:</strong> <InlineLatex latex="v_{A2} = 0{,}80 - 0{,}60\,v_{B2}" /></p>
              <p>Substituerer inn i ligning 2 og løser andregradsligningen:</p>
              <FormulaBox
                latex="v_{B2} = 3{,}0\;\text{m/s} \quad \text{eller} \quad v_{B2} = -2{,}0\;\text{m/s (triviell, forkastes)}"
                variant="blue"
              />
              <FormulaBox
                latex="v_{A2} = 0{,}80 - 0{,}60 \cdot 3{,}0 = \underline{\underline{-1{,}0\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="v_{B2} = \underline{\underline{3{,}0\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                A snur retning (−1,0 m/s = mot venstre), B spretter ut mot høyre (3,0 m/s). Sjekk: p<sub>etter</sub> = 0,50·(−1) + 0,30·3 = 0,40 ✓ og E<sub>K,etter</sub> = 0,25 + 1,35 = 1,60 J ✓
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Elastisk kollisjon gir et andregradsligningssystem. Forkast alltid den trivielle løsningen (der «ingenting skjer»).</p>
            </div>
          }
        />

        {/* Eks 8 — Curling 2D bevegelsesmengde */}
        <ExerciseCard
          number={8}
          title="Curlingsteiner — 2D bevaring av bevegelsesmengde"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                Stein A (<InlineLatex latex="m_A = 20\;\text{kg}" />) glir mot høyre
                med <InlineLatex latex="v_{A1} = 2{,}0\;\text{m/s}" />. Stein B (<InlineLatex latex="m_B = 12\;\text{kg}" />) ligger i ro.
                Etter kollisjonen går A med <InlineLatex latex="v_{A2} = 1{,}0\;\text{m/s}" /> i
                retning <InlineLatex latex="\alpha = 30°" /> over horisontal.
              </p>
              <p className="mt-2">Finn B sin hastighet (størrelse og retning) etter kollisjonen.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Sett opp p-bevaring i x og y separat. Finn v<sub>B2x</sub> og v<sub>B2y</sub>.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>x-retning:</strong></p>
              <FormulaBox
                latex="v_{B2x} = \frac{m_A v_{A1} - m_A v_{A2}\cos\alpha}{m_B} = \frac{20 \cdot 2 - 20 \cdot 1 \cdot \cos 30°}{12} = 1{,}89\;\text{m/s}"
                variant="blue"
              />
              <p><strong>y-retning:</strong></p>
              <FormulaBox
                latex="v_{B2y} = \frac{0 - m_A v_{A2}\sin\alpha}{m_B} = \frac{-20 \cdot 1 \cdot \sin 30°}{12} = -0{,}83\;\text{m/s}"
                variant="blue"
              />
              <FormulaBox
                latex="v_{B2} = \sqrt{1{,}89^2 + 0{,}83^2} = \underline{\underline{2{,}07\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\beta = \arctan\!\left(\frac{0{,}83}{1{,}89}\right) = \underline{\underline{23{,}7°\;\text{under horisontal}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> I 2D-kollisjoner bevares p<sub>x</sub> og p<sub>y</sub> uavhengig. Bruk komponentmetoden systematisk.</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          5. OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <div id="strategier">
        <h2 className="text-2xl font-bold mt-12 mb-6">Oppgavestrategier</h2>

        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Kraftimpuls-oppgaver</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Velg positiv retning</strong> og vær konsekvent!</li>
              <li><strong>Finn p₁ og p₂</strong> — husk fortegn for retning</li>
              <li><strong>Beregn impulsen:</strong> <InlineLatex latex="J = p_2 - p_1 = m(v_2 - v_1)" /></li>
              <li><strong>Finn kraft fra tid:</strong> <InlineLatex latex="\bar{F} = J / \Delta t" /></li>
              <li><strong>Sjekk:</strong> Gir fortegnet mening? Kraft mot venstre når ballen spretter til høyre?</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Kollisjonsoppgaver — Hvilken type?</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Les oppgaven nøye:</strong> Henger de sammen etterpå? → Fullstendig inelastisk</li>
              <li><strong>Elastisk?</strong> Oppgaven sier det eksplisitt, eller spør om E<sub>K</sub> er bevart</li>
              <li><strong>Sett opp p-bevaring</strong> (alltid, uansett type)</li>
              <li>Er den elastisk? <strong>Legg til E<sub>K</sub>-bevaring</strong> → to ligninger</li>
              <li><strong>Løs</strong> — ved elastisk: substitusjon, forkast triviell løsning</li>
              <li><strong>Beregn energitap</strong> hvis oppgaven spør om det</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Ballistisk pendel (to-stegs)</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Steg 1 — Støtet:</strong> Bevegelsesmengde bevart. <InlineLatex latex="mv_0 = (m+M)V" /></li>
              <li><strong>Steg 2 — Svinget:</strong> Energi bevart. <InlineLatex latex="\tfrac{1}{2}(m+M)V^2 = (m+M)gh" /></li>
              <li><strong>Kombiner:</strong> Eliminer V → <InlineLatex latex="v_0 = \frac{m+M}{m}\sqrt{2gh}" /></li>
            </ol>
            <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 mt-3 text-sm">
              <p className="font-semibold text-red-700 dark:text-red-400">Aldri:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Bruk energibevaring <em>under</em> støtet (energi går tapt!)</li>
                <li>Bruk p-bevaring <em>under</em> svinget (snorkraft virker!)</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Sjekkliste — Vanlige feil i kap. 8</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Glemmer <strong>fortegn</strong> når ting beveger seg i motsatt retning</li>
              <li>Blander <strong>kollisjonstype</strong> — E<sub>K</sub> er KUN bevart i elastisk!</li>
              <li>Glemmer å <strong>konvertere enheter</strong> (km/h → m/s, gram → kg)</li>
              <li>I 2D: Glemmer å bruke <strong>komponentmetoden</strong></li>
              <li>Bruker feil prinsipp i ballistisk pendel (se over)</li>
              <li>Forkaster ikke den <strong>trivielle løsningen</strong> i elastisk kollisjon</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. ØVINGSOPPGAVER (fra obliger)
          ══════════════════════════════════════════════ */}
      <div id="ovingsoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Øvingsoppgaver</h2>

        <ExerciseCard
          number={1}
          title="Oblig 2, oppg. 3a — Kule i kloss (inelastisk)"
          difficulty="middels"
          source="Obligatorisk innlevering"
          problem={
            <div>
              <p>
                En kloss med masse <InlineLatex latex="M" /> henger i en snor med lengde <InlineLatex latex="L" />.
                En kule med masse <InlineLatex latex="m" /> og hastighet <InlineLatex latex="v_0" /> treffer klossen
                og fester seg (fullstendig inelastisk støt).
              </p>
              <p className="mt-2">Finn felleslegemets hastighet <InlineLatex latex="V" /> rett etter støtet.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Fullstendig inelastisk → felles hastighet. Bruk bevaring av bevegelsesmengde.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Bevaring av bevegelsesmengde (under støtet):</strong></p>
              <FormulaBox
                latex="mv_0 = (m + M)V"
                variant="blue"
              />
              <FormulaBox
                latex="V = \frac{m}{m+M}\,v_0"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Oblig 2, oppg. 3b — Maks vinkelutslag"
          difficulty="vanskelig"
          source="Obligatorisk innlevering"
          problem={
            <div>
              <p>
                Vis at felleslegemets maksimale vinkelutslag etter støtet er:
              </p>
              <FormulaBox
                latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right)"
                variant="blue"
              />
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk energibevaring etter støtet. Høyden: <InlineLatex latex="h = L - L\cos\varphi = L(1-\cos\varphi)" />.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Sett inn V fra del a) og løs for cosφ.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Energibevaring etter støtet:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}(m+M)V^2 = (m+M)gL(1-\cos\varphi_{\max})"
                variant="blue"
              />
              <p>Med <InlineLatex latex="V = \frac{m}{m+M}v_0" />:</p>
              <FormulaBox
                latex="\tfrac{1}{2}\frac{m^2 v_0^2}{m+M} = (m+M)gL(1-\cos\varphi_{\max})"
                variant="blue"
              />
              <FormulaBox
                latex="1-\cos\varphi_{\max} = \frac{m^2 v_0^2}{2gL(m+M)^2}"
                variant="blue"
              />
              <FormulaBox
                latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right) \quad \square"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Oblig 2, oppg. 3c — Elastisk rikosjett"
          difficulty="vanskelig"
          source="Obligatorisk innlevering"
          problem={
            <div>
              <p>
                Kulen rikosjetterer i stedet (fullstendig elastisk støt).
                <InlineLatex latex="m = 0{,}0050\;\text{kg}" />, <InlineLatex latex="M = 10\;\text{kg}" />, <InlineLatex latex="v_0 = 100\;\text{m/s}" />.
              </p>
              <p className="mt-2">Finn hastighetene etter støtet.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Elastisk → to ligninger (p-bevaring + E<sub>K</sub>-bevaring). Uttrykk V₂ fra p-ligning og substituér.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Bevegelsesmengde:</strong> <InlineLatex latex="MV_1 + mV_2 = mv_0 \;\Rightarrow\; 10V_1 + 0{,}005V_2 = 0{,}50" /></p>
              <p><strong>Energi:</strong> <InlineLatex latex="0{,}0025V_2^2 + 5V_1^2 = 25" /></p>
              <p>Fra ligning 1: <InlineLatex latex="V_2 = 100 - 2000V_1" /></p>
              <p>Substituerer og løser:</p>
              <FormulaBox
                latex="V_1 = \frac{1000}{10005} \approx \underline{\underline{0{,}10\;\text{m/s}}}"
                variant="gold"
              />
              <FormulaBox
                latex="V_2 = 100 - 2000 \cdot 0{,}0999 = \underline{\underline{-99{,}9\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Kulen spretter nesten tilbake med samme fart (−99,9 m/s), og klossen får bare 0,10 m/s. Fordi m ≪ M overføres nesten ingen energi.
              </p>
            </div>
          }
        />

        <ExerciseCard
          number={4}
          title="Oblig 2, oppg. 3d — Gjennomsnittlig kraft"
          difficulty="middels"
          source="Obligatorisk innlevering"
          problem={
            <div>
              <p>
                Med tallene fra oppgave 3c: Finn gjennomsnittlig kraft på klossen
                når støtet varer <InlineLatex latex="\Delta t = 0{,}0050\;\text{s}" />.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Impuls på klossen: <InlineLatex latex="J = \Delta p_{\text{kloss}} = MV_1 - 0 = MV_1" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <FormulaBox
                latex="\bar{F} = \frac{MV_1}{\Delta t} = \frac{10 \cdot 0{,}10}{0{,}0050} = \underline{\underline{200\;\text{N}}}"
                variant="gold"
              />
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
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Kraftimpuls-oppgaver (ball som spretter) kommer nesten <strong>alltid</strong></li>
            <li>Bilkollisjon med bevegelsesmengde er en gjenganger</li>
            <li>Ballistisk pendel: forstå <strong>hvorfor</strong> du bruker ulike prinsipper i de to stegene</li>
            <li>Husk å konvertere km/h til m/s (del på 3,6)</li>
          </ul>
        </div>

        {/* Vår 2023 — Oppgave 1d */}
        <ExerciseCard
          number={1}
          title="Eksamen vår 2023, oppg. 1d — Basketball kraftimpuls"
          difficulty="middels"
          source="Eksamen vår 2023"
          problem={
            <div>
              <p>
                En basketballspiller bommer, og ballen treffer plata over kurven
                med horisontal hastighet <InlineLatex latex="5{,}0\;\text{m/s}" />.
                Ballen spretter tilbake med horisontal hastighet <InlineLatex latex="4{,}0\;\text{m/s}" /> i
                motsatt retning. Kontakttid: <InlineLatex latex="0{,}15\;\text{s}" />.
                Masse: <InlineLatex latex="m = 0{,}600\;\text{kg}" />.
              </p>
              <p className="mt-2">
                a) Hvor stor var kraftimpulsen på ballen?<br />
                b) Hvor stor var den gjennomsnittlige kraften?
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Velg positiv retning. Ballen spretter TILBAKE → v₂ har motsatt fortegn.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p>Positiv retning: mot platen. Da: <InlineLatex latex="v_1 = +5{,}0\;\text{m/s}" />, <InlineLatex latex="v_2 = -4{,}0\;\text{m/s}" />.</p>
              <p><strong>a) Kraftimpuls:</strong></p>
              <FormulaBox
                latex="J = m(v_2 - v_1) = 0{,}600 \cdot (-4{,}0 - 5{,}0) = \underline{\underline{-5{,}4\;\text{N·s}}}"
                variant="gold"
              />
              <p><strong>b) Gjennomsnittlig kraft:</strong></p>
              <FormulaBox
                latex="\bar{F} = \frac{J}{\Delta t} = \frac{-5{,}4}{0{,}15} = \underline{\underline{-36\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Negativt fortegn = kraften virker bort fra platen (mot spilleren). Størrelsen er 36 N.
              </p>
            </div>
          }
        />

        {/* Høst 2023 — Oppgave 2a (teori) */}
        <ExerciseCard
          number={2}
          title="Eksamen høst 2023, oppg. 2a — Teori om kollisjonstyper"
          difficulty="lett"
          source="Eksamen høst 2023"
          problem={
            <div>
              <p>
                Hva menes med et elastisk støt, og hva menes med et fullkomment uelastisk støt?
                Hvilke bevaringslover gjelder for disse?
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Tenk: hva er bevart, og hva er IKKE bevart? Hva skjer med legemene etterpå?</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Elastisk støt:</strong> Kinetisk energi ER bevart i tillegg til bevegelsesmengde. Legemene spretter fra hverandre.</p>
              <p><strong>Fullstendig inelastisk støt:</strong> Legemene henger sammen etter støtet og beveger seg med felles hastighet. Bevegelsesmengde er bevart, men kinetisk energi er IKKE bevart (størst mulig tap).</p>
              <p><strong>Felles:</strong> Bevegelsesmengde er bevart i ALLE kollisjoner (når ytre krefter er neglisjerbare).</p>
            </div>
          }
        />

        {/* Høst 2023 — Oppgave 2b,c,d (bilkollisjon) */}
        <ExerciseCard
          number={3}
          title="Eksamen høst 2023, oppg. 2b–d — Bilkollisjon og fartsgrense"
          difficulty="vanskelig"
          source="Eksamen høst 2023"
          problem={
            <div>
              <p>
                Bil A (<InlineLatex latex="m_A = 1500\;\text{kg}" />) og bil B
                (<InlineLatex latex="m_B = 900\;\text{kg}" />) kolliderer frontalt.
                Etter støtet henger bilene sammen med fart <InlineLatex latex="27\;\text{km/h}" /> i
                bil A sin opprinnelige retning (positiv retning).
              </p>
              <p className="mt-2">
                b) En bil med 1500 kg og fart 72 km/h stanser etter 50 m. Finn friksjonskraften og bremsetiden.<br />
                c) Begge bilførerne påsto de holdt fartsgrensen (60 km/h). Er det sannsynlig?<br />
                d) Bil B kjørte i 60 km/h. Beregn farten til bil A.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>b) Bruk <InlineLatex latex="v^2 = v_0^2 + 2as" /> for å finne a, deretter F = ma og <InlineLatex latex="s = \frac{v_0+v}{2}t" />.</p>,
            },
            {
              label: "Hint 2",
              content: <p>c) Sjekk om p<sub>før</sub> = p<sub>etter</sub> stemmer med 60 km/h for begge.</p>,
            },
            {
              label: "Hint 3",
              content: <p>d) Sett inn v<sub>B</sub> = 60 km/h i p-bevaringen og løs for v<sub>A</sub>.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>b) Bremsestrekk:</strong></p>
              <FormulaBox
                latex="a = \frac{v^2 - v_0^2}{2s} = \frac{0 - 20^2}{2 \cdot 50} = -4{,}0\;\text{m/s}^2"
                variant="blue"
              />
              <FormulaBox
                latex="R = ma = 1500 \cdot (-4{,}0) = \underline{\underline{-6{,}0\;\text{kN}}}"
                variant="gold"
              />
              <FormulaBox
                latex="t = \frac{2s}{v_0} = \frac{100}{20} = \underline{\underline{5{,}0\;\text{s}}}"
                variant="gold"
              />

              <p><strong>c) Var 60 km/h sannsynlig for begge?</strong></p>
              <FormulaBox
                latex="p_{\text{før}} = 1500 \cdot 60 - 900 \cdot 60 = 36\,000\;\text{kg·km/h}"
                variant="blue"
              />
              <FormulaBox
                latex="p_{\text{etter}} = 2400 \cdot 27 = 64\,800\;\text{kg·km/h}"
                variant="blue"
              />
              <p>
                <InlineLatex latex="36\,000 \neq 64\,800" /> — <strong>begge KAN IKKE ha kjørt i 60 km/h!</strong> Minst
                én kjørte fortere.
              </p>

              <p><strong>d) Finn v<sub>A</sub> når v<sub>B</sub> = 60 km/h:</strong></p>
              <FormulaBox
                latex="m_A v_A - m_B v_B = (m_A + m_B) \cdot 27"
                variant="blue"
              />
              <FormulaBox
                latex="v_A = \frac{(m_A+m_B) \cdot 27 + m_B \cdot 60}{m_A} = \frac{2400 \cdot 27 + 900 \cdot 60}{1500} = \underline{\underline{79{,}2\;\text{km/h}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Bil A kjørte nesten 80 km/h — godt over fartsgrensen. Fysikken avslører den skyldige!
              </p>
            </div>
          }
        />

        {/* Høst 2023 — Oppgave 3d (bowlingkule) */}
        <ExerciseCard
          number={4}
          title="Eksamen høst 2023, oppg. 3d — Bowlingkule: bevegelsesmengde"
          difficulty="middels"
          source="Eksamen høst 2023"
          problem={
            <div>
              <p>
                En bowlingkule (<InlineLatex latex="m = 5{,}2\;\text{kg}" />) ruller med
                fart <InlineLatex latex="v = 7{,}3\;\text{m/s}" /> utfor en 2,0 m høy kant.
              </p>
              <p className="mt-2">Hvor treffer kulen bakken, og hva er bevegelsesmengden i det den treffer?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Prosjektilbevegelse: v₀ₓ = 7,3 m/s, v₀y = 0. Finn falltid fra y = ½gt², deretter x = v₀ₓ·t.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Bevegelsesmengde: finn total fart v = √(vₓ² + vy²), deretter p = mv.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Falltid:</strong></p>
              <FormulaBox
                latex="t = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2 \cdot 2{,}0}{9{,}81}} = 0{,}639\;\text{s}"
                variant="blue"
              />
              <p><strong>Horisontal avstand:</strong></p>
              <FormulaBox
                latex="x = v_{0x} \cdot t = 7{,}3 \cdot 0{,}639 = \underline{\underline{4{,}66\;\text{m}}}"
                variant="gold"
              />
              <p><strong>Vertikal hastighet ved bakken:</strong></p>
              <FormulaBox
                latex="v_y = gt = 9{,}81 \cdot 0{,}639 = 6{,}27\;\text{m/s}"
                variant="blue"
              />
              <p><strong>Total fart og bevegelsesmengde:</strong></p>
              <FormulaBox
                latex="v = \sqrt{7{,}3^2 + 6{,}27^2} = 9{,}62\;\text{m/s}"
                variant="blue"
              />
              <FormulaBox
                latex="p = mv = 5{,}2 \cdot 9{,}62 = \underline{\underline{50\;\text{kg·m/s}}}"
                variant="gold"
              />
            </div>
          }
        />

        {/* Høst 2023 — Oppgave 1d (sprengning) */}
        <ExerciseCard
          number={5}
          title="Eksamen høst 2023, oppg. 1d — Prosjektil som sprenges"
          difficulty="vanskelig"
          source="Eksamen høst 2023"
          problem={
            <div>
              <p>
                Et prosjektil med horisontal fart <InlineLatex latex="v_{0x} = 53{,}2\;\text{m/s}" /> i
                det høyeste punktet (<InlineLatex latex="y_0 = 186\;\text{m}" />, <InlineLatex latex="x_0 = 202{,}3\;\text{m}" />)
                sprenges i to like store deler. Den ene delen faller loddrett ned (<InlineLatex latex="v = 0" />).
              </p>
              <p className="mt-2">Hvor treffer den andre delen bakken?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bevaring av bevegelsesmengde ved sprengning: m·v₀ₓ = (m/2)·0 + (m/2)·vₓ → den andre delen får dobbel horisontal fart.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Fritt fall fra 186 m: finn falltid, deretter x = x₀ + vₓ·t.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Bevaring av bevegelsesmengde (horisontalt):</strong></p>
              <FormulaBox
                latex="m \cdot v_{0x} = \frac{m}{2} \cdot 0 + \frac{m}{2} \cdot v_x \;\Rightarrow\; v_x = 2 \cdot v_{0x} = 106{,}5\;\text{m/s}"
                variant="blue"
              />
              <p><strong>Falltid fra toppunktet:</strong></p>
              <FormulaBox
                latex="t = \sqrt{\frac{2 \cdot 186}{9{,}81}} = 6{,}16\;\text{s}"
                variant="blue"
              />
              <p><strong>Treffpunkt:</strong></p>
              <FormulaBox
                latex="x = 202{,}3 + 106{,}5 \cdot 6{,}16 = \underline{\underline{858\;\text{m fra startpunktet}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Ved sprengning bevares p<sub>total</sub>. Når én del mister all horisontal fart, må den andre kompensere — den flyr dobbelt så langt!</p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
