"use client";

/* ═══════════════════════════════════════════════
   EKSTRA SVG UML-diagrammer for DAT109 Modellering
   Brukes på case-studier-siden — utfyller UmlDiagrams.tsx
   med nye case-studier (Stigespill utvidet, Bilutleie, Skyjo, GSC)
   og iterasjonsversjoner av Monopol-domenemodellen.
   ═══════════════════════════════════════════════ */

const C = {
  stroke: "currentColor",
  textFill: "currentColor",
  actorStroke: "#3b82f6",
  ucFill: "#eff6ff",
  ucStroke: "#3b82f6",
  systemFill: "#f8fafc",
  systemStroke: "#94a3b8",
  classFill: "#f0fdf4",
  classStroke: "#22c55e",
  classHeader: "#dcfce7",
  abstractFill: "#faf5ff",
  abstractStroke: "#a855f7",
  abstractHeader: "#f3e8ff",
  seqObjFill: "#eff6ff",
  seqObjStroke: "#3b82f6",
  fragmentFill: "#fefce8",
  fragmentStroke: "#eab308",
  arrowFill: "#334155",
  dashStroke: "#94a3b8",
  includeStroke: "#6366f1",
};

/* ── Helpers ── */
function StickFigure({ x, y, label, color = C.actorStroke }: { x: number; y: number; label: string; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y - 20} r={8} fill="none" stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={y - 12} x2={x} y2={y + 8} stroke={color} strokeWidth={1.5} />
      <line x1={x - 12} y1={y - 4} x2={x + 12} y2={y - 4} stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={y + 8} x2={x - 10} y2={y + 22} stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={y + 8} x2={x + 10} y2={y + 22} stroke={color} strokeWidth={1.5} />
      <text x={x} y={y + 38} textAnchor="middle" fontSize={11} fill={color} fontWeight={600}>{label}</text>
    </g>
  );
}

function UseCase({ cx, cy, label, w = 120 }: { cx: number; cy: number; label: string; w?: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={20} fill={C.ucFill} stroke={C.ucStroke} strokeWidth={1.5} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill={C.textFill} fontWeight={500}>{label}</text>
    </g>
  );
}

function ClassBox({
  x, y, name, attrs = [], w = 120, isAbstract = false,
}: {
  x: number; y: number; name: string; attrs?: string[]; w?: number; isAbstract?: boolean;
}) {
  const headerH = 22;
  const lineH = 14;
  const attrH = attrs.length * lineH + (attrs.length > 0 ? 6 : 4);
  const totalH = headerH + attrH;
  const fill = isAbstract ? C.abstractFill : C.classFill;
  const stroke = isAbstract ? C.abstractStroke : C.classStroke;
  const headerFill = isAbstract ? C.abstractHeader : C.classHeader;

  return (
    <g>
      <rect x={x} y={y} width={w} height={totalH} fill={fill} stroke={stroke} strokeWidth={1.5} rx={3} />
      <rect x={x} y={y} width={w} height={headerH} fill={headerFill} stroke={stroke} strokeWidth={1.5} rx={3} />
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
      {attrs.map((attr, i) => (
        <text key={i} x={x + 6} y={y + headerH + 14 + i * lineH} fontSize={10} fill={C.textFill}>{attr}</text>
      ))}
    </g>
  );
}

function SeqObject({ x, name, maxY }: { x: number; name: string; maxY: number }) {
  return (
    <g>
      <rect x={x - 45} y={5} width={90} height={28} fill={C.seqObjFill} stroke={C.seqObjStroke} strokeWidth={1.5} rx={4} />
      <text x={x} y={24} textAnchor="middle" fontSize={10} fontWeight={600} fill={C.textFill}>{name}</text>
      <line x1={x} y1={33} x2={x} y2={maxY} stroke={C.dashStroke} strokeWidth={1} strokeDasharray="4 3" />
    </g>
  );
}

function SeqActivation({ x, y, h }: { x: number; y: number; h: number }) {
  return <rect x={x - 5} y={y} width={10} height={h} fill={C.seqObjFill} stroke={C.seqObjStroke} strokeWidth={1} rx={2} />;
}

