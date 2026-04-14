"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-3")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/cn-3/teori",
    title: "Teori",
    description:
      "UDP vs TCP, 3-veis handshake, pålitelig dataoverføring (Go-Back-N og Selective Repeat), flytkontroll og metningskontroll med AIMD.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/cn-3/formler",
    title: "Formler",
    description:
      "TCP-segmentformat, vindustørrelse og flytkontroll, AIMD-regler, RDT-tilstandsdiagrammer og ACK/sekvensnummer-beregninger.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/cn-3/oppgaver",
    title: "Oppgaver",
    description:
      "Øvingsoppgaver om Go-Back-N og Selective Repeat, TCP-sekvensdiagram, metningskontroll og eksamensoppgaver i eksamensstil.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/cn-3/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv simulering av sliding window, AIMD-kurven med congestion events og animert 3-veis handshake.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "3.1 Introduksjon og transportlagets tjenester",
  "3.2 Multipleksing og demultipleksing (porter)",
  "3.3 UDP — header, checksum og brukstilfeller",
  "3.4 Pålitelig dataoverføring — RDT, stop-and-wait, Go-Back-N, Selective Repeat",
  "3.5 TCP — segmentformat, sekvensnummer, ACK, 3-veis handshake, tilstandsmaskin",
  "3.5 Flytkontroll — mottakervindu (rwnd)",
  "3.5 Metningskontroll — slow start, congestion avoidance, fast retransmit, AIMD",
];

export default function CN3Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Transportlaget er bindeleddet mellom applikasjonen og nettverket. Her
        lærer du forskjellen på <strong>UDP</strong> og <strong>TCP</strong>,
        hvordan TCP garanterer pålitelig levering gjennom sekvensnummer og ACK,
        og hvordan <strong>metningskontroll</strong> (AIMD) holder internett fra
        å kollapse.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`block rounded-xl border-2 ${page.color} bg-[var(--card)] p-5 hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{page.icon}</span>
              <h2 className="font-bold text-lg">{page.title}</h2>
            </div>
            <p className="text-sm text-[var(--muted)]">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Temaer i dette kapittelet</h2>
        <ul className="space-y-2">
          {temaer.map((tema) => (
            <li key={tema} className="flex items-start gap-2 text-sm">
              <span className="text-network-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
          Eksamenstips for CN-3
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Go-Back-N vs Selective Repeat — kjenn vindusstørrelse og hva som re-sendes ved tap</li>
          <li>▸ 3-veis handshake (SYN, SYN-ACK, ACK) er hyppig flervalgsoppgave</li>
          <li>▸ AIMD: cwnd halveres ved congestion, øker lineært i congestion avoidance</li>
          <li>▸ UDP checksum-beregning med én-komplement-addisjon kan komme som regnestykke</li>
        </ul>
      </div>
    </div>
  );
}
