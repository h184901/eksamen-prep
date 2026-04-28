import { Dat107Figure } from "./Dat107Figure";

export interface SQLJoinDiagramProps {
  title?: string;
  caption?: string;
  ariaLabel?: string;
  className?: string;
}

function TableBox({
  x,
  y,
  title,
  rows,
  tone = "neutral",
}: {
  x: number;
  y: number;
  title: string;
  rows: string[];
  tone?: "neutral" | "purple" | "sky";
}) {
  const headerClass =
    tone === "purple"
      ? "fill-dat107-100 stroke-dat107-400 dark:fill-dat107-950 dark:stroke-dat107-500"
      : tone === "sky"
        ? "fill-sky-100 stroke-sky-400 dark:fill-sky-950 dark:stroke-sky-500"
        : "fill-white stroke-neutral-300 dark:fill-neutral-950 dark:stroke-neutral-700";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={160}
        height={34 + rows.length * 26}
        rx={8}
        className="fill-white stroke-neutral-300 dark:fill-neutral-950 dark:stroke-neutral-700"
        strokeWidth={1.5}
      />
      <rect
        x={x}
        y={y}
        width={160}
        height={34}
        rx={8}
        className={headerClass}
        strokeWidth={1.5}
      />
      <text
        x={x + 80}
        y={y + 22}
        textAnchor="middle"
        className="fill-neutral-900 text-xs font-bold dark:fill-neutral-50"
      >
        {title}
      </text>
      {rows.map((row, index) => (
        <text
          key={row}
          x={x + 12}
          y={y + 56 + index * 26}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          {row}
        </text>
      ))}
    </g>
  );
}

function ResultBox({
  x,
  y,
  title,
  rows,
  tone,
}: {
  x: number;
  y: number;
  title: string;
  rows: string[];
  tone: "match" | "left";
}) {
  const classes =
    tone === "match"
      ? "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/50 dark:stroke-emerald-500"
      : "fill-amber-50 stroke-amber-400 dark:fill-amber-950/50 dark:stroke-amber-500";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={235}
        height={34 + rows.length * 28}
        rx={10}
        className={classes}
        strokeWidth={1.6}
      />
      <text
        x={x + 16}
        y={y + 24}
        className="fill-neutral-900 text-xs font-bold dark:fill-neutral-50"
      >
        {title}
      </text>
      {rows.map((row, index) => (
        <text
          key={row}
          x={x + 16}
          y={y + 56 + index * 28}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          {row}
        </text>
      ))}
    </g>
  );
}

export function SQLJoinDiagram({
  title = "JOIN og LEFT JOIN",
  caption = "JOIN beholder bare rader med match. LEFT JOIN beholder alle rader fra venstre tabell og fyller høyre side med NULL når match mangler.",
  ariaLabel = "Diagram som sammenligner inner join og left join mellom kunde og ordre",
  className = "",
}: SQLJoinDiagramProps) {
  return (
    <Dat107Figure title={title} caption={caption} className={className}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox="0 0 720 390"
        className="h-auto w-full"
      >
        <title>{ariaLabel}</title>
        <defs>
          <marker
            id="sqlJoinArrow"
            markerWidth="9"
            markerHeight="9"
            refX="8"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,0 L9,4.5 L0,9 Z" className="fill-dat107-500" />
          </marker>
        </defs>
        <rect
          x={1}
          y={1}
          width={718}
          height={388}
          rx={14}
          className="fill-white/70 stroke-dat107-100 dark:fill-neutral-950/40 dark:stroke-dat107-900/60"
        />

        <TableBox
          x={36}
          y={44}
          title="kunde"
          rows={["1  Kari", "2  Ola", "3  Iman"]}
          tone="purple"
        />
        <TableBox
          x={246}
          y={44}
          title="ordre"
          rows={["10  kunde=1", "11  kunde=1", "12  kunde=3"]}
          tone="sky"
        />

        <line
          x1={196}
          y1={104}
          x2={246}
          y2={104}
          className="stroke-dat107-500"
          strokeWidth={2}
          markerEnd="url(#sqlJoinArrow)"
        />
        <text
          x={221}
          y={91}
          textAnchor="middle"
          className="fill-dat107-700 text-xs font-bold dark:fill-dat107-300"
        >
          k.knr = o.knr
        </text>

        <ResultBox
          x={454}
          y={44}
          title="INNER JOIN"
          rows={["Kari  -> ordre 10", "Kari  -> ordre 11", "Iman  -> ordre 12"]}
          tone="match"
        />
        <ResultBox
          x={454}
          y={208}
          title="LEFT JOIN"
          rows={[
            "Kari  -> ordre 10",
            "Kari  -> ordre 11",
            "Ola   -> NULL",
            "Iman  -> ordre 12",
          ]}
          tone="left"
        />

        <line
          x1={406}
          y1={100}
          x2={454}
          y2={100}
          className="stroke-emerald-500"
          strokeWidth={2}
          markerEnd="url(#sqlJoinArrow)"
        />
        <line
          x1={406}
          y1={128}
          x2={454}
          y2={247}
          className="stroke-amber-500"
          strokeWidth={2}
          markerEnd="url(#sqlJoinArrow)"
        />

        <text
          x={36}
          y={258}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          Eksamenstegn: \"vis også de uten ...\" betyr ofte LEFT JOIN.
        </text>
        <text
          x={36}
          y={286}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          Teller du etter LEFT JOIN, tell høyre nøkkelkolonne, ikke count(*).
        </text>
      </svg>
    </Dat107Figure>
  );
}
