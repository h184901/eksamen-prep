import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102Flashcards from "@/components/dat102/oving/Dat102Flashcards";
import { getFlashcardDataset } from "@/lib/dat102-vault/oving-adapter";

export const metadata = {
  title: "Flashcards — DAT102 øving",
  description: "Snu kort og test deg selv på begrepene i DAT102.",
};

export default function FlashcardsPage() {
  const dataset = getFlashcardDataset();
  return (
    <div className="max-w-3xl mx-auto">
      <Dat102Breadcrumbs
        trail={[{ label: "Øving", href: "/dat102/oving" }, { label: "Flashcards" }]}
      />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
          Flashcards
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          {dataset.items.length} kort. Snu kortet, marker om du kan det, og få
          «les mer»-lenker på baksiden. Framgangen lagres lokalt.
        </p>
      </header>
      <Dat102Flashcards dataset={dataset} />
    </div>
  );
}
