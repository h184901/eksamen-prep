"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Collapsible Reference Card ── */
function RefCard({
  title,
  icon,
  color,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: string;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <span className={`text-lg ${color}`}>{icon}</span>
        <h2 className="text-lg font-bold flex-1">{title}</h2>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </section>
  );
}

/* ── Small table helper ── */
function MiniTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[var(--card-border)]">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-2 pr-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--card-border)]">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="py-2 pr-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OppsummeringPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Oppsummering</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Oppsummering</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Komplett jukselapp for eksamen. Alt du trenger på ett sted — UML-notasjon,
          SOLID, GRASP, utviklingsmetoder og sjekklister.
        </p>
      </div>

      {/* ═══════ Quick nav ═══════ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: "UML-notasjon", anchor: "#uml" },
          { label: "SOLID", anchor: "#solid" },
          { label: "GRASP", anchor: "#grasp" },
          { label: "Utviklingsmetoder", anchor: "#metoder" },
          { label: "Prosessen OOA→OOD→OOP", anchor: "#prosess" },
          { label: "Eksamen-sjekkliste", anchor: "#sjekkliste" },
        ].map((item) => (
          <a
            key={item.anchor}
            href={item.anchor}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-center"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="space-y-4">
        {/* ═══════════════════════════════════════════
            UML-NOTASJON
            ═══════════════════════════════════════════ */}
        <div id="uml">
          <RefCard title="UML-notasjon — hurtigreferanse" icon="📐" color="text-blue-500" defaultOpen={true}>
            <div className="space-y-6">
              {/* Brukstilfellesdiagram */}
              <div>
                <h3 className="font-bold text-sm mb-2 text-blue-600 dark:text-blue-400">Brukstilfellesdiagram (Use Case Diagram)</h3>
                <MiniTable
                  headers={["Element", "Symbol", "Forklaring"]}
                  rows={[
                    [
                      <span key="a" className="font-medium">Aktør</span>,
                      "Strekfigur",
                      "Person eller system utenfor systemet som interagerer med det",
                    ],
                    [
                      <span key="s" className="font-medium">System</span>,
                      "Rektangel",
                      "Rammen rundt brukstilfellene. Systemnavn øverst.",
                    ],
                    [
                      <span key="u" className="font-medium">Brukstilfelle</span>,
                      "Ellipse",
                      "En funksjon systemet tilbyr — IKKE et steg i en sekvens",
                    ],
                    [
                      <span key="as" className="font-medium">Assosiasjon</span>,
                      "Hel linje",
                      "Kobler aktør til brukstilfelle",
                    ],
                    [
                      <span key="i" className="font-medium">&lt;&lt;include&gt;&gt;</span>,
                      "Stiplet pil →",
                      "Brukstilfelle A inkluderer ALLTID B",
                    ],
                    [
                      <span key="e" className="font-medium">&lt;&lt;extends&gt;&gt;</span>,
                      "Stiplet pil →",
                      "B KAN utvide A (valgfri tilleggsfunksjon)",
                    ],
                  ]}
                />
                <div className="mt-2 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    VANLIGSTE FEIL: Lager et flytdiagram med mange brukstilfeller i sekvens.
                    Et brukstilfelle er en FUNKSJON, ikke et steg. For spill trenger du 2–4 stk.
                  </p>
                </div>
              </div>

              {/* Klassediagram */}
              <div>
                <h3 className="font-bold text-sm mb-2 text-green-600 dark:text-green-400">Klassediagram (domenemodell &amp; utformingsmodell)</h3>
                <MiniTable
                  headers={["Element", "Symbol", "Forklaring"]}
                  rows={[
                    [
                      <span key="k" className="font-medium">Klasse</span>,
                      "Rektangel (3 felt)",
                      "Navn | Attributter | Metoder (domenemodell: kun 2 felt, INGEN metoder!)",
                    ],
                    [
                      <span key="ass" className="font-medium">Assosiasjon</span>,
                      "Hel linje (———)",
                      "To klasser er relatert. Alltid med multiplisitet!",
                    ],
                    [
                      <span key="agg" className="font-medium">Aggregering</span>,
                      "Åpen diamant (◇———)",
                      "«Har»-relasjon. Delene kan eksistere uavhengig.",
                    ],
                    [
                      <span key="kom" className="font-medium">Komposisjon</span>,
                      "Fylt diamant (◆———)",
                      "Sterk «eier»-relasjon. Delene forsvinner med helheten.",
                    ],
                    [
                      <span key="arv" className="font-medium">Arv</span>,
                      "Trekant-pil (△)",
                      "«Er-en»-relasjon. Subklasse arver fra superklasse.",
                    ],
                    [
                      <span key="abs" className="font-medium">{"{abstract}"}</span>,
                      "Kursiv navn",
                      "Kan ikke instansieres — brukes for felles superklasse.",
                    ],
                  ]}
                />
                <div className="mt-2">
                  <h4 className="font-semibold text-xs mb-1">Multiplisitet</h4>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span><code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">1</code> = nøyaktig én</span>
                    <span><code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">*</code> = 0..mange</span>
                    <span><code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">0..1</code> = null eller én</span>
                    <span><code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">1..*</code> = én eller flere</span>
                    <span><code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">2..8</code> = mellom 2 og 8</span>
                  </div>
                </div>
                <div className="mt-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-sm">
                    <strong>Domenemodell</strong> = virkelig verden, INGEN metoder, alle assosiasjoner har multiplisitet.<br />
                    <strong>Utformingsmodell</strong> = programvare, MED metoder, synlighet (+/-/#), datatyper, navigasjonspiler.
                  </p>
                </div>
              </div>

              {/* Sekvensdiagram */}
              <div>
                <h3 className="font-bold text-sm mb-2 text-purple-600 dark:text-purple-400">Sekvensdiagram</h3>
                <MiniTable
                  headers={["Element", "Beskrivelse"]}
                  rows={[
                    [
                      <span key="obj" className="font-medium">Objekt</span>,
                      <span key="objd">Boks øverst: <code>: Klasse</code> (anonymt) eller <code>navn : Klasse</code></span>,
                    ],
                    [
                      <span key="liv" className="font-medium">Livslinje</span>,
                      "Stiplet vertikal linje ned fra objektet",
                    ],
                    [
                      <span key="akt" className="font-medium">Aktiveringsboks</span>,
                      "Tynt rektangel på livslinjen — objektet er aktivt",
                    ],
                    [
                      <span key="mel" className="font-medium">Synkron melding</span>,
                      <span key="meld">Hel pil (→) = metodekall, f.eks. <code>trill()</code></span>,
                    ],
                    [
                      <span key="ret" className="font-medium">Returmelding</span>,
                      <span key="retd">Stiplet pil (- -→) med returverdi: <code>verdi = metode()</code></span>,
                    ],
                    [
                      <span key="cre" className="font-medium">&lt;&lt;create&gt;&gt;</span>,
                      "Stiplet pil til nytt objekt — oppretter det",
                    ],
                  ]}
                />
                <div className="mt-3">
                  <h4 className="font-semibold text-xs mb-1">Interaksjonsfragmenter (rammer)</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg border border-[var(--card-border)] p-2.5 text-center">
                      <code className="font-bold text-purple-600 dark:text-purple-400">loop</code>
                      <p className="text-xs mt-1">for/while-løkke</p>
                    </div>
                    <div className="rounded-lg border border-[var(--card-border)] p-2.5 text-center">
                      <code className="font-bold text-purple-600 dark:text-purple-400">alt</code>
                      <p className="text-xs mt-1">if/else</p>
                    </div>
                    <div className="rounded-lg border border-[var(--card-border)] p-2.5 text-center">
                      <code className="font-bold text-purple-600 dark:text-purple-400">opt</code>
                      <p className="text-xs mt-1">if (uten else)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    REGEL: En melding kan KUN sendes fra et aktivt objekt. Objektet må ha fått
                    en melding først (være aktivt) før det kan sende videre.
                  </p>
                </div>
              </div>

              {/* Synlighetsmodifikatorer */}
              <div>
                <h3 className="font-bold text-sm mb-2 text-amber-600 dark:text-amber-400">Synlighet (utformingsmodell &amp; Java)</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span><code className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-bold">+</code> public</span>
                  <span><code className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded font-bold">-</code> private</span>
                  <span><code className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded font-bold">#</code> protected</span>
                  <span><code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded font-bold">~</code> package</span>
                </div>
              </div>
            </div>
          </RefCard>
        </div>

        {/* ═══════════════════════════════════════════
            SOLID-PRINSIPPENE
            ═══════════════════════════════════════════ */}
        <div id="solid">
          <RefCard title="SOLID-prinsippene — jukselapp" icon="S" color="text-emerald-500 font-bold" defaultOpen={true}>
            <div className="space-y-3">
              {[
                {
                  letter: "S",
                  name: "Single Responsibility (SRP)",
                  rule: "En klasse skal ha kun ÉN grunn til å endre seg.",
                  example: "Spiller håndterer spillerlogikk, IKKE utskrift. Lag en egen Printer-klasse.",
                  smell: "Klassen gjør to urelaterte ting. Navnet inneholder «Og» eller «Manager».",
                  color: "emerald",
                },
                {
                  letter: "O",
                  name: "Open/Closed (OCP)",
                  rule: "Åpen for utvidelse, lukket for endring. Ny funksjonalitet via arv/interface, ikke ved å endre eksisterende kode.",
                  example: "Ny rutetype i Monopol: lag ny subklasse av Rute, ikke endre if/else i Rute.",
                  smell: "Lang switch/if-else som sjekker type. Må endre gammel kode for ny funksjon.",
                  color: "blue",
                },
                {
                  letter: "L",
                  name: "Liskov Substitution (LSP)",
                  rule: "Subklasser må kunne erstatte superklassen uten å bryte programmet.",
                  example: "Alle Rute-subklasser må oppføre seg korrekt når koden kaller rute.landPå(spiller).",
                  smell: "Override som kaster unntak eller gjør ingenting. instanceof-sjekker i klient.",
                  color: "purple",
                },
                {
                  letter: "I",
                  name: "Interface Segregation (ISP)",
                  rule: "Mange små, spesifikke interfaces er bedre enn ett stort.",
                  example: "Splitt «SpillAlt»-interface til «Terningkastbar», «Flyttbar», «Kjøpbar».",
                  smell: "Klasse implementerer metoder den ikke trenger. Tomme metode-implementeringer.",
                  color: "amber",
                },
                {
                  letter: "D",
                  name: "Dependency Inversion (DIP)",
                  rule: "Avheng av abstraksjoner (interface), ikke konkrete klasser.",
                  example: "Spill bruker «Terning»-interface, ikke «SekssidetTerning» direkte.",
                  smell: "new KonkretKlasse() spredt overalt. Endring i én klasse tvinger endringer i mange.",
                  color: "red",
                },
              ].map((p) => (
                <div
                  key={p.letter}
                  className={`rounded-lg border border-${p.color}-200 dark:border-${p.color}-800 bg-${p.color}-50 dark:bg-${p.color}-950/20 p-4`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-2xl font-black text-${p.color}-600 dark:text-${p.color}-400 leading-none`}>
                      {p.letter}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{p.name}</h4>
                      <p className="text-sm mt-1">{p.rule}</p>
                      <p className="text-xs text-[var(--muted)] mt-1.5">
                        <strong>Eksempel:</strong> {p.example}
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        <strong>Code smell:</strong> {p.smell}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RefCard>
        </div>

        {/* ═══════════════════════════════════════════
            GRASP-MØNSTRENE
            ═══════════════════════════════════════════ */}
        <div id="grasp">
          <RefCard title="GRASP-mønstrene — jukselapp" icon="G" color="text-violet-500 font-bold" defaultOpen={true}>
            <div className="space-y-2">
              <p className="text-sm text-[var(--muted)] mb-3">
                GRASP = General Responsibility Assignment Software Patterns.
                Retningslinjer for å fordele ansvar mellom klasser i OOD.
              </p>
              <MiniTable
                headers={["Mønster", "Regel", "Eksempel (Monopol/spill)"]}
                rows={[
                  [
                    <span key="ie" className="font-bold text-violet-600 dark:text-violet-400">Informasjonsekspert</span>,
                    "Gi ansvar til klassen som har dataene som trengs.",
                    <span key="ied">Brett har alle Ruter → Brett.getRute(posisjon). Kopp har Terninger → Kopp.getSum().</span>,
                  ],
                  [
                    <span key="cr" className="font-bold text-violet-600 dark:text-violet-400">Skaper (Creator)</span>,
                    <span key="crd">B lager A hvis B inneholder/har/bruker A eller har init-data for A.</span>,
                    "Monopol lager Brett, Brett lager Ruter, Spill lager Spillere.",
                  ],
                  [
                    <span key="ct" className="font-bold text-violet-600 dark:text-violet-400">Kontroller</span>,
                    "Første objekt etter UI som mottar systemhendelser. Koordinerer, men delegerer.",
                    "Monopol-klassen er kontroller: spill() → spillRunde() → spiller.spillTrekk().",
                  ],
                  [
                    <span key="lc" className="font-bold text-violet-600 dark:text-violet-400">Lav kobling</span>,
                    "Minimér avhengigheter mellom klasser. Endring i A bør ikke tvinge endring i B.",
                    "Spiller kjenner IKKE Brett direkte — kommuniserer via kontrolleren.",
                  ],
                  [
                    <span key="hk" className="font-bold text-violet-600 dark:text-violet-400">Høy kohesjon</span>,
                    "Klassen har fokusert ansvar — gjør relaterte ting, ikke alt mulig.",
                    "Kopp.trill() + Kopp.getSum() = høy kohesjon. Kopp.skrivUtBrett() = lav kohesjon.",
                  ],
                  [
                    <span key="po" className="font-bold text-violet-600 dark:text-violet-400">Polymorfisme</span>,
                    "Bruk polymorfisme (arv) i stedet for if/switch på type.",
                    "rute.landPå(spiller) — hver Rute-subklasse implementerer sin egen versjon.",
                  ],
                  [
                    <span key="pf" className="font-bold text-violet-600 dark:text-violet-400">Ren fabrikasjon</span>,
                    "Lag en kunstig klasse som ikke finnes i domenet for å oppnå lav kobling/høy kohesjon.",
                    "Kopp (terning-beholder) finnes ikke i virkeligheten, men gir ansvar et naturlig hjem.",
                  ],
                  [
                    <span key="in" className="font-bold text-violet-600 dark:text-violet-400">Indirektion</span>,
                    "Sett et mellomledd mellom to klasser for å redusere kobling.",
                    "Kontrolleren (Monopol) er et mellomledd mellom UI og spillobjektene.",
                  ],
                  [
                    <span key="pv" className="font-bold text-violet-600 dark:text-violet-400">Beskyttede variasjoner</span>,
                    "Beskytt mot endring ved å bruke interface/abstraksjon rundt ustabile punkter.",
                    "Rute er abstrakt — nye rutetyper kan legges til uten å endre Brett.",
                  ],
                ]}
              />
              <div className="mt-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                <p className="text-sm">
                  <strong>De 3 viktigste på eksamen:</strong> Informasjonsekspert (hvem har dataene?),
                  Skaper (hvem lager hvem?), og Kontroller (hvem koordinerer?). Disse bruker du
                  direkte i sekvensdiagrammet.
                </p>
              </div>
            </div>
          </RefCard>
        </div>

        {/* ═══════════════════════════════════════════
            UTVIKLINGSMETODER
            ═══════════════════════════════════════════ */}
        <div id="metoder">
          <RefCard title="Utviklingsmetoder — hurtigreferanse" icon="⟳" color="text-cyan-500" defaultOpen={true}>
            <div className="space-y-4">
              {/* Sammenligning */}
              <MiniTable
                headers={["", "Scrum", "XP", "AUP"]}
                rows={[
                  [
                    <span key="t" className="font-medium">Type</span>,
                    "Rammeverk for prosjektstyring",
                    "Utviklingspraksis",
                    "Iterativ prosess (UP-basert)",
                  ],
                  [
                    <span key="i" className="font-medium">Iterasjon</span>,
                    "Sprint (2–4 uker)",
                    "1–2 uker",
                    "Fase-basert med iterasjoner",
                  ],
                  [
                    <span key="r" className="font-medium">Roller</span>,
                    "Product Owner, Scrum Master, Team",
                    "Hele teamet (par-programmering)",
                    "Prosjektleder, arkitekt, utviklere",
                  ],
                  [
                    <span key="f" className="font-medium">Fokus</span>,
                    "Prosess og kommunikasjon",
                    "Kodekvalitet og tekniske praksiser",
                    "Modellering og dokumentasjon (litt)",
                  ],
                  [
                    <span key="a" className="font-medium">Artefakter</span>,
                    "Product/Sprint Backlog, Burndown",
                    "User Stories, Enhetstester",
                    "UML-modeller, dokumentasjon",
                  ],
                ]}
              />

              {/* Scrum detaljer */}
              <div className="rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/20 p-4">
                <h4 className="font-bold text-sm text-cyan-700 dark:text-cyan-400 mb-2">Scrum — nøkkelbegrep</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Seremonier:</p>
                    <ul className="space-y-0.5 text-xs">
                      <li><strong>Sprint Planning</strong> — velg oppgaver fra Product Backlog</li>
                      <li><strong>Daily Standup</strong> — 15 min, hva gjorde/gjør/blokkerer</li>
                      <li><strong>Sprint Review</strong> — demo til stakeholders</li>
                      <li><strong>Sprint Retrospective</strong> — hva fungerte/forbedre</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Roller:</p>
                    <ul className="space-y-0.5 text-xs">
                      <li><strong>Product Owner</strong> — prioriterer backlog, representerer kunden</li>
                      <li><strong>Scrum Master</strong> — fjerner hindringer, fasiliterer</li>
                      <li><strong>Utviklingsteam</strong> — selvorganisert, 3–9 personer</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* XP detaljer */}
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">XP (Extreme Programming) — praksiser</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    "Par-programmering",
                    "TDD (test først)",
                    "Kontinuerlig integrasjon",
                    "Refaktorering",
                    "Enkelt design",
                    "Kollektivt kodeeierskap",
                    "Kodestandarder",
                    "40-timers uke",
                    "Planleggingsspill",
                    "Små releaser",
                    "Metafor",
                    "Kunden på plass",
                  ].map((p) => (
                    <div key={p} className="rounded bg-white dark:bg-neutral-800 px-2 py-1.5 border border-green-100 dark:border-green-900">
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* TDD */}
              <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
                <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">TDD — Test-Driven Development</h4>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 font-bold text-xs">1</span>
                    <span>Skriv test (RØDLYS)</span>
                  </div>
                  <span className="text-[var(--muted)]">→</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold text-xs">2</span>
                    <span>Få test til å passere (GRØNTLYS)</span>
                  </div>
                  <span className="text-[var(--muted)]">→</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xs">3</span>
                    <span>Refaktorer</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] mt-2">Mål: kort syklus, enkel kode, høy testdekning, modig refaktorering.</p>
              </div>

              {/* CI/CD */}
              <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
                <h4 className="font-bold text-sm text-purple-700 dark:text-purple-400 mb-2">CI/CD</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Continuous Integration (CI):</strong> Alle utviklere integrerer kode daglig i felles repo. Automatiske tester kjøres ved hver commit.</p>
                  <p><strong>Continuous Delivery (CD):</strong> Kode kan deployes til produksjon til enhver tid. Alt er automatisert bortsett fra selve deploy-knappen.</p>
                  <p><strong>Continuous Deployment:</strong> Alt automatisert — kode som passerer testene deployes automatisk.</p>
                </div>
              </div>

              {/* AUP */}
              <div className="rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-4">
                <h4 className="font-bold text-sm text-orange-700 dark:text-orange-400 mb-2">AUP (Agile Unified Process)</h4>
                <div className="text-sm">
                  <p className="mb-2">Faser: <strong>Oppstart</strong> → <strong>Utdypning</strong> → <strong>Konstruksjon</strong> → <strong>Overgang</strong></p>
                  <p className="text-xs text-[var(--muted)]">
                    Disipliner i hver fase: Modellering, Implementering, Testing, Deployment, Konfigurasjonsstyring, Prosjektledelse, Miljø.
                    Bruker UML og iterativ utvikling. Lettere enn RUP, tyngre enn Scrum/XP.
                  </p>
                </div>
              </div>

              {/* Smidig manifesto */}
              <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-[var(--card-border)] p-4">
                <h4 className="font-bold text-sm mb-2">Det smidige manifestet — 4 verdier</h4>
                <div className="space-y-1.5 text-sm">
                  {[
                    ["Individer og interaksjoner", "prosesser og verktøy"],
                    ["Fungerende programvare", "omfattende dokumentasjon"],
                    ["Kundesamarbeid", "kontraktsforhandlinger"],
                    ["Endringshåndtering", "å følge en plan"],
                  ].map(([left, right], i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-semibold text-green-600 dark:text-green-400">{left}</span>
                      <span className="text-[var(--muted)]">over</span>
                      <span className="text-[var(--muted)] line-through">{right}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RefCard>
        </div>

        {/* ═══════════════════════════════════════════
            PROSESSEN OOA → OOD → OOP
            ═══════════════════════════════════════════ */}
        <div id="prosess">
          <RefCard title="Prosessen: OOA → OOD → OOP" icon="→" color="text-indigo-500 font-bold" defaultOpen={true}>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
                <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1">OOA — Analyse</h4>
                <p className="text-sm font-semibold mb-1">HVA skal systemet gjøre?</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  <li>Brukstilfellemodell (diagram + beskrivelser)</li>
                  <li>Domenemodell (konseptuelle klasser, INGEN metoder)</li>
                </ul>
                <p className="text-xs text-[var(--muted)] mt-2">Eksamen: Oppgave 1a + 1b</p>
              </div>
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
                <h4 className="font-bold text-green-700 dark:text-green-400 text-sm mb-1">OOD — Design</h4>
                <p className="text-sm font-semibold mb-1">HVORDAN samarbeider objektene?</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  <li>Sekvensdiagram (meldinger mellom objekter)</li>
                  <li>Utformingsmodell (klasser med metoder)</li>
                </ul>
                <p className="text-xs text-[var(--muted)] mt-2">Eksamen: Oppgave 1c</p>
              </div>
              <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
                <h4 className="font-bold text-purple-700 dark:text-purple-400 text-sm mb-1">OOP — Kode</h4>
                <p className="text-sm font-semibold mb-1">SKRIV Java fra diagrammene.</p>
                <ul className="text-xs space-y-0.5 list-disc list-inside">
                  <li>Klasser fra utformingsmodellen</li>
                  <li>Metoder fra sekvensdiagrammet</li>
                </ul>
                <p className="text-xs text-[var(--muted)] mt-2">Eksamen: Oppgave 4</p>
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
              <strong>Nøkkelpunkt:</strong> Meldingene et objekt <em>mottar</em> i sekvensdiagrammet
              blir til <strong>metoder</strong> i den klassen. Sekvensdiagrammet → utformingsmodell → Java-kode.
            </div>
          </RefCard>
        </div>

        {/* ═══════════════════════════════════════════
            EKSAMEN-SJEKKLISTE
            ═══════════════════════════════════════════ */}
        <div id="sjekkliste">
          <RefCard title="Eksamen-sjekkliste — alle 4 deler" icon="✓" color="text-green-500" defaultOpen={true}>
            <div className="space-y-4">
              {/* Del 1 */}
              <div className="rounded-lg border border-[var(--card-border)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 font-bold text-xs">1</span>
                  <h4 className="font-bold text-sm">Modellering (~40%)</h4>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <p className="font-semibold text-xs mb-1">1a — Brukstilfellemodell</p>
                    <ul className="text-xs space-y-0.5">
                      <li>☐ Diagram med aktør, system, 2–4 brukstilfeller</li>
                      <li>☐ IKKE et flytdiagram</li>
                      <li>☐ Tekstlig beskrivelse for hvert</li>
                      <li>☐ Forkrav og aktører nevnt</li>
                      <li>☐ &lt;&lt;include&gt;&gt; der relevant</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-xs mb-1">1b — Domenemodell</p>
                    <ul className="text-xs space-y-0.5">
                      <li>☐ Klasser fra substantiver i teksten</li>
                      <li>☐ INGEN metoder!</li>
                      <li>☐ Attributter på alle klasser</li>
                      <li>☐ Multiplisitet på ALLE assosiasjoner</li>
                      <li>☐ Arv kun ved tydelige undertyper</li>
                      <li>☐ Konsistent med brukstilfellene</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-xs mb-1">1c — Sekvensdiagram</p>
                    <ul className="text-xs space-y-0.5">
                      <li>☐ Objekter fra domenemodellen</li>
                      <li>☐ Samsvarer med brukstilfellebeskrivelse</li>
                      <li>☐ loop for gjentakelser</li>
                      <li>☐ alt/opt for betingelser</li>
                      <li>☐ Meldinger kun fra aktive objekter</li>
                      <li>☐ Parametere og returverdier</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Del 2 */}
              <div className="rounded-lg border border-[var(--card-border)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 font-bold text-xs">2</span>
                  <h4 className="font-bold text-sm">OOA og OOD (~20%)</h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold mb-1">SOLID — spør gjerne:</p>
                    <ul className="space-y-0.5">
                      <li>☐ Identifiser brudd på SOLID i gitt kode/diagram</li>
                      <li>☐ Forklar prinsippet og foreslå forbedring</li>
                      <li>☐ SRP + OCP er de vanligste</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">GRASP — spør gjerne:</p>
                    <ul className="space-y-0.5">
                      <li>☐ Hvem skal ha ansvaret? → Informasjonsekspert</li>
                      <li>☐ Hvem lager objektet? → Skaper</li>
                      <li>☐ Identifiser GRASP-mønster i sekvensdiagram</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Del 3 */}
              <div className="rounded-lg border border-[var(--card-border)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 font-bold text-xs">3</span>
                  <h4 className="font-bold text-sm">Utviklingsmetode (~20%)</h4>
                </div>
                <ul className="text-xs space-y-0.5">
                  <li>☐ Forklar Scrum-roller, seremonier, artefakter</li>
                  <li>☐ Forklar XP-praksiser (parprogrammering, TDD, refaktorering)</li>
                  <li>☐ Sammenlign smidig vs. plandriven (vannfall)</li>
                  <li>☐ TDD — rød/grønn/refaktorer-syklusen</li>
                  <li>☐ CI/CD — hva er forskjellen?</li>
                  <li>☐ AUP faser og disipliner</li>
                  <li>☐ Det smidige manifestet</li>
                  <li>☐ Oblig-relatert spørsmål (se obligene!)</li>
                </ul>
              </div>

              {/* Del 4 */}
              <div className="rounded-lg border border-[var(--card-border)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 font-bold text-xs">4</span>
                  <h4 className="font-bold text-sm">OOP — Java fra UML (~20%)</h4>
                </div>
                <ul className="text-xs space-y-0.5">
                  <li>☐ Skriv Java-klasser fra utformingsmodell/klassediagram</li>
                  <li>☐ Implementer metoder fra sekvensdiagrammet</li>
                  <li>☐ Assosiasjon 1:* → <code>List&lt;Type&gt;</code>, 1:1 → felt, 0..1 → felt (kan være null)</li>
                  <li>☐ Arv → <code>extends</code>, abstrakt → <code>abstract class</code></li>
                  <li>☐ Komposisjon → objekter lages i konstruktøren</li>
                  <li>☐ Synlighet: + → public, - → private, # → protected</li>
                  <li>☐ Metoder fra sekvensdiagram: meldinger objektet mottar = metoder i klassen</li>
                </ul>
                <div className="mt-2 rounded bg-neutral-100 dark:bg-neutral-800 p-2 font-mono text-xs">
                  <pre>{`// Assosiasjon: Spill 1 ——— * Spiller
public class Spill {
    private List<Spiller> spillere; // 1:*
    private Brett brett;            // 1:1
}`}</pre>
                </div>
              </div>

              {/* Generelle tips */}
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
                <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">Generelle eksamenstips</h4>
                <ul className="text-sm space-y-1">
                  <li>• Les oppgaven to ganger. Understrek substantiver og verb.</li>
                  <li>• Det er nesten ALLTID et spill (brett-, kort- eller terningspill).</li>
                  <li>• Start enkelt — bedre med enkel riktig modell enn komplisert feil.</li>
                  <li>• Sjekk at alle diagrammer er <strong>konsistente</strong> med hverandre.</li>
                  <li>• Bruk professorens eksempler (Monopol, Stigespill) som mal.</li>
                  <li>• Tidsbruk: ~40 min modellering, ~20 min OOA/OOD, ~20 min metoder, ~20 min Java.</li>
                </ul>
              </div>
            </div>
          </RefCard>
        </div>
      </div>
    </div>
  );
}
