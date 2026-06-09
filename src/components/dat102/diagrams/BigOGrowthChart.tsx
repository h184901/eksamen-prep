// Vekstkurver for de vanligste kompleksitetsklassene i DAT102.
// Egen SVG-figur, beregnet deterministisk — ikke hentet fra læreboka.

const W = 360;
const H = 210;
const X0 = 42; // venstre akse
const Y0 = 180; // bunnakse
const XMAX = 344;
const YTOP = 16;
const N_MAX = 32; // x-aksen: n = 1..32
const V_MAX = 36; // y-aksen klippes her (n² og n·log n forlater toppen)

function toX(n: number): number {
  return X0 + ((n - 1) / (N_MAX - 1)) * (XMAX - X0);
}
function toY(v: number): number {
  return Y0 - (Math.min(v, V_MAX) / V_MAX) * (Y0 - YTOP);
}

// Bygger en polyline-streng for f(n); stopper når kurven har forlatt toppen.
function curve(f: (n: number) => number): string {
  const pts: string[] = [];
  for (let n = 1; n <= N_MAX; n += 0.5) {
    const v = f(n);
    pts.push(`${toX(n).toFixed(1)},${toY(v).toFixed(1)}`);
    if (v > V_MAX) break;
  }
  return pts.join(" ");
}

const CURVES: { label: string; color: string; points: string }[] = [
  { label: "O(n²)", color: "#ef4444", points: curve((n) => (n * n) / 8) },
  { label: "O(n log n)", color: "#f59e0b", points: curve((n) => (n * Math.log2(n)) / 4) },
  { label: "O(n)", color: "#3b82f6", points: curve((n) => n) },
  { label: "O(log n)", color: "#0d9488", points: curve((n) => Math.log2(n) * 3) },
  { label: "O(1)", color: "#10b981", points: curve(() => 2) },
];

export default function BigOGrowthChart() {
  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Vekstkurver: O(1), O(log n), O(n), O(n log n) og O(n²) som funksjon av n"
        className="w-full max-w-xl text-neutral-400 dark:text-neutral-500"
      >
        {/* akser */}
        <line x1={X0} y1={YTOP} x2={X0} y2={Y0} stroke="currentColor" strokeWidth="1" />
        <line x1={X0} y1={Y0} x2={XMAX} y2={Y0} stroke="currentColor" strokeWidth="1" />
        <text x={XMAX - 4} y={Y0 + 16} fontSize="11" fill="currentColor" textAnchor="end">
          problemstørrelse n →
        </text>
        <text
          x={X0 - 28}
          y={YTOP + 4}
          fontSize="11"
          fill="currentColor"
          transform={`rotate(-90 ${X0 - 28} ${YTOP + 4})`}
          textAnchor="end"
        >
          tid →
        </text>
        {CURVES.map((c) => (
          <polyline
            key={c.label}
            points={c.points}
            fill="none"
            stroke={c.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-700 dark:text-neutral-200">
        {[...CURVES].reverse().map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block w-3 h-[3px] rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <span className="font-mono">{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
