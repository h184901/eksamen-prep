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
      <marker id="arrow-red-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-blue-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="arrow-green-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="arrow-amber-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="arrow-purple-k6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#a855f7" />
      </marker>
    </defs>
  );
}

// ============================================================================
// OPPGAVESAMLING — KAPITTEL 6
// ============================================================================

export const exercises: Record<string, ExerciseContent> = {
  // ==========================================================================
  // 6.1 — Skyve bok på bord
  // ==========================================================================
  "6.1": {
    title: "Arbeid fra flere krefter på bok",
    difficulty: "lett",
    pageRef: "s. 198",
    problem: (
      <div className="space-y-2">
        <p>
          Du skyver en fysikkbok 1,50{"\u00A0"}m langs et horisontalt bord med
          en horisontal kraft på 2,40{"\u00A0"}N. Friksjonen motvirker bevegelsen
          med 0,600{"\u00A0"}N. Hvor mye arbeid utfører (a) din kraft, (b)
          friksjonen, (c) normalkraften, (d) gravitasjonen og (e) nettokraften?
        </p>
        <svg viewBox="0 0 360 140" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          {/* floor */}
          <line x1="20" y1="100" x2="340" y2="100" stroke="currentColor" strokeWidth="2" />
          {/* book */}
          <rect x="140" y="70" width="60" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="170" y="90" fontSize="10" textAnchor="middle" fill="#92400e">bok</text>
          {/* push force */}
          <line x1="210" y1="85" x2="260" y2="85" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-blue-k6)" />
          <text x="265" y="82" fontSize="11" fill="#3b82f6">F = 2,40 N</text>
          {/* friction */}
          <line x1="140" y1="85" x2="105" y2="85" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-k6)" />
          <text x="70" y="82" fontSize="11" fill="#ef4444">f = 0,60 N</text>
          {/* displacement */}
          <line x1="170" y1="115" x2="260" y2="115" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-green-k6)" />
          <text x="215" y="130" fontSize="10" fill="#10b981" textAnchor="middle">d = 1,50 m</text>
          {/* weight */}
          <line x1="170" y1="70" x2="170" y2="45" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple-k6)" transform="rotate(180 170 57)" />
          <text x="175" y="40" fontSize="10" fill="#a855f7">mg</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Forskyvning: <InlineLatex latex="d=1{,}50\;\text{m}" /></li>
        <li>Skyvekraft: <InlineLatex latex="F=2{,}40\;\text{N}" /> (horisontal)</li>
        <li>Friksjon: <InlineLatex latex="f=0{,}600\;\text{N}" /></li>
        <li>Bevegelse horisontalt, ingen vertikal bevegelse</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid utført av hver kraft: <InlineLatex latex="W_F,W_f,W_n,W_g,W_\text{tot}" /></li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <p>
          Bruk definisjonen av arbeid utført av en konstant kraft langs en rett
          forskyvning. Vinkelen mellom kraft og forskyvning bestemmer om arbeidet
          er positivt, negativt eller null.
        </p>
        <TheoryBox title="Arbeid utført av en konstant kraft">
          <p>
            Arbeid er skalarproduktet av kraft og forskyvning:
          </p>
          <FormulaBox latex="W = \vec F \cdot \vec s = F\,s\cos\phi" variant="gold" />
          <p className="mt-1">
            <InlineLatex latex="\phi" /> er vinkelen mellom kraftvektoren og
            forskyvningsvektoren. Tre nyttige spesialtilfeller:
          </p>
          <ul className="list-disc pl-5 text-xs mt-1">
            <li><InlineLatex latex="\phi=0^\circ" />: kraft i bevegelsesretning → <InlineLatex latex="W=Fs>0" /></li>
            <li><InlineLatex latex="\phi=180^\circ" />: kraft mot bevegelsen → <InlineLatex latex="W=-Fs<0" /></li>
            <li><InlineLatex latex="\phi=90^\circ" />: kraft vinkelrett på bevegelse → <InlineLatex latex="W=0" /></li>
          </ul>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint 1",
        content: <p>Den horisontale forskyvningen er <InlineLatex latex="s=1{,}50\;\text{m}" />. Alle vertikale krefter står vinkelrett på bevegelsen.</p>,
      },
      {
        label: "Hint 2",
        content: <p>Totalarbeidet kan enten finnes ved summen av alle arbeid, eller ved nettokraften: <InlineLatex latex="W_\text{tot}=F_\text{net}\cdot s" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Arbeid fra skyvekraften (F langs bevegelse)">
          <p><InlineLatex latex="\phi=0^\circ\Rightarrow W_F=Fs\cos 0^\circ=(2{,}40)(1{,}50)=" /> <strong>3,60 J</strong>.</p>
        </Step>
        <Step n={2} title="Arbeid fra friksjon (motvirker bevegelse)">
          <p><InlineLatex latex="\phi=180^\circ\Rightarrow W_f=fs\cos 180^\circ=-(0{,}600)(1{,}50)=" /> <strong>−0,900 J</strong>.</p>
        </Step>
        <Step n={3} title="Arbeid fra normalkraft og tyngdekraft">
          <p>Begge står vinkelrett (<InlineLatex latex="\phi=90^\circ" />) på den horisontale forskyvningen:</p>
          <FormulaBox latex="W_n=W_g=Fs\cos 90^\circ=0" variant="blue" />
        </Step>
        <Step n={4} title="Totalt arbeid">
          <p>Enten summere, eller bruke nettokraften:</p>
          <FormulaBox latex="W_\text{tot}=W_F+W_f+W_n+W_g=3{,}60-0{,}900=\boxed{2{,}70\;\text{J}}" variant="gold" />
          <p className="italic text-xs">Sjekk: nettokraft = <InlineLatex latex="2{,}40-0{,}60=1{,}80\;\text{N}" />, og <InlineLatex latex="1{,}80\cdot 1{,}50=2{,}70\;\text{J}" /> ✓</p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Arbeid skilles fra kraft: bare komponenten <em>langs forskyvningen</em>
        teller. Vertikale krefter på en horisontal bevegelse gjør aldri arbeid.
        Totalarbeidet er lik nettokraft ganger forskyvning.
      </p>
    ),
  },

  // ==========================================================================
  // 6.2 — Tauebilen
  // ==========================================================================
  "6.2": {
    title: "Arbeid fra taukraft under vinkel",
    difficulty: "lett",
    pageRef: "s. 199",
    problem: (
      <div className="space-y-2">
        <p>
          En tauebil trekker en bil 5,00{"\u00A0"}km horisontalt ved hjelp av
          en kabel med strekk 850{"\u00A0"}N. (a) Hvor mye arbeid utfører kabelen
          på bilen hvis den trekker horisontalt? (b) Hvis kabelen er 35° over
          horisontalen? (c) Hvor mye arbeid utfører kabelen på tauebilen i (a)
          og (b)? (d) Hvor mye arbeid utfører tyngdekraften på bilen i (a)?
        </p>
        <svg viewBox="0 0 360 140" className="w-full max-w-md mx-auto block">
          <Arrowheads />
          <line x1="20" y1="100" x2="340" y2="100" stroke="currentColor" strokeWidth="2" />
          {/* tow truck */}
          <rect x="30" y="60" width="70" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="65" y="85" fontSize="10" textAnchor="middle" fill="#1e40af">tauebil</text>
          {/* car */}
          <rect x="230" y="70" width="60" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="260" y="90" fontSize="10" textAnchor="middle" fill="#92400e">bil</text>
          {/* cable at 35 deg */}
          <line x1="100" y1="70" x2="230" y2="82" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
          <line x1="230" y1="82" x2="170" y2="60" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow-red-k6)" />
          <text x="160" y="55" fontSize="10" fill="#ef4444">T=850 N, 35°</text>
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="s=5{,}00\;\text{km}=5000\;\text{m}" /></li>
        <li><InlineLatex latex="T=850\;\text{N}" /></li>
        <li>Vinkler: 0° (a) og 35° (b)</li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Arbeid fra kabelen på bilen i (a) og (b)</li>
        <li>Arbeid fra kabelen på tauebilen</li>
        <li>Arbeid fra tyngdekraften på bilen</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <p>
          Bruk <InlineLatex latex="W=Ts\cos\phi" />. Kabelen utøver motsatt
          rettet kraft på tauebilen (Newtons 3. lov) — men bevegelsen er den
          samme; tegnet på <InlineLatex latex="\cos\phi" /> endrer seg.
        </p>
        <TheoryBox title="Newtons 3. lov og arbeid">
          <p>
            En kabel trekker begge endene mot hverandre med samme strekk{" "}
            <InlineLatex latex="T" />. På tauebilen peker strekket{" "}
            <em>bakover</em> (mot bilen som taues), mens tauebilen beveger seg
            fremover — altså motvirker kabelen bevegelsen til tauebilen.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>På tauebilen er vinkelen 180° (horisontal drag) eller <InlineLatex latex="180^\circ-35^\circ=145^\circ" /> (med vinkel).</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Horisontal kabel på bilen">
          <FormulaBox latex="W=Ts=850\cdot 5000=\boxed{4{,}25\times 10^6\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Kabel 35° over horisontalen">
          <FormulaBox latex="W=Ts\cos 35^\circ=850\cdot 5000\cdot 0{,}8192=\boxed{3{,}48\times 10^6\;\text{J}}" variant="gold" />
          <p className="italic text-xs">Bare den horisontale komponenten utfører arbeid, siden bilen beveger seg horisontalt.</p>
        </Step>
        <Step n={3} title="(c) På tauebilen">
          <p>Kabelen drar tauebilen bakover, men den beveger seg fremover. Altså <InlineLatex latex="\phi=180^\circ" /> i (a) og <InlineLatex latex="145^\circ" /> i (b):</p>
          <FormulaBox latex="W_a=-4{,}25\times 10^6\;\text{J},\quad W_b=-3{,}48\times 10^6\;\text{J}" variant="blue" />
        </Step>
        <Step n={4} title="(d) Tyngdekraften på bilen i (a)">
          <p>Tyngdekraften er vertikal, forskyvningen horisontal → <InlineLatex latex="\phi=90^\circ" />:</p>
          <FormulaBox latex="W_g=mg\cdot s\cdot\cos 90^\circ = 0" variant="blue" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Arbeid fra en ekstern kraft avhenger av <em>vinkelen</em> mellom kraft og
        forskyvning, ikke av hvilken gjenstand som "utfører" kraften. Kabler
        gjør like mye og motsatt arbeid på begge ender (men på ulike objekter
        som flytter seg ulikt).
      </p>
    ),
  },

  // ==========================================================================
  // 6.3 — Skyve kasse med friksjon
  // ==========================================================================
  "6.3": {
    title: "Arbeid på kasse ved konstant hastighet",
    difficulty: "lett",
    pageRef: "s. 199",
    problem: (
      <p>
        En fabrikkarbeider skyver en 30,0{"\u00A0"}kg kasse 4,5{"\u00A0"}m
        langs et horisontalt gulv med konstant hastighet ved å skyve horisontalt.
        Kinetisk friksjonskoeffisient er 0,25. (a) Hvor stor kraft må arbeideren
        bruke? (b) Hvor mye arbeid utfører denne kraften? (c) Hvor mye arbeid
        utfører friksjonen? (d) Normalkraften? Tyngdekraften? (e) Totalt arbeid?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=30{,}0\;\text{kg}" />, <InlineLatex latex="s=4{,}5\;\text{m}" />, <InlineLatex latex="\mu_k=0{,}25" /></li>
        <li>Konstant hastighet: <InlineLatex latex="a=0" /></li>
      </ul>
    ),
    unknowns: <p>Nødvendig kraft og arbeid fra hver enkelt kraft samt totalt arbeid.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Konstant hastighet betyr likevekt (<InlineLatex latex="\sum F=0" />).
          Da balanserer skyvekraften friksjonen helt.
        </p>
        <TheoryBox title="Kinetisk friksjon">
          <FormulaBox latex="f_k=\mu_k\,n" variant="blue" />
          <p>
            Normalkraften <InlineLatex latex="n=mg" /> på vannrett gulv.
            Friksjonen virker <em>motsatt</em> bevegelsen og er{" "}
            <em>uavhengig av hastighet</em> (så lenge objektet glir).
          </p>
        </TheoryBox>
        <TheoryBox title="Hvorfor blir totalarbeid null?">
          <p>
            Fra arbeid-energi-teoremet:{" "}
            <InlineLatex latex="W_\text{tot}=\Delta KE" />. Konstant hastighet{" "}
            ⟹ <InlineLatex latex="\Delta KE=0" /> ⟹{" "}
            <InlineLatex latex="W_\text{tot}=0" />. Dette er en kraftig
            konsistenssjekk!
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Finn først <InlineLatex latex="F=f_k=\mu_k mg" />, så regn ut arbeidene.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Finn kraften">
          <FormulaBox latex="F=\mu_k mg=(0{,}25)(30{,}0)(9{,}80)=\boxed{73{,}5\;\text{N}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Arbeid fra skyvekraften">
          <FormulaBox latex="W_F=Fs=(73{,}5)(4{,}5)=\boxed{331\;\text{J}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Arbeid fra friksjonen">
          <FormulaBox latex="W_f=-fs=-(73{,}5)(4{,}5)=\boxed{-331\;\text{J}}" variant="blue" />
        </Step>
        <Step n={4} title="(d) Normalkraft og tyngdekraft">
          <p>Begge vinkelrett på forskyvningen: <InlineLatex latex="W_n=W_g=0" />.</p>
        </Step>
        <Step n={5} title="(e) Totalt arbeid">
          <p>Summen er 0, som forventet for konstant hastighet:</p>
          <FormulaBox latex="W_\text{tot}=331-331+0+0=\boxed{0\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        "Konstant hastighet" er et kodeord for <InlineLatex latex="\sum F=0" />{" "}
        <em>og</em> <InlineLatex latex="W_\text{tot}=0" />. Individuelle krefter kan gjøre
        mye arbeid, men netto blir null når KE ikke endres.
      </p>
    ),
  },

  // ==========================================================================
  // 6.5 — Maler klatrer opp stige
  // ==========================================================================
  "6.5": {
    title: "Arbeid fra tyngdekraften på maler som klatrer",
    difficulty: "lett",
    pageRef: "s. 199",
    problem: (
      <div className="space-y-2">
        <p>
          En 75,0{"\u00A0"}kg maler klatrer opp en 2,75{"\u00A0"}m stige som
          lener seg mot en vertikal vegg. Stigen danner 30,0° med veggen. (a)
          Hvor mye arbeid utfører tyngdekraften på maleren? (b) Avhenger svaret
          av om han klatrer med konstant fart eller akselererer?
        </p>
        <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto block">
          <Arrowheads />
          {/* floor & wall */}
          <line x1="20" y1="180" x2="260" y2="180" stroke="currentColor" strokeWidth="2" />
          <line x1="220" y1="180" x2="220" y2="40" stroke="currentColor" strokeWidth="2" />
          {/* ladder */}
          <line x1="70" y1="180" x2="220" y2="50" stroke="#f59e0b" strokeWidth="3" />
          <text x="115" y="110" fontSize="10" fill="#f59e0b">L=2,75 m</text>
          {/* height */}
          <line x1="215" y1="180" x2="215" y2="50" stroke="#10b981" strokeWidth="1" strokeDasharray="4" />
          <text x="235" y="120" fontSize="10" fill="#10b981">h</text>
          {/* angle at top */}
          <text x="200" y="65" fontSize="10" fill="#3b82f6">30°</text>
          {/* painter */}
          <circle cx="140" cy="120" r="6" fill="#a855f7" />
        </svg>
      </div>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=75{,}0\;\text{kg}" />, <InlineLatex latex="L=2{,}75\;\text{m}" /></li>
        <li>Vinkel mellom stigen og veggen: 30°</li>
      </ul>
    ),
    unknowns: <p>Arbeid utført av tyngdekraften under hele oppstigningen.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Tyngdekraften gir bare arbeid gjennom vertikal forskyvning. Stigen er
          2,75 m lang og danner 30° med veggen (altså 60° med gulvet), så
          høydeforskjellen er <InlineLatex latex="h=L\cos 30^\circ" />.
        </p>
        <TheoryBox title="Arbeid av tyngdekraften — kun vertikal forskyvning teller">
          <p>
            For en vertikal forskyvning <InlineLatex latex="\Delta y" /> (positivt
            oppover):
          </p>
          <FormulaBox latex="W_g=-mg\,\Delta y" variant="gold" />
          <p className="mt-1">
            Minus fordi gravitasjonen peker nedover, mens forskyvningen er
            oppover. Dette er en <em>konservativ kraft</em> — arbeidet
            avhenger bare av endepunktene, ikke av banen eller farten.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      {
        label: "Hint",
        content: <p>Vinkelen mellom stigen og <em>veggen</em> er 30°. Vertikal komponent av forskyvningen: <InlineLatex latex="L\cos 30^\circ" />.</p>,
      },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Finn høydeendringen">
          <FormulaBox latex="\Delta y=L\cos 30^\circ=(2{,}75)(0{,}866)=2{,}382\;\text{m}" variant="blue" />
        </Step>
        <Step n={2} title="Arbeid av tyngdekraften">
          <FormulaBox latex="W_g=-mg\,\Delta y=-(75{,}0)(9{,}80)(2{,}382)=\boxed{-1{,}75\times 10^3\;\text{J}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Avhengighet av bevegelsesmåte">
          <p>
            <strong>Nei.</strong> Arbeidet fra tyngdekraften er{" "}
            <em>konservativt</em> og avhenger kun av endringen i høyde. Om
            maleren skynder seg eller tar det sakte, er{" "}
            <InlineLatex latex="W_g" /> det samme.
          </p>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Gravitasjonen er en konservativ kraft —{" "}
        <InlineLatex latex="W_g=-mg\,\Delta y" /> uavhengig av fart eller sti.
        Dette blir sentralt i kapittel 7 (potensiell energi).
      </p>
    ),
  },

  // ==========================================================================
  // 6.6 — To taubåter
  // ==========================================================================
  "6.6": {
    title: "To taubåter trekker supertanker",
    difficulty: "middels",
    pageRef: "s. 199",
    problem: (
      <p>
        To taubåter trekker en skadet supertanker. Hver båt utøver en konstant
        kraft på 1,80 × 10⁶ N — den ene 14° vest for nord, den andre 14° øst
        for nord — mens de trekker tankeren 0,75 km rett nord. Hva er det
        totale arbeidet de utfører på tankeren?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F_1=F_2=1{,}80\times 10^6\;\text{N}" />, begge 14° fra nord</li>
        <li><InlineLatex latex="s=750\;\text{m}" /> nord</li>
      </ul>
    ),
    unknowns: <p>Totalt arbeid fra begge båter.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Bevegelsen er rett nord. Øst/vest-komponentene av kraftene kansellerer
          hverandre, nord-komponentene legger seg sammen.
        </p>
        <TheoryBox title="Arbeid er skalart — summér enten krefter eller arbeid">
          <p>To ekvivalente strategier:</p>
          <ul className="list-disc pl-5">
            <li>Finn nettokraften i bevegelsesretningen, multipliser med s.</li>
            <li>Regn ut arbeidet fra hver kraft separat, summer.</li>
          </ul>
          <p>Begge gir samme svar siden arbeid er en skalar.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk <InlineLatex latex="W=Fs\cos 14^\circ" /> for hver båt, eller nettokraft.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Arbeid per båt">
          <FormulaBox latex="W_i=F\,s\cos 14^\circ=(1{,}80\times 10^6)(750)(0{,}9703)=1{,}310\times 10^9\;\text{J}" variant="blue" />
        </Step>
        <Step n={2} title="Totalt">
          <FormulaBox latex="W_\text{tot}=2W_i=\boxed{2{,}62\times 10^9\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Når kun én retning er interessant, bidrar bare den komponenten som er{" "}
        <em>langs</em> forskyvningen. Vinkelrette komponenter gir ingen arbeid.
      </p>
    ),
  },

  // ==========================================================================
  // 6.8 — Skyve skrått nedover
  // ==========================================================================
  "6.8": {
    title: "Kassa skjøvet ned skrått — effekt på friksjon",
    difficulty: "middels",
    pageRef: "s. 199",
    problem: (
      <p>
        Samme oppgave som 6.3, men arbeideren skyver 30° <em>under</em> horisontalen
        (nedover inn i gulvet). (a) Hvilken kraft trengs nå for konstant
        hastighet? (b) Hvor mye arbeid utfører denne kraften over 4,5 m?
        (c) Friksjonen? (d) Normalkraft og tyngdekraft? (e) Totalt?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=30{,}0\;\text{kg}" />, <InlineLatex latex="\mu_k=0{,}25" />, <InlineLatex latex="s=4{,}5\;\text{m}" /></li>
        <li>Kraften peker 30° under horisontal</li>
        <li>Konstant hastighet</li>
      </ul>
    ),
    unknowns: <p>Kraften og alle arbeid.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Når du skyver <em>nedover</em>, øker normalkraften fordi den vertikale
          komponenten av skyvekraften presser ekstra mot gulvet. Da øker også
          friksjonen → større kraft kreves.
        </p>
        <TheoryBox title="Normalkraft endrer seg når kraft har vertikal komponent">
          <p>Newton i y-retning (ingen vertikal bevegelse):</p>
          <FormulaBox latex="n=mg+F\sin\theta" variant="blue" />
          <p>der <InlineLatex latex="\theta" /> er vinkelen under horisontalen. Så:</p>
          <FormulaBox latex="f_k=\mu_k n=\mu_k(mg+F\sin\theta)" variant="blue" />
          <p className="mt-1">
            Konstant hastighet i x: <InlineLatex latex="F\cos\theta=f_k" />. Løs
            for <InlineLatex latex="F" />.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Skriv opp Newtons 2. lov i begge retninger, med <InlineLatex latex="a=0" />.</p> },
      { label: "Hint 2", content: <p>Løs for F fra <InlineLatex latex="F\cos\theta=\mu_k(mg+F\sin\theta)" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Finn skyvekraften">
          <p>Fra x-ligningen og y-ligningen:</p>
          <FormulaBox latex="F=\frac{\mu_k mg}{\cos\theta-\mu_k\sin\theta}" variant="blue" />
          <FormulaBox latex="F=\frac{(0{,}25)(30{,}0)(9{,}80)}{0{,}866-(0{,}25)(0{,}500)}=\frac{73{,}5}{0{,}741}=\boxed{99{,}2\;\text{N}}" variant="gold" />
          <p className="italic text-xs">Større enn 73,5 N i 6.3 — pga økt friksjon fra økt normalkraft.</p>
        </Step>
        <Step n={2} title="(b) Arbeid fra skyvekraften">
          <FormulaBox latex="W_F=Fs\cos 30^\circ=(99{,}2)(4{,}5)(0{,}866)=\boxed{386\;\text{J}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Arbeid fra friksjon">
          <FormulaBox latex="W_f=-f_k s=-(F\cos\theta)s=-(99{,}2)(0{,}866)(4{,}5)=\boxed{-386\;\text{J}}" variant="blue" />
          <p className="italic text-xs">Like stort som skyvekraftens arbeid (bare horisontal komponent), med motsatt fortegn.</p>
        </Step>
        <Step n={4} title="(d) Normalkraft og tyngdekraft">
          <p>Begge vinkelrett på forskyvningen, altså null arbeid.</p>
        </Step>
        <Step n={5} title="(e) Totalt arbeid">
          <FormulaBox latex="W_\text{tot}=386-386=\boxed{0\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Skyv skrått nedover → press ekstra mot gulvet → mer friksjon → mer kraft
        kreves. Lærdom: <em>vinkelen på kraften påvirker normalkraften</em> og
        dermed friksjonen.
      </p>
    ),
  },

  // ==========================================================================
  // 6.19 — Glidende bok (arbeid-energi)
  // ==========================================================================
  "6.19": {
    title: "Arbeid-energi på glidende bok",
    difficulty: "lett",
    pageRef: "s. 200",
    problem: (
      <p>
        En 1,50{"\u00A0"}kg bok glir langs en ru horisontal flate. I punkt A
        har den farten 3,21 m/s, i punkt B er den nede i 1,25 m/s. (a) Hvor
        mye arbeid ble gjort på boken fra A til B? (b) Dersom −0,750 J gjøres
        fra B til C, hva er farten ved C? (c) Hva om det gjøres +0,750 J?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1{,}50\;\text{kg}" /></li>
        <li><InlineLatex latex="v_A=3{,}21\;\text{m/s},\; v_B=1{,}25\;\text{m/s}" /></li>
        <li>Arbeid B→C: ±0,750 J</li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="W_{A\to B},\;v_C" /> i begge deloppgaver.</p>,
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid-energi-teoremet">
          <p>
            Nettoarbeidet på et objekt er lik endringen i kinetisk energi:
          </p>
          <FormulaBox latex="W_\text{tot}=\Delta KE = \tfrac12 m v_f^2 - \tfrac12 m v_i^2" variant="gold" />
          <p className="mt-1">
            Dette er det mest brukbare verktøyet i kapittel 6 — når du vet to av
            tre størrelser (<InlineLatex latex="v_i,v_f,W" />), finner du den
            tredje direkte.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>(b) + (c): <InlineLatex latex="W_{BC}=\tfrac12 m v_C^2-\tfrac12 m v_B^2" />, løs for <InlineLatex latex="v_C" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Arbeid A → B">
          <FormulaBox latex="W_{AB}=\tfrac12(1{,}50)[(1{,}25)^2-(3{,}21)^2]=\tfrac12(1{,}50)(1{,}5625-10{,}304)=\boxed{-6{,}56\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) B → C med −0,750 J">
          <FormulaBox latex="v_C=\sqrt{v_B^2+\tfrac{2W_{BC}}{m}}=\sqrt{1{,}5625+\tfrac{-1{,}50}{1{,}50}}=\sqrt{0{,}5625}=\boxed{0{,}750\;\text{m/s}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) B → C med +0,750 J">
          <FormulaBox latex="v_C=\sqrt{1{,}5625+1{,}00}=\sqrt{2{,}5625}=\boxed{1{,}60\;\text{m/s}}" variant="blue" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Arbeid-energi-teoremet lar deg hoppe over kinematikk når du ikke
        bryr deg om tid eller forskyvning — bare energi-balansen teller.
      </p>
    ),
  },

  // ==========================================================================
  // 6.20 — Spark på fotball
  // ==========================================================================
  "6.20": {
    title: "Kontaktavstand for fotballspark",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        En 0,420{"\u00A0"}kg fotball er i utgangspunktet i fart 2,00 m/s. En
        spiller sparker ballen med en konstant kraft på 40,0 N i samme retning
        som ballen beveger seg. Over hvor stor avstand må foten være i kontakt
        med ballen for at farten skal øke til 6,00 m/s?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=0{,}420\;\text{kg}" /></li>
        <li><InlineLatex latex="v_i=2{,}00\;\text{m/s},\;v_f=6{,}00\;\text{m/s}" /></li>
        <li><InlineLatex latex="F=40{,}0\;\text{N}" /> i bevegelsesretningen</li>
      </ul>
    ),
    unknowns: <p>Avstand <InlineLatex latex="d" /> som foten er i kontakt med ballen.</p>,
    strategy: (
      <p>
        Arbeid-energi direkte: <InlineLatex latex="Fd=\Delta KE" />, siden F
        og forskyvning er i samme retning.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Løs <InlineLatex latex="d=\Delta KE/F" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Endring i kinetisk energi">
          <FormulaBox latex="\Delta KE=\tfrac12(0{,}420)(6^2-2^2)=\tfrac12(0{,}420)(32)=6{,}72\;\text{J}" variant="blue" />
        </Step>
        <Step n={2} title="Avstand">
          <FormulaBox latex="d=\frac{\Delta KE}{F}=\frac{6{,}72}{40{,}0}=\boxed{0{,}168\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Kort kontaktavstand kan levere stor fart-endring med en stor kraft — og vice versa.</p>,
  },

  // ==========================================================================
  // 6.24 — Geparden
  // ==========================================================================
  "6.24": {
    title: "Kinetisk energi av gepard",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        Voksne geparder, de raskeste av de store kattene, har masse ca 70{"\u00A0"}kg
        og er målt til opptil 32 m/s. (a) Hvor mange joule er den kinetiske
        energien til en slik gepard? (b) Med hvilken faktor vil KE endre seg
        om farten ble doblet?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=70\;\text{kg},\;v=32\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>KE og skaleringsfaktor ved doblet fart.</p>,
    strategy: (
      <TheoryBox title="KE er kvadratisk i fart">
        <FormulaBox latex="KE=\tfrac12 mv^2" variant="gold" />
        <p>
          Hvis farten dobles blir KE{" "}
          <InlineLatex latex="2^2=4" /> ganger så stor. Hvis farten tredobles,
          blir KE ni ganger så stor. Dette er hvorfor fartsgrenser reduserer
          kollisjonsskader dramatisk.
        </p>
      </TheoryBox>
    ),
    hints: [{ label: "Hint", content: <p>Sett bare inn tallene.</p> }],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Kinetisk energi">
          <FormulaBox latex="KE=\tfrac12(70)(32)^2=\tfrac12(70)(1024)=\boxed{3{,}58\times 10^4\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Dobling av fart">
          <p>
            <InlineLatex latex="KE'=\tfrac12 m(2v)^2=4\cdot\tfrac12 mv^2=4\,KE" />.
            <strong> Faktor 4</strong>.
          </p>
        </Step>
      </div>
    ),
    summary: <p>Dobler du farten, firedobles den kinetiske energien — en praktisk intuisjon.</p>,
  },

  // ==========================================================================
  // 6.25 — Typiske kinetiske energier
  // ==========================================================================
  "6.25": {
    title: "Sammenligning av kinetiske energier",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <div className="space-y-2">
        <p>Regn ut kinetisk energi av:</p>
        <ul className="list-disc pl-5">
          <li>(a) Elektron i hydrogenatomet: <InlineLatex latex="m=9{,}11\times 10^{-31}\;\text{kg},\;v=2{,}2\times 10^6\;\text{m/s}" /></li>
          <li>(b) Jogger: <InlineLatex latex="m=55\;\text{kg},\;v=7{,}5\;\text{km/t}" /></li>
          <li>(c) Tennisball: <InlineLatex latex="m=57\;\text{g},\;v=36\;\text{m/s}" /></li>
        </ul>
      </div>
    ),
    knowns: <p>Se oppgaveteksten.</p>,
    unknowns: <p>KE i hver deloppgave.</p>,
    strategy: (
      <p>
        Bruk <InlineLatex latex="KE=\tfrac12 mv^2" /> etter konvertering til
        SI-enheter (m/s og kg).
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>7,5 km/t = 2,083 m/s; 57 g = 0,057 kg.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Elektron">
          <FormulaBox latex="KE=\tfrac12(9{,}11\times 10^{-31})(2{,}2\times 10^6)^2=\boxed{2{,}2\times 10^{-18}\;\text{J}}" variant="blue" />
        </Step>
        <Step n={2} title="(b) Jogger">
          <FormulaBox latex="KE=\tfrac12(55)(2{,}083)^2=\boxed{119\;\text{J}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Tennisball">
          <FormulaBox latex="KE=\tfrac12(0{,}057)(36)^2=\boxed{36{,}9\;\text{J}}" variant="blue" />
        </Step>
      </div>
    ),
    summary: <p>Få følelse for typiske KE-størrelser: atomer har ~10⁻¹⁸ J, menneskelige skalaer ~10²–10³ J.</p>,
  },

  // ==========================================================================
  // 6.26 — Meteorkrater
  // ==========================================================================
  "6.26": {
    title: "Energien fra Meteor Crater",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        For ca 50 000 år siden traff en meteor jorden ved dagens Flagstaff,
        Arizona. Anslag fra 2005: masse <InlineLatex latex="1{,}4\times 10^8\;\text{kg}" />, fart 12 km/s.
        (a) Hvor mye KE traff bakken? (b) Hvordan sammenligner det med en 1,0
        megatonn atombombe? (1 tonn TNT = <InlineLatex latex="4{,}184\times 10^9\;\text{J}" />)
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1{,}4\times 10^8\;\text{kg},\;v=1{,}2\times 10^4\;\text{m/s}" /></li>
        <li>1 megatonn TNT = <InlineLatex latex="10^6\times 4{,}184\times 10^9=4{,}184\times 10^{15}\;\text{J}" /></li>
      </ul>
    ),
    unknowns: <p>KE og ratio til 1 megatonn bombe.</p>,
    strategy: <p>Regn ut KE, deriver ratio.</p>,
    hints: [{ label: "Hint", content: <p>Hold styr på eksponenter.</p> }],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) KE">
          <FormulaBox latex="KE=\tfrac12(1{,}4\times 10^8)(1{,}2\times 10^4)^2=\boxed{1{,}01\times 10^{16}\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Ratio">
          <FormulaBox latex="\frac{KE}{E_\text{1MT}}=\frac{1{,}01\times 10^{16}}{4{,}184\times 10^{15}}\approx\boxed{2{,}4}" variant="blue" />
          <p>Altså ca 2,4 megatonn — mer enn dobbelt så mye som en 1 MT-bombe.</p>
        </Step>
      </div>
    ),
    summary: <p>Store masser × høy fart gir enorm KE — meteornedslag er atomvåpenlignende i energi.</p>,
  },

  // ==========================================================================
  // 6.28 — Vannmelon fra tak
  // ==========================================================================
  "6.28": {
    title: "Vannmelon i fritt fall",
    difficulty: "lett",
    pageRef: "s. 201",
    problem: (
      <p>
        En 4,80 kg vannmelon slippes fra toppen av en 25,0 m høy bygning og
        er i tilnærmet fritt fall. (a) Arbeid av gravitasjonen? (b) Like før
        den treffer: (i) KE, (ii) fart? (c) Hvilke deler ville endret seg med
        luftmotstand?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=4{,}80\;\text{kg},\;h=25{,}0\;\text{m}" /></li>
        <li><InlineLatex latex="v_0=0" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="W_g,\;KE_f,\;v_f" /></p>,
    strategy: (
      <p>
        Bare gravitasjonen arbeider (uten luftmotstand). Bruk arbeid-energi:{" "}
        <InlineLatex latex="W_g=\Delta KE" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="W_g=mgh" /> (positivt siden kraft og forskyvning er ned).</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Arbeid av gravitasjon">
          <FormulaBox latex="W_g=mgh=(4{,}80)(9{,}80)(25{,}0)=\boxed{1180\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) KE og fart ved bakken">
          <FormulaBox latex="KE_f=W_g=1180\;\text{J}" variant="blue" />
          <FormulaBox latex="v_f=\sqrt{2gh}=\sqrt{2(9{,}80)(25)}=\boxed{22{,}1\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={3} title="(c) Med luftmotstand">
          <p>
            KE og fart blir <em>mindre</em> fordi luften gjør negativt arbeid.
            Arbeidet av tyngdekraften er <em>uendret</em> — det avhenger bare
            av høydeforskjellen.
          </p>
        </Step>
      </div>
    ),
    summary: <p>I fritt fall: hele <InlineLatex latex="mgh" /> blir til KE. Luftmotstand "stjeler" energi og reduserer farten.</p>,
  },

  // ==========================================================================
  // 6.31 — Stoppedistanse (utledning)
  // ==========================================================================
  "6.31": {
    title: "Utledning av bremselengde",
    difficulty: "middels",
    pageRef: "s. 201",
    problem: (
      <p>
        En bil kjører på flat vei med fart <InlineLatex latex="v_0" /> når
        bremsene låser seg. Dekkene glir. (a) Bruk arbeid-energi til å finne
        bremselengden i form av <InlineLatex latex="v_0,g,\mu_k" />. (b) Faktoren
        bremselengden endrer seg med hvis: (i) <InlineLatex latex="\mu_k" />{" "}
        dobles, (ii) <InlineLatex latex="v_0" /> dobles, (iii) begge dobles.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Fart ved låsing: <InlineLatex latex="v_0" /></li>
        <li>Kinetisk friksjonskoeffisient: <InlineLatex latex="\mu_k" /></li>
      </ul>
    ),
    unknowns: <p>Minimum bremselengde <InlineLatex latex="d" /> og skaleringsfaktorer.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Eneste kraft som gjør arbeid er kinetisk friksjon. Bilen starter med
          KE og stopper (KE = 0), så <InlineLatex latex="W_f=-\Delta KE" />.
        </p>
        <TheoryBox title="Utledning">
          <p>
            Normalkraft på flat vei: <InlineLatex latex="n=mg" />. Kinetisk
            friksjon: <InlineLatex latex="f=\mu_k mg" />. Friksjonen motvirker
            bevegelsen, så:
          </p>
          <FormulaBox latex="W_f=-f\,d=-\mu_k m g\,d" variant="blue" />
          <p>Arbeid-energi: <InlineLatex latex="W_f=0-\tfrac12 m v_0^2" />, altså:</p>
          <FormulaBox latex="-\mu_k m g\,d = -\tfrac12 m v_0^2 \;\Rightarrow\; d=\frac{v_0^2}{2\mu_k g}" variant="gold" />
          <p className="mt-1 italic">
            Legg merke til: massen <em>faller ut</em>! En buss og en bil har
            samme bremselengde (med samme <InlineLatex latex="\mu_k" />). Farten
            går i <em>kvadratet</em> — dette er grunnen til at høy fart er så
            farlig.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk kun friksjonsarbeid; normalkraft og tyngdekraft står vinkelrett på bevegelsen.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Formel">
          <FormulaBox latex="\boxed{d=\frac{v_0^2}{2\mu_k g}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Skaleringsfaktorer">
          <ul className="list-disc pl-5">
            <li>(i) <InlineLatex latex="\mu_k\to 2\mu_k" />: <InlineLatex latex="d\to d/2" /> (halvparten).</li>
            <li>(ii) <InlineLatex latex="v_0\to 2v_0" />: <InlineLatex latex="d\to 4d" /> (firedobles).</li>
            <li>(iii) Begge dobles: <InlineLatex latex="d\to \tfrac{4}{2}d=2d" /> (dobles).</li>
          </ul>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Bremselengde <em>skalerer kvadratisk med fart</em> og lineært (invers)
        med friksjon. Ett av fysikkens viktigste trafikkprinsipper.
      </p>
    ),
  },

  // ==========================================================================
  // 6.32 — Leg press (fjær)
  // ==========================================================================
  "6.32": {
    title: "Arbeid på fjær — leg press",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <p>
        På treningen presser du mot en plattform som komprimerer to parallelle
        fjærer. Du utfører 80,0 J når du komprimerer fjærene 0,200 m fra
        ukomprimert lengde. (a) Hvor stor kraft må du holde i denne posisjonen?
        (b) Hvor mye mer arbeid må du gjøre for å komprimere 0,200 m til, og
        hvilken maksimal kraft må du utøve?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="W_1=80{,}0\;\text{J}" /> for <InlineLatex latex="x_1=0{,}200\;\text{m}" /></li>
        <li>Totale fjærer virker med effektiv konstant <InlineLatex latex="k" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="F" /> i <InlineLatex latex="x=0{,}200\;\text{m}" /></li>
        <li>Ekstraarbeid til <InlineLatex latex="x=0{,}400\;\text{m}" />, og maksimal kraft</li>
      </ul>
    ),
    strategy: (
      <div className="space-y-2">
        <TheoryBox title="Arbeid på ideell fjær (Hookes lov)">
          <p>Kraften fra fjæren er <InlineLatex latex="F=kx" /> (restkraft). For å komprimere brukeren må levere arbeid:</p>
          <FormulaBox latex="W=\int_0^x F\,dx=\int_0^x k x'\,dx'=\tfrac12 k x^2" variant="gold" />
          <p className="mt-1">
            Arbeidet er <em>kvadratisk</em> i forskyvning — dobler du
            kompresjonen, firedobler du den lagrede energien, men
            <em> trenger dobbelt så mye kraft ved endepunktet</em>.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint 1", content: <p>Finn <InlineLatex latex="k" /> fra <InlineLatex latex="W_1=\tfrac12 k x_1^2" />.</p> },
      { label: "Hint 2", content: <p>Ekstraarbeid: <InlineLatex latex="\tfrac12 k(x_2^2-x_1^2)" /> med <InlineLatex latex="x_2=0{,}400" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Finn fjærkonstanten">
          <FormulaBox latex="k=\frac{2W_1}{x_1^2}=\frac{2(80)}{(0{,}200)^2}=4000\;\text{N/m}" variant="blue" />
        </Step>
        <Step n={2} title="(a) Kraft ved x = 0,200 m">
          <FormulaBox latex="F_1=kx_1=(4000)(0{,}200)=\boxed{800\;\text{N}}" variant="gold" />
        </Step>
        <Step n={3} title="(b) Ekstraarbeid til x = 0,400 m">
          <FormulaBox latex="W_\text{ekstra}=\tfrac12 k(x_2^2-x_1^2)=\tfrac12(4000)(0{,}16-0{,}04)=\boxed{240\;\text{J}}" variant="gold" />
        </Step>
        <Step n={4} title="Maksimal kraft">
          <FormulaBox latex="F_\text{max}=kx_2=(4000)(0{,}400)=\boxed{1600\;\text{N}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Fjærarbeid er kvadratisk: de siste 20 cm krever <em>tre ganger</em>{" "}
        mer arbeid enn de første 20 cm. Bruk <InlineLatex latex="W=\tfrac12 kx^2" /> og Hookes
        lov direkte.
      </p>
    ),
  },

  // ==========================================================================
  // 6.33 — Tre masser på fjærer
  // ==========================================================================
  "6.33": {
    title: "Tre masser hengt fra fjærer",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <p>
        Tre identiske 8,50 kg masser henger i tre identiske fjærer stablet
        vertikalt over hverandre. Hver fjær har <InlineLatex latex="k=7{,}80\;\text{kN/m}" />{" "}
        og naturlig lengde 12,0 cm. Hvor lange blir fjærene nå?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=8{,}50\;\text{kg}" />, tre stk</li>
        <li><InlineLatex latex="k=7800\;\text{N/m}" />, naturlig lengde 0,120 m</li>
      </ul>
    ),
    unknowns: <p>Lengden til hver fjær i likevekt.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Isoler hver fjær: strekket i en fjær er lik vekten av alt som henger
          under den. Så lengden er <InlineLatex latex="L_0+kx/k=L_0+F/k" /> der{" "}
          <InlineLatex latex="F" /> er last.
        </p>
        <TheoryBox title="Hookes lov for fjærstrekk">
          <FormulaBox latex="F=k\Delta L\;\Rightarrow\;\Delta L=F/k" variant="blue" />
          <p>
            Kritisk innsikt: <em>hver fjær bærer forskjellig last</em>. Den
            nederste bærer bare én masse; den øverste bærer tre.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Sjekk: øverste fjær bærer tre masser, nederste bærer én.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Last og strekk pr. fjær">
          <p>Nederste: <InlineLatex latex="F_3=mg=(8{,}50)(9{,}80)=83{,}3\;\text{N}" />.</p>
          <p>Midterste: <InlineLatex latex="F_2=2mg=166{,}6\;\text{N}" />.</p>
          <p>Øverste: <InlineLatex latex="F_1=3mg=249{,}9\;\text{N}" />.</p>
        </Step>
        <Step n={2} title="Strekk og lengder">
          <FormulaBox latex="\Delta L_i=F_i/k,\quad L_i=0{,}120+\Delta L_i" variant="blue" />
          <ul className="list-disc pl-5">
            <li>Nederste: <InlineLatex latex="0{,}120+83{,}3/7800=\boxed{0{,}131\;\text{m}}" /></li>
            <li>Midterste: <InlineLatex latex="0{,}120+166{,}6/7800=\boxed{0{,}141\;\text{m}}" /></li>
            <li>Øverste: <InlineLatex latex="0{,}120+249{,}9/7800=\boxed{0{,}152\;\text{m}}" /></li>
          </ul>
        </Step>
      </div>
    ),
    summary: (
      <p>
        Øverste fjær strekkes mest siden den bærer hele stabelen.
        Problemløsningsteknikken: isoler én bit om gangen nedenfra, eller
        start som system — likeverdige svar.
      </p>
    ),
  },

  // ==========================================================================
  // 6.34 — Variabel kraft, graf
  // ==========================================================================
  "6.34": {
    title: "Arbeid fra variabel kraft (graf)",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <div className="space-y-2">
        <p>
          Et barn trekker en 10,0 kg slede på is med en kraft parallell med
          x-aksen. Grafen viser <InlineLatex latex="F_x(x)" />: 10 N fra 0 til
          8 m, lineær nedgang til 0 ved 12 m. Finn arbeidet når sleden beveger
          seg (a) 0–8 m, (b) 8–12 m, (c) 0–12 m.
        </p>
        <svg viewBox="0 0 320 160" className="w-full max-w-sm mx-auto block">
          <Arrowheads />
          <line x1="30" y1="130" x2="300" y2="130" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="130" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <text x="310" y="135" fontSize="10">x (m)</text>
          <text x="10" y="25" fontSize="10">F (N)</text>
          {/* F = 10 from 0..8 */}
          <line x1="30" y1="50" x2="190" y2="50" stroke="#3b82f6" strokeWidth="2.5" />
          {/* linear down to 0 at x=12 */}
          <line x1="190" y1="50" x2="270" y2="130" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="100" y="45" fontSize="10" fill="#3b82f6">F=10 N</text>
          <text x="30" y="145" fontSize="9">0</text>
          <text x="190" y="145" fontSize="9">8</text>
          <text x="270" y="145" fontSize="9">12</text>
          <text x="25" y="54" fontSize="9">10</text>
        </svg>
      </div>
    ),
    knowns: <p>Grafen over.</p>,
    unknowns: <p>Arbeidet i hvert intervall og totalt.</p>,
    strategy: (
      <TheoryBox title="Arbeid = arealet under F-x-kurven">
        <FormulaBox latex="W=\int_{x_1}^{x_2}F_x(x)\,dx" variant="gold" />
        <p>
          Geometrisk tolkning: areal under F-x-grafen. Rektangler, trekanter
          og trapeser gir raske løsninger uten integrasjon.
        </p>
      </TheoryBox>
    ),
    hints: [
      { label: "Hint", content: <p>0–8 m: rektangel. 8–12 m: trekant med høyde 10 og bredde 4.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) 0 til 8 m">
          <FormulaBox latex="W_a=(10)(8)=\boxed{80\;\text{J}}" variant="blue" />
        </Step>
        <Step n={2} title="(b) 8 til 12 m">
          <FormulaBox latex="W_b=\tfrac12(4)(10)=\boxed{20\;\text{J}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) 0 til 12 m">
          <FormulaBox latex="W_c=W_a+W_b=\boxed{100\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        For variable krefter: arbeid = areal under F-x-grafen. Ofte kan
        du slippe unna integrasjon med enkel geometri.
      </p>
    ),
  },

  // ==========================================================================
  // 6.37 — Boks inn i fjær
  // ==========================================================================
  "6.37": {
    title: "Boks presses mot fjær — maks kompresjon",
    difficulty: "middels",
    pageRef: "s. 202",
    problem: (
      <p>
        En 6,0 kg boks med fart 3,0 m/s på en glatt horisontal flate støter
        inn i en lett fjær med <InlineLatex latex="k=75\;\text{N/cm}=7500\;\text{N/m}" />.
        Bruk arbeid-energi til å finne maksimal kompresjon.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=6{,}0\;\text{kg},\;v=3{,}0\;\text{m/s}" /></li>
        <li><InlineLatex latex="k=7500\;\text{N/m}" />, glatt flate</li>
      </ul>
    ),
    unknowns: <p>Maksimal kompresjon <InlineLatex latex="x_\text{max}" />.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Ved maksimal kompresjon er boksen i ro et øyeblikk. All KE er
          "omgjort" til fjærarbeid.
        </p>
        <TheoryBox title="Energibevaring i fjær">
          <p>Arbeid-energi med bare fjær som gjør arbeid:</p>
          <FormulaBox latex="\tfrac12 mv^2=\tfrac12 k x_\text{max}^2\;\Rightarrow\;x_\text{max}=v\sqrt{\frac{m}{k}}" variant="gold" />
          <p className="mt-1">
            Denne formelen ser vi igjen i harmoniske svingninger — det er samme
            fysikk.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [{ label: "Hint", content: <p>Sett <InlineLatex latex="KE_i=\tfrac12 k x^2" />.</p> }],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Energiligning">
          <FormulaBox latex="\tfrac12(6{,}0)(3{,}0)^2=\tfrac12(7500)x^2\;\Rightarrow\; 27=3750x^2" variant="blue" />
        </Step>
        <Step n={2} title="Løs for kompresjonen">
          <FormulaBox latex="x=\sqrt{27/3750}=\sqrt{0{,}0072}=\boxed{0{,}0849\;\text{m}=8{,}49\;\text{cm}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Energibevaring på ideell fjær: KE ↔ fjærarbeid. Glatt flate lar hele KE gå til fjæren.</p>,
  },

  // ==========================================================================
  // 6.44 — Bil med variabel F
  // ==========================================================================
  "6.44": {
    title: "Fart av modellbil med F(x)",
    difficulty: "middels",
    pageRef: "s. 203",
    problem: (
      <p>
        En 2,0 kg modellbil starter i ro ved <InlineLatex latex="x=0" />.
        Nettokraften er gitt ved <InlineLatex latex="F(x)=k_1 x" /> med{" "}
        <InlineLatex latex="k_1=0{,}5\;\text{N/m}" /> for <InlineLatex latex="0\le x\le 4" />{" "}
        m, og deretter konstant <InlineLatex latex="F=2{,}0\;\text{N}" /> fra{" "}
        <InlineLatex latex="x=4" /> til <InlineLatex latex="x=7\;\text{m}" />.
        Finn farten ved (a) <InlineLatex latex="x=3\;\text{m}" />, (b){" "}
        <InlineLatex latex="x=4\;\text{m}" />, (c) <InlineLatex latex="x=7\;\text{m}" />.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}0\;\text{kg},\;v_0=0" /></li>
        <li>Nettokraft F(x) variabel</li>
      </ul>
    ),
    unknowns: <p>Fart på tre punkter.</p>,
    strategy: (
      <p>
        Arbeid-energi: <InlineLatex latex="\tfrac12 mv^2=\int_0^x F\,dx'" /> fra{" "}
        0. Bruk passende integraler eller arealberegning.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>For <InlineLatex latex="0..x\;(x<4)" />: areal av trekant <InlineLatex latex="\tfrac12 k_1 x^2" />. Så konstant.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) ved x=3 m">
          <FormulaBox latex="W=\tfrac12(0{,}5)(3)^2=2{,}25\;\text{J}\;\Rightarrow\; v=\sqrt{2W/m}=\sqrt{2{,}25}=\boxed{1{,}50\;\text{m/s}}" variant="blue" />
        </Step>
        <Step n={2} title="(b) ved x=4 m">
          <FormulaBox latex="W=\tfrac12(0{,}5)(4)^2=4{,}0\;\text{J}\;\Rightarrow\; v=\sqrt{4{,}0}=\boxed{2{,}00\;\text{m/s}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) ved x=7 m">
          <FormulaBox latex="W=4{,}0+(2{,}0)(3)=10{,}0\;\text{J}\;\Rightarrow\; v=\sqrt{10{,}0}=\boxed{3{,}16\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Strategi: del integralet opp etter regioner og summer arbeidet. Arbeid-energi gir farten umiddelbart.</p>,
  },

  // ==========================================================================
  // 6.45 — Waterpark-slede
  // ==========================================================================
  "6.45": {
    title: "Slede skutt av komprimert fjær",
    difficulty: "middels",
    pageRef: "s. 203",
    problem: (
      <p>
        I en vannpark skytes sleder langs en glatt flate av en komprimert fjær
        med <InlineLatex latex="k=40{,}0\;\text{N/cm}=4000\;\text{N/m}" />. En
        slede med rytter (samlet masse 70,0 kg) presses mot fjæren og
        komprimerer den 0,375 m. Fra ro — hvor rask er sleden når (a) fjæren
        er tilbake til naturlig lengde, (b) fjæren fortsatt er komprimert 0,200 m?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="k=4000\;\text{N/m},\;x_i=0{,}375\;\text{m}" /></li>
        <li><InlineLatex latex="m=70{,}0\;\text{kg}" />, glatt flate</li>
      </ul>
    ),
    unknowns: <p>Fart i to posisjoner.</p>,
    strategy: (
      <p>
        Arbeid-energi med fjær: KE = arbeid av fjæren. Arbeidet fra start til
        kompresjon <InlineLatex latex="x" /> er{" "}
        <InlineLatex latex="\tfrac12 k(x_i^2-x^2)" />.
      </p>
    ),
    hints: [{ label: "Hint", content: <p>(b) fjæren er fortsatt komprimert — bare en del av PE er frigjort.</p> }],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Naturlig lengde (x=0)">
          <FormulaBox latex="\tfrac12 k x_i^2=\tfrac12(4000)(0{,}375)^2=281{,}25\;\text{J}" variant="blue" />
          <FormulaBox latex="v=\sqrt{2W/m}=\sqrt{2(281{,}25)/70}=\boxed{2{,}83\;\text{m/s}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Fortsatt komprimert 0,200 m">
          <FormulaBox latex="W=\tfrac12 k(x_i^2-x^2)=\tfrac12(4000)(0{,}375^2-0{,}200^2)=201{,}25\;\text{J}" variant="blue" />
          <FormulaBox latex="v=\sqrt{2(201{,}25)/70}=\boxed{2{,}40\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>En fjær som er delvis uthulet har enda PE igjen. Regn ut det arbeidet som <em>faktisk</em> er levert.</p>,
  },

  // ==========================================================================
  // 6.47 — 100 W-pære
  // ==========================================================================
  "6.47": {
    title: "Effekt, energi og fart for KE-ekvivalent",
    difficulty: "lett",
    pageRef: "s. 203",
    problem: (
      <p>
        Hvor mange joule bruker en 100 W-lyspære per time? Hvor raskt må en
        70 kg person løpe for å ha den samme kinetiske energien?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="P=100\;\text{W},\;t=3600\;\text{s}" /></li>
        <li><InlineLatex latex="m=70\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: <p>Energi og fart.</p>,
    strategy: (
      <TheoryBox title="Effekt og energi">
        <FormulaBox latex="E=Pt,\quad v=\sqrt{2KE/m}" variant="gold" />
      </TheoryBox>
    ),
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Energi på én time">
          <FormulaBox latex="E=(100)(3600)=\boxed{3{,}6\times 10^5\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="Matchende fart">
          <FormulaBox latex="v=\sqrt{2(3{,}6\times 10^5)/70}=\sqrt{10286}=\boxed{101\;\text{m/s}}" variant="gold" />
          <p className="italic text-xs">Ca 364 km/t — langt over menneskelig fart. Et håndgripelig bevis for hvor mye energi en pære faktisk bruker.</p>
        </Step>
      </div>
    ),
    summary: <p>Effekt × tid = energi. Lyspæren bruker like mye energi på én time som en menneskelig kropp ville hatt ved 101 m/s.</p>,
  },

  // ==========================================================================
  // 6.50 — Magnetar
  // ==========================================================================
  "6.50": {
    title: "Kraftforhold mellom magnetar og sol",
    difficulty: "lett",
    pageRef: "s. 204",
    problem: (
      <p>
        En magnetar slapp i 0,20 s ut like mye energi som solen gjør på 250 000
        år. Hvis P er solens gjennomsnittseffekt, hva er magnetarens
        gjennomsnittseffekt (i termer av P)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li>Magnetar: <InlineLatex latex="E=P\cdot t_\odot" /> med <InlineLatex latex="t_\odot=250\,000\;\text{år}" /></li>
        <li>Utløpstid: <InlineLatex latex="\Delta t=0{,}20\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p><InlineLatex latex="P_\text{mag}/P" /></p>,
    strategy: (
      <p>
        Effekt = energi/tid. Magnetaren slipper solens 250 000 år av energi på
        0,20 s.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Konverter år til sekunder: 1 år ≈ 3,156 × 10⁷ s.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Tid i sekunder">
          <FormulaBox latex="t_\odot=(2{,}5\times 10^5)(3{,}156\times 10^7)=7{,}89\times 10^{12}\;\text{s}" variant="blue" />
        </Step>
        <Step n={2} title="Effektforhold">
          <FormulaBox latex="\frac{P_\text{mag}}{P}=\frac{t_\odot}{\Delta t}=\frac{7{,}89\times 10^{12}}{0{,}20}=\boxed{3{,}9\times 10^{13}\,P}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Effekt er <em>rate</em>: komprimer lik energi i kortere tid → stor effekt. Magnetarer er nær solens evigvarende effekt × 4 × 10¹³.</p>,
  },

  // ==========================================================================
  // 6.54 — Heisens kapasitet
  // ==========================================================================
  "6.54": {
    title: "Maks passasjerer i heis med effektgrense",
    difficulty: "middels",
    pageRef: "s. 204",
    problem: (
      <p>
        En heis har masse 600 kg (uten passasjerer). Den skal stige 20,0 m
        (5 etasjer) på 16,0 s med konstant fart. Motoren leverer maks 40 hp.
        Hvor mange passasjerer (ca 65 kg hver) kan være med?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m_0=600\;\text{kg},\;h=20{,}0\;\text{m},\;t=16{,}0\;\text{s}" /></li>
        <li><InlineLatex latex="P_\text{max}=40\;\text{hp}=40\cdot 746=29840\;\text{W}" /></li>
        <li><InlineLatex latex="m_p=65\;\text{kg}" /> per passasjer</li>
      </ul>
    ),
    unknowns: <p>Antall passasjerer <InlineLatex latex="N" />.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Konstant fart → kraft fra motor = total vekt.
        </p>
        <TheoryBox title="Effekt og hastighet">
          <FormulaBox latex="P=Fv" variant="gold" />
          <p>For konstant fart: <InlineLatex latex="v=h/t" /> og <InlineLatex latex="F=(m_0+Nm_p)g" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Fart <InlineLatex latex="v=20/16=1{,}25\;\text{m/s}" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Sett opp ligningen">
          <FormulaBox latex="P_\text{max}=(m_0+Nm_p)gv" variant="blue" />
        </Step>
        <Step n={2} title="Løs for N">
          <FormulaBox latex="N=\frac{P_\text{max}/(gv)-m_0}{m_p}=\frac{29840/(9{,}80\cdot 1{,}25)-600}{65}" variant="blue" />
          <FormulaBox latex="=\frac{2436{,}7-600}{65}=\frac{1836{,}7}{65}\approx 28{,}3" variant="blue" />
          <p>Altså <strong>maks 28 passasjerer</strong>.</p>
        </Step>
      </div>
    ),
    summary: <p>Effekt setter grenser: <InlineLatex latex="P=Fv" />. Konstant fart betyr kraft = samlet vekt.</p>,
  },

  // ==========================================================================
  // 6.55 — Skitrekk
  // ==========================================================================
  "6.55": {
    title: "Effektbehov for skitrekk",
    difficulty: "middels",
    pageRef: "s. 204",
    problem: (
      <p>
        En skitrekk går opp et 15° skråplan på 300 m. Tauet går med
        12,0 km/t og drar 50 personer samtidig, med gjennomsnittlig masse 70,0 kg.
        Estimer nødvendig effekt.
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\theta=15^\circ,\;v=12{,}0\;\text{km/t}=3{,}33\;\text{m/s}" /></li>
        <li><InlineLatex latex="N=50,\;m=70\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: <p>Nødvendig effekt.</p>,
    strategy: (
      <p>
        Konstant fart på skråplan: tauet må balansere vektens komponent ned
        skråplanet. Effekt = kraft × fart.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Kraft pr person: <InlineLatex latex="F_1=mg\sin\theta" />. Total kraft: <InlineLatex latex="NF_1" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Kraft langs tauet">
          <FormulaBox latex="F=Nmg\sin\theta=50(70)(9{,}80)\sin 15^\circ=50(70)(9{,}80)(0{,}2588)=8881\;\text{N}" variant="blue" />
        </Step>
        <Step n={2} title="Effekt">
          <FormulaBox latex="P=Fv=(8881)(3{,}33)=\boxed{2{,}96\times 10^4\;\text{W}\;\approx 29{,}6\;\text{kW}}" variant="gold" />
          <p className="italic text-xs">Eller ~40 hp. Realistisk størrelse for en mellomstor skitrekk.</p>
        </Step>
      </div>
    ),
    summary: <p>For oppadgående bevegelse på skråplan: trekker skal balansere <InlineLatex latex="mg\sin\theta" /> — den andre gravitasjonskomponenten bæres av underlaget.</p>,
  },

  // ==========================================================================
  // 6.58 — Fjærgevær
  // ==========================================================================
  "6.58": {
    title: "Kompresjon av fjær i leketøysgevær",
    difficulty: "middels",
    pageRef: "s. 205",
    problem: (
      <p>
        Et fjærgevær har <InlineLatex latex="k=400\;\text{N/m}" />. Rettet rett
        opp kaster det en 0,0600 kg pil 6,00 m opp (fra fjærens utlaste
        endeposisjon). Neglisjer luftmotstand, friksjon og fjærmasse. Hva er
        kompresjonen?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="k=400\;\text{N/m},\;m=0{,}0600\;\text{kg},\;h=6{,}00\;\text{m}" /></li>
      </ul>
    ),
    unknowns: <p>Kompresjon <InlineLatex latex="x" />.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          Energibevaring: fjærenergien → KE → potensiell energi oppe (men
          husk at pilen også stiger <InlineLatex latex="x" /> mer enn fjærens
          utløste lengde før den er fri).
        </p>
        <TheoryBox title="Energibevaring med fjær + gravitasjon">
          <p>Fra start (komprimert, i ro) til toppunkt (i ro):</p>
          <FormulaBox latex="\tfrac12 k x^2=mg(h+x)" variant="gold" />
          <p className="mt-1">
            Merk: høyden er fra utløst endeposisjon til toppunkt, men pilen
            stiger også <InlineLatex latex="x" /> under utløsningen.
          </p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Kvadratisk ligning i x. Regn først ut mg og sett opp.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Sett opp ligningen">
          <FormulaBox latex="\tfrac12(400)x^2=0{,}0600(9{,}80)(6+x)=0{,}588(6+x)" variant="blue" />
          <FormulaBox latex="200x^2-0{,}588x-3{,}528=0" variant="blue" />
        </Step>
        <Step n={2} title="Løs med abc-formelen">
          <FormulaBox latex="x=\frac{0{,}588+\sqrt{0{,}588^2+4(200)(3{,}528)}}{2(200)}=\frac{0{,}588+53{,}11}{400}=\boxed{0{,}134\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: (
      <p>
        Glem ikke å ta med <em>selve fjærkompresjonen</em> i total høydeendring.
        Energibevaring er rask og trygg her.
      </p>
    ),
  },

  // ==========================================================================
  // 6.59 — Isblokk på skråplan
  // ==========================================================================
  "6.59": {
    title: "Sluttfart av isblokk ned friksjonsløst skråplan",
    difficulty: "lett",
    pageRef: "s. 205",
    problem: (
      <p>
        En 2,00 kg isblokk glir 1,35 m ned et friksjonsløst skråplan
        på 36,9°. Starter fra ro. Sluttfart?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}00\;\text{kg},\;s=1{,}35\;\text{m},\;\theta=36{,}9^\circ" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart.</p>,
    strategy: (
      <p>
        Kun gravitasjonen gjør arbeid (glatt skråplan). Høydeendringen er{" "}
        <InlineLatex latex="h=s\sin\theta" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="\tfrac12 mv^2=mgs\sin\theta\Rightarrow v=\sqrt{2gs\sin\theta}" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Fart fra energi">
          <FormulaBox latex="v=\sqrt{2(9{,}80)(1{,}35)\sin 36{,}9^\circ}=\sqrt{26{,}46\cdot 0{,}6}=\boxed{3{,}98\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>For glatte skråplan: <InlineLatex latex="v=\sqrt{2g h}" /> med <InlineLatex latex="h=s\sin\theta" />. Massen faller ut.</p>,
  },

  // ==========================================================================
  // 6.60 — lagt som 6.59 alternativ (sjekk liste)
  // ==========================================================================
  // (problems)

  // ==========================================================================
  // 6.67 — Baseball-pitcher
  // ==========================================================================
  "6.67": {
    title: "Arbeid pitcher utøver på ball",
    difficulty: "lett",
    pageRef: "s. 206",
    problem: (
      <p>
        En trent pitcher kaster en baseball (masse 0,145 kg) i nær 100 mi/t
        (44,7 m/s). Hvor mye arbeid gjør han på ballen (kroppsbevegelsene
        neglisjeres)?
      </p>
    ),
    knowns: <p><InlineLatex latex="m=0{,}145\;\text{kg},\;v=44{,}7\;\text{m/s}" />, starter fra ro.</p>,
    unknowns: <p>Arbeid <InlineLatex latex="W" />.</p>,
    strategy: <p>Arbeid-energi: <InlineLatex latex="W=\tfrac12 mv^2" />.</p>,
    hints: [],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Beregning">
          <FormulaBox latex="W=\tfrac12(0{,}145)(44{,}7)^2=\boxed{145\;\text{J}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Arbeid-energi gir den enkleste utregningen når start- og sluttfart er kjent.</p>,
  },

  // ==========================================================================
  // 6.71 — Pumpe
  // ==========================================================================
  "6.71": {
    title: "Effektbehov for vannpumpe",
    difficulty: "vanskelig",
    pageRef: "s. 206",
    problem: (
      <p>
        En pumpe løfter 800 kg vann per minutt fra en 14,0 m dyp brønn, og
        slenger det ut med fart 18,0 m/s. (a) Arbeid pr. minutt for
        løftet? (b) Arbeid pr. minutt for KE-delen? (c) Effektbehov?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="\Delta m/\Delta t=800/60\;\text{kg/s}" /></li>
        <li><InlineLatex latex="h=14{,}0\;\text{m},\;v=18{,}0\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: <p>Arbeid per minutt (to deler) og effekt.</p>,
    strategy: (
      <div className="space-y-2">
        <p>
          To arbeidsdeler: løftet mot gravitasjon og kinetisk energi ved utløp.
          Effekt = total energi pr. tid.
        </p>
        <TheoryBox title="To oppgaver for pumpa">
          <FormulaBox latex="W_\text{lift}=mgh,\quad W_\text{KE}=\tfrac12 m v^2" variant="blue" />
          <p>Tidsgjennomsnittlig effekt: <InlineLatex latex="P=(W_\text{lift}+W_\text{KE})/\Delta t" />.</p>
        </TheoryBox>
      </div>
    ),
    hints: [
      { label: "Hint", content: <p>Bruk <InlineLatex latex="\Delta t=60\;\text{s}" /> for "per minutt".</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Løfte-arbeid">
          <FormulaBox latex="W_\text{lift}=(800)(9{,}80)(14{,}0)=\boxed{1{,}098\times 10^5\;\text{J}}" variant="blue" />
        </Step>
        <Step n={2} title="(b) KE-arbeid">
          <FormulaBox latex="W_\text{KE}=\tfrac12(800)(18{,}0)^2=\boxed{1{,}296\times 10^5\;\text{J}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Effekt">
          <FormulaBox latex="P=\frac{W_\text{lift}+W_\text{KE}}{60}=\frac{2{,}394\times 10^5}{60}=\boxed{3{,}99\times 10^3\;\text{W}\approx 4{,}0\;\text{kW}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Når det flyter masse: fordel energien mellom løft (PE) og fart (KE), summer og del på tid.</p>,
  },

  // ==========================================================================
  // 6.75 — Kloss med friksjon, dratt horisontalt
  // ==========================================================================
  "6.75": {
    title: "Sluttfart av kloss dratt mot friksjon",
    difficulty: "middels",
    pageRef: "s. 207",
    problem: (
      <p>
        En 4,00 kg treklosss på et stålbord har <InlineLatex latex="\mu_k=0{,}300" />.
        Klossen er i ro. Du drar med en horisontal kraft 25,0 N i 3,00 s, langs
        1,50 m. Hva er sluttfarten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=4{,}00\;\text{kg},\;\mu_k=0{,}300,\;F=25{,}0\;\text{N}" /></li>
        <li><InlineLatex latex="s=1{,}50\;\text{m},\;v_0=0" /></li>
      </ul>
    ),
    unknowns: <p>Sluttfart.</p>,
    strategy: (
      <p>
        Bruk arbeid-energi med begge horisontale krefter.{" "}
        <InlineLatex latex="f_k=\mu_k mg" /> motvirker bevegelsen.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="W_\text{tot}=(F-f_k)s=\tfrac12 mv^2" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Krefter">
          <FormulaBox latex="f_k=\mu_k mg=(0{,}300)(4{,}00)(9{,}80)=11{,}76\;\text{N}" variant="blue" />
          <FormulaBox latex="F_\text{net}=F-f_k=25{,}0-11{,}76=13{,}24\;\text{N}" variant="blue" />
        </Step>
        <Step n={2} title="Fart">
          <FormulaBox latex="v=\sqrt{\frac{2F_\text{net}s}{m}}=\sqrt{\frac{2(13{,}24)(1{,}50)}{4{,}00}}=\sqrt{9{,}93}=\boxed{3{,}15\;\text{m/s}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>For horisontal bevegelse med friksjon: bruk <em>nettokraft</em> × avstand i arbeid-energi-teoremet.</p>,
  },

  // ==========================================================================
  // 6.81 — Fjær med friksjon etter
  // ==========================================================================
  "6.81": {
    title: "Kloss på fjær → glidende friksjon",
    difficulty: "vanskelig",
    pageRef: "s. 207",
    problem: (
      <p>
        En 2,50 kg kloss presser en fjær (<InlineLatex latex="k=250\;\text{N/m}" />)
        0,150 m. Fjæren slipper. Etterpå glir klossen langs en horisontal flate
        med <InlineLatex latex="\mu_k=0{,}300" />. Hvor langt beveger den seg
        før den stopper (målt fra der fjæren er ukomprimert)?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=2{,}50\;\text{kg},\;k=250\;\text{N/m}" /></li>
        <li><InlineLatex latex="x=0{,}150\;\text{m},\;\mu_k=0{,}300" /></li>
      </ul>
    ),
    unknowns: <p>Avstand til stopp.</p>,
    strategy: (
      <p>
        All fjærenergi blir dissippert av friksjonen:{" "}
        <InlineLatex latex="\tfrac12 k x^2=\mu_k m g\,d" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p>Sett fjærarbeid lik friksjonsarbeid over avstanden d.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Energibalanse">
          <FormulaBox latex="\tfrac12 k x^2=\mu_k m g d\;\Rightarrow\; d=\frac{k x^2}{2\mu_k m g}" variant="gold" />
        </Step>
        <Step n={2} title="Numerikk">
          <FormulaBox latex="d=\frac{(250)(0{,}150)^2}{2(0{,}300)(2{,}50)(9{,}80)}=\frac{5{,}625}{14{,}7}=\boxed{0{,}383\;\text{m}}" variant="gold" />
        </Step>
      </div>
    ),
    summary: <p>Friksjon som dissipatør: lik all tilgjengelig energi med arbeidet friksjonen gjør over distansen.</p>,
  },

  // ==========================================================================
  // 6.82 — Sykkel opp bakke
  // ==========================================================================
  "6.82": {
    title: "Effektbehov for syklist opp bakke",
    difficulty: "middels",
    pageRef: "s. 207",
    problem: (
      <p>
        En syklist (totalmasse 75,0 kg) kjører med 4,00 m/s opp en jevn bakke
        som stiger 4,00°. Rullemotstand og luftmotstand tilsvarer en
        konstant motkraft på 20,0 N. Hvilken effekt leverer syklisten?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=75{,}0\;\text{kg},\;v=4{,}00\;\text{m/s},\;\theta=4{,}00^\circ" /></li>
        <li>Motstand: 20,0 N</li>
      </ul>
    ),
    unknowns: <p>Effekt.</p>,
    strategy: <p>Konstant fart → kraften fra syklisten er lik motstand + gravitasjonskomponent.</p>,
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="F=mg\sin\theta+f" />.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="Nettokraft syklisten gir">
          <FormulaBox latex="F=mg\sin\theta+20=(75)(9{,}80)(0{,}0698)+20=51{,}30+20=71{,}30\;\text{N}" variant="blue" />
        </Step>
        <Step n={2} title="Effekt">
          <FormulaBox latex="P=Fv=(71{,}30)(4{,}00)=\boxed{285\;\text{W}}" variant="gold" />
          <p className="italic text-xs">Ca 0,38 hp — realistisk for amatørsyklist.</p>
        </Step>
      </div>
    ),
    summary: <p>Bakken og friksjon legger seg sammen i nødvendig kraft. P = Fv gir effekten.</p>,
  },

  // ==========================================================================
  // 6.85 — Toutgange
  // ==========================================================================
  "6.85": {
    title: "Effektbehov for akselererende bil",
    difficulty: "vanskelig",
    pageRef: "s. 208",
    problem: (
      <p>
        En 1500 kg bil akselererer fra hvile til 25 m/s på 8,0 s. Neglisjer
        friksjon/luftmotstand. (a) Arbeid som motoren må levere? (b) Gjennomsnittlig
        effekt? (c) Øyeblikkelig effekt ved sluttfart, antatt konstant nettokraft?
      </p>
    ),
    knowns: (
      <ul className="list-disc pl-5 space-y-0.5">
        <li><InlineLatex latex="m=1500\;\text{kg},\;v_0=0,\;v_f=25\;\text{m/s},\;t=8{,}0\;\text{s}" /></li>
      </ul>
    ),
    unknowns: <p>Arbeid, gjennomsnitts-effekt, maks-effekt.</p>,
    strategy: (
      <p>
        Arbeid-energi for (a). Gjennomsnittseffekt: arbeid/tid. Øyeblikkelig
        effekt ved endelig fart: <InlineLatex latex="P=Fv_f" />, der{" "}
        <InlineLatex latex="F=ma" />.
      </p>
    ),
    hints: [
      { label: "Hint", content: <p><InlineLatex latex="a=v_f/t" /> siden konstant akselerasjon fra hvile.</p> },
    ],
    solution: (
      <div className="space-y-2">
        <Step n={1} title="(a) Arbeid">
          <FormulaBox latex="W=\tfrac12 mv_f^2=\tfrac12(1500)(25)^2=\boxed{4{,}69\times 10^5\;\text{J}}" variant="gold" />
        </Step>
        <Step n={2} title="(b) Gjennomsnittseffekt">
          <FormulaBox latex="P_\text{gj}=W/t=4{,}69\times 10^5/8{,}0=\boxed{5{,}86\times 10^4\;\text{W}\approx 78{,}6\;\text{hp}}" variant="blue" />
        </Step>
        <Step n={3} title="(c) Øyeblikkelig effekt ved sluttfart">
          <FormulaBox latex="a=25/8{,}0=3{,}125\;\text{m/s}^2" variant="blue" />
          <FormulaBox latex="F=ma=(1500)(3{,}125)=4688\;\text{N}" variant="blue" />
          <FormulaBox latex="P=Fv_f=(4688)(25)=\boxed{1{,}17\times 10^5\;\text{W}\approx 157\;\text{hp}}" variant="gold" />
          <p className="italic text-xs">Merk: øyeblikkelig effekt ved sluttfart er <em>dobbelt</em> av gjennomsnittet — fordi effekten vokser lineært med farten under konstant akselerasjon.</p>
        </Step>
      </div>
    ),
    summary: <p>Under konstant akselerasjon: <InlineLatex latex="P_\text{øy}(t)=Fv(t)=F\cdot at" /> vokser lineært; gjennomsnittet er halvparten av toppen.</p>,
  },
};
