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

export default function CN3Teori31Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.1 Transportlagstjenester og multipleksing</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.1</p>
        <h1 className="text-2xl font-bold mb-2">Transportlagstjenester og multipleksing</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Transportlaget er broen mellom applikasjonsprosesser og nettverket. Her laerer du
          hvordan mange prosesser kan dele ett nettverkslag via multipleksing og demultipleksing,
          og hva som skiller transportlaget fra nettverkslaget.
        </p>
      </div>

      <MustKnow items={[
        "Forskjellen mellom transportlaget og nettverkslaget (prosess vs. vert)",
        "Hva multipleksing og demultipleksing er, og hvordan de skiller seg",
        "Hva en socket er og hvordan portnummer brukes til demultipleksing",
        "De tre kategoriene av port-numre: well-known (0-1023), registered (1024-49151), ephemeral (49152-65535)",
        "Hvordan TCP demultipleksing bruker 4-tuple vs UDP sin 2-tuple",
        "Eksempler pa well-known porter: HTTP=80, HTTPS=443, DNS=53, SSH=22",
      ]} />

      <Section title="1. Transportlaget vs nettverkslaget" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="network">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Nettverkslaget (IP)</h4>
            <p className="text-sm"><strong>Logisk kommunikasjon mellom verter (hosts)</strong></p>
            <ul className="text-sm text-[var(--muted)] space-y-1 mt-2 list-disc list-inside">
              <li>Sender IP-datagrammer fra vert til vert</li>
              <li>Bruker IP-adresser for adressering</li>
              <li>Beste-innsats levering (ingen garantier)</li>
              <li>Implementert i rutere og verter</li>
            </ul>
          </Card>
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Transportlaget (TCP/UDP)</h4>
            <p className="text-sm"><strong>Logisk kommunikasjon mellom prosesser</strong></p>
            <ul className="text-sm text-[var(--muted)] space-y-1 mt-2 list-disc list-inside">
              <li>Sender segmenter mellom applikasjonsprosesser</li>
              <li>Bruker portnummer for adressering</li>
              <li>TCP: palitelig, ordnet levering</li>
              <li>Kun implementert i endesystemer (ikke rutere)</li>
            </ul>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Den viktige distinksjonen</h4>
          <div className="text-sm space-y-2">
            <p>Tenk pa det slik: Du og en venn bor i hvert sitt hus (verter). Brev mellom husene er <strong>nettverkslaget</strong>. Men inni hvert hus bor det mange familiemedlemmer (prosesser). Hvert familiemedlem har sin egen "postboks" (port/socket). Det a sortere brev til riktig familiemedlem er <strong>transportlaget</strong>.</p>
            <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 p-3 mt-2">
              <p className="font-bold text-xs">Oppsummert:</p>
              <p className="text-xs mt-1">Nettverkslaget = vert-til-vert (IP-adresse). Transportlaget = prosess-til-prosess (IP-adresse + portnummer = socket).</p>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="2. Sockets og portnummer" defaultOpen={true}>
        <Card color="network">
          <h4 className="font-bold mb-2">Hva er en socket?</h4>
          <div className="text-sm space-y-2">
            <p>En <strong>socket</strong> er et kommunikasjonsendepunkt — grensesnittet mellom applikasjonslaget og transportlaget. Identifiseres av:</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-cyan-700 dark:text-cyan-400">UDP-socket</p>
                <p className="text-xs font-mono mt-1">(IP-adresse, portnummer)</p>
                <p className="text-xs text-[var(--muted)] mt-1">2-tuple. Identifisert av mottakerens IP + port.</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
                <p className="font-bold text-xs text-blue-700 dark:text-blue-400">TCP-socket</p>
                <p className="text-xs font-mono mt-1">(src-IP, src-port, dst-IP, dst-port)</p>
                <p className="text-xs text-[var(--muted)] mt-1">4-tuple. Unik per tilkobling.</p>
              </div>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Portnummer er 16-bit tall (0–65535). Transportlaget bruker portnummeret til a levere segmentet til riktig socket/prosess.</p>
          </div>
        </Card>

        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Kategori</th>
                <th className="px-3 py-2 text-left">Rekkevidde</th>
                <th className="px-3 py-2 text-left">Beskrivelse</th>
                <th className="px-3 py-2 text-left">Eksempler</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Well-known", "0 – 1023", "Reservert for standardtjenester. Tildelt av IANA.", "HTTP=80, HTTPS=443, DNS=53, SSH=22, FTP=21, SMTP=25"],
                ["Registered", "1024 – 49151", "Registrert for spesifikke applikasjoner.", "MySQL=3306, PostgreSQL=5432, RDP=3389"],
                ["Ephemeral (dynamisk)", "49152 – 65535", "Tildeles automatisk av OS til klientprosesser.", "Klientens midlertidige sendingsport"],
              ].map(([kat, rekke, besk, eks], i) => (
                <tr key={kat} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-bold text-xs text-cyan-700 dark:text-cyan-400">{kat}</td>
                  <td className="px-3 py-2 font-mono text-xs">{rekke}</td>
                  <td className="px-3 py-2 text-xs">{besk}</td>
                  <td className="px-3 py-2 text-xs text-[var(--muted)]">{eks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. Multipleksing og demultipleksing" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Multipleksing (sender)</h4>
            <p className="text-sm"><strong>Mange sockets → ett nettverk</strong></p>
            <div className="mt-3">
              <svg viewBox="0 0 200 120" className="w-full max-w-[200px] mx-auto">
                <rect x="10" y="10" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.7"/>
                <text x="35" y="27" textAnchor="middle" fontSize="8" fill="white">App A</text>
                <rect x="10" y="45" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.7"/>
                <text x="35" y="62" textAnchor="middle" fontSize="8" fill="white">App B</text>
                <rect x="10" y="80" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.7"/>
                <text x="35" y="97" textAnchor="middle" fontSize="8" fill="white">App C</text>
                <path d="M60 22 L105 55" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
                <path d="M60 57 L105 57" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
                <path d="M60 92 L105 59" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
                <rect x="105" y="45" width="60" height="25" rx="4" fill="#0891b2" opacity="0.8"/>
                <text x="135" y="62" textAnchor="middle" fontSize="8" fill="white">Nettverk</text>
                <text x="80" y="30" textAnchor="middle" fontSize="7" fill="#64748b">mux</text>
              </svg>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Transportlaget legger til header (inkl. portnummer) og sender alt via ett nettverkslag.</p>
          </Card>

          <Card color="network">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Demultipleksing (mottaker)</h4>
            <p className="text-sm"><strong>Ett nettverk → riktig socket</strong></p>
            <div className="mt-3">
              <svg viewBox="0 0 200 120" className="w-full max-w-[200px] mx-auto">
                <rect x="35" y="45" width="60" height="25" rx="4" fill="#0891b2" opacity="0.8"/>
                <text x="65" y="62" textAnchor="middle" fontSize="8" fill="white">Nettverk</text>
                <path d="M95 57 L140 22" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
                <path d="M95 57 L140 57" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
                <path d="M95 57 L140 92" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
                <rect x="140" y="10" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.7"/>
                <text x="165" y="27" textAnchor="middle" fontSize="8" fill="white">Port 80</text>
                <rect x="140" y="45" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.7"/>
                <text x="165" y="62" textAnchor="middle" fontSize="8" fill="white">Port 443</text>
                <rect x="140" y="80" width="50" height="25" rx="4" fill="#3b82f6" opacity="0.7"/>
                <text x="165" y="97" textAnchor="middle" fontSize="8" fill="white">Port 53</text>
                <text x="110" y="30" textAnchor="middle" fontSize="7" fill="#64748b">demux</text>
              </svg>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">OS sjekker destinasjonsport i segmentet og leverer til riktig socket/prosess.</p>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-3">UDP vs TCP demultipleksing — viktig forskjell!</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">UDP (2-tuple)</p>
              <p className="text-xs text-[var(--muted)]">UDP-socket identifiseres kun av <strong>(dst-IP, dst-port)</strong>. To UDP-segmenter med same maal-port, men ulik kildeport/IP, leveres til SAMME socket.</p>
              <div className="mt-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 p-2 text-xs font-mono">
                UDP demux: dst-port → socket
              </div>
            </div>
            <div>
              <p className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">TCP (4-tuple)</p>
              <p className="text-xs text-[var(--muted)]">TCP-socket identifiseres av <strong>(src-IP, src-port, dst-IP, dst-port)</strong>. To TCP-segmenter med ulik kildeadresse → ULIKE sockets (en per tilkobling).</p>
              <div className="mt-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2 text-xs font-mono">
                TCP demux: 4-tuple → unik socket
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-white/60 dark:bg-neutral-900/40 p-3">
            <p className="text-xs font-bold">Praktisk konsekvens:</p>
            <p className="text-xs text-[var(--muted)] mt-1">En webserver (port 80) kan betjene tusenvis av samtidige TCP-tilkoblinger fordi hver tilkobling far sin unike socket basert pa 4-tuple. Med UDP matte alle klienter dele samme socket.</p>
          </div>
        </Card>
      </Section>

      <Section title="4. Gjennomgatt eksempel — hva skjer nar du besokter nrk.no?">
        <div className="space-y-3">
          {[
            { steg: "1", tittel: "Nettleser genererer HTTP-foresporsel", tekst: "Prosessen (nettleseren) kaller rdt_send(). OS velger en ephemeral klientport, f.eks. 54321." },
            { steg: "2", tittel: "Multipleksing pa avsendersiden", tekst: "Transportlaget lager et TCP-segment med src-port=54321, dst-port=80, src-IP=din-IP, dst-IP=nrk.no-IP." },
            { steg: "3", tittel: "Nettverkslaget sender IP-datagram", tekst: "IP-datagrammet med TCP-segmentet inne sendes hopp-for-hopp mot nrk.no sin server." },
            { steg: "4", tittel: "Demultipleksing pa mottakersiden", tekst: "Serveren mottar datagrammet. Transportlaget sjekker 4-tuple: dst-port=80 → leverer til HTTP-prosessen sin socket." },
            { steg: "5", tittel: "Svar tilbake", tekst: "Serveren sender svar med src-port=80, dst-port=54321. Din maskin demultiplekserer til nettleserprosessen din." },
          ].map(({ steg, tittel, tekst }) => (
            <div key={steg} className="flex gap-3 rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
              <div className="w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold shrink-0">{steg}</div>
              <div>
                <p className="font-bold text-sm">{tittel}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{tekst}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="5. Vanlige feil studenter gjor">
        <Card color="red">
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-bold">Feil 1: Blander nettverkslaget og transportlaget</p>
              <p className="text-[var(--muted)] text-xs mt-1">IP gir kommunikasjon vert-til-vert. TCP/UDP gir kommunikasjon prosess-til-prosess. Rutere implementerer IKKE transportlaget.</p>
            </div>
            <div>
              <p className="font-bold">Feil 2: Tror UDP og TCP demultipleksing er like</p>
              <p className="text-[var(--muted)] text-xs mt-1">UDP: 2-tuple (dst-IP, dst-port). TCP: 4-tuple (src-IP, src-port, dst-IP, dst-port). Dette er en klassisk eksamensoppgave.</p>
            </div>
            <div>
              <p className="font-bold">Feil 3: Blander portnummer-kategorier</p>
              <p className="text-[var(--muted)] text-xs mt-1">Well-known (0-1023) er reservert for standardtjenester. Klientprosesser bruker ephemeral-porter (49152-65535) som OS tildeler automatisk.</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← Tilbake til oversikt
        </Link>
        <Link href="/dat110/cn-3/teori/3-2" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          3.2 UDP →
        </Link>
      </div>
    </div>
  );
}
