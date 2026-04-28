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
      <marker id="arrow-red-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 8 (matcher University Physics 15. utg.)
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 8.1 — Lastebil og SUV: bevegelsesmengde og kinetisk energi
  // ==========================================================================
  "8.1": {
    title: "Lastebil vs SUV — momentum og energi",
    difficulty: "lett",
    pageRef: "s. 291",
    problem: (
      <p>
        (a) Hva er størrelsen på bevegelses­mengden til en 10 000 kg lastebil med fart
        12,0 m/s? (b) Med hvilken fart må en 2000 kg SUV kjøre for å ha (i) den samme
        bevegelses­mengden, og (ii) den samme kinetiske energien som lastebilen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>Lastebil: <InlineLatex latex="m_L=10\,000\;\text{kg},\;v_L=12{,}0\;\text{m/s}" /></li>
        <li>SUV: <InlineLatex latex="m_S=2000\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="p_L" />. (b-i) <InlineLatex latex="v_S" /> for samme p. (b-ii) <InlineLatex latex="v_S" /> for samme K.</p>,
    strategy: (
      <TheoryBox title="To grunndefinisjoner">
        <p>
          <InlineLatex latex="p=mv" /> (vektor, lineær i v).
          <InlineLatex latex="\;K=\tfrac12 mv^2" /> (skalar, kvadratisk i v).
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>For samme K: <InlineLatex latex="v_S=v_L\sqrt{m_L/m_S}" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Lastebilens momentum">
          <FormulaBox latex="p_L=m_Lv_L=(10\,000)(12{,}0)=1{,}20\times 10^{5}\;\text{kg·m/s}" />
        </Step>
        <Step n={2} title="(b-i) SUV med samme p">
          <FormulaBox latex="v_S=\dfrac{p_L}{m_S}=\dfrac{1{,}20\times 10^{5}}{2000}=60{,}0\;\text{m/s}" />
        </Step>
        <Step n={3} title="(b-ii) SUV med samme K">
          <FormulaBox latex="v_S=v_L\sqrt{m_L/m_S}=12{,}0\sqrt{5}\approx 26{,}8\;\text{m/s}" />
        </Step>
        <FormulaBox variant="gold" latex="p_L=1{,}20\times 10^5\,\text{kg·m/s},\;v_{S,p}=60{,}0\,\text{m/s},\;v_{S,K}\approx 26{,}8\,\text{m/s}" />
        <p className="mt-2 italic text-[var(--muted)]">
          For samme p må SUV kjøre 5× raskere (lineært); for samme K bare √5 ≈ 2,24× raskere.
        </p>
      </div>
    ),
    summary: <p>p ∝ v, K ∝ v². Lett legeme trenger mye høyere fart for samme p enn for samme K.</p>,
  },

  // ==========================================================================
  // 8.3 — Objekter A, B, C i Fig E8.3
  // ==========================================================================
  "8.3": {
    title: "Netto bevegelsesmengde for objekter A, B, C (Fig E8.3)",
    difficulty: "middels",
    pageRef: "s. 291",
    problem: (
      <div className="space-y-2">
        <p>
          Tre objekter A (5,0 kg), B (6,0 kg) og C (10,0 kg) beveger seg som vist i Fig. E8.3:
          A langs +y med 11,0 m/s; B langs en linje 60,0° mot +x-aksen (under) med 10,0 m/s;
          C langs +x med 3,0 m/s. Finn x- og y-komponentene av netto bevegelses­mengde for systemet
          som består av (a) A og C; (b) B og C; (c) alle tre.
        </p>
        <svg viewBox="0 0 320 240" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* x og y-akse */}
          <line x1="160" y1="220" x2="160" y2="20" stroke="#6b7280" strokeWidth="1" />
          <line x1="20" y1="120" x2="300" y2="120" stroke="#6b7280" strokeWidth="1" />
          <text x="165" y="22" fontSize="11" fill="#6b7280">y</text>
          <text x="302" y="124" fontSize="11" fill="#6b7280">x</text>
          {/* A i +y, 5 kg, 11 m/s */}
          <circle cx="160" cy="120" r="9" fill="#ef4444" />
          <text x="166" y="125" fontSize="10" fill="white" fontWeight="bold">A</text>
          <line x1="160" y1="111" x2="160" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="115" y="60" fontSize="10" fill="#ef4444">5 kg, 11 m/s</text>
          {/* B i 60° under +x, 6 kg, 10 m/s */}
          <circle cx="160" cy="120" r="9" fill="#3b82f6" />
          <text x="166" y="125" fontSize="10" fill="white" fontWeight="bold">B</text>
          <line x1="160" y1="120" x2="225" y2="170" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="195" y="195" fontSize="10" fill="#3b82f6">6 kg, 10 m/s, 60°</text>
          {/* C i +x, 10 kg, 3 m/s */}
          <circle cx="160" cy="120" r="9" fill="#10b981" />
          <text x="166" y="125" fontSize="10" fill="white" fontWeight="bold">C</text>
          <line x1="170" y1="120" x2="225" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green-k8)" />
          <text x="225" y="140" fontSize="10" fill="#10b981">10 kg, 3 m/s</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>A: 5,0 kg langs +y, 11,0 m/s</li>
        <li>B: 6,0 kg, 60° under +x, 10,0 m/s</li>
        <li>C: 10,0 kg langs +x, 3,0 m/s</li>
      </ul>
    ),
    unknowns: <p>x- og y-komponentene av netto p for tre delsystemer.</p>,
    strategy: (
      <TheoryBox title="Momentum er en vektor">
        <p>
          Regn ut <InlineLatex latex="p_x" /> og <InlineLatex latex="p_y" /> separat for hvert objekt, så summer.
          B's vektor: <InlineLatex latex="p_{Bx}=m_B v_B\cos 60°,\;p_{By}=-m_B v_B\sin 60°" /> (60° under x ⇒ negativ y).
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>A: kun y-komponent. C: kun x-komponent. B: begge komponenter med fortegn.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Komponenter for hver">
          <FormulaBox latex="p_{Ax}=0,\quad p_{Ay}=(5{,}0)(11{,}0)=55{,}0\;\text{kg·m/s}" />
          <FormulaBox latex="p_{Bx}=(6{,}0)(10{,}0)\cos 60°=30{,}0,\quad p_{By}=-(6{,}0)(10{,}0)\sin 60°=-52{,}0" />
          <FormulaBox latex="p_{Cx}=(10{,}0)(3{,}0)=30{,}0,\quad p_{Cy}=0" />
        </Step>
        <Step n={2} title="(a) System A + C">
          <FormulaBox variant="gold" latex="p_x=0+30{,}0=30{,}0\;\text{kg·m/s},\;p_y=55{,}0+0=55{,}0\;\text{kg·m/s}" />
        </Step>
        <Step n={3} title="(b) System B + C">
          <FormulaBox variant="gold" latex="p_x=30{,}0+30{,}0=60{,}0\;\text{kg·m/s},\;p_y=-52{,}0+0=-52{,}0\;\text{kg·m/s}" />
        </Step>
        <Step n={4} title="(c) Alle tre">
          <FormulaBox variant="gold" latex="p_x=0+30+30=60{,}0\;\text{kg·m/s},\;p_y=55-52+0=3{,}0\;\text{kg·m/s}" />
        </Step>
        <Pitfall>
          Forveksling av <InlineLatex latex="\sin/\cos" />, eller fortegn på y-komponent når vinkelen er <em>under</em> x-aksen. Tegn alltid pil­diagram først.
        </Pitfall>
      </div>
    ),
    summary: <p>Netto p er vektorsum: regn x og y separat, så Pythagoras hvis du vil ha størrelsen.</p>,
  },

  // ==========================================================================
  // 8.5 — American Football: 110 kg vs 125 kg
  // ==========================================================================
  "8.5": {
    title: "American football — to linemen kolliderer",
    difficulty: "middels",
    pageRef: "s. 291",
    problem: (
      <p>
        I amerikansk fotball støter to «defensive linemen» rett mot hverandre. Den 110 kg tunge
        spilleren beveger seg mot høyre med 2,65 m/s når en 125 kg spiller løper rett mot ham
        med 2,80 m/s. (a) Finn størrelse og retning på netto bevegelses­mengde for systemet av
        de to spillerne. (b) Finn total kinetisk energi.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_1=110\;\text{kg},\;v_1=+2{,}65\;\text{m/s}" /> (mot høyre)</li>
        <li><InlineLatex latex="m_2=125\;\text{kg},\;v_2=-2{,}80\;\text{m/s}" /> (mot venstre)</li>
      </ul>
    ),
    unknowns: <p>(a) Netto p (størrelse + retning). (b) Total K.</p>,
    strategy: <p>Velg positiv x mot høyre. Begge er 1D — bare summer fortegn­settene.</p>,
    hints: [{ label: "Hint", content: <p>p kan bli negativ ⇒ retning «mot venstre».</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Netto bevegelses­mengde">
          <FormulaBox latex="p=m_1v_1+m_2v_2=(110)(+2{,}65)+(125)(-2{,}80)" />
          <FormulaBox latex="p=291{,}5-350{,}0=-58{,}5\;\text{kg·m/s}" />
          <FormulaBox variant="gold" latex="|p|=58{,}5\;\text{kg·m/s, mot venstre}" />
        </Step>
        <Step n={2} title="(b) Total kinetisk energi">
          <FormulaBox latex="K=\tfrac12 m_1v_1^2+\tfrac12 m_2v_2^2" />
          <FormulaBox latex="K=\tfrac12(110)(2{,}65)^2+\tfrac12(125)(2{,}80)^2=386{,}2+490{,}0" />
          <FormulaBox variant="gold" latex="K\approx 876\;\text{J}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Tyngste spiller dominerer momentum; netto p peker hans vei. K er positiv (skalar) — ingen retning.
        </p>
      </div>
    ),
    summary: <p>Momentum er vektor (kan kanselleres delvis); kinetisk energi er skalar (legges alltid sammen positivt).</p>,
  },

  // ==========================================================================
  // 8.7 — Force of a Golf Swing
  // ==========================================================================
  "8.7": {
    title: "Kraft fra et golfslag",
    difficulty: "lett",
    pageRef: "s. 291",
    problem: (
      <p>
        En 0,0450 kg golfball går fra ro til 24,9 m/s når køllen treffer den. Hvis kontakt­tiden er
        2,40 ms, hvilken gjennomsnittlig kraft virker på ballen i denne perioden? Hvor stor er
        denne kraften sammenlignet med ballens vekt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}0450\;\text{kg},\;v_1=0,\;v_2=24{,}9\;\text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t=2{,}40\times 10^{-3}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Gjennomsnittlig kraft <InlineLatex latex="F_\text{gj}" />, og forhold til vekt.</p>,
    strategy: (
      <TheoryBox title="Impuls-momentum">
        <p>
          <InlineLatex latex="J=F_\text{gj}\Delta t=m(v_2-v_1)" />, så
          <InlineLatex latex="F_\text{gj}=m\Delta v/\Delta t" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Vekten er <InlineLatex latex="W=mg=0{,}0450\cdot 9{,}80=0{,}441\;\text{N}" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Gjennomsnittlig kraft">
          <FormulaBox latex="F_\text{gj}=\dfrac{m(v_2-v_1)}{\Delta t}=\dfrac{(0{,}0450)(24{,}9)}{2{,}40\times 10^{-3}}" />
          <FormulaBox variant="gold" latex="F_\text{gj}=467\;\text{N}" />
        </Step>
        <Step n={2} title="Forhold til vekt">
          <FormulaBox latex="\dfrac{F_\text{gj}}{W}=\dfrac{467}{0{,}441}\approx 1060" />
          <p>Kraften er ca. <strong>1060 ganger ballens vekt</strong> — nesten tre størrelses­ordener mer.</p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Kort kontakt­tid (2 ms) gir veldig store krefter, akkurat som krevd av impuls-momentum-loven.
        </p>
      </div>
    ),
    summary: <p>Impuls-momentum gir <InlineLatex latex="F_\text{gj}=m\Delta v/\Delta t" />. Korte støt ⇒ store krefter.</p>,
  },

  // ==========================================================================
  // 8.8 — Baseball snur retning
  // ==========================================================================
  "8.8": {
    title: "Baseball snur retning — impuls og kraft",
    difficulty: "middels",
    pageRef: "s. 291",
    problem: (
      <p>
        En 0,143 kg baseball ankommer slag­treet med 40,5 m/s. Etter slaget går den i 54,5 m/s i
        motsatt retning. (a) Finn impulsen (endring i bevegelses­mengde). (b) Hvis kontakt­tiden er
        1,50 ms, hva er gjennomsnittlig kraft på ballen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}143\;\text{kg}" /></li>
        <li><InlineLatex latex="v_1=-40{,}5\;\text{m/s},\;v_2=+54{,}5\;\text{m/s}" /> (positiv retning bort fra slagtreet)</li>
        <li><InlineLatex latex="\Delta t=1{,}50\times 10^{-3}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="J" />. (b) <InlineLatex latex="F_\text{gj}" />.</p>,
    strategy: <p>Velg positiv retning bort fra batter. Innkommende fart er da negativ. <InlineLatex latex="J=m(v_2-v_1)" />.</p>,
    hints: [{ label: "Hint", content: <p>Endring i fart er <InlineLatex latex="54{,}5-(-40{,}5)=95{,}0\;\text{m/s}" /> — ikke 14!</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Impuls">
          <FormulaBox latex="J=m(v_2-v_1)=0{,}143\cdot[54{,}5-(-40{,}5)]=0{,}143\cdot 95{,}0" />
          <FormulaBox variant="gold" latex="J=13{,}6\;\text{kg·m/s (eller N·s)}" />
        </Step>
        <Step n={2} title="(b) Gjennomsnittlig kraft">
          <FormulaBox latex="F_\text{gj}=\dfrac{J}{\Delta t}=\dfrac{13{,}6}{1{,}50\times 10^{-3}}" />
          <FormulaBox variant="gold" latex="F_\text{gj}\approx 9{,}05\times 10^{3}\;\text{N}" />
        </Step>
        <Pitfall>
          Klassisk feil: <InlineLatex latex="\Delta v=54{,}5-40{,}5=14\;\text{m/s}" />. Det glemmer at retningen snur.
          Riktig: subtrahér med fortegn — fart endres fra −40,5 til +54,5, total endring 95,0 m/s.
        </Pitfall>
      </div>
    ),
    summary: <p>Når retningen snur er fartsendringen summen av størrelsene, ikke differansen.</p>,
  },

  // ==========================================================================
  // 8.9 — Hockey­puck — to scenarier
  // ==========================================================================
  "8.9": {
    title: "Hockeypuck — to ulike scenarier",
    difficulty: "middels",
    pageRef: "s. 291",
    problem: (
      <p>
        En 0,160 kg hockey­puck beveger seg på friksjons­fritt is mot høyre med 3,00 m/s ved
        t = 0. (a) Hvis den utsettes for en horisontal kraft 25,0 N <em>mot høyre</em> i 0,050 s, hva
        er pucken sin fart etterpå? (b) <em>I stedet</em> utsettes pucken for en kraft 12,0 N mot
        venstre i 0,050 s. Hva er nå farten etterpå?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}160\;\text{kg},\;v_0=+3{,}00\;\text{m/s}" /></li>
        <li><InlineLatex latex="\Delta t=0{,}050\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Slutt­fart i hvert av scenariene.</p>,
    strategy: <p>Impuls-teoremet: <InlineLatex latex="v_2=v_1+F\Delta t/m" />.</p>,
    hints: [{ label: "Hint", content: <p>Negativ kraft (mot venstre) gir negativt bidrag til v.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) 25 N mot høyre">
          <FormulaBox latex="v_2=v_0+\dfrac{F\Delta t}{m}=3{,}00+\dfrac{(25{,}0)(0{,}050)}{0{,}160}" />
          <FormulaBox latex="v_2=3{,}00+7{,}81=10{,}8\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_2\approx +10{,}8\;\text{m/s (mot høyre)}" />
        </Step>
        <Step n={2} title="(b) 12 N mot venstre">
          <FormulaBox latex="v_2=3{,}00+\dfrac{(-12{,}0)(0{,}050)}{0{,}160}=3{,}00-3{,}75" />
          <FormulaBox variant="gold" latex="v_2\approx -0{,}75\;\text{m/s (mot venstre)}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          I (b) reverseres puckens retning fordi impulsen er stor nok til å først stoppe pucken og deretter sende den motsatt vei.
        </p>
      </div>
    ),
    summary: <p>Konstant kraft × tid = impuls. Tegnet bestemmer om farten øker, minsker eller snur.</p>,
  },

  // ==========================================================================
  // 8.10 — Slagtre treffer ball med vinkel
  // ==========================================================================
  "8.10": {
    title: "Slagtre treffer ball — komponenter av kraft",
    difficulty: "vanskelig",
    pageRef: "s. 291",
    problem: (
      <div className="space-y-2">
        <p>
          Et slag­tre treffer en 0,145 kg baseball som reiser horisontalt mot høyre i 40,0 m/s.
          Etter slaget går ballen med 52,0 m/s ved 45° over horisontal­planet (og fortsatt fremover).
          Kontakt­tiden er 1,75 ms. Finn de horisontale og vertikale komponentene av den
          gjennomsnittlige kraften som slagtreet utøvet på ballen.
        </p>
        <svg viewBox="0 0 320 180" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* baseball før — kommer fra høyre, mot venstre */}
          <line x1="280" y1="120" x2="180" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="220" y="135" fontSize="10" fill="#3b82f6">før: 40 m/s ←</text>
          {/* slagtre */}
          <rect x="140" y="80" width="20" height="60" fill="#92400e" />
          <text x="140" y="160" fontSize="10" fill="#92400e">bat</text>
          {/* baseball etter — i 45° opp over (motsatt retning) */}
          <line x1="150" y1="120" x2="240" y2="40" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="180" y="50" fontSize="10" fill="#ef4444">etter: 52 m/s, 45°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}145\;\text{kg}" /></li>
        <li>Før: 40,0 m/s i +x; etter: 52,0 m/s ved 45° over −x</li>
        <li><InlineLatex latex="\Delta t=1{,}75\times 10^{-3}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Komponentene <InlineLatex latex="F_x" /> og <InlineLatex latex="F_y" /> av middel­kraften.</p>,
    strategy: (
      <TheoryBox title="Vektor­impuls — komponentvis">
        <p>
          Velg +x i ballens opprinnelige retning. Da er <InlineLatex latex="v_{1x}=+40{,}0,\;v_{1y}=0" />.
          Etter slaget går ballen motsatt vei og oppover: <InlineLatex latex="v_{2x}=-52{,}0\cos 45°,\;v_{2y}=+52{,}0\sin 45°" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>«Etter»-vektoren har <em>negativ</em> x-komponent (ball går tilbake mot pitcher).</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="F_{gj,x}=m\Delta v_x/\Delta t,\;F_{gj,y}=m\Delta v_y/\Delta t" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Komponenter etter slaget">
          <FormulaBox latex="v_{2x}=-52{,}0\cos 45°=-36{,}77\;\text{m/s}" />
          <FormulaBox latex="v_{2y}=+52{,}0\sin 45°=+36{,}77\;\text{m/s}" />
        </Step>
        <Step n={2} title="Endringer">
          <FormulaBox latex="\Delta v_x=v_{2x}-v_{1x}=-36{,}77-40{,}0=-76{,}77\;\text{m/s}" />
          <FormulaBox latex="\Delta v_y=v_{2y}-v_{1y}=+36{,}77-0=+36{,}77\;\text{m/s}" />
        </Step>
        <Step n={3} title="Komponenter av middel­kraft">
          <FormulaBox latex="F_x=\dfrac{m\Delta v_x}{\Delta t}=\dfrac{(0{,}145)(-76{,}77)}{1{,}75\times 10^{-3}}=-6{,}36\times 10^{3}\;\text{N}" />
          <FormulaBox latex="F_y=\dfrac{m\Delta v_y}{\Delta t}=\dfrac{(0{,}145)(36{,}77)}{1{,}75\times 10^{-3}}=+3{,}05\times 10^{3}\;\text{N}" />
          <FormulaBox variant="gold" latex="F_x\approx -6{,}36\,\text{kN (mot pitcher)},\;F_y\approx +3{,}05\,\text{kN (oppover)}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Total kraft: <InlineLatex latex="|F|=\sqrt{F_x^2+F_y^2}\approx 7{,}05\times 10^{3}" /> N. Vinkel:
          <InlineLatex latex="\arctan(F_y/|F_x|)\approx 25{,}6°" /> over horisontal — slagtreet skyver ballen oppover-bakover.
        </p>
      </div>
    ),
    summary: <p>2D impuls-problemer: jobb komponentvis, husk fortegn på «etter»-komponentene.</p>,
  },

  // ==========================================================================
  // 8.11 — Rakett med F = At²
  // ==========================================================================
  "8.11": {
    title: "Rakettmotor med F = At²",
    difficulty: "vanskelig",
    pageRef: "s. 292",
    problem: (
      <p>
        Ved <InlineLatex latex="t=0" /> tenner en 2150 kg rakett i tomrommet en motor som virker i +x-retning
        og hvor kraften øker med tid: <InlineLatex latex="F_x=At^2" />, og kraften har størrelsen
        781,25 N ved <InlineLatex latex="t=1{,}25\;\text{s}" />. (a) Finn SI-verdien av A. (b) Finn impulsen
        som motoren leverer i intervallet 1,50 s etter <InlineLatex latex="t=2{,}00\;\text{s}" />, dvs.
        fra t = 2,00 s til t = 3,50 s. (c) Finn farts­endringen i samme intervall.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=2150\;\text{kg},\;F_x(t)=At^2,\;F_x(1{,}25)=781{,}25\;\text{N}" /></li>
      </ul>
    ),
    unknowns: <p>(a) A. (b) Impuls fra 2,00 til 3,50 s. (c) <InlineLatex latex="\Delta v" /> samme intervall.</p>,
    strategy: <p>(a) Sett inn t=1,25 s og løs. (b) Integrer F dt. (c) <InlineLatex latex="\Delta v=J/m" />.</p>,
    hints: [{ label: "Hint", content: <p><InlineLatex latex="\int t^2\,dt=t^3/3" />, så impuls = <InlineLatex latex="A(t_2^3-t_1^3)/3" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Finn A">
          <FormulaBox latex="A=\dfrac{F_x}{t^2}=\dfrac{781{,}25}{(1{,}25)^2}=\dfrac{781{,}25}{1{,}5625}" />
          <FormulaBox variant="gold" latex="A=500\;\text{N/s}^2" />
        </Step>
        <Step n={2} title="(b) Impuls fra 2,00 til 3,50 s">
          <FormulaBox latex="J=\int_{2{,}00}^{3{,}50}At^2\,dt=\dfrac{A}{3}\bigl[t^3\bigr]_{2{,}00}^{3{,}50}" />
          <FormulaBox latex="J=\dfrac{500}{3}\bigl[(3{,}50)^3-(2{,}00)^3\bigr]=\dfrac{500}{3}\bigl[42{,}875-8{,}000\bigr]" />
          <FormulaBox latex="J=\dfrac{500}{3}\cdot 34{,}875=5812{,}5\;\text{N·s}" />
          <FormulaBox variant="gold" latex="J\approx 5{,}81\times 10^{3}\;\text{N·s}" />
        </Step>
        <Step n={3} title="(c) Fartsendring">
          <FormulaBox latex="\Delta v=\dfrac{J}{m}=\dfrac{5812{,}5}{2150}\approx 2{,}70\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\Delta v\approx 2{,}70\;\text{m/s (i +x)}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Tidsavhengig kraft krever integrasjon. Sjekk grenseverdiene nøye.
        </p>
      </div>
    ),
    summary: <p>For variabel kraft: integrer for å få impuls. Δv = J/m.</p>,
  },

  // ==========================================================================
  // 8.16 — Astronaut kaster verktøy
  // ==========================================================================
  "8.16": {
    title: "Astronaut kaster verktøy",
    difficulty: "lett",
    pageRef: "s. 292",
    problem: (
      <p>
        En 65,5 kg astronaut utfører reparasjoner i en romstasjon. Hun kaster et 2,50 kg verktøy
        bort fra seg med fart 3,10 m/s relativt til romstasjonen. Med hvilken fart, og i hvilken
        retning, beveger hun seg etterpå?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="M=65{,}5\;\text{kg},\;m=2{,}50\;\text{kg},\;v_\text{verktøy}=3{,}10\;\text{m/s}" /></li>
        <li>Begge i ro før kastet (relativt stasjonen)</li>
      </ul>
    ),
    unknowns: <p>Astronautens fart V og retning.</p>,
    strategy: <p>Ingen ytre horisontal kraft ⇒ bevegelses­mengde bevart fra null.</p>,
    hints: [{ label: "Hint", content: <p><InlineLatex latex="MV+mv=0\Rightarrow V=-mv/M" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Momentum-bevaring fra ro">
          <FormulaBox latex="0=MV+mv\Rightarrow V=-\dfrac{mv}{M}" />
          <FormulaBox latex="V=-\dfrac{(2{,}50)(3{,}10)}{65{,}5}=-0{,}1183\;\text{m/s}" />
          <FormulaBox variant="gold" latex="|V|\approx 0{,}118\;\text{m/s, motsatt vei av verktøyet}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Massefor­holdet 2,50/65,5 ≈ 0,038 betyr at astronauten beveger seg ~26 ganger saktere enn verktøyet.
        </p>
      </div>
    ),
    summary: <p>Rakettprinsippet: kaste m raskt frem ⇒ M får liten fart bakover.</p>,
  },

  // ==========================================================================
  // 8.20 — Catch-or-bounce på is
  // ==========================================================================
  "8.20": {
    title: "Catch eller bounce — friksjons­fri is",
    difficulty: "middels",
    pageRef: "s. 292",
    problem: (
      <p>
        Du står på et lag is som dekker gårdsplassen, så du kan se vekk fra friksjon. En venn
        kaster en 0,400 kg ball horisontalt mot deg med 10,0 m/s. Massen din er 70,0 kg. (a) Hvis
        du griper ballen, hvor raskt beveger du og ballen seg etterpå? (b) Hvis ballen i stedet
        treffer brystkassen din og spretter tilbake med 7,0 m/s i motsatt retning, hva er din fart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="M=70{,}0\;\text{kg},\;m=0{,}400\;\text{kg},\;v=10{,}0\;\text{m/s}" /></li>
        <li>(b): ball spretter til <InlineLatex latex="-7{,}0\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) felles fart etter griping. (b) din fart etter sprett.</p>,
    strategy: <p>Momentum-bevaring i begge tilfeller. (a) er helt uelastisk; (b) er ikke helt uelastisk.</p>,
    hints: [
      { label: "Hint 1", content: <p>(a): <InlineLatex latex="mv=(M+m)V" />.</p> },
      { label: "Hint 2", content: <p>(b): <InlineLatex latex="mv=mv'+MV" /> med <InlineLatex latex="v'=-7{,}0" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Du griper ballen (uelastisk)">
          <FormulaBox latex="V=\dfrac{mv}{M+m}=\dfrac{(0{,}400)(10{,}0)}{70{,}4}=0{,}0568\;\text{m/s}" />
          <FormulaBox variant="gold" latex="V\approx 0{,}0568\;\text{m/s i ballens retning}" />
        </Step>
        <Step n={2} title="(b) Ball spretter tilbake">
          <FormulaBox latex="mv=mv'+MV\Rightarrow V=\dfrac{m(v-v')}{M}=\dfrac{(0{,}400)(10{,}0-(-7{,}0))}{70{,}0}" />
          <FormulaBox latex="V=\dfrac{(0{,}400)(17{,}0)}{70{,}0}=0{,}0971\;\text{m/s}" />
          <FormulaBox variant="gold" latex="V\approx 0{,}0971\;\text{m/s i opprinnelig ballretning}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Du blir skjøvet ~70 % raskere når ballen spretter tilbake! Grunnen: total endring i ballens
          momentum er større når den snur retning enn når den bare stopper i hånden din.
        </p>
      </div>
    ),
    summary: <p>Sprettende ball gir mer impuls enn fanget ball — derfor er kollisjons­elastisitet viktig.</p>,
  },

  // ==========================================================================
  // 8.21 — Air-table puck kollisjon (ikke uelastisk)
  // ==========================================================================
  "8.21": {
    title: "Pucker på luft­bord — finn fart før kollisjon",
    difficulty: "middels",
    pageRef: "s. 292",
    problem: (
      <p>
        På et friksjons­fritt luft­bord beveger en 0,245 kg puck seg mot en stilles­tående 0,360 kg
        puck. Etter kollisjonen har 0,245 kg puck en fart 0,118 m/s mot venstre, og 0,360 kg puck
        beveger seg 0,650 m/s mot høyre. (a) Hva var farten til 0,245 kg puck før kollisjonen?
        (b) Beregn endringen i total kinetisk energi for systemet.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_A=0{,}245\;\text{kg},\;m_B=0{,}360\;\text{kg}" /></li>
        <li>Etter: <InlineLatex latex="v_{Af}=-0{,}118\;\text{m/s},\;v_{Bf}=+0{,}650\;\text{m/s}" /></li>
        <li><InlineLatex latex="v_{Bi}=0" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v_{Ai}" />. (b) <InlineLatex latex="\Delta K" />.</p>,
    strategy: <p>Bruk momentum-bevaring til å finne <InlineLatex latex="v_{Ai}" />. Så regn K før og etter.</p>,
    hints: [{ label: "Hint", content: <p>Velg +x mot høyre. <InlineLatex latex="v_{Af}" /> blir negativ.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Momentum-bevaring">
          <FormulaBox latex="m_A v_{Ai}+0=m_A v_{Af}+m_B v_{Bf}" />
          <FormulaBox latex="v_{Ai}=v_{Af}+\dfrac{m_B v_{Bf}}{m_A}=-0{,}118+\dfrac{(0{,}360)(0{,}650)}{0{,}245}" />
          <FormulaBox latex="v_{Ai}=-0{,}118+0{,}955=0{,}837\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_{Ai}\approx 0{,}837\;\text{m/s mot høyre}" />
        </Step>
        <Step n={2} title="(b) Endring i kinetisk energi">
          <FormulaBox latex="K_i=\tfrac12(0{,}245)(0{,}837)^2=0{,}0858\;\text{J}" />
          <FormulaBox latex="K_f=\tfrac12(0{,}245)(0{,}118)^2+\tfrac12(0{,}360)(0{,}650)^2" />
          <FormulaBox latex="K_f=0{,}00170+0{,}0761=0{,}0778\;\text{J}" />
          <FormulaBox variant="gold" latex="\Delta K=K_f-K_i=-0{,}00800\;\text{J (tap)}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          ~9 % av KE gikk tapt — kollisjonen er nesten elastisk, men ikke helt.
        </p>
      </div>
    ),
    summary: <p>Selv kollisjoner som ikke kleber er sjelden helt elastiske. ΔK forteller hvor mye «sklerose» det er.</p>,
  },

  // ==========================================================================
  // 8.24 — Fjær mellom A og B (Fig E8.24)
  // ==========================================================================
  "8.24": {
    title: "Fjær mellom blokk A og B (Fig E8.24)",
    difficulty: "middels",
    pageRef: "s. 292",
    problem: (
      <div className="space-y-2">
        <p>
          Blokk A i Fig. E8.24 har masse 1,00 kg, og B 3,00 kg. Blokkene er presset mot hver sin
          ende av en lett fjær S, slik at fjæra er sammen­presset. Systemet slippes deretter fra
          ro på et friksjons­fritt, horisontalt bord. Den endelige farten til A er 1,10 m/s.
          (a) Finn den endelige farten til blokk B. (b) Hvor mye potensiell energi var lagret i
          den sammen­pressede fjæra?
        </p>
        <svg viewBox="0 0 320 120" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* underlag */}
          <line x1="20" y1="100" x2="300" y2="100" stroke="#6b7280" strokeWidth="1" />
          {/* blokk A */}
          <rect x="60" y="65" width="40" height="35" fill="#ef4444" />
          <text x="73" y="88" fontSize="10" fill="white" fontWeight="bold">A</text>
          {/* fjær */}
          <path d="M 100 82 L 110 75 L 120 89 L 130 75 L 140 89 L 150 75 L 160 89 L 170 75 L 180 82" stroke="#92400e" strokeWidth="2" fill="none" />
          <text x="125" y="65" fontSize="9" fill="#92400e">S</text>
          {/* blokk B */}
          <rect x="180" y="55" width="60" height="45" fill="#3b82f6" />
          <text x="200" y="83" fontSize="10" fill="white" fontWeight="bold">B</text>
          {/* hastighetspiler etter slipp */}
          <line x1="55" y1="50" x2="20" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="20" y="42" fontSize="9" fill="#ef4444">v_A</text>
          <line x1="245" y1="50" x2="285" y2="50" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="270" y="42" fontSize="9" fill="#3b82f6">v_B</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_A=1{,}00\;\text{kg},\;m_B=3{,}00\;\text{kg}" /></li>
        <li>Start fra ro, fjær sammen­presset</li>
        <li>Slutt­fart A: <InlineLatex latex="v_A=1{,}10\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v_B" />. (b) Lagret <InlineLatex latex="U_\text{fjær}" />.</p>,
    strategy: <p>Momentum bevart fra null (intern fjær­kraft, ingen ytre). Energi: hele fjær­energien blir KE.</p>,
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="m_Av_A+m_Bv_B=0" /> (motsatt retning).</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="U_\text{fjær}=\tfrac12 m_Av_A^2+\tfrac12 m_Bv_B^2" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) Fart B fra momentum">
          <p>Velg +x mot høyre. A går mot venstre, så <InlineLatex latex="v_A=-1{,}10\;\text{m/s}" />.</p>
          <FormulaBox latex="0=m_Av_A+m_Bv_B\Rightarrow v_B=-\dfrac{m_Av_A}{m_B}=-\dfrac{(1{,}00)(-1{,}10)}{3{,}00}=+0{,}367\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_B=0{,}367\;\text{m/s mot høyre}" />
        </Step>
        <Step n={2} title="(b) Energi i fjæra = total KE etter">
          <FormulaBox latex="U=\tfrac12(1{,}00)(1{,}10)^2+\tfrac12(3{,}00)(0{,}367)^2" />
          <FormulaBox latex="U=0{,}605+0{,}202=0{,}807\;\text{J}" />
          <FormulaBox variant="gold" latex="U_\text{fjær}\approx 0{,}807\;\text{J}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Lett blokk får mer KE: 0,605 J vs. 0,202 J. Det er konsistent med at <InlineLatex latex="K=p^2/(2m)" /> — for samme |p| får
          lett blokk mer KE.
        </p>
      </div>
    ),
    summary: <p>Intern fjær­energi → 2 KE. Lett legeme får mest av den (men begge får like mye |p|).</p>,
  },

  // ==========================================================================
  // 8.27 — Hockeyspillere kolliderer
  // ==========================================================================
  "8.27": {
    title: "Hockey: forward møter forsvarer",
    difficulty: "middels",
    pageRef: "s. 292",
    problem: (
      <p>
        En 70,0 kg ishockey­spiller (forward) skøyter nordover med 5,5 m/s. En 110 kg forsvarer
        kommer mot ham fra nord med 4,0 m/s. Etter kollisjonen sitter spillerne sammen og beveger
        seg som ett legeme. I hvilken retning og med hvilken fart beveger de seg etterpå?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_1=70{,}0\;\text{kg},\;v_1=+5{,}5\;\text{m/s (mot N)}" /></li>
        <li><InlineLatex latex="m_2=110\;\text{kg},\;v_2=-4{,}0\;\text{m/s (mot S)}" /></li>
      </ul>
    ),
    unknowns: <p>Felles fart V og retning.</p>,
    strategy: <p>Helt uelastisk 1D-kollisjon: <InlineLatex latex="V=(m_1v_1+m_2v_2)/(m_1+m_2)" />.</p>,
    hints: [{ label: "Hint", content: <p>Tegn fortegn — forsvareren går mot S (negativ).</p> }],
    solution: (
      <div>
        <Step n={1} title="Felles fart">
          <FormulaBox latex="V=\dfrac{(70{,}0)(+5{,}5)+(110)(-4{,}0)}{180}=\dfrac{385-440}{180}=\dfrac{-55}{180}" />
          <FormulaBox variant="gold" latex="V\approx -0{,}306\;\text{m/s, dvs. 0,306 m/s mot SØR}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Forsvareren har større momentum (440 vs 385 kg·m/s), så den samlede klumpen driver i hans retning — sør.
        </p>
      </div>
    ),
    summary: <p>Ved frontkollisjon i 1D: tyngste momentum dikterer netto retning.</p>,
  },

  // ==========================================================================
  // 8.30 — Asteroide­kollisjon (Fig E8.30)
  // ==========================================================================
  "8.30": {
    title: "Asteroide­kollisjon (Fig E8.30)",
    difficulty: "vanskelig",
    pageRef: "s. 293",
    problem: (
      <div className="space-y-2">
        <p>
          To asteroider med ulike masser kolliderer i rommet og kleber sammen. Asteroide A
          (massen 1000 kg) beveger seg mot øst med 40,0 m/s. Asteroide B (massen 2000 kg)
          beveger seg slik som vist i Fig. E8.30 — ved 30,0° nord for vest med 50,0 m/s.
          Etter kollisjonen reiser den sammen­satte massen i en retning som vi skal finne.
          Bestem størrelse og retning av sluttvelosit­eten.
        </p>
        <svg viewBox="0 0 340 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* aksesett */}
          <line x1="20" y1="120" x2="320" y2="120" stroke="#6b7280" strokeWidth="1" />
          <line x1="170" y1="20" x2="170" y2="180" stroke="#6b7280" strokeWidth="1" />
          <text x="322" y="118" fontSize="10" fill="#6b7280">Ø</text>
          <text x="173" y="22" fontSize="10" fill="#6b7280">N</text>
          <text x="13" y="118" fontSize="10" fill="#6b7280">V</text>
          {/* A går mot øst */}
          <circle cx="100" cy="120" r="8" fill="#ef4444" />
          <text x="92" y="124" fontSize="9" fill="white" fontWeight="bold">A</text>
          <line x1="108" y1="120" x2="155" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="115" y="135" fontSize="9" fill="#ef4444">40 m/s</text>
          {/* B går SØV — egentlig 30° N for V */}
          <circle cx="230" cy="80" r="9" fill="#3b82f6" />
          <text x="222" y="84" fontSize="9" fill="white" fontWeight="bold">B</text>
          <line x1="222" y1="84" x2="170" y2="115" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="178" y="78" fontSize="9" fill="#3b82f6">50 m/s, 30° N for V</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>A: 1000 kg, +x (Ø), 40,0 m/s</li>
        <li>B: 2000 kg, 30° N for V (= 180−30 = 150° fra +x), 50,0 m/s</li>
      </ul>
    ),
    unknowns: <p>Sluttvelosit­et (størrelse + retning).</p>,
    strategy: <p>Helt uelastisk 2D. Komponentvis momentum-bevaring.</p>,
    hints: [{ label: "Hint", content: <p>B har <InlineLatex latex="v_{Bx}=-50\cos 30°,\;v_{By}=+50\sin 30°" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Komponenter">
          <FormulaBox latex="p_x=m_A v_{Ax}+m_B v_{Bx}=(1000)(40)+(2000)(-50\cos 30°)" />
          <FormulaBox latex="p_x=40\,000-86\,603=-46\,603\;\text{kg·m/s}" />
          <FormulaBox latex="p_y=0+(2000)(50\sin 30°)=50\,000\;\text{kg·m/s}" />
        </Step>
        <Step n={2} title="Felles fart">
          <FormulaBox latex="V_x=\dfrac{p_x}{M}=\dfrac{-46\,603}{3000}=-15{,}53\;\text{m/s}" />
          <FormulaBox latex="V_y=\dfrac{p_y}{M}=\dfrac{50\,000}{3000}=16{,}67\;\text{m/s}" />
        </Step>
        <Step n={3} title="Størrelse og retning">
          <FormulaBox latex="V=\sqrt{V_x^2+V_y^2}=\sqrt{241+278}=\sqrt{519}\approx 22{,}8\;\text{m/s}" />
          <FormulaBox latex="\theta=\arctan(V_y/|V_x|)=\arctan(16{,}67/15{,}53)\approx 47{,}0°" />
          <FormulaBox variant="gold" latex="V\approx 22{,}8\;\text{m/s, } 47{,}0°\text{ N for V (NV-kvadrant)}" />
        </Step>
      </div>
    ),
    summary: <p>2D inelastiske: regn p_x og p_y separat, så sett sammen vektor.</p>,
  },

  // ==========================================================================
  // 8.33 — Stor fisk eter liten fisk
  // ==========================================================================
  "8.33": {
    title: "Stor fisk gobbler liten fisk",
    difficulty: "lett",
    pageRef: "s. 293",
    problem: (
      <p>
        En 16,0 kg fisk svømmer mot høyre med 1,10 m/s og spiser plutselig en 4,40 kg fisk som
        var i ro. Anta vannet ikke utøver merkbar friksjon under spise­akten. (a) Finn farten til
        den store fisken etterpå. (b) Hvor mye mekanisk energi gikk tapt under prosessen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_A=16{,}0\;\text{kg},\;v_A=1{,}10\;\text{m/s},\;m_B=4{,}40\;\text{kg},\;v_B=0" /></li>
      </ul>
    ),
    unknowns: <p>(a) Felles fart V. (b) ΔK.</p>,
    strategy: <p>Helt uelastisk 1D.</p>,
    hints: [{ label: "Hint", content: <p>Gnask­ing er per definisjon helt uelastisk.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Felles fart">
          <FormulaBox latex="V=\dfrac{m_Av_A}{m_A+m_B}=\dfrac{(16{,}0)(1{,}10)}{20{,}4}=0{,}863\;\text{m/s}" />
          <FormulaBox variant="gold" latex="V\approx 0{,}863\;\text{m/s mot høyre}" />
        </Step>
        <Step n={2} title="(b) Energitap">
          <FormulaBox latex="K_i=\tfrac12(16{,}0)(1{,}10)^2=9{,}68\;\text{J}" />
          <FormulaBox latex="K_f=\tfrac12(20{,}4)(0{,}863)^2=7{,}60\;\text{J}" />
          <FormulaBox variant="gold" latex="\Delta K=K_i-K_f\approx 2{,}08\;\text{J tapt}" />
        </Step>
      </div>
    ),
    summary: <p>For uelastisk kollisjon med ett legeme i ro: <InlineLatex latex="K_f/K_i=m_A/(m_A+m_B)" />.</p>,
  },

  // ==========================================================================
  // 8.36 — Sportsbil/lastebil samme retning
  // ==========================================================================
  "8.36": {
    title: "Sportsbil bak lastebil — uelastisk",
    difficulty: "middels",
    pageRef: "s. 293",
    problem: (
      <p>
        En 1050 kg sportsbil i 13,0 m/s mot øst kolliderer med en 6320 kg lastebil i 11,0 m/s mot
        øst. Kjøretøyene henger sammen etter støtet. (a) Hva er farten på det sammen­hengende
        systemet rett etter kollisjonen? (b) Med hvilken fart må lastebilen ha kjørt for at sportsbilen
        skulle ha stoppet helt opp i kollisjonen? (c) Sammenlign endringene i kinetisk energi for
        situasjonene i (a) og (b). Hvilken er størst?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>Bil: <InlineLatex latex="m_1=1050,\;v_1=+13{,}0" /></li>
        <li>Lastebil: <InlineLatex latex="m_2=6320,\;v_2=+11{,}0" /></li>
      </ul>
    ),
    unknowns: <p>(a) V. (b) <InlineLatex latex="v_2" /> som gjør at <InlineLatex latex="v_{1f}=0" />? Egentlig V=0 for sportsbil ⇒ V=0. (c) Sammenlign ΔK.</p>,
    strategy: <p>(a) Helt uelastisk. (b) Kollisjon der V=0 etter krever bestemt <InlineLatex latex="v_2" />. (c) Sammenlign K_i og K_f.</p>,
    hints: [{ label: "Hint", content: <p>(b): hvis sportsbilen skal stoppe må samlet momentum etter være null (men da må også lastebilen stoppe siden de er sammenkoblet). Det krever at samlet p før er null: <InlineLatex latex="m_1v_1+m_2v_2=0" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Felles fart">
          <FormulaBox latex="V=\dfrac{(1050)(13{,}0)+(6320)(11{,}0)}{7370}=\dfrac{13\,650+69\,520}{7370}=\dfrac{83\,170}{7370}" />
          <FormulaBox variant="gold" latex="V\approx 11{,}3\;\text{m/s mot øst}" />
        </Step>
        <Step n={2} title="(b) Hvilken v₂ stopper sportsbilen?">
          <p>For at felles V = 0 må <InlineLatex latex="m_1v_1+m_2v_2=0" />:</p>
          <FormulaBox latex="v_2=-\dfrac{m_1v_1}{m_2}=-\dfrac{(1050)(13{,}0)}{6320}=-2{,}16\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_2\approx -2{,}16\;\text{m/s (mot vest, dvs. mot sportsbilen)}" />
        </Step>
        <Step n={3} title="(c) Sammenlign ΔK">
          <p>(a):</p>
          <FormulaBox latex="K_i=\tfrac12(1050)(13)^2+\tfrac12(6320)(11)^2=88\,725+382\,360=471\,085\;\text{J}" />
          <FormulaBox latex="K_f=\tfrac12(7370)(11{,}3)^2=470\,556\;\text{J}" />
          <FormulaBox latex="\Delta K_a\approx -0{,}5\;\text{kJ (lite, fordi farts­forskjell er kun 2 m/s)}" />
          <p>(b):</p>
          <FormulaBox latex="K_i=\tfrac12(1050)(13)^2+\tfrac12(6320)(2{,}16)^2=88\,725+14\,742=103\,467\;\text{J}" />
          <FormulaBox latex="K_f=0,\;\Delta K_b\approx -103\,\text{kJ}" />
          <FormulaBox variant="gold" latex="(b)\text{ taper langt mer KE}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Når begge kjørte i samme retning er den relative farten lav (2 m/s) og energi­tapet ubetydelig.
          Når lastebilen kommer mot sportsbilen er relativ fart 15,2 m/s — alt går tapt.
        </p>
      </div>
    ),
    summary: <p>Energi­tap i uelastisk kollisjon ∝ kvadratet av relativ fart før støtet.</p>,
  },

  // ==========================================================================
  // 8.37 — Slammy field tackle (defender N, forward E)
  // ==========================================================================
  "8.37": {
    title: "Tackle på leir­plassen — vinkler i 2D",
    difficulty: "vanskelig",
    pageRef: "s. 293",
    problem: (
      <p>
        På en gjørmete fotball­bane tackler en 90 kg forsvarer en 75 kg forward. Like før kollisjonen sklir
        forsvareren med 8,8 m/s mot nord, og forwarden 7,2 m/s mot øst. Hva er hastigheten (størrelse + retning)
        som de to spillerne beveger seg sammen med rett etter kollisjonen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>Forsvarer: 90 kg, +y (N), 8,8 m/s</li>
        <li>Forward: 75 kg, +x (Ø), 7,2 m/s</li>
      </ul>
    ),
    unknowns: <p>Felles V (størrelse + retning).</p>,
    strategy: <p>Helt uelastisk 2D.</p>,
    hints: [{ label: "Hint", content: <p>Komponenter ortogonale ⇒ Pythagoras.</p> }],
    solution: (
      <div>
        <Step n={1} title="Komponenter">
          <FormulaBox latex="V_x=\dfrac{(75)(7{,}2)}{165}=3{,}27\;\text{m/s}" />
          <FormulaBox latex="V_y=\dfrac{(90)(8{,}8)}{165}=4{,}80\;\text{m/s}" />
        </Step>
        <Step n={2} title="Størrelse og vinkel">
          <FormulaBox latex="V=\sqrt{3{,}27^2+4{,}80^2}=\sqrt{10{,}69+23{,}04}=5{,}81\;\text{m/s}" />
          <FormulaBox latex="\theta=\arctan(4{,}80/3{,}27)=55{,}7°\;\text{N for Ø}" />
          <FormulaBox variant="gold" latex="V\approx 5{,}81\;\text{m/s, } 55{,}7°\text{ N for Ø}" />
        </Step>
      </div>
    ),
    summary: <p>Tyngre legeme dominerer komponenten i sin retning.</p>,
  },

  // ==========================================================================
  // 8.41 — Trafikkulykke (Fig E8.41)
  // ==========================================================================
  "8.41": {
    title: "Trafikk­ulykke i kryss (Fig E8.41)",
    difficulty: "vanskelig",
    pageRef: "s. 294",
    problem: (
      <div className="space-y-2">
        <p>
          I et kryss kolliderer en 950 kg gul småbil som beveger seg mot øst med 16,0 m/s med en 1900 kg
          rød pickup som beveger seg mot nord (Fig. E8.41). Etter kollisjonen sitter de to kjøretøyene
          fast og glir med 16,0 m/s i en retning 24,0° øst for nord. Beregn farten til hvert kjøretøy
          rett før kollisjonen. Hva slags effekt hadde kollisjonen på fysisk skade og menneskelig ulykke?
        </p>
        <svg viewBox="0 0 320 220" className="w-full max-w-md mx-auto">
          <Arrowheads />
          {/* Veg-kryss */}
          <rect x="120" y="20" width="60" height="180" fill="#dee2e6" />
          <rect x="20" y="100" width="280" height="40" fill="#dee2e6" />
          {/* Gul bil mot øst */}
          <rect x="40" y="115" width="40" height="20" fill="#fbbf24" />
          <line x1="80" y1="125" x2="115" y2="125" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow-amber-k8)" />
          <text x="40" y="155" fontSize="9" fill="#92400e">950 kg, Ø</text>
          {/* Rød pickup mot nord */}
          <rect x="135" y="170" width="30" height="40" fill="#ef4444" />
          <line x1="150" y1="165" x2="150" y2="135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="170" y="195" fontSize="9" fill="#7f1d1d">1900 kg, N</text>
          {/* Etter: 16 m/s, 24° E for N */}
          <line x1="150" y1="120" x2="190" y2="55" stroke="#10b981" strokeWidth="3" strokeDasharray="3 2" markerEnd="url(#arrow-green-k8)" />
          <text x="195" y="50" fontSize="9" fill="#065f46">16,0 m/s, 24° Ø for N</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>Gul bil: 950 kg, +x (Ø), <InlineLatex latex="v_g=?" /></li>
        <li>Pickup: 1900 kg, +y (N), <InlineLatex latex="v_p=?" /></li>
        <li>Etter: 16,0 m/s, 24,0° Ø for N (24° fra +y mot +x)</li>
      </ul>
    ),
    unknowns: <p>Farten <InlineLatex latex="v_g" /> og <InlineLatex latex="v_p" /> før kollisjonen.</p>,
    strategy: <p>Bevart momentum komponentvis. Etter-vektoren har <InlineLatex latex="V_x=16\sin 24°,\;V_y=16\cos 24°" />.</p>,
    hints: [{ label: "Hint", content: <p>Total masse 2850 kg. Sett opp ligning for x og y separat.</p> }],
    solution: (
      <div>
        <Step n={1} title="Slutt-komponenter">
          <FormulaBox latex="V_x=16{,}0\sin 24°=6{,}51\;\text{m/s}" />
          <FormulaBox latex="V_y=16{,}0\cos 24°=14{,}62\;\text{m/s}" />
        </Step>
        <Step n={2} title="x-momentum: bare gul bil bidrar">
          <FormulaBox latex="m_g v_g=(m_g+m_p)V_x" />
          <FormulaBox latex="v_g=\dfrac{2850\cdot 6{,}51}{950}=19{,}5\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_g\approx 19{,}5\;\text{m/s mot Ø}" />
        </Step>
        <Step n={3} title="y-momentum: bare pickup bidrar">
          <FormulaBox latex="v_p=\dfrac{2850\cdot 14{,}62}{1900}=21{,}9\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_p\approx 21{,}9\;\text{m/s mot N}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Begge over fartsgrenser i et byby-kryss — typisk politisak­analyse for å rekonstruere hvem som kjørte for fort.
        </p>
      </div>
    ),
    summary: <p>2D uelastiske: del komponenter — hvert kjøretøy bidrar bare til sin egen retning før støtet.</p>,
  },

  // ==========================================================================
  // 8.42 — Kule i blokk + friksjon
  // ==========================================================================
  "8.42": {
    title: "Kule embedded i blokk, blokk glir og stopper",
    difficulty: "vanskelig",
    pageRef: "s. 294",
    problem: (
      <p>
        En 5,00 g kule skytes horisontalt inn i en 1,20 kg treblokk som hviler på et horisontalt
        underlag. Friksjons­koeffisienten mellom blokk og underlag er 0,20. Kulen sitter fast i blokka,
        og blokka sklir 0,310 m før den stopper. Finn kulens opprinnelige fart.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=5{,}00\times 10^{-3}\;\text{kg},\;M=1{,}20\;\text{kg}" /></li>
        <li><InlineLatex latex="\mu_k=0{,}20,\;d=0{,}310\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Kulens opprinnelige fart <InlineLatex latex="v" />.</p>,
    strategy: (
      <TheoryBox title="To-trinns: kollisjon + friksjons-stopp">
        <p>
          Kollisjon: <InlineLatex latex="mv=(m+M)V" /> (uelastisk).
          Etter kollisjon: friksjon stopper med <InlineLatex latex="V=\sqrt{2\mu_k g d}" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Først finn V fra friksjons­stopp, så v fra momentum.</p> }],
    solution: (
      <div>
        <Step n={1} title="V fra friksjon">
          <FormulaBox latex="V=\sqrt{2\mu_k g d}=\sqrt{2(0{,}20)(9{,}80)(0{,}310)}=\sqrt{1{,}2152}=1{,}102\;\text{m/s}" />
        </Step>
        <Step n={2} title="Kulens opprinnelige fart">
          <FormulaBox latex="v=\dfrac{(m+M)V}{m}=\dfrac{(1{,}205)(1{,}102)}{0{,}005}=\dfrac{1{,}328}{0{,}005}=265{,}7\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 266\;\text{m/s}" />
        </Step>
      </div>
    ),
    summary: <p>Klassisk to-trinns: momentum (kollisjon) + arbeid-energi (friksjon).</p>,
  },

  // ==========================================================================
  // 8.43 — Ballistisk pendel
  // ==========================================================================
  "8.43": {
    title: "Ballistisk pendel — full løsning",
    difficulty: "vanskelig",
    pageRef: "s. 294",
    problem: (
      <p>
        En 12,0 g rifle­kule blir avfyrt med 380 m/s inn i en ballistisk pendel med masse 9,00 kg, som
        henger fra en snor 70,0 cm lang. (a) Finn den vertikale høyden pendelen stiger. (b) Finn opprinnelig
        kinetisk energi til kulen. (c) Finn kinetisk energi til kule + pendel umiddelbart etter at kulen er fast.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}0120\;\text{kg},\;v=380\;\text{m/s},\;M=9{,}00\;\text{kg},\;L=0{,}700\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>(a) h. (b) <InlineLatex latex="K_i" />. (c) <InlineLatex latex="K_f" /> rett etter kollisjon.</p>,
    strategy: <p>Trinn 1: <InlineLatex latex="V=mv/(m+M)" />. Trinn 2: <InlineLatex latex="h=V^2/(2g)" />.</p>,
    hints: [{ label: "Hint", content: <p>K_f er KE til (m+M) som beveger seg med felles V.</p> }],
    solution: (
      <div>
        <Step n={1} title="V etter kollisjon">
          <FormulaBox latex="V=\dfrac{(0{,}0120)(380)}{9{,}012}=0{,}506\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Høyde">
          <FormulaBox latex="h=\dfrac{V^2}{2g}=\dfrac{(0{,}506)^2}{19{,}6}=0{,}01307\;\text{m}=1{,}31\;\text{cm}" />
          <FormulaBox variant="gold" latex="h\approx 1{,}31\;\text{cm}" />
        </Step>
        <Step n={3} title="(b) Opprinnelig KE">
          <FormulaBox latex="K_i=\tfrac12(0{,}0120)(380)^2=866\;\text{J}" />
        </Step>
        <Step n={4} title="(c) KE etter kollisjon">
          <FormulaBox latex="K_f=\tfrac12(9{,}012)(0{,}506)^2=1{,}154\;\text{J}" />
          <FormulaBox variant="gold" latex="K_i\approx 866\;\text{J},\;K_f\approx 1{,}15\;\text{J}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          99,87 % av KE gikk tapt i treet! Klassisk poeng: bruk momentum (ikke energi) i kollisjons­trinnet.
        </p>
      </div>
    ),
    summary: <p>To-trinns: momentum + energi. Aldri sett <InlineLatex latex="\tfrac12 mv^2=(m+M)gh" /> direkte.</p>,
  },

  // ==========================================================================
  // 8.46 — Elastisk: glider 0.160 mot glider 0.291 motsatt
  // ==========================================================================
  "8.46": {
    title: "Elastisk frontkollisjon — luftglidere",
    difficulty: "middels",
    pageRef: "s. 295",
    problem: (
      <p>
        En 0,160 kg glider beveger seg mot høyre med 0,90 m/s på et friksjons­fritt luft­spor og kolliderer
        elastisk og frontalt med en 0,291 kg glider som beveger seg mot venstre med 2,27 m/s. Finn slutt­fart
        og retning til hver glider.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_A=0{,}160,\;v_{Ai}=+0{,}90;\;m_B=0{,}291,\;v_{Bi}=-2{,}27" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="v_{Af},\;v_{Bf}" />.</p>,
    strategy: (
      <TheoryBox title="Elastisk 1D-formler">
        <p>
          <InlineLatex latex="v_{Af}=\dfrac{m_A-m_B}{m_A+m_B}v_{Ai}+\dfrac{2m_B}{m_A+m_B}v_{Bi}" />,
          tilsvarende for B med A og B byttet.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Total masse 0,451 kg. Begge formler bruker den.</p> }],
    solution: (
      <div>
        <Step n={1} title="Sett inn">
          <FormulaBox latex="v_{Af}=\dfrac{0{,}160-0{,}291}{0{,}451}(0{,}90)+\dfrac{2(0{,}291)}{0{,}451}(-2{,}27)" />
          <FormulaBox latex="v_{Af}=(-0{,}2905)(0{,}90)+(1{,}2904)(-2{,}27)=-0{,}2614-2{,}929=-3{,}19\;\text{m/s}" />
          <FormulaBox latex="v_{Bf}=\dfrac{2(0{,}160)}{0{,}451}(0{,}90)+\dfrac{0{,}291-0{,}160}{0{,}451}(-2{,}27)" />
          <FormulaBox latex="v_{Bf}=(0{,}7095)(0{,}90)+(0{,}2905)(-2{,}27)=0{,}6385-0{,}6594=-0{,}021\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_{Af}\approx -3{,}19\;\text{m/s},\;v_{Bf}\approx -0{,}021\;\text{m/s (begge mot V)}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Den lette glideren får stort sett B's fart i bakkant. Den tunge er nesten i ro etter — typisk for elastisk når en lett treffer en tung som kommer mot.
        </p>
      </div>
    ),
    summary: <p>1D elastisk: bruk de to standard­formlene direkte. Sjekk alltid både p og K bevart.</p>,
  },

  // ==========================================================================
  // 8.48 — Marbles, elastisk (Fig E8.48)
  // ==========================================================================
  "8.48": {
    title: "Klinkekuler i frontal elastisk kollisjon (Fig E8.48)",
    difficulty: "middels",
    pageRef: "s. 295",
    problem: (
      <p>
        En 10,0 g klinkekule glir mot venstre med 0,400 m/s på et iset fortau, og har frontal elastisk
        kollisjon med en 30,0 g klinkekule som glir mot høyre med 0,200 m/s. (a) Finn fart og retning til
        hver kule etterpå. (b) Hva er endringen i bevegelses­mengde for hver kule? (c) Hva er endringen i
        kinetisk energi for hver kule og samlet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m_A=0{,}010,\;v_{Ai}=-0{,}400;\;m_B=0{,}030,\;v_{Bi}=+0{,}200" /></li>
      </ul>
    ),
    unknowns: <p>Slutt­fart, Δp, ΔK.</p>,
    strategy: <p>Elastisk 1D-formler (A og B bytter rolle pga retningene).</p>,
    hints: [{ label: "Hint", content: <p>Velg +x mot høyre fra start. Da er v_A negativ.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Slutt­fart">
          <FormulaBox latex="v_{Af}=\dfrac{m_A-m_B}{0{,}040}v_{Ai}+\dfrac{2m_B}{0{,}040}v_{Bi}=(-0{,}5)(-0{,}4)+(1{,}5)(0{,}2)=0{,}2+0{,}3=0{,}500\;\text{m/s}" />
          <FormulaBox latex="v_{Bf}=\dfrac{2m_A}{0{,}040}v_{Ai}+\dfrac{m_B-m_A}{0{,}040}v_{Bi}=(0{,}5)(-0{,}4)+(0{,}5)(0{,}2)=-0{,}2+0{,}1=-0{,}100\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_{Af}=+0{,}500\;\text{m/s (h),}\;v_{Bf}=-0{,}100\;\text{m/s (v)}" />
        </Step>
        <Step n={2} title="(b) Endring i p">
          <FormulaBox latex="\Delta p_A=m_A(v_{Af}-v_{Ai})=0{,}010(0{,}500-(-0{,}400))=+9{,}00\times 10^{-3}\;\text{kg·m/s}" />
          <FormulaBox latex="\Delta p_B=0{,}030(-0{,}100-0{,}200)=-9{,}00\times 10^{-3}\;\text{kg·m/s}" />
          <p>Summen er null — som forventet (momentum bevart).</p>
        </Step>
        <Step n={3} title="(c) Endring i KE">
          <FormulaBox latex="K_{iA}=\tfrac12(0{,}010)(0{,}4)^2=8{,}00\times 10^{-4}\;\text{J}" />
          <FormulaBox latex="K_{fA}=\tfrac12(0{,}010)(0{,}5)^2=12{,}5\times 10^{-4}\;\text{J}" />
          <FormulaBox latex="\Delta K_A=+4{,}5\times 10^{-4}\;\text{J}" />
          <FormulaBox latex="K_{iB}=\tfrac12(0{,}030)(0{,}2)^2=6{,}00\times 10^{-4}\;\text{J}" />
          <FormulaBox latex="K_{fB}=\tfrac12(0{,}030)(0{,}1)^2=1{,}50\times 10^{-4}\;\text{J}" />
          <FormulaBox latex="\Delta K_B=-4{,}5\times 10^{-4}\;\text{J}" />
          <FormulaBox variant="gold" latex="\Delta K_\text{tot}=0\;\text{(elastisk!)}" />
        </Step>
      </div>
    ),
    summary: <p>I elastisk kollisjon: Δp på hver er motsatt og lik. ΔK på enkelt­legemer kan være ulik null, men summen er null.</p>,
  },

  // ==========================================================================
  // 8.52 — Sun-Jupiter COM
  // ==========================================================================
  "8.52": {
    title: "Massesenter for sol + Jupiter",
    difficulty: "lett",
    pageRef: "s. 295",
    problem: (
      <p>
        Bestem posisjonen til massesenteret for systemet sol + Jupiter (siden Jupiter er mer massiv enn alle
        andre planeter til sammen, er dette omtrent massesenteret for hele solsystemet). Ligger det innenfor
        eller utenfor solens overflate? Bruk verdier fra bokens data­tabell:
        <InlineLatex latex="\;M_\text{sol}=1{,}99\times 10^{30}\;\text{kg},\;M_J=1{,}90\times 10^{27}\;\text{kg},\;d_J=7{,}78\times 10^{11}\;\text{m},\;R_\text{sol}=6{,}96\times 10^{8}\;\text{m}" />.
      </p>
    ),
    knowns: <p>Som angitt i tekst.</p>,
    unknowns: <p>Avstand fra sol­senter til COM, og om den ligger inne/ute av solen.</p>,
    strategy: <p><InlineLatex latex="x_\text{cm}=M_J d_J/(M_\text{sol}+M_J)" />.</p>,
    hints: [{ label: "Hint", content: <p>Massefor­holdet <InlineLatex latex="M_J/(M_\text{sol}+M_J)" /> er liten.</p> }],
    solution: (
      <div>
        <Step n={1} title="Sett inn">
          <FormulaBox latex="x_\text{cm}=\dfrac{M_J d_J}{M_\text{sol}+M_J}=\dfrac{(1{,}90\times 10^{27})(7{,}78\times 10^{11})}{1{,}99\times 10^{30}+1{,}90\times 10^{27}}" />
          <FormulaBox latex="x_\text{cm}\approx \dfrac{1{,}478\times 10^{39}}{1{,}992\times 10^{30}}\approx 7{,}42\times 10^{8}\;\text{m}" />
          <FormulaBox variant="gold" latex="x_\text{cm}\approx 7{,}42\times 10^{8}\;\text{m fra sol­senter}" />
        </Step>
        <Step n={2} title="Sammenlign med solens radius">
          <p><InlineLatex latex="R_\text{sol}=6{,}96\times 10^{8}\;\text{m}" />. COM er <em>ca. 6,6 % utenfor</em> solens overflate.</p>
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Solen «vagger» faktisk litt rundt dette punktet — det er denne effekten man bruker for å oppdage exoplaneter.
        </p>
      </div>
    ),
    summary: <p>Vekt­gjennomsnitts­formel for COM. Sol+Jupiter: COM er like utenfor sol­overflaten.</p>,
  },

  // ==========================================================================
  // 8.54 — SUV/bil COM (Fig E8.54)
  // ==========================================================================
  "8.54": {
    title: "Massesenter for SUV + bil (Fig E8.54)",
    difficulty: "middels",
    pageRef: "s. 295",
    problem: (
      <p>
        En 1200 kg SUV beveger seg langs en horisontal vei med 12,0 m/s. En annen bil med masse 1800 kg
        og fart 20,0 m/s har sitt massesenter 40,0 m foran SUVens massesenter. Bilene beveger seg i samme
        retning. (a) Hvor er massesenteret for det samlede systemet, målt fra SUVens posisjon?
        (b) Beregn størrelsen av total bevegelses­mengde direkte. (c) Beregn farten til
        massesenteret. (d) Beregn total bevegelses­mengde via <InlineLatex latex="P=Mv_\text{cm}" /> og
        sammenlign med (b).
      </p>
    ),
    knowns: <p>Som tekst.</p>,
    unknowns: <p>(a) <InlineLatex latex="x_\text{cm}" />. (b) P direkte. (c) <InlineLatex latex="v_\text{cm}" />. (d) P via M·v_cm.</p>,
    strategy: <p>Definisjoner gjelder.</p>,
    hints: [{ label: "Hint", content: <p>Velg SUV ved x=0; den andre bilen ved x=40 m.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Posisjonen til COM">
          <FormulaBox latex="x_\text{cm}=\dfrac{(1200)(0)+(1800)(40{,}0)}{3000}=\dfrac{72\,000}{3000}=24{,}0\;\text{m}" />
          <FormulaBox variant="gold" latex="x_\text{cm}=24{,}0\;\text{m foran SUV}" />
        </Step>
        <Step n={2} title="(b) Total p">
          <FormulaBox latex="P=(1200)(12{,}0)+(1800)(20{,}0)=14\,400+36\,000=50\,400\;\text{kg·m/s}" />
        </Step>
        <Step n={3} title="(c) v_cm">
          <FormulaBox latex="v_\text{cm}=\dfrac{P}{M}=\dfrac{50\,400}{3000}=16{,}8\;\text{m/s}" />
        </Step>
        <Step n={4} title="(d) Sjekk">
          <FormulaBox latex="M v_\text{cm}=3000\cdot 16{,}8=50\,400\;\text{kg·m/s}=P" />
          <FormulaBox variant="gold" latex="\text{Stemmer (per definisjon)}" />
        </Step>
      </div>
    ),
    summary: <p>P = M·v_cm er ekvivalent med direkte sum av enkelt­momenta.</p>,
  },

  // ==========================================================================
  // 8.56 — System på x-aksen
  // ==========================================================================
  "8.56": {
    title: "Massesenter på x-aksen — finn ukjente",
    difficulty: "middels",
    pageRef: "s. 295",
    problem: (
      <p>
        Massesenteret til et system bestående av to partikler på x-aksen er ved <InlineLatex latex="x=2{,}0\;\text{m}" />,
        og dette beveger seg med hastighet <InlineLatex latex="(5{,}0\;\text{m/s})\hat i" />. Den ene partikkelen er
        i origo. Den andre har masse 0,10 kg og er i ro ved <InlineLatex latex="x=8{,}0\;\text{m}" />.
        (a) Hva er massen til partikkelen i origo? (b) Hva er den totale bevegelses­mengden til systemet?
        (c) Hva er hastigheten til partikkelen i origo?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="x_\text{cm}=2{,}0\;\text{m},\;v_\text{cm}=5{,}0\;\text{m/s}" /></li>
        <li>Partikkel 2: 0,10 kg ved x=8,0 m, i ro</li>
        <li>Partikkel 1: i origo, masse ukjent</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="m_1" />. (b) total p. (c) <InlineLatex latex="v_1" />.</p>,
    strategy: <p>Bruk COM-definisjon for posisjon og fart.</p>,
    hints: [{ label: "Hint", content: <p><InlineLatex latex="x_\text{cm}=(m_1\cdot 0+m_2\cdot 8)/M" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Masse av partikkel 1">
          <FormulaBox latex="2{,}0=\dfrac{(0)m_1+(8{,}0)(0{,}10)}{m_1+0{,}10}\Rightarrow 2{,}0(m_1+0{,}10)=0{,}80" />
          <FormulaBox latex="2m_1=0{,}80-0{,}20=0{,}60\Rightarrow m_1=0{,}30\;\text{kg}" />
          <FormulaBox variant="gold" latex="m_1=0{,}30\;\text{kg}" />
        </Step>
        <Step n={2} title="(b) Total p">
          <FormulaBox latex="P=Mv_\text{cm}=(0{,}40)(5{,}0)=2{,}0\;\text{kg·m/s}" />
        </Step>
        <Step n={3} title="(c) Hastighet til partikkel 1">
          <p>Bare partikkel 1 beveger seg (siden 2 er i ro):</p>
          <FormulaBox latex="P=m_1 v_1\Rightarrow v_1=\dfrac{2{,}0}{0{,}30}=6{,}67\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_1\approx 6{,}67\;\text{m/s i +x}" />
        </Step>
      </div>
    ),
    summary: <p>COM-definisjon kombinert med <InlineLatex latex="P=Mv_\text{cm}" /> løser ofte for ukjent masse/fart.</p>,
  },

  // ==========================================================================
  // 8.58 — CALC: COM-dynamikk
  // ==========================================================================
  "8.58": {
    title: "CALC: COM med variabel hastighet",
    difficulty: "vanskelig",
    pageRef: "s. 295",
    problem: (
      <p>
        Et system består av to partikler. Ved <InlineLatex latex="t=0" /> er én i origo; den andre, med masse 0,50 kg,
        er på y-aksen ved <InlineLatex latex="y=6{,}0\;\text{m}" />. Ved <InlineLatex latex="t=0" /> er COM på y-aksen
        ved <InlineLatex latex="y=2{,}4\;\text{m}" />. Hastigheten til COM er
        <InlineLatex latex="\;\vec v_\text{cm}=(0{,}75\;\text{m/s}^3)t^2\,\hat i" />.
        (a) Finn total masse. (b) Akselerasjon av COM ved en gitt tid t. (c) Netto ytre kraft på systemet ved
        <InlineLatex latex="\;t=3{,}0\;\text{s}" />.
      </p>
    ),
    knowns: <p>Som tekst.</p>,
    unknowns: <p>(a) M. (b) <InlineLatex latex="\vec a_\text{cm}(t)" />. (c) <InlineLatex latex="\vec F(3)" />.</p>,
    strategy: <p>Bruk COM-posisjon for masse, deriver v_cm for a_cm, og <InlineLatex latex="F=Ma" />.</p>,
    hints: [{ label: "Hint", content: <p>Totalt y-momentum av COM: <InlineLatex latex="M y_\text{cm}=m_1 y_1+m_2 y_2" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Total masse">
          <FormulaBox latex="2{,}4=\dfrac{m_1\cdot 0+(0{,}50)(6{,}0)}{m_1+0{,}50}\Rightarrow 2{,}4(m_1+0{,}50)=3{,}0" />
          <FormulaBox latex="m_1=0{,}75\;\text{kg},\;M=1{,}25\;\text{kg}" />
          <FormulaBox variant="gold" latex="M=1{,}25\;\text{kg}" />
        </Step>
        <Step n={2} title="(b) Akselerasjon av COM">
          <FormulaBox latex="\vec a_\text{cm}=\dfrac{d\vec v_\text{cm}}{dt}=(0{,}75)\cdot 2t\,\hat i=(1{,}50t)\,\hat i\;\text{m/s}^2" />
        </Step>
        <Step n={3} title="(c) Netto kraft ved t=3 s">
          <FormulaBox latex="\vec F=M\vec a_\text{cm}=1{,}25\cdot(1{,}50\cdot 3{,}0)\,\hat i=5{,}625\,\hat i\;\text{N}" />
          <FormulaBox variant="gold" latex="\vec F\approx 5{,}63\,\hat i\;\text{N}" />
        </Step>
      </div>
    ),
    summary: <p>Newton 2 for systemer: <InlineLatex latex="\vec F_\text{ekst}=M\vec a_\text{cm}" />.</p>,
  },

  // ==========================================================================
  // 8.59 — CALC: model plane
  // ==========================================================================
  "8.59": {
    title: "CALC: Modell­fly med tids­varierende p",
    difficulty: "vanskelig",
    pageRef: "s. 295",
    problem: (
      <p>
        Et radio­styrt modell­fly har bevegelses­mengde gitt ved
        <InlineLatex latex="\;\vec p=[(-0{,}75\;\text{kg·m/s}^3)t^2+(3{,}0\;\text{kg·m/s})]\hat i+(0{,}25\;\text{kg·m/s}^2)t\,\hat j" />.
        Hva er x-, y- og z-komponentene av netto ytre kraft på flyet?
      </p>
    ),
    knowns: <p>p(t) som angitt.</p>,
    unknowns: <p>F(t).</p>,
    strategy: <p>Newton 2: <InlineLatex latex="\vec F=d\vec p/dt" />.</p>,
    hints: [{ label: "Hint", content: <p>Deriver hver komponent.</p> }],
    solution: (
      <div>
        <Step n={1} title="Deriver komponentvis">
          <FormulaBox latex="F_x=\dfrac{d}{dt}\bigl[-0{,}75t^2+3{,}0\bigr]=-1{,}50t\;\text{N}" />
          <FormulaBox latex="F_y=\dfrac{d}{dt}\bigl[0{,}25t\bigr]=0{,}25\;\text{N (konstant)}" />
          <FormulaBox latex="F_z=0" />
          <FormulaBox variant="gold" latex="\vec F=-1{,}50t\,\hat i+0{,}25\,\hat j\;\text{N}" />
        </Step>
      </div>
    ),
    summary: <p><InlineLatex latex="\vec F=d\vec p/dt" /> komponent for komponent.</p>,
  },

  // ==========================================================================
  // 8.64 — Stålball faller, spretter
  // ==========================================================================
  "8.64": {
    title: "Stålball faller, spretter — impuls",
    difficulty: "middels",
    pageRef: "s. 296",
    problem: (
      <p>
        En 36,0 g stålball slippes fra en høyde 2,07 m ned på en horisontal stålplate. Ballen spretter til en
        høyde 1,54 m. (a) Beregn impulsen som platen leverer på ballen under støtet. (b) Hvis kontakttiden er
        2,50 ms, finn gjennomsnittlig kraft platen utøvde på ballen.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}036\;\text{kg},\;h_1=2{,}07\;\text{m},\;h_2=1{,}54\;\text{m},\;\Delta t=2{,}50\times 10^{-3}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) J. (b) <InlineLatex latex="F_\text{gj}" />.</p>,
    strategy: <p>Finn fart før og etter via energi: <InlineLatex latex="v=\sqrt{2gh}" />.</p>,
    hints: [{ label: "Hint", content: <p>Fart før er nedover (negativ y); fart etter er oppover (positiv y).</p> }],
    solution: (
      <div>
        <Step n={1} title="Hastigheter">
          <FormulaBox latex="v_1=-\sqrt{2gh_1}=-\sqrt{2(9{,}80)(2{,}07)}=-6{,}37\;\text{m/s}" />
          <FormulaBox latex="v_2=+\sqrt{2gh_2}=+\sqrt{2(9{,}80)(1{,}54)}=+5{,}50\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Impuls">
          <FormulaBox latex="J=m(v_2-v_1)=0{,}036\cdot[5{,}50-(-6{,}37)]=0{,}036\cdot 11{,}87" />
          <FormulaBox variant="gold" latex="J\approx +0{,}427\;\text{kg·m/s (oppover)}" />
        </Step>
        <Step n={3} title="(b) Gjennomsnittlig kraft">
          <FormulaBox latex="F_\text{gj}=\dfrac{J}{\Delta t}=\dfrac{0{,}427}{2{,}50\times 10^{-3}}\approx 171\;\text{N}" />
          <FormulaBox variant="gold" latex="F_\text{gj}\approx 171\;\text{N}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          171 N for en 36 g ball er ~480× ballens vekt.
        </p>
      </div>
    ),
    summary: <p>Impuls fra sprett involverer <em>begge</em> fart­vektorer.</p>,
  },

  // ==========================================================================
  // 8.65 — Tennis-racket impuls
  // ==========================================================================
  "8.65": {
    title: "Tennisball — vektor­impuls fra konstant kraft",
    difficulty: "vanskelig",
    pageRef: "s. 296",
    problem: (
      <p>
        Like før den treffer en racket har en tennisball som veier 0,560 N hastigheten
        <InlineLatex latex="\;\vec v=(20{,}0\;\text{m/s})\hat i-(4{,}0\;\text{m/s})\hat j" />.
        I løpet av 3,00 ms hvor ballen og racketen er i kontakt, virker en konstant netto kraft
        <InlineLatex latex="\;\vec F=-(380\;\text{N})\hat i+(110\;\text{N})\hat j" /> på ballen.
        Finn x- og y-komponentene av (a) impulsen, (b) sluttvelosit­eten.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>Vekt 0,560 N ⇒ <InlineLatex latex="m=W/g=0{,}0571\;\text{kg}" /></li>
        <li><InlineLatex latex="\Delta t=3{,}00\times 10^{-3}\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="\vec J" />. (b) <InlineLatex latex="\vec v_2" />.</p>,
    strategy: <p><InlineLatex latex="\vec J=\vec F\Delta t" />, <InlineLatex latex="\vec v_2=\vec v_1+\vec J/m" />.</p>,
    hints: [{ label: "Hint", content: <p>Vekt 0,560 N gir masse 0,0571 kg (deler på g).</p> }],
    solution: (
      <div>
        <Step n={1} title="(a) Impuls­komponenter">
          <FormulaBox latex="J_x=F_x\Delta t=(-380)(3{,}00\times 10^{-3})=-1{,}14\;\text{N·s}" />
          <FormulaBox latex="J_y=F_y\Delta t=(110)(3{,}00\times 10^{-3})=+0{,}330\;\text{N·s}" />
          <FormulaBox variant="gold" latex="\vec J=(-1{,}14\,\hat i+0{,}330\,\hat j)\;\text{N·s}" />
        </Step>
        <Step n={2} title="(b) Slutt­fart">
          <FormulaBox latex="v_{2x}=v_{1x}+\dfrac{J_x}{m}=20{,}0+\dfrac{-1{,}14}{0{,}0571}=20{,}0-19{,}96=+0{,}04\;\text{m/s}\approx 0" />
          <FormulaBox latex="v_{2y}=-4{,}0+\dfrac{0{,}330}{0{,}0571}=-4{,}0+5{,}78=+1{,}78\;\text{m/s}" />
          <FormulaBox variant="gold" latex="\vec v_2\approx (0\,\hat i+1{,}78\,\hat j)\;\text{m/s}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Ballen er nesten stilt­stående i x-retning og driver svakt oppover etter racket­treffet.
        </p>
      </div>
    ),
    summary: <p>Vektor­impuls = vektor­kraft × tid. Sett inn komponentvis.</p>,
  },

  // ==========================================================================
  // 8.69 — Tre kuler kolliderer (Fig P8.69)
  // ==========================================================================
  "8.69": {
    title: "Tre kuler stikker sammen i origo (Fig P8.69)",
    difficulty: "vanskelig",
    pageRef: "s. 296",
    problem: (
      <div className="space-y-2">
        <p>
          Tre kuler A (0,020 kg), B (0,030 kg) og C (0,050 kg) nærmer seg origo samtidig på et
          friksjons­fritt luft­bord. Innledningsvis har A og B hastigheter som vist i Fig. P8.69 — A går mot
          +x med 1,50 m/s, B går i 60° over −x med 0,50 m/s. Kulene ankommer origo samtidig og kleber
          sammen. (a) Hva er x- og y-komponentene av initial­hastigheten til C dersom alle tre beveger
          seg sammen med 0,50 m/s i +x-retning etter kollisjonen? (b) Hvis C har den hastigheten i (a),
          hva er endringen i kinetisk energi for systemet?
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto">
          <Arrowheads />
          <line x1="20" y1="100" x2="300" y2="100" stroke="#6b7280" strokeWidth="1" />
          <line x1="160" y1="20" x2="160" y2="180" stroke="#6b7280" strokeWidth="1" />
          {/* A fra venstre mot origo */}
          <circle cx="60" cy="100" r="6" fill="#ef4444" />
          <line x1="68" y1="100" x2="150" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k8)" />
          <text x="80" y="92" fontSize="9" fill="#ef4444">A 0,020</text>
          {/* B fra øvre høyre, mot origo */}
          <circle cx="260" cy="40" r="6" fill="#3b82f6" />
          <line x1="254" y1="44" x2="170" y2="92" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k8)" />
          <text x="220" y="35" fontSize="9" fill="#3b82f6">B 0,030, 60°</text>
          {/* C ukjent */}
          <circle cx="200" cy="160" r="6" fill="#10b981" />
          <text x="180" y="180" fontSize="9" fill="#10b981">C 0,050 (?)</text>
          <line x1="195" y1="155" x2="170" y2="115" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" markerEnd="url(#arrow-green-k8)" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>A: 0,020 kg, +x ved 1,50 m/s</li>
        <li>B: 0,030 kg, 60° over −x ved 0,50 m/s</li>
        <li>Etter: alle tre 0,50 m/s i +x</li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="v_{Cx},v_{Cy}" />. (b) ΔK.</p>,
    strategy: <p>Komponentvis momentum-bevaring.</p>,
    hints: [
      { label: "Hint", content: <p>B's komponenter: <InlineLatex latex="-0{,}50\cos 60°,\;+0{,}50\sin 60°" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="x-momentum">
          <FormulaBox latex="(0{,}020)(1{,}50)+(0{,}030)(-0{,}50\cos 60°)+(0{,}050)v_{Cx}=(0{,}100)(0{,}50)" />
          <FormulaBox latex="0{,}030+(-0{,}0075)+0{,}050 v_{Cx}=0{,}050" />
          <FormulaBox latex="v_{Cx}=\dfrac{0{,}0275}{0{,}050}=0{,}550\;\text{m/s}" />
        </Step>
        <Step n={2} title="y-momentum">
          <FormulaBox latex="0+(0{,}030)(0{,}50\sin 60°)+(0{,}050)v_{Cy}=0" />
          <FormulaBox latex="0{,}01299+0{,}050 v_{Cy}=0\Rightarrow v_{Cy}=-0{,}260\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v_{Cx}=+0{,}55\;\text{m/s},\;v_{Cy}=-0{,}26\;\text{m/s}" />
        </Step>
        <Step n={3} title="(b) ΔK">
          <FormulaBox latex="K_i=\tfrac12(0{,}020)(1{,}50)^2+\tfrac12(0{,}030)(0{,}50)^2+\tfrac12(0{,}050)(0{,}610)^2" />
          <FormulaBox latex="K_i=0{,}0225+0{,}00375+0{,}0093=0{,}0356\;\text{J}" />
          <FormulaBox latex="K_f=\tfrac12(0{,}100)(0{,}50)^2=0{,}0125\;\text{J}" />
          <FormulaBox variant="gold" latex="\Delta K=-0{,}0231\;\text{J (tap)}" />
        </Step>
      </div>
    ),
    summary: <p>Multi-objekt 2D: x og y separat. ΔK signaliserer hvor mye energi som forsvinner i kollisjonen.</p>,
  },

  // ==========================================================================
  // 8.79 — Kule i blokk på fjær
  // ==========================================================================
  "8.79": {
    title: "Kule treffer blokk koblet til fjær",
    difficulty: "vanskelig",
    pageRef: "s. 297",
    problem: (
      <p>
        En 8,00 g rifle­kule treffer og setter seg fast i en 0,992 kg blokk som hviler på et friksjons­fritt
        underlag og er festet til en ideell fjær. Sammen­presser fjæra 15,0 cm. Det måles at fjæra trenger
        en kraft på 0,750 N for å sammen­presses 0,250 cm. Finn (a) hastigheten til blokk + kule rett etter
        kollisjonen, (b) kulens initial­fart.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="m=0{,}008,\;M=0{,}992,\;x=0{,}150\;\text{m}" /></li>
        <li>Fjær­data: 0,750 N for 0,00250 m ⇒ k = 300 N/m</li>
      </ul>
    ),
    unknowns: <p>(a) V. (b) v.</p>,
    strategy: <p>Energibevaring etter kollisjon: <InlineLatex latex="\tfrac12(m+M)V^2=\tfrac12 kx^2" />.</p>,
    hints: [
      { label: "Hint", content: <p>k = F/x, så V = x√(k/(m+M)).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Fjær­konstant">
          <FormulaBox latex="k=\dfrac{F}{x}=\dfrac{0{,}750}{0{,}00250}=300\;\text{N/m}" />
        </Step>
        <Step n={2} title="(a) V etter kollisjon">
          <FormulaBox latex="\tfrac12(m+M)V^2=\tfrac12 kx^2\Rightarrow V=x\sqrt{\dfrac{k}{m+M}}" />
          <FormulaBox latex="V=0{,}150\sqrt{\dfrac{300}{1{,}000}}=0{,}150\cdot 17{,}32=2{,}60\;\text{m/s}" />
          <FormulaBox variant="gold" latex="V\approx 2{,}60\;\text{m/s}" />
        </Step>
        <Step n={3} title="(b) Kulens fart">
          <FormulaBox latex="v=\dfrac{(m+M)V}{m}=\dfrac{(1{,}000)(2{,}60)}{0{,}008}=325\;\text{m/s}" />
          <FormulaBox variant="gold" latex="v\approx 325\;\text{m/s}" />
        </Step>
      </div>
    ),
    summary: <p>To-trinns: momentum (kollisjon) + fjærenergi.</p>,
  },

  // ==========================================================================
  // 8.81 — Stuntman med chandelier
  // ==========================================================================
  "8.81": {
    title: "Stuntman på lysekrone — to-trinns",
    difficulty: "vanskelig",
    pageRef: "s. 297",
    problem: (
      <p>
        En film­stuntman (masse 80,0 kg) står på en vindus­karm 5,0 m over gulvet. Han griper et tau som
        er festet til en lysekrone og svinger ned for å kollidere med filmens skurk (masse 70,0 kg) som står
        rett under lysekronen. Stuntmanns massesenter beveger seg 5,0 m nedover. Han slipper tauet rett
        når han når skurken. (a) Med hvilken fart begynner de to sammen­filtrede å gli over gulvet?
        (b) Hvis friksjons­koeffisienten mellom dem og gulvet er 0,275, hvor langt sklir de før de stopper?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li><InlineLatex latex="M=80{,}0,\;h=5{,}0,\;m=70{,}0,\;\mu_k=0{,}275" /></li>
      </ul>
    ),
    unknowns: <p>(a) Felles V. (b) Skliavstand.</p>,
    strategy: (
      <TheoryBox title="Tre­trinns: sving + kollisjon + friksjon">
        <p>
          (1) Energi: <InlineLatex latex="V_\text{før}=\sqrt{2gh}" />.
          (2) Uelastisk kollisjon: <InlineLatex latex="V=MV_\text{før}/(M+m)" />.
          (3) Friksjon: <InlineLatex latex="d=V^2/(2\mu_k g)" />.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Friksjons­arbeid stopper systemet helt: <InlineLatex latex="\mu_k(M+m)g\,d=\tfrac12(M+m)V^2" />.</p> }],
    solution: (
      <div>
        <Step n={1} title="Stuntmanns fart rett før kollisjon">
          <FormulaBox latex="V_\text{før}=\sqrt{2gh}=\sqrt{2(9{,}80)(5{,}0)}=9{,}90\;\text{m/s}" />
        </Step>
        <Step n={2} title="(a) Felles fart">
          <FormulaBox latex="V=\dfrac{MV_\text{før}}{M+m}=\dfrac{80\cdot 9{,}90}{150}=5{,}28\;\text{m/s}" />
          <FormulaBox variant="gold" latex="V\approx 5{,}28\;\text{m/s}" />
        </Step>
        <Step n={3} title="(b) Skliavstand">
          <FormulaBox latex="d=\dfrac{V^2}{2\mu_k g}=\dfrac{(5{,}28)^2}{2(0{,}275)(9{,}80)}=\dfrac{27{,}88}{5{,}39}=5{,}17\;\text{m}" />
          <FormulaBox variant="gold" latex="d\approx 5{,}17\;\text{m}" />
        </Step>
      </div>
    ),
    summary: <p>Tre-trinns klassikere: energi + momentum + friksjon. Aldri bland over trinnene.</p>,
  },

  // ==========================================================================
  // 8.83 — 1D elastisk med α
  // ==========================================================================
  "8.83": {
    title: "1D elastisk: finn massefor­holdet α",
    difficulty: "vanskelig",
    pageRef: "s. 297",
    problem: (
      <p>
        Objekter A og B gjennomgår en 1-dimensjonal elastisk kollisjon. Initial­fart for A er
        <InlineLatex latex="\;v_{A1}" />, og initial­fart for B er null. Lign. 8.24 og 8.25 gir
        slutt­fartene. La <InlineLatex latex="\;m_A=\alpha m_B" />, der α er en konstant.
        (a) Hvilken verdi av α gjør at kinetisk energi til B etter kollisjon er lik kinetisk
        energi til A før? (b) Hvilken verdi av α gjør at sluttenergiene til A og B er like?
      </p>
    ),
    knowns: <p>Elastisk 1D, B i ro før, <InlineLatex latex="m_A=\alpha m_B" />.</p>,
    unknowns: <p>(a) α slik at <InlineLatex latex="K_{Bf}=K_{Ai}" />. (b) α slik at <InlineLatex latex="K_{Af}=K_{Bf}" />.</p>,
    strategy: (
      <TheoryBox title="Elastiske formler">
        <p>
          <InlineLatex latex="v_{Af}=\dfrac{\alpha-1}{\alpha+1}v_{A1}" />,
          <InlineLatex latex="\;v_{Bf}=\dfrac{2\alpha}{\alpha+1}v_{A1}" />.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="K_{Bf}=\tfrac12 m_B v_{Bf}^2" /> — uttrykk via α.</p> },
      { label: "Hint 2", content: <p>For (a): <InlineLatex latex="K_{Bf}=K_{Ai}=\tfrac12\alpha m_B v_{A1}^2" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="(a) K_Bf = K_Ai">
          <FormulaBox latex="\tfrac12 m_B\Bigl(\dfrac{2\alpha}{\alpha+1}\Bigr)^{\!2}v_{A1}^2=\tfrac12\alpha m_B v_{A1}^2" />
          <FormulaBox latex="\dfrac{4\alpha^2}{(\alpha+1)^2}=\alpha\Rightarrow 4\alpha=(\alpha+1)^2" />
          <FormulaBox latex="\alpha^2-2\alpha+1=0\Rightarrow \alpha=1" />
          <FormulaBox variant="gold" latex="\alpha=1\;\text{(like masser)}" />
        </Step>
        <Step n={2} title="(b) K_Af = K_Bf">
          <FormulaBox latex="\tfrac12 m_A v_{Af}^2=\tfrac12 m_B v_{Bf}^2" />
          <FormulaBox latex="\alpha\Bigl(\dfrac{\alpha-1}{\alpha+1}\Bigr)^{\!2}=\Bigl(\dfrac{2\alpha}{\alpha+1}\Bigr)^{\!2}" />
          <FormulaBox latex="\alpha(\alpha-1)^2=4\alpha^2" />
          <FormulaBox latex="(\alpha-1)^2=4\alpha\Rightarrow \alpha^2-6\alpha+1=0" />
          <FormulaBox latex="\alpha=3\pm 2\sqrt{2}" />
          <FormulaBox variant="gold" latex="\alpha=3+2\sqrt 2\approx 5{,}83\;\text{eller}\;\alpha=3-2\sqrt 2\approx 0{,}172" />
        </Step>
      </div>
    ),
    summary: <p>Elastiske 1D-relasjoner gir grunnlag for klassiske «sjekk-massefor­hold» problemer.</p>,
  },

  // ==========================================================================
  // 8.85 — Kule passerer gjennom blokk
  // ==========================================================================
  "8.85": {
    title: "Kule passerer gjennom blokk — friksjon stopper",
    difficulty: "vanskelig",
    pageRef: "s. 297",
    problem: (
      <p>
        En 4,00 g kule med horisontal hastighet 400 m/s skytes inn i en 0,800 kg trebloblok som hviler i ro.
        Kulen går rett gjennom og forlater blokka med 190 m/s. Blokka glir 72,0 cm før den stopper. (a) Finn
        kinetisk friksjons­koeffisient mellom blokk og underlag. (b) Finn nedgangen i kinetisk energi til
        kulen. (c) Finn kinetisk energi til blokka rett etter at kulen har passert.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>m=0,004 kg, v=400 m/s, v'=190 m/s; M=0,800 kg, d=0,720 m</li>
      </ul>
    ),
    unknowns: <p>(a) μ. (b) ΔK_kule. (c) K_blokk etter.</p>,
    strategy: <p>Momentum: finn V av blokk. Energi: friksjons­arbeid = K_blokk. Da μ.</p>,
    hints: [{ label: "Hint", content: <p><InlineLatex latex="V=\sqrt{2\mu g d}" /> for blokken.</p> }],
    solution: (
      <div>
        <Step n={1} title="Blokkens V etter kulen passerer">
          <FormulaBox latex="mv=mv'+MV\Rightarrow V=\dfrac{m(v-v')}{M}=\dfrac{(0{,}004)(210)}{0{,}800}=1{,}05\;\text{m/s}" />
        </Step>
        <Step n={2} title="(c) K_blokk etter">
          <FormulaBox latex="K_M=\tfrac12(0{,}800)(1{,}05)^2=0{,}441\;\text{J}" />
          <FormulaBox variant="gold" latex="K_M\approx 0{,}441\;\text{J}" />
        </Step>
        <Step n={3} title="(a) Friksjons­koeffisient">
          <FormulaBox latex="\mu_k Mgd=K_M\Rightarrow \mu_k=\dfrac{K_M}{Mgd}=\dfrac{0{,}441}{0{,}800\cdot 9{,}80\cdot 0{,}720}=0{,}0782" />
          <FormulaBox variant="gold" latex="\mu_k\approx 0{,}0782" />
        </Step>
        <Step n={4} title="(b) ΔK_kule">
          <FormulaBox latex="K_i-K_f=\tfrac12(0{,}004)(400)^2-\tfrac12(0{,}004)(190)^2=320-72{,}2=247{,}8\;\text{J}" />
          <FormulaBox variant="gold" latex="\Delta K_\text{kule}\approx 248\;\text{J tapt (av disse 0,4 J til blokka, 247,4 J til varme)}" />
        </Step>
      </div>
    ),
    summary: <p>Mesteparten av energien blir til varme i blokka, ikke til kinetisk energi.</p>,
  },

  // ==========================================================================
  // 8.88 — Nøytron-decay
  // ==========================================================================
  "8.88": {
    title: "Nøytron-desintegrasjon — energifordeling",
    difficulty: "vanskelig",
    pageRef: "s. 297",
    problem: (
      <p>
        Et nøytron i ro går spontant over til et proton og et elektron. Total energi som frigjøres er
        kinetisk energi i de to partiklene. Massen til protonet er 1836 ganger massen til elektronet.
        Hvilken brøkdel av total frigjort energi går til protonet?
      </p>
    ),
    knowns: <p><InlineLatex latex="m_p=1836\,m_e" />, nøytron i ro.</p>,
    unknowns: <p>Brøkdel av E som protonet får.</p>,
    strategy: <p>Momentum-bevaring fra ro: <InlineLatex latex="m_p v_p=m_e v_e" />. Da <InlineLatex latex="K=p^2/(2m)\propto 1/m" />.</p>,
    hints: [{ label: "Hint", content: <p>Lik momentum, så lavere masse får mer KE.</p> }],
    solution: (
      <div>
        <Step n={1} title="Energifor­hold">
          <FormulaBox latex="K_p=\dfrac{p^2}{2m_p},\;K_e=\dfrac{p^2}{2m_e}" />
          <FormulaBox latex="\dfrac{K_p}{K_p+K_e}=\dfrac{1/m_p}{1/m_p+1/m_e}=\dfrac{m_e}{m_e+m_p}=\dfrac{1}{1+1836}" />
          <FormulaBox variant="gold" latex="\dfrac{K_p}{K_\text{tot}}=\dfrac{1}{1837}\approx 5{,}44\times 10^{-4}\;\text{(ca. 0,054 %)}" />
        </Step>
        <p className="mt-2 italic text-[var(--muted)]">
          Det tyngre legemet får nesten ingenting av energien. Dette er hvorfor β-desintegrasjons­elektroner er så raske.
        </p>
      </div>
    ),
    summary: <p>Når momentum er likt: KE er invers med massen.</p>,
  },

  // ==========================================================================
  // 8.92 — Kvinne går i kano
  // ==========================================================================
  "8.92": {
    title: "Kvinne går i kano — kanoen sklir",
    difficulty: "middels",
    pageRef: "s. 297",
    problem: (
      <p>
        En 45,0 kg kvinne reiser seg opp i en 60,0 kg, 5,00 m lang kano. Hun starter 1,00 m fra én ende
        og går til 1,00 m fra den andre enden. Hvis vi ignorerer vannmotstand, hvor langt beveger kanoen
        seg under prosessen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>Kvinne 45,0 kg, kano 60,0 kg, kano 5,00 m, går mellom 1,00 og 4,00 m fra én ende ⇒ 3,00 m relativ vandring</li>
      </ul>
    ),
    unknowns: <p>Kanoens forflytning Δ_k.</p>,
    strategy: <p>COM beveger seg ikke (ingen ytre horisontal kraft). <InlineLatex latex="m\Delta_w+M\Delta_k=0" />, hvor Δw er kvinnes forflytning relativ vannet.</p>,
    hints: [
      { label: "Hint", content: <p>La <InlineLatex latex="\Delta_w" /> være kvinnes forskyvning, <InlineLatex latex="\Delta_k" /> kanoens. <InlineLatex latex="\Delta_w-\Delta_k=3{,}00" /> m (relativ til kano).</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Sett opp ligningene">
          <FormulaBox latex="m\Delta_w+M\Delta_k=0\Rightarrow \Delta_w=-\dfrac{M}{m}\Delta_k=-\dfrac{60}{45}\Delta_k" />
          <FormulaBox latex="\Delta_w-\Delta_k=3{,}00\Rightarrow -\dfrac{60}{45}\Delta_k-\Delta_k=3{,}00" />
          <FormulaBox latex="-\Delta_k\Bigl(\dfrac{60}{45}+1\Bigr)=3{,}00\Rightarrow -\Delta_k\cdot\dfrac{105}{45}=3{,}00" />
          <FormulaBox latex="\Delta_k=-\dfrac{3{,}00\cdot 45}{105}=-1{,}29\;\text{m}" />
          <FormulaBox variant="gold" latex="|\Delta_k|\approx 1{,}29\;\text{m (motsatt vei av kvinnen)}" />
        </Step>
      </div>
    ),
    summary: <p>COM-bevaring i et lukket system: alle relative bevegelser balanseres.</p>,
  },

  // ==========================================================================
  // 8.96 — Projektil eksploderer på topp
  // ==========================================================================
  "8.96": {
    title: "Projektil eksploderer ved apex",
    difficulty: "vanskelig",
    pageRef: "s. 297",
    problem: (
      <p>
        Et 20,0 kg projektil avfyres ved vinkel 60,0° over horisontal med fart 80,0 m/s. På banens høyeste
        punkt eksploderer projektilet i to like fragmenter. Det ene fragmentet faller deretter rett ned med
        null initial­fart. Ignorer luft­motstand. (a) Hvor langt fra avfyrings­punktet treffer det andre
        fragmentet bakken (terreng er flatt)? (b) Hvor mye energi ble frigjort under eksplosjonen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5">
        <li>M=20,0 kg, v₀=80,0 m/s, θ=60°</li>
        <li>Eksploderer ved apex, to like deler (10 kg hver)</li>
        <li>Fragment 1 faller vertikalt (v=0 etter eksplosjon)</li>
      </ul>
    ),
    unknowns: <p>(a) Lande­avstand for fragment 2. (b) Δ-energi.</p>,
    strategy: (
      <TheoryBox title="Skille horisontal og vertikal">
        <p>
          Etter eksplosjon: fragment 1 har v=0; fragment 2 må ha all horisontal momentum. COM lander der hele
          projektilet ville landet (luft­motstand ignorert).
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint 1", content: <p>Ved apex har projektilet bare horisontal fart <InlineLatex latex="\;v_x=v_0\cos\theta" />.</p> },
      { label: "Hint 2", content: <p>Range uten eksplosjon: <InlineLatex latex="R=v_0^2\sin 2\theta/g" />.</p> },
    ],
    solution: (
      <div>
        <Step n={1} title="Bane uten eksplosjon">
          <FormulaBox latex="R=\dfrac{v_0^2\sin 2\theta}{g}=\dfrac{(80)^2\sin 120°}{9{,}80}=\dfrac{6400\cdot 0{,}866}{9{,}80}=565{,}5\;\text{m}" />
          <p>Apex er ved x = R/2 = 282,8 m.</p>
        </Step>
        <Step n={2} title="Fragment 1 faller rett ned ved apex">
          <p>x₁ = 282,8 m. Tid for fall: <InlineLatex latex="t=\sqrt{2H/g}" /> hvor <InlineLatex latex="H=v_0^2\sin^2\theta/(2g)" />.</p>
        </Step>
        <Step n={3} title="(a) Fragment 2 lander">
          <p>
            COM lander ved R = 565,5 m. Fragment 1 ved x = 282,8 m. Like masser ⇒ COM er midten:
            <InlineLatex latex="\;(x_1+x_2)/2=R" />.
          </p>
          <FormulaBox latex="x_2=2R-x_1=2(565{,}5)-282{,}8=848{,}2\;\text{m}" />
          <FormulaBox variant="gold" latex="x_2\approx 848\;\text{m}" />
        </Step>
        <Step n={4} title="(b) Energi frigjort">
          <p>Ved apex: KE = ½M·v_x² = ½(20)(40)² = 16 000 J.</p>
          <p>Etter eksplosjon: fragment 1 har 0 KE. Fragment 2 har all horisontal momentum (M·v_x), så v_2 = 2v_x = 80 m/s.</p>
          <FormulaBox latex="K_\text{frag 2}=\tfrac12(10)(80)^2=32\,000\;\text{J}" />
          <FormulaBox latex="\Delta E=K_\text{etter}-K_\text{før}=32\,000-16\,000=16\,000\;\text{J}" />
          <FormulaBox variant="gold" latex="\Delta E=1{,}60\times 10^{4}\;\text{J}" />
        </Step>
      </div>
    ),
    summary: <p>Eksplosjon i flukt: COM fortsetter parabolsk bane (intern kraft), men fragmentene fordeler seg.</p>,
  },
};
