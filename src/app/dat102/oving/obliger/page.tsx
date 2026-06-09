import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102ObligerPage from "@/components/dat102/obliger/Dat102ObligerPage";
import { getObligerView } from "@/lib/dat102-vault/exam-adapter";

export const metadata = {
  title: "Obliger — DAT102 øving",
  description:
    "DAT102s obligatoriske innleveringer med temaer, begreper og ærlig kildestatus.",
};

export default function ObligerPage() {
  const obliger = getObligerView();
  return (
    <div>
      <Dat102Breadcrumbs
        trail={[{ label: "Øving", href: "/dat102/oving" }, { label: "Obliger" }]}
      />
      <Dat102ObligerPage obliger={obliger} />
    </div>
  );
}
