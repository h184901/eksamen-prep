"use client";

import Link from "next/link";
import { useState } from "react";

const subPages = [
  {
    href: "/dat109/ooa-ood/solid",
    title: "SOLID-prinsippene",
    count: "5 prinsipper",
    description:
      "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
    color: "emerald",
  },
  {
    href: "/dat109/ooa-ood/grasp",
    title: "GRASP-mønstrene",
    count: "9 mønstre",
    description:
      "Information Expert, Creator, Controller, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations",
    color: "teal",
  },
  {
    href: "/dat109/ooa-ood/eksamen",
    title: "Eksamensdrilling",
    count: "17+ spørsmål",
    description:
      "Alle flervalgsoppgaver fra 2023 og 2024 med forklaringer og mental sjekkliste",
    color: "amber",
  },
];

export default function OoaOodPage() {
  const [showDiff, setShowDiff] = useState(false);

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
        <span className="text-[var(--foreground)]">OOA og OOD</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-3 inline-block">
          ~20% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">OOA og OOD</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          SOLID-prinsippene og GRASP-mønstrene — grunnpilarene i god
          objektorientert design. Fra 2023 er dette flervalg på eksamen, men du
          må forstå prinsippene godt nok til å gjenkjenne dem i kode og
          UML-diagrammer.
        </p>
      </div>

      {/* Den store sammenhengen */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mb-8">
        <h2 className="font-bold text-lg mb-3 text-sysdev-700 dark:text-sysdev-400">
          Den store sammenhengen
        </h2>
        <p className="text-sm mb-4">
          Hele faget handler om en prosess der du går fra en{" "}
          <strong>problembeskrivelse</strong> til <strong>kjørbar kode</strong>{" "}
          gjennom tre steg:
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
              Steg 1
            </div>
            <div className="font-bold text-sm mb-1">OOA — Analyse</div>
            <p className="text-xs text-[var(--muted)]">
              Forstå <em>hva</em> systemet skal gjøre. Finn brukstilfeller og
              identifiser objekter i domenet. Ingen kode ennå.
            </p>
          </div>
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
              Steg 2
            </div>
            <div className="font-bold text-sm mb-1">OOD — Design</div>
            <p className="text-xs text-[var(--muted)]">
              Bestem <em>hvordan</em> objektene samarbeider. Lag
              sekvensdiagrammer og klassediagrammer med metoder.
            </p>
          </div>
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-sysdev-200 dark:border-sysdev-800/40 p-4">
            <div className="text-xs font-bold text-sysdev-600 dark:text-sysdev-400 mb-1">
              Steg 3
            </div>
            <div className="font-bold text-sm mb-1">OOP — Programmering</div>
            <p className="text-xs text-[var(--muted)]">
              Skriv Java-kode basert på diagrammene. Direkte oversettelse fra
              design til kode.
            </p>
          </div>
        </div>

        <div className="text-sm text-[var(--muted)]">
          <strong className="text-[var(--foreground)]">GRASP</strong> hjelper
          deg med <em>hvem som skal ha ansvaret</em> for hva (viktig i steg 2).{" "}
          <strong className="text-[var(--foreground)]">SOLID</strong> hjelper
          deg med <em>strukturen på koden</em> — hvordan klasser og grensesnitt
          bør organiseres (viktig i steg 2 og 3).
        </div>
      </div>

      {/* GRASP vs SOLID forskjell */}
      <div className="mb-8">
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="flex items-center gap-2 text-sm font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline mb-3"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showDiff ? "rotate-90" : ""}`}
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
          Hva er forskjellen på GRASP og SOLID?
        </button>
        {showDiff && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 p-4">
                <h3 className="font-bold text-sm text-teal-700 dark:text-teal-400 mb-2">
                  GRASP
                </h3>
                <ul className="text-sm space-y-1 text-[var(--muted)]">
                  <li>
                    Fra Craig Larmans bok &quot;Applying UML and Patterns&quot;
                  </li>
                  <li>
                    Handler om <strong>hvem</strong> som skal ha ansvaret
                  </li>
                  <li>Brukes når du lager sekvensdiagrammer</li>
                  <li>Fokus: plassere ansvar på riktig sted</li>
                  <li>9 prinsipper/mønstre</li>
                </ul>
              </div>
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4">
                <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2">
                  SOLID
                </h3>
                <ul className="text-sm space-y-1 text-[var(--muted)]">
                  <li>Fra Robert C. Martin (&quot;Uncle Bob&quot;)</li>
                  <li>
                    Handler om <strong>strukturen</strong> på koden
                  </li>
                  <li>Brukes når du designer klasser og grensesnitt</li>
                  <li>Fokus: fleksibel, vedlikeholdbar kode</li>
                  <li>5 prinsipper</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Det er mye overlapp! For eksempel er GRASP &quot;High
              Cohesion&quot; nesten identisk med SOLID &quot;Single
              Responsibility&quot;. Professorens forelesninger bruker begge
              gjennom hele kurset, og du må gjenkjenne begge på eksamen.
            </p>
          </div>
        )}
      </div>

      {/* Navigation cards */}
      <h2 className="text-xl font-bold mb-4">Velg tema</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group rounded-xl border-2 border-sysdev-500/30 hover:border-sysdev-500/60 bg-[var(--card)] p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-600 dark:text-sysdev-400 flex items-center justify-center text-lg font-bold">
                {page.color === "emerald"
                  ? "S"
                  : page.color === "teal"
                    ? "G"
                    : "?"}
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400">
                {page.count}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-sysdev-600 dark:group-hover:text-sysdev-400 transition-colors">
              {page.title}
            </h3>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      {/* Mental sjekkliste */}
      <div className="rounded-xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-6">
        <h2 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">
          Hurtigreferanse: Mental sjekkliste for eksamen
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Bruk denne sjekklisten når du leser flervalgsoppgaver på eksamen:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              trigger: "Klasse som gjør for mange ting?",
              answer: "SRP / High Cohesion",
            },
            {
              trigger: "Kode må endres for ny funksjonalitet?",
              answer: "Open/Closed (OCP)",
            },
            {
              trigger: "Subklasse kaster UnsupportedOperationException?",
              answer: "Liskov Substitution (LSP)",
            },
            {
              trigger: "Grensesnitt med mange urelaterte metoder?",
              answer: "Interface Segregation (ISP)",
            },
            {
              trigger: "Klasse avhenger av konkrete klasser?",
              answer: "Dependency Inversion (DIP)",
            },
            {
              trigger: "Mange if/else for å sjekke typer?",
              answer: "Polymorphism (GRASP)",
            },
            {
              trigger: "Hvem skal ha denne metoden?",
              answer: "Information Expert (GRASP)",
            },
            {
              trigger: "Hvem skal opprette dette objektet?",
              answer: "Creator (GRASP)",
            },
          ].map((item) => (
            <div
              key={item.trigger}
              className="flex items-start gap-2 rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-3"
            >
              <span className="text-amber-500 mt-0.5 shrink-0">&#x2192;</span>
              <div>
                <p className="text-sm font-medium">{item.trigger}</p>
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
