import { Dat107Figure } from "./Dat107Figure";

export interface DocumentVsRelationalDiagramProps {
  title?: string;
  caption?: string;
  ariaLabel?: string;
  className?: string;
}

function MiniTable({
  x,
  y,
  title,
  rows,
  width = 172,
}: {
  x: number;
  y: number;
  title: string;
  rows: string[];
  width?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={32 + rows.length * 25}
        rx={8}
        className="fill-white stroke-sky-300 dark:fill-neutral-950 dark:stroke-sky-700"
        strokeWidth={1.5}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={32}
        rx={8}
        className="fill-sky-50 stroke-sky-300 dark:fill-sky-950/60 dark:stroke-sky-700"
        strokeWidth={1.5}
      />
      <text
        x={x + width / 2}
        y={y + 21}
        textAnchor="middle"
        className="fill-sky-800 text-xs font-bold dark:fill-sky-100"
      >
        {title}
      </text>
      {rows.map((row, index) => (
        <text
          key={row}
          x={x + 10}
          y={y + 53 + index * 25}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          {row}
        </text>
      ))}
    </g>
  );
}

function JsonLine({
  x,
  y,
  text,
  muted = false,
}: {
  x: number;
  y: number;
  text: string;
  muted?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      className={
        muted
          ? "fill-neutral-500 text-xs dark:fill-neutral-400"
          : "fill-neutral-800 text-xs dark:fill-neutral-100"
      }
    >
      {text}
    </text>
  );
}

export function DocumentVsRelationalDiagram({
  title = "Dokumentmodell versus relasjonsmodell",
  caption = "Relasjonsmodellen fordeler data i tabeller som kan joines. Dokumentmodellen samler ofte ett aggregat i ett JSON-dokument når det vanligvis leses samlet.",
  ariaLabel = "Diagram som sammenligner relasjonelle tabeller med et samlet MongoDB dokument",
  className = "",
}: DocumentVsRelationalDiagramProps) {
  return (
    <Dat107Figure title={title} caption={caption} className={className}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox="0 0 720 420"
        className="h-auto w-full"
      >
        <title>{ariaLabel}</title>
        <rect
          x={1}
          y={1}
          width={718}
          height={418}
          rx={14}
          className="fill-white/70 stroke-dat107-100 dark:fill-neutral-950/40 dark:stroke-dat107-900/60"
        />

        <text
          x={40}
          y={42}
          className="fill-sky-800 text-sm font-bold dark:fill-sky-100"
        >
          Relasjonsmodell
        </text>
        <MiniTable
          x={40}
          y={62}
          title="kunde"
          rows={["kunde_id PK", "navn"]}
        />
        <MiniTable
          x={250}
          y={62}
          title="ordre"
          rows={["ordre_id PK", "kunde_id FK", "dato"]}
        />
        <MiniTable
          x={40}
          y={210}
          title="ordrelinje"
          rows={["ordre_id FK", "varenr FK", "antall"]}
          width={180}
        />
        <MiniTable
          x={250}
          y={210}
          title="vare"
          rows={["varenr PK", "navn", "pris"]}
        />

        <line
          x1={212}
          y1={113}
          x2={250}
          y2={113}
          className="stroke-sky-500"
          strokeWidth={2}
        />
        <line
          x1={335}
          y1={163}
          x2={140}
          y2={210}
          className="stroke-sky-500"
          strokeWidth={2}
        />
        <line
          x1={220}
          y1={260}
          x2={250}
          y2={260}
          className="stroke-sky-500"
          strokeWidth={2}
        />

        <text
          x={475}
          y={42}
          className="fill-dat107-800 text-sm font-bold dark:fill-dat107-100"
        >
          Dokumentmodell
        </text>
        <rect
          x={475}
          y={62}
          width={205}
          height={280}
          rx={12}
          className="fill-dat107-50 stroke-dat107-400 dark:fill-dat107-950/50 dark:stroke-dat107-500"
          strokeWidth={1.7}
        />
        <JsonLine x={492} y={91} text="{" />
        <JsonLine x={510} y={119} text='"kundeId": 42,' />
        <JsonLine x={510} y={147} text='"navn": "Kari",' />
        <JsonLine x={510} y={175} text='"ordre": [' />
        <JsonLine x={528} y={203} text='{ "ordreNr": 1001,' />
        <JsonLine x={546} y={231} text='"linjer": [' />
        <JsonLine x={564} y={259} text='{ "varenr": "A1" },' muted />
        <JsonLine x={564} y={287} text='{ "varenr": "B7" }' muted />
        <JsonLine x={546} y={315} text='] }' />
        <JsonLine x={510} y={338} text="]" />
        <JsonLine x={492} y={363} text="}" />

        <text
          x={40}
          y={368}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          Velg relasjonelt når integritet, constraints og fleksible spørringer er viktig.
        </text>
        <text
          x={40}
          y={392}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          Velg dokument når samme aggregat leses samlet og strukturen varierer.
        </text>
      </svg>
    </Dat107Figure>
  );
}
