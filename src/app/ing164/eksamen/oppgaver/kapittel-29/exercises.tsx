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
        <TheoryBox title="Faradays induksjonslov — hvorfor en endring?">
          <p>
            Den eksperimentelle observasjonen (Faraday, 1831) er overraskende: et <em>statisk</em> magnetfelt gjennom en lukket sløyfe gir <strong>ingen</strong> strøm, uansett hvor sterkt feltet er. Det er kun <em>endringen</em> som teller. Faradays lov formaliserer dette:
          </p>
          <FormulaBox latex="\varepsilon=-\dfrac{d\Phi_B}{dt}" variant="blue" />
          <p>
            Den generelle definisjonen av fluks er flate­integralet
            <InlineLatex latex="\;\Phi_B=\int\vec B\cdot d\vec A" />. Prikk­produktet betyr at bare den komponenten av <InlineLatex latex="\vec B" /> som står vinkelrett på flaten teller. Fluks måles i weber: <InlineLatex latex="1\;\text{Wb}=1\;\text{T}\cdot\text{m}^2" />.
          </p>
          <p>
            Minustegnet er <em>Lenz&apos; lov</em>: den induserte strømmen velger retning slik at den magnetisk motsetter seg endringen. Dette er ikke en tilfeldig fortegns­konvensjon, men et direkte uttrykk for energibevaring — ellers kunne man fått energi fra ingenting.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvilken formel velger vi — og hvorfor?">
          <p>
            Flukses­endring kan i prinsippet komme fra tre kilder: (1) endring i B, (2) endring i A, eller (3) endring i vinkel θ mellom feltet og flaten. Her er A konstant (stiv sirkulær sløyfe) og θ = 0 hele tiden (feltet står fast vinkelrett på sløyfeplanet). Det er <em>bare B som endrer seg</em>.
          </p>
          <p>
            Siden feltet er uniformt og vinkelrett på A, forenkles integralet til
            <InlineLatex latex="\;\Phi_B=BA\cos(0)=BA" />. Vi bruker altså <em>ikke</em> den generelle <InlineLatex latex="\varepsilon=BLv" /> (ingen ledere beveger seg) og <em>ikke</em> <InlineLatex latex="\varepsilon=BA\omega\sin(\omega t)" /> (ingen rotasjon) — vi bruker den mest spesialiserte formen der A tas utenfor derivasjonen:
          </p>
          <FormulaBox latex="\varepsilon=-\dfrac{d(BA)}{dt}=-A\,\dfrac{dB}{dt}" variant="blue" />
          <p>
            Siden endringen er <em>lineær</em> i tiden, er den momentane deriverte <InlineLatex latex="dB/dt" /> lik den gjennomsnittlige raten <InlineLatex latex="\Delta B/\Delta t" />. Vi tar absoluttverdi fordi oppgaven ber kun om størrelsen; retningen behandles separat med Lenz&apos; lov.
          </p>
        </TheoryBox>
        <Step n={1} title="Beregn sløyfens areal">
          <p>Sirkulær sløyfe med radius <InlineLatex latex="r=0{,}120\;\text{m}" />. Arealet av en sirkel:</p>
          <FormulaBox latex="A=\pi r^2=\pi(0{,}120)^2=4{,}524\times 10^{-2}\;\text{m}^2" />
          <p>Dette er den «flaten» fluksen går gjennom — dens geometriske størrelse er låst (ikke-deformerbar sløyfe).</p>
        </Step>
        <Step n={2} title="Endringsrate for B">
          <p>Feltet avtar fra 1,50 T til 0,500 T på 2,00 s. Lineær endring betyr at <InlineLatex latex="dB/dt=\Delta B/\Delta t" />:</p>
          <FormulaBox latex="\dfrac{\Delta B}{\Delta t}=\dfrac{B_2-B_1}{\Delta t}=\dfrac{0{,}500-1{,}50}{2{,}00}=-0{,}500\;\text{T/s}" />
          <p>Negativt fortegn betyr at feltet minker. For å finne størrelsen av EMF bruker vi absoluttverdien 0,500 T/s.</p>
        </Step>
        <Step n={3} title="Indusert EMF via Faradays lov">
          <p>Sett inn i <InlineLatex latex="|\varepsilon|=A\,|dB/dt|" />:</p>
          <FormulaBox latex="|\varepsilon|=A\left|\dfrac{\Delta B}{\Delta t}\right|=4{,}524\times 10^{-2}\cdot 0{,}500" />
          <FormulaBox latex="\boxed{|\varepsilon|\approx 2{,}26\times 10^{-2}\;\text{V}=22{,}6\;\text{mV}}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="\text{m}^2\cdot\text{T/s}=\text{T}\cdot\text{m}^2/\text{s}=\text{Wb/s}=\text{V}" />. ✓
          </p>
        </Step>
        <Step n={4} title="Retnings­analyse med Lenz' lov">
          <p>
            Lenz brukes <em>separat</em> fra størrelsen: Faraday gir <strong>hvor mye</strong>, Lenz gir <strong>hvilken vei</strong>. Fluksen (ut av siden) minker. Indusert strøm må motvirke dette — altså prøve å opprettholde fluksen ut av siden. Indusert B må derfor også peke <em>ut av siden</em> inne i sløyfen.
          </p>
          <p>
            Med høyrehåndsregel (tomlen ut av siden, fingrene krøller): strømmen går <em>mot urviseren</em> sett fra leseren.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning / anvendelser:</strong> Dette er den generiske mekanismen bak induksjons­kokeplaten (AC-felt gir virvelstrømmer i kjelebunnen), metalldetektoren (metall i feltet endrer effektiv <InlineLatex latex="\Phi_B" />) og kortleseren som føler tilstedeværelse av metall i ID-kort. Jo raskere feltet endrer seg (jo større <InlineLatex latex="|dB/dt|" />), jo sterkere respons — derfor bruker induksjons­ovner høye frekvenser (20–100 kHz).
        </p>
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
        <TheoryBox title="Faradays lov for N vindinger">
          <p>
            For én vinding er indusert EMF <InlineLatex latex="\varepsilon_1=-d\Phi_B/dt" />. I en spole med N vindinger som alle ser
            <em> samme</em> fluks, er vindingene elektrisk koblet i <em>serie</em>, og seriespenningene summeres:
          </p>
          <FormulaBox latex="\varepsilon=\sum_{k=1}^{N}\varepsilon_k=-N\dfrac{d\Phi_B}{dt}" variant="blue" />
          <p>
            En ekvivalent formulering bruker <em>koblet fluks</em> (flux linkage) <InlineLatex latex="\Psi=N\Phi_B" />:
          </p>
          <FormulaBox latex="\varepsilon=-\dfrac{d\Psi}{dt}" variant="blue" />
          <p>
            <strong>Analogi:</strong> Tenk på hver vinding som et lite batteri. Koblet i serie adderes spenningene — 200 «enkeltbatterier» som hver gir 0,176 mV gir 35,2 mV totalt. Samme prinsipp som at 4 AA-batterier i serie gir 6 V.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor ikke bevegelses-EMF eller rotasjons­formel?">
          <p>
            Vi har tre hovedformler for indusert EMF, og det er viktig å velge rett:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\varepsilon=BLv" />: kun når en <em>stav/ledning beveger seg</em> gjennom et statisk felt.</li>
            <li><InlineLatex latex="\varepsilon=BA\omega\sin(\omega t)" />: kun når sløyfen <em>roterer</em> i et statisk felt.</li>
            <li><InlineLatex latex="\varepsilon=-N\,dB/dt\cdot A" />: når <em>feltet</em> endrer seg, med fast sløyfe og fast areal (dette tilfellet).</li>
          </ul>
          <p>
            Her står spolen stille og feltet endrer seg — altså siste variant. Siden A er konstant og <InlineLatex latex="\vec B\perp\text{spoleplan}" />, har vi <InlineLatex latex="\Phi_B=BA" />, og all tidsavhengigheten ligger i B:
          </p>
          <FormulaBox latex="|\varepsilon|=N\left|\dfrac{d(BA)}{dt}\right|=NA\left|\dfrac{dB}{dt}\right|" variant="blue" />
        </TheoryBox>
        <Step n={1} title="Areal per vinding">
          <p>Hver vinding er en sirkel med radius 4,00 cm:</p>
          <FormulaBox latex="A=\pi r^2=\pi(0{,}0400)^2=5{,}027\times 10^{-3}\;\text{m}^2" />
          <p>Samme areal for alle 200 vindingene — de ligger tett sammen og ser alle samme B.</p>
        </Step>
        <Step n={2} title="EMF fra Faradays lov">
          <p>Sett inn <InlineLatex latex="N=200" />, <InlineLatex latex="A=5{,}027\times 10^{-3}\;\text{m}^2" /> og <InlineLatex latex="dB/dt=0{,}0350\;\text{T/s}" />:</p>
          <FormulaBox latex="|\varepsilon|=NA\left|\dfrac{dB}{dt}\right|=200\cdot 5{,}027\times 10^{-3}\cdot 0{,}0350" />
          <FormulaBox latex="\boxed{|\varepsilon|\approx 0{,}0352\;\text{V}=35{,}2\;\text{mV}}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="[\text{(ingen)}]\cdot[\text{m}^2]\cdot[\text{T/s}]=\text{Wb/s}=\text{V}" />. ✓
          </p>
        </Step>
        <Step n={3} title="Retnings­analyse (Lenz)">
          <p>
            Oppgaven sier ikke om B øker eller minker, kun at raten er <InlineLatex latex="+0{,}0350\;\text{T/s}" /> (positiv ⇒ økende). Lenz: hvis B øker vinkelrett inn i spoleplanet, vil indusert strøm skape et motsatt rettet B. Strøm­retningen velges slik at man ved høyrehåndsregel får det ønskede indusert-B.
          </p>
        </Step>
        <p>
          <strong>Intuisjon — hvorfor N i formelen?</strong> Hadde vi hatt bare én vinding, ville EMF vært ca. 0,176 mV — mye svakere. Ved å pakke 200 vindinger oppå hverandre blir hver omdreining en ekstra «batteri-celle» i serie. Dette er hele grunnen til at ekte generatorer og transformatorer bruker hundrevis eller tusenvis av vindinger — man får mye spenning uten å trenge enormt sterke felt.
        </p>
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
        <TheoryBox title="Tredje kilde til flukses­endring: rotasjon">
          <p>
            Fra 29.1 og 29.6 har vi sett at en endring i <em>B</em> gir EMF. Men fluksen kan også endres ved å vri selve sløyfen. Den generelle definisjonen er:
          </p>
          <FormulaBox latex="\Phi_B=\vec B\cdot\vec A=BA\cos\theta" variant="blue" />
          <p>
            Det er altså tre måter å endre fluksen på (og dermed tre måter å indusere EMF): (1) endre <em>B</em>, (2) endre <em>A</em>, eller (3) endre <em>θ</em>. Her er B og A konstante, og θ endres ved rotasjon:
            <InlineLatex latex="\;\theta(t)=\omega t" />.
          </p>
          <FormulaBox latex="\Phi_B(t)=BA\cos(\omega t)" variant="blue" />
          <p>
            Dette er en sinusformet funksjon — og derfor blir den induserte EMF-en (dens tidsderiverte) også sinusformet, men 90° fase­forskjøvet.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor denne formelen og ikke BLv?">
          <p>
            Begge formlene beskriver induksjon via bevegelse, men på forskjellig måte:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><InlineLatex latex="\varepsilon=BLv" />: for <em>translasjon</em> — en stav som beveger seg rett langs skinnene. Feies-arealet øker lineært.</li>
            <li><InlineLatex latex="\varepsilon=BA\omega\sin(\omega t)" />: for <em>rotasjon</em> — sløyfen vrir seg på stedet. Arealet er fast, men <em>projeksjonen</em> av arealet på B-retningen endres.</li>
          </ul>
          <p>
            Man kan i prinsippet beregne en generator med BLv på hver av de fire sidene i den rektangulære sløyfen, men rotasjons­formelen er langt enklere — derfor bruker vi den.
          </p>
          <p>Deriverer vi fluksen og bruker Faradays lov:</p>
          <FormulaBox latex="\varepsilon=-\dfrac{d\Phi_B}{dt}=-BA\dfrac{d}{dt}\bigl[\cos(\omega t)\bigr]=BA\,\omega\sin(\omega t)" variant="blue" />
          <p>
            <InlineLatex latex="\sin(\omega t)" /> svinger mellom −1 og +1, så amplituden er:
          </p>
          <FormulaBox latex="\varepsilon_\mathrm{max}=BA\omega" variant="blue" />
          <p>
            Med N vindinger multipliseres resultatet med N: <InlineLatex latex="\varepsilon_\mathrm{max}=NBA\omega" />. Her har vi én vinding.
          </p>
        </TheoryBox>
        <p>
          <strong>Fysisk bilde — når er EMF maksimal?</strong> Paradoksalt nok: når fluksen er <em>null</em>. Dette skjer når sløyfen står parallelt med B (flatenormalen vinkelrett på B, <InlineLatex latex="\theta=90^\circ" />). Der er <InlineLatex latex="\cos\theta=0" /> (ingen fluks), men <InlineLatex latex="-\sin\theta=-1" /> (maksimal <em>endringsrate</em>). Motsatt: når fluksen er <em>maksimal</em> (<InlineLatex latex="\theta=0" />), er <InlineLatex latex="\sin\theta=0" /> — så EMF er null. Det er endringen, ikke verdien, som teller.
        </p>
        <Step n={1} title="Areal av rektangulær sløyfe">
          <p>Rektangel med sider a og b:</p>
          <FormulaBox latex="A=ab=0{,}200\cdot 0{,}300=0{,}0600\;\text{m}^2" />
        </Step>
        <Step n={2} title="Maksimal EMF">
          <p>Sett inn <InlineLatex latex="B=0{,}250\;\text{T}" />, <InlineLatex latex="A=0{,}0600\;\text{m}^2" /> og <InlineLatex latex="\omega=100\;\text{rad/s}" /> i amplitudeformelen:</p>
          <FormulaBox latex="\varepsilon_\mathrm{max}=BA\omega=0{,}250\cdot 0{,}0600\cdot 100" />
          <FormulaBox latex="\boxed{\varepsilon_\mathrm{max}=1{,}50\;\text{V}}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="\text{T}\cdot\text{m}^2\cdot\text{rad/s}=\text{Wb/s}=\text{V}" /> (rad er dimensjonsløs). ✓
          </p>
        </Step>
        <p>
          <strong>Tolkning:</strong> Den faktiske spenningen varierer som <InlineLatex latex="1{,}50\sin(100t)\;\text{V}" /> — altså en sinusformet vekselspenning med frekvens <InlineLatex latex="f=\omega/(2\pi)\approx 15{,}9\;\text{Hz}" />. Retningen på strømmen snur hver gang <InlineLatex latex="\sin" /> bytter fortegn. Dette er eksakt hva en AC-generator produserer.
        </p>
        <p>
          <strong>Energibetraktning:</strong> Siden <InlineLatex latex="\varepsilon_\mathrm{max}\propto\omega" /> må man rotere raskere for høyere spenning. Men raskere rotasjon krever mer mekanisk effekt (motordrevet rotor), og ved resistiv last forbruker spolen <InlineLatex latex="P=\varepsilon^2/R" />. Det er dette mekaniske arbeidet (ikke magnetfeltet) som omdannes til elektrisk energi. Norske vannkraftverk bruker samme prinsipp — bare med langt større spoler og sterkere felt.
        </p>
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
        <TheoryBox title="Bevegelses-EMF — Lorentz-kraft som opphav">
          <p>
            En fri positiv ladning <InlineLatex latex="q" /> <em>i</em> den bevegelige staven har hastighet <InlineLatex latex="\vec v" /> (staven drar den med seg) og befinner seg i feltet <InlineLatex latex="\vec B" />. Den opplever Lorentz-kraften:
          </p>
          <FormulaBox latex="\vec F=q\vec v\times\vec B" variant="blue" />
          <p>
            Denne kraften skyver positive ladninger til den ene enden av staven og negative til den andre — staven oppfører seg som et batteri med indre EMF. Den effektive EMF-en fås ved å integrere <InlineLatex latex="(\vec v\times\vec B)" /> langs stavens lengde:
          </p>
          <FormulaBox latex="\varepsilon=\int_0^L (\vec v\times\vec B)\cdot d\vec l=BLv" variant="blue" />
          <p>
            For <InlineLatex latex="\vec v\perp\vec B\perp\vec L" /> (som her) blir resultatet bare produktet <InlineLatex latex="BLv" />.
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor BLv og ikke Faraday direkte?">
          <p>
            Interessant nok gir <em>begge</em> samme svar — men de beskriver ulike perspektiver:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><strong>Bevegelses-EMF <InlineLatex latex="\varepsilon=BLv" />:</strong> tar utgangspunkt i <em>ladninger som skyves av Lorentz-kraften</em>. Fungerer i stavens referansesystem og er direkte å anvende.</li>
            <li><strong>Faradays lov <InlineLatex latex="\varepsilon=-d\Phi_B/dt" />:</strong> tar utgangspunkt i at feies-arealet øker. Per tidsenhet feier staven over areal <InlineLatex latex="\Delta A=L\,v\,\Delta t" />, så <InlineLatex latex="d\Phi/dt=B\cdot Lv" />. Samme svar.</li>
          </ul>
          <p>
            Vi velger bevegelses-EMF her fordi (1) staven er den eneste delen som beveger seg, (2) ingen felt endrer seg, og (3) <InlineLatex latex="\varepsilon=BLv" /> er én enkel multiplikasjon. Vi bruker <em>ikke</em> <InlineLatex latex="NBA\omega" /> (ingen rotasjon) og <em>ikke</em> <InlineLatex latex="-L\,dI/dt" /> (ingen selvinduktans involvert).
          </p>
        </TheoryBox>
        <TheoryBox title="Kjedekoblingen: EMF → strøm → kraft">
          <p>
            Problemet har tre lover som må kombineres i kjede:
          </p>
          <ol className="list-decimal pl-5 space-y-0.5">
            <li><strong>Faraday/Lorentz:</strong> <InlineLatex latex="\varepsilon=BLv" /> — bevegelse gir spenning.</li>
            <li><strong>Ohms lov:</strong> <InlineLatex latex="I=\varepsilon/R" /> — spenning over motstand gir strøm.</li>
            <li><strong>Lorentz-kraft på leder:</strong> <InlineLatex latex="\vec F=I\vec L\times\vec B" /> — strøm i felt gir kraft på selve staven.</li>
          </ol>
          <p>
            Lenz&apos; lov sier at kraften i punkt (3) peker <em>mot</em> bevegelsen — ellers ville man fått energi gratis. Derfor må en ytre kraft virke i bevegelsesretningen for å holde farten konstant.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Indusert EMF via bevegelses-EMF">
          <p>Siden <InlineLatex latex="\vec v\perp\vec L\perp\vec B" /> (alle vinkelrett på hverandre), bruker vi den direkte formelen:</p>
          <FormulaBox latex="\varepsilon=BLv=0{,}450\cdot 0{,}800\cdot 5{,}00=1{,}80\;\text{V}" />
          <FormulaBox latex="\boxed{\varepsilon=1{,}80\;\text{V}}" variant="gold" />
          <p><strong>Enhetssjekk:</strong> <InlineLatex latex="\text{T}\cdot\text{m}\cdot\text{m/s}=\text{Wb/s}=\text{V}" />. ✓</p>
        </Step>
        <Step n={2} title="(b) Strøm i kretsen — Ohms lov">
          <p>Staven er nå en spenningskilde med <InlineLatex latex="\varepsilon=1{,}80\;\text{V}" /> koblet til en ytre motstand R. Siden oppgaven bare oppgir én motstand (kretsens totale motstand), bruker vi Ohm:</p>
          <FormulaBox latex="I=\dfrac{\varepsilon}{R}=\dfrac{1{,}80}{1{,}50}" />
          <FormulaBox latex="\boxed{I=1{,}20\;\text{A}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Kraft på staven fra strømmen (Lenz-analyse)">
          <p>
            Strømmen I i staven befinner seg i B-feltet og opplever Lorentz-kraft. For en rett leder med <InlineLatex latex="\vec L\perp\vec B" /> er størrelsen:
          </p>
          <FormulaBox latex="F=|\vec F|=|I\vec L\times\vec B|=BIL" variant="blue" />
          <FormulaBox latex="F_\mathrm{motstand}=BIL=0{,}450\cdot 1{,}20\cdot 0{,}800=0{,}432\;\text{N}" />
          <p>
            <strong>Retning via Lenz:</strong> «Motsetter seg endringen» betyr her konkret at fluksen gjennom sløyfen øker når staven beveger seg (større areal), så indusert strøm må gi en kraft som <em>bremser</em> staven. Derfor peker F motsatt av <InlineLatex latex="\vec v" />. For å holde farten konstant krever Newtons 1. lov at nettokraften er null, så ytre drakraft må motvirke nøyaktig:
          </p>
          <FormulaBox latex="\boxed{F_\mathrm{drag}=0{,}432\;\text{N}}" variant="gold" />
        </Step>
        <Step n={4} title="Sjekk energibevaring">
          <p>Tilført mekanisk effekt (ytre kraft × hastighet):</p>
          <FormulaBox latex="P_\mathrm{mek}=F_\mathrm{drag}\,v=0{,}432\cdot 5{,}00=2{,}16\;\text{W}" />
          <p>Dissipert elektrisk effekt (Joule-oppvarming i R):</p>
          <FormulaBox latex="P_\mathrm{el}=I^2R=(1{,}20)^2\cdot 1{,}50=2{,}16\;\text{W}\;\checkmark" />
          <p>All mekanisk effekt omdannes til varme via Joule-oppvarming — <em>ingen</em> energi forsvinner eller oppstår. Dette er en konsekvens av Lenz&apos; lov: hadde den induserte kraften hjulpet bevegelsen, ville man fått gratis energi.</p>
        </Step>
        <p>
          <strong>Fysisk tolkning — skalering:</strong> Kombinerer vi kjeden <InlineLatex latex="\varepsilon=BLv" />, <InlineLatex latex="I=\varepsilon/R" /> og <InlineLatex latex="F=BIL" /> algebraisk, får vi:
        </p>
        <FormulaBox latex="F=\dfrac{B^2 L^2}{R}\,v" variant="blue" />
        <p>
          Bremskraften er <em>proporsjonal med farten</em> — jo fortere, jo sterkere brems. Dette gir en «myk» bremseopplevelse og er prinsippet bak virvelstrøm­bremser (eddy current brakes) i tog, trikker, heiser og treningssykler. Dessuten: bremsen fungerer uten mekanisk kontakt, så ingen slitasje.
        </p>
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
        <TheoryBox title="Lenz&apos; lov — energi­bevaringens signatur">
          <p>
            Faradays lov <InlineLatex latex="\varepsilon=-d\Phi_B/dt" /> forteller oss at en endring i fluks induserer en EMF. <em>Minustegnet</em> inneholder all informasjonen om retning og er selve <strong>Lenz&apos; lov</strong>:
          </p>
          <FormulaBox latex="\vec B_\mathrm{indusert}\;\text{motvirker endring av}\;\Phi_B^{\,\mathrm{ytre}}" variant="blue" />
          <p>
            Her er ordet «motvirker» presist: det betyr at det <em>indusert-B-feltet inne i sløyfen</em> peker slik at den <em>induserte</em> fluks­bidraget motvirker <em>forandringen</em> — ikke den ytre fluksen selv.
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Hvis <InlineLatex latex="\Phi_B" /> <em>øker</em>: indusert B peker motsatt av ytre B (for å «trekke fra»).</li>
            <li>Hvis <InlineLatex latex="\Phi_B" /> <em>minker</em>: indusert B peker samme retning som ytre B (for å «støtte opp»).</li>
          </ul>
          <p>
            Dette er ingen tilfeldig konvensjon — det følger direkte av energibevaring. Hvis indusert strøm forsterket endringen, ville systemet få energi gratis (et magisk evighetsmaskineri).
          </p>
        </TheoryBox>
        <TheoryBox title="Hvilken formel — og hvorfor ikke beregne størrelsen?">
          <p>
            Oppgaven spør <em>kun</em> om retning, ikke om størrelsen. Vi bruker derfor Lenz&apos; lov kvalitativt og <em>ikke</em> <InlineLatex latex="\varepsilon=-A\,dB/dt" />. Faradays lov ville gitt tall for <InlineLatex latex="|\varepsilon|" />, men retningen får vi uansett bare fra fortegnet, som er Lenz&apos; lov.
          </p>
          <p>
            Rollefordeling:
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li><strong>Faradays lov:</strong> gir <em>størrelsen</em> av EMF.</li>
            <li><strong>Lenz&apos; lov:</strong> gir <em>retningen</em> på indusert strøm.</li>
            <li><strong>Høyrehåndsregel:</strong> oversetter fra retning på B til retning på strøm.</li>
          </ul>
        </TheoryBox>
        <p>
          <strong>Trestegsoppskrift for retning:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Bestem retning på <em>ytre</em> B og hva slags endring (øker/minker).</li>
          <li>Finn retning på <em>indusert</em> B: motsatt av endringen (øker → motsatt ytre; minker → samme som ytre).</li>
          <li>Bruk høyrehåndsregel (tomlen i retning indusert B inne i sløyfen, fingrene krøller med strømmen) til å finne strøm­retning.</li>
        </ol>
        <Step n={1} title="Identifiser endringen i ytre fluks">
          <p>Ytre B peker ut av siden og <em>øker</em>. Siden <InlineLatex latex="\Phi_B=BA" /> og A er konstant, øker også fluksen ut av siden: <InlineLatex latex="d\Phi_B/dt>0" />.</p>
        </Step>
        <Step n={2} title="Bestem retning på indusert B">
          <p>
            For å motsette seg en <em>økende fluks ut av siden</em>, må det induserte B-feltet inne i sløyfen peke <em>inn i siden</em>. Det induserte feltet prøver altså å kansellere den økningen som skjer, slik at netto­fluksen endrer seg mindre.
          </p>
        </Step>
        <Step n={3} title="Høyrehåndsregel gir strømretning">
          <p>
            Peker du tomlen på høyre hånd <em>inn i siden</em> (retning av indusert B inne i sløyfen), krøller fingrene seg <em>med urviseren</em> sett fra leserens side. Strømretningen følger fingrenes krølleretning.
          </p>
          <FormulaBox latex="\boxed{\text{Strøm flyter med urviseren sett fra forsiden.}}" variant="gold" />
        </Step>
        <p>
          <strong>Energi­perspektiv — tankeeksperiment:</strong> Hadde strømmen gått mot urviseren, ville indusert B peke <em>ut</em> og forsterke endringen. Da ville den eksterne kilden som skaper endringen få «hjelp» av systemet, og samtidig ville strømmen varme opp motstanden i kretsen — energi ut av intet. Lenz&apos; lov er altså ikke en lov i seg selv, men en konsekvens av at energi ikke kan skapes.
        </p>
        <p>
          <strong>Analogi med mekanikk:</strong> Tenk på Lenz som Newtons tredje lov for induksjon — «for enhver virkning finnes en like stor motvirkning». Endrer du fluksen, «skyver systemet tilbake» med en strøm som vil gjenopprette den.
        </p>
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
        <TheoryBox title="Faradays lov for en innkommende magnet">
          <p>
            Fluksen gjennom en vinding i spolen er <InlineLatex latex="\Phi_B=\int\vec B\cdot d\vec A" />. Magnetfelt-linjer kommer ut av magnetens N-pol, så når N-polen nærmer seg spolen, øker <em>antallet</em> feltlinjer som treffer spolens åpning. Vi kan tegne det som:
          </p>
          <FormulaBox latex="\varepsilon=-N\dfrac{d\Phi_B}{dt},\quad \dfrac{d\Phi_B}{dt}>0\;\text{(økende)}" variant="blue" />
          <p>
            Lenz&apos; lov krever at den induserte strømmen motvirker denne økningen ved å sette opp et motsatt B-felt inne i spolen.
          </p>
        </TheoryBox>
        <p>
          <strong>Mekanisk analogi:</strong> Hadde den induserte strømmen hjulpet magneten, ville magneten akselerere inn i spolen uten ytre kraft, og samtidig ville strømmen varme opp motstanden i kretsen — energi ut av intet. Derfor må induksjonen motstå bevegelsen, og spolen oppfører seg som en «magnetisk fjær» som presser tilbake.
        </p>
        <Step n={1} title="Identifiser endringen i fluks">
          <p>
            Feltlinjene fra N-polen går inn i spolens nære ende og ut av den fjerne enden. Når magneten nærmer seg, blir feltet sterkere ved den nære enden, og fluksen gjennom spolen (i retning bort fra magneten) øker:
            <InlineLatex latex="\;d\Phi_B/dt>0" />.
          </p>
        </Step>
        <Step n={2} title="Bestem retning på indusert B">
          <p>
            For å motsette seg økningen må indusert B inne i spolen peke <em>mot magneten</em> (motsatt av ytre B-retningen inne i spolen). Dette gjør spolens nære ende til en <em>induserte N-pol</em> — og like poler frastøter hverandre.
          </p>
        </Step>
        <Step n={3} title="Strømretning via høyrehåndsregel">
          <p>
            Sett fra magnetens posisjon ser du inn på spolens åpning. Indusert B peker <em>mot deg</em> (ut av spolens åpning). Tomlen peker mot deg → fingrene krøller <em>mot urviseren</em>. Altså:
          </p>
          <FormulaBox latex="\boxed{\text{Strømmen flyter mot urviseren sett fra magneten.}}" variant="gold" />
        </Step>
        <p>
          <strong>Energibalanse:</strong> Det arbeidet du gjør når du skyver magneten mot den frastøtende spolen omdannes til elektrisk energi i kretsen, som igjen blir varme i motstanden. Jo raskere du skyver, jo større <InlineLatex latex="d\Phi/dt" />, jo større strøm, og jo større motstand du merker.
        </p>
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
        <TheoryBox title="Gjensidig induktans">
          <p>
            Når strøm <InlineLatex latex="I_1" /> går i spole 1, lager den et magnetfelt <InlineLatex latex="\vec B_1\propto I_1" />. En del av dette feltet penetrerer spole 2 og gir en fluks
            <InlineLatex latex="\;\Phi_{21}" />, som også er proporsjonal med <InlineLatex latex="I_1" />. Forholdstallet kalles <em>gjensidig induktans</em> M:
          </p>
          <FormulaBox latex="\Phi_{21}=M\,I_1" variant="blue" />
          <p>
            Faradays lov anvendt på spole 2 blir da (med N2 vindinger inkludert i M):
          </p>
          <FormulaBox latex="\varepsilon_2=-\dfrac{d\Phi_{21}}{dt}=-M\,\dfrac{dI_1}{dt}" variant="blue" />
          <p>
            <strong>Nøkkelinnsikt:</strong> <InlineLatex latex="\varepsilon_2" /> avhenger kun av <em>hvor fort</em> <InlineLatex latex="I_1" /> endres, ikke av verdien av <InlineLatex latex="I_1" /> selv. Konstant strøm gir null EMF.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Bryter slås på">
          <p>
            <InlineLatex latex="I_1" /> stiger raskt fra 0 til <InlineLatex latex="I_0" /> i løpet av kort tid <InlineLatex latex="\Delta t" />. <InlineLatex latex="dI_1/dt>0" /> og er stor — altså stor <InlineLatex latex="\varepsilon_2" />. Fluksen gjennom spole 2 øker, og ved Lenz motvirker indusert strøm i spole 2 denne økningen:
          </p>
          <p>Kort <em>puls</em> i spole 2 i <em>motsatt sirkulasjonsretning</em> av <InlineLatex latex="I_1" />.</p>
        </Step>
        <Step n={2} title="(b) Konstant strøm">
          <p>Når <InlineLatex latex="I_1" /> er konstant, er fluksen <InlineLatex latex="\Phi_{21}" /> også konstant. Faradays lov:</p>
          <FormulaBox latex="\varepsilon_2=-M\cdot 0=0" />
          <p>Galvanometeret viser <strong>null strøm</strong> — selv om det renner stor likestrøm i spole 1.</p>
        </Step>
        <Step n={3} title="(c) Bryter slås av">
          <p>
            <InlineLatex latex="I_1" /> faller brått fra <InlineLatex latex="I_0" /> til 0, så <InlineLatex latex="dI_1/dt<0" /> (stor i absoluttverdi). Fluksen avtar, og Lenz sier at indusert strøm i spole 2 skal motvirke <em>nedgangen</em> — altså prøve å opprettholde fluksen. Derfor går indusert strøm i <em>samme</em> retning som <InlineLatex latex="I_1" /> gikk, og gir en kort puls <em>motsatt</em> av fase (a).
          </p>
        </Step>
        <p>Samlet resultat (gjensidig-induktansformelen):</p>
        <FormulaBox latex="\boxed{\varepsilon_2=-M\,\dfrac{dI_1}{dt}}" variant="gold" />
        <p>
          <strong>Hvorfor vekselstrøm i transformatorer?</strong> Dette forsøket er en mini-transformator. Likestrøm gir EMF kun i korte overgangsøyeblikk — helt ubrukelig til kontinuerlig drift. Vekselstrøm har derimot
          <InlineLatex latex="\;dI_1/dt\neq 0" /> hele tiden, så sekundærkretsen får kontinuerlig spenning. Det er derfor strømnettet bruker AC.
        </p>
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
        <TheoryBox title="Selvinduktans — en spole som induserer seg selv">
          <p>
            Strømmen <InlineLatex latex="I" /> i en spole skaper sitt eget magnetfelt, som igjen gir en fluks <InlineLatex latex="\Phi_B" /> gjennom spolens egne vindinger. Denne egenfluksen er proporsjonal med strømmen:
          </p>
          <FormulaBox latex="N\Phi_B=L\,I" variant="blue" />
          <p>
            <InlineLatex latex="L" /> kalles <em>selvinduktansen</em> og måles i henry (H = V·s/A). Når <InlineLatex latex="I" /> endrer seg, endrer også egenfluksen seg, og Faradays lov gir:
          </p>
          <FormulaBox latex="\varepsilon=-\dfrac{d(N\Phi_B)}{dt}=-L\,\dfrac{dI}{dt}" variant="blue" />
          <p>
            Minustegnet er Lenz igjen: den induserte EMF-en peker slik at den motvirker endringen i strøm. En induktor er derfor «treg» — den prøver alltid å beholde strømmen uendret, akkurat slik masse er treg for endringer i hastighet.
          </p>
        </TheoryBox>
        <Step n={1} title="Sett inn verdier">
          <p>Direkte bruk av formelen med <InlineLatex latex="L=0{,}260\;\text{H}" /> og <InlineLatex latex="dI/dt=0{,}0180\;\text{A/s}" />:</p>
          <FormulaBox latex="|\varepsilon|=L\left|\dfrac{dI}{dt}\right|=0{,}260\cdot 0{,}0180" />
          <FormulaBox latex="\boxed{|\varepsilon|=4{,}68\times 10^{-3}\;\text{V}=4{,}68\;\text{mV}}" variant="gold" />
        </Step>
        <Step n={2} title="Retning og fortegn">
          <p>
            Siden <InlineLatex latex="dI/dt>0" /> (strømmen øker), gir <InlineLatex latex="\varepsilon=-L\,dI/dt" /> en <em>negativ</em> verdi. Dette tolkes fysisk som at mot-EMF-en er polarisert <em>motsatt</em> av strømmens retning — den prøver å bremse økningen.
          </p>
        </Step>
        <p>
          <strong>Mekanisk analogi:</strong> Tenk på L som «masse for strøm». Akkurat som Newtons 2. lov <InlineLatex latex="F=m\,dv/dt" /> beskriver kraft som trengs for å endre hastighet, beskriver
          <InlineLatex latex="\;\varepsilon=L\,dI/dt" /> spenningen som trengs for å endre strøm. Induktorer motvirker raske endringer — derfor brukes de i filtre, strømforsyninger og støydempning.
        </p>
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
        <TheoryBox title="Utledning av L for en solenoide">
          <p>
            Vi starter med Ampères lov anvendt på en lang solenoide (fra kap. 28). Inne i en ideell solenoide med <em>n</em> vindinger per lengdeenhet er feltet uniformt langs aksen:
          </p>
          <FormulaBox latex="B=\mu_0 n I,\quad n=\dfrac{N}{\ell}" variant="blue" />
          <p>
            Fluksen gjennom én vinding (med tverrsnittsareal A):
          </p>
          <FormulaBox latex="\Phi_B=BA=\mu_0\,\dfrac{N}{\ell}\,I\,A" variant="blue" />
          <p>
            Den <em>koblede fluksen</em> gjennom alle N vindinger er N ganger så stor:
          </p>
          <FormulaBox latex="N\Phi_B=\mu_0\,\dfrac{N^2 A}{\ell}\,I" variant="blue" />
          <p>
            Definisjonen <InlineLatex latex="N\Phi_B=LI" /> gir direkte:
          </p>
          <FormulaBox latex="L=\dfrac{\mu_0 N^2 A}{\ell}" variant="blue" />
          <p>
            <strong>Viktig:</strong> L avhenger <em>kun av geometri</em> (N, A, ℓ) og kjernemateriale (<InlineLatex latex="\mu_0" /> erstattes av <InlineLatex latex="\mu" /> for magnetiske kjerner) — ikke av strømmen.
          </p>
        </TheoryBox>
        <Step n={1} title="Formel og innsetting">
          <p>Sett inn <InlineLatex latex="N=300" />, <InlineLatex latex="A=4{,}00\times 10^{-4}\;\text{m}^2" />, <InlineLatex latex="\ell=0{,}120\;\text{m}" /> og <InlineLatex latex="\mu_0=4\pi\times 10^{-7}\;\text{T·m/A}" />:</p>
          <FormulaBox latex="L=\dfrac{\mu_0 N^2 A}{\ell}=\dfrac{(4\pi\times 10^{-7})(300)^2(4{,}00\times 10^{-4})}{0{,}120}" />
        </Step>
        <Step n={2} title="Utregning">
          <p>Beregn <InlineLatex latex="\mu_0=1{,}257\times 10^{-6}" /> og <InlineLatex latex="N^2=9{,}00\times 10^{4}" />:</p>
          <FormulaBox latex="L=\dfrac{(1{,}257\times 10^{-6})(9{,}00\times 10^{4})(4{,}00\times 10^{-4})}{0{,}120}" />
          <FormulaBox latex="L=\dfrac{4{,}524\times 10^{-5}}{0{,}120}" />
          <FormulaBox latex="\boxed{L\approx 3{,}77\times 10^{-4}\;\text{H}=0{,}377\;\text{mH}}" variant="gold" />
        </Step>
        <p>
          <strong>Hvorfor N², ikke bare N?</strong> To effekter multipliseres: (1) dobler du N, blir feltet <InlineLatex latex="B\propto N" /> dobbelt så sterkt, og (2) dobler du N, er det også dobbelt så mange vindinger som «ser» fluksen. Totalt får man en kvadratisk avhengighet. Dette er grunnen til at selv små solenoider med mange vindinger kan ha betydelig induktans, og at en ferromagnetisk kjerne (som øker effektiv <InlineLatex latex="\mu" />) kan gi 1000× forsterkning.
        </p>
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
        <TheoryBox title="Hvorfor ½LI²? — en utledning">
          <p>
            Effekten som leveres til en induktor mens strømmen bygges opp er <InlineLatex latex="P=\varepsilon I=L\,(dI/dt)\,I" />. Dette er ikke konstant — det avhenger av den momentane strømmen. For å finne total energi integrerer vi fra 0 til endelig strøm I:
          </p>
          <FormulaBox latex="U=\int_0^t P\,dt=\int_0^I L\,i\,di=\tfrac{1}{2}L I^2" variant="blue" />
          <p>
            Legg merke til at vi brukte <InlineLatex latex="i\,di=(dI/dt)\,I\,dt" /> for å bytte fra integral over tid til integral over strøm. Resultatet er:
          </p>
          <FormulaBox latex="U=\tfrac{1}{2}L I^2" variant="blue" />
          <p>
            Denne energien er ikke «tapt» — den er lagret i selve magnetfeltet, med energitetthet <InlineLatex latex="u=B^2/(2\mu_0)\;[\text{J/m}^3]" />. Hvis man slår av kretsen, kan energien utvinnes tilbake.
          </p>
        </TheoryBox>
        <p>
          <strong>Analogi med fjær og masse:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-0.5">
          <li>Fjær: <InlineLatex latex="U=\tfrac{1}{2}kx^2" /> (lagret i deformasjon)</li>
          <li>Masse: <InlineLatex latex="K=\tfrac{1}{2}mv^2" /> (lagret i bevegelse)</li>
          <li>Induktor: <InlineLatex latex="U=\tfrac{1}{2}L I^2" /> (lagret i magnetfelt)</li>
        </ul>
        <Step n={1} title="Innsetting">
          <p>Direkte innsetting med <InlineLatex latex="L=2{,}50\;\text{H}" /> og <InlineLatex latex="I=0{,}800\;\text{A}" />:</p>
          <FormulaBox latex="U=\tfrac{1}{2}L I^2=\tfrac{1}{2}(2{,}50)(0{,}800)^2" />
          <FormulaBox latex="U=\tfrac{1}{2}(2{,}50)(0{,}640)=0{,}800\;\text{J}" />
          <FormulaBox latex="\boxed{U=0{,}800\;\text{J}}" variant="gold" />
        </Step>
        <p>
          <strong>Hva skjer hvis du brått åpner kretsen?</strong> Strømmen kan ikke forsvinne momentant (det ville gi uendelig <InlineLatex latex="dI/dt" /> og dermed uendelig EMF). De 0,800 J må gå <em>et sted</em> — derfor ser man gnister over bryteren når man åpner induktive kretser. Dette er prinsippet bak tenningsspoler i bilmotorer.
        </p>
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
        <TheoryBox title="Fra Kirchhoff til eksponensiell løsning">
          <p>
            Kirchhoffs spenningslov rundt kretsen (batteri − motstand − induktor) gir:
          </p>
          <FormulaBox latex="\mathcal E - IR - L\,\dfrac{dI}{dt}=0" variant="blue" />
          <p>
            Vi omformer til standardform for en førsteordens lineær ODE:
          </p>
          <FormulaBox latex="L\,\dfrac{dI}{dt}+RI=\mathcal E" variant="blue" />
          <p>
            Dette er en separabel ligning. Med randbetingelsen <InlineLatex latex="I(0)=0" /> blir løsningen:
          </p>
          <FormulaBox latex="I(t)=\dfrac{\mathcal E}{R}\bigl(1-e^{-t/\tau}\bigr),\quad \tau=\dfrac{L}{R}" variant="blue" />
          <p>
            <strong>Fysisk tolkning:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Ved <InlineLatex latex="t=0" />: induktoren krever ubegrenset motstand mot endring, så <InlineLatex latex="I=0" /> og hele <InlineLatex latex="\mathcal E" /> ligger over induktoren.</li>
            <li>Ved <InlineLatex latex="t\to\infty" />: <InlineLatex latex="dI/dt\to 0" />, induktoren oppfører seg som en ren leder, og all <InlineLatex latex="\mathcal E" /> ligger over R. Da er <InlineLatex latex="I_\infty=\mathcal E/R" />.</li>
            <li>Etter én tidskonstant τ har strømmen nådd <InlineLatex latex="(1-e^{-1})\approx 63\%" /> av endelig verdi; etter 5τ er den over 99%.</li>
          </ul>
        </TheoryBox>
        <Step n={1} title="(a) Endelig strøm">
          <p>I stabil tilstand er <InlineLatex latex="dI/dt=0" />, og induktoren er «usynlig». Ohm: <InlineLatex latex="\mathcal E=I_\infty R" />:</p>
          <FormulaBox latex="I_\infty=\dfrac{\mathcal E}{R}=\dfrac{12{,}0}{4{,}00}=3{,}00\;\text{A}" />
          <FormulaBox latex="\boxed{I_\infty=3{,}00\;\text{A}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Tidskonstant">
          <p>Fra <InlineLatex latex="\tau=L/R" />:</p>
          <FormulaBox latex="\tau=\dfrac{L}{R}=\dfrac{0{,}250}{4{,}00}=0{,}0625\;\text{s}" />
          <FormulaBox latex="\boxed{\tau=62{,}5\;\text{ms}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Strøm ved t = 0,100 s">
          <p>Bruk løsningen <InlineLatex latex="I(t)=I_\infty(1-e^{-t/\tau})" /> og regn ut dimensjonsløst forhold <InlineLatex latex="t/\tau" />:</p>
          <FormulaBox latex="I(t)=I_\infty\bigl(1-e^{-t/\tau}\bigr)" />
          <FormulaBox latex="t/\tau=0{,}100/0{,}0625=1{,}60" />
          <FormulaBox latex="I=3{,}00\cdot(1-e^{-1{,}60})=3{,}00\cdot(1-0{,}2019)" />
          <FormulaBox latex="\boxed{I\approx 2{,}39\;\text{A}}" variant="gold" />
          <p>Altså ca. 79,8% av endelig verdi — konsistent med at 1,6τ ligger mellom 1τ (63%) og 2τ (86%).</p>
        </Step>
        <Step n={4} title="(d) Lagret energi ved stabil tilstand">
          <p>Når strømmen har stabilisert seg, er all energi i induktoren lagret i magnetfeltet. Bruk <InlineLatex latex="U=\tfrac{1}{2}LI^2" /> med <InlineLatex latex="I=I_\infty" />:</p>
          <FormulaBox latex="U=\tfrac{1}{2}L I_\infty^2=\tfrac{1}{2}(0{,}250)(3{,}00)^2=1{,}125\;\text{J}" />
          <FormulaBox latex="\boxed{U\approx 1{,}13\;\text{J}}" variant="gold" />
        </Step>
        <p>
          <strong>Energibalanse i den transient fasen:</strong> Batteriet leverer total energi <InlineLatex latex="\int \mathcal E I\,dt" />. Av dette går 1,13 J til magnetfeltet (lagret i L), mens resten blir varme i R via Joule-oppvarming <InlineLatex latex="\int I^2 R\,dt" />. Alt regnskap stemmer — induksjon skaper ingen energi, den <em>forsinker</em> bare oppbyggingen av strøm.
        </p>
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
        <TheoryBox title="Koblede lover: induksjon + Newton">
          <p>
            Problemet kobler sammen <em>tre</em> fysiske prinsipper til en kjede som gir en differensialligning:
          </p>
          <ol className="list-decimal pl-5 space-y-0.5">
            <li>Bevegelses-EMF: <InlineLatex latex="\varepsilon=BLv" /> (stavens fart gir spenning)</li>
            <li>Ohms lov: <InlineLatex latex="I=\varepsilon/R" /> (spenning driver strøm)</li>
            <li>Kraft på strømleder: <InlineLatex latex="F=BIL" /> (strøm i felt gir kraft)</li>
          </ol>
          <p>Kjeder vi disse sammen får vi kraften direkte som funksjon av farten:</p>
          <FormulaBox latex="F=BIL=B\cdot\dfrac{BLv}{R}\cdot L=\dfrac{B^2L^2}{R}\,v" variant="blue" />
          <p>
            Dette kalles noen ganger «induktiv viskositet» — bremskraften er proporsjonal med farten, akkurat som luftmotstand ved lave farter.
          </p>
        </TheoryBox>
        <p>
          Før vi løser ODE-en, bruker vi lukkede formler for å finne starttilstanden:
        </p>
        <Step n={1} title="(a) Starthastighet-EMF">
          <p>Bruk bevegelses-EMF-formelen direkte med <InlineLatex latex="v=v_0" />:</p>
          <FormulaBox latex="\varepsilon_0=BLv_0=0{,}600\cdot 0{,}500\cdot 4{,}00=1{,}20\;\text{V}" />
          <FormulaBox latex="\boxed{\varepsilon_0=1{,}20\;\text{V}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Startstrøm">
          <p>Ohms lov i den lukkede kretsen:</p>
          <FormulaBox latex="I_0=\dfrac{\varepsilon_0}{R}=\dfrac{1{,}20}{0{,}800}=1{,}50\;\text{A}" />
          <FormulaBox latex="\boxed{I_0=1{,}50\;\text{A}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Startbremskraft">
          <p>Magnetisk kraft på strømførende stav i B-felt (Lenz gir retningen — mot bevegelsen):</p>
          <FormulaBox latex="F_0=BI_0 L=0{,}600\cdot 1{,}50\cdot 0{,}500=0{,}450\;\text{N}" />
          <FormulaBox latex="\boxed{F_0=0{,}450\;\text{N}}" variant="gold" />
        </Step>
        <Step n={4} title="(d) Differensialligning og tidskonstant">
          <p>
            Siden skinnene er friksjonsfrie og det ikke er ytre drivkraft, er den magnetiske bremskraften <em>eneste</em> kraft på staven. Newtons 2. lov (med retning mot bevegelsen = negativ):
          </p>
          <FormulaBox latex="m\dfrac{dv}{dt}=-F=-BIL=-\dfrac{B^2L^2}{R}v" />
          <p>
            Dette er identisk i form med ODE-en for RL-krets (29.51), bare med andre symboler. Omforming gir:
          </p>
          <FormulaBox latex="\dfrac{dv}{v}=-\dfrac{B^2L^2}{mR}\,dt" />
          <p>Integrering fra <InlineLatex latex="v_0" /> til <InlineLatex latex="v(t)" />:</p>
          <FormulaBox latex="v(t)=v_0\,e^{-t/\tau},\quad \tau=\dfrac{mR}{B^2L^2}" />
          <p>Sett inn tallene:</p>
          <FormulaBox latex="\tau=\dfrac{mR}{B^2L^2}=\dfrac{0{,}400\cdot 0{,}800}{(0{,}600)^2(0{,}500)^2}" />
          <FormulaBox latex="\tau=\dfrac{0{,}320}{0{,}0900}\approx 3{,}56\;\text{s}" />
          <FormulaBox latex="\boxed{\tau\approx 3{,}56\;\text{s}}" variant="gold" />
          <p>
            Staven stopper aldri <em>helt</em> (eksponentiell avtagning), men etter <InlineLatex latex="5\tau\approx 18\;\text{s}" /> er farten under 1% av startverdien.
          </p>
        </Step>
        <Step n={5} title="Sjekk energibevaring">
          <p>Kinetisk startenergi:</p>
          <FormulaBox latex="K_0=\tfrac{1}{2}mv_0^2=\tfrac{1}{2}(0{,}400)(4{,}00)^2=3{,}20\;\text{J}" />
          <p>Total dissipert elektrisk energi, ved direkte integral:</p>
          <FormulaBox latex="W=\int_0^{\infty}I^2R\,dt=\int_0^{\infty}\dfrac{B^2L^2 v_0^2}{R}e^{-2t/\tau}\,dt=\dfrac{B^2L^2 v_0^2\,\tau}{2R}=\tfrac{1}{2}mv_0^2" />
          <p>
            Vi bruker at <InlineLatex latex="\tau=mR/(B^2L^2)" />. Resultatet blir eksakt <InlineLatex latex="\tfrac{1}{2}mv_0^2=3{,}20\;\text{J}" />. ✓ All kinetisk energi omdannes til varme i motstanden.
          </p>
        </Step>
        <p>
          <strong>Praktisk relevans:</strong> Dette er fysikken bak virvelstrømbremser (eddy-current brakes) som brukes i tog, trikker, heiser og treningssykler. Fordeler: ingen slitasje (ingen kontaktflater), bremskraften skalerer automatisk med fart, og energien kan om ønsket gjenvinnes (regenerativ bremsing). Ulempe: virker ikke på v = 0, så man trenger mekanisk sluttbrems.
        </p>
      </div>
    ),
    summary: (
      <p>Dette er en praktisk anvendelse: kollokvenesterke elektromagnetiske bremser på tog og heiser. Bremskraften er proporsjonal med fart — stor effekt ved høy fart, mild stopp. Tidskonstanten skalerer med masse og omvendt med <InlineLatex latex="B^2L^2/R" />.</p>
    ),
  },
};