function SeqMessage({
  x1, x2, y, label, isReturn = false,
}: {
  x1: number; x2: number; y: number; label: string; isReturn?: boolean;
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
  x, y, w, h, label, condition,
}: {
  x: number; y: number; w: number; h: number; label: string; condition: string;
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

/* ═══════════════════════════════════════════════
   MONOPOL — ITERASJONSVERSJONER (F03–F06)
   ═══════════════════════════════════════════════ */

/** Iterasjon 1: Helt enkelt — kun Monopol, Brett, Spiller, Kopp, Terning, Brikke, Rute */
export function DomainMonopolIter1() {
  return (
    <svg viewBox="0 0 620 240" className="w-full mx-auto" role="img" aria-label="Monopol iter 1">
      <ClassBox x={250} y={5} name="Monopol" attrs={["rundeNr"]} w={110} />
      <ClassBox x={50} y={90} name="Brett" w={90} />
      <ClassBox x={250} y={90} name="Spiller" attrs={["navn"]} w={110} />
      <ClassBox x={450} y={90} name="Kopp" w={80} />
      <ClassBox x={520} y={170} name="Terning" attrs={["verdi"]} w={80} />
      <ClassBox x={400} y={180} name="Brikke" w={80} />
      <ClassBox x={50} y={180} name="Rute" attrs={["navn"]} w={90} />

      {/* Monopol → Brett */}
      <line x1={260} y1={30} x2={140} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={170} y={55} fontSize={9}>1</text>
      <text x={140} y={86} fontSize={9}>1</text>

      {/* Monopol → Spiller */}
      <line x1={305} y1={42} x2={305} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={310} y={60} fontSize={9}>1</text>
      <text x={310} y={88} fontSize={9}>2..8</text>

      {/* Monopol → Kopp */}
      <line x1={355} y1={28} x2={450} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={395} y={50} fontSize={9}>1</text>
      <text x={445} y={86} fontSize={9}>1</text>

      {/* Brett → Rute */}
      <line x1={95} y1={120} x2={95} y2={180} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={100} y={150} fontSize={9}>1</text>
      <text x={100} y={175} fontSize={9}>40</text>

      {/* Kopp → Terning */}
      <line x1={500} y1={130} x2={555} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={510} y={148} fontSize={9}>1</text>
      <text x={550} y={168} fontSize={9}>2</text>

      {/* Spiller → Brikke */}
      <line x1={360} y1={130} x2={400} y2={195} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={385} y={155} fontSize={9}>1</text>
      <text x={395} y={195} fontSize={9}>1</text>

      {/* Brikke → Rute (er på) */}
      <line x1={400} y1={210} x2={140} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={260} y={205} fontSize={9} textAnchor="middle">er på</text>
      <text x={150} y={205} fontSize={9}>1</text>
      <text x={395} y={205} fontSize={9}>1</text>
    </svg>
  );
}

/** Iterasjon 2: Penger introdusert — Rute blir abstrakt + spesialiseringer */
export function DomainMonopolIter2() {
  return (
    <svg viewBox="0 0 660 350" className="w-full mx-auto" role="img" aria-label="Monopol iter 2">
      <ClassBox x={270} y={5} name="Monopol" attrs={["rundeNr"]} w={110} />
      <ClassBox x={60} y={90} name="Brett" w={90} />
      <ClassBox x={270} y={90} name="Spiller" attrs={["navn", "penger"]} w={110} />
      <ClassBox x={460} y={90} name="Kopp" w={80} />
      <ClassBox x={530} y={170} name="Terning" attrs={["verdi"]} w={80} />
      <ClassBox x={410} y={180} name="Brikke" w={80} />
      <ClassBox x={60} y={180} name="Rute" attrs={["navn"]} w={90} isAbstract />

      <ClassBox x={0} y={290} name="StartRute" w={90} />
      <ClassBox x={100} y={290} name="VanligRute" w={100} />
      <ClassBox x={210} y={290} name="InntektsskattRute" w={130} />
      <ClassBox x={350} y={290} name="FengselRute" w={100} />

      <line x1={280} y1={30} x2={150} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={185} y={55} fontSize={9}>1</text>
      <text x={150} y={86} fontSize={9}>1</text>

      <line x1={325} y1={42} x2={325} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={330} y={60} fontSize={9}>1</text>
      <text x={330} y={88} fontSize={9}>2..8</text>

      <line x1={375} y1={28} x2={460} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={410} y={50} fontSize={9}>1</text>
      <text x={455} y={86} fontSize={9}>1</text>

      <line x1={105} y1={120} x2={105} y2={180} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={110} y={150} fontSize={9}>1</text>
      <text x={110} y={175} fontSize={9}>40</text>

      <line x1={510} y1={130} x2={565} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={520} y={148} fontSize={9}>1</text>
      <text x={560} y={168} fontSize={9}>2</text>

      <line x1={380} y1={130} x2={420} y2={195} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={400} y={155} fontSize={9}>1</text>

      <line x1={410} y1={210} x2={150} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={280} y={205} fontSize={9} textAnchor="middle">er på</text>

      {/* Inheritance Rute → spesialiseringer */}
      <line x1={105} y1={230} x2={105} y2={260} stroke={C.abstractStroke} strokeWidth={1.5} />
      <polygon points="105,230 99,242 111,242" fill="none" stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={45} y1={260} x2={400} y2={260} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={45} y1={260} x2={45} y2={290} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={150} y1={260} x2={150} y2={290} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={275} y1={260} x2={275} y2={290} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={400} y1={260} x2={400} y2={290} stroke={C.abstractStroke} strokeWidth={1.5} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   STIGESPILL — utvidet (F08 / Øvelse 1)
   ═══════════════════════════════════════════════ */

/** Iterasjon 1: Uten slanger og stiger */
export function DomainStigespillIter1() {
  return (
    <svg viewBox="0 0 580 220" className="w-full mx-auto" role="img" aria-label="Stigespill iter 1">
      <ClassBox x={230} y={5} name="Stigespill" attrs={["rundeNr"]} w={120} />
      <ClassBox x={40} y={90} name="Brett" w={90} />
      <ClassBox x={250} y={90} name="Spiller" attrs={["navn"]} w={100} />
      <ClassBox x={420} y={90} name="Terning" attrs={["verdi"]} w={90} />
      <ClassBox x={40} y={170} name="Rute" attrs={["nr"]} w={90} />
      <ClassBox x={400} y={170} name="Brikke" w={90} />

      <line x1={240} y1={28} x2={130} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={170} y={55} fontSize={9}>1</text>
      <text x={130} y={86} fontSize={9}>1</text>

      <line x1={295} y1={42} x2={295} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={300} y={60} fontSize={9}>1</text>
      <text x={300} y={88} fontSize={9}>2..4</text>

      <line x1={345} y1={28} x2={420} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={385} y={50} fontSize={9}>1</text>
      <text x={415} y={86} fontSize={9}>1</text>

      <line x1={85} y1={120} x2={85} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={90} y={145} fontSize={9}>1</text>
      <text x={90} y={167} fontSize={9}>100</text>

      <line x1={300} y1={120} x2={425} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={355} y={150} fontSize={9}>1</text>
      <text x={420} y={167} fontSize={9}>1</text>

      <line x1={400} y1={195} x2={130} y2={195} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={260} y={190} fontSize={9} textAnchor="middle">står på</text>
      <text x={140} y={190} fontSize={9}>1</text>
      <text x={395} y={190} fontSize={9}>1</text>
    </svg>
  );
}

/** Iterasjon 2: med slanger og stiger som EGNE klasser */
export function DomainStigespillIter2() {
  return (
    <svg viewBox="0 0 620 320" className="w-full mx-auto" role="img" aria-label="Stigespill iter 2">
      <ClassBox x={250} y={5} name="Stigespill" attrs={["rundeNr"]} w={120} />
      <ClassBox x={50} y={90} name="Brett" w={90} />
      <ClassBox x={270} y={90} name="Spiller" attrs={["navn"]} w={100} />
      <ClassBox x={440} y={90} name="Terning" attrs={["verdi"]} w={90} />
      <ClassBox x={50} y={170} name="Rute" attrs={["nr"]} w={90} />
      <ClassBox x={420} y={170} name="Brikke" w={90} />
      <ClassBox x={210} y={250} name="Stige" attrs={["fraNr", "tilNr"]} w={120} />
      <ClassBox x={360} y={250} name="Slange" attrs={["fraNr", "tilNr"]} w={120} />

      <line x1={260} y1={28} x2={140} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={170} y={58} fontSize={9}>1</text>
      <text x={140} y={86} fontSize={9}>1</text>

      <line x1={315} y1={42} x2={315} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={320} y={62} fontSize={9}>1</text>
      <text x={320} y={88} fontSize={9}>2..4</text>

      <line x1={365} y1={28} x2={440} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={395} y={50} fontSize={9}>1</text>
      <text x={435} y={86} fontSize={9}>1</text>

      <line x1={95} y1={120} x2={95} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={100} y={145} fontSize={9}>1</text>
      <text x={100} y={167} fontSize={9}>100</text>

      <line x1={320} y1={120} x2={445} y2={170} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={345} y={140} fontSize={9}>1</text>
      <text x={440} y={167} fontSize={9}>1</text>

      <line x1={420} y1={195} x2={140} y2={195} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={280} y={190} fontSize={9} textAnchor="middle">står på</text>
      <text x={150} y={190} fontSize={9}>1</text>
      <text x={415} y={190} fontSize={9}>1</text>

      {/* Brett → Stige */}
      <line x1={140} y1={130} x2={250} y2={250} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={170} y={185} fontSize={9}>1</text>
      <text x={245} y={245} fontSize={9}>0..*</text>

      {/* Brett → Slange */}
      <line x1={140} y1={140} x2={400} y2={250} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={170} y={205} fontSize={9}>1</text>
      <text x={395} y={245} fontSize={9}>0..*</text>
    </svg>
  );
}

export function UseCaseStigespillIter2() {
  return (
    <svg viewBox="0 0 460 200" className="w-full max-w-md mx-auto" role="img" aria-label="Stigespill use case iter 2">
      <rect x={140} y={10} width={300} height={180} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={290} y={32} textAnchor="middle" fontSize={13} fontWeight={700}>Stigespill</text>

      <StickFigure x={60} y={70} label="Spiller" />
      <StickFigure x={60} y={160} label="Admin" />

      <UseCase cx={290} cy={70} label="Spill stigespill" w={140} />
      <UseCase cx={290} cy={150} label="Init spill" w={120} />

      <line x1={85} y1={70} x2={220} y2={70} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={155} x2={230} y2={150} stroke={C.actorStroke} strokeWidth={1.5} />

      {/* Include */}
      <line x1={290} y1={90} x2={290} y2={130} stroke={C.includeStroke} strokeWidth={1.5} strokeDasharray="6 3" />
      <polygon points="290,130 285,122 295,122" fill={C.includeStroke} />
      <text x={325} y={115} fontSize={9} fill={C.includeStroke} fontStyle="italic" fontWeight={600}>{"<<include>>"}</text>
    </svg>
  );
}

/** Sekvensdiagram — iterasjon 3 med sekserregler */
export function SequenceStigespillSeksere() {
  const stigeX = 60;
  const spillerX = 175;
  const terningX = 290;
  const brettX = 405;
  const brikkeX = 520;
  const maxY = 460;

  return (
    <svg viewBox="0 0 590 470" className="w-full mx-auto" role="img" aria-label="Stigespill med sekserregler">
      <SeqObject x={stigeX} name=":Stigespill" maxY={maxY} />
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={terningX} name=":Terning" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={brikkeX} name=":Brikke" maxY={maxY} />

      <SeqActivation x={stigeX} y={45} h={400} />
      <SeqActivation x={spillerX} y={110} h={320} />

      <SeqMessage x1={stigeX} x2={stigeX + 30} y={55} label="spill()" />

      <SeqFragment x={30} y={65} w={540} h={385} label="loop" condition="ingen vinner" />
      <SeqFragment x={45} y={90} w={520} h={345} label="loop" condition="for alle spillere" />

      <SeqMessage x1={stigeX} x2={spillerX} y={115} label="spillTrekk()" />

      {/* Loop for sekserregler — gjenta så lenge verdi=6 */}
      <SeqFragment x={130} y={135} w={420} h={260} label="loop" condition="trill==6 && < 3 ggr" />

      <SeqMessage x1={spillerX} x2={terningX} y={170} label="trill()" />
      <SeqMessage x1={terningX} x2={spillerX} y={190} label="verdi" isReturn />

      <SeqMessage x1={spillerX} x2={brettX} y={225} label="nyRute = finnNyRute(rute, verdi)" />
      <SeqMessage x1={brettX} x2={spillerX} y={245} label="nyRute" isReturn />

      <SeqMessage x1={spillerX} x2={brikkeX} y={275} label="setRute(nyRute)" />

      <SeqFragment x={150} y={300} w={400} h={85} label="alt" condition="rute.harSlange / harStige" />
      <SeqMessage x1={spillerX} x2={brettX} y={335} label="rute = følg(rute)" />
      <SeqMessage x1={spillerX} x2={brikkeX} y={365} label="setRute(rute)" />

      {/* alt for tre 6'ere */}
      <SeqFragment x={150} y={400} w={400} h={45} label="alt" condition="3 * 6 på rad" />
      <SeqMessage x1={spillerX} x2={brikkeX} y={430} label="setRute(rute1)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   BILUTLEIE (Øvelse 2 — forretningssystem)
   ═══════════════════════════════════════════════ */

export function UseCaseBilutleie() {
  return (
    <svg viewBox="0 0 540 380" className="w-full max-w-lg mx-auto" role="img" aria-label="Bilutleie use case">
      <rect x={150} y={10} width={350} height={360} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={325} y={32} textAnchor="middle" fontSize={13} fontWeight={700}>Bilutleiesystem</text>

      <StickFigure x={60} y={80} label="Kunde" />
      <StickFigure x={60} y={200} label="Utleier" />
      <StickFigure x={60} y={330} label="Admin" />

      <UseCase cx={325} cy={70} label="Reserver bil" w={140} />
      <UseCase cx={325} cy={120} label="Hent bil" w={120} />
      <UseCase cx={325} cy={170} label="Lever tilbake bil" w={150} />
      <UseCase cx={325} cy={220} label="Beregn pris" w={130} />
      <UseCase cx={325} cy={275} label="Definer bil" w={130} />
      <UseCase cx={325} cy={325} label="Definer kontor" w={140} />

      {/* Kunde-koblinger */}
      <line x1={85} y1={75} x2={257} y2={70} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={80} x2={266} y2={120} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={85} x2={252} y2={170} stroke={C.actorStroke} strokeWidth={1.5} />
      {/* Utleier-koblinger */}
      <line x1={85} y1={195} x2={263} y2={120} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={205} x2={252} y2={170} stroke={C.actorStroke} strokeWidth={1.5} />
      {/* Admin-koblinger */}
      <line x1={85} y1={325} x2={262} y2={275} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={328} x2={257} y2={325} stroke={C.actorStroke} strokeWidth={1.5} />

      {/* include: Lever tilbake → Beregn pris */}
      <line x1={325} y1={188} x2={325} y2={200} stroke={C.includeStroke} strokeWidth={1.5} strokeDasharray="6 3" />
      <polygon points="325,200 320,192 330,192" fill={C.includeStroke} />
      <text x={365} y={196} fontSize={9} fill={C.includeStroke} fontStyle="italic" fontWeight={600}>{"<<include>>"}</text>
    </svg>
  );
}

export function DomainBilutleie() {
  return (
    <svg viewBox="0 0 720 360" className="w-full mx-auto" role="img" aria-label="Bilutleie domene">
      <ClassBox x={290} y={5} name="Bilutleieselskap" attrs={["navn"]} w={140} />

      <ClassBox x={50} y={90} name="Utleiekontor" attrs={["adresse", "telefon"]} w={130} />
      <ClassBox x={290} y={90} name="Bil" attrs={["regnr", "type", "dagspris"]} w={130} />
      <ClassBox x={530} y={90} name="Kunde" attrs={["navn", "fNr", "epost"]} w={140} />

      <ClassBox x={50} y={210} name="Reservasjon" attrs={["fraDato", "tilDato", "status"]} w={150} />
      <ClassBox x={250} y={210} name="Utleie" attrs={["henteDato", "leveringsDato", "totalpris"]} w={170} />
      <ClassBox x={460} y={210} name="Adresse" attrs={["gate", "postnr", "by"]} w={130} />
      <ClassBox x={620} y={210} name="Kredittkort" attrs={["nummer", "utløp"]} w={90} />

      {/* Bilutleieselskap → Utleiekontor */}
      <line x1={300} y1={40} x2={120} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={200} y={60} fontSize={9}>1</text>
      <text x={120} y={86} fontSize={9}>1..*</text>

      {/* Utleiekontor → Bil */}
      <line x1={180} y1={120} x2={290} y2={120} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={190} y={115} fontSize={9}>1</text>
      <text x={280} y={115} fontSize={9}>0..*</text>

      {/* Bilutleieselskap → Kunde */}
      <line x1={425} y1={40} x2={600} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={500} y={60} fontSize={9}>1</text>
      <text x={595} y={86} fontSize={9}>0..*</text>

      {/* Kunde → Reservasjon */}
      <line x1={600} y1={130} x2={130} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={400} y={170} fontSize={9} textAnchor="middle">bestiller</text>
      <text x={595} y={140} fontSize={9}>1</text>
      <text x={140} y={206} fontSize={9}>0..*</text>

      {/* Reservasjon → Bil */}
      <line x1={150} y1={240} x2={300} y2={140} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={210} y={195} fontSize={9}>0..*</text>
      <text x={295} y={140} fontSize={9}>1</text>

      {/* Reservasjon → Utleie (1:0..1) */}
      <line x1={200} y1={245} x2={250} y2={245} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={205} y={240} fontSize={9}>1</text>
      <text x={245} y={240} fontSize={9}>0..1</text>

      {/* Utleie → Bil */}
      <line x1={335} y1={210} x2={355} y2={140} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={340} y={175} fontSize={9}>0..*</text>
      <text x={355} y={140} fontSize={9}>1</text>

      {/* Kunde → Adresse */}
      <line x1={600} y1={150} x2={520} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={595} y={165} fontSize={9}>1</text>
      <text x={525} y={206} fontSize={9}>1</text>

      {/* Kunde → Kredittkort */}
      <line x1={665} y1={150} x2={665} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={670} y={170} fontSize={9}>1</text>
      <text x={670} y={206} fontSize={9}>1..*</text>

      {/* Utleiekontor → Adresse */}
      <line x1={120} y1={140} x2={490} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={300} y={175} fontSize={9}>1</text>
      <text x={485} y={206} fontSize={9}>1</text>
    </svg>
  );
}

export function SequenceBilutleie() {
  const kundeX = 50;
  const sysX = 160;
  const kontorX = 280;
  const bilX = 400;
  const resX = 530;
  const maxY = 320;

  return (
    <svg viewBox="0 0 600 330" className="w-full mx-auto" role="img" aria-label="Bilutleie sekvens reserver bil">
      <SeqObject x={kundeX} name=":Kunde" maxY={maxY} />
      <SeqObject x={sysX} name=":Selskap" maxY={maxY} />
      <SeqObject x={kontorX} name=":Kontor" maxY={maxY} />
      <SeqObject x={bilX} name=":Bil" maxY={maxY} />
      <SeqObject x={resX} name=":Reservasjon" maxY={maxY} />

      <SeqActivation x={sysX} y={50} h={250} />

      <SeqMessage x1={kundeX} x2={sysX} y={60} label="reserver(fra, til, type)" />

      <SeqMessage x1={sysX} x2={kontorX} y={95} label="ledigeBiler = finnLedige(fra, til, type)" />
      <SeqMessage x1={kontorX} x2={sysX} y={115} label="biler" isReturn />

      <SeqFragment x={20} y={140} w={555} h={150} label="alt" condition="ledig finnes" />

      <SeqMessage x1={sysX} x2={bilX} y={175} label="merkSomReservert(fra, til)" />
      <SeqMessage x1={sysX} x2={resX} y={210} label="«create» nyReservasjon(kunde, bil, fra, til)" />
      <SeqMessage x1={resX} x2={sysX} y={230} label="reservasjon" isReturn />
      <SeqMessage x1={sysX} x2={kundeX} y={265} label="bekreftelse" isReturn />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SKYJO (V2024)
   ═══════════════════════════════════════════════ */

export function UseCaseSkyjo() {
  return (
    <svg viewBox="0 0 460 240" className="w-full max-w-md mx-auto" role="img" aria-label="Skyjo use case">
      <rect x={140} y={10} width={300} height={220} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={290} y={32} textAnchor="middle" fontSize={13} fontWeight={700}>Skyjo</text>

      <StickFigure x={60} y={120} label="Spiller" />

      <UseCase cx={290} cy={70} label="Start spill" />
      <UseCase cx={290} cy={140} label="Spill tur" />
      <UseCase cx={290} cy={210} label="Avslutt omgang" w={140} />

      <line x1={85} y1={115} x2={235} y2={70} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={120} x2={235} y2={140} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={125} x2={225} y2={210} stroke={C.actorStroke} strokeWidth={1.5} />
    </svg>
  );
}

export function DomainSkyjo() {
  return (
    <svg viewBox="0 0 720 320" className="w-full mx-auto" role="img" aria-label="Skyjo domene">
      <ClassBox x={290} y={5} name="Skyjo" attrs={["antallOmganger"]} w={140} />

      <ClassBox x={50} y={100} name="Spiller" attrs={["navn", "totalPoeng"]} w={130} />
      <ClassBox x={250} y={100} name="Omgang" attrs={["nr"]} w={100} />
      <ClassBox x={400} y={100} name="Kortstokk" w={110} />
      <ClassBox x={550} y={100} name="Kastehaug" w={110} />

      <ClassBox x={20} y={210} name="Spillebrett" attrs={["3x4 rutenett"]} w={150} />
      <ClassBox x={200} y={210} name="Poengblokk" w={120} />
      <ClassBox x={350} y={210} name="Kort" attrs={["verdi: -2..12", "synlig: bool"]} w={140} />

      {/* Skyjo → Spiller */}
      <line x1={300} y1={40} x2={130} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={200} y={65} fontSize={9}>1</text>
      <text x={140} y={96} fontSize={9}>2..8</text>

      {/* Skyjo → Omgang */}
      <line x1={325} y1={50} x2={310} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={320} y={75} fontSize={9}>1</text>
      <text x={310} y={96} fontSize={9}>1..*</text>

      {/* Skyjo → Kortstokk */}
      <line x1={400} y1={40} x2={450} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={405} y={65} fontSize={9}>1</text>
      <text x={445} y={96} fontSize={9}>1</text>

      {/* Skyjo → Kastehaug */}
      <line x1={425} y1={40} x2={600} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={500} y={65} fontSize={9}>1</text>
      <text x={595} y={96} fontSize={9}>1</text>

      {/* Spiller → Spillebrett */}
      <line x1={90} y1={140} x2={90} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={95} y={170} fontSize={9}>1</text>
      <text x={95} y={206} fontSize={9}>1</text>

      {/* Spiller → Poengblokk */}
      <line x1={140} y1={140} x2={240} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={145} y={170} fontSize={9}>1</text>
      <text x={235} y={206} fontSize={9}>1</text>

      {/* Spillebrett → Kort */}
      <line x1={170} y1={240} x2={350} y2={240} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={180} y={235} fontSize={9}>1</text>
      <text x={340} y={235} fontSize={9}>12</text>

      {/* Kortstokk → Kort */}
      <line x1={450} y1={140} x2={420} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={445} y={175} fontSize={9}>1</text>
      <text x={415} y={206} fontSize={9}>0..*</text>

      {/* Kastehaug → Kort */}
      <line x1={600} y1={140} x2={470} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={595} y={170} fontSize={9}>1</text>
      <text x={465} y={206} fontSize={9}>0..*</text>
    </svg>
  );
}

export function SequenceSkyjo() {
  const spillerX = 50;
  const sysX = 160;
  const kastehaugX = 280;
  const bunkeX = 390;
  const brettX = 510;
  const maxY = 360;

  return (
    <svg viewBox="0 0 580 370" className="w-full mx-auto" role="img" aria-label="Skyjo sekvens spill tur">
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={sysX} name=":Skyjo" maxY={maxY} />
      <SeqObject x={kastehaugX} name=":Kastehaug" maxY={maxY} />
      <SeqObject x={bunkeX} name=":Kortstokk" maxY={maxY} />
      <SeqObject x={brettX} name=":Spillebrett" maxY={maxY} />

      <SeqActivation x={sysX} y={50} h={290} />

      <SeqMessage x1={spillerX} x2={sysX} y={60} label="spillTur(valg)" />

      <SeqFragment x={20} y={80} w={540} h={170} label="alt" condition="valg = kastehaug | bunke" />

      <SeqMessage x1={sysX} x2={kastehaugX} y={115} label="kort = ta()" />
      <SeqMessage x1={sysX} x2={brettX} y={150} label="gammelt = bytt(pos, kort)" />
      <SeqMessage x1={sysX} x2={kastehaugX} y={180} label="legg(gammelt)" />

      <SeqFragment x={140} y={210} w={420} h={35} label="opt" condition="behold/forkast" />
      <SeqMessage x1={sysX} x2={bunkeX} y={235} label="kort = trekk()" />

      <SeqMessage x1={sysX} x2={brettX} y={270} label="snuKort(pos)" />
      <SeqMessage x1={sysX} x2={brettX} y={300} label="ferdig = alleÅpne()" />
      <SeqMessage x1={brettX} x2={sysX} y={325} label="ferdig" isReturn />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   GANZ SCHÖN CLEVER (Kont 2023)
   ═══════════════════════════════════════════════ */

export function UseCaseGanzSchonClever() {
  return (
    <svg viewBox="0 0 480 220" className="w-full max-w-md mx-auto" role="img" aria-label="Ganz Schön Clever use case">
      <rect x={140} y={10} width={320} height={200} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={300} y={32} textAnchor="middle" fontSize={13} fontWeight={700}>Ganz Schön Clever</text>

      <StickFigure x={60} y={110} label="Spiller" />

      <UseCase cx={300} cy={70} label="Start spill" />
      <UseCase cx={300} cy={130} label="Spill tur" />
      <UseCase cx={300} cy={190} label="Bruk ekstra" />

      <line x1={85} y1={105} x2={245} y2={70} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={110} x2={245} y2={130} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={115} x2={245} y2={190} stroke={C.actorStroke} strokeWidth={1.5} />
    </svg>
  );
}

export function DomainGanzSchonClever() {
  return (
    <svg viewBox="0 0 740 360" className="w-full mx-auto" role="img" aria-label="Ganz Schön Clever domene">
      <ClassBox x={310} y={5} name="GSCSpill" attrs={["maksRunder"]} w={130} />

      <ClassBox x={50} y={100} name="Spiller" attrs={["navn", "regnbuestjerner"]} w={150} />
      <ClassBox x={260} y={100} name="Runde" attrs={["nr"]} w={110} />
      <ClassBox x={420} y={100} name="Terning" attrs={["farge", "symbol", "verdi"]} w={150} />
      <ClassBox x={600} y={100} name="JokerSide" w={110} />

      <ClassBox x={50} y={220} name="Spillebrett" w={120} />
      <ClassBox x={200} y={220} name="Område" attrs={["farge"]} w={120} isAbstract />
      <ClassBox x={400} y={220} name="Rute" attrs={["symbol", "avkrysset: bool"]} w={170} />
      <ClassBox x={600} y={220} name="EkstraEffekt" attrs={["type"]} w={120} />

      {/* Spesialiseringer av Område */}
      <ClassBox x={120} y={310} name="GulOmrde" w={80} />
      <ClassBox x={205} y={310} name="RødOmrde" w={80} />
      <ClassBox x={290} y={310} name="GrønnOmrde" w={90} />
      <ClassBox x={385} y={310} name="BlåOmrde" w={80} />

      {/* GSCSpill → Spiller */}
      <line x1={320} y1={40} x2={130} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={200} y={60} fontSize={9}>1</text>
      <text x={140} y={96} fontSize={9}>2..4</text>

      {/* GSCSpill → Runde */}
      <line x1={355} y1={50} x2={315} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={350} y={70} fontSize={9}>1</text>
      <text x={295} y={96} fontSize={9}>1..*</text>

      {/* GSCSpill → Terning */}
      <line x1={400} y1={40} x2={490} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={405} y={65} fontSize={9}>1</text>
      <text x={485} y={96} fontSize={9}>5</text>

      {/* Terning → JokerSide */}
      <line x1={570} y1={120} x2={600} y2={120} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={575} y={115} fontSize={9}>1</text>
      <text x={595} y={115} fontSize={9}>1</text>

      {/* Spiller → Spillebrett */}
      <line x1={120} y1={140} x2={120} y2={220} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={125} y={180} fontSize={9}>1</text>
      <text x={125} y={216} fontSize={9}>1</text>

      {/* Spillebrett → Område */}
      <line x1={170} y1={240} x2={200} y2={240} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={172} y={235} fontSize={9}>1</text>
      <text x={195} y={235} fontSize={9}>4</text>

      {/* Område → Rute */}
      <line x1={320} y1={240} x2={400} y2={240} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={322} y={235} fontSize={9}>1</text>
      <text x={395} y={235} fontSize={9}>0..*</text>

      {/* Rute → EkstraEffekt */}
      <line x1={570} y1={240} x2={600} y2={240} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={572} y={235} fontSize={9}>1</text>
      <text x={595} y={235} fontSize={9}>0..1</text>

      {/* Område → spesialiseringer */}
      <line x1={260} y1={265} x2={260} y2={290} stroke={C.abstractStroke} strokeWidth={1.5} />
      <polygon points="260,265 254,277 266,277" fill="none" stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={160} y1={290} x2={425} y2={290} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={160} y1={290} x2={160} y2={310} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={245} y1={290} x2={245} y2={310} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={335} y1={290} x2={335} y2={310} stroke={C.abstractStroke} strokeWidth={1.5} />
      <line x1={425} y1={290} x2={425} y2={310} stroke={C.abstractStroke} strokeWidth={1.5} />
    </svg>
  );
}

export function SequenceGanzSchonClever() {
  const spillerX = 50;
  const spillX = 160;
  const koppX = 270;
  const brettX = 380;
  const omrX = 490;
  const ruteX = 580;
  const maxY = 320;

  return (
    <svg viewBox="0 0 640 330" className="w-full mx-auto" role="img" aria-label="Ganz Schön Clever sekvens">
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={spillX} name=":Spill" maxY={maxY} />
      <SeqObject x={koppX} name=":Terninger" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={omrX} name=":Område" maxY={maxY} />
      <SeqObject x={ruteX} name=":Rute" maxY={maxY} />

      <SeqActivation x={spillX} y={50} h={250} />

      <SeqMessage x1={spillerX} x2={spillX} y={60} label="trillAlle()" />
      <SeqMessage x1={spillX} x2={koppX} y={90} label="trill()" />
      <SeqMessage x1={koppX} x2={spillX} y={110} label="terninger" isReturn />

      <SeqMessage x1={spillerX} x2={spillX} y={140} label="velg(terning)" />

      <SeqFragment x={130} y={160} w={490} h={120} label="alt" condition="enkel | farge | joker" />

      <SeqMessage x1={spillX} x2={brettX} y={195} label="kryss(farge, symbol)" />
      <SeqMessage x1={brettX} x2={omrX} y={220} label="finnRute(symbol)" />
      <SeqMessage x1={omrX} x2={ruteX} y={245} label="kryssAv()" />
      <SeqMessage x1={ruteX} x2={spillX} y={270} label="effekt?" isReturn />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   MONOPOL — sekvensdiagrammer for iterasjon 2 og 3
   ═══════════════════════════════════════════════ */

/** Iterasjon 2: penger og polymorfi via landetPa() */
export function SequenceMonopolIter2() {
  const monopolX = 60;
  const spillerX = 175;
  const koppX = 290;
  const brettX = 405;
  const ruteX = 520;
  const maxY = 380;

  return (
    <svg viewBox="0 0 580 390" className="w-full mx-auto" role="img" aria-label="Sekvensdiagram for Monopol iterasjon 2 — landetPa polymorfi">
      <SeqObject x={monopolX} name=":Monopol" maxY={maxY} />
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={koppX} name=":Kopp" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={ruteX} name=":Rute" maxY={maxY} />

      <SeqActivation x={monopolX} y={45} h={325} />
      <SeqActivation x={spillerX} y={110} h={245} />

      <SeqMessage x1={monopolX} x2={monopolX + 30} y={55} label="spill()" />

      <SeqFragment x={30} y={65} w={540} h={305} label="loop" condition="20 runder × alle spillere" />

      <SeqMessage x1={monopolX} x2={spillerX} y={115} label="spillTrekk()" />

      <SeqMessage x1={spillerX} x2={koppX} y={150} label="trill()" />
      <SeqMessage x1={koppX} x2={spillerX} y={170} label="sum" isReturn />

      <SeqMessage x1={spillerX} x2={brettX} y={205} label="nyRute = flytt(rute, sum)" />
      <SeqMessage x1={brettX} x2={spillerX} y={225} label="nyRute" isReturn />

      {/* Polymorfi: Spiller kaller landetPa(spiller) på rute (uansett type) */}
      <SeqFragment x={150} y={250} w={400} h={110} label="polymorf" condition="rute = StartRute|Vanlig|Skatt|Fengsel" />
      <SeqMessage x1={spillerX} x2={ruteX} y={285} label="landetPa(this)" />
      <SeqMessage x1={ruteX} x2={spillerX} y={315} label="leggTilPenger / trekkFra / flytt" isReturn />
      <SeqMessage x1={spillerX} x2={spillerX + 30} y={345} label="oppdaterPenger()" />
    </svg>
  );
}

/** Iterasjon 3: kjøp og eie av eiendom */
export function SequenceMonopolIter3() {
  const monopolX = 50;
  const spillerX = 170;
  const koppX = 285;
  const brettX = 395;
  const skjoteX = 520;
  const maxY = 410;

  return (
    <svg viewBox="0 0 600 420" className="w-full mx-auto" role="img" aria-label="Sekvensdiagram for Monopol iterasjon 3 — kjøp av eiendom">
      <SeqObject x={monopolX} name=":Monopol" maxY={maxY} />
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={koppX} name=":Kopp" maxY={maxY} />
      <SeqObject x={brettX} name=":Brett" maxY={maxY} />
      <SeqObject x={skjoteX} name=":SkjøteRute" maxY={maxY} />

      <SeqActivation x={monopolX} y={45} h={355} />
      <SeqActivation x={spillerX} y={110} h={285} />

      <SeqMessage x1={monopolX} x2={monopolX + 30} y={55} label="spill()" />

      <SeqFragment x={20} y={65} w={560} h={335} label="loop" condition="til vinner" />

      <SeqMessage x1={monopolX} x2={spillerX} y={115} label="spillTrekk()" />
      <SeqMessage x1={spillerX} x2={koppX} y={145} label="trill()" />
      <SeqMessage x1={koppX} x2={spillerX} y={165} label="sum" isReturn />
      <SeqMessage x1={spillerX} x2={brettX} y={195} label="nyRute = flytt(rute, sum)" />
      <SeqMessage x1={brettX} x2={spillerX} y={215} label="nyRute" isReturn />

      <SeqMessage x1={spillerX} x2={skjoteX} y={245} label="landetPa(this)" />

      {/* alt: ledig eller eid */}
      <SeqFragment x={140} y={270} w={430} h={120} label="alt" condition="ledig | eid av annen" />
      <SeqMessage x1={skjoteX} x2={spillerX} y={305} label="kjøp?" isReturn />
      <SeqMessage x1={spillerX} x2={skjoteX} y={335} label="settEier(this)" />
      <SeqMessage x1={spillerX} x2={spillerX + 30} y={370} label="trekkFraPenger(pris)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   STIGESPILL — domenemodell iter 3 (med sekserregler)
   ═══════════════════════════════════════════════ */

/** Iter 3 = iter 2 + Spiller får attributtet antallSekserePaaRad */
export function DomainStigespillIter3() {
  return (
    <svg viewBox="0 0 640 320" className="w-full mx-auto" role="img" aria-label="Stigespill iter 3 med sekserregler">
      <ClassBox x={250} y={5} name="Stigespill" attrs={["rundeNr"]} w={120} />
      <ClassBox x={50} y={90} name="Brett" w={90} />
      <ClassBox x={270} y={90} name="Spiller" attrs={["navn", "antallSekserePaaRad"]} w={170} />
      <ClassBox x={490} y={90} name="Terning" attrs={["verdi"]} w={90} />
      <ClassBox x={50} y={190} name="Rute" attrs={["nr"]} w={90} />
      <ClassBox x={490} y={190} name="Brikke" w={90} />
      <ClassBox x={210} y={250} name="Stige" attrs={["fraNr", "tilNr"]} w={120} />
      <ClassBox x={360} y={250} name="Slange" attrs={["fraNr", "tilNr"]} w={120} />

      <line x1={260} y1={28} x2={140} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={170} y={58} fontSize={9}>1</text>
      <text x={140} y={86} fontSize={9}>1</text>

      <line x1={325} y1={42} x2={325} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={330} y={62} fontSize={9}>1</text>
      <text x={330} y={88} fontSize={9}>2..4</text>

      <line x1={365} y1={28} x2={490} y2={90} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={395} y={50} fontSize={9}>1</text>
      <text x={485} y={86} fontSize={9}>1</text>

      <line x1={95} y1={134} x2={95} y2={190} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={100} y={160} fontSize={9}>1</text>
      <text x={100} y={186} fontSize={9}>100</text>

      <line x1={355} y1={134} x2={510} y2={190} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={400} y={160} fontSize={9}>1</text>
      <text x={500} y={186} fontSize={9}>1</text>

      <line x1={490} y1={210} x2={140} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={300} y={205} fontSize={9} textAnchor="middle">står på</text>
      <text x={150} y={205} fontSize={9}>1</text>
      <text x={485} y={205} fontSize={9}>1</text>

      {/* Brett → Stige */}
      <line x1={140} y1={130} x2={250} y2={250} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={160} y={185} fontSize={9}>1</text>
      <text x={245} y={246} fontSize={9}>0..*</text>

      {/* Brett → Slange */}
      <line x1={140} y1={140} x2={400} y2={250} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={250} y={205} fontSize={9}>0..*</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SKYJO — iterasjon 1 (uten Omgang/Poengblokk-separasjon)
   ═══════════════════════════════════════════════ */

/** Iter 1: én aktør, ett brukstilfelle (én omgang om gangen) */
export function UseCaseSkyjoIter1() {
  return (
    <svg viewBox="0 0 460 200" className="w-full max-w-md mx-auto" role="img" aria-label="Skyjo use case iter 1">
      <rect x={140} y={10} width={300} height={180} fill={C.systemFill} stroke={C.systemStroke} strokeWidth={2} rx={8} strokeDasharray="8 4" />
      <text x={290} y={32} textAnchor="middle" fontSize={13} fontWeight={700}>Skyjo</text>

      <StickFigure x={60} y={100} label="Spiller" />

      <UseCase cx={290} cy={75} label="Start spill" />
      <UseCase cx={290} cy={140} label="Spill tur" />

      <line x1={85} y1={95} x2={235} y2={75} stroke={C.actorStroke} strokeWidth={1.5} />
      <line x1={85} y1={105} x2={235} y2={140} stroke={C.actorStroke} strokeWidth={1.5} />
    </svg>
  );
}

/** Iter 1: domenemodell uten Omgang/Poengblokk — bare grunnleggende konsepter */
export function DomainSkyjoIter1() {
  return (
    <svg viewBox="0 0 700 250" className="w-full mx-auto" role="img" aria-label="Skyjo iter 1 domene">
      <ClassBox x={290} y={5} name="Skyjo" w={120} />

      <ClassBox x={50} y={100} name="Spiller" attrs={["navn", "poeng"]} w={130} />
      <ClassBox x={250} y={100} name="Kortstokk" w={110} />
      <ClassBox x={400} y={100} name="Kastehaug" w={110} />
      <ClassBox x={550} y={100} name="Spillebrett" attrs={["3x4 rutenett"]} w={140} />

      <ClassBox x={300} y={195} name="Kort" attrs={["verdi: -2..12", "synlig: bool"]} w={150} />

      {/* Skyjo → Spiller */}
      <line x1={300} y1={40} x2={130} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={200} y={62} fontSize={9}>1</text>
      <text x={140} y={96} fontSize={9}>2..8</text>

      {/* Skyjo → Kortstokk */}
      <line x1={335} y1={50} x2={310} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={325} y={75} fontSize={9}>1</text>
      <text x={315} y={96} fontSize={9}>1</text>

      {/* Skyjo → Kastehaug */}
      <line x1={385} y1={50} x2={450} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={400} y={70} fontSize={9}>1</text>
      <text x={445} y={96} fontSize={9}>1</text>

      {/* Spiller → Spillebrett */}
      <line x1={130} y1={140} x2={620} y2={140} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={155} y={134} fontSize={9}>1</text>
      <text x={605} y={134} fontSize={9}>1</text>

      {/* Spillebrett → Kort */}
      <line x1={620} y1={150} x2={400} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={605} y={170} fontSize={9}>1</text>
      <text x={395} y={205} fontSize={9}>12</text>

      {/* Kortstokk → Kort */}
      <line x1={300} y1={150} x2={350} y2={195} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={310} y={175} fontSize={9}>1</text>
      <text x={345} y={193} fontSize={9}>0..*</text>

      {/* Kastehaug → Kort */}
      <line x1={450} y1={150} x2={400} y2={195} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={445} y={170} fontSize={9}>1</text>
      <text x={395} y={193} fontSize={9}>0..*</text>
    </svg>
  );
}

/** Iter 1: enkelt sekvensdiagram uten alt-fragment */
export function SequenceSkyjoIter1() {
  const spillerX = 60;
  const sysX = 170;
  const bunkeX = 280;
  const brettX = 400;
  const maxY = 280;

  return (
    <svg viewBox="0 0 480 290" className="w-full mx-auto" role="img" aria-label="Skyjo iter 1 sekvens">
      <SeqObject x={spillerX} name=":Spiller" maxY={maxY} />
      <SeqObject x={sysX} name=":Skyjo" maxY={maxY} />
      <SeqObject x={bunkeX} name=":Kortstokk" maxY={maxY} />
      <SeqObject x={brettX} name=":Spillebrett" maxY={maxY} />

      <SeqActivation x={sysX} y={50} h={210} />

      <SeqMessage x1={spillerX} x2={sysX} y={60} label="spillTur(pos)" />

      <SeqMessage x1={sysX} x2={bunkeX} y={100} label="kort = trekk()" />
      <SeqMessage x1={bunkeX} x2={sysX} y={120} label="kort" isReturn />

      <SeqMessage x1={sysX} x2={brettX} y={155} label="gammelt = bytt(pos, kort)" />
      <SeqMessage x1={brettX} x2={sysX} y={175} label="gammelt" isReturn />

      <SeqMessage x1={sysX} x2={brettX} y={210} label="ferdig = alleÅpne()" />
      <SeqMessage x1={brettX} x2={sysX} y={235} label="ferdig" isReturn />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   GANZ SCHÖN CLEVER — iterasjon 1 (uten bonus/joker)
   ═══════════════════════════════════════════════ */

/** Iter 1: bare basis — uten EkstraEffekt og uten Joker */
export function DomainGanzSchonCleverIter1() {
  return (
    <svg viewBox="0 0 660 300" className="w-full mx-auto" role="img" aria-label="GSC iter 1 uten bonus/joker">
      <ClassBox x={270} y={5} name="GSCSpill" w={120} />

      <ClassBox x={50} y={100} name="Spiller" attrs={["navn"]} w={120} />
      <ClassBox x={220} y={100} name="Runde" attrs={["nr"]} w={100} />
      <ClassBox x={370} y={100} name="Terning" attrs={["farge", "symbol"]} w={140} />

      <ClassBox x={50} y={210} name="Spillebrett" w={120} />
      <ClassBox x={210} y={210} name="Område" attrs={["farge"]} w={120} />
      <ClassBox x={370} y={210} name="Rute" attrs={["symbol", "avkrysset"]} w={150} />

      {/* GSCSpill → Spiller */}
      <line x1={280} y1={40} x2={130} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={200} y={62} fontSize={9}>1</text>
      <text x={135} y={96} fontSize={9}>2..4</text>

      {/* GSCSpill → Runde */}
      <line x1={310} y1={45} x2={275} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={300} y={75} fontSize={9}>1</text>
      <text x={280} y={96} fontSize={9}>1..*</text>

      {/* GSCSpill → Terning */}
      <line x1={370} y1={40} x2={440} y2={100} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={385} y={62} fontSize={9}>1</text>
      <text x={435} y={96} fontSize={9}>5</text>

      {/* Spiller → Spillebrett */}
      <line x1={110} y1={140} x2={110} y2={210} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={115} y={170} fontSize={9}>1</text>
      <text x={115} y={206} fontSize={9}>1</text>

      {/* Spillebrett → Område */}
      <line x1={170} y1={240} x2={210} y2={240} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={175} y={235} fontSize={9}>1</text>
      <text x={205} y={235} fontSize={9}>4</text>

      {/* Område → Rute */}
      <line x1={330} y1={240} x2={370} y2={240} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={335} y={235} fontSize={9}>1</text>
      <text x={365} y={235} fontSize={9}>0..*</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   STIGESPILL ITER 3 — sekvens med klassediagram-bilde
   ═══════════════════════════════════════════════ */

/** Klassediagram (utformingsmodell) for Stigespill — viser metoder som skiller fra domenemodell */
export function ClassDiagramStigespill() {
  return (
    <svg viewBox="0 0 660 320" className="w-full mx-auto" role="img" aria-label="Klassediagram Stigespill med metoder">
      <ClassBox
        x={250}
        y={5}
        name="Stigespill"
        attrs={[
          "- rundeNr: int",
          "+ start(): void",
          "+ spillTrekk(s): Trekk",
          "+ erFerdig(): bool",
        ]}
        w={170}
      />
      <ClassBox
        x={50}
        y={130}
        name="Brett"
        attrs={[
          "- ruter: List<Rute>",
          "+ getRute(n): Rute",
          "+ finnNyRute(r,v): Rute",
        ]}
        w={150}
      />
      <ClassBox
        x={260}
        y={130}
        name="Spiller"
        attrs={[
          "- navn: String",
          "- sekserePaaRad: int",
          "+ trill(): int",
          "+ flyttTil(r): void",
        ]}
        w={170}
      />
      <ClassBox
        x={490}
        y={130}
        name="Terning"
        attrs={["- verdi: int", "+ trill(): int"]}
        w={130}
      />
      <ClassBox
        x={50}
        y={250}
        name="Rute"
        attrs={["- nr: int", "- forflytning: int"]}
        w={120}
      />
      <ClassBox
        x={250}
        y={250}
        name="Brikke"
        attrs={["- rute: Rute", "+ setRute(r)"]}
        w={130}
      />

      {/* Stigespill → Brett */}
      <line x1={260} y1={70} x2={150} y2={130} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={185} y={100} fontSize={9}>1</text>
      <text x={150} y={126} fontSize={9}>1</text>

      {/* Stigespill → Spiller */}
      <line x1={335} y1={92} x2={335} y2={130} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={340} y={110} fontSize={9}>1</text>
      <text x={340} y={128} fontSize={9}>2..4</text>

      {/* Stigespill → Terning */}
      <line x1={420} y1={70} x2={530} y2={130} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={460} y={92} fontSize={9}>1</text>
      <text x={530} y={126} fontSize={9}>1</text>

      {/* Brett → Rute */}
      <line x1={120} y1={210} x2={120} y2={250} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={125} y={230} fontSize={9}>1</text>
      <text x={125} y={246} fontSize={9}>100</text>

      {/* Spiller → Brikke */}
      <line x1={310} y1={220} x2={310} y2={250} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={315} y={235} fontSize={9}>1</text>
      <text x={315} y={246} fontSize={9}>1</text>

      {/* Brikke → Rute */}
      <line x1={250} y1={290} x2={170} y2={290} stroke={C.classStroke} strokeWidth={1.5} />
      <text x={205} y={285} fontSize={9} textAnchor="middle">står på</text>
      <text x={245} y={285} fontSize={9}>1</text>
      <text x={175} y={285} fontSize={9}>1</text>
    </svg>
  );
}
