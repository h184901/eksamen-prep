import { Dat107Figure } from "./Dat107Figure";

export interface ERCardinalityDiagramProps {
  title?: string;
  caption?: string;
  ariaLabel?: string;
  className?: string;
}

function EntityBox({
  x,
  y,
  label,
}: {
  x: number;
  y: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={150}
        height={54}
        rx={8}
        className="fill-white stroke-dat107-400 dark:fill-neutral-950 dark:stroke-dat107-500"
        strokeWidth={2}
      />
      <text
        x={x + 75}
        y={y + 34}
        textAnchor="middle"
        className="fill-neutral-900 text-sm font-bold dark:fill-neutral-50"
      >
        {label}
      </text>
    </g>
  );
}

function Relationship({
  cx,
  cy,
  label,
}: {
  cx: number;
  cy: number;
  label: string;
}) {
  const points = `${cx},${cy - 28} ${cx + 54},${cy} ${cx},${cy + 28} ${cx - 54},${cy}`;

  return (
    <g>
      <polygon
        points={points}
        className="fill-dat107-50 stroke-dat107-500 dark:fill-dat107-950/50 dark:stroke-dat107-400"
        strokeWidth={2}
      />
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="fill-dat107-800 text-xs font-bold dark:fill-dat107-100"
      >
        {label}
      </text>
    </g>
  );
}

function CardinalityRow({
  y,
  title,
  left,
  relation,
  right,
  leftCardinality,
  rightCardinality,
  note,
}: {
  y: number;
  title: string;
  left: string;
  relation: string;
  right: string;
  leftCardinality: string;
  rightCardinality: string;
  note: string;
}) {
  const midY = y + 40;

  return (
    <g>
      <text
        x={24}
        y={y + 8}
        className="fill-dat107-700 text-sm font-bold dark:fill-dat107-300"
      >
        {title}
      </text>
      <EntityBox x={42} y={y + 24} label={left} />
      <Relationship cx={360} cy={midY + 11} label={relation} />
      <EntityBox x={528} y={y + 24} label={right} />

      <line
        x1={192}
        y1={midY + 11}
        x2={306}
        y2={midY + 11}
        className="stroke-neutral-500 dark:stroke-neutral-400"
        strokeWidth={2}
      />
      <line
        x1={414}
        y1={midY + 11}
        x2={528}
        y2={midY + 11}
        className="stroke-neutral-500 dark:stroke-neutral-400"
        strokeWidth={2}
      />

      <text
        x={214}
        y={midY - 2}
        className="fill-neutral-700 text-xs font-bold dark:fill-neutral-200"
      >
        {leftCardinality}
      </text>
      <text
        x={500}
        y={midY - 2}
        textAnchor="end"
        className="fill-neutral-700 text-xs font-bold dark:fill-neutral-200"
      >
        {rightCardinality}
      </text>
      <text
        x={360}
        y={y + 96}
        textAnchor="middle"
        className="fill-neutral-600 text-xs dark:fill-neutral-300"
      >
        {note}
      </text>
    </g>
  );
}

export function ERCardinalityDiagram({
  title = "Kardinalitet i ER-modellering",
  caption = "Tre vanlige kardinaliteter: én-til-én, én-til-mange og mange-til-mange.",
  ariaLabel = "ER-diagram som viser kardinalitetene en til en, en til mange og mange til mange",
  className = "",
}: ERCardinalityDiagramProps) {
  return (
    <Dat107Figure title={title} caption={caption} className={className}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox="0 0 720 390"
        className="h-auto w-full"
      >
        <title>{ariaLabel}</title>
        <rect
          x={1}
          y={1}
          width={718}
          height={388}
          rx={14}
          className="fill-white/70 stroke-dat107-100 dark:fill-neutral-950/40 dark:stroke-dat107-900/60"
        />
        <CardinalityRow
          y={24}
          title="1:1"
          left="Person"
          relation="har"
          right="Pass"
          leftCardinality="1"
          rightCardinality="1"
          note="Hver person har maks ett pass, og hvert pass tilhører én person."
        />
        <CardinalityRow
          y={144}
          title="1:N"
          left="Kunde"
          relation="legger inn"
          right="Ordre"
          leftCardinality="1"
          rightCardinality="N"
          note="Én kunde kan ha mange ordre, men hver ordre hører til én kunde."
        />
        <CardinalityRow
          y={264}
          title="M:N"
          left="Student"
          relation="tar"
          right="Emne"
          leftCardinality="M"
          rightCardinality="N"
          note="Mange studenter kan ta mange emner. M:N må mappes via koblingstabell."
        />
      </svg>
    </Dat107Figure>
  );
}
