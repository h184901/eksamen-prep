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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="dB/dt = 0{,}020\;\text{T/s}" /> — endringsrate for B-feltet</li>
                <li><InlineLatex latex="A = 120\;\text{cm}^2 = 0{,}012\;\text{m}^2" /> — areal av sløyfen</li>
                <li><InlineLatex latex="R = 5{,}0\;\Omega" /> — resistans i sløyfen</li>
                <li><InlineLatex latex="\varphi = 0°" /> — B vinkelrett på sløyfen, så <InlineLatex latex="\cos 0° = 1" /></li>
                <li><InlineLatex latex="N = 1" /> — én vinding</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Den induserte EMF-en <InlineLatex latex="\mathcal{E}" /></li>
                <li>b) Den induserte strømmen <InlineLatex latex="I" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Bruker Faradays lov: <InlineLatex latex="\mathcal{E} = -N\,d\Phi_B/dt" />.
                Siden B endres uniformt over et konstant areal med <InlineLatex latex="\varphi = 0°" />,
                forenkles dette til <InlineLatex latex="\mathcal{E} = -A\,dB/dt" />.
                Deretter gir Ohms lov strømmen direkte.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — Sett opp Faradays lov:</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -N\frac{d\Phi_B}{dt} = -A\frac{dB}{dt}"
              variant="blue"
            />
            <p className="text-sm"><strong>Steg 2 — Sett inn tallverdier (a):</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -0{,}012\;\text{m}^2 \cdot 0{,}020\;\text{T/s} = -2{,}4 \times 10^{-4}\;\text{V}"
              variant="blue"
            />
            <p className="text-sm"><strong>Steg 3 — Finn strømmen (b) med Ohms lov:</strong></p>
            <FormulaBox
              latex="I = \frac{|\mathcal{E}|}{R} = \frac{2{,}4 \times 10^{-4}\;\text{V}}{5{,}0\;\Omega} = \underline{\underline{48\;\mu\text{A}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <FormulaBox latex="|\mathcal{E}| = 0{,}24\;\text{mV}, \quad I = 48\;\mu\text{A}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Selv en liten endringsrate i B-feltet gir en målbar EMF via Faradays lov.
                Siden B-feltet er uniformt og arealet er konstant, er EMF-en konstant i tid — dette er likestrøm.
                Strømmen følger direkte fra Ohms lov i den induserte kretsen.
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="N = 500" /> vindinger</li>
                <li><InlineLatex latex="r = 4\;\text{cm} = 0{,}04\;\text{m}" /></li>
                <li><InlineLatex latex="\varphi = 30°" /> — vinkel mellom B og normalvektor</li>
                <li>a) <InlineLatex latex="dB/dt = -0{,}200\;\text{T/s}" /> (B minker)</li>
                <li>b) Konstant B, spolen roterer med konstant <InlineLatex latex="\omega" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Indusert EMF <InlineLatex latex="\mathcal{E}" /> (konstant felt, varierende B)</li>
                <li>b) Uttrykk for <InlineLatex latex="\mathcal{E}(t)" /> når spolen roterer (konstant B)</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                a) Faradays lov med fast vinkel: <InlineLatex latex="\mathcal{E} = -NA\cos\varphi\,(dB/dt)" />.
                Arealformelen for sirkel: <InlineLatex latex="A = \pi r^2" />.
                b) Når spolen roterer er <InlineLatex latex="\varphi = \omega t" />,
                så fluksen er <InlineLatex latex="\Phi = NAB\cos(\omega t)" /> — deriver for å finne EMF.
                Dette viser opphavet til vekselstrøm!
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — Areal:</strong></p>
            <FormulaBox
              latex="A = \pi r^2 = \pi(0{,}04)^2 = 5{,}03 \times 10^{-3}\;\text{m}^2"
              variant="blue"
            />
            <p className="text-sm"><strong>Steg 2 — EMF med varierende B (a):</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -NA\cos\varphi\,\frac{dB}{dt} = -500 \cdot 5{,}03\times10^{-3} \cdot \cos 30° \cdot (-0{,}200)"
              variant="blue"
            />
            <FormulaBox
              latex="\mathcal{E} = 500 \cdot 5{,}03\times10^{-3} \cdot 0{,}866 \cdot 0{,}200 = \underline{\underline{0{,}435\;\text{V}}}"
              variant="gold"
            />
            <p className="text-sm"><strong>Steg 3 — Roterende spole (b):</strong> La <InlineLatex latex="\varphi = \omega t" />:</p>
            <FormulaBox
              latex="\Phi_B = NAB\cos(\omega t)"
              variant="blue"
            />
            <FormulaBox
              latex="\mathcal{E} = -N\frac{d\Phi_B}{dt} = -N\frac{d}{dt}[AB\cos(\omega t)] = NAB\omega\sin(\omega t)"
              variant="gold"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <p className="text-sm">a) <InlineLatex latex="\mathcal{E} = 0{,}435\;\text{V}" /></p>
              <p className="text-sm">b) <InlineLatex latex="\mathcal{E}(t) = NAB\omega\sin(\omega t)" /> — sinusformet vekselstrøm</p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                To svært ulike situasjoner gir svært ulike resultater:
                (a) varierende B med fast spole → konstant EMF (likestrøm), fordi endringshastigheten er konstant.
                (b) roterende spole i konstant B → sinusformet EMF (vekselstrøm), fordi vinkelen <InlineLatex latex="\varphi = \omega t" /> endres kontinuerlig.
                Del b) er faktisk grunnprinsippet bak alle kraftverk!
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="L = 0{,}10\;\text{m}" /> — lengde på staven</li>
                <li><InlineLatex latex="v = 2{,}5\;\text{m/s}" /> — fart langs skinnene</li>
                <li><InlineLatex latex="B = 0{,}60\;\text{T}" /> — magnetfelt inn i arket</li>
                <li><InlineLatex latex="R = 0{,}030\;\Omega" /> — resistans</li>
                <li>Staven glir til høyre på to parallelle skinner</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Indusert EMF <InlineLatex latex="\mathcal{E}" /></li>
                <li>b) Strøm <InlineLatex latex="I" /> og dens retning</li>
                <li>c) Effekt <InlineLatex latex="P" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Formelen <InlineLatex latex="\mathcal{E} = vBL" /> gjelder direkte for en rett stav som glir vinkelrett på B og vinkelrett på seg selv.
                Fysisk skyver magnetkraften <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" /> ladningene langs staven og skaper en potensialforskjell.
                Strømretningen bestemmes av Lenz&apos; lov, og effekten skal stemme med energibevaring: <InlineLatex latex="P_{\text{mek}} = P_{\text{el}}" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — EMF fra glidende stav (a):</strong></p>
            <FormulaBox
              latex="\mathcal{E} = vBL = 2{,}5\;\text{m/s} \cdot 0{,}60\;\text{T} \cdot 0{,}10\;\text{m} = \underline{\underline{0{,}15\;\text{V}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 2 — Strøm (b):</strong></p>
            <FormulaBox
              latex="I = \frac{\mathcal{E}}{R} = \frac{0{,}15\;\text{V}}{0{,}030\;\Omega} = \underline{\underline{5{,}0\;\text{A}}}"
              variant="gold"
            />
            <p className="text-sm">
              <strong>Retning (Lenz&apos; lov):</strong> Staven beveger seg til høyre → det inngjerdede arealet øker → fluks inn i arket øker → indusert strøm motvirker økningen → lager felt <em>ut av</em> arket → strøm <strong>mot klokka</strong>.
            </p>

            <p className="text-sm"><strong>Steg 3 — Effekt (c):</strong></p>
            <FormulaBox
              latex="P = \frac{\mathcal{E}^2}{R} = \frac{(0{,}15)^2}{0{,}030} = \underline{\underline{0{,}75\;\text{W}}}"
              variant="gold"
            />
            <p className="text-sm">
              <strong>Verifisering (energibevaring):</strong>{" "}
              <InlineLatex latex="P_{\text{mek}} = F \cdot v = ILB \cdot v = 5{,}0 \cdot 0{,}10 \cdot 0{,}60 \cdot 2{,}5 = 0{,}75\;\text{W} \;\checkmark" />
            </p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <FormulaBox latex="\mathcal{E} = 0{,}15\;\text{V}, \quad I = 5{,}0\;\text{A}\;(\text{mot klokka}), \quad P = 0{,}75\;\text{W}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                En glidende stav er egentlig en leder i bevegelse — magnetkraften på ladningene skaper EMF.
                Lenz&apos; lov sier alltid at den induserte strømmen motvirker bevegelsen, som en slags elektromagnetisk «friksjon».
                Energibevaring holder alltid: all mekanisk effekt tilført omdannes til elektrisk effekt i kretsen.
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>Metallskive med radius <InlineLatex latex="R" /></li>
                <li>Konstant vinkelfart <InlineLatex latex="\omega" /></li>
                <li>Uniformt magnetfelt <InlineLatex latex="B" /> vinkelrett på skiven (inn/ut)</li>
                <li>Strøm ledes fra sentrum til kanten via børster</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Vis at den induserte EMF-en er <InlineLatex latex="\mathcal{E} = \tfrac{1}{2}\omega BR^2" /></p>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Den radielle linjen fra sentrum til kanten fungerer som en «stav» i bevegelse.
                Hvert lite element <InlineLatex latex="dr" /> i avstand <InlineLatex latex="r" /> fra sentrum har fart <InlineLatex latex="v = \omega r" />.
                EMF-bidraget er <InlineLatex latex="d\mathcal{E} = vB\,dr = \omega r B\,dr" />.
                Vi integrerer dette fra 0 til R for å finne total EMF.
                Denne metoden er ekvivalent med å bruke <InlineLatex latex="\mathcal{E} = \oint(\vec{v}\times\vec{B})\cdot d\vec{l}" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — EMF-bidrag fra et lite element:</strong></p>
            <p className="text-sm">Et punkt i avstand <InlineLatex latex="r" /> fra sentrum har tangentiell fart <InlineLatex latex="v = \omega r" />. EMF-bidraget:</p>
            <FormulaBox
              latex="d\mathcal{E} = vB\,dr = \omega r B\,dr"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — Integrer fra sentrum til kanten:</strong></p>
            <FormulaBox
              latex="\mathcal{E} = \int_0^R \omega r B\,dr = \omega B \int_0^R r\,dr = \omega B \cdot \left[\frac{r^2}{2}\right]_0^R = \omega B \cdot \frac{R^2}{2}"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 3 — Sluttresultat:</strong></p>
            <FormulaBox
              latex="\mathcal{E} = \underline{\underline{\frac{1}{2}\omega B R^2}}"
              variant="gold"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <FormulaBox latex="\mathcal{E} = \frac{1}{2}\omega BR^2" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Diskdynamoen gir <em>konstant likestrøm</em> — i motsetning til en roterende spole som gir vekselstrøm.
                Grunnen: i en roterende spole endres vinkelen mellom <InlineLatex latex="\vec{v}" /> og <InlineLatex latex="\vec{B}" />,
                mens i diskdynamoen er denne vinkelen alltid 90° for alle radielle elementer, uavhengig av rotasjonsvinkelen.
                Resultatet er tidsuavhengig EMF — det er Faraday som oppfant dette prinsippet i 1831!
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="A = 0{,}250\;\text{m}^2" /> — areal av spolen</li>
                <li><InlineLatex latex="N = 1" /> vinding</li>
                <li><InlineLatex latex="\Delta B = 0{,}500\;\text{T} - 0{,}00\;\text{T} = 0{,}500\;\text{T}" /></li>
                <li><InlineLatex latex="\Delta t = 1{,}00\;\text{s}" /></li>
                <li><InlineLatex latex="\varphi = 0°" /> — B vinkelrett på spolen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Den induserte EMF-en <InlineLatex latex="\mathcal{E}" /></p>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Faradays lov med uniform endring: <InlineLatex latex="\mathcal{E} = -A\,\Delta B/\Delta t" />.
                Ettersom B øker uniformt over konstant areal med <InlineLatex latex="\varphi = 0°" />, er EMF-en konstant i løpet av tidsintervallet.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — Faradays lov (uniform endring):</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -A\frac{\Delta B}{\Delta t} = -0{,}250\;\text{m}^2 \cdot \frac{0{,}500\;\text{T}}{1{,}00\;\text{s}} = \underline{\underline{-0{,}125\;\text{V}}}"
              variant="gold"
            />
            <p className="text-sm">Beløpet: <InlineLatex latex="|\mathcal{E}| = 0{,}125\;\text{V} = 125\;\text{mV}" /></p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <FormulaBox latex="|\mathcal{E}| = 0{,}125\;\text{V} = 125\;\text{mV}" variant="gold" />
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                For uniform endring i B bruker vi <InlineLatex latex="\Delta B/\Delta t" /> i stedet for den deriverte — resultatet er det samme.
                Minustegnet i Faradays lov betyr at EMF-en motvirker endringen (Lenz&apos; lov), men størrelsen er 125 mV.
                Legg merke til at strøm ikke spørres om her — det krever opplysning om resistans.
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="N = 200" /> vindinger</li>
                <li><InlineLatex latex="r = 3{,}00\;\text{cm} = 0{,}0300\;\text{m}" /></li>
                <li><InlineLatex latex="B_i = 0{,}800\;\text{T},\; B_f = 0{,}300\;\text{T}" /></li>
                <li><InlineLatex latex="\Delta t = 0{,}400\;\text{s}" /></li>
                <li><InlineLatex latex="R = 40{,}0\;\Omega" /></li>
                <li><InlineLatex latex="\varphi = 0°" /> — B vinkelrett på spolen</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Gjennomsnittlig indusert EMF <InlineLatex latex="\mathcal{E}" /></li>
                <li>b) Gjennomsnittlig indusert strøm <InlineLatex latex="I" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Med N vindinger er total fluks <InlineLatex latex="\Phi_{\text{tot}} = N\Phi_B = NAB" />,
                og Faradays lov gir <InlineLatex latex="\mathcal{E} = -N A\,\Delta B/\Delta t" />.
                Arealet beregnes fra <InlineLatex latex="A = \pi r^2" />.
                Deretter følger strømmen fra Ohms lov.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — Areal:</strong></p>
            <FormulaBox
              latex="A = \pi r^2 = \pi(0{,}0300)^2 = 2{,}827 \times 10^{-3}\;\text{m}^2"
              variant="blue"
            />

            <p className="text-sm"><strong>Steg 2 — EMF (a):</strong></p>
            <FormulaBox
              latex="\mathcal{E} = -NA\frac{\Delta B}{\Delta t} = -200 \cdot 2{,}827\times10^{-3} \cdot \frac{0{,}300 - 0{,}800}{0{,}400}"
              variant="blue"
            />
            <FormulaBox
              latex="\mathcal{E} = -200 \cdot 2{,}827\times10^{-3} \cdot (-1{,}25) = \underline{\underline{0{,}707\;\text{V}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 3 — Strøm (b):</strong></p>
            <FormulaBox
              latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}707\;\text{V}}{40{,}0\;\Omega} = \underline{\underline{17{,}7\;\text{mA}}}"
              variant="gold"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <p className="text-sm">a) <InlineLatex latex="\mathcal{E} = 0{,}707\;\text{V}" /></p>
              <p className="text-sm">b) <InlineLatex latex="I = 17{,}7\;\text{mA}" /></p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Antall vindinger N multipliserer EMF-en direkte — det er grunnen til at spoler med mange vindinger
                brukes i transformatorer og generatorer.
                Her minker B-feltet (fra 0,800 T til 0,300 T), så Lenz&apos; lov sier at den induserte strømmen
                forsøker å opprettholde den opprinnelige fluksen.
                Merk at <InlineLatex latex="\Delta B/\Delta t = -1{,}25\;\text{T/s}" /> (negativt fordi B minker),
                og det negative Faraday-tegnet kansellerer dette til positiv EMF.
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li>Sirkulær sløyfe i xy-planet</li>
                <li>Uniformt magnetfelt i +z-retning (ut av arket), sett ovenfra</li>
                <li>Feltet <em>øker</em> med tiden</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <p className="text-sm">Retningen på den induserte strømmen (med eller mot klokka, sett ovenfra)</p>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Lenz&apos; lov i tre steg: (1) Bestem retning og fortegn på fluksendringen.
                (2) Indusert strøm lager et felt som <em>motvirker</em> endringen.
                (3) Høyrehåndsregelen gir strømretningen fra det ønskede B-feltet.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — Nåværende fluks:</strong> B peker ut av arket (+z) gjennom sløyfen. Fluks: <InlineLatex latex="\Phi_B > 0" /> og <em>øker</em>.</p>
            <p className="text-sm"><strong>Steg 2 — Lenz&apos; lov:</strong> Indusert strøm må motvirke økningen → indusert B-felt må peke <em>inn i</em> arket (−z) gjennom sløyfen.</p>
            <p className="text-sm"><strong>Steg 3 — Høyrehåndsregelen:</strong> For å lage et B-felt i −z-retning (inn i arket) med høyrehåndsregelen, krummer fingrene <strong>med klokka</strong> (sett ovenfra).</p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <p className="text-sm font-semibold">Strømmen flyter <strong>med klokka</strong> sett ovenfra.</p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Lenz&apos; lov er en konsekvens av energibevaring — den induserte strømmen gir alltid en kraft
                som motvirker årsaken (endringen i fluks).
                Husketrikset: øker fluks ut av arket → indusert strøm motvirker → vil inn i arket → med klokka.
                Minker fluks ut av arket → indusert strøm vil ut av arket → mot klokka.
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="L = 0{,}360\;\text{m}" /> — lengde på staven</li>
                <li><InlineLatex latex="v = 5{,}80\;\text{m/s}" /> — fart (la oss si i +x-retning)</li>
                <li><InlineLatex latex="B = 0{,}120\;\text{T}" /> — magnetfelt (la oss si i +y-retning)</li>
                <li>Stav, fart og felt er innbyrdes vinkelrette</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Indusert EMF <InlineLatex latex="\mathcal{E}" /></li>
                <li>b) Hvilken ende av staven er på høyest potensial</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                For en rett stav som beveger seg vinkelrett på B: <InlineLatex latex="\mathcal{E} = vBL" />.
                For potensialet: magnetkraften på positive ladninger er <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" />.
                Den enden der positive ladninger hoper seg opp, er på høyest potensial (positiv pol).
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — EMF fra glidende stav (a):</strong></p>
            <FormulaBox
              latex="\mathcal{E} = vBL = 5{,}80\;\text{m/s} \cdot 0{,}120\;\text{T} \cdot 0{,}360\;\text{m} = \underline{\underline{0{,}250\;\text{V}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 2 — Kraften på ladninger (b):</strong></p>
            <p className="text-sm">
              La <InlineLatex latex="\vec{v} = v\,\hat{x}" /> og <InlineLatex latex="\vec{B} = B\,\hat{y}" />.
              Kraften på en positiv ladning:
            </p>
            <FormulaBox
              latex="\vec{F} = q\vec{v}\times\vec{B} = q(v\,\hat{x})\times(B\,\hat{y}) = qvB(\hat{x}\times\hat{y}) = qvB\,\hat{z}"
              variant="blue"
            />
            <p className="text-sm">
              Positive ladninger skyves i +z-retning (oppover langs staven) → toppen av staven samler positive ladninger
              → <strong>toppen er på høyest potensial</strong>.
            </p>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <p className="text-sm">a) <InlineLatex latex="\mathcal{E} = 0{,}250\;\text{V}" /></p>
              <p className="text-sm">b) Toppen av staven (i +z-retning) er på høyest potensial.</p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Magnetkraften på ladninger i en bevegende leder skaper en ladningsseparasjon — dette er den mikroskopiske
                forklaringen på hvorfor en glidende stav fungerer som en EMF-kilde.
                Den enden der positive ladninger samles er den positive pol (høyest potensial), akkurat som i et batteri.
                <InlineLatex latex="\hat{x}\times\hat{y} = \hat{z}" /> (høyrehåndsregel for kryssprodukter).
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="L = 0{,}25\;\text{m}" /> — lengde på staven</li>
                <li><InlineLatex latex="R = 0{,}15\;\Omega" /> — resistans</li>
                <li><InlineLatex latex="B = 0{,}40\;\text{T}" /> — magnetfelt</li>
                <li><InlineLatex latex="I = 0{,}80\;\text{A}" /> — ønsket strøm</li>
                <li>Friksjonsfrie skinner, konstant fart</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Farten <InlineLatex latex="v" /> som gir strøm <InlineLatex latex="I = 0{,}80\;\text{A}" /></li>
                <li>b) Kraften <InlineLatex latex="F" /> som holder staven i konstant bevegelse</li>
                <li>c) Tilført effekt <InlineLatex latex="P_{\text{tilf}}" /> og dissipiert effekt <InlineLatex latex="P_{\text{dis}}" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Koble formlene: <InlineLatex latex="I = \mathcal{E}/R = BLv/R" /> → løs for <InlineLatex latex="v" />.
                Kraften som holder staven i bevegelse balanserer magnetkraften: <InlineLatex latex="F = ILB" />.
                Effekt: <InlineLatex latex="P_{\text{tilf}} = Fv" /> og <InlineLatex latex="P_{\text{dis}} = I^2R" /> — disse skal være like (energibevaring).
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — Fart fra strøm (a):</strong></p>
            <FormulaBox
              latex="I = \frac{\mathcal{E}}{R} = \frac{BLv}{R} \implies v = \frac{IR}{BL} = \frac{0{,}80\;\text{A} \cdot 0{,}15\;\Omega}{0{,}40\;\text{T} \cdot 0{,}25\;\text{m}} = \underline{\underline{1{,}2\;\text{m/s}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 2 — Kraft (b):</strong></p>
            <FormulaBox
              latex="F = ILB = 0{,}80\;\text{A} \cdot 0{,}25\;\text{m} \cdot 0{,}40\;\text{T} = \underline{\underline{80\;\text{mN}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 3 — Effekt og energibevaring (c):</strong></p>
            <FormulaBox
              latex="P_{\text{tilført}} = Fv = 0{,}080\;\text{N} \cdot 1{,}2\;\text{m/s} = 0{,}096\;\text{W}"
              variant="blue"
            />
            <FormulaBox
              latex="P_{\text{dissipiert}} = I^2R = (0{,}80)^2 \cdot 0{,}15 = 0{,}096\;\text{W} \quad \checkmark"
              variant="blue"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <p className="text-sm">a) <InlineLatex latex="v = 1{,}2\;\text{m/s}" /></p>
              <p className="text-sm">b) <InlineLatex latex="F = 80\;\text{mN}" /></p>
              <p className="text-sm">c) <InlineLatex latex="P_{\text{tilført}} = P_{\text{dissipiert}} = 96\;\text{mW}" /> — energibevaring bekreftet!</p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Dette er en fullstendig energianalyse av et elektromagnetisk system.
                Mekanisk effekt (kraft × fart) omdannes til elektrisk effekt (strøm × spenning) som varmes opp resistansen.
                At <InlineLatex latex="P_{\text{tilf}} = P_{\text{dis}}" /> er ikke tilfeldig — det er energibevaring,
                et av de mest fundamentale prinsippene i fysikken.
                Lenz&apos; lov er fysisk sett en manifestasjon av dette: naturen lar aldri energi oppstå eller forsvinne!
              </p>
            </div>
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
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva vet vi?</p>
              <ul className="text-sm space-y-1">
                <li><InlineLatex latex="w = 5{,}0\;\text{cm} = 0{,}050\;\text{m}" /> — bredden av sløyfen</li>
                <li><InlineLatex latex="l = 10{,}0\;\text{cm} = 0{,}100\;\text{m}" /> — lengden av sløyfen</li>
                <li><InlineLatex latex="R = 2{,}0\;\Omega" /> — resistans</li>
                <li><InlineLatex latex="v = 3{,}0\;\text{m/s}" /> — konstant trekkfart</li>
                <li><InlineLatex latex="B = 1{,}5\;\text{T}" /> inn i arket — uniformt felt</li>
                <li>Sløyfen er delvis i feltet; trekkes ut av feltet</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Hva skal vi finne?</p>
              <ul className="text-sm space-y-1">
                <li>a) Indusert EMF <InlineLatex latex="\mathcal{E}" /></li>
                <li>b) Strøm <InlineLatex latex="I" /> og retning</li>
                <li>c) Kraft <InlineLatex latex="F" /> for å trekke sløyfen ut med konstant fart</li>
                <li>d) Verifiser energibevaring: <InlineLatex latex="P_{\text{tilf}} = P_{\text{dis}}" /></li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
              <p className="font-semibold text-sm mb-1">Strategi</p>
              <p className="text-sm">
                Bare den ene siden av lengde <InlineLatex latex="w" /> er i feltet og fungerer som en glidende stav: <InlineLatex latex="\mathcal{E} = Bwv" />.
                Alternativt: arealet i feltet minker med rate <InlineLatex latex="dA/dt = -w \cdot v" />, så Faradays lov gir samme resultat.
                Strømretningen bestemmes av Lenz&apos; lov (fluks inn i arket minker).
                Kraften balanserer den magnetiske bremsekraften på den strømførende siden.
                Energibevaring sjekkes ved å sammenligne <InlineLatex latex="Fv" /> og <InlineLatex latex="I^2R" />.
              </p>
            </div>

            <p className="font-semibold text-sm">Løsning</p>
            <p className="text-sm"><strong>Steg 1 — EMF (a):</strong></p>
            <p className="text-sm">Arealet i feltet minker: <InlineLatex latex="dA/dt = -w \cdot v" />, så <InlineLatex latex="\mathcal{E} = B|dA/dt| = Bwv" />:</p>
            <FormulaBox
              latex="|\mathcal{E}| = Bwv = 1{,}5\;\text{T} \cdot 0{,}050\;\text{m} \cdot 3{,}0\;\text{m/s} = \underline{\underline{0{,}225\;\text{V}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 2 — Strøm og retning (b):</strong></p>
            <FormulaBox
              latex="I = \frac{|\mathcal{E}|}{R} = \frac{0{,}225\;\text{V}}{2{,}0\;\Omega} = \underline{\underline{0{,}113\;\text{A}}}"
              variant="gold"
            />
            <p className="text-sm">
              <strong>Retning (Lenz&apos; lov):</strong> Fluks inn i arket <em>minker</em> (sløyfen trekkes ut)
              → indusert strøm forsøker å opprettholde fluksen → lager felt <em>inn i</em> arket
              → strøm <strong>med klokka</strong>.
            </p>

            <p className="text-sm"><strong>Steg 3 — Kraft (c):</strong></p>
            <p className="text-sm">Den strømførende siden (w) i feltet opplever en magnetisk bremsekraft (Lenz!). For konstant fart må vi tilføre like stor kraft:</p>
            <FormulaBox
              latex="F = IwB = 0{,}113\;\text{A} \cdot 0{,}050\;\text{m} \cdot 1{,}5\;\text{T} = \underline{\underline{8{,}44 \times 10^{-3}\;\text{N}}}"
              variant="gold"
            />

            <p className="text-sm"><strong>Steg 4 — Energibevaring (d):</strong></p>
            <FormulaBox
              latex="P_{\text{tilført}} = Fv = 8{,}44\times10^{-3}\;\text{N} \cdot 3{,}0\;\text{m/s} = 0{,}0253\;\text{W}"
              variant="blue"
            />
            <FormulaBox
              latex="P_{\text{dissipiert}} = I^2R = (0{,}113)^2 \cdot 2{,}0 = 0{,}0255\;\text{W} \approx 0{,}0253\;\text{W} \quad \checkmark"
              variant="blue"
            />

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-semibold text-sm mb-1">Svar</p>
              <p className="text-sm">a) <InlineLatex latex="\mathcal{E} = 0{,}225\;\text{V}" /></p>
              <p className="text-sm">b) <InlineLatex latex="I = 0{,}113\;\text{A}" />, strøm med klokka</p>
              <p className="text-sm">c) <InlineLatex latex="F = 8{,}44\;\text{mN}" /></p>
              <p className="text-sm">d) <InlineLatex latex="P_{\text{tilf}} = P_{\text{dis}} \approx 25{,}3\;\text{mW}" /> — energibevaring stemmer!</p>
            </div>

            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-3">
              <p className="font-semibold text-sm mb-1">Hva lærte vi?</p>
              <p className="text-sm">
                Dette er den klassiske eksamensoppgaven som kombinerer Faraday, Lenz og energibevaring i én oppgave.
                Nøkkelen er å innse at bare den ene siden (bredden <InlineLatex latex="w" />) bidrar til EMF —
                de andre sidene beveger seg parallelt med seg selv og bidrar ikke til fluksendringen.
                Kraft × fart (mekanisk inn) = strøm² × resistans (varme ut): ingen energi går tapt, alt omformes!
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}
