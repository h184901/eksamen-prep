"use client";

import Link from "next/link";

export default function Oppg1Page() {
  return (
    <div>
      <p className="text-[var(--muted)] max-w-2xl mb-8">
        10 flervalgsspørsmål som dekker hele pensum fra begge bøker — CN og DS.
        Hvert spørsmål har 4 alternativer. Spørsmålene hentes fra Canvas-quizer og
        eksamenssett, og kan komme fra alle kapitler.
      </p>

      {/* Hva forvente deg */}
      <div className="rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-5 mb-8">
        <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-3">
          Hva forvente deg i oppgave 1
        </h3>
        <ul className="text-sm text-emerald-900 dark:text-emerald-200 space-y-2 list-disc list-inside">
          <li>10 spørsmål × 1 poeng = 10% av eksamen</li>
          <li>Spørsmålene dekker ALLE kapitler fra begge bøker</li>
          <li>Typisk: begrepsforståelse, protokollforskjeller, feltbetydning, algoritmeprinsipp</li>
          <li>Spørsmålene ligner mye på Canvas-quizene i faget</li>
          <li>Det er alltid minst ett spørsmål om distribuerte systemer (DS)</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5 mb-8">
        <h3 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">
          Tips til flervalg
        </h3>
        <ol className="text-sm text-amber-900 dark:text-amber-200 space-y-2 list-decimal list-inside">
          <li>Les alle alternativene nøye — det er ofte to som ligner veldig</li>
          <li>Eliminer det du vet er feil, og velg blant de gjenstående</li>
          <li>Bred oversikt lønner seg — ikke bare les ett kapittel grundig</li>
          <li>Vær nøye med ordene: &ldquo;alltid&rdquo;, &ldquo;aldri&rdquo;, &ldquo;kun&rdquo; — absolutte påstander er ofte feil</li>
          <li>Typiske feller: forveksle TCP/UDP, link-state/distance-vector, IaaS/PaaS/SaaS</li>
        </ol>
      </div>

      {/* Hyppige emner */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Hyppige emner i flervalg</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { topic: "Forsinkelsestyper", detail: "Sending, forplantning, kø, prosessering" },
            { topic: "TCP vs UDP", detail: "Tilkobling, pålitelighet, flytkontroll" },
            { topic: "IP-adressering", detail: "CIDR, subnetting, ARP, DHCP" },
            { topic: "DNS-formål", detail: "Navneoppslag, hierarki, caching" },
            { topic: "Linklaget", detail: "MAC, CSMA/CD, Ethernet type-felt" },
            { topic: "RPC-klasser", detail: "5 feilklasser, stub-roller" },
            { topic: "Distribuert feil", detail: "Omission, Byzantine, crash" },
            { topic: "Cloud-modeller", detail: "IaaS, PaaS, SaaS, rapid elasticity" },
            { topic: "Konsistensmodeller", detail: "Sekvensiell, kausal, eventual" },
            { topic: "DHT og Chord", detail: "Fingertabell, konsistent hashing" },
            { topic: "Sikkerhet", detail: "Digitale signaturer, non-repudiation" },
            { topic: "Synkronisering", detail: "Lamport-klokker, vektorklokker" },
          ].map((item) => (
            <div key={item.topic} className="flex items-start gap-3 p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card)]">
              <span className="text-emerald-500 mt-0.5">▸</span>
              <div>
                <p className="font-semibold text-sm">{item.topic}</p>
                <p className="text-xs text-[var(--muted)]">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Relevante kapitler */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Relevante kapitler</h2>
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Computer Networking (CN)</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { href: "/dat110/cn-1", label: "CN 1", title: "Nettverksintroduksjon" },
              { href: "/dat110/cn-2", label: "CN 2", title: "Applikasjonslaget" },
              { href: "/dat110/cn-3", label: "CN 3", title: "Transportlaget" },
              { href: "/dat110/cn-4", label: "CN 4-5", title: "Nettverkslaget" },
              { href: "/dat110/cn-6", label: "CN 6", title: "Linklaget" },
              { href: "/dat110/cn-8", label: "CN 8", title: "Sikkerhet" },
            ].map((ch) => (
              <Link
                key={ch.href}
                href={ch.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm"
              >
                <span className="font-bold text-xs text-network-600 dark:text-network-400">{ch.label}</span>
                <span>{ch.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Distributed Systems (DS)</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { href: "/dat110/ds-1", label: "DS 1", title: "Intro distribuerte systemer" },
              { href: "/dat110/ds-3", label: "DS 3", title: "Prosesser og tråder" },
              { href: "/dat110/ds-4", label: "DS 4", title: "Kommunikasjon (RPC, MOM)" },
              { href: "/dat110/ds-5", label: "DS 5", title: "Koordinering og mutex" },
              { href: "/dat110/ds-6", label: "DS 6", title: "Navngiving og DHT" },
              { href: "/dat110/ds-7", label: "DS 7", title: "Konsistens og replikering" },
            ].map((ch) => (
              <Link
                key={ch.href}
                href={ch.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--card-border)] hover:border-network-400/60 transition-colors text-sm"
              >
                <span className="font-bold text-xs text-network-600 dark:text-network-400">{ch.label}</span>
                <span>{ch.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
