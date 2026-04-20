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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Gjennomsnittshastighet er definert som total forskyvning delt på total tid —
          ikke som gjennomsnittet av fartene. Det er bare når de to etappene tar like lang tid at et enkelt snitt
          av hastighetene gir riktig svar. Her tar etappene ulik tid, så vi må gjøre dette skikkelig.
          Originaldefinisjonen fra boken er:
        </p>
        <FormulaBox latex="v_\text{gj}=\dfrac{\Delta x_\text{tot}}{\Delta t_\text{tot}}" variant="blue" />
        <p>
          For hver etappe med konstant fart gir definisjonen av fart direkte forskyvningen:
          <InlineLatex latex="\Delta x_i = v_i \, t_i" />. Siden begge etappene er i samme retning,
          kan vi bare summere dem.
        </p>
        <Step n={1} title="Forskyvning per etappe">
          <p>Bruk <InlineLatex latex="\Delta x_i = v_i t_i" /> på hver etappe:</p>
          <FormulaBox latex="\Delta x_1=(80)(2{,}5)=200\;\text{km},\quad \Delta x_2=(40)(1{,}5)=60\;\text{km}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Total forskyvning">
          <p>Summér forskyvningene (samme retning, ingen fortegnsbytte):</p>
          <FormulaBox latex="\Delta x=200+60=\boxed{260\;\text{km}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Gjennomsnittshastighet">
          <p>Total tid er <InlineLatex latex="\Delta t = 2{,}5 + 1{,}5 = 4{,}0\;\text{t}" />. Sett inn i definisjonen:</p>
          <FormulaBox latex="v_\text{gj}=\frac{260}{2{,}5+1{,}5}=\frac{260}{4{,}0}=\boxed{65\;\text{km/t}}" variant="gold" />
          <p className="italic text-xs">Merk: <InlineLatex latex="(80+40)/2=60" /> ≠ 65. Vekt av tid gjør at etappen med 80 km/t bidrar mer.</p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Bilen tilbringer mer tid på 80 km/t enn på 40 km/t,
          så snittet havner nærmere 80 enn 40. Det er et <em>vektet</em> snitt der tidene fungerer som vekter.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Gjennomsnittshastighet er en <em>vektorstørrelse</em> og avhenger kun
          av endepunktene, ikke av hvilken rute havsulen tok. Dette skiller den fra gjennomsnittsfart,
          som bruker total tilbakelagt avstand. Originaldefinisjonen er:
        </p>
        <FormulaBox latex="v_\text{gj}=\dfrac{\Delta x}{\Delta t}=\dfrac{x_f-x_i}{t_f-t_i}" variant="blue" />
        <p>
          Siden origo ligger ved redet og +x peker mot slippstedet, har slippstedet posisjon
          <InlineLatex latex="+5150\;\text{km}" /> og redet har posisjon <InlineLatex latex="0" />.
        </p>
        <Step n={1} title="(a) Returen (slipp → rede)">
          <p>
            Her starter havsulen ved <InlineLatex latex="x_i=+5150\;\text{km}" /> og ender ved
            <InlineLatex latex="x_f=0" />. Forskyvningen er:
          </p>
          <FormulaBox latex="\Delta x = 0 - 5150 = -5150\;\text{km}" variant="blue" />
          <p>Tid: 13,5 dager. Sett inn:</p>
          <FormulaBox latex="v_\text{gj}=\frac{-5150}{13{,}5}=\boxed{-381\;\text{km/dag}}" variant="gold" />
          <p className="italic text-xs">Negativt fortegn viser at havsulen netto beveger seg mot −x, altså mot origo (redet).</p>
        </Step>
        <Step n={2} title="(b) Hele episoden (rede → slipp → rede)">
          <p>Nå er start- og sluttpunktet samme sted (redet), så forskyvningen er null:</p>
          <FormulaBox latex="\Delta x = 0 - 0 = 0" variant="blue" />
          <FormulaBox latex="v_\text{gj}=\frac{0}{\Delta t}=\boxed{0\;\text{km/dag}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Selv om havsulen har fløyet flere tusen kilometer,
          er gjennomsnittshastigheten null for hele episoden fordi den endte der den startet.
          Gjennomsnittsfarten (skalar) ville derimot være stor og positiv — et viktig skille.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når farten er konstant, er sammenhengen mellom avstand, fart og tid
          enkel og lineær. Den grunnleggende formelen er:
        </p>
        <FormulaBox latex="d = v \cdot t" variant="blue" />
        <p>
          Avstanden mellom byene er den samme begge dager, så vi kan først regne ut avstanden fra
          normalturen, og deretter finne hvor lang tid kø-turen tar. Omformet for tiden blir formelen:
        </p>
        <FormulaBox latex="t = \dfrac{d}{v}" variant="blue" />
        <Step n={1} title="Avstanden">
          <p>
            Omgjør 2 t 20 min til <InlineLatex latex="2 + 20/60 = 2{,}333\;\text{t}" />, og bruk
            <InlineLatex latex="d=v_1 t_1" />:
          </p>
          <FormulaBox latex="d=(105)(2{,}333)=245\;\text{km}" variant="blue" />
        </Step>
        <Step n={2} title="Ny reisetid">
          <p>Samme avstand, men lavere fart. Bruk <InlineLatex latex="t_2 = d/v_2" />:</p>
          <FormulaBox latex="t_2=\frac{245}{70}=3{,}50\;\text{t}=3\;\text{t}\,30\;\text{min}" variant="blue" />
        </Step>
        <Step n={3} title="Differanse">
          <FormulaBox latex="\Delta t=3{,}50-2{,}333=\boxed{1{,}17\;\text{t}\approx 70\;\text{min}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Tid og fart er omvendt proporsjonale ved konstant distanse.
          Forholdet <InlineLatex latex="t_2/t_1 = v_1/v_2 = 105/70 = 1{,}5" /> forteller at kø-turen
          tar 50 % lengre tid — det stemmer: 3,50 t er 50 % mer enn 2,333 t.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Fart og hastighet er ulike begreper — fart er en skalar (alltid positiv)
          og baserer seg på total tilbakelagt avstand, mens hastighet er en vektor og bruker forskyvning
          (endringen i posisjon). Originaldefinisjonene er:
        </p>
        <FormulaBox latex="\text{snittfart}=\dfrac{\text{total avstand}}{\Delta t},\qquad v_\text{gj}=\dfrac{\Delta x}{\Delta t}" variant="blue" />
        <p>
          For hver etappe finner vi tiden fra <InlineLatex latex="t = \text{avstand}/\text{fart}" />
          (siden farten er konstant innenfor hver etappe).
        </p>
        <Step n={1} title="Tid for hver etappe og totalt">
          <p>
            Etappe 1 (øst): <InlineLatex latex="t_1 = 200/5{,}0 = 40\;\text{s}" />.
            Etappe 2 (vest): <InlineLatex latex="t_2 = 280/4{,}0 = 70\;\text{s}" />.
          </p>
          <FormulaBox latex="t_1=40\;\text{s},\;t_2=70\;\text{s},\;t_\text{tot}=110\;\text{s}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Gjennomsnittsfart">
          <p>
            Total tilbakelagt avstand er <InlineLatex latex="200+280=480\;\text{m}" /> (uansett retning):
          </p>
          <FormulaBox latex="\text{fart}=\frac{200+280}{110}=\frac{480}{110}=\boxed{4{,}36\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Gjennomsnittshastighet">
          <p>
            Forskyvningen er <em>endepunkt minus startpunkt</em>. Du flyttet deg 200 m øst (+x) og
            280 m vest (−x), så netto:
          </p>
          <FormulaBox latex="\Delta x = 200 - 280 = -80\;\text{m}" variant="blue" />
          <FormulaBox latex="v_\text{gj}=\frac{-80}{110}=\boxed{-0{,}727\;\text{m/s}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Samme tur, men to vidt forskjellige tall — fordi retningen
          betyr noe for hastigheten. Det negative fortegnet viser at du netto endte vest for startpunktet.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når posisjonen er gitt som en funksjon av tid,
          er gjennomsnittshastighet over et intervall definert som forskyvningen delt på tidsintervallet.
          Grafisk er dette stigningstallet til sekantlinjen mellom de to punktene på x-t-grafen.
          Originaldefinisjonen er:
        </p>
        <FormulaBox latex="v_\text{gj}=\dfrac{x(t_2)-x(t_1)}{t_2-t_1}" variant="blue" />
        <p>
          Strategien er å evaluere posisjonen <InlineLatex latex="x(t)=\alpha t^2-\beta t^3" />
          ved de oppgitte tidspunktene og sette inn.
        </p>
        <Step n={1} title="Posisjoner">
          <p>
            Med <InlineLatex latex="\alpha = 1{,}50" /> og <InlineLatex latex="\beta = 0{,}0500" />:
          </p>
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
        <p>
          <strong>Fysisk tolkning:</strong> Gjennomsnittshastigheten øker fra 2,80 til 7,60 m/s gjennom
          intervallene — bilen akselererer. Merk at snittet 0–4 s (5,20 m/s) ligger mellom snittet
          0–2 s og 2–4 s, siden det er en vektet kombinasjon av dem.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Gjennomsnittshastigheten fra forrige oppgave tar grensen
          <InlineLatex latex="\Delta t \to 0" /> og blir til <em>momentanhastigheten</em>, som er
          den deriverte av posisjonen. Grafisk er dette tangentens stigningstall på x-t-grafen.
          Originaldefinisjonen er:
        </p>
        <FormulaBox latex="v(t)=\dfrac{dx}{dt}=\lim_{\Delta t\to 0}\dfrac{\Delta x}{\Delta t}" variant="blue" />
        <p>
          For polynomer bruker vi derivasjonsregelen <InlineLatex latex="\frac{d}{dt}(t^n)=n t^{n-1}" />.
          Dette gir en generell formel vi kan evaluere ved hvilken som helst t.
        </p>
        <Step n={1} title="Derivert">
          <p>
            Deriver <InlineLatex latex="x(t)=\alpha t^2-\beta t^3" /> ledd for ledd:
          </p>
          <FormulaBox latex="v(t)=2\alpha t-3\beta t^2=3{,}00t-0{,}150t^2\;\text{m/s}" variant="blue" />
        </Step>
        <Step n={2} title="(a), (b), (c) Evaluér ved gitte tider">
          <ul className="list-disc pl-5">
            <li><InlineLatex latex="v(0)=\boxed{0}" /> — bilen starter i ro.</li>
            <li><InlineLatex latex="v(5)=15{,}00-3{,}75=\boxed{11{,}25\;\text{m/s}}" /></li>
            <li><InlineLatex latex="v(10)=30{,}0-15{,}0=\boxed{15{,}0\;\text{m/s}}" /></li>
          </ul>
        </Step>
        <Step n={3} title="(d) Tid igjen i ro">
          <p>
            Bilen er i ro når <InlineLatex latex="v(t)=0" />. Det er et faktoriseringsproblem:
          </p>
          <FormulaBox latex="3{,}00t-0{,}150t^2=0\;\Rightarrow\; t(3{,}00-0{,}150t)=0\;\Rightarrow\; t=20{,}0\;\text{s}" variant="gold" />
          <p>
            Den ene løsningen <InlineLatex latex="t=0" /> er startpunktet, den andre
            <InlineLatex latex="t=20{,}0\;\text{s}" /> er når den stopper igjen.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Det kubiske leddet (<InlineLatex latex="-\beta t^3" />)
          virker som en "bremsende" kraft som vokser med tiden. Først dominerer det kvadratiske
          leddet (akselererende), men etterhvert overstyres det av det kubiske, og farten går tilbake
          til null ved <InlineLatex latex="t=20\;\text{s}" />.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> To ulike definisjoner av "hastighet" brukes her — gjennomsnittshastighet
          (sekantlinjens stigning) og momentanhastighet (tangentens stigning, dvs. den deriverte).
          De er nesten aldri like, og kan til og med ha ulikt fortegn når bevegelsen bytter retning.
          Originalformlene er:
        </p>
        <FormulaBox latex="v_\text{gj}=\dfrac{x(t_2)-x(t_1)}{t_2-t_1},\qquad v(t)=\dfrac{dx}{dt}" variant="blue" />
        <p>
          For (a) trenger vi bare endepunktene <InlineLatex latex="x(0)" /> og <InlineLatex latex="x(2)" />.
          For (b) deriverer vi <InlineLatex latex="x(t)" /> og evaluerer ved <InlineLatex latex="t=2\;\text{s}" />.
        </p>
        <Step n={1} title="Posisjoner ved endepunktene">
          <FormulaBox latex="x(0)=2{,}17,\;x(2)=2{,}17+9{,}60-8{,}40=3{,}37\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Gjennomsnittshastighet">
          <p>Sett inn i definisjonen:</p>
          <FormulaBox latex="v_\text{gj}=\frac{3{,}37-2{,}17}{2}=\boxed{0{,}60\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Momentanhastighet">
          <p>Deriver <InlineLatex latex="x(t)=2{,}17+4{,}80 t-2{,}10 t^2" />:</p>
          <FormulaBox latex="v(t)=\dfrac{dx}{dt}=4{,}80-4{,}20 t" variant="blue" />
          <p>Sett inn <InlineLatex latex="t=2{,}00\;\text{s}" />:</p>
          <FormulaBox latex="v(2)=4{,}80-4{,}20\cdot 2=\boxed{-3{,}60\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">Trucken har byttet retning innen <InlineLatex latex="t=2\;\text{s}" /> — positiv snitthastighet, men negativ momentan!</p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Trucken startet med fart <InlineLatex latex="v(0)=4{,}80\;\text{m/s}" />,
          bremset opp, snudde ved <InlineLatex latex="t=4{,}80/4{,}20\approx 1{,}14\;\text{s}" />, og kjørte
          baklengs. Netto (gjennomsnitt) endte den likevel 1,20 m til høyre for startposisjonen,
          men ved <InlineLatex latex="t=2\;\text{s}" /> kjører den nå i retur med 3,60 m/s.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er en ren graf-tolkningsoppgave. Nøkkelen er at
          <em> hastighet er den deriverte av posisjon</em>. Grafisk betyr det at
          momentanhastigheten ved et punkt er lik stigningstallet til tangentlinjen i dét punktet.
          Originaldefinisjonen er:
        </p>
        <FormulaBox latex="v(t)=\dfrac{dx}{dt}=\text{stigningstall på } x\text{-}t\text{-graf}" variant="blue" />
        <p>
          Videre forteller krumningen (buekretningen) om akselerasjonen: buen vender oppover når
          <InlineLatex latex="a>0" /> og nedover når <InlineLatex latex="a<0" />. "Størrelsen på v øker"
          betyr at v og a har samme fortegn; "størrelsen på v avtar" betyr motsatte fortegn.
        </p>
        <p>Oversatt til grafiske kjennetegn:</p>
        <ul className="list-disc pl-5">
          <li>
            <strong>(a) Null hastighet:</strong> horisontal tangent (grafen er flat). Typisk ved
            snupunkter eller pauser.
          </li>
          <li>
            <strong>(b) Konstant positiv:</strong> rett linje med positiv stigning — jevn gange mot campus.
          </li>
          <li>
            <strong>(c) Konstant negativ:</strong> rett linje med negativ stigning — jevn gange hjem.
          </li>
          <li>
            <strong>(d) |v| øker:</strong> buen krummer bort fra horisontalen (tangenten blir brattere).
          </li>
          <li>
            <strong>(e) |v| avtar:</strong> buen flater ut mot horisontalen (tangenten blir slakkere).
          </li>
        </ul>
        <p>
          <strong>Fysisk tolkning:</strong> Professoren begynner hjemmefra (<InlineLatex latex="x=0" />)
          og går mot campus (<InlineLatex latex="x" /> øker). Når regnet kommer, stopper hun, snur og
          går hjem — grafen når en topp, blir kanskje flat et lite øyeblikk, og faller så mot origo igjen.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Hastighet og akselerasjon er henholdsvis første- og andrederiverte av
          posisjonsfunksjonen. Originalsammenhengene er:
        </p>
        <FormulaBox latex="v(t)=\dfrac{dx}{dt},\qquad a(t)=\dfrac{dv}{dt}=\dfrac{d^2 x}{dt^2}" variant="blue" />
        <p>
          For å finne posisjon og akselerasjon når <InlineLatex latex="v=0" />, trenger vi tre steg:
          (1) deriver x for å få v, (2) sett v=0 og finn tidspunktene, (3) evaluer x og
          <InlineLatex latex="a=dv/dt" /> på disse tidspunktene.
        </p>
        <Step n={1} title="Nullpunkter av v">
          <p>
            Deriver <InlineLatex latex="x(t)=2{,}17+4{,}80 t^2-0{,}100 t^6" /> ledd for ledd:
          </p>
          <FormulaBox latex="v(t) = \dfrac{dx}{dt} = 9{,}60 t - 0{,}600 t^5" variant="blue" />
          <p>Faktoriser og sett lik null:</p>
          <FormulaBox latex="9{,}60t-0{,}600t^5=0\;\Rightarrow\;t(9{,}60-0{,}600t^4)=0" variant="blue" />
          <p>Dette gir <InlineLatex latex="t=0" /> eller <InlineLatex latex="t^4=16\Rightarrow t=2{,}00\;\text{s}" />.</p>
        </Step>
        <Step n={2} title="Ved t=0">
          <p>Sett inn direkte i <InlineLatex latex="x(t)" /> og i den deriverte av v:</p>
          <FormulaBox latex="x=2{,}17\;\text{m},\quad a(0)=9{,}60\;\text{m/s}^2" variant="blue" />
        </Step>
        <Step n={3} title="Ved t=2,00 s">
          <p>Posisjonen:</p>
          <FormulaBox latex="x=2{,}17+4{,}80\cdot 4-0{,}100\cdot 64=2{,}17+19{,}2-6{,}40=14{,}97\;\text{m}" variant="blue" />
          <p>Deriver v igjen for å få a, og evaluer:</p>
          <FormulaBox latex="a(t)=9{,}60-3{,}00t^4\;\Rightarrow\;a(2)=9{,}60-48{,}0=-38{,}4\;\text{m/s}^2" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Ved <InlineLatex latex="t=0" /> står bilen stille, men har
          akselerasjon <InlineLatex latex="+9{,}60\;\text{m/s}^2" /> — altså er den i ferd med å sette
          fart framover. Ved <InlineLatex latex="t=2\;\text{s}" /> er den igjen momentant i ro, men nå
          med stor <em>negativ</em> akselerasjon. Dette er typisk for et snupunkt: momentan v=0 betyr
          ikke at a=0!
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Ved konstant akselerasjon har vi de fire kinematiske ligningene.
          Her er tid gitt og vi søker sluttfart — formelen som kobler <InlineLatex latex="v,v_0,a,t" />
          uten å involvere posisjon er:
        </p>
        <FormulaBox latex="v = v_0 + a t" variant="blue" />
        <p>
          Dette er selve definisjonen av konstant akselerasjon: hastigheten endrer seg lineært med tiden.
          I (b) skal astronauten bremse tilbake til ro, så vi setter sluttfarten til null og løser for
          tid ved å omforme ligningen.
        </p>
        <Step n={1} title="(a) Sluttfart etter akselerasjonsfasen">
          <p>
            Astronauten starter fra ro (<InlineLatex latex="v_0=0" />). Sett inn direkte:
          </p>
          <FormulaBox latex="v=0+0{,}500\cdot 15{,}0=\boxed{7{,}50\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid til stopp">
          <p>
            Nå er startfarten <InlineLatex latex="v_0 = 7{,}50\;\text{m/s}" />, akselerasjonen er
            negativ (−2,00 m/s²), og vi søker t når <InlineLatex latex="v=0" />. Omform:
          </p>
          <FormulaBox latex="t = \dfrac{v - v_0}{a}" variant="blue" />
          <FormulaBox latex="0=7{,}50+(-2{,}00)t\;\Rightarrow\;t=\boxed{3{,}75\;\text{s}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Astronauten bygger opp fart på 15 sekunder og stopper igjen
          på bare 3,75 sekunder fordi bremsingen er 4 ganger så kraftig som akselerasjonen
          (|−2,00|/0,500 = 4). Tiden skalerer omvendt med akselerasjonen.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Analogt til posisjon og hastighet har vi to ulike definisjoner av
          akselerasjon. Gjennomsnittsakselerasjonen over et intervall er sekantstigningen på v-t-grafen;
          momentanakselerasjonen er tangentstigningen, dvs. den deriverte. Originaldefinisjonene er:
        </p>
        <FormulaBox latex="\bar a = \dfrac{\Delta v}{\Delta t} = \dfrac{v(t_2)-v(t_1)}{t_2-t_1},\qquad a(t)=\dfrac{dv}{dt}" variant="blue" />
        <p>
          For (a) evaluerer vi <InlineLatex latex="v_x(t)" /> i endepunktene. For (b) deriverer vi
          <InlineLatex latex="v_x(t)" />.
        </p>
        <Step n={1} title="(a) Gjennomsnittsakselerasjon">
          <p>Evaluer hastigheten ved endepunktene:</p>
          <FormulaBox latex="v(0)=3{,}00\;\text{m/s},\quad v(5)=3{,}00+0{,}100\cdot 25=5{,}50\;\text{m/s}" variant="blue" />
          <FormulaBox latex="\bar a=\frac{5{,}50-3{,}00}{5}=\boxed{0{,}500\;\text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Momentanakselerasjon">
          <p>Deriver <InlineLatex latex="v_x(t)=\alpha+\beta t^2" /> mhp. t:</p>
          <FormulaBox latex="a(t)=\dfrac{dv}{dt}=2\beta t=0{,}200 t\;\text{m/s}^2" variant="blue" />
          <p>Sett inn <InlineLatex latex="t=5{,}00\;\text{s}" />:</p>
          <FormulaBox latex="a(t)=2\beta t=0{,}200t\;\Rightarrow\; a(5)=\boxed{1{,}00\;\text{m/s}^2}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Snittet (0,500 m/s²) ligger midt mellom <InlineLatex latex="a(0)=0" />
          og <InlineLatex latex="a(5)=1{,}00\;\text{m/s}^2" /> — akkurat som forventet når akselerasjonen
          vokser lineært med tiden (gjennomsnittet av en lineær funksjon er verdien i midtpunktet).
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Akselerasjonen er stigningstallet til v-t-grafen. Når grafen består
          av rette linjesegmenter, er stigningstallet konstant på hvert segment og hopper brått ved
          overgangene. Gjennomsnittsakselerasjonen over et intervall er:
        </p>
        <FormulaBox latex="\bar a = \dfrac{\Delta v}{\Delta t} = \dfrac{v_f - v_0}{t_f - t_0}" variant="blue" />
        <p>
          For hver linje beregner vi stigningen direkte. For hele 30 s trenger vi bare start- og sluttfarten.
        </p>
        <Step n={1} title="(a) Akselerasjonsgraf">
          <p>Beregn stigningstallet for hvert segment:</p>
          <FormulaBox latex="0{-}10\;\text{s}: a=\dfrac{20-0}{10}=+2{,}0\;\text{m/s}^2" variant="blue" />
          <FormulaBox latex="10{-}20\;\text{s}: a=\dfrac{20-20}{10}=0" variant="blue" />
          <FormulaBox latex="20{-}30\;\text{s}: a=\dfrac{0-20}{10}=-2{,}0\;\text{m/s}^2" variant="blue" />
          <p>a-t-grafen består altså av 3 konstante nivåer: +2, 0, −2 m/s².</p>
        </Step>
        <Step n={2} title="(b) Gjennomsnittsakselerasjon over hele 30 s">
          <p>
            Starter ved <InlineLatex latex="v=0" /> og slutter ved <InlineLatex latex="v=0" />:
          </p>
          <FormulaBox latex="\bar a=\frac{0-0}{30}=\boxed{0\;\text{m/s}^2}" variant="gold" />
          <p className="italic text-xs">Starter og slutter i ro. Selv om akselerasjonen varierer mye, er <em>snittet</em> null.</p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Akkurat som gjennomsnittshastighet bare avhenger av endepunktene
          i posisjon, avhenger gjennomsnittsakselerasjon bare av endepunktene i hastighet. Bilen akselererer
          sterkt en tredjedel av tiden, holder konstant fart en tredjedel, og bremser hardt resten —
          men nettoresultatet er null fartendring.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Ved konstant akselerasjon gjelder de fire kinematiske ligningene.
          Strategien er å velge den formelen som kobler akkurat de variablene vi har og den vi søker,
          uten å involvere den vi mangler. Her har vi <InlineLatex latex="v_0, v, x-x_0" /> og
          søker <InlineLatex latex="a" /> — tiden er ikke gitt, så vi velger formelen uten t:
        </p>
        <FormulaBox latex="v^2 = v_0^2 + 2a(x-x_0)" variant="blue" />
        <p>Omform for a:</p>
        <FormulaBox latex="a = \dfrac{v^2 - v_0^2}{2(x-x_0)}" variant="blue" />
        <Step n={1} title="(a) Akselerasjon">
          <p>
            Med <InlineLatex latex="v_0=0" />, <InlineLatex latex="v=30{,}0\;\text{m/s}" />,
            <InlineLatex latex="x-x_0=350\;\text{m}" />:
          </p>
          <FormulaBox latex="a=\frac{v^2-v_0^2}{2s}=\frac{30{,}0^2}{2\cdot 350}=\boxed{1{,}29\;\text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid">
          <p>Nå kjenner vi a og kan bruke den enkleste formelen:</p>
          <FormulaBox latex="v = v_0 + a t \;\Rightarrow\; t = \dfrac{v-v_0}{a}" variant="blue" />
          <FormulaBox latex="t=\frac{v-v_0}{a}=\frac{30{,}0}{1{,}29}=\boxed{23{,}3\;\text{s}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> 1,29 m/s² er en moderat akselerasjon (ca. 0,13g),
          typisk for en vanlig bil som starter rolig. Som sjekk: gjennomsnittshastigheten er
          <InlineLatex latex="(0+30)/2 = 15\;\text{m/s}" />, og <InlineLatex latex="350/15 \approx 23{,}3\;\text{s}" /> —
          samme svar.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er et klassisk konstant-akselerasjon-problem, så vi kan bruke
          de fire kinematiske ligningene. Strategien er å identifisere hvilke variabler vi har og hvilke
          vi mangler, og så velge formelen som ikke krever det vi ikke har. For (a) har vi
          <InlineLatex latex="v_0, v, a" /> og søker <InlineLatex latex="t" /> — den enkleste formelen er:
        </p>
        <FormulaBox latex="v = v_0 + a t" variant="blue" />
        <p>
          For (b) har vi <InlineLatex latex="v_0, v, a" /> og søker forskyvning <InlineLatex latex="s=x-x_0" /> —
          formelen uten <InlineLatex latex="t" /> er den beste:
        </p>
        <FormulaBox latex="v^2 = v_0^2 + 2 a (x-x_0)" variant="blue" />
        <p>
          <strong>Fortegnsvalg:</strong> Vi lar +x være flyets bevegelsesretning. Da er <InlineLatex latex="v_0 = +100\;\text{m/s}" />
          og retardasjonen gir <InlineLatex latex="a = -5{,}00\;\text{m/s}^2" /> (negativ fordi den motvirker bevegelsen).
          Sluttfarten er <InlineLatex latex="v=0" /> når flyet stopper.
        </p>
        <Step n={1} title="(a) Tid til stopp">
          <p>Omform <InlineLatex latex="v=v_0+at" /> for t:</p>
          <FormulaBox latex="t=\dfrac{v-v_0}{a}" variant="blue" />
          <FormulaBox latex="t=\frac{0-100}{-5{,}00}=\boxed{20{,}0\;\text{s}}" variant="gold" />
          <p className="italic text-xs">
            Enhetssjekk: (m/s)/(m/s²) = s ✓.
          </p>
        </Step>
        <Step n={2} title="(b) Stoppedistanse">
          <p>
            Tid er ikke nødvendig her — <InlineLatex latex="v^2=v_0^2+2as" /> gir s direkte.
            Omform for s:
          </p>
          <FormulaBox latex="s=\dfrac{v^2-v_0^2}{2a}" variant="blue" />
          <FormulaBox latex="s=\frac{-v_0^2}{2a}=\frac{-10000}{-10{,}00}=1000\;\text{m}=1{,}00\;\text{km}" variant="gold" />
          <p>
            Enhetssjekk: <InlineLatex latex="(\text{m/s})^2/(\text{m/s}^2)=\text{m}" /> ✓.
            <strong>Flyet trenger 1,00 km</strong>, men banen er bare 0,800 km.
            <strong>Flyet klarer ikke å stoppe på banen.</strong>
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Stoppedistansen vokser <em>kvadratisk</em> med farten:
          dobler du landingsfarten, firedobles bremselengden. Derfor er det store forskjeller mellom
          banekrav for småfly og jumbojet. Alternativt kunne vi brukt <InlineLatex latex="s=\tfrac12(v_0+v)t = \tfrac12(100)(20) = 1000\;\text{m}" /> —
          samme svar og rask konsistenssjekk.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Akselerasjonen er konstant <em>innenfor</em> hver etappe, men <em>hopper</em>
          ved overgangen mellom etappe 1 og 2. De kinematiske ligningene gjelder derfor bare innenfor
          hver etappe for seg. Strategien er å behandle hver etappe som et eget delproblem, der
          sluttverdiene fra etappe 1 (fart og høyde) blir startverdiene for etappe 2. Originalligningene er:
        </p>
        <FormulaBox latex="v = v_0 + a t,\qquad y = y_0 + v_0 t + \tfrac12 a t^2" variant="blue" />
        <p>
          <strong>Hvorfor ikke bruke en formel som kobler hele banen?</strong> Fordi a ikke er konstant
          over hele banen; a endrer seg ved t = 10 s. Én enkelt formel vil gi feil svar.
          Vi velger +y oppover, slik at alle størrelsene er positive her (raketten går kun oppover).
        </p>
        <Step n={1} title="Etappe 1 — fra ro, konstant a₁ = 16 m/s²">
          <p>Sluttfart etter 10 s (bruk <InlineLatex latex="v=v_0+at" /> med <InlineLatex latex="v_0=0" />):</p>
          <FormulaBox latex="v_1=16\cdot 10=160\;\text{m/s}" variant="blue" />
          <p>Høyde etter 10 s (bruk <InlineLatex latex="y=y_0+v_0 t+\tfrac12 a t^2" /> med <InlineLatex latex="y_0=0,\;v_0=0" />):</p>
          <FormulaBox latex="h_1=\tfrac12\cdot 16\cdot 10^2=800\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="Etappe 2 — starter med v₁ og h₁, ny a₂ = 32 m/s²">
          <p>
            Nå er det <em>nye</em> startverdier: <InlineLatex latex="v_0=160\;\text{m/s},\;y_0=800\;\text{m}" />.
            Ny akselerasjon virker i 5 s.
          </p>
          <FormulaBox latex="v_2=160+32\cdot 5=\boxed{320\;\text{m/s}}" variant="gold" />
          <FormulaBox latex="h_2=h_1+v_1 t+\tfrac12 a_2 t^2=800+160\cdot 5+\tfrac12\cdot 32\cdot 25=800+800+400=\boxed{2000\;\text{m}}" variant="gold" />
          <p className="italic text-xs">
            Enhetssjekk: m/s² · s = m/s ✓ og m/s² · s² = m ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Raketten dobler nesten farten i etappe 2 (160 → 320) på bare
          5 sekunder fordi a₂ er dobbelt så stor som a₁. Bidragene til høyden i etappe 2 kommer fra to kilder:
          <InlineLatex latex="v_1 t = 800\;\text{m}" /> (bare å fortsette i bevegelse) og
          <InlineLatex latex="\tfrac12 a_2 t^2=400\;\text{m}" /> (ekstra fra akselerasjonen).
          Denne to-etappes-strategien er helt generell for alle problemer der a skifter.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Innhentingsoppgaver løses ved å sette opp posisjonsligninger for begge
          objektene i <em>samme</em> koordinatsystem, og deretter sette dem like. Det er kritisk viktig
          at begge bruker samme origo og samme tidsnull, ellers vil likningen lyve. Originalligningene er:
        </p>
        <FormulaBox latex="x = x_0 + v_0 t + \tfrac12 a t^2" variant="blue" />
        <p>
          <strong>Hvorfor sette posisjoner like?</strong> Fordi "innhenter" betyr at de er på samme sted
          samtidig — to objekter møtes når <InlineLatex latex="x_A(t) = x_B(t)" />. Vi bruker ikke
          <InlineLatex latex="v^2=v_0^2+2as" /> her fordi vi ikke kjenner distansen; vi søker tiden,
          og posisjon-mot-tid-ligningen er det naturlige valget.
        </p>
        <p>
          Velg origo ved trafikklyset, +x i bilens bevegelsesretning, og t = 0 idet lyset blir grønt.
          Begge starter ved x = 0.
        </p>
        <Step n={1} title="Sett opp posisjonsligninger">
          <p>Bil (fra ro, konstant a):</p>
          <FormulaBox latex="x_\text{bil}=\tfrac12 a t^2=\tfrac12\cdot 3{,}50\cdot t^2=1{,}75 t^2" variant="blue" />
          <p>Lastebil (konstant fart, a = 0):</p>
          <FormulaBox latex="x_\text{lastebil}=v t=15{,}0 t" variant="blue" />
        </Step>
        <Step n={2} title="Innhentingstid">
          <p>Sett like og forkort den trivielle løsningen <InlineLatex latex="t=0" /> (de starter like):</p>
          <FormulaBox latex="\tfrac12 a t^2 = v t \;\Rightarrow\; \tfrac12 a t = v \;\Rightarrow\; t=\dfrac{2v}{a}" variant="blue" />
          <FormulaBox latex="t=\frac{2\cdot 15{,}0}{3{,}50}=\frac{30{,}0}{3{,}50}=8{,}57\;\text{s}" variant="blue" />
        </Step>
        <Step n={3} title="(a) Distanse til innhenting">
          <p>
            Bruk <em>lastebilens</em> posisjonsligning (enklere, siden den har konstant fart):
          </p>
          <FormulaBox latex="x=vt=15{,}0\cdot 8{,}57=\boxed{129\;\text{m}}" variant="gold" />
        </Step>
        <Step n={4} title="(b) Bilens fart ved innhenting">
          <p>Bilen har akselerert i 8,57 s fra ro. Bruk <InlineLatex latex="v=v_0+at" />:</p>
          <FormulaBox latex="v_\text{bil}=at=3{,}50\cdot 8{,}57=\boxed{30{,}0\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">
            Akkurat 2× lastebilens fart — rent matematisk resultat for innhenting fra ro med konstant a.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Bilen starter i ro og bygger opp fart. For å ha dratt like
          langt som lastebilen på samme tid, må bilens <em>gjennomsnittsfart</em> være lik lastebilens
          konstante fart. Siden bilen starter fra 0, må dens slutt-fart være dobbelt så stor som snittet —
          derfor 30 m/s = 2 · 15 m/s. Dette er et generelt resultat: ved innhenting fra ro med konstant a
          er den innhentendes fart alltid 2× den jevne farten til den man jaget.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Fritt fall betyr bevegelse der tyngdekraften er den eneste kraften som
          virker — ingen luftmotstand. Alle objekter nær jordoverflaten har da akselerasjon
          <InlineLatex latex="g=9{,}80\;\text{m/s}^2" /> rettet nedover, uavhengig av masse.
          Fritt fall er altså bare et spesialtilfelle av konstant-akselerasjon-kinematikk, så vi kan
          bruke de vanlige fire kinematiske ligningene med <InlineLatex latex="a=\pm g" />.
        </p>
        <FormulaBox latex="y = y_0 + v_0 t + \tfrac12 a t^2,\qquad v = v_0 + a t" variant="blue" />
        <p>
          <strong>Fortegns­konvensjon:</strong> Vi velger +y <em>oppover</em>. Da er tyngdeakselerasjonen
          <InlineLatex latex="a=-g=-9{,}80\;\text{m/s}^2" /> (negativ fordi den peker nedover).
          Steinen slippes "fra ro", så <InlineLatex latex="v_0=0" />.
          Vi lar startposisjonen være <InlineLatex latex="y_0=0" /> (toppen av bygningen).
        </p>
        <p>
          <strong>Hvorfor disse formlene?</strong> For (a) søker vi forflytningen etter gitt tid og kjenner
          <InlineLatex latex="v_0,\;a,\;t" /> — posisjonsformelen er direkte valg. For (b) søker vi farten
          etter gitt tid og kjenner samme variabler — <InlineLatex latex="v=v_0+at" /> er det enkleste.
        </p>
        <Step n={1} title="(a) Høyde på bygningen">
          <p>
            Etter 3,00 s har steinen falt en viss distanse under toppen. Sett
            <InlineLatex latex="v_0=0" /> og <InlineLatex latex="a=-9{,}80\;\text{m/s}^2" />:
          </p>
          <FormulaBox latex="\Delta y=v_0 t+\tfrac12 at^2=0-\tfrac12(9{,}80)(9{,}00)=-44{,}1\;\text{m}" variant="blue" />
          <p>
            Negativt tegn betyr 44,1 m <em>under</em> starten. Siden bygningens topp er der vi startet,
            må bakken være 44,1 m lavere enn toppen → <strong>høyde = 44,1 m</strong>.
            Enhetssjekk: m/s² · s² = m ✓.
          </p>
        </Step>
        <Step n={2} title="(b) Sluttfart">
          <p>Sett inn i <InlineLatex latex="v=v_0+at" />:</p>
          <FormulaBox latex="v=0-9{,}80\cdot 3{,}00=\boxed{-29{,}4\;\text{m/s}}" variant="gold" />
          <p>
            Det negative fortegnet sier at farten er rettet <em>nedover</em> (mot −y). Altså
            29,4 m/s nedover i størrelse.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> 29,4 m/s ≈ 106 km/t — det er mye, men realistisk for et 44 m
          fall (omtrent 15 etasjer). Rask sjekk via en annen formel:
          <InlineLatex latex="v^2=2g|\Delta y|=2(9{,}80)(44{,}1)=864" />, som gir
          <InlineLatex latex="|v|=29{,}4\;\text{m/s}" /> ✓. Legg merke til hvordan fortegnene er koblet
          til valg av positiv retning — hadde vi valgt +y nedover, hadde <InlineLatex latex="a=+g" /> og
          svaret blitt positivt. Alltid <em>velg retning først</em>.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er et kastoppover-problem, som er fritt fall med positiv
          startfart. Så lenge luftmotstand neglisjeres, har ballen hele tiden akselerasjon
          <InlineLatex latex="a=-g" /> — også <em>på vei opp</em>, ikke bare på vei ned.
          Det er en vanlig misforståelse å tro at a = 0 på toppen; det er bare <em>farten</em> som er null der.
          Akselerasjonen er g nedover hele tiden. Originalligningene er:
        </p>
        <FormulaBox latex="v=v_0+at,\qquad v^2=v_0^2+2a(y-y_0)" variant="blue" />
        <p>
          <strong>Fortegn:</strong> +y oppover. Da er <InlineLatex latex="v_0=+15{,}0\;\text{m/s}" /> og
          <InlineLatex latex="a=-g=-9{,}80\;\text{m/s}^2" />.
        </p>
        <p>
          <strong>Hvilken formel?</strong> (a) Ved toppen er <InlineLatex latex="v=0" /> og vi kjenner
          <InlineLatex latex="v_0,a" /> — uten tid er <InlineLatex latex="v^2=v_0^2+2a(y-y_0)" /> det
          direkte valget. (b) For å finne tid til toppen, kjenner vi <InlineLatex latex="v,v_0,a" /> og
          formelen <InlineLatex latex="v=v_0+at" /> gir t direkte. (c) Ved retur til startpunktet er
          forskyvningen null, så <InlineLatex latex="v^2=v_0^2+2a(0)=v_0^2" />.
        </p>
        <Step n={1} title="(a) Maksimal høyde">
          <p>
            Ved toppen er <InlineLatex latex="v=0" />. Omform
            <InlineLatex latex="0=v_0^2-2g h" /> for h:
          </p>
          <FormulaBox latex="h=\dfrac{v_0^2}{2g}" variant="blue" />
          <FormulaBox latex="h=\frac{v_0^2}{2g}=\frac{225}{19{,}6}=\boxed{11{,}5\;\text{m}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tid til toppen">
          <p>Sett <InlineLatex latex="v=0" /> i <InlineLatex latex="v=v_0-gt" /> og omform:</p>
          <FormulaBox latex="0=v_0-gt\;\Rightarrow\;t=\dfrac{v_0}{g}" variant="blue" />
          <FormulaBox latex="t=\frac{v_0}{g}=\frac{15{,}0}{9{,}80}=\boxed{1{,}53\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Fart ved retur til utgangshøyde">
          <p>
            Siden <InlineLatex latex="y-y_0=0" />, gir energisparing (eller
            <InlineLatex latex="v^2=v_0^2+2a(y-y_0)" />) at <InlineLatex latex="v^2=v_0^2" />.
            Tegnet er negativt fordi ballen nå beveger seg nedover:
          </p>
          <FormulaBox latex="v=-\sqrt{v_0^2}=\boxed{-15{,}0\;\text{m/s}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning — symmetri i fritt fall:</strong> Banens oppover-del og nedover-del er
          speilbilder. Tiden opp (1,53 s) er lik tiden ned; farten ved retur er like stor som startfarten,
          bare motsatt rettet. Dette følger av at tyngdekraften er konservativ og virker likt hele veien.
          Praktisk: 11,5 m er omtrent 4 etasjer — en tennisball kastet kraftig oppover kommer høyt.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> En fellen i denne typen oppgave er å tro at "slippes" betyr
          <InlineLatex latex="v_0=0" />. Det gjelder bare når slippunktet er i ro. Siden helikopteret
          stiger oppover med 5,00 m/s, har steinen <em>akkurat den samme farten</em> i slippøyeblikket
          (den "arver" farten fra fartøyet — Newtons første lov: bevegelse fortsetter i fravær av kraft).
          Fra da av er eneste kraft tyngdekraften, og steinen er i fritt fall med
          <InlineLatex latex="a=-g" />. De kinematiske ligningene er:
        </p>
        <FormulaBox latex="y = y_0 + v_0 t + \tfrac12 a t^2,\qquad v = v_0 + a t" variant="blue" />
        <p>
          <strong>Fortegn:</strong> +y oppover. Steinens initialfart er <InlineLatex latex="v_0=+5{,}00\;\text{m/s}" />
          (oppover), <InlineLatex latex="a=-9{,}80\;\text{m/s}^2" />. Sett <InlineLatex latex="y_0=0" /> der steinen slippes.
        </p>
        <p>
          <strong>Hvilken formel?</strong> For (a) kjenner vi <InlineLatex latex="v_0,a,t" /> og søker
          forskyvningen, så posisjonsformelen er direkte valg. For (b) kjenner vi samme +
          søker sluttfarten, så <InlineLatex latex="v=v_0+at" /> er det enkleste.
        </p>
        <Step n={1} title="(a) Høyde over bakken">
          <p>Sett inn:</p>
          <FormulaBox latex="\Delta y=v_0 t+\tfrac12 at^2=5\cdot 8-\tfrac12\cdot 9{,}80\cdot 64=40-313{,}6=-273{,}6\;\text{m}" variant="blue" />
          <p>
            Negativt betyr 273,6 m <em>under</em> slippunktet. Siden steinen traff bakken, var
            slippunktet 273,6 m over bakken → <strong>høyde 274 m</strong>.
          </p>
        </Step>
        <Step n={2} title="(b) Fart ved bakken">
          <FormulaBox latex="v=v_0+at=5-9{,}80\cdot 8=\boxed{-73{,}4\;\text{m/s}}" variant="gold" />
          <p>
            Det negative fortegnet viser retning nedover. Størrelsen er 73,4 m/s ≈ 264 km/t — fornuftig
            for et 274 m fall.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> De første ≈0,5 sekundene stiger faktisk steinen litt
          (ca. 1,3 m opp før den snur), men snart dominerer g og den faller nedover. De 40 m positive i
          formelen er bidraget fra "starthastighetens arv" (5 m/s · 8 s), men det er langt mindre enn
          fallbidraget (313,6 m) etter 8 sekunder. Dette er et viktig prinsipp: slipper du noe fra et fartøy
          i bevegelse, må du bruke fartøyets hastighet (både størrelse og retning!) som v₀.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når vi spør "hvilken tid er forflytningen Δy?" i fritt fall,
          får vi en andregradsligning i t fordi posisjonsformelen har et <InlineLatex latex="t^2" />-ledd.
          Andregradsligninger har opptil to røtter — og begge kan være fysisk meningsfulle!
          For et objekt kastet oppover passerer det en gitt høyde to ganger: én gang på vei opp, og én
          gang på vei ned. Originalligningen er:
        </p>
        <FormulaBox latex="\Delta y = v_0 t + \tfrac12 a t^2" variant="blue" />
        <p>
          <strong>Hvorfor ikke bruke <InlineLatex latex="v^2=v_0^2+2a\Delta y" />?</strong> Fordi den gir
          farten ved 16 m, ikke tiden. Vi søker tid, og den eneste formelen som har t eksplisitt og
          forflytning, er posisjonsformelen.
        </p>
        <p>
          <strong>Fortegn:</strong> +y oppover. <InlineLatex latex="v_0=+24{,}5\;\text{m/s},\;a=-g=-9{,}80\;\text{m/s}^2" />.
          Sett <InlineLatex latex="\Delta y=+16{,}0\;\text{m}" />.
        </p>
        <Step n={1} title="Sett opp andregradsligningen">
          <p>Sett inn og omorder til standardform <InlineLatex latex="At^2+Bt+C=0" />:</p>
          <FormulaBox latex="16{,}0 = 24{,}5\,t - \tfrac12 (9{,}80) t^2 = 24{,}5 t - 4{,}90 t^2" variant="blue" />
          <FormulaBox latex="4{,}90 t^2-24{,}5 t+16{,}0=0" variant="blue" />
        </Step>
        <Step n={2} title="Bruk abc-formelen">
          <p>
            Med <InlineLatex latex="A=4{,}90,\;B=-24{,}5,\;C=16{,}0" />:
          </p>
          <FormulaBox latex="t=\dfrac{-B\pm\sqrt{B^2-4AC}}{2A}" variant="blue" />
          <FormulaBox latex="t=\frac{24{,}5\pm\sqrt{600{,}25-313{,}6}}{9{,}80}=\frac{24{,}5\pm\sqrt{286{,}65}}{9{,}80}=\frac{24{,}5\pm 16{,}93}{9{,}80}" variant="blue" />
          <FormulaBox latex="t_1=\boxed{0{,}773\;\text{s}}\;\text{(opp)},\quad t_2=\boxed{4{,}23\;\text{s}}\;\text{(ned)}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Begge røttene er positive og meningsfulle. Ved
          <InlineLatex latex="t_1=0{,}773\;\text{s}" /> passerer mursten 16 m på <em>vei opp</em>, og ved
          <InlineLatex latex="t_2=4{,}23\;\text{s}" /> passerer den 16 m <em>på vei ned</em>.
          Kontrollsjekk: Symmetri betyr at midtpunktet (toppen) skal være ved
          <InlineLatex latex="(0{,}773+4{,}23)/2 \approx 2{,}50\;\text{s}" />, som stemmer med
          <InlineLatex latex="t_\text{topp}=v_0/g=24{,}5/9{,}80=2{,}50\;\text{s}" /> ✓.
          Hadde vi bare fått én løsning, ville det betydd at murstenen akkurat så vidt nådde 16 m
          (toppen av banen).
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> To objekter i fritt fall har begge samme akselerasjon
          <InlineLatex latex="-g" />. Det betyr at den <em>relative</em> akselerasjonen mellom dem er null,
          og den relative bevegelsen er konstant fart. Dette forenkler oppgaven dramatisk, fordi når vi
          setter opp møteligningen, vil <InlineLatex latex="\tfrac12 g t^2" />-leddene kansellere.
          Grunnformelen for hvert objekt er:
        </p>
        <FormulaBox latex="y = y_0 + v_0 t + \tfrac12 a t^2" variant="blue" />
        <p>
          <strong>Hvorfor setter vi posisjonene like?</strong> "Møtes" betyr samme sted til samme tid:
          <InlineLatex latex="y_1(t)=y_2(t)" />. Vi trenger ikke <InlineLatex latex="v^2" />-formelen her,
          fordi vi søker <em>tid og sted</em>, ikke fart.
        </p>
        <p>
          <strong>Fortegn og origo:</strong> +y oppover, origo ved bakken. Ballen starter ved
          <InlineLatex latex="y=40\;\text{m}" /> med <InlineLatex latex="v_0=0" />; steinen starter ved
          <InlineLatex latex="y=0" /> med <InlineLatex latex="v_0=+20\;\text{m/s}" /> (oppover).
          Begge har <InlineLatex latex="a=-g" />.
        </p>
        <Step n={1} title="Sett opp posisjonsligninger">
          <FormulaBox latex="y_1=40-\tfrac12 g t^2" variant="blue" />
          <FormulaBox latex="y_2=20 t-\tfrac12 g t^2" variant="blue" />
        </Step>
        <Step n={2} title="Sett like og kanseller g-leddet">
          <p>
            Siden begge har samme <InlineLatex latex="-\tfrac12 g t^2" />-ledd, faller det ut:
          </p>
          <FormulaBox latex="40-\tfrac12 g t^2 = 20 t - \tfrac12 g t^2" variant="blue" />
          <FormulaBox latex="40=20 t\;\Rightarrow\;t=\boxed{2{,}00\;\text{s}}" variant="gold" />
          <p className="italic text-xs">
            Dette er akkurat hvor lang tid steinen bruker på å "lukke" 40 m med relativ fart 20 m/s.
          </p>
        </Step>
        <Step n={3} title="Høyde">
          <p>
            Sett <InlineLatex latex="t=2" /> inn i en av ligningene (steinens er enklere):
          </p>
          <FormulaBox latex="y=20\cdot 2-\tfrac12\cdot 9{,}80\cdot 4=40-19{,}6=\boxed{20{,}4\;\text{m}}" variant="gold" />
          <p>Sanity-check i ballens ligning: <InlineLatex latex="40-\tfrac12\cdot 9{,}80\cdot 4=40-19{,}6=20{,}4\;\text{m}" /> ✓.</p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> I en observator som faller fritt (i samme referansesystem som
          ballen) ser det ut som steinen beveger seg med konstant 20 m/s oppover mot ballen — og lukker
          gapet på 40 m på nøyaktig 2 s. Det er nøyaktig samme svar vi får ved å kansellere g-leddene.
          Dette er prinsippet bak Galileos berømte observasjon: alle objekter faller like raskt, uavhengig
          av masse.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Når akselerasjonen <em>ikke</em> er konstant, kan vi <strong>ikke</strong>
          bruke de fire kinematiske ligningene (<InlineLatex latex="v=v_0+at" /> etc.) —
          de er utledet under antakelsen om konstant a. I stedet bruker vi grunndefinisjonen
          <InlineLatex latex="a(t)=dv/dt" /> "baklengs" — altså integrerer vi akselerasjonen for å få farten.
          Grunnleggende sammenhenger:
        </p>
        <FormulaBox latex="a(t)=\dfrac{dv}{dt}\;\Longleftrightarrow\; v(t)=v_0+\int_0^t a(t')\,dt'" variant="blue" />
        <p>
          <strong>Hvorfor integral og ikke formel?</strong> Her er <InlineLatex latex="a(t)=2{,}00+3{,}00 t" />,
          altså tidsavhengig. En formel som <InlineLatex latex="v=v_0+at" /> ville brukt en eller annen
          middel-a, men det er ikke definert entydig. Integrasjon er <em>generelt</em> riktig, både for
          konstant og variabel a. Integrasjonskonstanten fastsettes av startbetingelsen
          <InlineLatex latex="v(0)=v_0" />.
        </p>
        <Step n={1} title="Integrer a(t) med hensyn til t">
          <p>
            Bruk at <InlineLatex latex="\int t^n\,dt = \tfrac{t^{n+1}}{n+1}" />:
          </p>
          <FormulaBox latex="\int_0^t (2{,}00+3{,}00 t')\,dt' = 2{,}00 t + \tfrac{3{,}00}{2} t^2 = 2{,}00 t + 1{,}50 t^2" variant="blue" />
          <p>Legg til startfarten (integrasjonskonstanten):</p>
          <FormulaBox latex="v(t)=2{,}00+\int_0^t(2{,}00+3{,}00t')\,dt'=2{,}00+2{,}00t+1{,}50t^2" variant="blue" />
        </Step>
        <Step n={2} title="Evaluer ved t = 5,00 s">
          <FormulaBox latex="v(5)=2+10+37{,}5=\boxed{49{,}5\;\text{m/s}}" variant="gold" />
          <p>
            Enhetssjekk: m/s + (m/s²)·s + (m/s³)·s² = m/s ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Akselerasjonen vokser med tiden (<InlineLatex latex="a(0)=2\;\text{m/s}^2,\;a(5)=17\;\text{m/s}^2" />),
          så farten vokser stadig raskere. Grafisk er v(t) arealet under a-t-kurven pluss startverdien
          — akkurat som at forskyvning er areal under v-t. Merk at <InlineLatex latex="v(t)" /> er kvadratisk
          i t, mens den ved konstant a ville vært lineær. Denne metoden (integrasjon av a) er det
          grunnleggende verktøyet når a er tidsavhengig.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Samme prinsipp som forrige oppgave, men ett nivå ned:
          posisjonen er integralet av hastigheten. Grunnleggende sammenhenger:
        </p>
        <FormulaBox latex="v(t)=\dfrac{dx}{dt}\;\Longleftrightarrow\; x(t)=x_0+\int_0^t v(t')\,dt'" variant="blue" />
        <p>
          <strong>Hvorfor integral, ikke <InlineLatex latex="x=v t" />?</strong> Fordi farten her varierer
          med tiden (<InlineLatex latex="v(t)=0{,}860+2{,}10 t^2" />), så en enkelt hastighet × tid gir
          feil svar. Integrasjon summerer opp alle små bidrag <InlineLatex latex="dx=v\,dt" /> over intervallet.
          Grafisk er forflytningen arealet under v-t-kurven; integrasjon beregner akkurat dette arealet.
        </p>
        <p>
          <strong>Rekkefølgen:</strong>
          <InlineLatex latex="a \xrightarrow{\int} v \xrightarrow{\int} x" /> via integrasjon;
          <InlineLatex latex="x \xrightarrow{d/dt} v \xrightarrow{d/dt} a" /> via derivasjon. Hver
          integrasjon bringer inn en integrasjonskonstant — bestemt av startbetingelsen
          (<InlineLatex latex="x_0" /> her).
        </p>
        <Step n={1} title="Integrer v(t) ledd for ledd">
          <p>
            Bruk <InlineLatex latex="\int 1\,dt=t,\;\int t^2\,dt=\tfrac{t^3}{3}" />:
          </p>
          <FormulaBox latex="\int_0^t (0{,}860+2{,}10 t'^2)\,dt' = 0{,}860 t + \tfrac{2{,}10}{3} t^3 = 0{,}860 t + 0{,}700 t^3" variant="blue" />
          <p>Legg til startposisjonen:</p>
          <FormulaBox latex="x(t)=5{,}00+0{,}860t+\tfrac{2{,}10}{3}t^3=5{,}00+0{,}860t+0{,}700t^3" variant="blue" />
        </Step>
        <Step n={2} title="Evaluer ved t = 3 s">
          <p>Sett inn steg for steg:</p>
          <FormulaBox latex="0{,}860\cdot 3 = 2{,}58" variant="blue" />
          <FormulaBox latex="0{,}700\cdot 3^3 = 0{,}700\cdot 27=18{,}9" variant="blue" />
          <FormulaBox latex="x(3)=5{,}00+2{,}58+18{,}9=\boxed{26{,}5\;\text{m}}" variant="gold" />
          <p>Enhetssjekk: m + (m/s)·s + (m/s³)·s³ = m ✓.</p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Den dominerende bidragsyteren til forflytning etter 3 s er det
          kubiske leddet (18,9 m av totalt 21,5 m tilbakelagt), fordi farten er i ferd med å eksplodere
          (<InlineLatex latex="v(3)=0{,}86+2{,}10\cdot 9=19{,}8\;\text{m/s}" />). Denne typen oppgave er
          typisk for et objekt med voksende akselerasjon (f.eks. en rakett der drivstoffmengden avtar).
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Akselerasjonen <InlineLatex latex="a(t)=3{,}50\,t" /> er <em>ikke konstant</em>
          — den vokser lineært med tiden. Dermed er formler som <InlineLatex latex="v=v_0+at" /> og
          <InlineLatex latex="y=y_0+v_0 t+\tfrac12 a t^2" /> <strong>ugyldige</strong>, siden de forutsetter
          konstant a. Riktig verktøy er dobbel integrasjon:
        </p>
        <FormulaBox latex="v(t)=v_0+\int_0^t a(t')\,dt',\qquad y(t)=y_0+\int_0^t v(t')\,dt'" variant="blue" />
        <p>
          <strong>Hvorfor ikke bare plugge a(5) inn i <InlineLatex latex="v=v_0+at" />?</strong> Det gir
          <InlineLatex latex="17{,}5\cdot 5=87{,}5\;\text{m/s}" /> — dobbelt så høyt som riktig svar.
          Feilen er at bare <em>halvparten</em> av tiden har akselerasjonen vært i nærheten av 17,5 m/s²;
          i første halvdel var den mye lavere. Integralet tar hensyn til dette ved å <em>summere</em>
          over alle tidsintervaller med riktig vekt.
        </p>
        <Step n={1} title="Første integrasjon — hastighet">
          <p>
            Bruk <InlineLatex latex="\int t\,dt=\tfrac{t^2}{2}" />, og <InlineLatex latex="v_0=0" />:
          </p>
          <FormulaBox latex="v(t)=\int_0^t 3{,}50t'\,dt'=3{,}50\cdot \tfrac{t^2}{2}=1{,}75\,t^2" variant="blue" />
          <FormulaBox latex="v(5)=1{,}75\cdot 25=\boxed{43{,}75\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={2} title="Andre integrasjon — høyde">
          <p>
            Integrer v(t) med <InlineLatex latex="\int t^2\,dt=\tfrac{t^3}{3}" />, og <InlineLatex latex="y_0=0" />:
          </p>
          <FormulaBox latex="y(t)=\int_0^t 1{,}75 t'^2\,dt'=\frac{1{,}75}{3}t^3\approx 0{,}583\,t^3" variant="blue" />
          <FormulaBox latex="y(5)=0{,}583\cdot 125=\boxed{72{,}9\;\text{m}}" variant="gold" />
          <p>
            Enhetssjekk: (m/s³)·s² = m/s ✓ (fart), og (m/s³)·s³ = m ✓ (høyde).
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Helikopteret har "jerk" (derivert av a) på 3,50 m/s³ — altså
          akselerasjonen øker hele tiden. Etter 5 s er a = 17,5 m/s² (nærmest 2g). Dobbelintegrasjon er
          den generelle strategien: hver integrasjon "hever nivået" én gang i differensialkjeden
          a → v → y. Konstant-a-formlene er bare et spesialtilfelle der integralene blir trivielle.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> "Møtes" betyr at begge bilene har samme posisjon samtidig, altså
          <InlineLatex latex="x_A(t)=x_B(t)" />. Strategien er å skrive posisjonsligningene i samme
          koordinatsystem og løse. Originalformelen for posisjon ved konstant akselerasjon er:
        </p>
        <FormulaBox latex="x = x_0 + v_0 t + \tfrac12 a t^2" variant="blue" />
        <p>
          Bil A har konstant fart (a = 0), så dens ligning er lineær. Bil B starter i ro og akselererer,
          så dens ligning har et <InlineLatex latex="t^2" />-ledd. Resultatet er en andregradsligning.
        </p>
        <p>
          <strong>Origo og retning:</strong> La +x peke mot B, origo ved A's start. Da er:
        </p>
        <ul className="list-disc pl-5">
          <li>Bil A: <InlineLatex latex="x_{A,0}=0,\;v_0=+25,\;a=0" /> → <InlineLatex latex="x_A=25 t" />.</li>
          <li>Bil B: starter ved <InlineLatex latex="x_{B,0}=+200\;\text{m}" />, i ro (<InlineLatex latex="v_0=0" />), akselererer mot A altså i −x retning → <InlineLatex latex="a=-2{,}00\;\text{m/s}^2" />.</li>
        </ul>
        <FormulaBox latex="x_B=200+0\cdot t+\tfrac12(-2)t^2=200-t^2" variant="blue" />
        <Step n={1} title="Sett posisjoner like">
          <FormulaBox latex="25t=200-t^2" variant="blue" />
          <p>Omorder til standardform <InlineLatex latex="At^2+Bt+C=0" />:</p>
          <FormulaBox latex="t^2+25t-200=0" variant="blue" />
        </Step>
        <Step n={2} title="Løs andregradsligningen">
          <p>Bruk abc-formelen med A = 1, B = 25, C = −200:</p>
          <FormulaBox latex="t=\frac{-25\pm\sqrt{625+800}}{2}=\frac{-25\pm\sqrt{1425}}{2}=\frac{-25\pm 37{,}75}{2}" variant="blue" />
          <p>Den positive løsningen er den fysisk meningsfulle (tid kan ikke være negativ):</p>
          <FormulaBox latex="t=\frac{-25+\sqrt{625+800}}{2}=\frac{-25+37{,}75}{2}=\boxed{6{,}38\;\text{s}}" variant="gold" />
        </Step>
        <Step n={3} title="Sted">
          <p>Sett t inn i A's posisjonsligning (lettere enn B's):</p>
          <FormulaBox latex="x=25\cdot 6{,}38=\boxed{159{,}4\;\text{m}}\;\text{fra A's start}" variant="gold" />
          <p>
            Sanity-check i B's ligning:
            <InlineLatex latex="x_B=200-6{,}38^2=200-40{,}7=159{,}3\;\text{m}" /> ✓ (avrundingsfeil).
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> A kjører 159 m på 6,38 s (lineært), mens B tilbakelegger
          bare ca. 41 m (fra 200 ned til 159). Det er fordi B starter fra ro og ikke har rukket å bygge
          opp særlig fart. Ved møte er B's fart <InlineLatex latex="|v_B|=a t=2\cdot 6{,}38=12{,}8\;\text{m/s}" />
          (mot A). Den negative roten <InlineLatex latex="t=-31{,}4\;\text{s}" /> forkastes: det ville svart
          til et fiktivt møte i fortiden dersom ligningene var gyldige bakover i tid.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Den vanligste feilen her er å ta enkel aritmetisk gjennomsnitt
          <InlineLatex latex="(20+30)/2=25\;\text{m/s}" /> — <em>feil</em>. Grunnen er at gjennomsnittsfart
          defineres som:
        </p>
        <FormulaBox latex="\bar v = \dfrac{\text{total avstand}}{\text{total tid}}" variant="blue" />
        <p>
          Det <em>aritmetiske</em> snittet gir riktig svar bare når de to etappene tar <em>lik tid</em>.
          Her er det <em>avstandene</em> som er like (d/2 hver), ikke tidene. Og siden tid = d/v,
          bruker bilen <em>mer</em> tid på den langsomme strekningen — den har større vekt i snittet.
          Derfor havner svaret nærmere 20 enn 30.
        </p>
        <p>
          <strong>Hvorfor ikke bruke <InlineLatex latex="v^2=v_0^2+2as" />?</strong> Den gjelder bare
          konstant akselerasjon, ikke her der farten skifter brått. I stedet regner vi ut total tid
          direkte fra <InlineLatex latex="t=d/v" /> per halvdel.
        </p>
        <Step n={1} title="Tid per halvdel">
          <p>Bruk <InlineLatex latex="t=(\text{avstand})/(\text{fart})" /> på hver halvdel:</p>
          <FormulaBox latex="t_1=\frac{d/2}{20},\;t_2=\frac{d/2}{30}" variant="blue" />
        </Step>
        <Step n={2} title="Gjennomsnittsfart (harmonisk snitt)">
          <p>
            Sett inn i definisjonen. Distansen d faller ut, noe som er et tegn på at svaret er
            uavhengig av total lengde:
          </p>
          <FormulaBox latex="\bar v=\frac{d}{t_1+t_2}=\frac{d}{\tfrac{d}{2}\left(\tfrac{1}{20}+\tfrac{1}{30}\right)}=\frac{2}{\tfrac{1}{20}+\tfrac{1}{30}}" variant="blue" />
          <p>Bruk fellesnevner 60:</p>
          <FormulaBox latex="\tfrac{1}{20}+\tfrac{1}{30}=\tfrac{3+2}{60}=\tfrac{5}{60}=\tfrac{1}{12}" variant="blue" />
          <FormulaBox latex="\bar v=\frac{d}{t_1+t_2}=\frac{d}{d/2(1/20+1/30)}=\frac{2}{1/20+1/30}=\frac{2\cdot 600}{30+20}=\boxed{24\;\text{m/s}}" variant="gold" />
          <p>
            Merk: den generelle formelen er det <em>harmoniske snittet</em>
            <InlineLatex latex="\bar v = \tfrac{2 v_1 v_2}{v_1 + v_2} = \tfrac{2\cdot 20\cdot 30}{50}=24\;\text{m/s}" /> ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> 24 m/s ligger <em>under</em> det aritmetiske snittet
          (25 m/s). Det er alltid slik når distansene er like: harmonisk snitt er alltid mindre enn
          eller lik det aritmetiske. Det reflekterer at tiden dominerer — du tilbringer mer av turen
          på den lave farten.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Enhetskonvertering <em>først</em>! Bilens hastighet er gitt i km/t, men
          akselerasjon måles i m/s². Å blande enheter gir alltid gale svar, så vi konverterer
          <InlineLatex latex="80\;\text{km/t}" /> til m/s først:
        </p>
        <FormulaBox latex="80\;\text{km/t} \times \tfrac{1000\;\text{m}}{1\;\text{km}} \times \tfrac{1\;\text{t}}{3600\;\text{s}} = \tfrac{80000}{3600} = 22{,}22\;\text{m/s}" variant="blue" />
        <p>
          <strong>Formler:</strong> Vi antar konstant retardasjon (rimelig antakelse for normal bremsing).
          Da gjelder de fire kinematiske ligningene. For akselerasjon trenger vi
          <InlineLatex latex="v_0,v,t" />, og formelen uten posisjon er best:
        </p>
        <FormulaBox latex="v=v_0+at \;\Longrightarrow\; a=\dfrac{v-v_0}{t}" variant="blue" />
        <p>For distansen kan vi enten bruke <InlineLatex latex="s=\tfrac12(v_0+v)t" /> (gjennomsnittshastighet × tid) eller <InlineLatex latex="s=v_0 t+\tfrac12 at^2" />. Førstnevnte er enklest fordi a faller ut:</p>
        <FormulaBox latex="s=\tfrac12(v_0+v)t" variant="blue" />
        <Step n={1} title="Akselerasjon">
          <p>Sett inn <InlineLatex latex="v=0,\;v_0=22{,}22\;\text{m/s},\;t=3{,}5\;\text{s}" />:</p>
          <FormulaBox latex="a=\frac{0-22{,}22}{3{,}5}=\boxed{-6{,}35\;\text{m/s}^2}" variant="gold" />
          <p>
            Negativt fortegn betyr retardasjon (akselerasjonen er motsatt bevegelsesretningen).
            Størrelsen 6,35 m/s² ≈ 0,65g er en sterk, men ikke ekstrem nødbremsing.
          </p>
        </Step>
        <Step n={2} title="Distanse">
          <p>
            Bruk gjennomsnittshastighet-formelen (siden a er konstant er
            <InlineLatex latex="\bar v=(v_0+v)/2" />):
          </p>
          <FormulaBox latex="s=\tfrac12(22{,}22+0)(3{,}5)=\boxed{38{,}9\;\text{m}}" variant="gold" />
          <p>
            Alternativ sjekk via <InlineLatex latex="v^2=v_0^2+2as\Rightarrow s=v_0^2/(2|a|)=22{,}22^2/(2\cdot 6{,}35)=38{,}9\;\text{m}" /> ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Nesten 40 m er lengden av en vanlig skolebuss — det er distansen
          bilen tilbakelegger <em>mens den bremser fra 80 km/t til stopp</em>. Legg merke til at
          stoppedistansen vokser kvadratisk med farten: ved 160 km/t hadde distansen vært 4× så lang
          (156 m). Dette er et veldig sentralt poeng i trafikksikkerhet.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Klassisk innhentingsoppgave med forskjell: MC starter <em>bak</em> bilen,
          så i stedet for å starte like (som i 2.29), må MC først lukke det opprinnelige gapet på 50 m og
          deretter innhente. Strategien er fortsatt å sette posisjonene like, men startposisjonene er ulike.
          Grunnformelen er:
        </p>
        <FormulaBox latex="x = x_0 + v_0 t + \tfrac12 a t^2" variant="blue" />
        <p>
          <strong>Hvorfor sette posisjoner like?</strong> "Når når MC bilen" betyr at de er på samme sted
          til samme tid. Vi bruker ikke <InlineLatex latex="v^2=v_0^2+2as" /> her fordi vi søker tid, og vi
          kjenner ikke distansen på forhånd. Vi må løse en andregradsligning.
        </p>
        <p>
          <strong>Koordinatsystem:</strong> La MC starte i origo (<InlineLatex latex="x_0=0" />), +x langs
          bilens bevegelsesretning, t = 0 når bilen passerer MC. Da er bilen 50 m foran MC ved start.
        </p>
        <Step n={1} title="Sett opp posisjonsligninger">
          <p>
            MC: starter i origo fra ro og akselererer med a = 3,00 m/s²:
          </p>
          <FormulaBox latex="x_{MC}=0+0\cdot t+\tfrac12\cdot 3 t^2=1{,}5 t^2" variant="blue" />
          <p>
            Bil: starter 50 m foran, konstant fart 20,0 m/s (a = 0):
          </p>
          <FormulaBox latex="x_B=50+20 t" variant="blue" />
        </Step>
        <Step n={2} title="Sett posisjoner like">
          <FormulaBox latex="1{,}5 t^2=50+20 t\;\Rightarrow\;1{,}5 t^2-20 t-50=0" variant="blue" />
          <p>Andregradsligning med A = 1,5, B = −20, C = −50:</p>
          <FormulaBox latex="t=\dfrac{-B\pm\sqrt{B^2-4AC}}{2A}=\dfrac{20\pm\sqrt{400+300}}{3}" variant="blue" />
          <FormulaBox latex="t=\frac{20+\sqrt{400+300}}{3}=\frac{20+26{,}46}{3}=\boxed{15{,}5\;\text{s}}" variant="gold" />
          <p>
            (Den negative roten er ufysisk — tid tilbake i fortiden.)
          </p>
        </Step>
        <Step n={3} title="MC-fart ved innhenting">
          <p>
            Bruk <InlineLatex latex="v=v_0+at" /> med <InlineLatex latex="v_0=0" />:
          </p>
          <FormulaBox latex="v=at=3\cdot 15{,}5=\boxed{46{,}4\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">≈ 167 km/t — ganske raskt! I virkeligheten ville motorsykkelens akselerasjon flatet ut, men antakelsen om konstant a gir et enkelt matematisk bilde.</p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> MC må både lukke 50 m gap <em>og</em> ta igjen bilens løpende
          forsprang. Det tar lengre tid enn bare å nå bilens fart (som alene skjer etter 20/3 ≈ 6,7 s).
          Alternativt kunne vi bruke <em>relativ bevegelse</em>: i bilens referansesystem starter MC 50 m
          bak med relativ startfart −20 m/s og relativ akselerasjon +3 m/s². Da er oppgaven
          <InlineLatex latex="\tfrac12 a_\text{rel} t^2 + v_\text{rel,0} t = 50" />, som gir samme svar.
        </p>
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
