import { notFound } from "next/navigation";
import {
  getAllConcepts,
  getConceptBySlug,
  getTopicBySlug,
} from "@/lib/dat102-vault/loader";
import Dat102EntityDetail from "@/components/dat102/Dat102EntityDetail";
import Dat102Visual from "@/components/dat102/Dat102Visual";
import BigOGrowthChart from "@/components/dat102/diagrams/BigOGrowthChart";
import StackQueueDiagram from "@/components/dat102/diagrams/StackQueueDiagram";
import TreeHeapGraphDiagram from "@/components/dat102/diagrams/TreeHeapGraphDiagram";
import HashingCollisionDiagram from "@/components/dat102/diagrams/HashingCollisionDiagram";
import { conceptPracticeCounts } from "@/components/dat102/dat102-derived";
import { displayTitle } from "@/components/dat102/md-utils";

export function generateStaticParams() {
  return getAllConcepts().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) return { title: "Begrep — DAT102" };
  return { title: `${displayTitle(concept.title)} — DAT102 begreper` };
}

// Begrep-slug → egen pedagogisk SVG-figur (aldri bokfigurer).
function ConceptDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case "big-o-notation":
    case "growth-rates":
    case "complexity-analysis":
    case "sorting-comparison":
      return (
        <Dat102Visual caption="Vekstkurver for de vanligste kompleksitetsklassene">
          <BigOGrowthChart />
        </Dat102Visual>
      );
    case "hash-table":
    case "hash-function":
    case "separate-chaining":
    case "load-factor":
    case "open-addressing":
    case "dictionary-adt":
      return (
        <Dat102Visual caption="Hashing med kollisjonshåndtering (separate chaining)">
          <HashingCollisionDiagram />
        </Dat102Visual>
      );
    case "stack-adt":
    case "queue-adt":
    case "circular-queue":
    case "deque":
      return (
        <Dat102Visual caption="Stabel (LIFO) og kø (FIFO)">
          <StackQueueDiagram />
        </Dat102Visual>
      );
    case "binary-tree":
    case "binary-search-tree":
    case "bst-operations":
    case "tree-terminology":
    case "heap":
    case "priority-queue":
    case "graph-terminology":
      return (
        <Dat102Visual caption="Binært søketre, maks-heap og graf">
          <TreeHeapGraphDiagram />
        </Dat102Visual>
      );
    default:
      return null;
  }
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();

  const counts = conceptPracticeCounts(slug);
  const relatedTopics = concept.relatedTopics.map((t) => ({
    title: displayTitle(getTopicBySlug(t.slug)?.title ?? t.slug),
    route: t.route,
  }));
  const relatedConcepts = concept.relatedConcepts.map((c) => ({
    title: displayTitle(getConceptBySlug(c.slug)?.title ?? c.slug),
    route: c.route,
  }));

  return (
    <Dat102EntityDetail
      kind="concept"
      title={displayTitle(concept.title)}
      slug={slug}
      body={concept.body}
      supportedBy={concept.supportedBy}
      relatedTopics={relatedTopics}
      relatedConcepts={relatedConcepts}
      practice={{
        quizCount: counts.quizCount,
        drillCount: counts.drillCount,
        flashcardCount: counts.flashcardCount,
        examSubqCount: 0,
      }}
      diagram={<ConceptDiagram slug={slug} />}
    />
  );
}
