"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Collapsible section ── */
function Section({
  title,
  badge,
  badgeColor = "sysdev",
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    sysdev:
      "bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base">{title}</span>
            {badge && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[badgeColor] ?? colors.sysdev}`}
              >
                {badge}
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

/* ── Code block ── */
function Code({ code, lang = "java" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative rounded-lg bg-neutral-900 dark:bg-neutral-950 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800/60 border-b border-neutral-700">
        <span className="text-xs font-mono text-neutral-400">{lang}</span>
        <button
          onClick={copy}
          className="text-xs text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? "Kopiert!" : "Kopier"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Show/hide solution ── */
function Solution({
  children,
  label = "Vis løsning",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShow((s) => !s)}
        className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline"
      >
        {show ? "Skjul løsning" : label}
      </button>
      {show && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

/* ── Multiple choice question ── */
function MCQ({
  q,
  options,
  correct,
  explanation,
}: {
  q: string;
  options: string[];
  correct: number;
  explanation?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
      <p className="text-sm font-medium mb-3">{q}</p>
      <div className="space-y-1.5">
        {options.map((opt, i) => (
          <div
            key={i}
            className={`text-sm rounded-lg px-3 py-2 border transition-colors ${
              revealed && i === correct
                ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-medium"
                : "border-transparent bg-neutral-50 dark:bg-neutral-800/50 text-[var(--muted)]"
            }`}
          >
            <span className="font-mono text-xs mr-2">
              {String.fromCharCode(97 + i)})
            </span>
            {opt}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => setRevealed((r) => !r)}
          className="text-xs font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline"
        >
          {revealed ? "Skjul svar" : "Vis svar"}
        </button>
        {revealed && explanation && (
          <span className="text-xs text-[var(--muted)]">{explanation}</span>
        )}
      </div>
    </div>
  );
}

export default function EksamenPage() {
  const [activeTab, setActiveTab] = useState<
    "modellering" | "ooa-ood" | "utviklingsmetode" | "oop"
  >("modellering");

  const tabs = [
    { id: "modellering" as const, label: "Modellering", weight: "~40%" },
    { id: "ooa-ood" as const, label: "OOA/OOD", weight: "~20%" },
    {
      id: "utviklingsmetode" as const,
      label: "Utviklingsmetode",
      weight: "~20%",
    },
    { id: "oop" as const, label: "OOP", weight: "~20%" },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamen</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Eksamensdrilling DAT109
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle eksamensoppgaver fra 2020–2024 sortert etter tema, med
          fullstendige løsningsforslag der de finnes. Nyeste eksamener
          vises først — de er mest representative for hva som kommer.
        </p>
      </div>

      {/* ══════ Oppsummeringsboks ══════ */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mb-8">
        <h2 className="font-bold text-lg mb-4 text-sysdev-700 dark:text-sysdev-400">
          Eksamensstrategi
        </h2>

        {/* Tidsfordeling */}
        <div className="grid sm:grid-cols-4 gap-3 mb-5">
          {[
            { del: "Oppgave 1", tema: "Modellering", tid: "~96 min", pst: "40%" },
            { del: "Oppgave 2", tema: "OOA/OOD", tid: "~48 min", pst: "20%" },
            { del: "Oppgave 3", tema: "Utviklingsmetode", tid: "~48 min", pst: "20%" },
            { del: "Oppgave 4", tema: "OOP/Java", tid: "~48 min", pst: "20%" },
          ].map((d) => (
            <div
              key={d.del}
              className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-sysdev-200 dark:border-sysdev-800/40 p-3 text-center"
            >
              <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
                {d.del} ({d.pst})
              </div>
              <div className="font-bold text-sm">{d.tema}</div>
              <div className="text-xs text-[var(--muted)]">{d.tid}</div>
            </div>
          ))}
        </div>

        {/* Hva som typisk kommer */}
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <h3 className="font-bold text-sm text-sysdev-700 dark:text-sysdev-400 mb-2">
              Hva kommer typisk?
            </h3>
            <ul className="text-xs space-y-1.5 text-[var(--muted)]">
              <li>
                <strong>Oppgave 1:</strong> Alltid et spill. Lag
                brukstilfellemodell + domenemodell + sekvensdiagram.
              </li>
              <li>
                <strong>Oppgave 2:</strong> Flervalg om SOLID/GRASP (fra 2023).
                Før 2023: analyse av UML-diagram.
              </li>
              <li>
                <strong>Oppgave 3:</strong> Flervalg om Scrum/XP/TDD/CI (fra
                2023). Før 2023: åpne spørsmål om metoder.
              </li>
              <li>
                <strong>Oppgave 4:</strong> Klassediagram + sekvensdiagram →
                Java-kode. Alltid 4a (skall) + 4b (implementer metode).
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <h3 className="font-bold text-sm text-sysdev-700 dark:text-sysdev-400 mb-2">
              Prioriteringsstrategi
            </h3>
            <ol className="text-xs space-y-1.5 text-[var(--muted)] list-decimal list-inside">
              <li>
                <strong>Start med oppgave 2 og 3</strong> (flervalg) — rask
                poengfangst, 40% av eksamen, ~20 min totalt.
              </li>
              <li>
                <strong>Deretter oppgave 4</strong> (OOP) — forutsigbar, lær
                mønsteret utenat, ~30 min.
              </li>
              <li>
                <strong>Bruk resten på oppgave 1</strong> (modellering) — størst
                vekting, men mest krevende. Bruk ~2 timer.
              </li>
              <li>
                <strong>Skriv ned antagelser</strong> — gir alltid poeng selv
                om løsningen er litt annerledes.
              </li>
            </ol>
          </div>
        </div>

        {/* Sensors nøkkelregler */}
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3">
          <h3 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2">
            Sensors 5 ufravikelige regler
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {[
              "Brukstilfellemodellen er IKKE et flytdiagram",
              "Domenemodellen inneholder ALDRI metoder",
              "Sekvensdiagrammet MÅ samsvare med brukstilfellebeskrivelsene",
              "Assosiasjoner MÅ ha multiplisitet",
              "Alle tre diagrammer MÅ være konsistente med hverandre",
            ].map((r) => (
              <div key={r} className="flex gap-2">
                <span className="text-red-500 font-bold shrink-0">!</span>
                <span className="text-red-800 dark:text-red-300">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ Tabs ══════ */}
      <div className="flex gap-1 border-b border-[var(--card-border)] mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === t.id
                ? "border-sysdev-500 text-sysdev-700 dark:text-sysdev-400"
                : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {t.label}{" "}
            <span className="text-xs opacity-60">({t.weight})</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════
           1. MODELLERING (~40%)
         ══════════════════════════════════════ */}
      {activeTab === "modellering" && (
        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
            <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
              Hva sensor ser etter i oppgave 1
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-[var(--muted)]">
              <div>
                <strong className="text-blue-700 dark:text-blue-400">
                  a) Brukstilfellemodell
                </strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  <li>Riktige aktører identifisert</li>
                  <li>Brukstilfeller som funksjoner, IKKE flyt</li>
                  <li>Tekstlig beskrivelse av hovedflyt</li>
                  <li>Include/extend brukt riktig</li>
                </ul>
              </div>
              <div>
                <strong className="text-blue-700 dark:text-blue-400">
                  b) Domenemodell
                </strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  <li>Fornuftige konseptuelle klasser</li>
                  <li>Attributter som passer problemet</li>
                  <li>Assosiasjoner med multiplisitet</li>
                  <li>INGEN metoder</li>
                </ul>
              </div>
              <div>
                <strong className="text-blue-700 dark:text-blue-400">
                  c) Sekvensdiagram
                </strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  <li>Samsvarer med brukstilfellebeskrivelse</li>
                  <li>Logisk korrekt meldingsflyt</li>
                  <li>Kun aktive objekter sender meldinger</li>
                  <li>Loop/alt/opt brukt riktig</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2024 */}
          <Section title="Eksamen vår 2024 — Skyjo" badge="Nyeste" badgeColor="red">
            <p className="text-sm text-[var(--muted)]">
              Kortspill for 2–8 spillere. Spilles over flere omganger. Målet er å
              få minst mulig poeng. Spillet avsluttes når en spiller har 100 poeng
              eller mer.
            </p>
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
              <p>
                <strong>Innhold:</strong> 150 kort med poeng (-2 til 12).
                En blokk for å notere poeng per omgang.
              </p>
              <p>
                <strong>Før start:</strong> Hver spiller mottar 12 kort med
                poengsiden ned i 3x4 rutenett. Snur to kort valgfritt.
                Resterende kort i bunke + kastehaugen (øverste kort snudd).
              </p>
              <p>
                <strong>Tur:</strong> Trekk kort fra kastehaugen (åpent) eller
                bunken (skjult). Åpent kort MÅ byttes med ett av dine. Skjult
                kort KAN byttes — ellers legg tilbake og åpne et skjult kort.
                Byttet kort legges åpent på kastehaugen.
              </p>
              <p>
                <strong>Omgang slutter:</strong> Når en spiller har åpnet alle
                kort. Alle andre får én tur til. Spilleren som avsluttet MÅ ha
                lavest poeng — ellers dobles hans poeng. Spillet slutter ved
                100+ poeng.
              </p>
            </div>
            <Solution label="Vis modelleringstips">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
                <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">
                  Foreslått tilnærming
                </h4>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Aktører:</strong> Spiller (primær).
                  </p>
                  <p>
                    <strong>Brukstilfeller:</strong> &quot;Start spill&quot;
                    (inkluderer &quot;Del ut kort&quot;), &quot;Spill tur&quot;,
                    &quot;Avslutt omgang&quot;.
                  </p>
                  <p>
                    <strong>Konseptuelle klasser:</strong> Skyjo, Spiller, Kort,
                    Kortstokk, Kastehaugen, Spillebrett (3x4 rutenett),
                    Poengblokk.
                  </p>
                  <p>
                    <strong>Viktige assosiasjoner:</strong> Skyjo 1—2..8
                    Spiller, Skyjo 1—1 Kortstokk, Skyjo 1—1 Kastehaugen,
                    Spiller 1—1 Spillebrett, Spillebrett 1—12 Kort, Kortstokk
                    1—* Kort.
                  </p>
                  <p>
                    <strong>Attributter:</strong> Kort: verdi, synlig. Spiller:
                    navn, totalPoeng. Skyjo: antallOmganger.
                  </p>
                </div>
              </div>
            </Solution>
          </Section>

          {/* 2023 vår */}
          <Section
            title="Eksamen vår 2023 — Max Mümmelmann"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <p className="text-sm text-[var(--muted)]">
              Kaninspill for 2–4 spillere. Samle en komplett kaninfamilie (6 kort
              med ulike nummer 1–6). 25 kaninkort + 1 kaninbrikke + 1 terning +
              spillebrett med 8 plasser.
            </p>
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
              <p>
                <strong>Oppsett:</strong> Brikke på rødt merke. Kort stokkes
                (uten Max Mümmelmann). Deles ut i 8 bunker à 3 kort. Max
                Mümmelmann legges oppå en bunke.
              </p>
              <p>
                <strong>Tur:</strong> Trill terning → flytt brikke (venstre
                ELLER høyre) → ta øverste kort fra bunken → behold hvis du
                mangler nummeret, ellers legg tilbake i bunnen. 6-er = ny tur.
              </p>
              <p>
                <strong>Max Mümmelmann (hvit kanin):</strong> Ta vilkårlig kort
                fra en annen spiller. Legges tilbake oppå en bunke etterpå.
              </p>
            </div>
            <Solution label="Vis professorens fasit">
              <div className="space-y-4">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Brukstilfellemodell (fasit)
                  </h4>
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Aktører:</strong> Spiller, Admin.
                    </p>
                    <p>
                      <strong>Brukstilfeller:</strong> &quot;Start spill&quot;
                      (inkluderer &quot;Init spill&quot;), &quot;Spill tur&quot;.
                    </p>
                    <p>
                      <strong>Brukstilfellebeskrivelse — &quot;Spill tur&quot;:</strong>
                    </p>
                    <ol className="list-decimal list-inside text-xs space-y-1 ml-2">
                      <li>Trill terning</li>
                      <li>Flytt kaninbrikken det antall plasser terningen viser (venstre eller høyre)</li>
                      <li>Ta øverste kort i bunken</li>
                      <li>Hvis kort mangler: behold kortet</li>
                      <li>Ellers: legg tilbake i bunnen</li>
                      <li>Hvis terningen viser 6: spill ny tur</li>
                    </ol>
                    <p>
                      <strong>Brukstilfellebeskrivelse — &quot;Start spill&quot;:</strong>
                    </p>
                    <ol className="list-decimal list-inside text-xs space-y-1 ml-2">
                      <li>&quot;Init spill&quot; (del ut kort, plasser brikke)</li>
                      <li>For alle spillerne: &quot;Spill tur&quot;</li>
                      <li>Hvis full familie: vinner — avslutt</li>
                      <li>Ellers: fortsett fra 2</li>
                    </ol>
                  </div>
                </div>

                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Domenemodell (fasit)
                  </h4>
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs leading-relaxed">
                    <pre>{`MaxMummelmann 1──1 Brett       MaxMummelmann 1──1 Terning
MaxMummelmann 1──1 Brikke      MaxMummelmann 1──2..4 Spiller(+navn)
Brett 1──8 Rute                Brikke 1──1 Rute (nåværende)
Spiller 0..6──* Kort(+nummer)  Rute *──* Kort`}</pre>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">
                    Merk: Ingen metoder. Konseptet &quot;bunke&quot; kan legges
                    til i utformingsmodellen. Kort har nummer (1–6).
                  </p>
                </div>

                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Sekvensdiagram — &quot;Spill tur&quot; (fasit)
                  </h4>
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs leading-relaxed">
                    <pre>{`:Spiller → :MaxMummelmann
  trill() → :Terning
  verdi = getVerdi() → :Terning
  flyttBrikke(verdi) → :Brikke → flytt(verdi) [via :Brett]
  kort = visKort() → :Brett → :Rute → visØversteKort()
  alt [kort mangler i samlingen]:
    kort = taKort() → :Rute → taØversteKort()
    leggTilKort(kort) → :Spiller
  [else]:
    leggTilbake(kort) → :Rute`}</pre>
                  </div>
                </div>
              </div>
            </Solution>
          </Section>

          {/* Høst 2023 konte */}
          <Section title="Konteeksamen høst 2023 — Ganz Schön Clever">
            <p className="text-sm text-[var(--muted)]">
              Terningspill for 2–4 spillere. 5 terninger med farger (gul, rød,
              grønn, blå) og symboler (ballong, lys, presang, søtsak) + 3
              jokersider. Kryss av symboler på personlig spillebrett.
            </p>
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
              <p>
                <strong>Tur:</strong> Trill alle terninger → velg én → kryss av
                symboler. Kan også ta alle med samme bakgrunnsfarge + jokere.
                Andre spillere velger fra gjenværende terninger.
              </p>
              <p>
                <strong>Avkryssingsregler:</strong> Ballonger: venstre→høyre.
                Lys: venstre→høyre, flere samtidig. Presanger: vilkårlig.
                Søtsaker: krever 2 terninger, alle 3 typer før neste rad.
              </p>
              <p>
                <strong>Slutt:</strong> Når noen har fylt et fargeområde. Flest
                regnbuestjerner vinner.
              </p>
            </div>
            <Solution label="Vis modelleringstips">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
                <p>
                  <strong>Konseptuelle klasser:</strong> Spill, Spiller,
                  Spillebrett, Terning (+farge, +symbol, +erJoker), Rute
                  (+farge, +symbol, +avkrysset), Runde.
                </p>
                <p className="mt-2">
                  <strong>Viktig:</strong> Avkryssingsreglene er komplekse —
                  beskriv dem i brukstilfellebeskrivelsen, IKKE i
                  domenemodellen. Domenemodellen viser bare strukturen.
                </p>
              </div>
            </Solution>
          </Section>

          {/* 2022 */}
          <Section title="Eksamen vår 2022 — KIMBO">
            <p className="text-sm text-[var(--muted)]">
              Brettspill (DAMM 1962) for 2–4 spillere. Brett med rutenett, 2
              terninger, 4 brikker + 6 stengsler per spiller. Mål: få alle 4
              brikker i sentrum først.
            </p>
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
              <p>
                <strong>Tur:</strong> (Valgfritt) flytt et stengsel → trill 2
                terninger → flytt 1 brikke fullt antall ELLER 2 brikker
                fordelt. Kun horisontalt/vertikalt, stengsel/streker = 90°
                sving. Landing på annen brikke = slå ut.
              </p>
              <p>
                <strong>Mål:</strong> Riktig retning + riktig antall øyne for å
                nå sentrum.
              </p>
            </div>
            <Solution label="Vis modelleringstips">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
                <p>
                  <strong>Konseptuelle klasser:</strong> Kimbo, Brett, Rute,
                  Spiller, Brikke, Stengsel, Terning.
                </p>
                <p className="mt-2">
                  <strong>Tricky:</strong> Stengsler plasseres i &quot;hull&quot;
                  mellom ruter — dette kan modelleres som en egen klasse
                  (Plassering) eller som assosiasjon mellom Ruter.
                </p>
              </div>
            </Solution>
          </Section>

          {/* Jan 2023 konte */}
          <Section title="Konteeksamen jan 2023 — Magiske øyne">
            <p className="text-sm text-[var(--muted)]">
              Terningspill med 6 RPG-terninger (4, 6, 8, 10, 12, 20 sider) +
              en vanlig terning. 1–4 spillere, 10 runder. Vanlig terning
              bestemmer hvilken RPG-terning du triller.
            </p>
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm">
              <p>
                <strong>Mekanikk:</strong> Trill vanlig terning → 1=4-sider,
                2=6-sider, ..., 6=20-sider. Poeng = antall øyne på
                RPG-terningen. Høyest poengsum etter 10 runder vinner.
              </p>
            </div>
            <Solution label="Vis modelleringstips">
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
                <p>
                  <strong>Konseptuelle klasser:</strong> Spill, Spiller, Terning
                  (+antallSider), Poengskjema, Runde.
                </p>
                <p className="mt-2">
                  <strong>Tips:</strong> En Terning-klasse med attributt
                  antallSider dekker alle 7 terningene. Poengskjemaet kan
                  modelleres som egen klasse med assosiasjoner til Spiller og
                  Runde.
                </p>
              </div>
            </Solution>
          </Section>

          {/* 2021 */}
          <Section
            title="Eksamen vår 2021 — Hungry Cats"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <p className="text-sm text-[var(--muted)]">
              Kattespill for 2–4 spillere. 5x5 rutenett med matbrikker,
              kaninbrikke per spiller. Samle sett og sekvenser av mat for poeng.
            </p>
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-3">
              <p>
                <strong>Oppsett:</strong> Bland 88 matbrikker. Legg ut 5x5
                rutenett. Plasser kattebrikker på utsiden.
              </p>
              <p>
                <strong>Matbrikker:</strong> Matretter (reker, kylling, ost,
                bacon, pizza, pasta, fisk, is) + spesialbrikker (lokkemat,
                kattesekk/joker, knust tallerken/minuspoeng).
              </p>
              <p>
                <strong>Tur:</strong> Flytt katten 2 felt (horisontalt/vertikalt)
                — skyv matbrikker ut i bevegelsesretning. Samle inn utkastede
                brikker. Fyll på nye brikker.
              </p>
            </div>
            <Solution label="Vis sensors kommentarer">
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 text-sm space-y-2">
                <h4 className="font-bold text-amber-700 dark:text-amber-400">
                  Sensors evaluering (2021)
                </h4>
                <p>
                  <strong>Brukstilfellemodell:</strong> &quot;Forventet en
                  brukstilfellemodell i UML. I dette spillet behøver den ikke
                  inneholde mange brukstilfeller — det er stadig noen som faller
                  i fellen og beskriver flyten ved å benytte mange
                  brukstilfeller som en sekvens av handlinger.&quot;
                </p>
                <p>
                  <strong>Domenemodell:</strong> &quot;Måtte gi fornuftige
                  konseptuelle klasser. Konseptuelle klasser skal ha et godt
                  navn, attributter og assosiasjoner som samsvarer med
                  problembeskrivelse. Det er ingen metoder i
                  domenemodellen.&quot;
                </p>
                <p>
                  <strong>Sekvensdiagram:</strong> &quot;En melding kan kun
                  sendes fra et objekt som er aktivt, og ettersom vi
                  programmerer sekvensielt må metodekallene komme i en sekvens —
                  de kan ikke plutselig dukke opp.&quot;
                </p>
              </div>
            </Solution>
          </Section>

          {/* 2020 */}
          <Section
            title="Eksamen høst 2020 — Eksamenssystem"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <p className="text-sm text-[var(--muted)]">
              Automatisert system for å avvikle eksamen. Lærer lager oppgaver
              og definerer eksamen. Kandidater logger inn, svarer og leverer.
              System regner ut karakter.
            </p>
            <Solution label="Vis professorens fasit">
              <div className="space-y-4">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Aktører og brukstilfeller
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Aktører:</strong> Student, Lærer.
                    </p>
                    <p>
                      <strong>Brukstilfeller:</strong> Lag oppgave, Definer
                      eksamen, Besvar eksamen (inkl. Lever besvarelse), Godkjenn
                      karakter.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Domenemodell
                  </h4>
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 font-mono text-xs leading-relaxed">
                    <pre>{`Lærer 1──* Oppgave ──* Spørsmål ──* Svaralternativ(+riktig: boolean)
Eksamen(+tid, +varighet) ──* Student(+brukernavn, +passord)
Student ──* Besvarelse(+karakter) ──* Svar(+kryss: boolean)`}</pre>
                  </div>
                </div>

                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                    Brukstilfellebeskrivelse — &quot;Lag oppgave&quot;
                  </h4>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Opprett ny oppgave med informasjon</li>
                    <li>Lag spørsmål</li>
                    <li>Lag svaralternativ</li>
                    <li>Oppgi om alternativ er riktig</li>
                    <li>Gjenta 3–4 til alle alternativ er lagd</li>
                    <li>Gjenta fra 2 til alle spørsmål er lagd</li>
                    <li>Lagre oppgave</li>
                  </ol>
                </div>
              </div>
            </Solution>
          </Section>
        </div>
      )}

      {/* ══════════════════════════════════════
           2. OOA/OOD (~20%)
         ══════════════════════════════════════ */}
      {activeTab === "ooa-ood" && (
        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
            <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
              To formater på eksamen
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
              <div>
                <strong>2023–2024: Flervalg</strong> — 9–10 spørsmål, ett riktig
                svar per spørsmål. Dekker SOLID (5) + GRASP (noen) + OOP-grunnlag.
              </div>
              <div>
                <strong>2020–2022: Åpne spørsmål</strong> — Analyse av gitt
                UML-diagram mht. SOLID/GRASP. Forklar prinsipper, vis i modell,
                foreslå forbedring.
              </div>
            </div>
          </div>

          {/* 2024 flervalg */}
          <Section title="Eksamen vår 2024 — Flervalg" badge="Nyeste" badgeColor="red" defaultOpen={true}>
            <div className="space-y-3">
              <MCQ
                q="Du må ofte endre en klasse fordi den gjør for mange forskjellige ting. Hvilket prinsipp brytes?"
                options={[
                  "Open/Closed Principle (OCP)",
                  "Liskov Substitution Principle (LSP)",
                  "Single Responsibility Principle (SRP)",
                  "Dependency Inversion Principle (DIP)",
                ]}
                correct={2}
                explanation="Klassen har mer enn ett ansvar → SRP"
              />
              <MCQ
                q="Hvilket prinsipp bruker du for å unngå sterk avhengighet mellom konkrete klasser og foretrekke abstraksjoner?"
                options={[
                  "Single Responsibility Principle (SRP)",
                  "Open/Closed Principle (OCP)",
                  "Interface Segregation Principle (ISP)",
                  "Dependency Inversion Principle (DIP)",
                ]}
                correct={3}
                explanation="Avheng av abstraksjoner, ikke konkrete klasser → DIP"
              />
              <MCQ
                q="Man skal ikke tvinges til å avhenge av grensesnitt de ikke bruker. Hvilket prinsipp?"
                options={[
                  "Single Responsibility Principle (SRP)",
                  "Liskov Substitution Principle (LSP)",
                  "Interface Segregation Principle (ISP)",
                  "Dependency Inversion Principle (DIP)",
                ]}
                correct={2}
                explanation="For brede grensesnitt → ISP"
              />
              <MCQ
                q="Subklasser bør kunne erstatte deres supertyper uten å forandre programmets korrekthet. Hvilket prinsipp?"
                options={[
                  "Open/Closed Principle (OCP)",
                  "Liskov Substitution Principle (LSP)",
                  "Single Responsibility Principle (SRP)",
                  "Interface Segregation Principle (ISP)",
                ]}
                correct={1}
                explanation="Substituerbarhet → LSP"
              />
              <MCQ
                q="Du lager en ny klasse som håndterer alle detaljer rundt logging. Hvilket prinsipp følger du?"
                options={[
                  "Open/Closed Principle (OCP)",
                  "Single Responsibility Principle (SRP)",
                  "Dependency Inversion Principle (DIP)",
                  "Liskov Substitution Principle (LSP)",
                ]}
                correct={1}
                explanation="Én klasse, ett ansvar = logging → SRP"
              />
              <MCQ
                q="Når du designer moduler og klasser og vil sørge for at de er lett utbyttbare. Hvilket prinsipp?"
                options={[
                  "Single Responsibility Principle (SRP)",
                  "Open/Closed Principle (OCP)",
                  "Liskov Substitution Principle (LSP)",
                  "Dependency Inversion Principle (DIP)",
                ]}
                correct={1}
                explanation="Åpen for utvidelse, lukket for modifikasjon → OCP"
              />
              <MCQ
                q="Dersom en klasse har mange metoder og instansvariabler relatert til mange ulike oppgaver, hvilket GRASP-prinsipp brytes?"
                options={[
                  "Low Coupling",
                  "High Cohesion",
                  "Information Expert",
                  "Creator",
                ]}
                correct={1}
                explanation="For mange ulike ting = lav kohesjon → bryter High Cohesion"
              />
              <MCQ
                q="Hva er formålet med et sekvensdiagram i UML?"
                options={[
                  "Å vise strukturen til et system",
                  "Å vise hvordan objekter samhandler over tid",
                  "Å definere testtilfeller",
                  "Å modellere databaseskjema",
                ]}
                correct={1}
                explanation="Sekvensdiagram viser objekt-interaksjon over tid"
              />
              <MCQ
                q="Hva er forskjellen mellom en klasse og et objekt?"
                options={[
                  "En klasse er en instans av et objekt",
                  "De er det samme",
                  "En klasse beskriver en samling av objekter med like egenskaper, et objekt er en instans",
                  "Et objekt er en abstrakt beskrivelse",
                ]}
                correct={2}
                explanation="Klasse = mal/oppskrift, objekt = konkret instans"
              />
            </div>
          </Section>

          {/* 2023 vår flervalg */}
          <Section
            title="Eksamen vår 2023 — Flervalg"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="space-y-3">
              <MCQ
                q="2.1: Hva er en fordel ved å bruke MVC (Modell Visning Kontroller)?"
                options={[
                  "Modellinformasjon kan bare nås og manipuleres av visningen",
                  "Visningsobjekter bestemmes ved substantivene i brukstilfellebeskrivelsen",
                  "Avhengighetsinversjon er garantert automatisk mellom modellobjekter",
                  "Hver seksjon følger prinsippet om ett enkelt ansvar",
                  "Systemer kan bygges på kortere tid og halve kostnaden",
                ]}
                correct={3}
                explanation="MVC: Modell, Visning og Kontroller har hvert sitt ansvar → SRP"
              />
              <MCQ
                q="2.2: Hva er IKKE et prinsipp fra GRASP?"
                options={[
                  "Skaper (Creator)",
                  "Kontroller (Controller)",
                  "Lav kobling (Low Coupling)",
                  "Motivator",
                ]}
                correct={3}
                explanation="Motivator er ikke et GRASP-prinsipp"
              />
              <MCQ
                q="2.3: Hva er Informasjonsekspert fra GRASP?"
                options={[
                  "Et prinsipp for å tildele ansvar til klasse",
                  "Et prinsipp for å tildele ansvar til arrangement",
                  "Et prinsipp for å tildele ansvar til objekt",
                  "Et prinsipp for å tildele ansvar til beregninger",
                ]}
                correct={2}
                explanation="GRASP handler om objekter, ikke klasser direkte"
              />
              <MCQ
                q="2.4: Hva er en Skaper (Creator) fra GRASP?"
                options={[
                  "Hvem skal lage en ny forekomst av beregninger",
                  "Hvem skal lage en ny forekomst av en klasse",
                  "Hvem skal lage en ny forekomst av en hendelse",
                  "Hvem skal lage en ny forekomst av et objekt",
                ]}
                correct={1}
                explanation="Creator: hvem skal ha ansvaret for å opprette nye klasser"
              />
              <MCQ
                q="2.5: HR-system må utvides med ny feriepenger-type. Originalkoden må endres betydelig. Hvilket SOLID-prinsipp brytes?"
                options={[
                  "Open/Closed (OCP)",
                  "Dependency Inversion (DIP)",
                  "Liskov Substitution (LSP)",
                  "Single Responsibility (SRP)",
                  "Interface Segregation (ISP)",
                ]}
                correct={0}
                explanation="Koden er ikke lukket for modifikasjon → bryter OCP"
              />
              <MCQ
                q="2.6: En utledet klasse overskriver en arvet metode ved å kaste UnsupportedOperationException. Hvilket prinsipp brytes?"
                options={[
                  "Open/Closed (OCP)",
                  "Dependency Inversion (DIP)",
                  "Liskov Substitution (LSP)",
                  "Single Responsibility (SRP)",
                  "Interface Segregation (ISP)",
                ]}
                correct={2}
                explanation="Subklassen kan ikke erstatte superklassen uten å krasje → bryter LSP"
              />
              <MCQ
                q="2.7: Metode med mange mulige utføringsstier er vanskelig å teste. Hvilket prinsipp brytes?"
                options={[
                  "Open/Closed (OCP)",
                  "Dependency Inversion (DIP)",
                  "Liskov Substitution (LSP)",
                  "Single Responsibility (SRP)",
                  "Interface Segregation (ISP)",
                ]}
                correct={3}
                explanation="For mange stier = for mange ansvar → bryter SRP"
              />
              <MCQ
                q="2.8: interface StudentLife { void drink(); void eat(); void move(); void rent(); void block(); void run(); void purchase(); void packForTrip(); } — Hvilket prinsipp brytes?"
                options={[
                  "Open/Closed (OCP)",
                  "Dependency Inversion (DIP)",
                  "Liskov Substitution (LSP)",
                  "Single Responsibility (SRP)",
                  "Interface Segregation (ISP)",
                ]}
                correct={4}
                explanation="Grensesnittet har for mange urelaterte metoder → bryter ISP"
              />
              <MCQ
                q="2.9: Hvilken kode implementerer Driveable-grensesnittet med avhengighetsinversjon?"
                options={[
                  "Driver med konkret Car-felt",
                  "Driver med konkret Truck-felt",
                  "Driver med Driveable-felt (grensesnitt)",
                  "Driver uten felt",
                ]}
                correct={2}
                explanation="Avheng av abstraksjonen Driveable, ikke Car/Truck → DIP"
              />
              <MCQ
                q="2.10: Fullfør Open/Closed — gitt: interface Rollable { Integer roll(); } og class Game { private Rollable r; }"
                options={[
                  "Game implementerer Rollable direkte",
                  "Rollable har konkrete metoder",
                  "Die og TestWith6 implementerer Rollable hver for seg",
                  "Game arver fra Die",
                ]}
                correct={2}
                explanation="Nye implementasjoner av Rollable (Die, TestWith6) uten å endre Game → OCP"
              />
            </div>
          </Section>

          {/* 2021 åpen */}
          <Section
            title="Eksamen vår 2021 — Åpen analyse"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2 mb-3">
              <p>
                <strong>Oppgave:</strong> Gitt et UML-diagram med
                Liste&lt;E&gt;-grensesnitt og implementasjoner
                (TabellListe, KjedetListe, TabellOrdnetListe,
                KjedetOrdnetListe). StudentListe bruker OrdnetListe&lt;E&gt;.
              </p>
              <p>
                Forklar to utformingsprinsipper som er brukt. Kunne løsningen
                blitt forbedret ytterligere?
              </p>
            </div>
            <Solution>
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 text-sm space-y-3">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400">
                  Professorens fasit
                </h4>
                <div className="space-y-2">
                  <p>
                    <strong>SRP / High Cohesion + Low Coupling:</strong> Klassene
                    gjør én og kun én ting.
                  </p>
                  <p>
                    <strong>LSP + DIP / Indirection + Low Coupling:</strong>{" "}
                    Grensesnitt brukt som indireksjoner — implementasjoner kan
                    lett byttes.
                  </p>
                  <p>
                    <strong>ISP:</strong> Grensesnittet er delt opp (Liste vs.
                    OrdnetListe) slik at klasser slipper å implementere metoder
                    som ikke gir mening.
                  </p>
                  <p>
                    <strong>Svakhet:</strong> StudentListen må opprette den
                    konkrete listen selv. Løsning: Factory-mønster eller
                    Dependency Injection.
                  </p>
                </div>
              </div>
            </Solution>
          </Section>

          {/* 2022 åpen */}
          <Section title="Eksamen vår 2022 — Åpen analyse">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2 mb-3">
              <p>
                <strong>Oppgave:</strong> Gitt UML for e-postklient med
                EPostKlient, EPostOppsett, EPostTjeneste (abstrakt),
                HvlEPostTjeneste og TelenorEPostTjeneste. Forklar tre
                utformingsprinsipper fra SOLID og GRASP.
              </p>
            </div>
            <Solution label="Vis foreslått analyse">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
                <p>
                  <strong>DIP:</strong> EPostKlient avhenger av abstraksjonen
                  EPostTjeneste, ikke HvlEPost/TelenorEPost direkte.
                </p>
                <p>
                  <strong>OCP:</strong> Ny e-posttjeneste legges til uten å endre
                  EPostKlient — bare lag ny klasse som implementerer
                  EPostTjeneste.
                </p>
                <p>
                  <strong>SRP / High Cohesion:</strong> Hver klasse har ett
                  ansvar (oppsett, tjeneste, klient).
                </p>
                <p>
                  <strong>GRASP Indirection:</strong> EPostTjeneste fungerer som
                  mellomledd mellom klient og konkrete tjenester.
                </p>
              </div>
            </Solution>
          </Section>

          {/* 2020 åpen */}
          <Section title="Eksamen høst 2020 — Åpen diskusjon">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2">
              <p>
                <strong>a)</strong> Forklar hva som menes med høy kvalitet av
                programkode og hvorfor erfaringer hjelper oss oppnå det.
              </p>
              <p>
                <strong>b)</strong> Trekk frem to mønstre/praksiser/prinsipper
                du brukte (eller burde brukt) i prosjektet. Diskuter fordeler
                og ulemper.
              </p>
            </div>
            <Solution label="Vis tips til besvarelse">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm">
                <p>
                  <strong>Kvalitet:</strong> Lesbarhet, vedlikeholdbarhet,
                  testbarhet, lav kobling, høy kohesjon. Erfaringer fra
                  SOLID/GRASP gir gjenbrukbare løsninger.
                </p>
                <p className="mt-2">
                  <strong>Eksempler:</strong> SRP (skilte ansvar i prosjektet),
                  Creator (hvem oppretter objekter), Low Coupling (løse
                  avhengigheter mellom moduler).
                </p>
              </div>
            </Solution>
          </Section>
        </div>
      )}

      {/* ══════════════════════════════════════
           3. UTVIKLINGSMETODE (~20%)
         ══════════════════════════════════════ */}
      {activeTab === "utviklingsmetode" && (
        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
            <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
              To formater på eksamen
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
              <div>
                <strong>2023–2024: Flervalg</strong> — 9–22 spørsmål om Scrum,
                XP, CI/CD, TDD, DevOps, burndown charts. Mange spørsmål =
                enkle svar.
              </div>
              <div>
                <strong>2020–2022: Åpne spørsmål</strong> — Forklar Scrum, TDD,
                CI. Relatér til eget prosjekt. 3–4 delspørsmål.
              </div>
            </div>
          </div>

          {/* 2024 flervalg */}
          <Section title="Eksamen vår 2024 — Flervalg" badge="Nyeste" badgeColor="red" defaultOpen={true}>
            <div className="space-y-3">
              <MCQ
                q="Hva er hovedmålet med smidige utviklingsmetoder?"
                options={[
                  "Høy kvalitet på produktet",
                  "Minimere risiko",
                  "Forbedre kundetilfredshet",
                  "Alle de nevnte punktene",
                ]}
                correct={3}
              />
              <MCQ
                q="Hvilket av følgende er IKKE et prinsipp i smidige utviklingsmetoder?"
                options={[
                  "Kontinuerlig forbedring",
                  "Samarbeid med kunden",
                  "Planlegging og design er de mest kritiske fasene",
                  "Respons på endring",
                ]}
                correct={2}
                explanation="Smidig: endring > plan. Fossefallsmetoden vektlegger planlegging og design."
              />
              <MCQ
                q="Hva er en Scrum Master?"
                options={[
                  "Prosjektlederen som tildeler oppgaver",
                  "Den som er ansvarlig for å fjerne hindringer for laget",
                  "Kunden som prioriterer produktkøen",
                  "Utvikleren med mest erfaring",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er en sprint i Scrum?"
                options={[
                  "Et langt planleggingsmøte",
                  "En kort utviklingssyklus",
                  "En type testing",
                  "En leveranse til kunden",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er en Kanban-tavle?"
                options={[
                  "En tavle der man visuelt ser arbeid som skal gjøres, pågår og er ferdig",
                  "Et burndown chart",
                  "En produktkø",
                  "Et Gantt-diagram",
                ]}
                correct={0}
              />
              <MCQ
                q="Hvilken metode bruker Burndown Chart?"
                options={[
                  "Fossefallsmetoden",
                  "Scrum",
                  "Kanban",
                  "Lean",
                ]}
                correct={1}
              />
              <MCQ
                q="Hvor mange faser er det i Scrum?"
                options={[
                  "3 faser",
                  "5 faser",
                  "Scrum er smidig og har ikke faser",
                  "Det avhenger av prosjektet",
                ]}
                correct={2}
                explanation="Scrum har sprinter, ikke faser"
              />
              <MCQ
                q="Hvordan måler man fremdrift i en smidig utviklingsprosess?"
                options={[
                  "Gjennom Gantt-diagrammer",
                  "Gjennom å følge opp antall fullførte oppgaver",
                  "Gjennom kodedekningsrapporter",
                  "Gjennom møtereferater",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er et typisk flyt for TDD?"
                options={[
                  "Skrive kode → Skrive test → Kjøre test",
                  "Skrive test → Skrive kode → Kjøre test → Fikse feil",
                  "Planlegge → Kode → Teste → Levere",
                  "Designe → Implementere → Validere",
                ]}
                correct={1}
                explanation="TDD: Red → Green → Refactor"
              />
              <MCQ
                q="Hvordan fungerer et burndown chart?"
                options={[
                  "Viser total arbeidsmengde over prosjektets levetid",
                  "Viser hvor mye arbeid som gjenstår i løpet av en sprint",
                  "Viser antall feil over tid",
                  "Viser teamets hastighet",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er en milestone?"
                options={[
                  "En sprint review",
                  "Et viktig tidspunkt, steg eller begivenhet",
                  "En leveranse",
                  "Et møte med kunden",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er hensikten med en sprint review?"
                options={[
                  "Å planlegge neste sprint",
                  "Å evaluere teamets prosess",
                  "Å vise frem det som er utviklet i sprinten",
                  "Å oppdatere produktkøen",
                ]}
                correct={2}
              />
              <MCQ
                q="Hva er hovedmålet med DevOps?"
                options={[
                  "Øke sikkerheten",
                  "Fremskynde programvareutviklingsprosessen",
                  "Redusere kostnader",
                  "Forbedre dokumentasjon",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er fordelene med Continuous Integration?"
                options={[
                  "Bedre dokumentasjon",
                  "Større fleksibilitet og hurtig utvikling",
                  "Lavere kostnader",
                  "Bedre sikkerhet",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er hovedprinsippet bak parprogrammering i XP?"
                options={[
                  "To utviklere jobber på separate deler",
                  "En utvikler arbeider mens den andre observerer og gir veiledning",
                  "En utvikler koder, den andre tester",
                  "To utviklere gjennomgår kode etterpå",
                ]}
                correct={1}
              />
              <MCQ
                q="Hvordan involveres kundene i en smidig prosess?"
                options={[
                  "Kun i starten og slutten",
                  "Kundene er aktive deltakere gjennom hele prosessen",
                  "Kun gjennom skriftlig kommunikasjon",
                  "Kundene er ikke involvert",
                ]}
                correct={1}
              />
              <MCQ
                q="Hvordan organiseres teamet i smidig utvikling?"
                options={[
                  "Hierarkisk med prosjektleder",
                  "Horisontalt med likeverdige teammedlemmer",
                  "Matrise-organisering",
                  "Avhenger av organisasjonen",
                ]}
                correct={1}
              />
              <MCQ
                q="Hva er hensikten med daglige standup-møter?"
                options={[
                  "Gi statusoppdatering",
                  "Identifisere forbedringsmuligheter",
                  "Avdekke flaskehalser",
                  "Alle de nevnte",
                ]}
                correct={3}
              />
              <MCQ
                q="Hva er hensikten med en produkt-backlog?"
                options={[
                  "Å dokumentere arkitekturen",
                  "Å identifisere og prioritere kravene i prosjektet",
                  "Å planlegge sprinter",
                  "Å logge feil",
                ]}
                correct={1}
              />
              <MCQ
                q="Hvordan håndteres endringer i kravene i Scrum?"
                options={[
                  "Kravene kan endres når som helst",
                  "Kravene kan kun endres mellom sprinter",
                  "Kravene kan ikke endres",
                  "Kravene endres i sprint review",
                ]}
                correct={1}
                explanation="Produktkøen oppdateres mellom sprinter, ikke under en pågående sprint"
              />
            </div>
          </Section>

          {/* 2023 vår flervalg */}
          <Section
            title="Eksamen vår 2023 — Flervalg"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="space-y-3">
              <MCQ
                q="3.1: I Scrum, hva leveres på slutten av hver sprint?"
                options={[
                  "Et dokument med test-tilfeller",
                  "En arkitektonisk utforming",
                  "Ett inkrement mot ferdig produkt",
                  "Trådmodeller for brukergrensesnittet",
                ]}
                correct={2}
              />
              <MCQ
                q="3.2: Hvordan bør oppgavene i produktkøen prioriteres?"
                options={[
                  "Verdien av oppgavene som leveres",
                  "Kompleksiteten",
                  "Størrelsen",
                  "Risikoen",
                  "Scrum-lagets valg",
                ]}
                correct={0}
              />
              <MCQ
                q="3.3: Hva er oppgavene og målet med testing?"
                options={[
                  "Lage test-scenarier",
                  "Finne feil",
                  "Lage automatiserte tester",
                  "Dele testrapporter",
                  "Alle de fire første",
                  "Ingen av de fire første",
                ]}
                correct={4}
              />
              <MCQ
                q="3.4: Har Scrum en test-rolle?"
                options={["Ja", "Nei"]}
                correct={1}
                explanation="Scrum har bare 3 roller: Product Owner, Scrum Master, Developers"
              />
              <MCQ
                q="3.5: Utviklingslaget innser at de har for mange oppgaver for neste sprint. Hva gjøres?"
                options={[
                  "Få flere utviklere",
                  "Søke hjelp fra andre",
                  "Jobbe overtid",
                  "Diskutere med kunden for å endre produktkøen",
                ]}
                correct={3}
              />
              <MCQ
                q="3.6: Når er en Sprint ferdig i Scrum?"
                options={[
                  "Når alle oppgavene er fullført",
                  "Når produkteieren foreslår det",
                  "Når testene er fullført",
                  "Når tidsboksen utløper",
                ]}
                correct={3}
                explanation="Sprinten er time-boxed — den slutter når tiden er ute, uansett"
              />
              <MCQ
                q="3.7: XP har 5 verdier. Hvilken er IKKE en av dem?"
                options={[
                  "Enkelhet",
                  "Mot",
                  "Dokumentasjon",
                  "Respekt",
                  "Tilbakemelding",
                  "Kommunikasjon",
                ]}
                correct={2}
                explanation="XP-verdier: Kommunikasjon, Enkelhet, Tilbakemelding, Mot, Respekt"
              />
              <MCQ
                q="3.8: Hva mener vi med et tverrfunksjonelt utviklingslag?"
                options={[
                  "Hvert medlem er tverrfunksjonelt",
                  "Utviklerne kan lage tester",
                  "Laget samarbeider med andre",
                  "Laget har utviklere og testere",
                  "Laget har all nødvendig kompetanse for å levere",
                ]}
                correct={4}
              />
              <MCQ
                q="3.9: Hva viser et nedbrenningsdiagram?"
                options={[
                  "Prosjektfremdrift",
                  "Mengde gjenstående arbeid i forhold til tid",
                  "Lagets hastighet",
                  "Kapasiteten til lagmedlemmene",
                  "Antall oppgaver i en sprint",
                ]}
                correct={1}
              />
            </div>
          </Section>

          {/* 2021 åpen */}
          <Section
            title="Eksamen vår 2021 — Åpne spørsmål"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="space-y-3">
              <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm">
                <p className="font-medium mb-2">
                  a) Forklar hva test-drevet utvikling (TDD) er og hvor den
                  benyttes i DevOps.
                </p>
                <p className="font-medium mb-2">
                  b) Forklar hvordan kontinuerlig integrasjon (CI) kan
                  kombineres med Scrum.
                </p>
                <p className="font-medium">
                  c) Forklar hvorfor smidige metoder har overtatt.
                </p>
              </div>
              <Solution>
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 text-sm space-y-3">
                  <p>
                    <strong>a) TDD:</strong> Lag testen først basert på
                    kravene, deretter koden som oppfyller testen. I DevOps
                    inngår TDD i Dev-delen (plan→kode→test). Testene kjøres
                    også i Ops som del av CI/CD-pipelinen.
                  </p>
                  <p>
                    <strong>b) CI + Scrum:</strong> I hver sprint kjører CI
                    automatiserte tester ved hver commit. Sprintens inkrement
                    bygges og testes kontinuerlig. Product backlog-oppgaver
                    integreres løpende gjennom sprinten.
                  </p>
                  <p>
                    <strong>c) Smidig overtok fordi:</strong> Krav endres
                    underveis (fossefallsmetoden takler ikke dette). Raskere
                    tilbakemelding fra kunder. Lavere risiko (leverer
                    inkrementelt). Utviklere trives bedre med autonomi.
                  </p>
                </div>
              </Solution>
            </div>
          </Section>

          {/* 2022 åpen */}
          <Section title="Eksamen vår 2022 — Åpne spørsmål">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2">
              <p className="font-medium">
                a) Forklar TDD. Diskuter fordeler og ulemper.
              </p>
              <p className="font-medium">
                b) Brukte du smidig tilnærming i prosjektet? Forklar.
              </p>
              <p className="font-medium">
                c) Forklar hva det smidige manifestet prøver å bidra med.
              </p>
            </div>
            <Solution label="Vis nøkkelpunkter">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
                <p>
                  <strong>TDD fordeler:</strong> Bedre testdekning, kode
                  designes for testbarhet, dokumentasjon via tester.
                </p>
                <p>
                  <strong>TDD ulemper:</strong> Tar lengre tid initialt, ikke
                  alt kan testes automatisk, krever disiplin.
                </p>
                <p>
                  <strong>Smidig manifest (4 verdier):</strong> Individer og
                  interaksjon {`>`} prosesser og verktøy. Fungerende programvare {`>`}
                  {" "}omfattende dokumentasjon. Kundesamarbeid {`>`} kontraktsforhandling.
                  Respons på endring {`>`} følge en plan.
                </p>
              </div>
            </Solution>
          </Section>

          {/* 2020 åpen */}
          <Section title="Eksamen høst 2020 — Åpne spørsmål">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2">
              <p className="font-medium">
                a) Forklar hva det vil si at en utviklingsmetode er smidig.
              </p>
              <p className="font-medium">
                b) Forklar hvorfor Scrum er smidig.
              </p>
              <p className="font-medium">
                c) Forklar hvordan AgileUP og Scrum kan kombineres.
              </p>
              <p className="font-medium">
                d) Forklar hvorfor smidige metoder har overtatt.
              </p>
            </div>
            <Solution label="Vis nøkkelpunkter">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm space-y-2">
                <p>
                  <strong>Smidig =</strong> iterativ, inkrementell, tilpasser
                  seg endring, leverer verdi tidlig og ofte.
                </p>
                <p>
                  <strong>Scrum er smidig fordi:</strong> Korte sprinter
                  (1–4 uker), daglig synkronisering, retrospektiv, tilpasning
                  mellom sprinter.
                </p>
                <p>
                  <strong>AgileUP + Scrum:</strong> AgileUP gir fasene
                  (inception, elaboration, construction, transition) mens Scrum
                  gir rammeverket for hver sprint innenfor fasene. UML fra
                  AgileUP, prosesstyring fra Scrum.
                </p>
              </div>
            </Solution>
          </Section>
        </div>
      )}

      {/* ══════════════════════════════════════
           4. OOP (~20%)
         ══════════════════════════════════════ */}
      {activeTab === "oop" && (
        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
            <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
              Oppgave 4 er alltid identisk format
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
              <div>
                <strong>4a) Java-skall fra klassediagram</strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  <li>Klasser, felt og metodesignaturer</li>
                  <li>Ingen import, konstruktør eller get/set</li>
                  <li>Arv (extends) og grensesnitt (implements)</li>
                </ul>
              </div>
              <div>
                <strong>4b) Implementer metode fra sekvensdiagram</strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside">
                  <li>Pil = metodekall, loop = for, alt = if/else</li>
                  <li>Gjør BARE det diagrammet sier</li>
                  <li>JavaDoc gir plusspoeng (fra 2024)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2024 */}
          <Section
            title="Eksamen vår 2024 — Lerret/Figur"
            badge="Nyeste"
            badgeColor="red"
            defaultOpen={true}
          >
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2 mb-3">
              <p>
                <strong>Oppgave:</strong> Tegneprogram med Lerret, grensesnitt
                Figur, Sirkel, Rektangel og Posisjon. Implementer finnAreal()
                og tegn() i Lerret basert på sekvensdiagram.
              </p>
              <p>
                <strong>Nytt i 2024:</strong> To metoder skal implementeres
                (ikke bare én). JavaDoc gir plusspoeng.
              </p>
            </div>
            <Solution>
              <Code
                code={`// ── Lerret ──
public class Lerret {
    private List<Figur> figurer = new ArrayList<>();
    private Double bredde;
    private Double hoyde;

    /**
     * Beregner totalt areal for alle figurer innenfor lerretet.
     * @return totalt areal
     */
    public Double finnAreal() {
        Double totalt = 0.0;
        for (Figur figur : figurer) {
            Posisjon pos = figur.getPos();
            if (pos.getX() > 0 && pos.getY() > 0) {
                totalt += figur.areal();
            }
        }
        return totalt;
    }

    /**
     * Tegner alle figurer innenfor lerretets grenser.
     */
    public void tegn() {
        for (Figur figur : figurer) {
            Posisjon pos = figur.getPos();
            if (pos.getX() > 0 && pos.getY() > 0) {
                figur.tegn();
            }
        }
    }
}

// ── Figur (grensesnitt) ──
public interface Figur {
    Double areal();
    Posisjon getPos();
    void tegn();
}

// ── Posisjon ──
public class Posisjon {
    private Double x;
    private Double y;
    public Double getX() { return x; }
    public Double getY() { return y; }
}

// ── Sirkel ──
public class Sirkel implements Figur {
    private Double radius;
    private Posisjon pos;

    @Override
    public Double areal() { return Math.PI * radius * radius; }
    @Override
    public Posisjon getPos() { return pos; }
    @Override
    public void tegn() { /* tegner sirkelen */ }
}

// ── Rektangel ──
public class Rektangel implements Figur {
    private Double bredde;
    private Double hoyde;
    private Posisjon pos;

    @Override
    public Double areal() { return bredde * hoyde; }
    @Override
    public Posisjon getPos() { return pos; }
    @Override
    public void tegn() { /* tegner rektangelet */ }
}`}
              />
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
                <strong className="text-amber-700 dark:text-amber-400">
                  Sensor ser etter:
                </strong>{" "}
                @Override på alle interface-metoder, private felt, riktig
                bruk av List/ArrayList, JavaDoc på begge metoder.
              </div>
            </Solution>
          </Section>

          {/* 2023 vår */}
          <Section
            title="Eksamen vår 2023 — Canvas/Figure"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
              <p>
                <strong>Oppgave:</strong> Canvas med List&lt;Figure&gt;,
                interface Figure (area(), getPos()), Position, Circle, Square.
                Implementer totalArea() i Canvas.
              </p>
            </div>
            <Solution label="Vis professorens offisielle fasit">
              <Code
                code={`// ── Canvas (professorens kode) ──
public class Canvas {
    private List<Figure> figures = new ArrayList<>();

    /**
     * Calculates the total area of all figures on the canvas.
     * @return total area
     */
    public Double totalArea() {
        Double totalArea = 0.0;
        for (Figure figure : figures) {
            Position pos = figure.getPos();
            if (pos.getX() > 0 && pos.getY() > 0) {
                totalArea += figure.area();
            }
        }
        return totalArea;
    }
}

// ── Figure (interface) ──
public interface Figure {
    Double area();
    Position getPos();
}

// ── Position ──
public class Position {
    private Double x;
    private Double y;
    public Position(Double x, Double y) { this.x = x; this.y = y; }
    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }
    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }
}

