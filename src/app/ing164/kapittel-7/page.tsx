"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 7)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Energibevaring-visualisering ─── */
function EnergyConservationVisualizer() {
  const [height, setHeight] = useState(10);
  const [mass, setMass] = useState(2.0);
  const [position, setPosition] = useState(100); // 0=bunn, 100=topp
  const g = 9.81;

  const currentH = (position / 100) * height;
  const totalE = mass * g * height;
  const ep = mass * g * currentH;
  const ek = totalE - ep;
  const v = Math.sqrt(2 * g * (height - currentH));

  const barHeight = 120;
  const epBar = (ep / totalE) * barHeight;
  const ekBar = (ek / totalE) * barHeight;

  // Ball position on slope
  const ballX = 50 + (1 - position / 100) * 280;
  const ballY = 30 + (1 - position / 100) * 100;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Energibevaring — Ball på friksjonsfritt skråplan</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Høyde h (m)</label>
          <input
            type="range" min={1} max={30} step={0.5} value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{height.toFixed(1)} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse m (kg)</label>
          <input
            type="range" min={0.5} max={10} step={0.5} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{mass.toFixed(1)} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Posisjon (topp → bunn)</label>
          <input
            type="range" min={0} max={100} value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{(100 - position)}% ned</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {/* Slope visualization */}
        <svg viewBox="0 0 360 160" className="w-full max-w-sm">
          {/* Slope */}
          <polygon points="40,30 340,130 40,130" fill="var(--card-border)" opacity="0.3" />
          <line x1="40" y1="30" x2="340" y2="130" stroke="var(--muted)" strokeWidth="2" />
          <line x1="40" y1="130" x2="340" y2="130" stroke="var(--muted)" strokeWidth="2" />
          {/* Height line */}
          <line x1="40" y1="30" x2="40" y2="130" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
          <text x="25" y="85" fill="#3b82f6" fontSize="11" textAnchor="middle">h</text>
          {/* Ball */}
          <circle cx={ballX} cy={ballY} r="10" fill="var(--accent)" />
          {/* Labels */}
          <text x="40" y="20" fill="var(--muted)" fontSize="10" textAnchor="middle">Topp</text>
          <text x="340" y="148" fill="var(--muted)" fontSize="10" textAnchor="middle">Bunn</text>
        </svg>

        {/* Energy bars */}
        <div className="flex gap-6 items-end">
          <div className="text-center">
            <div className="w-14 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg relative" style={{ height: `${barHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-200"
                style={{ height: `${epBar}px` }}
              />
            </div>
            <p className="text-xs mt-1 font-semibold text-blue-600 dark:text-blue-400">E<sub>P</sub></p>
            <p className="text-xs font-mono">{ep.toFixed(0)} J</p>
          </div>
          <div className="text-center">
            <div className="w-14 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg relative" style={{ height: `${barHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-amber-500 rounded-t-lg transition-all duration-200"
                style={{ height: `${ekBar}px` }}
              />
            </div>
            <p className="text-xs mt-1 font-semibold text-amber-600 dark:text-amber-400">E<sub>K</sub></p>
            <p className="text-xs font-mono">{ek.toFixed(0)} J</p>
          </div>
          <div className="text-center">
            <div className="w-14 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg relative" style={{ height: `${barHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all duration-200"
                style={{ height: `${barHeight}px` }}
              />
            </div>
            <p className="text-xs mt-1 font-semibold text-green-600 dark:text-green-400">E<sub>tot</sub></p>
            <p className="text-xs font-mono">{totalE.toFixed(0)} J</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 text-center mt-4">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Høyde over bunn</p>
          <p className="text-lg font-bold">{currentH.toFixed(1)} m</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Fart</p>
          <p className="text-lg font-bold">{v.toFixed(1)} m/s</p>
        </div>
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Total energi (bevart!)</p>
          <p className="text-lg font-bold">{totalE.toFixed(0)} J</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        Dra glideren for å flytte ballen. Legg merke til at E<sub>P</sub> + E<sub>K</sub> = E<sub>tot</sub> hele tiden!
      </p>
    </div>
  );
}

/* ─── Interactive: Ball kastet opp ─── */
function BallThrowVisualizer() {
  const [v0, setV0] = useState(20);
  const [currentTime, setCurrentTime] = useState(50); // percent
  const g = 9.81;

  const hMax = (v0 * v0) / (2 * g);
  const tTotal = (2 * v0) / g;
  const t = (currentTime / 100) * tTotal;
  const y = v0 * t - 0.5 * g * t * t;
  const vy = v0 - g * t;
  const ek = 0.5 * Math.abs(vy * vy);
  const ep = g * Math.max(y, 0);
  const totalE = 0.5 * v0 * v0;

  const ballYPos = 140 - (Math.max(y, 0) / Math.max(hMax, 0.1)) * 110;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Ball kastet rett opp — Energiomvandling</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Startfart v₀ (m/s)</label>
          <input
            type="range" min={5} max={40} step={1} value={v0}
            onChange={(e) => setV0(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v0} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Tid (0 → tur-retur)</label>
          <input
            type="range" min={0} max={100} value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">t = {t.toFixed(2)} s</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {/* Ball trajectory */}
        <svg viewBox="0 0 100 160" className="w-24">
          {/* Ground */}
          <line x1="20" y1="140" x2="80" y2="140" stroke="var(--muted)" strokeWidth="2" />
          {/* Height marker */}
          <line x1="50" y1="140" x2="50" y2="25" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="3" />
          {/* Max height marker */}
          <line x1="35" y1="30" x2="65" y2="30" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2" />
          <text x="75" y="33" fill="#3b82f6" fontSize="7">h<tspan dy="2" fontSize="5">max</tspan></text>
          {/* Ball */}
          <circle cx="50" cy={Math.max(Math.min(ballYPos, 140), 25)} r="8" fill="var(--accent)" />
          {/* Velocity arrow */}
          {Math.abs(vy) > 0.5 && (
            <line
              x1="50"
              y1={Math.max(Math.min(ballYPos, 140), 25)}
              x2="50"
              y2={Math.max(Math.min(ballYPos - vy * 1.5, 140), 10)}
              stroke="#ef4444"
              strokeWidth="2"
              markerEnd="url(#ball-arrow)"
            />
          )}
          <defs>
            <marker id="ball-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L6,2.5 L0,5" fill="#ef4444" />
            </marker>
          </defs>
        </svg>

        {/* Energy info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Høyde y</p>
            <p className="font-bold">{Math.max(y, 0).toFixed(1)} m</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">Fart |v|</p>
            <p className="font-bold">{Math.abs(vy).toFixed(1)} m/s</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">E<sub>P</sub>/m</p>
            <p className="font-bold">{ep.toFixed(0)} J/kg</p>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3 text-center">
            <p className="text-[var(--muted)]">E<sub>K</sub>/m</p>
            <p className="font-bold">{ek.toFixed(0)} J/kg</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Maks høyde: <strong>{hMax.toFixed(1)} m</strong> | Total energi per masse: <strong>{totalE.toFixed(0)} J/kg</strong> (konstant!)
        </p>
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

        {/* 7.1 Gravitasjonell potensiell energi */}
        <TheorySummary
          title="7.1 Gravitasjonell potensiell energi"
          mustKnow={[
            "Potensiell energi: E_P = mgy",
            "Arbeid utført av tyngden: W_mg = mgy₁ − mgy₂ = −ΔE_P",
            "Nullnivå kan velges fritt — kun høydeforskjeller betyr noe",
            "Kun tyngden gjør arbeid → E_K + E_P = konstant",
            "Med andre krefter: ½mv₁² + mgy₁ + W_andre = ½mv₂² + mgy₂",
            "Banen er irrelevant — kun høydeforskjellen Δy teller",
          ]}
        >
          <p>
            Arbeidet utført av tyngden på et legeme som beveger seg fra høyde <InlineLatex latex="y_1" /> til
            høyde <InlineLatex latex="y_2" />:
          </p>

          <FormulaBox
            latex="W_{mg} = mg(y_1 - y_2) = mgy_1 - mgy_2"
            title="Arbeid utført av tyngden"
            variant="blue"
            description="Positiv når legemet synker (y₁ > y₂), negativ når det stiger."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Definisjon</p>
            <p>
              <strong>Gravitasjonell potensiell energi</strong> for et legeme med masse <InlineLatex latex="m" /> i
              høyde <InlineLatex latex="y" /> over nullnivået:
            </p>
            <div className="mt-2 text-center">
              <InlineLatex latex="E_P = mgy" />
            </div>
          </div>

          <p className="mt-4">
            Sammenhengen mellom tyngdens arbeid og potensiell energi:
          </p>
          <FormulaBox
            latex="W_{mg} = E_{P1} - E_{P2} = -\Delta E_P"
            variant="blue"
            description="Tyngden gjør positivt arbeid når E_P minker (legemet faller)."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Nullnivå — fritt valg!</p>
            <p className="text-sm">
              Nullnivået for y kan velges fritt — bare <strong>høydeforskjellen</strong> har fysisk
              betydning. Velg nullnivå der det gjør beregningen enklest (ofte i bunnen eller
              ved startpunktet).
            </p>
          </div>

          <p className="mt-4">
            <strong>Bevaring av mekanisk energi:</strong> Når <em>kun tyngden</em> gjør arbeid (ingen friksjon, ingen ytre krefter),
            bruker vi arbeid-energi-teoremet og får:
          </p>

          <FormulaBox
            latex="\tfrac{1}{2}mv_1^2 + mgy_1 = \tfrac{1}{2}mv_2^2 + mgy_2"
            title="Bevaring av mekanisk energi"
            variant="gold"
            description="E_K + E_P = konstant. Kinetisk energi og potensiell energi kan omformes til hverandre."
          />

          <p className="mt-4">
            Når <strong>andre krefter</strong> også gjør arbeid (friksjon, ytre krefter, fjær osv.):
          </p>

          <FormulaBox
            latex="\tfrac{1}{2}mv_1^2 + mgy_1 + W_{\text{andre}} = \tfrac{1}{2}mv_2^2 + mgy_2"
            title="Utvidet energiligning"
            variant="gold"
            description="W_andre inkluderer arbeid fra friksjon, ytre krefter, osv. Friksjon gir alltid negativt W_andre."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Banen er irrelevant!</p>
            <p className="text-sm">
              Tyngdens arbeid avhenger <strong>kun av høydeforskjellen &Delta;y</strong>, ikke av hvilken
              bane legemet følger. Dette er fordi <InlineLatex latex="W_{mg} = -mg\hat{\jmath} \cdot (\Delta x\hat{\imath} + \Delta y\hat{\jmath}) = -mg\Delta y" />.
              Derfor fungerer energibevaring langs kurver, skråplan, og vilkårlige baner — så lenge det er friksjonsfritt.
            </p>
          </div>

          <p className="mt-4">
            <strong>Normalkraftens arbeid</strong> er alltid null fordi den er vinkelrett på bevegelsesretningen.
            Derfor: på friksjonsfrie kurver og skråplan kan vi bruke ren energibevaring!
          </p>
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox
            latex="E_P = mgy"
            title="Gravitasjonell potensiell energi"
            variant="gold"
          />
          <FormulaBox
            latex="W_{mg} = mgy_1 - mgy_2 = -\Delta E_P"
            title="Arbeid av tyngden"
            variant="gold"
          />
          <FormulaBox
            latex="\tfrac{1}{2}mv_1^2 + mgy_1 = \tfrac{1}{2}mv_2^2 + mgy_2"
            title="Bevaring av mekanisk energi"
            variant="gold"
          />
          <FormulaBox
            latex="\tfrac{1}{2}mv_1^2 + mgy_1 + W_{\text{andre}} = \tfrac{1}{2}mv_2^2 + mgy_2"
            title="Med andre krefter"
            variant="gold"
          />
          <FormulaBox
            latex="E_K + E_P = \text{konstant}"
            title="Energibevaring (forenklet)"
            variant="blue"
            description="Gjelder kun når ingen andre krefter enn tyngden gjør arbeid."
          />
          <FormulaBox
            latex="v = \sqrt{2g(y_1 - y_2)}"
            title="Fart fra høydefall (start fra ro)"
            variant="blue"
            description="Nyttig snarvei når v₁ = 0 og ingen friksjon."
          />
        </div>

        {/* Når bruker du hva? */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-6">
          <h3 className="font-semibold text-lg mb-4">Når bruker du hva?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Situasjon</th>
                  <th className="text-left py-2 pr-4">Bruk…</th>
                  <th className="text-left py-2">Husk…</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Friksjonsfritt, kun tyngde</td>
                  <td className="py-2 pr-4">Bevaring: E₁ = E₂</td>
                  <td className="py-2">Banen spiller ingen rolle!</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Friksjon eller ytre kraft</td>
                  <td className="py-2 pr-4">Utvidet: E₁ + W<sub>andre</sub> = E₂</td>
                  <td className="py-2">W<sub>friksjon</sub> er alltid negativ</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Fart fra fri fall / høydeforskjell</td>
                  <td className="py-2 pr-4"><InlineLatex latex="v = \sqrt{2gh}" /></td>
                  <td className="py-2">Gjelder kun når v₁ = 0</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Prosjektil — maks høyde</td>
                  <td className="py-2 pr-4">Energibevaring</td>
                  <td className="py-2">v₂ = v<sub>x</sub> = v₀ cos &alpha; (toppen)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Kurve / skateboard</td>
                  <td className="py-2 pr-4">Bevaring (N gjør null arbeid)</td>
                  <td className="py-2">Kun h = R − R cos &theta; teller</td>
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
        <EnergyConservationVisualizer />
        <BallThrowVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Ball kastet rett opp */}
        <ExerciseCard
          number={1}
          title="Ball kastet rett opp — maks høyde"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ball med masse <InlineLatex latex="m = 0{,}145\;\text{kg}" /> kastes rett opp med
                fart <InlineLatex latex="v_1 = 20\;\text{m/s}" /> fra <InlineLatex latex="y_1 = 0" />.
              </p>
              <p className="mt-2">Finn maksimal høyde (kun tyngden virker).</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Ved maks høyde er farten null: <InlineLatex latex="v_2 = 0" />.</p>,
            },
            {
              label: "Hint 2",
              content: <p>Bruk energibevaring: <InlineLatex latex="mgy_2 = \tfrac{1}{2}mv_1^2" />. Massen kansellerer!</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 0{,}145\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_1 = 20\;\text{m/s}" /> (oppover)</li>
                <li>Starthøyde: <InlineLatex latex="y_1 = 0" /></li>
                <li>Kun tyngden virker (ingen luftmotstand)</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Maksimal høyde <InlineLatex latex="y_2" />.</p>
              <p><strong>Strategi:</strong> Ved maks høyde er all kinetisk energi omgjort til potensiell energi (<InlineLatex latex="v_2 = 0" />). Vi bruker energibevaring: <InlineLatex latex="E_{K1} + E_{P1} = E_{K2} + E_{P2}" />. Massen kansellerer — maks høyde avhenger kun av startfart!</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}mv_1^2 + mgy_1 = \tfrac{1}{2}mv_2^2 + mgy_2"
                variant="blue"
              />
              <p className="text-sm">Med <InlineLatex latex="v_2 = 0" /> og <InlineLatex latex="y_1 = 0" />:</p>
              <FormulaBox
                latex="\tfrac{1}{2}mv_1^2 = mgy_2 \;\Rightarrow\; y_2 = \frac{v_1^2}{2g}"
                variant="blue"
              />
              <FormulaBox
                latex="y_2 = \frac{20^2}{2 \cdot 9{,}81} = \frac{400}{19{,}62} = \underline{\underline{20{,}4\;\text{m}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Massen kansellerer — maks høyde avhenger kun av startfarten! Formelen <InlineLatex latex="h = v^2/(2g)" /> er en nyttig snarvei for alle problemer med vertikalt kast. Energibevaring er raskere enn kinematikk her.</p>
            </div>
          }
        />

        {/* Eksempel 2: Ball med håndkraft */}
        <ExerciseCard
          number={2}
          title="Ball kastet med håndkraft — Andre krefter gjør arbeid"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ball (<InlineLatex latex="m = 0{,}145\;\text{kg}" />) akselereres av en hånd.
                Hånden starter i <InlineLatex latex="y_0 = -0{,}50\;\text{m}" /> (under nullnivå) med <InlineLatex latex="v_0 = 0" />,
                og slipper ballen i <InlineLatex latex="y_1 = 0" /> med fart <InlineLatex latex="v_1 = 20\;\text{m/s}" />.
              </p>
              <p className="mt-2">
                a) Finn kraften F fra hånden.<br />
                b) Finn farten <InlineLatex latex="15\;\text{m}" /> over slipppunktet.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>a) Hånden gjør arbeid W = F &middot; d over strekningen 0,50 m. Bruk den utvidede energiligningen.</p>,
            },
            {
              label: "Hint 2",
              content: <p>b) Etter slipp er det kun tyngden som virker → vanlig energibevaring.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kraften fra hånden:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}mv_0^2 + mgy_0 + W_{\text{hånd}} = \tfrac{1}{2}mv_1^2 + mgy_1"
                variant="blue"
              />
              <FormulaBox
                latex="0 + mg(-0{,}5) + F \cdot 0{,}5 = \tfrac{1}{2}mv_1^2 + 0"
                variant="blue"
              />
              <FormulaBox
                latex="F = \frac{\tfrac{1}{2}mv_1^2 - mg(-0{,}5)}{0{,}5} = \frac{\tfrac{1}{2} \cdot 0{,}145 \cdot 400 + 0{,}145 \cdot 9{,}81 \cdot 0{,}5}{0{,}5} = \underline{\underline{59\;\text{N}}}"
                variant="gold"
              />

              <p><strong>b) Fart 15 m over slipppunktet:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}mv_1^2 = \tfrac{1}{2}mv_2^2 + mgy_2"
                variant="blue"
              />
              <FormulaBox
                latex="v_2 = \pm\sqrt{v_1^2 - 2gy_2} = \pm\sqrt{400 - 2 \cdot 9{,}81 \cdot 15} = \underline{\underline{\pm 10{,}3\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Fortegnet betyr at ballen kan ha denne farten <em>to ganger</em> — én gang på vei opp (+) og én gang på vei ned (−).
              </p>
            </div>
          }
        />

        {/* Eksempel 3: Prosjektil maks høyde */}
        <ExerciseCard
          number={3}
          title="Prosjektil — Maks høyde via energi"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ball (<InlineLatex latex="m = 0{,}145\;\text{kg}" />) kastes med
                fart <InlineLatex latex="v_0 = 20\;\text{m/s}" /> i
                vinkel <InlineLatex latex="\alpha_0 = 60°" /> med horisontal.
              </p>
              <p className="mt-2">Finn maksimal høyde med energimetoden.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Ved maks høyde er vertikal hastighet null, men horisontal hastighet er bevart: <InlineLatex latex="v_2 = v_0\cos\alpha_0" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 0{,}145\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_0 = 20\;\text{m/s}" /></li>
                <li>Kastvinkel: <InlineLatex latex="\alpha_0 = 60°" /></li>
                <li>Starthøyde: <InlineLatex latex="y_0 = 0" /></li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Maksimal høyde h.</p>
              <p><strong>Strategi:</strong> Ved maks høyde er den vertikale hastighetskomponenten null (<InlineLatex latex="v_y = 0" />), men den horisontale er bevart: <InlineLatex latex="v_x = v_0\cos\alpha_0" />. Farten i toppen er altså IKKE null! Vi bruker energibevaring med <InlineLatex latex="v_2 = v_0\cos\alpha_0" />.</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>Steg 1:</strong> Fart i toppunktet (kun horisontal komponent):</p>
              <FormulaBox
                latex="v_2 = v_0\cos 60° = 20 \cdot 0{,}5 = 10\;\text{m/s}"
                variant="blue"
              />
              <p className="text-sm"><strong>Steg 2:</strong> Energibevaring:</p>
              <FormulaBox
                latex="\tfrac{1}{2}mv_0^2 + 0 = \tfrac{1}{2}mv_2^2 + mgh"
                variant="blue"
              />
              <p className="text-sm">Massen kansellerer:</p>
              <FormulaBox
                latex="h = \frac{v_0^2 - v_2^2}{2g} = \frac{20^2 - 10^2}{2 \cdot 9{,}81} = \frac{300}{19{,}62} = \underline{\underline{15{,}3\;\text{m}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energimetoden gir maks høyde for prosjektiler UTEN kinematikk-formler! Den kritiske innsikten er at farten ved toppen ikke er null — den horisontale komponenten er bevart. Sammenlign med rakt kast opp (20,4 m): skrått kast når lavere fordi noe av energien «brukes» til horisontal bevegelse.</p>
            </div>
          }
        />

        {/* Eksempel 4: Skateboard på kvartsirkel */}
        <ExerciseCard
          number={4}
          title="Friksjonsfritt skateboard på kvartsirskel"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et skateboard (<InlineLatex latex="m = 25{,}0\;\text{kg}" />) starter fra ro
                på toppen av en kvartsirkelformet rampe med radius <InlineLatex latex="R = 3{,}0\;\text{m}" />.
                Rampen er friksjonsfri.
              </p>
              <p className="mt-2">Finn farten i bunnen av rampen.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Normalkraften er alltid vinkelrett på bevegelsen → gjør null arbeid. Bruk energibevaring med h = R.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 25{,}0\;\text{kg}" /></li>
                <li>Radius (= høydeforskjell): <InlineLatex latex="R = 3{,}0\;\text{m}" /></li>
                <li>Startfart: <InlineLatex latex="v_1 = 0" /> (slippes fra ro)</li>
                <li>Friksjonsfritt</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Farten <InlineLatex latex="v_2" /> i bunnen av rampen.</p>
              <p><strong>Strategi:</strong> Normalkraften er alltid vinkelrett på bevegelsen og gjør null arbeid. Uten friksjon er det kun tyngden som gjør arbeid, så vi bruker energibevaring. Høydeforskjellen er R (fra topp til bunn av kvartsirkelen). Merk: formen på banen spiller ingen rolle — kun høydeforskjellen!</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="E_{K1} + E_{P1} = E_{K2} + E_{P2}"
                variant="blue"
              />
              <p className="text-sm">Med <InlineLatex latex="v_1 = 0" />, <InlineLatex latex="y_1 = R" />, <InlineLatex latex="y_2 = 0" />:</p>
              <FormulaBox
                latex="0 + mgR = \tfrac{1}{2}mv_2^2 + 0 \;\Rightarrow\; v_2 = \sqrt{2gR}"
                variant="blue"
              />
              <FormulaBox
                latex="v_2 = \sqrt{2 \cdot 9{,}81 \cdot 3{,}0} = \sqrt{58{,}9} = \underline{\underline{7{,}67\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring langs kurver fungerer fordi normalkraften aldri gjør arbeid. Farten avhenger kun av høydeforskjellen, ikke formen på kurven! Formelen <InlineLatex latex="v = \sqrt{2gh}" /> dukker opp igjen og igjen — lær den utenat.</p>
            </div>
          }
        />

        {/* Eksempel 5: Skateboard med friksjon */}
        <ExerciseCard
          number={5}
          title="Skateboard med friksjon — Finn friksjonens arbeid"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Samme oppsett som forrige, men nå med friksjon. Skateboardet
                når bunnen med fart <InlineLatex latex="v_2 = 6{,}0\;\text{m/s}" /> i stedet for 7,67 m/s.
                Masse <InlineLatex latex="m = 25{,}0\;\text{kg}" />, <InlineLatex latex="R = 3{,}0\;\text{m}" />.
              </p>
              <p className="mt-2">Finn arbeidet gjort av friksjon.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk den utvidede energiligningen med W<sub>R</sub> som ukjent.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 25{,}0\;\text{kg}" /></li>
                <li>Radius: <InlineLatex latex="R = 3{,}0\;\text{m}" /></li>
                <li>Startfart: <InlineLatex latex="v_1 = 0" /></li>
                <li>Fart i bunn: <InlineLatex latex="v_2 = 6{,}0\;\text{m/s}" /> (lavere enn 7,67 m/s uten friksjon)</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Arbeidet gjort av friksjon <InlineLatex latex="W_R" />.</p>
              <p><strong>Strategi:</strong> Vi bruker den utvidede energiligningen som inkluderer arbeid fra ikke-konservative krefter: <InlineLatex latex="E_{K1} + E_{P1} + W_{\text{andre}} = E_{K2} + E_{P2}" />. Friksjon er den eneste «andre» kraften, så <InlineLatex latex="W_{\text{andre}} = W_R" />.</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="0 + mgR + W_R = \tfrac{1}{2}mv_2^2 + 0"
                variant="blue"
              />
              <p className="text-sm">Løser for <InlineLatex latex="W_R" />:</p>
              <FormulaBox
                latex="W_R = \tfrac{1}{2}mv_2^2 - mgR = \tfrac{1}{2} \cdot 25 \cdot 6{,}0^2 - 25 \cdot 9{,}81 \cdot 3{,}0"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = 450 - 735{,}8 = \underline{\underline{-286\;\text{J}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Negativt arbeid fra friksjon betyr at energi er fjernet fra systemet (omgjort til varme). Sammenlign: uten friksjon fikk vi 7,67 m/s (kinetisk energi 735 J), med friksjon bare 6,0 m/s (450 J). Differansen 286 J ble til varme.</p>
            </div>
          }
        />

        {/* Eksempel 6: Kloss opp-og-ned med friksjon */}
        <ExerciseCard
          number={6}
          title="Kloss opp og ned skråplan med friksjon (to steg)"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kloss (<InlineLatex latex="m = 12\;\text{kg}" />) skyves opp et skråplan
                (<InlineLatex latex="30°" />) med startfart <InlineLatex latex="v_1 = 5{,}0\;\text{m/s}" />.
                Klossen glir <InlineLatex latex="s = 1{,}6\;\text{m}" /> opp langs skråplanet før den stopper.
              </p>
              <p className="mt-2">
                a) Finn friksjonskraften R.<br />
                b) Finn farten når klossen glir tilbake ned til startpunktet.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>a) Høyden: <InlineLatex latex="h = s\sin 30° = 0{,}8\;\text{m}" />. Bruk utvidet energiligning med v₂ = 0.</p>,
            },
            {
              label: "Hint 2",
              content: <p>b) Friksjon virker OGSÅ på vei ned (motsatt retning, men fortsatt negativt arbeid). Bruk energibevaring fra topp ned.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Opp skråplanet (v₂ = 0):</strong></p>
              <FormulaBox
                latex="h = s\sin 30° = 1{,}6 \cdot 0{,}5 = 0{,}8\;\text{m}"
                variant="blue"
              />
              <FormulaBox
                latex="\tfrac{1}{2}mv_1^2 + 0 + W_R = 0 + mgh"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = mgh - \tfrac{1}{2}mv_1^2 = 12 \cdot 9{,}81 \cdot 0{,}8 - \tfrac{1}{2} \cdot 12 \cdot 25 = 94{,}2 - 150 = -55{,}8\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = -R \cdot s \;\Rightarrow\; R = \frac{55{,}8}{1{,}6} = \underline{\underline{34{,}9\;\text{N}}}"
                variant="gold"
              />

              <p><strong>b) Ned igjen (fra y = h med v = 0):</strong></p>
              <p className="text-sm">Friksjon gjør negativt arbeid også på vei ned (W<sub>R</sub> = −R &middot; s):</p>
              <FormulaBox
                latex="0 + mgh + W_R = \tfrac{1}{2}mv_3^2 + 0"
                variant="blue"
              />
              <FormulaBox
                latex="\tfrac{1}{2}mv_3^2 = mgh - Rs = 94{,}2 - 55{,}8 = 38{,}4\;\text{J}"
                variant="blue"
              />
              <FormulaBox
                latex="v_3 = \sqrt{\frac{2 \cdot 38{,}4}{12}} = \underline{\underline{2{,}5\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Klossen mister energi <em>begge veier</em> — fra 5,0 m/s til 2,5 m/s. Friksjon er den store energityven!
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Ved opp-og-ned-problemer må du bruke energiligningen i to steg. Friksjon gjør negativt arbeid i begge retninger.</p>
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
            <h3 className="font-semibold text-lg mb-3">Strategi: Energibevaring uten friksjon</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Velg nullnivå</strong> for potensiell energi (der det er mest praktisk)</li>
              <li><strong>Identifiser start- og sluttpunkt</strong> med kjente størrelser</li>
              <li><strong>Sjekk:</strong> Gjør noen andre krefter enn tyngden arbeid? Normalkraft = nei. Friksjon = ja!</li>
              <li><strong>Sett opp:</strong> <InlineLatex latex="E_{K1} + E_{P1} = E_{K2} + E_{P2}" /></li>
              <li><strong>Løs for ukjent</strong> (v eller h)</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Energibevaring MED friksjon</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Samme steg 1–3 som over</li>
              <li><strong>Beregn W<sub>andre</sub>:</strong> Friksjonens arbeid = <InlineLatex latex="-Rs" /> (alltid negativt)</li>
              <li><strong>Sett opp:</strong> <InlineLatex latex="E_{K1} + E_{P1} + W_{\text{andre}} = E_{K2} + E_{P2}" /></li>
              <li><strong>Løs for ukjent</strong></li>
              <li><strong>Sjekk:</strong> Fikk du negativt W<sub>friksjon</sub>? Hvis ikke, er det feil!</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Energi vs. kinematikk — Når bruke hva?</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--card-border)]">
                    <th className="text-left py-2 pr-4">Bruk energimetoden</th>
                    <th className="text-left py-2">Bruk kinematikk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--card-border)]">
                    <td className="py-2 pr-4">Kun fart og posisjon er relevant</td>
                    <td className="py-2">Tid er etterspurt</td>
                  </tr>
                  <tr className="border-b border-[var(--card-border)]">
                    <td className="py-2 pr-4">Kurvet bane (skråplan, pendel)</td>
                    <td className="py-2">Rettlinjet bevegelse med kjent a</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Varierende krefter (fjær)</td>
                    <td className="py-2">Konstant kraft, spør etter a eller t</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Vanlige feil</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Glemmer at E<sub>P</sub> kan være negativ (hvis y er under nullnivået)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Bruker h = buelengde i stedet for <strong>vertikal</strong> høydeforskjell</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Setter v = 0 ved toppen av prosjektilbane (v<sub>x</sub> er ikke null!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Glemmer friksjon i begge retninger ved opp-og-ned-problemer</span>
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

        {/* Oblig: Ballistisk pendel */}
        <ExerciseCard
          number={1}
          title="Ballistisk pendel — Energibevaring + bevegelsesmengde"
          difficulty="vanskelig"
          source="Oblig 2"
          problem={
            <div>
              <p>
                En kloss (masse <InlineLatex latex="M" />) henger i en snor med lengde <InlineLatex latex="L" />.
                En kule (masse <InlineLatex latex="m" />, fart <InlineLatex latex="v_0" />) treffer klossen
                og fester seg (uelastisk støt).
              </p>
              <p className="mt-2">
                a) Finn felleslegemets hastighet rett etter støtet.<br />
                b) Vis at maks vinkelutslag er <InlineLatex latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right)" />.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>a) Støtet: bevaring av bevegelsesmengde (kinetisk energi er IKKE bevart i uelastisk støt).</p>,
            },
            {
              label: "Hint 2",
              content: <p>b) ETTER støtet: bruk energibevaring for pendelen. Høyden er <InlineLatex latex="h = L(1 - \cos\varphi)" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Bevaring av bevegelsesmengde (støtet):</strong></p>
              <FormulaBox
                latex="mv_0 = (m + M)V \;\Rightarrow\; V = \frac{m}{m + M}v_0"
                variant="gold"
              />

              <p><strong>b) Energibevaring etter støtet (pendel svinger opp):</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}(m+M)V^2 = (m+M)gL(1 - \cos\varphi_{\max})"
                variant="blue"
              />
              <FormulaBox
                latex="\tfrac{1}{2}V^2 = gL(1 - \cos\varphi_{\max})"
                variant="blue"
              />
              <p className="text-sm">Setter inn V:</p>
              <FormulaBox
                latex="\tfrac{1}{2}\left(\frac{m}{m+M}\right)^2 v_0^2 = gL(1 - \cos\varphi_{\max})"
                variant="blue"
              />
              <FormulaBox
                latex="\cos\varphi_{\max} = 1 - \frac{m^2 v_0^2}{2gL(m+M)^2}"
                variant="blue"
              />
              <FormulaBox
                latex="\varphi_{\max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right) \;\;\checkmark"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Ballistisk pendel er en to-stegs oppgave: (1) bevegelsesmengde under støtet, (2) energibevaring etter støtet. Denne typen oppgave kombinerer kap. 7 og 8.</p>
            </div>
          }
        />

        {/* Oblig: Rullende skive */}
        <ExerciseCard
          number={2}
          title="Rullende skive på skråplan — Energi + rotasjon"
          difficulty="vanskelig"
          source="Oblig 2"
          problem={
            <div>
              <p>
                En sirkulær homogen skive (masse <InlineLatex latex="m" />, radius <InlineLatex latex="R" />) ruller
                uten å gli med startfart <InlineLatex latex="v_0" /> opp et skråplan med helning <InlineLatex latex="\beta" />.
              </p>
              <p className="mt-2">
                a) Finn kinetisk energi uttrykt ved m og v₀.<br />
                b) Hvor langt opp skråplanet (s) kommer skiven?
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>a) Total E<sub>K</sub> = translasjon + rotasjon: <InlineLatex latex="E_K = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" />. For skive: <InlineLatex latex="I = \tfrac{1}{2}mR^2" />, <InlineLatex latex="\omega = v/R" />.</p>,
            },
            {
              label: "Hint 2",
              content: <p>b) All kinetisk energi omgjøres til potensiell: <InlineLatex latex="E_K = mgs\sin\beta" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kinetisk energi (translasjon + rotasjon):</strong></p>
              <FormulaBox
                latex="E_K = \tfrac{1}{2}mv_0^2 + \tfrac{1}{2}I\omega_0^2 = \tfrac{1}{2}mv_0^2 + \tfrac{1}{2}\!\left(\tfrac{1}{2}mR^2\right)\!\left(\frac{v_0}{R}\right)^2"
                variant="blue"
              />
              <FormulaBox
                latex="E_K = \tfrac{1}{2}mv_0^2 + \tfrac{1}{4}mv_0^2 = \underline{\underline{\tfrac{3}{4}mv_0^2}}"
                variant="gold"
              />

              <p><strong>b) Avstand opp skråplanet:</strong></p>
              <FormulaBox
                latex="\tfrac{3}{4}mv_0^2 = mgs\sin\beta"
                variant="blue"
              />
              <FormulaBox
                latex="s = \underline{\underline{\frac{3v_0^2}{4g\sin\beta}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Rullende legemer har MER kinetisk energi enn glidende (¾mv₀² vs ½mv₀²), så de kommer lenger opp. Energibevaring inkluderer rotasjonsenergi.</p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Pendel — fart i laveste punkt"
          difficulty="lett"
          source="Øving"
          problem={
            <div>
              <p>
                En pendel med lengde <InlineLatex latex="L = 2{,}0\;\text{m}" /> slippes fra
                en vinkel <InlineLatex latex="\theta = 40°" /> med vertikalen. Massen
                er <InlineLatex latex="m = 0{,}50\;\text{kg}" />.
              </p>
              <p className="mt-2">Finn farten i det laveste punktet (friksjonsfritt).</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Høydeforskjellen er <InlineLatex latex="h = L - L\cos\theta = L(1 - \cos\theta)" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Pendellengde: <InlineLatex latex="L = 2{,}0\;\text{m}" /></li>
                <li>Startvinkel: <InlineLatex latex="\theta = 40°" /> (med vertikalen)</li>
                <li>Masse: <InlineLatex latex="m = 0{,}50\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_1 = 0" /> (slippes fra ro)</li>
                <li>Friksjonsfritt</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Farten v i det laveste punktet.</p>
              <p><strong>Strategi:</strong> Snorkraften er alltid vinkelrett på bevegelsen og gjør null arbeid. Kun tyngden gjør arbeid, så vi bruker energibevaring. Nøkkelen er å finne høydeforskjellen: <InlineLatex latex="h = L - L\cos\theta = L(1 - \cos\theta)" />. Geometrisk betyr dette at pendelmassen faller fra en høyde h over det laveste punktet.</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>Steg 1:</strong> Finn høydeforskjellen:</p>
              <FormulaBox
                latex="h = L(1 - \cos\theta) = 2{,}0(1 - \cos 40°) = 2{,}0 \cdot 0{,}234 = 0{,}468\;\text{m}"
                variant="blue"
              />
              <p className="text-sm"><strong>Steg 2:</strong> Energibevaring (<InlineLatex latex="v_1 = 0" />, nullnivå i bunn):</p>
              <FormulaBox
                latex="mgh = \tfrac{1}{2}mv^2 \;\Rightarrow\; v = \sqrt{2gh}"
                variant="blue"
              />
              <FormulaBox
                latex="v = \sqrt{2 \cdot 9{,}81 \cdot 0{,}468} = \sqrt{9{,}19} = \underline{\underline{3{,}03\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Pendelen er et klassisk energibevaringsproblem. Høydeformelen <InlineLatex latex="h = L(1 - \cos\theta)" /> dukker opp i mange oppgaver — lær den! Merk at massen kansellerer, så farten avhenger kun av L og θ.</p>
            </div>
          }
        />
      </div>

      {/* ══════════════════════════════════════════════
          7. EKSAMENSOPPGAVER
          ══════════════════════════════════════════════ */}
      <div id="eksamensoppgaver">
        <h2 className="text-2xl font-bold mt-12 mb-6">Eksamensoppgaver</h2>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 mb-6">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Eksamenstips</p>
          <p className="text-sm">
            Energibevaring er det kraftigste verktøyet i mekanikken. På eksamen kombineres det
            ofte med bevegelsesmengde (kap. 8) og rotasjon (kap. 9/10). Velg nullnivå smart,
            og sjekk alltid om friksjon eller andre krefter gjør arbeid!
          </p>
        </div>

        {/* Eksamen: Basketball */}
        <ExerciseCard
          number={1}
          title="Basketball — Kinetisk energi ved kurven"
          difficulty="middels"
          source="Eksamen V2023"
          problem={
            <div>
              <p>
                En basketballspiller kaster en ball (<InlineLatex latex="m = 0{,}600\;\text{kg}" />)
                med fart <InlineLatex latex="v_0 = 7{,}0\;\text{m/s}" /> i vinkel <InlineLatex latex="50°" /> fra
                høyde <InlineLatex latex="2{,}1\;\text{m}" />. Kurven er 4 m unna horisontalt
                og <InlineLatex latex="0{,}9\;\text{m}" /> høyere enn kasthøyden.
              </p>
              <p className="mt-2">Hva er ballens kinetiske energi når den treffer kurven?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk energibevaring. Velg kasthøyden som nullnivå, da er y<sub>kurv</sub> = 0,9 m.</p>,
            },
            {
              label: "Hint 2",
              content: <p><InlineLatex latex="E_K = \tfrac{1}{2}mv_0^2 - mg\Delta y" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 0{,}600\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_0 = 7{,}0\;\text{m/s}" /></li>
                <li>Kastvinkel: <InlineLatex latex="50°" /></li>
                <li>Kasthøyde: <InlineLatex latex="2{,}1\;\text{m}" /></li>
                <li>Kurven er <InlineLatex latex="0{,}9\;\text{m}" /> høyere enn kasthøyden: <InlineLatex latex="\Delta y = 0{,}9\;\text{m}" /></li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Kinetisk energi <InlineLatex latex="E_K" /> når ballen treffer kurven.</p>
              <p><strong>Strategi:</strong> Energibevaring! Vi trenger ikke vite banen eller farten — kun høydeforskjellen. Vi setter kasthøyden som nullnivå. All energi er kinetisk ved start, og ved kurven er noe omgjort til potensiell energi.</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="E_{K,\text{start}} + E_{P,\text{start}} = E_{K,\text{kurv}} + E_{P,\text{kurv}}"
                variant="blue"
              />
              <p className="text-sm">Med nullnivå ved kast (<InlineLatex latex="y_{\text{start}} = 0" />, <InlineLatex latex="y_{\text{kurv}} = 0{,}9\;\text{m}" />):</p>
              <FormulaBox
                latex="\tfrac{1}{2}mv_0^2 + 0 = E_{K,\text{kurv}} + mg \cdot 0{,}9"
                variant="blue"
              />
              <FormulaBox
                latex="E_{K,\text{kurv}} = \tfrac{1}{2} \cdot 0{,}600 \cdot 7{,}0^2 - 0{,}600 \cdot 9{,}81 \cdot 0{,}9"
                variant="blue"
              />
              <FormulaBox
                latex="E_{K,\text{kurv}} = 14{,}7 - 5{,}3 = \underline{\underline{9{,}4\;\text{J}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energimetoden gir kinetisk energi uten å trenge kinematikkens baneberegning. Vi trenger ikke vite kastvinkelen eller den horisontale avstanden — kun høydeforskjellen teller! Dette er mye raskere enn å beregne banen med kinematikk.</p>
            </div>
          }
        />

        {/* Eksamen: Bowlingkule */}
        <ExerciseCard
          number={2}
          title="Bowlingkule — Kinetisk energi med rotasjon"
          difficulty="vanskelig"
          source="Eksamen H2023"
          problem={
            <div>
              <p>
                En bowlingkule (<InlineLatex latex="m = 5{,}2\;\text{kg}" />, <InlineLatex latex="r = 10{,}8\;\text{cm}" />)
                starter med fart <InlineLatex latex="v_0 = 10{,}2\;\text{m/s}" /> og glir
                (<InlineLatex latex="\mu = 0{,}25" />). Etter en stund ruller den rent
                med <InlineLatex latex="v = 7{,}3\;\text{m/s}" />.
              </p>
              <p className="mt-2">
                Finn kinetisk energi når den ruller rent, og friksjonens arbeid under glidningen.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Når kula ruller rent: <InlineLatex latex="E_K = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" /> med <InlineLatex latex="I = \tfrac{2}{5}mr^2" /> (kule).</p>,
            },
            {
              label: "Hint 2",
              content: <p>Friksjonens arbeid = endring i total kinetisk energi: <InlineLatex latex="W_R = E_{K,\text{slutt}} - E_{K,\text{start}}" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Kinetisk energi ved ren rulling:</strong></p>
              <FormulaBox
                latex="E_K = \tfrac{1}{2}mv^2 + \tfrac{1}{2}\!\left(\tfrac{2}{5}mr^2\right)\!\left(\frac{v}{r}\right)^2 = \tfrac{1}{2}mv^2 + \tfrac{1}{5}mv^2 = \tfrac{7}{10}mv^2"
                variant="blue"
              />
              <FormulaBox
                latex="E_K = \tfrac{7}{10} \cdot 5{,}2 \cdot 7{,}3^2 = \underline{\underline{194\;\text{J}}}"
                variant="gold"
              />

              <p><strong>Friksjonens arbeid:</strong></p>
              <FormulaBox
                latex="W_R = E_{K,\text{slutt}} - E_{K,\text{start}} = \tfrac{7}{10}mv^2 - \tfrac{1}{2}mv_0^2"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = 194 - \tfrac{1}{2} \cdot 5{,}2 \cdot 10{,}2^2 = 194 - 270{,}5 = \underline{\underline{-76{,}5\;\text{J}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                NB: Startenergien er kun ½mv₀² (ingen rotasjon ved start), men sluttenergien inkluderer rotasjon (⁷⁄₁₀mv²).
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Ved overgang fra glidning til rulling må du huske at startenergi er ren translasjon, mens sluttenergi inkluderer rotasjon.</p>
            </div>
          }
        />

        {/* Eksamen: Skiløper (kobler kap 6 og 7) */}
        <ExerciseCard
          number={3}
          title="Skiløper — Energibevaring ned bakke + friksjon"
          difficulty="middels"
          source="Oblig 2"
          problem={
            <div>
              <p>
                En skiløper (<InlineLatex latex="m = 80{,}0\;\text{kg}" />) starter fra toppen
                av en <InlineLatex latex="250\;\text{m}" /> lang bakke (<InlineLatex latex="25°" />) med v = 0.
                Uten friksjon ville farten i bunnen vært 45,5 m/s, men den virkelige farten
                er bare <InlineLatex latex="50\;\text{km/h} = 13{,}9\;\text{m/s}" />.
              </p>
              <p className="mt-2">Finn gjennomsnittlig friksjonskraft langs bakken.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Høyden: <InlineLatex latex="h = 250\sin 25° = 105{,}7\;\text{m}" />. Bruk utvidet energiligning.</p>,
            },
            {
              label: "Hint 2",
              content: <p>W<sub>R</sub> = −Rs langs bakken. Finn W<sub>R</sub> fra energiligningen, deretter R.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 80{,}0\;\text{kg}" /></li>
                <li>Bakkelengde: <InlineLatex latex="s = 250\;\text{m}" /></li>
                <li>Helning: <InlineLatex latex="\theta = 25°" /></li>
                <li>Startfart: <InlineLatex latex="v_0 = 0" /></li>
                <li>Faktisk sluttfart: <InlineLatex latex="v = 50\;\text{km/h} = 13{,}9\;\text{m/s}" /></li>
                <li>Fart uten friksjon ville vært 45,5 m/s</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Gjennomsnittlig friksjonskraft R langs bakken.</p>
              <p><strong>Strategi:</strong> Bruk utvidet energiligning: <InlineLatex latex="E_{K1} + E_{P1} + W_R = E_{K2} + E_{P2}" />. Finn <InlineLatex latex="W_R" /> først, deretter <InlineLatex latex="R = |W_R|/s" />. Høyden er <InlineLatex latex="h = s\sin\theta" />.</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>Steg 1:</strong> Konverter og finn høyden:</p>
              <FormulaBox
                latex="v = 50\;\text{km/h} = 13{,}9\;\text{m/s}, \quad h = 250\sin 25° = 105{,}7\;\text{m}"
                variant="blue"
              />
              <p className="text-sm"><strong>Steg 2:</strong> Utvidet energiligning (nullnivå i bunn):</p>
              <FormulaBox
                latex="0 + mgs\sin 25° + W_R = \tfrac{1}{2}mv^2 + 0"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = \tfrac{1}{2}mv^2 - mgs\sin 25° = \tfrac{1}{2} \cdot 80 \cdot 13{,}9^2 - 80 \cdot 9{,}81 \cdot 250 \cdot \sin 25°"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = 7\,728 - 82\,929 = -75\,200\;\text{J} = -75{,}2\;\text{kJ}"
                variant="blue"
              />
              <p className="text-sm"><strong>Steg 3:</strong> Finn friksjonskraften:</p>
              <FormulaBox
                latex="R = \frac{|W_R|}{s} = \frac{75\,200}{250} = \underline{\underline{301\;\text{N}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Kombinasjon av energibevaring og arbeid-energi gir friksjonskraften. Den enorme forskjellen mellom 164 km/h (uten friksjon) og 50 km/h (med) viser at friksjon fjerner mesteparten av energien over lange strekninger. En friksjonskraft på 301 N høres lite ut, men over 250 m gjør den 75 kJ negativt arbeid!</p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
