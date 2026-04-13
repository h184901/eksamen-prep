"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-6">Oppgaver</h2>

      {/* ── Oppgavestrategier ── */}
      <h3 className="text-xl font-semibold mb-4">Oppgavestrategier</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Skråplan-oppskrift</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Tegn skråplanet med legemet</li>
            <li>Velg <strong>x langs planet</strong> og <strong>y normalt ut</strong></li>
            <li>Dekomponer <InlineLatex latex="mg" />: <InlineLatex latex="mg\sin\alpha" /> langs, <InlineLatex latex="mg\cos\alpha" /> normalt</li>
            <li><InlineLatex latex="\sum F_y = 0" /> gir <InlineLatex latex="N = mg\cos\alpha" /> (+ evt. ekstra)</li>
            <li>Friksjon: <InlineLatex latex="R = \mu N" /></li>
            <li><InlineLatex latex="\sum F_x = ma" /> gir akselerasjonen</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Sirkelbevegelse-oppskrift</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identifiser sentrum av sirkelen</li>
            <li>Velg <strong>positiv retning inn mot sentrum</strong></li>
            <li>List opp alle krefter og finn deres komponent mot sentrum</li>
            <li>Sett opp <InlineLatex latex="\sum F = mv^2/R" /> i retning mot sentrum</li>
            <li>Husk: i topp av loop peker N og G begge mot sentrum</li>
            <li>Bruk <InlineLatex latex="v = 2\pi R/T" /> for å koble fart og periode</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 md:col-span-2">
          <h4 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Skriver N = mg på skråplan (feil! <InlineLatex latex="N = mg\cos\alpha" />)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Bruker μsN som friksjon når legemet er i ro og dyttekraften er liten (friksjonen tilpasser seg!)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Tegner &ldquo;sentrifugalkraft&rdquo; i FBD — den eksisterer ikke i et inertialreferansesystem</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Glemmer at normalkraften endres når en kraft trekker i vinkel</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Blander skråplan-aksene med horisontalt/vertikalt</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Gjennomgåtte eksempler ── */}
      <h3 className="text-xl font-semibold mb-4">Gjennomgåtte eksempler</h3>

      <ExerciseCard
        number={1}
        title="Kjelke ned skråplan (friksjonsløst)"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kjelke med total tyngde <InlineLatex latex="mg" /> sklir nedover et skråplan med vinkel{" "}
              <InlineLatex latex="\alpha" />. Ingen friksjon. Finn akselerasjonen og normalkraften.
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Velg x-akse langs planet (nedover positivt) og y-akse normalt ut fra planet.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Tyngdekraft: <InlineLatex latex="mg" /> loddrett nedover</li>
                <li>Skråplanvinkel: <InlineLatex latex="\alpha" /></li>
                <li>Ingen friksjon: <InlineLatex latex="\mu = 0" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Normalkraften <InlineLatex latex="N" /></li>
                <li>Akselerasjonen <InlineLatex latex="a" /> langs planet</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">Velg aksesystem med <InlineLatex latex="x" />-aksen langs planet (nedover positiv) og <InlineLatex latex="y" />-aksen normalt ut fra planet. Dekomponeringstrikset: <InlineLatex latex="mg" /> langs planet gir <InlineLatex latex="mg\sin\alpha" />, normalt gir <InlineLatex latex="mg\cos\alpha" />. Siden det ikke skjer noe normalt på planet, er <InlineLatex latex="\sum F_y = 0" />. Langs planet bruker vi Newtons 2. lov.</p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Normalretningen gir likevekt.</p>
              <FormulaBox latex="\sum F_y = 0: \quad N - mg\cos\alpha = 0 \;\Rightarrow\; N = mg\cos\alpha" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> Langs planet (ingen friksjon) bruker vi N2L.</p>
              <FormulaBox latex="\sum F_x = ma: \quad mg\sin\alpha = ma" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3:</strong> Del på <InlineLatex latex="m" /> — massen faller ut!</p>
              <FormulaBox latex="a = g\sin\alpha" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="N = mg\cos\alpha" variant="gold" />
              <FormulaBox latex="a = \underline{\underline{g\sin\alpha}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Akselerasjonen på et friksjonsløst skråplan avhenger <em>kun</em> av vinkelen — ikke av massen! Dette er Galileos klassiske resultat. Tyngre og lettere gjenstander akselererer likt ned skråplanet (og faller likt).</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Kloss og lodd over trinse"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kloss (<InlineLatex latex="m_1" />) på friksjonsløst bord er koblet med et tau over en
              friksjonsløs trinse til et hengende lodd (<InlineLatex latex="m_2" />). Finn akselerasjonen
              og snordraget.
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Begge legemer har samme akselerasjon (ustrekt tau).</p> },
          { label: "Hint 2", content: <p>FBD for kloss: S = m₁a. FBD for lodd: m₂g − S = m₂a. Eliminer S.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Masse på bord: <InlineLatex latex="m_1" /> (friksjonsløs overflate)</li>
                <li>Hengende masse: <InlineLatex latex="m_2" /></li>
                <li>Friksjonsløs trinse — tauet er ustrakt (begge legemer har samme <InlineLatex latex="a" />)</li>
                <li>Snordrag <InlineLatex latex="S" /> er likt i begge ender av tauet</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Akselerasjonen <InlineLatex latex="a" /> til systemet</li>
                <li>Snordraget <InlineLatex latex="S" /></li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">Tegn et FBD for hvert legeme separat. Koblingsvilkåret er at begge har samme akselerasjon og samme snordrag <InlineLatex latex="S" />. Sett opp N2L for hvert legeme og eliminer <InlineLatex latex="S" /> for å finne <InlineLatex latex="a" />.</p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> N2L for klossen (horisontalt, positiv retning = bevegelsesretning).</p>
              <FormulaBox latex="\sum F_x = m_1 a: \quad S = m_1 a" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> N2L for loddet (vertikalt, positiv retning = nedover).</p>
              <FormulaBox latex="\sum F_y = m_2 a: \quad m_2 g - S = m_2 a" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3:</strong> Adder de to likningene for å eliminere <InlineLatex latex="S" />.</p>
              <FormulaBox latex="m_2 g = a(m_1 + m_2)" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 4:</strong> Løs for <InlineLatex latex="a" />, sett tilbake i steg 1 for <InlineLatex latex="S" />.</p>
              <FormulaBox latex="a = \frac{m_2 g}{m_1 + m_2}" variant="blue" />
              <FormulaBox latex="S = m_1 a = \frac{m_1 m_2 g}{m_1 + m_2}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{a = \frac{m_2 g}{m_1 + m_2}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{S = \frac{m_1 m_2 g}{m_1 + m_2}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Det koblede Atwood-systemet løses ved å skrive N2L for hvert legeme og eliminere den indre kraften (snordrag). Sjekk grenseverdier: hvis <InlineLatex latex="m_2 \to 0" /> er <InlineLatex latex="a \to 0" />; hvis <InlineLatex latex="m_1 \to 0" /> er <InlineLatex latex="a \to g" /> (loddet faller fritt). Begge grenser er rimelige.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Finne friksjonskoeffisienter"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kasse på 50 kg skyves langs gulvet. Kassen &ldquo;løsner&rdquo; (begynner å gli) ved en
              dyttekraft på 230 N. Den glir med konstant fart ved 200 N. Tyngden er mg = 500 N.
            </p>
            <p className="mt-2">a) Finn μs og μk.</p>
            <p>b) Hva var friksjonen R da dyttekraften var 50 N (kassen sto i ro)?</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Ved &ldquo;løsning&rdquo;: R = Fmax = μsN. Ved konstant glidning: R = F (likevekt).</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Masse: <InlineLatex latex="m = 50\;\text{kg}" />, tyngde <InlineLatex latex="N = mg = 500\;\text{N}" /> (flatt underlag)</li>
                <li>Kassen &ldquo;løsner&rdquo; (begynner å gli) ved dyttekraft <InlineLatex latex="F = 230\;\text{N}" /></li>
                <li>Kassen glir med <em>konstant fart</em> ved dyttekraft <InlineLatex latex="F = 200\;\text{N}" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Statisk friksjonskoeffisient <InlineLatex latex="\mu_s" /> og kinetisk <InlineLatex latex="\mu_k" /></li>
                <li>b) Friksjonskraften <InlineLatex latex="R" /> når dyttekraften er <InlineLatex latex="F = 50\;\text{N}" /></li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Maksimal statisk friksjon inntrer akkurat idet legemet begynner å gli: <InlineLatex latex="R_{s,\max} = F_{\text{løsner}}" />.
                Kinetisk friksjon oppstår ved likevekt (konstant fart): <InlineLatex latex="R_k = F_{\text{glidning}}" />.
                For del b): husk at statisk friksjon <em>tilpasser seg</em> — den er ikke alltid <InlineLatex latex="\mu_s N" />, men akkurat stor nok til å holde legemet i ro.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning</p>
              <p className="text-sm mb-1"><strong>Steg 1 (a):</strong> Normalkraft på flatt underlag.</p>
              <FormulaBox latex="N = mg = 500\;\text{N}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2 (a):</strong> Statisk friksjonskoeffisient — kassen løsner ved <InlineLatex latex="F = 230\;\text{N}" />, så <InlineLatex latex="R_{s,\max} = 230\;\text{N}" />.</p>
              <FormulaBox latex="\mu_s = \frac{R_{s,\max}}{N} = \frac{230}{500} = 0{,}46" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3 (a):</strong> Kinetisk friksjonskoeffisient — konstant fart betyr likevekt, så <InlineLatex latex="R_k = F = 200\;\text{N}" />.</p>
              <FormulaBox latex="\mu_k = \frac{R_k}{N} = \frac{200}{500} = 0{,}40" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 4 (b):</strong> Ved <InlineLatex latex="F = 50\;\text{N}" /> er kassen i ro. Friksjonen tilpasser seg og holder likevekt.</p>
              <FormulaBox latex="\sum F_x = 0: \quad F - R = 0 \;\Rightarrow\; R = 50\;\text{N}" variant="blue" />
              <p className="text-sm mt-1">Merk: <InlineLatex latex="50\;\text{N} \ll \mu_s N = 230\;\text{N}" /> — friksjonen er langt fra maksimum.</p>
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{\mu_s = 0{,}46}}, \quad \underline{\underline{\mu_k = 0{,}40}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{R = 50\;\text{N}}}\;\text{(ved F = 50 N, kasse i ro)}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Statisk friksjon er <em>passiv</em> — den er ikke alltid <InlineLatex latex="\mu_s N" />, men tilpasser seg dyttekraften inntil maksimum. Kinetisk friksjon er derimot alltid <InlineLatex latex="\mu_k N" /> mens legemet glir. Merk at <InlineLatex latex="\mu_k < \mu_s" /> alltid (lettere å holde i bevegelse enn å starte).</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Optimal dravinkel med friksjon"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kasse med tyngde mg = 500 N dras langs gulvet med en kraft <InlineLatex latex="F" /> i
              en vinkel 30° over horisontalplanet. Glidefriksjonstallet er <InlineLatex latex="\mu_k = 0{,}40" />.
            </p>
            <p className="mt-2">a) Finn F for konstant fart.</p>
            <p>b) Hvilken vinkel gir minst drakraft?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>ΣFy = 0 gir N = mg − F sin 30°. ΣFx = 0 gir F cos 30° = μN.</p> },
          { label: "Hint 2", content: <p>For optimal vinkel: deriver F(α) mhp. α og sett = 0. Du får α = tan⁻¹(μk).</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Tyngde: <InlineLatex latex="mg = 500\;\text{N}" /></li>
                <li>Glidefriksjonskoeffisient: <InlineLatex latex="\mu_k = 0{,}40" /></li>
                <li>Del a: dravinkel <InlineLatex latex="\alpha = 30°" /> over horisontalplanet, konstant fart</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Drakraften <InlineLatex latex="F" /> for konstant fart ved <InlineLatex latex="\alpha = 30°" /></li>
                <li>b) Optimal vinkel <InlineLatex latex="\alpha_{\text{opt}}" /> som gir minst mulig drakraft</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Konstant fart betyr likevekt — bruk <InlineLatex latex="\sum F_x = 0" /> og <InlineLatex latex="\sum F_y = 0" />.
                Den vertikale komponenten av <InlineLatex latex="F" /> avlaster normalkraften, som igjen reduserer friksjonen.
                For del b) utrykk <InlineLatex latex="F" /> som funksjon av <InlineLatex latex="\alpha" />, deriver og sett lik null for minimum.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning — del a)</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Likevekt i y-retning gir normalkraften.</p>
              <FormulaBox latex="\sum F_y = 0: \quad N + F\sin 30° - mg = 0 \;\Rightarrow\; N = mg - F\sin 30°" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> Likevekt i x-retning med friksjon.</p>
              <FormulaBox latex="\sum F_x = 0: \quad F\cos 30° - \mu_k N = 0" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3:</strong> Sett inn uttrykket for <InlineLatex latex="N" /> og løs for <InlineLatex latex="F" />.</p>
              <FormulaBox latex="F\cos 30° = \mu_k(mg - F\sin 30°)" variant="blue" />
              <FormulaBox latex="F(\cos 30° + \mu_k\sin 30°) = \mu_k mg" variant="blue" />
              <FormulaBox latex="F = \frac{\mu_k mg}{\cos 30° + \mu_k\sin 30°} = \frac{0{,}40 \cdot 500}{0{,}866 + 0{,}40 \cdot 0{,}5} = \frac{200}{1{,}066} = 188\;\text{N}" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del b)</p>
              <p className="text-sm mb-1"><strong>Steg 4:</strong> Generelt uttrykk for <InlineLatex latex="F(\alpha)" />.</p>
              <FormulaBox latex="F(\alpha) = \frac{\mu_k mg}{\cos\alpha + \mu_k\sin\alpha}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 5:</strong> Minimum av <InlineLatex latex="F" /> svarer til maksimum av nevneren. Deriver og sett lik null.</p>
              <FormulaBox latex="\frac{d}{d\alpha}(\cos\alpha + \mu_k\sin\alpha) = -\sin\alpha + \mu_k\cos\alpha = 0" variant="blue" />
              <FormulaBox latex="\tan\alpha = \mu_k \;\Rightarrow\; \alpha_{\text{opt}} = \tan^{-1}(\mu_k) = \tan^{-1}(0{,}40) = 21{,}8°" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 6:</strong> Drakraften ved optimal vinkel.</p>
              <FormulaBox latex="F(21{,}8°) = \frac{0{,}40 \cdot 500}{\cos 21{,}8° + 0{,}40\sin 21{,}8°} \approx 186\;\text{N}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{F(30°) = 188\;\text{N}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{\alpha_{\text{opt}} = 21{,}8°, \quad F_{\min} = 186\;\text{N}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Det er alltid lettere å dra i en vinkel enn horisontalt! Den oppover-rettede komponenten avlaster normalkraften og dermed friksjonen. Den optimale vinkelen er alltid <InlineLatex latex="\alpha_{\text{opt}} = \tan^{-1}(\mu_k)" /> — uavhengig av massen til legemet.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Karusell — horisontalsirkel"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kule med masse <InlineLatex latex="m = 2{,}5\;\text{kg}" /> henger i en snor med lengde{" "}
              <InlineLatex latex="L" /> og svinges i en horisontal sirkel med radius{" "}
              <InlineLatex latex="R = 5{,}00\;\text{m}" /> med 5 omdreininger per minutt.
              Finn snordraget.
            </p>
          </div>
        }
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Masse: <InlineLatex latex="m = 2{,}5\;\text{kg}" /></li>
                <li>Sirkelradius: <InlineLatex latex="R = 5{,}00\;\text{m}" /></li>
                <li>Antall omdreininger: <InlineLatex latex="n = 5\;\text{omdr/min}" /></li>
                <li>Horisontal sirkulær bevegelse (kulen henger horisontalt ut)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Snordraget <InlineLatex latex="S" /> (= den sentripetale kraften)</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Siden snoren er horisontal og kulen beveger seg i en horisontal sirkel, er snordraget den eneste horisontale kraften og dermed lik sentripetalkraften <InlineLatex latex="F_c = mv^2/R" />.
                Omgjør omdreiningene til banefart via <InlineLatex latex="v = n \cdot 2\pi R / 60" /> (der 60 er sekunder per minutt).
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Regn om til banefart. 5 omdr/min betyr at banen <InlineLatex latex="5 \cdot 2\pi R" /> tilbakelegges på 60 s.</p>
              <FormulaBox latex="v = \frac{n \cdot 2\pi R}{60} = \frac{5 \cdot 2\pi \cdot 5{,}00}{60} = 2{,}618\;\text{m/s}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> Sett opp N2L i horisontalretningen (innover = sentripetal).</p>
              <FormulaBox latex="\sum F = m\frac{v^2}{R}: \quad S = m\frac{v^2}{R} = 2{,}5 \cdot \frac{(2{,}618)^2}{5{,}00} = 3{,}43\;\text{N}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{S = 3{,}4\;\text{N}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">For horisontal sirkelbevegelse er snordraget alltid lik sentripetalkraften <InlineLatex latex="mv^2/R" />. Husk å konvertere omdreininger per minutt til m/s via <InlineLatex latex="v = n \cdot 2\pi R / 60" /> — en svært vanlig feil er å glemme denne omregningen.</p>
            </div>
          </div>
        }
      />

      {/* ── Øvingsoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Slede ned skråplan med friksjon"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En slede glir nedover et skråplan med vinkel <InlineLatex latex="\alpha" /> og
              glidefriksjonskoeffisient <InlineLatex latex="\mu_k" />.
            </p>
            <p className="mt-2">a) Finn den kritiske vinkelen der sleden glir med konstant fart (uttrykt ved μk).</p>
            <p>b) Finn akselerasjonen når vinkelen er brattere enn kritisk vinkel.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Konstant fart: ΣFx = 0 → mg sinα = R = μkN = μk mg cosα.</p> },
          { label: "Hint 2", content: <p>For del b: ΣFx = ma → mg sinα − μk mg cosα = ma.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Skråplanvinkel: <InlineLatex latex="\alpha" /></li>
                <li>Glidefriksjonskoeffisient: <InlineLatex latex="\mu_k" /></li>
                <li>Sleden glir nedover (kinetisk friksjon virker oppover langs planet)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Den kritiske vinkelen <InlineLatex latex="\alpha_c" /> der sleden glir med konstant fart</li>
                <li>b) Akselerasjonen <InlineLatex latex="a" /> ved brattere vinkel enn <InlineLatex latex="\alpha_c" /></li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Velg x langs planet (nedover positiv) og y normalt ut. Normallikningen gir <InlineLatex latex="N = mg\cos\alpha" />.
                Del a): konstant fart betyr <InlineLatex latex="a = 0" />, altså <InlineLatex latex="\sum F_x = 0" /> — sett opp og løs for <InlineLatex latex="\alpha" />.
                Del b): bruk N2L direkte for å finne <InlineLatex latex="a" />.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning — del a)</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Normalretningen gir <InlineLatex latex="N" />.</p>
              <FormulaBox latex="\sum F_y = 0: \quad N = mg\cos\alpha" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> Likevekt langs planet (konstant fart).</p>
              <FormulaBox latex="\sum F_x = 0: \quad mg\sin\alpha - R = 0, \quad R = \mu_k N = \mu_k mg\cos\alpha" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3:</strong> Sett likningene lik og forenkle — massen <InlineLatex latex="m" /> og <InlineLatex latex="g" /> forsvinner.</p>
              <FormulaBox latex="mg\sin\alpha = \mu_k mg\cos\alpha \;\Rightarrow\; \frac{\sin\alpha}{\cos\alpha} = \mu_k" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del b)</p>
              <p className="text-sm mb-1"><strong>Steg 4:</strong> Bruk N2L langs planet (netto kraft nedover).</p>
              <FormulaBox latex="\sum F_x = ma: \quad mg\sin\alpha - \mu_k mg\cos\alpha = ma" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 5:</strong> Del på <InlineLatex latex="m" /> — massen forsvinner igjen.</p>
              <FormulaBox latex="g\sin\alpha - \mu_k g\cos\alpha = a" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{\alpha_c = \tan^{-1}(\mu_k)}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{a = g(\sin\alpha - \mu_k\cos\alpha)}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Den kritiske vinkelen der et legeme glir med konstant fart er <InlineLatex latex="\alpha_c = \tan^{-1}(\mu_k)" /> — samme formel som optimal dravinkel! Det er fordi begge situasjoner er der friksjons- og bevegelseskraften er i perfekt balanse langs planet. Ved brattere vinkel dominerer tyngdekomponenten og legemet akselererer.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Pilot i loop-the-loop"
        difficulty="middels"
        source="Oblig 2, Oppgave 1a–b"
        problem={
          <div>
            <p>
              Et fly beveger seg i en sirkelformet loop med baneradius 500 m. Piloten har masse 80,0 kg.
              Banefarten er konstant 100 m/s.
            </p>
            <p className="mt-2">a) Tegn krefter og beregn normalkraften i topp og bunn av loopen.</p>
            <p>b) Hvor stor fart har piloten når han mister kontakt med setet i toppunktet?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>I topp: N og G peker begge ned (mot sentrum). I bunn: N opp, G ned.</p> },
          { label: "Hint 2", content: <p>Mister kontakt: N = 0. Sett inn i toppunkt-likningen.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Baneradius: <InlineLatex latex="r = 500\;\text{m}" /></li>
                <li>Pilotens masse: <InlineLatex latex="m = 80{,}0\;\text{kg}" /></li>
                <li>Konstant banefart: <InlineLatex latex="v = 100\;\text{m/s}" /></li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Normalkraften <InlineLatex latex="N" /> i topp og bunn av loopen</li>
                <li>b) Minimumsfart i topp for at piloten mister kontakt med setet (<InlineLatex latex="N = 0" />)</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Nøkkelen er å velge positiv retning <em>inn mot sentrum av sirkelen</em> hvert sted. I toppunktet peker sentrum <em>nedover</em>, så både <InlineLatex latex="N" /> og <InlineLatex latex="mg" /> bidrar positivt. I bunnpunktet peker sentrum <em>oppover</em>, så <InlineLatex latex="N" /> er positiv og <InlineLatex latex="mg" /> negativ. Sett opp <InlineLatex latex="\sum F = mv^2/r" /> i sentripetalretningen.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning — del a)</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Beregn sentripetalakselerasjonen.</p>
              <FormulaBox latex="a_c = \frac{v^2}{r} = \frac{(100)^2}{500} = 20{,}0\;\text{m/s}^2" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2 (topp):</strong> N og G peker begge nedover (mot sentrum). Positiv retning: ned.</p>
              <FormulaBox latex="\sum F = m\frac{v^2}{r}: \quad N + mg = m\frac{v^2}{r}" variant="blue" />
              <FormulaBox latex="N = m\!\left(\frac{v^2}{r} - g\right) = 80{,}0\,(20{,}0 - 9{,}81) = 815\;\text{N}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3 (bunn):</strong> N peker oppover (mot sentrum), G peker ned. Positiv retning: opp.</p>
              <FormulaBox latex="\sum F = m\frac{v^2}{r}: \quad N - mg = m\frac{v^2}{r}" variant="blue" />
              <FormulaBox latex="N = m\!\left(\frac{v^2}{r} + g\right) = 80{,}0\,(20{,}0 + 9{,}81) = 2384\;\text{N} \approx 2{,}38\;\text{kN}" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del b)</p>
              <p className="text-sm mb-1"><strong>Steg 4:</strong> I toppunktet mister piloten kontakt med setet når <InlineLatex latex="N = 0" />.</p>
              <FormulaBox latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 500} = 70{,}0\;\text{m/s}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{N_{\text{topp}} = 815\;\text{N}}}, \quad \underline{\underline{N_{\text{bunn}} = 2{,}38\;\text{kN}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{v_{\min,\text{topp}} = 70{,}0\;\text{m/s}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">I bunn av en loop er normalkraften større enn tyngden (du føler deg tyngre), og i toppen er den mindre (du føler deg lettere). Grenseverdien der du mister kontakt med setet i toppen er <InlineLatex latex="v = \sqrt{gr}" /> — uavhengig av massen. Mange studenter setter feil retning på <InlineLatex latex="N" /> i toppunktet — husk at normalkraften alltid peker <em>bort fra overflaten du sitter på</em>.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Bil i sving — maks fart"
        difficulty="middels"
        source="Oblig 2, Oppgave 1c–d"
        problem={
          <div>
            <p>
              c) En bil svinger mot høyre. En kule i snor henger i vinkel 10,0° fra loddlinjen.
              Bilens fart er 70,0 km/h. Finn svingens radius.
            </p>
            <p className="mt-2">
              d) Friksjonstallet mellom hjul og asfalt er 0,80. Hva er bilens maks fart gjennom svingen?
            </p>
          </div>
        }
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Del c): Snorens vinkel fra loddlinjen: <InlineLatex latex="\alpha = 10{,}0°" /></li>
                <li>Del c): Bilens fart: <InlineLatex latex="v = 70{,}0\;\text{km/h} = 19{,}44\;\text{m/s}" /></li>
                <li>Del d): Statisk friksjonskoeffisient: <InlineLatex latex="\mu_s = 0{,}80" /></li>
                <li>Bilen svinger — sentripetalakselerasjonen er horisontal (innover i svingen)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>c) Svingens radius <InlineLatex latex="r" /> (fra kulens utslag)</li>
                <li>d) Bilens maksimale fart <InlineLatex latex="v_{\max}" /> gjennom svingen</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Del c): En kule i snor i en bil som svinger oppfører seg som et akselerometer — utslaget gir sentripetalakselerasjonen. Bruk <InlineLatex latex="g\tan\alpha = v^2/r" /> (fra FBD av kulependelen: <InlineLatex latex="S\sin\alpha = mv^2/r" /> horisontalt og <InlineLatex latex="S\cos\alpha = mg" /> vertikalt). Del d): Friksjon mellom hjul og asfalt gir sentripetalkraften — massen forsvinner.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning — del c)</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Konverter farten til SI-enheter.</p>
              <FormulaBox latex="v = 70{,}0\;\text{km/h} = \frac{70{,}0}{3{,}6} = 19{,}44\;\text{m/s}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> FBD for kulependel: vertikal likning gir snordrag, horisontal gir sentripetalrelasjon.</p>
              <FormulaBox latex="S\cos\alpha = mg \quad\text{og}\quad S\sin\alpha = m\frac{v^2}{r}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3:</strong> Del horisontal på vertikal for å eliminere <InlineLatex latex="S" /> og <InlineLatex latex="m" />.</p>
              <FormulaBox latex="\tan\alpha = \frac{v^2}{gr} \;\Rightarrow\; r = \frac{v^2}{g\tan\alpha} = \frac{(19{,}44)^2}{9{,}81 \cdot \tan 10{,}0°} = \frac{377{,}9}{1{,}731} = 218\;\text{m}" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del d)</p>
              <p className="text-sm mb-1"><strong>Steg 4:</strong> Friksjonskraften leverer sentripetalkraften. Maks friksjon: <InlineLatex latex="F_f = \mu_s mg" />.</p>
              <FormulaBox latex="\mu_s mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{\mu_s g r} = \sqrt{0{,}80 \cdot 9{,}81 \cdot 218} = \sqrt{1709} = 41{,}3\;\text{m/s}" variant="blue" />
              <FormulaBox latex="v_{\max} = 41{,}3\;\text{m/s} \cdot 3{,}6 = 148{,}8\;\text{km/h}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{r \approx 218\;\text{m}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{v_{\max} \approx 149\;\text{km/h}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">En kulependel i en svingene bil fungerer som et akselerometer — vinkelen avslører sentripetalakselerasjonen. Friksjon mellom hjul og vei er det eneste som hindrer bilen fra å skli ut; massen spiller ingen rolle for maksfarten. Høyere <InlineLatex latex="\mu_s" /> og større kurveradius gir høyere tillatt fart.</p>
            </div>
          </div>
        }
      />

      {/* ── Eksamensoppgaver ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 5</p>
        <ul className="space-y-1 text-sm">
          <li>• FBD med friksjon + skrå kraft er et yndet eksamenstema (se kranbil-oppgaven!)</li>
          <li>• Husk at normalkraften endres når en kraft trekker i vinkel</li>
          <li>• &ldquo;Optimal vinkel&rdquo;-oppgaver (derivasjon) kommer ofte — α = tan⁻¹(μ)</li>
          <li>• Kombiner N2L med kinematikk: finn a fra krefter, bruk deretter v² = v₀² + 2as</li>
          <li>• Sirkelbevegelse: topp/bunn-analyse av pariserhjul/loop er svært eksamensrelevant</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Kranbil med container — friksjon og skrå kraft"
        difficulty="vanskelig"
        source="Eksamen Vår 2023, Oppgave 2"
        problem={
          <div>
            <p>
              En kranbil flytter en container på 1000 kg ved å slepe den langs bakken (horisontalt)
              med konstant fart. Glidefriksjonstallet er 0,65.
            </p>
            <p className="mt-2">a) Vaieren danner 25° med bakken. Hva er snordraget? Hvor mye arbeid gjør kranbilen over 15 m?</p>
            <p>b) Hvor mye arbeid gjør friksjonskraften over 15 m?</p>
            <p>c) Hvilken vinkel mellom vaier og bakken gir minst snordrag?</p>
            <p>d) Vaieren ryker når containeren har fart 2,5 m/s. Finn akselerasjon og bremselengde.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Konstant fart → likevekt. Vaierens vertikale komponent avlaster normalkraften.</p> },
          { label: "Hint 2", content: <p>ΣFy: N + F sinα = mg → N = mg − F sinα. ΣFx: F cosα = μkN.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Containermasse: <InlineLatex latex="m = 1000\;\text{kg}" /></li>
                <li>Glidefriksjonskoeffisient: <InlineLatex latex="\mu_k = 0{,}65" /></li>
                <li>Del a): vaiervinkel <InlineLatex latex="\alpha = 25°" />, konstant fart, strekning <InlineLatex latex="s = 15\;\text{m}" /></li>
                <li>Del d): containeren har fart <InlineLatex latex="v_0 = 2{,}5\;\text{m/s}" /> idet vaieren ryker</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Snordrag <InlineLatex latex="F" /> og arbeid <InlineLatex latex="W_F" /> ved <InlineLatex latex="\alpha = 25°" /></li>
                <li>b) Friksjonskraftens arbeid <InlineLatex latex="W_R" /></li>
                <li>c) Optimal vaiervinkel <InlineLatex latex="\alpha_{\text{opt}}" /></li>
                <li>d) Akselerasjon og bremselengde etter vaierbrudd</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                FBD: krefter er <InlineLatex latex="F" /> (vaier, 25° opp), <InlineLatex latex="N" /> (normalt opp), <InlineLatex latex="mg" /> (ned), <InlineLatex latex="R = \mu_k N" /> (horisontalt bakover).
                Konstant fart → likevekt; vertikal likning gir <InlineLatex latex="N" /> som funksjon av <InlineLatex latex="F" />, horisontal gir <InlineLatex latex="F" />.
                Arbeid: <InlineLatex latex="W = Fs\cos\theta" />. Optimal vinkel: deriver <InlineLatex latex="F(\alpha)" /> og sett = 0.
                Etter vaierbrudd: kun friksjon, bruk kinematikk <InlineLatex latex="v^2 = v_0^2 + 2as" />.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning — del a)</p>
              <p className="text-sm mb-1"><strong>Steg 1:</strong> Likevekt i y-retning.</p>
              <FormulaBox latex="\sum F_y = 0: \quad N + F\sin 25° - mg = 0 \;\Rightarrow\; N = mg - F\sin 25°" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2:</strong> Likevekt i x-retning.</p>
              <FormulaBox latex="\sum F_x = 0: \quad F\cos 25° - \mu_k N = 0 \;\Rightarrow\; F\cos 25° = \mu_k(mg - F\sin 25°)" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 3:</strong> Løs for <InlineLatex latex="F" />.</p>
              <FormulaBox latex="F(\cos 25° + \mu_k\sin 25°) = \mu_k mg" variant="blue" />
              <FormulaBox latex="F = \frac{0{,}65 \cdot 1000 \cdot 9{,}81}{0{,}906 + 0{,}65 \cdot 0{,}423} = \frac{6377}{1{,}181} = 5399\;\text{N} \approx 5{,}4\;\text{kN}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 4:</strong> Arbeid utført av vaieren (kraft langs bevegelsesretning).</p>
              <FormulaBox latex="W_F = F \cdot s \cdot \cos 25° = 5399 \cdot 15 \cdot 0{,}906 = 73{,}4\;\text{kJ}" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del b)</p>
              <p className="text-sm mb-1"><strong>Steg 5:</strong> Beregn normalkraft og friksjonskraft.</p>
              <FormulaBox latex="N = mg - F\sin 25° = 9810 - 5399 \cdot 0{,}423 = 7527\;\text{N}" variant="blue" />
              <FormulaBox latex="R = \mu_k N = 0{,}65 \cdot 7527 = 4893\;\text{N}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 6:</strong> Friksjonens arbeid er negativt (motvirker bevegelsen).</p>
              <FormulaBox latex="W_R = -R \cdot s = -4893 \cdot 15 = -73{,}4\;\text{kJ}" variant="blue" />
              <p className="text-sm mt-1">Kontrolls: <InlineLatex latex="W_F + W_R = 0" /> fordi konstant fart betyr <InlineLatex latex="\Delta K = 0" />.</p>

              <p className="font-semibold mb-3 mt-4">Løsning — del c)</p>
              <p className="text-sm mb-1"><strong>Steg 7:</strong> Minimer <InlineLatex latex="F(\alpha) = \mu_k mg / (\cos\alpha + \mu_k\sin\alpha)" /> — deriver nevner og sett lik null.</p>
              <FormulaBox latex="\alpha_{\text{opt}} = \tan^{-1}(\mu_k) = \tan^{-1}(0{,}65) = 33{,}0°" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del d)</p>
              <p className="text-sm mb-1"><strong>Steg 8:</strong> Etter vaierbrudd er eneste kraft friksjon. Nå er <InlineLatex latex="N = mg" /> (ingen vertikal komponent fra vaier).</p>
              <FormulaBox latex="a = -\mu_k g = -0{,}65 \cdot 9{,}81 = -6{,}4\;\text{m/s}^2" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 9:</strong> Bruk kinematikk for å finne bremselengden.</p>
              <FormulaBox latex="v^2 = v_0^2 + 2as \;\Rightarrow\; 0 = (2{,}5)^2 + 2(-6{,}4)s" variant="blue" />
              <FormulaBox latex="s = \frac{(2{,}5)^2}{2 \cdot 6{,}4} = \frac{6{,}25}{12{,}8} = 0{,}488\;\text{m}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{F = 5{,}4\;\text{kN}}}, \quad \underline{\underline{W_F = 73\;\text{kJ}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{W_R = -73\;\text{kJ}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{\alpha_{\text{opt}} = 33°}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{a = -6{,}4\;\text{m/s}^2}}, \quad \underline{\underline{s \approx 0{,}49\;\text{m}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">Denne oppgaven kombinerer alt fra kapittel 5: FBD med skrå kraft, friksjon der normalkraften avhenger av drakraften, arbeid–energi-kontroll, optimal dravinkel (derivasjon), og kinematikk etter kraftbortfall. En ekte eksamensoppgave som tester om du kan holde mange prinsipper i hodet samtidig.</p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Pariserhjul — normalkraft i topp og bunn"
        difficulty="middels"
        source="Forelesning / eksamensrelevant"
        problem={
          <div>
            <p>
              Et pariserhjul har radius <InlineLatex latex="r = 8\;\text{m}" />. En passasjer har masse 60 kg
              og farten i laveste punkt er 5 m/s.
            </p>
            <p className="mt-2">a) Finn normalkraften på passasjeren i topp og bunn.</p>
            <p>b) Hva er minimumsfarten i topp for at passasjeren skal miste kontakt med setet?</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>I topp: mg − N = mv²/r. I bunn: N − mg = mv²/r.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Hva vet vi */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li>Radius: <InlineLatex latex="r = 8\;\text{m}" /></li>
                <li>Passasjermasse: <InlineLatex latex="m = 60\;\text{kg}" /></li>
                <li>Farten i laveste punkt: <InlineLatex latex="v = 5\;\text{m/s}" /> (vi bruker <InlineLatex latex="v^2 = 25\;\text{m}^2/\text{s}^2" />)</li>
              </ul>
            </div>

            {/* Hva skal vi finne */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Normalkraften <InlineLatex latex="N" /> i toppunkt og bunnpunkt</li>
                <li>b) Minimumsfart i topp for at passasjeren mister kontakt med setet</li>
              </ul>
            </div>

            {/* Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold mb-2">Strategi</p>
              <p className="text-sm">
                Nøkkelen er retningskonvensjonen: velg alltid positiv retning <em>inn mot sentrum</em>.
                I toppunktet er sentrum nedover: <InlineLatex latex="mg - N = mv^2/r" /> (begge N og G må vurderes).
                I bunnpunktet er sentrum oppover: <InlineLatex latex="N - mg = mv^2/r" />.
                Del b): grensebetingelsen er <InlineLatex latex="N = 0" />.
              </p>
            </div>

            {/* Løsning */}
            <div>
              <p className="font-semibold mb-3">Løsning — del a)</p>
              <p className="text-sm mb-1"><strong>Steg 1 (toppunkt):</strong> Sentrum er nedover. Positiv retning: ned. <InlineLatex latex="mg" /> peker ned (positiv), <InlineLatex latex="N" /> peker opp (negativ).</p>
              <FormulaBox latex="\sum F_{\text{inn}} = m\frac{v^2}{r}: \quad mg - N = m\frac{v^2}{r}" variant="blue" />
              <FormulaBox latex="N = m\!\left(g - \frac{v^2}{r}\right) = 60\!\left(9{,}81 - \frac{25}{8}\right) = 60\,(9{,}81 - 3{,}125) = 60 \cdot 6{,}685 = 401\;\text{N}" variant="blue" />

              <p className="text-sm mb-1 mt-3"><strong>Steg 2 (bunnpunkt):</strong> Sentrum er oppover. Positiv retning: opp. <InlineLatex latex="N" /> peker opp (positiv), <InlineLatex latex="mg" /> peker ned (negativ).</p>
              <FormulaBox latex="\sum F_{\text{inn}} = m\frac{v^2}{r}: \quad N - mg = m\frac{v^2}{r}" variant="blue" />
              <FormulaBox latex="N = m\!\left(g + \frac{v^2}{r}\right) = 60\!\left(9{,}81 + \frac{25}{8}\right) = 60\,(9{,}81 + 3{,}125) = 60 \cdot 12{,}935 = 776\;\text{N}" variant="blue" />

              <p className="font-semibold mb-3 mt-4">Løsning — del b)</p>
              <p className="text-sm mb-1"><strong>Steg 3:</strong> Setter <InlineLatex latex="N = 0" /> i toppunkt-likningen.</p>
              <FormulaBox latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 8} = \sqrt{78{,}48} = 8{,}86\;\text{m/s}" variant="blue" />
            </div>

            {/* Svar */}
            <div>
              <p className="font-semibold mb-2">Svar</p>
              <FormulaBox latex="\underline{\underline{N_{\text{topp}} = 401\;\text{N}}}, \quad \underline{\underline{N_{\text{bunn}} = 776\;\text{N}}}" variant="gold" />
              <FormulaBox latex="\underline{\underline{v_{\min,\text{topp}} = 8{,}9\;\text{m/s}}}" variant="gold" />
            </div>

            {/* Hva lærte vi */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold mb-1">Hva lærte vi?</p>
              <p className="text-sm">I bunnpunktet er normalkraften større enn tyngden (du føler deg tyngre enn vanlig — ca. <InlineLatex latex="1{,}3g" /> her), og i toppunktet er den mindre (du føler deg lettere). Mister du kontakt med setet i toppen gjelder <InlineLatex latex="v_{\min} = \sqrt{gr}" /> — massen spiller ingen rolle. Over denne farten &ldquo;svever&rdquo; du i toppunktet.</p>
            </div>
          </div>
        }
      />
    </div>
  );
}
