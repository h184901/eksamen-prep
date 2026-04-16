"use client";

import TheorySummary from "@/components/TheorySummary";
import InlineLatex from "@/components/InlineLatex";
import { TorqueCalculator, RollingWithoutSlipping, AngularMomentumVisualizer } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      <TheorySummary
        title="10.1 Kraftmoment (dreiemoment / torque)"
        mustKnow={[
          "τ = rF sin φ — kraftmoment avhenger av kraft, arm og vinkel",
          "Alternativt: τ = (momentarm) × F, der momentarm = r sin φ",
          "Fortegn: mot klokka = positiv, med klokka = negativ",
          "Kraftmoment er rotasjonens svar på kraft",
        ]}
        defaultOpen
      >
        <p className="mb-3">
          <strong>Kraftmoment</strong> (torque) <InlineLatex latex="\tau" /> er det som får et legeme til å rotere, akkurat som kraft <InlineLatex latex="F" /> får det til å akselerere lineært. Definisjonen er:
        </p>
        <p className="mb-3 text-center">
          <InlineLatex latex="\tau = rF\sin\phi" />
        </p>
        <p className="mb-3">
          der <InlineLatex latex="r" /> er avstanden fra rotasjonsaksen til angrepspunktet, <InlineLatex latex="F" /> er kraften, og <InlineLatex latex="\phi" /> er vinkelen mellom <InlineLatex latex="\vec{r}" /> og <InlineLatex latex="\vec{F}" />.
        </p>
        <p className="mb-4">
          <strong>Nøkkelinnsikt:</strong> Bare kraftkomponenten <em>vinkelrett</em> på armen bidrar til rotasjon. En kraft langs armen (φ = 0° eller 180°) gir null dreiemoment — tenk dørhåndtak vs. å dytte rett mot hengslet!
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Hvorfor sin φ?</p>
          <p className="text-sm">
            Bare den <strong>vinkelrette</strong> komponenten av kraften skaper rotasjon. Komponenten langs armen drar i armens retning uten å rotere noe som helst. <InlineLatex latex="\tau = rF\sin\phi" /> fanger opp nettopp dette: kraftmomentet er størst når <InlineLatex latex="F \perp r" /> (φ = 90°, sin φ = 1) og null når <InlineLatex latex="F \parallel r" /> (φ = 0°, sin φ = 0). Tenk på det som at bare den «roterende» delen av kraften teller.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">Hverdagsanalogi: Dør og skiftenøkkel</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>Dør:</strong> Du skyver vinkelrett på døren, langt fra hengslet — dette gir maksimalt kraftmoment (stor r, sin 90° = 1). Prøv å dytte nær hengslet eller langs dørflaten — ingenting skjer!</li>
            <li><strong>Skiftenøkkel:</strong> En lengre nøkkel (større r) gjør det lettere å løsne en bolt. Derfor er det kraftmoment — ikke bare kraft — som avgjør om du klarer å skru. En liten kraft langt ut kan gi samme τ som en stor kraft nær aksen.</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-800 dark:text-red-300 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>«Kraftmoment er det samme som kraft»</strong> — Nei! Kraftmoment har enhet N·m, kraft har enhet N. De er fundamentalt forskjellige størrelser.</li>
            <li><strong>«Større kraft betyr alltid større kraftmoment»</strong> — Ikke hvis momentarmen er null! En gigantisk kraft rett gjennom rotasjonsaksen gir τ = 0.</li>
            <li><strong>«Fortegnet er uviktig»</strong> — Feil! Mot klokka = positivt, med klokka = negativt. Du MÅ holde styr på fortegn når du summerer kraftmomenter.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Sammenheng med kap 4–5</p>
          <p className="text-sm">
            Kraftmoment er til rotasjon det kraft er til lineær bevegelse. Sammenligningen <InlineLatex latex="\tau = rF\sin\phi" /> vs. <InlineLatex latex="F" /> viser at rotasjonsfysikken legger til en ekstra faktor: avstand fra aksen og vinkel. Alt du lærte om kraftkomponenter i kap 4–5 gjelder fortsatt — du dekomponerer fortsatt krafter, bare nå er det den vinkelrette komponenten som betyr noe for rotasjon.
          </p>
        </div>

        {/* SVG: tau = rF sin phi — moment-arm visualisering */}
        <div className="my-4 flex justify-center">
          <svg viewBox="0 0 420 260" className="w-full max-w-md">
            {/* Rotasjonsakse */}
            <circle cx="80" cy="180" r="6" fill="#8b5cf6" />
            <text x="80" y="205" textAnchor="middle" className="fill-current text-xs">Akse O</text>

            {/* r-vektoren */}
            <line x1="80" y1="180" x2="280" y2="100" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowBlue10)" />
            <text x="170" y="130" className="fill-current text-xs" fill="#3b82f6">r</text>

            {/* F-vektor (i punktet) */}
            <line x1="280" y1="100" x2="340" y2="40" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed10)" />
            <text x="325" y="55" className="fill-current text-xs" fill="#ef4444">F</text>

            {/* Komponent: F sin phi (vinkelrett på r) */}
            <line x1="280" y1="100" x2="325" y2="15" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowGreen10)" />
            <text x="345" y="30" className="fill-current text-xs" fill="#10b981">F sin φ</text>

            {/* Moment-armen: r sin phi */}
            <line x1="80" y1="180" x2="160" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
            <text x="95" y="115" className="fill-current text-xs" fill="#f59e0b">arm = r sin φ</text>

            {/* Vinkelen phi ved punktet */}
            <path d="M 300 93 A 25 25 0 0 1 295 118" fill="none" stroke="#6b7280" strokeWidth="1.5" />
            <text x="310" y="115" className="fill-current text-xs">φ</text>

            <defs>
              <marker id="arrowBlue10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
              </marker>
              <marker id="arrowRed10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
              </marker>
              <marker id="arrowGreen10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#10b981" />
              </marker>
            </defs>
            <text x="210" y="245" textAnchor="middle" className="fill-current text-xs">τ = rF sin φ = (arm) · F = r · (F⊥)</text>
          </svg>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">To ekvivalente tolkninger</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>Moment-arm-tolkning:</strong> <InlineLatex latex="\tau = F \cdot (r\sin\phi) = F \cdot \ell" />. Moment-armen <InlineLatex latex="\ell = r\sin\phi" /> er den korteste avstanden fra aksen til <em>kraftens virkelinje</em>. Forleng kraften som en rett linje og dropp en loddrett linje fra aksen til den.</li>
            <li><strong>Komponent-tolkning:</strong> <InlineLatex latex="\tau = r \cdot (F\sin\phi) = r \cdot F_\perp" />. Bare kraftkomponenten vinkelrett på <InlineLatex latex="\vec{r}" /> vrir om aksen. Komponenten langs <InlineLatex latex="\vec{r}" /> drar bare ut/inn og bidrar ikke.</li>
          </ul>
          <p className="text-sm mt-2">
            Begge perspektivene gir samme svar. Velg det som gjør geometrien enklest i oppgaven din.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Supplement</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><a href="https://www.khanacademy.org/science/physics/torque-angular-momentum" target="_blank" rel="noreferrer" className="underline">Khan Academy — Torque and angular momentum</a></li>
            <li><a href="https://hyperphysics.phy-astr.gsu.edu/hbase/torq2.html" target="_blank" rel="noreferrer" className="underline">HyperPhysics — Torque</a></li>
          </ul>
        </div>
      </TheorySummary>

      <TorqueCalculator />

      <TheorySummary
        title="10.2 Newtons 2. lov for rotasjon"
        mustKnow={[
          "Στ = Iα — summen av kraftmomentene bestemmer vinkelakselerasjonen",
          "Analogt med ΣF = ma for lineær bevegelse",
          "Bruk samme fremgangsmåte som for Newtons 2. lov: frilegemediagram, summer τ, sett lik Iα",
        ]}
      >
        <p className="mb-3">
          Newtons andre lov for rotasjon er <InlineLatex latex="\sum\tau = I\alpha" />, som er direkte analog med <InlineLatex latex="\sum F = ma" />. Strategien er den samme:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm mb-3">
          <li>Tegn frilegemediagram med alle krefter</li>
          <li>Velg rotasjonsakse</li>
          <li>Beregn <InlineLatex latex="\tau" /> fra hver kraft (med fortegn!)</li>
          <li>Summer til <InlineLatex latex="\sum\tau" /> og sett lik <InlineLatex latex="I\alpha" /></li>
          <li>Løs for ukjent (<InlineLatex latex="\alpha" />, <InlineLatex latex="F" />, eller annet)</li>
        </ol>
        <p className="mb-4">
          <strong>Viktig detalj:</strong> Tyngdekraften virker i massesenteret. Normalkraft og friksjon virker i kontaktpunktet.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Hvorfor denne formen?</p>
          <p className="text-sm">
            Akkurat som <InlineLatex latex="\sum F = ma" /> følger av <InlineLatex latex="F = dp/dt" />, følger <InlineLatex latex="\sum\tau = I\alpha" /> av <InlineLatex latex="\tau = dL/dt" /> når treghetsmoment <InlineLatex latex="I" /> er konstant. Det er <em>samme fysikk</em>, bare i rotasjonsspråk: kraftmoment endrer angulær bevegelsesmengde, akkurat som kraft endrer lineær bevegelsesmengde.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Utledning av <InlineLatex latex="\tau = I\alpha" /></p>
          <p className="text-sm mb-2">
            Tenk det stive legemet som mange partikler <InlineLatex latex="m_i" /> i avstand <InlineLatex latex="r_i" /> fra aksen. Newton 2 for partikkel <InlineLatex latex="i" /> i tangentiell retning:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="F_{i,\text{tan}} = m_i a_{i,\text{tan}} = m_i (r_i \alpha)" />
          </p>
          <p className="text-sm mb-2">
            (Siden legemet er stivt, har alle partikler samme <InlineLatex latex="\alpha" />.) Multipliser med <InlineLatex latex="r_i" /> for å få kraftmomentet om aksen:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="\tau_i = r_i F_{i,\text{tan}} = m_i r_i^2 \alpha" />
          </p>
          <p className="text-sm mb-2">
            Summer over alle partikler. Interne krefter kansellerer i par (N3L), så bare ytre kraftmoment teller:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="\sum_i \tau_i = \alpha \sum_i m_i r_i^2 = I\alpha" />
          </p>
          <p className="text-sm">
            Her brukte vi definisjonen <InlineLatex latex="I = \sum m_i r_i^2" />. <strong>Konklusjon:</strong> <InlineLatex latex="\sum\tau_\text{ext} = I\alpha" /> er N2L for rotasjon — ikke et nytt postulat, men en direkte konsekvens av den vanlige Newton 2 for hver partikkel.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">FELLE: Ikke glem sin θ i τ = r × F</p>
          <p className="text-sm mb-2">
            Det vanligste feilen studenter gjør på eksamen: <strong>de skriver <InlineLatex latex="\tau = rF" /> uten sinus.</strong> Dette stemmer <em>bare</em> når kraften er nøyaktig vinkelrett på posisjonsvektoren. I alle andre tilfeller må du ta med vinkelen mellom <InlineLatex latex="\vec{r}" /> og <InlineLatex latex="\vec{F}" />:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="\tau = rF\sin\theta" />
          </p>
          <p className="text-sm mb-2">
            <strong>Vinkelens betydning:</strong>
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside mb-2">
            <li><InlineLatex latex="\theta = 0°" /> eller <InlineLatex latex="180°" />: kraften langs armen → <InlineLatex latex="\tau = 0" /></li>
            <li><InlineLatex latex="\theta = 90°" />: kraften vinkelrett → maksimalt <InlineLatex latex="\tau = rF" /></li>
            <li>Mellom: bare komponenten <InlineLatex latex="F\sin\theta" /> skaper rotasjon</li>
          </ul>
          <p className="text-sm mb-2">
            <strong>Vanlig felle:</strong> I en oppgave gis <em>vinkelen til horisontalen</em> eller <em>vinkelen fra normalen</em>. Dette er <em>ikke nødvendigvis</em> vinkelen mellom <InlineLatex latex="\vec{r}" /> og <InlineLatex latex="\vec{F}" />. Tegn alltid vektorene og les av vinkelen mellom dem direkte.
          </p>
          <p className="text-sm">
            <strong>Tips:</strong> Hvis du er usikker — bruk moment-arm-metoden: forleng kraften som en linje, mål korteste avstanden fra aksen til denne linjen, det er armen <InlineLatex latex="\ell" />, og da er <InlineLatex latex="\tau = F\ell" />. Denne metoden kommer rundt hele sin-spørsmålet.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">Praktisk oppgavestrategi</p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Tegn frilegemediagram — marker ALLE krefter med angrepssted</li>
            <li>Identifiser rotasjonsaksen (fast punkt eller massesenteret)</li>
            <li>Beregn <InlineLatex latex="\tau" /> fra <em>hver enkelt</em> kraft — husk fortegn!</li>
            <li>Krefter som går gjennom rotasjonsaksen gir <InlineLatex latex="\tau = 0" /> — skriv dem ned, men de faller ut</li>
            <li>Summer: <InlineLatex latex="\sum\tau = I\alpha" /> og løs for det ukjente</li>
          </ol>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-800 dark:text-red-300 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>«Jeg kan velge hvilken akse som helst»</strong> — Teknisk sant for statikk, men for dynamikk: velg massesenteret eller en fast akse for å forenkle. Feil aksepunkt gir ekstra ledd du må huske å ta med.</li>
            <li><strong>«Normalkraften går alltid gjennom aksen»</strong> — Ikke alltid! Sjekk geometrien grundig. Normalkraften på et hjul som akselererer kan ha et kraftmoment-bidrag.</li>
            <li><strong>«Jeg trenger bare én ligning»</strong> — For legemer som både translerer og roterer (som en rulling ball) trenger du <em>begge</em>: <InlineLatex latex="\sum F = ma" /> OG <InlineLatex latex="\sum\tau = I\alpha" /> samtidig.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Sammenheng med kap 4 og kap 8</p>
          <p className="text-sm">
            Dette er N2L i rotasjonsspråk. Analogien er fullstendig: <InlineLatex latex="m \leftrightarrow I" />, <InlineLatex latex="a \leftrightarrow \alpha" />, <InlineLatex latex="F \leftrightarrow \tau" />. For objekter som både translerer og roterer (for eksempel et hjul som akselererer) bruker du <em>begge</em> lovene simultant, og kobler dem via rullbetingelsen <InlineLatex latex="a = R\alpha" />.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Master-analogi: lineær ↔ rotasjon</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-2 border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Lineær</th>
                  <th className="text-left py-2 pr-4">Rotasjon</th>
                  <th className="text-left py-2 pr-4">Kommentar</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="x" /> (posisjon)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\theta" /> (vinkel, rad)</td>
                  <td className="py-2 pr-4">Hvor mye har du flyttet/rotert</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="v" /> (hastighet)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\omega" /> (vinkelhastighet)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="v = r\omega" /> for stiv rotasjon</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="a" /> (akselerasjon)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\alpha" /> (vinkelakselerasjon)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="a_\text{tan} = r\alpha" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="m" /> (masse / treghet)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="I" /> (treghetsmoment)</td>
                  <td className="py-2 pr-4">Treghet avhenger AV massefordeling</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="F" /> (kraft)</td>
                  <td className="py-2 pr-4"><InlineLatex latex="\tau" /> (kraftmoment)</td>
                  <td className="py-2 pr-4">Det som gir bevegelsesendring</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="\sum F = ma" /></td>
                  <td className="py-2 pr-4"><InlineLatex latex="\sum\tau = I\alpha" /></td>
                  <td className="py-2 pr-4">Newtons 2. lov</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="p = mv" /></td>
                  <td className="py-2 pr-4"><InlineLatex latex="L = I\omega" /></td>
                  <td className="py-2 pr-4">Bevegelsesmengde</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="F = dp/dt" /></td>
                  <td className="py-2 pr-4"><InlineLatex latex="\tau = dL/dt" /></td>
                  <td className="py-2 pr-4">Generell N2L</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="\tfrac{1}{2}mv^2" /></td>
                  <td className="py-2 pr-4"><InlineLatex latex="\tfrac{1}{2}I\omega^2" /></td>
                  <td className="py-2 pr-4">Kinetisk energi</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4"><InlineLatex latex="W = F\,\Delta x" /></td>
                  <td className="py-2 pr-4"><InlineLatex latex="W = \tau\,\Delta\theta" /></td>
                  <td className="py-2 pr-4">Arbeid</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4"><InlineLatex latex="P = Fv" /></td>
                  <td className="py-2 pr-4"><InlineLatex latex="P = \tau\omega" /></td>
                  <td className="py-2 pr-4">Effekt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-3">
            <strong>Bruk denne tabellen som Rosetta-stein:</strong> Hvis du forstår et konsept i lineær bevegelse, kan du «oversette» det til rotasjon ved å bytte ut symbolene i samme rad. Formelstrukturen er den samme.
          </p>
        </div>
      </TheorySummary>

      <TheorySummary
        title="10.3 Rulling uten glidning"
        mustKnow={[
          "v_CM = Rω — betingelse for rulling uten glidning",
          "Kontaktpunktet har null hastighet (momentant)",
          "Total kinetisk energi: E_{k,tot} = ½mv²_CM + ½Iω²",
          "Statisk friksjon driver rullingen — IKKE kinetisk",
        ]}
      >
        <p className="mb-3">
          Et objekt som ruller uten å gli har en spesiell sammenheng mellom <InlineLatex latex="v_{CM}" /> og <InlineLatex latex="\omega" />:
        </p>
        <p className="mb-3 text-center font-semibold">
          <InlineLatex latex="v_{CM} = R\omega" />
        </p>
        <p className="mb-3">
          <strong>Hastighet på ulike punkter:</strong> Kontaktpunktet har <InlineLatex latex="v = 0" /> (momentan stillstand), massesenteret har <InlineLatex latex="v = v_{CM}" />, og toppen har <InlineLatex latex="v = 2v_{CM}" />.
        </p>
        <p className="mb-4">
          <strong>Energi ved rulling:</strong> <InlineLatex latex="E_{k,\text{tot}} = \tfrac{1}{2}mv_{CM}^2 + \tfrac{1}{2}I\omega^2" />. For en disk: <InlineLatex latex="E_k = \tfrac{3}{4}mv_{CM}^2" />, for en ring: <InlineLatex latex="E_k = mv_{CM}^2" />.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Hvorfor v = Rω?</p>
          <p className="text-sm">
            Tenk på bueelementet langs omfanget: når hjulet har rotert vinkelen <InlineLatex latex="\Delta\theta" />, har det rullet en strekning <InlineLatex latex="s = R\Delta\theta" /> langs bakken (rullbetingelse). Deriver med hensyn på tid: <InlineLatex latex="v_{CM} = R\omega" />. Kontaktpunktet har null hastighet — det er momentant i hvile, som bunnen av et beltekjøretøy. Toppen beveger seg dobbelt så fort som massesenteret fordi den har translasjonshastigheten OG rotasjonshastigheten i samme retning.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Fra <InlineLatex latex="v_{CM} = R\omega" /> til <InlineLatex latex="a_{CM} = R\alpha" /></p>
          <p className="text-sm mb-2">
            Rullebetingelsen (ingen glidning): kontaktpunktet har null hastighet. Dette betyr at translasjon og rotasjon er geometrisk koblet. Start med buelengden:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="s_{CM} = R\,\theta" />
          </p>
          <p className="text-sm mb-2">
            Når legemet har rotert én gang (<InlineLatex latex="\theta = 2\pi" />) har CM flyttet seg én omkrets <InlineLatex latex="2\pi R" />. Deriver begge sider med hensyn til tid:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="\frac{ds_{CM}}{dt} = R\frac{d\theta}{dt} \implies v_{CM} = R\omega" />
          </p>
          <p className="text-sm mb-2">
            Deriver igjen:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="\frac{dv_{CM}}{dt} = R\frac{d\omega}{dt} \implies a_{CM} = R\alpha"  />
          </p>
          <p className="text-sm">
            <strong>Merk:</strong> Disse tre sammenhengene (<InlineLatex latex="s = R\theta" />, <InlineLatex latex="v = R\omega" />, <InlineLatex latex="a = R\alpha" />) er <em>ikke</em> definisjoner — de er <em>konsekvenser</em> av rullebetingelsen. Uten rulling gjelder ingen av dem. Dette er den geometriske «koblingsligningen» som gjør at du kan løse rullingsproblemer med to ligninger (N2L translasjon + N2L rotasjon) og tre ukjente.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">Hverdagsanalogi: Sykkelhjul og skråplan</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>Sykkelhjul:</strong> Kontaktpunktet med bakken er momentant i ro. Med lang eksponeringstid på et kamera er bunnen av hjulet skarpest — det er det punktet som beveger seg minst!</li>
            <li><strong>Skråplan-rase:</strong> La en solid kule, en disk og en ring rulle ned samme skråplan fra ro. Hvem vinner? Kulen (I = 2/5 MR²) — den har minst I i forhold til MR², så mer av energien går til translasjon. Ringen (I = MR²) taper alltid. <em>Massen spiller ingen rolle</em> — den kansellerer ut!</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-800 dark:text-red-300 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>«Friksjonen gjør arbeid under rulling»</strong> — Nei! Kontaktpunktet har <InlineLatex latex="v = 0" />, så <InlineLatex latex="P = Fv = 0" />. Statisk friksjon leverer kraftmoment (gir vinkelakselerasjon) men gjør <em>null arbeid</em>. Energien kommer ikke fra friksjon.</li>
            <li><strong>«Rullende objekter har mindre energi enn glidende»</strong> — Tvert imot! Rulling krever <em>mer</em> total energi fordi du trenger både translasjonsenergien og rotasjonsenergien. Et rullende objekt når bunnen av en rampe saktere enn et som glir friktionsfritt.</li>
            <li><strong>«v = Rω gjelder alltid»</strong> — Bare ved rulling <em>uten</em> glidning. Hvis det er kinetisk friksjon (hjulet sklir), er ikke betingelsen oppfylt.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Sammenheng med kap 7 (energibevaring)</p>
          <p className="text-sm mb-2">
            For et rullende objekt på et skråplan bruker du energibevaring med det utvidede energiuttrykket:
          </p>
          <p className="text-sm text-center mb-2">
            <InlineLatex latex="mgh = \tfrac{1}{2}mv_{CM}^2 + \tfrac{1}{2}I\omega^2" />
          </p>
          <p className="text-sm">
            Sett inn <InlineLatex latex="\omega = v_{CM}/R" /> og løs. Massen forsvinner fra ligningen — bare <em>formen</em> (forholdet <InlineLatex latex="I/MR^2" />) bestemmer hvem som vinner. Dette er et elegant resultat: geografi (skråplan) og masse betyr ingenting, bare massefordelingen.
          </p>
        </div>

        <p className="text-sm">
          <strong>Friksjon:</strong> Det er <em>statisk</em> friksjon som sørger for rulling uten glidning. Den gjør ingen arbeid (kontaktpunktet har <InlineLatex latex="v = 0" />), men den skaper kraftmomentet som gir vinkelakselerasjon.
        </p>

        {/* SVG: hjul som ruller — kontakpunkt i ro */}
        <div className="my-4 flex justify-center">
          <svg viewBox="0 0 420 240" className="w-full max-w-md">
            {/* Bakken */}
            <line x1="20" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1.5" />
            {/* Hjul */}
            <circle cx="210" cy="140" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="210" cy="140" r="3" fill="#8b5cf6" />
            {/* Eiker for å vise rotasjon */}
            <line x1="210" y1="140" x2="210" y2="80" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="210" y1="140" x2="270" y2="140" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Hastighetsvektorer */}
            {/* Bunnen: v = 0 */}
            <circle cx="210" cy="200" r="4" fill="#ef4444" />
            <text x="210" y="225" textAnchor="middle" className="fill-current text-xs" fill="#ef4444">v = 0</text>

            {/* Massesenter: v_CM */}
            <line x1="210" y1="140" x2="290" y2="140" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowRollBlue)" />
            <text x="300" y="144" className="fill-current text-xs" fill="#3b82f6">v_CM</text>

            {/* Toppen: 2 v_CM */}
            <line x1="210" y1="80" x2="370" y2="80" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowRollGreen)" />
            <text x="310" y="70" className="fill-current text-xs" fill="#10b981">2 v_CM</text>

            {/* omega */}
            <path d="M 250 115 A 20 20 0 0 1 230 95" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowRollAmber)" />
            <text x="258" y="105" className="fill-current text-xs" fill="#f59e0b">ω</text>

            <defs>
              <marker id="arrowRollBlue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
              </marker>
              <marker id="arrowRollGreen" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#10b981" />
              </marker>
              <marker id="arrowRollAmber" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2"><InlineLatex latex="v_{CM} = R\omega" /> er en konstrakt, ikke en naturlov</p>
          <p className="text-sm">
            Det er viktig å forstå at <InlineLatex latex="v_{CM} = R\omega" /> bare gjelder når vi <strong>velger</strong> å anta rulling uten glidning. Det er en geometrisk betingelse vi legger på systemet, ikke en lov naturen følger automatisk. Hvis underlaget er glatt, så ruller hjulet <em>ikke</em>, og <InlineLatex latex="v_{CM}" /> og <InlineLatex latex="\omega" /> kan være helt uavhengige.
          </p>
          <p className="text-sm mt-2">
            I oppgaver må du derfor alltid spørre deg: «Er det nok statisk friksjon til å opprettholde rulling?» Sjekk at den nødvendige friksjonskraften er <em>mindre enn</em> <InlineLatex latex="\mu_s N" />. Hvis ikke — objektet sklir og du må bruke kinetisk friksjon i stedet.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">FELLE: Rulling uten å gli KREVER antakelsen — den er ikke gratis</p>
          <p className="text-sm mb-2">
            Studenter bruker ofte <InlineLatex latex="v_{CM} = R\omega" /> automatisk. Det er feil når objektet sklir!
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside mb-2">
            <li><strong>Ren rulling («ruller uten å gli»):</strong> <InlineLatex latex="v_{CM} = R\omega" />, <InlineLatex latex="a_{CM} = R\alpha" />. Friksjonen er <em>statisk</em>, gjør ikke arbeid.</li>
            <li><strong>Ren glidning (skrens, på is):</strong> <InlineLatex latex="v_{CM}" /> og <InlineLatex latex="\omega" /> uavhengige. Friksjonen er <em>kinetisk</em>, dissiperer energi som varme.</li>
            <li><strong>Overgang:</strong> En bowlingkule som legges ned med <InlineLatex latex="\omega = 0" /> men <InlineLatex latex="v_{CM} > 0" /> sklir først. Kinetisk friksjon bremser <InlineLatex latex="v_{CM}" /> og øker <InlineLatex latex="\omega" /> til <InlineLatex latex="v_{CM} = R\omega" /> er nådd — da begynner ren rulling.</li>
          </ul>
          <p className="text-sm">
            <strong>Sjekkliste:</strong> Før du bruker <InlineLatex latex="v_{CM} = R\omega" />, spør: står det «ruller uten å gli» eksplisitt? Finnes det nok statisk friksjon (<InlineLatex latex="f_s \leq \mu_s N" />)? Hvis ja på begge — trygt å bruke koplingen.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">FELLE: «Uten friksjon på rotasjonsaksen» ≠ uten friksjon i kontaktpunktet</p>
          <p className="text-sm">
            Typisk eksamensformulering: «En trinse er festet til en <em>friksjonsfri akse</em>, tauet går over trinsen uten å skli…» — dette betyr at <em>selve aksen</em> (lageret) er friksjonsfritt. Det betyr <em>ikke</em> at kontakten mellom tau og trinse er friksjonsfri. Tvert imot: tauet må ha nok friksjon mot trinsen til å få den til å rotere. Disse to formene for friksjon er uavhengige. Ikke blande dem!
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Utledning: <InlineLatex latex="a_{CM} = \tfrac{2}{3}g\sin\beta" /> for en massiv skive på skråplan</p>
          <p className="text-sm mb-2">
            Tre ligninger, tre ukjente (<InlineLatex latex="a_{CM}" />, <InlineLatex latex="\alpha" />, <InlineLatex latex="f_s" />):
          </p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li><strong>N2L langs skråplanet:</strong> <InlineLatex latex="Mg\sin\beta - f_s = Ma_{CM}" /></li>
            <li><strong>N2L for rotasjon (akse = CM):</strong> <InlineLatex latex="f_s R = I\alpha = \tfrac{1}{2}MR^2 \alpha" /></li>
            <li><strong>Rullbetingelse:</strong> <InlineLatex latex="a_{CM} = R\alpha" /></li>
          </ol>
          <p className="text-sm mt-2">
            Fra (2) og (3): <InlineLatex latex="f_s = \tfrac{1}{2}Ma_{CM}" />. Sett inn i (1):
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="Mg\sin\beta - \tfrac{1}{2}Ma_{CM} = Ma_{CM} \implies a_{CM} = \tfrac{2}{3}g\sin\beta" />
          </p>
          <p className="text-sm mt-2">
            <strong>Observasjon:</strong> En glidende kloss ville hatt <InlineLatex latex="a = g\sin\beta" />. Rulling gir bare 2/3 så stor akselerasjon — fordi en del av potensiell energi går til <em>rotasjonsenergi</em>, ikke bare translasjon.
          </p>
        </div>

        {/* SVG: trinse med to klosser — klassisk Atwood-variant med tregt-trinse */}
        <div className="my-4">
          <p className="text-sm font-semibold mb-2">Klassisk oppgavetype: to klosser over en trinse med treghet</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 380 280" className="w-full max-w-md">
              {/* Tak */}
              <line x1="40" y1="20" x2="340" y2="20" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="20" x2="30" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="60" y1="20" x2="50" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="20" x2="70" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="300" y1="20" x2="290" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="320" y1="20" x2="310" y2="15" stroke="currentColor" strokeWidth="1" />
              {/* Trinseopphengt */}
              <line x1="190" y1="20" x2="190" y2="40" stroke="currentColor" strokeWidth="1.5" />
              {/* Trinse (sirkel) */}
              <circle cx="190" cy="70" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="190" cy="70" r="3" fill="#8b5cf6" />
              {/* Eiker */}
              <line x1="190" y1="70" x2="190" y2="40" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="190" y1="70" x2="220" y2="70" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 2" />
              <text x="235" y="58" className="fill-current text-xs" fill="#8b5cf6">R, I</text>
              {/* Tau */}
              <line x1="160" y1="70" x2="160" y2="180" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="220" y1="70" x2="220" y2="140" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="140" y="130" className="fill-current text-xs" fill="#3b82f6">T₁</text>
              <text x="228" y="110" className="fill-current text-xs" fill="#3b82f6">T₂</text>
              {/* Kloss 1 (tyngre, henger lavere) */}
              <rect x="140" y="180" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="160" y="205" textAnchor="middle" className="fill-current text-xs">m₁</text>
              {/* m1 tyngdekraft */}
              <line x1="160" y1="220" x2="160" y2="255" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr10pulley)" />
              <text x="168" y="250" className="fill-current text-xs" fill="#ef4444">m₁g</text>
              {/* Kloss 2 (lettere, henger høyere) */}
              <rect x="205" y="140" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="220" y="160" textAnchor="middle" className="fill-current text-xs">m₂</text>
              {/* m2 tyngdekraft */}
              <line x1="220" y1="170" x2="220" y2="200" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr10pulley)" />
              <text x="228" y="195" className="fill-current text-xs" fill="#ef4444">m₂g</text>
              {/* Omega */}
              <path d="M 170 45 A 20 20 0 0 1 210 45" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arr10pulley2)" />
              <text x="190" y="40" textAnchor="middle" className="fill-current text-xs" fill="#f59e0b">ω, α</text>
              <defs>
                <marker id="arr10pulley" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
                </marker>
                <marker id="arr10pulley2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-xs italic opacity-75 text-center mt-2">
            3 ligninger: N2L for m₁ (T₁ − m₁g = −m₁a), N2L for m₂ (T₂ − m₂g = m₂a), N2L for trinsen ((T₁ − T₂)R = Iα), koblet med a = Rα. Merk: <strong>T₁ ≠ T₂</strong> når trinsen har treghet!
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hvorfor vinner den massive kulen?</p>
          <p className="text-sm mb-2">
            Generelt for et objekt med <InlineLatex latex="I = cMR^2" /> (c = dimensjonsløs konstant):
          </p>
          <p className="text-sm text-center">
            <InlineLatex latex="a_{CM} = \frac{g\sin\beta}{1 + c}" />
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Objekt</th>
                  <th className="text-left py-2 pr-4">c = I/MR²</th>
                  <th className="text-left py-2 pr-4">a_CM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Glidende kloss (ingen rotasjon)</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4"><InlineLatex latex="g\sin\beta" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Massiv kule</td>
                  <td className="py-2 pr-4">2/5</td>
                  <td className="py-2 pr-4"><InlineLatex latex="(5/7)g\sin\beta \approx 0{,}71 g\sin\beta" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Massiv sylinder/skive</td>
                  <td className="py-2 pr-4">1/2</td>
                  <td className="py-2 pr-4"><InlineLatex latex="(2/3)g\sin\beta \approx 0{,}67 g\sin\beta" /></td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Hul kule</td>
                  <td className="py-2 pr-4">2/3</td>
                  <td className="py-2 pr-4"><InlineLatex latex="(3/5)g\sin\beta = 0{,}60 g\sin\beta" /></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Ring (tynn hul sylinder)</td>
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4"><InlineLatex latex="(1/2)g\sin\beta = 0{,}50 g\sin\beta" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-3">
            Jo mer masse som er samlet nær aksen (lav c), jo mindre energi låses i rotasjon og jo mer går til translasjon. <strong>Den massive kulen vinner</strong>, ringen taper — <em>uavhengig av masse og radius</em>.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kjennetegn i oppgaveteksten</p>
          <p className="text-sm mb-2">
            Se etter disse formuleringene — da vet du hvilket oppsett du trenger:
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>«ruller uten å gli» → bruk <InlineLatex latex="v_{CM} = R\omega" /> og <InlineLatex latex="a_{CM} = R\alpha" /> som koblingsligning</li>
            <li>«to legemer koblet via tau over trinse», «Atwood-maskin med masseviktig trinse» → tre ligninger (N2L for hver kloss + N2L rotasjon for trinsen) + <InlineLatex latex="a = R\alpha" /></li>
            <li>«tau går uten å skli over trinsen» → samme som rulling uten å gli: <InlineLatex latex="v_{tau} = R\omega" /></li>
            <li>«uten friksjon på rotasjonsaksen» → aksen gir null kraftmoment, men friksjon i kontakt kan fortsatt finnes</li>
            <li>«snurrer ut», «spinner opp», «starter å rulle» → dynamikk-problem, finn <InlineLatex latex="\alpha" /> fra <InlineLatex latex="\sum\tau = I\alpha" /></li>
            <li>«rullende skive/kule ned et skråplan» → energibevaring ELLER kraft+kraftmoment, begge virker</li>
          </ul>
        </div>
      </TheorySummary>

      <RollingWithoutSlipping />

      <TheorySummary
        title="10.4 Arbeid og effekt i rotasjon"
        mustKnow={[
          "W = τ Δθ — arbeid utført av et konstant kraftmoment",
          "P = τω — effekt i rotasjon",
          "Arbeid-energi-teoremet: W_tot = ΔE_{k,rot} = ½Iω² − ½Iω₀²",
        ]}
      >
        <p className="mb-3">
          Akkurat som lineært arbeid er <InlineLatex latex="W = F \cdot d" />, er rotasjonsarbeid <InlineLatex latex="W = \tau \cdot \Delta\theta" />. Effekten er <InlineLatex latex="P = \tau\omega" />.
        </p>
        <p className="mb-4">
          Arbeid-energi-teoremet fungerer også her: det totale arbeidet utført av alle kraftmomenter er lik endringen i rotasjonsenergi.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Hvorfor W = τΔθ?</p>
          <p className="text-sm">
            Sammenlign med lineærtilfellet: <InlineLatex latex="W = F \cdot \Delta x" />. I rotasjon spiller vinkel <InlineLatex latex="\Delta\theta" /> rollen som forflytning, og kraftmoment <InlineLatex latex="\tau" /> spiller rollen som kraft. Analogien er fullstendig: <InlineLatex latex="F \leftrightarrow \tau" />, <InlineLatex latex="\Delta x \leftrightarrow \Delta\theta" />, <InlineLatex latex="v \leftrightarrow \omega" />. Dermed gir arbeid-energi-teoremet: <InlineLatex latex="W_{tot} = \Delta E_{k,rot} = \tfrac{1}{2}I\omega_2^2 - \tfrac{1}{2}I\omega_1^2" />.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-blue-300 mb-2">Hverdagsanalogi: Elektromotor</p>
          <p className="text-sm">
            En elektromotor leverer effekt <InlineLatex latex="P = \tau\omega" />. Høy-RPM-motorer (stor <InlineLatex latex="\omega" />) trenger <em>mindre</em> kraftmoment for samme effekt. Derfor girer du på sykkel: lavt gir gir stor kraftmoment (lett å tråkke i motbakke), høyt gir gir lav kraftmoment men høy hastighet. Effekten <InlineLatex latex="P = \tau\omega" /> er (ideelt) den samme i begge gir.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Sammenheng med kap 6</p>
          <p className="text-sm">
            Arbeid-energi-teoremet fra kap 6 (<InlineLatex latex="W_{tot} = \Delta E_{k,lin}" />) gjelder ord for ord for rotasjon, bare bytt ut <InlineLatex latex="\tfrac{1}{2}mv^2" /> med <InlineLatex latex="\tfrac{1}{2}I\omega^2" />. For rullende objekter bruker du <em>begge</em> bidragene: <InlineLatex latex="\Delta E_{k,tot} = \Delta E_{k,lin} + \Delta E_{k,rot}" />.
          </p>
        </div>
      </TheorySummary>

      <TheorySummary
        title="10.5 Angulært moment (dreieimpuls)"
        mustKnow={[
          "L = r × mv for en partikkel (vektorprodukt!)",
          "L = Iω for et stivt legeme",
          "τ = dL/dt — kraftmoment er endringsrate av angulært moment",
          "Analogt med F = dp/dt for lineær bevegelse",
        ]}
      >
        <p className="mb-3">
          <strong>Angulært moment</strong> (dreieimpuls) er rotasjonens svar på lineær bevegelsesmengde. For en partikkel: <InlineLatex latex="\vec{L} = \vec{r} \times m\vec{v}" />, med størrelse <InlineLatex latex="|\vec{L}| = rmv\sin\phi" />.
        </p>
        <p className="mb-3">
          For et stivt legeme som roterer om en fast akse: <InlineLatex latex="L = I\omega" />.
        </p>
        <p className="mb-4">
          Sammenhengen med kraftmoment: <InlineLatex latex="\sum\vec{\tau} = \frac{d\vec{L}}{dt}" />, analogt med <InlineLatex latex="\vec{F} = \frac{d\vec{p}}{dt}" />. Dersom <InlineLatex latex="I" /> er konstant gir dette <InlineLatex latex="\sum\tau = I\alpha" /> som vi kjenner fra 10.2.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Hvorfor vektorprodukt?</p>
          <p className="text-sm">
            <InlineLatex latex="\vec{L} = \vec{r} \times m\vec{v}" /> fanger opp <em>både</em> mengden bevegelse OG hvor langt fra aksen den skjer. Kryssproduktet sørger for at bare den vinkelrette komponenten teller — nøyaktig som i kraftmoment. Retningen til <InlineLatex latex="\vec{L}" /> er langs rotasjonsaksen (høyrehåndsregelen): fingrene krøller seg i bevegelsesretningen, og tommelen peker langs <InlineLatex latex="\vec{L}" />.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Utledning av <InlineLatex latex="L = I\omega" /> for et stivt legeme</p>
          <p className="text-sm mb-2">
            For en enkelt partikkel i avstand <InlineLatex latex="r_i" /> fra aksen, med tangentiell fart <InlineLatex latex="v_i = r_i\omega" />, er størrelsen på angulært moment (om aksen):
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="L_i = r_i \cdot m_i v_i = r_i \cdot m_i (r_i\omega) = m_i r_i^2 \omega" />
          </p>
          <p className="text-sm mb-2">
            Retningen følger høyrehåndsregelen — langs aksen. Summér over alle partikler i legemet:
          </p>
          <p className="text-sm text-center my-2">
            <InlineLatex latex="L = \sum_i L_i = \omega \sum_i m_i r_i^2 = I\omega" />
          </p>
          <p className="text-sm mb-2">
            Vi faktoriserte ut <InlineLatex latex="\omega" /> fordi stivhet betyr felles vinkelhastighet. Det som gjenstår er treghetsmomentet.
          </p>
          <p className="text-sm">
            <strong>Observér parallellen:</strong> For lineær bevegelse: <InlineLatex latex="p = mv" />. For rotasjon: <InlineLatex latex="L = I\omega" />. Bytt <InlineLatex latex="m \to I" /> og <InlineLatex latex="v \to \omega" /> og du har svaret uten å utlede på nytt.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">FELLE: <InlineLatex latex="\tau_\text{ytre} = dL/dt" /> vs <InlineLatex latex="\sum F = dp/dt" /> — likhet og forskjell</p>
          <p className="text-sm mb-2">
            Begge lover er helt analoge, MEN det er en viktig forskjell i hvordan de brukes:
          </p>
          <ul className="text-sm space-y-2 list-disc list-inside mb-2">
            <li>
              <strong>Lineær:</strong> <InlineLatex latex="\sum \vec{F} = d\vec{p}/dt" />. Kraften er den samme uansett hvilket referansepunkt du velger.
            </li>
            <li>
              <strong>Rotasjon:</strong> <InlineLatex latex="\sum \vec{\tau} = d\vec{L}/dt" />. <em>Men begge sider avhenger av valget av rotasjonsakse.</em> Endrer du aksen, endres både <InlineLatex latex="\tau" /> (via <InlineLatex latex="r" />) og <InlineLatex latex="L" />.
            </li>
          </ul>
          <p className="text-sm mb-2">
            <strong>Hva betyr dette i praksis?</strong>
          </p>
          <ul className="text-sm space-y-1 list-disc list-inside mb-2">
            <li>Beregn alltid <InlineLatex latex="\tau" /> og <InlineLatex latex="L" /> om <em>samme</em> akse i samme ligning.</li>
            <li>Safe valg: en fast akse (pivot), eller massesenteret. Begge gir en gyldig N2L for rotasjon.</li>
            <li>Et vilkårlig punkt som akselererer kan gi feil svar med mindre du inkluderer pseudokrefter.</li>
          </ul>
          <p className="text-sm">
            <strong>Oppsummert:</strong> Kraftmoment-loven krever <em>aksevalg</em> — kraft-loven gjør ikke det. Glem ikke å spesifisere aksen din!
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">Hverdagsanalogi: Snurrebass og gyro</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>Snurrebass:</strong> <InlineLatex latex="\vec{L}" />-vektoren peker oppover langs spinaksen. Jo tyngre, raskere og bredere toppen, jo større <InlineLatex latex="L" />. Det er dette som holder den oppreist mot tyngdekraften (presesjon).</li>
            <li><strong>Rett bevegende ball:</strong> En ball som beveger seg i rett linje har angulært moment om ethvert punkt <em>ikke</em> på bevegelseslinjen! <InlineLatex latex="L = rmv\sin\phi" /> der <InlineLatex latex="r" /> er avstanden fra referansepunktet til bevegelseslinjen. Angulært moment krever ikke rotasjon!</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-800 dark:text-red-300 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>«Angulært moment krever rotasjon»</strong> — Nei! En partikkel i rettlinjet bevegelse har angulært moment om ethvert punkt utenfor bevegelseslinjen. <InlineLatex latex="L = rmv\sin\phi \neq 0" /> så lenge partikkelen ikke beveger seg rett mot referansepunktet.</li>
            <li><strong>«L peker alltid i samme retning som ω»</strong> — Bare for symmetriske objekter som roterer om en symmetriakse. For skjeve objekter (som en vippe) kan <InlineLatex latex="\vec{L}" /> og <InlineLatex latex="\vec{\omega}" /> peke i ulike retninger, noe som forårsaker presesjon.</li>
            <li><strong>«L og p er det samme»</strong> — De er analoge, men ikke det samme. <InlineLatex latex="p = mv" /> er lineær, <InlineLatex latex="L = I\omega" /> er rotasjonell. Enheter: p i kg·m/s, L i kg·m²/s.</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Sammenheng med kap 4 og kap 8</p>
          <p className="text-sm">
            Den fulle analogitabellen: <InlineLatex latex="m \leftrightarrow I" />, <InlineLatex latex="v \leftrightarrow \omega" />, <InlineLatex latex="p = mv \leftrightarrow L = I\omega" />, <InlineLatex latex="F = dp/dt \leftrightarrow \tau = dL/dt" />. Bevegelsesmengdebevaringen fra kap 8 (<InlineLatex latex="\sum F_{ext} = 0 \Rightarrow p = \text{kons.}" />) har sin rotasjonsanalog i neste seksjon. Hele strukturen er identisk — bare med rotasjonsstørrelser.
          </p>
        </div>
      </TheorySummary>

      <TheorySummary
        title="10.6 Bevaring av angulært moment"
        mustKnow={[
          "Hvis Στ_ext = 0, er L = Iω = konstant",
          "I₁ω₁ = I₂ω₂ — brukes for å finne ny ω når I endres",
          "Kinetisk energi er IKKE bevart ved endring av I",
          "Eksempler: piruett, kollaps av stjerner, syklende som snur hjul",
        ]}
      >
        <p className="mb-3">
          Dersom summen av ytre kraftmoment på et system er null, er angulært moment bevart:
        </p>
        <p className="mb-3 text-center font-semibold">
          <InlineLatex latex="\sum\tau_\text{ext} = 0 \implies L = I\omega = \text{konstant}" />
        </p>
        <p className="mb-4">
          <strong>Konsekvens:</strong> Når <InlineLatex latex="I" /> minker, MÅ <InlineLatex latex="\omega" /> øke (og omvendt). Kunstløperen som trekker armene inn spinner fortere!
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Hvorfor er L bevart?</p>
          <p className="text-sm">
            Analogt med bevegelsesmengdebevaring i kap 8: Newtons 3. lov for rotasjon sørger for at interne kraftmomenter kansellerer i par. Hvis ingen <em>ytre</em> kraftmomenter virker, er <InlineLatex latex="dL/dt = \sum\tau_{ext} = 0" />, altså <InlineLatex latex="L = \text{konstant}" />. Systemet kan omfordele angulært moment internt (for eksempel mellom armer og kropp hos kunstløperen), men totalmengden endres ikke.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">Hverdagsanalogier</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>Kunstløper (piruett):</strong> Armer ut → stor <InlineLatex latex="I" />, liten <InlineLatex latex="\omega" />. Armer inn → liten <InlineLatex latex="I" />, stor <InlineLatex latex="\omega" />. <InlineLatex latex="L = I\omega" /> er konstant hele veien.</li>
            <li><strong>Nøytronstjerne:</strong> En gigantisk stjerne kollapser til en nøytronstjerne — radius minsker fra millioner km til ~10 km. <InlineLatex latex="I \propto MR^2" /> synker dramatisk, og <InlineLatex latex="\omega" /> skyter i været. Resultatet: nøytronstjerner spinner hundrevis av ganger i sekundet (pulsarer).</li>
            <li><strong>Stupmorskalv:</strong> Stuper samler seg i «kuleposisjon» (liten I) for å spinne raskt, og strekker seg ut (stor I) for å bremse ned og gå rett inn i vannet. Rene bevaringslov-manøvrer!</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-red-800 dark:text-red-300 mb-2">Vanlige misforståelser</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li><strong>«Hvis <InlineLatex latex="L" /> er bevart, er <InlineLatex latex="E_{k,\text{rot}}" /> også bevart»</strong> — Nei! Når kunstløperen trekker armene inn gjør hun <em>muskelarbeid</em> på armene sine, som øker den kinetiske energien. <InlineLatex latex="L" /> er bevart, men <InlineLatex latex="E_k" /> øker. Energibevaringen brytes ikke — arbeidet kommer fra kjemisk energi i musklene.</li>
            <li><strong>«Bevaringsloven gjelder bare for fast akse»</strong> — Nei, det er en vektorlov i 3D: <InlineLatex latex="\vec{L} = \text{konstant}" />. Alle tre komponenter er bevart. Fast akse er et spesialtilfelle.</li>
            <li><strong>«Indre krefter kan endre L»</strong> — Nei! Bare ytre kraftmomenter endrer totalt L. Interne krefters kraftmomenter kansellerer alltid i par (N3L).</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-green-800 dark:text-green-300 mb-2">Eksamenstips: Slik gjenkjenner du oppgaven</p>
          <ul className="text-sm space-y-2 list-disc list-inside">
            <li>Ser du «ingen ytre kraftmoment», «friksjonsfri akse», eller «isolert system» → bruk <InlineLatex latex="L_1 = L_2" /></li>
            <li>Sett opp: <InlineLatex latex="I_1\omega_1 = I_2\omega_2" /> og løs for <InlineLatex latex="\omega_2" /></li>
            <li>Dersom to objekter slår seg sammen (rotasjonskollisjon) → bruk <InlineLatex latex="(I_1 + I_2)\omega_f = I_1\omega_1 + I_2\omega_2" /></li>
            <li>Sjekk alltid om kinetisk energi er bevart (vanligvis <em>ikke</em> ved rotasjonskollisjoner)</li>
          </ul>
        </div>

        <p className="text-sm mt-2">
          <strong>OBS:</strong> Selv om <InlineLatex latex="L" /> er bevart, er <InlineLatex latex="E_{k,\text{rot}}" /> generelt IKKE bevart. Når kunstløperen trekker armene inn gjør hun arbeid, og <InlineLatex latex="E_k" /> øker.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kjennetegn i oppgaveteksten (bevaring av L)</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>«isolert system», «ingen ytre kraftmoment», «friksjonsfri akse» → <InlineLatex latex="L" /> er bevart</li>
            <li>«trekker armene inn/ut», «strekker seg ut», «samler seg» → <InlineLatex latex="I" /> endres, <InlineLatex latex="\omega" /> endres motsatt</li>
            <li>«en person på en roterende plattform», «kollaps av stjerne», «piruett», «stupmorskalv» → bruk <InlineLatex latex="I_1\omega_1 = I_2\omega_2" /></li>
            <li>«kloss lander på roterende skive», «to skiver kobles sammen» → rotasjonskollisjon, bruk <InlineLatex latex="(I_1 + I_2)\omega_f = I_1\omega_1 + I_2\omega_2" /></li>
            <li>«partikkel treffer stav», «kule festes i kanten på skive» → angulært moment om pivot er bevart (tyngdekraft og pivotkraft gir null moment om pivot)</li>
          </ul>
        </div>
      </TheorySummary>

      <AngularMomentumVisualizer />
    </div>
  );
}
