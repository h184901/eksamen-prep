// Stabel (LIFO) vs kø (FIFO) — egen SVG-figur, ikke hentet fra læreboka.

const box = {
  fill: "#06b6d4",
  fillOpacity: 0.18,
  stroke: "#0891b2",
  strokeWidth: 1.5,
  rx: 4,
};

function ArrowDef({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

export default function StackQueueDiagram() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {/* Stabel */}
      <div>
        <svg
          viewBox="0 0 220 170"
          role="img"
          aria-label="Stabel: push og pop skjer i samme ende (toppen) — sist inn, først ut"
          className="w-full max-w-[15rem] text-neutral-500 dark:text-neutral-400"
        >
          <ArrowDef id="sq-arrow-s" />
          {/* elementer nedenfra og opp */}
          <rect x="70" y="120" width="80" height="26" {...box} />
          <rect x="70" y="90" width="80" height="26" {...box} />
          <rect x="70" y="60" width="80" height="26" {...box} />
          <text x="110" y="137" fontSize="12" textAnchor="middle" fill="currentColor" className="font-mono">8</text>
          <text x="110" y="107" fontSize="12" textAnchor="middle" fill="currentColor" className="font-mono">17</text>
          <text x="110" y="77" fontSize="12" textAnchor="middle" fill="currentColor" className="font-mono">42</text>
          {/* push/pop ved toppen */}
          <line x1="88" y1="18" x2="88" y2="52" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#sq-arrow-s)" />
          <line x1="132" y1="52" x2="132" y2="18" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#sq-arrow-s)" />
          <text x="84" y="12" fontSize="11" textAnchor="end" fill="currentColor" className="font-mono">push()</text>
          <text x="136" y="12" fontSize="11" fill="currentColor" className="font-mono">pop()</text>
          <text x="158" y="77" fontSize="10" fill="currentColor">← topp</text>
          <line x1="60" y1="150" x2="160" y2="150" stroke="currentColor" strokeWidth="2" />
        </svg>
        <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
          <strong>Stabel — LIFO:</strong> sist inn, først ut. Alt skjer i toppen.
        </p>
      </div>
      {/* Kø */}
      <div>
        <svg
          viewBox="0 0 260 170"
          role="img"
          aria-label="Kø: enqueue legger til bak, dequeue tar ut foran — først inn, først ut"
          className="w-full max-w-[17rem] text-neutral-500 dark:text-neutral-400"
        >
          <ArrowDef id="sq-arrow-q" />
          <rect x="55" y="72" width="44" height="28" {...box} />
          <rect x="103" y="72" width="44" height="28" {...box} />
          <rect x="151" y="72" width="44" height="28" {...box} />
          <text x="77" y="90" fontSize="12" textAnchor="middle" fill="currentColor" className="font-mono">4</text>
          <text x="125" y="90" fontSize="12" textAnchor="middle" fill="currentColor" className="font-mono">9</text>
          <text x="173" y="90" fontSize="12" textAnchor="middle" fill="currentColor" className="font-mono">1</text>
          {/* inn bak, ut foran */}
          <line x1="238" y1="86" x2="202" y2="86" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#sq-arrow-q)" />
          <line x1="48" y1="86" x2="14" y2="86" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#sq-arrow-q)" />
          <text x="240" y="68" fontSize="11" textAnchor="end" fill="currentColor" className="font-mono">enqueue()</text>
          <text x="10" y="68" fontSize="11" fill="currentColor" className="font-mono">dequeue()</text>
          <text x="77" y="122" fontSize="10" textAnchor="middle" fill="currentColor">foran</text>
          <text x="173" y="122" fontSize="10" textAnchor="middle" fill="currentColor">bak</text>
        </svg>
        <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
          <strong>Kø — FIFO:</strong> først inn, først ut. Inn bak, ut foran.
        </p>
      </div>
    </div>
  );
}
