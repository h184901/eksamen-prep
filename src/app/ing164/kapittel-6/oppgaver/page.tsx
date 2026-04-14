"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>

      {/* ── OPPGAVESTRATEGIER ── */}
      <CollapsibleSection title="Oppgavestrategier">
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Beregne arbeid</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Tegn frilegemediagram</strong> — identifiser ALLE krefter som virker</li>
            <li><strong>Bestem vinkelen &phi;</strong> mellom hver kraft og forflytningsretningen</li>
            <li><strong>Beregn arbeid fra hver kraft:</strong> <InlineLatex latex="W_i = F_i \cdot s \cdot \cos\varphi_i" /></li>
            <li><strong>Husk:</strong> Tyngde og normalkraft gir W = 0 på horisontal forflytning</li>
            <li><strong>Summer:</strong> <InlineLatex latex="W_{\text{tot}} = W_1 + W_2 + W_3 + \cdots" /></li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Arbeid-energi-teoremet</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Identifiser start- og sluttpunkt</strong> med kjente/ukjente hastigheter</li>
            <li><strong>Beregn totalt arbeid</strong> mellom de to punktene</li>
            <li><strong>Sett opp:</strong> <InlineLatex latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" /></li>
            <li><strong>Løs for ukjent</strong> (vanligvis v₂ eller W)</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Fjær + friksjon-oppgaver</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Fjærarbeid:</strong> <InlineLatex latex="W_{\text{fjær}} = \tfrac{1}{2}kx_2^2 - \tfrac{1}{2}kx_1^2" /></li>
            <li><strong>Friksjonsarbeid:</strong> <InlineLatex latex="W_R = -\mu mg \cdot d" /></li>
            <li><strong>Sett opp arbeid-energi-teoremet:</strong> Fjærarbeid + friksjonsarbeid = &Delta;E<sub>K</sub></li>
            <li><strong>Forvent andregradsligning</strong> — velg den fysisk fornuftige løsningen (positiv avstand)</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Vanlige feil</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Glemmer at friksjon alltid gjør <strong>negativt</strong> arbeid (cos 180° = −1)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Bruker feil vinkel — vinkelen er mellom <strong>kraft og forflytning</strong>, ikke mellom kraft og horisontal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Glemmer å konvertere enheter (kJ til J, km/h til m/s)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5 font-bold">✗</span>
              <span>Setter <InlineLatex latex="W = Fs" /> uten å inkludere cos &phi;</span>
            </li>
          </ul>
        </div>
      </div>
      </CollapsibleSection>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <CollapsibleSection title="Eksempler fra timen">

      {/* Eksempel 1: Bil skyves */}
      <ExerciseCard
        number={1}
        title="Arbeid — Bil skyves i vinkel"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En bil skyves med en kraft <InlineLatex latex="F = 210\;\text{N}" /> langs en strekning{" "}
              <InlineLatex latex="s = 18\;\text{m}" />. Kraften virker i en vinkel{" "}
              <InlineLatex latex="\varphi = 30°" /> i forhold til bevegelsesretningen.
            </p>
            <p className="mt-2">Finn arbeidet som utføres.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk formelen for arbeid med vinkel: <InlineLatex latex="W = Fs\cos\varphi" /></p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li><InlineLatex latex="F = 210\;\text{N}" /></li>
              <li><InlineLatex latex="s = 18\;\text{m}" /></li>
              <li><InlineLatex latex="\varphi = 30°" /></li>
            </ul>
            <p><strong>Beregning:</strong></p>
            <FormulaBox
              latex="W = F \cdot s \cdot \cos\varphi = 210 \cdot 18 \cdot \cos 30° = 210 \cdot 18 \cdot 0{,}866"
              variant="blue"
            />
            <FormulaBox
              latex="W = \underline{\underline{3{,}27\;\text{kJ}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Kun kraftkomponenten langs bevegelsesretningen bidrar til arbeid.</p>
          </div>
        }
      />

      {/* Eksempel 2: Arbeid med vektorer */}
      <ExerciseCard
        number={2}
        title="Arbeid med prikkprodukt (vektorer)"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En kraft <InlineLatex latex="\vec{F} = 160\hat{\imath} - 40\hat{\jmath}\;\text{N}" /> virker
              på et legeme som forflyttes <InlineLatex latex="\vec{s} = 14\hat{\imath} + 11\hat{\jmath}\;\text{m}" />.
            </p>
            <p className="mt-2">Finn arbeidet.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk prikkprodukt: <InlineLatex latex="W = F_x s_x + F_y s_y" /></p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li><InlineLatex latex="\vec{F} = 160\hat{\imath} - 40\hat{\jmath}\;\text{N}" /> → <InlineLatex latex="F_x = 160\;\text{N},\; F_y = -40\;\text{N}" /></li>
              <li><InlineLatex latex="\vec{s} = 14\hat{\imath} + 11\hat{\jmath}\;\text{m}" /> → <InlineLatex latex="s_x = 14\;\text{m},\; s_y = 11\;\text{m}" /></li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Arbeidet W.</p>
            <p><strong>Strategi:</strong> Når kraft og forflytning er gitt som vektorer, bruker vi <strong>prikkproduktet</strong> for å finne arbeidet. Prikkproduktet summerer produktet av komponentene: <InlineLatex latex="W = F_x s_x + F_y s_y" />. Dette er ekvivalent med <InlineLatex latex="W = Fs\cos\varphi" />, men enklere når vi allerede har komponentene.</p>
            <p><strong>Løsning:</strong></p>
            <FormulaBox
              latex="W = \vec{F} \cdot \vec{s} = F_x s_x + F_y s_y = 160 \cdot 14 + (-40) \cdot 11"
              variant="blue"
            />
            <FormulaBox
              latex="W = 2240 - 440 = \underline{\underline{1{,}80\;\text{kJ}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Prikkproduktet beregnes komponent for komponent og summeres. Pass på fortegn — en negativ kraftkomponent i en positiv forflytningsretning gir negativt bidrag til arbeidet.</p>
          </div>
        }
      />

      {/* Eksempel 3: Traktor sleper slede */}
      <ExerciseCard
        number={3}
        title="Traktor sleper slede — arbeid fra alle krefter"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En traktor sleper en slede med ved langs en horisontal vei. Sledens vekt
              er <InlineLatex latex="mg = 14\,700\;\text{N}" />. Trekkraften fra traktoren
              er <InlineLatex latex="F_T = 5000\;\text{N}" /> i en vinkel <InlineLatex latex="36{,}9°" /> over
              horisontal. Friksjonen er <InlineLatex latex="R = 3500\;\text{N}" />. Normalkraften
              er <InlineLatex latex="N = 14\,700\;\text{N}" />. Strekningen er <InlineLatex latex="s = 20\;\text{m}" />.
            </p>
            <p className="mt-2">
              a) Finn arbeidet fra <em>hver</em> kraft. b) Finn det totale arbeidet.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Beregn W = Fs cos φ for hver kraft. Bestem vinkelen mellom kraften og forflytningen for hver.</p>,
          },
          {
            label: "Hint 2",
            content: (
              <p>
                Gravitasjon og normalkraft er vinkelrette på bevegelsen (φ = 90° → cos 90° = 0).
                Friksjon peker motsatt bevegelsen (φ = 180° → cos 180° = −1).
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Arbeid fra hver kraft:</strong></p>
            <FormulaBox latex="W_G = 14\,700 \cdot 20 \cdot \cos 90° = 0" variant="blue" />
            <FormulaBox latex="W_N = 14\,700 \cdot 20 \cdot \cos 90° = 0" variant="blue" />
            <FormulaBox latex="W_T = 5000 \cdot 20 \cdot \cos 36{,}9° = 80\;\text{kJ}" variant="blue" />
            <FormulaBox latex="W_R = 3500 \cdot 20 \cdot \cos 180° = -70\;\text{kJ}" variant="blue" />
            <p><strong>Totalt arbeid:</strong></p>
            <FormulaBox
              latex="W_{\text{tot}} = 0 + 0 + 80 - 70 = \underline{\underline{10\;\text{kJ}}}"
              variant="gold"
            />
            <p className="mt-2">
              <strong>Hva lærte vi?</strong> Gravitasjon og normalkraft gjør null arbeid på horisontal
              forflytning. Beregn arbeid fra alle krefter separat og summer.
            </p>
          </div>
        }
      />

      {/* Eksempel 4: Fart etter arbeid */}
      <ExerciseCard
        number={4}
        title="Arbeid-energi-teoremet — Finn sluttfart"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Fortsettelse av traktoreksempelet: Sledens masse er <InlineLatex latex="m = 1498\;\text{kg}" />,
              startfart er <InlineLatex latex="v_1 = 2{,}0\;\text{m/s}" />, og det totale arbeidet
              er <InlineLatex latex="W_{\text{tot}} = 10\;\text{kJ}" />.
            </p>
            <p className="mt-2">Finn slutthastigheten <InlineLatex latex="v_2" />.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk arbeid-energi-teoremet: <InlineLatex latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2" /></p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Arbeid-energi-teoremet:</strong></p>
            <FormulaBox
              latex="W_{\text{tot}} = \tfrac{1}{2}mv_2^2 - \tfrac{1}{2}mv_1^2 \quad\Rightarrow\quad v_2 = \sqrt{\frac{2W_{\text{tot}}}{m} + v_1^2}"
              variant="blue"
            />
            <FormulaBox
              latex="v_2 = \sqrt{\frac{2 \cdot 10\,000}{1498} + 2{,}0^2} = \sqrt{13{,}35 + 4{,}0} = \sqrt{17{,}35}"
              variant="blue"
            />
            <FormulaBox
              latex="v_2 = \underline{\underline{4{,}2\;\text{m/s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Positivt totalt arbeid gir økt fart. Arbeid-energi-teoremet kobler arbeid direkte til hastighetsendring.</p>
          </div>
        }
      />

      {/* Eksempel 5: Fjærvekt */}
      <ExerciseCard
        number={5}
        title="Fjærkonstant og arbeid — Fjærvekt"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En fjærvekt komprimeres <InlineLatex latex="0{,}01\;\text{m}" /> når et legeme
              med vekt <InlineLatex latex="G = 600\;\text{N}" /> plasseres på den.
            </p>
            <p className="mt-2">a) Finn fjærkonstanten k. b) Finn arbeidet utført ved komprimeringen.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Hookes lov: <InlineLatex latex="F = kx" />, løs for k. Bruk fjær-arbeid-formelen for del b.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Komprimering: <InlineLatex latex="x = 0{,}01\;\text{m}" /></li>
              <li>Vekt: <InlineLatex latex="G = 600\;\text{N}" /></li>
              <li>Fjæren starter i naturlig lengde: <InlineLatex latex="x_1 = 0" /></li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> a) Fjærkonstanten k. b) Arbeidet W ved komprimeringen.</p>
            <p><strong>Strategi:</strong> a) I likevekt balanserer fjærkraften vekten: <InlineLatex latex="kx = G" />, løs for k. b) Arbeidet til en fjær er <InlineLatex latex="W = \tfrac{1}{2}kx^2" /> (fra integrasjon av Hookes lov). Vi bruker dette fordi kraften varierer lineært med komprimering — vi kan IKKE bare bruke W = Fx.</p>
            <p><strong>Løsning:</strong></p>
            <p className="text-sm"><strong>a) Fjærkonstant:</strong></p>
            <FormulaBox
              latex="k = \frac{G}{x} = \frac{600}{0{,}01} = \underline{\underline{6{,}0 \cdot 10^4\;\text{N/m}}}"
              variant="gold"
            />
            <p className="text-sm"><strong>b) Arbeid utført ved komprimering:</strong></p>
            <FormulaBox
              latex="W = \tfrac{1}{2}kx^2 - \tfrac{1}{2}k \cdot 0^2 = \tfrac{1}{2} \cdot 6{,}0 \cdot 10^4 \cdot (0{,}01)^2 = \underline{\underline{3{,}0\;\text{J}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Fjærkonstanten k (N/m) sier hvor stiv fjæren er. Arbeidet vokser med <em>kvadratet</em> av komprimeringen — dobbel komprimering krever fire ganger så mye arbeid. Husk: W = Fx gjelder IKKE for fjærer fordi kraften varierer.</p>
          </div>
        }
      />

      {/* Eksempel 6: Luftputebane */}
      <ExerciseCard
        number={6}
        title="Fjær + friksjon — Luftputebane (kompleks)"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En vogn med masse <InlineLatex latex="m = 0{,}100\;\text{kg}" /> på en luftputebane
              treffer en fjær (<InlineLatex latex="k = 20\;\text{N/m}" />) med
              fart <InlineLatex latex="v_0 = 1{,}5\;\text{m/s}" />. Friksjonstallet
              er <InlineLatex latex="\mu_R = 0{,}47" />.
            </p>
            <p className="mt-2">Hvor langt d komprimeres fjæren før vognen stopper?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk arbeid-energi-teoremet. Summen av arbeid fra fjær og friksjon = endring i kinetisk energi.</p>,
          },
          {
            label: "Hint 2",
            content: (
              <p>
                <InlineLatex latex="\int_0^d (-kx - \mu_R mg)\,dx = 0 - \tfrac{1}{2}mv_0^2" />.
                Dette gir en andregradsligning i d.
              </p>
            ),
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Kraftanalyse:</strong> To krefter gjør arbeid: fjærkraften (−kx) og friksjon (−&mu;<sub>R</sub>mg).</p>
            <FormulaBox
              latex="\int_0^d (-kx - \mu_R mg)\,dx = -\tfrac{1}{2}mv_0^2"
              variant="blue"
            />
            <FormulaBox
              latex="-\tfrac{1}{2}kd^2 - \mu_R mgd = -\tfrac{1}{2}mv_0^2"
              variant="blue"
            />
            <p><strong>Omformer til andregradsligning:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}kd^2 + \mu_R mgd - \tfrac{1}{2}mv_0^2 = 0"
              variant="blue"
            />
            <p>Setter inn tall:</p>
            <FormulaBox
              latex="10d^2 + 0{,}4607d - 0{,}1125 = 0"
              variant="blue"
            />
            <p><strong>Andregradformelen gir:</strong></p>
            <FormulaBox
              latex="d = \frac{-0{,}4607 + \sqrt{0{,}4607^2 + 4 \cdot 10 \cdot 0{,}1125}}{2 \cdot 10} = \underline{\underline{0{,}086\;\text{m}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Den negative løsningen (d = −0,131 m) forkastes fordi avstand er positiv.
            </p>
            <p className="mt-2"><strong>Hva lærte vi?</strong> Kombinasjonsoppgaver med fjær + friksjon gir andregradsligninger. Bruk arbeid-energi-teoremet med integralet for fjærkraften.</p>
          </div>
        }
      />

      {/* Eksempel 7: Effekt — Jetmotor */}
      <ExerciseCard
        number={7}
        title="Effekt — Jetmotor"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En jetmotor gir en skyvekraft på <InlineLatex latex="F = 197\,000\;\text{N}" />.
              Flyet flyr med konstant fart <InlineLatex latex="v = 250\;\text{m/s}" />.
            </p>
            <p className="mt-2">Hva er motorens effekt?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Bruk <InlineLatex latex="P = F \cdot v" /> når kraften er parallell med hastigheten.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Skyvekraft: <InlineLatex latex="F = 197\,000\;\text{N}" /></li>
              <li>Konstant fart: <InlineLatex latex="v = 250\;\text{m/s}" /></li>
              <li>Kraften er parallell med hastigheten (fly i rettlinjet bane)</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Motorens effekt P.</p>
            <p><strong>Strategi:</strong> Effekt er arbeid per tid: <InlineLatex latex="P = W/t" />. Når kraften er konstant og parallell med hastigheten, får vi den nyttige snarveien <InlineLatex latex="P = Fv" />. Utledning: <InlineLatex latex="P = W/t = Fs/t = Fv" />.</p>
            <p><strong>Løsning:</strong></p>
            <FormulaBox
              latex="P = F \cdot v = 197\,000 \cdot 250 = 4{,}93 \cdot 10^7\;\text{W}"
              variant="blue"
            />
            <FormulaBox
              latex="P = \underline{\underline{49{,}3\;\text{MW}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> <InlineLatex latex="P = Fv" /> er en snarvei som unngår å beregne arbeid og tid separat. Merk: Konstant fart betyr at skyvekraften balanserer luftmotstanden — nettokraften er null, men motoren gjør likevel arbeid!</p>
          </div>
        }
      />

      {/* Eksempel 8: Effekt — Løper */}
      <ExerciseCard
        number={8}
        title="Effekt — Løper opp trapper"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En løper (masse <InlineLatex latex="m = 50\;\text{kg}" />) løper opp en høyde
              på <InlineLatex latex="h = 443\;\text{m}" /> på <InlineLatex latex="t = 15\;\text{min}" />.
            </p>
            <p className="mt-2">Finn gjennomsnittlig effekt.</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Arbeidet er ekvivalent med å løfte massen opp h meter: <InlineLatex latex="W = mgh" />.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 50\;\text{kg}" /></li>
              <li>Høyde: <InlineLatex latex="h = 443\;\text{m}" /></li>
              <li>Tid: <InlineLatex latex="t = 15\;\text{min} = 900\;\text{s}" /></li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Gjennomsnittlig effekt P.</p>
            <p><strong>Strategi:</strong> Effekt er arbeid per tid: <InlineLatex latex="P = W/t" />. Arbeidet som kreves for å løfte en masse h meter er <InlineLatex latex="W = mgh" /> (arbeid mot tyngdekraften). Vi bruker gjennomsnittlig effekt fordi farten varierer underveis.</p>
            <p><strong>Løsning:</strong></p>
            <p className="text-sm"><strong>Steg 1:</strong> Beregn arbeidet (mot tyngden):</p>
            <FormulaBox
              latex="W = mgh = 50 \cdot 9{,}81 \cdot 443 = 2{,}17 \cdot 10^5\;\text{J} = 217\;\text{kJ}"
              variant="blue"
            />
            <p className="text-sm"><strong>Steg 2:</strong> Konverter tid og finn effekt:</p>
            <FormulaBox
              latex="t = 15\;\text{min} = 15 \cdot 60 = 900\;\text{s}"
              variant="blue"
            />
            <FormulaBox
              latex="\bar{P} = \frac{W}{t} = \frac{217\,000}{900} = \underline{\underline{241\;\text{W}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> For bevegelse oppover kan arbeidet beregnes som mgh — kun den vertikale høyden teller, ikke veien langs trappen. Husk å konvertere tid til sekunder! 241 W tilsvarer omtrent ⅓ hestekraft — imponerende for et menneske over 15 minutter.</p>
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
          <p className="text-xs text-[var(--muted)]">Oblig 2, oppgave 2</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 6</p>
        </Link>
      </div>
    </div>
  );
}
