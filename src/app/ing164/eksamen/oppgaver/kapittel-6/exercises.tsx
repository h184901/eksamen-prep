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
// OPPGAVESAMLING — KAPITTEL 6 (matcher University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  "6.1": {
    title: "Arbeid på fysikkbok som glir på bord",
    difficulty: "lett",
    pageRef: "s. 221",
    problem: (
      <p>
        Du skyver fysikk­boken din 1,10 m langs et horisontalt bord med en horisontal kraft 3,00 N
        mens den motstående friksjons­kraften er 0,700 N. Hvor mye arbeid utfører hver av kreftene
        på boken: (a) ditt 3,00 N skyv, (b) friksjons­kraften, (c) normal­kraften fra bordet, og
        (d) gravitasjon? (e) Hva er total­arbeidet på boken?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Anvendt kraft: F = 3,00 N (horisontal)</li>
        <li>Friksjon: f = 0,700 N (motsatt bevegelse)</li>
        <li>Forflytning: d = 1,10 m (horisontal)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid utført av fire krefter (skyv, friksjon, normal, gravitasjon)</li>
        <li>Total arbeid</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeids-definisjon">
          <FormulaBox variant="gold" latex="W=Fd\cos\theta" />
          <p className="text-xs">θ = vinkel mellom kraft og forflytning.</p>
        </TheoryBox>
        <TheoryBox title="Vinkelrett kraft = null arbeid">
          <p>Når kraften er vinkelrett på bevegelsen (θ = 90°, cos = 0), gjør kraften ikke noe arbeid — uansett hvor stor den er.</p>
          <p className="text-xs mt-1">Dette gjelder normal­kraft og tyngde for horisontal bevegelse.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Skyv og friksjon er begge horisontale, men motsatt rettet. Tegn kreftene.</p> },
      { label: "Hint 2", content: <p>Normal­kraft og tyngde er vertikale; bevegelsen er horisontal → cos 90° = 0.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Hver kraft gir et arbeids­bidrag — beregnet uavhengig.</p>
        <Step n={1} title="(a) Arbeid av skyv">
          <FormulaBox latex="W_\text{skyv}=Fd\cos 0°=(3{,}00)(1{,}10)" />
          <FormulaBox variant="gold" latex="W_\text{skyv}=+3{,}30\;\text{J}" />
        </Step>
        <Step n={2} title="(b) Arbeid av friksjon">
          <p>Friksjon peker motsatt forflytningen (θ = 180°, cos = −1):</p>
          <FormulaBox latex="W_f=fd\cos 180°=-(0{,}700)(1{,}10)" />
          <FormulaBox variant="gold" latex="W_f=-0{,}770\;\text{J}" />
        </Step>
        <Step n={3} title="(c, d) Normal og tyngde">
          <p>Begge er vinkelrette på bevegelsen:</p>
          <FormulaBox variant="gold" latex="W_n=W_g=0" />
        </Step>
        <Step n={4} title="(e) Total arbeid">
          <FormulaBox latex="W_\text{tot}=3{,}30-0{,}770+0+0" />
          <FormulaBox variant="gold" latex="W_\text{tot}\approx +2{,}53\;\text{J}" />
        </Step>
        <Pitfall>
          <strong>Vinkelen er målt mellom kraft­vektor og bevegelsesretning.</strong> Mange mister
          fortegnet på friksjons­arbeid (cos 180° = −1, ikke 0). Glem ikke negativt fortegn.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: positivt total­arbeid betyr at boken får økt kinetisk energi. Hvis du
          akselererte (ikke konstant fart), gir 2,53 J = ½·m·Δv².
        </p>
      </div>
    ),
    summary: <p>W = Fd cos θ. Vinkelrette krefter gir null arbeid.</p>,
  },

  "6.2": {
    title: "Tau-truck drar bil",
    difficulty: "middels",
    pageRef: "s. 221",
    problem: (
      <p>
        Med et tau med spenning 1350 N drar en tau-truck en bil 5,00 km langs en motorvei. (a) Hvor
        mye arbeid utfører kabelen på bilen hvis den drar horisontalt? Hvis den drar i 35,0° over
        horisontalen? (b) Hvor mye arbeid utfører kabelen på tau-trucken i begge tilfeller i (a)?
        (c) Hvor mye arbeid utfører gravitasjon på bilen i (a)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Tau­spenning: T = 1350 N</li>
        <li>Forflytning: d = 5,00 km = 5000 m mot forflytnings­retning</li>
        <li>Vinkel for tilfelle (ii): 35,0° over horisontalen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Arbeid på bilen, horisontalt og ved 35°</li>
        <li>(b) Arbeid på tau­trucken, begge tilfeller</li>
        <li>(c) Gravitasjons­arbeid på bilen</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid med vinkel">
          <FormulaBox variant="gold" latex="W=Fd\cos\theta" />
          <p className="text-xs">Bare komponenten av F langs forflytningen gjør arbeid.</p>
        </TheoryBox>
        <TheoryBox title="Newtons tredje lov og arbeid">
          <p>Tauet drar bilen fremover; ved Newton 3 drar bilen tauet (og dermed trucken) bakover med samme størrelse. Trucken beveger seg fremover, så kraften virker motsatt forflytning ⇒ negativt arbeid på trucken.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For 35°-tilfellet er det fortsatt samme avstand d, men bare cos 35°-komponenten av spenningen virker langs bevegelsen.</p> },
      { label: "Hint 2", content: <p>Selv om kreftene har samme størrelse, har "kraften fra bil på truck" og "kraften fra truck på bil" motsatt retning — så arbeidet endrer fortegn.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Vi bruker <InlineLatex latex="W=Fd\cos\theta" /> i alle delene og bruker fortegns­logikk for tau­truckens arbeid.</p>
        <Step n={1} title="(a) Arbeid på bilen — horisontalt drag">
          <FormulaBox latex="W=1350\cdot 5000\cdot\cos 0°=6{,}75\times 10^{6}\;\text{J}" />
        </Step>
        <Step n={2} title="(a) Arbeid på bilen — drag i 35°">
          <FormulaBox latex="W=1350\cdot 5000\cdot\cos 35°=6{,}75\times 10^{6}\cdot 0{,}819=5{,}53\times 10^{6}\;\text{J}" />
        </Step>
        <Step n={3} title="(b) Arbeid på tau­trucken">
          <p>Newton 3: tauet drar trucken bakover med 1350 N, men trucken beveger seg fremover. Vinkelen mellom kraft og forflytning er 180° i begge tilfeller på trucken (cos 180° = −1).</p>
          <FormulaBox latex="W_\text{horisontal}=-6{,}75\times 10^{6}\;\text{J}" />
          <FormulaBox latex="W_{35°}=-5{,}53\times 10^{6}\;\text{J}" />
        </Step>
        <Step n={4} title="(c) Gravitasjons­arbeid på bilen">
          <p>Gravitasjon peker rett ned, bilen beveger seg horisontalt. Vinkelen mellom dem er 90°, og cos 90° = 0.</p>
          <FormulaBox latex="W_g=mg\cdot d\cos 90°=0" />
          <FormulaBox variant="gold" latex="(a)\,6{,}75/5{,}53\times 10^{6}\;\text{J};\;(b)\,-6{,}75/-5{,}53\times 10^{6}\;\text{J};\;(c)\,0" />
        </Step>
        <Pitfall>
          <strong>Newton 3-arbeid er IKKE alltid likt og motsatt!</strong> Bare når begge objekter har samme forflytning. Generelt har de ulik forflytning og dermed ulikt arbeid. Her tilfeldigvis samme d ⇒ likt størrelses­messig, motsatt fortegn.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Arbeid er retnings­avhengig — å vinkle tauet 35° gir 18 % mindre arbeid for samme spenning, men kan være nødvendig for praktiske grunner. Gravitasjon gjør null arbeid på horisontal kjøring fordi kraften står vinkelrett på veien.
        </p>
      </div>
    ),
    summary: <p>W = Fd cos θ — bare komponenten langs bevegelsen teller. Newton 3 gir motsatt fortegn på arbeid når begge har samme forflytning.</p>,
  },

  "6.3": {
    title: "Fabrikkarbeider drar 30 kg kasse",
    difficulty: "middels",
    pageRef: "s. 221",
    problem: (
      <p>
        En fabrikkarbeider skyver en 30,0 kg kasse en distanse 4,5 m langs et horisontalt gulv ved
        konstant fart ved å skyve horisontalt på den. <InlineLatex latex="\mu_k=0{,}25" />.
        (a) Hvor stor kraft må arbeideren bruke? (b) Arbeid F gjør? (c) Arbeid friksjon? (d) Arbeid
        normal? (e) Arbeid gravitasjon? (f) Total arbeid?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: m = 30,0 kg</li>
        <li>Forflytning: d = 4,5 m horisontalt</li>
        <li>Kinetisk friksjons­koeffisient: μ<sub>k</sub> = 0,25</li>
        <li>Konstant fart ⇒ akselerasjon = 0</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Anvendt kraft F</li>
        <li>(b–e) Arbeid utført av F, friksjon, normal­kraft, tyngde</li>
        <li>(f) Total arbeid på kassen</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Konstant fart ⇒ ΣF = 0">
          <p>Når kassen beveger seg med konstant fart, må horisontal netto­kraft være null: anvendt kraft = friksjons­kraft.</p>
          <FormulaBox variant="gold" latex="F=f_k=\mu_k N=\mu_k mg" />
        </TheoryBox>
        <TheoryBox title="Arbeid-energi-teoremet">
          <FormulaBox variant="gold" latex="W_\text{tot}=\Delta K=0\;\text{(konstant fart)}" />
          <p className="text-xs">Sjekk: W_F + W_f + W_n + W_g skal bli null.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Normal­kraften på horisontalt gulv er N = mg fordi det er ingen vertikal akselerasjon.</p> },
      { label: "Hint 2", content: <p>Friksjon virker motsatt bevegelse ⇒ vinkelen mellom friksjon og forflytning er 180°, så friksjons­arbeid er negativt.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Konstant fart gir oss F via Newton 2, deretter beregner vi arbeid for hver kraft.</p>
        <Step n={1} title="(a) Anvendt kraft">
          <FormulaBox latex="F=\mu_k mg=0{,}25(30{,}0)(9{,}80)=73{,}5\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Arbeid av F">
          <FormulaBox latex="W_F=Fd\cos 0°=73{,}5(4{,}5)=+331\;\text{J}" />
        </Step>
        <Step n={3} title="(c) Arbeid av friksjon">
          <FormulaBox latex="W_f=-f_k\cdot d=-73{,}5(4{,}5)=-331\;\text{J}" />
        </Step>
        <Step n={4} title="(d, e) Arbeid av normal og tyngde">
          <p>Begge står vinkelrett på horisontal forflytning ⇒ cos 90° = 0.</p>
          <FormulaBox latex="W_n=0,\quad W_g=0" />
        </Step>
        <Step n={5} title="(f) Total arbeid">
          <FormulaBox latex="W_\text{tot}=331-331+0+0=0" />
          <FormulaBox variant="gold" latex="F=73{,}5\;\text{N},\;W_\text{tot}=0" />
        </Step>
        <Pitfall>
          <strong>Konstant fart betyr IKKE konstant kraft = 0!</strong> Det betyr netto­kraft = 0. Anvendt kraft og friksjon er begge 73,5 N, og deres arbeid er likt og motsatt — det er det som gjør netto­arbeid null.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: All energi du tilfører ved skyving (331 J) blir omdannet til varme via friksjon. Dette er en generell egenskap ved transport ved konstant fart — man "betaler" friksjons­tap kontinuerlig.
        </p>
      </div>
    ),
    summary: <p>Konstant fart ⇒ ΣF = 0 og W_tot = 0. F = μ_k·mg, og W_F = −W_f kansellerer.</p>,
  },

  "6.5": {
    title: "Maler klatrer opp stige",
    difficulty: "lett",
    pageRef: "s. 221",
    problem: (
      <p>
        En 73,0 kg maler klatrer en stige som er 2,70 m lang og som lener mot en vertikal vegg. Stigen
        danner en vinkel 25,0° med veggen. (a) Hvor mye arbeid utfører gravitasjon på maleren? (b)
        Avhenger svaret i (a) av om maleren klatrer ved konstant fart eller akselererer opp stigen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Maler­masse: m = 73,0 kg</li>
        <li>Stige­lengde: L = 2,70 m</li>
        <li>Vinkel mellom stige og vegg: 25,0° (dvs. 65° med horisontal)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Arbeid av tyngde på maleren mens han klatrer hele lengden</li>
        <li>(b) Avhenger svaret av om farten er konstant eller akselerert?</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Gravitasjons­arbeid avhenger bare av høyde­endring">
          <FormulaBox variant="gold" latex="W_g=-mg\,\Delta h" />
          <p className="text-xs">Negativt fortegn fordi tyngden peker ned mens maleren beveger seg opp.</p>
        </TheoryBox>
        <TheoryBox title="Geometri">
          <p>Når stigen lener mot veggen i 25° fra vertikalen, er den vertikale høyden langs hele stigen <InlineLatex latex="h=L\cos 25°" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vinkel med vegg = 25° betyr stigen er nesten vertikal. Den vertikale høyden er L·cos 25° (ikke sin), siden vinkelen er målt fra vertikal.</p> },
      { label: "Hint 2", content: <p>Tyngden er en konservativ kraft — arbeid avhenger kun av start- og slutt­posisjon, aldri av vei eller fart.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tyngdens arbeid er bare en funksjon av vertikal forflytning.</p>
        <Step n={1} title="Vertikal høyde langs stigen">
          <FormulaBox latex="h=L\cos 25°=2{,}70(0{,}9063)=2{,}45\;\text{m}" />
        </Step>
        <Step n={2} title="(a) Tyngdens arbeid">
          <FormulaBox latex="W_g=-mgh=-(73{,}0)(9{,}80)(2{,}45)=-1{,}75\times 10^{3}\;\text{J}" />
        </Step>
        <Step n={3} title="(b) Avhengighet av fart?">
          <p>Nei. Tyngden er konservativ; den «vet» bare om <InlineLatex latex="\Delta h" />, ikke hvor lang tid det tar eller om farten er konstant.</p>
          <FormulaBox variant="gold" latex="W_g\approx -1{,}75\;\text{kJ};\;\text{uavhengig av fartsprofil}" />
        </Step>
        <Pitfall>
          <strong>Sin eller cos?</strong> Vinkelen er gitt med veggen (vertikalen). Vertikal komponent av lengden L er L·cos(vinkel med vertikal) = L·cos 25°. Hvis vinkelen i stedet var målt mot bakken, ville det vært L·sin(vinkel med bakke).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Maleren må tilføre +1,75 kJ med musklene for å overvinne tyngdens negative arbeid. Dette blir potensiell energi (mgh) i ham — uavhengig av om han spurter eller går rolig opp.
        </p>
      </div>
    ),
    summary: <p>W_g = −mgh; bare vertikal forflytning teller. Konservative krefter er fart-uavhengige.</p>,
  },

  "6.6": {
    title: "To tau-båter drar supertanker",
    difficulty: "middels",
    pageRef: "s. 221",
    problem: (
      <p>
        To tau­båter drar en handikappet supertanker. Hver båt utøver en konstant kraft 1,80×10⁶ N,
        én ved 14° vest for nord og den andre ved 14° øst for nord, mens de drar tankeren 0,63 km mot
        nord. Hva er totalt arbeid på tankeren?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kraft per båt: F = 1,80×10⁶ N</li>
        <li>Vinkler: ±14° fra nord (én øst, én vest)</li>
        <li>Forflytning: d = 0,63 km = 630 m mot nord</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Total arbeid på tankeren</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vektor­dekomponering">
          <p>Hver krafts øst/vest-komponent er <InlineLatex latex="F\sin 14°" />, motsatt rettet ⇒ kansellerer. Bare nord-komponenten <InlineLatex latex="F\cos 14°" /> bidrar.</p>
          <FormulaBox variant="gold" latex="W=2F\cos 14°\cdot d" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn vektor­diagram. Symmetrien (lik og motsatt vinkel) gir gratis at sideveis kraft­komponenter kanselleres.</p> },
      { label: "Hint 2", content: <p>Du kan også beregne arbeid for hver båt for seg som F·d·cos 14° og legge sammen — gir samme resultat.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Symmetri kansellerer øst-vest-komponentene. Bare nord-rettet komponent bidrar til arbeid.</p>
        <Step n={1} title="Netto kraft i nord">
          <FormulaBox latex="F_N=2F\cos 14°=2(1{,}80\times 10^{6})(0{,}9703)=3{,}493\times 10^{6}\;\text{N}" />
        </Step>
        <Step n={2} title="Total arbeid">
          <FormulaBox latex="W=F_N\cdot d=(3{,}493\times 10^{6})(630)=2{,}20\times 10^{9}\;\text{J}" />
          <FormulaBox variant="gold" latex="W\approx 2{,}20\times 10^{9}\;\text{J}=2{,}20\;\text{GJ}" />
        </Step>
        <Pitfall>
          <strong>Ikke glem at to båter bidrar.</strong> Hvis du regner én båt og glemmer å multiplisere med 2 (eller lar være å legge sammen), får du halvparten — 1,10×10⁹ J. Begge tau dras samtidig.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 2,2 GJ er enormt — tilsvarer ~600 kWh strøm. Tau­båt-vinkler er små (14°) for å maksimere fremover-komponent — store vinkler ville sløset bort kraft som sideveis spenning.
        </p>
      </div>
    ),
    summary: <p>Symmetri kansellerer transversale komponenter. W = 2F·d·cos θ for to like båter på hver sin side.</p>,
  },

  "6.8": {
    title: "Konstant kraft på handlevogn",
    difficulty: "middels",
    pageRef: "s. 221",
    problem: (
      <p>
        En lastet handle­vogn ruller over en parkerings­plass i sterk vind. Du anvender en konstant
        kraft <InlineLatex latex="\;\vec F=(30\;\text{N})\hat i-(37\;\text{N})\hat j" /> på vogna mens
        den gjennomgår en forflytning <InlineLatex latex="\;\vec s=(-8{,}6\;\text{m})\hat i-(3{,}8\;\text{m})\hat j" />.
        Hvor mye arbeid utfører kraften du anvender på handle­vogna?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kraft­vektor: <InlineLatex latex="\vec F=(30\,\hat i-37\,\hat j)\;\text{N}" /></li>
        <li>Forflytnings­vektor: <InlineLatex latex="\vec s=(-8{,}6\,\hat i-3{,}8\,\hat j)\;\text{m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid utført av kraften på vogna</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Skalar­produkt for arbeid">
          <FormulaBox variant="gold" latex="W=\vec F\cdot\vec s=F_x s_x+F_y s_y" />
          <p className="text-xs">Multipliser komponentvis og legg sammen — ikke bruk vinkler her.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Identifiser komponentene: F<sub>x</sub>=30, F<sub>y</sub>=−37, s<sub>x</sub>=−8,6, s<sub>y</sub>=−3,8.</p> },
      { label: "Hint 2", content: <p>Negativ × negativ = positiv (i y-leddet). Fortegns­logikken er viktig.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Når vektorene er gitt på komponentform er skalar­produktet rett frem.</p>
        <Step n={1} title="Skalar­produkt">
          <FormulaBox latex="W=F_x s_x+F_y s_y" />
          <FormulaBox latex="W=(30)(-8{,}6)+(-37)(-3{,}8)" />
          <FormulaBox latex="W=-258+140{,}6=-117{,}4\;\text{J}" />
          <FormulaBox variant="gold" latex="W\approx -117\;\text{J}" />
        </Step>
        <Pitfall>
          <strong>Ikke glem fortegnene!</strong> En vanlig feil er å miste minustegn på <InlineLatex latex="-37\cdot-3{,}8" /> — to negative gir positiv. Dobbel­sjekk: x-leddet er negativt (motsatt retning), y-leddet positivt (samme retning).
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Negativt arbeid betyr du tilfører negativ energi til vogna — men dette er litt misvisende fordi vogna er drevet av vinden. Du klarer ikke holde imot vinden, så kraften din virker mot total bevegelse i x, men med i y. Netto: vinden vinner.
        </p>
      </div>
    ),
    summary: <p>For 2D-arbeid: W = F<sub>x</sub>s<sub>x</sub> + F<sub>y</sub>s<sub>y</sub>. Komponentvis multiplikasjon er enklere enn å finne vinkel.</p>,
  },

  "6.19": {
    title: "Chicxulub-meteor",
    difficulty: "middels",
    pageRef: "s. 222",
    problem: (
      <p>
        Chicxulub-impakt. For ca. 66 millioner år siden krasjet et asteroid nær dagens by Chicxulub
        (Yucatán-halvøya). Krateret er ca. 180 km i diameter; nedslaget anses å ha forårsaket en
        massiv utryddelse. I følge nyere estimater (2019) hadde asteroiden masse <InlineLatex latex="2{,}4\times 10^{15}" /> kg
        og fart ca. 20 km/s. (a) Hvor mye kinetisk energi leverte denne meteoren til bakken? (b) Hvordan
        sammenlignes denne energien med energien frigjort av en 1,0 mega­tonns kjernebombe?
        (1 megatonn-bombe frigjør samme energi som en million tonn TNT, eller <InlineLatex latex="10^{9}" /> kg
        TNT, <InlineLatex latex="4{,}184\times 10^{15}" /> J energi.)
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Asteroide-masse: m = 2,4×10¹⁵ kg</li>
        <li>Asteroide-fart: v = 20 km/s = 2,0×10⁴ m/s</li>
        <li>1 megatonn = 4,184×10¹⁵ J</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Kinetisk energi K</li>
        <li>(b) Antall megatonn-ekvivalenter</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Kinetisk energi">
          <FormulaBox variant="gold" latex="K=\tfrac12 mv^2" />
          <p className="text-xs">Ved nedslag konverteres KE til varme, lyd, sjokkbølger og deformasjons­arbeid.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Pass på at v² gir 4×10⁸ (m/s)². Stort tall — dobbel­sjekk eksponenten.</p> },
      { label: "Hint 2", content: <p>For sammenligning: del K på 4,184×10¹⁵ J for å finne hvor mange Mt-bomber meteoren tilsvarer.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Sett tallene rett inn — det er bare høyde­potens-aritmetikk.</p>
        <Step n={1} title="(a) Kinetisk energi">
          <FormulaBox latex="K=\tfrac12(2{,}4\times 10^{15})(2{,}0\times 10^{4})^2" />
          <FormulaBox latex="K=\tfrac12(2{,}4\times 10^{15})(4{,}0\times 10^{8})=4{,}8\times 10^{23}\;\text{J}" />
        </Step>
        <Step n={2} title="(b) Sammenligning med Mt-bombe">
          <FormulaBox latex="N=\dfrac{K}{4{,}184\times 10^{15}}=\dfrac{4{,}8\times 10^{23}}{4{,}184\times 10^{15}}\approx 1{,}15\times 10^{8}" />
          <FormulaBox variant="gold" latex="K\approx 4{,}8\times 10^{23}\;\text{J}\sim 10^{8}\;\text{Mt-bomber}" />
        </Step>
        <Pitfall>
          <strong>Eksponent­håndtering.</strong> Pass nøye på 10^15·10^8 = 10^23. Misser du én tier­potens, er svaret feil med en faktor 10. Kalkulator­vitenskap som dette er en typisk eksamensfelle.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 100 millioner Mt-bomber. Til sammenligning: hele jordens kjerne­arsenal er ~10 000 Mt. Chicxulub-nedslaget var ~10 000× kraftigere enn alle bomber på jorda samtidig — derfor masse­utryddelse.
        </p>
      </div>
    ),
    summary: <p>K = ½mv² for makro­objekter er eksponensielt store tall. Ved 20 km/s er KE per kg ≈ 2×10⁸ J — milliard­ganger en kjemisk bombe.</p>,
  },

  "6.20": {
    title: "Vannmelon faller fra tak",
    difficulty: "lett",
    pageRef: "s. 222",
    problem: (
      <p>
        En 5,10 kg vannmelon slippes fra ro fra taket til en 29,0 m høy bygning og kjenner ingen
        merkbar luft­motstand. (a) Beregn arbeidet utført av gravitasjon på vannmelonen i løpet av
        forflytningen fra taket til bakken. (b) Rett før den treffer bakken, hva er vannmelonen sin
        (i) kinetisk energi og (ii) fart? (c) Hvilke av svarene i (a) og (b) ville være forskjellige
        hvis det var merkbar luft­motstand?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vannmelon-masse: m = 5,10 kg</li>
        <li>Fall­høyde: h = 29,0 m</li>
        <li>Slipper fra ro: v₀ = 0</li>
        <li>Ingen luft­motstand</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Tyngdens arbeid W_g</li>
        <li>(b) (i) KE og (ii) fart rett før bakken</li>
        <li>(c) Hvilke svar endres med luft­motstand?</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Tyngdens arbeid ved fritt fall">
          <FormulaBox variant="gold" latex="W_g=+mgh\;\text{(positivt fordi tyngd og fall samme retning)}" />
        </TheoryBox>
        <TheoryBox title="Arbeid-energi-teoremet">
          <p>Med kun tyngd: W_g = ΔK = K − 0 = K.</p>
          <FormulaBox variant="gold" latex="v=\sqrt{2gh}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tyngd og bevegelse er begge nedover ved fall ⇒ θ = 0°, cos = 1, W_g positivt.</p> },
      { label: "Hint 2", content: <p>Med luft­motstand er W_g uendret (samme h), men KE og fart blir mindre fordi luft gir negativt arbeid som spiser energi.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Bruk arbeid-energi-teoremet med kun tyngd som virkende kraft.</p>
        <Step n={1} title="(a) Tyngdens arbeid">
          <FormulaBox latex="W_g=mgh=(5{,}10)(9{,}80)(29{,}0)=1450\;\text{J}" />
        </Step>
        <Step n={2} title="(b) (i) Kinetisk energi">
          <FormulaBox latex="K=W_g=1450\;\text{J}" />
        </Step>
        <Step n={3} title="(b) (ii) Fart">
          <FormulaBox latex="v=\sqrt{2gh}=\sqrt{2(9{,}80)(29{,}0)}=\sqrt{568{,}4}=23{,}8\;\text{m/s}" />
        </Step>
        <Step n={4} title="(c) Med luft­motstand">
          <p>W_g er uendret — det avhenger bare av <InlineLatex latex="\Delta h" />. Men KE og fart blir mindre fordi luft­motstand utfører negativt arbeid: <InlineLatex latex="K=W_g+W_\text{luft}<W_g" />.</p>
          <FormulaBox variant="gold" latex="W_g=1450\;\text{J},\;K=1450\;\text{J},\;v\approx 23{,}8\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>W_g er retnings­avhengig av <em>fall­retning</em>, ikke av kreftenes navn.</strong> Når noe faller ⇒ W_g positivt. Når noe stiger ⇒ W_g negativt. Forveksle dette med fortegns­konvensjonen for U_g (potensiell energi) som har motsatt fortegn.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 1450 J er omtrent energien i å løfte 150 kg én meter. All denne energien tilbakeføres som kinetisk energi rett før nedslag — derfor knuses vannmelonen.
        </p>
      </div>
    ),
    summary: <p>Fritt fall: W_g = mgh = K, så v = √(2gh). Tyngdens arbeid er konservativt — bare h teller.</p>,
  },

  "6.24": {
    title: "Stein kastet rett opp",
    difficulty: "middels",
    pageRef: "s. 222",
    problem: (
      <p>
        Du kaster en 3,00 N stein vertikalt opp fra bakke­nivå. Du observerer at når den er 15,0 m over
        bakken, beveger den seg med 25,0 m/s oppover. Bruk arbeid-energi-teoremet til å finne (a)
        steinens fart akkurat idet den forlot bakken og (b) maks høyde.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Steinens vekt: 3,00 N ⇒ m = 3,00/9,80 = 0,306 kg</li>
        <li>Ved h₁ = 15,0 m er v₁ = 25,0 m/s oppover</li>
        <li>Kastes fra bakke­nivå, ingen luft­motstand</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Initial fart v₀ ved bakke­nivå</li>
        <li>(b) Maks høyde h_max</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid-energi mellom to punkter">
          <FormulaBox variant="gold" latex="\tfrac12 mv_0^2=\tfrac12 mv^2+mgh" />
          <p className="text-xs">Mellom bakke (v₀) og høyde h (v): KE som tapes blir til mgh.</p>
        </TheoryBox>
        <TheoryBox title="Topp­punkt: K = 0">
          <p>På maks høyde står steinen stille (et øyeblikk). All KE har blitt til mgh ⇒ <InlineLatex latex="h_\text{max}=v_0^2/(2g)" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Massene kanselleres! Du trenger ikke regne ut m fra vekten — du kan bruke v₀² = v² + 2gh direkte.</p> },
      { label: "Hint 2", content: <p>For (b): kvadrér ikke v₀ — du har allerede v₀² fra (a).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi-bevaring mellom bakke og 15 m, deretter mellom bakke og topp.</p>
        <Step n={1} title="(a) Initial fart">
          <FormulaBox latex="\tfrac12 mv_0^2=\tfrac12 mv^2+mgh" />
          <FormulaBox latex="v_0^2=v^2+2gh=(25{,}0)^2+2(9{,}80)(15{,}0)" />
          <FormulaBox latex="v_0^2=625+294=919\;\text{m}^2/\text{s}^2" />
          <FormulaBox latex="v_0=\sqrt{919}=30{,}3\;\text{m/s}" />
        </Step>
        <Step n={2} title="(b) Maks høyde">
          <FormulaBox latex="0=\tfrac12 mv_0^2-mgh_\text{max}\Rightarrow h_\text{max}=\dfrac{v_0^2}{2g}" />
          <FormulaBox latex="h_\text{max}=\dfrac{919}{2(9{,}80)}=\dfrac{919}{19{,}6}=46{,}9\;\text{m}" />
          <FormulaBox variant="gold" latex="v_0\approx 30{,}3\;\text{m/s},\;h_\text{max}\approx 46{,}9\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Massen avhenger av g!</strong> Vekt 3,00 N ÷ g gir massen — IKKE bruk 3,00 kg. I dette problemet kanselleres m uansett, men ved feilbruk kan man få helt andre tall.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Steinen mister halvparten av sin KE allerede ved 15 m (fra 919 til 625). Dette er ikke uventet — h_max ≈ 47 m, og kvadrering gjør at fart reduseres raskt med høyde.
        </p>
      </div>
    ),
    summary: <p>Energi-bevaring v₀² = v² + 2gh; topp gir h_max = v₀²/(2g). Massen kanselleres alltid i fritt fall.</p>,
  },

  "6.25": {
    title: "Slede med fremoverrettet kraft",
    difficulty: "middels",
    pageRef: "s. 222",
    problem: (
      <p>
        En slede med masse 8,50 kg beveger seg i en rett linje på en friksjons­fri horisontal overflate.
        På et punkt er farten 4,20 m/s; etter at den har reist 2,30 m utenfor dette punktet, er farten
        5,60 m/s. Bruk arbeid-energi-teoremet til å finne kraften som virker på sleden, antar at
        kraften er konstant og virker i bevegelses­retningen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Slede­masse: m = 8,50 kg</li>
        <li>Initial fart: v₁ = 4,20 m/s</li>
        <li>Slutt­fart: v₂ = 5,60 m/s</li>
        <li>Distanse: d = 2,30 m</li>
        <li>Friksjons­fritt; F konstant og parallell med bevegelsen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Anvendt kraft F</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid-energi-teoremet">
          <FormulaBox variant="gold" latex="W_\text{tot}=\Delta K=\tfrac12 m(v_2^2-v_1^2)" />
        </TheoryBox>
        <TheoryBox title="Konstant kraft langs vei">
          <p>Med F konstant og parallell forflytning: W = F·d.</p>
          <FormulaBox variant="gold" latex="F=\dfrac{\Delta K}{d}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Friksjons­fritt ⇒ den eneste horisontale kraften er F. Total arbeid = F·d.</p> },
      { label: "Hint 2", content: <p>Beregn ΔK = ½m(v₂² − v₁²). Ikke regn ½mv₂² − ½mv₁² hver for seg, det er identisk men gir flere arithmetiske trinn.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Friksjons­fri overflate ⇒ F er eneste horisontale kraft. Bruk arbeid-energi.</p>
        <Step n={1} title="Endring i kinetisk energi">
          <FormulaBox latex="\Delta K=\tfrac12(8{,}50)\bigl((5{,}60)^2-(4{,}20)^2\bigr)" />
          <FormulaBox latex="\Delta K=\tfrac12(8{,}50)(31{,}36-17{,}64)=\tfrac12(8{,}50)(13{,}72)=58{,}31\;\text{J}" />
        </Step>
        <Step n={2} title="Anvendt kraft">
          <FormulaBox latex="F=\dfrac{\Delta K}{d}=\dfrac{58{,}31}{2{,}30}=25{,}35\;\text{N}" />
          <FormulaBox variant="gold" latex="F\approx 25{,}4\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Glem ikke <em>kvadrat-differansen</em>!</strong> v₂² − v₁² ≠ (v₂ − v₁)². Her: (5,60−4,20)² = 1,96, men det riktige er 31,36 − 17,64 = 13,72 — syv ganger større.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Arbeid-energi-teoremet gir oss ofte snarvei i stedet for å bruke Newton 2 + kinematikk. Du slipper å beregne akselerasjon og tid.
        </p>
      </div>
    ),
    summary: <p>F = ΔK/d for konstant kraft langs forflytning. Snarveie via arbeid-energi-teoremet.</p>,
  },

  "6.26": {
    title: "Fotball­spark — kontakt­avstand",
    difficulty: "middels",
    pageRef: "s. 222",
    problem: (
      <p>
        En fotball med masse 0,470 kg beveger seg først med fart 2,10 m/s. En fotballspiller sparker
        ballen og utøver en konstant kraft 40,0 N i samme retning som ballens bevegelse. Over hvilken
        avstand må spillerens fot være i kontakt med ballen for å øke ballens fart til 6,00 m/s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Ball-masse: m = 0,470 kg</li>
        <li>Initial fart: v₀ = 2,10 m/s</li>
        <li>Mål­fart: v = 6,00 m/s</li>
        <li>Konstant kraft fra fot: F = 40,0 N (samme retning som bevegelse)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kontakt­avstand d</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid = ΔK">
          <FormulaBox variant="gold" latex="F\cdot d=\tfrac12 m(v^2-v_0^2)\Rightarrow d=\dfrac{m(v^2-v_0^2)}{2F}" />
          <p className="text-xs">Antar F er eneste horisontale kraft (luft­motstand neglisjeres).</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Ballen er allerede i bevegelse — ikke fra ro. Bruk v² − v₀², ikke bare v².</p> },
      { label: "Hint 2", content: <p>«Hvor lang tid» og «hvor langt» er forskjellige spørsmål. Her er det avstand, så bruk arbeid (ikke impuls F·t).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Når kontakt­tid og fart er involvert, er arbeid-energi raskest fordi avstand er ukjent.</p>
        <Step n={1} title="Endring i kinetisk energi">
          <FormulaBox latex="\Delta K=\tfrac12(0{,}470)\bigl((6{,}00)^2-(2{,}10)^2\bigr)" />
          <FormulaBox latex="\Delta K=\tfrac12(0{,}470)(36{,}00-4{,}41)=\tfrac12(0{,}470)(31{,}59)=7{,}42\;\text{J}" />
        </Step>
        <Step n={2} title="Kontakt­avstand">
          <FormulaBox latex="d=\dfrac{\Delta K}{F}=\dfrac{7{,}42}{40{,}0}=0{,}186\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 18{,}6\;\text{cm}" />
        </Step>
        <Pitfall>
          <strong>Ikke regn ut akselerasjonen først.</strong> Det er en lengre vei: F = ma ⇒ a = F/m, så v² = v₀² + 2ad. Begge gir samme svar, men arbeid-energi er én ligning.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 18 cm er omtrent skoens lengde — sparkeren får mest energi inn i ballen mens kontakten varer noen titalls millisekunder. Mer kontakt­avstand = mer energi gitt til ballen ved samme kraft.
        </p>
      </div>
    ),
    summary: <p>F·d = ΔK. Når avstand er ukjent og fart-endring er kjent, gir arbeid-energi-teoremet direkte svar.</p>,
  },

  "6.28": {
    title: "Isblokk på skråplan friksjons­fritt",
    difficulty: "lett",
    pageRef: "s. 222",
    problem: (
      <p>
        En blokk med is med masse 2,00 kg slippes 1,35 m ned et skrå­plan som heller 36,9° under
        horisontalen. Hvis blokken starter fra ro, hva er slutt­farten hvis vi kan ignorere friksjon?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: m = 2,00 kg</li>
        <li>Distanse langs skrå­plan: d = 1,35 m</li>
        <li>Helningsvinkel: α = 36,9°</li>
        <li>Friksjons­fritt; starter fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Slutt­fart v</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Vertikal høyde langs rampe">
          <FormulaBox variant="gold" latex="h=d\sin\alpha" />
          <p className="text-xs">Komponenten av forflytningen langs tyngde-retningen.</p>
        </TheoryBox>
        <TheoryBox title="Energi-bevaring">
          <FormulaBox variant="gold" latex="\tfrac12 mv^2=mgh\Rightarrow v=\sqrt{2gh}" />
          <p className="text-xs">All potensiell energi (mgh) blir kinetisk når friksjon er null.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Massen kanselleres! v avhenger bare av g og h, ikke m.</p> },
      { label: "Hint 2", content: <p>sin 36,9° = 0,600 (et standard 3-4-5-trekant-vinkel — pugg dette).</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi-bevaring uten friksjon: mgh → ½mv².</p>
        <Step n={1} title="Vertikal høyde">
          <FormulaBox latex="h=d\sin 36{,}9°=1{,}35\cdot 0{,}600=0{,}810\;\text{m}" />
        </Step>
        <Step n={2} title="Slutt­fart">
          <FormulaBox latex="v=\sqrt{2gh}=\sqrt{2(9{,}80)(0{,}810)}=\sqrt{15{,}88}=3{,}98\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 3{,}99\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Sin eller cos?</strong> Vinkelen er målt fra horisontalen ⇒ vertikal komponent = d·sin α. Hadde vinkelen vært fra vertikalen, var det d·cos α. Tegn skissen alltid for å være sikker.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Det er kun den vertikale fall­høyden som teller, ikke avstand langs rampen. En lengre, slakkere rampe med samme h gir samme slutt­fart — bare lengre tid.
        </p>
      </div>
    ),
    summary: <p>Friksjons­fri rampe: v = √(2g·d sin α). Bare vertikal høyde h teller, ikke vinkel eller bane.</p>,
  },

  "6.31": {
    title: "Bremse­avstand med arbeid-energi",
    difficulty: "middels",
    pageRef: "s. 223",
    problem: (
      <p>
        En bil kjører på en flat vei med fart <InlineLatex latex="v_0" /> i øyeblikket bremsene låser,
        slik at dekkene sklir i stedet for å rulle. (a) Bruk arbeid-energi-teoremet til å beregne
        kortest stoppe­avstand for bilen i form av <InlineLatex latex="v_0" />, g, og kinetisk friksjons­koeffisient
        <InlineLatex latex="\;\mu_k" /> mellom dekk og vei. (b) Med hvilken faktor endres minste stoppe­avstand
        hvis (i) μk dobles, (ii) v0 dobles, (iii) både μk og v0 dobles?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Initial fart: v₀</li>
        <li>Tyngde­akselerasjon: g</li>
        <li>Kinetisk friksjons­koeffisient: μ<sub>k</sub></li>
        <li>Bremsene er låst — kinetisk friksjon, ikke statisk</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Bremse­avstand d som funksjon av v₀, g, μ<sub>k</sub></li>
        <li>(b) Hvordan d endres når (i) μ<sub>k</sub> dobles, (ii) v₀ dobles, (iii) begge dobles</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Friksjon på flat vei = eneste horisontale kraft">
          <p>På flat vei er N = mg, friksjon f = μ<sub>k</sub>·mg. Ingen andre horisontale krefter.</p>
        </TheoryBox>
        <TheoryBox title="Arbeid-energi-teoremet">
          <FormulaBox variant="gold" latex="\mu_k mg\cdot d=\tfrac12 mv_0^2\Rightarrow d=\dfrac{v_0^2}{2\mu_k g}" />
          <p className="text-xs">Massen kanselleres — bremse­avstand er masse-uavhengig på flat vei.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bilen stopper når all KE er omdannet til friksjons­varme. Sett ½mv₀² = friksjons­arbeid.</p> },
      { label: "Hint 2", content: <p>For (b): bruk skala-argumenter. d ∝ v₀²/μ<sub>k</sub>. Endring i v₀ kvadreres, endring i μ<sub>k</sub> går invert.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">All initial KE blir spist av friksjon over distansen d.</p>
        <Step n={1} title="(a) Bremse­avstand">
          <FormulaBox latex="\mu_k mg\cdot d=\tfrac12 mv_0^2" />
          <FormulaBox latex="d=\dfrac{v_0^2}{2\mu_k g}" />
        </Step>
        <Step n={2} title="(b) Skala-effekter">
          <p>(i) μ<sub>k</sub> → 2μ<sub>k</sub>: d halveres (faktor ½).</p>
          <p>(ii) v₀ → 2v₀: d firedobles (faktor 4) — kvadrert!</p>
          <p>(iii) Begge dobles: d → (2v₀)²/(2·2μ<sub>k</sub>·g) = 4v₀²/(4μ<sub>k</sub>g)·½ = 2d (faktor 2).</p>
          <FormulaBox variant="gold" latex="d=\dfrac{v_0^2}{2\mu_k g};\;\text{(i)}\,\tfrac12,\;(ii)\,4,\;(iii)\,2" />
        </Step>
        <Pitfall>
          <strong>«Doble fart, doble bremse­avstand» — FEIL!</strong> Bremse­avstand vokser med <em>kvadratet</em> av fart. Doble fart = 4× lengre stopp. Dette er den viktigste sikkerhets­leksjonen i fysikk.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Massen kanselleres fordi både KE og friksjon er proporsjonale med m. Derfor bremser en lastebil og en bil i samme avstand — begge har samme μ<sub>k</sub>. Men i praksis er μ<sub>k</sub> ofte mindre for tyngre kjøretøy pga. dekk­slitasje.
        </p>
      </div>
    ),
    summary: <p>d = v₀²/(2μ<sub>k</sub>g). Massen kanselleres, fart kvadreres. Doble fart = 4× lengre stopp.</p>,
  },

  "6.32": {
    title: "Strekk fjær — konstant og kraft",
    difficulty: "middels",
    pageRef: "s. 223",
    problem: (
      <p>
        For å strekke en fjær 9,00 cm fra dens uutstrakte lengde må 19,0 J arbeid utføres. (a) Hva er
        kraft­konstanten til denne fjæra? (b) Hvilken kraft er nødvendig for å strekke fjæra 9,00 cm?
        (c) Hvor mye arbeid må utføres for å trykke sammen fjæra 4,00 cm fra uutstrakt lengde, og hvilken
        kraft er nødvendig?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Strekk­avstand: x = 9,00 cm = 0,0900 m</li>
        <li>Arbeid for å strekke: W = 19,0 J</li>
        <li>Kompresjons­avstand: x' = 4,00 cm = 0,0400 m</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Fjær­konstant k</li>
        <li>(b) Kraft F ved 9,00 cm</li>
        <li>(c) Arbeid og kraft for kompresjon 4,00 cm</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Fjær­arbeid (Hooke)">
          <FormulaBox variant="gold" latex="W=\tfrac12 kx^2" />
          <p className="text-xs">Arbeidet er kvadratisk i x — så dobbel strekking gir 4× mer energi lagret.</p>
        </TheoryBox>
        <TheoryBox title="Hookes lov for kraft">
          <FormulaBox variant="gold" latex="F=kx" />
          <p className="text-xs">Lineær — dobbel strekking dobler kraften, ikke firedobler.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a): løs W = ½kx² for k. For (c): bruk samme formler med x' = 4 cm.</p> },
      { label: "Hint 2", content: <p>Symmetri: kompresjon og strekking gir samme kraft (i størrelse) og arbeid for samme |x|.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Bruk W = ½kx² først for å finne k, så Hookes lov.</p>
        <Step n={1} title="(a) Fjær­konstant">
          <FormulaBox latex="k=\dfrac{2W}{x^2}=\dfrac{2(19{,}0)}{(0{,}0900)^2}=\dfrac{38{,}0}{0{,}00810}=4691\;\text{N/m}" />
        </Step>
        <Step n={2} title="(b) Kraft ved 9 cm">
          <FormulaBox latex="F=kx=4691(0{,}0900)=422\;\text{N}" />
        </Step>
        <Step n={3} title="(c) Arbeid og kraft ved 4 cm kompresjon">
          <FormulaBox latex="W'=\tfrac12 k(x')^2=\tfrac12(4691)(0{,}0400)^2=3{,}75\;\text{J}" />
          <FormulaBox latex="F'=k\cdot x'=4691(0{,}0400)=188\;\text{N}" />
          <FormulaBox variant="gold" latex="k\approx 4690\;\text{N/m},\;F_9=422\;\text{N},\;W_4=3{,}75\;\text{J},\;F_4=188\;\text{N}" />
        </Step>
        <Pitfall>
          <strong>Ikke bland kraft og arbeid.</strong> F = kx (lineær) — dobler du x, dobler du F. W = ½kx² (kvadratisk) — dobler du x, firedobler du W. Glem dette og du blander «4× kraft» med «4× energi».
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 9 cm strekking lagrer 19 J — samme størrelses­orden som å løfte en bok et par desimeter. Men for å strekke til 18 cm må man tilføre 76 J — fire ganger så mye for samme avstands­tillegg.
        </p>
      </div>
    ),
    summary: <p>k = 2W/x², F = kx (lineær), W = ½kx² (kvadratisk). Fjær­energi vokser raskt med utstrekkning.</p>,
  },

  "6.33": {
    title: "Tre identiske masser på fjærer (Fig E6.33)",
    difficulty: "middels",
    pageRef: "s. 223",
    problem: (
      <p>
        Tre identiske 8,50 kg masser er hengt fra tre identiske fjærer (Fig. E6.33). Hver fjær har
        kraft­konstant 7,80 kN/m og var 12,0 cm lang før noen masser ble festet. (a) Tegn FBD for hver
        masse. (b) Hvor lang er hver fjær når den henger som vist?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse hver: m = 8,50 kg (tre stykker)</li>
        <li>Fjær­konstant: k = 7,80 kN/m = 7800 N/m</li>
        <li>Original lengde: L₀ = 12,0 cm = 0,120 m</li>
        <li>Tre fjærer i serie, hver bærer massene under seg</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Lengde av hver fjær når massene henger</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Hver fjær bærer alle masser under seg">
          <p>Topp­fjær holder alle 3 masser ⇒ T_topp = 3mg.<br />Mellom­fjær holder 2 masser ⇒ T_mellom = 2mg.<br />Nederst holder 1 ⇒ T_nederst = mg.</p>
        </TheoryBox>
        <TheoryBox title="Hookes lov i likevekt">
          <FormulaBox variant="gold" latex="x=\dfrac{F}{k}=\dfrac{T}{k};\quad L=L_0+x" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn FBD for hver masse. Masse 1 (nederst) har bare nederste fjær opp og tyngd ned ⇒ T₁ = mg.</p> },
      { label: "Hint 2", content: <p>For fjær mellom masse 1 og 2: må holde m1 + dens egen masse m2 (i Newton 3 sense) ⇒ 2mg.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Topp-fjær har størst belastning fordi den bærer alt under seg.</p>
        <Step n={1} title="Spenning i hver fjær">
          <FormulaBox latex="T_\text{topp}=3mg=3(8{,}50)(9{,}80)=249{,}9\;\text{N}" />
          <FormulaBox latex="T_\text{mellom}=2mg=166{,}6\;\text{N}" />
          <FormulaBox latex="T_\text{nederst}=mg=83{,}3\;\text{N}" />
        </Step>
        <Step n={2} title="Forlengelse fra Hookes lov">
          <FormulaBox latex="x_\text{topp}=249{,}9/7800=0{,}0320\;\text{m}=3{,}20\;\text{cm}" />
          <FormulaBox latex="x_\text{mellom}=166{,}6/7800=0{,}0214\;\text{m}=2{,}14\;\text{cm}" />
          <FormulaBox latex="x_\text{nederst}=83{,}3/7800=0{,}0107\;\text{m}=1{,}07\;\text{cm}" />
        </Step>
        <Step n={3} title="Total lengde">
          <FormulaBox latex="L_\text{topp}=12{,}0+3{,}20=15{,}2\;\text{cm}" />
          <FormulaBox latex="L_\text{mellom}=12{,}0+2{,}14=14{,}1\;\text{cm}" />
          <FormulaBox latex="L_\text{nederst}=12{,}0+1{,}07=13{,}1\;\text{cm}" />
          <FormulaBox variant="gold" latex="L=15{,}2,\;14{,}1,\;13{,}1\;\text{cm (topp→bunn)}" />
        </Step>
        <Pitfall>
          <strong>Topp-fjær er strukket mest, ikke nederst.</strong> Intuisjon kan lure deg: nederste fjær virker «mest belastet» (henger lavest), men det er topp-fjæren som må bære all vekten under den.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: I et serie­oppheng som dette er belastningen kumulativ oppover. Industrielle bærekonstruksjoner — bruer, kraner, kabel­heiser — må dimensjoneres etter dette prinsippet.
        </p>
      </div>
    ),
    summary: <p>Topp-fjær bærer alt under seg ⇒ mest strekk. T_n = nmg for n masser hengende fra fjær.</p>,
  },

  "6.34": {
    title: "Variabel kraft på slede (Fig E6.34)",
    difficulty: "middels",
    pageRef: "s. 223",
    problem: (
      <p>
        Et barn anvender en kraft <InlineLatex latex="\vec F" /> parallelt med x-aksen på en 10,0 kg
        slede som beveger seg over isen. x-komponenten av kraften varierer med x slik som vist i
        Fig. E6.34: lineært opp til 10 N ved x=8 m, deretter lineært ned til 0 ved x=12 m. Beregn
        arbeidet F utfører idet sleden beveger seg fra (a) x=0 til 8,0 m; (b) x=8,0 til 12,0 m;
        (c) x=0 til 12,0 m.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Masse: m = 10,0 kg (irrelevant for arbeid hvis vi kun trenger W)</li>
        <li>F(x) lineær 0 → 10 N over 0 → 8 m (trekant)</li>
        <li>F(x) lineær 10 → 0 N over 8 → 12 m (trekant)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Arbeid 0 → 8 m</li>
        <li>(b) Arbeid 8 → 12 m</li>
        <li>(c) Total arbeid 0 → 12 m</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel kraft via integralet">
          <FormulaBox variant="gold" latex="W=\int_{x_1}^{x_2}F(x)\,dx=\text{areal under F-x-grafen}" />
        </TheoryBox>
        <TheoryBox title="Geometriske formler">
          <p>Trekant: <InlineLatex latex="A=\tfrac12\,b\,h" />.<br />Rektangel: A = b·h.<br />Trapes: <InlineLatex latex="A=\tfrac12(a+b)h" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Begge intervaller er trekanter. Bruk ½·base·høyde.</p> },
      { label: "Hint 2", content: <p>Total arbeid er bare summen av (a) + (b). Du trenger ikke integrere på nytt.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">F-x-grafen er to trekanter. Beregn areal hver for seg.</p>
        <Step n={1} title="(a) Arbeid 0 → 8 m">
          <FormulaBox latex="W_{0-8}=\tfrac12(8\;\text{m})(10\;\text{N})=40\;\text{J}" />
        </Step>
        <Step n={2} title="(b) Arbeid 8 → 12 m">
          <FormulaBox latex="W_{8-12}=\tfrac12(4\;\text{m})(10\;\text{N})=20\;\text{J}" />
        </Step>
        <Step n={3} title="(c) Total arbeid">
          <FormulaBox latex="W_{0-12}=40+20=60\;\text{J}" />
          <FormulaBox variant="gold" latex="(a)\,40\;\text{J},\;(b)\,20\;\text{J},\;(c)\,60\;\text{J}" />
        </Step>
        <Pitfall>
          <strong>Areal under graf, ikke under linje.</strong> En lineær F(x) fra 0 til F_max gir trekant. En konstant F gir rektangel. Pass på å bruke riktig formel — feil formel kan halvere eller doble svaret.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Variabel kraft ⇒ vi kan ikke bruke W = Fd direkte. Areal-metoden er en av de viktigste pedagogiske teknikkene i fysikk: enhver ikke-konstant størrelse kan håndteres med integraler/areal.
        </p>
      </div>
    ),
    summary: <p>W = areal under F-x. Trekanter: ½b·h. Bruk geometri når kraft varierer lineært.</p>,
  },

  "6.37": {
    title: "Boks mot fjær",
    difficulty: "middels",
    pageRef: "s. 223",
    problem: (
      <p>
        En 6,0 kg boks beveger seg med 3,0 m/s på en horisontal, friksjons­fri overflate og kjører rett
        inn i den ene enden av en lett horisontal fjær med kraft­konstant 75 N/cm som er festet i den
        andre enden. Bruk arbeid-energi-teoremet til å finne maksimal kompresjon av fjæra.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Boks-masse: m = 6,0 kg</li>
        <li>Initial fart: v = 3,0 m/s</li>
        <li>Fjær­konstant: k = 75 N/cm = 7500 N/m</li>
        <li>Friksjons­fritt; fjær har ubetydelig masse</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Maksimal kompresjon x_max</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Energi­bevaring KE → fjær­energi">
          <FormulaBox variant="gold" latex="\tfrac12 mv^2=\tfrac12 kx_\text{max}^2" />
          <p className="text-xs">Ved maks kompresjon står boksen stille — all KE er midlertidig lagret som elastisk fjær­energi.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Pass på enheter for k! «N/cm» må konverteres til N/m før du regner med SI-enheter.</p> },
      { label: "Hint 2", content: <p>Etter omforming: <InlineLatex latex="x_\text{max}=v\sqrt{m/k}" />.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi­bevaring: KE blir til fjær­energi. Boks stopper momentant ved maks kompresjon.</p>
        <Step n={1} title="Konverter k til SI">
          <FormulaBox latex="k=75\;\text{N/cm}\cdot\dfrac{100\;\text{cm}}{1\;\text{m}}=7500\;\text{N/m}" />
        </Step>
        <Step n={2} title="Sett KE = fjær­energi">
          <FormulaBox latex="\tfrac12 mv^2=\tfrac12 kx_\text{max}^2" />
          <FormulaBox latex="x_\text{max}=v\sqrt{\dfrac{m}{k}}=3{,}0\sqrt{\dfrac{6{,}0}{7500}}=3{,}0\sqrt{8{,}0\times 10^{-4}}" />
          <FormulaBox latex="x_\text{max}=3{,}0(0{,}02828)=0{,}0849\;\text{m}=8{,}49\;\text{cm}" />
          <FormulaBox variant="gold" latex="x_\text{max}\approx 8{,}5\;\text{cm}" />
        </Step>
        <Pitfall>
          <strong>Enhets­feil med k.</strong> 75 N/cm vs. 75 N/m er en faktor 100 forskjell. Med feil enhet får du x_max ≈ 85 cm i stedet for 8,5 cm — én størrelses­orden feil!
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Etter maks kompresjon vil fjæra skyte boksen tilbake med samme fart 3,0 m/s — ideell elastisk støt mot fjær. Dette danner grunnlaget for harmonisk svingning.
        </p>
      </div>
    ),
    summary: <p>KE = fjær­energi: x_max = v√(m/k). Pass på enheter — k på SI-form (N/m).</p>,
  },

  "6.44": {
    title: "Glider mot fjær på skrå­plan (Fig)",
    difficulty: "vanskelig",
    pageRef: "s. 223",
    problem: (
      <p>
        En liten glider plasseres mot en sammen­presset fjær i bunnen av et luft­spor som heller 40°
        over horisontalen. Glideren har masse 0,0900 kg. Fjæra har <InlineLatex latex="k=640\;\text{N/m}" />
        og neglisjerbar masse. Når fjæra slippes, reiser glideren maks 1,80 m langs sporet før den
        glir tilbake. Glideren slutter å være i kontakt med fjæra etter at den er tilbake til uutstrakt
        lengde. (a) Hvilken avstand var fjæra først sammen­presset? (b) Når glideren har reist 0,80 m
        langs sporet fra initial posisjon, er den fortsatt i kontakt med fjæra? Hva er kinetisk energi
        ved dette punktet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Helningsvinkel: α = 40°</li>
        <li>Glider­masse: m = 0,0900 kg</li>
        <li>Fjær­konstant: k = 640 N/m</li>
        <li>Maks reise opp: d_max = 1,80 m langs sporet</li>
        <li>Friksjons­fritt luft­spor; fjæra slipper ved uutstrakt lengde</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Initial kompresjon x</li>
        <li>(b) Er glider i kontakt med fjær ved 0,80 m? KE der?</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Energi­bevaring langs hele banen">
          <FormulaBox variant="gold" latex="\tfrac12 kx^2=mgd_\text{max}\sin\alpha" />
          <p className="text-xs">All fjær­energi blir til høyde­energi mgh = mg·d_max·sin α på toppen.</p>
        </TheoryBox>
        <TheoryBox title="Energi ved mellom­punkt">
          <FormulaBox variant="gold" latex="K(d)=mg(d_\text{max}-d)\sin\alpha" />
          <p className="text-xs">Hvis glider er borte fra fjæra: KE + mgh = total energi (konstant).</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a): all initial fjær­energi blir til mgh på toppen. Ingen KE der (snur).</p> },
      { label: "Hint 2", content: <p>For (b): sammenlign 0,80 m med fjær­kompresjonen x. Hvis 0,80 m &gt; x, er glider forbi fjær­kontakten.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi­bevaring fra start (kun fjær­energi) til topp (kun gravitasjons­energi).</p>
        <Step n={1} title="(a) Initial kompresjon">
          <FormulaBox latex="\tfrac12 kx^2=mgd_\text{max}\sin\alpha" />
          <FormulaBox latex="x^2=\dfrac{2mgd_\text{max}\sin 40°}{k}=\dfrac{2(0{,}0900)(9{,}80)(1{,}80)(0{,}6428)}{640}" />
          <FormulaBox latex="x^2=\dfrac{2{,}041}{640}=3{,}19\times 10^{-3}\;\text{m}^2" />
          <FormulaBox latex="x=0{,}0565\;\text{m}\approx 5{,}66\;\text{cm}" />
        </Step>
        <Step n={2} title="(b) Sjekk om i kontakt ved 0,80 m">
          <p>Glider er kun i kontakt mens fjæra er sammen­presset, dvs. innenfor x = 5,66 cm. 0,80 m = 80 cm &gt; 5,66 cm ⇒ <strong>IKKE i kontakt</strong>.</p>
        </Step>
        <Step n={3} title="(b) KE ved 0,80 m">
          <p>Nå er kun gravitasjon virksom. Brukes energi­bevaring fra startens energi (= mg·d_max·sin α) til 0,80 m:</p>
          <FormulaBox latex="K(0{,}80)+mg(0{,}80)\sin\alpha=mgd_\text{max}\sin\alpha" />
          <FormulaBox latex="K=mg(d_\text{max}-0{,}80)\sin\alpha=0{,}0900(9{,}80)(1{,}00)(0{,}6428)" />
          <FormulaBox latex="K=0{,}567\;\text{J}" />
          <FormulaBox variant="gold" latex="x\approx 5{,}66\;\text{cm};\;\text{IKKE i kontakt};\;K\approx 0{,}567\;\text{J}" />
        </Step>
        <Pitfall>
          <strong>Fjær­energi gjelder kun mens i kontakt.</strong> Etter at glider passerer fjærens uutstrakte lengde, er det kun gravitasjon som virker. Mange studenter glemmer å sjekke om kontakt fortsatt er der.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Fjæra leverer energien sin på de første 5,66 cm; resten er bare gravitasjons­spilling. KE er størst rett etter fjær­frigjøring og minker monotont oppover.
        </p>
      </div>
    ),
    summary: <p>Energi­bevaring start → topp gir kompresjon. KE ved mellompunkt: K = mg(d_max − d)sin α.</p>,
  },

  "6.45": {
    title: "CALC: F(x) = 18,0 N − (0,530 N/m)x",
    difficulty: "vanskelig",
    pageRef: "s. 223",
    problem: (
      <p>
        En kraft <InlineLatex latex="\vec F" /> i +x-retning med størrelse <InlineLatex latex="F(x)=18{,}0\;\text{N}-(0{,}530\;\text{N/m})x" />
        anvendes på en 5,00 kg boks som hviler på det horisontale, friksjons­frie underlaget på en frossen
        innsjø. F(x) er den eneste horisontale kraften på boksen. Hvis boksen først er i ro ved x=0,
        hva er farten etter at den har reist 11,0 m?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kraft­funksjon: <InlineLatex latex="F(x)=18{,}0-0{,}530x" /> N</li>
        <li>Boks-masse: m = 5,00 kg</li>
        <li>Distanse: d = 11,0 m</li>
        <li>Friksjons­fritt; starter i ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Slutt­fart v ved x = 11 m</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel kraft og arbeid">
          <FormulaBox variant="gold" latex="W=\int_0^{d}F(x)\,dx" />
          <p className="text-xs">For lineær F(x), integralet gir 18x − 0,265x² evaluert ved 11 m.</p>
        </TheoryBox>
        <TheoryBox title="Arbeid-energi-teoremet">
          <FormulaBox variant="gold" latex="W=\tfrac12 mv^2\Rightarrow v=\sqrt{\dfrac{2W}{m}}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Integrer F(x) ledd for ledd: ∫18 dx = 18x; ∫0,530x dx = 0,265x².</p> },
      { label: "Hint 2", content: <p>Ved x = 11 m sjekk: F(11) = 18 − 0,530(11) = 12,17 N. Fortsatt positiv ⇒ akselererer hele veien.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Integrer F(x), så bruk arbeid-energi-teoremet for å finne slutt­fart.</p>
        <Step n={1} title="Integrér kraften">
          <FormulaBox latex="W=\int_0^{11}(18{,}0-0{,}530x)\,dx=\bigl[18{,}0x-0{,}265x^2\bigr]_0^{11}" />
          <FormulaBox latex="W=18{,}0(11)-0{,}265(121)=198{,}0-32{,}07=165{,}9\;\text{J}" />
        </Step>
        <Step n={2} title="Slutt­fart">
          <FormulaBox latex="v=\sqrt{\dfrac{2W}{m}}=\sqrt{\dfrac{2(165{,}9)}{5{,}00}}=\sqrt{66{,}36}=8{,}15\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 8{,}15\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Pass på koeffisienten.</strong> ∫(0,530x) dx = 0,530·x²/2 = 0,265x². Glemmer du å dele på 2 i stam­funksjonen, blir svaret feil.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Kraften svekkes lineært over avstanden — fra 18 N i x = 0 til 12,17 N ved x = 11 m. Dette er typisk for f.eks. en spennings­fjær eller en magnetisk avstands­avhengig kraft.
        </p>
      </div>
    ),
    summary: <p>Variabel F(x): W = ∫F dx, så ½mv² = W. Lineær F gir kvadratisk integral.</p>,
  },

  "6.47": {
    title: "100 W lyspære — energi og fart",
    difficulty: "lett",
    pageRef: "s. 224",
    problem: (
      <p>
        Hvor mange joule med energi bruker en 100 watt lyspære per time? Hvor fort må en 75 kg person
        løpe for å ha den mengden kinetisk energi?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Lyspære-effekt: P = 100 W</li>
        <li>Tid: t = 1 time = 3600 s</li>
        <li>Person-masse: m = 75 kg</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Energi forbruk E i joule</li>
        <li>Fart v personen må ha for å ha tilsvarende KE</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Energi = Effekt · tid">
          <FormulaBox variant="gold" latex="E=P\cdot t" />
        </TheoryBox>
        <TheoryBox title="Kinetisk energi-tolkning">
          <FormulaBox variant="gold" latex="K=\tfrac12 mv^2\Rightarrow v=\sqrt{\dfrac{2K}{m}}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>1 watt = 1 joule per sekund. P·t gir energi i joule.</p> },
      { label: "Hint 2", content: <p>Dobbelt så mye energi i KE krever bare √2 ≈ 1,41× fart — kvadratet i KE-formelen er kraftig.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi: P·t. Sammenlign med ½mv² for å finne ekvivalent fart.</p>
        <Step n={1} title="Energi forbrukt">
          <FormulaBox latex="E=Pt=100\;\text{W}\cdot 3600\;\text{s}=3{,}60\times 10^{5}\;\text{J}=360\;\text{kJ}" />
        </Step>
        <Step n={2} title="Tilsvarende fart">
          <FormulaBox latex="v=\sqrt{\dfrac{2E}{m}}=\sqrt{\dfrac{720000}{75}}=\sqrt{9600}=97{,}98\;\text{m/s}" />
          <FormulaBox variant="gold" latex="E=3{,}60\times 10^{5}\;\text{J},\;v\approx 98\;\text{m/s}\,(\approx 352\;\text{km/t})" />
        </Step>
        <Pitfall>
          <strong>kWh ≠ kJ direkte.</strong> 100 W i 1 time = 0,1 kWh = 360 kJ. Husk at 1 kWh = 3,6 MJ. Dette er ofte forvirret på regninger.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 98 m/s er over verdensrekord-fart (Bolt: 12 m/s). Det viser at en lyspære på en time inneholder enorm KE — derfor er elektrisitet praktisk for arbeid: liten effekt over lang tid akkumulerer mye energi.
        </p>
      </div>
    ),
    summary: <p>E = P·t. Tilsvarende fart for samme KE: v = √(2E/m). Tids-akkumulering gir store energier.</p>,
  },

  "6.50": {
    title: "Stein på ru overflate — gjennomsnitts­effekt",
    difficulty: "middels",
    pageRef: "s. 224",
    problem: (
      <p>
        En 20,0 kg stein glir på en ru, horisontal overflate ved 8,00 m/s og stopper etter hvert pga
        friksjon. <InlineLatex latex="\mu_k=0{,}200" />. Hvor stor er gjennomsnitts­effekten produsert
        av friksjon mens steinen stopper?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Stein-masse: m = 20,0 kg</li>
        <li>Initial fart: v₀ = 8,00 m/s</li>
        <li>μ<sub>k</sub> = 0,200</li>
        <li>Steinen stopper helt under friksjon</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Gjennomsnitts­effekt fra friksjon mens den stopper</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Total arbeid av friksjon = total KE">
          <FormulaBox variant="gold" latex="W_f=\tfrac12 mv_0^2" />
        </TheoryBox>
        <TheoryBox title="Stoppe­tid via Newton 2">
          <p>Friksjons­akselerasjon a = μ<sub>k</sub>·g. Tid til v = 0:</p>
          <FormulaBox variant="gold" latex="t=\dfrac{v_0}{\mu_k g}" />
        </TheoryBox>
        <TheoryBox title="Gjennomsnitts­effekt">
          <FormulaBox variant="gold" latex="P_\text{avg}=\dfrac{W}{t}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Beregn total energi (KE som blir spist) først, så tid det tar.</p> },
      { label: "Hint 2", content: <p>Alternativ: P = ½(F·v_max + F·v_min) = ½F·v₀ siden farten avtar lineært.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Beregn total arbeid og total tid hver for seg, deretter del.</p>
        <Step n={1} title="Total arbeid (= initial KE)">
          <FormulaBox latex="W_f=K_0=\tfrac12 mv_0^2=\tfrac12(20{,}0)(8{,}00)^2=640\;\text{J}" />
        </Step>
        <Step n={2} title="Stoppe­tid">
          <FormulaBox latex="a=\mu_k g=0{,}200(9{,}80)=1{,}96\;\text{m/s}^2" />
          <FormulaBox latex="t=\dfrac{v_0}{a}=\dfrac{8{,}00}{1{,}96}=4{,}08\;\text{s}" />
        </Step>
        <Step n={3} title="Gjennomsnitts­effekt">
          <FormulaBox latex="P_\text{avg}=\dfrac{W}{t}=\dfrac{640}{4{,}08}=157\;\text{W}" />
          <FormulaBox variant="gold" latex="P_\text{avg}\approx 157\;\text{W}" />
        </Step>
        <Pitfall>
          <strong>Gjennomsnitts­effekt vs. øyeblikks­effekt.</strong> Den øyeblikkelige effekten F·v varierer fra F·v₀ = 314 W ved start til 0 W ved stopp. Gjennomsnittet er midt imellom = 157 W.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 157 W tilsvarer en kraftig lyspære. Hele 640 J av kinetisk energi blir til varme på 4 sekunder — du ville kjent det hvis du tok på underlaget rett etter.
        </p>
      </div>
    ),
    summary: <p>P_avg = W/t. For konstant kraft og lineært avtagende fart: P_avg = ½P_maks = ½F·v₀.</p>,
  },

  "6.54": {
    title: "Heis-design — maks passasjerer",
    difficulty: "middels",
    pageRef: "s. 224",
    problem: (
      <p>
        En heis har masse 600 kg, passasjerer ikke inkludert. Heisen er designet til å stige med
        konstant fart en vertikal avstand 20,0 m (fem etasjer) på 16,0 s, og er drevet av en motor som
        kan levere opptil 30 kW til heisen. Hva er maks antall passasjerer som kan kjøre i heisen?
        Anta gjennomsnitts passasjer­masse 65,0 kg.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Heis-masse (tom): m_h = 600 kg</li>
        <li>Vertikal stigning: h = 20,0 m</li>
        <li>Stigningstid: t = 16,0 s</li>
        <li>Maks motor-effekt: P_max = 30 kW = 30000 W</li>
        <li>Gjennomsnitts passasjer­masse: m_p = 65,0 kg</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Maks antall passasjerer N</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Effekt for konstant fart vertikalt">
          <FormulaBox variant="gold" latex="P=F\cdot v=Mg\cdot v" />
          <p className="text-xs">M er total masse heis + passasjerer. Konstant fart ⇒ kraft motor = vekt.</p>
        </TheoryBox>
        <TheoryBox title="Konstant fart">
          <FormulaBox variant="gold" latex="v=\dfrac{h}{t}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vurder hvilken total masse motoren akkurat klarer å løfte ved P_max og v.</p> },
      { label: "Hint 2", content: <p>Avrund <strong>nedover</strong> for antall passasjerer — du kan ikke ha 28,4 personer, og 29 ville overskride effekten.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Sett P = Mgv = P_max for å finne maksimal total masse.</p>
        <Step n={1} title="Heisens fart">
          <FormulaBox latex="v=\dfrac{h}{t}=\dfrac{20{,}0}{16{,}0}=1{,}25\;\text{m/s}" />
        </Step>
        <Step n={2} title="Maks total masse">
          <FormulaBox latex="M_\text{maks}=\dfrac{P_\text{max}}{gv}=\dfrac{30000}{9{,}80\cdot 1{,}25}=\dfrac{30000}{12{,}25}=2449\;\text{kg}" />
        </Step>
        <Step n={3} title="Maks passasjer­masse og antall">
          <FormulaBox latex="M_\text{pass}=2449-600=1849\;\text{kg}" />
          <FormulaBox latex="N=\dfrac{1849}{65{,}0}=28{,}4\Rightarrow N=28" />
          <FormulaBox variant="gold" latex="N=28\;\text{passasjerer}" />
        </Step>
        <Pitfall>
          <strong>Avrund alltid nedover for kapasitet.</strong> 28,4 betyr ikke 29 — den 29. passasjer ville overskride 30 kW. Heisen ville stoppet eller motoren ville brent.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Realistisk grunnlag for sikkerhet — heiser har ofte en sikkerhets­margin på 20–25 %. Med margin ville maks blitt ~22–23 passasjerer for å unngå overbelastning.
        </p>
      </div>
    ),
    summary: <p>P = Mgv. Avrund alltid nedover ved beregning av kapasitet — sikkerhet over alt.</p>,
  },

  "6.55": {
    title: "Skitrekk — effekt­behov",
    difficulty: "middels",
    pageRef: "s. 224",
    problem: (
      <p>
        En skitrekk opererer på en 14,0° skråning av lengde 340 m. Tauet beveger seg ved 11,5 km/h og
        gir effekt for 55 ryttere om gangen, med en gjennomsnitts­masse per rytter 70,0 kg. Estimer
        effekten som kreves for å drive trekket.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Helningsvinkel: α = 14,0°</li>
        <li>Lengde: L = 340 m (ikke nødvendig for effekt-beregning)</li>
        <li>Tau-fart: v = 11,5 km/h = 3,194 m/s</li>
        <li>Antall ryttere: n = 55</li>
        <li>Gjennomsnitts­masse per rytter: m = 70,0 kg</li>
        <li>Konstant fart, friksjon antas neglisjerbar</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Effekt P som kreves</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Konstant fart oppover skråning">
          <p>Tau­kraft = komponent av tyngd langs skråning = nm·g·sin α.</p>
          <FormulaBox variant="gold" latex="F=nmg\sin\alpha" />
        </TheoryBox>
        <TheoryBox title="Effekt = kraft × fart">
          <FormulaBox variant="gold" latex="P=Fv" />
          <p className="text-xs">v er taufart langs skråningen.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Konverter km/h til m/s: 11,5/3,6 = 3,194 m/s.</p> },
      { label: "Hint 2", content: <p>sin 14° ≈ 0,242. Total kraft: 55·70·9,80·0,242 ≈ 9123 N.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tau må overvinne komponent av tyngd langs skråningen for hver rytter.</p>
        <Step n={1} title="Total kraft langs tau">
          <FormulaBox latex="F=nmg\sin\alpha=55(70{,}0)(9{,}80)\sin 14°" />
          <FormulaBox latex="F=55(70{,}0)(9{,}80)(0{,}2419)=9123\;\text{N}" />
        </Step>
        <Step n={2} title="Effekt">
          <FormulaBox latex="P=Fv=9123(3{,}194)=29\,140\;\text{W}" />
          <FormulaBox variant="gold" latex="P\approx 29{,}1\;\text{kW}" />
        </Step>
        <Pitfall>
          <strong>sin α, ikke cos α.</strong> Komponenten av tyngd <em>langs</em> skråningen (motkraft til tau) er mg·sin α. Komponenten <em>vinkelrett</em> (mot underlag) er mg·cos α. Forveksling = svar er ofte 4× for lav.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: 29 kW er nok til å drive en mellomstor bil. Skitrekk er energi­krevende — jo flere ryttere, jo mer effekt.
        </p>
      </div>
    ),
    summary: <p>P = nmg·sin α·v for konstant fart oppover skråning. Skala lineært med rytter­antall og fart.</p>,
  },

  "6.58": {
    title: "CALC: Ku som dras inn",
    difficulty: "vanskelig",
    pageRef: "s. 224",
    problem: (
      <p>
        En usamarbeids­villig ku forlater fjøset idet du prøver hardere og hardere å dytte henne tilbake.
        I koordinater med origo ved fjøs­døra, går kua fra <InlineLatex latex="x=0" /> til <InlineLatex latex="x=6{,}9\;\text{m}" />
        mens du anvender en kraft med x-komponent <InlineLatex latex="F_x=-[20{,}0\;\text{N}+(3{,}0\;\text{N/m})x]" />.
        Hvor mye arbeid utfører kraften du anvender på kua under denne forflytningen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kraft­funksjon: <InlineLatex latex="F_x=-[20{,}0+3{,}0x]\;\text{N}" /></li>
        <li>Forflytning: x = 0 til x = 6,9 m</li>
        <li>Negativt fortegn: kraften peker i −x mens kua går i +x</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid utført av personens kraft på kua</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel kraft og arbeid">
          <FormulaBox variant="gold" latex="W=\int_0^{6{,}9}F_x\,dx=\int_0^{6{,}9}-(20+3x)\,dx" />
        </TheoryBox>
        <TheoryBox title="Stamfunksjon">
          <FormulaBox variant="gold" latex="\int(20+3x)\,dx=20x+1{,}5x^2" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Hold minustegnet utenfor integralet; det blir −[20x + 1,5x²] evaluert på 6,9.</p> },
      { label: "Hint 2", content: <p>Sjekk: 20·6,9 = 138; 1,5·47,61 = 71,4. Sum = 209,4. Negativt: −209 J.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Integrer den negative kraft­funksjonen over forflytningen.</p>
        <Step n={1} title="Integrer">
          <FormulaBox latex="W=-\int_0^{6{,}9}(20+3x)\,dx=-\bigl[20x+1{,}5x^2\bigr]_0^{6{,}9}" />
          <FormulaBox latex="W=-\bigl[20(6{,}9)+1{,}5(6{,}9)^2\bigr]=-\bigl[138+71{,}4\bigr]" />
          <FormulaBox latex="W=-209{,}4\;\text{J}" />
          <FormulaBox variant="gold" latex="W\approx -209\;\text{J}" />
        </Step>
        <Pitfall>
          <strong>Kua «vinner» energetisk.</strong> Negativt arbeid betyr personen taper energi til kua (eller faktisk: at kua tar negativ energi fra mennesket). Person­kraft og forflytning peker motsatt vei.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Når «motstanden» øker med distansen, øker også energi­tapet. Lik en strikker som blir vanskeligere å strekke jo mer du har strukket den.
        </p>
      </div>
    ),
    summary: <p>W = ∫F dx der F er funksjon av x. Negativt arbeid = kraft og bevegelse motsatt.</p>,
  },

  "6.59": {
    title: "Bagasje­handler drar koffert opp ramp",
    difficulty: "middels",
    pageRef: "s. 224",
    problem: (
      <p>
        En bagasje­handler drar en 20,0 kg koffert opp en rampe som heller 32° over horisontalen ved
        en kraft <InlineLatex latex="F=160\;\text{N}" /> som virker parallelt med rampen. Friksjons­koeffisient
        kinetisk er <InlineLatex latex="\mu_k=0{,}300" />. Hvis kofferten reiser 3,80 m langs rampen,
        beregn (a) arbeid F utfører; (b) arbeid gravitasjon utfører; (c) arbeid normal­kraft utfører;
        (d) arbeid friksjon utfører; (e) total arbeid på kofferten. (f) Hvis hastigheten av kofferten
        er null på bunnen, hva er farten etter 3,80 m?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Koffert-masse: m = 20,0 kg</li>
        <li>Vinkel: α = 32°</li>
        <li>Anvendt kraft (parallell med rampe): F = 160 N</li>
        <li>μ<sub>k</sub> = 0,300</li>
        <li>Distanse: d = 3,80 m langs rampen</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a–e) Arbeid av F, tyngd, normal, friksjon, total</li>
        <li>(f) Slutt­fart hvis startet fra ro</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Krefter på rampe">
          <p>Normal: <InlineLatex latex="N=mg\cos\alpha" /> (vinkelrett til underlag).<br />Tyngd-komponent langs rampe: <InlineLatex latex="mg\sin\alpha" /> (mot bevegelse).<br />Friksjon: <InlineLatex latex="f=\mu_k N=\mu_k mg\cos\alpha" />.</p>
        </TheoryBox>
        <TheoryBox title="Arbeid og energi">
          <FormulaBox variant="gold" latex="W_\text{tot}=\Delta K=\tfrac12 mv^2" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tegn FBD med rampen som x-akse. F+ langs rampe oppover, mg·sin α nedover, friksjon nedover (mot bevegelse).</p> },
      { label: "Hint 2", content: <p>Total arbeid er knapt positivt — derfor lav slutt­fart selv etter 3,8 m.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Beregn arbeid for hver kraft, sum gir ΔK.</p>
        <Step n={1} title="(a) Anvendt kraft">
          <FormulaBox latex="W_F=Fd=160(3{,}80)=608\;\text{J}" />
        </Step>
        <Step n={2} title="(b) Tyngd­arbeid">
          <FormulaBox latex="W_g=-mg(d\sin\alpha)=-20{,}0(9{,}80)(3{,}80)(\sin 32°)" />
          <FormulaBox latex="W_g=-20{,}0(9{,}80)(3{,}80)(0{,}5299)=-394{,}5\;\text{J}" />
        </Step>
        <Step n={3} title="(c) Normal­kraft">
          <FormulaBox latex="W_N=0\;(\text{vinkelrett til bevegelse})" />
        </Step>
        <Step n={4} title="(d) Friksjons­arbeid">
          <FormulaBox latex="N=mg\cos\alpha=20{,}0(9{,}80)(0{,}8480)=166{,}2\;\text{N}" />
          <FormulaBox latex="f=\mu_k N=0{,}300(166{,}2)=49{,}87\;\text{N}" />
          <FormulaBox latex="W_f=-fd=-49{,}87(3{,}80)=-189{,}5\;\text{J}" />
        </Step>
        <Step n={5} title="(e) Total arbeid">
          <FormulaBox latex="W_\text{tot}=608-394{,}5-189{,}5+0\approx 24{,}0\;\text{J}" />
        </Step>
        <Step n={6} title="(f) Slutt­fart">
          <FormulaBox latex="\tfrac12 mv^2=W_\text{tot}\Rightarrow v=\sqrt{2W/m}=\sqrt{2{,}40}=1{,}55\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 1{,}55\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Total arbeid ≠ kraftens arbeid.</strong> 608 J av kraften, men nesten alt spises av tyngd og friksjon ⇒ bare 24 J igjen som KE. Ikke et veldig effektivt system.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Med 160 N nås nesten balansen mellom de fremover- og bakover­rettede kreftene — bare litt overskudd for KE. Litt mindre F (~155 N) ville stoppet bevegelsen helt.
        </p>
      </div>
    ),
    summary: <p>Sum av alt arbeid = ΔK. På skråning: F oppover, mg·sin α + μ_k·mg·cos α nedover.</p>,
  },

  "6.67": {
    title: "CALC: Variabel friksjons­koeffisient",
    difficulty: "vanskelig",
    pageRef: "s. 225",
    problem: (
      <p>
        En boks glir med fart 4,50 m/s på et horisontalt underlag når den ved punkt P møter en ru
        seksjon. Friksjons­koeffisienten er ikke konstant: den starter ved 0,100 ved P og øker lineært
        med distanse forbi P, og når en verdi 0,600 etter 12,5 m. (a) Bruk arbeid-energi-teoremet til
        å finne hvor langt boksen sklir før den stopper. (b) Hva er friksjons­koeffisienten ved stopp­punkt?
        (c) Hvor langt ville boksen ha sklid hvis koeffisienten ikke hadde økt, men forblitt konstant 0,100?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Initial fart: v = 4,50 m/s</li>
        <li>μ(x) = 0,100 ved P (x = 0)</li>
        <li>μ(x) = 0,600 ved x = 12,5 m</li>
        <li>Lineær: <InlineLatex latex="\mu(x)=0{,}100+0{,}040x" /> (helning 0,500/12,5 = 0,040/m)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Stoppe­avstand d</li>
        <li>(b) Verdi av μ ved stopp­punktet</li>
        <li>(c) Stoppe­avstand hvis μ var konstant 0,100</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Variabel friksjon — integrasjon">
          <FormulaBox variant="gold" latex="W_f=-\int_0^{d}\mu(x)mg\,dx=-mg\bigl(0{,}1d+0{,}02d^2\bigr)" />
        </TheoryBox>
        <TheoryBox title="Sett W_f = −½mv²">
          <p>All initial KE blir spist av friksjon over distansen d. Resulterer i andregrads­ligning i d.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sjekk: ∫(0,1+0,04x) dx = 0,1x + 0,02x². Sett mg·dette = ½mv² og forenkl ved å fjerne m.</p> },
      { label: "Hint 2", content: <p>For (c): konstant μ gir d = v²/(2μg). Forventet at d_konst &gt; d_variabel siden μ vokser.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Variabel μ krever integrasjon. Resultat blir andregrads­ligning.</p>
        <Step n={1} title="(a) Andregrads­ligning">
          <FormulaBox latex="\tfrac12 v^2=g(0{,}1d+0{,}02d^2)" />
          <FormulaBox latex="\tfrac12(20{,}25)=9{,}80(0{,}1d+0{,}02d^2)" />
          <FormulaBox latex="10{,}125=0{,}980d+0{,}196d^2" />
          <FormulaBox latex="0{,}196d^2+0{,}980d-10{,}125=0" />
        </Step>
        <Step n={2} title="(a) Løs">
          <FormulaBox latex="d=\dfrac{-0{,}980+\sqrt{(0{,}980)^2+4(0{,}196)(10{,}125)}}{2(0{,}196)}" />
          <FormulaBox latex="d=\dfrac{-0{,}980+\sqrt{0{,}960+7{,}938}}{0{,}392}=\dfrac{-0{,}980+2{,}983}{0{,}392}=5{,}11\;\text{m}" />
        </Step>
        <Step n={3} title="(b) μ ved stopp">
          <FormulaBox latex="\mu=0{,}100+0{,}040(5{,}11)=0{,}304" />
        </Step>
        <Step n={4} title="(c) Konstant μ">
          <FormulaBox latex="d_\text{konst}=\dfrac{v^2}{2\mu g}=\dfrac{(4{,}50)^2}{2(0{,}100)(9{,}80)}=\dfrac{20{,}25}{1{,}96}=10{,}3\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 5{,}11\;\text{m},\;\mu_\text{stopp}\approx 0{,}304,\;d_\text{konst}\approx 10{,}3\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Variabel friksjon krever integrasjon.</strong> Hvis du bruker μ_avg = (0,1 + 0,304)/2 = 0,202, og setter d = v²/(2μ_avg g) = 5,11 m, får du tilfeldig riktig svar — men dette er sirkulær logikk; du brukte d som du regnet ut!
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Hvis veien blir mer ru jo lenger du sklir, stopper du i halvparten av distansen sammenlignet med konstant lav friksjon. Praktisk i bremse­design.
        </p>
      </div>
    ),
    summary: <p>Variabel μ ⇒ integrasjon ⇒ andregrads­ligning. Konstant μ er ofte langt mer optimistisk.</p>,
  },

  "6.71": {
    title: "CP Liten blokk på snor gjennom hull (Fig P6.71)",
    difficulty: "vanskelig",
    pageRef: "s. 225",
    problem: (
      <p>
        En liten blokk med masse 0,0600 kg er festet til en snor som passerer gjennom et hull i et
        friksjons­fritt horisontalt underlag (Fig. P6.71). Blokken roterer i en sirkel med radius 0,40 m
        rundt hullet, med tangentiell fart 0,70 m/s. Snora trekkes så ned, slik at radien til sirkelen
        reduseres til 0,10 m. På denne nye distansen er farten 2,80 m/s. (a) Hva er spenningen i snora
        i den opprinnelige situasjonen? (b) Hva er spenningen i snora i slutt­situasjonen? (c) Hvor mye
        arbeid utførte personen som trakk i snora?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Blokk-masse: m = 0,0600 kg</li>
        <li>Initial: r₁ = 0,40 m, v₁ = 0,70 m/s</li>
        <li>Slutt: r₂ = 0,10 m, v₂ = 2,80 m/s</li>
        <li>Friksjons­fritt underlag</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Spenning T₁ ved start</li>
        <li>(b) Spenning T₂ etter</li>
        <li>(c) Arbeid W av personen som drar</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Sirkulær bevegelse">
          <FormulaBox variant="gold" latex="T=\dfrac{mv^2}{r}" />
          <p className="text-xs">Spenning i snora gir sentripetal kraft som holder blokken i sirkel.</p>
        </TheoryBox>
        <TheoryBox title="Arbeid via energi-endring">
          <FormulaBox variant="gold" latex="W=\Delta K=\tfrac12 m(v_2^2-v_1^2)" />
          <p className="text-xs">Friksjons­fritt: bare arbeidet personen gjør endrer KE.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>For (a)/(b): bruk sirkulær­bevegelse-formelen direkte.</p> },
      { label: "Hint 2", content: <p>For (c): Newton 2 hjelper oss ikke direkte; bruk arbeid-energi-teoremet.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Spenning gir sentripetal kraft. Arbeid kommer fra KE-endring.</p>
        <Step n={1} title="(a) Initial spenning">
          <FormulaBox latex="T_1=\dfrac{mv_1^2}{r_1}=\dfrac{0{,}0600(0{,}70)^2}{0{,}40}=\dfrac{0{,}0294}{0{,}40}=0{,}0735\;\text{N}" />
        </Step>
        <Step n={2} title="(b) Slutt­spenning">
          <FormulaBox latex="T_2=\dfrac{mv_2^2}{r_2}=\dfrac{0{,}0600(2{,}80)^2}{0{,}10}=\dfrac{0{,}4704}{0{,}10}=4{,}70\;\text{N}" />
        </Step>
        <Step n={3} title="(c) Arbeid utført av person">
          <FormulaBox latex="W=\tfrac12 m(v_2^2-v_1^2)=\tfrac12(0{,}0600)(7{,}84-0{,}49)=0{,}221\;\text{J}" />
          <FormulaBox variant="gold" latex="T_1\approx 0{,}074\;\text{N},\;T_2\approx 4{,}70\;\text{N},\;W\approx 0{,}221\;\text{J}" />
        </Step>
        <Pitfall>
          <strong>Selv om snora kan virke vinkelrett til hastigheten i sirkelen, gjør den arbeid radialt.</strong> Når radien minker, har snor­spenningen en komponent langs blokkens forflytning ⇒ ikke null arbeid.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Spenning øker med faktor 64 (4,70/0,074) når radien fjerdedeles. Dette er pga. v² i telleren og r i nevneren — bevaring av spinn-moment gir v ∝ 1/r ⇒ T ∝ 1/r³.
        </p>
      </div>
    ),
    summary: <p>Sirkulær: T = mv²/r. Arbeid fra radiell forflytning: W = ΔK på friksjons­fritt underlag.</p>,
  },

  "6.75": {
    title: "Tekstbok mot fjær med friksjon",
    difficulty: "vanskelig",
    pageRef: "s. 225",
    problem: (
      <p>
        En 2,90 kg lærebok presses mot en horisontal fjær med ubetydelig masse og kraft­konstant
        290 N/m, og komprimerer fjæra 0,300 m. Når den slippes, glir læreboka på et horisontalt
        bord med <InlineLatex latex="\mu_k=0{,}30" />. Bruk arbeid-energi-teoremet til å finne hvor
        langt boka beveger seg fra dens initial­posisjon før den kommer til ro.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Bok-masse: m = 2,90 kg</li>
        <li>Fjær­konstant: k = 290 N/m</li>
        <li>Kompresjon: x = 0,300 m</li>
        <li>μ<sub>k</sub> = 0,30</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Total reise­avstand fra start­punktet til boka stopper</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Energi­bevaring med friksjons­tap">
          <FormulaBox variant="gold" latex="\tfrac12 kx^2=\mu_k mg\cdot d" />
          <p className="text-xs">All fjær­energi blir spist av kinetisk friksjon over distansen d.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Boka starter i ro, akselereres av fjæra, og friksjon bremser fra start.</p> },
      { label: "Hint 2", content: <p>«Total avstand» = avstand fjæra strakk seg + glidende avstand etter at fjæra slipper. Eller bare bruk energi­bevaring direkte.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Fjær­energi = friksjons­arbeid over total distanse (energi­bevaring med tap).</p>
        <Step n={1} title="Initial fjær­energi">
          <FormulaBox latex="E=\tfrac12 kx^2=\tfrac12(290)(0{,}300)^2=\tfrac12(290)(0{,}0900)=13{,}05\;\text{J}" />
        </Step>
        <Step n={2} title="Friksjons­kraft">
          <FormulaBox latex="f=\mu_k mg=0{,}30(2{,}90)(9{,}80)=8{,}53\;\text{N}" />
        </Step>
        <Step n={3} title="Total distanse">
          <FormulaBox latex="d=\dfrac{E}{f}=\dfrac{13{,}05}{8{,}53}=1{,}530\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 1{,}53\;\text{m}" />
        </Step>
        <Pitfall>
          <strong>Friksjon virker også mens fjæra puffer.</strong> Hvis du regner først «hvor mye energi når boka mister kontakt med fjær», må du trekke fra friksjon over kompresjons­avstanden 0,3 m. Med direkte energi­balanse over hele turen unngår du denne komplikasjonen.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Boka reiser ~5× lenger enn fjær­kompresjonen. Fjær­konstanten og kompresjonen bestemmer initial energi; friksjons­koeffisienten bestemmer hvor effektivt det «tappes».
        </p>
      </div>
    ),
    summary: <p>½kx² = μ_k·mg·d. Fjær­energi byttet i friksjons­varme. Direkte energi­balanse over hele turen.</p>,
  },

  "6.81": {
    title: "To blokker pulley (Fig P6.81)",
    difficulty: "vanskelig",
    pageRef: "s. 226",
    problem: (
      <p>
        Vurder systemet vist i Fig. P6.81. Tauet og trinsa har neglisjerbar masse, og trinsa er
        friksjons­fri. Først glir 6,00 kg-blokken nedover og 8,00 kg-blokken til høyre, begge med
        fart 0,600 m/s. Blokkene kommer til ro etter å ha beveget seg 7,00 m. Bruk arbeid-energi-teoremet
        for å beregne <InlineLatex latex="\mu_k" /> mellom 8 kg-blokken og bordet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>m₁ = 8,00 kg (på bord, beveger seg horisontalt)</li>
        <li>m₂ = 6,00 kg (henger, beveger seg vertikalt nedover)</li>
        <li>Initial fart: v = 0,600 m/s</li>
        <li>Begge stopper etter d = 7,00 m</li>
        <li>Kun m₁ har friksjon (mot bordet)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Kinetisk friksjons­koeffisient μ<sub>k</sub></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Energi­balanse for hele systemet">
          <FormulaBox variant="gold" latex="\tfrac12(m_1+m_2)v^2+m_2gd=\mu_k m_1 g d" />
          <p className="text-xs">Initial KE + lost PE (m₂ faller d) = friksjons­arbeid på m₁.</p>
        </TheoryBox>
        <TheoryBox title="Hvorfor begge masser i KE">
          <p>Tauet kobler m₁ og m₂. Begge har samme fart |v| (snor­tvang) ⇒ total KE = ½(m₁+m₂)v².</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>m₂ synker d = 7 m mens m₁ glir 7 m horisontalt — samme avstand pga. uutbart tau.</p> },
      { label: "Hint 2", content: <p>Initial KE er liten (0,6 m/s er treg), så det meste av energi­tapet kommer fra fallende m₂.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Energi­balanse: alt initial KE + falle-PE må gå til friksjons­varme.</p>
        <Step n={1} title="Sett opp ligningen">
          <FormulaBox latex="\tfrac12(m_1+m_2)v^2+m_2 gd=\mu_k m_1 gd" />
        </Step>
        <Step n={2} title="Sett inn tall">
          <FormulaBox latex="\tfrac12(14{,}0)(0{,}600)^2+6{,}00(9{,}80)(7{,}00)=\mu_k(8{,}00)(9{,}80)(7{,}00)" />
          <FormulaBox latex="\tfrac12(14{,}0)(0{,}360)+411{,}6=\mu_k(548{,}8)" />
          <FormulaBox latex="2{,}52+411{,}6=\mu_k\cdot 548{,}8" />
          <FormulaBox latex="414{,}1=\mu_k\cdot 548{,}8" />
        </Step>
        <Step n={3} title="Løs for μ_k">
          <FormulaBox latex="\mu_k=\dfrac{414{,}1}{548{,}8}=0{,}754" />
          <FormulaBox variant="gold" latex="\mu_k\approx 0{,}754" />
        </Step>
        <Pitfall>
          <strong>Begge masser har KE!</strong> Selv om bare m₂ taper PE, har begge fart 0,6 m/s og må stoppe. Glemmer du m₁'s KE, får du litt for høy μ_k.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: μ_k = 0,75 er svært høyt — typisk for tre på tre eller gummi på betong. Selv 6 kg fallende kunne ikke trekke 8 kg fritt over 7 m mot så mye friksjon.
        </p>
      </div>
    ),
    summary: <p>Initial KE av hele systemet + tapt PE = friksjons­arbeid på m₁. Begge masser bidrar til KE.</p>,
  },

  "6.82": {
    title: "Samme blokker med μk=0,250 (Fig P6.81)",
    difficulty: "vanskelig",
    pageRef: "s. 226",
    problem: (
      <p>
        Samme system som P6.81. <InlineLatex latex="\mu_k=0{,}250" /> mellom 8 kg-blokken og tabletop.
        Blokkene slippes fra ro. Bruk arbeid-energi-teoremet til å beregne farten av 6 kg-blokken etter
        at den har sunket 1,50 m.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>m₁ = 8,00 kg (bord, friksjon)</li>
        <li>m₂ = 6,00 kg (henger)</li>
        <li>μ<sub>k</sub> = 0,250</li>
        <li>Distanse: d = 1,50 m</li>
        <li>Slippes fra ro</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Slutt­fart v av 6 kg-blokken etter 1,50 m fall</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Energi­balanse">
          <p>Tapt PE av m₂ minus friksjons­tap blir til KE av begge.</p>
          <FormulaBox variant="gold" latex="m_2 gd-\mu_k m_1 gd=\tfrac12(m_1+m_2)v^2" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Sjekk at netto kraft er positiv: m₂g − μ_k·m₁g = 6·9,8 − 0,25·8·9,8 ≈ 58,8 − 19,6 &gt; 0 ⇒ akselererer.</p> },
      { label: "Hint 2", content: <p>v² = 2·(netto energi)/(m₁+m₂). Ikke glem m₁ i KE-summen.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Tapt PE av m₂ minus friksjons­tap = KE av begge.</p>
        <Step n={1} title="Energi-ligningen">
          <FormulaBox latex="m_2 gd-\mu_k m_1 gd=\tfrac12(m_1+m_2)v^2" />
        </Step>
        <Step n={2} title="Sett inn">
          <FormulaBox latex="6{,}00(9{,}80)(1{,}50)-0{,}250(8{,}00)(9{,}80)(1{,}50)=\tfrac12(14{,}0)v^2" />
          <FormulaBox latex="88{,}2-29{,}4=7{,}00\,v^2" />
          <FormulaBox latex="58{,}8=7{,}00\,v^2" />
        </Step>
        <Step n={3} title="Løs for v">
          <FormulaBox latex="v^2=\dfrac{58{,}8}{7{,}00}=8{,}40\;\text{m}^2/\text{s}^2" />
          <FormulaBox latex="v=\sqrt{8{,}40}=2{,}90\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 2{,}90\;\text{m/s}" />
        </Step>
        <Pitfall>
          <strong>Sjekk om systemet beveger seg i det hele tatt.</strong> Hvis μ_k·m₁ &gt; m₂, ville hele systemet stå stille. Her er friksjon (μ_k·m₁ = 2,0) mindre enn m₂ = 6 ⇒ akselererer.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Friksjon stjeler 1/3 av tilgjengelig energi (29,4 av 88,2 J). Uten friksjon: v = √(2·9,8·1,5·6/14) = 3,55 m/s, ~22 % raskere.
        </p>
      </div>
    ),
    summary: <p>m₂gd − μ_k·m₁gd = ½(m₁+m₂)v². Sjekk alltid at netto kraft &gt; 0 før systemet beveges.</p>,
  },

  "6.85": {
    title: "Pumpe — løfter og kaster ut vann",
    difficulty: "vanskelig",
    pageRef: "s. 226",
    problem: (
      <p>
        En pumpe kreves for å løfte 790 kg vann per minutt fra en brønn 14,1 m dyp og kaste det ut med
        fart 17,5 m/s. (a) Hvor mye arbeid utfører pumpen per minutt for å løfte vannet? (b) Hvor mye
        for å gi vannet kinetisk energi det har når det kastes ut? (c) Hva må effekt­utgangen til
        pumpa være?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Vann­strøm: m = 790 kg/minutt</li>
        <li>Brønn­dybde: h = 14,1 m</li>
        <li>Eksjons­fart: v = 17,5 m/s</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>(a) Løfte­arbeid per minutt</li>
        <li>(b) KE-arbeid per minutt</li>
        <li>(c) Pumpe­effekt</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="To energi­bidrag">
          <p>Pumpa må:<br />1. Løfte vannet imot tyngd ⇒ <InlineLatex latex="W_\text{løft}=mgh" /><br />2. Gi vannet kinetisk energi ⇒ <InlineLatex latex="W_\text{KE}=\tfrac12 mv^2" /></p>
        </TheoryBox>
        <TheoryBox title="Effekt = total arbeid / tid">
          <FormulaBox variant="gold" latex="P=\dfrac{W_\text{løft}+W_\text{KE}}{60\;\text{s}}" />
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Massen er per minutt, så «per minutt» er allerede en flow-rate. Del totalt arbeid på 60 sekunder for watt.</p> },
      { label: "Hint 2", content: <p>Vurder hvilket bidrag som dominerer: KE-leddet er ½m·v² = ½·790·306,25 = 121 kJ, mens mgh = 109 kJ. KE er litt større.</p> },
    ],
    solution: (
      <div>
        <p className="mb-2">Pumpa gjør to typer arbeid: løfte vekt og akselerere strømmen.</p>
        <Step n={1} title="(a) Løfte­arbeid">
          <FormulaBox latex="W_\text{løft}=mgh=790(9{,}80)(14{,}1)=109\,160\;\text{J}\approx 109\;\text{kJ}" />
        </Step>
        <Step n={2} title="(b) KE-arbeid">
          <FormulaBox latex="W_\text{KE}=\tfrac12 mv^2=\tfrac12(790)(17{,}5)^2=\tfrac12(790)(306{,}25)=120\,969\;\text{J}\approx 121\;\text{kJ}" />
        </Step>
        <Step n={3} title="(c) Pumpe­effekt">
          <FormulaBox latex="P=\dfrac{W_\text{tot}}{t}=\dfrac{109\,160+120\,969}{60}=\dfrac{230\,129}{60}=3835\;\text{W}" />
          <FormulaBox variant="gold" latex="P\approx 3{,}83\;\text{kW}" />
        </Step>
        <Pitfall>
          <strong>Glem ikke KE-bidraget.</strong> Mange tenker bare på mgh-løft, men hvis vannet kastes ut med høy fart krever det også energi — her tilsvarer det ~52 % av total effekt!
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Fysisk tolkning: Pumpe­motor må levere både statisk løft (mgh) og dynamisk akselerasjon (½mv²). I praktiske pumper med høy ut­fart, dominerer KE-leddet over løft.
        </p>
      </div>
    ),
    summary: <p>Pumpe­effekt = (mgh + ½mv²)/t. Begge bidrag teller; KE er ofte oversett.</p>,
  },
};
