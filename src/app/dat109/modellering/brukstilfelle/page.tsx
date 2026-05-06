"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";
import {
  UseCaseMonopol,
  UseCaseStigespill,
  UseCaseEksamen,
  UseCaseMaxMummelmann,
} from "@/components/dat109/UmlDiagrams";

export default function BrukstilfellePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/modellering" className="hover:text-[var(--accent)]">Modellering</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Brukstilfelle</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Brukstilfellemodell</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Use case-diagram med aktører og brukstilfeller, og tekstlige brukstilfellebeskrivelser
          — oppgave 1a på eksamen.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          BRUKSTILFELLEMODELL
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="1. Brukstilfellemodell (Use Case)"
        mustKnow={[
          "Tegne brukstilfellesdiagram med aktører, system, og brukstilfeller",
          "Skrive tekstlig brukstilfellebeskrivelse (nummererte steg)",
          "Bruke <<include>> og <<extends>> korrekt",
          "Et brukstilfelle er en FUNKSJON, ikke et steg i en sekvens",
        ]}
      >
        {/* Hva er det */}
        <h3 className="text-lg font-bold mt-2">Hva er en brukstilfellemodell?</h3>
        <p>
          En brukstilfellemodell består av to deler: et <strong>brukstilfellediagram</strong> (tegning)
          og <strong>brukstilfellebeskrivelser</strong> (tekst eller aktivitetsdiagram). Til
          sammen viser de <em>hva</em> systemet gjør for brukerne — ikke <em>hvordan</em>.
        </p>

        {/* KRITISK REGEL */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            KRITISK REGEL — vanligste feilen på eksamen
          </h4>
          <p className="text-sm font-semibold">
            Brukstilfellesdiagrammet skal IKKE være et flytdiagram!
          </p>
          <p className="text-sm mt-1">
            Mange studenter lager en sekvens av handlinger som separate brukstilfeller (f.eks.
            «Trill terning» → «Flytt brikke» → «Sjekk vinner»). Det er <strong>feil</strong>.
            Et brukstilfelle er en <strong>funksjon</strong> systemet tilbyr — noe en aktør kan
            gjøre med systemet på et <strong>høyt nivå</strong>. For spillene på eksamen trenger du
            vanligvis bare 2–4 brukstilfeller.
          </p>
        </div>

        {/* Elementer */}
        <h3 className="text-lg font-bold">Elementene i diagrammet</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Element</th>
                <th className="text-left py-2 pr-4 font-semibold">Symbol</th>
                <th className="text-left py-2 font-semibold">Beskrivelse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-medium">Aktør</td>
                <td className="py-2 pr-4">Strekfigur med navn</td>
                <td className="py-2">Noen/noe <em>utenfor</em> systemet som interagerer med det. Kan være person eller system (da markert med <code>&lt;&lt;actor&gt;&gt;</code>).</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">System</td>
                <td className="py-2 pr-4">Rektangel med navn</td>
                <td className="py-2">Rammen rundt brukstilfellene. Systemnavnet øverst.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Brukstilfelle</td>
                <td className="py-2 pr-4">Ellipse med navn</td>
                <td className="py-2">En funksjon systemet tilbyr. Representerer <em>hva</em> brukeren kan gjøre.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Assosiasjon</td>
                <td className="py-2 pr-4">Linje</td>
                <td className="py-2">Kobler aktør til brukstilfelle.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">&lt;&lt;include&gt;&gt;</td>
                <td className="py-2 pr-4">Stiplet pil med tekst</td>
                <td className="py-2">Et brukstilfelle inkluderer <em>alltid</em> et annet. F.eks. «Spill» includes «Init».</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">&lt;&lt;extends&gt;&gt;</td>
                <td className="py-2 pr-4">Stiplet pil med tekst</td>
                <td className="py-2">Et brukstilfelle <em>kan</em> utvide et annet (valgfri tilleggsfunksjonalitet).</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Oppskrift */}
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Steg-for-steg: Slik lager du brukstilfellemodellen på eksamen
          </h4>
          <ol className="text-sm list-decimal list-inside space-y-2">
            <li><strong>Les oppgaven to ganger.</strong> Let etter handlinger på høyt nivå — «Hva kan brukeren gjøre med systemet?»</li>
            <li><strong>Identifiser aktører.</strong> For spill: vanligvis «Observatør» eller «Spiller». Noen ganger et eksternt system (<code>&lt;&lt;actor&gt;&gt;</code>).</li>
            <li><strong>Finn 2–4 brukstilfeller.</strong> For spill er det nesten alltid: sette opp spillet (init) og spille spillet. Eventuelt et tredje for en spesialhandling.</li>
            <li><strong>Tegn diagrammet</strong> med system-rektangel, aktører utenfor, brukstilfeller (ellipser) inni.</li>
            <li><strong>Legg til relasjoner:</strong> assosiasjoner mellom aktører og brukstilfeller, <code>&lt;&lt;include&gt;&gt;</code> der det gir mening.</li>
            <li><strong>Skriv brukstilfellebeskrivelse</strong> for hvert brukstilfelle med nummererte steg.</li>
          </ol>
        </div>

        {/* Brukstilfellebeskrivelse */}
        <h3 className="text-lg font-bold">Brukstilfellebeskrivelsen</h3>
        <p>
          For hvert brukstilfelle skriver du en <strong>tekstlig algoritme</strong> — nummererte steg
          som beskriver hovedflyten. Alternativt kan du tegne et aktivitetsdiagram, men tekst er
          raskere på eksamen.
        </p>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Struktur for beskrivelsen</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Navn:</strong> Brukstilfelleets navn</li>
            <li><strong>Aktør:</strong> Hvem utfører det</li>
            <li><strong>Forkrav:</strong> Hva må være sant før brukstilfellet starter</li>
            <li><strong>Hovedflyt:</strong> Nummerert liste med steg (inkl. løkker og betingelser)</li>
            <li><strong>Alternativ flyt:</strong> Hva skjer ved avvik (valgfritt)</li>
          </ul>
        </div>

        {/* ── Eksempel: Monopol ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra forelesning: Monopol</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Professorens eget eksempel (F03–F06)</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Brukstilfellesdiagram — Monopol</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <UseCaseMonopol />
          </div>
          <p className="text-sm mt-3">
            <strong>Bare 2 brukstilfeller!</strong> «Spill» inkluderer «Init». Observatøren starter
            spillet og overvåker det. Simuleringen kjører automatisk.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Brukstilfellebeskrivelse — «Spill Monopol»</h4>
          <div className="text-sm space-y-1">
            <p><strong>Forkrav:</strong> Spillet er initialisert</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Start spillet</li>
              <li>Hver spiller gjør et trekk:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-0.5">
                  <li>Trill terningene</li>
                  <li>Flytt brikken det antall ruter terningene viser</li>
                  <li>Utfør handling basert på ruten man lander på</li>
                </ul>
              </li>
              <li>Gjenta fra steg 2 til spillet er ferdig (20 runder)</li>
            </ol>
          </div>
        </div>

        {/* ── Eksempel: Stigespill ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra forelesning: Stigespill</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra F08 — brukt i obligatorisk øvelse</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Brukstilfellesdiagram — Stigespill</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <UseCaseStigespill />
          </div>
          <p className="text-sm mt-3">
            <strong>Bare 1 brukstilfelle!</strong> Professorens kommentar: «For et simulert spill
            trenger du svært få brukstilfeller.»
          </p>
        </div>

        {/* ── Eksempel: Eksamen 2020 ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Eksamenssystem (2020)</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra eksamen høst 2020 med fasit</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Brukstilfellesdiagram — Eksamenssystem</h4>
          <p className="text-sm mb-3">
            Automatisert system for avvikling av digital multiple-choice eksamen.
          </p>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <UseCaseEksamen />
          </div>
          <p className="text-sm mt-3">
            Her er det 5 brukstilfeller fordi systemet er mer komplekst enn et spill. «Lever
            besvarelse» er &lt;&lt;include&gt;&gt; av «Besvar eksamen» og kan også utløses av
            aktøren «Klokke» (automatisk levering ved tidsfrist).
          </p>
        </div>

        {/* ── Eksempel: Eksamen 2023 ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Max Mümmelmann (vår 2023)</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Nyeste eksamen med komplett fasit fra professoren</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Brukstilfellesdiagram — Max Mümmelmann</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <UseCaseMaxMummelmann />
          </div>
          <div className="mt-3">
            <h4 className="font-semibold text-sm mb-2">Brukstilfellebeskrivelse — «Spill tur»</h4>
            <p className="text-sm"><strong>Forkrav:</strong> Spillet må være startet</p>
            <ol className="list-decimal list-inside text-sm space-y-1 mt-1">
              <li>Trill terning</li>
              <li>Flytt kaninbrikken det antall plasser som terningen viser</li>
              <li>Ta det øverste kortet i stabelen der spilleren landet</li>
              <li>Hvis spilleren mangler familiemedlemmet → behold kortet</li>
              <li>Ellers → legg kortet tilbake i bunnen av bunken</li>
              <li>Hvis terningen viser 6 → spill ny tur</li>
            </ol>
          </div>
          <div className="mt-3">
            <h4 className="font-semibold text-sm mb-2">Brukstilfellebeskrivelse — «Start spill»</h4>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>«Init spill» (included)</li>
              <li>For alle spillerne → «Spill tur»</li>
              <li>Hvis en spiller har full familie → Spilleren er vinner, avslutt</li>
              <li>Fortsett fra steg 2</li>
            </ol>
          </div>
        </div>

        {/* Vanlige feil */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">Vanlige feil</h4>
          <ul className="text-sm space-y-1.5">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Lager et <strong>flytdiagram</strong> med mange brukstilfeller i sekvens (Trill → Flytt → Sjekk)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>For mange brukstilfeller — for spill trenger du vanligvis bare 2–3</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Mangler brukstilfellebeskrivelse — diagrammet alene er ikke nok</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Glemmer forkrav og aktører i beskrivelsen</span>
            </li>
          </ul>
        </div>
      </TheorySummary>
    </div>
  );
}
