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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Tyngdekraften nær jordoverflaten er en{" "}
          <em>konservativ</em> kraft: arbeidet den gjør avhenger bare av start- og
          sluttpunkt, ikke av banen. Derfor kan vi definere en potensiell energi
          (gravitasjonsenergi) <InlineLatex latex="U_g = mgy" /> hvor{" "}
          <InlineLatex latex="y" /> er høyden over et fritt valgt referansenivå.
          Endringen mellom to høyder er dermed baneuavhengig og gis av:
        </p>
        <FormulaBox latex="\Delta U_\text{grav} = U_2 - U_1 = mgy_2 - mgy_1 = mg\,\Delta y" variant="blue" />
        <p>
          <strong>Hvorfor er dette så nyttig?</strong> Det betyr at vi ikke trenger
          å bry oss om den faktiske stien i fjellveggen — bare høydeforskjellen
          <InlineLatex latex="\Delta y = y_2 - y_1" /> teller. Positiv{" "}
          <InlineLatex latex="\Delta y" /> (man går opp) gir positiv
          <InlineLatex latex="\Delta U" /> (energi må tilføres), negativ{" "}
          <InlineLatex latex="\Delta y" /> gir negativ <InlineLatex latex="\Delta U" />.
        </p>
        <p><strong>Dag 1 (opp fra 1560 m til 2500 m):</strong></p>
        <p>
          Vi bruker formelen direkte med gitte høyder. Legg merke til at
          referansenivået er helt irrelevant — det forsvinner når vi tar
          differansen <InlineLatex latex="y_2 - y_1" />.
        </p>
        <FormulaBox latex="\Delta y = y_2 - y_1 = 2500 - 1560 = 940\;\text{m}" variant="blue" />
        <FormulaBox latex="\Delta U_1 = mg\Delta y = (90)(9{,}80)(940) = 829\;080\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta U_1 \approx 8{,}29 \cdot 10^5\;\text{J} = 829\;\text{kJ}}" variant="gold" />
        <p>
          Positivt tegn: klatreren får mer potensiell energi lagret i kroppen
          (hun har utført mekanisk arbeid mot tyngdekraften).
        </p>
        <p><strong>Dag 2 (ned fra 2500 m til 1260 m):</strong></p>
        <p>
          Samme formel, men nå er <InlineLatex latex="y_2 < y_1" />, så{" "}
          <InlineLatex latex="\Delta y" /> blir negativ:
        </p>
        <FormulaBox latex="\Delta y = y_2 - y_1 = 1260 - 2500 = -1240\;\text{m}" variant="blue" />
        <FormulaBox latex="\Delta U_2 = mg\Delta y = (90)(9{,}80)(-1240) = -1\;093\;680\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta U_2 \approx -1{,}09 \cdot 10^6\;\text{J} = -1094\;\text{kJ}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Negativt fortegn betyr at systemet
          <em> mister</em> potensiell energi — den frigjøres til andre energiformer
          (kinetisk hvis hun faller fritt, eller varme via friksjon i klatreutstyret,
          musklene osv.). Merk også at |ΔU₂| &gt; |ΔU₁| fordi nedstigningen dag 2
          (1240 m) er lengre enn oppstigningen dag 1 (940 m).
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Uten luftmotstand er den eneste krafta som gjør
          arbeid på ballen tyngdekraften, som er konservativ. Da er mekanisk energi
          <InlineLatex latex="E = K + U" /> bevart mellom to vilkårlige punkter på
          banen. Grunnprinsippet:
        </p>
        <FormulaBox latex="K_1 + U_1 = K_2 + U_2" variant="blue" />
        <p>
          <strong>(a) Energibevaring uten luftmotstand</strong>
        </p>
        <p>
          Velg bakken som nullnivå: <InlineLatex latex="U = 0" /> ved{" "}
          <InlineLatex latex="y = 0" />. Da er <InlineLatex latex="U_1 = mgh" />{" "}
          (ballen starter på taket, høyde h) og <InlineLatex latex="U_2 = 0" /> (ved
          bakken). Kinetisk energi: <InlineLatex latex="K_1 = \tfrac12 m v_0^2" />{" "}
          og <InlineLatex latex="K_2 = \tfrac12 m v^2" />. Sett inn i
          energibevaringen:
        </p>
        <FormulaBox latex="\tfrac12 m v_0^2 + mgh = \tfrac12 m v^2 + 0" variant="blue" />
        <p>
          <strong>Algebraisk omforming:</strong> Massen <InlineLatex latex="m" />{" "}
          faller ut (del begge sider på <InlineLatex latex="\tfrac12 m" />), og vi
          løser for <InlineLatex latex="v" />:
        </p>
        <FormulaBox latex="v^2 = v_0^2 + 2gh \;\Rightarrow\; v = \sqrt{v_0^2 + 2gh}" variant="blue" />
        <p>
          Legg merke til: <InlineLatex latex="v_0^2" /> avhenger bare av{" "}
          <em>størrelsen</em> på startfarten, ikke retningen. Dette er nøkkelen til
          (b). Sett inn tall:
        </p>
        <FormulaBox latex="v^2 = (11{,}5)^2 + 2(9{,}80)(20{,}8) = 132{,}25 + 407{,}68 = 539{,}93\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="v = \sqrt{539{,}93} = 23{,}2\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v = 23{,}2\;\text{m/s}}" variant="gold" />
        <p><strong>(b) Kastet ned i 50,1° under horisontalen</strong></p>
        <p>
          Siden <InlineLatex latex="v_0^2" /> er uavhengig av retningen på
          starthastigheten (<InlineLatex latex="|\vec{v}_0|^2 = v_{0x}^2 + v_{0y}^2" />{" "}
          er det samme uansett fortegn på <InlineLatex latex="v_{0y}" />), gir
          energimetoden nøyaktig samme svar:
        </p>
        <FormulaBox latex="\boxed{v = 23{,}2\;\text{m/s}\;\;(\text{samme som (a)})}" variant="gold" />
        <p>
          Dette er en vakker demonstrasjon av hvor mektig energibevaring er: vi slipper
          å spalte opp bevegelsen i x- og y-komponenter og løse bevegelsesligninger.
        </p>
        <p><strong>(c) Med luftmotstand</strong></p>
        <p>
          Luftmotstand er en <em>ikke-konservativ</em> kraft som alltid peker motsatt
          bevegelsesretningen. Den gjør negativt arbeid{" "}
          <InlineLatex latex="W_\text{luft} < 0" />, proporsjonalt med banelengden.
          Da gjelder:
        </p>
        <FormulaBox latex="K_1 + U_1 + W_\text{luft} = K_2 + U_2" variant="blue" />
        <p>
          Ballen som kastes oppover (a) stiger først og faller så — lengre total
          banelengde og lengre tid i lufta. Ballen som kastes nedover (b) har kortere
          banelengde. Derfor taper (a) mer energi til luftmotstand, og{" "}
          <strong>(b) gir høyest sluttfart</strong>.
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori — arbeid-energi-teoremet med friksjon:</strong> Kinetisk
          friksjon er ikke-konservativ, så mekanisk energi er ikke bevart.
          Det generelle arbeid-energi-teoremet sier likevel at summen av
          <em> alt</em> arbeid på objektet er lik endring i kinetisk energi:
        </p>
        <FormulaBox latex="W_\text{tot} = W_N + W_g + W_\text{frik} = \Delta K = \tfrac12 m v_B^2 - \tfrac12 m v_A^2" variant="blue" />
        <p>
          <strong>(a) Arbeid fra hver kraft</strong>
        </p>
        <p>
          <strong>(i) Normalkraft:</strong> Normalkrafta står definisjonsmessig
          vinkelrett på overflaten og dermed på hastigheten. Når{" "}
          <InlineLatex latex="\vec{F} \perp \vec{v}" /> er{" "}
          <InlineLatex latex="\vec{F}\cdot\vec{v} = 0" />, så krafta leverer null
          effekt — og null arbeid uansett bane:
        </p>
        <FormulaBox latex="W_N = \int \vec{F}_N \cdot d\vec{r} = 0" variant="blue" />
        <FormulaBox latex="\boxed{W_N = 0}" variant="gold" />
        <p>
          <strong>(ii) Tyngdekraft:</strong> Siden tyngdekrafta er konservativ, er
          <InlineLatex latex="W_g = -\Delta U_g = -(U_B - U_A) = mg(y_A - y_B)" />.
          Steinen faller en høyde R (fra bollekanten til bunnen), så:
        </p>
        <FormulaBox latex="W_g = mg(y_A - y_B) = mgR = (0{,}20)(9{,}80)(0{,}50) = 0{,}98\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{W_g = +0{,}98\;\text{J}}" variant="gold" />
        <p>
          Legg merke til at vi ikke trengte å integrere langs den buede banen —
          konservativitet gjør at vi bare trenger høydeforskjellen.
        </p>
        <p><strong>(b) Fart i B via arbeid-energi-teoremet</strong></p>
        <p>
          Vi setter inn alle tre arbeidene. Friksjonsarbeidet er gitt som 0,22 J i
          tallverdi, men friksjon peker alltid motsatt bevegelsen, så{" "}
          <InlineLatex latex="W_\text{frik} = -0{,}22\;\text{J}" />. Siden
          <InlineLatex latex="v_A = 0" /> er <InlineLatex latex="K_A = 0" />:
        </p>
        <FormulaBox latex="\tfrac12 m v_B^2 - 0 = W_N + W_g + W_\text{frik} = 0 + 0{,}98 - 0{,}22 = 0{,}76\;\text{J}" variant="blue" />
        <p>Løs for <InlineLatex latex="v_B" />:</p>
        <FormulaBox latex="v_B^2 = \frac{2(0{,}76)}{0{,}20} = 7{,}6\;\text{m}^2/\text{s}^2 \;\Rightarrow\; v_B = \sqrt{7{,}6}" variant="blue" />
        <FormulaBox latex="\boxed{v_B = 2{,}76\;\text{m/s}}" variant="gold" />
        <p>
          <strong>Kontroll:</strong> Uten friksjon ville{" "}
          <InlineLatex latex="v_B = \sqrt{2gR} = \sqrt{9{,}8} = 3{,}13\;\text{m/s}" />.
          Med friksjon er svaret lavere — det stemmer med intuisjonen.
        </p>
        <p><strong>(c) Hvilke krefter er konstante?</strong></p>
        <p>
          <strong>Tyngdekraft:</strong> konstant i både størrelse (<InlineLatex latex="mg" />) og
          retning (loddrett ned). <strong>Normalkraft:</strong> IKKE konstant —
          retningen peker alltid mot bollens sentrum, og endrer seg dermed kontinuerlig
          mens steinen glir; størrelsen varierer også fordi farten (og dermed
          sentripetalkraft-behovet) endres. <strong>Friksjon:</strong> IKKE
          konstant — <InlineLatex latex="f_k = \mu_k N" />, og N varierer.
        </p>
        <p><strong>(d) Normalkraft i B (sirkelbevegelse)</strong></p>
        <p>
          I bunnen av bollen beveger steinen seg på en sirkulær bane med radius R.
          Netto kraft må peke mot sentrum (oppover i B) og gi sentripetalakselerasjonen
          <InlineLatex latex="a_c = v_B^2 / R" />. Newtons 2. lov i radiell
          retning:
        </p>
        <FormulaBox latex="\sum F_\text{radiell} = ma_c \;\Rightarrow\; N - mg = \frac{m v_B^2}{R}" variant="blue" />
        <p>Løs for N:</p>
        <FormulaBox latex="N = m\left(g + \frac{v_B^2}{R}\right) = (0{,}20)\left(9{,}80 + \frac{7{,}6}{0{,}50}\right) = (0{,}20)(9{,}80 + 15{,}2)" variant="blue" />
        <FormulaBox latex="\boxed{N = (0{,}20)(25{,}0) = 5{,}0\;\text{N}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> N er betydelig større enn vekten{" "}
          <InlineLatex latex="mg = 1{,}96\;\text{N}" />. Ekstra krafta (≈3 N) er
          akkurat det som trengs for å få steinen til å «svinge inn i sirkelbanen»
          i bunnpunktet. Det er derfor det kjennes tungt når du er på bunnen av et
          pariserhjul.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Vinranken trekker alltid Tarzan mot festepunktet,
          dvs. vinkelrett på bevegelsen (som alltid er tangent til sirkelen med
          radius L). En kraft vinkelrett på hastigheten gjør null arbeid:{" "}
          <InlineLatex latex="W_T = \int \vec{T}\cdot d\vec{r} = 0" />. Da er kun
          tyngdekrafta (konservativ) som gjør arbeid, og mekanisk energi er bevart:
        </p>
        <FormulaBox latex="K_1 + U_1 = K_2 + U_2" variant="blue" />
        <p><strong>Steg 1: Finn høydeforskjellen geometrisk</strong></p>
        <p>
          La festepunktet i treet være referanse (<InlineLatex latex="y = 0" />).
          Når vinranken danner vinkelen <InlineLatex latex="\theta" /> med vertikalen,
          er Tarzan i høyden:
        </p>
        <FormulaBox latex="y(\theta) = -L\cos\theta" variant="blue" />
        <p>
          Negativt fortegn fordi han henger <em>under</em> festet. Jo mindre vinkel
          (nærmere loddrett), jo lavere er han — <InlineLatex latex="\theta = 0" />{" "}
          gir det laveste punktet <InlineLatex latex="y = -L" />. Siden
          <InlineLatex latex="\cos 30° = 0{,}8660 > \cos 45° = 0{,}7071" />, er
          Tarzan lavere ved 30° enn ved 45° (for 30°: <InlineLatex latex="y = -0{,}866 L" />;
          for 45°: <InlineLatex latex="y = -0{,}707 L" />). Han faller altså fra
          startvinkel 45° ned til sluttvinkel 30°.
        </p>
        <p>
          <strong>Fallhøyden</strong> (som vi kaller <InlineLatex latex="h" />, positiv) er:
        </p>
        <FormulaBox latex="h = y_1 - y_2 = -L\cos 45° - (-L\cos 30°) = L(\cos 30° - \cos 45°)" variant="blue" />
        <FormulaBox latex="h = 20(0{,}8660 - 0{,}7071) = 20(0{,}1589) = 3{,}178\;\text{m}" variant="blue" />
        <p><strong>Steg 2: Energibevaring og løs for fart</strong></p>
        <p>
          Han starter fra ro (<InlineLatex latex="K_1 = 0" />). Sett{" "}
          <InlineLatex latex="U = 0" /> ved sluttpunktet (Janes høyde). Da er
          <InlineLatex latex="U_1 = mgh" /> og <InlineLatex latex="U_2 = 0" />,
          og energibevaringen reduseres til:
        </p>
        <FormulaBox latex="0 + mgh = \tfrac12 m v_2^2 + 0" variant="blue" />
        <p>
          <strong>Algebraisk omforming:</strong> massen <InlineLatex latex="m" />{" "}
          faller ut (uavhengig av Tarzans vekt!), og vi løser for{" "}
          <InlineLatex latex="v_2" />:
        </p>
        <FormulaBox latex="\tfrac12 v_2^2 = gh \;\Rightarrow\; v_2 = \sqrt{2gh}" variant="blue" />
        <p>Sett inn tall:</p>
        <FormulaBox latex="v_2 = \sqrt{2(9{,}80)(3{,}178)} = \sqrt{62{,}29} = 7{,}89\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_2 \approx 7{,}9\;\text{m/s}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Dette er akkurat samme formel som for
          fritt fall fra høyden h — vinranken endrer retningen på bevegelsen, men
          ikke energibalansen. 7,9 m/s ≈ 28 km/t. Det er nok til å banke Jane av
          grenen (en stygg klem!). Hadde det vært luftmotstand eller friksjon i
          festet, ville <InlineLatex latex="v_2" /> vært mindre — da måtte vi
          brukt <InlineLatex latex="K_1 + U_1 + W_\text{annet} = K_2 + U_2" />.
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> I en Atwood-maskin er de to klossene koblet
          sammen med et uelastisk tau over en friksjonsfri trinse. Dette gir to
          viktige begrensninger (constraints): (1) fartens størrelse er lik for
          begge klossene siden tauet ikke strekker seg, og (2) strekkkrafta T er
          lik langs hele tauet fordi trinsa er masseløs og friksjonsfri. Systemet
          analyseres enklest som én enhet.
        </p>
        <FormulaBox latex="U_g = mgy,\quad K = \tfrac12 m v^2" variant="blue" />
        <p><strong>(a) Endring i gravitasjonsenergi for hver kloss</strong></p>
        <p>
          Bruk <InlineLatex latex="\Delta U = mg\,\Delta y" /> for hver kloss
          separat. Kloss 1 (8 kg) går ned (<InlineLatex latex="\Delta y_1 = -0{,}200\;\text{m}" />),
          kloss 2 (6 kg) går opp (<InlineLatex latex="\Delta y_2 = +0{,}200\;\text{m}" />):
        </p>
        <FormulaBox latex="\Delta U_1 = m_1 g \Delta y_1 = (8{,}00)(9{,}80)(-0{,}200) = -15{,}68\;\text{J}" variant="blue" />
        <FormulaBox latex="\Delta U_2 = m_2 g \Delta y_2 = (6{,}00)(9{,}80)(+0{,}200) = +11{,}76\;\text{J}" variant="blue" />
        <FormulaBox latex="\boxed{\Delta U_1 = -15{,}68\;\text{J},\;\Delta U_2 = +11{,}76\;\text{J}}" variant="gold" />
        <p>
          Den tunge klossen frigjør mer potensiell energi enn den lette
          «spiser opp» — differansen blir til kinetisk energi.
        </p>
        <p><strong>(b) Arbeid fra tau på hver kloss</strong></p>
        <p>
          <strong>Generell formel:</strong>{" "}
          <InlineLatex latex="W = \vec{F}\cdot\vec{d} = Fd\cos\phi" />, der
          <InlineLatex latex="\phi" /> er vinkelen mellom kraft og forskyvning.
          Tauet trekker <em>begge</em> klossene <em>oppover</em>:
        </p>
        <p>
          Kloss 1 beveger seg nedover mens tauet drar oppover →{" "}
          <InlineLatex latex="\phi = 180°" />, <InlineLatex latex="\cos\phi = -1" />:{" "}
          <InlineLatex latex="W_{T,1} = -Td" />.
        </p>
        <p>
          Kloss 2 beveger seg oppover og tauet drar oppover →{" "}
          <InlineLatex latex="\phi = 0°" />, <InlineLatex latex="\cos\phi = +1" />:{" "}
          <InlineLatex latex="W_{T,2} = +Td" />.
        </p>
        <FormulaBox latex="\boxed{W_{T,1} = -T(0{,}200),\;W_{T,2} = +T(0{,}200)}" variant="gold" />
        <p><strong>(c) Totalarbeid fra tau + energibevaring</strong></p>
        <p>
          Tauet er en intern kraft i systemet (bøtte + kloss + tau). Sum av arbeidet
          det gjør på de to klossene:
        </p>
        <FormulaBox latex="W_\text{T,tot} = W_{T,1} + W_{T,2} = -Td + Td = 0" variant="blue" />
        <p>
          <strong>Hvorfor er dette så fint?</strong> Vi trenger aldri å bestemme T
          selv — tauet «flytter» bare energi mellom klossene uten å endre systemets
          totale energi. Da kan vi bruke ren mekanisk energibevaring for systemet:
        </p>
        <FormulaBox latex="K_\text{f} + U_\text{f} = K_\text{i} + U_\text{i} \;\Rightarrow\; \Delta K = -\Delta U_\text{tot}" variant="blue" />
        <p>Total endring i U:</p>
        <FormulaBox latex="\Delta U_\text{tot} = \Delta U_1 + \Delta U_2 = -15{,}68 + 11{,}76 = -3{,}92\;\text{J}" variant="blue" />
        <p>
          Siden begge klossene har samme fart v, er total kinetisk energi{" "}
          <InlineLatex latex="K = \tfrac12 m_1 v^2 + \tfrac12 m_2 v^2 = \tfrac12 (m_1 + m_2) v^2" />.
          Systemet starter fra ro, så:
        </p>
        <FormulaBox latex="\tfrac12 (m_1 + m_2) v^2 - 0 = -\Delta U_\text{tot} = +3{,}92\;\text{J}" variant="blue" />
        <FormulaBox latex="v^2 = \frac{2(3{,}92)}{m_1 + m_2} = \frac{7{,}84}{14{,}0} = 0{,}560\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="\boxed{v = 0{,}748\;\text{m/s}}" variant="gold" />
        <p>
          <strong>Kontroll:</strong> Newton gir akselerasjonen{" "}
          <InlineLatex latex="a = (m_1 - m_2)g/(m_1 + m_2) = (2)(9{,}80)/14 = 1{,}40\;\text{m/s}^2" />.
          Da er <InlineLatex latex="v^2 = 2ad = 2(1{,}40)(0{,}200) = 0{,}560" />, som stemmer.
        </p>
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er et koblet system med to typer krefter
          som spiller hovedroller: tyngdekrafta (konservativ — kan beskrives med
          potensiell energi <InlineLatex latex="U_g = mgy" />) og friksjon
          (ikke-konservativ — tapper systemets mekaniske energi). Nøkkelprinsipper:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Statisk friksjon er <em>reaktiv</em>: den leverer <em>akkurat så mye</em> kraft som trengs for å holde et objekt i ro, opp til maksgrensen <InlineLatex latex="f_{s,\max} = \mu_s N" />.</li>
          <li>Kinetisk friksjon har fast størrelse <InlineLatex latex="f_k = \mu_k N" /> så snart det er relativ bevegelse.</li>
          <li>Mekanisk energi er ikke bevart når friksjon virker. I stedet: <InlineLatex latex="K_1 + U_1 + W_\text{ikke-konservativ} = K_2 + U_2" />, med <InlineLatex latex="W_\text{frik} = -f_k \cdot d" /> (negativt fordi motsatt bevegelsen).</li>
        </ul>
        <p><strong>(a) Statisk tilfelle — hvorfor energibevaring ikke er verktøyet her</strong></p>
        <p>
          Systemet er i ro, så ingen energi endres. Vi bruker Newtons 2. lov
          (<InlineLatex latex="\sum \vec{F} = 0" />) på hvert legeme.
          <strong>Hvorfor Newton og ikke energi?</strong> Fordi det ikke skjer
          noen forskyvning — uten forskyvning er arbeidet null for alle krefter,
          og energibevaring gir bare <InlineLatex latex="0 = 0" />.
        </p>
        <p><strong>Bøtta (vertikalt, i ro):</strong> Tauspenning opp, tyngde ned.</p>
        <FormulaBox latex="T - m_b g = 0 \;\Rightarrow\; T = m_b g" variant="blue" />
        <FormulaBox latex="T = (67{,}0)(9{,}80) = 656{,}6\;\text{N}" variant="blue" />
        <p>
          <strong>Grussekken:</strong> Hvilke horisontale krefter virker på den?
          Tyngde og normalkraft fra kassen er begge <em>vertikale</em>. Tauet er
          ikke festet til grussekken. Eneste mulige horisontale kraft er friksjon
          fra kassen <em>hvis</em> noe drar sekken. Siden ingen horisontal kraft
          drar, trengs ingen friksjon for å holde balanse:
        </p>
        <FormulaBox latex="\sum F_{x,\text{grus}} = 0 \;\Rightarrow\; f_\text{grus} = 0" variant="blue" />
        <FormulaBox latex="\boxed{f_\text{grus} = 0\;\text{N}}" variant="gold" />
        <p>
          <strong>Vanlig feil:</strong> Mange tror automatisk at det må være
          friksjon fordi det er to overflater i kontakt. Men statisk friksjon
          oppstår bare <em>som respons</em> på en påført kraft.
        </p>
        <p><strong>Kassen:</strong> Tauet drar med kraft T mot trinsa (horisontalt). For at kassen skal stå i ro må statisk friksjon fra taket balansere akkurat denne kraften:</p>
        <FormulaBox latex="\sum F_{x,\text{kasse}} = T - f_\text{kasse} = 0 \;\Rightarrow\; f_\text{kasse} = T = 656{,}6\;\text{N}" variant="blue" />
        <p>
          <strong>Er dette mulig?</strong> Vi må sjekke om det kreves mer enn
          makssgrensen. Normalkraft fra taket bærer både kassen og grussekken:
        </p>
        <FormulaBox latex="N = (m_k + m_g) g = (82{,}0 + 45{,}0)(9{,}80) = 1244{,}6\;\text{N}" variant="blue" />
        <FormulaBox latex="f_{s,\max} = \mu_s N = (0{,}700)(1244{,}6) = 871{,}2\;\text{N}" variant="blue" />
        <p>
          Siden <InlineLatex latex="656{,}6 < 871{,}2" />, holder statisk
          friksjon — systemet er i ro som antatt.
        </p>
        <FormulaBox latex="\boxed{f_\text{kasse} = 656{,}6\;\text{N}\;(\text{statisk, rettet mot tau})}" variant="gold" />
        <p><strong>(b) Energibevaring etter at grus fjernes</strong></p>
        <p>
          Nå er systemet ubalansert og beveger seg. <strong>Hvorfor energibevaring
          og ikke kinematikk (v = v₀ + at)?</strong> Vi kjenner distansen (1,60 m),
          men ikke tiden. Energimetoden går direkte fra posisjon til fart uten å
          gå veien om tiden — mye raskere. Grunnprinsippet med friksjon:
        </p>
        <FormulaBox latex="K_1 + U_1 + W_\text{frik} = K_2 + U_2" variant="blue" />
        <p>
          <strong>Hva trengs? Ny normalkraft og ny kinetisk friksjon.</strong>{" "}
          Grussekken er borte, så normalkrafta fra taket bærer bare kassen:
        </p>
        <FormulaBox latex="N' = m_k g = (82{,}0)(9{,}80) = 803{,}6\;\text{N}" variant="blue" />
        <FormulaBox latex="f_k = \mu_k N' = (0{,}400)(803{,}6) = 321{,}4\;\text{N}" variant="blue" />
        <p>
          <strong>Akselererer systemet i det hele tatt?</strong> Bøttas vekt
          (656,6 N) må overvinne kinetisk friksjon (321,4 N). Ja —
          <InlineLatex latex="656{,}6 > 321{,}4" />, så systemet akselererer.
        </p>
        <p>
          <strong>Sette opp energibalansen for hele systemet:</strong> Kassen
          glir horisontalt, så <InlineLatex latex="\Delta U_\text{kasse} = 0" />.
          Bøtta synker <InlineLatex latex="d = 1{,}60" /> m, så
          <InlineLatex latex="\Delta U_\text{bøtte} = -m_b g d" /> (negativt —
          potensiell energi frigjøres). Både bøtte og kasse har samme fart v
          (koblet med tau). Tauets arbeid på bøtta og kassen kansellerer
          (intern kraft, samme resonnement som i 7.13). Friksjon gjør arbeid
          <InlineLatex latex="W_\text{frik} = -f_k d" /> på kassen:
        </p>
        <FormulaBox latex="m_b g d - f_k d = \tfrac12 (m_b + m_k) v^2" variant="blue" />
        <p>
          Venstre side: netto potensiell energi frigjort minus friksjonstap.
          Høyre side: total kinetisk energi av systemet som beveger seg med
          samme fart.
        </p>
        <p><strong>Steg-for-steg innsetting:</strong></p>
        <FormulaBox latex="(67{,}0)(9{,}80)(1{,}60) - (321{,}4)(1{,}60) = \tfrac12 (67{,}0 + 82{,}0) v^2" variant="blue" />
        <FormulaBox latex="1050{,}6 - 514{,}3 = 74{,}5\, v^2 \;\Rightarrow\; 536{,}3\;\text{J} = 74{,}5\, v^2" variant="blue" />
        <FormulaBox latex="v^2 = \frac{536{,}3}{74{,}5} = 7{,}199\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="v = \sqrt{7{,}199} = 2{,}68\;\text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v = 2{,}68\;\text{m/s}}" variant="gold" />
        <p>
          <strong>Enhetssjekk:</strong> J/kg = (kg·m²/s²)/kg = m²/s², så
          <InlineLatex latex="\sqrt{v^2}" /> gir m/s. ✓
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Uten friksjon ville v vært
          <InlineLatex latex="\sqrt{2 m_b g d / (m_b + m_k)} = \sqrt{2(656{,}6)(1{,}60)/149} = 3{,}76" /> m/s.
          Friksjonen har «spist» omtrent halvparten av den mulige kinetiske
          energien (514 J av 1051 J). Kontroll via Newton:{" "}
          <InlineLatex latex="a = (m_b g - f_k)/(m_b + m_k) = 335{,}2/149 = 2{,}25\;\text{m/s}^2" />,
          så <InlineLatex latex="v^2 = 2ad = 2(2{,}25)(1{,}60) = 7{,}20" />. ✓
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
      <div className="space-y-3 text-sm">
        <p>
          <strong>Teori:</strong> Dette er et klassisk multi-segment-problem som
          demonstrerer hvorfor arbeid-energi-teoremet er så mektig. Nøkkelen er
          å gjenkjenne at vi kan bruke den generelle formuleringen:
        </p>
        <FormulaBox latex="K_f - K_i = W_\text{tot} = W_\text{grav} + W_\text{frik} + W_\text{luft} + \cdots" variant="blue" />
        <p>
          eller ekvivalent, i skikkelsen med potensiell energi for den
          konservative tyngdekrafta:
        </p>
        <FormulaBox latex="K_1 + U_1 + W_\text{ikke-konservativ} = K_2 + U_2" variant="blue" />
        <p>
          Her dukker både konservative (tyngde, <InlineLatex latex="U_g = mgy" />)
          og ikke-konservative krefter (friksjon, luftmotstand, kraft fra
          snødriven) opp. <strong>Hvorfor energi og ikke kinematikk?</strong>{" "}
          Banen er krum (skibakken), friksjonsarbeidet er gitt som ett tall for
          hele bakken (vi vet ikke helningen), og vi kjenner ingen tid noe sted.
          Energi hopper rett fra «hvor mye høyde har jeg mistet» til «hvor raskt
          går jeg» — uten å røre ved detaljer i mellom.
        </p>
        <p><strong>(a) Fart i bunnen av bakken</strong></p>
        <p>
          <strong>Hvilke krefter gjør arbeid?</strong> Tyngdekrafta (positivt, hun
          synker) og friksjon (negativt). Normalkrafta står vinkelrett på
          bevegelsen i hvert punkt og gjør null arbeid. Start fra ro, så
          <InlineLatex latex="K_i = 0" />. Velg bunnen som U = 0, da er
          <InlineLatex latex="U_i = mgh" /> og <InlineLatex latex="U_f = 0" />:
        </p>
        <FormulaBox latex="0 + mgh + W_\text{frik} = \tfrac12 m v_1^2 + 0" variant="blue" />
        <p>
          <strong>Fortegnssanalyse:</strong> Friksjonsarbeidet er oppgitt som
          <InlineLatex latex="W_\text{frik} = -10{,}9\;\text{kJ} = -10\;900\;\text{J}" />
          — negativt fordi friksjon alltid motvirker bevegelsen. Løs for{" "}
          <InlineLatex latex="v_1" />:
        </p>
        <FormulaBox latex="\tfrac12 m v_1^2 = mgh + W_\text{frik}" variant="blue" />
        <FormulaBox latex="\tfrac12 (60{,}0)\, v_1^2 = (60{,}0)(9{,}80)(63{,}0) + (-10\;900)" variant="blue" />
        <FormulaBox latex="30\, v_1^2 = 37\;044 - 10\;900 = 26\;144\;\text{J}" variant="blue" />
        <FormulaBox latex="v_1^2 = \frac{26\;144}{30} = 871{,}5\;\text{m}^2/\text{s}^2 \;\Rightarrow\; v_1 = \sqrt{871{,}5}" variant="blue" />
        <FormulaBox latex="\boxed{v_1 = 29{,}5\;\text{m/s}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Uten friksjon ville hun hatt
          <InlineLatex latex="v = \sqrt{2gh} = \sqrt{2(9{,}80)(63)} = 35{,}1\;\text{m/s}" />
          (≈ 126 km/t). Friksjonen har redusert det til 29,5 m/s (≈ 106 km/t) —
          omtrent 29 % reduksjon i kinetisk energi. Enhetssjekk: m²/s² → m/s ✓.
        </p>
        <p><strong>(b) Horisontal strekning med bløt snø (65 m)</strong></p>
        <p>
          <strong>Hvorfor kinematikk fortsatt ikke funker:</strong> To
          ikke-konservative krefter virker samtidig (glidefriksjon og
          luftmotstand). Det gir en konstant netto motstandskraft, men
          energimetoden håndterer det elegant som bare sum av arbeid.
        </p>
        <p>
          <strong>Normalkraft på horisontal overflate:</strong> Her er
          <InlineLatex latex="N = mg" /> (hun beveger seg horisontalt, ingen
          vertikal akselerasjon). Kinetisk friksjon:
        </p>
        <FormulaBox latex="f_k = \mu_k N = \mu_k m g = (0{,}21)(60{,}0)(9{,}80) = 123{,}5\;\text{N}" variant="blue" />
        <p>
          <strong>Kombiner motstandskreftene:</strong> Luftmotstand er oppgitt som
          gjennomsnittlig 180 N. Begge krefter peker motsatt bevegelsen og gir
          samme fortegnseffekt:
        </p>
        <FormulaBox latex="F_\text{motstand} = f_k + F_\text{luft} = 123{,}5 + 180 = 303{,}5\;\text{N}" variant="blue" />
        <FormulaBox latex="W_\text{motstand} = -F_\text{motstand} \cdot d = -(303{,}5)(65{,}0) = -19\;728\;\text{J}" variant="blue" />
        <p>
          <strong>Energibalanse på flat strekning:</strong> Ingen høydeendring,
          så <InlineLatex latex="\Delta U = 0" />. Arbeid-energi-teoremet:
        </p>
        <FormulaBox latex="\tfrac12 m v_2^2 = \tfrac12 m v_1^2 + W_\text{motstand}" variant="blue" />
        <FormulaBox latex="\tfrac12 (60{,}0)\, v_2^2 = 26\;144 - 19\;728 = 6416\;\text{J}" variant="blue" />
        <FormulaBox latex="v_2^2 = \frac{2(6416)}{60{,}0} = 213{,}9\;\text{m}^2/\text{s}^2" variant="blue" />
        <FormulaBox latex="v_2 = \sqrt{213{,}9}" variant="blue" />
        <FormulaBox latex="\boxed{v_2 = 14{,}6\;\text{m/s}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Den bløte snøen og lufta har
          halvert farten hennes (fra ~30 til ~15 m/s), og kinetisk energi er
          redusert med en faktor 4 — helt konsistent med at
          <InlineLatex latex="K \propto v^2" />.
        </p>
        <p><strong>(c) Gjennomsnittlig kraft fra snødriven</strong></p>
        <p>
          <strong>Hvorfor arbeid-energi-teoremet her?</strong> Snødriven er
          inhomogen — krafta varierer sikkert fra punkt til punkt etter hvor
          kompakt snøen er. Men vi kan definere en <em>gjennomsnittlig</em>
          kraft <InlineLatex latex="\bar{F}" /> slik at det totale arbeidet den
          gjør er <InlineLatex latex="W = -\bar{F} \cdot d" />. Hun stopper i
          snødriven, så <InlineLatex latex="K_f = 0" />:
        </p>
        <FormulaBox latex="W_\text{drive} = K_f - K_i = 0 - \tfrac12 m v_2^2" variant="blue" />
        <FormulaBox latex="-\bar{F}_\text{drive} \cdot d_\text{drive} = -\tfrac12 m v_2^2" variant="blue" />
        <p>Fjern minustegnene (de kansellerer) og løs for <InlineLatex latex="\bar{F}" />:</p>
        <FormulaBox latex="\bar{F}_\text{drive} = \frac{\tfrac12 m v_2^2}{d_\text{drive}} = \frac{6416}{3{,}0}" variant="blue" />
        <FormulaBox latex="\bar{F}_\text{drive} = 2139\;\text{N}" variant="blue" />
        <FormulaBox latex="\boxed{\bar{F}_\text{drive} \approx 2{,}14\;\text{kN}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> 2,14 kN er omtrent 3,6 ganger
          skiløperens vekt (<InlineLatex latex="mg = 588\;\text{N}" />). Det
          tilsvarer en retardasjon på
          <InlineLatex latex="a = \bar{F}/m = 2139/60 \approx 35{,}6\;\text{m/s}^2" />,
          eller rundt <InlineLatex latex="3{,}6\,g" />. Ganske brutalt — men
          ikke livsfarlig, fordi krafta fordeles jevnt over 3 meter.
          <strong>Enhetssjekk:</strong> J/m = N·m/m = N ✓.
        </p>
        <p>
          <strong>Sammenheng mellom delene:</strong> Vi løste hver etappe med
          samme grunnprinsipp (<InlineLatex latex="\Delta K = W_\text{tot}" />),
          men med forskjellig ukjent størrelse hver gang: (a) ukjent{" "}
          <InlineLatex latex="v_1" />, (b) ukjent <InlineLatex latex="v_2" />,
          (c) ukjent <InlineLatex latex="\bar{F}" />. Det er styrken ved
          energimetoden — samme ligning, bytt bare hva vi vil finne.
        </p>
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
