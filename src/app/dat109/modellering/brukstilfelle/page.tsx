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

        {/* ── Larmans Monopoly use case fra 6.20 ── */}
        <div className="rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/20 p-5 my-4">
          <div className="flex items-baseline gap-2 mb-2">
            <h4 className="font-bold text-purple-800 dark:text-purple-300">Larmans variant — &laquo;Play Monopoly Game&raquo; (kap. 6.20)</h4>
            <span className="text-xs text-[var(--muted)]">Applying UML and Patterns 3rd ed.</span>
          </div>
          <p className="text-sm mb-3">
            Larman bruker akkurat samme spill som professoren. I boken finnes kun{" "}
            <strong>ett eneste brukstilfelle</strong>: <em>Play Monopoly Game</em>. Aktøren er en
            <em> Observer</em> — ikke en spiller — fordi spillet er en datamaskinsimulering som ett
            menneske ser på.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div className="rounded-lg bg-white/80 dark:bg-neutral-900/90 border border-purple-200 dark:border-purple-800 p-3 text-sm">
              <p className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Use Case UC1: Play Monopoly Game</p>
              <p className="text-xs text-neutral-700 dark:text-neutral-200"><strong>Scope:</strong> Monopoly application</p>
              <p className="text-xs text-neutral-700 dark:text-neutral-200"><strong>Level:</strong> user goal</p>
              <p className="text-xs text-neutral-700 dark:text-neutral-200"><strong>Primary Actor:</strong> Observer</p>
              <p className="text-xs text-neutral-700 dark:text-neutral-200 mt-2"><strong>Main Success Scenario:</strong></p>
              <ol className="list-decimal list-inside text-xs text-neutral-700 dark:text-neutral-200 space-y-0.5">
                <li>Observer requests new game initialization, enters number of players.</li>
                <li>Observer starts play.</li>
                <li>System displays game trace for next player move.</li>
              </ol>
              <p className="text-xs italic text-neutral-700 dark:text-neutral-200 mt-1">Repeat step 3 until a winner or Observer cancels.</p>
            </div>

            <div className="rounded-lg bg-white/80 dark:bg-neutral-900/90 border border-purple-200 dark:border-purple-800 p-3 text-sm">
              <p className="font-semibold mb-2 text-neutral-900 dark:text-neutral-50">Larmans innsikt</p>
              <ul className="text-xs text-neutral-700 dark:text-neutral-200 list-disc list-inside space-y-1">
                <li>
                  Spillereglene fanges <strong>ikke</strong> som brukstilfellesteg — de hører til
                  <em> domain rules</em> i Supplementary Specification.
                </li>
                <li>
                  Use case-formen er &quot;awkward and unnatural&quot; for et simulert spill —
                  Larman skriver eksplisitt at use cases ikke alltid er den beste formen for
                  oppførselskrav.
                </li>
                <li>
                  Brukstilfellet feiler &quot;the Boss Test&quot; (sjefen blir ikke imponert), men
                  er likevel det eneste meningsfulle på dette nivået.
                </li>
                <li>
                  Konklusjon: For en simulering — bare ETT brukstilfelle. Resten er domeneregler.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-purple-800 dark:text-purple-300 italic mt-3">
            Atles 2 brukstilfeller (Init + Spill) er pedagogisk gunstig fordi det viser
            <code> &lt;&lt;include&gt;&gt;</code>. Larman foretrekker å pakke initialisering inn som
            steg 1 i hovedflyten. Begge er gyldige — bare vær konsistent.
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

      {/* ═══════════════════════════════════════════
          AKTIVITETSDIAGRAM SOM ALTERNATIV
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Aktivitetsdiagram — visuelt alternativ til tekstlig beskrivelse"
        defaultOpen={false}
        mustKnow={[
          "Aktivitetsdiagram er ALTERNATIV til tekstlig brukstilfellebeskrivelse — du velger ett av de to",
          "Tekst er raskere på eksamen, men aktivitetsdiagram er mer visuelt klart for komplekse flyter",
          "Symboler: fylt sirkel (start), avrundet rektangel (aktivitet), rombe (valg), dobbelsirkel (slutt)",
          "Atle nevner aktivitetsdiagram i F02/F06 — du SKAL kunne både formene",
        ]}
      >
        <p>
          Atle gir deg valget på eksamen: skriv brukstilfellebeskrivelsen <em>tekstlig</em> (nummerert
          liste) ELLER tegn et <em>aktivitetsdiagram</em>. Begge er like riktig — men de fungerer
          best for ulike typer flyter.
        </p>

        <h3 className="text-lg font-bold mt-4">Notasjon</h3>
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-semibold text-sm mb-3">Symbolene</h4>
            <svg viewBox="0 0 240 360" className="w-full max-w-xs mx-auto" role="img" aria-label="UML aktivitetsdiagram-symboler">
              {/* Start */}
              <circle cx="60" cy="30" r="10" fill="currentColor" />
              <text x="90" y="35" fontSize="11" fill="currentColor">Start (fylt sirkel)</text>

              {/* Aktivitet */}
              <rect x="20" y="70" width="80" height="32" rx="16" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="60" y="91" textAnchor="middle" fontSize="10" fill="currentColor">Trill terning</text>
              <text x="120" y="91" fontSize="11" fill="currentColor">Aktivitet (avrundet)</text>

              {/* Decision */}
              <polygon points="60,140 90,170 60,200 30,170" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="60" y="175" textAnchor="middle" fontSize="9" fill="currentColor">verdi=6?</text>
              <text x="100" y="175" fontSize="11" fill="currentColor">Valg (rombe)</text>

              {/* Merge */}
              <polygon points="60,240 90,270 60,300 30,270" fill="none" stroke="#22c55e" strokeWidth="1.5" />
              <text x="60" y="275" textAnchor="middle" fontSize="9" fill="currentColor">Slå sammen</text>
              <text x="100" y="275" fontSize="11" fill="currentColor">Merge (rombe uten guard)</text>

              {/* End */}
              <circle cx="60" cy="335" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="60" cy="335" r="6" fill="currentColor" />
              <text x="90" y="340" fontSize="11" fill="currentColor">Slutt (dobbelsirkel)</text>
            </svg>
          </div>

          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-semibold text-sm mb-3">Eksempel: «Spill tur» som aktivitetsdiagram</h4>
            <svg viewBox="0 0 240 460" className="w-full max-w-xs mx-auto" role="img" aria-label="Aktivitetsdiagram for Spill tur">
              {/* Start */}
              <circle cx="120" cy="20" r="9" fill="currentColor" />
              <line x1="120" y1="29" x2="120" y2="50" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="120,50 116,44 124,44" fill="currentColor" />

              {/* Trill terning */}
              <rect x="60" y="55" width="120" height="30" rx="15" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="120" y="74" textAnchor="middle" fontSize="11" fill="currentColor">Trill terning</text>
              <line x1="120" y1="85" x2="120" y2="105" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="120,105 116,99 124,99" fill="currentColor" />

              {/* Flytt brikke */}
              <rect x="60" y="110" width="120" height="30" rx="15" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="120" y="129" textAnchor="middle" fontSize="11" fill="currentColor">Flytt brikke</text>
              <line x1="120" y1="140" x2="120" y2="160" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="120,160 116,154 124,154" fill="currentColor" />

              {/* Take card */}
              <rect x="60" y="165" width="120" height="30" rx="15" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="120" y="184" textAnchor="middle" fontSize="11" fill="currentColor">Ta øverste kort</text>
              <line x1="120" y1="195" x2="120" y2="218" stroke="currentColor" strokeWidth="1.5" />

              {/* Decision: mangler? */}
              <polygon points="120,218 158,250 120,282 82,250" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="120" y="254" textAnchor="middle" fontSize="9" fill="currentColor">mangler?</text>
              <text x="55" y="252" fontSize="9" fill="#22c55e" fontWeight="700">[ja]</text>
              <text x="165" y="252" fontSize="9" fill="#ef4444" fontWeight="700">[nei]</text>

              {/* Behold kort (left branch) */}
              <line x1="82" y1="250" x2="35" y2="250" stroke="currentColor" strokeWidth="1.5" />
              <line x1="35" y1="250" x2="35" y2="295" stroke="currentColor" strokeWidth="1.5" />
              <rect x="0" y="295" width="70" height="28" rx="14" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="1.5" />
              <text x="35" y="313" textAnchor="middle" fontSize="9" fill="currentColor">Behold</text>

              {/* Legg tilbake (right branch) */}
              <line x1="158" y1="250" x2="205" y2="250" stroke="currentColor" strokeWidth="1.5" />
              <line x1="205" y1="250" x2="205" y2="295" stroke="currentColor" strokeWidth="1.5" />
              <rect x="170" y="295" width="70" height="28" rx="14" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1.5" />
              <text x="205" y="313" textAnchor="middle" fontSize="9" fill="currentColor">Legg tilbake</text>

              {/* Merge */}
              <line x1="35" y1="323" x2="35" y2="350" stroke="currentColor" strokeWidth="1.5" />
              <line x1="205" y1="323" x2="205" y2="350" stroke="currentColor" strokeWidth="1.5" />
              <line x1="35" y1="350" x2="205" y2="350" stroke="currentColor" strokeWidth="1.5" />
              <line x1="120" y1="350" x2="120" y2="380" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="120,380 116,374 124,374" fill="currentColor" />

              {/* Decision: 6? */}
              <polygon points="120,380 158,410 120,440 82,410" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="120" y="414" textAnchor="middle" fontSize="9" fill="currentColor">verdi=6?</text>

              {/* End */}
              <circle cx="120" cy="455" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="120" cy="455" r="5" fill="currentColor" />
              <line x1="120" y1="440" x2="120" y2="446" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-bold mt-4">Når velger du hva?</h3>
        <div className="grid sm:grid-cols-2 gap-3 my-3">
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-3 text-sm">
            <p className="font-bold mb-2">Tekstlig beskrivelse — bedre for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Lineære flyter med få valg</li>
              <li>Når du har dårlig tid (raskere å skrive)</li>
              <li>Brukstilfeller med kompliserte forutsetninger</li>
              <li>Når du vil få med detaljer i hvert steg</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-3 text-sm">
            <p className="font-bold mb-2">Aktivitetsdiagram — bedre for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Mange forgreninger (if/else, ja/nei)</li>
              <li>Parallelle aktiviteter (synch bar)</li>
              <li>Visuelt komplekse flyter</li>
              <li>Når sensoren skal forstå raskt</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
          <strong>Atles regel:</strong> Begge er gyldige. Velg det DU er mest komfortabel med —
          på eksamen er tekstlig beskrivelse vanligvis raskere, men noen liker tegning bedre.
          Pass på at du IKKE blander notasjon — én konsistent stil gjennom hele besvarelsen.
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          SUBSTANTIV/VERB-ANALYSE
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Substantiv- og verb-analyse — slik finner du brukstilfellene"
        defaultOpen={false}
        mustKnow={[
          "Verb i oppgaveteksten = brukstilfelle-kandidater",
          "Substantiv i oppgaveteksten = klasse-kandidater (brukes i domenemodellen)",
          "Atles metode: les oppgaven 2 ganger, understrek substantiv og verb",
          "For spill: typisk 2-3 brukstilfeller — ikke overdriv",
        ]}
      >
        <p>
          Et av Atles favoritt-knep: når du leser oppgaveteksten, <strong>understrek
          substantivene</strong> (de blir konseptuelle klasser i domenemodellen) og
          <strong> verbene/handlingene</strong> (de blir brukstilfeller eller metoder).
        </p>

        <h3 className="text-lg font-bold mt-4">Eksempel: Skyjo (V2024)</h3>
        <p className="text-sm">Original tekst (forkortet):</p>
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-[var(--card-border)] p-4 my-3 text-sm leading-relaxed">
          <p>
            «<u className="text-blue-600 dark:text-blue-400">Spillet</u> er et{" "}
            <u className="text-blue-600 dark:text-blue-400">kortspill</u> som spilles av 2 til 8{" "}
            <u className="text-blue-600 dark:text-blue-400">spillere</u>.{" "}
            <u className="text-blue-600 dark:text-blue-400">Spillet</u> går over flere{" "}
            <u className="text-blue-600 dark:text-blue-400">omganger</u> og målet er å få minst
            mulig <u className="text-blue-600 dark:text-blue-400">poeng</u>. Hver{" "}
            <u className="text-blue-600 dark:text-blue-400">spiller</u>{" "}
            <span className="text-orange-600 dark:text-orange-400 underline decoration-2">trekker et kort</span>{" "}
            fra <u className="text-blue-600 dark:text-blue-400">kastehaugen</u> og kan{" "}
            <span className="text-orange-600 dark:text-orange-400 underline decoration-2">bytte</span>{" "}
            det med ett av sine <u className="text-blue-600 dark:text-blue-400">kort</u>.»
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 my-3">
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-3 text-sm">
            <p className="font-bold mb-2 text-blue-700 dark:text-blue-400">Substantiv → klasser</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Spill</li>
              <li>Spiller</li>
              <li>Kort, Kortstokk, Kastehaug</li>
              <li>Omgang</li>
              <li>Poengblokk</li>
            </ul>
            <p className="text-xs text-[var(--muted)] mt-2 italic">Brukes i domenemodell.</p>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-3 text-sm">
            <p className="font-bold mb-2 text-amber-700 dark:text-amber-400">Verb → brukstilfeller / metoder</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Spilles av (= aktør Spiller utfører «Spill»)</li>
              <li>Trekke kort, bytte (= deler av «Spill tur»)</li>
            </ul>
            <p className="text-xs text-[var(--muted)] mt-2 italic">
              For et spill: typisk 2-3 brukstilfeller (Init, Spill, Spill tur). For
              forretningssystemer: flere brukstilfeller fordi det er flere uavhengige funksjoner.
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm">
          <strong>Filtreringsregler:</strong> ikke alle substantiv blir klasser. Trivielle ting
          som &laquo;tall&raquo;, &laquo;farge&raquo;, &laquo;tekst&raquo; er bedre som
          attributter. Og verb som &laquo;er&raquo;, &laquo;har&raquo; er ikke handlinger — de
          beskriver assosiasjoner.
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          INCLUDE VS EXTEND I DYBDEN
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="«include» vs «extends» — bruk dem riktig"
        defaultOpen={false}
        mustKnow={[
          "<<include>> = brukstilfelle A bruker ALLTID brukstilfelle B (obligatorisk del)",
          "<<extends>> = brukstilfelle B kan UTVIDE A (valgfri tilleggsfunksjonalitet)",
          "Pil-retning: <<include>> peker FRA hovedbrukstilfellet TIL det inkluderte",
          "Pil-retning: <<extends>> peker FRA utvidelsen TIL det utvidede",
          "Atles regel: bruk dem SPARSOMT — ofte holder vanlig assosiasjon",
        ]}
      >
        <p>
          De to relasjonstypene <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">«include»</code> og{" "}
          <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">«extends»</code> forvirrer mange. Her er forskjellen:
        </p>

        <div className="grid sm:grid-cols-2 gap-3 my-3">
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">«include»</p>
            <p className="text-sm mb-2"><strong>«Spill»</strong> includes <strong>«Init»</strong></p>
            <p className="text-sm mb-2">→ Hver gang noen utfører «Spill», utføres ALLTID «Init» som del av det.</p>
            <p className="text-xs text-[var(--muted)] italic">
              Pil med stiplete linje fra «Spill» (basisbrukstilfellet) → «Init».
            </p>
            <p className="text-xs mt-2"><strong>Når bruke:</strong> obligatoriske underprosesser. F.eks. en logg-funksjon som ALLE oppgaver må kalle.</p>
          </div>
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">«extends»</p>
            <p className="text-sm mb-2"><strong>«Lever besvarelse automatisk»</strong> extends <strong>«Besvar eksamen»</strong></p>
            <p className="text-sm mb-2">→ KAN skje hvis tidsfrist utløper, men ikke alltid.</p>
            <p className="text-xs text-[var(--muted)] italic">
              Pil med stiplete linje fra utvidelsen → basisbrukstilfellet.
            </p>
            <p className="text-xs mt-2"><strong>Når bruke:</strong> betingede tilleggsflyter. F.eks. autopay som starter HVIS bruker har aktivert autopay.</p>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Atles tips</p>
          <p>
            Bruk <code>«include»</code> og <code>«extends»</code> SPARSOMT. Hvis du er usikker —
            la det være. En vanlig assosiasjon (rett strek) mellom aktør og brukstilfelle er
            ofte nok. Atle har sett studenter «pynte» med include/extends der det ikke trengs,
            og mister poeng for å overforklare.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3 text-sm mt-3">
          <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
            Larmans formulering (kap. 6.16, &laquo;Reasonable Violations&raquo;)
          </p>
          <p>
            Larman forklarer <code>&lt;&lt;include&gt;&gt;</code> som mekanismen for
            &laquo;subfunction-level use cases&raquo; — delprosesser som er for små til å være
            EBP-er på egen hånd, men som gjentas i flere base-brukstilfeller (typisk
            &laquo;Authenticate User&raquo; eller &laquo;Paying by credit&raquo;). Da skiller man
            dem ut i et eget brukstilfelle og lenker dem inn med <code>&lt;&lt;include&gt;&gt;</code>{" "}
            <em>for å unngå dupliseringen i teksten</em>. Det er hovedmotivasjonen — ikke å pynte
            diagrammet.
          </p>
        </div>
      </TheorySummary>

      {/* Navigation */}
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <Link
          href="/dat109/modellering"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Modellering</p>
          <p className="font-bold mt-1">Tilbake til modellering-oversikt</p>
        </Link>
        <Link
          href="/dat109/modellering/domene"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Neste →</p>
          <p className="font-bold mt-1">Domenemodell</p>
          <p className="text-xs text-[var(--muted)]">Konseptuelle klasser med spesialisering</p>
        </Link>
      </div>
    </div>
  );
}
