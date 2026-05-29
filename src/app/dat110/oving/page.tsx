import Link from "next/link";
import { getAllQuizQuestions, getExamSummaries } from "@/lib/dat110-vault/loader";
import { sourceKindOf } from "@/lib/dat110-quiz-types";
import flashcardsData from "@/data/dat110-vault/flashcards.json";
import matchingData from "@/data/dat110-vault/matching.json";
import calculationData from "@/data/dat110-vault/calculation-drills.json";
import Dat110PageHeader from "@/components/dat110/Dat110PageHeader";
import Dat110Section from "@/components/dat110/Dat110Section";
import Dat110Badge from "@/components/dat110/Dat110Badge";

export const metadata = {
  title: "Øving og drilling — DAT110",
};

interface ModusCard {
  href: string;
  emoji: string;
  title: string;
  description: string;
  count: string;
  // Tailwind classes (statiske strings — Tailwind JIT-vennlig).
  band: string;
  iconBg: string;
  accentText: string;
  status: "active" | "P1" | "P2";
}

function buildModuser(
  quizCount: number,
  flashcardCount: number,
  matchingCount: number,
  calculationCount: number,
  examCount: number,
): ModusCard[] {
  return [
    {
      href: "/dat110/oving/quiz",
      emoji: "🎯",
      title: "Flervalg-quiz",
      description:
        "Velg temaer og kilder. Forklaringer + 'Les mer'-lenker til konseptsider etter hvert svar. Multiple-answer-støtte.",
      count: `${quizCount} spørsmål`,
      band: "bg-network-500",
      iconBg:
        "bg-network-100 dark:bg-network-900/40 text-network-700 dark:text-network-300",
      accentText: "text-network-700 dark:text-network-300",
      status: "active",
    },
    {
      href: "/dat110/oving/eksamen-sim",
      emoji: "⏱️",
      title: "Eksamenssimulering",
      description:
        "Velg en eksamen, ta 4 timer uten fasit, og kryss-sjekk svarene etterpå. Studie-modus med løsninger skjult.",
      count: `${examCount} eksamener`,
      band: "bg-rose-500",
      iconBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
      accentText: "text-rose-700 dark:text-rose-300",
      status: "active",
    },
    {
      href: "/dat110/oving/flashcards",
      emoji: "🃏",
      title: "Flashcards",
      description:
        "Begrep på forsiden, definisjon på baksiden. Filter etter tema. Flip for å vise svaret.",
      count: `${flashcardCount} kort`,
      band: "bg-amber-500",
      iconBg:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
      accentText: "text-amber-700 dark:text-amber-300",
      status: "active",
    },
    {
      href: "/dat110/oving/matching",
      emoji: "🔗",
      title: "Matching-øvelse",
      description:
        "Drill forvekslingsbare begreper: Lamport vs vector, TCP vs UDP, primary-backup vs quorum, Chord successor vs finger.",
      count: `${matchingCount} par`,
      band: "bg-violet-500",
      iconBg:
        "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
      accentText: "text-violet-700 dark:text-violet-300",
      status: "active",
    },
    {
      href: "/dat110/oving/beregning",
      emoji: "🧮",
      title: "Regneøving",
      description:
        "Delay-beregning, throughput, Chord-FT, subnetting, vektor-klokker. Selvgradert med 'Vis løsning'-accordion.",
      count: `${calculationCount} drills`,
      band: "bg-blue-500",
      iconBg:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      accentText: "text-blue-700 dark:text-blue-300",
      status: "active",
    },
    {
      href: "/dat110/eksamen/gjengangere",
      emoji: "🔥",
      title: "Eksamensdrill — gjengangere",
      description:
        "Kuratert oversikt over gjengangere på tvers av 2022–2025: Q-slot-tabell + mønster-kort med eksempler.",
      count: "Q-slot-analyse",
      band: "bg-orange-500",
      iconBg:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      accentText: "text-orange-700 dark:text-orange-300",
      status: "active",
    },
  ];
}

const STUDIEPLAN = [
  {
    label: "Dag 1",
    plan: "Chord DHT — repetér ring, successor-regel, finger-tabell. Quiz alle Chord-spørsmål.",
  },
  {
    label: "Dag 2",
    plan: "Delay/throughput + IP/subnetting. Regneøving 5–10 delay-eksempler og 3–5 CIDR-blokker.",
  },
  {
    label: "Dag 3",
    plan: "Overlay multicast + RPC. Drill failure-semantikk og ALM vs IP-multicast.",
  },
  {
    label: "Dag 4",
    plan: "Vector clocks + consistency/replikering. Matching-øvelse på begrepspar.",
  },
  {
    label: "Dag 5",
    plan: "Eksamenssimulering V2024 (4 timer uten fasit). Kryss-sjekk svarene etterpå.",
  },
  {
    label: "Dag 6 (kvelden før)",
    plan: "Drill bare feil fra tidligere økter. Flashcards. Ikke prøv å lære noe nytt.",
  },
];

