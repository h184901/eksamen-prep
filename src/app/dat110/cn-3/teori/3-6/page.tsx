"use client";

import { useState } from "react";
import Link from "next/link";

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">*</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function CN3Teori36Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.6 Metningskontroll: prinsipper</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.6</p>
        <h1 className="text-2xl font-bold mb-2">Metningskontroll: prinsipper</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Metning (congestion) oppstar nar for mange avsendere prover a sende for mye data
          gjennom nettverket. Forst forstaar du problemet og kostnaden — sa kommer TCPs
          losning i 3.7.
        </p>
      </div>

      <MustKnow items={[
        "Hva metning (congestion) er: ruterkoe overfylt, pakker gaar tapt",
        "Forskjell mellom flytkontroll (mottaker) og metningskontroll (nettverk)",
        "To arsaker til metning: burstete trafikk og for hoy samlet senderate",
        "Kostnader ved metning: lang forsinkelse, tapte pakker, unodvendig retransmisjon",
        "To tilnaerminger: nettverksassistert vs ende-til-ende metningskontroll",
        "TCP bruker ende-til-ende: infererer metning fra tap/forsinkelse",
      ]} />

      <Section title="1. Hva er metning?" defaultOpen={true}>
        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Definisjon</h4>
          <p className="text-sm"><strong>Metning</strong> oppstar nar ankomstraten av pakker ved en ruter overstiger raterens kapasitet til a videresende dem. Resultatet: ruterkoen vokser, pakker dropes.</p>
          <p className="text-sm mt-2">Dette er ulikt flytkontroll: flytkontroll beskytter <em>mottakerens</em> buffer. Metningskontroll beskytter <em>nettverket</em> (ruternes koekapasitet).</p>
        </Card>

        {/* Analogi */}
        <Card color="gold">
          <h4 className="font-bold mb-2">Analogi: Motorvei i rush-trafikk</h4>
          <p className="text-sm">Se for deg en motorvei med ett felt som innsnevres til ett smalere kryss:</p>
          <ul className="text-sm text-[var(--muted)] space-y-1 mt-2 list-disc list-inside">
            <li>Lav trafikk: alle kjorer flytende, ingen ko</li>
            <li>Moderat trafikk: noe ko ved innsnevringen, men data (biler) kommer frem</li>
            <li>Hoy trafikk: ko vokser eksponentielt, biler (pakker) gar tapt</li>
            <li>Ekstremt: jo mer bilister prover a kompensere, jo verre blir det</li>
          </ul>
          <p className="text-sm mt-2 font-bold">Metningskontroll = trafikkregulering pa motorveien</p>
        </Card>
      </Section>

      <Section title="2. Arsaker og kostnader ved metning" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="network">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Arsak 1: Begrenset ruterbufferkapasitet</h4>
            <p className="text-sm">Nettverket har endelig bufferkapasitet i ruterne. Nar koen er full → pakker droppes. Sender maa retransmittere → enda mer trafikk.</p>
          </Card>
          <Card color="network">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Arsak 2: For mange samtidige avsendere</h4>
            <p className="text-sm">Mange TCP-flyt deler en flaskehals-link. Hver sender "tror" linken er ledig og oker sin rate → kollektiv overbelastning.</p>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left text-red-700 dark:text-red-400">Kostnad ved metning</th>
                <th className="px-3 py-2 text-left">Forklaring</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lang koforsinkelse", "Pakker venter lenge i ruterkoen. Selv om pakker ikke tapes, oker RTT dramatisk."],
                ["Pakketap (drop)", "Fylt ruterbuffer → pakker kastes. TCP tolker dette som metningssignal."],
                ["Unodvendig retransmisjon", "Timeout for pakker som er i koen (ikke tapt) → sender retransmitterer → mer trafikk = verre metning."],
                ["Kastet arbeid oppstroms", "Ressursene brukt pa pakker som slipper gjennom N-1 rutere og droppes i den N-te er bortkastet. Verre i multihopp-nettverk."],
              ].map(([kostnad, forkl], i) => (
                <tr key={kostnad} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-bold text-xs text-red-600 dark:text-red-400">{kostnad}</td>
                  <td className="px-3 py-2 text-xs">{forkl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Visualisering av gjennomstromning vs last */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Gjennomstromning vs tilbud — metningseffekten</h4>
          <svg viewBox="0 0 300 160" className="w-full max-w-[400px] mx-auto">
            {/* Akser */}
            <line x1="40" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="40" y1="130" x2="40" y2="10" stroke="#94a3b8" strokeWidth="1.5"/>
            <text x="160" y="150" textAnchor="middle" fontSize="10" fill="#64748b">Tilbud (sendt rate)</text>
            <text x="10" y="70" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(-90,10,70)">Gjennomstr.</text>

            {/* Maksimal throughput-linje */}
            <line x1="40" y1="50" x2="280" y2="50" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4"/>
            <text x="283" y="53" fontSize="9" fill="#94a3b8">R/2</text>

            {/* Ideal-kurve */}
            <path d="M40,130 L160,50 L280,50" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="6,3"/>
            <text x="220" y="45" fontSize="9" fill="#22c55e">Ideal</text>

            {/* Realistisk kurve med metning */}
            <path d="M40,130 Q130,60 180,50 Q220,48 240,70 Q260,95 280,120" stroke="#ef4444" strokeWidth="2" fill="none"/>
            <text x="250" y="115" fontSize="9" fill="#ef4444">Faktisk</text>

            {/* Metningspunkt */}
            <circle cx="180" cy="50" r="4" fill="#f59e0b"/>
            <text x="175" y="38" fontSize="9" fill="#f59e0b" textAnchor="middle">Metning</text>
          </svg>
          <p className="text-xs text-[var(--muted)] text-center mt-2">Nar sendt rate overskrider kapasiteten, kollapser gjennomstromningen</p>
        </div>
      </Section>

      <Section title="3. To tilnaerminger til metningskontroll" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Nettverksassistert (Network-assisted)</h4>
            <p className="text-sm">Rutere gir <em>eksplisitt</em> tilbakemelding om metning til avsenderne.</p>
            <div className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              <p><strong>Eksempler:</strong></p>
              <p>• ATM ABR: rutere annonserer eksplisitt tillatt rate</p>
              <p>• ECN (Explicit Congestion Notification): ruter setter bit i IP-headeren</p>
              <p>• DECbit: ett metnings-bit settes i pakken</p>
            </div>
            <div className="mt-2 rounded bg-blue-100 dark:bg-blue-900/30 p-2 text-xs">
              <strong>Fordel:</strong> Raskt og presis. Ulempe: krever ruter-stotte, kompleksitet.
            </div>
          </Card>

          <Card color="network">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Ende-til-ende (End-to-end)</h4>
            <p className="text-sm">Endepunktene <em>infererer</em> metning fra observert oppforsel (tap, forsinkelse). Ingen ruter-stotte nodvendig.</p>
            <div className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              <p><strong>Slik gjor TCP det:</strong></p>
              <p>• Pakketap (timeout / 3 duplikat-ACKer) = metningssignal</p>
              <p>• Hoyere RTT-variasjon kan indikere kofylt</p>
              <p>• TCP CUBIC bruker RTT-basert deteksjon</p>
            </div>
            <div className="mt-2 rounded bg-cyan-100 dark:bg-cyan-900/30 p-2 text-xs">
              <strong>Fordel:</strong> Fungerer i alle nettverk. Ulempe: reaktivt, ikke proaktivt.
            </div>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">TCP bruker ende-til-ende</h4>
          <p className="text-sm">Standard TCP (Reno, Tahoe) bruker utelukkende ende-til-ende metningskontroll. IP-protokollen er "dum" — rutere teller ikke, annonserer ikke. TCP tolker tap som metning og reduserer senderate. Dette er prinsippet bak AIMD og slow start (se 3.7).</p>
          <div className="mt-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2 text-xs">
            <strong>ECN er et unntak:</strong> Nyere implementasjoner bruker ECN (RFC 3168) der rutere setter bits for a signalere metning proaktivt, men dette krever stotte i bade nettverksutstyr og OS.
          </div>
        </Card>
      </Section>

      <Section title="4. Sammenheng med flytkontroll — oversikt">
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Dimensjon</th>
                <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-400">Flytkontroll</th>
                <th className="px-3 py-2 text-left text-red-700 dark:text-red-400">Metningskontroll</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Beskytter", "Mottakerens buffer", "Nettverket (rutere)"],
                ["Signal", "rwnd (i TCP-header)", "Pakketap / 3 dup-ACK"],
                ["Kontrollert av", "Mottaker", "Sender"],
                ["Variabel", "rwnd", "cwnd"],
                ["Mekanisme", "Mottaker annonserer ledig plass", "AIMD, slow start"],
                ["Nodvendig for", "Ende-til-ende data integrity", "Nettverksstabilitet"],
              ].map(([dim, flyt, metning], i) => (
                <tr key={dim} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{dim}</td>
                  <td className="px-3 py-2 text-xs text-blue-600 dark:text-blue-400">{flyt}</td>
                  <td className="px-3 py-2 text-xs text-red-600 dark:text-red-400">{metning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori/3-5" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 3.5 Flytkontroll
        </Link>
        <Link href="/dat110/cn-3/teori/3-7" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          3.7 TCP metningskontroll →
        </Link>
      </div>
    </div>
  );
}
