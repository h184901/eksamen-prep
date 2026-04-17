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
      <marker id="arrow-red-k29" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k29" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k29" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k29" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k29" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 29 (Elektromagnetisk induksjon)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 29.1 — Faradays lov: enkelt sløyfe, varierende B
  // ==========================================================================
  "29.1": {
    title: "Indusert EMF i sirkulær sløyfe",
    difficulty: "lett",
    pageRef: "s. 962",
    problem: (
      <div className="space-y-2">
        <p>
          En sirkulær sløyfe med radius <InlineLatex latex="r=12{,}0\;\text{cm}" /> ligger i et uniformt magnetfelt
          som står vinkelrett på sløyfens plan. Feltet avtar fra <InlineLatex latex="B_1=1{,}50\;\text{T}" /> til
          <InlineLatex latex="\;B_2=0{,}500\;\text{T}" /> i løpet av <InlineLatex latex="\Delta t=2{,}00\;\text{s}" />.
          Finn størrelsen av indusert EMF.
        </p>
        <svg viewBox="0 0 260 140" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <circle cx="130" cy="70" r="40" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="150" y="30" fontSize="10" fill="#ef4444">sløyfe r = 12 cm</text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={100 + i * 20} cy="70" r="2" fill="#3b82f6" />
              <circle cx={100 + i * 20} cy="70" r="5" fill="none" stroke="#3b82f6" />
            </g>
          ))}
          <text x="80" y="130" fontSize="10" fill="#3b82f6">B ut av siden, avtagende</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="r=0{,}120\;\text{m}" /></li>
        <li><InlineLatex latex="B_1=1{,}50\;\text{T},\;B_2=0{,}500\;\text{T}" /></li>
        <li><InlineLatex latex="\Delta t=2{,}00\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Størrelsen av indusert EMF <InlineLatex latex="|\varepsilon|" />.</p>,
    strategy: (
      <div>
        <p>Fluksen <InlineLatex latex="\Phi_B=B\,A" /> (B er vinkelrett på A). Faradays lov gir <InlineLatex latex="\varepsilon=-d\Phi_B/dt" />. Med konstant A og lineær endring i B kan vi bruke <InlineLatex latex="|\varepsilon|=A\,|\Delta B/\Delta t|" />.</p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Arealet av sløyfen er <InlineLatex latex="A=\pi r^2" />. Sett inn tall.</p>,
      },
      {
        label: "Hint 2",
        content: <p><InlineLatex latex="\Delta B/\Delta t=(B_2-B_1)/\Delta t=-0{,}500\;\text{T/s}" />. EMF-størrelsen er <InlineLatex latex="A\cdot|\Delta B/\Delta t|" />.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Faradays lov">
          <p><InlineLatex latex="\varepsilon=-\dfrac{d\Phi_B}{dt}" />, hvor <InlineLatex latex="\Phi_B=\int\vec B\cdot d\vec A" />. For et uniformt felt vinkelrett på sløyfen blir <InlineLatex latex="\Phi_B=BA" />, og ved konstant A får vi <InlineLatex latex="\varepsilon=-A\,dB/dt" />.</p>
        </TheoryBox>
        <Step n={1} title="Beregn sløyfens areal">
          <FormulaBox latex="A=\pi r^2=\pi(0{,}120)^2=4{,}524\times 10^{-2}\;\text{m}^2" />
        </Step>
        <Step n={2} title="Endringsrate for B">
          <FormulaBox latex="\dfrac{\Delta B}{\Delta t}=\dfrac{0{,}500-1{,}50}{2{,}00}=-0{,}500\;\text{T/s}" />
        </Step>
        <Step n={3} title="Indusert EMF">
          <FormulaBox latex="|\varepsilon|=A\left|\dfrac{\Delta B}{\Delta t}\right|=4{,}524\times 10^{-2}\cdot 0{,}500" />
          <FormulaBox latex="\boxed{|\varepsilon|\approx 2{,}26\times 10^{-2}\;\text{V}=22{,}6\;\text{mV}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>Når feltet avtar uniformt, er EMF proporsjonal med <InlineLatex latex="A\,|dB/dt|" />. Jo større spole eller raskere endring, jo større indusert spenning.</p>
    ),
  },

  // ==========================================================================
  // 29.6 — Spole med N vindinger
  // ==========================================================================
  "29.6": {
    title: "EMF i flerlagsspole",
    difficulty: "lett",
    pageRef: "s. 963",
    problem: (
      <p>
        En spole har <InlineLatex latex="N=200" /> vindinger med radius
        <InlineLatex latex="\;r=4{,}00\;\text{cm}" />. Spolen ligger i et magnetfelt vinkelrett på vindingsplanet.
        Feltet endrer seg med konstant rate <InlineLatex latex="dB/dt=0{,}0350\;\text{T/s}" />. Finn indusert EMF.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="N=200" /></li>
        <li><InlineLatex latex="r=0{,}0400\;\text{m}" /></li>
        <li><InlineLatex latex="dB/dt=0{,}0350\;\text{T/s}" /></li>
      </ul>
    ),
    unknowns: <p>Størrelsen av <InlineLatex latex="\varepsilon" />.</p>,
    strategy: (
      <p>For en spole med N vindinger gir Faradays lov <InlineLatex latex="\varepsilon=-N\,d\Phi_B/dt" />. Med <InlineLatex latex="\Phi_B=BA" /> blir <InlineLatex latex="|\varepsilon|=N A\,|dB/dt|" />.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Hver vinding bidrar med samme fluks; derfor multipliseres med N.</p>,
      },
    ],
    solution: (
      <div>
        <Step n={1} title="Areal per vinding">
          <FormulaBox latex="A=\pi r^2=\pi(0{,}0400)^2=5{,}027\times 10^{-3}\;\text{m}^2" />
        </Step>
        <Step n={2} title="EMF fra Faradays lov">
          <FormulaBox latex="|\varepsilon|=NA\left|\dfrac{dB}{dt}\right|=200\cdot 5{,}027\times 10^{-3}\cdot 0{,}0350" />
          <FormulaBox latex="\boxed{|\varepsilon|\approx 0{,}0352\;\text{V}=35{,}2\;\text{mV}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>N vindinger multipliserer EMF-bidraget — dette er hvorfor transformatorer bruker mange vindinger for å oppnå høye spenninger.</p>
    ),
  },

  // ==========================================================================
  // 29.8 — Roterende sløyfe (generator)
  // ==========================================================================
  "29.8": {
    title: "Roterende sløyfe — vekselstrømgenerator",
    difficulty: "middels",
    pageRef: "s. 964",
    problem: (
      <div className="space-y-2">
        <p>
          En rektangulær sløyfe (<InlineLatex latex="a=20{,}0\;\text{cm}\times b=30{,}0\;\text{cm}" />) roterer med
          vinkelhastighet <InlineLatex latex="\omega=100\;\text{rad/s}" /> i et uniformt magnetfelt
          <InlineLatex latex="\;B=0{,}250\;\text{T}" />. Rotasjonsaksen er vinkelrett på B. Finn maksimal EMF.
        </p>
        <svg viewBox="0 0 260 140" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <rect x="90" y="50" width="80" height="40" fill="none" stroke="#ef4444" strokeWidth="2" />
          <line x1="70" y1="70" x2="190" y2="70" stroke="#6b7280" strokeDasharray="3 3" />
          <text x="195" y="74" fontSize="10" fill="#6b7280">akse</text>
          {[30, 50, 70, 90, 110].map((y, i) => (
            <line key={i} x1="210" y1={y} x2="240" y2={y} stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue-k29)" />
          ))}
          <text x="212" y="125" fontSize="10" fill="#3b82f6">B</text>
          <path d="M 110 50 A 20 12 0 0 1 110 90" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-green-k29)" />
          <text x="80" y="30" fontSize="10" fill="#10b981">ω</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="a=0{,}200\;\text{m},\;b=0{,}300\;\text{m}" /></li>
        <li><InlineLatex latex="\omega=100\;\text{rad/s}" /></li>
        <li><InlineLatex latex="B=0{,}250\;\text{T}" /></li>
      </ul>
    ),
    unknowns: <p>Maksimal indusert EMF <InlineLatex latex="\varepsilon_\mathrm{max}" />.</p>,
    strategy: (
      <p>For en roterende sløyfe er <InlineLatex latex="\Phi_B=BA\cos(\omega t)" />. Faradays lov gir <InlineLatex latex="\varepsilon=BA\omega\sin(\omega t)" />, og maksimumsverdien er <InlineLatex latex="\varepsilon_\mathrm{max}=BA\omega" />.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Areal: <InlineLatex latex="A=ab" />. Sett inn i <InlineLatex latex="\varepsilon_\mathrm{max}=BA\omega" />.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Sinusformet EMF">
          <p>Når en sløyfe roterer jevnt i et B-felt, varierer fluksen som cosinus og EMF som sinus. Maksimal EMF oppnås når sløyfen ligger parallelt med B (fluksen er null, men endres raskest).</p>
        </TheoryBox>
        <Step n={1} title="Areal">
          <FormulaBox latex="A=ab=0{,}200\cdot 0{,}300=0{,}0600\;\text{m}^2" />
        </Step>
        <Step n={2} title="Maksimal EMF">
          <FormulaBox latex="\varepsilon_\mathrm{max}=BA\omega=0{,}250\cdot 0{,}0600\cdot 100" />
          <FormulaBox latex="\boxed{\varepsilon_\mathrm{max}=1{,}50\;\text{V}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>Dette er prinsippet bak en vekselstrømgenerator: mekanisk rotasjon av en sløyfe i et B-felt gir sinusformet spenning. Legg merke til at <InlineLatex latex="\varepsilon_\mathrm{max}\propto \omega" />.</p>
    ),
  },

  // ==========================================================================
  // 29.13 — Stav i magnetfelt (motional EMF)
  // ==========================================================================
  "29.13": {
    title: "Bevegelses-EMF i stav",
    difficulty: "middels",
    pageRef: "s. 966",
    problem: (
      <div className="space-y-2">
        <p>
          En metallstav med lengde <InlineLatex latex="L=0{,}800\;\text{m}" /> beveger seg med konstant fart
          <InlineLatex latex="\;v=5{,}00\;\text{m/s}" /> vinkelrett på både stavens lengde og et uniformt magnetfelt
          <InlineLatex latex="\;B=0{,}450\;\text{T}" /> rettet inn i siden. Stavens ender glir langs U-formede skinner
          som lukker kretsen. Finn (a) indusert EMF, (b) strømmen om kretsresistansen er <InlineLatex latex="R=1{,}50\;\Omega" />,
          (c) kraften som må til for å holde farten konstant.
        </p>
        <svg viewBox="0 0 280 160" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <line x1="40" y1="30" x2="220" y2="30" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="130" x2="220" y2="130" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="130" stroke="#374151" strokeWidth="2" />
          <line x1="160" y1="30" x2="160" y2="130" stroke="#ef4444" strokeWidth="3" />
          <text x="165" y="80" fontSize="10" fill="#ef4444">stav L</text>
          <line x1="160" y1="80" x2="210" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <text x="215" y="84" fontSize="10" fill="#10b981">v</text>
          {[{x:70,y:60},{x:100,y:60},{x:130,y:60},{x:70,y:100},{x:100,y:100},{x:130,y:100}].map((p,i)=>(
            <g key={i}><circle cx={p.x} cy={p.y} r="4" fill="none" stroke="#3b82f6" /><line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" /><line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" /></g>
          ))}
          <text x="50" y="150" fontSize="10" fill="#3b82f6">B inn i siden</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="L=0{,}800\;\text{m}" /></li>
        <li><InlineLatex latex="v=5{,}00\;\text{m/s}" /></li>
        <li><InlineLatex latex="B=0{,}450\;\text{T}" /></li>
        <li><InlineLatex latex="R=1{,}50\;\Omega" /></li>
      </ul>
    ),
    unknowns: <p>EMF, strøm I, og nødvendig dragkraft F.</p>,
    strategy: (
      <div>
        <p>Bevegelses-EMF: <InlineLatex latex="\varepsilon=BLv" />. Strøm: <InlineLatex latex="I=\varepsilon/R" />. Kraften på strømstav i B-felt: <InlineLatex latex="F=BIL" />, som må motvirkes av en ytre kraft for konstant fart.</p>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="\varepsilon=BLv" /> kommer fra at arealet øker med <InlineLatex latex="\Delta A=Lv\,\Delta t" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Når strømmen flyter i staven, gir <InlineLatex latex="\vec F=I\vec L\times\vec B" /> en kraft som motsetter bevegelsen (Lenz' lov).</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Bevegelses-EMF">
          <p>En ladningsbærer i staven opplever kraft <InlineLatex latex="qv B" /> som samler positive ladninger i den ene enden. Dette gir en indre EMF <InlineLatex latex="\varepsilon=\int (\vec v\times\vec B)\cdot d\vec l=BLv" />.</p>
        </TheoryBox>
        <Step n={1} title="(a) Indusert EMF">
          <FormulaBox latex="\varepsilon=BLv=0{,}450\cdot 0{,}800\cdot 5{,}00=1{,}80\;\text{V}" />
          <FormulaBox latex="\boxed{\varepsilon=1{,}80\;\text{V}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Strøm i kretsen">
          <FormulaBox latex="I=\dfrac{\varepsilon}{R}=\dfrac{1{,}80}{1{,}50}" />
          <FormulaBox latex="\boxed{I=1{,}20\;\text{A}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Kraft på staven pga. strømmen">
          <FormulaBox latex="F_\mathrm{motstand}=BIL=0{,}450\cdot 1{,}20\cdot 0{,}800=0{,}432\;\text{N}" />
          <p>Denne kraften virker mot bevegelsen (Lenz), så dragkraften må være like stor i motsatt retning:</p>
          <FormulaBox latex="\boxed{F_\mathrm{drag}=0{,}432\;\text{N}}" variant="gold" />
        </Step>
        <Step n={4} title="Sjekk energibevaring">
          <p>Tilført mekanisk effekt: <InlineLatex latex="P_\mathrm{mek}=Fv=0{,}432\cdot 5{,}00=2{,}16\;\text{W}" />.</p>
          <p>Dissipert elektrisk effekt: <InlineLatex latex="P_\mathrm{el}=I^2R=(1{,}20)^2\cdot 1{,}50=2{,}16\;\text{W}" />. ✓</p>
        </Step>
      </div>
    ),
    summary: (
      <p>Dette er prinsippet bak elektrisk generering: mekanisk arbeid omdannes direkte til elektrisk energi via en bevegelses-EMF. Kraften er et resultat av Lenz' lov — induksjon motsetter seg alltid årsaken til endringen.</p>
    ),
  },

  // ==========================================================================
  // 29.15 — Lenz' lov: retning
  // ==========================================================================
  "29.15": {
    title: "Retning av indusert strøm — Lenz' lov",
    difficulty: "lett",
    pageRef: "s. 971",
    problem: (
      <div className="space-y-2">
        <p>
          En sirkulær leder ligger i planet på siden din. Et magnetfelt peker <em>ut av siden</em> og øker med tiden.
          I hvilken retning flyter den induserte strømmen i lederen — med eller mot urviseren?
        </p>
        <svg viewBox="0 0 200 140" className="w-full max-w-xs mx-auto">
          <circle cx="100" cy="70" r="45" fill="none" stroke="#374151" strokeWidth="2" />
          {[{x:80,y:55},{x:120,y:55},{x:80,y:85},{x:120,y:85},{x:100,y:70}].map((p,i)=>(
            <g key={i}><circle cx={p.x} cy={p.y} r="2" fill="#3b82f6" /><circle cx={p.x} cy={p.y} r="5" fill="none" stroke="#3b82f6" /></g>
          ))}
          <text x="70" y="130" fontSize="10" fill="#3b82f6">B ut, øker</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="B" /> peker ut av siden</li>
        <li><InlineLatex latex="dB/dt>0" /></li>
      </ul>
    ),
    unknowns: <p>Retningen av indusert strøm.</p>,
    strategy: (
      <p>Lenz' lov: indusert strøm motsetter seg endringen i fluks. Siden fluksen ut av siden øker, må den induserte strømmen skape et B-felt inn i siden — dvs. strømmen flyter <em>med urviseren</em> sett fra leserens side (høyrehåndsregel).</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Høyrehåndsregel: peker tomlen i retningen til det induserte B, krøller fingrene i strømretningen.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Lenz' lov">
          <p>Den induserte strømmen skaper alltid en fluks som motsetter seg endringen i den ytre fluksen. Dette er en direkte konsekvens av energibevaring.</p>
        </TheoryBox>
        <Step n={1} title="Identifiser endringen">
          <p>Ytre felt ut av siden, øker. Dvs. fluksen <InlineLatex latex="\Phi_B" /> ut av siden øker.</p>
        </Step>
        <Step n={2} title="Induserende felt må motsette seg">
          <p>Indusert B må peke <em>inn i siden</em> inne i sløyfen for å "oppveie" økningen.</p>
        </Step>
        <Step n={3} title="Høyrehåndsregel for strøm">
          <p>Tomlen inn i siden → fingrene krøller med urviseren.</p>
          <FormulaBox latex="\boxed{\text{Strøm flyter med urviseren sett fra forsiden.}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>Lenz' lov er et kvalitativt verktøy som gir retning uten å regne på fortegn i integraler. Alltid: spør hva som endres, og hva indusert B må gjøre for å motvirke det.</p>
    ),
  },

  // ==========================================================================
  // 29.19 — Magnet som beveges inn i spole
  // ==========================================================================
  "29.19": {
    title: "Stangmagnet som stikkes inn i spole",
    difficulty: "lett",
    pageRef: "s. 971",
    problem: (
      <p>
        Nordpolen på en stangmagnet beveges mot den åpne enden av en sirkulær spole. Sett fra magnetens side:
        i hvilken retning (med/mot urviseren) flyter den induserte strømmen i spolen? Begrunn med Lenz' lov.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>N-pol på magnet nærmer seg spolens ende</li>
        <li>Fluksen gjennom spolen (fra magneten) øker i retning <em>bort fra</em> magneten (dvs. B-linjer går ut fra N-pol, gjennom spolen)</li>
      </ul>
    ),
    unknowns: <p>Retning på indusert strøm sett fra magnetens side.</p>,
    strategy: (
      <p>Fluksen inn i spolen (fra N-polen) øker. Indusert strøm må skape motsatt B-felt ved enden vendt mot magneten — altså en nord-pol som avviser magneten. Høyrehåndsregel gir strømretning.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Husk: når magneter nærmer seg hverandre med like poler, frastøter de hverandre. Induksjon skaper "like poler" for å motvirke bevegelsen.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Lenz: induksjon motarbeider bevegelsen">
          <p>Når magneten nærmer seg, øker fluksen. Spolen må lage et B-felt som motvirker økningen. Enden vendt mot den innkommende N-polen må selv bli en "N-pol" (peker mot magneten) for å støte den bort.</p>
        </TheoryBox>
        <Step n={1} title="Retning på indusert B i spolen">
          <p>Ved spole-enden vendt mot magneten må B-linjene peke <em>ut</em> (mot magneten) → indusert B er rettet fra spolen mot magneten.</p>
        </Step>
        <Step n={2} title="Strøm­retning via høyrehåndsregel">
          <p>Sett fra magneten (dvs. ser inn på spolens åpning): B kommer mot deg → strøm i spolens vindinger går <em>mot urviseren</em>.</p>
          <FormulaBox latex="\boxed{\text{Strømmen flyter mot urviseren sett fra magneten.}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>Lenz' lov gir en fysisk intuisjon: induksjon "forsvarer" status quo. Jo raskere du skyver magneten inn, jo større strøm — og jo mer motstand du må overvinne. Energi bevares.</p>
    ),
  },

  // ==========================================================================
  // 29.22 — Sløyfe med varierende strøm i nabospole
  // ==========================================================================
  "29.22": {
    title: "Spolepar — endring i nabostrøm",
    difficulty: "middels",
    pageRef: "s. 972",
    problem: (
      <p>
        To koaksielle sirkulære spoler ligger nær hverandre. Spole 1 er tilkoblet en bryter og et batteri. Spole 2 er
        lukket via et galvanometer. Beskriv retning og forløp av strømmen i spole 2 i (a) øyeblikket bryteren slås på,
        (b) mens strømmen i spole 1 er konstant, og (c) øyeblikket bryteren slås av.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>To spoler, aksialt plassert</li>
        <li>Spole 1: batteri + bryter; Spole 2: galvanometer (lukket krets)</li>
      </ul>
    ),
    unknowns: <p>Retning og varighet av strøm i spole 2 i de tre fasene.</p>,
    strategy: (
      <p>Kun <em>endringer</em> i fluks induserer EMF. Fasene (a) og (c) gir korte strømpulser; fase (b) gir null strøm.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Tenk på fluks fra spole 1 gjennom spole 2. Hvor raskt endrer den seg i hver fase?</p>,
      },
      {
        label: "Hint 2",
        content: <p>Lenz: strøm i spole 2 motvirker endringen i ytre fluks.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Gjensidig induksjon">
          <p>Fluksen gjennom spole 2 er proporsjonal med strømmen i spole 1. Når <InlineLatex latex="I_1" /> endres, endres <InlineLatex latex="\Phi_{21}" />, og spole 2 får indusert EMF.</p>
        </TheoryBox>
        <Step n={1} title="(a) Bryter slås på">
          <p>Strømmen i spole 1 stiger raskt fra 0 til <InlineLatex latex="I_0" />. Fluksen gjennom spole 2 øker. Indusert strøm i spole 2 må motvirke økningen → går i <em>motsatt sirkulasjonsretning</em> av strømmen i spole 1. Kort puls.</p>
        </Step>
        <Step n={2} title="(b) Konstant strøm">
          <p>Fluksen er konstant, så <InlineLatex latex="d\Phi/dt=0" /> og dermed <InlineLatex latex="\varepsilon_2=0" />. Ingen strøm i spole 2.</p>
        </Step>
        <Step n={3} title="(c) Bryter slås av">
          <p>Strømmen i spole 1 faller fra <InlineLatex latex="I_0" /> til 0. Fluksen avtar. Indusert strøm i spole 2 motvirker nedgangen → går i <em>samme</em> sirkulasjonsretning som strømmen i spole 1 gjorde. Kort puls, motsatt retning av fase (a).</p>
        </Step>
        <FormulaBox latex="\boxed{\varepsilon_2=-M\,\dfrac{dI_1}{dt}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>Dette er transformator-prinsippet: <em>endring</em> i strøm i primærspolen induserer spenning i sekundærspolen. Med jevn likestrøm fungerer det ikke — derfor bruker transformatorer vekselstrøm.</p>
    ),
  },

  // ==========================================================================
  // 29.24 — Selvinduktans: EMF i solenoide
  // ==========================================================================
  "29.24": {
    title: "Selvinduktans — EMF ved strømendring",
    difficulty: "lett",
    pageRef: "s. 975",
    problem: (
      <p>
        En spole har selvinduktans <InlineLatex latex="L=0{,}260\;\text{H}" />. Strømmen gjennom spolen endres med
        rate <InlineLatex latex="dI/dt=0{,}0180\;\text{A/s}" />. Finn størrelsen og fortegn (retning) av indusert EMF.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="L=0{,}260\;\text{H}" /></li>
        <li><InlineLatex latex="dI/dt=+0{,}0180\;\text{A/s}" /> (økende)</li>
      </ul>
    ),
    unknowns: <p>Størrelse og retning av <InlineLatex latex="\varepsilon" />.</p>,
    strategy: (
      <p>Definisjon av selvinduktans: <InlineLatex latex="\varepsilon=-L\,dI/dt" />. Negativt fortegn betyr at EMF-en motvirker strømøkningen (Lenz).</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>L har enhet henry (H) = V·s/A. Sett inn tall direkte.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Selvinduktans">
          <p>Når strømmen i en spole endres, endres dens egen magnetiske fluks gjennom seg selv. Dette genererer en mot-EMF: <InlineLatex latex="\varepsilon=-L\,dI/dt" />. Induktor oppfører seg som en "treghet" mot endring i strøm.</p>
        </TheoryBox>
        <Step n={1} title="Sett inn verdier">
          <FormulaBox latex="|\varepsilon|=L\left|\dfrac{dI}{dt}\right|=0{,}260\cdot 0{,}0180" />
          <FormulaBox latex="\boxed{|\varepsilon|=4{,}68\times 10^{-3}\;\text{V}=4{,}68\;\text{mV}}" variant="gold" />
        </Step>
        <Step n={2} title="Retning">
          <p>Siden strømmen øker, motsetter EMF-en seg økningen — altså motsatt retning av strømmen. Induktoren "holder igjen" strømendringen.</p>
        </Step>
      </div>
    ),
    summary: (
      <p>Induktanser er tregheten i strømkretser — analogen til masse i mekanikk. Store induktanser motvirker raske strømendringer (brukes i filtre og strømforsyninger).</p>
    ),
  },

  // ==========================================================================
  // 29.25 — Beregn L for solenoide
  // ==========================================================================
  "29.25": {
    title: "Selvinduktans til solenoide",
    difficulty: "middels",
    pageRef: "s. 975",
    problem: (
      <p>
        En solenoide med <InlineLatex latex="N=300" /> vindinger, lengde <InlineLatex latex="\ell=0{,}120\;\text{m}" /> og
        tverrsnittsareal <InlineLatex latex="A=4{,}00\;\text{cm}^2" /> er fylt med luft. Finn selvinduktansen L.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="N=300" /></li>
        <li><InlineLatex latex="\ell=0{,}120\;\text{m}" /></li>
        <li><InlineLatex latex="A=4{,}00\times 10^{-4}\;\text{m}^2" /></li>
        <li><InlineLatex latex="\mu_0=4\pi\times 10^{-7}\;\text{T·m/A}" /></li>
      </ul>
    ),
    unknowns: <p>Selvinduktansen L.</p>,
    strategy: (
      <p>Inne i en solenoide er <InlineLatex latex="B=\mu_0 n I" /> med <InlineLatex latex="n=N/\ell" />. Fluks per vinding: <InlineLatex latex="\Phi=BA" />. Total fluks: <InlineLatex latex="N\Phi" />. Induktans: <InlineLatex latex="L=N\Phi/I=\mu_0 N^2 A/\ell" />.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Utled formelen: <InlineLatex latex="L=\mu_0 N^2 A/\ell" />. Sett deretter inn tall.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Solenoidens induktans">
          <p>Fra <InlineLatex latex="B=\mu_0 n I" /> og <InlineLatex latex="\Phi=BA" /> får man <InlineLatex latex="L=N\Phi/I=\mu_0 N^2 A/\ell" />. Legg merke til at L avhenger kun av geometri og kjernemateriale.</p>
        </TheoryBox>
        <Step n={1} title="Formel og innsetting">
          <FormulaBox latex="L=\dfrac{\mu_0 N^2 A}{\ell}=\dfrac{(4\pi\times 10^{-7})(300)^2(4{,}00\times 10^{-4})}{0{,}120}" />
        </Step>
        <Step n={2} title="Utregning">
          <FormulaBox latex="L=\dfrac{(1{,}257\times 10^{-6})(9{,}00\times 10^{4})(4{,}00\times 10^{-4})}{0{,}120}" />
          <FormulaBox latex="L=\dfrac{4{,}524\times 10^{-5}}{0{,}120}" />
          <FormulaBox latex="\boxed{L\approx 3{,}77\times 10^{-4}\;\text{H}=0{,}377\;\text{mH}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>Solenoidens induktans vokser som <InlineLatex latex="N^2" /> (ikke N!), fordi både fluksen per vinding og antallet vindinger som ser fluksen øker med N. Å fylle med jernkjerne øker L typisk 1000-fold.</p>
    ),
  },

  // ==========================================================================
  // 29.27 — Energi i induktor
  // ==========================================================================
  "29.27": {
    title: "Lagret magnetisk energi",
    difficulty: "lett",
    pageRef: "s. 977",
    problem: (
      <p>
        En induktor med <InlineLatex latex="L=2{,}50\;\text{H}" /> fører konstant strøm <InlineLatex latex="I=0{,}800\;\text{A}" />.
        Hvor mye magnetisk energi er lagret i induktoren?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="L=2{,}50\;\text{H}" /></li>
        <li><InlineLatex latex="I=0{,}800\;\text{A}" /></li>
      </ul>
    ),
    unknowns: <p>Magnetisk energi U.</p>,
    strategy: (
      <p>Energien lagret i en induktor er <InlineLatex latex="U=\tfrac{1}{2}L I^2" /> — analog med <InlineLatex latex="\tfrac{1}{2}mv^2" /> i mekanikk.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Sett inn direkte. Enhet: H·A² = J.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Magnetisk energi">
          <p>For å bygge opp strømmen I i induktoren må man gjøre arbeid mot mot-EMF. Integrering gir <InlineLatex latex="U=\tfrac{1}{2}L I^2" />. Energien er lagret i magnetfeltet selv, med energitetthet <InlineLatex latex="u=B^2/(2\mu_0)" />.</p>
        </TheoryBox>
        <Step n={1} title="Innsetting">
          <FormulaBox latex="U=\tfrac{1}{2}L I^2=\tfrac{1}{2}(2{,}50)(0{,}800)^2" />
          <FormulaBox latex="U=\tfrac{1}{2}(2{,}50)(0{,}640)=0{,}800\;\text{J}" />
          <FormulaBox latex="\boxed{U=0{,}800\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>Mekanisk analogi: induktor ↔ masse (treghet), strøm ↔ hastighet. Energien <InlineLatex latex="\tfrac{1}{2}L I^2" /> er perfekt analog til <InlineLatex latex="\tfrac{1}{2}mv^2" />.</p>
    ),
  },

  // ==========================================================================
  // 29.51 — Problem: R-L krets, transient
  // ==========================================================================
  "29.51": {
    title: "RL-krets ved påslag",
    difficulty: "vanskelig",
    pageRef: "s. 990",
    problem: (
      <div className="space-y-2">
        <p>
          En krets består av batteri <InlineLatex latex="\mathcal E=12{,}0\;\text{V}" /> i serie med motstand
          <InlineLatex latex="\;R=4{,}00\;\Omega" /> og induktor <InlineLatex latex="\;L=0{,}250\;\text{H}" />.
          Bryteren slås på ved <InlineLatex latex="t=0" />. Finn (a) endelig strøm, (b) tidskonstanten τ,
          (c) strømmen ved <InlineLatex latex="t=0{,}100\;\text{s}" />, og (d) energien lagret i induktoren i stabil tilstand.
        </p>
        <svg viewBox="0 0 260 120" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <line x1="30" y1="40" x2="30" y2="70" stroke="#374151" strokeWidth="2" />
          <line x1="25" y1="40" x2="35" y2="40" stroke="#374151" strokeWidth="3" />
          <line x1="20" y1="50" x2="40" y2="50" stroke="#374151" strokeWidth="2" />
          <line x1="25" y1="60" x2="35" y2="60" stroke="#374151" strokeWidth="3" />
          <line x1="20" y1="70" x2="40" y2="70" stroke="#374151" strokeWidth="2" />
          <text x="5" y="58" fontSize="10" fill="#374151">ε</text>
          <line x1="30" y1="30" x2="100" y2="30" stroke="#374151" strokeWidth="1.5" />
          <rect x="100" y="25" width="40" height="10" fill="none" stroke="#374151" strokeWidth="1.5" />
          <text x="110" y="22" fontSize="10" fill="#374151">R</text>
          <line x1="140" y1="30" x2="180" y2="30" stroke="#374151" strokeWidth="1.5" />
          <path d="M 180 30 q 5 -8 10 0 q 5 -8 10 0 q 5 -8 10 0 q 5 -8 10 0" fill="none" stroke="#374151" strokeWidth="1.5" />
          <text x="210" y="22" fontSize="10" fill="#374151">L</text>
          <line x1="220" y1="30" x2="230" y2="30" stroke="#374151" strokeWidth="1.5" />
          <line x1="230" y1="30" x2="230" y2="80" stroke="#374151" strokeWidth="1.5" />
          <line x1="230" y1="80" x2="30" y2="80" stroke="#374151" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\mathcal E=12{,}0\;\text{V}" /></li>
        <li><InlineLatex latex="R=4{,}00\;\Omega" /></li>
        <li><InlineLatex latex="L=0{,}250\;\text{H}" /></li>
        <li><InlineLatex latex="t=0{,}100\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="I_\infty" />, (b) τ, (c) <InlineLatex latex="I(0{,}100\;\text{s})" />, (d) U i stabil tilstand.</p>,
    strategy: (
      <p>Kirchhoffs spenningslov gir <InlineLatex latex="\mathcal E=IR+L\,dI/dt" />. Løsning: <InlineLatex latex="I(t)=(\mathcal E/R)(1-e^{-t/\tau})" /> med <InlineLatex latex="\tau=L/R" />.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Ved <InlineLatex latex="t\to\infty" /> er <InlineLatex latex="dI/dt=0" />, så <InlineLatex latex="I_\infty=\mathcal E/R" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Tidskonstant <InlineLatex latex="\tau=L/R" /> — etter τ har strømmen nådd ca. 63% av endelig verdi.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="RL-krets: oppbygging av strøm">
          <p>Når bryteren slås på, motsetter induktoren seg den raske strømendringen. Strømmen stiger eksponentielt mot <InlineLatex latex="\mathcal E/R" /> med tidskonstant <InlineLatex latex="\tau=L/R" />.</p>
        </TheoryBox>
        <Step n={1} title="(a) Endelig strøm">
          <FormulaBox latex="I_\infty=\dfrac{\mathcal E}{R}=\dfrac{12{,}0}{4{,}00}=3{,}00\;\text{A}" />
          <FormulaBox latex="\boxed{I_\infty=3{,}00\;\text{A}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tidskonstant">
          <FormulaBox latex="\tau=\dfrac{L}{R}=\dfrac{0{,}250}{4{,}00}=0{,}0625\;\text{s}" />
          <FormulaBox latex="\boxed{\tau=62{,}5\;\text{ms}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Strøm ved t = 0,100 s">
          <FormulaBox latex="I(t)=I_\infty\bigl(1-e^{-t/\tau}\bigr)" />
          <FormulaBox latex="t/\tau=0{,}100/0{,}0625=1{,}60" />
          <FormulaBox latex="I=3{,}00\cdot(1-e^{-1{,}60})=3{,}00\cdot(1-0{,}2019)" />
          <FormulaBox latex="\boxed{I\approx 2{,}39\;\text{A}}" variant="gold" />
        </Step>
        <Step n={4} title="(d) Lagret energi ved stabil tilstand">
          <FormulaBox latex="U=\tfrac{1}{2}L I_\infty^2=\tfrac{1}{2}(0{,}250)(3{,}00)^2=1{,}125\;\text{J}" />
          <FormulaBox latex="\boxed{U\approx 1{,}13\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>RL-kretsens tidskonstant <InlineLatex latex="\tau=L/R" /> angir hvor raskt strømmen stiger. Etter <InlineLatex latex="5\tau" /> er den over 99% av endelig verdi. Stor L → treg respons; liten R → treg respons.</p>
    ),
  },

  // ==========================================================================
  // 29.59 — Problem: stav trekkes ut av B-felt (energi)
  // ==========================================================================
  "29.59": {
    title: "Motional EMF — stav med masse og friksjon",
    difficulty: "vanskelig",
    pageRef: "s. 991",
    problem: (
      <div className="space-y-2">
        <p>
          En stav med masse <InlineLatex latex="m=0{,}400\;\text{kg}" />, lengde <InlineLatex latex="L=0{,}500\;\text{m}" /> og
          motstand <InlineLatex latex="R=0{,}800\;\Omega" /> hviler på to friksjonsfrie skinner i et uniformt magnetfelt
          <InlineLatex latex="\;B=0{,}600\;\text{T}" /> rettet vertikalt oppover gjennom sløyfeplanet. Skinnenes ender er
          kortsluttet. Staven blir gitt starthastighet <InlineLatex latex="v_0=4{,}00\;\text{m/s}" /> langs skinnene. Finn
          (a) starthastighet-EMF, (b) startstrøm, (c) den bremskraften som virker på staven i det øyeblikket, og
          (d) differensialligningen for <InlineLatex latex="v(t)" />, samt tidskonstanten.
        </p>
        <svg viewBox="0 0 280 140" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <line x1="40" y1="30" x2="240" y2="30" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="110" x2="240" y2="110" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="110" stroke="#374151" strokeWidth="2" />
          <line x1="140" y1="30" x2="140" y2="110" stroke="#ef4444" strokeWidth="3" />
          <text x="145" y="70" fontSize="10" fill="#ef4444">m, L</text>
          <line x1="140" y1="70" x2="200" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <text x="205" y="74" fontSize="10" fill="#10b981">v₀</text>
          {[{x:60,y:50},{x:90,y:50},{x:60,y:90},{x:90,y:90},{x:75,y:70}].map((p,i)=>(
            <g key={i}><circle cx={p.x} cy={p.y} r="2" fill="#3b82f6" /><circle cx={p.x} cy={p.y} r="5" fill="none" stroke="#3b82f6" /></g>
          ))}
          <text x="50" y="130" fontSize="10" fill="#3b82f6">B ut av siden</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=0{,}400\;\text{kg}" /></li>
        <li><InlineLatex latex="L=0{,}500\;\text{m}" /></li>
        <li><InlineLatex latex="R=0{,}800\;\Omega" /></li>
        <li><InlineLatex latex="B=0{,}600\;\text{T}" /></li>
        <li><InlineLatex latex="v_0=4{,}00\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="\varepsilon_0" />, (b) <InlineLatex latex="I_0" />, (c) <InlineLatex latex="F_0" />, (d) <InlineLatex latex="v(t)" /> og tidskonstant.</p>,
    strategy: (
      <p>Bruk <InlineLatex latex="\varepsilon=BLv" />, <InlineLatex latex="I=\varepsilon/R" />, <InlineLatex latex="F=BIL" />. Newton 2: <InlineLatex latex="m\,dv/dt=-F" />. Dette gir en eksponentiell avklingning.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Startverdier: sett inn <InlineLatex latex="v_0" /> i <InlineLatex latex="\varepsilon=BLv" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Bremskraften på staven er <InlineLatex latex="F=BIL=B^2L^2 v/R" /> — proporsjonal med v. Dette gir førsteordens ODE.</p>,
      },
      {
        label: "Hint 3",
        content: <p>Løsningen blir <InlineLatex latex="v(t)=v_0 e^{-t/\tau}" /> med <InlineLatex latex="\tau=mR/(B^2L^2)" />.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Induktiv bremsing">
          <p>Uten ytre drivkraft dissiperes kinetisk energi til varme i motstanden via <InlineLatex latex="I^2R" />. Staven bremser eksponentielt — en klassisk "magnetisk brems" (brukes i tog og elevatorer).</p>
        </TheoryBox>
        <Step n={1} title="(a) Starthastighet-EMF">
          <FormulaBox latex="\varepsilon_0=BLv_0=0{,}600\cdot 0{,}500\cdot 4{,}00=1{,}20\;\text{V}" />
          <FormulaBox latex="\boxed{\varepsilon_0=1{,}20\;\text{V}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Startstrøm">
          <FormulaBox latex="I_0=\dfrac{\varepsilon_0}{R}=\dfrac{1{,}20}{0{,}800}=1{,}50\;\text{A}" />
          <FormulaBox latex="\boxed{I_0=1{,}50\;\text{A}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Startbremskraft">
          <FormulaBox latex="F_0=BI_0 L=0{,}600\cdot 1{,}50\cdot 0{,}500=0{,}450\;\text{N}" />
          <FormulaBox latex="\boxed{F_0=0{,}450\;\text{N}}" variant="gold" />
        </Step>
        <Step n={4} title="(d) Differensialligning og tidskonstant">
          <p>Newton 2:</p>
          <FormulaBox latex="m\dfrac{dv}{dt}=-F=-BIL=-\dfrac{B^2L^2}{R}v" />
          <p>Førsteordens lineær ODE med løsning <InlineLatex latex="v(t)=v_0 e^{-t/\tau}" />, hvor</p>
          <FormulaBox latex="\tau=\dfrac{mR}{B^2L^2}=\dfrac{0{,}400\cdot 0{,}800}{(0{,}600)^2(0{,}500)^2}" />
          <FormulaBox latex="\tau=\dfrac{0{,}320}{0{,}0900}\approx 3{,}56\;\text{s}" />
          <FormulaBox latex="\boxed{\tau\approx 3{,}56\;\text{s}}" variant="gold" />
        </Step>
        <Step n={5} title="Sjekk energibevaring">
          <p>Kinetisk startenergi: <InlineLatex latex="K_0=\tfrac{1}{2}mv_0^2=\tfrac{1}{2}(0{,}400)(4{,}00)^2=3{,}20\;\text{J}" />.</p>
          <p>Total dissipert energi (integral av <InlineLatex latex="I^2R" /> over tid): også 3,20 J. All kinetisk energi går til varme. ✓</p>
        </Step>
      </div>
    ),
    summary: (
      <p>Dette er en praktisk anvendelse: kollokvenesterke elektromagnetiske bremser på tog og heiser. Bremskraften er proporsjonal med fart — stor effekt ved høy fart, mild stopp. Tidskonstanten skalerer med masse og omvendt med <InlineLatex latex="B^2L^2/R" />.</p>
    ),
  },
};
