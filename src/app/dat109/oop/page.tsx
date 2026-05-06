"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { oopPages, dat109BasePaths } from "@/lib/dat109-subpages";

const subpages = [
  {
    href: "/dat109/oop/uml-til-java",
    title: "UML → Java",
    desc: "Synligheter (+ - # ~), abstrakte klasser, interface, enum, toString/equals/hashCode.",
    badge: "Notasjon",
    badgeColor:
      "bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400",
  },
  {
    href: "/dat109/oop/assosiasjoner",
    title: "Assosiasjoner",
    desc: "Multiplisiteter til Java-felt: 1-til-1, 1-til-mange, komposisjon, arv, mange-til-mange og collection-typer.",
    badge: "Felt",
    badgeColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    href: "/dat109/oop/sekvens-til-metode",
    title: "Sekvens → metode",
    desc: "Hvordan piler, loop-, alt- og opt-bokser oversettes til Java-metodekropp. Komplett spillRunde()-eksempel.",
    badge: "Oppgave 4b",
    badgeColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    href: "/dat109/oop/eksamensoppgaver",
    title: "Eksamensoppgaver",
    desc: "Alle løsninger fra 2020–2024: Canvas, Lerret, Kortspill, Skole, Butikk, Terningspill, Handlekurv.",
    badge: "2020–2024",
    badgeColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    href: "/dat109/oop/oppskrift",
    title: "Oppskrift og maler",
    desc: "Steg-for-steg-oppskrift, JavaDoc-mal, fire gjentakende mønstre og hurtigreferanse til 4a/4b.",
    badge: "Mal",
    badgeColor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
];

export default function OopOverviewPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.oop} pages={oopPages} />

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
        <span className="text-[var(--foreground)]">OOP — Java fra UML</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-3 inline-block">
          ~20% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">OOP — Java fra UML</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Oppgave 4 på eksamen gir deg et klassediagram og et sekvensdiagram.
          Du skal (a) skrive Java-skall for alle klassene, og (b) implementere
          én eller to metoder slik de samsvarer med sekvensdiagrammet. Samme
          mønster hvert eneste år.
        </p>
      </div>

      {/* Eksamensmønster — alltid synlig */}
      <div className="rounded-xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-6 mb-8">
        <h2 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">
          Slik ser Oppgave 4 alltid ut
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-amber-200 dark:border-amber-800/40 p-4">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
              Oppgave 4a
            </div>
            <p className="text-sm font-medium mb-1">Skriv Java-skall</p>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Klasse-deklarasjoner (class / interface / abstract class)</li>
              <li>Felt (attributter) med riktig synlighet og type</li>
              <li>Metodesignaturer — UTEN implementasjon (bare {})</li>
              <li>Arv (extends) og grensesnitt (implements)</li>
              <li>Ikke nødvendig med import, pakke, get/set, konstruktør</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-amber-200 dark:border-amber-800/40 p-4">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
              Oppgave 4b
            </div>
            <p className="text-sm font-medium mb-1">Implementer én metode</p>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Les sekvensdiagrammet nøye — det er oppskriften</li>
              <li>Hver pil i diagrammet = ett metodekall i koden</li>
              <li>Loop-boks = for/while-løkke</li>
              <li>Alt-boks = if/else</li>
              <li>Gjør BARE det diagrammet sier — ikke mer, ikke mindre</li>
            </ul>
          </div>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 text-sm">
          <strong className="text-red-700 dark:text-red-400">
            Vanligste feil:
          </strong>{" "}
          <span className="text-[var(--muted)]">
            Implementere metoder som ikke spørres om (4a) • Glemme @Override på
            implementerte metoder • Feil synlighet (+/- i UML) • Glemme
            JavaDoc (gir minuspoeng)
          </span>
        </div>
      </div>

      {/* Kort til undersider */}
      <h2 className="text-xl font-bold mb-4">Underemner</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subpages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-sysdev-400 dark:hover:border-sysdev-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-bold text-base group-hover:text-sysdev-600 dark:group-hover:text-sysdev-400 transition-colors">
                {p.title}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${p.badgeColor}`}
              >
                {p.badge}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)]">{p.desc}</p>
            <div className="mt-3 text-xs font-medium text-sysdev-600 dark:text-sysdev-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Åpne →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
