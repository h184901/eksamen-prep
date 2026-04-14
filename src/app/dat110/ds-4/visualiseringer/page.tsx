"use client";

import { useState, useEffect } from "react";

// ────────────────────────────────────────────────────────────────────────────
// RPC Flow Visualisation
// ────────────────────────────────────────────────────────────────────────────

type RpcMode = "sync" | "async" | "deferred";

const RPC_MODES: { key: RpcMode; label: string; color: string }[] = [
  { key: "sync", label: "Synkron RPC", color: "bg-blue-600" },
  { key: "async", label: "Asynkron RPC", color: "bg-purple-600" },
  { key: "deferred", label: "Deferred Synchronous", color: "bg-cyan-600" },
];

type Step = {
  from: "client" | "network" | "server";
  to: "client" | "network" | "server";
  label: string;
  color: string;
  clientBlocked?: boolean;
};

const RPC_STEPS: Record<RpcMode, Step[]> = {
  sync: [
    { from: "client", to: "network", label: "1. Kall — marshall params", color: "#3b82f6", clientBlocked: true },
    { from: "network", to: "server", label: "2. Lever forespørsel", color: "#3b82f6", clientBlocked: true },
    { from: "server", to: "network", label: "3. Utfør + marshall svar", color: "#22c55e", clientBlocked: true },
    { from: "network", to: "client", label: "4. Lever svar — unmarshall", color: "#22c55e", clientBlocked: false },
  ],
  async: [
    { from: "client", to: "network", label: "1. Kall — marshall params", color: "#a855f7", clientBlocked: false },
    { from: "network", to: "server", label: "2. Lever forespørsel (ACK tilbake)", color: "#a855f7", clientBlocked: false },
    { from: "server", to: "server", label: "3. Server utfører (klient vet ikke)", color: "#f59e0b", clientBlocked: false },
  ],
  deferred: [
    { from: "client", to: "network", label: "1. Kall — marshall params", color: "#06b6d4", clientBlocked: false },
    { from: "network", to: "server", label: "2. Lever forespørsel", color: "#06b6d4", clientBlocked: false },
    { from: "server", to: "network", label: "3. Marshall svar til kø", color: "#22c55e", clientBlocked: false },
    { from: "network", to: "client", label: "4. Klient poller / callback", color: "#22c55e", clientBlocked: false },
  ],
};

const RPC_DESCRIPTIONS: Record<RpcMode, string> = {
  sync: "Klienten blokkerer (venter) til serveren returnerer svaret. Enkelt å programmere, men klienten er passiv mens den venter.",
  async: "Klienten sender kallet og fortsetter straks. Ingen svar returneres — klienten må selv sjekke status (polling) eller bruke events.",
  deferred: "Klienten sender og fortsetter. Serveren legger svaret i en kø. Klienten aksepterer leveringen på et passende tidspunkt.",
};

function BoxLabel({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 px-4 py-2 text-center min-w-[110px]">
        <div className="font-bold text-sm text-blue-800 dark:text-blue-200">{label}</div>
        <div className="text-xs text-blue-600 dark:text-blue-400">{sub}</div>
      </div>
    </div>
  );
}

