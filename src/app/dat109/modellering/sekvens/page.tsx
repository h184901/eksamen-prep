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
    </div>
  );
}
