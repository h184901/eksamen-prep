"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";

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

export default function CN3Teori32Page() {
  const [showChecksumStep, setShowChecksumStep] = useState<number | null>(null);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.2 UDP</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.2</p>
        <h1 className="text-2xl font-bold mb-2">UDP — Connectionless Transport</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          UDP er det enkle, raske, forbindelsesløse transportprotokollen. Den legger til minimalt
          med overhead på toppen av IP. Forstå segmentformatet og checksumberegningen — begge
          er eksamensklassikere.
        </p>
      </div>

      <MustKnow items={[
        "UDP-segmentets fire felt og hva hvert felt betyr",
        "Checksum-beregning med 1s komplement (steg for steg)",
        "Hva mottakeren gjør ved checksum-verifisering (forventer 1111 1111 1111 1111)",
        "Fordeler og ulemper med UDP sammenlignet med TCP",
        "Typiske bruksområder for UDP: DNS, streaming, gaming, IoT",
        "UDP er connectionless: ingen handshake, ingen garanti for levering eller orden",
      ]} />

      <Section title="1. UDP-segmentformat" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">UDP-headeren er kun <strong>8 bytes</strong> (4 felt a 2 bytes = 16 bit hver). Dette er en stor fordel over TCP sin 20+ bytes header.</p>

        {/* Visuelt segmentformat */}
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="text-xs text-center text-[var(--muted)] mb-1">32 bits bred</div>
            <div className="border-2 border-cyan-400/60 rounded-lg overflow-hidden text-sm font-mono">
              <div className="grid grid-cols-2">
                <div className="border-r border-b border-cyan-400/40 bg-cyan-100 dark:bg-cyan-900/30 p-3 text-center">
                  <p className="font-bold text-cyan-700 dark:text-cyan-400">Source Port</p>
                  <p className="text-xs text-[var(--muted)]">16 bit — kildeporten</p>
                </div>
                <div className="border-b border-cyan-400/40 bg-cyan-100 dark:bg-cyan-900/30 p-3 text-center">
                  <p className="font-bold text-cyan-700 dark:text-cyan-400">Destination Port</p>
                  <p className="text-xs text-[var(--muted)]">16 bit — malporten</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="border-r border-b border-cyan-400/40 bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-400">Length</p>
                  <p className="text-xs text-[var(--muted)]">16 bit — header + data</p>
                </div>
                <div className="border-b border-cyan-400/40 bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-400">Checksum</p>
                  <p className="text-xs text-[var(--muted)]">16 bit — feildeteksjon</p>
                </div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900/40 p-3 text-center border-cyan-400/40">
                <p className="font-bold text-[var(--muted)]">Data (payload)</p>
                <p className="text-xs text-[var(--muted)]">Variabel lengde — applikasjonsdata</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          {[
            { felt: "Source Port", bits: "16", besk: "Avsenderens port. Brukes av mottakeren for å svare tilbake. Kan være 0 hvis svar ikke er nødvendig." },
            { felt: "Destination Port", bits: "16", besk: "Mottakerens port. KRITISK for demultipleksing — OS leverer til prosessen som lytter på denne porten." },
            { felt: "Length", bits: "16", besk: "Total lengde i bytes av UDP-segmentet (header + data). Minimumverdi = 8 (kun header, ingen data)." },
            { felt: "Checksum", bits: "16", besk: "1s komplement-sum av header og data. Brukes til å detektere bitfeil. Svakt, men rask feildeteksjon." },
          ].map(({ felt, bits, besk }) => (
            <div key={felt} className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-cyan-600 dark:text-cyan-400">{felt}</span>
                <span className="text-xs bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded font-mono">{bits} bit</span>
              </div>
              <p className="text-xs text-[var(--muted)]">{besk}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="2. Checksum-beregning (1s komplement)" defaultOpen={true}>
        <Card color="blue">
          <h4 className="font-bold mb-2">Algoritmen steg for steg</h4>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2"><span className="font-bold text-blue-600 dark:text-blue-400 w-6">1.</span><span>Del dataen opp i 16-bit ord</span></div>
            <div className="flex gap-2"><span className="font-bold text-blue-600 dark:text-blue-400 w-6">2.</span><span>Adder alle 16-bit ordene med <strong>1s komplement-addisjon</strong> (normal binæraddering, men carry-out fra MSB legges tilbake)</span></div>
            <div className="flex gap-2"><span className="font-bold text-blue-600 dark:text-blue-400 w-6">3.</span><span>Ta 1s komplementet av summen (flip alle bits)</span></div>
            <div className="flex gap-2"><span className="font-bold text-blue-600 dark:text-blue-400 w-6">4.</span><span>Resultatet er checksum-verdien som legges i checksum-feltet</span></div>
          </div>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Verifisering på mottakersiden</h4>
          <p className="text-sm">Mottakeren adderer alle mottatte 16-bit ord <strong>inkludert checksum-feltet</strong> (1s komplement-addisjon). Hvis ingen feil: resultatet skal være <code className="font-mono bg-cyan-100 dark:bg-cyan-900/30 px-1 rounded">1111 1111 1111 1111</code> (alle 1-ere).</p>
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 mt-2 text-sm">
            <p className="font-bold text-xs text-cyan-700 dark:text-cyan-400">Hvorfor?</p>
            <p className="text-xs text-[var(--muted)] mt-1">Checksum er komplementet av summen. Sum + komplement = alle 1-ere i 1s komplement-aritmetikk.</p>
          </div>
        </Card>

        {/* Gjennomgatt eksempel */}
        <Card color="gold">
          <h4 className="font-bold mb-3">Gjennomgatt eksempel (fra forelesning)</h4>
          <p className="text-sm mb-3">Beregn checksum for to 16-bit ord:</p>
          <div className="space-y-2 font-mono text-sm">
            <div className="rounded bg-white/60 dark:bg-neutral-900/40 p-3">
              <p className="text-xs font-bold text-[var(--muted)] mb-2">Ord 1 og Ord 2:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)] w-20">Ord 1:</span>
                  <span className="text-blue-600 dark:text-blue-400">1110 0110 0110 0110</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)] w-20">Ord 2:</span>
                  <span className="text-blue-600 dark:text-blue-400">1101 0101 0101 0101</span>
                </div>
                <hr className="border-amber-300 dark:border-amber-700 my-1" />
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)] w-20">Sum:</span>
                  <span className="text-orange-600 dark:text-orange-400">1 1011 1011 1011 1011</span>
                  <span className="text-xs text-red-600">(carry!)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)] w-20">Wrap carry:</span>
                  <span className="text-green-600 dark:text-green-400">1011 1011 1011 1100</span>
                  <span className="text-xs text-[var(--muted)]">(carry legges til)</span>
                </div>
                <hr className="border-amber-300 dark:border-amber-700 my-1" />
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--muted)] w-20">Checksum:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">0100 0100 0100 0011</span>
                  <span className="text-xs text-[var(--muted)]">(flip alle bits)</span>
                </div>
              </div>
            </div>
            <div className="rounded bg-amber-100 dark:bg-amber-900/30 p-2 text-xs">
              <strong>Viktig!</strong> Checksum er SVAK beskyttelse: hvis to bit-feil kansellerer hverandre (ett bit flippes i hvert ord på samme posisjon), endres ikke checksum. Dette kalles "weak protection".
            </div>
          </div>
        </Card>
      </Section>

      <Section title="3. UDP vs TCP — sammenligning">
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Egenskap</th>
                <th className="px-3 py-2 text-left text-cyan-700 dark:text-cyan-400">UDP</th>
                <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-400">TCP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tilkoblingsoppsett", "Ingen (connectionless)", "3-veis handshake"],
                ["Levering garantert?", "Nei — pakker kan gå tapt", "Ja — retransmisjon ved tap"],
                ["Rekkefølgekontroll", "Nei — pakker kan komme ute av orden", "Ja — ordnet levering"],
                ["Flytkontroll", "Nei", "Ja (rwnd)"],
                ["Metningskontroll", "Nei", "Ja (AIMD, slow start)"],
                ["Header-størrelse", "8 bytes (fast)", "20+ bytes (variabel)"],
                ["Forsinkelse", "Lav (ingen handshake, ingen ko-mekanisme)", "Høyere (handshake, retransmisjon)"],
                ["Bruksområder", "DNS, streaming, VoIP, gaming, IoT", "HTTP, e-post, filoverføring"],
              ].map(([egenskap, udp, tcp], i) => (
                <tr key={egenskap} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{egenskap}</td>
                  <td className="px-3 py-2 text-xs text-cyan-700 dark:text-cyan-400">{udp}</td>
                  <td className="px-3 py-2 text-xs text-blue-700 dark:text-blue-400">{tcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Fordeler med UDP og typiske bruksområder">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { tittel: "DNS (port 53)", desc: "Korte spørrings-/svarpar. Raskere uten tilkoblingsoppsett. Klienten sender på nytt selv ved tap.", color: "text-green-600 dark:text-green-400" },
            { tittel: "Streaming (video/lyd)", desc: "Noen tapte pakker godtas. Forsinkelse er verre enn tap. Applikasjonen kan selv håndtere gjenoppretting.", color: "text-blue-600 dark:text-blue-400" },
            { tittel: "Online gaming", desc: "Lav latens er kritisk. Eldre tilstandsdata er uinteressant. Applikasjonen håndterer tap sin måten.", color: "text-purple-600 dark:text-purple-400" },
            { tittel: "IoT-sensorer", desc: "Enkle enheter med lite minne. Trenger ikke garantert levering av hvert målepunkt.", color: "text-orange-600 dark:text-orange-400" },
          ].map(({ tittel, desc, color }) => (
            <div key={tittel} className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
              <p className={`font-bold text-sm ${color} mb-1`}>{tittel}</p>
              <p className="text-xs text-[var(--muted)]">{desc}</p>
            </div>
          ))}
        </div>

        <Card color="network">
          <h4 className="font-bold mb-2">Kan applikasjoner få pålitelig overføring over UDP?</h4>
          <p className="text-sm">Ja! Applikasjonen kan selv implementere pålitelighetsfunksjoner på toppen av UDP (f.eks. QUIC-protokollen fra Google). Dette gir mer kontroll enn TCP. QUIC er grunnlaget for HTTP/3.</p>
        </Card>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamensspørsmål: Velg UDP eller TCP</h4>
          <div className="space-y-2 text-sm">
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
              <p className="font-bold text-xs">Sensor som kontinuerlig rapporterer temperatur:</p>
              <p className="text-xs text-[var(--muted)]">UDP. Eldre avlesninger er uinteressante ved tap. Lav overhead viktigere enn garantert levering.</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
              <p className="font-bold text-xs">Kontrollsystem som apner/lukker ventil:</p>
              <p className="text-xs text-[var(--muted)]">TCP. Tap av kommandoen kan ha alvorlige konsekvenser. Pålitelig levering er kritisk.</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori/3-1" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 3.1 Multipleksing
        </Link>
        <Link href="/dat110/cn-3/teori/3-3" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          3.3 Pålitelig dataoverføring →
        </Link>
      </div>
    </div>
  );
}
