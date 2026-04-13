"use client";

import TheorySummary from "@/components/TheorySummary";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import { KinematicsGraphs, FreeFallSimulator } from "../visualizations";

export default function TeoriPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teorisammendrag</h2>

      {/* 2.1 Forflytning, tid og gjennomsnittsfart */}
      <TheorySummary
        title="2.1 Forflytning, tid og gjennomsnittsfart"
        mustKnow={[
          "Forflytning Δx = x₂ − x₁ (vektor — har retning, kan være negativ)",
          "Gjennomsnittsfart v̄ = Δx/Δt",
          "Grafisk: v̄ = stigningstallet til sekanten i x-t-grafen",
          "Forflytning ≠ tilbakelagt distanse",
        ]}
      >
        <p>
          Vi starter med den enkleste bevegelsen: et legeme som beveger seg langs en rett linje.
          Posisjonen beskrives av én enkelt koordinat <InlineLatex latex="x" />.
        </p>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Forflytning vs. distanse</p>
          <p>
            <strong>Forflytning</strong> <InlineLatex latex="\Delta x = x_2 - x_1" /> er endringen i posisjon —
            den har retning og kan være negativ.
          </p>
          <p className="mt-1">
            <strong>Tilbakelagt distanse</strong> er den totale veien som er tilbakelagt — alltid positiv.
          </p>
          <p className="mt-1 text-sm">
            Eksempel: Går du 5 m fremover og 3 m tilbake, er forflytningen 2 m, men distansen er 8 m.
          </p>
        </div>

        <FormulaBox
          latex="\bar{v} = \frac{\Delta x}{\Delta t} = \frac{x_2 - x_1}{t_2 - t_1}"
          title="Gjennomsnittsfart"
          variant="gold"
          description="Stigningstallet til sekanten mellom to punkter i x-t-grafen. Enhet: m/s."
        />

        <p className="mt-4">
          <strong>Grafisk tolkning:</strong> I en <InlineLatex latex="x" />-<InlineLatex latex="t" />-graf
          er gjennomsnittsfarten lik stigningstallet til den rette linjen (sekanten) som forbinder
          punktene <InlineLatex latex="(t_1, x_1)" /> og <InlineLatex latex="(t_2, x_2)" />.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor skille mellom forflytning og distanse?</p>
          <p className="text-sm">
            I fysikk bryr vi oss om <strong>nettoendringen i posisjon</strong>, ikke den totale veien.
            Hvorfor? Fordi Newtons lover handler om krefter og akselerasjon, som endrer <em>hastighet</em> —
            en vektorstørrelse med retning. Forflytning bevarer retningsinformasjonen; distanse gjør det ikke.
          </p>
          <p className="text-sm mt-2">
            <strong>Visuelt:</strong> Tenk på en jogger som løper 5 km til høyre og 3 km tilbake til venstre.
            GPS-en viser 8 km (distanse), men hun er bare 2 km fra start (forflytning). I kinematikk
            er det forflytningen som kobler til fysikkens lover.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Forflytning er som <strong>heisknappen</strong> — du trykker 5. etasje, og heisen vet at den
            skal opp 3 etasjer fra 2. etasje. Den bryr seg ikke om du først tok trappen ned til kjelleren.
            Gjennomsnittsfart er gjennomsnittlig «heishastighet» mellom start- og sluttposisjonen.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Gjennomsnittsfart = total distanse / tid»</strong> — Det er gjennomsnittlig <em>fart (speed)</em>, ikke gjennomsnittlig <em>hastighet (velocity)</em>. Gjennomsnittsfart (velocity) = forflytning/tid og kan være negativ eller null.</li>
            <li>• <strong>«Gjennomsnittsfart = gjennomsnittet av startfart og sluttfart»</strong> — Bare sant for konstant akselerasjon! Generelt er det <InlineLatex latex="\bar{v} = \Delta x/\Delta t" />.</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 2.2 Momentanfart */}
      <TheorySummary
        title="2.2 Momentanfart"
        mustKnow={[
          "Momentanfart v = dx/dt (den deriverte av posisjon mhp. tid)",
          "Grafisk: v = stigningstallet til tangenten i x-t-grafen",
          "Positiv v → beveger seg i positiv x-retning",
          "v = 0 i vendepunktet (f.eks. toppunktet i fritt fall)",
        ]}
      >
        <p>
          Gjennomsnittsfarten forteller oss om bevegelsen over et <em>tidsintervall</em>.
          Men hva er farten i et bestemt <em>øyeblikk</em>?
        </p>

        <FormulaBox
          latex="v = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t} = \frac{dx}{dt} = x'(t)"
          title="Momentanfart"
          variant="gold"
          description="Momentanfarten er den tidsderiverte av posisjonsfunksjonen. Grafisk: stigningstallet til tangenten i x-t-grafen."
        />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Viktig distinksjon</p>
          <p>
            <strong>Fart</strong> (velocity) er en vektorstørrelse med fortegn — den forteller retning.
          </p>
          <p>
            <strong>Fartens størrelse</strong> (speed) = <InlineLatex latex="|v|" /> — alltid positiv.
          </p>
        </div>

        <p className="mt-4">
          <strong>Tolkning av fortegn:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Positiv stigning i x-t-grafen → positiv fart → beveger seg i +x-retning</li>
          <li>Negativ stigning → negativ fart → beveger seg i −x-retning</li>
          <li>Toppunkt/bunnpunkt (horisontal tangent) → <InlineLatex latex="v = 0" /> (vendepunkt)</li>
        </ul>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor den deriverte?</p>
          <p className="text-sm">
            Gjennomsnittsfarten forteller deg hva som skjedde «i snitt» over et tidsintervall. Men farten
            kan variere mye i løpet av intervallet. Momentanfarten er det du leser av på speedometeret
            akkurat <em>nå</em> — i dette ene øyeblikket.
          </p>
          <p className="text-sm mt-2">
            Matematisk er dette en <strong>grenseverdi</strong>: vi gjør tidsintervallet uendelig lite.
            Da blir sekanten til tangenten, og gjennomsnittsfart blir momentanfart. Det er nettopp
            dette den deriverte gjør: <InlineLatex latex="v = dx/dt" />.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på farten din på en biltur. Gjennomsnittsfarten for hele turen kan være 60 km/t,
            men underveis var du kanskje opp i 100 km/t og stod stille i kø. <strong>Speedometeret</strong>
            viser momentanfarten — farten akkurat nå. I fysikk er <InlineLatex latex="v = dx/dt" /> det
            matematiske speedometeret.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«v = 0 betyr at legemet står stille for alltid»</strong> — Nei! Det betyr at det er stille <em>akkurat nå</em>. En ball kastet opp har v = 0 i toppunktet, men den akselererer stadig nedover.</li>
            <li>• <strong>«Negativ fart betyr at legemet bremser»</strong> — Nei! Negativt fortegn betyr at det beveger seg i negativ retning. Om det bremser avhenger av forholdet mellom v og a.</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 2.3 Akselerasjon */}
      <TheorySummary
        title="2.3 Gjennomsnittlig og momentan akselerasjon"
        mustKnow={[
          "Gjennomsnittlig akselerasjon ā = Δv/Δt",
          "Momentanakselerasjon a = dv/dt = d²x/dt²",
          "Grafisk: a = stigningstallet til tangenten i v-t-grafen",
          "a kan ha motsatt fortegn av v (bremser opp)",
        ]}
      >
        <p>
          Når farten endrer seg, har vi <strong>akselerasjon</strong> — akselerasjon er
          endringsraten til farten.
        </p>

        <FormulaBox
          latex="\bar{a} = \frac{\Delta v}{\Delta t} = \frac{v_2 - v_1}{t_2 - t_1}"
          title="Gjennomsnittlig akselerasjon"
          variant="blue"
          description="Enhet: m/s²."
        />

        <FormulaBox
          latex="a = \lim_{\Delta t \to 0} \frac{\Delta v}{\Delta t} = \frac{dv}{dt} = \frac{d^2x}{dt^2}"
          title="Momentanakselerasjon"
          variant="gold"
          description="Akselerasjonen er den tidsderiverte av farten, eller den andrederiverte av posisjonen."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fortegn og retning</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <InlineLatex latex="v > 0" /> og <InlineLatex latex="a > 0" />: Farten øker i +x-retning (akselererer)</li>
            <li>• <InlineLatex latex="v > 0" /> og <InlineLatex latex="a < 0" />: Farten minker (bremser opp)</li>
            <li>• <InlineLatex latex="v < 0" /> og <InlineLatex latex="a < 0" />: Farten øker i −x-retning</li>
            <li>• <InlineLatex latex="v < 0" /> og <InlineLatex latex="a > 0" />: Farten minker (bremser opp)</li>
          </ul>
          <p className="mt-2 text-sm font-semibold">
            Når <InlineLatex latex="v" /> og <InlineLatex latex="a" /> har <em>motsatt</em> fortegn → legemet bremser opp.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor er akselerasjon så viktig?</p>
          <p className="text-sm">
            Akselerasjon er broen mellom <strong>kinematikk</strong> (beskrivelse av bevegelse) og
            <strong> dynamikk</strong> (årsaken til bevegelse). Newtons 2. lov sier at <InlineLatex latex="F = ma" /> —
            krefter forårsaker akselerasjon. Derfor er akselerasjon det fysiske bindeleddet mellom
            krefter og bevegelse.
          </p>
          <p className="text-sm mt-2">
            <strong>Visuelt:</strong> Hvis du ser en x-t-graf og den kurver oppover (konkav opp), er akselerasjonen positiv.
            Kurver den nedover (konkav ned), er akselerasjonen negativ. En rett linje betyr null akselerasjon.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            I en bil er gasspedalen «positiv akselerasjon» og bremsen er «negativ akselerasjon» (retardasjon).
            Akselerasjon er hvor hardt du <strong>trykker på pedalen</strong> — ikke hvor fort du kjører.
            Du kan kjøre 100 km/t med null akselerasjon (konstant fart), eller stå stille med
            stor akselerasjon (gasspedalen er i bunnen, men du nettopp begynte å kjøre).
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Positiv akselerasjon betyr at farten øker»</strong> — Bare hvis farten er positiv! Hvis v &lt; 0 og a &gt; 0, bremser legemet. Det er samspillet mellom fortegnene som avgjør.</li>
            <li>• <strong>«Akselerasjon og fart peker alltid i samme retning»</strong> — Feil! Når du bremser en bil, peker akselerasjonen motsatt av bevegelsesretningen.</li>
            <li>• <strong>«Null fart betyr null akselerasjon»</strong> — Klassisk feil! En ball i toppunktet av et kast har v = 0 men a = −g. Akselerasjon handler om <em>endring</em> i fart, ikke farten selv.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Tips: Fortegnsanalyse</p>
          <p className="text-sm">
            Lag en tabell som den over. For hver kombinasjon av v og a, spør: <em>Øker eller minker fartens
            størrelse?</em> Regelen er enkel:
          </p>
          <ul className="space-y-1 text-sm mt-2">
            <li>• <strong>Samme fortegn</strong> på v og a → farten <strong>øker</strong> (legemet akselererer)</li>
            <li>• <strong>Motsatt fortegn</strong> på v og a → farten <strong>minker</strong> (legemet bremser)</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 2.4 Konstant akselerasjon — med visualisering innebygd */}
      <TheorySummary
        title="2.4 Bevegelse med konstant akselerasjon"
        mustKnow={[
          "De fire bevegelseslikningene (se formler under)",
          "Utledet ved integrasjon fra a = konstant",
          "Velg likning ut fra hvilke størrelser som er kjent/ukjent",
          "Gjelder KUN når akselerasjonen er konstant!",
        ]}
      >
        <p>
          Når akselerasjonen er <strong>konstant</strong> (<InlineLatex latex="a = \bar{a}" />), kan vi
          utlede fire likninger som kobler posisjon, fart, akselerasjon og tid. Disse er de viktigste
          verktøyene i kinematikk.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Utledning (integrasjon)</p>
          <p className="text-sm">
            Start: <InlineLatex latex="\frac{dv}{dt} = a" /> (konstant).
            Integrer: <InlineLatex latex="\int dv = a\int dt \;\Rightarrow\; v = v_0 + at" />.
          </p>
          <p className="text-sm mt-1">
            Videre: <InlineLatex latex="\frac{dx}{dt} = v_0 + at" />.
            Integrer: <InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" />.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="v = v_0 + at"
            title="Likning 1"
            variant="gold"
            description="Fart som funksjon av tid. Mangler: x."
          />
          <FormulaBox
            latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2"
            title="Likning 2"
            variant="gold"
            description="Posisjon som funksjon av tid. Mangler: v."
          />
          <FormulaBox
            latex="v^2 = v_0^2 + 2a(x - x_0)"
            title="Likning 3"
            variant="gold"
            description="Kobler fart og posisjon. Mangler: t."
          />
          <FormulaBox
            latex="x - x_0 = \tfrac{1}{2}(v_0 + v)\,t"
            title="Likning 4"
            variant="gold"
            description="Gjennomsnittsfart × tid. Mangler: a."
          />
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hvordan velge riktig likning?</p>
          <p className="text-sm">
            Hver likning kobler <strong>fire</strong> av de fem størrelsene (<InlineLatex latex="x, v, v_0, a, t" />).
            Finn ut hvilken størrelse du <em>ikke</em> trenger og <em>ikke</em> kjenner — bruk
            likningen som mangler den størrelsen.
          </p>
        </div>

        {/* Visualisering innebygd direkte i teoriseksjonen */}
        <KinematicsGraphs />

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor akkurat disse fire likningene?</p>
          <p className="text-sm">
            Vi har fem kinematiske størrelser: <InlineLatex latex="x, v, v_0, a, t" />. Hver likning
            kobler fire av dem — og «mangler» den femte. Det gir oss nettopp fire uavhengige likninger,
            som er alt vi trenger for å løse ethvert problem med konstant akselerasjon.
          </p>
          <p className="text-sm mt-2">
            <strong>Fysisk intuisjon for likning 2:</strong> <InlineLatex latex="x = x_0 + v_0t + \frac{1}{2}at^2" /> —
            første ledd er startposisjon, andre ledd er «hva som hadde skjedd uten akselerasjon»,
            og tredje ledd er «bidraget fra akselerasjonen». <InlineLatex latex="\frac{1}{2}at^2" /> vokser
            med <InlineLatex latex="t^2" /> fordi akselerasjonen gir <em>mer og mer</em> fart over tid.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på en bil som akselererer fra lyskryss. <InlineLatex latex="v = v_0 + at" /> er som:
            «Farten min nå = farten jeg hadde + det farten har endret seg». <InlineLatex latex="x = x_0 + v_0t + \frac{1}{2}at^2" />
            er som: «Hvor er jeg nå = hvor jeg stod + det jeg ville kjørt med gammel fart + ekstra avstand
            fordi farten øker underveis.»
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Disse likningene gjelder alltid»</strong> — Nei! De gjelder <em>bare</em> for konstant akselerasjon. Varierer a med tid, må du integrere (seksjon 2.6).</li>
            <li>• <strong>«Jeg kan bruke hvilken som helst likning»</strong> — Du trenger den som inneholder de størrelsene du kjenner og den du søker. Bruk «mangler-metoden».</li>
            <li>• <strong>«x₀ er alltid null»</strong> — Bare hvis du velger startposisjonen som origo! Les oppgaven nøye.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Oppskrift: Slik løser du kinematikkoppgaver</p>
          <ol className="space-y-1.5 text-sm list-decimal list-inside">
            <li><strong>Tegn figur</strong> — vis bevegelsesretning, velg positiv retning</li>
            <li><strong>List opp kjente</strong> — skriv opp <InlineLatex latex="x_0, v_0, a, t, v, x" /> med verdier</li>
            <li><strong>Identifiser ukjent</strong> — hva spør oppgaven etter?</li>
            <li><strong>Finn «mangler»</strong> — hvilken størrelse verken er kjent eller søkt? Bruk likningen som mangler den.</li>
            <li><strong>Løs algebraisk</strong> — isolér den ukjente, sett inn tall til slutt</li>
            <li><strong>Sjekk</strong> — har svaret riktig enhet? Er fortegnet fornuftig? Er størrelsesorden rimelig?</li>
          </ol>
        </div>
      </TheorySummary>

      {/* 2.5 Fritt fall — med visualisering innebygd */}
      <TheorySummary
        title="2.5 Legemer i fritt fall"
        mustKnow={[
          "Fritt fall: kun tyngdekraften virker (ingen luftmotstand)",
          "a = g = 9,81 m/s² rettet nedover",
          "Med y-akse oppover: aᵧ = −g",
          "Akselerasjonen er −g ALLTID, selv i toppunktet (v = 0)",
          "Alle legemer faller likt uavhengig av masse (Galilei)",
        ]}
      >
        <p>
          Fritt fall er et spesialtilfelle av konstant akselerasjon. Et legeme i fritt fall
          påvirkes <strong>kun av tyngdekraften</strong> (vi neglisjerer luftmotstand).
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Galileos innsikt</p>
          <p>
            Alle legemer faller med <strong>samme akselerasjon</strong> uavhengig av masse
            (når luftmotstanden neglisjeres). På jordens overflate:
          </p>
          <div className="mt-2">
            <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" />
          </div>
        </div>

        <p className="mt-4">
          Med positiv y-akse <strong>oppover</strong> og <InlineLatex latex="a_y = -g" />, får vi
          bevegelseslikningene for fritt fall:
        </p>

        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <FormulaBox
            latex="v_y = v_{0y} - gt"
            title="Fart i fritt fall"
            variant="gold"
          />
          <FormulaBox
            latex="y = y_0 + v_{0y}\,t - \tfrac{1}{2}g\,t^2"
            title="Posisjon i fritt fall"
            variant="gold"
          />
          <FormulaBox
            latex="v_y^2 = v_{0y}^2 - 2g(y - y_0)"
            title="Fart–posisjon (fritt fall)"
            variant="gold"
          />
          <FormulaBox
            latex="y - y_0 = \tfrac{1}{2}(v_{0y} + v_y)\,t"
            title="Gjennomsnittsfart (fritt fall)"
            variant="blue"
          />
        </div>

        {/* Simulator innebygd direkte i teoriseksjonen */}
        <FreeFallSimulator />

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig feil!</p>
          <p className="text-sm">
            Mange studenter tror at akselerasjonen er null i toppunktet fordi farten er null der.
            <strong> Det er feil!</strong> Akselerasjonen er <InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" />{" "}
            <em>hele tiden</em>, også i toppunktet. Farten er null i et øyeblikk, men den
            <em> endrer seg</em> — nettopp fordi akselerasjonen ikke er null.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor faller alt likt?</p>
          <p className="text-sm">
            Galileos geniale innsikt (bekreftet av Newton): Tyngdekraften på et legeme er proporsjonal
            med massen (<InlineLatex latex="F = mg" />), men akselerasjonen krever deling på massen
            (<InlineLatex latex="a = F/m = mg/m = g" />). Massen kansellerer! Derfor er akselerasjonen
            den samme for alle legemer, uavhengig av masse.
          </p>
          <p className="text-sm mt-2">
            <strong>Visuelt bilde:</strong> Se for deg at du slipper en bowlingkule og en tennisball
            fra samme høyde (i vakuum). De treffer bakken samtidig! Bowlingkulen har mer tyngdekraft, men den
            «trenger også mer kraft for å akselerere» (større treghet). De to effektene kansellerer perfekt.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Fritt fall er som en <strong>rulletrapp som stadig går raskere nedover</strong>. Uansett om
            du «startet» med å stå stille (slipp fra ro) eller med å hoppe oppover (kast oppover),
            trekker rulletrappen deg nedover med konstant akselerasjon. I toppunktet av et kast står du
            et øyeblikk stille — men rulletrappen stopper aldri.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«I toppunktet er a = 0 fordi v = 0»</strong> — Den vanligste feilen! a = −g <em>hele tiden</em>, også i toppunktet. Farten er null et øyeblikk, men endrer seg umiddelbart.</li>
            <li>• <strong>«Tyngre ting faller raskere»</strong> — Bare på grunn av luftmotstand. I vakuum faller alt likt. Fjæren og hammeren på månen (Apollo 15) er det berømte eksperimentet.</li>
            <li>• <strong>«g er negativ»</strong> — Nei! <InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> er alltid <em>positiv</em>. Det er akselerasjonen <InlineLatex latex="a_y = -g" /> som er negativ (med y oppover).</li>
            <li>• <strong>«Fritt fall betyr at det faller nedover»</strong> — Fritt fall inkluderer også oppover-bevegelse! Et kast rett opp er fritt fall fra det øyeblikket du slipper ballen.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Tips: Velg koordinatsystem</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>Positiv y oppover</strong> er standard. Da er <InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" /></li>
            <li>• <strong>Legg origo</strong> der det er praktisk — vanligvis startpunktet eller bakkenivå</li>
            <li>• <strong>Kast oppover:</strong> <InlineLatex latex="v_0 > 0" />, <InlineLatex latex="a < 0" />. I toppunktet: <InlineLatex latex="v = 0" /></li>
            <li>• <strong>Slipp fra ro:</strong> <InlineLatex latex="v_0 = 0" />. Bruk <InlineLatex latex="y = y_0 - \frac{1}{2}gt^2" /> for falltid</li>
            <li>• <strong>Symmetri ved kast:</strong> Tiden opp = tiden ned (til samme høyde). Farten ved landing = startfarten (i størrelse)</li>
          </ul>
        </div>
      </TheorySummary>

      {/* 2.6 Integrasjon */}
      <TheorySummary
        title="2.6 Fart og posisjon ved integrasjon"
        mustKnow={[
          "Når a varierer med tid: v(t) = v₀ + ∫a(t)dt",
          "x(t) = x₀ + ∫v(t)dt",
          "Kan IKKE bruke de fire standardlikningene når a ≠ konstant",
          "Maksimal fart: sett a(t) = 0 (der akselerasjonen skifter fortegn)",
        ]}
      >
        <p>
          Hva gjør vi når akselerasjonen <strong>varierer med tiden</strong>? Da kan vi
          ikke bruke de fire standardlikningene. I stedet må vi <strong>integrere</strong>.
        </p>

        <FormulaBox
          latex="v(t) = v_0 + \int_0^t a(t')\,dt'"
          title="Fart ved integrasjon"
          variant="gold"
          description="Integrerer akselerasjonen fra t = 0 til t for å finne farten."
        />
        <FormulaBox
          latex="x(t) = x_0 + \int_0^t v(t')\,dt'"
          title="Posisjon ved integrasjon"
          variant="gold"
          description="Integrerer farten fra t = 0 til t for å finne posisjonen."
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Når bruker du integrasjon?</p>
          <ul className="space-y-1 text-sm">
            <li>• Akselerasjonen er oppgitt som en funksjon av tid, f.eks. <InlineLatex latex="a(t) = 2 - 0{,}1t" /></li>
            <li>• Farten er oppgitt som en funksjon av tid, og du trenger posisjonen</li>
            <li>• Standardlikningene gjelder IKKE når <InlineLatex latex="a \neq \text{konstant}" /></li>
          </ul>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Tips: Finn maksimal fart</p>
          <p className="text-sm">
            Farten er maksimal (eller minimal) der <InlineLatex latex="\frac{dv}{dt} = a(t) = 0" />.
            Sett akselerasjonsfunksjonen lik null og løs for <InlineLatex latex="t" />.
          </p>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor integrasjon?</p>
          <p className="text-sm">
            Derivasjon og integrasjon er <strong>motsatte operasjoner</strong>. Vi deriverer posisjon for
            å finne fart (<InlineLatex latex="v = dx/dt" />), og deriverer fart for å finne akselerasjon
            (<InlineLatex latex="a = dv/dt" />). Integrasjon går den andre veien: fra akselerasjon til
            fart, og fra fart til posisjon.
          </p>
          <p className="text-sm mt-2">
            <strong>Visuelt:</strong> I en v-t-graf er <strong>arealet under kurven</strong> lik forflytningen.
            Når farten varierer, kan vi ikke bare gange fart med tid — vi må «summere opp» alle de
            uendelig små bidragene. Det er nettopp det integralet gjør.
          </p>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Hverdagsanalogi</p>
          <p className="text-sm">
            Tenk på vannforbruk. <strong>Akselerasjon</strong> er hvor raskt du skrur opp kranen (endring i
            vannstrøm). <strong>Fart</strong> er vannstrømmen (liter per minutt). <strong>Posisjon</strong>
            er total mengde vann i bøtten. For å finne total mengde vann (posisjon) når strømmen varierer,
            må du «integrere» strømmen over tid — det tilsvarer arealet under v-t-kurven.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlige misforståelser</p>
          <ul className="space-y-1.5 text-sm">
            <li>• <strong>«Jeg kan alltid bruke standardlikningene»</strong> — Nei! <InlineLatex latex="v = v_0 + at" /> etc. gjelder <em>kun</em> for konstant a. Bruk integrasjon for variabel akselerasjon.</li>
            <li>• <strong>«Glemmer initialbetingelsen»</strong> — Når du integrerer, husk å legge til <InlineLatex latex="v_0" /> eller <InlineLatex latex="x_0" />. Uten dette mister du startpunktet!</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Tips: Integrasjon steg for steg</p>
          <ol className="space-y-1.5 text-sm list-decimal list-inside">
            <li>Skriv opp <InlineLatex latex="a(t)" /> og identifiser at den <em>ikke</em> er konstant</li>
            <li>Integrer: <InlineLatex latex="v(t) = v_0 + \int_0^t a(t')\,dt'" /></li>
            <li>Integrer igjen: <InlineLatex latex="x(t) = x_0 + \int_0^t v(t')\,dt'" /></li>
            <li>Sett inn grensene og forenk</li>
            <li>Bruk initialbetingelsene til å bestemme eventuelle konstanter</li>
          </ol>
        </div>
      </TheorySummary>
    </div>
  );
}
