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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="x(t) = 20 + 5{,}0\,t^2" /> (posisjonsfunksjon)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">a) Gjennomsnittsfart mellom t = 1,0 s og t = 2,0 s</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor denne metoden?</strong> Gjennomsnittsfart er definert som forflytning delt på tid.
                Vi trenger altså posisjonen ved begge tidspunktene.
              </p>
              <p className="text-sm mt-2">
                <strong>Steg 1:</strong> Finn posisjonen ved hvert tidspunkt ved å sette inn i <InlineLatex latex="x(t)" />:
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="x(1{,}0) = 20 + 5{,}0 \cdot (1{,}0)^2 = 20 + 5 = 25\;\text{m}" />
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="x(2{,}0) = 20 + 5{,}0 \cdot (2{,}0)^2 = 20 + 20 = 40\;\text{m}" />
              </p>
              <p className="text-sm mt-2">
                <strong>Steg 2:</strong> Bruk definisjonen av gjennomsnittsfart — forflytning delt på tidsintervall:
              </p>
              <FormulaBox latex="\bar{v} = \frac{\Delta x}{\Delta t} = \frac{40 - 25}{2{,}0 - 1{,}0} = \frac{15}{1{,}0} = \underline{\underline{15\;\text{m/s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">b) Momentanfart</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor derivere?</strong> Momentanfarten er farten i ett bestemt øyeblikk.
                Matematisk er den den tidsderiverte av posisjonsfunksjonen — vi finner stigningstallet
                til tangenten i x-t-grafen.
              </p>
              <p className="text-sm mt-2">
                <strong>Steg 1:</strong> Deriver <InlineLatex latex="x(t)" /> med hensyn på <InlineLatex latex="t" />.
                Bruker potensregelen: derivert av <InlineLatex latex="t^2" /> er <InlineLatex latex="2t" />, og derivert av en konstant (20) er 0:
              </p>
              <FormulaBox latex="v(t) = \frac{dx}{dt} = 0 + 5{,}0 \cdot 2t = 10t \;\;[\text{m/s}]" variant="gold" />
              <p className="text-sm mt-2">
                <strong>Steg 2:</strong> Sett inn tidspunktene:
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="v(1{,}0) = 10 \cdot 1{,}0 = 10\;\text{m/s}" />
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="v(2{,}0) = 10 \cdot 2{,}0 = 20\;\text{m/s}" />
              </p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                Legg merke til: gjennomsnittsfarten (15 m/s) er gjennomsnittet av momentanfartene ved start og slutt — dette
                gjelder fordi akselerasjonen er konstant.
              </p>
            </div>

            <div>
              <p className="font-semibold">c) Akselerasjon</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor derivere igjen?</strong> Akselerasjonen er endringsraten til farten.
                Deriverer vi v(t), finner vi hvor raskt farten endrer seg.
              </p>
              <FormulaBox latex="a(t) = \frac{dv}{dt} = \frac{d}{dt}(10t) = \underline{\underline{10\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm mt-1">Akselerasjonen er konstant — dette er altså bevegelse med konstant akselerasjon, og vi
                kunne brukt de fire standardlikningene.</p>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Momentanfart = derivert av posisjon. Akselerasjon = derivert av fart. Derivasjon gir
                oss øyeblikkelige verdier fra funksjoner som varierer med tiden.</p>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="a = 4{,}0\;\text{m/s}^2" /> (konstant), <InlineLatex latex="\;x_0 = 5{,}0\;\text{m}" />, <InlineLatex latex="\;v_0 = 15\;\text{m/s}" /></li>
              </ul>
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Hvilke formler?</p>
              <p className="text-sm">Akselerasjonen er konstant → vi kan bruke de fire bevegelseslikningene.</p>
            </div>

            <div>
              <p className="font-semibold">a) Fart og posisjon ved t = 2,0 s</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor likning 1?</strong> Vi kjenner <InlineLatex latex="v_0" />, <InlineLatex latex="a" /> og <InlineLatex latex="t" />,
                og søker <InlineLatex latex="v" />. Likning 1 kobler nettopp disse fire størrelsene.
              </p>
              <FormulaBox latex="v = v_0 + at = 15 + 4{,}0 \cdot 2{,}0 = \underline{\underline{23\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor likning 2?</strong> For posisjonen kjenner vi <InlineLatex latex="x_0" />, <InlineLatex latex="v_0" />, <InlineLatex latex="a" /> og <InlineLatex latex="t" />.
                Likning 2 gir oss <InlineLatex latex="x" /> direkte.
              </p>
              <FormulaBox latex="x = x_0 + v_0 t + \tfrac{1}{2}at^2 = 5{,}0 + 15 \cdot 2{,}0 + \tfrac{1}{2} \cdot 4{,}0 \cdot (2{,}0)^2 = 5 + 30 + 8 = \underline{\underline{43\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">b) Posisjon når v = 25 m/s</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor likning 3?</strong> Vi kjenner <InlineLatex latex="v_0" />, <InlineLatex latex="v" /> og <InlineLatex latex="a" />,
                men ikke <InlineLatex latex="t" />. Vi trenger heller ikke <InlineLatex latex="t" />! Likning 3 er den
                eneste som kobler <InlineLatex latex="v, v_0, a" /> og <InlineLatex latex="x" /> uten å involvere tid.
              </p>
              <p className="text-sm mt-2">Løser for <InlineLatex latex="x" />:</p>
              <FormulaBox latex="v^2 = v_0^2 + 2a(x - x_0) \;\Rightarrow\; x = x_0 + \frac{v^2 - v_0^2}{2a}" variant="blue" />
              <FormulaBox latex="x = 5{,}0 + \frac{25^2 - 15^2}{2 \cdot 4{,}0} = 5{,}0 + \frac{625 - 225}{8{,}0} = 5{,}0 + 50 = \underline{\underline{55\;\text{m}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Velg likning basert på hva som er kjent og ukjent. Likning 3 er spesielt nyttig
                når tiden ikke er oppgitt og heller ikke etterspurt.</p>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm">
                <li>Bil: konstant fart <InlineLatex latex="v_B = 15\;\text{m/s}" />, <InlineLatex latex="\;a_B = 0" /></li>
                <li>MC: starter fra ro (<InlineLatex latex="v_0 = 0" />), <InlineLatex latex="\;a_M = 3{,}0\;\text{m/s}^2" /></li>
                <li>Begge starter ved <InlineLatex latex="x = 0" /> ved <InlineLatex latex="t = 0" /></li>
              </ul>
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Strategi</p>
              <p className="text-sm">Når to legemer møtes, skriv opp posisjonsfunksjon for hvert av dem og sett <InlineLatex latex="x_B(t) = x_M(t)" />.</p>
            </div>

            <div>
              <p className="font-semibold">Oppsett: Posisjonsfunksjoner</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor separate funksjoner?</strong> Hvert legeme har sine egne betingelser.
                Bilen har konstant fart (a = 0), og motorsykkelen akselererer fra ro.
              </p>
              <p className="text-sm mt-2">
                Bil (konstant fart, <InlineLatex latex="a = 0" />): <InlineLatex latex="x_B = v_B \cdot t = 15t" />
              </p>
              <p className="text-sm">
                MC (starter fra ro, <InlineLatex latex="v_0 = 0" />): <InlineLatex latex="x_M = \tfrac{1}{2}a_M t^2 = \tfrac{1}{2}(3{,}0)t^2 = 1{,}5t^2" />
              </p>
            </div>

            <div>
              <p className="font-semibold">a) Når tar MC igjen bilen?</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor sette lik?</strong> MC tar igjen bilen når begge er på samme sted, altså <InlineLatex latex="x_M = x_B" />.
              </p>
              <FormulaBox latex="1{,}5t^2 = 15t \;\Rightarrow\; 1{,}5t^2 - 15t = 0 \;\Rightarrow\; t(1{,}5t - 15) = 0" variant="blue" />
              <p className="text-sm mt-2">
                To løsninger: <InlineLatex latex="t = 0" /> (startpunktet — de er jo begge ved x = 0 da) og:
              </p>
              <FormulaBox latex="1{,}5t = 15 \;\Rightarrow\; t = \underline{\underline{10\;\text{s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">b) Motorsykkelens fart ved innhenting</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor likning 1?</strong> MC har konstant akselerasjon, og vi kjenner t. Likning 1 gir farten direkte.
              </p>
              <FormulaBox latex="v_M = a_M \cdot t = 3{,}0 \cdot 10 = \underline{\underline{30\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">
                Interessant: MC har dobbelt så høy fart som bilen ved innhenting! Den må kjøre fortere
                enn bilen for å ta igjen forspranget bilen bygget opp mens MC akselererte.
              </p>
            </div>

            <div>
              <p className="font-semibold">c) Tilbakelagt distanse</p>
              <FormulaBox latex="x = 15 \cdot 10 = \underline{\underline{150\;\text{m}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Når to legemer møtes, sett posisjonsfunksjonene like. Denne teknikken brukes også i
                kollisjonsoppgaver og ved skrått kast (når treffer prosjektilet bakken?).</p>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="v_{0y} = +15\;\text{m/s}" /> (oppover = positiv), <InlineLatex latex="\;y_0 = 20\;\text{m}" /></li>
                <li><InlineLatex latex="a_y = -g = -9{,}81\;\text{m/s}^2" /> (fritt fall, y-akse oppover)</li>
              </ul>
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Hvilke formler?</p>
              <p className="text-sm">Fritt fall = konstant akselerasjon. Bruk fritt-fall-likningene med positiv y oppover.</p>
            </div>

            <div>
              <p className="font-semibold">a) Posisjon og fart ved t = 1,0 s og t = 4,0 s</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor disse formlene?</strong> Vi kjenner startverdier og tid, og søker y og v_y.
                Bruker standardformlene for fritt fall.
              </p>
              <p className="text-sm mt-2"><strong>Ved t = 1,0 s:</strong></p>
              <p className="text-sm ml-4">
                <InlineLatex latex="y = 20 + 15(1{,}0) - \tfrac{1}{2}(9{,}81)(1{,}0)^2 = 20 + 15 - 4{,}9 = 30{,}1\;\text{m}" />
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="v_y = 15 - 9{,}81(1{,}0) = +5{,}19\;\text{m/s}" /> (fortsatt på vei opp)
              </p>
              <p className="text-sm mt-2"><strong>Ved t = 4,0 s:</strong></p>
              <p className="text-sm ml-4">
                <InlineLatex latex="y = 20 + 15(4{,}0) - \tfrac{1}{2}(9{,}81)(4{,}0)^2 = 20 + 60 - 78{,}5 = 1{,}5\;\text{m}" />
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="v_y = 15 - 9{,}81(4{,}0) = -24{,}2\;\text{m/s}" /> (på vei ned)
              </p>
            </div>

            <div>
              <p className="font-semibold">b) Fart 5,0 m over taket (y = 25 m)</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor likning 3?</strong> Vi kjenner posisjon men ikke tid. <InlineLatex latex="v_y^2" />-formelen
                kobler fart og posisjon uten tid.
              </p>
              <FormulaBox latex="v_y^2 = v_{0y}^2 - 2g(y - y_0) = 15^2 - 2(9{,}81)(25 - 20) = 225 - 98{,}1 = 126{,}9" variant="blue" />
              <FormulaBox latex="v_y = \pm\sqrt{126{,}9} = \underline{\underline{\pm 11{,}3\;\text{m/s}}}" variant="gold" />
              <p className="text-sm mt-1 text-[var(--muted)]">
                <strong>Hvorfor to svar?</strong> Ballen passerer denne høyden to ganger — én gang på
                vei opp (+11,3 m/s) og én gang på vei ned (−11,3 m/s). Fartens størrelse er lik begge
                ganger — energibevaring i praksis!
              </p>
            </div>

            <div>
              <p className="font-semibold">c) Maksimalhøyde</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor sette v_y = 0?</strong> I toppunktet snur ballen retning. I det øyeblikket
                er farten null — den har sluttet å gå oppover, men har ikke begynt å falle ennå.
              </p>
              <p className="text-sm mt-2"><strong>Steg 1:</strong> Finn tidspunktet for toppen:</p>
              <FormulaBox latex="v_y = 0 = v_{0y} - gt \;\Rightarrow\; t_\text{topp} = \frac{v_{0y}}{g} = \frac{15}{9{,}81} = \underline{\underline{1{,}53\;\text{s}}}" variant="gold" />
              <p className="text-sm mt-2"><strong>Steg 2:</strong> Sett inn i posisjonslikningen (eller bruk <InlineLatex latex="v_y^2" />-formelen med <InlineLatex latex="v_y = 0" />):</p>
              <FormulaBox latex="y_\text{maks} = y_0 + \frac{v_{0y}^2}{2g} = 20 + \frac{225}{19{,}62} = \underline{\underline{31{,}5\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">d) Akselerasjon i toppunktet</p>
              <FormulaBox latex="a_y = -g = \underline{\underline{-9{,}81\;\text{m/s}^2}}" variant="gold" />
              <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-3 mt-2">
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                  Akselerasjonen er ALLTID −g i fritt fall, selv når v = 0!
                </p>
                <p className="text-sm mt-1">
                  Farten er null i toppunktet, men den <em>endrer seg</em> (fra positiv til negativ). Nettopp
                  denne endringen er akselerasjonen. Hadde a vært 0, ville ballen blitt hengende i lufta!
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold">e) Ballen treffer bakken (y = 0)</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor sette y = 0?</strong> Bakken er ved y = 0 i vårt koordinatsystem.
              </p>
              <FormulaBox latex="0 = 20 + 15t - 4{,}905t^2" variant="blue" />
              <p className="text-sm mt-2">
                Omskriver til standardform og bruker andregradsformelen:
              </p>
              <p className="text-sm ml-4">
                <InlineLatex latex="4{,}905t^2 - 15t - 20 = 0" />
              </p>
              <p className="text-sm mt-1">
                Løsninger: <InlineLatex latex="t = -1{,}0\;\text{s}" /> (ugyldig — negativ tid gir ingen fysisk mening)
                og <InlineLatex latex="\underline{\underline{t = 4{,}1\;\text{s}}}" />.
              </p>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Bruk fortegn konsekvent fra starten. Sjekk at svaret gir fysisk mening —
                forkast negative tider og sjekk at ballens bane er rimelig. Akselerasjonen er −g hele tiden,
                uansett hvor ballen er i banen.</p>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Hva vet vi?</p>
              <ul className="list-disc list-inside text-sm">
                <li><InlineLatex latex="a(t) = 2 - 0{,}1t" /> m/s² — <strong>ikke konstant!</strong></li>
                <li><InlineLatex latex="v_0 = 10\;\text{m/s}" />, <InlineLatex latex="\;x_0 = 50\;\text{m}" /></li>
              </ul>
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mt-2 mb-1">Strategi</p>
              <p className="text-sm">
                Siden <InlineLatex latex="a" /> ikke er konstant, kan vi IKKE bruke de fire standardlikningene.
                Vi MÅ integrere: <InlineLatex latex="a(t) \xrightarrow{\int} v(t) \xrightarrow{\int} x(t)" />.
              </p>
            </div>

            <div>
              <p className="font-semibold">a) Finn v(t) og x(t) ved integrasjon</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor integrere?</strong> Fart er integralet av akselerasjon over tid, og posisjon
                er integralet av fart. Dette er det motsatte av derivasjon.
              </p>
              <p className="text-sm mt-2"><strong>Steg 1:</strong> Integrer a(t) for å finne v(t):</p>
              <FormulaBox
                latex="v(t) = v_0 + \int_0^t (2 - 0{,}1t')\,dt' = 10 + \left[2t' - 0{,}05t'^2\right]_0^t = 10 + 2t - 0{,}05t^2"
                variant="gold"
              />
              <p className="text-sm mt-2"><strong>Steg 2:</strong> Integrer v(t) for å finne x(t):</p>
              <FormulaBox
                latex="x(t) = 50 + \int_0^t (10 + 2t' - 0{,}05t'^2)\,dt' = 50 + 10t + t^2 - 0{,}0167t^3"
                variant="gold"
              />
            </div>

            <div>
              <p className="font-semibold">b) Når er farten størst?</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor sette a(t) = 0?</strong> Farten har ekstremverdi der den deriverte (= akselerasjonen)
                er null. Før dette tidspunktet er a &gt; 0 (farten øker), etter er a &lt; 0 (farten synker).
              </p>
              <FormulaBox latex="a(t) = 2 - 0{,}1t = 0 \;\Rightarrow\; t = \frac{2}{0{,}1} = \underline{\underline{20\;\text{s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">c) Maksimal fart</p>
              <p className="text-sm mt-2">Sett inn t = 20 s i v(t):</p>
              <FormulaBox latex="v(20) = 10 + 2(20) - 0{,}05(20)^2 = 10 + 40 - 20 = \underline{\underline{30\;\text{m/s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">d) Posisjon ved maksimal fart</p>
              <p className="text-sm mt-2">Sett inn t = 20 s i x(t):</p>
              <FormulaBox latex="x(20) = 50 + 10(20) + (20)^2 - 0{,}0167(20)^3 = 50 + 200 + 400 - 133 = \underline{\underline{517\;\text{m}}}" variant="gold" />
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 mt-2">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">Hva lærte vi?</p>
              <p className="text-sm">Ved varierende akselerasjon: integrer a(t) → v(t) → x(t). Maks/min fart finner
                du der a(t) = 0 (farten slutter å øke og begynner å synke). Husk å legge til initialverdiene
                v₀ og x₀ etter integrasjon!</p>
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
            <div>
              <p className="font-semibold">a) Fart og akselerasjon</p>
              <FormulaBox latex="v(t) = x'(t) = 2C_1 t + C_2 = -2{,}0t + 10 \;\;[\text{m/s}]" variant="gold" />
              <FormulaBox latex="a(t) = v'(t) = 2C_1 = \underline{\underline{-2{,}0\;\text{m/s}^2}}" variant="gold" />
              <p className="text-sm text-[var(--muted)]">Akselerasjonen er konstant og negativ — kjelken bremser opp, snur, og akselererer tilbake.</p>
            </div>

            <div>
              <p className="font-semibold">b) Maks posisjon (der kjelken snur: v = 0)</p>
              <FormulaBox latex="-2{,}0t + 10 = 0 \;\Rightarrow\; t = 5{,}0\;\text{s}" variant="blue" />
              <FormulaBox latex="x(5{,}0) = -1{,}0 \cdot 25 + 10 \cdot 5{,}0 = \underline{\underline{25\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">c) Tilbake ved start (x = 0)</p>
              <FormulaBox latex="-1{,}0t^2 + 10t = 0 \;\Rightarrow\; t(-t + 10) = 0" variant="blue" />
              <p className="text-sm mt-1">
                <InlineLatex latex="t = 0" /> (start) eller <InlineLatex latex="\underline{\underline{t = 10\;\text{s}}}" />
              </p>
              <FormulaBox latex="v(10) = -2{,}0 \cdot 10 + 10 = \underline{\underline{-10\;\text{m/s}}}" variant="gold" />
              <p className="text-sm text-[var(--muted)]">Farten er 10 m/s nedover bakken. Lik startfarten, men med motsatt fortegn — symmetri!</p>
            </div>

            <div>
              <p className="font-semibold">d) Grafer</p>
              <p className="text-sm">
                x–t: Parabel med topp ved (5 s, 25 m), tilbake til x = 0 ved t = 10 s.
              </p>
              <p className="text-sm">
                v–t: Rett linje fra +10 m/s til −10 m/s, krysser null ved t = 5 s.
              </p>
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
            <div>
              <p className="font-semibold">a) Akselerasjon (bruker likning 3 — mangler t)</p>
              <FormulaBox latex="a = \frac{v^2 - v_0^2}{2\Delta x} = \frac{10^2 - 30^2}{2 \cdot 200} = \frac{100 - 900}{400} = \underline{\underline{-2{,}0\;\text{m/s}^2}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">b) Total bremselengde (sett v = 0)</p>
              <FormulaBox latex="\Delta x = \frac{0^2 - 30^2}{2(-2{,}0)} = \frac{-900}{-4{,}0} = \underline{\underline{225\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">c) Tid til stopp (bruker likning 1)</p>
              <FormulaBox latex="t = \frac{v - v_0}{a} = \frac{0 - 30}{-2{,}0} = \underline{\underline{15\;\text{s}}}" variant="gold" />
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
            <div>
              <p className="font-semibold">a) Tid til vannet (y = 0, v₀ = 0)</p>
              <FormulaBox latex="y = y_0 - \tfrac{1}{2}g\,t^2 = 0 \;\Rightarrow\; t = \sqrt{\frac{2y_0}{g}} = \sqrt{\frac{90}{9{,}81}} = \underline{\underline{3{,}03\;\text{s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">b) Fart ved landing</p>
              <FormulaBox latex="v_y = -gt = -9{,}81 \cdot 3{,}03 = -29{,}7\;\text{m/s}" variant="blue" />
              <p className="text-sm">
                Fartens størrelse: <InlineLatex latex="|v| = \underline{\underline{29{,}7\;\text{m/s}}}" /> (ca. 107 km/h).
              </p>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">Strategi</p>
              <p className="text-sm">
                <InlineLatex latex="a(t)" /> avhenger av <InlineLatex latex="t" /> → ikke konstant → MÅ integrere.
              </p>
            </div>

            <div>
              <p className="font-semibold">a) Integrer a(t) for å finne v(t) og x(t)</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor?</strong> Akselerasjonen avtar lineært med tiden. De fire standardlikningene
                krever konstant akselerasjon — vi er nødt til å integrere.
              </p>
              <FormulaBox latex="v(t) = 0 + \int_0^t (4{,}0 - 0{,}20t')\,dt' = 4{,}0t - 0{,}10t^2 \;\;[\text{m/s}]" variant="gold" />
              <FormulaBox latex="x(t) = 0 + \int_0^t (4{,}0t' - 0{,}10t'^2)\,dt' = 2{,}0t^2 - 0{,}033t^3 \;\;[\text{m}]" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">b) Maks fart</p>
              <p className="text-sm mt-2 text-[var(--muted)]">
                <strong>Hvorfor a = 0?</strong> Farten øker så lenge a &gt; 0. Når a = 0, slutter farten å øke — det er toppunktet.
              </p>
              <FormulaBox latex="4{,}0 - 0{,}20t = 0 \;\Rightarrow\; t = \underline{\underline{20\;\text{s}}}" variant="gold" />
              <FormulaBox latex="v(20) = 4{,}0(20) - 0{,}10(400) = 80 - 40 = \underline{\underline{40\;\text{m/s}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">c) Posisjon ved maks fart (t = 20 s)</p>
              <FormulaBox latex="x(20) = 2{,}0(400) - 0{,}033(8000) = 800 - 267 = \underline{\underline{533\;\text{m}}}" variant="gold" />
            </div>

            <div>
              <p className="font-semibold">d) Posisjon etter 30 s</p>
              <FormulaBox latex="x(30) = 2{,}0(900) - 0{,}033(27000) = 1800 - 900 = \underline{\underline{900\;\text{m}}}" variant="gold" />
              <p className="text-sm text-[var(--muted)]">Merk: etter t = 20 s er akselerasjonen negativ (bremser), men farten er fortsatt positiv —
                bilen kjører fortsatt fremover, bare saktere.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
