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
          <div className="space-y-3">
            <p><strong>FBD:</strong> N (normalt ut fra planet), G = mg (loddrett ned). Dekomponer G:</p>
            <FormulaBox latex="\sum F_y = 0: \quad N - mg\cos\alpha = 0 \;\Rightarrow\; \underline{\underline{N = mg\cos\alpha}}" variant="gold" />
            <FormulaBox latex="\sum F_x = ma: \quad mg\sin\alpha = ma \;\Rightarrow\; \underline{\underline{a = g\sin\alpha}}" variant="gold" />
            <p className="text-sm"><strong>Hva lærte vi?</strong> Akselerasjonen på friksjonsløst skråplan avhenger kun av vinkelen, ikke av massen! (Galileo visste dette.)</p>
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
          <div className="space-y-3">
            <p><strong>FBD for kloss (horisontalt):</strong></p>
            <FormulaBox latex="\sum F_x = m_1 a: \quad S = m_1 a" variant="blue" />

            <p><strong>FBD for lodd (vertikalt, + nedover):</strong></p>
            <FormulaBox latex="\sum F_y = m_2 a: \quad m_2 g - S = m_2 a" variant="blue" />

            <p><strong>Eliminer S:</strong></p>
            <FormulaBox latex="m_2 g - m_1 a = m_2 a \;\Rightarrow\; m_2 g = a(m_1 + m_2)" variant="blue" />
            <FormulaBox latex="\underline{\underline{a = \frac{m_2 g}{m_1 + m_2}}}" variant="gold" />
            <FormulaBox latex="\underline{\underline{S = \frac{m_1 m_2 g}{m_1 + m_2}}}" variant="gold" />
            <p className="text-sm"><strong>Sjekk grenseverdier:</strong> Hvis m₂ → 0: a → 0, S → 0. Hvis m₁ → 0: a → g, S → 0 (loddet faller fritt). Rimelig! ✓</p>
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
          <div className="space-y-3">
            <p><strong>a) N = mg = 500 N</strong> (flatt underlag, ingen vertikale ekstra-krefter).</p>
            <p className="text-sm"><strong>Statisk:</strong> Kassen løsner ved F = 230 N → R_max = 230 N.</p>
            <FormulaBox latex="\mu_s = \frac{R_s}{N} = \frac{230}{500} = \underline{\underline{0{,}46}}" variant="gold" />

            <p className="text-sm"><strong>Kinetisk:</strong> Glir med konstant fart ved F = 200 N → R_k = F = 200 N.</p>
            <FormulaBox latex="\mu_k = \frac{R_k}{N} = \frac{200}{500} = \underline{\underline{0{,}40}}" variant="gold" />

            <p><strong>b) Ved F = 50 N (i ro):</strong></p>
            <p className="text-sm">Kassen er i ro → likevekt: R = F = <strong>50 N</strong>.</p>
            <p className="text-sm">Friksjonen tilpasser seg den påførte kraften (R ≤ μsN = 230 N). Den er IKKE 230 N!</p>
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
          <div className="space-y-3">
            <p><strong>a) Likevekt (konstant fart):</strong></p>
            <FormulaBox latex="\sum F_y = 0: \quad N + F\sin 30° - mg = 0 \;\Rightarrow\; N = mg - F\sin 30°" variant="blue" />
            <FormulaBox latex="\sum F_x = 0: \quad F\cos 30° - \mu_k N = 0" variant="blue" />
            <p className="text-sm">Sett inn N:</p>
            <FormulaBox latex="F\cos 30° - \mu_k(mg - F\sin 30°) = 0" variant="blue" />
            <FormulaBox latex="F(\cos 30° + \mu_k\sin 30°) = \mu_k mg" variant="blue" />
            <FormulaBox latex="F = \frac{\mu_k mg}{\cos 30° + \mu_k \sin 30°} = \frac{0{,}40 \cdot 500}{0{,}866 + 0{,}40 \cdot 0{,}5} = \underline{\underline{188\;\text{N}}}" variant="gold" />

            <p><strong>b) Optimal vinkel (minst kraft):</strong></p>
            <FormulaBox latex="F(\alpha) = \frac{\mu_k mg}{\cos\alpha + \mu_k\sin\alpha}" variant="blue" />
            <p className="text-sm">Minimiser F → maksimer nevneren. Derivere og sett = 0:</p>
            <FormulaBox latex="-\sin\alpha + \mu_k\cos\alpha = 0 \;\Rightarrow\; \alpha = \tan^{-1}(\mu_k) = \tan^{-1}(0{,}40) = \underline{\underline{21{,}8°}}" variant="gold" />
            <FormulaBox latex="F(21{,}8°) = \underline{\underline{186\;\text{N}}}" variant="gold" />
            <p className="text-sm"><strong>Hva lærte vi?</strong> Det er lettere å dra i en vinkel enn horisontalt! Komponenten oppover avlaster normalkraften, som reduserer friksjonen.</p>
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
          <div className="space-y-3">
            <p><strong>Finn banefarten:</strong></p>
            <FormulaBox latex="v = \frac{s}{T} = \frac{5 \cdot 2\pi R}{60} = \frac{5 \cdot 2\pi \cdot 5{,}00}{60} = 2{,}62\;\text{m/s}" variant="blue" />

            <p><strong>Sentripetalkraft = snordrag (horisontalsirkel):</strong></p>
            <FormulaBox latex="\sum F = m\frac{v^2}{R} = 2{,}5 \cdot \frac{2{,}62^2}{5{,}00} = \underline{\underline{3{,}4\;\text{N}}}" variant="gold" />
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
          <div className="space-y-3">
            <p><strong>a) Konstant fart → ΣFx = 0:</strong></p>
            <FormulaBox latex="mg\sin\alpha - R = 0, \quad R = \mu_k N = \mu_k mg\cos\alpha" variant="blue" />
            <FormulaBox latex="mg\sin\alpha = \mu_k mg\cos\alpha \;\Rightarrow\; \frac{\sin\alpha}{\cos\alpha} = \mu_k" variant="blue" />
            <FormulaBox latex="\underline{\underline{\alpha = \tan^{-1}(\mu_k)}}" variant="gold" />

            <p><strong>b) Brattere (akselererer):</strong></p>
            <FormulaBox latex="mg\sin\alpha - \mu_k mg\cos\alpha = ma" variant="blue" />
            <FormulaBox latex="\underline{\underline{a = g(\sin\alpha - \mu_k\cos\alpha)}}" variant="gold" />
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
          <div className="space-y-3">
            <p><strong>Sentripetalakselerasjon:</strong></p>
            <FormulaBox latex="a_\perp = \frac{v^2}{r} = \frac{100^2}{500} = 20{,}0\;\text{m/s}^2" variant="blue" />

            <p><strong>Topp (N og G begge mot sentrum = nedover):</strong></p>
            <FormulaBox latex="N + mg = m\frac{v^2}{r} \;\Rightarrow\; N = m\left(\frac{v^2}{r} - g\right) = 80(20{,}0 - 9{,}81) = \underline{\underline{815\;\text{N}}}" variant="gold" />

            <p><strong>Bunn (N opp, G ned, sentrum oppover):</strong></p>
            <FormulaBox latex="N - mg = m\frac{v^2}{r} \;\Rightarrow\; N = m\left(\frac{v^2}{r} + g\right) = 80(20{,}0 + 9{,}81) = \underline{\underline{2{,}38\;\text{kN}}}" variant="gold" />

            <p><strong>b) Mister kontakt i topp (N = 0):</strong></p>
            <FormulaBox latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 500} = \underline{\underline{70{,}0\;\text{m/s}}}" variant="gold" />
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
          <div className="space-y-3">
            <p><strong>c) Kulependel:</strong> Snoren danner vinkel 10° med loddlinjen.</p>
            <FormulaBox latex="g\tan\alpha = \frac{v^2}{r} \;\Rightarrow\; r = \frac{v^2}{g\tan\alpha} = \frac{19{,}44^2}{9{,}81\cdot\tan 10°} = \underline{\underline{219\;\text{m}}}" variant="gold" />

            <p><strong>d) Friksjon gir sentripetalkraft:</strong></p>
            <FormulaBox latex="\mu_s mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{\mu_s g r} = \sqrt{0{,}80 \cdot 9{,}81 \cdot 219} = 41{,}5\;\text{m/s} = \underline{\underline{149\;\text{km/h}}}" variant="gold" />
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
          <div className="space-y-3">
            <p><strong>FBD:</strong> F (vaier, 25° over horisontalen), N (opp), mg (ned), R = μN (horisontalt bakover).</p>

            <p><strong>a) Likevekt (konstant fart):</strong></p>
            <FormulaBox latex="\sum F_y = 0: \quad N + F\sin 25° - mg = 0 \;\Rightarrow\; N = mg - F\sin 25°" variant="blue" />
            <FormulaBox latex="\sum F_x = 0: \quad F\cos 25° - \mu_k N = 0" variant="blue" />
            <p className="text-sm">Sett inn N:</p>
            <FormulaBox latex="F\cos 25° = \mu_k(mg - F\sin 25°)" variant="blue" />
            <FormulaBox latex="F(\cos 25° + \mu_k\sin 25°) = \mu_k mg" variant="blue" />
            <FormulaBox latex="F = \frac{0{,}65 \cdot 1000 \cdot 9{,}81}{0{,}906 + 0{,}65 \cdot 0{,}423} = \frac{6377}{1{,}181} = \underline{\underline{5{,}4\;\text{kN}}}" variant="gold" />
            <FormulaBox latex="W_F = Fs\cos 25° = 5400 \cdot 15 \cdot \cos 25° = \underline{\underline{73\;\text{kJ}}}" variant="gold" />

            <p><strong>b) Friksjonskraftens arbeid:</strong></p>
            <FormulaBox latex="N = mg - F\sin 25° = 9810 - 5400 \cdot 0{,}423 = 7527\;\text{N}" variant="blue" />
            <FormulaBox latex="R = \mu_k N = 0{,}65 \cdot 7527 = 4893\;\text{N}" variant="blue" />
            <FormulaBox latex="W_R = -Rs = -4893 \cdot 15 = \underline{\underline{-73\;\text{kJ}}}" variant="gold" />
            <p className="text-sm">Arbeidet fra friksjon er negativt og like stort som krabibliens arbeid (logisk — konstant fart → ΔK = 0).</p>

            <p><strong>c) Optimal vinkel:</strong></p>
            <FormulaBox latex="\alpha_{\text{opt}} = \tan^{-1}(\mu_k) = \tan^{-1}(0{,}65) = \underline{\underline{33°}}" variant="gold" />

            <p><strong>d) Etter vaieren ryker:</strong></p>
            <p className="text-sm">Eneste horisontale kraft er friksjon. N = mg (ingen vertikal komponent lenger).</p>
            <FormulaBox latex="a = -\mu_k g = -0{,}65 \cdot 9{,}81 = -6{,}4\;\text{m/s}^2" variant="blue" />
            <FormulaBox latex="v^2 = v_0^2 + 2as \;\Rightarrow\; s = \frac{0 - 2{,}5^2}{2(-6{,}4)} = \underline{\underline{0{,}49\;\text{m}}}" variant="gold" />
            <p className="text-sm"><strong>Hva lærte vi?</strong> Denne oppgaven kombinerer alt fra kap. 5: FBD, friksjon, skrå kraft, optimal vinkel (derivasjon), og kinematikk etter kraftbortfall.</p>
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
          <div className="space-y-3">
            <p><strong>Topp (sentrum under passasjeren):</strong></p>
            <FormulaBox latex="mg - N = m\frac{v^2}{r} \;\Rightarrow\; N = mg - m\frac{v^2}{r} = 60\left(9{,}81 - \frac{25}{8}\right) = \underline{\underline{401\;\text{N}}}" variant="gold" />

            <p><strong>Bunn (sentrum over passasjeren):</strong></p>
            <FormulaBox latex="N - mg = m\frac{v^2}{r} \;\Rightarrow\; N = mg + m\frac{v^2}{r} = 60\left(9{,}81 + \frac{25}{8}\right) = \underline{\underline{776\;\text{N}}}" variant="gold" />

            <p><strong>b) Mister kontakt i topp (N = 0):</strong></p>
            <FormulaBox latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 8} = \underline{\underline{8{,}9\;\text{m/s}}}" variant="gold" />
            <p className="text-sm">Over denne farten ville passasjeren &ldquo;sveve&rdquo; i toppunktet.</p>
          </div>
        }
      />
    </div>
  );
}
