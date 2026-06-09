import Link from "next/link";
import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import Dat102Section from "@/components/dat102/Dat102Section";
import Dat102Visual from "@/components/dat102/Dat102Visual";
import Dat102WikilinkText, {
  Dat102ComingSoon,
} from "@/components/dat102/Dat102WikilinkText";
import BigOGrowthChart from "@/components/dat102/diagrams/BigOGrowthChart";
import StackQueueDiagram from "@/components/dat102/diagrams/StackQueueDiagram";
import TreeHeapGraphDiagram from "@/components/dat102/diagrams/TreeHeapGraphDiagram";
import HashingCollisionDiagram from "@/components/dat102/diagrams/HashingCollisionDiagram";

export const metadata = {
  title: "Oppsummering — DAT102",
  description:
    "Kompakt eksamensoppsummering for DAT102: kjøretider du må kunne, valg av datastruktur og plan for siste uka.",
};

// Kjøretidstabellen holder seg til det kildematerialet faktisk belegger
// (sorteringsordener, lineært/binært søk, BST/heap O(log n), hash ideelt O(1)).
// Graf-kompleksiteter er bevisst utelatt — de står kun i figurer i kildene.
const SEARCH_SORT_ROWS: {
  algo: string;
  typical: string;
  worst: string;
  note: string;
}[] = [
  { algo: "Lineært søk", typical: "O(n)", worst: "O(n)", note: "Eneste mulighet i usortert samling." },
  { algo: "Binærsøk", typical: "O(log n)", worst: "O(log n)", note: "Krever sortert tabell — halverer søkerommet." },
  { algo: "Selection sort", typical: "O(n²)", worst: "O(n²)", note: "Alltid n² sammenligninger, uansett input." },
  { algo: "Insertion sort", typical: "O(n²)", worst: "O(n²)", note: "Nesten sortert input gir nær O(n)." },
  { algo: "Shellsort", typical: "—", worst: "—", note: "Bedre enn innsetting i praksis; avhenger av gap-sekvensen." },
  { algo: "Quicksort", typical: "O(n log n)", worst: "O(n²)", note: "Verst ved uheldig pivot (f.eks. sortert input + første element)." },
  { algo: "Mergesort", typical: "O(n log n)", worst: "O(n log n)", note: "Stabil, men trenger ekstra tabellplass til fletting." },
  { algo: "Heapsort", typical: "O(n log n)", worst: "O(n log n)", note: "In-place via maks-heap." },
  { algo: "Radix sort", typical: "O(d·n)", worst: "O(d·n)", note: "d = antall siffer. Sammenligner aldri elementer direkte." },
];

const STRUCTURE_ROWS: { struct: string; cost: string; note: string }[] = [
  { struct: "Stabel (push/pop)", cost: "Konstant arbeid i toppen", note: "LIFO — alt skjer i samme ende." },
  { struct: "Kø (enqueue/dequeue)", cost: "Konstant arbeid i endene", note: "FIFO — sirkulær tabell unngår flytting." },
  { struct: "BST: søk/innsett", cost: "O(log n) balansert · O(n) degenerert", note: "Sortert innsetting gir «lenket liste»-tre." },
  { struct: "2-3-tre: søk/innsett", cost: "O(log n)", note: "Holder seg balansert ved splitting — verstefallet forsvinner." },
  { struct: "Heap: innsett/ta ut topp", cost: "O(log n)", note: "Toppen ligger alltid i rota; siver opp/ned langs én gren." },
  { struct: "Hashtabell: oppslag/innsett", cost: "O(1) ideelt", note: "Krever god hashfunksjon og lav load factor — ellers lange kjeder." },
  { struct: "Graf: BFS/DFS", cost: "Avhenger av representasjonen", note: "Nabomatrise vs naboliste gir ulik kostnad — se grafer-temaet." },
];

