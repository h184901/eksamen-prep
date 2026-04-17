"use client";

import type React from "react";
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

// ─────────────────────────────────────────────────────────────────────────
// Gjenbrukbare SVG-komponenter
// ─────────────────────────────────────────────────────────────────────────

function PlatekondensatorSVG({
  withDielectric = false,
  label = "",
}: {
  withDielectric?: boolean;
  label?: string;
}) {
  return (
    <svg viewBox="0 0 360 200" className="w-full max-w-md mx-auto my-3">
      {/* Positiv plate */}
      <rect x="40" y="40" width="280" height="12" fill="#ef4444" />
      <text x="180" y="34" fontSize="14" textAnchor="middle" fill="#ef4444" fontWeight="bold">+Q</text>
      {/* Negativ plate */}
      <rect x="40" y="148" width="280" height="12" fill="#3b82f6" />
      <text x="180" y="178" fontSize="14" textAnchor="middle" fill="#3b82f6" fontWeight="bold">−Q</text>
      {/* Dielektrikum */}
      {withDielectric && (
        <>
          <rect x="40" y="52" width="280" height="96" fill="#10b981" fillOpacity="0.18" stroke="#10b981" strokeDasharray="4 4" />
          <text x="180" y="104" fontSize="13" textAnchor="middle" fill="#059669" fontWeight="bold">Dielektrikum (K)</text>
        </>
      )}
      {/* E-felt-piler */}
      {!withDielectric &&
        [80, 130, 180, 230, 280].map((x) => (
          <g key={x}>
            <line x1={x} y1="58" x2={x} y2="142" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-mid)" />
          </g>
        ))}
      {/* Avstandsindikator */}
      <line x1="20" y1="52" x2="20" y2="148" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="52" x2="24" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="148" x2="24" y2="148" stroke="currentColor" strokeWidth="1" />
      <text x="10" y="104" fontSize="13" textAnchor="middle" fill="currentColor">d</text>
      {/* Label */}
      {label && (
        <text x="180" y="196" fontSize="12" textAnchor="middle" fill="currentColor" fontStyle="italic">
          {label}
        </text>
      )}
      <defs>
        <marker id="arrow-mid" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  );
}

function KondensatorSymbol({ x, y, label, vertical = false }: { x: number; y: number; label: string; vertical?: boolean }) {
  if (vertical) {
    return (
      <g>
        <line x1={x - 14} y1={y - 6} x2={x + 14} y2={y - 6} stroke="currentColor" strokeWidth="2.5" />
        <line x1={x - 14} y1={y + 6} x2={x + 14} y2={y + 6} stroke="currentColor" strokeWidth="2.5" />
        <text x={x + 22} y={y + 4} fontSize="11" fill="currentColor">{label}</text>
      </g>
    );
  }
  return (
    <g>
      <line x1={x - 6} y1={y - 14} x2={x - 6} y2={y + 14} stroke="currentColor" strokeWidth="2.5" />
      <line x1={x + 6} y1={y - 14} x2={x + 6} y2={y + 14} stroke="currentColor" strokeWidth="2.5" />
      <text x={x} y={y + 30} fontSize="11" fill="currentColor" textAnchor="middle">{label}</text>
    </g>
  );
}

