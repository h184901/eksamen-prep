"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

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
        Kontinuerlig flyt vs sprinter, WIP-limits, og hvorfor Kanban passer for support
        og vedlikehold mens Scrum egner seg best for produktutvikling.
      </p>

      {/* ============================================================ */}
      {/*  10. KANBAN VS SCRUM                                        */}
      {/* ============================================================ */}
      <section id="kanban" className="scroll-mt-32">
        <TheorySummary
          title="Kanban vs Scrum"
          mustKnow={[
            "Kanban bruker IKKE sprinter — kontinuerlig flyt",
            "Kanban har WIP-limits (Work In Progress) — begrenser samtidige oppgaver",
            "Scrum har faste roller, Kanban har ingen obligatoriske roller",
            "Begge bruker en visuell tavle, men med ulikt fokus",
            "Kanban passer for support/vedlikehold, Scrum for produktutvikling",
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
              ["Begrensning", "Sprint Backlog (fast for sprinten)", "WIP-limits (maks antall oppgaver i en kolonne)"],
              ["Endringer", "Helst ikke underveis i en sprint", "Kan legges til når som helst"],
              ["Leveranse", "Inkrement ved sprintslutt", "Kontinuerlig — levert når ferdig"],
              ["Tavle", "Tømmes og nullstilles etter hver sprint", "Vedvarende — oppgaver flyter gjennom"],
              ["Estimering", "Ja — velocity, story points", "Valgfritt — fokus på lead time og throughput"],
              ["Seremonier", "Sprint Planning, Daily, Review, Retro", "Ingen obligatoriske møter"],
              ["Passer for", "Produktutvikling med definerte sprinter", "Support, vedlikehold, ops-arbeid, kaizen"],
            ]}
          />

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kanban-tavle med WIP-limits</p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[
                { col: "Backlog", wip: "∞", items: 5 },
                { col: "To Do", wip: "3", items: 3 },
                { col: "Doing", wip: "2", items: 2 },
                { col: "Done", wip: "∞", items: 4 },
              ].map((c) => (
                <div key={c.col} className="text-center">
                  <p className="text-xs font-bold">{c.col}</p>
                  <p className="text-[10px] text-[var(--muted)]">WIP: {c.wip}</p>
                  <div className="mt-1 space-y-1">
                    {Array.from({ length: c.items }).map((_, i) => (
                      <div key={i} className="h-4 rounded bg-blue-200 dark:bg-blue-800/50" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-3">
              <strong>WIP-limit</strong> = maks antall oppgaver som kan være i en kolonne samtidig.
              Forhindrer overbelastning og tvinger teamet til å fullføre arbeid før nytt startes.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Scrumban — det beste av begge</p>
            <p className="text-sm">
              Mange team bruker en hybrid kalt <strong>Scrumban</strong>: de tar Scrums struktur
              (sprinter, roller) og legger til Kanbans WIP-limits og kontinuerlige flyt-fokus.
              Dette gir fleksibilitet uten å miste rammeverkets fordeler.
            </p>
          </div>
        </TheorySummary>
      </section>
    </div>
  );
}
