import Link from "next/link";
import CalculationRunner from "@/components/dat110/oving/CalculationRunner";
import drillsData from "@/data/dat110-vault/calculation-drills.json";
import type {
  CalculationDrill,
  CalculationDrillsDataset,
} from "@/components/dat110/oving/calculation-types";

export const metadata = {
  title: "Regneøving — DAT110",
  description:
    "Drill regneoppgaver i delay, throughput, Chord finger-table, subnetting, vektor-klokker, distance vector og overlay-multicast. Selvgradert med 'Vis løsning'-fasit.",
};

const dataset = drillsData as CalculationDrillsDataset;
const drills: CalculationDrill[] = dataset.drills;

export default function CalculationDrillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Brødsmuler"
        className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6 flex-wrap"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span aria-hidden>/</span>
        <Link href="/dat110/oving" className="hover:text-[var(--accent)]">
          Øving
        </Link>
        <span aria-hidden>/</span>
        <span className="text-neutral-700 dark:text-neutral-200">Regneøving</span>
      </nav>

      {/* Hero */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">
          Regneøving
        </h1>
        <p className="text-neutral-700 dark:text-neutral-200 max-w-3xl">
          Tren på de regne-tunge eksamen-mønstrene: delay-komponenter, throughput-flaskehals,
          Chord finger-tabell og lookup, subnetting/forwarding, vektor-klokker, distance-vector
          og overlay-multicast-trær. Hver oppgave har «Vis løsning»-accordion med stegvis
          gjennomgang og fasit — du vurderer ditt eget svar mot fasiten.
        </p>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
          {drills.length} drills · Selvgradert (ingen autograder) · Mobilvennlig
        </p>
      </header>

      <CalculationRunner drills={drills} />
    </div>
  );
}
