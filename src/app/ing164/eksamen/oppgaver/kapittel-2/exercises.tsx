"use client";

import React from "react";
import InlineLatex from "@/components/InlineLatex";
import FormulaBox from "@/components/FormulaBox";

export interface ExerciseContent {
  title: string;
  difficulty: "lett" | "middels" | "vanskelig";
  pageRef: string;
  problem: React.ReactNode;
  knowns: React.ReactNode;
  unknowns: React.ReactNode;
  strategy: React.ReactNode;
  hints: { label: string; content: React.ReactNode }[];
  solution: React.ReactNode;
  alternativeSolution?: React.ReactNode;
  summary: React.ReactNode;
}

// ============================================================================
// Pedagogiske hjelpere
// ============================================================================

function TheoryBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-indigo-700 dark:text-indigo-300 mb-1">
        Teori: {title}
      </p>
      <div className="text-sm text-indigo-900 dark:text-indigo-100">{children}</div>
    </div>
  );
}

function Pitfall({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 p-3 my-2">
      <p className="font-semibold text-xs uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-1">
        Vanlig feil
      </p>
      <div className="text-sm text-rose-900 dark:text-rose-100">{children}</div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="font-semibold text-sm">
        <span className="inline-block w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold leading-6 text-center mr-2">
          {n}
        </span>
        {title}
      </p>
      <div className="mt-2 ml-8 text-sm space-y-2">{children}</div>
    </div>
  );
}

