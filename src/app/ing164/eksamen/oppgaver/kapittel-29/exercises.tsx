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

function Pitfall({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-1">
        Vanlig feil
      </p>
      <div className="text-sm text-amber-900 dark:text-amber-100">{children}</div>
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
  // 29.1 — Faradays lov + Ohms lov i én sløyfe
  // ==========================================================================
  "29.1": {
    title: "Indusert EMF og strøm i sløyfe med avtagende felt",
    difficulty: "lett",
    pageRef: "s. 1008",
    problem: (
      <div className="space-y-2">
        <p>
          En enkelt sløyfe med areal <InlineLatex latex="A=0{,}0900\;\text{m}^2" /> ligger i et uniformt magnetfelt
          som har startverdi <InlineLatex latex="B=3{,}80\;\text{T}" /> vinkelrett på sløyfeplanet, og som avtar med
          konstant rate <InlineLatex latex="0{,}190\;\text{T/s}" />. (a) Hva er indusert EMF i sløyfen?
          (b) Hvis sløyfen har resistans <InlineLatex latex="R=0{,}600\;\Omega" />, finn strømmen i sløyfen.
        </p>
        <svg viewBox="0 0 260 140" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <rect x="80" y="35" width="100" height="70" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="180" y="30" fontSize="10" fill="#ef4444">A = 0,0900 m²</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={100 + i * 18} cy="70" r="2" fill="#3b82f6" />
              <circle cx={100 + i * 18} cy="70" r="5" fill="none" stroke="#3b82f6" />
            </g>
          ))}
          <text x="80" y="130" fontSize="10" fill="#3b82f6">B vinkelrett på sløyfen, avtagende</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="A=0{,}0900\;\text{m}^2" /></li>
        <li><InlineLatex latex="B_0=3{,}80\;\text{T}" /> (startverdi, ikke nødvendig for utregningen)</li>
        <li><InlineLatex latex="dB/dt=-0{,}190\;\text{T/s}" /> (avtagende, derav minus)</li>
        <li><InlineLatex latex="R=0{,}600\;\Omega" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Indusert EMF <InlineLatex latex="\varepsilon" /></li>
        <li>(b) Strøm <InlineLatex latex="I" /> i sløyfen</li>
      </ul>
    ),
    strategy: (
      <p>
        Faradays lov gir <InlineLatex latex="\varepsilon=-d\Phi_B/dt" />. Med konstant areal og <InlineLatex latex="\vec B" /> vinkelrett på sløyfen er <InlineLatex latex="\Phi_B=BA" />, så <InlineLatex latex="|\varepsilon|=A\,|dB/dt|" />. Strømmen får vi deretter fra Ohms lov: <InlineLatex latex="I=\varepsilon/R" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Arealet er allerede gitt som tall — du trenger ikke radius. Sett rett inn <InlineLatex latex="|\varepsilon|=A\,|dB/dt|" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Når feltet avtar lineært, er momentan derivert lik konstant <InlineLatex latex="dB/dt" />. EMF blir konstant i tid.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Faradays lov — størrelsen alene">
          <p>
            Faradays induksjonslov sier at EMF rundt en lukket sløyfe er minus tidsderivert av magnetisk fluks gjennom sløyfen:
          </p>
          <FormulaBox latex="\varepsilon=-\dfrac{d\Phi_B}{dt},\quad \Phi_B=\int\vec B\cdot d\vec A" variant="blue" />
          <p>
            Når <InlineLatex latex="\vec B" /> er uniformt og vinkelrett på en flat sløyfe, blir prikkproduktet bare <InlineLatex latex="BA" />, og siden <InlineLatex latex="A" /> er konstant her, kan vi flytte den ut av deriverende:
          </p>
          <FormulaBox latex="|\varepsilon|=A\left|\dfrac{dB}{dt}\right|" variant="blue" />
          <p>
            Minustegnet er Lenz&apos; lov, og forteller bare at indusert strøm prøver å motvirke endringen. Vi tar absoluttverdien for å få selve <em>størrelsen</em> av EMF.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Indusert EMF">
          <p>Sett inn <InlineLatex latex="A=0{,}0900\;\text{m}^2" /> og <InlineLatex latex="|dB/dt|=0{,}190\;\text{T/s}" />:</p>
          <FormulaBox latex="|\varepsilon|=A\left|\dfrac{dB}{dt}\right|=0{,}0900\cdot 0{,}190" />
          <FormulaBox latex="\boxed{|\varepsilon|=0{,}0171\;\text{V}=17{,}1\;\text{mV}}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="\text{m}^2\cdot\text{T/s}=\text{Wb/s}=\text{V}" />. ✓
          </p>
        </Step>
        <Step n={2} title="(b) Strøm i sløyfen — Ohms lov">
          <p>EMF-en driver strøm gjennom sløyfens egen resistans:</p>
          <FormulaBox latex="I=\dfrac{|\varepsilon|}{R}=\dfrac{0{,}0171}{0{,}600}" />
          <FormulaBox latex="\boxed{I=0{,}0285\;\text{A}=28{,}5\;\text{mA}}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>Ikke bruk B = 3,80 T direkte!</strong> Startverdien til B sier ingenting om EMF-en, fordi det er <em>endringen</em> i feltet som induserer spenning, ikke verdien selv. Et statisk felt på 100 T gir ingen EMF; et felt på 0,01 T som endrer seg raskt gir mye EMF.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: så lenge feltet avtar med konstant rate, har sløyfen en konstant EMF og en konstant strøm. Den lagrede magnetiske energien i området forsvinner ikke uten videre — den dissiperes som varme i sløyfemotstanden via <InlineLatex latex="P=I^2R\approx 0{,}49\;\text{mW}" />.
        </p>
      </div>
    ),
    summary: (
      <p>EMF avhenger kun av <em>endringen</em> i fluks, ikke av selve verdien. Med konstant <InlineLatex latex="dB/dt" /> og konstant <InlineLatex latex="A" /> får man konstant EMF og dermed konstant likestrøm i sløyfen.</p>
    ),
  },

  // ==========================================================================
  // 29.6 — Tidsavhengig B (polynom), spole med N vindinger
  // ==========================================================================
  "29.6": {
    title: "EMF og strøm fra tidsavhengig magnetfelt",
    difficulty: "middels",
    pageRef: "s. 1008",
    problem: (
      <p>
        En spole med radius <InlineLatex latex="r=4{,}00\;\text{cm}" /> og <InlineLatex latex="N=500" /> vindinger ligger i
        et uniformt magnetfelt som varierer med tiden ifølge <InlineLatex latex="B=(0{,}0120\;\text{T/s})\,t+(3{,}00\times 10^{-5}\;\text{T/s}^4)\,t^4" />.
        Spolen er koblet til en motstand <InlineLatex latex="R=600\;\Omega" />, og sløyfeplanet er vinkelrett på feltet.
        Spolens egenresistans kan ses bort fra. (a) Finn størrelsen av indusert EMF som funksjon av tid.
        (b) Hva er strømmen i motstanden ved <InlineLatex latex="t=5{,}00\;\text{s}" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="r=0{,}0400\;\text{m}" /></li>
        <li><InlineLatex latex="N=500" /></li>
        <li><InlineLatex latex="B(t)=0{,}0120\,t+3{,}00\times 10^{-5}\,t^4" /> [T]</li>
        <li><InlineLatex latex="R=600\;\Omega" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) <InlineLatex latex="|\varepsilon(t)|" /></li>
        <li>(b) <InlineLatex latex="I" /> ved <InlineLatex latex="t=5{,}00\;\text{s}" /></li>
      </ul>
    ),
    strategy: (
      <p>
        For en spole med N vindinger gir Faradays lov <InlineLatex latex="\varepsilon=-N\,d\Phi_B/dt=-NA\,dB/dt" />. Deriver
        uttrykket for <InlineLatex latex="B(t)" /> for å få <InlineLatex latex="dB/dt" />, sett inn tall ved <InlineLatex latex="t=5{,}00\;\text{s}" />, og bruk Ohms lov for strømmen.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Areal: <InlineLatex latex="A=\pi r^2" />. Derivasjon: <InlineLatex latex="d(at+bt^4)/dt=a+4bt^3" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Sløyfens egenresistans neglisjeres, så hele EMF-en faller over <InlineLatex latex="R" />: <InlineLatex latex="I=\varepsilon/R" />.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Polynom i tid — derivasjon ledd for ledd">
          <p>
            Når feltet er gitt som en eksplisitt funksjon <InlineLatex latex="B(t)" />, er strategien rett frem: deriver, sett inn i Faraday, multipliser med areal og antall vindinger:
          </p>
          <FormulaBox latex="\varepsilon(t)=-N A\,\dfrac{dB(t)}{dt}" variant="blue" />
          <p>
            For <InlineLatex latex="B=at+bt^4" /> blir <InlineLatex latex="dB/dt=a+4bt^3" /> — første leddet (lineært) gir konstant bidrag, mens fjerdegrads leddet vokser kraftig med tiden.
          </p>
        </TheoryBox>
        <Step n={1} title="Areal og forhåndsberegning">
          <p>Sirkulært tverrsnitt:</p>
          <FormulaBox latex="A=\pi r^2=\pi(0{,}0400)^2=5{,}027\times 10^{-3}\;\text{m}^2" />
          <p>Forhåndsfaktor som dukker opp i alle uttrykk:</p>
          <FormulaBox latex="NA=500\cdot 5{,}027\times 10^{-3}=2{,}513\;\text{m}^2" />
        </Step>
        <Step n={2} title="(a) EMF som funksjon av tid">
          <p>Deriver <InlineLatex latex="B(t)" /> ledd for ledd:</p>
          <FormulaBox latex="\dfrac{dB}{dt}=0{,}0120+4\cdot 3{,}00\times 10^{-5}\,t^3=0{,}0120+1{,}20\times 10^{-4}\,t^3\;[\text{T/s}]" />
          <p>Sett inn i Faraday med N vindinger:</p>
          <FormulaBox latex="|\varepsilon(t)|=NA\left|\dfrac{dB}{dt}\right|=2{,}513\bigl(0{,}0120+1{,}20\times 10^{-4}\,t^3\bigr)" />
          <FormulaBox latex="\boxed{|\varepsilon(t)|=0{,}03016+3{,}016\times 10^{-4}\,t^3\;\;[\text{V}]}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Strøm ved t = 5,00 s">
          <p>Sett inn <InlineLatex latex="t=5{,}00\;\text{s}" /> (slik at <InlineLatex latex="t^3=125" />):</p>
          <FormulaBox latex="|\varepsilon(5)|=0{,}03016+3{,}016\times 10^{-4}\cdot 125=0{,}03016+0{,}03770=0{,}0679\;\text{V}" />
          <p>Med Ohms lov, og siden spolens egenresistans neglisjeres:</p>
          <FormulaBox latex="I=\dfrac{|\varepsilon|}{R}=\dfrac{0{,}0679}{600}" />
          <FormulaBox latex="\boxed{I\approx 1{,}13\times 10^{-4}\;\text{A}=113\;\mu\text{A}}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>Ikke regn ut <InlineLatex latex="\varepsilon" /> ved kun å sette inn <InlineLatex latex="B(5)" /> i en formel.</strong> Faraday krever <em>raten</em> <InlineLatex latex="dB/dt" />, ikke verdien <InlineLatex latex="B" />. Glemmer du å derivere først, får du komplett feil svar.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: ved små tider dominerer det lineære leddet, og EMF-en er omtrent konstant 30 mV. Etter hvert som <InlineLatex latex="t^3" />-bidraget vokser, øker EMF-en raskt. Ved <InlineLatex latex="t=5\;\text{s}" /> har de to leddene samme størrelse — fjerdegrads leddet tar over for store t.
        </p>
      </div>
    ),
    summary: (
      <p>Når feltet er en eksplisitt funksjon av tid, er nøkkelen å derivere riktig — ikke bruke verdien. Polynomielle felt deriveres ledd for ledd.</p>
    ),
  },

  // ==========================================================================
  // 29.8 — Eksponentielt avtagende B, sløyfe i 60° vinkel
  // ==========================================================================
  "29.8": {
    title: "Eksponentielt avtagende felt, sløyfe i vinkel",
    difficulty: "vanskelig",
    pageRef: "s. 1008",
    problem: (
      <div className="space-y-2">
        <p>
          En flat, sirkulær stålløkke med radius <InlineLatex latex="r=75\;\text{cm}" /> ligger i ro i et uniformt magnetfelt
          som vist i kantsynet i Fig. E29.8. Feltet endrer seg med tiden ifølge
          <InlineLatex latex="\;B(t)=(1{,}4\;\text{T})\,e^{-(0{,}057\;\text{s}^{-1})t}" />, og <InlineLatex latex="\vec B" /> danner en
          vinkel på <InlineLatex latex="60^\circ" /> med sløyfens plan. (a) Finn EMF som funksjon av tid.
          (b) Når er indusert EMF lik <InlineLatex latex="1/10" /> av startverdien? (c) Finn retningen til
          den induserte strømmen, sett ovenfra.
        </p>
        <svg viewBox="0 0 260 140" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <line x1="40" y1="80" x2="220" y2="80" stroke="#ef4444" strokeWidth="3" />
          <text x="100" y="100" fontSize="10" fill="#ef4444">sløyfe (kantsynet)</text>
          <line x1="200" y1="40" x2="130" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k29)" />
          <text x="200" y="35" fontSize="10" fill="#3b82f6">B</text>
          <path d="M 175 80 A 25 25 0 0 0 165 60" fill="none" stroke="#6b7280" strokeWidth="1" />
          <text x="172" y="68" fontSize="9" fill="#6b7280">60°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="r=0{,}75\;\text{m}" /></li>
        <li><InlineLatex latex="B(t)=1{,}4\,e^{-0{,}057\,t}" /> [T]</li>
        <li>Vinkel mellom <InlineLatex latex="\vec B" /> og sløyfeplanet: <InlineLatex latex="60^\circ" /> ⇒ vinkel mot normal er <InlineLatex latex="\phi=30^\circ" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) <InlineLatex latex="\varepsilon(t)" /></li>
        <li>(b) Tiden <InlineLatex latex="t_{1/10}" /> der <InlineLatex latex="\varepsilon=\varepsilon_0/10" /></li>
        <li>(c) Retning på indusert strøm sett ovenfra</li>
      </ul>
    ),
    strategy: (
      <p>
        Fluksen er <InlineLatex latex="\Phi_B=BA\cos\phi" /> der <InlineLatex latex="\phi" /> er vinkelen mellom <InlineLatex latex="\vec B" /> og normalen. Deriver eksponentielt B(t) — derivasjonen gir bare en faktor <InlineLatex latex="-k" /> tilbake. Lenz: når B avtar, induseres strøm som «opprettholder» fluks.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="d(e^{-kt})/dt=-k\,e^{-kt}" />. EMF-en blir også eksponentielt avtagende, med samme tidskonstant.</p>,
      },
      {
        label: "Hint 2",
        content: <p>For (b): løs <InlineLatex latex="e^{-kt}=1/10" /> ⇒ <InlineLatex latex="t=\ln(10)/k" />.</p>,
      },
      {
        label: "Hint 3",
        content: <p>For (c): når B avtar, må indusert B sustaine samme retning som B. Bruk høyrehåndsregel.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Skrå B — bare normalkomponenten teller">
          <p>
            Når <InlineLatex latex="\vec B" /> ikke står vinkelrett på sløyfeplanet, må vi projisere på normalen:
          </p>
          <FormulaBox latex="\Phi_B=\vec B\cdot\vec A=BA\cos\phi" variant="blue" />
          <p>
            Her er <InlineLatex latex="\phi" /> vinkelen mellom <InlineLatex latex="\vec B" /> og <em>normalen</em>. Fig. E29.8 viser <InlineLatex latex="60^\circ" /> mellom <InlineLatex latex="\vec B" /> og <em>sløyfens plan</em>, så vinkelen mot normalen er <InlineLatex latex="\phi=90^\circ-60^\circ=30^\circ" />, og <InlineLatex latex="\cos 30^\circ=\sqrt 3/2\approx 0{,}866" />.
          </p>
        </TheoryBox>
        <Step n={1} title="Areal og fluksuttrykk">
          <FormulaBox latex="A=\pi r^2=\pi(0{,}75)^2=1{,}767\;\text{m}^2" />
          <FormulaBox latex="\Phi_B(t)=B(t)\,A\cos 30^\circ=1{,}4\,e^{-0{,}057t}\cdot 1{,}767\cdot 0{,}866" />
          <FormulaBox latex="\Phi_B(t)=2{,}142\,e^{-0{,}057t}\;\text{Wb}" />
        </Step>
        <Step n={2} title="(a) EMF som funksjon av tid">
          <p>Deriver fluksen og bruk Faradays lov (én vinding):</p>
          <FormulaBox latex="\varepsilon(t)=-\dfrac{d\Phi_B}{dt}=-\bigl(-0{,}057\bigr)\cdot 2{,}142\,e^{-0{,}057t}" />
          <FormulaBox latex="\boxed{\varepsilon(t)=0{,}122\,e^{-0{,}057t}\;\text{V}}" variant="gold" />
          <p>
            Startverdien er <InlineLatex latex="\varepsilon_0=\varepsilon(0)=0{,}122\;\text{V}=122\;\text{mV}" />.
          </p>
        </Step>
        <Step n={3} title="(b) Når har EMF falt til 1/10?">
          <p>Krev at <InlineLatex latex="e^{-0{,}057\,t}=0{,}1" />, dvs. <InlineLatex latex="-0{,}057\,t=\ln(0{,}1)=-2{,}303" />:</p>
          <FormulaBox latex="t=\dfrac{2{,}303}{0{,}057}\approx 40{,}4\;\text{s}" />
          <FormulaBox latex="\boxed{t\approx 40{,}4\;\text{s}}" variant="gold" />
        </Step>
        <Step n={4} title="(c) Retning av indusert strøm">
          <p>
            Feltet avtar, så fluksen avtar. Lenz: indusert strøm prøver å <em>opprettholde</em> fluksen, dvs. lage et indusert B i samme retning som ytre B (komponent ut av sløyfeplanet i samme retning som ytre).
          </p>
          <p>
            Sett ovenfra: ytre B har komponent oppover gjennom sløyfen (siden den gjør 60° med planet og lener seg ut). Indusert B må også peke oppover gjennom sløyfen. Med høyrehåndsregel (tomlen opp) krøller fingrene <em>mot urviseren</em>:
          </p>
          <FormulaBox latex="\boxed{\text{strømmen flyter mot urviseren sett ovenfra}}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>Ikke bruk vinkelen 60° direkte i <InlineLatex latex="\cos\phi" /></strong>. Figuren angir vinkelen mellom <InlineLatex latex="\vec B" /> og <em>sløyfeplanet</em>; men i fluksformelen skal vi ha vinkelen mot <em>normalen</em>. Disse er komplementære. Riktig her: <InlineLatex latex="\cos 30^\circ" />, ikke <InlineLatex latex="\cos 60^\circ" />.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: en eksponentielt avtagende kilde (typisk for utlading av en stor elektromagnet) gir også eksponentielt avtagende EMF — med samme tidskonstant <InlineLatex latex="\tau=1/k\approx 17{,}5\;\text{s}" />. Etter ca. <InlineLatex latex="2{,}3\,\tau" /> har spenningen falt til 10 % av startverdien.
        </p>
      </div>
    ),
    summary: (
      <p>Eksponentielt B gir eksponentielt EMF med samme tidskonstant. Vinkelregningen krever at man bruker normalvinkelen <InlineLatex latex="\phi" />, ikke planvinkelen. Lenz gir retningen kvalitativt.</p>
    ),
  },

  // ==========================================================================
  // 29.13 — Vinkelhastighet i kvadratisk generatorspole
  // ==========================================================================
  "29.13": {
    title: "Vinkelhastighet for kvadratisk generator",
    difficulty: "middels",
    pageRef: "s. 1008",
    problem: (
      <p>
        Ankeret i en liten generator består av en flat, kvadratisk spole med <InlineLatex latex="N=120" /> vindinger og
        sider <InlineLatex latex="L=1{,}60\;\text{cm}" />. Spolen roterer i et magnetfelt på
        <InlineLatex latex="\;B=0{,}0750\;\text{T}" />. Hva er vinkelhastigheten <InlineLatex latex="\omega" /> til spolen
        hvis den maksimale induserte EMF er <InlineLatex latex="\varepsilon_{\max}=24{,}0\;\text{mV}" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="N=120" /></li>
        <li><InlineLatex latex="L=0{,}0160\;\text{m}" /> ⇒ <InlineLatex latex="A=L^2=2{,}56\times 10^{-4}\;\text{m}^2" /></li>
        <li><InlineLatex latex="B=0{,}0750\;\text{T}" /></li>
        <li><InlineLatex latex="\varepsilon_{\max}=0{,}0240\;\text{V}" /></li>
      </ul>
    ),
    unknowns: <p>Vinkelhastighet <InlineLatex latex="\omega" />.</p>,
    strategy: (
      <p>For en spole som roterer i uniformt B er <InlineLatex latex="\varepsilon_{\max}=NBA\omega" />. Løs for <InlineLatex latex="\omega" />.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Maksimal EMF oppstår når sløyfens plan er parallelt med <InlineLatex latex="\vec B" /> — der er fluksen null, men endringsraten størst.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Roterende spole — sinusformet EMF">
          <p>
            For en spole med N vindinger og areal A som roterer med <InlineLatex latex="\omega" /> rundt en akse vinkelrett på <InlineLatex latex="\vec B" />, blir fluksen:
          </p>
          <FormulaBox latex="\Phi_B(t)=BA\cos(\omega t)" variant="blue" />
          <p>EMF blir tidsderivert ganget med N (vindinger i serie):</p>
          <FormulaBox latex="\varepsilon(t)=-N\,d\Phi_B/dt=NBA\omega\sin(\omega t)" variant="blue" />
          <p>Amplituden er det maksimale:</p>
          <FormulaBox latex="\varepsilon_{\max}=NBA\omega" variant="blue" />
        </TheoryBox>
        <Step n={1} title="Areal av kvadratisk spole">
          <FormulaBox latex="A=L^2=(0{,}0160)^2=2{,}56\times 10^{-4}\;\text{m}^2" />
        </Step>
        <Step n={2} title="Løs for ω">
          <p>Omform <InlineLatex latex="\varepsilon_{\max}=NBA\omega" />:</p>
          <FormulaBox latex="\omega=\dfrac{\varepsilon_{\max}}{NBA}=\dfrac{0{,}0240}{120\cdot 0{,}0750\cdot 2{,}56\times 10^{-4}}" />
          <FormulaBox latex="\omega=\dfrac{0{,}0240}{2{,}304\times 10^{-3}}" />
          <FormulaBox latex="\boxed{\omega\approx 10{,}4\;\text{rad/s}}" variant="gold" />
          <p>
            Tilsvarende frekvens: <InlineLatex latex="f=\omega/(2\pi)\approx 1{,}66\;\text{Hz}" /> (omtrent 100 omdreininger i minuttet).
          </p>
        </Step>
        <Pitfall>
          <strong>Ikke glem N i nevneren.</strong> Med 120 vindinger i serie blir EMF 120 ganger større enn for én vinding ved samme <InlineLatex latex="\omega" />. Glemmer man N, får man et svar som er 120 ganger for høyt.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: for å få mer EMF kan man øke <em>fire</em> ting: N (flere vindinger), B (sterkere felt), A (større areal) eller <InlineLatex latex="\omega" /> (raskere rotasjon). I praksis er N og B de billigste å skalere — derfor har generatorer hundrevis av vindinger og ferromagnetiske ankere som forsterker B.
        </p>
      </div>
    ),
    summary: (
      <p>Maksimal EMF i roterende spole er <InlineLatex latex="\varepsilon_{\max}=NBA\omega" />. Dette er prinsippet bak alle vekselstrømgeneratorer.</p>
    ),
  },

  // ==========================================================================
  // 29.15 — Lenz' lov: tre kvalitative tilfeller
  // ==========================================================================
  "29.15": {
    title: "Retning av indusert strøm — Lenz i tre situasjoner",
    difficulty: "lett",
    pageRef: "s. 1008",
    problem: (
      <div className="space-y-2">
        <p>
          En sirkulær lederløkke ligger i et område med uniformt magnetfelt, som vist i Fig. E29.15. Magnetfeltet er rettet
          inn i sidens plan. Bestem retningen (med eller mot urviseren) til den induserte strømmen i sløyfen når
          (a) <InlineLatex latex="B" /> øker, (b) <InlineLatex latex="B" /> avtar, og (c) <InlineLatex latex="B" /> er
          konstant med verdi <InlineLatex latex="B_0" />. Begrunn svaret.
        </p>
        <svg viewBox="0 0 200 140" className="w-full max-w-xs mx-auto">
          <circle cx="100" cy="70" r="42" fill="none" stroke="#374151" strokeWidth="2" />
          {[{x:80,y:55},{x:120,y:55},{x:80,y:85},{x:120,y:85},{x:100,y:70}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <text x="65" y="130" fontSize="10" fill="#3b82f6">B inn i siden (10,0 cm)</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Sirkulær sløyfe (radius 10,0 cm — ikke nødvendig for retning)</li>
        <li>B rettet inn i siden</li>
      </ul>
    ),
    unknowns: <p>Retning av indusert strøm i hvert av de tre tilfellene.</p>,
    strategy: (
      <p>
        Lenz: indusert strøm motvirker endringen i fluks. Avgjør i hver case om fluksen øker, minker eller er konstant. Bruk høyrehåndsregelen for å oversette ønsket indusert B-retning til strømretning.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Kun <em>endringer</em> i fluks gir EMF — konstant B gir 0.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Indusert B inne i sløyfen skal peke <em>motsatt</em> av endringen, ikke motsatt av selve <InlineLatex latex="\vec B" />.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Lenz' lov i tre steg">
          <ol className="list-decimal pl-5 space-y-0.5">
            <li>Hvilken retning har <em>ytre</em> <InlineLatex latex="\vec B" />, og hva slags endring (øker/avtar/konstant)?</li>
            <li>I hvilken retning må <em>indusert</em> <InlineLatex latex="\vec B" /> peke for å motvirke endringen?</li>
            <li>Bruk høyrehåndsregelen til å finne strømretningen som gir den ønskede induserte <InlineLatex latex="\vec B" /> inne i sløyfen.</li>
          </ol>
          <p>
            Husk regelen: tomlen i retning av indusert <InlineLatex latex="\vec B" />, fingrene krøller med strømmen.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) B inn, økende">
          <p>
            Ytre fluks er inn i siden og <em>øker</em>. Indusert B må peke <em>ut av siden</em> for å motvirke økningen. Tomlen ut av siden ⇒ fingrene mot urviseren:
          </p>
          <FormulaBox latex="\boxed{\text{strømmen flyter mot urviseren}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) B inn, avtagende">
          <p>
            Ytre fluks er inn i siden og <em>avtar</em>. Indusert B må peke <em>inn i siden</em> for å støtte den avtagende fluksen. Tomlen inn i siden ⇒ fingrene med urviseren:
          </p>
          <FormulaBox latex="\boxed{\text{strømmen flyter med urviseren}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) B konstant">
          <p>Ingen flukses­endring ⇒ ingen EMF ⇒ ingen indusert strøm:</p>
          <FormulaBox latex="\boxed{I=0}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>Indusert B er ikke alltid motsatt ytre B.</strong> Hvis ytre B avtar, peker indusert B i <em>samme</em> retning som ytre B (for å støtte den avtagende fluksen). Lenz handler om å motvirke <em>endringen</em>, ikke verdien.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: når magneten omkring sløyfen endres, virker sløyfen som en «magnetisk treghet» som prøver å holde fluksen konstant. Hadde indusert strøm forsterket endringen, ville energi blitt skapt fra ingenting — det er Lenz som er energibevaringens vakt.
        </p>
      </div>
    ),
    summary: (
      <p>Tre-stegs Lenz: bestem retning på ytre B, hva endringen er, hva indusert B må gjøre, og bruk høyrehåndsregel for strømmen. Konstant B gir alltid <InlineLatex latex="I=0" />.</p>
    ),
  },

  // ==========================================================================
  // 29.19 — Lenz' lov: spolepar med bryter og kobling
  // ==========================================================================
  "29.19": {
    title: "Bryter og koblede spoler — Lenz i tre tilfeller",
    difficulty: "middels",
    pageRef: "s. 1009",
    problem: (
      <p>
        Bruk Lenz&apos; lov til å bestemme retningen til strømmen i motstanden <InlineLatex latex="ab" /> i Fig. E29.19 når
        (a) bryter <InlineLatex latex="S" /> åpnes etter å ha vært lukket lenge, (b) spole <InlineLatex latex="B" /> bringes
        nærmere spole <InlineLatex latex="A" /> med bryteren lukket, og (c) resistansen <InlineLatex latex="R" /> reduseres
        mens bryteren forblir lukket. Forklar hvordan du finner svaret.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Spole A: batteri, motstand R og bryter S i serie</li>
        <li>Spole B: lukket krets med motstand <InlineLatex latex="ab" /></li>
        <li>Spolene er aksialt orientert mot hverandre</li>
      </ul>
    ),
    unknowns: <p>Retning på strømmen gjennom motstand <InlineLatex latex="ab" /> (fra a til b eller fra b til a) i hver av de tre situasjonene.</p>,
    strategy: (
      <p>
        Avgjør i hvert tilfelle om strømmen <InlineLatex latex="I_A" /> i spole A øker eller avtar. Det bestemmer om fluksen gjennom B øker eller avtar. Lenz gir retningen til indusert strøm i B.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Bryter åpnes ⇒ <InlineLatex latex="I_A" /> faller raskt mot 0 ⇒ fluks i B avtar.</p>,
      },
      {
        label: "Hint 2",
        content: <p>B nærmere A ⇒ samme strøm i A, men sterkere kobling ⇒ fluks gjennom B øker.</p>,
      },
      {
        label: "Hint 3",
        content: <p>R reduseres ⇒ <InlineLatex latex="I_A=\mathcal E/R" /> øker ⇒ fluks gjennom B øker.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Gjensidig induktans — fluks fra A til B">
          <p>
            Strøm <InlineLatex latex="I_A" /> i spole A skaper et magnetfelt som penetrerer spole B. Den kobledede fluksen er proporsjonal med strømmen:
          </p>
          <FormulaBox latex="\Phi_{B\leftarrow A}=M\,I_A" variant="blue" />
          <p>der M er gjensidig induktans. Faradays lov anvendt på spole B:</p>
          <FormulaBox latex="\varepsilon_B=-M\,\dfrac{dI_A}{dt}-I_A\,\dfrac{dM}{dt}" variant="blue" />
          <p>
            Det første leddet beskriver endringer i strøm; det andre beskriver endringer i geometrisk kobling (avstand mellom spolene). Begge kan gi EMF, og Lenz brukes individuelt på hver effekt.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Bryter S åpnes">
          <p>
            Når S har vært lukket lenge, er <InlineLatex latex="I_A" /> stabil. Når S åpnes, kollapser <InlineLatex latex="I_A" /> raskt mot null. Fluksen <InlineLatex latex="\Phi_B" /> gjennom B avtar brått.
          </p>
          <p>
            Lenz: indusert strøm i B må prøve å <em>opprettholde</em> den fluksen som forsvinner — altså flyte i samme sirkulasjonsretning som <InlineLatex latex="I_A" /> hadde. Strømmen i motstanden <InlineLatex latex="ab" /> gir derfor en kort puls i retning <strong>fra b til a</strong> (samme retning som <InlineLatex latex="I_A" /> hadde).
          </p>
        </Step>
        <Step n={2} title="(b) Spole B bringes nærmere A">
          <p>
            Bryter er lukket, så <InlineLatex latex="I_A" /> er konstant, men M øker når avstanden minker (dM/dt &gt; 0). Fluksen <InlineLatex latex="\Phi_B=MI_A" /> øker.
          </p>
          <p>
            Lenz: indusert strøm i B må motvirke økningen — altså flyte motsatt av <InlineLatex latex="I_A" />. Gjennom motstand <InlineLatex latex="ab" /> går strømmen <strong>fra a til b</strong>.
          </p>
        </Step>
        <Step n={3} title="(c) R reduseres med S lukket">
          <p>
            Med konstant batteri og lukket krets: <InlineLatex latex="I_A=\mathcal E/R" />. Når R minker, øker <InlineLatex latex="I_A" />, så <InlineLatex latex="\Phi_B" /> øker.
          </p>
          <p>
            Som i (b) — Lenz krever motsatt sirkulasjon: gjennom <InlineLatex latex="ab" /> flyter strømmen <strong>fra a til b</strong>.
          </p>
        </Step>
        <Pitfall>
          <strong>Husk at strømmen i B varer kun mens noe endres.</strong> I tilfelle (a) er det en kort puls; så snart <InlineLatex latex="I_A=0" />, dør strømmen i B også. Et galvanometer ville registrert en utslag og deretter null.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: dette er nøyaktig prinsippet bak transformatorer. Med likestrøm gir kun bryterhandlinger eller geometriske endringer EMF i sekundærspolen. For kontinuerlig kobling brukes vekselstrøm, som garanterer <InlineLatex latex="dI_A/dt\neq 0" /> hele tiden.
        </p>
      </div>
    ),
    summary: (
      <p>Lenz på spolepar: spør om <InlineLatex latex="\Phi_B" /> øker eller avtar, og finn strøm­retning som motvirker. Strømmen finnes kun mens endringen pågår.</p>
    ),
  },

  // ==========================================================================
  // 29.22 — B(t) = at³ inn i sløyfe, finn I når B = 1.33 T
  // ==========================================================================
  "29.22": {
    title: "Strøm når B(t) = 0,380 t³ når 1,33 T",
    difficulty: "middels",
    pageRef: "s. 1009",
    problem: (
      <div className="space-y-2">
        <p>
          En sirkulær lederløkke med radius <InlineLatex latex="r=0{,}0250\;\text{m}" /> og resistans
          <InlineLatex latex="\;R=0{,}390\;\Omega" /> ligger i et område med uniformt magnetfelt rettet inn i sidens plan
          (Fig. E29.22). Ved <InlineLatex latex="t=0" /> er <InlineLatex latex="B=0" />. Magnetfeltet begynner deretter å øke
          ifølge <InlineLatex latex="B(t)=(0{,}380\;\text{T/s}^3)\,t^3" />. Hva er strømmen i sløyfen (størrelse og retning) i
          øyeblikket når <InlineLatex latex="B=1{,}33\;\text{T}" />?
        </p>
        <svg viewBox="0 0 220 140" className="w-full max-w-xs mx-auto">
          <Arrowheads />
          <circle cx="110" cy="70" r="38" fill="none" stroke="#ef4444" strokeWidth="2" />
          {[{x:90,y:55},{x:130,y:55},{x:90,y:85},{x:130,y:85},{x:110,y:70}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <text x="60" y="130" fontSize="10" fill="#3b82f6">B inn, vokser som t³</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="r=0{,}0250\;\text{m}" /> ⇒ <InlineLatex latex="A=\pi r^2=1{,}963\times 10^{-3}\;\text{m}^2" /></li>
        <li><InlineLatex latex="R=0{,}390\;\Omega" /></li>
        <li><InlineLatex latex="B(t)=0{,}380\,t^3" /> [T]</li>
        <li>Øyeblikket: <InlineLatex latex="B=1{,}33\;\text{T}" /></li>
      </ul>
    ),
    unknowns: <p>Strøm <InlineLatex latex="I" /> (størrelse og retning) i sløyfen ved dette øyeblikket.</p>,
    strategy: (
      <p>
        Finn først <InlineLatex latex="t" /> ved den gitte verdien <InlineLatex latex="B=1{,}33\;\text{T}" />. Beregn <InlineLatex latex="dB/dt=3\cdot 0{,}380\,t^2" /> ved samme <InlineLatex latex="t" />. EMF er <InlineLatex latex="A\,|dB/dt|" />, og strømmen <InlineLatex latex="I=\varepsilon/R" />. Lenz gir retning.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Fra <InlineLatex latex="B=at^3=1{,}33" /> finn <InlineLatex latex="t^3=B/a=3{,}5\;\text{s}^3" />, så <InlineLatex latex="t=1{,}518\;\text{s}" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>I stedet for å regne <InlineLatex latex="t^2" /> direkte, kan man bruke at <InlineLatex latex="dB/dt=3B/t" /> i dette tilfellet.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Hvorfor dB/dt = 3B/t for t³-vekst">
          <p>
            Når <InlineLatex latex="B=at^3" />, så er <InlineLatex latex="dB/dt=3at^2=3(at^3)/t=3B/t" />. Dette er en nyttig snarvei når vi kjenner B og t i samme øyeblikk — vi trenger ikke regne ut <InlineLatex latex="a t^2" /> eksplisitt.
          </p>
        </TheoryBox>
        <Step n={1} title="Finn tidspunktet t når B = 1,33 T">
          <FormulaBox latex="t^3=\dfrac{B}{a}=\dfrac{1{,}33}{0{,}380}=3{,}500\;\text{s}^3" />
          <FormulaBox latex="t=\sqrt[3]{3{,}500}=1{,}518\;\text{s}" />
        </Step>
        <Step n={2} title="Beregn dB/dt på samme tidspunkt">
          <FormulaBox latex="\dfrac{dB}{dt}=3a\,t^2=3\cdot 0{,}380\cdot (1{,}518)^2=3\cdot 0{,}380\cdot 2{,}304" />
          <FormulaBox latex="\dfrac{dB}{dt}=2{,}627\;\text{T/s}" />
        </Step>
        <Step n={3} title="EMF og strøm">
          <p>Sløyfens areal:</p>
          <FormulaBox latex="A=\pi(0{,}0250)^2=1{,}963\times 10^{-3}\;\text{m}^2" />
          <p>EMF (én vinding, B vinkelrett på sløyfeplanet):</p>
          <FormulaBox latex="|\varepsilon|=A\,\left|\dfrac{dB}{dt}\right|=1{,}963\times 10^{-3}\cdot 2{,}627=5{,}16\times 10^{-3}\;\text{V}" />
          <p>Ohms lov:</p>
          <FormulaBox latex="I=\dfrac{|\varepsilon|}{R}=\dfrac{5{,}16\times 10^{-3}}{0{,}390}" />
          <FormulaBox latex="\boxed{I\approx 1{,}32\times 10^{-2}\;\text{A}=13{,}2\;\text{mA}}" variant="gold" />
        </Step>
        <Step n={4} title="Retning">
          <p>
            B inn i siden og <em>øker</em>. Lenz: indusert B må peke <em>ut av siden</em> inne i sløyfen. Med høyrehåndsregel (tomlen ut, fingrene krøller) ⇒ strøm <strong>mot urviseren</strong> sett fra leseren.
          </p>
          <FormulaBox latex="\boxed{\text{strøm mot urviseren}}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>Ikke deriver <InlineLatex latex="B" />-verdien direkte.</strong> Faraday krever raten <InlineLatex latex="dB/dt" /> i akkurat det øyeblikket — ikke verdien <InlineLatex latex="B" /> selv. Med <InlineLatex latex="B\propto t^3" /> er raten <em>ikke</em> konstant; den endres som <InlineLatex latex="t^2" />.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: feltet vokser stadig raskere. Selv om B nettopp har nådd 1,33 T, øker det allerede med 2,63 T/s. EMF og strøm vil fortsette å øke kvadratisk i tiden så lenge <InlineLatex latex="t^3" />-loven gjelder.
        </p>
      </div>
    ),
    summary: (
      <p>For polynomielle <InlineLatex latex="B(t)" />: deriver først, sett inn <em>i etterkant</em>. Snarveien <InlineLatex latex="dB/dt=3B/t" /> for t³-vekst sparer aritmetikk.</p>
    ),
  },

  // ==========================================================================
  // 29.24 — Rektangulær løkke trekkes ut av B-felt
  // ==========================================================================
  "29.24": {
    title: "Magnetisk kraft på løkke som trekkes ut av felt",
    difficulty: "middels",
    pageRef: "s. 1009",
    problem: (
      <div className="space-y-2">
        <p>
          En rektangulær lederløkke med dimensjoner <InlineLatex latex="1{,}50\;\text{cm}" /> (vertikal) og
          <InlineLatex latex="\;8{,}00\;\text{cm}" /> (horisontal) og resistans <InlineLatex latex="R=0{,}600\;\Omega" />
          trekkes mot høyre ut av et område med uniformt magnetfelt. Magnetfeltet har størrelse
          <InlineLatex latex="\;B=2{,}40\;\text{T}" /> og er rettet inn i sidens plan i Fig. E29.24. I øyeblikket når
          sløyfens fart er <InlineLatex latex="v=3{,}00\;\text{m/s}" /> og den fortsatt er delvis i feltet — hvilken kraft
          (størrelse og retning) virker magnetfeltet på sløyfen?
        </p>
        <svg viewBox="0 0 320 120" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {[{x:30,y:40},{x:60,y:40},{x:90,y:40},{x:30,y:80},{x:60,y:80},{x:90,y:80}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <line x1="115" y1="20" x2="115" y2="100" stroke="#6b7280" strokeDasharray="3 3" />
          <text x="118" y="14" fontSize="9" fill="#6b7280">feltgrense</text>
          <rect x="80" y="50" width="160" height="20" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="130" y="46" fontSize="10" fill="#ef4444">8,00 cm</text>
          <text x="245" y="64" fontSize="10" fill="#ef4444">1,50 cm</text>
          <line x1="240" y1="60" x2="285" y2="60" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <text x="290" y="64" fontSize="10" fill="#10b981">v</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vertikal side <InlineLatex latex="L=0{,}0150\;\text{m}" /> (perpendikulært v)</li>
        <li>Horisontal lengde 8,00 cm (langs v)</li>
        <li><InlineLatex latex="R=0{,}600\;\Omega" /></li>
        <li><InlineLatex latex="B=2{,}40\;\text{T}" /> inn i siden</li>
        <li><InlineLatex latex="v=3{,}00\;\text{m/s}" /> mot høyre</li>
      </ul>
    ),
    unknowns: <p>Magnetisk kraft <InlineLatex latex="\vec F" /> på løkken (størrelse og retning).</p>,
    strategy: (
      <p>
        Bare den delen av sløyfen som ennå er i feltet «ser» magnetfeltet. EMF kommer fra den vertikale siden inne i feltet: <InlineLatex latex="\varepsilon=BLv" />. Strøm <InlineLatex latex="I=\varepsilon/R" />. Magnetisk kraft på den samme siden: <InlineLatex latex="F=BIL" />. Lenz gir retningen.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Det er bare den vertikale siden av løkken som er <em>inne i feltet</em> som bidrar — den horisontale lengden 8 cm forsvinner ut av regnestykket.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Lenz: kraften virker <em>mot</em> bevegelsen. Sløyfens fluks (inn i siden) avtar; indusert strøm sustainer fluksen.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Hvorfor bare én side teller">
          <p>
            Lorentz-kraften <InlineLatex latex="qv\times B" /> driver ladninger langs <em>vertikal</em> retning (når <InlineLatex latex="\vec v" /> er horisontal og <InlineLatex latex="\vec B" /> er inn i siden). I:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><strong>Venstre vertikal side</strong> (inne i feltet): EMF-bidrag <InlineLatex latex="BLv" />, driver ladninger oppover.</li>
            <li><strong>Høyre vertikal side</strong> (utenfor feltet): <InlineLatex latex="\vec B=0" /> ⇒ ingen EMF.</li>
            <li><strong>Topp/bunn (horisontale) sider</strong>: kraft på ladninger er vinkelrett på ledningen ⇒ ingen drivende EMF langs ledningen.</li>
          </ul>
          <p>Total EMF: <InlineLatex latex="\varepsilon=BLv" /> hvor L er den <em>vertikale</em> dimensjonen.</p>
        </TheoryBox>
        <Step n={1} title="EMF i venstre vertikalside (inne i feltet)">
          <FormulaBox latex="\varepsilon=BLv=2{,}40\cdot 0{,}0150\cdot 3{,}00=0{,}108\;\text{V}" />
        </Step>
        <Step n={2} title="Strøm via Ohms lov">
          <FormulaBox latex="I=\dfrac{\varepsilon}{R}=\dfrac{0{,}108}{0{,}600}=0{,}180\;\text{A}" />
        </Step>
        <Step n={3} title="Kraft på den strømførende siden">
          <p>Magnetisk kraft på en strømførende leder med lengde L i felt B (når <InlineLatex latex="\vec L\perp\vec B" />):</p>
          <FormulaBox latex="F=BIL=2{,}40\cdot 0{,}180\cdot 0{,}0150" />
          <FormulaBox latex="\boxed{F\approx 6{,}48\times 10^{-3}\;\text{N}=6{,}48\;\text{mN}}" variant="gold" />
        </Step>
        <Step n={4} title="Retning via Lenz">
          <p>
            Når sløyfen trekkes mot høyre, minker arealet inne i feltet — fluksen (inn i siden) avtar. Indusert strøm må gjenopprette fluksen ⇒ flyte med urviseren sett fra leseren ⇒ strømmen i venstre vertikalside (inne i feltet) går <em>nedover</em>.
          </p>
          <p>Kraft på denne siden: <InlineLatex latex="\vec F=I\vec L\times\vec B" /> med strøm nedover og B inn i siden gir <strong>kraft mot venstre</strong> — altså mot bevegelsen, slik Lenz krever.</p>
          <FormulaBox latex="\boxed{\vec F\;\text{peker mot venstre}\;(\text{mot bevegelsen})}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>Bruk riktig L i formelen.</strong> Den relevante lengden er sidens <em>høyde</em> (vinkelrett på <InlineLatex latex="\vec v" />), ikke løkkens lengde langs bevegelsen. Med vertikal side 1,50 cm gir vi <InlineLatex latex="L=0{,}0150\;\text{m}" />. Bytter du om, blir svaret en faktor 5,33 av.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: en ytre kraft må derfor virke <em>mot høyre</em> for å holde farten konstant. Effekten <InlineLatex latex="P=Fv\approx 19{,}4\;\text{mW}" /> tilsvarer dissipasjonen <InlineLatex latex="I^2R=(0{,}180)^2\cdot 0{,}600=19{,}4\;\text{mW}" /> — energien går fra mekanisk arbeid til varme i sløyfemotstanden.
        </p>
      </div>
    ),
    summary: (
      <p>Bremse­kraften skalerer som <InlineLatex latex="B^2L^2v/R" />. Bare delen av sløyfen som krysser feltgrensen bidrar — derfor er det høyden L som teller, ikke totalt areal.</p>
    ),
  },

  // ==========================================================================
  // 29.25 — Bevegelses-EMF i stav: spenning, polaritet, E-felt
  // ==========================================================================
  "29.25": {
    title: "Bevegelses-EMF: spenning, polaritet, E-felt og spesialtilfeller",
    difficulty: "middels",
    pageRef: "s. 1009",
    problem: (
      <div className="space-y-2">
        <p>
          I Fig. E29.25 beveger en lederstav med lengde <InlineLatex latex="L=30{,}0\;\text{cm}" /> seg i et magnetfelt
          <InlineLatex latex="\;B=0{,}450\;\text{T}" /> rettet inn i sidens plan. Staven beveger seg med fart
          <InlineLatex latex="\;v=5{,}00\;\text{m/s}" /> i den viste retningen (mot høyre, vinkelrett på staven og B).
          (a) Hva er potensialforskjellen mellom endene av staven? (b) Hvilket punkt, <InlineLatex latex="a" /> eller
          <InlineLatex latex="\;b" />, har høyere potensial? (c) Når ladningene i staven er i likevekt — hva er
          størrelse og retning av det elektriske feltet i staven? (d) Når ladningene er i likevekt — hvilket punkt har
          overskudd av positiv ladning? (e) Hva er potensialforskjellen over staven hvis den i stedet beveger seg
          (i) parallelt med <InlineLatex latex="ab" /> og (ii) rett ut av siden?
        </p>
        <svg viewBox="0 0 280 160" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {[{x:50,y:40},{x:90,y:40},{x:50,y:80},{x:90,y:80},{x:50,y:120},{x:90,y:120}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <line x1="180" y1="40" x2="180" y2="120" stroke="#ef4444" strokeWidth="3" />
          <text x="186" y="40" fontSize="11" fill="#ef4444">a</text>
          <text x="186" y="125" fontSize="11" fill="#ef4444">b</text>
          <line x1="180" y1="80" x2="240" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <text x="245" y="84" fontSize="11" fill="#10b981">v</text>
          <text x="120" y="150" fontSize="10" fill="#3b82f6">B inn i siden</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="L=0{,}300\;\text{m}" /> (a oppe, b nede)</li>
        <li><InlineLatex latex="B=0{,}450\;\text{T}" /> inn i siden</li>
        <li><InlineLatex latex="v=5{,}00\;\text{m/s}" /> mot høyre</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) <InlineLatex latex="\Delta V" /></li>
        <li>(b) Hvilket punkt har høyere potensial</li>
        <li>(c) <InlineLatex latex="\vec E" /> (størrelse og retning) i likevekt</li>
        <li>(d) Hvilket punkt har positivt overskudd</li>
        <li>(e) <InlineLatex latex="\Delta V" /> i to spesialtilfeller</li>
      </ul>
    ),
    strategy: (
      <p>
        Staven har frie ladninger som opplever Lorentz-kraft <InlineLatex latex="q\vec v\times\vec B" />. Disse skyves mot én ende, og spenning bygges opp inntil et indre <InlineLatex latex="\vec E" />-felt balanserer Lorentz-kraften. Spenningsforskjellen er <InlineLatex latex="\varepsilon=BLv" />. Polariteten avgjøres av kryssproduktets retning.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="\vec v\times\vec B" /> med v mot høyre og B inn i siden ⇒ peker oppover (positiv ladning skyves mot a).</p>,
      },
      {
        label: "Hint 2",
        content: <p>I likevekt: <InlineLatex latex="qE+qv\times B=0" /> ⇒ <InlineLatex latex="E=vB" />, retning fra + til −, dvs. fra a til b (nedover).</p>,
      },
      {
        label: "Hint 3",
        content: <p>(e) Hvis <InlineLatex latex="\vec v\parallel\vec L" /> eller <InlineLatex latex="\vec v\parallel\vec B" />, blir <InlineLatex latex="(\vec v\times\vec B)\cdot d\vec\ell=0" /> ⇒ ingen EMF.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Bevegelses-EMF i en isolert stav (uten krets)">
          <p>
            Når en lederstav beveger seg gjennom B, virker Lorentz-kraften på frie ladninger og adskiller positive fra negative. Adskillelsen stopper når et innebygd <InlineLatex latex="\vec E" />-felt balanserer den magnetiske kraften:
          </p>
          <FormulaBox latex="qE=qvB\;\;\Rightarrow\;\;E=vB" variant="blue" />
          <p>Integrerer vi <InlineLatex latex="E" /> over stavens lengde, får vi spenningen mellom endene:</p>
          <FormulaBox latex="\Delta V=EL=BLv" variant="blue" />
          <p>
            Dette er ikke en EMF som driver strøm (det er ingen lukket krets), men en stasjonær spenningsforskjell — staven oppfører seg som et lite batteri.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Potensialforskjell mellom endene">
          <FormulaBox latex="\Delta V=BLv=0{,}450\cdot 0{,}300\cdot 5{,}00" />
          <FormulaBox latex="\boxed{\Delta V=0{,}675\;\text{V}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Hvilket punkt har høyere potensial?">
          <p>
            Lorentz-kraft på en positiv ladning: <InlineLatex latex="\vec F=q\vec v\times\vec B" />. Med <InlineLatex latex="\vec v" /> mot høyre (+x) og <InlineLatex latex="\vec B" /> inn i siden (−z) blir <InlineLatex latex="\vec v\times\vec B=(+\hat x)\times(-\hat z)=+\hat y" /> (oppover).
          </p>
          <p>Positive ladninger akkumuleres øverst (ved a):</p>
          <FormulaBox latex="\boxed{\text{a er på høyere potensial}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Indre E-felt i likevekt">
          <FormulaBox latex="E=vB=5{,}00\cdot 0{,}450=2{,}25\;\text{V/m}" />
          <p>Retning: fra a (høy potensial) mot b (lav potensial), dvs. <strong>nedover</strong>:</p>
          <FormulaBox latex="\boxed{\vec E\;\text{peker fra a til b, } |\vec E|=2{,}25\;\text{V/m}}" variant="gold" />
        </Step>
        <Step n={4} title="(d) Hvilket punkt har positivt overskudd?">
          <p>Positive ladninger har samlet seg øverst (steg 2):</p>
          <FormulaBox latex="\boxed{\text{a har overskudd av positiv ladning}}" variant="gold" />
        </Step>
        <Step n={5} title="(e) To spesialtilfeller">
          <p><strong>(i) v parallelt med ab</strong> (langs stavens lengde):</p>
          <p>
            <InlineLatex latex="\vec v\times\vec B" /> peker da vinkelrett på staven, så det integrerer seg ikke til noen netto EMF langs den:
          </p>
          <FormulaBox latex="\varepsilon=\int(\vec v\times\vec B)\cdot d\vec\ell=0" />
          <FormulaBox latex="\boxed{\Delta V=0}" variant="gold" />
          <p><strong>(ii) v rett ut av siden</strong> (parallelt med −B-aksen):</p>
          <p>
            Da er <InlineLatex latex="\vec v\parallel\vec B" /> ⇒ <InlineLatex latex="\vec v\times\vec B=0" />. Ingen Lorentz-kraft, ingen ladningsadskillelse:
          </p>
          <FormulaBox latex="\boxed{\Delta V=0}" variant="gold" />
        </Step>
        <Pitfall>
          <strong>EMF krever <InlineLatex latex="\vec v" />, <InlineLatex latex="\vec B" /> og <InlineLatex latex="d\vec\ell" /> alle ulike retninger.</strong> Hvis to av dem er parallelle, blir kryssproduktet null. Det er bare den komponenten av <InlineLatex latex="\vec v\times\vec B" /> som peker langs staven som bidrar.
          </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: spenningen på 0,675 V er stabil — ingen energi dissiperes (siden ingen strøm flyter i en åpen stav). Kobler du staven via skinner til en motstand, vil du derimot trekke energi fra mekanisk arbeid og dissipere den i motstanden.
        </p>
      </div>
    ),
    summary: (
      <p>En isolert stav i B-felt får ladningsadskillelse <InlineLatex latex="\Delta V=BLv" /> uten å trekke strøm. Polaritet avgjøres av <InlineLatex latex="\vec v\times\vec B" />. Parallelle vektorer ⇒ ingen EMF.</p>
    ),
  },

  // ==========================================================================
  // 29.27 — Stav på skinner: EMF, retning, kraft, energibalanse
  // ==========================================================================
  "29.27": {
    title: "Stav på skinner — EMF, retning, kraft, energibalanse",
    difficulty: "middels",
    pageRef: "s. 1010",
    problem: (
      <div className="space-y-2">
        <p>
          Lederstaven <InlineLatex latex="ab" /> i Fig. E29.27 har kontakt med metallskinnene <InlineLatex latex="ca" /> og
          <InlineLatex latex="\;db" />. Apparatet ligger i et uniformt magnetfelt <InlineLatex latex="B=0{,}800\;\text{T}" />,
          vinkelrett på sidens plan (inn i siden). Staven har lengde <InlineLatex latex="L=50{,}0\;\text{cm}" />.
          (a) Finn størrelsen av indusert EMF når staven beveger seg mot høyre med fart <InlineLatex latex="v=7{,}50\;\text{m/s}" />.
          (b) I hvilken retning flyter strømmen i staven? (c) Hvis kretsens resistans <InlineLatex latex="abdc" /> er
          <InlineLatex latex="\;R=1{,}50\;\Omega" /> (antas konstant), finn kraften som trengs for å holde staven i jevn fart
          (størrelse og retning). Friksjon kan ses bort fra. (d) Sammenlign mekanisk effekt <InlineLatex latex="Fv" /> med
          dissipert effekt <InlineLatex latex="I^2R" />.
        </p>
        <svg viewBox="0 0 320 160" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <line x1="40" y1="30" x2="270" y2="30" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="130" x2="270" y2="130" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="130" stroke="#374151" strokeWidth="2" />
          <text x="22" y="34" fontSize="10" fill="#374151">c</text>
          <text x="22" y="135" fontSize="10" fill="#374151">d</text>
          <line x1="180" y1="30" x2="180" y2="130" stroke="#ef4444" strokeWidth="3" />
          <text x="186" y="34" fontSize="11" fill="#ef4444">a</text>
          <text x="186" y="135" fontSize="11" fill="#ef4444">b</text>
          <line x1="180" y1="80" x2="240" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <text x="245" y="84" fontSize="11" fill="#10b981">v</text>
          <text x="100" y="80" fontSize="10" fill="#ef4444">L = 50,0 cm</text>
          {[{x:70,y:60},{x:110,y:60},{x:70,y:100},{x:110,y:100}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <text x="50" y="150" fontSize="10" fill="#3b82f6">B inn i siden</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="B=0{,}800\;\text{T}" /> inn i siden</li>
        <li><InlineLatex latex="L=0{,}500\;\text{m}" /> (stavens lengde, vinkelrett på v)</li>
        <li><InlineLatex latex="v=7{,}50\;\text{m/s}" /> mot høyre</li>
        <li><InlineLatex latex="R=1{,}50\;\Omega" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Indusert EMF</li>
        <li>(b) Strømretning i staven</li>
        <li>(c) Påkrevd ytre kraft</li>
        <li>(d) Sammenligning av <InlineLatex latex="Fv" /> og <InlineLatex latex="I^2R" /></li>
      </ul>
    ),
    strategy: (
      <p>
        Bevegelses-EMF: <InlineLatex latex="\varepsilon=BLv" />. Strømretning fra Lenz / <InlineLatex latex="\vec v\times\vec B" />. Magnetisk kraft motstand <InlineLatex latex="F=BIL" /> peker mot bevegelsen, så ytre kraft må peke med bevegelsen. Energibalansen følger automatisk når farten er konstant.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Først EMF, så strøm via Ohm, så kraft via <InlineLatex latex="F=BIL" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Konstant fart ⇒ Newtons 1.: ytre kraft = magnetisk bremsekraft, motsatt rettet.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Kjedereaksjon: EMF → strøm → kraft">
          <p>Tre formler i kjede:</p>
          <ol className="list-decimal pl-5 space-y-0.5">
            <li><InlineLatex latex="\varepsilon=BLv" /> (bevegelses-EMF)</li>
            <li><InlineLatex latex="I=\varepsilon/R" /> (Ohms lov)</li>
            <li><InlineLatex latex="F=BIL" /> (magnetisk kraft på leder)</li>
          </ol>
          <p>Setter vi alt sammen, får vi den lukkede formelen:</p>
          <FormulaBox latex="F_\mathrm{magnet}=\dfrac{B^2L^2 v}{R}" variant="blue" />
        </TheoryBox>
        <Step n={1} title="(a) EMF">
          <FormulaBox latex="\varepsilon=BLv=0{,}800\cdot 0{,}500\cdot 7{,}50" />
          <FormulaBox latex="\boxed{\varepsilon=3{,}00\;\text{V}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Strømretning i staven">
          <p>
            Lorentz på positiv ladning: <InlineLatex latex="\vec v\times\vec B" /> med v mot høyre og B inn i siden ⇒ peker oppover. Positive ladninger flyter fra b til a inne i staven:
          </p>
          <FormulaBox latex="\boxed{\text{strømmen i staven flyter fra b til a (oppover)}}" variant="gold" />
          <p>I den ytre kretsen flyter den fra a → c → d → b og lukker dermed sløyfen.</p>
        </Step>
        <Step n={3} title="(c) Strøm og påkrevd kraft">
          <p>Strøm fra Ohm:</p>
          <FormulaBox latex="I=\dfrac{\varepsilon}{R}=\dfrac{3{,}00}{1{,}50}=2{,}00\;\text{A}" />
          <p>Magnetisk bremsekraft (mot bevegelsen):</p>
          <FormulaBox latex="F_\mathrm{magnet}=BIL=0{,}800\cdot 2{,}00\cdot 0{,}500=0{,}800\;\text{N}" />
          <p>For konstant fart må ytre kraft motvirke bremsekraften:</p>
          <FormulaBox latex="\boxed{F_\mathrm{ytre}=0{,}800\;\text{N}\;\;\text{mot høyre (med bevegelsen)}}" variant="gold" />
        </Step>
        <Step n={4} title="(d) Energibalanse">
          <p>Mekanisk effekt levert av ytre kraft:</p>
          <FormulaBox latex="P_\mathrm{mek}=F_\mathrm{ytre}\,v=0{,}800\cdot 7{,}50=6{,}00\;\text{W}" />
          <p>Joule-dissipert effekt i motstanden:</p>
          <FormulaBox latex="P_\mathrm{el}=I^2R=(2{,}00)^2\cdot 1{,}50=6{,}00\;\text{W}" />
          <FormulaBox latex="\boxed{P_\mathrm{mek}=P_\mathrm{el}=6{,}00\;\text{W}\;\checkmark}" variant="gold" />
          <p>All mekanisk effekt blir varme — energibevaring oppfylt.</p>
        </Step>
        <Pitfall>
          <strong>Den ytre kraften er ikke null!</strong> Selv uten friksjon må man trekke staven — den magnetiske bremsekraften virker fortsatt. «Friksjonsfrie skinner» betyr bare at det ikke er <em>mekanisk</em> friksjon; magnetisk motstand finnes uansett.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: dette er den enkleste mulige modellen for en likestrømsgenerator. Den mekaniske energien som leveres til staven, blir ren elektrisk energi (her dissipert som varme i R, men kunne i prinsippet lade et batteri eller drive en pære).
        </p>
      </div>
    ),
    summary: (
      <p>EMF → strøm → kraft kjeden gir bremsekraft <InlineLatex latex="B^2L^2v/R" />. Energi­balansen <InlineLatex latex="Fv=I^2R" /> bekrefter at ingen energi lekker — induksjon er en effektiv energi­omformer.</p>
    ),
  },

  // ==========================================================================
  // 29.51 — Fleksibel sirkulær løkke kollapser til null areal
  // ==========================================================================
  "29.51": {
    title: "Sirkulær løkke kollapser — gjennomsnittlig EMF",
    difficulty: "middels",
    pageRef: "s. 1012",
    problem: (
      <div className="space-y-2">
        <p>
          En fleksibel sirkulær løkke med diameter <InlineLatex latex="d=6{,}50\;\text{cm}" /> ligger i et magnetfelt med
          størrelse <InlineLatex latex="B=1{,}35\;\text{T}" />, rettet inn i sidens plan, som vist i Fig. P29.51. Løkken
          trekkes i punktene angitt med pilene slik at den danner en løkke med null areal i løpet av
          <InlineLatex latex="\;\Delta t=0{,}250\;\text{s}" />. (a) Finn gjennomsnittlig indusert EMF i kretsen.
          (b) Hva er retningen på strømmen i motstanden <InlineLatex latex="R" />: fra <InlineLatex latex="a" /> til
          <InlineLatex latex="\;b" /> eller fra <InlineLatex latex="b" /> til <InlineLatex latex="a" />? Begrunn.
        </p>
        <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto">
          <Arrowheads />
          <circle cx="120" cy="70" r="35" fill="none" stroke="#ef4444" strokeWidth="2" />
          <line x1="80" y1="70" x2="60" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <line x1="160" y1="70" x2="180" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          {[{x:105,y:55},{x:135,y:55},{x:105,y:85},{x:135,y:85}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <text x="92" y="125" fontSize="10" fill="#ef4444">d = 6,50 cm, B inn</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="d=0{,}0650\;\text{m}" /> ⇒ <InlineLatex latex="r=0{,}0325\;\text{m}" /></li>
        <li>Initielt areal: <InlineLatex latex="A_i=\pi r^2=3{,}318\times 10^{-3}\;\text{m}^2" /></li>
        <li>Sluttareal: <InlineLatex latex="A_f=0" /></li>
        <li><InlineLatex latex="B=1{,}35\;\text{T}" /> inn i siden</li>
        <li><InlineLatex latex="\Delta t=0{,}250\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) <InlineLatex latex="\varepsilon_\text{snitt}" /></li>
        <li>(b) Retning på strømmen i R</li>
      </ul>
    ),
    strategy: (
      <p>
        Gjennomsnittlig EMF er <InlineLatex latex="|\Delta\Phi_B|/\Delta t" />. Med konstant B og fallende areal blir <InlineLatex latex="\Delta\Phi_B=B\,\Delta A=B\,(0-A_i)" />. Lenz: indusert strøm motvirker tap av fluks, dvs. flyter slik at den lager B inn i siden inne i (det krympende) området.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Gjennomsnittlig <InlineLatex latex="|\varepsilon|" /> trenger ingen integrasjon — bare differansene <InlineLatex latex="\Delta\Phi" /> og <InlineLatex latex="\Delta t" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Fluksen avtar (areal forsvinner). Lenz: strøm prøver å opprettholde fluksen ⇒ flyter med urviseren sett fra leseren.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Gjennomsnittlig EMF — endelig differanse">
          <p>
            For ikke-momentane spørsmål («gjennomsnitt over Δt») kan vi bruke endelig differanse:
          </p>
          <FormulaBox latex="\varepsilon_\text{snitt}=-\dfrac{\Delta\Phi_B}{\Delta t}=-\dfrac{\Phi_f-\Phi_i}{\Delta t}" variant="blue" />
          <p>
            Vi trenger ikke vite <em>hvordan</em> arealet endrer seg i mellomtiden — kun start- og sluttverdier. Dette er en kraftig forenkling når deformasjonen er kompleks.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Initialfluks og endring">
          <FormulaBox latex="A_i=\pi r^2=\pi(0{,}0325)^2=3{,}318\times 10^{-3}\;\text{m}^2" />
          <FormulaBox latex="\Phi_i=B\,A_i=1{,}35\cdot 3{,}318\times 10^{-3}=4{,}479\times 10^{-3}\;\text{Wb}" />
          <FormulaBox latex="\Phi_f=0,\quad \Delta\Phi_B=-4{,}479\times 10^{-3}\;\text{Wb}" />
        </Step>
        <Step n={2} title="Gjennomsnittlig EMF">
          <FormulaBox latex="|\varepsilon_\text{snitt}|=\dfrac{|\Delta\Phi_B|}{\Delta t}=\dfrac{4{,}479\times 10^{-3}}{0{,}250}" />
          <FormulaBox latex="\boxed{|\varepsilon_\text{snitt}|\approx 1{,}79\times 10^{-2}\;\text{V}=17{,}9\;\text{mV}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Retning på strømmen">
          <p>
            Fluksen (inn i siden) avtar. Lenz: indusert strøm må gjenopprette fluksen — altså lage et felt <em>inn i siden</em> i sløyfens plan. Med høyrehåndsregel (tomlen inn i siden, fingrene krøller med urviseren):
          </p>
          <FormulaBox latex="\boxed{\text{strømmen i R går fra a til b (med urviseren sett fra leseren)}}" variant="gold" />
          <p>
            <em>Merk:</em> «a til b» antar at a er øverst og b nederst i figuren slik at urviser-strøm gjennom R går nedover. Sjekk Fig. P29.51 i boken hvis a/b er motsatt orientert.
          </p>
        </Step>
        <Pitfall>
          <strong>Det er areal-endringen, ikke deformasjonsformen, som teller.</strong> Når sløyfen kollapser fra sirkel til null, kunne den ha gått gjennom mange mellomformer (oval, dråpe…) — men gjennomsnittlig EMF avhenger kun av initial og endelig fluks.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: en raskere kollaps gir høyere EMF (omvendt proporsjonal med Δt). Hadde Δt vært 1 ms i stedet for 250 ms, ville gjennomsnittlig EMF blitt 4,48 V — tilstrekkelig til å lyse opp en LED.
        </p>
      </div>
    ),
    summary: (
      <p>For gjennomsnittlig EMF: <InlineLatex latex="\overline{\varepsilon}=|\Delta\Phi|/\Delta t" />. Lenz gir retningen kvalitativt; deformasjonens vei spiller ingen rolle, kun start og slutt.</p>
    ),
  },

  // ==========================================================================
  // 29.59 — Glide-stav som bremses av Lenz, finn x(stopp)
  // ==========================================================================
  "29.59": {
    title: "Glidestav i lukket sløyfe — kraft og stoppedistanse",
    difficulty: "vanskelig",
    pageRef: "s. 1013",
    problem: (
      <div className="space-y-2">
        <p>
          En rektangulær løkke med bredde <InlineLatex latex="L" /> og en glidestav med masse <InlineLatex latex="m" /> er som
          vist i Fig. P29.59. Et uniformt magnetfelt <InlineLatex latex="B" /> er rettet vinkelrett på sløyfeplanet, inn i
          sidens plan. Glidestaven gis starthastighet <InlineLatex latex="v_0" /> og slippes deretter. Det er ingen friksjon
          mellom glidestaven og løkken, og resistansen i løkken (ekskl. glidestaven) er neglisjerbar sammenlignet med
          glidestavens resistans <InlineLatex latex="R" />. (a) Finn et uttrykk for kraften
          <InlineLatex latex="\;F" /> som virker på staven mens den beveger seg med fart <InlineLatex latex="v" />. (b) Vis at
          avstanden <InlineLatex latex="x" /> staven beveger seg før den stopper er
          <InlineLatex latex="\;x=\dfrac{m v_0 R}{L^2 B^2}" />.
        </p>
        <svg viewBox="0 0 280 160" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <line x1="40" y1="30" x2="240" y2="30" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="130" x2="240" y2="130" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="130" stroke="#374151" strokeWidth="2" />
          <line x1="160" y1="30" x2="160" y2="130" stroke="#ef4444" strokeWidth="3" />
          <text x="166" y="80" fontSize="10" fill="#ef4444">m, R, L</text>
          <line x1="160" y1="80" x2="220" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k29)" />
          <text x="225" y="84" fontSize="11" fill="#10b981">v₀</text>
          {[{x:70,y:60},{x:100,y:60},{x:130,y:60},{x:70,y:100},{x:100,y:100},{x:130,y:100}].map((p,i)=>(
            <g key={i}>
              <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#3b82f6" strokeWidth="1.5" />
              <line x1={p.x-3} y1={p.y+3} x2={p.x+3} y2={p.y-3} stroke="#3b82f6" strokeWidth="1.5" />
            </g>
          ))}
          <text x="55" y="150" fontSize="10" fill="#3b82f6">B inn i siden</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Stav: masse <InlineLatex latex="m" />, lengde <InlineLatex latex="L" />, resistans <InlineLatex latex="R" /></li>
        <li>Sløyfens øvrige resistans neglisjerbar</li>
        <li>Magnetfelt <InlineLatex latex="B" /> vinkelrett på sløyfen, inn i siden</li>
        <li>Starthastighet <InlineLatex latex="v_0" />, deretter ingen ytre kraft</li>
        <li>Friksjonsfri</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) <InlineLatex latex="F(v)" /> — bremsekraft som funksjon av fart</li>
        <li>(b) Total avstand <InlineLatex latex="x" /> til staven stopper</li>
      </ul>
    ),
    strategy: (
      <p>
        (a) Bruk EMF→I→F kjeden for å få <InlineLatex latex="F=B^2L^2 v/R" />. (b) Newton 2 gir en differensialligning. Bruk
        kjederegelen <InlineLatex latex="dv/dt=v\,dv/dx" /> for å få en ligning i v og x, og integrer.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Indusert EMF: <InlineLatex latex="\varepsilon=BLv" />. Strøm: <InlineLatex latex="I=\varepsilon/R" />. Kraft: <InlineLatex latex="F=BIL" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Newton: <InlineLatex latex="m\,dv/dt=-F" />. Bytt variabel: <InlineLatex latex="dv/dt=(dv/dx)(dx/dt)=v\,dv/dx" />.</p>,
      },
      {
        label: "Hint 3",
        content: <p>Integrer fra <InlineLatex latex="v_0" /> til 0 i v, og fra 0 til x i posisjon.</p>,
      },
    ],
    solution: (
      <div>
        <TheoryBox title="Bremsekraft fra induksjon">
          <p>Tre lover i kjede gir den lukkede formelen:</p>
          <ol className="list-decimal pl-5 space-y-0.5">
            <li><InlineLatex latex="\varepsilon=BLv" /> (bevegelses-EMF)</li>
            <li><InlineLatex latex="I=\varepsilon/R=BLv/R" /> (Ohms lov)</li>
            <li><InlineLatex latex="F=BIL=B^2L^2v/R" /> (Lorentz-kraft på leder)</li>
          </ol>
          <FormulaBox latex="F=\dfrac{B^2L^2}{R}\,v" variant="blue" />
          <p>
            Kraften er <em>proporsjonal med farten</em> — staven blir bremset hardere når den går raskt, mildere når den nesten har stoppet. Dette gir den karakteristiske eksponentielle avtagningen.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Uttrykk for F(v)">
          <p>Fra kjederegningen over:</p>
          <FormulaBox latex="\boxed{F(v)=\dfrac{B^2L^2}{R}\,v}" variant="gold" />
          <p>Retning: <em>mot bevegelsen</em>, slik Lenz krever.</p>
        </Step>
        <Step n={2} title="(b) Newton 2 og bytte til v(x)">
          <p>Eneste kraft på staven (ingen friksjon):</p>
          <FormulaBox latex="m\,\dfrac{dv}{dt}=-F=-\dfrac{B^2L^2}{R}\,v" />
          <p>
            Vi kunne integrere i tid og få <InlineLatex latex="v(t)=v_0\,e^{-t/\tau}" />, men oppgaven spør om <em>distanse</em>. Bruk kjederegelen for å bytte variabel:
          </p>
          <FormulaBox latex="\dfrac{dv}{dt}=\dfrac{dv}{dx}\cdot\dfrac{dx}{dt}=v\,\dfrac{dv}{dx}" />
          <p>Sett inn:</p>
          <FormulaBox latex="m\,v\,\dfrac{dv}{dx}=-\dfrac{B^2L^2}{R}\,v" />
          <p>Del på v (gyldig så lenge v &gt; 0):</p>
          <FormulaBox latex="m\,\dfrac{dv}{dx}=-\dfrac{B^2L^2}{R}" />
        </Step>
        <Step n={3} title="Integrer fra start til stopp">
          <p>Separer og integrer fra <InlineLatex latex="(x=0,v=v_0)" /> til <InlineLatex latex="(x=x_\text{stopp},v=0)" />:</p>
          <FormulaBox latex="\int_{v_0}^{0} m\,dv=-\int_0^{x_\text{stopp}}\dfrac{B^2L^2}{R}\,dx" />
          <FormulaBox latex="-mv_0=-\dfrac{B^2L^2}{R}\,x_\text{stopp}" />
          <FormulaBox latex="\boxed{x_\text{stopp}=\dfrac{m v_0 R}{B^2 L^2}}" variant="gold" />
        </Step>
        <Step n={4} title="Sjekk via energibevaring">
          <p>Initial kinetisk energi:</p>
          <FormulaBox latex="K_0=\tfrac{1}{2}m v_0^2" />
          <p>Total dissipert energi i motstanden er all kinetisk energi (siden ingen annen sluk finnes):</p>
          <FormulaBox latex="W_\text{dissipert}=\tfrac{1}{2}m v_0^2" />
          <p>
            Alternativt kan man integrere effekten <InlineLatex latex="P(t)=Fv=B^2L^2v^2/R" /> over hele forløpet og få samme resultat — energien er entydig bevart.
          </p>
        </Step>
        <Pitfall>
          <strong>Staven stopper aldri «fullstendig» i en ren eksponentiell avtagning</strong> — formelt sett kreves uendelig tid. Men i praksis oppfattes den som stoppet etter noen tidskonstanter <InlineLatex latex="\tau=mR/(B^2L^2)" />. Den endelige <em>distansen</em> er likevel velbestemt, fordi <InlineLatex latex="\int_0^\infty v\,dt" /> konvergerer.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: dette er nøyaktig prinsippet bak elektromagnetiske bremser i tog, trikker, heiser og treningssykler. Bremsen virker uten kontakt, krever ingen friksjons­materiale, og bremskraften skalerer automatisk med farten — kraftig ved høy fart, mild når man nærmer seg stillstand. Eneste ulempe: den virker ikke ved <InlineLatex latex="v=0" />, så man trenger en mekanisk parkerings­brems.
        </p>
      </div>
    ),
    summary: (
      <p>Bremsekraft <InlineLatex latex="F\propto v" /> gir eksponentiell avtagning i tid, men endelig stoppedistanse <InlineLatex latex="x=mv_0R/(B^2L^2)" />. Hele <InlineLatex latex="\tfrac{1}{2}mv_0^2" /> blir varme i motstanden — energi er bevart.</p>
    ),
  },
};
