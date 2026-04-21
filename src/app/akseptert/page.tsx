"use client";

import Link from "next/link";
import { useState } from "react";

type SectionKey = "intro" | "kode" | "avansert" | "oving";

interface LinkedCard {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

interface LinkedSection {
  key: SectionKey;
  title: string;
  subtitle: string;
  badge: string;
  intro: string;
  cards: LinkedCard[];
}

interface PlaceholderSection {
  key: SectionKey;
  title: string;
  subtitle: string;
  badge: string;
  placeholder: string;
}

const introCards: LinkedCard[] = [
  {
    href: "/akseptert/intro/react",
    label: "1 · React",
    title: "React Basics",
    description:
      "JSX, komponenter, state og effekter. Bygd fra bunnen av med live-eksempler.",
    tag: "useState · useEffect",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/akseptert/intro/typescript",
    label: "2 · TypeScript",
    title: "TypeScript Basics",
    description:
      "Fra Java og JavaScript til TypeScript. Interaktivt type-sjekk-verktøy og interface-matcher.",
    tag: "types · interfaces",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" d="M8 10.5h4M10 10.5V16M14.5 14.5c.5.8 1.3 1.5 2.5 1.5 1.4 0 2-.8 2-1.6 0-.8-.6-1.3-1.8-1.7-1.2-.4-1.7-.8-1.7-1.5 0-.7.6-1.2 1.5-1.2.8 0 1.3.4 1.7 1" />
      </svg>
    ),
  },
  {
    href: "/akseptert/intro/tailwind",
    label: "3 · Tailwind",
    title: "Tailwind CSS",
    description:
      "Utility-first CSS. Interaktiv playground der du klikker klasser og ser boksen forandre seg.",
    tag: "playground · responsive",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c2-4 5-5 8-4s4 3 6 2c-2 4-5 5-8 4s-4-3-6-2zM2 8c2-4 5-5 8-4s4 3 6 2c-2 4-5 5-8 4S4 7 2 8z" />
      </svg>
    ),
  },
  {
    href: "/akseptert/intro/komponenter",
    label: "4 · Komponenter",
    title: "Component Thinking",
    description:
      "import/export, props, komposisjon og children. Bygg en komponent stein for stein.",
    tag: "props · children",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

const kodeCards: LinkedCard[] = [
  {
    href: "/akseptert/kode/app-router",
    label: "1 · Routing",
    title: "App Router & Layouts",
    description:
      "Server vs Client Components forklart. Linje-for-linje gjennomgang av Akseptert sin ekte layout.tsx.",
    tag: "use client · layout.tsx",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18M7 3v18M12 3v18M17 3v18" />
      </svg>
    ),
  },
  {
    href: "/akseptert/kode/ai-generation",
    label: "2 · AI-kall",
    title: "AI Generation",
    description:
      "Hvordan Akseptert snakker med OpenAI. Ekte generate.ts forklart — async/await, FormData, system-prompter.",
    tag: "Server Actions · OpenAI",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    href: "/akseptert/kode/data-flow",
    label: "3 · Data flyt",
    title: "Data Flow",
    description:
      "Interaktivt flytdiagram: klikk «Generer» → Server Action → OpenAI → Supabase → UI. Se det animert.",
    tag: "flow · animasjon",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h10M7 18h10M5 8v8M19 8v8" />
      </svg>
    ),
  },
  {
    href: "/akseptert/kode/stack",
    label: "4 · Stacken",
    title: "Hele Stacken",
    description:
      "Clerk, Supabase, Stripe, Resend, Fiken, OpenAI og Vercel — hvordan hver tjeneste henger sammen.",
    tag: "integrasjoner",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M4 7.5l16 9M20 7.5l-16 9" />
      </svg>
    ),
  },
];

