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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Posisjon i 2D beskrives av posisjonsvektoren <InlineLatex latex="\vec r = x\,\hat i + y\,\hat j" />.
          Når partikkelen flytter seg fra <InlineLatex latex="\vec r_1" /> til <InlineLatex latex="\vec r_2" />, er
          <em>forskyvningen</em> <InlineLatex latex="\Delta \vec r = \vec r_2 - \vec r_1" /> — en vektor som peker
          rett fra start til slutt, uavhengig av hvilken vei partikkelen faktisk tok. Gjennomsnittshastigheten er
          forskyvningen per tid.
        </p>
        <p>Originalformel fra læreboken (Young &amp; Freedman 3.2):</p>
        <FormulaBox variant="blue" latex="\vec v_{\text{gj}} = \dfrac{\vec r_2 - \vec r_1}{t_2 - t_1} = \dfrac{\Delta \vec r}{\Delta t}" />
        <p>
          Siden vektorer legges til og skaleres komponentvis, blir dette to uavhengige skalarlikninger:
          <InlineLatex latex="v_{x,\text{gj}} = \Delta x/\Delta t" /> og <InlineLatex latex="v_{y,\text{gj}} = \Delta y/\Delta t" />.
        </p>

        <Step n={1} title="Forskyvningsvektor">
          <p>Vi trekker komponentvis:</p>
          <FormulaBox variant="blue" latex="\Delta \vec r = (x_2 - x_1)\hat i + (y_2 - y_1)\hat j" />
          <p>
            <InlineLatex latex="\Delta x = 5{,}3-1{,}1 = 4{,}2\;\text{m}" />,
            <InlineLatex latex="\;\Delta y = -0{,}5-3{,}4 = -3{,}9\;\text{m}" />. Merk det negative y-fortegnet —
            ekornet har beveget seg nedover i vårt koordinatsystem.
          </p>
        </Step>
        <Step n={2} title="Komponenter av gjennomsnittshastigheten">
          <p>Del hver komponent på tidsintervallet <InlineLatex latex="\Delta t = 2{,}0\;\text{s}" />:</p>
          <FormulaBox latex="v_{x,\text{gj}}=\dfrac{4{,}2}{2{,}0}=2{,}1\;\text{m/s},\quad v_{y,\text{gj}}=\dfrac{-3{,}9}{2{,}0}=-1{,}95\;\text{m/s}" />
        </Step>
        <Step n={3} title="Størrelse">
          <p>Størrelsen (farten) får vi fra Pythagoras siden <InlineLatex latex="v_x" /> og <InlineLatex latex="v_y" /> er vinkelrette:</p>
          <FormulaBox variant="blue" latex="|\vec v_{\text{gj}}| = \sqrt{v_{x,\text{gj}}^2 + v_{y,\text{gj}}^2}" />
          <FormulaBox latex="|\vec v_{\text{gj}}|=\sqrt{2{,}1^2+1{,}95^2}=\sqrt{8{,}21}\approx 2{,}87\;\text{m/s}" />
        </Step>
        <Step n={4} title="Retning">
          <p>Vinkelen mellom vektoren og +x-aksen finner vi ved arctangens:</p>
          <FormulaBox variant="blue" latex="\theta = \arctan\!\left(\dfrac{v_{y,\text{gj}}}{v_{x,\text{gj}}}\right)" />
          <p>
            <InlineLatex latex="\theta=\arctan\!\left(\dfrac{-1{,}95}{2{,}1}\right)\approx -42{,}9^\circ" />,
            dvs. 42,9° under +x-aksen (mot sørøst). Siden <InlineLatex latex="v_x>0" /> og <InlineLatex latex="v_y<0" />,
            ligger vektoren i 4. kvadrant og arctangens gir riktig vinkel direkte.
          </p>
          <FormulaBox variant="gold" latex="\boxed{\;|\vec v_{\text{gj}}|\approx 2{,}9\;\text{m/s},\;\theta\approx -43^\circ\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> Ekornet har i snitt beveget seg 2,9 m for hvert sekund,
            i en retning skrått nedover mot høyre. Vi vet ingenting om selve banen — den kan være krøllet —
            men netto forskyvning delt på tiden gir denne gjennomsnittsvektoren.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Det finnes to hastighetsbegreper i fysikken. <em>Gjennomsnittshastighet</em> er
          forskyvning delt på tid — altså en endepunkt-til-endepunkt-størrelse. <em>Momentanhastighet</em> er
          hastigheten akkurat nå og defineres som grensen når tidsintervallet går mot null — matematisk den
          tidsderiverte av posisjonsvektoren.
        </p>
        <p>Originalformlene (Young &amp; Freedman 3.2 og 3.3):</p>
        <FormulaBox variant="blue" latex="\vec v_{\text{gj}} = \dfrac{\Delta \vec r}{\Delta t}, \qquad \vec v(t) = \lim_{\Delta t\to 0}\dfrac{\Delta \vec r}{\Delta t} = \dfrac{d\vec r}{dt}" />
        <p>
          Vektorderivasjon gjøres komponentvis: deriver <InlineLatex latex="x(t)" /> og <InlineLatex latex="y(t)" /> hver for seg.
          Her er <InlineLatex latex="x(t)=4{,}0+2{,}5t^2" /> og <InlineLatex latex="y(t)=5{,}0t" />.
        </p>

        <Step n={1} title="Posisjon i endepunkter">
          <p>Setter vi inn <InlineLatex latex="t=0" /> og <InlineLatex latex="t=2{,}0" /> s:</p>
          <p>
            <InlineLatex latex="\vec r(0)=(4{,}0\,\hat i+0\,\hat j)\;\text{cm}" />,
            <InlineLatex latex="\;\vec r(2)=(4{,}0+10)\hat i+10\hat j=(14\,\hat i+10\,\hat j)\;\text{cm}" />.
          </p>
        </Step>
        <Step n={2} title="Gjennomsnittshastighet">
          <p>Bruk originalformelen med forskyvningsvektoren:</p>
          <FormulaBox latex="\vec v_{\text{gj}}=\dfrac{\vec r(2)-\vec r(0)}{2{,}0}=\dfrac{(10\hat i+10\hat j)\,\text{cm}}{2{,}0\,\text{s}}=(5{,}0\hat i+5{,}0\hat j)\;\text{cm/s}" />
          <FormulaBox latex="|\vec v_{\text{gj}}|=\sqrt{5{,}0^2+5{,}0^2}\approx 7{,}1\;\text{cm/s},\quad \theta=45^\circ" />
          <p>
            Siden <InlineLatex latex="v_x=v_y" /> blir vinkelen akkurat 45° over +x-aksen.
          </p>
        </Step>
        <Step n={3} title="Momentanhastighet (b)">
          <p>
            Vi bruker standard regneregler: <InlineLatex latex="\dfrac{d}{dt}(\text{konst.})=0" />,
            <InlineLatex latex="\;\dfrac{d}{dt}(at^2)=2at" />, <InlineLatex latex="\;\dfrac{d}{dt}(bt)=b" />.
          </p>
          <FormulaBox variant="blue" latex="\vec v(t) = \dfrac{d\vec r}{dt} = \dfrac{dx}{dt}\hat i + \dfrac{dy}{dt}\hat j" />
          <FormulaBox variant="gold" latex="\vec v(t)=\dfrac{d\vec r}{dt}=(5{,}0\,t)\hat i+5{,}0\,\hat j\;[\text{cm/s}]" />
          <p>
            <strong>Fysisk tolkning:</strong> x-komponenten vokser lineært med tiden (prikken akselererer i x),
            mens y-komponenten er konstant på 5,0 cm/s. At gjennomsnittet mellom 0 og 2 s akkurat ble 5,0 cm/s i
            x-retning er ingen tilfeldighet: for en lineært voksende hastighet er gjennomsnittet
            midten av intervallet, altså verdien ved <InlineLatex latex="t=1" /> s.
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Retningen til en hastighetsvektor i 2D bestemmes av forholdet mellom komponentene,
          ikke av størrelsene hver for seg. For vinkelen <InlineLatex latex="\theta" /> målt fra +x-aksen gjelder:
        </p>
        <FormulaBox variant="blue" latex="\tan\theta = \dfrac{v_y}{v_x}" />
        <p>
          En vinkel på 45° betyr at <InlineLatex latex="\tan 45^\circ = 1" />, altså <InlineLatex latex="v_y = v_x" />.
          For å finne når dette skjer må vi først ha et uttrykk for <InlineLatex latex="\vec v(t)" />, som vi får ved
          å derivere posisjonsvektoren komponentvis:
        </p>
        <FormulaBox variant="blue" latex="\vec v(t) = \dfrac{d\vec r}{dt}" />

        <Step n={1} title="Deriver komponentene">
          <p>
            Med <InlineLatex latex="\dfrac{d}{dt}(bt^2)=2bt" /> og <InlineLatex latex="\dfrac{d}{dt}(ct^3)=3ct^2" />:
          </p>
          <FormulaBox latex="\vec v(t)=2bt\,\hat i+3ct^2\,\hat j" />
        </Step>
        <Step n={2} title="Sett komponentene like">
          <p>
            Fra betingelsen <InlineLatex latex="v_x=v_y" />:
          </p>
          <FormulaBox latex="2bt=3ct^2\;\Rightarrow\;3ct^2 - 2bt = 0 \;\Rightarrow\; t(3ct-2b)=0" />
          <p>
            Vi faktoriserte ut <InlineLatex latex="t" /> fordi likningen alltid er oppfylt ved <InlineLatex latex="t=0" />.
            Men ved <InlineLatex latex="t=0" /> er både <InlineLatex latex="v_x" /> og <InlineLatex latex="v_y" /> null —
            vektoren har ikke veldefinert retning, så dette er ikke en fysisk meningsfull løsning.
          </p>
        </Step>
        <Step n={3} title="Ikke-triviell løsning">
          <p>Den andre faktoren gir løsningen vi søker:</p>
          <FormulaBox latex="3ct - 2b = 0 \;\Rightarrow\; t = \dfrac{2b}{3c}" />
          <FormulaBox variant="gold" latex="\boxed{\;t=\dfrac{2b}{3c}\;}" />
          <p className="italic text-[var(--muted)]">
            Ved <InlineLatex latex="t=0" /> er hastigheten null (tvetydig retning). Den første
            ikke-trivielle løsningen er <InlineLatex latex="t=2b/(3c)" />.
          </p>
          <p>
            <strong>Fysisk tolkning:</strong> Før dette tidspunktet dominerer <InlineLatex latex="v_x\sim t" />
            (partikkelen beveger seg mer horisontalt), og etter dette dominerer <InlineLatex latex="v_y\sim t^2" />
            (kurven bøyer seg stadig brattere oppover). Sjekk enheter: <InlineLatex latex="[b]/[c]" /> har tidsenhet
            fordi <InlineLatex latex="[b]=\text{m/s}^2" /> og <InlineLatex latex="[c]=\text{m/s}^3" />, så uttrykket er dimensjonelt riktig.
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Akselerasjon er endringsraten til <em>hastighetsvektoren</em>. Siden hastighet har
          både størrelse og retning, kan vi ha akselerasjon uten at farten endres — det er nok at retningen endrer seg.
          Dette er helt analogt til hvordan <InlineLatex latex="\vec v = d\vec r/dt" /> defineres, bare én derivasjon til.
        </p>
        <p>Originalformelen fra læreboken (Young &amp; Freedman 3.8):</p>
        <FormulaBox variant="blue" latex="\vec a_{\text{gj}} = \dfrac{\vec v_2 - \vec v_1}{t_2 - t_1} = \dfrac{\Delta \vec v}{\Delta t}" />
        <p>
          Som med hastighet regner vi komponentvis: <InlineLatex latex="a_{x,\text{gj}} = \Delta v_x/\Delta t" /> og
          <InlineLatex latex="\;a_{y,\text{gj}} = \Delta v_y/\Delta t" />.
        </p>

        <Step n={1} title="Endring i hastighet">
          <p>Trekk komponentene fra hverandre:</p>
          <FormulaBox latex="\Delta \vec v=(-170-90)\hat i+(40-110)\hat j=(-260\hat i-70\hat j)\;\text{m/s}" />
          <p>
            Det negative x-tallet (−260) betyr at flyet har reversert horisontal retning i løpet av 30 s —
            en enorm endring i bevegelse.
          </p>
        </Step>
        <Step n={2} title="Gjennomsnittsakselerasjon">
          <p>Del på <InlineLatex latex="\Delta t = 30{,}0\;\text{s}" />:</p>
          <FormulaBox latex="\vec a_{\text{gj}}=\dfrac{\Delta \vec v}{\Delta t}=\left(-\dfrac{260}{30}\hat i-\dfrac{70}{30}\hat j\right)\approx(-8{,}67\hat i-2{,}33\hat j)\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="Størrelse og retning">
          <p>Størrelse via Pythagoras:</p>
          <FormulaBox variant="blue" latex="|\vec a_{\text{gj}}| = \sqrt{a_x^2 + a_y^2}" />
          <FormulaBox latex="|\vec a_{\text{gj}}|=\sqrt{8{,}67^2+2{,}33^2}\approx 8{,}98\;\text{m/s}^2" />
          <p>
            <strong>Obs på kvadranten:</strong> Både <InlineLatex latex="a_x" /> og <InlineLatex latex="a_y" /> er negative,
            så vektoren ligger i 3. kvadrant. Arctangens alene (som gir svar i intervallet −90° til 90°) kan lure oss.
            Regn ut arctangens av forholdet og legg til 180°:
          </p>
          <p>
            <InlineLatex latex="\theta=\arctan\!\left(\dfrac{-2{,}33}{-8{,}67}\right)=15^\circ" /> under <InlineLatex latex="-x" />-aksen,
            dvs. <InlineLatex latex="180^\circ+15^\circ=195^\circ" /> fra <InlineLatex latex="+x" />-aksen.
          </p>
          <FormulaBox variant="gold" latex="\boxed{\;|\vec a_{\text{gj}}|\approx 9{,}0\;\text{m/s}^2\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> En akselerasjon på ~9 m/s² er nesten 1 g — en stor manøver.
            Akselerasjonsretningen (195°) er veldig forskjellig fra hastighetsretningene, som nettopp er det som
            gjør at flybanen krummer skarpt.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når posisjonen er gitt som en funksjon av tiden, får vi hastigheten ved å derivere
          én gang og akselerasjonen ved å derivere to ganger. Dette er en direkte 2D-utvidelse av kinematikken fra kap. 2:
        </p>
        <FormulaBox variant="blue" latex="\vec v(t) = \dfrac{d\vec r}{dt}, \qquad \vec a(t) = \dfrac{d\vec v}{dt} = \dfrac{d^2\vec r}{dt^2}" />
        <p>
          Den viktigste regneregelen er potensregelen: <InlineLatex latex="\dfrac{d}{dt}(At^n) = nAt^{n-1}" />.
          Vi deriverer komponentvis — <InlineLatex latex="\hat i" />- og <InlineLatex latex="\hat j" />-retningene er uavhengige.
        </p>

        <Step n={1} title="Hastighetsvektor">
          <p>
            x-komponenten <InlineLatex latex="x(t)=-3{,}0t+5{,}0t^2" /> deriveres til <InlineLatex latex="-3{,}0 + 10{,}0t" />.
            y-komponenten <InlineLatex latex="y(t)=4{,}0t^2+t^3" /> deriveres til <InlineLatex latex="8{,}0t + 3{,}0t^2" />.
          </p>
          <FormulaBox latex="\vec v(t)=(-3{,}0+10{,}0\,t)\hat i+(8{,}0\,t+3{,}0\,t^2)\hat j\;[\text{m/s}]" />
        </Step>
        <Step n={2} title="Akselerasjonsvektor">
          <p>Deriver hastighetskomponentene på nytt:</p>
          <FormulaBox latex="\vec a(t)=10{,}0\,\hat i+(8{,}0+6{,}0\,t)\hat j\;[\text{m/s}^2]" />
          <p>
            Merk: akselerasjonen i x-retning er konstant, men den i y-retning vokser lineært med tiden — altså er ikke
            bevegelsen jevnt akselerert.
          </p>
        </Step>
        <Step n={3} title="Ved t = 2,0 s">
          <p>Sett inn <InlineLatex latex="t=2{,}0" /> s: <InlineLatex latex="v_x = -3+20 = 17" /> m/s, <InlineLatex latex="\;v_y = 16+12 = 28" /> m/s.</p>
          <FormulaBox latex="\vec v(2)=(17\hat i+28\hat j)\;\text{m/s}" />
          <FormulaBox variant="blue" latex="|\vec v| = \sqrt{v_x^2 + v_y^2}, \qquad \theta = \arctan(v_y/v_x)" />
          <FormulaBox latex="|\vec v|=\sqrt{17^2+28^2}=\sqrt{1073}\approx 32{,}8\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\theta=\arctan(28/17)\approx 58{,}7^\circ\text{ over }+x" />
          <p>
            <strong>Fysisk tolkning:</strong> Ved t = 2,0 s løper prærieulven med ca. 33 m/s (~118 km/t — urealistisk
            men matematisk ok) i en retning nordøstlig skrått oppover. Siden både <InlineLatex latex="v_x" /> og <InlineLatex latex="v_y" /> er positive, ligger vektoren i 1. kvadrant og arctangens gir vinkelen direkte.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er «omvendt» oppgave av 3.5 — der fant vi akselerasjonen fra to hastigheter;
          her er akselerasjonen kjent og vi skal finne den endelige hastigheten. Nøkkelen er å snu definisjonen
          <InlineLatex latex="\vec a_{\text{gj}} = \Delta \vec v/\Delta t" /> om:
        </p>
        <FormulaBox variant="blue" latex="\vec v_2 = \vec v_1 + \vec a_{\text{gj}}\,\Delta t" />
        <p>
          Men før vi kan legge sammen vektorene må vi ha dem i samme form. Akselerasjonen er gitt i
          polarform (størrelse + vinkel), mens hastigheten er i komponentform. Vi dekomponerer derfor
          akselerasjonen til <InlineLatex latex="\hat i" />- og <InlineLatex latex="\hat j" />-komponenter:
        </p>
        <FormulaBox variant="blue" latex="a_x = |\vec a|\cos\theta, \qquad a_y = |\vec a|\sin\theta" />

        <Step n={1} title="Komponenter av a">
          <p>Med <InlineLatex latex="|\vec a|=0{,}45\;\text{m/s}^2" /> og <InlineLatex latex="\theta=31^\circ" />:</p>
          <FormulaBox latex="a_x=0{,}45\cos 31^\circ\approx 0{,}386\;\text{m/s}^2,\quad a_y=0{,}45\sin 31^\circ\approx 0{,}232\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="Endring i hastighet">
          <p>Multiplisér hver akselerasjonskomponent med <InlineLatex latex="\Delta t = 10{,}0\;\text{s}" />:</p>
          <FormulaBox latex="\Delta v_x=0{,}386\cdot 10=3{,}86\;\text{m/s},\quad \Delta v_y=0{,}232\cdot 10=2{,}32\;\text{m/s}" />
        </Step>
        <Step n={3} title="Endelig hastighet">
          <p>
            Legg endringen til den opprinnelige hastigheten. Husk at <InlineLatex latex="v_{1y} = -1{,}8\;\text{m/s}" /> er negativ:
          </p>
          <FormulaBox latex="v_{2x}=2{,}6+3{,}86=6{,}46\;\text{m/s},\quad v_{2y}=-1{,}8+2{,}32=0{,}52\;\text{m/s}" />
          <FormulaBox latex="|\vec v_2|=\sqrt{6{,}46^2+0{,}52^2}\approx 6{,}48\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\theta=\arctan(0{,}52/6{,}46)\approx 4{,}6^\circ\text{ over }+x" />
          <p>
            <strong>Fysisk tolkning:</strong> Hunden akselererte skrått oppover til høyre, som var nok til å snu y-komponenten
            fra negativ (−1,8) til svakt positiv (+0,52). Sluttretningen er derfor nesten rett mot +x.
            Farten økte litt over det dobbelte — fra ~3,2 m/s til ~6,5 m/s.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> I prosjektilbevegelse uten luftmotstand er x- og y-bevegelsen helt uavhengige, men
          de deler den samme tiden <InlineLatex latex="t" />. Horisontalt virker ingen kraft, så farten er konstant:
          <InlineLatex latex="\;a_x=0" />. Vertikalt virker bare tyngdekraften: <InlineLatex latex="a_y=-g" />.
          Ved et horisontalt kast er <InlineLatex latex="v_{0y}=0" />, så boken starter med ren sidebevegelse og faller
          som om den bare ble sluppet.
        </p>
        <p>Kinematiske likninger fra kap. 2 (konstant akselerasjon) gir:</p>
        <FormulaBox variant="blue" latex="x(t) = v_{0x}\,t, \qquad y(t) = v_{0y}\,t - \tfrac{1}{2} g t^2, \qquad v_y(t) = v_{0y} - g t" />
        <p>
          Med <InlineLatex latex="v_{0y}=0" /> blir fallhøyden <InlineLatex latex="h = \tfrac{1}{2} g t^2" /> og vertikalfarten <InlineLatex latex="v_y = g t" />
          (vi regner <InlineLatex latex="h" /> og <InlineLatex latex="v_y" /> som positive nedover).
        </p>

        <Step n={1} title="(a) Høyde på bordet">
          <p>Høyden er akkurat det boken faller i løpet av 0,480 s:</p>
          <FormulaBox latex="h=\tfrac12 g t^2 = 0{,}5\cdot 9{,}80\cdot 0{,}480^2\approx 1{,}13\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Horisontal avstand">
          <p>
            Horisontalt beveger boken seg med konstant fart <InlineLatex latex="v_{0x}=1{,}10\;\text{m/s}" /> i samme
            tidsintervall:
          </p>
          <FormulaBox latex="x=v_{0x}\,t=1{,}10\cdot 0{,}480 = 0{,}528\;\text{m}" />
        </Step>
        <Step n={3} title="(c) Hastighet ved nedslag">
          <p>
            Horisontal fart er fortsatt 1,10 m/s (uendret). Vertikal fart har økt fra 0 til <InlineLatex latex="gt" />:
          </p>
          <FormulaBox latex="v_y=gt=9{,}80\cdot 0{,}480=4{,}70\;\text{m/s}" />
          <p>Total fart er vektorstørrelsen — bruk Pythagoras:</p>
          <FormulaBox variant="blue" latex="|\vec v| = \sqrt{v_x^2 + v_y^2}" />
          <FormulaBox latex="|\vec v|=\sqrt{1{,}10^2+4{,}70^2}\approx 4{,}83\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\boxed{\;h\approx 1{,}13\;\text{m},\;x\approx 0{,}528\;\text{m},\;|\vec v|\approx 4{,}83\;\text{m/s}\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> Vertikal fart (4,70 m/s) er mye større enn horisontal fart (1,10 m/s) ved nedslag —
            boken treffer gulvet nesten loddrett. Dette er typisk for lave startfarter: tyngdekraften dominerer raskt.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Horisontalt kast-problem: <InlineLatex latex="v_{0y}=0" /> og
          <InlineLatex latex="\;a_y=-g" />. Siden x- og y-bevegelse er uavhengige, er strategien nesten alltid å bruke
          den vertikale likningen til å finne tiden, og så sette tiden inn i den horisontale likningen.
        </p>
        <p>Originalformler fra kinematikken (konstant akselerasjon, fra kap. 2 / ligning 3.20–3.21):</p>
        <FormulaBox variant="blue" latex="\Delta y = \tfrac{1}{2} g t^2 \;\;(\text{for }v_{0y}=0), \qquad x = v_0\,t" />
        <p>
          «Minimum fart» betyr her at stuperen akkurat passerer hyllekanten. Dersom hun beveger seg litt fortere,
          flyr hun litt lenger ut — men farten kan ikke være mindre, for da treffer hun hyllen. Så vi krever at
          hun faller nøyaktig 9,00 m vertikalt mens hun beveger seg nøyaktig 1,75 m horisontalt.
        </p>

        <Step n={1} title="Falltid">
          <p>
            Vi løser den vertikale formelen for <InlineLatex latex="t" />:
          </p>
          <FormulaBox variant="blue" latex="\Delta y = \tfrac{1}{2} g t^2 \;\Rightarrow\; t = \sqrt{\dfrac{2\,\Delta y}{g}}" />
          <FormulaBox latex="t=\sqrt{\dfrac{2\Delta y}{g}}=\sqrt{\dfrac{2\cdot 9{,}00}{9{,}80}}\approx 1{,}355\;\text{s}" />
          <p>
            Dette er hvor lang tid fritt fall over 9 m tar — det samme for alle objekter, uavhengig av horisontalfart.
          </p>
        </Step>
        <Step n={2} title="Nødvendig horisontalfart">
          <p>
            I samme tid må hun tilbakelegge minst 1,75 m horisontalt. Snu <InlineLatex latex="x = v_0 t" /> om til <InlineLatex latex="v_0 = x/t" />:
          </p>
          <FormulaBox variant="gold" latex="v_0=\dfrac{x_{\min}}{t}=\dfrac{1{,}75}{1{,}355}\approx 1{,}29\;\text{m/s}" />
          <p>
            <strong>Fysisk tolkning:</strong> 1,29 m/s er knapt mer enn spasergang — overraskende lite. Grunnen er at
            fallet på 9 m tar lang tid (~1,4 s), og da rekker selv en liten horisontalfart langt. Merk at tiden ikke avhenger
            av <InlineLatex latex="v_0" /> — typisk tegn på et «kobling via tid»-problem.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Et prosjektil som startes og lander i samme høyde følger en parabelbane.
          Ved å skrive ned <InlineLatex latex="x(t)=v_0\cos\alpha_0\,t" /> og <InlineLatex latex="y(t)=v_0\sin\alpha_0\,t - \tfrac{1}{2}gt^2" />,
          finner vi flygetiden ved å sette <InlineLatex latex="y=0" />: <InlineLatex latex="\;t = 2v_0\sin\alpha_0/g" />.
          Setter vi denne tiden inn i x-likningen og bruker identiteten <InlineLatex latex="2\sin\alpha\cos\alpha = \sin(2\alpha)" />,
          får vi <em>rekkeviddeformelen</em>:
        </p>
        <FormulaBox variant="blue" latex="R = \dfrac{v_0^{\,2}\sin(2\alpha_0)}{g}" />
        <p>
          For maks høyde bruker vi at <InlineLatex latex="v_y=0" /> på toppen og setter det inn i
          <InlineLatex latex="\;v_y^2 = v_{0y}^2 - 2gh" />:
        </p>
        <FormulaBox variant="blue" latex="h = \dfrac{(v_0\sin\alpha_0)^2}{2g}" />
        <p>
          Her er rekkevidden kjent og vi skal finne <InlineLatex latex="v_0" />. Vi inverterer rekkeviddeformelen.
        </p>

        <Step n={1} title="(a) Startfart">
          <p>Løs rekkeviddeformelen for <InlineLatex latex="v_0" />:</p>
          <FormulaBox variant="blue" latex="R = \dfrac{v_0^{\,2}\sin(2\alpha_0)}{g} \;\Rightarrow\; v_0 = \sqrt{\dfrac{Rg}{\sin(2\alpha_0)}}" />
          <p>
            Sett inn <InlineLatex latex="R=115\;\text{m}" />, <InlineLatex latex="g=9{,}80\;\text{m/s}^2" />, <InlineLatex latex="2\alpha_0=60^\circ" />:
          </p>
          <FormulaBox latex="v_0=\sqrt{\dfrac{Rg}{\sin(2\alpha_0)}}=\sqrt{\dfrac{115\cdot 9{,}80}{\sin 60^\circ}}=\sqrt{1301}\approx 36{,}1\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Maks høyde">
          <p>
            Sett <InlineLatex latex="v_0=36{,}1" /> m/s og <InlineLatex latex="\alpha_0=30^\circ" /> inn i høydeformelen.
            Her er <InlineLatex latex="\sin 30^\circ = 0{,}5" /> og <InlineLatex latex="2g = 19{,}6" />:
          </p>
          <FormulaBox latex="h=\dfrac{(v_0\sin 30^\circ)^2}{2g}=\dfrac{(36{,}1\cdot 0{,}5)^2}{19{,}6}\approx 16{,}6\;\text{m}" />
          <FormulaBox variant="gold" latex="\boxed{\;v_0\approx 36{,}1\;\text{m/s},\;h\approx 16{,}6\;\text{m}\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> 36,1 m/s er ca. 130 km/t — realistisk for en kraftig slagmann.
            Ballen stiger til ca. 17 m, mer enn taket på en trippelbuss. Hadde man slått ballen med 45° i stedet (maks rekkevidde-vinkelen),
            ville samme startfart gitt <InlineLatex latex="R=v_0^2/g \approx 133" /> m — enda lenger.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Rekkeviddeformelen <InlineLatex latex="R = v_0^2\sin(2\alpha_0)/g" /> forutsetter at
          start- og sluttpunkt ligger i samme høyde. Her starter kulen 1,83 m over bakken, så landingshøyden er annerledes
          enn starthøyden. Vi må gå tilbake til de grunnleggende kinematiske likningene:
        </p>
        <FormulaBox variant="blue" latex="x(t) = v_{0x}\,t, \qquad y(t) = y_0 + v_{0y}\,t - \tfrac{1}{2} g t^2" />
        <p>
          Strategien er: (1) dekomponer <InlineLatex latex="v_0" /> i x- og y-komponenter, (2) finn tiden kulen treffer bakken
          ved å sette <InlineLatex latex="y(t)=0" />, (3) sett denne tiden inn i x-likningen for å finne rekkevidden.
          Fordi y-likningen er en annengradslikning i <InlineLatex latex="t" />, må vi bruke abc-formelen:
        </p>
        <FormulaBox variant="blue" latex="t = \dfrac{-B \pm \sqrt{B^2 - 4AC}}{2A}" />

        <Step n={1} title="Komponenter">
          <p>Standard dekomposisjon:</p>
          <FormulaBox variant="blue" latex="v_{0x} = v_0\cos\alpha_0, \qquad v_{0y} = v_0\sin\alpha_0" />
          <FormulaBox latex="v_{0x}=12{,}4\cos 51^\circ\approx 7{,}80\;\text{m/s},\quad v_{0y}=12{,}4\sin 51^\circ\approx 9{,}64\;\text{m/s}" />
        </Step>
        <Step n={2} title="Tid til nedslag">
          <p>
            La nedslag være ved <InlineLatex latex="y=0" /> (bakken) med start <InlineLatex latex="y_0=1{,}83\;\text{m}" />:
          </p>
          <FormulaBox latex="0 = 1{,}83 + 9{,}64\,t - \tfrac{1}{2}(9{,}80)t^2" />
          <p>
            Setter <InlineLatex latex="1{,}83+9{,}64\,t-4{,}90\,t^2=0" />, dvs. <InlineLatex latex="4{,}90t^2-9{,}64t-1{,}83=0" />.
            Her er <InlineLatex latex="A=4{,}90" />, <InlineLatex latex="B=-9{,}64" />, <InlineLatex latex="C=-1{,}83" />.
            Vi tar den positive roten fordi tiden må være positiv:
          </p>
          <FormulaBox latex="t=\dfrac{9{,}64+\sqrt{9{,}64^2+4\cdot 4{,}90\cdot 1{,}83}}{2\cdot 4{,}90}=\dfrac{9{,}64+\sqrt{92{,}9+35{,}9}}{9{,}80}\approx 2{,}14\;\text{s}" />
          <p>
            Merk at leddet <InlineLatex latex="+4\cdot 4{,}90\cdot 1{,}83" /> under rottegnet kommer fra at <InlineLatex latex="C<0" />
            (<InlineLatex latex="-4AC" /> blir positivt). Dette gjør at tiden blir litt <em>lenger</em> enn den ville vært
            ved lik start- og slutthøyde.
          </p>
        </Step>
        <Step n={3} title="Horisontal avstand">
          <p>
            Sett tiden inn i <InlineLatex latex="x=v_{0x}\,t" />:
          </p>
          <FormulaBox variant="gold" latex="x=v_{0x}\,t=7{,}80\cdot 2{,}14\approx 16{,}7\;\text{m}" />
          <p>
            <strong>Fysisk tolkning:</strong> Ekstra starthøyde på bare 1,83 m gir ikke mye ekstra rekkevidde her, men
            det gjør at vi ikke kan bruke «rekkeviddeformelen» direkte. Generelt må man alltid sette opp
            <InlineLatex latex="y(t)=0" /> eksplisitt når start- og landingshøyde er forskjellige.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er et klassisk prosjektilproblem der vi vet <em>hvor</em> mynten skal lande
          (horisontal avstand og høyde ukjent) men har startbetingelsene (v₀ og α₀). Siden x- og y-bevegelsen er
          uavhengige, men deler den samme tiden <InlineLatex latex="t" />, er strategien: bruk x-likningen til å finne
          tiden (fordi vi har alt vi trenger der), og sett så tiden inn i y-likningen for å finne høyden.
        </p>
        <p>Originalformlene (kinematikk for prosjektilbevegelse, Young &amp; Freedman 3.20–3.22):</p>
        <FormulaBox variant="blue" latex="x(t) = v_{0x}\,t, \qquad y(t) = v_{0y}\,t - \tfrac{1}{2} g t^2, \qquad v_y(t) = v_{0y} - g t" />
        <p>
          <strong>Hvorfor denne formelen og ikke en annen?</strong> Vi bruker komponentligningene fordi prosjektiler
          har <InlineLatex latex="a_x = 0" /> og <InlineLatex latex="a_y = -g" /> — to uavhengige 1D-bevegelser. Vi kan
          ikke bruke «1D-kinematikk på total fart» fordi farten har to komponenter som oppfører seg helt ulikt.
        </p>
        <p>
          <strong>Koordinatvalg:</strong> x-aksen peker horisontalt mot skålen, y-aksen peker opp. Med y-aksen opp blir
          <InlineLatex latex="\;a_y = -g" /> (gravitasjonen peker motsatt y).
        </p>

        <Step n={1} title="Dekomponer starthastigheten">
          <p>
            Startvektoren <InlineLatex latex="\vec v_0" /> har størrelse 6,4 m/s og vinkel 60° over horisontalen. Vi
            dekomponerer med trigonometri — x-komponenten ligger langs hosliggende katet og y-komponenten langs motstående:
          </p>
          <FormulaBox variant="blue" latex="v_{0x} = v_0\cos\alpha_0, \qquad v_{0y} = v_0\sin\alpha_0" />
          <FormulaBox latex="v_{0x}=6{,}4\cos 60^\circ=6{,}4\cdot 0{,}5=3{,}20\;\text{m/s}" />
          <FormulaBox latex="v_{0y}=6{,}4\sin 60^\circ=6{,}4\cdot 0{,}866\approx 5{,}54\;\text{m/s}" />
        </Step>
        <Step n={2} title="Finn tiden fra horisontal bevegelse">
          <p>
            Horisontalt er <InlineLatex latex="v_x = v_{0x}" /> konstant (ingen akselerasjon), så <InlineLatex latex="x = v_{0x}\,t" />.
            Vi snur denne om til <InlineLatex latex="t = x/v_{0x}" />:
          </p>
          <FormulaBox variant="blue" latex="t = \dfrac{D}{v_{0x}}" />
          <FormulaBox latex="t=\dfrac{2{,}1}{3{,}20}\approx 0{,}656\;\text{s}" />
          <p>
            Dette er flytiden. Den er felles for x- og y-bevegelsen. <strong>Enhetssjekk:</strong> m/(m/s) = s. OK.
          </p>
        </Step>
        <Step n={3} title="(a) Høyde fra vertikal likning">
          <p>
            Med tiden kjent, setter vi den inn i y-likningen. Leddet <InlineLatex latex="v_{0y}t" /> er den vertikale
            avstanden mynten ville steget uten tyngde; leddet <InlineLatex latex="-\tfrac12 g t^2" /> er hvor mye den
            faller på grunn av tyngden. Differansen er den faktiske høyden:
          </p>
          <FormulaBox variant="blue" latex="h = v_{0y}\,t - \tfrac{1}{2} g t^2" />
          <FormulaBox latex="h=5{,}54\cdot 0{,}656-\tfrac12\cdot 9{,}80\cdot 0{,}656^2\approx 3{,}63-2{,}11=1{,}53\;\text{m}" />
          <p>
            <strong>Enhetssjekk:</strong> (m/s)·s − (m/s²)·s² = m. OK.
          </p>
        </Step>
        <Step n={4} title="(b) Vertikal fart ved nedslag">
          <p>
            Bruk <InlineLatex latex="v_y = v_{0y} - g t" /> — dette er rett og slett «startfart minus
            akselerasjon·tid», direkte fra kinematikken med konstant akselerasjon:
          </p>
          <FormulaBox variant="blue" latex="v_y(t) = v_{0y} - g t" />
          <FormulaBox variant="gold" latex="v_y=v_{0y}-gt=5{,}54-9{,}80\cdot 0{,}656\approx -0{,}89\;\text{m/s}" />
          <p className="italic text-[var(--muted)]">
            Negativt tegn betyr at mynten er på vei <em>nedover</em> når den lander —
            altså har den allerede passert toppunktet.
          </p>
          <p>
            <strong>Fysisk tolkning:</strong> Mynten når toppunktet ved <InlineLatex latex="t^\ast = v_{0y}/g \approx 0{,}566" /> s
            (tidspunktet hvor <InlineLatex latex="v_y = 0" />). Nedslaget skjer ved <InlineLatex latex="t \approx 0{,}656" /> s,
            altså like etter. Derfor er vertikalfarten bare svakt negativ (−0,89 m/s). Skålen er plassert nesten akkurat
            i toppen av banen — en vanlig opplagt arkitektur for tivolispill: man sikter «oppover, ikke fremover».
            Sammenlignet med å kaste en stein fra skulderhøyde (~1,5 m) er det fornuftig at skålen er ca. 1,5 m over
            kastepunktet.
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Jevn sirkelbevegelse betyr at et objekt går rundt i sirkel med konstant <em>fart</em>
          (størrelse av hastigheten), men ikke konstant <em>hastighet</em> — retningen endres kontinuerlig. Derfor
          har det en akselerasjon som peker innover mot sentrum (sentripetalakselerasjon). Farten regnes ut ved
          «omkrets delt på omløpstid», og akselerasjonen ved <InlineLatex latex="a = v^2/R" />.
        </p>
        <p>Originalformlene (Young &amp; Freedman 3.28–3.30):</p>
        <FormulaBox variant="blue" latex="v = \dfrac{2\pi R}{T}, \qquad a_{\text{rad}} = \dfrac{v^2}{R} = \dfrac{4\pi^2 R}{T^2}" />
        <p>
          <strong>Hvorfor disse formlene?</strong> Per omløp tilbakelegger objektet omkretsen <InlineLatex latex="2\pi R" />
          på tid <InlineLatex latex="T" />, så <InlineLatex latex="v = 2\pi R/T" /> følger direkte av definisjonen av
          gjennomsnittsfart langs banen. Siden farten er konstant, er også momentanfarten lik dette. Akselerasjonen
          <InlineLatex latex="v^2/R" /> utledes ved å se på hvor raskt hastighetsvektoren roterer — resultatet er uavhengig
          av masse og peker alltid mot sentrum.
        </p>

        <Step n={1} title="Enhetssjekk og konvertering">
          <p>
            Radien er gitt i km og må konverteres til m: <InlineLatex latex="1{,}50\times 10^8\;\text{km} = 1{,}50\times 10^{11}\;\text{m}" />.
            Omløpstiden konverteres fra dager til sekunder:
          </p>
          <FormulaBox latex="T = 365\cdot 24\cdot 3600\;\text{s}\approx 3{,}154\times 10^{7}\;\text{s}" />
        </Step>
        <Step n={2} title="(a) Banehastighet">
          <p>Sett inn i originalformelen:</p>
          <FormulaBox variant="blue" latex="v = \dfrac{2\pi R}{T}" />
          <FormulaBox latex="v=\dfrac{2\pi\cdot 1{,}50\times 10^{11}}{3{,}154\times 10^{7}}\approx 2{,}99\times 10^{4}\;\text{m/s}" />
          <p>
            Det er ca. <strong>30 km/s</strong> — en enorm fart. Jorden tilbakelegger Oslo–Bergen-avstanden (~400 km)
            hvert 13. sekund. Enhetssjekk: m/s = m/s. OK.
          </p>
        </Step>
        <Step n={3} title="(b) Sentripetalakselerasjon">
          <p>
            Med farten kjent setter vi inn i <InlineLatex latex="a_{\text{rad}} = v^2/R" />. Enheter:
            <InlineLatex latex="\;(\text{m/s})^2/\text{m} = \text{m/s}^2" />. OK.
          </p>
          <FormulaBox variant="blue" latex="a_{\text{rad}} = \dfrac{v^2}{R}" />
          <FormulaBox variant="gold" latex="a_{\text{rad}}=\dfrac{v^2}{R}=\dfrac{(2{,}99\times 10^4)^2}{1{,}50\times 10^{11}}\approx 5{,}95\times 10^{-3}\;\text{m/s}^2" />
          <p>
            <strong>Fysisk tolkning:</strong> Akselerasjonen er bare ~6 mm/s² — over <em>1600 ganger mindre enn g</em>
            på jordens overflate. Men det er nettopp denne lille akselerasjonen, opprettholdt hele tiden, som bøyer
            jordens bane til en lukket sirkel rundt solen istedet for en rett linje. Akselerasjonen peker hele tiden
            mot solen; det er solens gravitasjon som leverer den. Vi kan også uttrykke den som
            <InlineLatex latex="\;a = 4\pi^2 R/T^2 \approx 5{,}95\cdot 10^{-3}\;\text{m/s}^2" /> — samme svar, viser konsistens.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Akselerasjon er generelt en vektor med to komponenter i sirkelbevegelse: en
          <em>tangentiell</em> del <InlineLatex latex="a_t = dv/dt" /> som endrer størrelsen av farten, og en
          <em>radiell</em> (sentripetal) del <InlineLatex latex="a_{\text{rad}} = v^2/R" /> som endrer retningen og
          peker mot sentrum av sirkelen.
        </p>
        <FormulaBox variant="blue" latex="\vec a = \vec a_{\text{tang}} + \vec a_{\text{rad}}, \qquad a_{\text{rad}} = \dfrac{v^2}{R}" />
        <p>
          <strong>Hvorfor bare radiell her?</strong> Oppgaven sier at farten langs rim er <em>konstant</em> (6,00 m/s).
          Det betyr <InlineLatex latex="dv/dt = 0" />, så tangentialakselerasjonen er null. Hele akselerasjonen er radiell
          og peker mot sentrum. Dette kalles «jevn sirkelbevegelse» — et spesialtilfelle.
        </p>
        <p>
          <strong>Koordinatvalg/fortegnsanalyse:</strong> Siden akselerasjonen alltid peker mot sentrum, endrer dens
          retning seg når passasjerens posisjon endrer seg, selv om <em>størrelsen</em> er konstant. Det er nettopp
          denne endrende retningen som kjennetegner sirkelbevegelse.
        </p>

        <Step n={1} title="Størrelsen av akselerasjonen">
          <p>
            Sett inn <InlineLatex latex="v = 6{,}00" /> m/s og <InlineLatex latex="R = 14{,}0" /> m. Enhetssjekk:
            <InlineLatex latex="(\text{m/s})^2/\text{m} = \text{m/s}^2" />. OK.
          </p>
          <FormulaBox variant="blue" latex="a_{\text{rad}} = \dfrac{v^2}{R}" />
          <FormulaBox latex="a_{\text{rad}}=\dfrac{v^2}{R}=\dfrac{6{,}00^2}{14{,}0}=\dfrac{36{,}0}{14{,}0}\approx 2{,}57\;\text{m/s}^2" />
          <p>
            Dette er <em>uavhengig</em> av hvor passasjeren befinner seg på rimen — størrelsen er konstant så lenge
            farten og radien er konstant.
          </p>
        </Step>
        <Step n={2} title="Retning på hvert punkt">
          <p>
            Siden akselerasjonen alltid peker fra passasjeren og rett mot sentrum av pariserhjulet, avhenger selve
            retningen av hvor passasjeren er:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>(a) <strong>Laveste punkt:</strong> sentrum ligger rett ovenfor → akselerasjonen peker rett opp.</li>
            <li>(b) <strong>Høyeste punkt:</strong> sentrum ligger rett under → akselerasjonen peker rett ned.</li>
          </ul>
          <FormulaBox variant="gold" latex="\boxed{\;a\approx 2{,}57\;\text{m/s}^2\;\text{mot sentrum på begge punkter}\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> 2,57 m/s² er ca. 0,26 g — knapt merkbart, men nok til å skape opplevelsen
            av å «veies litt tyngre» på bunnen (der opplevd vekt er <InlineLatex latex="m(g + a_{\text{rad}})" />) og
            «litt lettere» på toppen (<InlineLatex latex="m(g - a_{\text{rad}})" />). Vi kjenner dette igjen fra berg-
            og dalbane-loops, der samme prinsipp gjelder bare med langt større <InlineLatex latex="a_{\text{rad}}" />.
            Sammenlign med jorden rundt solen (3.25) hvor <InlineLatex latex="a_{\text{rad}} \sim 6\cdot 10^{-3}" /> m/s²
            — pariserhjulet er ca. 400 ganger «raskere-svinget» til tross for at det går mye saktere. Nøkkelen er liten radius.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> For et roterende objekt har ethvert punkt en lineær fart <InlineLatex latex="v = \omega R" />
          der <InlineLatex latex="\omega" /> er vinkelhastigheten (rad/s) og <InlineLatex latex="R" /> er avstanden fra
          rotasjonsaksen. Vi kan også skrive dette som <InlineLatex latex="v = 2\pi R f" /> der <InlineLatex latex="f" />
          er frekvens i omdreininger per sekund. Akselerasjonen til ethvert slikt punkt er rent radiell siden farten er
          konstant: <InlineLatex latex="\;a_{\text{rad}} = v^2/R" />.
        </p>
        <p>Originalformlene (Young &amp; Freedman 3.28, 9.14 for vinkelhastighet):</p>
        <FormulaBox variant="blue" latex="\omega = 2\pi f, \qquad v = \omega R = 2\pi R f, \qquad a_{\text{rad}} = \dfrac{v^2}{R} = \omega^2 R" />
        <p>
          <strong>Hvorfor må vi konvertere rpm til rev/s?</strong> Formlene bruker SI-enheter: sekunder, ikke minutter.
          «Omdreining per minutt» (rpm) må derfor deles på 60 før vi kan sette inn. Eventuelt konverterer vi helt til
          rad/s, siden 1 omdreining = <InlineLatex latex="2\pi" /> rad.
        </p>

        <Step n={1} title="Enhetskonvertering">
          <p>Konverter frekvensen fra rpm til rev/s:</p>
          <FormulaBox latex="f = \dfrac{550\;\text{rev}}{1\;\text{min}}\cdot \dfrac{1\;\text{min}}{60\;\text{s}}=9{,}167\;\text{rev/s}" />
          <p>
            Tilsvarende vinkelhastighet:
            <InlineLatex latex="\;\omega = 2\pi\cdot 9{,}167\approx 57{,}6\;\text{rad/s}" />. Begge uttrykker det samme
            tempoet, bare i ulike enheter.
          </p>
        </Step>
        <Step n={2} title="(a) Lineær fart ved bladspissen">
          <p>
            Bladspissen ligger lengst fra aksen, <InlineLatex latex="R = 3{,}40" /> m. Originalformelen
            <InlineLatex latex="v = 2\pi R f" /> gir:
          </p>
          <FormulaBox variant="blue" latex="v = 2\pi R f" />
          <FormulaBox latex="v=2\pi\cdot 3{,}40\cdot 9{,}167\approx 196\;\text{m/s}" />
          <p className="italic text-[var(--muted)]">
            Det er omtrent lydens hastighet (~343 m/s ved 20 °C) — bladspissen går faktisk i ca. Mach 0,57.
            Dette er derfor ekte helikopterblader designes for å holde seg unna lydbarrieren: støy, turbulens og
            belastning blir ekstreme når <InlineLatex latex="v \sim c_{\text{lyd}}" />.
          </p>
        </Step>
        <Step n={3} title="(b) Radiell akselerasjon">
          <p>
            Sett inn i <InlineLatex latex="a = v^2/R" />. Enhetssjekk: <InlineLatex latex="(\text{m/s})^2/\text{m} = \text{m/s}^2" />. OK.
          </p>
          <FormulaBox variant="blue" latex="a_{\text{rad}} = \dfrac{v^2}{R}" />
          <FormulaBox latex="a=\dfrac{v^2}{R}=\dfrac{196^2}{3{,}40}\approx 1{,}13\times 10^4\;\text{m/s}^2" />
          <p>For å uttrykke i g-enheter deler vi på <InlineLatex latex="g = 9{,}80\;\text{m/s}^2" />:</p>
          <FormulaBox variant="gold" latex="\dfrac{a}{g}=\dfrac{1{,}13\times 10^4}{9{,}80}\approx 1{,}15\times 10^{3}\;g\approx 1150\,g" />
          <p>
            <strong>Fysisk tolkning:</strong> 1150 g er en enorm akselerasjon — en astronaut tåler ca. 9 g i noen sekunder
            før bevisstløshet. Bladmaterialet må tåle at hver gram ved spissen drar utover med 1150 ganger sin egen vekt
            (via Newtons 3. lov). Dette er derfor rotorblader alltid er laget av sterke komposittfibre eller titan og ofte
            kritisk belastede komponenter. Sammenlign med 3.25 (jordens bane, ~0,006 m/s²) og 3.28 (pariserhjul, ~2,57 m/s²):
            små radier + høye farter gir eksplosjonsartet store akselerasjoner.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er et <em>toframsersproblem</em>: først en fase med motorakselerasjon langs
          skråplanet (rettlinjet akselerasjon i skrå retning), så en fase med fritt fall (prosjektilbevegelse). Nøkkelen
          er at sluttilstanden fra fase 1 (posisjon + hastighet) er starttilstanden for fase 2. Dermed må vi være nøye
          med koordinatovergangen fra «langs skråplan» til «(x, y) i horisontalt/vertikalt koordinatsystem».
        </p>
        <p>
          <strong>Koordinatvalg:</strong> x-aksen er horisontal, y-aksen er vertikal opp. Skråplanet lager vinkel
          35° med +x-aksen. A ligger i origo.
        </p>

        <TheoryBox title="Originalformler">
          <p>Fase 1 (konstant akselerasjon langs skråplanet, fra hvile):</p>
          <FormulaBox variant="blue" latex="s = v_0 t + \tfrac{1}{2} a t^2, \qquad v = v_0 + a t" />
          <p>Fase 2 (prosjektil, <InlineLatex latex="a_x=0,\;a_y=-g" />):</p>
          <FormulaBox variant="blue" latex="x(t) = x_0 + v_{0x}\,t, \qquad y(t) = y_0 + v_{0y}\,t - \tfrac{1}{2} g t^2" />
        </TheoryBox>

        <Step n={1} title="Fase 1: avstand og fart ved motorstans">
          <p>
            Raketten starter fra hvile (<InlineLatex latex="v_0=0" />) og har konstant akselerasjon
            <InlineLatex latex="\;a_1 = 1{,}90" /> m/s² <em>langs skråplanet</em> i <InlineLatex latex="t_1=22{,}0" /> s.
            Tilbakelagt avstand langs skråplanet:
          </p>
          <FormulaBox latex="s=\tfrac12 a_1 t_1^2=\tfrac12\cdot 1{,}90\cdot 22{,}0^2=460\;\text{m langs skråplan}" />
          <FormulaBox latex="v=a_1 t_1=1{,}90\cdot 22{,}0=41{,}8\;\text{m/s}" />
          <p>
            <strong>Dekomponer til horisontalt/vertikalt:</strong> En vektor med størrelse <InlineLatex latex="s" /> som
            peker 35° over horisontalen har komponenter <InlineLatex latex="s\cos 35^\circ" /> horisontalt og
            <InlineLatex latex="s\sin 35^\circ" /> vertikalt. Samme gjelder for hastigheten:
          </p>
          <FormulaBox variant="blue" latex="x_0 = s\cos\theta, \qquad y_0 = s\sin\theta, \qquad v_{0x} = v\cos\theta, \qquad v_{0y} = v\sin\theta" />
          <FormulaBox latex="x_0=460\cos 35^\circ\approx 377\;\text{m},\;y_0=460\sin 35^\circ\approx 264\;\text{m}" />
          <FormulaBox latex="v_{0x}=41{,}8\cos 35^\circ\approx 34{,}2\;\text{m/s},\;v_{0y}=41{,}8\sin 35^\circ\approx 24{,}0\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Maksimal høyde under fase 2">
          <p>
            Etter motorstans er det bare tyngdekraften. Vertikalt bremses raketten av g, og toppunktet er der
            <InlineLatex latex="v_y = 0" />. Vi bruker 1D-likningen <InlineLatex latex="v_y^2 = v_{0y}^2 - 2g\,\Delta h" />
            og løser for <InlineLatex latex="\Delta h" />:
          </p>
          <FormulaBox variant="blue" latex="v_y^2 = v_{0y}^2 - 2g\,\Delta h \;\Rightarrow\; \Delta h = \dfrac{v_{0y}^2}{2g}" />
          <FormulaBox latex="\Delta h=\dfrac{v_{0y}^2}{2g}=\dfrac{24{,}0^2}{19{,}6}\approx 29{,}4\;\text{m}" />
          <p>Total maksimal høyde over bakken er høyden ved motorstans pluss ekstra stigning:</p>
          <FormulaBox variant="gold" latex="H_{\max}=y_0+\Delta h\approx 264+29{,}4\approx 293\;\text{m}" />
        </Step>
        <Step n={3} title="(b) Flytid fra motorstans til bakken">
          <p>
            Raketten faller fra <InlineLatex latex="y_0 = 264" /> m ned til <InlineLatex latex="y = 0" />. Med
            <InlineLatex latex="\;y(t) = y_0 + v_{0y}t - \tfrac12 g t^2 = 0" />:
          </p>
          <FormulaBox latex="264 + 24{,}0\,t - 4{,}90\,t^2 = 0 \;\Rightarrow\; 4{,}90\,t^2-24{,}0\,t-264=0" />
          <p>
            Dette er en annengradslikning i <InlineLatex latex="t" /> med <InlineLatex latex="A=4{,}90,\;B=-24{,}0,\;C=-264" />.
            Abc-formelen gir to røtter; vi velger den positive (fysisk tid):
          </p>
          <FormulaBox variant="blue" latex="t = \dfrac{-B + \sqrt{B^2 - 4AC}}{2A}" />
          <FormulaBox latex="t=\dfrac{24{,}0+\sqrt{24{,}0^2+4\cdot 4{,}90\cdot 264}}{2\cdot 4{,}90}=\dfrac{24{,}0+\sqrt{576+5174}}{9{,}80}\approx 10{,}2\;\text{s}" />
        </Step>
        <Step n={4} title="(b) Horisontal rekkevidde">
          <p>
            I tiden <InlineLatex latex="t=10{,}2" /> s beveger raketten seg horisontalt med konstant fart
            <InlineLatex latex="v_{0x}=34{,}2" /> m/s (ingen horisontal akselerasjon etter motorstans):
          </p>
          <FormulaBox latex="\Delta x=v_{0x}\,t=34{,}2\cdot 10{,}2\approx 349\;\text{m}" />
          <p>Total horisontal avstand fra A er avstanden tilbakelagt i fase 1 pluss fase 2:</p>
          <FormulaBox variant="gold" latex="\boxed{\;R=x_0+\Delta x\approx 377+349\approx 725\;\text{m}\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> Raketten stiger til ~293 m (høyere enn Eiffeltårnet) og lander ca.
            725 m unna skytepunktet — realistisk for en liten testrakett. Merk at det meste av den horisontale distansen
            (377 m) skjer <em>under</em> motorfasen langs skråplanet; fase 2 (fritt fall) bidrar «bare» med 349 m til tross
            for 10 s flytid. Dette er fordi horisontalfarten aldri ble veldig høy — vinkelen 35° går mye tapt på vertikal
            stigning. En rakett avfyrt i flatere vinkel ville gått lenger.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er en generell <em>utledningsoppgave</em> — vi skal finne et symbolsk uttrykk,
          ikke et tall. Oppgaven er viktig fordi den viser hvordan rekkeviddeformelen utvides når start- og landingshøyde
          er ulike. Strategien er den samme som i 3.17 (kulestøt), men nå symbolsk. Vi setter opp
          komponentligningene, løser y(t) = 0 for tiden, og setter tiden inn i x-likningen.
        </p>
        <p>Originalformlene (prosjektilbevegelse, Young &amp; Freedman 3.20–3.21):</p>
        <FormulaBox variant="blue" latex="x(t) = v_0\cos\alpha_0\,t, \qquad y(t) = h + v_0\sin\alpha_0\,t - \tfrac{1}{2} g t^2" />
        <p>
          <strong>Koordinatvalg:</strong> Origo ved bygningens fot på bakken. x-aksen horisontalt, y-aksen opp. Derfor
          starter steinen ved <InlineLatex latex="(0, h)" /> og lander ved <InlineLatex latex="y = 0" />. Initialvektoren
          har komponenter <InlineLatex latex="v_{0x} = v_0\cos\alpha_0" />, <InlineLatex latex="\;v_{0y} = v_0\sin\alpha_0" />.
        </p>
        <p>
          <strong>Hvorfor ikke rekkeviddeformelen direkte?</strong> <InlineLatex latex="R = v_0^2\sin(2\alpha_0)/g" /> antar
          at steinen lander i samme høyde som den ble kastet. Her er <InlineLatex latex="h \neq 0" />, så den formelen er
          ugyldig og vi må bruke abc-formelen.
        </p>

        <Step n={1} title="Sett opp likningen for nedslag">
          <p>
            Steinen treffer bakken når <InlineLatex latex="y(t) = 0" />:
          </p>
          <FormulaBox latex="h + v_0\sin\alpha_0\,t - \tfrac12 g t^2 = 0" />
          <p>
            Vi multipliserer med −1 og omarrangerer til standardform <InlineLatex latex="At^2 + Bt + C = 0" />:
          </p>
          <FormulaBox latex="\tfrac12 g\,t^2 - v_0\sin\alpha_0\,t - h = 0" />
          <p>
            Her er <InlineLatex latex="A = \tfrac12 g" />, <InlineLatex latex="\;B = -v_0\sin\alpha_0" />,
            <InlineLatex latex="\;C = -h" />.
          </p>
        </Step>
        <Step n={2} title="Løs med abc-formelen">
          <p>Generell andregradsformel:</p>
          <FormulaBox variant="blue" latex="t = \dfrac{-B \pm \sqrt{B^2 - 4AC}}{2A}" />
          <p>Sett inn <InlineLatex latex="A, B, C" />:</p>
          <FormulaBox latex="t = \dfrac{v_0\sin\alpha_0 \pm \sqrt{v_0^2\sin^2\alpha_0 + 2gh}}{g}" />
          <p>
            <strong>Fortegnsvalg:</strong> Tiden må være positiv. Siden <InlineLatex latex="h > 0" />, er
            <InlineLatex latex="\;v_0^2\sin^2\alpha_0 + 2gh > v_0^2\sin^2\alpha_0" />, så kvadratroten er større enn
            <InlineLatex latex="v_0\sin\alpha_0" />. Bare plusstegnet gir positiv t; minustegnet gir negativ tid som forkastes
            (det ville tilsvart «når steinen var på bakken før kastet» — ikke fysisk).
          </p>
          <FormulaBox latex="t=\dfrac{v_0\sin\alpha_0+\sqrt{v_0^2\sin^2\alpha_0+2gh}}{g}" />
        </Step>
        <Step n={3} title="Horisontal avstand">
          <p>
            Horisontal bevegelse er uniform (ingen x-akselerasjon), så <InlineLatex latex="x = v_0\cos\alpha_0\,t" />.
            Multipliser tiden med <InlineLatex latex="v_0\cos\alpha_0" />:
          </p>
          <FormulaBox variant="blue" latex="x = v_0\cos\alpha_0\,t" />
          <FormulaBox variant="gold" latex="\boxed{\;x=\dfrac{v_0\cos\alpha_0}{g}\left(v_0\sin\alpha_0+\sqrt{v_0^2\sin^2\alpha_0+2gh}\right)\;}" />
        </Step>
        <Step n={4} title="Sannhetssjekk: h = 0 må gi rekkeviddeformelen">
          <p>
            Hvis <InlineLatex latex="h = 0" /> (samme start- og landingshøyde), skal uttrykket redusere til den kjente
            rekkeviddeformelen. Sett <InlineLatex latex="h = 0" />:
          </p>
          <FormulaBox latex="x = \dfrac{v_0\cos\alpha_0}{g}\left(v_0\sin\alpha_0 + \sqrt{v_0^2\sin^2\alpha_0}\right) = \dfrac{v_0\cos\alpha_0}{g}\cdot 2v_0\sin\alpha_0" />
          <p>Bruk identiteten <InlineLatex latex="2\sin\alpha\cos\alpha = \sin(2\alpha)" />:</p>
          <FormulaBox latex="x=\dfrac{v_0^2\sin 2\alpha_0}{g}" />
          <p>
            <strong>Perfekt</strong> — rekkeviddeformelen for lik start- og slutthøyde. Dette gir oss en god tiltro
            til at den generelle formelen er riktig.
          </p>
          <p>
            <strong>Fysisk tolkning:</strong> Leddet <InlineLatex latex="2gh" /> under kvadratroten representerer det
            «ekstra» fartstillegget steinen får ved å falle fra høyden <InlineLatex latex="h" />. Det tilsvarer kinetisk
            energi fra energibevaring: en stein som faller fritt fra høyde <InlineLatex latex="h" /> har
            <InlineLatex latex="v^2 = 2gh" />. Hvis <InlineLatex latex="h = 0" /> forsvinner leddet helt. Hvis
            <InlineLatex latex="v_0 = 0" /> (steinen bare slippes), reduseres uttrykket — men x blir 0 siden
            <InlineLatex latex="\cos\alpha_0" />-leddet også ganger hele.
          </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Oppgaven kombinerer prosjektilbevegelse med bevarelse av bevegelsesmengde (foregriper
          kap. 8). Ideen er at eksplosjonen er en kort, <em>intern</em> kraft — krefter mellom de to bitene som
          fragmenterer. Indre krefter kan ikke endre total bevegelsesmengde, selv om hver bit får helt nye hastigheter.
          Det betyr at granat-systemets impuls like før = impuls like etter eksplosjonen.
        </p>
        <FormulaBox variant="blue" latex="\vec p_{\text{før}} = \vec p_{\text{etter}} \;\Rightarrow\; (2m)\vec v_{\text{topp}} = m\vec v_1 + m\vec v_2" />
        <p>
          Tyngdekraften er også til stede under eksplosjonen, men siden eksplosjonen antas kort, endres bevegelsesmengden
          ubetydelig av gravitasjonen i selve eksplosjonsøyeblikket. Vi kan derfor analysere før/etter som om
          eksplosjonen er øyeblikkelig.
        </p>
        <p>
          <strong>Strategi i tre faser:</strong> (1) Bruk prosjektilkinematikk til å finne granatens posisjon og
          hastighet på toppunktet. (2) Bruk bevarelse av bevegelsesmengde for å finne farten til den flyvende biten
          etter eksplosjonen. (3) Bruk prosjektilkinematikk igjen for biten fra toppunktet til bakken.
        </p>

        <Step n={1} title="Fase 1 — granat opp til toppunktet">
          <p>
            Dekomponer startfarten. <InlineLatex latex="\cos 60^\circ = 0{,}5" /> og <InlineLatex latex="\sin 60^\circ \approx 0{,}866" />:
          </p>
          <FormulaBox variant="blue" latex="v_{0x} = v_0\cos\alpha_0, \qquad v_{0y} = v_0\sin\alpha_0" />
          <FormulaBox latex="v_{0x}=75{,}0\cos 60^\circ=37{,}5\;\text{m/s},\;v_{0y}=75{,}0\sin 60^\circ\approx 64{,}95\;\text{m/s}" />
          <p>
            Toppunktet er der <InlineLatex latex="v_y = 0" />. Fra <InlineLatex latex="v_y = v_{0y} - g t" /> får vi:
          </p>
          <FormulaBox variant="blue" latex="t_{\text{opp}} = \dfrac{v_{0y}}{g}" />
          <FormulaBox latex="t_{\text{opp}}=\dfrac{64{,}95}{9{,}80}\approx 6{,}63\;\text{s}" />
          <p>
            Horisontal avstand på toppen (kun <InlineLatex latex="v_{0x}" /> multiplisert med tid):
          </p>
          <FormulaBox latex="x_{\text{topp}}=v_{0x}\,t_{\text{opp}}\approx 37{,}5\cdot 6{,}63\approx 249\;\text{m}" />
          <p>Høyde på toppen (fra <InlineLatex latex="v_y^2 = v_{0y}^2 - 2g\Delta y" />):</p>
          <FormulaBox variant="blue" latex="h_{\text{topp}} = \dfrac{v_{0y}^2}{2g}" />
          <FormulaBox latex="h_{\text{topp}}=\dfrac{64{,}95^2}{19{,}6}\approx 215\;\text{m}" />
          <p>
            <strong>Viktig observasjon:</strong> På toppunktet er granatens fart rent horisontal og lik
            <InlineLatex latex="v_{\text{topp}} = v_{0x} = 37{,}5" /> m/s.
          </p>
        </Step>
        <Step n={2} title="Fase 2 — bevarelse av bevegelsesmengde i eksplosjonen">
          <p>
            La granatens masse før eksplosjonen være <InlineLatex latex="2m" /> (deles i to <em>like</em> store biter hver med masse
            <InlineLatex latex="m" />). Like før eksplosjonen beveger hele granaten seg med <InlineLatex latex="37{,}5" /> m/s horisontalt.
            Like etter: bit 1 har <InlineLatex latex="v_1 = 0" /> (faller rett ned), bit 2 har ukjent fart <InlineLatex latex="v_2" />.
          </p>
          <p>
            Bruk bevarelse horisontalt. Vertikalt bidrar eksplosjonen ikke siden eksplosjonens retning langs y ikke er
            spesifisert, men symmetri/antagelse om at bit 1 faller rett ned (og derfor får like mye y-impuls ned som bit 2 får opp)
            gjør at bit 2 beholder sin null-vertikalfart etter eksplosjonen:
          </p>
          <FormulaBox variant="blue" latex="(2m)\,v_{\text{topp}} = m\cdot 0 + m\,v_2" />
          <FormulaBox latex="(2m)\cdot 37{,}5=m\cdot 0+m\,v_2\;\Rightarrow\; v_2=75{,}0\;\text{m/s}" />
          <p>
            Den bevegde biten flyr videre med <strong>75,0 m/s</strong> horisontalt fra toppen — akkurat dobbelt så
            raskt som før, fordi den må bære hele granatens bevegelsesmengde alene.
          </p>
        </Step>
        <Step n={3} title="Fase 3 — bit 2 faller 215 m ned">
          <p>
            Bit 2 starter på toppunktet (<InlineLatex latex="y_0 = 215" /> m) med horisontalfart 75 m/s og vertikalfart
            0. Dette er et rent horisontalt kast! Tiden til bakken finner vi fra
            <InlineLatex latex="\;h_{\text{topp}} = \tfrac12 g t_{\text{ned}}^2" />:
          </p>
          <FormulaBox variant="blue" latex="t_{\text{ned}} = \sqrt{\dfrac{2h_{\text{topp}}}{g}}" />
          <FormulaBox latex="t_{\text{ned}}=\sqrt{\dfrac{2\cdot 215}{9{,}80}}\approx 6{,}63\;\text{s}" />
          <p>
            <strong>Symmetri:</strong> Dette er akkurat det samme som tiden opp fordi høyden er symmetrisk (det er
            bare et speilbilde i tid). Horisontal avstand etter eksplosjonen:
          </p>
          <FormulaBox latex="\Delta x=v_2\,t_{\text{ned}}=75{,}0\cdot 6{,}63\approx 497\;\text{m}" />
        </Step>
        <Step n={4} title="Total avstand fra kanon">
          <p>
            Bit 2 har tilbakelagt <InlineLatex latex="x_{\text{topp}}" /> før eksplosjonen og <InlineLatex latex="\Delta x" />
            etter. Summen er den totale horisontale avstanden fra kanonen til nedslaget:
          </p>
          <FormulaBox variant="gold" latex="\boxed{\;R=x_{\text{topp}}+\Delta x\approx 249+497\approx 746\;\text{m}\;}" />
          <p>
            <strong>Fysisk tolkning:</strong> Uten eksplosjon ville granaten landet på <InlineLatex latex="R_0 = v_0^2\sin 2\alpha_0/g \approx 497" /> m.
            Eksplosjonen gir bit 2 ekstra horisontal fart og dermed ekstra rekkevidde: 746 m er ca. 50 % lenger enn uten
            eksplosjon. Merk at bit 1 lander rett under toppunktet (249 m fra kanonen) — tyngdepunktet av systemet følger
            fortsatt den opprinnelige parabelbanen og lander ved 497 m (midtpunktet mellom 249 og 746). Dette er et
            eksempel på tyngdepunktets bevarelse under indre krefter.
          </p>
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
