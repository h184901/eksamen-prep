"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 transition-colors"
        >
          Vis løsning
        </button>
      ) : (
        <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-4 text-sm space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-2 font-mono text-sm text-blue-800 dark:text-blue-300 my-2">
      {children}
    </div>
  );
}

function ExamYear({
  year,
  title,
  children,
}: {
  year: string;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">
            {year}
          </span>
          <span className="font-bold">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

/* IPv4 header diagram */
function IPv4Header({ highlight }: { highlight: string[] }) {
  const fields = [
    { name: "Version", bits: "4b" },
    { name: "IHL", bits: "4b" },
    { name: "Type of Service", bits: "8b" },
    { name: "Total Length", bits: "16b" },
    { name: "Identifier", bits: "16b" },
    { name: "Flags", bits: "3b" },
    { name: "Fragment Offset", bits: "13b" },
    { name: "TTL", bits: "8b" },
    { name: "Protocol", bits: "8b" },
    { name: "Header Checksum", bits: "16b" },
    { name: "Source IP", bits: "32b" },
    { name: "Destination IP", bits: "32b" },
    { name: "Data (Payload)", bits: "" },
  ];
  return (
    <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 overflow-x-auto">
      <p className="text-xs font-bold text-[var(--muted)] mb-2">IPv4 Datagram-header (forenkling)</p>
      <div className="grid grid-cols-2 gap-1 text-xs max-w-sm">
        {fields.map((f) => (
          <div
            key={f.name}
            className={`px-2 py-1 rounded border text-left ${
              highlight.includes(f.name)
                ? "border-network-400 bg-network-100 dark:bg-network-900/30 font-bold text-network-700 dark:text-network-300"
                : "border-neutral-200 dark:border-neutral-700 text-[var(--muted)]"
            }`}
          >
            {f.name} {f.bits && <span className="opacity-60">({f.bits})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Oppg4Tidligere() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Oppgave 4 handler om transportlagets protokoller og nettverkslaget. Typiske temaer er
        IP-headerfelter, TCP vs UDP, TCP 3-veis handshake, pålitelig dataoverføring
        (Go-Back-N, Selective Repeat) og TCP congestion control.
      </p>

      {/* Tipsboks */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm mb-2">
        <span className="font-bold text-amber-700 dark:text-amber-400">Gjentakende mønster: </span>
        <span className="text-amber-800 dark:text-amber-300">
          Eksamen spør alltid om: (1) spesifikke IP-headerfelter og hva de gjør, (2) TCP vs UDP
          sammenligningstabell, (3) TCP 3-veis handshake-sekvens.
          Memorér feltene og deres funksjoner — de er alltid de samme!
        </span>
      </div>

      {/* Jan 2025 */}
      <ExamYear year="Jan 2025" title="Oppgave 4 — IPv4 datagram og protokoller">
        <div className="text-sm text-[var(--muted)] space-y-1">
          <p>IPv4-datagram-struktur, felt og fragmentering. UDP kontra TCP.</p>
        </div>

        <IPv4Header highlight={["Identifier", "Flags", "Fragment Offset", "TTL", "Protocol", "Source IP", "Destination IP"]} />

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Hva er IP-tjenestens grunnprinsipp?</p>
            <Answer>
              <p>
                <strong>Upålitelig, forbindelsesløs, beste-innsats overføring av datagrammer</strong> fra kilde til destinasjon.
                IP gir ingen garanti for levering, rekkefølge eller fravær av duplikater. Det er transportlagets ansvar
                (TCP) å rette opp feil.
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Forklar feltene Identifier, Flags og Fragment Offset i IP-headeren.
            </p>
            <Answer>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Identifier (16 bit):</strong> Et unikt ID-nummer tilordnet det opprinnelige datagrammet.
                  Alle fragmenter av samme datagram har identisk Identifier — brukes til å identifisere hvilke
                  fragmenter som skal settes sammen igjen (reassemblering).
                </li>
                <li>
                  <strong>Flags (3 bit):</strong> Bit 0 = reservert (alltid 0). Bit 1 = DF (Don&apos;t Fragment).
                  Bit 2 = MF (More Fragments) — er 1 hvis det finnes flere fragmenter etter dette, 0 for siste fragment.
                </li>
                <li>
                  <strong>Fragment Offset (13 bit):</strong> Angir posisjonen til dette fragmentets data i det
                  originale datagrammet, målt i enheter av 8 bytes. Første fragment har offset=0.
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] mt-2">
                Huskeregel: Identifier = hvem hører jeg til? Flags MF = er det mer etter meg? Offset = hvor starter jeg?
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Hva betyr feltene TTL, Source IP, Destination IP og Protocol?
            </p>
            <Answer>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>TTL (Time To Live, 8 bit):</strong> Dekrementeres med 1 ved hvert ruterhopp.
                  Når TTL=0 kastes pakken og ICMP &quot;Time Exceeded&quot; sendes til avsender.
                  Hindrer pakker fra å sirkulere evig i rutingløkker.
                </li>
                <li>
                  <strong>Source IP (32 bit):</strong> IP-adressen til avsenderen. Endres ikke gjennom
                  rutere (med unntak av NAT).
                </li>
                <li>
                  <strong>Destination IP (32 bit):</strong> IP-adressen til mottakeren. Rutere bruker dette
                  feltet til å bestemme neste hopp i forwardingtabellen.
                </li>
                <li>
                  <strong>Protocol (8 bit):</strong> Angir hvilken protokoll i transportlaget som er
                  innkapslet i datafeltet. Verdi 6 = TCP, 17 = UDP, 1 = ICMP.
                </li>
              </ul>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              d) Hva er forskjellen mellom TCP og UDP? Gi minst 3 distinkte forskjeller.
            </p>
            <Answer>
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse w-full">
                  <thead>
                    <tr className="bg-network-100 dark:bg-network-900/30">
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">Egenskap</th>
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">TCP</th>
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">UDP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Forbindelsesoppsett", "3-veis handshake (SYN, SYN-ACK, ACK)", "Ingen — sender direkte"],
                      ["Pålitelighet", "Garantert levering (ACK + retransmisjon)", "Ingen garanti (best effort)"],
                      ["Rekkefølge", "Segmenter settes i riktig rekkefølge", "Ingen rekkefølgegaranti"],
                      ["Flyt-kontroll", "Sliding window (rwnd)", "Ingen"],
                      ["Congestion control", "AIMD (slow start, congestion avoidance)", "Ingen"],
                      ["Header-overhead", "20 byte minimum", "8 byte (fast)"],
                      ["Bruksområde", "HTTP, FTP, SSH, e-post", "DNS, streaming, gaming, VoIP"],
                    ].map(([prop, tcp, udp]) => (
                      <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1 font-bold">{prop}</td>
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1 text-blue-700 dark:text-blue-300">{tcp}</td>
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1 text-amber-700 dark:text-amber-300">{udp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Protocol-feltet (6=TCP, 17=UDP) og TTL er de feltene sensor oftest spør om. Lær dem utenat!
          </span>
        </div>
      </ExamYear>

      {/* Mai 2024 */}
      <ExamYear year="Mai 2024" title="Oppgave 4 — HTTP og protokollag">
        <div className="text-sm text-[var(--muted)] space-y-1">
          <p>HTTP persistent vs ikke-persistent, TCP-forbindelsesoppsett, pipelining.</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">
              a) Hva er forskjellen mellom HTTP persistent og ikke-persistent tilkobling?
            </p>
            <Answer>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Ikke-persistent:</strong> Ny TCP-tilkobling for hvert HTTP-objekt. Overhead: 2 RTT per
                  objekt (1 RTT TCP-handshake + 1 RTT forespørsel/svar). Brukes i HTTP/1.0.
                </li>
                <li>
                  <strong>Persistent uten pipelining:</strong> Samme TCP-tilkobling for alle objekter, men
                  klienten venter på svar før neste forespørsel sendes. 1 RTT per objekt etter første.
                </li>
                <li>
                  <strong>Persistent med pipelining:</strong> Klienten sender alle forespørsler i rekkefølge
                  uten å vente på svar (HTTP/1.1 default). Nesten 1 RTT for alle objekter — kraftig ytelsesgevinst.
                </li>
              </ul>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Beskriv TCP 3-veis handshake steg for steg.
            </p>
            <Answer>
              <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-3">
                <svg viewBox="0 0 380 160" className="w-full max-w-sm" fill="none">
                  <text x="60" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" className="fill-current">Klient</text>
                  <text x="300" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" className="fill-current">Server</text>
                  <line x1="60" y1="25" x2="60" y2="155" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="300" y1="25" x2="300" y2="155" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* SYN */}
                  <line x1="65" y1="50" x2="295" y2="70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="180" y="52" textAnchor="middle" fontSize="10" fill="#3b82f6">SYN (seq=x)</text>
                  {/* SYN-ACK */}
                  <line x1="295" y1="90" x2="65" y2="110" stroke="#10b981" strokeWidth="2" />
                  <text x="180" y="88" textAnchor="middle" fontSize="10" fill="#10b981">SYN-ACK (seq=y, ack=x+1)</text>
                  {/* ACK */}
                  <line x1="65" y1="130" x2="295" y2="148" stroke="#f59e0b" strokeWidth="2" />
                  <text x="180" y="128" textAnchor="middle" fontSize="10" fill="#f59e0b">ACK (ack=y+1)</text>
                  <defs>
                    <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
                <li><strong>SYN:</strong> Klient sender TCP-segment med SYN=1 og sitt initielle sekvensnummer (ISN=x). Klient er nå i SYN_SENT-tilstand.</li>
                <li><strong>SYN-ACK:</strong> Server svarer med SYN=1, ACK=1, eget ISN (y), og ack=x+1 (bekreftelse på klientens SYN). Server er i SYN_RCVD-tilstand.</li>
                <li><strong>ACK:</strong> Klient sender ACK=1 med ack=y+1. Forbindelsen er nå etablert (ESTABLISHED) på begge sider.</li>
              </ol>
              <p className="text-xs text-[var(--muted)] mt-1">Første datapakke kan piggybacke på det siste ACK-segmentet.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              c) Hva er UDP-sjekksum og hvorfor er den frivillig?
            </p>
            <Answer>
              <p>UDP-sjekksum er en 16-bits feildeteksjonsmekanisme beregnet over hele UDP-segmentet (inkl. pseudo-header med IP-adresser). Den er <strong>teknisk frivillig</strong> fordi UDP er designet for minimal overhead og hurtig overføring. Mottaker kan velge å ignorere den (felt = 0x0000 = ingen sjekksum). I praksis er den likevel alltid aktivert i moderne implementasjoner.</p>
            </Answer>
          </div>
        </div>
      </ExamYear>

      {/* Jan 2024 */}
      <ExamYear year="Jan 2024" title="Oppgave 4 — IPv4/UDP og pålitelig overføring">
        <div className="text-sm text-[var(--muted)] space-y-1">
          <p>IPv4 headerfelter, UDP vs TCP, Go-Back-N og Selective Repeat.</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">
              a) Hvordan angis transport-protokollen i et IP-datagram?
            </p>
            <Answer>
              <Formula>Protocol-feltet (8 bit): 6 = TCP, 17 = UDP, 1 = ICMP</Formula>
              <p>IP-laget leser Protocol-feltet for å bestemme hvilken transportlagsprotokoll som skal demultiplekse det innkommende segmentet.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Hva er Go-Back-N (GBN) og Selective Repeat (SR)?
            </p>
            <Answer>
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse w-full">
                  <thead>
                    <tr className="bg-network-100 dark:bg-network-900/30">
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">Egenskap</th>
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">Go-Back-N</th>
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">Selective Repeat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Sender-vindu", "N pakker (maks N-1)", "N pakker"],
                      ["Mottaker-buffer", "1 pakke (ingen buffer)", "N pakker (individuelle buffere)"],
                      ["Ved tap av pakke k", "Sender k, k+1, k+2, ... på nytt", "Sender kun pakke k på nytt"],
                      ["ACK-type", "Kumulativ ACK", "Individuell ACK"],
                      ["Vindu-størrelse", "≤ 2^n - 1", "≤ 2^(n-1)"],
                      ["Effektivitet", "Lav ved høy tap-rate", "Høy — kun tapet retransmitteres"],
                    ].map(([prop, gbn, sr]) => (
                      <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1 font-bold">{prop}</td>
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1">{gbn}</td>
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1">{sr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">
                GBN er enklere å implementere men ineffektivt ved tap. SR er mer kompleks men bruker båndbredden bedre.
                TCP bruker en hybrid-tilnærming nærmere SR.
              </p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">c) Hva er kumulativ ACK i Go-Back-N?</p>
            <Answer>
              <p>Kumulativ ACK = ACK(n) betyr at alle segmenter med sekvensnummer ≤ n er mottatt korrekt. Mottaker sender <strong>ACK for det siste segmentet i sammenhengende rekkefølge</strong>. Eksempel: Hvis 0,1,3 er mottatt men 2 mangler, sendes ACK(1) — segment 3 er buffert men ikke kvittert.</p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
          <span className="text-amber-800 dark:text-amber-300">
            GBN vs SR er et vanlig spørsmål. Husk: GBN kaster out-of-order pakker og krever retransmisjon av hele vinduet.
            SR bufrer out-of-order pakker og retransmitterer kun den tapte.
          </span>
        </div>
      </ExamYear>

      {/* 2022 */}
      <ExamYear year="2022" title="Oppgave 4 — IPv4 datagram (kjerne)">
        <div className="text-sm text-[var(--muted)] space-y-1">
          <p>Grunnleggende IP-datagram-struktur, TTL-funksjon, fragmentering.</p>
        </div>

        <IPv4Header highlight={["Version", "TTL", "Protocol", "Source IP", "Destination IP", "Identifier", "Flags", "Fragment Offset"]} />

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Hva er IP-tjenesten — hva garanterer IP, og hva garanterer det IKKE?</p>
            <Answer>
              <p><strong>IP garanterer:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Beste-innsats levering (best-effort) — pakken forsøkes levert</li>
                <li>Logisk adressering (32-bit IPv4)</li>
                <li>Pakkeoppbygging og fragmentering</li>
              </ul>
              <p className="mt-2"><strong>IP garanterer IKKE:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Levering (pakker kan tapes)</li>
                <li>Rekkefølge (pakker kan ankomme ute av rekkefølge)</li>
                <li>Duplikater (pakker kan dupliseres)</li>
                <li>Forsinkelsesgaranti</li>
              </ul>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">
              b) Hva er TTL-feltet og hvorfor er det nødvendig?
            </p>
            <Answer>
              <p>TTL (Time To Live) er et 8-bits felt som dekrementeres med 1 ved hvert ruterhopp. Når TTL=0, kaster ruteren pakken og sender ICMP &quot;Time Exceeded&quot;-melding til avsenderen.</p>
              <p className="mt-1"><strong>Hvorfor nødvendig:</strong> Uten TTL ville pakker som er fanget i rutingløkker (f.eks. på grunn av feilkonfigurasjon) sirkulere i nettverket for alltid og fortrenge legitim trafikk.</p>
              <Formula>Typisk startverdi: TTL = 64 (Linux) eller 128 (Windows)</Formula>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">c) Forklar fragmentering — når skjer det, og hvem setter det sammen igjen?</p>
            <Answer>
              <p>Fragmentering skjer når en datagram er større enn MTU (Maximum Transmission Unit) på en link i stien. Ruteren deler datagrammet i mindre fragmenter, hvert med samme Identifier men ulik Fragment Offset.</p>
              <Formula>
                Fragment Offset = startbyte / 8 (måles i 8-byte enheter)<br />
                Eksempel: 4000-byte datagram på 1500 MTU-link:<br />
                Fragment 1: offset=0, MF=1 (1480 bytes data)<br />
                Fragment 2: offset=185, MF=1 (1480 bytes data)<br />
                Fragment 3: offset=370, MF=0 (siste — 1040 bytes)
              </Formula>
              <p><strong>Reassemblering skjer KUN hos mottakeren</strong> (sluttverten) — ikke i rutere underveis. IPv6 forbyr fragmentering i rutere.</p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Oppgave 4 er nesten identisk hvert år: IP-headerfelter → TTL, Protocol, Identifier/Flags/Offset →
            TCP vs UDP. Lær hvert felt utenat!
          </span>
        </div>
      </ExamYear>

      {/* TCP Congestion Control */}
      <ExamYear year="Generell" title="TCP Congestion Control — ekstra tema">
        <div className="text-sm text-[var(--muted)] space-y-1">
          <p>Slow start, congestion avoidance, fast retransmit, AIMD. Forekommer som del av oppgave 4 eller 3.</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">Beskriv fasene i TCP congestion control.</p>
            <Answer>
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse w-full">
                  <thead>
                    <tr className="bg-network-100 dark:bg-network-900/30">
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">Fase</th>
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">Beskrivelse</th>
                      <th className="border border-network-200 dark:border-network-700 px-2 py-1 text-left">cwnd øker med</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Slow Start", "cwnd starter på 1 MSS og dobles hvert RTT", "×2 per RTT (eksponensielt)"],
                      ["Congestion Avoidance", "cwnd > ssthresh: øk lineært", "+1 MSS per RTT (lineært)"],
                      ["Fast Retransmit", "3 dupliserte ACK → retransmitter umiddelbart", "ssthresh = cwnd/2, cwnd = ssthresh"],
                      ["Timeout", "Pakketap via timeout → gå tilbake til slow start", "cwnd = 1 MSS"],
                    ].map(([fase, beskr, cwnd]) => (
                      <tr key={fase} className="even:bg-neutral-50 dark:even:bg-neutral-800/20">
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1 font-bold">{fase}</td>
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1">{beskr}</td>
                        <td className="border border-network-200 dark:border-network-700 px-2 py-1 font-mono text-xs">{cwnd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Formula>
                AIMD: Additiv økning (congestion avoidance), Multiplikativ reduksjon (ved tap).<br />
                ssthresh = congestion window / 2 ved tap.
              </Formula>
            </Answer>
          </div>
        </div>
      </ExamYear>
    </div>
  );
}
