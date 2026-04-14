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
      <div className="space-y-6">
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
      </CollapsibleSection>

      <CollapsibleSection title="Eksempler fra timen">
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
      </CollapsibleSection>

      {/* ── Relaterte oppgaver ── */}
      <h3 className="text-xl font-semibold mb-4">Relaterte oppgaver</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/ing164/eksamen/eksamener" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-red-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            <h4 className="font-semibold">Eksamensoppgaver</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Vår 2017, Høst 2016</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Ikke direkte dekket</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver/kapittel-29" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 29</p>
        </Link>
      </div>
    </div>
  );
}
