"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { eksamenPages, dat109BasePaths } from "@/lib/dat109-subpages";

interface Eksamen {
  id: string;
  ar: string;
  arSub: string;
  spill: string;
  badge?: string;
  badgeColor?: string;
  format: string;
  kort: string;
  problemstilling: string;
  losningsstruktur: string[];
  typiskeFeil: string[];
  teoriLenker: { href: string; label: string }[];
  ovingLenker: { href: string; label: string }[];
}

const eksamener: Eksamen[] = [
  {
    id: "v2024",
    ar: "Vår 2024",
    arSub: "siste eksamen",
    spill: "Skyjo",
    badge: "MEST REPRESENTATIV",
    badgeColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    format: "Flervalg (oppg 2+3) + åpen (oppg 1+4)",
    kort: "Kortspill av Alexander Bernhardt for 2-8 spillere. Mål: få minst mulig poeng over flere omganger ved å bytte og snu kort i et 3×4-rutenett.",
    problemstilling:
      "Modellér Skyjo som spillsystem: brukstilfeller, domenemodell og sekvensdiagram for et representativt brukstilfelle (typisk \"Spill tur\" eller \"Bytt kort\").",
    losningsstruktur: [
      "Oppgave 1: 2-3 brukstilfeller, domenemodell med Skyjo/Spiller/Kort/Kortstokk/Omgang/Rutenett, sekvensdiagram for \"Spill tur\"",
      "Oppgave 2: Flervalg om OOP-fundamenter (klasse vs objekt, abstraksjon, innkapsling), SOLID, GRASP, UML-formål",
      "Oppgave 3: Flervalg om Scrum, XP, TDD, CI/CD, kanban, smidig manifest",
      "Oppgave 4: Lerret med Sirkel/Rektangel — implementer finnAreal() og tegn() i Lerret-klassen",
    ],
    typiskeFeil: [
      "Brukstilfellediagram tegnet som flytdiagram med beslutninger og piler",
      "Komposisjon-romber i domenemodellen (skal være vanlig assosiasjon med multiplisitet)",
      "Glemme @Override på interface-implementasjon i oppgave 4",
    ],
    teoriLenker: [
      { href: "/dat109/modellering/eksempler", label: "Skyjo case-study" },
      { href: "/dat109/oop/eksamensoppgaver", label: "Oppg 4-mønster" },
    ],
    ovingLenker: [
      { href: "/dat109/oving/eksamen-sim", label: "Simulér V2024" },
      { href: "/dat109/oving/quiz", label: "V2024 quiz" },
      { href: "/dat109/eksamen/oppgave-1-modellering", label: "Drill oppg 1" },
    ],
  },
  {
    id: "kont2023",
    ar: "Kont 2023",
    arSub: "høst 2023",
    spill: "Ganz Schön Clever",
    format: "Flervalg (oppg 2+3) + åpen (oppg 1+4)",
    kort: "Terningspill («Thats Pretty Clever») av Wolfgang Warsch. Spillere kaster terninger og krysser av i ulike fargede områder med joker og bonusregler.",
    problemstilling:
      "Modellér terningspillet med flere fargeområder, joker-mekanikk og bonusregler. Sekvensdiagram for et representativt trekk.",
    losningsstruktur: [
      "Oppgave 1: Brukstilfeller (Kast terninger, Velg terning, Kryss av rute), domenemodell med Spill/Spiller/Terning/Område/Rute/Bonus, sekvensdiagram for \"Spill tur\"",
      "Oppgave 2: Flervalg om SOLID, GRASP, UML",
      "Oppgave 3: Flervalg om smidige metoder",
      "Oppgave 4: Java fra UML-klassediagram + sekvensdiagram",
    ],
    typiskeFeil: [
      "Glemme bonus-mekanikk i domenemodellen",
      "Sekvensdiagram som ikke matcher brukstilfellebeskrivelsen",
      "Mangler multiplisitet på assosiasjoner",
    ],
    teoriLenker: [
      { href: "/dat109/modellering/eksempler", label: "Ganz Schön Clever case-study" },
      { href: "/dat109/ooa-ood/grasp", label: "GRASP" },
    ],
    ovingLenker: [
      { href: "/dat109/oving/quiz", label: "Drill flervalg" },
      { href: "/dat109/eksamen/oppgave-1-modellering", label: "Drill oppg 1" },
    ],
  },
  {
    id: "v2023",
    ar: "Vår 2023",
    arSub: "vår 2023",
    spill: "Max Mümmelmann",
    badge: "BESTE FASIT",
    badgeColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    format: "Flervalg (oppg 2+3) + åpen (oppg 1+4)",
    kort: "Terningspill med brett der hver rute har en bunke kort. Spillere kaster og samler kort. Atle (professor) har gitt sitt offisielle løsningsforslag.",
    problemstilling:
      "Modellér terningspillet Max Mümmelmann: brukstilfeller for å spille tur, domenemodell og sekvensdiagram. Atle's fasit er den beste å studere.",
    losningsstruktur: [
      "Oppgave 1: Brukstilfeller (Spill tur, Trekk kort, Avslutt omgang), domenemodell med MaxMummelmann/Spiller/Terning/Brett/Rute/Kort/Bunke, sekvensdiagram for \"Spill tur\"",
      "Oppgave 2: Flervalg om SOLID, GRASP, OOP-fundamenter, MVC",
      "Oppgave 3: Flervalg om Scrum, XP, TDD, CI/CD",
      "Oppgave 4: Java fra UML — implementer metode med iterasjon og bruk av assosierte objekter",
    ],
    typiskeFeil: [
      "Domenemodell med metoder (ALDRI lov)",
      "Brukstilfellediagram med tekniske detaljer (skal være på brukerens nivå)",
      "Sekvensdiagram som ikke følger oppskriften i brukstilfellebeskrivelsen",
    ],
    teoriLenker: [
      { href: "/dat109/modellering/eksempler", label: "Max Mümmelmann case-study" },
      { href: "/dat109/modellering/sjekkliste", label: "Modelleringssjekkliste" },
    ],
    ovingLenker: [
      { href: "/dat109/oving/eksamen-sim", label: "Simulér V2023" },
      { href: "/dat109/oving/quiz", label: "V2023 quiz" },
      { href: "/dat109/eksamen/oppgave-1-modellering", label: "Drill oppg 1" },
    ],
  },
  {
    id: "kont2022",
    ar: "Kont 2022",
    arSub: "høst 2022",
    spill: "KIMBO",
    format: "Skriftlig (åpne oppgaver)",
    kort: "Brettspill KIMBO. Andre runde med samme spill — fasit finnes. Kun åpne oppgaver, ingen flervalg.",
    problemstilling:
      "Modellér KIMBO som spillsystem. Alle fire deler er åpne (ingen flervalg) — testet skriving og argumentasjon.",
    losningsstruktur: [
      "Oppgave 1: Brukstilfeller, domenemodell, sekvensdiagram for KIMBO",
      "Oppgave 2: Åpne spørsmål om SOLID/GRASP — analyser et UML-diagram",
      "Oppgave 3: Åpne spørsmål om utviklingsmetoder (Scrum, XP, TDD)",
      "Oppgave 4: Java fra UML",
    ],
    typiskeFeil: [
      "For lite begrunnelse i åpne SOLID-spørsmål — sensor vil se HVORFOR",
      "Glemme å nevne konkrete prinsipper ved navn",
      "Hoppe rett til kode i oppg 4 uten å forstå klassediagrammet",
    ],
    teoriLenker: [
      { href: "/dat109/ooa-ood/solid", label: "SOLID" },
      { href: "/dat109/utviklingsmetode/scrum", label: "Scrum" },
    ],
    ovingLenker: [
      { href: "/dat109/eksamen/oppgave-2-ooa-ood", label: "Drill oppg 2 (åpen)" },
      { href: "/dat109/eksamen/oppgave-3-utviklingsmetode", label: "Drill oppg 3 (åpen)" },
    ],
  },
  {
    id: "v2022",
    ar: "Vår 2022",
    arSub: "vår 2022",
    spill: "KIMBO",
    format: "Skriftlig (åpne oppgaver)",
    kort: "Første runde med KIMBO. Delvis fasit tilgjengelig. Skriftlig stil med åpne formuleringer på alle fire deler.",
    problemstilling:
      "Modellér KIMBO. Studer mot kont 2022 (samme spill, full fasit) for å se forskjellene mellom et delvis og fullstendig løsningsforslag.",
    losningsstruktur: [
      "Oppgave 1: Brukstilfeller, domenemodell, sekvensdiagram for KIMBO",
      "Oppgave 2: Åpen analyse av UML-diagram med SOLID/GRASP",
      "Oppgave 3: Åpne spørsmål om smidige metoder",
      "Oppgave 4: Java-implementasjon fra UML",
    ],
    typiskeFeil: [
      "Modellere uten å lese alle delene av oppgaven først",
      "Bruke teknisk språk i brukstilfellediagram",
      "Manglende vurdering i SOLID-analyse",
    ],
    teoriLenker: [
      { href: "/dat109/ooa-ood/solid", label: "SOLID" },
      { href: "/dat109/modellering/sjekkliste", label: "Modelleringssjekkliste" },
    ],
    ovingLenker: [
      { href: "/dat109/eksamen/oppgave-1-modellering", label: "Drill oppg 1" },
    ],
  },
  {
    id: "v2021",
    ar: "Vår 2021",
    arSub: "vår 2021",
    spill: "Hungry Cats",
    format: "Skriftlig (åpne oppgaver)",
    kort: "Spill der katter samler mat. Skriftlig eksamen — ingen flervalg, alt åpent. Fasit tilgjengelig.",
    problemstilling:
      "Modellér Hungry Cats som spillsystem med katter, mat og brett. Sekvensdiagram for et trekk.",
    losningsstruktur: [
      "Oppgave 1: Brukstilfeller, domenemodell med Spill/Katt/Mat/Brett, sekvensdiagram",
      "Oppgave 2: Åpen analyse — SOLID/GRASP",
      "Oppgave 3: Åpne spørsmål om utviklingsmetoder",
      "Oppgave 4: Java fra UML",
    ],
    typiskeFeil: [
      "Sammenblande Spill og Brett i domenemodellen",
      "Glemme regler/poengsystem i modellen",
      "Manglende konsistens mellom diagrammene",
    ],
    teoriLenker: [
      { href: "/dat109/modellering/domene", label: "Domenemodellering" },
      { href: "/dat109/modellering/sekvens", label: "Sekvensdiagram" },
    ],
    ovingLenker: [
      { href: "/dat109/eksamen/oppgave-1-modellering", label: "Drill oppg 1" },
    ],
  },
  {
    id: "h2020",
    ar: "Høst 2020",
    arSub: "høst 2020",
    spill: "Eksamenssystem",
    badge: "ENESTE IKKE-SPILL",
    badgeColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    format: "Skriftlig (åpne oppgaver)",
    kort: "Reelt forretningssystem: et eksamenssystem hvor lærere lager eksamener, studenter besvarer og sensorer vurderer. Atle's fasit tilgjengelig.",
    problemstilling:
      "Modellér et eksamenssystem (ikke et spill!) — brukstilfeller for ulike roller (Lærer, Student, Sensor), domenemodell for Eksamen/Oppgave/Besvarelse/Vurdering, sekvensdiagram.",
    losningsstruktur: [
      "Oppgave 1: Brukstilfeller for tre roller (Lærer/Student/Sensor), domenemodell med Eksamen/Oppgave/Besvarelse/Karakter, sekvensdiagram for \"Lever besvarelse\"",
      "Oppgave 2: Åpen SOLID/GRASP-analyse",
      "Oppgave 3: Åpne spørsmål om utviklingsmetoder",
      "Oppgave 4: Java fra UML",
    ],
    typiskeFeil: [
      "Behandle systemet som et spill (det er et forretningssystem)",
      "Glemme rolle-skille i brukstilfellediagrammet",
      "Manglende skille mellom Eksamen (mal) og Besvarelse (instans)",
    ],
    teoriLenker: [
      { href: "/dat109/modellering/eksempler", label: "Eksamenssystem case-study" },
      { href: "/dat109/modellering/brukstilfelle", label: "Brukstilfeller" },
    ],
    ovingLenker: [
      { href: "/dat109/eksamen/oppgave-1-modellering", label: "Drill oppg 1" },
    ],
  },
];

