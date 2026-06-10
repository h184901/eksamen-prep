import Link from "next/link";
import {
  getExamSummaries,
  getMeta,
  getObliger,
  getSyllabus,
} from "@/lib/dat102-vault/loader";
import type { ObligStatus } from "@/lib/dat102-vault/types";
import Dat102Badge, {
  type Dat102BadgeTone,
} from "@/components/dat102/Dat102Badge";
import Dat102Card from "@/components/dat102/Dat102Card";
import Dat102Section from "@/components/dat102/Dat102Section";
import Dat102WikilinkText from "@/components/dat102/Dat102WikilinkText";
import CourseRoadmap from "@/components/dat102/diagrams/CourseRoadmap";
import SyllabusRoadmap from "@/components/dat102/SyllabusRoadmap";

export const metadata = {
  title: "DAT102 Algoritmer og datastrukturer",
  description:
    "Eksamensøving for DAT102: temaer, begreper, pensumplan og oppsummering — bygget fra forelesningsmateriellet og tidligere eksamener.",
};

// "Hva bør du kunne?" — håndkuratert fra topics/concepts i vaulten.
// Wikilinks rendres av Dat102WikilinkText og peker på faktiske begrep/tema-sider.
const SKILL_GOALS: { title: string; text: string }[] = [
  {
    title: "ADT-er og samlinger",
    text: "Skille spesifikasjon fra implementasjon: [[concepts/abstract-data-type|ADT]], [[concepts/bag-collection|Bag]], [[stabel]] og [[kø]] — og begrunne valget mellom [[concepts/array-vs-linked-implementation|tabell og lenket struktur]].",
  },
  {
    title: "Kjøretidsanalyse",
    text: "Lese kode og sette opp [[big-o]]-uttrykk, kjenne [[concepts/growth-rates|vekstklassene]] og bruke dem til å sammenligne algoritmer.",
  },
  {
    title: "Rekursjon og sortering",
    text: "Spore [[rekursjon|rekursive kall]] på papir, og vise stegene i [[concepts/quicksort|quicksort]], [[flettesortering]], [[concepts/heapsort|heapsort]] og [[radix sort]].",
  },
  {
    title: "Søking og hashing",
    text: "Forklare [[binærsøk]] mot lineært søk, og hvordan [[hashing]] gir raske oppslag — inkludert [[load factor]] og kollisjonshåndtering.",
  },
  {
    title: "Trær og heap",
    text: "Bygge og traversere [[binary search tree|binære søketrær]], forklare balansering med [[concepts/two-three-tree|2-3-trær]] og bruke [[heap]] som prioritetskø.",
  },
  {
    title: "Grafer",
    text: "Kjenne [[concepts/graph-terminology|grafterminologien]], traversere med [[concepts/breadth-first-search|BFS]] og [[concepts/depth-first-search|DFS]], og forstå [[concepts/dijkstra-shortest-path|Dijkstra]] og [[concepts/minimum-spanning-tree|minimalt spenntre]].",
  },
];

const OBLIG_STATUS: Record<ObligStatus, { label: string; tone: Dat102BadgeTone }> = {
  full_text_available: { label: "Fulltekst", tone: "ny" },
  partial: { label: "Delvis", tone: "warn" },
  index_only: { label: "Oversikt", tone: "neutral" },
  missing_source: { label: "Mangler kilde", tone: "soon" },
};

