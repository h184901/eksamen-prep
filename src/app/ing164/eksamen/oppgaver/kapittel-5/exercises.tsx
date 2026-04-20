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
        <p>
          <strong>Teori:</strong> Bildet henger stille, så det er i <em>likevekt</em>. Første Newtons lov
          sier da at <InlineLatex latex="\sum\vec F = 0" />. Siden vi jobber i 2D gir dette
          én ligning per akse — totalt to ligninger, som er akkurat det vi trenger for å
          finne to ukjente snordrag. Vi bruker knuten der snorene møtes som «legeme».
        </p>
        <Step n={1} title="Frilegemediagram og koordinater">
          <p>
            Vi velger standard akser: x mot høyre, y oppover. Hver snor trekker <em>bort</em> fra
            knuten langs sin egen retning. Vi dekomponerer:
          </p>
          <FormulaBox latex="\vec T_1 = (-T_1\cos 30^\circ,\ +T_1\sin 30^\circ)" variant="blue" />
          <FormulaBox latex="\vec T_2 = (+T_2\cos 45^\circ,\ +T_2\sin 45^\circ)" variant="blue" />
          <FormulaBox latex="\vec W = (0,\ -mg)" variant="blue" />
          <p>
            Merk: <InlineLatex latex="T_1" /> peker opp mot venstre, så x-komponenten er <em>negativ</em>.
            <InlineLatex latex="T_2" /> peker opp mot høyre, så den er positiv. Tyngden virker
            bare nedover.
          </p>
        </Step>

        <Step n={2} title="Originalformelen — Newton 1 i komponenter">
          <p>
            Vi starter med den generelle likevektsbetingelsen og splitter i komponenter:
          </p>
          <FormulaBox latex="\sum \vec F = 0 \;\Longleftrightarrow\; \sum F_x = 0 \;\text{og}\; \sum F_y = 0" variant="blue" />
          <p>x-retning (ingen tyngdekomponent her):</p>
          <FormulaBox latex="\sum F_x: -T_1\cos 30^\circ + T_2\cos 45^\circ = 0" variant="blue" />
          <p>
            Vi <em>omformer</em> for å uttrykke <InlineLatex latex="T_2" /> i <InlineLatex latex="T_1" />:
          </p>
          <FormulaBox latex="T_2 = T_1\dfrac{\cos 30^\circ}{\cos 45^\circ} = T_1\cdot\dfrac{\sqrt{3}/2}{\sqrt{2}/2} = T_1\sqrt{\dfrac{3}{2}}" variant="blue" />
        </Step>

        <Step n={3} title="Bruk y-ligningen til å løse for T₁">
          <FormulaBox latex="\sum F_y: T_1\sin 30^\circ + T_2\sin 45^\circ - mg = 0" variant="blue" />
          <p>
            Setter inn uttrykket for <InlineLatex latex="T_2" /> fra x-ligningen — da har vi kun
            én ukjent igjen:
          </p>
          <FormulaBox latex="T_1\cdot\tfrac12 + T_1\sqrt{\tfrac32}\cdot\tfrac{\sqrt 2}{2} = mg" variant="blue" />
          <FormulaBox latex="T_1\left(\tfrac12 + \tfrac{\sqrt 3}{2}\right) = mg" variant="blue" />
          <FormulaBox latex="T_1 = \dfrac{mg}{\tfrac12(1+\sqrt 3)} = \dfrac{2mg}{1+\sqrt 3}" variant="blue" />
          <p>
            <strong>Hvorfor virker dette?</strong> Fordi x-ligningen bare kobler de to snordragene
            til hverandre, mens y-ligningen bringer inn tyngdekraften og dermed skalaen.
          </p>
        </Step>

        <Step n={4} title="Innsetting av tall">
          <FormulaBox latex="T_1 = \dfrac{2(8{,}00)(9{,}80)}{1+\sqrt 3} = \dfrac{156{,}8}{2{,}732}" variant="blue" />
          <FormulaBox latex="\boxed{T_1 \approx 57{,}4\ \text{N}}" variant="gold" />
          <FormulaBox latex="T_2 = T_1\sqrt{3/2} = 57{,}4\cdot 1{,}225" variant="blue" />
          <FormulaBox latex="\boxed{T_2 \approx 70{,}3\ \text{N}}" variant="gold" />
        </Step>

        <p className="mt-3">
          <strong>Fysisk tolkning:</strong> Den brattere snoren (45°) bærer mest vekt — den
          har størst vertikalkomponent per newton drag og gjør dermed «mest nytte» med å
          bære tyngden. En snor som var helt horisontal ville hatt <InlineLatex latex="\sin\theta = 0" /> og
          kunne ikke bære noe vertikalt i det hele tatt — derfor henger klessnorer alltid
          litt nedover.
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
        <p>
          <strong>Teori:</strong> Lampen henger i ro, altså i likevekt. Det vil si at summen av
          alle krefter er null: <InlineLatex latex="\sum\vec F = 0" />. Vi frilegger knuten der
          snorene møtes og dekomponerer hver snor i x- og y-komponenter. Snoren til venstre
          drar knuten opp og <em>mot venstre</em> (negativ x), og snoren til høyre drar opp og
          <em>mot høyre</em> (positiv x).
        </p>
        <Step n={1} title="Originalformlene — Newton 1 i komponenter">
          <FormulaBox latex="\sum F_x: -T_1\cos 40^\circ + T_2\cos 20^\circ = 0" variant="blue" />
          <FormulaBox latex="\sum F_y: T_1\sin 40^\circ + T_2\sin 20^\circ - mg = 0" variant="blue" />
          <p>
            <em>Omforming av x-ligningen</em> til å isolere <InlineLatex latex="T_2" />:
          </p>
          <FormulaBox latex="T_2 = T_1\dfrac{\cos 40^\circ}{\cos 20^\circ} = T_1\cdot\dfrac{0{,}766}{0{,}940} = 0{,}8152\,T_1" variant="blue" />
        </Step>
        <Step n={2} title="Sett inn i y-ligningen">
          <p>
            Nå har vi bare én ukjent igjen. Vi substituerer inn uttrykket for <InlineLatex latex="T_2" />:
          </p>
          <FormulaBox latex="T_1\sin 40^\circ + (0{,}8152\,T_1)\sin 20^\circ = mg" variant="blue" />
          <FormulaBox latex="T_1(0{,}6428 + 0{,}2788) = (4{,}00)(9{,}80)" variant="blue" />
          <FormulaBox latex="T_1\cdot 0{,}9216 = 39{,}2 \Rightarrow T_1 = 42{,}5\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T_1 \approx 42{,}5\ \text{N}}" variant="gold" />
          <FormulaBox latex="T_2 = 0{,}8152\cdot 42{,}5 \approx 34{,}7\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T_2 \approx 34{,}7\ \text{N}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Snoren med <em>størst</em> vinkel (40°) tar
          størst drag — litt overraskende! Årsaken er at vertikalkomponenten er <InlineLatex latex="T\sin\theta" />.
          Snoren med liten vinkel bidrar lite vertikalt per newton, så for å holde lampa
          må mye av tyngden dekkes av den brattere snoren. Samtidig balanserer horisontalkomponentene
          hverandre: <InlineLatex latex="T_1\cos 40^\circ = T_2\cos 20^\circ" />.
        </p>
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
        <p>
          <strong>Teori:</strong> Når et legeme glir ned et skråplan, virker to krefter: tyngden
          <InlineLatex latex="\vec W = m\vec g" /> rett nedover og normalkraften <InlineLatex latex="\vec n" /> vinkelrett
          ut fra overflaten. Nøkkelen — og en av de viktigste teknikkene i hele mekanikken —
          er å <em>rotere</em> koordinatsystemet så x-aksen ligger langs planet. Da blir
          akselerasjonsvektoren ren i x-retning (<InlineLatex latex="a_y = 0" />), og vi kan behandle
          hver akse uavhengig.
        </p>
        <Step n={1} title="Koordinater langs skråplanet og dekomponering av tyngden">
          <p>
            x-aksen peker ned skråplanet (i bevegelsesretning), y-aksen vinkelrett ut.
            Tyngdevektoren <InlineLatex latex="\vec W" /> danner vinkelen <InlineLatex latex="\theta" /> med y-aksen, og
            dekomponeres som:
          </p>
          <ul className="list-disc list-inside">
            <li><InlineLatex latex="W_x = mg\sin\theta" /> (ned langs skråplanet)</li>
            <li><InlineLatex latex="W_y = -mg\cos\theta" /> (inn i overflaten)</li>
            <li><InlineLatex latex="n_y = +n" /> (ut fra overflaten)</li>
          </ul>
          <p>
            <em>Hvorfor sin og cos?</em> Tegn et rettvinklet hjelpe-trekant: hypotenusen er
            <InlineLatex latex="mg" />, vinkelen mot planet er <InlineLatex latex="\theta" />. Komponenten
            langs planet (<InlineLatex latex="\sin\theta" />) vokser med vinkelen; komponenten inn mot
            planet (<InlineLatex latex="\cos\theta" />) avtar.
          </p>
        </Step>
        <Step n={2} title="Newton 2 langs planet — finn (a)">
          <p>Originalformelen:</p>
          <FormulaBox latex="\sum F_x = ma_x" variant="blue" />
          <p>Langs planet er den eneste nettokraften tyngdekomponenten:</p>
          <FormulaBox latex="mg\sin\theta = ma \;\Longrightarrow\; a = g\sin\theta" variant="blue" />
          <p>
            <strong>Massen forsvinner!</strong> Det skjer fordi Newton 2 har <InlineLatex latex="m" /> på
            høyre side, og tyngden <InlineLatex latex="mg" /> har <InlineLatex latex="m" /> på venstre
            side — de stryker hverandre. Innsetting:
          </p>
          <FormulaBox latex="a = g\sin\theta = (9{,}80)\sin 30^\circ = 4{,}90\ \text{m/s}^2" variant="blue" />
          <FormulaBox latex="\boxed{a = 4{,}90\ \text{m/s}^2 \text{ ned skråplanet}}" variant="gold" />
        </Step>
        <Step n={3} title="Newton 2 vinkelrett på planet — finn (b)">
          <p>
            I y-retning er det ingen bevegelse (blokken glir <em>langs</em> planet, ikke <em>inn i</em> det),
            så <InlineLatex latex="a_y=0" /> og vi har statisk likevekt:
          </p>
          <FormulaBox latex="\sum F_y = 0: \quad n - mg\cos\theta = 0 \;\Longrightarrow\; n = mg\cos\theta" variant="blue" />
          <FormulaBox latex="n = (5{,}00)(9{,}80)\cos 30^\circ = 42{,}4\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{n \approx 42{,}4\ \text{N}}" variant="gold" />
        </Step>
        <p className="mt-3">
          <strong>Fysisk tolkning:</strong> Akselerasjonen avhenger <em>ikke</em> av massen —
          en fjær og en steinklump akselererer likt ned et friksjonsfritt skråplan (samme
          grunn som at alt faller likt i vakuum). Normalkraften er <em>mindre</em> enn
          <InlineLatex latex="mg" /> fordi planet bare «ser» vinkelrett-komponenten av tyngden.
          Grensetester: ved <InlineLatex latex="\theta = 0" /> (flat) blir <InlineLatex latex="a=0" /> og
          <InlineLatex latex="n=mg" /> — riktig. Ved <InlineLatex latex="\theta=90^\circ" /> (loddrett) blir
          <InlineLatex latex="a=g" /> og <InlineLatex latex="n=0" /> — fritt fall.
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
        <p>
          <strong>Teori:</strong> Snoren og trinsen er ideelle (masseløs snor, friksjonsfri og
          masseløs trinse). Det gir to nyttige <em>tvangsbetingelser</em>: (i) snordraget er likt
          i begge ender (ellers ville et «segment» av snoren få netto kraft og uendelig
          akselerasjon, siden den er masseløs), og (ii) snoren strekker seg ikke — så når
          én masse går ned én cm, går den andre opp én cm. Det betyr at
          <InlineLatex latex="|a_1| = |a_2| = a" />. Nå kan vi skrive Newton 2 for hver masse separat
          og løse to ligninger for to ukjente.
        </p>
        <Step n={1} title="Frilegemediagram for hver masse">
          <p>
            For <InlineLatex latex="m_1" /> (lettere, akselererer oppover — velg opp som positiv her):
            snordraget <InlineLatex latex="T" /> virker opp og tyngden <InlineLatex latex="m_1 g" /> ned.
          </p>
          <p>
            For <InlineLatex latex="m_2" /> (tyngre, akselererer ned — velg ned som positiv her):
            tyngden <InlineLatex latex="m_2 g" /> virker ned og snordraget <InlineLatex latex="T" /> opp.
          </p>
        </Step>
        <Step n={2} title="Originalformelen — Newton 2 for hver masse">
          <FormulaBox latex="\sum F = ma" variant="blue" />
          <p>Dette gir ett ligningspar:</p>
          <FormulaBox latex="(1):\ T - m_1 g = m_1 a" variant="blue" />
          <FormulaBox latex="(2):\ m_2 g - T = m_2 a" variant="blue" />
        </Step>
        <Step n={3} title="Eliminer T — adder ligningene">
          <p>
            <strong>Trikset:</strong> adder (1) og (2). Da stryker <InlineLatex latex="T" /> og
            <InlineLatex latex="-T" /> hverandre ut:
          </p>
          <FormulaBox latex="(m_2 - m_1)g = (m_1 + m_2)a" variant="blue" />
          <p>Løs for <InlineLatex latex="a" />:</p>
          <FormulaBox latex="a = \dfrac{(m_2 - m_1)g}{m_1+m_2} = \dfrac{(5{,}00-3{,}00)(9{,}80)}{8{,}00}" variant="blue" />
          <FormulaBox latex="\boxed{a = 2{,}45\ \text{m/s}^2}" variant="gold" />
        </Step>
        <Step n={4} title="Finn T ved innsetting">
          <p>
            Setter <InlineLatex latex="a" /> tilbake i ligning (1), som gir <InlineLatex latex="T = m_1(g+a)" />:
          </p>
          <FormulaBox latex="T = m_1(g+a) = (3{,}00)(9{,}80+2{,}45) = 36{,}75\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T \approx 36{,}8\ \text{N}}" variant="gold" />
        </Step>
        <p className="mt-3">
          <strong>Fysisk tolkning:</strong> <InlineLatex latex="T" /> ligger mellom de to
          vektene (<InlineLatex latex="m_1 g = 29{,}4\ \text{N}" /> og <InlineLatex latex="m_2 g = 49{,}0\ \text{N}" />) —
          akkurat som det skal. Den lettere blir akselerert <em>opp</em> (så <InlineLatex latex="T > m_1 g" />),
          og den tyngre blir bremset når den faller ned (så <InlineLatex latex="T < m_2 g" />).
          Grensetest: hvis <InlineLatex latex="m_1 = m_2" /> blir <InlineLatex latex="a = 0" /> og <InlineLatex latex="T = mg" /> —
          perfekt balanse.
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
        <p>
          <strong>Teori:</strong> En personvekt måler ikke tyngdekraften din direkte — den måler
          kontaktkraften (normalkraften <InlineLatex latex="n" />) mellom deg og vekten. I et ikke-akselererende
          system er de like, men i akselererte system skiller de seg. Personen har to krefter
          på seg: tyngden <InlineLatex latex="mg" /> nedover og normalkraften <InlineLatex latex="n" /> oppover.
          Vi setter positiv y-retning oppover og anvender Newton 2:
        </p>
        <FormulaBox latex="\sum F_y = ma_y: \quad n - mg = ma_y" variant="blue" />
        <p>
          <em>Omforming</em> til å løse for normalkraften (det vekten viser):
        </p>
        <FormulaBox latex="n = m(g + a_y)" variant="blue" />
        <p>
          Her har <InlineLatex latex="a_y" /> <em>fortegn</em>: positiv når heisen akselererer opp,
          negativ når den akselererer ned. Dette er det hele hemmelighetenbak «apparent weight».
        </p>
        <p><strong>(a)</strong> Heisen akselererer oppover: <InlineLatex latex="a_y=+3{,}20\ \text{m/s}^2" />. Gulvet må
        både bære tyngden <em>og</em> akselerere deg oppover — du føles tyngre:</p>
        <FormulaBox latex="n = m(g+a_y) = 72{,}0(9{,}80+3{,}20) = 72{,}0\cdot 13{,}0" variant="blue" />
        <FormulaBox latex="\boxed{n = 936\ \text{N}}" variant="gold" />
        <p><strong>(b)</strong> Konstant hastighet: <InlineLatex latex="a_y=0" />. Ingen akselerasjon
        ⇒ likevekt ⇒ vekten viser «normal» verdi:</p>
        <FormulaBox latex="n = mg = 72{,}0\cdot 9{,}80 = 706\ \text{N}" variant="blue" />
        <FormulaBox latex="\boxed{n \approx 706\ \text{N}}" variant="gold" />
        <p><strong>(c)</strong> Heisen akselererer nedover: <InlineLatex latex="a_y=-2{,}40\ \text{m/s}^2" />.
        Gulvet trenger ikke bære like mye — du føles lettere:</p>
        <FormulaBox latex="n = 72{,}0(9{,}80-2{,}40) = 72{,}0\cdot 7{,}40" variant="blue" />
        <FormulaBox latex="\boxed{n \approx 533\ \text{N}}" variant="gold" />
        <p><strong>(d)</strong> Fritt fall: <InlineLatex latex="a_y=-g" />. Ingenting holder deg oppe
        fordi du og heisen akselererer likt nedover:</p>
        <FormulaBox latex="n = m(g-g) = 0" variant="blue" />
        <FormulaBox latex="\boxed{n = 0\ \text{N (vektløshet)}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Astronauter i bane er egentlig i konstant fritt
          fall — de faller «rundt» jorda. Derfor føler de seg vektløse selv om tyngdekraften
          der oppe nesten er like stor som på bakken.
        </p>
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
        <p>
          <strong>Teori:</strong> Dette er standard «to-trinns»-oppgave: Newton 2 gir akselerasjonen
          fra kreftene, og kinematikk gir bevegelsen over tid. Siden gulvet er friksjonsfritt,
          er den eneste horisontale kraften den anvendte kraften <InlineLatex latex="F" />. Tyngden
          og normalkraften balanserer vertikalt (<InlineLatex latex="n = mg" />), så de bidrar ikke
          til horisontal akselerasjon.
        </p>
        <p><strong>(a) Akselerasjon.</strong> Originalformelen er Newtons andre lov:</p>
        <FormulaBox latex="\sum F_x = ma" variant="blue" />
        <p>
          Her er <InlineLatex latex="\sum F_x = F" />. <em>Omforming</em> for å løse for <InlineLatex latex="a" />:
        </p>
        <FormulaBox latex="a = \dfrac{F}{m}" variant="blue" />
        <FormulaBox latex="a = \dfrac{80{,}0\ \text{N}}{25{,}0\ \text{kg}} = 3{,}20\ \text{m/s}^2" variant="blue" />
        <FormulaBox latex="\boxed{a = 3{,}20\ \text{m/s}^2}" variant="gold" />
        <p><strong>(b) Tilbakelagt strekning.</strong> Med konstant akselerasjon og start i ro
        (<InlineLatex latex="v_0 = 0" />), gir kinematikkformelen:</p>
        <FormulaBox latex="x(t) = v_0 t + \tfrac12 a t^2 = \tfrac12 a t^2" variant="blue" />
        <FormulaBox latex="x = \tfrac12(3{,}20)(3{,}00)^2 = \tfrac12(3{,}20)(9{,}00) = 14{,}4\ \text{m}" variant="blue" />
        <FormulaBox latex="\boxed{x = 14{,}4\ \text{m}}" variant="gold" />
        <p>
          <strong>Fysisk tolkning:</strong> Kraften bestemmer akselerasjonen, akselerasjonen
          bestemmer bevegelsen. Legg merke til at <InlineLatex latex="x" /> vokser <em>kvadratisk</em> med
          tiden — dobler vi tiden, går den fire ganger så langt. Dette er karakteristisk
          for konstant akselerasjon fra ro.
        </p>
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
        <p>
          <strong>Teori:</strong> To klosser forbundet med en <em>uttøybar</em> snor har
          samme fart og samme akselerasjon til enhver tid — snorens lengde er konstant. Dette
          er en <em>tvangsbetingelse</em>. Vi bruker to komplementære teknikker: (1) «system»-tilnærmingen,
          som gir akselerasjonen raskt fordi indre snordrag kansellerer (Newtons 3. lov: snoren
          drar A fremover og B bakover med like stor kraft, så de summeres til null når vi ser på
          A+B sammen). (2) «frilegeme»-tilnærmingen, hvor vi isolerer én kloss og skriver Newton 2
          for bare den — dette er <em>eneste</em> måte å få fram en indre kraft som <InlineLatex latex="T" />.
        </p>
        <Step n={1} title="Hele systemet — eliminer T ved å gruppere">
          <p>
            Originalformelen er Newtons 2. lov anvendt på <em>hele systemet</em> (begge klosser
            betraktet som ett legeme med total masse <InlineLatex latex="m_A+m_B" />):
          </p>
          <FormulaBox latex="\sum F_\text{ytre} = (m_A+m_B)a" variant="blue" />
          <p>
            <em>Hvorfor virker dette?</em> Fordi snordragene <InlineLatex latex="T" /> (på A) og
            <InlineLatex latex="-T" /> (på B) er <strong>indre</strong> krefter mellom A og B, og
            ifølge Newton 3 kansellerer de parvis når vi legger sammen. Det eneste som står igjen
            er den ytre kraften <InlineLatex latex="F" />. Friksjonsfritt gulv ⇒ ingen horisontal
            friksjon å ta hensyn til. <em>Omforming</em> til å isolere akselerasjonen:
          </p>
          <FormulaBox latex="a = \dfrac{F}{m_A+m_B}" variant="blue" />
          <FormulaBox latex="a = \dfrac{F}{m_A+m_B} = \dfrac{30{,}0}{10{,}0} = 3{,}00\ \text{m/s}^2" variant="blue" />
          <FormulaBox latex="\boxed{a = 3{,}00\ \text{m/s}^2}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="\text{N}/\text{kg}=\text{m/s}^2" /> ✓.
          </p>
        </Step>
        <Step n={2} title="Isoler A — eneste måte å få fram T">
          <p>
            Når vi skal finne <em>snordraget</em> (en indre kraft), <strong>må</strong> vi bryte
            systemet: T «synes» ikke før vi ser på én kloss for seg. Velg den minste A, siden
            færrest krefter virker på den. Frilegeme for A: kun snordraget <InlineLatex latex="T" />{" "}
            horisontalt (tyngden og normalkraften balanserer vertikalt).
          </p>
          <FormulaBox latex="\sum F_x = m_A a: \quad T = m_A a" variant="blue" />
          <p>
            Vi kjenner nå <InlineLatex latex="a" /> fra steg 1, og kan sette inn direkte:
          </p>
          <FormulaBox latex="T = m_A a = (4{,}00)(3{,}00) = 12{,}0\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T = 12{,}0\ \text{N}}" variant="gold" />
        </Step>
        <p className="italic">
          <strong>Kryss-sjekk med B</strong> (bra vane!): På B virker <InlineLatex latex="F" /> (fremover)
          og <InlineLatex latex="T" /> (bakover — Newton 3 på snoren). Newton 2 gir
          <InlineLatex latex="F - T = m_B a \Rightarrow 30-12=18=(6)(3)\ \checkmark" />. Perfekt.
        </p>
        <p>
          <strong>Fysisk tolkning:</strong> Snordraget (12 N) er <em>mindre</em> enn den anvendte
          kraften (30 N) — fordi snoren bare trenger å dra A, mens <InlineLatex latex="F" /> må
          akselerere både A og B. Hadde A vært tyngre, ville <InlineLatex latex="T" /> vært større.
          Dette er generelt: den fremste klossen «føler» hele kraften, og bakre klosser «føler» bare
          det som trengs for å akselerere det som ligger foran snoren.
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
        <p>
          <strong>Teori:</strong> Vi har et to-legeme system, men spørsmålet handler om en
          <em>indre</em> kraft (dragkraften i kroken mellom bil og henger). Da må vi <strong>isolere
          hengeren</strong> og anvende Newtons 2. lov på bare den. Alt som virker på hengeren
          horisontalt er: (a) dragkraften <InlineLatex latex="T" /> i kroken (fremover) og
          (b) rullemotstanden <InlineLatex latex="f=200\ \text{N}" /> (bakover). Vertikalt balanserer
          tyngden og normalkraften, så de gir ikke bidrag. Bilens masse er irrelevant for dette —
          bilens motor er kilden til <InlineLatex latex="T" />, men når vi analyserer <em>hengeren</em>,
          er det hengerens masse og hengerens kraftbilde som teller.
        </p>
        <Step n={1} title="Først: finn akselerasjonen fra kinematikk">
          <p>
            Start fra ro og får 25 m/s på 10 s — konstant akselerasjon. Originalformelen er
            definisjonen av gjennomsnittlig akselerasjon:
          </p>
          <FormulaBox latex="a = \dfrac{\Delta v}{\Delta t}" variant="blue" />
          <FormulaBox latex="a = \dfrac{\Delta v}{\Delta t} = \dfrac{25{,}0}{10{,}0} = 2{,}50\ \text{m/s}^2" variant="blue" />
        </Step>
        <Step n={2} title="Newton 2 på hengeren alene">
          <p>
            Velg x-aksen i bilens kjøreretning (positiv). På hengeren virker <InlineLatex latex="T" /> fremover
            og <InlineLatex latex="f" /> bakover (friksjon virker alltid <em>mot</em> bevegelsen):
          </p>
          <FormulaBox latex="\sum F_x = m_h a: \quad T - f = m_h a" variant="blue" />
          <p>
            <em>Omforming</em> for å isolere det vi skal finne:
          </p>
          <FormulaBox latex="T - f = m_h a \Rightarrow T = m_h a + f" variant="blue" />
          <p>
            <strong>Hvorfor denne formelen?</strong> Fordi dragkraften må (1) akselerere hengeren
            (<InlineLatex latex="m_h a" />) <em>og</em> (2) overvinne friksjonen (<InlineLatex latex="f" />).
            Begge bidragene summeres.
          </p>
        </Step>
        <Step n={3} title="Innsetting">
          <FormulaBox latex="T = (1200)(2{,}50) + 200 = 3000 + 200 = 3200\ \text{N}" variant="blue" />
          <FormulaBox latex="\boxed{T = 3{,}20\times 10^{3}\ \text{N}}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="\text{kg}\cdot\text{m/s}^2 + \text{N} = \text{N} + \text{N} = \text{N}" /> ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Av de 3200 N går 3000 N til å akselerere hengeren (gi
          den fart), mens 200 N går til å vinne mot friksjon. Hadde hengeren hatt konstant fart
          (<InlineLatex latex="a=0" />), ville <InlineLatex latex="T" /> kun behøvd å motvirke friksjonen,
          altså 200 N. Dette er grunnen til at <em>kjøring</em> bruker mer drivstoff enn <em>cruising</em> —
          akselerasjon koster mer enn å holde konstant fart.
        </p>
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
        <p>
          <strong>Teori:</strong> Vi har to typer informasjon: <em>kinematisk</em> (hvor langt
          kassa gled og hvor fort den startet) og <em>dynamisk</em> (at kinetisk friksjon er det
          som bremset). Planen er å bygge en bro mellom dem: kinematikken gir oss akselerasjonen
          <InlineLatex latex="a" />, og Newtons 2. lov kobler akselerasjonen til friksjonskraften,
          som igjen er <InlineLatex latex="f_k=\mu_k n" />. Fordi gulvet er horisontalt og ingen
          andre vertikale krefter virker, er normalkraften bare <InlineLatex latex="n=mg" />.
          Ingen vertikal akselerasjon ⇒ <InlineLatex latex="\sum F_y=0" />.
        </p>
        <Step n={1} title="Originalformel (kinematikk) — finn akselerasjonen">
          <p>
            Vi bruker den tidløse kinematikkformelen (utledet fra <InlineLatex latex="v=v_0+at" />{" "}
            og <InlineLatex latex="x=v_0 t+\tfrac12 at^2" /> ved å eliminere <InlineLatex latex="t" />):
          </p>
          <FormulaBox latex="v^2 = v_0^2 + 2ad" variant="blue" />
          <p>
            <em>Hvorfor denne, ikke <InlineLatex latex="v=v_0+at" />?</em> Fordi vi ikke vet tiden,
            men vi vet strekningen. Sett <InlineLatex latex="v=0" /> (kassen stopper) og løs for
            <InlineLatex latex="a" />:
          </p>
          <FormulaBox latex="0 = v_0^2 + 2ad \;\Longrightarrow\; a = -\dfrac{v_0^2}{2d}" variant="blue" />
          <p>
            Fortegnet <em>minus</em> er viktig: akselerasjonen peker <em>motsatt</em> av bevegelsen
            (bremseretning). Innsetting:
          </p>
          <FormulaBox latex="a = -\dfrac{v_0^2}{2d} = -\dfrac{(5{,}00)^2}{2\cdot 8{,}50} = -1{,}471\ \text{m/s}^2" variant="blue" />
        </Step>
        <Step n={2} title="Newton 2 — koble akselerasjon til friksjonskraften">
          <p>
            La x peke i bevegelsens retning (positiv). Den eneste horisontale kraften er kinetisk
            friksjon, som peker motsatt bevegelsen (negativ):
          </p>
          <FormulaBox latex="\sum F_x = ma: \quad -f_k = ma" variant="blue" />
          <FormulaBox latex="-f_k = ma \Rightarrow f_k = -ma = -(14{,}0)(-1{,}471) = 20{,}6\ \text{N}" variant="blue" />
          <p>
            De to minustegnene opphever hverandre og gir en positiv friksjonsstørrelse — akkurat
            som forventet, siden kraftens <em>størrelse</em> alltid er positiv.
          </p>
        </Step>
        <Step n={3} title="Friksjonsformelen — omform til μₖ">
          <p>
            Originalformelen for kinetisk friksjon er:
          </p>
          <FormulaBox latex="f_k = \mu_k n" variant="blue" />
          <p>
            På horisontalt gulv uten andre vertikale krefter: <InlineLatex latex="n=mg" />. Sett inn
            og <em>omform</em> for å isolere <InlineLatex latex="\mu_k" />:
          </p>
          <FormulaBox latex="\mu_k = \dfrac{f_k}{mg}" variant="blue" />
          <p>
            Substituer <InlineLatex latex="f_k=-ma = m\cdot v_0^2/(2d)" /> — vi ser at <em>massen
            forkorter bort</em>:
          </p>
          <FormulaBox latex="\mu_k = \dfrac{f_k}{mg} = \dfrac{v_0^2}{2gd} = \dfrac{25{,}0}{2\cdot 9{,}80\cdot 8{,}50}" variant="blue" />
          <FormulaBox latex="\boxed{\mu_k \approx 0{,}150}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="(\text{m/s})^2/(\text{m/s}^2\cdot\text{m}) = 1" /> ✓,
            dimensjonsløs som en koeffisient skal være.
          </p>
        </Step>
        <p className="italic">
          <strong>Fysisk tolkning:</strong> Massen falt ut — akkurat som for fritt fall. Det er fordi
          både tyngden (som setter normalkraften) og tregheten skaleres likt med <InlineLatex latex="m" />.
          Derfor kan politiet anslå bilens fart fra bremsespor uten å veie bilen!
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
        <p>
          <strong>Teori:</strong> Når kraften er vinklet oppover, må den <em>dekomponeres</em>
          i en horisontal og en vertikal komponent. Den vertikale komponenten <InlineLatex latex="F\sin\theta" />{" "}
          løfter kassen litt og reduserer derfor normalkraften. Siden friksjon er proporsjonal med
          normalkraft (<InlineLatex latex="f_k=\mu_k n" />), reduseres også friksjonen — et <em>doble
          gevinst</em> ved å trekke i vinkel: du bruker mer av kraften til å akselerere, og samtidig
          har du mindre friksjon å vinne over. (Dette er nøyaktig hvorfor oppgave 5.35 finner en
          optimal vinkel.) Jeg velger standard akser: x horisontalt (positivt i dragretningen),
          y vertikalt (positivt opp).
        </p>
        <Step n={1} title="Dekomponer den vinklede dragkraften">
          <p>
            Dragkraften <InlineLatex latex="F" /> lager vinkel 30° over horisontalen, så:
          </p>
          <FormulaBox latex="F_x = F\cos\theta,\quad F_y = +F\sin\theta" variant="blue" />
          <p>
            Y-komponenten er positiv (opp) — dette er fortegnet som løfter kassen.
          </p>
        </Step>
        <Step n={2} title="Originalformel — Newton 2 vinkelrett (y): finn n">
          <p>
            I y-retning er det ingen bevegelse (kassa sklir langs gulvet, ikke opp fra det),
            så <InlineLatex latex="a_y=0" /> og vi får likevekt:
          </p>
          <FormulaBox latex="\sum F_y = 0: \quad n + F\sin\theta - mg = 0" variant="blue" />
          <p>
            <em>Omforming</em> for å isolere <InlineLatex latex="n" />:
          </p>
          <FormulaBox latex="n = mg - F\sin\theta" variant="blue" />
          <FormulaBox latex="n = mg - F\sin\theta = (30)(9{,}80) - (150)\sin 30^\circ = 294 - 75 = 219\ \text{N}" variant="blue" />
          <p>
            Merk: uten vinkel ville <InlineLatex latex="n" /> vært <InlineLatex latex="mg=294\ \text{N}" />.
            Vinkelen fjerner 75 N fra normalkraften — altså 25 % mindre friksjon å vinne over.
          </p>
        </Step>
        <Step n={3} title="Friksjon — originalformel fk = μₖ n">
          <FormulaBox latex="f_k = \mu_k n = (0{,}300)(219) = 65{,}7\ \text{N}" variant="blue" />
          <p>
            Retning: motsatt bevegelse (bakover, negativ x).
          </p>
        </Step>
        <Step n={4} title="Newton 2 i x — finn a">
          <p>
            Nå anvender vi Newton 2 langs bevegelsesretningen. Horisontal netto = dragkomponenten
            fremover minus friksjonen:
          </p>
          <FormulaBox latex="\sum F_x = ma: \quad F\cos\theta - f_k = ma" variant="blue" />
          <FormulaBox latex="F_\text{netto},x = F\cos\theta - f_k = (150)(0{,}866) - 65{,}7 = 129{,}9 - 65{,}7 = 64{,}2\ \text{N}" variant="blue" />
          <FormulaBox latex="a = F_\text{netto}/m = 64{,}2/30 = 2{,}14\ \text{m/s}^2" variant="blue" />
          <FormulaBox latex="\boxed{a \approx 2{,}14\ \text{m/s}^2}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Hadde vi dratt helt horisontalt (<InlineLatex latex="\theta=0" />),
          ville <InlineLatex latex="F_x=150" /> men <InlineLatex latex="n=294" /> og <InlineLatex latex="f_k=88{,}2\ \text{N}" /> ⇒
          netto = 61,8 N, <InlineLatex latex="a=2{,}06\ \text{m/s}^2" />. Altså litt <em>mindre</em>
          akselerasjon enn med 30°-vinkel! Den vinklede kraften vant fordi friksjonsreduksjonen
          betyr mer enn at kun <InlineLatex latex="\cos 30^\circ=0{,}866" /> av kraften går til
          akselerasjon. Eksistensen av en slik optimal vinkel er helt generell — og den finnes vi
          i oppgave 5.35.
        </p>
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
        <p>
          <strong>Teori:</strong> Dette er et klassisk <em>optimeringsproblem</em> som bygger bro
          mellom fysikk og kalkulus. Vi skal finne den vinkelen der kraften <InlineLatex latex="F" />{" "}
          er minimal for «akkurat å få kassen til å bevege seg ved konstant fart» — det vil si
          akkurat på grensen for statisk friksjon, der <InlineLatex latex="f = \mu_s n" /> og
          akselerasjonen er null. Hvorfor finnes det et minimum? Fordi to motstridende effekter
          spiller mot hverandre: (1) en brattere vinkel reduserer normalkraften <InlineLatex latex="n=mg-F\sin\theta" />{" "}
          og dermed friksjonen, men (2) mindre av kraften (<InlineLatex latex="F\cos\theta" />) går
          langs gulvet. Balansepunktet finnes med derivasjon.
        </p>
        <Step n={1} title="Oppstill likevektsligningene (originalformler)">
          <p>
            Konstant fart ⇒ <InlineLatex latex="\vec a=0" /> ⇒ Newton 1 / likevekt. Dekomponer
            <InlineLatex latex="F" /> (vinkel <InlineLatex latex="\theta" /> over horisontalen):
          </p>
          <FormulaBox latex="\sum F_x = 0: \quad F\cos\theta - f = 0" variant="blue" />
          <FormulaBox latex="\sum F_y = 0: \quad n + F\sin\theta - mg = 0" variant="blue" />
          <p>
            På grensen (<em>akkurat</em> i bevegelse): <InlineLatex latex="f = \mu_s n" />. Sett inn:
          </p>
          <FormulaBox latex="F\cos\theta = \mu_s n,\quad n = mg - F\sin\theta" variant="blue" />
        </Step>
        <Step n={2} title="Eliminer n og omform til F(θ)">
          <p>
            Substituer det andre uttrykket inn i det første:
          </p>
          <FormulaBox latex="F\cos\theta = \mu_s(mg - F\sin\theta) = \mu_s mg - \mu_s F\sin\theta" variant="blue" />
          <p>
            Samle alle <InlineLatex latex="F" />-ledd på venstre side:
          </p>
          <FormulaBox latex="F(\cos\theta + \mu_s\sin\theta) = \mu_s mg" variant="blue" />
          <FormulaBox latex="F(\theta) = \dfrac{\mu_s mg}{\cos\theta + \mu_s\sin\theta}" variant="blue" />
          <p>
            <strong>Dette er funksjonen vi skal minimere</strong> mhp. <InlineLatex latex="\theta" />.
            Telleren er konstant, så minimum <InlineLatex latex="F" /> ⇔ <em>maksimum</em> av
            nevneren.
          </p>
        </Step>
        <Step n={3} title="Derivér og sett lik null">
          <p>
            La <InlineLatex latex="N(\theta)=\cos\theta + \mu_s\sin\theta" />. Standard derivasjonsregler
            (<InlineLatex latex="\tfrac{d}{d\theta}\cos\theta=-\sin\theta" />, <InlineLatex latex="\tfrac{d}{d\theta}\sin\theta=\cos\theta" />):
          </p>
          <FormulaBox latex="\dfrac{dN}{d\theta} = -\sin\theta + \mu_s\cos\theta = 0" variant="blue" />
          <p>
            <em>Omform</em> til en relasjon mellom sin og cos:
          </p>
          <FormulaBox latex="\mu_s\cos\theta = \sin\theta \;\Longleftrightarrow\; \dfrac{\sin\theta}{\cos\theta} = \mu_s" variant="blue" />
          <FormulaBox latex="\Rightarrow \tan\theta_\text{opt} = \mu_s" variant="blue" />
          <FormulaBox latex="\boxed{\theta_\text{opt} = \arctan\mu_s}" variant="gold" />
        </Step>
        <Step n={4} title="Sjekk at det er maksimum, ikke minimum">
          <p>
            Andre derivert: <InlineLatex latex="N''(\theta) = -\cos\theta - \mu_s\sin\theta < 0" /> for
            <InlineLatex latex="\theta\in(0,\pi/2)" />, så ja — nevneren har <em>maksimum</em> her,
            og <InlineLatex latex="F" /> dermed minimum. (Intuitivt: grenser fungerer også —
            ved <InlineLatex latex="\theta=0" /> og <InlineLatex latex="\theta=\pi/2" /> er F stor,
            så et indre kritisk punkt må være minimum.)
          </p>
        </Step>
        <Step n={5} title="Sett inn for å få Fmin">
          <p>
            Med <InlineLatex latex="\tan\theta=\mu_s" /> har vi en rettvinklet trekant med motstående
            side <InlineLatex latex="\mu_s" /> og hosliggende 1, hypotenus <InlineLatex latex="\sqrt{1+\mu_s^2}" />.
            Dermed:
          </p>
          <FormulaBox latex="\sin\theta=\dfrac{\mu_s}{\sqrt{1+\mu_s^2}},\quad \cos\theta=\dfrac{1}{\sqrt{1+\mu_s^2}}" variant="blue" />
          <FormulaBox latex="N_\text{maks} = \dfrac{1+\mu_s^2}{\sqrt{1+\mu_s^2}} = \sqrt{1+\mu_s^2}" variant="blue" />
          <FormulaBox latex="\boxed{F_\text{min} = \dfrac{\mu_s mg}{\sqrt{1+\mu_s^2}}}" variant="gold" />
        </Step>
        <p className="italic">
          <strong>Fysisk tolkning:</strong> Eksempel: <InlineLatex latex="\mu_s=0{,}4" /> ⇒
          <InlineLatex latex="\theta_\text{opt}\approx 21{,}8^\circ" />, og <InlineLatex latex="F_\text{min}" />{" "}
          er bare ca. 93 % av <InlineLatex latex="\mu_s mg" /> (kraften uten vinkel). Å trekke i
          vinkel <em>lønner seg</em> fordi det reduserer normalkraften (og dermed friksjonen)
          samtidig som du bruker kraft i bevegelsesretningen. Legg merke til den elegante
          likheten med <InlineLatex latex="\tan\theta_c=\mu_s" /> fra oppgave 5.41 (kritisk vinkel
          før glidning) — samme matematikk, samme friksjonsgeometri!
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
        <p>
          <strong>Teori:</strong> Dette er det generelle skråplanproblemet med kinetisk friksjon.
          Vi kombinerer to byggesteiner fra oppgave 5.8 og 5.25: skråplan-dekomponering av tyngden,
          og kinetisk friksjon som <InlineLatex latex="f_k=\mu_k n" />. Den store gevinsten er at vi
          roterer koordinatsystemet så x ligger langs planet — da er akselerasjonen rent langs
          x-aksen (skiløperen forlater ikke overflaten). Siden bevegelsen er <em>ned</em> planet,
          peker kinetisk friksjon <em>oppover langs planet</em> (motsatt bevegelse).
        </p>
        <Step n={1} title="Originalformler — Newton 2 i roterte akser">
          <p>
            La x være positivt ned langs planet, y vinkelrett ut. Dekomponer tyngden
            <InlineLatex latex="\vec W = m\vec g" />:
          </p>
          <FormulaBox latex="W_x = +mg\sin\theta\ \text{(ned langs planet)}" variant="blue" />
          <FormulaBox latex="W_y = -mg\cos\theta\ \text{(inn i planet)}" variant="blue" />
          <p>Newton 2 langs hver akse:</p>
          <FormulaBox latex="\sum F_y = 0: \quad n - mg\cos\theta = 0 \;\Longrightarrow\; n = mg\cos\theta" variant="blue" />
          <FormulaBox latex="\sum F_x = ma: \quad mg\sin\theta - f_k = ma" variant="blue" />
          <p>
            <em>Hvorfor y=0?</em> Fordi skiløperen ikke hopper eller faller inn i snøen — bevegelsen
            er langs flaten. <em>Hvorfor minus foran <InlineLatex latex="f_k" /></em>? Fordi bevegelsen
            er ned (positiv x), så friksjon virker opp (negativ x).
          </p>
        </Step>
        <Step n={2} title="Sett inn friksjonsuttrykket">
          <p>
            Bruk <InlineLatex latex="f_k=\mu_k n=\mu_k mg\cos\theta" /> (substituering av det vi
            fant i y-ligningen):
          </p>
          <FormulaBox latex="mg\sin\theta - \mu_k mg\cos\theta = ma" variant="blue" />
          <p>
            <strong>Faktoriser</strong> ut <InlineLatex latex="mg" /> og del på <InlineLatex latex="m" />:
          </p>
          <FormulaBox latex="a = g(\sin\theta - \mu_k\cos\theta)" variant="blue" />
          <p>
            Massen faller ut — nok en gang — fordi både tyngden og tregheten skaleres med
            <InlineLatex latex="m" />. Dette er grunnen til at skikjørere av alle størrelser
            akselererer (omtrent) likt i samme løype.
          </p>
        </Step>
        <Step n={3} title="Innsetting og svar">
          <FormulaBox latex="a = g(\sin\theta - \mu_k\cos\theta) = 9{,}80(\sin 15^\circ - 0{,}0500\cos 15^\circ)" variant="blue" />
          <FormulaBox latex="a = 9{,}80(0{,}2588 - 0{,}0483) = 9{,}80\cdot 0{,}2105" variant="blue" />
          <FormulaBox latex="\boxed{a \approx 2{,}06\ \text{m/s}^2\text{ ned skråplanet}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Friksjonen reduserer akselerasjonen betydelig — uten
          friksjon ville <InlineLatex latex="a=g\sin 15^\circ\approx 2{,}54\ \text{m/s}^2" />.
          Kritisk vinkel for at skiløperen skal begynne å gli (terskel) er
          <InlineLatex latex="\theta_c=\arctan 0{,}05\approx 2{,}9^\circ" /> — under dette står man
          stille! Ved større vinkel (f.eks. en bratt alpin-bakke på 30°) blir akselerasjonen stor
          og friksjonen ubetydelig.
        </p>
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
        <p>
          <strong>Teori:</strong> Subtilitet her — kraften <InlineLatex latex="F" /> er <em>horisontal</em>,
          ikke parallelt med skråplanet. Den må derfor dekomponeres i skråplanets roterte koordinatsystem.
          En horisontal vektor som peker mot skråplanet har både en komponent <em>opp langs planet</em>{" "}
          (nyttig) og en komponent <em>inn mot planet</em> (unyttig, men med en bivirkning: den
          <strong>øker normalkraften</strong> og dermed friksjonen). Dette er motsatt av 5.26 der
          en vinklet oppadrettet kraft <em>reduserte</em> normalkraften.
        </p>
        <Step n={1} title="Velg akser og dekomponer alle krefter">
          <p>
            La x være positivt <em>opp langs planet</em>, y vinkelrett ut. Det er tre krefter:
            tyngden <InlineLatex latex="\vec W" /> (rett ned), normalkraften <InlineLatex latex="\vec n" /> (ut fra planet),
            og den påtrykte horisontalkraften <InlineLatex latex="\vec F" />. Tyngden er kjent fra
            5.8:
          </p>
          <FormulaBox latex="W_x = -mg\sin\theta,\quad W_y = -mg\cos\theta" variant="blue" />
          <p>
            For horisontalkraften: tegn en liten hjelpe-trekant. Planet heller med vinkel <InlineLatex latex="\theta" />,
            og <InlineLatex latex="\vec F" /> er horisontal. Vinkelen mellom <InlineLatex latex="\vec F" /> og
            skråplanet (x-aksen) er <InlineLatex latex="\theta" />, og vinkelen mellom
            <InlineLatex latex="\vec F" /> og den innadrettede y-retningen er <InlineLatex latex="90^\circ-\theta" />.
            Slik blir dekomponeringen:
          </p>
          <FormulaBox latex="F_x = +F\cos\theta\ \text{(opp langs planet)}" variant="blue" />
          <FormulaBox latex="F_y = -F\sin\theta\ \text{(inn mot planet)}" variant="blue" />
          <p>
            <strong>Fortegnsanalyse:</strong> Positiv <InlineLatex latex="F_x" /> fordi den dytter
            kassen oppover planet. Negativ <InlineLatex latex="F_y" /> fordi den presser kassen
            <em>mot</em> planet (gjør at planet må trykke hardere tilbake ⇒ større n).
          </p>
        </Step>
        <Step n={2} title="Newton 2 vinkelrett (y) — finn n">
          <p>
            Ingen bevegelse inn/ut av planet ⇒ <InlineLatex latex="\sum F_y=0" />:
          </p>
          <FormulaBox latex="\sum F_y = 0: \quad n - mg\cos\theta - F\sin\theta = 0" variant="blue" />
          <FormulaBox latex="n = mg\cos\theta + F\sin\theta" variant="blue" />
          <FormulaBox latex="n = (12{,}0)(9{,}80)\cos 20^\circ + (150)\sin 20^\circ" variant="blue" />
          <FormulaBox latex="n = 110{,}5 + 51{,}3 = 161{,}8\ \text{N}" variant="blue" />
          <p>
            Normalkraften er <em>større</em> enn <InlineLatex latex="mg\cos\theta=110{,}5\ \text{N}" />.
            Kraften bidrar med ekstra 51,3 N inn mot planet.
          </p>
        </Step>
        <Step n={3} title="Friksjonsformelen (originalformel)">
          <p>
            Kinetisk friksjon motvirker bevegelsen. Kassen går <em>oppover</em>, så friksjonen
            peker <em>nedover langs planet</em> (negativ x):
          </p>
          <FormulaBox latex="f_k = \mu_k n = (0{,}200)(161{,}8) = 32{,}4\ \text{N}" variant="blue" />
        </Step>
        <Step n={4} title="Newton 2 langs planet (x) — finn a">
          <p>
            Originalformel: <InlineLatex latex="\sum F_x = ma" />. Sett inn alle x-komponenter:
          </p>
          <FormulaBox latex="F\cos\theta - mg\sin\theta - f_k = ma" variant="blue" />
          <FormulaBox latex="F_\parallel = F\cos\theta - mg\sin\theta - f_k" variant="blue" />
          <FormulaBox latex="F_\parallel = (150)(0{,}940) - (12{,}0)(9{,}80)(0{,}342) - 32{,}4" variant="blue" />
          <FormulaBox latex="F_\parallel = 141 - 40{,}2 - 32{,}4 = 68{,}4\ \text{N}" variant="blue" />
          <FormulaBox latex="a = F_\parallel/m = 68{,}4/12{,}0 = 5{,}70\ \text{m/s}^2" variant="blue" />
          <FormulaBox latex="\boxed{a \approx 5{,}70\ \text{m/s}^2\text{ opp skråplanet}}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Av de 141 N som <InlineLatex latex="F\cos\theta" /> bidrar
          med langs planet, går 40,2 N til å overvinne tyngdekomponenten og 32,4 N til friksjon.
          Bare 68,4 N står igjen til netto akselerasjon. Sammenlign med å <em>skyve parallelt</em>:
          da ville <InlineLatex latex="n=mg\cos\theta" /> og friksjonen bare 22,1 N — og hele 150 N
          ville gå langs planet. Horisontal dytt er altså <em>ineffektivt</em> på skråplan nettopp
          pga. den ekstra normalkraften — dette er en helt generell innsikt.
        </p>
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
        <p>
          <strong>Teori:</strong> Kassa ligger i ro — det er <em>statisk</em> friksjon som holder
          den. Statisk friksjon er spesiell: den tar nøyaktig den verdien som trengs for å holde
          likevekten, <em>opp til en maksimal verdi</em> <InlineLatex latex="f_{s,\text{maks}}=\mu_s n" />.
          På den kritiske vinkelen er friksjonen på sitt <em>absolutte maksimum</em> og planet er
          akkurat <em>på grensen</em> til å gi etter. Ved større vinkel er den maksimale
          friksjonen utilstrekkelig til å motstå tyngdekomponenten, og kassa begynner å gli.
        </p>
        <Step n={1} title="Oppstill originalformlene — Newton 1 på roterte akser">
          <p>
            x langs planet (ned positiv), y vinkelrett. Tyngden har standardkomponentene (som i 5.8):
          </p>
          <FormulaBox latex="W_x = +mg\sin\theta,\quad W_y = -mg\cos\theta" variant="blue" />
          <p>Likevekt i y-retning gir normalkraften:</p>
          <FormulaBox latex="\sum F_y = 0: \quad n = mg\cos\theta" variant="blue" />
          <p>
            Likevekt i x-retning krever at statisk friksjon <InlineLatex latex="f_s" /> (som virker
            oppover langs planet, motsatt tendensen til å gli ned) balanserer parallellkomponenten:
          </p>
          <FormulaBox latex="\sum F_x = 0: \quad mg\sin\theta - f_s = 0 \;\Longrightarrow\; f_s = mg\sin\theta" variant="blue" />
        </Step>
        <Step n={2} title="Terskelbetingelsen: fs = μs n">
          <p>
            På den kritiske vinkelen har friksjonen nådd sin maksimale verdi:
          </p>
          <FormulaBox latex="f_{s,\text{maks}} = \mu_s n = \mu_s mg\cos\theta" variant="blue" />
          <p>
            Sett lik parallellkomponenten fra x-ligningen (<em>dette er betingelsen for «akkurat
            på grensen»</em>):
          </p>
          <FormulaBox latex="mg\sin\theta_c = \mu_s mg\cos\theta_c" variant="blue" />
        </Step>
        <Step n={3} title="Omform — massen forsvinner">
          <p>
            Del på <InlineLatex latex="mg\cos\theta_c" /> på begge sider:
          </p>
          <FormulaBox latex="\dfrac{\sin\theta_c}{\cos\theta_c} = \mu_s \;\Longleftrightarrow\; \tan\theta_c = \mu_s" variant="blue" />
          <p>
            Massen (og tyngdens størrelse!) stryker bort — den kritiske vinkelen avhenger bare av
            friksjonskoeffisienten. Derfor er dette også en måle­teknikk for <InlineLatex latex="\mu_s" />.
          </p>
        </Step>
        <Step n={4} title="Innsetting">
          <FormulaBox latex="\theta_c = \arctan\mu_s = \arctan 0{,}400" variant="blue" />
          <FormulaBox latex="\boxed{\theta_c \approx 21{,}8^\circ}" variant="gold" />
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Ved nøyaktig 21,8° henger kassa i likevekt — den står
          stille, men den minste forstyrrelse (litt mer tilt, litt vibrasjon) vil få den til å
          gli. Merk den slående likheten med 5.35: samme formel <InlineLatex latex="\tan\theta=\mu_s" />{" "}
          gir både optimal dragvinkel og kritisk tiltvinkel. Dette er ingen tilfeldighet — begge
          problemene har samme grunnleggende geometri mellom normalkraft, friksjon og
          tyngdekomponenter. I klatring: en fjellvegg kan stå stabilt opptil denne vinkelen; over
          det kreves eksterne krefter (f.eks. reb).
        </p>
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
        <p>
          <strong>Teori:</strong> Dette er vår første direkte anvendelse av sentripetalbevegelse.
          Vær oppmerksom: <em>sentripetalkraft er ikke en egen kraft</em>. Det er bare <em>navnet</em>
          på <em>summen av alle reelle krefter</em> når den summen peker inn mot sirkelens sentrum.
          Her er den reelle kraften snordraget. Jeg velger polare koordinater: radial-aksen (positiv
          <em>inn mot senteret</em>) og tangensial-aksen (langs bevegelsen). Med konstant fart er
          det ingen tangensial akselerasjon; all akselerasjon er radial innover, med størrelse
          <InlineLatex latex="a_c=v^2/R" />.
        </p>
        <Step n={1} title="Hvorfor polare og ikke kartesiske?">
          <p>
            Hadde vi brukt kartesiske x og y, ville <em>både</em> x- og y-komponentene av
            posisjonen (og dermed akselerasjonen) endre seg hele tiden — svært ubeleilig. I polare
            er bildet mye enklere: nettokraft peker hele tiden innover med konstant størrelse,
            og ingenting tangentielt.
          </p>
        </Step>
        <Step n={2} title="Originalformel — Newton 2 i radial retning">
          <FormulaBox latex="\sum F_\text{radial inn} = ma_c = \dfrac{mv^2}{R}" variant="blue" />
          <p>
            Eneste radiale kraft er snordraget (horisontal bane ⇒ tyngden spiller ingen radial
            rolle, den er vertikal). Så:
          </p>
          <FormulaBox latex="T = \dfrac{mv^2}{R}" variant="blue" />
          <p>
            <em>Omforming</em> er trivielt her — selve ligningen er allerede løst for <InlineLatex latex="T" />.
          </p>
        </Step>
        <Step n={3} title="Innsetting og enhetssjekk">
          <FormulaBox latex="T = \dfrac{mv^2}{R} = \dfrac{(0{,}200)(4{,}00)^2}{0{,}500} = \dfrac{3{,}20}{0{,}500}" variant="blue" />
          <FormulaBox latex="\boxed{T = 6{,}40\ \text{N}}" variant="gold" />
          <p>
            <strong>Enhet:</strong> <InlineLatex latex="\text{kg}\cdot(\text{m/s})^2/\text{m} = \text{kg}\cdot\text{m/s}^2 = \text{N}" /> ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Doble farten ⇒ fire ganger så stort drag (kvadratisk!).
          Halver radius ⇒ dobbel kraft. Dette er grunnen til at en slyngel som roterer raskt med
          kort snor føles «tyngre» enn en som roterer sakte på lang snor. For at ballen skulle
          gå i perfekt horisontal sirkel måtte snoren egentlig vært tiltet litt oppover mot senteret
          (konisk pendel — se 5.53), men her forenkler vi.
        </p>
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
        <p>
          <strong>Teori:</strong> Flat sving betyr at veien er horisontal (ingen dosering). De
          eneste horisontale kreftene på bilen er statisk friksjon mellom dekk og vei. Merk:
          her er det <em>statisk</em> friksjon, ikke kinetisk, fordi dekkene <em>ruller</em> uten
          å skli — kontaktpunktet er momentant i ro mot asfalten. Vi bruker polare akser (radial
          inn, tangensial). Sentripetalakselerasjon peker inn mot sirkelens senter, og den må
          leveres av friksjonen. I yttergrensen — «maks fart før bilen sklir» — har friksjonen nådd
          sin maksimale verdi <InlineLatex latex="\mu_s n" />.
        </p>
        <Step n={1} title="Newton 2 vertikalt — finn normalkraften">
          <p>
            Bilen hopper ikke; <InlineLatex latex="\sum F_y=0" />:
          </p>
          <FormulaBox latex="\sum F_y = 0: \quad n - mg = 0 \;\Longrightarrow\; n = mg" variant="blue" />
        </Step>
        <Step n={2} title="Newton 2 radialt — originalformel">
          <p>
            Eneste radiale kraft er friksjonen (innover mot sirkelens senter). Sentripetalbetingelsen:
          </p>
          <FormulaBox latex="\sum F_\text{radial} = \dfrac{mv^2}{R}: \quad f_s = \dfrac{mv^2}{R}" variant="blue" />
          <p>
            Friksjonen er begrenset oppover: <InlineLatex latex="f_s\leq\mu_s n=\mu_s mg" />. Ved
            maks fart er denne begrensningen akkurat truffet:
          </p>
          <FormulaBox latex="\mu_s mg = \dfrac{mv^2_\text{maks}}{R}" variant="blue" />
        </Step>
        <Step n={3} title="Omform — løs for v">
          <p>
            Massen stryker bort fra begge sider (samme grunn som alltid: tyngden setter
            normalkraften, og normalkraften skaleres med m; det høyre leddet har også m i teller):
          </p>
          <FormulaBox latex="\mu_s g = \dfrac{v^2_\text{maks}}{R} \;\Longrightarrow\; v^2_\text{maks} = \mu_s gR" variant="blue" />
          <FormulaBox latex="v_\text{maks} = \sqrt{\mu_s gR}" variant="blue" />
        </Step>
        <Step n={4} title="Innsetting">
          <FormulaBox latex="v_\text{maks} = \sqrt{(0{,}650)(9{,}80)(45{,}0)} = \sqrt{286{,}65}" variant="blue" />
          <FormulaBox latex="\boxed{v_\text{maks} \approx 16{,}9\ \text{m/s} \approx 61\ \text{km/t}}" variant="gold" />
          <p>
            <strong>Enhetssjekk:</strong> <InlineLatex latex="\sqrt{1\cdot(\text{m/s}^2)\cdot\text{m}}=\sqrt{\text{m}^2/\text{s}^2}=\text{m/s}" /> ✓.
          </p>
        </Step>
        <p>
          <strong>Fysisk tolkning:</strong> Massen forsvinner — en truck og en liten sportsbil
          har samme maks fart i samme sving (gitt samme <InlineLatex latex="\mu_s" />). Våt vei
          (<InlineLatex latex="\mu_s=0{,}3" /> istedenfor 0,65) halverer farten omtrent. Doble
          radius gir <InlineLatex latex="\sqrt 2\approx 1{,}41" /> ganger mer fart — derfor er
          motorvei-avkjørsler designet med større radius enn bygate-svinger. Vær også oppmerksom
          på at <em>om bilen skli</em> (kinetisk friksjon), reduseres koeffisienten betraktelig —
          derfor er det livsviktig å ikke bråbremse i sving.
        </p>
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
