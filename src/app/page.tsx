import Link from "next/link";
import { getSession, isAkseptertUser } from "@/lib/auth";
import TutorTriggerButton from "@/components/TutorTriggerButton";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ─────────────────────────────────────────────────────────────────────────
// Quick actions — small horizontal rail right under the hero.
// Hand-curated, only routes that exist. No fake counts.
// ─────────────────────────────────────────────────────────────────────────

interface QuickAction {
  label: string;
  hint: string;
  href: string;
  icon: string;
  color: "network" | "physics" | "sysdev" | "dat107" | "neutral";
}

const quickActions: QuickAction[] = [
  {
    label: "Start DAT110 quiz",
    hint: "Flervalg med feedback",
    href: "/dat110/oving/quiz",
    icon: "⚡",
    color: "network",
  },
  {
    label: "DAT110 eksamener",
    hint: "6 eksamener med løsninger",
    href: "/dat110/eksamen",
    icon: "📋",
    color: "network",
  },
  {
    label: "DAT109 quiz",
    hint: "Systemutvikling-drill",
    href: "/dat109/oving/quiz",
    icon: "🎯",
    color: "sysdev",
  },
];

const quickActionColor: Record<QuickAction["color"], string> = {
  network:
    "hover:border-network-400/70 hover:bg-network-50/40 dark:hover:bg-network-950/30",
  physics:
    "hover:border-physics-400/70 hover:bg-physics-50/40 dark:hover:bg-physics-950/30",
  sysdev:
    "hover:border-sysdev-400/70 hover:bg-sysdev-50/40 dark:hover:bg-sysdev-950/30",
  dat107:
    "hover:border-dat107-400/70 hover:bg-dat107-50/40 dark:hover:bg-dat107-950/30",
  neutral:
    "hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/40",
};

// ─────────────────────────────────────────────────────────────────────────
// Subjects — each with a list of real, existing highlight links.
// No progress/counts that we don't have (per user constraint).
// ─────────────────────────────────────────────────────────────────────────

interface SubjectHighlight {
  label: string;
  href: string;
}

interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  color: "physics" | "network" | "sysdev" | "dat107" | "akseptert";
  href: string;
  status?: string;
  badge?: string;
  highlights: SubjectHighlight[];
}

const baseSubjects: Subject[] = [
  {
    id: "dat110",
    code: "DAT110",
    name: "Nettverksteknologi",
    description:
      "Distribuerte systemer, Chord DHT, delay og protokoller. Eksamensrettet.",
    color: "network",
    href: "/dat110",
    highlights: [
      { label: "Quiz", href: "/dat110/oving/quiz" },
      { label: "Eksamener", href: "/dat110/eksamen" },
      { label: "Begreper", href: "/dat110/begreper" },
      { label: "Gjengangere", href: "/dat110/eksamen/gjengangere" },
    ],
  },
  {
    id: "dat109",
    code: "DAT109",
    name: "Systemutvikling",
    description:
      "Modellering, OOA/OOD, smidig utvikling og Java fra UML-diagrammer.",
    color: "sysdev",
    href: "/dat109",
    highlights: [
      { label: "Quiz", href: "/dat109/oving/quiz" },
      { label: "Eksamensim", href: "/dat109/oving/eksamen-sim" },
      { label: "Flashcards", href: "/dat109/oving/flashcards" },
      { label: "Matching", href: "/dat109/oving/matching" },
    ],
  },
  {
    id: "ing164",
    code: "ING164",
    name: "Fysikk",
    description:
      "Mekanikk, elektrisitet og magnetisme — formelark og kapittelgjennomgang.",
    color: "physics",
    href: "/ing164",
    highlights: [
      { label: "Eksamen", href: "/ing164/eksamen" },
      { label: "Formelark", href: "/ing164/formelark" },
    ],
  },
  {
    id: "dat107",
    code: "DAT107",
    name: "Databaser",
    description:
      "SQL, JPA/ORM, NoSQL, modellering og normalisering.",
    color: "dat107",
    href: "/dat107",
    // Ingen chips: eneste relevante under-rute er /dat107 selv — duplikat av kort-tittelen.
    highlights: [],
  },
];

