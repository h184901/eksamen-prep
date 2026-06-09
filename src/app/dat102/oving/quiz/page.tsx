import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102QuizRunner from "@/components/dat102/oving/Dat102QuizRunner";
import { getQuizDataset } from "@/lib/dat102-vault/oving-adapter";

export const metadata = {
  title: "Quiz — DAT102 øving",
  description:
    "Flervalg, flere riktige, sant/usant og selvsjekk med forklaring og kilder på hvert svar.",
};

export default function QuizPage() {
  const dataset = getQuizDataset();
  return (
    <div className="max-w-3xl mx-auto">
      <Dat102Breadcrumbs
        trail={[{ label: "Øving", href: "/dat102/oving" }, { label: "Quiz" }]}
      />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
          Quiz
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          {dataset.items.length} spørsmål på tvers av {dataset.topicFacets.length}{" "}
          temaer. Velg filtre, så får du forklaring og «les mer»-lenker på hvert
          svar — både når du treffer og bommer.
        </p>
      </header>
      <Dat102QuizRunner dataset={dataset} />
    </div>
  );
}