const oppgaveCards = [
  {
    href: "/dat109/eksamen/oppgave-1-modellering",
    nr: "Oppgave 1",
    tema: "Modellering",
    weight: "~40%",
    weightColor:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    description:
      "Brukstilfelle + domenemodell + sekvensdiagram for et spill. Tyngste oppgave på eksamen.",
    eksamener: "7 eksamener (2020–2024)",
  },
  {
    href: "/dat109/eksamen/oppgave-2-ooa-ood",
    nr: "Oppgave 2",
    tema: "OOA/OOD — SOLID & GRASP",
    weight: "~20%",
    weightColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description:
      "Flervalg fra 2023+. Før 2023: åpen analyse av UML-diagram med utformingsprinsipper.",
    eksamener: "Flervalg V2023 + V2024 + åpne 2020–2022",
  },
  {
    href: "/dat109/eksamen/oppgave-3-utviklingsmetode",
    nr: "Oppgave 3",
    tema: "Utviklingsmetode",
    weight: "~20%",
    weightColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description:
      "Flervalg om Scrum, XP, TDD, CI/CD, DevOps fra 2023+. Før 2023: åpne spørsmål.",
    eksamener: "Flervalg V2023 + V2024 + åpne 2020–2022",
  },
  {
    href: "/dat109/eksamen/oppgave-4-oop",
    nr: "Oppgave 4",
    tema: "OOP — Java fra UML",
    weight: "~20%",
    weightColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    description:
      "Klassediagram → Java-skall (4a) + sekvensdiagram → metode-implementasjon (4b).",
    eksamener: "6 eksamener med fasit (2020–2024)",
  },
];

