"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 23)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Potensial fra punktladning ─── */
function PotentialVisualizer() {
  const [charge, setCharge] = useState(5); // µC
  const [distance, setDistance] = useState(2.0); // m
  const k = 8.99e9;
  const V = charge !== 0 ? k * (charge * 1e-6) / distance : 0;

  const numRings = 6;
  const rings = Array.from({ length: numRings }, (_, i) => {
    const r = 20 + (i * 60) / numRings;
    const rMeters = distance * (r / (20 + 60 * (numRings - 1) / numRings));
    const pot = charge !== 0 ? k * (charge * 1e-6) / rMeters : 0;
    return { r, pot };
  });

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Elektrisk potensial fra punktladning</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Ladning q (µC)</label>
          <input
            type="range"
            min={-10}
            max={10}
            value={charge}
            onChange={(e) => setCharge(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{charge} µC</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Avstand r (m)</label>
          <input
            type="range"
            min={0.5}
            max={5}
            step={0.1}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{distance.toFixed(1)} m</p>
        </div>
      </div>

      <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto mb-4">
        {/* Equipotential rings */}
        {charge !== 0 &&
          rings.map((ring, i) => (
            <circle
              key={i}
              cx="150"
              cy="100"
              r={ring.r}
              fill="none"
              stroke={charge > 0 ? "#ef4444" : "#3b82f6"}
              strokeWidth="1"
              opacity={0.15 + 0.12 * (numRings - i)}
            />
          ))}
        {/* Charge */}
        <circle cx="150" cy="100" r="14"
          fill={charge > 0 ? "#ef4444" : charge < 0 ? "#3b82f6" : "#737373"}
        />
        <text x="150" y="105" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
          {charge > 0 ? "+" : charge < 0 ? "−" : "0"}
        </text>
        {/* Point P */}
        {charge !== 0 && (
          <>
            <circle cx="250" cy="100" r="4" fill="var(--foreground)" />
            <text x="255" y="95" fill="var(--foreground)" fontSize="11">P</text>
            <line x1="164" y1="100" x2="246" y2="100" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4" />
            <text x="205" y="118" textAnchor="middle" fill="var(--muted)" fontSize="10">
              r = {distance.toFixed(1)} m
            </text>
          </>
        )}
      </svg>

      <div className="text-center space-y-1">
        <p className="text-sm text-[var(--muted)]">
          {charge === 0
            ? "Ingen ladning"
            : charge > 0
            ? "Positivt potensial — avtar med avstand"
            : "Negativt potensial — øker (mot null) med avstand"}
        </p>
        <p className="text-2xl font-bold">
          V = {Math.abs(V) < 1
            ? V.toFixed(3)
            : Math.abs(V) >= 1e6
            ? (V / 1e6).toFixed(2) + " MV"
            : Math.abs(V) >= 1e3
            ? (V / 1e3).toFixed(2) + " kV"
            : V.toFixed(1) + " V"}
        </p>
      </div>
    </div>
  );
}

/* ─── Interactive: Energibevaring for ladet partikkel ─── */
function EnergyConservation() {
  const [voltage, setVoltage] = useState(500); // V
  const [separation, setSeparation] = useState(5.0); // cm
  const e = 1.6e-19;
  const me = 9.11e-31;
  const E_field = voltage / (separation * 0.01);
  const v_final = Math.sqrt((2 * e * voltage) / me);
  const t = v_final / (e * E_field / me);
  const posPercent = Math.min(95, 20 + (voltage / 1000) * 60);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Energibevaring — elektron mellom plater</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Spenning V (V)</label>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{voltage} V</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Plateavstand d (cm)</label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={separation}
            onChange={(e) => setSeparation(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{separation.toFixed(1)} cm</p>
        </div>
      </div>

      {/* Visual */}
      <svg viewBox="0 0 360 140" className="w-full max-w-lg mx-auto mb-4">
        {/* Negative plate (left) */}
        <rect x="40" y="20" width="8" height="100" fill="#3b82f6" rx="2" />
        <text x="44" y="135" textAnchor="middle" fill="#3b82f6" fontSize="11">−</text>
        {/* Positive plate (right) */}
        <rect x="312" y="20" width="8" height="100" fill="#ef4444" rx="2" />
        <text x="316" y="135" textAnchor="middle" fill="#ef4444" fontSize="11">+</text>
        {/* E-field arrows */}
        {[30, 50, 70, 90].map((y) => (
          <g key={y}>
            <line x1="60" y1={y} x2="305" y2={y} stroke="var(--muted)" strokeWidth="0.8" opacity="0.3" />
            <polygon points={`305,${y - 3} 311,${y} 305,${y + 3}`} fill="var(--muted)" opacity="0.3" />
          </g>
        ))}
        <text x="180" y="115" textAnchor="middle" fill="var(--muted)" fontSize="10">E = {E_field.toExponential(2)} V/m</text>
        {/* Electron */}
        <circle cx={55 + posPercent * 2.5} cy="60" r="6" fill="#3b82f6" />
        <text x={55 + posPercent * 2.5} y="64" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">e⁻</text>
        {/* Arrow showing direction */}
        <line x1={55 + posPercent * 2.5 + 10} y1="60" x2={55 + posPercent * 2.5 + 30} y2="60"
          stroke="#22c55e" strokeWidth="2" markerEnd="url(#e-arrow)" />
        <defs>
          <marker id="e-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="#22c55e" />
          </marker>
        </defs>
      </svg>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-[var(--muted)]">E-felt</p>
          <p className="font-bold text-sm">{E_field.toExponential(2)} V/m</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">Sluttfart</p>
          <p className="font-bold text-sm">{v_final.toExponential(3)} m/s</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">Tid</p>
          <p className="font-bold text-sm">{t.toExponential(3)} s</p>
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

        {/* 23.1 Elektrisk potensiell energi */}
        <TheorySummary
          title="23.1 Elektrisk potensiell energi"
          mustKnow={[
            "Arbeid utført av elektrisk kraft: W = −ΔEp",
            "Potensiell energi i uniformt felt: Ep = q₀Ey",
            "Potensiell energi mellom to punktladninger: Ep = kq₁q₂/r",
            "Energibevaring: Ek1 + Ep1 = Ek2 + Ep2",
            "Forskjellen på potensiell energi og potensial",
          ]}
        >
          <p>
            <strong>Analogi:</strong> Akkurat som gravitasjonen gjør arbeid når en masse faller,
            gjør det elektriske feltet arbeid når en ladning beveger seg i feltet.
            I begge tilfeller endres den <strong>potensielle energien</strong>.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Arbeid og potensiell energi</p>
            <p>
              Når elektriske krefter flytter en ladning fra punkt a til punkt b, gjør de et arbeid:
            </p>
            <div className="mt-2">
              <InlineLatex latex="W_{a \to b} = \int_a^b \vec{F}_e \cdot d\vec{l}" />
            </div>
            <p className="mt-2">
              Sammenhengen mellom arbeid og potensiell energi:
            </p>
            <div className="mt-1">
              <InlineLatex latex="W_{a \to b} = -\Delta E_p = -(E_{p,b} - E_{p,a})" />
            </div>
          </div>

          <h4 className="font-semibold mt-6 mb-2">Uniformt felt</h4>
          <p>
            I et uniformt elektrisk felt (f.eks. mellom parallelle plater) er den potensielle
            energien til en ladning <InlineLatex latex="q_0" />:
          </p>
          <FormulaBox
            latex="E_p = q_0 E y"
            title="Potensiell energi i uniformt felt"
            variant="gold"
            description="y er avstanden fra et fritt valgt nullnivå, målt i retning MOT feltretningen (oppover hvis feltet peker nedover)."
          />

          <p className="mt-4">
            Arbeid utført av feltet:
          </p>
          <FormulaBox
            latex="W_{a \to b} = -\Delta E_p = -(q_0 E y_b - q_0 E y_a) = q_0 E(y_a - y_b)"
            variant="blue"
          />

          <h4 className="font-semibold mt-6 mb-2">Energibevaring</h4>
          <p>
            Når <em>bare</em> elektriske krefter gjør arbeid, er den totale mekaniske energien bevart:
          </p>
          <FormulaBox
            latex="E_{k,1} + E_{p,1} = E_{k,2} + E_{p,2}"
            title="Energibevaring"
            variant="gold"
            description="Total mekanisk energi (kinetisk + potensiell) er bevart når bare konservative krefter gjør arbeid."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Sammenheng med mekanikk</p>
            <p className="text-sm">
              Dette er <strong>nøyaktig det samme prinsippet</strong> som gravitasjonell energibevaring
              fra kap. 7! Der hadde vi <InlineLatex latex="E_p = mgy" />. Her har vi{" "}
              <InlineLatex latex="E_p = q_0 E y" />. Erstatt mg med q₀E — resten er identisk.
            </p>
          </div>

          <h4 className="font-semibold mt-6 mb-2">Potensiell energi mellom to punktladninger</h4>
          <p>
            For to punktladninger q og q₀ i avstand r:
          </p>
          <FormulaBox
            latex="E_p = \frac{1}{4\pi\varepsilon_0}\frac{q_0\, q}{r}"
            title="Potensiell energi mellom to punktladninger"
            variant="gold"
            description="Nullnivå: Ep = 0 når r → ∞. Positiv Ep: like ladninger (frastøtning). Negativ Ep: ulike ladninger (tiltrekning)."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fortegnregel for Ep</p>
            <ul className="space-y-1 text-sm">
              <li>• Like ladninger (begge + eller begge −): <strong>Ep &gt; 0</strong> — systemet «vil» bort fra hverandre</li>
              <li>• Ulike ladninger (+ og −): <strong>Ep &lt; 0</strong> — systemet er bundet sammen</li>
              <li>• Her bruker vi <em>ikke</em> absoluttverdien — fortegnet på ladningene gir Ep riktig fortegn!</li>
            </ul>
          </div>

          <p className="mt-4">
            For <strong>flere ladninger</strong>: Summer bidragene fra alle par:
          </p>
          <FormulaBox
            latex="E_p = \frac{q_0}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1} + \frac{q_2}{r_2} + \cdots + \frac{q_k}{r_k}\right)"
            variant="blue"
          />
        </TheorySummary>

        {/* 23.2 Elektrisk potensial */}
        <TheorySummary
          title="23.2 Elektrisk potensial"
          mustKnow={[
            "Definisjon: V = Ep/q₀ (potensiell energi per enhet ladning)",
            "Enhet: Volt (V) = J/C",
            "Punktladning: V = kq/r",
            "Potensialforskjell = spenning: Vab = Va − Vb",
            "Sammenheng E og V: E = V/y (uniformt felt)",
            "Elektronvolt: 1 eV = 1,60 · 10⁻¹⁹ J",
          ]}
        >
          <p>
            <strong>Elektrisk potensial</strong> er potensiell energi per enhet ladning.
            Mens potensiell energi avhenger av testladningen q₀, er potensial en egenskap
            ved selve feltet — uavhengig av hvilken ladning vi plasserer der.
          </p>

          <FormulaBox
            latex="V = \frac{E_p}{q_0} \qquad \left[\frac{\text{J}}{\text{C}} = \text{V (Volt)}\right]"
            title="Definisjon av elektrisk potensial"
            variant="gold"
            description="V er en skalar — ingen retning! Mye enklere å jobbe med enn E-feltet."
          />

          <h4 className="font-semibold mt-6 mb-2">Potensial i ulike situasjoner</h4>

          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <h5 className="font-semibold text-sm mb-2">Uniformt felt</h5>
              <FormulaBox latex="V = Ey" variant="blue" />
              <p className="text-xs text-[var(--muted)]">y måles mot feltretningen</p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] p-4">
              <h5 className="font-semibold text-sm mb-2">Punktladning</h5>
              <FormulaBox latex="V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}" variant="blue" />
              <p className="text-xs text-[var(--muted)]">q med fortegn! V = 0 ved r → ∞</p>
            </div>
          </div>

          <p>
            For <strong>flere punktladninger</strong> (superposisjon — enklere enn for E-felt fordi V er en skalar!):
          </p>
          <FormulaBox
            latex="V = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1} + \frac{q_2}{r_2} + \cdots + \frac{q_k}{r_k}\right)"
            title="Potensial fra flere punktladninger"
            variant="gold"
            description="Bare summer — ingen vektordekomponering nødvendig!"
          />

          <h4 className="font-semibold mt-6 mb-2">Potensialforskjell (spenning)</h4>
          <p>
            <strong>Potensialforskjellen</strong> mellom punktene a og b kalles <strong>spenningen</strong>:
          </p>
          <FormulaBox
            latex="V_{ab} = V_a - V_b = -\frac{\Delta E_p}{q_0} = \frac{W_{a \to b}}{q_0}"
            title="Potensialforskjell / Spenning"
            variant="gold"
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng mellom E og V</p>
            <p>I et uniformt felt:</p>
            <div className="mt-1">
              <InlineLatex latex="V = Ey \;\Rightarrow\; E = \frac{V}{y}" />
            </div>
            <p className="mt-2">
              Derfor er <InlineLatex latex="\text{N/C} = \text{V/m}" /> — to likeverdige enheter for E-felt!
            </p>
          </div>

          <h4 className="font-semibold mt-6 mb-2">Elektronvolt (eV)</h4>
          <p>
            <strong>Elektronvolt</strong> er energiendringen et elektron får ved å bevege seg
            gjennom en potensialforskjell på 1 Volt:
          </p>
          <FormulaBox
            latex="1\;\text{eV} = e \cdot 1\;\text{V} = 1{,}60 \cdot 10^{-19}\;\text{J}"
            title="Elektronvolt"
            variant="blue"
            description="En praktisk energienhet for atomær/subatomær fysikk. Ep = V · q₀."
          />
        </TheorySummary>
      </div>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <div id="formler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox
            latex="E_p = q_0 E y"
            title="Pot. energi (uniformt felt)"
            variant="gold"
          />
          <FormulaBox
            latex="E_p = \frac{1}{4\pi\varepsilon_0}\frac{q_0 q}{r}"
            title="Pot. energi (punktladninger)"
            variant="gold"
          />
          <FormulaBox
            latex="V = \frac{E_p}{q_0}"
            title="Elektrisk potensial"
            variant="gold"
          />
          <FormulaBox
            latex="V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}"
            title="Potensial fra punktladning"
            variant="gold"
          />
          <FormulaBox
            latex="V_{ab} = V_a - V_b = -\frac{\Delta E_p}{q_0}"
            title="Potensialforskjell (spenning)"
            variant="gold"
          />
          <FormulaBox
            latex="E_{k,1} + E_{p,1} = E_{k,2} + E_{p,2}"
            title="Energibevaring"
            variant="gold"
          />
          <FormulaBox
            latex="E = \frac{V}{d}"
            title="E-felt mellom plater"
            variant="blue"
          />
          <FormulaBox
            latex="1\;\text{eV} = 1{,}60 \cdot 10^{-19}\;\text{J}"
            title="Elektronvolt"
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
                  <th className="text-left py-2">Tips</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Potensial fra punktladninger</td>
                  <td className="py-2 pr-4"><InlineLatex latex="V = kq/r" /></td>
                  <td className="py-2">Summer skalarer — ingen vektorer!</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Fart av ladet partikkel</td>
                  <td className="py-2 pr-4">Energibevaring</td>
                  <td className="py-2"><InlineLatex latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Arbeid for å flytte ladning</td>
                  <td className="py-2 pr-4"><InlineLatex latex="W = q_0(V_a - V_b)" /></td>
                  <td className="py-2">Eller: W = −ΔEp</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">E-felt mellom plater</td>
                  <td className="py-2 pr-4"><InlineLatex latex="E = V/d" /></td>
                  <td className="py-2">V = spenningen, d = avstand</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Potensiell energi mellom ladninger</td>
                  <td className="py-2 pr-4"><InlineLatex latex="E_p = kq_1q_2/r" /></td>
                  <td className="py-2">Bruk fortegn! + → frastøtning</td>
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
        <PotentialVisualizer />
        <EnergyConservation />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Elektron mellom plater med energibevaring */}
        <ExerciseCard
          number={1}
          title="Elektron mellom plater — energibevaring"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et elektron slippes fra ro ved den negative plata. Avstanden mellom platene er{" "}
                <InlineLatex latex="d = 1{,}0\;\text{cm}" /> og feltstyrken er{" "}
                <InlineLatex latex="E = 1{,}0 \cdot 10^5\;\text{N/C}" />.
              </p>
              <p className="mt-2">Hva er farten når elektronet treffer den positive plata?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: (
                <p>
                  Bruk energibevaring: Ep₁ + Ek₁ = Ep₂ + Ek₂. Elektronet starter fra ro
                  (Ek₁ = 0). Velg nullnivå for Ep ved den positive plata.
                </p>
              ),
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  For et elektron (q = −e) som beveger seg <em>med</em> feltet (fra − til + plate):
                  Ep₁ = 0 (ved − plate, som er nullnivå? Nei!). Tenk på det slik:
                  elektronet har ladning −e, og Ep = qEy. Ved negativ plate er y = 0, ved positiv plate er y = −d
                  (elektronet beveger seg i feltretningen). Eller enklere:{" "}
                  <InlineLatex latex="\tfrac{1}{2}mv^2 = eEd" />.
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Energibevaring:</strong></p>
              <p className="text-sm">
                Start: Ek₁ = 0 (fra ro), Ep₁ = 0 (nullnivå ved negativ plate).
                Slutt: Ep₂ = −eEd (elektronet har lavere pot. energi ved positiv plate).
              </p>
              <FormulaBox latex="E_{p,1} + E_{k,1} = E_{p,2} + E_{k,2}" variant="blue" />
              <FormulaBox latex="0 + 0 = -eEd + \tfrac{1}{2}m_e v^2" variant="blue" />
              <FormulaBox latex="\tfrac{1}{2}m_e v^2 = eEd" variant="blue" />
              <FormulaBox
                latex="v = \sqrt{\frac{2eEd}{m_e}} = \sqrt{\frac{2 \cdot 1{,}60\cdot10^{-19}\cdot 1{,}0\cdot10^5\cdot 0{,}01}{9{,}11\cdot10^{-31}}}"
                variant="blue"
              />
              <FormulaBox
                latex="v = \underline{\underline{1{,}9 \cdot 10^7\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring er ofte enklere enn kinematikk — vi trenger ikke å vite akselerasjonen eller tiden, bare start- og slutttilstand!</p>
            </div>
          }
        />

        {/* Eksempel 2: Ep mellom proton og elektron */}
        <ExerciseCard
          number={2}
          title="Potensiell energi i hydrogenatomet"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                Finn den potensielle energien mellom protonen og elektronet i et hydrogenatom
                (forenklet modell). Avstanden er Bohrs radius:{" "}
                <InlineLatex latex="r_0 = 0{,}529 \cdot 10^{-10}\;\text{m}" />.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk formelen for potensiell energi mellom to punktladninger. Proton: +e. Elektron: −e.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <FormulaBox
                latex="E_p = \frac{1}{4\pi\varepsilon_0}\frac{e \cdot (-e)}{r_0} = 8{,}99\cdot10^9 \cdot \frac{(1{,}60\cdot10^{-19})(-1{,}60\cdot10^{-19})}{0{,}529\cdot10^{-10}}"
                variant="blue"
              />
              <FormulaBox
                latex="E_p = \underline{\underline{-4{,}35 \cdot 10^{-18}\;\text{J}}} = -27{,}2\;\text{eV}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Negativ Ep betyr at systemet er <strong>bundet</strong> — man må tilføre energi for å
                fjerne elektronet fra protonen. Dette er ioniseringsenergien.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Negativt fortegn i Ep betyr at ladningene er bundet. For å skille dem må man tilføre energi (gjøre arbeid).</p>
            </div>
          }
        />

        {/* Eksempel 3: Proton i uniformt felt */}
        <ExerciseCard
          number={3}
          title="Proton i uniformt felt — arbeid og spenning"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et proton beveger seg rettlinjet en avstand{" "}
                <InlineLatex latex="d = 0{,}50\;\text{m}" /> langs et uniformt elektrisk felt{" "}
                <InlineLatex latex="E = 1{,}5 \cdot 10^7\;\text{V/m}" />.
              </p>
              <p className="mt-2">a) Finn kraften på protonet.</p>
              <p>b) Finn arbeidet utført på protonet.</p>
              <p>c) Finn potensialforskjellen V_ab.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Kraft: F = eE. Arbeid: W = F·d. Potensialforskjell: Vab = W/q₀.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kraft</strong></p>
              <FormulaBox
                latex="F_e = eE = 1{,}60\cdot10^{-19}\cdot 1{,}5\cdot10^7 = \underline{\underline{2{,}4 \cdot 10^{-12}\;\text{N}}}"
                variant="gold"
              />

              <p><strong>b) Arbeid</strong></p>
              <FormulaBox
                latex="W = F_e \cdot d = 2{,}4\cdot10^{-12}\cdot 0{,}50 = \underline{\underline{1{,}2 \cdot 10^{-12}\;\text{J}}} \;(= 7{,}5 \cdot 10^6\;\text{eV})"
                variant="gold"
              />

              <p><strong>c) Potensialforskjell</strong></p>
              <FormulaBox
                latex="V_{ab} = -\frac{\Delta E_p}{q_0} = \frac{W}{q_0} = \frac{1{,}2\cdot10^{-12}}{1{,}60\cdot10^{-19}} = \underline{\underline{7{,}5 \cdot 10^6\;\text{V}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Potensialforskjellen = arbeid per enhet ladning. Den forteller oss hvor mye energi feltet gir per coulomb.</p>
            </div>
          }
        />

        {/* Eksempel 4: Fart mellom to punktladninger */}
        <ExerciseCard
          number={4}
          title="Ladning mellom to punktladninger — energibevaring"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                To ladninger: <InlineLatex latex="q_A = 3{,}0\;\text{nC}" /> og{" "}
                <InlineLatex latex="q_B = -3{,}0\;\text{nC}" /> er plassert med 3,0 cm avstand.
                En positiv ladning <InlineLatex latex="q_0 = 2{,}0\;\text{nC}" /> med masse{" "}
                <InlineLatex latex="m = 5{,}0 \cdot 10^{-9}\;\text{kg}" /> slippes fra ro i
                punkt a (midt mellom ladningene) og beveger seg til punkt b (1,0 cm fra q_B).
              </p>
              <p className="mt-2">Finn farten i punkt b.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: (
                <p>
                  Bruk energibevaring. Beregn potensialet V i punkt a og punkt b (fra begge
                  kildeladningene). Deretter:{" "}
                  <InlineLatex latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" />
                </p>
              ),
            },
            {
              label: "Hint 2",
              content: (
                <div>
                  <p>Punkt a: midt mellom, avstand d = 1,0 cm fra begge.</p>
                  <p>Punkt b: 1,0 cm fra qB, 2,0 cm fra qA.</p>
                  <p>Beregn V i hvert punkt med superposisjon.</p>
                </div>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1: Potensial i punkt a (midt mellom, d = 1,0 cm fra begge)</strong></p>
              <FormulaBox
                latex="V_1 = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_A}{d} + \frac{q_B}{d}\right) = k\left(\frac{3{,}0\cdot10^{-9}}{0{,}01} + \frac{-3{,}0\cdot10^{-9}}{0{,}01}\right) = 0"
                variant="blue"
              />
              <p className="text-sm">Symmetri: like store ladninger med motsatt fortegn → V = 0 i midten.</p>

              <p className="mt-3"><strong>Steg 2: Potensial i punkt b (2,0 cm fra qA, 1,0 cm fra qB)</strong></p>
              <FormulaBox
                latex="V_2 = k\left(\frac{3{,}0\cdot10^{-9}}{0{,}02} + \frac{-3{,}0\cdot10^{-9}}{0{,}01}\right) = 8{,}99\cdot10^9(150 - 300)\cdot10^{-9} = -1350\;\text{V}"
                variant="blue"
              />

              <p className="mt-3"><strong>Steg 3: Energibevaring</strong></p>
              <FormulaBox latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" variant="blue" />
              <p className="text-sm">v₁ = 0 (fra ro), V₁ = 0:</p>
              <FormulaBox latex="0 = q_0 V_2 + \tfrac{1}{2}mv_2^2" variant="blue" />
              <FormulaBox latex="\tfrac{1}{2}mv_2^2 = q_0(V_1 - V_2) = 2{,}0\cdot10^{-9}\cdot(0-(-1350))" variant="blue" />
              <FormulaBox
                latex="v_2 = \sqrt{\frac{2q_0(V_1 - V_2)}{m}} = \sqrt{\frac{2\cdot2{,}0\cdot10^{-9}\cdot1350}{5{,}0\cdot10^{-9}}} = \underline{\underline{46\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring med potensial er elegant: beregn V i start og slutt, sett inn i energibevaringen. Ingen behov for krefter, akselerasjon eller tid!</p>
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
            <h3 className="font-semibold text-lg mb-3">Strategi: Potensial fra punktladninger</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Identifiser alle kildeladninger og deres posisjoner</li>
              <li>Finn avstanden r fra hver kildeladning til punktet der du beregner V</li>
              <li>Beregn <InlineLatex latex="V = kq/r" /> for hver kildeladning (med fortegn på q!)</li>
              <li>Summer alle bidrag — det er bare tall, ingen vektorer!</li>
            </ol>
            <div className="mt-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Fordel fremfor E-felt: Potensial er en skalar. Du trenger ikke dekomponere i
                x og y — bare adder tallene!
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Energibevaring med ladede partikler</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Velg start- og sluttpunkt (der du vet / vil vite fart)</li>
              <li>Beregn potensialet V i begge punkter</li>
              <li>Sett opp energibevaring: <InlineLatex latex="q_0 V_1 + \tfrac{1}{2}mv_1^2 = q_0 V_2 + \tfrac{1}{2}mv_2^2" /></li>
              <li>Løs for ukjent (vanligvis v₂)</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Arbeid for å flytte en ladning</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Finn potensialet i start og sluttpunkt</li>
              <li>Arbeidet utført av <em>ytre</em> krefter: <InlineLatex latex="W_{\text{ytre}} = q_0(V_b - V_a)" /></li>
              <li>Arbeidet utført av <em>E-feltet</em>: <InlineLatex latex="W_E = q_0(V_a - V_b) = -W_{\text{ytre}}" /></li>
            </ol>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
            <ul className="space-y-1.5 text-sm">
              <li>• Glemmer fortegn på ladningen i <InlineLatex latex="V = kq/r" /> — her brukes fortegn!</li>
              <li>• Blander potensial (V, skalar) med potensiell energi (Ep, avhenger av q₀)</li>
              <li>• Setter absoluttverdien i Ep-formelen — nei! Ep = kq₁q₂/r <em>med</em> fortegn</li>
              <li>• Feil fortegn på arbeid: W_E = −ΔEp, men W_ytre = +ΔEp</li>
              <li>• Glemmer å konvertere eV til J (eller omvendt)</li>
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
          title="Potensial og arbeid med tre punktladninger"
          difficulty="vanskelig"
          source="Oblig 3, oppg. 3"
          problem={
            <div>
              <p>
                En punktladning <InlineLatex latex="q_1 = 3\;\mu\text{C}" /> ligger i (3m, 0) og{" "}
                <InlineLatex latex="q_2 = 6\;\mu\text{C}" /> ligger i (−3m, 0).
              </p>
              <p className="mt-2">a) Hva er det elektriske potensialet i origo og i punktet (0, 4m)?</p>
              <p>b) En tredje punktladning <InlineLatex latex="q_3 = 4\;\mu\text{C}" /> plasseres i origo. Hvor stort arbeid må utføres på q₃ for å flytte den til (0, 4m)?</p>
              <p>c) Finn størrelsen og retningen på kraften som virker på q₃ fra de to andre ladningene når q₃ er i (0, 4m).</p>
              <p>d) Beregn størrelse og retning på det elektriske feltet i origo.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1 (a)",
              content: (
                <p>
                  Potensial er en skalar. I origo er avstanden til q₁ = 3 m og til q₂ = 3 m.
                  I (0,4) er avstanden til begge: <InlineLatex latex="r = \sqrt{3^2 + 4^2} = 5\;\text{m}" />.
                </p>
              ),
            },
            {
              label: "Hint 2 (b)",
              content: (
                <p>
                  Arbeid utført av ytre krefter = endring i potensiell energi:{" "}
                  <InlineLatex latex="W = q_3(V_{\text{slutt}} - V_{\text{start}})" />.
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Potensial</strong></p>
              <p className="text-sm">I origo (r₁ = 3 m, r₂ = 3 m):</p>
              <FormulaBox
                latex="V_0 = k\left(\frac{q_1}{r_1} + \frac{q_2}{r_2}\right) = 8{,}99\cdot10^9\left(\frac{3\cdot10^{-6}}{3} + \frac{6\cdot10^{-6}}{3}\right) = \underline{\underline{27\;\text{kV}}}"
                variant="gold"
              />
              <p className="text-sm">I (0, 4m): <InlineLatex latex="r_1 = r_2 = \sqrt{9+16} = 5\;\text{m}" /></p>
              <FormulaBox
                latex="V_{(0,4)} = k\left(\frac{3\cdot10^{-6}}{5} + \frac{6\cdot10^{-6}}{5}\right) = \underline{\underline{16{,}2\;\text{kV}}}"
                variant="gold"
              />

              <p className="mt-3"><strong>b) Arbeid</strong></p>
              <FormulaBox
                latex="W = q_3(V_{\text{slutt}} - V_{\text{start}}) = 4\cdot10^{-6}(16200 - 27000) = \underline{\underline{-0{,}043\;\text{J}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">Negativt arbeid — feltet gjør arbeid for oss, vi trenger ikke tilføre energi.</p>

              <p className="mt-3"><strong>c) Kraft på q₃ i (0, 4m)</strong></p>
              <p className="text-sm">Avstand fra q₁ og q₂ til (0,4): begge = 5 m. Vinkelen fra x-aksen: θ = tan⁻¹(4/3) = 53,1°.</p>
              <FormulaBox latex="F_1 = k\frac{|q_1 q_3|}{r^2} = 8{,}99\cdot10^9\cdot\frac{3\cdot10^{-6}\cdot 4\cdot10^{-6}}{25} = 4{,}32\cdot10^{-3}\;\text{N}" variant="blue" />
              <FormulaBox latex="F_2 = k\frac{|q_2 q_3|}{r^2} = 8{,}99\cdot10^9\cdot\frac{6\cdot10^{-6}\cdot 4\cdot10^{-6}}{25} = 8{,}63\cdot10^{-3}\;\text{N}" variant="blue" />
              <p className="text-sm">Dekomponér: F₁ peker fra q₁ til q₃ (bort fra positiv), F₂ peker fra q₂ til q₃.</p>
              <FormulaBox latex="\sum F_x = -F_1\sin\alpha + F_2\sin\alpha = (F_2 - F_1)\sin\alpha" variant="blue" />
              <p className="text-sm">der α = tan⁻¹(3/4) ≈ 36,9° (vinkel fra y-aksen, dvs. sin α = 3/5 = 0,6).</p>
              <FormulaBox
                latex="\sum F_x = (8{,}63 - 4{,}32)\cdot10^{-3}\cdot 0{,}6 = 2{,}59\cdot10^{-3}\;\text{N}"
                variant="blue"
              />
              <FormulaBox
                latex="\sum F_y = F_1\cos\alpha + F_2\cos\alpha = (4{,}32 + 8{,}63)\cdot10^{-3}\cdot 0{,}8 = 10{,}36\cdot10^{-3}\;\text{N}"
                variant="blue"
              />
              <FormulaBox
                latex="F = \sqrt{F_x^2 + F_y^2} = \underline{\underline{10{,}7\cdot10^{-3}\;\text{N} = 10{,}7\;\text{mN}}}"
                variant="gold"
              />

              <p className="mt-3"><strong>d) E-felt i origo</strong></p>
              <p className="text-sm">q₁ i (+3,0): E₁ peker i −x (bort fra positiv). q₂ i (−3,0): E₂ peker i +x (bort fra positiv).</p>
              <FormulaBox latex="E_1 = k\frac{|q_1|}{r_1^2} = 8{,}99\cdot10^9\cdot\frac{3\cdot10^{-6}}{9} = 3000\;\text{V/m} \;\text{(i −x)}" variant="blue" />
              <FormulaBox latex="E_2 = k\frac{|q_2|}{r_2^2} = 8{,}99\cdot10^9\cdot\frac{6\cdot10^{-6}}{9} = 6000\;\text{V/m} \;\text{(i +x)}" variant="blue" />
              <FormulaBox
                latex="E_x = -3000 + 6000 = 3000\;\text{V/m}"
                variant="blue"
              />
              <FormulaBox
                latex="E = \underline{\underline{3{,}0\;\text{kV/m i }+x\text{-retning}}}"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Elektronvolt og energikonvertering"
          difficulty="lett"
          problem={
            <div>
              <p>
                Et proton akselereres gjennom en potensialforskjell på 500 V fra ro.
              </p>
              <p className="mt-2">a) Hvor stor kinetisk energi får protonet (i joule og i eV)?</p>
              <p>b) Hva er farten til protonet etter akselerasjonen?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Kinetisk energi = arbeid utført av feltet = qΔV. For proton: q = e.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kinetisk energi</strong></p>
              <FormulaBox
                latex="E_k = e \cdot \Delta V = 1{,}60\cdot10^{-19}\cdot 500 = \underline{\underline{8{,}0\cdot10^{-17}\;\text{J} = 500\;\text{eV}}}"
                variant="gold"
              />

              <p><strong>b) Fart</strong></p>
              <FormulaBox
                latex="v = \sqrt{\frac{2E_k}{m_p}} = \sqrt{\frac{2\cdot 8{,}0\cdot10^{-17}}{1{,}67\cdot10^{-27}}} = \underline{\underline{3{,}1\cdot10^5\;\text{m/s}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Sammenlign med elektronet: protoner har ~1836× mer masse, så de får mye lavere fart for samme spenning.
              </p>
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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips for kap. 23</h4>
          <ul className="text-sm space-y-1">
            <li>• Potensialoppgaver dukker opp <strong>nesten alltid</strong> sammen med kap. 21-stoff</li>
            <li>• Typisk: finn V i et punkt, deretter finn arbeid for å flytte en ladning dit</li>
            <li>• Energibevaring er et mektig verktøy — brukes ofte til å finne fart</li>
            <li>• Husk: V er skalar (enkel summering), E er vektor (krever dekomponering)</li>
          </ul>
        </div>

        <ExerciseCard
          number={1}
          title="Arbeid og potensial — to punktladninger"
          difficulty="vanskelig"
          source="Eksamen ELE100 V2017"
          problem={
            <div>
              <p>
                En positiv punktladning <InlineLatex latex="q_A = 2{,}50\;\mu\text{C}" /> plasseres
                på x-aksen i <InlineLatex latex="x = 2{,}00\;\text{cm}" />.
              </p>
              <p className="mt-2">
                a) Hvor stort arbeid kreves for å bringe en annen punktladning B, med like stor
                positiv ladning, fra uendelig til punktet <InlineLatex latex="x = 4{,}00\;\text{cm}" />?
              </p>
              <p>
                b) Regn ut det elektriske potensialet i origo satt opp av de to punktladningene.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: (
                <p>
                  a) Arbeid = endring i potensiell energi. Avstanden mellom ladningene
                  blir 4,00 − 2,00 = 2,00 cm = 0,0200 m.
                </p>
              ),
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  b) Potensialet er summen av bidragene fra qA (avstand 2,00 cm) og
                  qB (avstand 4,00 cm).
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Arbeid for å bringe qB fra uendelig</strong></p>
              <p className="text-sm">
                Avstanden mellom qA og qB: r = 4,00 − 2,00 = 2,00 cm = 0,0200 m.
                Ved uendelig: Ep = 0.
              </p>
              <FormulaBox
                latex="E_1 = \frac{1}{4\pi\varepsilon_0}\frac{q_A q_B}{r} = 8{,}99\cdot10^9\cdot\frac{(2{,}50\cdot10^{-6})^2}{0{,}0200}"
                variant="blue"
              />
              <FormulaBox
                latex="W = E_1 - E_0 = \underline{\underline{2{,}80\;\text{J}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Positivt arbeid — vi må dytte ladningene sammen (like ladninger frastøter).
              </p>

              <p className="mt-3"><strong>b) Potensial i origo</strong></p>
              <p className="text-sm">
                Avstand fra origo til qA: r₁ = 2,00 cm = 0,0200 m.
                Avstand fra origo til qB: r₂ = 4,00 cm = 0,0400 m.
              </p>
              <FormulaBox
                latex="V_0 = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_A}{r_1} + \frac{q_B}{r_2}\right) = 8{,}99\cdot10^9\left(\frac{2{,}50\cdot10^{-6}}{0{,}02} + \frac{2{,}50\cdot10^{-6}}{0{,}04}\right)"
                variant="blue"
              />
              <FormulaBox
                latex="V_0 = 8{,}99\cdot10^9 \cdot (1{,}25\cdot10^{-4} + 6{,}25\cdot10^{-5}) = \underline{\underline{1{,}69\;\text{MV}}}"
                variant="gold"
              />
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Uniformt felt — komplett analyse"
          difficulty="vanskelig"
          source="Oblig 3, oppg. 2 (tilpasset)"
          problem={
            <div>
              <p>
                To parallelle metallskiver er plassert med avstand{" "}
                <InlineLatex latex="d = 0{,}050\;\text{m}" /> og koblet til 500 V.
                Skivene er sirkulære med radius <InlineLatex latex="r = 0{,}25\;\text{m}" />.
              </p>
              <p className="mt-2">a) Hva er E-feltet mellom platene?</p>
              <p>b) Et elektron slippes fra ro ved den negative plata. Finn farten og tiden til det treffer den positive plata.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>a) E = V/d for uniformt felt mellom plater.</p>,
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  b) Bruk energibevaring for farten: ½mv² = eV.
                  Bruk kinematikk for tiden: d = ½at².
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) E-felt</strong></p>
              <FormulaBox
                latex="E = \frac{V}{d} = \frac{500}{0{,}050} = \underline{\underline{1{,}0\cdot10^4\;\text{V/m}}}"
                variant="gold"
              />

              <p><strong>b) Fart (energibevaring)</strong></p>
              <FormulaBox latex="\tfrac{1}{2}m_e v^2 = eV" variant="blue" />
              <FormulaBox
                latex="v = \sqrt{\frac{2eV}{m_e}} = \sqrt{\frac{2\cdot1{,}60\cdot10^{-19}\cdot 500}{9{,}11\cdot10^{-31}}} = \underline{\underline{1{,}33\cdot10^7\;\text{m/s}}}"
                variant="gold"
              />

              <p><strong>Tid (kinematikk)</strong></p>
              <FormulaBox
                latex="a = \frac{eE}{m_e} = \frac{1{,}60\cdot10^{-19}\cdot10^4}{9{,}11\cdot10^{-31}} = 1{,}76\cdot10^{15}\;\text{m/s}^2"
                variant="blue"
              />
              <FormulaBox
                latex="t = \sqrt{\frac{2d}{a}} = \sqrt{\frac{2\cdot0{,}050}{1{,}76\cdot10^{15}}} = \underline{\underline{7{,}5\cdot10^{-9}\;\text{s} \approx 7{,}5\;\text{ns}}}"
                variant="gold"
              />
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