const akseptertSubject: Subject = {
  id: "akseptert",
  code: "Akseptert",
  name: "SaaS Masterclass",
  description:
    "Next.js, React, TypeScript og Tailwind fra scratch — bygging av Akseptert.no.",
  color: "akseptert",
  href: "/akseptert",
  badge: "Masterclass",
  // Ingen chips: under-rutene er ikke indeksert — kort-tittel er hoved-inngangen.
  highlights: [],
};

// Color tokens applied to subject cards.
// Tint-band-strip på toppen + svak gradient i body — gir hvert fag en
// rolig "tab"-følelse uten å bli aggressiv.
const subjectColor: Record<
  Subject["color"],
  {
    band: string;
    border: string;
    title: string;
    chip: string;
    chipHover: string;
  }
> = {
  network: {
    band: "bg-network-500",
    border: "border-network-200 dark:border-network-900",
    title: "text-network-700 dark:text-network-300",
    chip:
      "bg-network-50 dark:bg-network-950/40 text-network-700 dark:text-network-300 border-network-200 dark:border-network-900",
    chipHover:
      "hover:bg-network-100 dark:hover:bg-network-900/60 hover:border-network-300 dark:hover:border-network-700",
  },
  sysdev: {
    band: "bg-sysdev-500",
    border: "border-sysdev-200 dark:border-sysdev-900",
    title: "text-sysdev-700 dark:text-sysdev-300",
    chip:
      "bg-sysdev-50 dark:bg-sysdev-950/40 text-sysdev-700 dark:text-sysdev-300 border-sysdev-200 dark:border-sysdev-900",
    chipHover:
      "hover:bg-sysdev-100 dark:hover:bg-sysdev-900/60 hover:border-sysdev-300 dark:hover:border-sysdev-700",
  },
  physics: {
    band: "bg-physics-500",
    border: "border-physics-200 dark:border-physics-900",
    title: "text-physics-700 dark:text-physics-300",
    chip:
      "bg-physics-50 dark:bg-physics-950/40 text-physics-700 dark:text-physics-300 border-physics-200 dark:border-physics-900",
    chipHover:
      "hover:bg-physics-100 dark:hover:bg-physics-900/60 hover:border-physics-300 dark:hover:border-physics-700",
  },
  dat107: {
    band: "bg-dat107-500",
    border: "border-dat107-200 dark:border-dat107-900",
    title: "text-dat107-700 dark:text-dat107-300",
    chip:
      "bg-dat107-50 dark:bg-dat107-950/40 text-dat107-700 dark:text-dat107-300 border-dat107-200 dark:border-dat107-900",
    chipHover:
      "hover:bg-dat107-100 dark:hover:bg-dat107-900/60 hover:border-dat107-300 dark:hover:border-dat107-700",
  },
  akseptert: {
    band: "bg-akseptert-500",
    border: "border-akseptert-300 dark:border-akseptert-800",
    title: "text-akseptert-700 dark:text-akseptert-300",
    chip:
      "bg-akseptert-50 dark:bg-akseptert-950/40 text-akseptert-700 dark:text-akseptert-300 border-akseptert-200 dark:border-akseptert-900",
    chipHover:
      "hover:bg-akseptert-100 dark:hover:bg-akseptert-900/60 hover:border-akseptert-300 dark:hover:border-akseptert-700",
  },
};