// ── Circle ──
public class Circle implements Figure {
    private Double radius;
    private Position pos;
    public Circle(Double radius, Position pos) {
        this.radius = radius; this.pos = pos;
    }
    @Override
    public Double area() { return Math.PI * radius * radius; }
    @Override
    public Position getPos() { return pos; }
}

// ── Square ──
public class Square implements Figure {
    private Double side;
    private Position pos;
    public Square(Double side, Position pos) {
        this.side = side; this.pos = pos;
    }
    @Override
    public Double area() { return side * side; }
    @Override
    public Position getPos() { return pos; }
}`}
              />
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
                <strong className="text-emerald-700 dark:text-emerald-400">
                  Merknad fra professor:
                </strong>{" "}
                Attributten pos i Figure-grensesnittet flyttes til Circle og
                Square — Java-grensesnitt kan ikke ha attributter. Skriv ned
                antagelsen!
              </div>
            </Solution>
          </Section>

          {/* 2021 */}
          <Section
            title="Eksamen vår 2021 — Skole/Student"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
              <p>
                <strong>Oppgave:</strong> Skole med List&lt;Student&gt; og
                List&lt;Kurs&gt;. Student med List&lt;Karakter&gt;. Implementer
                finnSnitt(kode, år) i Skole.
              </p>
            </div>
            <Solution>
              <Code
                code={`// Klasseskall (fasit):
