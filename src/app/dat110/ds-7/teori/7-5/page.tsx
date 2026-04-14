"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

type Protocol = "remote_write" | "local_write" | "active_replication" | "quorum";

const protocolInfo: Record<Protocol, {
  name: string;
  category: string;
  definition: string;
  how: string[];
  pros: string[];
  cons: string[];
  consistency: string;
  example: string;
}> = {
  remote_write: {
    name: "Remote-write protocol",
    category: "Primary-based",
    definition: "Alle skriveoperasjoner sendes til én fast primærnode. Lesing kan skje fra enhver replika.",
    how: [
      "Én primærnode er utpekt (fast plassering)",
      "Klient sender skriving til primærnode",
      "Primærnode propagerer til alle backups",
      "Klient bekrefter skriving etter propagering",
      "Lesing kan skje fra hvilken som helst replika",
    ],
    pros: ["Enkel å implementere", "Garanterer sekvensiell konsistens", "Enkel ordering av skrivinger"],
    cons: ["Primærnode kan bli flaskehals", "Høy latens for skriving (roundtrip til primær)", "Primær er single point of failure (uten replikering av primær selv)"],
    consistency: "Sekvensiell konsistens",
    example: "Filserver der alle skriveoperasjoner går til master",
  },
  local_write: {
    name: "Local-write protocol",
    category: "Primary-based",
    definition: "Primærrollen migrerer til noden der klienten befinner seg. Klienten skriver lokalt, og primæren propagerer til backups.",
    how: [
      "Ingen fast primærnode — primæren er mobil",
      "Klient ønsker å skrive → primærollen flyttes til nærmeste node",
      "Klient skriver lokalt til primæren (lav latens)",
      "Primæren propagerer asynkront til alle backups",
      "Lesing skjer lokalt (god lokalitet)",
    ],
    pros: ["Lav lokal latens (godt for mobile klienter)", "Reads og writes er begge lokale", "God for disconnected operation"],
    cons: ["Kompleks migrering av primærrolle", "Asynkron propagering gir midlertidig inkonsistens", "Tracking av primærens plassering kreves"],
    consistency: "Sekvensiell konsistens (med asynkrone oppdateringer: eventual)",
    example: "Laptop som arbeider offline — synkroniserer med sky når tilkoblet",
  },
  active_replication: {
    name: "Active Replication",
    category: "Replicated-write",
    definition: "Alle skriveoperasjoner sendes til og utføres av ALLE replikaer. Ingen primær — alle replikaer er likeverdige.",
    how: [
      "Klient sender skriving til alle replikaer (multicast)",
      "Alle replikaer utfører operasjonen uavhengig",
      "Alle replikaer utfører operasjonene i SAMME rekkefølge (totally ordered multicast)",
      "Lesing skjer fra nærmeste replika",
    ],
    pros: ["Høy feiltoleranse — ingen single point of failure", "Lesing er rask (lokal)", "Enkel failover"],
    cons: ["Krever totally ordered multicast (vanskelig!)", "Skalerer dårlig med mange replikaer", "Alle replikaer må utføre alle operasjoner"],
    consistency: "Sekvensiell konsistens (krever totally ordered multicast)",
    example: "Distribuert key-value store med aktiv replikering",
  },
  quorum: {
    name: "Quorum-based protocol",
    category: "Replicated-write",
    definition: "For å utføre en lesing kreves svar fra minst NR replikaer. For skriving kreves bekreftelse fra minst NW replikaer. Reglene sikrer at lese- og skrivekvorum alltid overlapper.",
    how: [
      "N = totalt antall replikaer",
      "NR = antall replikaer som MÅ delta i lesing (read quorum)",
      "NW = antall replikaer som MÅ bekrefte skriving (write quorum)",
      "Regel 1: NR + NW > N (lese-skriv overlapp)",
      "Regel 2: NW > N/2 (skriv-skriv overlapp)",
      "Klient kontakter NW replikaer for skriving, NR for lesing",
    ],
    pros: ["Fleksibel trade-off: lese-tung vs. skrive-tung", "Ingen single primary", "Fortsatt korrekt ved nodefeil (om quorum opprettholdes)", "Majority voting"],
    cons: ["Krever versjonsnumre/tidsstempler for å finne siste versjon", "Høyere latens enn primary-based ved enkle operasjoner", "Kompleksitet i implementasjon"],
    consistency: "Sekvensiell konsistens (med korrekte NR, NW)",
    example: "Amazon DynamoDB (konfigurerbar), Cassandra, distribuerte databaser",
  },
};

