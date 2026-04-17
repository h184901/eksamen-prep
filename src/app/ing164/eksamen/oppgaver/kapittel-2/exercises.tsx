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
      <marker id="arrow-red-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 2
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 2.1 — To-etapper bilreise
  // ==========================================================================
  "2.1": {
    title: "Gjennomsnittshastighet over to etapper",
    difficulty: "lett",
    pageRef: "s. 58",
    problem: (
      <p>
        En bil kjører rettlinjet med gjennomsnittshastighet 80 km/t i 2,5 t, og
        deretter 40 km/t i 1,5 t. (a) Hva er den totale forskyvningen?
        (b) Hva er gjennomsnittshastigheten for hele turen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_1=80\;\text{km/t}" /> i <InlineLatex latex="t_1=2{,}5\;\text{t}" /></li>
        <li><InlineLatex latex="v_2=40\;\text{km/t}" /> i <InlineLatex latex="t_2=1{,}5\;\text{t}" /></li>
        <li>Samme retning</li>
      </ul>
    ),
    unknowns: <p>Total forskyvning og gjennomsnittshastighet.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Gjennomsnittshastighet er ikke gjennomsnittet av hastighetene">
          <p>Definisjon:</p>
          <FormulaBox latex="v_\text{gj}=\frac{\Delta x_\text{tot}}{\Delta t_\text{tot}}" variant="gold" />
          <p className="mt-1">
            Du må regne total forskyvning og total tid separat, <em>ikke</em> ta
            gjennomsnittet av de to hastighetene (det gir bare riktig svar når
            etappene er like lange i tid).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Forskyvning per etappe: <InlineLatex latex="\Delta x_i=v_i\,t_i" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Forskyvning per etappe">
          <FormulaBox latex="\Delta x_1=(80)(2{,}5)=200\;\text{km},\quad \Delta x_2=(40)(1{,}5)=60\;\text{km}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Total forskyvning">
          <FormulaBox latex="\Delta x=200+60=\boxed{260\;\text{km}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Gjennomsnittshastighet">
          <FormulaBox latex="v_\text{gj}=\frac{260}{2{,}5+1{,}5}=\frac{260}{4{,}0}=\boxed{65\;\text{km/t}}" variant="gold" />
          <p className="italic text-xs">Merk: <InlineLatex latex="(80+40)/2=60" /> ≠ 65. Vekt av tid gjør at etappen med 80 km/t bidrar mer.</p>
        </Step>
      </div>
    ),
    summary: <p>Gjennomsnitt = total forskyvning / total tid. Aldri bare "gjennomsnittet av farten" med mindre tiden er lik.</p>,
  },

  // ==========================================================================
  // 2.2 — Havsule som flyr tilbake til redet
  // ==========================================================================
  "2.2": {
    title: "Gjennomsnittshastighet for havsule",
    difficulty: "lett",
    pageRef: "s. 58",
    problem: (
      <p>
        En havsule ble fraktet 5150 km bort fra redet og sluppet. Den fant veien
        tilbake 13,5 dager senere. Legg origo ved redet og +x mot slippstedet.
        (a) Hva er gjennomsnittshastigheten på returen? (b) For hele episoden
        (fra redet → slipp → redet)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Avstand bortover: <InlineLatex latex="5150\;\text{km}" /></li>
        <li>Returtid: <InlineLatex latex="13{,}5\;\text{dager}" /></li>
      </ul>
    ),
    unknowns: <p>Gjennomsnittshastighet på returen og for hele turen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Forskyvning (vektor) vs. tilbakelagt avstand (skalar)">
          <p>
            <strong>Gjennomsnittshastighet</strong> bruker forskyvning — der du
            slutter minus der du startet (vektor, kan være negativ eller 0).
          </p>
          <p>
            <strong>Gjennomsnittsfart</strong> bruker tilbakelagt avstand (alltid
            positiv).
          </p>
          <p>Når start- og sluttpunkt er like → forskyvning = 0 → gjennomsnittshastighet = 0.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>(b): Redet → redet, så total forskyvning er 0 km.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Returen">
          <p>Forskyvning: <InlineLatex latex="-5150\;\text{km}" /> (mot origo). Tid: 13,5 dager.</p>
          <FormulaBox latex="v_\text{gj}=\frac{-5150}{13{,}5}=\boxed{-381\;\text{km/dag}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Hele episoden">
          <p>Start = slutt = redet → total forskyvning = 0:</p>
          <FormulaBox latex="v_\text{gj}=\frac{0}{\Delta t}=\boxed{0\;\text{km/dag}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Forskyvning avhenger bare av endepunktene. En lang rundtur gir null gjennomsnittshastighet.</p>,
  },

  // ==========================================================================
  // 2.4 — Kortet hjemreise
  // ==========================================================================
  "2.4": {
    title: "Hvor mye lenger tar turen i kø?",
    difficulty: "lett",
    pageRef: "s. 58",
    problem: (
      <p>
        På fri flyt kjører du 105 km/t mellom to byer, og reisen tar 2 t 20 min.
        På en fredag i kø: 70 km/t i snitt over samme avstand. Hvor mye lenger
        tar turen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Normalt: <InlineLatex latex="v_1=105\;\text{km/t},\;t_1=2\;\text{t}\,20\;\text{min}=2{,}333\;\text{t}" /></li>
        <li>Fredag: <InlineLatex latex="v_2=70\;\text{km/t}" /></li>
      </ul>
    ),
    unknowns: <p>Differansen i reisetid.</p>,
    strategy: (
      <p>
        Samme avstand to ganger. Finn avstanden, beregn nye tider.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="d=v_1 t_1" />, deretter <InlineLatex latex="t_2=d/v_2" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Avstanden">
          <FormulaBox latex="d=(105)(2{,}333)=245\;\text{km}" variant="blue" />
        </Step>
        <Step n={2} title="Ny reisetid">
          <FormulaBox latex="t_2=\frac{245}{70}=3{,}50\;\text{t}=3\;\text{t}\,30\;\text{min}" variant="blue" />
        </Step>
        <Step n={3} title="Differanse">
          <FormulaBox latex="\Delta t=3{,}50-2{,}333=\boxed{1{,}17\;\text{t}\approx 70\;\text{min}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Samme avstand, men 33 % lavere fart. Tid ~ 1/fart, så tiden øker med en faktor 105/70 = 1,5.</p>,
  },

  // ==========================================================================
  // 2.5 — Springer frem og tilbake
  // ==========================================================================
  "2.5": {
    title: "Gjennomsnittsfart vs. gjennomsnittshastighet",
    difficulty: "lett",
    pageRef: "s. 58",
    problem: (
      <p>
        Fra en søyle løper du 200 m øst (+x) med snittfart 5,0 m/s, og 280 m
        vest med snittfart 4,0 m/s til en stolpe. Regn ut (a) gjennomsnittsfarten
        og (b) gjennomsnittshastigheten fra søyle til stolpe.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Øst: 200 m i 5,0 m/s</li>
        <li>Vest: 280 m i 4,0 m/s</li>
      </ul>
    ),
    unknowns: <p>Snittfart og snittfartshastighet.</p>,
    strategy: (
      <TheoryBox title="Fart vs. hastighet">
        <FormulaBox latex="\text{fart}=\frac{\text{total avstand}}{\Delta t},\quad \text{hastighet}=\frac{\Delta x}{\Delta t}" variant="gold" />
        <p>Fart bruker tilbakelagt <em>sum</em>, hastighet bruker forskyvning.</p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Total tid: <InlineLatex latex="200/5+280/4=40+70=110\;\text{s}" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Tid for hver etappe og totalt">
          <FormulaBox latex="t_1=40\;\text{s},\;t_2=70\;\text{s},\;t_\text{tot}=110\;\text{s}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Gjennomsnittsfart">
          <FormulaBox latex="\text{fart}=\frac{200+280}{110}=\frac{480}{110}=\boxed{4{,}36\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Gjennomsnittshastighet">
          <p>Forskyvning: <InlineLatex latex="200-280=-80\;\text{m}" /> (80 m vest).</p>
          <FormulaBox latex="v_\text{gj}=\frac{-80}{110}=\boxed{-0{,}727\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Fart (skalar) og hastighet (vektor) er forskjellige når bevegelsen skifter retning. Hastighet kan også være negativ.</p>,
  },

  // ==========================================================================
  // 2.6 — Honda Civic, x(t)
  // ==========================================================================
  "2.6": {
    title: "Gjennomsnittshastighet fra x(t)",
    difficulty: "lett",
    pageRef: "s. 58",
    problem: (
      <p>
        En Honda Civic har posisjon <InlineLatex latex="x(t)=\alpha t^2-\beta t^3" />,{" "}
        <InlineLatex latex="\alpha=1{,}50\;\text{m/s}^2,\;\beta=0{,}0500\;\text{m/s}^3" />.
        Regn ut gjennomsnittshastigheten for (a) 0–2,00 s, (b) 0–4,00 s,
        (c) 2,00–4,00 s.
      </p>
    ),
    knowns: <p>Posisjonfunksjon og tre tidsintervaller.</p>,
    unknowns: <p>Tre gjennomsnittshastigheter.</p>,
    strategy: (
      <p>
        <InlineLatex latex="v_\text{gj}=\frac{x(t_2)-x(t_1)}{t_2-t_1}" />. Regn ut
        posisjonen ved endepunktene.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="x(2)=1{,}50\cdot 4-0{,}05\cdot 8=6{,}00-0{,}40=5{,}60\;\text{m}" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Posisjoner">
          <FormulaBox latex="x(0)=0,\;x(2)=5{,}60\;\text{m},\;x(4)=1{,}5\cdot 16-0{,}05\cdot 64=24{,}0-3{,}20=20{,}8\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="(a) 0 til 2 s">
          <FormulaBox latex="v=\frac{5{,}60-0}{2}=\boxed{2{,}80\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) 0 til 4 s">
          <FormulaBox latex="v=\frac{20{,}8-0}{4}=\boxed{5{,}20\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={4} title="(c) 2 til 4 s">
          <FormulaBox latex="v=\frac{20{,}8-5{,}60}{2}=\frac{15{,}20}{2}=\boxed{7{,}60\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Gjennomsnittshastighet er sekantlinjens stigning på x-t-grafen mellom to punkter.</p>,
  },

  // ==========================================================================
  // 2.7 — Momentanfart fra x(t)
  // ==========================================================================
  "2.7": {
    title: "Momentanfart ved derivasjon",
    difficulty: "middels",
    pageRef: "s. 59",
    problem: (
      <p>
        For bilen i oppgave 2.6, finn momentanhastigheten ved (a){" "}
        <InlineLatex latex="t=0" />, (b) <InlineLatex latex="t=5{,}00\;\text{s}" />,
        (c) <InlineLatex latex="t=10{,}0\;\text{s}" />. (d) Hvor lang tid før
        bilen igjen er i ro?
      </p>
    ),
    knowns: <p><InlineLatex latex="x(t)=\alpha t^2-\beta t^3" />, samme konstanter som 2.6.</p>,
    unknowns: <p>Momentanhastighet på 3 punkt, tid til ro.</p>,
    strategy: (
      <TheoryBox title="Momentanhastighet">
        <FormulaBox latex="v(t)=\frac{dx}{dt}" variant="gold" />
        <p>For polynomer: <InlineLatex latex="\frac{d}{dt}(at^n)=n a t^{n-1}" />.</p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Deriver: <InlineLatex latex="v(t)=2\alpha t-3\beta t^2" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Derivert">
          <FormulaBox latex="v(t)=2\alpha t-3\beta t^2=3{,}00t-0{,}150t^2\;\text{m/s}" variant="blue" />
        </Step>
        <Step n={2} title="(a), (b), (c)">
          <ul className="list-disc pl-5">
            <li><InlineLatex latex="v(0)=\boxed{0}" /></li>
            <li><InlineLatex latex="v(5)=15{,}00-3{,}75=\boxed{11{,}25\;\text{m/s}}" /></li>
            <li><InlineLatex latex="v(10)=30{,}0-15{,}0=\boxed{15{,}0\;\text{m/s}}" /></li>
          </ul>
        </Step>
        <Step n={3} title="(d) Tid igjen i ro">
          <p>Sett <InlineLatex latex="v=0" />:</p>
          <FormulaBox latex="3{,}00t-0{,}150t^2=0\;\Rightarrow\; t(3{,}00-0{,}150t)=0\;\Rightarrow\; t=20{,}0\;\text{s}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Momentanhastighet er tangentstigningen på x-t-grafen. Finn når v=0 for å finne vendepunkter.</p>,
  },

  // ==========================================================================
  // 2.8 — Truck, snittshastighet
  // ==========================================================================
  "2.8": {
    title: "Snitthastighet og momentan",
    difficulty: "lett",
    pageRef: "s. 59",
    problem: (
      <p>
        En truck beveger seg langs x-aksen med{" "}
        <InlineLatex latex="x(t)=2{,}17+(4{,}80)t-(2{,}10)t^2" /> (SI-enheter).
        (a) Gjennomsnittshastigheten mellom <InlineLatex latex="t=0" /> og{" "}
        <InlineLatex latex="t=2{,}00\;\text{s}" />? (b) Momentanhastighet ved{" "}
        <InlineLatex latex="t=2{,}00\;\text{s}" />?
      </p>
    ),
    knowns: <p>Posisjonsfunksjonen gitt.</p>,
    unknowns: <p>Gjennomsnitt og momentan ved <InlineLatex latex="t=2\;\text{s}" />.</p>,
    strategy: <p>(a) bruker endepunktene, (b) bruker den deriverte.</p>,
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="v(t)=4{,}80-4{,}20t" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Posisjoner">
          <FormulaBox latex="x(0)=2{,}17,\;x(2)=2{,}17+9{,}60-8{,}40=3{,}37\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Snittet">
          <FormulaBox latex="v_\text{gj}=\frac{3{,}37-2{,}17}{2}=\boxed{0{,}60\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Momentant">
          <FormulaBox latex="v(2)=4{,}80-4{,}20\cdot 2=\boxed{-3{,}60\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">Trucken har byttet retning innen <InlineLatex latex="t=2\;\text{s}" /> — positiv snitthastighet, men negativ momentan!</p>
        </Step>
      </div>
    ),
    summary: <p>Gjennomsnitt og momentan kan ha ulikt fortegn dersom bevegelsen bytter retning.</p>,
  },

  // ==========================================================================
  // 2.10 — Professor som går i regn (graf-tolkning)
  // ==========================================================================
  "2.10": {
    title: "Lese av bevegelse fra x-t-graf",
    difficulty: "lett",
    pageRef: "s. 59",
    problem: (
      <p>
        En professor går hjemmefra mot campus. Etter 5 min begynner det å regne,
        og hun går hjem igjen. Avstanden fra huset som funksjon av tid er gitt
        grafisk (merkede punkter A, B, C, D, E). Ved hvilke punkter er
        hastigheten hennes (a) null, (b) konstant og positiv, (c) konstant og
        negativ, (d) øker i størrelse, (e) avtar i størrelse?
      </p>
    ),
    knowns: <p>Grafen.</p>,
    unknowns: <p>Tolkning.</p>,
    strategy: (
      <TheoryBox title="Tolkning av x-t-graf">
        <ul className="list-disc pl-5">
          <li>Stigningstall = momentan hastighet</li>
          <li>Horisontal ↔ v = 0 (står stille)</li>
          <li>Positiv stigning ↔ v &gt; 0 (beveger seg mot +x)</li>
          <li>Krummet oppover ↔ |v| øker (akselerasjon i samme retning som v)</li>
        </ul>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Tenk stigningstall; krumning forteller om fartsendring.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <p>
          Konkrete svar avhenger av grafen i boken, men tolkningen er:
        </p>
        <ul className="list-disc pl-5">
          <li>(a) Null: der x-t-grafen er horisontal (typisk ved snupunkt eller pause)</li>
          <li>(b) Konstant positiv: rett linje med positiv stigning</li>
          <li>(c) Konstant negativ: rett linje med negativ stigning (på vei tilbake)</li>
          <li>(d) Øker: buen krummer bort fra x-aksen</li>
          <li>(e) Avtar: buen "flater ut" mot horisontalen</li>
        </ul>
      </div>
    ),
    summary: <p>x-t-grafer oppsummerer bevegelse — lær å lese stigning (v) og krumning (a) visuelt.</p>,
  },

  // ==========================================================================
  // 2.12 — Test-bil med a(t) spesial
  // ==========================================================================
  "2.12": {
    title: "Posisjon og akselerasjon når v=0",
    difficulty: "middels",
    pageRef: "s. 60",
    problem: (
      <p>
        Posisjonen til et testbilkontrollsystem er{" "}
        <InlineLatex latex="x(t)=2{,}17+(4{,}80)t^2-(0{,}100)t^6" /> (SI).
        Finn posisjonen og akselerasjonen i de øyeblikkene bilen har null
        hastighet.
      </p>
    ),
    knowns: <p><InlineLatex latex="x(t)" /> gitt.</p>,
    unknowns: <p><InlineLatex latex="x,a" /> når <InlineLatex latex="v=0" />.</p>,
    strategy: (
      <p>
        Finn <InlineLatex latex="v(t)=dx/dt" />, sett lik null, finn tidspunktene.
        Deretter bruk <InlineLatex latex="a=dv/dt" /> på de samme tidene.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="v(t)=9{,}60t-0{,}600t^5" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Nullpunkter av v">
          <FormulaBox latex="9{,}60t-0{,}600t^5=0\;\Rightarrow\;t(9{,}60-0{,}600t^4)=0" variant="blue" />
          <p>Dette gir <InlineLatex latex="t=0" /> eller <InlineLatex latex="t^4=16\Rightarrow t=2{,}00\;\text{s}" />.</p>
        </Step>
        <Step n={2} title="Ved t=0">
          <FormulaBox latex="x=2{,}17\;\text{m},\quad a(0)=9{,}60\;\text{m/s}^2" variant="blue" />
        </Step>
        <Step n={3} title="Ved t=2,00 s">
          <FormulaBox latex="x=2{,}17+4{,}80\cdot 4-0{,}100\cdot 64=2{,}17+19{,}2-6{,}40=14{,}97\;\text{m}" variant="blue" />
          <FormulaBox latex="a(t)=9{,}60-3{,}00t^4\;\Rightarrow\;a(2)=9{,}60-48{,}0=-38{,}4\;\text{m/s}^2" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Null hastighet ≠ null akselerasjon! Ved snupunkter har en bil ofte stor akselerasjon.</p>,
  },

  // ==========================================================================
  // 2.13 — Gjennomsnittsakselerasjon
  // ==========================================================================
  "2.13": {
    title: "Snittakselerasjon fra fartsendring",
    difficulty: "lett",
    pageRef: "s. 60",
    problem: (
      <p>
        En astronaut har forlatt en romskip for å reparere en svikt. For å kunne
        komme seg tilbake, bruker hun en jet-pakke. Hun starter i ro, og den
        gjennomsnittlige akselerasjonen er <InlineLatex latex="0{,}500\;\text{m/s}^2" />{" "}
        i 15,0 s. (a) Hva er sluttfarten? (b) Hva blir tiden for å stoppe igjen
        dersom retardasjonen er <InlineLatex latex="-2{,}00\;\text{m/s}^2" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=0" />, <InlineLatex latex="a_1=0{,}500\;\text{m/s}^2" />, <InlineLatex latex="t_1=15{,}0\;\text{s}" /></li>
        <li><InlineLatex latex="a_2=-2{,}00\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart etter akselerasjonsfasen og tid til stopp.</p>,
    strategy: <p>Bruk <InlineLatex latex="v=v_0+at" /> to ganger.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Sluttfart">
          <FormulaBox latex="v=0+0{,}500\cdot 15{,}0=\boxed{7{,}50\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid til stopp">
          <FormulaBox latex="0=7{,}50+(-2{,}00)t\;\Rightarrow\;t=\boxed{3{,}75\;\text{s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Akselerasjon er rate av fartsendring. Enheter: m/s² = (m/s)/s.</p>,
  },

  // ==========================================================================
  // 2.14 — Akselerasjon fra v(t)
  // ==========================================================================
  "2.14": {
    title: "Akselerasjon fra hastighetsfunksjon",
    difficulty: "lett",
    pageRef: "s. 60",
    problem: (
      <p>
        En bil har hastighet <InlineLatex latex="v_x(t)=\alpha+\beta t^2" /> med{" "}
        <InlineLatex latex="\alpha=3{,}00\;\text{m/s},\;\beta=0{,}100\;\text{m/s}^3" />.
        (a) Regn ut gjennomsnittsakselerasjonen for 0–5,00 s.
        (b) Momentanakselerasjonen ved <InlineLatex latex="t=5{,}00\;\text{s}" />.
      </p>
    ),
    knowns: <p><InlineLatex latex="v_x(t)" /> gitt.</p>,
    unknowns: <p>Snitt og momentan a.</p>,
    strategy: (
      <TheoryBox title="Akselerasjon, to definisjoner">
        <FormulaBox latex="\bar a=\frac{\Delta v}{\Delta t},\quad a(t)=\frac{dv}{dt}" variant="gold" />
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Snitt">
          <p><InlineLatex latex="v(0)=3{,}00,\;v(5)=3{,}00+0{,}100\cdot 25=5{,}50\;\text{m/s}" />.</p>
          <FormulaBox latex="\bar a=\frac{5{,}50-3{,}00}{5}=\boxed{0{,}500\;\text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Momentant">
          <FormulaBox latex="a(t)=2\beta t=0{,}200t\;\Rightarrow\; a(5)=\boxed{1{,}00\;\text{m/s}^2}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Snitt er sekant på v-t-grafen; momentan er tangent.</p>,
  },

  // ==========================================================================
  // 2.15 — Akselerasjon fra graf
  // ==========================================================================
  "2.15": {
    title: "Tolk v-t-graf",
    difficulty: "lett",
    pageRef: "s. 60",
    problem: (
      <div className="space-y-2">
        <p>
          En bil har en v-t-graf: fra <InlineLatex latex="t=0" /> til <InlineLatex latex="t=10\;\text{s}" /> stiger v fra 0 til
          20 m/s (rettlinjet), flatt 20 m/s fra 10 til 20 s, og fra 20 til 30 s
          synker v tilbake til 0. (a) Skisser a-t. (b) Hva er snitt-a for hele
          30 s?
        </p>
        <svg viewBox="0 0 300 150" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="30" y1="120" x2="290" y2="120" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="120" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <text x="280" y="135" fontSize="10">t (s)</text>
          <text x="10" y="25" fontSize="10">v (m/s)</text>
          <line x1="30" y1="120" x2="115" y2="40" stroke="#3b82f6" strokeWidth="2.5" />
          <line x1="115" y1="40" x2="200" y2="40" stroke="#3b82f6" strokeWidth="2.5" />
          <line x1="200" y1="40" x2="285" y2="120" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="30" y="135" fontSize="9">0</text>
          <text x="115" y="135" fontSize="9">10</text>
          <text x="200" y="135" fontSize="9">20</text>
          <text x="285" y="135" fontSize="9">30</text>
          <text x="15" y="44" fontSize="9">20</text>
        </svg>
      </div>
    ),
    knowns: <p>Grafen over.</p>,
    unknowns: <p>a-t-graf og snitt-a.</p>,
    strategy: <p>Stigningstall på v-t gir a. Snitt: <InlineLatex latex="(v_f-v_0)/\Delta t" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Akselerasjonsgraf">
          <p>3 konstante segmenter:</p>
          <ul className="list-disc pl-5">
            <li>0–10 s: <InlineLatex latex="a=+2{,}0\;\text{m/s}^2" /></li>
            <li>10–20 s: <InlineLatex latex="a=0" /></li>
            <li>20–30 s: <InlineLatex latex="a=-2{,}0\;\text{m/s}^2" /></li>
          </ul>
        </Step>
        <Step n={2} title="(b) Snitt over 30 s">
          <FormulaBox latex="\bar a=\frac{0-0}{30}=\boxed{0\;\text{m/s}^2}" variant="gold" />
          <p className="italic text-xs">Starter og slutter i ro. Selv om akselerasjonen varierer mye, er <em>snittet</em> null.</p>
        </Step>
      </div>
    ),
    summary: <p>Stigningstall på v-t-grafen = a. Horisontalt segment = konstant v.</p>,
  },

  // ==========================================================================
  // 2.19 — Konstant a, kinematikk
  // ==========================================================================
  "2.19": {
    title: "Kinematikk med konstant akselerasjon",
    difficulty: "lett",
    pageRef: "s. 60",
    problem: (
      <p>
        En bil akselererer jevnt fra hvile til 30,0 m/s på en rett strekning på
        350 m. (a) Hvor stor er akselerasjonen? (b) Hvor lang tid tar det?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=0,\;v=30{,}0\;\text{m/s},\;x-x_0=350\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>a og t.</p>,
    strategy: (
      <TheoryBox title="Fire kinematiske formler (konstant a)">
        <FormulaBox latex="v=v_0+at" variant="blue" />
        <FormulaBox latex="x=x_0+v_0t+\tfrac12 at^2" variant="blue" />
        <FormulaBox latex="v^2=v_0^2+2a(x-x_0)" variant="blue" />
        <FormulaBox latex="x-x_0=\tfrac12(v_0+v)t" variant="blue" />
        <p>Velg den som unngår den størrelsen du ikke har/trenger.</p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Tiden er ikke gitt — bruk <InlineLatex latex="v^2=v_0^2+2as" /> for a.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Akselerasjon">
          <FormulaBox latex="a=\frac{v^2-v_0^2}{2s}=\frac{30{,}0^2}{2\cdot 350}=\boxed{1{,}29\;\text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid">
          <FormulaBox latex="t=\frac{v-v_0}{a}=\frac{30{,}0}{1{,}29}=\boxed{23{,}3\;\text{s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Strategi: tell kjente variabler, velg formel som inneholder akkurat disse og den du søker.</p>,
  },

  // ==========================================================================
  // 2.23 — Landingsbane
  // ==========================================================================
  "2.23": {
    title: "Landingsstrekning for jetfly",
    difficulty: "middels",
    pageRef: "s. 60",
    problem: (
      <p>
        Et jetfly lander med fart 100 m/s. Maks retardasjon er 5,00 m/s².
        (a) Hvor lang tid trenger det før det stopper? (b) Kan det lande på en
        0,800 km lang bane?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=100\;\text{m/s},\;v=0,\;a=-5{,}00\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>t og stoppedistanse.</p>,
    strategy: <p><InlineLatex latex="v=v_0+at" /> gir t; <InlineLatex latex="v^2=v_0^2+2as" /> gir s.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Tid">
          <FormulaBox latex="t=\frac{0-100}{-5{,}00}=\boxed{20{,}0\;\text{s}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Distanse">
          <FormulaBox latex="s=\frac{-v_0^2}{2a}=\frac{-10000}{-10{,}00}=1000\;\text{m}=1{,}00\;\text{km}" variant="gold" />
          <p><strong>Trenger 1 km</strong> — 0,8 km er for kort. <strong>Klarer ikke</strong>.</p>
        </Step>
      </div>
    ),
    summary: <p>Stoppedistanse skalerer kvadratisk med fart. Jetfly trenger lange baner.</p>,
  },

  // ==========================================================================
  // 2.28 — Akselerasjon av rakett
  // ==========================================================================
  "2.28": {
    title: "To-etappe rakett",
    difficulty: "middels",
    pageRef: "s. 61",
    problem: (
      <p>
        En rakett akselererer oppover fra hvile med{" "}
        <InlineLatex latex="a_1=16{,}0\;\text{m/s}^2" /> i 10,0 s, og så{" "}
        <InlineLatex latex="a_2=32{,}0\;\text{m/s}^2" /> (etter etappe-separasjon)
        i ytterligere 5,0 s. (a) Topphastighet? (b) Høyde ved slutten av
        etappe 2?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Etappe 1: <InlineLatex latex="a=16\;\text{m/s}^2,\;t=10\;\text{s}" /></li>
        <li>Etappe 2: <InlineLatex latex="a=32\;\text{m/s}^2,\;t=5\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Topphastighet og total høyde.</p>,
    strategy: <p>To konstante-a-etapper. Bruk sluttresultat fra etappe 1 som startverdi for etappe 2.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Etappe 1">
          <FormulaBox latex="v_1=16\cdot 10=160\;\text{m/s}" variant="blue" />
          <FormulaBox latex="h_1=\tfrac12\cdot 16\cdot 10^2=800\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="Etappe 2">
          <FormulaBox latex="v_2=160+32\cdot 5=\boxed{320\;\text{m/s}}" variant="gold" />
          <FormulaBox latex="h_2=h_1+v_1 t+\tfrac12 a_2 t^2=800+160\cdot 5+\tfrac12\cdot 32\cdot 25=800+800+400=\boxed{2000\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Delbevegelser i flere etapper: løs én av gangen, med hver etappes startverdier fra foregående.</p>,
  },

  // ==========================================================================
  // 2.29 — Akselerasjon/retardasjon
  // ==========================================================================
  "2.29": {
    title: "Bilen som innhenter",
    difficulty: "middels",
    pageRef: "s. 61",
    problem: (
      <p>
        En bil står i ro ved et trafikklys. Lyset blir grønt og bilen
        akselererer med 3,50 m/s² mens en lastebil med konstant fart 15,0 m/s
        passerer akkurat idet lyset blir grønt. (a) Hvor langt har bilen kjørt
        når den igjen er ved siden av lastebilen? (b) Hvor rask går bilen da?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Bil: <InlineLatex latex="v_0=0,\;a=3{,}50\;\text{m/s}^2" /></li>
        <li>Lastebil: <InlineLatex latex="v=15{,}0\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>Innhenting-distanse og bilens fart der.</p>,
    strategy: (
      <p>
        Sett <InlineLatex latex="x_\text{bil}(t)=x_\text{lastebil}(t)" />:{" "}
        <InlineLatex latex="\tfrac12 a t^2=vt" />. Løs for t (ikke <InlineLatex latex="t=0" />).
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Forkort t på begge sider: <InlineLatex latex="t=2v/a" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Innhentingstid">
          <FormulaBox latex="t=\frac{2v}{a}=\frac{30{,}0}{3{,}50}=8{,}57\;\text{s}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Distanse">
          <FormulaBox latex="x=vt=15{,}0\cdot 8{,}57=\boxed{129\;\text{m}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Bilens fart">
          <FormulaBox latex="v_\text{bil}=at=3{,}50\cdot 8{,}57=\boxed{30{,}0\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">Akkurat 2× lastebilens fart — rent matematisk resultat for innhenting fra ro med konstant a.</p>
        </Step>
      </div>
    ),
    summary: <p>Innhentingsoppgaver: sett posisjoner like og løs. Bilen har dobbel snittfart av lastebilen ved innhenting.</p>,
  },

  // ==========================================================================
  // 2.37 — Fritt fall 1
  // ==========================================================================
  "2.37": {
    title: "Fallende stein",
    difficulty: "lett",
    pageRef: "s. 62",
    problem: (
      <p>
        En stein slippes fra ro fra toppen av en bygning og treffer bakken 3,00 s
        senere. Se bort fra luftmotstand. (a) Hvor høy er bygningen?
        (b) Sluttfart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=0,\;t=3{,}00\;\text{s},\;a=-g=-9{,}80\;\text{m/s}^2" /> (oppover positiv)</li>
      </ul>
    ),
    unknowns: <p>Høyde og sluttfart.</p>,
    strategy: (
      <TheoryBox title="Fritt fall">
        <p>
          Alle objekter nær jordoverflaten har gravitasjonsakselerasjon{" "}
          <InlineLatex latex="g=9{,}80\;\text{m/s}^2" /> nedover, uavhengig av masse (uten
          luftmotstand). Bruk vanlig kinematikk med <InlineLatex latex="a=-g" /> (positiv y oppover).
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Høyde">
          <FormulaBox latex="\Delta y=v_0 t+\tfrac12 at^2=0-\tfrac12(9{,}80)(9{,}00)=-44{,}1\;\text{m}" variant="blue" />
          <p>Falt 44,1 m → <strong>høyde = 44,1 m</strong>.</p>
        </Step>
        <Step n={2} title="(b) Sluttfart">
          <FormulaBox latex="v=0-9{,}80\cdot 3{,}00=\boxed{-29{,}4\;\text{m/s}}" variant="gold" />
          <p>Altså 29,4 m/s nedover.</p>
        </Step>
      </div>
    ),
    summary: <p>Fritt fall er bare konstant-a-bevegelse med <InlineLatex latex="a=g" /> nedover. Fortegn: velg retning først!</p>,
  },

  // ==========================================================================
  // 2.38 — Hopp oppover
  // ==========================================================================
  "2.38": {
    title: "Tennisball kastet rett opp",
    difficulty: "lett",
    pageRef: "s. 62",
    problem: (
      <p>
        En tennisball kastes rett opp med fart 15,0 m/s. (a) Hvor høyt går den?
        (b) Hvor lang tid tar det til toppen? (c) Sluttfart når den treffer
        utgangshøyden igjen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=15{,}0\;\text{m/s}" /> (opp), <InlineLatex latex="a=-g=-9{,}80" /></li>
      </ul>
    ),
    unknowns: <p>Maks høyde, tid til topp, sluttfart.</p>,
    strategy: <p>Topp: <InlineLatex latex="v=0" />. Bruk <InlineLatex latex="v^2=v_0^2-2g h" /> og <InlineLatex latex="t=v_0/g" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Høyde">
          <FormulaBox latex="h=\frac{v_0^2}{2g}=\frac{225}{19{,}6}=\boxed{11{,}5\;\text{m}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid til topp">
          <FormulaBox latex="t=\frac{v_0}{g}=\frac{15{,}0}{9{,}80}=\boxed{1{,}53\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Sluttfart">
          <p>Ved samme høyde er farten lik, bare motsatt rettet: <InlineLatex latex="\boxed{-15{,}0\;\text{m/s}}" />.</p>
        </Step>
      </div>
    ),
    summary: <p>Fritt fall er symmetrisk: samme fart (motsatt retning) ved samme høyde, og samme tid opp som ned.</p>,
  },

  // ==========================================================================
  // 2.41 — To-etappe fall
  // ==========================================================================
  "2.41": {
    title: "Stein sluppet fra helikopter i fart",
    difficulty: "middels",
    pageRef: "s. 62",
    problem: (
      <p>
        Et helikopter stiger oppover med 5,00 m/s da en stein slippes. Steinen
        bruker 8,00 s på å nå bakken. (a) Hvor høyt var helikopteret?
        (b) Hvor rask gikk steinen ned ved bakken?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=+5{,}00\;\text{m/s}" /> (steinen har fart fra helikopteret)</li>
        <li><InlineLatex latex="a=-9{,}80\;\text{m/s}^2,\;t=8{,}00\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Høyde og fart ved bakken.</p>,
    strategy: (
      <p>
        Viktig: steinen har initial fart oppover (samme som helikopteret i
        slippmomentet). Bruk konstant-a-kinematikk.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Velg opp som positiv; <InlineLatex latex="v_0=+5{,}00" />, og bakken er på negativt y.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Høyde">
          <FormulaBox latex="\Delta y=v_0 t+\tfrac12 at^2=5\cdot 8-\tfrac12\cdot 9{,}80\cdot 64=40-313{,}6=-273{,}6\;\text{m}" variant="blue" />
          <p>Steinen endte 273,6 m under slippunktet → <strong>høyde 274 m</strong>.</p>
        </Step>
        <Step n={2} title="(b) Fart ved bakken">
          <FormulaBox latex="v=v_0+at=5-9{,}80\cdot 8=\boxed{-73{,}4\;\text{m/s}}" variant="gold" />
          <p>Altså 73,4 m/s nedover.</p>
        </Step>
      </div>
    ),
    summary: <p>Når noe slippes fra en <em>fartøy i bevegelse</em>, arver det fartøyets fart som v₀.</p>,
  },

  // ==========================================================================
  // 2.44 — Tospisser oppgave
  // ==========================================================================
  "2.44": {
    title: "Kastet oppover — to like høyder",
    difficulty: "middels",
    pageRef: "s. 63",
    problem: (
      <p>
        En mursten kastes rett oppover fra bakken med 24,5 m/s. Ved hvilke to
        tidspunkter passerer den 16,0 m over bakken?
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=24{,}5\;\text{m/s},\;a=-g,\;\Delta y=16{,}0\;\text{m}" />.</p>,
    unknowns: <p>To tidspunkter.</p>,
    strategy: (
      <p>
        Sett opp <InlineLatex latex="\Delta y=v_0 t-\tfrac12 g t^2" /> og løs
        andregradsligningen.
      </p>
    ),
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Andregradsligning">
          <FormulaBox latex="4{,}90 t^2-24{,}5 t+16{,}0=0" variant="blue" />
        </Step>
        <Step n={2} title="Løsning">
          <FormulaBox latex="t=\frac{24{,}5\pm\sqrt{600{,}25-313{,}6}}{9{,}80}=\frac{24{,}5\pm\sqrt{286{,}65}}{9{,}80}=\frac{24{,}5\pm 16{,}93}{9{,}80}" variant="blue" />
          <FormulaBox latex="t_1=\boxed{0{,}773\;\text{s}}\;\text{(opp)},\quad t_2=\boxed{4{,}23\;\text{s}}\;\text{(ned)}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Andregradsligninger i kinematikk har ofte to fysisk gyldige løsninger — på vei opp og på vei ned.</p>,
  },

  // ==========================================================================
  // 2.46 — Stein mot ball
  // ==========================================================================
  "2.46": {
    title: "Stein som treffer ball i luften",
    difficulty: "vanskelig",
    pageRef: "s. 63",
    problem: (
      <p>
        En ball slippes fra 40,0 m høyde i samme øyeblikk som en stein kastes
        oppover fra bakken med 20,0 m/s. (a) Hvor møtes de? (b) Ved hvilken tid?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Ball: <InlineLatex latex="y_1(0)=40\;\text{m},\;v_{01}=0" /></li>
        <li>Stein: <InlineLatex latex="y_2(0)=0,\;v_{02}=20\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>Tid og høyde for møtet.</p>,
    strategy: (
      <p>
        Begge har <InlineLatex latex="a=-g" />. Sett{" "}
        <InlineLatex latex="y_1(t)=y_2(t)" /> og løs for t.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Tyngdekraften kansellerer seg ut i ligningen for møtepunktet.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Ligninger">
          <FormulaBox latex="y_1=40-\tfrac12 g t^2,\quad y_2=20 t-\tfrac12 g t^2" variant="blue" />
        </Step>
        <Step n={2} title="Sett like">
          <p>Gravitasjonsleddene kansellerer:</p>
          <FormulaBox latex="40=20 t\;\Rightarrow\;t=\boxed{2{,}00\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="Høyde">
          <FormulaBox latex="y=20\cdot 2-\tfrac12\cdot 9{,}80\cdot 4=40-19{,}6=\boxed{20{,}4\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>To objekter som begge er i fritt fall har relativ konstant bevegelse — tyngdekraften faller ut.</p>,
  },

  // ==========================================================================
  // 2.49 — v fra a(t)
  // ==========================================================================
  "2.49": {
    title: "Fart fra gitt akselerasjonsfunksjon",
    difficulty: "middels",
    pageRef: "s. 63",
    problem: (
      <p>
        En gjenstand har akselerasjon <InlineLatex latex="a(t)=2{,}00\;\text{m/s}^2+(3{,}00\;\text{m/s}^3)t" />.
        Ved <InlineLatex latex="t=0" /> er hastigheten 2,00 m/s. Hva er hastigheten ved
        <InlineLatex latex="t=5{,}00\;\text{s}" />?
      </p>
    ),
    knowns: <p><InlineLatex latex="a(t)=2+3t,\;v(0)=2" />.</p>,
    unknowns: <p><InlineLatex latex="v(5)" /></p>,
    strategy: (
      <TheoryBox title="Integrasjon for å finne v fra a">
        <FormulaBox latex="v(t)=v_0+\int_0^t a(t')\,dt'" variant="gold" />
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Integralet av <InlineLatex latex="2+3t" />: <InlineLatex latex="2t+1{,}5t^2" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Integrer">
          <FormulaBox latex="v(t)=2{,}00+\int_0^t(2{,}00+3{,}00t')\,dt'=2{,}00+2{,}00t+1{,}50t^2" variant="blue" />
        </Step>
        <Step n={2} title="Ved t=5 s">
          <FormulaBox latex="v(5)=2+10+37{,}5=\boxed{49{,}5\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Integrasjon er "omvendt derivasjon". Husk integrasjonskonstanten = startverdi <InlineLatex latex="v_0" />.</p>,
  },

  // ==========================================================================
  // 2.51 — x fra v(t)
  // ==========================================================================
  "2.51": {
    title: "Posisjon fra hastighetsfunksjon",
    difficulty: "middels",
    pageRef: "s. 63",
    problem: (
      <p>
        En partikkel har <InlineLatex latex="v(t)=0{,}860\;\text{m/s}+(2{,}10\;\text{m/s}^3)t^2" />.
        Startposisjon <InlineLatex latex="x(0)=5{,}00\;\text{m}" />. Hva er
        posisjonen ved <InlineLatex latex="t=3{,}00\;\text{s}" />?
      </p>
    ),
    knowns: <p><InlineLatex latex="v(t)=0{,}860+2{,}10t^2,\;x(0)=5{,}00\;\text{m}" />.</p>,
    unknowns: <p><InlineLatex latex="x(3)" /></p>,
    strategy: <p><InlineLatex latex="x(t)=x_0+\int_0^t v\,dt'" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Integrer">
          <FormulaBox latex="x(t)=5{,}00+0{,}860t+\tfrac{2{,}10}{3}t^3=5{,}00+0{,}860t+0{,}700t^3" variant="blue" />
        </Step>
        <Step n={2} title="Ved t=3 s">
          <FormulaBox latex="x(3)=5{,}00+2{,}58+18{,}9=\boxed{26{,}5\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Tenk på rekkefølgen: a → v → x via integrasjon; x → v → a via derivasjon.</p>,
  },

  // ==========================================================================
  // 2.52 — Helikopter
  // ==========================================================================
  "2.52": {
    title: "Helikopter med variabel fart",
    difficulty: "vanskelig",
    pageRef: "s. 63",
    problem: (
      <p>
        Et helikopter stiger oppover med{" "}
        <InlineLatex latex="a(t)=(3{,}50)t\;\text{m/s}^2" />. Ved <InlineLatex latex="t=0" />{" "}
        er farten 0 og posisjonen 0. (a) Hva er farten ved{" "}
        <InlineLatex latex="t=5{,}00\;\text{s}" />? (b) Hva er høyden?
      </p>
    ),
    knowns: <p><InlineLatex latex="a(t)=3{,}50 t,\;v_0=0,\;y_0=0" />.</p>,
    unknowns: <p>Fart og høyde ved 5 s.</p>,
    strategy: <p>To integrasjoner etter hverandre.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Hastighet">
          <FormulaBox latex="v(t)=\int_0^t 3{,}50t'\,dt'=1{,}75t^2" variant="blue" />
          <FormulaBox latex="v(5)=1{,}75\cdot 25=\boxed{43{,}75\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={2} title="Høyde">
          <FormulaBox latex="y(t)=\int_0^t 1{,}75 t'^2\,dt'=\frac{1{,}75}{3}t^3\approx 0{,}583t^3" variant="blue" />
          <FormulaBox latex="y(5)=0{,}583\cdot 125=\boxed{72{,}9\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Dobbelintegrasjon: a(t) → v(t) → y(t). Ved variabel a er de konstante kinematiske formlene <em>ikke</em> gyldige.</p>,
  },

  // ==========================================================================
  // 2.54 — Problems: to biler krasjer
  // ==========================================================================
  "2.54": {
    title: "To biler på kollisjonskurs",
    difficulty: "middels",
    pageRef: "s. 66",
    problem: (
      <p>
        To biler A og B er 200 m fra hverandre og nærmer seg. Bil A kjører 25 m/s
        konstant; bil B starter i ro og akselererer med 2,00 m/s² mot A.
        Hvor og når møtes de?
      </p>
    ),
    knowns: <p>A: 25 m/s, konstant. B: 0 start, 2 m/s² mot A. Avstand 200 m.</p>,
    unknowns: <p>Tid og sted.</p>,
    strategy: (
      <p>
        Velg origo ved A's start, +x mot B. A: <InlineLatex latex="x_A=25t" />.
        B starter ved 200 m og beveger seg mot origo:{" "}
        <InlineLatex latex="x_B=200-\tfrac12\cdot 2\cdot t^2=200-t^2" />.
      </p>
    ),
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Sett like">
          <FormulaBox latex="25t=200-t^2\;\Rightarrow\; t^2+25t-200=0" variant="blue" />
        </Step>
        <Step n={2} title="Løs">
          <FormulaBox latex="t=\frac{-25+\sqrt{625+800}}{2}=\frac{-25+37{,}75}{2}=\boxed{6{,}38\;\text{s}}" variant="gold" />
          <FormulaBox latex="x=25\cdot 6{,}38=\boxed{159{,}4\;\text{m}}\;\text{fra A's start}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Sett opp posisjonsfunksjoner i samme koordinatsystem, sett like, løs. Plasseringen avhenger av origo-valg.</p>,
  },

  // ==========================================================================
  // 2.60
  // ==========================================================================
  "2.60": {
    title: "Gjennomsnittsfart for to like strekninger",
    difficulty: "middels",
    pageRef: "s. 66",
    problem: (
      <p>
        En bil kjører strekning d med fart 20 m/s den første halvdelen og 30 m/s
        den andre. Hva er gjennomsnittsfarten?
      </p>
    ),
    knowns: <p>To like distanser d/2 med forskjellige farter.</p>,
    unknowns: <p>Snittfart.</p>,
    strategy: <p>Harmonisk snitt (ikke aritmetisk) når <em>distansene</em> er like!</p>,
    hints: [
      { label: "Hint", content: <p>Beregn <em>total tid</em> for distansen d. Snittet = d / total tid.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Tid per halvdel">
          <FormulaBox latex="t_1=\frac{d/2}{20},\;t_2=\frac{d/2}{30}" variant="blue" />
        </Step>
        <Step n={2} title="Snitt">
          <FormulaBox latex="\bar v=\frac{d}{t_1+t_2}=\frac{d}{d/2(1/20+1/30)}=\frac{2}{1/20+1/30}=\frac{2\cdot 600}{30+20}=\boxed{24\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Når distansene er like: snitt = 2v₁v₂/(v₁+v₂) (harmonisk snitt), ikke (v₁+v₂)/2.</p>,
  },

  // ==========================================================================
  // 2.62
  // ==========================================================================
  "2.62": {
    title: "Akselerasjon for kolliderende biler",
    difficulty: "middels",
    pageRef: "s. 66",
    problem: (
      <p>
        En bil bremser fra 80 km/t til ro på 3,5 s. Akselerasjonen? Hvor langt
        beveger bilen seg?
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=22{,}22\;\text{m/s},\;v=0,\;t=3{,}5\;\text{s}" />.</p>,
    unknowns: <p>a og s.</p>,
    strategy: <p><InlineLatex latex="a=(v-v_0)/t" /> og <InlineLatex latex="s=\tfrac12(v_0+v)t" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\frac{0-22{,}22}{3{,}5}=\boxed{-6{,}35\;\text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={2} title="Distanse">
          <FormulaBox latex="s=\tfrac12(22{,}22+0)(3{,}5)=\boxed{38{,}9\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Konvertér enheter tidlig (km/t → m/s). Snitt-hastighet × tid er enkleste formel for distanse.</p>,
  },

  // ==========================================================================
  // 2.68
  // ==========================================================================
  "2.68": {
    title: "Motorsykkel innhenter bil",
    difficulty: "middels",
    pageRef: "s. 67",
    problem: (
      <p>
        En bil kjører konstant 20,0 m/s. En motorsykkel står i ro 50,0 m bak
        og akselererer med 3,00 m/s² samtidig som bilen passerer. (a) Når når
        motorsykkelen bilen? (b) Hvor rask går den da?
      </p>
    ),
    knowns: <p>Bil: 20 m/s. MC: start 50 m bak, 3 m/s² fra ro.</p>,
    unknowns: <p>Innhenting-tid og MC-fart.</p>,
    strategy: <p>Sett posisjoner like: MC er bak, men utfører <InlineLatex latex="1/2 a t^2" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Posisjonsligninger">
          <p>La MC starte i origo: <InlineLatex latex="x_{MC}=\tfrac12\cdot 3 t^2=1{,}5t^2" />.</p>
          <p>Bil starter 50 m foran: <InlineLatex latex="x_B=50+20t" />.</p>
        </Step>
        <Step n={2} title="Innhenting">
          <FormulaBox latex="1{,}5 t^2=50+20 t\;\Rightarrow\;1{,}5 t^2-20 t-50=0" variant="blue" />
          <FormulaBox latex="t=\frac{20+\sqrt{400+300}}{3}=\frac{20+26{,}46}{3}=\boxed{15{,}5\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="MC-fart">
          <FormulaBox latex="v=at=3\cdot 15{,}5=\boxed{46{,}4\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Innhenting med fraværet å lukke: sett posisjoner like (eller bruk relativ bevegelse).</p>,
  },

  // ==========================================================================
  // 2.70 — Reaksjonstid
  // ==========================================================================
  "2.70": {
    title: "Bremselengde med reaksjonstid",
    difficulty: "middels",
    pageRef: "s. 67",
    problem: (
      <p>
        En bilfører ser et hinder, har reaksjonstid 0,75 s (konstant fart), og
        deretter bremser med 7,0 m/s². Starter fra 25 m/s. Total stoppelengde?
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=25,\;t_r=0{,}75\;\text{s},\;a=-7{,}0" />.</p>,
    unknowns: <p>Total stoppelengde.</p>,
    strategy: <p>Sum: reaksjonsdistanse (konstant fart) + bremselengde.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Reaksjonsfasen">
          <FormulaBox latex="s_1=25\cdot 0{,}75=18{,}75\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="Bremsefasen">
          <FormulaBox latex="s_2=\frac{v_0^2}{2a}=\frac{625}{14}=44{,}64\;\text{m}" variant="blue" />
        </Step>
        <Step n={3} title="Total">
          <FormulaBox latex="s=18{,}75+44{,}64=\boxed{63{,}4\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Reaksjonstid gir en lineær bidrag til stoppelengden — viktig i trafikksikkerhet.</p>,
  },

  // ==========================================================================
  // 2.71
  // ==========================================================================
  "2.71": {
    title: "Politibil innhenter fartsbølle",
    difficulty: "middels",
    pageRef: "s. 67",
    problem: (
      <p>
        En fartsbølle kjører 40 m/s, forbi en politibil i ro. Etter 3,00 s
        starter politiet og akselererer med 4,00 m/s². Når og hvor innhenter
        politiet fartsbøllen?
      </p>
    ),
    knowns: <p>Fartsbølle: 40 m/s fra t=0. Politi: starter ved t=3, a=4 m/s².</p>,
    unknowns: <p>Innhentingssted og tid.</p>,
    strategy: <p>Bruk t målt fra t=0. Politi har posisjon 0 fra t=3, og akselererer.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Posisjoner (t fra t=0)">
          <FormulaBox latex="x_F=40t,\quad x_P=\tfrac12\cdot 4\cdot (t-3)^2=2(t-3)^2" variant="blue" />
        </Step>
        <Step n={2} title="Sett like">
          <FormulaBox latex="40t=2(t-3)^2\;\Rightarrow\;20t=(t-3)^2" variant="blue" />
          <FormulaBox latex="t^2-26t+9=0\;\Rightarrow\;t=\frac{26+\sqrt{676-36}}{2}=\frac{26+25{,}3}{2}=\boxed{25{,}6\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="Sted">
          <FormulaBox latex="x=40\cdot 25{,}6=\boxed{1024\;\text{m}\approx 1{,}02\;\text{km}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Innhenting med forsinkelse: juster for starttiden i posisjonsligningen (<InlineLatex latex="t-t_\text{start}" />).</p>,
  },

  // ==========================================================================
  // 2.81
  // ==========================================================================
  "2.81": {
    title: "Ballongmann slipper sandsekk",
    difficulty: "vanskelig",
    pageRef: "s. 68",
    problem: (
      <p>
        En ballong stiger oppover med konstant 5,00 m/s. 40,0 m over bakken
        slippes en sandsekk fra ballongen. (a) Tid til bakken? (b) Treffart?
      </p>
    ),
    knowns: <p>Sekk: <InlineLatex latex="v_0=+5,\;y_0=40,\;a=-g" />.</p>,
    unknowns: <p>Tid og treffart.</p>,
    strategy: <p>Sekken har initial oppadrettet fart (fra ballongen) ved slipping.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Tid til bakken">
          <FormulaBox latex="-40=5t-4{,}90 t^2\;\Rightarrow\;4{,}90 t^2-5t-40=0" variant="blue" />
          <FormulaBox latex="t=\frac{5+\sqrt{25+784}}{9{,}80}=\frac{5+28{,}44}{9{,}80}=\boxed{3{,}41\;\text{s}}" variant="gold" />
        </Step>
        <Step n={2} title="Fart ved bakken">
          <FormulaBox latex="v=5-9{,}80\cdot 3{,}41=\boxed{-28{,}4\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Objekter arver fartøyets fart ved slipping. Andregradsligningen gir riktig tid (ta den positive roten).</p>,
  },

  // ==========================================================================
  // 2.83
  // ==========================================================================
  "2.83": {
    title: "Ball sluppet fra balkong",
    difficulty: "middels",
    pageRef: "s. 68",
    problem: (
      <p>
        Fra en balkong 15,0 m over bakken kaster du en ball oppover med 8,00 m/s.
        (a) Hvor høyt over balkongen kommer den? (b) Hvor lang tid tar det før
        den treffer bakken? (c) Fart ved bakken?
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=+8,\;y_0=15,\;a=-g" />.</p>,
    unknowns: <p>Maks høyde over balkong, tid til bakken, sluttfart.</p>,
    strategy: <p>Del i faser eller bruk hele banen direkte med <InlineLatex latex="\Delta y=-15" /> fra start.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Maks høyde over balkong">
          <FormulaBox latex="h=v_0^2/(2g)=64/19{,}6=\boxed{3{,}27\;\text{m}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid til bakken">
          <FormulaBox latex="-15=8t-4{,}90 t^2\;\Rightarrow\;4{,}90 t^2-8t-15=0" variant="blue" />
          <FormulaBox latex="t=\frac{8+\sqrt{64+294}}{9{,}80}=\frac{8+18{,}92}{9{,}80}=\boxed{2{,}75\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Treffart">
          <FormulaBox latex="v=8-9{,}80\cdot 2{,}75=\boxed{-18{,}9\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Kinematikk fra bordet/balkongen funker like godt enten du deler i opp/ned eller kjører én lang fase.</p>,
  },

  // ==========================================================================
  // 2.88 — Challenge
  // ==========================================================================
  "2.88": {
    title: "To steiner fra forskjellig tid",
    difficulty: "vanskelig",
    pageRef: "s. 69",
    problem: (
      <p>
        Fra toppen av en 100 m høy klippe slippes en stein. 1,00 s senere kastes
        en annen stein nedover med 20,0 m/s. Hvor og når møtes de?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Stein 1: slippes fra topp ved <InlineLatex latex="t=0" /></li>
        <li>Stein 2: kastes nedover med 20 m/s ved <InlineLatex latex="t=1\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Møtetid og sted.</p>,
    strategy: <p>La y måles nedover positivt fra toppen (enklere her). Sett <InlineLatex latex="y_1(t)=y_2(t)" />.</p>,
    hints: [
      { label: "Hint", content: <p>Stein 2's tidsvariabel er <InlineLatex latex="t-1" /> for kinematikken.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Ligninger (y nedover)">
          <FormulaBox latex="y_1=\tfrac12 g t^2=4{,}90 t^2" variant="blue" />
          <FormulaBox latex="y_2=20(t-1)+\tfrac12 g(t-1)^2" variant="blue" />
        </Step>
        <Step n={2} title="Sett like">
          <FormulaBox latex="4{,}90 t^2=20(t-1)+4{,}90(t-1)^2" variant="blue" />
          <FormulaBox latex="4{,}90 t^2-4{,}90(t-1)^2=20(t-1)" variant="blue" />
          <FormulaBox latex="4{,}90(2t-1)=20(t-1)\;\Rightarrow\;9{,}80 t-4{,}90=20 t-20" variant="blue" />
          <FormulaBox latex="10{,}20 t=15{,}10\;\Rightarrow\;t=\boxed{1{,}48\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="Sted">
          <FormulaBox latex="y=4{,}90\cdot (1{,}48)^2=\boxed{10{,}7\;\text{m}\;\text{under topp}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Når to objekter slippes på ulike tidspunkter, bytt ut t med (t − t_start) i kinematikken.</p>,
  },
};
