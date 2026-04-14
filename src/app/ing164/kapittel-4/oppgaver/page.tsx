"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import CollapsibleSection from "@/components/CollapsibleSection";
import Link from "next/link";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Oppgaver — Newtons lover</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <CollapsibleSection title="Oppgavestrategier">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Generell oppskrift — Newtons lover</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Tegn figur</strong> av den fysiske situasjonen</li>
            <li><strong>Fritt-legeme-diagram</strong> for hvert legeme</li>
            <li><strong>Tegn inn alle krefter</strong> som virker på legemet</li>
            <li><strong>Velg koordinatsystem</strong> — gjerne langs bevegelsesretningen</li>
            <li><strong>Dekomponer</strong> krefter i x- og y-komponenter</li>
            <li><strong>Sett opp</strong> <InlineLatex latex="\sum F_x = ma_x" /> og <InlineLatex latex="\sum F_y = ma_y" /></li>
            <li><strong>Løs likningene</strong></li>
            <li><strong>Vurder svaret</strong> — er fortegn, enhet og størrelsesorden rimelig?</li>
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h4 className="font-semibold text-lg mb-3">Vanlige feil å unngå</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Glemmer krefter i FBD (spesielt normalkraft eller tyngdekraft)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Tegner inn &ldquo;ma&rdquo; som en kraft i diagrammet — akselerasjon er IKKE en kraft!</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Tror N = mg alltid. Det gjelder bare på flatt underlag uten vertikale ekstra-krefter</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Blander kraft-motkraft (virker på ulike legemer) med likevekt (på samme legeme)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Glemmer å velge koordinatsystem og definere positiv retning</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>Inkluderer krefter som virker på <em>andre</em> legemer i FBD-et</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 md:col-span-2">
          <h4 className="font-semibold text-lg mb-3">Sjekkliste: Krafttyper du bør lete etter</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Kontaktkrefter:</p>
              <ul className="space-y-1">
                <li>• <strong>Normalkraft N</strong> — vinkelrett på kontaktflaten</li>
                <li>• <strong>Friksjon R</strong> — langs kontaktflaten, mot bevegelsesretningen</li>
                <li>• <strong>Snordrag S</strong> — langs snoren/tauet</li>
                <li>• <strong>Dyttekraft / Trekkraft F</strong> — påført utenfra</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Fjernkrefter:</p>
              <ul className="space-y-1">
                <li>• <strong>Tyngdekraft G = mg</strong> — alltid loddrett ned</li>
                <li>• Elektrisk kraft (kap. 21+)</li>
                <li>• Magnetisk kraft (kap. 27+)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </CollapsibleSection>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <CollapsibleSection title="Eksempler fra timen">

      <ExerciseCard
        number={1}
        title="Resultantkraft fra tre krefter"
        difficulty="middels"
        source="Forelesning"
        problem={
          <div>
            <p>
              Tre krefter virker på et legeme: <InlineLatex latex="F_1 = 250\;\text{N}" /> i en vinkel 53° over positiv x-akse,{" "}
              <InlineLatex latex="F_2 = 50\;\text{N}" /> langs positiv x-akse, og{" "}
              <InlineLatex latex="F_3 = 120\;\text{N}" /> langs negativ y-akse.
            </p>
            <p className="mt-2">Finn summen <InlineLatex latex="\sum\vec{F}" /> (verdi og retning).</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Dekomponer F₁ i x- og y-komponenter. F₂ og F₃ har bare én komponent hver.</p> },
          { label: "Hint 2", content: <p>Summer x- og y-komponentene separat, finn deretter resultanten med Pythagoras.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="F_1 = 250\;\text{N}" /> — 53° over positiv x-akse</li>
                <li><InlineLatex latex="F_2 = 50\;\text{N}" /> — langs positiv x-akse</li>
                <li><InlineLatex latex="F_3 = 120\;\text{N}" /> — langs negativ y-akse</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Størrelsen <InlineLatex latex="|\sum\vec{F}|" /> til resultantkraften</li>
                <li>Retningen <InlineLatex latex="\alpha" /> (vinkel relativt til aksene)</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Vi bruker <strong>komponentmetoden</strong>: dekomponer hver kraft i x- og y-komponenter,
                summer komponentene separat, og finn resultanten med Pythagoras.
                Retningen bestemmes med arctangent. Dette er den systematiske fremgangsmåten
                for alle vektorsummer.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span>Summer x-komponentene. <InlineLatex latex="F_1" /> bidrar negativt siden vinkelen er i 2. kvadrant:</span>
                  <FormulaBox latex="\sum F_x = F_2 + F_1\cos(180°-53°) = 50 - 250\cos 53° = 50 - 150 = -100\;\text{N}" variant="blue" />
                </li>
                <li>
                  <span>Summer y-komponentene. <InlineLatex latex="F_1" /> bidrar oppover, <InlineLatex latex="F_3" /> nedover:</span>
                  <FormulaBox latex="\sum F_y = F_1\sin 53° - F_3 = 250 \cdot 0{,}800 - 120 = 200 - 120 = 80\;\text{N}" variant="blue" />
                </li>
                <li>
                  <span>Finn resultantens størrelse med Pythagoras:</span>
                  <FormulaBox latex="\left|\sum\vec{F}\right| = \sqrt{(-100)^2 + 80^2} = \sqrt{10000 + 6400} = \sqrt{16400} \approx \underline{\underline{128\;\text{N}}}" variant="gold" />
                </li>
                <li>
                  <span>Finn retningen (vinkelen over negativ x-akse, 2. kvadrant):</span>
                  <FormulaBox latex="\tan\alpha = \frac{|\sum F_y|}{|\sum F_x|} = \frac{80}{100} = 0{,}80 \;\Rightarrow\; \alpha = \arctan(0{,}80) \approx \underline{\underline{39°}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="\left|\sum\vec{F}\right| = \underline{\underline{128\;\text{N}}}, \quad \alpha = \underline{\underline{39°}} \text{ over negativ x-akse (2. kvadrant)}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                Komponentmetoden er den universelle teknikken for å legge sammen krafter:
                (1) dekomponer alle krefter i x og y, (2) summer komponentene separat,
                (3) bygg resultanten med Pythagoras og arctangent. Vær nøye med fortegn
                — bruk koordinatsystemet, ikke intuisjon, til å bestemme om en komponent er positiv eller negativ.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Ishockeypuck — F = ma"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En ishockeypuck med masse <InlineLatex latex="m = 0{,}2\;\text{kg}" /> dyttes horisontalt med en kraft{" "}
              <InlineLatex latex="F = 100\;\text{N}" /> på friksjonsløs is. Finn akselerasjonen.
            </p>
          </div>
        }
        hints={[
          { label: "Hint", content: <p>Vertikalt: N = G (likevekt). Horisontalt: bare F virker.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 0{,}2\;\text{kg}" /> — massen til pucken</li>
                <li><InlineLatex latex="F = 100\;\text{N}" /> — horisontal påført kraft</li>
                <li>Friksjonsløs is — ingen friksjonskraft horisontalt</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Akselerasjonen <InlineLatex latex="a" /> til pucken</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Vi bruker <strong>Newtons 2. lov</strong>: <InlineLatex latex="\sum F = ma" />.
                Vertikalt er det likevekt (<InlineLatex latex="N = mg" />), så normalkraften og tyngdekraften
                kansellerer hverandre. Horisontalt er <InlineLatex latex="F" /> den eneste kraften, og den gir
                direkte akselerasjonen via <InlineLatex latex="a = F/m" />.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span>FBD-analyse: tre krefter virker på pucken. Vertikalt likevekt gir:</span>
                  <FormulaBox latex="\sum F_y = 0:\quad N - mg = 0 \;\Rightarrow\; N = mg = 0{,}2 \cdot 9{,}81 = 1{,}96\;\text{N}" variant="blue" />
                </li>
                <li>
                  <span>Horisontalt er kun <InlineLatex latex="F" /> til stede. Bruk Newtons 2. lov:</span>
                  <FormulaBox latex="\sum F_x = ma:\quad F = ma \;\Rightarrow\; a = \frac{F}{m} = \frac{100\;\text{N}}{0{,}2\;\text{kg}} = \underline{\underline{500\;\text{m/s}^2}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="a = \underline{\underline{500\;\text{m/s}^2}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                På friksjonsløst underlag er eneste horisontale kraft den påførte — dette forenkler
                <InlineLatex latex="\sum F = ma" /> til <InlineLatex latex="a = F/m" /> direkte.
                Legg merke til den enorme akselerasjonen: liten masse pluss stor kraft gir ekstrem akselerasjon.
                Sjekk alltid enheten: N/kg = (kg·m/s²)/kg = m/s². ✓
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="Bil akselererer"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              En bil med masse <InlineLatex latex="m = 1200\;\text{kg}" /> akselererer med{" "}
              <InlineLatex latex="a = 1{,}3\;\text{m/s}^2" />. Finn kraftsummen på bilen.
            </p>
          </div>
        }
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 1200\;\text{kg}" /> — bilens masse</li>
                <li><InlineLatex latex="a = 1{,}3\;\text{m/s}^2" /> — akselerasjon fremover</li>
                <li>Bevegelse langs horisontal vei</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Den resulterende kraftsummen <InlineLatex latex="\sum F" /> som gir bilen akselerasjonen</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Vi bruker <strong>Newtons 2. lov</strong> i den enkle formen <InlineLatex latex="\sum F = ma" />.
                Her er akselerasjon og masse gitt, og vi er ute etter kraft-summen — dette er den enkleste
                anvendelsen av N2L: multipliser rett frem.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span>FBD: normalkraft <InlineLatex latex="N" /> (opp), tyngde <InlineLatex latex="mg" /> (ned) kansellerer vertikalt. Horisontalt gir netto drivkraft akselerasjonen:</span>
                  <FormulaBox latex="\sum F = ma = 1200\;\text{kg} \cdot 1{,}3\;\text{m/s}^2 = \underline{\underline{1560\;\text{N}}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="\sum F = \underline{\underline{1560\;\text{N}}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                Newtons 2. lov er symmetrisk: vi kan bruke den til å finne <InlineLatex latex="F" /> når
                vi vet <InlineLatex latex="m" /> og <InlineLatex latex="a" />, eller til å finne <InlineLatex latex="a" /> når
                vi vet <InlineLatex latex="F" /> og <InlineLatex latex="m" />. Her er kraftsummen
                den netto horisontale kraften som faktisk akselererer bilen — altså differansen
                mellom drivkraft og friksjon.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={4}
        title="Tyngde på jord og måne"
        difficulty="lett"
        source="Forelesning"
        problem={
          <div>
            <p>
              Fysikklæreren har masse 75 kg. Hva er tyngden på jorda? På månen
              (<InlineLatex latex="g_{\text{m}} = 1{,}6\;\text{m/s}^2" />)?
            </p>
          </div>
        }
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 75\;\text{kg}" /> — massen til læreren (samme overalt i universet)</li>
                <li><InlineLatex latex="g_{\text{jord}} = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjonen på jorda</li>
                <li><InlineLatex latex="g_{\text{måne}} = 1{,}6\;\text{m/s}^2" /> — tyngdeakselerasjonen på månen</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Tyngden <InlineLatex latex="G_{\text{jord}}" /> på jordens overflate</li>
                <li>Tyngden <InlineLatex latex="G_{\text{måne}}" /> på månens overflate</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Tyngde er gravitasjonskraften på legemet: <InlineLatex latex="G = mg" />, der <InlineLatex latex="g" /> er
                den lokale tyngdeakselerasjonen. Masse er en iboende egenskap ved legemet og endrer seg ikke,
                men tyngden varierer med <InlineLatex latex="g" /> på stedet. Dette er et grunnleggende
                skille mellom masse og vekt.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span>Tyngde på jorda — bruk <InlineLatex latex="G = mg" /> med jordens <InlineLatex latex="g" />:</span>
                  <FormulaBox latex="G_{\text{jord}} = mg_{\text{jord}} = 75\;\text{kg} \cdot 9{,}81\;\text{m/s}^2 = \underline{\underline{736\;\text{N}}}" variant="blue" />
                </li>
                <li>
                  <span>Tyngde på månen — samme formel, men månens <InlineLatex latex="g_{\text{m}}" />:</span>
                  <FormulaBox latex="G_{\text{måne}} = mg_{\text{måne}} = 75\;\text{kg} \cdot 1{,}6\;\text{m/s}^2 = \underline{\underline{120\;\text{N}}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="G_{\text{jord}} = \underline{\underline{736\;\text{N}}}, \qquad G_{\text{måne}} = \underline{\underline{120\;\text{N}}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                <strong>Masse ≠ vekt (tyngde).</strong> Massen er 75 kg uansett — på jorda, på månen, i verdensrommet.
                Tyngden er kraften gravitasjonen utøver på legemet og er proporsjonal med den lokale <InlineLatex latex="g" />.
                På månen er <InlineLatex latex="g_{\text{m}} \approx g/6" />, så tyngden er bare 16 % av jordens.
                Vekten du leser av en badevekt er egentlig normalkraften, ikke massen.
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
          <p className="text-xs text-[var(--muted)]">Vår 2023</p>
        </Link>
        <Link href="/ing164/eksamen/obliger" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-amber-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>
            <h4 className="font-semibold">Oppgaver fra obliger</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Oblig 1, oppgave 3</p>
        </Link>
        <Link href="/ing164/eksamen/oppgaver" className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/50 hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            <h4 className="font-semibold">Oppgaver fra boken</h4>
          </div>
          <p className="text-xs text-[var(--muted)]">Kapittel 4</p>
        </Link>
      </div>
    </div>
  );
}
