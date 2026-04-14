"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";

// ---- Chord-logikk ----
// m=5, identifikatorrom 0..31
const M = 5;
const RING_SIZE = Math.pow(2, M); // 32

function successor(id: number, nodes: number[]): number {
  const sorted = [...nodes].sort((a, b) => a - b);
  for (const n of sorted) {
    if (n >= id) return n;
  }
  return sorted[0]; // wrap-around
}

function fingerTable(node: number, nodes: number[]): { i: number; start: number; succ: number }[] {
  return Array.from({ length: M }, (_, idx) => {
    const i = idx + 1;
    const start = (node + Math.pow(2, i - 1)) % RING_SIZE;
    const succ = successor(start, nodes);
    return { i, start, succ };
  });
}

// Lookup-algoritmen fra professor (chorddht-key-resolution.pdf)
function chordLookup(
  startNode: number,
  key: number,
  nodes: number[]
): { hops: { node: number; succ: number; action: string }[] } {
  const hops: { node: number; succ: number; action: string }[] = [];
  let current = startNode;
  const maxHops = 20;

  for (let attempt = 0; attempt < maxHops; attempt++) {
    const succ = successor(current, nodes);
    // Sjekk om key er i (current, succ] — wrap-around
    const inRange =
      succ >= current
        ? current < key && key <= succ
        : key > current || key <= succ;

    if (inRange) {
      hops.push({ node: current, succ, action: `Suksessor til nøkkel ${key} er node ${succ}. FERDIG!` });
      break;
    }

    // Finn closest preceding node via fingertabell
    const ft = fingerTable(current, nodes);
    let next = current;
    for (let j = M - 1; j >= 0; j--) {
      const f = ft[j].succ;
      const between =
        succ > current
          ? f > current && f < key
          : f > current || f < key;
      if (between) {
        next = f;
        break;
      }
    }
    if (next === current) {
      hops.push({ node: current, succ, action: `Ingen finger mellom ${current} og ${key} → bruker suksessor ${succ}` });
      current = succ;
    } else {
      hops.push({ node: current, succ, action: `finger[i]=${next} er mellom ${current} og ${key} → hopp til ${next}` });
      current = next;
    }
  }
  return { hops };
}

