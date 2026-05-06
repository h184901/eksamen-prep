"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

/* ─── SVG: CI/CD-pipeline ─── */
function PipelineSvg() {
  const stages = [
    { x: 30, label: "Commit", color: "#3b82f6", icon: "git" },
    { x: 130, label: "Bygg", color: "#3b82f6", icon: "build" },
    { x: 230, label: "Unit-test", color: "#3b82f6", icon: "test" },
    { x: 330, label: "Pakker", color: "#a855f7", icon: "pkg" },
    { x: 430, label: "Integrasjons-test", color: "#a855f7", icon: "test" },
    { x: 530, label: "Deploy stg", color: "#22c55e", icon: "deploy" },
    { x: 630, label: "Deploy prod", color: "#22c55e", icon: "deploy" },
  ];
  return (
    <svg viewBox="0 0 720 200" className="w-full max-w-4xl mx-auto" role="img" aria-label="CI/CD pipeline med stages">
      {/* Pipeline-linje */}
      <line x1={50} y1={100} x2={670} y2={100} stroke="currentColor" strokeWidth={2} />

      {/* Stages */}
      {stages.map((s, i) => (
        <g key={s.label}>
          <circle cx={s.x + 20} cy={100} r={22} fill={s.color} fillOpacity={0.25} stroke={s.color} strokeWidth={2} />
          <text x={s.x + 20} y={104} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor">
            {i + 1}
          </text>
          <text x={s.x + 20} y={155} textAnchor="middle" fontSize={10} fontWeight={600} fill="currentColor">
            {s.label}
          </text>
          {i < stages.length - 1 && (
            <polygon
              points={`${s.x + 50},96 ${s.x + 60},100 ${s.x + 50},104`}
              fill="currentColor"
              opacity={0.5}
            />
          )}
        </g>
      ))}

      {/* Faser-overlegg */}
      <text x={130} y={40} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3b82f6">CI</text>
      <text x={130} y={55} textAnchor="middle" fontSize={9} fill="currentColor" fontStyle="italic">Continuous Integration</text>
      <line x1={50} y1={65} x2={270} y2={65} stroke="#3b82f6" strokeWidth={1} strokeDasharray="3,3" />

      <text x={400} y={40} textAnchor="middle" fontSize={11} fontWeight={700} fill="#a855f7">Continuous Delivery</text>
      <text x={400} y={55} textAnchor="middle" fontSize={9} fill="currentColor" fontStyle="italic">Klar til deploy (manuell knapp)</text>
      <line x1={290} y1={65} x2={570} y2={65} stroke="#a855f7" strokeWidth={1} strokeDasharray="3,3" />

      <text x={620} y={40} textAnchor="middle" fontSize={11} fontWeight={700} fill="#22c55e">Continuous Deployment</text>
      <text x={620} y={55} textAnchor="middle" fontSize={9} fill="currentColor" fontStyle="italic">Auto til prod</text>
      <line x1={580} y1={65} x2={670} y2={65} stroke="#22c55e" strokeWidth={1} strokeDasharray="3,3" />

      {/* Tid */}
      <text x={20} y={195} fontSize={9} fill="currentColor" fontStyle="italic">~5 min</text>
      <text x={680} y={195} textAnchor="end" fontSize={9} fill="currentColor" fontStyle="italic">~30 min totalt</text>
    </svg>
  );
}

