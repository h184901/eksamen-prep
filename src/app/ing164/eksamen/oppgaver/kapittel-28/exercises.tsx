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

// ============================================================================
// SVG-helpere
// ============================================================================

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
// OPPGAVESAMLING — KAPITTEL 28
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 28.1 — Biot-Savart for bevegelig ladning
  // ==========================================================================
  "28.1": {
    title: "Magnetfelt fra bevegelig punktladning",
    difficulty: "lett",
    pageRef: "s. 928",
    problem: (
      <div className="space-y-2">
        <p>
          En positiv ladning <InlineLatex latex="q=4{,}80\;\mu\text{C}" /> beveger seg langs +x-aksen med fart
          <InlineLatex latex="\;v=6{,}50\times 10^{5}\;\text{m/s}" />. Finn magnetfeltet i et punkt 0,500 m langs +y-aksen
          i det øyeblikket ladningen er i origo.
        </p>
        <svg viewBox="0 0 260 140" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <line x1="20" y1="100" x2="240" y2="100" stroke="#6b7280" />
          <line x1="130" y1="130" x2="130" y2="20" stroke="#6b7280" />
          <text x="245" y="105" fontSize="10" fill="#6b7280">x</text>
          <text x="118" y="18" fontSize="10" fill="#6b7280">y</text>
          <circle cx="130" cy="100" r="5" fill="#ef4444" />
          <text x="115" y="115" fontSize="10" fill="#ef4444">q</text>
          <line x1="130" y1="100" x2="180" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k28)" />
          <text x="185" y="105" fontSize="10" fill="#ef4444">v</text>
          <circle cx="130" cy="40" r="3" fill="#3b82f6" />
          <text x="138" y="42" fontSize="10" fill="#3b82f6">P (0; 0,5 m)</text>
          <line x1="130" y1="100" x2="130" y2="43" stroke="#10b981" strokeDasharray="2 2" />
          <text x="138" y="70" fontSize="10" fill="#10b981">r</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=4{,}80\times 10^{-6}\;\text{C}" /></li>
        <li><InlineLatex latex="\vec v=6{,}50\times 10^{5}\,\hat i\;\text{m/s}" /></li>
        <li><InlineLatex latex="\vec r=0{,}500\,\hat j\;\text{m}" /> (fra ladning til felt­punkt)</li>
      </ul>
    ),
    unknowns: <p>Magnetfeltet <InlineLatex latex="\vec B" /> i punkt P.</p>,
    strategy: (
      <TheoryBox title="Biot-Savart for punktladning">
        <p>
          Magnetfeltet fra en bevegelig punktladning: <InlineLatex latex="\vec B=\dfrac{\mu_0}{4\pi}\dfrac{q\vec v\times\hat r}{r^2}" />.
          Kryssproduktet gir retningen (høyrehåndsregel), <InlineLatex latex="\mu_0=4\pi\times 10^{-7}\;\text{T·m/A}" /> slik at
          <InlineLatex latex="\;\mu_0/(4\pi)=10^{-7}" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\hat r=\hat j" /> her, og <InlineLatex latex="\hat i\times\hat j=\hat k" />.</p> },
      { label: "Hint 2", content: <p>B peker derfor i +z-retning.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Retning via kryssprodukt">
          <FormulaBox latex="\vec v\times\hat r=v\hat i\times\hat j=v\hat k" />
          <p>Feltet peker altså langs +z.</p>
        </Step>
        <Step n={2} title="Størrelse">
          <FormulaBox latex="B=\dfrac{\mu_0}{4\pi}\dfrac{qv}{r^2}=10^{-7}\cdot\dfrac{(4{,}80\times 10^{-6})(6{,}50\times 10^{5})}{(0{,}500)^2}" />
          <FormulaBox latex="B=10^{-7}\cdot\dfrac{3{,}12}{0{,}25}\approx 1{,}25\times 10^{-6}\;\text{T}" />
          <FormulaBox variant="gold" latex="\boxed{\;\vec B\approx 1{,}25\;\mu\text{T}\,\hat k\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Bevegelige ladninger lager magnetfelt. Retningen bestemmes av
        <InlineLatex latex="\;\vec v\times\hat r" />, størrelsen faller som <InlineLatex latex="1/r^2" />, akkurat som Coulomb-felt —
        men rettet vinkelrett på både v og r.
      </p>
    ),
  },

  // ==========================================================================
  // 28.5 — B-felt fra ladning, annen geometri
  // ==========================================================================
  "28.5": {
    title: "Felt fra ladning på y-aksen",
    difficulty: "middels",
    pageRef: "s. 929",
    problem: (
      <p>
        En positiv ladning <InlineLatex latex="q=+8{,}00\;\mu\text{C}" /> befinner seg i punktet <InlineLatex latex="(0;\,0{,}300;\,0)" /> m
        og beveger seg langs +x-aksen med fart <InlineLatex latex="v=9{,}00\times 10^{4}\;\text{m/s}" />. Finn magnetfeltet den lager
        i origo.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="q=+8{,}00\times 10^{-6}\;\text{C}" />, <InlineLatex latex="v=9{,}00\times 10^{4}\;\text{m/s}" /> langs +x</li>
        <li>Ladningen ved <InlineLatex latex="(0;\,0{,}300;\,0)" /> m, feltpunkt i origo</li>
      </ul>
    ),
    unknowns: <p>Magnetfelt <InlineLatex latex="\vec B" /> i origo.</p>,
    strategy: (
      <TheoryBox title="Retningen på r̂ betyr alt">
        <p>
          <InlineLatex latex="\vec r" /> går fra <em>kilden</em> til <em>feltpunktet</em>. Her peker den fra
          <InlineLatex latex="\;(0;0{,}3;0)" /> til origo, altså i <InlineLatex latex="-\hat j" />-retning.
          <InlineLatex latex="\;\hat i\times(-\hat j)=-\hat k" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Feltet peker i <InlineLatex latex="-\hat k" /> (inn i arket).</p> }],
    solution: (
      <div>
        <Step n={1} title="Retning">
          <FormulaBox latex="\hat r=-\hat j\Rightarrow \hat i\times\hat r=-\hat k" />
        </Step>
        <Step n={2} title="Størrelse">
          <FormulaBox latex="B=10^{-7}\cdot\dfrac{(8{,}00\times 10^{-6})(9{,}00\times 10^{4})}{(0{,}300)^2}=10^{-7}\cdot\dfrac{0{,}720}{0{,}090}" />
          <FormulaBox variant="gold" latex="\vec B\approx -8{,}00\times 10^{-7}\;\text{T}\,\hat k=0{,}800\,\mu\text{T (i -z)}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Alltid trekk <InlineLatex latex="\vec r" /> <em>fra kilden til feltpunktet</em>. Tegnet på kryssproduktet
        bestemmer deretter retningen til <InlineLatex latex="\vec B" />.
      </p>
    ),
  },

  // ==========================================================================
  // 28.6 — Kraft mellom to bevegende ladninger
  // ==========================================================================
  "28.6": {
    title: "Magnetisk kraft mellom to bevegelige ladninger",
    difficulty: "vanskelig",
    pageRef: "s. 929",
    problem: (
      <p>
        Ladning <InlineLatex latex="q_1=+4{,}00\;\mu\text{C}" /> er i origo og beveger seg langs +x med <InlineLatex latex="v_1=3{,}00\times 10^{5}\;\text{m/s}" />.
        Ladning <InlineLatex latex="q_2=+4{,}00\;\mu\text{C}" /> er i <InlineLatex latex="(0;\,0{,}200;\,0)" /> m og beveger seg langs +y med <InlineLatex latex="v_2=3{,}00\times 10^{5}\;\text{m/s}" />.
        Finn den magnetiske kraften <InlineLatex latex="q_1" /> utøver på <InlineLatex latex="q_2" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Ladninger, posisjoner og hastigheter som oppgitt</li>
      </ul>
    ),
    unknowns: <p>Magnetisk kraft <InlineLatex latex="\vec F" /> fra 1 på 2.</p>,
    strategy: (
      <TheoryBox title="To steg: finn B av q1 ved q2, så F = qv × B">
        <p>
          Først: B-feltet fra <InlineLatex latex="q_1" /> i posisjonen til <InlineLatex latex="q_2" />. Så: Lorentzkraften på <InlineLatex latex="q_2" />:
          <InlineLatex latex="\;\vec F=q_2\vec v_2\times\vec B" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Som i 28.1: <InlineLatex latex="\hat r=\hat j" />, <InlineLatex latex="\vec B" /> i +z.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="\hat j\times\hat k=\hat i" />, så kraften peker i +x.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Felt fra q1 ved posisjonen til q2">
          <FormulaBox latex="B=10^{-7}\dfrac{(4\times 10^{-6})(3\times 10^{5})}{(0{,}2)^2}=10^{-7}\cdot 30=3{,}00\times 10^{-6}\;\text{T}" />
          <p>Retning: +z.</p>
        </Step>
        <Step n={2} title="Lorentzkraft på q2">
          <FormulaBox latex="\vec F=q_2 v_2\,(\hat j\times\hat k)\,B=q_2 v_2 B\,\hat i" />
          <FormulaBox latex="F=(4\times 10^{-6})(3\times 10^{5})(3\times 10^{-6})\,\hat i=3{,}6\times 10^{-6}\;\text{N}" />
          <FormulaBox variant="gold" latex="\boxed{\;\vec F\approx 3{,}6\,\mu\text{N}\,\hat i\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Magnetiske krefter mellom bevegelige ladninger krever to skritt: (i) Biot-Savart gir feltet,
        (ii) Lorentz-loven gir kraften. Legg merke til at <InlineLatex latex="\vec F_{12}" /> er ikke alltid
        motsatt <InlineLatex latex="\vec F_{21}" /> i magnetiske systemer!
      </p>
    ),
  },

  // ==========================================================================
  // 28.11 — Lang rett leder
  // ==========================================================================
  "28.11": {
    title: "Magnetfelt fra lang rett leder",
    difficulty: "lett",
    pageRef: "s. 934",
    problem: (
      <div className="space-y-2">
        <p>
          En lang rett ledning fører strøm <InlineLatex latex="I=10{,}0\;\text{A}" />. Finn størrelsen av magnetfeltet
          5,00 cm fra ledningen.
        </p>
        <svg viewBox="0 0 240 120" className="w-full max-w-xs mx-auto">
          <Arrowheads />
          <line x1="120" y1="10" x2="120" y2="110" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red-k28)" />
          <text x="125" y="25" fontSize="10" fill="#ef4444">I</text>
          <circle cx="120" cy="60" r="40" fill="none" stroke="#3b82f6" strokeDasharray="3 2" />
          <text x="170" y="60" fontSize="10" fill="#3b82f6">B</text>
          <line x1="120" y1="60" x2="160" y2="60" stroke="#10b981" strokeDasharray="2 2" />
          <text x="135" y="55" fontSize="10" fill="#10b981">r</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="I=10{,}0\;\text{A}" />, <InlineLatex latex="r=0{,}0500\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Magnetfelt <InlineLatex latex="B" /> ved 5 cm.</p>,
    strategy: (
      <TheoryBox title="Formel for B rundt en rett leder">
        <p>
          <InlineLatex latex="B=\dfrac{\mu_0 I}{2\pi r}" />. Utledet fra Ampère eller Biot-Savart.
          Retningen følger høyrehåndsregelen: tommel langs strømmen, fingrene rundt i feltretningen.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p><InlineLatex latex="\mu_0/(2\pi)=2\times 10^{-7}\;\text{T·m/A}" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Sett inn">
          <FormulaBox latex="B=\dfrac{\mu_0 I}{2\pi r}=(2\times 10^{-7})\dfrac{10{,}0}{0{,}0500}" />
        </Step>
        <Step n={2} title="Regn ut">
          <FormulaBox variant="gold" latex="B=4{,}00\times 10^{-5}\;\text{T}=40{,}0\;\mu\text{T}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        B-feltet rundt en rett leder faller som <InlineLatex latex="1/r" /> (ikke <InlineLatex latex="1/r^2" /> som for punktladning!),
        fordi lederen er uendelig lang. Feltlinjene danner konsentriske sirkler.
      </p>
    ),
  },

  // ==========================================================================
  // 28.19 — Sirkulær sløyfe
  // ==========================================================================
  "28.19": {
    title: "Felt i senter av sirkulær sløyfe",
    difficulty: "lett",
    pageRef: "s. 937",
    problem: (
      <p>
        En sirkulær strømsløyfe har radius <InlineLatex latex="R=5{,}00\;\text{cm}" /> og fører strøm <InlineLatex latex="I=5{,}00\;\text{A}" />.
        Finn magnetfeltet i sirkelens senter.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="R=0{,}0500\;\text{m}" />, <InlineLatex latex="I=5{,}00\;\text{A}" /></li>
      </ul>
    ),
    unknowns: <p>Feltet i senter.</p>,
    strategy: (
      <TheoryBox title="Biot-Savart integrert over sløyfen">
        <p>
          For én sløyfe: <InlineLatex latex="B=\dfrac{\mu_0 I}{2R}" /> i senter.
          For <InlineLatex latex="N" /> tettpakkede vindinger: multipliser med <InlineLatex latex="N" />.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Formel">
          <FormulaBox latex="B=\dfrac{\mu_0 I}{2R}=(4\pi\times 10^{-7})\dfrac{5{,}00}{2\cdot 0{,}0500}" />
        </Step>
        <Step n={2} title="Regn">
          <FormulaBox variant="gold" latex="B\approx 6{,}28\times 10^{-5}\;\text{T}=62{,}8\;\mu\text{T}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Sirkulær sløyfe gir sterkest felt i senter, rettet langs aksen (høyrehåndsregelen).
        Husk: <InlineLatex latex="\mu_0 I/(2R)" />, ikke <InlineLatex latex="2\pi R" /> i nevner.
      </p>
    ),
  },

  // ==========================================================================
  // 28.20 — Solenoide
  // ==========================================================================
  "28.20": {
    title: "Magnetfelt inne i solenoide",
    difficulty: "lett",
    pageRef: "s. 940",
    problem: (
      <p>
        En lang solenoide har 2000 vindinger per meter og fører strøm <InlineLatex latex="I=5{,}0\;\text{A}" />.
        Finn magnetfeltet nær senter av solenoiden.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="n=2000\;\text{vindinger/m}" /></li>
        <li><InlineLatex latex="I=5{,}0\;\text{A}" /></li>
      </ul>
    ),
    unknowns: <p>Felt <InlineLatex latex="B" /> inne i solenoiden.</p>,
    strategy: (
      <TheoryBox title="Idealisert solenoide">
        <p>
          <InlineLatex latex="B=\mu_0 n I" /> inne, <InlineLatex latex="B\approx 0" /> utenfor.
          Uavhengig av radius — så lenge solenoiden er lang sammenlignet med diameteren.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Sett inn">
          <FormulaBox latex="B=\mu_0 n I=(4\pi\times 10^{-7})(2000)(5{,}0)" />
        </Step>
        <Step n={2} title="Beregn">
          <FormulaBox variant="gold" latex="B\approx 1{,}26\times 10^{-2}\;\text{T}=12{,}6\;\text{mT}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Solenoiden er et magnetisk «kondensatorfelt» — jevnt inne, null utenfor. Dette gjør
        den til hjørnesteinen i elektromagneter og MR-maskiner.
      </p>
    ),
  },

  // ==========================================================================
  // 28.21 — Toroide
  // ==========================================================================
  "28.21": {
    title: "Magnetfelt i en toroide",
    difficulty: "middels",
    pageRef: "s. 941",
    problem: (
      <p>
        En toroide har 600 vindinger, fører strøm 8,00 A og har middelradius 0,150 m.
        Finn magnetfeltet inne i toroiden langs midtaksen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="N=600,\;I=8{,}00\;\text{A},\;r=0{,}150\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>B i senterlinjen.</p>,
    strategy: (
      <TheoryBox title="Ampère på sirkel inne i toroiden">
        <p>
          <InlineLatex latex="\oint\vec B\cdot d\vec l=B\cdot 2\pi r=\mu_0 NI" />
          gir <InlineLatex latex="B=\dfrac{\mu_0 NI}{2\pi r}" />.
          Ser lik ut som rett leder, men med <InlineLatex latex="NI" /> i stedet for <InlineLatex latex="I" />.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Formel">
          <FormulaBox latex="B=\dfrac{\mu_0 N I}{2\pi r}=(2\times 10^{-7})\dfrac{600\cdot 8{,}00}{0{,}150}" />
        </Step>
        <Step n={2} title="Regn">
          <FormulaBox variant="gold" latex="B\approx 6{,}40\times 10^{-3}\;\text{T}=6{,}40\;\text{mT}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Toroide = bøyd solenoide. Feltet er konsentrert inne (<InlineLatex latex="B\sim 1/r" /> varierer litt
        over tverrsnittet) og null utenfor. Brukes i transformatorer og fusjonsreaktorer.
      </p>
    ),
  },

  // ==========================================================================
  // 28.27 — Ampère for rett leder
  // ==========================================================================
  "28.27": {
    title: "Ampère's lov — lang rett leder",
    difficulty: "middels",
    pageRef: "s. 943",
    problem: (
      <p>
        Bruk Ampères lov til å utlede uttrykket <InlineLatex latex="B=\mu_0 I/(2\pi r)" /> for en lang rett leder.
        Diskutér kort valg av amperisk sløyfe.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Lang rett leder med strøm <InlineLatex latex="I" /></li>
        <li>Sylindersymmetri</li>
      </ul>
    ),
    unknowns: <p>B som funksjon av r (utledning).</p>,
    strategy: (
      <TheoryBox title="Ampère: ∮ B · dl = μ₀I_enc">
        <p>
          Velg amperisk sløyfe der B er konstant og parallell med dl: en sirkel konsentrisk med lederen.
          Symmetrien (rotasjons­invarians + translasjons­invarians) garanterer dette.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="Velg sløyfen">
          <p>Sirkel med radius <InlineLatex latex="r" /> rundt lederen. Langs sirkelen er <InlineLatex latex="\vec B\parallel d\vec l" /> og konstant størrelse.</p>
        </Step>
        <Step n={2} title="Linjeintegral">
          <FormulaBox latex="\oint\vec B\cdot d\vec l=B\oint dl=B\cdot 2\pi r" />
        </Step>
        <Step n={3} title="Ampère og løs">
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I\Rightarrow \boxed{\;B=\dfrac{\mu_0 I}{2\pi r}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Ampère er kraftig ved symmetri: velg sløyfen slik at <InlineLatex latex="\vec B\cdot d\vec l" /> er trivielt.
        Uten symmetri får integralet krumme former — bruk da Biot-Savart i stedet.
      </p>
    ),
  },

  // ==========================================================================
  // 28.29 — Koaksial kabel
  // ==========================================================================
  "28.29": {
    title: "Koaksialkabel (indre og ytre leder)",
    difficulty: "middels",
    pageRef: "s. 944",
    problem: (
      <p>
        En koaksialkabel har en tynn indre leder som fører <InlineLatex latex="+I" /> og en ytre, sylindrisk skjerm som fører <InlineLatex latex="-I" />.
        Radius inne er <InlineLatex latex="a" />, skjermen ved <InlineLatex latex="b" />. Finn B for (a) <InlineLatex latex="a<r<b" />
        og (b) <InlineLatex latex="r>b" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Strøm +I i indre, -I i ytre leder</li>
      </ul>
    ),
    unknowns: <p>B mellom lederne og utenfor.</p>,
    strategy: (
      <TheoryBox title="Ampère: bare innkapslet strøm teller">
        <p>
          Bruk en sirkulær amperisk sløyfe med radius <InlineLatex latex="r" />. Summen av strømmen <em>innenfor</em>
          sløyfen bestemmer feltet. Strøm utenfor sløyfen bidrar ikke (selv om den lager felt, netto gjennom sløyfen er null).
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>Mellom: bare +I er innkapslet. Utenfor: +I − I = 0.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Mellom lederne">
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I\Rightarrow B=\dfrac{\mu_0 I}{2\pi r}" />
        </Step>
        <Step n={2} title="(b) Utenfor kabelen">
          <FormulaBox variant="gold" latex="B\cdot 2\pi r=\mu_0(I-I)=0\Rightarrow \boxed{\;B=0\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Koaksialkabel skjermer effektivt: utenfor skjermen er det null magnetfelt.
        Derfor brukes de til signaler som er følsomme for elektromagnetiske forstyrrelser.
      </p>
    ),
  },

  // ==========================================================================
  // 28.30 — Tykk leder, jevn strømtetthet
  // ==========================================================================
  "28.30": {
    title: "B inne i leder med jevn strømtetthet",
    difficulty: "middels",
    pageRef: "s. 944",
    problem: (
      <p>
        En lang sylindrisk leder med radius <InlineLatex latex="R" /> fører total strøm <InlineLatex latex="I" /> jevnt fordelt over tverrsnittet.
        Finn magnetfeltet som funksjon av radius for (a) <InlineLatex latex="r<R" />, (b) <InlineLatex latex="r>R" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Lang sylindrisk leder, radius <InlineLatex latex="R" />, total strøm <InlineLatex latex="I" /></li>
        <li>Jevn strømtetthet <InlineLatex latex="J=I/(\pi R^2)" /></li>
      </ul>
    ),
    unknowns: <p>B som funksjon av r.</p>,
    strategy: (
      <TheoryBox title="Kapsle strøm proporsjonalt med areal">
        <p>
          Innenfor lederen: andelen strøm som er innkapslet er <InlineLatex latex="I_\text{enc}=I(r/R)^2" />
          (fordi areal <InlineLatex latex="\pi r^2" /> vs. <InlineLatex latex="\pi R^2" />).
          Utenfor: all strømmen er innkapslet.
        </p>
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div>
        <Step n={1} title="(a) Inne: r < R">
          <FormulaBox latex="B\cdot 2\pi r=\mu_0 I\dfrac{r^2}{R^2}\Rightarrow B=\dfrac{\mu_0 I\,r}{2\pi R^2}" />
          <p>Lineær i <InlineLatex latex="r" />.</p>
        </Step>
        <Step n={2} title="(b) Ute: r > R">
          <FormulaBox variant="gold" latex="B=\dfrac{\mu_0 I}{2\pi r}" />
          <p>Som en rett leder.</p>
        </Step>
        <Step n={3} title="Sjekk kontinuitet ved r = R">
          <FormulaBox latex="\text{Inne: }\dfrac{\mu_0 I R}{2\pi R^2}=\dfrac{\mu_0 I}{2\pi R}=\text{ute ved }r=R" />
          <p className="italic text-[var(--muted)]">Feltet er kontinuerlig, som forventet.</p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Feltet vokser lineært fra null på aksen til maks ved overflaten, så avtar som <InlineLatex latex="1/r" /> utenfor.
        Samme topologi som ladning fordelt i kule — bare rotert.
      </p>
    ),
  },

  // ==========================================================================
  // 28.61 — To parallelle ledere
  // ==========================================================================
  "28.61": {
    title: "Kraft mellom to parallelle ledere",
    difficulty: "vanskelig",
    pageRef: "s. 948",
    problem: (
      <div className="space-y-2">
        <p>
          To lange parallelle ledere står 0,400 m fra hverandre. Den ene fører 8,00 A, den andre 5,00 A,
          i samme retning. (a) Hva er kraften per meter mellom dem? (b) Er den tiltrekkende eller frastøtende?
          (c) Hva blir magnetfeltet midt mellom dem?
        </p>
        <svg viewBox="0 0 260 120" className="w-full max-w-sm mx-auto">
          <Arrowheads />
          <line x1="60" y1="15" x2="60" y2="105" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red-k28)" />
          <line x1="200" y1="15" x2="200" y2="105" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-blue-k28)" />
          <text x="45" y="25" fontSize="10" fill="#ef4444">I1 = 8 A</text>
          <text x="180" y="25" fontSize="10" fill="#3b82f6">I2 = 5 A</text>
          <line x1="65" y1="60" x2="195" y2="60" stroke="#10b981" strokeDasharray="3 2" />
          <text x="115" y="55" fontSize="10" fill="#10b981">r = 0,4 m</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="I_1=8{,}00\;\text{A},\;I_2=5{,}00\;\text{A}" />, samme retning</li>
        <li><InlineLatex latex="r=0{,}400\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Kraft per meter, retning, og B midt mellom.</p>,
    strategy: (
      <TheoryBox title="Parallelle ledere tiltrekker hverandre når strømmene går samme vei">
        <p>
          Hver leder lager et felt som den andre sitter i. Kraft per meter:
          <InlineLatex latex="\;F/L=\dfrac{\mu_0 I_1 I_2}{2\pi r}" />. Samme retning ⇒ tiltrekning.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Midtveis: feltene fra de to lederne peker i <em>motsatt</em> retning og kanselleres delvis.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Kraft per meter">
          <FormulaBox latex="\dfrac{F}{L}=(2\times 10^{-7})\dfrac{8{,}00\cdot 5{,}00}{0{,}400}=2{,}00\times 10^{-5}\;\text{N/m}" />
        </Step>
        <Step n={2} title="(b) Retning">
          <p>Strømmene er parallelle (samme retning) ⇒ <strong>tiltrekkende</strong>.</p>
        </Step>
        <Step n={3} title="(c) Felt midt mellom">
          <p>Midtveis (<InlineLatex latex="r_1=r_2=0{,}200\;\text{m}" />). Bidragene går i motsatt retning:</p>
          <FormulaBox latex="B=\dfrac{\mu_0}{2\pi(0{,}2)}(I_1-I_2)=(10^{-6})(8{,}00-5{,}00)=3{,}00\;\mu\text{T}" />
          <FormulaBox variant="gold" latex="\boxed{\;F/L=2{,}00\times 10^{-5}\,\text{N/m (tiltrekkende)},\;B=3{,}00\,\mu\text{T}\;}" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Strømmer i samme retning tiltrekker; motsatte strømmer frastøter. Denne effekten definerer SI-enheten ampere.
        Mellom lederne peker feltene motsatt og delsammensmeltes.
      </p>
    ),
  },
};