public class Skole {
    private String navn;
    private List<Student> studenter;
    private List<Kurs> kurs;
    public Double finnSnitt(String kode, Integer år) { }
    public Double oppdaterSnitt(Integer karakter) { }
}

public class Student {
    private Integer studentNr;
    private String navn;
    private List<Karakter> karakterer;
    public Integer finnKarakter(String kode, Integer år) { }
}

public class Karakter {
    private Integer karakter;
    private Integer år;
    public Integer finnKarakter(String kode, Integer år) { }
}

public class Kurs {
    private String kode;
    private String navn;
}

// Implementasjon av finnSnitt (følger sekvensdiagrammet):
public Double finnSnitt(String kode, Integer år) {
    Double snitt = 0.0;
    for (Student student : studenter) {
        Integer karakter = student.finnKarakter(kode, år);
        if (karakter != null) {
            snitt = oppdaterSnitt(karakter);
        }
    }
    return snitt;
}`}
              />
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
                <strong className="text-amber-700 dark:text-amber-400">
                  Sensors kommentar:
                </strong>{" "}
                &quot;Her er jeg kun ute etter skall som samsvarer med
                UML-diagrammene og en implementert metode som gjør nøyaktig
                det sekvensdiagrammet sier. Ikke interessert i feilretting
                og forbedringer.&quot;
              </div>
            </Solution>
          </Section>

          {/* 2022 vår */}
          <Section title="Eksamen vår 2022 — Kunde/Bestilling">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
              <p>
                <strong>Oppgave:</strong> Kunde med Vareutvalg og Bestilling.
                Implementer handle() i Kunde basert på sekvensdiagram.
              </p>
            </div>
            <Solution>
              <Code
                code={`// Klasseskall:
