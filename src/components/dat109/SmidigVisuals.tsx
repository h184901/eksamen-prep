"use client";

/* ═══════════════════════════════════════════════
   Interaktive SVG-visualiseringer for DAT109 Scrum / Smidig
   ═══════════════════════════════════════════════ */

import { useState } from "react";

/* ── Felles fargevariabler ── */
const C = {
  stroke: "currentColor",
  textFill: "currentColor",
  // Faseroller
  planning: "#3b82f6",   // blue-500
  daily: "#22c55e",      // green-500
  review: "#f97316",     // orange-500
  retro: "#a855f7",      // purple-500
  // Generelle
  cardFill: "#f8fafc",   // slate-50
  cardStroke: "#94a3b8", // slate-400
  arrow: "#334155",      // slate-700
  warn: "#ef4444",       // red-500
  ok: "#22c55e",         // green-500
  ideal: "#94a3b8",      // slate-400
  actual: "#a855f7",     // purple-500
};

/* ── Stick figure (lik UmlDiagrams.tsx) ── */
function StickFigure({
  x,
  y,
  label,
  color = C.planning,
  scale = 1,
}: {
  x: number;
  y: number;
  label: string;
  color?: string;
  scale?: number;
}) {
  const r = 8 * scale;
  const bodyTop = y - 12 * scale;
  const bodyBot = y + 8 * scale;
  const armY = y - 4 * scale;
  const armSpread = 12 * scale;
  const legSpread = 10 * scale;
  const legBot = y + 22 * scale;
  return (
    <g>
      <circle cx={x} cy={y - 20 * scale} r={r} fill="none" stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={bodyTop} x2={x} y2={bodyBot} stroke={color} strokeWidth={1.5} />
      <line x1={x - armSpread} y1={armY} x2={x + armSpread} y2={armY} stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={bodyBot} x2={x - legSpread} y2={legBot} stroke={color} strokeWidth={1.5} />
      <line x1={x} y1={bodyBot} x2={x + legSpread} y2={legBot} stroke={color} strokeWidth={1.5} />
      <text
        x={x}
        y={legBot + 14}
        textAnchor="middle"
        fontSize={11 * scale}
        fill={color}
        fontWeight={600}
      >
        {label}
      </text>
    </g>
  );
}

/* ═══════════════════════════════════════════════
   1. SprintFlowSvg — interaktiv sprintflyt
   ═══════════════════════════════════════════════ */

type Phase = "planning" | "daily" | "review" | "retro";

const phaseInfo: Record<
  Phase,
  { title: string; color: string; tidsboks: string; beskrivelse: string }
> = {
  planning: {
    title: "Sprint Planning",
    color: C.planning,
    tidsboks: "Maks 8 timer (4-ukers sprint)",
    beskrivelse:
      "Hele Scrum-teamet planlegger sprinten. Velger oppgaver fra Product Backlog og lager Sprint Backlog. Definerer sprintmålet.",
  },
  daily: {
    title: "Daily Scrum",
    color: C.daily,
    tidsboks: "Maks 15 minutter, hver dag",
    beskrivelse:
      "Kort daglig statusmøte for utviklingsteamet. Tre spørsmål: Hva gjorde jeg? Hva skal jeg gjøre? Hva blokkerer meg?",
  },
  review: {
    title: "Sprint Review",
    color: C.review,
    tidsboks: "Maks 4 timer",
    beskrivelse:
      "Demo av inkrementet for Produkteier og interessenter. Gir tilbakemelding som påvirker Product Backlog.",
  },
  retro: {
    title: "Sprint Retrospective",
    color: C.retro,
    tidsboks: "Maks 3 timer",
    beskrivelse:
      "Hele teamet reflekterer: Hva gikk bra? Hva gikk dårlig? Hva kan vi forbedre til neste sprint?",
  },
};

