"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <CollapsibleSection title="Oppgavestrategier">
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Energibevaring uten friksjon</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Velg nullnivå</strong> for potensiell energi (der det er mest praktisk)</li>
            <li><strong>Identifiser start- og sluttpunkt</strong> med kjente størrelser</li>
            <li><strong>Sjekk:</strong> Gjør noen andre krefter enn tyngden arbeid? Normalkraft = nei. Friksjon = ja!</li>
            <li><strong>Sett opp:</strong> <InlineLatex latex="E_{K1} + E_{P1} = E_{K2} + E_{P2}" /></li>
            <li><strong>Løs for ukjent</strong> (v eller h)</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Energibevaring MED friksjon</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Samme steg 1–3 som over</li>
            <li><strong>Beregn W<sub>andre</sub>:</strong> Friksjonens arbeid = <InlineLatex latex="-Rs" /> (alltid negativt)</li>
            <li><strong>Sett opp:</strong> <InlineLatex latex="E_{K1} + E_{P1} + W_{\text{andre}} = E_{K2} + E_{P2}" /></li>
            <li><strong>Løs for ukjent</strong></li>
            <li><strong>Sjekk:</strong> Fikk du negativt W<sub>friksjon</sub>? Hvis ikke, er det feil!</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Energi vs. kinematikk — Når bruke hva?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--card-border)]">
                  <th className="text-left py-2 pr-4">Bruk energimetoden</th>
                  <th className="text-left py-2">Bruk kinematikk</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kun fart og posisjon er relevant</td>
                  <td className="py-2">Tid er etterspurt</td>
                </tr>
                <tr className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-4">Kurvet bane (skråplan, pendel)</td>
                  <td className="py-2">Rettlinjet bevegelse med kjent a</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Varierende krefter (fjær)</td>
                  <td className="py-2">Konstant kraft, spør etter a eller t</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Vanlige feil</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Glemmer at E<sub>P</sub> kan være negativ (hvis y er under nullnivået)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Bruker h = buelengde i stedet for <strong>vertikal</strong> høydeforskjell</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Setter v = 0 ved toppen av prosjektilbane (v<sub>x</sub> er ikke null!)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Glemmer friksjon i begge retninger ved opp-og-ned-problemer</span>
            </li>
          </ul>
        </div>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
      {/* Eksempel 1: Ball kastet rett opp */}
      <ExerciseCard
        number={1}
        title="Ball kastet rett opp — maks høyde"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ball med masse <InlineLatex latex="m = 0{,}145\;\text{kg}" /> kastes rett opp med
              fart <InlineLatex latex="v_1 = 20\;\text{m/s}" /> fra <InlineLatex latex="y_1 = 0" />.
            </p>
            <p className="mt-2">Finn maksimal høyde (kun tyngden virker).</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Ved maks høyde er farten null: <InlineLatex latex="v_2 = 0" />.</p>,
          },
          {
            label: "Hint 2",
            content: <p>Bruk energibevaring: <InlineLatex latex="mgy_2 = \tfrac{1}{2}mv_1^2" />. Massen kansellerer!</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 0{,}145\;\text{kg}" /></li>
              <li>Startfart: <InlineLatex latex="v_1 = 20\;\text{m/s}" /> (oppover)</li>
              <li>Starthøyde: <InlineLatex latex="y_1 = 0" /></li>
              <li>Kun tyngden virker (ingen luftmotstand)</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Maksimal høyde <InlineLatex latex="y_2" />.</p>
            <p><strong>Strategi:</strong> Ved maks høyde er all kinetisk energi omgjort til potensiell energi (<InlineLatex latex="v_2 = 0" />). Vi bruker energibevaring: <InlineLatex latex="E_{K1} + E_{P1} = E_{K2} + E_{P2}" />. Massen kansellerer — maks høyde avhenger kun av startfart!</p>
            <p><strong>Løsning:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}mv_1^2 + mgy_1 = \tfrac{1}{2}mv_2^2 + mgy_2"
              variant="blue"
            />
            <p className="text-sm">Med <InlineLatex latex="v_2 = 0" /> og <InlineLatex latex="y_1 = 0" />:</p>
            <FormulaBox
              latex="\tfrac{1}{2}mv_1^2 = mgy_2 \;\Rightarrow\; y_2 = \frac{v_1^2}{2g}"
              variant="blue"
            />
            <FormulaBox
              latex="y_2 = \frac{20^2}{2 \cdot 9{,}81} = \frac{400}{19{,}62} = \underline{\underline{20{,}4\;\text{m}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Massen kansellerer — maks høyde avhenger kun av startfarten! Formelen <InlineLatex latex="h = v^2/(2g)" /> er en nyttig snarvei for alle problemer med vertikalt kast. Energibevaring er raskere enn kinematikk her.</p>
          </div>
        }
      />

      {/* Eksempel 2: Ball med håndkraft */}
      <ExerciseCard
        number={2}
        title="Ball kastet med håndkraft — Andre krefter gjør arbeid"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ball (<InlineLatex latex="m = 0{,}145\;\text{kg}" />) akselereres av en hånd.
              Hånden starter i <InlineLatex latex="y_0 = -0{,}50\;\text{m}" /> (under nullnivå) med <InlineLatex latex="v_0 = 0" />,
              og slipper ballen i <InlineLatex latex="y_1 = 0" /> med fart <InlineLatex latex="v_1 = 20\;\text{m/s}" />.
            </p>
            <p className="mt-2">
              a) Finn kraften F fra hånden.<br />
              b) Finn farten <InlineLatex latex="15\;\text{m}" /> over slipppunktet.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>a) Hånden gjør arbeid W = F &middot; d over strekningen 0,50 m. Bruk den utvidede energiligningen.</p>,
          },
          {
            label: "Hint 2",
            content: <p>b) Etter slipp er det kun tyngden som virker → vanlig energibevaring.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Kraften fra hånden:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}mv_0^2 + mgy_0 + W_{\text{hånd}} = \tfrac{1}{2}mv_1^2 + mgy_1"
              variant="blue"
            />
            <FormulaBox
              latex="0 + mg(-0{,}5) + F \cdot 0{,}5 = \tfrac{1}{2}mv_1^2 + 0"
              variant="blue"
            />
            <FormulaBox
              latex="F = \frac{\tfrac{1}{2}mv_1^2 - mg(-0{,}5)}{0{,}5} = \frac{\tfrac{1}{2} \cdot 0{,}145 \cdot 400 + 0{,}145 \cdot 9{,}81 \cdot 0{,}5}{0{,}5} = \underline{\underline{59\;\text{N}}}"
              variant="gold"
            />

            <p><strong>b) Fart 15 m over slipppunktet:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}mv_1^2 = \tfrac{1}{2}mv_2^2 + mgy_2"
              variant="blue"
            />
            <FormulaBox
              latex="v_2 = \pm\sqrt{v_1^2 - 2gy_2} = \pm\sqrt{400 - 2 \cdot 9{,}81 \cdot 15} = \underline{\underline{\pm 10{,}3\;\text{m/s}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Fortegnet betyr at ballen kan ha denne farten <em>to ganger</em> — én gang på vei opp (+) og én gang på vei ned (−).
            </p>
          </div>
        }
      />

      {/* Eksempel 3: Prosjektil maks høyde */}
      <ExerciseCard
        number={3}
        title="Prosjektil — Maks høyde via energi"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ball (<InlineLatex latex="m = 0{,}145\;\text{kg}" />) kastes med
              fart <InlineLatex latex="v_0 = 20\;\text{m/s}" /> i
              vinkel <InlineLatex latex="\alpha_0 = 60°" /> med horisontal.
            </p>
            <p className="mt-2">Finn maksimal høyde med energimetoden.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Ved maks høyde er vertikal hastighet null, men horisontal hastighet er bevart: <InlineLatex latex="v_2 = v_0\cos\alpha_0" />.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 0{,}145\;\text{kg}" /></li>
              <li>Startfart: <InlineLatex latex="v_0 = 20\;\text{m/s}" /></li>
              <li>Kastvinkel: <InlineLatex latex="\alpha_0 = 60°" /></li>
              <li>Starthøyde: <InlineLatex latex="y_0 = 0" /></li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Maksimal høyde h.</p>
            <p><strong>Strategi:</strong> Ved maks høyde er den vertikale hastighetskomponenten null (<InlineLatex latex="v_y = 0" />), men den horisontale er bevart: <InlineLatex latex="v_x = v_0\cos\alpha_0" />. Farten i toppen er altså IKKE null! Vi bruker energibevaring med <InlineLatex latex="v_2 = v_0\cos\alpha_0" />.</p>
            <p><strong>Løsning:</strong></p>
            <p className="text-sm"><strong>Steg 1:</strong> Fart i toppunktet (kun horisontal komponent):</p>
            <FormulaBox
              latex="v_2 = v_0\cos 60° = 20 \cdot 0{,}5 = 10\;\text{m/s}"
              variant="blue"
            />
            <p className="text-sm"><strong>Steg 2:</strong> Energibevaring:</p>
            <FormulaBox
              latex="\tfrac{1}{2}mv_0^2 + 0 = \tfrac{1}{2}mv_2^2 + mgh"
              variant="blue"
            />
            <p className="text-sm">Massen kansellerer:</p>
            <FormulaBox
              latex="h = \frac{v_0^2 - v_2^2}{2g} = \frac{20^2 - 10^2}{2 \cdot 9{,}81} = \frac{300}{19{,}62} = \underline{\underline{15{,}3\;\text{m}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energimetoden gir maks høyde for prosjektiler UTEN kinematikk-formler! Den kritiske innsikten er at farten ved toppen ikke er null — den horisontale komponenten er bevart. Sammenlign med rakt kast opp (20,4 m): skrått kast når lavere fordi noe av energien «brukes» til horisontal bevegelse.</p>
          </div>
        }
      />

      {/* Eksempel 4: Skateboard på kvartsirkel */}
      <ExerciseCard
        number={4}
        title="Friksjonsfritt skateboard på kvartsirskel"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et skateboard (<InlineLatex latex="m = 25{,}0\;\text{kg}" />) starter fra ro
              på toppen av en kvartsirkelformet rampe med radius <InlineLatex latex="R = 3{,}0\;\text{m}" />.
              Rampen er friksjonsfri.
            </p>
            <p className="mt-2">Finn farten i bunnen av rampen.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Normalkraften er alltid vinkelrett på bevegelsen → gjør null arbeid. Bruk energibevaring med h = R.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 25{,}0\;\text{kg}" /></li>
              <li>Radius (= høydeforskjell): <InlineLatex latex="R = 3{,}0\;\text{m}" /></li>
              <li>Startfart: <InlineLatex latex="v_1 = 0" /> (slippes fra ro)</li>
              <li>Friksjonsfritt</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Farten <InlineLatex latex="v_2" /> i bunnen av rampen.</p>
            <p><strong>Strategi:</strong> Normalkraften er alltid vinkelrett på bevegelsen og gjør null arbeid. Uten friksjon er det kun tyngden som gjør arbeid, så vi bruker energibevaring. Høydeforskjellen er R (fra topp til bunn av kvartsirkelen). Merk: formen på banen spiller ingen rolle — kun høydeforskjellen!</p>
            <p><strong>Løsning:</strong></p>
            <FormulaBox
              latex="E_{K1} + E_{P1} = E_{K2} + E_{P2}"
              variant="blue"
            />
            <p className="text-sm">Med <InlineLatex latex="v_1 = 0" />, <InlineLatex latex="y_1 = R" />, <InlineLatex latex="y_2 = 0" />:</p>
            <FormulaBox
              latex="0 + mgR = \tfrac{1}{2}mv_2^2 + 0 \;\Rightarrow\; v_2 = \sqrt{2gR}"
              variant="blue"
            />
            <FormulaBox
              latex="v_2 = \sqrt{2 \cdot 9{,}81 \cdot 3{,}0} = \sqrt{58{,}9} = \underline{\underline{7{,}67\;\text{m/s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring langs kurver fungerer fordi normalkraften aldri gjør arbeid. Farten avhenger kun av høydeforskjellen, ikke formen på kurven! Formelen <InlineLatex latex="v = \sqrt{2gh}" /> dukker opp igjen og igjen — lær den utenat.</p>
          </div>
        }
      />

      {/* Eksempel 5: Skateboard med friksjon */}
      <ExerciseCard
        number={5}
        title="Skateboard med friksjon — Finn friksjonens arbeid"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Samme oppsett som forrige, men nå med friksjon. Skateboardet
              når bunnen med fart <InlineLatex latex="v_2 = 6{,}0\;\text{m/s}" /> i stedet for 7,67 m/s.
              Masse <InlineLatex latex="m = 25{,}0\;\text{kg}" />, <InlineLatex latex="R = 3{,}0\;\text{m}" />.
            </p>
            <p className="mt-2">Finn arbeidet gjort av friksjon.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk den utvidede energiligningen med W<sub>R</sub> som ukjent.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 25{,}0\;\text{kg}" /></li>
              <li>Radius: <InlineLatex latex="R = 3{,}0\;\text{m}" /></li>
              <li>Startfart: <InlineLatex latex="v_1 = 0" /></li>
              <li>Fart i bunn: <InlineLatex latex="v_2 = 6{,}0\;\text{m/s}" /> (lavere enn 7,67 m/s uten friksjon)</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Arbeidet gjort av friksjon <InlineLatex latex="W_R" />.</p>
            <p><strong>Strategi:</strong> Vi bruker den utvidede energiligningen som inkluderer arbeid fra ikke-konservative krefter: <InlineLatex latex="E_{K1} + E_{P1} + W_{\text{andre}} = E_{K2} + E_{P2}" />. Friksjon er den eneste «andre» kraften, så <InlineLatex latex="W_{\text{andre}} = W_R" />.</p>
            <p><strong>Løsning:</strong></p>
            <FormulaBox
              latex="0 + mgR + W_R = \tfrac{1}{2}mv_2^2 + 0"
              variant="blue"
            />
            <p className="text-sm">Løser for <InlineLatex latex="W_R" />:</p>
            <FormulaBox
              latex="W_R = \tfrac{1}{2}mv_2^2 - mgR = \tfrac{1}{2} \cdot 25 \cdot 6{,}0^2 - 25 \cdot 9{,}81 \cdot 3{,}0"
              variant="blue"
            />
            <FormulaBox
              latex="W_R = 450 - 735{,}8 = \underline{\underline{-286\;\text{J}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Negativt arbeid fra friksjon betyr at energi er fjernet fra systemet (omgjort til varme). Sammenlign: uten friksjon fikk vi 7,67 m/s (kinetisk energi 735 J), med friksjon bare 6,0 m/s (450 J). Differansen 286 J ble til varme.</p>
          </div>
        }
      />

      {/* Eksempel 6: Kloss opp-og-ned med friksjon */}
      <ExerciseCard
        number={6}
        title="Kloss opp og ned skråplan med friksjon (to steg)"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kloss (<InlineLatex latex="m = 12\;\text{kg}" />) skyves opp et skråplan
              (<InlineLatex latex="30°" />) med startfart <InlineLatex latex="v_1 = 5{,}0\;\text{m/s}" />.
              Klossen glir <InlineLatex latex="s = 1{,}6\;\text{m}" /> opp langs skråplanet før den stopper.
            </p>
            <p className="mt-2">
              a) Finn friksjonskraften R.<br />
              b) Finn farten når klossen glir tilbake ned til startpunktet.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>a) Høyden: <InlineLatex latex="h = s\sin 30° = 0{,}8\;\text{m}" />. Bruk utvidet energiligning med v₂ = 0.</p>,
          },
          {
            label: "Hint 2",
            content: <p>b) Friksjon virker OGSÅ på vei ned (motsatt retning, men fortsatt negativt arbeid). Bruk energibevaring fra topp ned.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Opp skråplanet (v₂ = 0):</strong></p>
            <FormulaBox
              latex="h = s\sin 30° = 1{,}6 \cdot 0{,}5 = 0{,}8\;\text{m}"
              variant="blue"
            />
            <FormulaBox
              latex="\tfrac{1}{2}mv_1^2 + 0 + W_R = 0 + mgh"
              variant="blue"
            />
            <FormulaBox
              latex="W_R = mgh - \tfrac{1}{2}mv_1^2 = 12 \cdot 9{,}81 \cdot 0{,}8 - \tfrac{1}{2} \cdot 12 \cdot 25 = 94{,}2 - 150 = -55{,}8\;\text{J}"
              variant="blue"
            />
            <FormulaBox
              latex="W_R = -R \cdot s \;\Rightarrow\; R = \frac{55{,}8}{1{,}6} = \underline{\underline{34{,}9\;\text{N}}}"
              variant="gold"
            />

            <p><strong>b) Ned igjen (fra y = h med v = 0):</strong></p>
            <p className="text-sm">Friksjon gjør negativt arbeid også på vei ned (W<sub>R</sub> = −R &middot; s):</p>
            <FormulaBox
              latex="0 + mgh + W_R = \tfrac{1}{2}mv_3^2 + 0"
              variant="blue"
            />
            <FormulaBox
              latex="\tfrac{1}{2}mv_3^2 = mgh - Rs = 94{,}2 - 55{,}8 = 38{,}4\;\text{J}"
              variant="blue"
            />
            <FormulaBox
              latex="v_3 = \sqrt{\frac{2 \cdot 38{,}4}{12}} = \underline{\underline{2{,}5\;\text{m/s}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Klossen mister energi <em>begge veier</em> — fra 5,0 m/s til 2,5 m/s. Friksjon er den store energityven!
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Ved opp-og-ned-problemer må du bruke energiligningen i to steg. Friksjon gjør negativt arbeid i begge retninger.</p>
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
          <p className="text-xs text-[var(--muted)]">Ikke direkte dekket</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 2, oppgave 2</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 7</p>
        </Link>
      </div>
    </div>
  );
}
