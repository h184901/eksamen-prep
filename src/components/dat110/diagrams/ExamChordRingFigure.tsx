// Pedagogisk Chord-ring for eksamensoppgaver: tegner id-rommet (0..2^m-1) som
// en sirkel og plasserer de oppgitte node-id-ene på ringen. Viser KUN ring +
// noder (ingen nøkkel/oppslag) — studenten regner selv finger-tabell og ansvar.
// Geometrien genereres programmatisk og er IKKE avledet fra noen PDF-/lærebokfigur.

interface Props {
  // Antall bits i id-rommet (ring-størrelse = 2^m).
  m: number;
  // Node-/server-id-er som ligger på ringen (må være < 2^m).
  nodes: number[];
  caption: string;
}

export default function ExamChordRingFigure({ m, nodes, caption }: Props) {
  const idSpace = 1 << m;
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 110;
  const nodeR = 15;

  // Plasser et punkt for en gitt chord-id på ringen (id 0 øverst, med klokka).
  function pos(id: number, radius: number) {
    const theta = (id / idSpace) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + radius * Math.cos(theta), y: cy + radius * Math.sin(theta) };
  }

  const ticks = [0, idSpace / 4, idSpace / 2, (idSpace * 3) / 4].map((v) =>
    Math.round(v),
  );
  const sorted = [...nodes].sort((a, b) => a - b);

  return (
    <figure className="my-4 not-prose">
      <svg
        role="img"
        aria-label={caption}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto max-w-xs mx-auto text-neutral-800 dark:text-neutral-100"
      >
        {/* Ring (id-rom) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-none stroke-neutral-400 dark:stroke-neutral-600"
          strokeWidth={1.2}
          strokeDasharray="3 4"
        />

        {/* Id-merker ved kvartalene av id-rommet */}
        {ticks.map((id) => {
          const inner = pos(id, r - 6);
          const outer = pos(id, r + 6);
          const label = pos(id, r + 20);
          return (
            <g key={`tick-${id}`}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                className="stroke-neutral-400 dark:stroke-neutral-600"
                strokeWidth={1}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-[10px] opacity-60"
              >
                {id}
              </text>
            </g>
          );
        })}

        {/* Noder */}
        {sorted.map((id) => {
          const p = pos(id, r);
          return (
            <g key={`node-${id}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={nodeR}
                className="fill-network-100 stroke-network-500 dark:fill-network-900 dark:stroke-network-400"
                strokeWidth={1.5}
              />
              <text
                x={p.x}
                y={p.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-[11px] font-semibold"
              >
                {id}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
        {caption}{" "}
        <span className="italic">
          Egen pedagogisk skisse — ikke den originale eksamensfiguren.
        </span>
      </figcaption>
    </figure>
  );
}
