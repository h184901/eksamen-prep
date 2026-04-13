"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 6)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Arbeid-kalkulator ─── */
function WorkCalculator() {
  const [force, setForce] = useState(210);
  const [distance, setDistance] = useState(18);
  const [angle, setAngle] = useState(30);

  const angleRad = (angle * Math.PI) / 180;
  const work = force * distance * Math.cos(angleRad);
  const Fx = force * Math.cos(angleRad);
  const Fy = force * Math.sin(angleRad);

  const arrowLen = 80;
  const arrowX = arrowLen * Math.cos(angleRad);
  const arrowY = -arrowLen * Math.sin(angleRad);

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Arbeid — Kalkulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Kraft F (N)
          </label>
          <input
            type="range"
            min={10}
            max={500}
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{force} N</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Strekning s (m)
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{distance} m</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            Vinkel &phi; (grader)
          </label>
          <input
            type="range"
            min={0}
            max={180}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{angle}°</p>
        </div>
      </div>

      {/* Visual */}
      <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto mb-4">
        {/* Ground */}
        <line x1="30" y1="130" x2="370" y2="130" stroke="var(--muted)" strokeWidth="1.5" />
        {/* Object */}
        <rect x="80" y="100" width="40" height="30" rx="4" fill="var(--accent)" opacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
        {/* Displacement arrow */}
        <line x1="100" y1="145" x2="300" y2="145" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-w)" />
        <text x="200" y="165" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
          s = {distance} m
        </text>
        {/* Force arrow */}
        <line
          x1="120"
          y1="115"
          x2={120 + arrowX}
          y2={115 + arrowY}
          stroke="#ef4444"
          strokeWidth="2.5"
          markerEnd="url(#arrow-red-w)"
        />
        <text x={125 + arrowX * 0.5} y={110 + arrowY * 0.5 - 8} textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
          F = {force} N
        </text>
        {/* Angle arc */}
        {angle > 0 && angle < 180 && (
          <>
            <path
              d={`M 155 115 A 35 35 0 0 ${angle > 0 ? 0 : 1} ${120 + 35 * Math.cos(angleRad)} ${115 - 35 * Math.sin(angleRad)}`}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="3"
            />
            <text x="165" y={angle > 20 ? 108 : 112} fill="var(--muted)" fontSize="11">
              &phi; = {angle}°
            </text>
          </>
        )}
        <defs>
          <marker id="arrow-blue-w" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
          </marker>
          <marker id="arrow-red-w" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-[var(--muted)]">F-komponent langs s</p>
          <p className="text-lg font-bold">{Fx.toFixed(1)} N</p>
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">cos &phi;</p>
          <p className="text-lg font-bold">{Math.cos(angleRad).toFixed(3)}</p>
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">
            {work >= 0 ? "Positivt arbeid" : "Negativt arbeid"}
          </p>
          <p className={`text-2xl font-bold ${work >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            W = {(work / 1000).toFixed(2)} kJ
          </p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {angle < 90 ? "Kraftkomponenten i bevegelsesretningen er positiv — arbeidet er positivt." :
         angle === 90 ? "Kraften er vinkelrett på bevegelsen — arbeidet er null!" :
         "Kraftkomponenten er motsatt bevegelsesretningen — arbeidet er negativt."}
      </p>
    </div>
  );
}

/* ─── Interactive: Arbeid-energi visualisering ─── */
function WorkEnergyVisualizer() {
  const [mass, setMass] = useState(1500);
  const [v1, setV1] = useState(2.0);
  const [workTotal, setWorkTotal] = useState(10);

  const ek1 = 0.5 * mass * v1 * v1;
  const ek2 = ek1 + workTotal * 1000;
  const v2 = ek2 > 0 ? Math.sqrt((2 * ek2) / mass) : 0;

  const maxEk = Math.max(ek1, ek2, 1);
  const bar1 = (ek1 / maxEk) * 100;
  const bar2 = ek2 > 0 ? (ek2 / maxEk) * 100 : 0;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Arbeid-energi-teoremet</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Masse m (kg)</label>
          <input
            type="range" min={100} max={3000} step={100} value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{mass} kg</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Startfart v₁ (m/s)</label>
          <input
            type="range" min={0} max={30} step={0.5} value={v1}
            onChange={(e) => setV1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{v1.toFixed(1)} m/s</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">Totalt arbeid W (kJ)</label>
          <input
            type="range" min={-50} max={50} step={1} value={workTotal}
            onChange={(e) => setWorkTotal(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{workTotal} kJ</p>
        </div>
      </div>

      {/* Energy bars */}
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>E<sub>K1</sub> = &frac12;mv₁²</span>
            <span className="font-mono">{(ek1 / 1000).toFixed(1)} kJ</span>
          </div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-lg transition-all duration-300"
              style={{ width: `${Math.max(bar1, 2)}%` }}
            />
          </div>
        </div>
        <div className="text-center text-sm font-bold">
          <span className={workTotal >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            + W<sub>tot</sub> = {workTotal >= 0 ? "+" : ""}{workTotal} kJ
          </span>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>E<sub>K2</sub> = &frac12;mv₂²</span>
            <span className="font-mono">{ek2 > 0 ? (ek2 / 1000).toFixed(1) : "0.0"} kJ</span>
          </div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
            <div
              className={`h-full rounded-lg transition-all duration-300 ${ek2 > 0 ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${Math.max(bar2, 2)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Startfart v₁</p>
          <p className="text-xl font-bold">{v1.toFixed(1)} m/s</p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-3">
          <p className="text-sm text-[var(--muted)]">Sluttfart v₂</p>
          <p className="text-xl font-bold">{ek2 > 0 ? v2.toFixed(1) : "Stopper!"} m/s</p>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] text-center mt-3">
        {workTotal > 0 ? "Positivt arbeid øker kinetisk energi — farten øker." :
         workTotal === 0 ? "Null arbeid — kinetisk energi er uendret." :
         ek2 > 0 ? "Negativt arbeid reduserer kinetisk energi — farten minker." :
         "Arbeidet er for stort negativt — legemet stopper før all energi er brukt opp."}
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

        {/* 6.1 Arbeid */}
        <TheorySummary
          title="6.1 Arbeid"
          mustKnow={[
            "Arbeid W = F · s · cos φ (kraft ganger forflytning ganger cosinus til vinkelen mellom dem)",
            "W = F⃗ · s⃗ (prikkprodukt i vektorform)",
            "Positivt arbeid når φ < 90°, null når φ = 90°, negativt når φ > 90°",
            "Enhet: 1 J (joule) = 1 N·m",
            "Beregn arbeid fra HVER kraft separat, og summer til totalt arbeid",
          ]}
        >
          <p>
            <strong>Arbeid</strong> er et mål på energioverføring via en kraft som virker over en forflytning.
            Når en konstant kraft <InlineLatex latex="\vec{F}" /> virker på et legeme som forflyttes en
            strekning <InlineLatex latex="\vec{s}" />, er arbeidet:
          </p>

          <FormulaBox
            latex="W = F \cdot s \cdot \cos\varphi"
            title="Arbeid (konstant kraft)"
            variant="gold"
            description="φ er vinkelen mellom kraftretningen og forflytningsretningen. Enhet: joule (J) = N·m."
          />

          <p className="mt-4">
            I <strong>vektorform</strong> med prikkprodukt:
          </p>
          <FormulaBox
            latex="W = \vec{F} \cdot \vec{s} = F_x s_x + F_y s_y + F_z s_z"
            title="Arbeid (vektorform)"
            variant="blue"
            description="Prikkproduktet gir en skalar — ingen retning, bare tall."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Fortegnregler for arbeid</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <InlineLatex latex="0 < \varphi < 90°" /> → <strong>Positivt arbeid</strong> (kraft dytter med bevegelsen)</li>
              <li>• <InlineLatex latex="\varphi = 90°" /> → <strong>Arbeid = 0</strong> (kraft vinkelrett på bevegelsen)</li>
              <li>• <InlineLatex latex="90° < \varphi \leq 180°" /> → <strong>Negativt arbeid</strong> (kraft motvirker bevegelsen)</li>
            </ul>
          </div>

          <p className="mt-4">
            <strong>Viktig innsikt:</strong> Gravitasjon og normalkraft gjør <em>null</em> arbeid på horisontal
            forflytning fordi de er vinkelrette på bevegelsesretningen (cos 90° = 0). Friksjon gjør alltid
            <em> negativt</em> arbeid fordi den peker motsatt bevegelsesretningen (cos 180° = −1).
          </p>
        </TheorySummary>

        {/* 6.2 Arbeid og kinetisk energi */}
        <TheorySummary
          title="6.2 Arbeid og kinetisk energi"
          mustKnow={[
            "Kinetisk energi: E_K = ½mv²",
            "Arbeid-energi-teoremet: W_tot = ΔE_K = ½mv₂² − ½mv₁²",
            "Positivt totalt arbeid → farten øker, negativt → farten minker",
            "Arbeid-energi-teoremet gjelder for ALLE typer krefter",
          ]}
        >
          <p>
            <strong>Utledning:</strong> Vi starter med Newtons 2. lov <InlineLatex latex="\Sigma F = ma" /> og
            kinematikk-sammenhengen <InlineLatex latex="v_2^2 - v_1^2 = 2as" />, som gir <InlineLatex latex="as = \tfrac{1}{2}v_2^2 - \tfrac{1}{2}v_1^2" />.
            Multipliser med m:
          </p>

          <FormulaBox
            latex="W_{\text{tot}} = \Sigma F \cdot s = mas = m\!\left(\tfrac{1}{2}v_2^2 - \tfrac{1}{2}v_1^2\right) = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2"
            variant="blue"
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Definisjon</p>
            <p>
              Et legeme med masse <InlineLatex latex="m" /> og fart <InlineLatex latex="v" /> har <strong>kinetisk energi</strong>:
            </p>
            <div className="mt-2">
              <InlineLatex latex="E_K = \tfrac{1}{2}mv^2" />
            </div>
          </div>

          <FormulaBox
            latex="W_{\text{tot}} = \Delta E_K = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2"
            title="Arbeid-energi-teoremet"
            variant="gold"
            description="Det totale arbeidet utført på et legeme er lik endringen i kinetisk energi."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tolkning av arbeid-energi-teoremet</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <InlineLatex latex="W_{\text{tot}} > 0" /> → <InlineLatex latex="E_K" /> øker → farten øker</li>
              <li>• <InlineLatex latex="W_{\text{tot}} = 0" /> → <InlineLatex latex="E_K" /> uendret → farten er konstant</li>
              <li>• <InlineLatex latex="W_{\text{tot}} < 0" /> → <InlineLatex latex="E_K" /> minker → farten minker</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 6.3 Varierende krefter */}
        <TheorySummary
          title="6.3 Arbeid ved varierende krefter"
          mustKnow={[
            "Arbeid = integral av kraft langs banen: W = ∫F(x)dx",
            "Geometrisk: arbeidet er arealet under F(x)-kurven",
            "Hookes lov: F = kx (fjærkraft)",
            "Arbeid ved strekking av fjær: W = ½kx₂² − ½kx₁²",
            "Arbeid-energi-teoremet gjelder OGSÅ for varierende krefter",
          ]}
        >
          <p>
            Når kraften <InlineLatex latex="F = F(x)" /> varierer langs forflytningen, kan vi ikke bare
            multiplisere F med s. I stedet deler vi strekningen i mange små intervaller <InlineLatex latex="\Delta x" /> der
            kraften er tilnærmet konstant, og lar <InlineLatex latex="\Delta x \to 0" />:
          </p>

          <FormulaBox
            latex="W = \int_{x_1}^{x_2} F(x)\,dx"
            title="Arbeid ved varierende kraft"
            variant="gold"
            description="Geometrisk tolkning: Arealet under F(x)-kurven mellom x₁ og x₂."
          />

          <p className="mt-4">
            <strong>Hookes lov</strong> beskriver kraften som trengs for å strekke eller komprimere en fjær:
          </p>
          <FormulaBox
            latex="F = kx"
            title="Hookes lov"
            variant="blue"
            description="k er fjærkonstanten (N/m), x er fjærens forlengelse/komprimering fra likevekt."
          />

          <p className="mt-4">Arbeidet med å strekke en fjær fra <InlineLatex latex="x_1" /> til <InlineLatex latex="x_2" />:</p>
          <FormulaBox
            latex="W = \int_{x_1}^{x_2} kx\,dx = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2"
            title="Arbeid på fjær"
            variant="gold"
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Også for varierende krefter!</p>
            <p>
              Professoren viste eksplisitt at arbeid-energi-teoremet også gjelder for varierende krefter.
              Utledningen bruker <InlineLatex latex="F = m\frac{dv}{dt}" /> og <InlineLatex latex="dx = v\,dt" />,
              som gir <InlineLatex latex="W = \int m\,v\,dv = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" />.
            </p>
          </div>
        </TheorySummary>

        {/* 6.4 Effekt */}
        <TheorySummary
          title="6.4 Effekt"
          mustKnow={[
            "Effekt er arbeid per tid: P = ΔW/Δt",
            "Momentaneffekt: P = dW/dt",
            "Effekt via kraft og hastighet: P = F⃗ · v⃗",
            "Enhet: 1 W (watt) = 1 J/s",
            "1 hk = 746 W, 1 kWh = 3,6 · 10⁶ J",
          ]}
        >
          <p>
            <strong>Effekt</strong> er et mål for hvor raskt arbeid utføres. Hvis et arbeid <InlineLatex latex="\Delta W" /> utføres
            i løpet av tiden <InlineLatex latex="\Delta t" />:
          </p>

          <FormulaBox
            latex="\bar{P} = \frac{\Delta W}{\Delta t}"
            title="Gjennomsnittlig effekt"
            variant="gold"
            description="Enhet: watt (W) = J/s"
          />

          <FormulaBox
            latex="P = \frac{dW}{dt}"
            title="Momentaneffekt"
            variant="blue"
          />

          <p className="mt-4">
            Svært nyttig sammenheng — effekt uttrykt via kraft og hastighet:
          </p>
          <FormulaBox
            latex="P = \vec{F} \cdot \vec{v}"
            title="Effekt = kraft · hastighet"
            variant="gold"
            description="Utledet fra P = dW/dt = F · ds/dt = F · v. Svært viktig formel!"
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Enheter for effekt og energi</p>
            <ul className="space-y-1 text-sm">
              <li>• 1 watt (W) = 1 J/s</li>
              <li>• 1 hestekraft (hk) = 746 W</li>
              <li>• 1 kWh = 1000 W · 3600 s = <InlineLatex latex="3{,}6 \cdot 10^6\;\text{J}" /></li>
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
            latex="W = F \cdot s \cdot \cos\varphi"
            title="Arbeid (konstant kraft)"
            variant="gold"
          />
          <FormulaBox
            latex="W = \vec{F} \cdot \vec{s} = F_x s_x + F_y s_y"
            title="Arbeid (vektorform)"
            variant="gold"
          />
          <FormulaBox
            latex="E_K = \tfrac{1}{2}mv^2"
            title="Kinetisk energi"
            variant="gold"
          />
          <FormulaBox
            latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2"
            title="Arbeid-energi-teoremet"
            variant="gold"
          />
          <FormulaBox
            latex="W = \int_{x_1}^{x_2} F(x)\,dx"
            title="Arbeid (varierende kraft)"
            variant="gold"
          />
          <FormulaBox
            latex="W_{\text{fjær}} = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2"
            title="Arbeid på fjær (Hookes lov)"
            variant="gold"
          />
          <FormulaBox
            latex="P = \frac{\Delta W}{\Delta t} = \vec{F} \cdot \vec{v}"
            title="Effekt"
            variant="gold"
          />
          <FormulaBox
            latex="F = kx"
            title="Hookes lov"
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
                  <td className="py-2 pr-4">Arbeid fra en kraft</td>
                  <td className="py-2 pr-4"><InlineLatex latex="W = Fs\cos\varphi" /></td>
                  <td className="py-2">Bestem vinkelen mellom F og s</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Arbeid med vektorer</td>
                  <td className="py-2 pr-4">Prikkprodukt</td>
                  <td className="py-2">Multipliser komponent for komponent</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Fart etter arbeid er utført</td>
                  <td className="py-2 pr-4">Arbeid-energi-teoremet</td>
                  <td className="py-2"><InlineLatex latex="v_2 = \sqrt{2W_{\text{tot}}/m + v_1^2}" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Arbeid mot varierende kraft</td>
                  <td className="py-2 pr-4">Integralet</td>
                  <td className="py-2">Areal under F(x)-kurven</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Arbeid på fjær</td>
                  <td className="py-2 pr-4"><InlineLatex latex="W = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2" /></td>
                  <td className="py-2">Hookes lov: F = kx</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Effekt / motorytelse</td>
                  <td className="py-2 pr-4"><InlineLatex latex="P = F \cdot v" /></td>
                  <td className="py-2">Gjelder for konstant fart</td>
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
        <WorkCalculator />
        <WorkEnergyVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Bil skyves */}
        <ExerciseCard
          number={1}
          title="Arbeid — Bil skyves i vinkel"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En bil skyves med en kraft <InlineLatex latex="F = 210\;\text{N}" /> langs en strekning{" "}
                <InlineLatex latex="s = 18\;\text{m}" />. Kraften virker i en vinkel{" "}
                <InlineLatex latex="\varphi = 30°" /> i forhold til bevegelsesretningen.
              </p>
              <p className="mt-2">Finn arbeidet som utføres.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk formelen for arbeid med vinkel: <InlineLatex latex="W = Fs\cos\varphi" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="F = 210\;\text{N}" /></li>
                <li><InlineLatex latex="s = 18\;\text{m}" /></li>
                <li><InlineLatex latex="\varphi = 30°" /></li>
              </ul>
              <p><strong>Beregning:</strong></p>
              <FormulaBox
                latex="W = F \cdot s \cdot \cos\varphi = 210 \cdot 18 \cdot \cos 30° = 210 \cdot 18 \cdot 0{,}866"
                variant="blue"
              />
              <FormulaBox
                latex="W = \underline{\underline{3{,}27\;\text{kJ}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Kun kraftkomponenten langs bevegelsesretningen bidrar til arbeid.</p>
            </div>
          }
        />

        {/* Eksempel 2: Arbeid med vektorer */}
        <ExerciseCard
          number={2}
          title="Arbeid med prikkprodukt (vektorer)"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En kraft <InlineLatex latex="\vec{F} = 160\hat{\imath} - 40\hat{\jmath}\;\text{N}" /> virker
                på et legeme som forflyttes <InlineLatex latex="\vec{s} = 14\hat{\imath} + 11\hat{\jmath}\;\text{m}" />.
              </p>
              <p className="mt-2">Finn arbeidet.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk prikkprodukt: <InlineLatex latex="W = F_x s_x + F_y s_y" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="\vec{F} = 160\hat{\imath} - 40\hat{\jmath}\;\text{N}" /> → <InlineLatex latex="F_x = 160\;\text{N},\; F_y = -40\;\text{N}" /></li>
                <li><InlineLatex latex="\vec{s} = 14\hat{\imath} + 11\hat{\jmath}\;\text{m}" /> → <InlineLatex latex="s_x = 14\;\text{m},\; s_y = 11\;\text{m}" /></li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Arbeidet W.</p>
              <p><strong>Strategi:</strong> Når kraft og forflytning er gitt som vektorer, bruker vi <strong>prikkproduktet</strong> for å finne arbeidet. Prikkproduktet summerer produktet av komponentene: <InlineLatex latex="W = F_x s_x + F_y s_y" />. Dette er ekvivalent med <InlineLatex latex="W = Fs\cos\varphi" />, men enklere når vi allerede har komponentene.</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="W = \vec{F} \cdot \vec{s} = F_x s_x + F_y s_y = 160 \cdot 14 + (-40) \cdot 11"
                variant="blue"
              />
              <FormulaBox
                latex="W = 2240 - 440 = \underline{\underline{1{,}80\;\text{kJ}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Prikkproduktet beregnes komponent for komponent og summeres. Pass på fortegn — en negativ kraftkomponent i en positiv forflytningsretning gir negativt bidrag til arbeidet.</p>
            </div>
          }
        />

        {/* Eksempel 3: Traktor sleper slede */}
        <ExerciseCard
          number={3}
          title="Traktor sleper slede — arbeid fra alle krefter"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En traktor sleper en slede med ved langs en horisontal vei. Sledens vekt
                er <InlineLatex latex="mg = 14\,700\;\text{N}" />. Trekkraften fra traktoren
                er <InlineLatex latex="F_T = 5000\;\text{N}" /> i en vinkel <InlineLatex latex="36{,}9°" /> over
                horisontal. Friksjonen er <InlineLatex latex="R = 3500\;\text{N}" />. Normalkraften
                er <InlineLatex latex="N = 14\,700\;\text{N}" />. Strekningen er <InlineLatex latex="s = 20\;\text{m}" />.
              </p>
              <p className="mt-2">
                a) Finn arbeidet fra <em>hver</em> kraft. b) Finn det totale arbeidet.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Beregn W = Fs cos φ for hver kraft. Bestem vinkelen mellom kraften og forflytningen for hver.</p>,
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  Gravitasjon og normalkraft er vinkelrette på bevegelsen (φ = 90° → cos 90° = 0).
                  Friksjon peker motsatt bevegelsen (φ = 180° → cos 180° = −1).
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Arbeid fra hver kraft:</strong></p>
              <FormulaBox latex="W_G = 14\,700 \cdot 20 \cdot \cos 90° = 0" variant="blue" />
              <FormulaBox latex="W_N = 14\,700 \cdot 20 \cdot \cos 90° = 0" variant="blue" />
              <FormulaBox latex="W_T = 5000 \cdot 20 \cdot \cos 36{,}9° = 80\;\text{kJ}" variant="blue" />
              <FormulaBox latex="W_R = 3500 \cdot 20 \cdot \cos 180° = -70\;\text{kJ}" variant="blue" />
              <p><strong>Totalt arbeid:</strong></p>
              <FormulaBox
                latex="W_{\text{tot}} = 0 + 0 + 80 - 70 = \underline{\underline{10\;\text{kJ}}}"
                variant="gold"
              />
              <p className="mt-2">
                <strong>Hva lærte vi?</strong> Gravitasjon og normalkraft gjør null arbeid på horisontal
                forflytning. Beregn arbeid fra alle krefter separat og summer.
              </p>
            </div>
          }
        />

        {/* Eksempel 4: Fart etter arbeid (traktor fortsettelse) */}
        <ExerciseCard
          number={4}
          title="Arbeid-energi-teoremet — Finn sluttfart"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Fortsettelse av traktoreksempelet: Sledens masse er <InlineLatex latex="m = 1498\;\text{kg}" />,
                startfart er <InlineLatex latex="v_1 = 2{,}0\;\text{m/s}" />, og det totale arbeidet
                er <InlineLatex latex="W_{\text{tot}} = 10\;\text{kJ}" />.
              </p>
              <p className="mt-2">Finn slutthastigheten <InlineLatex latex="v_2" />.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk arbeid-energi-teoremet: <InlineLatex latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Arbeid-energi-teoremet:</strong></p>
              <FormulaBox
                latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2 \quad\Rightarrow\quad v_2 = \sqrt{\frac{2W_{\text{tot}}}{m} + v_1^2}"
                variant="blue"
              />
              <FormulaBox
                latex="v_2 = \sqrt{\frac{2 \cdot 10\,000}{1498} + 2{,}0^2} = \sqrt{13{,}35 + 4{,}0} = \sqrt{17{,}35}"
                variant="blue"
              />
              <FormulaBox
                latex="v_2 = \underline{\underline{4{,}2\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Positivt totalt arbeid gir økt fart. Arbeid-energi-teoremet kobler arbeid direkte til hastighetsendring.</p>
            </div>
          }
        />

        {/* Eksempel 5: Fjærvekt */}
        <ExerciseCard
          number={5}
          title="Fjærkonstant og arbeid — Fjærvekt"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En fjærvekt komprimeres <InlineLatex latex="0{,}01\;\text{m}" /> når et legeme
                med vekt <InlineLatex latex="G = 600\;\text{N}" /> plasseres på den.
              </p>
              <p className="mt-2">a) Finn fjærkonstanten k. b) Finn arbeidet utført ved komprimeringen.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Hookes lov: <InlineLatex latex="F = kx" />, løs for k. Bruk fjær-arbeid-formelen for del b.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Komprimering: <InlineLatex latex="x = 0{,}01\;\text{m}" /></li>
                <li>Vekt: <InlineLatex latex="G = 600\;\text{N}" /></li>
                <li>Fjæren starter i naturlig lengde: <InlineLatex latex="x_1 = 0" /></li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> a) Fjærkonstanten k. b) Arbeidet W ved komprimeringen.</p>
              <p><strong>Strategi:</strong> a) I likevekt balanserer fjærkraften vekten: <InlineLatex latex="kx = G" />, løs for k. b) Arbeidet til en fjær er <InlineLatex latex="W = \tfrac{1}{2}kx^2" /> (fra integrasjon av Hookes lov). Vi bruker dette fordi kraften varierer lineært med komprimering — vi kan IKKE bare bruke W = Fx.</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>a) Fjærkonstant:</strong></p>
              <FormulaBox
                latex="k = \frac{G}{x} = \frac{600}{0{,}01} = \underline{\underline{6{,}0 \cdot 10^4\;\text{N/m}}}"
                variant="gold"
              />
              <p className="text-sm"><strong>b) Arbeid utført ved komprimering:</strong></p>
              <FormulaBox
                latex="W = \tfrac{1}{2}kx^2 - \tfrac{1}{2}k \cdot 0^2 = \tfrac{1}{2} \cdot 6{,}0 \cdot 10^4 \cdot (0{,}01)^2 = \underline{\underline{3{,}0\;\text{J}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Fjærkonstanten k (N/m) sier hvor stiv fjæren er. Arbeidet vokser med <em>kvadratet</em> av komprimeringen — dobbel komprimering krever fire ganger så mye arbeid. Husk: W = Fx gjelder IKKE for fjærer fordi kraften varierer.</p>
            </div>
          }
        />

        {/* Eksempel 6: Luftputebane med fjær og friksjon */}
        <ExerciseCard
          number={6}
          title="Fjær + friksjon — Luftputebane (kompleks)"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En vogn med masse <InlineLatex latex="m = 0{,}100\;\text{kg}" /> på en luftputebane
                treffer en fjær (<InlineLatex latex="k = 20\;\text{N/m}" />) med
                fart <InlineLatex latex="v_0 = 1{,}5\;\text{m/s}" />. Friksjonstallet
                er <InlineLatex latex="\mu_R = 0{,}47" />.
              </p>
              <p className="mt-2">Hvor langt d komprimeres fjæren før vognen stopper?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk arbeid-energi-teoremet. Summen av arbeid fra fjær og friksjon = endring i kinetisk energi.</p>,
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  <InlineLatex latex="\int_0^d (-kx - \mu_R mg)\,dx = 0 - \tfrac{1}{2}mv_0^2" />.
                  Dette gir en andregradsligning i d.
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Kraftanalyse:</strong> To krefter gjør arbeid: fjærkraften (−kx) og friksjon (−&mu;<sub>R</sub>mg).</p>
              <FormulaBox
                latex="\int_0^d (-kx - \mu_R mg)\,dx = -\tfrac{1}{2}mv_0^2"
                variant="blue"
              />
              <FormulaBox
                latex="-\tfrac{1}{2}kd^2 - \mu_R mgd = -\tfrac{1}{2}mv_0^2"
                variant="blue"
              />
              <p><strong>Omformer til andregradsligning:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}kd^2 + \mu_R mgd - \tfrac{1}{2}mv_0^2 = 0"
                variant="blue"
              />
              <p>Setter inn tall:</p>
              <FormulaBox
                latex="10d^2 + 0{,}4607d - 0{,}1125 = 0"
                variant="blue"
              />
              <p><strong>Andregradformelen gir:</strong></p>
              <FormulaBox
                latex="d = \frac{-0{,}4607 + \sqrt{0{,}4607^2 + 4 \cdot 10 \cdot 0{,}1125}}{2 \cdot 10} = \underline{\underline{0{,}086\;\text{m}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Den negative løsningen (d = −0,131 m) forkastes fordi avstand er positiv.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Kombinasjonsoppgaver med fjær + friksjon gir andregradsligninger. Bruk arbeid-energi-teoremet med integralet for fjærkraften.</p>
            </div>
          }
        />

        {/* Eksempel 7: Effekt — Jetmotor */}
        <ExerciseCard
          number={7}
          title="Effekt — Jetmotor"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En jetmotor gir en skyvekraft på <InlineLatex latex="F = 197\,000\;\text{N}" />.
                Flyet flyr med konstant fart <InlineLatex latex="v = 250\;\text{m/s}" />.
              </p>
              <p className="mt-2">Hva er motorens effekt?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk <InlineLatex latex="P = F \cdot v" /> når kraften er parallell med hastigheten.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Skyvekraft: <InlineLatex latex="F = 197\,000\;\text{N}" /></li>
                <li>Konstant fart: <InlineLatex latex="v = 250\;\text{m/s}" /></li>
                <li>Kraften er parallell med hastigheten (fly i rettlinjet bane)</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Motorens effekt P.</p>
              <p><strong>Strategi:</strong> Effekt er arbeid per tid: <InlineLatex latex="P = W/t" />. Når kraften er konstant og parallell med hastigheten, får vi den nyttige snarveien <InlineLatex latex="P = Fv" />. Utledning: <InlineLatex latex="P = W/t = Fs/t = Fv" />.</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="P = F \cdot v = 197\,000 \cdot 250 = 4{,}93 \cdot 10^7\;\text{W}"
                variant="blue"
              />
              <FormulaBox
                latex="P = \underline{\underline{49{,}3\;\text{MW}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> <InlineLatex latex="P = Fv" /> er en snarvei som unngår å beregne arbeid og tid separat. Merk: Konstant fart betyr at skyvekraften balanserer luftmotstanden — nettokraften er null, men motoren gjør likevel arbeid!</p>
            </div>
          }
        />

        {/* Eksempel 8: Effekt — Løper */}
        <ExerciseCard
          number={8}
          title="Effekt — Løper opp trapper"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En løper (masse <InlineLatex latex="m = 50\;\text{kg}" />) løper opp en høyde
                på <InlineLatex latex="h = 443\;\text{m}" /> på <InlineLatex latex="t = 15\;\text{min}" />.
              </p>
              <p className="mt-2">Finn gjennomsnittlig effekt.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Arbeidet er ekvivalent med å løfte massen opp h meter: <InlineLatex latex="W = mgh" />.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 50\;\text{kg}" /></li>
                <li>Høyde: <InlineLatex latex="h = 443\;\text{m}" /></li>
                <li>Tid: <InlineLatex latex="t = 15\;\text{min} = 900\;\text{s}" /></li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Gjennomsnittlig effekt P.</p>
              <p><strong>Strategi:</strong> Effekt er arbeid per tid: <InlineLatex latex="P = W/t" />. Arbeidet som kreves for å løfte en masse h meter er <InlineLatex latex="W = mgh" /> (arbeid mot tyngdekraften). Vi bruker gjennomsnittlig effekt fordi farten varierer underveis.</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>Steg 1:</strong> Beregn arbeidet (mot tyngden):</p>
              <FormulaBox
                latex="W = mgh = 50 \cdot 9{,}81 \cdot 443 = 2{,}17 \cdot 10^5\;\text{J} = 217\;\text{kJ}"
                variant="blue"
              />
              <p className="text-sm"><strong>Steg 2:</strong> Konverter tid og finn effekt:</p>
              <FormulaBox
                latex="t = 15\;\text{min} = 15 \cdot 60 = 900\;\text{s}"
                variant="blue"
              />
              <FormulaBox
                latex="\bar{P} = \frac{W}{t} = \frac{217\,000}{900} = \underline{\underline{241\;\text{W}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> For bevegelse oppover kan arbeidet beregnes som mgh — kun den vertikale høyden teller, ikke veien langs trappen. Husk å konvertere tid til sekunder! 241 W tilsvarer omtrent ⅓ hestekraft — imponerende for et menneske over 15 minutter.</p>
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
            <h3 className="font-semibold text-lg mb-3">Strategi: Beregne arbeid</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Tegn frilegemediagram</strong> — identifiser ALLE krefter som virker</li>
              <li><strong>Bestem vinkelen &phi;</strong> mellom hver kraft og forflytningsretningen</li>
              <li><strong>Beregn arbeid fra hver kraft:</strong> <InlineLatex latex="W_i = F_i \cdot s \cdot \cos\varphi_i" /></li>
              <li><strong>Husk:</strong> Tyngde og normalkraft gir W = 0 på horisontal forflytning</li>
              <li><strong>Summer:</strong> <InlineLatex latex="W_{\text{tot}} = W_1 + W_2 + W_3 + \cdots" /></li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Arbeid-energi-teoremet</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Identifiser start- og sluttpunkt</strong> med kjente/ukjente hastigheter</li>
              <li><strong>Beregn totalt arbeid</strong> mellom de to punktene</li>
              <li><strong>Sett opp:</strong> <InlineLatex latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" /></li>
              <li><strong>Løs for ukjent</strong> (vanligvis v₂ eller W)</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Fjær + friksjon-oppgaver</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Fjærarbeid:</strong> <InlineLatex latex="W_{\text{fjær}} = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2" /></li>
              <li><strong>Friksjonsarbeid:</strong> <InlineLatex latex="W_R = -\mu mg \cdot d" /></li>
              <li><strong>Sett opp arbeid-energi-teoremet:</strong> Fjærarbeid + friksjonsarbeid = &Delta;E<sub>K</sub></li>
              <li><strong>Forvent andregradsligning</strong> — velg den fysisk fornuftige løsningen (positiv avstand)</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Vanlige feil</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Glemmer at friksjon alltid gjør <strong>negativt</strong> arbeid (cos 180° = −1)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Bruker feil vinkel — vinkelen er mellom <strong>kraft og forflytning</strong>, ikke mellom kraft og horisontal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Glemmer å konvertere enheter (kJ til J, km/h til m/s)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>Setter <InlineLatex latex="W = Fs" /> uten å inkludere cos &phi;</span>
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

        {/* Oblig: Skitrekk */}
        <ExerciseCard
          number={1}
          title="Skitrekk — Arbeid, effekt og energi"
          difficulty="middels"
          source="Oblig 2"
          problem={
            <div>
              <p>
                Et skitrekk drar skiløpere opp en <InlineLatex latex="250\;\text{m}" /> lang bakke
                med helning <InlineLatex latex="25°" />. Tauet beveger seg med fart <InlineLatex latex="10\;\text{km/h}" />.
                Vi ser bort fra friksjon.
              </p>
              <p className="mt-2">
                a) Hvor stort arbeid utfører tauet på en skiløper med masse <InlineLatex latex="80{,}0\;\text{kg}" />?<br />
                b) Motoren må kunne dra 60 skiløpere samtidig. Hvor stor effekt må motoren yte?
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Taudraget må balansere tyngdekomponenten langs skråplanet: <InlineLatex latex="T = mg\sin 25°" /></p>,
            },
            {
              label: "Hint 2",
              content: <p>Effekt: <InlineLatex latex="P = T \cdot v" />. Husk å konvertere km/h til m/s.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Arbeid fra tauet:</strong></p>
              <FormulaBox
                latex="T = mg\sin 25° = 80{,}0 \cdot 9{,}81 \cdot \sin 25° = 331{,}5\;\text{N}"
                variant="blue"
              />
              <FormulaBox
                latex="W = T \cdot s = 331{,}5 \cdot 250 = \underline{\underline{82{,}9\;\text{kJ}}}"
                variant="gold"
              />

              <p><strong>b) Effekt for 60 skiløpere:</strong></p>
              <FormulaBox
                latex="v = \frac{10}{3{,}6} = 2{,}78\;\text{m/s}"
                variant="blue"
              />
              <FormulaBox
                latex="P = 60 \cdot T \cdot v = 60 \cdot 331{,}5 \cdot 2{,}78 = \underline{\underline{55{,}3\;\text{kW}}}"
                variant="gold"
              />

              <p className="mt-2"><strong>Hva lærte vi?</strong> For skråplan uten friksjon er trekkraften mg sin &theta;. P = Fv gir motoreffekten direkte.</p>
            </div>
          }
        />

        {/* Selvlaget øvingsoppgave */}
        <ExerciseCard
          number={2}
          title="Bremsekloss på horisontal flate"
          difficulty="middels"
          source="Øving"
          problem={
            <div>
              <p>
                En kloss med masse <InlineLatex latex="m = 5{,}0\;\text{kg}" /> glir med
                startfart <InlineLatex latex="v_1 = 8{,}0\;\text{m/s}" /> på en horisontal
                flate. Friksjonstallet er <InlineLatex latex="\mu_R = 0{,}30" />.
              </p>
              <p className="mt-2">a) Hvor langt glir klossen før den stopper? b) Hva er gjennomsnittlig effekt avsatt av friksjon?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Friksjon er eneste kraft som gjør arbeid: <InlineLatex latex="W_R = -\mu_R mg \cdot d" /></p>,
            },
            {
              label: "Hint 2",
              content: <p>Arbeid-energi: <InlineLatex latex="-\mu_R mg d = 0 - \tfrac{1}{2}mv_1^2" />, løs for d.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 5{,}0\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_1 = 8{,}0\;\text{m/s}" /></li>
                <li>Sluttfart: <InlineLatex latex="v_2 = 0" /> (stopper)</li>
                <li>Friksjonstall: <InlineLatex latex="\mu_R = 0{,}30" /></li>
                <li>Horisontal flate (tyngde og normalkraft gjør null arbeid)</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> a) Bremselengde d. b) Gjennomsnittlig effekt fra friksjon.</p>
              <p><strong>Strategi:</strong> Friksjon er den eneste kraften som gjør arbeid (horisontal forflytning → tyngde og normalkraft er vinkelrette). Vi bruker arbeid-energi-teoremet: <InlineLatex latex="W_R = \Delta E_K" />. For del b trenger vi tiden, som vi finner via kinematikk.</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>a) Bremselengde:</strong></p>
              <FormulaBox
                latex="W_R = \Delta E_K \;\Rightarrow\; -\mu_R mg d = 0 - \tfrac{1}{2}mv_1^2"
                variant="blue"
              />
              <p className="text-sm">Massen kansellerer:</p>
              <FormulaBox
                latex="d = \frac{v_1^2}{2\mu_R g} = \frac{8{,}0^2}{2 \cdot 0{,}30 \cdot 9{,}81} = \frac{64}{5{,}886} = \underline{\underline{10{,}9\;\text{m}}}"
                variant="gold"
              />
              <p className="text-sm"><strong>b) Tid og effekt:</strong></p>
              <FormulaBox
                latex="a = -\mu_R g = -0{,}30 \cdot 9{,}81 = -2{,}94\;\text{m/s}^2"
                variant="blue"
              />
              <FormulaBox
                latex="t = \frac{v_1}{|a|} = \frac{8{,}0}{2{,}94} = 2{,}72\;\text{s}"
                variant="blue"
              />
              <FormulaBox
                latex="\bar{P} = \frac{|W_R|}{t} = \frac{\tfrac{1}{2} \cdot 5{,}0 \cdot 8{,}0^2}{2{,}72} = \frac{160}{2{,}72} = \underline{\underline{58{,}8\;\text{W}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Bremselengden <InlineLatex latex="d = v^2/(2\mu g)" /> avhenger ikke av massen — en lett og en tung kloss med samme fart og friksjon stopper etter like lang strekning. Denne formelen er nyttig for bremsing generelt.</p>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Fjær skyter kloss opp skråplan"
          difficulty="vanskelig"
          source="Øving"
          problem={
            <div>
              <p>
                En fjær med <InlineLatex latex="k = 800\;\text{N/m}" /> er komprimert <InlineLatex latex="x = 0{,}10\;\text{m}" />.
                Den skyter en kloss (<InlineLatex latex="m = 0{,}50\;\text{kg}" />) opp et friksjonsfritt
                skråplan med helning <InlineLatex latex="30°" />.
              </p>
              <p className="mt-2">Hvor langt opp skråplanet kommer klossen?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>All fjærenergi overføres til kinetisk energi, som deretter omgjøres til potensiell energi opp skråplanet.</p>,
            },
            {
              label: "Hint 2",
              content: <p><InlineLatex latex="\tfrac{1}{2}kx^2 = mgs\sin 30°" />, løs for s.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Fjærkonstant: <InlineLatex latex="k = 800\;\text{N/m}" /></li>
                <li>Komprimering: <InlineLatex latex="x = 0{,}10\;\text{m}" /></li>
                <li>Masse: <InlineLatex latex="m = 0{,}50\;\text{kg}" /></li>
                <li>Helning: <InlineLatex latex="\theta = 30°" /></li>
                <li>Friksjonsfritt. Start og slutt: v = 0.</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> Avstand s opp skråplanet.</p>
              <p><strong>Strategi:</strong> All elastisk potensiell energi i fjæren omgjøres til gravitasjonell potensiell energi. Energibevaring: <InlineLatex latex="\tfrac{1}{2}kx^2 = mgh = mgs\sin\theta" />. Vi bruker energi i stedet for krefter fordi fjærkraften varierer med posisjon.</p>
              <p><strong>Løsning:</strong></p>
              <FormulaBox
                latex="\tfrac{1}{2}kx^2 = mgs\sin\theta"
                variant="blue"
              />
              <p className="text-sm">Løser for s:</p>
              <FormulaBox
                latex="s = \frac{kx^2}{2mg\sin\theta} = \frac{800 \cdot 0{,}10^2}{2 \cdot 0{,}50 \cdot 9{,}81 \cdot \sin 30°}"
                variant="blue"
              />
              <FormulaBox
                latex="s = \frac{8{,}0}{4{,}905} = \underline{\underline{1{,}63\;\text{m}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Fjærenergi <InlineLatex latex="\tfrac{1}{2}kx^2" /> fungerer som en «energipakke» som kan omgjøres til kinetisk eller potensiell energi. På skråplan er høyden <InlineLatex latex="h = s\sin\theta" /> — husk at det er den vertikale høyden som bestemmer potensiell energi, ikke buelengden.</p>
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
            Arbeid-energi-teoremet er et av de mest brukte verktøyene på eksamen. Det kombinerer
            ofte med friksjon, skråplan og effekt. Vis ALLTID utregning av arbeid fra hver kraft separat.
          </p>
        </div>

        {/* Eksamen: Bil bremser */}
        <ExerciseCard
          number={1}
          title="Bil bremser — Friksjonskraft og bremsetid"
          difficulty="middels"
          source="Eksamen H2023"
          problem={
            <div>
              <p>
                En bil med masse <InlineLatex latex="1500\;\text{kg}" /> kjører med
                fart <InlineLatex latex="72\;\text{km/h}" /> og stanser etter <InlineLatex latex="50\;\text{m}" /> på
                en horisontal vei. Motoren er koblet ut.
              </p>
              <p className="mt-2">
                a) Hvor stor har friksjonskraften vært?<br />
                b) Hvor lang tid tok nedbremsingen?
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Konverter: <InlineLatex latex="72\;\text{km/h} = 20\;\text{m/s}" />. Bruk arbeid-energi-teoremet.</p>,
            },
            {
              label: "Hint 2",
              content: <p><InlineLatex latex="W_R = \Delta E_K = 0 - \tfrac{1}{2}mv_0^2" />, og <InlineLatex latex="W_R = -R \cdot s" /></p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li>Masse: <InlineLatex latex="m = 1500\;\text{kg}" /></li>
                <li>Startfart: <InlineLatex latex="v_0 = 72\;\text{km/h} = 20\;\text{m/s}" /></li>
                <li>Sluttfart: <InlineLatex latex="v = 0" /></li>
                <li>Bremsestrekning: <InlineLatex latex="s = 50\;\text{m}" /></li>
                <li>Horisontal vei, motor koblet ut</li>
              </ul>
              <p><strong>Hva skal vi finne?</strong> a) Friksjonskraften R. b) Bremsetid t.</p>
              <p><strong>Strategi:</strong> a) Friksjon er den eneste kraften som gjør arbeid. Arbeid-energi-teoremet gir <InlineLatex latex="W_R = \Delta E_K" />. b) For tid bruker vi kinematikk med gjennomsnittsfart (konstant retardasjon).</p>
              <p><strong>Løsning:</strong></p>
              <p className="text-sm"><strong>a) Friksjonskraft via arbeid-energi-teoremet:</strong></p>
              <FormulaBox
                latex="W_R = \Delta E_K = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mv_0^2 = 0 - \tfrac{1}{2} \cdot 1500 \cdot 20^2 = -300\;\text{kJ}"
                variant="blue"
              />
              <p className="text-sm">Friksjonens arbeid er også <InlineLatex latex="W_R = -R \cdot s" />, så:</p>
              <FormulaBox
                latex="R = \frac{|W_R|}{s} = \frac{300\,000}{50} = \underline{\underline{6{,}0\;\text{kN}}}"
                variant="gold"
              />
              <p className="text-sm"><strong>b) Bremsetid (kinematikk med konstant retardasjon):</strong></p>
              <FormulaBox
                latex="s = \tfrac{1}{2}(v_0 + v)t \;\Rightarrow\; t = \frac{2s}{v_0 + v} = \frac{2 \cdot 50}{20 + 0} = \underline{\underline{5{,}0\;\text{s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Arbeid-energi-teoremet gir friksjonskraften uten å trenge akselerasjonen. Begge metoder (kinematikk og energi) gir same svar, men energimetoden er ofte raskere. Husk å konvertere km/h → m/s (del på 3,6)!</p>
            </div>
          }
        />

        {/* Eksamen: Kranbil */}
        <ExerciseCard
          number={2}
          title="Kranbil sleper container — Arbeid, friksjon og optimal vinkel"
          difficulty="vanskelig"
          source="Eksamen V2023"
          problem={
            <div>
              <p>
                En kranbil sleper en container (<InlineLatex latex="m = 1000\;\text{kg}" />) langs
                horisontal bakke med <strong>konstant fart</strong>. Glidefriksjonstall <InlineLatex latex="\mu = 0{,}65" />,
                vaiervinkel <InlineLatex latex="\alpha = 25°" />.
              </p>
              <p className="mt-2">
                a) Finn snordraget F og arbeidet over <InlineLatex latex="s = 15\;\text{m}" />.<br />
                b) Finn arbeidet gjort av friksjon.<br />
                c) Hvilken vinkel gir minst snordrag?<br />
                d) Vaieren ryker ved <InlineLatex latex="v = 2{,}5\;\text{m/s}" />. Finn bremselengden.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Konstant fart → &Sigma;F = 0. Sett opp likevekt i x og y. Vaieren drar oppover i vinkel &alpha;, så N &ne; mg.</p>,
            },
            {
              label: "Hint 2",
              content: <p>N = mg − F sin &alpha;. Friksjon R = &mu;N. Likevekt i x: F cos &alpha; = &mu;N.</p>,
            },
            {
              label: "Hint 3",
              content: <p>For optimal vinkel: Derivér nevneren i F-uttrykket og sett lik null. Du får tan &alpha; = &mu;.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Snordrag og arbeid:</strong></p>
              <p className="text-sm">Konstant fart → &Sigma;F = 0:</p>
              <FormulaBox
                latex="\Sigma F_y = 0: \; N + F\sin\alpha - mg = 0 \;\Rightarrow\; N = mg - F\sin\alpha"
                variant="blue"
              />
              <FormulaBox
                latex="\Sigma F_x = 0: \; F\cos\alpha - \mu N = 0 \;\Rightarrow\; F\cos\alpha = \mu(mg - F\sin\alpha)"
                variant="blue"
              />
              <FormulaBox
                latex="F = \frac{\mu mg}{\cos\alpha + \mu\sin\alpha} = \frac{0{,}65 \cdot 1000 \cdot 9{,}81}{\cos 25° + 0{,}65 \cdot \sin 25°} = \underline{\underline{5{,}4\;\text{kN}}}"
                variant="gold"
              />
              <FormulaBox
                latex="W_F = F \cdot s \cdot \cos 25° = 5400 \cdot 15 \cdot \cos 25° = \underline{\underline{73\;\text{kJ}}}"
                variant="gold"
              />

              <p><strong>b) Friksjonens arbeid:</strong></p>
              <FormulaBox
                latex="R = \mu(mg - F\sin\alpha) = 0{,}65(9810 - 5400 \cdot \sin 25°) = 4{,}9\;\text{kN}"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = -R \cdot s = -4900 \cdot 15 = \underline{\underline{-73\;\text{kJ}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">Merk: |W<sub>F</sub>| = |W<sub>R</sub>| fordi farten er konstant (W<sub>tot</sub> = 0).</p>

              <p><strong>c) Optimal vinkel (minst snordrag):</strong></p>
              <FormulaBox
                latex="\frac{d}{d\alpha}(\cos\alpha + \mu\sin\alpha) = 0 \;\Rightarrow\; \tan\alpha = \mu"
                variant="blue"
              />
              <FormulaBox
                latex="\alpha = \arctan(0{,}65) = \underline{\underline{33°}}"
                variant="gold"
              />

              <p><strong>d) Bremselengde etter vaieren ryker:</strong></p>
              <FormulaBox
                latex="a = -\mu g = -0{,}65 \cdot 9{,}81 = -6{,}4\;\text{m/s}^2"
                variant="blue"
              />
              <FormulaBox
                latex="s = \frac{v^2}{2\mu g} = \frac{2{,}5^2}{2 \cdot 0{,}65 \cdot 9{,}81} = \underline{\underline{0{,}49\;\text{m}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Når farten er konstant er totalt arbeid null. Optimal vinkel for minst snordrag er arctan(&mu;) — en klassiker!</p>
            </div>
          }
        />

        {/* Eksamen: Skiløper ned bakken (fra oblig) */}
        <ExerciseCard
          number={3}
          title="Skiløper ned bakke — Energi og friksjon"
          difficulty="middels"
          source="Oblig 2"
          problem={
            <div>
              <p>
                Fortsettelse av skitrekk-oppgaven: En skiløper (<InlineLatex latex="m = 80{,}0\;\text{kg}" />)
                starter fra toppen av en <InlineLatex latex="250\;\text{m}" /> lang bakke
                med <InlineLatex latex="25°" /> helning, med startfart 0.
              </p>
              <p className="mt-2">
                c) Uten friksjon — finn farten i bunnen.<br />
                d) Med friksjon hadde farten bare blitt <InlineLatex latex="50\;\text{km/h}" />. Finn arbeidet gjort av friksjon.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>c) Bruk energibevaring: <InlineLatex latex="\tfrac{1}{2}mv^2 = mgs\sin\theta" />.</p>,
            },
            {
              label: "Hint 2",
              content: <p>d) <InlineLatex latex="W_R = \tfrac{1}{2}mv^2 - mgs\sin\theta" /> (diff mellom faktisk og maks E<sub>K</sub>).</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>c) Uten friksjon:</strong></p>
              <FormulaBox
                latex="v = \sqrt{2gs\sin\theta} = \sqrt{2 \cdot 9{,}81 \cdot 250 \cdot \sin 25°} = \underline{\underline{45{,}5\;\text{m/s} = 164\;\text{km/h}}}"
                variant="gold"
              />

              <p><strong>d) Friksjonens arbeid:</strong></p>
              <FormulaBox
                latex="v = 50\;\text{km/h} = 13{,}9\;\text{m/s}"
                variant="blue"
              />
              <FormulaBox
                latex="W_R = \tfrac{1}{2}mv^2 - mgs\sin\theta = \tfrac{1}{2} \cdot 80 \cdot 13{,}9^2 - 80 \cdot 9{,}81 \cdot 250 \cdot \sin 25° "
                variant="blue"
              />
              <FormulaBox
                latex="W_R = 7\,728 - 82\,929 = \underline{\underline{-75{,}2\;\text{kJ}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Friksjon og luftmotstand har fjernet 75,2 kJ av den potensielle energien.
              </p>
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
