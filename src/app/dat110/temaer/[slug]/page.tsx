import { notFound } from "next/navigation";
import {
  getAllTopicSlugs,
  getTopicBySlug,
} from "@/lib/dat110-vault/loader";
import TopicPageLayout from "@/components/dat110/TopicPageLayout";

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

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();
  return <TopicPageLayout topic={topic} />;
}
