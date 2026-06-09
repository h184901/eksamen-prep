import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102ExamPatterns from "@/components/dat102/exam/Dat102ExamPatterns";
import { getExamPatterns } from "@/lib/dat102-vault/loader";

export const metadata = {
  title: "Gjengangere — DAT102 eksamen",
  description:
    "Temaer, begreper og oppgaveformater som går igjen på tvers av DAT102-eksamenene.",
};

export default function GjengangerePage() {
  const patterns = getExamPatterns();
  return (
    <div>
      <Dat102Breadcrumbs
        trail={[
          { label: "Eksamen", href: "/dat102/eksamen" },
          { label: "Gjengangere" },
        ]}
      />
      <Dat102ExamPatterns patterns={patterns} />
    </div>
  );
}
