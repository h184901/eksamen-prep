"use client";

import Link from "next/link";
import Dat110PageHeader from "@/components/dat110/Dat110PageHeader";
import Dat110Section from "@/components/dat110/Dat110Section";
import Dat110Badge from "@/components/dat110/Dat110Badge";
import { useDat110Lang, localizedText } from "@/lib/dat110-language";

interface SourceCounts {
  exam: number;
  canvas: number;
  generated: number;
}

interface Props {
  quizCount: number;
  flashcardCount: number;
  matchingCount: number;
  calculationCount: number;
  examCount: number;
  bySource: SourceCounts;
}

interface ModusCard {
  href: string;
  emoji: string;
  titleNo: string;
  titleEn: string;
  descNo: string;
  descEn: string;
  countNo: string;
  countEn: string;
  band: string;
  iconBg: string;
  accentText: string;
}

export default function OvingHubContent({
  quizCount,
  flashcardCount,
  matchingCount,
  calculationCount,
  examCount,
  bySource,
}: Props) {
  const { lang } = useDat110Lang();
  const t = (no: string, en: string) => localizedText(no, en, lang);

  const moduser: ModusCard[] = [
    {
      href: "/dat110/oving/quiz",
      emoji: "🎯",
      titleNo: "Flervalg-quiz",
      titleEn: "Multiple-choice quiz",
      descNo:
        "Velg temaer og kilder. Forklaringer + 'Les mer'-lenker til konseptsider etter hvert svar. Multiple-answer-støtte.",
      descEn:
        "Pick topics and sources. Explanations + 'Learn more' links to concept pages after each answer. Multiple-answer support.",
      countNo: `${quizCount} spørsmål`,
      countEn: `${quizCount} questions`,
      band: "bg-network-500",
      iconBg:
        "bg-network-100 dark:bg-network-900/40 text-network-700 dark:text-network-300",
      accentText: "text-network-700 dark:text-network-300",
    },
    {
      href: "/dat110/oving/eksamen-sim",
      emoji: "⏱️",
      titleNo: "Eksamenssimulering",
      titleEn: "Exam simulation",
      descNo:
        "Velg en eksamen, ta 4 timer uten fasit, og kryss-sjekk svarene etterpå. Studie-modus med løsninger skjult.",
      descEn:
        "Pick an exam, sit 4 hours with no answer key, and cross-check your answers afterwards. Study mode with solutions hidden.",
      countNo: `${examCount} eksamener`,
      countEn: `${examCount} exams`,
      band: "bg-rose-500",
      iconBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
      accentText: "text-rose-700 dark:text-rose-300",
    },
    {
      href: "/dat110/oving/flashcards",
      emoji: "🃏",
      titleNo: "Flashcards",
      titleEn: "Flashcards",
      descNo:
        "Begrep på forsiden, definisjon på baksiden. Filter etter tema. Flip for å vise svaret.",
      descEn:
        "Term on the front, definition on the back. Filter by topic. Flip to reveal the answer.",
      countNo: `${flashcardCount} kort`,
      countEn: `${flashcardCount} cards`,
      band: "bg-amber-500",
      iconBg:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
      accentText: "text-amber-700 dark:text-amber-300",
    },
    {
      href: "/dat110/oving/matching",
      emoji: "🔗",
      titleNo: "Matching-øvelse",
      titleEn: "Matching exercise",
      descNo:
        "Drill forvekslingsbare begreper: Lamport vs vector, TCP vs UDP, primary-backup vs quorum, Chord successor vs finger.",
      descEn:
        "Drill confusable concepts: Lamport vs vector, TCP vs UDP, primary-backup vs quorum, Chord successor vs finger.",
      countNo: `${matchingCount} par`,
      countEn: `${matchingCount} pairs`,
      band: "bg-violet-500",
      iconBg:
        "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
      accentText: "text-violet-700 dark:text-violet-300",
    },
    {
      href: "/dat110/oving/beregning",
      emoji: "🧮",
      titleNo: "Regneøving",
      titleEn: "Calculation drills",
      descNo:
        "Delay-beregning, throughput, Chord-FT, subnetting, vektor-klokker. Selvgradert med 'Vis løsning'-accordion.",
      descEn:
        "Delay calculation, throughput, Chord finger tables, subnetting, vector clocks. Self-graded with a 'Show solution' accordion.",
      countNo: `${calculationCount} drills`,
      countEn: `${calculationCount} drills`,
      band: "bg-blue-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      accentText: "text-blue-700 dark:text-blue-300",
    },
    {
      href: "/dat110/eksamen/gjengangere",
      emoji: "🔥",
      titleNo: "Eksamensdrill — gjengangere",
      titleEn: "Exam drill — recurring",
      descNo:
        "Kuratert oversikt over gjengangere på tvers av 2022–2025: Q-slot-tabell + mønster-kort med eksempler.",
      descEn:
        "Curated overview of recurring questions across 2022–2025: Q-slot table + pattern cards with examples.",
      countNo: "Q-slot-analyse",
      countEn: "Q-slot analysis",
      band: "bg-orange-500",
      iconBg:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
      accentText: "text-orange-700 dark:text-orange-300",
    },
  ];

  const studieplan: { labelNo: string; labelEn: string; planNo: string; planEn: string }[] = [
    {
      labelNo: "Dag 1",
      labelEn: "Day 1",
      planNo:
        "Chord DHT — repetér ring, successor-regel, finger-tabell. Quiz alle Chord-spørsmål.",
      planEn:
        "Chord DHT — review the ring, successor rule, finger table. Quiz all Chord questions.",
    },
    {
      labelNo: "Dag 2",
      labelEn: "Day 2",
      planNo:
        "Delay/throughput + IP/subnetting. Regneøving 5–10 delay-eksempler og 3–5 CIDR-blokker.",
      planEn:
        "Delay/throughput + IP/subnetting. Drill 5–10 delay examples and 3–5 CIDR blocks.",
    },
    {
      labelNo: "Dag 3",
      labelEn: "Day 3",
      planNo:
        "Overlay multicast + RPC. Drill failure-semantikk og ALM vs IP-multicast.",
      planEn:
        "Overlay multicast + RPC. Drill failure semantics and ALM vs IP multicast.",
    },
    {
      labelNo: "Dag 4",
      labelEn: "Day 4",
      planNo:
        "Vector clocks + consistency/replikering. Matching-øvelse på begrepspar.",
      planEn:
        "Vector clocks + consistency/replication. Matching exercise on concept pairs.",
    },
    {
      labelNo: "Dag 5",
      labelEn: "Day 5",
      planNo:
        "Eksamenssimulering V2024 (4 timer uten fasit). Kryss-sjekk svarene etterpå.",
      planEn:
        "Exam simulation V2024 (4 hours with no answer key). Cross-check the answers afterwards.",
    },
    {
      labelNo: "Dag 6 (kvelden før)",
      labelEn: "Day 6 (the night before)",
      planNo:
        "Drill bare feil fra tidligere økter. Flashcards. Ikke prøv å lære noe nytt.",
      planEn:
        "Drill only the wrong ones from earlier sessions. Flashcards. Don't try to learn anything new.",
    },
  ];

  const tips: { no: string; en: string }[] = [
    {
      no: "Test deg selv før du leser fasit — aktiv læring slår passiv repetisjon.",
      en: "Test yourself before reading the answer key — active learning beats passive review.",
    },
    {
      no: "Når du bommer på en quiz, klikk på 'Les mer'-lenken — det er der konseptet sitter.",
      en: "When you miss a quiz question, click the 'Learn more' link — that's where the concept lives.",
    },
    {
      no: "Drill gjengangere: Chord-FT, delay-formler, CIDR-blokker dukker opp år etter år.",
      en: "Drill the recurring ones: Chord finger tables, delay formulas, CIDR blocks come up year after year.",
    },
    {
      no: "Regn delay/DHT/vector clocks for hånd minst én gang per uke — ikke bare lese.",
      en: "Compute delay/DHT/vector clocks by hand at least once a week — not just reading.",
    },
    {
      no: "Eksamenssimulering 2 ganger: første viser hva du ikke kan, andre viser om du har lært det.",
      en: "Exam simulation twice: the first shows what you don't know, the second whether you've learned it.",
    },
  ];

  const sourceLine: string[] = [];
  if (bySource.exam > 0)
    sourceLine.push(`${bySource.exam} ${t("eksamen", "exam")}`);
  if (bySource.canvas > 0) sourceLine.push(`${bySource.canvas} Canvas`);
  if (bySource.generated > 0)
    sourceLine.push(`${bySource.generated} ${t("generert", "generated")}`);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Dat110PageHeader
        crumbs={[
          { label: t("Hjem", "Home"), href: "/" },
          { label: "DAT110", href: "/dat110" },
          { label: t("Øving", "Practice") },
        ]}
        eyebrow={t("DAT110 · Øving og drilling", "DAT110 · Practice and drilling")}
        title={t("Øving og drilling", "Practice and drilling")}
        lead={
          lang === "en" ? (
            <>
              Active learning beats passive reading. Six modes with three sources
              of quiz questions —{" "}
              <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                past exams
              </strong>
              ,{" "}
              <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                Canvas quizzes
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                generated questions
              </strong>{" "}
              from the syllabus. Every mode has feedback and “Learn more” links.
            </>
          ) : (
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
          )
        }
      />

      <Dat110Section
        eyebrow={t("Start her", "Start here")}
        title={t("Velg modus", "Choose a mode")}
        description={t(
          "Alle seks modusene er klare å bruke. Begynn med quiz for bredde, eller gå rett på en spesifikk drill.",
          "All six modes are ready to use. Start with the quiz for breadth, or go straight to a specific drill.",
        )}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduser.map((m) => (
            <Link
              key={m.titleNo}
              href={m.href}
              className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`h-1 ${m.band}`} aria-hidden />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${m.iconBg}`}
                    aria-hidden
                  >
                    {m.emoji}
                  </div>
                  <Dat110Badge tone="active">{t("Aktiv", "Active")}</Dat110Badge>
                </div>
                <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-neutral-50 group-hover:underline">
                  {t(m.titleNo, m.titleEn)}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3 leading-relaxed">
                  {t(m.descNo, m.descEn)}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--card-border)]">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                    {t(m.countNo, m.countEn)}
                  </span>
                  <span
                    className={`ml-auto inline-flex items-center gap-1 text-xs font-bold ${m.accentText}`}
                  >
                    {t("Åpne →", "Open →")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Dat110Section>

      {/* Quiz-kilde-sammendrag */}
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 mb-12 shadow-sm">
        <p className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)] mb-1">
          {t("Flervalg-quiz fordeling", "Multiple-choice quiz distribution")}
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-200">
          {quizCount} {t("spørsmål totalt", "questions total")} ·{" "}
          {sourceLine.join(" · ")}
        </p>
      </div>

      <Dat110Section
        eyebrow={t("Plan", "Plan")}
        title={t("Anbefalt studieplan", "Recommended study plan")}
        description={t(
          "Seks dager til eksamen — en konkret rekkefølge fra bredde til repetisjon.",
          "Six days to the exam — a concrete order from breadth to review.",
        )}
      >
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="space-y-3">
            {studieplan.map((d, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 pb-3 border-b border-[var(--card-border)] last:border-b-0 last:pb-0"
              >
                <span className="flex-shrink-0 sm:w-40 text-sm font-bold text-network-700 dark:text-network-300">
                  {t(d.labelNo, d.labelEn)}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  {t(d.planNo, d.planEn)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Dat110Section>

      {/* Tips */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 p-5">
        <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
          <span aria-hidden>💡</span>{" "}
          {t(
            "Slik bruker du øvingsmodulene best",
            "How to get the most out of the practice modes",
          )}
        </h3>
        <ul className="text-sm space-y-1.5 list-disc list-inside text-neutral-700 dark:text-neutral-100 leading-relaxed">
          {tips.map((tip, i) => (
            <li key={i}>{t(tip.no, tip.en)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
