// Pedagogical illustration: De fire forsinkelses-komponentene på en lenke
// (prosessering, kø, transmisjon, propagering). Selvtegnet SVG.

const components = [
  {
    key: "proc",
    label: "Prosessering",
    sub: "header-sjekk, ruting",
    color: "violet",
  },
  {
    key: "queue",
    label: "Kø",
    sub: "venter i buffer",
    color: "amber",
  },
  {
    key: "trans",
    label: "Transmisjon",
    sub: "L / R",
    color: "emerald",
  },
  {
    key: "prop",
    label: "Propagering",
    sub: "d / s",
    color: "blue",
  },
];

// Tailwind class strings per color (must be referenced literally so Tailwind keeps them).
const colorClasses: Record<string, { fill: string; stroke: string }> = {
  violet: {
    fill: "fill-violet-100 dark:fill-violet-950/50",
    stroke: "stroke-violet-500 dark:stroke-violet-400",
  },
  amber: {
    fill: "fill-amber-100 dark:fill-amber-950/50",
    stroke: "stroke-amber-500 dark:stroke-amber-400",
  },
  emerald: {
    fill: "fill-emerald-100 dark:fill-emerald-950/50",
    stroke: "stroke-emerald-500 dark:stroke-emerald-400",
  },
  blue: {
    fill: "fill-blue-100 dark:fill-blue-950/50",
    stroke: "stroke-blue-500 dark:stroke-blue-400",
  },
};

export default function DelayComponentsDiagram() {
  const width = 620;
  const height = 280;

  const routerA = { x: 40, y: 120, w: 70, h: 40 };
  const routerB = { x: width - 110, y: 120, w: 70, h: 40 };
  const linkY = routerA.y + routerA.h / 2;

  // Component box layout: stack labels above the link.
  const boxesY = 30;
  const boxW = 120;
  const boxH = 56;
  const gap = 12;
  const totalW = components.length * boxW + (components.length - 1) * gap;
  const startX = (width - totalW) / 2;

  return (
    <figure className="my-6 not-prose">
      <svg
        role="img"
        aria-labelledby="diag-delays-title diag-delays-desc"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto text-neutral-800 dark:text-neutral-100"
      >
        <title id="diag-delays-title">
          Forsinkelses-komponenter på en nettverkslenke
        </title>
        <desc id="diag-delays-desc">
          To routere koblet med én lenke. Over lenken vises fire bokser som
          representerer hver sin forsinkelses-komponent: prosessering (header-
          sjekk og ruting), kø (venting i buffer), transmisjon (pakke-lengde L
          delt på lenke-rate R) og propagering (lenke-lengde d delt på
          signalhastighet s). En liten pakke-rektangel beveger seg langs lenken
          for å antyde retning.
        </desc>

        {/* Routers */}
        {[routerA, routerB].map((r, i) => (
          <g key={`router-${i}`}>
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={6}
              className="fill-neutral-100 stroke-neutral-500 dark:fill-neutral-800 dark:stroke-neutral-400"
              strokeWidth={1.5}
            />
            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-xs font-medium"
            >
              {i === 0 ? "Ruter A" : "Ruter B"}
            </text>
          </g>
        ))}

        {/* Link */}
        <line
          x1={routerA.x + routerA.w}
          y1={linkY}
          x2={routerB.x}
          y2={linkY}
          className="stroke-neutral-500 dark:stroke-neutral-400"
          strokeWidth={3}
        />

        {/* Packet in flight */}
        <g>
          <rect
            x={(routerA.x + routerA.w + routerB.x) / 2 - 14}
            y={linkY - 8}
            width={28}
            height={16}
            rx={2}
            className="fill-blue-500 stroke-blue-700 dark:fill-blue-400 dark:stroke-blue-200"
            strokeWidth={1}
          />
          <text
            x={(routerA.x + routerA.w + routerB.x) / 2}
            y={linkY + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white text-[9px] font-semibold"
          >
            pakke
          </text>
        </g>

        {/* Link length label */}
        <text
          x={(routerA.x + routerA.w + routerB.x) / 2}
          y={linkY + 30}
          textAnchor="middle"
          className="fill-current text-[10px] italic opacity-75"
        >
          lenke (lengde d, rate R)
        </text>

        {/* Component boxes */}
        {components.map((c, i) => {
          const x = startX + i * (boxW + gap);
          const cls = colorClasses[c.color];
          return (
            <g key={c.key}>
              <rect
                x={x}
                y={boxesY}
                width={boxW}
                height={boxH}
                rx={6}
                className={`${cls.fill} ${cls.stroke}`}
                strokeWidth={1.5}
              />
              <text
                x={x + boxW / 2}
                y={boxesY + 22}
                textAnchor="middle"
                className="fill-current text-xs font-semibold"
              >
                {c.label}
              </text>
              <text
                x={x + boxW / 2}
                y={boxesY + 40}
                textAnchor="middle"
                className="fill-current text-[10px] opacity-75"
              >
                {c.sub}
              </text>
              {/* Connector down to link */}
              <line
                x1={x + boxW / 2}
                y1={boxesY + boxH}
                x2={x + boxW / 2}
                y2={linkY - 14}
                className={`${cls.stroke}`}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            </g>
          );
        })}

        {/* Total label */}
        <text
          x={width / 2}
          y={height - 18}
          textAnchor="middle"
          className="fill-current text-xs"
        >
          d<tspan baselineShift="sub" fontSize="8">total</tspan> = d
          <tspan baselineShift="sub" fontSize="8">proc</tspan> + d
          <tspan baselineShift="sub" fontSize="8">kø</tspan> + d
          <tspan baselineShift="sub" fontSize="8">trans</tspan> + d
          <tspan baselineShift="sub" fontSize="8">prop</tspan>
        </text>
      </svg>
      <figcaption className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
        De fire forsinkelses-komponentene på én lenke i en pakkesvitsjet rute.
      </figcaption>
    </figure>
  );
}
