"use client";

import Link from "next/link";

export default function Oppg4Oversikt() {
  return (
    <div>
      {/* Hva kan du forvente */}
      <div className="rounded-xl border border-network-300 bg-network-50 dark:bg-network-950/20 dark:border-network-800 p-5 mb-8">
        <h2 className="font-bold text-lg text-network-700 dark:text-network-400 mb-3">
          Hva kan du forvente?
        </h2>
        <p className="text-sm text-network-900 dark:text-network-200 mb-3">
          Oppgave 4 tester alltid protokollkunnskap: TCP vs UDP, IP-headerfelt,
          pålitelig dataoverføring, og protokollmekanismer. Du må kunne forklare
          hvordan protokollene fungerer, tegne tidsdiagrammer og identifisere
          headerfelt.
        </p>
        <p className="text-sm font-bold text-network-800 dark:text-network-300">
          Typisk: &ldquo;forklar felt X i IP-headeren&rdquo;, &ldquo;tegn TCP
          3-veis handshake&rdquo;, &ldquo;hva skjer ved pakketap?&rdquo;
        </p>
      </div>

      {/* Strategi */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Løsningsstrategi</h2>
        <ol className="space-y-3">
          {[
            { step: "Identifiser protokollen", detail: "Er oppgaven om TCP, UDP, IP eller en kombinasjon? Les nøye — de spør ofte om spesifikke felt eller mekanismer." },
            { step: "Kjenn headerfeltene", detail: "IP: Version, IHL, TTL, Protocol (6=TCP, 17=UDP), Source/Dest IP. TCP: Source/Dest Port, Seq#, Ack#, Flags (SYN, ACK, FIN)." },
            { step: "Tegn tidsdiagram ved behov", detail: "Vis meldinger mellom klient og server med piler. Merk seq/ack-numre. Vis retransmission ved tap." },
            { step: "Forklar mekanismene", detail: "Pålitelig overføring: ACK, timeout, retransmission. Flytkontroll: sliding window. Metningskontroll: slow start, AIMD." },
            { step: "Sjekk enheter og verdier", detail: "Port = 16-bit (0–65535). TTL = hop count. MSS = typisk 1460 bytes. Checksum = 1s-komplement." },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-network-100 dark:bg-network-900/30 text-network-700 dark:text-network-400 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-sm">{item.step}</p>
                <p className="text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Nøkkelkonsepter */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Nøkkelkonsepter</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">TCP vs UDP</p>
            <div className="text-sm space-y-1">
              <p><strong>TCP:</strong> Tilkoblingsbasert, pålitelig, flytkontroll, rekkefølge, metningskontroll</p>
              <p><strong>UDP:</strong> Tilkoblingsløst, best-effort, rask, minimal overhead</p>
            </div>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-700 p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">TCP 3-veis handshake</p>
            <p className="font-mono text-sm">1) SYN (seq=x) → 2) SYN-ACK (seq=y, ack=x+1) → 3) ACK (ack=y+1)</p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">IP Protocol-felt</p>
            <p className="font-mono text-sm">TCP = 6, UDP = 17, ICMP = 1</p>
            <p className="text-xs text-[var(--muted)] mt-1">Forteller mottakeren hvilken protokoll payloaden bruker</p>
          </div>
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-700 p-4">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">Well-known porter</p>
            <p className="font-mono text-sm">HTTP=80, HTTPS=443, DNS=53, SSH=22</p>
            <p className="text-xs text-[var(--muted)] mt-1">Port 0–1023 er reservert for standardtjenester</p>
          </div>
        </div>
      </div>

      {/* Relevant teori */}
      <div>
        <h2 className="text-xl font-bold mb-3">Relevant teori</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/dat110/cn-3" className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors">
            <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 3</span>
            <div>
              <p className="text-sm font-medium">Transportlaget</p>
              <p className="text-xs text-[var(--muted)]">TCP, UDP, pålitelig overføring, flytkontroll</p>
            </div>
          </Link>
          <Link href="/dat110/cn-4" className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors">
            <span className="font-bold text-xs text-network-600 dark:text-network-400">CN 4</span>
            <div>
              <p className="text-sm font-medium">Nettverkslaget</p>
              <p className="text-xs text-[var(--muted)]">IP-protokollen, headerfelt, fragmentering</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
