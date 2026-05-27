// Pedagogical illustration: RPC kall-flyt mellom klient og server.
// Selvtegnet SVG, ikke avledet fra noen figur i lærebok eller forelesning.

export default function RpcCallFlowDiagram() {
  const width = 600;
  const height = 360;

  // Lane geometry
  const clientX = 40;
  const stubCX = 170;
  const stubSX = 360;
  const serverX = 520;
  const laneW = 80;
  const laneTop = 50;
  const laneH = 280;

  const lanes: Array<{ x: number; label: string }> = [
    { x: clientX, label: "Klient" },
    { x: stubCX, label: "Klient-stub" },
    { x: stubSX, label: "Server-stub" },
    { x: serverX, label: "Server" },
  ];

  // y-positions for the call sequence
  const ySteps = [90, 130, 180, 230, 270, 310];

  return (
    <figure className="my-6 not-prose">
      <svg
        role="img"
        aria-labelledby="diag-rpc-title diag-rpc-desc"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto text-neutral-800 dark:text-neutral-100"
      >
        <title id="diag-rpc-title">
          RPC kall-flyt med klient-stub, server-stub og nettverk
        </title>
        <desc id="diag-rpc-desc">
          Fire vertikale baner: Klient, Klient-stub, Server-stub og Server. En
          klient gjør et lokalt prosedyrekall til klient-stubben. Stubben
          marshaller argumenter, sender en forespørselsmelding over nettverket
          til server-stubben. Server-stubben unmarshaller, kaller den faktiske
          prosedyren på serveren, og svaret går samme vei tilbake. Marshalling-
          og unmarshalling-bokser er markert mellom stubbene og nettverket.
        </desc>

        {/* Lane headers + lifelines */}
        {lanes.map((l) => (
          <g key={l.label}>
            <rect
              x={l.x}
              y={laneTop - 24}
              width={laneW}
              height={20}
              rx={3}
              className="fill-neutral-100 stroke-neutral-400 dark:fill-neutral-800 dark:stroke-neutral-600"
              strokeWidth={1}
            />
            <text
              x={l.x + laneW / 2}
              y={laneTop - 10}
              textAnchor="middle"
              className="fill-current text-xs font-medium"
            >
              {l.label}
            </text>
            <line
              x1={l.x + laneW / 2}
              y1={laneTop}
              x2={l.x + laneW / 2}
              y2={laneTop + laneH}
              className="stroke-neutral-400 dark:stroke-neutral-600"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          </g>
        ))}

        {/* Marshalling/unmarshalling boxes near stubs */}
        <g>
          <rect
            x={stubCX + laneW + 6}
            y={ySteps[1] - 12}
            width={70}
            height={22}
            rx={3}
            className="fill-amber-50 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-400"
            strokeWidth={1}
          />
          <text
            x={stubCX + laneW + 41}
            y={ySteps[1]}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-[10px]"
          >
            marshal
          </text>

          <rect
            x={stubSX - 76}
            y={ySteps[2] - 12}
            width={70}
            height={22}
            rx={3}
            className="fill-amber-50 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-400"
            strokeWidth={1}
          />
          <text
            x={stubSX - 41}
            y={ySteps[2]}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-[10px]"
          >
            unmarshal
          </text>

          <rect
            x={stubSX - 76}
            y={ySteps[3] - 12}
            width={70}
            height={22}
            rx={3}
            className="fill-amber-50 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-400"
            strokeWidth={1}
          />
          <text
            x={stubSX - 41}
            y={ySteps[3]}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-[10px]"
          >
            marshal
          </text>

          <rect
            x={stubCX + laneW + 6}
            y={ySteps[4] - 12}
            width={70}
            height={22}
            rx={3}
            className="fill-amber-50 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-400"
            strokeWidth={1}
          />
          <text
            x={stubCX + laneW + 41}
            y={ySteps[4]}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-[10px]"
          >
            unmarshal
          </text>
        </g>

        {/* Arrows */}
        <defs>
          <marker
            id="rpc-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-current" />
          </marker>
        </defs>

        <g
          className="stroke-current"
          strokeWidth={1.4}
          fill="none"
          markerEnd="url(#rpc-arrow)"
        >
          {/* 1. Klient → Klient-stub (call) */}
          <line
            x1={clientX + laneW}
            y1={ySteps[0]}
            x2={stubCX}
            y2={ySteps[0]}
          />
          {/* 2. Klient-stub → Server-stub (request over nett) */}
          <line
            x1={stubCX + laneW}
            y1={ySteps[1] + 18}
            x2={stubSX}
            y2={ySteps[1] + 18}
          />
          {/* 3. Server-stub → Server (do_work) */}
          <line
            x1={stubSX + laneW}
            y1={ySteps[2] + 22}
            x2={serverX}
            y2={ySteps[2] + 22}
          />
          {/* 4. Server → Server-stub (return) */}
          <line
            x1={serverX}
            y1={ySteps[3] - 16}
            x2={stubSX + laneW}
            y2={ySteps[3] - 16}
          />
          {/* 5. Server-stub → Klient-stub (reply over nett) */}
          <line
            x1={stubSX}
            y1={ySteps[3] + 18}
            x2={stubCX + laneW}
            y2={ySteps[3] + 18}
          />
          {/* 6. Klient-stub → Klient (return) */}
          <line
            x1={stubCX}
            y1={ySteps[5]}
            x2={clientX + laneW}
            y2={ySteps[5]}
          />
        </g>

        {/* Step labels */}
        <g className="fill-current text-[10px]">
          <text x={clientX + laneW + 6} y={ySteps[0] - 4}>
            1. call(args)
          </text>
          <text x={stubSX - 100} y={ySteps[1] + 14}>
            2. request
          </text>
          <text x={stubSX + laneW + 6} y={ySteps[2] + 18}>
            3. invoke
          </text>
          <text x={stubSX + laneW + 6} y={ySteps[3] - 20}>
            4. result
          </text>
          <text x={stubSX - 80} y={ySteps[3] + 14}>
            5. reply
          </text>
          <text x={clientX + laneW + 6} y={ySteps[5] - 4}>
            6. return
          </text>
        </g>

        {/* Network band marker */}
        <g opacity={0.6}>
          <rect
            x={stubCX + laneW + 80}
            y={laneTop + 70}
            width={stubSX - (stubCX + laneW + 80) - 80}
            height={140}
            rx={6}
            className="fill-none stroke-current"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <text
            x={(stubCX + laneW + stubSX) / 2}
            y={laneTop + 65}
            textAnchor="middle"
            className="fill-current text-[10px] italic"
          >
            nettverk
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
        RPC: klienten ser et lokalt prosedyrekall; stubbene skjuler nettverket.
      </figcaption>
    </figure>
  );
}