function RpcVisualisation() {
  const [mode, setMode] = useState<RpcMode>("sync");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [running, setRunning] = useState(false);

  const steps = RPC_STEPS[mode];

  function getPos(actor: "client" | "network" | "server") {
    if (actor === "client") return 60;
    if (actor === "network") return 260;
    return 460;
  }

  function runAnimation() {
    setRunning(true);
    setActiveStep(0);
  }

  useEffect(() => {
    if (!running) return;
    if (activeStep >= steps.length) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [running, activeStep, steps.length]);

  function reset() {
    setRunning(false);
    setActiveStep(-1);
  }

  const clientBlocked = running && activeStep >= 0 && activeStep < steps.length && steps[activeStep]?.clientBlocked;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {RPC_MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); reset(); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold text-white transition-all ${
              mode === m.key ? m.color + " ring-2 ring-offset-1 ring-blue-400" : "bg-gray-400 dark:bg-gray-600"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-[var(--muted)] mb-4 italic">{RPC_DESCRIPTIONS[mode]}</p>

      {/* SVG Diagram */}
      <div className="overflow-x-auto">
        <svg width="540" height="260" className="block mx-auto">
          {/* Lifelines */}
          <line x1={60} y1={40} x2={60} y2={220} stroke="#60a5fa" strokeWidth={2} strokeDasharray="6,4" />
          <line x1={260} y1={40} x2={260} y2={220} stroke="#94a3b8" strokeWidth={2} strokeDasharray="6,4" />
          <line x1={460} y1={40} x2={460} y2={220} stroke="#60a5fa" strokeWidth={2} strokeDasharray="6,4" />

          {/* Actor boxes */}
          <foreignObject x={5} y={4} width={110} height={44}>
            <div className="flex flex-col items-center">
              <div className="rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950 px-2 py-1 text-center w-full">
                <div className="font-bold text-xs text-blue-800 dark:text-blue-200">Klient</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400">+ klient-stub</div>
              </div>
            </div>
          </foreignObject>
          <foreignObject x={205} y={4} width={110} height={44}>
            <div className="flex flex-col items-center">
              <div className="rounded-lg border-2 border-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 text-center w-full">
                <div className="font-bold text-xs text-gray-700 dark:text-gray-200">Nettverk</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">TCP/UDP</div>
              </div>
            </div>
          </foreignObject>
          <foreignObject x={405} y={4} width={110} height={44}>
            <div className="flex flex-col items-center">
              <div className="rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950 px-2 py-1 text-center w-full">
                <div className="font-bold text-xs text-blue-800 dark:text-blue-200">Server</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400">+ server-stub</div>
              </div>
            </div>
          </foreignObject>

          {/* Client blocked indicator */}
          {clientBlocked && (
            <rect x={45} y={50} width={30} height={160} rx={4} fill="#3b82f6" opacity={0.18} />
          )}

          {/* Steps */}
          {steps.map((step, i) => {
            const visible = activeStep > i || (!running && activeStep === -1);
            const active = activeStep === i;
            if (!visible && !active) return null;
            const y = 70 + i * 45;
            const x1 = getPos(step.from);
            const x2 = getPos(step.to);
            const isSelf = step.from === step.to;
            const goRight = x2 > x1;

            return (
              <g key={i}>
                {isSelf ? (
                  <>
                    <path
                      d={`M ${x1} ${y} Q ${x1 + 50} ${y - 20} ${x1} ${y + 20}`}
                      fill="none"
                      stroke={step.color}
                      strokeWidth={active ? 3 : 2}
                      opacity={active ? 1 : 0.65}
                      markerEnd="url(#arrow)"
                    />
                  </>
                ) : (
                  <line
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke={step.color}
                    strokeWidth={active ? 3 : 2}
                    opacity={active ? 1 : 0.65}
                    markerEnd={goRight ? "url(#arrowRight)" : "url(#arrowLeft)"}
                  />
                )}
                <text
                  x={(x1 + x2) / 2}
                  y={y - 7}
                  textAnchor="middle"
                  fontSize={10}
                  fill={active ? step.color : "#94a3b8"}
                  fontWeight={active ? "bold" : "normal"}
                >
                  {step.label}
                </text>
              </g>
            );
          })}

          {/* Arrow markers */}
          <defs>
            <marker id="arrowRight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#60a5fa" />
            </marker>
            <marker id="arrowLeft" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
              <path d="M8,0 L8,6 L0,3 z" fill="#22c55e" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="flex gap-3 mt-4 justify-center">
        <button
          onClick={runAnimation}
          disabled={running}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Animer steg for steg
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          Tilbakestill
        </button>
      </div>

      {/* Step legend */}
      <div className="mt-4 space-y-1.5">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 text-sm px-3 py-1.5 rounded-lg transition-all ${
              activeStep === i
                ? "bg-blue-100 dark:bg-blue-950/40 font-semibold"
                : activeStep > i || activeStep === -1
                ? "opacity-70"
                : "opacity-30"
            }`}
          >
            <span
              className="mt-0.5 w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: step.color }}
            />
            <span>{step.label}</span>
            {step.clientBlocked && (
              <span className="ml-auto text-xs text-blue-500 font-normal">klient blokkert</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// MQTT Pub/Sub Visualisation
// ────────────────────────────────────────────────────────────────────────────

type MqttQoS = 0 | 1 | 2;

const QOS_DESCRIPTIONS: Record<MqttQoS, { label: string; guarantee: string; steps: string[]; color: string }> = {
  0: {
    label: "QoS 0 — Fire and Forget",
    guarantee: "At-most-once",
    steps: [
      "Publisher sender PUBLISH",
      "Broker mottar (ingen bekreftelse)",
      "Subscriber mottar (kan miste melding!)",
    ],
    color: "#f59e0b",
  },
  1: {
    label: "QoS 1 — At least once",
    guarantee: "At-least-once",
    steps: [
      "Publisher sender PUBLISH (DUP=0)",
      "Broker svarer PUBACK",
      "Subscriber mottar melding",
      "Broker sender PUBLISH til subscriber",
      "Subscriber sender PUBACK",
    ],
    color: "#3b82f6",
  },
  2: {
    label: "QoS 2 — Exactly once",
    guarantee: "Exactly-once",
    steps: [
      "Publisher sender PUBLISH",
      "Broker svarer PUBREC",
      "Publisher sender PUBREL",
      "Broker svarer PUBCOMP + leverer til subscriber",
    ],
    color: "#22c55e",
  },
};

function MqttVisualisation() {
  const [qos, setQos] = useState<MqttQoS>(1);
  const [topic, setTopic] = useState("sensor/temp");
  const [payload, setPayload] = useState("23.5°C");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const cfg = QOS_DESCRIPTIONS[qos];

  useEffect(() => {
    if (!running) return;
    if (step >= cfg.steps.length) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 800);
    return () => clearTimeout(t);
  }, [running, step, cfg.steps.length]);

  function start() {
    setStep(0);
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setStep(-1);
  }

  return (
    <div>
      {/* Controls */}
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] block mb-1">QoS-nivå</label>
          <div className="flex gap-2">
            {([0, 1, 2] as MqttQoS[]).map((q) => (
              <button
                key={q}
                onClick={() => { setQos(q); reset(); }}
                className={`flex-1 py-1.5 rounded-lg text-sm font-bold border-2 transition-all ${
                  qos === q
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                    : "border-gray-200 dark:border-gray-700 text-[var(--muted)]"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] block mb-1">Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-3 py-1.5 text-sm font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] block mb-1">Payload</label>
          <input
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-3 py-1.5 text-sm font-mono"
          />
        </div>
      </div>

      <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3 mb-5 text-sm">
        <span className="font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
        <span className="ml-2 text-[var(--muted)]">Garanti: {cfg.guarantee}</span>
      </div>

      {/* Three actors */}
      <div className="flex items-stretch gap-0 mb-4">
        {/* Publisher */}
        <div className="flex flex-col items-center flex-1">
          <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-center w-full">
            <div className="font-bold text-sm text-yellow-800 dark:text-yellow-300">Publisher</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 font-mono truncate">{topic}</div>
            <div className="text-xs text-yellow-700 dark:text-yellow-300 mt-0.5 font-mono truncate">{payload}</div>
          </div>
        </div>

        {/* Arrow Publisher → Broker */}
        <div className="flex flex-col justify-center px-2 text-center text-xs text-[var(--muted)]">
          <div className="text-lg">→</div>
        </div>

        {/* Broker */}
        <div className="flex flex-col items-center flex-1">
          <div className="rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20 px-3 py-2 text-center w-full">
            <div className="font-bold text-sm text-blue-800 dark:text-blue-200">Broker</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">MQTT-server</div>
            <div className="text-xs text-blue-500 mt-0.5">QoS {qos}</div>
          </div>
        </div>

        {/* Arrow Broker → Subscriber */}
        <div className="flex flex-col justify-center px-2 text-center text-xs text-[var(--muted)]">
          <div className="text-lg">→</div>
        </div>

        {/* Subscriber */}
        <div className="flex flex-col items-center flex-1">
          <div className="rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-2 text-center w-full">
            <div className="font-bold text-sm text-green-800 dark:text-green-200">Subscriber</div>
            <div className="text-xs text-green-600 dark:text-green-400 font-mono truncate">{topic}</div>
            <div className="text-xs text-green-500 mt-0.5">abonnent</div>
          </div>
        </div>
      </div>

      {/* Step timeline */}
      <div className="space-y-1.5 mb-4">
        {cfg.steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition-all ${
              step > i || step === -1
                ? "border-transparent opacity-60"
                : step === i
                ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30 font-semibold opacity-100"
                : "border-transparent opacity-25"
            }`}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: step >= i || step === -1 ? cfg.color : "#9ca3af" }}
            >
              {i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={start}
          disabled={running}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Animer QoS {qos}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          Tilbakestill
        </button>
      </div>

      {/* QoS comparison mini-table */}
      <div className="mt-5 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <h4 className="font-bold text-sm mb-3">Hurtigsammenlikning — QoS-nivåer</h4>
        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="py-1.5 pr-4 text-left font-semibold">Egenskap</th>
                <th className="py-1.5 pr-4 text-center font-semibold text-yellow-600 dark:text-yellow-400">QoS 0</th>
                <th className="py-1.5 pr-4 text-center font-semibold text-blue-600 dark:text-blue-400">QoS 1</th>
                <th className="py-1.5 text-center font-semibold text-green-600 dark:text-green-400">QoS 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {[
                ["Garanti", "At-most-once", "At-least-once", "Exactly-once"],
                ["Duplikater mulig?", "Nei", "Ja", "Nei"],
                ["Lagring i broker?", "Nei", "Ja (til PUBACK)", "Ja (til PUBCOMP)"],
                ["Meldingsflyt", "1 melding", "2 meldinger", "4 meldinger"],
                ["Typisk bruk", "Sensor-logg", "Kommandoer", "Betalinger"],
              ].map(([prop, q0, q1, q2]) => (
                <tr key={prop}>
                  <td className="py-1.5 pr-4 font-medium text-[var(--muted)]">{prop}</td>
                  <td className="py-1.5 pr-4 text-center">{q0}</td>
                  <td className="py-1.5 pr-4 text-center">{q1}</td>
                  <td className="py-1.5 text-center">{q2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// RDP (Relative Delay Penalty) Interactive Calculator
// ────────────────────────────────────────────────────────────────────────────

type NodeId = "A" | "B" | "C" | "D";

interface DelayPair {
  from: NodeId;
  to: NodeId;
  overlay: number;
  physical: number;
}

const DEFAULT_PAIRS: DelayPair[] = [
  { from: "A", to: "B", overlay: 30, physical: 20 },
  { from: "A", to: "C", overlay: 80, physical: 50 },
  { from: "B", to: "C", overlay: 73, physical: 47 },
  { from: "A", to: "D", overlay: 120, physical: 90 },
];

function RdpCalculator() {
  const [pairs, setPairs] = useState<DelayPair[]>(DEFAULT_PAIRS);

  function update(idx: number, field: keyof DelayPair, value: string) {
    const next = pairs.map((p, i) => {
      if (i !== idx) return p;
      const num = parseFloat(value);
      return { ...p, [field]: isNaN(num) ? 0 : num };
    });
    setPairs(next);
  }

  function getRdp(p: DelayPair) {
    if (p.physical === 0) return null;
    return p.overlay / p.physical;
  }

  function getRdpColor(rdp: number | null) {
    if (rdp === null) return "text-gray-400";
    if (rdp <= 1.2) return "text-green-600 dark:text-green-400";
    if (rdp <= 1.8) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }

  function getRdpLabel(rdp: number | null) {
    if (rdp === null) return "—";
    if (rdp <= 1.2) return "Bra";
    if (rdp <= 1.8) return "Akseptabelt";
    return "Dårlig";
  }

  const avgRdp =
    pairs.reduce((acc, p) => {
      const r = getRdp(p);
      return r !== null ? acc + r : acc;
    }, 0) / pairs.filter((p) => p.physical > 0).length;

  return (
    <div>
      <p className="text-sm text-[var(--muted)] mb-4">
        RDP = D<sub>overlay</sub> / D<sub>nettverk</sub>. Skriv inn forsinkelser for hvert nodepar og se RDP beregnet live.
        Lavere er bedre — RDP = 1.0 betyr overlay er like effektivt som fysisk nett.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--card-border)]">
              <th className="py-2 pr-3 text-left font-semibold">Fra → Til</th>
              <th className="py-2 pr-3 text-left font-semibold">Overlay (ms)</th>
              <th className="py-2 pr-3 text-left font-semibold">Fysisk (ms)</th>
              <th className="py-2 pr-3 text-center font-semibold">RDP</th>
              <th className="py-2 text-center font-semibold">Vurdering</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            {pairs.map((p, i) => {
              const rdp = getRdp(p);
              const rdpStr = rdp !== null ? rdp.toFixed(2) : "—";
              const color = getRdpColor(rdp);
              return (
                <tr key={i}>
                  <td className="py-2 pr-3 font-mono font-bold">
                    {p.from} → {p.to}
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={0}
                      value={p.overlay}
                      onChange={(e) => update(i, "overlay", e.target.value)}
                      className="w-20 rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-2 py-1 text-sm text-center"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="number"
                      min={0}
                      value={p.physical}
                      onChange={(e) => update(i, "physical", e.target.value)}
                      className="w-20 rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-2 py-1 text-sm text-center"
                    />
                  </td>
                  <td className={`py-2 pr-3 text-center font-bold font-mono text-lg ${color}`}>
                    {rdpStr}
                  </td>
                  <td className={`py-2 text-center text-xs font-semibold ${color}`}>
                    {getRdpLabel(rdp)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Gjennomsnittlig RDP</span>
          <span className={`text-2xl font-bold font-mono ${getRdpColor(isNaN(avgRdp) ? null : avgRdp)}`}>
            {isNaN(avgRdp) ? "—" : avgRdp.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 text-xs text-[var(--muted)]">
          RDP ≤ 1.2 = bra (grønn) · 1.2–1.8 = akseptabelt (gul) · &gt;1.8 = dårlig (rød)
        </div>
      </div>

      {/* Link Stress explainer */}
      <div className="mt-4 rounded-xl border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/20 p-4">
        <h4 className="font-bold text-cyan-800 dark:text-cyan-300 mb-2">Link Stress — relatert konsept</h4>
        <p className="text-sm text-cyan-900 dark:text-cyan-200 mb-2">
          Link stress teller <strong>hvor mange ganger overlay-meldingen krysser samme fysiske lenke</strong>.
          Stress = 1 er optimalt; høyere betyr unødvendig belastning på nettet.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-white dark:bg-gray-900 p-3">
            <div className="font-bold mb-1">Eksempel: Stress = 1</div>
            <div className="font-mono text-gray-600 dark:text-gray-400">
              A → B → C: lenken A–B krysses 1 gang<br/>
              Hver fysisk lenke brukes nøyaktig én gang
            </div>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-900 p-3">
            <div className="font-bold mb-1">Eksempel: Stress = 2</div>
            <div className="font-mono text-gray-600 dark:text-gray-400">
              A → B → C → B → D: lenken B–C krysses 2 ganger<br/>
              Overlay-ruten er suboptimal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Gossip Anti-Entropy Simulator
// ────────────────────────────────────────────────────────────────────────────

type GossipModel = "pull" | "push" | "pushpull";

function GossipSimulator() {
  const [n, setN] = useState(1000);
  const [infected0, setInfected0] = useState(400);
  const [rounds, setRounds] = useState(5);
  const [model, setModel] = useState<GossipModel>("push");

  function simulate(): number[] {
    const result: number[] = [infected0 / n];
    let p = infected0 / n;
    for (let i = 0; i < rounds; i++) {
      if (model === "pull") {
        p = p * p;
      } else if (model === "push") {
        p = p * (1 - (1 / n)) ** (n * (1 - p));
        // Approximation: p_{i+1} = p_i * (1 - 1/n)^(n*(1-p_i))
        // Better: fraction remaining is (1 - p/n)^n ≈ e^(-p)
        // Use exact: fraction NOT reached = (1 - p_i)^(contacted)
        // Standard formula for push: p_{i+1} = 1 - (1-p_i)^... use simple recurrence
        // Recompute with correct push formula: remaining = (1-p_i/n)^(n*p_i)
        // Standard result: new_not_infected = (1 - p_i)^(n * p_i / n) per node
        // Simplest accurate: p_{i+1} = p_i + (1-p_i)*(1 - (1-p_i/n)^(n*p_i))
        // Use well-known: s_{i+1} = s_i * e^(-p_i) where s = 1-p (susceptible fraction)
        const s = 1 - result[result.length - 1];
        const new_s = s * Math.exp(-result[result.length - 1]);
        p = 1 - new_s;
      } else {
        // push-pull: combine both
        const p_pull = result[result.length - 1] ** 2;
        const s = 1 - result[result.length - 1];
        const new_s = s * Math.exp(-result[result.length - 1]);
        const p_push = 1 - new_s;
        p = p_push * (1 - (1 - p_pull));
        p = Math.max(p_push, p_pull); // push-pull is faster: use max
      }
      p = Math.min(1, Math.max(0, p));
      result.push(p);
    }
    return result;
  }

  const data = simulate();
  const maxBarWidth = 280;

  const modelLabels: Record<GossipModel, string> = {
    pull: "Pull (p_{i+1} = p_i²)",
    push: "Push (s_{i+1} = s_i · e^(−p_i))",
    pushpull: "Push-Pull (kombinert)",
  };

  return (
    <div>
      <p className="text-sm text-[var(--muted)] mb-4">
        Simuler spredning av oppdatert data i et gossip-nettverk.
        p = andel noder som har siste versjon (infective).
        Anti-entropy: hvert steg velger noder tilfeldige partnere og synkroniserer.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] block mb-1">Antall noder (n)</label>
          <input
            type="number"
            min={10}
            max={10000}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value) || 1000)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] block mb-1">Infiserte ved start</label>
          <input
            type="number"
            min={1}
            max={n}
            value={infected0}
            onChange={(e) => setInfected0(parseInt(e.target.value) || 1)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] block mb-1">Antall runder</label>
          <input
            type="number"
            min={1}
            max={20}
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value) || 5)}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-[var(--card)] px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {(["pull", "push", "pushpull"] as GossipModel[]).map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all ${
              model === m
                ? "border-blue-500 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-700 text-[var(--muted)]"
            }`}
          >
            {m === "pull" ? "Pull" : m === "push" ? "Push" : "Push-Pull"}
          </button>
        ))}
      </div>

      <div className="text-xs text-[var(--muted)] mb-4 italic">{modelLabels[model]}</div>

      {/* Bar chart */}
      <div className="space-y-3">
        {data.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="text-xs font-mono text-[var(--muted)] w-12 text-right">
              {i === 0 ? "Start" : `Runde ${i}`}
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative h-7 flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg transition-all duration-500"
                  style={{
                    width: `${(p * 100).toFixed(1)}%`,
                    backgroundColor: p > 0.95 ? "#22c55e" : p > 0.7 ? "#3b82f6" : p > 0.4 ? "#f59e0b" : "#ef4444",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                  {(p * 100).toFixed(1)}%
                </div>
              </div>
              <div className="text-xs font-mono w-24 text-right text-[var(--muted)]">
                ≈ {Math.round(p * n).toLocaleString()} / {n.toLocaleString()} noder
              </div>
            </div>
          </div>
        ))}
      </div>

      {data[data.length - 1] > 0.999 && (
        <div className="mt-4 rounded-lg border border-green-400 bg-green-50 dark:bg-green-950/20 p-3 text-sm text-green-800 dark:text-green-200">
          Alle noder er oppdatert etter {rounds} runde{rounds !== 1 ? "r" : ""}!
        </div>
      )}

      <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
        <h4 className="font-bold text-sm mb-2">Forklaringer</h4>
        <div className="space-y-1 text-xs text-[var(--muted)]">
          <div><strong>Pull:</strong> Susceptible noder spør infective noder. Konvergerer saktere i starten, raskere mot slutten.</div>
          <div><strong>Push:</strong> Infective noder forteller susceptible. Rask i starten, saktere mot slutten (vanskelig å nå de siste nodene).</div>
          <div><strong>Push-Pull:</strong> Begge strategier kombinert — raskest total konvergens.</div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────────────────────────────────