/* ─── SVG: DevOps infinity loop ─── */
function DevOpsInfinitySvg() {
  // Ren symbolsk infinity der venstre = Dev, høyre = Ops
  return (
    <svg viewBox="0 0 480 240" className="w-full max-w-2xl mx-auto" role="img" aria-label="DevOps infinity loop">
      {/* Venstre løkke (Dev) */}
      <path
        d="M 240 120 C 240 40, 80 40, 80 120 S 240 200, 240 120"
        fill="none"
        stroke="#3b82f6"
        strokeWidth={3}
      />
      {/* Høyre løkke (Ops) */}
      <path
        d="M 240 120 C 240 40, 400 40, 400 120 S 240 200, 240 120"
        fill="none"
        stroke="#22c55e"
        strokeWidth={3}
      />

      {/* DEV-side */}
      <text x={130} y={60} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3b82f6">PLAN</text>
      <text x={60} y={120} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3b82f6">CODE</text>
      <text x={130} y={185} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3b82f6">BUILD</text>
      <text x={205} y={210} textAnchor="middle" fontSize={11} fontWeight={700} fill="#3b82f6">TEST</text>

      {/* OPS-side */}
      <text x={275} y={210} textAnchor="middle" fontSize={11} fontWeight={700} fill="#22c55e">RELEASE</text>
      <text x={350} y={185} textAnchor="middle" fontSize={11} fontWeight={700} fill="#22c55e">DEPLOY</text>
      <text x={420} y={120} textAnchor="middle" fontSize={11} fontWeight={700} fill="#22c55e">OPERATE</text>
      <text x={350} y={60} textAnchor="middle" fontSize={11} fontWeight={700} fill="#22c55e">MONITOR</text>

      {/* Labels Dev / Ops */}
      <text x={130} y={120} textAnchor="middle" fontSize={14} fontWeight={700} fill="#3b82f6">DEV</text>
      <text x={350} y={120} textAnchor="middle" fontSize={14} fontWeight={700} fill="#22c55e">OPS</text>

      {/* Tagline */}
      <text x={240} y={235} textAnchor="middle" fontSize={10} fontStyle="italic" fill="currentColor">
        Kontinuerlig flyt, ingen siloer — Dev og Ops er likt prioritert
      </text>
    </svg>
  );
}

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
        Continuous Integration, Continuous Delivery, Continuous Deployment, og hvordan DevOps
        bryter ned siloen mellom utvikling og drift med tre bærebjelker. Fra V2023+V2024-eksamen.
      </p>

      {/* ═══════════════════════════════════════════════════════════
          1. CI/CD i bilde — pipeline-visualisering
          ═══════════════════════════════════════════════════════════ */}
      <TheorySummary
        title="CI/CD-pipeline — slik ser den ut"
        defaultOpen={true}
        mustKnow={[
          "Pipelinen kjører automatisk ved hver git push",
          "CI = Commit → Bygg → Test (de første 3-4 stegene)",
          "Continuous Delivery = pakkes og deployes til staging — KAN deployes til prod manuelt",
          "Continuous Deployment = automatisk videre til prod hvis alt er grønt",
        ]}
      >
        <p>
          En CI/CD-pipeline er en automatisert &laquo;samlebånd&raquo; der koden passerer gjennom
          flere stadier etter at en utvikler pusher kode. Slik kan vi gå fra commit til
          produksjon på minutter — ikke uker.
        </p>

        <PipelineSvg />

        <p className="text-sm mt-4">
          Den faktiske pipelinen er som regel definert som kode (YAML-fil) i selve repoet.
          Eksempel for GitHub Actions:
        </p>

        <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 text-xs overflow-x-auto my-3 font-mono">{`# .github/workflows/ci.yml
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
      - name: Build with Maven
        run: mvn clean compile
      - name: Run unit tests
        run: mvn test
      - name: Build package
        run: mvn package
      - name: Deploy to staging
        if: github.ref == 'refs/heads/main'
        run: ./deploy-staging.sh`}</pre>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 my-3 rounded-lg text-sm">
          <strong>Hva skjer hvis et steg feiler?</strong> Pipelinen STOPPER. Teamet får et
          rødt kryss på commit-en. Ingen deploy. Det er fellesregelen at &laquo;hele teamet
          lar alt annet ligge til buildet er grønt igjen&raquo;.
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════════════════════
          2. CI/CD — de tre nivåene
          ═══════════════════════════════════════════════════════════ */}
      <section id="ci-cd" className="scroll-mt-32">
        <TheorySummary
          title="De tre nivåene: CI vs Continuous Delivery vs Continuous Deployment"
          defaultOpen={true}
          mustKnow={[
            "CI (Continuous Integration) = integrer kode ofte + automatisk bygg + automatisk test",
            "Continuous Delivery = koden KAN alltid leveres (manuell deploy-knapp)",
            "Continuous Deployment = koden deployes AUTOMATISK etter testene passerer",
            "Mange forveksler de to siste — pass på på flervalg!",
            "CI er avhengig av TDD — automatiserte tester er fundamentet",
          ]}
        >
          <p>
            CI/CD er <strong>automatiseringen</strong> som gjør smidig utvikling mulig i praksis.
            Uten CI/CD kan du ikke levere hyppig fordi manuell testing og utrulling tar for lang tid.
          </p>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">Continuous Integration (CI)</p>
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
              <p className="text-xs text-[var(--muted)] mt-2 italic">
                Mål: fange integrasjonsfeil tidlig før de blir uoverkommelige.
              </p>
            </div>

            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Continuous Delivery</p>
              <p className="text-sm">
                Bygger på CI. Koden er <strong>alltid i en tilstand som KAN leveres</strong> til produksjon.
                Utrulling til produksjon gjøres <strong>manuelt</strong> — noen trykker på en knapp.
              </p>
              <p className="text-xs text-[var(--muted)] mt-2 italic">
                Brukes når du vil ha menneskelig kontroll over når kode går til produksjon (f.eks. release-vinduer).
              </p>
            </div>

            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1">Continuous Deployment</p>
              <p className="text-sm">
                Går et steg videre: koden rulles <strong>automatisk</strong> ut til produksjon etter at
                alle tester har passert. <strong>Ingen manuell godkjenning.</strong> Store skyselskaper
                ruller ut kode hundrevis av ganger om dagen.
              </p>
              <p className="text-xs text-[var(--muted)] mt-2 italic">
                Krever EKSTREMT god testdekning og overvåking — ellers ruller du feil i produksjon raskt.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-4 rounded-lg text-sm">
            <strong>V2024-eksamen oppgave 3l:</strong> &laquo;Hva er fordelene med continuous
            integration?&raquo; — Riktig svar: <em>Større fleksibilitet og hurtig utvikling.</em>
            (Ikke &laquo;Alle de andre&raquo; — &laquo;Fjerning av behovet for manuell testing&raquo;
            er feil; manuell brukertesting trengs fortsatt.)
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
              ["Containere", "Docker, Podman", "Pakker koden med alle avhengigheter"],
              ["Orkestrering", "Kubernetes, Docker Swarm", "Skalerer og deployer containere"],
              ["Monitoring", "Prometheus, Grafana, Sentry", "Følger med på hvordan koden fungerer i prod"],
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

      {/* ═══════════════════════════════════════════════════════════
          3. DevOps
          ═══════════════════════════════════════════════════════════ */}
      <section id="devops" className="scroll-mt-32">
        <TheorySummary
          title="DevOps — bryt siloen mellom Dev og Ops"
          defaultOpen={true}
          mustKnow={[
            "DevOps = bryte ned siloer mellom utvikling (Dev) og drift (Ops)",
            "Begge lag har LIK prioritet — ingen over den andre (V2023 testet dette)",
            "Tre bærebjelker: alle ansvar for alt, automatiser alt, mål og forbedre",
            "Hovedmål V2024: 'fremskynde programvareutviklingsprosessen'",
            "Bygger på CI/CD + infrastrukturautomatisering + overvåking",
          ]}
        >
          <p>
            Tradisjonelt var det ett team som utviklet koden (Development) og et helt annet
            team som tok seg av drift og utrulling (Operations). Dette førte til en
            &laquo;over gjerdet&raquo;-kultur der utviklere kastet kode til drift, og drift
            klagde over dårlig kode. DevOps bryter ned denne barrieren.
          </p>

          <DevOpsInfinitySvg />

          <p className="text-sm mt-4">
            Symbolet for DevOps er en uendelighetsløkke (∞) — for å vise at dette er en
            <strong> kontinuerlig syklus</strong>, ikke en lineær prosess. Plan → Code → Build → Test
            → Release → Deploy → Operate → Monitor → tilbake til Plan.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-5 rounded-lg">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-3">De tre bærebjelkene i DevOps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">1. Alle har ansvar for alt</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Dev og Ops jobber sammen gjennom hele livssyklusen. Utviklere er &laquo;on call&raquo;
                  for koden de skriver — det skaper insentiv til å skrive god kode.
                </p>
              </div>
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">2. Automatiser alt</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  CI/CD, Infrastructure as Code, automatisert testing, automatisk overvåking. Manuelt
                  arbeid er feilkilder.
                </p>
              </div>
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">3. Mål og forbedre</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Prosess-metrikker (deploy-frekvens, MTTR), tjeneste-metrikker (uptime, latency).
                  Du kan ikke forbedre det du ikke måler.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-4 rounded-lg text-sm">
            <strong>V2024-eksamen oppgave 3k:</strong> &laquo;Hva er hovedmålet med DevOps?&raquo;
            Riktig svar: <em>Fremskynde programvareutviklingsprosessen.</em> (Ikke
            &laquo;reduserer kompleksitet&raquo; eller &laquo;eliminerer behovet for oppdateringer&raquo;.)
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">DevOps-pipelines (utvidet)</h3>
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
            <p className="text-sm mb-2">
              I stedet for å manuelt installere programvare på servere (&laquo;klikk her, legg inn dette
              passordet, last ned…&raquo;), definerer man infrastrukturen som <strong>kode</strong>.
              Verktøy som Docker og Kubernetes lar deg skrive et skript som automatisk setter opp
              en server med 100% identisk konfigurasjon hver gang.
            </p>
            <p className="text-sm font-semibold mt-2">Fordeler:</p>
            <ul className="text-sm list-disc list-inside ml-2">
              <li><strong>Repeterbarhet</strong> — samme oppskrift gir samme miljø hver gang</li>
              <li><strong>Versjonskontroll</strong> — du kan rulle tilbake infrastruktur som kode</li>
              <li><strong>Rask skalering</strong> — flere servere på sekunder, ikke uker</li>
              <li><strong>Dokumentasjon</strong> — koden ER dokumentasjonen</li>
            </ul>
            <pre className="bg-neutral-900 text-neutral-100 rounded p-3 text-xs mt-3 font-mono overflow-x-auto">{`# Eksempel: Dockerfile (definerer en server som kode)
