"use client";

import InlineLatex from "@/components/InlineLatex";
import FormulaBox from "@/components/FormulaBox";
import React from "react";

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
// SVG-helpere
// ============================================================================

function Arrowheads() {
  return (
    <defs>
      <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVER
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // --------------------------------------------------------------------------
  // 21.6 — Like ladninger, finne antall overskuddselektroner
  // --------------------------------------------------------------------------
  "21.6": {
    title: "Antall overskuddselektroner",
    difficulty: "lett",
    pageRef: "s. 737",
    problem: (
      <div className="space-y-2">
        <p>
          To små kuler er plassert <InlineLatex latex="20{,}0\;\text{cm}" /> fra hverandre og har like
          store ladninger. Hvor mange overskuddselektroner må være på hver kule hvis den elektriske
          frastøtningskraften mellom dem har størrelse{" "}
          <InlineLatex latex="3{,}33 \cdot 10^{-21}\;\text{N}" />?
        </p>
        <svg viewBox="0 0 360 120" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <circle cx="70" cy="60" r="18" fill="#3b82f6" />
          <text x="70" y="65" fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <circle cx="290" cy="60" r="18" fill="#3b82f6" />
          <text x="290" y="65" fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <line x1="90" y1="60" x2="270" y2="60" stroke="currentColor" strokeDasharray="4 4" />
          <text x="180" y="50" fontSize="12" textAnchor="middle" fill="currentColor">r = 20,0 cm</text>
          <line x1="50" y1="60" x2="20" y2="60" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <line x1="310" y1="60" x2="340" y2="60" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <text x="35" y="80" fontSize="11" fill="#10b981">F</text>
          <text x="325" y="80" fontSize="11" fill="#10b981">F</text>
          <text x="70" y="100" fontSize="12" textAnchor="middle" fill="currentColor">q</text>
          <text x="290" y="100" fontSize="12" textAnchor="middle" fill="currentColor">q</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Avstand: <InlineLatex latex="r = 20{,}0\;\text{cm} = 0{,}200\;\text{m}" /></li>
        <li>Kraftstørrelse: <InlineLatex latex="F = 3{,}33 \cdot 10^{-21}\;\text{N}" /></li>
        <li>Lik ladning på begge kuler: <InlineLatex latex="q_1 = q_2 = q" /></li>
        <li>Elektronladning: <InlineLatex latex="e = 1{,}602 \cdot 10^{-19}\;\text{C}" /></li>
        <li>Coulombs konstant: <InlineLatex latex="k = 8{,}988 \cdot 10^9\;\text{N}\cdot\text{m}^2/\text{C}^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Antall overskuddselektroner per kule, <InlineLatex latex="N" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk Coulombs lov med <InlineLatex latex="|q_1| = |q_2| = q" /> til å finne ladningen på hver
        kule. Siden vi bare ser på størrelsen av kraften, trenger vi ikke bekymre oss om fortegn.
        Deretter finnes antall elektroner fra <InlineLatex latex="q = N\,e" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Coulombs lov: <InlineLatex latex="F = k\,q^2/r^2" /> når ladningene er like. Løs for{" "}
            <InlineLatex latex="q" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Når du har <InlineLatex latex="q" />, er antall elektroner{" "}
            <InlineLatex latex="N = q/e" />. Sjekk at du får et heltall i størrelsesorden 10¹–10².
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — Coulombs lov:</strong> Den elektrostatiske kraften
          mellom to ladninger i ro er analog med Newtons gravitasjonslov: proporsjonal
          med produktet av de to «kildene» (her ladning, ikke masse) og omvendt
          proporsjonal med kvadratet av avstanden. Den store forskjellen fra
          gravitasjon er at Coulomb-kraften kan ha begge fortegn — like ladninger
          frastøter, ulike tiltrekker. Formuleringen i vektorform med enhetsvektor{" "}
          <InlineLatex latex="\hat r_{12}" /> (fra ladning 1 til ladning 2) koder
          både størrelse og retning:
        </p>
        <FormulaBox latex="\vec F_{12} = \dfrac{k\,q_1 q_2}{r^2}\,\hat r_{12}" variant="blue" />
        <p>
          Her er <InlineLatex latex="k = 8{,}988\cdot10^9\;\text{N}\cdot\text{m}^2/\text{C}^2" />{" "}
          Coulombs konstant. Siden oppgaven kun spør om antall elektroner (ikke
          retning), kan vi jobbe med størrelsen <InlineLatex latex="F" /> og
          utelate <InlineLatex latex="\hat r" />.
        </p>

        <p>
          <strong>Hvorfor Coulomb og ikke noe annet?</strong> Feltet fra én kule sett
          fra den andre er ikke uniformt — det avtar som{" "}
          <InlineLatex latex="1/r^2" />. Derfor kan vi ikke bruke en formel som{" "}
          <InlineLatex latex="F = qE_{\text{uniform}}" /> uten å først regne ut{" "}
          <InlineLatex latex="E = k|q|/r^2" />. Coulombs lov <em>er</em> den direkte
          kraftformelen mellom to punktladninger, så vi bruker den rett.
        </p>

        <p className="font-semibold mt-4">Steg 1: Sett opp Coulombs lov for lik ladning</p>
        <p>
          Begge kulene har samme ladning, så{" "}
          <InlineLatex latex="q_1 = q_2 = q" /> gir{" "}
          <InlineLatex latex="q_1 q_2 = q^2" />. Med kun størrelser blir ligningen:
        </p>
        <FormulaBox latex="F = \dfrac{k\,q^2}{r^2}" variant="blue" />

        <p className="font-semibold mt-4">Steg 2: Algebraisk omforming — løs for q</p>
        <p>
          Vi ønsker <InlineLatex latex="q" /> alene. Multipliser begge sider med{" "}
          <InlineLatex latex="r^2" />, del på <InlineLatex latex="k" />, og ta
          kvadratroten:
        </p>
        <FormulaBox latex="q^2 = \dfrac{F\,r^2}{k} \;\Longrightarrow\; q = r\sqrt{\dfrac{F}{k}}" variant="blue" />

        <p className="font-semibold mt-4">Steg 3: Sett inn tall steg for steg</p>
        <FormulaBox
          latex="q = 0{,}200\sqrt{\frac{3{,}33 \cdot 10^{-21}}{8{,}988 \cdot 10^9}}\;\text{C}"
          variant="blue"
        />
        <FormulaBox
          latex="q = 0{,}200 \cdot \sqrt{3{,}705 \cdot 10^{-31}} = 0{,}200 \cdot 6{,}087 \cdot 10^{-16}\;\text{C}"
          variant="blue"
        />
        <FormulaBox latex="q = 1{,}217 \cdot 10^{-16}\;\text{C}" variant="blue" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\sqrt{\text{N}/(\text{N}\,\text{m}^2/\text{C}^2)} = \text{C}/\text{m}" />,
          ganget med meter gir <InlineLatex latex="\text{C}" />. OK.
        </p>

        <p className="font-semibold mt-4">Steg 4: Ladningskvantisering gir antall elektroner</p>
        <p>
          All ladning er heltallige multipler av elementærladningen{" "}
          <InlineLatex latex="e = 1{,}602\cdot10^{-19}\;\text{C}" />. Siden kulene
          frastøter hverandre og vi skal finne overskuddselektroner, må kulene være
          negativt ladet med samme antall <InlineLatex latex="N" />:
        </p>
        <FormulaBox latex="|q| = N\,e \;\Longrightarrow\; N = \dfrac{|q|}{e}" variant="blue" />
        <FormulaBox
          latex="N = \frac{q}{e} = \frac{1{,}217 \cdot 10^{-16}}{1{,}602 \cdot 10^{-19}} = \boxed{\,760\;\text{elektroner}\,}"
          variant="gold"
        />
        <p>
          <strong>Fysisk tolkning og sammenligning:</strong> Rundt 760
          overskuddselektroner — en utrolig liten ladning (under en billiondels
          coulomb!). Men kraften er likevel målbar fordi{" "}
          <InlineLatex latex="k" /> er stor. Per partikkel er Coulomb ca.{" "}
          <InlineLatex latex="10^{42}" /> ganger sterkere enn gravitasjon. Dette er
          grunnen til at elektrostatikk dominerer all mikroskopisk fysikk, mens
          gravitasjon dominerer på makroskopisk/astronomisk skala (fordi den er
          <em>additiv</em> og aldri kansellerer).
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Når to like ladninger gir en kjent kraft, løser vi Coulombs
        lov for <InlineLatex latex="q" /> og bruker deretter <InlineLatex latex="N = q/e" />. Det
        skal veldig lite ladning til for å gi målbare krefter — derfor er elektrostatikk mye
        sterkere enn gravitasjon per partikkel.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.9 — To plastkuler med positiv ladning
  // --------------------------------------------------------------------------
  "21.9": {
    title: "Ladning på to plastkuler",
    difficulty: "lett",
    pageRef: "s. 737",
    problem: (
      <div className="space-y-2">
        <p>
          To små plastkuler er gitt positive elektriske ladninger. Når avstanden er{" "}
          <InlineLatex latex="15{,}4\;\text{cm}" /> er den frastøtende kraften mellom dem{" "}
          <InlineLatex latex="0{,}205\;\text{N}" />. Hva er ladningen på hver kule{" "}
          <strong>(a)</strong> hvis ladningene er like, og <strong>(b)</strong> hvis den ene kulen har
          fire ganger så stor ladning som den andre?
        </p>
        <svg viewBox="0 0 360 100" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <circle cx="70" cy="50" r="18" fill="#ef4444" />
          <text x="70" y="56" fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <circle cx="290" cy="50" r="18" fill="#ef4444" />
          <text x="290" y="56" fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <line x1="90" y1="50" x2="270" y2="50" stroke="currentColor" strokeDasharray="4 4" />
          <text x="180" y="40" fontSize="12" textAnchor="middle" fill="currentColor">15,4 cm</text>
          <line x1="50" y1="50" x2="20" y2="50" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <line x1="310" y1="50" x2="340" y2="50" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <text x="180" y="85" fontSize="12" textAnchor="middle" fill="#10b981">F = 0,205 N</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Avstand: <InlineLatex latex="r = 15{,}4\;\text{cm} = 0{,}154\;\text{m}" /></li>
        <li>Kraft: <InlineLatex latex="F = 0{,}205\;\text{N}" /></li>
        <li>Begge ladninger positive</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Lik ladning <InlineLatex latex="q" /></li>
        <li>(b) To ulike ladninger der <InlineLatex latex="q_2 = 4q_1" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk Coulombs lov i begge tilfeller. I (a) er begge ladningene like. I (b) erstatt{" "}
        <InlineLatex latex="q_1 q_2 = q_1(4q_1) = 4q_1^2" /> og løs for <InlineLatex latex="q_1" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Pass på: tilfellene (a) og (b) gir ulik formel. I (a) er produktet{" "}
            <InlineLatex latex="q^2" />, i (b) er det <InlineLatex latex="4q_1^2" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Den samme totale kraften betyr at produktet <InlineLatex latex="q_1 q_2" /> er det samme i
            begge tilfeller. Derfor blir <InlineLatex latex="q_1" /> mindre i (b).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn:</strong> Coulombs lov kobler <em>produktet</em> av
          de to ladningene til kraften — ikke ladningene enkeltvis. Det er en
          veldig viktig observasjon: hvis vi kjenner en <em>sammenheng</em> mellom
          ladningene (f.eks. at de er like eller at en er fire ganger den andre),
          kan vi uttrykke produktet ved bare én ukjent og løse.
        </p>
        <FormulaBox latex="F = \dfrac{k\,|q_1 q_2|}{r^2}" variant="blue" />
        <p>
          <strong>Hvorfor denne formelen?</strong> Punktladninger med kjent avstand
          → bruk Coulomb direkte. Vi kan ikke bruke <InlineLatex latex="F = qE" /> med
          et uniformt felt her, fordi feltet fra en punktladning er radielt og
          avtar som <InlineLatex latex="1/r^2" />. Vi kunne i prinsippet sagt{" "}
          <InlineLatex latex="F = q_1 E_2" /> der{" "}
          <InlineLatex latex="E_2 = kq_2/r^2" />, men det gir nøyaktig samme
          ligning — Coulomb er en snarvei.
        </p>

        <p className="font-semibold mt-4">(a) Like ladninger</p>
        <p>
          Setter <InlineLatex latex="q_1 = q_2 = q" /> slik at{" "}
          <InlineLatex latex="q_1 q_2 = q^2" />. Algebraisk omforming (gang med{" "}
          <InlineLatex latex="r^2" />, del på <InlineLatex latex="k" />, ta
          kvadratrot):
        </p>
        <FormulaBox
          latex="F = \frac{k\,q^2}{r^2} \quad\Longrightarrow\quad q = r\sqrt{\frac{F}{k}}"
          variant="blue"
        />
        <FormulaBox
          latex="q = 0{,}154\sqrt{\frac{0{,}205}{8{,}988 \cdot 10^9}}\;\text{C} = 0{,}154 \cdot 4{,}776 \cdot 10^{-6}"
          variant="blue"
        />
        <FormulaBox latex="\boxed{\,q = 7{,}35 \cdot 10^{-7}\;\text{C} = 0{,}735\;\mu\text{C}\,}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{m}\sqrt{\text{N}/(\text{N}\,\text{m}^2/\text{C}^2)} = \text{C}" />. OK.
        </p>

        <p className="font-semibold mt-4">(b) Ulike ladninger, <InlineLatex latex="q_2 = 4q_1" /></p>
        <p>
          Nå er produktet <InlineLatex latex="q_1 q_2 = q_1\cdot(4q_1) = 4q_1^2" />.
          Coulombs lov blir:
        </p>
        <FormulaBox
          latex="F = \frac{k\,(4 q_1^2)}{r^2}"
          variant="blue"
        />
        <p>
          Løser for <InlineLatex latex="q_1" />: <InlineLatex latex="q_1^2 = F r^2/(4k)" />,
          så <InlineLatex latex="q_1 = \tfrac{r}{2}\sqrt{F/k}" />. Sammenligner vi
          med (a), ser vi at <InlineLatex latex="q_1 = \tfrac{1}{2}q_{(a)}" />:
        </p>
        <FormulaBox
          latex="F = \frac{k\,(4 q_1^2)}{r^2} \quad\Longrightarrow\quad q_1 = \tfrac{1}{2}\,r\sqrt{\frac{F}{k}} = \tfrac{1}{2}\,q_{(a)}"
          variant="blue"
        />
        <FormulaBox
          latex="q_1 = \tfrac{1}{2}\cdot 7{,}35 \cdot 10^{-7}\;\text{C} = \boxed{\,3{,}68 \cdot 10^{-7}\;\text{C}\,}"
          variant="gold"
        />
        <FormulaBox
          latex="q_2 = 4q_1 = \boxed{\,1{,}47 \cdot 10^{-6}\;\text{C} = 1{,}47\;\mu\text{C}\,}"
          variant="gold"
        />
        <p>
          <strong>Fysisk tolkning:</strong> Legg merke til at produktet{" "}
          <InlineLatex latex="q_1 q_2 = 4q_1^2 = 4(3{,}68\cdot10^{-7})^2 = 5{,}42\cdot10^{-13}\;\text{C}^2" />,
          samme som i (a) der <InlineLatex latex="q^2 = (7{,}35\cdot10^{-7})^2 = 5{,}40\cdot10^{-13}\;\text{C}^2" />.
          Kraften er lik når <em>produktet</em> er likt, uavhengig av fordelingen.
          En liten og en stor ladning gir samme kraft som to middelsstore hvis
          produktet stemmer.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Coulombs lov kobler sammen produktet{" "}
        <InlineLatex latex="q_1 q_2" />, ikke ladningene separat. Hvis vi kjenner forholdet mellom
        dem, kan vi skrive produktet som en funksjon av én ukjent og løse.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.13 — Tre ladninger på en linje, null netto kraft
  // --------------------------------------------------------------------------
  "21.13": {
    title: "Tre ladninger på linje — netto kraft null",
    difficulty: "middels",
    pageRef: "s. 737",
    problem: (
      <div className="space-y-2">
        <p>
          Tre punktladninger er ordnet på en linje. Ladningen{" "}
          <InlineLatex latex="q_3 = +5{,}00\;\text{nC}" /> ligger i origo. Ladningen{" "}
          <InlineLatex latex="q_2 = -2{,}00\;\text{nC}" /> ligger i <InlineLatex latex="x = +3{,}50\;\text{cm}" />.{" "}
          Ladningen <InlineLatex latex="q_1" /> ligger i <InlineLatex latex="x = +2{,}00\;\text{cm}" />.
          Hva er <InlineLatex latex="q_1" /> (størrelse og fortegn) hvis netto kraft på{" "}
          <InlineLatex latex="q_3" /> er null?
        </p>
        <svg viewBox="0 0 380 100" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <line x1="30" y1="60" x2="360" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="350" y1="55" x2="360" y2="60" stroke="currentColor" />
          <line x1="350" y1="65" x2="360" y2="60" stroke="currentColor" />
          <text x="355" y="78" fontSize="11" fill="currentColor">x</text>
          {/* q3 at origin */}
          <circle cx="60" cy="60" r="12" fill="#ef4444" />
          <text x="60" y="64" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="60" y="38" fontSize="11" textAnchor="middle" fill="currentColor">q₃ = +5 nC</text>
          <text x="60" y="92" fontSize="10" textAnchor="middle" fill="currentColor">x = 0</text>
          {/* q1 */}
          <circle cx="180" cy="60" r="12" fill="#a855f7" />
          <text x="180" y="64" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">?</text>
          <text x="180" y="38" fontSize="11" textAnchor="middle" fill="currentColor">q₁</text>
          <text x="180" y="92" fontSize="10" textAnchor="middle" fill="currentColor">x = 2,00 cm</text>
          {/* q2 */}
          <circle cx="270" cy="60" r="12" fill="#3b82f6" />
          <text x="270" y="64" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="270" y="38" fontSize="11" textAnchor="middle" fill="currentColor">q₂ = −2 nC</text>
          <text x="270" y="92" fontSize="10" textAnchor="middle" fill="currentColor">x = 3,50 cm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_3 = +5{,}00\;\text{nC}" /> i origo</li>
        <li><InlineLatex latex="q_2 = -2{,}00\;\text{nC}" /> i <InlineLatex latex="x = 3{,}50\;\text{cm}" /></li>
        <li><InlineLatex latex="q_1" /> ligger i <InlineLatex latex="x = 2{,}00\;\text{cm}" /></li>
        <li>Netto kraft på <InlineLatex latex="q_3" /> er null</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Ladning <InlineLatex latex="q_1" /> (størrelse og fortegn)</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        For at netto kraft på <InlineLatex latex="q_3" /> skal være null, må kraften fra{" "}
        <InlineLatex latex="q_1" /> oppheve kraften fra <InlineLatex latex="q_2" />. Siden{" "}
        <InlineLatex latex="q_2" /> er negativ, trekker den <InlineLatex latex="q_3" /> i +x. Da må
        <InlineLatex latex="\,q_1" /> skyve <InlineLatex latex="q_3" /> i −x, dvs. bort fra{" "}
        <InlineLatex latex="q_1" />. Det betyr at <InlineLatex latex="q_1" /> må være positiv.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Tegn kraftvektorene: <InlineLatex latex="q_2" /> (negativ) tiltrekker{" "}
            <InlineLatex latex="q_3" /> (positiv) mot seg selv, altså i positiv x-retning.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            For at krefter på <InlineLatex latex="q_3" /> skal kansellere: sett{" "}
            <InlineLatex latex="F_1 = F_2" />:{" "}
            <InlineLatex latex="\tfrac{k\,|q_1 q_3|}{r_1^2} = \tfrac{k\,|q_2 q_3|}{r_2^2}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — superposisjonsprinsippet:</strong> Den totale
          elektriske kraften på en ladning er <em>vektorsummen</em> av kreftene fra
          alle andre ladninger. Coulombs lov er lineær i ladningene, så bidragene
          kan adderes uavhengig av hverandre. Dette er byggesteinen i all
          elektrostatikk med flere ladninger.
        </p>
        <FormulaBox latex="\vec F_{\text{tot}} = \sum_i \vec F_i,\quad \vec F_i = \dfrac{k\,q_i q}{r_i^2}\,\hat r_i" variant="blue" />
        <p>
          <strong>Hvorfor superposisjon og ikke bare Coulomb direkte?</strong> Fordi
          det er mer enn to ladninger. For likevekt (null netto kraft) må bidragene
          oppheve hverandre, så vi trenger både <em>retningsanalyse</em> (fortegn)
          og <em>størrelseslikhet</em> (moduler).
        </p>

        <p className="font-semibold mt-4">Steg 1: Retningsanalyse — hvilket fortegn må <InlineLatex latex="q_1" /> ha?</p>
        <p>
          <InlineLatex latex="q_2" /> (negativ) ligger til høyre for{" "}
          <InlineLatex latex="q_3" /> (positiv). Motsatte ladninger tiltrekker
          hverandre, så kraften på <InlineLatex latex="q_3" /> fra{" "}
          <InlineLatex latex="q_2" /> peker <em>mot</em>{" "}
          <InlineLatex latex="q_2" />, dvs. i +x-retning. For at netto kraft skal
          bli null må kraften fra <InlineLatex latex="q_1" /> peke i −x.{" "}
          <InlineLatex latex="q_1" /> ligger også til høyre for{" "}
          <InlineLatex latex="q_3" />. For at den skal <em>skyve</em>{" "}
          <InlineLatex latex="q_3" /> mot −x (bort fra <InlineLatex latex="q_1" />),
          må den <em>frastøte</em> → <InlineLatex latex="q_1" /> må være
          <strong> positiv</strong> (samme fortegn som <InlineLatex latex="q_3" />).
        </p>

        <p className="font-semibold mt-4">Steg 2: Størrelseslikhet</p>
        <p>
          For at kreftene skal kansellere må størrelsene være like. Bruk Coulombs
          lov for begge bidrag:
        </p>
        <FormulaBox
          latex="\frac{k\,|q_1|\,|q_3|}{r_1^2} = \frac{k\,|q_2|\,|q_3|}{r_2^2}"
          variant="blue"
        />
        <p>
          <InlineLatex latex="k" /> og <InlineLatex latex="|q_3|" /> står på begge
          sider — de kansellerer. Det viser en generell regel: den testede
          ladningen (<InlineLatex latex="q_3" />) forsvinner fra likevektsbetingelsen.
          Omform algebraisk for <InlineLatex latex="|q_1|" />:
        </p>
        <FormulaBox
          latex="|q_1| = |q_2|\left(\frac{r_1}{r_2}\right)^2"
          variant="blue"
        />
        <p>
          Avstander: <InlineLatex latex="r_1 = 2{,}00\;\text{cm} = 0{,}0200\;\text{m}" />{" "}
          (fra <InlineLatex latex="q_3" /> i origo til <InlineLatex latex="q_1" />),{" "}
          <InlineLatex latex="r_2 = 3{,}50\;\text{cm} = 0{,}0350\;\text{m}" />.
        </p>
        <FormulaBox
          latex="|q_1| = 2{,}00\;\text{nC} \cdot \left(\frac{0{,}020}{0{,}035}\right)^2"
          variant="blue"
        />
        <FormulaBox
          latex="|q_1| = 2{,}00 \cdot (0{,}5714)^2 = 2{,}00 \cdot 0{,}3265 = 0{,}653\;\text{nC}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: Kombiner fortegn og størrelse</p>
        <FormulaBox
          latex="\boxed{\;q_1 = +0{,}653\;\text{nC}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Krysssjekk: <InlineLatex latex="q_1" /> er mindre i størrelse enn{" "}
          <InlineLatex latex="q_2" /> fordi den står nærmere{" "}
          <InlineLatex latex="q_3" />. Coulombs <InlineLatex latex="1/r^2" /> gjør
          at nærmere kilde trenger mindre ladning for samme kraft — konsistent med
          forholdet <InlineLatex latex="(r_1/r_2)^2 \approx 0{,}33" />.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> For likevekt på en ladning må vi balansere både{" "}
        <em>størrelse</em> og <em>retning</em> på kreftene. Retning gir fortegnet; størrelse gir
        forholdet mellom ladningene fra <InlineLatex latex="F \propto q/r^2" />.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.16 — Tre ladninger på x-aksen, finne posisjon
  // --------------------------------------------------------------------------
  "21.16": {
    title: "Finn posisjon til q₃",
    difficulty: "middels",
    pageRef: "s. 737",
    problem: (
      <div className="space-y-2">
        <p>
          Tre punktladninger er plassert langs x-aksen. Ladningen{" "}
          <InlineLatex latex="q_1 = +3{,}00\;\mu\text{C}" /> er i origo,{" "}
          <InlineLatex latex="q_2 = -5{,}00\;\mu\text{C}" /> ligger i{" "}
          <InlineLatex latex="x = 0{,}200\;\text{m}" /> og{" "}
          <InlineLatex latex="q_3 = -8{,}00\;\mu\text{C}" />. Hvor ligger{" "}
          <InlineLatex latex="q_3" /> hvis netto kraft på <InlineLatex latex="q_1" /> er{" "}
          <InlineLatex latex="7{,}00\;\text{N}" /> i −x-retning?
        </p>
        <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <line x1="20" y1="60" x2="380" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="370" y1="55" x2="380" y2="60" stroke="currentColor" />
          <line x1="370" y1="65" x2="380" y2="60" stroke="currentColor" />
          <text x="375" y="78" fontSize="11" fill="currentColor">x</text>
          {/* q1 */}
          <circle cx="80" cy="60" r="12" fill="#ef4444" />
          <text x="80" y="64" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="80" y="40" fontSize="10" textAnchor="middle" fill="currentColor">q₁ = +3 μC</text>
          <text x="80" y="92" fontSize="10" textAnchor="middle" fill="currentColor">x = 0</text>
          {/* q2 */}
          <circle cx="240" cy="60" r="12" fill="#3b82f6" />
          <text x="240" y="64" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="240" y="40" fontSize="10" textAnchor="middle" fill="currentColor">q₂ = −5 μC</text>
          <text x="240" y="92" fontSize="10" textAnchor="middle" fill="currentColor">x = 0,200 m</text>
          {/* q3 at unknown x < 0 */}
          <circle cx="40" cy="60" r="10" fill="#3b82f6" opacity="0.5" strokeDasharray="2 2" stroke="currentColor" />
          <text x="40" y="40" fontSize="10" textAnchor="middle" fill="currentColor">q₃ = −8 μC?</text>
          <text x="40" y="92" fontSize="10" textAnchor="middle" fill="currentColor">x = ?</text>
          {/* Force arrow on q1 */}
          <line x1="80" y1="60" x2="20" y2="60" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <text x="50" y="54" fontSize="10" fill="#10b981">F = 7 N</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = +3{,}00\;\mu\text{C}" /> i origo</li>
        <li><InlineLatex latex="q_2 = -5{,}00\;\mu\text{C}" /> i <InlineLatex latex="x = 0{,}200\;\text{m}" /></li>
        <li><InlineLatex latex="q_3 = -8{,}00\;\mu\text{C}" /> i ukjent posisjon <InlineLatex latex="x_3" /></li>
        <li>Netto kraft på <InlineLatex latex="q_1" /> er <InlineLatex latex="7{,}00\;\text{N}" /> i −x</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Posisjonen <InlineLatex latex="x_3" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Kraften fra <InlineLatex latex="q_2" /> (−) på <InlineLatex latex="q_1" /> (+) er
        tiltrekkende → peker i +x. Vi må beregne den. For at summen skal bli 7,00 N i −x må
        <InlineLatex latex="\,q_3" /> bidra med en kraft i −x som er stor nok. Siden{" "}
        <InlineLatex latex="q_3" /> er negativ og skal dra <InlineLatex latex="q_1" /> i −x, må{" "}
        <InlineLatex latex="q_3" /> ligge på <strong>negativ x-aksen</strong>.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Regn først ut <InlineLatex latex="F_{21}" /> (fra <InlineLatex latex="q_2" /> på{" "}
            <InlineLatex latex="q_1" />) med Coulombs lov. Den peker mot positiv x.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            La <InlineLatex latex="x_3 < 0" />. Da har kraften fra <InlineLatex latex="q_3" /> på{" "}
            <InlineLatex latex="q_1" /> størrelse <InlineLatex latex="k|q_1 q_3|/x_3^2" /> og peker i
            −x. Sett opp likningen for netto kraft og løs for <InlineLatex latex="|x_3|" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn:</strong> Tre punktladninger på en rett linje er en
          ren 1D-oppgave. Superposisjon: netto kraft på{" "}
          <InlineLatex latex="q_1" /> er summen av kraftene fra{" "}
          <InlineLatex latex="q_2" /> og <InlineLatex latex="q_3" />. Vi jobber
          konsekvent med fortegn (positiv x-retning = positiv kraft).
        </p>
        <FormulaBox latex="\vec F_{\text{tot},1} = \vec F_{21} + \vec F_{31}" variant="blue" />
        <p>
          <strong>Hvorfor Coulomb og ikke et uniformt felt?</strong> Vi har
          punktladninger på kjente posisjoner. Coulomb gir direkte kraft på{" "}
          <InlineLatex latex="q_1" />. En «<InlineLatex latex="F = qE" />» med
          uniformt felt ville vært feil — feltet er ikke uniformt, det avtar som{" "}
          <InlineLatex latex="1/r^2" /> bort fra hver kilde.
        </p>

        <p className="font-semibold mt-4">Steg 1: Retning og kraft fra <InlineLatex latex="q_2" /></p>
        <p>
          <InlineLatex latex="q_2" /> (negativ) ligger til høyre for{" "}
          <InlineLatex latex="q_1" /> (positiv) — motsatte fortegn tiltrekker, så
          kraften på <InlineLatex latex="q_1" /> peker mot{" "}
          <InlineLatex latex="q_2" />, dvs. i +x-retning. Størrelsen fra Coulomb:
        </p>
        <FormulaBox latex="F_{21} = \dfrac{k\,|q_1 q_2|}{r_{12}^2}" variant="blue" />
        <FormulaBox
          latex="F_{21} = \frac{(8{,}988 \cdot 10^9)(3{,}00 \cdot 10^{-6})(5{,}00 \cdot 10^{-6})}{(0{,}200)^2}"
          variant="blue"
        />
        <FormulaBox
          latex="F_{21} = \frac{0{,}1348}{0{,}0400} = 3{,}37\;\text{N} \quad (\text{i }+x)"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 2: Retning for <InlineLatex latex="q_3" /> og superposisjon</p>
        <p>
          Vi vet nettokraften skal være 7,00 N i −x. Siden{" "}
          <InlineLatex latex="F_{21}" /> bidrar i +x, må{" "}
          <InlineLatex latex="F_{31}" /> peke i −x og være <em>større enn</em>{" "}
          <InlineLatex latex="F_{21}" /> i størrelse. Skriv fortegnsligning langs
          x-aksen (ta +x positivt):
        </p>
        <FormulaBox
          latex="F_{\text{netto},x} = F_{21,x} + F_{31,x} = -7{,}00\;\text{N}"
          variant="blue"
        />
        <p>
          Med <InlineLatex latex="F_{21,x} = +3{,}37" /> og{" "}
          <InlineLatex latex="F_{31,x} = -F_{31}" /> (ukjent størrelse, negativ
          fortegn fordi retningen er −x):
        </p>
        <FormulaBox
          latex="3{,}37 - F_{31} = -7{,}00 \;\Longleftrightarrow\; F_{31} = 7{,}00 + 3{,}37 = 10{,}37\;\text{N}"
          variant="blue"
        />
        <p>
          <strong>Hvor er <InlineLatex latex="q_3" />?</strong>{" "}
          <InlineLatex latex="q_3" /> er negativ; for at den skal <em>dra</em>{" "}
          <InlineLatex latex="q_1" /> (+) i −x-retning, må{" "}
          <InlineLatex latex="q_3" /> ligge til venstre for <InlineLatex latex="q_1" />,
          dvs. ved <InlineLatex latex="x_3 < 0" />.
        </p>

        <p className="font-semibold mt-4">Steg 3: Løs Coulomb for avstanden</p>
        <p>
          Avstanden fra <InlineLatex latex="q_1" /> (origo) til{" "}
          <InlineLatex latex="q_3" /> er <InlineLatex latex="|x_3|" />. Coulomb gir:
        </p>
        <FormulaBox
          latex="F_{31} = \frac{k\,|q_1 q_3|}{x_3^2} \;\Longrightarrow\; x_3^2 = \frac{k\,|q_1 q_3|}{F_{31}}"
          variant="blue"
        />
        <FormulaBox
          latex="x_3^2 = \frac{(8{,}988\cdot10^9)(3{,}00\cdot10^{-6})(8{,}00\cdot10^{-6})}{10{,}37} = \frac{0{,}2157}{10{,}37} = 0{,}02080\;\text{m}^2"
          variant="blue"
        />
        <FormulaBox
          latex="|x_3| = \sqrt{0{,}02080} = 0{,}1442\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;x_3 = -0{,}144\;\text{m} = -14{,}4\;\text{cm}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Krysssjekk: <InlineLatex latex="q_3" /> må ligge 14,4 cm til venstre for
          origo. Fornuftig: <InlineLatex latex="q_3" /> har større størrelse enn{" "}
          <InlineLatex latex="q_2" /> (8 vs. 5 μC), men må overvinne både
          avstandsulempen og tillegget på 7 N, så den trenger ikke ligge så langt
          unna.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Når vi har flere ladninger og en gitt resultantkraft, er
        strategien: 1) finn kraftene vi kjenner, 2) finn ut hvilken retning den ukjente må ha,{" "}
        3) bruk superposisjon for å få én likning med én ukjent.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.17 — Tre ladninger på y-aksen
  // --------------------------------------------------------------------------
  "21.17": {
    title: "Netto kraft fra to ladninger på y-aksen",
    difficulty: "middels",
    pageRef: "s. 737",
    problem: (
      <div className="space-y-2">
        <p>
          To punktladninger ligger på y-aksen: <InlineLatex latex="q_1 = -1{,}80\;\text{nC}" /> i{" "}
          <InlineLatex latex="y = -0{,}575\;\text{m}" /> og{" "}
          <InlineLatex latex="q_2 = +3{,}20\;\text{nC}" /> i origo. Finn total kraft (størrelse og
          retning) på en tredje ladning <InlineLatex latex="q_3 = +5{,}35\;\text{nC}" /> i{" "}
          <InlineLatex latex="y = -0{,}420\;\text{m}" />.
        </p>
        <svg viewBox="0 0 260 320" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <line x1="130" y1="20" x2="130" y2="300" stroke="currentColor" strokeWidth="1" />
          <line x1="125" y1="30" x2="130" y2="20" stroke="currentColor" />
          <line x1="135" y1="30" x2="130" y2="20" stroke="currentColor" />
          <text x="148" y="25" fontSize="11" fill="currentColor">y</text>
          {/* q2 at origin (y=0 middle) */}
          <circle cx="130" cy="140" r="12" fill="#ef4444" />
          <text x="130" y="144" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="160" y="144" fontSize="10" fill="currentColor">q₂ = +3,2 nC</text>
          <text x="160" y="156" fontSize="10" fill="currentColor">y = 0</text>
          {/* q3 below q2 */}
          <circle cx="130" cy="210" r="12" fill="#ef4444" />
          <text x="130" y="214" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="160" y="210" fontSize="10" fill="currentColor">q₃ = +5,35 nC</text>
          <text x="160" y="222" fontSize="10" fill="currentColor">y = −0,420 m</text>
          {/* q1 below q3 */}
          <circle cx="130" cy="280" r="12" fill="#3b82f6" />
          <text x="130" y="284" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="160" y="280" fontSize="10" fill="currentColor">q₁ = −1,8 nC</text>
          <text x="160" y="292" fontSize="10" fill="currentColor">y = −0,575 m</text>
          {/* Forces on q3 */}
          <line x1="130" y1="224" x2="130" y2="260" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <text x="95" y="246" fontSize="10" fill="#10b981">F₁</text>
          <line x1="130" y1="196" x2="130" y2="170" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <text x="95" y="186" fontSize="10" fill="#10b981">F₂</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = -1{,}80\;\text{nC}" /> i <InlineLatex latex="y=-0{,}575\;\text{m}" /></li>
        <li><InlineLatex latex="q_2 = +3{,}20\;\text{nC}" /> i <InlineLatex latex="y=0" /></li>
        <li><InlineLatex latex="q_3 = +5{,}35\;\text{nC}" /> i <InlineLatex latex="y=-0{,}420\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Netto kraft (størrelse og retning) på <InlineLatex latex="q_3" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Alt ligger på y-aksen, så kreftene er 1-dimensjonale. Finn avstanden fra{" "}
        <InlineLatex latex="q_1" /> og <InlineLatex latex="q_2" /> til <InlineLatex latex="q_3" />.
        Deretter: <InlineLatex latex="q_2" /> (+) frastøter <InlineLatex latex="q_3" /> (+) → kraft
        nedover; <InlineLatex latex="q_1" /> (−) tiltrekker <InlineLatex latex="q_3" /> (+) → også
        nedover. Begge krefter peker i −y.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Avstander: <InlineLatex latex="r_{23} = 0{,}420\;\text{m}" /> og{" "}
            <InlineLatex latex="r_{13} = 0{,}575 - 0{,}420 = 0{,}155\;\text{m}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Begge krefter peker samme retning (−y), så vi kan addere størrelsene direkte.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn:</strong> Når alle ladningene ligger på én akse,
          reduseres vektorsummen til en algebraisk sum av fortegnsbestemte
          skalarer. Superposisjonsprinsippet gjelder fortsatt: total kraft er
          summen av parvise Coulomb-krefter.
        </p>
        <FormulaBox latex="\vec F_{\text{tot},3} = \vec F_{13} + \vec F_{23},\quad F_{i3} = \dfrac{k\,|q_i q_3|}{r_{i3}^2}" variant="blue" />
        <p>
          <strong>Hvorfor Coulomb og ikke <InlineLatex latex="F = qE" />?</strong>{" "}
          Vi har to punktladninger, ikke et uniformt felt. Vi kunne regnet ut{" "}
          <InlineLatex latex="E_1" /> og <InlineLatex latex="E_2" /> på plasseringen
          til <InlineLatex latex="q_3" />, addert vektorielt og så brukt{" "}
          <InlineLatex latex="F = q_3 E" />. Det gir samme resultat og er et godt
          alternativ, men her er Coulomb direkte like raskt.
        </p>

        <p className="font-semibold mt-4">Steg 1: Avstander fra geometrien</p>
        <FormulaBox latex="r_{23} = |0 - (-0{,}420)| = 0{,}420\;\text{m}" variant="blue" />
        <FormulaBox latex="r_{13} = |-0{,}575 - (-0{,}420)| = 0{,}155\;\text{m}" variant="blue" />

        <p className="font-semibold mt-4">Steg 2: Retningsanalyse før tall</p>
        <p>
          <InlineLatex latex="q_3" /> ligger ved{" "}
          <InlineLatex latex="y = -0{,}420\;\text{m}" />. <InlineLatex latex="q_2" />{" "}
          (+) er over (i origo) og <em>frastøter</em>{" "}
          <InlineLatex latex="q_3" /> (+) → kraft på <InlineLatex latex="q_3" />{" "}
          peker bort fra <InlineLatex latex="q_2" />, dvs. nedover (−y).{" "}
          <InlineLatex latex="q_1" /> (−) er enda lenger nede og{" "}
          <em>tiltrekker</em> <InlineLatex latex="q_3" /> (+) → kraft også nedover
          (−y). Begge bidrag peker altså samme vei, så vi kan addere størrelsene
          direkte.
        </p>

        <p className="font-semibold mt-4">Steg 3: Regn ut hver kraftstørrelse</p>
        <FormulaBox
          latex="F_2 = \frac{k\,|q_2 q_3|}{r_{23}^2} = \frac{(8{,}988\cdot 10^9)(3{,}20\cdot 10^{-9})(5{,}35\cdot 10^{-9})}{(0{,}420)^2}"
          variant="blue"
        />
        <FormulaBox latex="F_2 = \frac{1{,}539\cdot 10^{-7}}{0{,}1764} = 8{,}72\cdot 10^{-7}\;\text{N}" variant="blue" />
        <FormulaBox
          latex="F_1 = \frac{k\,|q_1 q_3|}{r_{13}^2} = \frac{(8{,}988\cdot 10^9)(1{,}80\cdot 10^{-9})(5{,}35\cdot 10^{-9})}{(0{,}155)^2}"
          variant="blue"
        />
        <FormulaBox latex="F_1 = \frac{8{,}656\cdot 10^{-8}}{0{,}02403} = 3{,}602\cdot 10^{-6}\;\text{N}" variant="blue" />

        <p className="font-semibold mt-4">Steg 4: Vektorsum (1D)</p>
        <p>
          Begge krefter peker i −y, så netto størrelse er summen:
        </p>
        <FormulaBox
          latex="F_{\text{netto}} = F_1 + F_2 = 3{,}602\cdot 10^{-6} + 0{,}872\cdot 10^{-6} = \boxed{\;4{,}47\cdot 10^{-6}\;\text{N}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Retning: nedover (−y). Krysssjekk: <InlineLatex latex="F_1" /> dominerer
          sterkt (faktor ca. 4) fordi <InlineLatex latex="r_{13}" /> er mye
          kortere enn <InlineLatex latex="r_{23}" /> — <InlineLatex latex="1/r^2" />
          straffer avstand hardt. Selv om <InlineLatex latex="q_1" /> er mindre enn{" "}
          <InlineLatex latex="q_2" />, veier avstandsforskjellen tyngre.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Når alle ladninger ligger på én akse, reduseres Coulombs lov
        til en 1D-sum av fortegnsbestemte krefter. Sjekk alltid retning grafisk før du slår sammen.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.18 — DNA-binding (Thymine-Adenin)
  // --------------------------------------------------------------------------
  "21.18": {
    title: "Baseparing i DNA — thymin og adenin",
    difficulty: "vanskelig",
    pageRef: "s. 737",
    problem: (
      <div className="space-y-2">
        <p>
          De to sidene i DNA-dobbelthelixen bindes sammen av basepar (adenin–thymin og cytosin–guanin).
          Figur E21.18 viser bindingen mellom thymin og adenin. Hver ladning er{" "}
          <InlineLatex latex="\pm e" />, og avstanden H–N er <InlineLatex latex="0{,}110\;\text{nm}" />.
        </p>
        <p>
          <strong>(a)</strong> Beregn netto kraft thymin utøver på adenin. Er den tiltrekkende eller
          frastøtende? Vurder kun kreftene fra O–H–N og N–H–N (antatt parallelle). Husk at i O–H–N
          virker <InlineLatex latex="O^-" /> på både <InlineLatex latex="H^+" /> og{" "}
          <InlineLatex latex="N^-" />, og tilsvarende for N–H–N.
        </p>
        <p>
          <strong>(b)</strong> Beregn kraften på elektronet i hydrogenatomet,{" "}
          <InlineLatex latex="0{,}0529\;\text{nm}" /> fra protonet. Sammenlign.
        </p>
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* O-H-N (top) */}
          <circle cx="60" cy="60" r="10" fill="#3b82f6" />
          <text x="60" y="64" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="60" y="40" fontSize="11" textAnchor="middle" fill="currentColor">O</text>
          <circle cx="160" cy="60" r="10" fill="#ef4444" />
          <text x="160" y="64" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="160" y="40" fontSize="11" textAnchor="middle" fill="currentColor">H</text>
          <circle cx="260" cy="60" r="10" fill="#3b82f6" />
          <text x="260" y="64" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="260" y="40" fontSize="11" textAnchor="middle" fill="currentColor">N</text>
          <line x1="70" y1="60" x2="150" y2="60" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="170" y1="60" x2="250" y2="60" stroke="currentColor" strokeDasharray="3 3" />
          <text x="110" y="56" fontSize="9" textAnchor="middle" fill="currentColor">0,280 nm</text>
          <text x="210" y="56" fontSize="9" textAnchor="middle" fill="currentColor">0,110 nm</text>
          {/* N-H-N (bottom) */}
          <circle cx="60" cy="150" r="10" fill="#3b82f6" />
          <text x="60" y="154" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="60" y="178" fontSize="11" textAnchor="middle" fill="currentColor">N</text>
          <circle cx="160" cy="150" r="10" fill="#ef4444" />
          <text x="160" y="154" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="160" y="178" fontSize="11" textAnchor="middle" fill="currentColor">H</text>
          <circle cx="260" cy="150" r="10" fill="#3b82f6" />
          <text x="260" y="154" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="260" y="178" fontSize="11" textAnchor="middle" fill="currentColor">N</text>
          <line x1="70" y1="150" x2="150" y2="150" stroke="currentColor" strokeDasharray="3 3" />
          <line x1="170" y1="150" x2="250" y2="150" stroke="currentColor" strokeDasharray="3 3" />
          <text x="110" y="146" fontSize="9" textAnchor="middle" fill="currentColor">0,300 nm</text>
          <text x="210" y="146" fontSize="9" textAnchor="middle" fill="currentColor">0,110 nm</text>
          {/* Labels */}
          <text x="20" y="105" fontSize="11" fill="currentColor">Thymin</text>
          <text x="320" y="105" fontSize="11" fill="currentColor">Adenin</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Alle ladninger er <InlineLatex latex="\pm e = \pm 1{,}602\cdot 10^{-19}\;\text{C}" /></li>
        <li>H–N avstand: <InlineLatex latex="0{,}110\;\text{nm}" /></li>
        <li>O–H: <InlineLatex latex="0{,}280 - 0{,}110 = 0{,}170\;\text{nm}" /></li>
        <li>O–N: <InlineLatex latex="0{,}280\;\text{nm}" /></li>
        <li>Øverste N–H: <InlineLatex latex="0{,}300 - 0{,}110 = 0{,}190\;\text{nm}" /></li>
        <li>Øverste N–N: <InlineLatex latex="0{,}300\;\text{nm}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Netto kraft thymin → adenin</li>
        <li>(b) Kraft på elektronet i H, sammenlignet med (a)</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Summér kreftene fra alle thymin-ladningene på adenin-ladningene i både O–H–N (øverst) og
        N–H–N (nederst). I hver kolonne virker thyminens O⁻ (hhv. N⁻) på både H⁺ og N⁻ på
        adenin-siden. Like ladninger på rett linje gir alltid frastøtning — motsatt fortegn gir
        tiltrekning. Oppsummer som positive (tiltrekkende) og negative (frastøtende) krefter langs
        bindingsaksen.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Bruk <InlineLatex latex="F = ke^2/r^2" /> for hvert par. Pass på fortegn: tiltrekning
            regnes positivt, frastøtning negativt.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            O–H–N: thyminens O⁻ virker på adeninens H⁺ (0,170 nm, tiltrekker) og adeninens N⁻
            (0,280 nm, frastøter). I tillegg virker thyminens H⁺ på adeninens N⁻ (0,110 nm,
            tiltrekker). Men teksten sier vi bruker kun O⁻ og N⁻ virkning — så tenk på det som en
            dipol: pluss-ladningen i midten kanselleres av at vi ser på par.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — hydrogenbinding som partielle Coulomb-krefter:</strong>{" "}
          I DNA-dobbelthelixen holdes basene sammen av «hydrogenbindinger» — rekker
          av atomer O–H–N og N–H–N. Hvert atom har delvis ladning{" "}
          <InlineLatex latex="\pm e" /> i den idealiserte modellen. Total kraft er
          <em> superposisjonen</em> av alle Coulomb-krefter mellom par med én ladning
          på thymin-siden og én på adenin-siden.
        </p>
        <FormulaBox latex="F_{\text{netto}} = \sum_{i,j}\dfrac{k\,q_i q_j}{r_{ij}^2}" variant="blue" />
        <p>
          <strong>Hvorfor enkel Coulomb og ikke dipol-formel?</strong> Selv om
          oppsettet ligner en dipol, er avstandene mellom atomene sammenlignbare
          med bindingslengden, så dipoltilnærmingen (som forutsetter at avstanden
          til feltpunktet er mye større enn dipollengden) er ikke gyldig. Vi må
          behandle hvert par eksakt.
        </p>
        <p>
          <strong>Fortegnskonvensjon:</strong> Langs bindingsaksen regner vi
          frastøtning (som trekker basene fra hverandre) positiv og tiltrekning
          (som drar dem sammen) negativ. Ulike fortegn gir tiltrekning, like
          fortegn frastøtning.
        </p>

        <p className="font-semibold mt-4">Steg 1: Beregn konstanten <InlineLatex latex="ke^2" /></p>
        <FormulaBox latex="k e^2 = (8{,}988\cdot 10^9)(1{,}602\cdot 10^{-19})^2 = 2{,}307\cdot 10^{-28}\;\text{N}\cdot\text{m}^2" variant="blue" />

        <p className="font-semibold mt-4">Steg 2: O–H–N-kombinasjonen</p>
        <p>
          Thyminens O⁻ virker på adenin-ladningene. Adenin har H⁺ (i 0,170 nm fra
          O) og N⁻ (i 0,280 nm fra O). Tilsvarende virker thyminens H⁺ på
          adeninens N⁻ (i 0,110 nm). Tre par — tre bidrag.
        </p>
        <FormulaBox
          latex="F_{O^-\text{-}H^+} = -\frac{ke^2}{(0{,}170\cdot 10^{-9})^2} = -7{,}98\cdot 10^{-9}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="F_{O^-\text{-}N^-} = +\frac{ke^2}{(0{,}280\cdot 10^{-9})^2} = +2{,}94\cdot 10^{-9}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="F_{H^+\text{-}N^-} = -\frac{ke^2}{(0{,}110\cdot 10^{-9})^2} = -1{,}907\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />
        <p className="text-sm text-[var(--muted)]">
          (Minus = tiltrekning, her regnet positiv retning langs bindingen som "dra fra hverandre".)
        </p>
        <FormulaBox
          latex="F_{\text{OHN}} = -7{,}98\cdot10^{-9} + 2{,}94\cdot10^{-9} - 19{,}07\cdot10^{-9} = -2{,}41\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: N–H–N-kombinasjonen (øvre)</p>
        <p>
          Samme struktur som over, bare med andre avstander: 0,110 nm (thyminens
          H⁺ til adeninens N⁻), 0,190 nm (thyminens N⁻ til adeninens H⁺) og 0,300
          nm (N⁻ til N⁻).
        </p>
        <FormulaBox
          latex="F_{N^-\text{-}H^+} = -\frac{ke^2}{(0{,}190\cdot 10^{-9})^2} = -6{,}39\cdot 10^{-9}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="F_{N^-\text{-}N^-} = +\frac{ke^2}{(0{,}300\cdot 10^{-9})^2} = +2{,}56\cdot 10^{-9}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="F_{H^+\text{-}N^-} = -\frac{ke^2}{(0{,}110\cdot 10^{-9})^2} = -1{,}907\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="F_{\text{NHN}} = -6{,}39\cdot10^{-9} + 2{,}56\cdot10^{-9} - 19{,}07\cdot10^{-9} = -2{,}29\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 4: Sum av hydrogenbindingene</p>
        <FormulaBox
          latex="F_{\text{netto}} = F_{\text{OHN}} + F_{\text{NHN}} \approx -4{,}70\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;|F_{\text{netto}}|\approx 4{,}7\cdot 10^{-8}\;\text{N},\;\text{tiltrekkende}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Tegnet er negativt (tiltrekkende), fordi H⁺ i midten dominerer med{" "}
          <InlineLatex latex="1/(0{,}110)^2" /> i nevneren — korte avstander gir
          store tiltrekninger som overgår de lengre frastøtningene.
        </p>

        <p className="font-semibold mt-4">(b) Kraft på elektron i H-atom — sammenligning</p>
        <p>
          Elektronet i hydrogen er i Bohr-radien{" "}
          <InlineLatex latex="a_0 = 0{,}0529\;\text{nm}" /> fra protonet. Samme
          Coulomb-formel:
        </p>
        <FormulaBox latex="F_{eH} = \dfrac{k e^2}{a_0^2}" variant="blue" />
        <FormulaBox
          latex="F_{eH} = \frac{ke^2}{(0{,}0529\cdot 10^{-9})^2} = \frac{2{,}307\cdot10^{-28}}{2{,}80\cdot10^{-21}}= 8{,}24\cdot10^{-8}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="\frac{F_{eH}}{|F_{\text{netto}}|} = \frac{8{,}24\cdot10^{-8}}{4{,}70\cdot10^{-8}} \approx 1{,}75"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Kraften inne i et hydrogenatom er ca. 1,75 ganger sterkere enn den
          nettotiltrekkende parbindingen mellom thymin og adenin. Det gir
          termodynamisk mening: hydrogenbindinger brytes ved moderate
          temperaturer (smelting av DNA), mens atomer ikke ioniseres før ved
          mange tusen K.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Biologiske hydrogen-bindinger er mange delvise Coulomb-par som
        nesten opphever hverandre — netto kraft blir mye svakere enn enkeltatomets intramolekylære
        kraft. Det er derfor DNA-strender kan rive seg fra hverandre under oppvarming men atomer ikke
        gjør det.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.19 — DNA cytosin-guanin
  // --------------------------------------------------------------------------
  "21.19": {
    title: "Baseparing i DNA — cytosin og guanin",
    difficulty: "vanskelig",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          Figur E21.19 viser bindingen mellom cytosin og guanin. O–H og H–N avstandene er hver{" "}
          <InlineLatex latex="0{,}110\;\text{nm}" />. Anta at bindingen kommer fra kreftene langs
          O–H–O, N–H–N og O–H–N-kombinasjonene, antatt parallelle. Beregn netto kraft cytosin
          utøver på guanin. Tiltrekkende eller frastøtende?
        </p>
        <svg viewBox="0 0 400 290" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* O-H-O top (0.290) */}
          <circle cx="60" cy="50" r="10" fill="#3b82f6" />
          <text x="60" y="54" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="60" y="30" fontSize="11" textAnchor="middle" fill="currentColor">O</text>
          <circle cx="155" cy="50" r="10" fill="#ef4444" />
          <text x="155" y="54" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="155" y="30" fontSize="11" textAnchor="middle" fill="currentColor">H</text>
          <circle cx="250" cy="50" r="10" fill="#3b82f6" />
          <text x="250" y="54" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="250" y="30" fontSize="11" textAnchor="middle" fill="currentColor">O</text>
          <text x="155" y="75" fontSize="9" textAnchor="middle" fill="currentColor">0,290 nm</text>
          {/* N-H-N middle (0.300) */}
          <circle cx="60" cy="140" r="10" fill="#3b82f6" />
          <text x="60" y="144" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="60" y="120" fontSize="11" textAnchor="middle" fill="currentColor">N</text>
          <circle cx="155" cy="140" r="10" fill="#ef4444" />
          <text x="155" y="144" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="155" y="120" fontSize="11" textAnchor="middle" fill="currentColor">H</text>
          <circle cx="250" cy="140" r="10" fill="#3b82f6" />
          <text x="250" y="144" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="250" y="120" fontSize="11" textAnchor="middle" fill="currentColor">N</text>
          <text x="155" y="165" fontSize="9" textAnchor="middle" fill="currentColor">0,300 nm</text>
          {/* O-H-N bottom (0.290) */}
          <circle cx="60" cy="230" r="10" fill="#3b82f6" />
          <text x="60" y="234" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="60" y="258" fontSize="11" textAnchor="middle" fill="currentColor">O</text>
          <circle cx="155" cy="230" r="10" fill="#ef4444" />
          <text x="155" y="234" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="155" y="258" fontSize="11" textAnchor="middle" fill="currentColor">H</text>
          <circle cx="250" cy="230" r="10" fill="#3b82f6" />
          <text x="250" y="234" fontSize="11" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="250" y="258" fontSize="11" textAnchor="middle" fill="currentColor">N</text>
          <text x="155" y="255" fontSize="9" textAnchor="middle" fill="currentColor">0,290 nm</text>
          <text x="300" y="145" fontSize="11" fill="currentColor">Guanin</text>
          <text x="5" y="145" fontSize="11" fill="currentColor">Cytosin</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Øverst (O–H–O): full avstand 0,290 nm, H–O = 0,110 nm</li>
        <li>Midt (N–H–N): full avstand 0,300 nm, H–N = 0,110 nm</li>
        <li>Nederst (O–H–N): full avstand 0,290 nm, H–N = 0,110 nm</li>
        <li>Alle ladninger <InlineLatex latex="\pm e" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Netto kraft fra cytosin på guanin</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Eksakt samme metode som i 21.18. Hver av de tre parallelle bindingene (O–H–O, N–H–N, O–H–N)
        bidrar med tre par: ytterste–ytterste (lik fortegn, frastøter), ytterste–H (tiltrekker), og
        H–ytterste (tiltrekker). Summér.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            For hver kombinasjon: cytosin-siden (venstre, ladning <InlineLatex latex="q_L" />) virker
            på guanin-siden (høyre H og høyre endepunkt). Og cytosinens H virker på guaninens
            endepunkt.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Siden alle tre kombinasjoner har samme struktur (minus → pluss → minus), kan du regne ut
            én formel og gjenta for forskjellige avstander.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn:</strong> Samme fysikk som i 21.18 — superposisjon
          av Coulomb-krefter mellom alle par. Cytosin–guanin har <em>tre</em>{" "}
          hydrogenbindinger (O–H–O, N–H–N, O–H–N), mot to for adenin–thymin. Hver
          binding bidrar tre par: endepunkt-til-endepunkt (lik fortegn,
          frastøter), og to med H⁺ i midten (motsatt fortegn, tiltrekker).
        </p>
        <FormulaBox latex="F_{\text{netto}} = \sum_{\text{binding}}\sum_{i,j}\dfrac{k\,q_i q_j}{r_{ij}^2}" variant="blue" />
        <p>
          <strong>Hvorfor samme formel som 21.18?</strong> Strukturen er identisk
          (endepunkt–H⁺–endepunkt), så vi kan gjenbruke den samme Coulomb-formelen
          tre ganger med ulike avstander. Fortegnskonvensjon som før: positiv =
          frastøtende.
        </p>

        <p className="font-semibold mt-4">Steg 1: Generell formel per kombinasjon</p>
        <p>
          For en kombinasjon med avstand <InlineLatex latex="d" /> (ytterste-til-ytterste)
          og H i midten med 0,110 nm fra hver side kommer tre bidrag:
          ytterste-ytterste (frastøter, <InlineLatex latex="+1/d^2" />), ytterste-H
          (tiltrekker, <InlineLatex latex="-1/(d-0{,}110)^2" />) og H-ytterste
          (tiltrekker, <InlineLatex latex="-1/(0{,}110)^2" />).
        </p>
        <FormulaBox
          latex="F_{\text{komb}} = \underbrace{+\frac{ke^2}{d^2}}_{\text{y.-y., frastøt}} \underbrace{-\frac{ke^2}{(d-0{,}110)^2}}_{\text{y.-H, tiltrek}} \underbrace{-\frac{ke^2}{(0{,}110)^2}}_{\text{H-y., tiltrek}}"
          variant="blue"
        />
        <p>(avstander i nm, tegnkonvensjon: + = frastøtende, − = tiltrekkende)</p>

        <p className="font-semibold mt-4">Steg 2: Beregn konstanten</p>
        <FormulaBox latex="ke^2 = 2{,}307\cdot 10^{-28}\;\text{N}\cdot\text{m}^2" variant="blue" />
        <FormulaBox
          latex="\frac{ke^2}{(0{,}110\cdot 10^{-9})^2} = 1{,}907\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 3: O–H–O (d = 0,290 nm, d − 0,110 = 0,180 nm)</p>
        <FormulaBox
          latex="F_1 = \frac{ke^2}{(0{,}290)^2}\cdot 10^{18} - \frac{ke^2}{(0{,}180)^2}\cdot 10^{18} - 1{,}907\cdot 10^{-8}"
          variant="blue"
        />
        <FormulaBox
          latex="F_1 = 2{,}743\cdot 10^{-9} - 7{,}120\cdot 10^{-9} - 1{,}907\cdot 10^{-8} = -2{,}35\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 4: N–H–N (d = 0,300 nm, d − 0,110 = 0,190 nm)</p>
        <FormulaBox
          latex="F_2 = 2{,}563\cdot 10^{-9} - 6{,}390\cdot 10^{-9} - 1{,}907\cdot 10^{-8} = -2{,}29\cdot 10^{-8}\;\text{N}"
          variant="blue"
        />

        <p className="font-semibold mt-4">Steg 5: O–H–N (d = 0,290 nm, d − 0,110 = 0,180 nm) — samme tall som O–H–O</p>
        <FormulaBox latex="F_3 = -2{,}35\cdot 10^{-8}\;\text{N}" variant="blue" />

        <p className="font-semibold mt-4">Steg 6: Netto kraft (summér alle tre bindinger)</p>
        <FormulaBox
          latex="F_{\text{netto}} = F_1 + F_2 + F_3 = -2{,}35\cdot10^{-8} - 2{,}29\cdot10^{-8} - 2{,}35\cdot10^{-8}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;F_{\text{netto}} \approx -6{,}99\cdot 10^{-8}\;\text{N}\;(\text{tiltrekkende})\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Krysssjekk: sammenlign med 21.18 (thymin–adenin, to bindinger):{" "}
          <InlineLatex latex="4{,}7\cdot10^{-8}\;\text{N}" />. Cytosin–guanin er
          ca. <InlineLatex latex="6{,}99/4{,}70 \approx 1{,}5" /> ganger sterkere
          — som forventet siden bindingen bare har én ekstra hydrogenbinding (3
          vs. 2). Dette forklarer hvorfor GC-rike DNA-sekvenser har høyere
          smeltetemperatur enn AT-rike.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Tre parallelle hydrogenbindinger gir sterkere base-paring
        enn to. Lær å identifisere den gjentatte strukturen {'"endepunkt-H-endepunkt"'} slik at du
        kan gjenbruke én formel for flere kombinasjoner.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.22 — E-felt fra en punktladning
  // --------------------------------------------------------------------------
  "21.22": {
    title: "Elektrisk felt fra en punktladning",
    difficulty: "lett",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          En partikkel har ladning <InlineLatex latex="q = -3{,}35\;\text{nC}" />.{" "}
          <strong>(a)</strong> Finn størrelse og retning på det elektriske feltet ved et punkt{" "}
          <InlineLatex latex="0{,}200\;\text{m}" /> rett over ladningen.{" "}
          <strong>(b)</strong> I hvilken avstand har feltet størrelse{" "}
          <InlineLatex latex="11{,}2\;\text{N/C}" />?
        </p>
        <svg viewBox="0 0 260 220" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <circle cx="130" cy="170" r="14" fill="#3b82f6" />
          <text x="130" y="175" fontSize="15" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="130" y="200" fontSize="11" textAnchor="middle" fill="currentColor">q = −3,35 nC</text>
          <circle cx="130" cy="60" r="4" fill="currentColor" />
          <text x="140" y="62" fontSize="11" fill="currentColor">P</text>
          <line x1="130" y1="156" x2="130" y2="74" stroke="currentColor" strokeDasharray="3 3" />
          <text x="140" y="115" fontSize="11" fill="currentColor">0,200 m</text>
          <line x1="130" y1="60" x2="130" y2="140" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-amber)" />
          <text x="98" y="110" fontSize="11" fill="#f59e0b">E mot q</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q = -3{,}35\;\text{nC} = -3{,}35\cdot 10^{-9}\;\text{C}" /></li>
        <li>(a) <InlineLatex latex="r = 0{,}200\;\text{m}" /></li>
        <li>(b) <InlineLatex latex="E = 11{,}2\;\text{N/C}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Feltstørrelse og retning ved <InlineLatex latex="P" /></li>
        <li>(b) Avstand <InlineLatex latex="r" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        For en punktladning: <InlineLatex latex="E = k|q|/r^2" />, retningen er bort fra positive og
        mot negative ladninger. Her er <InlineLatex latex="q" /> negativ, så feltet peker{" "}
        <em>mot</em> ladningen, dvs. nedover.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Bruk <InlineLatex latex="E = k|q|/r^2" />. For (b) løser du samme formel for{" "}
            <InlineLatex latex="r" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — E-felt fra punktladning:</strong> Det elektriske
          feltet er kraft per enhet testladning,{" "}
          <InlineLatex latex="\vec E = \vec F/q_0" />. For en punktladning{" "}
          <InlineLatex latex="q" /> finner vi feltet på avstand{" "}
          <InlineLatex latex="r" /> ved å sette en liten positiv testladning{" "}
          <InlineLatex latex="q_0" /> der, regne kraften{" "}
          <InlineLatex latex="F = k|q|q_0/r^2" /> og dele på{" "}
          <InlineLatex latex="q_0" />. Resultatet er uavhengig av{" "}
          <InlineLatex latex="q_0" /> — feltet er en egenskap ved kildens romlige
          omgivelser:
        </p>
        <FormulaBox latex="\vec E = \dfrac{k\,q}{r^2}\,\hat r" variant="blue" />
        <p>
          <InlineLatex latex="\hat r" /> peker fra kilden til feltpunktet.
          Positive ladninger gir felt som peker <em>bort</em>; negative gir felt
          som peker <em>inn mot</em> ladningen.
        </p>
        <p>
          <strong>Hvorfor denne formelen og ikke{" "}
          <InlineLatex latex="E = V/d" />?</strong> Den sistnevnte gjelder bare
          mellom to parallelle plater der feltet er <em>uniformt</em>. Her har vi
          én punktladning som lager et radielt felt som avtar med{" "}
          <InlineLatex latex="1/r^2" /> — helt ikke-uniformt. Derfor må vi bruke{" "}
          <InlineLatex latex="E = k|q|/r^2" />.
        </p>

        <p className="font-semibold mt-4">(a) Feltstørrelse og retning</p>
        <p>
          Sett inn tallene direkte:
        </p>
        <FormulaBox latex="E = \dfrac{k|q|}{r^2}" variant="blue" />
        <FormulaBox
          latex="E = \frac{(8{,}988\cdot 10^9)(3{,}35\cdot 10^{-9})}{(0{,}200)^2}"
          variant="blue"
        />
        <FormulaBox
          latex="E = \frac{30{,}11}{0{,}0400} = \boxed{\;753\;\text{N/C}\;}"
          variant="gold"
        />
        <p>
          <strong>Retningsbestemmelse:</strong> Ladningen er negativ, og
          feltpunktet er <em>over</em> ladningen. For en negativ ladning peker
          feltet <em>mot</em> ladningen (tenk: en positiv testladning blir
          tiltrukket mot <InlineLatex latex="q" />). Feltet i P peker altså
          <strong> nedover</strong>, mot <InlineLatex latex="q" />.
        </p>
        <p className="italic text-[var(--muted)]">
          Enhetssjekk:{" "}
          <InlineLatex latex="(\text{N}\,\text{m}^2/\text{C}^2)\cdot\text{C}/\text{m}^2 = \text{N}/\text{C} = \text{V}/\text{m}" />.
          OK.
        </p>

        <p className="font-semibold mt-4">(b) Avstand for gitt feltstørrelse</p>
        <p>
          Her <em>kan</em> vi ikke bruke <InlineLatex latex="r = V/E" /> — feltet
          er ikke uniformt. Vi må bruke punktladningsformelen og løse for{" "}
          <InlineLatex latex="r" />. Omform algebraisk:{" "}
          <InlineLatex latex="E = k|q|/r^2 \Rightarrow r^2 = k|q|/E \Rightarrow r = \sqrt{k|q|/E}" />.
        </p>
        <FormulaBox latex="r = \sqrt{\dfrac{k|q|}{E}}" variant="blue" />
        <FormulaBox
          latex="r = \sqrt{\frac{(8{,}988\cdot 10^9)(3{,}35\cdot 10^{-9})}{11{,}2}}"
          variant="blue"
        />
        <FormulaBox
          latex="r = \sqrt{2{,}688}\;\text{m} = \boxed{\;1{,}64\;\text{m}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Krysssjekk: i (a) var <InlineLatex latex="r = 0{,}200\;\text{m}" />{" "}
          og <InlineLatex latex="E = 753\;\text{N/C}" />. Kvadratloven sier at
          når <InlineLatex latex="E" /> reduseres med faktor{" "}
          <InlineLatex latex="753/11{,}2 \approx 67" />, må{" "}
          <InlineLatex latex="r" /> øke med faktor <InlineLatex latex="\sqrt{67} \approx 8{,}2" />.
          Faktisk: <InlineLatex latex="1{,}64/0{,}200 = 8{,}2" />. Stemmer!
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Feltet fra en punktladning avtar som{" "}
        <InlineLatex latex="1/r^2" />, og retningen bestemmes av fortegnet. Positive ladninger er
        «kilder», negative er «sluk» for feltet.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.24 — Elektron akselerert i uniformt felt
  // --------------------------------------------------------------------------
  "21.24": {
    title: "Elektron i uniformt E-felt — kinematikk",
    difficulty: "middels",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          Et elektron slippes fra ro i et uniformt elektrisk felt. Det akselererer vertikalt oppover
          og tilbakelegger <InlineLatex latex="4{,}50\;\text{m}" /> i løpet av de første{" "}
          <InlineLatex latex="3{,}00\;\mu\text{s}" />. <strong>(a)</strong> Finn feltets størrelse
          og retning. <strong>(b)</strong> Er det rimelig å neglisjere gravitasjonen? Begrunn
          kvantitativt.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="v_0 = 0" /></li>
        <li><InlineLatex latex="\Delta y = 4{,}50\;\text{m}" /> (oppover)</li>
        <li><InlineLatex latex="t = 3{,}00\cdot 10^{-6}\;\text{s}" /></li>
        <li>Elektronladning: <InlineLatex latex="q = -e = -1{,}602\cdot 10^{-19}\;\text{C}" /></li>
        <li>Elektronmasse: <InlineLatex latex="m_e = 9{,}109\cdot 10^{-31}\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Størrelse og retning av <InlineLatex latex="\vec{E}" /></li>
        <li>(b) Sjekk om gravitasjonen kan neglisjeres</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        1) Finn akselerasjonen fra kinematikk (<InlineLatex latex="\Delta y = \tfrac{1}{2} a t^2" />).
        2) Bruk <InlineLatex latex="F = ma = |q|E" /> til å finne <InlineLatex latex="E" />.
        3) Retning: elektron er negativ og akselereres oppover, så feltet må peke nedover.
        4) Sammenlign elektrisk akselerasjon med <InlineLatex latex="g" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            <InlineLatex latex="a = 2\Delta y/t^2" />. Dette blir et svært høyt tall.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Kraften på elektron med negativ ladning i et felt E er <InlineLatex latex="F=-eE" />.
            Hvis akselerasjonen er oppover, må <InlineLatex latex="E" /> peke nedover.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — partikkel i uniformt E-felt:</strong> I et
          uniformt felt virker det en konstant kraft{" "}
          <InlineLatex latex="\vec F = q\vec E" /> på en ladning{" "}
          <InlineLatex latex="q" />. Newton II gir konstant akselerasjon{" "}
          <InlineLatex latex="\vec a = \vec F/m = q\vec E/m" />. Siden
          akselerasjonen er konstant, gjelder kinematikkformlene fra kap. 2
          (fritt fall-analogien):{" "}
          <InlineLatex latex="\Delta y = v_0 t + \tfrac12 a t^2" /> osv.
        </p>
        <FormulaBox latex="\vec F = q\vec E,\quad \vec a = \dfrac{q\vec E}{m},\quad \Delta y = v_0 t + \tfrac{1}{2}a t^2" variant="blue" />
        <p>
          <strong>Hvorfor kinematikk + Newton II?</strong> Vi har en partikkel med
          kjent bevegelse (distanse og tid) i et uniformt felt. Vi bruker
          kinematikk for å finne <InlineLatex latex="a" />, deretter Newton II med{" "}
          <InlineLatex latex="F = |q|E" /> for å finne <InlineLatex latex="E" />.
          Merk: siden feltet er uniformt (ikke en punktladning), kan vi ikke
          bruke <InlineLatex latex="E = k|q|/r^2" /> — det er kun for
          punktkilder.
        </p>

        <p className="font-semibold mt-4">(a) Feltstørrelse og retning</p>
        <p>
          <strong>Steg 1: Finn akselerasjonen fra kinematikk.</strong> Elektronet
          starter i ro (<InlineLatex latex="v_0 = 0" />), så:
        </p>
        <FormulaBox latex="\Delta y = \tfrac{1}{2} a t^2 \;\Longrightarrow\; a = \dfrac{2\Delta y}{t^2}" variant="blue" />
        <FormulaBox
          latex="a = \frac{2\Delta y}{t^2} = \frac{2\cdot 4{,}50}{(3{,}00\cdot 10^{-6})^2} = \frac{9{,}00}{9{,}00\cdot 10^{-12}} = 1{,}00\cdot 10^{12}\;\text{m/s}^2"
          variant="blue"
        />
        <p>
          <strong>Steg 2: Finn E fra Newton II.</strong> Kraften på elektronet er{" "}
          <InlineLatex latex="|F| = eE" /> (siden{" "}
          <InlineLatex latex="|q| = e" />), og{" "}
          <InlineLatex latex="|F| = m_e a" />. Algebraisk omforming gir:
        </p>
        <FormulaBox latex="m_e a = e E \;\Longrightarrow\; E = \dfrac{m_e\,a}{e}" variant="blue" />
        <FormulaBox
          latex="E = \frac{(9{,}109\cdot 10^{-31})(1{,}00\cdot 10^{12})}{1{,}602\cdot 10^{-19}}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;E = 5{,}69\;\text{N/C},\;\text{rettet nedover}\;}"
          variant="gold"
        />
        <p>
          <strong>Retningsbestemmelse:</strong> Akselerasjonen er oppover.
          Elektronet har negativ ladning, så{" "}
          <InlineLatex latex="\vec F = q\vec E = -e\vec E" /> — kraften er{" "}
          <em>motsatt</em> feltet. Kraft oppover ⇒ felt <strong>nedover</strong>.
        </p>
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\text{kg}\cdot\text{m/s}^2/\text{C} = \text{N/C}" />. OK.
        </p>

        <p className="font-semibold mt-4">(b) Kan vi neglisjere tyngdekraften?</p>
        <p>
          Beregn forholdet mellom elektrisk og gravitasjonell akselerasjon:
        </p>
        <FormulaBox
          latex="\frac{a_{\text{el}}}{g} = \frac{1{,}00\cdot 10^{12}}{9{,}81} \approx 1{,}02\cdot 10^{11}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Elektrisk akselerasjon er <strong>omtrent 10¹¹ ganger større</strong>{" "}
          enn <InlineLatex latex="g" />. Tyngdekraften er fullstendig
          neglisjerbar. Dette er typisk for problemer med elektroner eller
          protoner i E-felt: massen er så liten at selv moderate felt gir
          enorme akselerasjoner.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> I problem med elektroner/protoner i E-felt er gravitasjon
        praktisk talt alltid neglisjerbar fordi massen er så liten. Bruk kinematikk-triaden fra
        kap. 2 akkurat som for fritt fall.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.25 — Ladning i likevekt i E-felt + proton og vekt
  // --------------------------------------------------------------------------
  "21.25": {
    title: "Partikkel i likevekt i E-felt",
    difficulty: "middels",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          <strong>(a)</strong> Hvilken ladning (fortegn og størrelse) må en{" "}
          <InlineLatex latex="1{,}46\;\text{g}" />-partikkel ha for å være i ro i et nedoverrettet
          E-felt med størrelse <InlineLatex latex="680\;\text{N/C}" />?{" "}
          <strong>(b)</strong> Hvor stort må E-feltet være for at den elektriske kraften på et{" "}
          proton skal være lik protonets vekt?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 1{,}46\;\text{g} = 1{,}46\cdot 10^{-3}\;\text{kg}" /></li>
        <li><InlineLatex latex="E = 680\;\text{N/C}" /> nedover</li>
        <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /></li>
        <li>Protonmasse: <InlineLatex latex="m_p = 1{,}673\cdot 10^{-27}\;\text{kg}" /></li>
        <li>Protonladning: <InlineLatex latex="e = 1{,}602\cdot 10^{-19}\;\text{C}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Ladning <InlineLatex latex="q" /> (fortegn og størrelse)</li>
        <li>(b) E for at <InlineLatex latex="eE = m_p g" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        (a) For likevekt må den elektriske kraften <InlineLatex latex="qE" /> oppveie tyngden{" "}
        <InlineLatex latex="mg" />. Siden feltet peker nedover og tyngden er nedover, må kraften på
        ladningen være oppover → motsatt feltet → ladningen er <strong>negativ</strong>.
        (b) Sett <InlineLatex latex="eE = m_p g" /> og løs for <InlineLatex latex="E" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            (a) <InlineLatex latex="|q| = mg/E" />. Sjekk fortegn via retningsanalyse.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            (b) Protonets vekt er ekstremt liten, så E vil bli bittelite.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — likevekt:</strong> En partikkel i ro i et felt
          krever at summen av krefter er null (Newton I). Her er det to krefter:
          tyngden <InlineLatex latex="\vec F_g = m\vec g" /> (nedover) og den
          elektriske kraften <InlineLatex latex="\vec F_e = q\vec E" />. For
          likevekt må disse være like store og motsatt rettet.
        </p>
        <FormulaBox latex="\sum \vec F = 0 \;\Longrightarrow\; q\vec E = -m\vec g" variant="blue" />
        <p>
          <strong>Hvorfor <InlineLatex latex="F = qE" /> og ikke Coulomb?</strong>{" "}
          Her er E gitt direkte — vi trenger ikke kjenne kilden som lager feltet.
          Formelen <InlineLatex latex="\vec F = q\vec E" /> er
          <em> definisjonen</em> av det elektriske feltet og virker uansett om
          feltet er uniformt eller ikke, så lenge <InlineLatex latex="E" /> er
          verdien ved partikkelens posisjon.
        </p>

        <p className="font-semibold mt-4">(a) Ladning på partikkelen</p>
        <p>
          <strong>Retningsanalyse:</strong> Tyngden er nedover og feltet er
          nedover. For likevekt må den elektriske kraften være oppover. Siden{" "}
          <InlineLatex latex="\vec F_e = q\vec E" /> må{" "}
          <InlineLatex latex="q" /> være <strong>negativ</strong> for at kraften
          skal bli motsatt feltretningen.
        </p>
        <p>
          <strong>Størrelse:</strong> I likevekt er{" "}
          <InlineLatex latex="|q|E = mg" />. Algebraisk omforming:
        </p>
        <FormulaBox latex="|q|E = mg \;\Longrightarrow\; |q| = \dfrac{mg}{E}" variant="blue" />
        <FormulaBox
          latex="|q| = \frac{(1{,}46\cdot 10^{-3})(9{,}81)}{680}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;q = -2{,}11\cdot 10^{-5}\;\text{C} = -21{,}1\;\mu\text{C}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk:{" "}
          <InlineLatex latex="\text{kg}\cdot\text{m/s}^2/(\text{N/C}) = \text{N}/(\text{N/C}) = \text{C}" />.
          OK.
        </p>

        <p className="font-semibold mt-4">(b) Felt som oppveier protonets vekt</p>
        <p>
          Samme likevektsligning, nå med <InlineLatex latex="m_p" /> og{" "}
          <InlineLatex latex="q = +e" />:
        </p>
        <FormulaBox latex="e E = m_p g \;\Longrightarrow\; E = \dfrac{m_p g}{e}" variant="blue" />
        <FormulaBox
          latex="E = \frac{(1{,}673\cdot 10^{-27})(9{,}81)}{1{,}602\cdot 10^{-19}}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;E = 1{,}02\cdot 10^{-7}\;\text{N/C}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Krysssjekk: forholdet mellom feltene er{" "}
          <InlineLatex latex="680/(1{,}02\cdot10^{-7}) \approx 6{,}7\cdot10^9" />.
          Samme som forholdet{" "}
          <InlineLatex latex="(m/m_p)\cdot(e/|q|) = (1{,}46\cdot10^{-3}/1{,}673\cdot10^{-27})\cdot(1{,}602\cdot10^{-19}/2{,}11\cdot10^{-5})" /> —
          konsistent. Protonvekten er ekstremt liten, så et bittelite felt er nok.
          Nok en illustrasjon av at E-kraften dominerer gravitasjon på
          mikroskopisk skala.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Likevektsproblemer mellom tyngde og E-kraft: sett{" "}
        <InlineLatex latex="|q|E = mg" />. Fortegnet kommer fra retningsanalyse.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.27 — Elektron skutt mellom plater
  // --------------------------------------------------------------------------
  "21.27": {
    title: "Elektron skutt horisontalt mellom plater",
    difficulty: "vanskelig",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          Et elektron skytes inn med starthastighet{" "}
          <InlineLatex latex="v_0 = 1{,}60\cdot 10^6\;\text{m/s}" /> i det uniforme feltet mellom to
          parallelle plater (Fig. E21.27). Feltet mellom platene er rettet vertikalt nedover og
          antas null utenfor platene. Elektronet entrer midt mellom platene.
        </p>
        <p>
          <strong>(a)</strong> Hvis elektronet akkurat unngår øvre plate idet det forlater feltet,
          finn feltets størrelse.
        </p>
        <p>
          <strong>(b)</strong> Hvis elektronet erstattes av et proton med samme <InlineLatex latex="v_0" />,
          treffer protonet en plate? Hvis ikke, finn dets vertikale forskyvning.
        </p>
        <p>
          <strong>(c)</strong> Sammenlign banene. <strong>(d)</strong> Er det rimelig å neglisjere
          gravitasjonen?
        </p>
        <svg viewBox="0 0 400 180" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* Upper plate */}
          <line x1="60" y1="40" x2="340" y2="40" stroke="currentColor" strokeWidth="3" />
          {/* Lower plate */}
          <line x1="60" y1="140" x2="340" y2="140" stroke="currentColor" strokeWidth="3" />
          <text x="200" y="30" fontSize="10" textAnchor="middle" fill="currentColor">Øvre plate</text>
          <text x="200" y="158" fontSize="10" textAnchor="middle" fill="currentColor">Nedre plate</text>
          {/* E-field arrows (downward) */}
          <line x1="140" y1="50" x2="140" y2="130" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber)" />
          <line x1="200" y1="50" x2="200" y2="130" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber)" />
          <line x1="260" y1="50" x2="260" y2="130" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow-amber)" />
          <text x="275" y="95" fontSize="11" fill="#f59e0b">E</text>
          {/* Electron entry */}
          <circle cx="70" cy="90" r="5" fill="#3b82f6" />
          <line x1="78" y1="90" x2="110" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <text x="75" y="110" fontSize="10" fill="#3b82f6">e⁻</text>
          <text x="92" y="82" fontSize="10" fill="#10b981">v₀</text>
          {/* Trajectory */}
          <path d="M 70 90 Q 200 60 340 40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          {/* Distances */}
          <text x="360" y="95" fontSize="10" fill="currentColor">1,00 cm</text>
          <text x="200" y="170" fontSize="10" textAnchor="middle" fill="currentColor">2,00 cm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="v_0 = 1{,}60\cdot 10^6\;\text{m/s}" /> (horisontal)</li>
        <li>Horisontal lengde: <InlineLatex latex="L = 2{,}00\;\text{cm} = 0{,}0200\;\text{m}" /></li>
        <li>Avstand fra start til øvre plate: <InlineLatex latex="d = 1{,}00\;\text{cm}/2 = 0{,}500\;\text{cm} = 5{,}00\cdot 10^{-3}\;\text{m}" /></li>
        <li>Felt peker nedover (kraft på elektron oppover)</li>
        <li><InlineLatex latex="m_e = 9{,}109\cdot 10^{-31}\;\text{kg}" />, <InlineLatex latex="m_p = 1{,}673\cdot 10^{-27}\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="E" /></li>
        <li>(b) Vertikal forskyvning for proton</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Klassisk prosjektilbevegelse: konstant <InlineLatex latex="v_x = v_0" />, konstant vertikal
        akselerasjon fra feltet. Elektronet akkurat unngår øvre plate ⇒ det har avbøyning{" "}
        <InlineLatex latex="d = 5{,}00\;\text{mm}" /> når <InlineLatex latex="x = 2{,}00\;\text{cm}" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Tid i feltet: <InlineLatex latex="t = L/v_0" />. Avbøyning:{" "}
            <InlineLatex latex="d = \tfrac{1}{2} a t^2" /> der <InlineLatex latex="a = eE/m_e" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            For protonet: samme <InlineLatex latex="E" />, men akselerasjon er{" "}
            <InlineLatex latex="m_e/m_p \approx 1/1836" /> ganger så stor. Avbøyningen blir dermed
            minimal, og retningen motsatt (protonet dyttes i feltretningen, dvs. nedover).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teoribakgrunn — ladet prosjektil i uniformt felt:</strong>{" "}
          Mellom to parallelle plater er feltet uniformt. En ladning som kommer
          inn med horisontal fart <InlineLatex latex="v_0" /> opplever:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Ingen horisontal kraft ⇒ konstant <InlineLatex latex="v_x = v_0" /></li>
          <li>Konstant vertikal akselerasjon <InlineLatex latex="a = qE/m" /></li>
        </ul>
        <p>
          Dette er en perfekt analog til prosjektilbevegelse i tyngdefelt (kap. 3).
          Kinematikkformlene fra den tid gjelder fremdeles:
        </p>
        <FormulaBox latex="x = v_0 t,\quad y = \tfrac{1}{2}a t^2" variant="blue" />
        <p>
          <strong>Hvorfor prosjektilbevegelse og ikke annet?</strong> Feltet er
          uniformt (konstant vektor) ⇒ konstant akselerasjon ⇒ parabolsk bane.
          Hvis feltet varierte med posisjon (som for punktladning), måtte vi
          integrert Newton II.
        </p>

        <p className="font-semibold mt-4">(a) Feltstørrelse</p>
        <p>
          <strong>Steg 1: Tid mellom platene.</strong> Horisontalt{" "}
          <InlineLatex latex="v_x = v_0" /> konstant:
        </p>
        <FormulaBox latex="t = \dfrac{L}{v_0}" variant="blue" />
        <FormulaBox
          latex="t = \frac{0{,}0200}{1{,}60\cdot 10^6} = 1{,}25\cdot 10^{-8}\;\text{s}"
          variant="blue"
        />
        <p>
          <strong>Steg 2: Vertikal akselerasjon fra kravet{" "}
          <InlineLatex latex="d = \tfrac12 at^2" />.</strong> Elektronet akkurat
          unngår øvre plate, så vertikal forskyvning er akkurat halve
          plateavstanden <InlineLatex latex="d = 0{,}500\;\text{cm} = 5{,}00\cdot 10^{-3}\;\text{m}" />:
        </p>
        <FormulaBox
          latex="d = \tfrac{1}{2} a t^2 \;\Longrightarrow\; a = \dfrac{2d}{t^2}"
          variant="blue"
        />
        <FormulaBox
          latex="a = \frac{2\cdot 5{,}00\cdot 10^{-3}}{(1{,}25\cdot 10^{-8})^2} = \frac{0{,}0100}{1{,}5625\cdot 10^{-16}} = 6{,}40\cdot 10^{13}\;\text{m/s}^2"
          variant="blue"
        />
        <p>
          <strong>Steg 3: Newton II for å finne E.</strong> Kraft på elektronet:{" "}
          <InlineLatex latex="|F| = eE = m_e a" />:
        </p>
        <FormulaBox latex="E = \dfrac{m_e\,a}{e}" variant="blue" />
        <FormulaBox
          latex="E = \frac{(9{,}109\cdot 10^{-31})(6{,}40\cdot 10^{13})}{1{,}602\cdot 10^{-19}}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;E = 364\;\text{N/C}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Retning: feltet er gitt nedover. Kraft på elektron (negativ) er
          motsatt, dvs. oppover — som forventet (elektronet akselereres mot
          øvre plate).
        </p>

        <p className="font-semibold mt-4">(b) Proton med samme <InlineLatex latex="v_0" /></p>
        <p>
          <strong>Retningsanalyse:</strong> Protonet er positivt, så kraften{" "}
          <InlineLatex latex="\vec F = e\vec E" /> er <em>i</em> feltretningen
          — nedover, motsatt av elektronet. Protonet avbøyes mot nedre plate
          (5 mm unna).
        </p>
        <p>
          <strong>Akselerasjon:</strong> Samme <InlineLatex latex="E" />, men nå
          <InlineLatex latex="\,m = m_p" />:
        </p>
        <FormulaBox latex="a_p = \dfrac{eE}{m_p}" variant="blue" />
        <FormulaBox
          latex="a_p = \frac{(1{,}602\cdot 10^{-19})(364)}{1{,}673\cdot 10^{-27}} = 3{,}49\cdot 10^{10}\;\text{m/s}^2"
          variant="blue"
        />
        <p>
          Tiden i feltet er den samme som før (<InlineLatex latex="t = L/v_0" />
          avhenger ikke av masse). Forskyvning:
        </p>
        <FormulaBox
          latex="d_p = \tfrac{1}{2} a_p t^2 = \tfrac{1}{2}(3{,}49\cdot 10^{10})(1{,}25\cdot 10^{-8})^2"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;d_p = 2{,}73\cdot 10^{-6}\;\text{m} = 2{,}73\;\mu\text{m}\;\text{nedover}\;}"
          variant="gold"
        />
        <p className="italic text-[var(--muted)]">
          Krysssjekk: forholdet{" "}
          <InlineLatex latex="d_p/d = a_p/a = m_e/m_p \approx 1/1836" />.
          Faktisk: <InlineLatex latex="2{,}73\cdot10^{-6}/5{,}00\cdot10^{-3} = 5{,}46\cdot10^{-4} \approx 1/1832" />.
          Stemmer! Protonet treffer <strong>ikke</strong> nedre plate (avstanden
          er 5 mm, forskyvningen er bare 2,73 μm).
        </p>

        <p className="font-semibold mt-4">(c) Sammenligning av baner</p>
        <p>
          Elektronet: kraftig parabolsk avbøyning oppover (mot øvre plate,
          kraften er motsatt feltet fordi ladningen er negativ).
          Protonet: svak parabolsk avbøyning nedover (i feltretningen, positiv
          ladning), 1836 ganger mindre enn elektronet fordi massen er 1836
          ganger større for samme kraft.
        </p>

        <p className="font-semibold mt-4">(d) Gravitasjonssjekk</p>
        <p>
          Selv for protonet:{" "}
          <InlineLatex latex="a_p/g = 3{,}49\cdot10^{10}/9{,}81 \approx 3{,}6\cdot 10^9" />.
          Helt trygt å neglisjere gravitasjonen. For elektronet er forholdet
          enda større.
        </p>
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2">
        <p className="text-sm">
          <strong>Alternativ:</strong> Uttrykk E direkte i symboler før du setter inn tall:
        </p>
        <FormulaBox
          latex="E = \frac{2\,m_e\,d\,v_0^2}{e\,L^2}"
          variant="blue"
        />
        <p className="text-sm">
          Dette gir samme tall, men er mer pedagogisk fordi det viser hvordan E avhenger av alle
          parameterne: raskere <InlineLatex latex="v_0" /> krever sterkere felt, lenger plater
          krever svakere felt.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Ladninger i uniformt E-felt oppfører seg som prosjektiler i
        tyngdefelt. Nøkkelen er å skille x- og y-bevegelse og identifisere tiden i feltet. Protoners
        treghet (stor masse) gjør at de avbøyes langt mindre enn elektroner.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.29 — Enhetsvektor r̂
  // --------------------------------------------------------------------------
  "21.29": {
    title: "Enhetsvektor i retning av feltpunktet",
    difficulty: "lett",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          En punktladning ligger i origo. Med denne punktladningen som kildepunkt, hva er
          enhetsvektoren <InlineLatex latex="\hat r" /> i retning av feltpunktet:{" "}
          <strong>(a)</strong> <InlineLatex latex="(0,\;-1{,}35\;\text{m})" />;{" "}
          <strong>(b)</strong> <InlineLatex latex="(12{,}0\;\text{cm},\;12{,}0\;\text{cm})" />;{" "}
          <strong>(c)</strong> <InlineLatex latex="(-1{,}10\;\text{m},\;2{,}60\;\text{m})" />. Uttrykk
          svarene i <InlineLatex latex="\hat\imath" /> og <InlineLatex latex="\hat\jmath" />.
        </p>
        <svg viewBox="0 0 280 260" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <line x1="20" y1="130" x2="260" y2="130" stroke="currentColor" />
          <line x1="250" y1="125" x2="260" y2="130" stroke="currentColor" />
          <line x1="250" y1="135" x2="260" y2="130" stroke="currentColor" />
          <line x1="140" y1="20" x2="140" y2="250" stroke="currentColor" />
          <line x1="135" y1="30" x2="140" y2="20" stroke="currentColor" />
          <line x1="145" y1="30" x2="140" y2="20" stroke="currentColor" />
          <text x="257" y="145" fontSize="10" fill="currentColor">x</text>
          <text x="145" y="22" fontSize="10" fill="currentColor">y</text>
          <circle cx="140" cy="130" r="6" fill="#ef4444" />
          <text x="150" y="145" fontSize="10" fill="currentColor">q</text>
          {/* (a) */}
          <circle cx="140" cy="210" r="3" fill="currentColor" />
          <line x1="140" y1="130" x2="140" y2="205" stroke="#10b981" markerEnd="url(#arrow-green)" strokeWidth="2" />
          <text x="148" y="180" fontSize="10" fill="#10b981">r̂(a)</text>
          {/* (b) */}
          <circle cx="210" cy="60" r="3" fill="currentColor" />
          <line x1="140" y1="130" x2="207" y2="63" stroke="#f59e0b" markerEnd="url(#arrow-amber)" strokeWidth="2" />
          <text x="180" y="100" fontSize="10" fill="#f59e0b">r̂(b)</text>
          {/* (c) */}
          <circle cx="80" cy="40" r="3" fill="currentColor" />
          <line x1="140" y1="130" x2="82" y2="43" stroke="#3b82f6" markerEnd="url(#arrow-blue)" strokeWidth="2" />
          <text x="90" y="90" fontSize="10" fill="#3b82f6">r̂(c)</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Kildeladning i origo</li>
        <li>Feltpunkter i (a), (b), (c)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Enhetsvektorer <InlineLatex latex="\hat r" /> for hvert punkt</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        <InlineLatex latex="\hat r = \vec r / |\vec r|" />, der <InlineLatex latex="\vec r" /> går
        fra kilden (origo) til feltpunktet. Regn først <InlineLatex latex="|\vec r| = \sqrt{x^2+y^2}" />,
        og del så komponentene.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Sjekk: <InlineLatex latex="\hat r_x^2 + \hat r_y^2 = 1" /> for enhver enhetsvektor.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Punkt (0, −1,35)</strong></p>
        <FormulaBox latex="|\vec r| = 1{,}35\;\text{m} \;\Longrightarrow\; \boxed{\hat r = -\hat\jmath}" variant="gold" />

        <p><strong>(b) Punkt (0,120, 0,120) m</strong></p>
        <FormulaBox
          latex="|\vec r| = \sqrt{0{,}120^2 + 0{,}120^2} = 0{,}120\sqrt{2} = 0{,}1697\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="\hat r = \frac{0{,}120\,\hat\imath + 0{,}120\,\hat\jmath}{0{,}1697} = \boxed{\;0{,}707\,\hat\imath + 0{,}707\,\hat\jmath\;}"
          variant="gold"
        />
        <p className="text-sm">
          Dette tilsvarer <InlineLatex latex="(\hat\imath+\hat\jmath)/\sqrt2" />, som peker 45°
          over x-aksen.
        </p>

        <p><strong>(c) Punkt (−1,10, 2,60) m</strong></p>
        <FormulaBox
          latex="|\vec r| = \sqrt{(-1{,}10)^2 + (2{,}60)^2} = \sqrt{1{,}21 + 6{,}76} = \sqrt{7{,}97} = 2{,}823\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="\hat r = \frac{-1{,}10\,\hat\imath + 2{,}60\,\hat\jmath}{2{,}823} = \boxed{\;-0{,}390\,\hat\imath + 0{,}921\,\hat\jmath\;}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Enhetsvektoren peker alltid fra kilden mot feltpunktet, og
        lengden er 1. Dette er byggesteinen i vektorformen av E-feltet:{" "}
        <InlineLatex latex="\vec E = (kq/r^2)\,\hat r" />.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.30 — Elektron og proton i uniformt felt
  // --------------------------------------------------------------------------
  "21.30": {
    title: "Elektron og proton i uniformt E-felt",
    difficulty: "middels",
    pageRef: "s. 738",
    problem: (
      <div className="space-y-2">
        <p>
          <strong>(a)</strong> Et elektron beveger seg østover i et uniformt elektrisk felt på{" "}
          <InlineLatex latex="1{,}53\;\text{N/C}" /> rettet vestover. I punkt A er hastigheten{" "}
          <InlineLatex latex="4{,}45\cdot 10^5\;\text{m/s}" /> mot øst. Hva er farten i punkt B,{" "}
          <InlineLatex latex="0{,}360\;\text{m}" /> øst for A?
        </p>
        <p>
          <strong>(b)</strong> Et proton beveger seg i samme felt. I A er hastigheten{" "}
          <InlineLatex latex="1{,}89\cdot 10^4\;\text{m/s}" /> mot øst. Finn farten i punkt B.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="E = 1{,}53\;\text{N/C}" /> mot vest</li>
        <li>Avstand A → B: <InlineLatex latex="\Delta x = 0{,}360\;\text{m}" /> øst</li>
        <li>(a) <InlineLatex latex="v_{A,e} = 4{,}45\cdot 10^5\;\text{m/s}" /> øst</li>
        <li>(b) <InlineLatex latex="v_{A,p} = 1{,}89\cdot 10^4\;\text{m/s}" /> øst</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Fart <InlineLatex latex="v_B" /> for elektron</li>
        <li>(b) Fart <InlineLatex latex="v_B" /> for proton</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Sjekk akselerasjonens retning for hver partikkel, så bruk{" "}
        <InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />. Felt mot vest:{" "}
        kraft på elektron (−) er mot øst → akselerer i bevegelsesretningen → øker farten.
        Kraft på proton (+) er mot vest → bremser → kan stanse.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Akselerasjon: <InlineLatex latex="a = eE/m" />. Fortegn fra retning.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Hvis protonet bremses nok, kan <InlineLatex latex="v_B^2" /> bli negativt → protonet når
            aldri B. Sjekk dette!
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Elektron</strong></p>
        <FormulaBox
          latex="a = \frac{eE}{m_e} = \frac{(1{,}602\cdot 10^{-19})(1{,}53)}{9{,}109\cdot 10^{-31}} = 2{,}690\cdot 10^{11}\;\text{m/s}^2"
          variant="blue"
        />
        <p className="text-sm">
          Retning: felt vestover gir kraft på elektron (negativ) østover. Elektron beveger seg
          østover → akselerer → farten øker.
        </p>
        <FormulaBox
          latex="v_B^2 = v_A^2 + 2a\Delta x = (4{,}45\cdot 10^5)^2 + 2(2{,}690\cdot 10^{11})(0{,}360)"
          variant="blue"
        />
        <FormulaBox
          latex="v_B^2 = 1{,}980\cdot 10^{11} + 1{,}937\cdot 10^{11} = 3{,}917\cdot 10^{11}\;\text{m}^2/\text{s}^2"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;v_B = 6{,}26\cdot 10^5\;\text{m/s}\;}"
          variant="gold"
        />

        <p><strong>(b) Proton</strong></p>
        <FormulaBox
          latex="a_p = \frac{eE}{m_p} = \frac{(1{,}602\cdot 10^{-19})(1{,}53)}{1{,}673\cdot 10^{-27}} = 1{,}465\cdot 10^{8}\;\text{m/s}^2"
          variant="blue"
        />
        <p className="text-sm">
          Kraft på proton (+) i felt vestover er mot vest → proton østover bremses. Akselerasjon er
          negativ når vi tar øst som positiv retning.
        </p>
        <FormulaBox
          latex="v_B^2 = (1{,}89\cdot 10^4)^2 - 2(1{,}465\cdot 10^{8})(0{,}360)"
          variant="blue"
        />
        <FormulaBox
          latex="v_B^2 = 3{,}572\cdot 10^{8} - 1{,}055\cdot 10^{8} = 2{,}517\cdot 10^{8}\;\text{m}^2/\text{s}^2"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;v_B = 1{,}587\cdot 10^4\;\text{m/s} \approx 1{,}59\cdot 10^4\;\text{m/s}\;}"
          variant="gold"
        />
        <p className="text-sm text-[var(--muted)]">
          Protonet bremses men stopper ikke før B.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Samme E-felt virker motsatt på elektron og proton fordi
        fortegnet på ladningen er motsatt. Bruk kinematikkformler som kjent, men vær pinlig nøyaktig
        med fortegn.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.59 — Tre ladninger, finn total kraft
  // --------------------------------------------------------------------------
  "21.59": {
    title: "Total kraft på tredje ladning",
    difficulty: "middels",
    pageRef: "s. 740",
    problem: (
      <div className="space-y-2">
        <p>
          Ladningen <InlineLatex latex="q_1 = +5{,}00\;\text{nC}" /> er i origo, og{" "}
          <InlineLatex latex="q_2 = -2{,}00\;\text{nC}" /> er på x-aksen i{" "}
          <InlineLatex latex="x = 4{,}00\;\text{cm}" />. Nå plasseres{" "}
          <InlineLatex latex="q_3 = +6{,}00\;\text{nC}" /> i punktet{" "}
          <InlineLatex latex="(4{,}00\;\text{cm},\;3{,}00\;\text{cm})" />.
        </p>
        <p>
          <strong>(a)</strong> Finn x- og y-komponentene av total kraft på{" "}
          <InlineLatex latex="q_3" />.{" "}
          <strong>(b)</strong> Finn størrelse og retning av denne kraften.
        </p>
        <svg viewBox="0 0 280 240" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <line x1="20" y1="200" x2="260" y2="200" stroke="currentColor" />
          <line x1="250" y1="195" x2="260" y2="200" stroke="currentColor" />
          <line x1="250" y1="205" x2="260" y2="200" stroke="currentColor" />
          <line x1="40" y1="20" x2="40" y2="220" stroke="currentColor" />
          <line x1="35" y1="30" x2="40" y2="20" stroke="currentColor" />
          <line x1="45" y1="30" x2="40" y2="20" stroke="currentColor" />
          <text x="257" y="215" fontSize="10" fill="currentColor">x</text>
          <text x="45" y="25" fontSize="10" fill="currentColor">y</text>
          <circle cx="40" cy="200" r="10" fill="#ef4444" />
          <text x="40" y="204" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="20" y="220" fontSize="10" fill="currentColor">q₁</text>
          <circle cx="180" cy="200" r="10" fill="#3b82f6" />
          <text x="180" y="204" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">−</text>
          <text x="195" y="220" fontSize="10" fill="currentColor">q₂</text>
          <circle cx="180" cy="95" r="10" fill="#ef4444" />
          <text x="180" y="99" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="195" y="90" fontSize="10" fill="currentColor">q₃</text>
          <line x1="180" y1="95" x2="180" y2="50" stroke="#10b981" markerEnd="url(#arrow-green)" strokeWidth="2" />
          <text x="190" y="65" fontSize="9" fill="#10b981">F₂</text>
          <line x1="180" y1="95" x2="240" y2="50" stroke="#10b981" markerEnd="url(#arrow-green)" strokeWidth="2" />
          <text x="225" y="75" fontSize="9" fill="#10b981">F₁</text>
          <line x1="40" y1="200" x2="180" y2="95" stroke="currentColor" strokeDasharray="2 2" />
          <text x="100" y="140" fontSize="9" fill="currentColor">5 cm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="q_1 = +5{,}00\;\text{nC}" /> i (0, 0)</li>
        <li><InlineLatex latex="q_2 = -2{,}00\;\text{nC}" /> i (0,0400, 0)</li>
        <li><InlineLatex latex="q_3 = +6{,}00\;\text{nC}" /> i (0,0400, 0,0300)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="F_x" />, <InlineLatex latex="F_y" /> på <InlineLatex latex="q_3" /></li>
        <li>(b) <InlineLatex latex="|\vec F|" /> og vinkel</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        <InlineLatex latex="q_1" /> til <InlineLatex latex="q_3" />: avstand 5 cm (pytagoras), frastøtende (begge +) → peker bort fra <InlineLatex latex="q_1" />,
        altså langs linjen fra origo til <InlineLatex latex="q_3" />.
        <InlineLatex latex="\;q_2" /> til <InlineLatex latex="q_3" />: rett nedover (begge på
        samme x-koordinat), tiltrekker → peker mot <InlineLatex latex="q_2" />, dvs. nedover.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            <InlineLatex latex="r_{13} = \sqrt{0{,}04^2 + 0{,}03^2} = 0{,}05\;\text{m}" />. 3-4-5 trekant!
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Dekomponer <InlineLatex latex="F_1" />: <InlineLatex latex="\cos\theta = 4/5" />,{" "}
            <InlineLatex latex="\sin\theta = 3/5" />. <InlineLatex latex="F_2" /> er ren y-komponent.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Steg 1: Kraft fra q₁ på q₃</strong></p>
        <FormulaBox
          latex="r_{13} = \sqrt{0{,}04^2 + 0{,}03^2} = 0{,}05\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="F_1 = \frac{k|q_1 q_3|}{r_{13}^2} = \frac{(8{,}988\cdot 10^9)(5{,}00\cdot 10^{-9})(6{,}00\cdot 10^{-9})}{0{,}05^2} = 1{,}078\cdot 10^{-4}\;\text{N}"
          variant="blue"
        />
        <p className="text-sm">
          Retning: bort fra <InlineLatex latex="q_1" />, dvs. langs <InlineLatex latex="(4,3)/5" />:
        </p>
        <FormulaBox
          latex="F_{1x} = F_1\cdot\tfrac{4}{5} = 8{,}625\cdot 10^{-5}\;\text{N},\quad F_{1y} = F_1\cdot\tfrac{3}{5} = 6{,}469\cdot 10^{-5}\;\text{N}"
          variant="blue"
        />

        <p><strong>Steg 2: Kraft fra q₂ på q₃</strong></p>
        <FormulaBox
          latex="r_{23} = 0{,}03\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="F_2 = \frac{(8{,}988\cdot 10^9)(2{,}00\cdot 10^{-9})(6{,}00\cdot 10^{-9})}{0{,}03^2} = 1{,}198\cdot 10^{-4}\;\text{N}"
          variant="blue"
        />
        <p className="text-sm">
          Retning: mot <InlineLatex latex="q_2" />, dvs. ren −y:
        </p>
        <FormulaBox latex="F_{2x} = 0,\quad F_{2y} = -1{,}198\cdot 10^{-4}\;\text{N}" variant="blue" />

        <p><strong>Steg 3: Total kraft</strong></p>
        <FormulaBox
          latex="F_x = 8{,}625\cdot 10^{-5}\;\text{N},\quad F_y = 6{,}469\cdot 10^{-5} - 1{,}198\cdot 10^{-4} = -5{,}51\cdot 10^{-5}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;F_x = +8{,}63\cdot 10^{-5}\;\text{N},\;F_y = -5{,}51\cdot 10^{-5}\;\text{N}\;}"
          variant="gold"
        />

        <p><strong>Steg 4: Størrelse og retning</strong></p>
        <FormulaBox
          latex="|\vec F| = \sqrt{F_x^2 + F_y^2} = \sqrt{(8{,}63)^2 + (5{,}51)^2}\cdot 10^{-5} = 1{,}024\cdot 10^{-4}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="\theta = \arctan\!\left(\frac{-5{,}51}{8{,}63}\right) = -32{,}6°"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;|\vec F| = 1{,}02\cdot 10^{-4}\;\text{N},\;32{,}6°\text{ under }+x\text{-aksen}\;}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> 2D-superposisjon: dekomponer hver kraft i x/y før du summerer.
        Tegn figur og marker vektorene — det gjør mindre sannsynlig at du bommer på fortegn.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.60 — To opphengte ladede kuler, utled formel
  // --------------------------------------------------------------------------
  "21.60": {
    title: "To opphengte kuler — utlede likevektsformel",
    difficulty: "vanskelig",
    pageRef: "s. 740",
    problem: (
      <div className="space-y-2">
        <p>
          To identiske kuler med masse <InlineLatex latex="m" /> henger fra silketråder med lengde{" "}
          <InlineLatex latex="L" /> fra samme punkt. Kulene har samme ladning{" "}
          <InlineLatex latex="q_1 = q_2 = q" />. Radiene er små, så kulene kan behandles som
          punktladninger. Vis at når vinkelen <InlineLatex latex="\theta" /> er liten, er
          likevektsavstanden <InlineLatex latex="d = \left(q^2 L/2\pi\varepsilon_0\,m g\right)^{1/3}" />.{" "}
          (Hint: for liten <InlineLatex latex="\theta" /> er <InlineLatex latex="\tan\theta \approx \sin\theta" />.)
        </p>
        <svg viewBox="0 0 260 260" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <circle cx="130" cy="30" r="5" fill="currentColor" />
          <line x1="130" y1="30" x2="80" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="30" x2="180" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="30" x2="130" y2="200" stroke="currentColor" strokeDasharray="3 3" />
          <circle cx="80" cy="200" r="14" fill="#ef4444" />
          <text x="80" y="204" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <circle cx="180" cy="200" r="14" fill="#ef4444" />
          <text x="180" y="204" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="105" y="120" fontSize="11" fill="currentColor">L</text>
          <text x="150" y="120" fontSize="11" fill="currentColor">L</text>
          <text x="115" y="60" fontSize="11" fill="currentColor">θ θ</text>
          <text x="130" y="225" fontSize="11" textAnchor="middle" fill="currentColor">d</text>
          <line x1="80" y1="216" x2="180" y2="216" stroke="currentColor" strokeDasharray="2 2" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Masse <InlineLatex latex="m" />, trådlengde <InlineLatex latex="L" /></li>
        <li>Ladning på hver kule: <InlineLatex latex="q" /></li>
        <li>Liten vinkel <InlineLatex latex="\theta" /> fra vertikalen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Utrykket for likevektsavstand <InlineLatex latex="d" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Fritt legeme-diagram på én kule: tyngde <InlineLatex latex="mg" /> nedover, trådspenning{" "}
        <InlineLatex latex="T" /> langs tråden, elektrisk kraft <InlineLatex latex="F" /> horisontalt
        bort fra den andre. Dekomponér T i x/y og bruk Newton II både horisontalt og vertikalt. Del
        ligningene → <InlineLatex latex="\tan\theta = F/(mg)" />. Sett inn Coulombs lov og{" "}
        <InlineLatex latex="\sin\theta \approx d/(2L)" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Vertikalt: <InlineLatex latex="T\cos\theta = mg" />. Horisontalt:{" "}
            <InlineLatex latex="T\sin\theta = F" />. Del.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            <InlineLatex latex="\tan\theta \approx \sin\theta \approx d/(2L)" /> for små vinkler, og{" "}
            <InlineLatex latex="F = q^2/(4\pi\varepsilon_0\,d^2)" />. Sett likt og løs for d.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Steg 1: Krefter på én kule</strong></p>
        <p className="text-sm">
          Tråden gir strekk <InlineLatex latex="T" /> langs tråden. Tyngde <InlineLatex latex="mg" />{" "}
          nedover. Coulombkraften <InlineLatex latex="F" /> horisontalt bort fra den andre kulen.
        </p>
        <FormulaBox
          latex="\text{Vertikalt:}\quad T\cos\theta = mg"
          variant="blue"
        />
        <FormulaBox
          latex="\text{Horisontalt:}\quad T\sin\theta = F_e = \frac{q^2}{4\pi\varepsilon_0\,d^2}"
          variant="blue"
        />

        <p><strong>Steg 2: Del ligningene</strong></p>
        <FormulaBox
          latex="\tan\theta = \frac{q^2}{4\pi\varepsilon_0\,d^2\,m g}"
          variant="blue"
        />

        <p><strong>Steg 3: Småvinkel-approksimasjon</strong></p>
        <FormulaBox
          latex="\tan\theta \approx \sin\theta \approx \frac{d/2}{L} = \frac{d}{2L}"
          variant="blue"
        />
        <FormulaBox
          latex="\frac{d}{2L} = \frac{q^2}{4\pi\varepsilon_0\,d^2\,m g}"
          variant="blue"
        />

        <p><strong>Steg 4: Løs for d</strong></p>
        <FormulaBox
          latex="d^3 = \frac{2L\,q^2}{4\pi\varepsilon_0\,mg} = \frac{q^2 L}{2\pi\varepsilon_0\,mg}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;d = \left(\dfrac{q^2 L}{2\pi\varepsilon_0\,m g}\right)^{1/3}\;}"
          variant="gold"
        />
        <p className="text-sm text-[var(--muted)]">
          Q.E.D. Formelen viser at avstanden øker med ladning og trådlengde, men avtar med masse.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Klassisk «pendel + Coulomb»-oppgave. Teknikken med å dele
        horisontal og vertikal Newton-ligning er ekstremt vanlig. Småvinkel-approksimasjonen gjør
        algebraen lett.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.61 — Samme oppsett, numerisk
  // --------------------------------------------------------------------------
  "21.61": {
    title: "Likevekt av to opphengte ladede kuler — numerisk",
    difficulty: "vanskelig",
    pageRef: "s. 740",
    problem: (
      <div className="space-y-2">
        <p>
          To små kuler med masse <InlineLatex latex="m = 15{,}0\;\text{g}" /> henger fra silketråder
          med lengde <InlineLatex latex="L = 1{,}20\;\text{m}" /> fra samme punkt (Fig. P21.60).
          Kulene får like store negative ladninger (<InlineLatex latex="q_1 = q_2 = q" />), og
          hver tråd henger <InlineLatex latex="\theta = 25{,}0°" /> fra vertikalen.
        </p>
        <p>
          <strong>(a)</strong> Tegn frilegemediagram. <strong>(b)</strong> Finn{" "}
          <InlineLatex latex="|q|" />. <strong>(c)</strong> Trådene kortes til{" "}
          <InlineLatex latex="L' = 0{,}600\;\text{m}" /> mens <InlineLatex latex="q" /> forblir. Finn
          den nye vinkelen (ved numerisk iterasjon).
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 15{,}0\;\text{g} = 0{,}0150\;\text{kg}" /></li>
        <li><InlineLatex latex="L = 1{,}20\;\text{m}" />, <InlineLatex latex="\theta = 25{,}0°" /></li>
        <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(b) <InlineLatex latex="|q|" /></li>
        <li>(c) Ny vinkel når <InlineLatex latex="L' = 0{,}600\;\text{m}" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk eksakt samme diagram/likninger som i 21.60, men nå kan vi ikke bruke småvinkel-
        approksimasjonen fordi 25° ikke er lite nok. Bruk <InlineLatex latex="\tan\theta = F/(mg)" />{" "}
        og <InlineLatex latex="d = 2L\sin\theta" /> direkte. Del (c) krever iterasjon siden d
        avhenger av sin θ, men F avhenger av 1/d².
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            For (b): <InlineLatex latex="d = 2L\sin\theta" />,{" "}
            <InlineLatex latex="F_e = mg\tan\theta" />,{" "}
            <InlineLatex latex="|q| = d\sqrt{F_e/k}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            For (c): likevekt gir{" "}
            <InlineLatex latex="\tan\theta \sin^2\theta = kq^2/(4L'^2 mg)" />. Prøv θ-verdier og
            juster.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(b) Finn q</strong></p>
        <FormulaBox
          latex="d = 2L\sin\theta = 2(1{,}20)\sin 25{,}0° = 2{,}40 \cdot 0{,}4226 = 1{,}014\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="F_e = m g \tan\theta = (0{,}0150)(9{,}81)\tan 25{,}0° = 0{,}1472\cdot 0{,}4663 = 0{,}0686\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="|q| = d\sqrt{\frac{F_e}{k}} = 1{,}014\sqrt{\frac{0{,}0686}{8{,}988\cdot 10^9}} = 1{,}014 \cdot 2{,}762\cdot 10^{-6}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;|q| = 2{,}80\cdot 10^{-6}\;\text{C} = 2{,}80\;\mu\text{C}\;}"
          variant="gold"
        />

        <p><strong>(c) Ny vinkel med L' = 0,600 m</strong></p>
        <p className="text-sm">
          Likevektsbetingelsen gir:
        </p>
        <FormulaBox
          latex="\tan\theta = \frac{F_e}{mg} = \frac{kq^2}{mg(2L'\sin\theta)^2} = \frac{kq^2}{4m g L'^2 \sin^2\theta}"
          variant="blue"
        />
        <FormulaBox
          latex="\sin^2\theta\,\tan\theta = \frac{kq^2}{4 m g L'^2}"
          variant="blue"
        />
        <FormulaBox
          latex="\text{RHS} = \frac{(8{,}988\cdot 10^9)(2{,}80\cdot 10^{-6})^2}{4(0{,}0150)(9{,}81)(0{,}600)^2} = \frac{0{,}07046}{0{,}2119} = 0{,}3325"
          variant="blue"
        />
        <p className="text-sm">
          Vi prøver verdier. Ved θ = 25°: sin²·tan = 0,0832 (for lite). Ved θ = 45°:
          sin²·tan = 0,5 (for stort). Ved θ = 40°: sin²·tan = 0,4134·0,839 = 0,347 (litt for stort).{" "}
          Ved θ = 39°: 0,396·0,810 = 0,321 (litt for lite). Ved θ ≈ 39,5°: 0,405·0,824 = 0,334. Treff!
        </p>
        <FormulaBox
          latex="\boxed{\;\theta \approx 39{,}5°\;}"
          variant="gold"
        />
        <p className="text-sm text-[var(--muted)]">
          Kortere tråd gir mindre plass → samme ladning gir sterkere frastøtning → større vinkel.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Når vinkelen ikke er liten, må vi bruke eksakt trigonometri.
        Ligningen <InlineLatex latex="\sin^2\theta\,\tan\theta = \text{konst}" /> har ikke analytisk
        løsning og må løses numerisk.
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.88 — Inkjet printer design
  // --------------------------------------------------------------------------
  "21.88": {
    title: "Design av blekkskriver",
    difficulty: "vanskelig",
    pageRef: "s. 743",
    problem: (
      <div className="space-y-2">
        <p>
          En blekkskriver dytter en blekkdråpe med masse{" "}
          <InlineLatex latex="m = 1{,}4\cdot 10^{-8}\;\text{g}" /> i horisontal retning med fart{" "}
          <InlineLatex latex="v_0 = 50\;\text{m/s}" /> gjennom en ladeenhet som gir den ladningen{" "}
          <InlineLatex latex="+q" /> (ved å fjerne elektroner). Deretter passerer dråpen mellom to
          parallelle avbøyningsplater med lengde <InlineLatex latex="L = 2{,}0\;\text{cm}" /> der
          det er et uniformt vertikalt felt <InlineLatex latex="E = 8{,}0\cdot 10^4\;\text{N/C}" />.
        </p>
        <p>
          <strong>(a)</strong> Hvor stor må <InlineLatex latex="q" /> være for at dråpen avbøyes
          <InlineLatex latex="\;0{,}30\;\text{mm}" /> idet den forlater platene? Hvor mange
          elektroner må fjernes? <strong>(b)</strong> Hvis dråpens fart endres til{" "}
          <InlineLatex latex="25\;\text{m/s}" />, hva blir da <InlineLatex latex="q" /> for samme
          avbøyning?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 1{,}4\cdot 10^{-8}\;\text{g} = 1{,}4\cdot 10^{-11}\;\text{kg}" /></li>
        <li><InlineLatex latex="v_0 = 50\;\text{m/s}" /> (del a); <InlineLatex latex="v_0 = 25\;\text{m/s}" /> (del b)</li>
        <li><InlineLatex latex="L = 2{,}0\;\text{cm} = 0{,}020\;\text{m}" /></li>
        <li><InlineLatex latex="E = 8{,}0\cdot 10^4\;\text{N/C}" /></li>
        <li><InlineLatex latex="d = 0{,}30\;\text{mm} = 3{,}0\cdot 10^{-4}\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) <InlineLatex latex="q" />, antall fjernede elektroner</li>
        <li>(b) <InlineLatex latex="q" /> ved halv fart</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Prosjektilbevegelse: tid i feltet <InlineLatex latex="t = L/v_0" />, akselerasjon{" "}
        <InlineLatex latex="a = qE/m" />, avbøyning <InlineLatex latex="d = \tfrac12 at^2" />.
        Kombiner:{" "}
        <InlineLatex latex="q = 2\,d\,m\,v_0^2/(E\,L^2)" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Skriv ut <InlineLatex latex="d" /> i symboler før du setter inn tall.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            Antall elektroner: <InlineLatex latex="N = q/e" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Del (a)</strong></p>
        <FormulaBox
          latex="q = \frac{2\,d\,m\,v_0^2}{E\,L^2}"
          variant="blue"
        />
        <FormulaBox
          latex="q = \frac{2(3{,}0\cdot 10^{-4})(1{,}4\cdot 10^{-11})(50)^2}{(8{,}0\cdot 10^4)(0{,}020)^2}"
          variant="blue"
        />
        <FormulaBox
          latex="q = \frac{2(3{,}0\cdot 10^{-4})(1{,}4\cdot 10^{-11})(2500)}{(8{,}0\cdot 10^4)(4{,}0\cdot 10^{-4})} = \frac{2{,}10\cdot 10^{-11}}{32}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;q = 6{,}56\cdot 10^{-13}\;\text{C}\;}"
          variant="gold"
        />
        <FormulaBox
          latex="N = \frac{q}{e} = \frac{6{,}56\cdot 10^{-13}}{1{,}602\cdot 10^{-19}} = \boxed{\;4{,}1\cdot 10^{6}\;\text{elektroner}\;}"
          variant="gold"
        />

        <p><strong>Del (b) — v₀ = 25 m/s</strong></p>
        <p className="text-sm">
          <InlineLatex latex="q" /> er proporsjonal med <InlineLatex latex="v_0^2" />. Halveres{" "}
          <InlineLatex latex="v_0" />, så blir <InlineLatex latex="q" /> redusert med faktor 4:
        </p>
        <FormulaBox
          latex="q' = q\cdot(1/2)^2 = 6{,}56\cdot 10^{-13}/4 = \boxed{\;1{,}64\cdot 10^{-13}\;\text{C}\;}"
          variant="gold"
        />
        <p className="text-sm text-[var(--muted)]">
          Mindre fart → mer tid i feltet → større avbøyning for samme q. Derfor trengs bare en fjerdedel
          av ladningen.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Inkjet-geometri er et klassisk «ladet prosjektil i uniformt
        felt»-problem. Utled formelen{" "}
        <InlineLatex latex="q = 2dmv_0^2/(EL^2)" /> og bruk skalering for å unngå ny regning i (b).
      </p>
    ),
  },

  // --------------------------------------------------------------------------
  // 21.95 — Tre ladninger, finne q2 med krav om retning
  // --------------------------------------------------------------------------
  "21.95": {
    title: "Tre ladninger med tvungen retning",
    difficulty: "vanskelig",
    pageRef: "s. 744 (Challenge)",
    problem: (
      <div className="space-y-2">
        <p>
          Tre ladninger er plassert som vist i Fig. P21.95. Størrelsen av{" "}
          <InlineLatex latex="q_1" /> er <InlineLatex latex="2{,}00\;\mu\text{C}" />, men fortegn
          og verdi av <InlineLatex latex="q_2" /> er ukjent. <InlineLatex latex="q_3 = +4{,}00\;\mu\text{C}" />,
          og netto kraft <InlineLatex latex="\vec F" /> på <InlineLatex latex="q_3" /> er <em>kun</em>{" "}
          i −x-retning.
        </p>
        <p>
          <strong>(a)</strong> For hvert mulig fortegn på <InlineLatex latex="q_1" />, tegn de fire
          mulige kraftdiagrammene (<InlineLatex latex="\vec F_1,\;\vec F_2" />).{" "}
          <strong>(b)</strong> Deduser fortegnene. <strong>(c)</strong> Beregn{" "}
          <InlineLatex latex="|q_2|" />. <strong>(d)</strong> Finn <InlineLatex latex="F" />.
        </p>
        <svg viewBox="0 0 340 220" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* Triangle: q1 bottom-left, q2 bottom-right, q3 top; sides 4.00, 3.00, 5.00 */}
          {/* q1 at (60, 180), q2 at (260, 180), q3 at top */}
          <circle cx="60" cy="180" r="12" fill="#a855f7" />
          <text x="60" y="184" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">?</text>
          <text x="60" y="205" fontSize="10" textAnchor="middle" fill="currentColor">q₁</text>
          <circle cx="260" cy="180" r="12" fill="#a855f7" />
          <text x="260" y="184" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">?</text>
          <text x="260" y="205" fontSize="10" textAnchor="middle" fill="currentColor">q₂</text>
          <circle cx="140" cy="60" r="12" fill="#ef4444" />
          <text x="140" y="64" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">+</text>
          <text x="140" y="40" fontSize="10" textAnchor="middle" fill="currentColor">q₃</text>
          {/* Lines */}
          <line x1="60" y1="180" x2="260" y2="180" stroke="currentColor" />
          <line x1="60" y1="180" x2="140" y2="60" stroke="currentColor" />
          <line x1="140" y1="60" x2="260" y2="180" stroke="currentColor" />
          <text x="160" y="195" fontSize="10" textAnchor="middle" fill="currentColor">5,00 cm</text>
          <text x="80" y="115" fontSize="10" fill="currentColor">4,00 cm</text>
          <text x="210" y="115" fontSize="10" fill="currentColor">3,00 cm</text>
          {/* F arrow on q3 */}
          <line x1="140" y1="60" x2="90" y2="60" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <text x="105" y="52" fontSize="10" fill="#10b981">F</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="|q_1| = 2{,}00\;\mu\text{C}" /></li>
        <li><InlineLatex latex="q_3 = +4{,}00\;\mu\text{C}" /></li>
        <li>Avstander: 4 cm, 3 cm, 5 cm (3-4-5 rettvinklet trekant, rett vinkel ved q₃)</li>
        <li>Resulterende kraft på <InlineLatex latex="q_3" /> er ren −x (mot venstre)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Fortegn på <InlineLatex latex="q_1,\;q_2" /></li>
        <li><InlineLatex latex="|q_2|" /></li>
        <li><InlineLatex latex="F" /> (størrelsen)</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Trekantens vinkler: hjørnet ved <InlineLatex latex="q_1" /> har sin = 3/5, cos = 4/5;
        hjørnet ved <InlineLatex latex="q_2" /> har sin = 4/5, cos = 3/5. Dekomponér{" "}
        <InlineLatex latex="\vec F_1" /> og <InlineLatex latex="\vec F_2" /> i x/y.
        Krav: y-komponenter opphever hverandre, x-komponent blir negativ.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p className="text-sm">
            Retning av <InlineLatex latex="\vec F_1" /> (som virker på <InlineLatex latex="q_3" />{" "}
            fra <InlineLatex latex="q_1" />) avhenger av fortegnet på <InlineLatex latex="q_1" />.
            Siden q₃ er +, må kraften være <em>langs</em> linjen q₁→q₃ hvis q₁ er negativ
            (tiltrekkende) og motsatt hvis positiv. Tilsvarende for q₂.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p className="text-sm">
            For at y-komponentene skal oppheve hverandre må én kraft peke i +y og en i −y. Det gir
            at fortegnene på q₁ og q₂ må være like. For at summen av x-komponentene skal bli negativ,
            må begge peke mot venstre (dvs. både <InlineLatex latex="q_1" /> og{" "}
            <InlineLatex latex="q_2" /> er <strong>negative</strong>, slik at <InlineLatex latex="q_3" />{" "}
            tiltrekkes mot dem).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Steg 1: Geometri</strong></p>
        <p className="text-sm">
          3–4–5 trekant. Ved <InlineLatex latex="q_3" />: vinkelen mellom linje q₃→q₁ (langs 4 cm)
          og nedre linje er slik at x-komponenten av denne retningen er{" "}
          <InlineLatex latex="-4/5" />, y-komponenten <InlineLatex latex="-3/5" /> (retning <em>ned-venstre</em>).
          Vinkelen mellom q₃→q₂ (langs 3 cm) har x-komponent <InlineLatex latex="+3/5" />,
          y-komponent <InlineLatex latex="-4/5" /> (<em>ned-høyre</em>).
        </p>

        <p><strong>Steg 2: Fortegn — deduksjon</strong></p>
        <p className="text-sm">
          Hvis <InlineLatex latex="q_1 < 0" />: <InlineLatex latex="q_3" /> tiltrekkes mot{" "}
          <InlineLatex latex="q_1" /> → <InlineLatex latex="\vec F_1" /> peker ned-venstre{" "}
          (<InlineLatex latex="-4/5" />, <InlineLatex latex="-3/5" />).
          Hvis <InlineLatex latex="q_2 < 0" />: <InlineLatex latex="\vec F_2" /> peker ned-høyre
          (<InlineLatex latex="+3/5" />, <InlineLatex latex="-4/5" />).
          Y-komponenten av total F er da <InlineLatex latex="-3/5\,F_1 - 4/5\,F_2" />, som <em>ikke</em>{" "}
          kan bli null. Derfor må begge ladninger være <strong>positive</strong>:
          <InlineLatex latex="\vec F_1" /> peker da <em>opp-høyre</em> (<InlineLatex latex="+4/5" />, <InlineLatex latex="+3/5" />),
          <InlineLatex latex="\vec F_2" /> peker <em>opp-venstre</em> (<InlineLatex latex="-3/5" />, <InlineLatex latex="+4/5" />).
          Men x-komponenten blir da <InlineLatex latex="+4/5 F_1 - 3/5 F_2" />, som kan bli negativ
          hvis <InlineLatex latex="F_2 > (4/3) F_1" />. Videre må y-komponenten være null:
          <InlineLatex latex="\;3/5 F_1 + 4/5 F_2 = 0" /> — umulig for positive F!
          Konklusjon: fortegnene må være <em>motsatte</em> slik at vi får kombinasjonen riktig.
          Riktig kombinasjon: <InlineLatex latex="q_1 > 0" /> (frastøtende, <InlineLatex latex="\vec F_1" /> peker opp-høyre:
          <InlineLatex latex="\,+4/5,\,+3/5" />) og <InlineLatex latex="q_2 < 0" /> (tiltrekkende,
          <InlineLatex latex="\vec F_2" /> peker ned-høyre: <InlineLatex latex="\,+3/5,\,-4/5" />).
          Y-sum: <InlineLatex latex="3/5 F_1 - 4/5 F_2 = 0 \Rightarrow F_2 = (3/4) F_1" />. X-sum:{" "}
          <InlineLatex latex="4/5 F_1 + 3/5 F_2 > 0" /> — ikke negativ heller. Prøv:{" "}
          <InlineLatex latex="q_1 < 0" /> (<InlineLatex latex="\vec F_1" /> ned-venstre: <InlineLatex latex="-4/5,\,-3/5" />)
          og <InlineLatex latex="q_2 > 0" /> (<InlineLatex latex="\vec F_2" /> opp-venstre: <InlineLatex latex="-3/5,\,+4/5" />).
          Y: <InlineLatex latex="-3/5 F_1 + 4/5 F_2 = 0 \Rightarrow F_2 = (3/4) F_1" />.
          X: <InlineLatex latex="-4/5 F_1 - 3/5 F_2 < 0" /> ✓
        </p>
        <FormulaBox
          latex="\boxed{\;q_1 < 0,\quad q_2 > 0\;}"
          variant="gold"
        />

        <p><strong>Steg 3: Bestem <InlineLatex latex="|q_2|" /></strong></p>
        <FormulaBox
          latex="F_1 = \frac{k|q_1 q_3|}{(0{,}04)^2},\quad F_2 = \frac{k|q_2 q_3|}{(0{,}03)^2}"
          variant="blue"
        />
        <FormulaBox
          latex="F_2 = \tfrac34 F_1 \;\Longrightarrow\; \frac{|q_2|}{(0{,}03)^2} = \tfrac{3}{4}\cdot\frac{|q_1|}{(0{,}04)^2}"
          variant="blue"
        />
        <FormulaBox
          latex="|q_2| = \tfrac{3}{4}\cdot|q_1|\cdot\frac{(0{,}03)^2}{(0{,}04)^2} = \tfrac{3}{4}\cdot 2{,}00\cdot\frac{9}{16} = 0{,}844\;\mu\text{C}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;q_2 = +0{,}844\;\mu\text{C}\;}"
          variant="gold"
        />

        <p><strong>Steg 4: Finn F</strong></p>
        <FormulaBox
          latex="F_1 = \frac{(8{,}988\cdot 10^9)(2{,}00\cdot 10^{-6})(4{,}00\cdot 10^{-6})}{(0{,}04)^2} = \frac{0{,}07190}{1{,}6\cdot 10^{-3}} = 44{,}94\;\text{N}"
          variant="blue"
        />
        <FormulaBox latex="F_2 = \tfrac34 F_1 = 33{,}71\;\text{N}" variant="blue" />
        <FormulaBox
          latex="F = |F_x| = \tfrac45 F_1 + \tfrac35 F_2 = 0{,}8\cdot 44{,}94 + 0{,}6\cdot 33{,}71"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{\;F = 35{,}95 + 20{,}23 = 56{,}2\;\text{N}\;}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Hva lærte vi?</strong> Når vi kjenner retningen til resultantkraften, er det som å
        ha to ligninger (én for hver komponent). Bruk det til å både dedusere fortegn og løse for
        ukjente størrelser. Sjekk alltid geometrien nøye!
      </p>
    ),
  },
};
