import { notFound } from "next/navigation";
import {
  getAllConceptSlugs,
  getConceptBySlug,
} from "@/lib/dat110-vault/loader";
import ConceptPageLayout from "@/components/dat110/ConceptPageLayout";
import RpcCallFlowDiagram from "@/components/dat110/diagrams/RpcCallFlowDiagram";
import ChordRingDiagram from "@/components/dat110/diagrams/ChordRingDiagram";
import DelayComponentsDiagram from "@/components/dat110/diagrams/DelayComponentsDiagram";

export function generateStaticParams() {
  return getAllConceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) return { title: "Begrep" };
  return { title: `${concept.title} — DAT110 begreper` };
}

// Concept-slug → pedagogical SVG diagram component.
// Diagrams are self-drawn; not derived from textbook/slide figures.
function ConceptDiagram({ slug }: { slug: string }) {
  switch (slug) {
    case "rpc":
      return <RpcCallFlowDiagram />;
    case "chord-ring":
      return <ChordRingDiagram />;
    case "delays":
      return <DelayComponentsDiagram />;
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
  return (
    <>
      <ConceptPageLayout concept={concept} />
      <div className="max-w-3xl mx-auto px-4 -mt-4 pb-8">
        <ConceptDiagram slug={slug} />
      </div>
    </>
  );
}
