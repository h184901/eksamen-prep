// Hashing med kollisjon (separate chaining) — egen SVG-figur, ikke fra læreboka.

const bucket = {
  fill: "#06b6d4",
  fillOpacity: 0.12,
  stroke: "#0891b2",
  strokeWidth: 1.3,
  rx: 3,
};

const chainBox = {
  fill: "#06b6d4",
  fillOpacity: 0.3,
  stroke: "#0891b2",
  strokeWidth: 1.3,
  rx: 4,
};

export default function HashingCollisionDiagram() {
  const rows = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div>
      <svg
        viewBox="0 0 360 210"
        role="img"
        aria-label="To nøkler hashes til samme bøtte (indeks 2) og lenkes sammen — separate chaining"
        className="w-full max-w-xl text-neutral-500 dark:text-neutral-400"
      >
        <defs>
          <marker id="hash-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
          </marker>
        </defs>

        {/* nøkler */}
        <text x="14" y="40" fontSize="12" fill="currentColor" className="font-mono">&quot;ola&quot;</text>
        <text x="14" y="105" fontSize="12" fill="currentColor" className="font-mono">&quot;per&quot;</text>
        <text x="14" y="170" fontSize="12" fill="currentColor" className="font-mono">&quot;kari&quot;</text>

        {/* hash-funksjonen */}
        <rect x="70" y="85" width="74" height="32" fill="none" stroke="currentColor" strokeWidth="1.3" rx="6" />
        <text x="107" y="105" fontSize="11" textAnchor="middle" fill="currentColor" className="font-mono">hash(k) % 7</text>

        <line x1="48" y1="36" x2="76" y2="88" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <line x1="50" y1="101" x2="66" y2="101" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <line x1="52" y1="166" x2="78" y2="114" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />

        {/* piler til bøtter: ola→2, per→2 (kollisjon), kari→5 */}
        <line x1="148" y1="92" x2="186" y2="69" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <line x1="148" y1="100" x2="186" y2="74" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <line x1="148" y1="110" x2="186" y2="148" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />

        {/* bøttetabellen 0..6 */}
        {rows.map((i) => (
          <g key={i}>
            <rect x="190" y={14 + i * 26} width="34" height="22" {...bucket} />
            <text x="182" y={29 + i * 26} fontSize="10" textAnchor="end" fill="currentColor" className="font-mono">
              {i}
            </text>
          </g>
        ))}

        {/* kjede fra bøtte 2: [ola] → [per] */}
        <line x1="224" y1="77" x2="248" y2="77" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <rect x="250" y="64" width="44" height="24" {...chainBox} />
        <text x="272" y="80" fontSize="11" textAnchor="middle" fill="currentColor" className="font-mono">ola</text>
        <line x1="294" y1="77" x2="312" y2="77" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <rect x="314" y="64" width="44" height="24" {...chainBox} />
        <text x="336" y="80" fontSize="11" textAnchor="middle" fill="currentColor" className="font-mono">per</text>

        {/* kjede fra bøtte 5: [kari] */}
        <line x1="224" y1="155" x2="248" y2="155" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#hash-arrow)" />
        <rect x="250" y="142" width="44" height="24" {...chainBox} />
        <text x="272" y="158" fontSize="11" textAnchor="middle" fill="currentColor" className="font-mono">kari</text>

        <text x="250" y="104" fontSize="10" fill="currentColor">kollisjon → lenket liste</text>
      </svg>
      <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
        <strong>Separate chaining:</strong> nøkler som hashes til samme indeks lenkes
        sammen i bøtta. Med god hashfunksjon og lav load factor blir kjedene korte.
      </p>
    </div>
  );
}
