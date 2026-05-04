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

function Pitfall({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-1">
        Vanlig feil
      </p>
      <div className="text-sm text-rose-900 dark:text-rose-100">{children}</div>
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
// OPPGAVESAMLING — KAPITTEL 3 (matcher University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 3.1 — Ekorn (1,5; 2,9) → (5,9; -0,6)
  // ==========================================================================
  "3.1": {
    title: "Ekorn — gjennomsnittshastighet (vektor)",
    difficulty: "lett",
    pageRef: "s. 120",
    problem: (
      <p>
        Et ekorn har x- og y-koordinater (1,5 m, 2,9 m) ved tid <InlineLatex latex="t_1=0" /> og koordinater
        (5,9 m, −0,6 m) ved tid <InlineLatex latex="t_2=3{,}0\;\text{s}" />. For dette tids­intervallet, finn
        (a) komponentene av gjennomsnittshastigheten, og (b) størrelsen og retningen til gjennomsnittshastigheten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r_1=(1{,}5,\,2{,}9)\;\text{m},\;\vec r_2=(5{,}9,\,-0{,}6)\;\text{m}" /></li>
        <li><InlineLatex latex="\Delta t=3{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) Komponenter <InlineLatex latex="v_{\text{gj},x},v_{\text{gj},y}" />. (b) Størrelse og retning.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Gjennomsnittshastighet i 2D — komponentvis">
          <p>
            Gjennomsnittshastigheten i to dimensjoner er forskyvningsvektoren delt på tids­intervallet:
          </p>
          <FormulaBox variant="gold" latex="\vec v_\text{gj}=\dfrac{\Delta\vec r}{\Delta t}=\dfrac{\vec r_2-\vec r_1}{t_2-t_1}" />
          <p>
            I komponentform: <InlineLatex latex="v_{gj,x}=\Delta x/\Delta t" />, <InlineLatex latex="v_{gj,y}=\Delta y/\Delta t" />.
            Til slutt sammenstilles størrelsen via Pythagoras og retningen via arctan.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\Delta x=x_2-x_1=5{,}9-1{,}5=4{,}4\;\text{m}" />, <InlineLatex latex="\;\Delta y=-0{,}6-2{,}9=-3{,}5\;\text{m}" />.</p> },
      { label: "Hint 2", content: <p>Negative y-komponent ⇒ vektor peker under x-aksen (4. kvadrant). Bruk <InlineLatex latex="\theta=\arctan(v_y/v_x)" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponentvis subtraksjon, deretter samles vektoren med Pythagoras + arctan.</p>
        <Step n={1} title="(a) Komponenter av gjennomsnittshastigheten">
          <FormulaBox latex="v_{\text{gj},x}=\dfrac{\Delta x}{\Delta t}=\dfrac{5{,}9-1{,}5}{3{,}0}=+1{,}47\;\text{m/s}" />
          <FormulaBox latex="v_{\text{gj},y}=\dfrac{\Delta y}{\Delta t}=\dfrac{-0{,}6-2{,}9}{3{,}0}=-1{,}17\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Størrelse">
          <FormulaBox latex="|\vec v_\text{gj}|=\sqrt{v_x^2+v_y^2}=\sqrt{1{,}47^2+1{,}17^2}=\sqrt{2{,}16+1{,}37}=\sqrt{3{,}53}=1{,}88\;\text{m/s}" />
        </Step>
        <Step n={3} title="Retning">
          <FormulaBox latex="\theta=\arctan\!\left(\dfrac{v_y}{v_x}\right)=\arctan(-0{,}795)=-38{,}5°" />
          <p>v_x &gt; 0 og v_y &lt; 0 plasserer vektoren i 4. kvadrant (38,5° under +x-aksen).</p>
          <FormulaBox variant="gold" latex="|\vec v_\text{gj}|\approx 1{,}88\;\text{m/s},\;38{,}5°\;\text{under +x-aksen}" />
        </Step>
        <Pitfall>
          <strong>Sjekk kvadrant før du tror på arctan.</strong> arctan gir alltid svar i (−90°, +90°),
          så hvis v_x &lt; 0 må du legge til 180°. Her er v_x &gt; 0 og v_y &lt; 0, så vektoren er
          i 4. kvadrant og svaret −38,5° er riktig (eller ekvivalent +321,5°).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Ekornet beveger seg i en retning som hovedsakelig er østover (+x) men
          litt sørover (−y). Gjennomsnittshastigheten er ikke samme som «gjennomsnittlig fart» —
          den er en vektor som bare bryr seg om endepunkt­ene, ikke veien.
        </p>
      </div>
    ),
    summary: <p>Gj.hastighet i 2D er Δr/Δt komponentvis; bruk Pythagoras og arctan for sluttvektor.</p>,
  },

  // ==========================================================================
  // 3.3 — CALC dot r = [4,4 + 2,8 t²] î + 5,5 t ĵ
  // ==========================================================================
  "3.3": {
    title: "CALC: animert prikk på skjerm",
    difficulty: "middels",
    pageRef: "s. 121",
    problem: (
      <p>
        En web-designer animerer en prikk på en skjerm med posisjon
        <InlineLatex latex="\;\vec r=[4{,}4\;\text{cm}+(2{,}8\;\text{cm/s}^2)t^2]\hat i+(5{,}5\;\text{cm/s})t\,\hat j" />.
        (a) Finn størrelsen og retningen til prikkens gjennomsnitts­hastighet mellom <InlineLatex latex="t=0" /> og
        <InlineLatex latex="\;t=2{,}0\;\text{s}" />. (b) Finn størrelsen og retningen til den momentane hastigheten ved
        <InlineLatex latex="\;t=0,\;1{,}0,\;2{,}0\;\text{s}" />. (c) Skisser prikkens bane fra <InlineLatex latex="t=0" />
        til <InlineLatex latex="t=2{,}0\;\text{s}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r(t)=(4{,}4+2{,}8t^2)\,\hat i+(5{,}5t)\,\hat j" /> [cm]</li>
        <li>Tider: 0 s, 1,0 s, 2,0 s</li>
      </ul>
    ),
    unknowns: <p>(a) Gjennomsnittshastighet 0 til 2 s (vektor + størrelse + retning). (b) Momentanhastighet ved tre tider. (c) Skisse av banen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Gjennomsnitt vs. momentan i 2D">
          <p>
            <strong>Gjennomsnitt:</strong> bruker bare endepunktene <InlineLatex latex="\;\vec v_\text{gj}=\Delta\vec r/\Delta t" />.<br />
            <strong>Momentan:</strong> derivasjon komponentvis: <InlineLatex latex="\;\vec v(t)=d\vec r/dt" />.
          </p>
          <FormulaBox variant="gold" latex="\vec v=v_x\hat i+v_y\hat j,\quad v_x=\dfrac{dx}{dt},\;v_y=\dfrac{dy}{dt}" />
          <p>For en parabolsk r(t) ligger gj.fart-vektoren mellom de to ende­hastighetene.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver komponentvis: <InlineLatex latex="\;dx/dt=2(2{,}8)t=5{,}6t" />, <InlineLatex latex="\;dy/dt=5{,}5" /> (cm/s).</p> },
      { label: "Hint 2", content: <p>Banen følger fra <InlineLatex latex="\;y=5{,}5t" /> ⇒ <InlineLatex latex="t=y/5{,}5" />, sett inn i x: <InlineLatex latex="\;x=4{,}4+2{,}8(y/5{,}5)^2" /> — parabel åpnet mot +x.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Først gj.fart fra ende­punkter, så derivasjon for momentanfart, til slutt bane­analyse.</p>
        <Step n={1} title="(a) Gjennomsnittshastighet 0–2 s">
          <FormulaBox latex="\vec r(0)=(4{,}4,\,0)\;\text{cm},\quad\vec r(2)=(4{,}4+2{,}8\cdot 4,\,5{,}5\cdot 2)=(15{,}6,\,11{,}0)\;\text{cm}" />
          <FormulaBox latex="\vec v_\text{gj}=\dfrac{\Delta\vec r}{\Delta t}=\dfrac{(11{,}2,\,11{,}0)}{2{,}0}=(5{,}6,\,5{,}5)\;\text{cm/s}" />
          <FormulaBox latex="|\vec v_\text{gj}|=\sqrt{5{,}6^2+5{,}5^2}=\sqrt{31{,}36+30{,}25}=7{,}85\;\text{cm/s}" />
          <FormulaBox latex="\theta=\arctan(5{,}5/5{,}6)=44{,}5°\;\text{over +x}" />
          <FormulaBox variant="gold" latex="|\vec v_\text{gj}|\approx 7{,}85\;\text{cm/s},\;\theta\approx 44{,}5°" />
        </Step>
        <Step n={2} title="(b) Momentanfart">
          <FormulaBox latex="\vec v(t)=5{,}6\,t\,\hat i+5{,}5\,\hat j\;[\text{cm/s}]" />
          <FormulaBox latex="\vec v(0)=(0,\,5{,}5),\;|v|=5{,}5,\;\theta=90°" />
          <FormulaBox latex="\vec v(1)=(5{,}6,\,5{,}5),\;|v|=7{,}85,\;\theta=44{,}5°" />
          <FormulaBox latex="\vec v(2)=(11{,}2,\,5{,}5),\;|v|=12{,}5,\;\theta=26{,}2°" />
          <FormulaBox variant="gold" latex="\text{Momentanfart roterer fra +y mot +x mens den vokser}" />
        </Step>
        <Step n={3} title="(c) Bane">
          <p>
            Banen er en parabel åpnet mot +x (siden x vokser kvadratisk i t mens y vokser lineært).
            Starter loddrett (rent +y) og bøyer mer og mer mot +x.
          </p>
        </Step>
        <Pitfall>
          <strong>Gj.fart over et tidsintervall ≠ gjennomsnittet av momentanfartene.</strong> Det
          ville bare vært riktig hvis a er konstant. Her gir nettopp denne oppgaven likt svar
          (7,85 cm/s) fordi a er konstant — <InlineLatex latex="\;\vec a=5{,}6\,\hat i" /> cm/s² —
          men det er en spesialvariant.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Animasjonen starter loddrett (kun +y) og bøyer av mot +x ettersom
          v_x vokser med tiden. Det er som en partikkel under konstant horisontalkraft og
          ingen vertikal akselerasjon (motsatt fritt fall: kraft mot +x i stedet).
        </p>
      </div>
    ),
    summary: <p>Gj.fart bruker endepunkt-til-endepunkt; momentan­fart er kontinuerlig (deriver).</p>,
  },

  // ==========================================================================
  // 3.4 — CALC ekorn r(t) (book version)
  // ==========================================================================
  "3.4": {
    title: "CALC: ekorn r(t), avstand og fart ved t=5,74 s",
    difficulty: "middels",
    pageRef: "s. 121",
    problem: (
      <p>
        Posisjonen til et ekorn som løper i en park er gitt av
        <InlineLatex latex="\;\vec r=[(0{,}280\;\text{m/s})t+(0{,}0360\;\text{m/s}^2)t^2]\hat i+(0{,}0190\;\text{m/s}^3)t^3\hat j" />.
        (a) Hva er <InlineLatex latex="v_x(t)" /> og <InlineLatex latex="v_y(t)" /> som funksjoner av tid?
        (b) Ved <InlineLatex latex="\;t=5{,}74\;\text{s}" />, hvor langt er ekornet fra startposisjonen?
        (c) Ved <InlineLatex latex="\;t=5{,}74\;\text{s}" />, hva er størrelsen og retningen til ekornets hastighet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec r(t)=(0{,}280t+0{,}0360t^2)\,\hat i+(0{,}0190t^3)\,\hat j" /> [m]</li>
        <li>Tid: <InlineLatex latex="t=5{,}74\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v_x(t),v_y(t)" />. (b) Avstand fra start. (c) Hastighetens størrelse og retning.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="2D-kinematikk fra posisjons­funksjon">
          <p>
            Hastigheten i to dimensjoner er gradienten i tid av posisjons­vektoren, komponent­vis:
          </p>
          <FormulaBox variant="gold" latex="\vec v(t)=\dfrac{d\vec r}{dt}=\dfrac{dx}{dt}\hat i+\dfrac{dy}{dt}\hat j" />
          <p>Avstanden fra origo er <InlineLatex latex="|\vec r|=\sqrt{x^2+y^2}" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver hver komponent: <InlineLatex latex="\;v_x=0{,}280+2(0{,}0360)t" />, <InlineLatex latex="\;v_y=3(0{,}0190)t^2" />.</p> },
      { label: "Hint 2", content: <p>Sett inn tallene før du tar Pythagoras — det reduserer regnefeil.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponentvis derivasjon, deretter innsetting av t=5,74 s.</p>
        <Step n={1} title="(a) Hastighets­komponenter">
          <FormulaBox latex="v_x(t)=\dfrac{dx}{dt}=0{,}280+0{,}0720\,t" />
          <FormulaBox latex="v_y(t)=\dfrac{dy}{dt}=0{,}0570\,t^2" />
        </Step>
        <Step n={2} title="(b) Posisjon ved t = 5,74 s">
          <FormulaBox latex="x(5{,}74)=0{,}280(5{,}74)+0{,}0360(5{,}74)^2=1{,}607+1{,}186=2{,}79\;\text{m}" />
          <FormulaBox latex="y(5{,}74)=0{,}0190(5{,}74)^3=0{,}0190\cdot 189{,}1=3{,}59\;\text{m}" />
          <FormulaBox latex="r=\sqrt{2{,}79^2+3{,}59^2}=\sqrt{7{,}79+12{,}90}=\sqrt{20{,}68}=4{,}55\;\text{m}" />
          <FormulaBox variant="gold" latex="r\approx 4{,}55\;\text{m}" />
        </Step>
        <Step n={3} title="(c) Hastighet ved t = 5,74 s">
          <FormulaBox latex="v_x=0{,}280+0{,}0720(5{,}74)=0{,}693\;\text{m/s}" />
          <FormulaBox latex="v_y=0{,}0570(5{,}74)^2=1{,}878\;\text{m/s}" />
          <FormulaBox latex="|\vec v|=\sqrt{0{,}48+3{,}53}=2{,}00\;\text{m/s}" />
          <FormulaBox latex="\theta=\arctan(1{,}878/0{,}693)=69{,}7°\;\text{over +x}" />
          <FormulaBox variant="gold" latex="|\vec v|\approx 2{,}00\;\text{m/s},\;\theta\approx 69{,}7°" />
        </Step>
        <Pitfall>
          <strong>Avstand fra start ≠ banens lengde.</strong> r er rett-linje-avstanden fra
          (0,0). Banens totale lengde langs kurven er <InlineLatex latex="\;\int_0^t |\vec v|\,dt" /> —
          ulik mengde.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Ekornet starter sakte i +x-retning (0,28 m/s), og y-bevegelsen tar over
          etter hvert som t³ vokser raskere. Ved t≈5,7 s er hastigheten dominert av y-komponenten.
        </p>
      </div>
    ),
    summary: <p>Komponentvis derivasjon ⇒ inst.fart i 2D. Avstand fra origo via Pythagoras.</p>,
  },

  // ==========================================================================
  // 3.5 — Jetfly v1 og v2
  // ==========================================================================
  "3.5": {
    title: "Jetfly — gjennomsnittsakselerasjon",
    difficulty: "lett",
    pageRef: "s. 121",
    problem: (
      <p>
        Et jetfly flyr i konstant høyde. Ved <InlineLatex latex="t_1=0" /> har det komponenter
        <InlineLatex latex="\;v_x=88\;\text{m/s},\;v_y=115\;\text{m/s}" />. Ved <InlineLatex latex="t_2=30{,}0\;\text{s}" />
        er komponentene <InlineLatex latex="\;v_x=-175\;\text{m/s},\;v_y=35\;\text{m/s}" />. (a) Skisser
        hastighets­vektorene ved <InlineLatex latex="t_1" /> og <InlineLatex latex="t_2" />. Hvordan skiller de seg?
        For dette tids­intervallet, beregn (b) komponentene av gjennomsnitts­akselerasjonen, og
        (c) størrelsen og retningen til gjennomsnitts­akselerasjonen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\vec v_1=(88,\,115)\;\text{m/s}" /></li>
        <li><InlineLatex latex="\vec v_2=(-175,\,35)\;\text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t=30{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) Skisse. (b) Komponenter av <InlineLatex latex="\vec a_\text{gj}" />. (c) Størrelse og retning.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Gjennomsnittsakselerasjon i 2D">
          <p>
            Gjennomsnittsakselerasjonen er endring i hastighet delt på tids­intervallet — komponentvis:
          </p>
          <FormulaBox variant="gold" latex="\vec a_\text{gj}=\dfrac{\Delta\vec v}{\Delta t},\quad a_x=\dfrac{\Delta v_x}{\Delta t},\;a_y=\dfrac{\Delta v_y}{\Delta t}" />
          <p>
            Begge komponentene kan ha forskjellige fortegn — du må sjekke kvadrant før du tror på arctan.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\Delta v_x=-175-88=-263\;\text{m/s}" />, <InlineLatex latex="\;\Delta v_y=35-115=-80\;\text{m/s}" />.</p> },
      { label: "Hint 2", content: <p>Begge komponenter er negative ⇒ vektoren ligger i 3. kvadrant. Legg til 180° til arctan-svaret.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponentvis. Sjekk kvadrant til slutt.</p>
        <Step n={1} title="(a) Skisse av v₁ og v₂">
          <p>
            v₁ peker oppover-høyre (begge komponenter positive). v₂ peker oppover-venstre (v_x &lt; 0,
            v_y &gt; 0). Flyet har snudd retning kraftig — det har endret kurs ca. 90°.
          </p>
        </Step>
        <Step n={2} title="(b) Komponenter">
          <FormulaBox latex="a_x=\dfrac{-175-88}{30{,}0}=\dfrac{-263}{30{,}0}=-8{,}77\;\text{m/s}^2" />
          <FormulaBox latex="a_y=\dfrac{35-115}{30{,}0}=\dfrac{-80}{30{,}0}=-2{,}67\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(c) Størrelse og retning">
          <FormulaBox latex="|\vec a_\text{gj}|=\sqrt{8{,}77^2+2{,}67^2}=\sqrt{76{,}9+7{,}1}=\sqrt{84{,}0}=9{,}17\;\text{m/s}^2" />
          <FormulaBox latex="\theta=\arctan\!\left(\dfrac{-2{,}67}{-8{,}77}\right)=\arctan(0{,}305)=16{,}9°" />
          <p>Begge negative ⇒ 3. kvadrant: <InlineLatex latex="\;\theta=180°+16{,}9°=196{,}9°" /> målt fra +x.</p>
          <FormulaBox variant="gold" latex="|\vec a_\text{gj}|\approx 9{,}17\;\text{m/s}^2,\;16{,}9°\;\text{under -x-aksen}" />
        </Step>
        <Pitfall>
          <strong>arctan vet ikke hvilken kvadrant.</strong> arctan(−/−) gir samme svar som arctan(+/+).
          Sjekk fortegnet til v_x: hvis v_x &lt; 0, ligger vektoren i 2. eller 3. kvadrant — legg
          til 180°.
        </Pitfall>
      </div>
    ),
    summary: <p>Gj.akselerasjon: (Δv_x/Δt, Δv_y/Δt). Sjekk alltid kvadrant.</p>,
  },

  // ==========================================================================
  // 3.7 — CALC fugl x=αt, y=3-βt²
  // ==========================================================================
  "3.7": {
    title: "CALC: fugl med x=αt, y=3,0−βt²",
    difficulty: "middels",
    pageRef: "s. 121",
    problem: (
      <p>
        Koordinatene til en fugl som flyr i xy-planet er gitt ved <InlineLatex latex="\;x(t)=\alpha t" /> og
        <InlineLatex latex="\;y(t)=3{,}0\;\text{m}-\beta t^2" />, hvor <InlineLatex latex="\alpha=2{,}4\;\text{m/s}" />
        og <InlineLatex latex="\beta=1{,}2\;\text{m/s}^2" />. (a) Skisser banen fra <InlineLatex latex="t=0" />
        til <InlineLatex latex="t=2{,}0\;\text{s}" />. (b) Finn hastighets- og akselerasjons­vektorene som funksjoner
        av tid. (c) Finn størrelse og retning av v og a ved <InlineLatex latex="\;t=2{,}0\;\text{s}" />.
        (d) Ved <InlineLatex latex="\;t=2{,}0\;\text{s}" />, øker eller minker farten? Hvis fuglen bøyer av, hvilken vei?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="x(t)=\alpha t" /> med <InlineLatex latex="\alpha=2{,}4\;\text{m/s}" /></li>
        <li><InlineLatex latex="y(t)=3{,}0\;\text{m}-\beta t^2" /> med <InlineLatex latex="\beta=1{,}2\;\text{m/s}^2" /></li>
        <li>Tid: <InlineLatex latex="t=2{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) Bane. (b) <InlineLatex latex="\vec v(t),\vec a(t)" />. (c) Verdier ved t = 2 s. (d) Øker farten?</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Tegn på v · a — den eneste regelen du trenger">
          <p>
            Skalarproduktet av v og a forteller om farten øker eller minker:
          </p>
          <FormulaBox variant="gold" latex="\vec v\cdot\vec a>0\Rightarrow\;\text{fart øker};\quad\vec v\cdot\vec a<0\Rightarrow\;\text{fart minker};\quad\vec v\cdot\vec a=0\Rightarrow\;\text{fart konstant (rent svingbevegelse)}" />
          <p>
            Komponenten av a langs v gir tangential­akselerasjonen (endrer fart). Komponenten
            vinkelrett gir sentripetal-akselerasjonen (endrer retning).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver komponentvis: <InlineLatex latex="\;v_x=\alpha,\;v_y=-2\beta t" />, <InlineLatex latex="\;a_x=0,\;a_y=-2\beta" /> (konstant).</p> },
      { label: "Hint 2", content: <p>Eliminér t fra <InlineLatex latex="\;x=\alpha t" />: <InlineLatex latex="\;t=x/\alpha" />, og sett inn i y(t) for parabel-banen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Derivasjon, deretter innsetting og skalarprodukt-test.</p>
        <Step n={1} title="(a) Bane (eliminer t)">
          <FormulaBox latex="t=x/\alpha\Rightarrow y=3{,}0-\beta(x/\alpha)^2=3{,}0-(0{,}208)x^2" />
          <p>Bane er en omvendt parabel — fuglen flyr horisontalt mens den faller mer og mer.</p>
        </Step>
        <Step n={2} title="(b) v(t) og a(t)">
          <FormulaBox latex="\vec v(t)=\alpha\,\hat i-2\beta t\,\hat j=2{,}4\,\hat i-2{,}4\,t\,\hat j" />
          <FormulaBox latex="\vec a(t)=-2\beta\,\hat j=-2{,}4\,\hat j\;\text{m/s}^2\;\text{(konstant)}" />
        </Step>
        <Step n={3} title="(c) Ved t = 2,0 s">
          <FormulaBox latex="\vec v(2)=(2{,}4,\,-4{,}8)\;\text{m/s}" />
          <FormulaBox latex="|\vec v|=\sqrt{2{,}4^2+4{,}8^2}=\sqrt{5{,}76+23{,}04}=\sqrt{28{,}8}=5{,}37\;\text{m/s}" />
          <FormulaBox latex="\theta_v=\arctan(-4{,}8/2{,}4)=-63{,}4°\;\text{(under +x)}" />
          <FormulaBox latex="|\vec a|=2{,}4\;\text{m/s}^2,\;\text{rettet -y}" />
        </Step>
        <Step n={4} title="(d) Øker farten?">
          <FormulaBox latex="\vec v\cdot\vec a=v_x a_x+v_y a_y=(2{,}4)(0)+(-4{,}8)(-2{,}4)=+11{,}52>0" />
          <FormulaBox variant="gold" latex="\text{Farten ØKER}" />
          <p>Banen bøyer mot −y (siden a er rent vertikalt nedover).</p>
        </Step>
        <Pitfall>
          <strong>Konstant a betyr ikke konstant fart.</strong> Akselerasjonen er konstant
          (−2,4 m/s² i y), men hastigheten endrer både retning og størrelse. Klassisk forveksling
          fra 1D der konstant a ofte gir lineær v.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Fuglen er i et tilstandsbilde svært likt prosjektil­bevegelse —
          horisontal v konstant, vertikal v vokser i negativ retning. Det er som om fuglen er i
          fritt fall (men g=2,4 i stedet for 9,8).
        </p>
      </div>
    ),
    summary: <p>v·a positiv ⇒ farten øker; negativ ⇒ minker; null ⇒ konstant fart.</p>,
  },

  // ==========================================================================
  // 3.8 — CALC bil v(t) = ...
  // ==========================================================================
  "3.8": {
    title: "CALC: fjernstyrt bil — akselerasjon og fart",
    difficulty: "vanskelig",
    pageRef: "s. 121",
    problem: (
      <p>
        En fjernstyrt bil i en tom parkerings­plass har hastighet
        <InlineLatex latex="\;\vec v=[5{,}00\;\text{m/s}-(0{,}0180\;\text{m/s}^3)t^2]\hat i+[2{,}00\;\text{m/s}+(0{,}550\;\text{m/s}^2)t]\hat j" />.
        (a) Hva er <InlineLatex latex="a_x(t)" /> og <InlineLatex latex="a_y(t)" />, x- og y-komponentene
        av bilens akselerasjon, som funksjoner av tid? (b) Hva er størrelsen og retningen til bilens hastighet
        ved <InlineLatex latex="\;t=6{,}87\;\text{s}" />? (c) Hva er størrelsen og retningen til bilens
        akselerasjon ved <InlineLatex latex="\;t=6{,}87\;\text{s}" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_x(t)=5{,}00-0{,}0180\,t^2" /> [m/s]</li>
        <li><InlineLatex latex="v_y(t)=2{,}00+0{,}550\,t" /> [m/s]</li>
        <li>Tid: <InlineLatex latex="t=6{,}87\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="a_x(t),a_y(t)" />. (b) <InlineLatex latex="\vec v(6{,}87)" />. (c) <InlineLatex latex="\vec a(6{,}87)" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Inst.akselerasjon = deriver hastigheten">
          <p>Akselerasjonen er hastighetens tids­derivasjon, komponentvis:</p>
          <FormulaBox variant="gold" latex="\vec a(t)=\dfrac{d\vec v}{dt}=\dfrac{dv_x}{dt}\hat i+\dfrac{dv_y}{dt}\hat j" />
          <p>
            Konstant ledd i v gir 0 i a; lineært ledd gir konstant; kvadratisk ledd gir lineær.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="dv_x/dt=-2(0{,}0180)t=-0{,}0360\,t" />, <InlineLatex latex="\;dv_y/dt=0{,}550" /> (konstant).</p> },
      { label: "Hint 2", content: <p>For (c): a_x &lt; 0 og a_y &gt; 0 ⇒ vektoren ligger i 2. kvadrant. Bruk <InlineLatex latex="\theta=180°-\arctan|a_y/a_x|" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Derivér hastighetens komponenter, sett inn t = 6,87 s.</p>
        <Step n={1} title="(a) Akselerasjons­komponenter">
          <FormulaBox latex="a_x(t)=\dfrac{dv_x}{dt}=-0{,}0360\,t\;[\text{m/s}^2]" />
          <FormulaBox latex="a_y(t)=\dfrac{dv_y}{dt}=+0{,}550\;[\text{m/s}^2]\;\text{(konstant)}" />
        </Step>
        <Step n={2} title="(b) Hastighet ved t = 6,87 s">
          <FormulaBox latex="v_x=5{,}00-0{,}0180(6{,}87)^2=5{,}00-0{,}0180(47{,}19)=4{,}15\;\text{m/s}" />
          <FormulaBox latex="v_y=2{,}00+0{,}550(6{,}87)=5{,}779\;\text{m/s}" />
          <FormulaBox latex="|\vec v|=\sqrt{4{,}15^2+5{,}78^2}=\sqrt{17{,}2+33{,}4}=\sqrt{50{,}6}=7{,}11\;\text{m/s}" />
          <FormulaBox latex="\theta_v=\arctan(5{,}78/4{,}15)=54{,}3°\;\text{over +x}" />
          <FormulaBox variant="gold" latex="|\vec v|\approx 7{,}11\;\text{m/s},\;\theta\approx 54{,}3°" />
        </Step>
        <Step n={3} title="(c) Akselerasjon ved t = 6,87 s">
          <FormulaBox latex="a_x=-0{,}0360(6{,}87)=-0{,}247\;\text{m/s}^2,\quad a_y=+0{,}550\;\text{m/s}^2" />
          <FormulaBox latex="|\vec a|=\sqrt{0{,}061+0{,}303}=\sqrt{0{,}364}=0{,}603\;\text{m/s}^2" />
          <FormulaBox latex="\theta_a=180°-\arctan(0{,}550/0{,}247)=180°-65{,}8°=114°" />
          <FormulaBox variant="gold" latex="|\vec a|\approx 0{,}603\;\text{m/s}^2,\;\theta\approx 114°" />
        </Step>
        <Pitfall>
          <strong>Sjekk om farten øker eller minker:</strong> <InlineLatex latex="\;\vec v\cdot\vec a=(4{,}15)(-0{,}247)+(5{,}78)(0{,}550)=-1{,}03+3{,}18=+2{,}16>0" />,
          så farten øker fortsatt. Hadde den vært negativ ville bilen vært i bremse­fase.
        </Pitfall>
      </div>
    ),
    summary: <p>Inst.akselerasjon: deriver inst.hastighet. Vektor­regning per komponent.</p>,
  },

  // ==========================================================================
  // 3.9 — Bok glir av bord
  // ==========================================================================
  "3.9": {
    title: "Fysikkbok glir av bord — prosjektil",
    difficulty: "lett",
    pageRef: "s. 121",
    problem: (
      <p>
        En fysikkbok glir av et horisontalt bord med fart 1,40 m/s. Den treffer gulvet 0,320 s senere.
        Se bort fra luftmotstand. Finn (a) bordhøyden over gulvet, (b) horisontal avstand fra
        bordkanten til der boken treffer gulvet, (c) horisontal og vertikal komponent av bokens fart
        rett før den treffer gulvet. (d) Skisser x-t, y-t, v_x-t og v_y-t-grafer.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Initial horisontal fart: <InlineLatex latex="v_{0x}=1{,}40\;\text{m/s}" /></li>
        <li>Falltid: <InlineLatex latex="t=0{,}320\;\text{s}" /></li>
        <li>g = 9,80 m/s², ingen luftmotstand</li>
      </ul>
    ),
    unknowns: <p>(a) Bordhøyden. (b) Horisontal avstand til landingspunkt. (c) <InlineLatex latex="v_x,v_y" /> rett før landing.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Horisontalt kast — uavhengighet i x og y">
          <p>
            Prosjektil­bevegelse uten luftmotstand: x- og y-bevegelser er <em>uavhengige</em> og deler
            kun tids­variabel.
          </p>
          <FormulaBox variant="gold" latex="\text{horisontalt:}\;x=v_{0x}t,\;v_x=v_{0x}\;\text{(konstant)}" />
          <FormulaBox variant="gold" latex="\text{vertikalt:}\;y=\tfrac12 gt^2,\;v_y=-gt\;\text{(fritt fall fra ro)}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Boken faller fra ro vertikalt. Bruk <InlineLatex latex="\;h=\tfrac12 gt^2" /> for høyden.</p> },
      { label: "Hint 2", content: <p>Vertikal fart vokser lineært: <InlineLatex latex="\;v_y=gt" /> (med vår tegnkonvensjon nedover positivt eller negativt — vær konsistent).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">x og y håndteres separat med samme t.</p>
        <Step n={1} title="(a) Bordhøyde — fritt fall i tiden t">
          <FormulaBox latex="h=\tfrac12 g t^2=\tfrac12(9{,}80)(0{,}320)^2=\tfrac12(9{,}80)(0{,}1024)=0{,}502\;\text{m}" />
          <FormulaBox variant="gold" latex="h\approx 0{,}502\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Horisontal avstand">
          <FormulaBox latex="x=v_{0x}\,t=(1{,}40)(0{,}320)=0{,}448\;\text{m}" />
          <FormulaBox variant="gold" latex="x\approx 0{,}448\;\text{m}" />
        </Step>
        <Step n={3} title="(c) Slutt­hastighet">
          <FormulaBox latex="v_x=v_{0x}=1{,}40\;\text{m/s}\;\text{(uendret)}" />
          <FormulaBox latex="v_y=-g\,t=-(9{,}80)(0{,}320)=-3{,}14\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\vec v=(1{,}40,\,-3{,}14)\;\text{m/s}" />
        </Step>
        <Step n={4} title="(d) Skisse av grafer">
          <p>
            x-t: rett linje (helling 1,40). y-t: nedover­vendt parabel.
            v_x-t: horisontal linje (1,40). v_y-t: rett linje med helling −9,80.
          </p>
        </Step>
        <Pitfall>
          <strong>Initial v_y er null, ikke v_x.</strong> Boken «glir av» — det betyr horisontal
          fart ved start, og null vertikalt. Glemmer man v_{`{0y}`}=0, blir h-formelen feil.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Det er denne uavhengigheten som gjør at en kule skutt horisontalt og
          en kule sluppet samtidig fra samme høyde treffer bakken samtidig. Klassisk demonstrasjon.
        </p>
      </div>
    ),
    summary: <p>Horisontalt kast: x og y er uavhengige; tiden er felles. v_x = v₀, v_y vokser lineært.</p>,
  },

  // ==========================================================================
  // 3.10 — Svømmer hopper over hylle (Fig E3.10)
  // ==========================================================================
  "3.10": {
    title: "Svømmer over hylle (Fig E3.10)",
    difficulty: "vanskelig",
    pageRef: "s. 121",
    problem: (
      <p>
        En modig 510 N svømmer dykker av en klippe med et løpe-horisontalt sprang, som vist i Fig. E3.10.
        Hvilken minste fart må hun ha for å akkurat passere kanten på en hylle som er 1,75 m bred og
        ligger 9,00 m under toppen av klippen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Hylle: 1,75 m horisontalt fra klipp­kanten, 9,00 m under toppen</li>
        <li>Svømmerens vekt 510 N — <em>irrelevant</em> i frie­fall (kommer ikke inn i ligningene)</li>
        <li>g = 9,80 m/s², ingen luftmotstand</li>
      </ul>
    ),
    unknowns: <p>Minste horisontal initial­fart <InlineLatex latex="v_0" /> for å akkurat nå hylle­kanten.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Minimum-spørsmål: «akkurat-så-vidt»">
          <p>
            For å akkurat nå hylle­kanten må svømmeren falle 9,00 m vertikalt mens hun går 1,75 m
            horisontalt. Tiden er bestemt av fallhøyden:
          </p>
          <FormulaBox variant="gold" latex="t=\sqrt{\dfrac{2h}{g}},\quad v_0=\dfrac{x}{t}" />
          <p>Vekten m·g påvirker ikke fritt fall (alle objekter faller likt uten luftmotstand) — den oppgis bare som distraksjon.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vertikal: <InlineLatex latex="\;9{,}00=\tfrac12 g t^2" /> ⇒ <InlineLatex latex="t=\sqrt{2(9)/g}" />.</p> },
      { label: "Hint 2", content: <p>Horisontal: <InlineLatex latex="\;1{,}75=v_0 t" /> ⇒ <InlineLatex latex="\;v_0=1{,}75/t" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Falltid bestemmer alt — løs vertikalt først, deretter horisontalt.</p>
        <Step n={1} title="Falltid">
          <FormulaBox latex="h=\tfrac12 g t^2\Rightarrow t=\sqrt{\dfrac{2h}{g}}=\sqrt{\dfrac{2(9{,}00)}{9{,}80}}=\sqrt{1{,}837}=1{,}355\;\text{s}" />
        </Step>
        <Step n={2} title="Minste horisontal fart">
          <FormulaBox latex="v_0=\dfrac{x}{t}=\dfrac{1{,}75\;\text{m}}{1{,}355\;\text{s}}=1{,}29\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_0\approx 1{,}29\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Vekten 510 N er distraksjon.</strong> I prosjektil­bevegelse uten luftmotstand
          kanselleres masse fra Newtons 2. lov: <InlineLatex latex="\;a=F/m=mg/m=g" />. Tunge og
          lette svømmere faller likt — så vekten er irrelevant her.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 1,29 m/s er lett gangfart — fysisk realistisk for en stillestående
          start. Hadde hylla vært lengre eller dybden mindre ville hun trengt mer fart.
        </p>
      </div>
    ),
    summary: <p>Vekten irrelevant for prosjektil­bevegelse uten luftmotstand. t fra y, så v fra x/t.</p>,
  },

  // ==========================================================================
  // 3.16 — Skall fra horisontalplan
  // ==========================================================================
  "3.16": {
    title: "Granat avfyrt fra bakken — bane­analyse",
    difficulty: "middels",
    pageRef: "s. 121",
    problem: (
      <p>
        På flat bakke avfyres et skall med initialfart 71,0 m/s ved en vinkel 55,9° over horisontalen, uten
        merkbar luft­motstand. (a) Finn horisontal og vertikal komponent av skallets initial­fart.
        (b) Hvor lang tid tar det skallet å nå sitt høyeste punkt? (c) Finn den maksimale høyden over bakken.
        (d) Hvor langt fra utskytningen lander skallet? (e) Ved sitt høyeste punkt, finn de horisontale og
        vertikale komponentene av akselerasjonen og hastigheten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Initial fart: <InlineLatex latex="v_0=71{,}0\;\text{m/s}" /></li>
        <li>Vinkel: <InlineLatex latex="\alpha=55{,}9°" /> over horisontalen</li>
        <li>Avfyrt fra og lander på samme nivå (flat bakke)</li>
        <li>g = 9,80 m/s², ingen luftmotstand</li>
      </ul>
    ),
    unknowns: <p>(a) Komponenter. (b) Tid til topp. (c) Maks høyde. (d) Rekkevidde. (e) v og a på toppen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Prosjektil­bevegelse — formelpakken">
          <p>Standard utskytning fra og lander på samme høyde:</p>
          <FormulaBox variant="gold" latex="v_{0x}=v_0\cos\alpha,\;v_{0y}=v_0\sin\alpha" />
          <FormulaBox variant="gold" latex="t_\text{topp}=\dfrac{v_{0y}}{g},\;H=\dfrac{v_{0y}^2}{2g},\;R=\dfrac{v_0^2\sin 2\alpha}{g}" />
          <p>På toppen er <InlineLatex latex="v_y=0" />, men <InlineLatex latex="v_x" /> er fortsatt <InlineLatex latex="v_{0x}" />. Akselerasjonen er hele tiden <InlineLatex latex="\vec a=(0,-g)" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bryt v₀ i komponenter med cos/sin. Husk: cos for x, sin for y.</p> },
      { label: "Hint 2", content: <p>Total tid = 2·t_topp (symmetri rundt toppen for samme start- og slutt­høyde).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponenter først, så bruk symmetrien til parabolen.</p>
        <Step n={1} title="(a) Initial-komponenter">
          <FormulaBox latex="v_{0x}=v_0\cos\alpha=71{,}0\cos 55{,}9°=71{,}0(0{,}561)=39{,}8\;\text{m/s}" />
          <FormulaBox latex="v_{0y}=v_0\sin\alpha=71{,}0\sin 55{,}9°=71{,}0(0{,}828)=58{,}8\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Tid til topp (v_y = 0)">
          <FormulaBox latex="t_\text{topp}=\dfrac{v_{0y}}{g}=\dfrac{58{,}8}{9{,}80}=6{,}00\;\text{s}" />
        </Step>
        <Step n={3} title="(c) Maks høyde">
          <FormulaBox latex="H=\dfrac{v_{0y}^2}{2g}=\dfrac{(58{,}8)^2}{19{,}6}=176{,}5\;\text{m}" />
          <FormulaBox variant="gold" latex="H\approx 177\;\text{m}" />
        </Step>
        <Step n={4} title="(d) Horisontal rekkevidde">
          <p>Total flytid: <InlineLatex latex="\;t_\text{tot}=2t_\text{topp}=12{,}00" /> s.</p>
          <FormulaBox latex="R=v_{0x}\,t_\text{tot}=39{,}8(12{,}00)=477{,}6\;\text{m}" />
          <FormulaBox variant="gold" latex="R\approx 478\;\text{m}" />
        </Step>
        <Step n={5} title="(e) På toppen: v og a">
          <FormulaBox latex="v_x=39{,}8\;\text{m/s},\;v_y=0\;\Rightarrow\;|\vec v|=39{,}8\;\text{m/s rent horisontalt}" />
          <FormulaBox latex="a_x=0,\;a_y=-9{,}80\;\text{m/s}^2\;\text{(uendret hele banen)}" />
        </Step>
        <Pitfall>
          <strong>Akselerasjonen er IKKE null på toppen.</strong> Bare den vertikale hastigheten er null
          der. Akselerasjonen <InlineLatex latex="(0,-g)" /> er konstant gjennom hele banen — det er
          den som tvinger v_y til å bytte fortegn ved toppen.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Vinkel 55,9° er relativt nær 45° (max-rekkevidde-vinkel for flat bakke).
          Hadde vinkelen vært 45°, ville rekkevidden vært <InlineLatex latex="\;R_\text{max}=v_0^2/g=514\;\text{m}" /> —
          litt mer enn vår 478 m.
        </p>
      </div>
    ),
    summary: <p>Standard parabolsk bane: tid til topp = v_0y/g, rekkevidde = 2·v_0x·t_topp.</p>,
  },

  // ==========================================================================
  // 3.17 — Major leaguer 33 m/s 38,5°
  // ==========================================================================
  "3.17": {
    title: "Baseball ved 33,0 m/s, 38,5°",
    difficulty: "vanskelig",
    pageRef: "s. 121",
    problem: (
      <p>
        En baseball-spiller treffer en ball slik at den forlater slag­treet i 33,0 m/s ved en vinkel 38,5°
        over horisontalen. Se bort fra luftmotstand. (a) Ved hvilke <em>to</em> tider er ballen ved en høyde
        10,7 m over punktet hvor den traff? (b) Beregn de horisontale og vertikale komponentene av ballens
        hastighet ved hver av de to tidene. (c) Hva er størrelsen og retningen av ballens hastighet når den
        returnerer til samme nivå som da den traff?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=33{,}0\;\text{m/s}" />, <InlineLatex latex="\alpha=38{,}5°" /></li>
        <li>Høyde: 10,7 m over slag­punktet</li>
        <li>Lander på samme høyde som den ble truffet</li>
      </ul>
    ),
    unknowns: <p>(a) De to tidene da y=10,7 m. (b) Komponenter ved disse. (c) Retur­hastighet.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To tider på samme høyde — symmetri">
          <p>
            En parabolsk bane krysser hver høyde nøyaktig <em>to</em> ganger: én på vei opp, én på
            vei ned. Det gir andre­grads­ligning i t:
          </p>
          <FormulaBox variant="gold" latex="y(t)=v_{0y}t-\tfrac12 g t^2\Rightarrow \tfrac12 g\,t^2-v_{0y}t+y=0" />
          <p>
            Symmetri­regel: ved retur til samme nivå er v_y endret tegn, |v_y| er samme, og <InlineLatex latex="|\vec v|=v_0" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Komponenter: <InlineLatex latex="\;v_{0x}=v_0\cos\alpha,\;v_{0y}=v_0\sin\alpha" />.</p> },
      { label: "Hint 2", content: <p>Sett y=10,7 og løs <InlineLatex latex="\;4{,}90t^2-20{,}55t+10{,}7=0" /> med ABC-formelen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponenter først, så annengradsligning for de to tidene.</p>
        <Step n={1} title="Initial-komponenter">
          <FormulaBox latex="v_{0x}=33{,}0\cos 38{,}5°=25{,}82\;\text{m/s},\quad v_{0y}=33{,}0\sin 38{,}5°=20{,}55\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Sett y(t) = 10,7 m">
          <FormulaBox latex="10{,}7=20{,}55\,t-4{,}90\,t^2" />
          <FormulaBox latex="4{,}90\,t^2-20{,}55\,t+10{,}7=0" />
          <FormulaBox latex="t=\dfrac{20{,}55\pm\sqrt{422{,}3-209{,}7}}{9{,}80}=\dfrac{20{,}55\pm\sqrt{212{,}6}}{9{,}80}=\dfrac{20{,}55\pm 14{,}58}{9{,}80}" />
          <FormulaBox latex="t_1=0{,}608\;\text{s}\;\text{(på vei opp)},\quad t_2=3{,}58\;\text{s}\;\text{(på vei ned)}" />
        </Step>
        <Step n={3} title="(b) Komponenter ved t₁ og t₂">
          <FormulaBox latex="v_x=25{,}82\;\text{m/s\;(konstant)}" />
          <FormulaBox latex="v_y(0{,}608)=20{,}55-9{,}80(0{,}608)=+14{,}59\;\text{m/s\;(oppover)}" />
          <FormulaBox latex="v_y(3{,}58)=20{,}55-9{,}80(3{,}58)=-14{,}53\;\text{m/s\;(nedover)}" />
          <FormulaBox variant="gold" latex="|v_y(t_1)|\approx |v_y(t_2)|\approx 14{,}5\;\text{m/s, motsatt fortegn}" />
        </Step>
        <Step n={4} title="(c) Retur­hastighet (y = 0 igjen)">
          <p>Ved symmetri tilbake på utskytnings­nivå: <InlineLatex latex="\;v_x=v_{0x}" />, <InlineLatex latex="\;v_y=-v_{0y}" />.</p>
          <FormulaBox latex="|\vec v|=\sqrt{v_{0x}^2+v_{0y}^2}=v_0=33{,}0\;\text{m/s}" />
          <FormulaBox latex="\theta=-38{,}5°\;\text{(under +x)}" />
          <FormulaBox variant="gold" latex="|\vec v_\text{retur}|=33{,}0\;\text{m/s ved 38,5° under +x}" />
        </Step>
        <Pitfall>
          <strong>Kvadratiske <InlineLatex latex="t" />-løsninger har alltid en mening.</strong> Begge
          tidene er fysiske — én når ballen klatrer forbi 10,7 m oppover, en når den faller forbi.
          Sjekk fortegnet på v_y for å sortere.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Symmetrien rundt toppen er fundamental for prosjektil­bevegelse uten
          luftmotstand — energi­bevaring betyr at samme høyde gir samme |v|. Med luftmotstand
          brytes denne symmetrien og ballen lander tregere enn den ble kastet.
        </p>
      </div>
    ),
    summary: <p>Annengrads­ligning gir to tider for samme høyde — én på vei opp, én på vei ned.</p>,
  },

  // ==========================================================================
  // 3.21 — Mann på tak kaster stein
  // ==========================================================================
  "3.21": {
    title: "Mann på tak kaster stein — bane­analyse",
    difficulty: "vanskelig",
    pageRef: "s. 122",
    problem: (
      <p>
        En mann står på taket av en 15,0 m høy bygning og kaster en stein med fart 30,0 m/s i en vinkel
        33,0° over horisontalen. Se bort fra luftmotstand. Beregn (a) den maksimale høyden steinen når
        over taket; (b) farten til steinen rett før den treffer bakken; (c) den horisontale rekkevidden
        fra basen av bygningen til punktet der steinen treffer bakken. (d) Skisser x-t, y-t, v_x-t og
        v_y-t-grafer.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Bygnings­høyde: <InlineLatex latex="h=15{,}0\;\text{m}" /></li>
        <li><InlineLatex latex="v_0=30{,}0\;\text{m/s}" />, <InlineLatex latex="\alpha=33{,}0°" /></li>
        <li>g = 9,80 m/s², ingen luftmotstand</li>
      </ul>
    ),
    unknowns: <p>(a) Maks høyde over taket. (b) Slutt­fart ved bakken. (c) Horisontal rekkevidde fra basis. (d) Skisser.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Asymmetrisk fall — utskytning over og landing under">
          <p>
            Når start- og slutt­høyde er <em>ulike</em>, brytes symmetrien rundt toppen. Bruk i stedet
            energi-formelen for slutt­fart, og <em>total tid</em> = tid opp + tid ned (de to er ulike).
          </p>
          <FormulaBox variant="gold" latex="v_f^2=v_0^2+2g\,h_\text{total}\;\text{(h er fall fra start til slutt)}" />
          <p>
            Tid opp: <InlineLatex latex="t_\text{opp}=v_{0y}/g" />. Tid ned (fra topp): finnes fra
            total fall = H + h med <InlineLatex latex="\;t_\text{ned}=\sqrt{2(H+h)/g}" /> eller <InlineLatex latex="\;v_y(\text{slutt})/g" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Maks høyde over tak: <InlineLatex latex="\;H=v_{0y}^2/(2g)" />.</p> },
      { label: "Hint 2", content: <p>Total energi-bevaring: <InlineLatex latex="\;|\vec v_f|^2=v_0^2+2gh" /> der h=15 m er bygnings­høyden.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponenter, så maksimum, så slutt­fart via energi, og rekkevidde via tid.</p>
        <Step n={1} title="Initial-komponenter">
          <FormulaBox latex="v_{0x}=30{,}0\cos 33°=30{,}0(0{,}8387)=25{,}16\;\text{m/s}" />
          <FormulaBox latex="v_{0y}=30{,}0\sin 33°=30{,}0(0{,}5446)=16{,}34\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Maks høyde over taket">
          <FormulaBox latex="H=\dfrac{v_{0y}^2}{2g}=\dfrac{(16{,}34)^2}{19{,}6}=\dfrac{266{,}9}{19{,}6}=13{,}62\;\text{m}" />
          <FormulaBox variant="gold" latex="H\approx 13{,}6\;\text{m over taket}" />
        </Step>
        <Step n={3} title="(b) Slutt­fart ved bakken">
          <p>Total høyde­forskjell fra start (taket) til slutt (bakken): −15 m.</p>
          <FormulaBox latex="|\vec v_f|^2=v_0^2+2g(15{,}0)=900+294=1194" />
          <FormulaBox latex="|\vec v_f|=\sqrt{1194}=34{,}6\;\text{m/s}" />
          <FormulaBox variant="gold" latex="|\vec v_f|\approx 34{,}6\;\text{m/s}" />
        </Step>
        <Step n={4} title="(c) Horisontal rekkevidde">
          <p>Tid opp til topp:</p>
          <FormulaBox latex="t_\text{opp}=\dfrac{v_{0y}}{g}=\dfrac{16{,}34}{9{,}80}=1{,}668\;\text{s}" />
          <p>Tid fra topp til bakken (faller H + 15 = 28,62 m fra ro):</p>
          <FormulaBox latex="t_\text{ned}=\sqrt{\dfrac{2(28{,}62)}{9{,}80}}=\sqrt{5{,}84}=2{,}418\;\text{s}" />
          <FormulaBox latex="t_\text{tot}=t_\text{opp}+t_\text{ned}=4{,}086\;\text{s}" />
          <FormulaBox latex="R=v_{0x}\,t_\text{tot}=25{,}16(4{,}086)=102{,}8\;\text{m}" />
          <FormulaBox variant="gold" latex="R\approx 103\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Når start- og slutt­høyde er ulike, brytes symmetrien.</strong> Du kan ikke bruke
          R = 2·v_0x·t_topp her — det forutsetter at landing er på samme nivå. Bruk
          v² = v_0² + 2gh for fart og total tid for rekkevidde.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Energi-bevaring sier at <InlineLatex latex="\;\tfrac12 m|\vec v_f|^2=\tfrac12 mv_0^2+mgh" />,
          som gir <InlineLatex latex="\;|\vec v_f|^2=v_0^2+2gh" /> — uavhengig av kast­vinkel. Bare
          størrelsen på sluttfart, ikke retning.
        </p>
      </div>
    ),
    summary: <p>Energi­besparelse: <InlineLatex latex="v^2_f=v^2_0+2gh" /> for sluttfart. Tid og rekkevidde må regnes opp + ned hver for seg.</p>,
  },

  // ==========================================================================
  // 3.25 — Earth orbital
  // ==========================================================================
  "3.25": {
    title: "Jordens rotasjon — radial akselerasjon",
    difficulty: "lett",
    pageRef: "s. 122",
    problem: (
      <p>
        Jorden har en radius på 6380 km og roterer rundt sin akse én gang i 24 timer. (a) Hva er den radielle
        akselerasjonen til et objekt ved Jordens ekvator? Gi svaret i m/s² og som brøkdel av g.
        (b) Hvis <InlineLatex latex="a_\text{rad}" /> ved ekvator var større enn g, ville objekter «fly» av
        Jordens overflate ut i rommet. Hva ville rotasjons­perioden måtte være for at dette skulle skje?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Jordens radius: <InlineLatex latex="R=6{,}38\times 10^6\;\text{m}" /></li>
        <li>Rotasjonsperiode: <InlineLatex latex="T=24\;\text{t}=86\,400\;\text{s}" /></li>
        <li>g = 9,80 m/s²</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="a_\text{rad}" /> og brøkdel av g. (b) Periode T som gir <InlineLatex latex="a_\text{rad}=g" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Sentripetal­akselerasjon ved jevn sirkulær bevegelse">
          <p>
            Et objekt som beveger seg i sirkel med radius R og periode T, har akselerasjon rettet
            mot sentrum med størrelsen:
          </p>
          <FormulaBox variant="gold" latex="a_\text{rad}=\dfrac{v^2}{R}=\omega^2 R=\dfrac{4\pi^2 R}{T^2}" />
          <p>
            For at objekter skal «fly av» Jorden ved ekvator, må sentripetal­akselerasjonen overstige
            tyngde­akselerasjonen g. Da kreves det ingen normalkraft fra bakken.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Konverter T til sekunder: 24 t × 3600 s/t = 86 400 s.</p> },
      { label: "Hint 2", content: <p>For (b): løs <InlineLatex latex="\;g=4\pi^2 R/T^2" /> for T: <InlineLatex latex="\;T=2\pi\sqrt{R/g}" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Sett inn i formelen, så omformulér for (b).</p>
        <Step n={1} title="(a) Radial akselerasjon ved ekvator">
          <FormulaBox latex="a_\text{rad}=\dfrac{4\pi^2 R}{T^2}=\dfrac{4\pi^2(6{,}38\times 10^6)}{(86\,400)^2}=\dfrac{2{,}519\times 10^8}{7{,}465\times 10^9}=0{,}0337\;\text{m/s}^2" />
          <FormulaBox latex="\dfrac{a_\text{rad}}{g}=\dfrac{0{,}0337}{9{,}80}=3{,}44\times 10^{-3}\approx 0{,}34\,\%" />
          <FormulaBox variant="gold" latex="a_\text{rad}\approx 0{,}0337\;\text{m/s}^2\approx 0{,}34\,\%\;\text{av}\;g" />
        </Step>
        <Step n={2} title="(b) Kritisk periode for a = g">
          <FormulaBox latex="g=\dfrac{4\pi^2 R}{T^2}\Rightarrow T=2\pi\sqrt{\dfrac{R}{g}}" />
          <FormulaBox latex="T=2\pi\sqrt{\dfrac{6{,}38\times 10^6}{9{,}80}}=2\pi\sqrt{6{,}51\times 10^5}=2\pi(806{,}9)" />
          <FormulaBox latex="T\approx 5070\;\text{s}\approx 84{,}5\;\text{min}" />
          <FormulaBox variant="gold" latex="T_\text{kritisk}\approx 84{,}5\;\text{min}" />
        </Step>
        <Pitfall>
          <strong>Bare ekvator har full sentripetal­akselerasjon.</strong> Ved breddegrad φ er
          radien til rotasjonen R cos φ, ikke R. Polene har null sentripetal­akselerasjon, ekvator
          har maks.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 84,5 min er omtrent omløpstiden til ISS — ikke tilfeldig. Det er
          akkurat tiden et objekt i lav banehøyde trenger på sin omløp, fordi g leverer hele
          sentripetal­kraften ved den hastigheten.
        </p>
      </div>
    ),
    summary: <p>Sentripetal­akselerasjon ved Jordens ekvator er bare ~0,3 % av g; ville måtte rotere ~17× raskere for å «kaste» objekter av.</p>,
  },

  // ==========================================================================
  // 3.28 — Helikopter rotor
  // ==========================================================================
  "3.28": {
    title: "Helikopter­rotor — 4 blader 3,00 m",
    difficulty: "lett",
    pageRef: "s. 122",
    problem: (
      <p>
        En modell av en helikopter­rotor har fire blader, hver 3,00 m langt fra sentral­akselen til bladtuppen.
        Modellen roteres i en vind­tunnel ved 470 omdr/min. (a) Hva er linje­farten til bladtuppen i m/s?
        (b) Hva er den radielle akselerasjonen til bladtuppen, uttrykt som et multiplum av g?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Antall blader: 4 (irrelevant for kinematikk — bare for designkontekst)</li>
        <li>Bladlengde: <InlineLatex latex="R=3{,}00\;\text{m}" /></li>
        <li>Vinkelfart: <InlineLatex latex="\omega=470\;\text{omdr/min}" /></li>
        <li>g = 9,80 m/s²</li>
      </ul>
    ),
    unknowns: <p>(a) Linje­fart v ved bladtuppen. (b) Sentripetal­akselerasjon uttrykt som multiplum av g.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vinkelfart, linje­fart og sentripetal­akselerasjon">
          <p>
            For et punkt som beveger seg i sirkel med radius <InlineLatex latex="R" /> og vinkelfart
            <InlineLatex latex="\;\omega" /> (i rad/s) gjelder de tre fundamentale relasjonene:
          </p>
          <FormulaBox variant="gold" latex="v=\omega R,\quad a_\text{rad}=\dfrac{v^2}{R}=\omega^2 R" />
          <p>
            Konvertering fra omdr/min (rev/min) til rad/s: multiplisér med <InlineLatex latex="2\pi" />
            (radianer per omdreining) og del med 60 (sekunder per minutt):
          </p>
          <FormulaBox latex="\omega\;[\text{rad/s}]=\omega\;[\text{rev/min}]\cdot\dfrac{2\pi}{60}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Først konvertér ω til rad/s. Deretter er v = ωR det enkleste valget.</p> },
      { label: "Hint 2", content: <p>For del (b): bruk a = v²/R eller a = ω²R — begge gir samme svar. Del på g for å få a som multiplum.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Først konvertér vinkelfart, så bruk de to formlene direkte.</p>
        <Step n={1} title="Konvertér ω til rad/s">
          <FormulaBox latex="\omega=470\cdot\dfrac{2\pi}{60}=470\cdot 0{,}10472=49{,}22\;\text{rad/s}" />
        </Step>
        <Step n={2} title="(a) Linje­fart ved bladtuppen">
          <FormulaBox latex="v=\omega R=(49{,}22\;\text{rad/s})(3{,}00\;\text{m})=147{,}66\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 148\;\text{m/s}" />
          <p className="text-sm">Det tilsvarer ca. 532 km/t — godt over halvparten av lydfarten ved havnivå.</p>
        </Step>
        <Step n={3} title="(b) Sentripetal­akselerasjon">
          <FormulaBox latex="a_\text{rad}=\dfrac{v^2}{R}=\dfrac{(147{,}66)^2}{3{,}00}=\dfrac{21\,803}{3{,}00}=7268\;\text{m/s}^2" />
          <FormulaBox latex="\dfrac{a_\text{rad}}{g}=\dfrac{7268}{9{,}80}=741{,}6" />
          <FormulaBox variant="gold" latex="a_\text{rad}\approx 742\,g" />
        </Step>
        <Pitfall>
          <strong>Glem aldri 2π-faktoren.</strong> En vanlig feil er å sette ω = 470/60 = 7,83 og glemme
          omregning fra omdreininger til radianer. Da blir alle svarene ca. 6,3× for små. Husk:
          1 omdreining = 2π rad.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 742 g betyr at materialet i bladtuppen må tåle ekstreme sentripetal­krefter.
          Dette er hovedgrunnen til at helikopter­rotorer er begrenset til en bestemt maksimal omdreinings­fart
          — ved høyere fart vil sentrifugal­spenningen overstige strekkfastheten i bladene, og de vil rives
          fra hverandre. Dette er også grunnen til at moderne høyfarts­rotorer bruker karbonfiber­komposit
          med svært høy strekkfasthet/tetthet-forhold.
        </p>
      </div>
    ),
    summary: <p>Sentripetal­akselerasjon vokser med <InlineLatex latex="\omega^2" /> — selv beskjedne radier gir flere hundre g ved typiske rotor­frekvenser.</p>,
  },

  // ==========================================================================
  // 3.31 — Pariserhjul
  // ==========================================================================
  "3.31": {
    title: "Pariserhjul — akselerasjon på topp og bunn (Fig E3.31)",
    difficulty: "middels",
    pageRef: "s. 123",
    problem: (
      <p>
        Et pariserhjul med radius 14,0 m roterer om en horisontal akse gjennom sitt sentrum (Fig. E3.31).
        Linje­farten til en passasjer på rim er konstant lik 7,13 m/s. Hva er størrelsen og retningen av
        passasjerens akselerasjon når hun passerer (a) det laveste punktet i sin sirkulære bevegelse, og
        (b) det høyeste punktet i sin sirkulære bevegelse? (c) Hvor lang tid bruker pariserhjulet på én
        omdreining?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Radius til pariserhjul: <InlineLatex latex="R=14{,}0\;\text{m}" /></li>
        <li>Konstant linje­fart: <InlineLatex latex="v=7{,}13\;\text{m/s}" /></li>
        <li>Bevegelse: jevn sirkulær (uniform circular motion)</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="\vec a" /> ved nederste punkt. (b) <InlineLatex latex="\vec a" /> ved øverste punkt. (c) Omløps­periode T.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Akselerasjon ved jevn sirkulær bevegelse">
          <p>
            Når farten er <em>konstant</em>, har akselerasjonen ingen tangentiell komponent — den er
            ren <em>radial</em> (sentripetal). Den peker alltid mot sentrum av sirkelen, uavhengig av
            hvor på sirkelen objektet befinner seg.
          </p>
          <FormulaBox variant="gold" latex="a_\text{rad}=\dfrac{v^2}{R}\quad\text{(retning: mot sentrum)}" />
          <p>
            Periode (omløpstid) henger sammen med fart og omkrets:
            <InlineLatex latex="\;T=\dfrac{2\pi R}{v}" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Størrelsen på akselerasjonen er den samme overalt på sirkelen — bare retningen endrer seg.</p> },
      { label: "Hint 2", content: <p>For å finne retningen: ved nederste punkt ligger sentrum rett over, ved øverste punkt ligger sentrum rett under.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Konstant fart gir konstant <InlineLatex latex="|\vec a|" />; bare retning roterer.</p>
        <Step n={1} title="Felles størrelse på akselerasjonen">
          <FormulaBox latex="a_\text{rad}=\dfrac{v^2}{R}=\dfrac{(7{,}13)^2}{14{,}0}=\dfrac{50{,}84}{14{,}0}=3{,}63\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="|\vec a|=3{,}63\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(a) Nederste punkt — retning">
          <p>
            Sentrum av hjulet ligger rett <strong>over</strong> passasjeren ⇒ akselerasjons­vektoren
            peker <strong>oppover</strong>.
          </p>
          <FormulaBox variant="gold" latex="\vec a_\text{bunn}=3{,}63\;\text{m/s}^2\;\text{(opp)}" />
        </Step>
        <Step n={3} title="(b) Øverste punkt — retning">
          <p>
            Sentrum ligger rett <strong>under</strong> passasjeren ⇒ akselerasjons­vektoren peker
            <strong> nedover</strong>.
          </p>
          <FormulaBox variant="gold" latex="\vec a_\text{topp}=3{,}63\;\text{m/s}^2\;\text{(ned)}" />
        </Step>
        <Step n={4} title="(c) Omløps­periode">
          <FormulaBox latex="T=\dfrac{2\pi R}{v}=\dfrac{2\pi(14{,}0)}{7{,}13}=\dfrac{87{,}96}{7{,}13}=12{,}34\;\text{s}" />
          <FormulaBox variant="gold" latex="T\approx 12{,}3\;\text{s}" />
        </Step>
        <Pitfall>
          <strong>Sentripetal­akselerasjon er ikke tyngdekraft.</strong> En passasjer på pariserhjul
          merker også normal­kraften fra setet, som varierer med posisjonen. Ved bunn:
          <InlineLatex latex="\;N-mg=ma_\text{rad}" /> ⇒ N &gt; mg (føler seg «tyngre»). Ved topp:
          <InlineLatex latex="\;mg-N=ma_\text{rad}" /> ⇒ N &lt; mg (føler seg «lettere»).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Akselerasjonen er bare ~37 % av g, så følelsen av tyngde­endring i setet er
          beskjeden — men reell. Hadde periode vært halvparten (6,2 s, dvs. samme R med dobbel fart),
          ville sentripetal­akselerasjonen vært 4× så stor, dvs. ca. 1,5 g — passasjerene ville da
          opplevd følbar press i bunn og lett-vekts-følelse i topp.
        </p>
      </div>
    ),
    summary: <p>Ved jevn sirkulær bevegelse: <InlineLatex latex="|\vec a|=v^2/R" /> overalt; retningen er alltid mot sentrum.</p>,
  },

  // ==========================================================================
  // 3.46 — CALC faulty model rocket
  // ==========================================================================
  "3.46": {
    title: "CALC: feilmodell­rakett i xy-planet",
    difficulty: "vanskelig",
    pageRef: "s. 124",
    problem: (
      <p>
        En feilmodell­rakett beveger seg i xy-planet (positiv y-retning er vertikalt oppover). Rakettens
        akselerasjon har komponenter <InlineLatex latex="\;a_x(t)=\alpha t^2" /> og
        <InlineLatex latex="\;a_y(t)=\beta-\gamma t" />, hvor <InlineLatex latex="\alpha=2{,}50\;\text{m/s}^4" />,
        <InlineLatex latex="\;\beta=9{,}00\;\text{m/s}^2" /> og <InlineLatex latex="\gamma=1{,}40\;\text{m/s}^3" />.
        Ved <InlineLatex latex="\;t=0" /> er raketten ved origo og har hastighet
        <InlineLatex latex="\;\vec v_0=v_{0x}\hat i+v_{0y}\hat j" />, med <InlineLatex latex="v_{0x}=1{,}00" />
        og <InlineLatex latex="v_{0y}=7{,}00\;\text{m/s}" />. (a) Beregn hastighets- og posisjons­vektorer
        som funksjoner av tid. (b) Hva er den maksimale høyden raketten når? (c) Hva er den horisontale
        forflytningen når raketten returnerer til <InlineLatex latex="\;y=0" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="a_x(t)=\alpha t^2,\;\alpha=2{,}50\;\text{m/s}^4" /></li>
        <li><InlineLatex latex="a_y(t)=\beta-\gamma t" />, <InlineLatex latex="\;\beta=9{,}00\;\text{m/s}^2" />, <InlineLatex latex="\;\gamma=1{,}40\;\text{m/s}^3" /></li>
        <li>Initial­hastighet: <InlineLatex latex="\vec v_0=(1{,}00,\,7{,}00)\;\text{m/s}" /></li>
        <li>Initial­posisjon: <InlineLatex latex="\vec r_0=\vec 0" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="\vec v(t)" /> og <InlineLatex latex="\vec r(t)" />. (b) <InlineLatex latex="y_\text{max}" />. (c) <InlineLatex latex="x" /> når <InlineLatex latex="y" /> returnerer til 0.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Integrasjon når akselerasjon er tids­avhengig">
          <p>
            Når <InlineLatex latex="\vec a" /> ikke er konstant, kan du <em>ikke</em> bruke
            <InlineLatex latex="\;v=v_0+at" />. I stedet integrér:
          </p>
          <FormulaBox variant="gold" latex="\vec v(t)=\vec v_0+\int_0^t \vec a(t')\,dt',\quad \vec r(t)=\vec r_0+\int_0^t \vec v(t')\,dt'" />
          <p>
            Maks høyde finnes når <InlineLatex latex="v_y=0" /> (kun da; ikke <InlineLatex latex="a_y=0" />).
            Returtid finnes når <InlineLatex latex="y(t)=0" /> for <InlineLatex latex="t&gt;0" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Integrér komponentvis. <InlineLatex latex="\int t^n\,dt=t^{n+1}/(n+1)" /> — ingen kjede­regel her, bare polynomer.</p> },
      { label: "Hint 2", content: <p>For (b): løs <InlineLatex latex="v_y(t)=0" />. For (c): faktorisér ut t fra y(t) for å skille bort t=0-løsningen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Integrér to ganger komponentvis, så bruk betingelsene for topp og retur.</p>
        <Step n={1} title="(a) Hastighets­vektor">
          <FormulaBox latex="v_x(t)=v_{0x}+\int_0^t \alpha t'^2\,dt'=1{,}00+\dfrac{\alpha}{3}t^3=1{,}00+0{,}833t^3" />
          <FormulaBox latex="v_y(t)=v_{0y}+\int_0^t (\beta-\gamma t')\,dt'=7{,}00+9{,}00t-0{,}700t^2" />
        </Step>
        <Step n={2} title="(a) Posisjons­vektor">
          <FormulaBox latex="x(t)=\int_0^t v_x(t')\,dt'=t+\dfrac{0{,}833}{4}t^4=t+0{,}208t^4" />
          <FormulaBox latex="y(t)=\int_0^t v_y(t')\,dt'=7t+4{,}50t^2-\dfrac{0{,}700}{3}t^3=7t+4{,}50t^2-0{,}233t^3" />
        </Step>
        <Step n={3} title="(b) Maks høyde — finn t når v_y=0">
          <FormulaBox latex="7+9t-0{,}700t^2=0\Rightarrow 0{,}700t^2-9t-7=0" />
          <FormulaBox latex="t=\dfrac{9+\sqrt{81+19{,}6}}{1{,}4}=\dfrac{9+10{,}03}{1{,}4}=13{,}59\;\text{s}" />
          <FormulaBox latex="y_\text{max}=7(13{,}59)+4{,}50(13{,}59)^2-0{,}233(13{,}59)^3" />
          <FormulaBox latex="=95{,}1+831{,}3-585{,}1=341\;\text{m}" />
          <FormulaBox variant="gold" latex="y_\text{max}\approx 341\;\text{m}" />
        </Step>
        <Step n={4} title="(c) Returtid og horisontal forflytning">
          <p>Sett y=0 og faktorisér:</p>
          <FormulaBox latex="0=t(7+4{,}50t-0{,}233t^2)" />
          <p>Løsninger: t=0 (start) eller <InlineLatex latex="\;0{,}233t^2-4{,}50t-7=0" />.</p>
          <FormulaBox latex="t=\dfrac{4{,}50+\sqrt{20{,}25+6{,}52}}{0{,}466}=\dfrac{4{,}50+5{,}17}{0{,}466}=20{,}77\;\text{s}" />
          <FormulaBox latex="x(20{,}77)=20{,}77+0{,}208(20{,}77)^4=20{,}77+38\,710\approx 3{,}87\times 10^4\;\text{m}" />
          <FormulaBox variant="gold" latex="x_\text{retur}\approx 3{,}87\times 10^4\;\text{m}=38{,}7\;\text{km}" />
        </Step>
        <Pitfall>
          <strong>«Maks høyde når a_y=0» er en vanlig feil.</strong> Maks høyde inntreffer når
          <InlineLatex latex="\;v_y=0" />. <InlineLatex latex="a_y=0" /> betyr bare at
          <InlineLatex latex="\;v_y" /> akkurat når sin maksimums­verdi — ikke at posisjonen y når
          maksimum. Test gjerne med konstant tyngde­akselerasjon: a_y = −g er aldri null, men y når
          fortsatt et toppunkt.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Den horisontale akselerasjonen <InlineLatex latex="\;a_x=\alpha t^2" />
          vokser hurtig med tid, så x-komponenten dominerer ved store t — derfor blir x_retur
          ekstremt stor (38 km) selv om vertikal toppen bare er 341 m. En reell rakett ville aldri
          oppføre seg slik; dette er en oppdiktet test­modell for å øve integrasjon med tids­avhengig
          akselerasjon.
        </p>
      </div>
    ),
    summary: <p>Tids­avhengig <InlineLatex latex="\vec a" />: integrér to ganger komponentvis. Topp når <InlineLatex latex="v_y=0" />, retur når <InlineLatex latex="y=0" />.</p>,
  },

  // ==========================================================================
  // 3.48 — CALC dragonfly
  // ==========================================================================
  "3.48": {
    title: "CALC: øyenstikker — vinkel og akselerasjon",
    difficulty: "vanskelig",
    pageRef: "s. 124",
    problem: (
      <p>
        Posisjonen til en øyenstikker som flyr parallelt med bakken er gitt som funksjon av tid ved
        <InlineLatex latex="\;\vec r=[2{,}90\;\text{m}+(0{,}0900\;\text{m/s}^2)t^2]\hat i-(0{,}0150\;\text{m/s}^3)t^3\hat j" />.
        (a) Ved hvilken verdi av t lager hastighets­vektoren en vinkel 32,0° med klokken (under +x)
        fra +x-aksen? (b) Ved tidspunktet beregnet i (a), hva er størrelsen og retningen til øyenstikkers
        akselerasjons­vektor?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Posisjon: <InlineLatex latex="\vec r(t)=[2{,}90+0{,}0900t^2]\hat i-0{,}0150t^3\hat j\;\text{m}" /></li>
        <li>Vinkel for hastighets­retning: <InlineLatex latex="-32{,}0°" /> (under +x-aksen)</li>
        <li>Bevegelsen er parallell med bakken (xy-plan)</li>
      </ul>
    ),
    unknowns: <p>(a) Tid t hvor <InlineLatex latex="\vec v" /> peker 32° under +x. (b) <InlineLatex latex="|\vec a|" /> og retning ved den tid.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vinkel mellom vektor og akse">
          <p>
            Vinkelen <InlineLatex latex="\theta" /> som en vektor <InlineLatex latex="\;\vec v=v_x\hat i+v_y\hat j" />
            danner med +x-aksen er gitt ved
          </p>
          <FormulaBox variant="gold" latex="\tan\theta=\dfrac{v_y}{v_x}" />
          <p>
            Fortegnet på <InlineLatex latex="\tan\theta" /> avgjør kvadrant: positiv y-komponent →
            over +x, negativ → under +x. «32° under +x» betyr <InlineLatex latex="\theta=-32°" />.
          </p>
          <p className="text-sm">
            Hastighet: <InlineLatex latex="\vec v=d\vec r/dt" />. Akselerasjon: <InlineLatex latex="\vec a=d\vec v/dt" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver komponentvis. <InlineLatex latex="d(t^n)/dt=nt^{n-1}" /> — ren polynom­derivasjon.</p> },
      { label: "Hint 2", content: <p>Med <InlineLatex latex="v_x(t)=0{,}180t" /> og <InlineLatex latex="v_y(t)=-0{,}0450t^2" />, bør forholdet forenkle pent og gi en lineær ligning i t.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Deriver, så bruk vinkel­betingelsen, så evaluér akselerasjonen.</p>
        <Step n={1} title="Hastighet (deriver r(t))">
          <FormulaBox latex="v_x(t)=\dfrac{d}{dt}[2{,}90+0{,}0900t^2]=0{,}180t\;\text{m/s}" />
          <FormulaBox latex="v_y(t)=\dfrac{d}{dt}[-0{,}0150t^3]=-0{,}0450t^2\;\text{m/s}" />
        </Step>
        <Step n={2} title="Akselerasjon (deriver v(t))">
          <FormulaBox latex="a_x(t)=0{,}180\;\text{m/s}^2,\quad a_y(t)=-0{,}0900t\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(a) Finn t der vinkel = −32°">
          <FormulaBox latex="\tan(-32°)=\dfrac{v_y}{v_x}=\dfrac{-0{,}0450t^2}{0{,}180t}=-0{,}250t" />
          <FormulaBox latex="-0{,}6249=-0{,}250t\Rightarrow t=2{,}500\;\text{s}" />
          <FormulaBox variant="gold" latex="t=2{,}50\;\text{s}" />
        </Step>
        <Step n={4} title="(b) Akselerasjons­vektor ved t=2,50 s">
          <FormulaBox latex="a_x=0{,}180\;\text{m/s}^2,\;a_y=-0{,}0900(2{,}50)=-0{,}225\;\text{m/s}^2" />
          <FormulaBox latex="|\vec a|=\sqrt{(0{,}180)^2+(0{,}225)^2}=\sqrt{0{,}0324+0{,}0506}=\sqrt{0{,}0830}=0{,}288\;\text{m/s}^2" />
          <FormulaBox latex="\theta_a=\arctan\dfrac{-0{,}225}{0{,}180}=\arctan(-1{,}250)=-51{,}3°" />
          <FormulaBox variant="gold" latex="|\vec a|\approx 0{,}288\;\text{m/s}^2,\;\theta\approx -51{,}3°\;\text{(under +x)}" />
        </Step>
        <Pitfall>
          <strong>Hastighet- og akselerasjons­vinkler er ikke like.</strong> Ved samme tid t danner
          <InlineLatex latex="\;\vec v" /> og <InlineLatex latex="\vec a" /> generelt forskjellige
          vinkler med +x — bare ved jevn rettlinjet bevegelse ligger de parallelt. Her er forskjellen
          51,3° − 32,0° = 19,3°, som tyder på at banen krummer i tillegg til å akselerere langs
          bevegelses­retningen.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Vinkelen mellom <InlineLatex latex="\vec v" /> og <InlineLatex latex="\vec a" />
          forteller om banens form: 90° gir ren sirkel­bevegelse (kun radial a), 0°/180° gir ren
          rettlinjet aks/dec. Her ligger vi imellom — øyenstikkeren krumer banen <em>og</em> endrer
          fart samtidig.
        </p>
      </div>
    ),
    summary: <p>Vinkel­betingelse: <InlineLatex latex="\tan\theta=v_y/v_x" /> med fortegn-konvensjon. Polynom­derivering komponentvis.</p>,
  },

  // ==========================================================================
  // 3.61 — Look Out! snowball
  // ==========================================================================
  "3.61": {
    title: "Look Out! — snøball fra låvetak",
    difficulty: "vanskelig",
    pageRef: "s. 125",
    problem: (
      <p>
        En snøball ruller av et låvetak som heller nedover med vinkel 40°. Kanten av taket er 14,0 m over
        bakken, og snøballen har fart 7,00 m/s når den ruller av taket. Se bort fra luftmotstand.
        (a) Hvor langt fra kanten av låven treffer snøballen bakken hvis den ikke treffer noe annet mens
        den faller? (b) Skisser x-t, y-t, v_x-t og v_y-t-grafer. (c) En 1,9 m høy mann står 4,0 m fra kanten
        av låven. Vil snøballen treffe ham?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Takvinkel: <InlineLatex latex="\alpha=40°" /> under horisontalen</li>
        <li>Takhøyde over bakken: <InlineLatex latex="h=14{,}0\;\text{m}" /></li>
        <li>Initial­fart: <InlineLatex latex="v_0=7{,}00\;\text{m/s}" /></li>
        <li>Mann står 4,0 m fra låven, høyde 1,9 m</li>
        <li>g = 9,80 m/s², ingen luftmotstand</li>
      </ul>
    ),
    unknowns: <p>(a) Horisontal avstand fra låven til nedslag. (c) Vil snøballen treffe mannen?</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Initial­hastighet rettet under horisontalen">
          <p>
            Når kastet skjer <em>under</em> horisontal­planet, blir y-komponenten <em>negativ</em> fra
            start. Med +y opp:
          </p>
          <FormulaBox variant="gold" latex="v_{0x}=v_0\cos\alpha,\quad v_{0y}=-v_0\sin\alpha" />
          <p>
            Bevegelses­ligningene:
            <InlineLatex latex="\;x(t)=v_{0x}t" /> og <InlineLatex latex="\;y(t)=v_{0y}t-\tfrac12 gt^2" />.
            Setter origo ved tak­kanten. Bakken ligger ved <InlineLatex latex="\;y=-h" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a): finn tid t når y=−14,0 m, deretter x=v_0x·t.</p> },
      { label: "Hint 2", content: <p>For (c): finn t når x=4,0 m, sjekk om snøballens y er over eller under mannens hode­høyde (snøball over hode = bommer).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Komponenter, så falltid via 2.-grads, så posisjons­sjekk for mannen.</p>
        <Step n={1} title="Initial­komponenter">
          <FormulaBox latex="v_{0x}=v_0\cos 40°=7{,}00(0{,}766)=5{,}362\;\text{m/s}" />
          <FormulaBox latex="v_{0y}=-v_0\sin 40°=-7{,}00(0{,}643)=-4{,}500\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Falltid (y=−14,0 m)">
          <FormulaBox latex="-14{,}0=v_{0y}t-\tfrac12 gt^2=-4{,}50t-4{,}90t^2" />
          <FormulaBox latex="4{,}90t^2+4{,}50t-14{,}0=0" />
          <FormulaBox latex="t=\dfrac{-4{,}50+\sqrt{(4{,}50)^2+4(4{,}90)(14{,}0)}}{2(4{,}90)}=\dfrac{-4{,}50+\sqrt{20{,}25+274{,}4}}{9{,}80}" />
          <FormulaBox latex="t=\dfrac{-4{,}50+\sqrt{294{,}65}}{9{,}80}=\dfrac{-4{,}50+17{,}17}{9{,}80}=1{,}293\;\text{s}" />
        </Step>
        <Step n={3} title="(a) Horisontal avstand fra låven">
          <FormulaBox latex="x=v_{0x}t=5{,}362(1{,}293)=6{,}93\;\text{m}" />
          <FormulaBox variant="gold" latex="x\approx 6{,}93\;\text{m fra låven}" />
        </Step>
        <Step n={4} title="(c) Mann ved x=4,0 m, hode 1,9 m">
          <p>Tid for at snøballen er ved x=4,0 m:</p>
          <FormulaBox latex="t=\dfrac{4{,}0}{5{,}362}=0{,}746\;\text{s}" />
          <p>Snøballens y-posisjon ved den tid (relativt tak­kanten):</p>
          <FormulaBox latex="y(0{,}746)=-4{,}50(0{,}746)-4{,}90(0{,}746)^2=-3{,}357-2{,}727=-6{,}08\;\text{m}" />
          <p>Snøballens høyde over bakken:</p>
          <FormulaBox latex="h_\text{snøball}=14{,}0-6{,}08=7{,}92\;\text{m}" />
          <p>Mannens hode er 1,9 m over bakken. Snøballen ligger <InlineLatex latex="\;7{,}92-1{,}9=6{,}02\;\text{m}" /> over hodet.</p>
          <FormulaBox variant="gold" latex="\text{Mannen er trygg — snøballen flyr 6,0 m over hodet hans}" />
        </Step>
        <Pitfall>
          <strong>Vinkel «under horisontal» betyr negativ v_0y.</strong> Hadde snøballen blitt kastet
          oppover med samme vinkel og fart, ville falltiden vært betydelig lengre, og x_nedslag
          større. Sjekk alltid fortegnet på v_0y eksplisitt — ikke anta retning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Mannen ville først bli truffet hvis han stod nærmere enn ~6,9 m fra låven —
          og selv da bare hvis han var høy nok eller snøballen lav nok ved hans posisjon. Å løse
          slike geometriske kollisjons­problemer er kjernen i ballistikk, og samme fremgangsmåte
          brukes i alt fra basketball-skudd til artilleri-mål.
        </p>
      </div>
    ),
    summary: <p>Vinkel under horisontal ⇒ negativ v_0y. Sammenlikn snøballens y mot mannens hode­høyde ved hans x for å avgjøre treff.</p>,
  },
};
