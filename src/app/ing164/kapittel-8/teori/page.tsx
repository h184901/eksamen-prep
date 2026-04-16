"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { ImpulseVisualizer, CollisionVisualizer, BallisticPendulumVisualizer } from "../visualizations";

export default function Kapittel8Teori() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      {/* 8.1 Bevegelsesmengde */}
      <TheorySummary
        title="8.1 Bevegelsesmengde (p = mv)"
        mustKnow={[
          "Bevegelsesmengde: p = mv (vektor — retning er like viktig som størrelse!)",
          "Enhet: kg·m/s",
          "Newtons 2. lov i momentform: ΣF = dp/dt — mer grunnleggende enn F = ma",
          "Kraftimpuls: J = ΣF·Δt = Δp (impuls-momentum-teoremet)",
          "Variabel kraft: J = ∫F dt = areal under F-t grafen",
          "Husk: velg positiv retning FØR du setter inn tall",
        ]}
      >
        <p>
          <strong>Bevegelsesmengde</strong> (lineært moment) er produktet av masse og hastighet.
          Det er en <em>vektor</em> — retningen er alltid den samme som hastighetsvektoren.
        </p>

        <FormulaBox
          latex="\vec{p} = m\vec{v}"
          title="Bevegelsesmengde"
          variant="gold"
          description="Enhet: kg·m/s. Retning = hastighetsretningen. Skalar størrelse: p = mv."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er bevegelsesmengde nyttig?</p>
          <p>
            Bevegelsesmengde er <strong>alltid bevart</strong> når ingen ytre krefter virker — uavhengig av hva
            som skjer inni systemet. Det gjør det til et kraftigere verktøy enn energi i mange situasjoner,
            spesielt i kollisjoner der deformasjon og varme gjør energiregnestykket vanskelig.
            Newton selv formulerte 2. lov som <InlineLatex latex="\vec{F} = d\vec{p}/dt" />, ikke som{" "}
            <InlineLatex latex="\vec{F} = m\vec{a}" /> — momentformen er den <em>generelle</em> versjonen.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — lastebil vs. sykkel</p>
          <p>
            En lastebil (5 000 kg) og en sykkel (10 kg) kjører begge med 10 km/h.
            Samme fart — men lastebilen har{" "}
            <strong>500 ganger så stor bevegelsesmengde</strong>. Det er derfor du kan stoppe sykkelen med
            én hånd, men ikke lastebilen. Bevegelsesmengde fanger opp både «treghet» og «fart» i ett tall.
          </p>
        </div>

        <p className="mt-4">
          Newtons andre lov i momentform er den mest generelle formuleringen og fungerer selv når massen
          endrer seg over tid (f.eks. en rakett som brenner drivstoff):
        </p>

        <FormulaBox
          latex="\sum \vec{F} = \frac{d\vec{p}}{dt}"
          title="Newtons 2. lov — momentform (generell)"
          variant="gold"
          description="Når m er konstant gir dette F = ma. Men for raketter og andre systemer med variabel masse er momentformen den riktige."
        />

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kapittel 10 — Rotasjon</p>
          <p>
            Lineær bevegelsesmengde <InlineLatex latex="p = mv" /> har en direkte analog i rotasjonslæren:
            <strong> dreiemoment</strong> (angulær bevegelsesmengde){" "}
            <InlineLatex latex="L = I\omega" />. Akkurat som{" "}
            <InlineLatex latex="\sum F = dp/dt" /> er <InlineLatex latex="\sum \tau = dL/dt" />.
            Og akkurat som lineær bevegelsesmengde bevares når <InlineLatex latex="\sum F = 0" />, bevares{" "}
            <InlineLatex latex="L" /> når <InlineLatex latex="\sum \tau = 0" />.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Hvorfor p = mv og ikke mv²?</p>
          <p className="mb-2">
            En naturlig spørsmål: hvorfor er <em>bevegelsesmengden</em> lineær i <InlineLatex latex="v" />,
            mens <em>kinetisk energi</em> går som <InlineLatex latex="v^2" />? Svaret ligger i{" "}
            <strong>hva de to måler</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <InlineLatex latex="p = mv" /> svarer på: «Hvor vanskelig er det å stoppe denne tingen?»
              Doble farten → dobbel impuls trengs for å stoppe den.
            </li>
            <li>
              <InlineLatex latex="E_k = \tfrac{1}{2}mv^2" /> svarer på: «Hvor mye arbeid skal til for å sette den i gang?»
              Doble farten → fire ganger så mye arbeid.
            </li>
          </ul>
          <p className="mt-2">
            Begge er nyttige, men i kollisjoner (korte tidsrom, store krefter) er{" "}
            <InlineLatex latex="p" /> nesten alltid det rette verktøyet fordi det er bevart selv når energi
            tapes til varme og deformasjon.
          </p>
        </div>

        {/* SVG: bevegelsesmengde som vektor */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 400 180" className="w-full max-w-md">
            {/* Bakgrunn-akser */}
            <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.3">
              <line x1="30" y1="150" x2="370" y2="150" />
              <line x1="50" y1="30" x2="50" y2="170" />
            </g>
            {/* Sykkel: liten masse, høy fart → liten p */}
            <circle cx="100" cy="120" r="12" fill="#10b981" opacity="0.7" />
            <text x="100" y="125" textAnchor="middle" className="fill-white text-xs font-bold">m</text>
            <line x1="115" y1="120" x2="170" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrGreen)" />
            <text x="140" y="110" textAnchor="middle" className="fill-current text-xs">v = 10 m/s</text>
            <text x="140" y="145" textAnchor="middle" className="fill-current text-xs font-bold">p = 100 kg·m/s</text>
            {/* Lastebil: stor masse, lav fart → stor p */}
            <rect x="230" y="105" width="50" height="30" fill="#ef4444" opacity="0.7" />
            <text x="255" y="125" textAnchor="middle" className="fill-white text-xs font-bold">5M</text>
            <line x1="285" y1="120" x2="320" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrRed)" />
            <text x="303" y="110" textAnchor="middle" className="fill-current text-xs">v = 2 m/s</text>
            <text x="255" y="160" textAnchor="middle" className="fill-current text-xs font-bold">p = 10 000 kg·m/s</text>
            <defs>
              <marker id="arrGreen" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#10b981" />
              </marker>
              <marker id="arrRed" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
              </marker>
            </defs>
            <text x="200" y="25" textAnchor="middle" className="fill-current text-sm font-semibold">Stor p = stor «stoppkraft» nødvendig</text>
          </svg>
        </div>
      </TheorySummary>

      {/* 8.2 Kraftimpuls */}
      <TheorySummary
        title="8.2 Kraftimpuls og impuls-momentum-teoremet"
        mustKnow={[
          "Kraftimpuls J = ΣF·Δt (konstant kraft) = ∫F dt (variabel kraft)",
          "Impuls-momentum-teoremet: J = Δp = p₂ − p₁",
          "Impuls er en VEKTOR — retning er avgjørende",
          "Areal under F-t-grafen = impulsen (uansett om kraften varierer)",
          "Gjennomsnittskraft: F_snitt = Δp/Δt",
        ]}
      >
        <p>
          <strong>Kraftimpuls</strong> beskriver virkningen av en kraft over tid. Når du ikke kjenner
          kraften direkte, men vet hvordan bevegelsesmengden endrer seg, er kraftimpulsen veien å gå.
        </p>

        <FormulaBox
          latex="\vec{J} = \sum\vec{F} \cdot \Delta t \quad \text{(konstant kraft)}"
          title="Kraftimpuls — konstant kraft"
          variant="gold"
          description="Enhet: N·s = kg·m/s (samme som bevegelsesmengde)."
        />

        <FormulaBox
          latex="\vec{J} = \int_{t_1}^{t_2} \vec{F}\,dt = \Delta\vec{p} = \vec{p}_2 - \vec{p}_1"
          title="Impuls-momentum-teoremet"
          variant="gold"
          description="Arealet under F-t-grafen = endringen i bevegelsesmengde. Gjelder alltid, uansett om kraften er konstant eller varierer."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er impulsen nyttig?</p>
          <p>
            I mange situasjoner kan du <em>ikke</em> måle kraften direkte — den varierer vilt over
            millisekunder (biltransjer, baseball-bat, eksplosjon). Men du kan måle{" "}
            <InlineLatex latex="\Delta p" /> ved å se på hastigheten før og etter. Da gir
            impuls-momentum-teoremet deg impulsen, og fra den kan du beregne gjennomsnittskraften:
          </p>
          <div className="mt-2">
            <InlineLatex latex="\bar{F} = \frac{J}{\Delta t} = \frac{\Delta p}{\Delta t}" />
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — egg, kollisjonsputer og knokler</p>
          <p>
            For et gitt <InlineLatex latex="\Delta p" /> (som er fastsatt av farten og massen) gjelder:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>
              <strong>Fange et egg:</strong> Du trekker hånden bakover (øker <InlineLatex latex="\Delta t" />),
              slik at kraften{" "}
              <InlineLatex latex="F = \Delta p / \Delta t" /> blir liten nok til at egget ikke sprekker.
            </li>
            <li>
              <strong>Knute-soner i biler:</strong> Designet for å forlenge kollisjonstiden og dermed
              redusere toppkraften mot passasjerene.
            </li>
            <li>
              <strong>Airbager:</strong> Samme prinsipp — øker <InlineLatex latex="\Delta t" /> fra
              millisekunder til hundredeler av sekunder.
            </li>
          </ul>
          <p className="mt-2">
            Vil du derimot <em>maksimere</em> kraften (som en boxer eller karateka), ønsker du
            <strong> kort kontakttid</strong> — derav «knips»-teknikken.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse — retningen!</p>
          <p>
            Impulsen er en <strong>vektor</strong>. Når en ball treffer en vegg og spretter rett tilbake,
            er <InlineLatex latex="\Delta \vec{p} = m\vec{v}_2 - m\vec{v}_1" />. Hvis ballen
            kommer inn med <InlineLatex latex="v_1 = +20\;\text{m/s}" /> og spretter ut med{" "}
            <InlineLatex latex="v_2 = -15\;\text{m/s}" />, er
          </p>
          <div className="mt-2">
            <InlineLatex latex="\Delta p = m(-15 - 20) = -35m\;\text{kg·m/s}" />
          </div>
          <p className="mt-2">
            Ikke <InlineLatex latex="m(15-20) = -5m" />. Sett alltid opp fortegn <em>før</em> du regner.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Hvorfor krasjputer funker — F=Δp/Δt</p>
          <p className="mb-2">
            Dette er kanskje den viktigste praktiske innsikten fra hele kapittelet. Når du krasjer i en vegg,
            er <InlineLatex latex="\Delta p = m(0 - v_0) = -mv_0" /> uansett hva — bilen må stoppe.{" "}
            <strong>Men kraften du opplever avhenger av kollisjonstiden:</strong>
          </p>
          <div className="text-center my-2">
            <InlineLatex latex="F_\text{gj} = \frac{\Delta p}{\Delta t}" />
          </div>
          <ul className="list-disc list-inside space-y-1">
            <li>Vegg av stål: <InlineLatex latex="\Delta t \approx 0{,}01" /> s → ekstrem kraft, dødelig</li>
            <li>Krasjputer + knusesoner: <InlineLatex latex="\Delta t \approx 0{,}3" /> s → 30× mindre kraft</li>
            <li>Samme prinsipp: fallskjerm, strikkhopp, boksehanske, fotballsko med demping</li>
          </ul>
          <p className="mt-2">
            Ingeniører kan ikke endre <InlineLatex latex="\Delta p" />, men de kan designe systemer som
            øker <InlineLatex latex="\Delta t" />. Det er derfor sikkerhet er så nært knyttet til
            impuls-teoremet.
          </p>
        </div>

        {/* SVG: F-t graf med kort vs lang Δt */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 440 220" className="w-full max-w-lg">
            {/* Akse */}
            <g stroke="currentColor" fill="none" strokeWidth="1.5">
              <line x1="40" y1="180" x2="410" y2="180" />
              <line x1="40" y1="30" x2="40" y2="180" />
            </g>
            <text x="415" y="185" className="fill-current text-xs">t</text>
            <text x="25" y="35" className="fill-current text-xs">F</text>
            {/* Tynn høy puls — hard kollisjon */}
            <path d="M 80 180 Q 95 40 110 180 Z" fill="#ef4444" opacity="0.7" />
            <text x="95" y="195" textAnchor="middle" className="fill-current text-xs">Hard</text>
            <text x="95" y="208" textAnchor="middle" className="fill-current text-xs">(kort Δt)</text>
            {/* Bred lav puls — myk kollisjon */}
            <path d="M 200 180 Q 270 100 340 180 Z" fill="#10b981" opacity="0.7" />
            <text x="270" y="195" textAnchor="middle" className="fill-current text-xs">Myk (med airbag)</text>
            <text x="270" y="208" textAnchor="middle" className="fill-current text-xs">(lang Δt)</text>
            <text x="225" y="150" textAnchor="middle" className="fill-current text-xs">samme areal =</text>
            <text x="225" y="163" textAnchor="middle" className="fill-current text-xs">samme Δp</text>
            <text x="220" y="25" textAnchor="middle" className="fill-current text-sm font-semibold">Areal under F-t = impuls J = Δp</text>
          </svg>
        </div>
      </TheorySummary>

      <ImpulseVisualizer />

      {/* 8.3 Bevaring av bevegelsesmengde */}
      <TheorySummary
        title="8.3 Bevaring av bevegelsesmengde"
        mustKnow={[
          "Bevaring: Når ΣF_ytre = 0, er total p konstant",
          "Følger direkte fra Newtons 3. lov: indre krefter kansellerer alltid i par",
          "Gjelder komponentvis: p_x og p_y bevares uavhengig av hverandre",
          "Under en kollisjon er støtkreftene mye større enn tyngde → p ≈ bevart selv med tyngde",
          "Velg systemet ditt nøye — inkluder alle kolliderende legemer",
        ]}
      >
        <p>
          Bevaringsloven for bevegelsesmengde følger <em>direkte</em> fra Newtons 3. lov.
          For to legemer A og B som virker på hverandre:
        </p>

        <FormulaBox
          latex="\vec{F}_{AB} = -\vec{F}_{BA} \;\Rightarrow\; \frac{d\vec{p}_A}{dt} + \frac{d\vec{p}_B}{dt} = 0 \;\Rightarrow\; \vec{p}_{\text{total}} = \text{konst.}"
          title="Bevaring av bevegelsesmengde — fra N3L"
          variant="gold"
        />

        <FormulaBox
          latex="\vec{p}_{\text{total,før}} = \vec{p}_{\text{total,etter}}"
          title="Bevaringsloven"
          variant="gold"
          description="Gjelder når summen av ytre krefter er null (eller neglisjerbar under kollisjonen)."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor bevares bevegelsesmengden?</p>
          <p>
            Tenk på to baller som kolliderer. Ball A trykker på B med kraft{" "}
            <InlineLatex latex="\vec{F}_{AB}" />, og B trykker tilbake på A med akkurat like stor kraft i
            motsatt retning (<InlineLatex latex="\vec{F}_{BA} = -\vec{F}_{AB}" />). Disse er
            <em> indre</em> krefter i systemet {"{A, B}"}. De kansellerer alltid — uansett hvor voldsom
            kollisjonen er. Totalimpulsen endres kun av <em>ytre</em> krefter (tyngde, friksjon mot
            underlaget, etc.).
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktisk tips — når gjelder bevaringen?</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>
              <strong>Under selve kollisjonen:</strong> Støtkreftene (indre) er typisk 100–1000 ganger
              større enn tyngden. Tyngden rekker ikke å endre bevegelsesmengden merkbart i løpet av
              de få millisekunder kollisjonen varer. Bruk bevaringen uten bekymring.
            </li>
            <li>
              <strong>Mellom kollisjoner:</strong> Tyngden virker. Bevegelsesmengden endres. Bruk
              energibevaring eller kinematikk i disse fasene.
            </li>
            <li>
              <strong>Velg systemet ditt:</strong> Hvis du inkluderer jorda i systemet, er bevegelsesmengde
              bevart (jorda trekker legemet, legemet trekker jorda like mye). Men jorda er upraktisk å
              følge — velg heller delsystemet der de ytre kreftene er neglisjerbare.
            </li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse</p>
          <p>
            «Bevegelsesmengde er alltid bevart.» — <strong>Feil!</strong> Den er kun bevart
            når summen av <em>ytre</em> krefter er null (eller neglisjerbar). En ball som spretter
            mot en vegg: hvis du bare tar ballen som system, virker veggen som en ytre kraft og
            endrer bevegelsesmengden. Inkluder veggen (og jorda) i systemet, så er total
            bevegelsesmengde bevart.
          </p>
        </div>

        <p className="mt-4">
          I <strong>2D-kollisjoner</strong> bevares bevegelsesmengden komponentvis — det gir deg to
          likninger:
        </p>

        <FormulaBox
          latex="\begin{cases} \sum m_i v_{ix,\text{før}} = \sum m_i v_{ix,\text{etter}} \\ \sum m_i v_{iy,\text{før}} = \sum m_i v_{iy,\text{etter}} \end{cases}"
          title="Bevaring komponentvis — 2D"
          variant="blue"
          description="x- og y-komponentene bevares uavhengig av hverandre."
        />

        {/* SVG: 2D-kollisjon med x- og y-komponenter */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 440 260" className="w-full max-w-lg">
            <text x="220" y="20" textAnchor="middle" className="fill-current text-sm font-semibold">2D-kollisjon — p_x og p_y bevares separat</text>
            {/* Akser */}
            <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.3">
              <line x1="40" y1="140" x2="400" y2="140" />
              <line x1="220" y1="50" x2="220" y2="230" />
            </g>
            <text x="405" y="145" className="fill-current text-xs">x</text>
            <text x="225" y="55" className="fill-current text-xs">y</text>

            {/* FØR: ball A kommer inn fra venstre */}
            <circle cx="90" cy="140" r="14" fill="#3b82f6" opacity="0.8" />
            <text x="90" y="145" textAnchor="middle" className="fill-white text-xs font-bold">A</text>
            <line x1="105" y1="140" x2="160" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrBlue8)" />
            <text x="132" y="135" textAnchor="middle" className="fill-current text-xs">v_A</text>
            {/* Ball B i ro */}
            <circle cx="220" cy="140" r="14" fill="#f59e0b" opacity="0.8" />
            <text x="220" y="145" textAnchor="middle" className="fill-white text-xs font-bold">B</text>

            {/* ETTER: A sprer seg oppover, B sprer seg nedover */}
            <line x1="220" y1="140" x2="290" y2="90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#arrBlue8)" />
            <text x="300" y="85" className="fill-current text-xs">v_A' (θ oppover)</text>
            <line x1="220" y1="140" x2="290" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#arrOr8)" />
            <text x="300" y="210" className="fill-current text-xs">v_B' (φ nedover)</text>

            {/* Vinkelmarkering */}
            <path d="M 260 140 A 40 40 0 0 0 257 120" stroke="#3b82f6" fill="none" strokeWidth="1" />
            <text x="267" y="132" className="fill-current text-xs">θ</text>
            <path d="M 260 140 A 40 40 0 0 1 257 160" stroke="#f59e0b" fill="none" strokeWidth="1" />
            <text x="267" y="155" className="fill-current text-xs">φ</text>

            <defs>
              <marker id="arrBlue8" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
              </marker>
              <marker id="arrOr8" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="220" y="250" textAnchor="middle" className="fill-current text-xs">p_x: m_A v_A = m_A v'_A cos θ + m_B v'_B cos φ</text>
          </svg>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Rakettligningen — masse som endrer seg</p>
          <p className="mb-2">
            En rakett er et klassisk eksempel på et system der <InlineLatex latex="F = ma" /> IKKE gjelder —
            fordi massen endrer seg kontinuerlig. Momentformen{" "}
            <InlineLatex latex="\sum F = dp/dt" /> er derimot helt korrekt. Ved å anvende bevaring av{" "}
            <InlineLatex latex="p" /> på systemet (rakett + eksos) får man:
          </p>
          <div className="text-center my-2">
            <InlineLatex latex="m\,\frac{dv}{dt} = -v_\text{eks}\,\frac{dm}{dt}" />
          </div>
          <p className="mt-2">
            Der <InlineLatex latex="v_\text{eks}" /> er utslippshastigheten (relativ rakett). Integrert gir dette
            Tsiolkovsky-ligningen <InlineLatex latex="\Delta v = v_\text{eks}\ln(m_0/m_f)" />. Dette er
            romfartsligningen — og grunnlaget for all moderne rakett-design.
          </p>
        </div>
      </TheorySummary>

      {/* 8.4 Inelastiske kollisjoner */}
      <TheorySummary
        title="8.4 Inelastiske kollisjoner"
        mustKnow={[
          "Bevegelsesmengde er ALLTID bevart i kollisjoner — uansett type",
          "Kinetisk energi er IKKE bevart i inelastiske kollisjoner",
          "Fullstendig inelastisk: legemene henger sammen → felles hastighet etter støtet",
          "Fullstendig inelastisk = størst mulig energitap (kompatibelt med p-bevaring)",
          "Ballistisk pendel: Steg 1 = p-bevaring (støt), Steg 2 = energibevaring (svingen)",
          "Energitap = E_k,før − E_k,etter (alltid positivt ved inelastisk kollisjon)",
        ]}
      >
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Type</th>
                <th className="text-left py-2 pr-4"><InlineLatex latex="\vec{p}" /> bevart?</th>
                <th className="text-left py-2 pr-4"><InlineLatex latex="E_k" /> bevart?</th>
                <th className="text-left py-2">Kjennetegn</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-semibold">Elastisk</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2">Spretter fra hverandre (billardkuler, atomkjerner)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-semibold">Inelastisk</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2 pr-4 text-red-600 dark:text-red-400">Nei ✗</td>
                <td className="py-2">Noe energi tapt til varme/lyd/deformasjon</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">Fullst. inelastisk</td>
                <td className="py-2 pr-4 text-green-600 dark:text-green-400">Ja ✓</td>
                <td className="py-2 pr-4 text-red-600 dark:text-red-400">Nei ✗ (maks tap)</td>
                <td className="py-2">Henger sammen, én felles hastighet etter støtet</td>
              </tr>
            </tbody>
          </table>
        </div>

        <FormulaBox
          latex="m_A v_{A1} + m_B v_{B1} = (m_A + m_B)\,v_2"
          title="Fullstendig inelastisk kollisjon"
          variant="gold"
          description="Legemene henger sammen etter støtet → én felles hastighet v₂. Bevegelsesmengde bevart."
        />

        <FormulaBox
          latex="\Delta E_k = \tfrac{1}{2}(m_A + m_B)v_2^2 - \left(\tfrac{1}{2}m_A v_{A1}^2 + \tfrac{1}{2}m_B v_{B1}^2\right)"
          title="Energitap ved inelastisk kollisjon"
          variant="blue"
          description="Alltid negativt (energi forsvinner til varme, lyd, deformasjon). Beregn E_k,etter − E_k,før."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Ballistisk pendel — klassisk eksamensoppgave!</p>
          <p>
            En kule (masse <InlineLatex latex="m" />, fart <InlineLatex latex="v_0" />) fester seg i en
            kloss (masse <InlineLatex latex="M" />) som henger i et tau. Systemet svinger opp til høyde{" "}
            <InlineLatex latex="h" />. Dette er et <strong>to-stegs problem</strong> — du bytter
            bevaringslov mellom stegene:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>
              <strong>Under støtet</strong> (kula fester seg i klossen):{" "}
              <em>Bevegelsesmengde bevart</em>, kinetisk energi IKKE bevart (deformasjon, varme)
            </li>
            <li>
              <strong>Etter støtet</strong> (klossen svinger oppover):{" "}
              <em>Mekanisk energi bevart</em> (<InlineLatex latex="E_k \to E_{p,g}" />),
              men bevegelsesmengde IKKE bevart (snorkraft er ytre kraft!)
            </li>
          </ol>
        </div>

        <FormulaBox
          latex="v_0 = \frac{m + M}{m}\sqrt{2gh}"
          title="Ballistisk pendel — kulens startfart"
          variant="gold"
          description="Kombiner p-bevaring under støtet med energibevaring under svingen. h = høyden systemet svinger opp til."
        />

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse — hva skjer NÅR?</p>
          <p>
            «Legemene som henger sammen har samme hastighet <em>før</em> kollisjonen.» — <strong>Feil!</strong>{" "}
            De har felles hastighet kun <em>etter</em> støtet. Før støtet kan de ha helt ulike hastigheter
            (kula er rask, klossen er i ro). Det er nettopp denne fartsdifferansen som er drivkraften
            i energitapet.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig misforståelse — «fullstendig inelastisk = ingen energi igjen»</p>
          <p className="mb-2">
            Dette er <em>helt feil!</em> Fullstendig inelastisk betyr <strong>maksimalt</strong> energitap som er
            kompatibelt med bevegelsesmengde-bevaringen — <em>ikke</em> at all kinetisk energi forsvinner.
          </p>
          <p>
            Eksempel: To baller med samme masse kolliderer frontalt med lik fart og henger sammen.
            Her <em>forsvinner</em> all kinetisk energi (fordi <InlineLatex latex="v_\text{etter} = 0" />{" "}
            pga. symmetri). Men hvis de har ulik fart eller går i samme retning, blir det fortsatt
            betydelig kinetisk energi igjen etter støtet — den felles hastigheten er ikke null.
          </p>
          <p className="mt-2 font-semibold">
            Regel: p er <em>alltid</em> bevart i lukket system, men E_k er kun bevart ved elastisk støt.
          </p>
        </div>

        {/* SVG: Elastisk vs inelastisk kollisjon */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 440 320" className="w-full max-w-lg">
            <text x="220" y="20" textAnchor="middle" className="fill-current text-sm font-semibold">Elastisk vs Fullstendig inelastisk</text>

            {/* ELASTISK — øverst */}
            <text x="30" y="50" className="fill-current text-xs font-bold">Elastisk:</text>
            {/* Før */}
            <text x="100" y="68" textAnchor="middle" className="fill-current text-xs">Før</text>
            <circle cx="80" cy="90" r="14" fill="#3b82f6" />
            <line x1="95" y1="90" x2="130" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrBlueC)" />
            <circle cx="160" cy="90" r="14" fill="#f59e0b" />
            {/* Etter */}
            <text x="340" y="68" textAnchor="middle" className="fill-current text-xs">Etter</text>
            <circle cx="280" cy="90" r="14" fill="#3b82f6" />
            <line x1="260" y1="90" x2="220" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrBlueC)" />
            <circle cx="360" cy="90" r="14" fill="#f59e0b" />
            <line x1="375" y1="90" x2="410" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrOrC)" />
            <text x="220" y="125" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs font-semibold">p bevart ✓  E_k bevart ✓</text>

            {/* FULLSTENDIG INELASTISK — nederst */}
            <text x="30" y="170" className="fill-current text-xs font-bold">Fullst. inelastisk:</text>
            <text x="100" y="190" textAnchor="middle" className="fill-current text-xs">Før</text>
            <circle cx="80" cy="215" r="14" fill="#3b82f6" />
            <line x1="95" y1="215" x2="135" y2="215" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrBlueC)" />
            <circle cx="160" cy="215" r="14" fill="#f59e0b" />

            <text x="340" y="190" textAnchor="middle" className="fill-current text-xs">Etter (henger sammen)</text>
            <circle cx="310" cy="215" r="14" fill="#3b82f6" opacity="0.8" />
            <circle cx="335" cy="215" r="14" fill="#f59e0b" opacity="0.8" />
            <line x1="350" y1="215" x2="380" y2="215" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrPurpC)" />
            <text x="320" y="250" textAnchor="middle" className="fill-current text-xs">felles v</text>
            <text x="220" y="285" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 text-xs font-semibold">p bevart ✓  E_k IKKE bevart ✗ (maks tap)</text>
            <text x="220" y="305" textAnchor="middle" className="fill-current text-xs">→ varme, lyd, deformasjon</text>

            <defs>
              <marker id="arrBlueC" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
              </marker>
              <marker id="arrOrC" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#f59e0b" />
              </marker>
              <marker id="arrPurpC" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#8b5cf6" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon — hvorfor er det maksimalt tap?</p>
          <p>
            Når objektene henger sammen etter, er det «slutten på jobben» — det er ingen mer relativ bevegelse
            igjen til å produsere deformasjon, varme eller lyd. Systemet er i sin laveste energitilstand
            som er forenlig med bevaring av <InlineLatex latex="p" />. Tenk på det som:
          </p>
          <p className="mt-2 italic">
            «All den kinetiske energien som <em>kunne</em> forsvinne, har forsvunnet.»
          </p>
        </div>
      </TheorySummary>

      <BallisticPendulumVisualizer />

      {/* 8.5 Elastiske kollisjoner */}
      <TheorySummary
        title="8.5 Elastiske kollisjoner"
        mustKnow={[
          "Elastisk: BÅDE p og E_k er bevart → to ligninger, to ukjente",
          "Snarveien: relativ hastighet snur: (v_A1 − v_B1) = −(v_A2 − v_B2)",
          "Like masser: hastighetene bytter (v_A2 = v_B1, v_B2 = v_A1)",
          "Tung treffer lett (m_A >> m_B): A nesten upåvirket, B får ≈2v_A",
          "Lett treffer tung (m_A << m_B): A spretter tilbake med nesten samme fart",
          "Sann elastisk kollisjon i praksis: billiard, atomkjernefysikk",
        ]}
      >
        <p>
          I en elastisk kollisjon er <strong>både</strong> bevegelsesmengde og kinetisk energi bevart.
          Dette gir to ligninger med to ukjente (hastighetene etter støtet):
        </p>

        <FormulaBox
          latex="\begin{cases} m_A v_{A1} + m_B v_{B1} = m_A v_{A2} + m_B v_{B2} \\ \tfrac{1}{2}m_A v_{A1}^2 + \tfrac{1}{2}m_B v_{B1}^2 = \tfrac{1}{2}m_A v_{A2}^2 + \tfrac{1}{2}m_B v_{B2}^2 \end{cases}"
          title="Elastisk 1D-kollisjon — to ligninger"
          variant="gold"
          description="Løs algebraisk. Faktorer ut og bruk at a² − b² = (a+b)(a−b) for å unngå kvadratisk ligning."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Snarvei — relativ hastighet snur!</p>
          <p>
            Ved å kombinere de to likningene algebraisk kan man vise at i en elastisk kollisjon
            snur den <em>relative</em> hastigheten:
          </p>
          <div className="mt-2">
            <InlineLatex latex="v_{A1} - v_{B1} = -(v_{A2} - v_{B2})" />
          </div>
          <p className="mt-2">
            Dette betyr: objektene nærmer seg hverandre like raskt som de fjerner seg etterpå.
            Bruk denne ligningen <em>i stedet for</em> energiligningen — det er mye enklere å løse
            et lineært ligningssystem enn et med kvadrater.
          </p>
        </div>

        <p className="mt-4">De generelle løsningene for 1D elastisk kollisjon (B i ro: <InlineLatex latex="v_{B1}=0" />) er:</p>

        <FormulaBox
          latex="v_{A2} = \frac{m_A - m_B}{m_A + m_B}\,v_{A1} \qquad v_{B2} = \frac{2m_A}{m_A + m_B}\,v_{A1}"
          title="Hastigheter etter elastisk kollisjon (B i ro)"
          variant="blue"
          description="Generelle formler. Husk: disse gjelder kun for 1D elastisk kollisjon der B starter i ro."
        />

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Spesialtilfeller — kan disse utenat!</p>
          <ul className="space-y-3">
            <li>
              <strong>Like masser</strong> (<InlineLatex latex="m_A = m_B" />
              ): Hastighetene <em>bytter</em>!{" "}
              <InlineLatex latex="v_{A2} = 0,\; v_{B2} = v_{A1}" />.
              Newtons vugge demonstrerer dette perfekt.
            </li>
            <li>
              <strong>Tung treffer lett</strong> (<InlineLatex latex="m_A \gg m_B" />
              ): A nesten upåvirket (<InlineLatex latex="v_{A2} \approx v_{A1}" />),
              B spretter unna med nesten dobbel fart{" "}
              (<InlineLatex latex="v_{B2} \approx 2v_{A1}" />).
              Eksempel: tennisball plassert oppå basketball som slippes — tennisballen spretter høyt!
            </li>
            <li>
              <strong>Lett treffer tung</strong> (<InlineLatex latex="m_A \ll m_B" />
              ): A spretter tilbake med nesten samme fart{" "}
              (<InlineLatex latex="v_{A2} \approx -v_{A1}" />), B nesten upåvirket.
              Eksempel: ball mot vegg.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng — elastisk vs. inelastisk</p>
          <p>
            En nyttig størrelse for å karakterisere kollisjoner er{" "}
            <strong>restitusjonskonstanten</strong> (ikke pensum, men nyttig intuisjon):
          </p>
          <div className="mt-2">
            <InlineLatex latex="e = \frac{v_{B2} - v_{A2}}{v_{A1} - v_{B1}}" />
          </div>
          <p className="mt-2">
            For elastisk kollisjon: <InlineLatex latex="e = 1" /> (relativ hastighet bevart).
            For fullstendig inelastisk: <InlineLatex latex="e = 0" /> (begge beveger seg likt etter).
            Virkelige kollisjoner: <InlineLatex latex="0 < e < 1" />.
          </p>
        </div>
      </TheorySummary>

      <CollisionVisualizer />

      {/* 8.6 Massesenter */}
      <TheorySummary
        title="8.6 Massesenter"
        mustKnow={[
          "Massesenterposisjon: r_cm = Σ(m_i·r_i) / M",
          "Massesenteret beveger seg som om all masse og alle ytre krefter er samlet der",
          "ΣF_ytre = M·a_cm — Newtons 2. lov for hele systemet",
          "Indre krefter påvirker IKKE massesenterbevegelsen",
          "Bruk symmetri: massesenter for homogene symmetriske legemer er i geometrisk senter",
          "Eksplosjoner: massesenteret fortsetter på samme bane som om eksplosjonen ikke skjedde",
        ]}
      >
        <p>
          <strong>Massesenteret</strong> (CM) er det massevektede gjennomsnittet av alle
          posisjoner i et system. Det er det punktet der du kan tenke at «all massen er samlet»
          og alle ytre krefter «virker».
        </p>

        <FormulaBox
          latex="\vec{r}_{cm} = \frac{\sum m_i \vec{r}_i}{M} = \frac{m_1\vec{r}_1 + m_2\vec{r}_2 + \cdots}{m_1 + m_2 + \cdots}"
          title="Massesenterets posisjon"
          variant="gold"
          description="M = total masse. I 1D: x_cm = Σ(m_i x_i) / M. I 2D: beregn x_cm og y_cm separat."
        />

        <FormulaBox
          latex="\vec{v}_{cm} = \frac{\sum m_i \vec{v}_i}{M} = \frac{\vec{p}_{\text{total}}}{M}"
          title="Massesenterets hastighet"
          variant="blue"
          description="Massesenteret beveger seg med systemets total-bevegelsesmengde delt på total masse."
        />

        <FormulaBox
          latex="\sum \vec{F}_{\text{ytre}} = M\,\vec{a}_{cm}"
          title="Newtons 2. lov for et system"
          variant="gold"
          description="Massesenteret akselereres KUN av ytre krefter. Indre krefter kansellerer alltid i par (N3L)."
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er massesenteret viktig?</p>
          <p>
            Uansett hva som skjer <em>internt</em> i et system (eksplosjoner, kollisjoner, rotasjon),
            beveger massesenteret seg alltid som om det var en enkelt partikkel med total masse{" "}
            <InlineLatex latex="M" /> utsatt kun for de ytre kreftene. Dette er en enorm forenkling:
            du trenger ikke holde styr på hvert enkelt fragment — bare massesenteret.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi — fyrverkeri!</p>
          <p>
            Et fyrverkeriskudd skytes opp og eksploderer i tusenvis av biter. Alle bitene flyr i
            vilt forskjellige retninger — men <strong>massesenteret</strong> for alle fragmentene
            fortsetter nøyaktig på den parabelformede banen som om eksplosjonen aldri hadde skjedd.
            Den eneste ytre kraften er tyngden, og den endrer ikke dette.
          </p>
          <p className="mt-2">
            Et annet eksempel: en gymnast i lufta kan vippe og snu kroppen, men massesenteret
            følger alltid parabelbanen — ingenting inni kroppen kan endre det.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Sammenheng med kapittel 9 og 10 — Rotasjon</p>
          <p>
            Rotasjonslikningene i kapittel 9–10 forutsetter at du roterer om en akse gjennom
            massesenteret (eller en fast akse). Treghetsmoment <InlineLatex latex="I_{cm}" /> beregnes
            alltid relativt til massesenteret, og parallellakseteoremnet{" "}
            (<InlineLatex latex="I = I_{cm} + Md^2" />) lar deg flytte aksen derfra.
            Alt starter med massesenteret.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil — glem ikke symmetri</p>
          <p>
            For homogene (jevnt fordelte) legemer med symmetri er massesenteret alltid i det
            geometriske senteret. Du trenger <em>ikke</em> å integrere for en homogen stang,
            disk eller kule — massesenteret er i midten. Bruk dette aktivt for å spare tid!
          </p>
          <p className="mt-2">
            En vanlig feil: å plassere massesenteret mellom to ulike masser uten å vekte riktig.
            Massesenteret er <strong>alltid nærmere den tyngste massen</strong>.
          </p>
        </div>

        <p className="mt-4">
          For et <strong>to-legeme-system</strong> (som er veldig vanlig på eksamen) er massesenteret:
        </p>

        <FormulaBox
          latex="x_{cm} = \frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}"
          title="Massesenter — to legemer"
          variant="blue"
          description="Kontrollsjekk: hvis m₁ = m₂ er x_cm = (x₁ + x₂)/2 (midt mellom dem). Korrekt!"
        />

        {/* SVG: Massesenter mellom to ulike masser */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 440 160" className="w-full max-w-lg">
            <text x="220" y="20" textAnchor="middle" className="fill-current text-sm font-semibold">Massesenter — nærmere den tyngste</text>
            {/* Stang */}
            <line x1="60" y1="90" x2="380" y2="90" stroke="currentColor" strokeWidth="3" />
            {/* m1 = 1 kg, posisjon 60 */}
            <circle cx="80" cy="90" r="10" fill="#3b82f6" />
            <text x="80" y="115" textAnchor="middle" className="fill-current text-xs">m₁ = 1 kg</text>
            <text x="80" y="130" textAnchor="middle" className="fill-current text-xs">x = 0</text>
            {/* m2 = 4 kg, posisjon 360 */}
            <circle cx="360" cy="90" r="18" fill="#ef4444" />
            <text x="360" y="115" textAnchor="middle" className="fill-current text-xs">m₂ = 4 kg</text>
            <text x="360" y="130" textAnchor="middle" className="fill-current text-xs">x = L</text>
            {/* Massesenter ved x = 4L/5 fra venstre → 80 + (360-80)*(4/5) = 304 */}
            <line x1="304" y1="70" x2="304" y2="110" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
            <polygon points="304,70 298,80 310,80" fill="#10b981" />
            <text x="304" y="65" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs font-bold">CM</text>
            <text x="304" y="148" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-xs">x_cm = 4L/5</text>
            <text x="220" y="50" textAnchor="middle" className="fill-current text-xs italic">nærmere tyngste masse</text>
          </svg>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Sammenheng — N2L for systemer → partikkel-analogi</p>
          <p>
            Dette er en DYP innsikt: når du studerer bevegelsen til et komplisert system (mange partikler,
            stiv kropp, væske), kan du ofte glemme alle indre detaljer og bare spørre «hva gjør massesenteret?».
            Massesenteret oppfører seg <em>nøyaktig</em> som en enkelt partikkel med hele systemets masse,
            utsatt for summen av alle ytre krefter.
          </p>
          <p className="mt-2">
            Dette er hvorfor vi i tidligere kapitler kunne behandle baller, klosser og til og med mennesker
            som «partikler» — det var egentlig massesenteret vi fulgte. Nå har du det formelle grunnlaget
            for den forenklingen.
          </p>
        </div>
      </TheorySummary>

      {/* Eksterne lenker */}
      <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-6">
        <p className="font-semibold text-sm mb-2">Videre lesning — bevegelsesmengde og kollisjoner</p>
        <ul className="text-sm space-y-1">
          <li>
            •{" "}
            <a href="https://www.khanacademy.org/science/physics/linear-momentum" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              Khan Academy — Linear momentum and collisions
            </a>{" "}
            (grundig gjennomgang med video-eksempler)
          </li>
          <li>
            •{" "}
            <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/mom.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              HyperPhysics — Momentum & Collisions
            </a>{" "}
            (kompakte oppsummeringer, bra for repetisjon)
          </li>
          <li>
            •{" "}
            <a href="https://www.youtube.com/@3blue1brown" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              3Blue1Brown — Visualisering av pi fra kollisjoner
            </a>{" "}
            (mesterlig visuell intuisjon)
          </li>
          <li>
            •{" "}
            <a href="https://www.youtube.com/@veritasium" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              Veritasium — Newtons vugge og elastiske kollisjoner
            </a>
          </li>
          <li>
            •{" "}
            <a href="https://www.feynmanlectures.caltech.edu/I_10.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
              Feynman Lectures — Conservation of Momentum (Ch. 10)
            </a>{" "}
            (original, pedagogisk gull)
          </li>
        </ul>
      </div>
    </div>
  );
}
