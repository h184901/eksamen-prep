import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102Drills from "@/components/dat102/oving/Dat102Drills";
import { getDrillDataset } from "@/lib/dat102-vault/oving-adapter";

export const metadata = {
  title: "Drills — DAT102 øving",
  description:
    "Tracing, beregning og kodelesing steg for steg — med hint og full løsning.",
};

export default function DrillsPage() {
  const dataset = getDrillDataset();
  return (
    <div className="max-w-3xl mx-auto">
      <Dat102Breadcrumbs
        trail={[{ label: "Øving", href: "/dat102/oving" }, { label: "Drills" }]}
      />
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
          Drills
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          {dataset.items.length} oppgaver i tracing, beregning og kodelesing.
          Prøv selv først, vis hint hvis du står fast, og sjekk den stegvise
          løsningen.
        </p>
      </header>
      <Dat102Drills dataset={dataset} />
    </div>
  );
}
