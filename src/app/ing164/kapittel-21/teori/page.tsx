"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { CoulombCalculator, ElectricFieldVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teori — Elektrisk ladning og felt</h2>

      {/* 21.1 Elektrisk ladning */}
      <TheorySummary
        title="21.1 Elektrisk ladning"
        mustKnow={[
          "Det finnes to typer ladning: positiv og negativ",
          "Like ladninger frastøter, ulike tiltrekker",
          "Elektrisk ladning er bevart i lukkede systemer",
          "Ladning er kvantisert: q = n · e",
          "Elementærladningen e = 1,60 · 10⁻¹⁹ C",
        ]}
      >
        <p>
          All materie er bygd opp av partikler med elektrisk ladning.
          Det finnes <strong>to typer</strong> elektrisk ladning: <strong>positiv</strong> og <strong>negativ</strong>.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Grunnregel</p>
          <p><strong>Like ladninger frastøter</strong> hverandre med elektriske krefter.</p>
          <p><strong>Ulike ladninger tiltrekker</strong> hverandre med elektriske krefter.</p>
        </div>

        <p className="mt-4">Materiens byggesteiner:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm my-2 border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Partikkel</th>
                <th className="text-left py-2 pr-4">Masse</th>
                <th className="text-left py-2 pr-4">Ladning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Proton</td>
                <td className="py-2 pr-4"><InlineLatex latex="m_p = 1{,}67 \cdot 10^{-27}\;\text{kg}" /></td>
                <td className="py-2 pr-4 text-red-600 dark:text-red-400">+e (positiv)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4">Elektron</td>
                <td className="py-2 pr-4"><InlineLatex latex="m_e = 9{,}11 \cdot 10^{-31}\;\text{kg}" /></td>
                <td className="py-2 pr-4 text-blue-600 dark:text-blue-400">−e (negativ)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Nøytron</td>
                <td className="py-2 pr-4"><InlineLatex latex="m_n = 1{,}675 \cdot 10^{-27}\;\text{kg}" /></td>
                <td className="py-2 pr-4">0 (nøytral)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4">
          <strong>Protoner og nøytroner</strong> er bygd opp av 3 kvarker.
          Atomer er normalt elektrisk nøytrale (like mange protoner og elektroner).
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Ioner</p>
          <p>Fjernes et elektron → <strong>positivt</strong> ladet ion.</p>
          <p>Tilføres et elektron → <strong>negativt</strong> ladet ion.</p>
        </div>

        <p className="mt-4">
          <strong>Bevaringsloven:</strong> I et lukket system er den totale mengden elektrisk ladning bevart.
          Ladning kan flyttes mellom objekter, men kan ikke skapes eller ødelegges.
        </p>
        <p className="mt-2">
          <strong>Kvantisering:</strong> Elektrisk ladning er kvantisert — den opptrer alltid som et
          heltallsmultiplum av elementærladningen <InlineLatex latex="e = 1{,}60 \cdot 10^{-19}\;\text{C}" />.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor fungerer det slik?</p>
          <p className="text-sm">
            Elektrisk ladning er en <strong>fundamental egenskap</strong> ved materie, akkurat som masse.
            Men mens masse bare kommer i én «type» (positiv), finnes ladning i to typer.
            Det er denne dualiteten som gjør elektrisitet så rik — den gir oss både tiltrekning og frastøtning,
            noe gravitasjonen aldri kan.
          </p>
          <p className="text-sm mt-2">
            <strong>Hvorfor er ladning bevart?</strong> Tenk på det slik: elektroner forsvinner ikke —
            de flytter seg fra ett sted til et annet. Når du gnir en ballong mot håret, river du ikke
            elektroner i stykker. Du dytter dem fra håret over til ballongen. Håret blir positivt, ballongen
            negativt — men totalen er uendret.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på ladning som penger i et lukket system. Du kan flytte penger fra lomme til lomme (ladningsoverføring),
            men du kan ikke trylle dem frem eller få dem til å forsvinne. Totalsummen er alltid den samme.
            Positive ladninger er som inntekter, negative som utgifter — de kan balansere hverandre,
            men ingen av dem forsvinner.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Protoner flyttes ved ladning»</strong> — Feil! I faste stoffer er det nesten alltid <em>elektronene</em> som beveger seg. Protoner sitter fast i atomkjernen.</li>
            <li>• <strong>«Et nøytralt objekt har ingen ladning»</strong> — Feil! Det har like mye positiv og negativ ladning. De kansellerer hverandres effekt utad.</li>
            <li>• <strong>«Ladning kan skapes»</strong> — Nei! Ladning er alltid bevart. Selv i partikkelreaksjoner (f.eks. par-produksjon) er total ladning null før og etter.</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 21.3 Coulombs lov */}
      <TheorySummary
        title="21.3 Coulombs lov"
        mustKnow={[
          "Coulombs lov: F = k|q₁q₂|/r²",
          "Kraften virker langs linjen mellom ladningene",
          "Superposisjon: Resultantkraften er vektorsummen av alle kreftene",
          "Kunne bruke Coulombs lov med vektorkomponenter",
        ]}
      >
        <p>
          SI-enheten for elektrisk ladning er <strong>coulomb (C)</strong>.
          Elementærladningen er:
        </p>
        <div className="my-2">
          <InlineLatex latex="q_p = +e = 1{,}60 \cdot 10^{-19}\;\text{C}" /> (proton)
        </div>
        <div className="my-2">
          <InlineLatex latex="q_e = -e = -1{,}60 \cdot 10^{-19}\;\text{C}" /> (elektron)
        </div>

        <p className="mt-4">
          Den elektriske kraften mellom to punktladninger er gitt av <strong>Coulombs lov</strong>:
        </p>

        <FormulaBox
          latex="F_e = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 q_2|}{r^2}"
          title="Coulombs lov"
          variant="gold"
          description="Kraften mellom to punktladninger. Absoluttverdien gir størrelsen; retningen bestemmes av ladningenes fortegn."
        />

        <p className="mt-2">
          der <InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{C}^2/\text{Nm}^2" /> er
          vakuumpermittiviteten, og <InlineLatex latex="k = \frac{1}{4\pi\varepsilon_0} = 8{,}99 \cdot 10^9\;\text{Nm}^2/\text{C}^2" />.
        </p>

        {/* SVG: Coulombkraft mellom to ladninger — like og ulike */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-md">
            <defs>
              <marker id="arrRed21" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
              </marker>
              <marker id="arrBlue21" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
              </marker>
            </defs>
            {/* Like ladninger: frastøtning */}
            <text x="100" y="25" textAnchor="middle" className="fill-current text-sm font-semibold">Like ladninger (frastøter)</text>
            <circle cx="50" cy="75" r="14" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
            <text x="50" y="80" textAnchor="middle" className="fill-current text-sm font-bold">+</text>
            <circle cx="150" cy="75" r="14" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
            <text x="150" y="80" textAnchor="middle" className="fill-current text-sm font-bold">+</text>
            <line x1="50" y1="75" x2="20" y2="75" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrRed21)" />
            <line x1="150" y1="75" x2="180" y2="75" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrRed21)" />
            <text x="100" y="105" textAnchor="middle" className="fill-current text-xs">r</text>
            <line x1="60" y1="95" x2="140" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

            {/* Ulike ladninger: tiltrekning */}
            <text x="300" y="25" textAnchor="middle" className="fill-current text-sm font-semibold">Ulike ladninger (tiltrekker)</text>
            <circle cx="250" cy="75" r="14" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
            <text x="250" y="80" textAnchor="middle" className="fill-current text-sm font-bold">+</text>
            <circle cx="350" cy="75" r="14" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="2" />
            <text x="350" y="80" textAnchor="middle" className="fill-current text-sm font-bold">−</text>
            <line x1="250" y1="75" x2="285" y2="75" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrRed21)" />
            <line x1="350" y1="75" x2="315" y2="75" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrBlue21)" />
            <text x="300" y="105" textAnchor="middle" className="fill-current text-xs">r</text>

            {/* Superposisjon: tre ladninger */}
            <text x="200" y="145" textAnchor="middle" className="fill-current text-sm font-semibold">Superposisjon: F_tot = F₁ + F₂ (vektorsum)</text>
            <circle cx="100" cy="200" r="12" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
            <text x="100" y="204" textAnchor="middle" className="fill-current text-xs font-bold">q₁</text>
            <circle cx="300" cy="200" r="12" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
            <text x="300" y="204" textAnchor="middle" className="fill-current text-xs font-bold">q₂</text>
            <circle cx="200" cy="175" r="12" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" strokeWidth="2" />
            <text x="200" y="179" textAnchor="middle" className="fill-current text-xs font-bold">q₃</text>
            {/* F1 på q3 */}
            <line x1="200" y1="175" x2="240" y2="165" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrRed21)" />
            <text x="248" y="163" className="fill-current text-xs" fill="#ef4444">F₁</text>
            {/* F2 på q3 */}
            <line x1="200" y1="175" x2="160" y2="165" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrBlue21)" />
            <text x="140" y="163" className="fill-current text-xs" fill="#3b82f6">F₂</text>
            <text x="200" y="230" textAnchor="middle" className="fill-current text-[10px] italic">Kraften er langs linjen mellom ladningene</text>
          </svg>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Coulombs lov med vektorer</p>
          <p className="text-sm">
            Full vektorform: <InlineLatex latex="\vec{F}_{1\to 2} = \frac{1}{4\pi\varepsilon_0}\frac{q_1 q_2}{r^2}\hat{r}_{1\to 2}" />.
            Her er <InlineLatex latex="\hat{r}_{1\to 2}" /> enhetsvektoren som peker FRA ladning 1 MOT
            ladning 2 — altså retningen en positiv q₂ ville blitt skjøvet hvis q₁ også var positiv.
          </p>
          <ul className="text-sm mt-2 space-y-1">
            <li>• <strong>Fortegnsbruk:</strong> Hvis <InlineLatex latex="q_1 q_2 > 0" /> (like) → kraft langs <InlineLatex latex="\hat{r}" /> (frastøtning)</li>
            <li>• Hvis <InlineLatex latex="q_1 q_2 < 0" /> (ulike) → kraft motsatt <InlineLatex latex="\hat{r}" /> (tiltrekning)</li>
            <li>• <strong>Når bruker du superposisjon?</strong> Når det er 3 eller flere ladninger — regn ut hver kraft for seg, dekomponér i x/y, summer hver komponent.</li>
            <li>• <strong>Enhetsvektor-tips:</strong> <InlineLatex latex="\hat{r} = \vec{r}/|\vec{r}|" />. Bruk <InlineLatex latex="\hat{r} = (\cos\theta,\sin\theta)" /> når du kjenner vinkelen.</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: Klassiske Coulomb-tabber</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Fortegn i formelen:</strong> Bruker du <InlineLatex latex="|q_1 q_2|" /> får du bare
              <em> størrelsen</em> av kraften. Du må selv bestemme retningen ut fra fortegnene (like = frastøter, ulike = tiltrekker). Alternativt: putt inn fortegnene direkte i <InlineLatex latex="q_1 q_2" /> og bruk <InlineLatex latex="\hat{r}" /> konsekvent.
            </li>
            <li>
              <strong>Avstanden r er en LENGDE, ikke en vektor-komponent:</strong> Hvis to ladninger ligger i (0, 0) og (3, 4), er
              <InlineLatex latex="r = \sqrt{3^2 + 4^2} = 5" />, ikke 3 eller 4. Bruk Pytagoras!
            </li>
            <li>
              <strong>Husk kvadratet:</strong> dobler du avstanden → kraften blir 1/4, ikke 1/2. Avstanden kvadreres, ikke lineariseres.
            </li>
            <li>
              <strong>Enheter:</strong> r i oppgaven er ofte i cm eller mm. Konverter til meter FØR du putter inn i formelen.
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Kjennetegn i oppgaveteksten — «bruk Coulomb!»</p>
          <ul className="text-sm space-y-1">
            <li>• Ordet <strong>«punktladning»</strong> eller <strong>«ladde partikler»</strong> nevnes</li>
            <li>• Spørsmål om <strong>«kraften på»</strong> en ladning fra andre ladninger</li>
            <li>• Oppgaven beskriver <strong>flere ladninger i en trekant, firkant eller på akse</strong> → superposisjon</li>
            <li>• «Ligevektsposisjon» eller «hvor er total kraft null» → superposisjon med <InlineLatex latex="\vec{F}_\text{tot} = 0" /></li>
            <li>• Ladninger henger i snor (pendelkonfigurasjon) → Coulomb + krefter fra snor/gravitasjon</li>
          </ul>
        </div>

        {/* Interaktiv visualisering innblandet i teorien */}
        <CoulombCalculator />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Viktig om Coulombs lov</p>
          <ul className="space-y-1 text-sm">
            <li>• Kraften virker langs linjen mellom de to ladningene</li>
            <li>• Like ladninger → frastøtende kraft (bort fra hverandre)</li>
            <li>• Ulike ladninger → tiltrekkende kraft (mot hverandre)</li>
            <li>• Kraft er en vektor — har både størrelse og retning</li>
            <li>• Newtons 3. lov gjelder: Kraften på q₁ fra q₂ = −(kraften på q₂ fra q₁)</li>
          </ul>
        </div>

        <p className="mt-4">
          <strong>Superposisjonsprinsippet:</strong> Når flere enn to ladninger er involvert,
          er den totale kraften på en ladning <em>vektorsummen</em> av kreftene fra
          alle de andre ladningene:
        </p>
        <FormulaBox
          latex="\vec{F}_{\text{tot}} = \vec{F}_1 + \vec{F}_2 + \vec{F}_3 + \cdots"
          variant="blue"
          description="Superposisjon: Beregn kraften fra hver ladning separat, og adder vektorielt."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor 1/r² ?</p>
          <p className="text-sm">
            Coulombs lov har nøyaktig samme matematiske form som Newtons gravitasjonslov — begge faller av med <InlineLatex latex="1/r^2" />.
            Dette er ikke tilfeldig! Tenk deg at en ladning sender ut «påvirkningskraft» i alle retninger likt.
            Denne kraften fordeler seg over en kuleflate med areal <InlineLatex latex="4\pi r^2" />.
            Jo lenger bort du er, jo større er kuleflaten — og din andel av den totale påvirkningen
            synker som <InlineLatex latex="1/r^2" />.
          </p>
          <p className="text-sm mt-2">
            <strong>Fysisk bilde:</strong> Se for deg en lyspære i et mørkt rom. Lysintensiteten avtar med
            <InlineLatex latex="1/r^2" /> fordi lyset spres utover en stadig større kuleflate.
            Elektrisk kraft «spres» på nøyaktig samme måte.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Coulombs lov er «gravitasjonen for ladninger». Akkurat som to masser tiltrekker hverandre med
            <InlineLatex latex="F = Gm_1m_2/r^2" />, påvirker to ladninger hverandre med
            <InlineLatex latex="F = kq_1q_2/r^2" />.
            Den store forskjellen: gravitasjon kan <em>bare</em> tiltrekke, mens elektrisk kraft kan
            både tiltrekke og frastøte.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Absoluttverdien gjelder alltid»</strong> — I Coulombs lov bruker vi <InlineLatex latex="|q_1 q_2|" /> for å finne <em>størrelsen</em> på kraften. Retningen bestemmer vi <em>separat</em> ut fra fortegnene.</li>
            <li>• <strong>«Avstand r er alltid oppgitt i meter»</strong> — Sjekk enhetene! Oppgaver gir ofte avstand i cm eller mm. Husk å konvertere til meter.</li>
            <li>• <strong>«Superposisjon betyr å legge sammen tallverdiene»</strong> — Nei! Du må legge sammen <em>vektorielt</em>. Bryt kreftene i x- og y-komponenter, summer hver komponent, og finn resultanten.</li>
            <li>• <strong>«Kraften avtar lineært med avstand»</strong> — Nei, den avtar med <em>kvadratet</em> av avstanden. Dobler du avstanden, faller kraften til en fjerdedel.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips for Coulomb-oppgaver</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Tegn alltid en figur</strong> med alle ladningene og avstandene markert</li>
            <li>• <strong>Velg koordinatsystem</strong> — plasser origo i ladningen du beregner kraften på</li>
            <li>• <strong>Beregn én kraft om gangen</strong> — finn størrelse med Coulombs lov, bestem retning ut fra fortegn</li>
            <li>• <strong>Dekomponér i x og y</strong> — bruk trigonometri: <InlineLatex latex="F_x = F\cos\theta,\; F_y = F\sin\theta" /></li>
            <li>• <strong>Summer komponentene</strong> — <InlineLatex latex="F_{\text{tot},x} = \Sigma F_x" /> og <InlineLatex latex="F_{\text{tot},y} = \Sigma F_y" /></li>
            <li>• <strong>Finn resultant</strong> — <InlineLatex latex="F = \sqrt{F_x^2 + F_y^2}" /> og <InlineLatex latex="\theta = \arctan(F_y/F_x)" /></li>
          </ul>
        </div>
      </TheorySummary>

      {/* 21.4 Elektrisk felt */}
      <TheorySummary
        title="21.4 Elektrisk felt og elektriske krefter"
        mustKnow={[
          "Definisjon av E-felt: E = F₀/q₀",
          "E-felt fra punktladning: E = kq/r²",
          "Retning: bort fra positiv, mot negativ ladning",
          "E-felt er uniformt mellom parallelle plater",
          "Kraft på ladning i E-felt: F = qE",
        ]}
      >
        <p>
          Et område hvor elektriske ladninger påvirkes av elektriske krefter kaller vi
          et <strong>elektrisk felt</strong>. Feltet eksisterer i rommet rundt en ladning, uavhengig av
          om det er andre ladninger til stede.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Definisjon</p>
          <p>
            <strong>Elektrisk feltstyrke</strong> i et punkt P er definert som kraften per ladningsenhet
            på en positiv testladning <InlineLatex latex="q_0" /> plassert i P:
          </p>
        </div>

        <FormulaBox
          latex="\vec{E} = \frac{\vec{F}_0}{q_0}"
          title="Definisjon av elektrisk felt"
          variant="gold"
          description="E-feltet har enhet N/C (eller V/m). Retningen er den retningen kraften virker på en positiv testladning."
        />

        <p className="mt-4">
          For en <strong>punktladning q</strong> i avstand r:
        </p>
        <FormulaBox
          latex="\vec{E} = \frac{1}{4\pi\varepsilon_0} \frac{q}{r^2} \hat{r}"
          title="E-felt fra punktladning"
          variant="gold"
          description="r̂ er enhetsvektoren som peker bort fra ladningen q. For positiv q peker feltet bort; for negativ q peker feltet mot ladningen."
        />

        {/* Interaktiv visualisering innblandet i teorien */}
        <ElectricFieldVisualizer />

        <p className="mt-4">
          <strong>Retning:</strong> Elektrisk feltstyrke har alltid samme retning som kraften
          på en <em>tenkt positiv</em> ladning:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Positiv kilde → E peker <strong>bort fra</strong> ladningen</li>
          <li>Negativ kilde → E peker <strong>mot</strong> ladningen</li>
        </ul>

        <p className="mt-4">
          <strong>Kraft på en ladning i et E-felt:</strong>
        </p>
        <FormulaBox
          latex="\vec{F}_e = q\vec{E}"
          variant="blue"
          description="Positiv ladning: kraften virker i feltretningen. Negativ ladning: kraften virker motsatt feltretningen."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Uniformt felt (parallelle plater)</p>
          <p>
            Mellom to store parallelle plater med motsatt ladning er det elektriske feltet
            <strong> uniformt</strong> — det har samme verdi og retning overalt. Feltet peker fra positiv
            til negativ plate. Her kan vi bruke Newtons 2. lov med konstant akselerasjon:
          </p>
          <div className="mt-2">
            <InlineLatex latex="a = \frac{qE}{m}" />
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor trenger vi feltkonseptet?</p>
          <p className="text-sm">
            Du lurer kanskje: «Hvorfor ikke bare bruke Coulombs lov direkte?» Grunnen er at <strong>feltet
            eksisterer uavhengig av testladningen</strong>. Tenk på det slik: en ladning Q endrer rommet rundt seg —
            den skaper et «kraftfelt» overalt. Hvis du senere plasserer en ny ladning q i dette rommet,
            kjenner den kraften <InlineLatex latex="F = qE" /> øyeblikkelig.
          </p>
          <p className="text-sm mt-2">
            Feltideen er spesielt viktig når ting endrer seg over tid (elektromagnetiske bølger).
            Feltet kan bære energi og bevegelsesmengde — det er ikke bare et matematisk triks,
            det er en fysisk realitet.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på E-feltet som <strong>vind</strong>. Vinden eksisterer uavhengig av om du holder opp et seil
            eller ikke. Men når du holder opp seilet, kjenner du kraften. Et større seil (større ladning)
            kjenner mer kraft, men selve vinden (feltet) er den samme. E-feltet er «vinden» som ladninger skaper
            i rommet rundt seg.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«E-feltet avhenger av testladningen»</strong> — Nei! <InlineLatex latex="E = F/q_0" />. Dobbler du <InlineLatex latex="q_0" />, dobbles også F, men E forblir den samme.</li>
            <li>• <strong>«E = 0 betyr ingen ladning i nærheten»</strong> — Feil! E kan være null der bidragene fra flere ladninger kansellerer hverandre.</li>
            <li>• <strong>«En negativ ladning i et E-felt beveger seg i feltretningen»</strong> — Nei! <InlineLatex latex="\vec{F} = q\vec{E}" />. Negativt q betyr at kraften peker <em>motsatt</em> av feltet.</li>
            <li>• <strong>«Feltlinjene viser banen til en partikkel»</strong> — Bare hvis partikkelen starter fra ro. En partikkel med startfart kan bevege seg på tvers av feltlinjene.</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: E-felt av punktladning bruker AVSTANDEN r</p>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Ikke bland avstand med koordinat:</strong> En ladning i origo gir feltet i punktet (x, y) med
              styrke <InlineLatex latex="E = kq/r^2" /> der <InlineLatex latex="r = \sqrt{x^2+y^2}" />.
              <em> Ikke</em> del på y eller x alene — del på <InlineLatex latex="r^2" />.
            </li>
            <li>
              <strong>Retning via enhetsvektor:</strong> <InlineLatex latex="\hat{r} = (x,y)/r" />. For å finne
              x- og y-komponenter av feltet: <InlineLatex latex="E_x = E\cdot x/r" />, <InlineLatex latex="E_y = E\cdot y/r" />.
            </li>
            <li>
              <strong>Null-felt-punkter eksisterer:</strong> Mellom to like ladninger er E = 0 på midtpunktet. Mellom
              ulike ladninger er E ALDRI null mellom dem — men kan være null utenfor den minste ladningen.
            </li>
            <li>
              <strong>Tegn på q i formelen:</strong> Hvis q er negativ, peker feltet <em>mot</em> ladningen, ikke bort.
              Enklest: finn størrelsen <InlineLatex latex="|E|" /> og bestem retningen separat.
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Praktiske tips for E-felt-oppgaver</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Velg koordinatsystem</strong> — legg x-aksen langs symmetriaksen når du kan</li>
            <li>• <strong>Bruk superposisjon</strong> — finn E fra hver ladning separat, dekomponér, og summer</li>
            <li>• <strong>Sjekk retningen</strong> — E peker bort fra +, mot −. Tegn pilene!</li>
            <li>• <strong>Utnytt symmetri</strong> — hvis to ladninger er symmetrisk plassert, kanselleres ofte en komponent</li>
            <li>• <strong>Uniformt felt:</strong> Mellom parallelle plater er <InlineLatex latex="E = V/d" /> (konstant). Bruk kinematikk med <InlineLatex latex="a = qE/m" /></li>
          </ul>
        </div>
      </TheorySummary>

      {/* 21.6 Elektriske feltlinjer */}
      <TheorySummary
        title="21.6 Elektriske feltlinjer"
        mustKnow={[
          "Feltlinjer starter i positive og slutter i negative ladninger",
          "Feltlinjene krysser aldri hverandre",
          "Tettheten av feltlinjer viser feltets styrke",
          "E-feltet er tangent til feltlinjen i hvert punkt",
        ]}
      >
        <p>
          En elektrisk feltlinje er en tenkt kurve som er <strong>parallell til det
          elektriske feltet i alle punkter langs kurven</strong>. De gir oss et visuelt bilde
          av feltets retning og styrke.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Regler for feltlinjer</p>
          <ul className="space-y-1.5 text-sm">
            <li>• Feltlinjene <strong>krysser aldri</strong> hverandre</li>
            <li>• Feltlinjene <strong>starter</strong> i positiv ladning og <strong>slutter</strong> i negativ ladning</li>
            <li>• <strong>Tettheten</strong> på feltlinjene viser feltets styrke — tettere linjer = sterkere felt</li>
            <li>• En ladet partikkel som slippes fra ro vil følge en bane som er en feltlinje</li>
          </ul>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor bruker vi feltlinjer?</p>
          <p className="text-sm">
            E-feltet er et <strong>vektorfelt</strong> — det har en verdi og retning i hvert eneste punkt i rommet.
            Det er umulig å tegne en pil i hvert punkt, så Michael Faraday innførte feltlinjer som en
            genial visuell forenkling. Linjene viser retning (følg pilene) og styrke (tetthet).
          </p>
          <p className="text-sm mt-2">
            <strong>Visuelt bilde:</strong> Se for deg at feltlinjene er som strømningslinjer i en elv.
            Vannet flyter fra høyt terreng (positiv ladning) til lavt terreng (negativ ladning).
            Der elven er smal, strømmer vannet raskt (sterkt felt). Der elven er bred, er strømmen roligere (svakt felt).
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Feltlinjer er som <strong>vindkart</strong> i meteorologi. Linjene viser vindretningen,
            og der linjene ligger tett, blåser det hardt. Ingen vindlinjer krysser hverandre —
            vinden kan ikke blåse i to retninger samtidig i samme punkt. Nøyaktig det samme gjelder
            for elektriske feltlinjer.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Feltlinjer er fysiske strenger»</strong> — Nei! De er et visualiseringsverktøy. Det faktiske feltet er et kontinuerlig vektorfelt.</li>
            <li>• <strong>«Ladninger beveger seg langs feltlinjene»</strong> — Bare hvis de starter fra ro. En ladning med initiell fart kan krysse feltlinjer.</li>
            <li>• <strong>«Antall feltlinjer fra en ladning er fysisk bestemt»</strong> — Nei, antallet er vilkårlig. Men <em>forholdet</em> mellom antall linjer fra ulike ladninger reflekterer forholdet mellom ladningene.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Slik tegner du feltlinjer</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Start</strong> i positive ladninger, <strong>slutt</strong> i negative</li>
            <li>• Tegn <strong>like mange linjer</strong> fra ladninger med lik størrelse</li>
            <li>• Linjene skal <strong>aldri krysse</strong> hverandre</li>
            <li>• Linjene står <strong>vinkelrett på overflaten</strong> til en leder</li>
            <li>• <strong>Tettere linjer = sterkere felt</strong></li>
            <li>• For en dipol: linjene kurver fra + til −, og er tettest mellom ladningene</li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
