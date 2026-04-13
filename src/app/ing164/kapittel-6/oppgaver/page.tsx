"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-bold mt-2 mb-4">Oppgavestrategier</h3>

      <div className="space-y-4 mb-10">
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

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-bold mt-10 mb-4">Gjennomgåtte eksempler</h3>

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

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-bold mt-10 mb-4">Øvingsoppgaver</h3>

      {/* Oblig: Skitrekk */}
      <ExerciseCard
        number={1}
        title="Skitrekk — Arbeid, effekt og energi"
        difficulty="middels"
        source="Oblig 2"
        problem={
          <div>
            <p>
              Et skitrekk drar skiløpere opp en <InlineLatex latex="250\;\text{m}" /> lang bakke
              med helning <InlineLatex latex="25°" />. Tauet beveger seg med fart <InlineLatex latex="10\;\text{km/h}" />.
              Vi ser bort fra friksjon.
            </p>
            <p className="mt-2">
              a) Hvor stort arbeid utfører tauet på en skiløper med masse <InlineLatex latex="80{,}0\;\text{kg}" />?<br />
              b) Motoren må kunne dra 60 skiløpere samtidig. Hvor stor effekt må motoren yte?
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Taudraget må balansere tyngdekomponenten langs skråplanet: <InlineLatex latex="T = mg\sin 25°" /></p>,
          },
          {
            label: "Hint 2",
            content: <p>Effekt: <InlineLatex latex="P = T \cdot v" />. Husk å konvertere km/h til m/s.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Arbeid fra tauet:</strong></p>
            <FormulaBox
              latex="T = mg\sin 25° = 80{,}0 \cdot 9{,}81 \cdot \sin 25° = 331{,}5\;\text{N}"
              variant="blue"
            />
            <FormulaBox
              latex="W = T \cdot s = 331{,}5 \cdot 250 = \underline{\underline{82{,}9\;\text{kJ}}}"
              variant="gold"
            />

            <p><strong>b) Effekt for 60 skiløpere:</strong></p>
            <FormulaBox
              latex="v = \frac{10}{3{,}6} = 2{,}78\;\text{m/s}"
              variant="blue"
            />
            <FormulaBox
              latex="P = 60 \cdot T \cdot v = 60 \cdot 331{,}5 \cdot 2{,}78 = \underline{\underline{55{,}3\;\text{kW}}}"
              variant="gold"
            />

            <p className="mt-2"><strong>Hva lærte vi?</strong> For skråplan uten friksjon er trekkraften mg sin &theta;. P = Fv gir motoreffekten direkte.</p>
          </div>
        }
      />

      {/* Øving: Bremsekloss */}
      <ExerciseCard
        number={2}
        title="Bremsekloss på horisontal flate"
        difficulty="middels"
        source="Øving"
        problem={
          <div>
            <p>
              En kloss med masse <InlineLatex latex="m = 5{,}0\;\text{kg}" /> glir med
              startfart <InlineLatex latex="v_1 = 8{,}0\;\text{m/s}" /> på en horisontal
              flate. Friksjonstallet er <InlineLatex latex="\mu_R = 0{,}30" />.
            </p>
            <p className="mt-2">a) Hvor langt glir klossen før den stopper? b) Hva er gjennomsnittlig effekt avsatt av friksjon?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Friksjon er eneste kraft som gjør arbeid: <InlineLatex latex="W_R = -\mu_R mg \cdot d" /></p>,
          },
          {
            label: "Hint 2",
            content: <p>Arbeid-energi: <InlineLatex latex="-\mu_R mg d = 0 - \tfrac{1}{2}mv_1^2" />, løs for d.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 5{,}0\;\text{kg}" /></li>
              <li>Startfart: <InlineLatex latex="v_1 = 8{,}0\;\text{m/s}" /></li>
              <li>Sluttfart: <InlineLatex latex="v_2 = 0" /> (stopper)</li>
              <li>Friksjonstall: <InlineLatex latex="\mu_R = 0{,}30" /></li>
              <li>Horisontal flate (tyngde og normalkraft gjør null arbeid)</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> a) Bremselengde d. b) Gjennomsnittlig effekt fra friksjon.</p>
            <p><strong>Strategi:</strong> Friksjon er den eneste kraften som gjør arbeid (horisontal forflytning → tyngde og normalkraft er vinkelrette). Vi bruker arbeid-energi-teoremet: <InlineLatex latex="W_R = \Delta E_K" />. For del b trenger vi tiden, som vi finner via kinematikk.</p>
            <p><strong>Løsning:</strong></p>
            <p className="text-sm"><strong>a) Bremselengde:</strong></p>
            <FormulaBox
              latex="W_R = \Delta E_K \;\Rightarrow\; -\mu_R mg d = 0 - \tfrac{1}{2}mv_1^2"
              variant="blue"
            />
            <p className="text-sm">Massen kansellerer:</p>
            <FormulaBox
              latex="d = \frac{v_1^2}{2\mu_R g} = \frac{8{,}0^2}{2 \cdot 0{,}30 \cdot 9{,}81} = \frac{64}{5{,}886} = \underline{\underline{10{,}9\;\text{m}}}"
              variant="gold"
            />
            <p className="text-sm"><strong>b) Tid og effekt:</strong></p>
            <FormulaBox
              latex="a = -\mu_R g = -0{,}30 \cdot 9{,}81 = -2{,}94\;\text{m/s}^2"
              variant="blue"
            />
            <FormulaBox
              latex="t = \frac{v_1}{|a|} = \frac{8{,}0}{2{,}94} = 2{,}72\;\text{s}"
              variant="blue"
            />
            <FormulaBox
              latex="\bar{P} = \frac{|W_R|}{t} = \frac{\tfrac{1}{2} \cdot 5{,}0 \cdot 8{,}0^2}{2{,}72} = \frac{160}{2{,}72} = \underline{\underline{58{,}8\;\text{W}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Bremselengden <InlineLatex latex="d = v^2/(2\mu g)" /> avhenger ikke av massen — en lett og en tung kloss med samme fart og friksjon stopper etter like lang strekning. Denne formelen er nyttig for bremsing generelt.</p>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Fjær skyter kloss opp skråplan"
        difficulty="vanskelig"
        source="Øving"
        problem={
          <div>
            <p>
              En fjær med <InlineLatex latex="k = 800\;\text{N/m}" /> er komprimert <InlineLatex latex="x = 0{,}10\;\text{m}" />.
              Den skyter en kloss (<InlineLatex latex="m = 0{,}50\;\text{kg}" />) opp et friksjonsfritt
              skråplan med helning <InlineLatex latex="30°" />.
            </p>
            <p className="mt-2">Hvor langt opp skråplanet kommer klossen?</p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>All fjærenergi overføres til kinetisk energi, som deretter omgjøres til potensiell energi opp skråplanet.</p>,
          },
          {
            label: "Hint 2",
            content: <p><InlineLatex latex="\tfrac{1}{2}kx^2 = mgs\sin 30°" />, løs for s.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Fjærkonstant: <InlineLatex latex="k = 800\;\text{N/m}" /></li>
              <li>Komprimering: <InlineLatex latex="x = 0{,}10\;\text{m}" /></li>
              <li>Masse: <InlineLatex latex="m = 0{,}50\;\text{kg}" /></li>
              <li>Helning: <InlineLatex latex="\theta = 30°" /></li>
              <li>Friksjonsfritt. Start og slutt: v = 0.</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> Avstand s opp skråplanet.</p>
            <p><strong>Strategi:</strong> All elastisk potensiell energi i fjæren omgjøres til gravitasjonell potensiell energi. Energibevaring: <InlineLatex latex="\tfrac{1}{2}kx^2 = mgh = mgs\sin\theta" />. Vi bruker energi i stedet for krefter fordi fjærkraften varierer med posisjon.</p>
            <p><strong>Løsning:</strong></p>
            <FormulaBox
              latex="\tfrac{1}{2}kx^2 = mgs\sin\theta"
              variant="blue"
            />
            <p className="text-sm">Løser for s:</p>
            <FormulaBox
              latex="s = \frac{kx^2}{2mg\sin\theta} = \frac{800 \cdot 0{,}10^2}{2 \cdot 0{,}50 \cdot 9{,}81 \cdot \sin 30°}"
              variant="blue"
            />
            <FormulaBox
              latex="s = \frac{8{,}0}{4{,}905} = \underline{\underline{1{,}63\;\text{m}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Fjærenergi <InlineLatex latex="\tfrac{1}{2}kx^2" /> fungerer som en «energipakke» som kan omgjøres til kinetisk eller potensiell energi. På skråplan er høyden <InlineLatex latex="h = s\sin\theta" /> — husk at det er den vertikale høyden som bestemmer potensiell energi, ikke buelengden.</p>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-bold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 mb-6">
        <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Eksamenstips</p>
        <p className="text-sm">
          Arbeid-energi-teoremet er et av de mest brukte verktøyene på eksamen. Det kombinerer
          ofte med friksjon, skråplan og effekt. Vis ALLTID utregning av arbeid fra hver kraft separat.
        </p>
      </div>

      {/* Eksamen: Bil bremser */}
      <ExerciseCard
        number={1}
        title="Bil bremser — Friksjonskraft og bremsetid"
        difficulty="middels"
        source="Eksamen H2023"
        problem={
          <div>
            <p>
              En bil med masse <InlineLatex latex="1500\;\text{kg}" /> kjører med
              fart <InlineLatex latex="72\;\text{km/h}" /> og stanser etter <InlineLatex latex="50\;\text{m}" /> på
              en horisontal vei. Motoren er koblet ut.
            </p>
            <p className="mt-2">
              a) Hvor stor har friksjonskraften vært?<br />
              b) Hvor lang tid tok nedbremsingen?
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Konverter: <InlineLatex latex="72\;\text{km/h} = 20\;\text{m/s}" />. Bruk arbeid-energi-teoremet.</p>,
          },
          {
            label: "Hint 2",
            content: <p><InlineLatex latex="W_R = \Delta E_K = 0 - \tfrac{1}{2}mv_0^2" />, og <InlineLatex latex="W_R = -R \cdot s" /></p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong></p>
            <ul className="list-disc list-inside text-sm">
              <li>Masse: <InlineLatex latex="m = 1500\;\text{kg}" /></li>
              <li>Startfart: <InlineLatex latex="v_0 = 72\;\text{km/h} = 20\;\text{m/s}" /></li>
              <li>Sluttfart: <InlineLatex latex="v = 0" /></li>
              <li>Bremsestrekning: <InlineLatex latex="s = 50\;\text{m}" /></li>
              <li>Horisontal vei, motor koblet ut</li>
            </ul>
            <p><strong>Hva skal vi finne?</strong> a) Friksjonskraften R. b) Bremsetid t.</p>
            <p><strong>Strategi:</strong> a) Friksjon er den eneste kraften som gjør arbeid. Arbeid-energi-teoremet gir <InlineLatex latex="W_R = \Delta E_K" />. b) For tid bruker vi kinematikk med gjennomsnittsfart (konstant retardasjon).</p>
            <p><strong>Løsning:</strong></p>
            <p className="text-sm"><strong>a) Friksjonskraft via arbeid-energi-teoremet:</strong></p>
            <FormulaBox
              latex="W_R = \Delta E_K = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mv_0^2 = 0 - \tfrac{1}{2} \cdot 1500 \cdot 20^2 = -300\;\text{kJ}"
              variant="blue"
            />
            <p className="text-sm">Friksjonens arbeid er også <InlineLatex latex="W_R = -R \cdot s" />, så:</p>
            <FormulaBox
              latex="R = \frac{|W_R|}{s} = \frac{300\,000}{50} = \underline{\underline{6{,}0\;\text{kN}}}"
              variant="gold"
            />
            <p className="text-sm"><strong>b) Bremsetid (kinematikk med konstant retardasjon):</strong></p>
            <FormulaBox
              latex="s = \tfrac{1}{2}(v_0 + v)t \;\Rightarrow\; t = \frac{2s}{v_0 + v} = \frac{2 \cdot 50}{20 + 0} = \underline{\underline{5{,}0\;\text{s}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Arbeid-energi-teoremet gir friksjonskraften uten å trenge akselerasjonen. Begge metoder (kinematikk og energi) gir same svar, men energimetoden er ofte raskere. Husk å konvertere km/h → m/s (del på 3,6)!</p>
          </div>
        }
      />

      {/* Eksamen: Kranbil */}
      <ExerciseCard
        number={2}
        title="Kranbil sleper container — Arbeid, friksjon og optimal vinkel"
        difficulty="vanskelig"
        source="Eksamen V2023"
        problem={
          <div>
            <p>
              En kranbil sleper en container (<InlineLatex latex="m = 1000\;\text{kg}" />) langs
              horisontal bakke med <strong>konstant fart</strong>. Glidefriksjonstall <InlineLatex latex="\mu = 0{,}65" />,
              vaiervinkel <InlineLatex latex="\alpha = 25°" />.
            </p>
            <p className="mt-2">
              a) Finn snordraget F og arbeidet over <InlineLatex latex="s = 15\;\text{m}" />.<br />
              b) Finn arbeidet gjort av friksjon.<br />
              c) Hvilken vinkel gir minst snordrag?<br />
              d) Vaieren ryker ved <InlineLatex latex="v = 2{,}5\;\text{m/s}" />. Finn bremselengden.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>Konstant fart → &Sigma;F = 0. Sett opp likevekt i x og y. Vaieren drar oppover i vinkel &alpha;, så N &ne; mg.</p>,
          },
          {
            label: "Hint 2",
            content: <p>N = mg − F sin &alpha;. Friksjon R = &mu;N. Likevekt i x: F cos &alpha; = &mu;N.</p>,
          },
          {
            label: "Hint 3",
            content: <p>For optimal vinkel: Derivér nevneren i F-uttrykket og sett lik null. Du får tan &alpha; = &mu;.</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Snordrag og arbeid:</strong></p>
            <p className="text-sm">Konstant fart → &Sigma;F = 0:</p>
            <FormulaBox
              latex="\Sigma F_y = 0: \; N + F\sin\alpha - mg = 0 \;\Rightarrow\; N = mg - F\sin\alpha"
              variant="blue"
            />
            <FormulaBox
              latex="\Sigma F_x = 0: \; F\cos\alpha - \mu N = 0 \;\Rightarrow\; F\cos\alpha = \mu(mg - F\sin\alpha)"
              variant="blue"
            />
            <FormulaBox
              latex="F = \frac{\mu mg}{\cos\alpha + \mu\sin\alpha} = \frac{0{,}65 \cdot 1000 \cdot 9{,}81}{\cos 25° + 0{,}65 \cdot \sin 25°} = \underline{\underline{5{,}4\;\text{kN}}}"
              variant="gold"
            />
            <FormulaBox
              latex="W_F = F \cdot s \cdot \cos 25° = 5400 \cdot 15 \cdot \cos 25° = \underline{\underline{73\;\text{kJ}}}"
              variant="gold"
            />

            <p><strong>b) Friksjonens arbeid:</strong></p>
            <FormulaBox
              latex="R = \mu(mg - F\sin\alpha) = 0{,}65(9810 - 5400 \cdot \sin 25°) = 4{,}9\;\text{kN}"
              variant="blue"
            />
            <FormulaBox
              latex="W_R = -R \cdot s = -4900 \cdot 15 = \underline{\underline{-73\;\text{kJ}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">Merk: |W<sub>F</sub>| = |W<sub>R</sub>| fordi farten er konstant (W<sub>tot</sub> = 0).</p>

            <p><strong>c) Optimal vinkel (minst snordrag):</strong></p>
            <FormulaBox
              latex="\frac{d}{d\alpha}(\cos\alpha + \mu\sin\alpha) = 0 \;\Rightarrow\; \tan\alpha = \mu"
              variant="blue"
            />
            <FormulaBox
              latex="\alpha = \arctan(0{,}65) = \underline{\underline{33°}}"
              variant="gold"
            />

            <p><strong>d) Bremselengde etter vaieren ryker:</strong></p>
            <FormulaBox
              latex="a = -\mu g = -0{,}65 \cdot 9{,}81 = -6{,}4\;\text{m/s}^2"
              variant="blue"
            />
            <FormulaBox
              latex="s = \frac{v^2}{2\mu g} = \frac{2{,}5^2}{2 \cdot 0{,}65 \cdot 9{,}81} = \underline{\underline{0{,}49\;\text{m}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Når farten er konstant er totalt arbeid null. Optimal vinkel for minst snordrag er arctan(&mu;) — en klassiker!</p>
          </div>
        }
      />

      {/* Eksamen: Skiløper ned bakken */}
      <ExerciseCard
        number={3}
        title="Skiløper ned bakke — Energi og friksjon"
        difficulty="middels"
        source="Oblig 2"
        problem={
          <div>
            <p>
              Fortsettelse av skitrekk-oppgaven: En skiløper (<InlineLatex latex="m = 80{,}0\;\text{kg}" />)
              starter fra toppen av en <InlineLatex latex="250\;\text{m}" /> lang bakke
              med <InlineLatex latex="25°" /> helning, med startfart 0.
            </p>
            <p className="mt-2">
              c) Uten friksjon — finn farten i bunnen.<br />
              d) Med friksjon hadde farten bare blitt <InlineLatex latex="50\;\text{km/h}" />. Finn arbeidet gjort av friksjon.
            </p>
          </div>
        }
        hints={[
          {
            label: "Hint 1",
            content: <p>c) Bruk energibevaring: <InlineLatex latex="\tfrac{1}{2}mv^2 = mgs\sin\theta" />.</p>,
          },
          {
            label: "Hint 2",
            content: <p>d) <InlineLatex latex="W_R = \tfrac{1}{2}mv^2 - mgs\sin\theta" /> (diff mellom faktisk og maks E<sub>K</sub>).</p>,
          },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>c) Uten friksjon:</strong></p>
            <FormulaBox
              latex="v = \sqrt{2gs\sin\theta} = \sqrt{2 \cdot 9{,}81 \cdot 250 \cdot \sin 25°} = \underline{\underline{45{,}5\;\text{m/s} = 164\;\text{km/h}}}"
              variant="gold"
            />

            <p><strong>d) Friksjonens arbeid:</strong></p>
            <FormulaBox
              latex="v = 50\;\text{km/h} = 13{,}9\;\text{m/s}"
              variant="blue"
            />
            <FormulaBox
              latex="W_R = \tfrac{1}{2}mv^2 - mgs\sin\theta = \tfrac{1}{2} \cdot 80 \cdot 13{,}9^2 - 80 \cdot 9{,}81 \cdot 250 \cdot \sin 25° "
              variant="blue"
            />
            <FormulaBox
              latex="W_R = 7\,728 - 82\,929 = \underline{\underline{-75{,}2\;\text{kJ}}}"
              variant="gold"
            />
            <p className="text-sm text-[var(--muted)]">
              Friksjon og luftmotstand har fjernet 75,2 kJ av den potensielle energien.
            </p>
          </div>
        }
      />
    </div>
  );
}
