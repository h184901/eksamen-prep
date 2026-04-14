"use client";

import Link from "next/link";
import { useState } from "react";

const SCENARIO_STEPS = [
  {
    nr: "0",
    tittel: "Startsituasjon",
    protokoll: "Ingen protokoll ennå",
    lag: "—",
    farve: "border-gray-500/40 bg-gray-500/5",
    desc: "Du åpner nettleseren og skriver 'www.google.com'. Datamaskinen din er koblet til ett LAN (Ethernet). Du har ikke IP-adresse ennå — nettverket er nytt.",
    detaljer: "Datamaskinen din (la oss kalle den Host H) er tilkoblet en switch S som er koblet til en ruter R (default gateway). R er koblet til internett og til en DNS-server.",
  },
  {
    nr: "1",
    tittel: "DHCP — Hent IP-adresse",
    protokoll: "DHCP (Dynamic Host Configuration Protocol)",
    lag: "Applikasjonslag (over UDP/IP/Ethernet)",
    farve: "border-purple-500/40 bg-purple-500/5",
    desc: "H trenger en IP-adresse. H sender en DHCP Discover-melding som UDP-broadcast (255.255.255.255, port 67). DHCP-serveren svarer med IP-adresse, subnettmaske, default gateway og DNS-serveradresse.",
    detaljer: `DHCP Discover: src=0.0.0.0:68, dst=255.255.255.255:67 (broadcast!)
DHCP Offer: src=DHCP-server, dst=255.255.255.255 (tilbyr 192.168.1.101)
DHCP Request: H aksepterer tilbudet
DHCP ACK: Server bekrefter — H har nå IP!

H vet nå:
  • Egen IP: 192.168.1.101
  • Subnettmaske: 255.255.255.0
  • Default gateway: 192.168.1.1 (ruter R)
  • DNS-server: 8.8.8.8`,
  },
  {
    nr: "2",
    tittel: "ARP — Finn gateway-MAC",
    protokoll: "ARP (Address Resolution Protocol)",
    lag: "Linklaget (ingen IP over dette)",
    farve: "border-blue-500/40 bg-blue-500/5",
    desc: "H vil nå sende en DNS-forespørsel til DNS-serveren (8.8.8.8). DNS-serveren er utenfor lokalt nett, så H må sende via default gateway (192.168.1.1). H trenger gateway-ens MAC-adresse. H sender ARP-broadcast.",
    detaljer: `ARP Request (broadcast):
  "Hvem har IP 192.168.1.1? Fortell 192.168.1.101"
  src-MAC: H-MAC, dst-MAC: FF:FF:FF:FF:FF:FF

Switchen S flooder ARP-forespørselen.
Ruteren R (192.168.1.1) svarer:

ARP Reply (unicast):
  "Jeg har 192.168.1.1! Min MAC er R-MAC"
  src-MAC: R-MAC, dst-MAC: H-MAC

H oppdaterer ARP-tabell:
  192.168.1.1 → R-MAC ✓`,
  },
  {
    nr: "3",
    tittel: "DNS — Oversett www.google.com til IP",
    protokoll: "DNS (Domain Name System)",
    lag: "Applikasjonslag (over UDP/IP/Ethernet)",
    farve: "border-green-500/40 bg-green-500/5",
    desc: "H lager en DNS-forespørsel til DNS-serveren 8.8.8.8 for å finne IP-adressen til www.google.com. DNS-meldingen pakkes inn i UDP, som pakkes inn i IP, som pakkes inn i Ethernet-ramme med gateway-ens MAC.",
    detaljer: `Ethernet-ramme som sendes fra H:
  dst-MAC: R-MAC (gateway)  ← linklaget (ARP hjalp oss hit!)
  src-MAC: H-MAC
  Type: 0x0800 (IPv4)

IP-datagram:
  src-IP: 192.168.1.101
  dst-IP: 8.8.8.8 (DNS-server)
  Protocol: UDP (17)

UDP-segment:
  src-port: 49152 (tilfeldig)
  dst-port: 53 (DNS)

DNS-melding:
  Spørsmål: www.google.com → type A (IPv4-adresse)

DNS-svaret returnerer: 142.250.74.100 (Googles IP)
H lagrer dette i sin DNS-cache.`,
  },
  {
    nr: "4",
    tittel: "TCP-handshake — Opprett forbindelse",
    protokoll: "TCP (Transmission Control Protocol)",
    lag: "Transportlaget (over IP/Ethernet)",
    farve: "border-amber-500/40 bg-amber-500/5",
    desc: "H vet nå at Google er på 142.250.74.100. H vil hente nettsiden via HTTP — men HTTP over TCP krever at TCP-forbindelsen etableres først med tre-veis-handshake (SYN, SYN-ACK, ACK).",
    detaljer: `H → Google: TCP SYN
  src: 192.168.1.101:49200, dst: 142.250.74.100:80
  Flagg: SYN=1
  Seq: x (tilfeldig startnummer)

Google → H: TCP SYN-ACK
  src: 142.250.74.100:80, dst: 192.168.1.101:49200
  Flagg: SYN=1, ACK=1
  Seq: y, Ack: x+1

H → Google: TCP ACK
  Flagg: ACK=1
  Seq: x+1, Ack: y+1

TCP-forbindelsen er nå etablert!
(Husk: hver av disse TCP-segmentene pakkes inn i IP-datagram
 → Ethernet-ramme med ny dst-MAC for hvert hopp!)`,
  },
  {
    nr: "5",
    tittel: "HTTP GET — Be om nettsiden",
    protokoll: "HTTP (HyperText Transfer Protocol)",
    lag: "Applikasjonslag (over TCP/IP/Ethernet)",
    farve: "border-red-500/40 bg-red-500/5",
    desc: "TCP-forbindelsen er etablert. H sender en HTTP GET-forespørsel til Google. Dette er tekst i HTTP-formatet som ber om root-ressursen '/' på serveren.",
    detaljer: `HTTP GET-forespørselen:
  GET / HTTP/1.1
  Host: www.google.com
  User-Agent: Mozilla/5.0 ...
  Accept: text/html, ...
  Connection: keep-alive

Denne teksten sendes som payload i et TCP-segment,
pakket inn i IP-datagram → Ethernet-ramme.

Hvert hopp (switch → ruter → internett-ruter → ...)
bytter ut Ethernet-headeren med nye MAC-adresser,
men IP-headeren (src/dst IP) forblir uendret!`,
  },
  {
    nr: "6",
    tittel: "HTTP-svar — Motta nettsiden",
    protokoll: "HTTP + TCP (pålitelig levering)",
    lag: "Applikasjonslag + transportlaget",
    farve: "border-green-500/40 bg-green-500/5",
    desc: "Googles server mottar GET-forespørselen og sender tilbake HTTP-svaret med HTML-innholdet. TCP deler svaret i segmenter, sender dem, og reassemblerer dem på mottakersiden.",
    detaljer: `HTTP 200 OK svar:
  HTTP/1.1 200 OK
  Content-Type: text/html; charset=UTF-8
  Content-Length: 13428
  ...
  <html>...</html>

TCP-mottak:
  Google sender mange TCP-segmenter med HTML
  H sender TCP ACK for hvert segment (pålitelig levering)
  H reassemblerer segmentene til komplett HTML-dokument

Nettleseren parser HTML, laster bilder/CSS/JS
(nye DNS-oppslag, TCP-forbindelser for hvert domene!)`,
  },
  {
    nr: "7",
    tittel: "Ferdig! Alle lag i samspill",
    protokoll: "Alle lag",
    lag: "Alle fem lag",
    farve: "border-blue-500/40 bg-blue-500/10",
    desc: "Nettsiden vises! La oss se tilbake på hva hvert lag bidro med:",
    detaljer: `Lag 5 — Applikasjonslag:  HTTP (GET + svar), DNS (navn→IP), DHCP (IP-konfigurasjon)
Lag 4 — Transportlaget:   TCP (pålitelig, ordnet levering), UDP (DNS/DHCP)
Lag 3 — Nettverkslaget:   IP (ruting mellom nettverk, multi-hop)
Lag 2 — Linklaget:         Ethernet-rammer (hop-for-hop), ARP (IP→MAC)
Lag 1 — Fysisk lag:        Bits på kabelen (elektriske signaler/lys)

NØKKELPOENG:
- IP-adressen (src/dst) forblir UENDRET gjennom hele reisen
- Ethernet-headeren (MAC) byttes ut på HVERT hopp
- DNS + DHCP + ARP kjører ALLTID i bakgrunnen
- TCP gir pålitelighet; IP og Ethernet er upålitelige`,
  },
];

