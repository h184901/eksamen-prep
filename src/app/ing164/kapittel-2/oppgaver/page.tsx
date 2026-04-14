"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <CollapsibleSection title="Oppgavestrategier">
      <div className="space-y-6">
        {/* Strategi 1 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Slik løser du en kinematikkoppgave</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Tegn figur</strong> med koordinatakse og definer positiv retning.</li>
            <li><strong>List opp kjente størrelser:</strong> <InlineLatex latex="x_0, v_0, a, t, x, v" />.</li>
            <li><strong>Identifiser den ukjente</strong> og den størrelsen du ikke trenger.</li>
            <li><strong>Velg riktig likning</strong> — den som mangler størrelsen du ikke trenger.</li>
            <li><strong>Løs algebraisk</strong> for den ukjente, sett inn tall.</li>
            <li><strong>Sjekk:</strong> Er fortegn, enhet og størrelsesorden rimelig?</li>
          </ol>
        </div>

        {/* Strategi 2 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Slik løser du fritt-fall-oppgaver</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Velg <strong>positiv y-akse oppover</strong> → <InlineLatex latex="a_y = -g = -9{,}81" /> m/s².</li>
            <li>Identifiser <InlineLatex latex="y_0" /> og <InlineLatex latex="v_{0y}" /> (pass på fortegn!).</li>
            <li><strong>Toppunkt:</strong> sett <InlineLatex latex="v_y = 0" /> → finn <InlineLatex latex="t" /> og <InlineLatex latex="y" />.</li>
            <li><strong>Treffer bakken:</strong> sett <InlineLatex latex="y = 0" /> → løs andregradsligning → forkast negativ <InlineLatex latex="t" />.</li>
            <li><strong>Fart ved landing:</strong> bruk <InlineLatex latex="v_y = v_{0y} - gt" /> eller <InlineLatex latex="v_y^2" />-likningen.</li>
          </ol>
        </div>

        {/* Strategi 3 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Slik løser du oppgaver med varierende akselerasjon</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Gjenkjenn</strong> at <InlineLatex latex="a(t)" /> ikke er konstant → du MÅ bruke integrasjon.</li>
            <li><strong>Integrer</strong> <InlineLatex latex="a(t)" /> for å finne <InlineLatex latex="v(t)" />. Husk startverdien <InlineLatex latex="v_0" />.</li>
            <li><strong>Integrer</strong> <InlineLatex latex="v(t)" /> for å finne <InlineLatex latex="x(t)" />. Husk <InlineLatex latex="x_0" />.</li>
            <li><strong>Maks/min fart:</strong> sett <InlineLatex latex="a(t) = 0" /> og løs for <InlineLatex latex="t" />.</li>
          </ol>
        </div>

        {/* Vanlige feil */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Glemmer å konvertere enheter (cm → m, km/h → m/s)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Bruker de 4 likningene når akselerasjonen IKKE er konstant</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Tror a = 0 i toppunktet i fritt fall (a er ALLTID −g)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Roter med fortegn — velg positiv retning fra starten og hold deg til det</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Blander fart (med fortegn) og fartens størrelse (alltid positiv)</span>
            </li>
          </ul>
        </div>
      </div>
      </CollapsibleSection>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <CollapsibleSection title="Eksempler fra timen">

      {/* Eksempel 1: Gepard */}
      <ExerciseCard
        number={1}
        title="Gepard langs rett linje"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En gepard beveger seg langs en rett linje. Posisjonen er gitt ved:
            </p>
            <FormulaBox latex="x(t) = 20 + 5{,}0\,t^2 \quad [\text{m}]" variant="blue" />
            <p className="mt-2">
              a) Finn gjennomsnittsfarten mellom <InlineLatex latex="t = 1{,}0" /> s og{" "}
              <InlineLatex latex="t = 2{,}0" /> s.
            </p>
            <p>b) Finn momentanfarten som funksjon av tid, og beregn den for <InlineLatex latex="t = 1{,}0" /> s og <InlineLatex latex="t = 2{,}0" /> s.</p>
            <p>c) Finn akselerasjonen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>For gjennomsnittsfart: finn x(1) og x(2) og bruk Δx/Δt.</p> },
          { label: "Hint 2", content: <p>For momentanfart: deriver x(t) mhp. t.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="x(t) = 20 + 5{,}0\,t^2" /> — posisjonsfunksjon (m)</li>
                <li>Tidsintervall for del a): <InlineLatex latex="t_1 = 1{,}0\;\text{s}" />, <InlineLatex latex="t_2 = 2{,}0\;\text{s}" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="\bar{v}" /> — gjennomsnittsfarten mellom <InlineLatex latex="t = 1{,}0" /> s og <InlineLatex latex="t = 2{,}0" /> s</li>
                <li>b) <InlineLatex latex="v(t)" /> — momentanfarten som funksjon av tid, og verdiene ved <InlineLatex latex="t = 1{,}0" /> s og <InlineLatex latex="t = 2{,}0" /> s</li>
                <li>c) <InlineLatex latex="a" /> — akselerasjonen</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Vi har <InlineLatex latex="x(t)" /> eksplisitt. For gjennomsnittsfart bruker vi definisjonen <InlineLatex latex="\bar{v} = \Delta x / \Delta t" />. For momentanfart deriverer vi <InlineLatex latex="x(t)" /> med hensyn på <InlineLatex latex="t" /> (potensregelen). For akselerasjon deriverer vi <InlineLatex latex="v(t)" /> en gang til.</p>
            </div>

            {/* 4. Løsning — del a */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Finn posisjonene ved tidspunktene</p>
              <p className="text-sm">Sett inn <InlineLatex latex="t_1" /> og <InlineLatex latex="t_2" /> i posisjonsfunksjonen:</p>
              <FormulaBox latex="x(1{,}0) = 20 + 5{,}0 \cdot (1{,}0)^2 = 20 + 5{,}0 = 25\;\text{m}" variant="blue" />
              <FormulaBox latex="x(2{,}0) = 20 + 5{,}0 \cdot (2{,}0)^2 = 20 + 20 = 40\;\text{m}" variant="blue" />
              <p className="font-semibold text-sm mt-3">Steg 2 (del a): Beregn gjennomsnittsfart</p>
              <p className="text-sm">Bruk definisjonen — forflytning delt på tidsintervall:</p>
              <FormulaBox latex="\bar{v} = \frac{\Delta x}{\Delta t} = \frac{40 - 25}{2{,}0 - 1{,}0} = \frac{15}{1{,}0} = \underline{\underline{15\;\text{m/s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del b): Finn momentanfart ved derivasjon</p>
              <p className="text-sm">Deriver <InlineLatex latex="x(t)" /> med hensyn på <InlineLatex latex="t" /> (potensregelen: derivert av <InlineLatex latex="t^2" /> er <InlineLatex latex="2t" />, konstanten 20 forsvinner):</p>
              <FormulaBox latex="v(t) = \frac{dx}{dt} = 5{,}0 \cdot 2t = \underline{\underline{10t\;\;[\text{m/s}]}}" variant="gold" />
              <p className="font-semibold text-sm mt-3">Steg 4 (del b): Sett inn tidspunktene</p>
              <FormulaBox latex="v(1{,}0) = 10 \cdot 1{,}0 = \underline{\underline{10\;\text{m/s}}}" variant="gold" />
              <FormulaBox latex="v(2{,}0) = 10 \cdot 2{,}0 = \underline{\underline{20\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">Legg merke til: gjennomsnittsfarten (15 m/s) er middelverdi av momentanfartene ved start og slutt — dette gjelder alltid ved konstant akselerasjon.</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 5 (del c): Finn akselerasjon ved derivasjon</p>
              <p className="text-sm">Deriver <InlineLatex latex="v(t) = 10t" /> med hensyn på <InlineLatex latex="t" />:</p>
              <FormulaBox latex="a = \frac{dv}{dt} = \frac{d}{dt}(10t) = \underline{\underline{10\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm mt-1">Akselerasjonen er konstant — bevegelsen er rettlinjet med konstant akselerasjon, og vi kunne alternativt brukt de fire standardlikningene.</p>
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Momentanfart = derivert av posisjon. Akselerasjon = derivert av fart. Når du kjenner <InlineLatex latex="x(t)" /> eksplisitt, bruk derivasjon for øyeblikkelige størrelser og sett inn tall for spesifikke tidspunkter.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 2: Motorsyklist */}
      <ExerciseCard
        number={2}
        title="Motorsyklist med konstant akselerasjon"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En motorsyklist har akselerasjon <InlineLatex latex="a = 4{,}0" /> m/s²,
              startposisjon <InlineLatex latex="x_0 = 5{,}0" /> m og startfart{" "}
              <InlineLatex latex="v_0 = 15" /> m/s.
            </p>
            <p className="mt-2">a) Finn fart og posisjon etter <InlineLatex latex="t = 2{,}0" /> s.</p>
            <p>b) Finn posisjonen når farten er 25 m/s.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Konstant akselerasjon → bruk de fire bevegelseslikningene.</p> },
          { label: "Hint 2", content: <p>I b) er v kjent men t ukjent — bruk likning 3 (<InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />).</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="a = 4{,}0\;\text{m/s}^2" /> — konstant akselerasjon</li>
                <li><InlineLatex latex="x_0 = 5{,}0\;\text{m}" /> — startposisjon</li>
                <li><InlineLatex latex="v_0 = 15\;\text{m/s}" /> — startfart</li>
                <li>Del a): <InlineLatex latex="t = 2{,}0\;\text{s}" /></li>
                <li>Del b): <InlineLatex latex="v = 25\;\text{m/s}" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="v" /> og <InlineLatex latex="x" /> ved <InlineLatex latex="t = 2{,}0\;\text{s}" /></li>
                <li>b) <InlineLatex latex="x" /> — posisjonen når <InlineLatex latex="v = 25\;\text{m/s}" /></li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Akselerasjonen er konstant → de fire bevegelseslikningene gjelder. I del a) kjenner vi <InlineLatex latex="v_0, a, t" /> og søker <InlineLatex latex="v" /> og <InlineLatex latex="x" /> — bruk likning 1 og likning 2. I del b) kjenner vi <InlineLatex latex="v_0, v, a" /> men ikke <InlineLatex latex="t" /> — bruk likning 3 som kobler disse uten tid.</p>
            </div>

            {/* 4. Løsning del a */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Finn farten etter 2,0 s</p>
              <p className="text-sm">Likning 1 kobler <InlineLatex latex="v, v_0, a, t" /> direkte:</p>
              <FormulaBox latex="v = v_0 + at = 15 + 4{,}0 \cdot 2{,}0 = 15 + 8{,}0 = \underline{\underline{23\;\text{m/s}}}" variant="gold" />
              <p className="font-semibold text-sm mt-3">Steg 2 (del a): Finn posisjonen etter 2,0 s</p>
              <p className="text-sm">Likning 2 gir posisjon når vi kjenner <InlineLatex latex="x_0, v_0, a, t" />:</p>
              <FormulaBox latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2 = 5{,}0 + 15 \cdot 2{,}0 + \tfrac{1}{2} \cdot 4{,}0 \cdot (2{,}0)^2" variant="blue" />
              <FormulaBox latex="x = 5{,}0 + 30 + 8{,}0 = \underline{\underline{43\;\text{m}}}" variant="gold" />
            </div>

            {/* Løsning del b */}
            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del b): Finn posisjonen når v = 25 m/s</p>
              <p className="text-sm">Vi kjenner <InlineLatex latex="v_0, v, a" /> men ikke <InlineLatex latex="t" /> — likning 3 er den eneste som kobler <InlineLatex latex="v, v_0, a, x" /> uten tid:</p>
              <FormulaBox latex="v^2 = v_0^2 + 2a(x - x_0) \;\Rightarrow\; x = x_0 + \frac{v^2 - v_0^2}{2a}" variant="blue" />
              <FormulaBox latex="x = 5{,}0 + \frac{25^2 - 15^2}{2 \cdot 4{,}0} = 5{,}0 + \frac{625 - 225}{8{,}0} = 5{,}0 + 50 = \underline{\underline{55\;\text{m}}}" variant="gold" />
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Velg likning basert på hva som er kjent og ukjent. Likning 3 (<InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />) er spesielt nyttig når du kjenner farten men ikke tiden — den eliminerer <InlineLatex latex="t" /> helt fra ligningen.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 3: Politijakt */}
      <ExerciseCard
        number={3}
        title="Bil jages av politimotorsykkel"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En bil kjører med konstant fart <InlineLatex latex="v_B = 15" /> m/s. I det øyeblikket bilen
              passerer et punkt, starter en politimotorsykkel fra ro med akselerasjon{" "}
              <InlineLatex latex="a_M = 3{,}0" /> m/s².
            </p>
            <p className="mt-2">a) Når tar motorsykkelen igjen bilen?</p>
            <p>b) Hva er motorsykkelens fart da?</p>
            <p>c) Hvor langt har de kjørt?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Skriv opp x(t) for begge kjøretøyene separat, og sett dem like.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Bil: konstant fart <InlineLatex latex="v_B = 15\;\text{m/s}" />, akselerasjon <InlineLatex latex="a_B = 0" /></li>
                <li>MC: starter fra ro <InlineLatex latex="v_{0M} = 0" />, akselerasjon <InlineLatex latex="a_M = 3{,}0\;\text{m/s}^2" /></li>
                <li>Begge starter ved <InlineLatex latex="x = 0" /> når <InlineLatex latex="t = 0" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="t" /> — tidspunktet da MC er på samme sted som bilen</li>
                <li>b) <InlineLatex latex="v_M" /> — MC-ens fart ved innhenting</li>
                <li>c) <InlineLatex latex="x" /> — tilbakelagt distanse ved innhenting</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Når to legemer møtes er de på samme sted: sett <InlineLatex latex="x_B(t) = x_M(t)" /> og løs for <InlineLatex latex="t" />. Skriv posisjonsfunksjon for hvert legeme separat — hvert har sine egne betingelser.</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1: Skriv opp posisjonsfunksjonene</p>
              <p className="text-sm">Bil (konstant fart, <InlineLatex latex="a_B = 0" />):</p>
              <FormulaBox latex="x_B = v_B \cdot t = 15t\;\;[\text{m}]" variant="blue" />
              <p className="text-sm">MC (starter fra ro, <InlineLatex latex="v_{0M} = 0" />):</p>
              <FormulaBox latex="x_M = \tfrac{1}{2}a_M t^2 = \tfrac{1}{2} \cdot 3{,}0 \cdot t^2 = 1{,}5t^2\;\;[\text{m}]" variant="blue" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del a): Sett posisjonene like og løs</p>
              <p className="text-sm">MC tar igjen bilen der <InlineLatex latex="x_M = x_B" />:</p>
              <FormulaBox latex="1{,}5t^2 = 15t \;\Rightarrow\; 1{,}5t^2 - 15t = 0 \;\Rightarrow\; t(1{,}5t - 15) = 0" variant="blue" />
              <p className="text-sm mt-2">To løsninger: <InlineLatex latex="t = 0" /> (startpunktet — begge ved <InlineLatex latex="x = 0" />) og:</p>
              <FormulaBox latex="1{,}5t = 15 \;\Rightarrow\; t = \underline{\underline{10\;\text{s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del b): Finn MC-ens fart ved innhenting</p>
              <p className="text-sm">MC har konstant akselerasjon, bruk likning 1 med <InlineLatex latex="t = 10\;\text{s}" />:</p>
              <FormulaBox latex="v_M = v_{0M} + a_M \cdot t = 0 + 3{,}0 \cdot 10 = \underline{\underline{30\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">MC har dobbelt så høy fart som bilen ved innhenting — den måtte kjøre fortere for å ta igjen det forspranget bilen bygde opp mens MC akselererte.</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 4 (del c): Finn tilbakelagt distanse</p>
              <p className="text-sm">Bruk bilens posisjonsfunksjon (enklest, siden <InlineLatex latex="a_B = 0" />):</p>
              <FormulaBox latex="x = x_B(10) = 15 \cdot 10 = \underline{\underline{150\;\text{m}}}" variant="gold" />
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Når to legemer møtes, sett posisjonsfunksjonene like og løs andegradsligningen — forkast <InlineLatex latex="t = 0" /> som opplagt (startpunktet). Denne teknikken brukes i alle møteoppgaver: politijakt, prosjektil som treffer bakken, osv.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 4: Ball kastes opp fra tak */}
      <ExerciseCard
        number={4}
        title="Ball kastes oppover fra tak"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ball kastes oppover med <InlineLatex latex="v_{0y} = 15" /> m/s fra toppen av
              en 20 m høy bygning (<InlineLatex latex="y_0 = 20" /> m).
            </p>
            <p className="mt-2">a) Finn posisjon og fart etter 1,0 s og 4,0 s.</p>
            <p>b) Finn farten når ballen er 5,0 m over taket.</p>
            <p>c) Finn maksimalhøyden og tidspunktet.</p>
            <p>d) Hva er akselerasjonen i toppunktet?</p>
            <p>e) Når treffer ballen bakken?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Fritt fall med y-akse oppover. Bruk fritt-fall-likningene.</p> },
          { label: "Hint 2", content: <p>Toppunktet: sett v_y = 0. Bakken: sett y = 0.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_{0y} = +15\;\text{m/s}" /> — startfart (oppover = positiv retning)</li>
                <li><InlineLatex latex="y_0 = 20\;\text{m}" /> — starthøyde (toppen av bygningen)</li>
                <li><InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" /> — fritt fall, y-akse oppover</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="y" /> og <InlineLatex latex="v_y" /> ved <InlineLatex latex="t = 1{,}0\;\text{s}" /> og <InlineLatex latex="t = 4{,}0\;\text{s}" /></li>
                <li>b) <InlineLatex latex="v_y" /> når <InlineLatex latex="y = 25\;\text{m}" /> (5 m over taket)</li>
                <li>c) <InlineLatex latex="y_{\max}" /> og tilhørende <InlineLatex latex="t_{\text{topp}}" /></li>
                <li>d) Akselerasjon i toppunktet</li>
                <li>e) <InlineLatex latex="t" /> når ballen treffer bakken (<InlineLatex latex="y = 0" />)</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Fritt fall = konstant akselerasjon. Bruk fritt-fall-likningene med positiv y-akse oppover. Toppunkt: sett <InlineLatex latex="v_y = 0" />. Bakken: sett <InlineLatex latex="y = 0" /> og løs andregradsligning. Når posisjon er kjent men ikke tid, bruk <InlineLatex latex="v_y^2" />-formelen.</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Posisjon og fart ved t = 1,0 s og t = 4,0 s</p>
              <p className="text-sm mt-1">Bruk standardformlene for fritt fall:</p>
              <p className="text-sm font-medium mt-2">Ved t = 1,0 s:</p>
              <FormulaBox latex="y = y_0 + v_{0y}t - \tfrac{1}{2}gt^2 = 20 + 15(1{,}0) - \tfrac{1}{2}(9{,}81)(1{,}0)^2 = 20 + 15 - 4{,}9 = \underline{\underline{30{,}1\;\text{m}}}" variant="gold" />
              <FormulaBox latex="v_y = v_{0y} - gt = 15 - 9{,}81(1{,}0) = \underline{\underline{+5{,}2\;\text{m/s}}}\;\text{(på vei opp)}" variant="gold" />
              <p className="text-sm font-medium mt-2">Ved t = 4,0 s:</p>
              <FormulaBox latex="y = 20 + 15(4{,}0) - \tfrac{1}{2}(9{,}81)(4{,}0)^2 = 20 + 60 - 78{,}5 = \underline{\underline{1{,}5\;\text{m}}}" variant="gold" />
              <FormulaBox latex="v_y = 15 - 9{,}81(4{,}0) = \underline{\underline{-24{,}2\;\text{m/s}}}\;\text{(på vei ned)}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del b): Fart 5,0 m over taket (y = 25 m)</p>
              <p className="text-sm">Vi kjenner posisjon men ikke tid — bruk <InlineLatex latex="v_y^2" />-formelen (likning 3) som kobler fart og posisjon uten tid:</p>
              <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y - y_0) = (15)^2 - 2(9{,}81)(25 - 20) = 225 - 98{,}1 = 126{,}9\;\text{m}^2/\text{s}^2" variant="blue" />
              <FormulaBox latex="v_y = \pm\sqrt{126{,}9} = \underline{\underline{\pm 11{,}3\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">To svar fordi ballen passerer <InlineLatex latex="y = 25\;\text{m}" /> to ganger: +11,3 m/s på vei opp og −11,3 m/s på vei ned. Fartens størrelse er lik begge gangene — energibevaring i praksis.</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del c): Tidspunkt og høyde for toppunktet</p>
              <p className="text-sm">I toppunktet snur ballen retning, altså <InlineLatex latex="v_y = 0" />:</p>
              <FormulaBox latex="0 = v_{0y} - g t_{\text{topp}} \;\Rightarrow\; t_{\text{topp}} = \frac{v_{0y}}{g} = \frac{15}{9{,}81} = \underline{\underline{1{,}53\;\text{s}}}" variant="gold" />
              <p className="text-sm mt-2">Sett inn i posisjonsformelen:</p>
              <FormulaBox latex="y_{\max} = y_0 + \frac{v_{0y}^2}{2g} = 20 + \frac{(15)^2}{2 \cdot 9{,}81} = 20 + \frac{225}{19{,}62} = 20 + 11{,}5 = \underline{\underline{31{,}5\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 4 (del d): Akselerasjon i toppunktet</p>
              <FormulaBox latex="a_y = -g = \underline{\underline{-9{,}81\;\text{m/s}^2}}" variant="gold" />
              <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-3 mt-2">
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">Akselerasjonen er ALLTID −g i fritt fall, selv når v = 0!</p>
                <p className="text-sm mt-1">Farten er null i toppunktet, men den <em>endrer seg</em> fra positiv til negativ. Nettopp denne endringen er akselerasjonen. Hadde a vært 0, ville ballen bli hengende i lufta.</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 5 (del e): Ballen treffer bakken (y = 0)</p>
              <p className="text-sm">Sett <InlineLatex latex="y = 0" /> i posisjonsformelen og løs andegradsligningen:</p>
              <FormulaBox latex="0 = 20 + 15t - \tfrac{1}{2}(9{,}81)t^2 \;\Rightarrow\; 4{,}905t^2 - 15t - 20 = 0" variant="blue" />
              <p className="text-sm mt-2">Andregradsformelen gir to løsninger: <InlineLatex latex="t = -1{,}0\;\text{s}" /> (ugyldig — negativ tid) og:</p>
              <FormulaBox latex="t = \underline{\underline{4{,}1\;\text{s}}}" variant="gold" />
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Bruk fortegn konsekvent fra starten. Toppunkt: sett <InlineLatex latex="v_y = 0" />. Bakken: sett <InlineLatex latex="y = 0" /> og forkast negative tider. Akselerasjonen er −g hele veien — uansett om ballen er på vei opp, i toppunktet, eller på vei ned.</p>
            </div>
          </div>
        }
      />

      {/* Eksempel 5: Varierende akselerasjon */}
      <ExerciseCard
        number={5}
        title="Bil med varierende akselerasjon"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En bil har akselerasjon <InlineLatex latex="a(t) = 2 - 0{,}1t" /> m/s²,
              startfart <InlineLatex latex="v_0 = 10" /> m/s og startposisjon{" "}
              <InlineLatex latex="x_0 = 50" /> m.
            </p>
            <p className="mt-2">a) Finn v(t) og x(t).</p>
            <p>b) Når er farten størst?</p>
            <p>c) Hva er den maksimale farten?</p>
            <p>d) Hva er posisjonen ved maksimal fart?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>a(t) er IKKE konstant → du MÅ bruke integrasjon (seksjon 2.6).</p> },
          { label: "Hint 2", content: <p>Maksimal fart: sett dv/dt = a(t) = 0.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="a(t) = 2 - 0{,}1t\;\text{m/s}^2" /> — varierende akselerasjon (ikke konstant!)</li>
                <li><InlineLatex latex="v_0 = 10\;\text{m/s}" /> — startfart</li>
                <li><InlineLatex latex="x_0 = 50\;\text{m}" /> — startposisjon</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="v(t)" /> og <InlineLatex latex="x(t)" /> — fart og posisjon som funksjoner av tid</li>
                <li>b) <InlineLatex latex="t_{\max}" /> — tidspunktet for maksimal fart</li>
                <li>c) <InlineLatex latex="v_{\max}" /> — den maksimale farten</li>
                <li>d) <InlineLatex latex="x(t_{\max})" /> — posisjonen ved maksimal fart</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Siden <InlineLatex latex="a(t)" /> ikke er konstant, kan vi IKKE bruke de fire standardlikningene. Vi MÅ integrere: <InlineLatex latex="a(t) \xrightarrow{\;\int\;} v(t) \xrightarrow{\;\int\;} x(t)" />. Husk å legge til startverdi etter integrasjonen. Maksimal fart oppstår der <InlineLatex latex="a(t) = 0" /> (farten slutter å øke).</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Integrer a(t) for å finne v(t)</p>
              <p className="text-sm">Fart er integralet av akselerasjon, pluss startverdien <InlineLatex latex="v_0" />:</p>
              <FormulaBox
                latex="v(t) = v_0 + \int_0^t (2 - 0{,}1t')\,dt' = 10 + \Bigl[2t' - \tfrac{0{,}1}{2}t'^2\Bigr]_0^t = \underline{\underline{10 + 2t - 0{,}05t^2\;\;[\text{m/s}]}}"
                variant="gold"
              />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del a): Integrer v(t) for å finne x(t)</p>
              <p className="text-sm">Posisjon er integralet av fart, pluss startverdien <InlineLatex latex="x_0" />:</p>
              <FormulaBox
                latex="x(t) = x_0 + \int_0^t (10 + 2t' - 0{,}05t'^2)\,dt' = \underline{\underline{50 + 10t + t^2 - \tfrac{0{,}05}{3}t^3\;\;[\text{m}]}}"
                variant="gold"
              />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del b): Finn tidspunktet for maksimal fart</p>
              <p className="text-sm">Farten har maksimum der den deriverte er null, dvs. der <InlineLatex latex="a(t) = 0" />:</p>
              <FormulaBox latex="a(t) = 2 - 0{,}1t = 0 \;\Rightarrow\; t_{\max} = \frac{2}{0{,}1} = \underline{\underline{20\;\text{s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">Før <InlineLatex latex="t = 20\;\text{s}" /> er <InlineLatex latex="a > 0" /> (farten øker). Etter er <InlineLatex latex="a < 0" /> (bilen bremser). Toppen er altså ved <InlineLatex latex="t = 20\;\text{s}" />.</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 4 (del c): Finn den maksimale farten</p>
              <p className="text-sm">Sett <InlineLatex latex="t = 20\;\text{s}" /> inn i <InlineLatex latex="v(t)" />:</p>
              <FormulaBox latex="v(20) = 10 + 2(20) - 0{,}05(20)^2 = 10 + 40 - 20 = \underline{\underline{30\;\text{m/s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 5 (del d): Finn posisjonen ved maksimal fart</p>
              <p className="text-sm">Sett <InlineLatex latex="t = 20\;\text{s}" /> inn i <InlineLatex latex="x(t)" />:</p>
              <FormulaBox latex="x(20) = 50 + 10(20) + (20)^2 - \tfrac{0{,}05}{3}(20)^3 = 50 + 200 + 400 - \tfrac{0{,}05}{3} \cdot 8000" variant="blue" />
              <FormulaBox latex="x(20) = 650 - 133{,}3 = \underline{\underline{517\;\text{m}}}" variant="gold" />
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Ved varierende akselerasjon: integrer <InlineLatex latex="a(t) \to v(t) \to x(t)" /> og legg til startverdiene. Maksimal fart finnes ved å sette <InlineLatex latex="a(t) = 0" />. Husk alltid å inkludere integrasjonskonstanten (startverdien) etter integrasjon.</p>
            </div>
          </div>
        }
      />

      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Vår 2023, Høst 2023</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 1, oppgave 1</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 2</p>
        </Link>
      </div>
    </div>
  );
}
