// Pedagogical illustration: TCP/IP-modellen vs. OSI-modellen.
// Self-drawn SVG, theme-aware via currentColor + dark: classes.
// Not derived from any textbook figure.

const osiLayers = [
  { n: 7, name: "Application" },
  { n: 6, name: "Presentation" },
  { n: 5, name: "Session" },
  { n: 4, name: "Transport" },
  { n: 3, name: "Network" },
  { n: 2, name: "Data link" },
  { n: 1, name: "Physical" },
];

// TCP/IP layers mapped onto OSI groups (top-down: rows aligned).
// Application spans OSI 5–7, Transport = 4, Internet = 3, Link = 1–2.
const tcpipBands = [
  { name: "Application", from: 0, to: 2 }, // OSI rows 7,6,5
  { name: "Transport", from: 3, to: 3 }, // OSI row 4
  { name: "Internet", from: 4, to: 4 }, // OSI row 3
  { name: "Link", from: 5, to: 6 }, // OSI rows 2,1
];

export default function TcpIpVsOsiDiagram() {
  const rowH = 38;
  const top = 56;
  const osiX = 40;
  const osiW = 200;
  const tcpX = 280;
  const tcpW = 200;
  const height = top + osiLayers.length * rowH + 30;
  const width = 520;

  return (
    <figure className="my-6 not-prose">
      <svg
        role="img"
        aria-labelledby="diag-tcpip-osi-title diag-tcpip-osi-desc"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto text-neutral-800 dark:text-neutral-100"
      >
        <title id="diag-tcpip-osi-title">
          Sammenligning av OSI-modellen og TCP/IP-modellen
        </title>
        <desc id="diag-tcpip-osi-desc">
          To kolonner side om side. Venstre kolonne viser OSI sine syv lag fra
          Application øverst til Physical nederst. Høyre kolonne viser TCP/IP
          sine fire lag: Application dekker OSI-lagene 5 til 7, Transport svarer
          til OSI-lag 4, Internet svarer til OSI-lag 3, og Link dekker OSI-lag 1
          og 2.
        </desc>

        {/* Column headings */}
        <text
          x={osiX + osiW / 2}
          y={28}
          textAnchor="middle"
          className="fill-current text-sm font-semibold"
        >
          OSI (7 lag)
        </text>
        <text
          x={tcpX + tcpW / 2}
          y={28}
          textAnchor="middle"
          className="fill-current text-sm font-semibold"
        >
          TCP/IP (4 lag)
        </text>

        {/* OSI rows */}
        {osiLayers.map((l, i) => {
          const y = top + i * rowH;
          return (
            <g key={l.n}>
              <rect
                x={osiX}
                y={y}
                width={osiW}
                height={rowH - 4}
                rx={4}
                className="fill-neutral-50 stroke-neutral-400 dark:fill-neutral-900 dark:stroke-neutral-600"
                strokeWidth={1}
              />
              <text
                x={osiX + 12}
                y={y + rowH / 2 - 1}
                dominantBaseline="middle"
                className="fill-current text-xs"
              >
                {l.n}. {l.name}
              </text>
            </g>
          );
        })}

        {/* TCP/IP bands aligned to OSI rows */}
        {tcpipBands.map((b) => {
          const y = top + b.from * rowH;
          const h = (b.to - b.from + 1) * rowH - 4;
          return (
            <g key={b.name}>
              <rect
                x={tcpX}
                y={y}
                width={tcpW}
                height={h}
                rx={4}
                className="fill-blue-50 stroke-blue-500 dark:fill-blue-950/40 dark:stroke-blue-400"
                strokeWidth={1.5}
              />
              <text
                x={tcpX + tcpW / 2}
                y={y + h / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-current text-xs font-medium"
              >
                {b.name}
              </text>
            </g>
          );
        })}

        {/* Bracket connectors: OSI rows that fold into TCP/IP Application + Link */}
        <g
          className="stroke-current"
          strokeWidth={1}
          fill="none"
          opacity={0.55}
        >
          {/* Application bracket: OSI rows 7,6,5 → TCP/IP Application */}
          <path
            d={`M${osiX + osiW + 4} ${top + 2} L${tcpX - 8} ${top + 2} L${tcpX - 8} ${top + 3 * rowH - 4 - 2} L${osiX + osiW + 4} ${top + 3 * rowH - 4 - 2}`}
          />
          {/* Link bracket: OSI rows 2,1 → TCP/IP Link */}
          <path
            d={`M${osiX + osiW + 4} ${top + 5 * rowH + 2} L${tcpX - 8} ${top + 5 * rowH + 2} L${tcpX - 8} ${top + 7 * rowH - 4 - 2} L${osiX + osiW + 4} ${top + 7 * rowH - 4 - 2}`}
          />
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center">
        Lagene i OSI-modellen vs. den praktiske TCP/IP-stakken.
      </figcaption>
    </figure>
  );
}