const CHOICE_ROWS: { need: string; pick: string }[] = [
  { need: "Raske oppslag på nøkkel", pick: "Hashtabell — [[hashing]] med god hashfunksjon og lav [[load factor]]." },
  { need: "Sortert rekkefølge + dynamisk innhold", pick: "[[binary search tree|Binært søketre]] (balansert: [[concepts/two-three-tree|2-3-tre]])." },
  { need: "Alltid tilgang til minste/største", pick: "[[heap|Heap / prioritetskø]] — toppen ligger i rota." },
  { need: "Angre/tilbakesporing (sist inn først ut)", pick: "[[stabel|Stabel]] — også brukt ved rekursjon." },
  { need: "Behandle i ankomstrekkefølge", pick: "[[kø|Kø]] — gjerne sirkulær tabell." },
  { need: "Søk i stor, sortert og stabil tabell", pick: "[[binærsøk|Binærsøk]] — O(log n) per oppslag." },
  { need: "Relasjoner og nettverk", pick: "[[topics/graphs|Graf]] med [[concepts/breadth-first-search|BFS]]/[[concepts/depth-first-search|DFS]]." },
];

const LAST_WEEK_PLAN: { day: string; text: string }[] = [
  { day: "Dag 1", text: "Skim alle temaene i [[topics/asymptotic-analysis|analyse]]-til-[[topics/graphs|grafer]]-løypa og noter hull. Bruk temasidene som sjekkliste." },
  { day: "Dag 2", text: "Kjøretid: lær tabellen her utenat, og øv på å sette opp [[big-o]] fra kodesnutter (løkker, nøstede løkker, halvering)." },
  { day: "Dag 3", text: "Sortering på papir: spor [[concepts/quicksort|quicksort]], [[flettesortering]] og [[radix sort]] steg for steg på en liten tabell." },
  { day: "Dag 4", text: "Hashing: regn [[load factor]], tegn [[concepts/separate-chaining|separate chaining]] og forklar når tabellen bør utvides." },
  { day: "Dag 5", text: "Trær og heap: tegn innsetting i [[binary search tree|BST]] og [[heap]], og traverser i pre-/in-/post-orden ([[concepts/tree-traversal|traversering]])." },
  { day: "Dag 6", text: "Grafer: [[concepts/graph-terminology|terminologi]], [[concepts/adjacency-matrix|nabomatrise]] vs [[concepts/adjacency-list|naboliste]], og kjør [[concepts/breadth-first-search|BFS]]/[[concepts/depth-first-search|DFS]] for hånd." },
  { day: "Dag 7", text: "Gå gjennom ukeplanen på pensumsiden for å sikre at ingen forelesninger er glemt — og hvil." },
];