FROM openjdk:17-slim
WORKDIR /app
COPY target/stigespill.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]`}</pre>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">DevSecOps — sikkerhet bakt inn</h3>
          <p className="text-sm">
            En naturlig utvidelse av DevOps der <strong>sikkerhet</strong> integreres i hele pipelinen
            (ikke bare som siste sjekk). Statisk kodeanalyse, dependency-scanning,
            penetrasjonstesting — alt automatisert i CI.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">Hva måles i DevOps?</h3>
          <ComparisonTable
            headers={["Type", "Eksempler"]}
            rows={[
              ["Prosess-metrikker", "Deployment-frekvens, lead time for changes, mean time to recovery (MTTR), change failure rate"],
              ["Tjeneste-metrikker", "Oppetid (availability), responstid (latency), antall brukerfeil, kundetilfredshet"],
              ["DORA-metrikker", "De fire metrikkene fra DORA-rapporten: deployment frequency, lead time, MTTR, change failure rate"],
            ]}
          />

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg text-sm">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Når feilet en deploy?</p>
            <p>
              I DevOps håndterer man feil med:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Rollback</strong> — gå tilbake til forrige versjon på sekunder</li>
              <li><strong>Canary deploy</strong> — deploy til 5% av brukere først, vurder, så til alle</li>
              <li><strong>Feature flags</strong> — slå av en feature uten å rulle tilbake hele deploy-en</li>
              <li><strong>Blue/green</strong> — to identiske miljøer, switcher trafikken instant</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* Navigation */}
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <Link
          href="/dat109/utviklingsmetode/tdd"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← TDD</p>
          <p className="font-bold mt-1">TDD — bygger CI-fundamentet</p>
          <p className="text-xs text-[var(--muted)]">Automatiserte tester er det CI baserer seg på</p>
        </Link>
        <Link
          href="/dat109/utviklingsmetode/aup"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Neste →</p>
          <p className="font-bold mt-1">AUP — Agile Unified Process</p>
          <p className="text-xs text-[var(--muted)]">Hvordan AUP og Scrum kombineres med CI/CD i konstruksjonsfasen</p>
        </Link>
      </div>
    </div>
  );
}
