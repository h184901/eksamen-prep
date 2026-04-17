"use client";

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

// Små SVG-hjelpere for magnetfelt ⊗ (inn) og ⊙ (ut)
function BDot({ cx, cy, r = 7, color = "#8b5cf6" }: { cx: number; cy: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={1.3} />
      <circle cx={cx} cy={cy} r={1.8} fill={color} />
    </g>
  );
}

function BCross({ cx, cy, r = 7, color = "#8b5cf6" }: { cx: number; cy: number; r?: number; color?: string }) {
  const d = r * 0.7;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={1.3} />
      <line x1={cx - d} y1={cy - d} x2={cx + d} y2={cy + d} stroke={color} strokeWidth={1.3} />
      <line x1={cx - d} y1={cy + d} x2={cx + d} y2={cy - d} stroke={color} strokeWidth={1.3} />
    </g>
  );
}

// Arrow-head marker (brukes i flere SVG-er)
function ArrowDefs() {
  return (
    <defs>
      <marker id="ah-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#10b981" />
      </marker>
      <marker id="ah-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
      <marker id="ah-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#8b5cf6" />
      </marker>
      <marker id="ah-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
      </marker>
      <marker id="ah-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
      </marker>
      <marker id="ah-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#64748b" />
      </marker>
    </defs>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SVG-er
// ──────────────────────────────────────────────────────────────────────────────

function SvgEx27_1() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Partikkel med hastighet v i xy-plan">
      <ArrowDefs />
      {/* axes */}
      <line x1="40" y1="150" x2="290" y2="150" stroke="#94a3b8" strokeWidth="1" />
      <line x1="60" y1="170" x2="60" y2="20" stroke="#94a3b8" strokeWidth="1" />
      <text x="293" y="154" fontSize="11" fill="#64748b">x</text>
      <text x="52" y="18" fontSize="11" fill="#64748b">y</text>
      {/* partikkel */}
      <circle cx="130" cy="110" r="8" fill="#3b82f6" />
      <text x="118" y="132" fontSize="11" fill="#3b82f6">q &lt; 0</text>
      {/* v-vektor (v_x, -v_y) */}
      <line x1="130" y1="110" x2="220" y2="148" stroke="#10b981" strokeWidth="2" markerEnd="url(#ah-green)" />
      <text x="210" y="140" fontSize="11" fill="#10b981">v</text>
      <text x="165" y="100" fontSize="9" fill="#10b981">vₓ = +4,19·10⁴</text>
      <text x="165" y="113" fontSize="9" fill="#10b981">vᵧ = −3,85·10⁴</text>
    </svg>
  );
}

function SvgEx27_4() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Partikkel, v langs +y, B langs +y">
      <ArrowDefs />
      <line x1="40" y1="150" x2="290" y2="150" stroke="#94a3b8" strokeWidth="1" />
      <line x1="60" y1="170" x2="60" y2="20" stroke="#94a3b8" strokeWidth="1" />
      <text x="293" y="154" fontSize="11" fill="#64748b">x</text>
      <text x="52" y="18" fontSize="11" fill="#64748b">y</text>
      {/* partikkel */}
      <circle cx="160" cy="120" r="7" fill="#ef4444" />
      <text x="170" y="125" fontSize="11" fill="#ef4444">q &gt; 0</text>
      {/* v-vektor langs +y */}
      <line x1="160" y1="120" x2="160" y2="60" stroke="#10b981" strokeWidth="2" markerEnd="url(#ah-green)" />
      <text x="165" y="75" fontSize="11" fill="#10b981">v</text>
      {/* B-vektor langs +y (parallell) */}
      <line x1="200" y1="120" x2="200" y2="40" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#ah-purple)" />
      <text x="205" y="50" fontSize="11" fill="#8b5cf6">B</text>
    </svg>
  );
}

function SvgEx27_5() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Elektron i xy-plan, B langs +z, F langs −y">
      <ArrowDefs />
      {/* ramme */}
      <rect x="40" y="20" width="250" height="140" fill="none" stroke="#cbd5e1" strokeDasharray="3 3" />
      {/* B ut av ark (⊙) pattern */}
      {[60, 110, 160, 210, 260].map((x) => (
        [45, 80, 115, 145].map((y) => <BDot key={`${x}-${y}`} cx={x} cy={y} />)
      ))}
      <text x="50" y="15" fontSize="10" fill="#8b5cf6">B ut av arket (+z)</text>
      {/* elektron */}
      <circle cx="160" cy="90" r="7" fill="#3b82f6" />
      <text x="170" y="95" fontSize="10" fill="#3b82f6">e⁻</text>
      {/* ? v-retning (ukjent) */}
      <text x="155" y="110" fontSize="10" fill="#64748b">v = ?</text>
      {/* F i −y */}
      <line x1="160" y1="90" x2="160" y2="140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#ah-amber)" />
      <text x="165" y="135" fontSize="10" fill="#f59e0b">F (−y)</text>
    </svg>
  );
}

function SvgEx27_9() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Sirkulær areal i xy-plan, B med vinkel">
      <ArrowDefs />
      {/* sirkel i xy-planet (perspektiv) */}
      <ellipse cx="160" cy="120" rx="70" ry="22" fill="none" stroke="#94a3b8" strokeWidth="1.3" />
      <line x1="160" y1="120" x2="230" y2="120" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="205" y="134" fontSize="10" fill="#64748b">r = 6,10 cm</text>
      {/* normal (z) */}
      <line x1="160" y1="120" x2="160" y2="40" stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" />
      <text x="165" y="45" fontSize="10" fill="#64748b">n̂ (+z)</text>
      {/* B vinkel 53,1° i xz-planet */}
      <line x1="160" y1="120" x2="230" y2="58" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#ah-purple)" />
      <text x="232" y="60" fontSize="11" fill="#8b5cf6">B (53,1°)</text>
      {/* vinkel markering */}
      <path d="M 177 63 A 20 20 0 0 0 160 55" fill="none" stroke="#94a3b8" />
      <text x="170" y="75" fontSize="9" fill="#64748b">φ</text>
    </svg>
  );
}

function SvgEx27_14() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Elektron i semisirkel fra A til B">
      <ArrowDefs />
      {/* strek A - B */}
      <line x1="60" y1="150" x2="260" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      {/* A (venstre) og B (høyre) */}
      <circle cx="60" cy="150" r="5" fill="#3b82f6" />
      <text x="48" y="168" fontSize="11" fill="#3b82f6">A</text>
      <circle cx="260" cy="150" r="5" fill="#64748b" />
      <text x="256" y="168" fontSize="11" fill="#64748b">B</text>
      <text x="140" y="170" fontSize="10" fill="#64748b">10,0 cm</text>
      {/* halvsirkelbane */}
      <path d="M 60 150 A 100 100 0 0 1 260 150" fill="none" stroke="#60a5fa" strokeWidth="1.6" strokeDasharray="5 4" />
      {/* v₀ opp ved A */}
      <line x1="60" y1="150" x2="60" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#ah-green)" />
      <text x="30" y="90" fontSize="11" fill="#10b981">v₀</text>
    </svg>
  );
}

function SvgEx27_17() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Ball med ekstra elektroner faller, B fra øst mot vest">
      <ArrowDefs />
      {/* bakke */}
      <line x1="30" y1="170" x2="290" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
      {/* skakt 125 m */}
      <line x1="160" y1="30" x2="160" y2="170" stroke="#cbd5e1" strokeDasharray="3 3" />
      <text x="165" y="105" fontSize="10" fill="#64748b">125 m</text>
      {/* ball (på bunnen) */}
      <circle cx="160" cy="162" r="8" fill="#3b82f6" />
      <text x="170" y="168" fontSize="10" fill="#3b82f6">−q</text>
      {/* v ned (rett før inntrenging) */}
      <line x1="160" y1="150" x2="160" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#ah-green)" />
      <text x="165" y="130" fontSize="11" fill="#10b981">v</text>
      {/* B fra øst mot vest (venstre) */}
      <line x1="240" y1="162" x2="200" y2="162" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#ah-purple)" />
      <text x="245" y="165" fontSize="11" fill="#8b5cf6">B (mot vest)</text>
      {/* F pil (mot nord = ut av arket i toppvisning) */}
      <text x="85" y="150" fontSize="10" fill="#f59e0b">F = ?</text>
    </svg>
  );
}

function SvgEx27_22() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Protonstråle inn i B-felt inn i arket, buer i sirkel">
      <ArrowDefs />
      {/* ramme med kryss (B inn i ark) */}
      <rect x="100" y="30" width="170" height="160" fill="none" stroke="#cbd5e1" strokeDasharray="3 3" />
      {[120, 160, 200, 240].map((x) => (
        [50, 90, 130, 170].map((y) => <BCross key={`${x}-${y}`} cx={x} cy={y} />)
      ))}
      <text x="110" y="25" fontSize="10" fill="#8b5cf6">B inn i arket</text>
      {/* inngangspil fra venstre */}
      <line x1="30" y1="110" x2="100" y2="110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#ah-red)" />
      <text x="35" y="100" fontSize="10" fill="#ef4444">v = 1,20 km/s</text>
      {/* bue — 1,10 cm, 90° avlenkning */}
      <path d="M 100 110 Q 150 110 150 160" fill="none" stroke="#60a5fa" strokeWidth="1.6" strokeDasharray="4 4" />
      {/* utgang ned */}
      <line x1="150" y1="160" x2="150" y2="190" stroke="#ef4444" strokeWidth="2" markerEnd="url(#ah-red)" />
      <text x="155" y="190" fontSize="10" fill="#ef4444">v</text>
      <text x="120" y="140" fontSize="10" fill="#64748b">d = 1,10 cm</text>
    </svg>
  );
}

function SvgEx27_15() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Proton i semisirkel fra A til B, motsatt rundt">
      <ArrowDefs />
      <line x1="60" y1="120" x2="260" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="120" r="5" fill="#ef4444" />
      <text x="48" y="138" fontSize="11" fill="#ef4444">A</text>
      <circle cx="260" cy="120" r="5" fill="#64748b" />
      <text x="256" y="138" fontSize="11" fill="#64748b">B</text>
      <text x="140" y="140" fontSize="10" fill="#64748b">10,0 cm</text>
      {/* halvsirkel oppover */}
      <path d="M 60 120 A 100 100 0 0 1 260 120" fill="none" stroke="#fca5a5" strokeWidth="1.6" strokeDasharray="5 4" />
      <line x1="60" y1="120" x2="60" y2="55" stroke="#10b981" strokeWidth="2" markerEnd="url(#ah-green)" />
      <text x="30" y="75" fontSize="11" fill="#10b981">v₀</text>
    </svg>
  );
}

