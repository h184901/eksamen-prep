import { notFound } from "next/navigation";
import { getAllExamSlugs, getExamBySlug } from "@/lib/dat102-vault/loader";
import Dat102ExamDetail from "@/components/dat102/exam/Dat102ExamDetail";

export function generateStaticParams() {
  return getAllExamSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) return { title: "Eksamen — DAT102" };
  return { title: `Eksamen ${exam.displayLabel} — DAT102` };
}

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) notFound();
  return <Dat102ExamDetail exam={exam} />;
}