// SVG Chord-ring-komponent
function ChordRing({
  nodes,
  highlightNode,
  lookupKey,
  hops,
}: {
  nodes: number[];
  highlightNode: number | null;
  lookupKey: number | null;
  hops: { node: number }[];
}) {
  const cx = 180, cy = 180, r = 140;

  function posForId(id: number) {
    const angle = (id / RING_SIZE) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  const hopSet = new Set(hops.map(h => h.node));

  return (
    <svg width="360" height="360" viewBox="0 0 360 360" className="max-w-full mx-auto">
      {/* Ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Tikk-merker for alle 32 posisjoner */}
      {Array.from({ length: RING_SIZE }, (_, id) => {
        const p = posForId(id);
        return (
          <circle key={id} cx={p.x} cy={p.y} r="2" fill="#3b82f6" fillOpacity="0.15" />
        );
      })}

      {/* Noder */}
      {nodes.map(n => {
        const p = posForId(n);
        const isHighlight = n === highlightNode;
        const isHop = hopSet.has(n);
        const color = isHighlight ? "#f59e0b" : isHop ? "#10b981" : "#3b82f6";
        return (
          <g key={n}>
            <circle cx={p.x} cy={p.y} r={isHighlight ? 14 : 11}
              fill={color} fillOpacity={isHighlight ? 0.9 : 0.7}
              stroke={color} strokeWidth="2" />
            <text x={p.x} y={p.y + 4} textAnchor="middle"
              fontSize={isHighlight ? "10" : "9"} fill="white" fontWeight="bold">{n}</text>
          </g>
        );
      })}

      {/* Nøkkel-posisjon */}
      {lookupKey !== null && (
        (() => {
          const p = posForId(lookupKey);
          return (
            <g>
              <circle cx={p.x} cy={p.y} r="8" fill="#ef4444" fillOpacity="0.8" stroke="#ef4444" strokeWidth="2" />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">k{lookupKey}</text>
            </g>
          );
        })()
      )}

      {/* Forklaring */}
      <g>
        <circle cx="15" cy="325" r="7" fill="#3b82f6" fillOpacity="0.7" />
        <text x="26" y="329" fontSize="10" fill="currentColor">Node</text>
        <circle cx="75" cy="325" r="7" fill="#f59e0b" fillOpacity="0.9" />
        <text x="86" y="329" fontSize="10" fill="currentColor">Startnode</text>
        <circle cx="155" cy="325" r="7" fill="#10b981" fillOpacity="0.7" />
        <text x="166" y="329" fontSize="10" fill="currentColor">Hopp</text>
        <circle cx="215" cy="325" r="7" fill="#ef4444" fillOpacity="0.8" />
        <text x="226" y="329" fontSize="10" fill="currentColor">Nøkkel</text>
      </g>
    </svg>
  );
}

// ---- EKSEMPEL-noder (fra eksamensoppgaver) ----
const EXAM_NODES_2025 = [3, 12, 21, 31]; // Jan 2025: m=5, noder {3,12,21,31}
const EXAM_NODES_2024 = [0, 9, 17, 30]; // Mai 2024: m=5, noder {0,9,17,30}
const EXAM_NODES_2024B = [1, 5, 10, 15, 20, 29]; // Jan 2024: m=5, noder {1,5,10,15,20,29}
const EXAM_NODES_2023 = [3, 9, 10, 17, 25, 31]; // Mai 2023: m=5, noder {3,9,10,17,25,31}
const EXAM_NODES_2022 = [1, 7, 15, 19, 29]; // Mai 2022: m=5, noder {1,7,15,19,29}

// ---- Beregn nøkkelansvar ----
function keyResponsibility(nodes: number[]): { node: number; keys: number[] }[] {
  const sorted = [...nodes].sort((a, b) => a - b);
  return sorted.map((n, idx) => {
    const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
    const keys: number[] = [];
    for (let k = 0; k < RING_SIZE; k++) {
      if (sorted.length === 1 || (prev < n ? k > prev && k <= n : k > prev || k <= n)) {
        keys.push(k);
      }
    }
    return { node: n, keys };
  });
}

export default function DS6_3Page() {
  // Interaktiv state
  const [selectedNodeSet, setSelectedNodeSet] = useState<"2025" | "2024" | "2024b" | "2023" | "2022" | "custom">("2025");
  const [customNodes, setCustomNodes] = useState("3,12,21,31");
  const [selectedNode, setSelectedNode] = useState<number>(3);
  const [lookupKey, setLookupKey] = useState<number>(15);
  const [lookupStep, setLookupStep] = useState<number>(-1);
  const [showFingerTable, setShowFingerTable] = useState(true);
  const [showKeyResp, setShowKeyResp] = useState(false);
  const [examTab, setExamTab] = useState<"2025" | "2024" | "2024b" | "2023" | "2022">("2025");

  // Aktive noder
  const nodeSetMap: Record<string, number[]> = {
    "2025": EXAM_NODES_2025,
    "2024": EXAM_NODES_2024,
    "2024b": EXAM_NODES_2024B,
    "2023": EXAM_NODES_2023,
    "2022": EXAM_NODES_2022,
  };

  const activeNodes: number[] =
    selectedNodeSet === "custom"
      ? customNodes.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 0 && n < RING_SIZE)
      : nodeSetMap[selectedNodeSet];

  const ft = fingerTable(selectedNode, activeNodes);
  const { hops } = chordLookup(selectedNode, lookupKey, activeNodes);
  const displayHops = lookupStep === -1 ? [] : hops.slice(0, lookupStep + 1);
  const keyResp = keyResponsibility(activeNodes);

  const handleRunLookup = useCallback(() => {
    setLookupStep(0);
  }, []);

  // Eksamens-eksempler fullstendig gjennomgått
  const examExamples = {
    "2025": {
      title: "Eksamen januar 2025 — m=5, noder {3, 12, 21, 31}",
      nodes: [3, 12, 21, 31],
      fingerTables: [
        {
          node: 3,
          table: [
            { i: 1, start: 4, succ: 12 },
            { i: 2, start: 5, succ: 12 },
            { i: 3, start: 7, succ: 12 },
            { i: 4, start: 11, succ: 12 },
            { i: 5, start: 19, succ: 21 },
          ],
        },
        {
          node: 12,
          table: [
            { i: 1, start: 13, succ: 21 },
            { i: 2, start: 14, succ: 21 },
            { i: 3, start: 16, succ: 21 },
            { i: 4, start: 20, succ: 21 },
            { i: 5, start: 28, succ: 31 },
          ],
        },
        {
          node: 21,
          table: [
            { i: 1, start: 22, succ: 31 },
            { i: 2, start: 23, succ: 31 },
            { i: 3, start: 25, succ: 31 },
            { i: 4, start: 29, succ: 31 },
            { i: 5, start: 5, succ: 12 },
          ],
        },
        {
          node: 31,
          table: [
            { i: 1, start: 0, succ: 3 },
            { i: 2, start: 1, succ: 3 },
            { i: 3, start: 3, succ: 3 },
            { i: 4, start: 7, succ: 12 },
            { i: 5, start: 15, succ: 21 },
          ],
        },
      ],
      keyQuestion: "Nøkler {6, 9, 15, 29} — hvilke noder er ansvarlige?",
      keyAnswers: [
        { key: 6, resp: 12, reason: "6 > 3 og 6 ≤ 12 → succ(6) = 12" },
        { key: 9, resp: 12, reason: "9 > 3 og 9 ≤ 12 → succ(9) = 12" },
        { key: 15, resp: 21, reason: "15 > 12 og 15 ≤ 21 → succ(15) = 21" },
        { key: 29, resp: 31, reason: "29 > 21 og 29 ≤ 31 → succ(29) = 31" },
      ],
      lookupQuestion: "Løs nøkkel=15 fra node 31",
      lookupSteps: [
        "Node 31, succ(31)=3. Er 31 < 15 ≤ 3? (med wrap-around: 15 > 31 eller 15 ≤ 3?) → NEI. Gå til steg 2.",
        "Sjekk fingertabell fra høyest index: finger[5]=21. Er 31 < 21 < 15 (wrap)? 21 > 31 ELLER 21 < 15? → NEI (21 er ikke < 15). Prøv finger[4]=12. Er 12 > 31 ELLER 12 < 15? → JA (12 < 15). Hopp til node 12.",
        "Node 12, succ(12)=21. Er 12 < 15 ≤ 21? → JA! Suksessor er node 21. SVAR: Node 21 er ansvarlig for nøkkel 15.",
      ],
    },
    "2024": {
      title: "Eksamen mai 2024 — m=5, noder {0, 9, 17, 30}",
      nodes: [0, 9, 17, 30],
      fingerTables: [
        {
          node: 0,
          table: [
            { i: 1, start: 1, succ: 9 },
            { i: 2, start: 2, succ: 9 },
            { i: 3, start: 4, succ: 9 },
            { i: 4, start: 8, succ: 9 },
            { i: 5, start: 16, succ: 17 },
          ],
        },
        {
          node: 9,
          table: [
            { i: 1, start: 10, succ: 17 },
            { i: 2, start: 11, succ: 17 },
            { i: 3, start: 13, succ: 17 },
            { i: 4, start: 17, succ: 17 },
            { i: 5, start: 25, succ: 30 },
          ],
        },
        {
          node: 17,
          table: [
            { i: 1, start: 18, succ: 30 },
            { i: 2, start: 19, succ: 30 },
            { i: 3, start: 21, succ: 30 },
            { i: 4, start: 25, succ: 30 },
            { i: 5, start: 1, succ: 9 },
          ],
        },
        {
          node: 30,
          table: [
            { i: 1, start: 31, succ: 0 },
            { i: 2, start: 0, succ: 0 },
            { i: 3, start: 2, succ: 9 },
            { i: 4, start: 6, succ: 9 },
            { i: 5, start: 14, succ: 17 },
          ],
        },
      ],
      keyQuestion: "Nøkler {2, 5, 19, 30} — hvilke noder er ansvarlige?",
      keyAnswers: [
        { key: 2, resp: 9, reason: "2 > 0 og 2 ≤ 9 → succ(2) = 9" },
        { key: 5, resp: 9, reason: "5 > 0 og 5 ≤ 9 → succ(5) = 9" },
        { key: 19, resp: 30, reason: "19 > 17 og 19 ≤ 30 → succ(19) = 30" },
        { key: 30, resp: 30, reason: "30 = 30 → succ(30) = 30" },
      ],
      lookupQuestion: "Løs nøkkel=12 fra node 0",
      lookupSteps: [
        "Node 0, succ(0)=9. Er 0 < 12 ≤ 9? → NEI (12 > 9). Gå til steg 2.",
        "Fingertabell node 0: sjekk fra høyest: finger[5]=17. Er 0 < 17 < 12? → NEI (17 > 12). finger[4]=9. Er 0 < 9 < 12? → JA! Hopp til node 9.",
        "Node 9, succ(9)=17. Er 9 < 12 ≤ 17? → JA! Suksessor er node 17. SVAR: Node 17 er ansvarlig for nøkkel 12.",
      ],
    },
    "2024b": {
      title: "Eksamen januar 2024 — m=5, noder {1, 5, 10, 15, 20, 29}",
      nodes: [1, 5, 10, 15, 20, 29],
      fingerTables: [
        {
          node: 1,
          table: [
            { i: 1, start: 2, succ: 5 },
            { i: 2, start: 3, succ: 5 },
            { i: 3, start: 5, succ: 5 },
            { i: 4, start: 9, succ: 10 },
            { i: 5, start: 17, succ: 20 },
          ],
        },
        {
          node: 5,
          table: [
            { i: 1, start: 6, succ: 10 },
            { i: 2, start: 7, succ: 10 },
            { i: 3, start: 9, succ: 10 },
            { i: 4, start: 13, succ: 15 },
            { i: 5, start: 21, succ: 29 },
          ],
        },
        {
          node: 10,
          table: [
            { i: 1, start: 11, succ: 15 },
            { i: 2, start: 12, succ: 15 },
            { i: 3, start: 14, succ: 15 },
            { i: 4, start: 18, succ: 20 },
            { i: 5, start: 26, succ: 29 },
          ],
        },
        {
          node: 15,
          table: [
            { i: 1, start: 16, succ: 20 },
            { i: 2, start: 17, succ: 20 },
            { i: 3, start: 19, succ: 20 },
            { i: 4, start: 23, succ: 29 },
            { i: 5, start: 31, succ: 1 },
          ],
        },
      ],
      keyQuestion: "Nøkler {5, 14, 20, 25} — hvilke noder er ansvarlige?",
      keyAnswers: [
        { key: 5, resp: 5, reason: "succ(5) = 5 (noden finnes)" },
        { key: 14, resp: 15, reason: "14 > 10 og 14 ≤ 15 → succ(14) = 15" },
        { key: 20, resp: 20, reason: "succ(20) = 20 (noden finnes)" },
        { key: 25, resp: 29, reason: "25 > 20 og 25 ≤ 29 → succ(25) = 29" },
      ],
      lookupQuestion: "Løs nøkkel=18 fra node 1",
      lookupSteps: [
        "Node 1, succ(1)=5. Er 1 < 18 ≤ 5? → NEI. Sjekk fingertabell.",
        "Finger[5]=20. Er 1 < 20 < 18? → NEI (20 > 18). Finger[4]=10. Er 1 < 10 < 18? → JA! Hopp til node 10.",
        "Node 10, succ(10)=15. Er 10 < 18 ≤ 15? → NEI. Finger[4]=20. Er 10 < 20 < 18? → NEI. Finger[3]=15. Er 10 < 15 < 18? → JA! Hopp til node 15.",
        "Node 15, succ(15)=20. Er 15 < 18 ≤ 20? → JA! SVAR: Node 20 er ansvarlig for nøkkel 18.",
      ],
    },
    "2023": {
      title: "Eksamen mai 2023 — m=5, noder {3, 9, 10, 17, 25, 31}",
      nodes: [3, 9, 10, 17, 25, 31],
      fingerTables: [],
      keyQuestion: "Nøkler {2, 11, 15, 18} — hvilke noder er ansvarlige?",
      keyAnswers: [
        { key: 2, resp: 3, reason: "2 > 31 (wrap) ELLER 2 ≤ 3 → succ(2) = 3" },
        { key: 11, resp: 17, reason: "11 > 10 og 11 ≤ 17 → succ(11) = 17" },
        { key: 15, resp: 17, reason: "15 > 10 og 15 ≤ 17 → succ(15) = 17" },
        { key: 18, resp: 25, reason: "18 > 17 og 18 ≤ 25 → succ(18) = 25" },
      ],
      lookupQuestion: "Løs nøkkel=18 fra node 31",
      lookupSteps: [
        "Node 31, succ(31)=3. Er 31 < 18 ≤ 3 (wrap)? 18 > 31? NEI. 18 ≤ 3? NEI. → Gå til fingertabell.",
        "Node 31 finger[5]=succ((31+16)%32)=succ(15)=17. Er 31 < 17 < 18 (wrap)? 17 > 31? NEI. 17 < 18? JA! Hopp til node 17.",
        "Node 17, succ(17)=25. Er 17 < 18 ≤ 25? → JA! SVAR: Node 25 er ansvarlig for nøkkel 18.",
      ],
    },
    "2022": {
      title: "Eksamen mai 2022 — m=5, noder {1, 7, 15, 19, 29}",
      nodes: [1, 7, 15, 19, 29],
      fingerTables: [],
      keyQuestion: "Nøkler {1, 12, 17, 20, 31} — hvilke noder er ansvarlige?",
      keyAnswers: [
        { key: 1, resp: 1, reason: "succ(1) = 1 (noden finnes)" },
        { key: 12, resp: 15, reason: "12 > 7 og 12 ≤ 15 → succ(12) = 15" },
        { key: 17, resp: 19, reason: "17 > 15 og 17 ≤ 19 → succ(17) = 19" },
        { key: 20, resp: 29, reason: "20 > 19 og 20 ≤ 29 → succ(20) = 29" },
        { key: 31, resp: 1, reason: "31 > 29 (wrap) → succ(31) = 1" },
      ],
      lookupQuestion: "Løs nøkkel=17 fra node 7 / nøkkel=12 fra node 15",
      lookupSteps: [
        "k=17, start node 7. succ(7)=15. Er 7 < 17 ≤ 15? → NEI. Fingertabell node 7: finger[4]=succ(7+8)=succ(15)=15. Er 7<15<17? JA → hopp til 15.",
        "Node 15, succ(15)=19. Er 15 < 17 ≤ 19? → JA! SVAR: Node 19 er ansvarlig for nøkkel 17.",
        "k=12, start node 15. succ(15)=19. Er 15 < 12 ≤ 19? → NEI (12 < 15). Fingertabell node 15: sjekk bakover. finger[1]=succ(16)=19... alle fingre peker fremover. Ingen finger er mellom 15 og 12 (wrap). Hopp til succ(15)=19?  Nei — gå bakover: prøv node 7 via finger[3]=succ(15+4)=succ(19)=19, finger[2]=succ(17)=19, finger[1]=succ(16)=19 — alle 19. Men 19 > 12. Korrekt oppslag: Node 7 er mellom 1 og 15. Fra node 1: finger→7→... Korrekt svar: succ(12) = 15. Node 15 er ansvarlig.",
      ],
    },
  };

  const currentExam = examExamples[examTab];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.3 DHT og Chord</span>
      </div>

      {/* Eksamensbanner */}
      <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm">
        <p className="font-bold text-red-700 dark:text-red-400 mb-1">EKSAMENS-MEGASIDE — Oppgave 10 (15%)</p>
        <p className="text-red-600 dark:text-red-300">
          Oppgave 10 er den tyngste enkeltoppgaven på eksamen og handler ALLTID om Chord/DHT.
          Den er verd 15% av totalkarakteren. Du MÅ mestre fingertabeller og nøkkeloppslag.
        </p>
      </div>

      <h1 className="text-2xl font-bold">6.3 DHT og Chord</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Chord er en distribuert hashtabell (DHT) bygget på en ring-topologi. Noder og nøkler deler et
        felles identifikatorrom (0 til 2^m - 1). En fingertabell gir hvert node O(log N) hopp til å finne
        hvilken node som er ansvarlig for en nøkkel.
      </p>

      {/* DHT – grunnlag */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hva er en DHT?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Sentralisert (Napster)", complexity: "O(N)", desc: "Én sentral server har alle mappings. Single point of failure.", color: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800" },
            { title: "Flooding (Gnutella)", complexity: "O(N²)", desc: "Spørringen sendes til alle noder. Sløser mye båndbredde.", color: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" },
            { title: "DHT (Chord)", complexity: "O(log N)", desc: "Strukturert P2P. Nøkler hashkodes og lagres distribuert.", color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" },
          ].map(({ title, complexity, desc, color }) => (
            <div key={title} className={`rounded-lg border p-4 ${color}`}>
              <p className="font-semibold text-sm mb-1">{title}</p>
              <p className="text-2xl font-bold text-center my-2">{complexity}</p>
              <p className="text-xs text-[var(--muted)]">{desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm">
          <p className="font-semibold mb-1">Hva brukes DHT til?</p>
          <ul className="list-disc list-inside space-y-1 text-[var(--foreground)]">
            <li><strong>BitTorrent:</strong> Desentralisert torrent-tracker — nøkkel=hash(innhold), verdi=peers med filen</li>
            <li><strong>Cooperative mirroring:</strong> Innholdsleverandører samarbeider om å lagre og tjene hverandres data</li>
            <li><strong>Distribuerte databaser:</strong> Cassandra bruker DHT-prinsipp for å fordele data-blokker</li>
          </ul>
        </div>
      </section>

      {/* Chord-ringen */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Chord-ringen</h2>
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 space-y-3">
          <ul className="text-sm space-y-2 text-[var(--foreground)]">
            <li><strong>m-bits identifikatorrom:</strong> Posisjonene 0, 1, 2, ..., 2^m - 1 plasseres på en ring</li>
            <li><strong>m = 5 på eksamen</strong> → 32 posisjoner (0 til 31)</li>
            <li><strong>Noder:</strong> P2P-prosesser (tjener-replika) tar posisjoner i ringen via hash(IP + port)</li>
            <li><strong>Nøkler:</strong> Datafiler hashes til nøkler i samme rom — key = hash(filnavn)</li>
            <li><strong>Nøkkelansvar:</strong> Nøkkel k lagres hos den første noden med ID ≥ k (med wrap-around)</li>
          </ul>

          <FormulaBox
            latex="\text{successor}(k) = \min\{n \in N \mid n \geq k \pmod{2^m}\}"
            title="Nøkkelansvar — formelt"
            variant="blue"
            description="Nøkkel k er ansvaret til den første noden n i ringen slik at n ≥ k (modulo 2^m, med wrap-around)"
          />

          <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksempel — noder {"{"}3, 12, 21, 31{"}"}, m=5:</p>
            <ul className="list-disc list-inside space-y-0.5 text-[var(--foreground)]">
              <li>Node 3 er ansvarlig for nøkler: 32 (=0), 1, 2, 3 → dvs. k der {"{"} 31 {"<"} k ≤ 3 {"}"}</li>
              <li>Node 12 er ansvarlig for nøkler: 4, 5, 6, 7, 8, 9, 10, 11, 12</li>
              <li>Node 21 er ansvarlig for nøkler: 13, 14, 15, 16, 17, 18, 19, 20, 21</li>
              <li>Node 31 er ansvarlig for nøkler: 22, 23, 24, 25, 26, 27, 28, 29, 30, 31</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fingertabellen */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Fingertabellen — nøkkelen til O(log N)</h2>
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 space-y-3">
          <p className="text-sm text-[var(--foreground)]">
            Uten fingertabellen måtte en node sjekke suksessor → suksessor → ... (O(N) hopp).
            Fingertabellen lagrer &quot;snarvei-pekere&quot; til noder som er 2^0, 2^1, 2^2, ..., 2^(m-1) steg unna — og gir O(log N) hopp.
          </p>

          <FormulaBox
            latex="\text{finger}[i] = \text{successor}\!\left((n + 2^{i-1}) \bmod 2^m\right), \quad i = 1, 2, \ldots, m"
            title="Fingertabell-formel — LÆR DENNE UTENAT"
            variant="blue"
            description="n = nodens ID, i = radnummer (1 til m), m = antall bits (vanligvis 5 på eksamen)"
          />

          <div className="overflow-x-auto">
            <p className="text-sm font-semibold mb-1">Eksempel: Fingertabell for node n=3, m=5, noder={"{"}3,12,21,31{"}"}:</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900/40">
                  <th className="border border-blue-200 dark:border-blue-700 px-3 py-1.5 text-left">i</th>
                  <th className="border border-blue-200 dark:border-blue-700 px-3 py-1.5 text-left">Beregning: (3 + 2^(i-1)) mod 32</th>
                  <th className="border border-blue-200 dark:border-blue-700 px-3 py-1.5 text-left">Start</th>
                  <th className="border border-blue-200 dark:border-blue-700 px-3 py-1.5 text-left">finger[i] = succ(start)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { i: 1, calc: "3 + 2^0 = 3 + 1 = 4", start: 4, succ: 12 },
                  { i: 2, calc: "3 + 2^1 = 3 + 2 = 5", start: 5, succ: 12 },
                  { i: 3, calc: "3 + 2^2 = 3 + 4 = 7", start: 7, succ: 12 },
                  { i: 4, calc: "3 + 2^3 = 3 + 8 = 11", start: 11, succ: 12 },
                  { i: 5, calc: "3 + 2^4 = 3 + 16 = 19", start: 19, succ: 21 },
                ].map(({ i, calc, start, succ }) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[var(--card)]" : "bg-blue-50/30 dark:bg-blue-950/10"}>
                    <td className="border border-[var(--card-border)] px-3 py-1.5 font-bold text-blue-600 dark:text-blue-400">{i}</td>
                    <td className="border border-[var(--card-border)] px-3 py-1.5 font-mono text-xs">{calc}</td>
                    <td className="border border-[var(--card-border)] px-3 py-1.5">{start}</td>
                    <td className="border border-[var(--card-border)] px-3 py-1.5 font-bold text-green-600 dark:text-green-400">{succ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Oppslags-algoritmen */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Oppslags-algoritmen</h2>
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 space-y-3">
          <p className="text-sm text-[var(--muted)] mb-2">
            Fra professorens Chord-notater (chorddht-key-resolution.pdf):
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-xs space-y-2">
            <p className="font-bold text-blue-600 dark:text-blue-400">// 1. n.findSuccessor(k)</p>
            <p>if (k ∈ (n, successor])  <span className="text-[var(--muted)]">// dvs. n {"<"} k ≤ successor</span></p>
            <p className="pl-4">return successor</p>
            <p>else</p>
            <p className="pl-4">n{"'"} = closestPrecedingNode(k)</p>
            <p className="pl-4">return n{"'"}.findSuccessor(k)</p>
            <br />
            <p className="font-bold text-blue-600 dark:text-blue-400">// 2. n.closestPrecedingNode(k)</p>
            <p>for i = m downto 1</p>
            <p className="pl-4">if (finger[i] ∈ (n, k))  <span className="text-[var(--muted)]">// dvs. n {"<"} finger[i] {"<"} k</span></p>
            <p className="pl-8">return finger[i]</p>
            <p>return n</p>
          </div>
          <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Wrap-around — viktig!</p>
            <p className="text-[var(--foreground)]">
              Betingelsen &quot;n {"<"} k ≤ successor&quot; må behandles som et set-problem med wrap-around:
              Hvis successor {"<"} n (wrap), er betingelsen sann når k {">"} n ELLER k ≤ successor.
            </p>
          </div>
        </div>
      </section>

      {/* Fullstendig gjennomgått eksempel — fra professor */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Fullstendig gjennomgått eksempel — fra professor (Chord m=5)
        </h2>
        <div className="rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-4 text-sm space-y-2">
          <p className="font-semibold">Oppsett: m=5, noder {"{"} 1, 4, 9, 11, 14, 18, 20, 21, 28 {"}"} — Ring 0..31</p>
          <p>Fingertabell for node 1: succ(1)=4</p>
          <div className="overflow-x-auto">
            <table className="text-xs border-collapse">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-800/40">
                  {["i", "1+2^(i-1) mod 32", "Start", "finger[i]"].map(h => (
                    <th key={h} className="border border-blue-300 dark:border-blue-600 px-3 py-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { i: 1, calc: "1+1=2", start: 2, f: 4 },
                  { i: 2, calc: "1+2=3", start: 3, f: 4 },
                  { i: 3, calc: "1+4=5", start: 5, f: 9 },
                  { i: 4, calc: "1+8=9", start: 9, f: 9 },
                  { i: 5, calc: "1+16=17", start: 17, f: 18 },
                ].map(({ i, calc, start, f }) => (
                  <tr key={i}>
                    <td className="border border-blue-200 dark:border-blue-700 px-3 py-1 font-bold text-blue-600 dark:text-blue-400">{i}</td>
                    <td className="border border-blue-200 dark:border-blue-700 px-3 py-1 font-mono">{calc}</td>
                    <td className="border border-blue-200 dark:border-blue-700 px-3 py-1">{start}</td>
                    <td className="border border-blue-200 dark:border-blue-700 px-3 py-1 font-bold text-green-600 dark:text-green-400">{f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-semibold mt-3">Oppslag: k=26 fra node 1</p>
          <div className="space-y-2">
            {[
              { step: "A. Nåværende node: 1, succ(1)=4", check: "Er 1 < 26 ≤ 4? → NEI (26 > 4). Gå til fingertabell.", result: "" },
              { step: "Sjekk finger fra høyest:", check: "finger[5]=18. Er 1 < 18 < 26? → JA! Hopp til node 18.", result: "→ n=18" },
              { step: "B. Nåværende node: 18, succ(18)=20", check: "Er 18 < 26 ≤ 20? → NEI (26 > 20). Gå til fingertabell.", result: "" },
              { step: "finger[5]=4. Er 18 < 4 < 26? → NEI (wrap problem, 4 < 18).", check: "finger[4]=28. Er 18 < 28 < 26? → NEI (28 > 26).", result: "" },
              { step: "finger[3]=28. NEI. finger[2]=20. Er 18 < 20 < 26? → JA! Hopp til node 20.", check: "", result: "→ n=20" },
              { step: "C. Nåværende node: 20, succ(20)=21", check: "Er 20 < 26 ≤ 21? → NEI (26 > 21). Sjekk finger.", result: "" },
              { step: "finger[1]=21. Er 20 < 21 < 26? → JA! Hopp til node 21.", check: "", result: "→ n=21" },
              { step: "D. Nåværende node: 21, succ(21)=28", check: "Er 21 < 26 ≤ 28? → JA! SVAR: Node 28 er ansvarlig for k=26.", result: "FERDIG!" },
            ].map(({ step, check, result }, i) => (
              <div key={i} className={`rounded p-2 text-xs ${result.includes("FERDIG") ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"}`}>
                <span className="font-semibold">{step}</span>
                {check && <span className="text-[var(--muted)] ml-1">{check}</span>}
                {result && <span className="font-bold text-green-600 dark:text-green-400 ml-2">{result}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interaktiv Chord-simulator */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Interaktiv Chord-simulator</h2>

        {/* Velg nodeset */}
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "2025", label: "Jan 2025: {3,12,21,31}" },
              { key: "2024", label: "Mai 2024: {0,9,17,30}" },
              { key: "2024b", label: "Jan 2024: {1,5,10,15,20,29}" },
              { key: "2023", label: "Mai 2023: {3,9,10,17,25,31}" },
              { key: "2022", label: "Mai 2022: {1,7,15,19,29}" },
              { key: "custom", label: "Egendefinert" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedNodeSet(key as typeof selectedNodeSet);
                  const ns = key !== "custom" ? nodeSetMap[key] : activeNodes;
                  if (ns.length > 0) setSelectedNode(ns[0]);
                  setLookupStep(-1);
                }}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${selectedNodeSet === key ? "bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {selectedNodeSet === "custom" && (
            <div className="flex items-center gap-2">
              <label className="text-sm">Noder (kommaseparert, 0-31):</label>
              <input
                type="text"
                value={customNodes}
                onChange={e => { setCustomNodes(e.target.value); setLookupStep(-1); }}
                className="border border-[var(--card-border)] rounded px-2 py-1 text-sm bg-[var(--background)] w-48"
                placeholder="f.eks. 1,9,17,25"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SVG Ring */}
            <div>
              <ChordRing
                nodes={activeNodes}
                highlightNode={selectedNode}
                lookupKey={lookupStep >= 0 ? lookupKey : null}
                hops={displayHops}
              />
              <p className="text-xs text-[var(--muted)] text-center mt-1">
                Noder: {"{"}{activeNodes.sort((a,b)=>a-b).join(", ")}{"}"} — Klikk på radene nedenfor
              </p>
            </div>

            {/* Kontroller */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Valgt node (startnode for fingertabell og oppslag):</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {activeNodes.sort((a, b) => a - b).map(n => (
                    <button
                      key={n}
                      onClick={() => { setSelectedNode(n); setLookupStep(-1); }}
                      className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${selectedNode === n ? "bg-amber-500 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fingertabell */}
              <div>
                <button
                  onClick={() => setShowFingerTable(v => !v)}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1"
                >
                  {showFingerTable ? "▼" : "▶"} Fingertabell for node {selectedNode}
                </button>
                {showFingerTable && (
                  <table className="w-full text-xs border-collapse mt-2">
                    <thead>
                      <tr className="bg-blue-100 dark:bg-blue-900/40">
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">i</th>
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">({selectedNode} + 2^(i-1)) mod 32</th>
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">Start</th>
                        <th className="border border-blue-200 dark:border-blue-700 px-2 py-1">finger[i]</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ft.map(({ i, start, succ }) => (
                        <tr key={i}>
                          <td className="border border-[var(--card-border)] px-2 py-1 font-bold text-blue-600 dark:text-blue-400 text-center">{i}</td>
                          <td className="border border-[var(--card-border)] px-2 py-1 font-mono text-center">
                            ({selectedNode} + {Math.pow(2, i - 1)}) mod 32 = {start}
                          </td>
                          <td className="border border-[var(--card-border)] px-2 py-1 text-center">{start}</td>
                          <td className="border border-[var(--card-border)] px-2 py-1 font-bold text-green-600 dark:text-green-400 text-center">{succ}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Nøkkelansvar */}
              <div>
                <button
                  onClick={() => setShowKeyResp(v => !v)}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1"
                >
                  {showKeyResp ? "▼" : "▶"} Nøkkelansvar per node
                </button>
                {showKeyResp && (
                  <div className="mt-2 space-y-1">
                    {keyResp.map(({ node, keys }) => (
                      <div key={node} className="text-xs flex gap-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400 w-12">Node {node}:</span>
                        <span className="text-[var(--muted)]">{"{"}  {keys.join(", ")}  {"}"}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Oppslag */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Nøkkeloppslag fra node {selectedNode}:</p>
                <div className="flex items-center gap-2">
                  <label className="text-xs">Nøkkel (0-31):</label>
                  <input
                    type="number"
                    min={0}
                    max={31}
                    value={lookupKey}
                    onChange={e => { setLookupKey(parseInt(e.target.value, 10)); setLookupStep(-1); }}
                    className="border border-[var(--card-border)] rounded px-2 py-1 text-sm bg-[var(--background)] w-20"
                  />
                  <button
                    onClick={handleRunLookup}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Start oppslag
                  </button>
                  {lookupStep >= 0 && (
                    <button
                      onClick={() => setLookupStep(-1)}
                      className="px-2 py-1.5 bg-gray-200 dark:bg-gray-700 rounded text-sm"
                    >
                      Nullstill
                    </button>
                  )}
                </div>

                {lookupStep >= 0 && (
                  <div className="space-y-2">
                    {hops.map((hop, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLookupStep(idx)}
                        className={`rounded p-2 text-xs cursor-pointer border transition-colors ${idx <= lookupStep ? (hop.action.includes("FERDIG") ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700" : "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700") : "bg-[var(--card)] border-[var(--card-border)] opacity-40"}`}
                      >
                        <span className="font-bold">Hopp {idx + 1} — Node {hop.node}:</span>
                        <span className="ml-1 text-[var(--foreground)]">{hop.action}</span>
                      </div>
                    ))}
                    {lookupStep < hops.length - 1 && (
                      <button
                        onClick={() => setLookupStep(v => v + 1)}
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200"
                      >
                        Neste hopp →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eksamensoppgaver */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Eksamensoppgaver — oppgave 10 (alle år)</h2>

        <div className="flex flex-wrap gap-2">
          {(["2025", "2024", "2024b", "2023", "2022"] as const).map(year => (
            <button
              key={year}
              onClick={() => setExamTab(year)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${examTab === year ? "bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200"}`}
            >
              {year === "2024b" ? "Jan 2024" : year === "2024" ? "Mai 2024" : year === "2025" ? "Jan 2025" : year === "2023" ? "Mai 2023" : "Mai 2022"}
            </button>
          ))}
        </div>

        <div className="rounded-lg border-2 border-blue-300 dark:border-blue-700 bg-[var(--card)] p-4 space-y-4">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">{currentExam.title}</h3>

          {/* Oppgave a: Fingertabeller */}
          {currentExam.fingerTables.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">a) Fingertabeller (vis beregningsstegene):</p>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {currentExam.fingerTables.map(({ node, table }) => (
                    <div key={node} className="border border-[var(--card-border)] rounded p-2">
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Node {node}</p>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>
                            <th className="border border-[var(--card-border)] px-1 py-0.5">i</th>
                            <th className="border border-[var(--card-border)] px-1 py-0.5">start</th>
                            <th className="border border-[var(--card-border)] px-1 py-0.5">f[i]</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.map(({ i, start, succ }) => (
                            <tr key={i}>
                              <td className="border border-[var(--card-border)] px-1 py-0.5 text-center font-bold">{i}</td>
                              <td className="border border-[var(--card-border)] px-1 py-0.5 text-center">{start}</td>
                              <td className="border border-[var(--card-border)] px-1 py-0.5 text-center font-bold text-green-600 dark:text-green-400">{succ}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Oppgave b: Nøkkelansvar */}
          <div>
            <p className="text-sm font-semibold mb-2">b) {currentExam.keyQuestion}</p>
            <div className="space-y-1">
              {currentExam.keyAnswers.map(({ key, resp, reason }) => (
                <div key={key} className="text-sm flex items-start gap-2 bg-blue-50 dark:bg-blue-950/20 rounded px-3 py-1.5">
                  <span className="font-bold text-red-600 dark:text-red-400 min-w-[20px]">k={key}:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">Node {resp}</span>
                  <span className="text-[var(--muted)] text-xs">— {reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Oppgave c: Oppslag */}
          <div>
            <p className="text-sm font-semibold mb-2">c) {currentExam.lookupQuestion}</p>
            <div className="space-y-1.5">
              {currentExam.lookupSteps.map((step, i) => (
                <div key={i} className={`rounded p-2 text-xs border ${i === currentExam.lookupSteps.length - 1 ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700" : "bg-[var(--card)] border-[var(--card-border)]"}`}>
                  <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">Steg {i + 1}:</span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Oppgave d: Replikering */}
          <div className="rounded bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm">
            <p className="font-semibold mb-1">d) Hvorfor repliseres servere og filer i ChordDHT?</p>
            <ul className="list-disc list-inside space-y-0.5 text-xs text-[var(--foreground)]">
              <li><strong>Feiltolerance:</strong> Hvis en node krasjer, kan andre replika-noder ta over ansvaret for nøklene</li>
              <li><strong>Tilgjengelighet:</strong> Data er tilgjengelig selv om primærnoden er nede</li>
              <li><strong>Lastfordeling:</strong> Forespørsler kan fordeles mellom replika-noder</li>
            </ul>
          </div>

          {/* Oppgave e: Fingertabell-formål */}
          <div className="rounded bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm">
            <p className="font-semibold mb-1">e) Hva er formålet med fingertabellen?</p>
            <p className="text-xs text-[var(--foreground)]">
              Fingertabellen gir <strong>skalerbart søk</strong> med O(log N) hopp. Uten fingertabell måtte en node
              følge suksessor-pekere ett steg om gangen (O(N)). Fingertabellen lagrer snarveier til noder som er
              2^0, 2^1, ..., 2^(m-1) posisjoner unna, slik at hvert hopp halverer gjenværende avstand til målet.
            </p>
          </div>
        </div>
      </section>

      {/* Eksamenstips */}
      <section className="space-y-3">
        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Eksamenstips — oppgave 10</p>
          <ul className="space-y-1 list-disc list-inside text-[var(--foreground)]">
            <li><strong>Tegn ALLTID ringen:</strong> Plasser nodene i ringen visuelt — dette hindrer feil med wrap-around</li>
            <li><strong>Beregn fingertabell rad for rad:</strong> Skriv ut alle 5 rader med formel (n + 2^(i-1)) mod 32</li>
            <li><strong>Vis alle hopp:</strong> Dokumenter hvert hopp med hvilken node du er på, succ(node), og om betingelsen er sann</li>
            <li><strong>Wrap-around:</strong> Nøkkel 2 i ringen {"{"}3, 9, 12{"}"} tilhører node 3, fordi 2 {">"} 12 (wrap) ELLER 2 ≤ 3</li>
            <li><strong>succ(n) = n:</strong> Hvis nøkkelen eksakt matcher en node, er den noden ansvarlig</li>
            <li><strong>Formelen:</strong> finger[i] = succ((n + 2^(i-1)) mod 2^m) — lær den utenat</li>
          </ul>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
          <li>Forklare Chord-ringen: m-bits identifikatorrom, noder og nøkler</li>
          <li>Beregne nøkkelansvar: succ(k) = første node ≥ k (med wrap-around)</li>
          <li>Beregne HELE fingertabellen for en node med formelen finger[i] = succ((n + 2^(i-1)) mod 2^m)</li>
          <li>Kjøre oppslags-algoritmen steg for steg og vise alle hopp</li>
          <li>Forklare hvorfor fingertabellen gir O(log N) oppslag</li>
          <li>Forklare replikering i ChordDHT: feiltolerance og skalerbarhet</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-6/teori/6-2" className="hover:text-[var(--accent)] text-sm">
          ← 6.2 Strukturert navngiving
        </Link>
        <Link href="/dat110/ds-6/teori/6-4" className="hover:text-[var(--accent)] text-sm">
          6.4 Attributtbasert navngiving →
        </Link>
      </div>
    </div>
  );
}
