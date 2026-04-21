"use client";

import Link from "next/link";
import { useState } from "react";

type SectionKey = "intro" | "kode" | "avansert" | "oving";

interface Section {
  key: SectionKey;
  title: string;
  subtitle: string;
  badge: string;
  placeholder: string;
}

const sections: Section[] = [
  {
    key: "intro",
    title: "Intro til Stacken",
    subtitle: "React, TypeScript og Tailwind fra scratch",
    badge: "Fundament",
    placeholder:
      "Her bygger vi mental modell av hele stacken: hvorfor React renderer som den gjør, hva TypeScript gir deg utover JavaScript, og hvordan Tailwind utility-klasser fungerer i praksis. Innhold kommer i fase 2.",
  },
  {
    key: "kode",
    title: "Slik fungerer Akseptert.no",
    subtitle: "Gjennomgang av vår egen kode",
    badge: "Kodebase",
    placeholder:
      "Vi åpner opp repoet for Akseptert.no og går gjennom de viktigste filene: routing, komponenthierarki, state, og hvordan sidene er satt sammen. Innhold kommer i fase 2.",
  },
  {
    key: "avansert",
    title: "Avansert Magi",
    subtitle: "Database, Webhooks og Server Actions",
    badge: "Fullstack",
    placeholder:
      "Postgres via Vercel Marketplace, webhook-mønstre (Stripe, Slack), og Server Actions som erstatter klassiske API-ruter. Innhold kommer i fase 2.",
  },
  {
    key: "oving",
    title: "Interaktiv Øving",
    subtitle: "Flashcards, quiz og kodeutfordringer",
    badge: "Praksis",
    placeholder:
      "Øvingsmodul med interaktive widgets for å forankre begrepene fra de tre teori-seksjonene. Skjelett klart — widgets fylles inn i fase 2.",
  },
];

const practiceWidgets = [
  {
    title: "Flashcards",
    description:
      "Nøkkelbegreper fra React, TypeScript, Tailwind, Next.js og database-laget.",
    icon: "🃏",
  },
  {
    title: "Quiz",
    description:
      "Flervalgsspørsmål som tester forståelse av rendring, hooks, typer og server actions.",
    icon: "❓",
  },
  {
    title: "Kodeutfordring",
    description:
      "Småoppgaver der du skriver kode selv — fra «lag en komponent» til «koble til databasen».",
    icon: "⚡",
  },
];

export default function AkseptertPage() {
  const [openKey, setOpenKey] = useState<SectionKey | null>(null);

  function toggle(key: SectionKey) {
    setOpenKey((current) => (current === key ? null : key));
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Akseptert — SaaS Masterclass</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold">Akseptert — SaaS Masterclass</h1>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200">
            Masterclass
          </span>
        </div>
        <p className="text-[var(--muted)] max-w-2xl">
          En praktisk dypdykk i hvordan Akseptert.no er bygget. Stacken er
          Next.js, React, TypeScript og Tailwind med Postgres, webhooks og
          Server Actions i bunn. Målet er at du skal kunne lese, forstå og utvide
          kodebasen selv.
        </p>
      </div>

      {/* Intro-card (valgfritt verktøykort for fremtiden) */}
      <div className="rounded-xl border-2 border-akseptert-400/40 bg-gradient-to-br from-akseptert-500/10 to-akseptert-700/5 dark:from-akseptert-900/30 dark:to-akseptert-950/20 p-6 mb-10">
        <h2 className="font-bold text-lg mb-1 text-akseptert-700 dark:text-akseptert-200">
          Fase 1 — Skjelett
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Strukturen står klar. Hver seksjon nedenfor er en placeholder som
          fylles med teori, kodegjennomgang og interaktive eksempler i fase 2.
        </p>
      </div>

      {/* Accordion sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const open = openKey === section.key;
          return (
            <section
              key={section.key}
              className="rounded-2xl border border-akseptert-400/30 bg-[var(--card)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(section.key)}
                aria-expanded={open}
                className="w-full flex items-center gap-4 p-5 text-left transition-colors hover:bg-akseptert-50/60 dark:hover:bg-akseptert-950/30"
              >
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 text-akseptert-500 ${
                    open ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold">{section.title}</h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200">
                      {section.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] line-clamp-1">
                    {section.subtitle}
                  </p>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-5 pt-1">
                  <p className="text-sm text-[var(--muted)] mb-4">
                    {section.placeholder}
                  </p>

                  {section.key === "oving" ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {practiceWidgets.map((widget) => (
                        <div
                          key={widget.title}
                          className="rounded-xl border-2 border-dashed border-akseptert-400/40 bg-akseptert-50/40 dark:bg-akseptert-950/20 p-5"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{widget.icon}</span>
                            <h3 className="font-bold text-akseptert-700 dark:text-akseptert-200">
                              {widget.title}
                            </h3>
                          </div>
                          <p className="text-sm text-[var(--muted)]">
                            {widget.description}
                          </p>
                          <p className="text-[11px] mt-3 font-medium text-akseptert-600 dark:text-akseptert-300">
                            Kommer i fase 2
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-akseptert-400/40 bg-akseptert-50/40 dark:bg-akseptert-950/20 p-8 text-center">
                      <p className="text-sm text-[var(--muted)]">
                        Innhold kommer i fase 2.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