export default function OppsummeringPage() {
  return (
    <div>
      <Dat102Breadcrumbs trail={[{ label: "Oppsummering" }]} />

      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
          Eksamensoppsummering
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Siste innspurt — det viktigste i kompakt form
        </h1>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed">
          Kjøretidene du må kunne, valg av datastruktur og en konkret plan for
          siste uka. Lenkene tar deg til full forklaring per begrep — og{" "}
          <Dat102ComingSoon>quiz og eksamensgjennomgang</Dat102ComingSoon>{" "}
          kobles på i neste fase.
        </p>
      </div>

      <Dat102Section
        eyebrow="Analyse"
        title="Vekstklassene"
        description="Alt i kurset måles mot disse kurvene. Klarer du å plassere en algoritme på riktig kurve, er halve analysespørsmålet løst."
      >
        <div className="grid lg:grid-cols-[1fr,18rem] gap-5 items-start">
          <Dat102Visual caption="Vekstkurver — jo brattere, desto verre for store n">
            <BigOGrowthChart />
          </Dat102Visual>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
            {(
              [
                ["O(1)", "— uavhengig av n: direkte oppslag, [[stabel]]-push."],
                ["O(log n)", "— halvering: [[binærsøk]], søk i balansert tre."],
                ["O(n)", "— én gjennomgang: [[concepts/linear-search|lineært søk]], traversering."],
                ["O(n log n)", "— dele og flette: [[flettesortering]], [[concepts/heapsort|heapsort]]."],
                ["O(n²)", "— nøstede løkker: [[concepts/selection-sort|selection]]/[[concepts/insertion-sort|insertion sort]]."],
              ] as const
            ).map(([klass, rest]) => (
              <li key={klass}>
                <strong className="font-mono font-semibold text-neutral-900 dark:text-neutral-50">
                  {klass}
                </strong>{" "}
                <Dat102WikilinkText text={rest} />
              </li>
            ))}
          </ul>
        </div>
      </Dat102Section>

      <Dat102Section
        eyebrow="Tabellene"
        title="Kjøretider du må kunne"
        description="Søk og sortering først, deretter datastrukturoperasjonene. Der kildene kun viser kompleksitet i figurer, sier vi det kvalitativt i stedet for å gjette."
      >
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b-2 border-dat102-300 dark:border-dat102-800">
                <th className="py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-50">Algoritme</th>
                <th className="py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-50">Typisk</th>
                <th className="py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-50">Verst</th>
                <th className="py-2 font-semibold text-neutral-900 dark:text-neutral-50">Husk</th>
              </tr>
            </thead>
            <tbody>
              {SEARCH_SORT_ROWS.map((r) => (
                <tr key={r.algo} className="border-b border-[var(--card-border)]/60 last:border-b-0">
                  <td className="py-2 pr-4 font-medium text-neutral-900 dark:text-neutral-50 whitespace-nowrap">{r.algo}</td>
                  <td className="py-2 pr-4 font-mono text-dat102-700 dark:text-dat102-300 whitespace-nowrap">{r.typical}</td>
                  <td className="py-2 pr-4 font-mono text-neutral-700 dark:text-neutral-200 whitespace-nowrap">{r.worst}</td>
                  <td className="py-2 text-[var(--muted)]">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b-2 border-dat102-300 dark:border-dat102-800">
                <th className="py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-50">Datastruktur</th>
                <th className="py-2 pr-4 font-semibold text-neutral-900 dark:text-neutral-50">Kostnad</th>
                <th className="py-2 font-semibold text-neutral-900 dark:text-neutral-50">Husk</th>
              </tr>
            </thead>
            <tbody>
              {STRUCTURE_ROWS.map((r) => (
                <tr key={r.struct} className="border-b border-[var(--card-border)]/60 last:border-b-0">
                  <td className="py-2 pr-4 font-medium text-neutral-900 dark:text-neutral-50">{r.struct}</td>
                  <td className="py-2 pr-4 text-dat102-700 dark:text-dat102-300">{r.cost}</td>
                  <td className="py-2 text-[var(--muted)]">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dat102Section>

      <Dat102Section
        eyebrow="Strukturene"
        title="Sentrale datastrukturer — visuelt"
        description="De tre figurene under dekker mesteparten av tegneoppgavene på eksamen."
      >
        <div className="space-y-5">
          <Dat102Visual caption="Stabel (LIFO) og kø (FIFO)">
            <StackQueueDiagram />
          </Dat102Visual>
          <Dat102Visual caption="Binært søketre, maks-heap og graf">
            <TreeHeapGraphDiagram />
          </Dat102Visual>
          <Dat102Visual caption="Hashing med kollisjonshåndtering (separate chaining)">
            <HashingCollisionDiagram />
          </Dat102Visual>
        </div>
      </Dat102Section>

      <Dat102Section
        eyebrow="Valg"
        title="Når bruker du hva?"
        description="Eksamen spør ofte «hvilken struktur ville du valgt — og hvorfor». Begrunnelsen teller mer enn navnet."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHOICE_ROWS.map((r) => (
            <div
              key={r.need}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
                {r.need}
              </p>
              <p className="text-sm text-neutral-800 dark:text-neutral-100 leading-relaxed">
                <Dat102WikilinkText text={r.pick} />
              </p>
            </div>
          ))}
        </div>
      </Dat102Section>

      <Dat102Section
        eyebrow="Planen"
        title="Siste uke før eksamen"
        description="Én økt per dag. Hver økt har en temaside som fasit."
      >
        <ol className="space-y-2.5">
          {LAST_WEEK_PLAN.map((p) => (
            <li
              key={p.day}
              className="flex items-start gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-dat102-100 text-dat102-700 dark:bg-dat102-900/40 dark:text-dat102-300 flex-shrink-0 mt-0.5">
                {p.day}
              </span>
              <p className="text-sm text-neutral-800 dark:text-neutral-100 leading-relaxed">
                <Dat102WikilinkText text={p.text} />
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-[var(--muted)]">
          Snarveier:{" "}
          <Link href="/dat102/temaer" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
            alle temaer
          </Link>
          {" · "}
          <Link href="/dat102/begreper" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
            begrepsregister
          </Link>
          {" · "}
          <Link href="/dat102/pensum" className="text-dat102-700 dark:text-dat102-300 font-medium hover:underline underline-offset-2">
            pensumplan
          </Link>
          {" · "}
          <Dat102ComingSoon>gjengangere (Phase 3)</Dat102ComingSoon>
        </p>
      </Dat102Section>
    </div>
  );
}
