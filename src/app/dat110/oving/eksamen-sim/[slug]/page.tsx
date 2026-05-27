import { notFound } from "next/navigation";
import {
  getAllExamSlugs,
  getExamBySlug,
} from "@/lib/dat110-vault/loader";
import ExamSimulationLayout from "@/components/dat110/oving/ExamSimulationLayout";

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
  if (!exam) return { title: "Eksamenssimulering — DAT110" };
  return { title: `Sim · ${exam.displayLabel} — DAT110` };
}

export default async function ExamSimulationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) notFound();
  return <ExamSimulationLayout exam={exam} />;
}
