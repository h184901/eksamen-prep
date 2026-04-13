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
          <div className="space-y-3">
            <p><strong>Steg 1: Dekomponer og summer</strong></p>
            <FormulaBox latex="\sum F_x = F_2 - F_1\cos 53° = 50 - 250\cos 53° = -100\;\text{N}" variant="blue" />
            <FormulaBox latex="\sum F_y = F_1\sin 53° - F_3 = 250\sin 53° - 120 = 80\;\text{N}" variant="blue" />

            <p><strong>Steg 2: Resultantens størrelse</strong></p>
            <FormulaBox latex="\sum F = \sqrt{(-100)^2 + 80^2} = \sqrt{16400} = \underline{\underline{128\;\text{N}}}" variant="gold" />

            <p><strong>Steg 3: Retning</strong></p>
            <FormulaBox latex="\tan\alpha = \frac{80}{100} = 0{,}8 \;\Rightarrow\; \alpha = \underline{\underline{39°}}" variant="gold" />
            <p className="text-sm">Resultanten peker 39° over negativ x-akse (2. kvadrant).</p>
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
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong> F = 100 N, m = 0,2 kg, friksjonsløs → kun F horisontalt.</p>
            <p><strong>FBD:</strong> N (opp), G (ned), F (til høyre). N = G → likevekt vertikalt.</p>
            <FormulaBox latex="\sum F_x = F = ma \;\Rightarrow\; a = \frac{F}{m} = \frac{100}{0{,}2} = \underline{\underline{500\;\text{m/s}^2}}" variant="gold" />
            <p className="text-sm"><strong>Hva lærte vi?</strong> Små masse + stor kraft = enorm akselerasjon. Sjekk: enheten N/kg = m/s² stemmer.</p>
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
          <div className="space-y-3">
            <FormulaBox latex="\sum F = ma = 1200 \cdot 1{,}3 = \underline{\underline{1560\;\text{N}}}" variant="gold" />
            <p className="text-sm">
              <strong>FBD:</strong> N (opp), G (ned), drivkraft R (fremover). N = G vertikalt.
              Kraftsummen er horisontalt fremover.
            </p>
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
          <div className="space-y-3">
            <FormulaBox latex="G_{\text{jord}} = mg = 75 \cdot 9{,}81 = \underline{\underline{736\;\text{N}}}" variant="gold" />
            <FormulaBox latex="G_{\text{måne}} = mg_{\text{m}} = 75 \cdot 1{,}6 = \underline{\underline{120\;\text{N}}}" variant="gold" />
            <p className="text-sm">Massen er 75 kg begge steder. Tyngden på månen er bare 16% av tyngden på jorda.</p>
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
          <div className="space-y-3">
            <p><strong>c) Fritt-legeme-diagram:</strong></p>
            <p className="text-sm">Krefter på vogna: Normalkraft <InlineLatex latex="N" /> (opp), tyngde <InlineLatex latex="mg" /> (ned), snordrag <InlineLatex latex="S" /> (horisontalt).</p>
            <FormulaBox latex="\sum F_y = 0: \quad N - mg = 0 \;\Rightarrow\; N = mg = 1000 \cdot 9{,}81 = \underline{\underline{9810\;\text{N}}}" variant="blue" />
            <p className="text-sm">Vi kan ikke finne S uten å vite akselerasjonen.</p>

            <p><strong>d) Maks akselerasjon:</strong></p>
            <FormulaBox latex="\sum F_x = ma: \quad S = ma \;\Rightarrow\; a_{\max} = \frac{S_{\max}}{m} = \frac{3500}{1000} = \underline{\underline{3{,}5\;\text{m/s}^2}}" variant="gold" />
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
          <div className="space-y-3">
            <p><strong>a) FBD:</strong> N (opp fra vekten), mg (ned). To krefter.</p>

            <p><strong>b) Akselerasjon oppover (a = +2,0 m/s²):</strong></p>
            <FormulaBox latex="\sum F_y = ma_y: \quad N - mg = ma" variant="blue" />
            <FormulaBox latex="N = m(g + a) = 70(9{,}81 + 2{,}0) = \underline{\underline{827\;\text{N}}}" variant="gold" />
            <p className="text-sm">Vekten viser mer enn tyngden — du føler deg &ldquo;tyngre&rdquo;.</p>

            <p><strong>c) Akselerasjon nedover (a = −2,0 m/s²):</strong></p>
            <FormulaBox latex="N = m(g - a) = 70(9{,}81 - 2{,}0) = \underline{\underline{547\;\text{N}}}" variant="gold" />
            <p className="text-sm">Vekten viser mindre enn tyngden — du føler deg &ldquo;lettere&rdquo;.</p>

            <p><strong>d) Fritt fall (a = g):</strong></p>
            <FormulaBox latex="N = m(g - g) = \underline{\underline{0\;\text{N}}}" variant="gold" />
            <p className="text-sm">Vektløshet! Vekten viser null. Du svever fritt.</p>
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
          <div className="space-y-3">
            <p><strong>a) System som helhet:</strong></p>
            <FormulaBox latex="F = (m_1 + m_2)a \;\Rightarrow\; a = \frac{F}{m_1 + m_2} = \frac{30}{10} = \underline{\underline{3{,}0\;\text{m/s}^2}}" variant="gold" />

            <p><strong>b) FBD for m₂ alene:</strong></p>
            <p className="text-sm">Eneste horisontale kraft på m₂ er kontaktkraften K fra m₁:</p>
            <FormulaBox latex="K = m_2 a = 6{,}0 \cdot 3{,}0 = \underline{\underline{18\;\text{N}}}" variant="gold" />
            <p className="text-sm"><strong>Sjekk med m₁:</strong> <InlineLatex latex="F - K = m_1 a \Rightarrow 30 - 18 = 12 = 4{,}0 \cdot 3{,}0" /> ✓</p>
            <p className="text-sm"><strong>N3L-sjekk:</strong> m₂ dytter tilbake på m₁ med 18 N (like stor, motsatt rettet). ✓</p>
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
          <div className="space-y-3">
            <p><strong>Hva vet vi?</strong> m = 1500 kg, v₀ = 72 km/h = 20 m/s, v = 0, s = 50 m.</p>

            <p><strong>a) Finn akselerasjon og friksjonskraft:</strong></p>
            <FormulaBox latex="v^2 = v_0^2 + 2as \;\Rightarrow\; a = \frac{v^2 - v_0^2}{2s} = \frac{0 - 400}{100} = -4{,}0\;\text{m/s}^2" variant="blue" />
            <FormulaBox latex="R = |\sum F| = m|a| = 1500 \cdot 4{,}0 = \underline{\underline{6{,}0\;\text{kN}}}" variant="gold" />

            <p><strong>b) Tid:</strong></p>
            <FormulaBox latex="v = v_0 + at \;\Rightarrow\; t = \frac{v - v_0}{a} = \frac{0 - 20}{-4{,}0} = \underline{\underline{5{,}0\;\text{s}}}" variant="gold" />

            <p className="text-sm"><strong>Hva lærte vi?</strong> Kombinasjonen av kinematikk (kap. 2) og Newtons 2. lov (kap. 4) er svært vanlig på eksamen.</p>
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
          <div className="space-y-3">
            <p><strong>a) Masseløst tau:</strong></p>
            <p className="text-sm">Nedre tau henger fritt med slakk → snordrag S₂ = 0 N (ingen belastning nedenfra).</p>
            <p className="text-sm">FBD for pakken: S₁ (opp) − G (ned) = 0</p>
            <FormulaBox latex="S_1 = G = mg = 50 \cdot 9{,}81 = \underline{\underline{491\;\text{N}}}" variant="gold" />
            <p className="text-sm">I et masseløst tau er snordraget likt overalt i tauet: S = 491 N.</p>

            <p><strong>b) Tau med masse m₂ = 12 kg:</strong></p>
            <p className="text-sm">FBD for tauet: S₂ (opp) − S₁ (ned fra pakke via N3L) − m₂g (ned) = 0</p>
            <FormulaBox latex="S_2 = S_1 + m_2 g = 491 + 12 \cdot 9{,}81 = \underline{\underline{609\;\text{N}}}" variant="gold" />
            <p className="text-sm"><strong>Hva lærte vi?</strong> I et tau med masse er snordraget størst øverst og minst nederst. Det øvre festepunktet bærer både pakken og tauets vekt.</p>
          </div>
        }
      />
    </div>
  );
}
