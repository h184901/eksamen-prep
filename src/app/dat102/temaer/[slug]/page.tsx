import { notFound } from "next/navigation";
import {
  getAllTopics,
  getConceptBySlug,
  getTopicBySlug,
} from "@/lib/dat102-vault/loader";
import Dat102EntityDetail from "@/components/dat102/Dat102EntityDetail";
import Dat102Visual from "@/components/dat102/Dat102Visual";
import BigOGrowthChart from "@/components/dat102/diagrams/BigOGrowthChart";
import StackQueueDiagram from "@/components/dat102/diagrams/StackQueueDiagram";
import TreeHeapGraphDiagram from "@/components/dat102/diagrams/TreeHeapGraphDiagram";
import HashingCollisionDiagram from "@/components/dat102/diagrams/HashingCollisionDiagram";
import { getTopicStats } from "@/components/dat102/dat102-derived";
import { displayTitle } from "@/components/dat102/md-utils";

export function generateStaticParams() {
  return getAllTopics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Tema — DAT102" };
  return { title: `${displayTitle(topic.title)} — DAT102 temaer` };
}

// Tema-slug → egen pedagogisk SVG-figur (aldri bokfigurer).
function TopicDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case "asymptotic-analysis":
    case "sorting":
      return (
        <Dat102Visual caption="Vekstkurver for de vanligste kompleksitetsklassene">
          <BigOGrowthChart />
        </Dat102Visual>
      );
    case "stacks-and-queues":
      return (
        <Dat102Visual caption="Stabel (LIFO) og kø (FIFO)">
          <StackQueueDiagram />
        </Dat102Visual>
      );
    case "dictionaries-and-hashing":
      return (
        <Dat102Visual caption="Hashing med kollisjonshåndtering (separate chaining)">
          <HashingCollisionDiagram />
        </Dat102Visual>
      );
    case "trees":
    case "binary-search-trees":
    case "balanced-trees":
    case "heaps-and-priority-queues":
    case "graphs":
      return (
        <Dat102Visual caption="Binært søketre, maks-heap og graf">
          <TreeHeapGraphDiagram />
        </Dat102Visual>
      );
    default:
      return null;
  }
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const stats = getTopicStats(slug);
  const relatedTopics = topic.relatedTopics.map((t) => ({
    title: displayTitle(getTopicBySlug(t.slug)?.title ?? t.slug),
    route: t.route,
  }));
  const relatedConcepts = topic.relatedConcepts.map((c) => ({
    title: displayTitle(getConceptBySlug(c.slug)?.title ?? c.slug),
    route: c.route,
  }));

  return (
    <Dat102EntityDetail
      kind="topic"
      title={displayTitle(topic.title)}
      slug={slug}
      body={topic.body}
      supportedBy={topic.supportedBy}
      relatedTopics={relatedTopics}
      relatedConcepts={relatedConcepts}
      lectureRefs={stats.lectureRefs}
      practice={{
        quizCount: stats.quizCount,
        drillCount: stats.drillCount,
        flashcardCount: stats.flashcardCount,
        examSubqCount: stats.examSubqCount,
      }}
      diagram={<TopicDiagram slug={slug} />}
    />
  );
}
