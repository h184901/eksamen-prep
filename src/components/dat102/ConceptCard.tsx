import Link from "next/link";

export interface ConceptCardProps {
  slug: string;
  title: string;
  description: string;
  topicLabel: string | null;
}

// Begrepskort på /dat102/begreper. Holdes fri for server-only imports slik at
// det kan rendres inne i den klientside ConceptBrowser-komponenten.
export default function ConceptCard({
  slug,
  title,
  description,
  topicLabel,
}: ConceptCardProps) {
  return (
    <Link
      href={`/dat102/begreper/${slug}`}
      className="group flex flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3.5 transition-all hover:border-dat102-400/70 hover:shadow-md"
    >
      <h3 className="font-semibold text-sm leading-snug text-neutral-900 dark:text-neutral-50 group-hover:text-dat102-700 dark:group-hover:text-dat102-300 transition-colors mb-1">
        {title}
      </h3>
      <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2 mb-2">
        {description}
      </p>
      {topicLabel && (
        <span className="mt-auto self-start text-[10px] font-medium px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">
          {topicLabel}
        </span>
      )}
    </Link>
  );
}
