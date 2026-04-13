"use client";

import { useState } from "react";
import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 21)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

/* ─── Interactive: Coulombs lov-kalkulator ─── */
function CoulombCalculator() {
  const [q1, setQ1] = useState(25); // nC
  const [q2, setQ2] = useState(-75); // nC
  const [r, setR] = useState(3.0); // cm
  const k = 8.99e9;
  const force =
    k * (Math.abs(q1) * 1e-9 * Math.abs(q2) * 1e-9) / (r * 0.01) ** 2;
  const attractive = q1 * q2 < 0;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Coulombs lov — Kalkulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            q₁ (nC)
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={q1}
            onChange={(e) => setQ1(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{q1} nC</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            q₂ (nC)
          </label>
          <input
            type="range"
            min={-100}
            max={100}
            value={q2}
            onChange={(e) => setQ2(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{q2} nC</p>
        </div>
        <div>
          <label className="text-sm text-[var(--muted)] block mb-1">
            r (cm)
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="text-center text-sm font-mono mt-1">{r.toFixed(1)} cm</p>
        </div>
      </div>

      {/* Visual */}
      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto mb-4">
        {/* Line between charges */}
        <line x1="80" y1="60" x2="320" y2="60" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4" />
        {/* q1 */}
        <circle cx="80" cy="60" r="20" fill={q1 >= 0 ? "#ef4444" : "#3b82f6"} opacity="0.2" />
        <circle cx="80" cy="60" r="12" fill={q1 >= 0 ? "#ef4444" : "#3b82f6"} />
        <text x="80" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {q1 >= 0 ? "+" : "−"}
        </text>
        <text x="80" y="95" textAnchor="middle" fill="var(--muted)" fontSize="11">
          q₁
        </text>
        {/* q2 */}
        <circle cx="320" cy="60" r="20" fill={q2 >= 0 ? "#ef4444" : "#3b82f6"} opacity="0.2" />
        <circle cx="320" cy="60" r="12" fill={q2 >= 0 ? "#ef4444" : "#3b82f6"} />
        <text x="320" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {q2 >= 0 ? "+" : "−"}
        </text>
        <text x="320" y="95" textAnchor="middle" fill="var(--muted)" fontSize="11">
          q₂
        </text>
        {/* Force arrows */}
        {q1 !== 0 && q2 !== 0 && (
          <>
            {/* Arrow on q1 */}
            <line
              x1="80"
              y1="35"
              x2={attractive ? "115" : "45"}
              y2="35"
              stroke={attractive ? "#22c55e" : "#ef4444"}
              strokeWidth="2.5"
              markerEnd={`url(#arrow-${attractive ? "green" : "red"})`}
            />
            <text x={attractive ? "97" : "63"} y="28" textAnchor="middle" fill={attractive ? "#22c55e" : "#ef4444"} fontSize="10">
              F
            </text>
            {/* Arrow on q2 */}
            <line
              x1="320"
              y1="35"
              x2={attractive ? "285" : "355"}
              y2="35"
              stroke={attractive ? "#22c55e" : "#ef4444"}
              strokeWidth="2.5"
              markerEnd={`url(#arrow-${attractive ? "green" : "red"})`}
            />
          </>
        )}
        {/* Distance label */}
        <text x="200" y="75" textAnchor="middle" fill="var(--muted)" fontSize="11">
          r = {r.toFixed(1)} cm
        </text>
        <defs>
          <marker id="arrow-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#22c55e" />
          </marker>
          <marker id="arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      <div className="text-center space-y-1">
        <p className="text-sm text-[var(--muted)]">
          {attractive ? "Tiltrekkende kraft (ulike fortegn)" : "Frastøtende kraft (like fortegn)"}
        </p>
        <p className="text-2xl font-bold">
          F = {force < 0.001 ? force.toExponential(3) : force.toFixed(4)} N
        </p>
      </div>
    </div>
  );
}

/* ─── Interactive: E-felt fra punktladning ─── */
function ElectricFieldVisualizer() {
  const [charge, setCharge] = useState(5); // µC
  const positive = charge >= 0;

  const fieldLines = 12;
  const arrows: { x1: number; y1: number; x2: number; y2: number; angle: number }[] = [];
  for (let i = 0; i < fieldLines; i++) {
    const angle = (2 * Math.PI * i) / fieldLines;
    const r1 = 25;
    const r2 = 85;
    arrows.push({
      x1: 150 + r1 * Math.cos(angle),
      y1: 150 + r1 * Math.sin(angle),
      x2: 150 + r2 * Math.cos(angle),
      y2: 150 + r2 * Math.sin(angle),
      angle: (angle * 180) / Math.PI,
    });
  }

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 my-4">
      <h3 className="font-semibold text-lg mb-4">Elektrisk felt fra punktladning</h3>
      <div className="mb-4">
        <label className="text-sm text-[var(--muted)] block mb-1">
          Ladning q (µC)
        </label>
        <input
          type="range"
          min={-10}
          max={10}
          value={charge}
          onChange={(e) => setCharge(Number(e.target.value))}
          className="w-full max-w-xs accent-[var(--accent)]"
        />
        <p className="text-sm font-mono mt-1">{charge} µC</p>
      </div>

      <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto">
        {/* Field lines with arrows */}
        {charge !== 0 &&
          arrows.map((a, i) => (
            <g key={i}>
              <line
                x1={positive ? a.x1 : a.x2}
                y1={positive ? a.y1 : a.y2}
                x2={positive ? a.x2 : a.x1}
                y2={positive ? a.y2 : a.y1}
                stroke="var(--muted)"
                strokeWidth="1.5"
                opacity={0.5}
                markerEnd="url(#field-arrow)"
              />
            </g>
          ))}
        {/* Charge */}
        <circle
          cx="150"
          cy="150"
          r="18"
          fill={positive ? "#ef4444" : "#3b82f6"}
        />
        <text x="150" y="156" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
          {positive ? "+" : "−"}
        </text>
        <defs>
          <marker id="field-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5" fill="var(--muted)" />
          </marker>
        </defs>
      </svg>

      <p className="text-sm text-[var(--muted)] text-center mt-2">
        {charge === 0
          ? "Ingen ladning — ingen felt"
          : positive
          ? "Positiv ladning: Feltlinjene peker BORT fra ladningen"
          : "Negativ ladning: Feltlinjene peker MOT ladningen"}
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

        {/* 21.1 Elektrisk ladning */}
        <TheorySummary
          title="21.1 Elektrisk ladning"
          mustKnow={[
            "Det finnes to typer ladning: positiv og negativ",
            "Like ladninger frastøter, ulike tiltrekker",
            "Elektrisk ladning er bevart i lukkede systemer",
            "Ladning er kvantisert: q = n · e",
            "Elementærladningen e = 1,60 · 10⁻¹⁹ C",
          ]}
        >
          <p>
            All materie er bygd opp av partikler med elektrisk ladning.
            Det finnes <strong>to typer</strong> elektrisk ladning: <strong>positiv</strong> og <strong>negativ</strong>.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Grunnregel</p>
            <p><strong>Like ladninger frastøter</strong> hverandre med elektriske krefter.</p>
            <p><strong>Ulike ladninger tiltrekker</strong> hverandre med elektriske krefter.</p>
          </div>

          <p className="mt-4">Materiens byggesteiner:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm my-2 border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Partikkel</th>
                  <th className="text-left py-2 pr-4">Masse</th>
                  <th className="text-left py-2 pr-4">Ladning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Proton</td>
                  <td className="py-2 pr-4"><InlineLatex latex="m_p = 1{,}67 \cdot 10^{-27}\;\text{kg}" /></td>
                  <td className="py-2 pr-4 text-red-600 dark:text-red-400">+e (positiv)</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Elektron</td>
                  <td className="py-2 pr-4"><InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" /></td>
                  <td className="py-2 pr-4 text-blue-600 dark:text-blue-400">−e (negativ)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Nøytron</td>
                  <td className="py-2 pr-4"><InlineLatex latex="m_n = 1{,}675 \cdot 10^{-27}\;\text{kg}" /></td>
                  <td className="py-2 pr-4">0 (nøytral)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            <strong>Protoner og nøytroner</strong> er bygd opp av 3 kvarker.
            Atomer er normalt elektrisk nøytrale (like mange protoner og elektroner).
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Ioner</p>
            <p>Fjernes et elektron → <strong>positivt</strong> ladet ion.</p>
            <p>Tilføres et elektron → <strong>negativt</strong> ladet ion.</p>
          </div>

          <p className="mt-4">
            <strong>Bevaringsloven:</strong> I et lukket system er den totale mengden elektrisk ladning bevart.
            Ladning kan flyttes mellom objekter, men kan ikke skapes eller ødelegges.
          </p>
          <p className="mt-2">
            <strong>Kvantisering:</strong> Elektrisk ladning er kvantisert — den opptrer alltid som et
            heltallsmultiplum av elementærladningen <InlineLatex latex="e = 1{,}60 \cdot 10^{-19}\;\text{C}" />.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor fungerer det slik?</p>
            <p className="text-sm">
              Elektrisk ladning er en <strong>fundamental egenskap</strong> ved materie, akkurat som masse.
              Men mens masse bare kommer i én «type» (positiv), finnes ladning i to typer.
              Det er denne dualiteten som gjør elektrisitet så rik — den gir oss både tiltrekning og frastøtning,
              noe gravitasjonen aldri kan.
            </p>
            <p className="text-sm mt-2">
              <strong>Hvorfor er ladning bevart?</strong> Tenk på det slik: elektroner forsvinner ikke —
              de flytter seg fra ett sted til et annet. Når du gnir en ballong mot håret, river du ikke
              elektroner i stykker. Du dytter dem fra håret over til ballongen. Håret blir positivt, ballongen
              negativt — men totalen er uendret.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Tenk på ladning som penger i et lukket system. Du kan flytte penger fra lomme til lomme (ladningsoverføring),
              men du kan ikke trylle dem frem eller få dem til å forsvinne. Totalsummen er alltid den samme.
              Positive ladninger er som inntekter, negative som utgifter — de kan balansere hverandre,
              men ingen av dem forsvinner.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Protoner flyttes ved ladning»</strong> — Feil! I faste stoffer er det nesten alltid <em>elektronene</em> som beveger seg. Protoner sitter fast i atomkjernen.</li>
              <li>• <strong>«Et nøytralt objekt har ingen ladning»</strong> — Feil! Det har like mye positiv og negativ ladning. De kansellerer hverandres effekt utad.</li>
              <li>• <strong>«Ladning kan skapes»</strong> — Nei! Ladning er alltid bevart. Selv i partikkelreaksjoner (f.eks. par-produksjon) er total ladning null før og etter.</li>
            </ul>
          </div>
        </TheorySummary>

        {/* 21.3 Coulombs lov */}
        <TheorySummary
          title="21.3 Coulombs lov"
          mustKnow={[
            "Coulombs lov: F = k|q₁q₂|/r²",
            "Kraften virker langs linjen mellom ladningene",
            "Superposisjon: Resultantkraften er vektorsummen av alle kreftene",
            "Kunne bruke Coulombs lov med vektorkomponenter",
          ]}
        >
          <p>
            SI-enheten for elektrisk ladning er <strong>coulomb (C)</strong>.
            Elementærladningen er:
          </p>
          <div className="my-2">
            <InlineLatex latex="q_p = +e = 1{,}60 \cdot 10^{-19}\;\text{C}" /> (proton)
          </div>
          <div className="my-2">
            <InlineLatex latex="q_e = -e = -1{,}60 \cdot 10^{-19}\;\text{C}" /> (elektron)
          </div>

          <p className="mt-4">
            Den elektriske kraften mellom to punktladninger er gitt av <strong>Coulombs lov</strong>:
          </p>

          <FormulaBox
            latex="F_e = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}"
            title="Coulombs lov"
            variant="gold"
            description="Kraften mellom to punktladninger. Absoluttverdien gir størrelsen; retningen bestemmes av ladningenes fortegn."
          />

          <p className="mt-2">
            der <InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{C}^2/\text{Nm}^2" /> er
            vakuumpermittiviteten, og <InlineLatex latex="k = \frac{1}{4\pi\varepsilon_0} = 8{,}99 \cdot 10^9\;\text{Nm}^2/\text{C}^2" />.
          </p>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig om Coulombs lov</p>
            <ul className="space-y-1 text-sm">
              <li>• Kraften virker langs linjen mellom de to ladningene</li>
              <li>• Like ladninger → frastøtende kraft (bort fra hverandre)</li>
              <li>• Ulike ladninger → tiltrekkende kraft (mot hverandre)</li>
              <li>• Kraft er en vektor — har både størrelse og retning</li>
              <li>• Newtons 3. lov gjelder: Kraften på q₁ fra q₂ = −(kraften på q₂ fra q₁)</li>
            </ul>
          </div>

          <p className="mt-4">
            <strong>Superposisjonsprinsippet:</strong> Når flere enn to ladninger er involvert,
            er den totale kraften på en ladning <em>vektorsummen</em> av kreftene fra
            alle de andre ladningene:
          </p>
          <FormulaBox
            latex="\vec{F}_{\text{tot}} = \vec{F}_1 + \vec{F}_2 + \vec{F}_3 + \cdots"
            variant="blue"
            description="Superposisjon: Beregn kraften fra hver ladning separat, og adder vektorielt."
          />

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor 1/r² ?</p>
            <p className="text-sm">
              Coulombs lov har nøyaktig samme matematiske form som Newtons gravitasjonslov — begge faller av med <InlineLatex latex="1/r^2" />.
              Dette er ikke tilfeldig! Tenk deg at en ladning sender ut «påvirkningskraft» i alle retninger likt.
              Denne kraften fordeler seg over en kuleflate med areal <InlineLatex latex="4\pi r^2" />.
              Jo lenger bort du er, jo større er kuleflaten — og din andel av den totale påvirkningen
              synker som <InlineLatex latex="1/r^2" />.
            </p>
            <p className="text-sm mt-2">
              <strong>Fysisk bilde:</strong> Se for deg en lyspære i et mørkt rom. Lysintensiteten avtar med
              <InlineLatex latex="1/r^2" /> fordi lyset spres utover en stadig større kuleflate.
              Elektrisk kraft «spres» på nøyaktig samme måte.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Coulombs lov er «gravitasjonen for ladninger». Akkurat som to masser tiltrekker hverandre med
              <InlineLatex latex="F = Gm_1m_2/r^2" />, påvirker to ladninger hverandre med
              <InlineLatex latex="F = kq_1q_2/r^2" />.
              Den store forskjellen: gravitasjon kan <em>bare</em> tiltrekke, mens elektrisk kraft kan
              både tiltrekke og frastøte.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Absoluttverdien gjelder alltid»</strong> — I Coulombs lov bruker vi <InlineLatex latex="|q_1 q_2|" /> for å finne <em>størrelsen</em> på kraften. Retningen bestemmer vi <em>separat</em> ut fra fortegnene.</li>
              <li>• <strong>«Avstand r er alltid oppgitt i meter»</strong> — Sjekk enhetene! Oppgaver gir ofte avstand i cm eller mm. Husk å konvertere til meter.</li>
              <li>• <strong>«Superposisjon betyr å legge sammen tallverdiene»</strong> — Nei! Du må legge sammen <em>vektorielt</em>. Bryt kreftene i x- og y-komponenter, summer hver komponent, og finn resultanten.</li>
              <li>• <strong>«Kraften avtar lineært med avstand»</strong> — Nei, den avtar med <em>kvadratet</em> av avstanden. Dobler du avstanden, faller kraften til en fjerdedel.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips for Coulomb-oppgaver</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>Tegn alltid en figur</strong> med alle ladningene og avstandene markert</li>
              <li>• <strong>Velg koordinatsystem</strong> — plasser origo i ladningen du beregner kraften på</li>
              <li>• <strong>Beregn én kraft om gangen</strong> — finn størrelse med Coulombs lov, bestem retning ut fra fortegn</li>
              <li>• <strong>Dekomponér i x og y</strong> — bruk trigonometri: <InlineLatex latex="F_x = F\cos\theta,\; F_y = F\sin\theta" /></li>
              <li>• <strong>Summer komponentene</strong> — <InlineLatex latex="F_{\text{tot},x} = \Sigma F_x" /> og <InlineLatex latex="F_{\text{tot},y} = \Sigma F_y" /></li>
              <li>• <strong>Finn resultant</strong> — <InlineLatex latex="F = \sqrt{F_x^2 + F_y^2}" /> og <InlineLatex latex="\theta = \arctan(F_y/F_x)" /></li>
            </ul>
          </div>
        </TheorySummary>

        {/* 21.4 Elektrisk felt */}
        <TheorySummary
          title="21.4 Elektrisk felt og elektriske krefter"
          mustKnow={[
            "Definisjon av E-felt: E = F₀/q₀",
            "E-felt fra punktladning: E = kq/r²",
            "Retning: bort fra positiv, mot negativ ladning",
            "E-felt er uniformt mellom parallelle plater",
            "Kraft på ladning i E-felt: F = qE",
          ]}
        >
          <p>
            Et område hvor elektriske ladninger påvirkes av elektriske krefter kaller vi
            et <strong>elektrisk felt</strong>. Feltet eksisterer i rommet rundt en ladning, uavhengig av
            om det er andre ladninger til stede.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Definisjon</p>
            <p>
              <strong>Elektrisk feltstyrke</strong> i et punkt P er definert som kraften per ladningsenhet
              på en positiv testladning <InlineLatex latex="q_0" /> plassert i P:
            </p>
          </div>

          <FormulaBox
            latex="\vec{E} = \frac{\vec{F}_0}{q_0}"
            title="Definisjon av elektrisk felt"
            variant="gold"
            description="E-feltet har enhet N/C (eller V/m). Retningen er den retningen kraften virker på en positiv testladning."
          />

          <p className="mt-4">
            For en <strong>punktladning q</strong> i avstand r:
          </p>
          <FormulaBox
            latex="\vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2} \hat{r}"
            title="E-felt fra punktladning"
            variant="gold"
            description="r̂ er enhetsvektoren som peker bort fra ladningen q. For positiv q peker feltet bort; for negativ q peker feltet mot ladningen."
          />

          <p className="mt-4">
            <strong>Retning:</strong> Elektrisk feltstyrke har alltid samme retning som kraften
            på en <em>tenkt positiv</em> ladning:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Positiv kilde → E peker <strong>bort fra</strong> ladningen</li>
            <li>Negativ kilde → E peker <strong>mot</strong> ladningen</li>
          </ul>

          <p className="mt-4">
            <strong>Kraft på en ladning i et E-felt:</strong>
          </p>
          <FormulaBox
            latex="\vec{F}_e = q\vec{E}"
            variant="blue"
            description="Positiv ladning: kraften virker i feltretningen. Negativ ladning: kraften virker motsatt feltretningen."
          />

          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Uniformt felt (parallelle plater)</p>
            <p>
              Mellom to store parallelle plater med motsatt ladning er det elektriske feltet
              <strong> uniformt</strong> — det har samme verdi og retning overalt. Feltet peker fra positiv
              til negativ plate. Her kan vi bruke Newtons 2. lov med konstant akselerasjon:
            </p>
            <div className="mt-2">
              <InlineLatex latex="a = \frac{qE}{m}" />
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor trenger vi feltkonseptet?</p>
            <p className="text-sm">
              Du lurer kanskje: «Hvorfor ikke bare bruke Coulombs lov direkte?» Grunnen er at <strong>feltet
              eksisterer uavhengig av testladningen</strong>. Tenk på det slik: en ladning Q endrer rommet rundt seg —
              den skaper et «kraftfelt» overalt. Hvis du senere plasserer en ny ladning q i dette rommet,
              kjenner den kraften <InlineLatex latex="F = qE" /> øyeblikkelig.
            </p>
            <p className="text-sm mt-2">
              Feltideen er spesielt viktig når ting endrer seg over tid (elektromagnetiske bølger).
              Feltet kan bære energi og bevegelsesmengde — det er ikke bare et matematisk triks,
              det er en fysisk realitet.
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Tenk på E-feltet som <strong>vind</strong>. Vinden eksisterer uavhengig av om du holder opp et seil
              eller ikke. Men når du holder opp seilet, kjenner du kraften. Et større seil (større ladning)
              kjenner mer kraft, men selve vinden (feltet) er den samme. E-feltet er «vinden» som ladninger skaper
              i rommet rundt seg.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«E-feltet avhenger av testladningen»</strong> — Nei! <InlineLatex latex="E = F/q_0" />. Dobbler du <InlineLatex latex="q_0" />, dobbles også F, men E forblir den samme.</li>
              <li>• <strong>«E = 0 betyr ingen ladning i nærheten»</strong> — Feil! E kan være null der bidragene fra flere ladninger kansellerer hverandre.</li>
              <li>• <strong>«En negativ ladning i et E-felt beveger seg i feltretningen»</strong> — Nei! <InlineLatex latex="\vec{F} = q\vec{E}" />. Negativt q betyr at kraften peker <em>motsatt</em> av feltet.</li>
              <li>• <strong>«Feltlinjene viser banen til en partikkel»</strong> — Bare hvis partikkelen starter fra ro. En partikkel med startfart kan bevege seg på tvers av feltlinjene.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips for E-felt-oppgaver</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>Velg koordinatsystem</strong> — legg x-aksen langs symmetriaksen når du kan</li>
              <li>• <strong>Bruk superposisjon</strong> — finn E fra hver ladning separat, dekomponér, og summer</li>
              <li>• <strong>Sjekk retningen</strong> — E peker bort fra +, mot −. Tegn pilene!</li>
              <li>• <strong>Utnytt symmetri</strong> — hvis to ladninger er symmetrisk plassert, kanselleres ofte en komponent</li>
              <li>• <strong>Uniformt felt:</strong> Mellom parallelle plater er <InlineLatex latex="E = V/d" /> (konstant). Bruk kinematikk med <InlineLatex latex="a = qE/m" /></li>
            </ul>
          </div>
        </TheorySummary>

        {/* 21.6 Elektriske feltlinjer */}
        <TheorySummary
          title="21.6 Elektriske feltlinjer"
          mustKnow={[
            "Feltlinjer starter i positive og slutter i negative ladninger",
            "Feltlinjene krysser aldri hverandre",
            "Tettheten av feltlinjer viser feltets styrke",
            "E-feltet er tangent til feltlinjen i hvert punkt",
          ]}
        >
          <p>
            En elektrisk feltlinje er en tenkt kurve som er <strong>parallell til det
            elektriske feltet i alle punkter langs kurven</strong>. De gir oss et visuelt bilde
            av feltets retning og styrke.
          </p>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Regler for feltlinjer</p>
            <ul className="space-y-1.5 text-sm">
              <li>• Feltlinjene <strong>krysser aldri</strong> hverandre</li>
              <li>• Feltlinjene <strong>starter</strong> i positiv ladning og <strong>slutter</strong> i negativ ladning</li>
              <li>• <strong>Tettheten</strong> på feltlinjene viser feltets styrke — tettere linjer = sterkere felt</li>
              <li>• En ladet partikkel som slippes fra ro vil følge en bane som er en feltlinje</li>
            </ul>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor bruker vi feltlinjer?</p>
            <p className="text-sm">
              E-feltet er et <strong>vektorfelt</strong> — det har en verdi og retning i hvert eneste punkt i rommet.
              Det er umulig å tegne en pil i hvert punkt, så Michael Faraday innførte feltlinjer som en
              genial visuell forenkling. Linjene viser retning (følg pilene) og styrke (tetthet).
            </p>
            <p className="text-sm mt-2">
              <strong>Visuelt bilde:</strong> Se for deg at feltlinjene er som strømningslinjer i en elv.
              Vannet flyter fra høyt terreng (positiv ladning) til lavt terreng (negativ ladning).
              Der elven er smal, strømmer vannet raskt (sterkt felt). Der elven er bred, er strømmen roligere (svakt felt).
            </p>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
            <p className="text-sm">
              Feltlinjer er som <strong>vindkart</strong> i meteorologi. Linjene viser vindretningen,
              og der linjene ligger tett, blåser det hardt. Ingen vindlinjer krysser hverandre —
              vinden kan ikke blåse i to retninger samtidig i samme punkt. Nøyaktig det samme gjelder
              for elektriske feltlinjer.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>«Feltlinjer er fysiske strenger»</strong> — Nei! De er et visualiseringsverktøy. Det faktiske feltet er et kontinuerlig vektorfelt.</li>
              <li>• <strong>«Ladninger beveger seg langs feltlinjene»</strong> — Bare hvis de starter fra ro. En ladning med initiell fart kan krysse feltlinjer.</li>
              <li>• <strong>«Antall feltlinjer fra en ladning er fysisk bestemt»</strong> — Nei, antallet er vilkårlig. Men <em>forholdet</em> mellom antall linjer fra ulike ladninger reflekterer forholdet mellom ladningene.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Slik tegner du feltlinjer</p>
            <ul className="space-y-1.5 text-sm">
              <li>• <strong>Start</strong> i positive ladninger, <strong>slutt</strong> i negative</li>
              <li>• Tegn <strong>like mange linjer</strong> fra ladninger med lik størrelse</li>
              <li>• Linjene skal <strong>aldri krysse</strong> hverandre</li>
              <li>• Linjene står <strong>vinkelrett på overflaten</strong> til en leder</li>
              <li>• <strong>Tettere linjer = sterkere felt</strong></li>
              <li>• For en dipol: linjene kurver fra + til −, og er tettest mellom ladningene</li>
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
            latex="F_e = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}"
            title="Coulombs lov"
            variant="gold"
          />
          <FormulaBox
            latex="\vec{E} = \frac{\vec{F}_0}{q_0}"
            title="Definisjon av E-felt"
            variant="gold"
          />
          <FormulaBox
            latex="E = \frac{1}{4\pi\varepsilon_0} \frac{|q|}{r^2}"
            title="E-felt fra punktladning"
            variant="gold"
          />
          <FormulaBox
            latex="\vec{F}_e = q\vec{E}"
            title="Kraft på ladning i E-felt"
            variant="gold"
          />
          <FormulaBox
            latex="k = \frac{1}{4\pi\varepsilon_0} = 8{,}99 \cdot 10^9 \;\text{Nm}^2/\text{C}^2"
            title="Coulombs konstant"
            variant="blue"
          />
          <FormulaBox
            latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{C}^2/\text{Nm}^2"
            title="Vakuumpermittivitet"
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
                  <td className="py-2 pr-4">Kraften mellom to ladninger</td>
                  <td className="py-2 pr-4">Coulombs lov</td>
                  <td className="py-2">Bestem retning fra fortegn</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">E-felt fra en punktladning</td>
                  <td className="py-2 pr-4"><InlineLatex latex="E = kq/r^2" /></td>
                  <td className="py-2">Retning: bort fra +, mot −</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">E-felt fra flere ladninger</td>
                  <td className="py-2 pr-4">Superposisjon</td>
                  <td className="py-2">Beregn x- og y-komponent separat</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kraft på ladning i kjent felt</td>
                  <td className="py-2 pr-4"><InlineLatex latex="F = qE" /></td>
                  <td className="py-2">Akselerasjon: a = F/m</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Bevegelse i uniformt felt</td>
                  <td className="py-2 pr-4">Kinematikk + F = qE</td>
                  <td className="py-2">Samme som prosjektil-bevegelse!</td>
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
        <CoulombCalculator />
        <ElectricFieldVisualizer />
      </div>

      {/* ══════════════════════════════════════════════
          4. GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <div id="eksempler">
        <h2 className="text-2xl font-bold mt-12 mb-6">Gjennomgåtte eksempler</h2>

        {/* Eksempel 1: Coulombs lov */}
        <ExerciseCard
          number={1}
          title="Coulombs lov — to punktladninger"
          difficulty="lett"
          source="Forelesning"
          problem={
            <div>
              <p>
                To punktladninger <InlineLatex latex="q_1 = +25\;\text{nC}" /> og{" "}
                <InlineLatex latex="q_2 = -75\;\text{nC}" /> er plassert i en avstand{" "}
                <InlineLatex latex="r = 3{,}0\;\text{cm}" /> fra hverandre.
              </p>
              <p className="mt-2">Finn størrelsen på den elektriske kraften mellom dem.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Bruk Coulombs lov. Husk å konvertere nC til C og cm til m.</p>,
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  <InlineLatex latex="25\;\text{nC} = 25 \cdot 10^{-9}\;\text{C}" /> og{" "}
                  <InlineLatex latex="3{,}0\;\text{cm} = 0{,}030\;\text{m}" />
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Hva vet vi?</strong></p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="q_1 = +25\;\text{nC} = 25 \cdot 10^{-9}\;\text{C}" /></li>
                <li><InlineLatex latex="q_2 = -75\;\text{nC} = -75 \cdot 10^{-9}\;\text{C}" /></li>
                <li><InlineLatex latex="r = 3{,}0\;\text{cm} = 0{,}030\;\text{m}" /></li>
              </ul>

              <p><strong>Coulombs lov:</strong></p>
              <FormulaBox
                latex="F_e = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2} = 8{,}99 \cdot 10^9 \cdot \frac{|25 \cdot 10^{-9} \cdot (-75 \cdot 10^{-9})|}{(0{,}030)^2}"
                variant="blue"
              />
              <FormulaBox
                latex="F_e = 8{,}99 \cdot 10^9 \cdot \frac{1{,}875 \cdot 10^{-15}}{9{,}0 \cdot 10^{-4}} = \underline{\underline{0{,}0187\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Kraften er <strong>tiltrekkende</strong> fordi ladningene har motsatt fortegn.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Konverter alltid til SI-enheter (C og m) før du setter inn i formelen.</p>
            </div>
          }
        />

        {/* Eksempel 2: Tre ladninger (vektoraddisjon) */}
        <ExerciseCard
          number={2}
          title="Resultantkraft fra to ladninger (2D)"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                Tre ladninger er plassert som vist: <InlineLatex latex="q_1 = 2{,}0\;\mu\text{C}" /> i (0, 0,30 m),{" "}
                <InlineLatex latex="q_2 = 2{,}0\;\mu\text{C}" /> i (0, −0,30 m), og{" "}
                <InlineLatex latex="q_3 = 4{,}0\;\mu\text{C}" /> i (0,40 m, 0).
              </p>
              <p className="mt-2">
                Finn resultantkraften på <InlineLatex latex="q_3" /> fra de to andre ladningene.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: (
                <p>
                  Finn avstanden r fra q₁ (og q₂) til q₃ med Pytagoras.
                  Symmetrien i oppsettet forenkler beregningen.
                </p>
              ),
            },
            {
              label: "Hint 2",
              content: (
                <div>
                  <p><InlineLatex latex="r = \sqrt{0{,}3^2 + 0{,}4^2} = 0{,}5\;\text{m}" /></p>
                  <p>Vinkelen: <InlineLatex latex="\theta = \tan^{-1}(0{,}3/0{,}4) = 36{,}9°" /></p>
                </div>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1: Finn avstanden</strong></p>
              <FormulaBox latex="r = \sqrt{0{,}3^2 + 0{,}4^2} = 0{,}5\;\text{m}" variant="blue" />
              <FormulaBox latex="\theta = \tan^{-1}\!\left(\frac{0{,}3}{0{,}4}\right) = 36{,}9°" variant="blue" />

              <p><strong>Steg 2: Beregn kreftene</strong></p>
              <FormulaBox
                latex="F_1 = F_2 = \frac{1}{4\pi\varepsilon_0}\frac{|q_1 q_3|}{r^2} = 8{,}99\cdot10^9 \cdot \frac{2{,}0\cdot10^{-6}\cdot 4{,}0\cdot10^{-6}}{0{,}5^2} = 0{,}29\;\text{N}"
                variant="blue"
              />

              <p><strong>Steg 3: Dekomponér og summér</strong></p>
              <p className="text-sm">
                Begge kreftene har lik x-komponent (peker i positiv x-retning), men
                y-komponentene er like store og motsatte (symmetri!):
              </p>
              <FormulaBox
                latex="\sum F_x = F_1\cos 36{,}9° + F_2\cos 36{,}9° = 2 \cdot 0{,}29 \cdot 0{,}8 = \underline{\underline{0{,}46\;\text{N}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\sum F_y = -F_1\sin 36{,}9° + F_2\sin 36{,}9° = \underline{\underline{0}}"
                variant="gold"
              />
              <p className="text-sm">
                Resultantkraften er <InlineLatex latex="F = 0{,}46\;\text{N}" /> i positiv x-retning.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Bruk symmetri for å forenkle! Når to ladninger er symmetrisk plassert, kansellerer y-komponentene ofte hverandre.</p>
            </div>
          }
        />

        {/* Eksempel 3: E-felt fra punktladning */}
        <ExerciseCard
          number={3}
          title="E-felt fra punktladning i et punkt"
          difficulty="middels"
          source="Forelesning"
          problem={
            <div>
              <p>
                En ladning <InlineLatex latex="q = -8{,}0\;\text{nC}" /> er plassert i origo.
                Finn det elektriske feltet i punktet P = (1,2 m, −1,6 m).
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Finn avstanden r fra ladningen til P med Pytagoras. Finn deretter enhetsvektoren r̂.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1: Avstand</strong></p>
              <FormulaBox latex="r = \sqrt{1{,}6^2 + 1{,}2^2} = 2{,}0\;\text{m}" variant="blue" />

              <p><strong>Steg 2: Enhetsvektor</strong></p>
              <FormulaBox latex="\hat{r} = \frac{\vec{r}}{r} = \frac{1{,}6\,\hat{\imath} - 1{,}2\,\hat{\jmath}}{2} = 0{,}8\,\hat{\imath} - 0{,}6\,\hat{\jmath}" variant="blue" />

              <p><strong>Steg 3: E-felt (husk at q er negativ!)</strong></p>
              <FormulaBox
                latex="\vec{E} = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}\hat{r} = 8{,}99\cdot10^9 \cdot \frac{-8{,}0\cdot10^{-9}}{(2{,}0)^2} \cdot (0{,}8\,\hat{\imath} - 0{,}6\,\hat{\jmath})"
                variant="blue"
              />
              <FormulaBox
                latex="\vec{E} = \underline{\underline{(-11\,\hat{\imath} + 14\,\hat{\jmath})\;\text{N/C}}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Feltet peker <strong>mot</strong> den negative ladningen, som forventet.
                Negativt fortegn på q snur retningen på r̂.
              </p>
              <p className="mt-2"><strong>Hva lærte vi?</strong> Når q er negativ, snu ikke r̂ manuelt — la fortegnet i formelen ta seg av retningen automatisk.</p>
            </div>
          }
        />

        {/* Eksempel 4: Elektron i uniformt felt */}
        <ExerciseCard
          number={4}
          title="Elektron mellom parallelle plater"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                Mellom to store parallelle plater er det et uniformt elektrisk felt{" "}
                <InlineLatex latex="E = 1{,}0 \cdot 10^4\;\text{N/C}" /> rettet oppover.
                Platene har avstand 1,0 cm. Et elektron{" "}
                (<InlineLatex latex="q = -e = -1{,}60 \cdot 10^{-19}\;\text{C}" />,{" "}
                <InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" />):
              </p>
              <p className="mt-2">a) Finn kraften på elektronet.</p>
              <p>b) Finn farten etter 1,0 cm fall (fra ro).</p>
              <p>c) Finn tiden det tar.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Kraften: F = qE. Husk at elektronet har negativ ladning, så kraften er motsatt feltretningen (nedover).</p>,
            },
            {
              label: "Hint 2",
              content: <p>Akselerasjonen er konstant, så bruk kinematikkformlene: v² = v₀² + 2a·Δy og v = v₀ + at.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Kraft på elektronet</strong></p>
              <FormulaBox
                latex="F_e = qE = (-1{,}60\cdot10^{-19})(1{,}0\cdot10^4) = \underline{\underline{-1{,}6\cdot10^{-15}\;\text{N}}}"
                variant="gold"
              />
              <p className="text-sm">Negativt fortegn betyr kraften er nedover (motsatt E).</p>

              <p><strong>Akselerasjon:</strong></p>
              <FormulaBox
                latex="a_y = \frac{F_e}{m_e} = \frac{-1{,}6\cdot10^{-15}}{9{,}11\cdot10^{-31}} = -1{,}76\cdot10^{15}\;\text{m/s}^2"
                variant="blue"
              />

              <p><strong>b) Fart etter 1,0 cm</strong></p>
              <FormulaBox
                latex="v^2 = v_0^2 + 2a\Delta y = 2 \cdot 1{,}76\cdot10^{15} \cdot 0{,}01"
                variant="blue"
              />
              <FormulaBox
                latex="v = \sqrt{2a\Delta y} = \underline{\underline{5{,}93 \cdot 10^6\;\text{m/s}}}"
                variant="gold"
              />

              <p><strong>c) Tid</strong></p>
              <FormulaBox
                latex="t = \frac{v}{a} = \frac{5{,}93\cdot10^6}{1{,}76\cdot10^{15}} = \underline{\underline{3{,}37 \cdot 10^{-9}\;\text{s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Elektroner i uniformt felt oppfører seg som en ball i tyngdefelt — bruk kinematikkformlene du kan fra kap. 2!</p>
            </div>
          }
        />

        {/* Eksempel 5: Elektron skutt inn mellom plater */}
        <ExerciseCard
          number={5}
          title="Elektron skutt horisontalt mellom plater"
          difficulty="vanskelig"
          source="Forelesning"
          problem={
            <div>
              <p>
                Et elektron skytes inn horisontalt med fart{" "}
                <InlineLatex latex="v_0 = 1{,}0 \cdot 10^7\;\text{m/s}" /> mellom to
                parallelle plater. Feltet er{" "}
                <InlineLatex latex="E = 1{,}0 \cdot 10^4\;\text{N/C}" /> rettet nedover.
                Platenes lengde er <InlineLatex latex="x = 2{,}0\;\text{cm}" />.
              </p>
              <p className="mt-2">
                Finn avbøyningen (y) og den vertikale hastigheten (v_y) idet elektronet
                forlater platene.
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Tenk prosjektilbevegelse: ax = 0 (konstant horisontal fart), ay = konstant (fra E-feltet). Finn først tiden elektronet bruker mellom platene.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Steg 1:</strong> Akselerasjon og kinematikk:</p>
              <FormulaBox latex="a_y = -1{,}76\cdot10^{15}\;\text{m/s}^2, \quad a_x = 0" variant="blue" />

              <p><strong>Steg 2:</strong> Tid mellom platene:</p>
              <FormulaBox
                latex="t = \frac{x}{v_0} = \frac{0{,}020}{1{,}0\cdot10^7} = 2{,}0\cdot10^{-9}\;\text{s}"
                variant="blue"
              />

              <p><strong>Steg 3:</strong> Vertikal avbøyning:</p>
              <FormulaBox
                latex="y = \tfrac{1}{2}a_y t^2 = \tfrac{1}{2}(-1{,}76\cdot10^{15})(2{,}0\cdot10^{-9})^2 = \underline{\underline{-3{,}52\;\text{mm}}}"
                variant="gold"
              />

              <p><strong>Steg 4:</strong> Vertikal hastighet:</p>
              <FormulaBox
                latex="v_y = a_y t = (-1{,}76\cdot10^{15})(2{,}0\cdot10^{-9}) = \underline{\underline{-3{,}52\cdot10^6\;\text{m/s}}}"
                variant="gold"
              />
              <p className="mt-2"><strong>Hva lærte vi?</strong> Denne oppgaven er identisk med prosjektilbevegelse fra kap. 3. x-retning: konstant fart. y-retning: konstant akselerasjon fra E-feltet.</p>
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
            <h3 className="font-semibold text-lg mb-3">Strategi: Coulombs lov-oppgaver</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Tegn figur med alle ladninger og avstander</li>
              <li>Konverter alle enheter til SI (C, m)</li>
              <li>Beregn størrelsen av kraften med <InlineLatex latex="F = k|q_1q_2|/r^2" /></li>
              <li>Bestem retningen: like ladninger → frastøtning, ulike → tiltrekning</li>
              <li>For flere ladninger: beregn kraft fra hver separat, dekomponér i x og y, og summér</li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: E-felt-oppgaver</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Identifiser kildeladning(ene) og punktet der du skal finne feltet</li>
              <li>Finn avstand r fra hver kildeladning til punktet</li>
              <li>Beregn <InlineLatex latex="E = k|q|/r^2" /> for hver kildeladning</li>
              <li>Finn retningen: bort fra positive, mot negative ladninger</li>
              <li>Dekomponér i x- og y-komponenter og summér</li>
              <li>Finn total størrelse: <InlineLatex latex="E = \sqrt{E_x^2 + E_y^2}" /></li>
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h3 className="font-semibold text-lg mb-3">Strategi: Ladning i uniformt felt</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Finn kraften: <InlineLatex latex="F = qE" /> (husk fortegn på q!)</li>
              <li>Finn akselerasjonen: <InlineLatex latex="a = F/m" /></li>
              <li>Bruk kinematikkformlene for konstant akselerasjon</li>
              <li>For 2D-bevegelse: behandle x og y separat (som prosjektilbevegelse)</li>
            </ol>
          </div>

          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige feil</h4>
            <ul className="space-y-1.5 text-sm">
              <li>• Glemmer å konvertere µC → C, nC → C, cm → m</li>
              <li>• Blander størrelse og retning — bruk absoluttverdien i Coulombs lov</li>
              <li>• Glemmer at E-felt er en vektor — man kan ikke bare addere størrelsene</li>
              <li>• Bruker feil fortegn for elektronets ladning</li>
              <li>• Glemmer at kraften på negativ ladning er <em>motsatt</em> E-feltretningen</li>
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
          title="Kraft mellom elektron og proton"
          difficulty="lett"
          source="Oblig 3, oppg. 2d"
          problem={
            <div>
              <p>
                Beregn den elektriske kraften mellom et elektron og et proton med
                innbyrdes avstand <InlineLatex latex="0{,}529 \cdot 10^{-9}\;\text{m}" /> (Bohrs radius).
                Hvilken akselerasjon vil elektronet få når det påvirkes av denne kraften?
              </p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Begge har ladning med størrelse e. Bruk Coulombs lov for kraften, og Newtons 2. lov for akselerasjonen.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>Kraft:</strong></p>
              <FormulaBox
                latex="F = \frac{1}{4\pi\varepsilon_0}\frac{e^2}{r^2} = 8{,}99\cdot10^9 \cdot \frac{(1{,}60\cdot10^{-19})^2}{(0{,}529\cdot10^{-9})^2} = \underline{\underline{8{,}23 \cdot 10^{-8}\;\text{N}}}"
                variant="gold"
              />
              <p><strong>Akselerasjon på elektronet:</strong></p>
              <FormulaBox
                latex="a = \frac{F}{m_e} = \frac{8{,}23\cdot10^{-8}}{9{,}11\cdot10^{-31}} = \underline{\underline{9{,}03 \cdot 10^{22}\;\text{m/s}^2}}"
                variant="gold"
              />
              <p className="text-sm text-[var(--muted)]">
                Enorm akselerasjon! Men elektronet har også svært liten masse.
              </p>
            </div>
          }
        />

        <ExerciseCard
          number={2}
          title="Uniformt felt mellom parallelle plater"
          difficulty="middels"
          source="Oblig 3, oppg. 2a-b"
          problem={
            <div>
              <p>
                To plane, parallelle metallskiver er plassert i innbyrdes avstand{" "}
                <InlineLatex latex="d = 0{,}050\;\text{m}" />. Platene er koplet til en spenningskilde på 500 V.
              </p>
              <p className="mt-2">a) Forklar hva vi mener med et uniformt elektrisk felt. Hva blir den elektriske feltstyrken mellom platene?</p>
              <p>b) Et elektron slippes fra ro ved den negative plata. Hvilken fart har elektronet når det treffer den positive plata? Hvor lang tid bruker det?</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Uniformt felt: E = V/d. Bruk dette for å finne feltstyrken.</p>,
            },
            {
              label: "Hint 2",
              content: <p>For del b: Finn akselerasjonen a = eE/m, bruk deretter kinematikk med v₀ = 0.</p>,
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Uniformt felt</strong> betyr at feltet har <em>samme størrelse og retning overalt</em> mellom platene.</p>
              <FormulaBox
                latex="E = \frac{V}{d} = \frac{500}{0{,}050} = \underline{\underline{1{,}0 \cdot 10^4\;\text{V/m}}}"
                variant="gold"
              />

              <p><strong>b) Fart og tid</strong></p>
              <FormulaBox latex="a = \frac{eE}{m_e} = \frac{1{,}60\cdot10^{-19}\cdot 1{,}0\cdot10^4}{9{,}11\cdot10^{-31}} = 1{,}76\cdot10^{15}\;\text{m/s}^2" variant="blue" />
              <FormulaBox latex="v = \sqrt{2ad} = \sqrt{2 \cdot 1{,}76\cdot10^{15}\cdot 0{,}050} = \underline{\underline{1{,}33 \cdot 10^7\;\text{m/s}}}" variant="gold" />
              <FormulaBox latex="t = \frac{v}{a} = \frac{1{,}33\cdot10^7}{1{,}76\cdot10^{15}} = \underline{\underline{7{,}55 \cdot 10^{-9}\;\text{s}}}" variant="gold" />
            </div>
          }
        />

        <ExerciseCard
          number={3}
          title="E-felt fra punktladninger"
          difficulty="middels"
          problem={
            <div>
              <p>
                To punktladninger er plassert langs x-aksen:{" "}
                <InlineLatex latex="q_1 = +4{,}0\;\mu\text{C}" /> i x = 0 og{" "}
                <InlineLatex latex="q_2 = -6{,}0\;\mu\text{C}" /> i x = 0,30 m.
              </p>
              <p className="mt-2">Finn det elektriske feltet i punktet x = 0,15 m (midt mellom ladningene).</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: <p>Finn E fra hver ladning separat i midtpunktet. Bestem retningen for hvert bidrag. Avstand fra begge = 0,15 m.</p>,
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  E fra positiv ladning peker <em>bort</em> (i +x-retning). E fra negativ ladning peker{" "}
                  <em>mot</em> ladningen (også i +x-retning). De peker altså <strong>samme vei</strong>!
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>E fra q₁ i midtpunktet:</strong></p>
              <FormulaBox
                latex="E_1 = k\frac{|q_1|}{r^2} = 8{,}99\cdot10^9 \cdot \frac{4{,}0\cdot10^{-6}}{0{,}15^2} = 1{,}60 \cdot 10^6\;\text{N/C} \quad (\text{i }+x)"
                variant="blue"
              />
              <p><strong>E fra q₂ i midtpunktet:</strong></p>
              <FormulaBox
                latex="E_2 = k\frac{|q_2|}{r^2} = 8{,}99\cdot10^9 \cdot \frac{6{,}0\cdot10^{-6}}{0{,}15^2} = 2{,}40 \cdot 10^6\;\text{N/C} \quad (\text{i }+x)"
                variant="blue"
              />
              <p className="text-sm">Begge feltbidrag peker i +x-retning (bort fra q₁, mot q₂):</p>
              <FormulaBox
                latex="E_{\text{tot}} = E_1 + E_2 = \underline{\underline{4{,}0 \cdot 10^6\;\text{N/C i }+x\text{-retning}}}"
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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips</h4>
          <p className="text-sm">
            E&M-oppgaver på eksamen følger typisk et mønster: du får oppgitt ladninger med posisjoner,
            og skal finne kraft, E-felt, eller potensial. Tegn ALLTID en figur med koordinatsystem,
            og marker alle ladninger, avstander og vinkler. Husk enhetskonvertering!
          </p>
        </div>

        <ExerciseCard
          number={1}
          title="Tre punktladninger — potensial og E-felt"
          difficulty="vanskelig"
          source="Eksamen ELE100 H2016"
          problem={
            <div>
              <p>
                Tre elektriske ladninger er plassert i xy-planet:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li><InlineLatex latex="q_1 = 2\;\mu\text{C}" /> i punktet (−3, 0)</li>
                <li><InlineLatex latex="q_2 = -3\;\mu\text{C}" /> i punktet (2, 0)</li>
                <li><InlineLatex latex="q_3 = 1{,}5\;\mu\text{C}" /> i punktet (0, 4)</li>
              </ul>
              <p className="mt-2 text-sm">Alle koordinater i meter.</p>
              <p className="mt-2">a) Regn ut det elektriske potensialet i origo.</p>
              <p>b) Finn verdi og retning på den elektriske feltstyrken i origo.</p>
            </div>
          }
          hints={[
            {
              label: "Hint 1",
              content: (
                <p>
                  a) Potensialet er en skalar — bare summer bidragene uten å tenke på retning.
                  V = k(q₁/r₁ + q₂/r₂ + q₃/r₃).
                </p>
              ),
            },
            {
              label: "Hint 2",
              content: (
                <p>
                  b) E-feltet er en vektor. Finn E fra hver ladning, dekomponér i x og y,
                  og summer. Husk: q₁ er på x-aksen (bare x-komponent), q₂ er på x-aksen,
                  q₃ er på y-aksen (bare y-komponent).
                </p>
              ),
            },
          ]}
          solution={
            <div className="space-y-3">
              <p><strong>a) Potensial i origo</strong></p>
              <p className="text-sm">Avstander: r₁ = 3 m, r₂ = 2 m, r₃ = 4 m</p>
              <FormulaBox
                latex="V = \frac{1}{4\pi\varepsilon_0}\left(\frac{q_1}{r_1} + \frac{q_2}{r_2} + \frac{q_3}{r_3}\right)"
                variant="blue"
              />
              <FormulaBox
                latex="V = 8{,}99\cdot10^9\left(\frac{2\cdot10^{-6}}{3} + \frac{-3\cdot10^{-6}}{2} + \frac{1{,}5\cdot10^{-6}}{4}\right) = \underline{\underline{-4{,}1\;\text{kV}}}"
                variant="gold"
              />

              <p><strong>b) E-felt i origo</strong></p>
              <p className="text-sm">
                q₁ er til venstre for origo → E₁ peker i −x (bort fra positiv ladning).
                q₂ er til høyre → E₂ peker i +x (mot negativ ladning).
                q₃ er over → E₃ peker i −y (bort fra positiv ladning? Nei, mot positiv ladning fra origo sin side betyr bort = oppover, men vi vil ha feltet i origo, altså retning fra origo mot q₃ er +y, men feltet fra positiv ladning peker bort = -y).
              </p>
              <p className="text-sm mt-2">
                E₁ peker i +x-retning (fra q₁ mot origo, bort fra positiv ladning).
                E₂ peker i +x-retning (fra origo mot q₂, mot negativ ladning).
              </p>
              <FormulaBox
                latex="E_x = k\frac{|q_1|}{r_1^2} + k\frac{|q_2|}{r_2^2} = 8{,}99\cdot10^9\left(\frac{2\cdot10^{-6}}{9} + \frac{3\cdot10^{-6}}{4}\right) = \underline{8{,}74\;\text{kV/m}}"
                variant="blue"
              />
              <FormulaBox
                latex="E_y = -k\frac{|q_3|}{r_3^2} = -8{,}99\cdot10^9\cdot\frac{1{,}5\cdot10^{-6}}{16} = \underline{-0{,}843\;\text{kV/m}}"
                variant="blue"
              />
              <FormulaBox
                latex="E = \sqrt{E_x^2 + E_y^2} = \sqrt{8{,}74^2 + 0{,}843^2} = \underline{\underline{8{,}78\;\text{kV/m}}}"
                variant="gold"
              />
              <FormulaBox
                latex="\theta = \tan^{-1}\!\left(\frac{|E_y|}{E_x}\right) = \tan^{-1}(0{,}096) = \underline{\underline{5{,}5°}}\;\text{under }x\text{-aksen}"
                variant="gold"
              />
            </div>
          }
        />
      </div>
    </ChapterLayout>
  );
}
