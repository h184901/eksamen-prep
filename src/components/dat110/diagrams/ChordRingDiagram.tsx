// Pedagogical illustration: Chord-ring med m=5 (id-rom 0..31), 5 noder og et
// nøkkeloppslag fra node 1 til ansvarlig successor. Geometri genereres
// programmatisk. Ikke avledet fra noen lærebokfigur.

const M = 5;
const ID_SPACE = 1 << M; // 32
const NODES = [1, 8, 14, 21, 28];
const KEY = 18;
// Lookup from node 1 finds successor(18). With these nodes successor(18)=21.
// Finger jumps from node 1 along the ring: 1 -> 14 -> 21 (own successor).
const LOOKUP_PATH = [1, 14, 21];

export default function ChordRingDiagram() {
  const size = 380;
  const cx = size / 2;
  const cy = size / 2;
  const r = 130;
  const nodeR = 14;
  const keyR = 9;

  // Place a point for a given chord id on the ring (id 0 at top, clockwise).
  function pos(id: number, radius: number) {
    const theta = (id / ID_SPACE) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + radius * Math.cos(theta), y: cy + radius * Math.sin(theta) };
  }

  // Build SVG arc path between two ids along the outside of the ring (clockwise).
  function arcPath(fromId: number, toId: number, radius: number) {
    const a = pos(fromId, radius);
    const b = pos(toId, radius);
    const span = (toId - fromId + ID_SPACE) % ID_SPACE;
    const largeArc = span > ID_SPACE / 2 ? 1 : 0;
    return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${largeArc} 1 ${b.x} ${b.y}`;
  }

  const keyPos = pos(KEY, r);

  return (
    <figure className="my-6 not-prose">
      <svg
        role="img"
        aria-labelledby="diag-chord-title diag-chord-desc"
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto max-w-md mx-auto text-neutral-800 dark:text-neutral-100"
      >
        <title id="diag-chord-title">
          Chord-ring (m=5) med oppslag av nøkkel 18
        </title>
        <desc id="diag-chord-desc">
          En sirkel som representerer Chord sitt id-rom 0 til 31 med m=5 bits.
          Fem noder ligger på ringen i posisjonene 1, 8, 14, 21 og 28. En
          nøkkel med id 18 plasseres mellom node 14 og 21. Et oppslag starter i
          node 1, hopper via en finger til node 14, og videre til node 21 som
          er successor av nøkkel 18 og dermed ansvarlig node.
        </desc>

        {/* Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          className="fill-none stroke-neutral-400 dark:stroke-neutral-600"
          strokeWidth={1.2}
          strokeDasharray="3 4"
        />

        {/* Id ticks at 0, 8, 16, 24 */}
        {[0, 8, 16, 24].map((id) => {
          const inner = pos(id, r - 6);
          const outer = pos(id, r + 6);
          const label = pos(id, r + 22);
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
                className="fill-current text-[10px] opacity-70"
              >
                {id}
              </text>
            </g>
          );
        })}

        {/* Lookup path arrows (along the ring) */}
        <defs>
          <marker
            id="chord-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-blue-600 dark:fill-blue-400" />
          </marker>
        </defs>
        {LOOKUP_PATH.slice(0, -1).map((from, i) => {
          const to = LOOKUP_PATH[i + 1];
          return (
            <path
              key={`hop-${from}-${to}`}
              d={arcPath(from, to, r)}
              className="fill-none stroke-blue-600 dark:stroke-blue-400"
              strokeWidth={2}
              markerEnd="url(#chord-arrow)"
            />
          );
        })}

        {/* Key marker */}
        <g>
          <circle
            cx={keyPos.x}
            cy={keyPos.y}
            r={keyR}
            className="fill-amber-200 stroke-amber-600 dark:fill-amber-900 dark:stroke-amber-400"
            strokeWidth={1.5}
          />
          <text
            x={keyPos.x}
            y={keyPos.y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-neutral-900 dark:fill-amber-100 text-[9px] font-semibold"
          >
            k{KEY}
          </text>
        </g>

        {/* Nodes */}
        {NODES.map((id) => {
          const p = pos(id, r);
          const isResp = id === 21;
          return (
            <g key={`node-${id}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={nodeR}
                className={
                  isResp
                    ? "fill-blue-600 stroke-blue-700 dark:fill-blue-500 dark:stroke-blue-300"
                    : "fill-neutral-100 stroke-neutral-500 dark:fill-neutral-800 dark:stroke-neutral-400"
                }
                strokeWidth={1.5}
              />
              <text
                x={p.x}
                y={p.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className={
                  isResp
                    ? "fill-white text-[11px] font-semibold"
                    : "fill-current text-[11px] font-medium"
                }
              >
                N{id}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${cx - 90}, ${size - 28})`}>
          <circle
            cx={6}
            cy={6}
            r={5}
            className="fill-amber-200 stroke-amber-600 dark:fill-amber-900 dark:stroke-amber-400"
          />
          <text x={16} y={10} className="fill-current text-[10px]">
            nøkkel
          </text>
          <circle
            cx={66}
            cy={6}
            r={5}
            className="fill-blue-600 dark:fill-blue-500"
          />
          <text x={76} y={10} className="fill-current text-[10px]">
            successor(k)
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
        Oppslag i Chord (m=5): N1 → N14 → N21 = successor(18).
      </figcaption>
    </figure>
  );
}
