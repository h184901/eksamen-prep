import Link from "next/link";
import FlashcardRunner from "@/components/dat110/oving/FlashcardRunner";
import flashcardsData from "@/data/dat110-vault/flashcards.json";
import type {
  Flashcard,
  FlashcardDataset,
} from "@/components/dat110/oving/flashcard-types";

export const metadata = {
  title: "Flashcards — DAT110",
  description:
    "Aktiv repetisjon med forside/bakside-kort. Filtrer på temaer og drill begreper, formler og definisjoner fra DAT110-pensum.",
};

const dataset = flashcardsData as unknown as FlashcardDataset;
const cards: Flashcard[] = dataset.cards;

export default function FlashcardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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
        <Link
          href="/dat110/oving"
          className="hover:text-[var(--accent)]"
        >
          Øving
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">
          Flashcards
        </span>
      </nav>

      {/* Hero */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
          Flashcards
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl">
          Forside med spørsmål eller begrep — bakside med kort, eksamen-rettet
          forklaring og «Les mer»-lenker til konseptsidene. Velg temaer og bla
          deg gjennom kortene. Test deg selv FØR du snur — aktiv læring slår
          passiv lesing.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Totalt {cards.length} kort hånd-kuratert mot tidligere
          DAT110-eksamener og Tier-1 konsepter.
        </p>
      </header>

      <FlashcardRunner cards={cards} />
    </div>
  );
}