public class Kunde {
    private String navn;
    private Vareutvalg varer;
    private Bestilling bestilling;
    public void handle() { }
    public void kjøp() { }
}

public class Bestilling {
    private List<Vare> varer;
    public void leggTil(Vare vare) { }
    public void fullfør() { }
}

public class Vareutvalg {
    private List<Vare> varer;
    public Vare finnVare() { }
}

public class Vare {
    private String navn;
    private String nr;
    public void reserver() { }
    public void send() { }
}

// handle() — følger sekvensdiagrammet:
public void handle() {
    // Antar: looper til finnVare() returnerer null
    Vare vare = varer.finnVare();
    while (vare != null) {
        bestilling.leggTil(vare);  // leggTil kaller reserver() internt
        vare = varer.finnVare();
    }
}`}
              />
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
                <strong className="text-amber-700 dark:text-amber-400">
                  Tips:
                </strong>{" "}
                Oppgaven sier &quot;du må definere når kunden er ferdig å
                handle&quot; — skriv ned din antagelse! Sensor aksepterer
                ulike tilnærminger.
              </div>
            </Solution>
          </Section>

          {/* Jan 2023 konte */}
          <Section title="Konteeksamen jan 2023 — Handlekurv + Terningspill">
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
              <p>
                <strong>Del 1:</strong> Handlekurv med List&lt;Vare&gt;.
                Implementer betal().
              </p>
              <p>
                <strong>Del 2:</strong> Terningspill med Spiller, Kopp og
                Terning. Implementer spill(), trill() og getSum().
              </p>
            </div>
            <Solution>
              <Code
                code={`// ── Handlekurv ──
