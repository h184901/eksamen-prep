"use client";

import Link from "next/link";
import { useState } from "react";
import { useDat110Lang, localizedText } from "@/lib/dat110-language";
import Dat110GradualNote from "@/components/dat110/Dat110GradualNote";

// Compact "exam cheat sheet": formulas, mnemonics and typical exam answers for the
// recurring DAT110 themes. Mirrors the structure/style of /dat110/oppsummering
// (local RefCard/Formula/MiniTable helpers, Norwegian card content, EN-mode note).

function RefCard({
  title,
  color,
  children,
  defaultOpen = false,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    network: "border-network-400/40 hover:border-network-400/80",
    blue: "border-blue-400/40 hover:border-blue-400/80",
    amber: "border-amber-400/40 hover:border-amber-400/80",
    red: "border-red-400/40 hover:border-red-400/80",
    green: "border-green-400/40 hover:border-green-400/80",
    purple: "border-purple-400/40 hover:border-purple-400/80",
  };
  return (
    <div className={`rounded-xl border-2 bg-[var(--card)] overflow-hidden ${colors[color] ?? colors.network}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
      >
        <span className="font-bold text-lg">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function MiniTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-xs rounded-lg overflow-hidden border border-[var(--card-border)]">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-2 py-1.5 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1.5">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-2 font-mono text-sm text-amber-800 dark:text-amber-300 my-2 text-center">
      {children}
    </div>
  );
}

// Distinctive "typical exam answer" callout — the thing the user wants most.
function Answer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-green-300 dark:border-green-800/50 bg-green-50 dark:bg-green-950/20 px-3 py-2 text-xs text-green-900 dark:text-green-200 mt-2">
      <span className="font-bold">✅ Typisk eksamensvar: </span>
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-[var(--muted)]">
      <span className="font-semibold">💡 Huskeregel: </span>
      {children}
    </p>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="text-xs text-[var(--muted)] list-disc list-inside space-y-1">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function HuskearkPage() {
  const { lang } = useDat110Lang();
  const t = (no: string, en: string) => localizedText(no, en, lang);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">{t("Hjem", "Home")}</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{t("Huskeark", "Cheat sheet")}</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {t("Eksamen-huskeark", "Exam cheat sheet")}
      </h1>
      <p className="text-[var(--muted)] max-w-2xl mb-4">
        {t(
          "Formler, huskeregler og typiske eksamensvar for gjengangerne i DAT110. Tenkt for rask repetisjon rett før eksamen — åpne kortene for detaljer.",
          "Formulas, mnemonics and typical exam answers for the recurring DAT110 themes. Built for quick review right before the exam — open the cards for details.",
        )}
      </p>

      <Dat110GradualNote className="mb-4" />

      <div className="rounded-xl border border-network-300 bg-network-50/60 dark:bg-network-950/20 dark:border-network-800 p-4 mb-8 text-sm">
        <p className="text-[var(--muted)]">
          {t(
            "Se også de detaljerte sidene:",
            "See also the detailed pages:",
          )}{" "}
          <Link href="/dat110/oppsummering" className="font-semibold text-network-700 dark:text-network-300 hover:underline">
            {t("Referanseark", "Reference sheet")}
          </Link>{" · "}
          <Link href="/dat110/eksamen/gjengangere" className="font-semibold text-network-700 dark:text-network-300 hover:underline">
            {t("Eksamen-gjengangere (Q1–Q10)", "Recurring questions (Q1–Q10)")}
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. TCP/IP-lagene */}
        <RefCard title="1. TCP/IP-lagene" color="network" defaultOpen={true}>
          <MiniTable
            headers={["Lag", "Enhet / protokoll", "Oppgave"]}
            rows={[
              ["Application", "HTTP, DNS, SMTP", "Tjenester til app/bruker"],
              ["Transport", "TCP / UDP", "Prosess-til-prosess (porter), demux"],
              ["Network", "IP", "Vert-til-vert, ruting/forwarding av datagram"],
              ["Link", "Ethernet, switch, ARP", "Hop-til-hop over én lenke, MAC"],
              ["Physical", "—", "Bits på mediet"],
            ]}
          />
          <Tip>Rutere implementerer kun de 3 nederste lagene; hosts kjører alle 5.</Tip>
          <Answer>
            «En router opererer på de tre nederste lagene og videresender datagram basert på IP; en host kjører hele stacken (alle 5 lag).»
          </Answer>
        </RefCard>

        {/* 2. HTTP */}
        <RefCard title="2. HTTP" color="network">
          <Bullets
            items={[
              "Ligger på applikasjonslaget, over TCP (port 80 / 443).",
              "GET (les), POST (opprett/send), PUT (oppdater hel ressurs, idempotent), DELETE (slett).",
              "Content-Type: angir formatet på dataene (f.eks. application/json).",
              "Entity body: selve dataene (tom ved GET, fylt ved POST/PUT).",
              "Request: method · URL · Version + header-linjer + blank linje + body.",
            ]}
          />
          <Answer>
            «PUT brukes for å oppdatere en ressurs; dataene legges i entity body, og Content-Type spesifiserer formatet. HTTP ligger på applikasjonslaget.»
          </Answer>
        </RefCard>

        {/* 3. IP / IPv4 */}
        <RefCard title="3. IP / IPv4" color="blue">
          <Formula>IP-tjeneste: unreliable, best-effort, multi-hop, end-to-end levering av datagram</Formula>
          <Bullets
            items={[
              "TTL: reduseres med 1 per hop, droppes ved 0 (hindrer evige løkker).",
              "Source IP / Destination IP: 32-bit, bundet til interface (ikke host).",
              "Upper-layer protocol field: TCP = 6, UDP = 17.",
              "Fragmentering: Identifier (lik for alle fragmenter), Flags (more-fragments), Fragment offset (reassembly hos mottaker).",
            ]}
          />
          <Tip>IP er stateless og gir ingen garanti — pålitelighet ligger i TCP (høyere lag).</Tip>
          <Answer>
            «IP gir upålitelig, best-effort multi-hop-levering av datagram ende-til-ende; ingen garanti for rekkefølge eller levering.»
          </Answer>
        </RefCard>

        {/* 4. Delay / bottleneck */}
        <RefCard title="4. Forsinkelse og flaskehals (Oppg 3)" color="network">
          <Formula>d_trans = L / R &nbsp;|&nbsp; d_prop = d / s &nbsp;|&nbsp; d_nodal = d_proc + d_queue + d_trans + d_prop</Formula>
          <Formula>Trafikkintensitet ρ = L·a / R &nbsp;|&nbsp; Throughput = min(R_1, …, R_N)</Formula>
          <Bullets
            items={[
              "Bottleneck = lenken med laveste transmisjonsrate på stien → bestemmer maks throughput.",
              "Throughput deles hvis flere strømmer deler en lenke.",
              "ρ → 1 ⇒ køforsinkelse eksploderer; ρ > 1 ⇒ pakketap.",
            ]}
          />
          <Tip>d_trans avhenger av rate, d_prop av distanse — ikke bland dem.</Tip>
          <Answer>
            «Maks ende-til-ende throughput = kapasiteten til flaskehalslenken (laveste R på stien).»
          </Answer>
        </RefCard>

        {/* 5. ARP, switch og forwarding */}
        <RefCard title="5. ARP, switch og forwarding (Oppg 5–6)" color="blue">
          <Bullets
            items={[
              "ARP: oversetter IP → MAC på samme subnet. Request = broadcast, reply = unicast.",
              "Switch lærer fra source MAC (porten framen kom inn på).",
              "Switch forwarder på destination MAC via switch-tabellen.",
              "Ukjent destinasjon → flood til alle porter unntatt inn-porten.",
              "Routing (control plane): regner ut stier, global, sjelden. Forwarding (data plane): flytter pakke inn→ut-port via tabell, lokal, per pakke.",
            ]}
          />
          <Answer>
            «Switchen lærer source-MAC og videresender på destination-MAC; ved ukjent destinasjon flooder den til alle porter unntatt den pakken kom inn på.»
          </Answer>
        </RefCard>

        {/* 6. CIDR / subnetting */}
        <RefCard title="6. CIDR / subnetting (Oppg 5–6)" color="blue">
          <Formula>/n → n network-bits · host-bits = 32 − n · antall adresser = 2^(32−n)</Formula>
          <Bullets
            items={[
              "Intervall: host-bits alle 0 (nettadresse) → alle 1 (broadcast).",
              "/24: maske 255.255.255.0, 256 adresser. Eks: 223.1.9.0/24 → 223.1.9.0–223.1.9.255.",
              "/22: maske 255.255.252.0, 1024 adresser (4×/24). Eks: 200.23.16.0/22 → …16.0–…19.255.",
              "32-bit binær: hver oktett = 8 bit (223 = 11011111). Longest-prefix match: flest matchende prefiks-bit.",
            ]}
          />
          <Answer>
            «/22 betyr 22 nettverksbit og 10 hostbit ⇒ 2¹⁰ = 1024 adresser; intervallet går fra nettadresse (hostbit = 0) til broadcast (hostbit = 1).»
          </Answer>
        </RefCard>

        {/* 7. Distance-vector og link-state */}
        <RefCard title="7. Distance-vector og link-state (Oppg 5)" color="purple">
          <MiniTable
            headers={["", "Distance-vector", "Link-state"]}
            rows={[
              ["Kunnskap", "Lokal, fra naboer", "Global topologi"],
              ["Algoritme", "Bellman-Ford", "Dijkstra"],
              ["Utveksler", "Egen distansevektor m/ naboer", "Lenke-tilstand til alle"],
            ]}
          />
          <Formula>D_x(y) = min_v(c(x,v) + D_v(y))</Formula>
          <Bullets
            items={[
              "Init: D_x(x) = 0, D_x(nabo) = c(x,nabo), D_x(ikke-nabo) = ∞.",
              "DV-problem: count-to-infinity (dårlig nytt sprer seg sakte). Vis ALLE steg på eksamen!",
            ]}
          />
          <Tip>DV = rykter fra naboer. LS = kart over hele nettet.</Tip>
          <Answer>
            «Distance-vector bruker Bellman-Ford med kun lokal nabo-info; link-state bygger full topologi og kjører Dijkstra.»
          </Answer>
        </RefCard>

        {/* 8. RPC */}
        <RefCard title="8. RPC (Oppg 7)" color="purple">
          <Bullets
            items={[
              "RPC: kall en prosedyre på en annen maskin som om den var lokal. Klient-stub marshaller args, server-stub unmarshaller.",
              "Synkron: klient blokkerer til svar. Asynkron: fortsetter, svar via callback (krever multithreading + sequence/IDs).",
              "Lost request: timer + sequence number + retransmisjon + duplicate detection.",
              "Semantikk: at-least-once (stateless, idempotent), at-most-once, exactly-once (ideal).",
              "Stateless server: husker ingenting (robust). Stateful: husker klient-state (effektivt, sårbart ved krasj).",
            ]}
          />
          <Formula>5 feilklasser: finner ikke server · request tapt · server krasjer · reply tapt · klient krasjer (orphan)</Formula>
          <Answer>
            «Tapt request håndteres med timer + retransmisjon; serveren bruker sequence number for å oppdage og forkaste duplikater.»
          </Answer>
        </RefCard>

        {/* 9. Distribuerte systemer */}
        <RefCard title="9. Distribuerte systemer (Oppg 9)" color="amber">
          <p className="text-xs font-bold">Mutual exclusion:</p>
          <Bullets
            items={[
              "Sentralisert: 3 meldinger/inngang (request, grant, release).",
              "Distribuert (Ricart-Agrawala): 2·(N−1) meldinger.",
              "Token ring: har token = adgang. Desentralisert: stemming (majoritet).",
            ]}
          />
          <Formula>Quorum: N_R + N_W &gt; N &nbsp;og&nbsp; N_W &gt; N/2 (majoritetsstemming)</Formula>
          <Formula>k-fault tolerant: crash → k+1 · byzantine (mask) → 2k+1 · byzantine (enighet) → 3k+1</Formula>
          <Bullets
            items={[
              "Replikering — 4 grunner: fault tolerance, availability, performance, scalability.",
              "Konsistens: data-centric (strict→sequential→causal→eventual) vs client-centric (monotonic reads/writes, read-your-writes).",
              "Causal: kausalt relaterte skriv sees i samme rekkefølge av alle; samtidige kan sees ulikt.",
              "Continuous: sett en øvre grense for avvik (numerisk / staleness / rekkefølge).",
            ]}
          />
          <Answer>
            «Et k-fault-tolerant system overlever k feil; ved crash trengs k+1 replikaer, ved byzantine enighet 3k+1.»
          </Answer>
        </RefCard>

        {/* 10. Chord DHT */}
        <RefCard title="10. Chord DHT (Oppg 10, 15 %)" color="red" defaultOpen={true}>
          <Formula>Ring m bits → adresserom 2^m &nbsp;|&nbsp; ID = hash mod 2^m</Formula>
          <Formula>Ansvar: pred(server) &lt; key ≤ server &nbsp;|&nbsp; Finger[i] = succ((n + 2^(i−1)) mod 2^m)</Formula>
          <Bullets
            items={[
              "Lookup: hopp via nærmeste predecessor i finger-tabellen → O(log N).",
              "Modulo wrap-around: etter 2^m − 1 kommer 0.",
              "Replikering av servere/filer gir fault tolerance (+ availability/scale).",
              "Prosjekt 3: Java RMI, MD5 128-bit hash, files og servere får identifikatorer, remote-write med distribuert mutual exclusion.",
            ]}
          />
          <Tip>Finger-tabellen halverer avstanden hvert hopp ⇒ logaritmisk søk.</Tip>
          <Answer>
            «Nøkkel k eies av sin successor: første server med ID ≥ k (pred &lt; k ≤ server); finger-tabellen gir O(log N) oppslag.»
          </Answer>
        </RefCard>

        {/* 11. Overlay multicast */}
        <RefCard title="11. Overlay multicast (Oppg 8)" color="red">
          <Formula>Fullt sammenkoblet overlay: E = N(N−1)/2 kanter</Formula>
          <Formula>RDP/stretch = overlay path cost / beste fysiske path cost &nbsp;|&nbsp; Tree cost = Σ kantvekter i treet</Formula>
          <Bullets
            items={[
              "Bygg overlay ved å bruke fysisk nettverk til å finne minste delay mellom prosesspar.",
              "Lavere tree cost = mer effektivt tre; lavere RDP = nærmere optimal fysisk sti.",
            ]}
          />
          <Answer>
            «Et fullt sammenkoblet overlay med N prosesser har N(N−1)/2 kanter; RDP = overlay-kost delt på beste fysiske kost.»
          </Answer>
        </RefCard>

        {/* 12. Vector clocks */}
        <RefCard title="12. Vektorklokker (Oppg 9)" color="amber">
          <Formula>Send/lokal: øk EGEN komponent (+1) &nbsp;|&nbsp; Receive: VC = max(EGEN, MELDING) komponentvis, så øk EGEN (+1)</Formula>
          <Bullets
            items={[
              "VC[i] = antall events hos prosess i som kausalt forutgår dette eventet.",
              "Kausal relasjon: a → b ⟺ VC(a) < VC(b) (alle ≤, minst én <).",
              "Concurrent (samtidige): verken VC(a) ≤ VC(b) eller VC(b) ≤ VC(a).",
            ]}
          />
          <Tip>Send/lokal: +1 på egen. Receive: ta max, så +1 på egen.</Tip>
          <Answer>
            «Ved mottak tar du komponentvis max av egen og mottatt klokke og øker så din egen; a → b hvis VC(a) &lt; VC(b), ellers samtidige.»
          </Answer>
        </RefCard>

        {/* Siste-minutt */}
        <div className="rounded-xl border-2 border-green-400/40 bg-green-50 dark:bg-green-950/20 p-6 mt-6">
          <h2 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">
            {t("Siste-minutt-huskeregler", "Last-minute reminders")}
          </h2>
          <Bullets
            items={[
              "d_trans = L/R, d_prop = d/s — rate vs distanse. Bottleneck = laveste R.",
              "ARP request broadcast, reply unicast. Switch: lær source, forward destination, flood ukjent.",
              "/n → 2^(32−n) adresser. Bellman-Ford: D_x(y) = min_v(c(x,v)+D_v(y)).",
              "Chord: pred < key ≤ server, finger succ(n+2^(i−1)), O(log N).",
              "Overlay-kanter N(N−1)/2. k-fault: crash k+1, byzantine-enighet 3k+1.",
              "Vektorklokke: max ved receive, så +1 egen.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
