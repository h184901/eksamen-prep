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
      </TheorySummary>

      <AngularMomentumVisualizer />
    </div>
  );
}
