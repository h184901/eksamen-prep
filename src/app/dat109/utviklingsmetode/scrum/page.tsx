"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import {
  SprintFlowSvg,
  KanbanBoardSvg,
  ProductBacklogVsSprintBacklog,
  BurndownChartSvg,
  ScrumRoles3DiagramSvg,
  SprintTimelineSvg,
} from "@/components/dat109/SmidigVisuals";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function ScrumPage() {
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
        <span className="text-[var(--foreground)]">Scrum</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Scrum</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Den mest brukte smidige metoden — og den mest testede på eksamen. Roller, artefakter,
        seremonier og de vanligste fellene flervalgsoppgaver bruker for å lure deg.
      </p>

      {/* ============================================================ */}
      {/*  4. SCRUM                                                    */}
      {/* ============================================================ */}
      <section id="scrum" className="scroll-mt-32">
        <TheorySummary
          title="Scrum"
          mustKnow={[
            "3 roller: Produkteier, Scrum Master, Utviklingsteam",
            "Scrum Master er IKKE en prosjektleder — er en servant leader som fjerner hindringer",
            "Artefakter: Product Backlog, Sprint Backlog, Inkrement, Burndown Chart",
            "Sprinten er FERDIG når tidsboksen utløper — ikke når alt er gjort",
            "Scrum har INGEN dedikert test-rolle",
            "Product Backlog Refinement er IKKE tidsbokset",
            "Tverrfunksjonelt = teamet som helhet har all kompetanse",
          ]}
        >
          <p>
            Scrum er den mest brukte smidige metoden og den <strong>mest testede på eksamen</strong>.
            Der XP fokuserer på tekniske praksiser, fokuserer Scrum på <strong>prosjektledelse
            og organisering</strong>.
          </p>

          {/* --- ROLLER --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">De tre rollene</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Produkteier (PO)</p>
              <ul className="text-sm space-y-1">
                <li>Representerer kunden/interessenter</li>
                <li>Prioriterer <strong>produktkøen</strong></li>
                <li>Bestemmer <strong>hva</strong> som skal bygges</li>
                <li>Er <strong>ikke</strong> prosjektleder</li>
              </ul>
            </div>
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Scrum Master (SM)</p>
              <ul className="text-sm space-y-1">
                <li><strong>Fjerner hindringer</strong> for teamet</li>
                <li>Sørger for at Scrum-prosessen følges</li>
                <li>Beskytter teamet mot forstyrrelser</li>
                <li>Er en <strong>servant leader</strong>, IKKE sjef</li>
              </ul>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Utviklingsteamet</p>
              <ul className="text-sm space-y-1">
                <li><strong>Tverrfunksjonelt</strong> — all kompetanse i teamet</li>
                <li><strong>Selvorganiserende</strong></li>
                <li>Ideelt 5–8 personer</li>
                <li>Ingen under-roller (ikke &ldquo;tester&rdquo; eller &ldquo;arkitekt&rdquo;)</li>
              </ul>
            </div>
          </div>

          <div className="my-6">
            <p className="text-sm text-[var(--muted)] mb-3">
              Visualisering av samspillet mellom de tre rollene. Klikk på en rolle for å se
              ansvarsområdene — legg merke til at PO mater Product Backlog, teamet trekker
              arbeid fra toppen (pull) og leverer Inkrement, mens Scrum Master fjerner hindringer.
            </p>
            <ScrumRoles3DiagramSvg />
          </div>

          {/* --- ARTEFAKTER --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">Artefakter</h3>

          <div className="my-4">
            <p className="text-sm text-[var(--muted)] mb-3">
              Product Backlog vs. Sprint Backlog. Teamet henter selv (pull) de øverste
              prioriterte oppgavene fra Product Backlog inn i Sprint Backlog — Produkteier
              dytter ikke oppgaver ned på teamet.
            </p>
            <ProductBacklogVsSprintBacklog />
          </div>

          <div className="space-y-3">
            {[
              { name: "Product Backlog", desc: "Prioritert liste over ALT som skal bygges. Eies av Produkteier. Oppgaver formuleres som user stories. Prioriteres etter forretningsmessig verdi." },
              { name: "Sprint Backlog", desc: "Oppgavene teamet har valgt for den aktuelle sprinten. Konkrete, små oppgaver som teamet forplikter seg til." },
              { name: "Inkrement", desc: "Fungerende, potensielt leverbar programvare levert på slutten av hver sprint. IKKE testdokumenter eller wireframes — et kjørende produkt." },
              { name: "Scrum-tavle", desc: "Visualiserer arbeidet med kolonner: «To Do», «Doing», «Done». Også kalt Kanban-tavle." },
              { name: "Burndown Chart", desc: "Viser gjenstående arbeid (Y-akse) i forhold til tid (X-akse). Viser om teamet ligger an til å fullføre sprinten." },
            ].map((a) => (
              <div key={a.name} className="flex gap-3 p-3 rounded-lg bg-[var(--card)] border border-[var(--card-border)]">
                <span className="text-sysdev-600 dark:text-sysdev-400 font-bold text-sm min-w-[140px] shrink-0">{a.name}</span>
                <span className="text-sm">{a.desc}</span>
              </div>
            ))}
          </div>

          <div className="my-6">
            <h4 className="text-base font-bold mb-2">Scrum-tavle (Kanban-tavle)</h4>
            <p className="text-sm text-[var(--muted)] mb-3">
              Klikk på et kort for å flytte det til neste kolonne. Tavlen visualiserer
              arbeidsflyten — og advarer hvis du bryter WIP-grensen i &quot;Doing&quot;
              (Work In Progress). Mange samtidige oppgaver = ingenting blir ferdig.
            </p>
            <KanbanBoardSvg />
          </div>

          <div className="my-6">
            <h4 className="text-base font-bold mb-2">Burndown Chart</h4>
            <p className="text-sm text-[var(--muted)] mb-3">
              Y-aksen viser <strong>gjenstående arbeid</strong> (story points), X-aksen
              dagene i sprinten. Stiplet linje er ideallinjen, lilla linje er faktisk
              progresjon. Hold over et punkt for å se nøyaktig dag og SP. Over ideallinjen
              = bak skjema, under = foran skjema.
            </p>
            <BurndownChartSvg />
          </div>

          {/* --- SEREMONIER --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">Sprint-seremoniene</h3>

          <div className="my-4">
            <p className="text-sm text-[var(--muted)] mb-3">
              Interaktiv sprintflyt: Sprint Planning → Daily Scrum (én per dag) → Sprint
              Review → Sprint Retrospective. Klikk på en fase for å se tidsboks og hva
              som faktisk skjer.
            </p>
            <SprintFlowSvg />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Sprint-flyten</p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono mb-3">
              {[
                "Sprint Planning",
                "Daily Scrum (daglig)",
                "Utvikling",
                "Sprint Review",
                "Sprint Retro",
              ].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                    {phase}
                  </span>
                  {i < 4 && <span className="text-blue-400">→</span>}
                </span>
              ))}
            </div>
          </div>

          <ComparisonTable
            headers={["Seremoni", "Hva skjer?", "Hvem deltar?", "Tidsboks"]}
            rows={[
              ["Sprint Planning", "Teamet velger oppgaver fra Product Backlog og planlegger sprinten", "Hele Scrum-teamet", "Maks 8 timer (for 4-ukers sprint)"],
              ["Daily Scrum", "Kort statusmøte: Hva gjorde jeg? Hva skal jeg gjøre? Hva blokkerer?", "Utviklingsteamet", "Maks 15 minutter"],
              ["Sprint Review", "Demo av inkrementet for PO og interessenter", "Hele teamet + interessenter", "Maks 4 timer"],
              ["Sprint Retro", "Refleksjon: Hva gikk bra? Dårlig? Forbedringer?", "Hele Scrum-teamet", "Maks 3 timer"],
              ["Backlog Refinement", "Klargjøring og estimering av oppgaver", "PO + Utviklingsteamet", "IKKE tidsbokset (!)"],
            ]}
          />

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Viktige eksamensfeller om Scrum</p>
            <ul className="list-disc list-inside text-sm space-y-1.5">
              <li><strong>Sprinten er ferdig når tidsboksen utløper</strong> — IKKE når alle oppgavene er fullført. Uferdig arbeid flyttes tilbake til Product Backlog.</li>
              <li><strong>For mange oppgaver?</strong> Diskuter med kunden (PO) for å endre produktkøen. Aldri jobb overtid eller ta snarveier.</li>
              <li><strong>Scrum har INGEN test-rolle.</strong> Bare tre roller: PO, SM, Team. Testing er teamets felles ansvar.</li>
              <li><strong>Tverrfunksjonelt</strong> betyr at <em>teamet som helhet</em> har all kompetanse — IKKE at hvert individ er tverrfunksjonelt.</li>
              <li><strong>Backlog Refinement</strong> (grooming) er IKKE tidsbokset — det er den eneste aktiviteten som ikke er det.</li>
              <li><strong>Burndown chart</strong> viser gjenstående arbeid vs. tid — IKKE prosjektfremdrift eller lagets hastighet.</li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-8 mb-3">Inkrementell utvikling over flere sprinter</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Scrum bygger produktet ett inkrement av gangen. Hver sprint leverer fungerende
            programvare — og inkrementet vokser sprint for sprint. Slik får kunden tidlig
            verdi og kan justere kurs underveis i stedet for å vente til prosjektet er
            &quot;ferdig&quot;.
          </p>
          <SprintTimelineSvg />
        </TheorySummary>
      </section>
    </div>
  );
}
