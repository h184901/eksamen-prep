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

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 5 (matcher University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  "5.1": {
    title: "To 23 N-vekter over trinse",
    difficulty: "lett",
    pageRef: "s. 187",
    problem: (
      <p>
        To 23,0 N-vekter er hengt opp på motsatte ender av et tau som passerer over en lett, friksjons­fri
        trinse. Trinsa er festet til en kjede fra taket. (a) Hva er spenningen i tauet? (b) Hva er spenningen
        i kjeden?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt 1: <InlineLatex latex="w_1=23{,}0\;\text{N}" /></li>
        <li>Vekt 2: <InlineLatex latex="w_2=23{,}0\;\text{N}" /></li>
        <li>Trinse: lett (massless) og friksjons­fri</li>
        <li>Systemet i statisk likevekt</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Spenning <InlineLatex latex="T_\text{tau}" /> i tauet</li>
        <li>(b) Spenning <InlineLatex latex="T_\text{kjede}" /> i kjeden</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Idealisert trinse">
          <p className="mb-1">
            En <strong>lett, friksjons­fri trinse</strong> har to viktige egenskaper:
          </p>
          <ul className="list-disc pl-5 mb-2">
            <li>Tauet glir uten energitap → <strong>samme spenning i hele tauet</strong></li>
            <li>Trinsa endrer bare <em>retningen</em> på spenningen, ikke størrelsen</li>
          </ul>
          <p className="mb-1">For en hengende vekt i likevekt:</p>
          <FormulaBox variant="gold" latex="T = w" />
          <p className="text-xs mt-1">Spenningen er nøyaktig lik vekten den holder.</p>
        </TheoryBox>
        <TheoryBox title="Krefter på trinsa">
          <p>
            Trinsa er i likevekt — kjeden trekker den oppover, mens to tau-segmenter trekker den nedover. Hvert tau-segment har spenning T, så:
          </p>
          <FormulaBox variant="gold" latex="T_\text{kjede} = 2T_\text{tau}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Hvert tau-segment har samme spenning. Hva må T være for at vekten skal henge i ro?</p> },
      { label: "Hint 2", content: <p>Trinsa har to tau-segmenter som trekker den ned. Kjeden trekker den opp. Likevekt: kjede = 2 × tau.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">
          To vekter på samme tau over en ideell trinse er det enkleste mulige likevekts­problemet —
          men det illustrerer to viktige prinsipper.
        </p>
        <Step n={1} title="(a) Spenning i tauet">
          <p>Hver vekt henger fra tauet i likevekt. Newtons 1. lov for én vekt:</p>
          <FormulaBox latex="\Sigma F_y = T - w = 0\Rightarrow T = w" />
          <FormulaBox variant="gold" latex="T_\text{tau}=23{,}0\;\text{N}" />
          <p>Begge endene gir samme svar — ellers ville tauet ikke vært i ro.</p>
        </Step>
        <Step n={2} title="(b) Spenning i kjeden">
          <p>Trinsa er i likevekt. Krefter på trinsa:</p>
          <ul className="list-disc pl-5">
            <li>Kjeden trekker oppover med <InlineLatex latex="T_\text{kjede}" /></li>
            <li>To tau-segmenter trekker nedover med 23 N hver</li>
            <li>(Trinsa selv er lett, så vekten er neglisjerbar)</li>
          </ul>
          <FormulaBox latex="T_\text{kjede} - 2T_\text{tau} = 0" />
          <FormulaBox variant="gold" latex="T_\text{kjede}=2(23{,}0)=46{,}0\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Spenningen er IKKE 23 N på hver side og &laquo;summerer seg til 46&raquo; i tauet.</strong>{" "}
          Tauet har én og samme spenning over hele lengden — 23 N. Det er <em>kjeden</em> som må holde
          begge tau-segmentene, og derfor får dobbel belastning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: trinsa fordobler ikke kraft, den bare omdirigerer den. Belastningen
          &laquo;samles opp&raquo; ved trinsens festepunkt — kjeden — som må holde alt.
        </p>
      </div>
    ),
    summary: <p>Tau over trinse: samme spenning i hele tauet. Trinsens støtte: 2T.</p>,
  },

  "5.6": {
    title: "Wrecking-ball med to kabler (Fig E5.6)",
    difficulty: "middels",
    pageRef: "s. 187",
    problem: (
      <p>
        En stor rivnings­ball holdes i ro av to lette stål­kabler (Fig. E5.6). Massen til ballen er
        3620 kg. Hva er (a) spenningen <InlineLatex latex="T_B" /> i kabelen som danner en vinkel 40°
        med vertikalen, og (b) spenningen <InlineLatex latex="T_A" /> i den horisontale kabelen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=3620\;\text{kg}" /></li>
        <li>Kabel B: 40° fra vertikalen</li>
        <li>Kabel A: horisontal</li>
        <li>Statisk likevekt</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="T_B" /> (kabelen 40° fra vertikalen)</li>
        <li><InlineLatex latex="T_A" /> (den horisontale kabelen)</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Likevekt for et knutepunkt">
          <p>Tre krefter virker på ballen: vekt mg ned, kabel B på skrå opp, kabel A horisontalt.</p>
          <p className="mb-1">Newtons 1. lov i to retninger:</p>
          <FormulaBox variant="gold" latex="\Sigma F_x=0,\quad \Sigma F_y=0" />
          <p className="text-xs mt-1">
            B er den eneste kabelen med vertikal komponent → den må alene holde tyngden.
          </p>
        </TheoryBox>
        <TheoryBox title="Vinkel-konvensjon">
          <p>
            Når vinkelen 40° er målt <strong>fra vertikalen</strong>, er den vertikale komponenten{" "}
            <InlineLatex latex="T_B\cos 40°" /> og den horisontale komponenten{" "}
            <InlineLatex latex="T_B\sin 40°" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Den horisontale kabelen kan ikke holde noen vertikal kraft. Hva er da vertikal-komponenten av T_B?</p> },
      { label: "Hint 2", content: <p>Når vertikal-komponenten er funnet, gir x-likningen direkte T_A.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Bryter krefter i komponenter og bruker likevekt i begge retninger.</p>
        <Step n={1} title="Vertikal balanse → finn T_B">
          <FormulaBox latex="\Sigma F_y=T_B\cos 40°-mg=0" />
          <FormulaBox latex="T_B=\dfrac{mg}{\cos 40°}=\dfrac{(3620)(9{,}80)}{0{,}766}" />
          <FormulaBox variant="gold" latex="T_B\approx 4{,}63\times 10^{4}\;\text{N}" />
        </Step>
        <Step n={2} title="Horisontal balanse → finn T_A">
          <p>Kabel A trekker mot venstre, kabel B trekker mot høyre med <InlineLatex latex="T_B\sin 40°" />:</p>
          <FormulaBox latex="\Sigma F_x=T_B\sin 40°-T_A=0" />
          <FormulaBox latex="T_A=T_B\sin 40°=(46\,300)(0{,}643)" />
          <FormulaBox variant="gold" latex="T_A\approx 2{,}98\times 10^{4}\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Pass på hva vinkelen er målt fra.</strong> Hvis 40° hadde vært fra horisontalen,
          måtte du brukt <InlineLatex latex="T_B\sin 40°" /> for vertikal-komponenten. Sjekk alltid
          figuren før du velger sin/cos.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: T_B er større enn ballens vekt (35,5 kN) fordi kabelen er på skrå —
          bare en del av spenningen virker oppover. Den horisontale kabelen «strammes» fordi B
          drar mot siden.
        </p>
      </div>
    ),
    summary: <p>Statisk likevekt med to kabler: ΣF_x=0 og ΣF_y=0 gir to ligninger for to ukjente.</p>,
  },

  "5.8": {
    title: "Likevekt — vekt fra Fig E5.8",
    difficulty: "middels",
    pageRef: "s. 188",
    problem: (
      <p>
        I Fig. E5.8 er vekten <InlineLatex latex="w=60{,}0\;\text{N}" />. (a) Hva er spenningen i den
        diagonale strengen? (b) Finn størrelsene av de horisontale kreftene <InlineLatex latex="\vec F_1" />
        og <InlineLatex latex="\vec F_2" /> som må anvendes for å holde systemet i posisjonen som vist.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt: <InlineLatex latex="w=60{,}0\;\text{N}" /></li>
        <li>Diagonal streng på 45°</li>
        <li>To horisontale krefter <InlineLatex latex="F_1, F_2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Spenningen <InlineLatex latex="T" /> i diagonalen</li>
        <li><InlineLatex latex="F_1" /> og <InlineLatex latex="F_2" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To knutepunkter">
          <p className="mb-1">Vi analyserer to separate punkter:</p>
          <ul className="list-disc pl-5">
            <li><strong>Nedre knute</strong>: vertikal streng holder vekten direkte → <InlineLatex latex="T_v=w" /></li>
            <li><strong>Øvre knute</strong>: vertikal streng (60 N ned), diagonal (45°), horisontal F</li>
          </ul>
        </TheoryBox>
        <TheoryBox title="45°-diagonal — symmetri">
          <p>For et knutepunkt med 45°: sin 45° = cos 45° → vertikal og horisontal komponent er like store, gitt ved T/√2.</p>
          <FormulaBox variant="gold" latex="T_x=T_y=T/\sqrt{2}\approx 0{,}707\,T" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Den vertikale strengen holder w direkte (60 N). Hva er da T_y for diagonalen?</p> },
      { label: "Hint 2", content: <p>Ved 45° er sin = cos = 1/√2, så T_y = T·cos 45° = w gir T = w·√2.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vi starter med vertikal balanse på øvre knute, deretter horisontal.</p>
        <Step n={1} title="Vertikal balanse → spenning T">
          <p>Den nedre vertikale strengen drar 60 N ned i øvre knute. Diagonalen har vertikal-komponent T cos 45°:</p>
          <FormulaBox latex="T\cos 45°-w=0\Rightarrow T=\dfrac{60{,}0}{0{,}707}" />
          <FormulaBox variant="gold" latex="T\approx 84{,}9\;\text{N}" />
        </Step>
        <Step n={2} title="Horisontal balanse → F_1 og F_2">
          <p>F_1 holder øvre knute mot venstre. Diagonalen drar med <InlineLatex latex="T\sin 45°" />:</p>
          <FormulaBox latex="F_1=T\sin 45°=84{,}9(0{,}707)=60{,}0\;\text{N}" />
          <p>F_2 holder nedre knute (samme størrelse, motsatt rettet ift. den horisontale strengen):</p>
          <FormulaBox variant="gold" latex="F_1=F_2=60{,}0\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Diagonalspenningen er IKKE 60 N.</strong> Diagonalen må være større enn vekten for
          at vertikal-komponenten alene skal være 60 N. Ved 45° er <InlineLatex latex="T=w\sqrt{2}" />.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: jo mer horisontal en streng er (mindre vinkel med vannrett), desto større
          spenning kreves for å holde samme vertikale belastning.
        </p>
      </div>
    ),
    summary: <p>45°-diagonal: T = w√2, og horisontal- og vertikal-komponentene er like store.</p>,
  },

  "5.9": {
    title: "Skyver piano ned skråning",
    difficulty: "middels",
    pageRef: "s. 188",
    problem: (
      <p>
        En mann skyver på et piano med masse 180 kg; det glir med konstant fart nedover en rampe som
        heller 18,4°. Se bort fra friksjon. Beregn kraften han anvender hvis han skyver (a) parallelt
        med skråningen, og (b) parallelt med gulvet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=180\;\text{kg}" /></li>
        <li>Vinkel: <InlineLatex latex="\theta=18{,}4°" /></li>
        <li>Friksjons­fri rampe</li>
        <li>Konstant fart → akselerasjon = 0</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) F parallelt med skråningen</li>
        <li>(b) F parallelt med gulvet</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Konstant fart = likevekt">
          <p>
            Mannen «bremser» pianoet — uten ham ville det akselerert nedover. Konstant fart betyr at netto-kraft langs rampen er null.
          </p>
          <FormulaBox variant="gold" latex="\Sigma F_\parallel = 0,\quad \Sigma F_\perp = 0" />
        </TheoryBox>
        <TheoryBox title="Velg aksesystem klokt">
          <p>
            Med <strong>x langs rampen</strong>: tyngden får komponenter <InlineLatex latex="-mg\sin\theta" /> (langs)
            og <InlineLatex latex="-mg\cos\theta" /> (vinkelrett). Dette er enklest når kraften virker langs rampen.
          </p>
          <p className="mt-1">
            Når kraften virker <em>horisontalt</em>, må også F brytes i komponenter:{" "}
            <InlineLatex latex="F\cos\theta" /> langs rampen, <InlineLatex latex="-F\sin\theta" /> mot normal.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) er enkel — F må kansellere mg sin θ langs rampen.</p> },
      { label: "Hint 2", content: <p>(b) horisontal F gir bare komponent F cos θ langs rampen, og F sin θ presser inn mot rampen. Bare den langs-komponenten bidrar.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Newtons 1. lov langs rampen i begge tilfeller.</p>
        <Step n={1} title="(a) Kraft parallelt med rampen">
          <p>Pianoet vil skli ned. Mannen skyver opp langs rampen. Tyngdens langs-komponent: mg sin θ ned.</p>
          <FormulaBox latex="\Sigma F_\parallel=F-mg\sin\theta=0" />
          <FormulaBox latex="F=mg\sin 18{,}4°=180(9{,}80)(0{,}3156)" />
          <FormulaBox variant="gold" latex="F_a\approx 557\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Kraft parallelt med gulvet">
          <p>Mannen skyver horisontalt mot rampen. Bryter F langs aksene:</p>
          <ul className="list-disc pl-5">
            <li>Langs rampen: <InlineLatex latex="F\cos\theta" /> opp</li>
            <li>Vinkelrett: <InlineLatex latex="F\sin\theta" /> presser inn (øker N)</li>
          </ul>
          <FormulaBox latex="F\cos\theta-mg\sin\theta=0\Rightarrow F=mg\tan\theta" />
          <FormulaBox latex="F=180(9{,}80)\tan 18{,}4°=180(9{,}80)(0{,}3327)" />
          <FormulaBox variant="gold" latex="F_b\approx 587\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Ikke bare bytt sin med tan uten å forstå hvorfor.</strong> Tangent dukker opp fordi
          kun en del (cos θ) av den horisontale kraften virker langs rampen — så vi må «kompensere»
          ved å øke totalen, derav 1/cos.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: parallell-skyv er mest effektivt fordi 100% av kraften virker mot
          tyngdens komponent. Horisontal skyving «kaster bort» en del av kraften vinkelrett på rampen.
        </p>
      </div>
    ),
    summary: <p>Mindre kraft ved å skyve langs rampen enn langs gulvet (sin vs tan).</p>,
  },

  "5.15": {
    title: "Atwoods maskin (Fig E5.15)",
    difficulty: "middels",
    pageRef: "s. 188",
    problem: (
      <p>
        15,0 kg laste­bunke med murstein henger fra én ende av et tau over en liten, friksjons­fri trinse.
        En 29,0 kg motvekt er hengt fra den andre enden. Systemet slippes fra ro. (a) Tegn FBD for hver.
        (b) Hva er størrelsen til den oppadrettede akselerasjonen til murstein­bunken? (c) Hva er
        spenningen i tauet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Mursteinbunken: <InlineLatex latex="m_1=15{,}0\;\text{kg}" /></li>
        <li>Motvekt: <InlineLatex latex="m_2=29{,}0\;\text{kg}" /></li>
        <li>Lett, friksjons­fri trinse</li>
        <li>Slippes fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(b) Akselerasjonen <InlineLatex latex="a" /> til murstein­bunken (oppover)</li>
        <li>(c) Spenningen <InlineLatex latex="T" /> i tauet</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Atwood-maskin: koblet system">
          <p>
            To masser på samme tau over en idealisert trinse. Begge masser har samme akselerasjons­størrelse, men motsatt retning.
          </p>
          <p className="mb-1">Newton 2 for hver:</p>
          <ul className="list-disc pl-5">
            <li>Tyngste (m_2): <InlineLatex latex="m_2 g - T = m_2 a" /> (ned)</li>
            <li>Letteste (m_1): <InlineLatex latex="T - m_1 g = m_1 a" /> (opp)</li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Atwood-formlene">
          <p>Adderer ligningene → eliminerer T:</p>
          <FormulaBox variant="gold" latex="a=\dfrac{(m_2-m_1)g}{m_1+m_2},\quad T=\dfrac{2m_1 m_2 g}{m_1+m_2}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sett opp én ligning per masse. Begge har samme |a|, men motsatt rettet.</p> },
      { label: "Hint 2", content: <p>Adderer for å eliminere T → akselerasjon. Sett a tilbake i én ligning for T.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Klassisk Atwood: tyngste masse trekker letteste opp.</p>
        <Step n={1} title="Newton 2 for hver masse">
          <FormulaBox latex="m_2 g - T = m_2 a\quad (1)" />
          <FormulaBox latex="T - m_1 g = m_1 a\quad (2)" />
        </Step>
        <Step n={2} title="Adder (1)+(2) → akselerasjon">
          <FormulaBox latex="(m_2-m_1)g=(m_1+m_2)a" />
          <FormulaBox latex="a=\dfrac{(29{,}0-15{,}0)(9{,}80)}{15{,}0+29{,}0}=\dfrac{14{,}0\cdot 9{,}80}{44{,}0}" />
          <FormulaBox variant="gold" latex="a\approx 3{,}12\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="Spenningen T">
          <p>Sett a tilbake i (2):</p>
          <FormulaBox latex="T=m_1(g+a)=15{,}0(9{,}80+3{,}12)" />
          <FormulaBox variant="gold" latex="T\approx 193\;\text{N}" />
          <p className="text-xs">Sjekk: <InlineLatex latex="m_1 g=147" />, <InlineLatex latex="m_2 g=284" /> N. T=193 ligger mellom — bra.</p>
        </Step>
        <Pitfall>
          <strong>Spenningen er IKKE gjennomsnittet av vektene.</strong> T må være større enn m_1g (ellers ville m_1 ikke akselerert opp) og mindre enn m_2g (ellers ville m_2 ikke akselerert ned).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: hvis m_1 = m_2, blir a = 0 og T = mg (likevekt). Stor masseforskjell gir
          stor a, men T nærmer seg m_1g (den lette siden faller fritt under den tunge).
        </p>
      </div>
    ),
    summary: <p>Atwood: a fra (m_2−m_1)g/(m_1+m_2), T fra 2m_1m_2g/(m_1+m_2).</p>,
  },

  "5.16": {
    title: "Isblokk på friksjons­fri rampe",
    difficulty: "middels",
    pageRef: "s. 189",
    problem: (
      <p>
        En 8,00 kg isblokk slippes fra ro på toppen av en 1,31 m lang friksjons­fri rampe og glir
        nedover, og når en fart 2,59 m/s i bunnen. (a) Hva er vinkelen mellom rampen og horisontalen?
        (b) Hva ville farten av isen vært i bunnen hvis bevegelsen ble motvirket av en konstant
        friksjons­kraft 10,0 N parallelt med overflaten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=8{,}00\;\text{kg}" /></li>
        <li>Lengde: <InlineLatex latex="L=1{,}31\;\text{m}" /></li>
        <li>Slutt-fart: <InlineLatex latex="v=2{,}59\;\text{m/s}" /></li>
        <li>Slipper fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Vinkelen θ</li>
        <li>(b) Slutt-fart med <InlineLatex latex="f=10{,}0\;\text{N}" /> friksjon</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Friksjons­fri rampe">
          <p>Konstant akselerasjon langs rampen: <InlineLatex latex="a=g\sin\theta" />.</p>
          <p className="mb-1">Kinematikk fra ro:</p>
          <FormulaBox variant="gold" latex="v^2=2aL=2gL\sin\theta" />
          <p className="text-xs mt-1">Løs for sin θ.</p>
        </TheoryBox>
        <TheoryBox title="Med friksjon">
          <p>Tyngdens komponent ned drar, friksjon bremser:</p>
          <FormulaBox variant="gold" latex="ma=mg\sin\theta-f" />
          <p className="text-xs">Akselerasjonen blir mindre, så slutt-farten blir lavere.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Bruk v² = 2aL med a = g sin θ for å løse for vinkelen.</p> },
      { label: "Hint 2", content: <p>(b) Beregn først a = (mg sin θ − f)/m, deretter v = √(2aL).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Først finn vinkelen fra friksjons­fritt tilfelle, deretter friksjon.</p>
        <Step n={1} title="(a) Finn vinkelen">
          <FormulaBox latex="v^2=2gL\sin\theta" />
          <FormulaBox latex="\sin\theta=\dfrac{v^2}{2gL}=\dfrac{(2{,}59)^2}{2(9{,}80)(1{,}31)}=\dfrac{6{,}71}{25{,}68}=0{,}2613" />
          <FormulaBox variant="gold" latex="\theta\approx 15{,}1°" />
        </Step>
        <Step n={2} title="(b) Akselerasjon med friksjon">
          <FormulaBox latex="mg\sin\theta=8{,}00(9{,}80)(0{,}2613)=20{,}5\;\text{N}" />
          <FormulaBox latex="ma=20{,}5-10{,}0=10{,}5\;\text{N}\Rightarrow a=1{,}31\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(b) Slutt-fart med friksjon">
          <FormulaBox latex="v=\sqrt{2aL}=\sqrt{2(1{,}31)(1{,}31)}" />
          <FormulaBox variant="gold" latex="v\approx 1{,}85\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Friksjons­kraften er gitt direkte (10 N), ikke μ_k·N.</strong> Du trenger ikke
          beregne normalkraft her. Pass på å skille mellom oppgaver der f er gitt og der μ er gitt.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: friksjonen tar bort over halvparten av den drivende kraften (10 av 20,5 N),
          så akselerasjonen halveres. Slutt-farten faller fra 2,59 til 1,85 m/s — i samsvar med at v ∝ √a.
        </p>
      </div>
    ),
    summary: <p>Friksjons­fri: a=g sin θ. Med friksjon: ma=mg sin θ − f.</p>,
  },

  "5.17": {
    title: "Tau over trinse — finn masse",
    difficulty: "middels",
    pageRef: "s. 189",
    problem: (
      <p>
        Et lett tau er festet til en blokk med masse 4,70 kg som hviler på en friksjons­fri horisontal
        overflate. Tauet går over en friksjons­fri trinse, og en blokk med masse m er hengt fra den andre
        enden. Når blokkene slippes, er spenningen i tauet 13,6 N. Finn (b) akselerasjonen og (c) massen m.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Blokk på bordet: <InlineLatex latex="m_1=4{,}70\;\text{kg}" /></li>
        <li>Spenning: <InlineLatex latex="T=13{,}6\;\text{N}" /></li>
        <li>Friksjons­fritt bord og trinse</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(b) Akselerasjon a</li>
        <li>(c) Hengende masse m</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Koblet trinsesystem">
          <p className="mb-1">To masser, samme tau, samme |a|:</p>
          <ul className="list-disc pl-5">
            <li>Bordblokk (m_1): bare T trekker den horisontalt → <InlineLatex latex="T = m_1 a" /></li>
            <li>Hengende (m_2): tyngde minus spenning → <InlineLatex latex="m_2 g - T = m_2 a" /></li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Hvorfor denne strategien fungerer">
          <p>
            Når T og m_1 er kjent, gir første ligning a direkte. Deretter løser den andre ligningen for m_2.
          </p>
          <FormulaBox variant="gold" latex="a=\dfrac{T}{m_1},\quad m_2=\dfrac{T}{g-a}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bordblokken har bare én horisontal kraft: T. Newton 2 gir a direkte.</p> },
      { label: "Hint 2", content: <p>For m_2: m_2 g − T = m_2 a → m_2 (g − a) = T → m_2 = T/(g − a).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">To ukjente (a og m), to ligninger.</p>
        <Step n={1} title="(b) Akselerasjon fra bordblokken">
          <FormulaBox latex="\Sigma F_x = T = m_1 a" />
          <FormulaBox latex="a=\dfrac{13{,}6}{4{,}70}" />
          <FormulaBox variant="gold" latex="a\approx 2{,}89\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(c) Hengende masse">
          <p>Newton 2 for hengende blokk:</p>
          <FormulaBox latex="m g - T = m a\Rightarrow m(g-a)=T" />
          <FormulaBox latex="m=\dfrac{T}{g-a}=\dfrac{13{,}6}{9{,}80-2{,}89}=\dfrac{13{,}6}{6{,}91}" />
          <FormulaBox variant="gold" latex="m\approx 1{,}97\;\text{kg}" />
        </Step>
        <Pitfall>
          <strong>Pass på fortegn.</strong> For den hengende blokken er a rettet nedover, og m·g er
          større enn T (ellers ville den ikke akselerert ned). Hvis du får negativ masse, sjekk ligningen
          om det skal være T − mg eller mg − T.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: m=1,97 kg er mindre enn m_1=4,70 kg, men trekker likevel den større massen
          fordi det er ingen friksjon på bordet. Hadde det vært friksjon, hadde det krevd større m.
        </p>
      </div>
    ),
    summary: <p>Atwood-lignende: T &lt; vekt når hengende blokk faller.</p>,
  },

  "5.19": {
    title: "BIO Kraft under et hopp",
    difficulty: "vanskelig",
    pageRef: "s. 189",
    problem: (
      <p>
        Når man hopper rett opp fra en bøyd posisjon, kan en gjennomsnitts­person nå max høyde av ca. 60 cm.
        Personens kropp stiger ca. 50 cm før den forlater bakken. (a) Med hvilken initial­fart forlater
        personen bakken? (b) FBD. (c) I forhold til hopperens vekt w, hvor stor kraft utøver bakken?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Toppunkt over avgang: <InlineLatex latex="h=0{,}60\;\text{m}" /></li>
        <li>Akselerasjons­avstand (knebøyd til strakt): <InlineLatex latex="d=0{,}50\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Avgangs­fart <InlineLatex latex="v_0" /></li>
        <li>(c) Bakkekraft F i forhold til vekt w</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To faser av et hopp">
          <p className="mb-1">Fase 1 (på bakken, akselereres opp):</p>
          <ul className="list-disc pl-5">
            <li>Bena strekker seg over d = 50 cm</li>
            <li>Krafter: bakkekraft F opp, vekt w ned</li>
            <li>Newton 2: <InlineLatex latex="F-w=ma" /></li>
          </ul>
          <p className="mt-2 mb-1">Fase 2 (i lufta, fritt fall):</p>
          <ul className="list-disc pl-5">
            <li>Bare tyngden virker → desselerasjon g</li>
            <li>Stiger h = 60 cm fra avgangsfart v_0 til null</li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Bakgrunnsligninger">
          <FormulaBox latex="v_0=\sqrt{2gh}\quad (\text{fase 2})" />
          <FormulaBox latex="v_0^2=2ad\quad (\text{fase 1, fra ro})" />
          <FormulaBox variant="gold" latex="F=w\left(1+\dfrac{a}{g}\right)" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>I lufta er det fritt fall. Hvilken fart må personen forlate bakken med for å stige 60 cm?</p> },
      { label: "Hint 2", content: <p>Under akselerasjons­fasen (50 cm i bena) går personen fra ro til v_0. Bruk v_0² = 2ad.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vi splitter hoppet i akselerasjonsfase (på bakken) og frifallsfase (i luften).</p>
        <Step n={1} title="(a) Avgangs­fart fra fritt fall">
          <FormulaBox latex="v_0=\sqrt{2gh}=\sqrt{2(9{,}80)(0{,}60)}" />
          <FormulaBox variant="gold" latex="v_0\approx 3{,}43\;\text{m/s}" />
        </Step>
        <Step n={2} title="Akselerasjon under spranget">
          <FormulaBox latex="v_0^2=2ad\Rightarrow a=\dfrac{v_0^2}{2d}=\dfrac{(3{,}43)^2}{2(0{,}50)}" />
          <FormulaBox latex="a\approx 11{,}77\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(c) Bakkekraft">
          <FormulaBox latex="F-w=ma\Rightarrow F=w+ma=w+\dfrac{w}{g}\cdot a" />
          <FormulaBox latex="F=w\left(1+\dfrac{11{,}77}{9{,}80}\right)=w(1+1{,}20)" />
          <FormulaBox variant="gold" latex="F\approx 2{,}20\,w" />
        </Step>
        <Pitfall>
          <strong>Bakkekraften er IKKE bare ma — den er også støtte for vekten.</strong> Personen
          må bli holdt oppe (mg) <em>og</em> akselereres opp (ma). Begge bidrar til F.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: kroppen kan kortvarig levere over 2× egen vekt fra bena. Sprintere og
          basketspillere kan nå opp mot 3w; gjennomsnitt ligger rundt 2w.
        </p>
      </div>
    ),
    summary: <p>Hopp: F~2,2× vekt under akselerasjons­fasen, deretter fritt fall.</p>,
  },

  "5.25": {
    title: "Lager­arbeider skyver kasse",
    difficulty: "middels",
    pageRef: "s. 189",
    problem: (
      <p>
        En lager­arbeider skyver en kasse med masse 16,8 kg på et horisontalt underlag med konstant
        fart 3,50 m/s. <InlineLatex latex="\mu_k=0{,}20" />. (a) Kraft for å opprett­holde bevegelsen?
        (b) Hvis kraften fjernes, hvor langt sklir kassen før den stopper?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=16{,}8\;\text{kg}" /></li>
        <li>Fart: <InlineLatex latex="v=3{,}50\;\text{m/s}" /></li>
        <li>Kinetisk friksjons­koeff.: <InlineLatex latex="\mu_k=0{,}20" /></li>
        <li>Horisontal flate, horisontal skyv</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Kraft for konstant fart</li>
        <li>(b) Skli-avstand etter at kraften fjernes</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Konstant fart = kraftbalanse">
          <p>Konstant fart betyr at netto-kraft er null:</p>
          <FormulaBox variant="gold" latex="F = f_k = \mu_k N = \mu_k mg" />
          <p className="text-xs">På horisontal flate uten vertikal trekk er N = mg.</p>
        </TheoryBox>
        <TheoryBox title="Stopp-avstand fra kinematikk">
          <p>Når F fjernes, er friksjon eneste horisontale kraft → konstant desselerasjon:</p>
          <FormulaBox latex="a = -\mu_k g" />
          <p className="mb-1">Bruker v² = v_0² + 2ad med slutt v = 0:</p>
          <FormulaBox variant="gold" latex="d=\dfrac{v^2}{2\mu_k g}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Newton 1: hvis fart er konstant, må kraften balansere kinetisk friksjon.</p> },
      { label: "Hint 2", content: <p>(b) Når F fjernes: a = −μ_k·g (uavhengig av masse). Bruk v² = 2|a|d.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">To uavhengige spørsmål — likevekt og kinematikk.</p>
        <Step n={1} title="(a) Kraft for konstant fart">
          <FormulaBox latex="F=\mu_k mg=0{,}20\cdot 16{,}8\cdot 9{,}80" />
          <FormulaBox variant="gold" latex="F\approx 32{,}9\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Desselerasjon når F fjernes">
          <FormulaBox latex="a=-\mu_k g=-0{,}20\cdot 9{,}80=-1{,}96\;\text{m/s}^2" />
          <p>Massen kanselleres — alle kasser med samme μ_k stopper på samme avstand fra samme fart.</p>
        </Step>
        <Step n={3} title="(b) Skli-avstand">
          <FormulaBox latex="0=v_0^2-2|a|d\Rightarrow d=\dfrac{v_0^2}{2\mu_k g}" />
          <FormulaBox latex="d=\dfrac{(3{,}50)^2}{2(0{,}20)(9{,}80)}=\dfrac{12{,}25}{3{,}92}" />
          <FormulaBox variant="gold" latex="d\approx 3{,}13\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Skli-avstand avhenger ikke av masse</strong> — bare av v_0 og μ_k. Dette er fordi
          både fremad-trekkende kraft (treghet) og friksjons­kraft skalerer med m.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: μ = 0,20 er typisk for kartong-på-lakkert-tre. Doblet fart firedobler
          stopp-avstand (kvadratisk avhengighet).
        </p>
      </div>
    ),
    summary: <p>Kinetisk friksjon stopper med a=μk·g; stopp-avstand uavhengig av masse.</p>,
  },

  "5.26": {
    title: "BIO Kasse med bananer — friksjon i fem scenarier",
    difficulty: "middels",
    pageRef: "s. 189",
    problem: (
      <p>
        En kasse med bananer som veier 40,0 N hviler på en horisontal overflate. <InlineLatex latex="\mu_s=0{,}40,\;\mu_k=0{,}20" />.
        (a) Friksjon hvis ingen horisontal kraft? (b) Friksjon hvis ape anvender 6,0 N? (c) Min kraft for å starte?
        (d) Min kraft for å holde i konstant bevegelse? (e) Hvis 18 N, friksjon og akselerasjon?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vekt: <InlineLatex latex="W=40{,}0\;\text{N}" /></li>
        <li><InlineLatex latex="\mu_s=0{,}40,\;\mu_k=0{,}20" /></li>
        <li>Horisontal flate</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Friksjon i fem ulike situasjoner</li>
        <li>(e) Akselerasjon ved F = 18 N</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Statisk vs kinetisk friksjon">
          <p className="mb-1">Statisk friksjon <em>tilpasser seg</em> opp til en grense:</p>
          <FormulaBox variant="gold" latex="f_s\leq \mu_s N\quad (\text{just nok til å hindre bevegelse})" />
          <p className="mt-2 mb-1">Kinetisk friksjon er konstant når kassen beveger seg:</p>
          <FormulaBox variant="gold" latex="f_k=\mu_k N" />
          <p className="text-xs mt-1">På horisontal flate uten vertikal trekk er N = W = 40,0 N.</p>
        </TheoryBox>
        <TheoryBox title="Maks-grenser">
          <FormulaBox latex="f_{s,\text{max}}=\mu_s W=0{,}40(40)=16{,}0\;\text{N}" />
          <FormulaBox latex="f_k=\mu_k W=0{,}20(40)=8{,}0\;\text{N}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sammenlign anvendt kraft med f_{"{s,max}"} = 16 N. Hvis lavere → kassen står stille og friksjon = anvendt kraft. Hvis høyere → kassen beveger seg, og f = f_k = 8 N.</p> },
      { label: "Hint 2", content: <p>For (e): F=18 &gt; 16 N, så bevegelse. Bruk Newton 2 med f_k=8 N.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Den sentrale ideen er at statisk friksjon er en <em>respons</em>, ikke en formel.</p>
        <Step n={1} title="(a) Ingen anvendt kraft">
          <p>Ingen kraft å motvirke → ingen friksjon.</p>
          <FormulaBox variant="gold" latex="f=0" />
        </Step>
        <Step n={2} title="(b) F = 6,0 N">
          <p>6,0 N &lt; f_{"{s,max}"} = 16 N → kassen står stille; statisk friksjon balanserer:</p>
          <FormulaBox variant="gold" latex="f=6{,}0\;\text{N}" />
        </Step>
        <Step n={3} title="(c) Min kraft for å starte">
          <FormulaBox latex="F_\text{min}=f_{s,\text{max}}=\mu_s W=0{,}40(40)" />
          <FormulaBox variant="gold" latex="F_\text{min}=16{,}0\;\text{N}" />
        </Step>
        <Step n={4} title="(d) Konstant bevegelse">
          <FormulaBox latex="F=\mu_k W=0{,}20(40)" />
          <FormulaBox variant="gold" latex="F=8{,}0\;\text{N}" />
        </Step>
        <Step n={5} title="(e) F = 18 N — beveger seg">
          <p>18 N &gt; 16 N, så kassen er i bevegelse. Friksjon er kinetisk:</p>
          <FormulaBox latex="f_k=8{,}0\;\text{N}" />
          <FormulaBox latex="m=W/g=40/9{,}80=4{,}08\;\text{kg}" />
          <FormulaBox latex="a=\dfrac{F-f_k}{m}=\dfrac{18-8{,}0}{4{,}08}" />
          <FormulaBox variant="gold" latex="a\approx 2{,}45\;\text{m/s}^2" />
        </Step>
        <Pitfall>
          <strong>Statisk friksjon er ikke alltid μ_s·N.</strong> Den vokser bare så mye som
          nødvendig for å hindre bevegelse. Først når den når μ_s·N begynner kassen å gli.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: når kassen først er i bevegelse, faller friksjonen fra 16 til 8 N (mikroskopisk
          fordi de molekylære &laquo;sammenkoblingene&raquo; brytes opp). Derfor er det vanskeligere å starte
          enn å holde i bevegelse.
        </p>
      </div>
    ),
    summary: <p>Statisk friksjon ≤ μs·N (tilpasningsbar). Kinetisk: konstant μk·N.</p>,
  },

  "5.35": {
    title: "Bremse­avstand",
    difficulty: "middels",
    pageRef: "s. 190",
    problem: (
      <p>
        (a) Hvis koeffisienten av kinetisk friksjon mellom dekk og tørr asfalt er 0,80, hva er kortest
        avstand der du kan stoppe bilen ved å låse bremsene når den kjører 28,7 m/s? (b) På våt asfalt
        kan friksjons­koeffisienten være kun 0,25. Hvor fort skal du kjøre på våt asfalt for å kunne
        stoppe på samme avstand som i (a)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Tørr asfalt: <InlineLatex latex="\mu_k=0{,}80" />, <InlineLatex latex="v=28{,}7\;\text{m/s}" /></li>
        <li>Våt asfalt: <InlineLatex latex="\mu_k=0{,}25" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Stopp-avstand på tørr asfalt</li>
        <li>(b) Maks fart på våt asfalt for samme stopp-avstand</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Bremsing med låste hjul">
          <p>Med låste hjul er det kinetisk friksjon som bremser. Desselerasjon:</p>
          <FormulaBox variant="gold" latex="a=\mu_k g" />
          <p className="text-xs">Massen kanselleres ut.</p>
        </TheoryBox>
        <TheoryBox title="Stopp-avstand fra kinematikk">
          <p>Fra v² = v_0² − 2ad med slutt-fart 0:</p>
          <FormulaBox variant="gold" latex="d=\dfrac{v_0^2}{2\mu_k g}" />
          <p className="text-xs mt-1">Doble farten → firdoble stopp-avstand. Halvere μ → doble avstand.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Stopp-avstand er v²/(2μ_k·g). Sett inn 28,7 og 0,80.</p> },
      { label: "Hint 2", content: <p>(b) Du vil ha samme d. Inverter formelen: v = √(2·μ_k·g·d) med μ_k = 0,25.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Stopp-avstand er proporsjonal med v² og omvendt proporsjonal med μ_k.</p>
        <Step n={1} title="(a) Stopp på tørr asfalt">
          <FormulaBox latex="d=\dfrac{v^2}{2\mu_k g}=\dfrac{(28{,}7)^2}{2(0{,}80)(9{,}80)}=\dfrac{823{,}7}{15{,}68}" />
          <FormulaBox variant="gold" latex="d\approx 52{,}5\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Maks fart på våt asfalt">
          <p>Sett samme d, men nå med μ_k = 0,25:</p>
          <FormulaBox latex="v_\text{våt}=\sqrt{2\mu_k g\cdot d}=\sqrt{2(0{,}25)(9{,}80)(52{,}5)}" />
          <FormulaBox variant="gold" latex="v_\text{våt}\approx 16{,}0\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Med ABS er den faktiske bremse­avstanden kortere</strong> enn med låste hjul,
          fordi ABS holder dekket på grensen mellom statisk og kinetisk friksjon (μ_s &gt; μ_k).
          Denne oppgaven antar låste hjul.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: en 3,2× lavere μ (0,80 → 0,25) krever 1/√3,2 = 0,56× lavere fart for
          samme stopp-avstand. Derfor 28,7 → 16,0 m/s. Vått føre er ekstremt mye farligere.
        </p>
      </div>
    ),
    summary: <p>Bremse­avstand ∝ v²/μ_k; uavhengig av masse.</p>,
  },

  "5.39": {
    title: "Blokk + henger + friksjon",
    difficulty: "middels",
    pageRef: "s. 190",
    problem: (
      <p>
        Blokk A (2,19 kg) på tabletop, koblet via tau over trinse til hengende blokk B (2,27 kg).
        <InlineLatex latex="\;\mu_k=0{,}331" />. Slippes fra ro. (a) Fart etter 3,30 cm. (b) Spenning.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Bordblokk: <InlineLatex latex="m_A=2{,}19\;\text{kg}" /></li>
        <li>Hengende blokk: <InlineLatex latex="m_B=2{,}27\;\text{kg}" /></li>
        <li>Kinetisk friksjon: <InlineLatex latex="\mu_k=0{,}331" /></li>
        <li>Avstand: d = 0,033 m, slipper fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Fart etter 3,30 cm</li>
        <li>(b) Spenning T</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Koblet system med friksjon">
          <p className="mb-1">Sett opp Newton 2 for hver blokk:</p>
          <ul className="list-disc pl-5">
            <li>A (på bordet): <InlineLatex latex="T-\mu_k m_A g=m_A a" /></li>
            <li>B (hengende): <InlineLatex latex="m_B g-T=m_B a" /></li>
          </ul>
          <p className="mt-2">Adder for å eliminere T:</p>
          <FormulaBox variant="gold" latex="a=\dfrac{(m_B-\mu_k m_A)g}{m_A+m_B}" />
        </TheoryBox>
        <TheoryBox title="Kinematikk fra ro">
          <FormulaBox variant="gold" latex="v=\sqrt{2ad}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Friksjons­kraften på A er μ_k·m_A·g (siden N_A = m_A·g).</p> },
      { label: "Hint 2", content: <p>Etter at a er funnet, sett a tilbake i B-ligningen for T = m_B(g − a).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Klassisk «Modified Atwood» med friksjon på bordblokken.</p>
        <Step n={1} title="Akselerasjon">
          <FormulaBox latex="a=\dfrac{(m_B-\mu_k m_A)g}{m_A+m_B}=\dfrac{(2{,}27-0{,}331\cdot 2{,}19)(9{,}80)}{4{,}46}" />
          <FormulaBox latex="a=\dfrac{(2{,}27-0{,}725)(9{,}80)}{4{,}46}=\dfrac{15{,}14}{4{,}46}" />
          <FormulaBox variant="gold" latex="a\approx 3{,}40\;\text{m/s}^2" />
        </Step>
        <Step n={2} title="(a) Fart etter 3,30 cm">
          <FormulaBox latex="v=\sqrt{2ad}=\sqrt{2(3{,}40)(0{,}033)}=\sqrt{0{,}224}" />
          <FormulaBox variant="gold" latex="v\approx 0{,}474\;\text{m/s}" />
        </Step>
        <Step n={3} title="(b) Spenning">
          <FormulaBox latex="T=m_B(g-a)=2{,}27(9{,}80-3{,}40)=2{,}27(6{,}40)" />
          <FormulaBox variant="gold" latex="T\approx 14{,}5\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Sjekk at m_B·g &gt; μ_k·m_A·g</strong> — ellers ville systemet ikke kommet i bevegelse.
          Her: 22,2 N &gt; 7,1 N → ja, systemet akselererer.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: akselerasjonen er betydelig mindre enn for et friksjons­fritt system
          (5,0 m/s²). Friksjonen «spiser» 1,6 m/s² — over 30%.
        </p>
      </div>
    ),
    summary: <p>Friksjon reduserer akselerasjon; T ligger mellom m_A·g og m_B·g.</p>,
  },

  "5.40": {
    title: "Cricket-ball med v²-luft­motstand",
    difficulty: "vanskelig",
    pageRef: "s. 190",
    problem: (
      <p>
        Du kaster en cricket­ball rett oppover. Drag­kraft ∝ v². I form av g, hva er y-komponenten av
        akselerasjonen når farten er halv av terminal­fart og (a) ballen beveger seg oppover, (b) den
        beveger seg nedover?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Fart: <InlineLatex latex="v=v_t/2" /></li>
        <li>Drag: <InlineLatex latex="F_D=Dv^2" /> (kvadratisk i fart)</li>
        <li>Terminal­fart: <InlineLatex latex="Dv_t^2=mg" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) <InlineLatex latex="a_y" /> oppover</li>
        <li>(b) <InlineLatex latex="a_y" /> nedover</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Terminal­fart-definisjon">
          <p>Ved terminal­fart er drag lik tyngde:</p>
          <FormulaBox variant="gold" latex="Dv_t^2=mg\Rightarrow D=mg/v_t^2" />
        </TheoryBox>
        <TheoryBox title="Drag ved halv terminal­fart">
          <p>v² er nå (v_t/2)² = v_t²/4, så:</p>
          <FormulaBox variant="gold" latex="F_D=D\cdot \tfrac{v_t^2}{4}=\tfrac{mg}{4}" />
        </TheoryBox>
        <TheoryBox title="Drag-retning er motsatt fart">
          <p className="mb-1">Drag motvirker bevegelse:</p>
          <ul className="list-disc pl-5">
            <li>Oppover: drag peker <strong>ned</strong> → drag og tyngde samme retning</li>
            <li>Nedover: drag peker <strong>opp</strong> → drag motsatt tyngde</li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sett opp Newton 2 for hvert tilfelle. Hva er drag-størrelsen ved v = v_t/2?</p> },
      { label: "Hint 2", content: <p>Husk: drag-retningen avhenger av bevegelses­retningen, men tyngden peker alltid ned.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Forholdet mellom drag og tyngde er nøkkelen.</p>
        <Step n={1} title="Drag-størrelse ved v = v_t/2">
          <FormulaBox latex="F_D=Dv^2=D(v_t/2)^2=\tfrac{1}{4}Dv_t^2=\tfrac{mg}{4}" />
        </Step>
        <Step n={2} title="(a) Oppover — drag og tyngde begge ned">
          <FormulaBox latex="ma=mg+F_D=mg+\tfrac{mg}{4}=\tfrac{5}{4}mg" />
          <FormulaBox variant="gold" latex="|a|=1{,}25\,g" />
        </Step>
        <Step n={3} title="(b) Nedover — drag mot tyngde">
          <FormulaBox latex="ma=mg-F_D=mg-\tfrac{mg}{4}=\tfrac{3}{4}mg" />
          <FormulaBox variant="gold" latex="|a|=0{,}75\,g" />
        </Step>
        <Pitfall>
          <strong>Drag-kraft er IKKE konstant gjennom flyturen</strong> — den varierer med v². Her
          analyserer vi kun øyeblikket der v = v_t/2. Akselerasjonen endrer seg kontinuerlig.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: oppovergang bremses raskere enn nedstigning ved samme fart. Ballen bruker
          mer tid på vei ned enn på vei opp — derfor faller den lavere enn forventet uten luftmotstand.
        </p>
      </div>
    ),
    summary: <p>v²-drag: oppover bremses hardere; ned: drag motvirker tyngden.</p>,
  },

  "5.41": {
    title: "Kasse skyves nedover med vinkel",
    difficulty: "vanskelig",
    pageRef: "s. 191",
    problem: (
      <p>
        Kasse med masse m hviler på horisontalt gulv. Friksjon: μs, μk. Kvinne skyver med kraft
        <InlineLatex latex="\;F" /> i vinkel θ under horisontalen. (a) F for konstant fart? (b) Kritisk
        μs der hun ikke kan starte uansett?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse m, friksjons­koeffisienter μ_s og μ_k</li>
        <li>Kraft F i vinkel θ under horisontalen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) F for konstant fart</li>
        <li>(b) Kritisk μ_s for «umulig å starte»</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Skyv ned-foran øker normalkraften">
          <p>F under horisontalen har komponent F sin θ ned. Dette legger til normalen:</p>
          <FormulaBox variant="gold" latex="N=mg+F\sin\theta" />
          <p className="text-xs">Mer N → mer friksjon → vanskeligere å starte!</p>
        </TheoryBox>
        <TheoryBox title="Likevekt for konstant fart">
          <p>Horisontal: skyv-komponent kanselleres av friksjon:</p>
          <FormulaBox latex="F\cos\theta=\mu_k N=\mu_k(mg+F\sin\theta)" />
          <FormulaBox variant="gold" latex="F=\dfrac{\mu_k mg}{\cos\theta-\mu_k\sin\theta}" />
        </TheoryBox>
        <TheoryBox title="Kritisk μ — uendelig F">
          <p>Når nevneren går mot null, må F → ∞. Det betyr at uansett hvor hardt du skyver, kan du ikke starte:</p>
          <FormulaBox variant="gold" latex="\cos\theta-\mu_s\sin\theta=0\Rightarrow \mu_{s,\text{krit}}=\cot\theta" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vertikalt: N = mg + F sin θ (kraften har en komponent ned).</p> },
      { label: "Hint 2", content: <p>For å starte, må F cos θ overgå statisk friksjon μ_s·N. Sett ligningen og se når den ikke har løsning.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vinkelen «under horisontalen» øker normalkraften — kan låse systemet.</p>
        <Step n={1} title="Vertikal balanse">
          <FormulaBox latex="N-mg-F\sin\theta=0" />
          <FormulaBox latex="N=mg+F\sin\theta" />
        </Step>
        <Step n={2} title="(a) Horisontal balanse → F">
          <FormulaBox latex="F\cos\theta-\mu_k N=0" />
          <FormulaBox latex="F\cos\theta=\mu_k(mg+F\sin\theta)" />
          <FormulaBox latex="F\cos\theta-\mu_k F\sin\theta=\mu_k mg" />
          <FormulaBox variant="gold" latex="F=\dfrac{\mu_k mg}{\cos\theta-\mu_k\sin\theta}" />
        </Step>
        <Step n={3} title="(b) Kritisk μ_s">
          <p>For å starte kreves <InlineLatex latex="F\cos\theta>\mu_s N" />. Ligningen for F (med μ_s i stedet for μ_k) blir uendelig når nevneren er null:</p>
          <FormulaBox latex="\cos\theta-\mu_s\sin\theta=0" />
          <FormulaBox variant="gold" latex="\mu_{s,\text{krit}}=\cot\theta=\dfrac{1}{\tan\theta}" />
        </Step>
        <Pitfall>
          <strong>Skyver du ovenfra, blir friksjonen verre.</strong> Trekk i stedet (kraft over horisontalen)
          gir N = mg − F sin θ → mindre friksjon. Møbelflyttere drar i stedet for å skyve av denne grunn.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: ved θ = 30° er μ_krit = √3 ≈ 1,73. Sjelden får man så høy μ, men det
          finnes — gummi-på-gummi kan komme der. Da er kassen «låst» uansett.
        </p>
      </div>
    ),
    summary: <p>Vinkelen kan «låse» systemet — kritisk μ_s = cot θ.</p>,
  },

  "5.45": {
    title: "RC-bil i vertikal sirkel",
    difficulty: "middels",
    pageRef: "s. 191",
    problem: (
      <p>
        En liten radio­styrt bil med masse 1,60 kg beveger seg i konstant fart 12,0 m/s i et spor formet
        av en vertikal sirkel inne i en hul metall­sylinder med radius 5,00 m. Hva er normal­kraften
        ved (a) punkt A (bunnen), (b) punkt B (toppen)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=1{,}60\;\text{kg}" /></li>
        <li>Fart: <InlineLatex latex="v=12{,}0\;\text{m/s}" /></li>
        <li>Radius: <InlineLatex latex="R=5{,}00\;\text{m}" /></li>
        <li>Konstant fart i vertikal sirkel</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) N ved punkt A (bunnen)</li>
        <li>(b) N ved punkt B (toppen)</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Sentripetal akselerasjon">
          <p>I vertikal sirkel peker netto-kraften alltid mot sentrum. Sentripetalakselerasjonen er:</p>
          <FormulaBox variant="gold" latex="a_\text{rad}=\dfrac{v^2}{R}" />
        </TheoryBox>
        <TheoryBox title="Bunn vs topp">
          <p className="mb-1">Ved bunnen peker «mot sentrum» = oppover:</p>
          <FormulaBox latex="N_A - mg = ma_\text{rad}\Rightarrow N_A=m(g+a_\text{rad})" />
          <p className="mt-2 mb-1">Ved toppen peker «mot sentrum» = nedover (begge krefter ned):</p>
          <FormulaBox latex="N_B + mg = ma_\text{rad}\Rightarrow N_B=m(a_\text{rad}-g)" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn kraft­diagram for hvert punkt. Husk: sentripetal-retning peker fra bilen mot sirkelens sentrum.</p> },
      { label: "Hint 2", content: <p>Ved bunnen er N opp, mg ned. Ved toppen er N ned (sporet trykker bilen ned), mg ned.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vertikal sirkel-bevegelse: sporet leverer normalkraft som varierer med posisjon.</p>
        <Step n={1} title="Sentripetalakselerasjon">
          <FormulaBox latex="a_\text{rad}=\dfrac{v^2}{R}=\dfrac{(12)^2}{5{,}00}=\dfrac{144}{5}" />
          <FormulaBox latex="a_\text{rad}=28{,}8\;\text{m/s}^2" />
          <p className="text-xs">Dette er nær 3g — betydelig kraft.</p>
        </Step>
        <Step n={2} title="(a) Bunnen — N peker opp, mot sentrum">
          <FormulaBox latex="N_A-mg=ma_\text{rad}" />
          <FormulaBox latex="N_A=m(g+a_\text{rad})=1{,}60(9{,}80+28{,}8)=1{,}60(38{,}6)" />
          <FormulaBox variant="gold" latex="N_A\approx 61{,}8\;\text{N}" />
        </Step>
        <Step n={3} title="(b) Toppen — N peker ned, mot sentrum">
          <p>Bilen er &laquo;opp ned&raquo; mot sporet, så sporet presser ned. Tyngden er også ned:</p>
          <FormulaBox latex="N_B+mg=ma_\text{rad}" />
          <FormulaBox latex="N_B=m(a_\text{rad}-g)=1{,}60(28{,}8-9{,}80)=1{,}60(19{,}0)" />
          <FormulaBox variant="gold" latex="N_B\approx 30{,}4\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Ved toppen kan N gå mot null.</strong> Hvis v² &lt; gR, kan bilen ikke holde seg
          mot sporet — den faller. Min-fart for å holde seg: v_min = √(gR). Her: √49 = 7 m/s, og
          12 &gt; 7, så det går bra.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: bilen «føler» seg tyngre på bunnen (3,9× sin egen vekt) og lettere på toppen
          (1,9× sin egen vekt). Dette er hvorfor du kjenner trykk i magen i berg-og-dalbane.
        </p>
      </div>
    ),
    summary: <p>Sirkulær bevegelse: N varierer; bunn har størst, topp minst.</p>,
  },

  "5.48": {
    title: "Flat sving — minst friksjon",
    difficulty: "middels",
    pageRef: "s. 191",
    problem: (
      <p>
        En flat (uoptilt) kurve på en motorvei har radius 230,0 m. En bil tar svingen med fart 28,0 m/s.
        (a) Hva er minst koeffisient av statisk friksjon som vil hindre sklis? (b) Hvis koeffisienten
        bare er 1/3 av (a) (på is), hva skal være maks fart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Radius: <InlineLatex latex="R=230{,}0\;\text{m}" /></li>
        <li>Fart: <InlineLatex latex="v=28{,}0\;\text{m/s}" /></li>
        <li>Flat sving (ikke banket)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Minimum <InlineLatex latex="\mu_s" /></li>
        <li>(b) Maks fart med <InlineLatex latex="\mu_s/3" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Flat sving — friksjon gir sentripetal-kraft">
          <p>På flat sving må statisk friksjon alene levere all sentripetal-kraft. Maks tilgjengelig:</p>
          <FormulaBox latex="f_s\leq \mu_s N=\mu_s mg" />
          <p className="mt-2">For å holde seg på sirkelbanen:</p>
          <FormulaBox variant="gold" latex="\mu_s g\geq \dfrac{v^2}{R}" />
        </TheoryBox>
        <TheoryBox title="Maks fart">
          <FormulaBox variant="gold" latex="v_\text{max}=\sqrt{\mu_s g R}" />
          <p className="text-xs">Massen kanselleres — gjelder for alle kjøretøy.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Minimum μ_s er der friksjons­kraft akkurat dekker sentripetal-behov: μ_s·g = v²/R.</p> },
      { label: "Hint 2", content: <p>(b) Med 1/3 av μ må farten være √(1/3) ≈ 0,577 av original.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">På flat sving er friksjon den eneste kraften som kan «trekke» bilen mot sentrum.</p>
        <Step n={1} title="(a) Minimum μ_s">
          <FormulaBox latex="\mu_s=\dfrac{v^2}{gR}=\dfrac{(28)^2}{9{,}80\cdot 230}=\dfrac{784}{2254}" />
          <FormulaBox variant="gold" latex="\mu_{s,\text{min}}\approx 0{,}347" />
        </Step>
        <Step n={2} title="(b) Maks fart med μ/3">
          <FormulaBox latex="v=\sqrt{(\mu_s/3)gR}=\sqrt{(0{,}347/3)(9{,}80)(230)}" />
          <FormulaBox latex="v=\sqrt{0{,}1156\cdot 9{,}80\cdot 230}=\sqrt{260{,}5}" />
          <FormulaBox variant="gold" latex="v\approx 16{,}2\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Det er statisk, ikke kinetisk friksjon</strong> som holder bilen i svingen — så lenge
          dekkene ikke skidder. Når dekkene skidder, faller koeffisienten til μ_k og bilen mister grep.
          Derfor er det ekstra farlig hvis du først sklir.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 28 m/s ≈ 100 km/t krever μ ≈ 0,35 — ganske typisk for tørr asfalt. På is
          (μ ≈ 0,1) faller maks fart til ca. 60 km/t. Banket sving (neste oppgave-type) hjelper enormt.
        </p>
      </div>
    ),
    summary: <p>Flat sving: friksjon gir all sentripetal kraft; v_max = √(μg R).</p>,
  },

  "5.50": {
    title: "Giant Swing — periode (Fig E5.50)",
    difficulty: "middels",
    pageRef: "s. 191",
    problem: (
      <p>
        «Giant Swing» har en vertikal sentral­aksel med horisontale armer. Hver arm støtter et sete
        suspendert fra en kabel 5,00 m lang, og den øvre enden av kabelen er festet 3,00 m fra sentral­akselen.
        Finn tiden for én omdreining hvis kabelen danner en vinkel 30,0° med vertikalen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kabel-lengde: <InlineLatex latex="L=5{,}00\;\text{m}" /></li>
        <li>Avstand fra akse til kabel-feste: <InlineLatex latex="d=3{,}00\;\text{m}" /></li>
        <li>Kabel-vinkel: <InlineLatex latex="\theta=30{,}0°" /> fra vertikalen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Periode T (én omdreining)</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Konisk pendel">
          <p>Setet roterer i horisontal sirkel. Krefter: tau-spenning langs kabelen, tyngde mg ned.</p>
          <p className="mb-1">Standard konisk-pendel-relasjon (uten offset):</p>
          <FormulaBox latex="\tan\theta=\dfrac{v^2}{gR}\Rightarrow v=\sqrt{gR\tan\theta}" />
        </TheoryBox>
        <TheoryBox title="Offset-radius">
          <p>Kabelen er festet d = 3 m fra akselen, ikke ved akselen. Den effektive radiusen er:</p>
          <FormulaBox variant="gold" latex="R=d+L\sin\theta" />
          <p className="text-xs">L sin θ er den horisontale projeksjonen av kabelen.</p>
        </TheoryBox>
        <TheoryBox title="Periode">
          <FormulaBox variant="gold" latex="T=\dfrac{2\pi R}{v}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Beregn først radiusen R. Det er ikke L sin θ alene — kabel-festet er også flyttet ut fra senter.</p> },
      { label: "Hint 2", content: <p>Konisk pendel: tan θ = v²/(gR). Løs for v og bruk T = 2πR/v.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tre steg: radius → fart → periode.</p>
        <Step n={1} title="Effektiv radius">
          <FormulaBox latex="R=d+L\sin\theta=3{,}00+5{,}00\sin 30°" />
          <FormulaBox latex="R=3{,}00+5{,}00(0{,}500)=5{,}50\;\text{m}" />
        </Step>
        <Step n={2} title="Fart fra konisk-pendel-likning">
          <FormulaBox latex="v=\sqrt{gR\tan\theta}=\sqrt{9{,}80\cdot 5{,}50\cdot \tan 30°}" />
          <FormulaBox latex="v=\sqrt{53{,}9\cdot 0{,}5774}=\sqrt{31{,}1}" />
          <FormulaBox latex="v\approx 5{,}59\;\text{m/s}" />
        </Step>
        <Step n={3} title="Periode">
          <FormulaBox latex="T=\dfrac{2\pi R}{v}=\dfrac{2\pi(5{,}50)}{5{,}59}=\dfrac{34{,}56}{5{,}59}" />
          <FormulaBox variant="gold" latex="T\approx 6{,}19\;\text{s}" />
        </Step>
        <Pitfall>
          <strong>Glem ikke offset</strong> — hvis du bare bruker R = L sin θ = 2,5 m, får du
          T ≈ 4,18 s, som er feil. Festet er d unna akselen, så reell radius er d + L sin θ.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: T er uavhengig av masse — alle vekter får samme periode. Større vinkel
          (mer åpen) → mer R, men også høyere v; sammenhengen er ikke triviell.
        </p>
      </div>
    ),
    summary: <p>Konisk pendel + offset radius: T = 2πR/v med R = d + L sin θ.</p>,
  },

  "5.53": {
    title: "Roterende romstasjon",
    difficulty: "middels",
    pageRef: "s. 192",
    problem: (
      <p>
        Diameter 890 m. (a) rev/min for «kunstig gravitasjon» 9,80 m/s²? (b) For 3,70 m/s² (Mars)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Diameter: 890 m → <InlineLatex latex="R=445\;\text{m}" /></li>
        <li>(a) Ønsket akselerasjon: 9,80 m/s² (jord)</li>
        <li>(b) Ønsket akselerasjon: 3,70 m/s² (Mars)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a, b) Rotasjons­hastighet i rev/min</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Kunstig gravitasjon = sentripetal akselerasjon">
          <p>I et roterende referansesystem føler en astronaut sentrifugal-«kraft» utover. Den har størrelsen ω²R:</p>
          <FormulaBox variant="gold" latex="g_\text{eff}=\omega^2 R" />
        </TheoryBox>
        <TheoryBox title="Vinkelfart og rev/min">
          <FormulaBox latex="\omega=\sqrt{g_\text{eff}/R}\;\text{(rad/s)}" />
          <FormulaBox variant="gold" latex="\text{rpm}=\omega\cdot \dfrac{60}{2\pi}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>g = ω²R gir ω = √(g/R). Konverter til rpm via ω·60/(2π).</p> },
      { label: "Hint 2", content: <p>Mars-tilfelle: bare bytt 9,80 med 3,70 og kjør gjennom samme regning.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Sentripetalakselerasjonen ved kanten erstatter tyngdekraften.</p>
        <Step n={1} title="(a) Jord-gravitasjon">
          <FormulaBox latex="\omega_a=\sqrt{9{,}80/445}=\sqrt{0{,}02202}=0{,}1484\;\text{rad/s}" />
          <FormulaBox latex="\omega_a\cdot \dfrac{60}{2\pi}=\dfrac{8{,}90}{6{,}283}\approx 1{,}42\;\text{rpm}" />
          <FormulaBox variant="gold" latex="\omega_a\approx 1{,}42\;\text{rpm}" />
        </Step>
        <Step n={2} title="(b) Mars-gravitasjon">
          <FormulaBox latex="\omega_b=\sqrt{3{,}70/445}=\sqrt{0{,}008315}=0{,}0912\;\text{rad/s}" />
          <FormulaBox variant="gold" latex="\omega_b\approx 0{,}87\;\text{rpm}" />
        </Step>
        <Pitfall>
          <strong>For lav rpm gir for lav «gravitasjon», for høy rpm gir vertigo</strong> — folk
          som beveger hodet i en raskt roterende stasjon opplever Coriolis-effekter. Designer ofte mellom 1–2 rpm.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: diameter på nesten 1 km kreves for behagelig 1g med ≤ 2 rpm. Mindre stasjoner
          må enten rotere raskere (vertigo-problem) eller akseptere mindre effektiv tyngde.
        </p>
      </div>
    ),
    summary: <p>Stor R ⇒ liten ω; rev/min via ω·60/(2π).</p>,
  },

  "5.56": {
    title: "Stuntpilot trekker ut av dykk",
    difficulty: "vanskelig",
    pageRef: "s. 192",
    problem: (
      <p>
        50 kg pilot, fart 95 m/s i lavest punkt. (a) Min radius hvis a ≤ 4g. (b) Tilsynelatende vekt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Pilot: <InlineLatex latex="m=50{,}0\;\text{kg}" /></li>
        <li>Fart i bunnen: <InlineLatex latex="v=95\;\text{m/s}" /></li>
        <li>Maks akselerasjon: <InlineLatex latex="a\leq 4g" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Minimum sirkel-radius R</li>
        <li>(b) Tilsynelatende vekt (normalkraft fra setet)</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Ut-trekk fra dykk">
          <p>Piloten følger en sirkel-bue i bunnen. Sentripetal-akselerasjonen peker oppover (mot sentrum):</p>
          <FormulaBox latex="a_\text{rad}=\dfrac{v^2}{R}\leq 4g" />
          <FormulaBox variant="gold" latex="R_\text{min}=\dfrac{v^2}{4g}" />
        </TheoryBox>
        <TheoryBox title="Tilsynelatende vekt i bunnen">
          <p>Setet trykker oppover med N, tyngden mg trekker nedover. Newton 2:</p>
          <FormulaBox latex="N - mg = ma_\text{rad}" />
          <FormulaBox variant="gold" latex="N = m(g + a_\text{rad}) = (1+a/g)\,W" />
          <p className="text-xs">Med a = 4g blir N = 5W → «5g» på piloten.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Maks akselerasjon = 4g betyr v²/R = 4g. Løs for R.</p> },
      { label: "Hint 2", content: <p>I bunnen er normalkraften N = m(g + a_rad). Med a = 4g, blir N = 5mg.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">«Pulling g» — kroppens grense for blackout/redout-effekter.</p>
        <Step n={1} title="(a) Min radius">
          <FormulaBox latex="\dfrac{v^2}{R}=4g\Rightarrow R=\dfrac{v^2}{4g}" />
          <FormulaBox latex="R=\dfrac{(95)^2}{4(9{,}80)}=\dfrac{9025}{39{,}2}" />
          <FormulaBox variant="gold" latex="R_\text{min}\approx 230\;\text{m}" />
        </Step>
        <Step n={2} title="(b) Tilsynelatende vekt">
          <FormulaBox latex="N=m(g+a)=m(g+4g)=5mg" />
          <FormulaBox latex="N=5(50)(9{,}80)" />
          <FormulaBox variant="gold" latex="N=2450\;\text{N}=5\,W" />
        </Step>
        <Pitfall>
          <strong>4g er nær grensen for jagerflypiloter uten g-suit.</strong> Over 5g kan blod
          forlate hodet → blackout. G-suit komprimerer ben og buk for å holde blod oppe i kroppen.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: piloten føler 5× sin vanlige vekt presset inn i setet. Dette er ekstrem
          belastning — et sekund eller to er greit, men sustained 5g er meget anstrengende.
        </p>
      </div>
    ),
    summary: <p>Bunnen: tilsynelatende vekt = (1+a/g)·W.</p>,
  },

  "5.59": {
    title: "Hengende vekt fra to tau (Fig P5.59)",
    difficulty: "vanskelig",
    pageRef: "s. 192",
    problem: (
      <p>
        To tau koblet til stål­kabel som støtter hengende vekt (Fig. P5.59). Vinkler 60° og 40°.
        (a) FBD for knuten. Hvilket tau har størst spenning? (b) Hvis maks T=5000 N, max trygg vekt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Tau 1 i 60° fra horisontalen</li>
        <li>Tau 2 i 40° fra horisontalen</li>
        <li>Max spenning: <InlineLatex latex="T_\text{max}=5000\;\text{N}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Hvilket tau har størst spenning</li>
        <li>(b) Maks vekt w som kan henges</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Knutepunkt-likevekt">
          <p className="mb-1">På knuten virker tre krefter: T_1, T_2 og vertikal kabel som drar w nedover.</p>
          <ul className="list-disc pl-5">
            <li>Horisontal: <InlineLatex latex="T_1\cos 60°=T_2\cos 40°" /></li>
            <li>Vertikal: <InlineLatex latex="T_1\sin 60°+T_2\sin 40°=w" /></li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Hvilket tau er strammest?">
          <p>
            Fra horisontal balanse: <InlineLatex latex="T_1=T_2\cdot\dfrac{\cos 40°}{\cos 60°}=1{,}532\,T_2" />
          </p>
          <p className="mt-1">Tauet med <strong>mindre vinkel fra horisontalen</strong> (40°) har større cos, og dets makker (60°) må kompensere med høyere spenning. Så T_1 (60°-tauet) er størst.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sett opp x- og y-likevekt på knuten. Sammenlign T_1 og T_2 fra horisontal-likningen.</p> },
      { label: "Hint 2", content: <p>Strammest tau bryter først, så sett T_1 = T_max = 5000 N. Beregn T_2 og w.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tauet som er nærmest vertikalt (60°) bærer mest vekt — det er &laquo;strammet inn&raquo;.</p>
        <Step n={1} title="Forhold mellom T_1 og T_2">
          <FormulaBox latex="T_1\cos 60°=T_2\cos 40°" />
          <FormulaBox latex="T_1=T_2\cdot \dfrac{\cos 40°}{\cos 60°}=T_2\cdot \dfrac{0{,}766}{0{,}500}=1{,}532\,T_2" />
          <p className="text-xs">→ T_1 er det største, så det går først i stykker.</p>
        </Step>
        <Step n={2} title="(b) Sett T_1 = T_max">
          <FormulaBox latex="T_1=5000\;\text{N}\Rightarrow T_2=\dfrac{5000}{1{,}532}=3263\;\text{N}" />
        </Step>
        <Step n={3} title="Vertikal balanse → maks vekt">
          <FormulaBox latex="w=T_1\sin 60°+T_2\sin 40°=5000(0{,}866)+3263(0{,}643)" />
          <FormulaBox latex="w=4330+2098" />
          <FormulaBox variant="gold" latex="w_\text{maks}\approx 6{,}43\;\text{kN}" />
        </Step>
        <Pitfall>
          <strong>Det er IKKE bare å summere maks-spenninger.</strong> Hvis du satte T_1 = T_2 = 5000 N,
          ville knuten ikke vært i likevekt — horisontal-balanse ville sviktet. Begrensningen er på det strammeste tauet.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: tauet som peker mer oppover gjør mest vertikalt arbeid. Et mer vannrett
          tau har stor horisontal-komponent og lite til å holde vekten — derfor må det andre tauet «overkompensere».
        </p>
      </div>
    ),
    summary: <p>Strammeste tau bryter først — sett T_max der og løs.</p>,
  },

  "5.60": {
    title: "Arkeolog krysser rep mellom klipper (Fig P5.60)",
    difficulty: "vanskelig",
    pageRef: "s. 192",
    problem: (
      <p>
        Eventyr­lysten arkeolog krysser mellom klipper. Stopper midt i reip. T_max=2,10×10⁴ N. m=91,2 kg.
        (a) Spenning ved θ=10°? (b) Min θ?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: <InlineLatex latex="m=91{,}2\;\text{kg}" /></li>
        <li>Maks spenning: <InlineLatex latex="T_\text{max}=2{,}10\times 10^4\;\text{N}" /></li>
        <li>Personen er midt på tauet</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Spenning ved θ = 10°</li>
        <li>(b) Min vinkel θ uten å brekke tauet</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Symmetrisk knutepunkt midt på rep">
          <p>Personen henger midt på tauet, så begge sider har samme vinkel θ med horisontalen.</p>
          <p className="mb-1">Vertikal balanse:</p>
          <FormulaBox variant="gold" latex="2T\sin\theta=mg" />
          <p className="mt-1">Horisontal balanse er automatisk pga. symmetri.</p>
        </TheoryBox>
        <TheoryBox title="Spenning vs vinkel">
          <FormulaBox variant="gold" latex="T=\dfrac{mg}{2\sin\theta}" />
          <p className="text-xs">Liten θ (stramt rep) → stor T. T → ∞ når θ → 0.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Begge sider av tauet har samme spenning (symmetri). Vertikal balanse: 2T sin θ = mg.</p> },
      { label: "Hint 2", content: <p>For min θ: sett T = T_max og løs for sin θ.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Klassisk &laquo;mann i tau-mid&raquo;-oppgave: jo strammere reip, desto større spenning.</p>
        <Step n={1} title="(a) Spenning ved θ = 10°">
          <FormulaBox latex="T=\dfrac{mg}{2\sin\theta}=\dfrac{(91{,}2)(9{,}80)}{2\sin 10°}" />
          <FormulaBox latex="T=\dfrac{893{,}8}{2(0{,}1736)}=\dfrac{893{,}8}{0{,}347}" />
          <FormulaBox variant="gold" latex="T\approx 2575\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Min vinkel">
          <FormulaBox latex="T_\text{max}=\dfrac{mg}{2\sin\theta_\text{min}}\Rightarrow \sin\theta_\text{min}=\dfrac{mg}{2T_\text{max}}" />
          <FormulaBox latex="\sin\theta_\text{min}=\dfrac{893{,}8}{2(21000)}=0{,}02128" />
          <FormulaBox variant="gold" latex="\theta_\text{min}\approx 1{,}22°" />
        </Step>
        <Pitfall>
          <strong>Et &laquo;helt rett&raquo; tau er fysisk umulig.</strong> Det må alltid bøye seg ned for
          å støtte vekten — og jo mindre bøy, desto større spenning. Ved θ → 0 går T → ∞.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 1,22° er svært lite. Hvis arkeologen vil ha mindre &laquo;dropp&raquo;, må tauet være
          ekstremt sterkt. Klatretau er ofte 20+ kN sterke for nettopp denne grunnen.
        </p>
      </div>
    ),
    summary: <p>Strammere rep ⇒ mindre vinkel ⇒ større spenning (T = mg/(2 sin θ)).</p>,
  },

  "5.62": {
    title: "Trinser løfter vekt (Fig P5.62)",
    difficulty: "middels",
    pageRef: "s. 192",
    problem: (
      <p>
        I Fig. P5.62 løfter en arbeider en vekt w ved å dra ned i et tau med kraft <InlineLatex latex="\vec F" />.
        Den øvre trinsa er festet til taket via en kjede, og den nedre trinsa er festet til vekten.
        Finn spenningen i hver kjede og størrelsen til <InlineLatex latex="\vec F" /> i form av w.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>To-trinse-system (en festet i taket, en på vekten)</li>
        <li>Hengende vekt w</li>
        <li>Statisk likevekt</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kraften F arbeideren må dra med</li>
        <li>Spenning i øvre og nedre kjede</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Mekanisk fordel via trinse-system">
          <p>Tauet har samme spenning (= F) i alle segmenter. Vekten henger fra nedre trinse, som har <strong>to tau-segmenter</strong> som støtter den.</p>
        </TheoryBox>
        <TheoryBox title="Nedre trinse-balanse">
          <p>Den nedre trinsa er i likevekt. Krefter:</p>
          <ul className="list-disc pl-5">
            <li>To tau-segmenter trekker oppover med F hver</li>
            <li>Kjede til vekten trekker nedover (med w)</li>
          </ul>
          <FormulaBox variant="gold" latex="2F=w\Rightarrow F=w/2" />
        </TheoryBox>
        <TheoryBox title="Øvre kjede må holde alt">
          <p>Øvre trinse holder: to tau-segmenter (F hver) ned og ett tau (F) ned mot arbeideren — totalt 3F.</p>
          <FormulaBox variant="gold" latex="T_\text{øvre}=3F=3w/2" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn FBD for nedre trinse. Hvor mange tau-segmenter trekker den opp?</p> },
      { label: "Hint 2", content: <p>Øvre trinse må støtte alt — to tau-segmenter ned + arbeiderens drag (også F) ned.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Nøkkelen er å analysere hvert trinse-knutepunkt for seg.</p>
        <Step n={1} title="Tau har samme spenning overalt">
          <p>Lett tau, friksjons­fri trinse → spenning = F i alle segmenter.</p>
        </Step>
        <Step n={2} title="Nedre trinse-likevekt → F">
          <FormulaBox latex="2F-w=0" />
          <FormulaBox variant="gold" latex="F=w/2" />
          <p className="text-xs">Mekanisk fordel: arbeideren drar med halvparten av vekten.</p>
        </Step>
        <Step n={3} title="Spenning i nedre kjede">
          <p>Nedre kjede holder vekten direkte:</p>
          <FormulaBox variant="gold" latex="T_\text{nedre}=w" />
        </Step>
        <Step n={4} title="Spenning i øvre kjede">
          <p>Øvre trinse må støtte: 2 tau-segmenter (1 til nedre trinse, 1 ned til arbeider) som hver har F = w/2:</p>
          <FormulaBox latex="T_\text{øvre}=3F=3(w/2)" />
          <FormulaBox variant="gold" latex="T_\text{øvre}=\dfrac{3w}{2}" />
        </Step>
        <Pitfall>
          <strong>Mekanisk fordel «refunderes» av lengre tau.</strong> Arbeideren drar halve kraften,
          men tauet må trekkes dobbelt så langt. Energi (= kraft × avstand) er bevart.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: jo flere trinse-segmenter på vekten, desto mindre kraft kreves — men proporsjonalt
          mer tau må dras. Båt-spil og kran-system bruker dette prinsippet.
        </p>
      </div>
    ),
    summary: <p>To-trinse: F = w/2; øvre kjede holder 3w/2.</p>,
  },

  "5.77": {
    title: "Blokk på skråning + henger (Fig P5.74)",
    difficulty: "vanskelig",
    pageRef: "s. 194",
    problem: (
      <p>
        Blokk m1 på skråplan med vinkel α. Koblet via snor over trinse til hengende m2. <InlineLatex latex="\mu_s,\mu_k" /> .
        (a) m2 for at m1 beveger opp planet med konstant fart? (b) m2 for at m1 beveger ned med konstant fart?
        (c) Hvilket område av m2 holder systemet i ro?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Skråplan med vinkel α</li>
        <li>Bordblokk m_1, hengende blokk m_2</li>
        <li>Friksjons­koeffisienter μ_s og μ_k</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) m_2 for konstant fart oppover</li>
        <li>(b) m_2 for konstant fart nedover</li>
        <li>(c) m_2-område for ro</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Friksjons­retning er motsatt bevegelse">
          <p>Friksjon på m_1 peker alltid <em>motsatt bevegelses­retning</em>:</p>
          <ul className="list-disc pl-5">
            <li>m_1 beveger seg opp → friksjon ned langs rampen → tyngens og friksjon mot T</li>
            <li>m_1 beveger seg ned → friksjon opp langs rampen → friksjon hjelper T</li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Konstant fart = likevekt">
          <p>For hengende blokk: <InlineLatex latex="m_2 g=T" />. For bordblokken langs rampen:</p>
          <FormulaBox latex="(a)\;T=m_1 g\sin\alpha+\mu_k m_1 g\cos\alpha" />
          <FormulaBox latex="(b)\;T=m_1 g\sin\alpha-\mu_k m_1 g\cos\alpha" />
          <FormulaBox variant="gold" latex="\Rightarrow m_2=m_1(\sin\alpha\pm\mu_k\cos\alpha)" />
        </TheoryBox>
        <TheoryBox title="Statisk område">
          <p>For ro: |T − m_1 g sin α| ≤ μ_s m_1 g cos α</p>
          <FormulaBox variant="gold" latex="m_1(\sin\alpha-\mu_s\cos\alpha)\leq m_2\leq m_1(\sin\alpha+\mu_s\cos\alpha)" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Beveger seg opp: friksjon hjelper tyngdens komponent ned, så m_2 må overvinne begge.</p> },
      { label: "Hint 2", content: <p>(c) For ro må statisk friksjon kunne balansere differansen mellom hengende vekt og rampevektens komponent.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tre scenarioer, tre forskjellige fortegns på friksjons­leddet.</p>
        <Step n={1} title="(a) m_1 opp med konstant fart">
          <p>Friksjon peker ned langs rampen (motsatt bevegelse). For m_1:</p>
          <FormulaBox latex="T=m_1 g\sin\alpha+\mu_k m_1 g\cos\alpha" />
          <p>For m_2: T = m_2 g, så:</p>
          <FormulaBox variant="gold" latex="m_2=m_1(\sin\alpha+\mu_k\cos\alpha)" />
        </Step>
        <Step n={2} title="(b) m_1 ned med konstant fart">
          <p>Friksjon peker opp langs rampen (motsatt bevegelse). For m_1:</p>
          <FormulaBox latex="m_1 g\sin\alpha=T+\mu_k m_1 g\cos\alpha" />
          <FormulaBox latex="T=m_1 g\sin\alpha-\mu_k m_1 g\cos\alpha" />
          <FormulaBox variant="gold" latex="m_2=m_1(\sin\alpha-\mu_k\cos\alpha)" />
        </Step>
        <Step n={3} title="(c) System i ro">
          <p>Statisk friksjon kan peke begge veier, opp til maks μ_s·N. Range:</p>
          <FormulaBox variant="gold" latex="m_1(\sin\alpha-\mu_s\cos\alpha)\leq m_2\leq m_1(\sin\alpha+\mu_s\cos\alpha)" />
        </Step>
        <Pitfall>
          <strong>Friksjons­fortegnet er bestemt av bevegelsesretningen, ikke av kreftene.</strong>{" "}
          Hvis du vet at m_1 sklir nedover, vet du at friksjon peker opp — uavhengig av hvor stor m_2 er.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: området i (c) er bredere enn (a) og (b) tilsvarer fordi μ_s &gt; μ_k.
          Det er en &laquo;dødssone&raquo; der systemet kan stå i ro selv om det ville bevege seg ved samme m_2 hvis det allerede var i bevegelse.
        </p>
      </div>
    ),
    summary: <p>Statisk friksjon gir et område for ro; kinetisk friksjon gir to spesifikke verdier.</p>,
  },

  "5.79": {
    title: "Blokk A på blokk B (Fig P5.79)",
    difficulty: "vanskelig",
    pageRef: "s. 194",
    problem: (
      <p>
        Blokk A 1,20 N på blokk B 3,60 N. <InlineLatex latex="\mu_k=0{,}300" /> mellom alle flater.
        F som drar B mot venstre med konstant fart hvis (a) A hviler på B (beveger med), (b) A holdes fast?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>W_A = 1,20 N (blokk A på toppen)</li>
        <li>W_B = 3,60 N (blokk B på gulvet)</li>
        <li>μ_k = 0,300 mellom alle flater</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) F når A beveger seg sammen med B</li>
        <li>(b) F når A holdes fast (B sklir under)</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="(a) A og B beveger seg sammen">
          <p>Ingen relativ bevegelse mellom A og B → ingen kinetisk friksjon mellom dem. Eneste friksjon er B mot gulv:</p>
          <FormulaBox latex="N_\text{gulv}=W_A+W_B" />
          <FormulaBox variant="gold" latex="F=\mu_k(W_A+W_B)" />
        </TheoryBox>
        <TheoryBox title="(b) A holdes fast">
          <p>Nå er det relativ bevegelse mellom A og B → friksjon mellom dem. To friksjons­krefter på B:</p>
          <ul className="list-disc pl-5">
            <li>μ_k·W_A fra A (på toppen)</li>
            <li>μ_k·(W_A + W_B) fra gulvet (under)</li>
          </ul>
          <FormulaBox variant="gold" latex="F=\mu_k W_A+\mu_k(W_A+W_B)" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) Når de beveger seg sammen, er det ingen friksjon mellom A og B. Tenk på dem som én blokk.</p> },
      { label: "Hint 2", content: <p>(b) Friksjon på A's underside og B's underside er begge til stede. Begge avhenger av normal-vektene.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Forskjellen er om det finnes relativ bevegelse mellom A og B.</p>
        <Step n={1} title="(a) A beveger seg med B">
          <p>Behandle som en samlet vekt W_A + W_B = 4,80 N. Bare gulv-friksjon:</p>
          <FormulaBox latex="F=\mu_k(W_A+W_B)=0{,}300(4{,}80)" />
          <FormulaBox variant="gold" latex="F\approx 1{,}44\;\text{N}" />
        </Step>
        <Step n={2} title="(b) A holdes fast, B sklir under">
          <p>To friksjons­krefter virker på B i samme retning (mot bevegelse):</p>
          <FormulaBox latex="f_1=\mu_k W_A=0{,}300(1{,}20)=0{,}36\;\text{N}\;(\text{fra A})" />
          <FormulaBox latex="f_2=\mu_k(W_A+W_B)=0{,}300(4{,}80)=1{,}44\;\text{N}\;(\text{fra gulv})" />
          <FormulaBox latex="F=f_1+f_2=0{,}36+1{,}44" />
          <FormulaBox variant="gold" latex="F\approx 1{,}80\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Glem ikke at A presser ned på B</strong> — det øker normal­kraften på gulvet uavhengig
          av om A er holdt eller flyttes med. Forskjellen er om A's underside har relativ bevegelse mot B.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: når A holdes fast, opplever B 25% mer friksjon. I praksis bruker man ofte denne
          metoden for &laquo;å parkere&raquo; en stabel uten å trenge ekstra grep — bare hold den øverste.
        </p>
      </div>
    ),
    summary: <p>Holdt blokk over: dobbelt friksjons­bidrag (toppgrense + gulvgrense).</p>,
  },

  "5.90": {
    title: "To blokker på skrå­plan med trinse (Fig P5.90)",
    difficulty: "vanskelig",
    pageRef: "s. 195",
    problem: (
      <p>
        100 kg på 30°-rampe, 50 kg på 53,1°-rampe, friksjons­frie. (a) Retning ved slipp? (b) Akselerasjon?
        (c) Spenning?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>m_1 = 100 kg på 30°-rampe</li>
        <li>m_2 = 50 kg på 53,1°-rampe</li>
        <li>Friksjons­frie ramper, koblet via trinse på toppen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Bevegelses­retning</li>
        <li>(b) Akselerasjon a</li>
        <li>(c) Spenning T</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Hvilken side dominerer?">
          <p>Sammenlign tyngdens komponenter langs hver rampe:</p>
          <FormulaBox latex="F_1=m_1 g\sin\alpha_1\;\text{vs}\;F_2=m_2 g\sin\alpha_2" />
          <p className="text-xs">Den større trekker den andre.</p>
        </TheoryBox>
        <TheoryBox title="Newton 2 for koblet system">
          <p className="mb-1">Hvis m_1 går ned, m_2 går opp (samme |a|):</p>
          <ul className="list-disc pl-5">
            <li>m_1: <InlineLatex latex="m_1 g\sin\alpha_1-T=m_1 a" /></li>
            <li>m_2: <InlineLatex latex="T-m_2 g\sin\alpha_2=m_2 a" /></li>
          </ul>
          <FormulaBox variant="gold" latex="a=\dfrac{m_1 g\sin\alpha_1-m_2 g\sin\alpha_2}{m_1+m_2}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Beregn mg sin α for begge sider. Den større «vinner».</p> },
      { label: "Hint 2", content: <p>Adder Newton 2 for begge for å eliminere T.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Mer masse, men mindre vinkel — vil den dominere?</p>
        <Step n={1} title="Sammenligne tyngde-komponenter">
          <FormulaBox latex="m_1 g\sin 30°=100(9{,}80)(0{,}5)=490\;\text{N}" />
          <FormulaBox latex="m_2 g\sin 53{,}1°=50(9{,}80)(0{,}7997)=391\;\text{N}" />
          <p>490 &gt; 391 → m_1-siden vinner: m_1 går ned, m_2 går opp.</p>
        </Step>
        <Step n={2} title="(b) Akselerasjon">
          <FormulaBox latex="a=\dfrac{490-391}{m_1+m_2}=\dfrac{99}{150}" />
          <FormulaBox variant="gold" latex="a\approx 0{,}66\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(c) Spenning">
          <p>Bruk Newton 2 for m_2:</p>
          <FormulaBox latex="T=m_2(g\sin\alpha_2+a)=50(9{,}80\cdot 0{,}7997+0{,}66)" />
          <FormulaBox latex="T=50(7{,}82+0{,}66)=50(8{,}48)" />
          <FormulaBox variant="gold" latex="T\approx 424\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Stor masse er ikke alltid det viktigste.</strong> En liten masse på en bratt rampe
          kan ha større tyngde-komponent enn en stor masse på en slak rampe — sjekk alltid mg sin α, ikke bare m.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: m_1 er dobbelt så tung men bare på en relativt slakk rampe. m_2 er halvparten,
          men på en mye brattere. Likevel vinner m_1 fordi 100·0,5 &gt; 50·0,8.
        </p>
      </div>
    ),
    summary: <p>Tyngste tyngde-komponent (mg sin α) vinner.</p>,
  },

  "5.101": {
    title: "Banket sving — maks fart",
    difficulty: "vanskelig",
    pageRef: "s. 196",
    problem: (
      <p>
        R=90,0 m, banket 18,0°, μs=0,400, m=1200 kg. Maks fart uten å skli. (a) Normal­kraft?
        (b) Radial akselerasjon? (c) Fart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Radius: R = 90,0 m</li>
        <li>Banket: β = 18,0°</li>
        <li>Statisk friksjon: μ_s = 0,400</li>
        <li>Masse: m = 1200 kg</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Normalkraft N</li>
        <li>(b) Radial akselerasjon</li>
        <li>(c) Maks fart</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Banket sving — maks fart-tilfellet">
          <p>Ved maks fart vil bilen skli <em>oppover</em> (utover banket), så friksjon peker <em>ned</em> langs banket.</p>
          <p className="mb-1">To krefter virker: N vinkelrett ut av flaten, friksjon nedover langs flaten:</p>
          <ul className="list-disc pl-5">
            <li>Vertikal: <InlineLatex latex="N\cos\beta-\mu N\sin\beta-mg=0" /></li>
            <li>Radial: <InlineLatex latex="N\sin\beta+\mu N\cos\beta=ma_\text{rad}" /></li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Resultater">
          <FormulaBox variant="gold" latex="N=\dfrac{mg}{\cos\beta-\mu\sin\beta}" />
          <FormulaBox variant="gold" latex="v_\text{maks}=\sqrt{Rg\dfrac{\sin\beta+\mu\cos\beta}{\cos\beta-\mu\sin\beta}}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Ved maks fart sklir bilen utover (oppover banket). Friksjon peker derfor inn/ned langs banket.</p> },
      { label: "Hint 2", content: <p>Sett opp Newton 2 langs vertikal og radial. To likninger, to ukjente (N og v).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Bank-vinkelen og friksjon jobber sammen for å holde bilen i sirkelen.</p>
        <Step n={1} title="Vertikal balanse → N">
          <FormulaBox latex="N\cos\beta-\mu N\sin\beta=mg" />
          <FormulaBox latex="N(\cos\beta-\mu\sin\beta)=mg" />
          <FormulaBox latex="N=\dfrac{(1200)(9{,}80)}{\cos 18°-0{,}4\sin 18°}=\dfrac{11760}{0{,}951-0{,}124}=\dfrac{11760}{0{,}827}" />
          <FormulaBox variant="gold" latex="N\approx 14{,}2\;\text{kN}" />
        </Step>
        <Step n={2} title="Radial balanse → akselerasjon">
          <FormulaBox latex="ma_\text{rad}=N\sin\beta+\mu N\cos\beta=N(\sin\beta+\mu\cos\beta)" />
          <FormulaBox latex="ma_\text{rad}=14213(\sin 18°+0{,}4\cos 18°)=14213(0{,}309+0{,}380)" />
          <FormulaBox latex="ma_\text{rad}=14213(0{,}689)=9799\;\text{N}" />
          <FormulaBox variant="gold" latex="a_\text{rad}\approx 8{,}17\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="Maks fart">
          <FormulaBox latex="v=\sqrt{a_\text{rad}\cdot R}=\sqrt{8{,}17\cdot 90}" />
          <FormulaBox variant="gold" latex="v\approx 27{,}1\;\text{m/s}\;(\approx 97\;\text{km/t})" />
        </Step>
        <Pitfall>
          <strong>Friksjons­retningen er kritisk.</strong> Ved maks fart sklir man utover, så friksjon
          peker ned langs banket. Ved min fart (oppgave 5.102) sklir man innover, så friksjon peker oppover.
          Bytt fortegnet på μ.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: banket sving + friksjon kan tillate ca. 97 km/t. Uten banket (μ alene)
          ville maks fart bare vært ca. 60 km/t. Banket gjør stor forskjell.
        </p>
      </div>
    ),
    summary: <p>Banket sving + friksjon: maks fart fra to-likning-system.</p>,
  },

  "5.102": {
    title: "Banket sving — min fart",
    difficulty: "vanskelig",
    pageRef: "s. 196",
    problem: (
      <p>
        R=120 m, banket 18°, μs=0,300, m=900 kg. Min fart uten glidning ned bankingen.
        (a) Normal­kraft? (b) Fart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>R = 120 m, β = 18°</li>
        <li>μ_s = 0,300, m = 900 kg</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Normalkraft N</li>
        <li>(b) Min fart v_min</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Banket sving — min fart-tilfellet">
          <p>Ved <em>min</em> fart vil bilen skli <em>nedover</em> banket (innover). Friksjon peker da <em>oppover</em> langs banket (mot glidning).</p>
          <p className="mb-1">Newton 2 (med μ med motsatt fortegn enn ved maks):</p>
          <ul className="list-disc pl-5">
            <li>Vertikal: <InlineLatex latex="N\cos\beta+\mu N\sin\beta-mg=0" /></li>
            <li>Radial: <InlineLatex latex="N\sin\beta-\mu N\cos\beta=ma_\text{rad}" /></li>
          </ul>
        </TheoryBox>
        <TheoryBox title="Resultater">
          <FormulaBox variant="gold" latex="N=\dfrac{mg}{\cos\beta+\mu\sin\beta}" />
          <FormulaBox variant="gold" latex="v_\text{min}=\sqrt{Rg\dfrac{\sin\beta-\mu\cos\beta}{\cos\beta+\mu\sin\beta}}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Ved min fart sklir bilen ned banket. Friksjon hjelper til ved å peke oppover langs banket.</p> },
      { label: "Hint 2", content: <p>Bytt fortegn på μ-leddet sammenlignet med maks-fart-oppgaven.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Speilbilde av maks-fart-tilfellet — friksjon peker oppover banket.</p>
        <Step n={1} title="Vertikal balanse → N">
          <FormulaBox latex="N\cos\beta+\mu N\sin\beta=mg" />
          <FormulaBox latex="N=\dfrac{(900)(9{,}80)}{\cos 18°+0{,}3\sin 18°}=\dfrac{8820}{0{,}951+0{,}0927}=\dfrac{8820}{1{,}0438}" />
          <FormulaBox variant="gold" latex="N\approx 8{,}45\;\text{kN}" />
        </Step>
        <Step n={2} title="Radial balanse → akselerasjon">
          <FormulaBox latex="ma_\text{rad}=N(\sin\beta-\mu\cos\beta)=8451(\sin 18°-0{,}3\cos 18°)" />
          <FormulaBox latex="ma_\text{rad}=8451(0{,}309-0{,}285)=8451(0{,}024)=203\;\text{N}" />
          <FormulaBox latex="a_\text{rad}\approx 0{,}226\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(b) Min fart">
          <FormulaBox latex="v=\sqrt{a_\text{rad}\cdot R}=\sqrt{0{,}226\cdot 120}=\sqrt{27{,}1}" />
          <FormulaBox variant="gold" latex="v_\text{min}\approx 5{,}21\;\text{m/s}\;(\approx 18{,}8\;\text{km/t})" />
        </Step>
        <Pitfall>
          <strong>Min-fart kan være null eller imaginær</strong> hvis friksjon er stor nok til å holde
          bilen i ro selv ved v=0. I så fall er det ingen «minimum» — du kan stoppe i banket. Her er
          tan β &gt; μ, så vi får en positiv min-fart.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: min-farten er liten (5 m/s) fordi banket og friksjon hjelper hverandre. På
          bratt banket og høy μ kan minimum bli negativ matematisk (= bilen sklir ikke selv om den står stille).
        </p>
      </div>
    ),
    summary: <p>Min fart: friksjon peker oppover (mot glidning ned).</p>,
  },

  "5.106": {
    title: "Kasse opp og ned skrå­plan med friksjon",
    difficulty: "vanskelig",
    pageRef: "s. 196",
    problem: (
      <p>
        Kasse m i bunn av rampe vinkel α. Initial v0 opp. Reiser d, glir ned igjen. Returnerer med fart v0/2.
        Hva er μk?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Initial fart v_0 opp langs rampen</li>
        <li>Slutt-fart v_0/2 i bunnen (kommet tilbake)</li>
        <li>Vinkel α, masse m</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kinetisk friksjons­koeffisient μ_k</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To faser med ulik akselerasjon">
          <p className="mb-1">Opp: tyngde og friksjon begge mot bevegelse:</p>
          <FormulaBox latex="a_\text{opp}=g(\sin\alpha+\mu_k\cos\alpha)\;(\text{retardasjon})" />
          <p className="mb-1 mt-2">Ned: tyngde drar, friksjon bremser:</p>
          <FormulaBox latex="a_\text{ned}=g(\sin\alpha-\mu_k\cos\alpha)\;(\text{akselerasjon})" />
        </TheoryBox>
        <TheoryBox title="Avstanden er den samme begge veier">
          <p>v_0² = 2 a_opp · d og (v_0/2)² = 2 a_ned · d. Del de to:</p>
          <FormulaBox variant="gold" latex="\dfrac{a_\text{ned}}{a_\text{opp}}=\dfrac{(v_0/2)^2}{v_0^2}=\dfrac{1}{4}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bruk v² = 2ad for hver fase. Avstanden d er den samme begge veier.</p> },
      { label: "Hint 2", content: <p>Forholdet a_ned/a_opp = (v_0/2)²/v_0² = 1/4. Sett opp ligning og løs for μ_k.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi-tap er likt begge veier (samme avstand), men starthastighet og slutthastighet er forskjellige.</p>
        <Step n={1} title="Sett opp ratio">
          <FormulaBox latex="\dfrac{a_\text{ned}}{a_\text{opp}}=\dfrac{g(\sin\alpha-\mu_k\cos\alpha)}{g(\sin\alpha+\mu_k\cos\alpha)}=\dfrac{1}{4}" />
        </Step>
        <Step n={2} title="Løs for μ_k">
          <FormulaBox latex="4(\sin\alpha-\mu_k\cos\alpha)=\sin\alpha+\mu_k\cos\alpha" />
          <FormulaBox latex="4\sin\alpha-4\mu_k\cos\alpha=\sin\alpha+\mu_k\cos\alpha" />
          <FormulaBox latex="3\sin\alpha=5\mu_k\cos\alpha" />
          <FormulaBox variant="gold" latex="\mu_k=\dfrac{3}{5}\tan\alpha=0{,}6\tan\alpha" />
        </Step>
        <Pitfall>
          <strong>Pass på fortegn for friksjon i hver fase.</strong> Friksjon peker alltid mot bevegelse,
          så den «hjelper» tyngden på vei opp (begge mot bevegelses­retningen) og «motarbeider» tyngden på vei ned.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: hvis det ikke var friksjon (μ_k=0), ville kassen returnert med samme v_0
          fra konservering av energi. Friksjon stjeler 75% av kinetisk energi (1 − (1/2)² = 3/4).
        </p>
      </div>
    ),
    summary: <p>Friksjon spiser energi i begge retninger; ratio av slutt-til-start v gir μ.</p>,
  },

  "5.108": {
    title: "Gina i sirkelvegg på motorsykkel",
    difficulty: "vanskelig",
    pageRef: "s. 196",
    problem: (
      <p>
        Vertikal sirkel R=14,2 m. m=68+40=108 kg. (a) Min fart på topp? (b) På bunnen er fart 2× (a). N?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Sirkel-radius: R = 14,2 m</li>
        <li>Total masse (Gina + motorsykkel): m = 108 kg</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Min fart på toppen</li>
        <li>(b) Normalkraft i bunnen ved 2× min-fart</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Min fart på toppen — N kan ikke være negativ">
          <p>På toppen peker både N (sporet trykker ned) og mg (tyngde) ned. Ved min-fart blir N → 0:</p>
          <FormulaBox latex="N+mg=\dfrac{mv^2}{R};\;N=0\Rightarrow v_\text{min}^2=gR" />
          <FormulaBox variant="gold" latex="v_\text{min}=\sqrt{gR}" />
        </TheoryBox>
        <TheoryBox title="N i bunnen">
          <p>I bunnen peker N opp, mg ned. Sentripetal-akselerasjon peker opp:</p>
          <FormulaBox variant="gold" latex="N=m\left(g+\dfrac{v^2}{R}\right)" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>(a) På toppen er det &laquo;tipping point&raquo; når sporet bare så vidt rører motorsykkelen, dvs. N = 0.</p> },
      { label: "Hint 2", content: <p>(b) Fart i bunnen er 2× min-fart fra (a). Bruk N = m(g + v²/R).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Klassisk sirkelvegg-stunt.</p>
        <Step n={1} title="(a) Min fart på toppen">
          <FormulaBox latex="v_\text{min}=\sqrt{gR}=\sqrt{(9{,}80)(14{,}2)}=\sqrt{139{,}2}" />
          <FormulaBox variant="gold" latex="v_\text{min}\approx 11{,}8\;\text{m/s}" />
        </Step>
        <Step n={2} title="Fart i bunnen">
          <FormulaBox latex="v_\text{bunn}=2\,v_\text{min}=23{,}6\;\text{m/s}" />
          <p>(Merk: hvis det var samme stunt med energi­bevaring, ville v_bunn ≠ 2v_topp; problemet sier eksplisitt at v_bunn = 2v_topp.)</p>
        </Step>
        <Step n={3} title="(b) Normalkraft i bunnen">
          <FormulaBox latex="N=m\left(g+\dfrac{v^2}{R}\right)=108\left(9{,}80+\dfrac{(23{,}6)^2}{14{,}2}\right)" />
          <FormulaBox latex="N=108(9{,}80+39{,}22)=108(49{,}02)" />
          <FormulaBox variant="gold" latex="N\approx 5294\;\text{N}\approx 5\,W" />
        </Step>
        <Pitfall>
          <strong>v_min er ikke null på toppen.</strong> Hvis du går saktere enn √(gR), kan ikke
          sentripetal-kraften leveres av tyngden alene — motorsykkelen faller. Dette er kjernen i
          &laquo;Loop the Loop&raquo;-stunts.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: i bunnen føler Gina 5× sin egen vekt presset inn i setet. Total reaksjonskraft
          er 5294 N — over et halvt tonn ned i sykkelen.
        </p>
      </div>
    ),
    summary: <p>Vertikal sirkel: v_min,topp = √(gR); bunn har maks N.</p>,
  },
};
