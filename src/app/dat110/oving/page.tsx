import Link from "next/link";
import { getAllQuizQuestions } from "@/lib/dat110-vault/loader";
import { sourceKindOf } from "@/lib/dat110-quiz-types";

export const metadata = {
  title: "Øving og drilling — DAT110",
};

interface ModusCard {
  href: string;
  emoji: string;
  title: string;
  description: string;
  // Tailwind classes (statiske strings — Tailwind JIT-vennlig).
  borderActive: string;
  bgActive: string;
  iconBg: string;
  status: "active" | "P1" | "P2";
}

const MODUSER: ModusCard[] = [
  {
    href: "/dat110/oving/quiz",
    emoji: "🎯",
    title: "Flervalg-quiz",
    description:
      "Velg temaer og kilder. Forklaringer + 'Les mer'-lenker til konseptsider etter hvert svar. Multiple-answer-støtte.",
    borderActive: "border-network-400 hover:border-network-500",
    bgActive:
      "bg-network-50/50 dark:bg-network-950/20 hover:bg-network-50 dark:hover:bg-network-950/30",
    iconBg:
      "bg-network-100 dark:bg-network-900/40 text-network-700 dark:text-network-300",
    status: "active",
  },
  {
    href: "#",
    emoji: "⏱️",
    title: "Eksamenssimulering",
    description:
      "Ta en hel tidligere eksamen under tidspress med automatisk innlevering. Inkluderer fasit og selvvurdering.",
    borderActive: "border-rose-400",
    bgActive: "bg-rose-50/50 dark:bg-rose-950/20",
    iconBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    status: "P1",
  },
  {
    href: "#",
    emoji: "🃏",
    title: "Flashcards",
    description:
      "Begrep på forsiden, forklaring på baksiden. Spaced repetition for definisjoner og formler.",
    borderActive: "border-amber-400",
    bgActive: "bg-amber-50/50 dark:bg-amber-950/20",
    iconBg:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    status: "P1",
  },
  {
    href: "#",
    emoji: "🔗",
    title: "Matching-øvelse",
    description:
      "Koble begreper til riktige definisjoner. Nyttig for par som vector clocks vs Lamport eller primary-based vs quorum.",
    borderActive: "border-violet-400",
    bgActive: "bg-violet-50/50 dark:bg-violet-950/20",
    iconBg:
      "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    status: "P2",
  },
  {
    href: "#",
    emoji: "🧮",
    title: "Regneøving",
    description:
      "Tren på delay-beregning, FT-konstruksjon, subnetting og vektor-klokker med fri-tekst-svar mot fasit.",
    borderActive: "border-blue-400",
    bgActive: "bg-blue-50/50 dark:bg-blue-950/20",
    iconBg:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    status: "P2",
  },
  {
    href: "#",
    emoji: "🔥",
    title: "Eksamensdrill",
    description:
      "Kuratert sett med gjengangere på tvers av 2022–2025. Fokus på det som ofte testes.",
    borderActive: "border-orange-400",
    bgActive: "bg-orange-50/50 dark:bg-orange-950/20",
    iconBg:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    status: "P2",
  },
];

const STUDIEPLAN = [
  {
    label: "Dag 1",
    plan: "Chord DHT — repetér ring, successor-regel, finger-tabell. Quiz alle Chord-spørsmål.",
  },
  {
    label: "Dag 2",
    plan: "Delay/throughput + IP/subnetting. Regn 5–10 delay-eksempler og 3–5 CIDR-blokker for hånd.",
  },
  {
    label: "Dag 3",
    plan: "Overlay multicast + RPC. Drill failure-semantikk og ALM vs IP-multicast.",
  },
  {
    label: "Dag 4",
    plan: "Vector clocks + consistency/replikering. Skriv ut Lamport vs vector-eksempler for hånd.",
  },
  {
    label: "Dag 5",
    plan: "Ta V2024 eksamen med åpne løsninger på siden — selvvurdér når du blir stuck.",
  },
  {
    label: "Dag 6 (kvelden før)",
    plan: "Drill bare feil fra tidligere økter. Flashcards (P1) når de kommer. Ikke prøv å lære noe nytt.",
  },
];