export function SprintFlowSvg() {
  const [valgt, setValgt] = useState<Phase>("planning");
  const dailyCount = 10;
  const v = phaseInfo[valgt];

  return (
    <div>
      <svg
        viewBox="0 0 760 200"
        className="w-full mx-auto"
        role="img"
        aria-label="Interaktiv sprintflyt"
      >
        {/* Tidslinje-bakgrunn */}
        <rect
          x={20}
          y={70}
          width={720}
          height={50}
          fill="none"
          stroke={C.cardStroke}
          strokeWidth={1}
          strokeDasharray="4 3"
          rx={6}
        />
        <text
          x={380}
          y={45}
          textAnchor="middle"
          fontSize={11}
          fill={C.textFill}
          fontWeight={600}
        >
          Sprint-tidsboks: 4 uker
        </text>

        {/* Planning */}
        <g
          onClick={() => setValgt("planning")}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={30}
            y={80}
            width={90}
            height={30}
            rx={6}
            fill={valgt === "planning" ? phaseInfo.planning.color : "white"}
            stroke={phaseInfo.planning.color}
            strokeWidth={valgt === "planning" ? 2.5 : 1.5}
          />
          <text
            x={75}
            y={100}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill={valgt === "planning" ? "white" : phaseInfo.planning.color}
          >
            Planning
          </text>
        </g>
        <line x1={120} y1={95} x2={140} y2={95} stroke={C.arrow} strokeWidth={1.5} />
        <polygon points="140,95 134,91 134,99" fill={C.arrow} />

        {/* Daily standup ×10 */}
        {Array.from({ length: dailyCount }).map((_, i) => {
          const cx = 160 + i * 38;
          return (
            <g
              key={i}
              onClick={() => setValgt("daily")}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={cx}
                cy={95}
                r={12}
                fill={valgt === "daily" ? phaseInfo.daily.color : "white"}
                stroke={phaseInfo.daily.color}
                strokeWidth={valgt === "daily" ? 2 : 1.5}
              />
              <text
                x={cx}
                y={99}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={valgt === "daily" ? "white" : phaseInfo.daily.color}
              >
                D{i + 1}
              </text>
            </g>
          );
        })}
        <text
          x={160 + (dailyCount * 38) / 2 - 19}
          y={140}
          textAnchor="middle"
          fontSize={10}
          fill={phaseInfo.daily.color}
          fontWeight={600}
        >
          Daily Scrum (15 min hver dag)
        </text>

        <line x1={555} y1={95} x2={575} y2={95} stroke={C.arrow} strokeWidth={1.5} />
        <polygon points="575,95 569,91 569,99" fill={C.arrow} />

        {/* Review */}
        <g onClick={() => setValgt("review")} style={{ cursor: "pointer" }}>
          <rect
            x={580}
            y={80}
            width={75}
            height={30}
            rx={6}
            fill={valgt === "review" ? phaseInfo.review.color : "white"}
            stroke={phaseInfo.review.color}
            strokeWidth={valgt === "review" ? 2.5 : 1.5}
          />
          <text
            x={617}
            y={100}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill={valgt === "review" ? "white" : phaseInfo.review.color}
          >
            Review
          </text>
        </g>
        <line x1={655} y1={95} x2={670} y2={95} stroke={C.arrow} strokeWidth={1.5} />
        <polygon points="670,95 664,91 664,99" fill={C.arrow} />

        {/* Retro */}
        <g onClick={() => setValgt("retro")} style={{ cursor: "pointer" }}>
          <rect
            x={672}
            y={80}
            width={68}
            height={30}
            rx={6}
            fill={valgt === "retro" ? phaseInfo.retro.color : "white"}
            stroke={phaseInfo.retro.color}
            strokeWidth={valgt === "retro" ? 2.5 : 1.5}
          />
          <text
            x={706}
            y={100}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill={valgt === "retro" ? "white" : phaseInfo.retro.color}
          >
            Retro
          </text>
        </g>

        {/* Inkrement-kant */}
        <text
          x={706}
          y={140}
          textAnchor="middle"
          fontSize={10}
          fill={C.textFill}
          fontWeight={600}
        >
          → Inkrement
        </text>

        {/* Hjelpetekst */}
        <text
          x={380}
          y={180}
          textAnchor="middle"
          fontSize={10}
          fill={C.textFill}
          fontStyle="italic"
        >
          Klikk på en fase for å lese mer
        </text>
      </svg>

      {/* Beskrivelse av valgt fase */}
      <div
        className="mt-3 rounded-lg border p-4"
        style={{ borderColor: v.color, backgroundColor: `${v.color}14` }}
      >
        <p className="font-bold mb-1" style={{ color: v.color }}>
          {v.title}
        </p>
        <p className="text-xs font-mono mb-2" style={{ color: v.color }}>
          {v.tidsboks}
        </p>
        <p className="text-sm">{v.beskrivelse}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   2. KanbanBoardSvg — interaktiv tavle
   ═══════════════════════════════════════════════ */

type KanbanCol = "todo" | "doing" | "done";
interface KanbanCard {
  id: number;
  title: string;
  col: KanbanCol;
}

const initialCards: KanbanCard[] = [
  { id: 1, title: "Implementer login", col: "todo" },
  { id: 2, title: "Fix bug i payment", col: "doing" },
  { id: 3, title: "Skriv API-dokumentasjon", col: "todo" },
  { id: 4, title: "Refaktorer Order-klasse", col: "doing" },
  { id: 5, title: "Sett opp CI-pipeline", col: "todo" },
  { id: 6, title: "Designe ny landingsside", col: "done" },
];

const WIP_LIMIT = 2;

export function KanbanBoardSvg() {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards);
  const [warning, setWarning] = useState<string | null>(null);

  const next: Record<KanbanCol, KanbanCol | null> = {
    todo: "doing",
    doing: "done",
    done: null,
  };

  function flytt(id: number) {
    const kort = cards.find((c) => c.id === id);
    if (!kort) return;
    const nyKol = next[kort.col];
    if (!nyKol) {
      setWarning("Ferdige kort kan ikke flyttes videre.");
      setTimeout(() => setWarning(null), 2500);
      return;
    }
    if (nyKol === "doing") {
      const doingCount = cards.filter((c) => c.col === "doing").length;
      if (doingCount >= WIP_LIMIT) {
        setWarning(`WIP-grense brutt! Maks ${WIP_LIMIT} kort i "Doing".`);
        setTimeout(() => setWarning(null), 2500);
        return;
      }
    }
    setCards(cards.map((c) => (c.id === id ? { ...c, col: nyKol } : c)));
  }

  const cols: { key: KanbanCol; label: string; x: number; color: string }[] = [
    { key: "todo", label: "To Do", x: 10, color: "#64748b" },
    { key: "doing", label: `Doing (WIP ${WIP_LIMIT})`, x: 210, color: C.review },
    { key: "done", label: "Done", x: 410, color: C.ok },
  ];

  const colWidth = 190;

  return (
    <div>
      <svg
        viewBox="0 0 610 360"
        className="w-full mx-auto"
        role="img"
        aria-label="Interaktiv Kanban-tavle"
      >
        {cols.map((col) => {
          const colCards = cards.filter((c) => c.col === col.key);
          const overWip = col.key === "doing" && colCards.length > WIP_LIMIT;
          return (
            <g key={col.key}>
              <rect
                x={col.x}
                y={10}
                width={colWidth}
                height={340}
                fill={overWip ? "#fee2e2" : "#f8fafc"}
                stroke={overWip ? C.warn : col.color}
                strokeWidth={overWip ? 2.5 : 1.5}
                rx={6}
              />
              <text
                x={col.x + colWidth / 2}
                y={32}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill={col.color}
              >
                {col.label}
              </text>
              {colCards.map((kort, i) => (
                <g
                  key={kort.id}
                  onClick={() => flytt(kort.id)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={col.x + 10}
                    y={50 + i * 50}
                    width={colWidth - 20}
                    height={40}
                    fill="white"
                    stroke={col.color}
                    strokeWidth={1.5}
                    rx={4}
                  />
                  <text
                    x={col.x + 20}
                    y={66 + i * 50}
                    fontSize={10}
                    fontWeight={600}
                    fill="#1e293b"
                  >
                    #{kort.id}
                  </text>
                  <text
                    x={col.x + 20}
                    y={82 + i * 50}
                    fontSize={10}
                    fill="#1e293b"
                  >
                    {kort.title.length > 24
                      ? kort.title.slice(0, 23) + "…"
                      : kort.title}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="text-xs text-center mt-2 text-[var(--muted)] italic">
        Klikk på et kort for å flytte det til neste kolonne. WIP-grense på &quot;Doing&quot; er {WIP_LIMIT}.
      </p>
      {warning && (
        <div className="mt-2 rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-2 text-sm text-red-700 dark:text-red-400 text-center font-semibold">
          {warning}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. ProductBacklogVsSprintBacklog
   ═══════════════════════════════════════════════ */

export function ProductBacklogVsSprintBacklog() {
  const productItems = [
    { id: "PB-1", title: "Login med 2FA", prio: 1 },
    { id: "PB-2", title: "Glemt passord", prio: 2 },
    { id: "PB-3", title: "Profilside", prio: 3 },
    { id: "PB-4", title: "Søk i produkter", prio: 4 },
    { id: "PB-5", title: "Filtrere etter kategori", prio: 5 },
    { id: "PB-6", title: "Handlekurv", prio: 6 },
    { id: "PB-7", title: "Stripe-betaling", prio: 7 },
    { id: "PB-8", title: "Ordrehistorikk", prio: 8 },
    { id: "PB-9", title: "Anmeldelser", prio: 9 },
    { id: "PB-10", title: "Wishlist", prio: 10 },
  ];

  const sprintItems = productItems.slice(0, 3);

  return (
    <div>
      <svg
        viewBox="0 0 700 460"
        className="w-full mx-auto"
        role="img"
        aria-label="Product Backlog versus Sprint Backlog"
      >
        {/* Product Backlog */}
        <rect
          x={10}
          y={10}
          width={300}
          height={440}
          fill="#eff6ff"
          stroke={C.planning}
          strokeWidth={2}
          rx={8}
        />
        <text
          x={160}
          y={32}
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={C.planning}
        >
          Product Backlog
        </text>
        <text
          x={160}
          y={48}
          textAnchor="middle"
          fontSize={10}
          fill={C.planning}
        >
          (eies av Produkteier · prioritert)
        </text>

        {productItems.map((it, i) => (
          <g key={it.id}>
            <rect
              x={25}
              y={60 + i * 36}
              width={270}
              height={30}
              fill="white"
              stroke={i < 3 ? C.daily : C.cardStroke}
              strokeWidth={i < 3 ? 2 : 1}
              rx={4}
            />
            <text
              x={35}
              y={80 + i * 36}
              fontSize={10}
              fontWeight={700}
              fill={i < 3 ? C.daily : "#475569"}
            >
              #{it.prio}
            </text>
            <text
              x={75}
              y={80 + i * 36}
              fontSize={11}
              fill="#1e293b"
            >
              {it.title}
            </text>
          </g>
        ))}

        {/* Pil topp av PB → SB */}
        <line
          x1={300}
          y1={130}
          x2={395}
          y2={130}
          stroke={C.daily}
          strokeWidth={2.5}
        />
        <polygon points="395,130 387,125 387,135" fill={C.daily} />
        <text
          x={347}
          y={120}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fill={C.daily}
        >
          pull (topp 3)
        </text>
        <text
          x={347}
          y={150}
          textAnchor="middle"
          fontSize={9}
          fill={C.daily}
          fontStyle="italic"
        >
          teamet velger selv
        </text>

        {/* Sprint Backlog */}
        <rect
          x={400}
          y={10}
          width={290}
          height={260}
          fill="#f0fdf4"
          stroke={C.daily}
          strokeWidth={2}
          rx={8}
        />
        <text
          x={545}
          y={32}
          textAnchor="middle"
          fontSize={14}
          fontWeight={700}
          fill={C.daily}
        >
          Sprint Backlog
        </text>
        <text
          x={545}
          y={48}
          textAnchor="middle"
          fontSize={10}
          fill={C.daily}
        >
          (eies av utviklingsteamet)
        </text>

        {sprintItems.map((it, i) => (
          <g key={it.id}>
            <rect
              x={415}
              y={60 + i * 60}
              width={260}
              height={50}
              fill="white"
              stroke={C.daily}
              strokeWidth={1.5}
              rx={4}
            />
            <text
              x={425}
              y={80 + i * 60}
              fontSize={11}
              fontWeight={700}
              fill={C.daily}
            >
              #{it.prio} · {it.title}
            </text>
            <text
              x={425}
              y={98 + i * 60}
              fontSize={9}
              fill="#475569"
              fontStyle="italic"
            >
              brutt ned i konkrete oppgaver
            </text>
          </g>
        ))}

        {/* Inkrement nederst */}
        <rect
          x={400}
          y={290}
          width={290}
          height={70}
          fill="#fef3c7"
          stroke={C.review}
          strokeWidth={2}
          rx={8}
        />
        <text
          x={545}
          y={315}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill={C.review}
        >
          Inkrement
        </text>
        <text
          x={545}
          y={335}
          textAnchor="middle"
          fontSize={10}
          fill={C.review}
        >
          fungerende, potensielt leverbart produkt
        </text>
        <text
          x={545}
          y={350}
          textAnchor="middle"
          fontSize={10}
          fill={C.review}
        >
          på slutten av sprinten
        </text>

        {/* Pil SB → Inkrement */}
        <line
          x1={545}
          y1={270}
          x2={545}
          y2={285}
          stroke={C.review}
          strokeWidth={2}
        />
        <polygon points="545,285 540,278 550,278" fill={C.review} />

        {/* Forklaring nederst */}
        <text
          x={545}
          y={395}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill="#1e293b"
        >
          Pull-basert
        </text>
        <text
          x={545}
          y={415}
          textAnchor="middle"
          fontSize={10}
          fill="#475569"
        >
          Teamet henter selv arbeid fra toppen
        </text>
        <text
          x={545}
          y={430}
          textAnchor="middle"
          fontSize={10}
          fill="#475569"
        >
          — PO dytter ikke ned oppgaver.
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   4. BurndownChartSvg — interaktivt
   ═══════════════════════════════════════════════ */

export function BurndownChartSvg() {
  const dager = 10;
  const startSP = 50;
  // Faktisk progresjon (litt over/under ideal)
  const faktisk = [50, 48, 46, 41, 40, 33, 28, 21, 14, 7, 0];
  const ideal = Array.from({ length: dager + 1 }, (_, i) =>
    startSP - (startSP / dager) * i,
  );
  const [hover, setHover] = useState<number | null>(null);

  // Plot-område
  const padX = 50;
  const padY = 40;
  const plotW = 480;
  const plotH = 220;
  const x0 = padX;
  const y0 = padY;
  const xN = (i: number) => x0 + (plotW / dager) * i;
  const yV = (v: number) => y0 + plotH - (v / startSP) * plotH;

  return (
    <div>
      <svg
        viewBox="0 0 580 320"
        className="w-full mx-auto"
        role="img"
        aria-label="Interaktivt burndown-diagram"
      >
        {/* Y-akse */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + plotH} stroke={C.stroke} strokeWidth={1.5} />
        {/* X-akse */}
        <line
          x1={x0}
          y1={y0 + plotH}
          x2={x0 + plotW}
          y2={y0 + plotH}
          stroke={C.stroke}
          strokeWidth={1.5}
        />

        {/* Y-tick labels */}
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <g key={v}>
            <line
              x1={x0 - 4}
              y1={yV(v)}
              x2={x0}
              y2={yV(v)}
              stroke={C.stroke}
              strokeWidth={1}
            />
            <text
              x={x0 - 8}
              y={yV(v) + 4}
              textAnchor="end"
              fontSize={10}
              fill={C.textFill}
            >
              {v}
            </text>
          </g>
        ))}
        <text
          x={15}
          y={y0 + plotH / 2}
          fontSize={11}
          fill={C.textFill}
          fontWeight={600}
          transform={`rotate(-90 15 ${y0 + plotH / 2})`}
          textAnchor="middle"
        >
          Story points (gjenstår)
        </text>

        {/* X-tick labels */}
        {Array.from({ length: dager + 1 }).map((_, i) => (
          <g key={i}>
            <line
              x1={xN(i)}
              y1={y0 + plotH}
              x2={xN(i)}
              y2={y0 + plotH + 4}
              stroke={C.stroke}
              strokeWidth={1}
            />
            <text
              x={xN(i)}
              y={y0 + plotH + 16}
              textAnchor="middle"
              fontSize={10}
              fill={C.textFill}
            >
              {i}
            </text>
          </g>
        ))}
        <text
          x={x0 + plotW / 2}
          y={y0 + plotH + 36}
          textAnchor="middle"
          fontSize={11}
          fill={C.textFill}
          fontWeight={600}
        >
          Dag i sprinten
        </text>

        {/* Ideal-linje (stiplet) */}
        <line
          x1={xN(0)}
          y1={yV(ideal[0])}
          x2={xN(dager)}
          y2={yV(ideal[dager])}
          stroke={C.ideal}
          strokeWidth={2}
          strokeDasharray="6 4"
        />

        {/* Faktisk progresjon (solid) */}
        <polyline
          points={faktisk.map((v, i) => `${xN(i)},${yV(v)}`).join(" ")}
          fill="none"
          stroke={C.actual}
          strokeWidth={2.5}
        />

        {/* Punkter med hover */}
        {faktisk.map((v, i) => (
          <g key={i}>
            <circle
              cx={xN(i)}
              cy={yV(v)}
              r={hover === i ? 7 : 4}
              fill={C.actual}
              stroke="white"
              strokeWidth={1.5}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
          </g>
        ))}

        {/* Tooltip */}
        {hover !== null && (
          <g>
            <rect
              x={xN(hover) + 10}
              y={yV(faktisk[hover]) - 36}
              width={110}
              height={32}
              fill="white"
              stroke={C.actual}
              strokeWidth={1.5}
              rx={4}
            />
            <text
              x={xN(hover) + 16}
              y={yV(faktisk[hover]) - 22}
              fontSize={10}
              fontWeight={700}
              fill={C.actual}
            >
              Dag {hover}
            </text>
            <text
              x={xN(hover) + 16}
              y={yV(faktisk[hover]) - 8}
              fontSize={10}
              fill="#1e293b"
            >
              {faktisk[hover]} SP gjenstår
            </text>
          </g>
        )}

        {/* Forklaring */}
        <g transform="translate(440 50)">
          <line
            x1={0}
            y1={0}
            x2={20}
            y2={0}
            stroke={C.ideal}
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          <text x={26} y={4} fontSize={10} fill={C.textFill}>
            Ideal
          </text>
          <line
            x1={0}
            y1={18}
            x2={20}
            y2={18}
            stroke={C.actual}
            strokeWidth={2.5}
          />
          <text x={26} y={22} fontSize={10} fill={C.textFill}>
            Faktisk
          </text>
        </g>
      </svg>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <div className="rounded border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-2">
          <strong className="text-amber-700 dark:text-amber-400">Over ideal:</strong>{" "}
          teamet ligger bak skjema — risiko for at sprinten ikke fullføres.
        </div>
        <div className="rounded border border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-800 p-2">
          <strong className="text-green-700 dark:text-green-400">Under ideal:</strong>{" "}
          teamet ligger foran skjema — kan kanskje ta inn mer arbeid.
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   5. ScrumRoles3DiagramSvg — 3 roller m/ ansvar
   ═══════════════════════════════════════════════ */

type Role = "po" | "sm" | "team";

const roleInfo: Record<
  Role,
  { title: string; color: string; ansvar: string[] }
> = {
  po: {
    title: "Produkteier (PO)",
    color: C.planning,
    ansvar: [
      "Eier og prioriterer Product Backlog",
      "Bestemmer HVA som skal bygges",
      "Representerer kunden / interessentene",
      "Aksepterer eller avviser inkrementet",
    ],
  },
  sm: {
    title: "Scrum Master (SM)",
    color: C.retro,
    ansvar: [
      "Fjerner hindringer for teamet",
      "Sørger for at Scrum følges riktig",
      "Servant leader — IKKE prosjektleder",
      "Beskytter teamet mot forstyrrelser",
    ],
  },
  team: {
    title: "Utviklingsteamet",
    color: C.daily,
    ansvar: [
      "Bestemmer HVORDAN arbeidet utføres",
      "Tverrfunksjonelt og selvorganiserende",
      "Leverer Inkrementet hver sprint",
      "Ideelt 5–8 personer, ingen under-roller",
    ],
  },
};

export function ScrumRoles3DiagramSvg() {
  const [valgt, setValgt] = useState<Role>("po");
  const v = roleInfo[valgt];

  return (
    <div>
      <svg
        viewBox="0 0 620 280"
        className="w-full mx-auto"
        role="img"
        aria-label="Scrum sine tre roller"
      >
        {/* PO */}
        <g
          onClick={() => setValgt("po")}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={20}
            y={5}
            width={140}
            height={150}
            fill={valgt === "po" ? `${roleInfo.po.color}22` : "transparent"}
            stroke={valgt === "po" ? roleInfo.po.color : "transparent"}
            strokeWidth={2}
            rx={8}
          />
          <StickFigure x={90} y={70} label="Produkteier" color={roleInfo.po.color} />
        </g>

        {/* SM */}
        <g
          onClick={() => setValgt("sm")}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={240}
            y={5}
            width={140}
            height={150}
            fill={valgt === "sm" ? `${roleInfo.sm.color}22` : "transparent"}
            stroke={valgt === "sm" ? roleInfo.sm.color : "transparent"}
            strokeWidth={2}
            rx={8}
          />
          <StickFigure x={310} y={70} label="Scrum Master" color={roleInfo.sm.color} />
        </g>

        {/* Team — flere figurer */}
        <g
          onClick={() => setValgt("team")}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={440}
            y={5}
            width={170}
            height={150}
            fill={valgt === "team" ? `${roleInfo.team.color}22` : "transparent"}
            stroke={valgt === "team" ? roleInfo.team.color : "transparent"}
            strokeWidth={2}
            rx={8}
          />
          <StickFigure x={475} y={70} label="" color={roleInfo.team.color} scale={0.75} />
          <StickFigure x={525} y={70} label="" color={roleInfo.team.color} scale={0.75} />
          <StickFigure x={575} y={70} label="" color={roleInfo.team.color} scale={0.75} />
          <text
            x={525}
            y={120}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={roleInfo.team.color}
          >
            Utviklingsteam
          </text>
        </g>

        {/* Pil PO → Backlog (over team) — viser at PO mater backlog som teamet trekker fra */}
        <line
          x1={130}
          y1={180}
          x2={210}
          y2={210}
          stroke={roleInfo.po.color}
          strokeWidth={1.5}
        />
        <polygon points="210,210 200,206 204,214" fill={roleInfo.po.color} />
        <rect
          x={210}
          y={195}
          width={120}
          height={30}
          fill="#eff6ff"
          stroke={roleInfo.po.color}
          strokeWidth={1.5}
          rx={4}
        />
        <text
          x={270}
          y={214}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fill={roleInfo.po.color}
        >
          Product Backlog
        </text>
        <text
          x={170}
          y={175}
          textAnchor="middle"
          fontSize={9}
          fill={roleInfo.po.color}
          fontStyle="italic"
        >
          prioriterer
        </text>

        {/* Pil Backlog → Team */}
        <line
          x1={330}
          y1={210}
          x2={460}
          y2={180}
          stroke={roleInfo.team.color}
          strokeWidth={1.5}
        />
        <polygon points="460,180 450,180 454,188" fill={roleInfo.team.color} />
        <text
          x={400}
          y={205}
          textAnchor="middle"
          fontSize={9}
          fill={roleInfo.team.color}
          fontStyle="italic"
        >
          pull
        </text>

        {/* Pil SM → Team (fjerner hindringer) */}
        <line
          x1={350}
          y1={130}
          x2={460}
          y2={130}
          stroke={roleInfo.sm.color}
          strokeWidth={1.5}
          strokeDasharray="5 3"
        />
        <polygon points="460,130 450,126 450,134" fill={roleInfo.sm.color} />
        <text
          x={405}
          y={123}
          textAnchor="middle"
          fontSize={9}
          fill={roleInfo.sm.color}
          fontStyle="italic"
        >
          fjerner hindringer
        </text>

        {/* Pil Team → Inkrement */}
        <line
          x1={525}
          y1={235}
          x2={525}
          y2={258}
          stroke={roleInfo.team.color}
          strokeWidth={1.5}
        />
        <polygon points="525,258 520,250 530,250" fill={roleInfo.team.color} />
        <rect
          x={460}
          y={258}
          width={130}
          height={20}
          fill="#fef3c7"
          stroke={C.review}
          strokeWidth={1.5}
          rx={4}
        />
        <text
          x={525}
          y={272}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fill={C.review}
        >
          Inkrement
        </text>
        <text
          x={555}
          y={250}
          fontSize={9}
          fill={roleInfo.team.color}
          fontStyle="italic"
        >
          leverer
        </text>

        <text
          x={310}
          y={270}
          textAnchor="middle"
          fontSize={10}
          fill={C.textFill}
          fontStyle="italic"
        >
          Klikk på en rolle for å se ansvar
        </text>
      </svg>

      {/* Beskrivelse */}
      <div
        className="mt-3 rounded-lg border p-4"
        style={{ borderColor: v.color, backgroundColor: `${v.color}14` }}
      >
        <p className="font-bold mb-2" style={{ color: v.color }}>
          {v.title}
        </p>
        <ul className="text-sm space-y-1">
          {v.ansvar.map((a, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: v.color }}>✓</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   6. SprintTimelineSvg — flere sprinter, voksende inkrement
   ═══════════════════════════════════════════════ */

export function SprintTimelineSvg() {
  const sprinter = 4;
  const sprintW = 130;
  const gap = 30;
  const startX = 30;
  const sprintY = 40;
  const sprintH = 60;

  return (
    <div>
      <svg
        viewBox="0 0 720 240"
        className="w-full mx-auto"
        role="img"
        aria-label="Sprint-tidslinje med voksende inkrement"
      >
        <text
          x={360}
          y={20}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={C.textFill}
        >
          Inkrementell utvikling — produktet vokser én sprint av gangen
        </text>

        {Array.from({ length: sprinter }).map((_, i) => {
          const x = startX + i * (sprintW + gap);
          const cumulativeH = 20 + (i + 1) * 25; // vokser
          const inkrementY = 200 - cumulativeH;
          return (
            <g key={i}>
              {/* Sprint-rektangel */}
              <rect
                x={x}
                y={sprintY}
                width={sprintW}
                height={sprintH}
                fill={C.planning}
                fillOpacity={0.1}
                stroke={C.planning}
                strokeWidth={1.5}
                rx={6}
              />
              <text
                x={x + sprintW / 2}
                y={sprintY + 25}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill={C.planning}
              >
                Sprint {i + 1}
              </text>
              <text
                x={x + sprintW / 2}
                y={sprintY + 45}
                textAnchor="middle"
                fontSize={9}
                fill={C.planning}
              >
                4 uker
              </text>

              {/* Pil ned til inkrement */}
              <line
                x1={x + sprintW / 2}
                y1={sprintY + sprintH}
                x2={x + sprintW / 2}
                y2={inkrementY}
                stroke={C.review}
                strokeWidth={1.5}
              />
              <polygon
                points={`${x + sprintW / 2},${inkrementY} ${x + sprintW / 2 - 5},${inkrementY - 8} ${x + sprintW / 2 + 5},${inkrementY - 8}`}
                fill={C.review}
              />

              {/* Voksende inkrement-rektangel */}
              <rect
                x={x + 10}
                y={inkrementY}
                width={sprintW - 20}
                height={cumulativeH}
                fill={C.review}
                fillOpacity={0.25}
                stroke={C.review}
                strokeWidth={1.5}
                rx={4}
              />
              <text
                x={x + sprintW / 2}
                y={inkrementY + cumulativeH / 2 + 4}
                textAnchor="middle"
                fontSize={10}
                fontWeight={700}
                fill={C.review}
              >
                v{i + 1}
              </text>

              {/* Pil mellom sprinter */}
              {i < sprinter - 1 && (
                <>
                  <line
                    x1={x + sprintW}
                    y1={sprintY + sprintH / 2}
                    x2={x + sprintW + gap}
                    y2={sprintY + sprintH / 2}
                    stroke={C.arrow}
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${x + sprintW + gap},${sprintY + sprintH / 2} ${x + sprintW + gap - 6},${sprintY + sprintH / 2 - 4} ${x + sprintW + gap - 6},${sprintY + sprintH / 2 + 4}`}
                    fill={C.arrow}
                  />
                </>
              )}
            </g>
          );
        })}

        {/* Forklaring */}
        <text
          x={360}
          y={225}
          textAnchor="middle"
          fontSize={10}
          fill={C.textFill}
          fontStyle="italic"
        >
          Hver sprint leverer et fungerende produkt — som vokser inkrementelt sprint for sprint.
        </text>
      </svg>
    </div>
  );
}
