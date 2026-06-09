// Binærtre, maks-heap og graf side om side — egen SVG-figur, ikke fra læreboka.

const NODE_R = 13;

function Node({ x, y, label, accent = false }: { x: number; y: number; label: string; accent?: boolean }) {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={NODE_R}
        fill={accent ? "#06b6d4" : "#06b6d4"}
        fillOpacity={accent ? 0.45 : 0.15}
        stroke="#0891b2"
        strokeWidth="1.5"
      />
      <text x={x} y={y + 4} fontSize="11" textAnchor="middle" fill="currentColor" className="font-mono">
        {label}
      </text>
    </>
  );
}

function Edge({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.3" />;
}

export default function TreeHeapGraphDiagram() {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      <div>
        <svg
          viewBox="0 0 180 150"
          role="img"
          aria-label="Binært søketre: venstre barn mindre enn rota, høyre barn større"
          className="w-full max-w-[12rem] text-neutral-500 dark:text-neutral-400"
        >
          <Edge x1={90} y1={30} x2={50} y2={75} />
          <Edge x1={90} y1={30} x2={130} y2={75} />
          <Edge x1={50} y1={75} x2={28} y2={120} />
          <Edge x1={50} y1={75} x2={72} y2={120} />
          <Edge x1={130} y1={75} x2={152} y2={120} />
          <Node x={90} y={30} label="50" accent />
          <Node x={50} y={75} label="30" />
          <Node x={130} y={75} label="70" />
          <Node x={28} y={120} label="20" />
          <Node x={72} y={120} label="40" />
          <Node x={152} y={120} label="90" />
        </svg>
        <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
          <strong>BST:</strong> venstre &lt; rot &lt; høyre — søk følger én gren.
        </p>
      </div>
      <div>
        <svg
          viewBox="0 0 180 150"
          role="img"
          aria-label="Maks-heap: hver forelder er større enn eller lik barna; roten er størst"
          className="w-full max-w-[12rem] text-neutral-500 dark:text-neutral-400"
        >
          <Edge x1={90} y1={30} x2={50} y2={75} />
          <Edge x1={90} y1={30} x2={130} y2={75} />
          <Edge x1={50} y1={75} x2={28} y2={120} />
          <Edge x1={50} y1={75} x2={72} y2={120} />
          <Node x={90} y={30} label="90" accent />
          <Node x={50} y={75} label="70" />
          <Node x={130} y={75} label="80" />
          <Node x={28} y={120} label="30" />
          <Node x={72} y={120} label="20" />
        </svg>
        <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
          <strong>Maks-heap:</strong> forelder ≥ barn — roten er alltid størst.
        </p>
      </div>
      <div>
        <svg
          viewBox="0 0 180 150"
          role="img"
          aria-label="Urettet graf med fem noder og seks kanter"
          className="w-full max-w-[12rem] text-neutral-500 dark:text-neutral-400"
        >
          <Edge x1={40} y1={40} x2={130} y2={30} />
          <Edge x1={40} y1={40} x2={30} y2={110} />
          <Edge x1={130} y1={30} x2={150} y2={95} />
          <Edge x1={30} y1={110} x2={90} y2={130} />
          <Edge x1={90} y1={130} x2={150} y2={95} />
          <Edge x1={40} y1={40} x2={150} y2={95} />
          <Node x={40} y={40} label="A" />
          <Node x={130} y={30} label="B" />
          <Node x={150} y={95} label="C" accent />
          <Node x={30} y={110} label="D" />
          <Node x={90} y={130} label="E" />
        </svg>
        <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
          <strong>Graf:</strong> noder + kanter — relasjoner uten hierarki.
        </p>
      </div>
    </div>
  );
}
