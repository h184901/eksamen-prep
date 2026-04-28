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
// Gjenbrukbare pedagogiske blokker
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
      <marker id="arrow-red-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k28" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 28 (matcher boken: University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 28.1 — Bevegelig punktladning (4 felt­punkter)
  // ==========================================================================
  "28.1": {
    title: "Magnetfelt fra +5,00 µC ladning i fire punkter",
    difficulty: "middels",
    pageRef: "s. 973",
    problem: (
      <div className="space-y-2">
        <p>
          En punktladning <InlineLatex latex="q=+5{,}00\;\mu\text{C}" /> beveger seg med konstant fart
          <InlineLatex latex="\;v=9{,}00\times 10^{6}\;\text{m/s}" /> i +y-retning, relativt til en referanseramme.
          I det øyeblikket ladningen er i origo, finn magnetfeltet (størrelse og retning) i følgende punkter:
        </p>
        <ul className="list-disc pl-6 text-sm space-y-0.5">
          <li>(a) <InlineLatex latex="x=0{,}500\;\text{m},\;y=0,\;z=0" /></li>
          <li>(b) <InlineLatex latex="x=0,\;y=-0{,}500\;\text{m},\;z=0" /></li>
          <li>(c) <InlineLatex latex="x=0,\;y=0,\;z=+0{,}500\;\text{m}" /></li>
          <li>(d) <InlineLatex latex="x=0,\;y=-0{,}500\;\text{m},\;z=+0{,}500\;\text{m}" /></li>
        </ul>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=+5{,}00\times 10^{-6}\;\text{C}" /></li>
        <li><InlineLatex latex="\vec v=9{,}00\times 10^{6}\,\hat j\;\text{m/s}" /></li>
        <li>Ladningen i origo i øyeblikket vi observerer</li>
      </ul>
    ),
    unknowns: <p>Magnetfeltet <InlineLatex latex="\vec B" /> i fire punkter (størrelse og retning).</p>,
    strategy: (
      <TheoryBox title="Biot-Savart for punktladning">
        <p>
          Bruk <InlineLatex latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\times\hat r}{r^2}" />.
          For hvert felt­punkt: tegn <InlineLatex latex="\vec r" /> fra ladningen til punktet,
          finn <InlineLatex latex="\hat r" /> og <InlineLatex latex="r" />, og kryssprodukt med
          <InlineLatex latex="\vec v" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Når <InlineLatex latex="\vec v\parallel\vec r" /> er <InlineLatex latex="\vec v\times\hat r=0" /> — feltet er null på bevegelseslinjen.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="\dfrac{\mu_0}{4\pi}=10^{-7}\;\text{T·m/A}" /> gjør tallregningen pen.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Hvorfor lager bevegelige ladninger magnetfelt?">
          <p>
            En stillestående ladning lager bare <InlineLatex latex="\vec E" />. Så snart den beveger seg, dukker det opp et
            magnetisk felt — en konsekvens av relativitet (det «elektriske» feltet sett fra én ramme er delvis «magnetisk»
            sett fra en annen). Biot-Savart for én punktladning kvantifiserer dette:
          </p>
          <FormulaBox variant="blue" latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\times\hat r}{r^2}" />
          <p>
            Her peker <InlineLatex latex="\hat r" /> alltid <em>fra kilden til feltpunktet</em>. Krysspro­duktet sier at B
            står vinkelrett på <em>både</em> v og r̂, og avstands­avhengigheten <InlineLatex latex="1/r^2" /> er identisk
            med Coulomb. Tegnet på q snur retningen.
          </p>
        </TheoryBox>
        <Pitfall>
          Fellen er å bruke <InlineLatex latex="\hat r" /> motsatt vei (fra felt­punkt til kilde). Det gir feil fortegn på alt.
          Like vanlig: glemme at <InlineLatex latex="\vec v\times\hat r=0" /> hvis r̂ er parallell med v.
        </Pitfall>
        <Step n={1} title="Felles oppskrift for alle fire punktene">
          <p>
            Skriv først ut <InlineLatex latex="\vec v=v\,\hat j" /> med <InlineLatex latex="v=9{,}00\times 10^{6}" /> m/s,
            og bruk fellesfaktoren
            <InlineLatex latex="\;K=\dfrac{\mu_0}{4\pi}\dfrac{qv}{r^2}=10^{-7}\dfrac{(5\times 10^{-6})(9\times 10^{6})}{r^2}=\dfrac{4{,}50}{r^2}\times 10^{-7}\;\text{T·m}^2" />.
            For hvert punkt blir <InlineLatex latex="\vec B=K\,(\hat j\times\hat r)" />.
          </p>
        </Step>
        <Step n={2} title="(a) Punkt på +x-aksen">
          <p>
            <InlineLatex latex="\vec r=0{,}500\,\hat i" />, <InlineLatex latex="\hat r=\hat i" />,
            <InlineLatex latex="\;r^2=0{,}25\;\text{m}^2" />.
            Kryssprodukt: <InlineLatex latex="\hat j\times\hat i=-\hat k" />.
          </p>
          <FormulaBox latex="\vec B=\dfrac{4{,}50\times 10^{-7}}{0{,}25}(-\hat k)=-1{,}80\times 10^{-6}\,\hat k\;\text{T}" />
          <p>Altså <strong>1,80 µT i −z-retning</strong> (inn i arket).</p>
        </Step>
        <Step n={3} title="(b) Punkt på −y-aksen">
          <p>
            <InlineLatex latex="\hat r=-\hat j" />, parallell (motsatt) med <InlineLatex latex="\vec v" />.
            <InlineLatex latex="\;\hat j\times(-\hat j)=0" />.
          </p>
          <FormulaBox variant="gold" latex="\vec B=0" />
          <p>
            Fysikalsk: feltet er null langs hele bevegelses­linjen. En ladning «kan ikke se sitt eget magnetfelt»
            i farts­retningen.
          </p>
        </Step>
        <Step n={4} title="(c) Punkt på +z-aksen">
          <p>
            <InlineLatex latex="\hat r=\hat k" />, <InlineLatex latex="\;r^2=0{,}25" />.
            <InlineLatex latex="\;\hat j\times\hat k=\hat i" />.
          </p>
          <FormulaBox latex="\vec B=\dfrac{4{,}50\times 10^{-7}}{0{,}25}\hat i=+1{,}80\times 10^{-6}\,\hat i\;\text{T}" />
          <p><strong>1,80 µT i +x-retning</strong>.</p>
        </Step>
        <Step n={5} title="(d) Punkt i yz-planet (45°-vinkel)">
          <p>
            <InlineLatex latex="\vec r=(0,-0{,}500,\,+0{,}500)" /> m, <InlineLatex latex="\;r=\sqrt{0{,}5}=0{,}7071" /> m,
            <InlineLatex latex="\;r^2=0{,}500" /> m². Vinkelen mellom <InlineLatex latex="\vec v" /> (+y) og r̂ er 135°,
            så <InlineLatex latex="\sin\theta=\sin 135°=\tfrac{\sqrt{2}}{2}" />.
          </p>
          <p>
            Enhets­vektoren: <InlineLatex latex="\hat r=\tfrac{1}{\sqrt 2}(-\hat j+\hat k)" />. Krysspro­duktet:
          </p>
          <FormulaBox latex="\hat j\times\hat r=\tfrac{1}{\sqrt 2}\bigl[\hat j\times(-\hat j)+\hat j\times\hat k\bigr]=\tfrac{1}{\sqrt 2}\hat i" />
          <p>Sett inn i K:</p>
          <FormulaBox latex="\vec B=\dfrac{4{,}50\times 10^{-7}}{0{,}500}\cdot\tfrac{1}{\sqrt 2}\hat i=6{,}36\times 10^{-7}\,\hat i\;\text{T}" />
          <p><strong>0,636 µT i +x-retning</strong>.</p>
        </Step>
        <FormulaBox variant="gold" latex="(a)\;1{,}80\,\mu\text{T}\,(-\hat k)\;\;(b)\;0\;\;(c)\;1{,}80\,\mu\text{T}\,(+\hat i)\;\;(d)\;0{,}636\,\mu\text{T}\,(+\hat i)" />
        <p className="mt-2 italic text-[var(--muted)]">
          Tolkning: feltet er sterkest når <InlineLatex latex="\vec r\perp\vec v" /> (a og c), null når
          <InlineLatex latex="\;\vec r\parallel\vec v" /> (b), og redusert med <InlineLatex latex="\sin\theta" /> ellers (d).
          Mikrotesla er ca. 2 % av jordmagnet­feltet — én ladning gir lite, men milliarder gir reelle effekter (= strøm).
        </p>
      </div>
    ),
    summary: (
      <p>
        Bevegelige ladninger lager et magnet­felt vinkelrett på både <InlineLatex latex="\vec v" /> og
        <InlineLatex latex="\;\hat r" />. Feltet er null på bevegelses­linjen, maksimalt 90° unna, og avtar som
        <InlineLatex latex="\;1/r^2" />.
      </p>
    ),
  },

  // ==========================================================================
  // 28.5 — Negativ ladning, fire punkter
  // ==========================================================================
  "28.5": {
    title: "Magnetfelt fra −4,60 µC ladning i fire punkter",
    difficulty: "middels",
    pageRef: "s. 973",
    problem: (
      <div className="space-y-2">
        <p>
          En ladning <InlineLatex latex="q=-4{,}60\;\mu\text{C}" /> beveger seg med konstant fart
          <InlineLatex latex="\;v=6{,}60\times 10^{5}\;\text{m/s}" /> i +x-retning. Når ladningen er i origo,
          hva er magnet­feltet i punktene:
        </p>
        <ul className="list-disc pl-6 text-sm space-y-0.5">
          <li>(a) <InlineLatex latex="x=0{,}500\;\text{m},\;y=0,\;z=0" /></li>
          <li>(b) <InlineLatex latex="x=0,\;y=0{,}500\;\text{m},\;z=0" /></li>
          <li>(c) <InlineLatex latex="x=0{,}500\;\text{m},\;y=0{,}500\;\text{m},\;z=0" /></li>
          <li>(d) <InlineLatex latex="x=0,\;y=0,\;z=0{,}500\;\text{m}" /></li>
        </ul>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=-4{,}60\times 10^{-6}\;\text{C}" />, <InlineLatex latex="\vec v=6{,}60\times 10^{5}\,\hat i\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>Magnet­feltet <InlineLatex latex="\vec B" /> i fire punkter.</p>,
    strategy: (
      <TheoryBox title="Samme formel — minustegn flipper retning">
        <p>
          Negativ ladning er ikke noe «nytt» — formelen <InlineLatex latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\times\hat r}{r^2}" />
          gjelder også. Men siden q&lt;0 snur retningen sammenlignet med en positiv ladning som beveger seg likt.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Felles­faktor: <InlineLatex latex="K=10^{-7}\dfrac{|q|v}{r^2}=\dfrac{0{,}3036}{r^2}\,\mu\text{T·m}^2" />.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Negativ ladning — bare snu retningen til slutt">
          <p>
            Strategi: regn først ut hva en <em>positiv</em> ladning ville gitt, så snu retningen. Da unngår man
            å rote med fortegn underveis. Her er <InlineLatex latex="|q|=4{,}60\times 10^{-6}\;\text{C}" />.
          </p>
        </TheoryBox>
        <Pitfall>
          Klassisk feil: doble fortegn­bytte. Hvis du dropper minustegnet i Biot-Savart men husker å «snu retningen» til slutt,
          får du riktig svar. Hvis du beholder minustegnet <em>og</em> snur til slutt, snur du to ganger.
        </Pitfall>
        <Step n={1} title="(a) Felt­punktet på +x — parallell med v">
          <p>
            <InlineLatex latex="\hat r=\hat i\parallel\vec v" />, så
            <InlineLatex latex="\;\vec v\times\hat r=0" />.
          </p>
          <FormulaBox variant="gold" latex="\vec B=0" />
        </Step>
        <Step n={2} title="(b) Punkt på +y">
          <p>
            <InlineLatex latex="\hat r=\hat j" />, <InlineLatex latex="\;\hat i\times\hat j=\hat k" />,
            <InlineLatex latex="\;r^2=0{,}25" />. For positiv ladning ville B vært i +k̂; negativ snur til −k̂:
          </p>
          <FormulaBox latex="|\vec B|=\dfrac{0{,}3036\times 10^{-6}}{0{,}25}=1{,}21\times 10^{-6}\;\text{T}" />
          <p><strong>1,21 µT i −z-retning</strong>.</p>
        </Step>
        <Step n={3} title="(c) Punkt i xy-planet, 45°-vinkel">
          <p>
            <InlineLatex latex="\vec r=(0{,}5;\,0{,}5;\,0)" />,
            <InlineLatex latex="\;r=0{,}7071\;\text{m}" />,
            <InlineLatex latex="\;\sin\theta=\sin 45°=\tfrac{\sqrt 2}{2}" />.
            Krysspro­duktet <InlineLatex latex="\hat i\times\hat r=\tfrac{1}{\sqrt 2}\hat k" /> peker ut av arket;
            negativ ladning snur til −k̂.
          </p>
          <FormulaBox latex="|\vec B|=\dfrac{0{,}3036\times 10^{-6}}{0{,}500}\cdot\tfrac{1}{\sqrt 2}=4{,}29\times 10^{-7}\;\text{T}" />
          <p><strong>0,429 µT i −z-retning</strong>.</p>
        </Step>
        <Step n={4} title="(d) Punkt på +z">
          <p>
            <InlineLatex latex="\hat r=\hat k" />, <InlineLatex latex="\;\hat i\times\hat k=-\hat j" />.
            For positiv ladning er B i −ĵ; negativ snur til +ĵ.
          </p>
          <FormulaBox latex="|\vec B|=\dfrac{0{,}3036\times 10^{-6}}{0{,}25}=1{,}21\times 10^{-6}\;\text{T}" />
          <p><strong>1,21 µT i +y-retning</strong>.</p>
        </Step>
        <FormulaBox variant="gold" latex="(a)\;0\;\;(b)\;1{,}21\,\mu\text{T}\,(-\hat k)\;\;(c)\;0{,}429\,\mu\text{T}\,(-\hat k)\;\;(d)\;1{,}21\,\mu\text{T}\,(+\hat j)" />
        <p className="mt-2 italic text-[var(--muted)]">
          Sammenlign med 28.1: alt er flippet og skalert ned med <InlineLatex latex="qv" />-forholdet
          <InlineLatex latex="\;(4{,}60\cdot 6{,}60\times 10^{-1})/(5\cdot 9)=0{,}0675" />. Det stemmer:
          1,80 µT × 0,0675 ≈ 0,12 µT — men her har vi forskjellige avstander, ikke direkte sammenlignbart.
        </p>
      </div>
    ),
    summary: (
      <p>
        Samme Biot-Savart, men <InlineLatex latex="q&lt;0" /> snur retningen. Punkter parallelle med
        <InlineLatex latex="\;\vec v" /> gir alltid B = 0. Sjekk alltid kryss­produktet og fortegnet på q sist.
      </p>
    ),
  },

  // ==========================================================================
  // 28.6 — To ladninger som beveger seg (Fig E28.6)
  // ==========================================================================
  "28.6": {
    title: "Felt fra to bevegelige ladninger (Fig E28.6)",
    difficulty: "vanskelig",
    pageRef: "s. 973",
    problem: (
      <div className="space-y-2">
        <p>
          Positive punkt­ladninger <InlineLatex latex="q=+7{,}00\;\mu\text{C}" /> og
          <InlineLatex latex="\;q'=+2{,}00\;\mu\text{C}" /> beveger seg slik som vist i Fig. E28.6 i forhold til en observatør i punkt P.
          Avstanden d er 0,130 m, <InlineLatex latex="\;v=4{,}60\times 10^{6}\;\text{m/s}" /> og
          <InlineLatex latex="\;v'=9{,}20\times 10^{6}\;\text{m/s}" />.
          (a) Når ladningene er i posisjonene vist, finn størrelse og retning av netto magnetfelt i P.
          (b) Magnitude og retning av elektrisk og magnetisk kraft som hver ladning utøver på den andre, og forholdet
          mellom elektrisk og magnetisk krafts­størrelse.
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* Øvre ladning q i +y */}
          <circle cx="160" cy="40" r="10" fill="#ef4444" />
          <text x="155" y="44" fontSize="10" fill="white" fontWeight="bold">+</text>
          <text x="175" y="35" fontSize="11" fill="#ef4444" fontWeight="bold">q</text>
          {/* hastighet v til høyre */}
          <line x1="170" y1="40" x2="220" y2="40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k28)" />
          <text x="225" y="44" fontSize="10" fill="#ef4444">v</text>

          {/* Nedre ladning q' i -y */}
          <circle cx="160" cy="160" r="10" fill="#3b82f6" />
          <text x="155" y="164" fontSize="10" fill="white" fontWeight="bold">+</text>
          <text x="173" y="178" fontSize="11" fill="#3b82f6" fontWeight="bold">q&apos;</text>
          {/* hastighet v' til venstre */}
          <line x1="150" y1="160" x2="100" y2="160" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k28)" />
          <text x="80" y="164" fontSize="10" fill="#3b82f6">v&apos;</text>

          {/* P-punkt mellom dem */}
          <circle cx="160" cy="100" r="3" fill="#10b981" />
          <text x="168" y="104" fontSize="11" fill="#10b981" fontWeight="bold">P</text>

          {/* d-mål for hver */}
          <line x1="155" y1="50" x2="155" y2="95" stroke="#6b7280" strokeDasharray="2 2" />
          <line x1="155" y1="105" x2="155" y2="150" stroke="#6b7280" strokeDasharray="2 2" />
          <text x="135" y="78" fontSize="10" fill="#6b7280">d</text>
          <text x="135" y="130" fontSize="10" fill="#6b7280">d</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=+7{,}00\;\mu\text{C}" /> i +y, <InlineLatex latex="\vec v=v\,\hat i" />, <InlineLatex latex="v=4{,}60\times 10^{6}\;\text{m/s}" /></li>
        <li><InlineLatex latex="q'=+2{,}00\;\mu\text{C}" /> i −y, <InlineLatex latex="\vec v\,'=-v'\,\hat i" />, <InlineLatex latex="v'=9{,}20\times 10^{6}\;\text{m/s}" /></li>
        <li><InlineLatex latex="d=0{,}130\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="\vec B_\text{netto}" /> i P. (b) Coulomb-kraft, magnetisk kraft, og forholdet.</p>,
    strategy: (
      <TheoryBox title="Superposisjon: regn felt fra hver ladning, så summer">
        <p>
          Magnetfelt er additivt: <InlineLatex latex="\vec B_\text{netto}=\vec B_q+\vec B_{q'}" />.
          For del (b), bruk Coulomb (<InlineLatex latex="F_E=k|qq'|/(2d)^2" />) og magnetisk kraft via
          <InlineLatex latex="\;\vec F_B=q'\vec v\,'\times\vec B_q" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>For q: r̂ peker fra q (over) til P (under), så <InlineLatex latex="\hat r=-\hat j" />.</p> },
      { label: "Hint 2", content: <p>For q': r̂ peker fra q' (under) til P (over), så <InlineLatex latex="\hat r=+\hat j" />.</p> },
      { label: "Hint 3", content: <p>Begge B peker i samme retning! Sjekk: positivt q i +x med r̂ ned gir kryss <InlineLatex latex="\hat i\times(-\hat j)=-\hat k" />. Positivt q' i −x med r̂ opp gir <InlineLatex latex="(-\hat i)\times\hat j=-\hat k" />. Begge i −z.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="To kilder = to felt = legg sammen som vektorer">
          <p>
            Superposisjons­prinsippet er like sentralt for B-feltet som for E-feltet. Vi regner
            <InlineLatex latex="\;\vec B_q" /> og <InlineLatex latex="\vec B_{q'}" /> hver for seg, og legger sammen.
            Koordinat­valg: q over P (på +y-aksen, i avstand d), q' under P (på −y-aksen, avstand d). P er origo.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Felt fra q i P">
          <p>
            r̂ fra q til P peker «nedover», dvs. <InlineLatex latex="\hat r=-\hat j" />. v er +x. Krysspro­dukt:
          </p>
          <FormulaBox latex="\vec v\times\hat r=v\,\hat i\times(-\hat j)=-v\,\hat k" />
          <FormulaBox latex="B_q=\dfrac{\mu_0}{4\pi}\dfrac{qv}{d^2}=10^{-7}\dfrac{(7\times 10^{-6})(4{,}60\times 10^{6})}{(0{,}130)^2}=1{,}91\times 10^{-4}\;\text{T}" />
          <p><InlineLatex latex="\vec B_q=-1{,}91\times 10^{-4}\,\hat k\;\text{T}" /> (inn i arket).</p>
        </Step>
        <Step n={2} title="(a) Felt fra q' i P">
          <p>
            r̂ fra q' til P peker «oppover», dvs. <InlineLatex latex="\hat r=+\hat j" />. v' er −x. Krysspro­dukt:
          </p>
          <FormulaBox latex="\vec v\,'\times\hat r=-v'\,\hat i\times\hat j=-v'\,\hat k" />
          <FormulaBox latex="B_{q'}=\dfrac{\mu_0}{4\pi}\dfrac{q'v'}{d^2}=10^{-7}\dfrac{(2\times 10^{-6})(9{,}20\times 10^{6})}{(0{,}130)^2}=1{,}09\times 10^{-4}\;\text{T}" />
          <p><InlineLatex latex="\vec B_{q'}=-1{,}09\times 10^{-4}\,\hat k\;\text{T}" /> (også inn i arket).</p>
        </Step>
        <Step n={3} title="(a) Sum">
          <FormulaBox variant="gold" latex="\vec B_\text{netto}=-(1{,}91+1{,}09)\times 10^{-4}\,\hat k=-3{,}00\times 10^{-4}\,\hat k\;\text{T}" />
          <p><strong>0,300 mT inn i arket.</strong></p>
        </Step>
        <Step n={4} title="(b) Elektrisk kraft mellom dem">
          <p>
            Avstand er <InlineLatex latex="2d=0{,}260" /> m. Coulomb:
          </p>
          <FormulaBox latex="F_E=\dfrac{1}{4\pi\varepsilon_0}\dfrac{qq'}{(2d)^2}=(8{,}99\times 10^{9})\dfrac{(7\times 10^{-6})(2\times 10^{-6})}{(0{,}260)^2}" />
          <FormulaBox latex="F_E=1{,}86\;\text{N}" />
          <p>
            Frastøtende (samme fortegn). Retter seg langs y-aksen — q skyves opp (+y), q' skyves ned (−y).
          </p>
        </Step>
        <Step n={5} title="(b) Magnetisk kraft q gir på q'">
          <p>
            Først: B fra q ved <em>posisjonen til q'</em> (avstand 2d, r̂=−ĵ fra q til q'):
          </p>
          <FormulaBox latex="B_q@q'=10^{-7}\dfrac{(7\times 10^{-6})(4{,}60\times 10^{6})}{(0{,}260)^2}=4{,}77\times 10^{-5}\;\text{T (i }-\hat k)" />
          <p>Lorentz på q' (som beveger seg i −x):</p>
          <FormulaBox latex="\vec F_B=q'\vec v\,'\times\vec B_q=(2\times 10^{-6})(-9{,}20\times 10^{6}\hat i)\times(-4{,}77\times 10^{-5}\hat k)" />
          <p>
            Bruk <InlineLatex latex="\hat i\times\hat k=-\hat j" />:
          </p>
          <FormulaBox latex="\vec F_B=(2\times 10^{-6})(9{,}20\times 10^{6})(4{,}77\times 10^{-5})(-\hat j)=-8{,}77\times 10^{-4}\,\hat j\;\text{N}" />
          <p>Magnetisk kraft 0,877 mN i −y (mot q). Coulomb-kraften er +y (fra hverandre); magnetisk «motvirker» Coulomb her.</p>
        </Step>
        <Step n={6} title="(b) Forhold elektrisk/magnetisk">
          <FormulaBox latex="\dfrac{F_E}{F_B}=\dfrac{1{,}86}{8{,}77\times 10^{-4}}\approx 2120" />
          <p>Coulomb dominerer med faktor ~2000. Det stemmer: forventet forhold er <InlineLatex latex="c^2/(vv')\approx 2120" />.</p>
        </Step>
        <FormulaBox variant="gold" latex="(a)\;\vec B=3{,}00\times 10^{-4}\,\text{T (inn i arket)},\;\;F_E/F_B\approx 2120" />
        <p className="mt-2 italic text-[var(--muted)]">
          Forholdet <InlineLatex latex="F_E/F_B=c^2/(vv')" /> er fundamentalt: i grensen <InlineLatex latex="v\to c" /> blir
          de like store. Magnetisme er en «relativistisk korreksjon» til Coulomb. For vanlige ladninger som beveger seg sakte
          er magnetisme alltid mye svakere enn elektrisk — derfor merker vi den først når ladningene er organisert i strømmer.
        </p>
      </div>
    ),
    summary: (
      <p>
        Superposisjon for B akkurat som for E. Magnetiske og elektriske krefter står ofte ortogonalt — og forholdet
        <InlineLatex latex="\;F_E/F_B\sim c^2/v^2" /> forklarer hvorfor magnetisme er «svak» i hverdagen.
      </p>
    ),
  },

  // ==========================================================================
  // 28.11 — Strømelement langs z-aksen (Biot-Savart)
  // ==========================================================================
  "28.11": {
    title: "B fra 0,500 mm strømelement langs z-aksen",
    difficulty: "middels",
    pageRef: "s. 974",
    problem: (
      <div className="space-y-2">
        <p>
          En lang, rett ledning ligger langs z-aksen og fører strøm <InlineLatex latex="I=4{,}00\;\text{A}" /> i +z-retning.
          Et 0,500 mm langt segment av ledningen, sentrert i origo, gir et magnetfelt­bidrag. Finn magnet­feltet
          (størrelse og retning) som dette segmentet alene produserer i punktene:
        </p>
        <ul className="list-disc pl-6 text-sm space-y-0.5">
          <li>(a) <InlineLatex latex="x=2{,}00\;\text{m},\;y=0,\;z=0" /></li>
          <li>(b) <InlineLatex latex="x=0,\;y=2{,}00\;\text{m},\;z=0" /></li>
          <li>(c) <InlineLatex latex="x=2{,}00\;\text{m},\;y=2{,}00\;\text{m},\;z=0" /></li>
          <li>(d) <InlineLatex latex="x=0,\;y=0,\;z=2{,}00\;\text{m}" /></li>
        </ul>
        <svg viewBox="0 0 280 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* z-akse opp */}
          <line x1="120" y1="180" x2="120" y2="20" stroke="#6b7280" strokeWidth="1" />
          <text x="125" y="20" fontSize="10" fill="#6b7280">z</text>
          {/* x til høyre */}
          <line x1="120" y1="180" x2="260" y2="180" stroke="#6b7280" strokeWidth="1" />
          <text x="262" y="184" fontSize="10" fill="#6b7280">x</text>
          {/* y «ut av arket» (vises på skrå) */}
          <line x1="120" y1="180" x2="60" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 2" />
          <text x="55" y="98" fontSize="10" fill="#6b7280">y</text>
          {/* segment dl */}
          <rect x="115" y="95" width="10" height="20" fill="#ef4444" />
          <line x1="120" y1="95" x2="120" y2="60" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k28)" />
          <text x="125" y="80" fontSize="10" fill="#ef4444">dl, I</text>
          <text x="125" y="120" fontSize="9" fill="#ef4444">0,5 mm</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="d\vec l=(0{,}500\times 10^{-3})\hat k\;\text{m}" /> (segmentet langs +z)</li>
        <li><InlineLatex latex="I=4{,}00\;\text{A}" /></li>
      </ul>
    ),
    unknowns: <p>Magnet­felt­bidraget <InlineLatex latex="d\vec B" /> i fire punkter.</p>,
    strategy: (
      <TheoryBox title="Biot-Savart for strømelement">
        <p>
          <InlineLatex latex="d\vec B=\dfrac{\mu_0}{4\pi}\dfrac{I\,d\vec l\times\hat r}{r^2}" />.
          For hvert punkt: tegn r̂ fra origo til punktet, beregn <InlineLatex latex="d\vec l\times\hat r" />,
          og sett inn.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Når <InlineLatex latex="d\vec l\parallel\hat r" /> er bidraget null. Gjelder det noen av punktene?</p> },
      { label: "Hint 2", content: <p>Felles­faktor: <InlineLatex latex="\dfrac{\mu_0 I\,dl}{4\pi}=10^{-7}\cdot 4\cdot 5\times 10^{-4}=2\times 10^{-10}\;\text{T·m}^2" />.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Biot-Savart for et strømelement — bygge­steinen">
          <p>
            Dette er den «atomære» versjonen av Biot-Savart. Et lite segment <InlineLatex latex="d\vec l" /> som fører strøm
            I gir et felt­bidrag:
          </p>
          <FormulaBox variant="blue" latex="d\vec B=\dfrac{\mu_0}{4\pi}\dfrac{I\,d\vec l\times\hat r}{r^2}" />
          <p>
            For å finne feltet fra en hel kurve, integrerer man <InlineLatex latex="d\vec B" /> langs kurven. Men når
            segmentet er kort (her 0,5 mm) og felt­punktene er langt borte (her 2 m), kan vi behandle det som
            et infinitesimalt bidrag direkte. Retningen avgjøres av <InlineLatex latex="d\vec l\times\hat r" />.
          </p>
        </TheoryBox>
        <Step n={1} title="Felles­faktor">
          <p>
            Med <InlineLatex latex="dl=0{,}500\times 10^{-3}=5{,}00\times 10^{-4}\;\text{m}" /> og I=4,00 A:
          </p>
          <FormulaBox latex="\dfrac{\mu_0 I\,dl}{4\pi}=10^{-7}\cdot 4{,}00\cdot 5{,}00\times 10^{-4}=2{,}00\times 10^{-10}\;\text{T·m}^2" />
          <p>
            Da er <InlineLatex latex="dB=\dfrac{2{,}00\times 10^{-10}}{r^2}\sin\theta" />, hvor θ er vinkelen mellom
            <InlineLatex latex="\;d\vec l" /> (= +z) og r̂.
          </p>
        </Step>
        <Step n={2} title="(a) Punkt på +x-aksen">
          <p>
            <InlineLatex latex="\hat r=\hat i" />, vinkel mellom +z og +x er 90°, sin θ = 1, r=2,00 m.
            Krysspro­dukt: <InlineLatex latex="\hat k\times\hat i=\hat j" />.
          </p>
          <FormulaBox latex="dB=\dfrac{2\times 10^{-10}}{4}=5{,}00\times 10^{-11}\;\text{T}" />
          <p><strong>50 pT i +y-retning.</strong></p>
        </Step>
        <Step n={3} title="(b) Punkt på +y-aksen">
          <p>
            <InlineLatex latex="\hat r=\hat j" />, sin θ = 1.
            <InlineLatex latex="\hat k\times\hat j=-\hat i" />.
          </p>
          <FormulaBox latex="dB=5{,}00\times 10^{-11}\;\text{T}" />
          <p><strong>50 pT i −x-retning.</strong></p>
        </Step>
        <Step n={4} title="(c) Punkt på diagonal i xy-planet">
          <p>
            <InlineLatex latex="\vec r=(2;\,2;\,0)" />, <InlineLatex latex="\;r=2\sqrt 2=2{,}828\;\text{m}" />,
            <InlineLatex latex="\;r^2=8{,}00" />. r̂ ligger i xy-planet, vinkel med +z er 90°, sin θ = 1.
            <InlineLatex latex="\;\hat r=\tfrac{1}{\sqrt 2}(\hat i+\hat j)" />.
          </p>
          <FormulaBox latex="\hat k\times\hat r=\tfrac{1}{\sqrt 2}(\hat k\times\hat i+\hat k\times\hat j)=\tfrac{1}{\sqrt 2}(\hat j-\hat i)" />
          <p>Størrelsen er 1, så:</p>
          <FormulaBox latex="dB=\dfrac{2\times 10^{-10}}{8{,}00}=2{,}50\times 10^{-11}\;\text{T}" />
          <p><strong>25 pT i retning <InlineLatex latex="(-\hat i+\hat j)/\sqrt 2" /></strong> (NV i xy-planet).</p>
        </Step>
        <Step n={5} title="(d) Punkt på +z — segmentet peker rett mot punktet">
          <p>
            <InlineLatex latex="\hat r=\hat k" /> parallell med <InlineLatex latex="d\vec l" />. Da er
            <InlineLatex latex="\;d\vec l\times\hat r=0" />.
          </p>
          <FormulaBox variant="gold" latex="d\vec B=0" />
          <p>
            Fysisk intuisjon: et strømelement gir ikke felt på sin egen «strøm­linje» — bare til siden.
          </p>
        </Step>
        <FormulaBox variant="gold" latex="(a)\;50\,\text{pT}\,(+\hat j)\;\;(b)\;50\,\text{pT}\,(-\hat i)\;\;(c)\;25\,\text{pT}\,\tfrac{-\hat i+\hat j}{\sqrt 2}\;\;(d)\;0" />
        <p className="mt-2 italic text-[var(--muted)]">
          Bidragene er små (titalls pikoTesla) — derfor må man integrere <em>hele</em> ledningen for å få et målbart
          felt. Når man gjør det i grensen «uendelig lang ledning» får man <InlineLatex latex="B=\mu_0 I/(2\pi r)" />.
          Dette er nøkkel­broen til neste seksjon.
        </p>
      </div>
    ),
    summary: (
      <p>
        Biot-Savart for et lite strømelement: <InlineLatex latex="d\vec B\propto I\,d\vec l\times\hat r/r^2" />.
        Bidraget er null langs strømmen og maksimalt vinkelrett på den. Hele lange ledere får man ved integrasjon.
      </p>
    ),
  },

  // ==========================================================================
  // 28.19 — Ledning langs y-aksen + uniformt B0 i +x (Fig E28.19)
  // ==========================================================================
  "28.19": {
    title: "Ledning + uniformt felt — superposisjon (Fig E28.19)",
    difficulty: "vanskelig",
    pageRef: "s. 974",
    problem: (
      <div className="space-y-2">
        <p>
          En lang, rett ledning ligger langs y-aksen og fører strøm <InlineLatex latex="I=8{,}00\;\text{A}" /> i −y-retning
          (Fig. E28.19). I tillegg til feltet fra ledningen, finnes et uniformt magnet­felt
          <InlineLatex latex="\;\vec B_0" /> med størrelse <InlineLatex latex="1{,}50\times 10^{-6}\;\text{T}" /> i +x-retning.
          Finn det totale feltet (størrelse og retning) i følgende punkter i xz-planet:
        </p>
        <ul className="list-disc pl-6 text-sm space-y-0.5">
          <li>(a) <InlineLatex latex="x=0,\;z=1{,}00\;\text{m}" /></li>
          <li>(b) <InlineLatex latex="x=1{,}00\;\text{m},\;z=0" /></li>
          <li>(c) <InlineLatex latex="x=0,\;z=-0{,}25\;\text{m}" /></li>
        </ul>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* y-aksen vertikalt */}
          <line x1="160" y1="20" x2="160" y2="180" stroke="#000" strokeWidth="2" />
          <text x="166" y="20" fontSize="11" fill="#374151" fontWeight="bold">y</text>
          {/* I peker nedover (-y) */}
          <line x1="160" y1="40" x2="160" y2="170" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red-k28)" />
          <text x="142" y="55" fontSize="11" fill="#ef4444" fontWeight="bold">I</text>
          {/* x-akse */}
          <line x1="160" y1="100" x2="290" y2="100" stroke="#6b7280" strokeWidth="1" />
          <text x="293" y="103" fontSize="10" fill="#6b7280">x</text>
          {/* z-akse skrått inn */}
          <line x1="160" y1="100" x2="100" y2="160" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 2" />
          <text x="92" y="170" fontSize="10" fill="#6b7280">z</text>
          {/* B0 i +x */}
          <line x1="200" y1="100" x2="240" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k28)" />
          <text x="245" y="104" fontSize="10" fill="#3b82f6" fontWeight="bold">B₀</text>
          {/* punkter a, b, c */}
          <circle cx="120" cy="140" r="3" fill="#10b981" />
          <text x="100" y="148" fontSize="10" fill="#10b981">a</text>
          <circle cx="220" cy="100" r="3" fill="#10b981" />
          <text x="225" y="115" fontSize="10" fill="#10b981">b</text>
          <circle cx="140" cy="80" r="3" fill="#10b981" />
          <text x="125" y="80" fontSize="10" fill="#10b981">c</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Ledning på y-aksen, <InlineLatex latex="I=8{,}00\;\text{A}" /> i <InlineLatex latex="-\hat j" /></li>
        <li><InlineLatex latex="\vec B_0=1{,}50\times 10^{-6}\,\hat i\;\text{T}" /></li>
        <li>Felt­punkter i xz-planet</li>
      </ul>
    ),
    unknowns: <p>Total <InlineLatex latex="\vec B" /> i punktene a, b, c.</p>,
    strategy: (
      <TheoryBox title="Superposisjon: ledningsfelt + uniformt felt">
        <p>
          Ledningens felt har størrelse <InlineLatex latex="B_w=\mu_0 I/(2\pi r)" /> og rotasjon rundt aksen
          (høyrehånds­regel — peker tommel langs I, fingrene viser B). Det totale feltet er
          <InlineLatex latex="\;\vec B=\vec B_w+\vec B_0" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Med I i −y, peker ledningens B i +z-retning på +x-aksen og i −z-retning på −x-aksen.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="B_w=\mu_0 I/(2\pi r)=2\times 10^{-7}\cdot 8/r=1{,}60\times 10^{-6}/r" /> T.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Høyrehåndsregel for ledning langs −y">
          <p>
            Pek tommelen i strøm­retningen (−y, altså «nedover»). Da krøller fingrene fra +z mot −x mot −z mot +x og tilbake.
            På et punkt med koordinater <InlineLatex latex="(x,0,z)" /> peker B-feltet i retning som er perpendikulær til
            den radielle vektoren fra y-aksen til punktet, dreid 90° i fingrenes retning.
          </p>
          <p className="mt-2">
            For en strøm i +y ville vi rotert med klokken sett fra over (positiv y); for strøm i −y er det motsatt — mot klokken
            sett fra over. Praktisk regel: <InlineLatex latex="\vec B_w=\dfrac{\mu_0 I}{2\pi r}\,(\hat I\times\hat r)" /> hvor
            <InlineLatex latex="\;\hat I" /> er strømmens retning og r̂ peker fra ledningen til feltpunktet.
          </p>
        </TheoryBox>
        <Step n={1} title="Punkt (a): (x=0, z=1,00 m)">
          <p>
            Avstand fra ledning <InlineLatex latex="r=1{,}00\;\text{m}" />, r̂ = +k̂.
            <InlineLatex latex="\;\hat I=-\hat j" />.
          </p>
          <FormulaBox latex="\hat I\times\hat r=-\hat j\times\hat k=-\hat i" />
          <FormulaBox latex="B_w=\dfrac{(4\pi\times 10^{-7})(8{,}00)}{2\pi(1{,}00)}=1{,}60\times 10^{-6}\;\text{T}" />
          <p>
            Altså <InlineLatex latex="\vec B_w=-1{,}60\times 10^{-6}\,\hat i\;\text{T}" />. Sammen med
            <InlineLatex latex="\;\vec B_0=+1{,}50\times 10^{-6}\,\hat i" />:
          </p>
          <FormulaBox variant="gold" latex="\vec B_a=(-1{,}60+1{,}50)\times 10^{-6}\,\hat i=-1{,}0\times 10^{-7}\,\hat i\;\text{T}" />
          <p><strong>0,10 µT i −x-retning.</strong> Feltene er nesten like store og nesten kanselleres.</p>
        </Step>
        <Step n={2} title="Punkt (b): (x=1,00 m, z=0)">
          <p>
            r=1,00 m, r̂ = +î.
            <InlineLatex latex="\;\hat I\times\hat r=-\hat j\times\hat i=+\hat k" />.
          </p>
          <FormulaBox latex="\vec B_w=1{,}60\times 10^{-6}\,\hat k\;\text{T}" />
          <p>
            <InlineLatex latex="\vec B_w" /> i +z, <InlineLatex latex="\vec B_0" /> i +x — orthogonale. Sum­vektoren
            har størrelse:
          </p>
          <FormulaBox latex="|\vec B|=\sqrt{(1{,}50)^2+(1{,}60)^2}\times 10^{-6}=2{,}19\times 10^{-6}\;\text{T}" />
          <p>
            Vinkelen i xz-planet, målt fra +x mot +z:
            <InlineLatex latex="\;\theta=\arctan(1{,}60/1{,}50)=46{,}8°" />.
          </p>
          <FormulaBox variant="gold" latex="|\vec B_b|=2{,}19\,\mu\text{T},\;\;46{,}8°\text{ over +x mot +z}" />
        </Step>
        <Step n={3} title="Punkt (c): (x=0, z=−0,25 m)">
          <p>
            r=0,25 m, r̂ = −k̂.
            <InlineLatex latex="\;\hat I\times\hat r=-\hat j\times(-\hat k)=+\hat i" />.
          </p>
          <FormulaBox latex="B_w=\dfrac{(4\pi\times 10^{-7})(8{,}00)}{2\pi(0{,}25)}=6{,}40\times 10^{-6}\;\text{T}" />
          <p>
            Altså <InlineLatex latex="\vec B_w=+6{,}40\times 10^{-6}\,\hat i" />, samme retning som
            <InlineLatex latex="\vec B_0" />:
          </p>
          <FormulaBox variant="gold" latex="\vec B_c=(6{,}40+1{,}50)\times 10^{-6}\,\hat i=7{,}90\times 10^{-6}\,\hat i\;\text{T}" />
          <p><strong>7,90 µT i +x-retning.</strong> Feltene forsterker hverandre nær ledningen.</p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Tre lærdommer: (a) vektor­natur av B er essensielt — ikke skalar­sum; (b) ledningens felt avtar som
          1/r, så det dominerer nær ledningen og er underordnet langt unna; (c) høyre­hånds­regelen pluss
          riktig fortegn på r̂ gir riktig retning hver gang.
        </p>
      </div>
    ),
    summary: (
      <p>
        Når du har et felt fra en ledning <em>og</em> et uniformt felt, legg sammen som vektorer punkt for punkt.
        Lederfeltet kan forsterke, kansellere eller stå ortogonalt på det uniforme — geometrien avgjør.
      </p>
    ),
  },

  // ==========================================================================
  // 28.20 — BIO Transmission Lines (uten figur)
  // ==========================================================================
  "28.20": {
    title: "BIO Krafts­linjer — magnetfelt fra 150 A på 8,0 m høyde",
    difficulty: "lett",
    pageRef: "s. 974",
    problem: (
      <p>
        Strømmer i likestrøms krafts­linjer kan være 100 A eller høyere. Noen er bekymret for at elektromagnetiske felt
        fra slike linjer nær hjemmene deres kan utgjøre en helse­risiko. For en linje som fører 150 A på 8,0 m høyde over
        bakken, hvor stort magnetfelt produserer linjen i bakke­nivå? Uttrykk svaret i tesla og som prosent av jordens
        magnetfelt (~50 µT). Er denne verdien grunn til bekymring?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="I=150\;\text{A}" />, høyde <InlineLatex latex="r=8{,}0\;\text{m}" /></li>
        <li>Jordens felt ~50 µT</li>
      </ul>
    ),
    unknowns: <p>B i bakkenivå, og prosent av jordens felt.</p>,
    strategy: (
      <TheoryBox title="Lang rett leder">
        <p>
          <InlineLatex latex="B=\dfrac{\mu_0 I}{2\pi r}" />. Brukes uten endring fordi krafts­linjen er svært lang
          sammenlignet med 8 m.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p><InlineLatex latex="\mu_0/(2\pi)=2\times 10^{-7}\;\text{T·m/A}" /> som vanlig.</p> }],
    solution: (
      <div>
        <TheoryBox title="Hvorfor «lang rett leder»-formelen?">
          <p>
            Krafts­linjer strekker seg over titalls kilometer. På 8 m avstand «ser» linjen ut som uendelig lang —
            korreksjonene fra at den er endelig er forsvinnende små (&lt; 0,1 %). Vi kan derfor trygt bruke standard­formelen
            <InlineLatex latex="\;B=\mu_0 I/(2\pi r)" />.
          </p>
        </TheoryBox>
        <Step n={1} title="Sett inn i formelen">
          <FormulaBox latex="B=\dfrac{\mu_0 I}{2\pi r}=(2\times 10^{-7})\dfrac{150}{8{,}0}" />
          <FormulaBox latex="B=(2\times 10^{-7})(18{,}75)=3{,}75\times 10^{-6}\;\text{T}" />
          <FormulaBox variant="gold" latex="B\approx 3{,}8\;\mu\text{T}" />
        </Step>
        <Step n={2} title="Sammenlign med jordens felt">
          <FormulaBox latex="\dfrac{B}{B_\text{jord}}=\dfrac{3{,}75\,\mu\text{T}}{50\,\mu\text{T}}\approx 7{,}5\;\%" />
          <p>
            Altså ca. 7,5 % av jordens felt — én størrelses­orden mindre enn det vi konstant går i. Vanlig vurdering:
            ingen påvist helse­risiko ved slike statiske felt­nivåer. (Til sammenligning gir en MR-maskin
            <InlineLatex latex="\sim 1{,}5" /> T = 30 000× jordens felt, og er trygg.)
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Pedagogisk poeng: <InlineLatex latex="1/r" />-avstands­avhengighet betyr at en doblet strøm kompenseres lett av
          en doblet avstand. 8 m er ikke spesielt langt unna — men feltet er likevel lite. Det er derfor de fleste forskere
          ikke bekymrer seg for likestrøms­linjer i bakke­nivå.
        </p>
      </div>
    ),
    summary: (
      <p>
        Lang rett leder gir <InlineLatex latex="B=\mu_0 I/(2\pi r)" />. 150 A på 8 m gir ~3,8 µT — under 10 % av
        jordens felt, og dermed innenfor det vi naturlig eksponeres for.
      </p>
    ),
  },

  // ==========================================================================
  // 28.21 — To parallelle ledere 10 cm (Fig E28.21)
  // ==========================================================================
  "28.21": {
    title: "To parallelle ledere — felt i tre punkter (Fig E28.21)",
    difficulty: "middels",
    pageRef: "s. 974",
    problem: (
      <div className="space-y-2">
        <p>
          To lange, rette, parallelle ledere ligger 10,0 cm fra hverandre og fører like store strømmer på 4,00 A i samme
          retning, slik som vist i Fig. E28.21 (begge strømmer ut av papiret). Finn størrelse og retning av magnet­feltet i
          punktene:
        </p>
        <ul className="list-disc pl-6 text-sm space-y-0.5">
          <li>(a) <InlineLatex latex="P_1" />, midt mellom lederne</li>
          <li>(b) <InlineLatex latex="P_2" />, 25,0 cm til høyre for <InlineLatex latex="P_1" /></li>
          <li>(c) <InlineLatex latex="P_3" />, 20,0 cm rett over <InlineLatex latex="P_1" /></li>
        </ul>
        <svg viewBox="0 0 360 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* venstre ledning, ut av papir */}
          <circle cx="100" cy="120" r="9" fill="none" stroke="#ef4444" strokeWidth="2" />
          <circle cx="100" cy="120" r="2.5" fill="#ef4444" />
          <text x="80" y="145" fontSize="10" fill="#ef4444" fontWeight="bold">I</text>
          {/* høyre ledning */}
          <circle cx="200" cy="120" r="9" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="200" cy="120" r="2.5" fill="#3b82f6" />
          <text x="195" y="145" fontSize="10" fill="#3b82f6" fontWeight="bold">I</text>
          {/* mål 10 cm mellom */}
          <line x1="100" y1="160" x2="200" y2="160" stroke="#6b7280" strokeWidth="1" />
          <text x="135" y="175" fontSize="10" fill="#6b7280">10,0 cm</text>
          {/* P1 midt mellom */}
          <circle cx="150" cy="120" r="3" fill="#10b981" />
          <text x="143" y="113" fontSize="10" fill="#10b981" fontWeight="bold">P₁</text>
          {/* P2 25 cm til høyre */}
          <circle cx="290" cy="120" r="3" fill="#10b981" />
          <text x="283" y="113" fontSize="10" fill="#10b981" fontWeight="bold">P₂</text>
          {/* P3 20 cm over P1 */}
          <circle cx="150" cy="50" r="3" fill="#10b981" />
          <text x="155" y="50" fontSize="10" fill="#10b981" fontWeight="bold">P₃</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>To ledere, avstand 10,0 cm; <InlineLatex latex="I=4{,}00\;\text{A}" /> ut av papiret hver</li>
        <li><InlineLatex latex="P_1" /> midt mellom; <InlineLatex latex="P_2" /> 25 cm h. for <InlineLatex latex="P_1" />; <InlineLatex latex="P_3" /> 20 cm over <InlineLatex latex="P_1" /></li>
      </ul>
    ),
    unknowns: <p>B (størrelse + retning) i tre punkter.</p>,
    strategy: (
      <TheoryBox title="Superposisjon to ledere">
        <p>
          Hver leder gir et B med høyre­hånds­regelen: peke tommel ut av papiret, fingrene viser B mot klokken (sett fra
          deg). Legg sammen vektorielt.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>I P₁: feltene fra de to lederne peker motsatt vei (oppover fra én, nedover fra andre) — kanselleres!</p> },
      { label: "Hint 2", content: <p>I P₃ ligger lederne symmetrisk; vektorene legger seg på en bestemt geometrisk måte.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Felles formel">
          <p>
            Hver leder gir <InlineLatex latex="B=\mu_0 I/(2\pi r)" /> tangentielt om aksen, retning fra
            høyre­hånds­regel. Strøm ut av papiret ⇒ B mot klokken.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) P₁ midt mellom">
          <p>
            Avstand fra hver leder: 5,0 cm = 0,050 m.
            Strøm­ut-fra-venstre lager B oppover ved P₁ (mot klokken sett mot deg);
            strøm­ut-fra-høyre lager B nedover ved P₁.
          </p>
          <p>Begge har samme størrelse:</p>
          <FormulaBox latex="B_1=\dfrac{\mu_0 I}{2\pi r}=(2\times 10^{-7})\dfrac{4{,}00}{0{,}050}=1{,}60\times 10^{-5}\;\text{T}" />
          <p>Men motsatt retning ⇒ summen er null:</p>
          <FormulaBox variant="gold" latex="\vec B_{P_1}=0" />
        </Step>
        <Step n={2} title="(b) P₂, 25 cm til høyre for P₁">
          <p>
            Avstand fra venstre leder: <InlineLatex latex="5+25=30\;\text{cm}=0{,}30\;\text{m}" />.
            Avstand fra høyre leder: <InlineLatex latex="25-5=20\;\text{cm}=0{,}20\;\text{m}" />.
          </p>
          <p>
            Begge ledninger lager B i samme retning ved P₂: tenk høyre­hånds­regelen — strøm ut, fingre rundt mot klokken.
            Til høyre for begge ledere peker B nedover (i papiret) — altså samme retning. Da legges størrelsene sammen:
          </p>
          <FormulaBox latex="B_\text{venstre}=(2\times 10^{-7})\dfrac{4}{0{,}30}=2{,}67\times 10^{-6}\;\text{T}" />
          <FormulaBox latex="B_\text{høyre}=(2\times 10^{-7})\dfrac{4}{0{,}20}=4{,}00\times 10^{-6}\;\text{T}" />
          <FormulaBox variant="gold" latex="B_{P_2}=2{,}67+4{,}00=6{,}67\times 10^{-6}\;\text{T (nedover)}" />
        </Step>
        <Step n={3} title="(c) P₃, 20 cm rett over P₁">
          <p>
            Avstand fra hver leder via Pytagoras:
            <InlineLatex latex="\;r=\sqrt{(0{,}05)^2+(0{,}20)^2}=\sqrt{0{,}0425}=0{,}2062\;\text{m}" />.
          </p>
          <FormulaBox latex="B_\text{en}=(2\times 10^{-7})\dfrac{4}{0{,}2062}=3{,}88\times 10^{-6}\;\text{T}" />
          <p>
            Hver vektor er tangentiell til sin sirkel (vinkelrett på r). De har en horisontal komponent
            (motsatt vei, kanselleres ut) og en vertikal komponent (samme vei, summeres). Vinkel mellom r og horisontalen:
            <InlineLatex latex="\;\cos\alpha=0{,}05/0{,}2062=0{,}2425" />, så
            <InlineLatex latex="\;\alpha\approx 76°" />. Den horisontale komponenten av B er
            <InlineLatex latex="\;B\sin\alpha" />, vertikal er <InlineLatex latex="B\cos\alpha" />.
          </p>
          <p>
            Faktisk er det enklere: dekompensering gir kanselleringen av vertikal komponent (ut/inn fra paret), og
            sammensetning av horisontal komponent. La meg være presis: B fra venstre er tangentiell oppover-til-høyre;
            fra høyre er tangentiell oppover-til-venstre. Z-komponentene (langs paret) kanselleres; x-komponentene (vekk fra
            paret) er null; y-komponentene (oppover, vekk fra P₁) summeres.
          </p>
          <FormulaBox latex="B_y=2 B_\text{en}\dfrac{0{,}05}{0{,}2062}=2(3{,}88\times 10^{-6})(0{,}2425)=1{,}88\times 10^{-6}\;\text{T}" />
          <p>
            Vent — sjekk geometri på nytt. La oss sette koordinater: venstre leder ved (−5, 0), høyre ved (+5, 0), P₃ ved (0, +20)
            (alle i cm). Vektoren fra venstre leder til P₃ er (5, 20), normalisert. B-feltet fra venstre ledning er
            tangentielt: dvs. roter (5,20) med 90° mot klokken (siden strøm­ut, B mot klokken). Det gir (−20, 5), normalisert.
            Tilsvarende fra høyre: vektor fra høyre til P₃ er (−5, 20), roter 90° mot klokken: (−20, −5), normalisert.
            Sum­vektoren har retning (−40, 0)/r — altså i ren −x-retning! Begge x-komponenter er like, y-komponentene
            kanselleres.
          </p>
          <FormulaBox latex="B_{P_3,x}=-2 B_\text{en}\dfrac{20}{20{,}62}=-2(3{,}88\times 10^{-6})(0{,}970)=-7{,}53\times 10^{-6}\;\text{T}" />
          <FormulaBox variant="gold" latex="\vec B_{P_3}=7{,}53\times 10^{-6}\;\text{T mot venstre (−x)}" />
        </Step>
        <FormulaBox variant="gold" latex="P_1:\;0\quad P_2:\;6{,}67\,\mu\text{T (ned)}\quad P_3:\;7{,}53\,\mu\text{T (mot venstre)}" />
        <p className="mt-2 italic text-[var(--muted)]">
          Symmetri­tips: når punktet ligger på en symmetri­akse (P₁ midt mellom, P₃ rett over) kanselleres halvparten av
          komponentene automatisk. Det gjør oppgaven mye lettere — bare regn ut den komponenten som overlever.
        </p>
      </div>
    ),
    summary: (
      <p>
        Felt fra to like, parallelle ledere med strøm i samme retning kanselleres mellom lederne, forsterkes utenfor.
        Vektor­dekomponering med symmetri­argumenter er den raskeste veien.
      </p>
    ),
  },

  // ==========================================================================
  // 28.27 — Ledning over ledning, slidende (Fig E28.27)
  // ==========================================================================
  "28.27": {
    title: "Sliding ledning over ledning — likevektshøyde (Fig E28.27)",
    difficulty: "vanskelig",
    pageRef: "s. 975",
    problem: (
      <div className="space-y-2">
        <p>
          En lang, horisontal ledning AB ligger på en bord­overflate og fører strøm I. En horisontal ledning CD er
          vertikalt over AB, og kan gli opp og ned uten friksjon på to vertikale metall­skinner C og D (Fig. E28.27).
          CD er koblet via skinnene til samme strømkilde slik at den fører strøm I i motsatt retning av strømmen i AB.
          Lengden på CD er λ kg/m i masse per meter. Til hvilken likevekts­høyde h vil CD stige, dersom magnet­kraften på den
          skyldes utelukkende strømmen i AB?
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* AB nederst */}
          <line x1="60" y1="170" x2="280" y2="170" stroke="#ef4444" strokeWidth="3" />
          <text x="60" y="186" fontSize="11" fill="#ef4444" fontWeight="bold">A</text>
          <text x="275" y="186" fontSize="11" fill="#ef4444" fontWeight="bold">B</text>
          <line x1="170" y1="170" x2="220" y2="170" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k28)" />
          <text x="195" y="186" fontSize="10" fill="#ef4444">I</text>
          {/* skinnene C og D */}
          <line x1="80" y1="170" x2="80" y2="40" stroke="#6b7280" strokeWidth="2" />
          <line x1="260" y1="170" x2="260" y2="40" stroke="#6b7280" strokeWidth="2" />
          <text x="65" y="40" fontSize="11" fill="#6b7280" fontWeight="bold">C</text>
          <text x="265" y="40" fontSize="11" fill="#6b7280" fontWeight="bold">D</text>
          {/* CD i likevekt */}
          <line x1="80" y1="80" x2="260" y2="80" stroke="#3b82f6" strokeWidth="3" />
          <line x1="220" y1="80" x2="170" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k28)" />
          <text x="190" y="74" fontSize="10" fill="#3b82f6">I</text>
          {/* h-mål */}
          <line x1="295" y1="170" x2="295" y2="80" stroke="#10b981" strokeDasharray="2 2" />
          <text x="298" y="125" fontSize="11" fill="#10b981" fontWeight="bold">h</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Strøm <InlineLatex latex="I" /> i begge ledere, motsatt retning</li>
        <li>Lineær masse­tetthet av CD: <InlineLatex latex="\lambda" /> (kg/m)</li>
      </ul>
    ),
    unknowns: <p>Likevektshøyde h.</p>,
    strategy: (
      <TheoryBox title="Likevekt: tyngde balanseres av magnetisk frastøtning">
        <p>
          Motsatte strømmer frastøter. CD svever når magnetisk frastøtning per meter er lik tyngde per meter:
          <InlineLatex latex="\;F_B/L=\lambda g" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Kraft per meter mellom parallelle ledere: <InlineLatex latex="F/L=\mu_0 I^2/(2\pi h)" />.</p> },
      { label: "Hint 2", content: <p>Sett <InlineLatex latex="F/L=\lambda g" /> og løs for h.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Hvorfor frastøter motsatte strømmer hverandre?">
          <p>
            Strøm i AB lager et B-felt rundt seg (mot klokken sett fra +I-siden). Ved CD, som ligger over, peker B-feltet
            i én retning (si i +x). CD har strøm i motsatt retning av AB. Lorentz på CD er
            <InlineLatex latex="\;\vec F=I\vec L\times\vec B" />, og resultatet er en kraft <em>oppover</em> — bort fra AB.
            Dette er den klassiske «motsatt strøm = frastøtning»-regelen.
          </p>
        </TheoryBox>
        <Step n={1} title="Sett opp likevekt">
          <p>
            CD har masse per meter λ, så tyngde per meter er <InlineLatex latex="\lambda g" /> nedover. Magnetisk frastøtning
            per meter (fra rett-leder-formel og Lorentz):
          </p>
          <FormulaBox variant="blue" latex="\dfrac{F_B}{L}=\dfrac{\mu_0 I^2}{2\pi h}" />
          <p>I likevekt:</p>
          <FormulaBox latex="\dfrac{\mu_0 I^2}{2\pi h}=\lambda g" />
        </Step>
        <Step n={2} title="Algebraisk omforming for h">
          <p>Multipliser begge sider med h, del på <InlineLatex latex="\lambda g" />:</p>
          <FormulaBox latex="h=\dfrac{\mu_0 I^2}{2\pi\lambda g}" />
          <FormulaBox variant="gold" latex="\boxed{\;h=\dfrac{\mu_0 I^2}{2\pi\lambda g}\;}" />
        </Step>
        <Pitfall>
          Stabilitet: høyere h ⇒ svakere kraft. Hvis CD ved en tilfeldighet kommer litt opp, blir kraften mindre enn
          tyngden — den faller ned igjen. Hvis den faller, blir kraften større enn tyngden — den løftes. Derfor er
          h en <em>stabil</em> likevekt.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Tall­eksempel: hvis I = 50 A og λ = 0,050 kg/m, blir
          <InlineLatex latex="\;h=(4\pi\times 10^{-7})(2500)/(2\pi\cdot 0{,}050\cdot 9{,}81)=1{,}02\times 10^{-3}" /> m = 1 mm.
          Demonstrert i klasserommet med tynn aluminium-ledning og kraftig batteri.
        </p>
      </div>
    ),
    summary: (
      <p>
        Magnetisk levitasjon i sin enkleste form: motsatte strømmer balanserer tyngde.
        <InlineLatex latex="\;h=\mu_0 I^2/(2\pi\lambda g)" /> — like elegant som det er stabilt.
      </p>
    ),
  },

  // ==========================================================================
  // 28.29 — Parallelle ledere 0,400 m (Fig E28.29)
  // ==========================================================================
  "28.29": {
    title: "Kraft mellom parallelle ledere (Fig E28.29)",
    difficulty: "lett",
    pageRef: "s. 975",
    problem: (
      <div className="space-y-2">
        <p>
          To lange, parallelle ledere er separert med en avstand på 0,400 m (Fig. E28.29). Strømmene
          <InlineLatex latex="\;I_1=5{,}00\;\text{A}" /> og <InlineLatex latex="I_2=2{,}00\;\text{A}" /> har retning som vist.
          (a) Beregn størrelsen av kraften som hver leder utøver på en 1,20 m lengde av den andre. Er denne kraften
          tiltrekkende eller frastøtende? (b) Hver strøm dobles, slik at <InlineLatex latex="I_1=10{,}0\;\text{A}" /> og
          <InlineLatex latex="\;I_2=4{,}00\;\text{A}" />. Hva er nå kraften på en 1,20 m lengde?
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* I_1 over, I_2 under, ulike retninger */}
          <line x1="60" y1="60" x2="280" y2="60" stroke="#ef4444" strokeWidth="3" />
          <line x1="170" y1="60" x2="220" y2="60" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k28)" />
          <text x="60" y="50" fontSize="11" fill="#ef4444" fontWeight="bold">I₁ = 5,00 A</text>

          <line x1="60" y1="140" x2="280" y2="140" stroke="#3b82f6" strokeWidth="3" />
          <line x1="220" y1="140" x2="170" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k28)" />
          <text x="60" y="160" fontSize="11" fill="#3b82f6" fontWeight="bold">I₂ = 2,00 A</text>

          {/* avstand 0,400 m */}
          <line x1="40" y1="60" x2="40" y2="140" stroke="#10b981" strokeDasharray="3 2" />
          <text x="0" y="105" fontSize="10" fill="#10b981">0,400 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="r=0{,}400\;\text{m}" />, <InlineLatex latex="L=1{,}20\;\text{m}" /></li>
        <li>(a) <InlineLatex latex="I_1=5{,}00\;\text{A},\;I_2=2{,}00\;\text{A}" />, motsatt retning</li>
        <li>(b) Begge doblet</li>
      </ul>
    ),
    unknowns: <p>Kraft og retning (tiltrekkende/frastøtende).</p>,
    strategy: (
      <TheoryBox title="Kraft per lengde mellom parallelle ledere">
        <p>
          <InlineLatex latex="F/L=\mu_0 I_1 I_2/(2\pi r)" />. Samme retning ⇒ tiltrekning, motsatt ⇒ frastøtning.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Doblet I₁ og I₂ ⇒ kraften firedobles (kvadratisk).</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Hvor kommer F/L = μ₀I₁I₂/(2πr) fra?">
          <p>
            Leder 1 lager felt <InlineLatex latex="B_1=\mu_0 I_1/(2\pi r)" /> ved leder 2. Leder 2 har strøm
            <InlineLatex latex="\;I_2" /> i et B-felt, så Lorentz gir kraft per lengde
            <InlineLatex latex="\;F/L=I_2 B_1=\mu_0 I_1 I_2/(2\pi r)" />. Dette er nettopp definisjonen av en ampere
            i det gamle SI-systemet.
          </p>
        </TheoryBox>
        <Step n={1} title="(a) Kraft per lengde, så ganger 1,20 m">
          <FormulaBox latex="\dfrac{F}{L}=\dfrac{\mu_0 I_1 I_2}{2\pi r}=(2\times 10^{-7})\dfrac{(5{,}00)(2{,}00)}{0{,}400}" />
          <FormulaBox latex="\dfrac{F}{L}=(2\times 10^{-7})(25)=5{,}00\times 10^{-6}\;\text{N/m}" />
          <FormulaBox latex="F=(5{,}00\times 10^{-6})(1{,}20)=6{,}00\times 10^{-6}\;\text{N}" />
          <FormulaBox variant="gold" latex="F=6{,}00\;\mu\text{N},\;\text{frastøtende (motsatte strømmer)}" />
        </Step>
        <Step n={2} title="(b) Strømmer doblet">
          <p>
            Med <InlineLatex latex="I_1=10{,}0,\;I_2=4{,}00" />: produktet <InlineLatex latex="\;I_1 I_2" /> firedobles.
          </p>
          <FormulaBox latex="F=4\cdot 6{,}00=24{,}0\;\mu\text{N}" />
          <FormulaBox variant="gold" latex="F=2{,}40\times 10^{-5}\;\text{N},\;\text{fortsatt frastøtende}" />
        </Step>
        <Pitfall>
          Husk at kraften er kvadratisk i strømmen <em>bare</em> hvis begge dobles. Hvis bare én dobles, dobles kraften.
          Ikke forveksle de to scenariene.
        </Pitfall>
      </div>
    ),
    summary: (
      <p>
        Kraft mellom parallelle ledere skaleres som <InlineLatex latex="I_1 I_2/r" />. Doble begge ⇒ firedobler kraften.
        Motsatte strømmer ⇒ frastøtning.
      </p>
    ),
  },

  // ==========================================================================
  // 28.30 — F/L gitt, finn ukjent strøm
  // ==========================================================================
  "28.30": {
    title: "Bestem strøm fra kraft per lengde",
    difficulty: "lett",
    pageRef: "s. 975",
    problem: (
      <p>
        To lange, parallelle ledere er separert med en avstand på 2,50 cm. Kraften per enhets­lengde som hver leder
        utøver på den andre er <InlineLatex latex="4{,}00\times 10^{-5}\;\text{N/m}" />, og lederne <em>frastøter</em>
        hverandre. Strømmen i den ene lederen er 0,600 A. (a) Hvor stor er strømmen i den andre lederen?
        (b) Går strømmene i samme eller motsatt retning?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="r=0{,}0250\;\text{m}" />, <InlineLatex latex="F/L=4{,}00\times 10^{-5}\;\text{N/m}" /></li>
        <li><InlineLatex latex="I_1=0{,}600\;\text{A}" />, frastøtende</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="I_2" /> og strøm­retningen relativt til <InlineLatex latex="I_1" />.</p>,
    strategy: (
      <TheoryBox title="Snu formelen og løs for I₂">
        <p>
          <InlineLatex latex="F/L=\mu_0 I_1 I_2/(2\pi r)\Rightarrow I_2=\dfrac{(F/L)\,2\pi r}{\mu_0 I_1}" />.
          Frastøtende ⇒ motsatte retninger.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk <InlineLatex latex="\mu_0/(2\pi)=2\times 10^{-7}" />, så <InlineLatex latex="I_2=(F/L)\cdot r/(2\times 10^{-7}\cdot I_1)" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Algebraisk omforming">
          <p>Fra <InlineLatex latex="F/L=\mu_0 I_1 I_2/(2\pi r)" /> løs for I₂:</p>
          <FormulaBox latex="I_2=\dfrac{(F/L)\cdot 2\pi r}{\mu_0 I_1}=\dfrac{(F/L)\cdot r}{(\mu_0/2\pi)\cdot I_1}" />
          <FormulaBox latex="I_2=\dfrac{(4{,}00\times 10^{-5})(0{,}0250)}{(2\times 10^{-7})(0{,}600)}" />
          <FormulaBox latex="I_2=\dfrac{1{,}00\times 10^{-6}}{1{,}20\times 10^{-7}}=8{,}33\;\text{A}" />
          <FormulaBox variant="gold" latex="I_2\approx 8{,}33\;\text{A}" />
        </Step>
        <Step n={2} title="(b) Retning">
          <p>
            Frastøtende ⇒ <strong>motsatt retning</strong>. (Husk regel: parallelle ledere med <em>samme</em> strøm­retning
            tiltrekker; motsatt ⇒ frastøtning.)
          </p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Sanity-sjekk: 0,600 A er ganske lite, 8,33 A er mer typisk for husholdnings­strøm. På 2,5 cm avstand gir det
          40 µN/m. Som referanse: SI-amperen er definert slik at to ledere på 1 m avstand med 1 A i hver gir
          <InlineLatex latex="\;2\times 10^{-7}" /> N/m.
        </p>
      </div>
    ),
    summary: (
      <p>
        Snu kraft­formelen for å løse for ukjent strøm. Tegnet (frastøtning vs. tiltrekning) avgjør om strømmene går i
        samme eller motsatt retning.
      </p>
    ),
  },

  // ==========================================================================
  // 28.61 — CP Hengende ledninger (Fig P28.61)
  // ==========================================================================
  "28.61": {
    title: "Hengende ledninger i likevekt (Fig P28.61)",
    difficulty: "vanskelig",
    pageRef: "s. 977",
    problem: (
      <div className="space-y-2">
        <p>
          To lange, parallelle ledere henger med 4,00 cm lange snorer fra en felles akse (Fig. P28.61). Lederne har
          masse per enhets­lengde 0,0130 kg/m og fører den samme strømmen i motsatte retninger. Hvor stor er strømmen i
          hver leder hvis snorene henger med 6,00° fra vertikalen?
        </p>
        <svg viewBox="0 0 320 220" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          {/* opphengs­punkt */}
          <line x1="40" y1="20" x2="280" y2="20" stroke="#374151" strokeWidth="2" />
          <circle cx="160" cy="20" r="3" fill="#374151" />
          {/* snor venstre, 6° fra vertikal */}
          <line x1="160" y1="20" x2="100" y2="180" stroke="#6b7280" strokeWidth="1.5" />
          <text x="105" y="100" fontSize="9" fill="#6b7280">4,00 cm</text>
          {/* snor høyre */}
          <line x1="160" y1="20" x2="220" y2="180" stroke="#6b7280" strokeWidth="1.5" />
          {/* venstre ledning, ut av papir */}
          <circle cx="100" cy="180" r="9" fill="none" stroke="#ef4444" strokeWidth="2" />
          <circle cx="100" cy="180" r="2.5" fill="#ef4444" />
          {/* høyre ledning, inn i papir */}
          <circle cx="220" cy="180" r="9" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <line x1="215" y1="175" x2="225" y2="185" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="215" y1="185" x2="225" y2="175" stroke="#3b82f6" strokeWidth="1.5" />
          {/* vinkel 6 grader */}
          <path d="M 160 70 A 50 50 0 0 0 142 76" fill="none" stroke="#10b981" strokeWidth="1" />
          <text x="142" y="55" fontSize="10" fill="#10b981" fontWeight="bold">6,00°</text>
          <line x1="160" y1="20" x2="160" y2="190" stroke="#374151" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Snor­lengde <InlineLatex latex="L_s=0{,}0400\;\text{m}" />, vinkel <InlineLatex latex="\theta=6{,}00°" /></li>
        <li>Masse per lengde <InlineLatex latex="\lambda=0{,}0130\;\text{kg/m}" /></li>
        <li>Strøm­mer like store, motsatt retning ⇒ frastøtning</li>
      </ul>
    ),
    unknowns: <p>Strøm I i hver leder.</p>,
    strategy: (
      <TheoryBox title="Tre krefter i likevekt: tyngde, snor­spenn, magnetisk">
        <p>
          Frigjør én leder. Vertikalt: <InlineLatex latex="T\cos\theta=\lambda g L" /> (per lengde:
          <InlineLatex latex="\;T'\cos\theta=\lambda g" />). Horisontalt: <InlineLatex latex="T'\sin\theta=F_B/L" />.
          Del de to: <InlineLatex latex="\tan\theta=(F_B/L)/(\lambda g)" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Avstand mellom lederne er <InlineLatex latex="\;d=2L_s\sin\theta" />.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="F_B/L=\mu_0 I^2/(2\pi d)" /> ⇒ sett inn og løs for I.</p> },
    ],
    solution: (
      <div>
        <TheoryBox title="Klassisk pendel-med-magnetisk-frastøtning">
          <p>
            Tre krefter virker på hver leder: tyngde G ned, snor­spenn T langs snoren, og magnetisk frastøtning F horisontalt
            (vekk fra den andre lederen). I likevekt går de tre vektorene i lukket trekant. Bruke vinkel-relasjoner og
            kraft­balansen kan vi binde I til geometrien.
          </p>
        </TheoryBox>
        <Step n={1} title="Geometri — avstand mellom lederne">
          <p>
            Snorene henger 6° fra vertikalen, og hver er 4,00 cm. Hver leder er da forskjøvet
            <InlineLatex latex="\;L_s\sin\theta" /> til siden, så total avstand mellom dem er:
          </p>
          <FormulaBox latex="d=2 L_s\sin\theta=2(0{,}0400)\sin 6{,}00°=8{,}36\times 10^{-3}\;\text{m}" />
        </Step>
        <Step n={2} title="Kraft­balanse">
          <p>For hver leder, per meter:</p>
          <FormulaBox latex="\text{Vertikalt: }T'\cos\theta=\lambda g" />
          <FormulaBox latex="\text{Horisontalt: }T'\sin\theta=\dfrac{F_B}{L}" />
          <p>Del de to:</p>
          <FormulaBox latex="\tan\theta=\dfrac{F_B/L}{\lambda g}" />
          <FormulaBox latex="\dfrac{F_B}{L}=\lambda g\tan\theta" />
        </Step>
        <Step n={3} title="Sett inn parallelle-leder-formel">
          <FormulaBox latex="\dfrac{F_B}{L}=\dfrac{\mu_0 I^2}{2\pi d}=\lambda g\tan\theta" />
          <p>Løs for I²:</p>
          <FormulaBox latex="I^2=\dfrac{2\pi d\,\lambda g\tan\theta}{\mu_0}=\dfrac{d\,\lambda g\tan\theta}{(\mu_0/2\pi)}=\dfrac{d\,\lambda g\tan\theta}{2\times 10^{-7}}" />
          <FormulaBox latex="I^2=\dfrac{(8{,}36\times 10^{-3})(0{,}0130)(9{,}81)\tan 6{,}00°}{2\times 10^{-7}}" />
          <FormulaBox latex="I^2=\dfrac{(8{,}36\times 10^{-3})(0{,}0130)(9{,}81)(0{,}1051)}{2\times 10^{-7}}" />
        </Step>
        <Step n={4} title="Regn ut">
          <p>Telleren: <InlineLatex latex="\;8{,}36\times 10^{-3}\cdot 0{,}0130\cdot 9{,}81\cdot 0{,}1051" /></p>
          <FormulaBox latex="=8{,}36\times 0{,}0130=0{,}1087\times 10^{-3}=1{,}087\times 10^{-4}" />
          <FormulaBox latex="\times 9{,}81=1{,}067\times 10^{-3}" />
          <FormulaBox latex="\times 0{,}1051=1{,}121\times 10^{-4}" />
          <FormulaBox latex="I^2=\dfrac{1{,}121\times 10^{-4}}{2\times 10^{-7}}=560{,}3\;\text{A}^2" />
          <FormulaBox latex="I=\sqrt{560{,}3}\approx 23{,}7\;\text{A}" />
          <FormulaBox variant="gold" latex="\boxed{\;I\approx 23{,}7\;\text{A}\;}" />
        </Step>
        <Pitfall>
          Klassisk feil: glemme at <em>begge</em> ledere svinger ut (avstanden er 2L_s sin θ, ikke L_s sin θ). En annen:
          forveksle <InlineLatex latex="\sin\theta" /> og <InlineLatex latex="\tan\theta" />. For små vinkler er de like,
          men ved 6° er forskjellen ~0,5 % — fortsatt liten, men prinsipielt feil.
        </Pitfall>
        <p className="mt-2 italic text-[var(--muted)]">
          Sanity: ~24 A er typisk for kraftige labratorie­oppsett. Litt mer eller mindre vinkel ville gitt vesentlig
          forskjell i strøm — løsningen er svært følsom for θ siden <InlineLatex latex="I^2\propto\tan\theta" />.
        </p>
      </div>
    ),
    summary: (
      <p>
        Pendel + magnetisk frastøtning: tre krefter, tre relasjoner. Nøkkelen er
        <InlineLatex latex="\;\tan\theta=F_B/(\lambda g L)" /> kombinert med parallelle-leder-formelen.
      </p>
    ),
  },
};
