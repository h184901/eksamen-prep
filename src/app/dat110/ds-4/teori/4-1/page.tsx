"use client";
import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

type CommType = "persistent-async" | "persistent-sync" | "transient-async" | "transient-sync";

const commTypes: Record<CommType, {
  label: string;
  example: string;
  desc: string;
  realWorld: string;
  storedWhen: string;
  clientBlocks: string;
  color: string;
}> = {
  "persistent-async": {
    label: "Persistent + Asynkron",
    example: "E-post (SMTP)",
    desc: "Meldingen lagres av mellomliggende servere til mottakeren er klar. Klienten fortsetter umiddelbart etter sending.",
    realWorld: "Du sender en e-post. Serveren lagrer den. Mottakeren leser den når som helst — timene eller dager seinere.",
    storedWhen: "Alltid — til mottakeren er klar",
    clientBlocks: "Nei — bare til sending er akseptert",
    color: "green",
  },
  "persistent-sync": {
    label: "Persistent + Synkron",
    example: "Lagret kø med ACK",
    desc: "Meldingen lagres, men klienten venter på bekreftelse. Mer sjeldent i praksis.",
    realWorld: "Klient sender til kø og venter på ACK fra kø-systemet (ikke fra den endelige mottakeren).",
    storedWhen: "Alltid — til mottakeren er klar",
    clientBlocks: "Til kø-systemet bekrefter mottak",
    color: "blue",
  },
  "transient-async": {
    label: "Transient + Asynkron",
    example: "UDP / Datagram-socket",
    desc: "Meldingen kastes hvis mottakeren ikke er klar. Klienten blokkerer ikke.",
    realWorld: "UDP-pakke sendes — hvis mottakeren ikke lytter, går pakken tapt. Avsender vet ikke om den kom frem.",
    storedWhen: "Bare mens begge parter er aktive",
    clientBlocks: "Nei — fire-and-forget",
    color: "amber",
  },
  "transient-sync": {
    label: "Transient + Synkron",
    example: "TCP-socket / RPC / Telefon",
    desc: "Meldingen kastes hvis mottakeren ikke er klar. Klienten venter på svar (synkron).",
    realWorld: "Tradisjonell RPC: klienten sender og blokkerer til serveren svarer. Begge parter må kjøre samtidig.",
    storedWhen: "Bare mens begge parter er aktive",
    clientBlocks: "Ja — til server har svart",
    color: "red",
  },
};

const syncPoints = [
  {
    num: 1,
    title: "Synkronisering ved forespørselsinnlevering",
    desc: "Klienten blokkerer til mellomliggende servere har akseptert forespørselen. Den sender aldri direkte til serveren.",
    example: "MOM (Message-Oriented Middleware): klienten sender til kø og venter på ACK fra køen.",
    level: "Lavest",
  },
  {
    num: 2,
    title: "Synkronisering ved mottak av forespørsel",
    desc: "Klienten blokkerer til serveren faktisk begynner å behandle forespørselen (ikke bare akseptert av mellommann).",
    example: "Klienten sender og venter til serveren har mottatt og startet behandling — men ikke ferdig.",
    level: "Middels",
  },
  {
    num: 3,
    title: "Synkronisering etter fullført behandling",
    desc: "Klienten blokkerer helt til serveren har ferdigbehandlet forespørselen og sendt svar tilbake.",
    example: "Tradisjonell RPC: klienten venter på det fulle resultatet fra serveren.",
    level: "Høyest",
  },
];

