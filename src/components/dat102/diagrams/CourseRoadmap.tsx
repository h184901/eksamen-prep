import Link from "next/link";

// Hovedtema-løypa gjennom semesteret: ADT → analyse → rekursjon/sortering →
// lister → hashing → trær → heap → grafer. Hver stasjon lenker til temasiden.
// Egen visualisering (React/CSS) — ikke hentet fra læreboka.

interface Station {
  step: number;
  label: string;
  links: { text: string; href: string }[];
}

const STATIONS: Station[] = [
  { step: 1, label: "ADT og samlinger", links: [{ text: "Bag-ADT", href: "/dat102/temaer/bag-adt" }] },
  { step: 2, label: "Analyse", links: [{ text: "Big-O", href: "/dat102/temaer/asymptotic-analysis" }] },
  {
    step: 3,
    label: "Rekursjon og sortering",
    links: [
      { text: "Rekursjon", href: "/dat102/temaer/recursion" },
      { text: "Sortering", href: "/dat102/temaer/sorting" },
    ],
  },
  {
    step: 4,
    label: "Lister",
    links: [
      { text: "Lister", href: "/dat102/temaer/lists" },
      { text: "Stabel/kø", href: "/dat102/temaer/stacks-and-queues" },
    ],
  },
  { step: 5, label: "Hashing", links: [{ text: "Hashing", href: "/dat102/temaer/dictionaries-and-hashing" }] },
  {
    step: 6,
    label: "Trær",
    links: [
      { text: "Trær", href: "/dat102/temaer/trees" },
      { text: "BST", href: "/dat102/temaer/binary-search-trees" },
    ],
  },
  { step: 7, label: "Heap", links: [{ text: "Prioritetskø", href: "/dat102/temaer/heaps-and-priority-queues" }] },
  { step: 8, label: "Grafer", links: [{ text: "Grafer", href: "/dat102/temaer/graphs" }] },
];

export default function CourseRoadmap() {
  return (
    <ol className="flex flex-wrap items-stretch gap-y-3" aria-label="Faglig løype gjennom DAT102">
      {STATIONS.map((s, i) => (
        <li key={s.step} className="flex items-center">
          <div className="rounded-xl border border-dat102-200 dark:border-dat102-900 bg-dat102-50/60 dark:bg-dat102-950/30 px-3.5 py-2.5 min-w-[7.5rem]">
            <p className="text-[10px] font-bold uppercase tracking-wide text-dat102-700 dark:text-dat102-300 mb-0.5">
              Steg {s.step}
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 leading-tight mb-1">
              {s.label}
            </p>
            <p className="flex flex-wrap gap-x-2 gap-y-0.5">
              {s.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-dat102-700 dark:text-dat102-300 font-medium underline-offset-2 hover:underline"
                >
                  {l.text}
                </Link>
              ))}
            </p>
          </div>
          {i < STATIONS.length - 1 && (
            <span
              aria-hidden
              className="mx-1.5 text-dat102-400 dark:text-dat102-600 font-bold select-none"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
