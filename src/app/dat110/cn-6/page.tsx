"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-6")!;

const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/cn-6/teori",
    title: "Teori",
    description:
      "MAC-adresser og ARP-tabell, Ethernet-rammer, CSMA/CD, switch-læringsalgoritme, switch vs ruter, VLAN og DHCP.",
    color: "border-orange-400",
    icon: "📖",
  },
  {
    href: "/dat110/cn-6/formler",
    title: "Formler",
    description:
      "ARP-oppslag steg for steg, CSMA/CD effektivitet, VLAN-tagging (802.1Q) og Ethernet-rammeformat med feltlengder.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/cn-6/oppgaver",
    title: "Oppgaver",
    description:
      "Trace ARP-oppslag gjennom et nettverk, simuler switch-læring, forklar forskjellen på switch og ruter, og løs VLAN-oppgaver.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/cn-6/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv switch-læringsanimasjon, ARP-oppslag visualisert frame-for-frame og CSMA/CD kollisjonsdeteksjon.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "6.1 Introduksjon til linklaget — tjenester og ansvar",
  "6.2 Feildeteksjon — CRC og paritetsbiter",
  "6.3 Multiple access-protokoller — CSMA/CD",
  "6.4 Linklagsadressering — MAC-adresser og ARP",
  "6.4 ARP-tabell og ARP-forespørsel/svar (broadcast vs unicast)",
  "6.5 Ethernet — rammeformat, standarder og switched Ethernet",
  "6.4 DHCP — adressetildeling og fire-trinns prosess",
  "6.4 Switch — selvlæring, forwarding og flooding",
  "6.4 Switch vs ruter — likheter og forskjeller",
  "6.4 VLAN — portbasert segmentering og 802.1Q-tagging",
];

export default function CN6Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Linklaget er det laveste laget vi studerer i detalj — det sender rammer
        mellom to direkte tilkoblede noder. Her lærer du hvordan{" "}
        <strong>MAC-adresser</strong> og <strong>ARP</strong> brukes til
        lokal adressering, hvordan <strong>switches</strong> lærer seg
        nettverket automatisk, og hva som skiller en switch fra en ruter.
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
          Eksamenstips for CN-6
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ ARP-oppslag: når sendes broadcast vs unicast? — dette er hyppig flervalg</li>
          <li>▸ Switch-læring: kilde-MAC → port lagres; ukjent destinasjon → flood alle porter</li>
          <li>▸ Switch opererer på lag 2 (MAC), ruter på lag 3 (IP) — kjenn forskjellen</li>
          <li>▸ DHCP fire-trinns prosess: Discover → Offer → Request → Ack (husk: DORA)</li>
          <li>▸ VLAN-spørsmål: forklar hvorfor to porter i ulike VLAN ikke kan kommunisere direkte</li>
        </ul>
      </div>
    </div>
  );
}