export default function DS4_1Page() {
  const [activeComm, setActiveComm] = useState<CommType | null>(null);
  const [activeSyncPoint, setActiveSyncPoint] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<CommType | null>(null);

  const getColorClasses = (color: string) => {
    const map: Record<string, { border: string; bg: string; text: string; badge: string }> = {
      green: {
        border: "border-green-300 dark:border-green-700",
        bg: "bg-green-50 dark:bg-green-950/20",
        text: "text-green-700 dark:text-green-400",
        badge: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
      },
      blue: {
        border: "border-blue-300 dark:border-blue-700",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        text: "text-blue-700 dark:text-blue-400",
        badge: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
      },
      amber: {
        border: "border-amber-300 dark:border-amber-700",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        text: "text-amber-700 dark:text-amber-400",
        badge: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
      },
      red: {
        border: "border-red-300 dark:border-red-700",
        bg: "bg-red-50 dark:bg-red-950/20",
        text: "text-red-700 dark:text-red-400",
        badge: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
      },
    };
    return map[color];
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-4/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">4.1 Kommunikasjonsgrunnlag</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">4.1 Kommunikasjonsgrunnlag</h1>
        <p className="text-[var(--muted)] max-w-2xl mt-2">
          Grunnleggende kommunikasjonsmønstre i distribuerte systemer.
          To uavhengige dimensjoner: persistent vs transient (lagring), og synkron vs asynkron (venting).
          Kombinasjonen bestemmer systemets egenskaper.
        </p>
      </div>

      {/* 1. TO DIMENSJONER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">1. To uavhengige dimensjoner</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Persistent vs Transient */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
            <div className="font-bold text-blue-600 dark:text-blue-400">Dimensjon 1: Lagring</div>
            <div className="space-y-2">
              <div className="rounded p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <div className="font-semibold text-green-700 dark:text-green-400 text-sm">Persistent kommunikasjon</div>
                <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                  Meldingen <strong>lagres</strong> av mellomliggende servere til mottakeren er klar.
                  Sender og mottaker trenger <strong>ikke</strong> kjøre samtidig.
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1 italic">Analogi: e-post — du sender, den lagres, mottakeren leser seinere</p>
              </div>
              <div className="rounded p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <div className="font-semibold text-amber-700 dark:text-amber-400 text-sm">Transient kommunikasjon</div>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                  Meldingen <strong>kastes</strong> hvis mottakeren ikke er klar til å ta imot.
                  Mellomliggende servere lagrer meldingen kun så lenge de selv kjører.
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 italic">Analogi: telefonsamtale — begge parter må være tilkoblet</p>
              </div>
            </div>
          </div>

          {/* Synkron vs Asynkron */}
          <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
            <div className="font-bold text-blue-600 dark:text-blue-400">Dimensjon 2: Venting (synkronisering)</div>
            <div className="space-y-2">
              <div className="rounded p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-blue-700 dark:text-blue-400 text-sm">Synkron kommunikasjon</div>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  Senderen <strong>blokkerer</strong> til en bestemt synkroniseringspunkt er nådd
                  (ett av tre mulige nivåer — se under).
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 italic">Analogi: venter på svar i en chat-samtale</p>
              </div>
              <div className="rounded p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                <div className="font-semibold text-purple-700 dark:text-purple-400 text-sm">Asynkron kommunikasjon</div>
                <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
                  Senderen <strong>fortsetter umiddelbart</strong> etter at meldingen er sendt (eller akseptert av mellommann).
                  Ingen venting på mottakeren.
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 italic">Analogi: legger igjen en beskjed på svareren</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KOMBINASJONSMATRISE */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">2. Kombinasjonsmatrise — Klikk for detaljer</h2>
        <p className="text-sm text-[var(--muted)]">
          Klikk på en celle i matrisen for å se eksempler og egenskaper.
        </p>

        {/* Matrise */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-[var(--card-border)] px-3 py-2 bg-[var(--card)]"></th>
                <th className="border border-[var(--card-border)] px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                  Asynkron (sender fortsetter)
                </th>
                <th className="border border-[var(--card-border)] px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                  Synkron (sender blokkerer)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border border-[var(--card-border)] px-3 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Persistent<br/><span className="font-normal text-xs">(lagres)</span>
                </th>
                <td
                  className="border border-[var(--card-border)] px-4 py-3 cursor-pointer hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
                  onClick={() => setActiveComm(activeComm === "persistent-async" ? null : "persistent-async")}
                >
                  <div className="font-medium text-green-700 dark:text-green-400">Persistent-Async</div>
                  <div className="text-xs text-[var(--muted)] mt-1">E-post (SMTP)</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ Mest brukt i MOM</div>
                </td>
                <td
                  className="border border-[var(--card-border)] px-4 py-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                  onClick={() => setActiveComm(activeComm === "persistent-sync" ? null : "persistent-sync")}
                >
                  <div className="font-medium text-blue-700 dark:text-blue-400">Persistent-Sync</div>
                  <div className="text-xs text-[var(--muted)] mt-1">Kø med ACK</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Sjelden i praksis</div>
                </td>
              </tr>
              <tr>
                <th className="border border-[var(--card-border)] px-3 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                  Transient<br/><span className="font-normal text-xs">(kastes)</span>
                </th>
                <td
                  className="border border-[var(--card-border)] px-4 py-3 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                  onClick={() => setActiveComm(activeComm === "transient-async" ? null : "transient-async")}
                >
                  <div className="font-medium text-amber-700 dark:text-amber-400">Transient-Async</div>
                  <div className="text-xs text-[var(--muted)] mt-1">UDP / datagram</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Fire-and-forget</div>
                </td>
                <td
                  className="border border-[var(--card-border)] px-4 py-3 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  onClick={() => setActiveComm(activeComm === "transient-sync" ? null : "transient-sync")}
                >
                  <div className="font-medium text-red-700 dark:text-red-400">Transient-Sync</div>
                  <div className="text-xs text-[var(--muted)] mt-1">TCP / RPC / Telefon</div>
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">Tradisjonell modell</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Detaljpanel */}
        {activeComm && (() => {
          const comm = commTypes[activeComm];
          const colors = getColorClasses(comm.color);
          return (
            <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4 space-y-3`}>
              <div className={`font-bold ${colors.text}`}>{comm.label} — {comm.example}</div>
              <p className={`text-sm ${colors.text}`}>{comm.desc}</p>
              <p className={`text-sm ${colors.text}`}><strong>Eksempel: </strong>{comm.realWorld}</p>
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div className={`rounded p-2 ${colors.badge}`}>
                  <span className="font-medium">Lagres: </span>{comm.storedWhen}
                </div>
                <div className={`rounded p-2 ${colors.badge}`}>
                  <span className="font-medium">Sender blokkerer: </span>{comm.clientBlocks}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 3. TRE SYNKRONISERINGSPUNKTER */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">3. Tre synkroniseringspunkter</h2>
        <p className="text-sm text-[var(--muted)]">
          Synkron kommunikasjon kan ha tre ulike synkroniseringspunkter. Høyere nivå = mer venting.
          Klikk for å se detaljer.
        </p>

        {/* Visuell tidslinje */}
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <svg viewBox="0 0 600 120" className="w-full max-w-2xl mx-auto">
            {/* Tidslinje */}
            <line x1="20" y1="60" x2="580" y2="60" stroke="#e5e7eb" strokeWidth="2"/>
            <text x="10" y="100" fontSize="10" fill="#6b7280">Klient</text>
            <text x="10" y="25" fontSize="10" fill="#6b7280">Server</text>

            {/* Faser */}
            {/* Sending */}
            <rect x="20" y="50" width="100" height="20" rx="3" fill="#dbeafe"/>
            <text x="70" y="64" textAnchor="middle" fontSize="9" fill="#1d4ed8">sender</text>

            {/* Nettverkstransport */}
            <rect x="130" y="50" width="120" height="20" rx="3" fill="#e5e7eb"/>
            <text x="190" y="64" textAnchor="middle" fontSize="9" fill="#6b7280">i nettverket</text>

            {/* Server mottar */}
            <rect x="260" y="10" width="100" height="20" rx="3" fill="#dcfce7"/>
            <text x="310" y="24" textAnchor="middle" fontSize="9" fill="#166534">mottar</text>
            <line x1="310" y1="30" x2="310" y2="60" stroke="#16a34a" strokeWidth="1" strokeDasharray="3"/>

            {/* Server behandler */}
            <rect x="360" y="10" width="120" height="20" rx="3" fill="#bbf7d0"/>
            <text x="420" y="24" textAnchor="middle" fontSize="9" fill="#166534">behandler</text>
            <line x1="360" y1="30" x2="360" y2="60" stroke="#16a34a" strokeWidth="1" strokeDasharray="3"/>

            {/* Server ferdig */}
            <rect x="490" y="10" width="80" height="20" rx="3" fill="#86efac"/>
            <text x="530" y="24" textAnchor="middle" fontSize="9" fill="#14532d">ferdig</text>
            <line x1="490" y1="30" x2="490" y2="60" stroke="#16a34a" strokeWidth="1" strokeDasharray="3"/>

            {/* Synkroniseringspunkt 1 — ved mottak av mellommann */}
            <circle cx="120" cy="60" r="7" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
            <text x="120" y="64" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">1</text>
            <text x="120" y="82" textAnchor="middle" fontSize="8" fill="#d97706">kø/mellommann</text>

            {/* Synkroniseringspunkt 2 */}
            <circle cx="310" cy="60" r="7" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5"/>
            <text x="310" y="64" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">2</text>
            <text x="310" y="82" textAnchor="middle" fontSize="8" fill="#1d4ed8">server mottar</text>

            {/* Synkroniseringspunkt 3 */}
            <circle cx="490" cy="60" r="7" fill="#16a34a" stroke="#14532d" strokeWidth="1.5"/>
            <text x="490" y="64" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">3</text>
            <text x="490" y="82" textAnchor="middle" fontSize="8" fill="#14532d">server ferdig</text>

            {/* Blokkerings-piler */}
            <text x="40" y="105" fontSize="7" fill="#6b7280">Blokkerer til:</text>
          </svg>
        </div>

        <div className="space-y-3">
          {syncPoints.map((sp) => (
            <button
              key={sp.num}
              onClick={() => setActiveSyncPoint(activeSyncPoint === sp.num ? null : sp.num)}
              className="w-full text-left rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${
                  sp.num === 1 ? "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300" :
                  sp.num === 2 ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" :
                  "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                }`}>
                  {sp.num}
                </span>
                <div>
                  <div className="font-medium text-sm">{sp.title}</div>
                  <div className="text-xs text-[var(--muted)]">Synkroniseringsnivå: {sp.level}</div>
                </div>
                <span className="ml-auto text-[var(--muted)] text-xs">{activeSyncPoint === sp.num ? "▲" : "▼"}</span>
              </div>
              {activeSyncPoint === sp.num && (
                <div className="mt-3 pl-11 space-y-1 text-sm text-[var(--muted)]">
                  <p>{sp.desc}</p>
                  <p className="italic">Eksempel: {sp.example}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 4. KOMMUNIKASJONSSTILAR */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">4. Kommunikasjonsstilar i praksis</h2>

        <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Stil</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Type</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Eksempel</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Kjennetegn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">RPC</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-red-600 dark:text-red-400">Transient-Sync</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Java RMI, gRPC</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Blokkerer til svar. Begge parter må kjøre.</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">MOM</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Persistent-Async</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">RabbitMQ, Kafka, MQTT</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Lagres i kø. Tidsmessig løs kobling.</td>
              </tr>
              <tr>
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">UDP</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-amber-600 dark:text-amber-400">Transient-Async</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">DNS, streaming</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Ingen garantert levering. Rask men upålitelig.</td>
              </tr>
              <tr className="bg-[var(--card)]">
                <td className="border border-[var(--card-border)] px-3 py-2 font-medium">E-post</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-green-600 dark:text-green-400">Persistent-Async</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">SMTP</td>
                <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">Lagres på mailserver. Kan lese dager seinere.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
          <div className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Nøkkelinnsikt: Tidsmessig kobling</div>
          <p className="text-amber-700 dark:text-amber-400">
            <strong>Persistent kommunikasjon = tidsmessig løs kobling</strong>: sender og mottaker trenger ikke kjøre samtidig.
            Dette er en stor fordel i store systemer — server kan restartes uten at meldinger går tapt.
            Transient kommunikasjon = tidsmessig sterk kobling: begge parter MÅ kjøre simultant.
          </p>
        </div>
      </section>

      {/* Navigasjon */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-4/teori/4-2" className="hover:text-[var(--accent)] text-sm">
          4.2 RPC — Remote Procedure Call →
        </Link>
      </div>
    </div>
  );
}
