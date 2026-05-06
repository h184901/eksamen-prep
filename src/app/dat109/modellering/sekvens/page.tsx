"use client";

import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { modelleringPages, dat109BasePaths } from "@/lib/dat109-subpages";
import {
  SequenceMonopol,
  SequenceStigespill,
  SequenceMaxMummelmann,
} from "@/components/dat109/UmlDiagrams";

export default function SekvensPage() {
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
        <span className="text-[var(--foreground)]">Sekvensdiagram</span>
      </div>

      <DAT109SubNav basePath={dat109BasePaths.modellering} pages={modelleringPages} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sekvensdiagram</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Hvordan objektene samarbeider for å utføre brukstilfellet — meldinger, loop, alt og opt.
          Oppgave 1c på eksamen.
        </p>
      </div>

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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <SequenceMonopol />
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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <SequenceStigespill />
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
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
            <SequenceMaxMummelmann />
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
          AVANSERTE FRAGMENT-TYPER
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Avanserte interaksjonsfragmenter"
        defaultOpen={false}
        mustKnow={[
          "Foruten loop, alt, opt finnes par (parallel), ref (referanse), neg (negativ), critical, region",
          "På DAT109-eksamen trenger du sjelden mer enn loop/alt/opt — men det er greit å kjenne til de andre",
          "ref-fragmentet er nyttig for å unngå gjentakelse — referer til et annet sekvensdiagram",
          "par brukes for parallelle aktiviteter (multitråd, asynkrone API-kall)",
        ]}
      >
        <p>
          UML-spesifikasjonen har en lang liste med interaksjonsfragmenter. På Atles eksamen
          trenger du som regel bare <code>loop</code>, <code>alt</code> og <code>opt</code> —
          men her er de andre du KAN se i forelesningseksempler eller industri:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 font-semibold">Fragment</th>
                <th className="text-left py-2 pr-4 font-semibold">Tilsvarer i kode</th>
                <th className="text-left py-2 font-semibold">Eksempel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">loop</td>
                <td className="py-2 pr-4">for / while</td>
                <td className="py-2"><code>loop [for alle spillere]</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">alt</td>
                <td className="py-2 pr-4">if / else</td>
                <td className="py-2"><code>alt [eid] / [ikke eid]</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">opt</td>
                <td className="py-2 pr-4">if (uten else)</td>
                <td className="py-2"><code>opt [har nok penger]</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">par</td>
                <td className="py-2 pr-4">parallelle tråder / async</td>
                <td className="py-2"><code>par { /* sjekk1 */ } { /* sjekk2 */ }</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">ref</td>
                <td className="py-2 pr-4">funksjonskall til annet sekvensdiagram</td>
                <td className="py-2"><code>ref BetalKortbetaling</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">neg</td>
                <td className="py-2 pr-4">situasjon som IKKE skal skje</td>
                <td className="py-2"><code>neg { /* dette er feil */ }</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">critical</td>
                <td className="py-2 pr-4">atomisk seksjon (ikke avbrutt)</td>
                <td className="py-2"><code>critical { /* trekk fra konto + sett inn */ }</code></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono font-semibold">break</td>
                <td className="py-2 pr-4">avbryt løkke</td>
                <td className="py-2"><code>break [vinner funnet]</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-3 text-sm">
          <strong>Eksamenstips:</strong> Bruk loop/alt/opt for det meste. Ref kan være nyttig for
          komplekse spill der samme delprosess gjentas (f.eks. «Trill og flytt» som en
          referanse). Hvis du bruker en avansert fragment-type på eksamen, forklar valget kort.
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          CREATE OG DESTROY MELDINGER
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="Create og destroy — opprette og fjerne objekter"
        defaultOpen={false}
        mustKnow={[
          "Create-melding: stiplet pil med <<create>>-stereotype, peker på det nye objektet",
          "Det opprettede objektet vises midt på diagrammet (ikke øverst)",
          "Destroy-melding: pil til en X på objektets livslinje",
          "I praksis brukes create ofte i konstruktør-flyt; destroy sjelden i Java (garbage collector)",
        ]}
      >
        <p>
          Av og til opprettes nye objekter MIDT i sekvensen — ikke alle objekter eksisterer fra
          starten. Da bruker man <code>«create»</code>-meldinger:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-semibold text-sm mb-3">Create-melding</h4>
            <svg viewBox="0 0 280 180" className="w-full max-w-xs mx-auto" role="img" aria-label="Create-melding">
              {/* Eksisterende objekt */}
              <rect x="20" y="10" width="80" height="22" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="60" y="25" textAnchor="middle" fontSize="10" fill="currentColor">: Monopol</text>
              <line x1="60" y1="32" x2="60" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
              <rect x="55" y="60" width="10" height="60" fill="#94a3b8" />

              {/* Create-melding (skrå pil) */}
              <line x1="65" y1="80" x2="190" y2="120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />
              <polygon points="190,120 184,116 184,124" fill="currentColor" />
              <text x="120" y="95" fontSize="10" fontStyle="italic" fill="#a855f7">«create»</text>

              {/* Nytt objekt MIDT på diagrammet */}
              <rect x="190" y="110" width="80" height="22" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="1.5" />
              <text x="230" y="125" textAnchor="middle" fontSize="10" fill="currentColor">: Spiller</text>
              <line x1="230" y1="132" x2="230" y2="170" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
            </svg>
            <p className="text-xs text-[var(--muted)] mt-2 italic">
              Det nye Spiller-objektet plasseres MIDT på diagrammet — på det punktet det ble opprettet.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
            <h4 className="font-semibold text-sm mb-3">Destroy-melding (sjelden i Java)</h4>
            <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto" role="img" aria-label="Destroy-melding">
              {/* Avsender */}
              <rect x="20" y="10" width="80" height="22" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="60" y="25" textAnchor="middle" fontSize="10" fill="currentColor">: Spill</text>
              <line x1="60" y1="32" x2="60" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
              <rect x="55" y="50" width="10" height="100" fill="#94a3b8" />

              {/* Mottaker */}
              <rect x="180" y="10" width="80" height="22" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1.5" />
              <text x="220" y="25" textAnchor="middle" fontSize="10" fill="currentColor">: Tellelyst</text>
              <line x1="220" y1="32" x2="220" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />

              {/* Destroy-melding */}
              <line x1="65" y1="100" x2="210" y2="120" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="210,120 204,116 204,124" fill="currentColor" />
              <text x="120" y="113" fontSize="10" fontStyle="italic" fill="#ef4444">«destroy»</text>

              {/* Stort X */}
              <line x1="210" y1="115" x2="230" y2="135" stroke="#ef4444" strokeWidth="3" />
              <line x1="230" y1="115" x2="210" y2="135" stroke="#ef4444" strokeWidth="3" />
            </svg>
            <p className="text-xs text-[var(--muted)] mt-2 italic">
              Stort X på livslinjen viser at objektet opphører. I Java er dette sjelden eksplisitt
              — garbage collector tar seg av det.
            </p>
          </div>
        </div>
      </TheorySummary>

      {/* ═══════════════════════════════════════════
          GRASP-INFORMASJONSEKSPERT I SEKVENS
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="GRASP Informasjonsekspert i sekvensdiagrammet"
        defaultOpen={false}
        mustKnow={[
          "Hvert objekt skal kun gjøre det som det HAR INFORMASJON til å gjøre",
          "Brettet kjenner Ruter → Brettet finner ruter (ikke Spilleren)",
          "Kopp kjenner Terninger → Kopp summer (ikke Brett)",
          "Hvis du sender en melding feil sted, lager du Low Cohesion / High Coupling",
        ]}
      >
        <p>
          Det vanligste GRASP-prinsippet du bruker når du tegner sekvensdiagram er
          <strong> Informasjonsekspert</strong>: gi ansvaret til klassen som har dataene som
          trengs.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
            <p className="font-bold text-red-700 dark:text-red-400 mb-2">DÅRLIG eksempel</p>
            <pre className="text-xs font-mono leading-tight">{`spiller.finnNyRute(verdi)
   spiller.???    ← Spilleren VET IKKE
                     hvilke ruter brettet har!`}</pre>
            <p className="text-xs mt-2">Spilleren prøver å finne en ny rute, men har ikke tilgang til ruter-listen.</p>
          </div>
          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
            <p className="font-bold text-green-700 dark:text-green-400 mb-2">BRA eksempel</p>
            <pre className="text-xs font-mono leading-tight">{`brett.finnNyRute(rute, verdi)
   brett.ruter ← Brettet HAR ruter-listen
   returnerer Rute`}</pre>
            <p className="text-xs mt-2">Brettet er informasjonsekspert — det har data, det får ansvaret.</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 my-3 text-sm">
          <strong>Oppskrift når du tegner sekvensdiagram:</strong> for hver melding, spør «hvem
          har informasjonen for å gjøre dette?». Send meldingen DIT. Hvis ingen har det, legg til
          en parameter eller lag en hjelpeklasse (Pure Fabrication).
        </div>
      </TheorySummary>

      {/* Navigation */}
      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <Link
          href="/dat109/modellering/domene"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">← Domenemodell</p>
          <p className="font-bold mt-1">Domenemodell</p>
          <p className="text-xs text-[var(--muted)]">Konseptuelle klasser med spesialisering</p>
        </Link>
        <Link
          href="/dat109/modellering/eksempler"
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 hover:border-sysdev-400 transition-colors"
        >
          <p className="text-xs text-[var(--muted)]">Neste →</p>
          <p className="font-bold mt-1">Case-studier</p>
          <p className="text-xs text-[var(--muted)]">Komplette OOAD-eksempler — Monopol, Stigespill, Skyjo, Bilutleie</p>
        </Link>
      </div>
    </div>
  );
}
