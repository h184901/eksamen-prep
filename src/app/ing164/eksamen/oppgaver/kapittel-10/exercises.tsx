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
// SVG-helpere
// ============================================================================

function Arrowheads() {
  return (
    <defs>
      <marker id="arrow-red-k10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 10.1 — Dreiemoment om O fra kraft F i seks ulike tilfeller
  // ==========================================================================
  "10.1": {
    title: "Dreiemoment i seks ulike kraftretninger",
    difficulty: "lett",
    pageRef: "s. 356",
    problem: (
      <div className="space-y-2">
        <p>
          Beregn dreiemomentet (størrelse og retning) om punkt <InlineLatex latex="O" /> som skyldes
          kraften <InlineLatex latex="\vec{F}" /> i hvert av tilfellene (a)–(f). I hvert tilfelle ligger både
          kraften og staven i bildeplanet, staven har lengde <InlineLatex latex="4{,}00\;\text{m}" />, og
          kraftstørrelsen er <InlineLatex latex="F = 15{,}0\;\text{N}" />.
        </p>
        <p className="text-xs text-[var(--muted)]">
          (a) 90° ved fri ende · (b) 120° ved fri ende · (c) 30° ved fri ende ·
          (d) 60° i midten (2,00 m fra O) · (e) 60° ved O · (f) langs staven
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Stavens lengde: <InlineLatex latex="L = 4{,}00\;\text{m}" /></li>
        <li>Kraftstørrelse: <InlineLatex latex="F = 15{,}0\;\text{N}" /></li>
        <li>Pivot i <InlineLatex latex="O" /> ved stavens venstre ende</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Dreiemomentets størrelse og retning i hvert tilfelle</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk <InlineLatex latex="\tau = rF\sin\phi" />, hvor <InlineLatex latex="r" /> er avstanden fra
        pivot til angrepspunktet og <InlineLatex latex="\phi" /> er vinkelen mellom{" "}
        <InlineLatex latex="\vec{r}" /> og <InlineLatex latex="\vec{F}" />. Retningen (inn/ut av planet)
        får du med høyrehåndsregelen.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Alternativ form: <InlineLatex latex="\tau = F_{\perp}\,r = F\sin\phi\cdot r" />. Komponenten
            av kraften som virker langs staven gir null bidrag.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Hvis kraften virker <strong>gjennom</strong> pivotpunktet (<InlineLatex latex="r=0" />) eller
            <strong> langs</strong> staven (<InlineLatex latex="\phi = 0" />), er dreiemomentet null.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Dreiemoment er rotasjonsanalogen til kraft. Akkurat som en kraft <InlineLatex latex="F" /> gir
          lineær akselerasjon <InlineLatex latex="a = F/m" />, gir et dreiemoment{" "}
          <InlineLatex latex="\tau" /> vinkelakselerasjon <InlineLatex latex="\alpha = \tau/I" />. Det er
          IKKE bare kraften som teller — det er hvor langt fra pivoten kraften virker og i hvilken
          retning. Tenk på en dør: du presser alltid ytterst og vinkelrett, aldri nær hengslene eller
          langs døra.
        </p>
        <p>Originalformelen for dreiemoment:</p>
        <FormulaBox latex="\tau = rF\sin\phi = r_\perp F = rF_\perp" variant="blue" />
        <p>
          Her er <InlineLatex latex="r" /> avstanden fra pivoten til angrepspunktet,{" "}
          <InlineLatex latex="F" /> kraftstørrelsen og <InlineLatex latex="\phi" /> vinkelen mellom{" "}
          <InlineLatex latex="\vec r" /> og <InlineLatex latex="\vec F" />. De tre uttrykkene er
          ekvivalente: <InlineLatex latex="r_\perp = r\sin\phi" /> er <em>momentarmen</em> (den
          vinkelrette avstanden fra pivot til kraftens virkelinje), mens{" "}
          <InlineLatex latex="F_\perp = F\sin\phi" /> er komponenten av kraften som står vinkelrett
          på radiusvektoren. Kraftens komponent <em>langs</em> <InlineLatex latex="\vec r" /> gir
          aldri dreiemoment fordi den bare strekker/trykker materialet, ikke dreier det.
        </p>
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          Vi bruker <InlineLatex latex="\tau = rF\sin\phi" /> fremfor Newton II{" "}
          <InlineLatex latex="F=ma" /> fordi problemet handler om rotasjon om et fast punkt, ikke
          translasjon. Pivoten O er låst, så netto translasjon er uinteressant; det eneste som skjer
          er at staven dreier.
        </p>
        <p className="font-semibold mt-4">(a) <InlineLatex latex="\phi = 90°" /> ved fri ende</p>
        <p>
          Kraften står vinkelrett på staven helt ute ved <InlineLatex latex="r = L = 4{,}00\;\text{m}" />.
          Dette er den <strong>mest effektive</strong> orienteringen — hele kraften brukes til å dreie.
        </p>
        <FormulaBox latex="\tau_a = (4{,}00)(15{,}0)\sin 90° = (4{,}00)(15{,}0)(1) = 60{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">(b) <InlineLatex latex="\phi = 120°" /> ved fri ende</p>
        <p>
          Vinkelen over 90° — bare komponenten vinkelrett på staven bidrar. Merk at{" "}
          <InlineLatex latex="\sin 120° = \sin 60° = \sqrt3/2 \approx 0{,}866" />.
        </p>
        <FormulaBox latex="\tau_b = (4{,}00)(15{,}0)(0{,}866) = 52{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">(c) <InlineLatex latex="\phi = 30°" /> ved fri ende</p>
        <p>
          Liten vinkel → mye av kraften virker langs staven (ubrukelig), bare{" "}
          <InlineLatex latex="\sin 30° = 0{,}500" /> av kraften gir dreiemoment.
        </p>
        <FormulaBox latex="\tau_c = (4{,}00)(15{,}0)(0{,}500) = 30{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">(d) Halvveis på staven, <InlineLatex latex="\phi = 60°" /></p>
        <p>
          Samme kraft, men halvert arm: <InlineLatex latex="r = 2{,}00\;\text{m}" />. Dreiemoment er
          lineært i <InlineLatex latex="r" />, så vi forventer omtrent halvparten av (a).
        </p>
        <FormulaBox latex="\tau_d = (2{,}00)(15{,}0)\sin 60° = (2{,}00)(15{,}0)(0{,}866) = 26{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">(e) Ved pivot (<InlineLatex latex="r = 0" />)</p>
        <p>
          Kraften virker direkte gjennom O. Ingen arm → ingen dreiemoment, uansett retning på kraften.
          Analogi: du kan ikke åpne en dør ved å trykke på hengselen.
        </p>
        <FormulaBox latex="\tau_e = (0)(15{,}0)\sin\phi = 0" variant="blue" />
        <p className="font-semibold mt-4">(f) Langs staven (<InlineLatex latex="\phi = 0" />)</p>
        <p>
          Kraften er radial: den strekker staven, men kan ikke dreie den. <InlineLatex latex="\sin 0 = 0" />.
        </p>
        <FormulaBox latex="\tau_f = (4{,}00)(15{,}0)\sin 0° = 0" variant="blue" />
        <p className="font-semibold mt-4">Fortegn og retning</p>
        <p>
          Retningen finner vi med høyrehåndsregelen for <InlineLatex latex="\vec\tau = \vec r\times\vec F" />.
          Pek fingrene langs <InlineLatex latex="\vec r" /> (fra O til angrepspunktet), krøll dem mot{" "}
          <InlineLatex latex="\vec F" />; tommelen viser dreiemomentets retning. For (a)–(d) peker den
          inn i bildeplanet (med klokken sett ovenfra).
        </p>
        <p className="font-semibold mt-4">Enhetssjekk</p>
        <p>
          <InlineLatex latex="[\tau] = \text{m}\cdot\text{N} = \text{N·m}" />. Merk at N·m er numerisk
          likt joule, men vi skriver <strong>aldri</strong> dreiemoment som J — det er et vektorkryss­produkt,
          ikke et skalart energimål.
        </p>
        <FormulaBox latex="\boxed{\tau_a=60{,}0\;\text{N·m},\;\tau_b=52{,}0\;\text{N·m},\;\tau_c=30{,}0\;\text{N·m}}" variant="gold" />
        <FormulaBox latex="\boxed{\tau_d=26{,}0\;\text{N·m},\;\tau_e=0,\;\tau_f=0}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Fysisk tolkning: (a) er optimalt — hele kraften brukes. (c) bruker halvparten,
          (e) og (f) er bortkastet. Dette mønsteret gjenspeiles i alt fra skrunøkler til vindmøller:
          plasser krefter vinkelrett og så langt fra aksen som mulig.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Dreiemoment er produktet av kraftens <strong>vinkelrette</strong> komponent og armen fra pivot.
        Krefter gjennom pivot eller langs armen gir null dreiemoment – det er ofte nøkkelen i likevektsproblemer.
      </p>
    ),
  },

  // ==========================================================================
  // 10.2 — Netto dreiemoment fra to krefter på en stav
  // ==========================================================================
  "10.2": {
    title: "Netto dreiemoment om O",
    difficulty: "lett",
    pageRef: "s. 356",
    problem: (
      <div className="space-y-2">
        <p>
          Beregn det netto dreiemomentet om <InlineLatex latex="O" /> fra de to kreftene i figuren.
          Staven og begge kreftene ligger i bildeplanet.
        </p>
        <svg viewBox="0 0 340 140" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <circle cx="40" cy="90" r="4" fill="currentColor" />
          <text x="30" y="82" fontSize="11" fill="currentColor">O</text>
          <line x1="40" y1="90" x2="300" y2="90" stroke="currentColor" strokeWidth="2.5" />
          {/* F2 at 2.00m */}
          <line x1="140" y1="90" x2="110" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k10)" />
          <text x="85" y="45" fontSize="11" fill="#ef4444">F₂ = 12,0 N</text>
          <text x="145" y="75" fontSize="10" fill="#ef4444">30°</text>
          {/* F1 at end */}
          <line x1="280" y1="90" x2="280" y2="40" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k10)" />
          <text x="260" y="35" fontSize="11" fill="#3b82f6">F₁ = 8,00 N</text>
          {/* distance labels */}
          <text x="80" y="110" fontSize="10" fill="currentColor">2,00 m</text>
          <text x="200" y="110" fontSize="10" fill="currentColor">3,00 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="F_1 = 8{,}00\;\text{N}" /> (loddrett oppover), virker 5,00 m fra O</li>
        <li><InlineLatex latex="F_2 = 12{,}0\;\text{N}" /> (30° fra staven), virker 2,00 m fra O</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Netto dreiemoment <InlineLatex latex="\tau_\text{net}" /> om O</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Beregn dreiemomentet fra hver kraft med{" "}
        <InlineLatex latex="\tau_i = r_i F_i \sin\phi_i" />. Velg fortegn etter retning (f.eks. + ut
        av planet = mot klokken) og summer.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="F_1" /> står vinkelrett på staven, så{" "}
            <InlineLatex latex="\tau_1 = r_1 F_1 = 5{,}00 \times 8{,}00" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For <InlineLatex latex="F_2" /> er det bare komponenten som står vinkelrett på staven (
            <InlineLatex latex="F_2\sin 30°" />) som bidrar.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Når flere krefter virker på samme stive kropp, er netto dreiemoment summen av hvert bidrag
          med <strong>fortegn</strong>. Dreiemomentet er en vektor; i et plan kan vi redusere det til
          et skalar ved å velge en positiv rotasjonsretning. Dette er helt analogt med at vi i 1D
          velger «positiv x» og tar kraften med fortegn:
        </p>
        <FormulaBox latex="\tau_\text{net} = \sum_i \tau_i = \sum_i r_i F_i \sin\phi_i" variant="blue" />
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          Vi kunne brukt kryssprodukt <InlineLatex latex="\vec\tau = \vec r\times\vec F" />, men når
          alle krefter og posisjoner ligger i samme plan, gir hvert kryssprodukt et bidrag langs
          samme akse. Da reduseres vektorregningen til et skalart fortegn: <strong>+</strong> for mot
          klokken (ut av planet, <InlineLatex latex="+\hat z" />), <strong>−</strong> for med klokken.
        </p>
        <p className="font-semibold mt-4">Valg av positiv retning</p>
        <p>
          Vi velger <strong>mot klokken (ut av planet)</strong> som positiv — konvensjon fra
          høyrehåndsregelen. Dette er et fritt valg, men må brukes konsistent.
        </p>
        <p className="font-semibold mt-4">Dreiemoment fra <InlineLatex latex="F_1" /></p>
        <p>
          <InlineLatex latex="F_1 = 8{,}00\;\text{N}" /> står rett opp, altså vinkelrett på staven
          (<InlineLatex latex="\phi = 90°" />). Arm <InlineLatex latex="r_1 = 5{,}00\;\text{m}" />.
          Retning: en loddrett oppkraft i høyre enden dreier staven mot klokken (oppover på høyre
          side, altså positivt).
        </p>
        <FormulaBox latex="\tau_1 = +r_1 F_1 \sin 90° = +(5{,}00)(8{,}00)(1) = +40{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Dreiemoment fra <InlineLatex latex="F_2" /></p>
        <p>
          <InlineLatex latex="F_2 = 12{,}0\;\text{N}" /> lager 30° med staven og peker opp-venstre.
          Bare den vinkelrette komponenten <InlineLatex latex="F_{2,\perp} = F_2\sin 30° = 6{,}00\;\text{N}" />{" "}
          dreier. Kraften angriper 2,00 m fra O, og retningen (opp-venstre på venstre side av O)
          dreier staven med klokken — altså negativt.
        </p>
        <FormulaBox latex="\tau_2 = -r_2 F_2 \sin 30° = -(2{,}00)(12{,}0)(0{,}500) = -12{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Sum</p>
        <FormulaBox latex="\tau_\text{net} = \tau_1 + \tau_2 = +40{,}0 - 12{,}0 = +28{,}0\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Fortegns­tolkning</p>
        <p>
          Positivt svar → netto dreiemoment mot klokken, altså ut av bildeplanet.{" "}
          <InlineLatex latex="F_1" /> vinner; staven vil dreie oppover i høyre ende hvis den får.
        </p>
        <p className="font-semibold mt-4">Enhetssjekk</p>
        <p>
          <InlineLatex latex="[\text{N·m}] = [\text{N}][\text{m}]" />, og{" "}
          <InlineLatex latex="\sin\phi" /> er dimensjonsløst. OK.
        </p>
        <FormulaBox latex="\boxed{\tau_\text{net} = 28{,}0\;\text{N·m}\;\text{mot klokken (ut av planet)}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Kryss­sjekk: en skrunøkkel-analogi. En kraft rett opp i enden av nøkkelen løsner mutteren
          (mot klokken). En skrå kraft nærmere mutteren bremser den. Netto: løsnes fortsatt.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        For netto dreiemoment: fortegnskonvensjon er essensiell. Bruk{" "}
        <InlineLatex latex="F\sin\phi" /> for vinklede krefter, og hold orden på hvilken retning
        (med/mot klokken) hvert bidrag prøver å dreie kroppen i.
      </p>
    ),
  },

  // ==========================================================================
  // 10.3 — Netto dreiemoment på kvadratisk plate
  // ==========================================================================
  "10.3": {
    title: "Netto dreiemoment på kvadratisk metallplate",
    difficulty: "middels",
    pageRef: "s. 356",
    problem: (
      <div className="space-y-2">
        <p>
          En kvadratisk metallplate 0,180 m på hver side er lagret i en friksjonsfri akse gjennom
          senteret O, vinkelrett på platen. Beregn det netto dreiemomentet om denne aksen fra de tre
          kreftene <InlineLatex latex="F_1 = 24{,}0\;\text{N}" />,{" "}
          <InlineLatex latex="F_2 = 15{,}8\;\text{N}" /> og <InlineLatex latex="F_3 = 15{,}5\;\text{N}" />.
        </p>
        <svg viewBox="0 0 260 220" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <rect x="50" y="30" width="160" height="160" fill="#fbbf2433" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="130" cy="110" r="3" fill="currentColor" />
          <text x="118" y="108" fontSize="10" fill="currentColor">O</text>
          {/* F2 top-left going left */}
          <line x1="50" y1="110" x2="10" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k10)" />
          <text x="5" y="102" fontSize="10" fill="#3b82f6">F₂</text>
          {/* F1 right side going right */}
          <line x1="210" y1="50" x2="250" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k10)" />
          <text x="218" y="42" fontSize="10" fill="#ef4444">F₁</text>
          {/* F3 bottom right at 45° */}
          <line x1="210" y1="190" x2="240" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k10)" />
          <text x="218" y="215" fontSize="10" fill="#10b981">F₃</text>
          <text x="195" y="205" fontSize="9" fill="currentColor">45°</text>
          <text x="118" y="22" fontSize="9" fill="currentColor">0,180 m</text>
          <text x="5" y="55" fontSize="9" fill="currentColor" transform="rotate(-90 8 55)">0,180 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Platens side: <InlineLatex latex="a = 0{,}180\;\text{m}" /> (så halv side{" "}
          <InlineLatex latex="a/2 = 0{,}090\;\text{m}" />)</li>
        <li><InlineLatex latex="F_1 = 24{,}0\;\text{N}" /> på høyre side, langs positive y-retning</li>
        <li><InlineLatex latex="F_2 = 15{,}8\;\text{N}" /> i venstre-kanten, peker utover (x-retning)</li>
        <li><InlineLatex latex="F_3 = 15{,}5\;\text{N}" /> i nedre-høyre hjørne, 45° med siden</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Netto dreiemoment <InlineLatex latex="\tau_\text{net}" /> om O</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Finn armen (vinkelrett avstand fra O til kraftens virkelinje) for hver kraft og beregn
        dreiemomentet. Summer med fortegn.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            For <InlineLatex latex="F_1" /> og <InlineLatex latex="F_2" /> er armen halve sidelengden,{" "}
            <InlineLatex latex="0{,}090\;\text{m}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For <InlineLatex latex="F_3" /> i hjørnet: armen er lengden til loddretten fra O til kraftlinjen.
            Når kraften står 45° mot siden, blir armen{" "}
            <InlineLatex latex="a\sin 45° = 0{,}090\sqrt{2}\;\text{m}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          For en utstrakt stiv kropp (en plate) med flere krefter må vi identifisere{" "}
          <strong>momentarmen</strong> (den vinkelrette avstanden fra O til kraftens virkelinje) for
          hver kraft. Formelen er:
        </p>
        <FormulaBox latex="\tau = r_\perp F \qquad\text{eller}\qquad \tau = rF\sin\phi" variant="blue" />
        <p>
          For krefter som virker i platens plan og om en akse vinkelrett på planet, blir dreiemomentet
          en skalar med fortegn. Positivt: mot klokken (ut av planet). Samme prinsipp som 10.1/10.2,
          men på en 2D utvidet kropp der vi må være nøye med hvor hver kraft angriper.
        </p>
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          Akselen går gjennom senteret O, så ingen translasjon; kun rotasjon er interessant. Vi bruker
          superposisjonen <InlineLatex latex="\tau_\text{net} = \sum \tau_i" />.
        </p>
        <p className="font-semibold mt-4"><InlineLatex latex="F_1 = 24{,}0\;\text{N}" /> på høyre side, oppover</p>
        <p>
          Angrepet er på platens høyre kant, midt oppe. Armen fra O er halve sidelengden{" "}
          <InlineLatex latex="r = a/2 = 0{,}090\;\text{m}" />, og kraften er vinkelrett på armen
          (<InlineLatex latex="\phi = 90°" />). En oppkraft på høyre side dreier mot klokken →
          positivt.
        </p>
        <FormulaBox latex="\tau_1 = +(0{,}090)(24{,}0)\sin 90° = +2{,}16\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4"><InlineLatex latex="F_2 = 15{,}8\;\text{N}" /> på venstre side, utover</p>
        <p>
          Kraften angriper midten av venstre kant og peker horisontalt ut (negativ x-retning). Armen
          fra O er igjen <InlineLatex latex="0{,}090\;\text{m}" />; kraften står vinkelrett på armen.
          En utoverkraft på venstre side dreier med klokken → negativt.
        </p>
        <FormulaBox latex="\tau_2 = -(0{,}090)(15{,}8)\sin 90° = -1{,}42\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4"><InlineLatex latex="F_3 = 15{,}5\;\text{N}" /> i nedre-høyre hjørne, 45°</p>
        <p>
          Hjørnet ligger i <InlineLatex latex="(a/2, -a/2) = (0{,}090, -0{,}090)" />. Avstanden fra O
          er <InlineLatex latex="r_3 = \sqrt{0{,}090^2 + 0{,}090^2} = 0{,}090\sqrt 2\;\text{m}" />.
          Kraften står vinkelrett på radiusvektoren (sett fra figuren), så <InlineLatex latex="\sin\phi = 1" />.
          Retningen dreier med klokken (negativ).
        </p>
        <FormulaBox latex="|\tau_3| = (0{,}090\sqrt 2)(15{,}5) = (0{,}1273)(15{,}5) = 1{,}97\;\text{N·m}" variant="blue" />
        <FormulaBox latex="\tau_3 = -1{,}97\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Sum</p>
        <FormulaBox latex="\tau_\text{net} = +2{,}16 - 1{,}42 - 1{,}97 = -1{,}23\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Fortegns­tolkning</p>
        <p>
          Negativt svar → med klokken (inn i planet). <InlineLatex latex="F_1" /> alene ville dreiet
          platen mot klokken, men <InlineLatex latex="F_2" /> og <InlineLatex latex="F_3" />{" "}
          overgår den.
        </p>
        <p className="font-semibold mt-4">Enhetssjekk</p>
        <p>
          m × N = N·m. OK.
        </p>
        <FormulaBox latex="\tau_\text{net} = 2{,}16 - 1{,}42 - 1{,}97 = -1{,}23\;\text{N·m}" variant="gold" />
        <FormulaBox latex="\boxed{\tau_\text{net} \approx 1{,}2\;\text{N·m med klokken (inn i planet)}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          For krefter som virker i hjørner: armen er hjørnets avstand fra O <em>hvis</em> kraften
          står vinkelrett på radiusvektoren. Ellers må vi finne den vinkelrette avstanden fra O til
          kraftens virkelinje.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        På utvidede legemer er det viktig å identifisere armen for hver kraft presist. Velg et
        fortegnssystem og hold deg til det. For krefter ved hjørner kan armen uttrykkes som{" "}
        <InlineLatex latex="r\sin\phi" /> eller ved hjelp av kryssproduktet.
      </p>
    ),
  },

  // ==========================================================================
  // 10.4 — Netto dreiemoment på hjul med tre krefter
  // ==========================================================================
  "10.4": {
    title: "Netto dreiemoment på et hjul",
    difficulty: "lett",
    pageRef: "s. 357",
    problem: (
      <div className="space-y-2">
        <p>
          Tre krefter virker på et hjul med radius 0,350 m, som vist i figuren. Én kraft står
          vinkelrett på felgen, én er tangent til den, og den siste lager en vinkel på 40,0° med
          radien. Hva er det netto dreiemomentet om hjulets sentrum?
        </p>
        <svg viewBox="0 0 260 260" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <circle cx="130" cy="130" r="80" fill="#fb923c33" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="130" cy="130" r="3" fill="currentColor" />
          {/* 11.9 N perpendicular to rim (pointing radially toward center from top) */}
          <line x1="130" y1="30" x2="130" y2="60" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k10)" />
          <text x="135" y="25" fontSize="10" fill="#3b82f6">11,9 N</text>
          {/* 14.6 N at 40° angle with radius at upper right */}
          <line x1="210" y1="70" x2="180" y2="95" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k10)" />
          <text x="180" y="65" fontSize="10" fill="#ef4444">14,6 N</text>
          <text x="195" y="85" fontSize="9" fill="#ef4444">40°</text>
          {/* 8.50 N tangent to rim at bottom */}
          <line x1="80" y1="185" x2="130" y2="185" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k10)" />
          <text x="85" y="205" fontSize="10" fill="#10b981">8,50 N</text>
          <text x="90" y="90" fontSize="9" fill="currentColor">r = 0,350 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Radius: <InlineLatex latex="R = 0{,}350\;\text{m}" /></li>
        <li>Kraft 1: 11,9 N, radial (peker mot sentrum) → arm = 0</li>
        <li>Kraft 2: 14,6 N, lager 40° vinkel med radien</li>
        <li>Kraft 3: 8,50 N, tangent til felgen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Netto dreiemoment om hjulets sentrum</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Radiale krefter gir null dreiemoment. Tangentielle krefter gir{" "}
        <InlineLatex latex="\tau = FR" />. For skrå krefter: bruk{" "}
        <InlineLatex latex="\tau = FR\sin\phi" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Kraften som står vinkelrett på felgen (radialt) har{" "}
            <InlineLatex latex="\phi = 0" /> med radius og gir <InlineLatex latex="\tau = 0" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For kraften 14,6 N ved 40° med radien blir dreiemomentet{" "}
            <InlineLatex latex="FR\sin 40° = 14{,}6 \times 0{,}350 \times \sin 40°" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          For et hjul med krefter på felgen er det tre typiske orienteringer: (1) radial (peker mot
          eller fra sentrum), (2) tangentiell (vinkelrett på radien), (3) skrå. Generelt:
        </p>
        <FormulaBox latex="\tau = RF\sin\phi" variant="blue" />
        <p>
          der <InlineLatex latex="\phi" /> er vinkelen mellom radiusvektor og kraften. Tre nyttige
          spesialtilfeller:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li><strong>Radial</strong> (<InlineLatex latex="\phi = 0\text{ eller }180°" />): <InlineLatex latex="\tau = 0" />.</li>
          <li><strong>Tangentiell</strong> (<InlineLatex latex="\phi = 90°" />): <InlineLatex latex="\tau = RF" />.</li>
          <li><strong>Skrå</strong>: <InlineLatex latex="\tau = RF\sin\phi" />.</li>
        </ul>
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          Newton II for rotasjon sier <InlineLatex latex="\sum\tau = I\alpha" />, så netto dreiemoment
          styrer hjulets vinkelakselerasjon. Vi trenger derfor sum med fortegn. Positiv retning: mot
          klokken (ut av planet).
        </p>
        <p className="font-semibold mt-4">Kraft 1: 11,9 N, radialt</p>
        <p>
          Denne peker langs radien (mot sentrum). <InlineLatex latex="\sin 0 = 0" />, så den prøver
          bare å trykke hjulet, ikke dreie det. Akselen balanserer reaksjonskraften.
        </p>
        <FormulaBox latex="\tau_1 = (0{,}350)(11{,}9)\sin 0° = 0" variant="blue" />
        <p className="font-semibold mt-4">Kraft 2: 14,6 N, 40° fra radien</p>
        <p>
          Vinkelen mellom kraften og radiusvektoren er 40°, så vinkelrett komponent er{" "}
          <InlineLatex latex="F\sin 40° = 14{,}6 \cdot 0{,}6428 = 9{,}38\;\text{N}" />. Retning: fra
          figuren, kraften prøver å dreie hjulet med klokken (inn i planet) → negativ.
        </p>
        <FormulaBox latex="\tau_2 = -(0{,}350)(14{,}6)\sin 40° = -(0{,}350)(14{,}6)(0{,}6428) = -3{,}28\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Kraft 3: 8,50 N, tangentiell</p>
        <p>
          Tangentiell = vinkelrett på radien, så <InlineLatex latex="\sin 90° = 1" />, hele kraften
          bidrar. Fra figuren (bunnen av hjulet, peker mot høyre) dreier denne mot klokken.
        </p>
        <FormulaBox latex="\tau_3 = +(0{,}350)(8{,}50)(1) = +2{,}98\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Sum</p>
        <FormulaBox latex="\tau_\text{net} = 0 - 3{,}28 + 2{,}98 = -0{,}30\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Fysisk tolkning</p>
        <p>
          De to ikke-radiale kreftene nesten kansellerer. Nettoen er liten og med klokken — hjulet vil
          få en (liten) vinkelakselerasjon innover i planet.
        </p>
        <FormulaBox latex="\boxed{\tau_\text{net} = 0{,}30\;\text{N·m med klokken (inn i planet)}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: N·m — OK. Merk: radiale krefter påvirker akselen men aldri rotasjonen; dette
          er hvorfor trinser og tannhjul alltid har tangentielle tenner/snor.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Nøkkelbudskap: radiale krefter bidrar ikke til dreiemoment, tangentielle gir{" "}
        <InlineLatex latex="FR" />, og alt annet får en <InlineLatex latex="\sin\phi" />-faktor.
      </p>
    ),
  },

  // ==========================================================================
  // 10.9 — Nødvendig dreiemoment for svinghjul
  // ==========================================================================
  "10.9": {
    title: "Konstant dreiemoment for å akselerere svinghjul",
    difficulty: "lett",
    pageRef: "s. 357",
    problem: (
      <p>
        Svinghjulet til en motor har treghetsmoment{" "}
        <InlineLatex latex="I = 2{,}00\;\text{kg·m}^2" /> om rotasjonsaksen. Hvilket konstant
        dreiemoment kreves for å få det opp til{" "}
        <InlineLatex latex="\omega = 450\;\text{rev/min}" /> på 7,90 s, fra ro?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="I = 2{,}00\;\text{kg·m}^2" /></li>
        <li><InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="\omega_f = 450\;\text{rev/min}" /></li>
        <li><InlineLatex latex="t = 7{,}90\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Nødvendig dreiemoment <InlineLatex latex="\tau" /></p>
    ),
    strategy: (
      <p className="text-sm">
        Konverter ω til rad/s. Finn vinkelakselerasjonen{" "}
        <InlineLatex latex="\alpha = \omega/t" />. Newton II for rotasjon:{" "}
        <InlineLatex latex="\tau = I\alpha" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="450\;\text{rev/min} = 450 \cdot \frac{2\pi}{60}\;\text{rad/s} = 47{,}1\;\text{rad/s}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For konstant akselerasjon: <InlineLatex latex="\alpha = (\omega_f - \omega_0)/t" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Dette er Newton II for rotasjon — direkte analogi til <InlineLatex latex="F = ma" />:
        </p>
        <FormulaBox latex="\sum\tau = I\alpha" variant="blue" />
        <p>
          Analogitabellen: kraft <InlineLatex latex="F \leftrightarrow \tau" /> dreiemoment, masse{" "}
          <InlineLatex latex="m \leftrightarrow I" /> treghetsmoment, lineær akselerasjon{" "}
          <InlineLatex latex="a \leftrightarrow \alpha" /> vinkelakselerasjon. Treghetsmomentet måler
          hvor vanskelig det er å endre rotasjonen — like mye som masse måler hvor vanskelig det er å
          endre translasjon.
        </p>
        <p>For konstant dreiemoment er α konstant, og kinematikken for rotasjon blir:</p>
        <FormulaBox latex="\omega_f = \omega_0 + \alpha t" variant="blue" />
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          «Konstant dreiemoment» betyr konstant α. Vi har <InlineLatex latex="\omega_0 = 0" /> (fra
          ro) og kjenner <InlineLatex latex="\omega_f" /> og <InlineLatex latex="t" />, så vi kan
          løse for α direkte. Deretter <InlineLatex latex="\tau = I\alpha" />.
        </p>
        <p className="font-semibold mt-4">Steg 1: Konverter til rad/s</p>
        <p>
          I rotasjonsformler <strong>må</strong> vinkelmål være i radianer.{" "}
          <InlineLatex latex="\text{rev}/\text{min}" /> må konverteres:{" "}
          1 rev = <InlineLatex latex="2\pi" /> rad, 1 min = 60 s.
        </p>
        <FormulaBox latex="\omega_f = 450\;\frac{\text{rev}}{\text{min}}\cdot\frac{2\pi\;\text{rad}}{1\;\text{rev}}\cdot\frac{1\;\text{min}}{60\;\text{s}} = 47{,}12\;\text{rad/s}" variant="blue" />
        <p className="font-semibold mt-4">Steg 2: Vinkelakselerasjon</p>
        <FormulaBox latex="\alpha = \frac{\omega_f - \omega_0}{t} = \frac{47{,}12 - 0}{7{,}90} = 5{,}965\;\text{rad/s}^2" variant="blue" />
        <p className="font-semibold mt-4">Steg 3: Dreiemoment</p>
        <FormulaBox latex="\tau = I\alpha = (2{,}00)(5{,}965) = 11{,}93\;\text{N·m}" variant="blue" />
        <p className="font-semibold mt-4">Enhetssjekk</p>
        <p>
          <InlineLatex latex="[I][\alpha] = \text{kg·m}^2 \cdot \text{rad/s}^2 = \text{kg·m}^2/\text{s}^2 = \text{N·m}" />{" "}
          (radianer er dimensjonsløse). OK.
        </p>
        <FormulaBox latex="\boxed{\tau \approx 11{,}9\;\text{N·m}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Fysisk tolkning: 12 N·m er ganske lite — tenk 12 N på en 1 m lang nøkkel. At et svinghjul på
          2 kg·m² kan spinne opp så raskt med så lite moment skyldes akkumulerende effekt i nesten 8
          sekunder. Lineær analog: <InlineLatex latex="F = ma = 2 \cdot 5{,}96 \approx 12\;\text{N}" />{" "}
          akselererer en 2 kg-kropp fra 0 til 47 m/s på 7,9 s.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Rotasjonsanalogien til <InlineLatex latex="F = ma" /> er{" "}
        <InlineLatex latex="\tau = I\alpha" />. Husk å arbeide i rad/s for α, ω og θ.
      </p>
    ),
  },

  // ==========================================================================
  // 10.10 — Hjul med snor, pull og akselerasjon
  // ==========================================================================
  "10.10": {
    title: "Hjul med snor og horisontalt trekk",
    difficulty: "middels",
    pageRef: "s. 357",
    problem: (
      <p>
        En snor er tvinnet rundt felgen på et uniformt massivt hjul med radius{" "}
        <InlineLatex latex="R = 0{,}290\;\text{m}" /> og masse{" "}
        <InlineLatex latex="M = 7{,}80\;\text{kg}" />. Et konstant horisontalt trekk på 32,0 N virker i
        snoren tangentielt av hjulet. Hjulet er lagret friksjonsfritt om en horisontal akse gjennom
        sentrum. (a) Finn vinkelakselerasjonen til hjulet og akselerasjonen til snora som har forlatt
        hjulet. (b) Finn størrelsen og retningen på kraften som akselen utøver på hjulet.
        (c) Ville noen av svarene i (a) eller (b) endret seg om trekket var oppover i stedet for
        horisontalt?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="R = 0{,}290\;\text{m}" />, <InlineLatex latex="M = 7{,}80\;\text{kg}" /></li>
        <li>Trekk: <InlineLatex latex="F = 32{,}0\;\text{N}" /> (horisontalt)</li>
        <li>Uniform skive: <InlineLatex latex="I = \tfrac{1}{2}MR^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="\alpha" /> og snorens akselerasjon <InlineLatex latex="a" /></li>
        <li>Kraft akselen utøver på hjulet (størrelse og retning)</li>
        <li>Endringer hvis trekket er vertikalt</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Dreiemoment fra trekket om akselen: <InlineLatex latex="\tau = FR" />. Bruk{" "}
        <InlineLatex latex="\tau = I\alpha" /> til å finne α. Deretter Newtons 2. lov horisontalt
        og vertikalt for å finne reaksjonskreftene fra akselen.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            For en uniform skive er <InlineLatex latex="I = \tfrac12 M R^2" />. Snoren faller av felgen,
            så akselerasjonen til det frigjorte stykket er{" "}
            <InlineLatex latex="a = R\alpha" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Hjulets tyngdepunkt beveger seg ikke. Summen av krefter i hver retning er null:{" "}
            <InlineLatex latex="A_x - F = 0" /> og <InlineLatex latex="A_y - Mg = 0" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Dette er et typisk rotasjonsproblem med to aspekter: (1) rotasjonsbevegelse styrt av{" "}
          <InlineLatex latex="\sum\tau = I\alpha" />, og (2) translasjonsbalanse for at akselen skal
          holde hjulets tyngdepunkt i ro. For en uniform massiv skive (sylinder) om senteraksen er
          treghetsmomentet:
        </p>
        <FormulaBox latex="I = \tfrac12 MR^2" variant="blue" />
        <p>
          For en snor som forlater felgen uten å gli, er akselerasjonen til snorstykket lik den
          tangentielle akselerasjonen på felgen:
        </p>
        <FormulaBox latex="a = R\alpha" variant="blue" />
        <p className="font-semibold mt-4">Hvorfor disse formlene?</p>
        <p>
          Trekket virker tangentielt på felgen, så momentarmen er <InlineLatex latex="R" />, og
          dreiemomentet er rett og slett <InlineLatex latex="\tau = FR" />. Newton II for rotasjon
          gir α. For akselkraften bruker vi Newton II for translasjon: siden akselen er lagret i
          ro, må <InlineLatex latex="\sum\vec F = 0" /> på hjulet.
        </p>
        <p className="font-semibold mt-4">(a) α og snorens akselerasjon</p>
        <FormulaBox latex="I = \tfrac12 MR^2 = \tfrac12 (7{,}80)(0{,}290)^2 = 0{,}328\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="\alpha = \frac{\tau}{I} = \frac{FR}{I} = \frac{(32{,}0)(0{,}290)}{0{,}328} = 28{,}28\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="a = R\alpha = (0{,}290)(28{,}28) = 8{,}20\;\text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{\alpha = 28{,}3\;\text{rad/s}^2,\;a = 8{,}20\;\text{m/s}^2}" variant="gold" />
        <p className="font-semibold mt-4">(b) Akselkraft — translasjonsbalanse</p>
        <p>
          Hjulets tyngdepunkt beveger seg ikke. Vertikalt balanserer akselen tyngden, horisontalt
          balanserer akselen trekket:
        </p>
        <FormulaBox latex="\sum F_x = 0:\; A_x - F = 0 \Rightarrow A_x = F = 32{,}0\;\text{N}" variant="blue" />
        <FormulaBox latex="\sum F_y = 0:\; A_y - Mg = 0 \Rightarrow A_y = Mg = (7{,}80)(9{,}80) = 76{,}4\;\text{N}" variant="blue" />
        <FormulaBox latex="|\vec A| = \sqrt{A_x^2 + A_y^2} = \sqrt{32{,}0^2 + 76{,}4^2} = 82{,}8\;\text{N}" variant="blue" />
        <FormulaBox latex="\theta = \arctan(A_y/A_x) = \arctan(76{,}4/32{,}0) = 67{,}3°\;\text{over horisontalen}" variant="blue" />
        <FormulaBox latex="\boxed{\vec{A} \approx 82{,}8\;\text{N},\;67{,}3°\;\text{fra horisontalen, mot trekkets retning}}" variant="gold" />
        <p className="font-semibold mt-4">(c) Endring hvis trekket er oppover?</p>
        <p>
          <strong>α og a er uendret.</strong> Hvorfor? Fordi dreiemomentet avhenger bare av at
          kraften virker tangentielt på felgen med arm <InlineLatex latex="R" />; retningen i rommet
          spiller ingen rolle for momentet om akselen. Men aksel-<em>kraften</em> endres fordi
          kraftbalansen blir annerledes:
        </p>
        <FormulaBox latex="A_x = 0,\qquad A_y = Mg - F = 76{,}4 - 32{,}0 = 44{,}4\;\text{N}" variant="blue" />
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: <InlineLatex latex="\alpha = \text{N·m}/\text{kg·m}^2 = \text{rad/s}^2" />{" "}
          (siden <InlineLatex latex="\text{N} = \text{kg·m/s}^2" />). OK. Fysisk tolkning: akselen må
          både bære hjulets vekt og reagere mot trekket — som en hengsel på en dør du drar i.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Et tangentielt trekk gir <InlineLatex latex="\tau = FR" /> uansett retning. Aksel-kraften
        derimot avhenger av tyngden og trekkets retning (den holder hjulet i ro translatorisk).
      </p>
    ),
  },

  // ==========================================================================
  // 10.11 — Bremsing av kule pga. friksjon
  // ==========================================================================
  "10.11": {
    title: "Vinkelakselerasjon og bremsetid for kule",
    difficulty: "middels",
    pageRef: "s. 357",
    problem: (
      <p>
        En maskindel har form som en uniform kule med masse 225 g og diameter 3,00 cm. Den roterer om
        en friksjonsfri aksel gjennom sentrum, men på ett punkt på ekvator skraper den mot metall med
        friksjonskraft 0,0200 N tangentielt. (a) Finn vinkelakselerasjonen.
        (b) Hvor lang tid tar det å redusere rotasjonsfarten fra{" "}
        <InlineLatex latex="22{,}5\;\text{rad/s}" /> til null?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 0{,}225\;\text{kg}" />, <InlineLatex latex="R = 0{,}0150\;\text{m}" /></li>
        <li>Friksjonskraft: <InlineLatex latex="f = 0{,}0200\;\text{N}" /></li>
        <li><InlineLatex latex="\omega_0 = 22{,}5\;\text{rad/s}" />, <InlineLatex latex="\omega_f = 0" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Vinkelakselerasjon α</li>
        <li>Bremsetid t</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Uniform kule: <InlineLatex latex="I = \tfrac{2}{5}mR^2" />. Friksjonen gir dreiemoment{" "}
        <InlineLatex latex="\tau = fR" /> (bremsende).
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I = \tfrac{2}{5}(0{,}225)(0{,}0150)^2" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Bruk <InlineLatex latex="\omega_f = \omega_0 + \alpha t" />. Når{" "}
            <InlineLatex latex="\omega_f = 0" />, blir <InlineLatex latex="t = -\omega_0/\alpha" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Problemet kombinerer tre nøkkelideer:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Treghetsmoment for uniform kule om sentrum: <InlineLatex latex="I = \tfrac{2}{5}mR^2" /> (fra tabell).</li>
          <li>Tangentiell friksjon på felgen gir dreiemoment: <InlineLatex latex="\tau = fR" />.</li>
          <li>Newton II for rotasjon: <InlineLatex latex="\tau = I\alpha" />.</li>
          <li>Konstant α → kinematikk <InlineLatex latex="\omega_f = \omega_0 + \alpha t" />.</li>
        </ul>
        <p className="font-semibold mt-4">Hvorfor disse formlene?</p>
        <p>
          Friksjonen er konstant (kulen roterer med konstant kontakt), så α er konstant. Det gjør det
          raskt å finne tid via <InlineLatex latex="\omega_f = \omega_0 + \alpha t" />. Tangential
          friksjon gir <InlineLatex latex="\sin 90° = 1" />, så <InlineLatex latex="\tau = fR" /> uten
          noen sin-faktor.
        </p>
        <p className="font-semibold mt-4">(a) Vinkelakselerasjon</p>
        <p>Finn I (enheter: m = 0,225 kg, R = 0,0150 m):</p>
        <FormulaBox latex="I = \tfrac{2}{5}(0{,}225)(0{,}0150)^2 = 2{,}025\times 10^{-5}\;\text{kg·m}^2" variant="blue" />
        <p>Dreiemoment fra friksjon (bremsende, altså motsatt rotasjon):</p>
        <FormulaBox latex="\tau = fR = (0{,}0200)(0{,}0150) = 3{,}00\times 10^{-4}\;\text{N·m}" variant="blue" />
        <p>Newton II for rotasjon:</p>
        <FormulaBox latex="\alpha = \tau/I = \frac{3{,}00\times 10^{-4}}{2{,}025\times 10^{-5}} = 14{,}8\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{\alpha = 14{,}8\;\text{rad/s}^2\;\text{(bremsende)}}" variant="gold" />
        <p className="font-semibold mt-4">(b) Bremsetid</p>
        <p>
          Friksjonen er motsatt rotasjonen, så fortegnet på α er negativt (retardasjon). Vi bruker
          <InlineLatex latex="\omega_f = \omega_0 + \alpha t" /> med{" "}
          <InlineLatex latex="\omega_f = 0" /> og løser for t:
        </p>
        <FormulaBox latex="0 = \omega_0 - |\alpha| t \Rightarrow t = \frac{\omega_0}{|\alpha|} = \frac{22{,}5}{14{,}8} = 1{,}52\;\text{s}" variant="blue" />
        <FormulaBox latex="\boxed{t \approx 1{,}52\;\text{s}}" variant="gold" />
        <p className="font-semibold mt-4">Enhetssjekk og tolkning</p>
        <p>
          <InlineLatex latex="\alpha = \text{N·m}/\text{kg·m}^2 = 1/\text{s}^2" />, altså rad/s². OK.
          Fysisk: liten R → liten I → α blir stor per N·m, så selv en liten friksjonskraft bremser
          raskt. Dette er grunnen til at små kulelagere kan lage mye støy og varme ved dårlig
          smøring.
        </p>
        <p className="italic text-[var(--muted)]">
          Lineær analogi: en 0,225 kg blokk med en 0,0200 N friksjonskraft får{" "}
          <InlineLatex latex="a = F/m = 0{,}0889\;\text{m/s}^2" />. Forskjellen (små vs. store
          retardasjoner) ligger i at rotasjonen forsterker effekten gjennom armen R.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Små friksjonskrefter kan bremse rask rotasjon overraskende raskt fordi lite treghetsmoment
        (liten radius + liten masse) gir stor α.
      </p>
    ),
  },

  // ==========================================================================
  // 10.14 — Trinse (sylinder) og bøtte med vann
  // ==========================================================================
  "10.14": {
    title: "Bøtte med vann som faller og sylindertrinse",
    difficulty: "vanskelig",
    pageRef: "s. 357",
    problem: (
      <p>
        En 15,0 kg bøtte med vann henger fra et lett, meget smidig tau tvinnet rundt en uniform
        massiv sylinder med diameter 0,300 m og masse 12,0 kg. Sylinderen roterer om en friksjonsfri
        aksel gjennom sentrum. Bøtta slippes fra ro i toppen av en brønn og faller 10,0 m ned til
        vannet. (a) Finn snorspenningen under fallet. (b) Med hvilken fart treffer bøtta vannet?
        (c) Hvor lang tid tar fallet? (d) Mens bøtta faller – hvilken kraft virker på akselen?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Bøtte: <InlineLatex latex="m = 15{,}0\;\text{kg}" /></li>
        <li>Sylinder: <InlineLatex latex="M = 12{,}0\;\text{kg}" />, <InlineLatex latex="R = 0{,}150\;\text{m}" /></li>
        <li>Fallhøyde: <InlineLatex latex="h = 10{,}0\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Tau-spenning T, bøttas fart v, tid t, akselkraft</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Newton II for bøtta: <InlineLatex latex="mg - T = ma" />. Newton II for sylinder:{" "}
        <InlineLatex latex="TR = I\alpha" /> med <InlineLatex latex="I = \tfrac12 MR^2" /> og{" "}
        <InlineLatex latex="a = R\alpha" />. Løs koblede ligninger.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Kombinerer ligningene:{" "}
            <InlineLatex latex="a = \frac{mg}{m + M/2}" />. Dette gir snorspenning og tid.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Bruk kinematikk <InlineLatex latex="v^2 = 2ah" /> og <InlineLatex latex="h = \tfrac12 at^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Dette er Atwood-type problem, men med en tung trinse. Tre legemer/relasjoner:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Newton II på bøtte (translasjon): <InlineLatex latex="mg - T = ma" />.</li>
          <li>Newton II på sylinder (rotasjon): <InlineLatex latex="\tau = TR = I\alpha" />.</li>
          <li>Geometrisk kobling (snor som ikke glir): <InlineLatex latex="a = R\alpha" />.</li>
          <li>Treghetsmoment for massiv sylinder: <InlineLatex latex="I = \tfrac12 MR^2" />.</li>
        </ul>
        <p className="font-semibold mt-4">Hvorfor disse formlene?</p>
        <p>
          Når en snor glir uten å skli over en trinse med masse, er snorspenningen <strong>ulik</strong>{" "}
          på de to sidene — her har vi bare én side, men T er likevel mindre enn <InlineLatex latex="mg" />{" "}
          (ellers ville bøtta ikke falle). En trinse med masseløs snor og friksjon som hindrer skli
          gir T virker både som kraft nedover på snoren og som tangentiell kraft som dreier
          sylinderen. Vi kan IKKE bruke energibevaring i (a)/(c) fordi vi vil ha T, ikke bare farten.
        </p>
        <p className="font-semibold mt-4">Algebraisk utledning</p>
        <p>
          Fra sylinder-ligningen: <InlineLatex latex="TR = \tfrac12 MR^2 \cdot \alpha = \tfrac12 MR^2 \cdot a/R = \tfrac12 MRa" />,
          altså <InlineLatex latex="T = \tfrac12 Ma" />. Sett inn i bøtte-ligningen:
        </p>
        <FormulaBox latex="mg - \tfrac12 Ma = ma \Rightarrow mg = (m + \tfrac12 M)a \Rightarrow a = \frac{mg}{m + M/2}" variant="blue" />
        <p className="font-semibold mt-4">(a) Snorspenning og akselerasjon</p>
        <FormulaBox latex="a = \frac{(15{,}0)(9{,}80)}{15{,}0 + 6{,}00} = \frac{147}{21{,}0} = 7{,}00\;\text{m/s}^2" variant="blue" />
        <FormulaBox latex="T = \tfrac12 Ma = \tfrac12 (12{,}0)(7{,}00) = 42{,}0\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{T = 42{,}0\;\text{N}}" variant="gold" />
        <p>
          Merk: <InlineLatex latex="T < mg = 147\;\text{N}" /> — ellers ville ikke bøtta falle.{" "}
          <InlineLatex latex="a < g" /> av samme grunn (trinsen «spiser» noe av kraften).
        </p>
        <p className="font-semibold mt-4">(b) Fart ved vannoverflaten</p>
        <p>Konstant akselerasjon + kinematikk (starter fra ro):</p>
        <FormulaBox latex="v^2 = v_0^2 + 2ah \Rightarrow v = \sqrt{2ah} = \sqrt{2(7{,}00)(10{,}0)} = 11{,}83\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v = 11{,}8\;\text{m/s}}" variant="gold" />
        <p className="font-semibold mt-4">(c) Falltid</p>
        <FormulaBox latex="h = \tfrac12 at^2 \Rightarrow t = \sqrt{2h/a} = \sqrt{20{,}0/7{,}00} = 1{,}69\;\text{s}" variant="blue" />
        <FormulaBox latex="\boxed{t = 1{,}69\;\text{s}}" variant="gold" />
        <p className="font-semibold mt-4">(d) Akselkraften</p>
        <p>
          Sylinderen translaterer ikke (akselen er lagret). Vertikal balanse: akselens kraft opp =
          sylinderens vekt ned + snorens trekk ned.
        </p>
        <FormulaBox latex="A = Mg + T = (12{,}0)(9{,}80) + 42{,}0 = 117{,}6 + 42{,}0 = 159{,}6\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{A \approx 160\;\text{N}\;\text{oppover}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Kryssjekk med energibevaring (alternativ): <InlineLatex latex="mgh = \tfrac12 mv^2 + \tfrac12 I\omega^2 = \tfrac12 (m + M/2)v^2" />,
          gir samme <InlineLatex latex="v = 11{,}83\;\text{m/s}" />. Men energi gir ikke T direkte —
          derfor krefter+dreiemoment er best her.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Atwood-lignende problemer der pulley har treghet: snorspenningen er{" "}
        <em>mindre</em> enn bøttas tyngde (ellers ville den ikke falle), og akselerasjonen er
        mindre enn g. Trinsen bidrar med effektiv masse M/2 (for uniform skive).
      </p>
    ),
  },

  // ==========================================================================
  // 10.21 — Fraksjon rotasjonsenergi for ulike rullende legemer
  // ==========================================================================
  "10.21": {
    title: "Andel av kinetisk energi som er rotasjonsenergi",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <p>
        Hvilken brøkdel av den totale kinetiske energien er rotasjonsenergi for et legeme som ruller
        uten å skli på en horisontal flate? (a) uniform massiv sylinder; (b) uniform kule;
        (c) tynnvegget hulk kule; (d) hulsylinder med ytre radius R og indre radius R/2.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Rulling uten sklis: <InlineLatex latex="v = R\omega" /></li>
        <li>Treghetsmoment: <InlineLatex latex="I = \beta M R^2" /></li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Forholdet <InlineLatex latex="K_\text{rot}/K_\text{tot}" /></p>
    ),
    strategy: (
      <p className="text-sm">
        Total kinetisk energi ved rulling:{" "}
        <InlineLatex latex="K = \tfrac12 Mv^2 + \tfrac12 I\omega^2" />. Bruk{" "}
        <InlineLatex latex="v = R\omega" />. Forholdet blir{" "}
        <InlineLatex latex="\frac{I/MR^2}{1 + I/MR^2} = \frac{\beta}{1+\beta}" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>β-verdiene: massiv sylinder 1/2, uniform kule 2/5, tynnvegget hulk kule 2/3.</p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For hulsylinder med to radier: <InlineLatex latex="I = \tfrac12 M(R_1^2 + R_2^2)" />
            slik at <InlineLatex latex="\beta = (R^2 + (R/2)^2)/(2R^2) = 5/8" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Total kinetisk energi av et rullende legeme er summen av translatorisk og rotasjons-KE:
        </p>
        <FormulaBox latex="K = K_\text{transl} + K_\text{rot} = \tfrac12 Mv_\text{cm}^2 + \tfrac12 I_\text{cm}\omega^2" variant="blue" />
        <p>
          Dette følger direkte av at bevegelsen til en stiv kropp kan dekomponeres i translasjon av
          tyngdepunktet + rotasjon om tyngdepunktet (König's teorem). Ved rulling uten å skli er
          kontaktpunktet i ro, så:
        </p>
        <FormulaBox latex="v_\text{cm} = R\omega \Leftrightarrow \omega = v/R" variant="blue" />
        <p>
          For mange vanlige legemer skrives <InlineLatex latex="I = \beta MR^2" /> med β avhengig av
          formen: <InlineLatex latex="\tfrac12" /> (massiv sylinder), <InlineLatex latex="\tfrac25" />{" "}
          (uniform kule), <InlineLatex latex="\tfrac23" /> (hulk kule), 1 (ring/hoop).
        </p>
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          Vi spør om <em>forholdet</em> mellom rotasjonsenergi og total, som er dimensjonsløst — det
          vil bare avhenge av β, ikke av masse, radius eller fart. Det gjør det til et universelt
          mål på «hvor dominert av rotasjon» et rullende legeme er.
        </p>
        <p className="font-semibold mt-4">Generell utledning</p>
        <FormulaBox latex="\frac{K_\text{rot}}{K_\text{tot}} = \frac{\tfrac12 I\omega^2}{\tfrac12 Mv^2 + \tfrac12 I\omega^2}" variant="blue" />
        <p>Sett inn <InlineLatex latex="v = R\omega" /> og <InlineLatex latex="I = \beta MR^2" />:</p>
        <FormulaBox latex="\frac{\tfrac12 \beta MR^2 \omega^2}{\tfrac12 M(R\omega)^2 + \tfrac12 \beta MR^2 \omega^2} = \frac{\beta}{1 + \beta}" variant="blue" />
        <p className="font-semibold mt-4">(a) Massiv sylinder, <InlineLatex latex="\beta = 1/2" /></p>
        <FormulaBox latex="\frac{1/2}{1 + 1/2} = \frac{1/2}{3/2} = \frac{1}{3}" variant="blue" />
        <p className="font-semibold mt-4">(b) Uniform kule, <InlineLatex latex="\beta = 2/5" /></p>
        <FormulaBox latex="\frac{2/5}{1 + 2/5} = \frac{2/5}{7/5} = \frac{2}{7}" variant="blue" />
        <p className="font-semibold mt-4">(c) Tynnvegget hulk kule, <InlineLatex latex="\beta = 2/3" /></p>
        <FormulaBox latex="\frac{2/3}{1 + 2/3} = \frac{2/3}{5/3} = \frac{2}{5}" variant="blue" />
        <p className="font-semibold mt-4">(d) Hulsylinder med <InlineLatex latex="R_2 = R" />, <InlineLatex latex="R_1 = R/2" /></p>
        <p>
          Treghetsmoment for hulsylinder: <InlineLatex latex="I = \tfrac12 M(R_1^2 + R_2^2)" />.
        </p>
        <FormulaBox latex="\beta = \frac{\tfrac12 M((R/2)^2 + R^2)}{MR^2} = \frac{R^2/4 + R^2}{2R^2} = \frac{5}{8}" variant="blue" />
        <FormulaBox latex="\frac{5/8}{1 + 5/8} = \frac{5/8}{13/8} = \frac{5}{13}" variant="blue" />
        <FormulaBox latex="\boxed{\text{(a) } \tfrac{1}{3},\;\text{(b) } \tfrac{2}{7},\;\text{(c) } \tfrac{2}{5},\;\text{(d) } \tfrac{5}{13}}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Fysisk tolkning: Massiv kule (<InlineLatex latex="2/7 \approx 29\%" />) er mest
          «translasjons­effektiv» — rekker lengst med samme KE. Hulk kule
          (<InlineLatex latex="2/5 = 40\%" />) lagrer mer energi i rotasjon, som er grunnen til at
          en fotball akselererer saktere enn en bowling-kule ned en bakke.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Jo mer «innsamlet» massen er nær rotasjonsaksen (mindre β), jo mindre andel av energien er
        rotasjonsenergi. Massiv kule roterer minst, hulsirkel mest.
      </p>
    ),
  },

  // ==========================================================================
  // 10.22 — Ring med snor, energibevaring
  // ==========================================================================
  "10.22": {
    title: "Liten sirkel (hoop) som faller med snor tvinnet rundt",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <div className="space-y-2">
        <p>
          En snor er tvinnet flere ganger rundt felgen på en liten sirkel (hoop) med radius{" "}
          <InlineLatex latex="R = 0{,}0800\;\text{m}" /> og masse{" "}
          <InlineLatex latex="M = 0{,}180\;\text{kg}" />. Den frie enden holdes i ro mens sirkelen
          slippes fra ro. Etter at ringen har falt 75,0 cm, beregn (a) vinkelhastigheten og{" "}
          (b) farten til sentrum.
        </p>
        <svg viewBox="0 0 220 200" className="w-full max-w-[200px] mx-auto block">
          <Arrowheads />
          <circle cx="110" cy="130" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="110" y1="30" x2="110" y2="80" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="110" cy="30" r="3" fill="currentColor" />
          <text x="20" y="130" fontSize="10" fill="currentColor">h = 0,750 m</text>
          <line x1="150" y1="130" x2="185" y2="130" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrow-blue-k10)" />
          <text x="170" y="120" fontSize="10" fill="#3b82f6">R</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="R = 0{,}0800\;\text{m}" />, <InlineLatex latex="M = 0{,}180\;\text{kg}" /></li>
        <li>Fallhøyde: <InlineLatex latex="h = 0{,}750\;\text{m}" /></li>
        <li>Hoop: <InlineLatex latex="I = MR^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Vinkelhastighet ω og sentrumets fart v</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Energibevaring: tapt potensiell energi = translatorisk + rotasjons-KE. Siden snoren ikke
        sklir langs felgen: <InlineLatex latex="v = R\omega" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="Mgh = \tfrac12 Mv^2 + \tfrac12 I\omega^2 = \tfrac12 Mv^2 + \tfrac12 MR^2\omega^2" />
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Med <InlineLatex latex="v = R\omega" />: <InlineLatex latex="Mgh = Mv^2" />, så{" "}
            <InlineLatex latex="v = \sqrt{gh}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Når snoren er festet i den faste enden og den frie enden holdes i ro, har snoren samme fart
          som felgen på stedet der den forlater hoopen. Siden holderens hånd er stillestående, er
          det stedet der snoren forlater felgen også stillestående — dette er en{" "}
          <strong>øyeblikkelig rotasjonsakse</strong>. Hoopen «ruller opp» snoren på akkurat samme måte
          som en kule ruller på bakken. Nøkkelrelasjonen er derfor:
        </p>
        <FormulaBox latex="v_\text{cm} = R\omega" variant="blue" />
        <p>
          Og treghetsmoment for en ring (hoop) om senteraksen er:
        </p>
        <FormulaBox latex="I = MR^2" variant="blue" />
        <p className="font-semibold mt-4">Hvorfor energibevaring?</p>
        <p>
          Snoren trekker oppover på hoopen med en kraft <InlineLatex latex="T" />. Men kontaktpunktet
          mellom snor og felg er øyeblikkelig i ro (som kontaktpunktet ved ren rulling), så snoren
          utfører <strong>null arbeid</strong> på hoopen. Derfor er mekanisk energi bevart. Vi kan
          ikke enkelt bruke Newton II uten først å finne α, men energibevaring gir farten direkte.
        </p>
        <p className="font-semibold mt-4">Energibalansen</p>
        <p>
          Initialt i ro, slutter med fart v og vinkelhastighet ω. Potensiell energi mgh går til
          translatorisk + rotasjons-KE:
        </p>
        <FormulaBox latex="Mgh = \tfrac12 Mv^2 + \tfrac12 I\omega^2" variant="blue" />
        <p>
          Sett inn <InlineLatex latex="I = MR^2" /> og <InlineLatex latex="\omega = v/R" />:
        </p>
        <FormulaBox latex="Mgh = \tfrac12 Mv^2 + \tfrac12 MR^2 \cdot \frac{v^2}{R^2} = Mv^2" variant="blue" />
        <p>M kansellerer, og vi løser for v:</p>
        <FormulaBox latex="v = \sqrt{gh} = \sqrt{(9{,}80)(0{,}750)} = \sqrt{7{,}35} = 2{,}71\;\text{m/s}" variant="blue" />
        <p>Og ω:</p>
        <FormulaBox latex="\omega = v/R = 2{,}71/0{,}0800 = 33{,}9\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega = 33{,}9\;\text{rad/s},\;v = 2{,}71\;\text{m/s}}" variant="gold" />
        <p className="font-semibold mt-4">Enhetssjekk</p>
        <p>
          <InlineLatex latex="\sqrt{\text{m/s}^2 \cdot \text{m}} = \text{m/s}" />. OK.{" "}
          <InlineLatex latex="(\text{m/s})/\text{m} = 1/\text{s} = \text{rad/s}" /> (radianer er
          dimensjonsløse).
        </p>
        <p className="italic text-[var(--muted)]">
          Fysisk tolkning: For hoop fordeles KE likt mellom translasjon og rotasjon (fordi β = 1),
          og fartloven er <InlineLatex latex="v = \sqrt{gh}" /> — nøyaktig halvparten av farten til
          et fritt fall (<InlineLatex latex="\sqrt{2gh}" />) med samme høyde. Dette bekrefter at
          50 % av energien blir rotasjonsenergi. Merkverdig: resultatet er uavhengig av både masse og
          radius.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Hoop: I = MR² (alt ved felgen). Halvparten av tapt potensiell energi blir rotasjon, halvparten
        translasjon. Legg merke til at fart er <strong>uavhengig</strong> av radius og masse.
      </p>
    ),
  },

  // ==========================================================================
  // 10.23 — Minste friksjonskoeffisient for at kule skal rulle uten å skli
  // ==========================================================================
  "10.23": {
    title: "Minste friksjonskoeffisient for rulling i bakke",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <p>
        En uniform kule slippes fra ro og sklir/ruller nedover en skråning som heller 70,0° over
        horisontalen. (a) Hva er minste verdi for statisk friksjonskoeffisient{" "}
        <InlineLatex latex="\mu_s" /> mellom skråningen og kulen for at sklis ikke skal inntreffe?
        (b) Vil denne <InlineLatex latex="\mu_s" /> også være nok for en tynnvegget hulk kule (som en
        fotball)? (c) Hvorfor bruker vi her statisk og ikke kinetisk friksjonskoeffisient?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Helningsvinkel: <InlineLatex latex="\beta = 70{,}0°" /></li>
        <li>Uniform kule: <InlineLatex latex="I = \tfrac{2}{5}MR^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Minste <InlineLatex latex="\mu_s" /> for rulling uten sklis</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        For rulling uten sklis på skråning: <InlineLatex latex="\mu_s \geq \tan\beta/(1 + MR^2/I) = \beta\tan\beta/(1+\beta)" />.
        For uniform kule: <InlineLatex latex="\mu_s \geq \frac{2}{7}\tan\beta" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Utled ved Newton II (translatorisk og rotasjon) med vilkåret{" "}
            <InlineLatex latex="a = R\alpha" />. Du får{" "}
            <InlineLatex latex="f = \frac{\beta}{1+\beta} Mg\sin\theta" /> der β=I/MR².
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Vilkåret <InlineLatex latex="f \leq \mu_s N = \mu_s Mg\cos\theta" /> gir{" "}
            <InlineLatex latex="\mu_s \geq \frac{\beta}{1+\beta}\tan\theta" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn — rulling ned skråning</p>
        <p>
          For et legeme som ruller uten å skli ned en skråning virker tre krefter: tyngde{" "}
          <InlineLatex latex="Mg" /> ned, normalkraft <InlineLatex latex="N = Mg\cos\theta" /> fra
          skråningen, og statisk friksjon <InlineLatex latex="f" /> langs skråningen. Friksjonen
          peker <strong>oppover</strong> skråningen — den må gi rotasjonens dreiemoment (ellers
          ville kulen gli).
        </p>
        <p>Newton II langs skråningen (ta nedover positivt):</p>
        <FormulaBox latex="Mg\sin\theta - f = Ma" variant="blue" />
        <p>Newton II for rotasjon om tyngdepunktet (friksjonen gir dreiemoment):</p>
        <FormulaBox latex="fR = I\alpha = \beta MR^2 \alpha" variant="blue" />
        <p>Rullevilkår (kontaktpunktet har null fart):</p>
        <FormulaBox latex="a = R\alpha" variant="blue" />
        <p className="font-semibold mt-4">Algebraisk kombinasjon</p>
        <p>
          Fra rotasjonsligningen + rullevilkår: <InlineLatex latex="f = \beta Ma" />. Sett inn i
          Newton II:
        </p>
        <FormulaBox latex="Mg\sin\theta - \beta Ma = Ma \Rightarrow a = \frac{g\sin\theta}{1 + \beta}" variant="blue" />
        <FormulaBox latex="f = \beta Ma = \frac{\beta}{1+\beta} Mg\sin\theta" variant="blue" />
        <p>
          Vilkåret for at statisk friksjon kan holde: <InlineLatex latex="f \leq \mu_s N = \mu_s Mg\cos\theta" />.
        </p>
        <FormulaBox latex="\mu_s \geq \frac{\beta}{1+\beta}\tan\theta" variant="blue" />
        <p className="font-semibold mt-4">Hvorfor denne formelen og ikke energibevaring?</p>
        <p>
          Energibevaring gir ikke μ fordi friksjonen i <em>ren</em> rulling utfører null arbeid
          (kontaktpunktet er i ro). Vi må bruke Newton II på både translasjon og rotasjon for å
          isolere f. Deretter sammenlignes f med maks statisk friksjon <InlineLatex latex="\mu_s N" />.
        </p>
        <p className="font-semibold mt-4">(a) Uniform kule, <InlineLatex latex="\beta = 2/5" /></p>
        <FormulaBox latex="\mu_s = \frac{2/5}{1 + 2/5}\tan 70° = \frac{2/5}{7/5}\tan 70° = \tfrac{2}{7}\tan 70°" variant="blue" />
        <FormulaBox latex="\tan 70° = 2{,}747 \Rightarrow \mu_s = \tfrac{2}{7}(2{,}747) = 0{,}785" variant="blue" />
        <FormulaBox latex="\boxed{\mu_{s,\min} = 0{,}785}" variant="gold" />
        <p className="font-semibold mt-4">(b) Hulk kule, <InlineLatex latex="\beta = 2/3" /></p>
        <FormulaBox latex="\mu_s = \frac{2/3}{5/3}\tan 70° = \tfrac{2}{5}\tan 70° = (0{,}400)(2{,}747) = 1{,}10" variant="blue" />
        <p>
          Siden <InlineLatex latex="\mu_s > 1" /> er umulig for fleste materialer, vil en hulk kule{" "}
          <em>alltid</em> gli på en 70°-skråning. En massiv kule (0,785) er grensetilfellet — kun
          spesielle materialer (gummi på gummi) når så høy μ.
        </p>
        <p className="font-semibold mt-4">(c) Hvorfor statisk og ikke kinetisk?</p>
        <p>
          Ved <strong>ren rulling</strong> er kontaktpunktet mellom kule og flate øyeblikkelig i ro
          (null relativ hastighet). Friksjonen er derfor <strong>statisk</strong>, ikke kinetisk.
          Statisk friksjon er hva som helst mellom 0 og <InlineLatex latex="\mu_s N" />, justert slik
          at rulling opprettholdes. Kinetisk friksjon virker bare dersom sklis allerede har inntruffet.
        </p>
        <p className="italic text-[var(--muted)]">
          Enhetssjekk: både <InlineLatex latex="\tan\theta" /> og μ er dimensjonsløse. OK. Analogi:
          hulke objekter (som fotballer, hule rør) har mer treghet per masse — derfor krever de mer
          friksjon for å rulles uten å gli.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Bratte skråninger krever større μ for at rulling skal opprettholdes. Hule objekter trenger
        større μ enn massive fordi de har større β (I/MR²).
      </p>
    ),
  },

  // ==========================================================================
  // 10.24 — Hul sfærisk skall ruller ned skråning
  // ==========================================================================
  "10.24": {
    title: "Hul sfærisk skall ruller ned skråning",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <p>
        Et hult sfærisk skall med masse 2,00 kg ruller uten sklis nedover en skråning på 38,0°.
        (a) Finn akselerasjonen, friksjonskraften, og minste friksjonskoeffisient for å hindre sklis.
        (b) Hvordan endres svarene hvis massen dobles til 4,00 kg?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="M = 2{,}00\;\text{kg}" />, <InlineLatex latex="\theta = 38{,}0°" /></li>
        <li>Hul sfære: <InlineLatex latex="I = \tfrac{2}{3}MR^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Akselerasjon a, friksjonskraft f, minste μ_s</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Rulling ned skråning: <InlineLatex latex="a = g\sin\theta/(1+\beta)" />,{" "}
        <InlineLatex latex="f = \frac{\beta}{1+\beta}Mg\sin\theta" />, med β = I/MR² = 2/3.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p><InlineLatex latex="a = \frac{g\sin 38°}{1 + 2/3} = \tfrac{3}{5}g\sin 38°" /></p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>Merk at <strong>a og μ_s er uavhengig av massen</strong>.</p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          Helt parallelt med oppgave 10.23: rulling uten å skli ned skråning gir tre relasjoner,
          Newton II langs skråningen, Newton II for rotasjon, og rullevilkår <InlineLatex latex="a = R\alpha" />.
          Resultatet uttrykt i <InlineLatex latex="\beta = I/MR^2" />:
        </p>
        <FormulaBox latex="a = \frac{g\sin\theta}{1 + \beta},\qquad f = \frac{\beta}{1+\beta}Mg\sin\theta,\qquad \mu_{s,\min} = \frac{\beta}{1+\beta}\tan\theta" variant="blue" />
        <p>
          For hul sfære om sentrum: <InlineLatex latex="I = \tfrac23 MR^2 \Rightarrow \beta = 2/3" />.
        </p>
        <p className="font-semibold mt-4">Hvorfor denne formelen?</p>
        <p>
          Samme argumentasjon som 10.23. Newton II (transl+rot) + rullevilkår → a. Energibevaring
          ville bare gitt fart etter en gitt distanse, ikke akselerasjon eller f.
        </p>
        <p className="font-semibold mt-4">(a) Akselerasjon, friksjon, minste μ</p>
        <p>Forhold: <InlineLatex latex="\frac{1}{1 + 2/3} = \frac{3}{5}" /> og <InlineLatex latex="\frac{2/3}{5/3} = \frac{2}{5}" />.</p>
        <FormulaBox latex="a = \tfrac{3}{5} g\sin 38° = \tfrac{3}{5}(9{,}80)(0{,}6157) = 3{,}62\;\text{m/s}^2" variant="blue" />
        <FormulaBox latex="f = \tfrac{2}{5}Mg\sin\theta = \tfrac{2}{5}(2{,}00)(9{,}80)(0{,}6157) = 4{,}83\;\text{N}" variant="blue" />
        <FormulaBox latex="\mu_{s,\min} = \tfrac{2}{5}\tan 38° = \tfrac{2}{5}(0{,}7813) = 0{,}313" variant="blue" />
        <FormulaBox latex="\boxed{a = 3{,}62\;\text{m/s}^2,\;f = 4{,}83\;\text{N},\;\mu_{s,\min} = 0{,}313}" variant="gold" />
        <p className="font-semibold mt-4">(b) Effekt av å doble massen</p>
        <p>
          I formlene for a og μ kansellerer M — <strong>a og μ er uavhengig av masse</strong> (og
          radius). Dette er ett av rotasjonsmekanikkens elegante resultater: formen (β) og vinkelen
          (θ) er alt som teller.
        </p>
        <p>
          Friksjonskraften <InlineLatex latex="f = \beta Ma" /> er derimot{" "}
          <strong>proporsjonal med masse</strong>. Dobler vi M til 4,00 kg, dobles f til{" "}
          <InlineLatex latex="9{,}66\;\text{N}" />.
        </p>
        <p className="font-semibold mt-4">Enhetssjekk</p>
        <p>
          <InlineLatex latex="[a] = \text{m/s}^2,\;[f] = \text{kg}\cdot\text{m/s}^2 = \text{N},\;[\mu_s]" />{" "}
          dimensjonsløs. OK.
        </p>
        <p className="italic text-[var(--muted)]">
          Fysisk tolkning: Dette er hvorfor alle kuler av samme form (alle bowling-kuler, alle
          fotballer) akselererer likt ned en gitt skråning. Galileo oppdaget dette for fritt fall;
          Huygens generaliserte til rullende kropper. Du kan enkelt huske: <InlineLatex latex="\tfrac{5}{7}" />{" "}
          for massiv kule, <InlineLatex latex="\tfrac{3}{5}" /> for hul kule,{" "}
          <InlineLatex latex="\tfrac{2}{3}" /> for massiv sylinder, <InlineLatex latex="\tfrac12" />{" "}
          for hoop — multiplisér med <InlineLatex latex="g\sin\theta" />.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Akselerasjon og minste friksjonskoeffisient ved rulling ned skråning avhenger{" "}
        <em>ikke</em> av masse eller radius, kun av formen (β = I/MR²) og helning.
      </p>
    ),
  },

  // ==========================================================================
  // 10.30 — Bowling-kule ruller oppover
  // ==========================================================================
  "10.30": {
    title: "Bowling-kule ruller oppover skråning",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <p>
        En bowling-kule ruller uten å skli oppover en skråning som heller vinkel β. Behandle kulen
        som uniform og massiv. (a) Tegn frilegeme-diagrammet og forklar hvorfor friksjonen må peke
        oppover. (b) Hva er akselerasjonen til kulens sentrum? (c) Hvilken minste statisk
        friksjonskoeffisient trengs for å unngå sklis?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Uniform kule: <InlineLatex latex="I = \tfrac{2}{5}MR^2" /></li>
        <li>Skråningsvinkel β</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Retning til friksjon</li>
        <li>Akselerasjon a</li>
        <li>Minste μ_s</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Når kulen ruller oppover og bremses, må friksjonen gi et dreiemoment som opprettholder
        vinkelakselerasjonen (bremser rotasjonen med kulens bevegelsesretning). Dette krever
        friksjon som peker <strong>oppover skråningen</strong>.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Newton II langs skråningen: <InlineLatex latex="-Mg\sin\beta + f = -Ma" /> (vi bremser, så a
            er positiv nedover skråningen... egentlig er kulens akselerasjon <em>negativ</em> oppover: den bremses).
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Kulens rotasjon bremses også: <InlineLatex latex="fR = I\alpha" />. Og{" "}
            <InlineLatex latex="a = R\alpha" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3 text-sm">
        <p className="font-semibold mt-4">Teoretisk bakgrunn</p>
        <p>
          En rullende kule som beveger seg opp en skråning bremser. To ting bremses samtidig: (1)
          tyngdepunktets translasjonsfart <InlineLatex latex="v_\text{cm}" />, og (2) rotasjonen ω.
          Rullevilkåret <InlineLatex latex="v = R\omega" /> krever at begge bremses i samme takt
          (<InlineLatex latex="a = R\alpha" />). Det er her friksjonens retning blir interessant.
        </p>
        <p className="font-semibold mt-4">(a) Hvorfor friksjonen peker opp</p>
        <p>
          Tyngden gir et dreiemoment nedover skråningen gjennom kontaktpunktet, som bremser{" "}
          <em>translasjonen</em>. Men gravity virker gjennom tyngdepunktet; om tyngdepunktet gir den
          null dreiemoment. Det er <strong>bare friksjonen</strong> som gir dreiemoment om
          tyngdepunktet. For at rotasjonen skal bremses (siden v bremses, og rullevilkåret krever at
          ω også bremses), må friksjonens dreiemoment virke mot rotasjonen. Det krever friksjon rettet{" "}
          <strong>oppover skråningen</strong>.
        </p>
        <p className="font-semibold mt-4">(b) Akselerasjon — Newton II</p>
        <p>Ta nedover skråningen som positiv. Kulen ruller opp, så faktisk fart er negativ; men a er positiv nedover:</p>
        <FormulaBox latex="Mg\sin\beta - f = Ma \qquad\text{(translasjon langs skråningen)}" variant="blue" />
        <p>
          Rotasjon om tyngdepunktet. Friksjonen peker oppover skråningen, på bunnen av kulen; dette
          gir et dreiemoment som bremser rotasjonen:
        </p>
        <FormulaBox latex="fR = I\alpha = \tfrac{2}{5}MR^2 \alpha" variant="blue" />
        <p>Rullevilkår:</p>
        <FormulaBox latex="a = R\alpha \Rightarrow \alpha = a/R" variant="blue" />
        <p>Sett inn i rotasjonslikningen:</p>
        <FormulaBox latex="fR = \tfrac{2}{5}MR^2 \cdot \frac{a}{R} \Rightarrow f = \tfrac{2}{5}Ma" variant="blue" />
        <p>Sett inn i translasjonslikningen:</p>
        <FormulaBox latex="Mg\sin\beta - \tfrac{2}{5}Ma = Ma \Rightarrow Mg\sin\beta = \tfrac{7}{5}Ma \Rightarrow a = \tfrac{5}{7}g\sin\beta" variant="blue" />
        <FormulaBox latex="\boxed{a = \tfrac{5}{7}g\sin\beta}" variant="gold" />
        <p>
          Bemerk: Akselerasjonen er identisk med den for rulling <em>ned</em>! Retningen snur, men
          tallet er det samme. Det er fordi både friksjonsretning og dreiemomentretning snur når man
          går fra opp- til nedrullling — nettoeffekten er speilet.
        </p>
        <p className="font-semibold mt-4">(c) Minste μ_s</p>
        <p>Krav: <InlineLatex latex="f \leq \mu_s N = \mu_s Mg\cos\beta" />. Beregn f:</p>
        <FormulaBox latex="f = \tfrac{2}{5}Ma = \tfrac{2}{5}M \cdot \tfrac{5}{7}g\sin\beta = \tfrac{2}{7}Mg\sin\beta" variant="blue" />
        <FormulaBox latex="\mu_{s,\min} = \frac{f}{Mg\cos\beta} = \tfrac{2}{7}\tan\beta" variant="blue" />
        <FormulaBox latex="\boxed{\mu_{s,\min} = \tfrac{2}{7}\tan\beta}" variant="gold" />
        <p className="italic text-[var(--muted)]">
          Fysisk tolkning: Dette bekrefter at minste μ er identisk enten kulen ruller opp eller ned
          — den <em>eneste</em> forskjellen er at friksjonens retning snur. Derfor: en bowling-kule
          som ruller opp en rampe og så tilbake bruker samme μ hele tiden.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Enten en kule ruller opp eller ned en skråning, er akselerasjonen{" "}
        <InlineLatex latex="\tfrac57 g\sin\beta" /> og minste friksjonskoeffisient{" "}
        <InlineLatex latex="\tfrac27\tan\beta" />. Men friksjonen <strong>skifter retning</strong>:
        peker oppover når kulen ruller opp, nedover når den ruller ned (slik at den gir nødvendig
        dreiemoment).
      </p>
    ),
  },

  // ==========================================================================
  // 10.32 — Flymotor effekt og dreiemoment
  // ==========================================================================
  "10.32": {
    title: "Flymotor: dreiemoment og arbeid per omdreining",
    difficulty: "lett",
    pageRef: "s. 358",
    problem: (
      <p>
        En flymotor leverer 175 kW effekt til en flypropell ved 2400 rev/min. (a) Hvor mye
        dreiemoment leverer motoren? (b) Hvor mye arbeid gjør motoren i én omdreining av propellen?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="P = 175{,}000\;\text{W}" /></li>
        <li><InlineLatex latex="\omega = 2400\;\text{rev/min} = 251{,}3\;\text{rad/s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Dreiemoment τ og arbeid per omdreining W</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Rotasjonseffekt: <InlineLatex latex="P = \tau\omega" />. Arbeid per omdreining:{" "}
        <InlineLatex latex="W = \tau \cdot 2\pi" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="\omega = 2400 \cdot 2\pi/60 = 251{,}3\;\text{rad/s}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="\tau = P/\omega" />, og arbeid per rev = τ × Δθ der Δθ = 2π rad.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\omega = 2400 \cdot \frac{2\pi}{60} = 251{,}3\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\tau = P/\omega = 175{,}000/251{,}3 = 696\;\text{N·m}" variant="blue" />
        <FormulaBox latex="\boxed{\tau \approx 696\;\text{N·m}}" variant="gold" />
        <FormulaBox latex="W = \tau \cdot 2\pi = (696)(2\pi) = 4376\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W \approx 4380\;\text{J per omdreining}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Analogien med translasjon: <InlineLatex latex="P = Fv" /> ↔{" "}
        <InlineLatex latex="P = \tau\omega" />. Arbeid i rotasjon er τΔθ.
      </p>
    ),
  },

  // ==========================================================================
  // 10.33 — Karusell med barn
  // ==========================================================================
  "10.33": {
    title: "Karusell: vinkelhastighet, arbeid og effekt",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <p>
        En karusell har radius 2,20 m og treghetsmoment 2400 kg·m² om en vertikal akse gjennom
        sentrum, og roterer med neglisjerbar friksjon. Et barn bruker en kraft på 21,0 N tangentielt
        til kanten i 17,0 s. (a) Hvis karusellen starter fra ro, hva er vinkelhastigheten etter
        17,0 s? (b) Hvor mye arbeid gjorde barnet? (c) Hva er gjennomsnittlig effekt levert av barnet?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="R = 2{,}20\;\text{m}" />, <InlineLatex latex="I = 2400\;\text{kg·m}^2" /></li>
        <li><InlineLatex latex="F = 21{,}0\;\text{N}" />, <InlineLatex latex="t = 17{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Sluttvinkelhastighet ω, arbeid W, gjennomsnitts­effekt P</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Dreiemoment τ = FR. Vinkelakselerasjon α = τ/I. Deretter ω = αt, θ = ½αt², W = τθ (eller
        ΔK). P = W/t.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p><InlineLatex latex="\tau = (21{,}0)(2{,}20) = 46{,}2\;\text{N·m}" />.</p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="W = \tau \theta" /> der{" "}
            <InlineLatex latex="\theta = \tfrac12 \alpha t^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\tau = FR = (21{,}0)(2{,}20) = 46{,}2\;\text{N·m}" variant="blue" />
        <FormulaBox latex="\alpha = \tau/I = 46{,}2/2400 = 0{,}01925\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="\omega = \alpha t = (0{,}01925)(17{,}0) = 0{,}327\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega = 0{,}327\;\text{rad/s}}" variant="gold" />
        <FormulaBox latex="\theta = \tfrac12 \alpha t^2 = \tfrac12 (0{,}01925)(17{,}0)^2 = 2{,}782\;\text{rad}" variant="blue" />
          <br />
          <FormulaBox latex="W = \tau\theta = (46{,}2)(2{,}782) = 128{,}5\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W \approx 129\;\text{J}}" variant="gold" />
        <FormulaBox latex="P_\text{gj} = W/t = 128{,}5/17{,}0 = 7{,}56\;\text{W}" variant="blue" />
        <FormulaBox latex="\boxed{P_\text{gj} = 7{,}56\;\text{W}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        For rotasjon kan arbeidet regnes som{" "}
        <InlineLatex latex="W = \tau\Delta\theta" /> eller som endringen i kinetisk energi{" "}
        <InlineLatex latex="\Delta K = \tfrac12 I\omega^2" /> – de gir samme svar.
      </p>
    ),
  },

  // ==========================================================================
  // 10.35 — Slipeskive
  // ==========================================================================
  "10.35": {
    title: "Slipeskive med konstant dreiemoment",
    difficulty: "middels",
    pageRef: "s. 358",
    problem: (
      <p>
        En 2,00 kg slipeskive har form som en massiv sylinder med radius 0,100 m. Hvor stort konstant
        dreiemoment vil bringe den fra ro til vinkelhastighet 1000 rev/min på 3,00 s? (b) Gjennom
        hvilken vinkel har den snudd i denne tiden? (c) Bruk arbeidsteoremet til å finne arbeidet
        utført av dreiemomentet. (d) Hva er skiverens kinetiske energi ved 1000 rev/min? Sammenlign
        med (c).
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="M = 2{,}00\;\text{kg}" />, <InlineLatex latex="R = 0{,}100\;\text{m}" /></li>
        <li><InlineLatex latex="\omega = 1000\;\text{rev/min} = 104{,}7\;\text{rad/s}" />, <InlineLatex latex="t = 3{,}00\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>τ, θ, W, K</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Først: <InlineLatex latex="I = \tfrac12 MR^2" />, α = ω/t, τ = Iα, θ = ½αt², W = τθ,
        K = ½Iω².
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="1000\;\text{rev/min} = 1000 \cdot 2\pi/60 = 104{,}7\;\text{rad/s}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="I = \tfrac12 (2{,}00)(0{,}100)^2 = 0{,}0100\;\text{kg·m}^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\omega_f = 104{,}72\;\text{rad/s};\;\alpha = 104{,}72/3{,}00 = 34{,}9\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="I = \tfrac12 (2{,}00)(0{,}100)^2 = 0{,}0100\;\text{kg·m}^2" variant="blue" />
          <br />
          <FormulaBox latex="\tau = I\alpha = (0{,}0100)(34{,}9) = 0{,}349\;\text{N·m}" variant="blue" />
        <FormulaBox latex="\boxed{\tau = 0{,}349\;\text{N·m}}" variant="gold" />
        <FormulaBox latex="\theta = \tfrac12 \alpha t^2 = \tfrac12 (34{,}9)(3{,}00)^2 = 157{,}1\;\text{rad}" variant="blue" />
        <FormulaBox latex="\boxed{\theta = 157\;\text{rad} \approx 25{,}0\;\text{omdreininger}}" variant="gold" />
        <FormulaBox latex="W = \tau\theta = (0{,}349)(157{,}1) = 54{,}8\;\text{J}" variant="blue" />
        <FormulaBox latex="K = \tfrac12 I\omega^2 = \tfrac12 (0{,}0100)(104{,}72)^2 = 54{,}8\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W = K = 54{,}8\;\text{J} \Rightarrow \text{arbeidsteoremet!}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Arbeidsteoremet i rotasjon:{" "}
        <InlineLatex latex="W_\text{net} = \Delta K_\text{rot} = \tfrac12 I\omega_f^2 - \tfrac12 I\omega_0^2" />.
      </p>
    ),
  },

  // ==========================================================================
  // 10.36 — Propell akselerert fra ro
  // ==========================================================================
  "10.36": {
    title: "Flypropell akselerert fra ro",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <p>
        En flypropell er 2,28 m lang (tipp-til-tipp) og har masse 157 kg. Når motoren starter,
        påfører den et konstant dreiemoment på 1900 N·m. Propellen starter fra ro. (a) Finn
        vinkelakselerasjonen (modellér propellen som en slank stav og bruk tabell 9.2).
        (b) Vinkelhastighet etter 5,00 omdreininger. (c) Arbeid i de første 5 omdreiningene.
        (d) Gjennomsnittlig effekt i de første 5 omdreiningene. (e) Øyeblikkelig effekt når 5
        omdreininger er fullført.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Lengde: <InlineLatex latex="L = 2{,}28\;\text{m}" />, masse <InlineLatex latex="M = 157\;\text{kg}" /></li>
        <li>Dreiemoment: <InlineLatex latex="\tau = 1900\;\text{N·m}" /></li>
        <li>Slank stav om sentrum: <InlineLatex latex="I = \tfrac{1}{12}ML^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>α, ω etter 5 rev, W, P_gj, P_øy</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Regn I, så α = τ/I. Bruk{" "}
        <InlineLatex latex="\omega^2 = 2\alpha\theta" /> for vinkelhastighet. W = τθ. Gjennomsnitts­effekt
        = W/t og øyeblikkelig effekt = τω.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I = \tfrac{1}{12}(157)(2{,}28)^2 = 68{,}0\;\text{kg·m}^2" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            5 omdreininger = 10π rad ≈ 31,42 rad. Bruk dette i ω² = 2αθ.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I = \tfrac{1}{12}(157)(2{,}28)^2 = 68{,}0\;\text{kg·m}^2" variant="blue" />
          <br />
          <FormulaBox latex="\alpha = \tau/I = 1900/68{,}0 = 27{,}94\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{\alpha = 27{,}9\;\text{rad/s}^2}" variant="gold" />
        <p className="text-xs mb-1">Vinkel etter 5 rev: θ = 10π ≈ 31,42 rad.</p>
        <FormulaBox latex="\omega = \sqrt{2\alpha\theta} = \sqrt{2(27{,}94)(31{,}42)} = 41{,}9\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega = 41{,}9\;\text{rad/s}}" variant="gold" />
        <FormulaBox latex="W = \tau\theta = (1900)(31{,}42) = 59{,}700\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W \approx 59{,}7\;\text{kJ}}" variant="gold" />
        <p className="text-xs mb-1">Tid for 5 omdreininger: θ = ½αt² → t = √(2θ/α) = √(2·31,42/27,94) = 1,50 s:</p>
        <FormulaBox latex="P_\text{gj} = W/t = 59{,}700/1{,}50 = 39{,}800\;\text{W}" variant="blue" />
        <FormulaBox latex="\boxed{P_\text{gj} \approx 39{,}8\;\text{kW}}" variant="gold" />
        <FormulaBox latex="P_\text{øy} = \tau\omega = (1900)(41{,}9) = 79{,}700\;\text{W}" variant="blue" />
        <FormulaBox latex="\boxed{P_\text{øy} \approx 79{,}7\;\text{kW}\;\text{(dobbelt av P\_gj)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Øyeblikkelig effekt <InlineLatex latex="P = \tau\omega" /> øker lineært med ω, mens
        gjennomsnittet er halvparten når dreiemomentet er konstant.
      </p>
    ),
  },

  // ==========================================================================
  // 10.37 — Stein kastet: spinn (angulært moment)
  // ==========================================================================
  "10.37": {
    title: "Spinn til en stein som beveger seg horisontalt",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <div className="space-y-2">
        <p>
          En stein med masse 4,00 kg har horisontal hastighet 12,0 m/s når den er i punkt P (se
          figur). Akkurat da er steinen i en avstand som gjør at linjen fra P til origo er 8,00 m, og
          linja gjør 36,9° med horisontal. (a) Finn størrelsen og retningen til angulært moment om
          O. (b) Hvis den eneste kraften er tyngdekraften, hva er endringsraten til angulært moment?
        </p>
        <svg viewBox="0 0 260 180" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <circle cx="60" cy="60" r="4" fill="currentColor" />
          <text x="50" y="52" fontSize="11" fill="currentColor">P</text>
          <line x1="60" y1="60" x2="120" y2="60" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k10)" />
          <text x="75" y="50" fontSize="10" fill="#ef4444">v = 12,0 m/s</text>
          <line x1="60" y1="60" x2="220" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          <text x="130" y="95" fontSize="10" fill="currentColor">8,00 m</text>
          <circle cx="220" cy="140" r="4" fill="currentColor" />
          <text x="228" y="145" fontSize="11" fill="currentColor">O</text>
          <text x="205" y="125" fontSize="9" fill="currentColor">36,9°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 4{,}00\;\text{kg}" />, <InlineLatex latex="v = 12{,}0\;\text{m/s}" /> horisontal</li>
        <li>|r| = 8,00 m, vinkel mellom r og horisontalen 36,9°</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Størrelse og retning til <InlineLatex latex="\vec{L}" /> om O</li>
        <li>Endringsrate <InlineLatex latex="d\vec{L}/dt = \vec{\tau}" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        <InlineLatex latex="\vec{L} = \vec{r}\times m\vec{v}" />. Størrelse:{" "}
        <InlineLatex latex="|L| = mvr\sin\phi" /> der φ er vinkelen mellom r og v. Endringsrate =
        netto dreiemoment om O (kun fra tyngden).
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            sin(36,9°) ≈ 0,600. Komponenten av r vinkelrett på v er 8,00·sin(36,9°) = 4,80 m.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="\vec{\tau} = \vec{r}\times m\vec{g}" />, med tyngden rett ned.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">Størrelse på angulært moment (med v horisontal og r dannende 36,9° med v):</p>
        <FormulaBox latex="L = mvr\sin\phi = (4{,}00)(12{,}0)(8{,}00)(0{,}600) = 230{,}4\;\text{kg·m}^2/\text{s}" variant="blue" />
        <FormulaBox latex="\boxed{L = 230\;\text{kg·m}^2/\text{s}}" variant="gold" />
        <p className="text-xs mt-1">Retning: ut av bildeplanet (høyrehåndsregel: r mot O, v til høyre → L opp/ut av planet avhenger av figur; typisk <em>inn i planet</em>).</p>
        <p className="text-xs mb-1">Endringsrate er netto dreiemoment om O fra tyngdekraften:</p>
        <FormulaBox latex="\tau = rmg\sin\phi'" variant="blue" />
        <p className="text-xs mt-1">Med r = 8,00 m og tyngden mg = 39,2 N loddrett ned, vinkelen mellom r og mg er 90° − 36,9° = 53,1°:</p>
        <FormulaBox latex="\tau = (8{,}00)(39{,}2)\sin(53{,}1°) = (8{,}00)(39{,}2)(0{,}800) = 251\;\text{N·m}" variant="blue" />
        <FormulaBox latex="\boxed{\left|\frac{dL}{dt}\right| = 251\;\text{N·m (samme retning som L)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Angulært moment av et punktobjekt:{" "}
        <InlineLatex latex="\vec{L} = \vec{r}\times m\vec{v}" />. Endringen er dreiemomentet fra
        nettokraften om samme punkt — rotasjonsversjonen av Newton II.
      </p>
    ),
  },

  // ==========================================================================
  // 10.38 — Kvinne på kanten av skive
  // ==========================================================================
  "10.38": {
    title: "Kvinne og skive — totalt angulært moment",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <p>
        En kvinne med masse 55 kg står på kanten av en stor skive som roterer med{" "}
        <InlineLatex latex="0{,}47\;\text{rev/s}" /> om en akse gjennom sentrum. Skiva har masse 119 kg
        og radius 3,5 m. Regn ut størrelsen av det totale angulære momentet til kvinne+skive-systemet.
        (Anta at kvinnen kan behandles som et punkt.)
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Kvinne: <InlineLatex latex="m_k = 55\;\text{kg}" /> i avstand R = 3,5 m</li>
        <li>Skive: <InlineLatex latex="M = 119\;\text{kg}" />, <InlineLatex latex="R = 3{,}5\;\text{m}" /></li>
        <li><InlineLatex latex="\omega = 0{,}47\;\text{rev/s} = 2{,}95\;\text{rad/s}" /></li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Total <InlineLatex latex="L = L_\text{skive} + L_\text{kvinne}" /></p>
    ),
    strategy: (
      <p className="text-sm">
        Skive: <InlineLatex latex="I_s = \tfrac12 MR^2" />. Kvinne punkt:{" "}
        <InlineLatex latex="I_k = m_k R^2" />. Sammenlagt{" "}
        <InlineLatex latex="L = (I_s + I_k)\omega" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="\omega = 0{,}47 \times 2\pi = 2{,}953\;\text{rad/s}" />
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I_\text{skive} = \tfrac12 (119)(3{,}5)^2 = 729\;\text{kg·m}^2" variant="blue" />
          <br />
          <InlineLatex latex="I_\text{kvinne} = (55)(3{,}5)^2 = 674\;\text{kg·m}^2" />
          <br />
          <FormulaBox latex="I_\text{tot} = 1403\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="L = I_\text{tot}\omega = (1403)(2{,}953) = 4143\;\text{kg·m}^2/\text{s}" variant="blue" />
        <FormulaBox latex="\boxed{L \approx 4140\;\text{kg·m}^2/\text{s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        For flere legemer som roterer om samme akse: summér treghetsmomentene. Et punkt-legeme på
        avstand R har I = mR².
      </p>
    ),
  },

  // ==========================================================================
  // 10.39 — Sekundviser klokke
  // ==========================================================================
  "10.39": {
    title: "Angulært moment til sekundviser på klokke",
    difficulty: "lett",
    pageRef: "s. 359",
    problem: (
      <p>
        Finn størrelsen av angulært moment til sekundviseren på et vanlig klokkeverk om en akse
        gjennom klokkas sentrum. Sekundviseren er 15,0 cm lang, har masse 6,00 g og roterer med
        konstant vinkelhastighet. Modellér den som en slank stav gjennom ett av endepunktene.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Lengde: <InlineLatex latex="L = 0{,}150\;\text{m}" />, masse <InlineLatex latex="M = 6{,}00\times10^{-3}\;\text{kg}" /></li>
        <li>1 omdreining / 60 s</li>
        <li>Stav om endepunkt: <InlineLatex latex="I = \tfrac13 ML^2" /></li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Angulært moment <InlineLatex latex="L" /></p>
    ),
    strategy: (
      <p className="text-sm">
        <InlineLatex latex="\omega = 2\pi/60\;\text{rad/s}" />,{" "}
        <InlineLatex latex="I = \tfrac13 ML^2" />,{" "}
        <InlineLatex latex="L = I\omega" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="\omega = 2\pi/60 = 0{,}1047\;\text{rad/s}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I = \tfrac13 (6{,}00\times 10^{-3})(0{,}150)^2 = 4{,}50\times 10^{-5}\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="L = I\omega = (4{,}50\times 10^{-5})(0{,}1047) = 4{,}71\times 10^{-6}\;\text{kg·m}^2/\text{s}" variant="blue" />
        <FormulaBox latex="\boxed{L \approx 4{,}71\times 10^{-6}\;\text{kg·m}^2/\text{s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Små masser ved små radier gir ekstremt lite angulært moment. Selv en tung sekundviser har
        et L som er mikroskopisk sammenlignet med et hjul eller en propell.
      </p>
    ),
  },

  // ==========================================================================
  // 10.42 — Blokk i konisk bevegelse, snor trukket inn
  // ==========================================================================
  "10.42": {
    title: "Blokk i sirkel, bevaring av angulært moment",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <p>
        En liten blokk på en friksjonsfri horisontal flate har masse{" "}
        <InlineLatex latex="2{,}40\times 10^{-2}\;\text{kg}" />. Den er festet til en masseløs snor som
        går gjennom et hull i flaten (se figur). Blokka roterer i en sirkel med radius{" "}
        <InlineLatex latex="r_1 = 0{,}300\;\text{m}" /> med vinkelhastighet{" "}
        <InlineLatex latex="\omega_1 = 1{,}95\;\text{rad/s}" />. Snoren trekkes så sakte nedenfra og
        reduserer radien til <InlineLatex latex="r_2 = 0{,}150\;\text{m}" />. Behandle blokka som et
        punkt. (a) Er angulært moment bevart? Hvorfor? (b) Hva er ny vinkelhastighet{" "}
        <InlineLatex latex="\omega_2" />? (c) Finn endringen i kinetisk energi. (d) Hvor mye arbeid
        ble utført når snoren ble trukket inn?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 2{,}40\times 10^{-2}\;\text{kg}" /></li>
        <li><InlineLatex latex="r_1 = 0{,}300\;\text{m},\;\omega_1 = 1{,}95\;\text{rad/s}" /></li>
        <li><InlineLatex latex="r_2 = 0{,}150\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>ω₂, ΔK, W</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Snorkraften peker mot sentrum (radialt), så den gir null dreiemoment om hullet. Angulært moment
        bevart. Kinetisk energi derimot endres fordi arbeidet utføres på blokka.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I_1\omega_1 = I_2\omega_2" /> med{" "}
            <InlineLatex latex="I = mr^2" />, så{" "}
            <InlineLatex latex="\omega_2 = \omega_1 (r_1/r_2)^2" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Arbeid utført = endring i kinetisk energi (ingen friksjon).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">(a) Snoren drar radialt mot hullet, dreiemomentet om hullet er null, så L er bevart.</p>
        <FormulaBox latex="\omega_2 = \omega_1 \left(\frac{r_1}{r_2}\right)^2 = 1{,}95 \cdot (0{,}300/0{,}150)^2 = 1{,}95 \cdot 4 = 7{,}80\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega_2 = 7{,}80\;\text{rad/s}}" variant="gold" />
        <p className="text-xs mb-1">Kinetisk energi før og etter:</p>
        <FormulaBox latex="K_1 = \tfrac12 m(r_1\omega_1)^2 = \tfrac12 (2{,}40\times 10^{-2})(0{,}300\cdot 1{,}95)^2 = 4{,}11\times 10^{-3}\;\text{J}" variant="blue" />
        <FormulaBox latex="K_2 = \tfrac12 m(r_2\omega_2)^2 = \tfrac12 (2{,}40\times 10^{-2})(0{,}150\cdot 7{,}80)^2 = 1{,}64\times 10^{-2}\;\text{J}" variant="blue" />
        <FormulaBox latex="\Delta K = 1{,}64\times 10^{-2} - 4{,}11\times 10^{-3} = 1{,}23\times 10^{-2}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta K = +1{,}23\times 10^{-2}\;\text{J}}" variant="gold" />
        <p className="text-xs mb-1">(d) Arbeidet utført er ΔK:</p>
        <FormulaBox latex="W = \Delta K = 1{,}23\times 10^{-2}\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W = 1{,}23\times 10^{-2}\;\text{J}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Selv om angulært moment er bevart, kan kinetisk energi endres fordi en radial kraft
        (snorkraften) kan gjøre arbeid på blokka mens den beveger seg innover.
      </p>
    ),
  },

  // ==========================================================================
  // 10.45 — Kunstløper spinner
  // ==========================================================================
  "10.45": {
    title: "Kunstløper i pirouett — bevaring av angulært moment",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <p>
        En kunstløper forbereder en piruett. Med utstrakte armer kan de modelleres som en slank stav
        som roterer om en akse gjennom midten (span 1,70 m, total armmasse 8,0 kg). Når armene
        trekkes inn, blir armene en sylinder med radius 24 cm. Treghetsmomentet til resten av kroppen
        er konstant og lik <InlineLatex latex="0{,}40\;\text{kg·m}^2" />. Hvis startvinkelhastigheten
        er 0,30 rev/s, hva er sluttvinkelhastigheten?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Armer utstrakt: stav L = 1,70 m, total m = 8,0 kg</li>
        <li>Armer inntrukket: sylinder, R = 0,24 m, m = 8,0 kg</li>
        <li>Kropp: <InlineLatex latex="I_\text{kropp} = 0{,}40\;\text{kg·m}^2" /> (konstant)</li>
        <li>ω₁ = 0,30 rev/s</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Slutt-ω₂</p>
    ),
    strategy: (
      <p className="text-sm">
        Angulært moment bevart:{" "}
        <InlineLatex latex="I_1\omega_1 = I_2\omega_2" />. Finn{" "}
        <InlineLatex latex="I_\text{arm, uttr}" /> som stav om sentrum{" "}
        <InlineLatex latex="\tfrac{1}{12}mL^2" />, og{" "}
        <InlineLatex latex="I_\text{arm, inn}" /> som sylinder{" "}
        <InlineLatex latex="\tfrac12 mR^2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I_\text{arm,utt} = \tfrac{1}{12}(8{,}0)(1{,}70)^2 = 1{,}927\;\text{kg·m}^2" />
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="I_\text{arm,inn} = \tfrac12 (8{,}0)(0{,}24)^2 = 0{,}230\;\text{kg·m}^2" />
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I_1 = I_\text{kropp} + I_\text{arm,utt} = 0{,}40 + 1{,}927 = 2{,}327\;\text{kg·m}^2" variant="blue" />
          <br />
          <FormulaBox latex="I_2 = I_\text{kropp} + I_\text{arm,inn} = 0{,}40 + 0{,}230 = 0{,}630\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="\omega_2 = \frac{I_1}{I_2}\omega_1 = \frac{2{,}327}{0{,}630}(0{,}30) = 1{,}11\;\text{rev/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega_2 \approx 1{,}11\;\text{rev/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Pirouetten: ved å trekke armene inn reduseres I, og siden L er bevart øker ω. Kinetisk
        energi øker fordi muskelkraft (indre arbeid) tilfører energi.
      </p>
    ),
  },

  // ==========================================================================
  // 10.46 — Dør og gjørme-støt (uelastisk)
  // ==========================================================================
  "10.46": {
    title: "Dør truffet av gjørme — angulært moment bevart",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <p>
        En massiv tredør, 1,00 m bred og 2,00 m høy, har hengsel langs en side og total masse 42,0 kg.
        Døra står åpen i ro. En klatt gjørme på 0,500 kg treffer døra sentralt i sentrum med fart
        13,0 m/s vinkelrett på døra like før sammenstøtet. Finn sluttvinkelhastigheten etter støtet.
        Bidrar gjørma signifikant til treghetsmomentet?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Dør: bredde <InlineLatex latex="L = 1{,}00\;\text{m}" />, masse 42,0 kg</li>
        <li>Gjørme: 0,500 kg, v = 13,0 m/s, treffer midt i døra (r = 0,50 m fra hengsel)</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Sluttvinkelhastighet ω</p>
    ),
    strategy: (
      <p className="text-sm">
        L bevart om hengsla. Dør om hengsla:{" "}
        <InlineLatex latex="I_\text{dør} = \tfrac13 ML^2" />. Gjørma bidrar til slutt med{" "}
        <InlineLatex latex="I_m = m r^2" />. Før: gjørma har{" "}
        <InlineLatex latex="L = mvr" />. Etter:{" "}
        <InlineLatex latex="L = (I_\text{dør} + I_m)\omega" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I_\text{dør} = \tfrac13 (42{,}0)(1{,}00)^2 = 14{,}0\;\text{kg·m}^2" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="L_\text{før} = m v r = (0{,}500)(13{,}0)(0{,}500) = 3{,}25\;\text{kg·m}^2/\text{s}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I_\text{dør} = \tfrac13 (42{,}0)(1{,}00)^2 = 14{,}0\;\text{kg·m}^2" variant="blue" />
          <br />
          <InlineLatex latex="I_m = (0{,}500)(0{,}500)^2 = 0{,}125\;\text{kg·m}^2" />
          <br />
          <FormulaBox latex="I_\text{tot} = 14{,}125\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="L_\text{før} = mvr = (0{,}500)(13{,}0)(0{,}500) = 3{,}25\;\text{kg·m}^2/\text{s}" variant="blue" />
          <br />
          <FormulaBox latex="\omega = L/I_\text{tot} = 3{,}25/14{,}125 = 0{,}230\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega = 0{,}230\;\text{rad/s}}" variant="gold" />
        <p className="text-xs mt-1">Gjørma bidrar med 0,125 av 14,1 kg·m² – under 1 %, så nei, ikke signifikant.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Uelastiske sammenstøt som involverer rotasjon: <strong>angulært moment</strong> bevart,
        <em> kinetisk energi ikke bevart</em>. Velg alltid bevaringsloven som passer kraftstrukturen.
      </p>
    ),
  },

  // ==========================================================================
  // 10.47 — Fallskjermhopper lander på dreieskive
  // ==========================================================================
  "10.47": {
    title: "Fallskjermhopper lander på dreieskive",
    difficulty: "middels",
    pageRef: "s. 359",
    problem: (
      <p>
        En stor tre-dreieskive har form som en flat uniform skive med radius 2,00 m og total masse
        140 kg. Den roterer innledningsvis med 4,00 rad/s om en vertikal akse gjennom sentrum. En
        80,0-kg fallskjermhopper lander mykt på dreieskiva nær kanten. (a) Finn
        sluttvinkelhastigheten. (b) Sammenlign kinetisk energi før og etter. Hvorfor er de ikke like?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Skive: <InlineLatex latex="M = 140\;\text{kg},\;R = 2{,}00\;\text{m}" /></li>
        <li>ω₁ = 4,00 rad/s</li>
        <li>Hopper: m = 80,0 kg, lander ved r = R</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>ω₂, K-før og K-etter</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        L bevart: <InlineLatex latex="I_1\omega_1 = I_2\omega_2" />. Skive:{" "}
        <InlineLatex latex="I_\text{skive} = \tfrac12 MR^2" />. Etter: legg til{" "}
        <InlineLatex latex="mR^2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p><InlineLatex latex="I_1 = \tfrac12 (140)(2{,}00)^2 = 280\;\text{kg·m}^2" /></p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>Energi går tapt fordi hoppers skoer ikke glir – uelastisk «kobling».</p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="I_1 = \tfrac12 (140)(2{,}00)^2 = 280\;\text{kg·m}^2" variant="blue" />
          <br />
          <FormulaBox latex="I_2 = 280 + (80{,}0)(2{,}00)^2 = 280 + 320 = 600\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="\omega_2 = I_1\omega_1/I_2 = (280)(4{,}00)/600 = 1{,}87\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega_2 = 1{,}87\;\text{rad/s}}" variant="gold" />
        <FormulaBox latex="K_1 = \tfrac12 I_1 \omega_1^2 = \tfrac12 (280)(4{,}00)^2 = 2240\;\text{J}" variant="blue" />
          <br />
          <FormulaBox latex="K_2 = \tfrac12 I_2 \omega_2^2 = \tfrac12 (600)(1{,}87)^2 = 1049\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{K_1 = 2240\;\text{J},\;K_2 = 1049\;\text{J}}" variant="gold" />
        <p className="text-xs mt-1">Forskjellen (≈ 1190 J) gikk tapt som varme/lyd/deformasjon i det uelastiske møtet.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Uelastisk «fastklebning» til en roterende kropp bevarer L, men taper K. Tap er størst når
        massebrøken som legges til er stor i forhold til original I/MR².
      </p>
    ),
  },

  // ==========================================================================
  // 10.50 — Liten bug/insekt som kryper ut på stav
  // ==========================================================================
  "10.50": {
    title: "Bug kryper ut på roterende stav",
    difficulty: "vanskelig",
    pageRef: "s. 360",
    problem: (
      <p>
        En tynn uniform stav er 0,500 m lang og roterer i en sirkel på et friksjonsfritt bord.
        Rotasjonsaksen står vinkelrett på stavens lengde gjennom ett endepunkt og er stasjonær. Staven
        har vinkelhastighet 0,38 rad/s og treghetsmoment{" "}
        <InlineLatex latex="2{,}70\times 10^{-3}\;\text{kg·m}^2" />. En bug som står på aksen bestemmer
        seg for å krype ut til den andre enden. Når bugen er kommet til enden og sitter der, er dens
        tangentielle fart 0,164 m/s. Hva er massen til (a) staven og (b) bugen?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Stav: L = 0,500 m, I = 2,70×10⁻³ kg·m²</li>
        <li>ω₀ = 0,38 rad/s (bug ved aksen)</li>
        <li>Sluttfart for bug ved ende: v = 0,164 m/s → ω₂ = v/L</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Masse stav og masse bug</p>
    ),
    strategy: (
      <p className="text-sm">
        (a) Fra <InlineLatex latex="I = \tfrac13 M_\text{stav}L^2" />: finn M_stav.
        (b) Angulært moment bevart: bugen går fra akse (null I) til enden.{" "}
        <InlineLatex latex="I_\text{stav}\omega_0 = (I_\text{stav} + m_b L^2)\omega_2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="\omega_2 = v/L = 0{,}164/0{,}500 = 0{,}328\;\text{rad/s}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Løs for m_b: <InlineLatex latex="m_b = \frac{I_\text{stav}(\omega_0 - \omega_2)}{\omega_2 L^2}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">(a) Stav-masse:</p>
        <FormulaBox latex="M_\text{stav} = \frac{3I}{L^2} = \frac{3(2{,}70\times 10^{-3})}{(0{,}500)^2} = 3{,}24\times 10^{-2}\;\text{kg} = 32{,}4\;\text{g}" variant="blue" />
        <FormulaBox latex="\boxed{M_\text{stav} = 0{,}0324\;\text{kg}}" variant="gold" />
        <p className="text-xs mb-1">(b) Ved akse: bug bidrar ikke til I. Etter flytting:</p>
        <FormulaBox latex="I_\text{stav}\omega_0 = (I_\text{stav} + m_b L^2)\omega_2" variant="blue" />
        <FormulaBox latex="\omega_2 = 0{,}164/0{,}500 = 0{,}328\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="m_b L^2 = I_\text{stav}(\omega_0/\omega_2 - 1) = 2{,}70\times 10^{-3}(0{,}38/0{,}328 - 1)" variant="blue" />
        <FormulaBox latex="m_b L^2 = 2{,}70\times 10^{-3}(0{,}1585) = 4{,}28\times 10^{-4}\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="m_b = 4{,}28\times 10^{-4}/(0{,}500)^2 = 1{,}71\times 10^{-3}\;\text{kg}" variant="blue" />
        <FormulaBox latex="\boxed{m_b \approx 1{,}71\times 10^{-3}\;\text{kg} = 1{,}71\;\text{g}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når en del av systemet flytter seg utover, øker I og ω synker (L bevart). Du kan finne ukjente
        masser ved å kombinere treghetsmoment-formler med bevaringsloven.
      </p>
    ),
  },

  // ==========================================================================
  // 10.58 — Slipeskive med øks (tangentiell friksjon)
  // ==========================================================================
  "10.58": {
    title: "Slipeskive med øks og akselfriksjon",
    difficulty: "vanskelig",
    pageRef: "s. 360",
    problem: (
      <div className="space-y-2">
        <p>
          En 70,0 kg slipeskive er en massiv sylinder med diameter 0,510 m. Du trykker en øks mot
          felgen med normalkraft 180 N (<InlineLatex latex="\mu_k = 0{,}60" />). Det er også en
          konstant dreiemomentsfriksjon <InlineLatex latex="\tau_f = 6{,}50\;\text{N·m}" /> i akselen.
          Systemet starter fra ro og når 120 rev/min etter 9,00 s ved at du trykker tangentielt på et
          sveivhåndtak 0,500 m langt. (a) Finn nødvendig tangentiell kraft på håndtaket for å oppnå
          dette. (b) Etter at farten er nådd, hvilken tangentiell kraft må du holde for å vedlikeholde
          120 rev/min? (c) Hvor lang tid tar det å stoppe fra 120 rev/min hvis bare akselfriksjon
          virker?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Skive: <InlineLatex latex="M = 50{,}0\;\text{kg},\;R = 0{,}255\;\text{m}" /> (diameter 0,510 m)</li>
        <li>Øks: <InlineLatex latex="N = 180\;\text{N},\;\mu_k = 0{,}60" /></li>
        <li>Akselfriksjon: <InlineLatex latex="\tau_f = 6{,}50\;\text{N·m}" /></li>
        <li>Sveiv: 0,500 m lang</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>F for akselerasjon, F for konstant drift, stopptid</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Finn øks-dreiemomentet <InlineLatex latex="\tau_\text{øks} = \mu_k N R" />. Under oppspinning:
        nødvendig netto dreiemoment = Iα. Total dreiemoment-balanse gir nødvendig F_sveiv.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I = \tfrac12 MR^2 = \tfrac12 (50{,}0)(0{,}255)^2 = 1{,}63\;\text{kg·m}^2" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            120 rev/min = 12,57 rad/s; α = 12,57/9,00 = 1,396 rad/s². Iα + τ_øks + τ_f = F·r_sveiv.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">NB: oppgaven sier 70,0 kg, men typisk tolkning er skiven alene — det er 50,0 kg. Vi regner med 50,0 kg.</p>
        <FormulaBox latex="I = \tfrac12 (50{,}0)(0{,}255)^2 = 1{,}626\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="\omega_f = 120\cdot 2\pi/60 = 12{,}57\;\text{rad/s},\;\alpha = 1{,}396\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="\tau_\text{øks} = \mu_k N R = (0{,}60)(180)(0{,}255) = 27{,}5\;\text{N·m}" variant="blue" />
        <p className="text-xs mb-1">(a) For oppspinning (netto dreiemoment = Iα):</p>
        <FormulaBox latex="F\cdot 0{,}500 - \tau_\text{øks} - \tau_f = I\alpha" variant="blue" />
        <FormulaBox latex="F\cdot 0{,}500 = 1{,}626\cdot 1{,}396 + 27{,}5 + 6{,}50 = 2{,}27 + 34{,}0 = 36{,}3" variant="blue" />
        <FormulaBox latex="F = 72{,}5\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{oppspinn} \approx 72{,}5\;\text{N}}" variant="gold" />
        <p className="text-xs mb-1">(b) For konstant drift (α = 0):</p>
        <FormulaBox latex="F\cdot 0{,}500 = \tau_\text{øks} + \tau_f = 34{,}0\;\text{N·m}" variant="blue" />
        <FormulaBox latex="F = 68{,}0\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{drift} \approx 68{,}0\;\text{N}}" variant="gold" />
        <p className="text-xs mb-1">(c) Stopp med kun akselfriksjon (øks fjernet):</p>
        <FormulaBox latex="\alpha_\text{stopp} = -\tau_f/I = -6{,}50/1{,}626 = -4{,}00\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="t = \omega_f/|\alpha_\text{stopp}| = 12{,}57/4{,}00 = 3{,}14\;\text{s}" variant="blue" />
        <FormulaBox latex="\boxed{t_\text{stopp} \approx 3{,}14\;\text{s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Dreiemoment-balanse for rotasjon krever å se på ALLE kilder: pådrag (håndtak), friksjon mot
        verktøy, akselfriksjon, og eventuell vinkelakselerasjon (Iα).
      </p>
    ),
  },

  // ==========================================================================
  // 10.61 — Tverrstang med kuler, en avkobles
  // ==========================================================================
  "10.61": {
    title: "Horisontal stang med to kuler, én kobles fra",
    difficulty: "vanskelig",
    pageRef: "s. 361",
    problem: (
      <div className="space-y-2">
        <p>
          En tynn uniform stang med masse 3,80 kg og lengde 80,0 cm har to små kuler med masse 2,50 kg
          hver limt på hver ende. Stanga holdes horisontalt av en aksel i sentrum. Plutselig løsner
          høyre kule og faller, men den venstre forblir fast. (a) Finn vinkelakselerasjonen til staven
          rett etter at kula slipper. (b) Vil α forbli konstant når stanga svinger?
          (c) Finn vinkelhastigheten når stanga går gjennom vertikalstilling.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Stang: 3,80 kg, L = 0,800 m (så halv-lengde 0,400 m)</li>
        <li>En kule 2,50 kg ved avstand 0,400 m fra akselen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>α rett etter, om α er konstant, ω ved vertikal</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        (a) Netto dreiemoment ved horisontal = kulas vekt × armen. Treghetsmoment: stav{" "}
        <InlineLatex latex="\tfrac{1}{12}M_sL^2" /> + kule{" "}
        <InlineLatex latex="m_k r^2" />.
        (b) α er <strong>ikke</strong> konstant — armen endres med vinkelen.
        (c) Bruk energibevaring i stedet.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            <InlineLatex latex="I = \tfrac{1}{12}(3{,}80)(0{,}800)^2 + (2{,}50)(0{,}400)^2 = 0{,}203 + 0{,}400 = 0{,}603\;\text{kg·m}^2" />
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Ved horisontal: τ = m_k·g·r = (2,50)(9,80)(0,400) = 9,80 N·m (stava under vekten).
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            Energibevaring: tapt høyde for kule = 0,400 m, ½Iω² = m_k g·(0,400).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">(a) Treghetsmoment:</p>
        <FormulaBox latex="I = \tfrac{1}{12}(3{,}80)(0{,}800)^2 + (2{,}50)(0{,}400)^2 = 0{,}2027 + 0{,}400 = 0{,}6027\;\text{kg·m}^2" variant="blue" />
        <p className="text-xs mt-2">Dreiemoment fra kulas vekt, horisontal:</p>
        <FormulaBox latex="\tau = (2{,}50)(9{,}80)(0{,}400) = 9{,}80\;\text{N·m}" variant="blue" />
        <FormulaBox latex="\alpha = \tau/I = 9{,}80/0{,}6027 = 16{,}26\;\text{rad/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{\alpha = 16{,}3\;\text{rad/s}^2}" variant="gold" />
        <p className="text-xs mb-1">(b) α er <strong>ikke</strong> konstant: dreiemomentet avhenger
            av vinkelen (τ = m_k g r cosφ). Max ved horisontal, null ved vertikal.</p>
        <p className="text-xs mb-1">(c) Energibevaring fra horisontal til vertikal:</p>
        <FormulaBox latex="m_k g r = \tfrac12 I\omega^2" variant="blue" />
        <FormulaBox latex="\omega = \sqrt{\frac{2 m_k g r}{I}} = \sqrt{\frac{2(2{,}50)(9{,}80)(0{,}400)}{0{,}6027}} = \sqrt{32{,}5} = 5{,}70\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega = 5{,}70\;\text{rad/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når dreiemomentet avhenger av posisjon, er α ikke konstant — bruk energibevaring for å
        finne farten ved nytt punkt. Kun Newton II gir α øyeblikkelig.
      </p>
    ),
  },

  // ==========================================================================
  // 10.64 — Løftekran med sveiv
  // ==========================================================================
  "10.64": {
    title: "Skipslaste-kran med håndveiv",
    difficulty: "vanskelig",
    pageRef: "s. 361",
    problem: (
      <p>
        En kasse (total masse 50 kg) skal heves fra et skipsrom. Et tau er tvinnet rundt et trehylster
        som dreier om en metallaksel med radius{" "}
        <InlineLatex latex="R_\text{sylinder} = 0{,}25\;\text{m}" /> og treghetsmoment{" "}
        <InlineLatex latex="I = 2{,}9\;\text{kg·m}^2" />. Et sveivhåndtak i den andre enden har radius
        0,12 m. Når sveiva dreies, roterer sylinderen og løfter kassa med{" "}
        <InlineLatex latex="a = 1{,}40\;\text{m/s}^2" />. En av aksens ender er lagret friksjonsfritt.
        Hva er kraften F som må påføres tangentielt på sveiva? (Tau og sveivarm har neglisjerbare
        masser.)
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Kasse: 50 kg, a = 1,40 m/s² opp</li>
        <li>Sylinder: R = 0,25 m, I = 2,9 kg·m²</li>
        <li>Sveiv: r = 0,12 m</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Kraft F på sveivhåndtaket</p>
    ),
    strategy: (
      <p className="text-sm">
        Finn taukraften fra Newton II på kassa. Så skriv dreiemoment-balansen for sylinder+sveiv:
        sveiv-dreiemoment = tau-dreiemoment + Iα.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Taukraft <InlineLatex latex="T = m(g + a) = 50(9{,}80 + 1{,}40) = 560\;\text{N}" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            <InlineLatex latex="\alpha = a/R_\text{sylinder} = 1{,}40/0{,}25 = 5{,}60\;\text{rad/s}^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="T = m(g + a) = 50(9{,}80 + 1{,}40) = 560\;\text{N}" variant="blue" />
          <br />
          <FormulaBox latex="\alpha = a/R_\text{sylinder} = 1{,}40/0{,}25 = 5{,}60\;\text{rad/s}^2" variant="blue" />
        <p className="text-xs mb-1">Dreiemoment-balanse for aksel+sylinder+sveiv:</p>
        <FormulaBox latex="F\cdot r_\text{sveiv} - T\cdot R_\text{sylinder} = I\alpha" variant="blue" />
        <FormulaBox latex="F(0{,}12) = (560)(0{,}25) + (2{,}9)(5{,}60)" variant="blue" />
        <FormulaBox latex="F(0{,}12) = 140 + 16{,}24 = 156{,}2" variant="blue" />
        <FormulaBox latex="F = 156{,}2/0{,}12 = 1302\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F \approx 1300\;\text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Mekaniske løfteinnretninger: ved å bruke en sveiv med større radius enn sylinderen, får vi
        mekanisk fortrinn — men må bevege håndtaket lengre. F·r_sveiv = T·R_sylinder + Iα.
      </p>
    ),
  },

  // ==========================================================================
  // 10.65 — Massiv og hulk kule ruller oppover
  // ==========================================================================
  "10.65": {
    title: "Massiv og hulk kule — hvilken når høyest?",
    difficulty: "middels",
    pageRef: "s. 361",
    problem: (
      <p>
        En uniform massiv kule og en tynnvegget hulk kule har samme masse M og radius R. Begge har
        samme tyngdepunktsfart <InlineLatex latex="v_\text{cm}" /> ved bunnen av en skråning og
        ruller uten sklis oppover (vinkel β). Beregn maksimal høyde hver når — hvilken går høyest?
        Eller når de samme?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Begge: masse M, radius R, rulling uten sklis</li>
        <li>Massiv kule: β_s = I/MR² = 2/5</li>
        <li>Hulk kule: β_h = 2/3</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Maks høyde h, sammenligning</p>
    ),
    strategy: (
      <p className="text-sm">
        Energibevaring: <InlineLatex latex="\tfrac12 Mv^2(1 + \beta) = Mgh" />, så{" "}
        <InlineLatex latex="h = (1 + \beta)v^2/(2g)" />. Høyere β → høyere h.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Total kinetisk energi ={" "}
            <InlineLatex latex="\tfrac12 Mv^2 + \tfrac12 I\omega^2 = \tfrac12 Mv^2(1 + \beta)" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="K_\text{bunn} = \tfrac12 Mv^2(1 + \beta) \Rightarrow h = \frac{(1 + \beta)v^2}{2g}" variant="blue" />
        <FormulaBox latex="h_\text{massiv} = \frac{(1 + 2/5)v^2}{2g} = \frac{7v^2}{10g}" variant="blue" />
          <br />
          <FormulaBox latex="h_\text{hulk} = \frac{(1 + 2/3)v^2}{2g} = \frac{5v^2}{6g}" variant="blue" />
        <FormulaBox latex="\boxed{h_\text{hulk} = \tfrac{5}{6}\frac{v^2}{g} > h_\text{massiv} = \tfrac{7}{10}\frac{v^2}{g}}" variant="gold" />
        <p className="text-xs mt-1">Den hulke kulen har mer rotasjonsenergi ved bunnen (samme v) og går høyere.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Hulke objekter har mer rotasjonsenergi for samme v og når høyere i en opprulling. Dette er
        bakgrunnen for det klassiske «kule-versus-ring»-eksperimentet.
      </p>
    ),
  },

  // ==========================================================================
  // 10.66 — Blokk på skråplan + svinghjul
  // ==========================================================================
  "10.66": {
    title: "Blokk på skråplan med svinghjul",
    difficulty: "vanskelig",
    pageRef: "s. 361",
    problem: (
      <div className="space-y-2">
        <p>
          En blokk med masse <InlineLatex latex="m = 5{,}00\;\text{kg}" /> sklir nedover en skråning på
          36,9° (<InlineLatex latex="\mu_k = 0{,}26" />). En snor tvinnet rundt et svinghjul med masse
          6,25 kg og <InlineLatex latex="I = 0{,}500\;\text{kg·m}^2" /> er festet. Snoren drar
          tangentielt av hjulet i avstand <InlineLatex latex="r = 0{,}400\;\text{m}" /> fra aksen.
          (a) Finn akselerasjonen til blokka nedover skråningen. (b) Finn snorspenningen.
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Blokk: 5,00 kg, μ_k = 0,26, vinkel 36,9°</li>
        <li>Svinghjul: M = 6,25 kg, I = 0,500 kg·m², r = 0,400 m</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Akselerasjon a, spenning T</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Newton II for blokk: mg sinθ − μ_k mg cosθ − T = ma. Svinghjul: Tr = Iα, a = rα. To ligninger,
        to ukjente.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Fra hjullikningen: <InlineLatex latex="T = I a / r^2 = 0{,}500 a / 0{,}160 = 3{,}125 a" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            sin 36,9° = 0,600, cos 36,9° = 0,800.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">Krefter på blokka langs skråningen:</p>
        <FormulaBox latex="m g\sin\theta - \mu_k m g\cos\theta - T = ma" variant="blue" />
        <FormulaBox latex="5(9{,}80)(0{,}6) - (0{,}26)(5)(9{,}80)(0{,}8) - T = 5a" variant="blue" />
        <FormulaBox latex="29{,}4 - 10{,}19 - T = 5a \Rightarrow 19{,}21 - T = 5a" variant="blue" />
        <p className="text-xs mb-1">Svinghjul-ligning: Tr = Iα, a = rα:</p>
        <FormulaBox latex="T = Ia/r^2 = 0{,}500 a /(0{,}400)^2 = 3{,}125 a" variant="blue" />
        <p className="text-xs mb-1">Sett inn:</p>
        <FormulaBox latex="19{,}21 - 3{,}125 a = 5a \Rightarrow 19{,}21 = 8{,}125 a" variant="blue" />
        <FormulaBox latex="a = 2{,}364\;\text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 2{,}36\;\text{m/s}^2}" variant="gold" />
        <FormulaBox latex="T = 3{,}125(2{,}364) = 7{,}39\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{T \approx 7{,}39\;\text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Standardoppgave med koblet translasjon og rotasjon: Newton II på hvert legeme, kombinert med
        rullevilkår a = rα, gir to ligninger og to ukjente (a og T).
      </p>
    ),
  },

  // ==========================================================================
  // 10.69 — Atwood over skivetrinse
  // ==========================================================================
  "10.69": {
    title: "Atwood-maskin med skivetrinse",
    difficulty: "middels",
    pageRef: "s. 361",
    problem: (
      <p>
        To vekter henger i et lett, meget smidig tau som går over en friksjonsfri skivetrinse med
        vekt 70,0 N og radius 0,400 m. Skiva er en uniform massiv skive opphengt fra taket. Vektene
        er 125 N og 75,0 N. Hvilken kraft utøver taket på kroken som holder trinsa?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Skive: vekt W_s = 70,0 N, R = 0,400 m, uniform</li>
        <li>Vekter: W₁ = 125 N, W₂ = 75,0 N</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Krokkraft F</p>
    ),
    strategy: (
      <p className="text-sm">
        Finn akselerasjon og tau-spenninger T₁, T₂ fra Atwood med tung skive. Krokkraft = W_s +
        T₁ + T₂.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Masser: m₁ = 12,76 kg, m₂ = 7,65 kg, M_s = 7,14 kg. I = ½M_s R² = 0,571 kg·m².
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            I Atwood med trinsetreghet: <InlineLatex latex="a = \frac{(m_1 - m_2)g}{m_1 + m_2 + M_s/2}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">Masser og treghetsmoment:</p>
        <FormulaBox latex="m_1 = 125/9{,}80 = 12{,}76\;\text{kg}" variant="blue" />
        <FormulaBox latex="m_2 = 75{,}0/9{,}80 = 7{,}653\;\text{kg}" variant="blue" />
        <FormulaBox latex="M_s = 70{,}0/9{,}80 = 7{,}143\;\text{kg}" variant="blue" />
        <FormulaBox latex="a = \frac{(m_1 - m_2)g}{m_1 + m_2 + M_s/2} = \frac{(5{,}11)(9{,}80)}{24{,}0} = 2{,}088\;\text{m/s}^2" variant="blue" />
        <FormulaBox latex="T_1 = m_1(g - a) = 12{,}76(9{,}80 - 2{,}088) = 98{,}4\;\text{N}" variant="blue" />
          <br />
          <FormulaBox latex="T_2 = m_2(g + a) = 7{,}653(9{,}80 + 2{,}088) = 91{,}0\;\text{N}" variant="blue" />
        <p className="text-xs mb-1">Krokkraft (holder trinsa opp):</p>
        <FormulaBox latex="F = W_s + T_1 + T_2 = 70{,}0 + 98{,}4 + 91{,}0 = 259{,}4\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F \approx 259\;\text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Atwood med trinsetreghet: T₁ ≠ T₂. Snorspenningene er ulike fordi trinsa har treghetsmoment.
        Krokkraft er summen av trinsens vekt og begge spenningene.
      </p>
    ),
  },

  // ==========================================================================
  // 10.74 — Massiv kule ruller over klippe
  // ==========================================================================
  "10.74": {
    title: "Kule ruller ut i horisontalprojektil over klippe",
    difficulty: "vanskelig",
    pageRef: "s. 362",
    problem: (
      <div className="space-y-2">
        <p>
          En uniform massiv kule ruller uten sklis opp en bakke. På toppen beveger den seg horisontalt
          med 25,0 m/s og går deretter over en vertikal klippe på 28,0 m høyde. (a) Hvor langt fra
          klippens fot lander kulen og hvor fort? (b) Hvorfor er landingshastigheten større enn
          farten på toppen?
        </p>
        <svg viewBox="0 0 340 200" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <path d="M 10 170 Q 80 170 100 100 L 300 100 L 300 170 Z" fill="#fbbf2433" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 300 100 Q 300 170 320 170" fill="none" stroke="currentColor" strokeDasharray="3,3" />
          <circle cx="120" cy="90" r="8" fill="#fb923c" stroke="currentColor" />
          <line x1="130" y1="90" x2="170" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k10)" />
          <text x="140" y="82" fontSize="10" fill="#ef4444">25,0 m/s</text>
          <line x1="305" y1="100" x2="305" y2="170" stroke="currentColor" strokeWidth="1" />
          <text x="310" y="140" fontSize="10" fill="currentColor">28,0 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Massiv kule: β = 2/5</li>
        <li>v på kanten = 25,0 m/s (horisontalt)</li>
        <li>Høyde h = 28,0 m</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Landingsavstand x, fart v_land</li>
        <li>Hvorfor v_land &gt; v_topp</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Kula blir et projektil i luften — rotasjonen er løsrevet fra bevegelsen. Vannrett: x = vt.
        Loddrett: h = ½gt². Landingsfart: v² = v_x² + v_y².
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            t = √(2h/g) = √(56/9,8) = 2,39 s.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Landingsfart er translatorisk: energibevaring gir ΔK = mgh → økt <em>translatorisk</em> K
            (rotasjonen er nå uendret i fritt fall).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="t = \sqrt{2h/g} = \sqrt{56{,}0/9{,}80} = 2{,}391\;\text{s}" variant="blue" />
          <br />
          <FormulaBox latex="x = v_0 t = (25{,}0)(2{,}391) = 59{,}8\;\text{m}" variant="blue" />
        <FormulaBox latex="\boxed{x \approx 59{,}8\;\text{m}}" variant="gold" />
        <FormulaBox latex="v_y = gt = (9{,}80)(2{,}391) = 23{,}4\;\text{m/s}" variant="blue" />
          <br />
          <FormulaBox latex="v_\text{land} = \sqrt{v_0^2 + v_y^2} = \sqrt{625 + 549} = \sqrt{1174} = 34{,}3\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{land} \approx 34{,}3\;\text{m/s}}" variant="gold" />
        <p className="text-xs mb-1">(b) Hvorfor er landingsfarten større enn 25 m/s selv om rotasjonsenergien er uendret?</p>
        <p className="text-xs">I fall er det ingen friksjon, så rotasjonen endres ikke. Gravitasjonell
          potensiell energi (mgh) blir utelukkende translatorisk KE:{" "}
          <InlineLatex latex="\tfrac12 mv_\text{land}^2 = \tfrac12 mv_0^2 + mgh" />. Derfor er v_land større
          enn v_0.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når et rullende legeme blir et projektil, fryses rotasjonsenergien; kun translatorisk KE
        endres. Derfor blir v_translatorisk større ved landing enn ved avgang, selv om total energi
        er bevart.
      </p>
    ),
  },

  // ==========================================================================
  // 10.79 — Sylinder, trinse og hengende blokk
  // ==========================================================================
  "10.79": {
    title: "Rullende sylinder med trinse og hengende masse",
    difficulty: "vanskelig",
    pageRef: "s. 362",
    problem: (
      <div className="space-y-2">
        <p>
          En uniform massiv sylinder med masse M og radius 2R hviler på et horisontalt bord. Et tau er
          festet via en yoke til en friksjonsfri aksel gjennom sentrum av sylinderen. Tauet går over
          en skivetrinse med masse M og radius R (friksjonsfri aksel). En blokk med masse M henger
          fra den frie enden. Tauet glir ikke på trinsa, og sylinderen ruller uten sklis. Finn
          akselerasjonen til blokka.
        </p>
        <svg viewBox="0 0 340 200" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* ground */}
          <line x1="10" y1="140" x2="250" y2="140" stroke="currentColor" strokeWidth="1.5" />
          {/* cylinder */}
          <circle cx="80" cy="110" r="30" fill="#fbbf2433" stroke="currentColor" strokeWidth="1.5" />
          <text x="73" y="115" fontSize="11" fill="currentColor">2R</text>
          <text x="65" y="160" fontSize="10" fill="currentColor">M</text>
          {/* pulley */}
          <circle cx="240" cy="80" r="15" fill="#fbbf2433" stroke="currentColor" strokeWidth="1.5" />
          <text x="235" y="85" fontSize="10" fill="currentColor">R</text>
          <text x="260" y="85" fontSize="10" fill="currentColor">M</text>
          {/* rope */}
          <line x1="110" y1="110" x2="240" y2="65" stroke="currentColor" strokeWidth="1" />
          <line x1="255" y1="80" x2="255" y2="170" stroke="currentColor" strokeWidth="1" />
          {/* block */}
          <rect x="245" y="170" width="20" height="20" fill="#3b82f6" />
          <text x="272" y="185" fontSize="10" fill="currentColor">M</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Sylinder (ruller): masse M, radius 2R, I = ½M(2R)² = 2MR²</li>
        <li>Trinse (skive): masse M, radius R, I = ½MR²</li>
        <li>Hengende blokk: M</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Akselerasjonen til blokka</p>
    ),
    strategy: (
      <p className="text-sm">
        Tre legemer, tre Newton-ligninger. Rullevilkår for sylinderen: a_cm = (2R)α_cyl. Trinserulling:
        blokk-akselerasjon a = Rα_trinse. Aksel-farten til sylinderen er samme som tauet over trinsa.
        Men sylinderens aksel flytter seg med halvparten av tauets fart (fordi tauet fester i aksen og sylinderen ruller). Faktisk: aksel-farten = tauets fart, og tauet går over trinsa med samme fart som blokka. Så blokkens akselerasjon a = akselerasjonen til sylinderens tyngdepunkt.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Viktig: tauet fester ved aksen (yoke), ikke felgen. Så akselen har samme fart som tauet.
            Og blokka har samme fart som tauet. Så a_akse = a_blokk = a.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For sylinderens rulling: kontaktpunkt har null fart. Aksen har fart v, så{" "}
            <InlineLatex latex="\omega_\text{cyl} = v/(2R)" />. Friksjon f (ved bakken) gir
            dreiemoment som akselererer rotasjonen.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            Sylinder-rotasjon:{" "}
            <InlineLatex latex="f(2R) = I_\text{cyl}\alpha_\text{cyl} = \tfrac12 M(2R)^2 \cdot a/(2R) = MR a" />, så f = Ma/2.
            Newton II translasjon på sylinder: T₁ − f = Ma, så T₁ = Ma + Ma/2 = 3Ma/2.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">Definisjoner:</p>
        <FormulaBox latex="a = \text{akselerasjon blokk} = \text{akselerasjon sylinderens akse}" variant="blue" />
        <FormulaBox latex="\alpha_\text{cyl} = a/(2R),\;\alpha_\text{trinse} = a/R" variant="blue" />
        <p className="text-xs mb-1">Sylinder (friksjon f bakerst, snorspenning T₁ forover):</p>
        <FormulaBox latex="\text{Rotasjon: }f(2R) = I_\text{cyl}\alpha_\text{cyl} = \tfrac12 M(2R)^2 \cdot \frac{a}{2R} = MRa \Rightarrow f = \tfrac12 Ma" variant="blue" />
        <FormulaBox latex="\text{Translasjon: } T_1 - f = Ma \Rightarrow T_1 = Ma + \tfrac12 Ma = \tfrac{3}{2}Ma" variant="blue" />
        <p className="text-xs mb-1">Trinse (skive, T₁ på den ene siden, T₂ på den andre):</p>
        <FormulaBox latex="(T_2 - T_1)R = I_\text{trinse}\alpha_\text{trinse} = \tfrac12 MR^2 \cdot \frac{a}{R} = \tfrac12 MRa" variant="blue" />
        <FormulaBox latex="T_2 = T_1 + \tfrac12 Ma = \tfrac{3}{2}Ma + \tfrac12 Ma = 2Ma" variant="blue" />
        <p className="text-xs mb-1">Blokk (fall):</p>
        <FormulaBox latex="Mg - T_2 = Ma \Rightarrow Mg - 2Ma = Ma \Rightarrow Mg = 3Ma" variant="blue" />
        <FormulaBox latex="\boxed{a = g/3}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        I koblede rotasjons-translasjons-systemer: tegn frilegeme-diagram for hvert legeme, skriv
        Newton II (transl + rot), og bruk geometriske vilkår (rulling, inelastisk snor) til å
        koble akselerasjonene. Her: tre legemer, fire ligninger gir a = g/3.
      </p>
    ),
  },

  // ==========================================================================
  // 10.87 — Løper på dreieskive
  // ==========================================================================
  "10.87": {
    title: "Løper som stopper på dreieskive",
    difficulty: "vanskelig",
    pageRef: "s. 362",
    problem: (
      <p>
        En 50 kg løper løper rundt kanten av en horisontal dreieskive på et friksjonsfritt lager.
        Dreieskivens treghetsmoment om aksen er <InlineLatex latex="84\;\text{kg·m}^2" />. Løperens
        fart relativt til jorden er 3,0 m/s. Dreieskiva roterer motsatt vei med 0,22 rad/s relativt
        til jorden. Radius er 2,6 m, og løperen behandles som et punkt. Finn sluttvinkelhastigheten
        til systemet når løperen stopper i forhold til dreieskiva.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Løper: <InlineLatex latex="m = 50\;\text{kg},\;v_\text{løper} = 3{,}0\;\text{m/s}" /> (CCW, si positiv)</li>
        <li>Dreieskive: <InlineLatex latex="I_\text{skive} = 84\;\text{kg·m}^2,\;\omega_\text{skive} = -0{,}22\;\text{rad/s}" /> (motsatt)</li>
        <li>Radius: R = 2,6 m</li>
      </ul>
    ),
    unknowns: (
      <p className="text-sm">Sluttvinkelhastighet ω_f</p>
    ),
    strategy: (
      <p className="text-sm">
        Angulært moment om dreiesaksen er bevart (ingen ytre dreiemoment).{" "}
        <InlineLatex latex="L_\text{før} = I_\text{skive}\omega_\text{skive} + mvR" />,{" "}
        <InlineLatex latex="L_\text{etter} = (I_\text{skive} + mR^2)\omega_f" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Angulært moment for løper som punkt:{" "}
            <InlineLatex latex="L_\text{løper} = m v R" /> (v er tangentiell fart).
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-xs mb-1">Før (ta CCW som positiv):</p>
        <FormulaBox latex="L_\text{før} = I_\text{skive}\omega_\text{skive} + m v R" variant="blue" />
        <FormulaBox latex="L_\text{før} = (84)(-0{,}22) + (50)(3{,}0)(2{,}6) = -18{,}48 + 390 = 371{,}5\;\text{kg·m}^2/\text{s}" variant="blue" />
        <p className="text-xs mb-1">Etter: løper fast på skiva, ny I:</p>
        <FormulaBox latex="I_\text{etter} = 84 + (50)(2{,}6)^2 = 84 + 338 = 422\;\text{kg·m}^2" variant="blue" />
        <FormulaBox latex="\omega_f = L_\text{før}/I_\text{etter} = 371{,}5/422 = 0{,}880\;\text{rad/s}" variant="blue" />
        <FormulaBox latex="\boxed{\omega_f = 0{,}88\;\text{rad/s}\;\text{(samme retning som løper)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når personer beveger seg på roterende plattformer: angulært moment bevart om plattformens
        akse. Pass på fortegn — løper og skive kan rotere motsatt vei.
      </p>
    ),
  },
};