export default function DS7_5Page() {
  const [activeProtocol, setActiveProtocol] = useState<Protocol>("quorum");
  const [n, setN] = useState(5);
  const [nr, setNr] = useState(3);
  const [nw, setNw] = useState(3);

  const protocols: Protocol[] = ["remote_write", "local_write", "active_replication", "quorum"];
  const info = protocolInfo[activeProtocol];

  // Quorum-validering
  const rule1Ok = nr + nw > n;
  const rule2Ok = nw > n / 2;
  const allOk = rule1Ok && rule2Ok;

  const quorumType = () => {
    if (!allOk) return "UGYLDIG";
    if (nr === 1 && nw === n) return "RIRO — Read One Write All";
    if (nw === n && nr >= 1) return "Skrive-heavy (Write All)";
    if (nr > nw) return "Lese-tung (Read Heavy)";
    if (nw > nr) return "Skrive-tung (Write Heavy)";
    return "Balansert";
  };

  // SVG for quorum-visualisering
  const renderQuorumSVG = () => {
    const cx = 200, cy = 110, r = 80;
    const nodes: { x: number; y: number; label: string }[] = Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        label: `R${i + 1}`,
      };
    });

    return (
      <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto">
        {nodes.map((node, i) => {
          const inReadQuorum = i < nr;
          const inWriteQuorum = i < nw;
          const color = inWriteQuorum && inReadQuorum
            ? "#a855f7"  // overlap - purple
            : inWriteQuorum
            ? "#3b82f6"  // write only - blue
            : inReadQuorum
            ? "#22c55e"  // read only - green
            : "#9ca3af"; // neither - gray
          return (
            <g key={i}>
              <circle cx={node.x} cy={node.y} r="20" fill={color} opacity="0.85"/>
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">{node.label}</text>
            </g>
          );
        })}
        {/* Legend */}
        <circle cx="15" cy="175" r="7" fill="#3b82f6" opacity="0.85"/>
        <text x="26" y="179" fontSize="9" fill="currentColor">Skrivekvorum (NW)</text>
        <circle cx="15" cy="190" r="7" fill="#22c55e" opacity="0.85"/>
        <text x="26" y="194" fontSize="9" fill="currentColor">Lesekvorum (NR)</text>
        <circle cx="15" cy="205" r="7" fill="#a855f7" opacity="0.85"/>
        <text x="26" y="209" fontSize="9" fill="currentColor">Begge (overlapp)</text>
        <circle cx="200" cy="205" r="7" fill="#9ca3af" opacity="0.85"/>
        <text x="211" y="209" fontSize="9" fill="currentColor">Ingen kvorum</text>
      </svg>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-7/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">7.5 Konsistensprotokoller</span>
      </div>

      <h1 className="text-2xl font-bold">7.5 Konsistensprotokoller</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Konsistensprotokoller implementerer konsistensmodellene (7.2) i praksis.
        De styrer <em>hvordan</em> skrivinger propageres mellom replikaer og <em>hvem</em> som koordinerer.
        Quorum-protokollen er mest eksamensaktuell.
      </p>

      {/* Eksamensfokus */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <strong className="text-amber-700 dark:text-amber-400">VIKTIG for eksamen:</strong>{" "}
        Oppgave 1i (mai 2024): "A replicated-write protocol which is based on majority voting is called" → Svar: <strong>Quorum-based protocol</strong>.
        Oppgave 9c (mai 2023): "Briefly explain the difference between primary-based protocols and replicated-write protocols."
        Du MÅ forstå quorum-reglene NR + NW {">"} N og NW {">"} N/2 med konkrete tall.
      </div>

      {/* Hva du MÅ kunne */}
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Hva du MÅ kunne</h2>
        <ul className="space-y-1 text-sm list-disc list-inside text-[var(--foreground)]">
          <li>Forskjellen mellom primary-based og replicated-write protokoller</li>
          <li>Remote-write vs. local-write protokoller</li>
          <li>Active replication: alle utfører alle operasjoner</li>
          <li><strong>Quorum-reglene: NR + NW &gt; N og NW &gt; N/2 — og HVORFOR</strong></li>
          <li>Beregne om et quorum-oppsett er gyldig med konkrete tall</li>
          <li>RIRO: "Read One, Write All" = N=5, NR=1, NW=5</li>
          <li>Hva "majority voting" betyr i quorum-sammenheng</li>
        </ul>
      </div>

      {/* Oversikt: to kategorier */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">To kategorier av protokoller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-5">
            <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Primary-based protokoller</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Én node er primær og koordinerer alle skrivinger. Andre noder er backups.
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li><strong>Remote-write:</strong> Fast primær, alt skrives dit</li>
              <li><strong>Local-write:</strong> Primær migrerer til klienten</li>
            </ul>
          </div>
          <div className="rounded-lg border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20 p-5">
            <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">Replicated-write protokoller</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Ingen enkelt primær. Skrivinger sendes til et sett replikaer.
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li><strong>Active replication:</strong> Alle utfører alle operasjoner</li>
              <li><strong>Quorum-based:</strong> Majoritetsstemming (EKSAMEN!)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interaktiv protokoll-utforsker */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Utforsk protokollene</h2>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {protocols.map((p) => {
            const pi = protocolInfo[p];
            const isCat1 = p === "remote_write" || p === "local_write";
            return (
              <button
                key={p}
                onClick={() => setActiveProtocol(p)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all text-left ${
                  activeProtocol === p
                    ? isCat1
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-400"
                      : "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-400"
                    : "border-[var(--card-border)] hover:border-blue-400"
                }`}
              >
                <div className="font-bold text-xs">{pi.category}</div>
                <div className="text-xs opacity-80 mt-0.5">{pi.name}</div>
              </button>
            );
          })}
        </div>

        {/* Protokolldetaljer */}
        <div className={`rounded-xl border-2 p-6 space-y-4 ${
          activeProtocol === "remote_write" || activeProtocol === "local_write"
            ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20"
            : "border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20"
        }`}>
          <div>
            <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">{info.category}</div>
            <h3 className={`text-lg font-bold ${
              activeProtocol === "remote_write" || activeProtocol === "local_write"
                ? "text-blue-600 dark:text-blue-400"
                : "text-purple-600 dark:text-purple-400"
            }`}>{info.name}</h3>
          </div>

          <p className="text-sm text-[var(--foreground)] leading-relaxed">{info.definition}</p>

          <div>
            <p className="text-xs font-semibold text-[var(--muted)] mb-2 uppercase tracking-wide">Slik fungerer det</p>
            <ol className="text-sm text-[var(--muted)] space-y-1 list-decimal list-inside">
              {info.how.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Fordeler</p>
              <ul className="text-xs text-[var(--muted)] space-y-0.5 list-disc list-inside">
                {info.pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Ulemper</p>
              <ul className="text-xs text-[var(--muted)] space-y-0.5 list-disc list-inside">
                {info.cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">Konsistensgaranti</p>
              <p className="text-xs text-[var(--foreground)]">{info.consistency}</p>
            </div>
            <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
              <p className="text-xs font-semibold text-[var(--muted)] mb-1">Eksempel</p>
              <p className="text-xs text-[var(--foreground)]">{info.example}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quorum-seksjonen — mest detaljert */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Quorum-protokollen i detalj (EKSAMEN)
        </h2>

        {/* Formelbokser */}
        <FormulaBox
          latex="N_R + N_W > N"
          title="Regel 1: Lese-skriv overlapp"
          variant="blue"
          description="Lesekvorum og skrivekvorum MÅ overlappe. Dette sikrer at en lesing alltid ser den siste skrevne verdien."
        />
        <FormulaBox
          latex="N_W > \\frac{N}{2}"
          title="Regel 2: Skriv-skriv overlapp (majority)"
          variant="blue"
          description="Skrivekvorum MÅ være et flertall. Sikrer at to samtidige skrivinger ikke kan begge fullføres uten å se hverandre."
        />

        {/* Intuisjon */}
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3">
          <h3 className="font-semibold text-blue-700 dark:text-blue-400">Hvorfor disse reglene?</h3>
          <div className="space-y-3 text-sm text-[var(--muted)]">
            <div>
              <strong className="text-[var(--foreground)]">Regel 1 (NR + NW &gt; N):</strong> Tenk deg N=5 replikaer.
              Hvis NW=3 replikaer bekrefter en skriving, og NR=3 replikaer kontaktes ved lesing,
              er det umulig at de 3 leste replikaene IKKE inneholder minst én av de 3 som ble skrevet til.
              Pigeonhole-prinsippet: 3+3=6 &gt; 5, så overlapp er garantert.
              Dette betyr at vi alltid finner den siste verdien.
            </div>
            <div>
              <strong className="text-[var(--foreground)]">Regel 2 (NW &gt; N/2):</strong> Hvis to klienter prøver å skrive
              samtidig, kan bare én fullføre et flertalls-kvorum. To samtidige skriveoperasjoner kan ikke begge
              oppnå flertall — da ville 2×NW &gt; N, som krever NW &gt; N/2.
            </div>
          </div>
        </div>

        {/* Interaktiv kalkulator */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h3 className="font-semibold mb-4">Interaktiv quorum-kalkulator</h3>
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[
              { label: "N — Antall replikaer", val: n, set: setN, min: 1, max: 9 },
              { label: "NR — Lesekvorum", val: nr, set: setNr, min: 1, max: n },
              { label: "NW — Skrivekvorum", val: nw, set: setNw, min: 1, max: n },
            ].map(({ label, val, set, min, max }) => (
              <div key={label} className="space-y-2">
                <label className="text-xs font-semibold text-[var(--muted)]">{label}</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => set(Math.max(min, val - 1))}
                    className="w-8 h-8 rounded-lg border border-[var(--card-border)] flex items-center justify-center font-bold hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 w-8 text-center">{val}</span>
                  <button
                    onClick={() => set(Math.min(max, val + 1))}
                    className="w-8 h-8 rounded-lg border border-[var(--card-border)] flex items-center justify-center font-bold hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Visualisering */}
          {renderQuorumSVG()}

          {/* Regelsjekk */}
          <div className="space-y-2 mt-4">
            <div className={`flex items-center gap-3 p-3 rounded-lg ${rule1Ok ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"}`}>
              <span className={`text-lg ${rule1Ok ? "text-green-600" : "text-red-600"}`}>{rule1Ok ? "✓" : "✗"}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  Regel 1: NR + NW &gt; N → {nr} + {nw} = {nr + nw} {nr + nw > n ? ">" : "≤"} {n}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {rule1Ok ? "OK — lesekvorum og skrivekvorum overlapper" : "BRUTT — ingen garanti for å finne siste versjon"}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-lg ${rule2Ok ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"}`}>
              <span className={`text-lg ${rule2Ok ? "text-green-600" : "text-red-600"}`}>{rule2Ok ? "✓" : "✗"}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  Regel 2: NW &gt; N/2 → {nw} {nw > n / 2 ? ">" : "≤"} {n}/2 = {n / 2}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {rule2Ok ? "OK — majority voting oppnådd" : "BRUTT — to samtidige skrivinger kan konfliktere"}
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-lg text-center ${allOk ? "bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-400" : "bg-red-50 dark:bg-red-950/30 border-2 border-red-400"}`}>
              <p className={`text-lg font-bold ${allOk ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}>
                {allOk ? `GYLDIG QUORUM — Type: ${quorumType()}` : "UGYLDIG QUORUM"}
              </p>
              {allOk && (
                <p className="text-xs text-[var(--muted)] mt-1">
                  {nr === 1 && nw === n && "Maks lese-ytelse, maks skrivekostnad. NW=N betyr alle må bekrefte skriving."}
                  {nr === n && nw === 1 && "Maks skrive-ytelse, maks lesekostnad. NR=N betyr alle leses."}
                  {nr > 1 && nw < n && nr !== n && "Balansert quorum — god for blandede arbeidsmengder."}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Konkrete eksempler fra eksamen */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Eksamenseksempler — quorum med tall</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 pr-3 font-semibold">N</th>
                <th className="text-left py-2 pr-3 font-semibold">NR</th>
                <th className="text-left py-2 pr-3 font-semibold">NW</th>
                <th className="text-left py-2 pr-3 font-semibold">Regel 1 (NR+NW&gt;N)</th>
                <th className="text-left py-2 pr-3 font-semibold">Regel 2 (NW&gt;N/2)</th>
                <th className="text-left py-2 pr-3 font-semibold">Gyldig?</th>
                <th className="text-left py-2 font-semibold">Type</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                { n: 5, nr: 3, nw: 3, r1: "3+3=6>5 ✓", r2: "3>2.5 ✓", ok: true, type: "Balansert" },
                { n: 5, nr: 1, nw: 5, r1: "1+5=6>5 ✓", r2: "5>2.5 ✓", ok: true, type: "RIRO: Read One Write All" },
                { n: 5, nr: 5, nw: 1, r1: "5+1=6>5 ✓", r2: "1>2.5 ✗", ok: false, type: "UGYLDIG (NW for lav)" },
                { n: 5, nr: 2, nw: 4, r1: "2+4=6>5 ✓", r2: "4>2.5 ✓", ok: true, type: "Skrive-tung" },
                { n: 5, nr: 4, nw: 2, r1: "4+2=6>5 ✓", r2: "2>2.5 ✗", ok: false, type: "UGYLDIG (NW for lav)" },
                { n: 5, nr: 2, nw: 2, r1: "2+2=4<5 ✗", r2: "2>2.5 ✗", ok: false, type: "UGYLDIG (begge regler)" },
                { n: 7, nr: 4, nw: 4, r1: "4+4=8>7 ✓", r2: "4>3.5 ✓", ok: true, type: "Balansert" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--card-border)]">
                  <td className="py-2 pr-3 font-bold">{row.n}</td>
                  <td className="py-2 pr-3">{row.nr}</td>
                  <td className="py-2 pr-3">{row.nw}</td>
                  <td className={`py-2 pr-3 text-xs ${row.r1.includes("✓") && !row.r1.includes("✗") ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{row.r1}</td>
                  <td className={`py-2 pr-3 text-xs ${row.r2.includes("✓") && !row.r2.includes("✗") ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>{row.r2}</td>
                  <td className="py-2 pr-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${row.ok ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"}`}>
                      {row.ok ? "Gyldig" : "Ugyldig"}
                    </span>
                  </td>
                  <td className="py-2 text-xs">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RIRO */}
      <section className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400">RIRO — Read One, Write All</h2>
        <p className="text-sm text-[var(--muted)]">
          Et spesialtilfelle av quorum der <strong>NR=1 og NW=N</strong>. Alle replikaer MÅ bekrefte skriving (NW=N),
          men lesing kan skje fra hvilken som helst node (NR=1).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[var(--muted)]">
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
            <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Fordel</p>
            <p>Lesing er ekstremt rask — kontakter bare 1 node. Bra for lese-tunge systemer.</p>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-3">
            <p className="font-semibold text-red-600 dark:text-red-400 mb-1">Ulempe</p>
            <p>Skriving er treg — MÅ nå ALLE N replikaer. Om én node er nede, blokkeres skriving.</p>
          </div>
        </div>
        <div className="text-xs text-[var(--muted)]">
          <strong>Merk:</strong> RIRO er det "ultimate" tilfellet — maksimal lese-ytelse med maksimal skrivekostnad og lav feiltoleranse for skriving.
        </div>
      </section>

      {/* Primær-basert vs. replicated-write for eksamen */}
      <section className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 space-y-3">
        <h2 className="font-semibold text-blue-700 dark:text-blue-400">Primary-based vs. Replicated-write (eksamenssvar)</h2>
        <p className="text-sm text-[var(--muted)] italic">Oppg. 9c (2023): "Briefly explain the difference between primary-based protocols and replicated-write protocols."</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-4">
            <p className="font-semibold text-sm mb-2 text-blue-600 dark:text-blue-400">Primary-based</p>
            <p className="text-xs text-[var(--muted)]">
              Én enkelt primærnode koordinerer alle skrivinger. Alle klienter sender skrivinger til primæren,
              som propagerer til backups. Gir enkel skriveordering. Primæren kan være fast (remote-write)
              eller mobil (local-write). Enkel å implementere, men primæren er flaskehals og single point of failure.
            </p>
          </div>
          <div className="rounded-lg bg-white/50 dark:bg-black/20 p-4">
            <p className="font-semibold text-sm mb-2 text-purple-600 dark:text-purple-400">Replicated-write</p>
            <p className="text-xs text-[var(--muted)]">
              Ingen enkelt primær. Skrivinger sendes til og utføres av et sett av replikaer.
              I aktiv replikering utfører alle replikaer alle operasjoner (krever totally ordered multicast).
              I quorum-basert protocol kreves bekreftelse fra NW replikaer. Mer feiltolerante, men kompleksere.
            </p>
          </div>
        </div>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5">
        <h2 className="font-semibold text-red-700 dark:text-red-400 mb-3">Vanlige feil</h2>
        <ul className="space-y-2 text-sm text-[var(--muted)] list-disc list-inside">
          <li>Glemme regel 2 (NW &gt; N/2) — begge regler MÅ oppfylles.</li>
          <li>Tro at NR=5 og NW=1 med N=5 er gyldig — det er ikke det (NW=1 &lt; N/2=2.5).</li>
          <li>Forveksle "majority voting" med quorum generelt — majority voting er et spesialtilfelle der NR=NW=(N+1)/2.</li>
          <li>Tro at quorum krever at ALLE replikaer bekrefter — nei, bare NW (skrivekvorum) trenger å svare.</li>
          <li>Glemme at quorum-basert lesing krever versjonsnumre for å finne den nyeste verdien blant NR svar.</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-7/teori/7-3" className="hover:text-[var(--accent)] text-sm">
          ← 7.3 Klient-sentrerte konsistensmodeller
        </Link>
        <div />
      </div>
    </div>
  );
}
