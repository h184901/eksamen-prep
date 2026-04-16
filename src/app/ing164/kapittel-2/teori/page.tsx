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

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: Skalar vs. vektor på eksamen</p>
          <p className="text-sm mb-2">
            Dette er <strong>den klassiske eksamensfellen</strong> i kap. 2. Sørg for at du
            skjønner forskjellen på norsk:
          </p>
          <div className="bg-white/60 dark:bg-black/30 rounded p-3 my-2 font-mono text-sm space-y-1.5">
            <div>Gjennomsnittlig <strong>fart</strong> (speed, skalar) = tilbakelagt distanse / Δt</div>
            <div>Gjennomsnittlig <strong>hastighet</strong> (velocity, vektor) = Δx / Δt = forflytning / Δt</div>
          </div>
          <p className="text-sm mt-2">
            <strong>Test-oppgave:</strong> En løper jogger 400 m rundt en rundbane på 80 s og
            ender der hun startet. Gjennomsnittsfart = 400/80 = <strong>5 m/s</strong>.
            Gjennomsnittshastighet = 0/80 = <strong>0 m/s</strong> (forflytningen er null!).
          </p>
          <p className="text-sm mt-2">
            På eksamen: les oppgaven NØYE. Spør oppgaven etter «gjennomsnittsfart» (tallet på
            speedometeret i snitt), «gjennomsnittshastighet» (med retning), eller «gjennomsnittlig
            hastighetsstørrelse»? Ordene er forskjellige — og svarene kan være forskjellige.
          </p>
        </div>

        {/* SVG: x-t-graf med sekant og forflytning */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 420 260" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Akser */}
            <g stroke="currentColor" fill="none" strokeWidth="1.5">
              <line x1="50" y1="220" x2="400" y2="220" />
              <line x1="50" y1="30" x2="50" y2="220" />
              {/* Pilspisser */}
              <polygon points="400,220 392,216 392,224" fill="currentColor" />
              <polygon points="50,30 46,38 54,38" fill="currentColor" />
            </g>
            {/* Akseetiketter */}
            <text x="405" y="225" className="fill-current text-xs">t</text>
            <text x="35" y="28" className="fill-current text-xs">x</text>
            {/* Kurve: x(t) som en buet funksjon */}
            <path d="M 70,200 Q 180,180 220,120 T 370,60" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
            {/* To punkter på kurven */}
            <circle cx="100" cy="193" r="4" fill="#ef4444" />
            <circle cx="340" cy="72" r="4" fill="#ef4444" />
            {/* Sekant (rett linje mellom punktene) */}
            <line x1="100" y1="193" x2="340" y2="72" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4" />
            {/* Merkelapper */}
            <text x="85" y="210" className="fill-current text-xs">(t₁, x₁)</text>
            <text x="325" y="60" className="fill-current text-xs">(t₂, x₂)</text>
            <text x="210" y="120" className="fill-current text-xs" fill="#f59e0b">sekant: v̄</text>
            {/* Δx og Δt */}
            <line x1="340" y1="193" x2="340" y2="72" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="100" y1="193" x2="340" y2="193" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="350" y="135" className="fill-current text-xs" fill="#10b981">Δx</text>
            <text x="210" y="208" className="fill-current text-xs" fill="#10b981">Δt</text>
            <text x="210" y="250" textAnchor="middle" className="fill-current text-xs">Gjennomsnittsfart = stigning på sekanten</text>
          </svg>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">Videre lesning</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.khanacademy.org/science/physics" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy — Physics (one-dimensional motion)</a></li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics — Motion concepts</a></li>
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

        {/* SVG: tangent på x-t-graf */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 420 260" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" fill="none" strokeWidth="1.5">
              <line x1="50" y1="220" x2="400" y2="220" />
              <line x1="50" y1="30" x2="50" y2="220" />
              <polygon points="400,220 392,216 392,224" fill="currentColor" />
              <polygon points="50,30 46,38 54,38" fill="currentColor" />
            </g>
            <text x="405" y="225" className="fill-current text-xs">t</text>
            <text x="35" y="28" className="fill-current text-xs">x</text>
            {/* Kurve */}
            <path d="M 70,200 Q 180,180 220,120 T 370,60" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
            {/* Tangent i punkt P */}
            <circle cx="220" cy="120" r="4" fill="#ef4444" />
            <line x1="130" y1="175" x2="310" y2="65" stroke="#10b981" strokeWidth="2" />
            <text x="215" y="145" className="fill-current text-xs" fill="#ef4444">P</text>
            <text x="135" y="170" className="fill-current text-xs" fill="#10b981">tangent: v(t)</text>
            {/* Hjelpelinjer som viser sekant blir tangent */}
            <line x1="220" y1="120" x2="270" y2="90" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="220" y1="120" x2="250" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
            <text x="210" y="250" textAnchor="middle" className="fill-current text-xs">Momentanfart = tangentens stigning i punktet</text>
          </svg>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon: Fra sekant til tangent</p>
          <p className="text-sm">
            Se på et punkt P i x-t-grafen. Plasser et nabopunkt P' og trekk sekanten — den gir gjennomsnittsfarten
            mellom de to. Flytt P' nærmere og nærmere P. Sekanten <em>roterer</em> og nærmer seg en grenseposisjon:
            det er <strong>tangenten</strong> i P. Stigningen til tangenten er momentanfarten. Dette er den
            geometriske essensen av den deriverte.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Sammenheng med kap. 6 (arbeid og energi)</p>
          <p className="text-sm">
            Momentanfart er det som inngår i kinetisk energi: <InlineLatex latex="K = \tfrac{1}{2}mv^2" />.
            Derfor må du forstå skillet mellom <em>gjennomsnittsfart</em> (mellom to tidspunkter) og
            <em> momentanfart</em> (akkurat nå) — energibetraktninger bruker alltid momentanfarten i gitte
            øyeblikk. I kap. 6 vil du se at arbeid gjort av nettokraft <InlineLatex latex="= \Delta K" />,
            hvor K bruker <InlineLatex latex="v^2" /> på et bestemt tidspunkt.
          </p>
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

        {/* SVG: tre grafer side om side — x-t, v-t, a-t */}
        <div className="my-6">
          <p className="text-sm font-semibold mb-2 text-center">Sammenhengen mellom x(t), v(t) og a(t) ved konstant akselerasjon</p>
          <div className="flex justify-center">
            <svg viewBox="0 0 720 220" className="w-full max-w-3xl" xmlns="http://www.w3.org/2000/svg">
              {/* x-t graf */}
              <g>
                <line x1="30" y1="180" x2="220" y2="180" stroke="currentColor" strokeWidth="1.5" />
                <line x1="30" y1="30" x2="30" y2="180" stroke="currentColor" strokeWidth="1.5" />
                <text x="222" y="185" className="fill-current text-xs">t</text>
                <text x="18" y="28" className="fill-current text-xs">x</text>
                {/* Parabel */}
                <path d="M 35,170 Q 85,140 120,95 T 210,40" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                <text x="125" y="210" textAnchor="middle" className="fill-current text-xs">x = x₀ + v₀t + ½at²</text>
              </g>
              {/* v-t graf */}
              <g>
                <line x1="270" y1="180" x2="460" y2="180" stroke="currentColor" strokeWidth="1.5" />
                <line x1="270" y1="30" x2="270" y2="180" stroke="currentColor" strokeWidth="1.5" />
                <text x="462" y="185" className="fill-current text-xs">t</text>
                <text x="258" y="28" className="fill-current text-xs">v</text>
                {/* Rett linje (lineær) */}
                <line x1="275" y1="150" x2="455" y2="50" stroke="#10b981" strokeWidth="2.5" />
                {/* Areal under kurven (forflytning) */}
                <path d="M 275,150 L 455,50 L 455,180 L 275,180 Z" fill="#10b981" fillOpacity="0.15" />
                <text x="360" y="140" textAnchor="middle" className="fill-current text-xs" fill="#10b981">Δx = areal</text>
                <text x="365" y="210" textAnchor="middle" className="fill-current text-xs">v = v₀ + at</text>
              </g>
              {/* a-t graf */}
              <g>
                <line x1="510" y1="180" x2="700" y2="180" stroke="currentColor" strokeWidth="1.5" />
                <line x1="510" y1="30" x2="510" y2="180" stroke="currentColor" strokeWidth="1.5" />
                <text x="702" y="185" className="fill-current text-xs">t</text>
                <text x="498" y="28" className="fill-current text-xs">a</text>
                {/* Horisontal linje (konstant a) */}
                <line x1="515" y1="90" x2="695" y2="90" stroke="#ef4444" strokeWidth="2.5" />
                <path d="M 515,90 L 695,90 L 695,180 L 515,180 Z" fill="#ef4444" fillOpacity="0.1" />
                <text x="605" y="80" textAnchor="middle" className="fill-current text-xs" fill="#ef4444">Δv = areal</text>
                <text x="605" y="210" textAnchor="middle" className="fill-current text-xs">a = konstant</text>
              </g>
            </svg>
          </div>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Viktigste geometriske innsikt: Areal under v-t-grafen = forflytning</p>
          <p className="text-sm">
            Se på midtgrafen over. Arealet under v(t)-kurven mellom <InlineLatex latex="t_1" /> og
            <InlineLatex latex="t_2" /> er <em>alltid</em> lik forflytningen <InlineLatex latex="\Delta x" /> —
            uansett formen på kurven. Dette er fundamentalt og direkte koblet til integrasjon:
            <InlineLatex latex="\Delta x = \int v\,dt" />.
          </p>
          <p className="text-sm mt-2">
            <strong>Dette blir fryktelig viktig i kap. 6:</strong> Arbeid er <InlineLatex latex="W = \int F\,dx" /> —
            arealet under F-x-kurven. Samme mønster, ny kontekst. Når du ser et produkt som skal summeres over et
            intervall der den ene faktoren varierer, er svaret alltid «arealet under kurven».
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Sammenheng: kap. 4 og Newtons 2. lov</p>
          <p className="text-sm">
            Akselerasjon er ikke bare en matematisk konstruksjon. Newtons 2. lov sier
            <InlineLatex latex="\vec{F}_{\text{net}} = m\vec{a}" />. Det betyr at <em>akselerasjonen er direkte
            proporsjonal med netto kraft</em>. I kap. 2 tar vi akselerasjonen som gitt og finner bevegelse;
            i kap. 4 regner vi ut akselerasjonen fra krefter og bruker kinematikken herfra til å finne bevegelsen.
          </p>
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

        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Matematikk-sjekk: Utledning av likning 3 (den tidløse)</p>
          <p className="text-sm mb-2">
            Hvordan får vi <InlineLatex latex="v^2 = v_0^2 + 2a(x-x_0)" /> ut fra de to
            første likningene? Målet: eliminere <InlineLatex latex="t" />.
          </p>
          <div className="bg-white/60 dark:bg-black/30 rounded p-3 my-2 font-mono text-sm space-y-1.5">
            <div>Steg 1 (løs likning 1 for t):</div>
            <div className="pl-3"><InlineLatex latex="v = v_0 + at \;\Rightarrow\; t = (v - v_0)/a" /></div>
            <div className="mt-2">Steg 2 (sett inn i likning 2):</div>
            <div className="pl-3"><InlineLatex latex="x - x_0 = v_0 \cdot \tfrac{v - v_0}{a} + \tfrac{1}{2}a \left(\tfrac{v - v_0}{a}\right)^2" /></div>
            <div className="mt-2">Steg 3 (multipliser begge sider med 2a):</div>
            <div className="pl-3"><InlineLatex latex="2a(x - x_0) = 2v_0(v - v_0) + (v - v_0)^2" /></div>
            <div className="mt-2">Steg 4 (ekspander):</div>
            <div className="pl-3"><InlineLatex latex="2a(x - x_0) = 2v_0 v - 2v_0^2 + v^2 - 2v_0 v + v_0^2" /></div>
            <div className="mt-2">Steg 5 (forenkle — <InlineLatex latex="2v_0 v" />-leddene kanselleres):</div>
            <div className="pl-3"><InlineLatex latex="2a(x - x_0) = v^2 - v_0^2" /></div>
            <div className="mt-2 font-semibold">Resultat: <InlineLatex latex="v^2 = v_0^2 + 2a(x - x_0)" /></div>
          </div>
          <p className="text-sm mt-2">
            Poenget: Likning 3 er <em>ikke</em> en ny fysikk — den er likning 1 og 2 kombinert.
            Det er derfor den alltid gir samme svar, og det er derfor tiden ikke er med.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: Gjennomsnittsfart vs. gjennomsnittlig fart</p>
          <p className="text-sm mb-2">
            En vanlig eksamensfelle: «En bil kjører 60 km/t første halvdel av turen, og 40 km/t
            andre halvdel. Hva er gjennomsnittsfarten?» Mange svarer instinktivt 50 km/t — det er
            <strong> feil</strong>.
          </p>
          <ul className="text-sm space-y-1.5">
            <li>
              • <strong>Likning 4</strong> (<InlineLatex latex="x-x_0 = \tfrac{1}{2}(v_0+v)t" />)
              gir at gjennomsnittsfarten er <InlineLatex latex="(v_0+v)/2" /> — men <em>KUN</em> når
              akselerasjonen er <strong>konstant</strong>!
            </li>
            <li>
              • Ved to konstante faser med ulike farter er gjennomsnittsfarten
              <InlineLatex latex="\bar{v} = \Delta x / \Delta t" /> — bruk alltid definisjonen.
            </li>
            <li>
              • Hvis like lang <em>distanse</em> per fase: <InlineLatex latex="\bar{v} = 2v_1 v_2/(v_1+v_2)" /> (harmonisk middel).
            </li>
            <li>
              • Hvis like lang <em>tid</em> per fase: <InlineLatex latex="\bar{v} = (v_1+v_2)/2" /> (aritmetisk middel).
            </li>
          </ul>
          <p className="text-sm mt-2">
            Spør alltid: er akselerasjonen virkelig konstant gjennom hele intervallet? Hvis ikke,
            må du regne stykkevis.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-4 my-5 rounded-lg">
          <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Felle-varsel: Positiv vs. negativ akselerasjon</p>
          <p className="text-sm mb-2">
            «Bilen bremser med 5 m/s²» — er a = +5 eller a = −5 i formlene? Dette er kilden til
            halvparten av fortegnsfeilene på eksamen.
          </p>
          <ul className="text-sm space-y-1.5">
            <li>
              • Skriv ALLTID ned valgt positiv retning FØRST. Skriv det på arket.
            </li>
            <li>
              • Hvis bilen kjører i +x-retning (<InlineLatex latex="v_0 > 0" />) og bremser,
              er <InlineLatex latex="a < 0" /> — dvs. du setter inn <InlineLatex latex="a = -5\;\text{m/s}^2" />.
            </li>
            <li>
              • Du kan ikke «velge» at a er positiv bare fordi det ser penere ut — fortegnet
              bestemmes av fysikken og koordinatvalget.
            </li>
            <li>
              • Stopper bilen (<InlineLatex latex="v=0" />)? Bruk likning 3 med negativ a for å
              finne bremselengden.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kjennetegn i oppgaveteksten → hvilken formel?</p>
          <p className="text-sm mb-2">Oppgaver bruker bestemte formuleringer som er hint til hvilken størrelse som er gitt:</p>
          <ul className="text-sm space-y-1.5">
            <li>• <strong>«slippes fra ro»</strong> eller <strong>«starter i hvile»</strong> → <InlineLatex latex="v_0 = 0" /></li>
            <li>• <strong>«konstant akselerasjon»</strong> eller <strong>«jevnt akselerert»</strong> → bruk de fire kinematikklikningene</li>
            <li>• <strong>«stopper»</strong>, <strong>«når maksimal høyde»</strong> eller <strong>«kommer til ro»</strong> → <InlineLatex latex="v = 0" /> (sluttfart)</li>
            <li>• <strong>«Hvor langt...?»</strong> og ikke tid gitt → bruk likning 3 (<InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />)</li>
            <li>• <strong>«Hvor lang tid...?»</strong> og ikke sluttposisjon gitt → bruk likning 1 (<InlineLatex latex="v = v_0 + at" />)</li>
            <li>• <strong>«Hvilken posisjon etter t sekunder?»</strong> → bruk likning 2 (<InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" />)</li>
            <li>• <strong>«gjennomsnittsfart»</strong> oppgitt og søker sluttfart eller startfart → likning 4</li>
          </ul>
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

        {/* Tabell over de fire likningene */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-3">Likning</th>
                <th className="text-left py-2 pr-3">Inneholder</th>
                <th className="text-left py-2">Mangler</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-3"><InlineLatex latex="v = v_0 + at" /></td>
                <td className="py-2 pr-3"><InlineLatex latex="v, v_0, a, t" /></td>
                <td className="py-2"><strong><InlineLatex latex="x" /></strong></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-3"><InlineLatex latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2" /></td>
                <td className="py-2 pr-3"><InlineLatex latex="x, v_0, a, t" /></td>
                <td className="py-2"><strong><InlineLatex latex="v" /></strong></td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-3"><InlineLatex latex="v^2 = v_0^2 + 2a(x-x_0)" /></td>
                <td className="py-2 pr-3"><InlineLatex latex="x, v, v_0, a" /></td>
                <td className="py-2"><strong><InlineLatex latex="t" /></strong></td>
              </tr>
              <tr>
                <td className="py-2 pr-3"><InlineLatex latex="x - x_0 = \tfrac{1}{2}(v_0+v)t" /></td>
                <td className="py-2 pr-3"><InlineLatex latex="x, v, v_0, t" /></td>
                <td className="py-2"><strong><InlineLatex latex="a" /></strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon: Hvorfor er likning 3 så kraftig?</p>
          <p className="text-sm">
            <InlineLatex latex="v^2 = v_0^2 + 2a(x-x_0)" /> er tidløs — den inneholder ikke
            <InlineLatex latex="t" />. Bruk den når du ikke bryr deg om tiden («Hvor fort går kula når den treffer
            bakken?» eller «Hvor langt kjører bilen før den stopper?»). Den er dessuten fysikkens forkledde
            energiprinsipp: multipliser begge sider med <InlineLatex latex="\tfrac{1}{2}m" /> og du får
            <InlineLatex latex="\tfrac{1}{2}mv^2 = \tfrac{1}{2}mv_0^2 + ma \cdot \Delta x" /> — akkurat
            energiarbeidsetningen fra kap. 6.
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

        {/* SVG: Fartsvektorer langs et kast opp og ned */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 420 320" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Bakken */}
            <line x1="20" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="2" />
            {/* y-akse */}
            <line x1="60" y1="300" x2="60" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="60,30 56,38 64,38" fill="currentColor" />
            <text x="45" y="28" className="fill-current text-xs">y</text>
            {/* Kuler langs banen (oppgang) */}
            <circle cx="120" cy="270" r="8" fill="#3b82f6" />
            <circle cx="170" cy="200" r="8" fill="#3b82f6" />
            <circle cx="200" cy="130" r="8" fill="#3b82f6" />
            <circle cx="210" cy="80" r="8" fill="#ef4444" />
            {/* Fartspiler på vei opp — minker i størrelse */}
            <line x1="120" y1="270" x2="120" y2="230" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="120,225 116,232 124,232" fill="#10b981" />
            <line x1="170" y1="200" x2="170" y2="175" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="170,170 166,177 174,177" fill="#10b981" />
            <line x1="200" y1="130" x2="200" y2="118" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="200,113 196,120 204,120" fill="#10b981" />
            {/* Toppunktet: v = 0 */}
            <text x="225" y="85" className="fill-current text-xs" fill="#ef4444">v = 0 (topp)</text>
            {/* a piler — alltid nedover og samme lengde */}
            <line x1="120" y1="270" x2="120" y2="288" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="120,293 116,286 124,286" fill="#f59e0b" />
            <line x1="170" y1="200" x2="170" y2="218" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="170,223 166,216 174,216" fill="#f59e0b" />
            <line x1="200" y1="130" x2="200" y2="148" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="200,153 196,146 204,146" fill="#f59e0b" />
            <line x1="210" y1="80" x2="210" y2="98" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="210,103 206,96 214,96" fill="#f59e0b" />
            {/* Legende */}
            <line x1="300" y1="160" x2="300" y2="190" stroke="#10b981" strokeWidth="2.5" />
            <polygon points="300,192 296,185 304,185" fill="#10b981" />
            <text x="312" y="180" className="fill-current text-xs">v (fart)</text>
            <line x1="300" y1="210" x2="300" y2="240" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
            <polygon points="300,242 296,235 304,235" fill="#f59e0b" />
            <text x="312" y="230" className="fill-current text-xs">a = −g (konstant!)</text>
            <text x="210" y="315" textAnchor="middle" className="fill-current text-xs">Farten minker, men akselerasjonen er uforandret</text>
          </svg>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon: Symmetrien i fritt fall</p>
          <p className="text-sm">
            Kast en ball rett opp med fart <InlineLatex latex="v_0" />. På veien opp mister den
            <InlineLatex latex="g" /> m/s per sekund. På veien ned får den <InlineLatex latex="g" /> m/s per
            sekund. Derfor tar oppgangen like lang tid som nedgangen, og farten idet den returnerer til
            utkastnivået er <InlineLatex latex="-v_0" />. Akselerasjonen er den samme hele tiden —
            den bryr seg ikke om hvilken vei ballen beveger seg.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 my-4">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Sammenheng: kap. 3 (skrått kast) og kap. 7 (energi)</p>
          <p className="text-sm">
            Fritt fall er «halve historien» for skrått kast i kap. 3: der faller ballen samtidig som den har
            horisontal bevegelse. Den vertikale delen er nøyaktig fritt fall. I kap. 7 ser du at den
            kinetiske energien i toppunktet av et kast er konvertert til potensiell energi —
            <InlineLatex latex="\tfrac{1}{2}mv_0^2 = mgh" /> gir maks høyde uten å bruke tiden.
          </p>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">Videre lesning</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.khanacademy.org/science/physics" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Khan Academy — Free fall and projectile motion</a></li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics — Free fall motion</a></li>
            <li>• <a href="https://www.feynmanlectures.caltech.edu/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Feynman Lectures (vol. I, kap. 8)</a></li>
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

        {/* SVG: Kinematikkskjema derivasjon/integrasjon */}
        <div className="my-6 flex justify-center">
          <svg viewBox="0 0 500 200" className="w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
            {/* Tre bokser */}
            <rect x="20" y="70" width="110" height="60" rx="8" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <text x="75" y="100" textAnchor="middle" className="fill-current text-sm font-semibold" fill="#3b82f6">x(t)</text>
            <text x="75" y="118" textAnchor="middle" className="fill-current text-xs">posisjon</text>

            <rect x="195" y="70" width="110" height="60" rx="8" stroke="#10b981" strokeWidth="2" fill="none" />
            <text x="250" y="100" textAnchor="middle" className="fill-current text-sm font-semibold" fill="#10b981">v(t)</text>
            <text x="250" y="118" textAnchor="middle" className="fill-current text-xs">fart</text>

            <rect x="370" y="70" width="110" height="60" rx="8" stroke="#ef4444" strokeWidth="2" fill="none" />
            <text x="425" y="100" textAnchor="middle" className="fill-current text-sm font-semibold" fill="#ef4444">a(t)</text>
            <text x="425" y="118" textAnchor="middle" className="fill-current text-xs">akselerasjon</text>

            {/* Piler derivasjon (over) */}
            <path d="M 130,80 Q 160,50 195,80" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <polygon points="195,80 189,75 189,83" fill="#f59e0b" />
            <text x="162" y="45" textAnchor="middle" className="fill-current text-xs" fill="#f59e0b">d/dt</text>

            <path d="M 305,80 Q 335,50 370,80" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <polygon points="370,80 364,75 364,83" fill="#f59e0b" />
            <text x="337" y="45" textAnchor="middle" className="fill-current text-xs" fill="#f59e0b">d/dt</text>

            {/* Piler integrasjon (under) */}
            <path d="M 370,120 Q 340,155 305,120" stroke="#8b5cf6" strokeWidth="2" fill="none" />
            <polygon points="305,120 311,125 311,117" fill="#8b5cf6" />
            <text x="338" y="170" textAnchor="middle" className="fill-current text-xs" fill="#8b5cf6">∫ dt</text>

            <path d="M 195,120 Q 165,155 130,120" stroke="#8b5cf6" strokeWidth="2" fill="none" />
            <polygon points="130,120 136,125 136,117" fill="#8b5cf6" />
            <text x="163" y="170" textAnchor="middle" className="fill-current text-xs" fill="#8b5cf6">∫ dt</text>

            <text x="250" y="25" textAnchor="middle" className="fill-current text-xs font-semibold">Kinematikkhierarkiet</text>
          </svg>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Intuisjon: Når deriverer og når integrerer du?</p>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Oppgitt x(t), søker v eller a:</strong> Deriver. Det er trivielt — potensregelen er nok.</li>
            <li>• <strong>Oppgitt a(t), søker v eller x:</strong> Integrer. Husk initialbetingelser (<InlineLatex latex="v_0, x_0" />).</li>
            <li>• <strong>Oppgitt v(t) med a ≠ konstant:</strong> Integrer for å få x(t), deriver for å få a(t).</li>
            <li>• <strong>Konstant a:</strong> Bruk de fire kinematiske likningene — de <em>er</em> integralene allerede.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksempel — a(t) = 2 − 0,1t</p>
          <p className="text-sm">
            Gitt <InlineLatex latex="v_0 = 0" /> og <InlineLatex latex="x_0 = 0" />:
          </p>
          <p className="text-sm mt-2">
            <InlineLatex latex="v(t) = 0 + \int_0^t (2 - 0{,}1\tau)\,d\tau = 2t - 0{,}05t^2" />
          </p>
          <p className="text-sm mt-2">
            <InlineLatex latex="x(t) = 0 + \int_0^t (2\tau - 0{,}05\tau^2)\,d\tau = t^2 - \tfrac{0{,}05}{3}t^3" />
          </p>
          <p className="text-sm mt-2">
            <strong>Maks fart:</strong> <InlineLatex latex="a(t) = 0 \Rightarrow 2 - 0{,}1t = 0 \Rightarrow t = 20\,\text{s}" />.
            Sett inn: <InlineLatex latex="v_{\max} = 2\cdot 20 - 0{,}05\cdot 400 = 20\,\text{m/s}" />.
          </p>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 my-4">
          <p className="font-semibold text-sm mb-2">Videre lesning</p>
          <ul className="text-sm space-y-1">
            <li>• <a href="https://www.youtube.com/@3blue1brown" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">3Blue1Brown — Essence of Calculus</a> (derivasjon og integrasjon visuelt)</li>
            <li>• <a href="https://hyperphysics.phy-astr.gsu.edu/hbase/hframe.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">HyperPhysics — Calculus applied to motion</a></li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
