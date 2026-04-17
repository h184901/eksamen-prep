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
      <marker id="arrow-red-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 8
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 8.1 — Bevegelsesmengde for lastebil vs SUV
  // ==========================================================================
  "8.1": {
    title: "Bevegelsesmengde og kinetisk energi: lastebil vs SUV",
    difficulty: "lett",
    pageRef: "s. 282",
    problem: (
      <div className="space-y-2">
        <p>
          (a) Hva er størrelsen på bevegelsesmengden til en 10 000 kg lastebil som har
          en fart på 12{"\u00A0"}m/s? (b) Hvilken fart må en 2000{"\u00A0"}kg SUV ha for å ha
          (i) samme bevegelsesmengde? (ii) samme kinetiske energi?
        </p>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1">
        <li>Lastebil: <InlineLatex latex="m_L = 10\,000\ \text{kg}" />, <InlineLatex latex="v_L = 12{,}0\ \text{m/s}" /></li>
        <li>SUV: <InlineLatex latex="m_S = 2000\ \text{kg}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1">
        <li>(a) <InlineLatex latex="p_L" /></li>
        <li>(b-i) SUVs fart når <InlineLatex latex="p_S = p_L" /></li>
        <li>(b-ii) SUVs fart når <InlineLatex latex="K_S = K_L" /></li>
      </ul>
    ),
    strategy: (
      <p>
        Bruk definisjonene <InlineLatex latex="p = mv" /> og <InlineLatex latex="K = \tfrac{1}{2}mv^2" />.
        Sett de to verdiene like for SUV og lastebil, og løs for farten.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Bevegelsesmengde er <em>lineær</em> i farten, men kinetisk energi er
            <em> kvadratisk</em>. Det gir ulike svar.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            For samme <InlineLatex latex="K" /> må du løse <InlineLatex latex="\tfrac{1}{2}m_S v_S^2 = \tfrac{1}{2}m_L v_L^2" />,
            altså <InlineLatex latex="v_S = v_L\sqrt{m_L/m_S}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a)</strong> Bevegelsesmengden til lastebilen:</p>
        <FormulaBox latex="p_L = m_L v_L = (10\,000)(12{,}0) = 1{,}20\times 10^{5}\ \text{kg\cdot m/s}" variant="blue" />
        <FormulaBox latex="\boxed{p_L = 1{,}20\times 10^{5}\ \text{kg}\cdot\text{m/s}}" variant="gold" />
        <p><strong>(b-i)</strong> Samme bevegelsesmengde: <InlineLatex latex="m_S v_S = p_L" /></p>
        <FormulaBox latex="v_S = \frac{p_L}{m_S} = \frac{1{,}20\times 10^{5}}{2000} = 60{,}0\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_S = 60{,}0\ \text{m/s}}" variant="gold" />
        <p><strong>(b-ii)</strong> Samme kinetisk energi: <InlineLatex latex="\tfrac{1}{2}m_S v_S^2 = \tfrac{1}{2}m_L v_L^2" /></p>
        <FormulaBox latex="v_S = v_L\sqrt{\frac{m_L}{m_S}} = 12{,}0\sqrt{\frac{10\,000}{2000}} = 12{,}0\sqrt{5}\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_S \approx 26{,}8\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Bevegelsesmengde skalerer lineært med fart (<InlineLatex latex="p\propto v" />), kinetisk
        energi skalerer kvadratisk (<InlineLatex latex="K\propto v^2" />). Et lettere legeme trenger
        derfor mye høyere fart for samme <InlineLatex latex="p" />, men bare <InlineLatex latex="\sqrt{m_L/m_S}" /> ganger
        for samme <InlineLatex latex="K" />.
      </p>
    ),
  },

  // ==========================================================================
  // 8.3 — Storfugl i bevegelse
  // ==========================================================================
  "8.3": {
    title: "Bevegelsesmengde og kinetisk energi for kondor",
    difficulty: "lett",
    pageRef: "s. 282",
    problem: (
      <p>
        En 10 kg kondor flyr med en fart på 8{"\u00A0"}m/s. (a) Hva er størrelsen på
        bevegelsesmengden til fuglen? (b) Hva er den kinetiske energien? (c) Hvis
        vi dobler farten, hvor mye øker <InlineLatex latex="p" /> og <InlineLatex latex="K" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m = 10\ \text{kg}" />, <InlineLatex latex="v = 8{,}0\ \text{m/s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside">
        <li>(a) <InlineLatex latex="p" /> (b) <InlineLatex latex="K" /> (c) forholdstall når <InlineLatex latex="v\to 2v" /></li>
      </ul>
    ),
    strategy: (
      <p>Direkte innsetting i <InlineLatex latex="p=mv" /> og <InlineLatex latex="K=\tfrac{1}{2}mv^2" />.</p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Dobling av fart gir dobbel <InlineLatex latex="p" /> men fire ganger så stor <InlineLatex latex="K" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="p = mv = (10)(8{,}0) = 80\ \text{kg\cdot m/s}" variant="blue" />
        <FormulaBox latex="\boxed{p = 80\ \text{kg\cdot m/s}}" variant="gold" />
        <FormulaBox latex="K = \tfrac{1}{2}mv^2 = \tfrac{1}{2}(10)(8{,}0)^2 = 320\ \text{J}" variant="blue" />
        <FormulaBox latex="\boxed{K = 3{,}2\times 10^{2}\ \text{J}}" variant="gold" />
        <p>(c) Hvis <InlineLatex latex="v\to 2v" />: <InlineLatex latex="p\to 2p=160\ \text{kg\cdot m/s}" />, <InlineLatex latex="K\to 4K=1280\ \text{J}" />.</p>
      </div>
    ),
    summary: <p>Bevegelsesmengden skalerer <em>lineært</em>, kinetisk energi <em>kvadratisk</em> med farten.</p>,
  },

  // ==========================================================================
  // 8.5 — Baseballens retningsendring
  // ==========================================================================
  "8.5": {
    title: "Endring av bevegelsesmengde i kastet baseball",
    difficulty: "lett",
    pageRef: "s. 282",
    problem: (
      <div className="space-y-2">
        <p>
          En baseball med masse 0,145{"\u00A0"}kg har en fart på 30{"\u00A0"}m/s rett mot batter.
          Etter støtet går ballen med 40{"\u00A0"}m/s rett tilbake. Finn størrelse og retning
          på endringen i ballens bevegelsesmengde.
        </p>
        <svg viewBox="0 0 300 80" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <circle cx="80" cy="30" r="6" fill="#3b82f6" />
          <line x1="80" y1="30" x2="140" y2="30" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="85" y="20" fontSize="11" fill="#3b82f6">før: 30 m/s →</text>
          <circle cx="240" cy="60" r="6" fill="#ef4444" />
          <line x1="240" y1="60" x2="170" y2="60" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="170" y="75" fontSize="11" fill="#ef4444">etter: 40 m/s ←</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m = 0{,}145\ \text{kg}" /></li>
        <li><InlineLatex latex="v_{1x} = +30\ \text{m/s}" />, <InlineLatex latex="v_{2x} = -40\ \text{m/s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="\Delta p_x = m(v_{2x}-v_{1x})" /></li>
      </ul>
    ),
    strategy: (
      <p>
        Velg en positiv retning (mot batter). Bevegelsesmengde er en vektor, så
        retningsendring må behandles med fortegn.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: (
          <p>
            <InlineLatex latex="\Delta p_x = m v_{2x} - m v_{1x}" />. Husk at
            fartene har motsatte fortegn.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\Delta p_x = m(v_{2x}-v_{1x}) = 0{,}145\bigl[(-40)-(30)\bigr]" variant="blue" />
        <FormulaBox latex="\Delta p_x = 0{,}145(-70) = -10{,}15\ \text{kg\cdot m/s}" variant="blue" />
        <FormulaBox latex="\boxed{|\Delta \vec p|\approx 10{,}2\ \text{kg\cdot m/s, rettet tilbake mot pitcher}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Selv om «fartsendring» kan virke som 10{"\u00A0"}m/s, er retningsvendingen avgjørende:
        <InlineLatex latex="\Delta\vec v=-70\ \text{m/s}" />. Vær alltid konsekvent med
        positiv retning.
      </p>
    ),
  },

  // ==========================================================================
  // 8.7 — Impuls på golfball
  // ==========================================================================
  "8.7": {
    title: "Impuls på golfball",
    difficulty: "lett",
    pageRef: "s. 282",
    problem: (
      <p>
        Man slår en 0,0450{"\u00A0"}kg golfball slik at den går fra ro til
        25{"\u00A0"}m/s i kontaktperioden på 2,00{"\u00A0"}ms. (a) Finn størrelsen på
        impulsen køllen leverer. (b) Finn den gjennomsnittlige kraften på ballen.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m=0{,}0450\ \text{kg}" />, <InlineLatex latex="v_1=0" />, <InlineLatex latex="v_2=25{,}0\ \text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t = 2{,}00\times 10^{-3}\ \text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside">
        <li>Impuls <InlineLatex latex="J" />, gjennomsnittskraft <InlineLatex latex="F_\text{gj}" /></li>
      </ul>
    ),
    strategy: (
      <p>
        Impuls-bevegelsesmengde-teoremet: <InlineLatex latex="J=\Delta p=m(v_2-v_1)" /> og <InlineLatex latex="F_\text{gj}=J/\Delta t" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Bruk <InlineLatex latex="J = \Delta p" /> og deretter <InlineLatex latex="F_\text{gj} = J/\Delta t" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="J = m(v_2 - v_1) = 0{,}0450\cdot 25{,}0 = 1{,}125\ \text{kg\cdot m/s}" variant="blue" />
        <FormulaBox latex="\boxed{J \approx 1{,}13\ \text{N\cdot s}}" variant="gold" />
        <FormulaBox latex="F_\text{gj} = \dfrac{J}{\Delta t} = \dfrac{1{,}125}{2{,}00\times 10^{-3}} = 562{,}5\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{gj} \approx 563\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Kort kontakttid gir enorme krefter selv for små masseendringer i fart —
        derfor er idrettsutstyr designet for å lange ut kontakttiden for sikkerhet.
      </p>
    ),
  },

  // ==========================================================================
  // 8.8 — Baseball og slagtre
  // ==========================================================================
  "8.8": {
    title: "Baseball snur retning — gjennomsnittlig kraft",
    difficulty: "middels",
    pageRef: "s. 282",
    problem: (
      <p>
        En 0,145{"\u00A0"}kg baseball ankommer i 45{"\u00A0"}m/s og forlater batten i
        55{"\u00A0"}m/s motsatt vei. Kontakttid: 2,00{"\u00A0"}ms. Finn (a) impulsen på ballen
        og (b) gjennomsnittskraften i kontaktøyeblikket.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m=0{,}145\ \text{kg}" /></li>
        <li><InlineLatex latex="v_1=-45\ \text{m/s}" />, <InlineLatex latex="v_2=+55\ \text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t=2{,}00\ \text{ms}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="J" /> og <InlineLatex latex="F_\text{gj}" /></li>
      </ul>
    ),
    strategy: (
      <p>
        Velg positiv x i ballens retning etter slaget. Bruk impuls-teoremet.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Farten endres fra <InlineLatex latex="-45" /> til <InlineLatex latex="+55" />, altså en endring på 100 m/s.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="J = m(v_2-v_1) = 0{,}145(55-(-45)) = 0{,}145\cdot 100" variant="blue" />
        <FormulaBox latex="\boxed{J = 14{,}5\ \text{N\cdot s}}" variant="gold" />
        <FormulaBox latex="F_\text{gj} = \dfrac{J}{\Delta t} = \dfrac{14{,}5}{2{,}00\times 10^{-3}}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{gj} = 7{,}25\times 10^{3}\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Gjennomsnittskraften blir over 7 kN — tilsvarer ~740 kg vekt! Kort kontakt
        gjør at store krefter må til for å snu bevegelsesmengden.
      </p>
    ),
  },

  // ==========================================================================
  // 8.9 — Hockeypuck med varierende kraft
  // ==========================================================================
  "8.9": {
    title: "Hockeypuck med tidsvarierende kraft",
    difficulty: "middels",
    pageRef: "s. 282",
    problem: (
      <p>
        En 0,160{"\u00A0"}kg hockeypuck beveger seg langs +x-aksen med 3,00{"\u00A0"}m/s.
        Den påvirkes av en kraft rettet langs −x-aksen som har størrelsen 25,0{"\u00A0"}N
        i 0,050{"\u00A0"}s og deretter 12,0{"\u00A0"}N i ytterligere 0,050{"\u00A0"}s.
        Finn pucken sin endelige fart.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m=0{,}160\ \text{kg}" />, <InlineLatex latex="v_1 = +3{,}00\ \text{m/s}" /></li>
        <li>Fase 1: <InlineLatex latex="F_1=-25{,}0\ \text{N}" />, <InlineLatex latex="\Delta t_1=0{,}050\ \text{s}" /></li>
        <li>Fase 2: <InlineLatex latex="F_2=-12{,}0\ \text{N}" />, <InlineLatex latex="\Delta t_2=0{,}050\ \text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart <InlineLatex latex="v_2" />.</p>,
    strategy: (
      <p>
        Summer impulsene fra begge fasene og bruk <InlineLatex latex="\sum J = m(v_2-v_1)" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Totalimpuls er <InlineLatex latex="J = F_1\Delta t_1 + F_2\Delta t_2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="J = (-25{,}0)(0{,}050) + (-12{,}0)(0{,}050) = -1{,}85\ \text{N\cdot s}" variant="blue" />
        <FormulaBox latex="v_2 = v_1 + \frac{J}{m} = 3{,}00 + \frac{-1{,}85}{0{,}160}" variant="blue" />
        <FormulaBox latex="v_2 = 3{,}00 - 11{,}5625 = -8{,}56\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_2 \approx -8{,}56\ \text{m/s (motsatt retning)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Impuls er enkel å summere — den er rett og slett «krafttid». Når en kraft
        virker mot bevegelsen lenge nok, snur legemet retning.
      </p>
    ),
  },

  // ==========================================================================
  // 8.10 — Slag på baseball, lineær kraftprofil
  // ==========================================================================
  "8.10": {
    title: "Trekantprofil av kraft: baseball mot batten",
    difficulty: "middels",
    pageRef: "s. 283",
    problem: (
      <p>
        Et slag på en 0,145{"\u00A0"}kg baseball lager en kraftprofil som øker lineært
        fra 0 til <InlineLatex latex="F_\text{maks}=5{,}00\times 10^{3}\ \text{N}" /> over
        1,00{"\u00A0"}ms og deretter synker lineært tilbake til null over 1,00{"\u00A0"}ms.
        Hvor stor sluttfart får ballen hvis den startet i ro?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m=0{,}145\ \text{kg}" /></li>
        <li>Trekantprofil: base 2,00{"\u00A0"}ms, topp 5000{"\u00A0"}N</li>
      </ul>
    ),
    unknowns: <p>Sluttfart <InlineLatex latex="v_2" /> (start i ro).</p>,
    strategy: (
      <p>
        Impuls er arealet under <InlineLatex latex="F(t)" />-grafen. For trekant
        er arealet <InlineLatex latex="\tfrac12\cdot\text{base}\cdot\text{høyde}" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Impuls = areal under grafen. Trekant: halv base ganger høyde.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="J = \tfrac{1}{2}(2{,}00\times 10^{-3})(5{,}00\times 10^{3}) = 5{,}00\ \text{N\cdot s}" variant="blue" />
        <FormulaBox latex="v_2 = \frac{J}{m} = \frac{5{,}00}{0{,}145} = 34{,}5\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_2 \approx 34{,}5\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        For <em>ikke-konstante</em> krefter: impuls = areal under <InlineLatex latex="F(t)" />.
        Kjente geometriske former som trekanter og trapeser gjør dette enkelt.
      </p>
    ),
  },

  // ==========================================================================
  // 8.11 — Rakettmotor med F = k·t²
  // ==========================================================================
  "8.11": {
    title: "Rakett med tidsavhengig trykk",
    difficulty: "vanskelig",
    pageRef: "s. 283",
    problem: (
      <p>
        En 2{"\u00A0"}500{"\u00A0"}kg rakett på testramma påvirkes av en kraft
        <InlineLatex latex="F(t)=A+Bt^2" /> der
        <InlineLatex latex="A=1{,}50\times 10^{5}\ \text{N}" />,
        <InlineLatex latex="B=2{,}00\times 10^{3}\ \text{N/s}^2" />. Kraften virker i 2,00{"\u00A0"}s.
        Finn impuls (a) fra 0 til 1,00{"\u00A0"}s og (b) fra 0 til 2,00{"\u00A0"}s.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="F(t) = 1{,}50\times 10^{5} + 2{,}00\times 10^{3}t^2" /> N</li>
      </ul>
    ),
    unknowns: <p>Impuls <InlineLatex latex="J=\int F\,dt" /> for to ulike tidsintervaller.</p>,
    strategy: (
      <p>
        Integrer kraften over tiden: <InlineLatex latex="J=\int_0^{t} (A+Bt'^2)\,dt' = At + \tfrac{B}{3}t^3" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Anti-derivasjon: <InlineLatex latex="\int t^2\,dt = \tfrac{1}{3}t^3" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="J(t) = At + \tfrac{B}{3}t^3" variant="blue" />
        <p>(a) <InlineLatex latex="t=1{,}00\ \text{s}" />:</p>
        <FormulaBox latex="J_1 = 1{,}50\times 10^{5} + \tfrac{2{,}00\times 10^3}{3} = 1{,}50\times 10^{5} + 6{,}67\times 10^{2}" variant="blue" />
        <FormulaBox latex="\boxed{J_1 \approx 1{,}51\times 10^{5}\ \text{N\cdot s}}" variant="gold" />
        <p>(b) <InlineLatex latex="t=2{,}00\ \text{s}" />:</p>
        <FormulaBox latex="J_2 = 3{,}00\times 10^{5} + \tfrac{2{,}00\times 10^3}{3}\cdot 8 = 3{,}00\times 10^{5} + 5{,}33\times 10^{3}" variant="blue" />
        <FormulaBox latex="\boxed{J_2 \approx 3{,}05\times 10^{5}\ \text{N\cdot s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Impuls for variabel kraft er en integral: <InlineLatex latex="J=\int_{t_1}^{t_2}F\,dt" />.
        Den konstante delen dominerer her; <InlineLatex latex="Bt^2" />-leddet bidrar mindre
        i starten men vokser som <InlineLatex latex="t^3" />.
      </p>
    ),
  },

  // ==========================================================================
  // 8.16 — Astronaut kaster verktøy
  // ==========================================================================
  "8.16": {
    title: "Astronaut kaster verktøy",
    difficulty: "lett",
    pageRef: "s. 283",
    problem: (
      <div className="space-y-2">
        <p>
          En 68,5{"\u00A0"}kg astronaut er i ro i rommet. For å komme tilbake til stasjonen
          kaster hun et 2,25{"\u00A0"}kg verktøy med 3,20{"\u00A0"}m/s i retning bort fra
          stasjonen. Hvor fort beveger astronauten seg etterpå, og i hvilken retning?
        </p>
        <svg viewBox="0 0 320 100" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <circle cx="170" cy="50" r="18" fill="#3b82f6" opacity="0.35" />
          <text x="160" y="54" fontSize="10" fill="currentColor">astro</text>
          <circle cx="250" cy="50" r="8" fill="#f59e0b" />
          <line x1="250" y1="50" x2="300" y2="50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber-k8)" />
          <text x="250" y="40" fontSize="10" fill="#f59e0b">verktøy</text>
          <line x1="160" y1="50" x2="110" y2="50" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="80" y="40" fontSize="10" fill="#3b82f6">astro ←</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="M=68{,}5\ \text{kg}" />, <InlineLatex latex="m=2{,}25\ \text{kg}" /></li>
        <li><InlineLatex latex="v_\text{verktøy}=+3{,}20\ \text{m/s}" /> (bort fra stasjonen)</li>
        <li>Astronaut og verktøy starter i ro.</li>
      </ul>
    ),
    unknowns: <p>Astronautens fart <InlineLatex latex="V" /> etter kastet.</p>,
    strategy: (
      <p>
        Ingen ytre krefter ⇒ <em>bevegelsesmengde er bevart</em>. Total <InlineLatex latex="p_i=0" />,
        så <InlineLatex latex="p_f=0" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="MV + mv = 0" /> ⇒ <InlineLatex latex="V = -\dfrac{m}{M}v" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="0 = MV + m v_\text{verktøy}" variant="blue" />
        <FormulaBox latex="V = -\dfrac{m}{M}v_\text{verktøy} = -\dfrac{2{,}25}{68{,}5}\cdot 3{,}20" variant="blue" />
        <FormulaBox latex="V = -0{,}1051\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{|V|\approx 0{,}105\ \text{m/s mot stasjonen}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Raketprinsippet i miniatyr: Kaster du noe bort fra deg, får du et støt i
        motsatt retning. Massefortoldningen <InlineLatex latex="m/M" /> bestemmer hvor fort.
      </p>
    ),
  },

  // ==========================================================================
  // 8.20 — Skøyteløper griper ball
  // ==========================================================================
  "8.20": {
    title: "Griping av ball på friksjonsfri is",
    difficulty: "lett",
    pageRef: "s. 284",
    problem: (
      <p>
        En 70,0{"\u00A0"}kg skøyteløper står i ro på friksjonsfri is. Hun griper en
        0,150{"\u00A0"}kg baseball som kommer mot henne i 22,0{"\u00A0"}m/s. Hvor raskt
        beveger hun seg etter at hun har grepet ballen?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="M=70{,}0\ \text{kg}" /> (i ro), <InlineLatex latex="m=0{,}150\ \text{kg}" /> i 22 m/s</li>
      </ul>
    ),
    unknowns: <p>Fart <InlineLatex latex="V" /> etter.</p>,
    strategy: (
      <p>
        Friksjonsfri is ⇒ bevegelsesmengde bevart. Etter gripet beveger de seg sammen
        (helt uelastisk kollisjon).
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="mv = (M+m)V" /></p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = \dfrac{mv}{M+m} = \dfrac{0{,}150\cdot 22{,}0}{70{,}15}" variant="blue" />
        <FormulaBox latex="\boxed{V \approx 0{,}0470\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Helt uelastisk kollisjon: <InlineLatex latex="V=(mv)/(M+m)" />. Jo større
        masseforhold, jo mindre endring i farten.
      </p>
    ),
  },

  // ==========================================================================
  // 8.21 — Air hockey-pucker
  // ==========================================================================
  "8.21": {
    title: "Air hockey-pucker kolliderer og kleber",
    difficulty: "middels",
    pageRef: "s. 284",
    problem: (
      <p>
        På en air-hockey-bane kolliderer en 0,250{"\u00A0"}kg puck i 6,00{"\u00A0"}m/s
        med en 0,350{"\u00A0"}kg puck i ro. De henger sammen etter støtet. Finn
        sluttfart og brøkdelen av kinetisk energi som tapes.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_A=0{,}250\ \text{kg},\ v_A=6{,}00\ \text{m/s}" /></li>
        <li><InlineLatex latex="m_B=0{,}350\ \text{kg},\ v_B=0" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart <InlineLatex latex="V" /> og relativ tap i <InlineLatex latex="K" />.</p>,
    strategy: (
      <p>
        Bevegelsesmengde bevart i uelastisk kollisjon. Tap i <InlineLatex latex="K" />
        = <InlineLatex latex="1-K_f/K_i" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="V=\frac{m_Av_A}{m_A+m_B}" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>For uelastisk kollisjon fra ro: <InlineLatex latex="K_f/K_i=m_A/(m_A+m_B)" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = \dfrac{(0{,}250)(6{,}00)}{0{,}600} = 2{,}50\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{V = 2{,}50\ \text{m/s}}" variant="gold" />
        <FormulaBox latex="K_i = \tfrac12(0{,}250)(6{,}00)^2 = 4{,}50\ \text{J}" variant="blue" />
        <FormulaBox latex="K_f = \tfrac12(0{,}600)(2{,}50)^2 = 1{,}875\ \text{J}" variant="blue" />
        <FormulaBox latex="\text{Tap:}\ 1 - \dfrac{1{,}875}{4{,}50} = 0{,}583" variant="blue" />
        <FormulaBox latex="\boxed{\text{58{,}3\% av KE tapes}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        I en uelastisk kollisjon der ett legeme er i ro, blir brøkdelen
        <InlineLatex latex="m_B/(m_A+m_B)" /> av kinetisk energi til varme/deformasjon.
      </p>
    ),
  },

  // ==========================================================================
  // 8.24 — Fjær mellom to blokker
  // ==========================================================================
  "8.24": {
    title: "Fjærdrevet separasjon av to blokker",
    difficulty: "middels",
    pageRef: "s. 284",
    problem: (
      <p>
        To blokker med masser <InlineLatex latex="m_A=1{,}00\ \text{kg}" /> og
        <InlineLatex latex="m_B=3{,}00\ \text{kg}" /> er i ro på et friksjonsfritt bord
        med en sammentrykt fjær mellom seg. Fjæra slippes og blokk A beveger seg med
        fart 1,20{"\u00A0"}m/s mot venstre. Finn farten til blokk B.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_A = 1{,}00\ \text{kg},\ v_A = -1{,}20\ \text{m/s}" /></li>
        <li><InlineLatex latex="m_B = 3{,}00\ \text{kg}" />, start i ro</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="v_B" /> og energi lagret i fjæra.</p>,
    strategy: (
      <p>
        Ingen ytre horisontal kraft ⇒ <InlineLatex latex="p_i = 0" />, så
        <InlineLatex latex="p_f = 0" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="m_A v_A + m_B v_B = 0" /> ⇒ <InlineLatex latex="v_B = -m_A v_A/m_B" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="v_B = -\dfrac{m_A v_A}{m_B} = -\dfrac{(1{,}00)(-1{,}20)}{3{,}00} = +0{,}400\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_B = 0{,}400\ \text{m/s mot høyre}}" variant="gold" />
        <FormulaBox latex="U_\text{fjær} = \tfrac12 m_A v_A^2 + \tfrac12 m_B v_B^2 = 0{,}720 + 0{,}240 = 0{,}960\ \text{J}" variant="blue" />
      </div>
    ),
    summary: (
      <p>
        Momentum bevart fra ro: lette blokker må bevege seg raskere for å balansere.
        Den lagrede fjærenergien overføres til kinetisk energi i begge blokkene.
      </p>
    ),
  },

  // ==========================================================================
  // 8.27 — Pil avfyrt fra ferjeapparat
  // ==========================================================================
  "8.27": {
    title: "Skøyteløper kaster stein",
    difficulty: "middels",
    pageRef: "s. 284",
    problem: (
      <p>
        En 65,0{"\u00A0"}kg skøyteløper beveger seg i 2,50{"\u00A0"}m/s over friksjonsfri is.
        Hun kaster en 5,00{"\u00A0"}kg stein i samme retning med 10,0{"\u00A0"}m/s
        relativt til bakken. Hva er hennes fart etterpå?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="M=65{,}0\ \text{kg},\ m=5{,}00\ \text{kg}" /></li>
        <li>Før: begge med fart 2,50 m/s</li>
        <li>Etter: stein 10,0 m/s i bakkeramme</li>
      </ul>
    ),
    unknowns: <p>Skøyteløperens sluttfart <InlineLatex latex="V'" />.</p>,
    strategy: (
      <p>
        Friksjonsfritt ⇒ <InlineLatex latex="p" /> bevart.
        <InlineLatex latex="(M+m)v_0 = MV' + mv_\text{stein}'" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Før kastet beveger skøyter og stein seg sammen med 2,50 m/s.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="(M+m)v_0 = MV' + m(10{,}0)" variant="blue" />
        <FormulaBox latex="(70{,}0)(2{,}50) = 65{,}0\,V' + (5{,}00)(10{,}0)" variant="blue" />
        <FormulaBox latex="175 = 65{,}0\,V' + 50{,}0 \Rightarrow V' = \dfrac{125}{65{,}0} \approx 1{,}92\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{V' \approx 1{,}92\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Ved å kaste steinen fremover saknar skøyteløperen ned. Hadde hun kastet
        steinen bakover, ville hun ha aksellerert fremover.
      </p>
    ),
  },

  // ==========================================================================
  // 8.30 — Rifle og kule: rekyl
  // ==========================================================================
  "8.30": {
    title: "Rekyl fra rifle",
    difficulty: "lett",
    pageRef: "s. 284",
    problem: (
      <p>
        En 4,50{"\u00A0"}kg rifle avfyrer en 12,0{"\u00A0"}g kule med munningsfart
        380{"\u00A0"}m/s. Hvor raskt rykker rifla bakover hvis den er fritt opphengt?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="M=4{,}50\ \text{kg},\ m=0{,}0120\ \text{kg},\ v=380\ \text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>Rekylfart <InlineLatex latex="V" />.</p>,
    strategy: <p>Bevaring av bevegelsesmengde fra ro.</p>,
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="MV + mv=0" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = -\dfrac{mv}{M} = -\dfrac{(0{,}0120)(380)}{4{,}50}" variant="blue" />
        <FormulaBox latex="\boxed{|V|\approx 1{,}01\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: <p>Samme fysikk som astronaut-verktøy. Rekyl er direkte konsekvens av momentum-bevaring.</p>,
  },

  // ==========================================================================
  // 8.33 — Jernbanevogner kolliderer (helt uelastisk)
  // ==========================================================================
  "8.33": {
    title: "Togvogner kolliderer og kobler seg sammen",
    difficulty: "middels",
    pageRef: "s. 285",
    problem: (
      <p>
        En 10{"\u00A0"}000{"\u00A0"}kg vogn triller i 24,0{"\u00A0"}m/s og støter sammen
        med en 20{"\u00A0"}000{"\u00A0"}kg vogn i ro. De kobler seg automatisk.
        Finn (a) sluttfart og (b) brøkdelen av kinetisk energi som omdannes til varme/deformasjon.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_A=10^4\ \text{kg},\ v_A=24{,}0\ \text{m/s}" /></li>
        <li><InlineLatex latex="m_B=2\cdot 10^4\ \text{kg},\ v_B=0" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="V" /> og <InlineLatex latex="\Delta K/K_i" />.</p>,
    strategy: <p>Helt uelastisk kollisjon: <InlineLatex latex="V=m_Av_A/(m_A+m_B)" />.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Brøkdelen bevart er <InlineLatex latex="m_A/(m_A+m_B)" />, brøkdelen tapt er <InlineLatex latex="m_B/(m_A+m_B)" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = \dfrac{(10^4)(24{,}0)}{3\cdot 10^4} = 8{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{V = 8{,}00\ \text{m/s}}" variant="gold" />
        <FormulaBox latex="K_i = \tfrac12(10^4)(24)^2 = 2{,}88\times 10^{6}\ \text{J}" variant="blue" />
        <FormulaBox latex="K_f = \tfrac12(3\cdot 10^4)(8)^2 = 9{,}60\times 10^{5}\ \text{J}" variant="blue" />
        <FormulaBox latex="\Delta K/K_i = 1 - \dfrac{9{,}6\times 10^5}{2{,}88\times 10^6} = 0{,}667" variant="blue" />
        <FormulaBox latex="\boxed{66{,}7\% \text{ av KE gått til varme}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        I helt uelastisk kollisjon med ett legeme i ro: tapt KE-andel
        = <InlineLatex latex="m_B/(m_A+m_B)" />. Her <InlineLatex latex="2/3\approx 66{,}7\%" />.
      </p>
    ),
  },

  // ==========================================================================
  // 8.36 — Bil og lastebil
  // ==========================================================================
  "8.36": {
    title: "Bil og lastebil kolliderer og kleber",
    difficulty: "middels",
    pageRef: "s. 285",
    problem: (
      <p>
        En 1050{"\u00A0"}kg bil i 15,0{"\u00A0"}m/s nordover kolliderer bak en
        6320{"\u00A0"}kg lastebil som kjører 10,0{"\u00A0"}m/s i samme retning. Kjøretøyene
        setter seg fast. Finn sluttfart og energi som omdannes.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_b=1050,\ v_b=15{,}0" /></li>
        <li><InlineLatex latex="m_l=6320,\ v_l=10{,}0" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="V" /> og tap i <InlineLatex latex="K" />.</p>,
    strategy: <p>Helt uelastisk kollisjon.</p>,
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="V = \dfrac{m_b v_b + m_l v_l}{m_b+m_l}" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = \dfrac{1050\cdot 15{,}0 + 6320\cdot 10{,}0}{7370}" variant="blue" />
        <FormulaBox latex="V = \dfrac{15\,750 + 63\,200}{7370} = \dfrac{78\,950}{7370}" variant="blue" />
        <FormulaBox latex="\boxed{V \approx 10{,}7\ \text{m/s nordover}}" variant="gold" />
        <FormulaBox latex="K_i = \tfrac12(1050)(225) + \tfrac12(6320)(100) = 1{,}18\times 10^5 + 3{,}16\times 10^5" variant="blue" />
        <FormulaBox latex="K_i \approx 4{,}34\times 10^5\ \text{J}" variant="blue" />
        <FormulaBox latex="K_f = \tfrac12(7370)(10{,}7)^2 \approx 4{,}22\times 10^5\ \text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta K \approx 1{,}2\times 10^4\ \text{J gått til varme/skade}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Når kjøretøyene allerede beveger seg i samme retning, blir tapet lite —
        relativ fart før støtet var bare 5 m/s.
      </p>
    ),
  },

  // ==========================================================================
  // 8.37 — Ballistisk pendel (bullet in block)
  // ==========================================================================
  "8.37": {
    title: "Kule skytes inn i treblokk — ballistisk pendel",
    difficulty: "vanskelig",
    pageRef: "s. 285",
    problem: (
      <div className="space-y-2">
        <p>
          En 12,0{"\u00A0"}g kule avfyres horisontalt inn i en 3,00{"\u00A0"}kg treblokk som
          henger i to lange snorer (ballistisk pendel). Kulen sitter fast i blokka og
          systemet svinger opp 6,00{"\u00A0"}cm. Finn kulens opprinnelige fart.
        </p>
        <svg viewBox="0 0 300 160" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="30" y1="10" x2="30" y2="110" stroke="currentColor" strokeDasharray="3" />
          <rect x="20" y="110" width="40" height="30" fill="#10b981" opacity="0.4" stroke="#10b981" />
          <rect x="140" y="70" width="40" height="30" fill="#10b981" opacity="0.4" stroke="#10b981" />
          <line x1="30" y1="10" x2="50" y2="125" stroke="currentColor" />
          <line x1="30" y1="10" x2="160" y2="85" stroke="currentColor" />
          <circle cx="0" cy="125" r="4" fill="#ef4444" />
          <line x1="0" y1="125" x2="15" y2="125" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="180" y="55" fontSize="10" fill="currentColor">h = 6 cm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m=0{,}0120\ \text{kg},\ M=3{,}00\ \text{kg}" /></li>
        <li><InlineLatex latex="h=0{,}0600\ \text{m},\ g=9{,}80\ \text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Kulens opprinnelige fart <InlineLatex latex="v" />.</p>,
    strategy: (
      <p>
        <strong>To-trinns problem:</strong> (1) <em>Uelastisk kollisjon</em> —
        bevegelsesmengde bevart. (2) <em>Fra etter kollisjon til topp</em> —
        mekanisk energi bevart.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Kollisjon: <InlineLatex latex="mv = (m+M)V" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Sving: <InlineLatex latex="\tfrac12(m+M)V^2 = (m+M)gh \Rightarrow V=\sqrt{2gh}" />.</p>,
      },
      {
        label: "Hint 3",
        content: <p>Sett sammen: <InlineLatex latex="v = \dfrac{m+M}{m}\sqrt{2gh}" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = \sqrt{2gh} = \sqrt{2\cdot 9{,}80\cdot 0{,}0600} = 1{,}0844\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v = \dfrac{m+M}{m}V = \dfrac{3{,}012}{0{,}0120}\cdot 1{,}0844" variant="blue" />
        <FormulaBox latex="v = 251\cdot 1{,}0844 \approx 272\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v \approx 272\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Den ballistiske pendelen er <em>klassisk to-trinns</em>: først
        momentum-bevaring (kollisjon), så energi-bevaring (sving). Aldri
        bruk energibevaring gjennom kollisjonen selv — mye KE går tapt der.
      </p>
    ),
  },

  // ==========================================================================
  // 8.41 — Puck-kollisjon på is i 2D
  // ==========================================================================
  "8.41": {
    title: "2D-kollisjon: Puck A sender ballen i vinkel",
    difficulty: "vanskelig",
    pageRef: "s. 286",
    problem: (
      <div className="space-y-2">
        <p>
          Puck A (0,025{"\u00A0"}kg) beveger seg i 5,50{"\u00A0"}m/s langs +x og
          kolliderer med puck B (0,050{"\u00A0"}kg) i ro. Etter kollisjonen går
          A i 4,15{"\u00A0"}m/s i en vinkel 30° over x-aksen. Finn farten og
          retningen til B.
        </p>
        <svg viewBox="0 0 320 180" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <line x1="40" y1="120" x2="150" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="60" y="135" fontSize="10" fill="#3b82f6">A før</text>
          <line x1="160" y1="120" x2="230" y2="60" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3" markerEnd="url(#arrow-blue-k8)" />
          <text x="195" y="75" fontSize="10" fill="#3b82f6">A etter 30°</text>
          <line x1="160" y1="120" x2="240" y2="170" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="195" y="175" fontSize="10" fill="#ef4444">B etter ?</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_A=0{,}025,\ v_{Ai}=5{,}50" /> langs x</li>
        <li><InlineLatex latex="m_B=0{,}050" />, i ro</li>
        <li><InlineLatex latex="v_{Af}=4{,}15\ \text{m/s},\ \theta_A=+30^\circ" /></li>
      </ul>
    ),
    unknowns: <p>Fart <InlineLatex latex="v_{Bf}" /> og vinkel <InlineLatex latex="\theta_B" /> for B.</p>,
    strategy: (
      <p>
        Bevegelsesmengde er vektor — bevares i hver akse. Oppstill
        ligninger for x og y separat.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Skriv ut <InlineLatex latex="p_x" />: <InlineLatex latex="m_Av_{Ai} = m_Av_{Af}\cos\theta_A + m_Bv_{Bf}\cos\theta_B" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Skriv ut <InlineLatex latex="p_y" />: <InlineLatex latex="0 = m_Av_{Af}\sin\theta_A + m_Bv_{Bf}\sin\theta_B" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>x-komponent:</strong></p>
        <FormulaBox latex="(0{,}025)(5{,}50) = (0{,}025)(4{,}15)\cos 30^\circ + (0{,}050)v_{Bx}" variant="blue" />
        <FormulaBox latex="0{,}1375 = 0{,}0898 + 0{,}050\,v_{Bx} \Rightarrow v_{Bx} = 0{,}954\ \text{m/s}" variant="blue" />
        <p><strong>y-komponent:</strong></p>
        <FormulaBox latex="0 = (0{,}025)(4{,}15)\sin 30^\circ + (0{,}050)v_{By}" variant="blue" />
        <FormulaBox latex="0 = 0{,}0519 + 0{,}050 v_{By} \Rightarrow v_{By} = -1{,}038\ \text{m/s}" variant="blue" />
        <p><strong>Sett sammen:</strong></p>
        <FormulaBox latex="v_{Bf} = \sqrt{0{,}954^2 + 1{,}038^2} \approx 1{,}41\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\theta_B = \arctan(-1{,}038/0{,}954) \approx -47{,}4^\circ" variant="blue" />
        <FormulaBox latex="\boxed{v_{Bf}\approx 1{,}41\ \text{m/s, } 47{,}4^\circ \text{ under x-aksen}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        I 2D-kollisjoner: <em>to ligninger, to ukjente</em> (fra x og y).
        Total momentum i y var null før, så må være null etter — derfor går B
        motsatt y-vei av A.
      </p>
    ),
  },

  // ==========================================================================
  // 8.42 — Biler krysser kryss i 2D
  // ==========================================================================
  "8.42": {
    title: "To biler kolliderer i T-kryss",
    difficulty: "vanskelig",
    pageRef: "s. 286",
    problem: (
      <p>
        En 1500{"\u00A0"}kg bil kjører 20,0{"\u00A0"}m/s østover. Den kolliderer med en
        2500{"\u00A0"}kg pickup som kjører 15,0{"\u00A0"}m/s nordover. De vikler seg sammen.
        Finn felles fart og retning etter kollisjonen.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_1=1500,\ \vec v_1 = 20{,}0\,\hat{x}" /></li>
        <li><InlineLatex latex="m_2=2500,\ \vec v_2 = 15{,}0\,\hat{y}" /></li>
      </ul>
    ),
    unknowns: <p>Sluttvektor <InlineLatex latex="\vec V" />.</p>,
    strategy: <p>Helt uelastisk 2D-kollisjon — sum momentum, del på total masse.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Komponentene blir <InlineLatex latex="V_x=m_1v_1/M_\text{tot}" /> og <InlineLatex latex="V_y=m_2v_2/M_\text{tot}" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V_x = \dfrac{1500\cdot 20{,}0}{4000} = 7{,}50\ \text{m/s}" variant="blue" />
        <FormulaBox latex="V_y = \dfrac{2500\cdot 15{,}0}{4000} = 9{,}375\ \text{m/s}" variant="blue" />
        <FormulaBox latex="V = \sqrt{7{,}50^2+9{,}375^2}\approx 12{,}0\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\theta = \arctan(9{,}375/7{,}50)\approx 51{,}3^\circ \text{ nord for øst}" variant="blue" />
        <FormulaBox latex="\boxed{V\approx 12{,}0\ \text{m/s, } 51{,}3^\circ \text{ N av Ø}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Ortogonale innkomne momenta gir sluttretning som Pythagoras av komponentene.
        Del alltid totalmomentet (vektor) på total masse.
      </p>
    ),
  },

  // ==========================================================================
  // 8.43 — Elastisk 2D-kollisjon (glancing)
  // ==========================================================================
  "8.43": {
    title: "Likevekts-glancing kollisjon (elastic)",
    difficulty: "vanskelig",
    pageRef: "s. 286",
    problem: (
      <p>
        En 0,200{"\u00A0"}kg puck beveger seg med 2,00{"\u00A0"}m/s langs +x og kolliderer
        elastisk med en identisk puck i ro. Etter elastisk kollisjon mellom like masser
        går de i 90° fra hverandre. Hvis den innkommende går i 30° nord for x etterpå,
        hvor går den andre?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li>Like masser, elastisk kollisjon, 2D</li>
        <li>Start: A i 2,00 m/s +x, B i ro</li>
        <li>Etter: A i +30°</li>
      </ul>
    ),
    unknowns: <p>B sin retning og begge fartene.</p>,
    strategy: (
      <p>
        For like masser i elastisk 2D-kollisjon er <em>sluttvinklene 90° mellom</em>.
        Bruk også momentum-bevaring.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Vinkler: <InlineLatex latex="\theta_A=+30^\circ" /> ⇒ <InlineLatex latex="\theta_B=-60^\circ" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Fart: <InlineLatex latex="v_A = v_i\cos 30^\circ" /> og <InlineLatex latex="v_B=v_i\sin 30^\circ" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\theta_B = -60^\circ \text{ (90° fra A)}" variant="blue" />
        <FormulaBox latex="v_{Af} = 2{,}00\cos 30^\circ = 1{,}732\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v_{Bf} = 2{,}00\sin 30^\circ = 1{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_A\approx 1{,}73\ \text{m/s ved }+30^\circ;\ v_B = 1{,}00\ \text{m/s ved }-60^\circ}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        For like masser i elastisk 2D-kollisjon med ett legeme i ro: sluttvinkelen er
        alltid <strong>90°</strong> mellom dem. Fartene følger <InlineLatex latex="\cos\theta" /> og <InlineLatex latex="\sin\theta" />.
      </p>
    ),
  },

  // ==========================================================================
  // 8.46 — Elastisk 1D: ulike masser
  // ==========================================================================
  "8.46": {
    title: "Elastisk 1D: kule treffer stillestående mål",
    difficulty: "middels",
    pageRef: "s. 287",
    problem: (
      <p>
        En 0,150{"\u00A0"}kg kule beveger seg mot høyre i 0,80{"\u00A0"}m/s og kolliderer
        elastisk med en 0,300{"\u00A0"}kg kule i ro. Finn fart og retning for begge
        etter kollisjonen.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_A=0{,}150,\ v_A=0{,}80" /></li>
        <li><InlineLatex latex="m_B=0{,}300,\ v_B=0" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="v_{Af},\ v_{Bf}" />.</p>,
    strategy: (
      <p>
        Elastiske 1D-formler:
        <InlineLatex latex="v_{Af}=\dfrac{m_A-m_B}{m_A+m_B}v_{Ai}" />,
        <InlineLatex latex="v_{Bf}=\dfrac{2m_A}{m_A+m_B}v_{Ai}" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Lettere projektil mot tyngre mål: lettere vil sprette tilbake.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="v_{Af} = \dfrac{0{,}150-0{,}300}{0{,}450}(0{,}80) = -0{,}267\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v_{Bf} = \dfrac{0{,}300}{0{,}450}(0{,}80) = 0{,}533\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_A' \approx -0{,}267\ \text{m/s (spretter tilbake)}}" variant="gold" />
        <FormulaBox latex="\boxed{v_B' \approx 0{,}533\ \text{m/s (fremover)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        For elastisk 1D-kollisjon mot stillestående mål: lett mot tungt ⇒ sprett
        tilbake; tungt mot lett ⇒ tungt fortsetter nesten uforstyrret; like masser
        ⇒ utbytte av farten.
      </p>
    ),
  },

  // ==========================================================================
  // 8.48 — Elastisk, like masser
  // ==========================================================================
  "8.48": {
    title: "Elastisk kollisjon mellom like masser",
    difficulty: "lett",
    pageRef: "s. 287",
    problem: (
      <p>
        To billardkuler har samme masse. Kule 1 beveger seg med 5,00{"\u00A0"}m/s mot
        kule 2 som er i ro, og kolliderer elastisk. Hva er begge fartene etter?
      </p>
    ),
    knowns: <p>Like masser, elastisk, én i ro.</p>,
    unknowns: <p><InlineLatex latex="v_{1f},\ v_{2f}" />.</p>,
    strategy: <p>Klassisk resultat: farten utveksles fullstendig.</p>,
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="m_1=m_2" /> i de elastiske formlene gir <InlineLatex latex="v_{1f}=0,\ v_{2f}=v_{1i}" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="v_{1f} = 0,\quad v_{2f} = 5{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_1' = 0,\ v_2' = 5{,}00\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Like masser, elastisk, én i ro: den bevegelige stopper, målet overtar hele
        farten. Kjernen i mange Newton-pendel-demoer.
      </p>
    ),
  },

  // ==========================================================================
  // 8.52 — Massesenter for to masser
  // ==========================================================================
  "8.52": {
    title: "Massesenter for to masser",
    difficulty: "lett",
    pageRef: "s. 287",
    problem: (
      <p>
        Finn massesenteret til et system av to kuler: 0,100{"\u00A0"}kg i
        <InlineLatex latex="(0, 0)" /> og 0,300{"\u00A0"}kg i <InlineLatex latex="(0{,}500, 0)" /> (m).
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_1=0{,}100,\ x_1=0" /></li>
        <li><InlineLatex latex="m_2=0{,}300,\ x_2=0{,}500" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="x_\text{cm}" /></p>,
    strategy: <p>Vekt gjennomsnitt: <InlineLatex latex="x_\text{cm}=\sum m_ix_i / \sum m_i" />.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Tyngre masse «trekker» COM mot seg.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="x_\text{cm} = \dfrac{0{,}100\cdot 0 + 0{,}300\cdot 0{,}500}{0{,}400}" variant="blue" />
        <FormulaBox latex="\boxed{x_\text{cm} = 0{,}375\ \text{m}}" variant="gold" />
      </div>
    ),
    summary: <p>COM ligger nærmere den tyngre massen — i forhold til masseforholdet.</p>,
  },

  // ==========================================================================
  // 8.54 — COM 2D
  // ==========================================================================
  "8.54": {
    title: "Massesenter for tre punktmasser (2D)",
    difficulty: "middels",
    pageRef: "s. 288",
    problem: (
      <p>
        Finn <InlineLatex latex="(x_\text{cm}, y_\text{cm})" /> for tre masser:
        0,30{"\u00A0"}kg i (0,0), 0,40{"\u00A0"}kg i (0,20; 0), 0,20{"\u00A0"}kg i
        (0,10; 0,30) (alle i m).
      </p>
    ),
    knowns: <p>tre masser, tre posisjoner (gitt).</p>,
    unknowns: <p>COM-koordinater.</p>,
    strategy: <p>Bruk formelen komponentvis.</p>,
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="x_\text{cm}=\sum m_ix_i/M" />, <InlineLatex latex="y_\text{cm}=\sum m_iy_i/M" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="M = 0{,}30+0{,}40+0{,}20 = 0{,}90\ \text{kg}" variant="blue" />
        <FormulaBox latex="x_\text{cm} = \dfrac{0+0{,}40\cdot 0{,}20+0{,}20\cdot 0{,}10}{0{,}90} = \dfrac{0{,}10}{0{,}90}" variant="blue" />
        <FormulaBox latex="x_\text{cm} \approx 0{,}111\ \text{m}" variant="blue" />
        <FormulaBox latex="y_\text{cm} = \dfrac{0{,}20\cdot 0{,}30}{0{,}90} = 0{,}0667\ \text{m}" variant="blue" />
        <FormulaBox latex="\boxed{(x_\text{cm},y_\text{cm})\approx (0{,}111,\ 0{,}067)\ \text{m}}" variant="gold" />
      </div>
    ),
    summary: <p>I 2D/3D: finn COM komponent for komponent.</p>,
  },

  // ==========================================================================
  // 8.56 — COM-bevegelse under eksplosjon
  // ==========================================================================
  "8.56": {
    title: "Eksplosjon i luft — COM fortsetter banen",
    difficulty: "middels",
    pageRef: "s. 288",
    problem: (
      <p>
        En 2,00{"\u00A0"}kg rakett kastes opp og eksploderer i to like biter (1,00{"\u00A0"}kg hver)
        ved høyeste punkt. Én bit faller rett ned og treffer jorda 1,00{"\u00A0"}s senere.
        Hvor treffer den andre biten i forhold til startstedet?
      </p>
    ),
    knowns: <p>Se tekst.</p>,
    unknowns: <p>Posisjonen der bit 2 treffer.</p>,
    strategy: (
      <p>
        Etter eksplosjonen virker bare tyngdekraft (ytre). Massesenteret
        fortsetter originalbanen — men raketten hadde null horisontal hastighet
        fordi den ble kastet rett opp! Så COM faller rett ned.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Hvis begge biter har 1 kg og bit 1 faller rett ned, må COM (som er midt mellom dem horisontalt) være over startpunktet.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Det betyr at bit 2 må lande på samme sted som bit 1 (horisontalt), dvs. rett under eksplosjonspunktet.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p>
          Siden COM ikke akselererer horisontalt og starter med null horisontal fart,
          blir <InlineLatex latex="x_\text{cm}(t) = 0" /> alltid. Med like biter:
        </p>
        <FormulaBox latex="x_\text{cm} = \tfrac12(x_1+x_2)=0 \Rightarrow x_1 = -x_2" variant="blue" />
        <p>
          Hvis bit 1 faller rett ned (<InlineLatex latex="x_1=0" />), må
          <InlineLatex latex="x_2=0" /> også — altså lander begge på startpunktet.
        </p>
        <FormulaBox latex="\boxed{\text{bit 2 lander rett under eksplosjonspunktet}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        <strong>COM-prinsippet:</strong> Ytre krefter bestemmer COM-banen. Indre krefter
        (som eksplosjon) omfordeler massen om COM, men endrer ikke COM-banen.
      </p>
    ),
  },

  // ==========================================================================
  // 8.58 — Rakettligning
  // ==========================================================================
  "8.58": {
    title: "Rakettfart etter forbrenning",
    difficulty: "vanskelig",
    pageRef: "s. 289",
    problem: (
      <p>
        En rakett har startmasse 6000{"\u00A0"}kg, hvorav 4800{"\u00A0"}kg er drivstoff.
        Effektiv utløpsfart (relativt rakett) er 2000{"\u00A0"}m/s. Finn farten når alt
        drivstoffet er brent, antatt ingen tyngdekraft.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_0=6000\ \text{kg},\ m_f=1200\ \text{kg}" /></li>
        <li><InlineLatex latex="v_\text{ex}=2000\ \text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="v_f-v_0" /> (her fra ro).</p>,
    strategy: <p>Tsiolkovskys rakettligning: <InlineLatex latex="\Delta v = v_\text{ex}\ln(m_0/m_f)" />.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Bruk naturlig logaritme av masseforholdet.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\Delta v = 2000\cdot\ln\!\left(\dfrac{6000}{1200}\right) = 2000\ln 5" variant="blue" />
        <FormulaBox latex="\Delta v = 2000\cdot 1{,}609 = 3219\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_f \approx 3{,}22\times 10^{3}\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Rakettligningen er logaritmisk i masseforhold. Å doble slutthastigheten krever
        å kvadrere masseforholdet — derfor trenger stor Δv flertrinnsraketter.
      </p>
    ),
  },

  // ==========================================================================
  // 8.59 — COM-hastighet for system
  // ==========================================================================
  "8.59": {
    title: "COM-hastighet for to objekter",
    difficulty: "lett",
    pageRef: "s. 289",
    problem: (
      <p>
        To biler på en rett vei: en 1500{"\u00A0"}kg bil i 20,0{"\u00A0"}m/s østover, og
        en 2000{"\u00A0"}kg bil i 15,0{"\u00A0"}m/s vestover. Hva er COM-hastigheten?
      </p>
    ),
    knowns: <p>Gitt i teksten.</p>,
    unknowns: <p><InlineLatex latex="v_\text{cm}" /></p>,
    strategy: <p><InlineLatex latex="v_\text{cm}=(m_1v_1+m_2v_2)/(m_1+m_2)" />.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Motsatt retning gir motsatt fortegn.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="v_\text{cm} = \dfrac{1500(20{,}0)+2000(-15{,}0)}{3500}" variant="blue" />
        <FormulaBox latex="v_\text{cm} = \dfrac{30\,000-30\,000}{3500} = 0\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{cm}=0}" variant="gold" />
      </div>
    ),
    summary: <p>Når momenta er nøyaktig motsatte, står COM stille — uansett hva enkeltlegemene gjør.</p>,
  },

  // ==========================================================================
  // 8.64 — Problems: baseballballens impuls fra graf
  // ==========================================================================
  "8.64": {
    title: "Baseball med grafisk kraftprofil",
    difficulty: "middels",
    pageRef: "s. 290",
    problem: (
      <p>
        En 0,145{"\u00A0"}kg ball treffes med en kraft som gir trekantprofil:
        lineær opp fra 0 til <InlineLatex latex="F_\text{maks}" /> over 1,25{"\u00A0"}ms,
        og lineært ned igjen over 1,25{"\u00A0"}ms. Totalimpuls skal være 15,0{"\u00A0"}N·s.
        Finn <InlineLatex latex="F_\text{maks}" /> og gjennomsnittskraften.
      </p>
    ),
    knowns: <p>trekantprofil, total varighet 2,50 ms, <InlineLatex latex="J=15{,}0" />.</p>,
    unknowns: <p><InlineLatex latex="F_\text{maks}" /> og <InlineLatex latex="F_\text{gj}" />.</p>,
    strategy: <p>Trekantareal = <InlineLatex latex="\tfrac12 \Delta t\,F_\text{maks}" />, gj. = <InlineLatex latex="J/\Delta t" />.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>For en trekant: <InlineLatex latex="F_\text{maks}=2J/\Delta t" /> og <InlineLatex latex="F_\text{gj}=F_\text{maks}/2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="F_\text{maks} = \dfrac{2J}{\Delta t} = \dfrac{2\cdot 15{,}0}{2{,}50\times 10^{-3}} = 1{,}20\times 10^{4}\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{maks} = 1{,}20\times 10^{4}\ \text{N}}" variant="gold" />
        <FormulaBox latex="F_\text{gj} = \dfrac{J}{\Delta t} = 6{,}00\times 10^{3}\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{gj}=6{,}00\times 10^{3}\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: <p>For trekantformet kraftprofil er <InlineLatex latex="F_\text{gj}=F_\text{maks}/2" />.</p>,
  },

  // ==========================================================================
  // 8.65 — Problem: Kanonballa og båten
  // ==========================================================================
  "8.65": {
    title: "Kanonball avfyres fra båt — rekyl",
    difficulty: "middels",
    pageRef: "s. 290",
    problem: (
      <p>
        En 12,0{"\u00A0"}kg kanonball avfyres fra en 750{"\u00A0"}kg båt i ro med
        200{"\u00A0"}m/s horisontalt. Finn båtens rekylfart og energi levert av kruttet.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m=12{,}0,\ v=200" />; <InlineLatex latex="M=750,\ V=?" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="V" /> og total energi.</p>,
    strategy: <p>Bevegelsesmengde bevart fra ro + sum kinetisk energi.</p>,
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="V=-mv/M" /> og <InlineLatex latex="E=\tfrac12mv^2+\tfrac12MV^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = -\dfrac{12{,}0\cdot 200}{750} = -3{,}20\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{|V|=3{,}20\ \text{m/s}}" variant="gold" />
        <FormulaBox latex="E = \tfrac12(12{,}0)(200)^2 + \tfrac12(750)(3{,}20)^2" variant="blue" />
        <FormulaBox latex="E = 2{,}40\times 10^{5} + 3{,}84\times 10^{3} \approx 2{,}44\times 10^{5}\ \text{J}" variant="blue" />
        <FormulaBox latex="\boxed{E\approx 2{,}44\times 10^{5}\ \text{J}}" variant="gold" />
      </div>
    ),
    summary: <p>Merk: Selv om både båt og ball får KE, står mesteparten i det lettere objektet (ballen).</p>,
  },

  // ==========================================================================
  // 8.69 — Fiskebåt og anker
  // ==========================================================================
  "8.69": {
    title: "Dropping av anker fra fiskebåt",
    difficulty: "middels",
    pageRef: "s. 291",
    problem: (
      <p>
        En 3500{"\u00A0"}kg båt triller på friksjonsfritt vann med 8,00{"\u00A0"}m/s.
        Et 150{"\u00A0"}kg anker slippes vertikalt (ingen horisontal fart relativt
        vannet). Hvordan endres båtens fart? Forklar.
      </p>
    ),
    knowns: <p>båt 3500 kg, 8 m/s; anker 150 kg.</p>,
    unknowns: <p>Ny fart for båt.</p>,
    strategy: (
      <p>
        Ankeret har fortsatt båtens horisontale fart i øyeblikket det slippes
        (samme fart som båten). Ingen endring i momentum-fordelingen ⇒ båtens fart endres ikke.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Hvilken horisontal fart har ankeret akkurat når det slippes?</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <p>
          Akkurat når ankeret slippes, har det fart 8,00{"\u00A0"}m/s (samme som båten).
          Ingen horisontal kraft mellom båt og anker ⇒ båten fortsetter med 8,00{"\u00A0"}m/s.
        </p>
        <FormulaBox latex="\boxed{v_\text{båt}=8{,}00\ \text{m/s (uendret)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Å «slippe» noe uten å gi det en ekstra horisontal impuls endrer ikke
        farten — det er <em>kast</em> (impuls) som gir rekyl, ikke slipping.
      </p>
    ),
  },

  // ==========================================================================
  // 8.79 — Problem: to blokker med fjær
  // ==========================================================================
  "8.79": {
    title: "Fjær-drevet system på friksjonsfritt plan",
    difficulty: "vanskelig",
    pageRef: "s. 292",
    problem: (
      <p>
        To blokker <InlineLatex latex="m_A=2{,}00\ \text{kg}" /> og
        <InlineLatex latex="m_B=3{,}00\ \text{kg}" /> er forbundet med en lett, sammentrykket
        fjær og holdt sammen. På friksjonsfritt plan slippes de og fjæra gir A fart
        <InlineLatex latex="v_A=6{,}00\ \text{m/s}" /> mot venstre. Finn (a) farten til B,
        (b) energien lagret i fjæra.
      </p>
    ),
    knowns: <p>Som gitt.</p>,
    unknowns: <p><InlineLatex latex="v_B" /> og <InlineLatex latex="U_0" />.</p>,
    strategy: <p>Momentum bevart fra ro; total KE etter = fjærenergi.</p>,
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="m_Av_A + m_Bv_B = 0" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p><InlineLatex latex="U_0 = \tfrac12 m_Av_A^2 + \tfrac12m_Bv_B^2" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="v_B = -\dfrac{m_A v_A}{m_B} = -\dfrac{(2{,}00)(-6{,}00)}{3{,}00} = +4{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_B = 4{,}00\ \text{m/s mot høyre}}" variant="gold" />
        <FormulaBox latex="U_0 = \tfrac12(2{,}00)(6{,}00)^2 + \tfrac12(3{,}00)(4{,}00)^2" variant="blue" />
        <FormulaBox latex="U_0 = 36{,}0 + 24{,}0 = 60{,}0\ \text{J}" variant="blue" />
        <FormulaBox latex="\boxed{U_0 = 60{,}0\ \text{J}}" variant="gold" />
      </div>
    ),
    summary: <p>Fjærenergien deles invers til massene — lett blokk får mer KE enn tung.</p>,
  },

  // ==========================================================================
  // 8.81 — Slagball fra bil med konstant fart
  // ==========================================================================
  "8.81": {
    title: "Skøyteløper skyver bort kasse",
    difficulty: "middels",
    pageRef: "s. 293",
    problem: (
      <p>
        En 45,0{"\u00A0"}kg skøyteløper står i ro på is og skyver bort en 15,0{"\u00A0"}kg
        kasse med fart 3,00{"\u00A0"}m/s. Etter hvor lang tid (etter at skyvet har sluttet)
        er skøyteløperen 10,0{"\u00A0"}m fra kassen?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="M=45{,}0,\ m=15{,}0,\ v=3{,}00" /></li>
        <li>Avstand 10,0 m</li>
      </ul>
    ),
    unknowns: <p>Tid <InlineLatex latex="t" /> for 10 m relativ avstand.</p>,
    strategy: <p>Først finn <InlineLatex latex="V" /> fra momentum; så summer farter, deretter tid.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Relativ fart = <InlineLatex latex="v+|V|" />. Tid = 10 m / relativ fart.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = -\dfrac{(15{,}0)(3{,}00)}{45{,}0} = -1{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v_\text{rel} = 3{,}00 + 1{,}00 = 4{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="t = \dfrac{10{,}0}{4{,}00} = 2{,}50\ \text{s}" variant="blue" />
        <FormulaBox latex="\boxed{t = 2{,}50\ \text{s}}" variant="gold" />
      </div>
    ),
    summary: <p>Relativ fart er summen av fartene når legemene beveger seg fra hverandre.</p>,
  },

  // ==========================================================================
  // 8.83 — Problem: Ballistisk pendel med vinkel
  // ==========================================================================
  "8.83": {
    title: "Ballistisk pendel svinger opp i vinkel",
    difficulty: "vanskelig",
    pageRef: "s. 293",
    problem: (
      <p>
        En 0,0500{"\u00A0"}kg kule treffer en 2,00{"\u00A0"}kg blokk som henger i
        en 1,50{"\u00A0"}m lang snor, setter seg fast, og pendelen svinger opp til
        maksimal snor-vinkel 25,0° med vertikal. Finn kulens opprinnelige fart.
      </p>
    ),
    knowns: <p>Se tekst.</p>,
    unknowns: <p><InlineLatex latex="v" /></p>,
    strategy: (
      <p>
        Kombiner: (1) momentum-bevaring gjennom kollisjon, (2) energibevaring fra
        etter kollisjon til max vinkel. Maks høyde: <InlineLatex latex="h=L(1-\cos\theta)" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="h=L(1-\cos\theta)=1{,}50(1-\cos 25^\circ)" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p><InlineLatex latex="V=\sqrt{2gh}" />, deretter <InlineLatex latex="v=\tfrac{m+M}{m}V" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="h = 1{,}50(1 - \cos 25^\circ) = 1{,}50(1-0{,}9063) = 0{,}1406\ \text{m}" variant="blue" />
        <FormulaBox latex="V = \sqrt{2(9{,}80)(0{,}1406)} = 1{,}660\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v = \dfrac{0{,}0500+2{,}00}{0{,}0500}\cdot 1{,}660 = 41{,}0\cdot 1{,}660" variant="blue" />
        <FormulaBox latex="\boxed{v \approx 68{,}1\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: <p>Klassisk to-trinns: momentum (kollisjon) + energi (sving). Maks-høyde via <InlineLatex latex="L(1-\cos\theta)" />.</p>,
  },

  // ==========================================================================
  // 8.85 — Problem: Bil kjører inn i parkert bil
  // ==========================================================================
  "8.85": {
    title: "Bil-parkering-kollisjon: bestem utgangsfart",
    difficulty: "middels",
    pageRef: "s. 294",
    problem: (
      <p>
        En 1200{"\u00A0"}kg bil støter bakfra på en 1800{"\u00A0"}kg parkert bil. De
        skyter avgårde sammen og glir til stopp etter 5,50{"\u00A0"}m, med
        kinetisk friksjonskoeffisient 0,400. Finn den første bilens fart idet den traff.
      </p>
    ),
    knowns: <p>Som gitt; <InlineLatex latex="\mu_k=0{,}400" />.</p>,
    unknowns: <p><InlineLatex latex="v_1" />.</p>,
    strategy: (
      <p>
        To-trinns: (1) uelastisk kollisjon bestemmer felles fart <InlineLatex latex="V" />.
        (2) arbeid-energi: friksjon stanser på 5,50{"\u00A0"}m.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Fra stopp bakover: <InlineLatex latex="V=\sqrt{2\mu_k g d}" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Kollisjon: <InlineLatex latex="m_1v_1 = (m_1+m_2)V" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="V = \sqrt{2\cdot 0{,}400\cdot 9{,}80\cdot 5{,}50} = \sqrt{43{,}12} \approx 6{,}566\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v_1 = \dfrac{m_1+m_2}{m_1}V = \dfrac{3000}{1200}\cdot 6{,}566" variant="blue" />
        <FormulaBox latex="v_1 = 2{,}5\cdot 6{,}566 \approx 16{,}4\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_1 \approx 16{,}4\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        To-stegs omvendt-arbeid: bruk friksjon til å finne fart <em>etter</em> kollisjon,
        så momentum-bevaring til å finne fart <em>før</em>. Typisk rekonstruksjon i
        trafikkanalyse.
      </p>
    ),
  },

  // ==========================================================================
  // 8.88 — Problem: Massesenter for stang med variabel tetthet
  // ==========================================================================
  "8.88": {
    title: "COM for stang med lineær tetthet",
    difficulty: "vanskelig",
    pageRef: "s. 294",
    problem: (
      <p>
        En 0,800{"\u00A0"}m lang stang har lineær tetthet
        <InlineLatex latex="\lambda(x)=\lambda_0(1+x/L)" /> der
        <InlineLatex latex="\lambda_0=2{,}00\ \text{kg/m}" /> og <InlineLatex latex="L=0{,}800\ \text{m}" />.
        Finn (a) total masse og (b) <InlineLatex latex="x_\text{cm}" />.
      </p>
    ),
    knowns: <p><InlineLatex latex="\lambda(x)=\lambda_0(1+x/L),\ L=0{,}800,\ \lambda_0=2{,}00" />.</p>,
    unknowns: <p><InlineLatex latex="M" /> og <InlineLatex latex="x_\text{cm}" />.</p>,
    strategy: (
      <p>
        Bruk integraler:
        <InlineLatex latex="M=\int_0^L\lambda\,dx,\ x_\text{cm}=\tfrac1M\int_0^L x\lambda\,dx" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Regn ut <InlineLatex latex="\int_0^L(1+x/L)\,dx = L + L/2 = 3L/2" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Regn ut <InlineLatex latex="\int_0^L x(1+x/L)\,dx = L^2/2 + L^2/3 = 5L^2/6" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="M = \lambda_0\int_0^L\!\!(1+x/L)\,dx = \lambda_0\cdot \tfrac{3L}{2}" variant="blue" />
        <FormulaBox latex="M = 2{,}00\cdot \tfrac{3\cdot 0{,}800}{2} = 2{,}40\ \text{kg}" variant="blue" />
        <FormulaBox latex="\boxed{M = 2{,}40\ \text{kg}}" variant="gold" />
        <FormulaBox latex="x_\text{cm} = \dfrac{\lambda_0}{M}\cdot\dfrac{5L^2}{6} = \dfrac{5L}{6}\cdot\dfrac{\lambda_0 L/2}{\lambda_0\cdot 3L/2}" variant="blue" />
        <FormulaBox latex="x_\text{cm} = \dfrac{5L}{9} = \dfrac{5\cdot 0{,}800}{9} \approx 0{,}444\ \text{m}" variant="blue" />
        <FormulaBox latex="\boxed{x_\text{cm}\approx 0{,}444\ \text{m}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        For kontinuerlig masse: <InlineLatex latex="x_\text{cm}=\tfrac1M\int x\,dm" /> der
        <InlineLatex latex="dm=\lambda\,dx" />. COM trekkes mot tettere ende, som her er <InlineLatex latex="x>L/2" />.
      </p>
    ),
  },

  // ==========================================================================
  // 8.92 — Problem: To biler møtes og kleber
  // ==========================================================================
  "8.92": {
    title: "To biler møter og kleber — vinkel etter",
    difficulty: "vanskelig",
    pageRef: "s. 295",
    problem: (
      <p>
        En 950{"\u00A0"}kg bil i 16,0{"\u00A0"}m/s nordover kolliderer i kryss med
        en 1900{"\u00A0"}kg varebil i 12,0{"\u00A0"}m/s østover. De kleber. Finn
        sluttfart og vinkel (fra øst, mot nord).
      </p>
    ),
    knowns: <p>som gitt.</p>,
    unknowns: <p>sluttvektor.</p>,
    strategy: <p>Helt uelastisk 2D: del totalmomentvektor på total masse.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>
          <InlineLatex latex="V_x = m_2 v_2/M" />, <InlineLatex latex="V_y = m_1 v_1/M" />.
        </p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="M = 950 + 1900 = 2850\ \text{kg}" variant="blue" />
        <FormulaBox latex="V_x = \dfrac{1900\cdot 12{,}0}{2850} = 8{,}00\ \text{m/s}" variant="blue" />
        <FormulaBox latex="V_y = \dfrac{950\cdot 16{,}0}{2850} = 5{,}333\ \text{m/s}" variant="blue" />
        <FormulaBox latex="V = \sqrt{8{,}00^2 + 5{,}333^2} \approx 9{,}61\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\theta = \arctan(5{,}333/8{,}00) \approx 33{,}7^\circ \text{ N av Ø}" variant="blue" />
        <FormulaBox latex="\boxed{V\approx 9{,}61\ \text{m/s, }33{,}7^\circ \text{ N av Ø}}" variant="gold" />
      </div>
    ),
    summary: <p>Helt uelastisk 2D: samme strategi uansett vinkler — del total vektor på total masse.</p>,
  },

  // ==========================================================================
  // 8.96 — Problem: Raketten ignite-ignite sekvens
  // ==========================================================================
  "8.96": {
    title: "To-trinns rakett: bestem sluttfart",
    difficulty: "vanskelig",
    pageRef: "s. 296",
    problem: (
      <p>
        En to-trinns rakett starter i ro. Trinn 1: brenner av 70% av total masse ved
        utløpsfart 2500{"\u00A0"}m/s. Deretter kobles det tomme skallet av (ingen
        endring i fart). Trinn 2: brenner av de siste 50% av gjenværende, også
        ved 2500{"\u00A0"}m/s. Finn sluttfart (ignorer tyngdekraft).
      </p>
    ),
    knowns: <p>to brennfaser, forholdstall oppgitt.</p>,
    unknowns: <p>sluttfart.</p>,
    strategy: (
      <p>
        Bruk Tsiolkovsky to ganger og summer <InlineLatex latex="\Delta v" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>La <InlineLatex latex="m_0=1" />. Etter trinn 1: masse = 0,30.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Etter å ha kastet skall: masse = 0,30 (antatt skall = 0). Etter trinn 2: 50% av 0,30 = 0,15.</p>,
      },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox latex="\Delta v_1 = 2500\ln(1/0{,}30) = 2500\ln(3{,}333) = 2500\cdot 1{,}204 \approx 3010\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\Delta v_2 = 2500\ln(0{,}30/0{,}15) = 2500\ln 2 \approx 1733\ \text{m/s}" variant="blue" />
        <FormulaBox latex="v_\text{slutt} = \Delta v_1 + \Delta v_2 \approx 3010 + 1733 = 4743\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{slutt} \approx 4{,}74\times 10^3\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Flertrinnsraketter kaster vekk strukturell masse mellom brennfaser. Slik
        opprettholder de høyt masseforhold for logaritmisk gevinst i Δv.
      </p>
    ),
  },
};
