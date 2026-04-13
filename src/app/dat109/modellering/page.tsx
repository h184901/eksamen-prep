"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";

export default function ModelleringPage() {
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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm leading-relaxed">
            <pre>{`┌─────────────────────────────┐
│         Monopol             │
│                             │
│   ┌──────────┐              │
│   │   Init   │              │
│   └──────────┘              │
│        ▲                    │
│   <<include>>               │
│        │                    │
Observatør ──── ┌──────────┐  │
│               │   Spill  │  │
│               └──────────┘  │
└─────────────────────────────┘`}</pre>
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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm">
            <pre>{`┌───────────────────────────────┐
│          Stigespill           │
│                               │
│      ┌────────────────┐       │
Observatør ── │ Spill stigespill │  │
│      └────────────────┘       │
└───────────────────────────────┘`}</pre>
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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm leading-relaxed">
            <pre>{`┌──────────────────────────────────────┐
│        Eksamenssystem                │
│                                      │
│  ┌──────────────┐                    │
Lærer ── │  Lag oppgave  │                    │
│  └──────────────┘                    │
│  ┌──────────────────┐                │
Lærer ── │ Definer eksamen  │                │
│  └──────────────────┘                │
│  ┌──────────────────┐                │
Student ── │ Besvar eksamen │──<<include>>──┐│
│  └──────────────────┘                ││
│  ┌──────────────────┐                ││
│  │ Lever besvarelse  │◄──────────────┘│
│  └──────────────────┘                │
Klokke ────────┘(<<actor>>)             │
│  ┌──────────────────┐                │
Lærer ── │ Godkjenn karakter│                │
│  └──────────────────┘                │
└──────────────────────────────────────┘`}</pre>
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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm leading-relaxed">
            <pre>{`┌──────────────────────────────────────┐
│          Max Mümmelmann              │
│                                      │
│  ┌──────────────┐                    │
│  │  Init spill  │◄──<<include>>──┐   │
│  └──────────────┘                │   │
│  ┌──────────────┐                │   │
Admin ── │  Start spill  │────────────────┘   │
Spiller ── │              │                    │
│  └──────────────┘                    │
│  ┌──────────────┐                    │
Spiller ── │  Spill tur   │                    │
│  └──────────────┘                    │
└──────────────────────────────────────┘`}</pre>
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
          DOMENEMODELL
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="2. Domenemodell (klassediagram for analyse)"
        mustKnow={[
          "Finne konseptuelle klasser fra substantiv i oppgaveteksten",
          "Tegne klasser med attributter — ALDRI med metoder",
          "Tegne assosiasjoner med korrekt multiplisitet",
          "Forskjellen mellom assosiasjon, aggregering, komposisjon og arv",
          "Bruke arv/generalisering der det er tydelige undertyper",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Hva er en domenemodell?</h3>
        <p>
          En domenemodell er et <strong>klassediagram med konseptuelle klasser</strong> som
          representerer den <strong>virkelige verden</strong>, ikke programvare. Den viser
          objekter, attributter og relasjoner fra problemdomenet.
        </p>

        {/* Domenemodell vs utformingsmodell */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Domenemodell vs. Utformingsmodell</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Domenemodell (oppgave 1b)</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Konsepter fra virkeligheten</li>
                <li><strong>Ingen metoder</strong></li>
                <li>Bare klassenavn, attributter, assosiasjoner</li>
                <li>Multiplisitet på alle assosiasjoner</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Utformingsmodell (oppgave 4)</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Programvare-klasser</li>
                <li><strong>Med metoder</strong></li>
                <li>Synlighet (+, -, #), datatyper</li>
                <li>Navigasjonspiler (retning)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            Professorens eksplisitte regel (2021-fasit):
          </h4>
          <p className="text-sm italic">
            «En domenemodell gir et statisk bilde av den verden som vi skal modellere og seinere
            programmere og derfor er det <strong>ingen metoder i domenemodellen</strong>.»
          </p>
        </div>

        {/* Hvordan finne klasser */}
        <h3 className="text-lg font-bold">Hvordan finne konseptuelle klasser</h3>
        <p>
          Professorens metode (fra Larman): <strong>finn substantivene</strong> i oppgaveteksten!
          Understrek alle substantiver — disse er sterke kandidater for klasser.
        </p>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Eksempel: Substantiv-analyse for Skyjo (eksamen 2024)
          </h4>
          <p className="text-sm mb-2">
            «<u>Spillet</u> er et <u>kortspill</u> som spilles av 2 til 8 <u>spillere</u>.
            <u>Spillet</u> går over flere <u>omganger</u>. <u>Spillet</u> inneholder 150 <u>kort</u>
            med et tall som er <u>poeng</u>. En <u>blokk</u> for å notere poeng.
            <u>Kastehaugen</u>.»
          </p>
          <p className="text-sm font-semibold">
            Klasser: Spill, Spiller, Kort, Kortstokk/Kastehaug, Omgang, Poengblokk
          </p>
        </div>

        {/* Assosiasjonstyper */}
        <h3 className="text-lg font-bold">Assosiasjonstyper</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Type</th>
                <th className="text-left py-2 pr-4 font-semibold">Symbol</th>
                <th className="text-left py-2 font-semibold">Beskrivelse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-medium">Enkel assosiasjon</td>
                <td className="py-2 pr-4">Strek (———)</td>
                <td className="py-2">To klasser er relatert. Brukes oftest.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Aggregering</td>
                <td className="py-2 pr-4">Åpen diamant (◇———)</td>
                <td className="py-2">«Har»-relasjon. Delene kan eksistere uavhengig.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Komposisjon</td>
                <td className="py-2 pr-4">Fylt diamant (◆———)</td>
                <td className="py-2">Sterk «eier»-relasjon. Delene forsvinner hvis helheten slettes. F.eks. Brett ◆— Rute.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Arv/generalisering</td>
                <td className="py-2 pr-4">Trekant-pil (△)</td>
                <td className="py-2">«Er-en»-relasjon. Subklasser arver fra superklasse. F.eks. StartRute arver fra Rute.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Multiplisitet */}
        <h3 className="text-lg font-bold">Multiplisitet</h3>
        <p className="mb-2">
          <strong>Alltid påkrevd!</strong> Professoren trekker for manglende multiplisitet.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Notasjon</th>
                <th className="text-left py-2 font-semibold">Betydning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr><td className="py-1.5 pr-4 font-mono">1</td><td className="py-1.5">Nøyaktig én</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">*</td><td className="py-1.5">Null til mange (0..∞)</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">0..1</td><td className="py-1.5">Null eller én</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">1..*</td><td className="py-1.5">Én eller flere</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">2..8</td><td className="py-1.5">Mellom to og åtte</td></tr>
              <tr><td className="py-1.5 pr-4 font-mono">40</td><td className="py-1.5">Nøyaktig 40</td></tr>
            </tbody>
          </table>
        </div>

        {/* Når bruke arv */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Når bruke arv i domenemodellen?</h4>
          <p className="text-sm mb-2">Professorens retningslinjer (F06):</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Subklassen har <strong>ekstra attributter</strong></li>
            <li>Subklassen har <strong>ekstra assosiasjoner</strong></li>
            <li>Subklassen <strong>oppfører seg annerledes</strong></li>
            <li>Subklassen representerer noe <strong>konseptuelt ulikt</strong></li>
          </ul>
          <p className="text-sm mt-2 text-[var(--muted)]">
            I mange spilloppgaver på eksamen trenger du IKKE arv i domenemodellen. Bruk det kun
            hvis det er tydelige undertyper (f.eks. ulike rutetyper i Monopol).
          </p>
        </div>

        {/* Oppskrift */}
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Steg-for-steg: Slik lager du domenemodellen på eksamen
          </h4>
          <ol className="text-sm list-decimal list-inside space-y-2">
            <li><strong>Understrek alle substantiver</strong> i oppgaveteksten — dette er klassekandidater.</li>
            <li><strong>Filtrer:</strong> Fjern trivielle ting (tall, farger) som bør være attributter, ikke klasser.</li>
            <li><strong>Legg til attributter</strong> på hver klasse (egenskaper som navn, verdi, pris).</li>
            <li><strong>Tegn assosiasjoner</strong> mellom klassene. Spør: «Må systemet huske denne relasjonen?»</li>
            <li><strong>Legg til multiplisitet</strong> på ALLE assosiasjoner.</li>
            <li><strong>Vurder arv</strong> bare hvis det er tydelige undertyper.</li>
            <li><strong>Sjekk konsistens</strong> med brukstilfellebeskrivelsen — alle konsepter bør være med.</li>
          </ol>
        </div>

        {/* ── Eksempel: Monopol domenemodell ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel: Monopol — domenemodell (endelig versjon)</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra F05–F06 — utviklet over 3 iterasjoner</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre>{`                    Monopol
                   rundeNr
                  /    |    \\
            (1:1)/  (1:2..8) \\(1:1)
               /       |       \\
          Brett    Spiller    Kopp
            |      navn       sum
        (1:40)     penger    /    \\
            |        |    (1:2)    \\
     Rute {abstract} |   Terning
      navn      Eier(1:1)  verdi
    /  |  \\  \\       |
   /   |   \\  \\    Brikke
  /    |    \\  \\    navn
StartR VanligR  \\  \\  |
                 \\  \\ Er på(0..8 : 1)
        InntektsskattR  \\
                    SkjøteRute {abstract}
                      pris
                     /  |  \\
                    /   |   \\
              Eiendom  Jernbane  Offentlig

        SkjøteRute ── Eier(0..1 : *) ── Spiller`}</pre>
          </div>
          <div className="mt-3 text-sm space-y-2">
            <p><strong>Klasser:</strong> Monopol, Brett, Spiller, Kopp, Terning, Brikke, Rute (abstrakt) med subklasser StartRute, VanligRute, InntektsskattRute, DeSettesIFengselRute, SkjøteRute (abstrakt) med subklasser EiendomRute, JernbaneRute, OffentligRute.</p>
            <p><strong>Nøkkelpunkter:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 text-sm">
              <li>Brett eier 40 Ruter (komposisjon, 1:40)</li>
              <li>Kopp er «ren fabrikkering» — finnes ikke i virkeligheten</li>
              <li>Arv brukt for rutetyper (de har ulik oppførsel)</li>
              <li>SkjøteRute har ekstra assosiasjon Eier → Spiller (0..1:*)</li>
            </ul>
          </div>
        </div>

        {/* ── Eksempel: Max Mümmelmann domenemodell ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Max Mümmelmann (vår 2023)</h3>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Professorens domenemodell — fasit</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre>{`MaxMummelmann (1)───(1) Brett (1)───(8) Rute
     |                                    |
  (1:2..4)                            (0..* : 1)
     |                                    |
  Spiller ─── (0..6) Kort            Brikke (1)
               nummer

MaxMummelmann (1)───(1) Terning
                        verdi

MaxMummelmann (1)───(1) Brikke`}</pre>
          </div>
          <div className="mt-3 text-sm">
            <p><strong>Klasser:</strong> MaxMummelmann, Brett, Rute, Spiller, Kort, Terning, Brikke</p>
            <p className="mt-1"><strong>Attributter:</strong> Terning.verdi, Kort.nummer, Spiller.navn</p>
            <p className="mt-1"><strong>Multiplisitet:</strong> 2..4 spillere, 0..6 kort per spiller, 8 ruter på brettet</p>
          </div>
        </div>

        {/* ── Eksempel: Eksamenssystem domenemodell ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Eksamenssystem (2020)</h3>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Professorens domenemodell — fasit</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre>{`Lærer ──(*)── Oppgave ──(*)── Spørsmål ──(*)── Svaralternativ
  |                                                   riktig:boolsk
  |──(*)── Eksamen                                        |
              tid:dato                                 (*)
              varighet:heltall                           |
              |                                        Svar
           (*)                                       kryss:boolsk
              |                                        |
           Student ──(*)── Besvarelse ──(*)── Svar
           brukernavn         karakter
           passord`}</pre>
          </div>
          <div className="mt-3 text-sm">
            <p><strong>8 klasser:</strong> Lærer, Student, Oppgave, Eksamen, Spørsmål, Svaralternativ, Besvarelse, Svar</p>
            <p className="mt-1">Merk: Svar (det studenten gir, med kryss:boolsk) vs Svaralternativ (mulige valg, med riktig:boolsk).</p>
          </div>
        </div>

        {/* Vanlige feil */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">Vanlige feil</h4>
          <ul className="text-sm space-y-1.5">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Metoder i domenemodellen</strong> — aldri! Domenemodellen er analyse, ikke design.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Manglende multiplisitet</strong> — professoren trekker for dette. Alle assosiasjoner MÅ ha multiplisitet.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>For få klasser</strong> — du har sannsynligvis oversett substantiver i teksten.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>For mange klasser</strong> — trivielle ting som «tall», «farge», «tekst» er attributter, ikke klasser.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Bruker fremmednøkler</strong> som attributter i stedet for assosiasjonslinjer — dette er OOAD, ikke database.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span><strong>Inkonsistens</strong> med brukstilfellebeskrivelsen — alle konsepter nevnt i brukstilfellene bør finnes i domenemodellen.</span>
            </li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          SEKVENSDIAGRAM
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="3. Sekvensdiagram"
        mustKnow={[
          "Tegne objekter med livslinjer og aktiveringsbokser",
          "Meldinger (kall og retur), inkludert parametere og returverdier",
          "Interaksjonsfragmenter: loop, alt, opt",
          "Diagrammet MÅ samsvare med brukstilfellebeskrivelsen",
          "En melding kan kun sendes fra et aktivt objekt",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Hva er et sekvensdiagram?</h3>
        <p>
          Sekvensdiagrammet viser <strong>hvordan objekter kommuniserer</strong> for å utføre
          et brukstilfelle. Det er overgangen fra analyse (hva) til design (hvordan) — du
          bestemmer hvilke objekter som sender hvilke meldinger til hvilke andre objekter.
        </p>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4">
          <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Viktig kobling</h4>
          <p className="text-sm">
            Sekvensdiagrammet binder brukstilfellebeskrivelsen til klassedesignet.
            Hvert <strong>steg</strong> i brukstilfellebeskrivelsen blir én eller flere
            <strong> meldinger</strong> i sekvensdiagrammet. Og meldingene et objekt mottar
            blir til <strong>metoder</strong> i utformingsmodellen (oppgave 4).
          </p>
        </div>

        {/* Elementer */}
        <h3 className="text-lg font-bold">Elementene</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Element</th>
                <th className="text-left py-2 font-semibold">Beskrivelse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-medium">Objekt</td>
                <td className="py-2">Boks øverst: <code>: Klassenavn</code> (anonymt) eller <code>navn : Klassenavn</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Livslinje</td>
                <td className="py-2">Stiplet vertikal linje nedover fra objektet. Viser at objektet eksisterer.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Aktiveringsboks</td>
                <td className="py-2">Tynt rektangel på livslinjen. Viser at objektet er <strong>aktivt</strong> (utfører noe).</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Synkron melding</td>
                <td className="py-2">Hel pil med fylt spiss (→). Representerer et <strong>metodekall</strong>.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Returmelding</td>
                <td className="py-2">Stiplet pil tilbake (- - →). Viser returverdi: <code>verdi = metode()</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">&lt;&lt;create&gt;&gt;</td>
                <td className="py-2">Stiplet pil til et nytt objekt — oppretter objektet.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Interaksjonsfragmenter */}
        <h3 className="text-lg font-bold">Interaksjonsfragmenter (rammer)</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Fragment</th>
                <th className="text-left py-2 pr-4 font-semibold">Tilsvarer</th>
                <th className="text-left py-2 font-semibold">Eksempel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">loop</td>
                <td className="py-2 pr-4">for/while-løkke</td>
                <td className="py-2"><code>loop [for alle spillere]</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">alt</td>
                <td className="py-2 pr-4">if/else</td>
                <td className="py-2"><code>alt [eid] / [ikke eid]</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">opt</td>
                <td className="py-2 pr-4">if (uten else)</td>
                <td className="py-2"><code>opt [har nok penger]</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kritisk regel */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">
            Professorens regel (2021-fasit):
          </h4>
          <p className="text-sm italic">
            «En melding kan kun sendes fra et objekt som er aktivt og ettersom vi
            programmerer sekvensielt må metodekallene komme i en sekvens også, de kan
            ikke plutselig dukke opp.»
          </p>
          <p className="text-sm mt-2">
            Et objekt kan altså bare sende en melding hvis det <strong>allerede har fått en
            melding</strong> (er aktivt).
          </p>
        </div>

        {/* Oppskrift */}
        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4">
          <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-2">
            Steg-for-steg: Slik lager du sekvensdiagrammet på eksamen
          </h4>
          <ol className="text-sm list-decimal list-inside space-y-2">
            <li><strong>Ta utgangspunkt i brukstilfellebeskrivelsen</strong> — hvert steg i beskrivelsen blir én eller flere meldinger.</li>
            <li><strong>Identifiser hvilke objekter som trengs</strong> — se på domenemodellen din. Plasser dem som bokser øverst.</li>
            <li><strong>Tenk «hvem vet hva?»</strong> — bruk GRASP Informasjonsekspert. Brettet vet om rutene, spilleren vet sin brikke.</li>
            <li><strong>Tegn meldingene</strong> fra venstre (aktør/kontroller) og utover. Bruk parametere der det er naturlig.</li>
            <li><strong>Bruk loop</strong> for gjentakelser fra brukstilfellebeskrivelsen.</li>
            <li><strong>Bruk alt/opt</strong> for betingelser (if/else fra beskrivelsen).</li>
            <li><strong>Sjekk konsistens:</strong> Samsvarer diagrammet med brukstilfellebeskrivelsen?</li>
          </ol>
        </div>

        {/* Mønsteret fra eksamenene */}
        <h3 className="text-lg font-bold">Det faste mønsteret fra alle eksamener</h3>
        <p className="mb-3">
          Se på hvert eneste sekvensdiagram fra professorens løsninger — de følger
          <strong> nøyaktig</strong> dette mønsteret:
        </p>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li>En melding kaller en metode på et <strong>hovedobjekt</strong> (kontrolleren)</li>
            <li>Kontrolleren har en <code>loop</code> der den itererer over en samling</li>
            <li>I loopen kalles metoder på <strong>subobjektene</strong></li>
            <li>Inne i loopen kan det være <code>opt</code> eller <code>alt</code> for betingelser</li>
            <li>Returverdier vises med <code>variabel = metode()</code></li>
          </ol>
        </div>

        {/* ── Eksempel: Monopol sekvensdiagram ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel: Monopol — sekvensdiagram «spillTrekk»</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra F04–F05</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre>{`:Monopol         :Spiller        :Kopp        :Brett       :Brikke
    |                |              |             |             |
    | spill()        |              |             |             |
    |────┐           |              |             |             |
    |    | loop [20 ganger]         |             |             |
    |    |  spillRunde()            |             |             |
    |    |────┐      |              |             |             |
    |    |    | loop [for alle spillere]           |             |
    |    |    |      |              |             |             |
    |    |    |──────> spillTrekk() |             |             |
    |    |    |      |──────────────> trill()     |             |
    |    |    |      |    sum <──── | getSum()    |             |
    |    |    |      |              |             |             |
    |    |    |      |──────────────|─────────────> getRute()   |
    |    |    |      |    rute <────|─────────────| flytt(rute,sum)
    |    |    |      |              |             |             |
    |    |    |      |──────────────|─────────────|────────────> setRute(rute)
    |    |    |      |              |             |             |
    |    |    | <─ ─ ─ navn, rute, sum            |             |
    |    |    |      |              |             |             |`}</pre>
          </div>
          <div className="mt-3 text-sm space-y-1">
            <p><strong>Kobling til Java (oppgave 4):</strong></p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Monopol har metoden <code>spill()</code> og <code>spillRunde()</code></li>
              <li>Spiller har metoden <code>spillTrekk()</code> — som kaller kopp.trill(), brett.flytt(), brikke.setRute()</li>
              <li>Meldingene i sekvensdiagrammet → metodene i Java-klassene</li>
            </ul>
          </div>
        </div>

        {/* Kobling til Java */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Fra sekvensdiagram til Java</h4>
          <p className="text-sm mb-2">Sekvensdiagrammet forteller deg direkte hva koden skal gjøre:</p>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs sm:text-sm">
            <pre>{`// Spiller.java
public void spillTrekk(Kopp kopp, Brett brett) {
    kopp.trill();                        // → trill()
    int sum = kopp.getSum();             // sum = getSum()
    Rute rute = brikke.getRute();        // getRute()
    Rute nyRute = brett.flytt(rute, sum);// rute = flytt(rute, sum)
    brikke.setRute(nyRute);             // setRute(rute)
}`}</pre>
          </div>
        </div>

        {/* ── Eksempel: Stigespill sekvensdiagram ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel: Stigespill — sekvensdiagram «spillTrekk»</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra F08 — brukt i obligatorisk øvelse</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre>{`:Stigespill      :Spiller       :Terning      :Brett       :Brikke
    |                |              |             |             |
    | spill()        |              |             |             |
    |────┐           |              |             |             |
    |    | loop [ingen vinner]      |             |             |
    |    |  spillRunde()            |             |             |
    |    |────┐      |              |             |             |
    |    |    | loop [for alle spillere]           |             |
    |    |    |──────> spillTrekk() |             |             |
    |    |    |      |──────────────> trill()     |             |
    |    |    |      |  verdi <──── | getVerdi()  |             |
    |    |    |      |              |             |             |
    |    |    |      |──────────────|─────────────> getPlass()  |
    |    |    |      |    rute <────|─────────────|             |
    |    |    |      |──────────────|─────────────> finnNyRute(rute, verdi)
    |    |    |      |  nyRute <────|─────────────|             |
    |    |    |      |              |             |             |
    |    |    |      |──────────────|─────────────|────────────> setPlass(nyRute)
    |    |    |      |              |             |             |`}</pre>
          </div>
          <p className="text-sm mt-3">
            Merk: Brettet er <strong>Informasjonsekspert</strong> for å finne ny rute (den
            kjenner alle ruter, stiger og slanger). Brikken vet sin posisjon. Terningen
            kjenner sin verdi.
          </p>
        </div>

        {/* ── Eksempel: Max Mümmelmann sekvensdiagram ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel fra eksamen: Max Mümmelmann (vår 2023)</h3>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Sekvensdiagram — «Spill tur» (forenklet fra fasit)</h4>
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre>{`:Spiller    :MaxMummelmann  :Terning   :Brikke    :Brett     :Rute
   |              |             |          |          |          |
   |── trill() ──>|             |          |          |          |
   |              |── trill() ──>          |          |          |
   |              | verdi <──── |          |          |          |
   |              |                        |          |          |
   |              |── flyttBrikke(verdi) ──>          |          |
   |              |             |          |── flytt(verdi) ───> |
   |              |             |          |          |          |
   |              |             |          |          |── kort = visØversteKort()
   |              |             |          |          |          |
   | alt [mangler familiemedlem]|          |          |          |
   |              |── taKort() ─|──────────>          |          |
   |              |             |          |── taØversteKort() ─>|
   |              |     kort <──|──────────|          |          |
   |── leggTilKort(kort)        |          |          |          |`}</pre>
          </div>
          <div className="mt-3 text-sm">
            <p><strong>Kobling til brukstilfellebeskrivelsen:</strong></p>
            <ol className="list-decimal list-inside space-y-0.5 mt-1">
              <li>«Trill terning» → <code>trill()</code> på Terning</li>
              <li>«Flytt kaninbrikken» → <code>flyttBrikke(verdi)</code> på Brikke</li>
              <li>«Ta øverste kort» → <code>visØversteKort()</code> på Rute</li>
              <li>«Hvis mangler → behold» → <code>alt</code>-fragment med <code>taKort()</code></li>
            </ol>
          </div>
        </div>

        {/* Vanlige feil */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 my-4">
          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm mb-2">Vanlige feil</h4>
          <ul className="text-sm space-y-1.5">
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Meldinger fra <strong>inaktive objekter</strong> — et objekt kan bare sende melding hvis det er aktivt</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Diagrammet <strong>samsvarer ikke</strong> med brukstilfellebeskrivelsen — professoren sjekker dette!</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Manglende <strong>loop/alt/opt</strong> for løkker og betingelser fra brukstilfellebeskrivelsen</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Feil bruk av <strong>Informasjonsekspert</strong> — feil objekt får ansvaret (f.eks. Spilleren finner ruter istedenfor Brettet)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 font-bold shrink-0">✗</span>
              <span>Meldinger uten <strong>parametere</strong> der de trengs — parametere gir pluss</span>
            </li>
          </ul>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          EKSAMEN-SJEKKLISTE
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Sjekkliste for oppgave 1 på eksamen"
        defaultOpen={true}
        mustKnow={[
          "Les oppgaven to ganger. Understrek substantiver (→ klasser) og verb (→ brukstilfeller/metoder).",
          "Diagrammene MÅ være konsistente med hverandre.",
          "Start enkelt — det er bedre med en enkel, riktig modell enn en komplisert, feil modell.",
        ]}
      >
        <h3 className="text-lg font-bold mt-2">Før du begynner</h3>
        <p>Les spillbeskrivelsen to ganger. Understrek <strong>substantiver</strong> (→ klasser)
        og <strong>verb/handlinger</strong> (→ brukstilfeller/metoder).</p>

        <div className="grid sm:grid-cols-3 gap-4 my-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2">1a — Brukstilfellemodell</h4>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2"><span>☐</span> Diagram med aktør, system, 2–4 brukstilfeller</li>
              <li className="flex gap-2"><span>☐</span> Ikke et flytdiagram!</li>
              <li className="flex gap-2"><span>☐</span> Tekstlig beskrivelse for hvert brukstilfelle</li>
              <li className="flex gap-2"><span>☐</span> Forkrav nevnt</li>
              <li className="flex gap-2"><span>☐</span> &lt;&lt;include&gt;&gt; der det gir mening</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2">1b — Domenemodell</h4>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2"><span>☐</span> Konseptuelle klasser fra substantiver</li>
              <li className="flex gap-2"><span>☐</span> INGEN metoder!</li>
              <li className="flex gap-2"><span>☐</span> Attributter på alle klasser</li>
              <li className="flex gap-2"><span>☐</span> Multiplisitet på ALLE assosiasjoner</li>
              <li className="flex gap-2"><span>☐</span> Arv kun ved tydelige undertyper</li>
              <li className="flex gap-2"><span>☐</span> Konsistent med brukstilfellene</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-bold text-sm mb-2">1c — Sekvensdiagram</h4>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2"><span>☐</span> Objekter fra domenemodellen</li>
              <li className="flex gap-2"><span>☐</span> Samsvarer med brukstilfellebeskrivelsen</li>
              <li className="flex gap-2"><span>☐</span> loop for gjentakelser</li>
              <li className="flex gap-2"><span>☐</span> alt/opt for betingelser</li>
              <li className="flex gap-2"><span>☐</span> Meldinger kun fra aktive objekter</li>
              <li className="flex gap-2"><span>☐</span> Parametere og returverdier</li>
            </ul>
          </div>
        </div>

        {/* Tidligere eksamener oversikt */}
        <h3 className="text-lg font-bold mt-6">Hva har kommet på eksamen?</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">År</th>
                <th className="text-left py-2 pr-4 font-semibold">Spill/System</th>
                <th className="text-left py-2 font-semibold">Fasit?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr><td className="py-1.5 pr-4">Høst 2020</td><td className="py-1.5 pr-4">Automatisert eksamenssystem</td><td className="py-1.5">Ja</td></tr>
              <tr><td className="py-1.5 pr-4">Vår 2021</td><td className="py-1.5 pr-4">Hungry Cats (brettspill)</td><td className="py-1.5">Delvis</td></tr>
              <tr><td className="py-1.5 pr-4">Vår 2022</td><td className="py-1.5 pr-4">KIMBO (brettspill)</td><td className="py-1.5">Nei</td></tr>
              <tr><td className="py-1.5 pr-4">Jan 2023 (konte)</td><td className="py-1.5 pr-4">Magiske øyne (terningspill)</td><td className="py-1.5">Nei</td></tr>
              <tr className="bg-green-50 dark:bg-green-950/10"><td className="py-1.5 pr-4 font-semibold">Vår 2023</td><td className="py-1.5 pr-4 font-semibold">Max Mümmelmann (kortspill)</td><td className="py-1.5 font-semibold">Ja (best ref.)</td></tr>
              <tr><td className="py-1.5 pr-4">Høst 2023 (konte)</td><td className="py-1.5 pr-4">Ganz Schön Clever (terningspill)</td><td className="py-1.5">Nei</td></tr>
              <tr><td className="py-1.5 pr-4">Vår 2024</td><td className="py-1.5 pr-4">Skyjo (kortspill)</td><td className="py-1.5">Nei</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Det er nesten <strong>alltid et spill</strong> (brett-, kort- eller terningspill) med
          2–4 spillere og runder. Den beste referanseeksamenen er <strong>vår 2023 (Max
          Mümmelmann)</strong> som har det mest komplette løsningsforslaget fra professoren.
        </p>
      </TheorySummary>
    </div>
  );
}
