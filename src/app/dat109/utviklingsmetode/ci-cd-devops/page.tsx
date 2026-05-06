"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function CICDDevOpsPage() {
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
        <span className="text-[var(--foreground)]">CI/CD og DevOps</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">CI/CD og DevOps</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        Continuous Integration / Delivery / Deployment, verktøykjeden for CI, og hvordan
        DevOps bryter ned siloen mellom utvikling og drift med tre bærebjelker.
      </p>

      {/* ============================================================ */}
      {/*  7. CI/CD                                                    */}
      {/* ============================================================ */}
      <section id="ci-cd" className="scroll-mt-32">
        <TheorySummary
          title="CI/CD — Kontinuerlig Integrasjon og Levering"
          mustKnow={[
            "CI = integrer kode ofte + automatisk bygg + automatisk test",
            "Continuous Delivery = koden KAN alltid leveres (manuell deploy)",
            "Continuous Deployment = koden deployes AUTOMATISK etter testene passerer",
            "CI krever: IDE, Git, testrammeverk, byggtjener, kvalitetsverktøy",
            "CI er avhengig av TDD — automatiserte tester er fundamentet",
          ]}
        >
          <p>
            CI/CD er <strong>automatiseringen</strong> som gjør smidig utvikling mulig i praksis.
            Uten CI/CD kan du ikke levere hyppig fordi manuell testing og utrulling tar for lang tid.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De tre nivåene</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">Kontinuerlig Integrasjon (CI)</p>
              <p className="text-sm mb-2">
                Utviklere integrerer koden i et felles repository <strong>ofte</strong> — minst daglig,
                helst flere ganger om dagen. Hver gang kode sjekkes inn, kjøres en <strong>automatisk
                bygg- og testprosess</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
                {["git push", "Bygg", "Test", "Rapport"].map((s, i) => (
                  <span key={s} className="flex items-center gap-1">
                    <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">{s}</span>
                    {i < 3 && <span className="text-blue-400">→</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Kontinuerlig Levering (Continuous Delivery)</p>
              <p className="text-sm">
                Bygger på CI. Koden er <strong>alltid i en tilstand som KAN leveres</strong> til produksjon.
                Utrulling til produksjon gjøres <strong>manuelt</strong> — noen trykker på en knapp.
              </p>
            </div>

            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1">Kontinuerlig Utrulling (Continuous Deployment)</p>
              <p className="text-sm">
                Går et steg videre: koden rulles <strong>automatisk</strong> ut til produksjon etter at
                alle tester har passert. <strong>Ingen manuell godkjenning.</strong> Store skyselskaper
                ruller ut kode hundrevis av ganger om dagen.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Verktøykjeden for CI</h3>
          <ComparisonTable
            headers={["Kategori", "Eksempler", "Rolle i CI-pipeline"]}
            rows={[
              ["IDE", "IntelliJ, Eclipse, VS Code", "Utviklerens arbeidsverktøy"],
              ["Versjonskontroll", "Git (GitHub, GitLab, Bitbucket)", "Delt kodebase — all kode på ett sted"],
              ["Testrammeverk", "JUnit, pytest, Jest", "Automatiske tester som kjøres ved bygg"],
              ["Byggtjener", "Jenkins, GitHub Actions, GitLab CI", "Automatisk bygging og testing ved push"],
              ["Kodekvalitet", "SonarQube, linters", "Sjekker kodestandarder og feil automatisk"],
              ["Utrulling", "Docker, Kubernetes", "Pakker og deployer koden automatisk"],
            ]}
          />

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">CI + Scrum (eksamenstema 2021)</p>
            <p className="text-sm">
              I hver sprint sjekker utviklerne inn kode ofte. Automatiserte tester kjører ved
              hver innsjekking, og byggtjeneren sier fra om noe er galt. Dette gir <strong>rask
              tilbakemelding</strong> til teamet og sikrer at inkrementet alltid er i en leverbar tilstand.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  8. DEVOPS                                                   */}
      {/* ============================================================ */}
      <section id="devops" className="scroll-mt-32">
        <TheorySummary
          title="DevOps"
          mustKnow={[
            "DevOps = bryte ned siloer mellom utvikling (Dev) og drift (Ops)",
            "Begge lag har LIK prioritet — ingen over den andre",
            "Tre bærebjelker: alle ansvar for alt, automatiser alt, mål og forbedre",
            "Bygger på CI/CD + infrastrukturautomatisering + overvåking",
            "Infrastructure as Code: definer servere/miljøer som kode (Docker, Kubernetes)",
          ]}
        >
          <p>
            Tradisjonelt var det ett team som utviklet koden (Development) og et helt annet
            team som tok seg av drift og utrulling (Operations). DevOps bryter ned denne
            barrieren og gjør <strong>hele teamet ansvarlig for hele livssyklusen</strong>.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-5 rounded-lg">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-3">De tre bærebjelkene i DevOps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">1. Alle har ansvar for alt</p>
                <p className="text-xs text-[var(--muted)] mt-1">Dev og Ops jobber sammen gjennom hele livssyklusen</p>
              </div>
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">2. Automatiser alt</p>
                <p className="text-xs text-[var(--muted)] mt-1">CI/CD, Infrastructure as Code, automatisert testing</p>
              </div>
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">3. Mål og forbedre</p>
                <p className="text-xs text-[var(--muted)] mt-1">Prosess-metrikker, tjeneste-metrikker, kontinuerlig forbedring</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">DevOps-pipelines</h3>
          <div className="flex flex-wrap items-center gap-1 text-xs font-mono my-3">
            {["Kode", "Bygg", "Test", "Pakketer", "Release", "Deploy", "Overvåk"].map((s, i) => (
              <span key={s} className="flex items-center gap-1">
                <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">{s}</span>
                {i < 6 && <span className="text-green-400">→</span>}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Infrastructure as Code (IaC)</h3>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="text-sm">
              I stedet for å manuelt installere programvare på servere, definerer man
              infrastrukturen som <strong>kode</strong>. Verktøy som Docker og Kubernetes
              lar deg skrive et skript som automatisk setter opp en server med 100% identisk
              konfigurasjon hver gang. Fordeler: <strong>repeterbarhet</strong>,
              <strong> versjonskontroll</strong>, <strong>rask skalering</strong>.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hva måles i DevOps?</h3>
          <ComparisonTable
            headers={["Type", "Eksempler"]}
            rows={[
              ["Prosess-metrikker", "Deployment-frekvens, lead time for changes, mean time to recovery (MTTR), change failure rate"],
              ["Tjeneste-metrikker", "Oppetid (availability), responstid (latency), antall brukerfeil, kundetilfredshet"],
            ]}
          />
        </TheorySummary>
      </section>
    </div>
  );
}
