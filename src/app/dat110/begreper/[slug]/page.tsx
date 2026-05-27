import { notFound } from "next/navigation";
import {
  getAllConceptSlugs,
  getConceptBySlug,
} from "@/lib/dat110-vault/loader";
import ConceptPageLayout from "@/components/dat110/ConceptPageLayout";

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

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();
  return <ConceptPageLayout concept={concept} />;
}