public class Handlekurv {
    private List<Vare> varer = new ArrayList<>();

    public void betal() {
        Double sum = 0.0;
        for (Vare vare : varer) {
            sum += vare.getPris();
        }
        return; // antagelse: sum brukes videre
    }
}

// ── Terningspill ──
public class Spiller {
    private String navn;
    private Kopp kopp;

    public void spill() {
        kopp.trill();
        int sum = kopp.getSum();
    }
}

public class Kopp {
    private List<Terning> terninger;

    public void trill() {
        for (Terning terning : terninger) {
            terning.trill();
        }
    }

    public int getSum() {
        int sum = 0;
        for (Terning terning : terninger) {
            sum += terning.getVerdi();
        }
        return sum;
    }
}

public class Terning {
    private int verdi;
    public void trill() { verdi = (int)(Math.random() * 6) + 1; }
    public int getVerdi() { return verdi; }
}`}
              />
            </Solution>
          </Section>

          {/* 2020 */}
          <Section
            title="Eksamen høst 2020 — Kortspill"
            badge="Med fasit"
            badgeColor="emerald"
          >
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
              <p>
                <strong>Oppgave:</strong> Kortspill med Kortstokk og Spillere.
                Del ut 2 kort til hver spiller. Implementer spill().
              </p>
            </div>
            <Solution>
              <Code
                code={`// Klasseskall:
public class Kortspill {
    private List<Spiller> spillere = new ArrayList<>();
    private Kortstokk stokk;
    public void leggTiSpiller(String navn) { }
    public void spill() { }
}

public class Kortstokk {
    private List<Kort> kort;
    public void stokk() { }
    public Kort hentNesteKort() { }
}

public class Kort {
    private Integer id;
    private String farge;
    private Integer verdi;
}

public class Spiller {
    private String navn;
    private List<Kort> kort;
    public void delUtKort(Kort kort) { }
    public Integer getPoeng() { }
}

// spill() — følger sekvensdiagrammet:
public void spill() {
    for (int i = 0; i < 2; i++) {
        Kort kort = stokk.hentNesteKort();
        for (Spiller spiller : spillere) {
            spiller.delUtKort(kort);
        }
    }
    for (Spiller spiller : spillere) {
        spiller.getPoeng();
    }
}`}
              />
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
                <strong className="text-amber-700 dark:text-amber-400">
                  NB 2020-format:
                </strong>{" "}
                Denne eksamen krevde konstruktører (ulikt 2021+). OOP var
                oppgave 5 (15%), ikke oppgave 4 (20%).
              </div>
            </Solution>
          </Section>
        </div>
      )}
    </div>
  );
}
