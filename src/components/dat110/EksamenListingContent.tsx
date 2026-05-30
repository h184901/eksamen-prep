"use client";

import Link from "next/link";
import Dat110PageHeader from "@/components/dat110/Dat110PageHeader";
import Dat110Section from "@/components/dat110/Dat110Section";
import Dat110Badge from "@/components/dat110/Dat110Badge";
import { useDat110Lang, localizedText, type Dat110Lang } from "@/lib/dat110-language";

interface ExamSummary {
  slug: string;
  year: number;
  session: string;
  questionCount: number;
  totalWeight: number;
  displayLabel: string;
  reconstructedFromSensor?: boolean;
}

const oppgaver: {
  id: number;
  label: string;
  titleNo: string;
  titleEn: string;
  weight: string;
  color: string;
}[] = [
  { id: 1, label: "1", titleNo: "Flervalg", titleEn: "Multiple choice", weight: "10%", color: "emerald" },
  { id: 2, label: "2", titleNo: "Oblig-prosjekt", titleEn: "Mandatory project", weight: "10%", color: "purple" },
  { id: 3, label: "3", titleNo: "Forsinkelser", titleEn: "Delays", weight: "10%", color: "network" },
  { id: 4, label: "4", titleNo: "Protokoller", titleEn: "Protocols", weight: "10%", color: "network" },
  { id: 5, label: "5", titleNo: "Ruting", titleEn: "Routing", weight: "10%", color: "network" },
  { id: 6, label: "6", titleNo: "ARP og Switch", titleEn: "ARP and switching", weight: "10%", color: "network" },
  { id: 7, label: "7", titleNo: "DS-teori", titleEn: "DS theory", weight: "5%", color: "blue" },
  { id: 8, label: "8", titleNo: "Overlay og multicast", titleEn: "Overlay and multicast", weight: "10%", color: "blue" },
  { id: 9, label: "9", titleNo: "Konsistens og klokker", titleEn: "Consistency and clocks", weight: "10%", color: "blue" },
  { id: 10, label: "10", titleNo: "DHT/Chord", titleEn: "DHT/Chord", weight: "15%", color: "blue" },
];

const colorStyles: Record<string, string> = {
  emerald: "hover:border-emerald-400 text-emerald-600 dark:text-emerald-400",
  purple: "hover:border-purple-400 text-purple-600 dark:text-purple-400",
  network: "hover:border-network-400 text-network-600 dark:text-network-400",
  blue: "hover:border-blue-400 text-blue-600 dark:text-blue-400",
};

function sessionLabel(session: string, lang: Dat110Lang): string {
  const no: Record<string, string> = { "01": "Januar", "05": "Mai", "06": "Juni" };
  const en: Record<string, string> = { "01": "January", "05": "May", "06": "June" };
  const map = lang === "en" ? en : no;
  return map[session] ?? session;
}

export default function EksamenListingContent({ exams }: { exams: ExamSummary[] }) {
  const { lang } = useDat110Lang();
  const t = (no: string, en: string) => localizedText(no, en, lang);

  return (
    <div>
      <Dat110PageHeader
        crumbs={[
          { label: t("Hjem", "Home"), href: "/" },
          { label: "DAT110", href: "/dat110" },
          { label: t("Eksamen", "Exams") },
        ]}
        eyebrow={t("DAT110 · Eksamen", "DAT110 · Exams")}
        title={t("Tidligere eksamener", "Past exams")}
        lead={t(
          "Kildetro oppgavetekst og dokumenterte løsninger fra sensorveiledning. Velg en eksamen for å gå gjennom oppgavene, eller bla per oppgavetype lenger ned for systematisk mønstergjenkjenning.",
          "Faithful question text and documented solutions from the grading guide. Pick an exam to work through the questions, or browse by question type below for systematic pattern recognition.",
        )}
      />

      <Dat110Section
        eyebrow={t("Komplette sett", "Complete sets")}
        title={t("Eksamener etter år", "Exams by year")}
        description={t(
          "Offisielle eksamener er merket grønt. Juni 2025 er rekonstruert fra sensorveiledningen — bruk den som øvingskilde, ikke som autoritativ eksamen.",
          "Official exams are marked green. June 2025 is reconstructed from the grading guide — use it as a practice source, not as an authoritative exam.",
        )}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => {
            const isReconstructed = exam.reconstructedFromSensor === true;
            return (
              <Link
                key={exam.slug}
                href={`/dat110/eksamen/${exam.slug}`}
                className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-network-300 dark:hover:border-network-700"
              >
                <div
                  className={`h-1 ${isReconstructed ? "bg-amber-400" : "bg-emerald-500"}`}
                  aria-hidden
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                    <Dat110Badge
                      tone={isReconstructed ? "reconstructed" : "official"}
                    >
                      {isReconstructed
                        ? t("Rekonstruert", "Reconstructed")
                        : t("Offisiell", "Official")}
                    </Dat110Badge>
                    <span className="text-xs text-[var(--muted)]">
                      {exam.questionCount} {t("oppgaver", "questions")} ·{" "}
                      {exam.totalWeight} %
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-neutral-900 dark:text-neutral-50 group-hover:text-network-700 dark:group-hover:text-network-300 transition-colors">
                    {sessionLabel(exam.session, lang)} {exam.year}
                  </h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {exam.displayLabel}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Dat110Section>

      <Dat110Section
        eyebrow={t("Mønstergjenkjenning", "Pattern recognition")}
        title={t("Eller bla per oppgavetype", "Or browse by question type")}
        description={t(
          "Vil du heller øve på én oppgavetype på tvers av alle eksamen-år, gå via oppgavetype-listingen.",
          "If you'd rather practise one question type across all exam years, use the question-type listing.",
        )}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {oppgaver.map((oppg) => (
            <Link
              key={oppg.id}
              href={`/dat110/eksamenoving/oppg-${oppg.id}/tidligere`}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] shadow-sm transition-all hover:shadow-md ${colorStyles[oppg.color]}`}
            >
              <div className="text-right">
                <p className="text-xs font-bold">{oppg.weight}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold opacity-70">
                  {t("Oppg", "Q")} {oppg.label}
                </p>
                <p className="font-bold text-neutral-900 dark:text-neutral-50">
                  {t(oppg.titleNo, oppg.titleEn)}
                </p>
              </div>
              <svg
                className="w-5 h-5 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </Dat110Section>

      <div className="rounded-xl border border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-900/40 p-4">
        <h3 className="font-bold text-sm mb-1.5 text-neutral-900 dark:text-neutral-50">
          {t("Om sensorveiledningene", "About the grading guides")}
        </h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          {t(
            "Alle løsningene er kildetro etter sensorveiledningene fra HVL. Original sensor-PDF og oppgave-PDF er tilgjengelig lokalt for verifikasjon, men ikke publisert på web.",
            "All solutions are faithful to the HVL grading guides. The original grading-guide PDF and question PDF are available locally for verification, but not published on the web.",
          )}
        </p>
      </div>
    </div>
  );
}