const TIPS = [
  "Test deg selv før du leser fasit — aktiv læring slår passiv repetisjon.",
  "Når du bommer på en quiz, klikk på 'Les mer'-lenken — det er der konseptet sitter.",
  "Drill gjengangere: Chord-FT, delay-formler, CIDR-blokker dukker opp år etter år.",
  "Regn delay/DHT/vector clocks for hånd minst én gang per uke — ikke bare lese.",
  "Tidligere eksamener er hovedkilden — Canvas-quizene og genererte spørsmål er supplement.",
];

function statusBadge(status: ModusCard["status"]) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-network-100 dark:bg-network-900/40 text-network-700 dark:text-network-300">
        Aktiv
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
      Kommer i {status}
    </span>
  );
}

export default function DAT110OvingHubPage() {
  const allQuestions = getAllQuizQuestions();
  const totalCount = allQuestions.length;

  const bySource = { exam: 0, canvas: 0, generated: 0 } as Record<
    "exam" | "canvas" | "generated",
    number
  >;
  for (const q of allQuestions) bySource[sourceKindOf(q.source)] += 1;

  const activeSources: string[] = [];
  if (bySource.exam > 0) activeSources.push("Eksamen");
  if (bySource.generated > 0) activeSources.push("genererte");
  const canvasNote =
    bySource.canvas === 0 ? "Canvas-quizer kommer i P1" : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Brødsmuler"
        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">Øving</span>
      </nav>

      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">
          Øving og drilling — DAT110
        </h1>
        <p className="text-neutral-700 dark:text-neutral-200 max-w-3xl">
          Aktiv læring slår passiv lesing. Tre planlagte kilder:{" "}
          <strong>tidligere DAT110-eksamener</strong>, <strong>Canvas-quizer</strong>{" "}
          (kommer i P1) og <strong>genererte spørsmål</strong> basert på pensum.
          Alle moduser har feedback og «Les mer»-lenker til konseptsidene.
        </p>
      </header>

      {/* Velg modus */}
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        Velg modus
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {MODUSER.map((m) => {
          const isActive = m.status === "active";
          const cardClasses = isActive
            ? `group block rounded-xl border-2 p-5 transition-all hover:shadow-md hover:-translate-y-0.5 ${m.borderActive} ${m.bgActive}`
            : "block rounded-xl border-2 p-5 border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 opacity-70 cursor-not-allowed";

          const inner = (
            <>
              <div className="flex items-start justify-between mb-3 gap-2">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                    isActive
                      ? m.iconBg
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                  }`}
                  aria-hidden
                >
                  {m.emoji}
                </div>
                {statusBadge(m.status)}
              </div>
              <h3
                className={`font-bold text-lg mb-1 ${
                  isActive
                    ? "text-neutral-900 dark:text-neutral-50 group-hover:underline"
                    : "text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {m.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                {m.description}
              </p>

              {isActive && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                    {totalCount} spørsmål
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    ·
                  </span>
                  <span className="text-xs text-neutral-700 dark:text-neutral-200">
                    Kilder: {activeSources.join(" + ")}
                  </span>
                  {canvasNote && (
                    <>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        ·
                      </span>
                      <span className="text-xs italic text-neutral-500 dark:text-neutral-400">
                        {canvasNote}
                      </span>
                    </>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-network-700 dark:text-network-300">
                    Start quiz →
                  </span>
                </div>
              )}
            </>
          );

          if (!isActive) {
            return (
              <div
                key={m.title}
                aria-disabled
                className={cardClasses}
              >
                {inner}
              </div>
            );
          }
          return (
            <Link key={m.title} href={m.href} className={cardClasses}>
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Anbefalt studieplan */}
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
        Anbefalt studieplan (6 dager til eksamen)
      </h2>
      <div className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/50 p-5 mb-8">
        <div className="space-y-3">
          {STUDIEPLAN.map((d, i) => (
            <div
              key={i}
              className="flex items-start gap-4 pb-3 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0 last:pb-0"
            >
              <span className="flex-shrink-0 w-32 text-sm font-bold text-network-700 dark:text-network-300">
                {d.label}
              </span>
              <span className="text-sm text-neutral-800 dark:text-neutral-100">
                {d.plan}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
          💡 Slik bruker du øvingsmodulene best
        </h3>
        <ul className="text-sm space-y-1.5 list-disc list-inside text-neutral-800 dark:text-neutral-100">
          {TIPS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
