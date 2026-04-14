"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-4")!;
const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/ds-4/teori",
    title: "Teori",
    description:
      "RPC (synkron, asynkron, deferred synchronous), marshalling/unmarshalling, stubs, IDL, MQTT publish-subscribe, QoS-nivåer, overlay-nettverk og gossip-protokoller.",
    color: "border-blue-400",
    icon: "📖",
  },
  {
    href: "/dat110/ds-4/formler",
    title: "Nøkkelkonsepter",
    description:
      "RDP-formel, ALM-kostnader (link stress, stretch/RDP, tree cost), MQTT QoS-garantier og flooding-beregninger — med forklaringer og «når bruker du hva»-guide.",
    color: "border-cyan-400",
    icon: "🧮",
  },
  {
    href: "/dat110/ds-4/oppgaver",
    title: "Oppgaver",
    description:
      "RPC-feilscenarier (5 feilklasser), MQTT QoS-sammenligningsoppgaver, RDP-beregninger, ALM-kostberegninger og professorens øvingsoppgaver med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/ds-4/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktivt RPC-flydiagram (klient-stub → nettverk → server-stub → tjeneste), MQTT publish/subscribe-flyt og interaktiv RDP-kalkulator.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "4.1 Kommunikasjonsstilar — persistent/transient, synkron/asynkron",
  "4.2 RPC — Remote Procedure Call (synkron, tradisjonell)",
  "4.3 Asynkron RPC og Deferred Synchronous RPC",
  "4.4 Marshalling, unmarshalling, stubs og IDL",
  "4.5 RPC-feilklasser — 5 typer feil og håndtering",
  "4.6 Multicast RPC — sender til multiple RPC-servere",
  "4.7 Message-Oriented Middleware (MOM) — kø-basert kommunikasjon",
  "4.8 MQTT — publish/subscribe, broker, topics, QoS 0/1/2",
  "4.9 MQTT — retained messages, will messages, topic wildcards",
  "4.10 Application-Level Multicast (ALM) — overlay-nettverk",
  "4.11 ALM-kostnader — link stress, stretch/RDP, tree cost",
  "4.12 Flooding-basert multicast — strukturert og ustrukturert",
  "4.13 Gossip-baserte protokoller — anti-entropy og rumor spreading",
];

export default function DS4Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Dette kapittelet dekker <strong>kommunikasjon i distribuerte systemer</strong>:
        fra klassisk RPC (Remote Procedure Call) til moderne meldingsbasert kommunikasjon
        med MQTT, og videre til overlay-nettverk med Application-Level Multicast og
        gossip-protokoller. Eksamen tester spesielt RPC-feilhåndtering, MQTT QoS-nivåer
        og RDP-beregninger.
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
              <span className="text-blue-500 mt-0.5 shrink-0">▸</span>
              <span>{tema}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
          Eksamenstips for DS-4
        </h3>
        <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
          <li>▸ RPC-feilklasser: lær alle 5 feiltyper og hva klienten gjør i hvert tilfelle</li>
          <li>▸ MQTT QoS: forstå forskjellen mellom «at-most-once», «at-least-once» og «exactly-once»</li>
          <li>▸ RDP = overlay-sti-forsinkelse / beste fysiske sti-forsinkelse (lavere er bedre)</li>
          <li>▸ Link stress: tell hvor mange ganger en fysisk lenke krysses av overlay-meldingen</li>
          <li>▸ Asynkron RPC vs MOM: begge asynkrone, men MOM er i tillegg persistent (kø)</li>
        </ul>
      </div>
    </div>
  );
}