const TIPS = [
  "Test deg selv før du leser fasit — aktiv læring slår passiv repetisjon.",
  "Når du bommer på en quiz, klikk på 'Les mer'-lenken — det er der konseptet sitter.",
  "Drill gjengangere: Chord-FT, delay-formler, CIDR-blokker dukker opp år etter år.",
  "Regn delay/DHT/vector clocks for hånd minst én gang per uke — ikke bare lese.",
  "Eksamenssimulering 2 ganger: første viser hva du ikke kan, andre viser om du har lært det.",
];

function statusBadge(status: ModusCard["status"]) {
  return status === "active" ? (
    <Dat110Badge tone="active">Aktiv</Dat110Badge>
  ) : (
    <Dat110Badge tone="neutral">Kommer senere</Dat110Badge>
  );
}

export default function DAT110OvingHubPage() {
  const allQuestions = getAllQuizQuestions();
  const quizCount = allQuestions.length;

  const bySource = { exam: 0, canvas: 0, generated: 0 } as Record<
    "exam" | "canvas" | "generated",
    number
  >;
  for (const q of allQuestions) bySource[sourceKindOf(q.source)] += 1;

  const sourceLine: string[] = [];
  if (bySource.exam > 0) sourceLine.push(`${bySource.exam} eksamen`);
  if (bySource.canvas > 0) sourceLine.push(`${bySource.canvas} Canvas`);
  if (bySource.generated > 0) sourceLine.push(`${bySource.generated} generert`);

  const flashcardCount = flashcardsData.cards.length;
  const matchingCount = matchingData.pairs.length;
  const calculationCount = calculationData.drills.length;
  const examCount = getExamSummaries().length;

  const moduser = buildModuser(
    quizCount,
    flashcardCount,
    matchingCount,
    calculationCount,
    examCount,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Dat110PageHeader
        crumbs={[
          { label: "Hjem", href: "/" },
          { label: "DAT110", href: "/dat110" },
          { label: "Øving" },
        ]}
        eyebrow="DAT110 · Øving og drilling"
        title="Øving og drilling"
        lead={
          <>
            Aktiv læring slår passiv lesing. Seks moduser med tre kilder for
            quizspørsmål —{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
              tidligere eksamener
            </strong>
            ,{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
              Canvas-quizer
            </strong>{" "}
            og{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
              genererte spørsmål
            </strong>{" "}
            fra pensum. Alle moduser har feedback og «Les mer»-lenker.
          </>
        }
      />

      <Dat110Section
        eyebrow="Start her"
        title="Velg modus"
        description="Alle seks modusene er klare å bruke. Begynn med quiz for bredde, eller gå rett på en spesifikk drill."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduser.map((m) => {
            const isActive = m.status === "active";
            const cardClasses = isActive
              ? "group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              : "flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden opacity-60 cursor-not-allowed";

            const inner = (
              <>
                <div
                  className={`h-1 ${isActive ? m.band : "bg-neutral-300 dark:bg-neutral-700"}`}
                  aria-hidden
                />
                <div className="p-5">
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
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3 leading-relaxed">
                    {m.description}
                  </p>

                  {isActive && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--card-border)]">
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                        {m.count}
                      </span>
                      <span
                        className={`ml-auto inline-flex items-center gap-1 text-xs font-bold ${m.accentText}`}
                      >
                        Åpne →
                      </span>
                    </div>
                  )}
                </div>
              </>
            );

            if (!isActive) {
              return (
                <div key={m.title} aria-disabled className={cardClasses}>
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
      </Dat110Section>

      {/* Quiz-kilde-sammendrag */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 mb-12 shadow-sm">
        <p className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)] mb-1">
          Flervalg-quiz fordeling
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">
          {quizCount} spørsmål totalt · {sourceLine.join(" · ")}
        </p>
      </div>

      <Dat110Section
        eyebrow="Plan"
        title="Anbefalt studieplan"
        description="Seks dager til eksamen — en konkret rekkefølge fra bredde til repetisjon."
      >
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="space-y-3">
            {STUDIEPLAN.map((d, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 pb-3 border-b border-[var(--card-border)] last:border-b-0 last:pb-0"
              >
                <span className="flex-shrink-0 sm:w-40 text-sm font-bold text-network-700 dark:text-network-300">
                  {d.label}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  {d.plan}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Dat110Section>

      {/* Tips */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 p-5">
        <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
          <span aria-hidden>💡</span> Slik bruker du øvingsmodulene best
        </h3>
        <ul className="text-sm space-y-1.5 list-disc list-inside text-neutral-700 dark:text-neutral-100 leading-relaxed">
          {TIPS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
