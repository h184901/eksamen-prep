"use client";

import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

export default function OppgaverPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-6 mb-6">Oppgaver — Newtons lover</h2>

      {/* ── OPPGAVESTRATEGIER ── */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Oppgavestrategier</h3>

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

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Gjennomgåtte eksempler</h3>

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

      {/* ── ØVINGSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Øvingsoppgaver</h3>

      <ExerciseCard
        number={1}
        title="Vogn på skinne — FBD og maks akselerasjon"
        difficulty="middels"
        source="Oblig 1, Oppgave 3c–d"
        problem={
          <div>
            <p>
              Vi bruker et tau til å trekke en vogn med masse 1000 kg. Vogna
              ruller med neglisjerbar friksjon på en horisontal skinnegang.
            </p>
            <p className="mt-2">c) Tegn et fritt-legeme-diagram for vogna og sett navn på alle kreftene. Regn ut verdier du har nok opplysninger til.</p>
            <p>d) Tauet vil ryke dersom snordraget overskrider 3500 N. Hvilken akselerasjon kan vi maksimalt gi vogna uten at tauet ryker?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Tre krefter virker på vogna: N (opp), mg (ned), S (horisontalt fra tauet).</p> },
          { label: "Hint 2", content: <p>Vertikalt likevekt gir N. Horisontalt: ΣF = ma → S = ma.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 1000\;\text{kg}" /> — vognens masse</li>
                <li>Neglisjerbar friksjon — ingen friksjonskraft horisontalt</li>
                <li><InlineLatex latex="S_{\max} = 3500\;\text{N}" /> — maksimalt snordrag før tauet ryker</li>
                <li>Horisontal skinnegang — bevegelse kun i x-retning</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>c) Fritt-legeme-diagram og verdier vi kan beregne</li>
                <li>d) Maksimal akselerasjon <InlineLatex latex="a_{\max}" /> uten at tauet ryker</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Vi starter med FBD og identifiserer alle krefter: normalkraft <InlineLatex latex="N" />, tyngde <InlineLatex latex="mg" />
                og snordrag <InlineLatex latex="S" />. Vertikalt er det likevekt (<InlineLatex latex="\sum F_y = 0" />), som gir oss <InlineLatex latex="N" />.
                Horisontalt er eneste kraft snordraget: <InlineLatex latex="S = ma" />, som omformulert gir <InlineLatex latex="a = S/m" />.
                Maksimal akselerasjon nås når <InlineLatex latex="S = S_{\max}" />.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span><strong>c)</strong> FBD-krefter: normalkraft <InlineLatex latex="N" /> (opp), tyngde <InlineLatex latex="mg" /> (ned), snordrag <InlineLatex latex="S" /> (horisontalt). Vertikalt er det likevekt:</span>
                  <FormulaBox latex="\sum F_y = 0:\quad N - mg = 0 \;\Rightarrow\; N = mg = 1000 \cdot 9{,}81 = \underline{\underline{9810\;\text{N}}}" variant="blue" />
                </li>
                <li>
                  <span>Snordrag <InlineLatex latex="S" /> kan ikke bestemmes uten kjent akselerasjon — vi setter det som ukjent i d).</span>
                </li>
                <li>
                  <span><strong>d)</strong> Horisontalt gir Newtons 2. lov: <InlineLatex latex="S = ma" />. Maksimal akselerasjon skjer når <InlineLatex latex="S = S_{\max}" />:</span>
                  <FormulaBox latex="\sum F_x = ma:\quad S_{\max} = ma_{\max} \;\Rightarrow\; a_{\max} = \frac{S_{\max}}{m} = \frac{3500\;\text{N}}{1000\;\text{kg}} = \underline{\underline{3{,}5\;\text{m/s}^2}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="N = \underline{\underline{9810\;\text{N}}}, \qquad a_{\max} = \underline{\underline{3{,}5\;\text{m/s}^2}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                FBD er ikke bare en tegneøvelse — det tvinger oss til å identifisere nøyaktig hvilke
                krefter som virker i hvilken retning. Her lar vi N2L fortelle oss hva maksimal akselerasjon
                er gitt en begrensning på kraften. Merk: snordraget i et masseløst tau er konstant overalt
                i tauet og lik den påførte trekkraften.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Person i heis"
        difficulty="middels"
        problem={
          <div>
            <p>
              En person med masse 70 kg står på en vekt i en heis. Heisen akselererer oppover med{" "}
              <InlineLatex latex="a = 2{,}0\;\text{m/s}^2" />.
            </p>
            <p className="mt-2">a) Tegn FBD for personen.</p>
            <p>b) Hva viser vekten?</p>
            <p>c) Hva viser vekten når heisen akselererer nedover med 2,0 m/s²?</p>
            <p>d) Hva viser vekten i fritt fall?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Vekten viser normalkraften N, ikke tyngden mg.</p> },
          { label: "Hint 2", content: <p>Sett opp ΣFy = may med positiv retning oppover.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 70\;\text{kg}" /> — personens masse</li>
                <li><InlineLatex latex="g = 9{,}81\;\text{m/s}^2" /> — tyngdeakselerasjon</li>
                <li>b) <InlineLatex latex="a = +2{,}0\;\text{m/s}^2" /> (oppover, positiv retning)</li>
                <li>c) <InlineLatex latex="a = -2{,}0\;\text{m/s}^2" /> (nedover)</li>
                <li>d) <InlineLatex latex="a = -g = -9{,}81\;\text{m/s}^2" /> (fritt fall)</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>Normalkraften <InlineLatex latex="N" /> som vekten viser, for hver situasjon</li>
                <li>a) FBD for personen i heisen</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Nøkkelinsikt: <strong>vekten måler normalkraften <InlineLatex latex="N" /></strong>, ikke tyngden.
                Vi bruker Newtons 2. lov vertikalt: <InlineLatex latex="\sum F_y = ma_y" /> der positiv retning er oppover.
                Dette gir <InlineLatex latex="N - mg = ma" />, og vi løser for <InlineLatex latex="N = m(g + a)" />.
                Fortegnet på <InlineLatex latex="a" /> avgjør om man føler seg tyngre eller lettere.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span><strong>a) FBD:</strong> normalkraft <InlineLatex latex="N" /> (opp fra vektflaten), tyngde <InlineLatex latex="mg" /> (ned). Disse er de eneste to kreftene.</span>
                </li>
                <li>
                  <span><strong>b)</strong> Akselerasjon oppover (<InlineLatex latex="a = +2{,}0\;\text{m/s}^2" />). Newtons 2. lov vertikalt:</span>
                  <FormulaBox latex="\sum F_y = ma:\quad N - mg = ma \;\Rightarrow\; N = m(g + a) = 70(9{,}81 + 2{,}0) = 70 \cdot 11{,}81 = \underline{\underline{827\;\text{N}}}" variant="blue" />
                </li>
                <li>
                  <span><strong>c)</strong> Akselerasjon nedover (<InlineLatex latex="a = -2{,}0\;\text{m/s}^2" />):</span>
                  <FormulaBox latex="N = m(g + a) = 70(9{,}81 - 2{,}0) = 70 \cdot 7{,}81 = \underline{\underline{547\;\text{N}}}" variant="blue" />
                </li>
                <li>
                  <span><strong>d)</strong> Fritt fall (<InlineLatex latex="a = -g" />):</span>
                  <FormulaBox latex="N = m(g + a) = m(g - g) = m \cdot 0 = \underline{\underline{0\;\text{N}}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="N_b = \underline{\underline{827\;\text{N}}},\quad N_c = \underline{\underline{547\;\text{N}}},\quad N_d = \underline{\underline{0\;\text{N}}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                Heis-problemet er det klassiske eksemplet på at <strong>opplevd tyngde er normalkraften</strong>, ikke gravitasjonskraften.
                Formelen <InlineLatex latex="N = m(g + a)" /> er gull: akselerasjon oppover gir <InlineLatex latex="N > mg" /> (du føler deg tyngre),
                nedover gir <InlineLatex latex="N < mg" /> (lettere), og fritt fall gir <InlineLatex latex="N = 0" /> (vektløshet).
                Husk å definere positiv retning konsekvent FØR du setter inn tall.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={3}
        title="To klosser på friksjonsløst underlag"
        difficulty="middels"
        problem={
          <div>
            <p>
              To klosser med masser <InlineLatex latex="m_1 = 4{,}0\;\text{kg}" /> og{" "}
              <InlineLatex latex="m_2 = 6{,}0\;\text{kg}" /> står inntil hverandre på et friksjonsløst underlag.
              En kraft <InlineLatex latex="F = 30\;\text{N}" /> dyttes mot <InlineLatex latex="m_1" />.
            </p>
            <p className="mt-2">a) Finn akselerasjonen til systemet.</p>
            <p>b) Finn kontaktkraften mellom klossene.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Begge klossene har samme akselerasjon (beveger seg som ett system).</p> },
          { label: "Hint 2", content: <p>For å finne kontaktkraften: tegn FBD for m₂ alene.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m_1 = 4{,}0\;\text{kg}" /> — masse til kloss 1 (kraften påføres denne)</li>
                <li><InlineLatex latex="m_2 = 6{,}0\;\text{kg}" /> — masse til kloss 2</li>
                <li><InlineLatex latex="F = 30\;\text{N}" /> — horisontal kraft på <InlineLatex latex="m_1" /></li>
                <li>Friksjonsløst underlag — ingen friksjonskraft</li>
                <li>Klossene er i kontakt — beveger seg med lik akselerasjon</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Systemets akselerasjon <InlineLatex latex="a" /></li>
                <li>b) Kontaktkraften <InlineLatex latex="K" /> mellom klossene</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                <strong>a)</strong> Behandle hele systemet som ett legeme: <InlineLatex latex="F = (m_1 + m_2)a" />.
                <strong> b)</strong> For å finne kontaktkraften isolerer vi én kloss. FBD for <InlineLatex latex="m_2" />:
                eneste horisontale kraft er kontaktkraften <InlineLatex latex="K" /> (fra <InlineLatex latex="m_1" /> via N3L).
                Siden vi vet <InlineLatex latex="a" /> fra a), gir <InlineLatex latex="K = m_2 a" /> svaret.
                Vi sjekker med N3L: <InlineLatex latex="m_1" /> opplever <InlineLatex latex="F - K" /> som skal gi <InlineLatex latex="m_1 a" />.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span><strong>a)</strong> Behandle systemet som ett legeme med total masse <InlineLatex latex="m_1 + m_2" />:</span>
                  <FormulaBox latex="\sum F = (m_1 + m_2)a \;\Rightarrow\; a = \frac{F}{m_1 + m_2} = \frac{30\;\text{N}}{4{,}0 + 6{,}0\;\text{kg}} = \frac{30}{10} = \underline{\underline{3{,}0\;\text{m/s}^2}}" variant="blue" />
                </li>
                <li>
                  <span><strong>b)</strong> FBD for <InlineLatex latex="m_2" /> alene: eneste horisontale kraft er kontaktkraften <InlineLatex latex="K" /> fra <InlineLatex latex="m_1" />:</span>
                  <FormulaBox latex="\sum F_x = m_2 a:\quad K = m_2 a = 6{,}0\;\text{kg} \cdot 3{,}0\;\text{m/s}^2 = \underline{\underline{18\;\text{N}}}" variant="gold" />
                </li>
                <li>
                  <span>Sjekk med N3L for <InlineLatex latex="m_1" /> — netto kraft på <InlineLatex latex="m_1" /> skal gi <InlineLatex latex="m_1 a" />:</span>
                  <FormulaBox latex="F - K = m_1 a:\quad 30 - 18 = 12\;\text{N} = 4{,}0 \cdot 3{,}0 = 12\;\text{N} \;\checkmark" variant="blue" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="a = \underline{\underline{3{,}0\;\text{m/s}^2}}, \qquad K = \underline{\underline{18\;\text{N}}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                Nøkkelteknikken for sammenkoblede legemer: (1) finn systemets akselerasjon ved å behandle
                alt som ett legeme, (2) isola ett legeme for å finne indre krefter. Merk at kontaktkraften
                er proporsjonal med <em>den drevne massens</em> andel av total masse:
                <InlineLatex latex="K = F \cdot m_2/(m_1+m_2) = 30 \cdot 0{,}6 = 18\;\text{N}" />.
                Newtons 3. lov bekrefter alltid: <InlineLatex latex="m_2" /> dytter tilbake på <InlineLatex latex="m_1" /> med 18 N.
              </p>
            </div>
          </div>
        }
      />

      {/* ── EKSAMENSOPPGAVER ── */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Eksamensoppgaver</h3>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mb-6">
        <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — Kapittel 4</p>
        <ul className="space-y-1 text-sm">
          <li>• Newtons lover dukker opp i nesten ALLE mekanikkoppgaver — vær trygg på FBD</li>
          <li>• Start alltid med FBD og velg koordinatsystem FØR du skriver likninger</li>
          <li>• Husk: &ldquo;ma&rdquo; er IKKE en kraft — det er resultatet av kraftsummen</li>
          <li>• Ved sammenkoblede legemer: ett FBD per legeme, koble med N3L</li>
        </ul>
      </div>

      <ExerciseCard
        number={1}
        title="Bremsende bil — Newtons 2. lov"
        difficulty="middels"
        source="Eksamen Høst 2023, Oppgave 2b"
        problem={
          <div>
            <p>
              En bil med masse 1500 kg kjører med fart 72 km/h når motoren kobles ut.
              Bilen stopper etter 50 m pga. friksjon.
            </p>
            <p className="mt-2">a) Hvor stor er friksjonskraften?</p>
            <p>b) Hvor lang tid tok nedbremsingen?</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>Regn ut akselerasjonen fra kinematikk: v² = v₀² + 2as med v = 0.</p> },
          { label: "Hint 2", content: <p>Bruk deretter ΣF = ma for å finne friksjonskraften.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 1500\;\text{kg}" /> — bilens masse</li>
                <li><InlineLatex latex="v_0 = 72\;\text{km/h} = 20\;\text{m/s}" /> — startfart (konverter: 72/3,6 = 20)</li>
                <li><InlineLatex latex="v = 0\;\text{m/s}" /> — sluttfart (bilen stopper)</li>
                <li><InlineLatex latex="s = 50\;\text{m}" /> — bremselengde</li>
                <li>Eneste horisontal kraft er friksjon (motoren koblet ut)</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Friksjonskraften <InlineLatex latex="R" /></li>
                <li>b) Bremsetiden <InlineLatex latex="t" /></li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Dette er et to-stegs problem som kombinerer kinematikk (kap. 2) og Newtons 2. lov (kap. 4).
                <strong> Steg 1:</strong> Finn akselerasjonen fra kinematikk med <InlineLatex latex="v^2 = v_0^2 + 2as" />.
                <strong> Steg 2:</strong> Bruk <InlineLatex latex="\sum F = ma" /> til å finne friksjonskraften.
                Tid finner vi fra <InlineLatex latex="v = v_0 + at" />. Kombinasjonen av disse to kapitlene
                er svært vanlig på eksamen.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span>Konverter hastighet: <InlineLatex latex="v_0 = 72\;\text{km/h} \div 3{,}6 = 20\;\text{m/s}" /></span>
                </li>
                <li>
                  <span>Finn akselerasjonen fra kinematikk (<InlineLatex latex="v = 0" /> ved stopp):</span>
                  <FormulaBox latex="v^2 = v_0^2 + 2as \;\Rightarrow\; 0 = 400 + 2a \cdot 50 \;\Rightarrow\; a = \frac{-400}{100} = -4{,}0\;\text{m/s}^2" variant="blue" />
                </li>
                <li>
                  <span><strong>a)</strong> Bruk Newtons 2. lov — friksjonskraften er eneste horisontale kraft, rettet bakover:</span>
                  <FormulaBox latex="\sum F_x = ma:\quad -R = ma \;\Rightarrow\; R = m|a| = 1500\;\text{kg} \cdot 4{,}0\;\text{m/s}^2 = \underline{\underline{6000\;\text{N} = 6{,}0\;\text{kN}}}" variant="gold" />
                </li>
                <li>
                  <span><strong>b)</strong> Finn bremsetiden fra kinematikk:</span>
                  <FormulaBox latex="v = v_0 + at \;\Rightarrow\; 0 = 20 + (-4{,}0)t \;\Rightarrow\; t = \frac{20}{4{,}0} = \underline{\underline{5{,}0\;\text{s}}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="R = \underline{\underline{6{,}0\;\text{kN}}}, \qquad t = \underline{\underline{5{,}0\;\text{s}}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                Eksamen kombinerer ofte kinematikk og Newtons lover. Oppskriften: (1) bruk kinematikk
                til å finne akselerasjonen, (2) bruk N2L til å koble akselerasjon til kraft.
                Husk å konvertere km/h til m/s FØR du setter inn i formler (<InlineLatex latex="\div 3{,}6" />).
                Sjekk fortegn: negativ akselerasjon = bremsing = friksjon er rettet mot bevegelsesretningen.
              </p>
            </div>
          </div>
        }
      />

      <ExerciseCard
        number={2}
        title="Pakke i tau — likevekt"
        difficulty="middels"
        source="Eksamensrelevant"
        problem={
          <div>
            <p>
              En pakke med masse <InlineLatex latex="m = 50\;\text{kg}" /> henger i et masseløst tau
              fra taket. Under pakken henger et nytt tau ned til en krok i gulvet.
            </p>
            <p className="mt-2">a) Finn snordraget i begge tauene.</p>
            <p>b) Hva hvis det øvre tauet har masse 12 kg? Finn snordraget i topp og bunn av tauet.</p>
          </div>
        }
        hints={[
          { label: "Hint 1", content: <p>FBD for pakken: S₁ (oppover), G (nedover). Det nedre tauet har null drag (henger fritt).</p> },
          { label: "Hint 2", content: <p>Når tauet har masse: tegn FBD for tauet og bruk N3L mellom tau og pakke.</p> },
        ]}
        solution={
          <div className="space-y-4">
            {/* Steg 1: Hva vet vi? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva vet vi?</p>
              <ul className="space-y-1 text-sm">
                <li><InlineLatex latex="m = 50\;\text{kg}" /> — pakkens masse</li>
                <li>a) Øvre tau er masseløst; nedre tau henger med slakk (ikke spent)</li>
                <li>b) Øvre tau har masse <InlineLatex latex="m_\tau = 12\;\text{kg}" /></li>
                <li>Systemet er i statisk likevekt — akselerasjon = 0</li>
              </ul>
            </div>

            {/* Steg 2: Hva skal vi finne? */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
              <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Hva skal vi finne?</p>
              <ul className="space-y-1 text-sm">
                <li>a) Snordrag i øvre tau <InlineLatex latex="S_1" /> og nedre tau <InlineLatex latex="S_2" /></li>
                <li>b) Snordrag i toppen og bunnen av et massivt øvre tau</li>
              </ul>
            </div>

            {/* Steg 3: Strategi */}
            <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Strategi</p>
              <p className="text-sm">
                Likevektsoppgave: <InlineLatex latex="\sum F = 0" /> for hvert legeme.
                <strong> a)</strong> Nedre tau er ikke spent (ingen krok trekker nedover), så <InlineLatex latex="S_2 = 0" />.
                FBD for pakken gir <InlineLatex latex="S_1 = mg" />. I et masseløst tau er draget konstant.
                <strong> b)</strong> Tauet har egen vekt som must bæres av festepunktet øverst.
                Bunnen av tauet bærer bare pakken; toppen bærer pakken pluss tauets vekt.
              </p>
            </div>

            {/* Steg 4: Løsning */}
            <div>
              <p className="font-semibold mb-2">Løsning</p>
              <ol className="space-y-3 list-decimal list-inside text-sm">
                <li>
                  <span><strong>a)</strong> Nedre tau: ingen krok i gulvet trekker ned — tauet er slakt, snordrag <InlineLatex latex="S_2 = 0\;\text{N}" />.</span>
                </li>
                <li>
                  <span>FBD for pakken: <InlineLatex latex="S_1" /> (opp) og <InlineLatex latex="mg" /> (ned). Likevekt gir:</span>
                  <FormulaBox latex="\sum F_y = 0:\quad S_1 - mg = 0 \;\Rightarrow\; S_1 = mg = 50 \cdot 9{,}81 = \underline{\underline{491\;\text{N}}}" variant="blue" />
                </li>
                <li>
                  <span><strong>b)</strong> Tauet med masse 12 kg. Bunnen av tauet bærer bare pakken (via N3L fra pakken opp mot bunnen av tauet):</span>
                  <FormulaBox latex="S_{\text{bunn}} = mg = 50 \cdot 9{,}81 = \underline{\underline{491\;\text{N}}}" variant="blue" />
                </li>
                <li>
                  <span>FBD for hele tauet: toppen bærer pakken + tauets vekt:</span>
                  <FormulaBox latex="S_{\text{topp}} = (m + m_\tau)g = (50 + 12) \cdot 9{,}81 = 62 \cdot 9{,}81 = \underline{\underline{608\;\text{N}}}" variant="gold" />
                </li>
              </ol>
            </div>

            {/* Steg 5: Svar */}
            <div>
              <p className="font-semibold mb-1">Svar</p>
              <FormulaBox latex="\text{a)}\; S_1 = \underline{\underline{491\;\text{N}}},\; S_2 = \underline{\underline{0\;\text{N}}};\quad \text{b)}\; S_{\text{bunn}} = \underline{\underline{491\;\text{N}}},\; S_{\text{topp}} = \underline{\underline{608\;\text{N}}}" variant="gold" />
            </div>

            {/* Steg 6: Hva lærte vi? */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva lærte vi?</p>
              <p className="text-sm">
                I et masseløst tau er snordraget konstant overalt — men i et tau <em>med masse</em> varierer draget
                langs tauet. Toppen bærer alt (pakke + tau), bunnen bærer bare pakken. Generell regel:
                <InlineLatex latex="S(y) = g \cdot (\text{total masse nedenfor})" /> — draget øker lineært oppover i tauet.
                Newtons 3. lov sikrer at pakken trekker ned på tauet med samme kraft som tauet trekker opp på pakken.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}