// ─────────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const session = await getSession();
  const subjects: Subject[] = isAkseptertUser(session)
    ? [...baseSubjects, akseptertSubject]
    : baseSubjects;
  // xl: 4-kol for 4 fag, 5-kol når Akseptert er med — unngår orphaned 5. kort.
  const xlGridCols = subjects.length === 5 ? "xl:grid-cols-5" : "xl:grid-cols-4";

  return (
    <div>
      {/* ───── Hero ───── */}
      <section className="pt-6 pb-10 sm:pt-10 sm:pb-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
          Semester 4 · HVL Bergen
        </p>
        <h1 className="text-[clamp(1.875rem,4.5vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-50 mb-4 text-balance">
          Eksamensøving for fagene dine
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
          Interaktive forklaringer, ekte tidligere eksamener og målrettet drill —
          alt på ett sted. DAT110, DAT109, ING164 og DAT107.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dat110/oving/quiz"
            className="inline-flex items-center gap-2 rounded-lg bg-network-600 hover:bg-network-700 dark:bg-network-500 dark:hover:bg-network-400 text-white font-semibold text-sm px-5 py-2.5 transition-colors shadow-sm"
          >
            Start DAT110 quiz
            <span aria-hidden>→</span>
          </Link>
          <TutorTriggerButton className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] hover:border-neutral-400 dark:hover:border-neutral-600 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm px-4 py-2.5 transition-colors">
            <span aria-hidden>🤖</span>
            Spør tutor
          </TutorTriggerButton>
        </div>
      </section>

      {/* ───── Quick actions rail ───── */}
      <section
        className="mb-12 sm:mb-16"
        aria-labelledby="quick-actions-heading"
      >
        <h2
          id="quick-actions-heading"
          className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3"
        >
          Hva vil du gjøre nå?
        </h2>
        {/* 1-col under lg (640–1023 har lite tekst-bredde → 3-col trunkerte labels). */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 transition-colors ${quickActionColor[a.color]}`}
            >
              <span className="text-xl flex-shrink-0" aria-hidden>
                {a.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-sm text-neutral-900 dark:text-neutral-50 truncate">
                  {a.label}
                </span>
                <span className="block text-xs text-[var(--muted)] truncate">
                  {a.hint}
                </span>
              </span>
              <span
                aria-hidden
                className="text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── Subjects ───── */}
      <section className="mb-16" aria-labelledby="subjects-heading">
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <h2
            id="subjects-heading"
            className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight"
          >
            Fagene dine
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] hidden sm:block">
            Klikk for full oversikt — bruk pillene for direkte tilgang.
          </p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${xlGridCols} gap-4 sm:gap-5`}>
          {subjects.map((subject) => {
            const tone = subjectColor[subject.color];
            return (
              <div
                key={subject.id}
                className={`relative flex flex-col rounded-xl border bg-[var(--card)] ${tone.border} overflow-hidden transition-shadow hover:shadow-md`}
              >
                <div className={`h-1 ${tone.band}`} aria-hidden />
                <Link
                  href={subject.href}
                  className={`flex-1 flex flex-col px-5 pt-5 ${subject.highlights.length > 0 ? "pb-3" : "pb-5"}`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                      {subject.code}
                    </span>
                    {subject.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-akseptert-100 dark:bg-akseptert-900/40 text-akseptert-700 dark:text-akseptert-200">
                        {subject.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-lg font-bold mb-1.5 leading-tight tracking-tight text-balance ${tone.title}`}
                  >
                    {subject.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                    {subject.description}
                  </p>
                </Link>
                {subject.highlights.length > 0 && (
                  <div className="px-5 pb-4 pt-1 flex flex-wrap gap-1.5">
                    {subject.highlights.map((h) => (
                      <Link
                        key={h.href}
                        href={h.href}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${tone.chip} ${tone.chipHover}`}
                      >
                        {h.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── Footer stripe ───── */}
      <footer className="border-t border-[var(--card-border)] pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--muted)]">
          <p>
            Bygget for HVL Bergen-eksamen · Lokalt lagret framgang · Ingen tracking
          </p>
          <p className="flex items-center gap-3">
            <Link href="/dat110" className="hover:text-[var(--foreground)] transition-colors">
              DAT110
            </Link>
            <span aria-hidden>·</span>
            <Link href="/dat109" className="hover:text-[var(--foreground)] transition-colors">
              DAT109
            </Link>
            <span aria-hidden>·</span>
            <Link href="/ing164" className="hover:text-[var(--foreground)] transition-colors">
              ING164
            </Link>
            <span aria-hidden>·</span>
            <Link href="/dat107" className="hover:text-[var(--foreground)] transition-colors">
              DAT107
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