export default function CN6_7Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [showLayerSummary, setShowLayerSummary] = useState(false);

  const step = SCENARIO_STEPS[activeStep];

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.7 Et webforespørsel-scenario</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">6.7 Et webforespørsel-scenario fra A til Å</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Hva skjer egentlig når du skriver www.google.com og trykker Enter? Alle protokollene — DHCP, ARP, DNS, TCP, HTTP — aktiveres i rekkefølge. Dette scenariet binder sammen alt du har lært i kurset.
        </p>
      </div>

      {/* Oversiktstabell */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Oversikt: Protokollsekvensen</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--card)]">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">#</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Protokoll</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Hva den gjør</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Lag</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "DHCP", "Skaff IP-adresse, gateway, DNS-server", "Applikasjon/UDP/IP/Ethernet"],
                ["2", "ARP", "Finn gateway-ens MAC-adresse", "Linklaget"],
                ["3", "DNS", "Oversett www.google.com til IP-adresse", "Applikasjon/UDP/IP/Ethernet"],
                ["4", "TCP", "Opprett pålitelig forbindelse (3-veis handshake)", "Transport"],
                ["5", "HTTP", "Send GET-forespørsel om nettsiden", "Applikasjon/TCP/IP/Ethernet"],
                ["6", "HTTP+TCP", "Motta HTML-svar, reassembler", "Applikasjon+Transport"],
              ].map((r) => (
                <tr
                  key={r[0]}
                  onClick={() => setActiveStep(parseInt(r[0]))}
                  className={`cursor-pointer transition-colors hover:bg-[var(--card)] ${activeStep === parseInt(r[0]) ? "bg-blue-500/10" : ""}`}
                >
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono font-bold">{r[0]}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-semibold">{r[1]}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{r[2]}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-xs text-[var(--muted)]">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--muted)]">Klikk en rad for å hoppe til det steget.</p>
      </section>

      {/* Interaktiv steg-for-steg */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Interaktivt: Steg for steg</h2>

        {/* Steg-indikator */}
        <div className="flex gap-1">
          {SCENARIO_STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              title={s.tittel}
              className={`h-3 flex-1 rounded-full transition-all ${i === activeStep ? "bg-blue-500 scale-y-150" : i < activeStep ? "bg-blue-500/40" : "bg-[var(--card-border)]"}`}
            />
          ))}
        </div>

        {/* Aktivt steg */}
        <div className={`border-2 rounded-xl p-6 ${step.farve}`}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-xs text-[var(--muted)] mb-1">Steg {activeStep} av {SCENARIO_STEPS.length - 1}</div>
              <h3 className="font-bold text-xl">{step.tittel}</h3>
            </div>
            <div className="text-right">
              <div className="text-xs bg-[var(--card)] border border-[var(--card-border)] rounded px-2 py-1 font-mono">{step.protokoll}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{step.lag}</div>
            </div>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4">{step.desc}</p>

          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-lg p-4">
            <div className="text-xs font-semibold text-[var(--muted)] mb-2">DETALJER:</div>
            <pre className="font-mono text-xs text-[var(--muted)] whitespace-pre-wrap leading-relaxed">{step.detaljer}</pre>
          </div>
        </div>

        {/* Navigasjon */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm disabled:opacity-40"
          >
            ← Forrige steg
          </button>
          <button
            onClick={() => setActiveStep(Math.min(SCENARIO_STEPS.length - 1, activeStep + 1))}
            disabled={activeStep === SCENARIO_STEPS.length - 1}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-40"
          >
            Neste steg →
          </button>
          <button onClick={() => setActiveStep(0)} className="text-sm text-[var(--muted)] hover:text-[var(--accent)] ml-auto">
            ↺ Start på nytt
          </button>
        </div>
      </section>

      {/* Innkapsling — lag-for-lag */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Innkapsling lag for lag</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            En HTTP GET-forespørsel sendes som innkapslet data gjennom alle lagene. Hvert lag legger til sin header (og trailer på linklaget):
          </p>
          <div className="space-y-2 font-mono text-xs">
            {[
              { lag: "HTTP (applikasjon)", innhold: "GET / HTTP/1.1\\nHost: www.google.com\\n...", farge: "bg-purple-500/20 border-purple-500/40" },
              { lag: "TCP (transport)", innhold: "[TCP header: src-port, dst-port, seq, ack] + HTTP-data", farge: "bg-blue-500/20 border-blue-500/40" },
              { lag: "IP (nettverk)", innhold: "[IP header: src-IP, dst-IP, TTL, protocol=TCP] + TCP-segment", farge: "bg-green-500/20 border-green-500/40" },
              { lag: "Ethernet (link)", innhold: "[Eth header: dst-MAC, src-MAC, type=0x0800] + IP-datagram + [CRC]", farge: "bg-amber-500/20 border-amber-500/40" },
              { lag: "Fysisk lag", innhold: "Bits: 01001000 01000101 01000001 01000100 ...", farge: "bg-gray-500/20 border-gray-500/40" },
            ].map((l) => (
              <div key={l.lag} className={`border rounded-lg p-2 ${l.farge}`}>
                <span className="font-bold">{l.lag}: </span>
                <span className="text-[var(--muted)]">{l.innhold}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-[var(--muted)]">
            Mottakersiden avkapsler i omvendt rekkefølge: fysisk → Ethernet → IP → TCP → HTTP.
          </div>
        </div>
      </section>

      {/* Hoppbeskrivelse — MAC-bytte */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Hva skjer med MAC-adressen på hvert hopp?</h2>
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted)] mb-4">
            Dette er et kritisk konsept: IP-adressen er konstant fra ende til ende. MAC-adressen endres ved hvert hopp.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr className="bg-[var(--card)]">
                  <th className="border border-[var(--card-border)] px-3 py-2">Hopp</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">src-MAC</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">dst-MAC</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">src-IP</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">dst-IP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["H → Switch → R", "H-MAC", "R-MAC (gateway!)", "192.168.1.101", "142.250.74.100"],
                  ["R → neste ruter", "R-out-MAC", "NextHop-MAC", "192.168.1.101", "142.250.74.100"],
                  ["... (internett-hops)", "...", "...", "192.168.1.101", "142.250.74.100"],
                  ["LastRuter → Google", "LastRuter-MAC", "Google-NIC-MAC", "192.168.1.101", "142.250.74.100"],
                ].map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (
                      <td key={i} className={`border border-[var(--card-border)] px-3 py-2 ${i >= 3 ? "text-blue-500" : ""}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-[var(--muted)]">
            <strong>Nøkkelpoeng:</strong> src-IP og dst-IP er <strong>alltid 192.168.1.101 og 142.250.74.100</strong> gjennom hele reisen. Rutere bytter ut Ethernet-headeren ved hvert hopp — de bruker ARP for å finne neste hopps MAC-adresse.
          </div>
        </div>
      </section>

      {/* Lag-sammendrag */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Alle lags rolle — oppsummering</h2>
        <button
          onClick={() => setShowLayerSummary(!showLayerSummary)}
          className="text-sm text-[var(--accent)] hover:underline"
        >
          {showLayerSummary ? "▲ Skjul" : "▼ Vis alle lags rolle i scenariet"}
        </button>
        {showLayerSummary && (
          <div className="space-y-3">
            {[
              {
                lag: "Lag 5 — Applikasjonslag",
                protokoller: "HTTP, DNS, DHCP",
                rolle: "HTTP ber om nettsiden (GET) og mottar svaret. DNS oversetter hostnavn til IP. DHCP konfigurerer nettverksparametere.",
                farge: "border-purple-500/40 bg-purple-500/5",
              },
              {
                lag: "Lag 4 — Transportlaget",
                protokoller: "TCP (HTTP), UDP (DNS, DHCP)",
                rolle: "TCP gir pålitelig, ordnet, byte-stream-tjeneste. 3-veis handshake etablerer forbindelsen. ACK og retransmisjoner sikrer levering. UDP er raskere men upålitelig — ok for DNS (liten melding, kort RTT).",
                farge: "border-blue-500/40 bg-blue-500/5",
              },
              {
                lag: "Lag 3 — Nettverkslaget",
                protokoller: "IP (IPv4)",
                rolle: "Ruting av datagrammer fra H (192.168.1.101) til Google (142.250.74.100) gjennom mange hop. Rutere leser IP-header og bestemmer neste hopp. TTL dekrementeres ved hvert hopp.",
                farge: "border-green-500/40 bg-green-500/5",
              },
              {
                lag: "Lag 2 — Linklaget",
                protokoller: "Ethernet, ARP",
                rolle: "Ethernet-rammer bærer IP-datagrammene mellom naboenheter. ARP løser IP → MAC for hvert hopp. Switch videresender rammer basert på switch-tabell (self-learning).",
                farge: "border-amber-500/40 bg-amber-500/5",
              },
              {
                lag: "Lag 1 — Fysisk lag",
                protokoller: "Ethernet (elektrisk/optisk)",
                rolle: "Konverterer bits til elektriske signaler (kobberkabler), lyspulser (fiber) eller radiobølger (WiFi). Sender bits over den fysiske kabelen.",
                farge: "border-gray-500/40 bg-gray-500/5",
              },
            ].map((l) => (
              <div key={l.lag} className={`border rounded-xl p-4 ${l.farge}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{l.lag}</span>
                  <span className="text-xs font-mono bg-[var(--card)] border border-[var(--card-border)] px-2 py-1 rounded">{l.protokoller}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">{l.rolle}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Vanlige feil */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Vanlige feil studenter gjør</h2>
        <div className="space-y-3">
          {[
            {
              feil: "Tror ARP kjøres bare én gang",
              riktig: "ARP kjøres for HVERT nytt nabohopp. Ruteren trenger ARP for neste ruterens MAC, osv. Men ARP-cachen hjelper — vi unngår ARP for nylig brukte adresser.",
            },
            {
              feil: "Tror DNS kjøres for hvert HTTP-request",
              riktig: "DNS-resultater caches i OS og nettleser (TTL). Neste gang du besøker google.com trenger ikke nettleseren DNS-oppslag (med mindre cachen er utløpt).",
            },
            {
              feil: "Tror IP-adressen endres underveis",
              riktig: "src-IP og dst-IP forblir UENDRET gjennom hele reisen. Bare Ethernet-MAC bytter ved hvert hopp. NAT (adresseoversetting) er unntaket.",
            },
          ].map((f) => (
            <div key={f.feil} className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="font-semibold text-red-600 dark:text-red-400 text-sm mb-1">Feil: {f.feil}</p>
              <p className="text-sm text-[var(--muted)]">{f.riktig}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eksamentips */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Hva du MÅ forstå</h2>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
          <ul className="space-y-2 text-sm">
            {[
              "Rekkefølgen: DHCP → ARP (gateway) → DNS → ARP (hvis nødvendig) → TCP handshake → HTTP GET → HTTP svar",
              "DHCP gir deg: IP-adresse, subnettmaske, default gateway, DNS-server",
              "ARP trenger du FØR du kan sende noe (for å finne gateway-ens MAC)",
              "DNS er nødvendig fordi IP-adressen til www.google.com ikke er hardkodet i nettleseren",
              "TCP (pålitelig) brukes for HTTP. UDP (rask, upålitelig) brukes for DNS og DHCP.",
              "IP-adressen er konstant. Ethernet-MAC endres ved hvert hopp.",
              "Switcher arbeider på lag 2 (MAC). Rutere arbeider på lag 3 (IP).",
            ].map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">✓</span>
                <span className="text-[var(--muted)]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-6/teori/6-6" className="hover:text-[var(--accent)] text-sm">
          ← 6.6 Data-senter nettverk
        </Link>
        <Link href="/dat110/cn-6/teori" className="hover:text-[var(--accent)] text-sm">
          ↑ Alle delkapitler
        </Link>
      </div>
    </div>
  );
}
