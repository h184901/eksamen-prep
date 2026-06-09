import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102ExamOverview from "@/components/dat102/exam/Dat102ExamOverview";
import { getExamOverviewData } from "@/lib/dat102-vault/exam-adapter";

export const metadata = {
  title: "Eksamen — DAT102",
  description:
    "Tidligere DAT102-eksamener segmentert oppgave for oppgave, med ærlig status for skannet/delvis materiale.",
};

export default function EksamenPage() {
  const data = getExamOverviewData();
  return (
    <div>
      <Dat102Breadcrumbs trail={[{ label: "Eksamen" }]} />
      <Dat102ExamOverview data={data} />
    </div>
  );
}
