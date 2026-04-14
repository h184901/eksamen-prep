"use client";
import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

type NodeId = "A" | "B" | "C" | "D";

const GOSSIP_NODES: NodeId[] = ["A", "B", "C", "D"];

export default function DS4_4Page() {
  const [rdpOverlay, setRdpOverlay] = useState(73);
  const [rdpDirect, setRdpDirect] = useState(47);
  const [activeALM, setActiveALM] = useState<"tree" | "mesh">("tree");
  const [gossipStep, setGossipStep] = useState(0);
  const [gossipVariant, setGossipVariant] = useState<"push" | "pull" | "pushpull">("push");
  const [showGossipExplain, setShowGossipExplain] = useState(false);

  const rdp = rdpDirect > 0 ? (rdpOverlay / rdpDirect).toFixed(2) : "∞";

  // Gossip simulation data
  const gossipStates: Record<string, { informed: NodeId[]; desc: string }[]> = {
    push: [
      { informed: ["A"], desc: "Start: Kun A har oppdateringen (er 'infisert')" },
      { informed: ["A", "C"], desc: "Runde 1: A velger tilfeldig nabo C og pusher oppdateringen" },
      { informed: ["A", "B", "C"], desc: "Runde 2: A velger B, C velger nabo (B). B er nå infisert" },
      { informed: ["A", "B", "C", "D"], desc: "Runde 3: Alle noder er infisert. Epidemien er fullstendig!" },
    ],
    pull: [
      { informed: ["A"], desc: "Start: Kun A har oppdateringen" },
      { informed: ["A", "B"], desc: "Runde 1: B puller fra A og får oppdateringen" },
      { informed: ["A", "B", "C"], desc: "Runde 2: C puller fra A (eller B) og får oppdateringen" },
      { informed: ["A", "B", "C", "D"], desc: "Runde 3: D puller fra en informert node. Ferdig!" },
    ],
    pushpull: [
      { informed: ["A"], desc: "Start: Kun A har oppdateringen" },
      { informed: ["A", "D"], desc: "Runde 1: A velger D, de utveksler — D får oppdatering, A kan få D's info" },
      { informed: ["A", "B", "C", "D"], desc: "Runde 2: A og D sprer til B og C. Push-pull er raskeste varianten!" },
      { informed: ["A", "B", "C", "D"], desc: "Alle noder konvergert. Push-pull krever færre runder enn push alene." },
    ],
  };

  const currentGossipState = gossipStates[gossipVariant][Math.min(gossipStep, gossipStates[gossipVariant].length - 1)];

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.4 Multicast og overlay-nettverk</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">4.4 Multicast og overlay-nettverk</h1>
        <p className="text-[var(--muted)] max-w-2xl mt-2">
          Application-Level Multicast (ALM) bygger overlay-nettverk for å spre data uten støtte fra rutere.
          Nøkkelkonsepter: link stress, RDP (Relative Delay Penalty), tree cost, flooding og gossip-protokoller.
        </p>
      </div>

      {/* EXAM BANNER */}
      <div className="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm">
        <div className="font-bold text-red-700 dark:text-red-400 mb-1">EKSAMEN OPPGAVE 8 (10%) — ALM og overlay</div>
        <p className="text-red-700 dark:text-red-400">
          Oppgave 8 tester ALM-beregninger: link stress, RDP/stretch, tree cost og gossip.
          RDP-formelen og flooding-formelen er garanterte regnestykker. Lær dem utenat.
        </p>
      </div>

      {/* 1. OVERLAY-NETTVERK */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">1. Overlay-nettverk: Hva og Hvorfor?</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Hva er et overlay-nettverk?</div>
            <p className="text-sm text-[var(--muted)]">
              Et <strong>overlay-nettverk</strong> er et virtuelt nettverk av prosesser som kommuniserer over det fysiske nettverket.
              Én "hop" i overlay-nettverket kan span over mange fysiske router-hopp.
              Prosessene er nodene, og overlay-forbindelsene er de logiske kantene.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Eksempler på overlay-nettverk</div>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>BitTorrent (P2P file sharing)</li>
              <li>Windows Update distribution</li>
              <li>CDN (Content Delivery Networks)</li>
              <li>Skype (VoIP signaling)</li>
              <li>Blockchain-nettverk</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 px-4 py-3 text-sm">
          <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Motivasjon for ALM</div>
          <p className="text-blue-700 dark:text-blue-400">
            <strong>IP Multicast</strong> (ruternivå) er effektivt, men krever at alle rutere i internett støtter multicast.
            De fleste gjør ikke det. <strong>Application-Level Multicast (ALM)</strong> er alternativet:
            applikasjonsprosesser bygger selv et overlay-nettverk og håndterer spredning av data.
            Enkelt å implementere, fungerer overalt, men litt mer overhead.
          </p>
        </div>
      </section>

      {/* 2. ALM-TOPOLOGIER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">2. ALM-topologier: Tre vs Mesh</h2>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveALM("tree")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeALM === "tree" ? "bg-blue-600 text-white" : "border border-[var(--card-border)] text-[var(--muted)] hover:border-blue-400"}`}
          >
            Tre-topologi
          </button>
          <button
            onClick={() => setActiveALM("mesh")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeALM === "mesh" ? "bg-blue-600 text-white" : "border border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] hover:border-blue-400"}`}
          >
            Mesh-topologi
          </button>
        </div>

        {activeALM === "tree" && (
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-[var(--card)] p-4 space-y-4">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Tre-topologi</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-[var(--muted)]">
                  I en <strong>tre-topologi</strong> er nodene koblet i et spanning tree.
                  Det finnes <strong>én unik sti</strong> mellom enhver par noder.
                  Meldinger sendes langs greinene — ingen sykler.
                </p>
                <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
                  <li>Meldinger: <strong>N - 1</strong> for N noder (optimalt!)</li>
                  <li>Enkel ruting — ingen routing-tabell nødvendig</li>
                  <li>Sårbar: hvis en node/kant faller ut, deles treet</li>
                  <li>Lav link stress (typisk 1)</li>
                </ul>
              </div>
              <svg viewBox="0 0 200 160" className="w-full max-w-xs">
                {/* Rot */}
                <circle cx="100" cy="20" r="14" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
                <text x="100" y="25" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">A</text>
                {/* Barn */}
                <circle cx="50" cy="80" r="14" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5"/>
                <text x="50" y="85" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">B</text>
                <circle cx="150" cy="80" r="14" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5"/>
                <text x="150" y="85" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">C</text>
                {/* Barnebarn */}
                <circle cx="20" cy="140" r="14" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="20" y="145" textAnchor="middle" fontSize="11" fill="#1e3a8a" fontWeight="bold">D</text>
                <circle cx="80" cy="140" r="14" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5"/>
                <text x="80" y="145" textAnchor="middle" fontSize="11" fill="#1e3a8a" fontWeight="bold">E</text>
                {/* Kanter */}
                <line x1="88" y1="31" x2="61" y2="68" stroke="#3b82f6" strokeWidth="2"/>
                <line x1="112" y1="31" x2="139" y2="68" stroke="#3b82f6" strokeWidth="2"/>
                <line x1="40" y1="91" x2="28" y2="127" stroke="#3b82f6" strokeWidth="2"/>
                <line x1="56" y1="93" x2="72" y2="127" stroke="#3b82f6" strokeWidth="2"/>
                {/* Labels */}
                <text x="100" y="155" textAnchor="middle" fontSize="9" fill="#6b7280">4 noder → 3 meldinger (N-1)</text>
              </svg>
            </div>
          </div>
        )}

        {activeALM === "mesh" && (
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-[var(--card)] p-4 space-y-4">
            <div className="font-semibold text-purple-600 dark:text-purple-400">Mesh-topologi</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-[var(--muted)]">
                  I en <strong>mesh-topologi</strong> er nodene koblet til mange naboer.
                  Det finnes <strong>multiple stier</strong> mellom noder — bedre feiltoleranse,
                  men krever routing og medfører høyere link stress.
                </p>
                <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
                  <li>Full mesh: <strong>½·N·(N-1)</strong> forbindelser</li>
                  <li>Robust: alternative stier ved feil</li>
                  <li>Høyere link stress — samme melding kan krysse samme fysiske link flere ganger</li>
                  <li>Krever routing-protokoll</li>
                </ul>
              </div>
              <svg viewBox="0 0 200 180" className="w-full max-w-xs">
                <circle cx="100" cy="30" r="14" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="100" y="35" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">A</text>
                <circle cx="170" cy="100" r="14" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="170" y="105" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">B</text>
                <circle cx="130" cy="165" r="14" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="130" y="170" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">C</text>
                <circle cx="70" cy="165" r="14" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="70" y="170" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">D</text>
                <circle cx="30" cy="100" r="14" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                <text x="30" y="105" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">E</text>
                {/* Alle kanter */}
                {[
                  [100,30,170,100],[100,30,130,165],[100,30,70,165],[100,30,30,100],
                  [170,100,130,165],[170,100,70,165],[170,100,30,100],
                  [130,165,70,165],[130,165,30,100],[70,165,30,100]
                ].map(([x1,y1,x2,y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a78bfa" strokeWidth="1.5" opacity="0.7"/>
                ))}
                <text x="100" y="15" textAnchor="middle" fontSize="9" fill="#6b7280">Full mesh: 5 noder, 10 kanter</text>
              </svg>
            </div>
          </div>
        )}
      </section>

      {/* 3. ALM-KOSTNADER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">3. ALM-kostnader: Link Stress og RDP</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Link Stress</div>
            <p className="text-sm text-[var(--muted)]">
              Antall ganger en <strong>ALM-melding krysser samme fysiske link</strong>.
              Høy link stress betyr at samme data sendes over samme fysiske kobling
              flere ganger — sløsing med båndbredde.
            </p>
            <div className="text-xs bg-[var(--background)] border border-[var(--card-border)] rounded p-2 text-[var(--muted)]">
              Link stress = 1 → Optimal (meldingen krysser hvert fysisk link nøyaktig én gang)<br/>
              Link stress {">"} 1 → Ineffektivt (samme link brukes flere ganger)
            </div>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Tree Cost</div>
            <p className="text-sm text-[var(--muted)]">
              Summen av alle kant-forsinkelser i et overlay-tre.
              Målet er å minimere tree cost — finne det <strong>minimale spenntreet (MST)</strong>.
              Tree cost beregnes som summen av alle ALM-forbindelsers forsinkelse.
            </p>
            <div className="text-xs bg-[var(--background)] border border-[var(--card-border)] rounded p-2 font-mono text-[var(--muted)]">
              Tree cost = Σ (forsinkelse for hver kant i treet)
            </div>
          </div>
        </div>

        {/* RDP kalkulator */}
        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-4">
          <div className="font-bold text-amber-700 dark:text-amber-400">RDP — Relative Delay Penalty (Stretch)</div>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            RDP måler hvor mye lengre veien er i overlay-nettverket sammenlignet med direkte nettverksforbindelse.
            RDP = 1 er perfekt (overlay er like rask som direkte). RDP {">"} 1 = overhead fra overlay.
          </p>

          <FormulaBox variant="gold" latex={`\\text{RDP} = \\frac{\\text{overlay\\_delay}}{\\text{network\\_delay}}`} />

          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-xs font-medium text-amber-700 dark:text-amber-400 block mb-1">
                Overlay-forsinkelse (ms): {rdpOverlay}
              </label>
              <input
                type="range" min={10} max={200} value={rdpOverlay}
                onChange={(e) => setRdpOverlay(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-amber-700 dark:text-amber-400 block mb-1">
                Direkte forsinkelse (ms): {rdpDirect}
              </label>
              <input
                type="range" min={10} max={200} value={rdpDirect}
                onChange={(e) => setRdpDirect(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="rounded-lg bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-600 px-4 py-3 text-center">
              <div className="text-xs text-amber-600 dark:text-amber-400 mb-1">RDP =</div>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{rdp}</div>
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                {Number(rdp) < 1.5 ? "Bra" : Number(rdp) < 2.5 ? "Middels" : "Høy overhead"}
              </div>
            </div>
          </div>

          <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 rounded p-2">
            <strong>Eksempel fra forelesning:</strong> B → C via overlay = 73 ms; B → C direkte = 47 ms.
            RDP = 73/47 ≈ 1.55. Dette betyr 55% overhead fra overlay-ruting.
          </div>
        </div>
      </section>

      {/* 4. FLOODING */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">4. Flooding-basert multicast</h2>

        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
          <p className="text-sm text-[var(--muted)]">
            I flooding-basert multicast sender en node meldingen til <strong>alle sine naboer</strong>.
            Hver node som mottar meldingen sender den videre til alle sine naboer (minus senderen),
            men <strong>kun hvis det er første gang</strong> den ser meldingen (for å unngå uendelige løkker).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
            <div className="font-semibold text-green-700 dark:text-green-400 mb-2">Tre-basert flooding</div>
            <p className="text-xs text-green-700 dark:text-green-400 mb-2">Alle noder i et spanning tree. Optimal!</p>
            <FormulaBox variant="blue" latex={`\\text{Meldinger} = N - 1`} />
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              N = antall noder. Ingen duplikater — hvert node mottar én gang.
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
            <div className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Full mesh flooding</div>
            <p className="text-xs text-purple-700 dark:text-purple-400 mb-2">Komplett kobling mellom alle noder</p>
            <FormulaBox variant="blue" latex={`\\text{Meldinger} = \\frac{N(N-1)}{2}`} />
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
              Mange duplikater — hver node sender til alle andre.
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
            <div className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Probabilistisk flooding</div>
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">Node videreformidler med sannsynlighet p_flood</p>
            <FormulaBox variant="blue" latex={`M \\approx \\frac{N(N-1)}{2} \\cdot p_{flood}`} />
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              Reduserer meldinger, men garanterer ikke at alle mottar.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <div className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Eksamenstips: Flooding-formlene</div>
          <p className="text-amber-700 dark:text-amber-400">
            Du må huske: tre = N-1, full mesh = N(N-1)/2, probabilistisk = N(N-1)/2 · p.
            Eksempel: 10 noder med p=0.5: mesh = 10·9/2 = 45, probabilistisk ≈ 22.5 meldinger.
          </p>
        </div>
      </section>

      {/* 5. GOSSIP */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">5. Gossip / Epidemic-protokoller</h2>

        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
          <p className="text-sm text-[var(--muted)]">
            Gossip-protokoller er inspirert av hvordan sykdommer sprer seg i en befolkning.
            Noder sprer informasjon eksponentielt raskt — etter noen runder er alle noder informert.
            Svært skalerbart og feiltolerант: ingen sentral server, ingen enkeltpunkt-feil.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded border border-[var(--card-border)] p-3">
              <div className="font-semibold text-sm mb-1">Anti-entropy</div>
              <p className="text-xs text-[var(--muted)]">
                Node P velger tilfeldig nabo Q og utveksler oppdateringer (push, pull, eller push-pull).
                Alle noder sjekker periodisk mot tilfeldige naboer.
                Langsom men fullstendig spredning — garanterer til slutt at alle har alt.
              </p>
            </div>
            <div className="rounded border border-[var(--card-border)] p-3">
              <div className="font-semibold text-sm mb-1">Rumor mongering</div>
              <p className="text-xs text-[var(--muted)]">
                Node med "hot" (ny) oppdatering gossiper aktivt til tilfeldige naboer.
                Hvis naboer allerede kjenner oppdateringen, slutter noden å gossipe
                med sannsynlighet 1/k. Raskere spredning, men kan slutte for tidlig.
              </p>
            </div>
          </div>
        </div>

        {/* Interaktiv gossip-simulator */}
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-[var(--card)] p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Interaktiv Gossip-simulator</div>
            <button
              onClick={() => setShowGossipExplain(!showGossipExplain)}
              className="text-xs text-[var(--muted)] hover:text-[var(--accent)]"
            >
              {showGossipExplain ? "Skjul" : "Hva skjer?"}
            </button>
          </div>

          {showGossipExplain && (
            <p className="text-xs text-[var(--muted)] bg-[var(--background)] rounded p-2">
              Blå noder = infiserte (har oppdateringen). Grå noder = uninformerte.
              Klikk "Neste runde" for å se spredningen. Start forfra med "Reset".
            </p>
          )}

          {/* Variant-valg */}
          <div className="flex gap-2 text-xs">
            {(["push", "pull", "pushpull"] as const).map((v) => (
              <button
                key={v}
                onClick={() => { setGossipVariant(v); setGossipStep(0); }}
                className={`px-2 py-1 rounded font-medium transition-colors ${gossipVariant === v ? "bg-blue-600 text-white" : "border border-[var(--card-border)] text-[var(--muted)]"}`}
              >
                {v === "push" ? "Push" : v === "pull" ? "Pull" : "Push-Pull"}
              </button>
            ))}
          </div>

          {/* Gossip-visualisering */}
          <div className="flex flex-col items-center gap-4">
            <svg viewBox="0 0 300 200" className="w-full max-w-sm">
              {/* Forbindelser */}
              <line x1="150" y1="30" x2="250" y2="100" stroke="#e5e7eb" strokeWidth="1.5"/>
              <line x1="150" y1="30" x2="50" y2="100" stroke="#e5e7eb" strokeWidth="1.5"/>
              <line x1="250" y1="100" x2="200" y2="180" stroke="#e5e7eb" strokeWidth="1.5"/>
              <line x1="50" y1="100" x2="100" y2="180" stroke="#e5e7eb" strokeWidth="1.5"/>
              <line x1="200" y1="180" x2="100" y2="180" stroke="#e5e7eb" strokeWidth="1.5"/>
              <line x1="50" y1="100" x2="250" y2="100" stroke="#e5e7eb" strokeWidth="1.5"/>

              {/* Noder */}
              {[
                { id: "A" as NodeId, cx: 150, cy: 30 },
                { id: "B" as NodeId, cx: 250, cy: 100 },
                { id: "C" as NodeId, cx: 200, cy: 180 },
                { id: "D" as NodeId, cx: 100, cy: 180 },
              ].map(({ id, cx, cy }) => {
                const informed = currentGossipState.informed.includes(id);
                return (
                  <g key={id}>
                    <circle
                      cx={cx} cy={cy} r="22"
                      fill={informed ? "#3b82f6" : "#e5e7eb"}
                      stroke={informed ? "#1d4ed8" : "#9ca3af"}
                      strokeWidth="2"
                    />
                    <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="bold"
                      fill={informed ? "white" : "#6b7280"}>
                      {id}
                    </text>
                    {informed && (
                      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="8" fill="#bfdbfe">✓</text>
                    )}
                  </g>
                );
              })}

              {/* Legende */}
              <circle cx="20" cy="10" r="6" fill="#3b82f6"/>
              <text x="30" y="14" fontSize="8" fill="#6b7280">Informert</text>
              <circle cx="90" cy="10" r="6" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
              <text x="100" y="14" fontSize="8" fill="#6b7280">Ikke informert</text>
            </svg>

            {/* Status-tekst */}
            <div className="text-center">
              <div className="text-sm font-medium">
                Runde {gossipStep} — {currentGossipState.informed.length}/{GOSSIP_NODES.length} noder informert
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">{currentGossipState.desc}</div>
            </div>

            {/* Kontroller */}
            <div className="flex gap-3">
              <button
                onClick={() => setGossipStep(0)}
                className="px-3 py-1.5 text-sm border border-[var(--card-border)] rounded-lg hover:bg-[var(--background)] transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setGossipStep(Math.min(gossipStep + 1, gossipStates[gossipVariant].length - 1))}
                disabled={gossipStep >= gossipStates[gossipVariant].length - 1}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Neste runde →
              </button>
            </div>
          </div>
        </div>

        {/* Gossip-varianter tabell */}
        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Variant</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Hvem initierer?</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Hva skjer?</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Raskhet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Push</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Infisert node P</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">P sender sin oppdatering til tilfeldig nabo Q</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-amber-600 dark:text-amber-400">Moderat</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Pull</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Uninformert node P</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">P spør tilfeldig nabo Q — hva vet du? Q svarer</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-amber-600 dark:text-amber-400">Moderat</td>
              </tr>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">Push-Pull</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Begge parter</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">P og Q utveksler begge veier — mest effektivt</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Raskest</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. SAMMENDRAG */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">6. Eksamenssammendrag</h2>

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4">
          <div className="font-semibold text-amber-700 dark:text-amber-400 mb-3">Formler du MÅ huske</div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <FormulaBox variant="gold" latex={`\\text{RDP} = \\frac{d_{\\text{overlay}}}{d_{\\text{direkte}}}`} />
              <p className="text-xs text-amber-700 dark:text-amber-400">RDP = 1 er perfekt. Lavere er bedre.</p>
            </div>
            <div className="space-y-2">
              <FormulaBox variant="gold" latex={`M_{\\text{tre}} = N-1 \\quad M_{\\text{mesh}} = \\frac{N(N-1)}{2}`} />
              <p className="text-xs text-amber-700 dark:text-amber-400">Meldinger i flooding for ulike topologier.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
          <div className="font-semibold mb-2">Nøkkelbegreper (lær disse!)</div>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            {[
              ["Overlay-nettverk", "Virtuelt nettverk over fysisk nettverk"],
              ["ALM", "Application-Level Multicast — spredning uten ruternivå-støtte"],
              ["Link stress", "Antall ganger én melding krysser samme fysiske link"],
              ["RDP / Stretch", "Overlay-forsinkelse / direkte forsinkelse"],
              ["Tree cost", "Sum av forsinkelser i overlay-treet"],
              ["Flooding", "Send til alle naboer (unngå duplikater med ID-sjekk)"],
              ["Anti-entropy", "Periodisk utveksling med tilfeldig nabo"],
              ["Rumor mongering", "Aktiv gossip til naboen slutter å høre"],
            ].map(([term, desc]) => (
              <div key={term} className="flex gap-2">
                <span className="font-medium text-blue-600 dark:text-blue-400 shrink-0">{term}:</span>
                <span className="text-[var(--muted)]">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-4/teori/4-3" className="hover:text-[var(--accent)] text-sm">
          ← 4.3 MQTT og meldingsorientert kommunikasjon
        </Link>
        <div />
      </div>
    </div>
  );
}
