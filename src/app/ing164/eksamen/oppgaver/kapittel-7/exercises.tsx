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
      <marker id="arrow-red-k7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 7
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 7.1 — Fjellklatrerens endring i gravitasjonsenergi
  // ==========================================================================
  "7.1": {
    title: "Endring i gravitasjonsenergi for fjellklatrer",
    difficulty: "lett",
    pageRef: "s. 255",
    problem: (
      <div className="space-y-2">
        <p>
          På én dag klatrer en fjellklatrer på 90 kg fra 1560 m-nivået på en vertikal fjellvegg opp
          til toppen på 2500 m. Neste dag klatrer hun ned fra toppen til foten av fjellveggen, som
          ligger på 1260 m. Hva er endringen hennes i gravitasjonsenergi (a) på den første dagen og
          (b) på den andre dagen?
        </p>
        <svg viewBox="0 0 300 220" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="50" y1="30" x2="50" y2="200" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="180" x2="60" y2="180" stroke="currentColor" strokeWidth="1.5" />
          <text x="70" y="34" fontSize="11" fill="currentColor">Topp: 2500 m</text>
          <text x="70" y="104" fontSize="11" fill="currentColor">Start dag 1: 1560 m</text>
          <text x="70" y="184" fontSize="11" fill="currentColor">Fot: 1260 m</text>
          <line x1="220" y1="100" x2="220" y2="30" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k7)" />
          <text x="226" y="70" fontSize="11" fill="#10b981">Dag 1: opp</text>
          <line x1="260" y1="30" x2="260" y2="180" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k7)" />
          <text x="200" y="210" fontSize="11" fill="#ef4444">Dag 2: ned</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 90\;\text{kg}" /></li>
        <li>Dag 1: <InlineLatex latex="y_1 = 1560\;\text{m}" />, <InlineLatex latex="y_2 = 2500\;\text{m}" /></li>
        <li>Dag 2: <InlineLatex latex="y_1 = 2500\;\text{m}" />, <InlineLatex latex="y_2 = 1260\;\text{m}" /></li>
        <li><InlineLatex latex="g = 9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Endring i gravitasjonsenergi <InlineLatex latex="\Delta U_\text{grav}" /> for dag 1 og dag 2</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Gravitasjonsenergi: <InlineLatex latex="U = mgy" />. Endring:{" "}
        <InlineLatex latex="\Delta U = mg\Delta y = mg(y_2 - y_1)" />. Positiv når man går opp,
        negativ når man går ned.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Endringen i gravitasjonell potensiell energi avhenger kun av endringen i høyde, ikke av
            banen. <InlineLatex latex="\Delta U = mg\Delta y" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Dag 1: <InlineLatex latex="\Delta y = +940\;\text{m}" />. Dag 2:{" "}
            <InlineLatex latex="\Delta y = -1240\;\text{m}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Dag 1 (opp fra 1560 m til 2500 m):</strong></p>
        <FormulaBox latex="\Delta y = 2500 - 1560 = 940\;\text{m}" variant="blue" />
        <FormulaBox latex="\Delta U_1 = mg\Delta y = (90)(9{,}80)(940) = 829\;080\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta U_1 \approx 8{,}29 \cdot 10^5\;\text{J} = 829\;\text{kJ}}" variant="gold" />
        <p><strong>Dag 2 (ned fra 2500 m til 1260 m):</strong></p>
        <FormulaBox latex="\Delta y = 1260 - 2500 = -1240\;\text{m}" variant="blue" />
        <FormulaBox latex="\Delta U_2 = (90)(9{,}80)(-1240) = -1\;093\;680\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta U_2 \approx -1{,}09 \cdot 10^6\;\text{J} = -1094\;\text{kJ}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Gravitasjonsenergi er <strong>baneuavhengig</strong> – bare start- og sluttposisjon i høyden
        teller. At hun starter og ender på forskjellige høyder dag 2 (starter på 2500, ender på 1260)
        betyr netto nedstigning på 1240 m, større enn oppstigningen på 940 m dag 1.
      </p>
    ),
  },

  // ==========================================================================
  // 7.5 — Tennisball kastet fra tak, energimetode
  // ==========================================================================
  "7.5": {
    title: "Tennisball kastet fra bygningstak",
    difficulty: "middels",
    pageRef: "s. 256",
    problem: (
      <div className="space-y-2">
        <p>
          En tennisball kastes fra taket av en 20,8 m høy bygning med en starthastighet på 11,5 m/s
          rettet 50,1° over horisontalen. (a) Hva er farten til ballen like før den treffer bakken?
          Bruk energimetoder og se bort fra luftmotstand. (b) Hva blir svaret i (a) hvis starthastigheten
          er rettet 50,1° <em>under</em> horisontalen? (c) Hvis luftmotstand tas med, vil (a) eller (b)
          gi høyest fart?
        </p>
        <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <rect x="40" y="30" width="60" height="140" fill="#e5e7eb" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="170" x2="280" y2="170" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100" y1="30" x2="160" y2="0" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k7)" />
          <text x="165" y="15" fontSize="11" fill="#10b981">v₀ = 11,5 m/s</text>
          <path d="M 100 30 Q 160 -5, 220 30 Q 260 70, 270 170" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="30" y1="170" x2="30" y2="30" stroke="#ef4444" strokeWidth="1.5" />
          <text x="5" y="100" fontSize="11" fill="#ef4444">20,8 m</text>
          <text x="110" y="45" fontSize="11" fill="currentColor">50,1°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="h = 20{,}8\;\text{m}" />, <InlineLatex latex="v_0 = 11{,}5\;\text{m/s}" /></li>
        <li>Vinkelen 50,1° (over eller under horisontalen)</li>
        <li>Ingen luftmotstand (i (a) og (b))</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Fart <InlineLatex latex="v" /> når ballen treffer bakken</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk energibevaring: <InlineLatex latex="K_1 + U_1 = K_2 + U_2" />. La bakken være nullpunkt
        for potensiell energi. Da er <InlineLatex latex="\tfrac12 m v_0^2 + mgh = \tfrac12 m v^2" />.
        Farten er uavhengig av retningen på starthastigheten!
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>Energibevaring: kinetisk + potensiell energi ved start = kinetisk energi ved bakken.</p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Løs for v: <InlineLatex latex="v = \sqrt{v_0^2 + 2gh}" />. Merk at retningen til{" "}
            <InlineLatex latex="v_0" /> ikke påvirker <InlineLatex latex="v_0^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Energibevaring uten luftmotstand</strong></p>
        <FormulaBox latex="\tfrac12 m v_0^2 + mgh = \tfrac12 m v^2" variant="blue" />
        <FormulaBox latex="v^2 = v_0^2 + 2gh = (11{,}5)^2 + 2(9{,}80)(20{,}8) = 132{,}25 + 407{,}68 = 539{,}93\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="v = \sqrt{539{,}93} = 23{,}2\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v = 23{,}2\;\text{m/s}}" variant="gold" />
        <p><strong>(b) Kastet ned i 50,1° under horisontalen</strong></p>
        <p className="text-sm">Energibevaring avhenger kun av <InlineLatex latex="v_0^2" />, ikke retning:</p>
        <FormulaBox latex="\boxed{v = 23{,}2\;\text{m/s}\;\;(\text{samme som (a)})}" variant="gold" />
        <p><strong>(c) Med luftmotstand</strong></p>
        <p className="text-sm">
          Ballen som kastes oppover (a) er lenger i luften og har lengre banelengde enn ballen kastet
          nedover (b). Luftmotstand fjerner mer energi i (a) enn i (b). Derfor gir{" "}
          <strong>(b) høyere fart</strong> når ballen treffer bakken.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Uten luftmotstand er farten ved bakken <strong>uavhengig av kastretning</strong> – det er bare
        starthøyden og startfarten som teller. Dette er en vakker demonstrasjon av energibevaringens
        kraft: vi trenger ikke løse bevegelsen i x og y hver for seg.
      </p>
    ),
  },

  // ==========================================================================
  // 7.9 — Stein i halvkuleformet bolle med friksjon
  // ==========================================================================
  "7.9": {
    title: "Stein i halvkuleformet bolle med friksjon",
    difficulty: "middels",
    pageRef: "s. 256",
    problem: (
      <div className="space-y-2">
        <p>
          En liten stein med masse 0,20 kg slippes fra ro i punkt A, som er i toppkanten av en stor
          halvkuleformet bolle med radius <InlineLatex latex="R = 0{,}50\;\text{m}" />. Anta at
          steinen er liten (partikkel) og glir (ikke ruller). Friksjonsarbeidet på steinen fra A til
          bunnpunktet B har tallverdi 0,22 J. (a) Hvor mye arbeid gjør (i) normalkraften og (ii)
          tyngdekraften på steinen fra A til B? (b) Hva er farten til steinen når den når B? (c) Av
          de tre kreftene som virker på steinen, hvilke er konstante? (d) Hva er normalkraften på
          steinen fra bollen når den akkurat når B?
        </p>
        <svg viewBox="0 0 300 180" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <path d="M 60 60 Q 150 200, 240 60" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="60" x2="240" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="5" fill="#ef4444" />
          <text x="40" y="55" fontSize="12" fill="#ef4444" fontWeight="bold">A</text>
          <circle cx="150" cy="150" r="5" fill="#10b981" />
          <text x="155" y="165" fontSize="12" fill="#10b981" fontWeight="bold">B</text>
          <line x1="150" y1="60" x2="150" y2="145" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="155" y="100" fontSize="11" fill="#3b82f6">R</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 0{,}20\;\text{kg}" />, <InlineLatex latex="R = 0{,}50\;\text{m}" /></li>
        <li><InlineLatex latex="|W_\text{frik}| = 0{,}22\;\text{J}" /> (friksjonen gjør negativt arbeid)</li>
        <li>Start fra ro (<InlineLatex latex="v_A = 0" />)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Arbeid fra normalkraft, tyngdekraft</li>
        <li>Fart i B og normalkraften i B</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Normalkraften står alltid vinkelrett på bevegelsen → gjør null arbeid.
        Tyngdearbeidet er <InlineLatex latex="W_g = mgR" /> (fallhøyde = R).
        Energisetningen: <InlineLatex latex="\tfrac12 m v_B^2 = W_g + W_\text{frik}" />.
        I B: sentripetalkraft <InlineLatex latex="N - mg = m v_B^2 / R" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>Normalkraften er vinkelrett på bevegelsen i hvert punkt langs bollen, så W_N = 0.</p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Tyngdearbeid:{" "}
            <InlineLatex latex="W_g = mg(y_A - y_B) = mgR" /> siden steinen faller en høyde R.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            I bunnpunktet B går steinen i en sirkelbane. Sentripetalkraft peker oppover:{" "}
            <InlineLatex latex="N - mg = m v_B^2 / R" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Arbeid fra hver kraft</strong></p>
        <p className="text-sm">(i) Normalkraften står vinkelrett på bevegelsen i alle punkter:</p>
        <FormulaBox latex="\boxed{W_N = 0}" variant="gold" />
        <p className="text-sm">(ii) Tyngdekraftens arbeid (fall R = 0,50 m):</p>
        <FormulaBox latex="W_g = mgR = (0{,}20)(9{,}80)(0{,}50) = 0{,}98\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_g = +0{,}98\;\text{J}}" variant="gold" />
        <p><strong>(b) Fart i B via energisetningen</strong></p>
        <FormulaBox latex="\tfrac12 m v_B^2 - 0 = W_g + W_\text{frik} = 0{,}98 - 0{,}22 = 0{,}76\;\text{J}" variant="blue" />
        <FormulaBox latex="v_B^2 = \frac{2(0{,}76)}{0{,}20} = 7{,}6\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v_B = 2{,}76\;\text{m/s}}" variant="gold" />
        <p><strong>(c) Hvilke krefter er konstante?</strong></p>
        <p className="text-sm">
          Tyngdekraften er konstant (både størrelse og retning). Normalkraften er IKKE konstant
          (retningen endrer seg langs bollen, størrelsen også). Friksjonskraften er heller ikke
          konstant (størrelsen avhenger av N, som varierer).
        </p>
        <p><strong>(d) Normalkraft i B (sirkelbevegelse)</strong></p>
        <FormulaBox latex="N - mg = \frac{m v_B^2}{R}" variant="blue" />
        <FormulaBox latex="N = m\left(g + \frac{v_B^2}{R}\right) = (0{,}20)\left(9{,}80 + \frac{7{,}6}{0{,}50}\right) = (0{,}20)(9{,}80 + 15{,}2)" variant="blue" />
        <FormulaBox latex="\boxed{N = (0{,}20)(25{,}0) = 5{,}0\;\text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Energisetningen gir: <InlineLatex latex="\Delta K = W_\text{total}" />. Normalkrefter som
        står vinkelrett på bevegelsen gjør null arbeid. Med friksjon er ikke mekanisk energi bevart
        – bruk <InlineLatex latex="K_A + U_A + W_\text{frik} = K_B + U_B" />. I bunnpunktet av
        en sirkelbane er N større enn mg for å gi sentripetalakselerasjon.
      </p>
    ),
  },

  // ==========================================================================
  // 7.12 — Tarzan svinger på vinranke
  // ==========================================================================
  "7.12": {
    title: "Tarzan svinger på vinranke",
    difficulty: "middels",
    pageRef: "s. 256",
    problem: (
      <div className="space-y-2">
        <p>
          Tarzan sikter på Jane i et annet tre. Han griper en vinranke med lengde 20 m som danner
          en vinkel på 45° med vertikalen, steger ut fra grenen og svinger ned og opp til Jane.
          Når han kommer fram, danner vinranken en vinkel på 30° med vertikalen. Regn ut Tarzans
          fart like før han når Jane, for å avgjøre om han gir henne en kjærlig klem eller slår henne
          av grenen. Se bort fra luftmotstand og vinrankens masse.
        </p>
        <svg viewBox="0 0 300 220" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="150" y1="30" x2="150" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="150" y1="30" x2="80" y2="150" stroke="#ef4444" strokeWidth="2" />
          <circle cx="80" cy="150" r="6" fill="#ef4444" />
          <text x="55" y="155" fontSize="11" fill="#ef4444" fontWeight="bold">Tarzan</text>
          <line x1="150" y1="30" x2="190" y2="195" stroke="#10b981" strokeWidth="2" />
          <circle cx="190" cy="195" r="6" fill="#10b981" />
          <text x="200" y="195" fontSize="11" fill="#10b981" fontWeight="bold">Jane</text>
          <text x="120" y="90" fontSize="10" fill="currentColor">45°</text>
          <text x="160" y="120" fontSize="10" fill="currentColor">30°</text>
          <path d="M 80 150 Q 150 230, 190 195" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="145" y="215" fontSize="11" fill="#3b82f6">L = 20 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="L = 20\;\text{m}" /> (lengde vinranke)</li>
        <li>Startvinkel <InlineLatex latex="\theta_1 = 45°" />, sluttvinkel <InlineLatex latex="\theta_2 = 30°" /> (begge fra vertikalen)</li>
        <li>Starter fra ro (<InlineLatex latex="v_1 = 0" />), uten luftmotstand</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Fart <InlineLatex latex="v_2" /> når han når Jane</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Strekkkrefta i vinranken virker vinkelrett på bevegelsen → gjør null arbeid. Mekanisk energi
        bevares. Finn høydeforskjellen mellom start og slutt ved hjelp av cosinus, og bruk{" "}
        <InlineLatex latex="\tfrac12 m v_2^2 = mg\Delta h" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Dersom øvre punkt (festepunktet) er referanse, er Tarzans høyde{" "}
            <InlineLatex latex="y = -L\cos\theta" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Høydeendring:{" "}
            <InlineLatex latex="\Delta h = L(\cos\theta_2 - \cos\theta_1)" /> fordi han er høyere ved
            Jane (30° fra vertikalen) enn ved start (45° fra vertikalen).
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            Energibevaring:{" "}
            <InlineLatex latex="\tfrac12 m v_2^2 = mgL(\cos\theta_2 - \cos\theta_1)" />, altså{" "}
            <InlineLatex latex="v_2 = \sqrt{2gL(\cos 30° - \cos 45°)}" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>Steg 1: Høydeforskjell</strong></p>
        <p className="text-sm">
          La festepunktet være referanse. Ved vinkel θ fra vertikalen er Tarzans høyde{" "}
          <InlineLatex latex="y = -L\cos\theta" /> (negativ, under festet).
        </p>
        <FormulaBox latex="\Delta h = y_2 - y_1 = -L\cos\theta_2 - (-L\cos\theta_1) = L(\cos\theta_1 - \cos\theta_2)" variant="blue" />
        <p className="text-sm">
          Tarzan er lavere ved slutt? Nei – ved sluttvinkel 30° er han høyere enn ved startvinkel 45°
          (siden cos 30° &gt; cos 45°, <InlineLatex latex="-L\cos\theta" /> blir mer negativ ved 30°).
          La oss regne Δh = y(slutt) − y(start):
        </p>
        <FormulaBox latex="\Delta h = -L\cos 30° - (-L\cos 45°) = -L(\cos 30° - \cos 45°) < 0" variant="blue" />
        <p className="text-sm">Altså stiger Tarzan. Fallhøyden er negativ. Vi skriver stigningen som h:</p>
        <FormulaBox latex="h = L(\cos 30° - \cos 45°) = 20(0{,}8660 - 0{,}7071) = 20(0{,}1589) = 3{,}178\;\text{m}" variant="blue" />
        <p><strong>Steg 2: Energibevaring</strong></p>
        <FormulaBox latex="K_1 + U_1 = K_2 + U_2 \;\Rightarrow\; 0 + 0 = \tfrac12 m v_2^2 + mgh" variant="blue" />
        <p className="text-sm">Det gir negativ <InlineLatex latex="v_2^2" /> – som betyr at han ikke rekker så langt opp. Sjekk oppgaveteksten:</p>
        <p className="text-sm">
          Her antar vi at 45° er startvinkel (høyere posisjon) og at han svinger ned og så opp igjen
          til 30° (lavere). Da er Tarzan LAVERE ved Jane. Faktisk: ved 45° fra vertikal er han lavere
          enn ved 30° (fordi cos 45° &lt; cos 30°). Men tenk over det geometrisk: hvis vinranken er
          helt vertikal (0°), henger han rett under festet – dette er det laveste punktet. Så 45° gir
          høyere posisjon enn 30°. Men 45° er starten (høyest), og 30° er slutten...
        </p>
        <p className="text-sm">
          Hvis han svinger FRA 45° TIL 30° (dvs. fra høyere til lavere vinkel), så ender han lavere enn
          han startet. Da faller han: <InlineLatex latex="\Delta h = L(\cos 30° - \cos 45°) = 3{,}178\;\text{m}" />{" "}
          (Tarzan synker denne avstanden).
        </p>
        <FormulaBox latex="\tfrac12 m v_2^2 = mgh \;\Rightarrow\; v_2 = \sqrt{2gh}" variant="blue" />
        <FormulaBox latex="v_2 = \sqrt{2(9{,}80)(3{,}178)} = \sqrt{62{,}29} = 7{,}89\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_2 \approx 7{,}9\;\text{m/s}}" variant="gold" />
        <p className="text-sm">
          7,9 m/s ≈ 28 km/t. Det er nok til å banke Jane av grenen! (En stygg klem.)
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Tauet/vinranken gjør null arbeid (alltid vinkelrett på bevegelsen), så mekanisk energi er
        bevart. Høydeforskjellen for en pendel fra vertikal vinkel θ er{" "}
        <InlineLatex latex="L(1 - \cos\theta)" /> under festepunktet. For å sammenligne to vinkler:{" "}
        <InlineLatex latex="\Delta h = L(\cos\theta_\text{ned} - \cos\theta_\text{opp})" />.
      </p>
    ),
  },

  // ==========================================================================
  // 7.13 — Atwoods maskin (to klosser og trinse)
  // ==========================================================================
  "7.13": {
    title: "Atwoods maskin — to klosser og trinse",
    difficulty: "middels",
    pageRef: "s. 256",
    problem: (
      <div className="space-y-2">
        <p>
          To klosser er festet til hver ende av en lett tau som går over en lett, friksjonsfri trinse.
          Den ene klossen har masse 8,00 kg og den andre 6,00 kg. Klossene slippes fra ro.
          (a) For en 0,200 m nedadgående bevegelse av den 8,00 kg tunge klossen, hva er endringen i
          gravitasjonsenergi for hver kloss? (b) Hvis strekkkraft i tauet er T, hvor mye arbeid gjør
          tauet på hver kloss? (c) Bruk energibevaring på systemet med begge klossene. Hva er totalt
          arbeid fra strekkkraften? Hva er endringen i total gravitasjonsenergi? Finn farten til den
          8,00 kg tunge klossen etter at den har falt 0,200 m.
        </p>
        <svg viewBox="0 0 300 220" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <circle cx="150" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="135" y1="40" x2="100" y2="120" stroke="currentColor" strokeWidth="1" />
          <line x1="165" y1="40" x2="200" y2="120" stroke="currentColor" strokeWidth="1" />
          <rect x="85" y="120" width="30" height="30" fill="#3b82f6" />
          <text x="95" y="140" fontSize="10" fill="white">8 kg</text>
          <rect x="185" y="120" width="30" height="30" fill="#10b981" />
          <text x="195" y="140" fontSize="10" fill="white">6 kg</text>
          <line x1="100" y1="155" x2="100" y2="180" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k7)" />
          <text x="40" y="175" fontSize="10" fill="#ef4444">ned 0,200 m</text>
          <line x1="200" y1="120" x2="200" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k7)" />
          <text x="215" y="100" fontSize="10" fill="#10b981">opp 0,200 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m_1 = 8{,}00\;\text{kg}" />, <InlineLatex latex="m_2 = 6{,}00\;\text{kg}" /></li>
        <li>Forskyvning <InlineLatex latex="d = 0{,}200\;\text{m}" /> (1 går ned, 2 går opp samme distanse)</li>
        <li>Start fra ro; lett tau, lett friksjonsfri trinse</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Endring i U for hver kloss</li>
        <li>Arbeid fra tau på hver kloss</li>
        <li>Fart <InlineLatex latex="v" /> etter 0,200 m</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Tau og trinse er lette og friksjonsfri → samme strekkkraft T på begge sider. Begge klossene har
        samme fart til enhver tid (tauet er strekkfast). Totalarbeidet fra tauet på systemet er null
        (intern kraft). Bruk energibevaring: <InlineLatex latex="K_f = -\Delta U" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Kloss 1 (8 kg) faller 0,200 m: <InlineLatex latex="\Delta U_1 = -m_1 g d" />. Kloss 2 (6 kg)
            løftes 0,200 m: <InlineLatex latex="\Delta U_2 = +m_2 g d" />.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Tau gjør arbeid <InlineLatex latex="W_{T,1} = -Td" /> på kloss 1 (motsatt rettning) og{" "}
            <InlineLatex latex="W_{T,2} = +Td" /> på kloss 2. Sum = 0.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            Systemets samlede kinetiske energi: <InlineLatex latex="K = \tfrac12 (m_1 + m_2) v^2" />.
            Sett inn i <InlineLatex latex="K_f - K_i = -\Delta U" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Endring i gravitasjonsenergi for hver kloss</strong></p>
        <FormulaBox latex="\Delta U_1 = m_1 g \Delta y_1 = (8{,}00)(9{,}80)(-0{,}200) = -15{,}68\;\text{J}" variant="blue" />
        <FormulaBox latex="\Delta U_2 = m_2 g \Delta y_2 = (6{,}00)(9{,}80)(+0{,}200) = +11{,}76\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta U_1 = -15{,}68\;\text{J},\;\Delta U_2 = +11{,}76\;\text{J}}" variant="gold" />
        <p><strong>(b) Arbeid fra tau på hver kloss</strong></p>
        <p className="text-sm">Tauet drar kloss 1 oppover (motsatt bevegelsesretning): <InlineLatex latex="W_{T,1} = -Td" />.</p>
        <p className="text-sm">Tauet drar kloss 2 oppover (samme bevegelsesretning): <InlineLatex latex="W_{T,2} = +Td" />.</p>
        <FormulaBox latex="\boxed{W_{T,1} = -T(0{,}200),\;W_{T,2} = +T(0{,}200)}" variant="gold" />
        <p><strong>(c) Totalarbeid fra tau + energibevaring</strong></p>
        <FormulaBox latex="W_\text{T,tot} = W_{T,1} + W_{T,2} = -Td + Td = 0" variant="blue" />
        <p className="text-sm">Total endring i U:</p>
        <FormulaBox latex="\Delta U_\text{tot} = \Delta U_1 + \Delta U_2 = -15{,}68 + 11{,}76 = -3{,}92\;\text{J}" variant="blue" />
        <p className="text-sm">Energibevaring: K_f − K_i = W_ikke_konservativ + (−ΔU). Her er W_tau = 0:</p>
        <FormulaBox latex="\tfrac12 (m_1 + m_2) v^2 - 0 = -\Delta U_\text{tot} = 3{,}92\;\text{J}" variant="blue" />
        <FormulaBox latex="v^2 = \frac{2(3{,}92)}{14{,}0} = 0{,}560\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v = 0{,}748\;\text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        For systemer koblet med lett tau og friksjonsfri trinse: tauet gjør like mye positivt arbeid
        på den ene klossen som negativt arbeid på den andre – netto null. Bare gravitasjonen endrer
        systemets energi. Bruk det samlede systemet med total masse{" "}
        <InlineLatex latex="(m_1 + m_2)" /> i kinetisk energi.
      </p>
    ),
  },

  // ==========================================================================
  // 7.37 — Betongbøtte, kasse og grus med friksjon
  // ==========================================================================
  "7.37": {
    title: "Betongbøtte, kasse og grus med friksjon",
    difficulty: "vanskelig",
    pageRef: "s. 259",
    problem: (
      <div className="space-y-2">
        <p>
          På en byggeplass henger en 67,0 kg betongbøtte fra en lett kabel som går over en lett,
          friksjonsfri trinse og er koblet til en 82,0 kg kasse på et horisontalt tak. Kabelen drar
          horisontalt på kassen, og en 45,0 kg sekk med grus ligger på kassen. Friksjonstallene
          mellom kassen og taket er <InlineLatex latex="\mu_s = 0{,}700" /> og{" "}
          <InlineLatex latex="\mu_k = 0{,}400" />. (a) Finn friksjonskrafta på grussekken og på kassen.
          (b) Plutselig tar en arbeider opp grussekken. Bruk energibevaring til å finne farten til
          bøtta etter at den har sunket 1,60 m fra ro.
        </p>
        <svg viewBox="0 0 320 220" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <rect x="40" y="80" width="120" height="8" fill="#9ca3af" />
          <rect x="70" y="50" width="60" height="30" fill="#3b82f6" />
          <text x="80" y="70" fontSize="10" fill="white">Kasse</text>
          <rect x="80" y="25" width="40" height="25" fill="#f59e0b" />
          <text x="83" y="42" fontSize="9" fill="white">Grus</text>
          <circle cx="180" cy="80" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="65" x2="170" y2="75" stroke="currentColor" strokeWidth="1" />
          <line x1="188" y1="85" x2="220" y2="140" stroke="currentColor" strokeWidth="1" />
          <rect x="200" y="140" width="40" height="50" fill="#6b7280" />
          <text x="203" y="170" fontSize="10" fill="white">Bøtte</text>
          <line x1="220" y1="195" x2="220" y2="215" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k7)" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Bøtte: <InlineLatex latex="m_b = 67{,}0\;\text{kg}" /></li>
        <li>Kasse: <InlineLatex latex="m_k = 82{,}0\;\text{kg}" /></li>
        <li>Grus: <InlineLatex latex="m_g = 45{,}0\;\text{kg}" /></li>
        <li><InlineLatex latex="\mu_s = 0{,}700" />, <InlineLatex latex="\mu_k = 0{,}400" /></li>
        <li>(b): grus fjernes, bøtte synker <InlineLatex latex="d = 1{,}60\;\text{m}" /> fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Friksjonskraft på grus, friksjonskraft på kasse</li>
        <li>(b) Farten til bøtta etter 1,60 m</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        (a) Med grus på plass: systemet er i ro. Drag-kraften T = bøttas vekt = 67·9,80 = 656,6 N.
        Sjekk om statisk friksjon holder kassen. Grussekken ligger på kassen → ingen relativ
        bevegelse → friksjonen der er statisk og akkurat 0 (ingen horisontal kraft på grussekken).
        (b) Uten grus: bruk energibevaring. Kinematisk friksjon virker på kassen med{" "}
        <InlineLatex latex="f_k = \mu_k N_\text{kasse} = \mu_k m_k g" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            (a) Før grus fjernes: systemet er statisk. Grussekken har ingen horisontal kraft på seg
            (ingen drag) → friksjonen på grussekken er 0. Kassen holdes i ro av statisk friksjon fra
            taket.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            (b) Etter at grus er fjernet, blir systemet ubalansert. Bruk energibevaring for bøtte +
            kasse:{" "}
            <InlineLatex latex="m_b g d - f_k d = \tfrac12 (m_b + m_k) v^2" />.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            Normalkraft på kasse fra taket etter at grus er fjernet:{" "}
            <InlineLatex latex="N = m_k g" />, så <InlineLatex latex="f_k = \mu_k m_k g" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Friksjon mens alt er i ro</strong></p>
        <p className="text-sm">
          Bøtta henger i ro, så T = m_b g = (67,0)(9,80) = 656,6 N. Denne trekker horisontalt på
          kassen. Grussekken har ingen horisontale krefter på seg (den ligger bare oppå), så
          friksjonskraften på grussekken er:
        </p>
        <FormulaBox latex="\boxed{f_\text{grus} = 0\;\text{N}}" variant="gold" />
        <p className="text-sm">
          Kassen holder seg i ro via statisk friksjon fra taket. Normalkraften på kassen fra taket
          er vekten av kasse + grus:
        </p>
        <FormulaBox latex="N = (m_k + m_g) g = (82{,}0 + 45{,}0)(9{,}80) = 1244{,}6\;\text{N}" variant="blue" />
        <FormulaBox latex="f_{s,\max} = \mu_s N = (0{,}700)(1244{,}6) = 871{,}2\;\text{N}" variant="blue" />
        <p className="text-sm">
          Siden 656,6 N &lt; 871,2 N, holder statisk friksjon. Faktisk friksjon = 656,6 N (akkurat
          like stor som tauspenningen for å holde kassen i ro):
        </p>
        <FormulaBox latex="\boxed{f_\text{kasse} = 656{,}6\;\text{N}\;(\text{statisk, rettet mot tau})}" variant="gold" />
        <p><strong>(b) Fart etter at grus er fjernet</strong></p>
        <p className="text-sm">Ny normalkraft på kassen er bare m_k g. Kinetisk friksjonskraft:</p>
        <FormulaBox latex="f_k = \mu_k m_k g = (0{,}400)(82{,}0)(9{,}80) = 321{,}4\;\text{N}" variant="blue" />
        <p className="text-sm">
          Sjekk om bøttas vekt nå er større: 656,6 N &gt; 321,4 N ✓ (akselererer).
          Energibevaring (bøtte faller d = 1,60 m, kasse glir 1,60 m):
        </p>
        <FormulaBox latex="m_b g d - f_k d = \tfrac12 (m_b + m_k) v^2" variant="blue" />
        <FormulaBox latex="(67{,}0)(9{,}80)(1{,}60) - (321{,}4)(1{,}60) = \tfrac12 (149{,}0) v^2" variant="blue" />
        <FormulaBox latex="1050{,}6 - 514{,}3 = 74{,}5\, v^2 \;\Rightarrow\; 536{,}3 = 74{,}5\, v^2" variant="blue" />
        <FormulaBox latex="v^2 = 7{,}199\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v = 2{,}68\;\text{m/s}}" variant="gold" />
        <p className="text-sm text-[var(--muted)]">
          Kontroll med Newton: <InlineLatex latex="a = (m_b g - f_k)/(m_b + m_k) = 2{,}25\;\text{m/s}^2" />.
          Så <InlineLatex latex="v^2 = 2 a d = 2(2{,}25)(1{,}60) = 7{,}20" />, <InlineLatex latex="v = 2{,}68\;\text{m/s}" />. ✓
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Statisk friksjon leverer akkurat så mye kraft som trengs for å holde ting i ro – opp til{" "}
        <InlineLatex latex="\mu_s N" />. Når det begynner å bevege, gjelder kinetisk friksjon. Ved å
        behandle koblede systemer som én enhet med total masse forenkles energiregnskapet.
      </p>
    ),
  },

  // ==========================================================================
  // 7.54 — Skiløper, friksjon og snødrive
  // ==========================================================================
  "7.54": {
    title: "Skiløper med friksjon, snøpute og snødrive",
    difficulty: "vanskelig",
    pageRef: "s. 261",
    problem: (
      <div className="space-y-2">
        <p>
          En 60,0 kg skiløper starter fra ro på toppen av en 63,0 m høy skibakke. (a) Hvis friksjons­
          krefter gjør <InlineLatex latex="-10{,}9\;\text{kJ}" /> arbeid på henne under nedstigningen,
          hvor fort beveger hun seg i bunnen? (b) Nå horisontalt, krysser hun et område med bløt snø
          hvor <InlineLatex latex="\mu_k = 0{,}21" />. Hvis området er 65,0 m bredt og gjennomsnittlig
          luftmotstand er 180 N, hvor fort beveger hun seg etter å ha krysset området? (c) Hun
          treffer en snødrive og trenger 3,0 m inn i den før hun stopper. Hva er gjennomsnittlig kraft
          snødriven utøver på henne?
        </p>
        <svg viewBox="0 0 340 180" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <path d="M 10 30 Q 80 30, 140 100 L 340 100" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="140" y1="100" x2="205" y2="100" stroke="#f59e0b" strokeWidth="5" />
          <text x="155" y="95" fontSize="10" fill="#f59e0b">bløt snø 65 m</text>
          <rect x="280" y="75" width="30" height="25" fill="#6b7280" />
          <text x="275" y="115" fontSize="10" fill="#6b7280">snødrive</text>
          <line x1="10" y1="30" x2="10" y2="100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
          <text x="15" y="70" fontSize="10" fill="#3b82f6">63 m</text>
          <circle cx="20" cy="30" r="5" fill="#ef4444" />
          <text x="5" y="20" fontSize="10" fill="#ef4444">start</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><InlineLatex latex="m = 60{,}0\;\text{kg}" />, <InlineLatex latex="h = 63{,}0\;\text{m}" /></li>
        <li><InlineLatex latex="W_\text{frik,bakke} = -10{,}9\;\text{kJ}" /></li>
        <li>Bløt snø: <InlineLatex latex="\mu_k = 0{,}21" />, bredde 65,0 m, luftmotstand 180 N</li>
        <li>Snødrive: gjennomtrenger 3,0 m før full stopp</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>(a) Fart i bunnen av bakken</li>
        <li>(b) Fart etter bløt snø</li>
        <li>(c) Gjennomsnittlig kraft fra snødriven</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk arbeid-energi-teoremet i tre trinn. (a) Energibevaring på bakken med friksjonstap.
        (b) Horisontalt: arbeidet fra kinetisk friksjon og luftmotstand reduserer K. (c) Snødriven
        stopper henne over 3 m: <InlineLatex latex="W_\text{drive} = -\tfrac12 m v^2" />.
      </p>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            (a): <InlineLatex latex="\tfrac12 m v_1^2 = mgh + W_\text{frik,bakke}" />. Pass på
            fortegn: W_frik er negativt.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            (b): Friksjon på bløt snø: <InlineLatex latex="f_k = \mu_k m g" />. Kombinert med luft:{" "}
            <InlineLatex latex="W_\text{totalt,b} = -(f_k + F_\text{luft}) \cdot 65" />.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            (c): All gjenværende kinetisk energi absorberes av snødriven over 3 m:{" "}
            <InlineLatex latex="F_\text{drive} \cdot 3{,}0 = \tfrac12 m v_2^2" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-3">
        <p><strong>(a) Fart i bunnen av bakken</strong></p>
        <FormulaBox latex="\tfrac12 m v_1^2 - 0 = mgh + W_\text{frik}" variant="blue" />
        <FormulaBox latex="\tfrac12 (60{,}0) v_1^2 = (60{,}0)(9{,}80)(63{,}0) + (-10\;900)" variant="blue" />
        <FormulaBox latex="30\, v_1^2 = 37\;044 - 10\;900 = 26\;144\;\text{J}" variant="blue" />
        <FormulaBox latex="v_1^2 = 871{,}5\;\text{m}^2/\text{s}^2 \;\Rightarrow\; v_1 = 29{,}5\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_1 = 29{,}5\;\text{m/s}}" variant="gold" />
        <p><strong>(b) Fart etter bløt snø (65 m)</strong></p>
        <FormulaBox latex="f_k = \mu_k m g = (0{,}21)(60{,}0)(9{,}80) = 123{,}5\;\text{N}" variant="blue" />
        <FormulaBox latex="F_\text{motstand} = f_k + F_\text{luft} = 123{,}5 + 180 = 303{,}5\;\text{N}" variant="blue" />
        <FormulaBox latex="W_\text{mot} = -(303{,}5)(65{,}0) = -19\;728\;\text{J}" variant="blue" />
        <FormulaBox latex="\tfrac12 m v_2^2 = \tfrac12 m v_1^2 + W_\text{mot} = 26\;144 - 19\;728 = 6416\;\text{J}" variant="blue" />
        <FormulaBox latex="v_2^2 = \frac{2(6416)}{60{,}0} = 213{,}9\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v_2 = 14{,}6\;\text{m/s}}" variant="gold" />
        <p><strong>(c) Kraft fra snødrive over 3,0 m</strong></p>
        <FormulaBox latex="F_\text{drive} \cdot 3{,}0 = \tfrac12 m v_2^2 = 6416\;\text{J}" variant="blue" />
        <FormulaBox latex="F_\text{drive} = \frac{6416}{3{,}0} = 2139\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{drive} \approx 2{,}14\;\text{kN}}" variant="gold" />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Arbeid-energi-teoremet er kraftig for multi-segment problemer: del opp banen og bruk{" "}
        <InlineLatex latex="K_f - K_i = W_\text{tot}" /> i hvert segment. Friksjon og luftmotstand er
        ikke-konservative krefter som tapper mekanisk energi; snødriven absorberer det som er igjen.
      </p>
    ),
  },
};
