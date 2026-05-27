// Local types for the flashcards mode. Kept LOCAL to the flashcards components
// per agent file-ownership constraints — do NOT promote into
// src/lib/dat110-vault/types.ts.

export type FlashcardTopicSlug =
  | "chord-dht"
  | "overlay-and-gossip"
  | "logical-clocks"
  | "consistency-and-replication"
  | "fault-tolerance"
  | "network-layer"
  | "transport-layer"
  | "routing";

export interface FlashcardLearnMoreLink {
  // Display label shown on the blue pill in the card back.
  label: string;
  // Internal route — MUST be one of the routes in
  // src/data/dat110-vault/_wikilink-index.json (validated at build/runtime).
  href: string;
}

export interface Flashcard {
  // Stable id, e.g., "fc-001".
  id: string;
  topic: FlashcardTopicSlug;
  // Front side: question, term, or short prompt.
  front: string;
  // Back side: concise answer / definition (max ~3 sentences).
  back: string;
  // Optional links to existing concept/topic pages.
  learnMoreLinks?: FlashcardLearnMoreLink[];
  // Optional internal grounding pointer (NOT rendered in UI).
  sourceRef?: string;
}

export interface FlashcardDataset {
  schemaVersion: 1;
  generatedNote: string;
  cards: Flashcard[];
}

// UI-facing topic metadata for the filter pills.
export interface FlashcardTopicInfo {
  slug: FlashcardTopicSlug;
  label: string;
  emoji: string;
  // Tailwind color family (must exist in tailwind.config.ts).
  color: "network" | "blue" | "teal" | "emerald" | "purple" | "amber" | "rose";
}

export const FLASHCARD_TOPICS: FlashcardTopicInfo[] = [
  {
    slug: "chord-dht",
    label: "Chord DHT",
    emoji: "🔗",
    color: "blue",
  },
  {
    slug: "overlay-and-gossip",
    label: "Overlay og gossip",
    emoji: "🌳",
    color: "teal",
  },
  {
    slug: "logical-clocks",
    label: "Logiske klokker",
    emoji: "🕐",
    color: "amber",
  },
  {
    slug: "consistency-and-replication",
    label: "Konsistens og replikering",
    emoji: "🗄️",
    color: "rose",
  },
  {
    slug: "fault-tolerance",
    label: "Feiltoleranse",
    emoji: "🛡️",
    color: "purple",
  },
  {
    slug: "network-layer",
    label: "Network layer",
    emoji: "🌐",
    color: "network",
  },
  {
    slug: "transport-layer",
    label: "Transport layer",
    emoji: "🚚",
    color: "emerald",
  },
  {
    slug: "routing",
    label: "Routing",
    emoji: "🧭",
    color: "network",
  },
];

// Static Tailwind classes for topic pills. JIT-safe — every class is spelled
// out (no template-string color interpolation).
export const FLASHCARD_TOPIC_PILL: Record<
  FlashcardTopicInfo["color"],
  { idle: string; active: string }
> = {
  network: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-network-50 dark:hover:bg-network-950/30",
    active:
      "bg-network-100 dark:bg-network-900/40 text-network-800 dark:text-network-200 border-network-400 dark:border-network-600",
  },
  blue: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-950/30",
    active:
      "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-blue-400 dark:border-blue-600",
  },
  teal: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-teal-50 dark:hover:bg-teal-950/30",
    active:
      "bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 border-teal-400 dark:border-teal-600",
  },
  emerald: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
    active:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-400 dark:border-emerald-600",
  },
  purple: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-purple-50 dark:hover:bg-purple-950/30",
    active:
      "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 border-purple-400 dark:border-purple-600",
  },
  amber: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-amber-50 dark:hover:bg-amber-950/30",
    active:
      "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-400 dark:border-amber-600",
  },
  rose: {
    idle: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-rose-50 dark:hover:bg-rose-950/30",
    active:
      "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border-rose-400 dark:border-rose-600",
  },
};

// Lookup helper for FlashcardRunner / Flashcard components.
export function getFlashcardTopicInfo(
  slug: FlashcardTopicSlug
): FlashcardTopicInfo {
  const info = FLASHCARD_TOPICS.find((t) => t.slug === slug);
  // All slugs in FlashcardTopicSlug are defined in FLASHCARD_TOPICS by
  // construction; fallback is defensive only.
  return info ?? FLASHCARD_TOPICS[0];
}
