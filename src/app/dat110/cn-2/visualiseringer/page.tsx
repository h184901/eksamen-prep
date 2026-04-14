"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   HTTP FLOW VISUALIZER
═══════════════════════════════════════════════════════ */
interface Message {
  label: string;
  from: "client" | "server";
  type: "tcp" | "http" | "data";
}

function HTTPFlowVisualizer() {
  const [mode, setMode] = useState<"np" | "p" | "pp">("np");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const modes: Record<string, { label: string; messages: Message[]; cost: string }> = {
    np: {
      label: "Ikke-persistent",
      messages: [
        { label: "TCP SYN", from: "client", type: "tcp" },
        { label: "TCP SYN-ACK", from: "server", type: "tcp" },
        { label: "GET /index.html", from: "client", type: "http" },
        { label: "HTTP 200 OK + HTML", from: "server", type: "data" },
        { label: "TCP FIN (lukk)", from: "client", type: "tcp" },
        { label: "TCP SYN (ny tilkobling)", from: "client", type: "tcp" },
        { label: "TCP SYN-ACK", from: "server", type: "tcp" },
        { label: "GET /bilde1.jpg", from: "client", type: "http" },
        { label: "HTTP 200 OK + Bilde", from: "server", type: "data" },
        { label: "TCP FIN (lukk)", from: "client", type: "tcp" },
      ],
      cost: "2 RTT + L/R per objekt",
    },
    p: {
      label: "Persistent (uten pipeline)",
      messages: [
        { label: "TCP SYN", from: "client", type: "tcp" },
        { label: "TCP SYN-ACK", from: "server", type: "tcp" },
        { label: "GET /index.html", from: "client", type: "http" },
        { label: "HTTP 200 OK + HTML", from: "server", type: "data" },
        { label: "GET /bilde1.jpg", from: "client", type: "http" },
        { label: "HTTP 200 OK + Bilde1", from: "server", type: "data" },
        { label: "GET /bilde2.jpg", from: "client", type: "http" },
        { label: "HTTP 200 OK + Bilde2", from: "server", type: "data" },
        { label: "TCP FIN (etter inaktivitet)", from: "server", type: "tcp" },
      ],
      cost: "2RTT + L/R (1. obj), RTT + L/R per øvrige",
    },
    pp: {
      label: "Persistent + pipelining",
      messages: [
        { label: "TCP SYN", from: "client", type: "tcp" },
        { label: "TCP SYN-ACK", from: "server", type: "tcp" },
        { label: "GET /index.html", from: "client", type: "http" },
        { label: "HTTP 200 OK + HTML", from: "server", type: "data" },
        { label: "GET /bilde1.jpg", from: "client", type: "http" },
        { label: "GET /bilde2.jpg", from: "client", type: "http" },
        { label: "GET /bilde3.jpg", from: "client", type: "http" },
        { label: "HTTP 200 OK + Bilde1", from: "server", type: "data" },
        { label: "HTTP 200 OK + Bilde2", from: "server", type: "data" },
        { label: "HTTP 200 OK + Bilde3", from: "server", type: "data" },
      ],
      cost: "2RTT + L_html/R + RTT + N*L_obj/R",
    },
  };

  const current = modes[mode];
  const maxStep = current.messages.length;

  useEffect(() => {
    setStep(0);
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= maxStep) {
            setPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return s;
          }
          return s + 1;
        });
      }, 700);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, maxStep]);

  const typeColor: Record<string, string> = {
    tcp: "bg-amber-100 dark:bg-amber-900/30 border-amber-400 text-amber-800 dark:text-amber-200",
    http: "bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-800 dark:text-blue-200",
    data: "bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-200",
  };

  return (
    <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5">
      <h3 className="font-bold mb-4">HTTP Request/Response-flyt</h3>

      <div className="flex gap-2 flex-wrap mb-4">
        {(["np", "p", "pp"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              mode === m
                ? "bg-network-500 text-white border-network-500"
                : "border-network-400 text-network-600 dark:text-network-400 hover:bg-network-100 dark:hover:bg-network-900/20"
            }`}
          >
            {modes[m].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-0 mb-4 text-center text-sm font-semibold">
        <div className="rounded-l-lg bg-blue-100 dark:bg-blue-900/30 py-2 text-blue-800 dark:text-blue-200">Klient</div>
        <div className="bg-neutral-100 dark:bg-neutral-800 py-2 text-[var(--muted)] text-xs">Nettverket</div>
        <div className="rounded-r-lg bg-green-100 dark:bg-green-900/30 py-2 text-green-800 dark:text-green-200">Server</div>
      </div>

      <div className="space-y-2 min-h-48">
        {current.messages.slice(0, step).map((msg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 ${msg.from === "client" ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className={`w-1/3 rounded border px-2 py-1 text-xs font-medium ${typeColor[msg.type]}`}>
              {msg.label}
            </div>
            <div className={`flex-1 h-0.5 relative ${msg.from === "client" ? "bg-gradient-to-r from-blue-400 to-green-400" : "bg-gradient-to-l from-blue-400 to-green-400"}`}>
              <span className={`absolute top-1/2 -translate-y-1/2 text-xs ${msg.from === "client" ? "right-0" : "left-0"}`}>
                {msg.from === "client" ? "→" : "←"}
              </span>
            </div>
            <div className="w-1/3" />
          </div>
        ))}
        {step === 0 && (
          <div className="text-center text-[var(--muted)] text-sm py-8">
            Trykk &ldquo;Spill av&rdquo; for å starte animasjonen
          </div>
        )}
        {step >= maxStep && (
          <div className="text-center text-green-600 dark:text-green-400 text-sm font-semibold py-2">
            Fullfort! Kostnad: {current.cost}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => {
            if (step >= maxStep) setStep(0);
            setPlaying((p) => !p);
          }}
          className="px-4 py-2 rounded-lg bg-network-500 text-white text-sm font-semibold hover:bg-network-600 transition-colors"
        >
          {playing ? "Pause" : step >= maxStep ? "Start på nytt" : "Spill av"}
        </button>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || playing}
          className="px-3 py-2 rounded-lg border border-[var(--card-border)] text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 disabled:opacity-40"
        >
          ← Forrige
        </button>
        <button
          onClick={() => setStep((s) => Math.min(maxStep, s + 1))}
          disabled={step >= maxStep || playing}
          className="px-3 py-2 rounded-lg border border-[var(--card-border)] text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 disabled:opacity-40"
        >
          Neste →
        </button>
        <button
          onClick={() => { setStep(0); setPlaying(false); }}
          className="px-3 py-2 rounded-lg border border-[var(--card-border)] text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
        >
          Reset
        </button>
        <span className="text-xs text-[var(--muted)] ml-auto">Steg {step}/{maxStep}</span>
      </div>

      <div className="flex gap-3 mt-3 text-xs flex-wrap">
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-200 border border-amber-400 inline-block" /> TCP-kontroll</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-200 border border-blue-400 inline-block" /> HTTP-forespørsel</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 border border-green-400 inline-block" /> HTTP-data</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DNS HIERARCHY VISUALIZER
═══════════════════════════════════════════════════════ */
function DNSLookupVisualizer() {
  const [domain, setDomain] = useState("www.hvl.no");
  const [dnsMode, setDnsMode] = useState<"iterative" | "recursive">("iterative");
  const [activeStep, setActiveStep] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const iterativeSteps = [
    { from: "Klient", to: "Lokal DNS (ISP)", msg: `Query: ${domain}?`, color: "blue", note: "Klienten spør lokal DNS-server" },
    { from: "Lokal DNS", to: "Root DNS Server", msg: ".no TLD-server adresse?", color: "amber", note: "Lokal DNS spør root om .no TLD" },
    { from: "Root DNS", to: "Lokal DNS", msg: "ns1.no: 192.33.4.12", color: "amber", note: "Root svarer: her er .no TLD-serveren" },
    { from: "Lokal DNS", to: ".no TLD Server", msg: "Autoritativ for hvl.no?", color: "purple", note: "Lokal DNS spør TLD om hvl.no" },
    { from: ".no TLD Server", to: "Lokal DNS", msg: "ns1.hvl.no: 158.37.1.1", color: "purple", note: "TLD svarer: her er hvl.no navneserver" },
    { from: "Lokal DNS", to: "ns1.hvl.no", msg: `IP for ${domain}?`, color: "green", note: "Lokal DNS spør autoritativ server" },
    { from: "ns1.hvl.no", to: "Lokal DNS", msg: "A: 158.37.70.50", color: "green", note: "Autoritativ svarer med IP-adressen (A-record)" },
    { from: "Lokal DNS", to: "Klient", msg: "158.37.70.50 (cachet)", color: "blue", note: "Lokal DNS returnerer IP, cacher svaret med TTL" },
  ];

  const recursiveSteps = [
    { from: "Klient", to: "Lokal DNS (ISP)", msg: `Query: ${domain}?`, color: "blue", note: "Klienten spør lokal DNS" },
    { from: "Lokal DNS", to: "Root DNS Server", msg: `Query: ${domain}?`, color: "amber", note: "Lokal DNS videresender til root" },
    { from: "Root DNS", to: ".no TLD Server", msg: `Query: ${domain}?`, color: "amber", note: "Root sender videre til TLD" },
    { from: ".no TLD Server", to: "ns1.hvl.no", msg: `Query: ${domain}?`, color: "purple", note: "TLD sender til autoritativ server" },
    { from: "ns1.hvl.no", to: ".no TLD Server", msg: "A: 158.37.70.50", color: "green", note: "Autoritativ svarer" },
    { from: ".no TLD Server", to: "Root DNS Server", msg: "A: 158.37.70.50", color: "purple", note: "Svar propageres tilbake" },
    { from: "Root DNS Server", to: "Lokal DNS", msg: "A: 158.37.70.50", color: "amber", note: "Svar propageres tilbake" },
    { from: "Lokal DNS", to: "Klient", msg: "158.37.70.50", color: "blue", note: "Klienten mottar IP-adressen" },
  ];

  const steps = dnsMode === "iterative" ? iterativeSteps : recursiveSteps;

  useEffect(() => {
    setActiveStep(-1);
    setAutoPlay(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [dnsMode, domain]);

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setActiveStep((s) => {
          if (s >= steps.length - 1) {
            setAutoPlay(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return s;
          }
          return s + 1;
        });
      }, 800);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, steps.length]);

  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-800 dark:text-blue-200",
    amber: "bg-amber-100 dark:bg-amber-900/30 border-amber-400 text-amber-800 dark:text-amber-200",
    purple: "bg-purple-100 dark:bg-purple-900/30 border-purple-400 text-purple-800 dark:text-purple-200",
    green: "bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-200",
  };

  return (
    <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5">
      <h3 className="font-bold mb-4">DNS-oppslagsvisualiser</h3>

      <div className="flex flex-wrap gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold block mb-1">Domene</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-sm w-48"
            placeholder="www.hvl.no"
          />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Oppslagstype</label>
          <div className="flex gap-2">
            {(["iterative", "recursive"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setDnsMode(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  dnsMode === m
                    ? "bg-network-500 text-white border-network-500"
                    : "border-network-400 text-network-600 dark:text-network-400"
                }`}
              >
                {m === "iterative" ? "Iterativt" : "Rekursivt"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DNS Hierarchy Boxes */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[
          { name: "Root DNS", icon: "🌐", desc: "13 root-servere" },
          { name: ".no TLD", icon: "🏷️", desc: "TLD-server" },
          { name: "ns1.hvl.no", icon: "🏫", desc: "Autoritativ" },
          { name: "Lokal DNS", icon: "🏠", desc: "ISP sin DNS" },
          { name: "Klient", icon: "💻", desc: "Nettleseren" },
        ].map((s) => (
          <div key={s.name} className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-2 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <p className="text-xs font-semibold leading-tight">{s.name}</p>
            <p className="text-xs text-[var(--muted)] hidden sm:block">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 min-h-48 mb-4">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg border p-3 transition-all text-sm ${
              i <= activeStep
                ? colorMap[s.color]
                : "border-[var(--card-border)] bg-[var(--card)] opacity-40"
            }`}
          >
            <span className="font-bold text-xs w-5 shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <span className="font-semibold">{s.from}</span>
              <span className="text-[var(--muted)] mx-1">→</span>
              <span className="font-semibold">{s.to}</span>
              <span className="font-mono text-xs ml-2 opacity-80">&quot;{s.msg}&quot;</span>
            </div>
            {i <= activeStep && (
              <p className="text-xs text-[var(--muted)] hidden md:block max-w-40 shrink-0">{s.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => {
            if (activeStep >= steps.length - 1) setActiveStep(-1);
            setAutoPlay((p) => !p);
          }}
          className="px-4 py-2 rounded-lg bg-network-500 text-white text-sm font-semibold hover:bg-network-600"
        >
          {autoPlay ? "Pause" : activeStep >= steps.length - 1 ? "Start på nytt" : "Spill av"}
        </button>
        <button
          onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={activeStep >= steps.length - 1 || autoPlay}
          className="px-3 py-2 rounded-lg border border-[var(--card-border)] text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50 disabled:opacity-40"
        >
          Neste →
        </button>
        <button
          onClick={() => { setActiveStep(-1); setAutoPlay(false); }}
          className="px-3 py-2 rounded-lg border border-[var(--card-border)] text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
        >
          Reset
        </button>
      </div>

      <p className="text-xs text-[var(--muted)] mt-3">
        {dnsMode === "iterative"
          ? "Iterativt: Lokal DNS gjør ALL kontakten — klienten trenger kun å spørre den lokale DNS-en."
          : "Rekursivt: Forespørselen propageres OPP, svaret propageres NED. Høy last på root-servere."}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   P2P vs CS COMPARATOR
═══════════════════════════════════════════════════════ */
function ArchitectureComparator() {
  const [numClients, setNumClients] = useState(10);
  const [fileSize, setFileSize] = useState(1000);
  const [serverUpload, setServerUpload] = useState(100);
  const [clientUpload, setClientUpload] = useState(5);
  const [clientDownload, setClientDownload] = useState(20);

  const F = fileSize;
  const u_s = serverUpload;
  const d_min = clientDownload;
  const u_peers = clientUpload * numClients;

  const D_cs = Math.max((numClients * F) / u_s, F / d_min);
  const D_p2p = Math.max(F / u_s, F / d_min, (numClients * F) / (u_s + u_peers));

  const maxTime = Math.max(D_cs, D_p2p, 1);
  const fmt = (t: number) => t >= 60 ? `${(t / 60).toFixed(1)} min` : `${t.toFixed(0)} s`;

  return (
    <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5">
      <h3 className="font-bold mb-4">P2P vs Klient-server — Distribusjonstid</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="text-xs font-semibold block mb-1">Antall klienter N: {numClients}</label>
          <input type="range" min={1} max={200} value={numClients} onChange={(e) => setNumClients(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Filstørrelse F: {fileSize} Mbit</label>
          <input type="range" min={100} max={10000} step={100} value={fileSize} onChange={(e) => setFileSize(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Server upload u_s: {serverUpload} Mbps</label>
          <input type="range" min={10} max={1000} step={10} value={serverUpload} onChange={(e) => setServerUpload(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Klient upload u_i: {clientUpload} Mbps</label>
          <input type="range" min={1} max={100} value={clientUpload} onChange={(e) => setClientUpload(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold">Klient-server</span>
            <span className="font-mono font-bold text-red-600 dark:text-red-400">{fmt(D_cs)}</span>
          </div>
          <div className="h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-red-400 dark:bg-red-600 transition-all duration-300"
              style={{ width: `${Math.min(100, (D_cs / maxTime) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-[var(--muted)] mt-1">
            max( N*F/u_s = {((numClients * F) / u_s).toFixed(0)}s,  F/d_min = {(F / d_min).toFixed(0)}s )
          </p>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold">P2P</span>
            <span className="font-mono font-bold text-green-600 dark:text-green-400">{fmt(D_p2p)}</span>
          </div>
          <div className="h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-400 dark:bg-green-600 transition-all duration-300"
              style={{ width: `${Math.min(100, (D_p2p / maxTime) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-[var(--muted)] mt-1">
            max( {(F / u_s).toFixed(0)}s,  {(F / d_min).toFixed(0)}s,  N*F/(u_s+sum_u) = {((numClients * F) / (u_s + u_peers)).toFixed(0)}s )
          </p>
        </div>
      </div>

      {D_cs > 0 && D_p2p > 0 && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${D_p2p < D_cs ? "bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700" : "bg-neutral-100 dark:bg-neutral-800/50 border border-[var(--card-border)]"}`}>
          {D_p2p < D_cs ? (
            <p>P2P er <strong>{(D_cs / D_p2p).toFixed(1)}x raskere</strong> enn klient-server med disse parameterne!</p>
          ) : (
            <p>Med lavt N og høy server-upload kan klient-server matche P2P. Okt N for a se self-scalability.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SOCKET MODEL DIAGRAM
═══════════════════════════════════════════════════════ */
function SocketDiagram() {
  const [proto, setProto] = useState<"tcp" | "udp">("tcp");

  const tcpSteps = [
    { side: "server", step: "ServerSocket(port)", desc: "Server oppretter socket og lytter pa port" },
    { side: "server", step: "accept()", desc: "Server blokkerer og venter pa klient" },
    { side: "client", step: "new Socket(host, port)", desc: "Klient initierer tilkobling" },
    { side: "both", step: "TCP 3-veis handshake", desc: "SYN, SYN-ACK, ACK automatisk" },
    { side: "server", step: "accept() returnerer Socket", desc: "Ny tilkoblingssocket opprettes for klienten" },
    { side: "both", step: "getInputStream() / getOutputStream()", desc: "Les og skriv via byte-strommer" },
    { side: "both", step: "close()", desc: "Begge sider lukker tilkoblingen" },
  ];

  const udpSteps = [
    { side: "server", step: "DatagramSocket(port)", desc: "Server oppretter socket pa port" },
    { side: "client", step: "DatagramSocket()", desc: "Klient oppretter socket (ingen port nodv.)" },
    { side: "client", step: "DatagramPacket(data, addr, port)", desc: "Klient pakker data med serveradresse" },
    { side: "client", step: "cs.send(packet)", desc: "Klient sender datagram" },
    { side: "server", step: "ss.receive(packet)", desc: "Server mottar datagram (blokkerer)" },
    { side: "server", step: "pkt.getAddress(), pkt.getPort()", desc: "Server leser klientadressen fra pakken" },
    { side: "server", step: "ss.send(reply)", desc: "Server sender svar direkte til klientadresse" },
  ];

  const steps = proto === "tcp" ? tcpSteps : udpSteps;

  const sideColor: Record<string, string> = {
    server: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700",
    client: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
    both: "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700",
  };

  const sideLabel: Record<string, string> = { server: "Server", client: "Klient", both: "Begge" };

  return (
    <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5">
      <h3 className="font-bold mb-4">Socket-programmeringsmodell</h3>

      <div className="flex gap-2 mb-4">
        {(["tcp", "udp"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setProto(p)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              proto === p
                ? "bg-network-500 text-white border-network-500"
                : "border-network-400 text-network-600 dark:text-network-400"
            }`}
          >
            {p.toUpperCase()} ({p === "tcp" ? "Socket/ServerSocket" : "DatagramSocket"})
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className={`rounded-lg border p-3 ${sideColor[s.side]}`}>
            <div className="flex items-start gap-3">
              <span className="text-xs font-bold w-5 shrink-0 mt-0.5">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    s.side === "server" ? "bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200" :
                    s.side === "client" ? "bg-green-200 dark:bg-green-800/50 text-green-800 dark:text-green-200" :
                    "bg-purple-200 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200"
                  }`}>
                    {sideLabel[s.side]}
                  </span>
                  <code className="font-mono text-xs font-semibold">{s.step}</code>
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 p-3 text-xs">
        <p className="font-bold mb-1">Nøkkelforskjell:</p>
        {proto === "tcp" ? (
          <p>TCP etablerer en <strong>tilkobling</strong> (logisk rør) som varer hele sesjonen. Data flyter via strommer — ingen adressering per melding.</p>
        ) : (
          <p>UDP sender <strong>diskrete datagrammer</strong>. Hver pakke er selvstendig og inneholder adresseinformasjon. Ingen tilkobling opprettes.</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function CN2VisualisationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Visualiseringer: Applikasjonslaget</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        Interaktive diagrammer for HTTP-flyt, DNS-oppslag, P2P-distribusjon og socket-programmering
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-3 text-network-700 dark:text-network-300">
            1. HTTP Request/Response-flyt
          </h2>
          <p className="text-sm text-[var(--muted)] mb-3">
            Se hva som skjer steg for steg for ulike HTTP-modi. Merk antall TCP-handshakes og
            meldinger for ikke-persistent vs. persistent med/uten pipelining.
          </p>
          <HTTPFlowVisualizer />
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-network-700 dark:text-network-300">
            2. DNS-hierarki og oppslag
          </h2>
          <p className="text-sm text-[var(--muted)] mb-3">
            Visualiser iterativt vs. rekursivt DNS-oppslag steg for steg. Prøv egne domenenavn.
          </p>
          <DNSLookupVisualizer />
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-network-700 dark:text-network-300">
            3. P2P vs. klient-server distribusjonstid
          </h2>
          <p className="text-sm text-[var(--muted)] mb-3">
            Juster parameterne og se self-scalability i aksjon. Øk N og observer at
            klient-server-tid vokser lineært mens P2P-tid vokser mye saktere.
          </p>
          <ArchitectureComparator />
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-network-700 dark:text-network-300">
            4. Socket-programmeringsmodell
          </h2>
          <p className="text-sm text-[var(--muted)] mb-3">
            Steg-for-steg oversikt over TCP og UDP socket-programmering i Java.
            Se hvilke klasser som brukes og hva hvert steg gjør.
          </p>
          <SocketDiagram />
        </section>
      </div>
    </div>
  );
}
