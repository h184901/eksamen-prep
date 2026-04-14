"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-2")!;
const progressSections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

const subPages = [
  {
    href: "/dat110/cn-2/teori",
    title: "Teori",
    description:
      "Klient-server vs P2P, HTTP (persistent/ikke-persistent, pipeline), cookies, web-cache, DNS-hierarki, iterativt/rekursivt oppslag, SMTP/FTP/POP3 og socket-programmering.",
    color: "border-network-400",
    icon: "📖",
  },
  {
    href: "/dat110/cn-2/formler",
    title: "Nøkkelkonsepter og formler",
    description:
      "HTTP-tidberegning (RTT + L/R), DNS-oppslagstid, P2P distribusjonstid vs klient-server — alle formler med forklaringer og «når bruker du hva»-guide.",
    color: "border-blue-400",
    icon: "🧮",
  },
  {
    href: "/dat110/cn-2/oppgaver",
    title: "Oppgaver",
    description:
      "HTTP-tidberegning i eksamensstil, DNS-oppslag steg for steg, socket-programmering og øvingsoppgaver fra forelesning med fullstendige løsninger.",
    color: "border-green-400",
    icon: "✏️",
  },
  {
    href: "/dat110/cn-2/visualiseringer",
    title: "Visualiseringer",
    description:
      "Interaktiv HTTP request/response-flyt (persistent vs ikke-persistent), DNS-hierarki oppslags-visualisering og sammenligning av arkitekturtyper.",
    color: "border-purple-400",
    icon: "📊",
  },
];

const temaer = [
  "2.1 Prinsipper for nettverksapplikasjoner — klient-server og P2P",
  "2.2 Websider og HTTP — ikke-persistent, persistent, pipeline, cookies, web-cache",
  "2.3 E-post — SMTP, POP3, IMAP",
  "2.4 DNS — hierarki, iterativt vs rekursivt oppslag, RR-typer, caching",
  "2.5 Peer-to-Peer filoverføring — BitTorrent og distribusjonstid",
  "2.6 Video-streaming og CDN (oversikt)",
  "2.7 Socket-programmering — TCP og UDP sockets i Java",
];

export default function CN2Page() {
  return (
    <div>
      <ProgressTracker chapterId={chapter.id} sections={progressSections} />

      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Kapittel 2 handler om <strong>applikasjonslaget</strong> — det øverste
        laget i TCP/IP-stakken der nettverksapplikasjoner lever. Du lærer
        hvordan HTTP, DNS, SMTP og FTP fungerer internt, og hvordan du
        programmerer mot nettverket via socket-API.
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

      <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-5">
        <h2 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
          Eksamenstips
        </h2>
        <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-200">
          <li>
            ▸ HTTP-tidberegning dukker ofte opp — lær formelen
            2RTT + L/R (ikke-persistent) og RTT + L/R (persistent)
          </li>
          <li>
            ▸ DNS: kjenn forskjellen mellom iterativt og rekursivt oppslag, og
            hvilke RR-typer (A, NS, CNAME, MX) som finnes
          </li>
          <li>
            ▸ TCP vs UDP socket — vit hvilke Java-klasser som brukes og
            hvordan programmeringsmodellen ser ut
          </li>
          <li>
            ▸ Klient-server vs P2P — forstå distribusjonstidsformlene og
            self-scalability
          </li>
        </ul>
      </div>
    </div>
  );
}
