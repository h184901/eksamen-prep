import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102MatchingGame from "@/components/dat102/oving/Dat102MatchingGame";
import { getMatchingDataset } from "@/lib/dat102-vault/oving-adapter";

export const metadata = {
  title: "Matching — DAT102 øving",
  description:
    "Koble begrep mot definisjon, algoritme mot kompleksitet og struktur mot bruk.",
};

export default function MatchingPage() {
  const dataset = getMatchingDataset();
  return (
    <div className="max-w-3xl mx-auto">
      <Dat102Breadcrumbs
        trail={[{ label: "Øving", href: "/dat102/oving" }, { label: "Matching" }]}
      />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
          Matching
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          {dataset.items.length} par. Velg et kort til venstre og makkeren til
          høyre. Etter hver match får du «les mer»-lenker.
        </p>
      </header>
      <Dat102MatchingGame dataset={dataset} />
    </div>
  );
}
