import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102OvingHub from "@/components/dat102/oving/Dat102OvingHub";
import { getOvingOverview } from "@/lib/dat102-vault/oving-adapter";

export const metadata = {
  title: "Øving — DAT102",
  description:
    "Quiz, flashcards, matching og drills for DAT102 — bygget fra kurs- og eksamensmateriellet.",
};

export default function OvingHubPage() {
  const overview = getOvingOverview();
  return (
    <div>
      <Dat102Breadcrumbs trail={[{ label: "Øving" }]} />
      <Dat102OvingHub overview={overview} />
    </div>
  );
}
