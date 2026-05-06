"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function ModelleringPage() {
  const subpages = [
    {
      href: `${dat109BasePaths.modellering}/brukstilfelle`,
      icon: "👥",
      title: "Brukstilfellemodell",
      description:
        "Use case-diagram med aktører og brukstilfeller, samt tekstlige brukstilfellebeskrivelser.",
    },
    {
      href: `${dat109BasePaths.modellering}/domene`,
      icon: "🧩",
      title: "Domenemodell",
      description:
        "Konseptuelt klassediagram fra virkeligheten — klasser, attributter, assosiasjoner og multiplisitet.",
    },
    {
      href: `${dat109BasePaths.modellering}/sekvens`,
      icon: "↔️",
      title: "Sekvensdiagram",
      description:
        "Hvordan objektene samarbeider for å utføre brukstilfellet — meldinger, loop, alt og opt.",
    },
    {
      href: `${dat109BasePaths.modellering}/eksempler`,
      icon: "📚",
      title: "Case-studier",
      description:
        "Komplette OOAD-eksempler som binder sammen brukstilfelle, domene og sekvens.",
      badge: "NY",
    },
    {
      href: `${dat109BasePaths.modellering}/sjekkliste`,
      icon: "✅",
      title: "Sjekkliste",
      description:
        "Sjekkliste for oppgave 1 på eksamen + oversikt over hva som faktisk har kommet på tidligere eksamener.",
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Modellering</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />

      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-2 inline-block">
          ~40% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">Modellering</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Brukstilfellemodell, domenemodell og sekvensdiagram. Dette er den viktigste
          delen av eksamen og utgjør nesten halvparten av karakteren.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          DEN STORE SAMMENHENGEN
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Den store sammenhengen: OOA → OOD → OOP"
        mustKnow={[
          "Forskjellen mellom analyse (HVA) og design (HVORDAN)",
          "Domenemodell = virkelig verden (ingen metoder), utformingsmodell = programvare (med metoder)",
          "Sekvensdiagrammet binder brukstilfellebeskrivelsen til klassedesignet",
          "Prosessen er iterativ — start enkelt, bygg ut gradvis",
        ]}
      >
        <p>
          Hele faget handler om å gå fra en <strong>problembeskrivelse</strong> (vanligvis et spill)
          til <strong>kjørbar kode</strong> gjennom tre steg:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 my-4">
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1">OOA — Analyse</h4>
            <p className="text-sm"><strong>HVA</strong> skal systemet gjøre?</p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Brukstilfeller (funksjonelle krav)</li>
              <li>Domenemodell (objekter i problemet)</li>
            </ul>
            <p className="text-xs text-[var(--muted)] mt-2">Du tenker IKKE på kode ennå.</p>
          </div>
          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
            <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-1">OOD — Design</h4>
            <p className="text-sm"><strong>HVORDAN</strong> skal objektene samarbeide?</p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Sekvensdiagram (meldinger)</li>
              <li>Utformingsmodell (klasser med metoder)</li>
            </ul>
            <p className="text-xs text-[var(--muted)] mt-2">Du begynner å tenke på kode.</p>
          </div>
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 text-sm mb-1">OOP — Kode</h4>
            <p className="text-sm"><strong>SKRIV</strong> Java fra diagrammene.</p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Klasser fra utformingsmodellen</li>
              <li>Metoder fra sekvensdiagrammet</li>
            </ul>
            <p className="text-xs text-[var(--muted)] mt-2">Oppgave 4 på eksamen.</p>
          </div>
        </div>

        <p>
          Professoren understreker at dette er en <strong>iterativ prosess</strong>. I
          Monopol-eksempelet startet han med et spill uten penger, uten eiendom, kun 20 runder.
          Deretter la han til penger, fengsel, og eiendommer i nye iterasjoner. På eksamen har du
          ikke tid til iterasjoner, men <strong>tankemåten</strong> er viktig: start enkelt og lag
          en konsistent modell.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 mt-4">
          <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Oppgave 1 på eksamen</h4>
          <p className="text-sm mb-2">Gitt en problemstilling (nesten alltid et spill), lag:</p>
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li><strong>a)</strong> Brukstilfellemodell med diagram + beskrivelser</li>
            <li><strong>b)</strong> Domenemodell (klassediagram med konseptuelle klasser)</li>
            <li><strong>c)</strong> Sekvensdiagram for brukstilfellene (maks 3)</li>
          </ol>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          UNDERSIDER — KORT
          ═══════════════════════════════════════════ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Utforsk emnet</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subpages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-sysdev-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-3xl" aria-hidden>{page.icon}</span>
              {page.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {page.badge}
                </span>
              )}
            </div>
            <h3 className="font-bold text-base mb-1 group-hover:text-sysdev-600 dark:group-hover:text-sysdev-400 transition-colors">
              {page.title}
            </h3>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