function SvgEx27_30() {
  return (
    <svg viewBox="0 0 320 160" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Vertikal leder med strøm, jordmagnetfelt fra sør mot nord">
      <ArrowDefs />
      {/* jord/bakke */}
      <line x1="30" y1="130" x2="290" y2="130" stroke="#94a3b8" strokeWidth="1" />
      {/* leder vertikal */}
      <line x1="160" y1="130" x2="160" y2="20" stroke="#f59e0b" strokeWidth="3" />
      <text x="165" y="30" fontSize="11" fill="#f59e0b">I = 1,5 A</text>
      <text x="165" y="45" fontSize="10" fill="#64748b">l = 2,5 m</text>
      {/* B fra sør mot nord */}
      <line x1="220" y1="110" x2="100" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#ah-purple)" />
      <text x="225" y="115" fontSize="10" fill="#8b5cf6">B (mot nord)</text>
      {/* koordinat */}
      <text x="80" y="145" fontSize="10" fill="#64748b">N ←→ S</text>
    </svg>
  );
}

function SvgEx27_31() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Horisontal stang hengt på skinner, B inn i arket">
      <ArrowDefs />
      {/* ramme med B inn i ark */}
      <rect x="60" y="40" width="200" height="80" fill="none" stroke="#cbd5e1" strokeDasharray="3 3" />
      {[80, 120, 160, 200, 240].map((x) => (
        [60, 90].map((y) => <BCross key={`${x}-${y}`} cx={x} cy={y} />)
      ))}
      <text x="70" y="35" fontSize="10" fill="#8b5cf6">B (inn i arket)</text>
      {/* stang */}
      <rect x="90" y="105" width="140" height="10" fill="#f59e0b" />
      <text x="140" y="130" fontSize="10" fill="#f59e0b">50,0 cm, m = 750 g</text>
      {/* støtter (gresset) */}
      <line x1="90" y1="115" x2="90" y2="160" stroke="#64748b" strokeWidth="2" />
      <line x1="230" y1="115" x2="230" y2="160" stroke="#64748b" strokeWidth="2" />
      {/* batteri og motstand */}
      <text x="110" y="175" fontSize="10" fill="#64748b">V, R = 25,0 Ω</text>
    </svg>
  );
}

function SvgEx27_32() {
  return (
    <svg viewBox="0 0 320 170" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Rett leder gjennom sylindrisk magnetfelt, lengde 2,60 cm i B">
      <ArrowDefs />
      {/* sylindrisk region (sett fra siden = rektangel) */}
      <rect x="80" y="40" width="160" height="90" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="110" y="30" fontSize="10" fill="#64748b">sylindrisk region (B = 0,600 T)</text>
      {/* B-felt vannrett inn i rammen (pilretning mellom poler) */}
      <line x1="75" y1="85" x2="245" y2="85" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <line x1="75" y1="100" x2="245" y2="100" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <line x1="75" y1="70" x2="245" y2="70" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <text x="155" y="55" fontSize="10" fill="#8b5cf6">B →</text>
      {/* leder vinkelrett — gjennom (vist som prikk ⊙ i senter) */}
      <circle cx="160" cy="85" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="160" cy="85" r="2" fill="#f59e0b" />
      <text x="175" y="88" fontSize="10" fill="#f59e0b">I = 11,0 A (ut)</text>
      {/* diameter 2,60 cm */}
      <line x1="80" y1="140" x2="240" y2="140" stroke="#64748b" strokeWidth="0.5" />
      <text x="130" y="155" fontSize="10" fill="#64748b">d = 2,60 cm</text>
    </svg>
  );
}

function SvgEx27_34() {
  return (
    <svg viewBox="0 0 320 180" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Vertikal strøm I nedover, B horisontal øst">
      <ArrowDefs />
      {/* vertikal leder */}
      <line x1="160" y1="20" x2="160" y2="160" stroke="#f59e0b" strokeWidth="3" />
      {/* I ned pil */}
      <line x1="160" y1="40" x2="160" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#ah-red)" />
      <text x="165" y="60" fontSize="10" fill="#ef4444">I = 2,60 A ↓</text>
      {/* B horisontalt */}
      <line x1="180" y1="120" x2="250" y2="120" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#ah-purple)" />
      <text x="210" y="115" fontSize="10" fill="#8b5cf6">B (ulike retninger)</text>
      {/* kompass */}
      <text x="60" y="40" fontSize="10" fill="#64748b">N</text>
      <text x="60" y="170" fontSize="10" fill="#64748b">S</text>
      <text x="20" y="110" fontSize="10" fill="#64748b">V</text>
      <text x="100" y="110" fontSize="10" fill="#64748b">Ø</text>
    </svg>
  );
}

function SvgEx27_47() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Partikkel på y-aksen, B og E langs +z, v langs +x">
      <ArrowDefs />
      {/* koordinatakser */}
      <line x1="50" y1="140" x2="280" y2="140" stroke="#94a3b8" strokeWidth="1" />
      <line x1="80" y1="180" x2="80" y2="20" stroke="#94a3b8" strokeWidth="1" />
      <text x="285" y="144" fontSize="11" fill="#64748b">x</text>
      <text x="72" y="15" fontSize="11" fill="#64748b">y</text>
      <text x="60" y="155" fontSize="11" fill="#64748b">z (inn/ut)</text>
      {/* partikkel på y = 1 m */}
      <circle cx="80" cy="70" r="7" fill="#ef4444" />
      <text x="55" y="70" fontSize="10" fill="#ef4444">+q</text>
      {/* v i +x */}
      <line x1="80" y1="70" x2="160" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#ah-green)" />
      <text x="140" y="62" fontSize="10" fill="#10b981">v₀</text>
      {/* E og B merket som "ut av papiret" i +z */}
      <BDot cx={230} cy={90} r={9} />
      <text x="245" y="93" fontSize="10" fill="#8b5cf6">B (+z)</text>
      <circle cx="230" cy="120" r="8" fill="none" stroke="#ef4444" strokeWidth="1.3" />
      <circle cx="230" cy="120" r="1.8" fill="#ef4444" />
      <text x="245" y="123" fontSize="10" fill="#ef4444">E (+z)</text>
    </svg>
  );
}

function SvgEx27_59() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto my-3" role="img" aria-label="Rail gun: to horisontale skinner, stang av lengde L, B vertikalt">
      <ArrowDefs />
      {/* skinner */}
      <line x1="30" y1="100" x2="280" y2="100" stroke="#64748b" strokeWidth="2" />
      <line x1="30" y1="150" x2="280" y2="150" stroke="#64748b" strokeWidth="2" />
      {/* stang */}
      <rect x="130" y="97" width="10" height="56" fill="#f59e0b" />
      <text x="100" y="175" fontSize="10" fill="#f59e0b">stang, m, L</text>
      {/* B vertikal */}
      <line x1="200" y1="60" x2="200" y2="180" stroke="#8b5cf6" strokeWidth="2" opacity="0.2" />
      <line x1="220" y1="60" x2="220" y2="180" stroke="#8b5cf6" strokeWidth="2" opacity="0.2" />
      <line x1="240" y1="60" x2="240" y2="180" stroke="#8b5cf6" strokeWidth="2" opacity="0.2" />
      <line x1="180" y1="60" x2="180" y2="180" stroke="#8b5cf6" strokeWidth="2" opacity="0.2" />
      <text x="195" y="55" fontSize="10" fill="#8b5cf6">B vertikalt</text>
      {/* strøm I: pil langs stangen (oppover) */}
      <line x1="135" y1="145" x2="135" y2="110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#ah-red)" />
      <text x="105" y="130" fontSize="10" fill="#ef4444">I</text>
      {/* kraft F på stangen */}
      <line x1="145" y1="125" x2="220" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#ah-amber)" />
      <text x="225" y="128" fontSize="10" fill="#f59e0b">F</text>
      {/* batteri */}
      <text x="35" y="190" fontSize="10" fill="#64748b">V-kilde</text>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Små hjelpekomponenter
// ──────────────────────────────────────────────────────────────────────────────

const BlueBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
    <p className="font-semibold text-sm mb-1">{title}</p>
    {children}
  </div>
);

const PurpleBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
    <p className="font-semibold text-sm mb-1">{title}</p>
    {children}
  </div>
);

const GreenBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
    <p className="font-semibold text-sm mb-1">{title}</p>
    {children}
  </div>
);

const AmberBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 mt-2">
    <p className="font-semibold text-sm mb-1">{title}</p>
    {children}
  </div>
);

// ──────────────────────────────────────────────────────────────────────────────
// OPPGAVER
// ──────────────────────────────────────────────────────────────────────────────

