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

export default function CN3Teori34Page() {
  const [showHandshakeStep, setShowHandshakeStep] = useState<number | null>(null);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.4 TCP — segmentstruktur og palitelighet</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.4 — EKSAMENSKRITISK</p>
        <h1 className="text-2xl font-bold mb-2">TCP — Segmentstruktur og palitelighet</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          TCP er den komplekse, palitelige transportprotokollen. Her laerer du TCP-segmentets
          header-felt, hvordan sekvensnummer og ACK fungerer, 3-veis handshake og
          timeout-beregningen. Alle disse er eksamensklassikere.
        </p>
      </div>

      <MustKnow items={[
        "TCP-segmentets header-felt og hva hvert betyr (20 bytes minimum)",
        "Sekvensnummer = byte-offset til forste byte i segmentet",
        "ACK-nummer = neste forventede byte fra motparten",
        "3-veis handshake: SYN → SYN-ACK → ACK (og hvorfor 3 trinn)",
        "Timeout-beregning: SampleRTT, EstimatedRTT (EWMA), DevRTT, TimeoutInterval",
        "TCP-mekanismer: checksum, timer, sekvensummer, ACK (som rdt 3.0 i praksis)",
        "TCP = full-duplex, connection-oriented, palitelig, point-to-point",
      ]} />

      <Section title="1. TCP-segmentformat (header)" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">TCP-headeren er <strong>minimum 20 bytes</strong> (uten opsjoner). Hvert felt er kritisk for eksamen.</p>

        {/* Visuelt segmentformat */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="text-xs text-center text-[var(--muted)] mb-1">32 bits bred</div>
            <div className="border-2 border-blue-400/60 rounded-lg overflow-hidden text-xs font-mono">
              <div className="grid grid-cols-2 border-b border-blue-300/40">
                <div className="border-r border-blue-300/40 bg-blue-100 dark:bg-blue-900/30 p-2 text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-400">Source Port (16)</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 text-center">
                  <p className="font-bold text-blue-700 dark:text-blue-400">Destination Port (16)</p>
                </div>
              </div>
              <div className="border-b border-blue-300/40 bg-amber-50 dark:bg-amber-950/20 p-2 text-center">
                <p className="font-bold text-amber-700 dark:text-amber-400">Sequence Number (32)</p>
                <p className="text-[var(--muted)] font-sans text-xs">Byte-offset til forste data-byte i segmentet</p>
              </div>
              <div className="border-b border-blue-300/40 bg-amber-50 dark:bg-amber-950/20 p-2 text-center">
                <p className="font-bold text-amber-700 dark:text-amber-400">Acknowledgement Number (32)</p>
                <p className="text-[var(--muted)] font-sans text-xs">Neste forventede byte fra motparten</p>
              </div>
              <div className="grid border-b border-blue-300/40" style={{gridTemplateColumns: "1fr 1fr 2fr"}}>
                <div className="border-r border-blue-300/40 bg-purple-50 dark:bg-purple-950/20 p-2 text-center">
                  <p className="font-bold text-purple-700 dark:text-purple-400">Hdr len (4)</p>
                </div>
                <div className="border-r border-blue-300/40 bg-neutral-50 dark:bg-neutral-900/40 p-2 text-center">
                  <p className="font-bold text-xs">Flags (6)</p>
                  <p className="text-[var(--muted)] font-sans text-xs">URG ACK PSH RST SYN FIN</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 p-2 text-center">
                  <p className="font-bold text-green-700 dark:text-green-400">Receive Window (16)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-blue-300/40">
                <div className="border-r border-blue-300/40 bg-blue-50 dark:bg-blue-950/20 p-2 text-center">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Checksum (16)</p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900/40 p-2 text-center">
                  <p className="font-bold text-xs">Urgent data pointer (16)</p>
                </div>
              </div>
              <div className="border-b border-blue-300/40 bg-neutral-100 dark:bg-neutral-800/30 p-2 text-center">
                <p className="font-bold text-xs text-[var(--muted)]">Options (variabel, typisk 0 eller 12 bytes)</p>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900/40 p-2 text-center">
                <p className="font-bold text-[var(--muted)]">Data (payload)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feltforklaringer */}
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          {[
            { felt: "Source/Dest Port", farge: "text-blue-600 dark:text-blue-400", besk: "16-bit. Kildeport og destinasjonsport. Brukes til multipleksing/demultipleksing (4-tuple)." },
            { felt: "Sequence Number", farge: "text-amber-600 dark:text-amber-400", besk: "32-bit. Byte-nummeret til forste dataByte i dette segmentet. Ikke pakkenummer — byte-stream!" },
            { felt: "Acknowledgement Number", farge: "text-amber-600 dark:text-amber-400", besk: "32-bit. Neste forventede byte fra motparten. Eks: ACK=1001 betyr 'Jeg har mottatt byte 0-1000, send 1001 neste'." },
            { felt: "Header Length", farge: "text-purple-600 dark:text-purple-400", besk: "4-bit. Headerens lengde i 32-bit ord. Nodvendig fordi Options-feltet er variabelt." },
            { felt: "Flagg (SYN, FIN, ACK, RST...)", farge: "text-red-600 dark:text-red-400", besk: "SYN=tilkoblingsoppsett, FIN=avslutning, ACK=kvittering aktiv, RST=tilbakestill, PSH=push data opp." },
            { felt: "Receive Window (rwnd)", farge: "text-green-600 dark:text-green-400", besk: "16-bit. Mottakerens bufferkapasitet. Brukes til flytkontroll — sender sender ikke mer enn rwnd bytes." },
            { felt: "Checksum", farge: "text-blue-600 dark:text-blue-400", besk: "16-bit. 1s komplement-sum. Feildeteksjon (samme algoritme som UDP)." },
            { felt: "Options", farge: "text-neutral-500", besk: "Variabel. Vanlig: MSS (Maximum Segment Size), window scaling, timestamps." },
          ].map(({ felt, farge, besk }) => (
            <div key={felt} className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
              <p className={`font-bold text-sm ${farge} mb-1`}>{felt}</p>
              <p className="text-xs text-[var(--muted)]">{besk}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="2. Sekvensnummer og ACK — byte-stream-modellen" defaultOpen={true}>
        <Card color="gold">
          <h4 className="font-bold mb-3">Viktig: TCP er en byte-stream!</h4>
          <p className="text-sm">TCP nummererer <em>bytes</em>, ikke segmenter. Sekvensnummeret er byte-offsetet til forste databyte i segmentet.</p>
          <div className="mt-3 rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3 font-mono text-sm">
            <p className="text-xs font-bold text-[var(--muted)] mb-2">Eksempel: A sender 10 bytes til B, MSS=5</p>
            <div className="space-y-1 text-xs">
              <div className="flex gap-2 items-center">
                <span className="w-24 text-[var(--muted)]">Segment 1:</span>
                <span className="text-blue-600 dark:text-blue-400">seq=0</span>
                <span className="text-[var(--muted)]">(bytes 0-4)</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-24 text-[var(--muted)]">Segment 2:</span>
                <span className="text-blue-600 dark:text-blue-400">seq=5</span>
                <span className="text-[var(--muted)]">(bytes 5-9)</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-24 text-[var(--muted)]">B sitt svar:</span>
                <span className="text-green-600 dark:text-green-400">ACK=5</span>
                <span className="text-[var(--muted)]">("neste forventede byte er 5")</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-24 text-[var(--muted)]">B sitt svar:</span>
                <span className="text-green-600 dark:text-green-400">ACK=10</span>
                <span className="text-[var(--muted)]">("mottatt alt, neste er 10")</span>
              </div>
            </div>
          </div>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Kumulative ACKer</h4>
          <p className="text-sm">TCP bruker <strong>kumulative ACKer</strong>: ACK(n) betyr "jeg har mottatt alle bytes opp til n-1". Det forenkler haandtering av out-of-order pakker — bare ACK den siste sammenhengende sekvensen.</p>
        </Card>
      </Section>

      <Section title="3. Timeout-beregning (RTT-estimering)" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">For langt timeout → tregere feilrettelse. For kort → unodvendige retransmisjoner. TCP estimerer RTT dynamisk.</p>

        <FormulaBox
          latex="\text{EstimatedRTT} = (1-\alpha) \cdot \text{EstimatedRTT} + \alpha \cdot \text{SampleRTT}"
          title="TCP RTT-estimat (EWMA — Exponential Weighted Moving Average)"
          variant="gold"
          description="Typisk alfa = 0,125 (1/8). Vektlegger nyere maalinger mer enn eldre."
        />

        <FormulaBox
          latex="\text{DevRTT} = (1-\beta) \cdot \text{DevRTT} + \beta \cdot |\text{SampleRTT} - \text{EstimatedRTT}|"
          title="DevRTT — variansen i RTT (maal pa usikkerhet)"
          variant="blue"
          description="Typisk beta = 0,25 (1/4). Stor DevRTT → stor usikkerhet → trenger storre sikkerhetsmargin."
        />

        <FormulaBox
          latex="\text{TimeoutInterval} = \text{EstimatedRTT} + 4 \cdot \text{DevRTT}"
          title="TCP TimeoutInterval"
          variant="gold"
          description="Faktor 4 gir tilstrekkelig sikkerhetsmargin. Starter typisk pa 1 sekund."
        />

        <Card color="blue">
          <h4 className="font-bold mb-2">Hva er SampleRTT?</h4>
          <p className="text-sm">SampleRTT er tid fra et segment sendes til ACK mottas. TCP maler KUN for ett segment om gangen (Karn-algoritmen: mal ikke retransmitterte segmenter — kan ikke vite om ACK tilhorer orginalen eller retransmisjonen).</p>
        </Card>

        <Card color="gold">
          <h4 className="font-bold mb-2">Gjennomgatt eksempel — RTT-beregning</h4>
          <div className="text-sm space-y-2">
            <p><strong>Gitt:</strong> EstimatedRTT = 100 ms, DevRTT = 5 ms, ny SampleRTT = 120 ms (alfa=0.125, beta=0.25)</p>
            <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3 space-y-1 text-xs font-mono">
              <p>Ny EstimatedRTT = (1-0.125) * 100 + 0.125 * 120</p>
              <p className="ml-4">= 0.875 * 100 + 0.125 * 120</p>
              <p className="ml-4">= 87.5 + 15 = <strong className="text-amber-700 dark:text-amber-400">102.5 ms</strong></p>
              <p className="mt-2">Ny DevRTT = (1-0.25) * 5 + 0.25 * |120 - 102.5|</p>
              <p className="ml-4">= 0.75 * 5 + 0.25 * 17.5</p>
              <p className="ml-4">= 3.75 + 4.375 = <strong className="text-blue-600 dark:text-blue-400">8.125 ms</strong></p>
              <p className="mt-2">TimeoutInterval = 102.5 + 4 * 8.125 = <strong className="text-green-600 dark:text-green-400">135 ms</strong></p>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="4. 3-veis handshake" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">Fordi TCP er connection-oriented, maa en tilkobling etableres for data kan sendes. Handshaken initialiserer sekvensnumrene for begge retninger.</p>

        {/* Sekvensdiagram */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="grid grid-cols-3 text-center mb-2">
              <div className="font-bold text-sm text-blue-600 dark:text-blue-400">Klient</div>
              <div className="text-xs text-[var(--muted)]">Nett</div>
              <div className="font-bold text-sm text-green-600 dark:text-green-400">Server</div>
            </div>

            {/* Steg 1: SYN */}
            <div className="relative flex items-center my-3">
              <div className="w-1/3 text-right">
                <div className="inline-block bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded px-2 py-1 text-xs">
                  <p className="font-bold text-blue-700 dark:text-blue-400">SYN</p>
                  <p className="text-[var(--muted)]">seq=x, SYN=1</p>
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <div className="w-full h-0.5 bg-blue-400 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 border-r-8 border-y-4 border-y-transparent border-r-blue-400"></div>
                </div>
              </div>
              <div className="w-1/3 text-xs text-[var(--muted)] pl-2">Velger ISN x</div>
            </div>

            {/* Steg 2: SYN-ACK */}
            <div className="relative flex items-center my-3">
              <div className="w-1/3 text-xs text-[var(--muted)] text-right pr-2">Velger ISN y</div>
              <div className="w-1/3 flex items-center justify-center">
                <div className="w-full h-0.5 bg-green-400 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 border-l-8 border-y-4 border-y-transparent border-l-green-400"></div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="inline-block bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded px-2 py-1 text-xs">
                  <p className="font-bold text-green-700 dark:text-green-400">SYN-ACK</p>
                  <p className="text-[var(--muted)]">seq=y, ACK=x+1</p>
                </div>
              </div>
            </div>

            {/* Steg 3: ACK */}
            <div className="relative flex items-center my-3">
              <div className="w-1/3 text-right">
                <div className="inline-block bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded px-2 py-1 text-xs">
                  <p className="font-bold text-purple-700 dark:text-purple-400">ACK</p>
                  <p className="text-[var(--muted)]">ACK=y+1</p>
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <div className="w-full h-0.5 bg-purple-400 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 border-r-8 border-y-4 border-y-transparent border-r-purple-400"></div>
                </div>
              </div>
              <div className="w-1/3 text-xs text-green-600 dark:text-green-400 pl-2 font-bold">Tilkobling etablert!</div>
            </div>

            <div className="border-t border-[var(--card-border)] pt-2 mt-2">
              <p className="text-xs text-center text-[var(--muted)]">ISN = Initial Sequence Number (tilfeldig valgt for sikkerhet)</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { steg: "SYN", farge: "text-blue-600 dark:text-blue-400", besk: "Klient sender SYN (SYN-bit=1), velger tilfeldig ISN x. Allokerer buffere. SYN inneholder seq=x." },
            { steg: "SYN-ACK", farge: "text-green-600 dark:text-green-400", besk: "Server svarer med SYN-ACK: bekrefter klientens SYN (ACK=x+1), velger sin ISN y, allokerer buffere." },
            { steg: "ACK", farge: "text-purple-600 dark:text-purple-400", besk: "Klient sender ACK for serverens SYN (ACK=y+1). Tilkobling etablert begge veier. Kan inkludere data." },
          ].map(({ steg, farge, besk }) => (
            <Card color="network" key={steg}>
              <p className={`font-bold ${farge} mb-1`}>Steg: {steg}</p>
              <p className="text-xs text-[var(--muted)]">{besk}</p>
            </Card>
          ))}
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Hvorfor 3 trinn, ikke 2?</h4>
          <p className="text-sm">Med 2 trinn ville klienten ikke fa bekreftelse pa at serveren kan sende (kun motta). 3-veis handshake sikrer at <strong>begge</strong> parter bekrefter hverandres ISN og evne til a kommunisere i begge retninger. Det er ogsa beskyttelse mot gamle, forsinkede SYN-pakker.</p>
        </Card>
      </Section>

      <Section title="5. TCP palitelig overfoering — mekanismene">
        <p className="text-sm text-[var(--muted)] mb-3">TCP implementerer palitelig overfoering basert pa prinsippene fra rdt 3.0, men med utvidelser for byte-strommer og effektivitet.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Mekanisme</th>
                <th className="px-3 py-2 text-left">Formal</th>
                <th className="px-3 py-2 text-left">TCP-implementasjon</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Checksum", "Detektere bitfeil", "16-bit 1s komplement, som UDP"],
                ["Timer", "Detektere tap", "En timer for eldste ukvitterte segment"],
                ["Sekvensnummer", "Skille ny pakke fra duplikat", "32-bit byte-offset"],
                ["Acknowledgement", "Bekrefte mottak", "Kumulativ ACK = neste forventede byte"],
                ["Pipelining", "Effektivitet", "Sendervindu (min av cwnd og rwnd)"],
                ["Fast retransmit", "Raskt svar pa tap", "3 duplikat-ACKer → retransmitter"],
              ].map(([mek, formal, impl], i) => (
                <tr key={mek} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-bold text-xs text-cyan-600 dark:text-cyan-400">{mek}</td>
                  <td className="px-3 py-2 text-xs">{formal}</td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">{impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenssporsmal — fyll inn tabellen</h4>
          <p className="text-sm">Eksamen 2024 oppgave 4c: "What are the purposes of: Checksum / Timer / Sequence number / Acknowledgement?"</p>
          <div className="mt-2 space-y-1 text-xs">
            <p><strong>Checksum:</strong> Detektere bitfeil under overfoering</p>
            <p><strong>Timer:</strong> Detektere tap av segment (timeout → retransmisjon)</p>
            <p><strong>Sequence number:</strong> Skille ny pakke fra retransmisjon; ordne byte-strommen</p>
            <p><strong>Acknowledgement:</strong> Bekrefte at data er mottatt korrekt; fortelle motparten hva som er neste forventede byte</p>
          </div>
        </Card>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori/3-3" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 3.3 Palitelig dataoverforing
        </Link>
        <Link href="/dat110/cn-3/teori/3-5" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          3.5 Flytkontroll →
        </Link>
      </div>
    </div>
  );
}
