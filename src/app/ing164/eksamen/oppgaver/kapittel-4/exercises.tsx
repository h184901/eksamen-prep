"use client";

import React from "react";
import InlineLatex from "@/components/InlineLatex";
import FormulaBox from "@/components/FormulaBox";

export interface ExerciseContent {
  title: string;
  difficulty: "lett" | "middels" | "vanskelig";
  pageRef: string;
  problem: React.ReactNode;
  knowns: React.ReactNode;
  unknowns: React.ReactNode;
  strategy: React.ReactNode;
  hints: { label: string; content: React.ReactNode }[];
  solution: React.ReactNode;
  alternativeSolution?: React.ReactNode;
  summary: React.ReactNode;
}

// ============================================================================
// Gjenbrukbare pedagogiske blokker
// ============================================================================

function TheoryBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-300 mb-1">
        Teori: {title}
      </p>
      <div className="text-sm text-indigo-900 dark:text-indigo-100">{children}</div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="font-semibold text-sm">
        <span className="inline-block w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold leading-6 text-center mr-2">
          {n}
        </span>
        {title}
      </p>
      <div className="mt-2 ml-8 text-sm space-y-2">{children}</div>
    </div>
  );
}

// ============================================================================
// SVG-helpere
// ============================================================================

function Arrowheads() {
  return (
    <defs>
      <marker id="arrow-red-k4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 4
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 4.1 — Vinkel mellom to krefter
  // ==========================================================================
  "4.1": {
    title: "Vinkel mellom to krefter som gir bestemt resultant",
    difficulty: "lett",
    pageRef: "s. 130",
    problem: (
      <p>
        To krefter har størrelser 6,00 N og 8,00 N. Hvilken vinkel mellom dem gir
        en resultantkraft med størrelse 10,0 N?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F_1=6{,}00\;\text{N},\;F_2=8{,}00\;\text{N}" /></li>
        <li><InlineLatex latex="|\vec F_1+\vec F_2|=10{,}0\;\text{N}" /></li>
      </ul>
    ),
    unknowns: <p>Vinkelen <InlineLatex latex="\theta" /> mellom <InlineLatex latex="\vec F_1" /> og <InlineLatex latex="\vec F_2" />.</p>,
    strategy: (
      <TheoryBox title="Loven om cosinus for vektorsum">
        <p>
          Størrelsen av resultanten er
          {" "}<InlineLatex latex="|\vec F_1+\vec F_2|^2=F_1^2+F_2^2+2F_1F_2\cos\theta" />.
          Legg merke til pluss-tegnet foran <InlineLatex latex="\cos\theta" />: når
          vektorene peker i samme retning (<InlineLatex latex="\theta=0" />) blir resultanten maksimal,
          og når de er antiparallelle (<InlineLatex latex="\theta=180^\circ" />) blir den minimum.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="10^2=6^2+8^2+\ldots" /> — legg merke til at 6,8,10 er pytagoreisk.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Sett opp likning">
          <FormulaBox latex="10{,}0^2=6{,}00^2+8{,}00^2+2\cdot 6{,}00\cdot 8{,}00\cos\theta" />
          <FormulaBox latex="100=36+64+96\cos\theta\;\Rightarrow\;96\cos\theta=0" />
        </Step>
        <Step n={2} title="Løs for vinkelen">
          <FormulaBox variant="gold" latex="\cos\theta=0\;\Rightarrow\;\boxed{\;\theta=90^\circ\;}" />
          <p className="italic text-[var(--muted)]">
            Kreftene står vinkelrett på hverandre — og danner en 6-8-10-triangel.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Krefter adderes som vektorer. Når resultantens kvadrat er lik summen av komponentenes
        kvadrater, står vektorene vinkelrett på hverandre.
      </p>
    ),
  },

  // ==========================================================================
  // 4.2 — Komponenter og størrelse av vektorsum
  // ==========================================================================
  "4.2": {
    title: "Vektorsum: komponenter og størrelse",
    difficulty: "lett",
    pageRef: "s. 130",
    problem: (
      <p>
        To krefter virker i samme punkt: <InlineLatex latex="\vec F_1=9{,}00\;\text{N}" /> i 60° nord for øst,
        og <InlineLatex latex="\vec F_2=6{,}00\;\text{N}" /> i 53° nord for vest. Finn (a) x- og y-komponenter
        av resultanten, (b) størrelsen av resultanten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F_1=9{,}00\;\text{N},\;\theta_1=60^\circ" /> (nord for øst)</li>
        <li><InlineLatex latex="F_2=6{,}00\;\text{N},\;\theta_2=53^\circ" /> (nord for vest, altså 180° − 53°)</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="R_x,R_y,|\vec R|" /></p>,
    strategy: (
      <TheoryBox title="Dekomponer hver vektor, så legg sammen komponentene">
        <p>
          Legg øst langs +x, nord langs +y. Vektorer adderes komponentvis:
          <InlineLatex latex="\;R_x=\sum F_{ix},\;R_y=\sum F_{iy}" />.
          Så <InlineLatex latex="|\vec R|=\sqrt{R_x^2+R_y^2}" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="F_2" /> peker mot vest: x-komponenten blir negativ.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Komponenter">
          <FormulaBox latex="F_{1x}=9{,}00\cos 60^\circ=4{,}50\;\text{N},\;F_{1y}=9{,}00\sin 60^\circ\approx 7{,}79\;\text{N}" />
          <FormulaBox latex="F_{2x}=-6{,}00\cos 53^\circ\approx -3{,}61\;\text{N},\;F_{2y}=6{,}00\sin 53^\circ\approx 4{,}79\;\text{N}" />
        </Step>
        <Step n={2} title="Sum">
          <FormulaBox latex="R_x=4{,}50-3{,}61=0{,}89\;\text{N},\;R_y=7{,}79+4{,}79=12{,}58\;\text{N}" />
        </Step>
        <Step n={3} title="Størrelse">
          <FormulaBox variant="gold" latex="|\vec R|=\sqrt{0{,}89^2+12{,}58^2}\approx 12{,}6\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Vektoraddisjon blir mekanisk når vi først dekomponerer. Vær nøye med fortegn basert
        på himmelretningen.
      </p>
    ),
  },

  // ==========================================================================
  // 4.4 — Gressklipper
  // ==========================================================================
  "4.4": {
    title: "Kraftkomponenter på gressklipper",
    difficulty: "lett",
    pageRef: "s. 131",
    problem: (
      <div className="space-y-2">
        <p>
          En arbeider skyver en gressklipper med en kraft på 80,0 N langs et håndtak som
          danner 36° med horisontalen. Finn (a) horisontal og (b) vertikal komponent av kraften.
        </p>
        <svg viewBox="0 0 240 120" className="w-full max-w-xs mx-auto">
          <Arrowheads />
          <line x1="20" y1="100" x2="220" y2="100" stroke="#374151" strokeWidth="2" />
          <circle cx="160" cy="95" r="10" fill="#6b7280" />
          <circle cx="190" cy="95" r="10" fill="#6b7280" />
          <rect x="140" y="60" width="70" height="35" fill="#10b981" />
          <line x1="140" y1="70" x2="80" y2="110" stroke="#374151" strokeWidth="3" />
          <line x1="80" y1="110" x2="50" y2="130" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-k4)" />
          <text x="40" y="145" fontSize="11" fill="#ef4444">F = 80 N</text>
          <path d="M 100 100 A 15 15 0 0 0 90 110" fill="none" stroke="#6b7280" strokeWidth="1" />
          <text x="115" y="108" fontSize="10" fill="#6b7280">36°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F=80{,}0\;\text{N}" /></li>
        <li>Vinkel 36° under horisontalen (kraften peker nedover og forover)</li>
      </ul>
    ),
    unknowns: <p>Horisontal <InlineLatex latex="F_x" /> og vertikal <InlineLatex latex="F_y" />.</p>,
    strategy: (
      <TheoryBox title="Når du skyver nedover, har du også en nedadrettet komponent">
        <p>
          Legg +x langs bevegelsesretningen, +y oppover. Da er <InlineLatex latex="F_x=F\cos\theta" /> (positiv, forover)
          og <InlineLatex latex="F_y=-F\sin\theta" /> (negativ, nedover).
          Denne nedadrettede komponenten øker normalkraften — ikke bra for grasset.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>cos 36° ≈ 0,809, sin 36° ≈ 0,588.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Horisontal komponent">
          <FormulaBox latex="F_x=80{,}0\cos 36^\circ\approx 64{,}7\;\text{N (forover)}" />
        </Step>
        <Step n={2} title="Vertikal komponent">
          <FormulaBox variant="gold" latex="F_y=-80{,}0\sin 36^\circ\approx -47{,}0\;\text{N (nedover)}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Vinklede skyvekrefter har alltid en komponent vinkelrett på bevegelsen. Å dra oppover
        er lettere for bakken — du avlaster normalkraften — mens å skyve nedover øker friksjonen.
      </p>
    ),
  },

  // ==========================================================================
  // 4.5 — Drakamp
  // ==========================================================================
  "4.5": {
    title: "Tre tau som drar på en ring",
    difficulty: "middels",
    pageRef: "s. 131",
    problem: (
      <p>
        Tre horisontale tau er festet til en liten ring. To tau drar med kraft <InlineLatex latex="F_1=100\;\text{N}" /> langs
        +x-aksen og <InlineLatex latex="F_2=80\;\text{N}" /> i retning 120° fra +x (dvs. 30° over -x). Hva må størrelse og
        retning til den tredje kraften <InlineLatex latex="F_3" /> være for at ringen skal være i likevekt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F_1=100\;\text{N}" /> langs +x</li>
        <li><InlineLatex latex="F_2=80\;\text{N}" /> ved 120°</li>
        <li>Likevekt: <InlineLatex latex="\sum \vec F=0" /></li>
      </ul>
    ),
    unknowns: <p>Størrelse og retning til <InlineLatex latex="\vec F_3" />.</p>,
    strategy: (
      <TheoryBox title="Likevekt i to dimensjoner">
        <p>
          For likevekt må begge komponenter av kreftene summere til null:
          <InlineLatex latex="\;\sum F_x=0,\;\sum F_y=0" />.
          Den tredje kraften må motvirke summen av de to første.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Dekomponer <InlineLatex latex="F_2" />: <InlineLatex latex="F_{2x}=80\cos 120^\circ=-40\;\text{N}" />, <InlineLatex latex="F_{2y}=80\sin 120^\circ\approx 69{,}3\;\text{N}" />.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="\vec F_3=-(\vec F_1+\vec F_2)" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Sum av F1 og F2">
          <FormulaBox latex="R_x=100+(-40)=60\;\text{N},\;R_y=0+69{,}3=69{,}3\;\text{N}" />
        </Step>
        <Step n={2} title="F3 motvirker summen">
          <FormulaBox latex="F_{3x}=-60\;\text{N},\;F_{3y}=-69{,}3\;\text{N}" />
          <FormulaBox latex="|\vec F_3|=\sqrt{60^2+69{,}3^2}\approx 91{,}6\;\text{N}" />
          <FormulaBox variant="gold" latex="\theta=\arctan\!\left(\dfrac{-69{,}3}{-60}\right)=180^\circ+49{,}1^\circ\approx 229^\circ" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        For likevekt må den manglende kraften alltid være «minus»-summen av de andre.
        Begge komponenter negative betyr 3. kvadrant — vinkelen ligger mellom 180° og 270°.
      </p>
    ),
  },

  // ==========================================================================
  // 4.6 — F = ma grunnleggende
  // ==========================================================================
  "4.6": {
    title: "Akselerasjon av elektron",
    difficulty: "lett",
    pageRef: "s. 135",
    problem: (
      <p>
        Et elektron (masse <InlineLatex latex="9{,}11\times 10^{-31}\;\text{kg}" />) slippes fra hvile mellom
        to ladede plater og akselereres med en kraft på <InlineLatex latex="1{,}60\times 10^{-15}\;\text{N}" />.
        Finn akselerasjonen og farten etter <InlineLatex latex="5{,}00\times 10^{-9}\;\text{s}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=9{,}11\times 10^{-31}\;\text{kg}" /></li>
        <li><InlineLatex latex="F=1{,}60\times 10^{-15}\;\text{N}" /></li>
        <li><InlineLatex latex="t=5{,}00\times 10^{-9}\;\text{s}" />, startfart 0</li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" /> og sluttfart <InlineLatex latex="v" />.</p>,
    strategy: (
      <TheoryBox title="Newton 2: F = ma">
        <p>
          Newtons andre lov: kraftsum delt på masse gir akselerasjon. Når akselerasjonen er
          konstant, blir farten <InlineLatex latex="v=at" /> (fra hvile).
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Resultatet blir stort — elektroner er ekstremt lette.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{F}{m}=\dfrac{1{,}60\times 10^{-15}}{9{,}11\times 10^{-31}}\approx 1{,}76\times 10^{15}\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Sluttfart">
          <FormulaBox variant="gold" latex="v=at=(1{,}76\times 10^{15})(5{,}00\times 10^{-9})\approx 8{,}78\times 10^{6}\;\text{m/s}" />
          <p className="italic text-[var(--muted)]">Omtrent 3 % av lysets hastighet på bare 5 ns.</p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Newton 2 forklarer hvorfor akseleratorer bruker små ladede partikler: liten masse
        gir enorm akselerasjon fra selv moderate krefter.
      </p>
    ),
  },

  // ==========================================================================
  // 4.7 — Horisontal kraftsum
  // ==========================================================================
  "4.7": {
    title: "Puck med to motstående krefter",
    difficulty: "lett",
    pageRef: "s. 135",
    problem: (
      <p>
        En ishockeypuck (masse 0,160 kg) på friksjonsfri is har to horisontale krefter som
        virker på seg: 5,00 N mot høyre og 3,00 N mot venstre. Finn akselerasjonen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=0{,}160\;\text{kg}" /></li>
        <li><InlineLatex latex="F_1=5{,}00\;\text{N}\;(+x)" />, <InlineLatex latex="F_2=3{,}00\;\text{N}\;(-x)" /></li>
      </ul>
    ),
    unknowns: <p>Akselerasjonen <InlineLatex latex="a" />.</p>,
    strategy: (
      <TheoryBox title="Bare nettkraften betyr noe">
        <p>
          Det er <em>summen</em> av krefter som gir akselerasjon. Motstående krefter
          kanselleres delvis. Her: <InlineLatex latex="F_\text{net}=5{,}00-3{,}00=2{,}00\;\text{N}" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Regn først netto kraft langs x.</p> }],
    solution: (
      <div>
        <Step n={1} title="Nettkraft">
          <FormulaBox latex="F_\text{net}=5{,}00-3{,}00=2{,}00\;\text{N}\;(+x)" />
        </Step>
        <Step n={2} title="Akselerasjon">
          <FormulaBox variant="gold" latex="a=\dfrac{F_\text{net}}{m}=\dfrac{2{,}00}{0{,}160}=12{,}5\;\text{m/s}^2\;(+x)" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Newton 2 gjelder nettkraften — ikke den enkelte kraften. Parallelle krefter
        adderes algebraisk med fortegn fra retning.
      </p>
    ),
  },

  // ==========================================================================
  // 4.9 — Kasse på is
  // ==========================================================================
  "4.9": {
    title: "Kasse dras over friksjonsfri is",
    difficulty: "lett",
    pageRef: "s. 136",
    problem: (
      <p>
        En kasse på 25 kg står på horisontal, friksjonsfri is. Et horisontalt tau drar med en
        konstant kraft og kassa får fart 5,00 m/s på 2,00 s (fra hvile). Hvor stor er taukraften?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=25\;\text{kg}" />, friksjonsfri</li>
        <li>Fra hvile til <InlineLatex latex="v=5{,}00\;\text{m/s}" /> på <InlineLatex latex="t=2{,}00\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Taukraft <InlineLatex latex="T" />.</p>,
    strategy: (
      <TheoryBox title="Finn a først, så F = ma">
        <p>
          Konstant akselerasjon fra kinematikk:
          <InlineLatex latex="\;a=\dfrac{v-v_0}{t}" />. Uten friksjon er det kun taukraften
          som virker horisontalt.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p><InlineLatex latex="a=(5-0)/2=2{,}5\;\text{m/s}^2" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{5{,}00}{2{,}00}=2{,}50\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Taukraft">
          <FormulaBox variant="gold" latex="T=ma=25\cdot 2{,}50=62{,}5\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Når kun én horisontal kraft virker, <em>er</em> den nettkraften. Bruk kinematikk for å finne a,
        deretter Newton 2 for kraften.
      </p>
    ),
  },

  // ==========================================================================
  // 4.10 — Bil som bremser
  // ==========================================================================
  "4.10": {
    title: "Kraft som stopper bil",
    difficulty: "lett",
    pageRef: "s. 136",
    problem: (
      <p>
        En bil på 1200 kg kjører med 25,0 m/s og bremser til stans på 60,0 m med konstant retardasjon.
        Hva er størrelsen på bremsekraften?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1200\;\text{kg}" />, <InlineLatex latex="v_0=25{,}0\;\text{m/s}" />, <InlineLatex latex="v=0" /></li>
        <li><InlineLatex latex="\Delta x=60{,}0\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Bremsekraft <InlineLatex latex="F" />.</p>,
    strategy: (
      <TheoryBox title="Kombinér kinematikk og F = ma">
        <p>
          Bruk <InlineLatex latex="v^2=v_0^2+2a\Delta x" /> (uten tid) for å finne akselerasjonen,
          og så <InlineLatex latex="F=ma" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p><InlineLatex latex="0=25^2+2a(60)" /> gir <InlineLatex latex="a=-625/120\approx -5{,}21\;\text{m/s}^2" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{v^2-v_0^2}{2\Delta x}=\dfrac{0-625}{120}\approx -5{,}21\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Kraft">
          <FormulaBox variant="gold" latex="|F|=m|a|=1200\cdot 5{,}21\approx 6250\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Retardasjon er bare akselerasjon med motsatt fortegn av farten. Newton 2 gir kraften,
        og tegnet forteller retningen — mot bevegelsen.
      </p>
    ),
  },

  // ==========================================================================
  // 4.12 — To krefter på masse
  // ==========================================================================
  "4.12": {
    title: "To krefter i vinkel",
    difficulty: "middels",
    pageRef: "s. 137",
    problem: (
      <p>
        En 4,00 kg partikkel utsettes for to krefter: <InlineLatex latex="\vec F_1=(2{,}00\hat i+4{,}00\hat j)\;\text{N}" /> og
        <InlineLatex latex="\vec F_2=(5{,}00\hat i-1{,}00\hat j)\;\text{N}" />. Finn akselerasjonens komponenter, størrelse og retning.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=4{,}00\;\text{kg}" /></li>
        <li><InlineLatex latex="\vec F_1,\vec F_2" /> gitt i komponentform</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="\vec a" /> med komponenter, størrelse og retning.</p>,
    strategy: (
      <TheoryBox title="Komponentform av Newton 2">
        <p>
          <InlineLatex latex="\vec a=\dfrac{\sum\vec F}{m}" /> — gjelder komponentvis.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Kraftsum">
          <FormulaBox latex="\sum\vec F=(7{,}00\hat i+3{,}00\hat j)\;\text{N}" />
        </Step>
        <Step n={2} title="Akselerasjon">
          <FormulaBox latex="\vec a=(1{,}75\hat i+0{,}75\hat j)\;\text{m/s}^2" />
          <FormulaBox latex="|\vec a|=\sqrt{1{,}75^2+0{,}75^2}\approx 1{,}90\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="\theta=\arctan(0{,}75/1{,}75)\approx 23{,}2^\circ\text{ over }+x" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        I 2D/3D er Newton 2 en vektorlikning: komponentene er uavhengige, og akselerasjonen
        peker i samme retning som <em>nettkraften</em>, ikke nødvendigvis som hastigheten.
      </p>
    ),
  },

  // ==========================================================================
  // 4.16 — Masse og vekt
  // ==========================================================================
  "4.16": {
    title: "Vekt på jorda og månen",
    difficulty: "lett",
    pageRef: "s. 140",
    problem: (
      <p>
        En astronaut veier 750 N på jorda. (a) Hva er massen? (b) Hva er vekten på månen, der
        <InlineLatex latex="g_m=1{,}62\;\text{m/s}^2" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="w_j=750\;\text{N}" />, <InlineLatex latex="g_j=9{,}80\;\text{m/s}^2" /></li>
        <li><InlineLatex latex="g_m=1{,}62\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Masse <InlineLatex latex="m" /> og månevekt <InlineLatex latex="w_m" />.</p>,
    strategy: (
      <TheoryBox title="Masse er invariant — vekt er ikke">
        <p>
          Massen er en egenskap ved legemet og er konstant. Vekt er kraften fra tyngdefeltet:
          <InlineLatex latex="\;w=mg" />. Bytt <InlineLatex latex="g" /> så bytter vekten.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="(a) Masse">
          <FormulaBox latex="m=\dfrac{w_j}{g_j}=\dfrac{750}{9{,}80}\approx 76{,}5\;\text{kg}" />
        </Step>
        <Step n={2} title="(b) Månevekt">
          <FormulaBox variant="gold" latex="w_m=m\,g_m=76{,}5\cdot 1{,}62\approx 124\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Masse og vekt er to forskjellige ting! Bruk <InlineLatex latex="m=w/g" /> på jorda,
        så multipliser med ny <InlineLatex latex="g" />.
      </p>
    ),
  },

  // ==========================================================================
  // 4.17 — Heis
  // ==========================================================================
  "4.17": {
    title: "Tilsynelatende vekt i heis",
    difficulty: "middels",
    pageRef: "s. 141",
    problem: (
      <p>
        En person med masse 68,0 kg står på en vekt i en heis. Hva viser vekten (i newton) når
        heisen (a) står stille, (b) akselererer 2,00 m/s² oppover, (c) akselererer 2,00 m/s² nedover,
        (d) er i fritt fall?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=68{,}0\;\text{kg}" />, <InlineLatex latex="g=9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Normalkraft <InlineLatex latex="N" /> i hvert tilfelle.</p>,
    strategy: (
      <TheoryBox title="Normalkraft + tyngde = m·a">
        <p>
          Frilegeme: normalkraft opp, tyngde ned. Newton 2 langs vertikal:
          <InlineLatex latex="\;N-mg=ma\Rightarrow N=m(g+a)" />,
          der <InlineLatex latex="a" /> er positiv oppover.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Vekten viser normalkraften — ikke ekte vekt! I fritt fall: <InlineLatex latex="a=-g" /> gir <InlineLatex latex="N=0" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Hvile">
          <FormulaBox latex="N=m\,g=68{,}0\cdot 9{,}80\approx 666\;\text{N}" />
        </Step>
        <Step n={2} title="(b) 2 m/s² oppover">
          <FormulaBox latex="N=68{,}0(9{,}80+2{,}00)\approx 802\;\text{N}" />
        </Step>
        <Step n={3} title="(c) 2 m/s² nedover">
          <FormulaBox latex="N=68{,}0(9{,}80-2{,}00)\approx 530\;\text{N}" />
        </Step>
        <Step n={4} title="(d) Fritt fall">
          <FormulaBox variant="gold" latex="N=68{,}0(9{,}80-9{,}80)=0\;\text{N (vektløshet)}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        «Tilsynelatende vekt» = normalkraften. Oppover akselerasjon → tyngre,
        nedover → lettere, fritt fall → vektløs. Ekte vekt (<InlineLatex latex="mg" />) endrer seg ikke.
      </p>
    ),
  },

  // ==========================================================================
  // 4.19 — Vekt på annen planet
  // ==========================================================================
  "4.19": {
    title: "Hopp på en annen planet",
    difficulty: "lett",
    pageRef: "s. 141",
    problem: (
      <p>
        På en planet <em>X</em> hopper en astronaut (m = 85 kg) med farten 4,0 m/s oppover og når en høyde
        av 3,5 m over bakken. Finn <InlineLatex latex="g_X" /> og astronautens vekt på planet X.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=85\;\text{kg}" />, <InlineLatex latex="v_0=4{,}0\;\text{m/s}" />, <InlineLatex latex="h=3{,}5\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="g_X" /> og vekt <InlineLatex latex="w_X" />.</p>,
    strategy: (
      <TheoryBox title="Kinematikk avslører g">
        <p>
          Fritt fall: <InlineLatex latex="v^2=v_0^2-2g h" />. På toppen av hoppet er <InlineLatex latex="v=0" />,
          så <InlineLatex latex="g=v_0^2/(2h)" />.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Beregn g_X">
          <FormulaBox latex="g_X=\dfrac{v_0^2}{2h}=\dfrac{16{,}0}{7{,}0}\approx 2{,}29\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Vekt">
          <FormulaBox variant="gold" latex="w_X=m\,g_X=85\cdot 2{,}29\approx 194\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Kinematikk gir oss lokal <InlineLatex latex="g" /> direkte — vi trenger ikke kjenne planetens masse.
        Liten <InlineLatex latex="g" /> betyr høyere hopp med samme utgangsfart.
      </p>
    ),
  },

  // ==========================================================================
  // 4.21 — Tredje lov: skøyteløpere
  // ==========================================================================
  "4.21": {
    title: "Newton 3: skøyteløpere dytter hverandre",
    difficulty: "middels",
    pageRef: "s. 143",
    problem: (
      <p>
        To skøyteløpere står stille på friksjonsfri is ansikt til ansikt. <em>A</em> har masse 65,0 kg
        og <em>B</em> har masse 55,0 kg. De skyver hverandre så hardt at A får en akselerasjon på
        <InlineLatex latex="\;1{,}50\;\text{m/s}^2" />. Hva blir akselerasjonen til B?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m_A=65{,}0\;\text{kg},\;m_B=55{,}0\;\text{kg}" /></li>
        <li><InlineLatex latex="a_A=1{,}50\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Akselerasjonen til B, <InlineLatex latex="a_B" />.</p>,
    strategy: (
      <TheoryBox title="Aksjon = reaksjon">
        <p>
          Kraften A utøver på B er like stor (og motsatt rettet) som kraften B utøver på A
          (Newton 3). Så <InlineLatex latex="m_A a_A=m_B a_B" /> i størrelse — men akselerasjonene er
          forskjellige fordi massene er det.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Lettere skøyteløper får større akselerasjon.</p> }],
    solution: (
      <div>
        <Step n={1} title="Kraft og symmetri">
          <FormulaBox latex="|F|=m_A a_A=65{,}0\cdot 1{,}50=97{,}5\;\text{N}" />
        </Step>
        <Step n={2} title="Akselerasjon av B">
          <FormulaBox variant="gold" latex="a_B=\dfrac{|F|}{m_B}=\dfrac{97{,}5}{55{,}0}\approx 1{,}77\;\text{m/s}^2" />
          <p className="italic text-[var(--muted)]">Motsatt retning av <InlineLatex latex="a_A" />.</p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Like krefter, ulike masser gir ulike akselerasjoner. Newton 3 handler om
        <em>kreftene</em>, ikke om akselerasjonene.
      </p>
    ),
  },

  // ==========================================================================
  // 4.23 — Newton 3 og eple
  // ==========================================================================
  "4.23": {
    title: "Jorden og eplet",
    difficulty: "lett",
    pageRef: "s. 143",
    problem: (
      <p>
        Et eple (0,10 kg) faller fra et tre. (a) Hvor stor er kraften jorda trekker eplet med?
        (b) Hvor stor er kraften eplet trekker jorda med? (c) Hvor stor er jordas akselerasjon?
        (Jordmasse <InlineLatex latex="M=5{,}97\times 10^{24}\;\text{kg}" />.)
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=0{,}10\;\text{kg},\;g=9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Kraft på eple, kraft på jord, jordas akselerasjon.</p>,
    strategy: (
      <TheoryBox title="Aksjon = reaksjon (identisk størrelse)">
        <p>
          Tyngdekraften på eplet er <InlineLatex latex="mg" />. Etter Newton 3 drar eplet like mye på jorda —
          bare jordas enorme masse gjør akselerasjonen neglisjerbar.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Kraften på eplet">
          <FormulaBox latex="F=m g=0{,}10\cdot 9{,}80=0{,}98\;\text{N}" />
        </Step>
        <Step n={2} title="Newton 3: like stor på jorda">
          <FormulaBox latex="F_\text{jord}=0{,}98\;\text{N (oppover mot eplet)}" />
        </Step>
        <Step n={3} title="Jordas akselerasjon">
          <FormulaBox variant="gold" latex="a_\text{jord}=\dfrac{0{,}98}{5{,}97\times 10^{24}}\approx 1{,}64\times 10^{-25}\;\text{m/s}^2" />
          <p className="italic text-[var(--muted)]">Totalt umerkelig.</p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Newton 3 er ofte kontraintuitiv: selv om kreftene er like store, er akselerasjonene
        svært ulike når massene er dramatisk forskjellige.
      </p>
    ),
  },

  // ==========================================================================
  // 4.25 — Tau mellom to kasser
  // ==========================================================================
  "4.25": {
    title: "To kasser koblet med tau",
    difficulty: "middels",
    pageRef: "s. 144",
    problem: (
      <p>
        En 10,0 kg kasse A er koblet til en 5,00 kg kasse B med et lett tau. Vi drar i A med
        konstant kraft 30,0 N horisontalt (friksjonsfritt). Finn systemets akselerasjon og
        spenningen i tauet mellom dem.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m_A=10{,}0\;\text{kg},\;m_B=5{,}00\;\text{kg}" /></li>
        <li><InlineLatex latex="F=30{,}0\;\text{N}" /></li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" /> og tauspenning <InlineLatex latex="T" />.</p>,
    strategy: (
      <TheoryBox title="Felles akselerasjon i sammenkoblede systemer">
        <p>
          Siden tauet er ustrekkbart har A og B samme akselerasjon. Analyser <em>systemet</em> som
          helhet for å finne <InlineLatex latex="a" />, og deretter en av kassene alene for
          å finne tauspenningen.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>System: <InlineLatex latex="F=(m_A+m_B)a" />.</p> },
      { label: "Hint 2", content: <p>Kun på B: <InlineLatex latex="T=m_B a" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Systemanalyse">
          <FormulaBox latex="a=\dfrac{F}{m_A+m_B}=\dfrac{30{,}0}{15{,}0}=2{,}00\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Frilegeme av B alene">
          <FormulaBox variant="gold" latex="T=m_B\,a=5{,}00\cdot 2{,}00=10{,}0\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Strategisk valg av system forenkler: velg system som eliminerer ukjente indre krefter.
        Så bruker du frilegeme på én del for å finne indre krefter som tauspenning.
      </p>
    ),
  },

  // ==========================================================================
  // 4.26 — FBD for kasse på skråplan
  // ==========================================================================
  "4.26": {
    title: "Frilegemediagram: kasse på skråplan",
    difficulty: "lett",
    pageRef: "s. 146",
    problem: (
      <div className="space-y-2">
        <p>
          En kasse hviler på et friksjonsløst skråplan med vinkel 30°. Tegn frilegemediagram og
          finn akselerasjonen hvis den slippes fra ro.
        </p>
        <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto">
          <Arrowheads />
          <polygon points="30,120 210,120 210,60" fill="#e5e7eb" stroke="#374151" />
          <rect x="140" y="70" width="30" height="20" transform="rotate(-20.6 155 80)" fill="#3b82f6" stroke="#1e40af" />
          <line x1="155" y1="85" x2="155" y2="125" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k4)" />
          <text x="160" y="118" fontSize="10" fill="#ef4444">mg</text>
          <line x1="155" y1="85" x2="135" y2="73" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k4)" />
          <text x="120" y="70" fontSize="10" fill="#10b981">N</text>
          <text x="180" y="115" fontSize="10" fill="#374151">θ = 30°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vinkel <InlineLatex latex="\theta=30^\circ" />, friksjonsfri</li>
      </ul>
    ),
    unknowns: <p>Akselerasjon langs skråplanet.</p>,
    strategy: (
      <TheoryBox title="Roter koordinatsystem langs skråplanet">
        <p>
          Dekomponer tyngdekraften: langs skråplanet <InlineLatex latex="mg\sin\theta" />,
          vinkelrett <InlineLatex latex="mg\cos\theta" />. Normalkraft balanserer kun den vinkelrette komponenten.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Resultatet er uavhengig av massen.</p> }],
    solution: (
      <div>
        <Step n={1} title="Komponent langs skråplan">
          <FormulaBox latex="m a=m g\sin\theta" />
        </Step>
        <Step n={2} title="Akselerasjon">
          <FormulaBox variant="gold" latex="a=g\sin 30^\circ=9{,}80\cdot 0{,}500=4{,}90\;\text{m/s}^2" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        På skråplan: roter akser slik at én akse ligger langs planet. Da har vi kun
        <em>én</em> ikke-trivial komponent av Newton 2 å løse.
      </p>
    ),
  },

  // ==========================================================================
  // 4.27 — FBD for lampe i tak
  // ==========================================================================
  "4.27": {
    title: "Frilegemediagram: hengende lampe",
    difficulty: "lett",
    pageRef: "s. 146",
    problem: (
      <p>
        En 2,0 kg lampe henger i to tau festet til taket med symmetrisk vinkel 30° fra vertikalen.
        Finn spenningen i hvert tau.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}0\;\text{kg}" />, <InlineLatex latex="g=9{,}80\;\text{m/s}^2" /></li>
        <li>Hver tau i 30° fra vertikal</li>
      </ul>
    ),
    unknowns: <p>Taukraften <InlineLatex latex="T" /> i hvert tau.</p>,
    strategy: (
      <TheoryBox title="Likevekt i 2D">
        <p>
          Lampen er i likevekt. Symmetri gir at begge tauene har samme spenning. Vertikal:
          <InlineLatex latex="\;2T\cos 30^\circ=mg" />. Horisontal: komponentene kanselleres automatisk.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Vertikal likevekt">
          <FormulaBox latex="2T\cos 30^\circ=mg\Rightarrow T=\dfrac{mg}{2\cos 30^\circ}" />
        </Step>
        <Step n={2} title="Tall">
          <FormulaBox variant="gold" latex="T=\dfrac{2{,}0\cdot 9{,}80}{2\cdot 0{,}866}\approx 11{,}3\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Når tau henger symmetrisk har begge samme spenning. Legg merke til: jo mindre vinkel
        mellom tauene, jo lavere spenning. Med stor vinkel (nær horisontal) vokser spenningen fort.
      </p>
    ),
  },

  // ==========================================================================
  // 4.30 — FBD for fallskjermhopper
  // ==========================================================================
  "4.30": {
    title: "Fallskjermhopper ved terminalfart",
    difficulty: "middels",
    pageRef: "s. 147",
    problem: (
      <p>
        En fallskjermhopper (75 kg) har nådd terminalfart — konstant fart i luften. Tegn
        frilegemediagram og finn luftmotstanden.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=75\;\text{kg}" /></li>
        <li>Konstant fart ⇒ <InlineLatex latex="a=0" /></li>
      </ul>
    ),
    unknowns: <p>Luftmotstand <InlineLatex latex="D" />.</p>,
    strategy: (
      <TheoryBox title="Konstant fart = krefter balanseres">
        <p>
          Terminalfart oppnås når luftmotstanden vokser til den er like stor som tyngden.
          Da er nettkraft null og akselerasjon null (men farten er høy!).
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Likevekt">
          <FormulaBox latex="D-mg=0\Rightarrow D=mg" />
        </Step>
        <Step n={2} title="Tall">
          <FormulaBox variant="gold" latex="D=75\cdot 9{,}80\approx 735\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Konstant fart ≠ null kraft per definisjon — det betyr null <em>netto</em> kraft.
        Her balanserer luftmotstanden tyngden.
      </p>
    ),
  },

  // ==========================================================================
  // 4.32 — Kasse med skrå kraft
  // ==========================================================================
  "4.32": {
    title: "Kasse dras med tau i vinkel",
    difficulty: "middels",
    pageRef: "s. 148",
    problem: (
      <p>
        En 20,0 kg kasse dras på friksjonsfritt horisontalt gulv med et tau som danner 37° med horisontalen.
        Tauspenning er 80,0 N. Finn (a) akselerasjonen og (b) normalkraften fra gulvet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=20{,}0\;\text{kg},\;T=80{,}0\;\text{N},\;\theta=37^\circ" /></li>
        <li>Friksjonsfritt</li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" /> og normalkraft <InlineLatex latex="N" />.</p>,
    strategy: (
      <TheoryBox title="Den vertikale komponenten løfter kassa">
        <p>
          Tauet har horisontal komponent <InlineLatex latex="T\cos\theta" /> (som akselererer) og
          vertikal komponent <InlineLatex latex="T\sin\theta" /> (oppover) som avlaster normalkraften.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>cos 37° ≈ 0,799, sin 37° ≈ 0,602.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Akselerasjon">
          <FormulaBox latex="a=\dfrac{T\cos\theta}{m}=\dfrac{80\cdot 0{,}799}{20{,}0}\approx 3{,}19\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(b) Normalkraft">
          <FormulaBox latex="N=mg-T\sin\theta=20{,}0\cdot 9{,}80-80\cdot 0{,}602" />
          <FormulaBox variant="gold" latex="N\approx 196-48{,}2\approx 148\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Når du drar oppover og fremover letter du effektivt kassa — det reduserer normalkraften
        og (om det var friksjon) også friksjonen.
      </p>
    ),
  },

  // ==========================================================================
  // 4.33 — Ball kastet oppover
  // ==========================================================================
  "4.33": {
    title: "Gjennomsnittskraft fra hånd til ball",
    difficulty: "middels",
    pageRef: "s. 149",
    problem: (
      <p>
        En ball med masse 0,400 kg akselereres fra hvile til 12,0 m/s oppover mens kastehånden beveger
        seg 0,600 m oppover. Finn gjennomsnittskraften hånda utøver på ballen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=0{,}400\;\text{kg}" />, startfart 0, <InlineLatex latex="v=12{,}0\;\text{m/s}" /></li>
        <li>Akselerasjonsstrekning <InlineLatex latex="\Delta y=0{,}600\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Gjennomsnittskraft <InlineLatex latex="F" /> fra hånd.</p>,
    strategy: (
      <TheoryBox title="Finn akselerasjon, så nettkraft, så håndens kraft">
        <p>
          Bruk <InlineLatex latex="v^2=v_0^2+2a\Delta y" /> for å finne gjennomsnittsakselerasjonen.
          Vertikale krefter: hånda skyver opp, tyngden drar ned. Nettkraft = ma.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{v^2}{2\Delta y}=\dfrac{144}{1{,}20}=120\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Nettkraft og håndkraft">
          <FormulaBox latex="F_\text{hånd}-mg=m a\Rightarrow F_\text{hånd}=m(a+g)" />
          <FormulaBox variant="gold" latex="F_\text{hånd}=0{,}400(120+9{,}80)\approx 51{,}9\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        For å akselerere et objekt oppover må hånda både overvinne tyngden <em>og</em> gi ballen dens
        akselerasjon. Derfor <InlineLatex latex="F=m(a+g)" />, ikke bare <InlineLatex latex="ma" />.
      </p>
    ),
  },

  // ==========================================================================
  // 4.35 — To klosser koblet via snor
  // ==========================================================================
  "4.35": {
    title: "Atwood-maskin (to klosser, snor over trinse)",
    difficulty: "middels",
    pageRef: "s. 149",
    problem: (
      <p>
        To klosser med masser <InlineLatex latex="m_1=3{,}00\;\text{kg}" /> og <InlineLatex latex="m_2=5{,}00\;\text{kg}" />
        henger vertikalt i en lett snor over en friksjonsfri trinse. Finn akselerasjon og snordraget.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m_1=3{,}00\;\text{kg},\;m_2=5{,}00\;\text{kg}" /></li>
        <li>Lett snor, friksjonsfri trinse</li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" /> og snordrag <InlineLatex latex="T" />.</p>,
    strategy: (
      <TheoryBox title="Atwood-maskin: to Newton 2-likninger">
        <p>
          Velg positiv retning slik at tyngste kloss går nedover. For <InlineLatex latex="m_2" />:
          <InlineLatex latex="\;m_2 g-T=m_2 a" />. For <InlineLatex latex="m_1" />: <InlineLatex latex="T-m_1 g=m_1 a" />.
          Legg sammen: <InlineLatex latex="\;a=\dfrac{(m_2-m_1)g}{m_1+m_2}" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Etter å ha funnet a: bruk én av likningene for T.</p> }],
    solution: (
      <div>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{(5{,}00-3{,}00)\cdot 9{,}80}{8{,}00}=\dfrac{19{,}6}{8{,}00}=2{,}45\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Snordrag">
          <FormulaBox latex="T=m_1(g+a)=3{,}00(9{,}80+2{,}45)\approx 36{,}75\;\text{N}" />
          <FormulaBox variant="gold" latex="\boxed{\;a\approx 2{,}45\;\text{m/s}^2,\;T\approx 36{,}8\;\text{N}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Atwood-maskinen er klassisk: to Newton 2-likninger, én felles ukjent (a), én felles tau­kraft.
        Akselerasjonen er alltid mindre enn <InlineLatex latex="g" /> så lenge begge masser er positive.
      </p>
    ),
  },

  // ==========================================================================
  // 4.49 — Akselerometer
  // ==========================================================================
  "4.49": {
    title: "Pendel som akselerometer",
    difficulty: "middels",
    pageRef: "s. 150",
    problem: (
      <p>
        En liten pendel henger i taket i en bil. Når bilen akselererer framover, står snora
        10° fra vertikalen (pendelen henger bakover). Finn bilens akselerasjon.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vinkel <InlineLatex latex="\theta=10^\circ" /> fra vertikal</li>
      </ul>
    ),
    unknowns: <p>Bilens akselerasjon <InlineLatex latex="a" />.</p>,
    strategy: (
      <TheoryBox title="Snora må gi horisontal nettkraft">
        <p>
          I bilens referansesystem: pendelen har samme akselerasjon som bilen. Snorens horisontale
          komponent gir denne akselerasjonen, vertikal komponent balanserer tyngden. Forhold:
          <InlineLatex latex="\;\tan\theta=a/g" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>tan 10° ≈ 0,176.</p> }],
    solution: (
      <div>
        <Step n={1} title="Geometri gir a/g">
          <FormulaBox latex="\tan\theta=\dfrac{T\sin\theta}{T\cos\theta}=\dfrac{ma}{mg}=\dfrac{a}{g}" />
        </Step>
        <Step n={2} title="Tall">
          <FormulaBox variant="gold" latex="a=g\tan 10^\circ=9{,}80\cdot 0{,}176\approx 1{,}73\;\text{m/s}^2" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        En hengende pendel er et enkelt akselerometer: vinkelen fra vertikal korrelerer direkte med
        akselerasjonen. tan θ = a/g er formelen du alltid kan utlede fra FBD.
      </p>
    ),
  },

  // ==========================================================================
  // 4.52 — Sammensatt kloss-kraft
  // ==========================================================================
  "4.52": {
    title: "Tre klosser koblet med snor",
    difficulty: "vanskelig",
    pageRef: "s. 151",
    problem: (
      <p>
        Tre klosser <InlineLatex latex="m_1=2{,}0,\;m_2=3{,}0,\;m_3=4{,}0\;\text{kg}" /> står på en friksjonsfri
        horisontal flate og er koblet med lette snorer. Vi drar kloss 3 til høyre med
        en kraft 36,0 N. Finn akselerasjonen til systemet og spenningene i snorene 1-2 og 2-3.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m_1=2{,}0,\;m_2=3{,}0,\;m_3=4{,}0\;\text{kg}" /></li>
        <li><InlineLatex latex="F=36{,}0\;\text{N}" /></li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" />, <InlineLatex latex="T_{12}" />, <InlineLatex latex="T_{23}" />.</p>,
    strategy: (
      <TheoryBox title="System først, så del opp">
        <p>
          Hele systemet: <InlineLatex latex="a=F/\sum m" />. Så frilegeme på <em>del</em> av systemet:
          kloss 1 alene gir <InlineLatex latex="T_{12}" />, klosser 1+2 sammen gir <InlineLatex latex="T_{23}" />.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{36{,}0}{9{,}0}=4{,}00\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Spenning mellom 1 og 2">
          <FormulaBox latex="T_{12}=m_1 a=2{,}0\cdot 4{,}00=8{,}00\;\text{N}" />
        </Step>
        <Step n={3} title="Spenning mellom 2 og 3">
          <FormulaBox variant="gold" latex="T_{23}=(m_1+m_2)\,a=5{,}0\cdot 4{,}00=20{,}0\;\text{N}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Spenningene øker når du går fra fjerneste kloss mot kraftens angrepspunkt, fordi snora
        må akselerere mer masse. Sjekk: <InlineLatex latex="T_{23}+m_3 a=20+16=36=F" /> ✓.
      </p>
    ),
  },

  // ==========================================================================
  // 4.56 — Challenge
  // ==========================================================================
  "4.56": {
    title: "Kraft med variabel retning",
    difficulty: "vanskelig",
    pageRef: "s. 152",
    problem: (
      <p>
        En 5,00 kg kloss på friksjonsfritt horisontalt gulv dras med tau som danner en vinkel
        <InlineLatex latex="\theta" /> med horisontalen. Tauspenningen er 40,0 N. For hvilken vinkel <InlineLatex latex="\theta" /> blir
        klossens horisontale akselerasjon maksimal, og hva er denne akselerasjonen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=5{,}00\;\text{kg},\;T=40{,}0\;\text{N}" /></li>
        <li>Friksjonsfritt</li>
      </ul>
    ),
    unknowns: <p>Optimal vinkel <InlineLatex latex="\theta" /> og maks akselerasjon.</p>,
    strategy: (
      <TheoryBox title="Uten friksjon er det bare den horisontale komponenten som teller">
        <p>
          <InlineLatex latex="a=T\cos\theta/m" />. Maksimeres når <InlineLatex latex="\cos\theta" /> er størst,
          altså <InlineLatex latex="\theta=0" />.
          Sammenlign med friksjonstilfellet: da er det en optimal vinkel mellom 0° og 90°.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Ingen friksjon ⇒ vertikal komponent hjelper <em>ikke</em>. Dra horisontalt!</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Horisontal akselerasjon">
          <FormulaBox latex="a(\theta)=\dfrac{T\cos\theta}{m}" />
        </Step>
        <Step n={2} title="Maksimeres ved θ = 0">
          <FormulaBox variant="gold" latex="a_{\max}=\dfrac{40{,}0}{5{,}00}=8{,}00\;\text{m/s}^2\;\text{ved }\theta=0" />
          <p className="italic text-[var(--muted)]">
            Hadde det vært friksjon <InlineLatex latex="\mu" />, ville optimum vært <InlineLatex latex="\tan\theta=\mu" />.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Uten friksjon er horisontalt drag alltid best. Med friksjon finnes det en optimal vinkel
        fordi en liten vinkel også letter klossen og reduserer friksjonen — se kap. 5.
      </p>
    ),
  },
};