const linkedSections: LinkedSection[] = [
  {
    key: "intro",
    title: "Intro til Stacken",
    subtitle: "React, TypeScript og Tailwind fra scratch — 4 sub-sider med live-widgets",
    badge: "Fundament",
    intro: "Velg et tema å dykke inn i. Ta dem gjerne i rekkefølge — komponenter bygger på React og TypeScript.",
    cards: introCards,
  },
  {
    key: "kode",
    title: "Slik fungerer Akseptert.no",
    subtitle: "Ekte kode fra Akseptert sin kodebase — lest med fs, forklart linje for linje",
    badge: "Kodebase",
    intro: "Vi leser filer rett fra handverker-ai-repoet med Node sin fs-modul og forklarer dem steg for steg. Du får se layout.tsx, generate.ts og hele dataflyten fra klikk til UI-oppdatering.",
    cards: kodeCards,
  },
];

const placeholderSections: PlaceholderSection[] = [
  {
    key: "avansert",
    title: "Avansert Magi",
    subtitle: "Database, Webhooks og Server Actions",
    badge: "Fullstack",
    placeholder:
      "Postgres via Vercel Marketplace, webhook-mønstre (Stripe, Slack), og Server Actions som erstatter klassiske API-ruter. Innhold kommer i fase 3.",
  },
  {
    key: "oving",
    title: "Interaktiv Øving",
    subtitle: "Flashcards, quiz og kodeutfordringer",
    badge: "Praksis",
    placeholder:
      "Øvingsmodul med interaktive widgets for å forankre begrepene fra teori-seksjonene. Skjelett klart — widgets fylles inn senere.",
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
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
  );
}

export default function AkseptertPage() {
  const [openKey, setOpenKey] = useState<SectionKey | null>("kode");

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

      {/* Intro phase card */}
      <div className="rounded-xl border-2 border-akseptert-400/40 bg-gradient-to-br from-akseptert-500/10 to-akseptert-700/5 dark:from-akseptert-900/30 dark:to-akseptert-950/20 p-6 mb-10">
        <h2 className="font-bold text-lg mb-1 text-akseptert-700 dark:text-akseptert-200">
          To løp — teori og Akseptert.no
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Ny på stacken? Begynn i <strong>Intro til Stacken</strong>. Vil du
          forstå hvordan Akseptert faktisk er satt sammen? Hopp rett inn i{" "}
          <strong>Slik fungerer Akseptert.no</strong> — vi leser ekte filer fra
          repoet og forklarer linje for linje.
        </p>
      </div>

      <div className="space-y-4">
        {/* Linked-card accordions: Intro, Kode */}
        {linkedSections.map((section) => {
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
                <ChevronIcon open={open} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="text-lg font-bold">{section.title}</h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-akseptert-100 text-akseptert-700 dark:bg-akseptert-900/40 dark:text-akseptert-200">
                      {section.badge}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      Klart
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
                    {section.intro}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {section.cards.map((card) => (
                      <Link
                        key={card.href}
                        href={card.href}
                        className="group rounded-xl border-2 border-akseptert-400/30 hover:border-akseptert-500/70 bg-[var(--card)] p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-11 h-11 rounded-xl bg-akseptert-500/10 border border-akseptert-400/30 flex items-center justify-center text-akseptert-600 dark:text-akseptert-300">
                            {card.icon}
                          </div>
                          <span className="text-[11px] font-mono text-akseptert-600 dark:text-akseptert-300 mt-1">
                            {card.tag}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-akseptert-600 dark:text-akseptert-300 mb-1">
                          {card.label}
                        </p>
                        <h3 className="font-bold mb-1 group-hover:text-akseptert-600 dark:group-hover:text-akseptert-300 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-[var(--muted)]">{card.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Placeholder accordions: Avansert, Øving */}
        {placeholderSections.map((section) => {
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
                <ChevronIcon open={open} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
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
                            Kommer senere
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-akseptert-400/40 bg-akseptert-50/40 dark:bg-akseptert-950/20 p-8 text-center">
                      <p className="text-sm text-[var(--muted)]">
                        Innhold kommer senere.
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
