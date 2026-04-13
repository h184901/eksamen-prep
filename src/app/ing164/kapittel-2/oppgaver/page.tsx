"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Oppgaver</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-semibold mb-4">Oppgavestrategier</h3>

      <div className="space-y-6 mb-12">
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

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-semibold mb-4">Gjennomgåtte eksempler</h3>

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

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Kjelke på snøbakke"
        difficulty="middels"
        source="Oblig 1, Oppgave 1"
        problem={
          <div>
            <p>
              En jente sender en kjelke oppover en snøbakke langs ei rett linje. Posisjonen er:
            </p>
            <FormulaBox latex="x(t) = C_1 t^2 + C_2 t" variant="blue" />
            <p className="text-sm mt-2">
              der <InlineLatex latex="C_1 = -1{,}0\;\text{m/s}^2" /> og{" "}
              <InlineLatex latex="C_2 = 10\;\text{m/s}" />.
            </p>
            <p className="mt-2">a) Regn ut kjelkens fart og akselerasjon som funksjon av tiden.</p>
            <p>b) Hvor langt oppover bakken kommer kjelken?</p>
            <p>c) Hvor lang tid tar det før kjelken er tilbake ved startpunktet? Fart da?</p>
            <p>d) Tegn x–t og v–t diagrammer.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Deriver x(t) for fart, deriver v(t) for akselerasjon.</p> },
          { label: "Hint 2", content: <p>Kjelken snur der v(t) = 0. Tilbake: sett x(t) = 0.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="x(t) = C_1 t^2 + C_2 t" /> — posisjonsfunksjon</li>
                <li><InlineLatex latex="C_1 = -1{,}0\;\text{m/s}^2" /></li>
                <li><InlineLatex latex="C_2 = 10\;\text{m/s}" /></li>
                <li>Startposisjon: <InlineLatex latex="x(0) = 0" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="v(t)" /> og <InlineLatex latex="a(t)" /> — fart og akselerasjon som funksjoner av tid</li>
                <li>b) <InlineLatex latex="x_{\max}" /> — maks posisjon (der kjelken snur)</li>
                <li>c) <InlineLatex latex="t_{\text{tilbake}}" /> og fart ved tilbakekomst</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Vi kjenner <InlineLatex latex="x(t)" /> eksplisitt — deriver en gang for fart, deriver igjen for akselerasjon. Kjelken snur der <InlineLatex latex="v(t) = 0" />. Kjelken er tilbake der <InlineLatex latex="x(t) = 0" />.</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Finn v(t) ved derivasjon</p>
              <p className="text-sm">Setter inn <InlineLatex latex="C_1 = -1{,}0" /> og <InlineLatex latex="C_2 = 10" />, og deriverer:</p>
              <FormulaBox latex="v(t) = \frac{dx}{dt} = 2C_1 t + C_2 = 2(-1{,}0)t + 10 = \underline{\underline{-2{,}0t + 10\;\;[\text{m/s}]}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del a): Finn a(t) ved derivasjon</p>
              <p className="text-sm">Deriver farten:</p>
              <FormulaBox latex="a(t) = \frac{dv}{dt} = 2C_1 = 2 \cdot (-1{,}0) = \underline{\underline{-2{,}0\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">Akselerasjonen er konstant og negativ — kjelken bremser opp langs bakken, snur og akselererer nedover igjen.</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del b): Finn maks posisjon (der kjelken snur: v = 0)</p>
              <p className="text-sm">Kjelken snur når farten er null:</p>
              <FormulaBox latex="-2{,}0t + 10 = 0 \;\Rightarrow\; t_{\text{topp}} = \frac{10}{2{,}0} = 5{,}0\;\text{s}" variant="blue" />
              <p className="text-sm mt-1">Sett inn i <InlineLatex latex="x(t)" />:</p>
              <FormulaBox latex="x(5{,}0) = (-1{,}0)(5{,}0)^2 + 10(5{,}0) = -25 + 50 = \underline{\underline{25\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 4 (del c): Finn tidspunkt og fart ved tilbakekomst (x = 0)</p>
              <p className="text-sm">Sett <InlineLatex latex="x(t) = 0" /> og løs:</p>
              <FormulaBox latex="-1{,}0\,t^2 + 10t = 0 \;\Rightarrow\; t(-t + 10) = 0" variant="blue" />
              <p className="text-sm mt-1">To løsninger: <InlineLatex latex="t = 0" /> (start) og <InlineLatex latex="t_{\text{tilbake}} = \underline{\underline{10\;\text{s}}}" />.</p>
              <p className="text-sm mt-2">Fart ved tilbakekomst:</p>
              <FormulaBox latex="v(10) = -2{,}0 \cdot 10 + 10 = \underline{\underline{-10\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">Negativt fortegn betyr nedover bakken. Fartens størrelse (10 m/s) er lik startfarten — symmetri fordi akselerasjonen er konstant.</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 5 (del d): Beskrivelse av grafene</p>
              <p className="text-sm">x–t: Parabel med topp ved <InlineLatex latex="(5{,}0\;\text{s},\; 25\;\text{m})" />, symmetrisk rundt <InlineLatex latex="t = 5\;\text{s}" />, tilbake til <InlineLatex latex="x = 0" /> ved <InlineLatex latex="t = 10\;\text{s}" />.</p>
              <p className="text-sm mt-1">v–t: Rett linje fra <InlineLatex latex="+10\;\text{m/s}" /> ved <InlineLatex latex="t = 0" /> til <InlineLatex latex="-10\;\text{m/s}" /> ved <InlineLatex latex="t = 10\;\text{s}" />, krysser null ved <InlineLatex latex="t = 5\;\text{s}" />.</p>
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Når du kjenner <InlineLatex latex="x(t)" /> eksplisitt: deriver for å finne fart og akselerasjon. Snupunkt: sett <InlineLatex latex="v(t) = 0" />. Tilbake til start: sett <InlineLatex latex="x(t) = 0" /> og forkast <InlineLatex latex="t = 0" />. Legg merke til symmetrien når akselerasjonen er konstant.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Tog bremser ned"
        difficulty="lett"
        problem={
          <div>
            <p>
              Et tog kjører med fart 30 m/s når det begynner å bremse med konstant akselerasjon.
              Etter 200 m har farten sunket til 10 m/s.
            </p>
            <p className="mt-2">a) Finn akselerasjonen.</p>
            <p>b) Hvor langt kjører toget totalt før det stopper?</p>
            <p>c) Hvor lang tid tar det å stoppe?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>I a) kjenner du v₀, v og Δx men ikke t. Hvilken likning mangler t?</p> },
          { label: "Hint 2", content: <p>Likning 3: v² = v₀² + 2aΔx. I b) sett v = 0.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_0 = 30\;\text{m/s}" /> — startfart</li>
                <li><InlineLatex latex="v_1 = 10\;\text{m/s}" /> — fart etter 200 m</li>
                <li><InlineLatex latex="\Delta x_1 = 200\;\text{m}" /> — strekning for del a)</li>
                <li>Konstant bremsing (konstant akselerasjon)</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="a" /> — bremsakselerasjonen</li>
                <li>b) <InlineLatex latex="\Delta x_{\text{tot}}" /> — total bremselengde (til <InlineLatex latex="v = 0" />)</li>
                <li>c) <InlineLatex latex="t_{\text{stopp}}" /> — tid til toget stopper</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Konstant akselerasjon → bruk de fire bevegelseslikningene. I del a) kjenner vi <InlineLatex latex="v_0, v, \Delta x" /> men ikke <InlineLatex latex="t" /> — bruk likning 3 (<InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />) som ikke inneholder tid. I del b) og c) bruker vi den akselerasjonen vi fant.</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Finn akselerasjonen</p>
              <p className="text-sm">Likning 3 mangler tid — perfekt her. Løs for <InlineLatex latex="a" />:</p>
              <FormulaBox latex="v_1^2 = v_0^2 + 2a\Delta x_1 \;\Rightarrow\; a = \frac{v_1^2 - v_0^2}{2\Delta x_1}" variant="blue" />
              <FormulaBox latex="a = \frac{(10)^2 - (30)^2}{2 \cdot 200} = \frac{100 - 900}{400} = \frac{-800}{400} = \underline{\underline{-2{,}0\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">Negativt fortegn bekrefter at toget bremser (akselerasjon mot bevegelsesretningen).</p>
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del b): Total bremselengde (til v = 0)</p>
              <p className="text-sm">Bruk likning 3 igjen fra <InlineLatex latex="v_0 = 30\;\text{m/s}" /> til <InlineLatex latex="v = 0" />:</p>
              <FormulaBox latex="\Delta x_{\text{tot}} = \frac{v^2 - v_0^2}{2a} = \frac{0 - (30)^2}{2(-2{,}0)} = \frac{-900}{-4{,}0} = \underline{\underline{225\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del c): Tid til stopp</p>
              <p className="text-sm">Bruk likning 1 og løs for <InlineLatex latex="t" />:</p>
              <FormulaBox latex="0 = v_0 + at \;\Rightarrow\; t = \frac{0 - v_0}{a} = \frac{-30}{-2{,}0} = \underline{\underline{15\;\text{s}}}" variant="gold" />
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Likning 3 (<InlineLatex latex="v^2 = v_0^2 + 2a\Delta x" />) er nøkkelformelen når tid ikke er kjent og heller ikke etterspurt. Når du skal finne total bremselengde: bruk samme likning med <InlineLatex latex="v = 0" />.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Stein slippes fra bro"
        difficulty="lett"
        problem={
          <div>
            <p>
              En stein slippes fra ro fra en bro 45 m over vannet.
            </p>
            <p className="mt-2">a) Hvor lang tid tar det før steinen treffer vannet?</p>
            <p>b) Hva er farten idet den treffer vannet?</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Fritt fall: v₀ = 0, y₀ = 45 m, y = 0 (vannoverflaten).</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="v_0 = 0" /> — slippes fra ro</li>
                <li><InlineLatex latex="y_0 = 45\;\text{m}" /> — starthøyde over vannet</li>
                <li><InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" /> — fritt fall, y-akse oppover</li>
                <li>Bakken (vann): <InlineLatex latex="y = 0" /></li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="t" /> — falltiden til steinen treffer vannet</li>
                <li>b) <InlineLatex latex="|v_y|" /> — fartens størrelse ved landing</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">Fritt fall med <InlineLatex latex="v_0 = 0" />. Sett <InlineLatex latex="y = 0" /> i posisjonsformelen og løs for <InlineLatex latex="t" />. Bruk deretter <InlineLatex latex="v_y = -gt" /> for å finne farten. Alternativt: bruk likning 3 direkte for farten.</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Finn falltiden</p>
              <p className="text-sm">Sett <InlineLatex latex="y = 0" /> og <InlineLatex latex="v_0 = 0" /> i posisjonsformelen:</p>
              <FormulaBox latex="0 = y_0 - \tfrac{1}{2}g\,t^2 \;\Rightarrow\; t^2 = \frac{2y_0}{g} \;\Rightarrow\; t = \sqrt{\frac{2y_0}{g}}" variant="blue" />
              <FormulaBox latex="t = \sqrt{\frac{2 \cdot 45}{9{,}81}} = \sqrt{\frac{90}{9{,}81}} = \sqrt{9{,}17} = \underline{\underline{3{,}03\;\text{s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del b): Finn farten ved landing</p>
              <p className="text-sm">Bruk likning 1 med <InlineLatex latex="v_0 = 0" /> og <InlineLatex latex="t = 3{,}03\;\text{s}" />:</p>
              <FormulaBox latex="v_y = -g\,t = -9{,}81 \cdot 3{,}03 = -29{,}7\;\text{m/s}" variant="blue" />
              <p className="text-sm mt-1">Fartens størrelse (hastigheten er nedover, derav minus):</p>
              <FormulaBox latex="|v_y| = \underline{\underline{29{,}7\;\text{m/s}}}\;\;(\approx 107\;\text{km/h})" variant="gold" />
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Fritt fall fra ro: sett <InlineLatex latex="y = 0" /> og <InlineLatex latex="v_0 = 0" /> → <InlineLatex latex="t = \sqrt{2y_0/g}" />. Farten ved landing: <InlineLatex latex="|v| = gt" />. Alternativt kan du bruke likning 3 direkte: <InlineLatex latex="|v| = \sqrt{2gy_0}" />.</p>
            </div>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 2</p>
        <ul className="space-y-1 text-sm">
          <li>• Rettlinjet bevegelse dukker gjerne opp som del av en større oppgave (f.eks. før et skråkast)</li>
          <li>• Integrasjon av varierende akselerasjon er et typisk eksamenstema</li>
          <li>• Sørg for at du kan tegne og tolke x-t og v-t grafer</li>
          <li>• Ha et bevisst forhold til fortegnskonvensjoner</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Varierende akselerasjon — Eksamenstype"
        difficulty="vanskelig"
        source="Eksamensrelevant"
        problem={
          <div>
            <p>
              En bil starter fra ro (<InlineLatex latex="v_0 = 0" />) ved posisjon <InlineLatex latex="x_0 = 0" />.
              Akselerasjonen er gitt ved <InlineLatex latex="a(t) = 4{,}0 - 0{,}20\,t" /> m/s².
            </p>
            <p className="mt-2">a) Finn v(t) og x(t).</p>
            <p>b) Når er farten maksimal? Hva er den maksimale farten?</p>
            <p>c) Hvor langt har bilen kjørt når farten er maksimal?</p>
            <p>d) Finn posisjonen etter 30 s.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Varierende akselerasjon → bruk integrasjon, ikke de fire standardlikningene.</p> },
          { label: "Hint 2", content: <p>Maks fart: sett a(t) = 0. Husk at etter dette tidspunktet bremser bilen!</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* 1. Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><InlineLatex latex="a(t) = 4{,}0 - 0{,}20\,t\;\text{m/s}^2" /> — varierende akselerasjon (ikke konstant!)</li>
                <li><InlineLatex latex="v_0 = 0" /> — starter fra ro</li>
                <li><InlineLatex latex="x_0 = 0" /> — startposisjon</li>
              </ul>
            </div>

            {/* 2. Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva skal vi finne?</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>a) <InlineLatex latex="v(t)" /> og <InlineLatex latex="x(t)" /></li>
                <li>b) <InlineLatex latex="t_{\max}" /> og <InlineLatex latex="v_{\max}" /></li>
                <li>c) <InlineLatex latex="x(t_{\max})" /> — posisjonen ved maksimal fart</li>
                <li>d) <InlineLatex latex="x(30)" /> — posisjon etter 30 s</li>
              </ul>
            </div>

            {/* 3. Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">Strategi</p>
              <p className="text-sm"><InlineLatex latex="a(t)" /> avhenger av <InlineLatex latex="t" /> → ikke konstant → MÅ integrere. Integrer <InlineLatex latex="a(t)" /> for å finne <InlineLatex latex="v(t)" />, integrer <InlineLatex latex="v(t)" /> for å finne <InlineLatex latex="x(t)" />. Maks fart: sett <InlineLatex latex="a(t) = 0" /> — etter dette tidspunktet bremser bilen (a blir negativ), men den kjører fortsatt fremover til farten er null.</p>
            </div>

            {/* 4. Løsning */}
            <div>
              <p className="font-semibold text-sm">Steg 1 (del a): Integrer a(t) for v(t)</p>
              <p className="text-sm">Med <InlineLatex latex="v_0 = 0" />:</p>
              <FormulaBox latex="v(t) = v_0 + \int_0^t (4{,}0 - 0{,}20\,t')\,dt' = 0 + \Bigl[4{,}0t' - 0{,}10t'^2\Bigr]_0^t" variant="blue" />
              <FormulaBox latex="v(t) = \underline{\underline{4{,}0t - 0{,}10t^2\;\;[\text{m/s}]}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 2 (del a): Integrer v(t) for x(t)</p>
              <p className="text-sm">Med <InlineLatex latex="x_0 = 0" />:</p>
              <FormulaBox latex="x(t) = x_0 + \int_0^t (4{,}0t' - 0{,}10t'^2)\,dt' = \Bigl[2{,}0t'^2 - \tfrac{0{,}10}{3}t'^3\Bigr]_0^t" variant="blue" />
              <FormulaBox latex="x(t) = \underline{\underline{2{,}0t^2 - 0{,}033t^3\;\;[\text{m}]}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 3 (del b): Finn tidspunkt og verdi for maksimal fart</p>
              <p className="text-sm">Farten er maksimal der <InlineLatex latex="a(t) = 0" />:</p>
              <FormulaBox latex="4{,}0 - 0{,}20\,t = 0 \;\Rightarrow\; t_{\max} = \frac{4{,}0}{0{,}20} = \underline{\underline{20\;\text{s}}}" variant="gold" />
              <p className="text-sm mt-1">Sett inn i <InlineLatex latex="v(t)" />:</p>
              <FormulaBox latex="v_{\max} = v(20) = 4{,}0(20) - 0{,}10(20)^2 = 80 - 40 = \underline{\underline{40\;\text{m/s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 4 (del c): Posisjon ved maksimal fart</p>
              <p className="text-sm">Sett <InlineLatex latex="t = 20\;\text{s}" /> inn i <InlineLatex latex="x(t)" />:</p>
              <FormulaBox latex="x(20) = 2{,}0(20)^2 - 0{,}033(20)^3 = 2{,}0 \cdot 400 - 0{,}033 \cdot 8000 = 800 - 267 = \underline{\underline{533\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold text-sm mt-3">Steg 5 (del d): Posisjon etter 30 s</p>
              <p className="text-sm">Sett <InlineLatex latex="t = 30\;\text{s}" /> inn i <InlineLatex latex="x(t)" />:</p>
              <FormulaBox latex="x(30) = 2{,}0(30)^2 - 0{,}033(30)^3 = 2{,}0 \cdot 900 - 0{,}033 \cdot 27000 = 1800 - 900 = \underline{\underline{900\;\text{m}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">Merk: etter <InlineLatex latex="t = 20\;\text{s}" /> er akselerasjonen negativ (bremser), men farten er fortsatt positiv — bilen kjører fortsatt fremover, bare saktere og saktere.</p>
            </div>

            {/* 6. Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">Ved varierende akselerasjon: integrer <InlineLatex latex="a(t) \to v(t) \to x(t)" /> og legg til startverdiene. Maks fart oppstår der <InlineLatex latex="a(t) = 0" />. Husk: negativ akselerasjon betyr at bilen bremser, men den kjører fortsatt fremover helt til <InlineLatex latex="v(t) = 0" />.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
