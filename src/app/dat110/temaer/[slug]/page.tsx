import { notFound } from "next/navigation";
import {
  getAllTopicSlugs,
  getTopicBySlug,
} from "@/lib/dat110-vault/loader";
import TopicPageLayout from "@/components/dat110/TopicPageLayout";
import TcpIpVsOsiDiagram from "@/components/dat110/diagrams/TcpIpVsOsiDiagram";

export function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Tema" };
  return { title: `${topic.title} — DAT110 temaer` };
}

// Topic-slug → pedagogical SVG diagram component.
// Diagrams are self-drawn; not derived from textbook/slide figures.
function TopicDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case "transport-layer":
      return <TcpIpVsOsiDiagram />;
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
  return (
    <>
      <TopicPageLayout topic={topic} />
      <div className="max-w-3xl mx-auto px-4 -mt-4 pb-8">
        <TopicDiagram slug={slug} />
      </div>
    </>
  );
}
