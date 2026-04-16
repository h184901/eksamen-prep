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
      </TheorySummary>
    </div>
  );
}
