"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-4")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/cn-4/teori",
    title: "Teori",
    description:
      "IPv4-datagramformat, fragmentering og reassemblering, CIDR og subnetting, NAT, avstandsvektor (Bellman-Ford), link-state (Dijkstra), OSPF og BGP.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/cn-4/formler",
    title: "Formler",
    description:
      "Longest-prefix match, CIDR-notasjon og subnettkalkulator, Bellman-Ford-oppdatering, Dijkstras algoritme steg for steg og BGP-attributter.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/cn-4/oppgaver",
    title: "Oppgaver",
    description:
      "Subnettoppgaver, longest-prefix match tabeller, kjør Dijkstra og Bellman-Ford for hånd, og klassiske eksamensoppgaver om IPv4 og ruting.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/cn-4/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv Dijkstra-animasjon, IPv4-datagramstruktur med klikk-forklaring, og CIDR-kalkulator som viser nettadresse og kringkastingsadresse.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "4.1 Introduksjon til nettverkslaget — forwarding vs routing",
  "4.2 Hva er inni en ruter? (input/output-porter, switching fabric)",
  "4.3 IPv4 — datagramformat, fragmentering, TTL, protokollfelt",
  "4.3 IPv4-adressering — CIDR, subnetting, longest-prefix match",
  "4.3 DHCP og NAT",
  "4.4 IPv6 (oversikt)",
  "5.2 Rutingalgoritmer — avstandsvektor (Bellman-Ford) og link-state (Dijkstra)",
  "5.3 Intra-AS ruting — OSPF",
  "5.4 Inter-AS ruting — BGP, eBGP vs iBGP",
];

export default function CN4Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Nettverkslaget bestemmer <strong>veien</strong> pakker tar gjennom
        internett. Her dekker vi IPv4-adressering med CIDR og subnetting,
        longest-prefix match i rutetabeller, NAT, og de to store
        rutingalgoritmene — <strong>Dijkstra</strong> (link-state) og{" "}
        <strong>Bellman-Ford</strong> (avstandsvektor).
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
          Eksamenstips for CN-4
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ Subnetting med CIDR er fast innslag — øv på å finne nettadresse, maske og kringkasting</li>
          <li>▸ Longest-prefix match: velg alltid det lengste prefikset som matcher destinasjonen</li>
          <li>▸ Dijkstra kjøres manuelt på eksamen — øv på å fylle ut tabellen iterasjon for iterasjon</li>
          <li>▸ Bellman-Ford: count-to-infinity-problemet og poisoned reverse er typiske teorispørsmål</li>
          <li>▸ NAT: forklar hvorfor det er kontroversiellt (bryter ende-til-ende-prinsippet)</li>
        </ul>
      </div>
    </div>
  );
}
