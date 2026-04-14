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

export default function CN3Teori35Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.5 Flytkontroll og tilkoblingshaandtering</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.5</p>
        <h1 className="text-2xl font-bold mb-2">TCP — Flytkontroll og tilkoblingshaandtering</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Flytkontroll sikrer at senderen ikke overveldder mottakerens buffer.
          Tilkoblingshaandtering viser hvordan TCP etablerer og avslutter forbindelser.
          Forstaa forskjellen mellom flytkontroll (mottaker) og metningskontroll (nettverk).
        </p>
      </div>

      <MustKnow items={[
        "Flytkontroll: mottakerens bufferkapasitet begrenser avsenderens senderate",
        "rwnd (receive window) annonseres i TCP-headeren av mottakeren",
        "Senderens effektive vindu = min(cwnd, rwnd)",
        "Forskjell: flytkontroll = beskytte mottaker. Metningskontroll = beskytte nettverket",
        "TCP tilkoblingsavslutning: 4-trinns FIN-handshake (half-close mulig)",
        "TCP er full-duplex: to uavhengige byte-strommer i hver retning",
      ]} />

      <Section title="1. Flytkontroll (Flow Control)" defaultOpen={true}>
        <Card color="blue">
          <h4 className="font-bold mb-2">Problemet flytkontroll loser</h4>
          <p className="text-sm">Senderen kan sende raskere enn mottakeren kan behandle. Mottakerens TCP-buffer (mottaksvindu) kan bli full. Uten flytkontroll: mottakerens buffer overflommer, data mistes.</p>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Mottaksvinduet (rwnd)</h4>
          <p className="text-sm">Mottakeren annonserer sin ledige bufferkapasitet i <strong>Receive Window (rwnd)</strong>-feltet i TCP-headeren:</p>
          <div className="mt-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 p-3 font-mono text-sm">
            <p>rwnd = RcvBuffer - [LastByteRcvd - LastByteRead]</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">RcvBuffer = total bufferkapasitet (typisk 4096 bytes standard, kan vaere mye storre med window scaling). Formelen gir ledig plass.</p>
        </Card>

        <FormulaBox
          latex="\text{LastByteSent} - \text{LastByteAcked} \leq \text{rwnd}"
          title="Flytkontroll-betingelse for sender"
          variant="gold"
          description="Sender sørger for at antall ukvitterte bytes aldri overstiger rwnd. Sender bremseer ned hvis rwnd er liten."
        />

        {/* Visuell buffer-animasjon */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Buffer-visualisering</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--muted)] mb-1">Mottakers buffer (f.eks. 4096 bytes):</p>
              <div className="flex rounded-lg overflow-hidden border border-[var(--card-border)] text-xs">
                <div className="bg-blue-500 text-white px-2 py-2 text-center" style={{width: "30%"}}>
                  <span>Lest av app</span>
                </div>
                <div className="bg-amber-400 text-white px-2 py-2 text-center" style={{width: "40%"}}>
                  <span>Mottatt, ikke lest</span>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-2 text-center" style={{width: "30%"}}>
                  <span>Ledig (rwnd)</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                <span>0</span>
                <span className="text-blue-600">← lest</span>
                <span className="text-amber-600">← mottatt →</span>
                <span className="text-green-600">ledig →</span>
                <span>4096</span>
              </div>
            </div>
            <p className="text-xs text-[var(--muted)]">Mottakeren oppdaterer rwnd i hvert ACK-segment. Sender ser aldri mer enn rwnd bytes "i flyet".</p>
          </div>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Spesialtilfelle: rwnd = 0</h4>
          <p className="text-sm">Nar mottakeren annonserer rwnd=0 (buffer full), stopper senderen. Men: for a unnga deadlock, sender TCP fortsatt 1-byte "probe"-segmenter for a sjekke om buffer har blitt ledig.</p>
        </Card>
      </Section>

      <Section title="2. Flytkontroll vs Metningskontroll">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Flytkontroll</h4>
            <p className="text-sm font-bold">Beskytt mottakerens buffer</p>
            <ul className="text-sm text-[var(--muted)] space-y-1 mt-2 list-disc list-inside">
              <li>Kontrollert av mottaker</li>
              <li>Settes via rwnd i TCP-headeren</li>
              <li>Ende-til-ende problem</li>
              <li>"Mottakeren er for tregc"</li>
            </ul>
          </Card>
          <Card color="red">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Metningskontroll</h4>
            <p className="text-sm font-bold">Beskytt nettverket</p>
            <ul className="text-sm text-[var(--muted)] space-y-1 mt-2 list-disc list-inside">
              <li>Kontrollert av sender</li>
              <li>Settes via cwnd (congestion window)</li>
              <li>Nettverk-problem</li>
              <li>"Nettverket er overbelastet"</li>
            </ul>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Det effektive sendervinduet</h4>
          <p className="text-sm">Senderen begrenses av BEGGE:</p>
          <div className="mt-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3 font-mono text-sm text-center">
            Effektivt vindu = min(cwnd, rwnd)
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">I praksis: pa raskt LAN er rwnd vanligvis den bindende begrensningen. Pa tregt WAN er cwnd vanligvis bindende.</p>
        </Card>
      </Section>

      <Section title="3. TCP tilkoblingsavslutning (4-trinns FIN)">
        <p className="text-sm text-[var(--muted)] mb-3">Siden TCP er full-duplex maa <strong>begge sider</strong> avslutte sin sending-retning uavhengig. Dette gjoeres med 4 trinn (eller 3 hvis FIN og ACK kombineres).</p>

        {/* Sekvensdiagram FIN */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="grid grid-cols-3 text-center mb-2">
              <div className="font-bold text-sm text-blue-600 dark:text-blue-400">Klient</div>
              <div className="text-xs text-[var(--muted)]">Nett</div>
              <div className="font-bold text-sm text-green-600 dark:text-green-400">Server</div>
            </div>

            {[
              { fra: "klient", til: "server", msg: "FIN", detail: "FIN=1, seq=x", info: "Klient er ferdig med a sende", farge: "border-blue-300 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400" },
              { fra: "server", til: "klient", msg: "ACK", detail: "ACK=x+1", info: "Server bekrefter FIN", farge: "border-green-300 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400" },
              { fra: "server", til: "klient", msg: "FIN", detail: "FIN=1, seq=y", info: "Server er ferdig med a sende", farge: "border-green-300 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400" },
              { fra: "klient", til: "server", msg: "ACK", detail: "ACK=y+1", info: "Klient bekrefter. Vent 2*MSL", farge: "border-blue-300 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400" },
            ].map(({ fra, til, msg, detail, info, farge }, i) => (
              <div key={i} className="relative flex items-center my-3">
                {fra === "klient" ? (
                  <>
                    <div className="w-1/3 text-right">
                      <div className={`inline-block border rounded px-2 py-1 text-xs ${farge}`}>
                        <p className="font-bold">{msg}</p>
                        <p className="text-[var(--muted)] text-xs font-mono">{detail}</p>
                      </div>
                    </div>
                    <div className="w-1/3 flex items-center justify-center px-2">
                      <div className="w-full h-0.5 bg-blue-400 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 border-r-6 border-y-3 border-y-transparent border-r-blue-400"></div>
                      </div>
                    </div>
                    <div className="w-1/3 text-xs text-[var(--muted)] pl-1">{info}</div>
                  </>
                ) : (
                  <>
                    <div className="w-1/3 text-xs text-[var(--muted)] text-right pr-1">{info}</div>
                    <div className="w-1/3 flex items-center justify-center px-2">
                      <div className="w-full h-0.5 bg-green-400 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 border-l-6 border-y-3 border-y-transparent border-l-green-400"></div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className={`inline-block border rounded px-2 py-1 text-xs ${farge}`}>
                        <p className="font-bold">{msg}</p>
                        <p className="text-[var(--muted)] text-xs font-mono">{detail}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <Card color="network">
          <h4 className="font-bold mb-2">TIME-WAIT tilstand</h4>
          <p className="text-sm">Etter siste ACK venter klienten i <strong>TIME-WAIT</strong> (2 x MSL = Maximum Segment Lifetime, typisk 2 min). Grunnen: sikre at den siste ACKen ankommer serveren (ellers ville serveren sende FIN pa nytt). Etter TIME-WAIT er tilkoblingen virkelig lukket.</p>
        </Card>

        <Card color="gold">
          <h4 className="font-bold mb-2">Half-close</h4>
          <p className="text-sm">TCP tillater "half-close": en side kan sende FIN (ferdig med a sende) mens den andre fortsatt sender. Begge retninger av den full-duplex tilkoblingen avsluttes uavhengig.</p>
        </Card>
      </Section>

      <Section title="4. Oppsummering — TCP tjenester">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { egenskap: "Palitelig overfoering", besk: "Checksummer, timer, retransmisjon, sekvensnumre, ACKer sikrer at data ankommer korrekt." },
            { egenskap: "Ordnet levering", besk: "TCP sorterer segmenter via sekvensnumre og leverer i riktig rekkefolge til applikasjonen." },
            { egenskap: "Flytkontroll", besk: "rwnd fra mottaker hindrer overflom av mottakerens buffer." },
            { egenskap: "Metningskontroll", besk: "cwnd justeres dynamisk basert pa nettverkets tilstand (se 3.7)." },
            { egenskap: "Full-duplex", besk: "Data flyter i begge retninger over en enkelt tilkobling." },
            { egenskap: "Connection-oriented", besk: "3-veis handshake etablerer tilstand begge steder for dataoverforing." },
          ].map(({ egenskap, besk }) => (
            <div key={egenskap} className="rounded-lg bg-[var(--card)] border border-cyan-400/40 p-3">
              <p className="font-bold text-sm text-cyan-600 dark:text-cyan-400 mb-1">{egenskap}</p>
              <p className="text-xs text-[var(--muted)]">{besk}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori/3-4" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 3.4 TCP segmentstruktur
        </Link>
        <Link href="/dat110/cn-3/teori/3-6" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          3.6 Metningskontroll-prinsipper →
        </Link>
      </div>
    </div>
  );
}
