import ChapterLayout from "@/components/ChapterLayout";
import ProgressTracker from "@/components/ProgressTracker";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 4)!;

const sections = [
  "Teorisammendrag",
  "Formler",
  "Interaktive visualiseringer",
  "Gjennomgåtte eksempler",
  "Oppgavestrategier",
  "Øvingsoppgaver",
  "Eksamensoppgaver",
];

export default function ChapterPage() {
  return (
    <ChapterLayout chapter={chapter}>
      <ProgressTracker chapterId={chapter.id} sections={sections} />

      <div className="mt-8 rounded-xl border-2 border-dashed border-[var(--card-border)] p-12 text-center">
        <p className="text-[var(--muted)] text-lg">
          Innhold for Kapittel {chapter.id}: {chapter.title} kommer snart.
        </p>
        <p className="text-sm text-[var(--muted)] mt-2">
          Her kommer teori, formler, visualiseringer og oppgaver.
        </p>
      </div>
    </ChapterLayout>
  );
}
