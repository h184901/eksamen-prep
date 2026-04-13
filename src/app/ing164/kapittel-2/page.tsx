"use client";

import { useState, useMemo } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import SectionNav, { type Section } from "@/components/SectionNav";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 2)!;

const progressSections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Oppgavestrategier",
  "Gjennomgåtte eksempler",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

const navSections: Section[] = [
  { id: "teorisammendrag", label: "Teori", icon: "\u{1F4D6}" },
  { id: "formler", label: "Formler", icon: "\u{1F9EE}" },
  { id: "visualiseringer", label: "Visualiseringer", icon: "\u{1F4CA}" },
  { id: "strategier", label: "Strategier", icon: "\u{1F9E9}" },
  { id: "eksempler", label: "Eksempler", icon: "\u{270F}\u{FE0F}" },
  { id: "ovingsoppgaver", label: "Øving", icon: "\u{1F4DD}" },
  { id: "eksamensoppgaver", label: "Eksamen", icon: "\u{1F393}" },
];

/* ─── Interactive: x-t / v-t / a-t graf-simulator ─── */
function KinematicsGraphs() {
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
function FreeFallSimulator() {
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

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />
      <SectionNav sections={navSections} />

      {/* ══════════════════════════════════════════════
          1. TEORISAMMENDRAG
          ══════════════════════════════════════════════ */}
      <section id="teorisammendrag" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

        {/* 2.1 Forflytning, tid og gjennomsnittsfart */}
        <TheorySummary
          title="2.1 Forflytning, tid og gjennomsnittsfart"
          mustKnow={[
            "Forflytning Δx = x₂ − x₁ (vektor — har retning, kan være negativ)",
            "Gjennomsnittsfart v̄ = Δx/Δt",
            "Grafisk: v̄ = stigningstallet til sekanten i x-t-grafen",
            "Forflytning ≠ tilbakelagt distanse",
          ]}
        >
          <p>
            Vi starter med den enkleste bevegelsen: et legeme som beveger seg langs en rett linje.
            Posisjonen beskrives av én enkelt koordinat <InlineLatex latex="x" />.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Forflytning vs. distanse</p>
            <p>
              <strong>Forflytning</strong> <InlineLatex latex="\Delta x = x_2 - x_1" /> er endringen i posisjon —
              den har retning og kan være negativ.
            </p>
            <p className="mt-1">
              <strong>Tilbakelagt distanse</strong> er den totale veien som er tilbakelagt — alltid positiv.
            </p>
            <p className="mt-1 text-sm">
              Eksempel: Går du 5 m fremover og 3 m tilbake, er forflytningen 2 m, men distansen er 8 m.
            </p>
          </div>

          <FormulaBox
            latex="\bar{v} = \frac{\Delta x}{\Delta t} = \frac{x_2 - x_1}{t_2 - t_1}"
            title="Gjennomsnittsfart"
            variant="gold"
            description="Stigningstallet til sekanten mellom to punkter i x-t-grafen. Enhet: m/s."
          />

          <p className="mt-4">
            <strong>Grafisk tolkning:</strong> I en <InlineLatex latex="x" />-<InlineLatex latex="t" />-graf
            er gjennomsnittsfarten lik stigningstallet til den rette linjen (sekanten) som forbinder
            punktene <InlineLatex latex="(t_1, x_1)" /> og <InlineLatex latex="(t_2, x_2)" />.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor skille mellom forflytning og distanse?</p>
            <p className="text-sm">
              I fysikk bryr vi oss om <strong>nettoendringen i posisjon</strong>, ikke den totale veien.
              Hvorfor? Fordi Newtons lover handler om krefter og akselerasjon, som endrer <em>hastighet</em> —
              en vektorstørrelse med retning. Forflytning bevarer retningsinformasjonen; distanse gjør det ikke.
            </p>
            <p className="text-sm mt-2">
              <strong>Visuelt:</strong> Tenk på en jogger som løper 5 km til høyre og 3 km tilbake til venstre.
              GPS-en viser 8 km (distanse), men hun er bare 2 km fra start (forflytning). I kinematikk
              er det forflytningen som kobler til fysikkens lover.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Forflytning er som <strong>heisknappen</strong> — du trykker 5. etasje, og heisen vet at den
              skal opp 3 etasjer fra 2. etasje. Den bryr seg ikke om du først tok trappen ned til kjelleren.
              Gjennomsnittsfart er gjennomsnittlig «heishastighet» mellom start- og sluttposisjonen.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Gjennomsnittsfart = total distanse / tid»</strong> — Det er gjennomsnittlig <em>fart (speed)</em>, ikke gjennomsnittlig <em>hastighet (velocity)</em>. Gjennomsnittsfart (velocity) = forflytning/tid og kan være negativ eller null.</li>
              <li>• <strong>«Gjennomsnittsfart = gjennomsnittet av startfart og sluttfart»</strong> — Bare sant for konstant akselerasjon! Generelt er det <InlineLatex latex="\bar{v} = \Delta x/\Delta t" />.</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 2.2 Momentanfart */}
        <TheorySummary
          title="2.2 Momentanfart"
          mustKnow={[
            "Momentanfart v = dx/dt (den deriverte av posisjon mhp. tid)",
            "Grafisk: v = stigningstallet til tangenten i x-t-grafen",
            "Positiv v → beveger seg i positiv x-retning",
            "v = 0 i vendepunktet (f.eks. toppunktet i fritt fall)",
          ]}
        >
          <p>
            Gjennomsnittsfarten forteller oss om bevegelsen over et <em>tidsintervall</em>.
            Men hva er farten i et bestemt <em>øyeblikk</em>?
          </p>

          <FormulaBox
            latex="v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt} = x'(t)"
            title="Momentanfart"
            variant="gold"
            description="Momentanfarten er den tidsderiverte av posisjonsfunksjonen. Grafisk: stigningstallet til tangenten i x-t-grafen."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Viktig distinksjon</p>
            <p>
              <strong>Fart</strong> (velocity) er en vektorstørrelse med fortegn — den forteller retning.
            </p>
            <p>
              <strong>Fartens størrelse</strong> (speed) = <InlineLatex latex="|v|" /> — alltid positiv.
            </p>
          </div>

          <p className="mt-4">
            <strong>Tolkning av fortegn:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Positiv stigning i x-t-grafen → positiv fart → beveger seg i +x-retning</li>
            <li>Negativ stigning → negativ fart → beveger seg i −x-retning</li>
            <li>Toppunkt/bunnpunkt (horisontal tangent) → <InlineLatex latex="v = 0" /> (vendepunkt)</li>
          </ul>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor den deriverte?</p>
            <p className="text-sm">
              Gjennomsnittsfarten forteller deg hva som skjedde «i snitt» over et tidsintervall. Men farten
              kan variere mye i løpet av intervallet. Momentanfarten er det du leser av på speedometeret
              akkurat <em>nå</em> — i dette ene øyeblikket.
            </p>
            <p className="text-sm mt-2">
              Matematisk er dette en <strong>grenseverdi</strong>: vi gjør tidsintervallet uendelig lite.
              Da blir sekanten til tangenten, og gjennomsnittsfart blir momentanfart. Det er nettopp
              dette den deriverte gjør: <InlineLatex latex="v = dx/dt" />.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Tenk på farten din på en biltur. Gjennomsnittsfarten for hele turen kan være 60 km/t,
              men underveis var du kanskje opp i 100 km/t og stod stille i kø. <strong>Speedometeret</strong>
              viser momentanfarten — farten akkurat nå. I fysikk er <InlineLatex latex="v = dx/dt" /> det
              matematiske speedometeret.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«v = 0 betyr at legemet står stille for alltid»</strong> — Nei! Det betyr at det er stille <em>akkurat nå</em>. En ball kastet opp har v = 0 i toppunktet, men den akselererer stadig nedover.</li>
              <li>• <strong>«Negativ fart betyr at legemet bremser»</strong> — Nei! Negativt fortegn betyr at det beveger seg i negativ retning. Om det bremser avhenger av forholdet mellom v og a.</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 2.3 Akselerasjon */}
        <TheorySummary
          title="2.3 Gjennomsnittlig og momentan akselerasjon"
          mustKnow={[
            "Gjennomsnittlig akselerasjon ā = Δv/Δt",
            "Momentanakselerasjon a = dv/dt = d²x/dt²",
            "Grafisk: a = stigningstallet til tangenten i v-t-grafen",
            "a kan ha motsatt fortegn av v (bremser opp)",
          ]}
        >
          <p>
            Når farten endrer seg, har vi <strong>akselerasjon</strong> — akselerasjon er
            endringsraten til farten.
          </p>

          <FormulaBox
            latex="\bar{a} = \frac{\Delta v}{\Delta t} = \frac{v_2 - v_1}{t_2 - t_1}"
            title="Gjennomsnittlig akselerasjon"
            variant="blue"
            description="Enhet: m/s²."
          />

          <FormulaBox
            latex="a = \lim_{\Delta t \to 0} \frac{\Delta v}{\Delta t} = \frac{dv}{dt} = \frac{d^2x}{dt^2}"
            title="Momentanakselerasjon"
            variant="gold"
            description="Akselerasjonen er den tidsderiverte av farten, eller den andrederiverte av posisjonen."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fortegn og retning</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <InlineLatex latex="v > 0" /> og <InlineLatex latex="a > 0" />: Farten øker i +x-retning (akselererer)</li>
              <li>• <InlineLatex latex="v > 0" /> og <InlineLatex latex="a < 0" />: Farten minker (bremser opp)</li>
              <li>• <InlineLatex latex="v < 0" /> og <InlineLatex latex="a < 0" />: Farten øker i −x-retning</li>
              <li>• <InlineLatex latex="v < 0" /> og <InlineLatex latex="a > 0" />: Farten minker (bremser opp)</li>
            </ul>
            <p className="mt-2 text-sm font-semibold">
              Når <InlineLatex latex="v" /> og <InlineLatex latex="a" /> har <em>motsatt</em> fortegn → legemet bremser opp.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er akselerasjon så viktig?</p>
            <p className="text-sm">
              Akselerasjon er broen mellom <strong>kinematikk</strong> (beskrivelse av bevegelse) og
              <strong> dynamikk</strong> (årsaken til bevegelse). Newtons 2. lov sier at <InlineLatex latex="F = ma" /> —
              krefter forårsaker akselerasjon. Derfor er akselerasjon det fysiske bindeleddet mellom
              krefter og bevegelse.
            </p>
            <p className="text-sm mt-2">
              <strong>Visuelt:</strong> Hvis du ser en x-t-graf og den kurver oppover (konkav opp), er akselerasjonen positiv.
              Kurver den nedover (konkav ned), er akselerasjonen negativ. En rett linje betyr null akselerasjon.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              I en bil er gasspedalen «positiv akselerasjon» og bremsen er «negativ akselerasjon» (retardasjon).
              Akselerasjon er hvor hardt du <strong>trykker på pedalen</strong> — ikke hvor fort du kjører.
              Du kan kjøre 100 km/t med null akselerasjon (konstant fart), eller stå stille med
              stor akselerasjon (gasspedalen er i bunnen, men du nettopp begynte å kjøre).
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Positiv akselerasjon betyr at farten øker»</strong> — Bare hvis farten er positiv! Hvis v &lt; 0 og a &gt; 0, bremser legemet. Det er samspillet mellom fortegnene som avgjør.</li>
              <li>• <strong>«Akselerasjon og fart peker alltid i samme retning»</strong> — Feil! Når du bremser en bil, peker akselerasjonen motsatt av bevegelsesretningen.</li>
              <li>• <strong>«Null fart betyr null akselerasjon»</strong> — Klassisk feil! En ball i toppunktet av et kast har v = 0 men a = −g. Akselerasjon handler om <em>endring</em> i fart, ikke farten selv.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Tips: Fortegnsanalyse</p>
            <p className="text-sm">
              Lag en tabell som den over. For hver kombinasjon av v og a, spør: <em>Øker eller minker fartens
              størrelse?</em> Regelen er enkel:
            </p>
            <ul className="space-y-1 text-sm mt-2">
              <li>• <strong>Samme fortegn</strong> på v og a → farten <strong>øker</strong> (legemet akselererer)</li>
              <li>• <strong>Motsatt fortegn</strong> på v og a → farten <strong>minker</strong> (legemet bremser)</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 2.4 Konstant akselerasjon */}
        <TheorySummary
          title="2.4 Bevegelse med konstant akselerasjon"
          mustKnow={[
            "De fire bevegelseslikningene (se formler under)",
            "Utledet ved integrasjon fra a = konstant",
            "Velg likning ut fra hvilke størrelser som er kjent/ukjent",
            "Gjelder KUN når akselerasjonen er konstant!",
          ]}
        >
          <p>
            Når akselerasjonen er <strong>konstant</strong> (<InlineLatex latex="a = \bar{a}" />), kan vi
            utlede fire likninger som kobler posisjon, fart, akselerasjon og tid. Disse er de viktigste
            verktøyene i kinematikk.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Utledning (integrasjon)</p>
            <p className="text-sm">
              Start: <InlineLatex latex="\frac{dv}{dt} = a" /> (konstant).
              Integrer: <InlineLatex latex="\int dv = a\int dt \;\Rightarrow\; v = v_0 + at" />.
            </p>
            <p className="text-sm mt-1">
              Videre: <InlineLatex latex="\frac{dx}{dt} = v_0 + at" />.
              Integrer: <InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" />.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 my-4">
            <FormulaBox
              latex="v = v_0 + at"
              title="Likning 1"
              variant="gold"
              description="Fart som funksjon av tid. Mangler: x."
            />
            <FormulaBox
              latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2"
              title="Likning 2"
              variant="gold"
              description="Posisjon som funksjon av tid. Mangler: v."
            />
            <FormulaBox
              latex="v^2 = v_0^2 + 2a(x - x_0)"
              title="Likning 3"
              variant="gold"
              description="Kobler fart og posisjon. Mangler: t."
            />
            <FormulaBox
              latex="x - x_0 = \tfrac{1}{2}(v_0 + v)\,t"
              title="Likning 4"
              variant="gold"
              description="Gjennomsnittsfart × tid. Mangler: a."
            />
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hvordan velge riktig likning?</p>
            <p className="text-sm">
              Hver likning kobler <strong>fire</strong> av de fem størrelsene (<InlineLatex latex="x, v, v_0, a, t" />).
              Finn ut hvilken størrelse du <em>ikke</em> trenger og <em>ikke</em> kjenner — bruk
              likningen som mangler den størrelsen.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor akkurat disse fire likningene?</p>
            <p className="text-sm">
              Vi har fem kinematiske størrelser: <InlineLatex latex="x, v, v_0, a, t" />. Hver likning
              kobler fire av dem — og «mangler» den femte. Det gir oss nettopp fire uavhengige likninger,
              som er alt vi trenger for å løse ethvert problem med konstant akselerasjon.
            </p>
            <p className="text-sm mt-2">
              <strong>Fysisk intuisjon for likning 2:</strong> <InlineLatex latex="x = x_0 + v_0t + \frac{1}{2}at^2" /> —
              første ledd er startposisjon, andre ledd er «hva som hadde skjedd uten akselerasjon»,
              og tredje ledd er «bidraget fra akselerasjonen». <InlineLatex latex="\frac{1}{2}at^2" /> vokser
              med <InlineLatex latex="t^2" /> fordi akselerasjonen gir <em>mer og mer</em> fart over tid.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Tenk på en bil som akselererer fra lyskryss. <InlineLatex latex="v = v_0 + at" /> er som:
              «Farten min nå = farten jeg hadde + det farten har endret seg». <InlineLatex latex="x = x_0 + v_0t + \frac{1}{2}at^2" />
              er som: «Hvor er jeg nå = hvor jeg stod + det jeg ville kjørt med gammel fart + ekstra avstand
              fordi farten øker underveis.»
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Disse likningene gjelder alltid»</strong> — Nei! De gjelder <em>bare</em> for konstant akselerasjon. Varierer a med tid, må du integrere (seksjon 2.6).</li>
              <li>• <strong>«Jeg kan bruke hvilken som helst likning»</strong> — Du trenger den som inneholder de størrelsene du kjenner og den du søker. Bruk «mangler-metoden».</li>
              <li>• <strong>«x₀ er alltid null»</strong> — Bare hvis du velger startposisjonen som origo! Les oppgaven nøye.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Oppskrift: Slik løser du kinematikkoppgaver</p>
            <ol className="space-y-1.5 text-sm list-decimal list-inside">
              <li><strong>Tegn figur</strong> — vis bevegelsesretning, velg positiv retning</li>
              <li><strong>List opp kjente</strong> — skriv opp <InlineLatex latex="x_0, v_0, a, t, v, x" /> med verdier</li>
              <li><strong>Identifiser ukjent</strong> — hva spør oppgaven etter?</li>
              <li><strong>Finn «mangler»</strong> — hvilken størrelse verken er kjent eller søkt? Bruk likningen som mangler den.</li>
              <li><strong>Løs algebraisk</strong> — isolér den ukjente, sett inn tall til slutt</li>
              <li><strong>Sjekk</strong> — har svaret riktig enhet? Er fortegnet fornuftig? Er størrelsesorden rimelig?</li>
            </ol>
          </div>
        </TheorySummary>

        {/* 2.5 Fritt fall */}
        <TheorySummary
          title="2.5 Legemer i fritt fall"
          mustKnow={[
            "Fritt fall: kun tyngdekraften virker (ingen luftmotstand)",
            "a = g = 9,81 m/s² rettet nedover",
            "Med y-akse oppover: aᵧ = −g",
            "Akselerasjonen er −g ALLTID, selv i toppunktet (v = 0)",
            "Alle legemer faller likt uavhengig av masse (Galilei)",
          ]}
        >
          <p>
            Fritt fall er et spesialtilfelle av konstant akselerasjon. Et legeme i fritt fall
            påvirkes <strong>kun av tyngdekraften</strong> (vi neglisjerer luftmotstand).
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Galileos innsikt</p>
            <p>
              Alle legemer faller med <strong>samme akselerasjon</strong> uavhengig av masse
              (når luftmotstanden neglisjeres). På jordens overflate:
            </p>
            <div className="mt-2">
              <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" />
            </div>
          </div>

          <p className="mt-4">
            Med positiv y-akse <strong>oppover</strong> og <InlineLatex latex="a_y = -g" />, får vi
            bevegelseslikningene for fritt fall:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 my-4">
            <FormulaBox
              latex="v_y = v_{0y} - gt"
              title="Fart i fritt fall"
              variant="gold"
            />
            <FormulaBox
              latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2"
              title="Posisjon i fritt fall"
              variant="gold"
            />
            <FormulaBox
              latex="v_y^2 = v_{0y}^2 - 2g(y - y_0)"
              title="Fart–posisjon (fritt fall)"
              variant="gold"
            />
            <FormulaBox
              latex="y - y_0 = \tfrac{1}{2}(v_{0y} + v_y)\,t"
              title="Gjennomsnittsfart (fritt fall)"
              variant="blue"
            />
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil!</p>
            <p className="text-sm">
              Mange studenter tror at akselerasjonen er null i toppunktet fordi farten er null der.
              <strong> Det er feil!</strong> Akselerasjonen er <InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" />{" "}
              <em>hele tiden</em>, også i toppunktet. Farten er null i et øyeblikk, men den
              <em> endrer seg</em> — nettopp fordi akselerasjonen ikke er null.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor faller alt likt?</p>
            <p className="text-sm">
              Galileos geniale innsikt (bekreftet av Newton): Tyngdekraften på et legeme er proporsjonal
              med massen (<InlineLatex latex="F = mg" />), men akselerasjonen krever deling på massen
              (<InlineLatex latex="a = F/m = mg/m = g" />). Massen kansellerer! Derfor er akselerasjonen
              den samme for alle legemer, uavhengig av masse.
            </p>
            <p className="text-sm mt-2">
              <strong>Visuelt bilde:</strong> Se for deg at du slipper en bowlingkule og en tennisball
              fra samme høyde (i vakuum). De treffer bakken samtidig! Bowlingkulen har mer tyngdekraft, men den
              «trenger også mer kraft for å akselerere» (større treghet). De to effektene kansellerer perfekt.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Fritt fall er som en <strong>rulletrapp som stadig går raskere nedover</strong>. Uansett om
              du «startet» med å stå stille (slipp fra ro) eller med å hoppe oppover (kast oppover),
              trekker rulletrappen deg nedover med konstant akselerasjon. I toppunktet av et kast står du
              et øyeblikk stille — men rulletrappen stopper aldri.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«I toppunktet er a = 0 fordi v = 0»</strong> — Den vanligste feilen! a = −g <em>hele tiden</em>, også i toppunktet. Farten er null et øyeblikk, men endrer seg umiddelbart.</li>
              <li>• <strong>«Tyngre ting faller raskere»</strong> — Bare på grunn av luftmotstand. I vakuum faller alt likt. Fjæren og hammeren på månen (Apollo 15) er det berømte eksperimentet.</li>
              <li>• <strong>«g er negativ»</strong> — Nei! <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> er alltid <em>positiv</em>. Det er akselerasjonen <InlineLatex latex="a_y = -g" /> som er negativ (med y oppover).</li>
              <li>• <strong>«Fritt fall betyr at det faller nedover»</strong> — Fritt fall inkluderer også oppover-bevegelse! Et kast rett opp er fritt fall fra det øyeblikket du slipper ballen.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Tips: Velg koordinatsystem</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>Positiv y oppover</strong> er standard. Da er <InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" /></li>
              <li>• <strong>Legg origo</strong> der det er praktisk — vanligvis startpunktet eller bakkenivå</li>
              <li>• <strong>Kast oppover:</strong> <InlineLatex latex="v_0 > 0" />, <InlineLatex latex="a < 0" />. I toppunktet: <InlineLatex latex="v = 0" /></li>
              <li>• <strong>Slipp fra ro:</strong> <InlineLatex latex="v_0 = 0" />. Bruk <InlineLatex latex="y = y_0 - \frac{1}{2}gt^2" /> for falltid</li>
              <li>• <strong>Symmetri ved kast:</strong> Tiden opp = tiden ned (til samme høyde). Farten ved landing = startfarten (i størrelse)</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 2.6 Integrasjon */}
        <TheorySummary
          title="2.6 Fart og posisjon ved integrasjon"
          mustKnow={[
            "Når a varierer med tid: v(t) = v₀ + ∫a(t)dt",
            "x(t) = x₀ + ∫v(t)dt",
            "Kan IKKE bruke de fire standardlikningene når a ≠ konstant",
            "Maksimal fart: sett a(t) = 0 (der akselerasjonen skifter fortegn)",
          ]}
        >
          <p>
            Hva gjør vi når akselerasjonen <strong>varierer med tiden</strong>? Da kan vi
            ikke bruke de fire standardlikningene. I stedet må vi <strong>integrere</strong>.
          </p>

          <FormulaBox
            latex="v(t) = v_0 + \int_0^t a(t')\,dt'"
            title="Fart ved integrasjon"
            variant="gold"
            description="Integrerer akselerasjonen fra t = 0 til t for å finne farten."
          />
          <FormulaBox
            latex="x(t) = x_0 + \int_0^t v(t')\,dt'"
            title="Posisjon ved integrasjon"
            variant="gold"
            description="Integrerer farten fra t = 0 til t for å finne posisjonen."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Når bruker du integrasjon?</p>
            <ul className="space-y-1 text-sm">
              <li>• Akselerasjonen er oppgitt som en funksjon av tid, f.eks. <InlineLatex latex="a(t) = 2 - 0{,}1t" /></li>
              <li>• Farten er oppgitt som en funksjon av tid, og du trenger posisjonen</li>
              <li>• Standardlikningene gjelder IKKE når <InlineLatex latex="a \neq \text{konstant}" /></li>
            </ul>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tips: Finn maksimal fart</p>
            <p className="text-sm">
              Farten er maksimal (eller minimal) der <InlineLatex latex="\frac{dv}{dt} = a(t) = 0" />.
              Sett akselerasjonsfunksjonen lik null og løs for <InlineLatex latex="t" />.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor integrasjon?</p>
            <p className="text-sm">
              Derivasjon og integrasjon er <strong>motsatte operasjoner</strong>. Vi deriverer posisjon for
              å finne fart (<InlineLatex latex="v = dx/dt" />), og deriverer fart for å finne akselerasjon
              (<InlineLatex latex="a = dv/dt" />). Integrasjon går den andre veien: fra akselerasjon til
              fart, og fra fart til posisjon.
            </p>
            <p className="text-sm mt-2">
              <strong>Visuelt:</strong> I en v-t-graf er <strong>arealet under kurven</strong> lik forflytningen.
              Når farten varierer, kan vi ikke bare gange fart med tid — vi må «summere opp» alle de
              uendelig små bidragene. Det er nettopp det integralet gjør.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Tenk på vannforbruk. <strong>Akselerasjon</strong> er hvor raskt du skrur opp kranen (endring i
              vannstrøm). <strong>Fart</strong> er vannstrømmen (liter per minutt). <strong>Posisjon</strong>
              er total mengde vann i bøtten. For å finne total mengde vann (posisjon) når strømmen varierer,
              må du «integrere» strømmen over tid — det tilsvarer arealet under v-t-kurven.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Jeg kan alltid bruke standardlikningene»</strong> — Nei! <InlineLatex latex="v = v_0 + at" /> etc. gjelder <em>kun</em> for konstant a. Bruk integrasjon for variabel akselerasjon.</li>
              <li>• <strong>«Glemmer initialbetingelsen»</strong> — Når du integrerer, husk å legge til <InlineLatex latex="v_0" /> eller <InlineLatex latex="x_0" />. Uten dette mister du startpunktet!</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Tips: Integrasjon steg for steg</p>
            <ol className="space-y-1.5 text-sm list-decimal list-inside">
              <li>Skriv opp <InlineLatex latex="a(t)" /> og identifiser at den <em>ikke</em> er konstant</li>
              <li>Integrer: <InlineLatex latex="v(t) = v_0 + \int_0^t a(t')\,dt'" /></li>
              <li>Integrer igjen: <InlineLatex latex="x(t) = x_0 + \int_0^t v(t')\,dt'" /></li>
              <li>Sett inn grensene og forenk</li>
              <li>Bruk initialbetingelsene til å bestemme eventuelle konstanter</li>
            </ol>
          </div>
        </TheorySummary>
      </section>

      {/* ══════════════════════════════════════════════
          2. FORMLER
          ══════════════════════════════════════════════ */}
      <section id="formler" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-12 mb-6">Formler</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="\bar{v} = \frac{\Delta x}{\Delta t}" title="Gjennomsnittsfart" variant="blue" />
          <FormulaBox latex="v = \frac{dx}{dt}" title="Momentanfart" variant="gold" />
          <FormulaBox latex="\bar{a} = \frac{\Delta v}{\Delta t}" title="Gjennomsnittlig akselerasjon" variant="blue" />
          <FormulaBox latex="a = \frac{dv}{dt} = \frac{d^2x}{dt^2}" title="Momentanakselerasjon" variant="gold" />
        </div>

        <h3 className="font-semibold text-lg mt-8 mb-3">Konstant akselerasjon</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="v = v_0 + at" title="Likning 1 (mangler x)" variant="gold" />
          <FormulaBox latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" title="Likning 2 (mangler v)" variant="gold" />
          <FormulaBox latex="v^2 = v_0^2 + 2a(x - x_0)" title="Likning 3 (mangler t)" variant="gold" />
          <FormulaBox latex="x - x_0 = \tfrac{1}{2}(v_0 + v)\,t" title="Likning 4 (mangler a)" variant="gold" />
        </div>

        <h3 className="font-semibold text-lg mt-8 mb-3">Fritt fall (y-akse oppover)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="v_y = v_{0y} - gt" title="Fart (fritt fall)" variant="gold" />
          <FormulaBox latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2" title="Posisjon (fritt fall)" variant="gold" />
          <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y - y_0)" title="Fart–posisjon (fritt fall)" variant="gold" />
          <FormulaBox latex="g = 9{,}81\;\text{m/s}^2" title="Tyngdeakselerasjon" variant="blue" />
        </div>

        <h3 className="font-semibold text-lg mt-8 mb-3">Varierende akselerasjon</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FormulaBox latex="v(t) = v_0 + \int_0^t a(t')\,dt'" title="Fart ved integrasjon" variant="gold" />
          <FormulaBox latex="x(t) = x_0 + \int_0^t v(t')\,dt'" title="Posisjon ved integrasjon" variant="gold" />
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
                  <td className="py-2 pr-4">Gjennomsnittsfart over et intervall</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\bar{v} = \Delta x / \Delta t" /></td>
                  <td className="py-2">Sekant i x-t-grafen</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Øyeblikkelig fart</td>
                  <td className="py-2 pr-4">Deriver <InlineLatex latex="x(t)" /></td>
                  <td className="py-2">Tangent i x-t-grafen</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Konstant akselerasjon</td>
                  <td className="py-2 pr-4">De 4 likningene</td>
                  <td className="py-2">Velg ut fra kjent/ukjent</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Fritt fall</td>
                  <td className="py-2 pr-4">Samme med <InlineLatex latex="a = -g" /></td>
                  <td className="py-2">Velg y-akse oppover</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Varierende akselerasjon</td>
                  <td className="py-2 pr-4">Integrasjon</td>
                  <td className="py-2">Kan IKKE bruke de 4 likningene</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. INTERAKTIVE VISUALISERINGER
          ══════════════════════════════════════════════ */}
      <section id="visualiseringer" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-12 mb-6">Interaktive visualiseringer</h2>
        <KinematicsGraphs />
        <FreeFallSimulator />
      </section>

      {/* ══════════════════════════════════════════════
          4. OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <section id="strategier" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-12 mb-6">Oppgavestrategier</h2>

        <div className="space-y-6">
          {/* Strategi 1 */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Slik løser du en kinematikkoppgave</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Tegn figur</strong> med koordinatakse og definer positiv retning.</li>
              <li><strong>List opp kjente størrelser:</strong> <InlineLatex latex="x_0, v_0, a, t, x, v" />.</li>
              <li><strong>Identifiser den ukjente</strong> og den størrelsen du ikke trenger.</li>
              <li><strong>Velg riktig likning</strong> — den som mangler størrelsen du ikke trenger.</li>
              <li><strong>Løs algebraisk</strong> for den ukjente, sett inn tall.</li>
              <li><strong>Sjekk:</strong> Er fortegn, enhet og størrelsesorden rimelig?</li>
            </ol>
          </div>

          {/* Strategi 2 */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Slik løser du fritt-fall-oppgaver</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Velg <strong>positiv y-akse oppover</strong> → <InlineLatex latex="a_y = -g = -9{,}81" /> m/s².</li>
              <li>Identifiser <InlineLatex latex="y_0" /> og <InlineLatex latex="v_{0y}" /> (pass på fortegn!).</li>
              <li><strong>Toppunkt:</strong> sett <InlineLatex latex="v_y = 0" /> → finn <InlineLatex latex="t" /> og <InlineLatex latex="y" />.</li>
              <li><strong>Treffer bakken:</strong> sett <InlineLatex latex="y = 0" /> → løs andregradsligning → forkast negativ <InlineLatex latex="t" />.</li>
              <li><strong>Fart ved landing:</strong> bruk <InlineLatex latex="v_y = v_{0y} - gt" /> eller <InlineLatex latex="v_y^2" />-likningen.</li>
            </ol>
          </div>

          {/* Strategi 3 */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Slik løser du oppgaver med varierende akselerasjon</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Gjenkjenn</strong> at <InlineLatex latex="a(t)" /> ikke er konstant → du MÅ bruke integrasjon.</li>
              <li><strong>Integrer</strong> <InlineLatex latex="a(t)" /> for å finne <InlineLatex latex="v(t)" />. Husk startverdien <InlineLatex latex="v_0" />.</li>
              <li><strong>Integrer</strong> <InlineLatex latex="v(t)" /> for å finne <InlineLatex latex="x(t)" />. Husk <InlineLatex latex="x_0" />.</li>
              <li><strong>Maks/min fart:</strong> sett <InlineLatex latex="a(t) = 0" /> og løs for <InlineLatex latex="t" />.</li>
            </ol>
          </div>

          {/* Vanlige feil */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✗</span>
                <span>Glemmer å konvertere enheter (cm → m, km/h → m/s)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✗</span>
                <span>Bruker de 4 likningene når akselerasjonen IKKE er konstant</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✗</span>
                <span>Tror a = 0 i toppunktet i fritt fall (a er ALLTID −g)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✗</span>
                <span>Roter med fortegn — velg positiv retning fra starten og hold deg til det</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">✗</span>
                <span>Blander fart (med fortegn) og fartens størrelse (alltid positiv)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <section id="eksempler" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Gepard */}
        <ExerciseCard
          number={1}
          title="Gepard langs rett linje"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                En gepard beveger seg langs en rett linje. Posisjonen er gitt ved:
              </p>
              <FormulaBox latex="x(t) = 20 + 5{,}0\,t^2 \quad [\text{m}]" variant="blue" />
              <p className="mt-2">
                a) Finn gjennomsnittsfarten mellom <InlineLatex latex="t = 1{,}0" /> s og{" "}
                <InlineLatex latex="t = 2{,}0" /> s.
              </p>
              <p>b) Finn momentanfarten som funksjon av tid, og beregn den for <InlineLatex latex="t = 1{,}0" /> s og <InlineLatex latex="t = 2{,}0" /> s.</p>
              <p>c) Finn akselerasjonen.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>For gjennomsnittsfart: finn x(1) og x(2) og bruk Δx/Δt.</p> },
            { label: "Hint 2", content: <p>For momentanfart: deriver x(t) mhp. t.</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
                <ul className="list-disc list-inside text-sm">
                  <li><InlineLatex latex="x(t) = 20 + 5{,}0\,t^2" /> (posisjonsfunksjon)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">a) Gjennomsnittsfart mellom t = 1,0 s og t = 2,0 s</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor denne metoden?</strong> Gjennomsnittsfart er definert som forflytning delt på tid.
                  Vi trenger altså posisjonen ved begge tidspunktene.
                </p>
                <p className="text-sm mt-2">
                  <strong>Steg 1:</strong> Finn posisjonen ved hvert tidspunkt ved å sette inn i <InlineLatex latex="x(t)" />:
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="x(1{,}0) = 20 + 5{,}0 \cdot (1{,}0)^2 = 20 + 5 = 25\;\text{m}" />
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="x(2{,}0) = 20 + 5{,}0 \cdot (2{,}0)^2 = 20 + 20 = 40\;\text{m}" />
                </p>
                <p className="text-sm mt-2">
                  <strong>Steg 2:</strong> Bruk definisjonen av gjennomsnittsfart — forflytning delt på tidsintervall:
                </p>
                <FormulaBox latex="\bar{v} = \frac{\Delta x}{\Delta t} = \frac{40 - 25}{2{,}0 - 1{,}0} = \frac{15}{1{,}0} = \underline{\underline{15\;\text{m/s}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">b) Momentanfart</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor derivere?</strong> Momentanfarten er farten i ett bestemt øyeblikk.
                  Matematisk er den den tidsderiverte av posisjonsfunksjonen — vi finner stigningstallet
                  til tangenten i x-t-grafen.
                </p>
                <p className="text-sm mt-2">
                  <strong>Steg 1:</strong> Deriver <InlineLatex latex="x(t)" /> med hensyn på <InlineLatex latex="t" />.
                  Bruker potensregelen: derivert av <InlineLatex latex="t^2" /> er <InlineLatex latex="2t" />, og derivert av en konstant (20) er 0:
                </p>
                <FormulaBox latex="v(t) = \frac{dx}{dt} = 0 + 5{,}0 \cdot 2t = 10t \;\;[\text{m/s}]" variant="gold" />
                <p className="text-sm mt-2">
                  <strong>Steg 2:</strong> Sett inn tidspunktene:
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="v(1{,}0) = 10 \cdot 1{,}0 = 10\;\text{m/s}" />
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="v(2{,}0) = 10 \cdot 2{,}0 = 20\;\text{m/s}" />
                </p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  Legg merke til: gjennomsnittsfarten (15 m/s) er gjennomsnittet av momentanfartene ved start og slutt — dette
                  gjelder fordi akselerasjonen er konstant.
                </p>
              </div>

              <div>
                <p className="font-semibold">c) Akselerasjon</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor derivere igjen?</strong> Akselerasjonen er endringsraten til farten.
                  Deriverer vi v(t), finner vi hvor raskt farten endrer seg.
                </p>
                <FormulaBox latex="a(t) = \frac{dv}{dt} = \frac{d}{dt}(10t) = \underline{\underline{10\;\text{m/s}^2}}" variant="gold" />
                <p className="text-sm mt-1">Akselerasjonen er konstant — dette er altså bevegelse med konstant akselerasjon, og vi
                  kunne brukt de fire standardlikningene.</p>
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
                <p className="text-sm">Momentanfart = derivert av posisjon. Akselerasjon = derivert av fart. Derivasjon gir
                  oss øyeblikkelige verdier fra funksjoner som varierer med tiden.</p>
              </div>
            </div>
          }
        />

        {/* Eksempel 2: Motorsyklist */}
        <ExerciseCard
          number={2}
          title="Motorsyklist med konstant akselerasjon"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En motorsyklist har akselerasjon <InlineLatex latex="a = 4{,}0" /> m/s²,
                startposisjon <InlineLatex latex="x_0 = 5{,}0" /> m og startfart{" "}
                <InlineLatex latex="v_0 = 15" /> m/s.
              </p>
              <p className="mt-2">a) Finn fart og posisjon etter <InlineLatex latex="t = 2{,}0" /> s.</p>
              <p>b) Finn posisjonen når farten er 25 m/s.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Konstant akselerasjon → bruk de fire bevegelseslikningene.</p> },
            { label: "Hint 2", content: <p>I b) er v kjent men t ukjent — bruk likning 3 (<InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />).</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
                <ul className="list-disc list-inside text-sm">
                  <li><InlineLatex latex="a = 4{,}0\;\text{m/s}^2" /> (konstant), <InlineLatex latex="\;x_0 = 5{,}0\;\text{m}" />, <InlineLatex latex="\;v_0 = 15\;\text{m/s}" /></li>
                </ul>
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Hvilke formler?</p>
                <p className="text-sm">Akselerasjonen er konstant → vi kan bruke de fire bevegelseslikningene.</p>
              </div>

              <div>
                <p className="font-semibold">a) Fart og posisjon ved t = 2,0 s</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor likning 1?</strong> Vi kjenner <InlineLatex latex="v_0" />, <InlineLatex latex="a" /> og <InlineLatex latex="t" />,
                  og søker <InlineLatex latex="v" />. Likning 1 kobler nettopp disse fire størrelsene.
                </p>
                <FormulaBox latex="v = v_0 + at = 15 + 4{,}0 \cdot 2{,}0 = \underline{\underline{23\;\text{m/s}}}" variant="gold" />
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor likning 2?</strong> For posisjonen kjenner vi <InlineLatex latex="x_0" />, <InlineLatex latex="v_0" />, <InlineLatex latex="a" /> og <InlineLatex latex="t" />.
                  Likning 2 gir oss <InlineLatex latex="x" /> direkte.
                </p>
                <FormulaBox latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2 = 5{,}0 + 15 \cdot 2{,}0 + \tfrac{1}{2} \cdot 4{,}0 \cdot (2{,}0)^2 = 5 + 30 + 8 = \underline{\underline{43\;\text{m}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">b) Posisjon når v = 25 m/s</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor likning 3?</strong> Vi kjenner <InlineLatex latex="v_0" />, <InlineLatex latex="v" /> og <InlineLatex latex="a" />,
                  men ikke <InlineLatex latex="t" />. Vi trenger heller ikke <InlineLatex latex="t" />! Likning 3 er den
                  eneste som kobler <InlineLatex latex="v, v_0, a" /> og <InlineLatex latex="x" /> uten å involvere tid.
                </p>
                <p className="text-sm mt-2">Løser for <InlineLatex latex="x" />:</p>
                <FormulaBox latex="v^2 = v_0^2 + 2a(x - x_0) \;\Rightarrow\; x = x_0 + \frac{v^2 - v_0^2}{2a}" variant="blue" />
                <FormulaBox latex="x = 5{,}0 + \frac{25^2 - 15^2}{2 \cdot 4{,}0} = 5{,}0 + \frac{625 - 225}{8{,}0} = 5{,}0 + 50 = \underline{\underline{55\;\text{m}}}" variant="gold" />
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
                <p className="text-sm">Velg likning basert på hva som er kjent og ukjent. Likning 3 er spesielt nyttig
                  når tiden ikke er oppgitt og heller ikke etterspurt.</p>
              </div>
            </div>
          }
        />

        {/* Eksempel 3: Politijakt */}
        <ExerciseCard
          number={3}
          title="Bil jages av politimotorsykkel"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En bil kjører med konstant fart <InlineLatex latex="v_B = 15" /> m/s. I det øyeblikket bilen
                passerer et punkt, starter en politimotorsykkel fra ro med akselerasjon{" "}
                <InlineLatex latex="a_M = 3{,}0" /> m/s².
              </p>
              <p className="mt-2">a) Når tar motorsykkelen igjen bilen?</p>
              <p>b) Hva er motorsykkelens fart da?</p>
              <p>c) Hvor langt har de kjørt?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Skriv opp x(t) for begge kjøretøyene separat, og sett dem like.</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Bil: konstant fart <InlineLatex latex="v_B = 15\;\text{m/s}" />, <InlineLatex latex="\;a_B = 0" /></li>
                  <li>MC: starter fra ro (<InlineLatex latex="v_0 = 0" />), <InlineLatex latex="\;a_M = 3{,}0\;\text{m/s}^2" /></li>
                  <li>Begge starter ved <InlineLatex latex="x = 0" /> ved <InlineLatex latex="t = 0" /></li>
                </ul>
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Strategi</p>
                <p className="text-sm">Når to legemer møtes, skriv opp posisjonsfunksjon for hvert av dem og sett <InlineLatex latex="x_B(t) = x_M(t)" />.</p>
              </div>

              <div>
                <p className="font-semibold">Oppsett: Posisjonsfunksjoner</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor separate funksjoner?</strong> Hvert legeme har sine egne betingelser.
                  Bilen har konstant fart (a = 0), og motorsykkelen akselererer fra ro.
                </p>
                <p className="text-sm mt-2">
                  Bil (konstant fart, <InlineLatex latex="a = 0" />): <InlineLatex latex="x_B = v_B \cdot t = 15t" />
                </p>
                <p className="text-sm">
                  MC (starter fra ro, <InlineLatex latex="v_0 = 0" />): <InlineLatex latex="x_M = \tfrac{1}{2}a_M t^2 = \tfrac{1}{2}(3{,}0)t^2 = 1{,}5t^2" />
                </p>
              </div>

              <div>
                <p className="font-semibold">a) Når tar MC igjen bilen?</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor sette lik?</strong> MC tar igjen bilen når begge er på samme sted, altså <InlineLatex latex="x_M = x_B" />.
                </p>
                <FormulaBox latex="1{,}5t^2 = 15t \;\Rightarrow\; 1{,}5t^2 - 15t = 0 \;\Rightarrow\; t(1{,}5t - 15) = 0" variant="blue" />
                <p className="text-sm mt-2">
                  To løsninger: <InlineLatex latex="t = 0" /> (startpunktet — de er jo begge ved x = 0 da) og:
                </p>
                <FormulaBox latex="1{,}5t = 15 \;\Rightarrow\; t = \underline{\underline{10\;\text{s}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">b) Motorsykkelens fart ved innhenting</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor likning 1?</strong> MC har konstant akselerasjon, og vi kjenner t. Likning 1 gir farten direkte.
                </p>
                <FormulaBox latex="v_M = a_M \cdot t = 3{,}0 \cdot 10 = \underline{\underline{30\;\text{m/s}}}" variant="gold" />
                <p className="text-sm mt-1 text-[var(--muted)]">
                  Interessant: MC har dobbelt så høy fart som bilen ved innhenting! Den må kjøre fortere
                  enn bilen for å ta igjen forspranget bilen bygget opp mens MC akselererte.
                </p>
              </div>

              <div>
                <p className="font-semibold">c) Tilbakelagt distanse</p>
                <FormulaBox latex="x = 15 \cdot 10 = \underline{\underline{150\;\text{m}}}" variant="gold" />
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
                <p className="text-sm">Når to legemer møtes, sett posisjonsfunksjonene like. Denne teknikken brukes også i
                  kollisjonsoppgaver og ved skrått kast (når treffer prosjektilet bakken?).</p>
              </div>
            </div>
          }
        />

        {/* Eksempel 4: Ball kastes opp fra tak */}
        <ExerciseCard
          number={4}
          title="Ball kastes oppover fra tak"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ball kastes oppover med <InlineLatex latex="v_{0y} = 15" /> m/s fra toppen av
                en 20 m høy bygning (<InlineLatex latex="y_0 = 20" /> m).
              </p>
              <p className="mt-2">a) Finn posisjon og fart etter 1,0 s og 4,0 s.</p>
              <p>b) Finn farten når ballen er 5,0 m over taket.</p>
              <p>c) Finn maksimalhøyden og tidspunktet.</p>
              <p>d) Hva er akselerasjonen i toppunktet?</p>
              <p>e) Når treffer ballen bakken?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Fritt fall med y-akse oppover. Bruk fritt-fall-likningene.</p> },
            { label: "Hint 2", content: <p>Toppunktet: sett v_y = 0. Bakken: sett y = 0.</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
                <ul className="list-disc list-inside text-sm">
                  <li><InlineLatex latex="v_{0y} = +15\;\text{m/s}" /> (oppover = positiv), <InlineLatex latex="\;y_0 = 20\;\text{m}" /></li>
                  <li><InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" /> (fritt fall, y-akse oppover)</li>
                </ul>
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Hvilke formler?</p>
                <p className="text-sm">Fritt fall = konstant akselerasjon. Bruk fritt-fall-likningene med positiv y oppover.</p>
              </div>

              <div>
                <p className="font-semibold">a) Posisjon og fart ved t = 1,0 s og t = 4,0 s</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor disse formlene?</strong> Vi kjenner startverdier og tid, og søker y og v_y.
                  Bruker standardformlene for fritt fall.
                </p>
                <p className="text-sm mt-2"><strong>Ved t = 1,0 s:</strong></p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="y = 20 + 15(1{,}0) - \tfrac{1}{2}(9{,}81)(1{,}0)^2 = 20 + 15 - 4{,}9 = 30{,}1\;\text{m}" />
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="v_y = 15 - 9{,}81(1{,}0) = +5{,}19\;\text{m/s}" /> (fortsatt på vei opp)
                </p>
                <p className="text-sm mt-2"><strong>Ved t = 4,0 s:</strong></p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="y = 20 + 15(4{,}0) - \tfrac{1}{2}(9{,}81)(4{,}0)^2 = 20 + 60 - 78{,}5 = 1{,}5\;\text{m}" />
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="v_y = 15 - 9{,}81(4{,}0) = -24{,}2\;\text{m/s}" /> (på vei ned)
                </p>
              </div>

              <div>
                <p className="font-semibold">b) Fart 5,0 m over taket (y = 25 m)</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor likning 3?</strong> Vi kjenner posisjon men ikke tid. <InlineLatex latex="v_y^2" />-formelen
                  kobler fart og posisjon uten tid.
                </p>
                <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y - y_0) = 15^2 - 2(9{,}81)(25 - 20) = 225 - 98{,}1 = 126{,}9" variant="blue" />
                <FormulaBox latex="v_y = \pm\sqrt{126{,}9} = \underline{\underline{\pm 11{,}3\;\text{m/s}}}" variant="gold" />
                <p className="text-sm mt-1 text-[var(--muted)]">
                  <strong>Hvorfor to svar?</strong> Ballen passerer denne høyden to ganger — én gang på
                  vei opp (+11,3 m/s) og én gang på vei ned (−11,3 m/s). Fartens størrelse er lik begge
                  ganger — energibevaring i praksis!
                </p>
              </div>

              <div>
                <p className="font-semibold">c) Maksimalhøyde</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor sette v_y = 0?</strong> I toppunktet snur ballen retning. I det øyeblikket
                  er farten null — den har sluttet å gå oppover, men har ikke begynt å falle ennå.
                </p>
                <p className="text-sm mt-2"><strong>Steg 1:</strong> Finn tidspunktet for toppen:</p>
                <FormulaBox latex="v_y = 0 = v_{0y} - gt \;\Rightarrow\; t_\text{topp} = \frac{v_{0y}}{g} = \frac{15}{9{,}81} = \underline{\underline{1{,}53\;\text{s}}}" variant="gold" />
                <p className="text-sm mt-2"><strong>Steg 2:</strong> Sett inn i posisjonslikningen (eller bruk <InlineLatex latex="v_y^2" />-formelen med <InlineLatex latex="v_y = 0" />):</p>
                <FormulaBox latex="y_\text{maks} = y_0 + \frac{v_{0y}^2}{2g} = 20 + \frac{225}{19{,}62} = \underline{\underline{31{,}5\;\text{m}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">d) Akselerasjon i toppunktet</p>
                <FormulaBox latex="a_y = -g = \underline{\underline{-9{,}81\;\text{m/s}^2}}" variant="gold" />
                <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-3 mt-2">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    Akselerasjonen er ALLTID −g i fritt fall, selv når v = 0!
                  </p>
                  <p className="text-sm mt-1">
                    Farten er null i toppunktet, men den <em>endrer seg</em> (fra positiv til negativ). Nettopp
                    denne endringen er akselerasjonen. Hadde a vært 0, ville ballen blitt hengende i lufta!
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold">e) Ballen treffer bakken (y = 0)</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor sette y = 0?</strong> Bakken er ved y = 0 i vårt koordinatsystem.
                </p>
                <FormulaBox latex="0 = 20 + 15t - 4{,}905t^2" variant="blue" />
                <p className="text-sm mt-2">
                  Omskriver til standardform og bruker andregradsformelen:
                </p>
                <p className="text-sm ml-4">
                  <InlineLatex latex="4{,}905t^2 - 15t - 20 = 0" />
                </p>
                <p className="text-sm mt-1">
                  Løsninger: <InlineLatex latex="t = -1{,}0\;\text{s}" /> (ugyldig — negativ tid gir ingen fysisk mening)
                  og <InlineLatex latex="\underline{\underline{t = 4{,}1\;\text{s}}}" />.
                </p>
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
                <p className="text-sm">Bruk fortegn konsekvent fra starten. Sjekk at svaret gir fysisk mening —
                  forkast negative tider og sjekk at ballens bane er rimelig. Akselerasjonen er −g hele tiden,
                  uansett hvor ballen er i banen.</p>
              </div>
            </div>
          }
        />

        {/* Eksempel 5: Varierende akselerasjon */}
        <ExerciseCard
          number={5}
          title="Bil med varierende akselerasjon"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                En bil har akselerasjon <InlineLatex latex="a(t) = 2 - 0{,}1t" /> m/s²,
                startfart <InlineLatex latex="v_0 = 10" /> m/s og startposisjon{" "}
                <InlineLatex latex="x_0 = 50" /> m.
              </p>
              <p className="mt-2">a) Finn v(t) og x(t).</p>
              <p>b) Når er farten størst?</p>
              <p>c) Hva er den maksimale farten?</p>
              <p>d) Hva er posisjonen ved maksimal fart?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>a(t) er IKKE konstant → du MÅ bruke integrasjon (seksjon 2.6).</p> },
            { label: "Hint 2", content: <p>Maksimal fart: sett dv/dt = a(t) = 0.</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
                <ul className="list-disc list-inside text-sm">
                  <li><InlineLatex latex="a(t) = 2 - 0{,}1t" /> m/s² — <strong>ikke konstant!</strong></li>
                  <li><InlineLatex latex="v_0 = 10\;\text{m/s}" />, <InlineLatex latex="\;x_0 = 50\;\text{m}" /></li>
                </ul>
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Strategi</p>
                <p className="text-sm">
                  Siden <InlineLatex latex="a" /> ikke er konstant, kan vi IKKE bruke de fire standardlikningene.
                  Vi MÅ integrere: <InlineLatex latex="a(t) \xrightarrow{\int} v(t) \xrightarrow{\int} x(t)" />.
                </p>
              </div>

              <div>
                <p className="font-semibold">a) Finn v(t) og x(t) ved integrasjon</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor integrere?</strong> Fart er integralet av akselerasjon over tid, og posisjon
                  er integralet av fart. Dette er det motsatte av derivasjon.
                </p>
                <p className="text-sm mt-2"><strong>Steg 1:</strong> Integrer a(t) for å finne v(t):</p>
                <FormulaBox
                  latex="v(t) = v_0 + \int_0^t (2 - 0{,}1t')\,dt' = 10 + \left[2t' - 0{,}05t'^2\right]_0^t = 10 + 2t - 0{,}05t^2"
                  variant="gold"
                />
                <p className="text-sm mt-2"><strong>Steg 2:</strong> Integrer v(t) for å finne x(t):</p>
                <FormulaBox
                  latex="x(t) = 50 + \int_0^t (10 + 2t' - 0{,}05t'^2)\,dt' = 50 + 10t + t^2 - 0{,}0167t^3"
                  variant="gold"
                />
              </div>

              <div>
                <p className="font-semibold">b) Når er farten størst?</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor sette a(t) = 0?</strong> Farten har ekstremverdi der den deriverte (= akselerasjonen)
                  er null. Før dette tidspunktet er a {'>'} 0 (farten øker), etter er a {'<'} 0 (farten synker).
                </p>
                <FormulaBox latex="a(t) = 2 - 0{,}1t = 0 \;\Rightarrow\; t = \frac{2}{0{,}1} = \underline{\underline{20\;\text{s}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">c) Maksimal fart</p>
                <p className="text-sm mt-2">Sett inn t = 20 s i v(t):</p>
                <FormulaBox latex="v(20) = 10 + 2(20) - 0{,}05(20)^2 = 10 + 40 - 20 = \underline{\underline{30\;\text{m/s}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">d) Posisjon ved maksimal fart</p>
                <p className="text-sm mt-2">Sett inn t = 20 s i x(t):</p>
                <FormulaBox latex="x(20) = 50 + 10(20) + (20)^2 - 0{,}0167(20)^3 = 50 + 200 + 400 - 133 = \underline{\underline{517\;\text{m}}}" variant="gold" />
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
                <p className="text-sm">Ved varierende akselerasjon: integrer a(t) → v(t) → x(t). Maks/min fart finner
                  du der a(t) = 0 (farten slutter å øke og begynner å synke). Husk å legge til initialverdiene
                  v₀ og x₀ etter integrasjon!</p>
              </div>
            </div>
          }
        />
      </section>

      {/* ══════════════════════════════════════════════
          6. ØVINGSOPPGAVER
          ══════════════════════════════════════════════ */}
      <section id="ovingsoppgaver" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-12 mb-6">Øvingsoppgaver</h2>

        <ExerciseCard
          number={1}
          title="Kjelke på snøbakke"
          difficulty="middels"
          source="Oblig 1, Oppgave 1"
          problem={
            <div>
              <p>
                En jente sender en kjelke oppover en snøbakke langs ei rett linje. Posisjonen er:
              </p>
              <FormulaBox latex="x(t) = C_1 t^2 + C_2 t" variant="blue" />
              <p className="text-sm mt-2">
                der <InlineLatex latex="C_1 = -1{,}0\;\text{m/s}^2" /> og{" "}
                <InlineLatex latex="C_2 = 10\;\text{m/s}" />.
              </p>
              <p className="mt-2">a) Regn ut kjelkens fart og akselerasjon som funksjon av tiden.</p>
              <p>b) Hvor langt oppover bakken kommer kjelken?</p>
              <p>c) Hvor lang tid tar det før kjelken er tilbake ved startpunktet? Fart da?</p>
              <p>d) Tegn x–t og v–t diagrammer.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Deriver x(t) for fart, deriver v(t) for akselerasjon.</p> },
            { label: "Hint 2", content: <p>Kjelken snur der v(t) = 0. Tilbake: sett x(t) = 0.</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div>
                <p className="font-semibold">a) Fart og akselerasjon</p>
                <FormulaBox latex="v(t) = x'(t) = 2C_1 t + C_2 = -2{,}0t + 10 \;\;[\text{m/s}]" variant="gold" />
                <FormulaBox latex="a(t) = v'(t) = 2C_1 = \underline{\underline{-2{,}0\;\text{m/s}^2}}" variant="gold" />
                <p className="text-sm text-[var(--muted)]">Akselerasjonen er konstant og negativ — kjelken bremser opp, snur, og akselererer tilbake.</p>
              </div>

              <div>
                <p className="font-semibold">b) Maks posisjon (der kjelken snur: v = 0)</p>
                <FormulaBox latex="-2{,}0t + 10 = 0 \;\Rightarrow\; t = 5{,}0\;\text{s}" variant="blue" />
                <FormulaBox latex="x(5{,}0) = -1{,}0 \cdot 25 + 10 \cdot 5{,}0 = \underline{\underline{25\;\text{m}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">c) Tilbake ved start (x = 0)</p>
                <FormulaBox latex="-1{,}0t^2 + 10t = 0 \;\Rightarrow\; t(-t + 10) = 0" variant="blue" />
                <p className="text-sm mt-1">
                  <InlineLatex latex="t = 0" /> (start) eller <InlineLatex latex="\underline{\underline{t = 10\;\text{s}}}" />
                </p>
                <FormulaBox latex="v(10) = -2{,}0 \cdot 10 + 10 = \underline{\underline{-10\;\text{m/s}}}" variant="gold" />
                <p className="text-sm text-[var(--muted)]">Farten er 10 m/s nedover bakken. Lik startfarten, men med motsatt fortegn — symmetri!</p>
              </div>

              <div>
                <p className="font-semibold">d) Grafer</p>
                <p className="text-sm">
                  x–t: Parabel med topp ved (5 s, 25 m), tilbake til x = 0 ved t = 10 s.
                </p>
                <p className="text-sm">
                  v–t: Rett linje fra +10 m/s til −10 m/s, krysser null ved t = 5 s.
                </p>
              </div>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Tog bremser ned"
          difficulty="lett"
          problem={
            <div>
              <p>
                Et tog kjører med fart 30 m/s når det begynner å bremse med konstant akselerasjon.
                Etter 200 m har farten sunket til 10 m/s.
              </p>
              <p className="mt-2">a) Finn akselerasjonen.</p>
              <p>b) Hvor langt kjører toget totalt før det stopper?</p>
              <p>c) Hvor lang tid tar det å stoppe?</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>I a) kjenner du v₀, v og Δx men ikke t. Hvilken likning mangler t?</p> },
            { label: "Hint 2", content: <p>Likning 3: v² = v₀² + 2aΔx. I b) sett v = 0.</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div>
                <p className="font-semibold">a) Akselerasjon (bruker likning 3 — mangler t)</p>
                <FormulaBox latex="a = \frac{v^2 - v_0^2}{2\Delta x} = \frac{10^2 - 30^2}{2 \cdot 200} = \frac{100 - 900}{400} = \underline{\underline{-2{,}0\;\text{m/s}^2}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">b) Total bremselengde (sett v = 0)</p>
                <FormulaBox latex="\Delta x = \frac{0^2 - 30^2}{2(-2{,}0)} = \frac{-900}{-4{,}0} = \underline{\underline{225\;\text{m}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">c) Tid til stopp (bruker likning 1)</p>
                <FormulaBox latex="t = \frac{v - v_0}{a} = \frac{0 - 30}{-2{,}0} = \underline{\underline{15\;\text{s}}}" variant="gold" />
              </div>
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="Stein slippes fra bro"
          difficulty="lett"
          problem={
            <div>
              <p>
                En stein slippes fra ro fra en bro 45 m over vannet.
              </p>
              <p className="mt-2">a) Hvor lang tid tar det før steinen treffer vannet?</p>
              <p>b) Hva er farten idet den treffer vannet?</p>
            </div>
          }
          hints={[
            { label: "Hint", content: <p>Fritt fall: v₀ = 0, y₀ = 45 m, y = 0 (vannoverflaten).</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div>
                <p className="font-semibold">a) Tid til vannet (y = 0, v₀ = 0)</p>
                <FormulaBox latex="y = y_0 - \tfrac{1}{2}g\,t^2 = 0 \;\Rightarrow\; t = \sqrt{\frac{2y_0}{g}} = \sqrt{\frac{90}{9{,}81}} = \underline{\underline{3{,}03\;\text{s}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">b) Fart ved landing</p>
                <FormulaBox latex="v_y = -gt = -9{,}81 \cdot 3{,}03 = -29{,}7\;\text{m/s}" variant="blue" />
                <p className="text-sm">
                  Fartens størrelse: <InlineLatex latex="|v| = \underline{\underline{29{,}7\;\text{m/s}}}" /> (ca. 107 km/h).
                </p>
              </div>
            </div>
          }
        />
      </section>

      {/* ══════════════════════════════════════════════
          7. EKSAMENSOPPGAVER
          ══════════════════════════════════════════════ */}
      <section id="eksamensoppgaver" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-12 mb-6">Eksamensoppgaver</h2>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 2</p>
          <ul className="space-y-1 text-sm">
            <li>• Rettlinjet bevegelse dukker gjerne opp som del av en større oppgave (f.eks. før et skråkast)</li>
            <li>• Integrasjon av varierende akselerasjon er et typisk eksamenstema</li>
            <li>• Sørg for at du kan tegne og tolke x-t og v-t grafer</li>
            <li>• Ha et bevisst forhold til fortegnskonvensjoner</li>
          </ul>
        </div>

        <ExerciseCard
          number={1}
          title="Varierende akselerasjon — Eksamenstype"
          difficulty="vanskelig"
          source="Eksamensrelevant"
          problem={
            <div>
              <p>
                En bil starter fra ro (<InlineLatex latex="v_0 = 0" />) ved posisjon <InlineLatex latex="x_0 = 0" />.
                Akselerasjonen er gitt ved <InlineLatex latex="a(t) = 4{,}0 - 0{,}20\,t" /> m/s².
              </p>
              <p className="mt-2">a) Finn v(t) og x(t).</p>
              <p>b) Når er farten maksimal? Hva er den maksimale farten?</p>
              <p>c) Hvor langt har bilen kjørt når farten er maksimal?</p>
              <p>d) Finn posisjonen etter 30 s.</p>
            </div>
          }
          hints={[
            { label: "Hint 1", content: <p>Varierende akselerasjon → bruk integrasjon, ikke de fire standardlikningene.</p> },
            { label: "Hint 2", content: <p>Maks fart: sett a(t) = 0. Husk at etter dette tidspunktet bremser bilen!</p> },
          ]}
          solution={
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Strategi</p>
                <p className="text-sm">
                  <InlineLatex latex="a(t)" /> avhenger av <InlineLatex latex="t" /> → ikke konstant → MÅ integrere.
                </p>
              </div>

              <div>
                <p className="font-semibold">a) Integrer a(t) for å finne v(t) og x(t)</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor?</strong> Akselerasjonen avtar lineært med tiden. De fire standardlikningene
                  krever konstant akselerasjon — vi er nødt til å integrere.
                </p>
                <FormulaBox latex="v(t) = 0 + \int_0^t (4{,}0 - 0{,}20t')\,dt' = 4{,}0t - 0{,}10t^2 \;\;[\text{m/s}]" variant="gold" />
                <FormulaBox latex="x(t) = 0 + \int_0^t (4{,}0t' - 0{,}10t'^2)\,dt' = 2{,}0t^2 - 0{,}033t^3 \;\;[\text{m}]" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">b) Maks fart</p>
                <p className="text-sm mt-2 text-[var(--muted)]">
                  <strong>Hvorfor a = 0?</strong> Farten øker så lenge a {'>'} 0. Når a = 0, slutter farten å øke — det er toppunktet.
                </p>
                <FormulaBox latex="4{,}0 - 0{,}20t = 0 \;\Rightarrow\; t = \underline{\underline{20\;\text{s}}}" variant="gold" />
                <FormulaBox latex="v(20) = 4{,}0(20) - 0{,}10(400) = 80 - 40 = \underline{\underline{40\;\text{m/s}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">c) Posisjon ved maks fart (t = 20 s)</p>
                <FormulaBox latex="x(20) = 2{,}0(400) - 0{,}033(8000) = 800 - 267 = \underline{\underline{533\;\text{m}}}" variant="gold" />
              </div>

              <div>
                <p className="font-semibold">d) Posisjon etter 30 s</p>
                <FormulaBox latex="x(30) = 2{,}0(900) - 0{,}033(27000) = 1800 - 900 = \underline{\underline{900\;\text{m}}}" variant="gold" />
                <p className="text-sm text-[var(--muted)]">Merk: etter t = 20 s er akselerasjonen negativ (bremser), men farten er fortsatt positiv —
                  bilen kjører fortsatt fremover, bare saktere.</p>
              </div>
            </div>
          }
        />
      </section>
    </ChapterLayout>
  );
}
