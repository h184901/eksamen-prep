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
          SSD vs SEKVENSDIAGRAM (Larman kap. 10)
          ═══════════════════════════════════════════ */}
      <TheorySummary
        title="0. System Sequence Diagram (SSD) vs sekvensdiagram — VIKTIG distinksjon"
        mustKnow={[
          "SSD = system som black box. Viser system-events (eks. enterItem) fra aktør til SYSTEMET som ÉN boks.",
          "Sekvensdiagram (interaction diagram) = inne i systemet. Viser meldinger MELLOM objekter.",
          "Larman: SSD er input til design. Sekvensdiagram (objekt-til-objekt) er output av design.",
          "Atle bruker BEGGE — SSD i analyse, vanlig sekvensdiagram i design (oppgave 1c).",
          "Samme UML-notasjon (livslinjer, meldinger, loop). Forskjellen er ABSTRAKSJONSNIVÅ.",
        ]}
      >
        <p>
          Dette er en distinksjon mange studenter overser. Larman bruker hele <strong>kapittel 10</strong> i
          <em> Applying UML and Patterns</em> bare på <strong>System Sequence Diagram (SSD)</strong> —
          det er noe annet enn det &laquo;vanlige&raquo; sekvensdiagrammet du tegner i oppgave 1c.
          UML-notasjonen er identisk; forskjellen er hva diagrammet viser.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50/60 dark:bg-blue-950/30 p-4">
            <p className="font-bold text-blue-800 dark:text-blue-300 mb-2">SSD — System Sequence Diagram</p>
            <p className="text-sm mb-2"><strong>Hva:</strong> Aktør sender system-events til SYSTEMET som ÉN black box.</p>
            <p className="text-sm mb-2"><strong>Bokser:</strong> 1 aktør (venstre) + 1 system-boks (høyre, navngitt <code>:System</code>).</p>
            <p className="text-sm mb-2"><strong>Meldinger:</strong> Abstrakte system-operasjoner: <code>enterItem(id, qty)</code>, <code>makePayment(beløp)</code>, <code>initialize(numOfPlayers)</code>, <code>playGame</code>.</p>
            <p className="text-sm mb-2"><strong>Når i prosessen:</strong> Etter brukstilfellebeskrivelsen, FØR objektdesign. Brukes som <em>input</em> til design.</p>
            <p className="text-sm"><strong>Larman 10.4:</strong> &laquo;UML har ikke noe som heter <em>system</em> sequence diagram — det er bare et sekvensdiagram brukt på systemet som black box.&raquo;</p>
          </div>

          <div className="rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50/60 dark:bg-green-950/30 p-4">
            <p className="font-bold text-green-800 dark:text-green-300 mb-2">Sekvensdiagram (interaction diagram)</p>
            <p className="text-sm mb-2"><strong>Hva:</strong> Detaljert interaksjon MELLOM objekter inne i systemet.</p>
            <p className="text-sm mb-2"><strong>Bokser:</strong> Mange objekter (Spill, Spiller, Brett, Brikke, Terning ...).</p>
            <p className="text-sm mb-2"><strong>Meldinger:</strong> Konkrete metodekall: <code>spiller.spillTrekk()</code>, <code>brett.flytt(rute, sum)</code>, <code>terning.trill()</code>.</p>
            <p className="text-sm mb-2"><strong>Når i prosessen:</strong> I design (etter SSD). Realiserer system-operasjonene fra SSDen.</p>
            <p className="text-sm"><strong>Eksamenoppgave 1c:</strong> Det er DETTE Atle ber om — interaction diagram med objekter, ansvarsfordeling (GRASP) og kobling til Java-koden i oppgave 4.</p>
          </div>
        </div>

        {/* Visualisering: SSD (venstre) vs vanlig sekvensdiagram (høyre) */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
          <h4 className="font-semibold mb-3">Sammenligning visuelt — Monopol</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">SSD (Larman 10.9)</p>
              <svg viewBox="0 0 320 230" className="w-full" role="img" aria-label="SSD for Play Monopoly Game">
                {/* Aktør */}
                <circle cx="40" cy="20" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <line x1="40" y1="27" x2="40" y2="42" stroke="currentColor" strokeWidth="1.4" />
                <line x1="30" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="1.4" />
                <line x1="40" y1="42" x2="32" y2="55" stroke="currentColor" strokeWidth="1.4" />
                <line x1="40" y1="42" x2="48" y2="55" stroke="currentColor" strokeWidth="1.4" />
                <text x="40" y="70" textAnchor="middle" fontSize="9" fill="currentColor">:Observer</text>
                <line x1="40" y1="73" x2="40" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />

                {/* System (ÉN boks) */}
                <rect x="225" y="55" width="80" height="22" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="265" y="70" textAnchor="middle" fontSize="9" fill="currentColor">:System</text>
                <line x1="265" y1="77" x2="265" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />

                {/* initialize */}
                <line x1="40" y1="100" x2="260" y2="100" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="260,100 254,96 254,104" fill="currentColor" />
                <text x="150" y="95" textAnchor="middle" fontSize="9" fill="currentColor">initialize(numOfPlayers)</text>

                {/* playGame */}
                <line x1="40" y1="135" x2="260" y2="135" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="260,135 254,131 254,139" fill="currentColor" />
                <text x="150" y="130" textAnchor="middle" fontSize="9" fill="currentColor">playGame</text>

                {/* loop fragment */}
                <rect x="60" y="155" width="220" height="55" fill="none" stroke="#a855f7" strokeWidth="1.3" />
                <rect x="60" y="155" width="50" height="14" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="1.3" />
                <text x="68" y="165" fontSize="9" fontWeight="700" fill="#a855f7">loop</text>
                <text x="155" y="165" fontSize="9" fill="currentColor">[no winner]</text>
                <line x1="265" y1="190" x2="50" y2="190" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4,2" />
                <polygon points="50,190 56,186 56,194" fill="currentColor" />
                <text x="155" y="185" textAnchor="middle" fontSize="8" fill="currentColor" fontStyle="italic">dice total, player, square</text>
              </svg>
              <p className="text-xs text-neutral-700 dark:text-neutral-200 mt-2 italic">
                Bare ÉN systemboks. Kun 2 system-events: <code>initialize</code> og{" "}
                <code>playGame</code>. Sier INGENTING om interne objekter.
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3">
              <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2">Vanlig sekvensdiagram (Atles oppgave 1c)</p>
              <svg viewBox="0 0 320 230" className="w-full" role="img" aria-label="Detaljert sekvensdiagram">
                {/* Mange objekter */}
                {[
                  { x: 30, name: ":Spill" },
                  { x: 110, name: ":Spiller" },
                  { x: 185, name: ":Kopp" },
                  { x: 260, name: ":Brett" },
                ].map((o) => (
                  <g key={o.name}>
                    <rect x={o.x - 25} y="10" width="55" height="20" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1.3" />
                    <text x={o.x + 2} y="24" textAnchor="middle" fontSize="9" fill="currentColor">{o.name}</text>
                    <line x1={o.x + 2} y1="30" x2={o.x + 2} y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                  </g>
                ))}

                {/* spillTrekk fra Spill til Spiller */}
                <line x1="32" y1="55" x2="110" y2="55" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="110,55 104,51 104,59" fill="currentColor" />
                <text x="71" y="51" textAnchor="middle" fontSize="9" fill="currentColor">spillTrekk()</text>
                <rect x="108" y="55" width="6" height="155" fill="#22c55e" fillOpacity="0.4" />

                {/* trill fra Spiller til Kopp */}
                <line x1="114" y1="80" x2="185" y2="80" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="185,80 179,76 179,84" fill="currentColor" />
                <text x="149" y="76" textAnchor="middle" fontSize="9" fill="currentColor">trill()</text>

                {/* getSum fra Spiller til Kopp */}
                <line x1="114" y1="105" x2="185" y2="105" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="185,105 179,101 179,109" fill="currentColor" />
                <text x="149" y="101" textAnchor="middle" fontSize="9" fill="currentColor">sum=getSum()</text>

                {/* flytt fra Spiller til Brett */}
                <line x1="114" y1="130" x2="260" y2="130" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="260,130 254,126 254,134" fill="currentColor" />
                <text x="187" y="126" textAnchor="middle" fontSize="9" fill="currentColor">flytt(rute, sum)</text>

                {/* return */}
                <line x1="260" y1="160" x2="114" y2="160" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4,2" />
                <polygon points="114,160 120,156 120,164" fill="currentColor" />
                <text x="187" y="156" textAnchor="middle" fontSize="8" fill="currentColor" fontStyle="italic">nyRute</text>

                {/* setRute fra Spiller til seg selv (forenklet) */}
                <line x1="116" y1="190" x2="155" y2="190" stroke="currentColor" strokeWidth="1.3" />
                <line x1="155" y1="190" x2="155" y2="200" stroke="currentColor" strokeWidth="1.3" />
                <line x1="155" y1="200" x2="116" y2="200" stroke="currentColor" strokeWidth="1.3" />
                <polygon points="116,200 122,196 122,204" fill="currentColor" />
                <text x="160" y="200" fontSize="9" fill="currentColor">setRute(nyRute)</text>
              </svg>
              <p className="text-xs text-neutral-700 dark:text-neutral-200 mt-2 italic">
                FLERE objekter. Meldinger mellom dem (informasjonsekspert: Brettet finner ny rute).
                Hver melding blir til en metode i Java.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">
            Larmans flyt — fra brukstilfelle via SSD til design
          </h4>
          <ol className="text-sm list-decimal list-inside space-y-1">
            <li><strong>Brukstilfellebeskrivelse</strong> — &laquo;Observer requests new game initialization, enters number of players. Observer starts play. System displays game trace ...&raquo;</li>
            <li><strong>SSD</strong> — gjør stegene konkrete som system-events: <code>initialize(numOfPlayers)</code>, <code>playGame</code>. Systemet er én black box.</li>
            <li><strong>Operation contracts</strong> (Larman kap. 11) — postcondition for hver system-operasjon (valgfritt — Atle bruker dette sjelden).</li>
            <li><strong>Domenemodell</strong> — finner objektene (Spill, Spiller, Brett, Brikke, Rute, Terning ...).</li>
            <li><strong>Sekvensdiagram (interaction diagram)</strong> — designer hvordan objektene samarbeider for å realisere én system-operasjon. Bruker GRASP for å fordele ansvar.</li>
            <li><strong>Java-kode (oppgave 4)</strong> — meldingene blir til metoder.</li>
          </ol>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 my-3 text-sm">
          <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Når trenger du å vite forskjellen?</p>
          <p>
            På DAT109-eksamen heter oppgave 1c &laquo;sekvensdiagram&raquo; uten kvalifikator —
            Atle vil <strong>nesten alltid</strong> ha det detaljerte interaction diagram med
            objekter (høyre side ovenfor). Men hvis oppgaveteksten bruker formuleringer som{" "}
            <em>&laquo;system-events&raquo;</em>, <em>&laquo;system as black box&raquo;</em> eller{" "}
            <em>&laquo;input/output events&raquo;</em>, er det SSD som er ønsket. Sjekk
            forelesningsdraftene fra Atle hvor begge varianter brukes.
          </p>
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

        {/* Larman Monopoly SSD (10.9) som referanse */}
        <div className="rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/20 p-5 my-4">
          <div className="flex items-baseline gap-2 mb-2">
            <h4 className="font-bold text-purple-800 dark:text-purple-300">Larmans Monopoly SSD (kap. 10.9)</h4>
            <span className="text-xs text-[var(--muted)]">Applying UML and Patterns 3rd ed., Figure 10.5</span>
          </div>
          <p className="text-sm mb-3">
            For sammenligning: dette er det Larman tegner som SSD for &laquo;Play Monopoly Game&raquo;.
            Legg merke til hvor MINIMALT det er — bare to system-events, og en loop som returnerer
            en trace.
          </p>
          <div className="bg-white/80 dark:bg-neutral-900/90 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <svg viewBox="0 0 360 250" className="w-full max-w-md mx-auto" role="img" aria-label="Larmans SSD for Play Monopoly Game">
              {/* Aktør */}
              <circle cx="50" cy="22" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="30" x2="50" y2="48" stroke="currentColor" strokeWidth="1.5" />
              <line x1="38" y1="36" x2="62" y2="36" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="48" x2="40" y2="62" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="48" x2="60" y2="62" stroke="currentColor" strokeWidth="1.5" />
              <text x="50" y="80" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">:Observer</text>
              <line x1="50" y1="84" x2="50" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />

              {/* System box */}
              <rect x="265" y="65" width="80" height="26" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="1.6" />
              <text x="305" y="82" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="600">:System</text>
              <line x1="305" y1="91" x2="305" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />

              {/* initialize(numOfPlayers) */}
              <line x1="50" y1="115" x2="300" y2="115" stroke="currentColor" strokeWidth="1.4" />
              <polygon points="300,115 292,110 292,120" fill="currentColor" />
              <text x="175" y="110" textAnchor="middle" fontSize="11" fill="currentColor">initialize(numOfPlayers)</text>

              {/* playGame */}
              <line x1="50" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="1.4" />
              <polygon points="300,150 292,145 292,155" fill="currentColor" />
              <text x="175" y="145" textAnchor="middle" fontSize="11" fill="currentColor">playGame</text>

              {/* Loop frame */}
              <rect x="80" y="170" width="240" height="60" fill="none" stroke="#a855f7" strokeWidth="1.4" />
              <rect x="80" y="170" width="55" height="16" fill="#a855f7" fillOpacity="0.18" stroke="#a855f7" strokeWidth="1.4" />
              <text x="90" y="183" fontSize="10" fontWeight="700" fill="#a855f7">loop</text>
              <text x="170" y="183" fontSize="10" fill="currentColor">[no winner]</text>

              {/* return arrow */}
              <line x1="305" y1="210" x2="58" y2="210" stroke="currentColor" strokeWidth="1.3" strokeDasharray="5,3" />
              <polygon points="58,210 66,206 66,214" fill="currentColor" />
              <text x="180" y="206" textAnchor="middle" fontSize="10" fill="currentColor" fontStyle="italic">dice total, player, square</text>
            </svg>
          </div>
          <p className="text-xs italic text-purple-800 dark:text-purple-300 mt-3">
            Legg merke til: ingen Spiller-objekt, ingen Brikke, ingen Terning — bare{" "}
            <code>:System</code>. SSDen sier hva systemet gjør for Observer, ikke hvordan.
            Sammenlign med Atles forelesningseksempel under, som er et detaljert sekvensdiagram
            (interaction diagram) — DET viser hvilke objekter som samarbeider inne i systemet.
          </p>
        </div>

        {/* ── Eksempel: Monopol sekvensdiagram ── */}
        <h3 className="text-lg font-bold mt-6">Eksempel: Monopol — sekvensdiagram «spillTrekk»</h3>
        <p className="text-sm text-[var(--muted)] mb-3">Fra F04–F05 (interaction diagram, ikke SSD)</p>

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