export default function EksamenOverviewPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.eksamen} pages={eksamenPages} />

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
          Alle eksamensoppgaver fra 2020–2024 sortert etter oppgavetype, med
          fullstendige løsningsforslag der de finnes.
        </p>
      </div>

      {/* ══════ Eksamensstrategi ══════ */}
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

      {/* ══════ Velg oppgavetype ══════ */}
      <h2 className="text-xl font-bold mt-10 mb-4">Velg oppgavetype</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {oppgaveCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-sysdev-400 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
                  {card.nr}
                </div>
                <h3 className="font-bold text-lg group-hover:text-sysdev-700 dark:group-hover:text-sysdev-400 transition-colors">
                  {card.tema}
                </h3>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${card.weightColor}`}
              >
                {card.weight}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-3">
              {card.description}
            </p>
            <div className="text-xs text-[var(--muted)] flex items-center gap-2">
              <span>{card.eksamener}</span>
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* ══════ Tidligere eksamener (kronologisk) ══════ */}
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-bold">📅 Tidligere eksamener (kronologisk)</h2>
        <span className="text-xs text-[var(--muted)]">Nyeste først</span>
      </div>
      <p className="text-sm text-[var(--muted)] mb-5 max-w-3xl">
        Detaljert oversikt over alle eksamener fra 2020-2024. Klikk «Se detaljer»
        for å se forventet løsningsstruktur, typiske feil og lenker til relevant
        teori og drilling. Prioritér de nyeste — de er mest representative for
        eksamen 2024+.
      </p>
      <div className="grid gap-3 mb-10">
        {eksamener.map((e) => (
          <div
            key={e.id}
            className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4"
          >
            <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-base">
                  {e.ar} — {e.spill}
                </h3>
                {e.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.badgeColor}`}
                  >
                    {e.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-[var(--muted)]">{e.arSub}</span>
            </div>
            <p className="text-xs text-[var(--muted)] mb-2">
              <strong className="text-[var(--foreground)]">Format:</strong>{" "}
              {e.format}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
              {e.kort}
            </p>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-sysdev-600 dark:text-sysdev-400 hover:text-sysdev-700 dark:hover:text-sysdev-300 select-none">
                Se detaljer →
              </summary>
              <div className="mt-3 space-y-3 text-sm border-t border-[var(--card-border)] pt-3">
                <div>
                  <p className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">
                    Problemstilling
                  </p>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">
                    {e.problemstilling}
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">
                    Forventet løsningsstruktur
                  </p>
                  <ul className="list-disc list-inside text-xs space-y-0.5 text-neutral-700 dark:text-neutral-300">
                    {e.losningsstruktur.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-1 text-neutral-900 dark:text-neutral-100">
                    Typiske feil
                  </p>
                  <ul className="list-disc list-inside text-xs space-y-0.5 text-neutral-700 dark:text-neutral-300">
                    {e.typiskeFeil.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {e.teoriLenker.map((l) => (
                    <Link
                      key={l.href + l.label}
                      href={l.href}
                      className="text-xs px-2 py-1 rounded bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors"
                    >
                      📚 {l.label}
                    </Link>
                  ))}
                  {e.ovingLenker.map((l) => (
                    <Link
                      key={l.href + l.label}
                      href={l.href}
                      className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                      🎯 {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
