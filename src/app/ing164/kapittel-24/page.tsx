"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 24)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Platekondensator-kalkulator ─── */
function CapacitorCalculator() {
  const [area, setArea] = useState(100); // cm²
  const [distance, setDistance] = useState(1.0); // mm
  const [voltage, setVoltage] = useState(100); // V
  const [K, setK] = useState(1.0); // dielektrikumkonstant

  const eps0 = 8.854e-12;
  const A_m2 = area * 1e-4;
  const d_m = distance * 1e-3;
  const C = K * eps0 * A_m2 / d_m;
  const Q = C * voltage;
  const E_field = voltage / d_m;
  const energy = 0.5 * C * voltage * voltage;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Platekondensator — Kalkulator</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Plateareal A (cm²)
          </label>
          <input
            type="range"
            min={1}
            max={500}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{area} cm²</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Plateavstand d (mm)
          </label>
          <input
            type="range"
            min={0.1}
            max={10}
            step={0.1}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{distance.toFixed(1)} mm</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Spenning V (Volt)
          </label>
          <input
            type="range"
            min={1}
            max={5000}
            step={1}
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{voltage} V</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Dielektrikumkonstant K
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={K}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">K = {K.toFixed(1)} {K === 1 ? "(vakuum)" : K <= 2.5 ? "(luft/plast)" : K <= 5 ? "(glass)" : "(keramikk)"}</p>
        </div>
      </div>

      {/* SVG Visualization */}
      <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto mb-4">
        {/* Plates */}
        <rect x="80" y="30" width="8" height="120" fill="#ef4444" rx="2" />
        <rect x="312" y="30" width="8" height="120" fill="#3b82f6" rx="2" />
        {/* + and - signs */}
        <text x="72" y="95" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">+</text>
        <text x="336" y="95" textAnchor="middle" fill="#3b82f6" fontSize="18" fontWeight="bold">−</text>
        {/* Electric field arrows */}
        {[50, 70, 90, 110, 130].map((y) => (
          <line key={y} x1="100" y1={y} x2="300" y2={y} stroke="var(--muted)" strokeWidth="1" opacity="0.4" markerEnd="url(#cap-arrow)" />
        ))}
        {/* Dielectric fill if K > 1 */}
        {K > 1 && (
          <rect x="95" y="32" width="213" height="116" fill="#22c55e" opacity="0.12" rx="4" />
        )}
        {K > 1 && (
          <text x="200" y="170" textAnchor="middle" fill="#22c55e" fontSize="11">dielektrikum (K = {K.toFixed(1)})</text>
        )}
        {/* Distance label */}
        <line x1="88" y1="158" x2="312" y2="158" stroke="var(--muted)" strokeWidth="1" />
        <text x="200" y="155" textAnchor="middle" fill="var(--muted)" fontSize="11">d = {distance.toFixed(1)} mm</text>
        {/* Labels */}
        <text x="84" y="22" textAnchor="middle" fill="var(--muted)" fontSize="10">+Q</text>
        <text x="316" y="22" textAnchor="middle" fill="var(--muted)" fontSize="10">−Q</text>
        <defs>
          <marker id="cap-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="var(--muted)" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">Kapasitans C</p>
          <p className="text-lg font-bold">{C < 1e-9 ? (C * 1e12).toFixed(2) + " pF" : (C * 1e9).toFixed(3) + " nF"}</p>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
          <p className="text-xs text-[var(--muted)]">Ladning Q</p>
          <p className="text-lg font-bold">{Q < 1e-6 ? (Q * 1e9).toFixed(3) + " nC" : (Q * 1e6).toFixed(3) + " µC"}</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
          <p className="text-xs text-[var(--muted)]">E-felt</p>
          <p className="text-lg font-bold">{E_field < 1e6 ? (E_field / 1e3).toFixed(1) + " kV/m" : (E_field / 1e6).toFixed(2) + " MV/m"}</p>
        </div>
        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
          <p className="text-xs text-[var(--muted)]">Lagret energi</p>
          <p className="text-lg font-bold">{energy < 1e-6 ? (energy * 1e9).toFixed(2) + " nJ" : energy < 1e-3 ? (energy * 1e6).toFixed(2) + " µJ" : (energy * 1e3).toFixed(2) + " mJ"}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive: Serie/parallell-kalkulator ─── */
function SeriesParallelCalculator() {
  const [c1, setC1] = useState(6); // µF
  const [c2, setC2] = useState(3); // µF
  const [v, setV] = useState(18); // V
  const [mode, setMode] = useState<"serie" | "parallell">("serie");

  const C1 = c1 * 1e-6;
  const C2 = c2 * 1e-6;
  const Ctot = mode === "serie" ? 1 / (1 / C1 + 1 / C2) : C1 + C2;

  // Serie: same Q, different V
  // Parallell: same V, different Q
  const Q_serie = Ctot * v;
  const V1_serie = Q_serie / C1;
  const V2_serie = Q_serie / C2;

  const Q1_par = C1 * v;
  const Q2_par = C2 * v;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Serie- og parallellkobling</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("serie")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === "serie" ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] border border-[var(--card-border)]"}`}
        >
          Serie
        </button>
        <button
          onClick={() => setMode("parallell")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${mode === "parallell" ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] border border-[var(--card-border)]"}`}
        >
          Parallell
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">C₁ (µF)</label>
          <input type="range" min={1} max={20} value={c1} onChange={(e) => setC1(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{c1} µF</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">C₂ (µF)</label>
          <input type="range" min={1} max={20} value={c2} onChange={(e) => setC2(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{c2} µF</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">V (Volt)</label>
          <input type="range" min={1} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
          <p className="text-center text-sm font-mono mt-1">{v} V</p>
        </div>
      </div>

      {/* SVG circuit diagram */}
      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto mb-4">
        {mode === "serie" ? (
          <>
            {/* Serie: C1 --||-- C2 --||-- */}
            <line x1="20" y1="60" x2="100" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <line x1="100" y1="30" x2="100" y2="90" stroke="#ef4444" strokeWidth="3" />
            <line x1="110" y1="30" x2="110" y2="90" stroke="#3b82f6" strokeWidth="3" />
            <line x1="110" y1="60" x2="200" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <line x1="200" y1="30" x2="200" y2="90" stroke="#ef4444" strokeWidth="3" />
            <line x1="210" y1="30" x2="210" y2="90" stroke="#3b82f6" strokeWidth="3" />
            <line x1="210" y1="60" x2="380" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <text x="105" y="105" textAnchor="middle" fill="var(--muted)" fontSize="11">C₁={c1}µF</text>
            <text x="205" y="105" textAnchor="middle" fill="var(--muted)" fontSize="11">C₂={c2}µF</text>
            <text x="20" y="50" fill="var(--muted)" fontSize="10">a</text>
            <text x="375" y="50" fill="var(--muted)" fontSize="10">b</text>
            <text x="200" y="18" textAnchor="middle" fill="var(--accent)" fontSize="11">V = {v} V</text>
          </>
        ) : (
          <>
            {/* Parallell */}
            <line x1="20" y1="60" x2="80" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <line x1="80" y1="30" x2="80" y2="90" stroke="var(--muted)" strokeWidth="2" />
            {/* C1 branch */}
            <line x1="80" y1="35" x2="160" y2="35" stroke="var(--muted)" strokeWidth="2" />
            <line x1="160" y1="20" x2="160" y2="50" stroke="#ef4444" strokeWidth="3" />
            <line x1="170" y1="20" x2="170" y2="50" stroke="#3b82f6" strokeWidth="3" />
            <line x1="170" y1="35" x2="280" y2="35" stroke="var(--muted)" strokeWidth="2" />
            <text x="165" y="15" textAnchor="middle" fill="var(--muted)" fontSize="10">C₁={c1}µF</text>
            {/* C2 branch */}
            <line x1="80" y1="85" x2="160" y2="85" stroke="var(--muted)" strokeWidth="2" />
            <line x1="160" y1="70" x2="160" y2="100" stroke="#ef4444" strokeWidth="3" />
            <line x1="170" y1="70" x2="170" y2="100" stroke="#3b82f6" strokeWidth="3" />
            <line x1="170" y1="85" x2="280" y2="85" stroke="var(--muted)" strokeWidth="2" />
            <text x="165" y="115" textAnchor="middle" fill="var(--muted)" fontSize="10">C₂={c2}µF</text>
            {/* Right join */}
            <line x1="280" y1="30" x2="280" y2="90" stroke="var(--muted)" strokeWidth="2" />
            <line x1="280" y1="60" x2="380" y2="60" stroke="var(--muted)" strokeWidth="2" />
            <text x="20" y="50" fill="var(--muted)" fontSize="10">a</text>
            <text x="375" y="50" fill="var(--muted)" fontSize="10">b</text>
            <text x="200" y="65" textAnchor="middle" fill="var(--accent)" fontSize="11">V = {v} V</text>
          </>
        )}
      </svg>

      <div className="grid sm:grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
          <p className="text-xs text-[var(--muted)]">C_tot</p>
          <p className="text-lg font-bold">{(Ctot * 1e6).toFixed(2)} µF</p>
        </div>
        {mode === "serie" ? (
          <>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="text-xs text-[var(--muted)]">Q (lik for begge)</p>
              <p className="text-lg font-bold">{(Q_serie * 1e6).toFixed(1)} µC</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="text-xs text-[var(--muted)]">V₁ / V₂</p>
              <p className="text-lg font-bold">{V1_serie.toFixed(1)} V / {V2_serie.toFixed(1)} V</p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="text-xs text-[var(--muted)]">Q₁ / Q₂</p>
              <p className="text-lg font-bold">{(Q1_par * 1e6).toFixed(1)} / {(Q2_par * 1e6).toFixed(1)} µC</p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="text-xs text-[var(--muted)]">V (lik for begge)</p>
              <p className="text-lg font-bold">{v} V</p>
            </div>
          </>
        )}
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {mode === "serie"
          ? "Serie: Lik ladning Q på begge. Spenningen fordeles. C_tot < minste C."
          : "Parallell: Lik spenning V over begge. Ladningen fordeles. C_tot = summen."}
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

        {/* 24.1 Kondensatorer og kapasitans */}
        <TheorySummary
          title="24.1 Kondensatorer og kapasitans"
          mustKnow={[
            "En kondensator er to ledere adskilt av en isolator (eller vakuum)",
            "Kapasitans C = Q/V_{ab} — måles i Farad (F)",
            "Platekondensator: C = ε₀A/d",
            "Kapasitansen avhenger kun av geometri, ikke av Q eller V",
          ]}
        >
          <p>
            To ledere adskilt av en isolator (eller vakuum) kalles en <strong>kondensator</strong>.
            Når den ene lederen har ladning +Q og den andre −Q, definerer vi kondensatorens kapasitans:
          </p>

          <FormulaBox
            latex="C = \frac{Q}{V_{ab}}"
            title="Definisjon av kapasitans"
            variant="gold"
            description="C i Farad (F = C/V). Q er ladningen på den positive platen. V_{ab} er potensialforskjellen (spenningen) mellom platene."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig innsikt</p>
            <p>
              Kapasitansen <InlineLatex latex="C" /> er en <strong>geometrisk egenskap</strong> — den
              avhenger kun av kondensatorens form, størrelse og materiale mellom platene.
              Den avhenger <em>ikke</em> av ladning Q eller spenning V.
            </p>
          </div>

          <p className="mt-4">
            For to parallelle plater med areal A og innbyrdes avstand d (i vakuum):
          </p>
          <FormulaBox
            latex="C = \varepsilon_0 \frac{A}{d}"
            title="Platekondensator (vakuum)"
            variant="gold"
            description="ε₀ = 8,854 · 10⁻¹² C²/Nm² er vakuumpermittiviteten. A er platens areal. d er avstanden mellom platene."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Typiske størrelser</p>
            <p className="text-sm">1 Farad er enormt! Typiske kondensatorer har kapasitanser i:</p>
            <ul className="text-sm mt-1 space-y-0.5">
              <li>• pikofarad: 1 pF = 10⁻¹² F</li>
              <li>• nanofarad: 1 nF = 10⁻⁹ F</li>
              <li>• mikrofarad: 1 µF = 10⁻⁶ F</li>
            </ul>
          </div>

          <p className="mt-4">
            <strong>E-feltet</strong> mellom parallelle plater er uniformt og gitt ved:
          </p>
          <FormulaBox
            latex="E = \frac{V_{ab}}{d}"
            variant="blue"
            description="E-feltet peker fra positiv til negativ plate."
          />
        </TheorySummary>

        {/* 24.2 Kondensatorer i serie og parallell */}
        <TheorySummary
          title="24.2 Kondensatorer i serie og parallell"
          mustKnow={[
            "Serie: Lik ladning Q, spenningen fordeles, 1/C_tot = 1/C₁ + 1/C₂ + ...",
            "Parallell: Lik spenning V, ladningen fordeles, C_tot = C₁ + C₂ + ...",
            "Kunne kombinere serie og parallell i sammensatte nettverk",
          ]}
        >
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Seriekobling</p>
            <p>
              Kondensatorer i <strong>serie</strong> har <strong>lik ladning Q</strong> på alle plater.
              Spenningen fordeles: <InlineLatex latex="V_{ab} = V_1 + V_2 + \cdots" />
            </p>
          </div>

          <FormulaBox
            latex="\frac{1}{C_\text{tot}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots + \frac{1}{C_n}"
            title="Kondensatorer i serie"
            variant="gold"
            description="Totalkapasitansen i serie er alltid MINDRE enn den minste enkeltkapasitansen."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Parallellkobling</p>
            <p>
              Kondensatorer i <strong>parallell</strong> har <strong>lik spenning V</strong>.
              Ladningen fordeles: <InlineLatex latex="Q_\text{tot} = Q_1 + Q_2 + \cdots" />
            </p>
          </div>

          <FormulaBox
            latex="C_\text{tot} = C_1 + C_2 + \cdots + C_n"
            title="Kondensatorer i parallell"
            variant="gold"
            description="Totalkapasitansen i parallell er summen av alle enkeltkapasitansene."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Huskeregel: Motsetninger</p>
            <p className="text-sm">
              Kondensatorer i serie oppfører seg <strong>motsatt</strong> av motstander i serie:
            </p>
            <ul className="text-sm mt-1 space-y-0.5">
              <li>• Kondensatorer i serie → addér inversene (som motstander i parallell)</li>
              <li>• Kondensatorer i parallell → addér direkte (som motstander i serie)</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 24.3 Energilagring */}
        <TheorySummary
          title="24.3 Energilagring i kondensatorer og elektrisk-felt-energi"
          mustKnow={[
            "Lagret energi: E_p = Q²/2C = ½CV² = ½QV",
            "Energitetthet i E-felt: u = ½ε₀E²",
            "Energien lagres i det elektriske feltet mellom platene",
          ]}
        >
          <p>
            Den lagrede energien i en kondensator er lik det arbeidet vi må utføre for å lade den opp.
            Denne energien kan hentes ut raskt — brukes i blitz, laserpuls, defibrillatorer etc.
          </p>

          <FormulaBox
            latex="E_p = \frac{Q^2}{2C} = \frac{1}{2}CV^2 = \frac{1}{2}QV"
            title="Potensiell energi lagret i kondensator"
            variant="gold"
            description="Tre ekvivalente uttrykk. Velg det som passer til de kjente størrelsene."
          />

          <p className="mt-4">
            Energien er egentlig lagret i <strong>det elektriske feltet</strong> mellom platene.
            Vi definerer energitetthet (energi per volum):
          </p>

          <FormulaBox
            latex="u = \frac{E_p}{V_\text{olum}} = \frac{1}{2}\varepsilon_0 E^2"
            title="Energitetthet i elektrisk felt"
            variant="gold"
            description="u har enhet J/m³. Gjelder generelt for ALLE elektriske felt, ikke bare i kondensatorer."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig kobling</p>
            <p className="text-sm">
              For en platekondensator er volumet mellom platene <InlineLatex latex="V_\text{olum} = A \cdot d" />.
              Setter vi inn <InlineLatex latex="C = \varepsilon_0 A/d" /> og <InlineLatex latex="V_{ab} = E \cdot d" /> i
              {" "}<InlineLatex latex="\frac{1}{2}CV_{ab}^2" />, får vi nettopp <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> ganger volumet.
            </p>
          </div>
        </TheorySummary>

        {/* 24.4 Dielektrikum */}
        <TheorySummary
          title="24.4 Dielektrikum"
          mustKnow={[
            "Dielektrikumkonstanten K = C/C₀ (alltid ≥ 1)",
            "Dielektrikum øker kapasitansen med faktor K",
            "Dielektrikum reduserer E-feltet: E = E₀/K",
            "Permittivitet: ε = Kε₀",
            "Indusert ladning: Q_i = Q(1 − 1/K)",
          ]}
        >
          <p>
            Mellom platene på en kondensator kan det være et isolerende materiale (<strong>dielektrikum</strong>)
            istedet for vakuum. Et dielektrikum gir tre fordeler:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Hindrer at platene kommer i kontakt med hverandre</li>
            <li>Gjør det mulig å oppnå større spenning uten overslag</li>
            <li>Gjør at kondensatoren får <strong>større kapasitans</strong></li>
          </ul>

          <FormulaBox
            latex="K = \frac{C}{C_0}"
            title="Dielektrikumkonstanten"
            variant="gold"
            description="K er forholdet mellom kapasitansen med og uten dielektrikum. K = 1 for vakuum, K > 1 ellers."
          />

          <p className="mt-4">
            <strong>Indusert ladning og polarisering:</strong> Når vi setter et dielektrikum inn mellom
            platene på en ladet kondensator (frakoblet spenningskilde), er ladningen Q den samme,
            men spenningen synker til <InlineLatex latex="V = V_0/K" />.
          </p>

          <FormulaBox
            latex="E = \frac{E_0}{K} = \frac{\sigma - \sigma_i}{\varepsilon_0}"
            variant="blue"
            description="E-feltet reduseres med faktor K pga. polarisering av dielektrikumet."
          />

          <p className="mt-4">
            Den <strong>induserte ladningen</strong> på dielektrikumets overflate:
          </p>
          <FormulaBox
            latex="Q_i = Q\!\left(1 - \frac{1}{K}\right)"
            variant="blue"
            description="Indusert ladning — mindre enn den frie ladningen Q, motvirker E-feltet delvis."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Permittivitet</p>
            <p>Dielektrikumets elektriske permittivitet er:</p>
            <div className="mt-2">
              <InlineLatex latex="\varepsilon = K\varepsilon_0" />
            </div>
            <p className="text-sm mt-2">
              Med dielektrikum bytter vi ut <InlineLatex latex="\varepsilon_0" /> med <InlineLatex latex="\varepsilon" /> i alle formler:
            </p>
            <ul className="text-sm mt-1 space-y-0.5">
              <li>• <InlineLatex latex="C = K C_0 = K\varepsilon_0 \frac{A}{d} = \varepsilon \frac{A}{d}" /></li>
              <li>• <InlineLatex latex="u = \frac{1}{2}\varepsilon E^2 = \frac{1}{2}K\varepsilon_0 E^2" /></li>
            </ul>
          </div>
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox
            latex="C = \frac{Q}{V_{ab}}"
            title="Definisjon av kapasitans"
            variant="gold"
          />
          <FormulaBox
            latex="C = \varepsilon_0 \frac{A}{d}"
            title="Platekondensator (vakuum)"
            variant="gold"
          />
          <FormulaBox
            latex="\frac{1}{C_\text{tot}} = \frac{1}{C_1} + \frac{1}{C_2} + \cdots"
            title="Kondensatorer i serie"
            variant="gold"
          />
          <FormulaBox
            latex="C_\text{tot} = C_1 + C_2 + \cdots"
            title="Kondensatorer i parallell"
            variant="gold"
          />
          <FormulaBox
            latex="E_p = \frac{Q^2}{2C} = \frac{1}{2}CV^2 = \frac{1}{2}QV"
            title="Lagret energi"
            variant="gold"
          />
          <FormulaBox
            latex="u = \frac{1}{2}\varepsilon_0 E^2"
            title="Energitetthet i E-felt"
            variant="gold"
          />
          <FormulaBox
            latex="K = \frac{C}{C_0}, \quad \varepsilon = K\varepsilon_0"
            title="Dielektrikumkonstant og permittivitet"
            variant="blue"
          />
          <FormulaBox
            latex="Q_i = Q\!\left(1 - \frac{1}{K}\right)"
            title="Indusert ladning"
            variant="blue"
          />
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
                  <td className="py-2 pr-4">Kapasitans fra Q og V</td>
                  <td className="py-2 pr-4"><InlineLatex latex="C = Q/V" /></td>
                  <td className="py-2">Q er ladningen på ÉN plate</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kapasitans fra geometri</td>
                  <td className="py-2 pr-4"><InlineLatex latex="C = \varepsilon_0 A/d" /></td>
                  <td className="py-2">A i m², d i m</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Total C i serie</td>
                  <td className="py-2 pr-4">Addér inversene</td>
                  <td className="py-2">Q er lik, V fordeles</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Total C i parallell</td>
                  <td className="py-2 pr-4">Addér direkte</td>
                  <td className="py-2">V er lik, Q fordeles</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Lagret energi</td>
                  <td className="py-2 pr-4"><InlineLatex latex="E_p = \frac{1}{2}CV^2" /></td>
                  <td className="py-2">Tre likeverdige uttrykk — velg etter kjente</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Effekt av dielektrikum</td>
                  <td className="py-2 pr-4"><InlineLatex latex="C = KC_0" /></td>
                  <td className="py-2">Bytt ε₀ → ε = Kε₀</td>
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
        <CapacitorCalculator />
        <SeriesParallelCalculator />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Platekondensator */}
        <ExerciseCard
          number={1}
          title="Platekondensator — kapasitans, ladning og E-felt"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>To parallelle plater med avstand <InlineLatex latex="d = 0{,}001\;\text{m}" /> og areal <InlineLatex latex="A = 1\;\text{cm}^2 = 0{,}0001\;\text{m}^2" /> er plassert i vakuum.</p>
              <p className="mt-2">a) Finn kapasitansen.</p>
              <p>b) Platene kobles til en spenningskilde på 5000 V. Hvor mye ladning er det på hver plate?</p>
              <p>c) Hva er feltstyrken mellom platene?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bruk <InlineLatex latex="C = \varepsilon_0 A/d" /> for kapasitansen.</p> },
            { label: "Hint 2", content: <p>Ladning: <InlineLatex latex="Q = C \cdot V_{ab}" />. E-felt: <InlineLatex latex="E = V_{ab}/d" />.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kapasitans:</strong></p>
              <FormulaBox
                latex="C = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}0001}{0{,}001} = \underline{\underline{8{,}85 \cdot 10^{-13}\;\text{F} \approx 0{,}885\;\text{pF}}}"
                variant="gold"
              />

              <p><strong>b) Ladning:</strong></p>
              <FormulaBox
                latex="Q = C \cdot V_{ab} = 8{,}85 \cdot 10^{-13} \cdot 5000 = \underline{\underline{4{,}43 \cdot 10^{-9}\;\text{C} \approx 4{,}43\;\text{nC}}}"
                variant="gold"
              />

              <p><strong>c) Feltstyrke:</strong></p>
              <FormulaBox
                latex="E = \frac{V_{ab}}{d} = \frac{5000}{0{,}001} = \underline{\underline{5{,}0 \cdot 10^6\;\text{V/m}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Selv med liten kapasitans (pF) kan spenningskilden lagre noen nC. E-feltet mellom platene kan bli svært sterkt.</p>
            </div>
          }
        />

        {/* Eksempel 2: Kondensatorer i serie */}
        <ExerciseCard
          number={2}
          title="To kondensatorer i serie"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                <InlineLatex latex="C_1 = 6\;\mu\text{F}" /> og <InlineLatex latex="C_2 = 3\;\mu\text{F}" /> kobles
                i serie til en spenningskilde <InlineLatex latex="V_{ab} = 18\;\text{V}" />.
              </p>
              <p className="mt-2">Finn total kapasitans, ladningen, og spenningen over hver kondensator.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>I serie adderes inversene: <InlineLatex latex="1/C_\text{tot} = 1/C_1 + 1/C_2" /></p> },
            { label: "Hint 2", content: <p>I serie er ladningen lik: <InlineLatex latex="Q = C_\text{tot} \cdot V_{ab}" />. Finn spenningene med <InlineLatex latex="V = Q/C" />.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Totalkapasitans:</strong></p>
              <FormulaBox
                latex="\frac{1}{C_\text{tot}} = \frac{1}{6} + \frac{1}{3} = \frac{1}{6} + \frac{2}{6} = \frac{3}{6} = \frac{1}{2} \quad \Rightarrow \quad \underline{\underline{C_\text{tot} = 2\;\mu\text{F}}}"
                variant="gold"
              />
              <p><strong>Ladning (lik for begge):</strong></p>
              <FormulaBox
                latex="Q = C_\text{tot} \cdot V_{ab} = 2 \cdot 10^{-6} \cdot 18 = \underline{\underline{36\;\mu\text{C}}}"
                variant="gold"
              />
              <p><strong>Spenning over hver:</strong></p>
              <FormulaBox
                latex="V_1 = \frac{Q}{C_1} = \frac{36}{6} = \underline{\underline{6\;\text{V}}}, \quad V_2 = \frac{Q}{C_2} = \frac{36}{3} = \underline{\underline{12\;\text{V}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">Sjekk: V₁ + V₂ = 6 + 12 = 18 V ✓</p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> I serie er ladningen lik på alle, men den minste kapasitansen får størst spenning.</p>
            </div>
          }
        />

        {/* Eksempel 3: Energilagring og omfordeling */}
        <ExerciseCard
          number={3}
          title="Energilagring — opplading og omkobling"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                <InlineLatex latex="C_1 = 8\;\mu\text{F}" /> lades opp til 120 V. Spenningskilden fjernes.
                Kondensatoren kobles deretter i parallell med en uladet <InlineLatex latex="C_2 = 4\;\mu\text{F}" />.
              </p>
              <p className="mt-2">a) Finn den opprinnelige ladningen <InlineLatex latex="Q_0" />.</p>
              <p>b) Hvor mye energi er lagret i <InlineLatex latex="C_1" /> opprinnelig?</p>
              <p>c) Finn spenningen og ladningene etter omkobling.</p>
              <p>d) Hva er total energi etterpå? Hva skjedde med den «tapte» energien?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p><InlineLatex latex="Q_0 = C_1 \cdot V_0" />. Energi: <InlineLatex latex="E_p = \frac{1}{2}Q_0 V_0" />.</p> },
            { label: "Hint 2", content: <p>Etter omkobling: ladning er bevart (<InlineLatex latex="Q_1 + Q_2 = Q_0" />) og spenningen er lik over begge (<InlineLatex latex="V_1 = V_2 = V" />).</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Opprinnelig ladning:</strong></p>
              <FormulaBox latex="Q_0 = C_1 \cdot V_0 = 8 \cdot 10^{-6} \cdot 120 = \underline{\underline{960\;\mu\text{C}}}" variant="gold" />

              <p><strong>b) Opprinnelig energi:</strong></p>
              <FormulaBox latex="E_p = \frac{1}{2}Q_0 V_0 = \frac{1}{2} \cdot 960 \cdot 10^{-6} \cdot 120 = \underline{\underline{0{,}058\;\text{J}}}" variant="gold" />

              <p><strong>c) Etter parallellkobling:</strong></p>
              <p className="text-sm">Ladning er bevart: <InlineLatex latex="Q_1 + Q_2 = Q_0" />. Lik spenning: <InlineLatex latex="V = Q_1/C_1 = Q_2/C_2" />.</p>
              <FormulaBox latex="V = \frac{Q_0}{C_1 + C_2} = \frac{960 \cdot 10^{-6}}{(8 + 4) \cdot 10^{-6}} = \underline{\underline{80\;\text{V}}}" variant="gold" />
              <FormulaBox latex="Q_1 = C_1 V = \underline{\underline{640\;\mu\text{C}}}, \quad Q_2 = C_2 V = \underline{\underline{320\;\mu\text{C}}}" variant="gold" />

              <p><strong>d) Energi etterpå:</strong></p>
              <FormulaBox latex="E_p' = \frac{1}{2}Q_1 V + \frac{1}{2}Q_2 V = \frac{1}{2}(640 + 320) \cdot 10^{-6} \cdot 80 = \underline{\underline{0{,}038\;\text{J}}}" variant="gold" />
              <p className="text-sm text-[var(--muted)]">
                Energitap: 0,058 − 0,038 = 0,020 J. Energien er tapt til varme og elektromagnetisk stråling
                i ledningene under omkoblingen.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Når ladning omfordeles mellom kondensatorer, går ALLTID noe energi tapt. Ladningen er bevart, men energien er det ikke!</p>
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
            <h3 className="font-semibold text-lg mb-3">Strategi: Kondensator-oppgaver</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Identifiser type: platekondensator, serie, parallell, eller kombinasjon?</li>
              <li>Konverter enheter: µF, nF, pF → F. cm², mm → m², m.</li>
              <li>Beregn kapasitans fra geometri (<InlineLatex latex="C = \varepsilon_0 A/d" />) eller fra serie/parallell-regler</li>
              <li>Bruk <InlineLatex latex="C = Q/V" /> for å finne ukjente</li>
              <li>Sjekk: I serie er C_tot &lt; minste C. I parallell er C_tot = summen.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Serie/parallell-nettverk</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Start innerst — finn grupper som er rent i serie eller rent i parallell</li>
              <li>Beregn ekvivalent kapasitans for hver gruppe</li>
              <li>Erstatt gruppen med én kondensator og gjenta</li>
              <li>Når du har C_tot, finn Q og V for hele kretsen</li>
              <li>Jobb deg tilbake utover for å finne Q og V for hver enkelt kondensator</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Energi og dielektrikum</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Bestem om kondensatoren er koblet til spenningskilde (V konstant) eller frakoblet (Q konstant)</li>
              <li>Hvis V konstant: <InlineLatex latex="C \to KC_0" />, <InlineLatex latex="Q \to KQ_0" />, <InlineLatex latex="E_p \to KE_{p0}" /></li>
              <li>Hvis Q konstant: <InlineLatex latex="C \to KC_0" />, <InlineLatex latex="V \to V_0/K" />, <InlineLatex latex="E_p \to E_{p0}/K" /></li>
              <li>Bruk riktig energiformel basert på det som er kjent</li>
            </ol>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
            <ul className="space-y-1.5 text-sm">
              <li>• Blander serie- og parallell-regler (husk: motsatt av motstander!)</li>
              <li>• Glemmer å konvertere cm² → m², mm → m</li>
              <li>• Antar at energi er bevart ved ladningsomfordeling (nei, noe går tapt)</li>
              <li>• Blander om Q er konstant eller V er konstant ved innsetting av dielektrikum</li>
              <li>• Glemmer at <InlineLatex latex="E = V/d" />, ikke <InlineLatex latex="E = V \cdot d" /></li>
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
          title="Platekondensator med elektron"
          difficulty="middels"
          source="Oblig 3, oppg. 2"
          problem={
            <div>
              <p>
                To plane, parallelle metallskiver er plassert i innbyrdes avstand 0,050 m.
                Platene er koplet til en spenningskilde på 500 V.
              </p>
              <p className="mt-2">a) Forklar hva vi mener med et uniformt elektrisk felt. Hva blir den elektriske feltstyrken mellom platene?</p>
              <p>b) Et elektron slippes fra ro ved den negative plata. Hvilken fart har elektronet når det treffer den positive plata? Hvor lang tid bruker det?</p>
              <p>c) Metallskivene er sirkulære med radius 0,25 m. Beregn systemets kapasitans. Hvor mye ladning er samlet på hver plate?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Uniformt felt: konstant styrke og retning. <InlineLatex latex="E = V/d" />.</p> },
            { label: "Hint 2", content: <p>Elektronen akselereres: <InlineLatex latex="a = eE/m_e" />. Bruk kinematikk: <InlineLatex latex="v^2 = 2ad" />.</p> },
            { label: "Hint 3", content: <p>Sirkulært areal: <InlineLatex latex="A = \pi r^2" />. Kapasitans: <InlineLatex latex="C = \varepsilon_0 A/d" />.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) E-felt:</strong></p>
              <p className="text-sm">Et uniformt felt har lik styrke og retning overalt mellom platene (langt fra kantene).</p>
              <FormulaBox latex="E = \frac{V}{d} = \frac{500}{0{,}050} = \underline{\underline{10\,000\;\text{V/m} = 10^4\;\text{V/m}}}" variant="gold" />

              <p><strong>b) Fart og tid:</strong></p>
              <FormulaBox latex="a = \frac{eE}{m_e} = \frac{1{,}60 \cdot 10^{-19} \cdot 10^4}{9{,}11 \cdot 10^{-31}} = 1{,}76 \cdot 10^{15}\;\text{m/s}^2" variant="blue" />
              <FormulaBox latex="v = \sqrt{2ad} = \sqrt{2 \cdot 1{,}76 \cdot 10^{15} \cdot 0{,}050} = \underline{\underline{1{,}33 \cdot 10^7\;\text{m/s}}}" variant="gold" />
              <FormulaBox latex="t = \frac{v}{a} = \frac{1{,}33 \cdot 10^7}{1{,}76 \cdot 10^{15}} = \underline{\underline{7{,}5 \cdot 10^{-9}\;\text{s} \approx 7{,}5\;\text{ns}}}" variant="gold" />

              <p><strong>c) Kapasitans og ladning:</strong></p>
              <FormulaBox latex="A = \pi r^2 = \pi \cdot 0{,}25^2 = 0{,}196\;\text{m}^2" variant="blue" />
              <FormulaBox latex="C = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}196}{0{,}050} = \underline{\underline{3{,}47 \cdot 10^{-11}\;\text{F} \approx 34{,}7\;\text{pF}}}" variant="gold" />
              <FormulaBox latex="Q = CV = 3{,}47 \cdot 10^{-11} \cdot 500 = \underline{\underline{1{,}74 \cdot 10^{-8}\;\text{C} \approx 17{,}4\;\text{nC}}}" variant="gold" />
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Sammensatt nettverk"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                Betrakt et nettverk med følgende kondensatorer mellom punkt a og b:
              </p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>Tre i parallell: 3 µF, 11 µF, og en kombinasjon C&apos; (6 µF og 12 µF i serie)</li>
                <li>Disse er i serie med 9 µF</li>
              </ul>
              <p className="mt-2">Finn total kapasitans C_tot.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Start med 6 µF og 12 µF i serie: <InlineLatex latex="1/C' = 1/6 + 1/12" /></p> },
            { label: "Hint 2", content: <p>Legg så C&apos; = 4 µF i parallell med 3 µF og 11 µF. Denne i serie med 9 µF.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1:</strong> 6 µF og 12 µF i serie:</p>
              <FormulaBox latex="\frac{1}{C'} = \frac{1}{6} + \frac{1}{12} = \frac{2+1}{12} = \frac{1}{4} \quad \Rightarrow \quad C' = 4\;\mu\text{F}" variant="blue" />
              <p><strong>Steg 2:</strong> Parallell: 3 + 11 + 4 = 18 µF</p>
              <FormulaBox latex="C'' = 3 + 11 + 4 = 18\;\mu\text{F}" variant="blue" />
              <p><strong>Steg 3:</strong> 18 µF i serie med 9 µF:</p>
              <FormulaBox latex="\frac{1}{C_\text{tot}} = \frac{1}{18} + \frac{1}{9} = \frac{1+2}{18} = \frac{1}{6} \quad \Rightarrow \quad \underline{\underline{C_\text{tot} = 6\;\mu\text{F}}}" variant="gold" />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Jobb innenfra og ut — finn serie/parallell-grupper, erstatt med ekvivalent, gjenta.</p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Energitetthet i elektrisk felt"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                <InlineLatex latex="E_p = 1{,}00\;\text{J}" /> energi skal lagres i 1 m³ med vakuum i et elektrisk felt.
              </p>
              <p className="mt-2">a) Hvor sterkt E-felt behøver vi?</p>
              <p>b) Hvis E-feltet tidobles, hvor mye energi er da lagret per kubikkmeter?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Bruk <InlineLatex latex="u = \frac{1}{2}\varepsilon_0 E^2" /> og løs for E.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) E-felt:</strong></p>
              <FormulaBox latex="u = \frac{E_p}{V} = \frac{1}{2}\varepsilon_0 E^2 \quad \Rightarrow \quad E = \sqrt{\frac{2E_p}{\varepsilon_0 V}}" variant="blue" />
              <FormulaBox latex="E = \sqrt{\frac{2 \cdot 1{,}00}{8{,}854 \cdot 10^{-12} \cdot 1}} = \underline{\underline{4{,}75 \cdot 10^5\;\text{V/m}}}" variant="gold" />

              <p><strong>b) Dobling av E:</strong></p>
              <p className="text-sm">Siden <InlineLatex latex="u \propto E^2" />, tidobling av E gir 100× mer energi:</p>
              <FormulaBox latex="E' = 4{,}75 \cdot 10^6\;\text{V/m}" variant="blue" />
              <FormulaBox latex="u' = \frac{1}{2}\varepsilon_0 (E')^2 = \underline{\underline{100\;\text{J/m}^3}}" variant="gold" />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energitettheten skalerer med <InlineLatex latex="E^2" /> — dobler du feltet, firedobler du energien!</p>
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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips</h4>
          <p className="text-sm">
            Kondensatoroppgaver på eksamen kombinerer ofte kapasitans-beregning med energi og/eller
            dielektrikum. Vær alltid klar over om kondensatoren er tilkoblet (V konstant) eller
            frakoblet (Q konstant) spenningskilden — dette er avgjørende for hva som endres ved
            innsetting av dielektrikum.
          </p>
        </div>

        <ExerciseCard
          number={1}
          title="Platekondensator med dielektrikum"
          difficulty="vanskelig"
          source="Oblig 3, oppg. 4"
          problem={
            <div>
              <p>
                En platekondensator er ladet slik at feltet mellom platene er <InlineLatex latex="E = 1{,}0 \cdot 10^5\;\text{V/m}" />.
                Avstanden mellom platene er <InlineLatex latex="d = 1\;\text{mm}" /> og hver plate har areal <InlineLatex latex="A = 1\;\text{cm}^2" />.
              </p>
              <p className="mt-2">a) Finn kapasitansen. Hvor stor ladning er lagret? Hvor mye potensiell energi?</p>
              <p>b) Kondensatoren kobles i parallell med en identisk kondensator. Hva blir kapasitansen?</p>
              <p>c) Vi ser på kun den første kondensatoren. Den får et dielektrikum med <InlineLatex latex="K = 4" />. Finn permittiviteten og den nye kapasitansen.</p>
              <p>d) Hvor mye energi er nå lagret i kondensatoren?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Start med <InlineLatex latex="C = \varepsilon_0 A/d" />. Spenning: <InlineLatex latex="V = Ed" />. Ladning: <InlineLatex latex="Q = CV" />.</p> },
            { label: "Hint 2", content: <p>Parallell: <InlineLatex latex="C_\text{tot} = 2C" />. Med dielektrikum: <InlineLatex latex="C' = KC_0" />. Vær obs — er Q eller V konstant?</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kapasitans, ladning og energi:</strong></p>
              <FormulaBox latex="C_0 = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{10^{-4}}{10^{-3}} = \underline{\underline{8{,}854 \cdot 10^{-13}\;\text{F} \approx 0{,}885\;\text{pF}}}" variant="gold" />
              <FormulaBox latex="V_0 = Ed = 10^5 \cdot 10^{-3} = 100\;\text{V}" variant="blue" />
              <FormulaBox latex="Q_0 = C_0 V_0 = 8{,}854 \cdot 10^{-13} \cdot 100 = \underline{\underline{8{,}854 \cdot 10^{-11}\;\text{C} \approx 88{,}5\;\text{pC}}}" variant="gold" />
              <FormulaBox latex="E_p = \frac{1}{2}C_0 V_0^2 = \frac{1}{2} \cdot 8{,}854 \cdot 10^{-13} \cdot 100^2 = \underline{\underline{4{,}43 \cdot 10^{-9}\;\text{J} \approx 4{,}43\;\text{nJ}}}" variant="gold" />

              <p><strong>b) Parallellkobling:</strong></p>
              <FormulaBox latex="C_\text{tot} = C_0 + C_0 = 2C_0 = \underline{\underline{1{,}77\;\text{pF}}}" variant="gold" />

              <p><strong>c) Med dielektrikum (K = 4):</strong></p>
              <FormulaBox latex="\varepsilon = K\varepsilon_0 = 4 \cdot 8{,}854 \cdot 10^{-12} = \underline{\underline{3{,}54 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2}}" variant="gold" />
              <FormulaBox latex="C = KC_0 = 4 \cdot 0{,}885 = \underline{\underline{3{,}54\;\text{pF}}}" variant="gold" />

              <p><strong>d) Energi med dielektrikum:</strong></p>
              <p className="text-sm">Kondensatoren er frakoblet — Q er konstant, V synker:</p>
              <FormulaBox latex="V = \frac{V_0}{K} = \frac{100}{4} = 25\;\text{V}" variant="blue" />
              <FormulaBox latex="E_p' = \frac{1}{2}CV^2 = \frac{1}{2} \cdot 3{,}54 \cdot 10^{-12} \cdot 25^2 = \underline{\underline{1{,}11\;\text{nJ}}}" variant="gold" />
              <p className="text-sm text-[var(--muted)]">Energien er redusert med faktor K = 4. Arbeid ble gjort av det elektriske feltet da dielektrikumet ble dratt inn.</p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Dielektrikum — fullstendig analyse"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En platekondensator har <InlineLatex latex="A = 2000\;\text{cm}^2" />, <InlineLatex latex="d = 1\;\text{cm}" />,
                og lades til <InlineLatex latex="V_0 = 3\;\text{kV}" />. Spenningskilden fjernes. Mellomrommet fylles med plastikk.
              </p>
              <p className="mt-2">a) Finn <InlineLatex latex="C_0" /> og <InlineLatex latex="Q_0" />.</p>
              <p>b) Spenningen endres til V = 1 kV. Finn C og K.</p>
              <p>c–d) Finn permittiviteten ε, indusert ladning Q_i.</p>
              <p>e–f) Finn E-felt før og etter dielektrikum.</p>
              <p>g–h) Finn lagret energi og energitetthet før og etter.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p><InlineLatex latex="C_0 = \varepsilon_0 A/d" />. Etter dielektrikum: Q er konstant, V synker.</p> },
            { label: "Hint 2", content: <p><InlineLatex latex="C = Q_0/V = Q_0/1000" />. <InlineLatex latex="K = C/C_0 = V_0/V" />.</p> },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a)</strong></p>
              <FormulaBox latex="C_0 = \varepsilon_0 \frac{A}{d} = 8{,}854 \cdot 10^{-12} \cdot \frac{0{,}2}{0{,}01} = \underline{\underline{177\;\text{pF}}}" variant="gold" />
              <FormulaBox latex="Q_0 = C_0 V_0 = 177 \cdot 10^{-12} \cdot 3000 = \underline{\underline{0{,}531\;\mu\text{C}}}" variant="gold" />

              <p><strong>b) Ny kapasitans og K:</strong></p>
              <FormulaBox latex="C = \frac{Q_0}{V} = \frac{0{,}531 \cdot 10^{-6}}{1000} = \underline{\underline{531\;\text{pF}}}" variant="gold" />
              <FormulaBox latex="K = \frac{C}{C_0} = \frac{531}{177} = \underline{\underline{3{,}0}}" variant="gold" />

              <p><strong>c) Permittivitet:</strong></p>
              <FormulaBox latex="\varepsilon = K\varepsilon_0 = 3{,}0 \cdot 8{,}854 \cdot 10^{-12} = \underline{\underline{2{,}66 \cdot 10^{-11}\;\text{C}^2/\text{Nm}^2}}" variant="gold" />

              <p><strong>d) Indusert ladning:</strong></p>
              <FormulaBox latex="Q_i = Q_0\!\left(1 - \frac{1}{K}\right) = 0{,}531 \cdot 10^{-6}\!\left(1 - \frac{1}{3}\right) = \underline{\underline{3{,}54 \cdot 10^{-7}\;\text{C}}}" variant="gold" />

              <p><strong>e–f) E-felt:</strong></p>
              <FormulaBox latex="E_0 = \frac{V_0}{d} = \frac{3000}{0{,}01} = \underline{\underline{3{,}0 \cdot 10^5\;\text{V/m}}}" variant="gold" />
              <FormulaBox latex="E = \frac{V}{d} = \frac{1000}{0{,}01} = \underline{\underline{1{,}0 \cdot 10^5\;\text{V/m}}}" variant="gold" />

              <p><strong>g–h) Energi og energitetthet:</strong></p>
              <FormulaBox latex="U_\text{før} = \frac{1}{2}C_0 V_0^2 = \underline{\underline{7{,}97 \cdot 10^{-4}\;\text{J}}}" variant="gold" />
              <FormulaBox latex="U_\text{etter} = \frac{1}{2}CV^2 = \underline{\underline{2{,}66 \cdot 10^{-4}\;\text{J}}}" variant="gold" />
              <FormulaBox latex="u_\text{før} = \frac{1}{2}\varepsilon_0 E_0^2 = \underline{\underline{0{,}398\;\text{J/m}^3}}" variant="gold" />
              <FormulaBox latex="u_\text{etter} = \frac{1}{2}\varepsilon E^2 = \underline{\underline{0{,}133\;\text{J/m}^3}}" variant="gold" />
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