// SVG til 24.14: fire kondensatorer
function Svg2414() {
  return (
    <svg viewBox="0 0 440 220" className="w-full max-w-lg mx-auto my-3">
      {/* a */}
      <circle cx="30" cy="110" r="3" fill="currentColor" />
      <text x="20" y="114" fontSize="14" fill="currentColor" fontWeight="bold">a</text>
      {/* b */}
      <circle cx="410" cy="110" r="3" fill="currentColor" />
      <text x="418" y="114" fontSize="14" fill="currentColor" fontWeight="bold">b</text>
      {/* 10 µF til venstre */}
      <line x1="30" y1="110" x2="100" y2="110" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={110} y={110} label="10,0 μF" />
      <line x1="116" y1="110" x2="180" y2="110" stroke="currentColor" strokeWidth="1.5" />
      {/* Midten: 5 og 8 µF i parallell */}
      <line x1="180" y1="110" x2="180" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="180" y1="60" x2="260" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={220} y={60} label="5,0 μF" vertical />
      <line x1="260" y1="60" x2="260" y2="110" stroke="currentColor" strokeWidth="1.5" />
      <line x1="180" y1="110" x2="180" y2="160" stroke="currentColor" strokeWidth="1.5" />
      <line x1="180" y1="160" x2="260" y2="160" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={220} y={160} label="8,0 μF" vertical />
      <line x1="260" y1="160" x2="260" y2="110" stroke="currentColor" strokeWidth="1.5" />
      {/* 9 µF til høyre */}
      <line x1="260" y1="110" x2="320" y2="110" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={330} y={110} label="9,0 μF" />
      <line x1="336" y1="110" x2="410" y2="110" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// SVG til 24.21
function Svg2421() {
  return (
    <svg viewBox="0 0 440 260" className="w-full max-w-lg mx-auto my-3">
      <circle cx="30" cy="130" r="3" fill="currentColor" />
      <text x="20" y="134" fontSize="14" fill="currentColor" fontWeight="bold">a</text>
      <circle cx="410" cy="130" r="3" fill="currentColor" />
      <text x="418" y="134" fontSize="14" fill="currentColor" fontWeight="bold">b</text>
      {/* 18 nF i serie fra a */}
      <line x1="30" y1="130" x2="80" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={95} y={130} label="18,0 nF" />
      <line x1="101" y1="130" x2="160" y2="130" stroke="currentColor" strokeWidth="1.5" />
      {/* 30 og 6,5 nF parallell i midten */}
      <line x1="160" y1="130" x2="160" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="160" y1="70" x2="260" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={210} y={70} label="30,0 nF" vertical />
      <line x1="260" y1="70" x2="260" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <line x1="160" y1="130" x2="160" y2="190" stroke="currentColor" strokeWidth="1.5" />
      <line x1="160" y1="190" x2="260" y2="190" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={210} y={190} label="6,5 nF" vertical />
      <line x1="260" y1="190" x2="260" y2="130" stroke="currentColor" strokeWidth="1.5" />
      {/* 10 nF videre */}
      <line x1="260" y1="130" x2="305" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={320} y={130} label="10,0 nF" />
      <line x1="326" y1="130" x2="350" y2="130" stroke="currentColor" strokeWidth="1.5" />
      {/* 7,5 nF parallell over 10 nF eller etter */}
      <line x1="350" y1="130" x2="350" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="350" y1="60" x2="380" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={365} y={90} label="7,5 nF" />
      <line x1="350" y1="130" x2="410" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <line x1="380" y1="60" x2="380" y2="130" stroke="currentColor" strokeWidth="1.5" />
      <text x="220" y="245" fontSize="11" textAnchor="middle" fill="currentColor" fontStyle="italic">Skjematisk tegning — se bok for presis topologi</text>
    </svg>
  );
}

// SVG til 24.52: fire kondensatorer i brokrets
function Svg2452() {
  return (
    <svg viewBox="0 0 420 240" className="w-full max-w-lg mx-auto my-3">
      <circle cx="30" cy="120" r="3" fill="currentColor" />
      <text x="20" y="124" fontSize="14" fill="currentColor" fontWeight="bold">a</text>
      <circle cx="390" cy="120" r="3" fill="currentColor" />
      <text x="398" y="124" fontSize="14" fill="currentColor" fontWeight="bold">b</text>
      {/* a → splitt i C1 og C3 */}
      <line x1="30" y1="120" x2="100" y2="120" stroke="currentColor" strokeWidth="1.5" />
      <line x1="100" y1="120" x2="100" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="100" y1="120" x2="100" y2="180" stroke="currentColor" strokeWidth="1.5" />
      {/* Øvre gren: C1 → C2 */}
      <line x1="100" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={155} y={60} label="C₁" />
      <line x1="161" y1="60" x2="220" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={240} y={60} label="C₂" />
      <line x1="246" y1="60" x2="320" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <line x1="320" y1="60" x2="320" y2="120" stroke="currentColor" strokeWidth="1.5" />
      {/* Nedre gren: C3 → C4 */}
      <line x1="100" y1="180" x2="140" y2="180" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={155} y={180} label="C₃" />
      <line x1="161" y1="180" x2="220" y2="180" stroke="currentColor" strokeWidth="1.5" />
      <KondensatorSymbol x={240} y={180} label="C₄" />
      <line x1="246" y1="180" x2="320" y2="180" stroke="currentColor" strokeWidth="1.5" />
      <line x1="320" y1="180" x2="320" y2="120" stroke="currentColor" strokeWidth="1.5" />
      {/* Felles punkt d mellom C1/C2 og C3/C4 via bro */}
      <line x1="320" y1="120" x2="390" y2="120" stroke="currentColor" strokeWidth="1.5" />
      <text x="200" y="80" fontSize="11" textAnchor="middle" fill="currentColor" fontStyle="italic">(Øvre: C₁ og C₂ i serie)</text>
      <text x="200" y="200" fontSize="11" textAnchor="middle" fill="currentColor" fontStyle="italic">(Nedre: C₃ og C₄ i serie)</text>
      <text x="200" y="226" fontSize="11" textAnchor="middle" fill="currentColor">De to grenene i parallell mellom a og b</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// OPPGAVER
// ─────────────────────────────────────────────────────────────────────────

export const exercises: Record<string, ExerciseContent> = {
  // ═══════════════════════════════════════════════════════════════════════
  // Seksjon 24.1 — Kondensatorer og kapasitans
  // ═══════════════════════════════════════════════════════════════════════

  "24.1": {
    title: "Platekondensator — spenning, areal og kapasitans",
    difficulty: "lett",
    pageRef: "s. 833",
    problem: (
      <div className="space-y-2">
        <p>
          Platene i en platekondensator er <InlineLatex latex="2{,}50\;\text{mm}" /> fra hverandre, og hver bærer en
          ladning av størrelse <InlineLatex latex="80{,}0\;\text{nC}" />. Platene er i vakuum. Det elektriske feltet
          mellom platene har en størrelse på <InlineLatex latex="4{,}00 \cdot 10^6\;\text{V/m}" />.
        </p>
        <p>Finn:</p>
        <p>a) potensialforskjellen mellom platene</p>
        <p>b) arealet av hver plate</p>
        <p>c) kapasitansen</p>
        <PlatekondensatorSVG label="Vakuum mellom platene, uniformt E-felt" />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>Plateavstand: <InlineLatex latex="d = 2{,}50\;\text{mm} = 2{,}50 \cdot 10^{-3}\;\text{m}" /></li>
        <li>Ladning på hver plate: <InlineLatex latex="|Q| = 80{,}0\;\text{nC} = 80{,}0 \cdot 10^{-9}\;\text{C}" /></li>
        <li>E-feltets størrelse: <InlineLatex latex="E = 4{,}00 \cdot 10^{6}\;\text{V/m}" /></li>
        <li>Medium: vakuum (<InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{F/m}" />)</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Potensialforskjell <InlineLatex latex="V_{ab}" /></li>
        <li>b) Plateareal <InlineLatex latex="A" /></li>
        <li>c) Kapasitans <InlineLatex latex="C" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        For uniformt felt mellom plater er <InlineLatex latex="V_{ab} = E\,d" />. Arealet finner vi fra platekondensator-formelen{" "}
        <InlineLatex latex="C = \varepsilon_0 A/d" /> kombinert med <InlineLatex latex="Q = CV" />, eller mer direkte fra
        flateladningstettheten <InlineLatex latex="\sigma = Q/A = \varepsilon_0 E" />. Kapasitansen følger av{" "}
        <InlineLatex latex="C = Q/V_{ab}" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Feltet er uniformt mellom platene. Da er <InlineLatex latex="V_{ab} = E \cdot d" />.</p> },
      { label: "Hint 2", content: <p>Fra Gauss: <InlineLatex latex="\sigma = \varepsilon_0 E" />, og <InlineLatex latex="\sigma = Q/A" />.</p> },
      { label: "Hint 3", content: <p>Kapasitans kan alltid regnes som <InlineLatex latex="C = Q/V_{ab}" /> — sjekk med <InlineLatex latex="C = \varepsilon_0 A/d" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Potensialforskjellen.</strong></p>
        <p className="text-sm">I en platekondensator er E-feltet uniformt, så potensialforskjellen er rett og slett felt ganger avstand:</p>
        <FormulaBox
          latex="V_{ab} = E\,d = (4{,}00 \cdot 10^{6})(2{,}50 \cdot 10^{-3}) = 1{,}00 \cdot 10^{4}\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Plateareal fra flateladningstetthet.</strong></p>
        <p className="text-sm">Fra Gauss over én av platene: <InlineLatex latex="E = \sigma/\varepsilon_0" />, dvs. <InlineLatex latex="\sigma = \varepsilon_0 E" />. Siden <InlineLatex latex="\sigma = Q/A" /> blir:</p>
        <FormulaBox
          latex="A = \frac{Q}{\varepsilon_0 E} = \frac{80{,}0 \cdot 10^{-9}}{(8{,}854 \cdot 10^{-12})(4{,}00 \cdot 10^{6})} = 2{,}26 \cdot 10^{-3}\;\text{m}^2"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: Kapasitansen.</strong></p>
        <FormulaBox
          latex="C = \frac{Q}{V_{ab}} = \frac{80{,}0 \cdot 10^{-9}}{1{,}00 \cdot 10^{4}} = 8{,}00 \cdot 10^{-12}\;\text{F} = 8{,}00\;\text{pF}"
          variant="blue"
        />
        <p className="text-sm text-[var(--muted)]">
          Kontroll via <InlineLatex latex="C = \varepsilon_0 A/d = (8{,}854\cdot 10^{-12})(2{,}26\cdot 10^{-3})/(2{,}50\cdot 10^{-3}) \approx 8{,}00\;\text{pF}\;\checkmark" />
        </p>

        <FormulaBox
          latex="V_{ab} = \boxed{1{,}00 \cdot 10^{4}\;\text{V}},\quad A = \boxed{2{,}26 \cdot 10^{-3}\;\text{m}^2},\quad C = \boxed{8{,}00\;\text{pF}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Tre grunnleggende relasjoner binder platekondensatorens geometri til det fysiske innholdet:{" "}
        <InlineLatex latex="V=Ed" />, <InlineLatex latex="\sigma=\varepsilon_0 E" /> og{" "}
        <InlineLatex latex="C=Q/V" />. Når to av de fire størrelsene E, V, Q, A er kjent sammen med d, kan alt det andre
        regnes ut direkte.
      </p>
    ),
  },

  "24.2": {
    title: "Kapasitans, spenning og E-felt i vakuum",
    difficulty: "lett",
    pageRef: "s. 833",
    problem: (
      <div className="space-y-2">
        <p>
          Platene i en platekondensator er <InlineLatex latex="3{,}46\;\text{mm}" /> fra hverandre, og hver har et areal
          på <InlineLatex latex="11{,}2\;\text{cm}^2" />. Hver plate bærer en ladning av størrelse{" "}
          <InlineLatex latex="6{,}80 \cdot 10^{-8}\;\text{C}" />. Platene er i vakuum.
        </p>
        <p>Finn:</p>
        <p>a) kapasitansen</p>
        <p>b) potensialforskjellen mellom platene</p>
        <p>c) størrelsen på det elektriske feltet mellom platene</p>
        <PlatekondensatorSVG label="Areal A = 11,2 cm²,  d = 3,46 mm,  vakuum" />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>Plateavstand: <InlineLatex latex="d = 3{,}46\;\text{mm} = 3{,}46 \cdot 10^{-3}\;\text{m}" /></li>
        <li>Plateareal: <InlineLatex latex="A = 11{,}2\;\text{cm}^2 = 11{,}2 \cdot 10^{-4}\;\text{m}^2" /></li>
        <li>Ladning: <InlineLatex latex="Q = 6{,}80 \cdot 10^{-8}\;\text{C}" /></li>
        <li>Vakuum: <InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{F/m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Kapasitans <InlineLatex latex="C" /></li>
        <li>b) Potensialforskjell <InlineLatex latex="V_{ab}" /></li>
        <li>c) E-feltets størrelse mellom platene</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Platekondensator i vakuum: <InlineLatex latex="C = \varepsilon_0 A/d" /> gir kapasitansen direkte fra geometri.
        Deretter gir <InlineLatex latex="V_{ab} = Q/C" /> spenningen og <InlineLatex latex="E = V_{ab}/d" /> feltet (likeverdig med <InlineLatex latex="E = \sigma/\varepsilon_0" />).
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Konverter arealet <InlineLatex latex="11{,}2\;\text{cm}^2 \to \text{m}^2" /> ved <InlineLatex latex="\cdot 10^{-4}" />.</p> },
      { label: "Hint 2", content: <p>Rekkefølge: C → V → E. Alternativt E → V via <InlineLatex latex="V = Ed" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Kapasitansen.</strong></p>
        <FormulaBox
          latex="C = \varepsilon_0 \frac{A}{d} = (8{,}854 \cdot 10^{-12}) \cdot \frac{11{,}2 \cdot 10^{-4}}{3{,}46 \cdot 10^{-3}} = 2{,}87 \cdot 10^{-12}\;\text{F} = 2{,}87\;\text{pF}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Potensialforskjellen.</strong></p>
        <FormulaBox
          latex="V_{ab} = \frac{Q}{C} = \frac{6{,}80 \cdot 10^{-8}}{2{,}87 \cdot 10^{-12}} = 2{,}37 \cdot 10^{4}\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: E-feltet.</strong></p>
        <FormulaBox
          latex="E = \frac{V_{ab}}{d} = \frac{2{,}37 \cdot 10^{4}}{3{,}46 \cdot 10^{-3}} = 6{,}85 \cdot 10^{6}\;\text{V/m}"
          variant="blue"
        />

        <FormulaBox
          latex="C = \boxed{2{,}87\;\text{pF}},\quad V_{ab} = \boxed{2{,}37 \cdot 10^{4}\;\text{V}},\quad E = \boxed{6{,}85 \cdot 10^{6}\;\text{V/m}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        «Geometri gir C, ladning gir V, V/d gir E.» Tre korte beregninger knytter det makroskopiske kretsbildet (V og Q)
        til det mikroskopiske feltbildet (E) gjennom kondensatorens geometri.
      </p>
    ),
  },

  "24.5": {
    title: "Kondensator koblet til batteri — plateavstand og radius endres",
    difficulty: "middels",
    pageRef: "s. 833",
    problem: (
      <div className="space-y-2">
        <p>
          En <InlineLatex latex="10{,}0\;\mu\text{F}" /> platekondensator med sirkulære plater er koblet til et{" "}
          <InlineLatex latex="12{,}0\;\text{V}" />-batteri.
        </p>
        <p>a) Hvor mye ladning er på hver plate?</p>
        <p>
          b) Hvor mye ladning ville vært på platene dersom plateavstanden ble{" "}
          <strong>doblet</strong>, samtidig som kondensatoren fortsatt er koblet til batteriet?
        </p>
        <p>
          c) Hvor mye ladning ville vært på platene dersom radiusen på hver plate ble{" "}
          <strong>doblet</strong> uten å endre plateavstanden?
        </p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>Startkapasitans: <InlineLatex latex="C_0 = 10{,}0\;\mu\text{F} = 10{,}0 \cdot 10^{-6}\;\text{F}" /></li>
        <li>Spenning: <InlineLatex latex="V = 12{,}0\;\text{V}" /> (konstant — batteri tilkoblet)</li>
        <li>Sirkulære plater med areal <InlineLatex latex="A = \pi r^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Ladning <InlineLatex latex="Q" /> på hver plate</li>
        <li>b) Ny ladning <InlineLatex latex="Q_b" /> når <InlineLatex latex="d \to 2d" /></li>
        <li>c) Ny ladning <InlineLatex latex="Q_c" /> når <InlineLatex latex="r \to 2r" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Så lenge batteriet er tilkoblet er V konstant. Da endres Q i takt med C siden{" "}
        <InlineLatex latex="Q = CV" />. Vi bruker <InlineLatex latex="C = \varepsilon_0 A/d = \varepsilon_0 \pi r^2/d" />{" "}
        for å se hvordan C skalerer: (b) d dobles ⇒ C halveres, (c) r dobles ⇒ A firedobles ⇒ C firedobles.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Nøkkelen: er batteriet tilkoblet (V konstant) eller frakoblet (Q konstant)? Her er det tilkoblet.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="C \propto A/d \propto r^2/d" />. Studer hvordan C endrer seg, så følger Q via <InlineLatex latex="Q=CV" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1 (a): Startladning.</strong></p>
        <FormulaBox
          latex="Q = C_0 V = (10{,}0 \cdot 10^{-6})(12{,}0) = 1{,}20 \cdot 10^{-4}\;\text{C} = 120\;\mu\text{C}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (b): Plateavstand dobles.</strong></p>
        <p className="text-sm">Siden <InlineLatex latex="C = \varepsilon_0 A/d" />, halveres C når d dobles: <InlineLatex latex="C_b = C_0/2 = 5{,}00\;\mu\text{F}" />. Med V konstant:</p>
        <FormulaBox
          latex="Q_b = C_b V = (5{,}00 \cdot 10^{-6})(12{,}0) = 60{,}0\;\mu\text{C}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3 (c): Radius dobles.</strong></p>
        <p className="text-sm">Arealet firedobles: <InlineLatex latex="A \to 4A" />. Dermed: <InlineLatex latex="C_c = 4C_0 = 40{,}0\;\mu\text{F}" />. V konstant:</p>
        <FormulaBox
          latex="Q_c = C_c V = (40{,}0 \cdot 10^{-6})(12{,}0) = 4{,}80 \cdot 10^{-4}\;\text{C} = 480\;\mu\text{C}"
          variant="blue"
        />

        <FormulaBox
          latex="Q = \boxed{120\;\mu\text{C}},\quad Q_b = \boxed{60{,}0\;\mu\text{C}},\quad Q_c = \boxed{480\;\mu\text{C}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>Gylden regel:</strong> Batteri på ⇒ V fast, Q endres med C. Batteri av ⇒ Q fast, V endres med 1/C.
        Her dobler vi d for å halvere C (og Q), eller firedobler A via <InlineLatex latex="r^2" /> for å firedoble C (og Q).
      </p>
    ),
  },

  "24.6": {
    title: "Design av platekondensator med maksimum E-felt",
    difficulty: "middels",
    pageRef: "s. 833",
    problem: (
      <div className="space-y-2">
        <p>
          En <InlineLatex latex="5{,}00\;\text{pF}" /> platekondensator med sirkulære plater, fylt med luft, skal brukes
          i en krets hvor spenningen kan bli opptil <InlineLatex latex="1{,}00 \cdot 10^{2}\;\text{V}" />. E-feltet
          mellom platene skal <strong>ikke overstige</strong> <InlineLatex latex="1{,}00 \cdot 10^{4}\;\text{N/C}" />.
        </p>
        <p>a) Finn plateavstanden <InlineLatex latex="d" /> og platens radius <InlineLatex latex="r" /> slik at kravene er oppfylt.</p>
        <p>b) Finn maksimal ladning platene kan holde.</p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>Kapasitans: <InlineLatex latex="C = 5{,}00\;\text{pF} = 5{,}00 \cdot 10^{-12}\;\text{F}" /></li>
        <li>Maksimal spenning: <InlineLatex latex="V_\text{max} = 1{,}00 \cdot 10^{2}\;\text{V}" /></li>
        <li>Maksimalt E-felt: <InlineLatex latex="E_\text{max} = 1{,}00 \cdot 10^{4}\;\text{V/m}" /></li>
        <li>Luft mellom plater (≈ vakuum): <InlineLatex latex="\varepsilon_0 = 8{,}854 \cdot 10^{-12}\;\text{F/m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Plateavstand <InlineLatex latex="d" /> og radius <InlineLatex latex="r" /></li>
        <li>b) Maksimal ladning <InlineLatex latex="Q_\text{max}" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Feltkravet setter minste tillatte avstand: <InlineLatex latex="E_\text{max} = V_\text{max}/d" /> gir{" "}
        <InlineLatex latex="d = V_\text{max}/E_\text{max}" />. Kapasitanskravet bestemmer deretter arealet via{" "}
        <InlineLatex latex="C = \varepsilon_0 \pi r^2/d" />. Maksimal ladning følger av{" "}
        <InlineLatex latex="Q_\text{max} = C V_\text{max}" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Tenk i rekkefølge: E-feltet bestemmer d, så bestemmer d sammen med C arealet.</p> },
      { label: "Hint 2", content: <p>For sirkulær plate: <InlineLatex latex="A = \pi r^2 \Rightarrow r = \sqrt{A/\pi}" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Finn minste plateavstand fra E-feltskravet.</strong></p>
        <FormulaBox
          latex="d = \frac{V_\text{max}}{E_\text{max}} = \frac{100}{1{,}00 \cdot 10^{4}} = 1{,}00 \cdot 10^{-2}\;\text{m} = 1{,}00\;\text{cm}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Finn nødvendig plateareal fra kapasitansen.</strong></p>
        <FormulaBox
          latex="A = \frac{C\,d}{\varepsilon_0} = \frac{(5{,}00 \cdot 10^{-12})(1{,}00 \cdot 10^{-2})}{8{,}854 \cdot 10^{-12}} = 5{,}65 \cdot 10^{-3}\;\text{m}^2"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: Radius.</strong></p>
        <FormulaBox
          latex="r = \sqrt{A/\pi} = \sqrt{(5{,}65 \cdot 10^{-3})/\pi} = 4{,}24 \cdot 10^{-2}\;\text{m} \approx 4{,}24\;\text{cm}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4: Maksimal ladning.</strong></p>
        <FormulaBox
          latex="Q_\text{max} = C V_\text{max} = (5{,}00 \cdot 10^{-12})(100) = 5{,}00 \cdot 10^{-10}\;\text{C} = 500\;\text{pC}"
          variant="blue"
        />

        <FormulaBox
          latex="d = \boxed{1{,}00\;\text{cm}},\quad r = \boxed{4{,}24\;\text{cm}},\quad Q_\text{max} = \boxed{500\;\text{pC}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Design-oppgave: start med ytelseskravet (feltet) for å fastsette d, deretter bruk kapasitansformelen for å finne
        nødvendig areal. Radius på ca. 4 cm for bare 5 pF viser hvorfor lave kapasitanser er lett å realisere i luft.
      </p>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Seksjon 24.2 — Kondensatorer i serie og parallell
  // ═══════════════════════════════════════════════════════════════════════

  "24.14": {
    title: "Firekondensator-nettverk — ekvivalent kapasitans og ladning",
    difficulty: "middels",
    pageRef: "s. 834",
    problem: (
      <div className="space-y-2">
        <p>
          Figuren viser et system av fire kondensatorer, der potensialforskjellen over ab er{" "}
          <InlineLatex latex="50{,}0\;\text{V}" />.
        </p>
        <p>a) Finn ekvivalent kapasitans mellom a og b.</p>
        <p>b) Hvor mye ladning er lagret i denne kombinasjonen av kondensatorer?</p>
        <p>c) Hvor mye ladning er lagret i hver av <InlineLatex latex="10{,}0\;\mu\text{F}" /> og <InlineLatex latex="9{,}0\;\mu\text{F}" />-kondensatorene?</p>
        <Svg2414 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_{10} = 10{,}0\;\mu\text{F}" /> (til venstre, i serie)</li>
        <li><InlineLatex latex="C_5 = 5{,}0\;\mu\text{F}" /> og <InlineLatex latex="C_8 = 8{,}0\;\mu\text{F}" /> (i parallell, i midten)</li>
        <li><InlineLatex latex="C_9 = 9{,}0\;\mu\text{F}" /> (til høyre, i serie)</li>
        <li>Spenning: <InlineLatex latex="V_{ab} = 50{,}0\;\text{V}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Ekvivalent kapasitans <InlineLatex latex="C_{ab}" /></li>
        <li>b) Total ladning i nettverket</li>
        <li>c) Ladning på <InlineLatex latex="C_{10}" /> og <InlineLatex latex="C_9" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Start innerst: <InlineLatex latex="C_5" /> og <InlineLatex latex="C_8" /> er i parallell, så{" "}
        <InlineLatex latex="C_\text{par} = C_5 + C_8" />. Deretter er <InlineLatex latex="C_{10}" />,{" "}
        <InlineLatex latex="C_\text{par}" /> og <InlineLatex latex="C_9" /> i serie. Serie-regelen adderer inversene.
        I serie er ladningen lik på alle kondensatorer, derfor er Q for <InlineLatex latex="C_{10}" /> og{" "}
        <InlineLatex latex="C_9" /> lik total Q.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Parallellen (5 + 8 μF) fungerer som én kondensator i serie med de to andre.</p> },
      { label: "Hint 2", content: <p>I serie: <InlineLatex latex="1/C_\text{tot} = 1/C_{10} + 1/C_\text{par} + 1/C_9" />.</p> },
      { label: "Hint 3", content: <p>Samme ladning flyter gjennom serie-leddene. <InlineLatex latex="Q_{10} = Q_9 = Q_\text{tot} = C_\text{tot}\,V_{ab}" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Parallell-kombinasjon i midten.</strong></p>
        <FormulaBox
          latex="C_\text{par} = C_5 + C_8 = 5{,}0 + 8{,}0 = 13{,}0\;\mu\text{F}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Serie-kombinasjon av <InlineLatex latex="C_{10}" />, <InlineLatex latex="C_\text{par}" /> og <InlineLatex latex="C_9" />.</strong></p>
        <FormulaBox
          latex="\frac{1}{C_{ab}} = \frac{1}{10{,}0} + \frac{1}{13{,}0} + \frac{1}{9{,}0} \;[\mu\text{F}^{-1}]"
          variant="blue"
        />
        <FormulaBox
          latex="\frac{1}{C_{ab}} = 0{,}1000 + 0{,}0769 + 0{,}1111 = 0{,}2880\;\mu\text{F}^{-1}"
          variant="blue"
        />
        <FormulaBox
          latex="C_{ab} = \frac{1}{0{,}2880} \approx 3{,}47\;\mu\text{F}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: Total ladning.</strong></p>
        <FormulaBox
          latex="Q_\text{tot} = C_{ab}\,V_{ab} = (3{,}47 \cdot 10^{-6})(50{,}0) = 1{,}74 \cdot 10^{-4}\;\text{C} = 174\;\mu\text{C}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4: Ladning på <InlineLatex latex="C_{10}" /> og <InlineLatex latex="C_9" />.</strong></p>
        <p className="text-sm">I serie er ladningen lik — hele <InlineLatex latex="Q_\text{tot}" /> går gjennom hvert serie-ledd:</p>
        <FormulaBox
          latex="Q_{10} = Q_9 = Q_\text{tot} \approx 174\;\mu\text{C}"
          variant="blue"
        />

        <FormulaBox
          latex="C_{ab} = \boxed{3{,}47\;\mu\text{F}},\quad Q_\text{tot} = \boxed{174\;\mu\text{C}},\quad Q_{10} = Q_9 = \boxed{174\;\mu\text{C}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Nettverks-strategien er alltid: identifiser rent parallell- eller serie-grupper, reduser til én ekvivalent
        kondensator, jobb deg utover. I serie har alle samme ladning, i parallell har alle samme spenning — dette er
        nøkkelen til å finne Q og V for enkeltkondensatorene.
      </p>
    ),
  },

  "24.21": {
    title: "Blandet nettverk — fem kondensatorer",
    difficulty: "vanskelig",
    pageRef: "s. 834",
    problem: (
      <div className="space-y-2">
        <p>
          For systemet av kondensatorer i figuren er en potensialforskjell på{" "}
          <InlineLatex latex="25\;\text{V}" /> opprettholdt over ab.
        </p>
        <p>a) Hva er ekvivalent kapasitans mellom a og b?</p>
        <p>b) Hvor mye ladning er lagret i systemet?</p>
        <p>c) Hvor mye ladning lagrer <InlineLatex latex="6{,}5\;\text{nF}" />-kondensatoren?</p>
        <p>d) Hva er potensialforskjellen over <InlineLatex latex="7{,}5\;\text{nF}" />-kondensatoren?</p>
        <Svg2421 />
        <p className="text-sm text-[var(--muted)]">
          Topologi iflg. bok: <InlineLatex latex="18{,}0\;\text{nF}" /> i serie med parallell-gruppen{" "}
          <InlineLatex latex="30{,}0\parallel 6{,}5\;\text{nF}" />, denne hele i serie med{" "}
          <InlineLatex latex="10{,}0\;\text{nF}" />, som igjen står i parallell med{" "}
          <InlineLatex latex="7{,}5\;\text{nF}" />.
        </p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_1 = 18{,}0\;\text{nF}" /></li>
        <li><InlineLatex latex="C_2 = 30{,}0\;\text{nF}" /></li>
        <li><InlineLatex latex="C_3 = 6{,}5\;\text{nF}" /> (i parallell med <InlineLatex latex="C_2" />)</li>
        <li><InlineLatex latex="C_4 = 10{,}0\;\text{nF}" /></li>
        <li><InlineLatex latex="C_5 = 7{,}5\;\text{nF}" /></li>
        <li><InlineLatex latex="V_{ab} = 25\;\text{V}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Ekvivalent kapasitans <InlineLatex latex="C_{ab}" /></li>
        <li>b) Total ladning</li>
        <li>c) Ladning på <InlineLatex latex="C_3" /></li>
        <li>d) Spenning over <InlineLatex latex="C_5" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Redusér innenfra: (1) <InlineLatex latex="C_2 \parallel C_3" /> gir{" "}
        <InlineLatex latex="C_\text{midt}" />. (2) Serie-gruppen <InlineLatex latex="C_1, C_\text{midt}, C_4" /> gir{" "}
        <InlineLatex latex="C_\text{ser}" />. (3) <InlineLatex latex="C_\text{ser}" /> parallell med{" "}
        <InlineLatex latex="C_5" /> gir <InlineLatex latex="C_{ab}" />. Deretter jobber vi oss tilbake: spenningen over{" "}
        <InlineLatex latex="C_5" /> er hele <InlineLatex latex="V_{ab}" /> (parallell). Ladningen i serie-grenen deles
        ved parallell-noden etter forholdet mellom <InlineLatex latex="C_2" /> og <InlineLatex latex="C_3" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Reduser trinnvis: parallell (30 + 6,5), så serie (18, sum, 10), så parallell med 7,5.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="C_5" /> står direkte mellom a og b, så spenningen er lik <InlineLatex latex="V_{ab}" />.</p> },
      { label: "Hint 3", content: <p>Serie-grenen har en felles ladning <InlineLatex latex="Q_\text{ser}" />. Ved parallell-noden deler denne seg:{" "} <InlineLatex latex="Q_3/Q_\text{ser} = C_3/(C_2+C_3)" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Parallell <InlineLatex latex="C_2 \parallel C_3" />.</strong></p>
        <FormulaBox
          latex="C_\text{midt} = C_2 + C_3 = 30{,}0 + 6{,}5 = 36{,}5\;\text{nF}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Serie av <InlineLatex latex="C_1, C_\text{midt}, C_4" />.</strong></p>
        <FormulaBox
          latex="\frac{1}{C_\text{ser}} = \frac{1}{18{,}0} + \frac{1}{36{,}5} + \frac{1}{10{,}0} = 0{,}05556 + 0{,}02740 + 0{,}10000 = 0{,}18296\;\text{nF}^{-1}"
          variant="blue"
        />
        <FormulaBox
          latex="C_\text{ser} = \frac{1}{0{,}18296} \approx 5{,}47\;\text{nF}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: Parallell med <InlineLatex latex="C_5" /> gir <InlineLatex latex="C_{ab}" />.</strong></p>
        <FormulaBox
          latex="C_{ab} = C_\text{ser} + C_5 = 5{,}47 + 7{,}5 = 12{,}97\;\text{nF} \approx 13{,}0\;\text{nF}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4: Total ladning.</strong></p>
        <FormulaBox
          latex="Q_\text{tot} = C_{ab}\,V_{ab} = (12{,}97 \cdot 10^{-9})(25) = 3{,}24 \cdot 10^{-7}\;\text{C} \approx 324\;\text{nC}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 5: Ladning og spenning i serie-grenen.</strong></p>
        <FormulaBox
          latex="Q_\text{ser} = C_\text{ser}\,V_{ab} = (5{,}47 \cdot 10^{-9})(25) = 1{,}37 \cdot 10^{-7}\;\text{C} \approx 137\;\text{nC}"
          variant="blue"
        />
        <p className="text-sm">Denne ladningen går gjennom hvert ledd i serien, også inn i parallellen <InlineLatex latex="C_2\parallel C_3" />. Spenningen over parallellen:</p>
        <FormulaBox
          latex="V_\text{midt} = \frac{Q_\text{ser}}{C_\text{midt}} = \frac{137}{36{,}5} \approx 3{,}75\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 6: Ladning på <InlineLatex latex="C_3" />.</strong></p>
        <FormulaBox
          latex="Q_3 = C_3\,V_\text{midt} = (6{,}5 \cdot 10^{-9})(3{,}75) \approx 2{,}44 \cdot 10^{-8}\;\text{C} = 24{,}4\;\text{nC}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 7: Spenning over <InlineLatex latex="C_5" />.</strong></p>
        <p className="text-sm"><InlineLatex latex="C_5" /> står direkte mellom a og b (parallell med hele serie-grenen):</p>
        <FormulaBox
          latex="V_5 = V_{ab} = 25\;\text{V}"
          variant="blue"
        />

        <FormulaBox
          latex="C_{ab} = \boxed{13{,}0\;\text{nF}},\quad Q_\text{tot} = \boxed{324\;\text{nC}},\quad Q_3 = \boxed{24{,}4\;\text{nC}},\quad V_5 = \boxed{25\;\text{V}}"
          variant="gold"
        />
      </div>
    ),
    alternativeSolution: (
      <p className="text-sm">
        Et raskt sjekk-triks: etter man har funnet <InlineLatex latex="Q_\text{ser}" />, kan man verifisere ved å regne
        spenningene over alle tre serie-leddene og se at de summeres til{" "}
        <InlineLatex latex="V_{ab}" />: <InlineLatex latex="V_1 = Q/C_1 = 137/18 \approx 7{,}61\;\text{V}" />,{" "}
        <InlineLatex latex="V_\text{midt} \approx 3{,}75\;\text{V}" />, <InlineLatex latex="V_4 = 137/10 = 13{,}7\;\text{V}" />.{" "}
        Sum <InlineLatex latex="\approx 25{,}1\;\text{V}" />, som avviker kun pga avrunding.
      </p>
    ),
    summary: (
      <p className="text-sm">
        I komplekse nettverk er «reduser innenfra og utover» alltid strategien. Husk å skille mellom{" "}
        <em>totalladning i serie-gren</em> (felles Q) og <em>ladningsdeling i en parallell</em> (Q fordeles etter C).
      </p>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Seksjon 24.3 — Energi i kondensatorer
  // ═══════════════════════════════════════════════════════════════════════

  "24.23": {
    title: "Energitetthet mellom plater",
    difficulty: "lett",
    pageRef: "s. 835",
    problem: (
      <div className="space-y-2">
        <p>
          En <InlineLatex latex="5{,}80\;\mu\text{F}" /> luftkondensator med plateavstand{" "}
          <InlineLatex latex="5{,}00\;\text{mm}" /> er ladet opp til en potensialforskjell på{" "}
          <InlineLatex latex="400\;\text{V}" />. Regn ut energitettheten i området mellom platene, i J/m³.
        </p>
        <PlatekondensatorSVG label="Uniformt E-felt ⇒ uniform energitetthet u" />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C = 5{,}80\;\mu\text{F} = 5{,}80 \cdot 10^{-6}\;\text{F}" /></li>
        <li><InlineLatex latex="d = 5{,}00\;\text{mm} = 5{,}00 \cdot 10^{-3}\;\text{m}" /></li>
        <li><InlineLatex latex="V = 400\;\text{V}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>Energitetthet <InlineLatex latex="u" /> i området mellom platene</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        I et uniformt elektrisk felt i vakuum er energitettheten{" "}
        <InlineLatex latex="u = \tfrac{1}{2}\varepsilon_0 E^2" />. Feltet får vi fra{" "}
        <InlineLatex latex="E = V/d" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Finn E først: <InlineLatex latex="E = V/d" />.</p> },
      { label: "Hint 2", content: <p>Bruk <InlineLatex latex="u = \tfrac{1}{2}\varepsilon_0 E^2" />. Enhet: J/m³.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: E-feltet.</strong></p>
        <FormulaBox
          latex="E = \frac{V}{d} = \frac{400}{5{,}00 \cdot 10^{-3}} = 8{,}00 \cdot 10^{4}\;\text{V/m}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Energitetthet.</strong></p>
        <FormulaBox
          latex="u = \tfrac{1}{2}\varepsilon_0 E^2 = \tfrac{1}{2}(8{,}854 \cdot 10^{-12})(8{,}00 \cdot 10^{4})^2"
          variant="blue"
        />
        <FormulaBox
          latex="u = \tfrac{1}{2}(8{,}854 \cdot 10^{-12})(6{,}40 \cdot 10^{9}) = 2{,}83 \cdot 10^{-2}\;\text{J/m}^3"
          variant="blue"
        />

        <FormulaBox
          latex="u = \boxed{2{,}83 \cdot 10^{-2}\;\text{J/m}^3}"
          variant="gold"
        />

        <p className="text-sm text-[var(--muted)]">
          (Merk: kapasitansverdien <InlineLatex latex="5{,}80\;\mu\text{F}" /> er ikke nødvendig for svaret — den
          bestemmer <em>hvor mye</em> energi som er lagret totalt, men <em>energitettheten</em> er bare en funksjon av E.)
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Energitettheten <InlineLatex latex="u = \tfrac{1}{2}\varepsilon_0 E^2" /> er en ren feltgrøße. Hvor som helst i
        rommet det finnes elektrisk felt, finnes det energi — selv der det ikke er ladninger. I en platekondensator er
        feltet uniformt, så energien er jevnt fordelt i volumet Ad.
      </p>
    ),
  },

  "24.25": {
    title: "Luftkondensator — kapasitans, areal, maks-spenning og energi",
    difficulty: "middels",
    pageRef: "s. 835",
    problem: (
      <div className="space-y-2">
        <p>
          En luftkondensator er laget av to flate parallelle plater, <InlineLatex latex="1{,}50\;\text{mm}" /> fra
          hverandre. Størrelsen på ladningen på hver plate er <InlineLatex latex="0{,}0180\;\mu\text{C}" /> når
          potensialforskjellen er <InlineLatex latex="200\;\text{V}" />.
        </p>
        <p>a) Hva er kapasitansen?</p>
        <p>b) Hva er arealet av hver plate?</p>
        <p>c) Hvilken maksimal spenning kan legges over uten gjennomslag? (Gjennomslag i luft: <InlineLatex latex="E = 3{,}0 \cdot 10^{6}\;\text{V/m}" />)</p>
        <p>d) Når ladningen er <InlineLatex latex="0{,}0180\;\mu\text{C}" />, hvor mye energi er lagret totalt?</p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="d = 1{,}50\;\text{mm} = 1{,}50 \cdot 10^{-3}\;\text{m}" /></li>
        <li><InlineLatex latex="Q = 0{,}0180\;\mu\text{C} = 1{,}80 \cdot 10^{-8}\;\text{C}" /></li>
        <li><InlineLatex latex="V = 200\;\text{V}" /></li>
        <li><InlineLatex latex="E_\text{maks,luft} = 3{,}0 \cdot 10^{6}\;\text{V/m}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Kapasitans <InlineLatex latex="C" /></li>
        <li>b) Plateareal <InlineLatex latex="A" /></li>
        <li>c) Maksimal spenning <InlineLatex latex="V_\text{max}" /></li>
        <li>d) Lagret energi <InlineLatex latex="U" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        (a) <InlineLatex latex="C = Q/V" />. (b) <InlineLatex latex="A = Cd/\varepsilon_0" />. (c) Gjennomslagskravet gir
        <InlineLatex latex="V_\text{max} = E_\text{maks}\,d" />. (d) Energi kan regnes på flere måter — her{" "}
        <InlineLatex latex="U = \tfrac{1}{2}QV" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="C = Q/V" /> gir svar nærmest umiddelbart.</p> },
      { label: "Hint 2", content: <p>Gjennomslagsgrensen er en begrensning på E, ikke direkte på V — men V_max = E_max · d.</p> },
      { label: "Hint 3", content: <p>Tre ekvivalente energiformler: <InlineLatex latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}QV = Q^2/(2C)" />. Velg den som passer data.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1 (a): Kapasitansen.</strong></p>
        <FormulaBox
          latex="C = \frac{Q}{V} = \frac{1{,}80 \cdot 10^{-8}}{200} = 9{,}00 \cdot 10^{-11}\;\text{F} = 90{,}0\;\text{pF}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (b): Plateareal.</strong></p>
        <FormulaBox
          latex="A = \frac{Cd}{\varepsilon_0} = \frac{(9{,}00 \cdot 10^{-11})(1{,}50 \cdot 10^{-3})}{8{,}854 \cdot 10^{-12}} \approx 1{,}52 \cdot 10^{-2}\;\text{m}^2"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3 (c): Maksimal spenning før gjennomslag.</strong></p>
        <FormulaBox
          latex="V_\text{max} = E_\text{maks}\,d = (3{,}0 \cdot 10^{6})(1{,}50 \cdot 10^{-3}) = 4500\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4 (d): Lagret energi ved ladning 0,0180 μC.</strong></p>
        <FormulaBox
          latex="U = \tfrac{1}{2}QV = \tfrac{1}{2}(1{,}80 \cdot 10^{-8})(200) = 1{,}80 \cdot 10^{-6}\;\text{J} = 1{,}80\;\mu\text{J}"
          variant="blue"
        />

        <FormulaBox
          latex="C = \boxed{90{,}0\;\text{pF}},\; A = \boxed{1{,}52 \cdot 10^{-2}\;\text{m}^2},\; V_\text{max} = \boxed{4500\;\text{V}},\; U = \boxed{1{,}80\;\mu\text{J}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Luft har en gjennomslagsgrense på ca. 3 MV/m. Derfor setter avstanden d den absolutte maksimale spenningen. For
        å lagre mer energi må enten d økes (reduserer C) eller et dielektrikum med høyere gjennomslagsstyrke brukes.
      </p>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Seksjon 24.4 — Dielektrika
  // ═══════════════════════════════════════════════════════════════════════

  "24.31": {
    title: "Dielektrikum settes inn mens batteri er tilkoblet",
    difficulty: "middels",
    pageRef: "s. 835",
    problem: (
      <div className="space-y-2">
        <p>
          En <InlineLatex latex="12{,}0\;\mu\text{F}" /> kondensator er koblet til en spenningskilde som holder en
          konstant potensialforskjell på <InlineLatex latex="26{,}0\;\text{V}" /> mellom platene. Et materiale med
          dielektrisk konstant <InlineLatex latex="K = 3{,}65" /> settes mellom platene og fyller rommet fullstendig.
        </p>
        <p>a) Hvor mye energi er lagret før og etter dielektrikumet settes inn?</p>
        <p>b) Hvor mye endret energien seg under innsettingen? Økte eller minket den?</p>
        <PlatekondensatorSVG withDielectric label="Dielektrikum fyller volumet, batteri tilkoblet ⇒ V konstant" />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_0 = 12{,}0\;\mu\text{F}" /></li>
        <li><InlineLatex latex="V = 26{,}0\;\text{V}" /> (konstant — batteri tilkoblet)</li>
        <li><InlineLatex latex="K = 3{,}65" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Energi før <InlineLatex latex="U_0" /> og etter <InlineLatex latex="U" /></li>
        <li>b) Endring <InlineLatex latex="\Delta U = U - U_0" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        V er konstant. Da er <InlineLatex latex="C = K C_0" /> og <InlineLatex latex="U = \tfrac{1}{2}CV^2" /> gir{" "}
        <InlineLatex latex="U = K\,U_0" /> — energien øker. Grunnen er at batteriet gjør positivt arbeid ved å pumpe mer
        ladning inn på platene når C øker.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Batteriet tilkoblet ⇒ V er fast. Da endres C (og derfor Q og U).</p> },
      { label: "Hint 2", content: <p>Med V fast: <InlineLatex latex="U = \tfrac{1}{2}CV^2 \propto C" />, så <InlineLatex latex="U = K\,U_0" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Energi før.</strong></p>
        <FormulaBox
          latex="U_0 = \tfrac{1}{2}C_0 V^2 = \tfrac{1}{2}(12{,}0 \cdot 10^{-6})(26{,}0)^2 = \tfrac{1}{2}(12{,}0 \cdot 10^{-6})(676) = 4{,}06 \cdot 10^{-3}\;\text{J}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2: Ny kapasitans etter innsetting.</strong></p>
        <FormulaBox
          latex="C = K\,C_0 = 3{,}65 \cdot 12{,}0 = 43{,}8\;\mu\text{F}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: Energi etter (V konstant).</strong></p>
        <FormulaBox
          latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}(43{,}8 \cdot 10^{-6})(26{,}0)^2 = 1{,}48 \cdot 10^{-2}\;\text{J}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4: Endring.</strong></p>
        <FormulaBox
          latex="\Delta U = U - U_0 = 1{,}48 \cdot 10^{-2} - 4{,}06 \cdot 10^{-3} = 1{,}07 \cdot 10^{-2}\;\text{J}"
          variant="blue"
        />
        <p className="text-sm">Energien <strong>øker</strong>. Batteriet leverer energi (K − 1)U₀ til kondensatoren pluss like mye som tas ut av dielektrikumet i form av arbeid (totalt sett kommer alt fra batteriet).</p>

        <FormulaBox
          latex="U_0 = \boxed{4{,}06\;\text{mJ}},\quad U = \boxed{14{,}8\;\text{mJ}},\quad \Delta U = \boxed{+10{,}7\;\text{mJ}}\text{ (økning)}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        <strong>V konstant-regelen:</strong> C, Q og U vokser alle med faktoren K. Dette er intuitivt — batteriet gjør
        jobben med å pumpe mer ladning inn når kondensatoren «får plass» til mer ladning per volt. Motsatt scenario (Q
        konstant) ville gitt <InlineLatex latex="U \to U_0/K" />.
      </p>
    ),
  },

  "24.32": {
    title: "Maks ladning før gjennomslag — med og uten dielektrikum",
    difficulty: "lett",
    pageRef: "s. 835",
    problem: (
      <div className="space-y-2">
        <p>
          En platekondensator har kapasitans <InlineLatex latex="C_0 = 5{,}20\;\text{pF}" /> med luft mellom platene.
          Plateavstanden er <InlineLatex latex="1{,}70\;\text{mm}" />.
        </p>
        <p>
          a) Hva er den maksimale ladningen <InlineLatex latex="Q" /> som kan ligge på hver plate hvis E-feltet i
          området ikke skal overstige <InlineLatex latex="3{,}00 \cdot 10^{4}\;\text{V/m}" />?
        </p>
        <p>
          b) Et dielektrikum med <InlineLatex latex="K = 3{,}10" /> settes inn og fyller volumet. Hva er nå maksimal
          ladning på hver plate hvis E-feltet fortsatt ikke skal overstige{" "}
          <InlineLatex latex="3{,}00 \cdot 10^{4}\;\text{V/m}" />?
        </p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_0 = 5{,}20\;\text{pF}" /></li>
        <li><InlineLatex latex="d = 1{,}70\;\text{mm} = 1{,}70 \cdot 10^{-3}\;\text{m}" /></li>
        <li><InlineLatex latex="E_\text{max} = 3{,}00 \cdot 10^{4}\;\text{V/m}" /></li>
        <li><InlineLatex latex="K = 3{,}10" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) <InlineLatex latex="Q_\text{max}" /> i luft</li>
        <li>b) <InlineLatex latex="Q_\text{max}" /> med dielektrikum</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        E-grensen gir maksimal V: <InlineLatex latex="V_\text{max} = E_\text{max}\,d" />. I luft er{" "}
        <InlineLatex latex="Q_0 = C_0 V_\text{max}" />. Med dielektrikum blir <InlineLatex latex="C = KC_0" />, og da{" "}
        <InlineLatex latex="Q = C V_\text{max} = K Q_0" />. Dielektrikumet øker dermed ladningskapasiteten med faktoren K
        ved samme E-felt.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Ved gitt E-felt er V fast: <InlineLatex latex="V_\text{max} = E d" />, uavhengig av K.</p> },
      { label: "Hint 2", content: <p>Dielektrikum ganger kapasitansen med K, så ladningen også — ved samme V.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Maksimal V før gjennomslag.</strong></p>
        <FormulaBox
          latex="V_\text{max} = E_\text{max}\,d = (3{,}00 \cdot 10^{4})(1{,}70 \cdot 10^{-3}) = 51{,}0\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (a): Ladning i luft.</strong></p>
        <FormulaBox
          latex="Q_0 = C_0 V_\text{max} = (5{,}20 \cdot 10^{-12})(51{,}0) = 2{,}65 \cdot 10^{-10}\;\text{C} = 265\;\text{pC}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3 (b): Ladning med dielektrikum.</strong></p>
        <FormulaBox
          latex="C = K C_0 = 3{,}10 \cdot 5{,}20 = 16{,}1\;\text{pF}"
          variant="blue"
        />
        <FormulaBox
          latex="Q = C V_\text{max} = (16{,}1 \cdot 10^{-12})(51{,}0) = 8{,}22 \cdot 10^{-10}\;\text{C} = 822\;\text{pC}"
          variant="blue"
        />
        <p className="text-sm text-[var(--muted)]">Sjekk: <InlineLatex latex="Q = K Q_0 = 3{,}10 \cdot 265 \approx 822\;\text{pC}\;\checkmark" /></p>

        <FormulaBox
          latex="Q_{0,\text{maks}} = \boxed{2{,}65 \cdot 10^{-10}\;\text{C}},\quad Q_\text{maks} = \boxed{8{,}22 \cdot 10^{-10}\;\text{C}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Dielektrikumet lar kondensatoren holde K ganger så mye ladning ved samme E-felt (og samme V). Dette er grunnen
        til at kondensatorer i elektronikk nesten alltid har dielektrikum — det skviser mer kapasitet ut av mindre
        volum uten å forverre gjennomslagsrisikoen.
      </p>
    ),
  },

  "24.39": {
    title: "Mylar-skive — ekstra ladning, indusert ladning, E-felt",
    difficulty: "middels",
    pageRef: "s. 836",
    problem: (
      <div className="space-y-2">
        <p>
          En konstant potensialforskjell på <InlineLatex latex="12\;\text{V}" /> opprettholdes mellom terminalene på en{" "}
          <InlineLatex latex="0{,}25\;\mu\text{F}" /> luftkondensator med plate.
        </p>
        <p>
          a) Et ark Mylar (<InlineLatex latex="K = 3{,}1" /> iflg. Tabell 24.1) settes inn mellom platene og fyller
          rommet. Hvor mye ekstra ladning strømmer inn på den positive platen av kondensatoren?
        </p>
        <p>b) Hva er totalt indusert ladning på hver side av Mylar-arket?</p>
        <p>c) Hvilken effekt har Mylar-arket på E-feltet mellom platene? Forklar hvordan dette er forenlig med økningen i ladning.</p>
        <PlatekondensatorSVG withDielectric label="Mylar fyller rommet, V konstant = 12 V" />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_0 = 0{,}25\;\mu\text{F} = 2{,}5 \cdot 10^{-7}\;\text{F}" /></li>
        <li><InlineLatex latex="V = 12\;\text{V}" /> (konstant)</li>
        <li>Mylar: <InlineLatex latex="K = 3{,}1" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Ekstra ladning <InlineLatex latex="\Delta Q" /> fra batteriet</li>
        <li>b) Indusert ladning <InlineLatex latex="Q_i" /> på dielektrikumets flater</li>
        <li>c) Endring i E-felt mellom platene</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        V konstant ⇒ <InlineLatex latex="Q = CV" /> øker fra <InlineLatex latex="Q_0 = C_0 V" /> til{" "}
        <InlineLatex latex="Q = K C_0 V" />. Differansen pumpes av batteriet. Indusert ladning på dielektrikumet er{" "}
        <InlineLatex latex="Q_i = Q(1-1/K)" />. E-feltet er uavhengig av K siden <InlineLatex latex="E = V/d" /> og både V
        og d er uendret — dette balanseres av at den induserte (motsatte) ladningen på dielektrikumet nøyaktig
        kansellerer ekstraladningen.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="Q_0 = C_0 V" />, <InlineLatex latex="Q = K C_0 V" />. Ekstra ladning er differansen.</p> },
      { label: "Hint 2", content: <p>Indusert ladning: <InlineLatex latex="Q_i = Q\left(1 - \tfrac{1}{K}\right)" />.</p> },
      { label: "Hint 3", content: <p>V fast og d fast ⇒ E fast. Ekstra fri ladning motvirkes eksakt av den induserte ladningen.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1 (a): Startladning og ny ladning.</strong></p>
        <FormulaBox
          latex="Q_0 = C_0 V = (2{,}5 \cdot 10^{-7})(12) = 3{,}0 \cdot 10^{-6}\;\text{C} = 3{,}0\;\mu\text{C}"
          variant="blue"
        />
        <FormulaBox
          latex="Q = K C_0 V = 3{,}1 \cdot 3{,}0\;\mu\text{C} = 9{,}3\;\mu\text{C}"
          variant="blue"
        />
        <FormulaBox
          latex="\Delta Q = Q - Q_0 = 9{,}3 - 3{,}0 = 6{,}3\;\mu\text{C}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (b): Indusert ladning på Mylar-flatene.</strong></p>
        <FormulaBox
          latex="Q_i = Q\left(1 - \frac{1}{K}\right) = 9{,}3 \cdot 10^{-6}\left(1 - \frac{1}{3{,}1}\right) = 9{,}3 \cdot 10^{-6} \cdot 0{,}6774 = 6{,}3\;\mu\text{C}"
          variant="blue"
        />
        <p className="text-sm text-[var(--muted)]">
          Merk sammentreffet: <InlineLatex latex="\Delta Q = Q_i" />. Dette er ingen tilfeldighet — den ekstra frie
          ladningen må eksakt motsvares av indusert bundet ladning for at E-feltet skal bli uendret.
        </p>

        <p className="text-sm"><strong>Steg 3 (c): E-feltet.</strong></p>
        <FormulaBox
          latex="E = V/d\;\;\text{— både før og etter (V og d er uendret)}"
          variant="blue"
        />
        <p className="text-sm">
          E-feltet mellom platene er uendret. Dette stemmer overens med økningen i ladning fordi den induserte ladningen på
          dielektrikumets flater (motsatt fortegn av nærmeste plate) nøyaktig kansellerer bidraget fra den ekstra frie
          ladningen. Netto: samme E som før.
        </p>

        <FormulaBox
          latex="\Delta Q = \boxed{6{,}3\;\mu\text{C}},\quad Q_i = \boxed{6{,}3\;\mu\text{C}},\quad E\;\text{uendret}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Dette er én av de mest lærerike oppgavene for dielektrika. Poenget er å skille mellom <strong>fri ladning</strong>{" "}
        (på platene, øker med K) og <strong>indusert (bundet) ladning</strong> (på dielektrikumets overflate, motsatt
        fortegn av nærmeste plate). Når V og d er uendret, er E uendret — akkurat som Gauss (i dielektrikum-form) krever.
      </p>
    ),
  },

  "24.42": {
    title: "Bestem K, spenning og E-felt — sirkulær platekondensator",
    difficulty: "middels",
    pageRef: "s. 836",
    problem: (
      <div className="space-y-2">
        <p>
          En platekondensator har kapasitans <InlineLatex latex="C = 12{,}5\;\text{pF}" /> når volumet mellom platene er
          fylt med luft. Platene er sirkulære med radius <InlineLatex latex="3{,}00\;\text{cm}" />. Kondensatoren kobles
          til et batteri, og en ladning av størrelse <InlineLatex latex="25{,}0\;\text{pC}" /> ender opp på hver plate.
          Mens kondensatoren fortsatt er koblet til batteriet, settes en plate dielektrikum inn mellom platene og fyller
          rommet helt. Etter innsettingen har ladningen på hver plate en størrelse på{" "}
          <InlineLatex latex="45{,}0\;\text{pC}" />.
        </p>
        <p>a) Hva er den dielektriske konstanten K?</p>
        <p>b) Hva er potensialforskjellen mellom platene før og etter innsetting?</p>
        <p>c) Hva er E-feltet midt mellom platene før og etter innsetting?</p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_0 = 12{,}5\;\text{pF}" /></li>
        <li><InlineLatex latex="r = 3{,}00\;\text{cm} = 3{,}00 \cdot 10^{-2}\;\text{m}" /></li>
        <li><InlineLatex latex="Q_0 = 25{,}0\;\text{pC}" /> (før)</li>
        <li><InlineLatex latex="Q = 45{,}0\;\text{pC}" /> (etter — batteri fortsatt koblet til, V konstant)</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Dielektrisk konstant <InlineLatex latex="K" /></li>
        <li>b) Spenning før <InlineLatex latex="V_0" /> og etter <InlineLatex latex="V" /></li>
        <li>c) E-felt før og etter</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        V konstant ⇒ <InlineLatex latex="Q = KQ_0 \Rightarrow K = Q/Q_0" />. Spenningen er uendret:{" "}
        <InlineLatex latex="V = V_0 = Q_0/C_0" />. Plateavstand må vi finne fra geometri:{" "}
        <InlineLatex latex="d = \varepsilon_0 A/C_0" /> med <InlineLatex latex="A = \pi r^2" />. E-feltet er{" "}
        <InlineLatex latex="E = V/d" /> og er <em>uendret</em> av samme grunn som i 24.39.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>V fast ⇒ <InlineLatex latex="K = Q/Q_0" /> uten å regne noe annet.</p> },
      { label: "Hint 2", content: <p>Finn d fra <InlineLatex latex="C_0 = \varepsilon_0 \pi r^2/d" />.</p> },
      { label: "Hint 3", content: <p>E fast når V og d er fast. Dette virker kontraintuitivt med tanke på ladningsøkningen, men dielektrikumets induserte ladning kompenserer.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1 (a): Dielektrisk konstant.</strong></p>
        <p className="text-sm">Siden V er konstant, følger ladningen kapasitansen: <InlineLatex latex="Q/Q_0 = C/C_0 = K" />.</p>
        <FormulaBox
          latex="K = \frac{Q}{Q_0} = \frac{45{,}0}{25{,}0} = 1{,}80"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (b): Spenningen.</strong></p>
        <FormulaBox
          latex="V_0 = \frac{Q_0}{C_0} = \frac{25{,}0 \cdot 10^{-12}}{12{,}5 \cdot 10^{-12}} = 2{,}00\;\text{V}"
          variant="blue"
        />
        <p className="text-sm">V er uendret: <InlineLatex latex="V = V_0 = 2{,}00\;\text{V}" /> (batteriet holder det fast).</p>

        <p className="text-sm"><strong>Steg 3: Plateavstand.</strong></p>
        <FormulaBox
          latex="A = \pi r^2 = \pi (0{,}0300)^2 = 2{,}827 \cdot 10^{-3}\;\text{m}^2"
          variant="blue"
        />
        <FormulaBox
          latex="d = \frac{\varepsilon_0 A}{C_0} = \frac{(8{,}854 \cdot 10^{-12})(2{,}827 \cdot 10^{-3})}{12{,}5 \cdot 10^{-12}} = 2{,}00 \cdot 10^{-3}\;\text{m} = 2{,}00\;\text{mm}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4 (c): E-felt.</strong></p>
        <FormulaBox
          latex="E_0 = E = \frac{V}{d} = \frac{2{,}00}{2{,}00 \cdot 10^{-3}} = 1{,}00 \cdot 10^{3}\;\text{V/m}"
          variant="blue"
        />
        <p className="text-sm">E er uendret før og etter — fordi V og d er fast, og dielektrikumets induserte ladning kompenserer for den ekstra ladningen på platene.</p>

        <FormulaBox
          latex="K = \boxed{1{,}80},\quad V_0 = V = \boxed{2{,}00\;\text{V}},\quad E_0 = E = \boxed{1{,}00 \cdot 10^{3}\;\text{V/m}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Nok et godt eksempel på V-konstant-regimen: K leses direkte av ladningsforhold,{" "}
        <InlineLatex latex="K = Q/Q_0" />. Spenning og E er begge uendret — et fint kontrolleksperiment mot intuisjonen
        om at «mer ladning betyr sterkere felt». Fri ladning teller én gang, men bundet (indusert) ladning kansellerer
        en del av virkningen i dielektrikumet.
      </p>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Problems
  // ═══════════════════════════════════════════════════════════════════════

  "24.45": {
    title: "Kamera-blits — energi og kapasitans",
    difficulty: "lett",
    pageRef: "s. 836",
    problem: (
      <div className="space-y-2">
        <p>
          Elektroniske blitsenheter til kameraer inneholder en kondensator for å lagre energien som brukes til blitsen.
          I én slik enhet varer blitsen i <InlineLatex latex="1/675\;\text{s}" /> med en gjennomsnittlig lyseffekt på{" "}
          <InlineLatex latex="2{,}70 \cdot 10^{5}\;\text{W}" />.
        </p>
        <p>
          a) Hvis omformingen av elektrisk energi til lys er 95 % effektiv (resten går til termisk energi), hvor mye
          energi må lagres i kondensatoren for én blits?
        </p>
        <p>
          b) Kondensatoren har en potensialforskjell mellom platene på <InlineLatex latex="125\;\text{V}" /> når den
          lagrede energien er lik verdien i (a). Hva er kapasitansen?
        </p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>Blits-varighet: <InlineLatex latex="\Delta t = 1/675\;\text{s}" /></li>
        <li>Gjennomsnittlig lyseffekt: <InlineLatex latex="P_\text{lys} = 2{,}70 \cdot 10^{5}\;\text{W}" /></li>
        <li>Effektivitet: <InlineLatex latex="\eta = 0{,}95" /></li>
        <li>Spenning: <InlineLatex latex="V = 125\;\text{V}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Lagret energi <InlineLatex latex="U" /></li>
        <li>b) Kapasitans <InlineLatex latex="C" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Lysenergi = <InlineLatex latex="E_\text{lys} = P_\text{lys} \cdot \Delta t" />. Bare 95 % av kondensatorens
        energi ble lys, så lagret energi er <InlineLatex latex="U = E_\text{lys}/\eta" />. Deretter{" "}
        <InlineLatex latex="U = \tfrac{1}{2}CV^2 \Rightarrow C = 2U/V^2" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Regn først ut lysenergi per blits (P · Δt), så bruk η for å finne startenergi.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="C = 2U/V^2" />. Sjekk enhet: J/V² = F.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Lysenergi per blits.</strong></p>
        <FormulaBox
          latex="E_\text{lys} = P_\text{lys} \cdot \Delta t = (2{,}70 \cdot 10^{5}) \cdot \frac{1}{675} = 400\;\text{J}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (a): Lagret energi.</strong></p>
        <FormulaBox
          latex="U = \frac{E_\text{lys}}{\eta} = \frac{400}{0{,}95} \approx 421\;\text{J}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3 (b): Kapasitans.</strong></p>
        <FormulaBox
          latex="C = \frac{2U}{V^2} = \frac{2 \cdot 421}{(125)^2} = \frac{842}{15\,625} \approx 5{,}39 \cdot 10^{-2}\;\text{F} = 53{,}9\;\text{mF}"
          variant="blue"
        />

        <FormulaBox
          latex="U = \boxed{421\;\text{J}},\quad C = \boxed{53{,}9\;\text{mF}}"
          variant="gold"
        />

        <p className="text-sm text-[var(--muted)]">
          53,9 mF er en gigantisk kapasitans (typisk elektrolyttkondensator). Blitsenheten i et kamera må lagre mye
          energi over sekunder og slippe den ut på millisekunder — derav så store kapasitanser ved moderate spenninger.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Praktisk eksempel på energi i kondensatorer: store blits-kondensatorer lagrer hundrevis av joule og tømmer seg
        på et blunk. Fordi <InlineLatex latex="C = 2U/V^2" />, krever lav V (125 V) store C for å lagre mye energi.
      </p>
    ),
  },

  "24.47": {
    title: "Datamaskintastatur — kapasitiv føler",
    difficulty: "vanskelig",
    pageRef: "s. 836",
    problem: (
      <div className="space-y-2">
        <p>
          I én type datamaskintastatur holder hver tast en liten metallplate som tjener som den ene platen i en
          luftfylt platekondensator. Når tasten trykkes, minker plateavstanden og kapasitansen øker. Elektronisk
          kretselektronikk oppdager kapasitansforandringen og registrerer tastetrykket. I ett bestemt tastatur er
          arealet av hver metallplate <InlineLatex latex="42{,}0\;\text{mm}^2" />, og avstanden mellom platene er{" "}
          <InlineLatex latex="0{,}700\;\text{mm}" /> før tasten trykkes.
        </p>
        <p>a) Beregn kapasitansen før tasten trykkes.</p>
        <p>
          b) Hvis kretselektronikken kan oppdage en endring i kapasitans på <InlineLatex latex="0{,}250\;\text{pF}" />,
          hvor langt må tasten trykkes før kretsen registrerer trykket?
        </p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="A = 42{,}0\;\text{mm}^2 = 42{,}0 \cdot 10^{-6}\;\text{m}^2" /></li>
        <li><InlineLatex latex="d_0 = 0{,}700\;\text{mm} = 7{,}00 \cdot 10^{-4}\;\text{m}" /></li>
        <li>Min. merkbar endring: <InlineLatex latex="\Delta C = 0{,}250\;\text{pF} = 2{,}50 \cdot 10^{-13}\;\text{F}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) Startkapasitans <InlineLatex latex="C_0" /></li>
        <li>b) Minste tastebevegelse <InlineLatex latex="\Delta d" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Luftkondensator: <InlineLatex latex="C_0 = \varepsilon_0 A/d_0" />. Ny kapasitans når d minsker til{" "}
        <InlineLatex latex="d = d_0 - \Delta d" />: <InlineLatex latex="C = \varepsilon_0 A/d" />. Løs{" "}
        <InlineLatex latex="C = C_0 + \Delta C" /> for <InlineLatex latex="\Delta d" />:{" "}
        <InlineLatex latex="\Delta d = d_0 - \varepsilon_0 A/(C_0 + \Delta C)" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vær nøye med enhets­konvertering: mm² = 10⁻⁶ m², mm = 10⁻³ m.</p> },
      { label: "Hint 2", content: <p>Ny d: <InlineLatex latex="d = \varepsilon_0 A/(C_0 + \Delta C)" />. Tastebevegelsen: <InlineLatex latex="\Delta d = d_0 - d" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1 (a): Startkapasitans.</strong></p>
        <FormulaBox
          latex="C_0 = \frac{\varepsilon_0 A}{d_0} = \frac{(8{,}854 \cdot 10^{-12})(42{,}0 \cdot 10^{-6})}{7{,}00 \cdot 10^{-4}} = 5{,}31 \cdot 10^{-13}\;\text{F} = 0{,}531\;\text{pF}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (b): Ny kapasitans ved merkbar deteksjon.</strong></p>
        <FormulaBox
          latex="C = C_0 + \Delta C = 0{,}531 + 0{,}250 = 0{,}781\;\text{pF} = 7{,}81 \cdot 10^{-13}\;\text{F}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3: Ny plateavstand.</strong></p>
        <FormulaBox
          latex="d = \frac{\varepsilon_0 A}{C} = \frac{(8{,}854 \cdot 10^{-12})(42{,}0 \cdot 10^{-6})}{7{,}81 \cdot 10^{-13}} = 4{,}76 \cdot 10^{-4}\;\text{m} = 0{,}476\;\text{mm}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4: Tastebevegelse.</strong></p>
        <FormulaBox
          latex="\Delta d = d_0 - d = 0{,}700 - 0{,}476 = 0{,}224\;\text{mm}"
          variant="blue"
        />

        <FormulaBox
          latex="C_0 = \boxed{0{,}531\;\text{pF}},\quad \Delta d = \boxed{0{,}224\;\text{mm}}"
          variant="gold"
        />

        <p className="text-sm text-[var(--muted)]">
          Tasten trenger bare å flyttes ca. 0,22 mm før kretsen merker det — det er svært mekanisk lite, og forklarer
          hvorfor slike tastaturer kan være mer følsomme enn tradisjonelle med metallkontakt.
        </p>
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2">
        <p className="text-sm">
          For mindre deteksjonsbevegelser kan vi linearisere: siden{" "}
          <InlineLatex latex="C \propto 1/d" />, er <InlineLatex latex="\Delta C/C_0 = -\Delta d/d" />. For små Δd er
          dette <InlineLatex latex="\Delta d \approx d_0 \cdot \Delta C/C_0" />:
        </p>
        <FormulaBox
          latex="\Delta d_\text{lin} \approx (0{,}700)(0{,}250/0{,}531) \approx 0{,}330\;\text{mm}"
          variant="blue"
        />
        <p className="text-sm">
          Dette avviker fra eksakt verdi (0,224 mm) med nesten 50 %, så lineær tilnærming egner seg <em>ikke</em> her —
          endringen ΔC/C₀ ≈ 0,47 er for stor.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Praktisk anvendelse: kapasitiv deteksjon brukes i mange moderne tastaturer og touch-sensorer. Den enkle
        geometriske formelen <InlineLatex latex="C = \varepsilon_0 A/d" /> binder en mekanisk størrelse (avstand) til en
        elektrisk størrelse (kapasitans) på en måte som lett kan måles elektronisk.
      </p>
    ),
  },

  "24.64": {
    title: "Brokrets med fire kondensatorer",
    difficulty: "vanskelig",
    pageRef: "s. 836",
    problem: (
      <div className="space-y-2">
        <p>
          I figuren er <InlineLatex latex="C_1 = 6{,}00\;\mu\text{F}" />, <InlineLatex latex="C_2 = 3{,}00\;\mu\text{F}" />,{" "}
          <InlineLatex latex="C_3 = 4{,}00\;\mu\text{F}" /> og <InlineLatex latex="C_4 = 8{,}00\;\mu\text{F}" />.
          Kondensatornettverket er koblet til en påsatt potensialforskjell <InlineLatex latex="V_{ab}" />. Etter at
          ladningene på kondensatorene har nådd sine endelige verdier, er spenningen over{" "}
          <InlineLatex latex="C_3" /> <InlineLatex latex="40{,}0\;\text{V}" />. Finn
        </p>
        <p>a) spenningene over <InlineLatex latex="C_1" /> og <InlineLatex latex="C_2" />,</p>
        <p>b) spenningen over <InlineLatex latex="C_4" />,</p>
        <p>c) spenningen <InlineLatex latex="V_{ab}" /> som påføres nettverket.</p>
        <Svg2452 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li><InlineLatex latex="C_1 = 6{,}00\;\mu\text{F}" />, <InlineLatex latex="C_2 = 3{,}00\;\mu\text{F}" /></li>
        <li><InlineLatex latex="C_3 = 4{,}00\;\mu\text{F}" />, <InlineLatex latex="C_4 = 8{,}00\;\mu\text{F}" /></li>
        <li><InlineLatex latex="V_3 = 40{,}0\;\text{V}" /></li>
        <li>Topologi: <InlineLatex latex="C_1" /> i serie med <InlineLatex latex="C_2" /> (øvre gren); <InlineLatex latex="C_3" /> i serie med <InlineLatex latex="C_4" /> (nedre gren); grenene står i parallell mellom a og b.</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc list-inside">
        <li>a) <InlineLatex latex="V_1" /> og <InlineLatex latex="V_2" /></li>
        <li>b) <InlineLatex latex="V_4" /></li>
        <li>c) <InlineLatex latex="V_{ab}" /></li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Nøkkelen: i den nedre grenen er <InlineLatex latex="C_3" /> og <InlineLatex latex="C_4" /> i serie ⇒ samme
        ladning <InlineLatex latex="Q_{34}" />. Fra <InlineLatex latex="V_3" /> får vi{" "}
        <InlineLatex latex="Q_{34} = C_3 V_3" />, derav <InlineLatex latex="V_4 = Q_{34}/C_4" />. Summen{" "}
        <InlineLatex latex="V_3 + V_4 = V_{ab}" /> (nedre grens totalspenning er spenningen over hele nettverket). I
        den øvre grenen er <InlineLatex latex="C_1" /> og <InlineLatex latex="C_2" /> i serie med samme totale
        spenning <InlineLatex latex="V_{ab}" />, og ladningen er{" "}
        <InlineLatex latex="Q_{12} = C_{12}^\text{ser} V_{ab}" />. Dette gir <InlineLatex latex="V_1, V_2" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Start nede: <InlineLatex latex="Q_{34} = C_3 V_3" />, så <InlineLatex latex="V_4 = Q_{34}/C_4" />.</p> },
      { label: "Hint 2", content: <p><InlineLatex latex="V_{ab}" /> er summen i nedre gren: <InlineLatex latex="V_{ab} = V_3 + V_4" />.</p> },
      { label: "Hint 3", content: <p>Øvre gren: <InlineLatex latex="1/C_{12}^\text{ser} = 1/C_1 + 1/C_2" />, <InlineLatex latex="Q_{12} = C_{12}^\text{ser} V_{ab}" />, og <InlineLatex latex="V_i = Q_{12}/C_i" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm"><strong>Steg 1: Ladning i nedre gren.</strong></p>
        <FormulaBox
          latex="Q_{34} = C_3 V_3 = (4{,}00 \cdot 10^{-6})(40{,}0) = 1{,}60 \cdot 10^{-4}\;\text{C} = 160\;\mu\text{C}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 2 (b): Spenning over <InlineLatex latex="C_4" />.</strong></p>
        <FormulaBox
          latex="V_4 = \frac{Q_{34}}{C_4} = \frac{160\;\mu\text{C}}{8{,}00\;\mu\text{F}} = 20{,}0\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 3 (c): Totalspenning <InlineLatex latex="V_{ab}" />.</strong></p>
        <FormulaBox
          latex="V_{ab} = V_3 + V_4 = 40{,}0 + 20{,}0 = 60{,}0\;\text{V}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 4: Øvre gren — serie-kapasitans.</strong></p>
        <FormulaBox
          latex="\frac{1}{C_{12}^\text{ser}} = \frac{1}{6{,}00} + \frac{1}{3{,}00} = \frac{1}{6} + \frac{2}{6} = \frac{3}{6} = \frac{1}{2}\;\mu\text{F}^{-1}"
          variant="blue"
        />
        <FormulaBox
          latex="C_{12}^\text{ser} = 2{,}00\;\mu\text{F}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 5: Ladning i øvre gren.</strong></p>
        <FormulaBox
          latex="Q_{12} = C_{12}^\text{ser} V_{ab} = (2{,}00 \cdot 10^{-6})(60{,}0) = 1{,}20 \cdot 10^{-4}\;\text{C} = 120\;\mu\text{C}"
          variant="blue"
        />

        <p className="text-sm"><strong>Steg 6 (a): Spenninger over <InlineLatex latex="C_1" /> og <InlineLatex latex="C_2" />.</strong></p>
        <FormulaBox
          latex="V_1 = \frac{Q_{12}}{C_1} = \frac{120\;\mu\text{C}}{6{,}00\;\mu\text{F}} = 20{,}0\;\text{V}"
          variant="blue"
        />
        <FormulaBox
          latex="V_2 = \frac{Q_{12}}{C_2} = \frac{120\;\mu\text{C}}{3{,}00\;\mu\text{F}} = 40{,}0\;\text{V}"
          variant="blue"
        />
        <p className="text-sm text-[var(--muted)]">Kontroll: <InlineLatex latex="V_1 + V_2 = 20{,}0 + 40{,}0 = 60{,}0\;\text{V} = V_{ab}\;\checkmark" /></p>

        <FormulaBox
          latex="V_1 = \boxed{20{,}0\;\text{V}},\; V_2 = \boxed{40{,}0\;\text{V}},\; V_4 = \boxed{20{,}0\;\text{V}},\; V_{ab} = \boxed{60{,}0\;\text{V}}"
          variant="gold"
        />
      </div>
    ),
    alternativeSolution: (
      <p className="text-sm">
        Alternativ rekkefølge: start med å regne total kapasitans som parallell av de to serie-grenene,{" "}
        <InlineLatex latex="C_{ab} = C_{12}^\text{ser} + C_{34}^\text{ser}" />. Da mangler man V_ab for å finne Q-ene.
        Gitt at V₃ er oppgitt, er det enklest å begynne der — som vist over. Begge tilnærminger gir samme svar, men
        gitt-informasjonen styrer hvilken vei som er raskest.
      </p>
    ),
    summary: (
      <p className="text-sm">
        To parallelle serie-grener er et «brudd-og-reparer»-problem: bruk oppgitt informasjon (V₃) til å finne ladningen
        i den relevante grenen, deretter V_ab = sum av spenningene i grenen, og til slutt den andre grenen. I serie
        deles spenningen omvendt proporsjonalt med kapasitansen — derfor tar minste C (her C₂ = 3 μF) størst V-andel.
      </p>
    ),
  },
};
