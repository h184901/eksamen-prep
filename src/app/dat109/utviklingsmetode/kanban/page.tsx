"use client";

import Link from "next/link";
import { useState } from "react";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ─── Interaktiv Kanban-tavle ─── */
type KanbanCard = { id: string; title: string; col: 0 | 1 | 2 | 3 };
type KanbanCol = { name: string; wip: number | "∞"; color: string };

const initialCards: KanbanCard[] = [
  { id: "1", title: "Implementer login", col: 0 },
  { id: "2", title: "Fix bug i payment", col: 0 },
  { id: "3", title: "Refaktorer brett-klassen", col: 0 },
  { id: "4", title: "Legg til 2FA", col: 1 },
  { id: "5", title: "Skriv tester for sekserregler", col: 2 },
  { id: "6", title: "Kanban-tavle UI", col: 2 },
  { id: "7", title: "Setup CI/CD", col: 3 },
  { id: "8", title: "Database-migrasjon", col: 3 },
];

const cols: KanbanCol[] = [
  { name: "Backlog", wip: "∞", color: "neutral" },
  { name: "To Do", wip: 3, color: "blue" },
  { name: "Doing", wip: 2, color: "amber" },
  { name: "Done", wip: "∞", color: "green" },
];

function InteraktivKanban() {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards);

  const moveCard = (id: string, dir: 1 | -1) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newCol = Math.max(0, Math.min(3, c.col + dir)) as 0 | 1 | 2 | 3;
        return { ...c, col: newCol };
      })
    );
  };

  const cardsInCol = (i: number) => cards.filter((c) => c.col === i);
  const isOverWip = (i: number) => {
    const wip = cols[i].wip;
    return typeof wip === "number" && cardsInCol(i).length > wip;
  };

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 my-4">
      <p className="text-sm text-[var(--muted)] mb-3">
        Klikk pilene på et kort for å flytte det mellom kolonner. Legg merke til hva som
        skjer når du overskrider WIP-limiten på <strong>Doing</strong> (maks 2).
      </p>
      <div className="grid grid-cols-4 gap-2">
        {cols.map((col, i) => {
          const overWip = isOverWip(i);
          return (
            <div key={col.name} className="rounded-lg border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900/40 p-2 min-h-[200px]">
              <div className="text-center mb-2">
                <p className="text-xs font-bold">{col.name}</p>
                <p className={`text-[10px] ${overWip ? "text-red-600 dark:text-red-400 font-bold" : "text-[var(--muted)]"}`}>
                  WIP: {cardsInCol(i).length} / {col.wip}
                  {overWip && " ⚠️ OVER LIMIT"}
                </p>
              </div>
              <div className="space-y-1.5">
                {cardsInCol(i).map((card) => (
                  <div
                    key={card.id}
                    className={`rounded border p-1.5 text-[10px] ${
                      overWip
                        ? "bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700"
                        : "bg-white dark:bg-neutral-800 border-[var(--card-border)]"
                    }`}
                  >
                    <p className="font-medium leading-tight mb-1">{card.title}</p>
                    <div className="flex justify-between gap-1">
                      <button
                        onClick={() => moveCard(card.id, -1)}
                        disabled={card.col === 0}
                        className="text-xs px-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => moveCard(card.id, 1)}
                        disabled={card.col === 3}
                        className="text-xs px-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30"
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── SVG: Cumulative flow diagram ─── */
function CumulativeFlowSvg() {
  return (
    <svg viewBox="0 0 480 240" className="w-full max-w-2xl mx-auto" role="img" aria-label="Cumulative flow diagram">
      {/* Akser */}
      <line x1="40" y1="200" x2="460" y2="200" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="200" stroke="currentColor" strokeWidth="1.5" />
      <text x="245" y="225" textAnchor="middle" fontSize="10" fill="currentColor">Tid →</text>
      <text x="20" y="115" textAnchor="middle" fontSize="10" fill="currentColor" transform="rotate(-90 20 115)">Antall oppgaver</text>

      {/* 4 lag, fra bunn til topp */}
      {/* Done (grønn, bunn) */}
      <polygon points="40,200 100,195 160,180 220,160 280,140 340,120 400,100 460,80 460,200" fill="#22c55e" fillOpacity="0.5" stroke="#22c55e" />
      {/* Doing (gul) */}
      <polygon points="40,195 100,180 160,155 220,135 280,118 340,105 400,90 460,75 460,80 400,100 340,120 280,140 220,160 160,180 100,195" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" />
      {/* To Do (blå) */}
      <polygon points="40,180 100,165 160,140 220,118 280,100 340,82 400,68 460,55 460,75 400,90 340,105 280,118 220,135 160,155 100,180" fill="#3b82f6" fillOpacity="0.5" stroke="#3b82f6" />
      {/* Backlog (grå) */}
      <polygon points="40,150 100,135 160,115 220,90 280,70 340,52 400,38 460,30 460,55 400,68 340,82 280,100 220,118 160,140 100,165" fill="#6b7280" fillOpacity="0.5" stroke="#6b7280" />

      {/* Legend */}
      <rect x="320" y="22" width="10" height="10" fill="#6b7280" fillOpacity="0.5" stroke="#6b7280" />
      <text x="335" y="31" fontSize="9" fill="currentColor">Backlog</text>
      <rect x="380" y="22" width="10" height="10" fill="#3b82f6" fillOpacity="0.5" stroke="#3b82f6" />
      <text x="395" y="31" fontSize="9" fill="currentColor">To Do</text>
      <rect x="320" y="40" width="10" height="10" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" />
      <text x="335" y="49" fontSize="9" fill="currentColor">Doing</text>
      <rect x="380" y="40" width="10" height="10" fill="#22c55e" fillOpacity="0.5" stroke="#22c55e" />
      <text x="395" y="49" fontSize="9" fill="currentColor">Done</text>

      {/* Annotasjoner */}
      <text x="180" y="100" fontSize="9" fill="currentColor" fontStyle="italic">↗ økende WIP — flaskehals?</text>
    </svg>
  );
}

/* ─── SVG: Push vs Pull ─── */
function PushVsPullSvg() {
  return (
    <svg viewBox="0 0 600 200" className="w-full max-w-2xl mx-auto" role="img" aria-label="Push vs Pull">
      {/* Push - venstre */}
      <text x="100" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444">PUSH (tradisjonelt)</text>
      <text x="100" y="36" textAnchor="middle" fontSize="9" fill="currentColor">Sjef pusher arbeid på laget</text>

      <rect x="50" y="50" width="100" height="35" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
      <text x="100" y="73" textAnchor="middle" fontSize="10" fill="currentColor">Sjef</text>
      <line x1="100" y1="85" x2="100" y2="115" stroke="#ef4444" strokeWidth="1.5" />
      <polygon points="100,115 95,108 105,108" fill="#ef4444" />

      <rect x="50" y="120" width="100" height="35" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
      <text x="100" y="143" textAnchor="middle" fontSize="10" fill="currentColor">Lag</text>

      <text x="100" y="180" textAnchor="middle" fontSize="9" fontStyle="italic" fill="currentColor">Lag overbelastes — kø vokser</text>

      {/* Pull - høyre */}
      <text x="450" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="#22c55e">PULL (Kanban)</text>
      <text x="450" y="36" textAnchor="middle" fontSize="9" fill="currentColor">Lag puller arbeid når de har kapasitet</text>

      <rect x="400" y="50" width="100" height="35" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
      <text x="450" y="73" textAnchor="middle" fontSize="10" fill="currentColor">Backlog</text>
      <line x1="450" y1="115" x2="450" y2="85" stroke="#22c55e" strokeWidth="1.5" />
      <polygon points="450,85 445,92 455,92" fill="#22c55e" />

      <rect x="400" y="120" width="100" height="35" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
      <text x="450" y="143" textAnchor="middle" fontSize="10" fill="currentColor">Lag</text>

      <text x="450" y="180" textAnchor="middle" fontSize="9" fontStyle="italic" fill="currentColor">Lag i kontroll — WIP begrenset</text>
    </svg>
  );
}

export default function KanbanPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/utviklingsmetode" className="hover:text-[var(--accent)]">Utviklingsmetode</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Kanban vs Scrum</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Kanban vs Scrum</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Kontinuerlig flyt vs sprinter, WIP-limits, og pull-basert vs push-basert arbeid.
        V2024 testet hva en kanban-tavle er — så denne siden er eksamensrelevant.
      </p>

      {/* ═══════════════════════════════════════════════════════════
          1. Hva er Kanban?
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Hva er Kanban?"
        defaultOpen={true}
        mustKnow={[
          "Kanban = japansk for 'visuell signal' — fra Toyotas produksjonssystem",
          "Adoptert i programvareutvikling rundt 2007 (David Anderson)",
          "Tre kjerneprinsipper: visualiser arbeid, begrens WIP, optimaliser flyt",
          "V2024-eksamen: Kanban-tavle = 'En tavle der man visuelt kan se arbeidet som skal gjøres, pågår og er ferdig'",
        ]}
      >
        <p>
          Kanban (japansk for &laquo;visuelt signal&raquo;) ble utviklet av Toyota på 1940-tallet
          for å styre produksjonen av biler. Tanken: bare bygg det som etterspørres, og bare når
          det er etterspurt. På 2000-tallet ble metoden adoptert i programvareutvikling, mest
          kjent gjennom David Anderson&apos;s bok &laquo;Kanban&raquo; (2010).
        </p>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">De 3 kjerneprinsippene</p>
          <ol className="list-decimal list-inside text-sm space-y-1.5">
            <li><strong>Visualiser arbeidsflyten</strong> — gjør det synlig hva som er igang og hvor det står</li>
            <li><strong>Begrens arbeid under utvikling</strong> (WIP-limit) — ikke start nytt før eksisterende er ferdig</li>
            <li><strong>Optimaliser flyten</strong> — mål gjennomstrømning og lead time, identifiser flaskehalser</li>
          </ol>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-4 rounded-lg text-sm">
          <strong>V2024 oppgave 3d:</strong> &laquo;Hva er en kanban-tavle i en smidig
          utviklingsprosess?&raquo; — Riktig svar: <em>En tavle der man visuelt kan se arbeidet
          som skal gjøres, pågår og er ferdig.</em>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          2. Interaktiv Kanban-tavle
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Interaktiv Kanban-tavle — prøv WIP-limit selv"
        defaultOpen={true}
        mustKnow={[
          "WIP-limit (Work In Progress) = maks antall oppgaver i en kolonne samtidig",
          "Når WIP overskrides — ikke start nytt, hjelp med å fullføre eksisterende",
          "Backlog og Done har ingen WIP-limit (∞)",
          "Limit settes basert på lagets størrelse og erfaring",
        ]}
      >
        <p>
          Den klassiske Kanban-tavlen har 3-5 kolonner og kort som flytter seg fra venstre
          mot høyre. Doing-kolonnen har en WIP-limit som hindrer multitasking og oppmuntrer
          fokus.
        </p>

        <InteraktivKanban />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hvorfor WIP-limit?</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Mindre context-switching</strong> — fokus gir bedre kvalitet</li>
            <li><strong>Færre flaskehalser</strong> — du ser hvor køen bygger seg opp</li>
            <li><strong>Raskere lead time</strong> — ferre samtidige oppgaver = raskere ferdigstilling per oppgave (Little&apos;s Law)</li>
            <li><strong>Tvinger samarbeid</strong> — hvis du er blokkert, hjelper du med en annen oppgave</li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          3. Push vs Pull
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Pull-basert vs push-basert arbeid"
        defaultOpen={false}
        mustKnow={[
          "Tradisjonelt: sjef PUSHER arbeid på laget",
          "Kanban: lag PULLER arbeid fra backlog når de har kapasitet",
          "Pull-systemet er respekt for menneskers kapasitet",
          "Når WIP er full, signaliserer det at man trenger flere ressurser eller raskere flyt",
        ]}
      >
        <p>
          Forskjellen mellom <strong>push</strong> og <strong>pull</strong> er fundamentalt for
          Kanban. Tradisjonelt har en leder bestemt &laquo;du skal gjøre disse 5 oppgavene
          denne uken&raquo;. Resultat: laget overbelastes, kvaliteten lider, og oppgaver blir
          stående uferdige.
        </p>

        <PushVsPullSvg />

        <p className="text-sm mt-4">
          I et pull-system bestemmer <em>laget selv</em> når de har kapasitet til å starte ny
          oppgave. WIP-limiten gjør at de ikke kan ta inn for mye. Dette er respektfullt for
          menneskers kapasitet og gir bedre flyt.
        </p>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          4. Cumulative Flow Diagram
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Cumulative Flow Diagram — Kanbans 'burndown'"
        defaultOpen={false}
        mustKnow={[
          "Kanban bruker IKKE burndown chart (det er Scrum)",
          "Cumulative flow viser oppgaver per kolonne over tid",
          "Når et lag tykkner = WIP øker = flaskehals",
          "Ideelt: hver lag holder seg jevn tykkelse over tid",
        ]}
      >
        <p>
          Mens Scrum bruker burndown chart (gjenstående arbeid per dag i en sprint), bruker
          Kanban et <strong>Cumulative Flow Diagram (CFD)</strong>. Det viser hvor mange
          oppgaver er i hver kolonne (Backlog, To Do, Doing, Done) over tid.
        </p>

        <CumulativeFlowSvg />

        <p className="text-sm mt-4">
          <strong>Tolkning:</strong>
        </p>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>Hvis et lag tykkner brått → det er en flaskehals i den kolonnen</li>
          <li>Hvis Done vokser jevnt → laget leverer jevnt</li>
          <li>Avstand mellom Done og Backlog = total work in progress</li>
          <li>Helningen på Done-grafen = throughput (oppgaver per dag)</li>
        </ul>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          5. Kanban vs Scrum — sammenligning
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Kanban vs Scrum — komplett sammenligning"
        defaultOpen={true}
        mustKnow={[
          "Scrum = sprinter, faste roller, planlegging i begynnelsen",
          "Kanban = kontinuerlig flyt, ingen obligatoriske roller, planlegging on-demand",
          "Kanban passer for støttearbeid og vedlikehold",
          "Scrum passer for produktutvikling med definerte mål",
          "Begge bruker visuelle tavler, men FOKUS er ulikt",
        ]}
      >
        <p>
          Kanban og Scrum er begge smidige metoder som bruker en visuell tavle, men de har
          <strong> fundamentalt forskjellig tilnærming</strong> til arbeidsflyt.
        </p>

        <ComparisonTable
          headers={["Egenskap", "Scrum", "Kanban"]}
          rows={[
            ["Arbeidssyklus", "Faste sprinter (1–4 uker)", "Kontinuerlig flyt — ingen sprinter"],
            ["Roller", "PO, SM, Utviklingsteam (obligatoriske)", "Ingen obligatoriske roller"],
            ["Planlegging", "Sprint Planning i starten av hver sprint", "Etter behov — pull-basert"],
            ["Begrensning", "Sprint Backlog (fast for sprinten)", "WIP-limits per kolonne"],
            ["Endringer", "Helst ikke underveis i en sprint", "Kan legges til når som helst"],
            ["Leveranse", "Inkrement ved sprintslutt", "Kontinuerlig — levert når ferdig"],
            ["Tavle", "Tømmes og nullstilles etter hver sprint", "Vedvarende — oppgaver flyter gjennom"],
            ["Estimering", "Ja — velocity, story points", "Valgfritt — fokus på lead time og throughput"],
            ["Seremonier", "Sprint Planning, Daily, Review, Retro", "Ingen obligatoriske møter"],
            ["Måling", "Velocity, burndown chart", "Lead time, throughput, cumulative flow"],
            ["Passer for", "Produktutvikling med definerte mål", "Support, vedlikehold, ops, drift, kontinuerlig flyt"],
          ]}
        />

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Når velger du hva?</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <div>
              <p className="font-bold text-sm mb-1">Scrum passer for:</p>
              <ul className="text-sm space-y-0.5 list-disc list-inside">
                <li>Produktutvikling med klare mål</li>
                <li>Komplekse, tverrfunksjonelle prosjekter</li>
                <li>Når kunden trenger forutsigbare leveranser</li>
                <li>Når ting kan planlegges 2-4 uker fremover</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-1">Kanban passer for:</p>
              <ul className="text-sm space-y-0.5 list-disc list-inside">
                <li>Support- og vedlikeholdsarbeid</li>
                <li>Drift / ops-team som mottar uforutsigbare oppgaver</li>
                <li>Marketing / innholdsproduksjon</li>
                <li>Når oppgaver er små og uavhengige</li>
              </ul>
            </div>
          </div>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          6. Scrumban
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="Scrumban — det beste av begge verdener"
        defaultOpen={false}
        mustKnow={[
          "Scrumban kombinerer Scrum-rammeverket med Kanban-prinsipper",
          "Sprinter beholdes (eller erstattes med tidsbokser), men WIP-limits legges til",
          "Pull-basert tavle innenfor sprinten",
          "Vanligst i team som er trenet i Scrum men trenger mer fleksibilitet",
        ]}
      >
        <p>
          Mange team bruker en hybrid kalt <strong>Scrumban</strong>: de tar Scrums struktur
          (sprinter, roller, seremonier) og legger til Kanbans WIP-limits og kontinuerlige
          flyt-fokus.
        </p>

        <p className="text-sm mt-3">
          Konkret hva man kombinerer:
        </p>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li><strong>Fra Scrum:</strong> roller (PO, SM), Sprint Planning, Daily Standup, Retro</li>
          <li><strong>Fra Kanban:</strong> WIP-limits per kolonne, pull-basert oppgavevelging, kontinuerlig flyt</li>
          <li><strong>Justeringer:</strong> Sprint Review kan bli kontinuerlige demoer; backlog er alltid prioritert</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 my-4 rounded-lg text-sm">
          Resultat: fleksibilitet uten å miste rammeverkets fordeler. Brukes mye i bedrifter
          som har Scrum-trent team men trenger å håndtere uforutsigbart arbeid (f.eks. både
          features OG bug fixes).
        </div>
      </TheorySummary>

      {/* Navigation */}
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <Link
          href="/dat109/utviklingsmetode/scrum"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Scrum</p>
          <p className="font-bold mt-1">Scrum</p>
          <p className="text-xs text-[var(--muted)]">Sammenligningens andre side — sprinter og roller</p>
        </Link>
        <Link
          href="/dat109/utviklingsmetode/eksamen"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Neste →</p>
          <p className="font-bold mt-1">Eksamendrilling</p>
          <p className="text-xs text-[var(--muted)]">Test deg selv på Kanban-spørsmål fra V2023 og V2024</p>
        </Link>
      </div>
    </div>
  );
}