function Arrowheads() {
  return (
    <defs>
      <marker id="arrow-red-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 2 (matcher University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 2.1 — Bil med gjennomsnittsfart 6,25 m/s i 4 s
  // ==========================================================================
  "2.1": {
    title: "Bil med konstant gjennomsnittsfart",
    difficulty: "lett",
    pageRef: "s. 87",
    problem: (
      <p>
        En bil kjører i +x-retning på en rett, jevn vei. I de første 4,00 s av bevegelsen er
        gjennomsnittsfarten <InlineLatex latex="v_{\text{gj},x}=6{,}25\;\text{m/s}" />. Hvor langt
        kjører bilen i løpet av 4,00 s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_{\text{gj},x}=6{,}25\;\text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t=4{,}00\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Forflytning <InlineLatex latex="\Delta x" /> i intervallet.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Definisjon av gjennomsnittsfart i 1D">
          <p>
            Gjennomsnittsfarten i x-retning over et tidsintervall er forholdet
            mellom forflytningen <InlineLatex latex="\Delta x" /> og tids­intervallet
            <InlineLatex latex="\Delta t" />:
          </p>
          <FormulaBox variant="gold" latex="v_{\text{gj},x}=\dfrac{\Delta x}{\Delta t}" />
          <p>
            Når vi kjenner <InlineLatex latex="v_\text{gj}" /> og <InlineLatex latex="\Delta t" />,
            løser vi denne ligningen for <InlineLatex latex="\Delta x" />:
            <InlineLatex latex="\;\Delta x=v_{\text{gj},x}\,\Delta t" />. Dette er
            gyldig <em>uansett</em> om bevegelsen var jevn eller variabel — så lenge
            vi bruker gjennomsnittsfarten over hele intervallet.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Hva er definisjonen av gjennomsnittsfart? Løs ligningen for det som mangler.</p> },
      { label: "Hint 2", content: <p>Direkte multiplikasjon. Sjekk enheter: m/s × s = m.</p> },
    ],
    solution: (
      <div>
        <p>
          Oppgaven er rett-fram-bruk av definisjonen av gjennomsnittsfart, men
          den er likevel verdt å kjenne godt: dette er <em>byggeklossen</em> som
          alle senere kinematiske resonnementer bygger på.
        </p>
        <TheoryBox title="Hvorfor brukes gjennomsnittsfart slik?">
          <p>
            Gjennomsnittsfarten erstatter den variable virkelige farten med <em>én</em>
            konstant fart som gir samme totale forflytning over samme tid.
            Dette er nettopp grunnen til at <InlineLatex latex="\Delta x=v_{\text{gj}}\,\Delta t" />
            gir korrekt forflytning også når den faktiske farten varierer.
            For en bil som kjører jevnt, er gjennomsnittsfarten lik den
            momentane farten ved hvert øyeblikk.
          </p>
        </TheoryBox>
        <Step n={1} title="Skriv ned definisjonen og løs for det ukjente">
          <FormulaBox latex="v_{\text{gj},x}=\dfrac{\Delta x}{\Delta t}\;\Longleftrightarrow\;\Delta x=v_{\text{gj},x}\,\Delta t" />
        </Step>
        <Step n={2} title="Sett inn tallene">
          <FormulaBox latex="\Delta x=(6{,}25\;\text{m/s})(4{,}00\;\text{s})=25{,}0\;\text{m}" />
        </Step>
        <Step n={3} title="Enhetssjekk">
          <p>
            <InlineLatex latex="\dfrac{\text{m}}{\text{s}}\cdot\text{s}=\text{m}" /> ✓.
            Resultatet har riktig enhet for forflytning.
          </p>
        </Step>
        <FormulaBox variant="gold" latex="\Delta x=25{,}0\;\text{m}\;\text{i }+x\text{-retning}" />
        <Pitfall>
          Ikke forveksle gjennomsnittsfart (skalar) med gjennomsnitts­hastighet
          (vektor). Her er bilen rett-linjet i +x-retning slik at de tallmessig
          er like, men det er ikke generelt sant — se 2.2 og 2.4.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: bilen flytter seg 25 m i løpet av 4 s. Hvis sjåføren
          holdt akkurat 6,25 m/s konstant er det også momentanfarten ved hvert
          tidspunkt; hvis han kjørte mer ujevnt er 6,25 m/s «den faste farten
          som ville gitt samme total» — det er den dypere meningen med et
          gjennomsnitt.
        </p>
      </div>
    ),
    summary: (
      <p>
        <InlineLatex latex="\Delta x=v_{\text{gj}}\,\Delta t" />. En av de mest
        grunnleggende relasjonene i kinematikk — alltid definisjonen, ikke en
        antatt formel — og gyldig uansett om bevegelsen er jevn.
      </p>
    ),
  },

  // ==========================================================================
  // 2.2 — Havsule (shearwater)
  // ==========================================================================
  "2.2": {
    title: "Havsule (shearwater) flyr 5150 km hjem",
    difficulty: "lett",
    pageRef: "s. 87",
    problem: (
      <p>
        I et eksperiment ble en havsule (en sjøfugl) tatt fra reiret sitt, fløyet 5150 km av sted, og
        sluppet løs. Fuglen fant tilbake til reiret 13,5 dager etter slipp. Vi plasserer origo på reiret
        og strekker +x-aksen til slipp­punktet. Hva var fuglens gjennomsnitts­hastighet i m/s for
        (a) retur­flyturen og (b) hele turen, fra reiret og tilbake?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Strekning til slipp­punkt: 5150 km = <InlineLatex latex="5{,}15\times 10^{6}\;\text{m}" /></li>
        <li>Retur­tid: <InlineLatex latex="t=13{,}5\;\text{dager}=1{,}166\times 10^{6}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v_{\text{gj}}" /> for retur. (b) <InlineLatex latex="v_{\text{gj}}" /> for hele turen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Hastighet er en vektorstørrelse">
          <p>
            <strong>Gjennomsnitts­hastighet</strong> er forflytningen
            (sluttposisjon − startposisjon) delt på tids­intervallet:
          </p>
          <FormulaBox variant="gold" latex="\vec v_{\text{gj}}=\dfrac{\Delta\vec r}{\Delta t}" />
          <p>
            Dette er en vektor med både størrelse <em>og</em> retning. For
            1D-bevegelse betyr det at fortegnet på <InlineLatex latex="\Delta x" />
            inneholder retningen.
          </p>
          <p>
            <strong>Gjennomsnittsfart</strong> bruker derimot <em>tilbakelagt strekning</em>
            (alltid positiv) — ikke forflytning. Fart er en skalar.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Velg origo og retning for koordinatsystemet (gitt: origo i reir, +x til slipp­punkt).</p> },
      { label: "Hint 2", content: <p>Konverter dager til sekunder før divisjon: 1 dag = 86 400 s.</p> },
      { label: "Hint 3", content: <p>(b) forflytningen er null fordi fuglen ender der den startet.</p> },
    ],
    solution: (
      <div>
        <p>
          Dette er det klassiske eksemplet som tvinger oss til å skille hastighet
          fra fart. Begrepene er forskjellige selv når svarene tilfeldigvis blir
          like — og her er de kritisk forskjellige.
        </p>
        <Step n={1} title="Konverter enheter">
          <FormulaBox latex="5150\;\text{km}=5{,}15\times 10^{6}\;\text{m}" />
          <FormulaBox latex="13{,}5\;\text{dager}\cdot 24\;\dfrac{\text{t}}{\text{dag}}\cdot 3600\;\dfrac{\text{s}}{\text{t}}=1{,}166\times 10^{6}\;\text{s}" />
          <p>
            Vi jobber konsekvent i SI-enheter for å unngå skjulte enhetsfeil.
          </p>
        </Step>
        <Step n={2} title="(a) Returflyturen">
          <p>
            Fuglen starter i <InlineLatex latex="x_i=+5{,}15\times 10^{6}\;\text{m}" />
            (slipp­punkt) og ender i <InlineLatex latex="x_f=0" /> (reir). Forflytningen er:
          </p>
          <FormulaBox latex="\Delta x=x_f-x_i=0-5{,}15\times 10^{6}=-5{,}15\times 10^{6}\;\text{m}" />
          <p>
            Det negative fortegnet betyr at forflytningen peker i −x-retning
            (mot reiret). Sett inn i definisjonen:
          </p>
          <FormulaBox latex="v_{\text{gj},x}=\dfrac{\Delta x}{\Delta t}=\dfrac{-5{,}15\times 10^{6}\;\text{m}}{1{,}166\times 10^{6}\;\text{s}}\approx -4{,}42\;\text{m/s}" />
          <FormulaBox variant="gold" latex="|v_{\text{gj}}|\approx 4{,}42\;\text{m/s, retning }-x\text{ (mot reiret)}" />
        </Step>
        <Step n={3} title="(b) Hele turen — fra reir, ut til slipp­punkt og tilbake">
          <p>
            Sluttposisjon = startposisjon = reiret. Derfor:
          </p>
          <FormulaBox latex="\Delta x_\text{tot}=x_f-x_i=0-0=0" />
          <FormulaBox variant="gold" latex="v_{\text{gj}}=\dfrac{0}{\Delta t}=0" />
        </Step>
        <Pitfall>
          Det er fristende å tenke «fuglen fløy 10 300 km totalt, så hastigheten
          må være positiv». Men det er <em>fart</em> du tenker på, ikke
          hastighet. Hastighet bryr seg bare om hvor du <em>ender</em> i forhold
          til hvor du <em>startet</em>.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: fuglens gjennomsnitts­fart i (b) er rundt 8,8 m/s
          (10 300 km / 27 dager), mens gjennomsnitts­hastigheten er null. Dette
          er hovedlærdommen — disse begrepene er ikke synonyme.
        </p>
      </div>
    ),
    summary: (
      <p>
        Gjennomsnitts­hastighet er forflytning/tid (vektor) — fortegns­satt og
        avhengig av endepunkter. Lukket sløyfe ⇒ null hastighet, uansett hvor
        langt du har reist.
      </p>
    ),
  },

  // ==========================================================================
  // 2.4 — Pillar to Post
  // ==========================================================================
  "2.4": {
    title: "Pillar to Post — løp øst og vest",
    difficulty: "lett",
    pageRef: "s. 87",
    problem: (
      <p>
        Du starter ved en søyle og løper 200 m øst (+x-retning) med gjennomsnittsfart 5,0 m/s, og
        løper deretter 280 m vest med gjennomsnittsfart 4,0 m/s til en post. Beregn (a) din
        gjennomsnitts­fart fra søylen til posten, og (b) din gjennomsnitts­hastighet fra søylen til posten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Etappe 1: 200 m øst, 5,0 m/s ⇒ <InlineLatex latex="t_1=40\;\text{s}" /></li>
        <li>Etappe 2: 280 m vest, 4,0 m/s ⇒ <InlineLatex latex="t_2=70\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) Gjennomsnittsfart. (b) Gjennomsnittshastighet.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Fart vs. hastighet — to forskjellige begreper">
          <p>
            <strong>Fart</strong> (engelsk: <em>speed</em>) er en skalar:
            total tilbakelagt <em>strekning</em> delt på total tid. Den er alltid
            positiv (eller null), og bryr seg ikke om retning.
          </p>
          <FormulaBox variant="blue" latex="\text{fart}_\text{gj}=\dfrac{\text{total strekning}}{\Delta t}" />
          <p>
            <strong>Hastighet</strong> (engelsk: <em>velocity</em>) er en vektor:
            total <em>forflytning</em> delt på total tid. Den har retning og kan
            være negativ (i 1D ⇒ fortegn).
          </p>
          <FormulaBox variant="blue" latex="\vec v_\text{gj}=\dfrac{\Delta\vec r}{\Delta t}" />
          <p>
            Når bevegelsen er rett-linjet i én fast retning er |hastighet| = fart.
            Så snart retningen skifter underveis vil de avvike.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Velg +x = øst. Total strekning er 200+280 = 480 m. Total forflytning er 200 − 280 = −80 m (vest).</p> },
      { label: "Hint 2", content: <p>Beregn tider per etappe først: <InlineLatex latex="t_i=d_i/v_i" />. Total tid blir summen.</p> },
    ],
    solution: (
      <div>
        <p>
          Klassisk «fart vs. hastighet»-oppgave. Forskjellen blir enkel når man
          velger koordinatsystem og er nøye med fortegn.
        </p>
        <Step n={1} title="Velg koordinatsystem">
          <p>
            La +x peke mot øst. Da er etappe 1 i +x-retning og etappe 2 i −x-retning.
            Posisjonene blir <InlineLatex latex="x_0=0,\;x_1=+200,\;x_2=+200-280=-80\;\text{m}" />.
          </p>
        </Step>
        <Step n={2} title="Tider per etappe">
          <p>
            Hver etappe har konstant gjennomsnittsfart, så
            <InlineLatex latex="\;t_i=d_i/v_i" />:
          </p>
          <FormulaBox latex="t_1=\dfrac{200\;\text{m}}{5{,}0\;\text{m/s}}=40\;\text{s},\quad t_2=\dfrac{280\;\text{m}}{4{,}0\;\text{m/s}}=70\;\text{s}" />
          <FormulaBox latex="\Delta t=t_1+t_2=40+70=110\;\text{s}" />
        </Step>
        <Step n={3} title="(a) Gjennomsnittsfart — bruk strekning">
          <p>
            Total strekning er summen av etappe-lengdene (begge positive, fordi
            strekning ikke har fortegn):
          </p>
          <FormulaBox latex="\text{strekning}=200+280=480\;\text{m}" />
          <FormulaBox latex="\text{fart}_\text{gj}=\dfrac{480\;\text{m}}{110\;\text{s}}=4{,}36\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\text{fart}_\text{gj}\approx 4{,}36\;\text{m/s}" />
        </Step>
        <Step n={4} title="(b) Gjennomsnitts­hastighet — bruk forflytning">
          <p>
            Forflytningen er sluttposisjon minus startposisjon
            (<InlineLatex latex="x_2-x_0=-80-0=-80\;\text{m}" />). Fortegnet bærer
            informasjon om retningen:
          </p>
          <FormulaBox latex="v_{\text{gj},x}=\dfrac{-80\;\text{m}}{110\;\text{s}}=-0{,}73\;\text{m/s}" />
          <FormulaBox variant="gold" latex="|v_\text{gj}|\approx 0{,}73\;\text{m/s, retning vest}" />
        </Step>
        <Pitfall>
          En vanlig feil er å sette <InlineLatex latex="\;v_\text{gj}=(5+4)/2=4{,}5" /> m/s.
          Det er <em>aritmetisk gjennomsnitt</em> av to fart-tall — som ikke har noe
          med definisjonen av gjennomsnitt å gjøre. Bruk alltid forhold av total
          forflytning til total tid.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: gjennomsnittsfarten (4,36 m/s) er mye større enn
          størrelsen på gjennomsnitts­hastigheten (0,73 m/s) fordi en stor del
          av bevegelsen «kanselleres» mot start. Hastighet er alltid mindre eller
          lik fart i størrelse — det er en allmenngyldig sannhet.
        </p>
      </div>
    ),
    summary: (
      <p>
        Fart bruker alltid total strekning (positiv); hastighet bruker fortegns­satt
        forflytning. <InlineLatex latex="|v_\text{gj}|\le \text{fart}_\text{gj}" /> alltid.
      </p>
    ),
  },

  // ==========================================================================
  // 2.5 — Tur fra hus til mølle til benk
  // ==========================================================================
  "2.5": {
    title: "Tur fra hus til mølle til benk",
    difficulty: "lett",
    pageRef: "s. 87",
    problem: (
      <p>
        Du går fra inngangsdøra til et hus 60,0 m mot øst til en vindmølle, snur og går 40,0 m mot
        vest til en benk hvor du sitter og ser på solnedgangen. Det tar 28,0 s å gå fra huset til
        vindmølla, og 36,0 s å gå fra vindmølla til benken. Hva er din (a) gjennomsnittshastighet og
        (b) gjennomsnittsfart for hele turen fra huset til benken?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Etappe 1: 60,0 m øst i 28,0 s</li>
        <li>Etappe 2: 40,0 m vest i 36,0 s</li>
      </ul>
    ),
    unknowns: <p>(a) Gj.hastighet. (b) Gj.fart.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Bygg på 2.4 — samme distinksjon">
          <p>
            Strategi-løsen er identisk med 2.4: regn forflytning (vektor, fortegn) og
            strekning (skalar, alltid positiv) hver for seg, så del med total tid.
          </p>
          <FormulaBox latex="v_{\text{gj},x}=\dfrac{x_f-x_i}{\Delta t},\quad \text{fart}_\text{gj}=\dfrac{|d_1|+|d_2|+\dots}{\Delta t}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Velg +x = øst. Sluttposisjon ved benken: 60 − 40 = +20 m fra huset.</p> },
      { label: "Hint 2", content: <p>Hastighet kan være negativ; fart aldri.</p> },
    ],
    solution: (
      <div>
        <p>
          Vi gjentar det samme prinsippet som i 2.4 for å feste det skikkelig:
          forskjellen mellom fart og hastighet handler kun om hva man teller
          (strekning vs. forflytning).
        </p>
        <Step n={1} title="Bestem posisjoner">
          <p>Med +x mot øst og huset i origo:</p>
          <FormulaBox latex="x_\text{hus}=0,\;x_\text{mølle}=+60{,}0\;\text{m},\;x_\text{benk}=60{,}0-40{,}0=+20{,}0\;\text{m}" />
        </Step>
        <Step n={2} title="Total tid">
          <FormulaBox latex="\Delta t=28{,}0+36{,}0=64{,}0\;\text{s}" />
        </Step>
        <Step n={3} title="(a) Gjennomsnitts­hastighet — bruk forflytning">
          <FormulaBox latex="\Delta x=x_\text{benk}-x_\text{hus}=+20{,}0\;\text{m}" />
          <FormulaBox latex="v_{\text{gj},x}=\dfrac{+20{,}0\;\text{m}}{64{,}0\;\text{s}}=+0{,}3125\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{gj}\approx +0{,}313\;\text{m/s i }+x\text{ (øst)}" />
        </Step>
        <Step n={4} title="(b) Gjennomsnittsfart — bruk strekning">
          <p>
            Total tilbakelagt strekning er summen av etappe-lengdene
            (begge positive):
          </p>
          <FormulaBox latex="\text{strekning}=60{,}0+40{,}0=100\;\text{m}" />
          <FormulaBox latex="\text{fart}_\text{gj}=\dfrac{100\;\text{m}}{64{,}0\;\text{s}}=1{,}5625\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\text{fart}_\text{gj}\approx 1{,}56\;\text{m/s}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: tilskuer av bevegelsen ville målt en gjennomsnittsfart
          på 1,56 m/s (rundt rolig gangefart). En GPS som bare målte hvor du var
          ved start og slutt (forflytning) ville derimot gitt en mye lavere
          gjennomsnitts­hastighet (0,31 m/s). Det er fordi mye av strekningen
          ble «brukt opp» av returen mot vest.
        </p>
        <Pitfall>
          Sjekk at fortegnet på <InlineLatex latex="\Delta x" /> stemmer med
          retningen i koordinatsystemet. Hadde benken ligget vest for huset
          ville svaret blitt negativt.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        For en tur som ikke er lukket sløyfe vil
        <InlineLatex latex="\;|v_\text{gj}|<\text{fart}_\text{gj}" />.
        Likhet kun ved bevegelse i én retning.
      </p>
    ),
  },

  // ==========================================================================
  // 2.6 — Honda Civic, x = αt² − βt³
  // ==========================================================================
  "2.6": {
    title: "Honda Civic — gjennomsnittshastighet fra x(t)",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <p>
        En Honda Civic kjører i en rett linje langs en vei. Avstanden x fra et stoppskilt er gitt som
        funksjon av tid t ved <InlineLatex latex="\;x(t)=\alpha t^2-\beta t^3" />, hvor
        <InlineLatex latex="\;\alpha=1{,}50\;\text{m/s}^2" /> og
        <InlineLatex latex="\;\beta=0{,}0500\;\text{m/s}^3" />. Beregn gjennomsnitts­hastighet for bilen
        i hver tids­intervall: (a) <InlineLatex latex="t=0" /> til <InlineLatex latex="t=2{,}00\;\text{s}" />;
        (b) <InlineLatex latex="t=0" /> til <InlineLatex latex="t=4{,}00\;\text{s}" />;
        (c) <InlineLatex latex="t=2{,}00" /> til <InlineLatex latex="t=4{,}00\;\text{s}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="x(t)=\alpha t^2-\beta t^3" /></li>
        <li><InlineLatex latex="\alpha=1{,}50\;\text{m/s}^2,\;\beta=0{,}0500\;\text{m/s}^3" /></li>
      </ul>
    ),
    unknowns: <p>Gj.hastighet i tre intervaller.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Posisjonsfunksjon vs. gjennomsnittshastighet">
          <p>
            Når posisjonen er gitt som funksjon av tid, beregner vi
            forflytningen i et intervall ved å sette inn endepunktene:
          </p>
          <FormulaBox latex="\Delta x = x(t_2) - x(t_1)" />
          <p>Gjennomsnittshastigheten i intervallet er da:</p>
          <FormulaBox variant="gold" latex="v_{\text{gj},x}=\dfrac{x(t_2)-x(t_1)}{t_2-t_1}" />
          <p>
            Dette er en <em>annen størrelse</em> enn momentanhastigheten
            <InlineLatex latex="\;v_x(t)=dx/dt" />, som vi møter i 2.7 og 2.8.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Beregn alle tre verdiene <InlineLatex latex="x(0),x(2),x(4)" /> én gang og gjenbruk.</p> },
      { label: "Hint 2", content: <p>x(0)=0, x(2)=4·1,5−8·0,05=5,60 m, x(4)=16·1,5−64·0,05=20,80 m.</p> },
    ],
    solution: (
      <div>
        <p>
          Sjekk enheter: <InlineLatex latex="\alpha t^2" /> har enhet
          <InlineLatex latex="\;(\text{m/s}^2)\cdot\text{s}^2=\text{m}" /> ✓.
          <InlineLatex latex="\;\beta t^3" /> har enhet
          <InlineLatex latex="\;(\text{m/s}^3)\cdot\text{s}^3=\text{m}" /> ✓.
          Begge ledd gir meter.
        </p>
        <Step n={1} title="Beregn x(t) ved relevante tidspunkt">
          <FormulaBox latex="x(0)=0" />
          <FormulaBox latex="x(2{,}00)=(1{,}50)(2{,}00)^2-(0{,}0500)(2{,}00)^3=6{,}00-0{,}400=5{,}60\;\text{m}" />
          <FormulaBox latex="x(4{,}00)=(1{,}50)(4{,}00)^2-(0{,}0500)(4{,}00)^3=24{,}0-3{,}20=20{,}80\;\text{m}" />
        </Step>
        <Step n={2} title="(a) 0 til 2,00 s">
          <FormulaBox latex="v_\text{gj}=\dfrac{x(2)-x(0)}{2-0}=\dfrac{5{,}60-0}{2{,}00}=2{,}80\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{gj}=2{,}80\;\text{m/s}" />
        </Step>
        <Step n={3} title="(b) 0 til 4,00 s">
          <FormulaBox latex="v_\text{gj}=\dfrac{x(4)-x(0)}{4-0}=\dfrac{20{,}80-0}{4{,}00}=5{,}20\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{gj}=5{,}20\;\text{m/s}" />
        </Step>
        <Step n={4} title="(c) 2,00 til 4,00 s">
          <FormulaBox latex="v_\text{gj}=\dfrac{x(4)-x(2)}{4-2}=\dfrac{20{,}80-5{,}60}{2{,}00}=7{,}60\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{gj}=7{,}60\;\text{m/s}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: gjennomsnittshastigheten øker fra 2,80 til 7,60 m/s
          mellom de to halvdelene av intervallet — bilen akselererer (i alle
          fall til en stund). Dette demonstrerer at gjennomsnittshastighet
          avhenger sterkt av <em>hvilket</em> intervall vi velger.
        </p>
        <Pitfall>
          Det er fristende å bare ta <InlineLatex latex="(2{,}80+7{,}60)/2=5{,}20" />
          for (b). Dette stemmer her fordi de to halvdelene har lik tids­varighet,
          men vil ikke stemme generelt. Bruk alltid definisjonen.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Gj.hastighet er <em>ikke</em> samme som momentanhastighet, og kan variere
        sterkt med valg av intervall. Beregnes alltid fra
        <InlineLatex latex="\;\Delta x/\Delta t" />.
      </p>
    ),
  },

  // ==========================================================================
  // 2.7 — Bil med x(t) = bt² − ct³
  // ==========================================================================
  "2.7": {
    title: "Bil ved rødt lys — momentanfart fra x(t)",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <p>
        En bil står stille ved et rødt lys. Når lyset slår om, kjører den langs en rett vei slik at
        avstanden fra lyset er <InlineLatex latex="\;x(t)=bt^2-ct^3" />, der
        <InlineLatex latex="\;b=2{,}40\;\text{m/s}^2" /> og <InlineLatex latex="c=0{,}120\;\text{m/s}^3" />.
        (a) Beregn gjennomsnitts­hastigheten for tids­intervallet 0 til 10,0 s. (b) Beregn momentan­hastigheten
        ved <InlineLatex latex="\;t=0,\;t=5{,}0\;\text{s}" /> og <InlineLatex latex="t=10{,}0\;\text{s}" />.
        (c) Hvor lenge etter start er bilen igjen i ro?
      </p>
    ),
    knowns: <p><InlineLatex latex="b=2{,}40,\;c=0{,}120" /> i SI-enheter.</p>,
    unknowns: <p>(a) <InlineLatex latex="v_\text{gj}" /> 0–10 s. (b) <InlineLatex latex="v(0),v(5),v(10)" />. (c) Tid for v=0.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Momentanhastighet — den tidsderiverte av posisjonen">
          <p>
            Når posisjonen er gitt som funksjon av tid, er momentanhastigheten
            den tidsderiverte:
          </p>
          <FormulaBox variant="gold" latex="v_x(t)=\dfrac{dx}{dt}" />
          <p>
            For et polynom <InlineLatex latex="x(t)=A t^n" /> er den deriverte
            <InlineLatex latex="\;dx/dt=nA t^{n-1}" />. Vi tar bare ett ledd
            av gangen.
          </p>
          <p>
            For å finne når bilen er i ro setter vi
            <InlineLatex latex="\;v_x(t)=0" /> og løser for t.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Først (a) — gjennomsnittshastighet bruker bare endepunkter, ingen derivasjon.</p> },
      { label: "Hint 2", content: <p>(b) Deriver <InlineLatex latex="x(t)" /> ledd-for-ledd: <InlineLatex latex="\;v(t)=2bt-3ct^2" />.</p> },
      { label: "Hint 3", content: <p>(c) Sett <InlineLatex latex="v(t)=0" />: faktoriser ut t. Den ikke-trivielle løsningen er <InlineLatex latex="t=2b/(3c)" />.</p> },
    ],
    solution: (
      <div>
        <p>
          Oppgaven kombinerer gjennomsnittshastighet (definisjon, ingen derivasjon)
          med momentanhastighet (derivasjon). Skill mellom de to begrepene fra start.
        </p>
        <Step n={1} title="(a) Gjennomsnittshastighet 0–10,0 s">
          <FormulaBox latex="x(0)=0" />
          <FormulaBox latex="x(10)=(2{,}40)(10)^2-(0{,}120)(10)^3=240-120=120\;\text{m}" />
          <FormulaBox latex="v_\text{gj}=\dfrac{120-0}{10-0}=12{,}0\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{gj}=12{,}0\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Momentan­hastighet — deriver x(t)">
          <p>Bruk regelen <InlineLatex latex="\;d(t^n)/dt = n\,t^{n-1}" /> ledd for ledd:</p>
          <FormulaBox latex="v(t)=\dfrac{d}{dt}(bt^2-ct^3)=2bt-3ct^2=4{,}80\,t-0{,}360\,t^2" />
          <p>Sett inn de tre verdiene:</p>
          <FormulaBox latex="v(0)=0\;\text{m/s (bilen står stille når lyset slår om)}" />
          <FormulaBox latex="v(5{,}00)=4{,}80(5)-0{,}360(25)=24{,}0-9{,}00=15{,}0\;\text{m/s}" />
          <FormulaBox latex="v(10{,}0)=4{,}80(10)-0{,}360(100)=48{,}0-36{,}0=12{,}0\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v(0)=0,\;v(5)=15{,}0\;\text{m/s},\;v(10)=12{,}0\;\text{m/s}" />
        </Step>
        <Step n={3} title="(c) Når er bilen i ro igjen?">
          <p>Bilen står stille når momentanhastigheten igjen er null:</p>
          <FormulaBox latex="v(t)=2bt-3ct^2=t(2b-3ct)=0" />
          <p>
            Ene løsningen er <InlineLatex latex="t=0" /> (start). Den andre:
          </p>
          <FormulaBox latex="2b-3ct=0\;\Rightarrow\;t=\dfrac{2b}{3c}=\dfrac{2(2{,}40)}{3(0{,}120)}=\dfrac{4{,}80}{0{,}360}=13{,}3\;\text{s}" />
          <FormulaBox variant="gold" latex="t\approx 13{,}3\;\text{s}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: bilen akselererer i starten (v(5)=15 m/s er større enn
          v(0)=0), når en topphastighet, og bremser deretter (v(10)=12 m/s &lt; 15 m/s).
          Etter 13,3 s er den i ro igjen — modellen er fysisk meningsfull bare
          fram til der.
        </p>
        <Pitfall>
          Sjekk fortegnet på den deriverte. <InlineLatex latex="-ct^3" /> deriveres
          til <InlineLatex latex="-3ct^2" />, ikke <InlineLatex latex="-ct^2" />.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Momentan­hastighet er den deriverte av x(t). Bil i ro når
        <InlineLatex latex="\;v_x(t)=0" />. Skill mellom denne og gj.hastighet.
      </p>
    ),
  },

  // ==========================================================================
  // 2.8 — Fugl, x(t) = 28 + 12.4 t − 0.0450 t³
  // ==========================================================================
  "2.8": {
    title: "Fugl flyr østover — momentanfart ved t=8 s",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <p>
        En fugl flyr rett østover. Posisjonen fra et høyt bygg er gitt av
        <InlineLatex latex="\;x(t)=28{,}0\;\text{m}+(12{,}4\;\text{m/s})t-(0{,}0450\;\text{m/s}^3)t^3" />.
        Hva er den momentane hastigheten ved <InlineLatex latex="t=8{,}00\;\text{s}" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="x(t)=28{,}0+12{,}4\,t-0{,}0450\,t^3" /> (m, s)</li>
        <li><InlineLatex latex="t=8{,}00\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Momentan­hastigheten <InlineLatex latex="v(8{,}00)" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Deriver et polynom ledd-for-ledd">
          <p>Bruk regelen <InlineLatex latex="\;d(c\cdot t^n)/dt=cn\,t^{n-1}" /> på hvert ledd:</p>
          <FormulaBox latex="\dfrac{d}{dt}(28{,}0)=0,\quad\dfrac{d}{dt}(12{,}4t)=12{,}4,\quad\dfrac{d}{dt}(-0{,}0450\,t^3)=-0{,}135\,t^2" />
          <p>Konstantleddet 28,0 m faller bort fordi det ikke endrer seg med tid.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Konstanten 28,0 m bidrar ikke til hastigheten — den deriveres til null.</p> },
      { label: "Hint 2", content: <p>Husk faktoren 3 fra kjederegelen: <InlineLatex latex="d(t^3)/dt = 3t^2" />.</p> },
    ],
    solution: (
      <div>
        <p>
          Vi finner momentan­hastigheten på samme måte som i 2.7:
          deriver posisjons­funksjonen, sett inn det aktuelle tidspunktet.
        </p>
        <Step n={1} title="Deriver x(t) ledd-for-ledd">
          <FormulaBox latex="x(t)=28{,}0+12{,}4\,t-0{,}0450\,t^3" />
          <FormulaBox latex="v(t)=\dfrac{dx}{dt}=0+12{,}4-3(0{,}0450)\,t^2=12{,}4-0{,}135\,t^2" />
        </Step>
        <Step n={2} title="Sett inn t = 8,00 s">
          <FormulaBox latex="v(8{,}00)=12{,}4-0{,}135(8{,}00)^2=12{,}4-0{,}135(64{,}0)" />
          <FormulaBox latex="=12{,}4-8{,}64=3{,}76\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v(8{,}00)\approx 3{,}76\;\text{m/s mot øst}" />
        </Step>
        <Step n={3} title="Enhetssjekk">
          <p>
            <InlineLatex latex="0{,}135" /> har enhet
            <InlineLatex latex="\;\text{m/s}^3" /> (siden <InlineLatex latex="0{,}0450\cdot 3" />),
            og <InlineLatex latex="\;\text{m/s}^3\cdot \text{s}^2=\text{m/s}" /> ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: ved <InlineLatex latex="t=0" /> fløy fuglen 12,4 m/s
          mot øst, men det negative kubikk-leddet «bremser» bevegelsen — ved
          t = 8 s er hastigheten mer enn halvert. Sett <InlineLatex latex="v=0" />:
          fuglen snur om <InlineLatex latex="\;t=\sqrt{12{,}4/0{,}135}\approx 9{,}6\;\text{s}" />.
        </p>
        <Pitfall>
          Ikke glem faktoren 3 fra eksponenten — en av de hyppigste regnefeilene
          i derivasjon av polynomer. Skriv den deriverte først, sjekk fortegn,
          og sett inn tallet til slutt.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Momentan­hastighet ved et bestemt tidspunkt: deriver
        polynomet <InlineLatex latex="x(t)" /> ledd-for-ledd, sett inn t.
      </p>
    ),
  },

  // ==========================================================================
  // 2.10 — Professor walks home graph
  // ==========================================================================
  "2.10": {
    title: "Fysikkprofessor går hjem (Fig E2.10)",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <div className="space-y-2">
        <p>
          En fysikkprofessor forlater huset sitt og går langs fortauet mot universitetet. Etter 5 min
          begynner det å regne, og hun snur seg og går hjem. Avstanden fra huset hennes som funksjon
          av tid er vist i Fig. E2.10 (graf med fem merkede punkter I–V). Ved hvilke av punktene er
          hennes hastighet (a) null? (b) konstant og positiv? (c) konstant og negativ? (d) økende i
          størrelse? (e) minkende i størrelse?
        </p>
        <svg viewBox="0 0 360 200" className="w-full max-w-md mx-auto">
          {/* Aksene */}
          <line x1="40" y1="170" x2="340" y2="170" stroke="#6b7280" strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="170" stroke="#6b7280" strokeWidth="1" />
          <text x="20" y="25" fontSize="10" fill="#6b7280">x (m)</text>
          <text x="320" y="185" fontSize="10" fill="#6b7280">t (min)</text>
          {/* Profilen: stiger til topp, flater, faller */}
          <path d="M 40 170 L 80 130 L 130 60 L 180 30 L 220 30 L 260 80 L 310 170" stroke="#3b82f6" strokeWidth="2" fill="none" />
          {/* Punkter I-V */}
          <circle cx="80" cy="130" r="4" fill="#ef4444" />
          <text x="65" y="145" fontSize="10" fill="#ef4444" fontWeight="bold">I</text>
          <circle cx="130" cy="60" r="4" fill="#ef4444" />
          <text x="120" y="50" fontSize="10" fill="#ef4444" fontWeight="bold">II</text>
          <circle cx="200" cy="30" r="4" fill="#ef4444" />
          <text x="195" y="20" fontSize="10" fill="#ef4444" fontWeight="bold">III</text>
          <circle cx="260" cy="80" r="4" fill="#ef4444" />
          <text x="265" y="80" fontSize="10" fill="#ef4444" fontWeight="bold">IV</text>
          <circle cx="310" cy="170" r="4" fill="#ef4444" />
          <text x="312" y="165" fontSize="10" fill="#ef4444" fontWeight="bold">V</text>
        </svg>
      </div>
    ),
    knowns: <p>x-t graf med fem merkede punkter I–V langs profilen.</p>,
    unknowns: <p>Identifisering av hastighets­tilstand ved hvert punkt.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="x-t-grafer leses gjennom stigningen">
          <p>
            På en x-t-graf er <strong>momentanhastigheten</strong> lik
            tangentens stigningstall i et punkt:
          </p>
          <FormulaBox variant="gold" latex="v_x(t)=\dfrac{dx}{dt}=\text{stigningen til x-t-grafen}" />
          <p>
            Konsekvenser:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vannrett tangent ⇒ <InlineLatex latex="v=0" /></li>
            <li>Rett, oppadgående linje ⇒ konstant positiv hastighet</li>
            <li>Rett, nedadgående linje ⇒ konstant negativ hastighet</li>
            <li>Konkav krumning (smiler) ⇒ akselerasjon &gt; 0 ⇒ <InlineLatex latex="v" /> blir mer positiv</li>
            <li>Konveks krumning (sur munn) ⇒ akselerasjon &lt; 0 ⇒ <InlineLatex latex="v" /> blir mer negativ</li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn en tenkt tangent ved hvert punkt. Hva er stigningen?</p> },
      { label: "Hint 2", content: <p>Topp­punktet har stigning null — der er hastigheten null, selv om hun er fysisk lengst fra huset.</p> },
    ],
    solution: (
      <div>
        <p>
          Dette er en lese-graf-oppgave. Kunsten er å oversette geometrien
          (stigning, krumning, retthet) til kinematikk (hastighet, akselerasjon).
        </p>
        <Step n={1} title="Tolk hver region">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>I (på vei opp, før topp):</strong> grafen stiger jevnt — konstant
              positiv hastighet, går mot universitetet.
            </li>
            <li>
              <strong>II (kurver flater ut nær topp):</strong> stigningen avtar — hun går
              saktere mot universitetet, hastigheten minker mens hun fortsatt går utover.
            </li>
            <li>
              <strong>III (topp­punktet):</strong> tangenten er vannrett — hun har akkurat
              stoppet for å snu om.
            </li>
            <li>
              <strong>IV (på vei tilbake, etter topp):</strong> grafen synker stadig brattere
              — hastigheten er negativ og blir mer negativ (hun setter opp farten på vei hjem).
            </li>
            <li>
              <strong>V (på vei mot start, lineær del):</strong> rett, nedadgående linje
              — konstant negativ hastighet hjemover.
            </li>
          </ul>
        </Step>
        <Step n={2} title="Svar på (a)–(e)">
          <ul className="list-disc pl-5 space-y-0.5">
            <li>(a) <strong>v = 0:</strong> ved topp­punktet <strong>III</strong></li>
            <li>(b) <strong>konstant positiv v:</strong> rett linje­del mellom <strong>I og II</strong></li>
            <li>(c) <strong>konstant negativ v:</strong> rett linje­del mellom <strong>IV og V</strong></li>
            <li>(d) <strong>økende |v|:</strong> mellom <strong>III og IV</strong> (kurven faller stadig brattere)</li>
            <li>(e) <strong>minkende |v|:</strong> mellom <strong>II og III</strong> (kurven stiger flatere)</li>
          </ul>
        </Step>
        <Pitfall>
          En vanlig feil er å se grafen <em>som om den var bevegelses­bilde i rommet</em>
          — at en høy y-verdi betyr «høy fart». Men y-aksen på en x-t-graf viser
          <em>posisjon</em>, ikke fart. Stigningen er hva som forteller noe om
          farten. Toppunktet er der hun er <em>lengst fra huset</em>, men der er
          farten null!
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: hele profilen viser én tur ut og hjem igjen. Hun går jevnt
          ut, når en topp, snur, og kommer tilbake. Asymmetrien (krumningen
          mellom II–III er svakere enn mellom III–IV) viser at hun bremset gradvis
          mot toppen, men da regnet startet økte hun farten raskere på veien hjem.
        </p>
      </div>
    ),
    summary: (
      <p>
        Stigning på x-t = hastighet. Krummingen sier om |v| øker eller minker.
        Lær å «lese» grafen i stedet for å regne.
      </p>
    ),
  },

  // ==========================================================================
  // 2.12 — Solar-powered car (Fig E2.12)
  // ==========================================================================
  "2.12": {
    title: "Solcellebil — v(t) graf (Fig E2.12)",
    difficulty: "middels",
    pageRef: "s. 87",
    problem: (
      <div className="space-y-2">
        <p>
          Fig. E2.12 viser hastigheten til en solcellebil som funksjon av tid. Sjåføren akselererer
          fra et stoppskilt, holder konstant fart 60 km/t i 20 s, og bremser deretter til stopp 40 s
          etter at hun forlot stoppskiltet. (a) Beregn gjennomsnittlig akselerasjon i intervallene:
          (i) 0 til 10 s; (ii) 30 til 40 s; (iii) 10 til 30 s; (iv) 0 til 40 s. (b) Hva er den momentane
          akselerasjonen ved <InlineLatex latex="t=20\;\text{s}" /> og ved <InlineLatex latex="t=35\;\text{s}" />?
        </p>
        <svg viewBox="0 0 360 180" className="w-full max-w-md mx-auto">
          <line x1="40" y1="150" x2="340" y2="150" stroke="#6b7280" strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="150" stroke="#6b7280" strokeWidth="1" />
          <text x="20" y="25" fontSize="10" fill="#6b7280">v (km/t)</text>
          <text x="320" y="165" fontSize="10" fill="#6b7280">t (s)</text>
          {/* Profil: 0-10 stiger, 10-30 flat, 30-40 faller */}
          <path d="M 40 150 L 110 50 L 240 50 L 310 150" stroke="#10b981" strokeWidth="2" fill="none" />
          <text x="115" y="40" fontSize="9" fill="#10b981">60 km/t</text>
          <text x="100" y="160" fontSize="9" fill="#6b7280">10</text>
          <text x="225" y="160" fontSize="9" fill="#6b7280">30</text>
          <text x="295" y="160" fontSize="9" fill="#6b7280">40</text>
        </svg>
      </div>
    ),
    knowns: <p>v fra 0 til 60 km/t i 10 s, konstant 60 km/t i 20 s (10 til 30 s), fra 60 km/t til 0 i 10 s (30 til 40 s).</p>,
    unknowns: <p>Gj. og momentan akselerasjon i flere intervaller.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="v-t-grafer og akselerasjon">
          <p>
            På en v-t-graf er <strong>momentanakselerasjonen</strong> lik
            stigningstallet:
          </p>
          <FormulaBox variant="gold" latex="a_x(t)=\dfrac{dv_x}{dt}=\text{stigning på v-t-graf}" />
          <p>
            <strong>Gjennomsnittlig akselerasjon</strong> mellom to tidspunkter er
            forholdet mellom hastighetsendring og tids­endring:
          </p>
          <FormulaBox latex="a_{\text{gj},x}=\dfrac{\Delta v_x}{\Delta t}=\dfrac{v_x(t_2)-v_x(t_1)}{t_2-t_1}" />
          <p>
            For en rett linje på v-t-grafen er momentanakselerasjonen konstant
            og lik gjennomsnittsakselerasjonen.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Konverter 60 km/t til m/s: <InlineLatex latex="\;60\cdot\dfrac{1000}{3600}=\dfrac{50}{3}\approx 16{,}67\;\text{m/s}" />.</p> },
      { label: "Hint 2", content: <p>I konstant-fart­del er a=0. I akselerasjons­fasene er a konstant (rette linjer på grafen).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Enhetskonvertering">
          <p>Det første og lureste vi gjør er å konvertere alt til SI-enheter:</p>
          <FormulaBox latex="60\;\text{km/t}=60\cdot\dfrac{1000\;\text{m}}{3600\;\text{s}}=\dfrac{50}{3}\approx 16{,}67\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Gjennomsnittlig akselerasjon">
          <p>Bruk definisjonen <InlineLatex latex="a_\text{gj}=\Delta v/\Delta t" /> i hvert intervall:</p>
          <FormulaBox latex="\text{(i) } 0\to 10\;\text{s:}\;a=\dfrac{16{,}67-0}{10-0}=+1{,}67\;\text{m/s}^2" />
          <FormulaBox latex="\text{(ii) } 30\to 40\;\text{s:}\;a=\dfrac{0-16{,}67}{40-30}=-1{,}67\;\text{m/s}^2" />
          <FormulaBox latex="\text{(iii) } 10\to 30\;\text{s:}\;a=\dfrac{16{,}67-16{,}67}{30-10}=0" />
          <FormulaBox latex="\text{(iv) } 0\to 40\;\text{s:}\;a=\dfrac{0-0}{40-0}=0" />
        </Step>
        <Step n={3} title="(b) Momentanakselerasjon">
          <p>
            Vi avleser stigningen på grafen ved hvert tids­punkt. Siden hver fase
            er en rett linje, er momentanakselerasjonen lik gjennomsnitts­akselerasjonen
            innenfor den fasen.
          </p>
          <p>
            <strong>Ved t = 20 s</strong> er bilen i den flate (konstant fart) delen
            mellom 10 og 30 s, så stigningen er null:
          </p>
          <FormulaBox latex="a(20)=0" />
          <p>
            <strong>Ved t = 35 s</strong> er bilen midt i bremsefasen (30–40 s), hvor
            stigningen er −1,67 m/s²:
          </p>
          <FormulaBox latex="a(35)=-1{,}67\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a(20)=0,\;a(35)=-1{,}67\;\text{m/s}^2" />
        </Step>
        <Pitfall>
          <p>
            Resultatet i (iv) er kanskje overraskende: gjennomsnitts­akselerasjonen
            for hele turen er null, selv om bilen aksellererte og bremset ned!
            Det er fordi gj.akselerasjon kun ser på <em>endepunktene</em>: bilen
            startet i ro og endte i ro, så total endring i v er null.
          </p>
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: dette er et typisk «turen til-stoppen» profil —
          akselererer fra ro, holder fart, og bremser. v-t-profilen er trapesformet,
          og a-t-profilen er en enkel rektangulær puls (positiv, null, negativ).
          Arealet under v-t-grafen ville gitt total reise­avstand —
          <InlineLatex latex="\;\tfrac12(20)(16{,}67)+(20)(16{,}67)\approx 500\;\text{m}" />.
        </p>
      </div>
    ),
    summary: (
      <p>
        Stigning på v-t-graf = akselerasjon. Flat ⇒ a=0; rett linje ⇒ konstant a.
        Areal under = forflytning.
      </p>
    ),
  },

  // ==========================================================================
  // 2.13 — Skilpadde med x(t)
  // ==========================================================================
  "2.13": {
    title: "Skilpadde langs x-akse — kinematikk fra x(t)",
    difficulty: "vanskelig",
    pageRef: "s. 88",
    problem: (
      <p>
        En skilpadde kryper langs en rett linje, som vi kaller x-aksen med positiv retning mot høyre.
        Posisjonen som funksjon av tid er
        <InlineLatex latex="\;x(t)=50{,}0\;\text{cm}+(2{,}00\;\text{cm/s})t-(0{,}0625\;\text{cm/s}^2)t^2" />.
        (a) Finn skilpaddens initialhastighet, initialposisjon og initialakselerasjon. (b) Ved hvilken
        tid t er hastigheten null? (c) Hvor lenge etter starten tar det skilpadden å returnere til
        utgangspunktet? (d) Ved hvilke tider er skilpadden 10,0 cm fra startposisjonen, og hva er
        hastigheten og akselerasjonen på disse tidspunktene? (e) Skisser x-t, v-t og a-t grafene fra
        t=0 til t=40,0 s.
      </p>
    ),
    knowns: <p><InlineLatex latex="x(t)=50{,}0+2{,}00t-0{,}0625t^2\;\text{(cm, s)}" />.</p>,
    unknowns: <p>(a) v(0), x(0), a(0). (b) Når v=0. (c) Tilbake til x₀. (d) Når x=x₀±10. (e) Grafer.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="x(t) som andregrads­polynom = konstant akselerasjon">
          <p>
            Et andregrads­uttrykk i t har form
            <InlineLatex latex="\;x(t)=x_0+v_0t+\tfrac12 at^2" />.
            Sammenlign koeffisientene i den gitte funksjonen
            <InlineLatex latex="\;x(t)=50{,}0+2{,}00t-0{,}0625t^2" /> for å lese
            av initial­verdier:
          </p>
          <FormulaBox latex="x_0=50{,}0\;\text{cm},\;v_0=2{,}00\;\text{cm/s},\;\tfrac12 a=-0{,}0625\Rightarrow a=-0{,}125\;\text{cm/s}^2" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Les av direkte fra polynomet ved å sammenligne med standard­formen <InlineLatex latex="x_0+v_0t+\tfrac12 at^2" />.</p> },
      { label: "Hint 2", content: <p>(b) <InlineLatex latex="v(t)=2{,}00-0{,}125t" />. Sett =0.</p> },
      { label: "Hint 3", content: <p>(c): Sett <InlineLatex latex="x(t)=x(0)" />, dvs. <InlineLatex latex="\;2{,}00t-0{,}0625t^2=0" />, faktoriser ut t.</p> },
      { label: "Hint 4", content: <p>(d) For x=60 cm: andregrads­ligning med to løsninger. For x=40 cm: bare én positiv løsning.</p> },
    ],
    solution: (
      <div>
        <p>
          Polynomet er kvadratisk i t, så vi vet at akselerasjonen er
          <em>konstant</em> (negativ — bremses). Dette setter alle de fire
          kinematiske ligningene i spill.
        </p>
        <Step n={1} title="(a) Initial­verdier (les av polynomet)">
          <p>Ved <InlineLatex latex="t=0" />:</p>
          <FormulaBox latex="x(0)=50{,}0\;\text{cm}" />
          <p>
            Den deriverte gir hastighets­funksjonen, og dens verdi ved
            <InlineLatex latex="\;t=0" /> er starthastigheten:
          </p>
          <FormulaBox latex="v(t)=\dfrac{dx}{dt}=2{,}00-0{,}125\,t\;\Rightarrow\;v(0)=2{,}00\;\text{cm/s}" />
          <p>Den dobbelt-deriverte gir akselerasjonen (konstant her):</p>
          <FormulaBox latex="a(t)=\dfrac{dv}{dt}=-0{,}125\;\text{cm/s}^2\;\text{(konstant)}" />
          <FormulaBox variant="gold" latex="x_0=50{,}0\;\text{cm},\;v_0=2{,}00\;\text{cm/s},\;a=-0{,}125\;\text{cm/s}^2" />
        </Step>
        <Step n={2} title="(b) Når er v = 0?">
          <p>Sett <InlineLatex latex="v(t)=0" /> og løs:</p>
          <FormulaBox latex="2{,}00-0{,}125\,t=0\;\Rightarrow\;t=\dfrac{2{,}00}{0{,}125}=16{,}0\;\text{s}" />
          <FormulaBox variant="gold" latex="t=16{,}0\;\text{s}" />
          <p>Dette er også når skilpadden er på maksimal posisjon (snur retning).</p>
        </Step>
        <Step n={3} title="(c) Tilbake til startposisjonen x = 50 cm">
          <p>
            Vi setter <InlineLatex latex="x(t)=x(0)=50" /> og forenkler:
          </p>
          <FormulaBox latex="50=50+2{,}00t-0{,}0625t^2\;\Rightarrow\;t(2{,}00-0{,}0625t)=0" />
          <p>
            Den trivielle løsningen <InlineLatex latex="t=0" /> er starten;
            den ikke-trivielle er:
          </p>
          <FormulaBox latex="2{,}00-0{,}0625\,t=0\;\Rightarrow\;t=\dfrac{2{,}00}{0{,}0625}=32{,}0\;\text{s}" />
          <FormulaBox variant="gold" latex="t=32{,}0\;\text{s}" />
          <p>
            Merk symmetrien: skilpadden snur etter 16 s, og passerer startpunktet
            etter 32 s — dobbelt så lang tid som det tok å nå topp­punktet.
          </p>
        </Step>
        <Step n={4} title="(d) 10 cm fra startpunktet">
          <p>
            Vi har to tilfeller: <InlineLatex latex="x=60" /> cm (10 cm i positiv retning)
            og <InlineLatex latex="x=40" /> cm (10 cm i negativ retning).
          </p>
          <p><strong>For x = 60 cm:</strong></p>
          <FormulaBox latex="60=50+2{,}00t-0{,}0625t^2\;\Rightarrow\;0{,}0625t^2-2{,}00t+10=0" />
          <FormulaBox latex="t=\dfrac{2{,}00\pm\sqrt{4{,}00-4(0{,}0625)(10)}}{2(0{,}0625)}=\dfrac{2{,}00\pm\sqrt{1{,}50}}{0{,}125}=\dfrac{2{,}00\pm 1{,}225}{0{,}125}" />
          <FormulaBox latex="\Rightarrow\;t=6{,}20\;\text{s eller}\;25{,}8\;\text{s}" />
          <p>To løsninger fordi skilpadden passerer x = 60 cm én gang på vei ut og én gang på vei tilbake.</p>
          <p>Hastighetene ved disse tidene:</p>
          <FormulaBox latex="v(6{,}20)=2{,}00-0{,}125(6{,}20)=+1{,}225\;\text{cm/s (på vei ut)}" />
          <FormulaBox latex="v(25{,}8)=2{,}00-0{,}125(25{,}8)=-1{,}225\;\text{cm/s (på vei tilbake)}" />
          <p>
            Symmetri: like store hastighets­størrelser, motsatt fortegn —
            standard for konstant akselerasjon.
          </p>
          <p><strong>For x = 40 cm:</strong></p>
          <FormulaBox latex="40=50+2{,}00t-0{,}0625t^2\;\Rightarrow\;0{,}0625t^2-2{,}00t-10=0" />
          <FormulaBox latex="t=\dfrac{2{,}00\pm\sqrt{4{,}00+2{,}50}}{0{,}125}=\dfrac{2{,}00\pm 2{,}550}{0{,}125}" />
          <p>Den positive løsningen:</p>
          <FormulaBox latex="t=\dfrac{4{,}550}{0{,}125}=36{,}4\;\text{s}" />
          <FormulaBox latex="v(36{,}4)=2{,}00-0{,}125(36{,}4)=-2{,}55\;\text{cm/s}" />
          <FormulaBox variant="gold" latex="t=6{,}20,\;25{,}8,\;36{,}4\;\text{s};\;a=-0{,}125\;\text{cm/s}^2 \text{(konstant)}" />
        </Step>
        <Step n={5} title="(e) Grafer">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>x-t:</strong> nedover-åpen parabel, maks ved t = 16 s med x = 66 cm</li>
            <li><strong>v-t:</strong> rett, synkende linje fra +2,00 ved t=0 gjennom (16, 0)</li>
            <li><strong>a-t:</strong> konstant horisontal linje på y = −0,125 cm/s²</li>
          </ul>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: skilpadden kryper først til høyre, bremser, snur, og
          krabber tilbake forbi startpunktet før den fortsetter til venstre.
          Akselerasjonen er konstant og negativ hele tiden — analogt med en
          ball som kastes opp og faller ned.
        </p>
      </div>
    ),
    summary: (
      <p>
        Konstant akselerasjon (negativ): symmetrisk parabel x(t), lineær v(t),
        konstant a(t). Lese av initial­verdier: sammenlign polynomet med
        <InlineLatex latex="\;x_0+v_0t+\tfrac12 at^2" />.
      </p>
    ),
  },

  // ==========================================================================
  // 2.14 — Race car v(t) = (0,860)t²
  // ==========================================================================
  "2.14": {
    title: "Racerbil med v(t) = (0,860 m/s³)t²",
    difficulty: "lett",
    pageRef: "s. 88",
    problem: (
      <p>
        En racerbil starter fra ro og kjører østover langs et rett, plant spor. For de første 5,0 s er
        bilens øst­gående hastighet gitt ved <InlineLatex latex="v_x(t)=(0{,}860\;\text{m/s}^3)t^2" />.
        Hva er bilens akselerasjon når <InlineLatex latex="v_x=12{,}0\;\text{m/s}" />?
      </p>
    ),
    knowns: <p><InlineLatex latex="v_x(t)=(0{,}860\;\text{m/s}^3)\,t^2" /> for de første 5 s.</p>,
    unknowns: <p>Akselerasjon når <InlineLatex latex="v_x=12{,}0\;\text{m/s}" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel akselerasjon — to-trinn">
          <p>
            Når akselerasjon ikke er konstant, må vi gjøre to ting:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Finn <em>tidspunktet</em> der hastigheten har den oppgitte verdien.</li>
            <li>Deriver <InlineLatex latex="v(t)" /> for å få <InlineLatex latex="a(t)" /> og sett inn tidspunktet.</li>
          </ol>
          <p>
            Vi kan ikke bare bruke
            <InlineLatex latex="\;a=\Delta v/\Delta t" /> direkte, fordi det er
            gjennomsnitts­akselerasjonen — vi vil ha momentan­akselerasjon ved et
            spesifikt tidspunkt.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sett <InlineLatex latex="v=12{,}0" /> i hastighets­funksjonen og løs for t.</p> },
      { label: "Hint 2", content: <p>Deriver <InlineLatex latex="v=0{,}860\,t^2" /> for å få <InlineLatex latex="a(t)=1{,}72\,t" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Finn tidspunktet når v = 12,0 m/s">
          <FormulaBox latex="0{,}860\,t^2=12{,}0\;\text{m/s}" />
          <FormulaBox latex="t^2=\dfrac{12{,}0}{0{,}860}=13{,}95\;\text{s}^2" />
          <FormulaBox latex="t=\sqrt{13{,}95}=3{,}735\;\text{s}" />
        </Step>
        <Step n={2} title="Deriver v(t) og sett inn tidspunktet">
          <FormulaBox latex="a(t)=\dfrac{dv}{dt}=2(0{,}860)\,t=1{,}72\,t" />
          <FormulaBox latex="a(3{,}735)=1{,}72(3{,}735)=6{,}42\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a\approx 6{,}42\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="Enhetssjekk">
          <p>
            <InlineLatex latex="0{,}860" /> har enhet m/s³. Deriverer ⇒ enhet
            <InlineLatex latex="\;\text{m/s}^3\cdot\text{s}=\text{m/s}^2" /> ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: dette er en kraftig akselerasjon (ca. 0,65 g) — i
          rekkefølgen for en lett racerbil. Akselerasjonen øker lineært med
          tiden, så bilen blir kraftigere og kraftigere mens den akselererer.
        </p>
        <Pitfall>
          Det er fristende å skrive <InlineLatex latex="\;a=v/t=12{,}0/3{,}735\approx 3{,}21\;\text{m/s}^2" /> —
          det er <em>gjennomsnitts­akselerasjonen</em>, ikke momentan. Forskjellen
          er stor (en faktor 2 her) fordi akselerasjonen vokser med tid.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Variabel akselerasjon — finn først tiden fra v(t), deriver så.
        <InlineLatex latex="\;a_\text{gj}\ne a_\text{momentan}" /> generelt.
      </p>
    ),
  },

  // ==========================================================================
  // 2.15 — v = α + βt²
  // ==========================================================================
  "2.15": {
    title: "Bil v(t) = α + βt²",
    difficulty: "middels",
    pageRef: "s. 88",
    problem: (
      <p>
        En bils hastighet som funksjon av tid er gitt ved <InlineLatex latex="v_x(t)=\alpha+\beta t^2" />,
        der <InlineLatex latex="\alpha=3{,}00\;\text{m/s}" /> og <InlineLatex latex="\beta=0{,}100\;\text{m/s}^3" />.
        (a) Beregn gjennomsnittlig akselerasjon i intervallet 0 til 5,00 s.
        (b) Beregn momentan akselerasjon ved <InlineLatex latex="t=0" /> og <InlineLatex latex="t=5{,}00\;\text{s}" />.
        (c) Skisser v-t- og a-t-grafer for bilens bevegelse mellom <InlineLatex latex="t=0" /> og
        <InlineLatex latex="t=5{,}00\;\text{s}" />.
      </p>
    ),
    knowns: <p><InlineLatex latex="\alpha=3{,}00\;\text{m/s},\;\beta=0{,}100\;\text{m/s}^3" />.</p>,
    unknowns: <p>(a) Gj.akselerasjon 0–5 s. (b) Momentan a(0), a(5). (c) Grafer.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Gjennomsnitt vs. momentan akselerasjon">
          <p>
            <strong>Gjennomsnitt</strong> bruker bare endepunktene:
            <InlineLatex latex="\;a_\text{gj}=(v(t_2)-v(t_1))/(t_2-t_1)" />.
          </p>
          <p>
            <strong>Momentan</strong> krever derivasjon:
            <InlineLatex latex="\;a(t)=dv/dt" />, og sette inn aktuelt tidspunkt.
          </p>
          <p>
            For konstant akselerasjon er disse like; for variabel a er de generelt forskjellige.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Beregn v(0) og v(5) før du regner gj.akselerasjon.</p> },
      { label: "Hint 2", content: <p>Deriver: <InlineLatex latex="\;a(t)=dv/dt=2\beta t" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Beregn hastigheter ved start og slutt">
          <FormulaBox latex="v(0)=3{,}00+0{,}100(0)^2=3{,}00\;\text{m/s}" />
          <FormulaBox latex="v(5{,}00)=3{,}00+0{,}100(5{,}00)^2=3{,}00+2{,}50=5{,}50\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Gjennomsnittlig akselerasjon">
          <FormulaBox latex="a_\text{gj}=\dfrac{v(5{,}00)-v(0)}{5{,}00-0}=\dfrac{5{,}50-3{,}00}{5{,}00}=0{,}500\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a_\text{gj}=0{,}500\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(b) Momentan akselerasjon">
          <p>Deriver hastighets­funksjonen:</p>
          <FormulaBox latex="a(t)=\dfrac{dv}{dt}=\dfrac{d}{dt}(\alpha+\beta t^2)=2\beta\,t=0{,}200\,t" />
          <p>Sett inn t = 0 og t = 5,00:</p>
          <FormulaBox latex="a(0)=0{,}200(0)=0\;\text{m/s}^2" />
          <FormulaBox latex="a(5{,}00)=0{,}200(5{,}00)=1{,}00\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a(0)=0,\;a(5{,}00)=1{,}00\;\text{m/s}^2" />
        </Step>
        <Step n={4} title="(c) Grafer (kvalitativt)">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>v-t:</strong> oppadgående parabel som starter på +3,00 m/s, ender 5,50 m/s ved t=5</li>
            <li><strong>a-t:</strong> rett, oppadgående linje fra 0 til 1,00 m/s² i 5 s (gjennom origo)</li>
          </ul>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: gjennomsnitts­akselerasjonen (0,500) ligger akkurat
          mellom de momentane verdiene ved start (0) og slutt (1,00). Det er
          ikke tilfeldig — det skyldes at <InlineLatex latex="a(t)=0{,}200\,t" />
          øker lineært i t, så middelet over intervallet er
          <InlineLatex latex="\;(a(0)+a(5))/2 = 0{,}500" />. For mer komplekse
          variasjoner ville middelverdien ikke nødvendigvis vært midt mellom.
        </p>
      </div>
    ),
    summary: (
      <p>
        Variabel akselerasjon: <InlineLatex latex="a_\text{gj}" /> ligger
        generelt mellom min og maks momentan-a — for lineær a(t) er den
        nøyaktig midt mellom.
      </p>
    ),
  },

  // ==========================================================================
  // 2.19 — Antelope, 70 m apart i 6 s
  // ==========================================================================
  "2.19": {
    title: "Antilope med konstant akselerasjon",
    difficulty: "middels",
    pageRef: "s. 88",
    problem: (
      <p>
        En antilope som beveger seg med konstant akselerasjon dekker avstanden 70,0 m mellom to
        punkter på 6,00 s. Farten ved det andre punktet er 15,0 m/s. Hva er (a) farten ved første
        punkt, og (b) akselerasjonen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Avstand 70,0 m i 6,00 s</li>
        <li>Slutt­fart 15,0 m/s</li>
      </ul>
    ),
    unknowns: <p>(a) Startfart <InlineLatex latex="v_0" />. (b) Akselerasjon a.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="De fire kinematiske ligningene (konstant a)">
          <p>Når akselerasjonen er konstant gjelder:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><InlineLatex latex="v=v_0+at" /></li>
            <li><InlineLatex latex="\Delta x=v_0t+\tfrac12 at^2" /></li>
            <li><InlineLatex latex="v^2=v_0^2+2a\Delta x" /></li>
            <li><InlineLatex latex="\Delta x=\tfrac12(v_0+v)t" /> (gjennomsnittsformelen)</li>
          </ol>
          <p>
            Velg den ligningen som har <em>kun ett ukjent</em>. Her kjenner vi
            <InlineLatex latex="\;\Delta x" />, <InlineLatex latex="t" /> og
            <InlineLatex latex="v" />, så ligning (4) gir <InlineLatex latex="v_0" />.
            Deretter (1) gir <InlineLatex latex="a" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For konstant a er gj.fart eksakt (v₀+v)/2.</p> },
      { label: "Hint 2", content: <p>Bruk symmetri: <InlineLatex latex="v_\text{gj}=(v_0+v)/2=\Delta x/\Delta t" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Finn initialfarten via gjennomsnittsformelen">
          <p>
            For konstant a er gjennomsnittsfarten lik aritmetisk middel av
            start- og sluttfart:
          </p>
          <FormulaBox latex="v_\text{gj}=\dfrac{v_0+v}{2}=\dfrac{\Delta x}{\Delta t}=\dfrac{70{,}0\;\text{m}}{6{,}00\;\text{s}}=11{,}67\;\text{m/s}" />
          <p>Løs for v₀:</p>
          <FormulaBox latex="v_0=2(11{,}67)-15{,}0=23{,}33-15{,}0=8{,}33\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_0\approx 8{,}33\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Akselerasjon fra v = v₀ + at">
          <FormulaBox latex="a=\dfrac{v-v_0}{t}=\dfrac{15{,}0-8{,}33}{6{,}00}=\dfrac{6{,}67}{6{,}00}=1{,}11\;\text{m/s}^2" />
          <FormulaBox variant="gold" latex="a\approx 1{,}11\;\text{m/s}^2" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 1,11 m/s² er en moderat akselerasjon (ca. 0,11g) —
          ikke voldsom, men en antilope med fart som kan øke fra 8,3 til 15 m/s
          på 6 s er typisk for det dyret. Antilopen er kjent for høye topp­farter
          (opp mot 30 m/s).
        </p>
        <Pitfall>
          Husk at gjennomsnittsformelen <InlineLatex latex="v_\text{gj}=(v_0+v)/2" />
          KUN gjelder når akselerasjonen er konstant. For variabel a må du
          bruke <InlineLatex latex="\;v_\text{gj}=\Delta x/\Delta t" /> direkte,
          ikke aritmetisk middel av endepunkter.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Konstant a: bruk de fire kinematiske ligningene strategisk — velg den
        som har akkurat ett ukjent.
      </p>
    ),
  },

  // ==========================================================================
  // 2.23 — BIO Airbags 250 m/s²
  // ==========================================================================
  "2.23": {
    title: "BIO Bil­airbag — minste stoppestrekning",
    difficulty: "middels",
    pageRef: "s. 88",
    problem: (
      <p>
        Menneskekroppen kan overleve et akselerasjons­traume (plutselig stopp) hvis akselerasjonens
        størrelse er mindre enn 250 m/s². Hvis du er i en bilulykke med initialfart 105 km/t og
        stoppes av en airbag som blåses opp fra dashbordet, over hvilken minimum strekning må
        airbagen stoppe deg for at du skal overleve krasjet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_0=105\;\text{km/t}=29{,}17\;\text{m/s}" />, <InlineLatex latex="v=0" /></li>
        <li><InlineLatex latex="|a|_\text{maks}=250\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Minste stoppestrekning d.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Tidløs ligning v² = v₀² + 2aΔx">
          <p>
            Når vi ikke vet (eller ikke trenger) tiden, er den tredje kinematiske
            ligningen ideell:
          </p>
          <FormulaBox variant="gold" latex="v^2=v_0^2+2a\,\Delta x" />
          <p>
            Den knytter sammen tre størrelser direkte: starthastighet, slutthastighet,
            akselerasjon og forflytning — uten å nevne tid. Akkurat det vi trenger
            når vi spør hvor langt det tar å stoppe.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Konverter 105 km/t til m/s først (≈29,17 m/s).</p> },
      { label: "Hint 2", content: <p>Slutt­fart v=0 (vi vil at du skal stoppe). Bruk <InlineLatex latex="\;d=v_0^2/(2|a|)" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Konverter starthastigheten">
          <FormulaBox latex="v_0=105\;\text{km/t}\cdot\dfrac{1000}{3600}=29{,}17\;\text{m/s}" />
        </Step>
        <Step n={2} title="Bruk tidløs ligning med v=0 og |a|=250">
          <p>
            Vi velger +x i bevegelses­retningen. Da er <InlineLatex latex="a=-250\;\text{m/s}^2" />
            (akselerasjonen peker mot bevegelsen). Sett inn:
          </p>
          <FormulaBox latex="0=v_0^2+2a\,d\;\Rightarrow\;d=\dfrac{v_0^2}{2|a|}" />
          <FormulaBox latex="d=\dfrac{(29{,}17)^2}{2(250)}=\dfrac{850{,}9}{500}=1{,}70\;\text{m}" />
          <FormulaBox variant="gold" latex="d_\text{min}\approx 1{,}70\;\text{m}" />
        </Step>
        <Step n={3} title="Enhetssjekk">
          <p>
            <InlineLatex latex="(\text{m/s})^2/(\text{m/s}^2)=\text{m}^2/\text{s}^2\cdot\text{s}^2/\text{m}=\text{m}" /> ✓.
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: bilen og airbagen sammen må deformeres minst ~1,7 m
          for å holde akselerasjonen under livstruende nivå. Dette er hele
          ideen bak crumple zones og airbag-design — strekke ut tids- og
          stopp­avstand så akselerasjon (og dermed kraften på personen) blir
          mindre. Hadde stoppestrekning vært kortere ville
          <InlineLatex latex="\;|a|>250\;\text{m/s}^2" /> ⇒ alvorlig skade eller
          død.
        </p>
        <Pitfall>
          Bremsestrekning er kvadratisk i v: dobler du farten må stopp­avstanden
          firedobles for å holde |a| konstant. Ved 210 km/t ville d_min vært ca. 6,8 m.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Bremsestrekning ∝ v². Doble fart krever 4× bremsestrekning for samme
        akselerasjons­begrensning.
      </p>
    ),
  },

  // ==========================================================================
  // 2.28 — To biler A og B (Fig E2.28)
  // ==========================================================================
  "2.28": {
    title: "To biler A og B (Fig E2.28)",
    difficulty: "middels",
    pageRef: "s. 89",
    problem: (
      <div className="space-y-2">
        <p>
          To biler A og B beveger seg langs x-aksen. Fig. E2.28 er en graf av posisjonene til A og B
          mot tid. (a) I bevegelses­diagrammer (som Figs. 2.13b og 2.14b) vis posisjonene, hastighetene
          og akselerasjonene for de to bilene ved t=0, 1 og 3 s. (b) På hvilke tidspunkt(er) (om noen)
          har A og B samme posisjon? (c) Skisser hastighet-mot-tid-graf for både A og B.
          (d) På hvilke tidspunkt(er) har de eventuelt samme hastighet? (e) Når passerer A bil B?
          (f) Når passerer B bil A?
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <line x1="40" y1="170" x2="300" y2="170" stroke="#6b7280" strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="170" stroke="#6b7280" strokeWidth="1" />
          <text x="20" y="25" fontSize="10" fill="#6b7280">x (m)</text>
          <text x="285" y="185" fontSize="10" fill="#6b7280">t (s)</text>
          {/* Bil A — krummer parabolsk fra 25 m */}
          <path d="M 40 75 Q 130 80 290 35" stroke="#ef4444" strokeWidth="2" fill="none" />
          <text x="240" y="30" fontSize="11" fill="#ef4444" fontWeight="bold">A</text>
          {/* Bil B — rett linje fra 0 */}
          <line x1="40" y1="170" x2="290" y2="55" stroke="#3b82f6" strokeWidth="2" />
          <text x="200" y="100" fontSize="11" fill="#3b82f6" fontWeight="bold">B</text>
        </svg>
      </div>
    ),
    knowns: <p>x-t graf for A (parabel) og B (rett linje).</p>,
    unknowns: <p>Posisjons- og hastighets­analyse via grafen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Lese x-t-grafer for to objekter">
          <p>Grafen tolkes punktvis:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Stigning på x-t = momentanhastighet</li>
            <li>Krumning på x-t (konkav/konveks) = fortegn på akselerasjon</li>
            <li>Skjæring mellom kurver = samme posisjon på samme tid (innhenting eller møte)</li>
            <li>Lik stigning hos begge = samme hastighet (men ikke nødvendigvis samme posisjon)</li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>A er parabel ⇒ konstant akselerasjon. B er rett linje ⇒ konstant hastighet, ingen akselerasjon.</p> },
      { label: "Hint 2", content: <p>Sjekk om A starter høyere enn B (ja, A starter ved ~25 m, B ved 0).</p> },
    ],
    solution: (
      <div>
        <p>
          Dette er en typisk «les av grafen»-oppgave. Kunsten er å være systematisk
          om hva grafen forteller om <em>posisjon</em>, <em>hastighet</em> og
          <em>akselerasjon</em> for hvert objekt.
        </p>
        <Step n={1} title="(a) Bevegelses­diagram-tolkning">
          <p>
            Ved <strong>t=0</strong>: A er ved x ≈ 25 m, B er ved x = 0. Stigningen til A er ca. 0 (nesten flat); stigningen til B er stor og konstant.
            Hastighet: <InlineLatex latex="\;v_A\approx 0,\;v_B>0" />.
            Akselerasjon: A krummer oppover ⇒ <InlineLatex latex="\;a_A>0" />; B er rett ⇒ <InlineLatex latex="\;a_B=0" />.
          </p>
          <p>
            Ved <strong>t=1 s</strong>: A har begynt å stige (akselerasjon virker), men har fortsatt lavere fart enn B. B fortsetter med samme konstante fart.
          </p>
          <p>
            Ved <strong>t=3 s</strong>: A har akselerert opp og kan nå være raskere enn B. Tangenten til A's kurve har større stigning enn B's linje.
          </p>
        </Step>
        <Step n={2} title="(b) Samme posisjon — kurvene krysser">
          <p>
            A starter høyere enn B men er nesten i ro; B akselererer ikke men beveger seg jevnt opp i x.
            Etter en stund vil B nå A og krysse forbi (første kryssing). Men siden A akselererer,
            tar A igjen til slutt — andre kryssing senere. To skjæringspunkter.
          </p>
        </Step>
        <Step n={3} title="(c) v-t-grafer">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>A:</strong> rett, oppadgående linje fra v ≈ 0 — konstant positiv akselerasjon</li>
            <li><strong>B:</strong> horisontal linje på en konstant positiv verdi — ingen akselerasjon</li>
          </ul>
        </Step>
        <Step n={4} title="(d) Samme hastighet — like stigninger">
          <p>
            B har konstant stigning. A's stigning øker fra 0 og oppover. På et bestemt tidspunkt vil A's stigning være lik B's stigning — det er punktet med samme hastighet.
          </p>
        </Step>
        <Step n={5} title="(e) A passerer B og (f) B passerer A">
          <ul className="list-disc pl-5 space-y-1">
            <li>(e) <strong>A passerer B:</strong> ved den senere kryssingen, når A's kurve går fra under til over B's linje (A har «tatt igjen»)</li>
            <li>(f) <strong>B passerer A:</strong> ved den tidlige kryssingen, når B's linje krysser A's kurve på vei opp (mens A nesten står stille)</li>
          </ul>
        </Step>
        <Pitfall>
          x-t-grafer er ikke bevegelses­bilder i rommet. Aksen «opp» på grafen
          betyr ikke fysisk «opp» — det betyr bare større x-koordinat. To biler
          som «krysser» på grafen er ved <em>samme x-koordinat på samme tid</em>,
          uansett hvor de fysisk er på veien.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: A starter foran og står nesten stille, men akselererer
          jevnt — som en parkert bil som langsomt setter seg i gang. B er en
          allerede pågående bil med konstant fart. Først passerer B forbi A,
          så tar A igjen og passerer B en stund senere når akselerasjonen har gjort A til den raskeste.
        </p>
      </div>
    ),
    summary: (
      <p>
        Skjæring av x-t-kurver = samme posisjon. Lik stigning = samme hastighet.
        To kryssinger ⇒ to «innhentinger».
      </p>
    ),
  },

  // ==========================================================================
  // 2.29 — Politi-motorsykkel (Fig E2.29)
  // ==========================================================================
  "2.29": {
    title: "Politi-motorsykkel (Fig E2.29)",
    difficulty: "middels",
    pageRef: "s. 89",
    problem: (
      <div className="space-y-2">
        <p>
          Grafen i Fig. E2.29 viser hastigheten til en politi-motorsykkel som funksjon av tid.
          (a) Finn momentan akselerasjon ved <InlineLatex latex="t=3,7" /> og <InlineLatex latex="t=11\;\text{s}" />.
          (b) Hvor langt kjører politiet på de første 5 s? Første 9 s? Første 13 s?
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <line x1="40" y1="170" x2="300" y2="170" stroke="#6b7280" strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="170" stroke="#6b7280" strokeWidth="1" />
          <text x="20" y="25" fontSize="10" fill="#6b7280">v (m/s)</text>
          <text x="285" y="185" fontSize="10" fill="#6b7280">t (s)</text>
          {/* Profil: fra 0, øker til 45 ved t=5, faller til 20 ved t=9, konstant 20 til t=13 */}
          <path d="M 40 170 L 130 35 L 200 110 L 280 110" stroke="#ef4444" strokeWidth="2" fill="none" />
          <text x="105" y="30" fontSize="9" fill="#ef4444">45 m/s</text>
          <text x="190" y="105" fontSize="9" fill="#ef4444">20 m/s</text>
        </svg>
      </div>
    ),
    knowns: <p>v-t graf med tre faser: 0→45 m/s i 5 s, 45→20 m/s i 4 s (5–9 s), konstant 20 m/s (9–13 s).</p>,
    unknowns: <p>Akselerasjon ved t=3, 7, 11 s; strekning ved 5, 9, 13 s.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To dualiteter på v-t-graf">
          <p>
            v-t-grafen gir oss to ting samtidig:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Stigning</strong> = momentanakselerasjon
              <InlineLatex latex="\;a=dv/dt" />
            </li>
            <li>
              <strong>Areal under</strong> = forflytning
              <InlineLatex latex="\;\Delta x=\int v\,dt" />
            </li>
          </ul>
          <p>
            For rette segmenter er stigningen konstant og arealet er enkelt
            (rektangler og trekanter).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Identifisér de tre fasene fra grafen og finn stigningen i hver.</p> },
      { label: "Hint 2", content: <p>For arealet: trekant <InlineLatex latex="\;\tfrac12 \cdot \text{base}\cdot\text{høyde}" />, trapes <InlineLatex latex="\;\tfrac12(a+b)h" />, rektangel <InlineLatex latex="\;b\cdot h" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Momentanakselerasjon = stigning på v-t">
          <p>De tre fasene gir tre konstante stigninger:</p>
          <FormulaBox latex="a_1=\dfrac{45-0}{5-0}=+9{,}0\;\text{m/s}^2\;(0\le t\le 5)" />
          <FormulaBox latex="a_2=\dfrac{20-45}{9-5}=\dfrac{-25}{4}=-6{,}25\;\text{m/s}^2\;(5\le t\le 9)" />
          <FormulaBox latex="a_3=0\;\text{m/s}^2\;(9\le t\le 13)" />
          <p>Sett inn de aktuelle tidspunktene (i sin respektive fase):</p>
          <FormulaBox variant="gold" latex="a(3)=+9{,}0,\;a(7)=-6{,}25,\;a(11)=0\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(b) Strekning = areal under v-t">
          <p>Arealet under v-t-kurven gir forflytningen, beregnes geometrisk:</p>
          <p><strong>0 til 5 s:</strong> trekant med base 5 og høyde 45.</p>
          <FormulaBox latex="d(0\to 5)=\tfrac12(5)(45)=112{,}5\;\text{m}" />
          <p><strong>5 til 9 s:</strong> trapes med høyde 4 og parallelle sider 45 og 20.</p>
          <FormulaBox latex="d(5\to 9)=\tfrac12(45+20)(4)=\tfrac12(65)(4)=130\;\text{m}" />
          <p><strong>9 til 13 s:</strong> rektangel med base 4 og høyde 20.</p>
          <FormulaBox latex="d(9\to 13)=20\cdot 4=80\;\text{m}" />
          <p>Total strekning fra start:</p>
          <FormulaBox latex="d(5)=112{,}5\;\text{m}" />
          <FormulaBox latex="d(9)=112{,}5+130=242{,}5\;\text{m}" />
          <FormulaBox latex="d(13)=242{,}5+80=322{,}5\;\text{m}" />
          <FormulaBox variant="gold" latex="d_5=112{,}5,\;d_9=242{,}5,\;d_{13}=322{,}5\;\text{m}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: politiet akselererer kraftig opp til 45 m/s (162 km/t),
          slipper på gassen og bremser ned til 20 m/s (72 km/t), og holder så
          den farten — typisk profil for en utrykning som «sprinter» på en strekning
          og så «cruise»-er.
        </p>
      </div>
    ),
    summary: <p>Areal under v-t = forflytning. Stigning = akselerasjon.</p>,
  },

  // ==========================================================================
  // 2.37 — Stein kastet rett opp 24 m/s
  // ==========================================================================
  "2.37": {
    title: "Stein kastet rett opp 24,0 m/s — retning av v og a",
    difficulty: "lett",
    pageRef: "s. 89",
    problem: (
      <p>
        En stein kastes rett oppover med en initialfart 24,0 m/s. Se bort fra luft­motstand. (a) Ved
        <InlineLatex latex="\;t=1{,}0\;\text{s}" />, hva er retningene til hastigheten og akselerasjonen
        av steinen? Øker eller minker farten? (b) Ved <InlineLatex latex="\;t=3{,}0\;\text{s}" />, samme
        spørsmål.
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=+24{,}0\;\text{m/s},\;g=9{,}80\;\text{m/s}^2" /> (med +y oppover).</p>,
    unknowns: <p>Retning av v og a, og om fart øker eller minker, ved t = 1 s og t = 3 s.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Fritt fall — én konstant akselerasjon">
          <p>
            Når luft­motstand neglisjeres, har et legeme i fritt fall
            <em> alltid</em> samme akselerasjon — <InlineLatex latex="g=9{,}80\;\text{m/s}^2" />
            nedover (i −y-retning hvis +y er opp). Dette gjelder uansett om legemet
            beveger seg opp, ned, eller står stille (i toppen).
          </p>
          <FormulaBox variant="gold" latex="\vec a=-g\hat\jmath" />
          <p>
            Den momentane hastigheten i +y-retning er
            <InlineLatex latex="\;v_y(t)=v_0-gt" />.
          </p>
          <p>
            Fart øker når <InlineLatex latex="\vec v" /> og <InlineLatex latex="\vec a" />
            har <em>samme retning</em>; fart minker når de er motsatte.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Toppen nås når <InlineLatex latex="v(t)=0" />: <InlineLatex latex="\;t_\text{topp}=v_0/g\approx 2{,}45" /> s.</p> },
      { label: "Hint 2", content: <p>Sammenlign fortegn på v og a: like fortegn = farten øker; motsatte fortegn = farten minker.</p> },
    ],
    solution: (
      <div>
        <p>
          Husk: under hele bevegelsen er
          <InlineLatex latex="\;a=-9{,}80\;\text{m/s}^2" /> (nedover). Det er
          ingen «to akselerasjoner» (én opp, én ned) — bare retningen på
          hastigheten endres.
        </p>
        <Step n={1} title="Toppen nås ved">
          <FormulaBox latex="t_\text{topp}=v_0/g=24{,}0/9{,}80\approx 2{,}45\;\text{s}" />
          <p>Så ved t=1 s er steinen på vei opp; ved t=3 s er den på vei ned.</p>
        </Step>
        <Step n={2} title="(a) ved t = 1,0 s (på vei opp)">
          <FormulaBox latex="v(1)=24{,}0-9{,}80(1{,}00)=+14{,}2\;\text{m/s}" />
          <p>
            <strong>Retning av v:</strong> oppover (positivt fortegn).<br/>
            <strong>Retning av a:</strong> nedover (alltid).<br/>
            <strong>v og a er motsatte ⇒ farten minker.</strong>
          </p>
        </Step>
        <Step n={3} title="(b) ved t = 3,0 s (på vei ned)">
          <FormulaBox latex="v(3)=24{,}0-9{,}80(3{,}00)=24{,}0-29{,}4=-5{,}4\;\text{m/s}" />
          <p>
            <strong>Retning av v:</strong> nedover (negativt fortegn).<br/>
            <strong>Retning av a:</strong> nedover (alltid).<br/>
            <strong>v og a er like ⇒ farten øker.</strong>
          </p>
        </Step>
        <Pitfall>
          a er <em>konstant</em> −9,80 m/s² gjennom hele bevegelsen — også
          akkurat ved toppen, hvor v=0! Mange tror feilaktig at a=0 ved toppen
          fordi steinen «står stille der». Det er feil — steinen står stille
          bare et infinitesimalt øyeblikk; akselerasjonen er den samme, og det
          er den som gjør at steinen straks etter har negativ v.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: dette er hovedlærdommen om fritt fall — én konstant
          akselerasjon driver hele bevegelsen, uansett om legemet stiger,
          stopper momentant ved toppen, eller faller ned igjen.
        </p>
      </div>
    ),
    summary: (
      <p>
        I fritt fall er a alltid −g, uansett hvor steinen er eller hvilken
        retning v har. v og a samme fortegn ⇒ farten øker; motsatte ⇒ farten minker.
      </p>
    ),
  },

  // ==========================================================================
  // 2.38 — Murstein faller 1,90 s
  // ==========================================================================
  "2.38": {
    title: "Murstein faller fra tak — 1,90 s",
    difficulty: "lett",
    pageRef: "s. 89",
    problem: (
      <p>
        En murstein slippes (null initialfart) fra taket til en bygning. Mursteinen treffer bakken på
        1,90 s. Du kan ignorere luftmotstand, så mursteinen er i fritt fall. (a) Hvor høyt, i meter, er
        bygningen? (b) Hvor stor er mursteinens fart rett før den treffer bakken? (c) Skisser a-t, v-t,
        og y-t-grafer for mursteinens bevegelse.
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=0,\;t=1{,}90\;\text{s},\;g=9{,}80\;\text{m/s}^2" />.</p>,
    unknowns: <p>(a) Bygningshøyde h. (b) Slutt­fart v.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Fritt fall fra ro — to grunnlikninger">
          <p>Når <InlineLatex latex="v_0=0" /> og a = −g (nedover), forenkles kinematikken:</p>
          <FormulaBox variant="gold" latex="h=\tfrac12 g t^2,\quad v=gt" />
          <p>
            Disse er to av de fire kinematiske ligningene med
            <InlineLatex latex="\;v_0=0" /> innsatt. Man kan også bruke
            <InlineLatex latex="\;v^2=2gh" /> hvis man ikke trenger tiden.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Velg +y nedover for enkelhet, så blir tegn-håndtering trivielt.</p> },
      { label: "Hint 2", content: <p>Slutt­farten kan også sjekkes med <InlineLatex latex="\;v^2=2gh" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Bygningshøyde">
          <p>Med +y nedover, <InlineLatex latex="\;v_0=0" />, falltid t = 1,90 s:</p>
          <FormulaBox latex="h=\tfrac12 g t^2=\tfrac12(9{,}80\;\text{m/s}^2)(1{,}90\;\text{s})^2" />
          <FormulaBox latex="=\tfrac12(9{,}80)(3{,}61)=17{,}689\;\text{m}" />
          <FormulaBox variant="gold" latex="h\approx 17{,}7\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Slutt­fart rett før bakken">
          <FormulaBox latex="v=gt=(9{,}80\;\text{m/s}^2)(1{,}90\;\text{s})=18{,}62\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 18{,}6\;\text{m/s nedover}" />
        </Step>
        <Step n={3} title="Sjekk konsistens">
          <p>Bruk den tidløse ligningen som kontroll:</p>
          <FormulaBox latex="v^2=2gh=2(9{,}80)(17{,}69)=346{,}7\Rightarrow v=18{,}62\;\text{m/s}\;\checkmark" />
        </Step>
        <Step n={4} title="(c) Grafer">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>a-t:</strong> konstant horisontal linje på y = 9,80 m/s² (med +y nedover)</li>
            <li><strong>v-t:</strong> rett, oppadgående linje fra origo, stigning 9,80</li>
            <li><strong>y-t:</strong> oppadgående parabel som åpner oppover (siden a&gt;0 nedover)</li>
          </ul>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 17,7 m er omtrent en 5-etasjes bygning. Slutt­farten
          18,6 m/s er ca. 67 km/t — nok til at en murstein gjør betydelig skade.
          Det er hvorfor man aldri legger materialer ubevoktet på tak.
        </p>
      </div>
    ),
    summary: <p>Fritt fall fra ro: <InlineLatex latex="h=\tfrac12gt^2" />, <InlineLatex latex="v=gt" />, <InlineLatex latex="v^2=2gh" />.</p>,
  },

  // ==========================================================================
  // 2.41 — Launch Failure 7500 kg rocket
  // ==========================================================================
  "2.41": {
    title: "Launch Failure — 7500 kg rakett",
    difficulty: "vanskelig",
    pageRef: "s. 89",
    problem: (
      <p>
        En 7500 kg rakett blåser av oppskytings­plattformen rett opp med konstant oppadrettet
        akselerasjon 2,25 m/s² og kjenner ingen merkbar luft­motstand. Når den har nådd høyde 525 m,
        svikter motoren plutselig; den eneste kraften som virker på raketten er nå tyngde­kraft.
        (a) Hva er den maksimale høyden raketten vil nå over oppskytings­plattformen? (b) Hvor mye
        tid forløper etter motorsvikt før raketten styrter tilbake til oppskytings­plattformen, og
        hvor fort beveger den seg da? (c) Skisser a-t, v-t og y-t-grafer for rakettens bevegelse fra
        det øyeblikket den letter til den treffer bakken.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Fase 1: a=+2,25 m/s², h=525 m</li>
        <li>Fase 2: a=−9,80 m/s² (fritt fall)</li>
      </ul>
    ),
    unknowns: <p>(a) Maksimal høyde nådd. (b) Tid etter motorsvikt til fall, og fart ved nedslag.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To-fase-problem — broen mellom fasene">
          <p>
            Et rakett­problem som dette er klassisk «to faser med ulik akselerasjon».
            Strategien er:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Finn slutt­tilstanden i fase 1 (motorbrenning) — bruk
              <InlineLatex latex="\;v^2=v_0^2+2a\Delta y" />.
            </li>
            <li>Det blir startverdier for fase 2 (fritt fall).</li>
            <li>I fase 2 er a=−9,80 m/s² (gravitasjon alene). Motoren leverer ingen kraft lenger.</li>
          </ol>
          <p>
            Kritisk: <em>raketten beveger seg fortsatt oppover</em> ved svikten —
            den har 48,6 m/s oppover som starthastighet for fase 2.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Fase 1: bruk <InlineLatex latex="\;v_1^2=2(2{,}25)(525)" /> for å finne fart ved svikt.</p> },
      { label: "Hint 2", content: <p>Fase 2 starter med <InlineLatex latex="\;y=525\;\text{m},\;v=+48{,}6\;\text{m/s},\;a=-9{,}80\;\text{m/s}^2" />.</p> },
      { label: "Hint 3", content: <p>For maks høyde: i fase 2, sett <InlineLatex latex="\;v=0" /> og bruk tidløs ligning på <InlineLatex latex="\;\Delta y=v_1^2/(2g)" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Fase 1: fart ved motorsvikt (etter 525 m oppover med a₁=2,25)">
          <FormulaBox latex="v_1^2=v_0^2+2a_1\Delta y=0+2(2{,}25)(525)=2362{,}5" />
          <FormulaBox latex="v_1=\sqrt{2362{,}5}=48{,}6\;\text{m/s (oppover)}" />
        </Step>
        <Step n={2} title="(a) Maksimal høyde — fortsett oppover i fritt fall">
          <p>
            Etter svikten har raketten fortsatt 48,6 m/s oppover. Den vil stige
            videre til hastigheten igjen er null:
          </p>
          <FormulaBox latex="\Delta h=\dfrac{v_1^2}{2g}=\dfrac{(48{,}6)^2}{2(9{,}80)}=\dfrac{2362{,}5}{19{,}60}=120{,}5\;\text{m}" />
          <p>Total høyde over plattformen:</p>
          <FormulaBox latex="h_\text{maks}=525+120{,}5=645{,}5\;\text{m}" />
          <FormulaBox variant="gold" latex="h_\text{maks}\approx 646\;\text{m}" />
        </Step>
        <Step n={3} title="(b) Tid og fart ved nedslag etter svikt">
          <p>
            Sett +y oppover med origo i bakken. Etter svikten:
            <InlineLatex latex="\;y_0=525\;\text{m},\;v_0=+48{,}6\;\text{m/s},\;a=-9{,}80" />.
            Vi vil ha y=0:
          </p>
          <FormulaBox latex="0=525+48{,}6\,t-\tfrac12(9{,}80)t^2=525+48{,}6\,t-4{,}90\,t^2" />
          <p>Andregradsligning <InlineLatex latex="4{,}90t^2-48{,}6t-525=0" />:</p>
          <FormulaBox latex="t=\dfrac{48{,}6+\sqrt{(48{,}6)^2+4(4{,}90)(525)}}{2(4{,}90)}" />
          <FormulaBox latex="=\dfrac{48{,}6+\sqrt{2362{,}5+10\,290}}{9{,}80}=\dfrac{48{,}6+\sqrt{12\,652{,}5}}{9{,}80}" />
          <FormulaBox latex="=\dfrac{48{,}6+112{,}5}{9{,}80}=16{,}4\;\text{s}" />
          <p>Fart ved nedslag:</p>
          <FormulaBox latex="v=v_0-gt=48{,}6-9{,}80(16{,}4)=-112\;\text{m/s}" />
          <FormulaBox variant="gold" latex="t\approx 16{,}4\;\text{s etter svikt},\;v\approx 112\;\text{m/s nedover}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 112 m/s er ca. 400 km/t — bekreftet katastrofal hastighet
          for en rakett som styrter. Den maksimale høyden 646 m er ca. dobbelt
          så høy som Eiffeltårnet. Etter svikten henger raketten i lufta
          (som en kule kastet rett opp) og faller fritt ned.
        </p>
        <Pitfall>
          Ikke begå feilen å glemme den oppadgående hastigheten ved svikten.
          Raketten faller IKKE umiddelbart; den fortsetter å stige i ca. 5 s
          etter motorsvikt før den når toppen. Først DA begynner den å falle.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Rakett-problem: del opp i fase med motor, og fritt-fall-fase. Bruk
        <InlineLatex latex="\;v^2=v_0^2+2a\Delta y" /> for å bygge bro mellom fasene.
      </p>
    ),
  },

  // ==========================================================================
  // 2.44 — Egg passerer cornice 30 m below, 5 s
  // ==========================================================================
  "2.44": {
    title: "Egg fra bygning — passerer karnissen 30 m ned",
    difficulty: "vanskelig",
    pageRef: "s. 90",
    problem: (
      <p>
        Et egg kastes nesten vertikalt oppover fra et punkt nær kornisjen til en høy bygning. Egget
        passerer kornisjen på vei ned 30,0 m under start­punktet 5,00 s etter at det forlot kasterens
        hånd. Se bort fra luftmotstand. (a) Hva er initial­farten til egget? (b) Hvor høyt over
        startpunktet stiger egget? (c) Hva er størrelsen på egget farten ved høyeste punkt?
        (d) Hva er størrelsen og retningen på egget akselerasjon ved høyeste punkt? (e) Skisser
        a-t, v-t og y-t-grafer.
      </p>
    ),
    knowns: <p>y(5,00)=−30,0 m fra startpunktet. <InlineLatex latex="g=9{,}80\;\text{m/s}^2" />.</p>,
    unknowns: <p>(a) Initialfart <InlineLatex latex="v_0" />. (b) Maks høyde over startpunktet. (c) Fart ved toppen. (d) Akselerasjon ved toppen.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Loddrett kast med kjent posisjon på et senere tidspunkt">
          <p>
            Med +y oppover og origo i kasterens hånd er bevegelses­ligningen
            <InlineLatex latex="\;y(t)=v_0t-\tfrac12 gt^2" />.
            Setter vi inn (t, y(t)) = (5,00 s, −30,0 m) får vi en lineær ligning
            i <InlineLatex latex="v_0" />.
          </p>
          <p>
            For maks høyde: i fritt fall stiger objektet til
            <InlineLatex latex="\;v=0" />, og høyden er
            <InlineLatex latex="\;h=v_0^2/(2g)" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Sett inn t = 5,00 s og y = −30,0 m i <InlineLatex latex="\;y=v_0t-\tfrac12gt^2" />, løs for <InlineLatex latex="v_0" />.</p> },
      { label: "Hint 2", content: <p>(b) Bruk <InlineLatex latex="\;v^2=v_0^2-2gh" /> med <InlineLatex latex="\;v=0" />.</p> },
      { label: "Hint 3", content: <p>(c)–(d) Ved toppen er v=0 men a er fortsatt −g!</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Finn initialfarten">
          <p>Sett inn (t, y) = (5,00 s, −30,0 m) i bevegelses­ligningen:</p>
          <FormulaBox latex="-30{,}0=v_0(5{,}00)-\tfrac12(9{,}80)(5{,}00)^2" />
          <FormulaBox latex="-30{,}0=5{,}00v_0-122{,}5" />
          <FormulaBox latex="5{,}00v_0=-30{,}0+122{,}5=92{,}5\;\Rightarrow\;v_0=18{,}5\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_0\approx 18{,}5\;\text{m/s (oppover)}" />
        </Step>
        <Step n={2} title="(b) Maksimal høyde over kasterens hånd">
          <p>I toppen er <InlineLatex latex="\;v=0" />, så:</p>
          <FormulaBox latex="0=v_0^2-2gh\;\Rightarrow\;h=\dfrac{v_0^2}{2g}=\dfrac{(18{,}5)^2}{19{,}60}=\dfrac{342{,}25}{19{,}60}=17{,}5\;\text{m}" />
          <FormulaBox variant="gold" latex="h\approx 17{,}5\;\text{m over startpunktet}" />
        </Step>
        <Step n={3} title="(c) Hastighet ved toppen">
          <p>Per definisjon av topp­punkt: hastigheten er null.</p>
          <FormulaBox variant="gold" latex="v_\text{topp}=0" />
        </Step>
        <Step n={4} title="(d) Akselerasjon ved toppen">
          <p>
            I fritt fall er akselerasjonen konstant −g, uavhengig av posisjon
            eller hastighet:
          </p>
          <FormulaBox variant="gold" latex="a_\text{topp}=g=9{,}80\;\text{m/s}^2 \text{ (nedover)}" />
        </Step>
        <Step n={5} title="(e) Grafer">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>a-t:</strong> konstant −9,80 m/s² (med +y oppover)</li>
            <li><strong>v-t:</strong> rett, synkende linje fra +18,5 m/s gjennom v=0 ved t≈1,89 s, ned til negative verdier</li>
            <li><strong>y-t:</strong> nedover-åpen parabel som starter på 0, topper ved t≈1,89 s med h=17,5 m, krysser y=0 igjen ved t≈3,78 s, og er −30 m ved t=5</li>
          </ul>
        </Step>
        <Pitfall>
          v=0 ved toppen betyr <em>IKKE</em> at a=0. Akselerasjonen er konstant −g
          hele veien — også akkurat ved toppunktet. Mange tror at fordi egget
          står stille der, må kraften være null. Men kraften (gravitasjonen) er
          alltid den samme; det er hastigheten som er null momentant.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: kasteren slipper egget oppover; det stiger 17,5 m,
          snur, og passerer kasteren etter ca. 3,78 s med samme fart som det
          ble kastet (−18,5 m/s). 5 s etter kast er det 30 m under start, falt
          allerede 12,5 m forbi kasterens nivå. Dette er typisk symmetri i
          fritt fall.
        </p>
      </div>
    ),
    summary: (
      <p>
        Klassisk fritt fall: bruk
        <InlineLatex latex="\;y=v_0t-\tfrac12 gt^2" /> uten gimmicks. Husk:
        a er konstant −g hele veien.
      </p>
    ),
  },

  // ==========================================================================
  // 2.46 — Vulkan utkaster boulder 40 m/s
  // ==========================================================================
  "2.46": {
    title: "Vulkan kaster blokk — analyse av bevegelsen",
    difficulty: "middels",
    pageRef: "s. 90",
    problem: (
      <p>
        En stor steinblokk kastes vertikalt oppover fra en vulkan med initialfart 40,0 m/s.
        Se bort fra luftmotstand. (a) På hvilket tidspunkt etter utkastingen beveger blokken seg
        20,0 m/s oppover? (b) På hvilket tidspunkt beveger den seg 20,0 m/s nedover? (c) Når er
        forflytningen fra utgangs­posisjonen null? (d) Når er hastigheten til blokken null? (e) Hva
        er størrelsen og retningen på akselerasjonen mens blokken er (i) oppadgående, (ii)
        nedadgående, (iii) ved høyeste punkt? (f) Skisser y-t, v-t og a-t-grafer.
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=+40{,}0\;\text{m/s (oppover)},\;g=9{,}80\;\text{m/s}^2" />.</p>,
    unknowns: <p>Tidspunkter for spesifikke hastigheter, høyste punkt, retur til start.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Symmetri i fritt fall">
          <p>
            For et legeme kastet rett opp med initialfart <InlineLatex latex="v_0" />:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Det stiger og når toppen ved <InlineLatex latex="\;t=v_0/g" /> (når v=0).</li>
            <li>Det returnerer til startpunktet (Δy=0) ved <InlineLatex latex="\;t=2v_0/g" /> (dobbelt så lang tid).</li>
            <li>Hastigheten har samme størrelse på vei opp og på vei ned ved samme høyde, men motsatt retning.</li>
            <li>Akselerasjonen er <em>alltid</em> g nedover — også ved toppen.</li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a)–(b): bruk <InlineLatex latex="\;v=v_0-gt" /> direkte.</p> },
      { label: "Hint 2", content: <p>For (c) Δy=0: faktoriser ut t fra <InlineLatex latex="\;v_0t-\tfrac12 gt^2=0" />.</p> },
      { label: "Hint 3", content: <p>For (d) v=0: kjent symmetri t = v₀/g.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) v = +20,0 m/s (på vei opp)">
          <FormulaBox latex="20{,}0=40{,}0-9{,}80\,t\;\Rightarrow\;t=\dfrac{20{,}0}{9{,}80}=2{,}04\;\text{s}" />
        </Step>
        <Step n={2} title="(b) v = −20,0 m/s (på vei ned, samme størrelse)">
          <FormulaBox latex="-20{,}0=40{,}0-9{,}80\,t\;\Rightarrow\;t=\dfrac{60{,}0}{9{,}80}=6{,}12\;\text{s}" />
          <p>Symmetri: 2,04 + 6,12 = 8,16 s — like fjernt fra topp ved t=4,08 s.</p>
        </Step>
        <Step n={3} title="(c) Forflytning fra startpunktet er null">
          <p>Sett <InlineLatex latex="\;y=0" /> i <InlineLatex latex="\;y=v_0t-\tfrac12 gt^2" />:</p>
          <FormulaBox latex="0=v_0t-\tfrac12 gt^2=t(v_0-\tfrac12 gt)" />
          <p>
            Ene løsningen er trivial (<InlineLatex latex="t=0" />, start). Den andre:
          </p>
          <FormulaBox latex="t=\dfrac{2v_0}{g}=\dfrac{80{,}0}{9{,}80}=8{,}16\;\text{s}" />
        </Step>
        <Step n={4} title="(d) Hastighet null (toppen)">
          <FormulaBox latex="t_\text{topp}=\dfrac{v_0}{g}=\dfrac{40{,}0}{9{,}80}=4{,}08\;\text{s}" />
          <p>Toppen er midtveis i flygingen — perfekt symmetri.</p>
        </Step>
        <Step n={5} title="(e) Akselerasjonens størrelse og retning">
          <p>
            I alle faser av bevegelsen — på vei opp, ved toppen, og på vei ned —
            er akselerasjonen konstant:
          </p>
          <FormulaBox variant="gold" latex="a=g=9{,}80\;\text{m/s}^2\text{ nedover (alltid, også i (iii) ved toppen)}" />
        </Step>
        <Step n={6} title="(f) Grafer">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>y-t:</strong> nedover-åpen parabel; topp ved t=4,08 s med h ≈ 81,6 m</li>
            <li><strong>v-t:</strong> rett synkende linje fra +40 til −40 m/s, krysser null ved t=4,08 s</li>
            <li><strong>a-t:</strong> konstant horisontal linje på y = −9,80 m/s²</li>
          </ul>
        </Step>
        <Pitfall>
          (e-iii): Mange tror feilaktig at akselerasjonen er null på toppen
          fordi hastigheten er null der. Men det er nettopp akselerasjonen som
          gjør at hastigheten <em>ikke holder seg null</em> et øyeblikk senere.
          a = −g hele tiden.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: blokken stiger 81,6 m, snur, og lander tilbake i
          start­punktet med fart −40 m/s (samme størrelse, motsatt retning).
          Total flyge­tid 8,16 s. Symmetrien rundt topp­punktet er kjernekonseptet.
        </p>
      </div>
    ),
    summary: (
      <p>
        Symmetri i fritt fall: tider for samme |v| er like fjernt fra t_topp,
        og total «opp+ned»-tid er <InlineLatex latex="\;2v_0/g" />.
      </p>
    ),
  },

  // ==========================================================================
  // 2.49 — Rakett a = 2,80 t
  // ==========================================================================
  "2.49": {
    title: "Rakett — a(t)=2,80 t",
    difficulty: "middels",
    pageRef: "s. 90",
    problem: (
      <p>
        En rakett starter fra ro og beveger seg oppover fra jordoverflaten. For de første 10,0 s av
        bevegelsen er den vertikale akselerasjonen <InlineLatex latex="a_y=(2{,}80\;\text{m/s}^3)t" />.
        (+y er oppover.) (a) Hva er rakettens høyde over jordoverflaten ved <InlineLatex latex="t=10{,}0\;\text{s}" />?
        (b) Hva er farten ved <InlineLatex latex="t=10{,}0\;\text{s}" />?
      </p>
    ),
    knowns: <p><InlineLatex latex="a(t)=(2{,}80\;\text{m/s}^3)t,\;v(0)=0,\;y(0)=0" />.</p>,
    unknowns: <p>(a) y(10,0). (b) v(10,0).</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel akselerasjon — dobbel integrasjon">
          <p>
            Når a(t) er gitt og vi vil ha hastighet og posisjon, integrerer vi
            to ganger:
          </p>
          <FormulaBox variant="gold" latex="v(t)=v_0+\int_0^t a(t')\,dt',\quad y(t)=y_0+\int_0^t v(t')\,dt'" />
          <p>
            Initial­betingelsene <InlineLatex latex="v(0)=0,\;y(0)=0" /> gjør at
            integrasjons­konstantene blir 0 her.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Integrer <InlineLatex latex="\;a(t)=2{,}80\,t" />: <InlineLatex latex="\;v(t)=\int 2{,}80\,t\,dt=1{,}40\,t^2" />.</p> },
      { label: "Hint 2", content: <p>Integrer hastigheten: <InlineLatex latex="\;y(t)=\int 1{,}40\,t^2\,dt=(1{,}40/3)t^3" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Integrer a(t) for å få v(t)">
          <FormulaBox latex="v(t)=v_0+\int_0^t a(t')\,dt'=0+\int_0^t 2{,}80\,t'\,dt'" />
          <FormulaBox latex="=2{,}80\cdot\dfrac{t^2}{2}=1{,}40\,t^2" />
          <p>Sett inn t = 10,0 s:</p>
          <FormulaBox latex="v(10{,}0)=1{,}40(10{,}0)^2=1{,}40(100)=140\;\text{m/s}" />
        </Step>
        <Step n={2} title="Integrer v(t) for å få y(t)">
          <FormulaBox latex="y(t)=y_0+\int_0^t v(t')\,dt'=0+\int_0^t 1{,}40\,t'^2\,dt'" />
          <FormulaBox latex="=1{,}40\cdot\dfrac{t^3}{3}\approx 0{,}4667\,t^3" />
          <p>Sett inn t = 10,0 s:</p>
          <FormulaBox latex="y(10{,}0)=\dfrac{1{,}40}{3}(10{,}0)^3=\dfrac{1{,}40}{3}(1000)=466{,}7\;\text{m}" />
          <FormulaBox variant="gold" latex="v(10{,}0)=140\;\text{m/s},\;y(10{,}0)\approx 467\;\text{m}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: ved t=10 s har raketten 140 m/s (om lag 500 km/t) og
          er nesten en halv kilometer over bakken. Akselerasjonen ved da er
          a(10) = 28 m/s² — nesten 3 g, kraftig men plausibel for en rakett.
        </p>
        <Pitfall>
          Ikke forveksle dobbelt-integrasjon med gangetall. Her er
          <InlineLatex latex="\;y\ne \tfrac12 at^2" /> fordi a er ikke konstant.
          Bruk integrasjonen riktig.
        </Pitfall>
      </div>
    ),
    summary: <p>Variabel a: dobbel integrering. <InlineLatex latex="v=\int a\,dt" />, så <InlineLatex latex="y=\int v\,dt" />.</p>,
  },

  // ==========================================================================
  // 2.51 — Motorsykkel a = At − Bt²
  // ==========================================================================
  "2.51": {
    title: "Motorsykkel — a(t) = At − Bt²",
    difficulty: "vanskelig",
    pageRef: "s. 90",
    problem: (
      <p>
        Akselerasjonen av en motorsykkel er gitt ved <InlineLatex latex="a_x(t)=At-Bt^2" />, hvor
        <InlineLatex latex="\;A=1{,}50\;\text{m/s}^3" /> og <InlineLatex latex="B=0{,}120\;\text{m/s}^4" />.
        Motorsykkelen er i ro ved origo ved <InlineLatex latex="t=0" />. (a) Finn dens posisjon og
        hastighet som funksjoner av tid. (b) Beregn maksimal hastighet den oppnår.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="a_x(t)=At-Bt^2" /> med <InlineLatex latex="A=1{,}50\;\text{m/s}^3" />, <InlineLatex latex="B=0{,}120\;\text{m/s}^4" /></li>
        <li>Initialbetingelser: <InlineLatex latex="v(0)=0,\;x(0)=0" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v(t)" /> og <InlineLatex latex="x(t)" />. (b) <InlineLatex latex="v_\text{maks}" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel akselerasjon — finn v og x ved integrasjon">
          <p>
            Når <InlineLatex latex="a(t)" /> ikke er konstant, kan du <em>ikke</em> bruke
            kinematikkformlene. Gå tilbake til definisjonene:
          </p>
          <FormulaBox variant="gold" latex="v(t)=v_0+\int_0^t a(t')\,dt',\quad x(t)=x_0+\int_0^t v(t')\,dt'" />
          <p>
            <strong>Når er v størst?</strong> Hastigheten har stasjonær verdi når
            <InlineLatex latex="\;dv/dt=a=0" />. Sett <InlineLatex latex="a(t)=0" /> og løs for t.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Integrer ledd for ledd: <InlineLatex latex="\int t\,dt=t^2/2" />, <InlineLatex latex="\int t^2\,dt=t^3/3" />.</p> },
      { label: "Hint 2", content: <p>Maksimum av v(t) finner du der <InlineLatex latex="dv/dt=a(t)=0" />, dvs. <InlineLatex latex="At-Bt^2=t(A-Bt)=0" />. Ta den ikke-trivielle løsningen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">
          To ganger integrasjon: <InlineLatex latex="a\to v\to x" />. Deretter setter vi
          <InlineLatex latex="\;a=0\;" /> for å finne tidspunktet for maksimal hastighet.
        </p>
        <Step n={1} title="(a) Integrer a(t) til v(t)">
          <p>Med <InlineLatex latex="v(0)=0" />:</p>
          <FormulaBox latex="v(t)=\int_0^t (At'-Bt'^2)\,dt'=\dfrac{A}{2}t^2-\dfrac{B}{3}t^3" />
          <p>Sett inn tallverdier:</p>
          <FormulaBox variant="gold" latex="v(t)=(0{,}750\;\text{m/s}^3)\,t^2-(0{,}0400\;\text{m/s}^4)\,t^3" />
        </Step>
        <Step n={2} title="Integrer v(t) til x(t)">
          <p>Med <InlineLatex latex="x(0)=0" />:</p>
          <FormulaBox latex="x(t)=\int_0^t v(t')\,dt'=\dfrac{A}{6}t^3-\dfrac{B}{12}t^4" />
          <FormulaBox variant="gold" latex="x(t)=(0{,}250\;\text{m/s}^3)\,t^3-(0{,}0100\;\text{m/s}^4)\,t^4" />
        </Step>
        <Step n={3} title="(b) Tidspunkt for maksimal v">
          <p>Sett <InlineLatex latex="a(t)=0" />:</p>
          <FormulaBox latex="At-Bt^2=t(A-Bt)=0" />
          <p>Den trivielle løsningen <InlineLatex latex="t=0" /> tilsvarer start (v=0 — minimum). Den fysiske er:</p>
          <FormulaBox latex="t=\dfrac{A}{B}=\dfrac{1{,}50}{0{,}120}=12{,}5\;\text{s}" />
        </Step>
        <Step n={4} title="Sett inn for v_maks">
          <FormulaBox latex="v_\text{maks}=\dfrac{A}{2}t^2-\dfrac{B}{3}t^3=\dfrac12(1{,}50)(12{,}5)^2-\dfrac13(0{,}120)(12{,}5)^3" />
          <FormulaBox latex="=117{,}19-78{,}13\approx 39{,}1\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{maks}\approx 39{,}1\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Ikke bland v_maks og a_maks.</strong> v er størst når a krysser null (helningen
          er null). a er størst når <InlineLatex latex="da/dt=0" />, dvs. <InlineLatex latex="A-2Bt=0\Rightarrow t=A/(2B)=6{,}25\;\text{s}" />.
          Det er halvparten av tiden til v_maks. Etter <InlineLatex latex="t=12{,}5\;\text{s}" /> blir
          a negativ og motorsykkelen begynner å bremse.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: a(t) er en oppoverbøyd parabel som krysser null ved t=12,5 s. Frem til
          dette akselererer motorsykkelen (v vokser); etterpå bremser den. Toppfarten 39,1 m/s
          (≈141 km/t) inntreffer akkurat i krysningspunktet.
        </p>
      </div>
    ),
    summary: <p>v_max der a=0 (helningen til v(t) er null). Dobbel integrasjon gir x(t).</p>,
  },

  // ==========================================================================
  // 2.52 — Buss a = αt
  // ==========================================================================
  "2.52": {
    title: "Buss med a = αt",
    difficulty: "middels",
    pageRef: "s. 90",
    problem: (
      <p>
        Akselerasjonen til en buss er gitt ved <InlineLatex latex="a_x(t)=\alpha t" />, hvor
        <InlineLatex latex="\;\alpha=1{,}2\;\text{m/s}^3" />. (a) Hvis bussens hastighet ved
        <InlineLatex latex="\;t=1{,}0\;\text{s}" /> er 5,0 m/s, hva er hastigheten ved
        <InlineLatex latex="\;t=2{,}0\;\text{s}" />? (b) Hvis bussens posisjon ved <InlineLatex latex="t=1{,}0\;\text{s}" />
        er 6,0 m, hva er posisjonen ved <InlineLatex latex="t=2{,}0\;\text{s}" />? (c) Skisser
        <InlineLatex latex="a_x" />-t, <InlineLatex latex="v_x" />-t og x-t-grafer.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="a_x(t)=\alpha t" /> med <InlineLatex latex="\alpha=1{,}2\;\text{m/s}^3" /></li>
        <li><InlineLatex latex="v(1{,}0\;\text{s})=5{,}0\;\text{m/s}" /></li>
        <li><InlineLatex latex="x(1{,}0\;\text{s})=6{,}0\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v(2{,}0\;\text{s})" />. (b) <InlineLatex latex="x(2{,}0\;\text{s})" />. (c) Skisse av tre grafer.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Integrasjon fra et tidspunkt ≠ 0">
          <p>
            Når initialbetingelsene er gitt ved <InlineLatex latex="t=t_0\neq 0" />, gjør vi
            integralet med nedre grense t₀:
          </p>
          <FormulaBox variant="gold" latex="v(t)=v(t_0)+\int_{t_0}^t a(t')\,dt',\quad x(t)=x(t_0)+\int_{t_0}^t v(t')\,dt'" />
          <p>Det er ingen forskjell på matematikken — bare hold orden på grensene.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\int_1^t \alpha\,t'\,dt'=\dfrac{\alpha}{2}(t^2-1)" />.</p> },
      { label: "Hint 2", content: <p>For del (b): integrer v(t) du fant i (a) fra 1 til 2.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vi integrerer fra t = 1,0 s med oppgitt initialverdi.</p>
        <Step n={1} title="(a) Hastighet ved t = 2,0 s">
          <FormulaBox latex="v(t)=v(1)+\int_1^t \alpha\,t'\,dt'=5{,}0+\dfrac{\alpha}{2}(t^2-1)=5{,}0+0{,}6(t^2-1)" />
          <FormulaBox latex="v(2)=5{,}0+0{,}6(4-1)=5{,}0+1{,}80=6{,}80\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v(2{,}0\;\text{s})=6{,}80\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Posisjon ved t = 2,0 s">
          <p>Sett inn v(t) og integrer:</p>
          <FormulaBox latex="x(t)=x(1)+\int_1^t [5{,}0+0{,}6(t'^2-1)]\,dt'" />
          <FormulaBox latex="=6{,}0+5{,}0(t-1)+0{,}2(t^3-1)-0{,}6(t-1)" />
          <FormulaBox latex="x(2)=6{,}0+5{,}0(1)+0{,}2(8-1)-0{,}6(1)=6+5+1{,}4-0{,}6=11{,}8\;\text{m}" />
          <FormulaBox variant="gold" latex="x(2{,}0\;\text{s})=11{,}8\;\text{m}" />
        </Step>
        <Step n={3} title="(c) Grafer">
          <p>
            <strong>a-t:</strong> rett linje gjennom origo med stigning α=1,2.
            <strong> v-t:</strong> oppoverbøyd parabel (v vokser raskere etterhvert).
            <strong> x-t:</strong> tredjegradskurve (vokser enda raskere).
          </p>
        </Step>
        <Pitfall>
          <strong>Vanlig feil:</strong> sette nedre grense lik 0 og bruke v(0) = 0. Det gir feil
          v(2)! Bruk t₀ = 1,0 s og v(1) = 5,0 m/s siden det er det oppgaven oppgir.
        </Pitfall>
      </div>
    ),
    summary: <p>Variabel a: integrer fra startpunktet (ikke alltid t=0).</p>,
  },

  // ==========================================================================
  // 2.54 — CALC måne­lander y(t) = b − ct + dt²
  // ==========================================================================
  "2.54": {
    title: "Måne­lander y(t) = b − ct + dt²",
    difficulty: "middels",
    pageRef: "s. 90",
    problem: (
      <p>
        En måne­lander synker mot månens overflate. Inntil landeren når overflaten er dens høyde
        over overflaten gitt ved <InlineLatex latex="\;y(t)=b-ct+dt^2" />, hvor <InlineLatex latex="b=800\;\text{m}" />
        er initial­høyden, <InlineLatex latex="c=60{,}0\;\text{m/s}" />, og <InlineLatex latex="d=1{,}05\;\text{m/s}^2" />.
        (a) Hva er initial­hastigheten til landeren, ved <InlineLatex latex="t=0" />? (b) Hva er hastigheten
        til landeren rett før den når overflaten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="y(t)=b-ct+dt^2" /> med <InlineLatex latex="b=800\;\text{m}" />, <InlineLatex latex="c=60{,}0\;\text{m/s}" />, <InlineLatex latex="d=1{,}05\;\text{m/s}^2" /></li>
        <li>y måles fra månens overflate (y=0 ⇒ landing)</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v(0)" />. (b) <InlineLatex latex="v" /> idet <InlineLatex latex="y=0" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Hastighet fra posisjon: v = dy/dt">
          <p>
            Når y(t) er kjent, er <InlineLatex latex="v_y(t)=dy/dt" /> den momentane vertikale
            hastigheten. Akselerasjonen er <InlineLatex latex="a_y=dv/dt=d^2y/dt^2" />.
          </p>
          <FormulaBox variant="gold" latex="v_y(t)=\dfrac{dy}{dt},\quad a_y(t)=\dfrac{d^2y}{dt^2}" />
          <p>For å finne hastigheten <em>ved landing</em>: finn først tiden t_l der y(t_l)=0, sett inn i v(t).</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Deriver: <InlineLatex latex="v(t)=-c+2dt" />. Sett t=0 for initialhastighet.</p> },
      { label: "Hint 2", content: <p>For (b): Andregradsligningen <InlineLatex latex="dt^2-ct+b=0" /> har to røtter. Den minste tilsvarer landing (oppgaven slutter når landeren treffer overflaten).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">y(t) er gitt eksplisitt — vi deriverer og evaluerer.</p>
        <Step n={1} title="(a) Initialhastighet v(0)">
          <FormulaBox latex="v(t)=\dfrac{dy}{dt}=-c+2dt=-60{,}0+2{,}10\,t" />
          <FormulaBox latex="v(0)=-60{,}0\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v(0)=-60{,}0\;\text{m/s}\;\text{(60 m/s nedover)}" />
        </Step>
        <Step n={2} title="(b) Tid for landing">
          <p>Sett y=0:</p>
          <FormulaBox latex="0=800-60{,}0t+1{,}05t^2" />
          <FormulaBox latex="t=\dfrac{60{,}0\pm\sqrt{(60)^2-4(1{,}05)(800)}}{2(1{,}05)}=\dfrac{60{,}0\pm\sqrt{3600-3360}}{2{,}10}=\dfrac{60{,}0\pm\sqrt{240}}{2{,}10}" />
          <FormulaBox latex="t_1=\dfrac{60{,}0-15{,}49}{2{,}10}=21{,}19\;\text{s},\quad t_2=\dfrac{60{,}0+15{,}49}{2{,}10}=35{,}95\;\text{s}" />
          <p>Vi tar den <em>minste</em> roten (landingen) — den andre tilsvarer at modellen y(t) ekstrapolerer videre.</p>
        </Step>
        <Step n={3} title="Hastighet ved landing">
          <FormulaBox latex="v(21{,}19)=-60{,}0+2{,}10(21{,}19)=-60{,}0+44{,}50=-15{,}5\;\text{m/s}" />
          <FormulaBox variant="gold" latex="|v|\approx 15{,}5\;\text{m/s nedover ved landing}" />
        </Step>
        <Pitfall>
          <strong>Hvorfor saktes den ned?</strong> Akselerasjonen er <InlineLatex latex="a=2d=+2{,}10\;\text{m/s}^2" /> (positiv =
          oppover). Det betyr at landerens motorer bremser fallet. Hvis du tar den største
          roten av andregradsligningen får du «hastigheten oppover etter at landeren snur» —
          fysisk meningsløst i denne oppgaven.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Landeren starter med 60 m/s nedover og bremser jevnt. Den treffer
          månens overflate med ca. 15,5 m/s — relativt mykt sammenlignet med fritt fall (uten
          motorbremsing ville den ha truffet med ca. 51 m/s på månen).
        </p>
      </div>
    ),
    summary: <p>Når y(t) er gitt: deriver for v, sett y=0 for landings­tid, ta minste rot.</p>,
  },

  // ==========================================================================
  // 2.60 — Tunnelbane
  // ==========================================================================
  "2.60": {
    title: "Tunnelbane mellom to stasjoner",
    difficulty: "middels",
    pageRef: "s. 90",
    problem: (
      <p>
        En tunnel­bane starter fra en stasjon og akselererer med 1,60 m/s² i 14,0 s. Den kjører
        deretter med konstant fart i 70,0 s og bremser med 3,50 m/s² inntil den stopper på neste
        stasjon. Finn den totale strekningen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Fase 1: a₁=1,60 m/s² i 14,0 s</li>
        <li>Fase 2: konstant fart 70 s</li>
        <li>Fase 3: a₃=−3,50 m/s² til stopp</li>
      </ul>
    ),
    unknowns: <p>Total strekning fra stasjon til stasjon.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Sammensatt bevegelse — del opp i faser">
          <p>
            Når akselerasjonen <em>endres</em> mellom konstante verdier, deler vi bevegelsen
            inn i faser med konstant a. Hver fase håndteres med kinematikkformlene; så
            kobles fasene sammen via felles slutt-/start­hastighet.
          </p>
          <FormulaBox variant="gold" latex="v_f=v_0+at,\quad d=v_0t+\tfrac12 at^2,\quad v_f^2=v_0^2+2ad" />
          <p>
            Kontinuitets­regel: «Topp­farten» mellom akselerasjon og brems er felles for begge
            fasene, så vi bruker den som lim mellom dem.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Topp­fart finner du fra fase 1: <InlineLatex latex="v=a_1 t_1" />.</p> },
      { label: "Hint 2", content: <p>Bremsestrekningen fra fase 3 finnes uten å vite tiden direkte: <InlineLatex latex="v^2=v_\text{topp}^2-2|a_3|d_3" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tre faser. Vi finner topp­farten først, så strekning per fase.</p>
        <Step n={1} title="Topp­fart etter akselerasjons­fasen">
          <FormulaBox latex="v_\text{topp}=a_1\,t_1=(1{,}60)(14{,}0)=22{,}4\;\text{m/s}" />
        </Step>
        <Step n={2} title="Strekning fase 1 (akselerasjon fra ro)">
          <FormulaBox latex="d_1=\tfrac12 a_1 t_1^2=\tfrac12(1{,}60)(14{,}0)^2=156{,}8\;\text{m}" />
        </Step>
        <Step n={3} title="Strekning fase 2 (konstant fart)">
          <FormulaBox latex="d_2=v_\text{topp}\,t_2=(22{,}4)(70{,}0)=1568\;\text{m}" />
        </Step>
        <Step n={4} title="Strekning fase 3 (bremsing til ro)">
          <FormulaBox latex="0=v_\text{topp}^2-2|a_3|\,d_3\Rightarrow d_3=\dfrac{v_\text{topp}^2}{2|a_3|}=\dfrac{(22{,}4)^2}{2(3{,}50)}=71{,}68\;\text{m}" />
        </Step>
        <Step n={5} title="Total strekning">
          <FormulaBox latex="d_\text{tot}=d_1+d_2+d_3=156{,}8+1568+71{,}7=1797\;\text{m}" />
          <FormulaBox variant="gold" latex="d_\text{tot}\approx 1{,}80\;\text{km}" />
        </Step>
        <Pitfall>
          <strong>Bremsefasen krever ikke å regne ut tiden t₃.</strong> Mange bruker
          <InlineLatex latex="\;d_3=v_\text{topp}t_3-\tfrac12|a_3|t_3^2" /> som krever to skritt.
          Bruk den «tids-frie» formelen <InlineLatex latex="\;v_f^2=v_0^2-2|a|d" /> for én linje.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 87 % av strekningen tilbakelegges i fase 2 (konstant fart). Det er
          typisk for tunnel­baner — det meste av tiden brukes på cruising mellom stasjoner.
        </p>
      </div>
    ),
    summary: <p>Tre faser, tre strekninger. Topp­fart binder dem sammen.</p>,
  },

  // ==========================================================================
  // 2.62 — Tog kollisjon (Fig P2.62)
  // ==========================================================================
  "2.62": {
    title: "Passasjertog innhenter godstog (Fig P2.62)",
    difficulty: "vanskelig",
    pageRef: "s. 91",
    problem: (
      <div className="space-y-2">
        <p>
          Sjåføren av et passasjer­tog som beveger seg med 25,0 m/s ser et godstog hvis hale er 200 m
          foran på samme spor (Fig. P2.62). Godstoget beveger seg i samme retning som passasjer­toget
          med 15,0 m/s. Sjåføren av passasjer­toget anvender umiddelbart bremsene som gir konstant
          akselerasjon −0,100 m/s² mens godstoget fortsetter med konstant fart. (a) Vil kollisjonen
          skje? (b) I så fall hvor? (c) På én graf, skisser posisjonene til fronten av passasjer­toget
          og halen av godstoget.
        </p>
        <svg viewBox="0 0 360 80" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* Passasjertog */}
          <rect x="20" y="30" width="80" height="20" fill="#3b82f6" />
          <line x1="100" y1="40" x2="135" y2="40" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k2)" />
          <text x="20" y="25" fontSize="9" fill="#3b82f6">25 m/s, a = −0,1</text>
          {/* Godstog */}
          <rect x="240" y="30" width="60" height="20" fill="#ef4444" />
          <line x1="300" y1="40" x2="335" y2="40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k2)" />
          <text x="240" y="25" fontSize="9" fill="#ef4444">15 m/s</text>
          {/* Avstand */}
          <text x="155" y="60" fontSize="10" fill="#6b7280">200 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Pass: <InlineLatex latex="v_P=25{,}0,\;a=-0{,}100,\;x_0=0" /></li>
        <li>Gods: <InlineLatex latex="v_G=15{,}0,\;a=0,\;x_0=200\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>(a) Skjer kollisjonen? (b) I så fall hvor? (c) Skisse av posisjons­grafer.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Innhentings-/kollisjons­problem">
          <p>
            To objekt på samme spor kolliderer hvis posisjons­funksjonene har et felles tidspunkt:
          </p>
          <FormulaBox variant="gold" latex="x_1(t)=x_2(t)" />
          <p>Andregradsligning ⇒ diskriminanten avgjør:</p>
          <ul className="list-disc pl-5 space-y-0.5 mt-2">
            <li>Δ &gt; 0: to skjærings­punkter (kollisjon ved første)</li>
            <li>Δ = 0: tangering (akkurat unngår kollisjon)</li>
            <li>Δ &lt; 0: ingen skjæring (kollisjon unngås)</li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Velg passasjer­togets front som x=0. Da er <InlineLatex latex="x_P=25t-0{,}05t^2" /> og <InlineLatex latex="x_G=200+15t" />.</p> },
      { label: "Hint 2", content: <p>Sett <InlineLatex latex="x_P=x_G" /> og løs annengradsligningen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">La t=0 være tidspunktet for bremsing, og x=0 være fronten av passasjer­toget der.</p>
        <Step n={1} title="Posisjons­funksjoner">
          <FormulaBox latex="x_P(t)=v_P t+\tfrac12 a t^2=25{,}0\,t-0{,}0500\,t^2" />
          <FormulaBox latex="x_G(t)=200+v_G t=200+15{,}0\,t" />
        </Step>
        <Step n={2} title="(a) Sett like — løs annengrads">
          <FormulaBox latex="25t-0{,}05t^2=200+15t" />
          <FormulaBox latex="0{,}05t^2-10t+200=0\Rightarrow t^2-200t+4000=0" />
          <FormulaBox latex="t=\dfrac{200\pm\sqrt{40\,000-16\,000}}{2}=\dfrac{200\pm 154{,}9}{2}" />
          <FormulaBox latex="t_1=22{,}55\;\text{s}\quad\text{eller}\quad t_2=177{,}45\;\text{s}" />
          <p>Diskriminant <InlineLatex latex="\Delta=24\,000>0" /> ⇒ <strong>kollisjonen skjer.</strong></p>
        </Step>
        <Step n={3} title="(b) Hvor?">
          <FormulaBox latex="x=200+15{,}0(22{,}55)=200+338{,}3=538{,}3\;\text{m}" />
          <FormulaBox variant="gold" latex="\text{Kollisjon ved}\;x\approx 538\;\text{m},\;t\approx 22{,}6\;\text{s}" />
        </Step>
        <Step n={4} title="(c) Posisjons­grafer">
          <p>
            Passasjer­toget: parabel (åpner nedover pga. negativ a). Godstoget: rett linje med
            stigning 15. Linjen og parabelen krysser ved t≈22,6 s.
          </p>
        </Step>
        <Pitfall>
          <strong>Kollisjonen skjer ved den minste t.</strong> Den andre roten ville tilsvart at
          passasjer­toget «passerer gjennom» godstoget — fysisk uten mening. Sjekk alltid om
          «andre løsning» har fysisk betydning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Sterkere bremsing (større |a|) ville gitt negativ diskriminant og
          unngått kollisjonen. Grenseverdien (Δ=0) gir akkurat hvor sterk bremsing som trengs.
        </p>
      </div>
    ),
    summary: <p>Innhentings­problem: sett posisjons­funksjonene like, løs annengrads.</p>,
  },

  // ==========================================================================
  // 2.68 — CALC v(t) = α − βt²
  // ==========================================================================
  "2.68": {
    title: "Objekt med v(t) = α − βt²",
    difficulty: "vanskelig",
    pageRef: "s. 91",
    problem: (
      <p>
        Hastigheten til et objekt er målt til <InlineLatex latex="v_x(t)=\alpha-\beta t^2" />, hvor
        <InlineLatex latex="\;\alpha=4{,}00\;\text{m/s}" /> og <InlineLatex latex="\beta=2{,}00\;\text{m/s}^3" />.
        Ved <InlineLatex latex="t=0" /> er objektet i <InlineLatex latex="x=0" />. (a) Beregn objektets
        posisjon og akselerasjon som funksjoner av tid. (b) Hva er objektets maksimale positive
        forflytning fra origo?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="v_x(t)=\alpha-\beta t^2" />, <InlineLatex latex="\alpha=4{,}00\;\text{m/s}" />, <InlineLatex latex="\beta=2{,}00\;\text{m/s}^3" /></li>
        <li><InlineLatex latex="x(0)=0" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="x(t)" /> og <InlineLatex latex="a(t)" />. (b) Maksimal positiv x.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Når går objektet «fremst»?">
          <p>
            Posisjonen er maksimal når den øyeblikkelige hastigheten er null — der snur retningen.
            Vi finner først x(t) ved å integrere v(t), deretter setter vi v=0 for å finne snutid.
          </p>
          <FormulaBox variant="gold" latex="x(t)=x_0+\int_0^t v(t')\,dt',\quad a(t)=\dfrac{dv}{dt},\quad x_\text{maks}\;\text{når}\;v=0" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="x(t)=\int_0^t (4-2t'^2)\,dt'=4t-\tfrac{2}{3}t^3" />.</p> },
      { label: "Hint 2", content: <p>Sett <InlineLatex latex="v=0" />: <InlineLatex latex="\;t=\sqrt{\alpha/\beta}=\sqrt{2}\approx 1{,}414\;\text{s}" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vi integrerer for x og deriverer for a, deretter finner vi snutiden.</p>
        <Step n={1} title="(a) Posisjon x(t)">
          <FormulaBox latex="x(t)=\int_0^t v(t')\,dt'=\int_0^t (4-2t'^2)\,dt'=4t-\dfrac{2}{3}t^3" />
          <FormulaBox variant="gold" latex="x(t)=4t-\dfrac{2}{3}t^3\;[\text{m}]" />
        </Step>
        <Step n={2} title="Akselerasjon a(t)">
          <FormulaBox latex="a(t)=\dfrac{dv}{dt}=-2\beta t=-4t\;[\text{m/s}^2]" />
          <FormulaBox variant="gold" latex="a(t)=-4t" />
        </Step>
        <Step n={3} title="(b) Snutid (v=0)">
          <FormulaBox latex="4-2t^2=0\Rightarrow t^2=2\Rightarrow t=\sqrt{2}\approx 1{,}414\;\text{s}" />
        </Step>
        <Step n={4} title="Maksimal x">
          <FormulaBox latex="x_\text{maks}=4(1{,}414)-\tfrac23(1{,}414)^3=5{,}657-1{,}886=3{,}77\;\text{m}" />
          <FormulaBox variant="gold" latex="x_\text{maks}\approx 3{,}77\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Det er v=0 som markerer maksimum, ikke a=0.</strong> a=0 ville sagt at v har et
          ekstrempunkt — men her ønsker vi x sin ekstrempunkt, og det inntreffer der dx/dt = v = 0.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Objektet starter med v=4 m/s i positiv x-retning, bremser jevnt
          (a vokser i negativ retning), når sitt fjernestepunkt 3,77 m, og snur. Etterpå
          akselererer det i negativ retning bort fra origo.
        </p>
      </div>
    ),
    summary: <p>Maks-posisjon der v=0; bruk integrasjon for x(t) og derivasjon for a(t).</p>,
  },

  // ==========================================================================
  // 2.70 — Egg drop fra tak
  // ==========================================================================
  "2.70": {
    title: "Egg dropp på professor (Fig P2.70)",
    difficulty: "vanskelig",
    pageRef: "s. 91",
    problem: (
      <p>
        Du er på taket av fysikk­bygget, 46,0 m over bakken (Fig. P2.70). Din fysikk­professor, som
        er 1,80 m høy, går langs ved­siden av bygget med konstant fart 1,20 m/s. Hvis du vil slippe
        et egg i hodet på professoren, hvor bør professoren være når du slipper egget? Anta at egget
        er i fritt fall.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Slippehøyde over bakken: 46,0 m</li>
        <li>Professorens høyde: 1,80 m (hode treffes når egget har falt 46,0 − 1,80 = 44,20 m)</li>
        <li>Professorens fart: 1,20 m/s konstant</li>
        <li>g = 9,80 m/s², fritt fall (ingen luftmotstand)</li>
      </ul>
    ),
    unknowns: <p>Horisontal avstand professoren må være fra punktet rett under slipp­punktet, idet egget slippes.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Timing-problem — koble fall og bevegelse">
          <p>
            Egget faller vertikalt; professoren går horisontalt. Vi tenker dem som <em>uavhengige</em>
            bevegelser med felles tids­variabel:
          </p>
          <FormulaBox variant="gold" latex="\text{egg:}\;h=\tfrac12 g t^2,\quad\text{professor:}\;d=v\,t" />
          <p>
            Egget faller bare den distansen som skiller hodet fra taket — ikke hele 46 m. Trekk
            fra professorens høyde først.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Effektiv fallhøyde: <InlineLatex latex="\;h=46{,}0-1{,}80=44{,}2\;\text{m}" />. Egget slippes fra ro.</p> },
      { label: "Hint 2", content: <p>Tiden er <InlineLatex latex="\;t=\sqrt{2h/g}" />. Sett deretter <InlineLatex latex="d=vt" /> for å finne avstanden.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Først tiden for fallet, så avstanden professoren har gått under den tiden.</p>
        <Step n={1} title="Effektiv fallhøyde">
          <FormulaBox latex="h=46{,}0-1{,}80=44{,}2\;\text{m}" />
          <p>Egget skal treffe i hodehøyde, ikke bakken.</p>
        </Step>
        <Step n={2} title="Falltid">
          <p>Fra <InlineLatex latex="\;h=\tfrac12 g t^2" /> med <InlineLatex latex="v_0=0" />:</p>
          <FormulaBox latex="t=\sqrt{\dfrac{2h}{g}}=\sqrt{\dfrac{2(44{,}2)}{9{,}80}}=\sqrt{9{,}02}=3{,}004\;\text{s}" />
        </Step>
        <Step n={3} title="Horisontal avstand professor må være">
          <FormulaBox latex="d=v\,t=(1{,}20)(3{,}004)=3{,}60\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 3{,}60\;\text{m før slippe­punktet (i hennes gangretning)}" />
        </Step>
        <Pitfall>
          <strong>Glem ikke professorens høyde.</strong> Hadde vi brukt h=46 m hele veien, ville
          tiden blitt 3,07 s og avstanden 3,68 m. Forskjellen virker liten, men i en eksamen
          gir slike unøyaktigheter trekk.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Egget treffer hodet med <InlineLatex latex="v=gt=29{,}4\;\text{m/s}" /> ≈ 106 km/t —
          definitivt nok til skade. Eksempelet illustrerer hvor robust tids­matchingen er for
          to objekt med ulike akselerasjoner.
        </p>
      </div>
    ),
    summary: <p>Klassisk timing: fritt fall + horisontal konstant fart for «målet». Trekk høyden fra først.</p>,
  },

  // ==========================================================================
  // 2.71 — CALC a = −2,00 + 3,00 t
  // ==========================================================================
  "2.71": {
    title: "Partikkel med a(t) = −2,00 + 3,00 t",
    difficulty: "vanskelig",
    pageRef: "s. 91",
    problem: (
      <p>
        Akselerasjonen til en partikkel er <InlineLatex latex="a_x(t)=-2{,}00\;\text{m/s}^2+(3{,}00\;\text{m/s}^3)t" />.
        (a) Finn initialhastigheten <InlineLatex latex="\;v_{0x}" /> slik at partikkelen har samme
        x-koordinat ved <InlineLatex latex="t=4{,}00\;\text{s}" /> som den hadde ved <InlineLatex latex="t=0" />.
        (b) Hva blir hastigheten ved <InlineLatex latex="t=4{,}00\;\text{s}" />?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="a_x(t)=-2{,}00\;\text{m/s}^2+(3{,}00\;\text{m/s}^3)\,t" /></li>
        <li><InlineLatex latex="x(0)=0" /> (vi velger origo)</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v_0" /> slik at <InlineLatex latex="x(4)=x(0)" />. (b) <InlineLatex latex="v(4)" />.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="«Tilbake til startposisjon» — bruk x(t1) = x(0)">
          <p>
            Hvis partikkelen skal være på samme sted ved t = t₁ som ved t = 0, krever det
            <InlineLatex latex="\;x(t_1)=x(0)" />. Med x(0)=0 gir dette x(t₁)=0. Vi integrerer
            a(t) to ganger og bruker dette som ligning for v₀.
          </p>
          <FormulaBox variant="gold" latex="v(t)=v_0+\int_0^t a\,dt',\quad x(t)=\int_0^t v\,dt'" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="v(t)=v_0-2t+\tfrac{3}{2}t^2" />.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="x(t)=v_0 t-t^2+\tfrac{1}{2}t^3" />. Sett x(4)=0.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Dobbel integrasjon for x(t), så bruke betingelsen for å finne v₀.</p>
        <Step n={1} title="Hastighet v(t)">
          <FormulaBox latex="v(t)=v_0+\int_0^t (-2+3t')\,dt'=v_0-2t+\dfrac{3}{2}t^2" />
        </Step>
        <Step n={2} title="Posisjon x(t)">
          <FormulaBox latex="x(t)=\int_0^t v(t')\,dt'=v_0 t-t^2+\dfrac{1}{2}t^3" />
        </Step>
        <Step n={3} title="(a) Bruk betingelsen x(4)=0">
          <FormulaBox latex="0=v_0(4)-(4)^2+\tfrac12(4)^3=4v_0-16+32=4v_0+16" />
          <FormulaBox latex="v_0=-4{,}00\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_0=-4{,}00\;\text{m/s}" />
          <p>Negativt — partikkelen starter i negativ retning.</p>
        </Step>
        <Step n={4} title="(b) Hastighet ved t=4">
          <FormulaBox latex="v(4)=-4-2(4)+\tfrac32(4)^2=-4-8+24=+12{,}0\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v(4{,}00\;\text{s})=+12{,}0\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Hastigheten ved start og slutt er forskjellig selv om posisjonen er den samme.</strong>
          Partikkelen har snudd retning og kommer tilbake med ny fart. Det er bare integralet av v
          fra 0 til t som må være null — ikke at v(t) skal være lik v(0).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Partikkelen starter med fart 4 m/s i negativ retning, blir bremset
          av positiv akselerasjon, snur, og kommer tilbake til startposisjonen med fart 12 m/s
          i positiv retning. Total fart har endret retning og økt — energi tilført av
          akselerasjonen.
        </p>
      </div>
    ),
    summary: <p>«Tilbake til start» = sett x(t₁)=x(0). Posisjonen kan være lik selv om hastigheten ikke er det.</p>,
  },

  // ==========================================================================
  // 2.81 — CALC a = −Ct
  // ==========================================================================
  "2.81": {
    title: "Objekt stopper med a = −Ct",
    difficulty: "vanskelig",
    pageRef: "s. 92",
    problem: (
      <p>
        Et objekt beveger seg langs x-aksen. Ved <InlineLatex latex="t=0" /> har det hastighet
        <InlineLatex latex="\;v_{0x}=20{,}0\;\text{m/s}" />. Begynnende ved <InlineLatex latex="t=0" />
        har det akselerasjon <InlineLatex latex="\;a_x=-Ct" />, der C har enheter m/s³.
        (a) Hva er verdien av C hvis objektet stopper på 8,00 s etter <InlineLatex latex="t=0" />?
        (b) For verdien av C beregnet i (a), hvor langt kjører objektet før det stopper på 8,00 s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="a_x(t)=-Ct" /> med ukjent <InlineLatex latex="C\;[\text{m/s}^3]" /></li>
        <li><InlineLatex latex="v_{0x}=20{,}0\;\text{m/s}" /></li>
        <li><InlineLatex latex="v(8{,}00\;\text{s})=0" /> (objektet stopper)</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="C" />. (b) Strekning til stopp.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To-trinn med ukjent konstant">
          <p>
            Vi har en parameter C som først må bestemmes fra én betingelse (stopp) og deretter
            settes inn for å finne distanseintegralet. Generell oppskrift:
          </p>
          <FormulaBox variant="gold" latex="v(t)=v_0+\int_0^t a\,dt',\quad x(t)=\int_0^t v\,dt'" />
          <p>Bruk stopp­betingelsen v(t_stopp)=0 for å finne C, så integrer videre.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="v(t)=v_0-\tfrac{C}{2}t^2" />. Sett v(8)=0 og løs for C.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="x(t)=v_0 t-\tfrac{C}{6}t^3" />. Sett t=8 etter at du har funnet C.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Først finner vi C fra stopp­betingelsen, så bruker vi C i posisjons­uttrykket.</p>
        <Step n={1} title="Hastighet v(t)">
          <FormulaBox latex="v(t)=v_0+\int_0^t (-Ct')\,dt'=v_0-\dfrac{C}{2}t^2" />
        </Step>
        <Step n={2} title="(a) Bruk v(8) = 0 for å finne C">
          <FormulaBox latex="0=20-\dfrac{C}{2}(8)^2=20-32C" />
          <FormulaBox latex="C=\dfrac{20}{32}=0{,}625\;\text{m/s}^3" />
          <FormulaBox variant="gold" latex="C=0{,}625\;\text{m/s}^3" />
        </Step>
        <Step n={3} title="Posisjon x(t)">
          <FormulaBox latex="x(t)=\int_0^t v(t')\,dt'=v_0 t-\dfrac{C}{6}t^3=20t-\dfrac{0{,}625}{6}t^3" />
        </Step>
        <Step n={4} title="(b) Strekning til stopp (t=8)">
          <FormulaBox latex="x(8)=20(8)-\dfrac{0{,}625}{6}(8)^3=160-\dfrac{320}{6}=160-53{,}3=106{,}7\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 107\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Stoppestrekningen er ikke enkelt v₀·t/2.</strong> Det ville gjelde for konstant
          gjennomsnitts­akselerasjon. Her er a tids­avhengig — lite bremsing tidlig, mye sent.
          Objektet kjører lengre enn det «gjennomsnitt»-modellen gir.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: a(0) = 0, så objektet bremses lite i begynnelsen. Etter hvert som t øker,
          bremser akselerasjonen sterkere (a vokser i negativ retning), og objektet stopper raskt
          mot slutten. Dette likner luftmotstand som vokser med fart.
        </p>
      </div>
    ),
    summary: <p>To-trinn: stopp­betingelse ⇒ C; integrer v ⇒ posisjon.</p>,
  },

  // ==========================================================================
  // 2.83 — CALC Cars A and B
  // ==========================================================================
  "2.83": {
    title: "Bil A og B parameterisert",
    difficulty: "vanskelig",
    pageRef: "s. 92",
    problem: (
      <p>
        Biler A og B kjører i en rett linje. Avstanden A fra start­punkt er gitt av
        <InlineLatex latex="\;x_A(t)=\alpha t+\beta t^2" />, med <InlineLatex latex="\alpha=2{,}60\;\text{m/s}" />
        og <InlineLatex latex="\beta=1{,}20\;\text{m/s}^2" />. Avstand B fra start­punkt er
        <InlineLatex latex="\;x_B(t)=\gamma t^2-\delta t^3" />, med <InlineLatex latex="\gamma=2{,}80\;\text{m/s}^2" />
        og <InlineLatex latex="\delta=0{,}20\;\text{m/s}^3" />. (a) Hvilken bil er foran rett etter
        de starter? (b) På hvilke tids­punkt(er) er de på samme sted? (c) Når er avstanden A til B
        verken økende eller minkende? (d) Når har A og B samme akselerasjon?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="x_A(t)=\alpha t+\beta t^2" />, <InlineLatex latex="\alpha=2{,}60\;\text{m/s}" />, <InlineLatex latex="\beta=1{,}20\;\text{m/s}^2" /></li>
        <li><InlineLatex latex="x_B(t)=\gamma t^2-\delta t^3" />, <InlineLatex latex="\gamma=2{,}80\;\text{m/s}^2" />, <InlineLatex latex="\delta=0{,}20\;\text{m/s}^3" /></li>
      </ul>
    ),
    unknowns: <p>(a) Hvem er foran kort etter start? (b) <InlineLatex latex="x_A=x_B" />? (c) Avstand konstant? (d) Samme a?</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Sammenligning av to bevegelses­funksjoner">
          <p>
            Sammenligninger som «hvem foran», «samme sted», «samme fart», «samme akselerasjon»
            blir til ligninger på funksjonene og deres derivater:
          </p>
          <ul className="list-disc pl-5 space-y-0.5 mt-2">
            <li>Samme sted: <InlineLatex latex="x_A=x_B" /></li>
            <li>Samme fart (ekvivalent: avstand stasjonær): <InlineLatex latex="v_A=v_B" /></li>
            <li>Samme akselerasjon: <InlineLatex latex="a_A=a_B" /></li>
            <li>«Foran rett etter start»: bruk leddenes orden i t (lineært slår kvadratisk for små t)</li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Faktoriser ut t i ligningen <InlineLatex latex="\;x_A=x_B" /> for å trekke ut den trivielle løsningen t=0.</p> },
      { label: "Hint 2", content: <p>«Avstand konstant» betyr <InlineLatex latex="\;d(x_A-x_B)/dt=0" />, dvs. <InlineLatex latex="v_A=v_B" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vi sammenligner posisjonene, hastighetene og akselerasjonene systematisk.</p>
        <Step n={1} title="(a) Hvem er foran rett etter start?">
          <p>For små t dominerer det laveste leddet: <InlineLatex latex="x_A\approx \alpha t=2{,}60 t" /> (lineært), mens <InlineLatex latex="x_B\approx\gamma t^2=2{,}80 t^2" /> (kvadratisk).</p>
          <p>Lineært vinner over kvadratisk for små t (siden <InlineLatex latex="t\ll 1\Rightarrow t>t^2" />).</p>
          <FormulaBox variant="gold" latex="A\;\text{er foran rett etter start}" />
        </Step>
        <Step n={2} title="(b) Samme sted: x_A = x_B">
          <FormulaBox latex="\alpha t+\beta t^2=\gamma t^2-\delta t^3" />
          <FormulaBox latex="t\bigl[\alpha+(\beta-\gamma)t+\delta t^2\bigr]=0" />
          <p>Den trivielle løsningen er t=0 (de starter samme sted). Den ikke-trivielle:</p>
          <FormulaBox latex="\delta t^2+(\beta-\gamma)t+\alpha=0" />
          <FormulaBox latex="0{,}20\,t^2-1{,}60\,t+2{,}60=0\;\Leftrightarrow\;t^2-8t+13=0" />
          <FormulaBox latex="t=\dfrac{8\pm\sqrt{64-52}}{2}=\dfrac{8\pm\sqrt{12}}{2}=4\pm\sqrt{3}" />
          <FormulaBox variant="gold" latex="t\approx 2{,}27\;\text{s}\;\text{eller}\;5{,}73\;\text{s}" />
        </Step>
        <Step n={3} title="(c) Avstand konstant ⇒ samme hastighet">
          <FormulaBox latex="v_A=\alpha+2\beta t=2{,}60+2{,}40\,t" />
          <FormulaBox latex="v_B=2\gamma t-3\delta t^2=5{,}60\,t-0{,}60\,t^2" />
          <FormulaBox latex="2{,}60+2{,}40\,t=5{,}60\,t-0{,}60\,t^2" />
          <FormulaBox latex="0{,}60\,t^2-3{,}20\,t+2{,}60=0\;\Leftrightarrow\;t^2-5{,}33\,t+4{,}33=0" />
          <FormulaBox latex="t=\dfrac{5{,}33\pm\sqrt{28{,}4-17{,}3}}{2}=\dfrac{5{,}33\pm 3{,}33}{2}" />
          <FormulaBox variant="gold" latex="t=1{,}00\;\text{s}\;\text{eller}\;4{,}33\;\text{s}" />
        </Step>
        <Step n={4} title="(d) Samme akselerasjon">
          <FormulaBox latex="a_A=2\beta=2{,}40\;\text{m/s}^2\;\text{(konstant)}" />
          <FormulaBox latex="a_B=2\gamma-6\delta\,t=5{,}60-1{,}20\,t" />
          <FormulaBox latex="2{,}40=5{,}60-1{,}20\,t\Rightarrow t=2{,}67\;\text{s}" />
          <FormulaBox variant="gold" latex="t\approx 2{,}67\;\text{s}" />
        </Step>
        <Pitfall>
          <strong>(c) gir to løsninger</strong> — det betyr at avstanden A−B går gjennom et lokalt
          maks <em>og</em> et lokalt min. Mellom 1,00 s og 4,33 s endrer avstanden seg fra én
          ekstremalverdi til den andre.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: A er en bil med konstant a (vanlig akselerasjon). B har en akselerasjon
          som først er stor og så avtar (som om bilen runner ut av drivkraft). Det er derfor B
          tar A igjen midlertidig, men taper igjen til slutt.
        </p>
      </div>
    ),
    summary: <p>Sammenligning av kurver: x, v, a gir ulike spørsmål, men samme metode (sett like).</p>,
  },

  // ==========================================================================
  // 2.88 — Catching the Bus (Challenge)
  // ==========================================================================
  "2.88": {
    title: "Catching the Bus — student innhenter buss",
    difficulty: "vanskelig",
    pageRef: "s. 93",
    problem: (
      <p>
        En student løper i sin maks fart 5,0 m/s for å nå en buss som står stille på buss­stoppet.
        Når studenten fortsatt er 40,0 m fra bussen, begynner den å trekke vekk med konstant
        akselerasjon 0,170 m/s². (a) Hvor lenge og hvor langt må studenten løpe i 5,0 m/s før hun
        innhenter bussen? (b) Når hun når bussen, hvor fort kjører bussen? (c) Skisser x-t-graf for
        både studenten og bussen. (d) Equations brukt i (a) gir andre løsning, til en senere tid.
        Forklar betydningen. (e) Hvis studentens topp­fart er 3,5 m/s, vil hun nå bussen?
        (f) Hva er minste fart studenten må ha for å akkurat innhente bussen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Student: konstant <InlineLatex latex="v=5{,}0\;\text{m/s}" />, x₀ = 0</li>
        <li>Buss: starter i ro 40,0 m foran, akselererer med <InlineLatex latex="a=0{,}170\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>(a) Tid og strekning til innhenting. (b) Bussens fart der. (c) Skisse. (d) Tolkning av andre rot. (e) Med v=3,5 m/s? (f) Minste v?</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="«Innhenter eller ikke?» — diskriminant­regelen">
          <p>
            Sett posisjonene like: <InlineLatex latex="x_S=x_B\Rightarrow vt=40+\tfrac12 a t^2" />.
            Andregradsligning <InlineLatex latex="\;\tfrac12 at^2-vt+40=0" />.
          </p>
          <FormulaBox variant="gold" latex="\Delta=v^2-4(\tfrac12 a)(40)=v^2-2\cdot 0{,}170\cdot 40" />
          <ul className="list-disc pl-5 space-y-0.5 mt-2">
            <li>Δ &gt; 0: to skjæringer (innhentes ved første)</li>
            <li>Δ = 0: tangering (akkurat-så-vidt-innhenting)</li>
            <li>Δ &lt; 0: ingen møte (bussen drar fra)</li>
          </ul>
          <p>Minimum-farten finnes ved Δ=0: <InlineLatex latex="\;v_\text{min}=\sqrt{2a\cdot 40}" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Posisjons­ligningene: <InlineLatex latex="\;x_S=5{,}0\,t" />, <InlineLatex latex="\;x_B=40+\tfrac12(0{,}170)t^2=40+0{,}085\,t^2" />.</p> },
      { label: "Hint 2", content: <p>For (e) og (f): se på diskriminanten — den avgjør om innhentingen er mulig.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">
          La t=0 være tiden bussen begynner å trekke vekk; la x=0 være studenten der.
        </p>
        <Step n={1} title="(a) Tid og strekning til innhenting">
          <FormulaBox latex="5{,}0\,t=40+0{,}085\,t^2\Rightarrow 0{,}085\,t^2-5{,}0\,t+40=0" />
          <FormulaBox latex="t^2-58{,}82\,t+470{,}6=0" />
          <FormulaBox latex="t=\dfrac{58{,}82\pm\sqrt{3460-1882}}{2}=\dfrac{58{,}82\pm 39{,}73}{2}" />
          <FormulaBox latex="t_1=9{,}55\;\text{s}\quad\text{eller}\quad t_2=49{,}3\;\text{s}" />
          <p>Studenten når bussen ved den minste t.</p>
          <FormulaBox latex="d=v\,t_1=5{,}0(9{,}55)=47{,}7\;\text{m}" />
          <FormulaBox variant="gold" latex="t\approx 9{,}55\;\text{s},\;d\approx 47{,}7\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Bussens fart ved innhenting">
          <FormulaBox latex="v_\text{buss}=at_1=(0{,}170)(9{,}55)=1{,}62\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_\text{buss}\approx 1{,}62\;\text{m/s}" />
          <p>Bussen er fortsatt langt langsommere enn studenten — derfor innhenter hun.</p>
        </Step>
        <Step n={3} title="(c) Skisse av x-t">
          <p>
            Studenten: rett linje x=5,0 t. Bussen: forskjøvet parabel x=40+0,085 t². Linjen og
            parabelen krysser to ganger; ved t≈9,55 s og t≈49,3 s.
          </p>
        </Step>
        <Step n={4} title="(d) Hva betyr den andre roten?">
          <p>
            Hadde studenten fortsatt forbi bussen i 5,0 m/s mens bussen fortsatte å akselerere,
            ville bussen til slutt overtatt henne igjen — det er ved t≈49,3 s. Andre roten har
            altså fysisk mening: bussen passerer studenten på vei opp i fart.
          </p>
        </Step>
        <Step n={5} title="(e) Hvis topp­fart er 3,5 m/s?">
          <FormulaBox latex="0{,}085\,t^2-3{,}5\,t+40=0\Rightarrow t^2-41{,}2\,t+470{,}6=0" />
          <p>Diskriminanten:</p>
          <FormulaBox latex="\Delta=(41{,}2)^2-4(470{,}6)=1697-1882=-185<0" />
          <FormulaBox variant="gold" latex="\text{Hun når aldri bussen.}" />
        </Step>
        <Step n={6} title="(f) Minste fart for å akkurat-så-vidt-innhente (Δ = 0)">
          <p>Tangering ⇒ diskriminant null:</p>
          <FormulaBox latex="v^2-4\cdot 0{,}085\cdot 40=0\Rightarrow v^2=13{,}6" />
          <FormulaBox latex="v_\text{min}=\sqrt{13{,}6}\approx 3{,}69\;\text{m/s}" />
          <p>Tid og strekning ved tangering:</p>
          <FormulaBox latex="t=\dfrac{v}{2(0{,}085)}=\dfrac{3{,}69}{0{,}170}=21{,}7\;\text{s}" />
          <FormulaBox latex="d=v\,t=3{,}69(21{,}7)=80{,}1\;\text{m}" />
          <FormulaBox variant="gold" latex="v_\text{min}\approx 3{,}69\;\text{m/s},\;t\approx 21{,}7\;\text{s},\;d\approx 80\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>«Akkurat-så-vidt» = diskriminant null.</strong> Geometrisk er det at studentens
          rette linje akkurat tangerer bussens parabel — ett kontakt­punkt, ingen skjæring. Bruk
          dette mønsteret hver gang en oppgave spør om «minste fart», «største avstand» osv.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Bussens fart må kun bli litt høyere enn studentens (1,62 m/s) for at
          gapet skal lukkes. Avstanden 47,7 m hun løper er nesten 8 m mer enn 40 m fordi bussen
          har drevet frem under tiden — illustrerer hvorfor det er vanskelig å «ta igjen» en
          akselererende buss selv om den i utgangspunktet er saktere.
        </p>
      </div>
    ),
    summary: <p>«Akkurat-så-vidt-innhenting» = diskriminant null. Geometrisk tangering av rett linje og parabel.</p>,
  },
};