export const exercises: Record<string, ExerciseContent> = {
  // ════════════════════════════════════════════════════════════════════════════
  // 27.1 — Lorentz-kraft på partikkel med kjent v og B (to tilfeller)
  // ════════════════════════════════════════════════════════════════════════════
  "27.1": {
    title: "Lorentz-kraft med gitt B i to retninger",
    difficulty: "lett",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          En partikkel med ladning <InlineLatex latex="q = -1{,}24 \cdot 10^{-8}\;\text{C}" /> beveger
          seg med øyeblikkelig hastighet{" "}
          <InlineLatex latex="\vec{v} = (4{,}19 \cdot 10^{4}\;\text{m/s})\hat{i} + (-3{,}85 \cdot 10^{4}\;\text{m/s})\hat{j}" />.
        </p>
        <p>Hva er kraften som magnetfeltet utøver på partikkelen hvis</p>
        <p>a) <InlineLatex latex="\vec{B} = (1{,}40\;\text{T})\hat{i}" /></p>
        <p>b) <InlineLatex latex="\vec{B} = (1{,}40\;\text{T})\hat{k}" />?</p>
        <SvgEx27_1 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Ladning: <InlineLatex latex="q = -1{,}24 \cdot 10^{-8}\;\text{C}" /> (negativ)</li>
        <li>Hastighet: <InlineLatex latex="v_x = 4{,}19 \cdot 10^{4}\;\text{m/s}" />, <InlineLatex latex="v_y = -3{,}85 \cdot 10^{4}\;\text{m/s}" />, <InlineLatex latex="v_z = 0" /></li>
        <li>a) <InlineLatex latex="\vec{B} = 1{,}40\;\text{T}\,\hat{i}" /></li>
        <li>b) <InlineLatex latex="\vec{B} = 1{,}40\;\text{T}\,\hat{k}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Kraftvektoren <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" /> i begge tilfeller</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk Lorentz-kraftformelen <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" /> og regn ut
        kryssproduktet komponentvis. Husk fortegnet på ladningen — den er negativ, så kraften peker
        motsatt vei av <InlineLatex latex="\vec{v}\times\vec{B}" />. Bruk standard-identitetene{" "}
        <InlineLatex latex="\hat{i}\times\hat{i}=0" />, <InlineLatex latex="\hat{j}\times\hat{i}=-\hat{k}" />,{" "}
        <InlineLatex latex="\hat{i}\times\hat{k}=-\hat{j}" />, <InlineLatex latex="\hat{j}\times\hat{k}=\hat{i}" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>I del (a) er B langs x, så <InlineLatex latex="v_x\hat{i}\times\vec{B}=0" />. Bare y-komponenten av v gir kraft.</p> },
      { label: "Hint 2", content: <p>I del (b) er B langs z. Begge v-komponenter gir kraft, men i forskjellige retninger. Sett opp determinantform for <InlineLatex latex="\vec{v}\times\vec{B}" />.</p> },
      { label: "Hint 3", content: <p>Husk at q er negativ — multipliser sluttsvaret med <InlineLatex latex="-1{,}24\cdot 10^{-8}" />, ikke bare størrelsen.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-sm">a) <InlineLatex latex="\vec{B} = 1{,}40\;\hat{i}" /></p>
        <p className="text-sm">
          Kryssproduktet: <InlineLatex latex="\vec{v}\times\vec{B} = (v_x\hat{i}+v_y\hat{j})\times(B\hat{i}) = v_xB(\hat{i}\times\hat{i})+v_yB(\hat{j}\times\hat{i}) = -v_yB\,\hat{k}" />.
        </p>
        <FormulaBox
          latex="\vec{F} = q\vec{v}\times\vec{B} = -q v_y B\,\hat{k} = -(-1{,}24\cdot 10^{-8})(-3{,}85\cdot 10^{4})(1{,}40)\,\hat{k}"
          variant="blue"
        />
        <FormulaBox
          latex="\vec{F}_{(a)} = \boxed{-6{,}68\cdot 10^{-4}\;\text{N}\,\hat{k}}"
          variant="gold"
        />
        <p className="text-sm">Kraften peker i <strong>negativ z-retning</strong>.</p>

        <p className="font-semibold text-sm mt-2">b) <InlineLatex latex="\vec{B} = 1{,}40\;\hat{k}" /></p>
        <p className="text-sm">
          Kryssproduktet: <InlineLatex latex="\vec{v}\times\vec{B} = (v_x\hat{i}+v_y\hat{j})\times(B\hat{k}) = v_xB(\hat{i}\times\hat{k})+v_yB(\hat{j}\times\hat{k}) = -v_xB\,\hat{j}+v_yB\,\hat{i}" />.
        </p>
        <FormulaBox
          latex="\vec{F} = q(v_yB\,\hat{i} - v_xB\,\hat{j})"
          variant="blue"
        />
        <p className="text-sm">Sett inn tallene (<InlineLatex latex="q=-1{,}24\cdot 10^{-8}" />, <InlineLatex latex="B=1{,}40" />):</p>
        <FormulaBox
          latex="F_x = q v_y B = (-1{,}24\cdot 10^{-8})(-3{,}85\cdot 10^{4})(1{,}40) = 6{,}68\cdot 10^{-4}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="F_y = -q v_x B = -(-1{,}24\cdot 10^{-8})(4{,}19\cdot 10^{4})(1{,}40) = 7{,}27\cdot 10^{-4}\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="\vec{F}_{(b)} = \boxed{(6{,}68\cdot 10^{-4}\,\hat{i} + 7{,}27\cdot 10^{-4}\,\hat{j})\;\text{N}}"
          variant="gold"
        />
        <p className="text-sm">
          Størrelse: <InlineLatex latex="|\vec{F}| = \sqrt{F_x^2+F_y^2} = 9{,}87\cdot 10^{-4}\;\text{N}" />, vinkel{" "}
          <InlineLatex latex="\arctan(7{,}27/6{,}68) \approx 47{,}4°" /> fra +x-aksen.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Ved å dekomponere <InlineLatex latex="\vec{v}\times\vec{B}" /> komponentvis kan du raskt finne kraften.
        Vær nøye med fortegnet på q — en negativ ladning snur retningen. Parallellkomponenten av v (langs B)
        gir alltid null bidrag.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.4 — Akselerasjon fra oppgitt kraft og B
  // ════════════════════════════════════════════════════════════════════════════
  "27.4": {
    title: "Akselerasjon fra magnetisk kraft",
    difficulty: "lett",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          En partikkel med masse <InlineLatex latex="m = 1{,}81 \cdot 10^{-3}\;\text{kg}" /> og
          ladning <InlineLatex latex="q = 1{,}22 \cdot 10^{-8}\;\text{C}" /> har i et gitt øyeblikk
          hastighet <InlineLatex latex="\vec{v} = (3{,}00 \cdot 10^{4}\;\text{m/s})\hat{j}" />.
        </p>
        <p>
          Hva er størrelsen og retningen på akselerasjonen som produseres av et uniformt magnetfelt{" "}
          <InlineLatex latex="\vec{B} = (1{,}63\;\text{T})\hat{i} + (0{,}980\;\text{T})\hat{j}" />?
        </p>
        <SvgEx27_4 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Masse: <InlineLatex latex="m = 1{,}81 \cdot 10^{-3}\;\text{kg}" /></li>
        <li>Ladning: <InlineLatex latex="q = 1{,}22 \cdot 10^{-8}\;\text{C}" /> (positiv)</li>
        <li>Hastighet: <InlineLatex latex="\vec{v} = (3{,}00\cdot 10^{4})\hat{j}\;\text{m/s}" /></li>
        <li>Magnetfelt: <InlineLatex latex="\vec{B} = 1{,}63\hat{i} + 0{,}980\hat{j}\;\text{T}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Akselerasjonsvektoren <InlineLatex latex="\vec{a}" /> (størrelse og retning)</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Finn først magnetkraften med <InlineLatex latex="\vec{F}=q\vec{v}\times\vec{B}" /> og deretter
        akselerasjonen med Newtons 2. lov: <InlineLatex latex="\vec{a}=\vec{F}/m" />.
        Vær obs på at parallellkomponenten av B (langs v, altså <InlineLatex latex="B_y" />) ikke bidrar — bare{" "}
        <InlineLatex latex="B_x" /> gir kryssprodukt med <InlineLatex latex="v\hat{j}" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Identiteten <InlineLatex latex="\hat{j}\times\hat{j}=0" /> betyr at kun B-komponenten langs x bidrar.</p> },
      { label: "Hint 2", content: <p>Husk <InlineLatex latex="\hat{j}\times\hat{i}=-\hat{k}" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm">
          Steg 1: Kryssprodukt <InlineLatex latex="\vec{v}\times\vec{B} = v_y\hat{j}\times(B_x\hat{i}+B_y\hat{j}) = v_y B_x(\hat{j}\times\hat{i}) = -v_y B_x\,\hat{k}" />.
        </p>
        <FormulaBox
          latex="\vec{v}\times\vec{B} = -(3{,}00\cdot 10^{4})(1{,}63)\,\hat{k} = -4{,}89\cdot 10^{4}\;\hat{k}\;\text{m T/s}"
          variant="blue"
        />

        <p className="text-sm">Steg 2: Kraften.</p>
        <FormulaBox
          latex="\vec{F} = q\vec{v}\times\vec{B} = (1{,}22\cdot 10^{-8})(-4{,}89\cdot 10^{4})\,\hat{k} = -5{,}97\cdot 10^{-4}\;\text{N}\,\hat{k}"
          variant="blue"
        />

        <p className="text-sm">Steg 3: Akselerasjonen fra Newtons 2. lov.</p>
        <FormulaBox
          latex="\vec{a} = \frac{\vec{F}}{m} = \frac{-5{,}97\cdot 10^{-4}}{1{,}81\cdot 10^{-3}}\,\hat{k}"
          variant="blue"
        />
        <FormulaBox
          latex="\vec{a} = \boxed{-0{,}330\;\text{m/s}^2\,\hat{k}}"
          variant="gold"
        />
        <p className="text-sm">Altså <strong>0,330 m/s² i −z-retning</strong>.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Bare komponenten av B som er vinkelrett på v bidrar. Her blokkerte <InlineLatex latex="B_y\parallel v" /> seg selv ut,
        og bare <InlineLatex latex="B_x" /> ga kraft. Deretter er det rett fram Newtons 2. lov.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.5 — Finn v fra gitt F og B (elektron)
  // ════════════════════════════════════════════════════════════════════════════
  "27.5": {
    title: "Finn hastighet av elektron fra kraft og B",
    difficulty: "middels",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          Et elektron beveger seg i xy-planet. Ved tidspunkt <InlineLatex latex="t" /> utøver et
          magnetfelt <InlineLatex latex="\vec{B} = 0{,}200\;\text{T}\,\hat{j}" /> en kraft{" "}
          <InlineLatex latex="\vec{F} = 5{,}50 \cdot 10^{-18}\;\text{N}\,(-\hat{j})" /> på elektronet.
        </p>
        <p>Hva er farten (størrelsen og retningen) til elektronet i dette øyeblikket?</p>
        <SvgEx27_5 />
        <p className="text-xs text-[var(--muted)] italic">
          Obs: Det gitte svaret krever at kraften faktisk er i xy-planet og vinkelrett på v. Med B langs y og v i xy-planet,
          ligger <InlineLatex latex="\vec{v}\times\vec{B}" /> langs z. Vi tolker kraften som langs −z (i overensstemmelse
          med løsningen).
        </p>
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Ladning: <InlineLatex latex="q = -e = -1{,}60 \cdot 10^{-19}\;\text{C}" /></li>
        <li>Magnetfelt: <InlineLatex latex="\vec{B} = 0{,}200\;\text{T}\,\hat{j}" /></li>
        <li>Kraft: <InlineLatex latex="F = 5{,}50 \cdot 10^{-18}\;\text{N}" /> (langs −z pga. kryssprodukt-geometri)</li>
        <li>v ligger i xy-planet</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Hastigheten <InlineLatex latex="\vec{v}" /> (størrelse og retning)</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Siden v er i xy-planet og B langs y, er det bare <InlineLatex latex="v_x" /> som bidrar til kryssproduktet.
        Sett opp <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B}" /> og løs for <InlineLatex latex="v_x" />.
        Fortegnet på svaret gir retningen. Husk at q er negativ.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bare <InlineLatex latex="v_x\hat{i}\times B\hat{j}=v_xB\hat{k}" /> — <InlineLatex latex="v_y\hat{j}\times B\hat{j}=0" />.</p> },
      { label: "Hint 2", content: <p>Kraften er <InlineLatex latex="F=qv_xB" /> langs z. Sett opp fortegn nøye.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm">
          Steg 1: Kryssprodukt. Anta <InlineLatex latex="\vec{v}=v_x\hat{i}+v_y\hat{j}" />. Da er{" "}
          <InlineLatex latex="\vec{v}\times\vec{B}=v_x B\,\hat{k}" />.
        </p>
        <FormulaBox latex="\vec{F} = q\,v_x B\,\hat{k}" variant="blue" />

        <p className="text-sm">
          Steg 2: Kraftens y-komponent er 0 — konsistent. For at kraften skal være i y-retning, må enten v være 0 eller
          geometrien tolkes slik at kraften er langs z. Løser man for fart fra størrelsen:
        </p>
        <FormulaBox
          latex="v = \frac{|F|}{|q|B} = \frac{5{,}50\cdot 10^{-18}}{(1{,}60\cdot 10^{-19})(0{,}200)}"
          variant="blue"
        />
        <FormulaBox
          latex="v = \boxed{1{,}72\cdot 10^{2}\;\text{m/s}}"
          variant="gold"
        />

        <p className="text-sm">
          Steg 3 — retning: Kraften på elektronet er <InlineLatex latex="\vec{F}=q\vec{v}\times\vec{B}" />. Med q &lt; 0,
          for å få F i −y-retning må <InlineLatex latex="\vec{v}\times\vec{B}" /> være i +y. Da kreves{" "}
          <InlineLatex latex="\vec{v}" /> å ha z-komponent. Siden v er begrenset til xy-planet, tolkes oppgaven som{" "}
          <strong>v langs +x-aksen</strong> slik at kraften bli langs <strong>−z</strong> (fordi{" "}
          <InlineLatex latex="\hat{i}\times\hat{j}=\hat{k}" />, og q negativ gir −z).
        </p>

        <AmberBox title="Tolkningsmerknad">
          <p className="text-sm">
            Boken opererer med at F er i −y ; i realiteten (standard vektoranalyse) får vi F langs z når v er i xy og B langs y.
            Farten <InlineLatex latex="v\approx 1{,}72\cdot 10^{2}\;\text{m/s}" /> er uansett korrekt;
            retningen av v er <strong>+x</strong> (som gir <InlineLatex latex="\vec{v}\times\vec{B}=v B\hat{k}" />, og med q&lt;0 blir F langs −z).
          </p>
        </AmberBox>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når magnetfeltet står langs én akse, plukker kryssproduktet ut kun én hastighetskomponent. Da kan du løse
        baklengs: <InlineLatex latex="v=F/(|q|B)" />. Vær pedantisk med fortegn og akseretninger ved negative ladninger.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.9 — Magnetisk fluks gjennom sirkel, tre tilfeller
  // ════════════════════════════════════════════════════════════════════════════
  "27.9": {
    title: "Magnetisk fluks gjennom et sirkulært areal",
    difficulty: "lett",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          Et sirkulært areal med radius <InlineLatex latex="r=6{,}10\;\text{cm}" /> ligger i xy-planet.
          Hva er den magnetiske fluksen gjennom sirkelen når magnetfeltet{" "}
          <InlineLatex latex="B=0{,}230\;\text{T}" /> er:
        </p>
        <p>a) i +z-retningen;</p>
        <p>b) med vinkel 53,1° fra +z-retningen;</p>
        <p>c) i +y-retningen?</p>
        <SvgEx27_9 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Radius: <InlineLatex latex="r = 6{,}10\;\text{cm} = 0{,}0610\;\text{m}" /></li>
        <li>Magnetfelt: <InlineLatex latex="B = 0{,}230\;\text{T}" /></li>
        <li>Areal i xy-planet, normalvektor <InlineLatex latex="\hat{n}=\hat{k}" /></li>
        <li>Areal: <InlineLatex latex="A=\pi r^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Fluks <InlineLatex latex="\Phi_B = \vec{B}\cdot\vec{A} = BA\cos\phi" /> for hver vinkel</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Fluksen er skalarproduktet <InlineLatex latex="\Phi_B = \vec{B}\cdot\hat{n}\,A" />. Siden arealet ligger i
        xy-planet, er <InlineLatex latex="\hat{n}=\hat{k}" />. Vinkelen <InlineLatex latex="\phi" /> er vinkelen
        mellom B og normalen. Maks fluks når B⊥plan (φ=0), null fluks når B⊥normal (φ=90°).
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="A=\pi r^2 = \pi(0{,}0610)^2=1{,}169\cdot 10^{-2}\;\text{m}^2" />.</p> },
      { label: "Hint 2", content: <p>I del (c) er B i +y-retning — vinkelen mellom B og normalen (som peker i z) er 90°, så fluksen blir 0.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox
          latex="A = \pi r^2 = \pi (0{,}0610)^2 = 1{,}169\cdot 10^{-2}\;\text{m}^2"
          variant="blue"
        />

        <p className="font-semibold text-sm">a) B i +z-retning (parallell med normalen, φ = 0°)</p>
        <FormulaBox
          latex="\Phi_B = BA\cos 0° = (0{,}230)(1{,}169\cdot 10^{-2})"
          variant="blue"
        />
        <FormulaBox
          latex="\Phi_B = \boxed{2{,}69\cdot 10^{-3}\;\text{Wb}}"
          variant="gold"
        />

        <p className="font-semibold text-sm">b) Vinkel 53,1° med +z-aksen (φ = 53,1°)</p>
        <FormulaBox
          latex="\Phi_B = BA\cos 53{,}1° = (0{,}230)(1{,}169\cdot 10^{-2})(0{,}6)"
          variant="blue"
        />
        <FormulaBox
          latex="\Phi_B = \boxed{1{,}61\cdot 10^{-3}\;\text{Wb}}"
          variant="gold"
        />

        <p className="font-semibold text-sm">c) B i +y-retning (φ = 90°)</p>
        <FormulaBox
          latex="\Phi_B = BA\cos 90° = \boxed{0}"
          variant="gold"
        />
        <p className="text-sm">Når B er parallell med arealet passerer ingen feltlinjer gjennom flaten.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Magnetisk fluks avhenger av <strong>vinkelen mellom B og normalen</strong>, ikke mellom B og arealet. Maks ved
        φ = 0°, null ved φ = 90°. Ikke forveksle denne φ med vinkelen θ i kraftformelen{" "}
        <InlineLatex latex="F=qvB\sin\theta" /> (der θ er mellom v og B).
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.14 — Elektron i halvsirkel
  // ════════════════════════════════════════════════════════════════════════════
  "27.14": {
    title: "Elektron i halvsirkelbane",
    difficulty: "middels",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          Et elektron i punkt A (se figur) har en fart{" "}
          <InlineLatex latex="v_0 = 1{,}41\cdot 10^{6}\;\text{m/s}" />.
        </p>
        <p>
          a) Finn størrelsen og retningen på magnetfeltet som vil få elektronet til å følge halvsirkelbanen
          fra A til B.
        </p>
        <p>b) Finn tiden som trengs for at elektronet skal bevege seg fra A til B.</p>
        <p>Avstanden fra A til B er 10,0 cm (altså halvsirkelens diameter).</p>
        <SvgEx27_14 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Fart: <InlineLatex latex="v_0 = 1{,}41\cdot 10^{6}\;\text{m/s}" /></li>
        <li>Diameter: <InlineLatex latex="d = 10{,}0\;\text{cm} \Rightarrow r = 5{,}00\cdot 10^{-2}\;\text{m}" /></li>
        <li>Ladning: <InlineLatex latex="|q|=e=1{,}60\cdot 10^{-19}\;\text{C}" /></li>
        <li>Masse: <InlineLatex latex="m_e=9{,}11\cdot 10^{-31}\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>a) Magnetfeltet B (størrelse og retning)</li>
        <li>b) Tid <InlineLatex latex="t_{AB}" /> for halv omløp</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        For sirkelbane i uniformt B-felt gjelder <InlineLatex latex="r=m v/(|q|B)" />, så{" "}
        <InlineLatex latex="B=mv/(|q|r)" />. Tiden for halv omdreining er{" "}
        <InlineLatex latex="T/2 = \pi m/(|q|B)" /> — eller like enkelt halv omkrets delt på fart.
        Retningen på B bestemmes av høyrehåndsregelen: elektronet starter oppover i A, buer mot høyre til B —
        så <InlineLatex latex="\vec{v}\times\vec{B}" /> må peke mot høyre (sentripetalt). For et elektron (q&lt;0) er kraften
        motsatt kryssproduktet.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Bruk <InlineLatex latex="r=mv/(|q|B)" /> til å løse for B.</p> },
      { label: "Hint 2", content: <p>Halvsirkel-tid: lengden πr delt på v, eller <InlineLatex latex="T/2=\pi m/(|q|B)" />.</p> },
      { label: "Hint 3", content: <p>Retning på B: Ved A peker v opp (+y), sentripetal kraft må peke mot sirkelens sentrum (+x). For elektron må <InlineLatex latex="\vec{v}\times\vec{B}" /> peke motsatt sentripetal (altså −x). Prøv B ut av arket — gir det rett retning?</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-sm">a) Størrelse og retning på B</p>
        <p className="text-sm">Løs <InlineLatex latex="r=mv/(|q|B)" /> for B:</p>
        <FormulaBox
          latex="B = \frac{m_e v_0}{|q|r} = \frac{(9{,}11\cdot 10^{-31})(1{,}41\cdot 10^{6})}{(1{,}60\cdot 10^{-19})(5{,}00\cdot 10^{-2})}"
          variant="blue"
        />
        <FormulaBox
          latex="B = \boxed{1{,}60\cdot 10^{-4}\;\text{T}}"
          variant="gold"
        />
        <p className="text-sm">
          Retning: Ved A er <InlineLatex latex="\vec{v}=v_0\hat{j}" /> (oppover). For halvsirkel mot høyre må sentripetalkraften peke mot +x.
          For elektron (q = −e): <InlineLatex latex="\vec{F} = -e\,\vec{v}\times\vec{B}" />. For F i +x må <InlineLatex latex="\vec{v}\times\vec{B}" />{" "}
          peke i −x. <InlineLatex latex="\hat{j}\times(-\hat{k}) = -\hat{i}" /> — riktig! Så <strong>B peker inn i arket</strong>.
        </p>

        <p className="font-semibold text-sm mt-2">b) Tid fra A til B</p>
        <FormulaBox
          latex="t_{AB} = \frac{\pi r}{v_0} = \frac{\pi (5{,}00\cdot 10^{-2})}{1{,}41\cdot 10^{6}}"
          variant="blue"
        />
        <FormulaBox
          latex="t_{AB} = \boxed{1{,}11\cdot 10^{-7}\;\text{s} = 111\;\text{ns}}"
          variant="gold"
        />
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2">
        <p className="text-sm">
          Alternativt kan perioden beregnes ut fra B: <InlineLatex latex="T=2\pi m/(|q|B) = 2\pi(9{,}11\cdot 10^{-31})/((1{,}60\cdot 10^{-19})(1{,}60\cdot 10^{-4})) = 2{,}24\cdot 10^{-7}\;\text{s}" />,
          så <InlineLatex latex="T/2 = 1{,}12\cdot 10^{-7}\;\text{s}" /> — samme svar.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Husk kjerneformelen <InlineLatex latex="r=mv/(|q|B)" /> og at omløpstiden{" "}
        <InlineLatex latex="T=2\pi m/(|q|B)" /> er <em>uavhengig av farten</em> — en lettere partikkel bruker alltid kortere tid
        på en runde i samme B. Pass ekstra på fortegn og retning for elektroner.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.15 — Samme som 27.14, men for proton
  // ════════════════════════════════════════════════════════════════════════════
  "27.15": {
    title: "Proton i halvsirkelbane",
    difficulty: "middels",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          Gjenta oppgave 27.14, men nå er partikkelen en <strong>proton</strong> istedenfor et elektron.
          Samme geometri: A til B langs halvsirkel med diameter 10,0 cm, fart{" "}
          <InlineLatex latex="v_0 = 1{,}41\cdot 10^{6}\;\text{m/s}" />.
        </p>
        <SvgEx27_15 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Fart: <InlineLatex latex="v_0 = 1{,}41\cdot 10^{6}\;\text{m/s}" /></li>
        <li>Diameter: <InlineLatex latex="d=10{,}0\;\text{cm}" />, radius <InlineLatex latex="r=5{,}00\cdot 10^{-2}\;\text{m}" /></li>
        <li>Ladning: <InlineLatex latex="q=+e=1{,}60\cdot 10^{-19}\;\text{C}" /></li>
        <li>Masse: <InlineLatex latex="m_p=1{,}67\cdot 10^{-27}\;\text{kg}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>a) B (størrelse og retning)</li>
        <li>b) Tid fra A til B</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Samme formel som før, men bytt <InlineLatex latex="m_e" /> med <InlineLatex latex="m_p" />.
        For proton (q &gt; 0) er retningen på B motsatt det vi fant for elektronet.
        Tiden blir lengre siden protonet er tyngre.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Forholdet <InlineLatex latex="m_p/m_e\approx 1836" /> — forventningsvis omtrent så mye større B og t.</p> },
      { label: "Hint 2", content: <p>Retning: snu fortegnet på q, altså snu retningen på B sammenlignet med 27.14.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-sm">a) Magnetfeltet</p>
        <FormulaBox
          latex="B = \frac{m_p v_0}{|q|r} = \frac{(1{,}67\cdot 10^{-27})(1{,}41\cdot 10^{6})}{(1{,}60\cdot 10^{-19})(5{,}00\cdot 10^{-2})}"
          variant="blue"
        />
        <FormulaBox
          latex="B = \boxed{0{,}294\;\text{T}}"
          variant="gold"
        />
        <p className="text-sm">
          Retning: Protonet er positivt. Ved A er <InlineLatex latex="\vec{v}=v_0\hat{j}" />, sentripetal må peke mot +x.
          For q&gt;0 må <InlineLatex latex="\vec{v}\times\vec{B}" /> peke i +x. Prøv B ut av arket{" "}
          (<InlineLatex latex="+\hat{k}" />): <InlineLatex latex="\hat{j}\times\hat{k}=\hat{i}" /> ✓. Så <strong>B peker ut av arket</strong>.
        </p>

        <p className="font-semibold text-sm mt-2">b) Tid</p>
        <FormulaBox
          latex="t_{AB} = \frac{\pi r}{v_0} = \frac{\pi (5{,}00\cdot 10^{-2})}{1{,}41\cdot 10^{6}} = \boxed{1{,}11\cdot 10^{-7}\;\text{s}}"
          variant="gold"
        />
        <p className="text-sm">
          Merk: Tiden er <strong>samme som for elektronet</strong> — ikke overraskende, for tiden avhenger bare av <em>omkretsen</em>{" "}
          og <em>farten</em>, som er de samme i begge oppgavene.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Protonet krever mye sterkere B for samme radius fordi det er ca. 1836 ganger tyngre.
        Retningen på B er motsatt av elektronets. Tiden for halvsirkel avhenger bare av v og r, ikke av masse.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.17 — Fallende ball med overskuddsladning
  // ════════════════════════════════════════════════════════════════════════════
  "27.17": {
    title: "Fallende ladd ball i magnetfelt",
    difficulty: "middels",
    pageRef: "Side 937",
    problem: (
      <div className="space-y-2">
        <p>
          En ball på 150 g som inneholder <InlineLatex latex="4{,}00\cdot 10^{8}" /> overskudds-elektroner slippes
          fra ro ned en 125 m vertikal sjakt. På bunnen kommer ballen plutselig inn i et uniformt horisontalt
          magnetfelt med størrelse <InlineLatex latex="B=0{,}250\;\text{T}" /> rettet fra øst mot vest.
        </p>
        <p>
          Finn størrelsen og retningen på kraften magnetfeltet utøver på ballen akkurat når den kommer inn i feltet
          (luftmotstand kan neglisjeres).
        </p>
        <SvgEx27_17 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Masse ball: <InlineLatex latex="m = 0{,}150\;\text{kg}" /></li>
        <li>Antall overskudds-elektroner: <InlineLatex latex="N=4{,}00\cdot 10^{8}" /></li>
        <li>Ladning: <InlineLatex latex="q = -Ne = -(4{,}00\cdot 10^{8})(1{,}60\cdot 10^{-19}) = -6{,}40\cdot 10^{-11}\;\text{C}" /></li>
        <li>Fallhøyde: <InlineLatex latex="h = 125\;\text{m}" /></li>
        <li>Magnetfelt: <InlineLatex latex="B=0{,}250\;\text{T}" />, retning øst→vest</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Magnetkraft på ballen like etter inngang i feltet</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        To steg:
        (1) Finn farten etter fall på 125 m med energibevaring: <InlineLatex latex="v=\sqrt{2gh}" />.
        (2) Bruk Lorentz-kraft <InlineLatex latex="F=|q|vB\sin\theta" /> med <InlineLatex latex="\theta=90°" />{" "}
        (v vertikalt, B horisontalt). Retningen: høyrehåndsregelen, og husk å snu for negativ ladning.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Farten fra energibevaring: <InlineLatex latex="\tfrac{1}{2}mv^2 = mgh" /> gir <InlineLatex latex="v=\sqrt{2gh}" />.</p> },
      { label: "Hint 2", content: <p>Vinkelen mellom v (ned) og B (øst→vest, horisontalt) er 90°, så <InlineLatex latex="\sin\theta=1" />.</p> },
      { label: "Hint 3", content: <p>Retning: La +x = øst, +y = nord, +z = opp. Da er <InlineLatex latex="\vec{v}=-v\hat{k}" /> og <InlineLatex latex="\vec{B}=-B\hat{i}" />. Finn <InlineLatex latex="\vec{v}\times\vec{B}" />, snu for negativ ladning.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm">Steg 1: Farten ved inntrenging i feltet.</p>
        <FormulaBox
          latex="v = \sqrt{2gh} = \sqrt{2(9{,}80)(125)} = 49{,}5\;\text{m/s}"
          variant="blue"
        />

        <p className="text-sm">Steg 2: Total ladning.</p>
        <FormulaBox
          latex="|q| = Ne = (4{,}00\cdot 10^{8})(1{,}60\cdot 10^{-19}) = 6{,}40\cdot 10^{-11}\;\text{C}"
          variant="blue"
        />

        <p className="text-sm">Steg 3: Kraftens størrelse.</p>
        <FormulaBox
          latex="F = |q|vB\sin 90° = (6{,}40\cdot 10^{-11})(49{,}5)(0{,}250)"
          variant="blue"
        />
        <FormulaBox
          latex="F = \boxed{7{,}92\cdot 10^{-10}\;\text{N}}"
          variant="gold"
        />

        <p className="text-sm">
          Steg 4 — retning: Med +x = øst, +y = nord, +z = opp:
          <InlineLatex latex="\vec{v}=-v\hat{k}" />, <InlineLatex latex="\vec{B}=-B\hat{i}" /> (øst→vest = −x).
          Da er <InlineLatex latex="\vec{v}\times\vec{B}=(-v\hat{k})\times(-B\hat{i})=vB(\hat{k}\times\hat{i})=vB\hat{j}" />{" "}
          (mot nord). Siden q &lt; 0 snur retningen: <strong>kraften peker mot sør</strong>.
        </p>

        <AmberBox title="Sanity-sjekk">
          <p className="text-sm">
            Kraften er ørliten (mindre enn 10⁻⁹ N) sammenlignet med tyngden <InlineLatex latex="mg \approx 1{,}47\;\text{N}" />.
            Dette er derfor en <em>svært</em> svak påvirkning — ballen bare så vidt dyttes sidelengs.
          </p>
        </AmberBox>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Kombinér kinematikk/energi for å få v, deretter Lorentz. Høyrehåndsregelen for positive ladninger,
        så snu for negative. Alltid sjekk størrelsesorden for fornuft.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.22 — Protonstråle avlenkes 1,10 cm gjennom B-felt
  // ════════════════════════════════════════════════════════════════════════════
  "27.22": {
    title: "Protonstråle avlenkes i B-felt",
    difficulty: "vanskelig",
    pageRef: "Side 938",
    problem: (
      <div className="space-y-2">
        <p>
          En protonstråle som beveger seg med <InlineLatex latex="1{,}20\;\text{km/s}" /> kommer inn i et
          uniformt magnetfelt og beveger seg <em>vinkelrett</em> på feltet. Strålen forlater feltet med en
          retning <em>vinkelrett</em> på sin opprinnelige retning (se figur). Strålen beveger seg en avstand{" "}
          <InlineLatex latex="d = 1{,}10\;\text{cm}" /> mens den er i feltet.
        </p>
        <p>Hva er størrelsen på magnetfeltet?</p>
        <SvgEx27_22 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Fart: <InlineLatex latex="v = 1{,}20\;\text{km/s} = 1{,}20\cdot 10^{3}\;\text{m/s}" /></li>
        <li>Strålen dreier 90° — en kvartsirkel</li>
        <li>Avstand tilbakelagt i feltet: <InlineLatex latex="d = 1{,}10\cdot 10^{-2}\;\text{m}" /> (= buelengde)</li>
        <li>Masse proton: <InlineLatex latex="m_p = 1{,}67\cdot 10^{-27}\;\text{kg}" /></li>
        <li>Ladning: <InlineLatex latex="q = +e = 1{,}60\cdot 10^{-19}\;\text{C}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Feltstørrelsen B</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Strålen gjennomfører en kvartsirkel. Buelengden er <InlineLatex latex="d = \tfrac{1}{4}\cdot 2\pi r = \tfrac{\pi r}{2}" />,
        så <InlineLatex latex="r = 2d/\pi" />. Deretter bruk <InlineLatex latex="r = m_p v/(|q|B)" /> til å løse for B.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>En 90°-avbøyning = kvartsirkel. Buelengde <InlineLatex latex="s = r\theta" /> med <InlineLatex latex="\theta=\pi/2" />.</p> },
      { label: "Hint 2", content: <p>Radius først: <InlineLatex latex="r=2d/\pi" />. Deretter B.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm">Steg 1: Geometri — kvartsirkel.</p>
        <FormulaBox
          latex="s = r\theta \quad\Rightarrow\quad d = r\cdot\frac{\pi}{2} \quad\Rightarrow\quad r = \frac{2d}{\pi} = \frac{2(1{,}10\cdot 10^{-2})}{\pi} = 7{,}003\cdot 10^{-3}\;\text{m}"
          variant="blue"
        />

        <p className="text-sm">Steg 2: Løs <InlineLatex latex="r=mv/(|q|B)" /> for B.</p>
        <FormulaBox
          latex="B = \frac{m_p v}{|q|r} = \frac{(1{,}67\cdot 10^{-27})(1{,}20\cdot 10^{3})}{(1{,}60\cdot 10^{-19})(7{,}003\cdot 10^{-3})}"
          variant="blue"
        />
        <FormulaBox
          latex="B = \boxed{1{,}79\cdot 10^{-3}\;\text{T} \approx 1{,}79\;\text{mT}}"
          variant="gold"
        />
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2">
        <p className="text-sm">
          Alternativt kan du bruke periode: 90° = <InlineLatex latex="T/4" />, så <InlineLatex latex="t=T/4=d/v" />, som gir{" "}
          <InlineLatex latex="T=4d/v" />. Sett deretter <InlineLatex latex="T = 2\pi m/(|q|B)" /> og løs for B.
          Resultatet blir det samme.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når en stråle dreier et bestemt antall grader i et B-felt, omsett vinkelen til buelengde og få radius. Deretter er
        det rett fram <InlineLatex latex="B=mv/(|q|r)" />. Svært nyttig for masse-spektrometer og partikkel-akseleratorer.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.30 — Lang leder med strøm, jordens B-felt
  // ════════════════════════════════════════════════════════════════════════════
  "27.30": {
    title: "Kraft på leder i jordmagnetfeltet",
    difficulty: "lett",
    pageRef: "Side 938",
    problem: (
      <div className="space-y-2">
        <p>
          En lang, rett leder med lengde <InlineLatex latex="l=2{,}5\;\text{m}" /> fører en typisk husholdningsstrøm
          på <InlineLatex latex="I=1{,}5\;\text{A}" /> (i én retning) på et sted der jordas magnetfelt er{" "}
          <InlineLatex latex="55\;\mu\text{T}" /> fra sør mot nord.
        </p>
        <p>Finn størrelsen og retningen på kraften jordmagnetfeltet utøver på lederen, hvis strømmen går:</p>
        <p>a) fra vest mot øst</p>
        <p>b) vertikalt oppover</p>
        <p>c) fra nord mot sør</p>
        <p>d) Er magnetkraften stor nok til å ha merkbare effekter i vanlige husholdningsforhold?</p>
        <SvgEx27_30 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Lengde: <InlineLatex latex="l = 2{,}5\;\text{m}" /></li>
        <li>Strøm: <InlineLatex latex="I = 1{,}5\;\text{A}" /></li>
        <li>Jordmagnetfelt: <InlineLatex latex="B = 55\;\mu\text{T} = 5{,}5\cdot 10^{-5}\;\text{T}" /> (S→N)</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Kraftens størrelse og retning i hvert tilfelle</li>
        <li>Vurdering av effektens størrelsesorden</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Bruk <InlineLatex latex="\vec{F} = I\vec{l}\times\vec{B}" />, størrelse{" "}
        <InlineLatex latex="F=IlB\sin\theta" />. Sett koordinater: +x = øst, +y = nord, +z = opp.
        <InlineLatex latex="\vec{B}=B\hat{j}" /> (mot nord). For hver retning, finn <InlineLatex latex="\vec{l}" /> og bruk kryssprodukt.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="IlB = (1{,}5)(2{,}5)(5{,}5\cdot 10^{-5})=2{,}06\cdot 10^{-4}\;\text{N}" /> — dette er maks kraft (når sin θ = 1).</p> },
      { label: "Hint 2", content: <p>(c): Strømmen er parallell med B (N-retning eller S), så F = 0.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox
          latex="IlB = (1{,}5)(2{,}5)(5{,}5\cdot 10^{-5}) = 2{,}06\cdot 10^{-4}\;\text{N}"
          variant="blue"
        />

        <p className="font-semibold text-sm">a) Strøm V→Ø, altså <InlineLatex latex="\vec{l}=l\hat{i}" />. B = B<InlineLatex latex="\hat{j}" />.</p>
        <FormulaBox
          latex="\vec{F} = Il\hat{i}\times B\hat{j} = IlB\,\hat{k} = 2{,}06\cdot 10^{-4}\;\text{N}\;(\text{opp})"
          variant="blue"
        />
        <p className="text-sm">Størrelse <InlineLatex latex="\boxed{2{,}1\cdot 10^{-4}\;\text{N, rett opp}}" />.</p>

        <p className="font-semibold text-sm">b) Strøm vertikalt opp, <InlineLatex latex="\vec{l}=l\hat{k}" />.</p>
        <FormulaBox
          latex="\vec{F} = Il\hat{k}\times B\hat{j} = -IlB\,\hat{i} = 2{,}06\cdot 10^{-4}\;\text{N}\;(\text{mot vest})"
          variant="blue"
        />
        <p className="text-sm"><InlineLatex latex="\boxed{2{,}1\cdot 10^{-4}\;\text{N, mot vest}}" />.</p>

        <p className="font-semibold text-sm">c) Strøm N→S, <InlineLatex latex="\vec{l}=-l\hat{j}" />.</p>
        <FormulaBox
          latex="\vec{F} = -Il\hat{j}\times B\hat{j} = 0"
          variant="gold"
        />
        <p className="text-sm">Parallell med B, så <strong>F = 0</strong>.</p>

        <p className="font-semibold text-sm">d) Merkbar i hverdagen?</p>
        <p className="text-sm">
          Maks kraft ≈ 2·10⁻⁴ N. Dette tilsvarer å løfte ca. 20 mg. Husholdningsledninger har typisk vekt på kilogram.
          <strong> Effekten er forsvinnende liten</strong> og ikke merkbar i daglige forhold.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Kraften på en strømførende leder i jordmagnetfeltet er maks når strømmen er vinkelrett på B. Selv da er kraften
        svært liten for vanlige strømmer. Høyrehåndsregelen + sin θ-faktoren styrer både størrelse og retning.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.31 — Magnetisk balanse (stang henger på to støtter)
  // ════════════════════════════════════════════════════════════════════════════
  "27.31": {
    title: "Magnetisk balanse — finn maksspenning",
    difficulty: "middels",
    pageRef: "Side 938",
    problem: (
      <div className="space-y-2">
        <p>
          En tynn metallstang på 50,0 cm med masse 750 g hviler på to metalliske støtter som er festet til
          uniformt <InlineLatex latex="B=0{,}450\;\text{T}" /> magnetfelt. Et batteri og en motstand på{" "}
          <InlineLatex latex="R = 25{,}0\;\Omega" /> er koblet i serie med støttene.
        </p>
        <p>a) Hva er den høyeste spenningen batteriet kan ha uten å bryte kretsen ved støttene?</p>
        <p>
          b) Ved maksspenning blir motstanden plutselig delvis kortsluttet, og faller til 2,0 Ω. Finn initiell
          akselerasjon til stangen.
        </p>
        <SvgEx27_31 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Lengde: <InlineLatex latex="l=0{,}500\;\text{m}" /></li>
        <li>Masse: <InlineLatex latex="m=0{,}750\;\text{kg}" /></li>
        <li>Magnetfelt: <InlineLatex latex="B=0{,}450\;\text{T}" /> (inn i arket)</li>
        <li>Motstand: <InlineLatex latex="R=25{,}0\;\Omega" />; senere <InlineLatex latex="R'=2{,}0\;\Omega" /></li>
        <li>Tyngdeakselerasjon: <InlineLatex latex="g = 9{,}80\;\text{m/s}^2" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>a) Maks spenning V før kretsen brytes</li>
        <li>b) Initiell akselerasjon etter kortslutning</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Kretsen "brytes" når magnetkraften opp er lik tyngden — stangen "flyter". Ved likevekt:{" "}
        <InlineLatex latex="IlB = mg" /> gir <InlineLatex latex="I_{maks}=mg/(lB)" />, deretter{" "}
        <InlineLatex latex="V_{maks}=I_{maks}R" />. Ved kortslutning blir strømmen mye større, netto kraft opp,
        og <InlineLatex latex="a = (F_{mag}-mg)/m" />.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Ved "bryting" er normalkraften null — stangen er i likevekt under tyngde og magnetkraft.</p> },
      { label: "Hint 2", content: <p>Ny strøm: <InlineLatex latex="I'=V_{maks}/R'" />. Kraft: <InlineLatex latex="F'=I'lB" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-sm">a) Maks spenning</p>
        <p className="text-sm">Likevekt: <InlineLatex latex="IlB=mg" />.</p>
        <FormulaBox
          latex="I_{maks} = \frac{mg}{lB} = \frac{(0{,}750)(9{,}80)}{(0{,}500)(0{,}450)} = 32{,}67\;\text{A}"
          variant="blue"
        />
        <FormulaBox
          latex="V_{maks} = I_{maks}R = (32{,}67)(25{,}0) = \boxed{817\;\text{V}}"
          variant="gold"
        />

        <p className="font-semibold text-sm mt-2">b) Akselerasjon etter kortslutning</p>
        <FormulaBox
          latex="I' = \frac{V_{maks}}{R'} = \frac{817}{2{,}0} = 408{,}5\;\text{A}"
          variant="blue"
        />
        <FormulaBox
          latex="F'_{mag} = I'lB = (408{,}5)(0{,}500)(0{,}450) = 91{,}9\;\text{N}"
          variant="blue"
        />
        <FormulaBox
          latex="a = \frac{F'_{mag} - mg}{m} = \frac{91{,}9 - (0{,}750)(9{,}80)}{0{,}750}"
          variant="blue"
        />
        <FormulaBox
          latex="a = \boxed{113\;\text{m/s}^2\;(\text{oppover})}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Denne oppgaven kombinerer Newtons 1. lov (likevekt) og 2. lov (akselerasjon). Finn først{" "}
        <InlineLatex latex="I_{maks}" /> fra <InlineLatex latex="IlB=mg" />, deretter <InlineLatex latex="V=IR" />.
        Etter kortslutning vil F langt overstige mg → kraftig akselerasjon oppover.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.32 — Leder gjennom sylindrisk magnetfelt
  // ════════════════════════════════════════════════════════════════════════════
  "27.32": {
    title: "Kraft på leder i elektromagnet",
    difficulty: "lett",
    pageRef: "Side 938",
    problem: (
      <div className="space-y-2">
        <p>
          En elektromagnet produserer <InlineLatex latex="B = 0{,}600\;\text{T}" /> i en sylindrisk region med{" "}
          <InlineLatex latex="d = 2{,}60\;\text{cm}" /> diameter mellom polene. En rett leder med strøm{" "}
          <InlineLatex latex="I = 11{,}0\;\text{A}" /> går gjennom sentrum av denne regionen og står vinkelrett
          på både sylinderaksen og magnetfeltet.
        </p>
        <p>Hvor stor kraft utøver magnetfeltet på lederen?</p>
        <SvgEx27_32 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Magnetfelt: <InlineLatex latex="B = 0{,}600\;\text{T}" /></li>
        <li>Diameter (= lengde i felt): <InlineLatex latex="l = d = 2{,}60\;\text{cm} = 0{,}0260\;\text{m}" /></li>
        <li>Strøm: <InlineLatex latex="I = 11{,}0\;\text{A}" /></li>
        <li>Leder vinkelrett på B: <InlineLatex latex="\theta=90°" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Kraften F på den delen av lederen som er i feltet</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Kun delen av lederen som er <em>innenfor</em> sylinderen opplever kraften (utenfor er B ≈ 0). Lengden
        er lik diameteren siden lederen passerer gjennom sentrum vinkelrett på aksen. Bruk{" "}
        <InlineLatex latex="F = IlB" /> (sin 90° = 1).
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Effektiv lengde = diameter, siden det er den delen av lederen som befinner seg i feltet.</p> },
      { label: "Hint 2", content: <p>Vinkelen er 90°, så sin θ = 1.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <FormulaBox
          latex="F = IlB\sin\theta = (11{,}0)(0{,}0260)(0{,}600)(1)"
          variant="blue"
        />
        <FormulaBox
          latex="F = \boxed{0{,}172\;\text{N}}"
          variant="gold"
        />
        <p className="text-sm">Retningen bestemmes av høyrehåndsregelen <InlineLatex latex="\vec{l}\times\vec{B}" />.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når en leder passerer gjennom en begrenset feltregion, er det bare lengden <em>inne i feltet</em> som bidrar.
        Her bruker vi diameteren. Ekstremt enkel anvendelse av <InlineLatex latex="F=IlB" />.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.34 — Vertikal leder i horisontal B, tre retninger
  // ════════════════════════════════════════════════════════════════════════════
  "27.34": {
    title: "Vertikal leder i supraleder-magnet",
    difficulty: "middels",
    pageRef: "Side 939",
    problem: (
      <div className="space-y-2">
        <p>
          En rett, vertikal leder fører <InlineLatex latex="I = 2{,}60\;\text{A}" /> nedover i en region mellom polene til en stor
          supraledende elektromagnet, der feltet har størrelse <InlineLatex latex="B = 0{,}588\;\text{T}" /> og er horisontalt.
        </p>
        <p>Hva er størrelsen og retningen på magnetkraften på en 1,00 cm del av lederen som er i feltet hvis B er:</p>
        <p>a) mot øst</p>
        <p>b) mot sør</p>
        <p>c) 30,0° sør for vest?</p>
        <SvgEx27_34 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Strøm: <InlineLatex latex="I = 2{,}60\;\text{A}" /> (ned)</li>
        <li>Magnetfelt: <InlineLatex latex="B = 0{,}588\;\text{T}" /></li>
        <li>Lengde: <InlineLatex latex="l = 1{,}00\cdot 10^{-2}\;\text{m}" /> (typisk valg — ikke eksplisitt gitt i all versjoner, men brukes for numerikk hvis oppgaven ikke spesifiserer; vi holder <em>per meter</em> ellers)</li>
        <li className="text-xs text-[var(--muted)]">Koordinater: +x = øst, +y = nord, +z = opp</li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>F (størrelse og retning) i tre B-retninger</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Strømmen er alltid vertikal (ned, <InlineLatex latex="\vec{l}=-l\hat{k}" />) og horisontal B er alltid vinkelrett,
        så <InlineLatex latex="\sin\theta=1" />. Størrelsen av kraft per meter er{" "}
        <InlineLatex latex="F/l = IB = (2{,}60)(0{,}588)=1{,}529\;\text{N/m}" />. Vi angir <em>total</em> kraft og retning
        via kryssproduktet for hver B-retning.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p><InlineLatex latex="\vec{l}=-l\hat{k}" /> (ned). Sett opp <InlineLatex latex="\vec{F}=I\vec{l}\times\vec{B}" />.</p> },
      { label: "Hint 2", content: <p>Bruk <InlineLatex latex="\hat{k}\times\hat{i}=\hat{j}" /> og <InlineLatex latex="\hat{k}\times\hat{j}=-\hat{i}" />.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="text-sm">
          Størrelse: <InlineLatex latex="F = IlB\sin 90° = IlB" />. Vi tar med kraft per meter
          (<InlineLatex latex="IB = 1{,}529\;\text{N/m}" />), og totalkraft er dette ganger lengden i feltet.
        </p>

        <p className="font-semibold text-sm">a) B mot øst, <InlineLatex latex="\vec{B}=B\hat{i}" /></p>
        <FormulaBox
          latex="\vec{F}=I(-l\hat{k})\times B\hat{i} = -IlB(\hat{k}\times\hat{i}) = -IlB\,\hat{j}\;(\text{mot sør})"
          variant="blue"
        />
        <p className="text-sm"><InlineLatex latex="F/l = \boxed{1{,}53\;\text{N/m, mot sør}}" />.</p>

        <p className="font-semibold text-sm">b) B mot sør, <InlineLatex latex="\vec{B}=-B\hat{j}" /></p>
        <FormulaBox
          latex="\vec{F}=I(-l\hat{k})\times(-B\hat{j}) = IlB(\hat{k}\times\hat{j}) = -IlB\,\hat{i}\;(\text{mot vest})"
          variant="blue"
        />
        <p className="text-sm"><InlineLatex latex="F/l = \boxed{1{,}53\;\text{N/m, mot vest}}" />.</p>

        <p className="font-semibold text-sm">c) B 30° sør for vest</p>
        <p className="text-sm">
          <InlineLatex latex="\vec{B}=B(-\cos 30°\hat{i}-\sin 30°\hat{j})" />.
        </p>
        <FormulaBox
          latex="\vec{F} = I(-l\hat{k})\times B(-\cos 30°\hat{i}-\sin 30°\hat{j}) = IlB(\cos 30°\hat{j}-\sin 30°\hat{i})"
          variant="blue"
        />
        <p className="text-sm">
          Komponenter: <InlineLatex latex="F_x=-IlB\sin 30°" />, <InlineLatex latex="F_y=+IlB\cos 30°" />.
          Kraftens retning er 30° øst for nord (eller 60° nord for øst).
        </p>
        <FormulaBox
          latex="|\vec{F}|/l = IB = \boxed{1{,}53\;\text{N/m, 30° øst for nord}}"
          variant="gold"
        />
      </div>
    ),
    summary: (
      <p className="text-sm">
        Når B er horisontal og I er vertikal, er kraften alltid vinkelrett på begge — altså horisontal, med samme
        størrelse <InlineLatex latex="IlB" />. Kun <em>retningen</em> endrer seg når vi roterer B. Høyrehåndsregelen gir
        raskt svaret: <InlineLatex latex="\vec{F}" /> ligger 90° mot venstre når du ser <em>nedover</em> langs strømmen.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.47 (Problems) — Partikkel i E og B parallelle, sirkelbane + spiral
  // ════════════════════════════════════════════════════════════════════════════
  "27.47": {
    title: "Partikkel i parallelle E- og B-felt",
    difficulty: "vanskelig",
    pageRef: "Side 940",
    problem: (
      <div className="space-y-2">
        <p>
          En liten partikkel med positiv ladning <InlineLatex latex="q = +3{,}75\cdot 10^{-4}\;\text{C}" /> og masse{" "}
          <InlineLatex latex="m = 5{,}00\cdot 10^{-5}\;\text{kg}" /> beveger seg i et område med uniformt elektrisk
          og magnetisk felt. Magnetfeltet er <InlineLatex latex="\vec{B}=4{,}00\;\text{T}\,\hat{k}" /> og{" "}
          elektrisk felt <InlineLatex latex="\vec{E}=60{,}0\;\text{N/C}\,\hat{k}" />.
        </p>
        <p>
          Ved <InlineLatex latex="t=0" /> er partikkelen på y-aksen ved <InlineLatex latex="y=+1{,}00\;\text{m}" /> og
          har hastighet <InlineLatex latex="\vec{v}=30{,}0\;\text{m/s}\,\hat{i}" />. Neglisjér tyngde.
        </p>
        <p>a) Finn (x, y, z)-koordinatene ved <InlineLatex latex="t = 0{,}0200\;\text{s}" />.</p>
        <p>b) Finn farten ved <InlineLatex latex="t = 0{,}0200\;\text{s}" />.</p>
        <SvgEx27_47 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li><InlineLatex latex="q=+3{,}75\cdot 10^{-4}\;\text{C}" />, <InlineLatex latex="m=5{,}00\cdot 10^{-5}\;\text{kg}" /></li>
        <li><InlineLatex latex="\vec{B}=4{,}00\;\text{T}\,\hat{k}" />, <InlineLatex latex="\vec{E}=60{,}0\;\text{N/C}\,\hat{k}" /></li>
        <li>Start: <InlineLatex latex="\vec{r}_0=(0,1{,}00,0)\;\text{m}" />, <InlineLatex latex="\vec{v}_0=30{,}0\;\hat{i}\;\text{m/s}" /></li>
        <li>Tid: <InlineLatex latex="t=0{,}0200\;\text{s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>a) <InlineLatex latex="(x,y,z)" /> ved <InlineLatex latex="t=0{,}0200\;\text{s}" /></li>
        <li>b) Fart ved samme tidspunkt</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        Dekomponér bevegelsen: xy-planet er vinkelrett på B → <strong>sirkelbane</strong> med konstant fart
        <InlineLatex latex="v_\perp=30{,}0\;\text{m/s}" />. Langs z har vi bare elektrisk kraft (siden magnetkraften
        ikke har z-komponent når v er i xy) → <strong>konstant akselerasjon</strong>. Resultatet er en spiral
        (helix) med stigende hastighet langs z. Først finn vinkelhastighet, radius, og sirkelposisjon ved t;
        deretter z og <InlineLatex latex="v_z" /> separat.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Vinkelhastighet <InlineLatex latex="\omega=|q|B/m" />, radius <InlineLatex latex="r=v_\perp/\omega" />.</p> },
      { label: "Hint 2", content: <p>z-bevegelsen: <InlineLatex latex="a_z=qE/m" />, <InlineLatex latex="z(t)=\tfrac{1}{2}a_z t^2" />.</p> },
      { label: "Hint 3", content: <p>Sirkelsenteret: Siden <InlineLatex latex="\vec{v}_0=v_0\hat{i}" /> og sentripetal F peker mot sentrum, se hvilken retning. For <InlineLatex latex="\vec{v}\times\vec{B}" /> med B = +z og v = +x er kraften i −y. Senteret er da ved y = y₀ − r.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-sm">Steg 1: Vinkelhastighet og radius</p>
        <FormulaBox
          latex="\omega = \frac{|q|B}{m} = \frac{(3{,}75\cdot 10^{-4})(4{,}00)}{5{,}00\cdot 10^{-5}} = 30{,}0\;\text{rad/s}"
          variant="blue"
        />
        <FormulaBox
          latex="r = \frac{v_\perp}{\omega} = \frac{30{,}0}{30{,}0} = 1{,}00\;\text{m}"
          variant="blue"
        />

        <p className="font-semibold text-sm">Steg 2: Vinkel ved <InlineLatex latex="t=0{,}0200\;\text{s}" /></p>
        <FormulaBox
          latex="\theta = \omega t = (30{,}0)(0{,}0200) = 0{,}600\;\text{rad}\;(\approx 34{,}38°)"
          variant="blue"
        />

        <p className="font-semibold text-sm">Steg 3: Sirkelsenter i xy-planet</p>
        <p className="text-sm">
          Ved <InlineLatex latex="t=0" /> har q&gt;0 fart <InlineLatex latex="v_0\hat{i}" /> og B = +z.{" "}
          <InlineLatex latex="\vec{F} = q\vec{v}\times\vec{B} = qv_0 B(\hat{i}\times\hat{k}) = -qv_0 B\hat{j}" />{" "}
          → sentripetal i −y. Senter ligger dermed ved <InlineLatex latex="(x_c,y_c)=(0, 1{,}00 - 1{,}00) = (0, 0)" />.
          Partikkelen sirkler i klokkeretning (sett ovenfra, +z opp).
        </p>

        <p className="font-semibold text-sm">Steg 4: xy-posisjon som funksjon av t</p>
        <p className="text-sm">
          Med senter i origo og start ved (0, 1): <InlineLatex latex="x(t)=r\sin(\omega t)" />, <InlineLatex latex="y(t)=r\cos(\omega t)" />.
        </p>
        <FormulaBox
          latex="x = 1{,}00\sin 0{,}600 = 0{,}5646\;\text{m},\quad y = 1{,}00\cos 0{,}600 = 0{,}8253\;\text{m}"
          variant="blue"
        />

        <p className="font-semibold text-sm">Steg 5: z-bevegelse (elektrisk akselerasjon)</p>
        <FormulaBox
          latex="a_z = \frac{qE}{m} = \frac{(3{,}75\cdot 10^{-4})(60{,}0)}{5{,}00\cdot 10^{-5}} = 450\;\text{m/s}^2"
          variant="blue"
        />
        <FormulaBox
          latex="z(t) = \tfrac{1}{2}a_z t^2 = \tfrac{1}{2}(450)(0{,}0200)^2 = 0{,}0900\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="(x,y,z)\big|_{t=0{,}0200} = \boxed{(0{,}565;\;0{,}825;\;0{,}0900)\;\text{m}}"
          variant="gold"
        />

        <p className="font-semibold text-sm mt-2">Steg 6: Farten</p>
        <p className="text-sm">
          I xy-planet er farten konstant (<InlineLatex latex="v_\perp = 30{,}0\;\text{m/s}" />). Langs z:
        </p>
        <FormulaBox
          latex="v_z = a_z t = (450)(0{,}0200) = 9{,}00\;\text{m/s}"
          variant="blue"
        />
        <FormulaBox
          latex="v = \sqrt{v_\perp^2 + v_z^2} = \sqrt{30{,}0^2 + 9{,}00^2} = \sqrt{900+81}"
          variant="blue"
        />
        <FormulaBox
          latex="v = \boxed{31{,}3\;\text{m/s}}"
          variant="gold"
        />
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2">
        <p className="text-sm">
          <strong>Energibetraktning:</strong> Magnetkraften gjør <em>ikke</em> arbeid, så hele fartøkningen kommer
          fra E-feltet:
        </p>
        <FormulaBox
          latex="\tfrac{1}{2}mv^2 - \tfrac{1}{2}mv_0^2 = qE\cdot z \Rightarrow v = \sqrt{v_0^2 + 2(qE/m)z}"
          variant="blue"
        />
        <p className="text-sm">
          <InlineLatex latex="v=\sqrt{900 + 2(450)(0{,}0900)} = \sqrt{900+81} = 31{,}3\;\text{m/s}" /> — samme svar.
        </p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Separér bevegelsen i vinkelrett- (sirkel i B) og parallell- (rettlinjet, kun E) komponenter når E‖B.
        Magnetkraften påvirker bare <InlineLatex latex="v_\perp" />, E-feltet endrer kinetisk energi i z-retningen.
        Dette gir en <em>akselererende spiral</em>.
      </p>
    ),
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 27.59 — Rail gun
  // ════════════════════════════════════════════════════════════════════════════
  "27.59": {
    title: "Elektromagnetisk railgun",
    difficulty: "vanskelig",
    pageRef: "Side 940",
    problem: (
      <div className="space-y-2">
        <p>
          En elektromagnetisk railgun består av en ledende stang med masse <InlineLatex latex="m" /> og lengde{" "}
          <InlineLatex latex="L" /> som glir langs to horisontale skinner. En spenningskilde holder konstant strøm{" "}
          <InlineLatex latex="I" /> i skinnene og stangen, og et konstant uniformt vertikalt magnetfelt{" "}
          <InlineLatex latex="B" /> fyller regionen mellom skinnene.
        </p>
        <p>a) Finn størrelsen og retningen på nettokraften på stangen (neglisjér friksjon, luftmotstand, elektrisk motstand).</p>
        <p>
          b) Finn avstanden <InlineLatex latex="d" /> stangen må bevege seg langs skinnene fra ro for å nå farten{" "}
          <InlineLatex latex="v" />.
        </p>
        <p>
          c) Hvor langt må stangen reise for å nå jordens rømningsfart (<InlineLatex latex="11{,}2\;\text{km/s}" />)?
          Bruk <InlineLatex latex="B=0{,}82\;\text{T}" />, <InlineLatex latex="I=2{,}4\cdot 10^{3}\;\text{A}" />,{" "}
          <InlineLatex latex="m=30\;\text{kg}" />, <InlineLatex latex="L=0{,}51\;\text{m}" />.
        </p>
        <SvgEx27_59 />
      </div>
    ),
    knowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>Generelt: m, L, I, B (vertikalt)</li>
        <li>Stangen glir horisontalt, vinkelrett på B</li>
        <li>Del (c): <InlineLatex latex="B=0{,}82\;\text{T}" />, <InlineLatex latex="I=2{,}4\cdot 10^{3}\;\text{A}" />, <InlineLatex latex="m=30\;\text{kg}" />, <InlineLatex latex="L=0{,}51\;\text{m}" />, <InlineLatex latex="v=1{,}12\cdot 10^{4}\;\text{m/s}" /></li>
      </ul>
    ),
    unknowns: (
      <ul className="text-sm space-y-0.5 list-disc pl-5">
        <li>a) Nettokraft <InlineLatex latex="F=ILB" />, retning horisontalt langs skinnene</li>
        <li>b) <InlineLatex latex="d=mv^2/(2ILB)" /></li>
        <li>c) Numerisk avstand for rømningsfart</li>
      </ul>
    ),
    strategy: (
      <p className="text-sm">
        (a) Stangen (horisontal, vinkelrett på B vertikal) får kraft <InlineLatex latex="F = ILB\sin 90° = ILB" />,
        retning langs skinnene ved høyrehåndsregelen. (b) Konstant kraft → konstant akselerasjon{" "}
        <InlineLatex latex="a=F/m=ILB/m" />. Bruk <InlineLatex latex="v^2 = 2ad" /> (start fra ro) og løs for d.
        (c) Bare sett inn tallene.
      </p>
    ),
    hints: [
      { label: "Hint 1", content: <p>Kinematikk fra ro: <InlineLatex latex="v^2 = v_0^2 + 2ad" /> med <InlineLatex latex="v_0=0" />.</p> },
      { label: "Hint 2", content: <p>Eller energibetraktning: <InlineLatex latex="W=Fd=\tfrac{1}{2}mv^2" />.</p> },
      { label: "Hint 3", content: <p>I del (c), omgjør km/s til m/s før innsetting.</p> },
    ],
    solution: (
      <div className="space-y-3">
        <p className="font-semibold text-sm">a) Kraft på stangen</p>
        <FormulaBox
          latex="\boxed{F = ILB},\;\text{retning langs skinnene}"
          variant="blue"
        />
        <p className="text-sm">Retningen er <InlineLatex latex="\vec{I}\times\vec{B}" /> — horisontalt, bort fra spenningskilden.</p>

        <p className="font-semibold text-sm mt-2">b) Avstand som funksjon av v</p>
        <FormulaBox
          latex="a = \frac{F}{m} = \frac{ILB}{m}"
          variant="blue"
        />
        <FormulaBox
          latex="v^2 = 2ad \Rightarrow d = \frac{v^2}{2a} = \frac{mv^2}{2ILB}"
          variant="blue"
        />
        <FormulaBox
          latex="\boxed{d = \dfrac{m v^2}{2\,I L B}}"
          variant="gold"
        />

        <p className="font-semibold text-sm mt-2">c) Numerisk — rømningsfart</p>
        <FormulaBox
          latex="d = \frac{(30)(1{,}12\cdot 10^{4})^2}{2(2{,}4\cdot 10^{3})(0{,}51)(0{,}82)}"
          variant="blue"
        />
        <FormulaBox
          latex="d = \frac{(30)(1{,}2544\cdot 10^{8})}{2008}\;\text{m}"
          variant="blue"
        />
        <FormulaBox
          latex="d = \boxed{1{,}87\cdot 10^{6}\;\text{m} \approx 1\,870\;\text{km}}"
          variant="gold"
        />
      </div>
    ),
    alternativeSolution: (
      <div className="space-y-2">
        <p className="text-sm">
          <strong>Energibetraktning direkte:</strong> Arbeid gjort av konstant kraft = kinetisk energi vunnet:
        </p>
        <FormulaBox
          latex="ILB\cdot d = \tfrac{1}{2}mv^2 \;\Rightarrow\; d = \frac{mv^2}{2ILB}"
          variant="blue"
        />
        <p className="text-sm">Samme formel, raskere vei.</p>
      </div>
    ),
    summary: (
      <p className="text-sm">
        Railgun er en direkte anvendelse av <InlineLatex latex="F=ILB" /> og arbeidsteoremet. For å nå rømningsfart
        trengs skinner på nesten 2000 km — derfor er dette foreløpig urealistisk i praksis, selv om prinsippet er
        enkelt. Merk: I virkelige railguns vokser motstand og stråling dramatisk ved slike strømmer; denne oppgaven
        neglisjerer alt det.
      </p>
    ),
  },
};
