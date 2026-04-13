"use client";

/* ═══════════════════════════════════════════════
   SVG UML-diagrammer for DAT109 Modellering
   Brukstilfellesdiagrammer, domenemodeller og sekvensdiagrammer
   ═══════════════════════════════════════════════ */

/* ── Fargevariabler for konsistent theming ── */
const C = {
  // Streker og tekst
  stroke: "currentColor",
  textFill: "currentColor",
  // Fargede elementer
  actorStroke: "#3b82f6",    // blue-500
  ucFill: "#eff6ff",         // blue-50
  ucStroke: "#3b82f6",       // blue-500
  systemFill: "#f8fafc",     // slate-50
  systemStroke: "#94a3b8",   // slate-400
  classFill: "#f0fdf4",      // green-50
  classStroke: "#22c55e",    // green-500
  classHeader: "#dcfce7",    // green-100
  abstractFill: "#faf5ff",   // purple-50
  abstractStroke: "#a855f7", // purple-500
  abstractHeader: "#f3e8ff", // purple-100
  seqObjFill: "#eff6ff",     // blue-50
  seqObjStroke: "#3b82f6",   // blue-500
  fragmentFill: "#fefce8",   // yellow-50
  fragmentStroke: "#eab308", // yellow-500
  arrowFill: "#334155",      // slate-700
  dashStroke: "#94a3b8",     // slate-400
  includeStroke: "#6366f1",  // indigo-500
};

/* ── Stick Figure Helper ── */
function StickFigure({ x, y, label, color = C.actorStroke }: { x: number; y: number; label: string; color?: string }) {
  return (
    <g>
      {/* Head */}
      <circle cx={x} cy={y - 20} r={8} fill="none" stroke={color} strokeWidth={1.5} />
      {/* Body */}
      <line x1={x} y1={y - 12} x2={x} y2={y + 8} stroke={color} strokeWidth={1.5} />
      {/* Arms */}
      <line x1={x - 12} y1={y - 4} x2={x + 12} y2={y - 4} stroke={color} strokeWidth={1.5} />
      {/* Legs */}
      <line x1={x} y1={y + 8} x2={x - 10} y2={y + 22} stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={y + 8} x2={x + 10} y2={y + 22} stroke={color} strokeWidth={1.5} />
      {/* Label */}
      <text x={x} y={y + 38} textAnchor="middle" fontSize={11} fill={color} fontWeight={600}>{label}</text>
    </g>
  );
}

/* ── Use Case Ellipse ── */
function UseCase({ cx, cy, label, w = 110 }: { cx: number; cy: number; label: string; w?: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={20} fill={C.ucFill} stroke={C.ucStroke} strokeWidth={1.5} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill={C.textFill} fontWeight={500}>{label}</text>
    </g>
  );
}