export default function Dat102HomePage() {
  const counts = getMeta().counts;
  const syllabus = getSyllabus();
  const obliger = getObliger();
  const exams = getExamSummaries();

  return (
    <div>
      {/* ───── Hero ───── */}
      <section className="pt-2 pb-10 sm:pt-4 sm:pb-12">
        <div className="flex items-center gap-2 mb-3">
          <Dat102Badge tone="ny">Ny</Dat102Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            DAT102 · HVL Bergen
          </p>
        </div>
        <h1 className="text-[clamp(1.875rem,4.5vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-50 mb-4 text-balance">
          Algoritmer og{" "}
          <span className="text-dat102-600 dark:text-dat102-400">
            datastrukturer
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
          Big-O, sortering, lister, hashing, trær og grafer — bygget fra
          forelesningene, øvingene og {counts.exams} tidligere eksamenssett.
          Pensumboka brukes kun som referansestruktur.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dat102/temaer"
            className="inline-flex items-center gap-2 rounded-lg bg-dat102-600 hover:bg-dat102-700 dark:bg-dat102-500 dark:hover:bg-dat102-400 text-white dark:text-dat102-950 font-semibold text-sm px-5 py-2.5 transition-colors shadow-sm"
          >
            Utforsk temaene
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/dat102/pensum"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--card-border)] hover:border-dat102-400 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm px-4 py-2.5 transition-colors"
          >
            <span aria-hidden>🗓️</span>
            Pensumplan
          </Link>
        </div>
      </section>

      {/* ───── Quick cards ───── */}
      <Dat102Section
        eyebrow="Innhold"
        title="Hvor vil du starte?"
        description="Alt på samme datagrunnlag: temaer og begreper å forstå, pensumplan å følge, øving å drille på, og tidligere eksamener med løsninger."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Dat102Card
            href="/dat102/temaer"
            icon="🧭"
            title="Temaer"
            description="14 hovedtemaer fra Bag-ADT til grafer — med begreper, forelesningskobling og kilder."
            meta={`${counts.topics} temaer · ${counts.concepts} begreper`}
          />
          <Dat102Card
            href="/dat102/begreper"
            icon="📖"
            title="Begreper"
            description="Alle sentrale begreper med definisjon, eksempler og vanlige feil. Søkbart og gruppert etter tema."
            meta={`${counts.concepts} begreper · søk og filter`}
          />
          <Dat102Card
            href="/dat102/pensum"
            icon="🗓️"
            title="Pensum"
            description="Ukeplanen F01–F26 med kapittelreferanser, lab-øvinger og obligfrister."
            meta={`${counts.lectures} forelesninger · 18 uker`}
          />
          <Dat102Card
            href="/dat102/oppsummering"
            icon="🎯"
            title="Oppsummering"
            description="Kompakt eksamensoppsummering: Big-O-tabeller, valg av datastruktur og siste-uke-plan."
          />
          <Dat102Card
            href="/dat102/oving"
            icon="⚡"
            title="Øving"
            description="Quiz med feedback, flashcards, matching og drills — generert fra kurs- og eksamensmateriellet."
            meta={`${counts.quizQuestions} quiz · ${counts.flashcards} kort · ${counts.matchingPairs} par · ${counts.drills} drills`}
          />
          <Dat102Card
            href="/dat102/eksamen"
            icon="📋"
            title="Eksamen"
            description="Tidligere eksamener med løsningsforslag, vanlige feil og gjengangere på tvers av år."
            meta={`${counts.exams} eksamenssett · ${counts.examSubquestions} deloppgaver`}
          />
        </div>
      </Dat102Section>

      {/* ───── Faglig løype ───── */}
      <Dat102Section
        eyebrow="Oversikt"
        title="Den faglige løypa"
        description="Temaene bygger på hverandre i denne rekkefølgen — hver stasjon lenker til temasiden."
      >
        <CourseRoadmap />
      </Dat102Section>

      {/* ───── Semesterplan ───── */}
      <Dat102Section
        eyebrow="Semesteret"
        title="Uke for uke"
        description="Fra ukeplanen: forelesninger (lenket til pensum) og obligfrister. Full plan med kapitler ligger under Pensum."
        actions={
          <Link
            href="/dat102/pensum"
            className="text-sm font-medium text-dat102-700 dark:text-dat102-300 hover:underline underline-offset-2"
          >
            Full pensumplan →
          </Link>
        }
      >
        <SyllabusRoadmap weeks={syllabus.weeks} lectures={syllabus.lectures} />
      </Dat102Section>

      {/* ───── Hva bør du kunne? ───── */}
      <Dat102Section
        eyebrow="Læringsmål"
        title="Hva bør du kunne?"
        description="Kjernen i kurset, destillert fra temaene — lenkene tar deg rett til begrepene."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GOALS.map((goal) => (
            <div
              key={goal.title}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4"
            >
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-50 mb-1.5">
                {goal.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                <Dat102WikilinkText text={goal.text} />
              </p>
            </div>
          ))}
        </div>
      </Dat102Section>

      {/* ───── Obliger ───── */}
      <Dat102Section
        eyebrow="Arbeidskrav"
        title="Obligatoriske innleveringer"
        description="Fem obliger pluss godkjentprøve med temaer, kilder og ærlig status."
        actions={
          <Link
            href="/dat102/oving/obliger"
            className="text-sm font-medium text-dat102-700 dark:text-dat102-300 hover:underline underline-offset-2"
          >
            Alle obliger →
          </Link>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {obliger.map((o) => {
            const status = OBLIG_STATUS[o.status];
            return (
              <Link
                key={o.id}
                href={`/dat102/oving/obliger#${o.anchor}`}
                className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-dat102-400/70 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-50 leading-snug group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors">
                    {o.title}
                  </h3>
                  <Dat102Badge tone={status.tone}>{status.label}</Dat102Badge>
                </div>
                <p className="text-xs text-[var(--muted)] mb-2">
                  Frist {o.deadline} · uke {o.weeks}
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {o.themes}
                </p>
              </Link>
            );
          })}
        </div>
      </Dat102Section>

      {/* ───── Eksamensforberedelse ───── */}
      <Dat102Section
        eyebrow="Eksamen"
        title="Eksamensforberedelse"
        description="Åtte tidligere eksamenssett segmentert oppgave for oppgave, pluss gjenganger-analyse."
        actions={
          <Link
            href="/dat102/eksamen/gjengangere"
            className="text-sm font-medium text-dat102-700 dark:text-dat102-300 hover:underline underline-offset-2"
          >
            Gjengangere →
          </Link>
        }
      >
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 py-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {exams.map((e) => (
              <Link
                key={e.slug}
                href={`/dat102/eksamen/${e.slug}`}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-dat102-50 dark:bg-dat102-950/40 text-dat102-700 dark:text-dat102-300 border border-dat102-200 dark:border-dat102-900 hover:bg-dat102-100 dark:hover:bg-dat102-900/60 transition-colors"
                title={`${e.questionCount} oppgaver · ${e.subquestionCount} deloppgaver (${e.status === "complete" ? "komplett" : "delvis"})`}
              >
                {e.displayLabel}
              </Link>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Gå rett til{" "}
            <Link
              href="/dat102/eksamen"
              className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
            >
              eksamensoversikten
            </Link>
            , eller bruk{" "}
            <Link
              href="/dat102/oppsummering"
              className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2"
            >
              oppsummeringen
            </Link>{" "}
            som referanseark.
          </p>
        </div>
      </Dat102Section>
    </div>
  );
}
