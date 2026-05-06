"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

const subPageCards: { href: string; title: string; description: string; badge?: string }[] = [
  {
    href: "/dat109/utviklingsmetode/smidig-grunnlag",
    title: "Smidig grunnlag",
    description: "Smidig vs fossefall + det agile manifestet (4 verdier, 12 prinsipper).",
  },
  {
    href: "/dat109/utviklingsmetode/scrum",
    title: "Scrum",
    description: "Roller (PO, SM, team), artefakter, sprint-seremonier og vanlige eksamensfeller.",
  },
  {
    href: "/dat109/utviklingsmetode/xp",
    title: "Extreme Programming (XP)",
    description: "5 verdier, 12 praksiser, parprogrammering — og hvorfor dokumentasjon ikke er en XP-verdi.",
  },
  {
    href: "/dat109/utviklingsmetode/tdd",
    title: "Test-drevet utvikling (TDD)",
    description: "Red → Green → Refactor, testdoubles, testpyramiden og krav til testbare enheter.",
  },
  {
    href: "/dat109/utviklingsmetode/ci-cd-devops",
    title: "CI/CD og DevOps",
    description: "Continuous Integration / Delivery / Deployment, verktøykjeden, og DevOps-bærebjelkene.",
  },
  {
    href: "/dat109/utviklingsmetode/aup",
    title: "AUP — Agile Unified Process",
    description: "4 faser, 7 disipliner, og hvordan AUP kombineres med Scrum i byggefasen.",
  },
  {
    href: "/dat109/utviklingsmetode/arkitektur",
    title: "Software arkitektur",
    description: "Sommerville kap 4 — kvalitetsattributter, lagdelt arkitektur, distribusjonsmønstre.",
    badge: "NY",
  },
  {
    href: "/dat109/utviklingsmetode/kanban",
    title: "Kanban vs Scrum",
    description: "WIP-limits, kontinuerlig flyt, Scrumban — og når man velger hva.",
  },
  {
    href: "/dat109/utviklingsmetode/eksamen",
    title: "Eksamendrilling",
    description: "Flervalgsoppgaver fra V2023 og V2024 (oppgave 3) — drill deg selv.",
  },
];

export default function UtviklingsmetodePage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.utviklingsmetode} pages={utviklingsmetodePages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Utviklingsmetode</span>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-2 inline-block">
          ~20% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">Utviklingsmetode</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Scrum, Extreme Programming, TDD, CI/CD, AUP, DevOps og smidig utvikling.
          Fra 2023 er dette flervalg på eksamen — men du trenger dyp forståelse for å
          avsløre feilalternativene.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  1. OVERSIKT                                                 */}
      {/* ============================================================ */}
      <section id="oversikt" className="scroll-mt-32">
        <TheorySummary
          title="Oversikt — Hva handler dette om?"
          mustKnow={[
            "De 4 verdiene i det agile manifestet (dukker opp HVERT år)",
            "Scrum-rollene, artefaktene og seremoniene",
            "TDD: Red → Green → Refactor-syklusen",
            "Forskjellen mellom CI, Continuous Delivery og Continuous Deployment",
            "AUPs fire faser og hvordan de kombineres med Scrum",
            "XPs 5 verdier (spesielt at Dokumentasjon IKKE er en av dem)",
          ]}
        >
          <p>
            Oppgave 3 på eksamen (20%) handler om <strong>utviklingsmetoder</strong> — hvordan
            vi organiserer og gjennomfører programvareprosjekter. Fra 2023 er dette blitt
            flervalg, men alternativene er designet for å lure deg hvis du bare har
            overfladisk forståelse.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Den store sammenhengen</p>
            <p className="text-sm">
              Tradisjonelt brukte man <strong>fossefallsmodellen</strong> — alt ble planlagt
              i detalj før koding startet. Problemet: kunden så produktet først på slutten,
              og da var det ofte feil ting som var bygd. <strong>Smidige metoder</strong> løser
              dette ved å levere fungerende programvare i korte sykluser, slik at kunden gir
              tilbakemelding tidlig og ofte.
            </p>
          </div>

          {/* Visuell oversikt over metodene */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
            {[
              { name: "Scrum", desc: "Prosjektledelse med sprinter og roller", color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" },
              { name: "XP", desc: "Tekniske praksiser (TDD, parprog.)", color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800" },
              { name: "TDD", desc: "Skriv testen FØR koden", color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" },
              { name: "CI/CD", desc: "Automatisk bygging, testing, utrulling", color: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800" },
              { name: "DevOps", desc: "Dev + Ops = ett team", color: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800" },
              { name: "AUP", desc: "Overordnet rammeverk med 4 faser", color: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800" },
            ].map((m) => (
              <div key={m.name} className={`rounded-lg border p-3 ${m.color}`}>
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-xs mt-1 text-[var(--muted)]">{m.desc}</p>
              </div>
            ))}
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  Kort-grid med lenker til alle undersider                    */}
      {/* ============================================================ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Undersider</h2>
        <p className="text-[var(--muted)] text-sm mb-6 max-w-2xl">
          Hver underside dekker ett tema i dybden. Start med smidig grunnlag og det agile
          manifestet hvis du er ny på temaet — eller gå rett til eksamendrilling for å
          teste deg selv.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subPageCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-sysdev-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base group-hover:text-sysdev-600 dark:group-hover:text-sysdev-400 transition-colors">
                  {card.title}
                </h3>
                {card.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--muted)] leading-snug">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
