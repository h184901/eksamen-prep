"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>

      {/* ══════════════════════════════════════════════
          OPPGAVESTRATEGIER
          ══════════════════════════════════════════════ */}
      <h3 className="text-xl font-bold mt-6 mb-4">Oppgavestrategier</h3>

      <div className="space-y-6 mb-10">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Faradays lov (29.2)</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Identifiser hva som endres: B, A, eller φ?</li>
            <li><strong>2.</strong> Skriv opp <InlineLatex latex="\Phi_B = NBA\cos\varphi" /> med riktige verdier.</li>
            <li><strong>3.</strong> Deriver: <InlineLatex latex="\mathcal{E} = -d\Phi_B/dt" /></li>
            <li><strong>4.</strong> For konstant dB/dt: <InlineLatex latex="\mathcal{E} = -NA\cos\varphi \cdot dB/dt" /></li>
            <li><strong>5.</strong> For konstant endring i areal: <InlineLatex latex="\mathcal{E} = -NB\cos\varphi \cdot dA/dt" /></li>
            <li><strong>6.</strong> Bruk Ohms lov for strøm: <InlineLatex latex="I = |\mathcal{E}|/R" /></li>
          </ol>
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Vanlig feil:</p>
            <p className="text-sm">Glemmer cos φ! Hvis B ikke er vinkelrett på sløyfen (φ ≠ 0°), må du ta med cos φ-faktoren.</p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Lenz&apos; lov — Bestemme strømretning (29.3)</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Bestem retningen på B-feltet gjennom sløyfen.</li>
            <li><strong>2.</strong> Bestem om fluksen <em>øker</em> eller <em>minker</em>.</li>
            <li><strong>3.</strong> Indusert strøm lager et felt som <em>motvirker</em> endringen:
              <ul className="ml-4 mt-1">
                <li>• Øker → indusert B-felt i <em>motsatt</em> retning</li>
                <li>• Minker → indusert B-felt i <em>samme</em> retning</li>
              </ul>
            </li>
            <li><strong>4.</strong> Bruk høyrehåndsregelen for å finne strømretningen som gir riktig B-felt.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold text-lg mb-3">Strategi: Leder i bevegelse (29.4)</h3>
          <ol className="space-y-2 text-sm">
            <li><strong>1.</strong> Identifiser: Hva beveger seg? Hva er B-feltet?</li>
            <li><strong>2.</strong> For rett stav: <InlineLatex latex="\mathcal{E} = vBL" /> direkte.</li>
            <li><strong>3.</strong> For roterende system: bruk <InlineLatex latex="\mathcal{E} = \oint(\vec{v}\times\vec{B})\cdot d\vec{l}" /> eller Faradays lov.</li>
            <li><strong>4.</strong> Finn strøm, kraft, effekt etter behov.</li>
            <li><strong>5.</strong> <strong>Energisjekk:</strong> Effekten tilført for å bevege lederen = effekten dissipert i R.</li>
          </ol>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          GJENNOMGÅTTE EKSEMPLER
          ══════════════════════════════════════════════ */}
      <h3 className="text-xl font-bold mt-10 mb-4">Gjennomgåtte eksempler</h3>

      {/* Eksempel 1: Enkel Faraday — fra forelesning */}
      <ExerciseCard
        number={1}
        title="Indusert EMF fra varierende magnetfelt"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              Et magnetfelt varierer slik at <InlineLatex latex="dB/dt = 0{,}020\;\text{T/s}" />.
              En strømsløyfe har areal <InlineLatex latex="A = 120\;\text{cm}^2 = 0{,}012\;\text{m}^2" />{" "}
              og resistans <InlineLatex latex="R = 5{,}0\;\Omega" />.
              B-feltet står vinkelrett på sløyfen (φ = 0°).
            </p>
            <p className="mt-2">a) Finn indusert EMF.</p>
            <p>b) Finn den induserte strømmen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bruk <InlineLatex latex="\mathcal{E} = -A\,dB/dt" /> (φ = 0° → cos φ = 1, N = 1).</p> },
          { label: "Hint 2", content: <p><InlineLatex latex="I = |\mathcal{E}|/R" /> (Ohms lov).</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Indusert EMF:</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -\frac{d\Phi_B}{dt} = -A\frac{dB}{dt} = -0{,}012 \cdot 0{,}020 = -0{,}24\;\text{mV}"
              variant="gold"
            />
            <p className="text-sm"><InlineLatex latex="|\mathcal{E}| = 0{,}24\;\text{mV}" /></p>

            <p><strong>b) Indusert strøm:</strong></p>
            <FormulaBox
              latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}24 \times 10^{-3}}{5{,}0} = \underline{\underline{0{,}048\;\text{mA} = 48\;\mu\text{A}}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Selv en liten endring i B-felt gir en målbar EMF.
              Strømmen avhenger av både EMF og resistans (Ohms lov i den induserte kretsen).</p>
          </div>
        }
      />

      {/* Eksempel 2: Spole i varierende B-felt med vinkel — fra forelesning */}
      <ExerciseCard
        number={2}
        title="Spole med 500 vindinger i varierende B-felt"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En spole med <InlineLatex latex="N = 500" /> vindinger og radius{" "}
              <InlineLatex latex="r = 4\;\text{cm} = 0{,}04\;\text{m}" /> er plassert i et uniformt magnetfelt.
              Vinkelen mellom B og normalvektoren til spolen er <InlineLatex latex="\varphi = 30°" />.
              Magnetfeltet endres med <InlineLatex latex="dB/dt = -0{,}200\;\text{T/s}" />.
            </p>
            <p className="mt-2">
              a) Finn den induserte EMF-en.
            </p>
            <p>
              b) La nå spolen rotere med konstant vinkelfart ω i et <em>konstant</em> B-felt.
              Vis at dette gir <InlineLatex latex="\mathcal{E} = NAB\omega\sin(\omega t)" />.
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>a) <InlineLatex latex="\mathcal{E} = -N \cdot A \cdot \cos\varphi \cdot dB/dt" />, der <InlineLatex latex="A = \pi r^2" />.</p> },
          { label: "Hint 2", content: <p>b) Sett <InlineLatex latex="\varphi = \omega t" /> og deriver <InlineLatex latex="\Phi = NAB\cos(\omega t)" />.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Indusert EMF:</strong></p>
            <p className="text-sm">
              <InlineLatex latex="A = \pi r^2 = \pi \cdot (0{,}04)^2 = 5{,}03 \times 10^{-3}\;\text{m}^2" />
            </p>
            <FormulaBox
              latex="\mathcal{E} = -N \cdot A \cdot \cos 30° \cdot \frac{dB}{dt} = -500 \cdot 5{,}03 \times 10^{-3} \cdot 0{,}866 \cdot (-0{,}200) = \underline{\underline{0{,}435\;\text{V}}}"
              variant="gold"
            />

            <p><strong>b) Roterende spole:</strong></p>
            <p className="text-sm">Med <InlineLatex latex="\varphi = \omega t" /> og konstant B:</p>
            <FormulaBox
              latex="\mathcal{E} = -N\frac{d\Phi_B}{dt} = -N\frac{d}{dt}(AB\cos\omega t) = NAB\omega\sin(\omega t)"
              variant="gold"
            />
            <p className="text-sm">Dette er <strong>vekselstrøm</strong> — spenningen varierer sinusformig med tid!</p>

            <p className="mt-2"><strong>Hva lærte vi?</strong> To forskjellige situasjoner:
              (a) endring i B → EMF er konstant (likestrøm), (b) rotasjon → EMF varierer sinusformig (vekselstrøm).</p>
          </div>
        }
      />

      {/* Eksempel 3: Glidende stav — fra forelesning */}
      <ExerciseCard
        number={3}
        title="Glidende stav på skinner i magnetfelt"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              En rett lederstav med lengde <InlineLatex latex="L = 0{,}10\;\text{m}" />{" "}
              glir med fart <InlineLatex latex="v = 2{,}5\;\text{m/s}" /> langs to parallelle skinner
              i et uniformt magnetfelt <InlineLatex latex="B = 0{,}60\;\text{T}" /> rettet inn i arket.
              Staven har resistans <InlineLatex latex="R = 0{,}030\;\Omega" />.
            </p>
            <p className="mt-2">
              a) Finn den induserte EMF-en.
            </p>
            <p>b) Finn strømmen og dens retning.</p>
            <p>c) Finn effekten.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>a) <InlineLatex latex="\mathcal{E} = vBL" /></p> },
          { label: "Hint 2", content: <p>b) Ohms lov + Lenz&apos; lov for retning.</p> },
          { label: "Hint 3", content: <p>c) <InlineLatex latex="P = \mathcal{E}^2/R" /> eller <InlineLatex latex="P = I^2R" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Indusert EMF:</strong></p>
            <FormulaBox
              latex="\mathcal{E} = vBL = 2{,}5 \cdot 0{,}60 \cdot 0{,}10 = \underline{\underline{0{,}15\;\text{V}}}"
              variant="gold"
            />

            <p><strong>b) Strøm:</strong></p>
            <FormulaBox
              latex="I = \frac{\mathcal{E}}{R} = \frac{0{,}15}{0{,}030} = \underline{\underline{5{,}0\;\text{A}}}"
              variant="gold"
            />
            <p className="text-sm">
              <strong>Retning (Lenz&apos; lov):</strong> Staven beveger seg til høyre → arealet øker → fluksen (inn i arket)
              øker → indusert strøm motvirker = lager felt <em>ut av</em> arket → strøm <strong>mot klokka</strong>.
            </p>

            <p><strong>c) Effekt:</strong></p>
            <FormulaBox
              latex="P = \frac{\mathcal{E}^2}{R} = \frac{0{,}15^2}{0{,}030} = \frac{B^2L^2v^2}{R} = \underline{\underline{0{,}75\;\text{W}}}"
              variant="gold"
            />
            <p className="text-sm">
              Verifisering: <InlineLatex latex="P_{\text{tilført}} = F \cdot v = ILB \cdot v = 5{,}0 \cdot 0{,}10 \cdot 0{,}60 \cdot 2{,}5 = 0{,}75\;\text{W}" /> — stemmer!
            </p>

            <p className="mt-2"><strong>Hva lærte vi?</strong> Effekten vi må tilføre for å holde staven i bevegelse er nøyaktig lik
              effekten som dissiperes i resistansen. Energibevaring!</p>
          </div>
        }
      />

      {/* Eksempel 4: Faradays diskdynamo — fra forelesning */}
      <ExerciseCard
        number={4}
        title="Faradays diskdynamo"
        difficulty="vanskelig"
        source="Forelesning"
        problem={
          <div>
            <p>
              En metallskive med radius <InlineLatex latex="R" /> roterer med konstant vinkelfart{" "}
              <InlineLatex latex="\omega" /> i et uniformt magnetfelt B (vinkelrett på skiven).
              Børster leder strøm fra sentrum til kanten via en ekstern krets med resistans R<sub>krets</sub>.
            </p>
            <p className="mt-2">
              Vis at den induserte EMF-en er <InlineLatex latex="\mathcal{E} = \frac{1}{2}\omega BR^2" />.
            </p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Kun den radielle linjen fra sentrum til kanten er i bevegelse. Farten til et punkt i avstand r fra sentrum er v = ωr.</p> },
          { label: "Hint 2", content: <p>Integrer bidraget <InlineLatex latex="d\mathcal{E} = vB\,dr = \omega r B\,dr" /> fra 0 til R.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p className="text-sm">
              Et punkt i avstand r fra sentrum har fart <InlineLatex latex="v = \omega r" />. Bidraget til EMF fra et
              lite element dr er:
            </p>
            <FormulaBox
              latex="d\mathcal{E} = vB\,dr = \omega r B\,dr"
              variant="blue"
            />
            <p className="text-sm">Vi integrerer fra sentrum (0) til kanten (R):</p>
            <FormulaBox
              latex="\mathcal{E} = \int_0^R \omega rB\,dr = \omega B \int_0^R r\,dr = \omega B \cdot \frac{R^2}{2} = \underline{\underline{\frac{1}{2}\omega B R^2}}"
              variant="gold"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Diskdynamoen gir <em>konstant likestrøm</em> (ikke vekselstrøm),
              fordi vinkelen mellom v og B er konstant — den endres ikke med rotasjonen.</p>
          </div>
        }
      />

      {/* ══════════════════════════════════════════════
          ØVINGSOPPGAVER
          ══════════════════════════════════════════════ */}
      <h3 className="text-xl font-bold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Enkel Faradays lov"
        difficulty="lett"
        source="Oppgave 29.1"
        problem={
          <div>
            <p>
              En flat, sirkulær spole med areal <InlineLatex latex="A = 0{,}250\;\text{m}^2" /> og 1 vinding
              er plassert vinkelrett på et uniformt magnetfelt. Feltet øker uniformt fra{" "}
              <InlineLatex latex="0{,}00\;\text{T}" /> til <InlineLatex latex="0{,}500\;\text{T}" /> i løpet av{" "}
              <InlineLatex latex="1{,}00\;\text{s}" />.
            </p>
            <p className="mt-2">Finn den induserte EMF-en.</p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p><InlineLatex latex="\mathcal{E} = -A \cdot \Delta B / \Delta t" /> (φ = 0°, N = 1)</p> },
        ]}
        solution={
          <div className="space-y-3">
            <FormulaBox
              latex="\mathcal{E} = -A\frac{\Delta B}{\Delta t} = -0{,}250 \cdot \frac{0{,}500 - 0}{1{,}00} = \underline{\underline{-0{,}125\;\text{V}}}"
              variant="gold"
            />
            <p className="text-sm"><InlineLatex latex="|\mathcal{E}| = 0{,}125\;\text{V} = 125\;\text{mV}" /></p>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Spole i varierende felt"
        difficulty="middels"
        source="Oppgave 29.8"
        problem={
          <div>
            <p>
              En sirkulær spole med 200 vindinger og radius <InlineLatex latex="r = 3{,}00\;\text{cm}" />{" "}
              er plassert vinkelrett på et magnetfelt. Feltet endres fra{" "}
              <InlineLatex latex="0{,}800\;\text{T}" /> til <InlineLatex latex="0{,}300\;\text{T}" />{" "}
              på <InlineLatex latex="0{,}400\;\text{s}" />.
            </p>
            <p className="mt-2">
              a) Finn den gjennomsnittlige induserte EMF-en.
            </p>
            <p>b) Hvis spolens resistans er <InlineLatex latex="40{,}0\;\Omega" />, finn den gjennomsnittlige strømmen.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p><InlineLatex latex="A = \pi r^2 = \pi(0{,}03)^2" /></p> },
          { label: "Hint 2", content: <p><InlineLatex latex="\mathcal{E} = -N \cdot A \cdot \Delta B/\Delta t" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <p className="text-sm"><InlineLatex latex="A = \pi(0{,}0300)^2 = 2{,}83 \times 10^{-3}\;\text{m}^2" /></p>
            <p><strong>a) EMF:</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -N \cdot A \cdot \frac{\Delta B}{\Delta t} = -200 \cdot 2{,}83 \times 10^{-3} \cdot \frac{0{,}300 - 0{,}800}{0{,}400} = \underline{\underline{0{,}707\;\text{V}}}"
              variant="gold"
            />
            <p><strong>b) Strøm:</strong></p>
            <FormulaBox
              latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}707}{40{,}0} = \underline{\underline{17{,}7\;\text{mA}}}"
              variant="gold"
            />
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Lenz' lov — strømretning"
        difficulty="middels"
        source="Oppgave 29.15"
        problem={
          <div>
            <p>
              En sirkulær strømsløyfe ligger i xy-planet. Et uniformt magnetfelt peker i +z-retning
              (ut av arket). Feltet <em>øker</em> med tiden.
            </p>
            <p className="mt-2">
              I hvilken retning flyter den induserte strømmen (med eller mot klokka, sett ovenfra)?
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>B peker ut av arket og øker. Hva sier Lenz&apos; lov? Den induserte strømmen må lage et felt som motvirker økningen.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p className="text-sm">
              B peker ut av arket (+z) og <em>øker</em>. Lenz&apos; lov: indusert strøm motvirker → lager felt <em>inn i</em> arket (−z).
            </p>
            <p className="text-sm">
              Høyrehåndsregelen: for å lage felt i −z-retning, må strømmen gå <strong>med klokka</strong> (sett ovenfra).
            </p>
            <p className="mt-2 font-semibold">Svar: Med klokka.</p>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="EMF fra bevegelig stav"
        difficulty="middels"
        source="Oppgave 29.24"
        problem={
          <div>
            <p>
              En rett lederstav med lengde <InlineLatex latex="L = 0{,}360\;\text{m}" /> beveger seg med
              fart <InlineLatex latex="v = 5{,}80\;\text{m/s}" /> i et magnetfelt <InlineLatex latex="B = 0{,}120\;\text{T}" />.
              Staven, farten og feltet er innbyrdes vinkelrette.
            </p>
            <p className="mt-2">
              a) Finn den induserte EMF-en.
            </p>
            <p>b) Hvilken ende av staven er på høyest potensial?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p><InlineLatex latex="\mathcal{E} = vBL" /></p> },
          { label: "Hint 2", content: <p>Bruk <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" /> for å se hvilken retning positive ladninger skyves.</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong></p>
            <FormulaBox
              latex="\mathcal{E} = vBL = 5{,}80 \cdot 0{,}120 \cdot 0{,}360 = \underline{\underline{0{,}250\;\text{V}}}"
              variant="gold"
            />
            <p><strong>b)</strong></p>
            <p className="text-sm">
              Positive ladninger i staven opplever <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" />.
              Den enden der positive ladninger samles, har høyest potensial.
              Bruk høyrehåndsregelen med de gitte retningene for å avgjøre.
            </p>
          </div>
        }
      />

      <ExerciseCard
        number={5}
        title="Effekt og kraft på glidende stav"
        difficulty="vanskelig"
        source="Oppgave 29.27"
        problem={
          <div>
            <p>
              En metallstav med lengde <InlineLatex latex="L = 0{,}25\;\text{m}" /> og resistans{" "}
              <InlineLatex latex="R = 0{,}15\;\Omega" /> glir med konstant fart på friksjonsfrie skinner
              i et felt <InlineLatex latex="B = 0{,}40\;\text{T}" />.
            </p>
            <p className="mt-2">
              a) Finn farten v som gir indusert strøm <InlineLatex latex="I = 0{,}80\;\text{A}" />.
            </p>
            <p>b) Finn kraften som trengs for å holde staven i bevegelse.</p>
            <p>c) Finn effekten som tilføres og effekten som dissiperes. Sammenlign.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>a) <InlineLatex latex="I = \mathcal{E}/R = BLv/R" /> → løs for v.</p> },
          { label: "Hint 2", content: <p>b) Kraften på staven i feltet: <InlineLatex latex="F = ILB" />.</p> },
          { label: "Hint 3", content: <p>c) <InlineLatex latex="P_{\text{tilført}} = Fv" />, <InlineLatex latex="P_{\text{dissipiert}} = I^2R" /></p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) Fart:</strong></p>
            <FormulaBox
              latex="v = \frac{IR}{BL} = \frac{0{,}80 \cdot 0{,}15}{0{,}40 \cdot 0{,}25} = \underline{\underline{1{,}2\;\text{m/s}}}"
              variant="gold"
            />
            <p><strong>b) Kraft:</strong></p>
            <FormulaBox
              latex="F = ILB = 0{,}80 \cdot 0{,}25 \cdot 0{,}40 = \underline{\underline{0{,}080\;\text{N} = 80\;\text{mN}}}"
              variant="gold"
            />
            <p><strong>c) Effekt:</strong></p>
            <FormulaBox
              latex="P_{\text{tilført}} = Fv = 0{,}080 \cdot 1{,}2 = 0{,}096\;\text{W}"
              variant="blue"
            />
            <FormulaBox
              latex="P_{\text{dissipiert}} = I^2R = 0{,}80^2 \cdot 0{,}15 = 0{,}096\;\text{W} \quad \checkmark"
              variant="blue"
            />
            <p className="mt-2"><strong>Hva lærte vi?</strong> Energibevaring: all tilført effekt dissiperes som varme i resistansen. Ingen energi «forsvinner».</p>
          </div>
        }
      />

      {/* ══════════════════════════════════════════════
          EKSAMENSOPPGAVER
          ══════════════════════════════════════════════ */}
      <h3 className="text-xl font-bold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-6">
        <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Eksamenstips — Kapittel 29</p>
        <ul className="text-sm space-y-1">
          <li>• <strong>Faradays lov</strong> er den viktigste formelen — kan nesten alle oppgaver</li>
          <li>• <strong>Lenz&apos; lov</strong> for retning — øvd mye på dette!</li>
          <li>• <strong>ε = BLv</strong> for glidende stav er en klassiker</li>
          <li>• <strong>Energibevaring</strong>: sjekk at P_tilført = P_dissipiert</li>
          <li>• Husk: <InlineLatex latex="\Phi_B = BA\cos\varphi" /> — ikke glem cos φ!</li>
          <li>• Enhet-sjekk: [ε] = V = Wb/s = T·m²/s</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Eksamenstype: Kombinert Faraday + Lenz + energi"
        difficulty="vanskelig"
        source="Eksamenstype"
        problem={
          <div>
            <p>
              En rektangulær strømsløyfe med bredde <InlineLatex latex="w = 5{,}0\;\text{cm}" />{" "}
              og lengde <InlineLatex latex="l = 10{,}0\;\text{cm}" /> har resistans{" "}
              <InlineLatex latex="R = 2{,}0\;\Omega" />.
              Sløyfen trekkes med konstant fart <InlineLatex latex="v = 3{,}0\;\text{m/s}" />{" "}
              ut av et uniformt magnetfelt <InlineLatex latex="B = 1{,}5\;\text{T}" /> (inn i arket).
            </p>
            <p className="mt-2">
              a) Finn den induserte EMF-en mens sløyfen er delvis i feltet.
            </p>
            <p>b) Finn strømmen og dens retning.</p>
            <p>c) Finn kraften som trengs for å trekke sløyfen ut med konstant fart.</p>
            <p>d) Verifiser energibevaring.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Bare den ene siden (bredden w) av sløyfen er i feltet og bidrar. Arealet som er i feltet minker.</p> },
          { label: "Hint 2", content: <p><InlineLatex latex="\mathcal{E} = Bwv" /> (som en glidende stav med lengde w).</p> },
          { label: "Hint 3", content: <p>Kraft: <InlineLatex latex="F = IwB" /> (kraft på strømførende leder i felt).</p> },
        ]}
        solution={
          <div className="space-y-3">
            <p><strong>a) EMF:</strong></p>
            <p className="text-sm">Arealet i feltet minker: <InlineLatex latex="dA/dt = -w \cdot v" /></p>
            <FormulaBox
              latex="|\mathcal{E}| = Bwv = 1{,}5 \cdot 0{,}050 \cdot 3{,}0 = \underline{\underline{0{,}225\;\text{V}}}"
              variant="gold"
            />

            <p><strong>b) Strøm:</strong></p>
            <FormulaBox
              latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}225}{2{,}0} = \underline{\underline{0{,}1125\;\text{A}}}"
              variant="gold"
            />
            <p className="text-sm">
              <strong>Retning (Lenz&apos; lov):</strong> Fluks inn i arket minker → indusert strøm lager felt <em>inn i</em> arket
              → strøm <strong>med klokka</strong>.
            </p>

            <p><strong>c) Kraft:</strong></p>
            <p className="text-sm">
              Den strømførende siden (w) i feltet opplever en bremsende kraft (Lenz!):
            </p>
            <FormulaBox
              latex="F = IwB = 0{,}1125 \cdot 0{,}050 \cdot 1{,}5 = \underline{\underline{8{,}44 \times 10^{-3}\;\text{N}}}"
              variant="gold"
            />
            <p className="text-sm">Vi må tilføre en like stor kraft i trekkretningen.</p>

            <p><strong>d) Energibevaring:</strong></p>
            <FormulaBox
              latex="P_{\text{tilført}} = Fv = 8{,}44 \times 10^{-3} \cdot 3{,}0 = 0{,}0253\;\text{W}"
              variant="blue"
            />
            <FormulaBox
              latex="P_{\text{dissipiert}} = I^2R = 0{,}1125^2 \cdot 2{,}0 = 0{,}0253\;\text{W} \quad \checkmark"
              variant="blue"
            />
            <p className="text-sm font-semibold mt-2">Stemmer! All mekanisk energi tilført omdannes til varme i resistansen.</p>
          </div>
        }
      />
    </div>
  );
}
