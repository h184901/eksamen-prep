import { Dat107Figure } from "./Dat107Figure";

export interface JPARelationshipDiagramProps {
  title?: string;
  caption?: string;
  ariaLabel?: string;
  className?: string;
}

function ClassBox({
  x,
  y,
  title,
  lines,
}: {
  x: number;
  y: number;
  title: string;
  lines: string[];
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={215}
        height={44 + lines.length * 27}
        rx={10}
        className="fill-white stroke-dat107-400 dark:fill-neutral-950 dark:stroke-dat107-500"
        strokeWidth={1.7}
      />
      <rect
        x={x}
        y={y}
        width={215}
        height={38}
        rx={10}
        className="fill-dat107-50 stroke-dat107-300 dark:fill-dat107-950/60 dark:stroke-dat107-600"
        strokeWidth={1.5}
      />
      <text
        x={x + 108}
        y={y + 25}
        textAnchor="middle"
        className="fill-dat107-800 text-sm font-bold dark:fill-dat107-100"
      >
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + 14}
          y={y + 63 + index * 27}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function DatabaseTable({
  x,
  y,
  title,
  lines,
}: {
  x: number;
  y: number;
  title: string;
  lines: string[];
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={215}
        height={44 + lines.length * 27}
        rx={10}
        className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/50 dark:stroke-sky-500"
        strokeWidth={1.7}
      />
      <text
        x={x + 108}
        y={y + 27}
        textAnchor="middle"
        className="fill-sky-800 text-sm font-bold dark:fill-sky-100"
      >
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + 14}
          y={y + 63 + index * 27}
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function JPARelationshipDiagram({
  title = "Owning side i JPA",
  caption = "Fremmednøkkelen ligger på mange-siden i databasen. Derfor er @ManyToOne-siden vanligvis owning side, mens @OneToMany bruker mappedBy.",
  ariaLabel = "Diagram som viser JPA owning side, mappedBy og fremmednøkkel mellom Vitnemal og Karakter",
  className = "",
}: JPARelationshipDiagramProps) {
  return (
    <Dat107Figure title={title} caption={caption} className={className}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox="0 0 720 420"
        className="h-auto w-full"
      >
        <title>{ariaLabel}</title>
        <defs>
          <marker
            id="jpaArrow"
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
          height={418}
          rx={14}
          className="fill-white/70 stroke-dat107-100 dark:fill-neutral-950/40 dark:stroke-dat107-900/60"
        />

        <ClassBox
          x={46}
          y={54}
          title="Vitnemal"
          lines={["studNr @Id", "List<Karakter>", "@OneToMany(mappedBy)"]}
        />
        <ClassBox
          x={456}
          y={54}
          title="Karakter"
          lines={["karNr @Id", "Vitnemal vitnemal", "@ManyToOne"]}
        />

        <line
          x1={456}
          y1={132}
          x2={261}
          y2={132}
          className="stroke-dat107-500"
          strokeWidth={2}
          markerEnd="url(#jpaArrow)"
        />
        <text
          x={360}
          y={112}
          textAnchor="middle"
          className="fill-dat107-700 text-xs font-bold dark:fill-dat107-300"
        >
          owning side
        </text>
        <text
          x={360}
          y={152}
          textAnchor="middle"
          className="fill-neutral-600 text-xs dark:fill-neutral-300"
        >
          @JoinColumn(name = "studnr")
        </text>

        <DatabaseTable
          x={46}
          y={258}
          title="vitnemal"
          lines={["studnr PK", "studiestart", "studieslutt"]}
        />
        <DatabaseTable
          x={456}
          y={258}
          title="karakter"
          lines={["karnr PK", "emnekode", "studnr FK"]}
        />

        <line
          x1={456}
          y1={342}
          x2={261}
          y2={342}
          className="stroke-sky-500"
          strokeWidth={2}
          markerEnd="url(#jpaArrow)"
        />
        <text
          x={360}
          y={322}
          textAnchor="middle"
          className="fill-sky-700 text-xs font-bold dark:fill-sky-300"
        >
          FK ligger her
        </text>
        <text
          x={360}
          y={184}
          textAnchor="middle"
          className="fill-neutral-700 text-xs dark:fill-neutral-200"
        >
          mappedBy betyr: listen peker tilbake til feltet som eier koblingen.
        </text>
      </svg>
    </Dat107Figure>
  );
}
