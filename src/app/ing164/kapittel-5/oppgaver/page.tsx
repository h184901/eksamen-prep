"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-6">Oppgaver</h2>

      {/* ── Oppgavestrategier ── */}
      <CollapsibleSection title="Oppgavestrategier">
      <div className="grid md:grid-cols-2 gap-4">
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
      </CollapsibleSection>

      {/* ── Gjennomgåtte eksempler ── */}
      <CollapsibleSection title="Eksempler fra timen">

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

      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Vår 2023</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 1–2</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-5" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 5</p>
        </Link>
      </div>
    </div>
  );
}