type Tab = "rpc" | "mqtt" | "rdp" | "gossip";

const TABS: { key: Tab; label: string }[] = [
  { key: "rpc", label: "RPC-flyt" },
  { key: "mqtt", label: "MQTT Pub/Sub" },
  { key: "rdp", label: "RDP-kalkulator" },
  { key: "gossip", label: "Gossip-simulator" },
];

export default function DS4VisualiseringerPage() {
  const [tab, setTab] = useState<Tab>("rpc");

  return (
    <div>
      {/* Tab nav */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
              tab === t.key
                ? "border-blue-500 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-700 text-[var(--muted)] hover:border-blue-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 md:p-7">
        {tab === "rpc" && (
          <>
            <h2 className="font-bold text-xl mb-1">RPC-kallflyt</h2>
            <p className="text-sm text-[var(--muted)] mb-5">
              Se flyten mellom klient-stub, nettverk og server-stub for de tre RPC-stilene.
              Klikk &laquo;Animer&raquo; for å se meldingene bevege seg steg for steg.
            </p>
            <RpcVisualisation />
          </>
        )}

        {tab === "mqtt" && (
          <>
            <h2 className="font-bold text-xl mb-1">MQTT Publish/Subscribe</h2>
            <p className="text-sm text-[var(--muted)] mb-5">
              Se hvordan en publisher sender til broker og broker videreformidler til subscribers,
              med ulike QoS-nivåer og handshake-protokoller.
            </p>
            <MqttVisualisation />
          </>
        )}

        {tab === "rdp" && (
          <>
            <h2 className="font-bold text-xl mb-1">RDP-kalkulator</h2>
            <p className="text-sm text-[var(--muted)] mb-5">
              Skriv inn overlay- og fysisk forsinkelse for nodepar. RDP beregnes live.
              Inkluderer link stress-forklaring.
            </p>
            <RdpCalculator />
          </>
        )}

        {tab === "gossip" && (
          <>
            <h2 className="font-bold text-xl mb-1">Gossip Anti-Entropy Simulator</h2>
            <p className="text-sm text-[var(--muted)] mb-5">
              Simuler spredning av oppdatert data med Push, Pull eller Push-Pull.
              Endre parametere og se konvergenshastigheten endre seg live.
            </p>
            <GossipSimulator />
          </>
        )}
      </div>

      {/* Eksamenstips */}
      <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Eksamenstips — visualiseringer</h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ RPC-flyt: eksamen spør ofte hvilken stil (sync/async/deferred) som passer best for en gitt situasjon</li>
          <li>▸ MQTT QoS: merk at QoS 1 kan gi duplikater — viktig distinksjon fra QoS 2</li>
          <li>▸ RDP: formelen er enkel, men husk at lavere RDP = bedre (1.0 er ideelt, &gt;2 er dårlig)</li>
          <li>▸ Gossip: push er rask i starten men treg mot slutten — derav preferansen for push-pull</li>
        </ul>
      </div>
    </div>
  );
}
