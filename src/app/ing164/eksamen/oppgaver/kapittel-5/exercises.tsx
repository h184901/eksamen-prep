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
      <marker id="arrow-red-k5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#a855f7" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 5
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 5.1 — Bildet som henger (likevekt med to snorer)
  // ==========================================================================
  "5.1": {
    title: "Bilde i likevekt — to snorer",
    difficulty: "lett",
    pageRef: "s. 168",
    problem: (
      <div className="space-y-2">
        <p>
          Et 8,00{"\u00A0"}kg maleri henger fra to snorer. Den venstre snoren går 30°
          over horisontalen, den høyre 45°. Finn snordragene i begge snorene.
        </p>
        <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          {/* ceiling */}
          <line x1="20" y1="20" x2="300" y2="20" stroke="currentColor" strokeWidth="2" />
          {/* walls / strings */}
          <line x1="80" y1="20" x2="160" y2="110" stroke="#3b82f6" strokeWidth="2" />
          <line x1="240" y1="20" x2="160" y2="110" stroke="#ef4444" strokeWidth="2" />
          <rect x="130" y="110" width="60" height="40" fill="#10b981" opacity="0.4" stroke="#10b981" />
          <text x="145" y="135" fontSize="11" fill="currentColor">8,00 kg</text>
          <text x="105" y="70" fontSize="11" fill="#3b82f6">T₁ (30°)</text>
          <text x="200" y="70" fontSize="11" fill="#ef4444">T₂ (45°)</text>
          <line x1="160" y1="150" x2="160" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber-k5)" />
          <text x="165" y="170" fontSize="11" fill="#f59e0b">W</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside space-y-1">
        <li>Masse: <InlineLatex latex="m = 8{,}00\ \text{kg}" /></li>
        <li>Vinkler: <InlineLatex latex="\alpha = 30^\circ" />, <InlineLatex latex="\beta = 45^\circ" /></li>
        <li>Tyngdeakselerasjon: <InlineLatex latex="g = 9{,}80\ \text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: (
      <p>Snordrag <InlineLatex latex="T_1" /> (venstre, 30°) og <InlineLatex latex="T_2" /> (høyre, 45°).</p>
    ),
    strategy: (
      <div>
        <p>
          Bildet er i <strong>likevekt</strong> ⇒ summen av krefter i både x- og y-retning
          er null. Dette gir to ligninger for de to ukjente snordragene.
        </p>
        <TheoryBox title="Første Newtons lov (Statikk)">
          <p>
            Et objekt i likevekt har null akselerasjon, så <InlineLatex latex="\sum\vec F=0" />.
            I komponenter: <InlineLatex latex="\sum F_x = 0" /> og <InlineLatex latex="\sum F_y = 0" />.
            Hver vektorlig gir én ligning — perfekt for to ukjente.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: (
          <p>
            Tegn frilegemediagram for knuten der snorene møtes. Krefter:
            <InlineLatex latex="\vec T_1" /> (opp til venstre), <InlineLatex latex="\vec T_2" />{" "}
            (opp til høyre), tyngden <InlineLatex latex="W=mg" /> nedover.
          </p>
        ),
      },
      {
        label: "Hint 2",
        content: (
          <p>
            Dekomponer: <InlineLatex latex="T_1" /> har komponenter
            <InlineLatex latex="(-T_1\cos 30^\circ,\ +T_1\sin 30^\circ)" />. Tilsvarende for <InlineLatex latex="T_2" /> med 45°, men x-komponenten er positiv.
          </p>
        ),
      },
      {
        label: "Hint 3",
        content: (
          <p>
            Fra x-ligningen: <InlineLatex latex="T_2 = T_1\cos 30^\circ/\cos 45^\circ" />.
            Sett inn i y-ligningen for å isolere <InlineLatex latex="T_1" />.
          </p>
        ),
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Frilegemediagram og koordinater">
          <p>
            Velg standard akser: x mot høyre, y oppover. Krefter på knuten:
          </p>
          <FormulaBox latex="\vec T_1 = (-T_1\cos 30^\circ,\ +T_1\sin 30^\circ)" variant="blue" />
          <FormulaBox latex="\vec T_2 = (+T_2\cos 45^\circ,\ +T_2\sin 45^\circ)" variant="blue" />
          <FormulaBox latex="\vec W = (0,\ -mg)" variant="blue" />
        </Step>

        <Step n={2} title="Newton 1 i x-retning">
          <FormulaBox latex="\sum F_x: -T_1\cos 30^\circ + T_2\cos 45^\circ = 0" variant="blue" />
          <FormulaBox latex="\Rightarrow T_2 = T_1\dfrac{\cos 30^\circ}{\cos 45^\circ} = T_1\cdot\dfrac{\sqrt{3}/2}{\sqrt{2}/2} = T_1\sqrt{\dfrac{3}{2}}" variant="blue" />
        </Step>

        <Step n={3} title="Newton 1 i y-retning">
          <FormulaBox latex="\sum F_y: T_1\sin 30^\circ + T_2\sin 45^\circ - mg = 0" variant="blue" />
          <p>Sett inn uttrykket for <InlineLatex latex="T_2" />:</p>
          <FormulaBox latex="T_1\cdot\tfrac12 + T_1\sqrt{\tfrac32}\cdot\tfrac{\sqrt 2}{2} = mg" variant="blue" />
          <FormulaBox latex="T_1\left(\tfrac12 + \tfrac{\sqrt 3}{2}\right) = mg" variant="blue" />
          <FormulaBox latex="T_1 = \dfrac{mg}{\tfrac12(1+\sqrt 3)} = \dfrac{2mg}{1+\sqrt 3}" variant="blue" />
        </Step>

        <Step n={4} title="Innsetting av tall">
          <FormulaBox latex="T_1 = \dfrac{2(8{,}00)(9{,}80)}{1+\sqrt 3} = \dfrac{156{,}8}{2{,}732}" variant="blue" />
          <FormulaBox latex="\boxed{T_1 \approx 57{,}4\ \text{N}}" variant="gold" />
          <FormulaBox latex="T_2 = T_1\sqrt{3/2} = 57{,}4\cdot 1{,}225" variant="blue" />
          <FormulaBox latex="\boxed{T_2 \approx 70{,}3\ \text{N}}" variant="gold" />
        </Step>

        <p className="mt-3 italic">
          Fysisk sjekk: Den brattere snoren (45°) bærer mest vekt — logisk, siden
          den peker «mer oppover».
        </p>
      </div>
    ),
    summary: (
      <p>
        <strong>Statikk i to dimensjoner:</strong> Dekomponer hver kraft, skriv
        <InlineLatex latex="\sum F_x=0" /> og <InlineLatex latex="\sum F_y=0" />, og løs.
        En strak, horisontal snor kan aldri bære vertikal vekt alene — vertikalkomponenten
        er alltid <InlineLatex latex="T\sin\theta" />, som går mot null når snoren flater ut.
      </p>
    ),
  },

  // ==========================================================================
  // 5.6 — Lampe mellom to vegger
  // ==========================================================================
  "5.6": {
    title: "Lampe hengt opp mellom to snorer — ulike lengder",
    difficulty: "middels",
    pageRef: "s. 168",
    problem: (
      <p>
        En 4,00{"\u00A0"}kg gatelampe henger midt mellom to stolper. Snoren fra venstre
        stolpe lager vinkelen 40,0° med horisontalen; snoren fra høyre stolpe lager 20,0°.
        Finn snordragene.
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m = 4{,}00\ \text{kg},\ g = 9{,}80\ \text{m/s}^2" /></li>
        <li>Venstre snor: 40,0° over horisontal (drar lampa mot venstre-opp)</li>
        <li>Høyre snor: 20,0° over horisontal (drar lampa mot høyre-opp)</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="T_1" /> og <InlineLatex latex="T_2" /></p>,
    strategy: (
      <div>
        <p>
          Eksakt samme type problem som 5.1: likevektsligninger i x og y.
          Merk at når vinklene er ulike, vil snoren med <em>lavere</em> vinkel
          faktisk måtte ha <em>større</em> drag.
        </p>
        <TheoryBox title="Hvorfor slak snor = stor kraft">
          <p>
            Vertikalkomponenten er <InlineLatex latex="T\sin\theta" />. Når <InlineLatex latex="\theta" />{" "}
            er liten (slak snor), trengs stor <InlineLatex latex="T" /> for å gi samme
            <InlineLatex latex="T\sin\theta" />. Dette er grunnen til at en klessnor <em>aldri</em> kan
            henge <em>helt</em> rett.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Frilegemediagram for knuten der alle snorene møtes (ved lampa).</p>,
      },
      {
        label: "Hint 2",
        content: <p>x: <InlineLatex latex="-T_1\cos 40^\circ + T_2\cos 20^\circ = 0" />. y: <InlineLatex latex="T_1\sin 40^\circ + T_2\sin 20^\circ = mg" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Likevektsligninger">
          <FormulaBox latex="T_2 = T_1\dfrac{\cos 40^\circ}{\cos 20^\circ} = T_1\cdot\dfrac{0{,}766}{0{,}940} = 0{,}8152\,T_1" variant="blue" />
        </Step>
        <Step n={2} title="Sett inn i y-ligningen">
          <FormulaBox latex="T_1\sin 40^\circ + (0{,}8152\,T_1)\sin 20^\circ = mg" variant="blue" />
          <FormulaBox latex="T_1(0{,}6428 + 0{,}2788) = (4{,}00)(9{,}80)" variant="blue" />
          <FormulaBox latex="T_1\cdot 0{,}9216 = 39{,}2 \Rightarrow T_1 = 42{,}5\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T_1 \approx 42{,}5\ \text{N}}" variant="gold" />
          <FormulaBox latex="T_2 = 0{,}8152\cdot 42{,}5 \approx 34{,}7\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T_2 \approx 34{,}7\ \text{N}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Snor med brattere vinkel (40°) har større drag (42,5 N) enn den slakere (34,7 N).
        Dette er motsatt intuisjon hvis man tror slak snor = avslappet!
      </p>
    ),
  },

  // ==========================================================================
  // 5.8 — Blokk på friksjonsfritt skråplan
  // ==========================================================================
  "5.8": {
    title: "Blokk på friksjonsfritt skråplan",
    difficulty: "lett",
    pageRef: "s. 168",
    problem: (
      <div className="space-y-2">
        <p>
          En 5,00{"\u00A0"}kg blokk slippes på et friksjonsfritt skråplan med
          stigningsvinkel 30,0°. Finn (a) blokkens akselerasjon og (b) normalkraften fra planet.
        </p>
        <svg viewBox="0 0 300 180" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <polygon points="30,150 270,150 270,60" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="240" y="140" fontSize="11" fill="currentColor">30°</text>
          <g transform="translate(180,100) rotate(-30)">
            <rect x="-20" y="-20" width="40" height="30" fill="#10b981" opacity="0.5" stroke="#10b981" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber-k5)" />
            <text x="5" y="35" fontSize="10" fill="#f59e0b">W</text>
            <line x1="0" y1="-20" x2="0" y2="-55" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k5)" />
            <text x="-15" y="-40" fontSize="10" fill="#3b82f6">n</text>
          </g>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m = 5{,}00\ \text{kg}" />, <InlineLatex latex="\theta = 30{,}0^\circ" /></li>
        <li>Friksjonsfritt ⇒ <InlineLatex latex="\mu = 0" /></li>
      </ul>
    ),
    unknowns: <p>(a) <InlineLatex latex="a" />, (b) normalkraft <InlineLatex latex="n" /></p>,
    strategy: (
      <div>
        <p>
          Klassisk skråplan-problem. Nøkkelen er å <strong>rotere koordinatsystemet</strong> så
          x-aksen peker langs skråplanet (i bevegelsens retning) og y vinkelrett opp fra overflaten.
          Da er akselerasjon bare i x-retningen — enkel algebra.
        </p>
        <TheoryBox title="Newton 2 på skråplan">
          <p>
            Langs skråplan: <InlineLatex latex="F_\parallel = mg\sin\theta" />, som gir
            akselerasjon <InlineLatex latex="a = g\sin\theta" />. Vinkelrett på skråplan
            (ingen bevegelse ⇒ likevekt): <InlineLatex latex="n = mg\cos\theta" />.
            Disse to relasjonene er verdt å huske!
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Dekomponer <InlineLatex latex="\vec W" /> langs og vinkelrett på skråplanet.</p>,
      },
      {
        label: "Hint 2",
        content: <p><InlineLatex latex="W_\parallel = mg\sin\theta" />, <InlineLatex latex="W_\perp = mg\cos\theta" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Koordinater langs skråplanet">
          <p>
            x-aksen peker ned skråplanet (bevegelsesretning), y-aksen vinkelrett ut fra
            overflaten. Krefter i disse retningene:
          </p>
          <ul className="list-disc list-inside">
            <li><InlineLatex latex="W_x = mg\sin\theta" /> (ned langs skråplanet)</li>
            <li><InlineLatex latex="W_y = -mg\cos\theta" /> (inn i overflaten)</li>
            <li><InlineLatex latex="n_y = +n" /> (ut fra overflaten)</li>
          </ul>
        </Step>
        <Step n={2} title="Newton 2 i x-retning (langs plan)">
          <FormulaBox latex="\sum F_x = ma_x: \quad mg\sin\theta = ma" variant="blue" />
          <FormulaBox latex="a = g\sin\theta = (9{,}80)\sin 30^\circ = 4{,}90\ \text{m/s}^2" variant="blue" />
          <FormulaBox latex="\boxed{a = 4{,}90\ \text{m/s}^2 \text{ ned skråplanet}}" variant="gold" />
        </Step>
        <Step n={3} title="Newton 2 i y-retning (vinkelrett)">
          <p>Ingen bevegelse vinkelrett, så <InlineLatex latex="a_y=0" />:</p>
          <FormulaBox latex="n - mg\cos\theta = 0 \Rightarrow n = mg\cos\theta" variant="blue" />
          <FormulaBox latex="n = (5{,}00)(9{,}80)\cos 30^\circ = 42{,}4\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{n \approx 42{,}4\ \text{N}}" variant="gold" />
        </Step>
        <p className="italic mt-3">
          Merk: <InlineLatex latex="a" /> avhenger <em>ikke</em> av massen.
          En fjær og en steinklump akselererer likt ned et friksjonsfritt skråplan —
          samme grunn som at alt faller likt i vakuum.
        </p>
      </div>
    ),
    summary: (
      <p>
        Standardmal: Roter koordinater langs planet. <InlineLatex latex="a=g\sin\theta" />,
        <InlineLatex latex="n=mg\cos\theta" />. Ekstremtilfeller: <InlineLatex latex="\theta=0" />
        (flat) ⇒ <InlineLatex latex="a=0,\ n=mg" />. <InlineLatex latex="\theta=90^\circ" />
        (fritt fall) ⇒ <InlineLatex latex="a=g,\ n=0" />.
      </p>
    ),
  },

  // ==========================================================================
  // 5.9 — To masser over friksjonsfri trinse
  // ==========================================================================
  "5.9": {
    title: "To masser over trinse (Atwood)",
    difficulty: "middels",
    pageRef: "s. 168",
    problem: (
      <div className="space-y-2">
        <p>
          To klosser med masser <InlineLatex latex="m_1 = 3{,}00\ \text{kg}" /> og
          <InlineLatex latex="m_2 = 5{,}00\ \text{kg}" /> henger fra hver sin ende av en
          lett snor over en friksjonsfri trinse. Finn akselerasjonen og snordraget.
        </p>
        <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <circle cx="140" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="140" cy="30" r="3" fill="currentColor" />
          <line x1="122" y1="30" x2="122" y2="130" stroke="currentColor" strokeWidth="1.5" />
          <line x1="158" y1="30" x2="158" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <rect x="105" y="130" width="35" height="35" fill="#3b82f6" opacity="0.5" stroke="#3b82f6" />
          <text x="110" y="152" fontSize="10" fill="currentColor">3 kg</text>
          <rect x="141" y="100" width="35" height="45" fill="#ef4444" opacity="0.5" stroke="#ef4444" />
          <text x="146" y="127" fontSize="10" fill="currentColor">5 kg</text>
          <line x1="122" y1="170" x2="122" y2="195" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k5)" />
          <text x="95" y="190" fontSize="10" fill="#3b82f6">opp</text>
          <line x1="158" y1="150" x2="158" y2="195" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k5)" />
          <text x="165" y="190" fontSize="10" fill="#ef4444">ned</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m_1 = 3{,}00\ \text{kg}" /> (lettere), <InlineLatex latex="m_2 = 5{,}00\ \text{kg}" /> (tyngre)</li>
        <li>Friksjonsfri, masseløs trinse og snor</li>
      </ul>
    ),
    unknowns: <p>Akselerasjon <InlineLatex latex="a" /> og snordrag <InlineLatex latex="T" />.</p>,
    strategy: (
      <div>
        <p>
          Trinsen bare bytter retning på snoren — draget er likt i begge ender (fordi snoren er
          masseløs og trinsen friksjonsfri). Snoren er uten tøyning, så begge masser har samme
          akselerasjons-<em>størrelse</em>, bare motsatt retning.
        </p>
        <TheoryBox title="Atwoods maskin">
          <p>
            For to masser over trinse med masse 0 og friksjon 0:
          </p>
          <FormulaBox latex="a = \dfrac{(m_2-m_1)g}{m_1+m_2}, \qquad T = \dfrac{2m_1m_2 g}{m_1+m_2}" variant="blue" />
          <p>
            Tyngre side akselererer ned, lettere opp. Formelen utledes ved å skrive Newton 2
            for hver masse og addere ligningene for å eliminere <InlineLatex latex="T" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>For <InlineLatex latex="m_1" /> (opp): <InlineLatex latex="T - m_1g = m_1a" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>For <InlineLatex latex="m_2" /> (ned): <InlineLatex latex="m_2g - T = m_2a" />.</p>,
      },
      {
        label: "Hint 3",
        content: <p>Adder de to ligningene ⇒ <InlineLatex latex="T" /> forsvinner og du kan isolere <InlineLatex latex="a" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Frilegemediagram for hver masse">
          <p>
            For <InlineLatex latex="m_1" /> (som aksepteres å akselerere oppover, positiv retning up):
            <InlineLatex latex="T" /> opp, <InlineLatex latex="m_1 g" /> ned.
          </p>
          <p>
            For <InlineLatex latex="m_2" /> (akselererer ned, positiv retning down):
            <InlineLatex latex="m_2 g" /> ned, <InlineLatex latex="T" /> opp.
          </p>
        </Step>
        <Step n={2} title="Newton 2 for hver masse">
          <FormulaBox latex="(1):\ T - m_1 g = m_1 a" variant="blue" />
          <FormulaBox latex="(2):\ m_2 g - T = m_2 a" variant="blue" />
        </Step>
        <Step n={3} title="Eliminer T — adder ligningene">
          <FormulaBox latex="(m_2 - m_1)g = (m_1 + m_2)a" variant="blue" />
          <FormulaBox latex="a = \dfrac{(m_2 - m_1)g}{m_1+m_2} = \dfrac{(5{,}00-3{,}00)(9{,}80)}{8{,}00}" variant="blue" />
          <FormulaBox latex="\boxed{a = 2{,}45\ \text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={4} title="Sett tilbake for å finne T">
          <FormulaBox latex="T = m_1(g+a) = (3{,}00)(9{,}80+2{,}45) = 36{,}75\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T \approx 36{,}8\ \text{N}}" variant="gold" />
        </Step>
        <p className="italic mt-3">
          Sjekk: <InlineLatex latex="T" /> ligger mellom de to vektene (29,4 N og 49,0 N) — riktig,
          for den lettere blir akselerert oppover, den tyngre bremset nedover.
        </p>
      </div>
    ),
    summary: (
      <p>
        <strong>Atwoods maskin</strong> er en klassiker: skriv Newton 2 for hver masse,
        bruk at de har samme <InlineLatex latex="|a|" />, eliminer <InlineLatex latex="T" />.
        Grenser: Like masser ⇒ <InlineLatex latex="a=0" />. Én masse null ⇒ fritt fall.
      </p>
    ),
  },

  // ==========================================================================
  // 5.15 — Heis med apparent weight
  // ==========================================================================
  "5.15": {
    title: "Tilsynelatende vekt i akselererende heis",
    difficulty: "middels",
    pageRef: "s. 169",
    problem: (
      <p>
        En 72,0{"\u00A0"}kg person står på en vekt i en heis. Hva leser vekta når heisen
        (a) akselererer oppover med 3,20{"\u00A0"}m/s², (b) er i konstant hastighet,
        (c) akselererer nedover med 2,40{"\u00A0"}m/s², (d) er i fritt fall?
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li><InlineLatex latex="m = 72{,}0\ \text{kg},\ g = 9{,}80\ \text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: <p>Normalkraft <InlineLatex latex="n" /> (= det vekta viser) i hvert tilfelle.</p>,
    strategy: (
      <div>
        <p>
          Vekta viser normalkraften. Skriv Newton 2 for personen: <InlineLatex latex="n - mg = ma" />,
          der <InlineLatex latex="a" /> har <em>fortegn</em> (positiv oppover).
        </p>
        <TheoryBox title="Apparent vekt (tilsynelatende vekt)">
          <FormulaBox latex="n = m(g + a_y)" variant="blue" />
          <p>
            Hvis heisen akselererer opp (<InlineLatex latex="a_y>0" />): du føles tyngre.
            Akselererer ned (<InlineLatex latex="a_y<0" />): du føles lettere.
            I fritt fall (<InlineLatex latex="a_y=-g" />): <InlineLatex latex="n=0" /> — vektløshet!
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Vær nøye med fortegn: <InlineLatex latex="a_y" /> er positiv oppover, negativ nedover.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <p><strong>(a)</strong> <InlineLatex latex="a_y=+3{,}20\ \text{m/s}^2" />:</p>
        <FormulaBox latex="n = m(g+a_y) = 72{,}0(9{,}80+3{,}20) = 72{,}0\cdot 13{,}0" variant="blue" />
        <FormulaBox latex="\boxed{n = 936\ \text{N}}" variant="gold" />
        <p><strong>(b)</strong> <InlineLatex latex="a_y=0" />:</p>
        <FormulaBox latex="n = mg = 72{,}0\cdot 9{,}80 = 706\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{n \approx 706\ \text{N}}" variant="gold" />
        <p><strong>(c)</strong> <InlineLatex latex="a_y=-2{,}40\ \text{m/s}^2" />:</p>
        <FormulaBox latex="n = 72{,}0(9{,}80-2{,}40) = 72{,}0\cdot 7{,}40" variant="blue" />
        <FormulaBox latex="\boxed{n \approx 533\ \text{N}}" variant="gold" />
        <p><strong>(d)</strong> Fritt fall: <InlineLatex latex="a_y=-g" />:</p>
        <FormulaBox latex="n = m(g-g) = 0" variant="blue" />
        <FormulaBox latex="\boxed{n = 0\ \text{N (vektløshet)}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Vekta måler <em>kontaktkraften</em>, ikke tyngden. I akselererte systemer endrer
        denne seg — grunnen til at astronauter i bane føles vektløse selv om tyngdekrafta fortsatt virker.
      </p>
    ),
  },

  // ==========================================================================
  // 5.16 — Trekk på kasse langs gulv
  // ==========================================================================
  "5.16": {
    title: "Kasse trukket langs friksjonsfritt gulv",
    difficulty: "lett",
    pageRef: "s. 169",
    problem: (
      <p>
        En 25,0{"\u00A0"}kg kasse dras horisontalt over et friksjonsfritt gulv med en konstant
        kraft på 80,0{"\u00A0"}N. (a) Finn akselerasjonen. (b) Hvor langt beveger kassen seg på
        3,00 sekunder fra ro?
      </p>
    ),
    knowns: <p><InlineLatex latex="m=25{,}0\ \text{kg},\ F=80{,}0\ \text{N},\ t=3{,}00\ \text{s}" />, start i ro, friksjonsfritt.</p>,
    unknowns: <p><InlineLatex latex="a" /> og <InlineLatex latex="x(t)" />.</p>,
    strategy: (
      <div>
        <p>Newton 2 gir akselerasjonen. Bruk så kinematikk (konst. akselerasjon fra ro).</p>
        <TheoryBox title="Nøkkelformler">
          <FormulaBox latex="F = ma,\quad x(t) = \tfrac12 a t^2\ \text{(fra ro)}" variant="blue" />
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Ingen friksjon ⇒ nettokraft = anvendt kraft.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="a = F/m = 80{,}0/25{,}0 = 3{,}20\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a = 3{,}20\ \text{m/s}^2}" variant="gold" />
        <FormulaBox latex="x = \tfrac12 a t^2 = \tfrac12(3{,}20)(3{,}00)^2 = 14{,}4\ \text{m}" variant="blue" />
        <FormulaBox latex="\boxed{x = 14{,}4\ \text{m}}" variant="gold" />
      </div>
    ),
    summary: <p>Newton 2 + kinematikk er to-trinns standardpakke. Alltid: regn ut <InlineLatex latex="a" /> først, så kinematikken.</p>,
  },

  // ==========================================================================
  // 5.17 — Koblede klosser
  // ==========================================================================
  "5.17": {
    title: "To klosser trukket av felles kraft",
    difficulty: "middels",
    pageRef: "s. 169",
    problem: (
      <div className="space-y-2">
        <p>
          To klosser <InlineLatex latex="m_A=4{,}00\ \text{kg}" /> og
          <InlineLatex latex="m_B=6{,}00\ \text{kg}" /> er forbundet med en lett snor.
          Kraften <InlineLatex latex="F=30{,}0\ \text{N}" /> virker horisontalt på
          <InlineLatex latex="m_B" />, som trekker hele systemet over et friksjonsfritt gulv.
          Finn (a) systemets akselerasjon, (b) snordraget.
        </p>
        <svg viewBox="0 0 320 100" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="0" y1="80" x2="320" y2="80" stroke="currentColor" strokeWidth="1" />
          <rect x="50" y="45" width="45" height="35" fill="#3b82f6" opacity="0.5" stroke="#3b82f6" />
          <text x="55" y="68" fontSize="10">A</text>
          <line x1="95" y1="62" x2="170" y2="62" stroke="currentColor" strokeWidth="1" />
          <rect x="170" y="40" width="55" height="40" fill="#ef4444" opacity="0.5" stroke="#ef4444" />
          <text x="185" y="65" fontSize="10">B</text>
          <line x1="225" y1="55" x2="290" y2="55" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow-amber-k5)" />
          <text x="260" y="45" fontSize="11" fill="#f59e0b">F</text>
          <text x="125" y="55" fontSize="10">T</text>
        </svg>
      </div>
    ),
    knowns: <p>Som gitt.</p>,
    unknowns: <p><InlineLatex latex="a" /> og <InlineLatex latex="T" />.</p>,
    strategy: (
      <div>
        <p>
          <strong>Først:</strong> Se på systemet <em>som helhet</em>. Nettokraften er
          <InlineLatex latex="F" />, total masse <InlineLatex latex="m_A+m_B" />.
          Dette gir akselerasjonen.
        </p>
        <p>
          <strong>Deretter:</strong> Isoler én kloss (f.eks. A) og skriv Newton 2 for den alene.
          Den eneste horisontale kraften på A er snordraget <InlineLatex latex="T" />.
        </p>
        <TheoryBox title="System vs. enkeltlegeme">
          <p>
            Indre krefter (som snordrag mellom A og B) kansellerer når du behandler hele
            systemet. For å finne indre krefter <em>må</em> du isolere én del av systemet.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Systemets Newton 2: <InlineLatex latex="F=(m_A+m_B)a" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>For A alene: <InlineLatex latex="T=m_A a" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Hele systemet">
          <FormulaBox latex="a = \dfrac{F}{m_A+m_B} = \dfrac{30{,}0}{10{,}0} = 3{,}00\ \text{m/s}^2" variant="blue" />
          <FormulaBox latex="\boxed{a = 3{,}00\ \text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={2} title="Isoler A">
          <FormulaBox latex="T = m_A a = (4{,}00)(3{,}00) = 12{,}0\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T = 12{,}0\ \text{N}}" variant="gold" />
        </Step>
        <p className="italic">
          Sjekk med B: <InlineLatex latex="F - T = m_B a \Rightarrow 30-12=18=(6)(3)\ \checkmark" />.
        </p>
      </div>
    ),
    summary: (
      <p>
        <strong>System-tilnærmingen</strong> er en genvei til akselerasjon, men for
        <em>interne</em> krefter må du isolere. Disse to teknikkene er grunnmuren i
        Newton-problemer.
      </p>
    ),
  },

  // ==========================================================================
  // 5.19 — Bil drar trailer
  // ==========================================================================
  "5.19": {
    title: "Bil drar henger — snordrag",
    difficulty: "middels",
    pageRef: "s. 169",
    problem: (
      <p>
        En 1800{"\u00A0"}kg bil drar en 1200{"\u00A0"}kg henger på et flatt vegstykke.
        Bilen akselererer fra 0 til 25,0{"\u00A0"}m/s på 10,0 sekunder. Friksjonen på hengeren
        fra veien er 200{"\u00A0"}N (rullemotstand). Finn dragkraften i kroken (trailer-bil).
      </p>
    ),
    knowns: (
      <ul className="list-disc list-inside">
        <li>Bil 1800 kg, henger 1200 kg</li>
        <li>Fra 0 til 25 m/s på 10 s ⇒ <InlineLatex latex="a=2{,}50\ \text{m/s}^2" /></li>
        <li>Friksjon på henger: 200 N (bak)</li>
      </ul>
    ),
    unknowns: <p>Dragkraft <InlineLatex latex="T" /> i kroken.</p>,
    strategy: (
      <p>
        Isoler hengeren og skriv Newton 2: <InlineLatex latex="T - f = m_h a" />.
      </p>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Du trenger bare hengerens masse, ikke bilens.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="a = \dfrac{\Delta v}{\Delta t} = \dfrac{25{,}0}{10{,}0} = 2{,}50\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="T - f = m_h a \Rightarrow T = m_h a + f" variant="blue" />
        <FormulaBox latex="T = (1200)(2{,}50) + 200 = 3000 + 200 = 3200\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{T = 3{,}20\times 10^{3}\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: <p>Isoler hengeren, legg til friksjon. Bilens masse er irrelevant for dette spørsmålet.</p>,
  },

  // ==========================================================================
  // 5.25 — Kinetisk friksjonskoeffisient
  // ==========================================================================
  "5.25": {
    title: "Bestemme μₖ fra bremsing",
    difficulty: "middels",
    pageRef: "s. 170",
    problem: (
      <p>
        En 14,0{"\u00A0"}kg kasse gis en initialfart på 5,00{"\u00A0"}m/s langs et horisontalt
        gulv. Den glir 8,50{"\u00A0"}m før den stopper. Finn kinetisk friksjonskoeffisient
        <InlineLatex latex="\mu_k" /> mellom kasse og gulv.
      </p>
    ),
    knowns: <p><InlineLatex latex="v_0=5{,}00,\ v=0,\ d=8{,}50\ \text{m},\ m=14{,}0" />.</p>,
    unknowns: <p><InlineLatex latex="\mu_k" /></p>,
    strategy: (
      <div>
        <p>
          Friksjon bremser kassen. Bruk kinematikk til å finne <InlineLatex latex="a" />, så Newton 2
          med <InlineLatex latex="f_k = \mu_k n = \mu_k mg" />.
        </p>
        <TheoryBox title="Kinetisk friksjon">
          <FormulaBox latex="f_k = \mu_k n" variant="blue" />
          <p>
            Motvirker relativ bevegelse. På horisontal flate uten andre vertikale krefter:
            <InlineLatex latex="n=mg" />, så <InlineLatex latex="f_k=\mu_k mg" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="v^2 = v_0^2 + 2ad" /> med <InlineLatex latex="v=0" />: <InlineLatex latex="a=-v_0^2/(2d)" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Merkelig men fint: <InlineLatex latex="\mu_k = v_0^2/(2gd)" /> — massen forsvinner!</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Finn akselerasjonen">
          <FormulaBox latex="a = -\dfrac{v_0^2}{2d} = -\dfrac{(5{,}00)^2}{2\cdot 8{,}50} = -1{,}471\ \text{m/s}^2" variant="blue" />
        </Step>
        <Step n={2} title="Newton 2">
          <FormulaBox latex="-f_k = ma \Rightarrow f_k = -ma = -(14{,}0)(-1{,}471) = 20{,}6\ \text{N}" variant="blue" />
        </Step>
        <Step n={3} title="Finn μₖ">
          <FormulaBox latex="\mu_k = \dfrac{f_k}{mg} = \dfrac{v_0^2}{2gd} = \dfrac{25{,}0}{2\cdot 9{,}80\cdot 8{,}50}" variant="blue" />
          <FormulaBox latex="\boxed{\mu_k \approx 0{,}150}" variant="gold" />
        </Step>
        <p className="italic">
          Massen falt ut — derfor kan politiet anslå fart fra bremsespor uten å veie bilen!
        </p>
      </div>
    ),
    summary: <p>For horisontal bremsing: <InlineLatex latex="\mu_k=v_0^2/(2gd)" />. Uavhengig av masse.</p>,
  },

  // ==========================================================================
  // 5.26 — Kasse dras med vinkel (friksjon)
  // ==========================================================================
  "5.26": {
    title: "Kasse dras med kraft i vinkel (friksjon)",
    difficulty: "middels",
    pageRef: "s. 170",
    problem: (
      <p>
        En 30,0{"\u00A0"}kg kasse dras med en snor i 30,0° over horisontalen,
        <InlineLatex latex="F=150\ \text{N}" />. Kinetisk friksjon <InlineLatex latex="\mu_k = 0{,}300" />.
        Finn kassens akselerasjon.
      </p>
    ),
    knowns: <p><InlineLatex latex="m=30,\ F=150\ \text{N},\ \theta=30^\circ,\ \mu_k=0{,}300" />.</p>,
    unknowns: <p><InlineLatex latex="a" /></p>,
    strategy: (
      <div>
        <p>
          Viktig: Den vinklede kraften reduserer normalkraften fordi den har en <em>oppadrettet</em>
          komponent som delvis løfter kassen.
        </p>
        <TheoryBox title="Normalkraft med vinklet drag">
          <FormulaBox latex="n = mg - F\sin\theta" variant="blue" />
          <p>
            Oppad-komponent <InlineLatex latex="F\sin\theta" /> bidrar til å løfte kassen, så vekta
            trykker mindre ned på gulvet. Mindre <InlineLatex latex="n" /> gir mindre friksjon.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>y-likevekt: <InlineLatex latex="n + F\sin\theta - mg = 0" /> ⇒ <InlineLatex latex="n = mg - F\sin\theta" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>x-Newton 2: <InlineLatex latex="F\cos\theta - \mu_k n = ma" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="n = mg - F\sin\theta = (30)(9{,}80) - (150)\sin 30^\circ = 294 - 75 = 219\ \text{N}" variant="blue" />
        <FormulaBox latex="f_k = \mu_k n = (0{,}300)(219) = 65{,}7\ \text{N}" variant="blue" />
        <FormulaBox latex="F_\text{netto},x = F\cos\theta - f_k = (150)(0{,}866) - 65{,}7 = 129{,}9 - 65{,}7 = 64{,}2\ \text{N}" variant="blue" />
        <FormulaBox latex="a = F_\text{netto}/m = 64{,}2/30 = 2{,}14\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 2{,}14\ \text{m/s}^2}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Vinklet drag: glem aldri at <em>normal</em>kraften endrer seg — den er ikke lenger
        <InlineLatex latex="mg" />. Dette påvirker både friksjon og eventuelle andre
        høydebetingelser.
      </p>
    ),
  },

  // ==========================================================================
  // 5.35 — Optimal vinkel for drag
  // ==========================================================================
  "5.35": {
    title: "Kasse på gulv: minst kraft for bevegelse",
    difficulty: "vanskelig",
    pageRef: "s. 170",
    problem: (
      <p>
        Hvilken vinkel <InlineLatex latex="\theta" /> over horisontalen minimerer den kraften
        som trengs for å dra en kasse med statisk friksjonskoeffisient <InlineLatex latex="\mu_s" />
        ved konstant fart? Bevis det og finn uttrykket.
      </p>
    ),
    knowns: <p><InlineLatex latex="\mu_s" /> generelt.</p>,
    unknowns: <p>Optimal vinkel og minimum kraft.</p>,
    strategy: (
      <div>
        <p>
          Skriv <InlineLatex latex="F" /> som funksjon av <InlineLatex latex="\theta" /> og
          deriver for å finne minimum. Klassisk anvendelse av kalkulus i fysikk.
        </p>
        <TheoryBox title="Optimering">
          <p>
            Newton: <InlineLatex latex="F\cos\theta = \mu_s(mg - F\sin\theta)" />.
            Løs for <InlineLatex latex="F(\theta)" />, deretter <InlineLatex latex="dF/d\theta=0" />.
            Resultatet: <InlineLatex latex="\tan\theta_\text{opt}=\mu_s" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Konstant fart ⇒ likevekt. <InlineLatex latex="F(\cos\theta + \mu_s\sin\theta) = \mu_s mg" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Maksimer <InlineLatex latex="\cos\theta + \mu_s\sin\theta" /> mhp. <InlineLatex latex="\theta" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Oppstill likevekt">
          <FormulaBox latex="F\cos\theta = \mu_s n,\quad n = mg - F\sin\theta" variant="blue" />
          <FormulaBox latex="F(\cos\theta + \mu_s\sin\theta) = \mu_s mg" variant="blue" />
          <FormulaBox latex="F(\theta) = \dfrac{\mu_s mg}{\cos\theta + \mu_s\sin\theta}" variant="blue" />
        </Step>
        <Step n={2} title="Optimer">
          <p>Minimum av <InlineLatex latex="F" /> ⇔ maksimum av nevneren <InlineLatex latex="N(\theta)=\cos\theta + \mu_s\sin\theta" />:</p>
          <FormulaBox latex="\dfrac{dN}{d\theta} = -\sin\theta + \mu_s\cos\theta = 0" variant="blue" />
          <FormulaBox latex="\Rightarrow \tan\theta_\text{opt} = \mu_s" variant="blue" />
          <FormulaBox latex="\boxed{\theta_\text{opt} = \arctan\mu_s}" variant="gold" />
        </Step>
        <Step n={3} title="Maks-nevner og minimum kraft">
          <p>
            Med <InlineLatex latex="\tan\theta=\mu_s" />: <InlineLatex latex="\sin\theta=\mu_s/\sqrt{1+\mu_s^2}" />, <InlineLatex latex="\cos\theta=1/\sqrt{1+\mu_s^2}" />.
          </p>
          <FormulaBox latex="N_\text{maks} = \dfrac{1+\mu_s^2}{\sqrt{1+\mu_s^2}} = \sqrt{1+\mu_s^2}" variant="blue" />
          <FormulaBox latex="\boxed{F_\text{min} = \dfrac{\mu_s mg}{\sqrt{1+\mu_s^2}}}" variant="gold" />
        </Step>
        <p className="italic">
          Eksempel: <InlineLatex latex="\mu_s=0{,}4" /> ⇒ <InlineLatex latex="\theta_\text{opt}\approx 21{,}8^\circ" />.
          Å trekke i vinkel lønner seg fordi det reduserer normalkraften (og dermed friksjonen) samtidig som du bruker kraft i bevegelsesretningen.
        </p>
      </div>
    ),
    summary: (
      <p>
        Elegant resultat: <strong><InlineLatex latex="\tan\theta_\text{opt}=\mu_s" /></strong>.
        En kalkulus-applikasjon som viser at fysikk og matematikk hånd i hånd gir innsikt du ikke får fra intuisjon alene.
      </p>
    ),
  },

  // ==========================================================================
  // 5.39 — Skiløper på skråplan
  // ==========================================================================
  "5.39": {
    title: "Skiløper på skråplan med friksjon",
    difficulty: "middels",
    pageRef: "s. 170",
    problem: (
      <p>
        En skiløper med totalmasse 65,0{"\u00A0"}kg akselererer ned en 15,0° hellende
        skiløype. Kinetisk friksjonskoeffisient mellom ski og snø er 0,0500. Finn akselerasjonen.
      </p>
    ),
    knowns: <p><InlineLatex latex="m=65{,}0,\ \theta=15^\circ,\ \mu_k=0{,}0500" />.</p>,
    unknowns: <p><InlineLatex latex="a" /></p>,
    strategy: (
      <div>
        <p>Standard skråplan med friksjon. Velg akser langs planet.</p>
        <TheoryBox title="Generell formel for skråplan med friksjon">
          <FormulaBox latex="a = g(\sin\theta - \mu_k\cos\theta)" variant="blue" />
          <p>
            Positiv ⇒ glir nedover. Null ⇒ konstant fart. Negativ ⇒ bremses/stopper.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Massen forsvinner igjen.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="a = g(\sin\theta - \mu_k\cos\theta) = 9{,}80(\sin 15^\circ - 0{,}0500\cos 15^\circ)" variant="blue" />
        <FormulaBox latex="a = 9{,}80(0{,}2588 - 0{,}0483) = 9{,}80\cdot 0{,}2105" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 2{,}06\ \text{m/s}^2\text{ ned skråplanet}}" variant="gold" />
      </div>
    ),
    summary: <p>Massen faller ut. Denne formelen dekker alle «skiløpere på skråplan»-oppgaver.</p>,
  },

  // ==========================================================================
  // 5.40 — Skyv kasse opp skråplan
  // ==========================================================================
  "5.40": {
    title: "Skyv kasse oppover skråplan med friksjon",
    difficulty: "middels",
    pageRef: "s. 171",
    problem: (
      <p>
        En 12,0{"\u00A0"}kg kasse dyttes oppover et 20° skråplan av en horisontal
        kraft <InlineLatex latex="F=150\ \text{N}" />. Kinetisk friksjon er 0,200.
        Finn akselerasjonen.
      </p>
    ),
    knowns: <p>Som gitt.</p>,
    unknowns: <p><InlineLatex latex="a" /> oppover skråplanet.</p>,
    strategy: (
      <div>
        <p>
          <strong>Viktig:</strong> En horisontal kraft på skråplan har komponenter både langs og
          vinkelrett på planet. Dette endrer <em>normalkraften</em>!
        </p>
        <TheoryBox title="Dekomponering av horisontalkraft">
          <p>
            Med x langs planet (opp positiv) og y vinkelrett ut:
          </p>
          <FormulaBox latex="F_x = F\cos\theta\ \text{(langs planet, opp)},\ F_y = -F\sin\theta\ \text{(inn i planet)}" variant="blue" />
          <p>
            Den horisontale kraften <em>presser</em> kassen inn mot planet ⇒ øker <InlineLatex latex="n" />
            ⇒ øker friksjon.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Vinkelrett: <InlineLatex latex="n = mg\cos\theta + F\sin\theta" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Langs: <InlineLatex latex="F\cos\theta - mg\sin\theta - \mu_k n = ma" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="n = mg\cos\theta + F\sin\theta" variant="blue" />
        <FormulaBox latex="n = (12{,}0)(9{,}80)\cos 20^\circ + (150)\sin 20^\circ" variant="blue" />
        <FormulaBox latex="n = 110{,}5 + 51{,}3 = 161{,}8\ \text{N}" variant="blue" />
        <FormulaBox latex="f_k = \mu_k n = (0{,}200)(161{,}8) = 32{,}4\ \text{N}" variant="blue" />
        <FormulaBox latex="F_\parallel = F\cos\theta - mg\sin\theta - f_k" variant="blue" />
        <FormulaBox latex="F_\parallel = (150)(0{,}940) - (12{,}0)(9{,}80)(0{,}342) - 32{,}4" variant="blue" />
        <FormulaBox latex="F_\parallel = 141 - 40{,}2 - 32{,}4 = 68{,}4\ \text{N}" variant="blue" />
        <FormulaBox latex="a = F_\parallel/m = 68{,}4/12{,}0 = 5{,}70\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 5{,}70\ \text{m/s}^2\text{ opp skråplanet}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Nøkkelinnsikt: Horisontal kraft på skråplan <em>øker</em> normalkraften. Dette er motsatt
        av en kraft <em>langs</em> planet som løfter noe vinkel opp. Alltid tegn frilegemediagram.
      </p>
    ),
  },

  // ==========================================================================
  // 5.41 — Hvileperiode (statisk friksjon)
  // ==========================================================================
  "5.41": {
    title: "Kritisk vinkel før glidning — statisk friksjon",
    difficulty: "middels",
    pageRef: "s. 171",
    problem: (
      <p>
        En kasse ligger på et skråplan med justerbar vinkel. Statisk friksjonskoeffisient
        er <InlineLatex latex="\mu_s=0{,}400" />. Finn den kritiske vinkelen der kassen
        akkurat begynner å gli.
      </p>
    ),
    knowns: <p><InlineLatex latex="\mu_s=0{,}400" />.</p>,
    unknowns: <p>Kritisk vinkel <InlineLatex latex="\theta_c" />.</p>,
    strategy: (
      <div>
        <p>
          På terskelen gjelder: parallellkraft = maks statisk friksjon.
        </p>
        <TheoryBox title="Kritisk vinkel">
          <FormulaBox latex="mg\sin\theta_c = \mu_s mg\cos\theta_c" variant="blue" />
          <FormulaBox latex="\tan\theta_c = \mu_s" variant="gold" />
          <p>
            Samme formel som den optimale drag-vinkelen! Tallet <InlineLatex latex="\mu_s" />{" "}
            beskriver dermed en fysisk vinkel: «hvor bratt kan bakken være før ting sklir?»
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Massen faller ut.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="\theta_c = \arctan\mu_s = \arctan 0{,}400" variant="blue" />
        <FormulaBox latex="\boxed{\theta_c \approx 21{,}8^\circ}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Den kritiske vinkelen er <InlineLatex latex="\arctan\mu_s" />. Dette er også en smart
        <em>måle</em>metode for <InlineLatex latex="\mu_s" />: Tilt et brett med objektet på
        til det glir; mål vinkelen.
      </p>
    ),
  },

  // ==========================================================================
  // 5.45 — Ball i horisontal sirkel (konisk pendel-lignende)
  // ==========================================================================
  "5.45": {
    title: "Ball i horisontal sirkel — snordrag",
    difficulty: "middels",
    pageRef: "s. 171",
    problem: (
      <div className="space-y-2">
        <p>
          En 0,200{"\u00A0"}kg ball beveger seg i en horisontal sirkel med radius 0,500{"\u00A0"}m
          med konstant fart 4,00{"\u00A0"}m/s. Finn sentripetalkraften (og dermed
          snordraget).
        </p>
        <svg viewBox="0 0 300 160" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <circle cx="150" cy="80" r="60" fill="none" stroke="currentColor" strokeDasharray="3" />
          <circle cx="210" cy="80" r="6" fill="#10b981" />
          <line x1="210" y1="80" x2="153" y2="80" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-k5)" />
          <text x="165" y="70" fontSize="11" fill="#ef4444">F = T</text>
          <line x1="210" y1="80" x2="210" y2="20" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-k5)" />
          <text x="215" y="50" fontSize="11" fill="#3b82f6">v</text>
        </svg>
      </div>
    ),
    knowns: <p><InlineLatex latex="m=0{,}200,\ R=0{,}500,\ v=4{,}00" />.</p>,
    unknowns: <p>Sentripetalkraft <InlineLatex latex="F_c=T" />.</p>,
    strategy: (
      <div>
        <p>
          I sirkelbevegelse med konstant fart er nettokraften rettet inn mot senteret
          med størrelse <InlineLatex latex="F_c = mv^2/R" />. I dette tilfellet er det
          snoren som leverer kraften.
        </p>
        <TheoryBox title="Sentripetalakselerasjon">
          <FormulaBox latex="a_c = \dfrac{v^2}{R} = \omega^2 R" variant="blue" />
          <p>
            Sentripetal er <em>retning</em> (inn mot senteret), ikke en ny kraft. Den reelle
            kraften er her snordraget — Newtons 2. lov gir sammenhengen.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="T = mv^2/R" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="T = \dfrac{mv^2}{R} = \dfrac{(0{,}200)(4{,}00)^2}{0{,}500} = \dfrac{3{,}20}{0{,}500}" variant="blue" />
        <FormulaBox latex="\boxed{T = 6{,}40\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Sentripetalkraft er den <em>netto</em> indre-pekende kraften som holder noe i
        sirkelbane. Størrelsen er alltid <InlineLatex latex="mv^2/R" />. Hvilken <em>reell</em>
        kraft som gir den — snor, gravitasjon, friksjon, normalkraft — varierer.
      </p>
    ),
  },

  // ==========================================================================
  // 5.48 — Bil i flat sving
  // ==========================================================================
  "5.48": {
    title: "Bil i flat kurve — maksimumsfart",
    difficulty: "middels",
    pageRef: "s. 171",
    problem: (
      <p>
        En bil tar en flat (ikke-dosert) sving med radius 45,0{"\u00A0"}m. Statisk
        friksjonskoeffisient mellom dekk og vei er 0,650. Finn maksimumsfarten uten å gli ut.
      </p>
    ),
    knowns: <p><InlineLatex latex="R=45,\ \mu_s=0{,}650" />.</p>,
    unknowns: <p><InlineLatex latex="v_\text{maks}" /></p>,
    strategy: (
      <div>
        <p>
          Eneste horisontale kraft er statisk friksjon, som må levere sentripetalkraften.
          I ytterste grense: <InlineLatex latex="\mu_s mg = mv^2/R" />.
        </p>
        <TheoryBox title="Friksjon som sentripetalkraft">
          <FormulaBox latex="v_\text{maks} = \sqrt{\mu_s g R}" variant="blue" />
          <p>
            Massen forsvinner. Derfor trenger en truck og en liten bil samme minimum friksjon
            for samme kurve — men tung bil har mer treghet og slites mer.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="v^2 = \mu_s g R" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="v_\text{maks} = \sqrt{(0{,}650)(9{,}80)(45{,}0)} = \sqrt{286{,}65}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{maks} \approx 16{,}9\ \text{m/s} \approx 61\ \text{km/t}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Maksfart i flat kurve: <InlineLatex latex="\sqrt{\mu_s gR}" />. Dobbel radius ⇒
        <InlineLatex latex="\sqrt 2\approx 1{,}41" /> ganger mer fart. Halvert friksjon (våt vei)
        ⇒ <InlineLatex latex="1/\sqrt 2" /> av farten.
      </p>
    ),
  },

  // ==========================================================================
  // 5.50 — Dosert (banket) kurve
  // ==========================================================================
  "5.50": {
    title: "Dosert kurve uten friksjon",
    difficulty: "middels",
    pageRef: "s. 172",
    problem: (
      <p>
        Hvilken doseringsvinkel <InlineLatex latex="\theta" /> må en kurve ha for at en bil
        i 25,0{"\u00A0"}m/s skal kunne kjøre en kurve med radius 120{"\u00A0"}m helt
        <em>uten</em> friksjon?
      </p>
    ),
    knowns: <p><InlineLatex latex="v=25{,}0,\ R=120" />.</p>,
    unknowns: <p><InlineLatex latex="\theta" /></p>,
    strategy: (
      <div>
        <p>
          På en dosert kurve med friksjon null gir den horisontale komponenten av
          normalkraften sentripetalkraften.
        </p>
        <TheoryBox title="Dosert kurve, friksjonsfri">
          <FormulaBox latex="n\sin\theta = \dfrac{mv^2}{R},\quad n\cos\theta = mg" variant="blue" />
          <FormulaBox latex="\tan\theta = \dfrac{v^2}{gR}" variant="gold" />
          <p>
            Resultatet er uavhengig av masse. Designes perfekt for én hastighet.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Divider horisontallig med vertikallig.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="\tan\theta = \dfrac{v^2}{gR} = \dfrac{(25{,}0)^2}{(9{,}80)(120)} = \dfrac{625}{1176} = 0{,}5314" variant="blue" />
        <FormulaBox latex="\theta = \arctan 0{,}5314" variant="blue" />
        <FormulaBox latex="\boxed{\theta \approx 28{,}0^\circ}" variant="gold" />
      </div>
    ),
    summary: <p>Designformel for doserte kurver: <InlineLatex latex="\tan\theta=v^2/(gR)" />. Uavhengig av masse.</p>,
  },

  // ==========================================================================
  // 5.53 — Konisk pendel
  // ==========================================================================
  "5.53": {
    title: "Konisk pendel",
    difficulty: "vanskelig",
    pageRef: "s. 172",
    problem: (
      <div className="space-y-2">
        <p>
          En 0,500{"\u00A0"}kg ball svinger i en konisk pendel: snoren er 1,20{"\u00A0"}m lang
          og gjør en vinkel på 30,0° med vertikalen. Finn (a) snordraget og (b) ballens fart.
        </p>
        <svg viewBox="0 0 240 200" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          <line x1="120" y1="15" x2="120" y2="180" stroke="currentColor" strokeDasharray="3" />
          <line x1="120" y1="15" x2="180" y2="120" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="180" cy="120" r="8" fill="#10b981" />
          <ellipse cx="120" cy="120" rx="60" ry="15" fill="none" stroke="currentColor" strokeDasharray="2" />
          <text x="130" y="75" fontSize="11" fill="#3b82f6">T</text>
          <text x="125" y="50" fontSize="11" fill="currentColor">θ</text>
          <line x1="180" y1="120" x2="180" y2="175" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber-k5)" />
          <text x="185" y="160" fontSize="11" fill="#f59e0b">W</text>
        </svg>
      </div>
    ),
    knowns: <p><InlineLatex latex="m=0{,}500,\ L=1{,}20,\ \theta=30^\circ" />.</p>,
    unknowns: <p><InlineLatex latex="T" /> og <InlineLatex latex="v" /></p>,
    strategy: (
      <div>
        <p>
          Ballen går i horisontal sirkel med radius <InlineLatex latex="R=L\sin\theta" />.
          Vertikal likevekt + horisontal Newton 2.
        </p>
        <TheoryBox title="Konisk pendel">
          <FormulaBox latex="T\cos\theta = mg \quad(y)" variant="blue" />
          <FormulaBox latex="T\sin\theta = \dfrac{mv^2}{R}\quad(x)" variant="blue" />
          <p>Divider: <InlineLatex latex="\tan\theta=v^2/(gR)" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Radius er <InlineLatex latex="R=L\sin\theta" />, ikke <InlineLatex latex="L" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Vertikalligningen gir <InlineLatex latex="T" /> direkte.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="T = \dfrac{mg}{\cos\theta} = \dfrac{(0{,}500)(9{,}80)}{\cos 30^\circ} = \dfrac{4{,}90}{0{,}866}" variant="blue" />
        <FormulaBox latex="\boxed{T \approx 5{,}66\ \text{N}}" variant="gold" />
        <FormulaBox latex="R = L\sin\theta = 1{,}20\sin 30^\circ = 0{,}600\ \text{m}" variant="blue" />
        <FormulaBox latex="v = \sqrt{gR\tan\theta} = \sqrt{(9{,}80)(0{,}600)\tan 30^\circ}" variant="blue" />
        <FormulaBox latex="v = \sqrt{(9{,}80)(0{,}600)(0{,}5774)} = \sqrt{3{,}395}" variant="blue" />
        <FormulaBox latex="\boxed{v \approx 1{,}84\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: <p>Konisk pendel: samme matematikk som dosert kurve (<InlineLatex latex="\tan\theta=v^2/(gR)" />). Merk radius = <InlineLatex latex="L\sin\theta" />.</p>,
  },

  // ==========================================================================
  // 5.56 — Vertikal sirkelbane (pail of water)
  // ==========================================================================
  "5.56": {
    title: "Vertikal sirkel — minimumshastighet på toppen",
    difficulty: "vanskelig",
    pageRef: "s. 172",
    problem: (
      <p>
        En bøtte med vann svinges i en vertikal sirkel med radius 0,900{"\u00A0"}m.
        Hva er minstehastigheten på toppen for at vannet ikke skal renne ut (dvs.
        at bøttens normalkraft på vannet blir null)?
      </p>
    ),
    knowns: <p><InlineLatex latex="R=0{,}900" /></p>,
    unknowns: <p>Minstehastighet <InlineLatex latex="v_\text{min}" /> på toppen.</p>,
    strategy: (
      <div>
        <p>
          På toppen peker både tyngdekraft og eventuell normalkraft ned, altså <em>inn</em> mot
          senteret. Minstekrav: kun tyngdekraft gir sentripetalkraften.
        </p>
        <TheoryBox title="Grensen: apparent weightlessness på toppen">
          <FormulaBox latex="mg = \dfrac{mv^2_\text{min}}{R} \Rightarrow v_\text{min} = \sqrt{gR}" variant="gold" />
          <p>
            Hvis farten er <em>mindre</em> enn <InlineLatex latex="\sqrt{gR}" />, kan ikke
            tyngdekraften alene bøye banen skarpt nok — vannet «faller ut» (relativt bøtten).
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Minimum: <InlineLatex latex="n=0" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="v_\text{min} = \sqrt{gR} = \sqrt{(9{,}80)(0{,}900)} = \sqrt{8{,}82}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{min} \approx 2{,}97\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Samme formel dukker opp i «loop-the-loop», berg-og-dal-baner osv. Minstehastighet på
        toppen av en vertikal loop er <InlineLatex latex="\sqrt{gR}" />.
      </p>
    ),
  },

  // ==========================================================================
  // 5.59 — Problem: To masser på skrått plan
  // ==========================================================================
  "5.59": {
    title: "Koblede masser — en på skråplan, en hengende",
    difficulty: "vanskelig",
    pageRef: "s. 174",
    problem: (
      <div className="space-y-2">
        <p>
          En 4,00{"\u00A0"}kg kloss ligger på et 35,0° friksjonsfritt skråplan. En snor fra
          klossen går over en friksjonsfri trinse på toppen av planet og ned til en 2,00{"\u00A0"}kg
          kloss som henger vertikalt. Finn akselerasjonen og snordraget.
        </p>
        <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <polygon points="20,170 290,170 290,45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="260" y="160" fontSize="11" fill="currentColor">35°</text>
          <circle cx="290" cy="45" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <g transform="translate(180,110) rotate(-35)">
            <rect x="-20" y="-15" width="40" height="30" fill="#3b82f6" opacity="0.5" stroke="#3b82f6" />
            <text x="-7" y="5" fontSize="10" fill="currentColor">4 kg</text>
          </g>
          <line x1="200" y1="95" x2="290" y2="45" stroke="currentColor" strokeWidth="1" />
          <line x1="300" y1="45" x2="300" y2="130" stroke="currentColor" strokeWidth="1" />
          <rect x="285" y="130" width="30" height="30" fill="#ef4444" opacity="0.5" stroke="#ef4444" />
          <text x="289" y="150" fontSize="10" fill="currentColor">2 kg</text>
        </svg>
      </div>
    ),
    knowns: <p><InlineLatex latex="m_1=4{,}00\ \text{(skråplan)},\ m_2=2{,}00\ \text{(hengende)},\ \theta=35^\circ" />, friksjonsfritt.</p>,
    unknowns: <p><InlineLatex latex="a,\ T" /></p>,
    strategy: (
      <div>
        <p>
          <strong>Velg retninger først:</strong> Anta at 4 kg-klossen akselererer <em>ned</em>
          skråplanet (og 2 kg opp). Hvis resultatet er negativt, var antakelsen feil og retningen er motsatt.
        </p>
        <TheoryBox title="Fremgangsmåte (to-legeme, én retning)">
          <p>
            Skriv Newton 2 for begge langs deres bevegelsesretning. Samme fart ⇒ samme <InlineLatex latex="|a|" />.
            Adder for å eliminere <InlineLatex latex="T" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p><InlineLatex latex="m_1" />: <InlineLatex latex="m_1 g\sin\theta - T = m_1 a" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p><InlineLatex latex="m_2" />: <InlineLatex latex="T - m_2 g = m_2 a" />.</p>,
      },
      {
        label: "Hint 3",
        content: <p>Adder: <InlineLatex latex="a = g(m_1\sin\theta - m_2)/(m_1+m_2)" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="a = \dfrac{g(m_1\sin\theta - m_2)}{m_1+m_2} = \dfrac{(9{,}80)(4{,}00\sin 35^\circ - 2{,}00)}{6{,}00}" variant="blue" />
        <FormulaBox latex="a = \dfrac{(9{,}80)(4{,}00\cdot 0{,}5736 - 2{,}00)}{6{,}00} = \dfrac{(9{,}80)(0{,}294)}{6{,}00}" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 0{,}481\ \text{m/s}^2\ (4\text{ kg ned skråplan})}" variant="gold" />
        <FormulaBox latex="T = m_2(g+a) = (2{,}00)(9{,}80+0{,}481) = 20{,}6\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{T \approx 20{,}6\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: (
      <p>
        Merk likheten med Atwood: <InlineLatex latex="a=g(m_1\sin\theta - m_2)/(m_1+m_2)" />.
        Hvis <InlineLatex latex="m_1\sin\theta < m_2" />, vil den hengende vinne og trekke skråplan-klossen opp.
      </p>
    ),
  },

  // ==========================================================================
  // 5.60 — Problem: Stablede klosser med friksjon
  // ==========================================================================
  "5.60": {
    title: "Stablede klosser — friksjon mellom",
    difficulty: "vanskelig",
    pageRef: "s. 174",
    problem: (
      <p>
        En 2,00{"\u00A0"}kg kloss B hviler oppå en 4,00{"\u00A0"}kg kloss A, som hviler på et
        friksjonsfritt gulv. Mellom A og B er statisk friksjonskoeffisient 0,500.
        En horisontal kraft virker på A. Finn maksimum <InlineLatex latex="F" /> slik at B
        fortsatt beveger seg sammen med A (uten å gli).
      </p>
    ),
    knowns: <p><InlineLatex latex="m_A=4,\ m_B=2,\ \mu_s=0{,}500" />, gulv friksjonsfritt.</p>,
    unknowns: <p><InlineLatex latex="F_\text{maks}" /></p>,
    strategy: (
      <div>
        <p>
          B akselererer kun pga. statisk friksjon fra A. Maks akselerasjon for B er
          <InlineLatex latex="\mu_s g" />.
        </p>
        <TheoryBox title="Friksjon som akselererer">
          <p>
            Her er friksjonen <em>ikke</em> en bremse — den er den <strong>drivende</strong>
            kraften for B. Uten friksjon ville A skli under B.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Maks <InlineLatex latex="a_B = \mu_s g" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Da må hele systemet akselerere med denne samme verdien, så <InlineLatex latex="F=(m_A+m_B)\mu_s g" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="a_\text{maks} = \mu_s g = (0{,}500)(9{,}80) = 4{,}90\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="F_\text{maks} = (m_A+m_B)a_\text{maks} = (6{,}00)(4{,}90)" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{maks} = 29{,}4\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: <p>Statisk friksjon kan drive bevegelse. Maks akselerasjon er satt av <InlineLatex latex="\mu_s g" />.</p>,
  },

  // ==========================================================================
  // 5.62 — Problem: Kloss i kasse som akselererer
  // ==========================================================================
  "5.62": {
    title: "Kasse akselererer — når glir innholdet?",
    difficulty: "vanskelig",
    pageRef: "s. 175",
    problem: (
      <p>
        En 5,00{"\u00A0"}kg kloss står inni en tilhenger. Statisk friksjonskoeffisient mot
        tilhengergulvet er 0,400. Hva er maksimal akselerasjon tilhengeren kan ha før klossen glir?
      </p>
    ),
    knowns: <p><InlineLatex latex="m=5,\ \mu_s=0{,}400" />.</p>,
    unknowns: <p><InlineLatex latex="a_\text{maks}" />.</p>,
    strategy: <p>Samme logikk som 5.60: friksjon driver klossen, maks akselerasjon = <InlineLatex latex="\mu_s g" />.</p>,
    hints: [
      {
        label: "Hint",
        content: <p>Massen spiller ingen rolle.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="a_\text{maks} = \mu_s g = (0{,}400)(9{,}80) = 3{,}92\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a_\text{maks} = 3{,}92\ \text{m/s}^2}" variant="gold" />
      </div>
    ),
    summary: <p>Generelt: En gjenstand i et akselererende kjøretøy glir når <InlineLatex latex="a > \mu_s g" />.</p>,
  },

  // ==========================================================================
  // 5.77 — Problem: kompleks friksjon
  // ==========================================================================
  "5.77": {
    title: "To klosser med friksjon mellom og mot gulv",
    difficulty: "vanskelig",
    pageRef: "s. 176",
    problem: (
      <p>
        En 8,00{"\u00A0"}kg kloss A ligger på gulv. En 3,00{"\u00A0"}kg kloss B ligger oppå A.
        Alle friksjonskoeffisienter er 0,250. En horisontal kraft <InlineLatex latex="F" /> drar
        A. Finn minimum <InlineLatex latex="F" /> for å få A i bevegelse, og akselerasjonen
        når <InlineLatex latex="F=40\ \text{N}" />.
      </p>
    ),
    knowns: <p>Som gitt, alle <InlineLatex latex="\mu=0{,}250" />.</p>,
    unknowns: <p>Minimum <InlineLatex latex="F" /> og <InlineLatex latex="a" /> når <InlineLatex latex="F=40" />.</p>,
    strategy: (
      <div>
        <p>
          Det er to friksjonsflater. Under A: normalkraft er <InlineLatex latex="(m_A+m_B)g" />.
          Mellom A og B: normalkraft er <InlineLatex latex="m_B g" />. Merk: B beveger seg sammen med A (antatt).
        </p>
        <TheoryBox title="To friksjonsflater">
          <p>
            For å få systemet i bevegelse må <InlineLatex latex="F" /> overvinne friksjonen <em>under</em> A.
            Friksjon mellom A og B står i motsatt retning av A sin bevegelse <em>på B</em>, og drar B med.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Minimum <InlineLatex latex="F" /> = total friksjon fra gulvet = <InlineLatex latex="\mu(m_A+m_B)g" />.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Når det beveger seg, er netto kraft: <InlineLatex latex="F - \mu(m_A+m_B)g = (m_A+m_B)a" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="F_\text{min} = \mu (m_A+m_B)g = (0{,}250)(11)(9{,}80) = 26{,}95\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{F_\text{min} \approx 27{,}0\ \text{N}}" variant="gold" />
        <FormulaBox latex="a = \dfrac{F-\mu(m_A+m_B)g}{m_A+m_B} = \dfrac{40-26{,}95}{11} = 1{,}186\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 1{,}19\ \text{m/s}^2}" variant="gold" />
        <p className="italic">
          Sjekk: Er friksjonen mellom A og B nok til å dra B med? Trenger <InlineLatex latex="a_B = 1{,}19" />, krever <InlineLatex latex="\mu_s g = 2{,}45\ \text{m/s}^2 \geq 1{,}19" /> ✓. OK, de beveger seg sammen.
        </p>
      </div>
    ),
    summary: <p>Multi-friksjonsproblemer: identifiser alle flater, normalkrefter, og skriv Newton for hver blokk.</p>,
  },

  // ==========================================================================
  // 5.79 — Problem: Banked turn med friksjon
  // ==========================================================================
  "5.79": {
    title: "Dosert kurve med friksjon — min/maks fart",
    difficulty: "vanskelig",
    pageRef: "s. 176",
    problem: (
      <p>
        En bilkurve har radius 50,0{"\u00A0"}m og dosering 10,0°. Statisk friksjonskoeffisient
        er 0,300. Finn maksimalfart uten å gli ut (oppover).
      </p>
    ),
    knowns: <p><InlineLatex latex="R=50,\ \theta=10^\circ,\ \mu_s=0{,}300" />.</p>,
    unknowns: <p><InlineLatex latex="v_\text{maks}" />.</p>,
    strategy: (
      <div>
        <p>
          Ved maks fart peker friksjonen <em>inn og ned</em> langs bakken (motvirker tendensen
          til å gli ut). Vektorligninger i vertikal og horisontal retning.
        </p>
        <TheoryBox title="Formel for dosert kurve med friksjon">
          <FormulaBox latex="v_\text{maks} = \sqrt{gR\cdot\dfrac{\sin\theta + \mu_s\cos\theta}{\cos\theta - \mu_s\sin\theta}}" variant="blue" />
          <p>
            Blir <InlineLatex latex="\mu_s=0" />: reduseres til <InlineLatex latex="\sqrt{gR\tan\theta}" />.
            Blir <InlineLatex latex="\theta=0" />: <InlineLatex latex="\sqrt{\mu_s gR}" />. Grenser fungerer.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Bruk formelen direkte, eller sett opp <InlineLatex latex="n(\sin\theta+\mu\cos\theta)=mv^2/R" /> og <InlineLatex latex="n(\cos\theta-\mu\sin\theta)=mg" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="v^2 = gR\cdot\dfrac{\sin\theta+\mu\cos\theta}{\cos\theta-\mu\sin\theta}" variant="blue" />
        <FormulaBox latex="= (9{,}80)(50)\cdot\dfrac{0{,}1736 + (0{,}300)(0{,}9848)}{0{,}9848 - (0{,}300)(0{,}1736)}" variant="blue" />
        <FormulaBox latex="= 490\cdot\dfrac{0{,}4690}{0{,}9327} = 490\cdot 0{,}5028 = 246{,}4" variant="blue" />
        <FormulaBox latex="v_\text{maks} = \sqrt{246{,}4} \approx 15{,}7\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{maks} \approx 15{,}7\ \text{m/s} \approx 56{,}5\ \text{km/t}}" variant="gold" />
      </div>
    ),
    summary: <p>Dosering + friksjon jobber sammen og gir en mye større maksfart enn hver for seg.</p>,
  },

  // ==========================================================================
  // 5.90 — Problem: Kloss på roterende plate
  // ==========================================================================
  "5.90": {
    title: "Kloss på roterende karusell",
    difficulty: "vanskelig",
    pageRef: "s. 177",
    problem: (
      <p>
        En liten mynt ligger 12,0{"\u00A0"}cm fra rotasjonsaksen til en plate som snurrer
        med konstant periode <InlineLatex latex="T=0{,}60\ \text{s}" />. Hvilken minimum
        statisk friksjonskoeffisient trengs for at mynten ikke skal sklir ut?
      </p>
    ),
    knowns: <p><InlineLatex latex="r=0{,}120,\ T=0{,}600\ \text{s}" />.</p>,
    unknowns: <p><InlineLatex latex="\mu_s" /></p>,
    strategy: (
      <div>
        <p>
          Statisk friksjon må levere sentripetalkraften. Finn først vinkelfrekvens og fart.
        </p>
        <TheoryBox title="Sirkelfrekvens og sentripetal">
          <FormulaBox latex="\omega = 2\pi/T,\quad v = \omega r,\quad a_c = \omega^2 r" variant="blue" />
          <FormulaBox latex="\mu_s\geq a_c/g = \omega^2 r/g" variant="blue" />
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>For konstant sirkelbevegelse: <InlineLatex latex="\mu_s g \geq \omega^2 r" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="\omega = 2\pi/0{,}600 = 10{,}47\ \text{rad/s}" variant="blue" />
        <FormulaBox latex="a_c = \omega^2 r = (10{,}47)^2(0{,}120) = 13{,}16\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\mu_s = a_c/g = 13{,}16/9{,}80 = 1{,}34" variant="blue" />
        <FormulaBox latex="\boxed{\mu_s \geq 1{,}34}" variant="gold" />
        <p className="italic">
          Såpass høyt! I praksis ville mynten sklidd — typiske friksjonskoeffisienter er
          under 1. Karusellen må senkes eller mynten flyttes innover.
        </p>
      </div>
    ),
    summary: <p>Sentripetal på roterende plate: <InlineLatex latex="\mu_s\geq\omega^2 r/g" />. Mindre radius / lavere frekvens lettere.</p>,
  },

  // ==========================================================================
  // 5.101 — Problem: Masse i akselererende heis — snorproblem
  // ==========================================================================
  "5.101": {
    title: "Atwood i akselererende heis",
    difficulty: "vanskelig",
    pageRef: "s. 178",
    problem: (
      <p>
        En liten Atwood (masser 2,00 og 3,00 kg) er festet i taket på en heis som akselererer
        oppover med 2,00{"\u00A0"}m/s². Finn akselerasjonen til massene <em>relativt heisen</em>
        og snordraget.
      </p>
    ),
    knowns: <p><InlineLatex latex="m_1=2,\ m_2=3,\ a_\text{heis}=2{,}00" /> oppover.</p>,
    unknowns: <p><InlineLatex latex="a_\text{rel}" /> og <InlineLatex latex="T" />.</p>,
    strategy: (
      <div>
        <p>
          I heisens referansesystem virker en <em>effektiv</em> tyngdekraft <InlineLatex latex="g'=g+a_\text{heis}" />.
          Bruk Atwood-formelen med denne.
        </p>
        <TheoryBox title="Ekvivalensprinsippet">
          <p>
            En akselererende heis er ekvivalent med forsterket tyngdekraft. Dette forenkler
            mange problemer til kjente mønstre — bare bytt <InlineLatex latex="g\to g'" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Bruk <InlineLatex latex="g'=9{,}80+2{,}00=11{,}80\ \text{m/s}^2" /> i Atwood-formelen.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="g' = g + a_\text{heis} = 11{,}80\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="a_\text{rel} = \dfrac{(m_2-m_1)g'}{m_1+m_2} = \dfrac{(1)(11{,}80)}{5} = 2{,}36\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a_\text{rel} \approx 2{,}36\ \text{m/s}^2}" variant="gold" />
        <FormulaBox latex="T = \dfrac{2m_1m_2 g'}{m_1+m_2} = \dfrac{2\cdot 2\cdot 3\cdot 11{,}80}{5}" variant="blue" />
        <FormulaBox latex="\boxed{T \approx 28{,}3\ \text{N}}" variant="gold" />
      </div>
    ),
    summary: <p>Akselererende referansesystem: bare bruk <InlineLatex latex="g' = g + a_\text{heis}" /> og de vanlige formlene fungerer.</p>,
  },

  // ==========================================================================
  // 5.102 — Problem: terminal velocity
  // ==========================================================================
  "5.102": {
    title: "Fri fall med luftmotstand — terminal fart",
    difficulty: "vanskelig",
    pageRef: "s. 178",
    problem: (
      <p>
        En regndråpe med masse 3,00 × 10⁻⁵ kg faller gjennom luft med luftmotstand
        <InlineLatex latex="F_\text{drag} = bv^2" />, der <InlineLatex latex="b = 3{,}00\times 10^{-8}\ \text{N\cdot s}^2/\text{m}^2" />.
        Finn terminalhastigheten.
      </p>
    ),
    knowns: <p>Som gitt.</p>,
    unknowns: <p>Terminalfart <InlineLatex latex="v_t" />.</p>,
    strategy: (
      <div>
        <p>
          Terminal: akselerasjon = 0 ⇒ netto kraft = 0 ⇒ luftmotstand = tyngdekraft.
        </p>
        <TheoryBox title="Terminal velocity">
          <FormulaBox latex="bv_t^2 = mg \Rightarrow v_t = \sqrt{mg/b}" variant="blue" />
          <p>
            Objektet akselererer til dette punktet og faller deretter med konstant fart.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Sett luftmotstand lik tyngdekraft.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="v_t = \sqrt{\dfrac{mg}{b}} = \sqrt{\dfrac{(3{,}00\times 10^{-5})(9{,}80)}{3{,}00\times 10^{-8}}}" variant="blue" />
        <FormulaBox latex="v_t = \sqrt{9{,}80\times 10^{3}} \approx 99\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_t \approx 99\ \text{m/s}}" variant="gold" />
        <p className="italic">
          Noe urealistisk høyt (ekte regndråper terminerer ved ~9 m/s). Modellen med <InlineLatex latex="v^2" />
          er grov for små dråper.
        </p>
      </div>
    ),
    summary: <p>Terminal: <InlineLatex latex="v_t=\sqrt{mg/b}" />. Tyngre = raskere terminal. Mer drag = saktere.</p>,
  },

  // ==========================================================================
  // 5.106 — Problem: Banket loop
  // ==========================================================================
  "5.106": {
    title: "Vertikal loop med normalkraft",
    difficulty: "vanskelig",
    pageRef: "s. 179",
    problem: (
      <p>
        Et 60,0{"\u00A0"}kg barn kjører en vertikal loop med radius 12,0{"\u00A0"}m på en
        bane. På toppen av loopen er farten 9,00{"\u00A0"}m/s. Finn (a) normalkraft fra bane
        på barn på toppen, og (b) minimum fart slik at normalkraften ikke blir negativ.
      </p>
    ),
    knowns: <p><InlineLatex latex="m=60,\ R=12,\ v_\text{topp}=9{,}00" />.</p>,
    unknowns: <p><InlineLatex latex="n" /> på topp; minimum fart.</p>,
    strategy: (
      <div>
        <p>
          På toppen peker både tyngdekraft og normalkraft nedover (inn mot senter).
        </p>
        <TheoryBox title="Topp av loop">
          <FormulaBox latex="n + mg = mv^2/R \Rightarrow n = m(v^2/R - g)" variant="blue" />
          <p>
            Minimum fart: når <InlineLatex latex="n=0" />, dvs. <InlineLatex latex="v_\text{min}=\sqrt{gR}" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p><InlineLatex latex="n = m(v^2/R - g)" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="n = (60{,}0)\left(\dfrac{9{,}00^2}{12{,}0} - 9{,}80\right) = 60(6{,}75 - 9{,}80)" variant="blue" />
        <FormulaBox latex="n = 60(-3{,}05) = -183\ \text{N}" variant="blue" />
        <p>
          Negativ — betyr at ved <InlineLatex latex="v=9{,}00" /> er farten <em>for lav</em>:
          tyngdekraften alene er mer enn nødvendig sentripetal. I praksis ville barnet
          løsrevet seg fra banen allerede.
        </p>
        <FormulaBox latex="v_\text{min} = \sqrt{gR} = \sqrt{(9{,}80)(12)} \approx 10{,}8\ \text{m/s}" variant="blue" />
        <FormulaBox latex="\boxed{v_\text{min} \approx 10{,}8\ \text{m/s}}" variant="gold" />
      </div>
    ),
    summary: <p>Når <InlineLatex latex="v<\sqrt{gR}" /> på toppen av en loop, forlater du banen. Må ha en viss minstefart for å forbli i kontakt.</p>,
  },

  // ==========================================================================
  // 5.108 — Challenge: Variable luftmotstand
  // ==========================================================================
  "5.108": {
    title: "Fallskjermhopper — fra fritt fall til terminal",
    difficulty: "vanskelig",
    pageRef: "s. 179",
    problem: (
      <p>
        En fallskjermhopper med masse 75{"\u00A0"}kg faller fritt (luftmotstand <InlineLatex latex="F_\text{drag}=kv^2" /> med <InlineLatex latex="k=0{,}250\ \text{kg/m}" />).
        Finn terminalhastigheten og hvilken akselerasjon han har idet han når 30,0{"\u00A0"}m/s.
      </p>
    ),
    knowns: <p><InlineLatex latex="m=75,\ k=0{,}250" />.</p>,
    unknowns: <p><InlineLatex latex="v_t" /> og <InlineLatex latex="a(v=30)" />.</p>,
    strategy: (
      <div>
        <TheoryBox title="Bevegelsesligningen">
          <FormulaBox latex="ma = mg - kv^2" variant="blue" />
          <p>
            Ved <InlineLatex latex="a=0" />: <InlineLatex latex="v_t=\sqrt{mg/k}" />. Ellers: <InlineLatex latex="a=g-kv^2/m" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Direkte innsetting av farten gir akselerasjonen ved det øyeblikket.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <FormulaBox latex="v_t = \sqrt{mg/k} = \sqrt{(75)(9{,}80)/0{,}250} = \sqrt{2940}" variant="blue" />
        <FormulaBox latex="\boxed{v_t \approx 54{,}2\ \text{m/s}}" variant="gold" />
        <FormulaBox latex="a = g - \dfrac{kv^2}{m} = 9{,}80 - \dfrac{(0{,}250)(900)}{75}" variant="blue" />
        <FormulaBox latex="a = 9{,}80 - 3{,}00 = 6{,}80\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a \approx 6{,}80\ \text{m/s}^2}" variant="gold" />
      </div>
    ),
    summary: <p>Akselerasjon avtar fra <InlineLatex latex="g" /> til 0 asymptotisk etter hvert som <InlineLatex latex="v" /> nærmer seg <InlineLatex latex="v_t" />.</p>,
  },
};
