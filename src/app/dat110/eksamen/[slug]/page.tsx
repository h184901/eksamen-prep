import { notFound } from "next/navigation";
import {
  getAllExamSlugs,
  getExamBySlug,
} from "@/lib/dat110-vault/loader";
import ExamPageLayout from "@/components/dat110/ExamPageLayout";

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
  if (!exam) return { title: "Eksamen" };
  const recon = exam.reconstructedFromSensor ? " (rekonstruert)" : "";
  return { title: `${exam.displayLabel}${recon} — DAT110` };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) notFound();
  return <ExamPageLayout exam={exam} />;
}
