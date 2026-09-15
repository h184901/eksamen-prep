import { notFound } from "next/navigation";
import { getEgb339Week, getEgb339Weeks } from "@/lib/egb339-vault/loader";
import WeekOnePage from "@/components/egb339/week-one/WeekOnePage";
import StudyWeekPage from "@/components/egb339/study-week/StudyWeekPage";

export function generateStaticParams() { return getEgb339Weeks().map((week) => ({ slug: week.slug })); }
export default async function Egb339WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const week = getEgb339Week(slug);
  if (!week) notFound();
  if (slug === "uke-1") return <WeekOnePage />;
  return <StudyWeekPage number={Number(week.week)} />;
}