/* ── Class Box ── */
function ClassBox({
  x,
  y,
  name,
  attrs = [],
  methods = [],
  w = 120,
  isAbstract = false,
}: {
  x: number;
  y: number;
  name: string;
  attrs?: string[];
  methods?: string[];
  w?: number;
  isAbstract?: boolean;
}) {
  const headerH = 24;
  const lineH = 16;
  const attrH = attrs.length * lineH + (attrs.length > 0 ? 8 : 4);
  const methodH = methods.length > 0 ? methods.length * lineH + 8 : 0;
  const totalH = headerH + attrH + methodH;
  const fill = isAbstract ? C.abstractFill : C.classFill;
  const stroke = isAbstract ? C.abstractStroke : C.classStroke;
  const headerFill = isAbstract ? C.abstractHeader : C.classHeader;

  return (
    <g>
      <rect x={x} y={y} width={w} height={totalH} fill={fill} stroke={stroke} strokeWidth={1.5} rx={3} />
      <rect x={x} y={y} width={w} height={headerH} fill={headerFill} stroke={stroke} strokeWidth={1.5} rx={3} />
      {/* Clip bottom corners of header */}
      <rect x={x + 0.75} y={y + headerH - 6} width={w - 1.5} height={6} fill={headerFill} />
      <line x1={x} y1={y + headerH} x2={x + w} y2={y + headerH} stroke={stroke} strokeWidth={1} />
      <text
        x={x + w / 2}
        y={y + headerH / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fontStyle={isAbstract ? "italic" : "normal"}
        fill={C.textFill}
      >
        {isAbstract && <tspan fontSize={9} fontWeight={400}>{"«abstract» "}</tspan>}
        {name}
      </text>
      {/* Attributes */}
      {attrs.map((attr, i) => (
        <text key={i} x={x + 6} y={y + headerH + 16 + i * lineH} fontSize={10} fill={C.textFill}>{attr}</text>
      ))}
      {/* Method separator */}
      {methods.length > 0 && (
        <line x1={x} y1={y + headerH + attrH} x2={x + w} y2={y + headerH + attrH} stroke={stroke} strokeWidth={1} />
      )}
      {methods.map((m, i) => (
        <text key={i} x={x + 6} y={y + headerH + attrH + 16 + i * lineH} fontSize={10} fill={C.textFill}>{m}</text>
      ))}
    </g>
  );
}

/* ── Arrow with text ── */
function Arrow({
  x1, y1, x2, y2,
  label = "",
  dashed = false,
  labelAbove = true,
}: {
  x1: number; y1: number; x2: number; y2: number;
  label?: string;
  dashed?: boolean;
  labelAbove?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 8;
  const ax1 = x2 - headLen * Math.cos(angle - Math.PI / 6);
  const ay1 = y2 - headLen * Math.sin(angle - Math.PI / 6);
  const ax2 = x2 - headLen * Math.cos(angle + Math.PI / 6);
  const ay2 = y2 - headLen * Math.sin(angle + Math.PI / 6);

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={dashed ? C.includeStroke : C.stroke}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "6 3" : undefined}
      />
      <polygon points={`${x2},${y2} ${ax1},${ay1} ${ax2},${ay2}`} fill={dashed ? C.includeStroke : C.arrowFill} />
      {label && (
        <text
          x={mx}
          y={labelAbove ? my - 6 : my + 14}
          textAnchor="middle"
          fontSize={10}
          fill={dashed ? C.includeStroke : C.textFill}
          fontStyle={dashed ? "italic" : "normal"}
          fontWeight={dashed ? 600 : 400}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ═══════════════════════════════════════════════
   BRUKSTILFELLESDIAGRAMMER
   ═══════════════════════════════════════════════ */

export function UseCaseMonopol() {
  return (
    <svg viewBox="0 0 420 220" className="w-full max-w-md mx-auto" role="img" aria-label="Brukstilfellesdiagram for Monopol">
      {/* System boundary */}
      <rect x={120} y={10} width={260} height={200} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={250} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.textFill}>Monopol</text>

      {/* Actor */}
      <StickFigure x={55} y={120} label="Observatør" />

      {/* Use cases */}
      <UseCase cx={260} cy={80} label="Init" />
      <UseCase cx={260} cy={150} label="Spill" />

      {/* Association: Observatør → Spill */}
      <line x1={80} y1={125} x2={205} y2={148} stroke={C.actorStroke} strokeWidth={1.5} />

      {/* Include: Spill → Init */}
      <line x1={260} y1={130} x2={260} y2={100} stroke={C.includeStroke} strokeWidth={1.5} strokeDasharray="6 3" />
      <polygon points="260,100 255,108 265,108" fill={C.includeStroke} />
      <text x={290} y={118} fontSize={10} fill={C.includeStroke} fontStyle="italic" fontWeight={600}>{"<<include>>"}</text>
    </svg>
  );
}

export function UseCaseStigespill() {
  return (
    <svg viewBox="0 0 400 180" className="w-full max-w-sm mx-auto" role="img" aria-label="Brukstilfellesdiagram for Stigespill">
      {/* System boundary */}
      <rect x={130} y={10} width={240} height={160} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={250} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.textFill}>Stigespill</text>

      {/* Actor */}
      <StickFigure x={60} y={90} label="Observatør" />

      {/* Use case */}
      <UseCase cx={260} cy={95} label="Spill stigespill" w={130} />

      {/* Association */}
      <line x1={85} y1={95} x2={195} y2={95} stroke={C.actorStroke} strokeWidth={1.5} />
    </svg>
  );
}

export function UseCaseEksamen() {
  return (
    <svg viewBox="0 0 520 340" className="w-full max-w-lg mx-auto" role="img" aria-label="Brukstilfellesdiagram for Eksamenssystem">
      {/* System boundary */}
      <rect x={140} y={10} width={340} height={320} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={310} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.textFill}>Eksamenssystem</text>

      {/* Actors */}
      <StickFigure x={60} y={80} label="Lærer" />
      <StickFigure x={60} y={210} label="Student" />
      <StickFigure x={60} y={305} label="Klokke" color="#ef4444" />
      <text x={60} y={318} textAnchor="middle" fontSize={8} fill="#ef4444">{"<<actor>>"}</text>

      {/* Use cases */}
      <UseCase cx={300} cy={70} label="Lag oppgave" w={130} />
      <UseCase cx={300} cy={125} label="Definer eksamen" w={140} />
      <UseCase cx={300} cy={195} label="Besvar eksamen" w={135} />
      <UseCase cx={300} cy={255} label="Lever besvarelse" w={140} />
      <UseCase cx={300} cy={310} label="Godkjenn karakter" w={145} />

      {/* Associations */}
      <line x1={85} y1={78} x2={234} y2={70} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={83} x2={230} y2={122} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={210} x2={232} y2={195} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={302} x2={230} y2={258} stroke="#ef4444" strokeWidth={1.5} />
      <line x1={85} y1={85} x2={228} y2={305} stroke={C.actorStroke} strokeWidth={1.5} />

      {/* Include: Besvar eksamen → Lever besvarelse */}
      <line x1={300} y1={213} x2={300} y2={235} stroke={C.includeStroke} strokeWidth={1.5} strokeDasharray="6 3" />
      <polygon points="300,235 295,227 305,227" fill={C.includeStroke} />
      <text x={340} y={228} fontSize={9} fill={C.includeStroke} fontStyle="italic" fontWeight={600}>{"<<include>>"}</text>
    </svg>
  );
}

export function UseCaseMaxMummelmann() {
  return (
    <svg viewBox="0 0 460 260" className="w-full max-w-md mx-auto" role="img" aria-label="Brukstilfellesdiagram for Max Mümmelmann">
      {/* System boundary */}
      <rect x={150} y={10} width={280} height={240} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={290} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.textFill}>Max Mümmelmann</text>

      {/* Actors */}
      <StickFigure x={60} y={100} label="Admin" />
      <StickFigure x={60} y={200} label="Spiller" />

      {/* Use cases */}
      <UseCase cx={290} cy={70} label="Init spill" />
      <UseCase cx={290} cy={130} label="Start spill" />
      <UseCase cx={290} cy={200} label="Spill tur" />

      {/* Associations */}
      <line x1={85} y1={100} x2={235} y2={127} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={195} x2={235} y2={130} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={200} x2={235} y2={198} stroke={C.actorStroke} strokeWidth={1.5} />

      {/* Include: Start spill → Init spill */}
      <line x1={290} y1={110} x2={290} y2={90} stroke={C.includeStroke} strokeWidth={1.5} strokeDasharray="6 3" />
      <polygon points="290,90 285,98 295,98" fill={C.includeStroke} />
      <text x={325} y={104} fontSize={9} fill={C.includeStroke} fontStyle="italic" fontWeight={600}>{"<<include>>"}</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   DOMENEMODELLER
   ═══════════════════════════════════════════════ */

export function DomainMonopol() {
  return (
    <svg viewBox="0 0 680 420" className="w-full mx-auto" role="img" aria-label="Domenemodell for Monopol">
      {/* Monopol */}
      <ClassBox x={270} y={5} name="Monopol" attrs={["rundeNr"]} w={110} />

      {/* Brett */}
      <ClassBox x={60} y={90} name="Brett" w={100} />

      {/* Spiller */}
      <ClassBox x={270} y={90} name="Spiller" attrs={["navn", "penger"]} w={110} />

      {/* Kopp */}
      <ClassBox x={470} y={90} name="Kopp" attrs={["sum"]} w={100} />

      {/* Terning */}
      <ClassBox x={560} y={170} name="Terning" attrs={["verdi"]} w={100} />

      {/* Brikke */}
      <ClassBox x={430} y={210} name="Brikke" attrs={["navn"]} w={100} />

      {/* Rute (abstract) */}
      <ClassBox x={30} y={200} name="Rute" attrs={["navn"]} w={100} isAbstract />

      {/* Subtypes of Rute */}
      <ClassBox x={0} y={320} name="StartRute" w={90} />
      <ClassBox x={100} y={320} name="VanligRute" w={90} />
      <ClassBox x={200} y={320} name="SkjøteRute" attrs={["pris"]} w={100} isAbstract />

      {/* Subtypes of SkjøteRute */}
      <ClassBox x={170} y={400} name="Eiendom" w={85} />
      <ClassBox x={260} y={400} name="Jernbane" w={85} />
      <ClassBox x={350} y={400} name="Offentlig" w={85} />

      {/* ── Lines ── */}
      {/* Monopol → Brett (1:1) */}
      <line x1={270} y1={30} x2={160} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={190} y={55} fontSize={9} fill={C.textFill}>1</text>
      <text x={155} y={85} fontSize={9} fill={C.textFill}>1</text>

      {/* Monopol → Spiller (1:2..8) */}
      <line x1={325} y1={47} x2={325} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={330} y={62} fontSize={9} fill={C.textFill}>1</text>
      <text x={330} y={86} fontSize={9} fill={C.textFill}>2..8</text>

      {/* Monopol → Kopp (1:1) */}
      <line x1={380} y1={30} x2={470} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={410} y={50} fontSize={9} fill={C.textFill}>1</text>
      <text x={465} y={85} fontSize={9} fill={C.textFill}>1</text>

      {/* Brett → Rute (1:40, composition) */}
      <line x1={80} y1={114} x2={80} y2={200} stroke={C.classStroke} strokeWidth={1.5} />
      <polygon points="80,114 74,126 86,126" fill={C.classStroke} /> {/* filled diamond = composition */}
      <text x={85} y={140} fontSize={9} fill={C.textFill}>1</text>
      <text x={85} y={195} fontSize={9} fill={C.textFill}>40</text>

      {/* Kopp → Terning (1:2) */}
      <line x1={540} y1={130} x2={595} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={555} y={142} fontSize={9} fill={C.textFill}>1</text>
      <text x={590} y={168} fontSize={9} fill={C.textFill}>2</text>

      {/* Spiller → Brikke (Eier 1:1) */}
      <line x1={380} y1={130} x2={460} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={405} y={160} fontSize={9} fill={C.textFill}>1</text>
      <text x={445} y={205} fontSize={9} fill={C.textFill}>1</text>

      {/* Brikke → Rute (Er på 0..8:1) */}
      <line x1={430} y1={240} x2={130} y2={230} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={260} y={225} fontSize={9} fill={C.textFill} textAnchor="middle">Er på</text>
      <text x={140} y={225} fontSize={9} fill={C.textFill}>1</text>
      <text x={420} y={248} fontSize={9} fill={C.textFill}>0..8</text>

      {/* Rute → subtypes (inheritance) */}
      <line x1={80} y1={252} x2={80} y2={290} stroke={C.classStroke} strokeWidth={1.5} />
      <line x1={45} y1={290} x2={250} y2={290} stroke={C.classStroke} strokeWidth={1.5} />
      <polygon points="80,252 74,264 86,264" fill="none" stroke={C.classStroke} strokeWidth={1.5} /> {/* open triangle = inheritance */}
      <line x1={45} y1={290} x2={45} y2={320} stroke={C.classStroke} strokeWidth={1.5} />
      <line x1={145} y1={290} x2={145} y2={320} stroke={C.classStroke} strokeWidth={1.5} />
      <line x1={250} y1={290} x2={250} y2={320} stroke={C.classStroke} strokeWidth={1.5} />

      {/* SkjøteRute → subtypes */}
      <line x1={250} y1={368} x2={250} y2={385} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={210} y1={385} x2={390} y2={385} stroke={C.abstractStroke} strokeWidth={1.5} />
      <polygon points="250,368 244,380 256,380" fill="none" stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={210} y1={385} x2={210} y2={400} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={300} y1={385} x2={300} y2={400} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={390} y1={385} x2={390} y2={400} stroke={C.abstractStroke} strokeWidth={1.5} />

      {/* SkjøteRute → Spiller (Eier 0..1:*) */}
      <line x1={300} y1={330} x2={355} y2={180} stroke={C.classStroke} strokeWidth={1.5} strokeDasharray="4 2" />
      <text x={345} y={250} fontSize={9} fill={C.textFill} transform="rotate(-60, 345, 250)">Eier</text>
      <text x={310} y={330} fontSize={9} fill={C.textFill}>0..1</text>
      <text x={350} y={175} fontSize={9} fill={C.textFill}>*</text>
    </svg>
  );
}

export function DomainMaxMummelmann() {
  return (
    <svg viewBox="0 0 560 200" className="w-full max-w-lg mx-auto" role="img" aria-label="Domenemodell for Max Mümmelmann">
      {/* MaxMummelmann */}
      <ClassBox x={10} y={10} name="MaxMummelmann" w={120} />

      {/* Brett */}
      <ClassBox x={200} y={10} name="Brett" w={100} />

      {/* Rute */}
      <ClassBox x={370} y={10} name="Rute" w={90} />

      {/* Spiller */}
      <ClassBox x={10} y={100} name="Spiller" attrs={["navn"]} w={110} />

      {/* Kort */}
      <ClassBox x={200} y={100} name="Kort" attrs={["nummer"]} w={100} />

      {/* Terning */}
      <ClassBox x={370} y={100} name="Terning" attrs={["verdi"]} w={100} />

      {/* Brikke */}
      <ClassBox x={480} y={10} name="Brikke" w={80} />

      {/* MaxMummelmann → Brett (1:1) */}
      <line x1={130} y1={25} x2={200} y2={25} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={140} y={20} fontSize={9} fill={C.textFill}>1</text>
      <text x={190} y={20} fontSize={9} fill={C.textFill}>1</text>

      {/* Brett → Rute (1:8) */}
      <line x1={300} y1={25} x2={370} y2={25} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={310} y={20} fontSize={9} fill={C.textFill}>1</text>
      <text x={360} y={20} fontSize={9} fill={C.textFill}>8</text>

      {/* MaxMummelmann → Spiller (1:2..4) */}
      <line x1={70} y1={47} x2={70} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={76} y={60} fontSize={9} fill={C.textFill}>1</text>
      <text x={76} y={95} fontSize={9} fill={C.textFill}>2..4</text>

      {/* Spiller → Kort (0..6) */}
      <line x1={120} y1={120} x2={200} y2={120} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={150} y={115} fontSize={9} fill={C.textFill}>0..6</text>

      {/* Rute → Brikke (0..*:1) */}
      <line x1={460} y1={30} x2={480} y2={30} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={462} y={24} fontSize={9} fill={C.textFill}>0..*</text>
      <text x={480} y={45} fontSize={9} fill={C.textFill}>1</text>

      {/* MaxMummelmann → Terning (1:1) */}
      <line x1={130} y1={40} x2={370} y2={120} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={240} y={72} fontSize={9} fill={C.textFill}>1:1</text>
    </svg>
  );
}

export function DomainEksamen() {
  return (
    <svg viewBox="0 0 600 240" className="w-full max-w-lg mx-auto" role="img" aria-label="Domenemodell for Eksamenssystem">
      {/* Row 1: Lærer → Oppgave → Spørsmål → Svaralternativ */}
      <ClassBox x={10} y={10} name="Lærer" w={90} />
      <ClassBox x={140} y={10} name="Oppgave" w={100} />
      <ClassBox x={280} y={10} name="Spørsmål" w={100} />
      <ClassBox x={420} y={10} name="Svaralternativ" attrs={["riktig: boolsk"]} w={130} />

      {/* Row 2: Eksamen, Student, Besvarelse, Svar */}
      <ClassBox x={10} y={100} name="Eksamen" attrs={["tid: dato", "varighet: heltall"]} w={120} />
      <ClassBox x={180} y={120} name="Student" attrs={["brukernavn", "passord"]} w={110} />
      <ClassBox x={340} y={120} name="Besvarelse" attrs={["karakter"]} w={110} />
      <ClassBox x={480} y={120} name="Svar" attrs={["kryss: boolsk"]} w={110} />

      {/* Lærer → Oppgave */}
      <line x1={100} y1={25} x2={140} y2={25} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={110} y={20} fontSize={9} fill={C.textFill}>*</text>

      {/* Oppgave → Spørsmål */}
      <line x1={240} y1={25} x2={280} y2={25} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={250} y={20} fontSize={9} fill={C.textFill}>*</text>

      {/* Spørsmål → Svaralternativ */}
      <line x1={380} y1={25} x2={420} y2={25} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={395} y={20} fontSize={9} fill={C.textFill}>*</text>

      {/* Lærer → Eksamen */}
      <line x1={55} y1={47} x2={55} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={60} y={70} fontSize={9} fill={C.textFill}>*</text>

      {/* Eksamen → Student (many-to-many via Besvarelse) */}
      <line x1={130} y1={130} x2={180} y2={140} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={150} y={130} fontSize={9} fill={C.textFill}>*</text>

      {/* Student → Besvarelse */}
      <line x1={290} y1={145} x2={340} y2={145} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={310} y={140} fontSize={9} fill={C.textFill}>*</text>

      {/* Besvarelse → Svar */}
      <line x1={450} y1={145} x2={480} y2={145} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={460} y={140} fontSize={9} fill={C.textFill}>*</text>

      {/* Svaralternativ → Svar */}
      <line x1={520} y1={68} x2={535} y2={120} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={540} y={95} fontSize={9} fill={C.textFill}>*</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SEKVENSDIAGRAMMER
   ═══════════════════════════════════════════════ */

function SeqObject({ x, name, maxY }: { x: number; name: string; maxY: number }) {
  return (
    <g>
      <rect x={x - 40} y={5} width={80} height={28} fill={C.seqObjFill} stroke={C.seqObjStroke} strokeWidth={1.5} rx={4} />
      <text x={x} y={24} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.textFill}>{name}</text>
      <line x1={x} y1={33} x2={x} y2={maxY} stroke={C.dashStroke} strokeWidth={1} strokeDasharray="4 3" />
    </g>
  );
}

function SeqActivation({ x, y, h }: { x: number; y: number; h: number }) {
  return <rect x={x - 5} y={y} width={10} height={h} fill={C.seqObjFill} stroke={C.seqObjStroke} strokeWidth={1} rx={2} />;
}

function SeqMessage({
  x1, x2, y,
  label,
  isReturn = false,
}: {
  x1: number; x2: number; y: number;
  label: string;
  isReturn?: boolean;
}) {
  const dir = x2 > x1 ? 1 : -1;
  const headSize = 6;
  return (
    <g>
      <line
        x1={x1 + (dir > 0 ? 5 : -5)} y1={y}
        x2={x2 - dir * 5} y2={y}
        stroke={isReturn ? C.dashStroke : C.arrowFill}
        strokeWidth={isReturn ? 1 : 1.5}
        strokeDasharray={isReturn ? "4 3" : undefined}
      />
      {/* Arrowhead */}
      <polygon
        points={`${x2 - dir * 5},${y} ${x2 - dir * (5 + headSize)},${y - headSize / 2} ${x2 - dir * (5 + headSize)},${y + headSize / 2}`}
        fill={isReturn ? C.dashStroke : C.arrowFill}
      />
      <text
        x={(x1 + x2) / 2}
        y={y - 5}
        textAnchor="middle"
        fontSize={9}
        fill={isReturn ? C.dashStroke : C.textFill}
        fontStyle={isReturn ? "italic" : "normal"}
      >
        {label}
      </text>
    </g>
  );
}

function SeqFragment({
  x, y, w, h,
  label,
  condition,
}: {
  x: number; y: number; w: number; h: number;
  label: string;
  condition: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.fragmentStroke} strokeWidth={1.5} rx={4} />
      <rect x={x} y={y} width={40} height={18} fill={C.fragmentFill} stroke={C.fragmentStroke} strokeWidth={1.5} rx={4} />
      <rect x={x + 0.75} y={y + 12} width={39} height={6} fill={C.fragmentFill} />
      <text x={x + 20} y={y + 13} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.fragmentStroke}>{label}</text>
      <text x={x + 48} y={y + 13} fontSize={8} fill={C.fragmentStroke}>[{condition}]</text>
    </g>
  );
}

export function SequenceMonopol() {
  // Object positions
  const monopolX = 60;
  const spillerX = 175;
  const koppX = 290;
  const brettX = 405;
  const brikkeX = 520;
  const maxY = 340;

  return (
    <svg viewBox="0 0 580 350" className="w-full mx-auto" role="img" aria-label="Sekvensdiagram for Monopol spillTrekk">
      {/* Objects */}
      <SeqObject x={monopolX} name=":Monopol" maxY={maxY} />
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={koppX} name=":Kopp" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={brikkeX} name=":Brikke" maxY={maxY} />

      {/* Activation boxes */}
      <SeqActivation x={monopolX} y={45} h={285} />
      <SeqActivation x={spillerX} y={110} h={200} />

      {/* spill() self-call */}
      <SeqMessage x1={monopolX} x2={monopolX + 30} y={55} label="spill()" />

      {/* loop [20 runder] */}
      <SeqFragment x={30} y={65} w={540} h={265} label="loop" condition="20 runder" />

      {/* loop [for alle spillere] */}
      <SeqFragment x={45} y={90} w={520} h={225} label="loop" condition="for alle spillere" />

      {/* Monopol → Spiller: spillTrekk() */}
      <SeqMessage x1={monopolX} x2={spillerX} y={115} label="spillTrekk()" />

      {/* Spiller → Kopp: trill() */}
      <SeqMessage x1={spillerX} x2={koppX} y={150} label="trill()" />

      {/* Kopp → Spiller: sum = getSum() */}
      <SeqMessage x1={koppX} x2={spillerX} y={175} label="sum = getSum()" isReturn />

      {/* Spiller → Brikke: getRute() */}
      <SeqMessage x1={spillerX} x2={brikkeX} y={210} label="getRute()" />

      {/* Spiller → Brett: flytt(rute, sum) */}
      <SeqMessage x1={spillerX} x2={brettX} y={240} label="nyRute = flytt(rute, sum)" />
      <SeqMessage x1={brettX} x2={spillerX} y={260} label="nyRute" isReturn />

      {/* Spiller → Brikke: setRute(nyRute) */}
      <SeqMessage x1={spillerX} x2={brikkeX} y={290} label="setRute(nyRute)" />
    </svg>
  );
}

export function SequenceStigespill() {
  const stigeX = 60;
  const spillerX = 175;
  const terningX = 290;
  const brettX = 405;
  const brikkeX = 520;
  const maxY = 340;

  return (
    <svg viewBox="0 0 580 350" className="w-full mx-auto" role="img" aria-label="Sekvensdiagram for Stigespill spillTrekk">
      <SeqObject x={stigeX} name=":Stigespill" maxY={maxY} />
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={terningX} name=":Terning" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={brikkeX} name=":Brikke" maxY={maxY} />

      {/* Activation */}
      <SeqActivation x={stigeX} y={45} h={285} />
      <SeqActivation x={spillerX} y={110} h={200} />

      {/* spill() self-call */}
      <SeqMessage x1={stigeX} x2={stigeX + 30} y={55} label="spill()" />

      {/* loop [ingen vinner] */}
      <SeqFragment x={30} y={65} w={540} h={265} label="loop" condition="ingen vinner" />

      {/* loop [for alle spillere] */}
      <SeqFragment x={45} y={90} w={520} h={225} label="loop" condition="for alle spillere" />

      {/* → spillTrekk() */}
      <SeqMessage x1={stigeX} x2={spillerX} y={115} label="spillTrekk()" />

      {/* → trill() */}
      <SeqMessage x1={spillerX} x2={terningX} y={150} label="trill()" />
      <SeqMessage x1={terningX} x2={spillerX} y={170} label="verdi = getVerdi()" isReturn />

      {/* → getPlass() */}
      <SeqMessage x1={spillerX} x2={brikkeX} y={200} label="getPlass()" />

      {/* → finnNyRute() */}
      <SeqMessage x1={spillerX} x2={brettX} y={235} label="nyRute = finnNyRute(rute, verdi)" />
      <SeqMessage x1={brettX} x2={spillerX} y={255} label="nyRute" isReturn />

      {/* → setPlass() */}
      <SeqMessage x1={spillerX} x2={brikkeX} y={285} label="setPlass(nyRute)" />
    </svg>
  );
}

export function SequenceMaxMummelmann() {
  const spillerX = 50;
  const maxX = 160;
  const terningX = 270;
  const brikkeX = 370;
  const brettX = 460;
  const ruteX = 540;
  const maxY = 350;

  return (
    <svg viewBox="0 0 590 360" className="w-full mx-auto" role="img" aria-label="Sekvensdiagram for Max Mümmelmann Spill tur">
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={maxX} name=":MaxMümm." maxY={maxY} />
      <SeqObject x={terningX} name=":Terning" maxY={maxY} />
      <SeqObject x={brikkeX} name=":Brikke" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={ruteX} name=":Rute" maxY={maxY} />

      {/* Activation */}
      <SeqActivation x={maxX} y={50} h={285} />

      {/* Spiller → MaxMümm: trill() */}
      <SeqMessage x1={spillerX} x2={maxX} y={60} label="trill()" />

      {/* MaxMümm → Terning: trill() */}
      <SeqMessage x1={maxX} x2={terningX} y={90} label="trill()" />
      <SeqMessage x1={terningX} x2={maxX} y={110} label="verdi = getVerdi()" isReturn />

      {/* MaxMümm → Brikke: flyttBrikke(verdi) */}
      <SeqMessage x1={maxX} x2={brikkeX} y={145} label="flyttBrikke(verdi)" />

      {/* Brikke → Brett: flytt(verdi) */}
      <SeqMessage x1={brikkeX} x2={brettX} y={175} label="flytt(verdi)" />

      {/* Brett → Rute: visØversteKort() */}
      <SeqMessage x1={brettX} x2={ruteX} y={205} label="kort = visØversteKort()" />

      {/* alt fragment */}
      <SeqFragment x={25} y={230} w={555} h={95} label="alt" condition="mangler familiemedlem" />

      {/* MaxMümm → Brikke: taKort() */}
      <SeqMessage x1={maxX} x2={brikkeX} y={260} label="taKort()" />

      {/* Brikke → Rute: taØversteKort() */}
      <SeqMessage x1={brikkeX} x2={ruteX} y={285} label="taØversteKort()" />
      <SeqMessage x1={ruteX} x2={maxX} y={305} label="kort" isReturn />

      {/* Spiller: leggTilKort */}
      <SeqMessage x1={maxX} x2={spillerX} y={335} label="leggTilKort(kort)" />
    </svg>
  );
}
