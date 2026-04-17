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
      <marker id="arrow-red-k3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 3
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 3.1 — Ekornet
  // ==========================================================================
  "3.1": {
    title: "Gjennomsnittshastighet som vektor",
    difficulty: "lett",
    pageRef: "s. 83",
    problem: (
      <p>
        Et ekorn har koordinater <InlineLatex latex="(1{,}1\;\text{m},\; 3{,}4\;\text{m})" /> ved <InlineLatex latex="t_1=0" /> og
        <InlineLatex latex="(5{,}3\;\text{m},\; -0{,}5\;\text{m})" /> ved <InlineLatex latex="t_2=2{,}0\;\text{s}" />.
        Finn for dette tidsintervallet: (a) komponentene av gjennomsnittshastigheten,
        (b) størrelsen og retningen til gjennomsnittshastigheten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r_1=(1{,}1\hat i+3{,}4\hat j)\;\text{m}" /></li>
        <li><InlineLatex latex="\vec r_2=(5{,}3\hat i-0{,}5\hat j)\;\text{m}" /></li>
        <li><InlineLatex latex="\Delta t = 2{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Gjennomsnittshastighetens komponenter, størrelse og retning.</p>,
    strategy: (
      <TheoryBox title="Gjennomsnittshastighet i 2D">
        <p>
          Hastighet er en vektor. Gjennomsnittshastigheten er forskyvningsvektoren delt på
          tiden: <InlineLatex latex="\vec v_{\text{gj}}=\dfrac{\vec r_2-\vec r_1}{\Delta t}" />.
          Komponentene behandles uavhengig: <InlineLatex latex="v_x=\Delta x/\Delta t" /> og <InlineLatex latex="v_y=\Delta y/\Delta t" />.
          Størrelsen finnes via Pythagoras og retningen via arctangens.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Finn først forskyvningsvektoren <InlineLatex latex="\Delta \vec r=\vec r_2-\vec r_1" /> komponentvis.</p> },
      { label: "Hint 2", content: <p>Del hver komponent på <InlineLatex latex="\Delta t" /> for å få <InlineLatex latex="v_{x,\text{gj}}" /> og <InlineLatex latex="v_{y,\text{gj}}" />.</p> },
      { label: "Hint 3", content: <p>Vær forsiktig med fortegn på vinkelen: når <InlineLatex latex="v_y<0" /> ligger vektoren i fjerde kvadrant (under x-aksen).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Forskyvningsvektor">
          <p>
            <InlineLatex latex="\Delta x = 5{,}3-1{,}1 = 4{,}2\;\text{m}" />,
            <InlineLatex latex="\;\Delta y = -0{,}5-3{,}4 = -3{,}9\;\text{m}" />.
          </p>
        </Step>
        <Step n={2} title="Komponenter av gjennomsnittshastigheten">
          <FormulaBox latex="v_{x,\text{gj}}=\dfrac{4{,}2}{2{,}0}=2{,}1\;\text{m/s},\quad v_{y,\text{gj}}=\dfrac{-3{,}9}{2{,}0}=-1{,}95\;\text{m/s}" />
        </Step>
        <Step n={3} title="Størrelse">
          <FormulaBox latex="|\vec v_{\text{gj}}|=\sqrt{2{,}1^2+1{,}95^2}=\sqrt{8{,}21}\approx 2{,}87\;\text{m/s}" />
        </Step>
        <Step n={4} title="Retning">
          <p>
            <InlineLatex latex="\theta=\arctan\!\left(\dfrac{-1{,}95}{2{,}1}\right)\approx -42{,}9^\circ" />,
            dvs. 42,9° under +x-aksen (mot sørøst).
          </p>
          <FormulaBox variant="gold" latex="\boxed{\;|\vec v_{\text{gj}}|\approx 2{,}9\;\text{m/s},\;\theta\approx -43^\circ\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Gjennomsnittshastighet i 2D får vi ved å behandle x- og y-komponenten hver for seg,
        og så kombinere til størrelse og retning til slutt.
      </p>
    ),
  },

  // ==========================================================================
  // 3.3 — Animasjon med prikk
  // ==========================================================================
  "3.3": {
    title: "Gjennomsnittshastighet fra posisjonsfunksjon",
    difficulty: "lett",
    pageRef: "s. 83",
    problem: (
      <p>
        En nettsidedesigner lager en animasjon av en prikk med posisjon <InlineLatex latex="\vec r(t)=\left[4{,}0\;\text{cm}+(2{,}5\;\text{cm/s}^2)\,t^2\right]\hat i + \left[(5{,}0\;\text{cm/s})\,t\right]\hat j" />.
        (a) Finn størrelse og retning til gjennomsnittshastigheten mellom <InlineLatex latex="t=0" /> og <InlineLatex latex="t=2{,}0\;\text{s}" />.
        (b) Finn uttrykket for momentanhastigheten <InlineLatex latex="\vec v(t)" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r(t)=(4{,}0+2{,}5t^2)\hat i+5{,}0t\,\hat j\;[\text{cm}]" /></li>
        <li><InlineLatex latex="t_1=0,\;t_2=2{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Gjennomsnittshastighet og momentanhastighet.</p>,
    strategy: (
      <TheoryBox title="Momentan- og gjennomsnittshastighet">
        <p>
          Gjennomsnittshastighet finnes ved å regne ut <InlineLatex latex="\vec r" /> i begge endepunkter og dele differansen på tiden.
          Momentanhastighet er den deriverte: <InlineLatex latex="\vec v(t)=\dfrac{d\vec r}{dt}" />. Deriver hver komponent for seg.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Regn ut <InlineLatex latex="\vec r(0)" /> og <InlineLatex latex="\vec r(2)" /> med enheter i cm.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="\dfrac{d}{dt}(at^2)=2at" /> og <InlineLatex latex="\dfrac{d}{dt}(bt)=b" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Posisjon i endepunkter">
          <p>
            <InlineLatex latex="\vec r(0)=(4{,}0\,\hat i+0\,\hat j)\;\text{cm}" />,
            <InlineLatex latex="\;\vec r(2)=(4{,}0+10)\hat i+10\hat j=(14\,\hat i+10\,\hat j)\;\text{cm}" />.
          </p>
        </Step>
        <Step n={2} title="Gjennomsnittshastighet">
          <FormulaBox latex="\vec v_{\text{gj}}=\dfrac{\vec r(2)-\vec r(0)}{2{,}0}=\dfrac{(10\hat i+10\hat j)\,\text{cm}}{2{,}0\,\text{s}}=(5{,}0\hat i+5{,}0\hat j)\;\text{cm/s}" />
          <FormulaBox latex="|\vec v_{\text{gj}}|=\sqrt{5{,}0^2+5{,}0^2}\approx 7{,}1\;\text{cm/s},\quad \theta=45^\circ" />
        </Step>
        <Step n={3} title="Momentanhastighet (b)">
          <FormulaBox variant="gold" latex="\vec v(t)=\dfrac{d\vec r}{dt}=(5{,}0\,t)\hat i+5{,}0\,\hat j\;[\text{cm/s}]" />
          <p>
            Legg merke til at x-komponenten vokser lineært med tiden, mens y-komponenten er konstant.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Gjennomsnittshastighet er en «endepunkt-til-endepunkt»-størrelse mens momentanhastighet
        er den deriverte og beskriver bevegelsen akkurat nå. Generelt er de forskjellige
        — og blir bare like om hastigheten er konstant.
      </p>
    ),
  },

  // ==========================================================================
  // 3.4 — Når er vinkelen 45°?
  // ==========================================================================
  "3.4": {
    title: "Vinkel til hastighetsvektoren",
    difficulty: "middels",
    pageRef: "s. 84",
    problem: (
      <p>
        Hvis <InlineLatex latex="\vec r(t)=bt^2\hat i+ct^3\hat j" /> hvor <InlineLatex latex="b,c>0" /> er konstanter, ved
        hvilket tidspunkt <InlineLatex latex="t" /> danner hastighetsvektoren en vinkel på 45° med <InlineLatex latex="+x" />-aksen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r(t)=bt^2\hat i+ct^3\hat j" /></li>
        <li><InlineLatex latex="b,c>0" /></li>
      </ul>
    ),
    unknowns: <p>Tidspunktet <InlineLatex latex="t" /> hvor vinkelen er 45°.</p>,
    strategy: (
      <TheoryBox title="45°-vinkel betyr vx = vy">
        <p>
          Vinkelen <InlineLatex latex="\theta=\arctan(v_y/v_x)" />. 45° betyr <InlineLatex latex="v_x=v_y" /> (begge positive).
          Finn <InlineLatex latex="\vec v=d\vec r/dt" />, sett komponentene like, og løs for <InlineLatex latex="t" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver hver komponent: <InlineLatex latex="v_x=2bt" />, <InlineLatex latex="v_y=3ct^2" />.</p> },
      { label: "Hint 2", content: <p>Sett <InlineLatex latex="v_x=v_y" /> og del på <InlineLatex latex="t" /> (siden <InlineLatex latex="t=0" /> er en triviell løsning).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Deriver">
          <FormulaBox latex="\vec v(t)=2bt\,\hat i+3ct^2\,\hat j" />
        </Step>
        <Step n={2} title="Sett komponentene like">
          <FormulaBox latex="2bt=3ct^2\;\Rightarrow\;t(3ct-2b)=0" />
        </Step>
        <Step n={3} title="Ikke-triviell løsning">
          <FormulaBox variant="gold" latex="\boxed{\;t=\dfrac{2b}{3c}\;}" />
          <p className="italic text-[var(--muted)]">
            Ved <InlineLatex latex="t=0" /> er hastigheten null (tvetydig retning). Den første
            ikke-trivielle løsningen er <InlineLatex latex="t=2b/(3c)" />.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Retningen til hastighetsvektoren endrer seg når komponentene vokser med ulike potenser av <InlineLatex latex="t" />.
        Her vokser <InlineLatex latex="v_y\sim t^2" /> raskere enn <InlineLatex latex="v_x\sim t" />, så vinkelen øker over tid.
      </p>
    ),
  },

  // ==========================================================================
  // 3.5 — Jetfly gjennomsnittsakselerasjon
  // ==========================================================================
  "3.5": {
    title: "Gjennomsnittsakselerasjon som vektor",
    difficulty: "lett",
    pageRef: "s. 85",
    problem: (
      <p>
        Et jetfly flyr i konstant høyde. Ved <InlineLatex latex="t_1=0" /> har det hastighet <InlineLatex latex="\vec v_1=(90\hat i+110\hat j)\;\text{m/s}" />,
        og ved <InlineLatex latex="t_2=30{,}0\;\text{s}" /> er hastigheten <InlineLatex latex="\vec v_2=(-170\hat i+40\hat j)\;\text{m/s}" />.
        Finn komponentene, størrelsen og retningen til gjennomsnittsakselerasjonen i dette tidsintervallet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec v_1=(90\hat i+110\hat j)\;\text{m/s}" /></li>
        <li><InlineLatex latex="\vec v_2=(-170\hat i+40\hat j)\;\text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t=30{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Komponenter, størrelse og retning til <InlineLatex latex="\vec a_{\text{gj}}" />.</p>,
    strategy: (
      <TheoryBox title="Gjennomsnittsakselerasjon">
        <p>
          <InlineLatex latex="\vec a_{\text{gj}}=\dfrac{\vec v_2-\vec v_1}{\Delta t}" />. Regn komponentvis.
          Retning til akselerasjonen trenger ikke peke i samme retning som hastigheten —
          faktisk er det avviket som krummer banen.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\Delta v_x=v_{2x}-v_{1x}=-260\;\text{m/s}" /> (flyet bremser i x-retning og snur).</p> },
      { label: "Hint 2", content: <p>Negativ x og positiv y gir vinkel i 2. kvadrant (over negativ x-akse).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Endring i hastighet">
          <FormulaBox latex="\Delta \vec v=(-170-90)\hat i+(40-110)\hat j=(-260\hat i-70\hat j)\;\text{m/s}" />
        </Step>
        <Step n={2} title="Gjennomsnittsakselerasjon">
          <FormulaBox latex="\vec a_{\text{gj}}=\dfrac{\Delta \vec v}{\Delta t}=\left(-\dfrac{260}{30}\hat i-\dfrac{70}{30}\hat j\right)\approx(-8{,}67\hat i-2{,}33\hat j)\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="Størrelse og retning">
          <FormulaBox latex="|\vec a_{\text{gj}}|=\sqrt{8{,}67^2+2{,}33^2}\approx 8{,}98\;\text{m/s}^2" />
          <p>
            <InlineLatex latex="\theta=\arctan\!\left(\dfrac{-2{,}33}{-8{,}67}\right)=15^\circ" /> under <InlineLatex latex="-x" />-aksen,
            dvs. <InlineLatex latex="180^\circ+15^\circ=195^\circ" /> fra <InlineLatex latex="+x" />-aksen.
          </p>
          <FormulaBox variant="gold" latex="\boxed{\;|\vec a_{\text{gj}}|\approx 9{,}0\;\text{m/s}^2\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Akselerasjon trenger ikke være parallell med hastigheten: den er bare endringsraten
        av hastighetsvektoren. Når retningen endrer seg, har vi en komponent vinkelrett på farten.
      </p>
    ),
  },

  // ==========================================================================
  // 3.7 — Prærieulven
  // ==========================================================================
  "3.7": {
    title: "Hastighet og akselerasjon fra r(t)",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <p>
        En prærieulv har posisjon (i meter når t er i sekunder): <InlineLatex latex="\vec r(t)=(-3{,}0\,t+5{,}0\,t^2)\hat i+(4{,}0\,t^2+t^3)\hat j" />.
        Finn (a) <InlineLatex latex="\vec v(t)" /> og <InlineLatex latex="\vec a(t)" /> som generelle uttrykk,
        (b) størrelsen og retningen til hastigheten ved <InlineLatex latex="t=2{,}0\;\text{s}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r(t)=(-3{,}0t+5{,}0t^2)\hat i+(4{,}0t^2+t^3)\hat j\;[\text{m}]" /></li>
      </ul>
    ),
    unknowns: <p>Generell <InlineLatex latex="\vec v(t),\vec a(t)" /> og fart/retning ved <InlineLatex latex="t=2" /> s.</p>,
    strategy: (
      <TheoryBox title="Komponentvis derivasjon">
        <p>
          Hastighet er første-deriverte, akselerasjon andre-deriverte, av posisjonen.
          Deriver hver komponent for seg. Sett deretter inn verdien for <InlineLatex latex="t" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\dfrac{d}{dt}(at+bt^2)=a+2bt" />, <InlineLatex latex="\;\dfrac{d}{dt}(ct^2+dt^3)=2ct+3dt^2" />.</p> },
      { label: "Hint 2", content: <p>Ved <InlineLatex latex="t=2" /> s er <InlineLatex latex="v_x=-3+20=17" /> m/s og <InlineLatex latex="v_y=16+12=28" /> m/s.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Hastighetsvektor">
          <FormulaBox latex="\vec v(t)=(-3{,}0+10{,}0\,t)\hat i+(8{,}0\,t+3{,}0\,t^2)\hat j\;[\text{m/s}]" />
        </Step>
        <Step n={2} title="Akselerasjonsvektor">
          <FormulaBox latex="\vec a(t)=10{,}0\,\hat i+(8{,}0+6{,}0\,t)\hat j\;[\text{m/s}^2]" />
        </Step>
        <Step n={3} title="Ved t = 2,0 s">
          <FormulaBox latex="\vec v(2)=(17\hat i+28\hat j)\;\text{m/s}" />
          <FormulaBox latex="|\vec v|=\sqrt{17^2+28^2}=\sqrt{1073}\approx 32{,}8\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\theta=\arctan(28/17)\approx 58{,}7^\circ\text{ over }+x" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        For en gitt <InlineLatex latex="\vec r(t)" /> finner vi hastighet ved første-derivasjon og akselerasjon ved andre-derivasjon
        — komponentvis. Tallverdier kommer til slutt.
      </p>
    ),
  },

  // ==========================================================================
  // 3.8 — Hund i friluft
  // ==========================================================================
  "3.8": {
    title: "Hastighet etter gitt gjennomsnittsakselerasjon",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <p>
        En hund som løper i åpen mark har hastighetskomponenter <InlineLatex latex="v_x=2{,}6\;\text{m/s}" /> og
        <InlineLatex latex="v_y=-1{,}8\;\text{m/s}" /> ved <InlineLatex latex="t_1=10{,}0\;\text{s}" />. I tidsintervallet fra
        <InlineLatex latex="t_1" /> til <InlineLatex latex="t_2=20{,}0\;\text{s}" /> har gjennomsnittsakselerasjonen
        størrelse <InlineLatex latex="0{,}45\;\text{m/s}^2" /> og retning 31° fra <InlineLatex latex="+x" />-aksen. Ved <InlineLatex latex="t_2" />,
        finn komponentene, størrelsen og retningen til hastigheten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec v_1=(2{,}6\hat i-1{,}8\hat j)\;\text{m/s}" /></li>
        <li><InlineLatex latex="|\vec a_{\text{gj}}|=0{,}45\;\text{m/s}^2,\;\theta_a=31^\circ" /></li>
        <li><InlineLatex latex="\Delta t=10{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Hastighet <InlineLatex latex="\vec v_2" /> med komponenter, størrelse og retning.</p>,
    strategy: (
      <TheoryBox title="Endring = akselerasjon × tid">
        <p>
          Når <InlineLatex latex="\vec a_{\text{gj}}" /> er kjent: <InlineLatex latex="\vec v_2=\vec v_1+\vec a_{\text{gj}}\,\Delta t" />.
          Først dekomponer <InlineLatex latex="\vec a_{\text{gj}}" /> i x- og y-komponenter via cosinus/sinus.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="a_x=0{,}45\cos 31^\circ" />, <InlineLatex latex="a_y=0{,}45\sin 31^\circ" />.</p> },
      { label: "Hint 2", content: <p>Multiplisér med <InlineLatex latex="\Delta t=10" /> s for å få endringen i hastighet.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Komponenter av a">
          <FormulaBox latex="a_x=0{,}45\cos 31^\circ\approx 0{,}386\;\text{m/s}^2,\quad a_y=0{,}45\sin 31^\circ\approx 0{,}232\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Endring i hastighet">
          <FormulaBox latex="\Delta v_x=0{,}386\cdot 10=3{,}86\;\text{m/s},\quad \Delta v_y=0{,}232\cdot 10=2{,}32\;\text{m/s}" />
        </Step>
        <Step n={3} title="Endelig hastighet">
          <FormulaBox latex="v_{2x}=2{,}6+3{,}86=6{,}46\;\text{m/s},\quad v_{2y}=-1{,}8+2{,}32=0{,}52\;\text{m/s}" />
          <FormulaBox latex="|\vec v_2|=\sqrt{6{,}46^2+0{,}52^2}\approx 6{,}48\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\theta=\arctan(0{,}52/6{,}46)\approx 4{,}6^\circ\text{ over }+x" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Gjennomsnittsakselerasjon endrer <em>hele</em> hastighetsvektoren. Bruk komponentform:
        finn <InlineLatex latex="a_x, a_y" />, multiplisér med tiden, og legg til opprinnelig hastighet.
      </p>
    ),
  },

  // ==========================================================================
  // 3.9 — Fysikkbok fra bord
  // ==========================================================================
  "3.9": {
    title: "Horisontalt kast fra bord",
    difficulty: "lett",
    pageRef: "s. 91",
    problem: (
      <div className="space-y-2">
        <p>
          En fysikkbok glir av et horisontalt bord med fart <InlineLatex latex="1{,}10\;\text{m/s}" />. Den treffer gulvet på
          <InlineLatex latex="0{,}480\;\text{s}" />. Se bort fra luftmotstand. Finn (a) høyden på bordet,
          (b) horisontal avstand fra bordkanten til nedslagspunktet,
          (c) størrelsen til hastigheten rett før nedslag.
        </p>
        <svg viewBox="0 0 280 150" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <rect x="20" y="30" width="100" height="8" fill="#6b7280" />
          <rect x="20" y="38" width="8" height="90" fill="#6b7280" />
          <rect x="112" y="38" width="8" height="90" fill="#6b7280" />
          <rect x="125" y="24" width="22" height="8" fill="#3b82f6" stroke="#1e40af" />
          <line x1="146" y1="32" x2="195" y2="32" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k3)" />
          <text x="165" y="24" textAnchor="middle" fontSize="10" fill="#3b82f6">v0 = 1,10 m/s</text>
          <path d="M146,28 Q180,50 230,128" fill="none" stroke="#ef4444" strokeDasharray="3 2" />
          <line x1="20" y1="130" x2="260" y2="130" stroke="#374151" strokeWidth="2" />
          <line x1="20" y1="30" x2="20" y2="130" stroke="#10b981" strokeDasharray="2 2" />
          <text x="10" y="85" fontSize="10" fill="#10b981" textAnchor="end">h</text>
          <line x1="146" y1="138" x2="230" y2="138" stroke="#8b5cf6" strokeDasharray="2 2" />
          <text x="188" y="148" fontSize="10" fill="#8b5cf6" textAnchor="middle">x</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_{0x}=1{,}10\;\text{m/s}" /></li>
        <li><InlineLatex latex="v_{0y}=0" /> (horisontalt kast)</li>
        <li><InlineLatex latex="t=0{,}480\;\text{s}" /></li>
        <li><InlineLatex latex="g=9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Høyde <InlineLatex latex="h" />, horisontal avstand <InlineLatex latex="x" />, hastighet ved nedslag.</p>,
    strategy: (
      <TheoryBox title="Prosjektil: x og y er uavhengige">
        <p>
          Ingen luftmotstand betyr <InlineLatex latex="a_x=0" /> og <InlineLatex latex="a_y=-g" />. Horisontal og vertikal bevegelse
          er <em>helt</em> uavhengige, men de deler samme tid <InlineLatex latex="t" />.
        </p>
        <p className="mt-1">
          Horisontalt: <InlineLatex latex="x=v_{0x}t" />. Vertikalt (fra hvile): <InlineLatex latex="h=\tfrac12 g t^2" />, <InlineLatex latex="v_y=gt" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Høyden er hvor mye boken har falt: <InlineLatex latex="h=\tfrac12 g t^2" />.</p> },
      { label: "Hint 2", content: <p>Farten ved nedslag er Pythagoras av <InlineLatex latex="v_x" /> (konstant) og <InlineLatex latex="v_y=gt" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Høyde på bordet">
          <FormulaBox latex="h=\tfrac12 g t^2 = 0{,}5\cdot 9{,}80\cdot 0{,}480^2\approx 1{,}13\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Horisontal avstand">
          <FormulaBox latex="x=v_{0x}\,t=1{,}10\cdot 0{,}480 = 0{,}528\;\text{m}" />
        </Step>
        <Step n={3} title="(c) Hastighet ved nedslag">
          <FormulaBox latex="v_y=gt=9{,}80\cdot 0{,}480=4{,}70\;\text{m/s}" />
          <FormulaBox latex="|\vec v|=\sqrt{1{,}10^2+4{,}70^2}\approx 4{,}83\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\boxed{\;h\approx 1{,}13\;\text{m},\;x\approx 0{,}528\;\text{m},\;|\vec v|\approx 4{,}83\;\text{m/s}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Horisontalt kast: vertikal bevegelse er fritt fall fra hvile, horisontal bevegelse er
        konstant fart. Fallhøyden bestemmer fallotid, som igjen bestemmer horisontal rekkevidde.
      </p>
    ),
  },

  // ==========================================================================
  // 3.10 — Stuper fra klippe
  // ==========================================================================
  "3.10": {
    title: "Minimum horisontal fart over hylle",
    difficulty: "middels",
    pageRef: "s. 92",
    problem: (
      <p>
        En modig stuper hopper horisontalt ut fra en klippe. En hylle 9,00 m under og 1,75 m ut
        må passeres. Hva må den minste farten være idet hun forlater kanten for å klare hyllen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\Delta y=9{,}00\;\text{m}" /> (ned)</li>
        <li>Må nå minst <InlineLatex latex="x_{\min}=1{,}75\;\text{m}" /> horisontalt</li>
        <li><InlineLatex latex="v_{0y}=0" /></li>
      </ul>
    ),
    unknowns: <p>Minimum starthastighet <InlineLatex latex="v_0" />.</p>,
    strategy: (
      <TheoryBox title="Minimum betyr akkurat så vidt">
        <p>
          Den kritiske situasjonen er når stuperen lander akkurat ved kanten av hyllen.
          Fallotiden bestemmes av vertikal høyde. Gitt denne tiden må horisontalfarten være
          stor nok til å dekke 1,75 m.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Finn falltiden <InlineLatex latex="t=\sqrt{2\Delta y/g}" />.</p> },
      { label: "Hint 2", content: <p>Deretter <InlineLatex latex="v_0=x/t" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Falltid">
          <FormulaBox latex="t=\sqrt{\dfrac{2\Delta y}{g}}=\sqrt{\dfrac{2\cdot 9{,}00}{9{,}80}}\approx 1{,}355\;\text{s}" />
        </Step>
        <Step n={2} title="Nødvendig horisontalfart">
          <FormulaBox variant="gold" latex="v_0=\dfrac{x_{\min}}{t}=\dfrac{1{,}75}{1{,}355}\approx 1{,}29\;\text{m/s}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Typisk prosjektiloppgave: fallhøyden gir tiden, og tiden kobler vertikal og horisontal
        bevegelse. Løs vertikalt først, så horisontalt.
      </p>
    ),
  },

  // ==========================================================================
  // 3.16 — Baseball
  // ==========================================================================
  "3.16": {
    title: "Rekkevidde og maks høyde for baseball",
    difficulty: "middels",
    pageRef: "s. 93",
    problem: (
      <p>
        En baseball forlater balltreet med vinkel 30,0° over horisontalen og fanges 115 m borte
        i samme høyde. (a) Hva var starthastigheten? (b) Hvor høyt kom ballen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Rekkevidde <InlineLatex latex="R=115\;\text{m}" /> (samme høyde)</li>
        <li>Vinkel <InlineLatex latex="\alpha_0=30{,}0^\circ" /></li>
      </ul>
    ),
    unknowns: <p>Startfart <InlineLatex latex="v_0" /> og maks høyde <InlineLatex latex="h" />.</p>,
    strategy: (
      <TheoryBox title="Rekkeviddeformelen (samme høyde)">
        <p>
          Når start- og landingshøyde er like: <InlineLatex latex="R=\dfrac{v_0^2\sin(2\alpha_0)}{g}" />.
          Maksimal høyde over utgangspunktet:
          <InlineLatex latex="\;h=\dfrac{(v_0\sin\alpha_0)^2}{2g}" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Løs <InlineLatex latex="v_0" /> fra rekkeviddeformelen, så sett inn i høydeformelen.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Startfart">
          <FormulaBox latex="v_0=\sqrt{\dfrac{Rg}{\sin(2\alpha_0)}}=\sqrt{\dfrac{115\cdot 9{,}80}{\sin 60^\circ}}=\sqrt{1301}\approx 36{,}1\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Maks høyde">
          <FormulaBox latex="h=\dfrac{(v_0\sin 30^\circ)^2}{2g}=\dfrac{(36{,}1\cdot 0{,}5)^2}{19{,}6}\approx 16{,}6\;\text{m}" />
          <FormulaBox variant="gold" latex="\boxed{\;v_0\approx 36{,}1\;\text{m/s},\;h\approx 16{,}6\;\text{m}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Rekkeviddeformelen <InlineLatex latex="R=v_0^2\sin(2\alpha)/g" /> gjelder kun når start- og landingshøyde er like.
        Vinkel 45° gir maks rekkevidde, men 30° er vanligere i praksis.
      </p>
    ),
  },

  // ==========================================================================
  // 3.17 — Kulestøt
  // ==========================================================================
  "3.17": {
    title: "Kulestøt fra hevet posisjon",
    difficulty: "middels",
    pageRef: "s. 94",
    problem: (
      <p>
        En kulestøter kaster kulen (masse 7,26 kg) med fart 12,4 m/s i en vinkel på 51,0° over
        horisontalen fra en høyde 1,83 m over bakken. Hvilken horisontal avstand tilbakelegger
        kulen? Se bort fra luftmotstand.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=12{,}4\;\text{m/s}" />, <InlineLatex latex="\alpha_0=51{,}0^\circ" /></li>
        <li>Starthøyde <InlineLatex latex="h=1{,}83\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Horisontal avstand <InlineLatex latex="x" /> når kulen treffer bakken.</p>,
    strategy: (
      <TheoryBox title="Start og landingshøyde er ulike">
        <p>
          Rekkeviddeformelen <InlineLatex latex="R=v_0^2\sin(2\alpha)/g" /> gjelder <em>ikke</em>.
          Sett opp <InlineLatex latex="y(t)=h+v_{0y}t-\tfrac12 gt^2" />, sett <InlineLatex latex="y=0" /> og løs kvadratisk for <InlineLatex latex="t" />.
          Deretter <InlineLatex latex="x=v_{0x}t" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="v_{0x}=v_0\cos 51^\circ" />, <InlineLatex latex="v_{0y}=v_0\sin 51^\circ" />.</p> },
      { label: "Hint 2", content: <p>Bruk abc-formelen. Velg den positive roten for <InlineLatex latex="t" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Komponenter">
          <FormulaBox latex="v_{0x}=12{,}4\cos 51^\circ\approx 7{,}80\;\text{m/s},\quad v_{0y}=12{,}4\sin 51^\circ\approx 9{,}64\;\text{m/s}" />
        </Step>
        <Step n={2} title="Tid til nedslag">
          <p>
            Setter <InlineLatex latex="1{,}83+9{,}64\,t-4{,}90\,t^2=0" />, dvs. <InlineLatex latex="4{,}90t^2-9{,}64t-1{,}83=0" />:
          </p>
          <FormulaBox latex="t=\dfrac{9{,}64+\sqrt{9{,}64^2+4\cdot 4{,}90\cdot 1{,}83}}{2\cdot 4{,}90}=\dfrac{9{,}64+\sqrt{92{,}9+35{,}9}}{9{,}80}\approx 2{,}14\;\text{s}" />
        </Step>
        <Step n={3} title="Horisontal avstand">
          <FormulaBox variant="gold" latex="x=v_{0x}\,t=7{,}80\cdot 2{,}14\approx 16{,}7\;\text{m}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Når starthøyden er over landingshøyden, må vi løse kvadratisk for tid. Rekkeviddeformelen
        fungerer ikke direkte — den krever lik start- og slutthøyde.
      </p>
    ),
  },

  // ==========================================================================
  // 3.21 — Myntkast på tivoli
  // ==========================================================================
  "3.21": {
    title: "Myntkast i skål",
    difficulty: "middels",
    pageRef: "s. 95",
    problem: (
      <p>
        I et tivoliboots: kast en mynt ned i en liten skål på en hylle 2,1 m borte horisontalt og
        i ukjent høyde over kastepunktet. Mynten kastes med <InlineLatex latex="v_0=6{,}4\;\text{m/s}" /> i 60° over horisontalen
        og lander i skålen. Finn (a) høyden <InlineLatex latex="h" /> til skålen,
        (b) vertikal fartkomponent idet mynten lander i skålen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=6{,}4\;\text{m/s},\;\alpha_0=60^\circ" /></li>
        <li>Horisontal avstand <InlineLatex latex="D=2{,}1\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Skålens høyde <InlineLatex latex="h" /> og <InlineLatex latex="v_y" /> ved nedslag.</p>,
    strategy: (
      <TheoryBox title="Tid fra horisontal bevegelse">
        <p>
          Siden horisontalavstand og horisontalfart er kjent, finner vi tiden: <InlineLatex latex="t=D/v_{0x}" />.
          Så bruker vi vertikale kinematiske likninger for å finne <InlineLatex latex="y" /> og <InlineLatex latex="v_y" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="v_{0x}=v_0\cos 60^\circ=3{,}20\;\text{m/s}" />.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="h=v_{0y}\,t-\tfrac12 g t^2" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Tid og komponenter">
          <FormulaBox latex="v_{0x}=3{,}20\;\text{m/s},\;v_{0y}=6{,}4\sin 60^\circ\approx 5{,}54\;\text{m/s}" />
          <FormulaBox latex="t=\dfrac{D}{v_{0x}}=\dfrac{2{,}1}{3{,}20}\approx 0{,}656\;\text{s}" />
        </Step>
        <Step n={2} title="(a) Høyde">
          <FormulaBox latex="h=5{,}54\cdot 0{,}656-\tfrac12\cdot 9{,}80\cdot 0{,}656^2\approx 3{,}63-2{,}11=1{,}53\;\text{m}" />
        </Step>
        <Step n={3} title="(b) Vertikal fart ved nedslag">
          <FormulaBox variant="gold" latex="v_y=v_{0y}-gt=5{,}54-9{,}80\cdot 0{,}656\approx -0{,}89\;\text{m/s}" />
          <p className="italic text-[var(--muted)]">
            Negativt tegn betyr at mynten er på vei <em>nedover</em> når den lander —
            altså har den allerede passert toppunktet.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Nøkkelen er tidssambindingen: horisontal fart og avstand gir tiden, og tiden
        bestemmer hva som skjer vertikalt. X og y er uavhengige bortsett fra felles tid.
      </p>
    ),
  },

  // ==========================================================================
  // 3.25 — Jordens banehastighet
  // ==========================================================================
  "3.25": {
    title: "Jordens fart og sentripetalakselerasjon",
    difficulty: "lett",
    pageRef: "s. 98",
    problem: (
      <p>
        Radien til Jordens bane rundt sola (antatt sirkulær) er <InlineLatex latex="1{,}50\times 10^8" /> km,
        og Jorden fullfører banen på 365 dager. (a) Hva er Jordens banehastighet i m/s?
        (b) Hva er den radielle akselerasjonen mot sola?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="R=1{,}50\times 10^{11}\;\text{m}" /></li>
        <li><InlineLatex latex="T=365\text{ d}\approx 3{,}154\times 10^{7}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Banehastighet <InlineLatex latex="v" /> og sentripetalakselerasjon <InlineLatex latex="a_{\text{rad}}" />.</p>,
    strategy: (
      <TheoryBox title="Jevn sirkelbevegelse">
        <p>
          Omløpstid <InlineLatex latex="T" />, radius <InlineLatex latex="R" />: fart <InlineLatex latex="v=2\pi R/T" />.
          Radiell akselerasjon mot sentrum: <InlineLatex latex="a_{\text{rad}}=v^2/R=4\pi^2 R/T^2" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sekunder i ett år: <InlineLatex latex="365\cdot 24\cdot 3600\approx 3{,}154\times 10^7" /> s.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Banehastighet">
          <FormulaBox latex="v=\dfrac{2\pi R}{T}=\dfrac{2\pi\cdot 1{,}50\times 10^{11}}{3{,}154\times 10^{7}}\approx 2{,}99\times 10^{4}\;\text{m/s}" />
          <p>Det er ca. 30 km/s.</p>
        </Step>
        <Step n={2} title="(b) Sentripetalakselerasjon">
          <FormulaBox variant="gold" latex="a_{\text{rad}}=\dfrac{v^2}{R}=\dfrac{(2{,}99\times 10^4)^2}{1{,}50\times 10^{11}}\approx 5{,}95\times 10^{-3}\;\text{m/s}^2" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Jevn sirkelbevegelse har konstant fart men konstant <em>akselerasjon</em> mot sentrum.
        Selv om Jorden beveger seg med 30 km/s, er akselerasjonen svært liten fordi radien er så stor.
      </p>
    ),
  },

  // ==========================================================================
  // 3.28 — Pariserhjul
  // ==========================================================================
  "3.28": {
    title: "Akselerasjon i pariserhjul",
    difficulty: "lett",
    pageRef: "s. 99",
    problem: (
      <p>
        Et pariserhjul med radius 14,0 m snurrer om en horisontal akse. Passasjerfarten langs
        rim er konstant lik 6,00 m/s. Hva er størrelsen og retningen til passasjerens
        akselerasjon idet hun passerer (a) laveste punkt, (b) høyeste punkt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="R=14{,}0\;\text{m}" />, <InlineLatex latex="v=6{,}00\;\text{m/s}" /> (konstant)</li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" /> og retning på de to punktene.</p>,
    strategy: (
      <TheoryBox title="Jevn sirkelbevegelse: akselerasjon alltid mot sentrum">
        <p>
          Siden farten er konstant, er tangentiell akselerasjon null — kun radiell.
          <InlineLatex latex="a_{\text{rad}}=v^2/R" /> peker alltid mot sentrum av sirkelen.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>På laveste punkt peker sentrum oppover, på høyeste peker sentrum nedover.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Størrelse">
          <FormulaBox latex="a_{\text{rad}}=\dfrac{v^2}{R}=\dfrac{6{,}00^2}{14{,}0}=\dfrac{36{,}0}{14{,}0}\approx 2{,}57\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Retning på hvert punkt">
          <ul className="list-disc pl-5 space-y-1">
            <li>(a) <strong>Laveste punkt:</strong> akselerasjonen peker rett opp (mot sentrum).</li>
            <li>(b) <strong>Høyeste punkt:</strong> akselerasjonen peker rett ned (mot sentrum).</li>
          </ul>
          <FormulaBox variant="gold" latex="\boxed{\;a\approx 2{,}57\;\text{m/s}^2\;\text{mot sentrum på begge punkter}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Selv om farten er konstant, har vi akselerasjon fordi retningen endres kontinuerlig.
        Vektoren peker alltid mot sentrum — derfor navnet sentripetalakselerasjon.
      </p>
    ),
  },

  // ==========================================================================
  // 3.31 — Helikopterrotor
  // ==========================================================================
  "3.31": {
    title: "Helikopterblad ved 550 rpm",
    difficulty: "middels",
    pageRef: "s. 99",
    problem: (
      <p>
        En modell av en helikopterrotor har fire blader, hver 3,40 m lang fra navet til bladspissen.
        Rotoren spinner ved 550 rev/min. Finn (a) den lineære farten til bladspissen i m/s,
        (b) den radielle akselerasjonen til bladspissen uttrykt i enheter av <InlineLatex latex="g" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="R=3{,}40\;\text{m}" /></li>
        <li><InlineLatex latex="f=550\text{ rpm}=9{,}167\text{ rev/s}" /></li>
      </ul>
    ),
    unknowns: <p>Fart <InlineLatex latex="v" /> og akselerasjon (i <InlineLatex latex="g" />).</p>,
    strategy: (
      <TheoryBox title="rev/min → rev/s → rad/s">
        <p>
          <InlineLatex latex="v=2\pi R f" /> der <InlineLatex latex="f" /> er omdreininger per sekund.
          <InlineLatex latex="\;a=v^2/R" />. Konverter til <InlineLatex latex="g" /> ved å dele på 9,80 m/s².
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Først: <InlineLatex latex="550/60\approx 9{,}17" /> rev/s.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="v=2\pi R f" /> — eller bruk <InlineLatex latex="\omega=2\pi f" /> og <InlineLatex latex="v=\omega R" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Fart">
          <FormulaBox latex="v=2\pi R f=2\pi\cdot 3{,}40\cdot 9{,}167\approx 196\;\text{m/s}" />
          <p className="italic text-[var(--muted)]">Det er omtrent lydens hastighet!</p>
        </Step>
        <Step n={2} title="(b) Radiell akselerasjon">
          <FormulaBox latex="a=\dfrac{v^2}{R}=\dfrac{196^2}{3{,}40}\approx 1{,}13\times 10^4\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="\dfrac{a}{g}=\dfrac{1{,}13\times 10^4}{9{,}80}\approx 1{,}15\times 10^{3}\;g\approx 1150\,g" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Høye rotasjonshastigheter gir enorme sentripetalakselerasjoner. 1150 g viser hvorfor
        rotorblader må tåle kolossale krefter — de er under enorm strekk.
      </p>
    ),
  },

  // ==========================================================================
  // 3.46 — Testrakett
  // ==========================================================================
  "3.46": {
    title: "Rakett langs skråplan, deretter prosjektil",
    difficulty: "vanskelig",
    pageRef: "s. 107",
    problem: (
      <p>
        En testrakett starter fra hvile ved punkt A og akselereres langs et skråplan med
        <InlineLatex latex="1{,}90\;\text{m/s}^2" /> i 22,0 s. Skråplanet stiger 35,0° over horisontalen.
        Motoren slår av, og raketten fortsetter som et prosjektil. Finn (a) største høyde
        over bakken, (b) største horisontal avstand fra A som raketten vil nå.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Fra hvile: <InlineLatex latex="v_A=0" />, <InlineLatex latex="a_1=1{,}90\;\text{m/s}^2" /> i <InlineLatex latex="t_1=22{,}0\;\text{s}" /></li>
        <li>Langs skråplan med <InlineLatex latex="35^\circ" /></li>
      </ul>
    ),
    unknowns: <p>Maksimal høyde og horisontal avstand.</p>,
    strategy: (
      <TheoryBox title="To faser: drevet + fritt fall">
        <p>
          Fase 1 (0 til 22 s): rettlinjet bevegelse opp skråplanet. Ved t = 22 s kjenner vi
          raketten sin posisjon (x₀, y₀) og hastighet (v₀ₓ, v₀ᵧ).
          Fase 2: prosjektil fra det punktet, kun tyngdekraft.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Fase 1: <InlineLatex latex="s=\tfrac12 a_1 t_1^2" /> og <InlineLatex latex="v=a_1 t_1" /> langs skråplanet, så dekomponer.</p> },
      { label: "Hint 2", content: <p>Maks høyde: der vertikalfart = 0. Ekstra høyde <InlineLatex latex="=v_{0y}^2/(2g)" />.</p> },
      { label: "Hint 3", content: <p>Rekkevidde: finn total tid i luften ved å løse <InlineLatex latex="y(t)=0" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Fase 1: ved motorstans">
          <FormulaBox latex="s=\tfrac12\cdot 1{,}90\cdot 22{,}0^2=460\;\text{m langs skråplan}" />
          <FormulaBox latex="v=1{,}90\cdot 22{,}0=41{,}8\;\text{m/s}" />
          <FormulaBox latex="x_0=460\cos 35^\circ\approx 377\;\text{m},\;y_0=460\sin 35^\circ\approx 264\;\text{m}" />
          <FormulaBox latex="v_{0x}=41{,}8\cos 35^\circ\approx 34{,}2\;\text{m/s},\;v_{0y}=41{,}8\sin 35^\circ\approx 24{,}0\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Maksimal høyde">
          <FormulaBox latex="\Delta h=\dfrac{v_{0y}^2}{2g}=\dfrac{24{,}0^2}{19{,}6}\approx 29{,}4\;\text{m}" />
          <FormulaBox variant="gold" latex="H_{\max}=y_0+\Delta h\approx 264+29{,}4\approx 293\;\text{m}" />
        </Step>
        <Step n={3} title="(b) Tid og horisontal rekkevidde">
          <p>Løs <InlineLatex latex="y(t)=y_0+v_{0y}t-\tfrac12 g t^2=0" />:</p>
          <FormulaBox latex="4{,}90\,t^2-24{,}0\,t-264=0\Rightarrow t=\dfrac{24{,}0+\sqrt{576+5174}}{9{,}80}\approx 10{,}2\;\text{s}" />
          <FormulaBox latex="\Delta x=v_{0x}\,t=34{,}2\cdot 10{,}2\approx 349\;\text{m}" />
          <FormulaBox variant="gold" latex="\boxed{\;R=x_0+\Delta x\approx 377+349\approx 725\;\text{m}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Flerfaseproblem: løs hver fase separat og bruk sluttilstanden fra fase 1 som
        begynnelsestilstand for fase 2. Vær nøye med at posisjon og hastighet overføres riktig.
      </p>
    ),
  },

  // ==========================================================================
  // 3.48 — Stein fra tak (utledning)
  // ==========================================================================
  "3.48": {
    title: "Prosjektil fra høyde — generell rekkevidde",
    difficulty: "vanskelig",
    pageRef: "s. 107",
    problem: (
      <p>
        En stein kastes fra taket av en bygning med fart <InlineLatex latex="v_0" /> i en vinkel <InlineLatex latex="\alpha_0" /> over horisontalen.
        Bygningens høyde er <InlineLatex latex="h" />. Vis at horisontal avstand fra bygningens fot
        der steinen treffer bakken er:
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Starthøyde <InlineLatex latex="h" /> over bakken</li>
        <li><InlineLatex latex="v_0, \alpha_0" /> gitt symbolsk</li>
      </ul>
    ),
    unknowns: <p>Uttrykk for horisontal avstand <InlineLatex latex="x" /> ved nedslag.</p>,
    strategy: (
      <TheoryBox title="Vertikal abc-formel gir tiden">
        <p>
          Sett <InlineLatex latex="y(t)=h+v_0\sin\alpha_0\,t-\tfrac12 g t^2=0" /> og løs kvadratisk for <InlineLatex latex="t" />.
          Multiplisér med <InlineLatex latex="v_0\cos\alpha_0" /> for å få <InlineLatex latex="x" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>abc-formelen: <InlineLatex latex="\tfrac12 g t^2-v_0\sin\alpha_0\,t-h=0" />.</p> },
      { label: "Hint 2", content: <p>Velg den positive roten (tiden må være positiv).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Vertikal tid">
          <FormulaBox latex="\tfrac12 g t^2-v_0\sin\alpha_0\,t-h=0" />
          <FormulaBox latex="t=\dfrac{v_0\sin\alpha_0+\sqrt{v_0^2\sin^2\alpha_0+2gh}}{g}" />
          <p className="italic text-[var(--muted)]">Minustegnet gir negativ tid og forkastes.</p>
        </Step>
        <Step n={2} title="Horisontal avstand">
          <FormulaBox latex="x=v_0\cos\alpha_0\,t" />
          <FormulaBox variant="gold" latex="\boxed{\;x=\dfrac{v_0\cos\alpha_0}{g}\left(v_0\sin\alpha_0+\sqrt{v_0^2\sin^2\alpha_0+2gh}\right)\;}" />
        </Step>
        <Step n={3} title="Sjekk: h = 0 gir kjent rekkevidde">
          <FormulaBox latex="x=\dfrac{v_0\cos\alpha_0}{g}\cdot 2v_0\sin\alpha_0=\dfrac{v_0^2\sin 2\alpha_0}{g}" />
          <p>Som forventet — rekkeviddeformelen for lik start- og slutthøyde.</p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Generelle formler med symboler gir innsikt i grenseverdier (som <InlineLatex latex="h\to 0" />) og viser
        at tyngdekraft kombinert med kvadratisk likning gir den kvadratroten som dukker opp.
      </p>
    ),
  },

  // ==========================================================================
  // 3.61 — Granat eksploderer
  // ==========================================================================
  "3.61": {
    title: "Granat som eksploderer på toppen",
    difficulty: "vanskelig",
    pageRef: "s. 108",
    problem: (
      <p>
        En granat avfyres fra bakken med fart 75,0 m/s i 60,0° over horisontalen. På høyeste punkt
        eksploderer granaten i to like store biter. Den ene biten har fart null rett etter
        eksplosjonen og faller rett ned. Hvor langt fra kanonen lander den andre biten?
        (Antar flat bakke.)
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=75{,}0\;\text{m/s},\;\alpha_0=60{,}0^\circ" /></li>
        <li>To like store biter etter eksplosjon; én har v = 0</li>
        <li><InlineLatex latex="g=9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Hvor langt fra kanonen den bevegde biten lander.</p>,
    strategy: (
      <TheoryBox title="Bevegelsesmengdebevaring ved eksplosjon">
        <p>
          Indre krefter fra eksplosjonen bevarer total bevegelsesmengde. Ved toppunktet er
          vertikal fart null og horisontal fart er <InlineLatex latex="v_{0x}=v_0\cos 60^\circ" />.
          Om den ene biten stopper, må den andre bære <em>hele</em> horisontale bevegelsesmengden.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Fart ved topp: <InlineLatex latex="v_{\text{topp}}=v_0\cos 60^\circ" />.</p> },
      { label: "Hint 2", content: <p>Bevegelsesmengde: <InlineLatex latex="2m\,v_{\text{topp}}=m\cdot 0+m\,v_2" />.</p> },
      { label: "Hint 3", content: <p>Fra topp til bakke: samme tid som å stige, siden høyden er lik.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Fart og tid til topp">
          <FormulaBox latex="v_{0x}=75{,}0\cos 60^\circ=37{,}5\;\text{m/s},\;v_{0y}=75{,}0\sin 60^\circ\approx 64{,}95\;\text{m/s}" />
          <FormulaBox latex="t_{\text{opp}}=\dfrac{v_{0y}}{g}=\dfrac{64{,}95}{9{,}80}\approx 6{,}63\;\text{s}" />
          <FormulaBox latex="x_{\text{topp}}=v_{0x}\,t_{\text{opp}}\approx 37{,}5\cdot 6{,}63\approx 249\;\text{m}" />
          <FormulaBox latex="h_{\text{topp}}=\dfrac{v_{0y}^2}{2g}\approx 215\;\text{m}" />
        </Step>
        <Step n={2} title="Eksplosjon: bevegelsesmengde">
          <FormulaBox latex="(2m)\cdot 37{,}5=m\cdot 0+m\,v_2\Rightarrow v_2=75{,}0\;\text{m/s}" />
          <p>Den ene biten flyr videre med <strong>75,0 m/s</strong> horisontalt fra toppen.</p>
        </Step>
        <Step n={3} title="Fall fra topp til bakke">
          <p>Tiden fra toppunkt til bakken er lik tiden det tok å komme opp:</p>
          <FormulaBox latex="t_{\text{ned}}=6{,}63\;\text{s}" />
          <FormulaBox latex="\Delta x=75{,}0\cdot 6{,}63\approx 497\;\text{m}" />
        </Step>
        <Step n={4} title="Total avstand fra kanon">
          <FormulaBox variant="gold" latex="\boxed{\;R=x_{\text{topp}}+\Delta x\approx 249+497\approx 746\;\text{m}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Eksplosjoner endrer ikke total bevegelsesmengde. Ved å analysere toppunktet separat
        får vi enkle tall (vy = 0) og kan overføre momentum direkte til den bevegde biten.
        Husk også: uten motstand er tiden ned lik tiden opp.
      </p>
    ),
  },
};
