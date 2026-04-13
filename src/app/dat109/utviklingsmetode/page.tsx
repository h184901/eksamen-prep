"use client";

import { useState } from "react";
import Link from "next/link";
import TheorySummary from "@/components/TheorySummary";
import SectionNav from "@/components/SectionNav";

/* ------------------------------------------------------------------ */
/*  Flervalgsquiz-komponent                                           */
/* ------------------------------------------------------------------ */
interface QuizOption {
  label: string;
  text: string;
}
interface QuizQuestionProps {
  id: number;
  question: string;
  options: QuizOption[];
  correctIndex: number;
  explanation: string;
  source?: string;
}

function QuizQuestion({ id, question, options, correctIndex, explanation, source }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 text-xs font-bold shrink-0">
          {id}
        </span>
        <div>
          <p className="font-semibold leading-snug">{question}</p>
          {source && <p className="text-xs text-[var(--muted)] mt-1">{source}</p>}
        </div>
      </div>
      <div className="space-y-2 ml-10">
        {options.map((opt, i) => {
          let ring = "border-[var(--card-border)] hover:border-sysdev-400";
          let bg = "bg-transparent";
          if (answered) {
            if (i === correctIndex) {
              ring = "border-green-500";
              bg = "bg-green-50 dark:bg-green-950/20";
            } else if (i === selected && i !== correctIndex) {
              ring = "border-red-400";
              bg = "bg-red-50 dark:bg-red-950/20";
            } else {
              ring = "border-[var(--card-border)] opacity-50";
            }
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${ring} ${bg}`}
            >
              <span className="font-semibold mr-2">{opt.label})</span>
              {opt.text}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mt-3 ml-10 p-3 rounded-lg text-sm ${selected === correctIndex ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"}`}>
          <p className="font-semibold mb-1">
            {selected === correctIndex ? "Riktig!" : `Feil — riktig svar er ${options[correctIndex].label})`}
          </p>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison-tabell-komponent                                       */
/* ------------------------------------------------------------------ */
function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 bg-sysdev-50 dark:bg-sysdev-950/30 border border-[var(--card-border)] font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 border border-[var(--card-border)] align-top">
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

/* ------------------------------------------------------------------ */
/*  Sections-config for SectionNav                                    */
/* ------------------------------------------------------------------ */
const sections = [
  { id: "oversikt", label: "Oversikt", icon: "🗺️" },
  { id: "smidig-vs-fossefall", label: "Smidig vs Fossefall", icon: "⚖️" },
  { id: "manifestet", label: "Agile Manifest", icon: "📜" },
  { id: "scrum", label: "Scrum", icon: "🔄" },
  { id: "xp", label: "XP", icon: "👥" },
  { id: "tdd", label: "TDD", icon: "🧪" },
  { id: "ci-cd", label: "CI/CD", icon: "🚀" },
  { id: "devops", label: "DevOps", icon: "🔧" },
  { id: "aup", label: "AUP", icon: "📐" },
  { id: "kanban", label: "Kanban vs Scrum", icon: "📋" },
  { id: "quiz", label: "Eksamensquiz", icon: "✅" },
];

/* ================================================================== */
/*  HOVEDSIDE                                                         */
/* ================================================================== */
export default function UtviklingsmetodePage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Utviklingsmetode</span>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-2 inline-block">
          ~20% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">Utviklingsmetode</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Scrum, Extreme Programming, TDD, CI/CD, AUP, DevOps og smidig utvikling.
          Fra 2023 er dette flervalg på eksamen — men du trenger dyp forståelse for å
          avsløre feilalternativene.
        </p>
      </div>

      <SectionNav sections={sections} />

      {/* ============================================================ */}
      {/*  1. OVERSIKT                                                 */}
      {/* ============================================================ */}
      <section id="oversikt" className="scroll-mt-32">
        <TheorySummary
          title="Oversikt — Hva handler dette om?"
          mustKnow={[
            "De 4 verdiene i det agile manifestet (dukker opp HVERT år)",
            "Scrum-rollene, artefaktene og seremoniene",
            "TDD: Red → Green → Refactor-syklusen",
            "Forskjellen mellom CI, Continuous Delivery og Continuous Deployment",
            "AUPs fire faser og hvordan de kombineres med Scrum",
            "XPs 5 verdier (spesielt at Dokumentasjon IKKE er en av dem)",
          ]}
        >
          <p>
            Oppgave 3 på eksamen (20%) handler om <strong>utviklingsmetoder</strong> — hvordan
            vi organiserer og gjennomfører programvareprosjekter. Fra 2023 er dette blitt
            flervalg, men alternativene er designet for å lure deg hvis du bare har
            overfladisk forståelse.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Den store sammenhengen</p>
            <p className="text-sm">
              Tradisjonelt brukte man <strong>fossefallsmodellen</strong> — alt ble planlagt
              i detalj før koding startet. Problemet: kunden så produktet først på slutten,
              og da var det ofte feil ting som var bygd. <strong>Smidige metoder</strong> løser
              dette ved å levere fungerende programvare i korte sykluser, slik at kunden gir
              tilbakemelding tidlig og ofte.
            </p>
          </div>

          {/* Visuell oversikt over metodene */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
            {[
              { name: "Scrum", desc: "Prosjektledelse med sprinter og roller", color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" },
              { name: "XP", desc: "Tekniske praksiser (TDD, parprog.)", color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800" },
              { name: "TDD", desc: "Skriv testen FØR koden", color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" },
              { name: "CI/CD", desc: "Automatisk bygging, testing, utrulling", color: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800" },
              { name: "DevOps", desc: "Dev + Ops = ett team", color: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800" },
              { name: "AUP", desc: "Overordnet rammeverk med 4 faser", color: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800" },
            ].map((m) => (
              <div key={m.name} className={`rounded-lg border p-3 ${m.color}`}>
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-xs mt-1 text-[var(--muted)]">{m.desc}</p>
              </div>
            ))}
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  2. SMIDIG VS FOSSEFALL                                     */}
      {/* ============================================================ */}
      <section id="smidig-vs-fossefall" className="scroll-mt-32">
        <TheorySummary
          title="Smidig vs Fossefall (Vannfall)"
          mustKnow={[
            "Fossefall er sekvensielt — hver fase må fullføres før neste starter",
            "Smidig er iterativt — lever fungerende programvare i korte sykluser",
            "Smidige metoder håndterer endringer bedre enn fossefall",
            "Fossefall kan passe for prosjekter med faste, uforanderlige krav",
          ]}
        >
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Fossefallsmodellen (Waterfall)</p>
            <p className="text-sm mb-3">
              En <strong>lineær, sekvensiell</strong> prosess der man gjør alle krav ferdig,
              deretter all analyse, all design, all koding, all testing, og til slutt utrulling.
              Hver fase må fullføres helt før neste kan starte.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              {["Krav", "Analyse", "Design", "Koding", "Testing", "Utrulling"].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                    {phase}
                  </span>
                  {i < 5 && <span className="text-blue-400">→</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Smidig modell (Agile)</p>
            <p className="text-sm mb-3">
              En <strong>iterativ, inkrementell</strong> prosess der man leverer fungerende
              programvare i korte sykluser (1–4 uker). Kunden ser resultater tidlig og kan
              gi tilbakemeldinger som former neste iterasjon.
            </p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
              {["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "..."].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300">
                    {phase}
                  </span>
                  {i < 4 && <span className="text-green-400">→</span>}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              Hver sprint inneholder planlegging, design, koding, testing og demo — alt i én kort syklus.
            </p>
          </div>

          <ComparisonTable
            headers={["Egenskap", "Fossefall", "Smidig"]}
            rows={[
              ["Prosess", "Sekvensiell, lineær", "Iterativ, inkrementell"],
              ["Krav", "Låst i starten", "Kan endres underveis"],
              ["Leveranse", "Alt på slutten", "Fungerende inkrement etter hver sprint"],
              ["Kundeinvolvering", "Kun i starten og slutten", "Kontinuerlig gjennom prosjektet"],
              ["Risiko", "Oppdages sent", "Oppdages tidlig (korte sykluser)"],
              ["Endringskostnad", "Høy — alt må gjøres om", "Lav — bare neste sprint påvirkes"],
              ["Testing", "Etter all koding er ferdig", "Kontinuerlig i hver sprint"],
              ["Dokumentasjon", "Tung, omfattende", "Lettere — fokus på fungerende kode"],
              ["Teamstruktur", "Spesialiserte roller i faser", "Tverrfunksjonelle, selvstyrte team"],
              ["Passer for", "Faste krav, regulerte miljøer", "Endringspregede prosjekter, innovasjon"],
            ]}
          />

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Vanlig eksamensfelle</p>
            <p className="text-sm">
              Smidige metoder sier <em>ikke</em> at dokumentasjon er verdiløst — de sier at
              <strong> fungerende programvare verdsettes høyere</strong> enn dokumentasjon.
              Alternativ som sier &ldquo;planlegging og design er de mest kritiske fasene&rdquo;
              er fossefalls-tenkning og <strong>IKKE</strong> et smidig prinsipp.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  3. DET AGILE MANIFESTET                                    */}
      {/* ============================================================ */}
      <section id="manifestet" className="scroll-mt-32">
        <TheorySummary
          title="Det agile manifestet (2001)"
          mustKnow={[
            "De 4 verdiene — ordrett (testet HVERT år på eksamen)",
            "'Fremfor' betyr ikke at høyre side er verdiløs — venstre side verdsettes høyere",
            "De 12 prinsippene — kjenn hovedessensen",
            "Vanlig felle: 'Strukturert planlegging foran tilpasset planlegging' er IKKE en agile-verdi",
          ]}
        >
          <p>
            I 2001 møttes 17 erfarne programvareutviklere og formulerte det agile manifestet.
            Det er grunnlaget for <em>alle</em> smidige metoder (Scrum, XP, Kanban, AUP, osv.).
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-5 rounded-lg">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-3 text-lg">De 4 verdiene</p>
            <div className="space-y-3">
              {[
                { left: "Personer og samspill", right: "prosesser og verktøy" },
                { left: "Programvare som virker", right: "omfattende dokumentasjon" },
                { left: "Samarbeid med kunden", right: "kontraktsforhandlinger" },
                { left: "Å reagere på endringer", right: "å følge en plan" },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-green-600 dark:text-green-400 min-w-[180px]">{v.left}</span>
                  <span className="text-[var(--muted)] italic">fremfor</span>
                  <span className="text-[var(--muted)]">{v.right}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-3 italic">
              &ldquo;Selv om det er verdi i elementene til høyre, verdsetter vi elementene til venstre høyere.&rdquo;
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">De viktigste av de 12 prinsippene</p>
            <ul className="list-disc list-inside text-sm space-y-1.5">
              <li>Høyeste prioritet er å <strong>tilfredsstille kunden gjennom tidlige og kontinuerlige leveranser</strong></li>
              <li>Lever <strong>fungerende programvare hyppig</strong> — jo oftere, jo bedre</li>
              <li><strong>Fungerende programvare</strong> er det primære målet på fremdrift</li>
              <li>Ønsk <strong>endringer velkommen</strong>, selv sent i utviklingen</li>
              <li>Den mest effektive kommunikasjonen er <strong>ansikt til ansikt</strong></li>
              <li>De beste løsningene kommer fra <strong>selvstyrte team</strong></li>
              <li>Teamet skal <strong>reflektere med jevne mellomrom</strong> over hvordan det kan bli bedre</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Eksamensfeller</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>2023:</strong> &ldquo;Strukturert planlegging foran tilpasset planlegging&rdquo; er IKKE en agile-verdi — det er det stikk motsatte</li>
              <li><strong>2024:</strong> &ldquo;Planlegging og design er de mest kritiske fasene&rdquo; er IKKE et smidig prinsipp — det er fossefalls-tenkning</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  4. SCRUM                                                    */}
      {/* ============================================================ */}
      <section id="scrum" className="scroll-mt-32">
        <TheorySummary
          title="Scrum"
          mustKnow={[
            "3 roller: Produkteier, Scrum Master, Utviklingsteam",
            "Scrum Master er IKKE en prosjektleder — er en servant leader som fjerner hindringer",
            "Artefakter: Product Backlog, Sprint Backlog, Inkrement, Burndown Chart",
            "Sprinten er FERDIG når tidsboksen utløper — ikke når alt er gjort",
            "Scrum har INGEN dedikert test-rolle",
            "Product Backlog Refinement er IKKE tidsbokset",
            "Tverrfunksjonelt = teamet som helhet har all kompetanse",
          ]}
        >
          <p>
            Scrum er den mest brukte smidige metoden og den <strong>mest testede på eksamen</strong>.
            Der XP fokuserer på tekniske praksiser, fokuserer Scrum på <strong>prosjektledelse
            og organisering</strong>.
          </p>

          {/* --- ROLLER --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">De tre rollene</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-2">Produkteier (PO)</p>
              <ul className="text-sm space-y-1">
                <li>Representerer kunden/interessenter</li>
                <li>Prioriterer <strong>produktkøen</strong></li>
                <li>Bestemmer <strong>hva</strong> som skal bygges</li>
                <li>Er <strong>ikke</strong> prosjektleder</li>
              </ul>
            </div>
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400 mb-2">Scrum Master (SM)</p>
              <ul className="text-sm space-y-1">
                <li><strong>Fjerner hindringer</strong> for teamet</li>
                <li>Sørger for at Scrum-prosessen følges</li>
                <li>Beskytter teamet mot forstyrrelser</li>
                <li>Er en <strong>servant leader</strong>, IKKE sjef</li>
              </ul>
            </div>
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Utviklingsteamet</p>
              <ul className="text-sm space-y-1">
                <li><strong>Tverrfunksjonelt</strong> — all kompetanse i teamet</li>
                <li><strong>Selvorganiserende</strong></li>
                <li>Ideelt 5–8 personer</li>
                <li>Ingen under-roller (ikke &ldquo;tester&rdquo; eller &ldquo;arkitekt&rdquo;)</li>
              </ul>
            </div>
          </div>

          {/* --- ARTEFAKTER --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">Artefakter</h3>

          <div className="space-y-3">
            {[
              { name: "Product Backlog", desc: "Prioritert liste over ALT som skal bygges. Eies av Produkteier. Oppgaver formuleres som user stories. Prioriteres etter forretningsmessig verdi." },
              { name: "Sprint Backlog", desc: "Oppgavene teamet har valgt for den aktuelle sprinten. Konkrete, små oppgaver som teamet forplikter seg til." },
              { name: "Inkrement", desc: "Fungerende, potensielt leverbar programvare levert på slutten av hver sprint. IKKE testdokumenter eller wireframes — et kjørende produkt." },
              { name: "Scrum-tavle", desc: "Visualiserer arbeidet med kolonner: «To Do», «Doing», «Done». Også kalt Kanban-tavle." },
              { name: "Burndown Chart", desc: "Viser gjenstående arbeid (Y-akse) i forhold til tid (X-akse). Viser om teamet ligger an til å fullføre sprinten." },
            ].map((a) => (
              <div key={a.name} className="flex gap-3 p-3 rounded-lg bg-[var(--card)] border border-[var(--card-border)]">
                <span className="text-sysdev-600 dark:text-sysdev-400 font-bold text-sm min-w-[140px] shrink-0">{a.name}</span>
                <span className="text-sm">{a.desc}</span>
              </div>
            ))}
          </div>

          {/* --- SEREMONIER --- */}
          <h3 className="text-lg font-bold mt-6 mb-3">Sprint-seremoniene</h3>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Sprint-flyten</p>
            <div className="flex flex-wrap items-center gap-1 text-xs font-mono mb-3">
              {[
                "Sprint Planning",
                "Daily Scrum (daglig)",
                "Utvikling",
                "Sprint Review",
                "Sprint Retro",
              ].map((phase, i) => (
                <span key={phase} className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                    {phase}
                  </span>
                  {i < 4 && <span className="text-blue-400">→</span>}
                </span>
              ))}
            </div>
          </div>

          <ComparisonTable
            headers={["Seremoni", "Hva skjer?", "Hvem deltar?", "Tidsboks"]}
            rows={[
              ["Sprint Planning", "Teamet velger oppgaver fra Product Backlog og planlegger sprinten", "Hele Scrum-teamet", "Maks 8 timer (for 4-ukers sprint)"],
              ["Daily Scrum", "Kort statusmøte: Hva gjorde jeg? Hva skal jeg gjøre? Hva blokkerer?", "Utviklingsteamet", "Maks 15 minutter"],
              ["Sprint Review", "Demo av inkrementet for PO og interessenter", "Hele teamet + interessenter", "Maks 4 timer"],
              ["Sprint Retro", "Refleksjon: Hva gikk bra? Dårlig? Forbedringer?", "Hele Scrum-teamet", "Maks 3 timer"],
              ["Backlog Refinement", "Klargjøring og estimering av oppgaver", "PO + Utviklingsteamet", "IKKE tidsbokset (!)"],
            ]}
          />

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Viktige eksamensfeller om Scrum</p>
            <ul className="list-disc list-inside text-sm space-y-1.5">
              <li><strong>Sprinten er ferdig når tidsboksen utløper</strong> — IKKE når alle oppgavene er fullført. Uferdig arbeid flyttes tilbake til Product Backlog.</li>
              <li><strong>For mange oppgaver?</strong> Diskuter med kunden (PO) for å endre produktkøen. Aldri jobb overtid eller ta snarveier.</li>
              <li><strong>Scrum har INGEN test-rolle.</strong> Bare tre roller: PO, SM, Team. Testing er teamets felles ansvar.</li>
              <li><strong>Tverrfunksjonelt</strong> betyr at <em>teamet som helhet</em> har all kompetanse — IKKE at hvert individ er tverrfunksjonelt.</li>
              <li><strong>Backlog Refinement</strong> (grooming) er IKKE tidsbokset — det er den eneste aktiviteten som ikke er det.</li>
              <li><strong>Burndown chart</strong> viser gjenstående arbeid vs. tid — IKKE prosjektfremdrift eller lagets hastighet.</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

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

      {/* ============================================================ */}
      {/*  6. TEST-DREVET UTVIKLING (TDD)                             */}
      {/* ============================================================ */}
      <section id="tdd" className="scroll-mt-32">
        <TheorySummary
          title="Test-drevet utvikling (TDD)"
          mustKnow={[
            "TDD = skriv testen FØR koden",
            "Red-Green-Refactor-syklusen",
            "Red: skriv feilende test → Green: skriv enkleste kode → Refactor: forbedre",
            "Krav til enheter: små, uavhengige, testbare, ett ansvar",
            "Testdoubles: Dummy, Stub, Mock, Simulering",
            "Fordeler: automatisk testbar, rask tilbakemelding, tester = dokumentasjon",
          ]}
        >
          <p>
            TDD er en av de mest populære eksamenstemaene (spurt i 2020, 2021, 2022 og inkludert
            i flervalg fra 2023). Kent Beck sier: <em>&ldquo;Kode uten test eksisterer ikke.&rdquo;</em>
          </p>

          {/* Red-Green-Refactor visuelt */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-5 my-5 rounded-lg">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-4 text-lg text-center">
              Red → Green → Refactor
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
                <p className="text-2xl mb-2">1. RED</p>
                <p className="font-bold text-red-700 dark:text-red-400 mb-1">Skriv feilende test</p>
                <p className="text-xs text-[var(--muted)]">
                  Skriv en test for funksjonaliteten du vil lage. Testen skal FEILE fordi
                  koden ikke er skrevet ennå.
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                <p className="text-2xl mb-2">2. GREEN</p>
                <p className="font-bold text-green-700 dark:text-green-400 mb-1">Skriv enkleste kode</p>
                <p className="text-xs text-[var(--muted)]">
                  Skriv den enklest mulige koden som gjør at testen PASSERER.
                  Ikke overtenk — bare gjør testen grønn.
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700">
                <p className="text-2xl mb-2">3. REFACTOR</p>
                <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">Forbedre koden</p>
                <p className="text-xs text-[var(--muted)]">
                  Rydd opp, fjern duplikater, gjør koden lesbar.
                  Kjør testene igjen for å verifisere at alt fortsatt virker.
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-[var(--muted)] mt-3">
              Gjenta for neste funksjonalitet. Syklustid: sekunder til minutter.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Krav til testbare enheter</h3>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Små</strong> — test én ting om gangen</li>
              <li><strong>Uavhengige</strong> — ingen avhengigheter mellom tester</li>
              <li><strong>Testbare</strong> — kan kjøres automatisk</li>
              <li><strong>Konsistent oppførsel</strong> — samme resultat hver gang</li>
              <li><strong>Ett ansvar</strong> — SRP (Single Responsibility Principle)</li>
              <li><strong>Ingen sirkulære avhengigheter</strong></li>
              <li><strong>Veldefinerte avhengigheter</strong></li>
            </ul>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Testdoubles (erstatninger for ekte avhengigheter)</h3>
          <ComparisonTable
            headers={["Type", "Hva gjør den?", "Eksempel"]}
            rows={[
              ["Dummy", "Tom implementasjon, brukes bare for å fylle parameterlister", "Et tomt objekt sendt inn for å unngå NullPointerException"],
              ["Stub", "Returnerer forhåndsdefinerte verdier", "En stub som alltid returnerer \"OK\" fra en API"],
              ["Mock", "Simulerer oppførsel og verifiserer at metoder ble kalt", "Verifiser at sendEmail() ble kalt med riktig mottaker"],
              ["Simulering", "Full kopi av det reelle systemet", "En in-memory database som oppfører seg som den ekte"],
            ]}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Fordeler og ulemper</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Fordeler</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Koden blir automatisk testbar</li>
                <li>Rask tilbakemelding</li>
                <li>God testdekning</li>
                <li>Fremmer enkel design</li>
                <li>Tester fungerer som dokumentasjon</li>
                <li>Feilsøking enklere (vet hva som feilet)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">Ulemper</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Tar lengre tid i starten</li>
                <li>Krever disiplin</li>
                <li>Noen ting vanskelig å teste (UI, databaser)</li>
                <li>Testene må vedlikeholdes</li>
                <li>Kan føre til for mye fokus på å passere tester</li>
                <li>Ikke alt egner seg for TDD</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Testpyramiden (Mike Cohn)</p>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-20 text-right font-mono text-xs">10%</span>
                <div className="h-6 bg-red-200 dark:bg-red-900/40 rounded flex items-center px-2 text-xs" style={{ width: "30%" }}>System/UI-tester</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-right font-mono text-xs">20%</span>
                <div className="h-6 bg-amber-200 dark:bg-amber-900/40 rounded flex items-center px-2 text-xs" style={{ width: "50%" }}>Feature-tester</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-right font-mono text-xs">70%</span>
                <div className="h-6 bg-green-200 dark:bg-green-900/40 rounded flex items-center px-2 text-xs" style={{ width: "80%" }}>Enhetstester</div>
              </div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              70% bør være enkle enhetstester, 20% feature-tester, kun 10% tunge system/UI-tester.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  7. CI/CD                                                    */}
      {/* ============================================================ */}
      <section id="ci-cd" className="scroll-mt-32">
        <TheorySummary
          title="CI/CD — Kontinuerlig Integrasjon og Levering"
          mustKnow={[
            "CI = integrer kode ofte + automatisk bygg + automatisk test",
            "Continuous Delivery = koden KAN alltid leveres (manuell deploy)",
            "Continuous Deployment = koden deployes AUTOMATISK etter testene passerer",
            "CI krever: IDE, Git, testrammeverk, byggtjener, kvalitetsverktøy",
            "CI er avhengig av TDD — automatiserte tester er fundamentet",
          ]}
        >
          <p>
            CI/CD er <strong>automatiseringen</strong> som gjør smidig utvikling mulig i praksis.
            Uten CI/CD kan du ikke levere hyppig fordi manuell testing og utrulling tar for lang tid.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De tre nivåene</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">Kontinuerlig Integrasjon (CI)</p>
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
            </div>

            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Kontinuerlig Levering (Continuous Delivery)</p>
              <p className="text-sm">
                Bygger på CI. Koden er <strong>alltid i en tilstand som KAN leveres</strong> til produksjon.
                Utrulling til produksjon gjøres <strong>manuelt</strong> — noen trykker på en knapp.
              </p>
            </div>

            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1">Kontinuerlig Utrulling (Continuous Deployment)</p>
              <p className="text-sm">
                Går et steg videre: koden rulles <strong>automatisk</strong> ut til produksjon etter at
                alle tester har passert. <strong>Ingen manuell godkjenning.</strong> Store skyselskaper
                ruller ut kode hundrevis av ganger om dagen.
              </p>
            </div>
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
              ["Utrulling", "Docker, Kubernetes", "Pakker og deployer koden automatisk"],
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

      {/* ============================================================ */}
      {/*  8. DEVOPS                                                   */}
      {/* ============================================================ */}
      <section id="devops" className="scroll-mt-32">
        <TheorySummary
          title="DevOps"
          mustKnow={[
            "DevOps = bryte ned siloer mellom utvikling (Dev) og drift (Ops)",
            "Begge lag har LIK prioritet — ingen over den andre",
            "Tre bærebjelker: alle ansvar for alt, automatiser alt, mål og forbedre",
            "Bygger på CI/CD + infrastrukturautomatisering + overvåking",
            "Infrastructure as Code: definer servere/miljøer som kode (Docker, Kubernetes)",
          ]}
        >
          <p>
            Tradisjonelt var det ett team som utviklet koden (Development) og et helt annet
            team som tok seg av drift og utrulling (Operations). DevOps bryter ned denne
            barrieren og gjør <strong>hele teamet ansvarlig for hele livssyklusen</strong>.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-5 rounded-lg">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-3">De tre bærebjelkene i DevOps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">1. Alle har ansvar for alt</p>
                <p className="text-xs text-[var(--muted)] mt-1">Dev og Ops jobber sammen gjennom hele livssyklusen</p>
              </div>
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">2. Automatiser alt</p>
                <p className="text-xs text-[var(--muted)] mt-1">CI/CD, Infrastructure as Code, automatisert testing</p>
              </div>
              <div className="p-3 rounded bg-white dark:bg-neutral-900 border border-blue-100 dark:border-blue-900">
                <p className="font-semibold text-sm">3. Mål og forbedre</p>
                <p className="text-xs text-[var(--muted)] mt-1">Prosess-metrikker, tjeneste-metrikker, kontinuerlig forbedring</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">DevOps-pipelines</h3>
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
            <p className="text-sm">
              I stedet for å manuelt installere programvare på servere, definerer man
              infrastrukturen som <strong>kode</strong>. Verktøy som Docker og Kubernetes
              lar deg skrive et skript som automatisk setter opp en server med 100% identisk
              konfigurasjon hver gang. Fordeler: <strong>repeterbarhet</strong>,
              <strong> versjonskontroll</strong>, <strong>rask skalering</strong>.
            </p>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">Hva måles i DevOps?</h3>
          <ComparisonTable
            headers={["Type", "Eksempler"]}
            rows={[
              ["Prosess-metrikker", "Deployment-frekvens, lead time for changes, mean time to recovery (MTTR), change failure rate"],
              ["Tjeneste-metrikker", "Oppetid (availability), responstid (latency), antall brukerfeil, kundetilfredshet"],
            ]}
          />
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  9. AUP (AGILE UNIFIED PROCESS)                             */}
      {/* ============================================================ */}
      <section id="aup" className="scroll-mt-32">
        <TheorySummary
          title="AUP — Agile Unified Process"
          mustKnow={[
            "AUP = forenklet, smidig versjon av RUP (Rational Unified Process)",
            "4 faser: Oppstart → Utdypning → Bygging → Overlevering",
            "7 disipliner som jobbes med gjennom alle fasene",
            "AUP kombineres gjerne med Scrum i byggefasen",
            "Formål: flate ut kostnadskurven for endringer",
          ]}
        >
          <p>
            AUP er den utviklingsmetoden Atle bruker som <strong>overordnet rammeverk</strong> i kurset.
            Den kombinerer strukturen fra tradisjonell RUP med smidige praksiser fra XP og Scrum.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">De 4 fasene</h3>

          <div className="space-y-3 my-4">
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4">
              <p className="font-bold text-blue-700 dark:text-blue-400">1. Oppstart (Inception)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Definer prosjektets <strong>omfang</strong></li>
                <li>Lag <strong>kostnadsestimat</strong> og tidsplan</li>
                <li>Kartlegg <strong>risikoer</strong></li>
                <li>Lag overordnet kravspesifikasjon og brukstilfellemodell</li>
                <li>Bestem <strong>gjennomførbarhet</strong> — skal vi gjøre dette?</li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4">
              <p className="font-bold text-purple-700 dark:text-purple-400">2. Utdypning (Elaboration)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Gå dypere inn i kravene</li>
                <li>Identifiser og <strong>valider arkitekturen</strong></li>
                <li>Håndter <strong>teknisk risiko</strong></li>
                <li>Bygg en kjørbar <strong>arkitekturprototype</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="font-bold text-green-700 dark:text-green-400">3. Bygging (Construction)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Hovedfasen</strong> — her skjer selve kodingen</li>
                <li>Modellér, bygg og test systemet iterativt</li>
                <li>Bruk <strong>TDD og kontinuerlig integrasjon</strong></li>
                <li>Lever inkrementelt med <strong>Scrum-sprinter</strong></li>
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 p-4">
              <p className="font-bold text-orange-700 dark:text-orange-400">4. Overlevering (Transition)</p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>Systemtesting</strong> og brukertesting</li>
                <li>Fikse de siste feilene</li>
                <li><strong>Utrulling</strong> til produksjon</li>
                <li>Opplæring og dokumentasjon</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-3">De 7 disiplinene</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            Disse jobbes med <strong>kontinuerlig gjennom alle fasene</strong>, med varierende
            intensitet. RUP har 9 disipliner — AUP forenkler til 7.
          </p>

          <ComparisonTable
            headers={["Disiplin", "Hva?"]}
            rows={[
              ["1. Modellering", "Forstå problemet og designe løsningen. Smidig modellering (AMDD) — skisser på tavlen, ikke hundrevis av dokumenter."],
              ["2. Implementering", "Selve kodingen — gjøre modellene om til kjørbart system."],
              ["3. Test", "Testing gjennom hele livssyklusen — ikke bare til slutt."],
              ["4. Utrulling (Deployment)", "Sørge for at programvaren leveres. Hyppig levering av fungerende programvare."],
              ["5. Konfigurasjonshåndtering", "Versjonskontroll (Git) — holde styr på kodeendringer."],
              ["6. Prosjektledelse", "Styre risikoer, planlegge iterasjoner, fjerne hindringer."],
              ["7. Miljø (Environment)", "Sikre at teamet har riktige verktøy og retningslinjer."],
            ]}
          />

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">AUP + Scrum (slik det brukes i praksis)</p>
            <p className="text-sm">
              AUP gir det <strong>overordnede rammeverket</strong> med faser og milepæler,
              mens Scrum brukes <strong>innenfor byggefasen</strong> for å organisere sprinter
              og daglig arbeid. AUP svarer på &ldquo;hvilken fase er vi i?&rdquo;, Scrum svarer
              på &ldquo;hva gjør vi denne uken?&rdquo;.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Nøkkelprinsipper</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li><strong>Hold det enkelt</strong> — fokus på mennesker og samarbeid, ikke prosesser</li>
              <li><strong>Active Stakeholder Participation</strong> — kunden kan ikke forsvinne etter kravspek</li>
              <li><strong>Kravhåndtering i en stabel</strong> — krav prioriteres i en liste som kan endres</li>
              <li><strong>Flat ut kostnadskurven</strong> — endringer sent i prosjektet skal ikke være dyre</li>
            </ul>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  10. KANBAN VS SCRUM                                        */}
      {/* ============================================================ */}
      <section id="kanban" className="scroll-mt-32">
        <TheorySummary
          title="Kanban vs Scrum"
          mustKnow={[
            "Kanban bruker IKKE sprinter — kontinuerlig flyt",
            "Kanban har WIP-limits (Work In Progress) — begrenser samtidige oppgaver",
            "Scrum har faste roller, Kanban har ingen obligatoriske roller",
            "Begge bruker en visuell tavle, men med ulikt fokus",
            "Kanban passer for support/vedlikehold, Scrum for produktutvikling",
          ]}
        >
          <p>
            Kanban og Scrum er begge smidige metoder som bruker en visuell tavle, men de har
            <strong> fundamentalt forskjellig tilnærming</strong> til arbeidsflyt.
          </p>

          <ComparisonTable
            headers={["Egenskap", "Scrum", "Kanban"]}
            rows={[
              ["Arbeidssyklus", "Faste sprinter (1–4 uker)", "Kontinuerlig flyt — ingen sprinter"],
              ["Roller", "PO, SM, Utviklingsteam (obligatoriske)", "Ingen obligatoriske roller"],
              ["Planlegging", "Sprint Planning i starten av hver sprint", "Etter behov — pull-basert"],
              ["Begrensning", "Sprint Backlog (fast for sprinten)", "WIP-limits (maks antall oppgaver i en kolonne)"],
              ["Endringer", "Helst ikke underveis i en sprint", "Kan legges til når som helst"],
              ["Leveranse", "Inkrement ved sprintslutt", "Kontinuerlig — levert når ferdig"],
              ["Tavle", "Tømmes og nullstilles etter hver sprint", "Vedvarende — oppgaver flyter gjennom"],
              ["Estimering", "Ja — velocity, story points", "Valgfritt — fokus på lead time og throughput"],
              ["Seremonier", "Sprint Planning, Daily, Review, Retro", "Ingen obligatoriske møter"],
              ["Passer for", "Produktutvikling med definerte sprinter", "Support, vedlikehold, ops-arbeid, kaizen"],
            ]}
          />

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Kanban-tavle med WIP-limits</p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[
                { col: "Backlog", wip: "∞", items: 5 },
                { col: "To Do", wip: "3", items: 3 },
                { col: "Doing", wip: "2", items: 2 },
                { col: "Done", wip: "∞", items: 4 },
              ].map((c) => (
                <div key={c.col} className="text-center">
                  <p className="text-xs font-bold">{c.col}</p>
                  <p className="text-[10px] text-[var(--muted)]">WIP: {c.wip}</p>
                  <div className="mt-1 space-y-1">
                    {Array.from({ length: c.items }).map((_, i) => (
                      <div key={i} className="h-4 rounded bg-blue-200 dark:bg-blue-800/50" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-3">
              <strong>WIP-limit</strong> = maks antall oppgaver som kan være i en kolonne samtidig.
              Forhindrer overbelastning og tvinger teamet til å fullføre arbeid før nytt startes.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 my-4 rounded-lg">
            <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Scrumban — det beste av begge</p>
            <p className="text-sm">
              Mange team bruker en hybrid kalt <strong>Scrumban</strong>: de tar Scrums struktur
              (sprinter, roller) og legger til Kanbans WIP-limits og kontinuerlige flyt-fokus.
              Dette gir fleksibilitet uten å miste rammeverkets fordeler.
            </p>
          </div>
        </TheorySummary>
      </section>

      {/* ============================================================ */}
      {/*  11. EKSAMENSQUIZ                                           */}
      {/* ============================================================ */}
      <section id="quiz" className="scroll-mt-32">
        <h2 className="text-2xl font-bold mt-8 mb-2">Eksamensquiz — Drill deg selv</h2>
        <p className="text-[var(--muted)] text-sm mb-6">
          Alle spørsmålene er fra ekte eksamener (2023 og 2024) eller basert på dem.
          Klikk på det svaret du mener er riktig.
        </p>

        <QuizQuestion
          id={1}
          question="Hva leveres på slutten av hver sprint i Scrum?"
          options={[
            { label: "a", text: "Testdokumenter" },
            { label: "b", text: "Arkitekturbeskrivelse" },
            { label: "c", text: "Et inkrement mot ferdig produkt" },
            { label: "d", text: "Wireframes for neste sprint" },
          ]}
          correctIndex={2}
          explanation="I Scrum leveres et potensielt leverbart inkrement — fungerende, testet programvare. Ikke dokumenter, wireframes eller arkitektur."
          source="Eksamen 2023, oppgave 3.1"
        />

        <QuizQuestion
          id={2}
          question="På hvilket grunnlag bør oppgavene i produktkøen prioriteres?"
          options={[
            { label: "a", text: "Verdien av oppgavene som leveres" },
            { label: "b", text: "Kompleksiteten til oppgavene" },
            { label: "c", text: "Størrelsen på oppgavene" },
            { label: "d", text: "Risikoen knyttet til oppgavene" },
          ]}
          correctIndex={0}
          explanation="Scrum prioriterer etter forretningsmessig verdi — det som gir mest verdi til kunden bygges først. Ikke etter kompleksitet, størrelse eller risiko alene."
          source="Eksamen 2023, oppgave 3.2"
        />

        <QuizQuestion
          id={3}
          question="Har Scrum en dedikert test-rolle?"
          options={[
            { label: "a", text: "Ja, det er Scrum Masterens ansvar" },
            { label: "b", text: "Nei" },
            { label: "c", text: "Ja, testlederen er en del av teamet" },
            { label: "d", text: "Ja, produkteieren tester" },
          ]}
          correctIndex={1}
          explanation="Scrum har kun tre roller: Produkteier, Scrum Master og Utviklingsteam. Testing er hele teamets felles ansvar — ingen dedikert testrolle."
          source="Eksamen 2023, oppgave 3.4"
        />

        <QuizQuestion
          id={4}
          question="Teamet innser at de har for mange oppgaver i sprinten. Hva bør de gjøre?"
          options={[
            { label: "a", text: "Jobbe overtid for å rekke alt" },
            { label: "b", text: "Utvide teamet med flere utviklere" },
            { label: "c", text: "Kutte på kvaliteten for å rekke tidsfristen" },
            { label: "d", text: "Diskutere med kunden for å endre produktkøen" },
          ]}
          correctIndex={3}
          explanation="I Scrum snakker man med Produkteier for å re-prioritere. Man jobber aldri overtid, utvider teamet midt i sprint, eller kutter kvalitet."
          source="Eksamen 2023, oppgave 3.5"
        />

        <QuizQuestion
          id={5}
          question="Når er en sprint ferdig i Scrum?"
          options={[
            { label: "a", text: "Når alle oppgavene er fullført" },
            { label: "b", text: "Når Scrum Master bestemmer det" },
            { label: "c", text: "Når produkteieren godkjenner inkrementet" },
            { label: "d", text: "Når tidsboksen utløper" },
          ]}
          correctIndex={3}
          explanation="Sprinten er ferdig når tidsboksen utløper — uavhengig av om alle oppgavene er fullført. Uferdig arbeid flyttes tilbake til Product Backlog. Det er hele poenget med tidsboksing."
          source="Eksamen 2023, oppgave 3.6"
        />

        <QuizQuestion
          id={6}
          question="Hvilken er IKKE en XP-verdi?"
          options={[
            { label: "a", text: "Enkelhet" },
            { label: "b", text: "Mot" },
            { label: "c", text: "Dokumentasjon" },
            { label: "d", text: "Tilbakemelding" },
            { label: "e", text: "Respekt" },
          ]}
          correctIndex={2}
          explanation="XPs 5 verdier er: Enkelhet, Kommunikasjon, Tilbakemelding, Respekt og Mot. Dokumentasjon er IKKE en av dem."
          source="Eksamen 2023, oppgave 3.7"
        />

        <QuizQuestion
          id={7}
          question="Hva mener vi med et tverrfunksjonelt utviklingslag?"
          options={[
            { label: "a", text: "Hvert teammedlem mestrer alle teknologier" },
            { label: "b", text: "Teamet har separate grupper for frontend og backend" },
            { label: "c", text: "Teamet roterer oppgaver daglig" },
            { label: "d", text: "Teamet har en ekstern testgruppe" },
            { label: "e", text: "Laget bør ha all kompetanse som er nødvendig for å levere det ferdige inkrementet" },
          ]}
          correctIndex={4}
          explanation="Tverrfunksjonelt betyr at teamet SOM HELHET har all kompetanse som trengs. Ikke at hvert enkelt medlem er tverrfunksjonelt."
          source="Eksamen 2023, oppgave 3.8"
        />

        <QuizQuestion
          id={8}
          question="Hva viser et nedbrenningsdiagram (burndown chart)?"
          options={[
            { label: "a", text: "Prosjektets totale fremdrift" },
            { label: "b", text: "Mengde gjenstående arbeid i forhold til tid" },
            { label: "c", text: "Lagets hastighet (velocity)" },
            { label: "d", text: "Antall feil funnet per sprint" },
          ]}
          correctIndex={1}
          explanation="Et burndown chart viser gjenstående arbeid (Y-akse) i forhold til tid (X-akse). Det er IKKE det samme som prosjektfremdrift eller velocity."
          source="Eksamen 2023, oppgave 3.9"
        />

        <QuizQuestion
          id={9}
          question="Hvilken verdi er IKKE blant de fire fra det agile manifestet?"
          options={[
            { label: "a", text: "Individer og samspill fremfor prosesser og verktøy" },
            { label: "b", text: "Fungerende programvare fremfor omfattende dokumentasjon" },
            { label: "c", text: "Strukturert planlegging foran tilpasset planlegging" },
            { label: "d", text: "Å respondere på endring fremfor å følge en plan" },
          ]}
          correctIndex={2}
          explanation="«Strukturert planlegging foran tilpasset planlegging» er det STIKK MOTSATTE av hva det agile manifestet sier. Manifestet verdsetter å reagere på endringer FREMFOR å følge en plan."
          source="Eksamen 2023, oppgave 3.10"
        />

        <QuizQuestion
          id={10}
          question="Hva er parprogrammering?"
          options={[
            { label: "a", text: "To personer jobber sammen for å kode på én datamaskin" },
            { label: "b", text: "To team jobber parallelt på samme prosjekt" },
            { label: "c", text: "En utvikler koder, en annen tester etterpå" },
            { label: "d", text: "To utviklere jobber på hver sin del av koden" },
          ]}
          correctIndex={0}
          explanation="Parprogrammering betyr at to utviklere sitter ved SAMME maskin. En skriver kode (driver), den andre ser over og tenker strategisk (navigator). De bytter roller jevnlig."
          source="Eksamen 2023, oppgave 3.11"
        />

        <QuizQuestion
          id={11}
          question="Hva beskriver CI (Continuous Integration) best?"
          options={[
            { label: "a", text: "En teknikk for kontinuerlig testing og distribusjon av kode" },
            { label: "b", text: "Et verktøy for prosjektplanlegging" },
            { label: "c", text: "En metode for kravinnsamling" },
            { label: "d", text: "En prosess for å evaluere teamets ytelse" },
          ]}
          correctIndex={0}
          explanation="CI er en teknikk der utviklere integrerer kode ofte med automatisk bygging og testing. «Kontinuerlig testing og distribusjon» er det beste alternativet blant de gitte."
          source="Eksamen 2023, oppgave 3.12"
        />

        <QuizQuestion
          id={12}
          question="Hvilket lag får prioritet i DevOps?"
          options={[
            { label: "a", text: "Utviklingslaget" },
            { label: "b", text: "Driftslaget" },
            { label: "c", text: "Både utviklingslag og driftslag" },
            { label: "d", text: "Prosjektledelsen" },
          ]}
          correctIndex={2}
          explanation="Hele poenget med DevOps er at utviklere og drift har LIK prioritet og jobber sammen. Ingen av dem er viktigere enn den andre."
          source="Eksamen 2023, oppgave 3.14"
        />

        <QuizQuestion
          id={13}
          question="Hvilken aktivitet er IKKE tidsbokset i Scrum?"
          options={[
            { label: "a", text: "Sprint Planning" },
            { label: "b", text: "Daily Scrum" },
            { label: "c", text: "Gjennomgang av produktkø (Backlog Refinement)" },
            { label: "d", text: "Sprint Review" },
          ]}
          correctIndex={2}
          explanation="Backlog Refinement (Product Backlog Grooming) er IKKE en formell Scrum-hendelse og er derfor ikke tidsbokset. Alle de andre aktivitetene har faste tidsbokser."
          source="Eksamen 2023, oppgave 3.15"
        />

        <QuizQuestion
          id={14}
          question="Hvilken er IKKE et prinsipp i smidige metoder?"
          options={[
            { label: "a", text: "Lever fungerende programvare hyppig" },
            { label: "b", text: "Ønsk endringer velkommen" },
            { label: "c", text: "Planlegging og design er de mest kritiske fasene" },
            { label: "d", text: "Selvstyrte team gir best resultat" },
          ]}
          correctIndex={2}
          explanation="«Planlegging og design er de mest kritiske fasene» er fossefalls-tenkning. I smidige metoder er FUNGERENDE PROGRAMVARE det primære målet på fremdrift."
          source="Eksamen 2024, oppgave 3b"
        />

        <QuizQuestion
          id={15}
          question="Hva er en Scrum Master?"
          options={[
            { label: "a", text: "Den som leder prosjektet" },
            { label: "b", text: "Den som planlegger sprintene" },
            { label: "c", text: "Den som er ansvarlig for å fjerne hindringer for laget" },
            { label: "d", text: "Den som bestemmer hva som skal bygges" },
          ]}
          correctIndex={2}
          explanation="Scrum Master er en servant leader som fjerner hindringer. Ikke prosjektleder (mer POs domene), ikke den som planlegger sprinter (teamet sammen), og ikke den som bestemmer hva som bygges (det er PO)."
          source="Eksamen 2024, oppgave 3c"
        />
      </section>
    </div>
  );
}
