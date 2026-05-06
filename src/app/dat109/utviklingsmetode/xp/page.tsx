"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ComparisonTable } from "@/components/dat109/UtviklingsmetodeComponents";
import { utviklingsmetodePages, dat109BasePaths } from "@/lib/dat109-subpages";

export default function XPPage() {
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
        <span className="text-[var(--foreground)]">XP</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Extreme Programming (XP)</h1>
      <p className="text-[var(--muted)] mb-6 max-w-2xl">
        XPs 5 verdier, 12 praksiser og hvordan parprogrammering, TDD og refaktorering
        passer sammen. Husk: dokumentasjon er IKKE en XP-verdi.
      </p>

      {/* ============================================================ */}
      {/*  5. EXTREME PROGRAMMING (XP)                                */}
      {/* ============================================================ */}
      <section id="xp" className="scroll-mt-32">
        <TheorySummary
          title="Extreme Programming (XP)"
          mustKnow={[
            "5 verdier: Enkelhet, Kommunikasjon, Tilbakemelding, Respekt, Mot",
            "Dokumentasjon er IKKE en XP-verdi (vanlig flervalg-felle!)",
            "12 praksiser — spesielt: parprogrammering, TDD, CI, refaktorering",
            "Parprogrammering: to personer, én maskin (driver + navigator)",
          ]}
        >
          <p>
            XP ble utviklet på slutten av 90-tallet og tar anerkjente utviklingspraksiser
            til det &ldquo;ekstreme&rdquo;. Der Scrum fokuserer på prosjektledelse, fokuserer
            XP på <strong>tekniske praksiser</strong> — hvordan koden faktisk skrives.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De 5 verdiene</h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
            {[
              { val: "Enkelhet", desc: "Gjør det som trengs, ikke mer" },
              { val: "Kommunikasjon", desc: "Alle er del av laget" },
              { val: "Tilbakemelding", desc: "Demo tidlig og ofte" },
              { val: "Respekt", desc: "Alle bidrar med verdi" },
              { val: "Mot", desc: "Vær ærlig om fremgang" },
            ].map((v) => (
              <div key={v.val} className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-3 text-center">
                <p className="font-bold text-purple-700 dark:text-purple-400 text-sm">{v.val}</p>
                <p className="text-xs text-[var(--muted)] mt-1">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-3 my-4 rounded-lg">
            <p className="text-sm">
              <strong>Dokumentasjon</strong> er IKKE en XP-verdi! Dette er testet på eksamen 2023 (oppgave 3.7).
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De viktigste XP-praksisene</h3>

          <ComparisonTable
            headers={["Praksis", "Hva betyr det?", "Hvorfor?"]}
            rows={[
              ["Parprogrammering", "To utviklere jobber sammen på én maskin — driver (skriver) + navigator (tenker)", "Fanger feil tidlig, deler kunnskap"],
              ["Test-drevet utvikling (TDD)", "Skriv testen FØR koden (Red-Green-Refactor)", "Høy kodekvalitet, rask tilbakemelding"],
              ["Kontinuerlig integrasjon (CI)", "Integrer kode flere ganger daglig med automatiske tester", "Fanger opp integrasjonsfeil tidlig"],
              ["Refaktorering", "Forbedre kodestruktur uten å endre funksjonalitet", "Holder koden ren og vedlikeholdbar"],
              ["Korte leveranser", "Lanser minimale, nyttige versjoner hyppig", "Raskere tilbakemelding fra kunden"],
              ["Enkel utforming", "Design den enkleste løsningen som fungerer", "Unngår unødvendig kompleksitet"],
              ["Kollektivt eierskap", "Alle eier all kode — hvem som helst kan endre hva som helst", "Fjerner flaskehalser"],
              ["Kodestandard", "Teamet enes om felles kodestil", "Koden ser lik ut uansett hvem som skriver"],
            ]}
          />

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Scrum + XP = Best Practice</p>
            <p className="text-sm">
              I praksis kombineres Scrum og XP ofte. Scrum gir rammeverket (roller, sprinter, seremonier),
              mens XP gir de tekniske praksisene (TDD, parprogrammering, CI, refaktorering).
              Scrum sier <em>hvordan vi organiserer</em>, XP sier <em>hvordan vi koder</em>.
            </p>
          </div>
        </TheorySummary>
      </section>
    </div>
  );
}
