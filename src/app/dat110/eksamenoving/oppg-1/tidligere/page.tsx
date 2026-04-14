"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-emerald-400/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
        >
          Vis svar
        </button>
      ) : (
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 p-4 text-sm space-y-1">
          {children}
        </div>
      )}
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
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-5">{children}</div>}
    </div>
  );
}

function MCQ({
  letter,
  question,
  correct,
  explanation,
}: {
  letter: string;
  question: string;
  correct: string;
  explanation: string;
}) {
  return (
    <div className="border-l-2 border-emerald-300 dark:border-emerald-700 pl-4">
      <p className="font-semibold text-sm">
        <span className="font-mono text-emerald-600 dark:text-emerald-400 mr-1">{letter})</span>
        {question}
      </p>
      <Answer>
        <p>
          <strong>Svar: </strong>
          {correct}
        </p>
        <p className="text-[var(--muted)]">{explanation}</p>
      </Answer>
    </div>
  );
}

export default function Oppg1Tidligere() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Faktiske flervalgsspørsmål fra tidligere eksamener. Prøv å svare selv
        før du klikker &ldquo;Vis svar&rdquo;.
      </p>

      {/* Januar 2025 */}
      <ExamYear year="Jan 2025" title="Oppg 1 — Flervalg (10 spørsmål)">
        <MCQ
          letter="a"
          question="Hvilken tjeneste tilbyr linklaget? Pålitelig overføring mellom to noder. Upålitelig overføring mellom to noder. Pålitelig ende-til-ende overføring. Upålitelig ende-til-ende overføring."
          correct="Upålitelig overføring mellom to noder."
          explanation="Linklaget overfører rammer mellom to direkte tilkoblede noder. Det gir IKKE pålitelighet — det er transportlagets (TCP) oppgave. Linklaget kan oppdage feil (CRC), men garanterer ikke levering."
        />
        <MCQ
          letter="b"
          question="Trafikkintensitet La/R der a = 100 pakker/s, L = 1000 bits, R = 10⁵ bps. Hva er trafikkintensiteten?"
          correct="La/R = (100 × 1000) / 100 000 = 1.0 — kritisk grense."
          explanation="La/R = 1.0 betyr at køen vokser ubegrenset i teorien. Selv 0.99 kan gi enorme forsinkelser. La/R > 1 er umulig å håndtere stabilt."
        />
        <MCQ
          letter="c"
          question="Hva identifiserer et transportlags-endepunkt (socket) unikt?"
          correct="IP-adresse + portnummer."
          explanation="En socket er et (IP, port)-par. IP-adressen identifiserer verten, portnummeret identifiserer prosessen/tjenesten på verten. Kun IP er ikke nok — det kan kjøre mange prosesser."
        />
        <MCQ
          letter="d"
          question="Hva skjer ved kollisjon i CSMA/CD?"
          correct="Alle sendende stasjoner stopper, venter en tilfeldig tid (binary exponential backoff), og prøver på nytt."
          explanation="CSMA/CD: 1) Lytt mens du sender. 2) Oppdager du kollisjon, sender du jam signal. 3) Vent tilfeldig tid (backoff dobles for hver kollisjon). 4) Prøv på nytt. Kollisjonsvinduer er kritisk i Ethernet."
        />
        <MCQ
          letter="e"
          question="Hva er DNS-systemets primære formål?"
          correct="Oversette domenenavn til IP-adresser (navneoppslag)."
          explanation="DNS = Domain Name System. Oversetter f.eks. www.google.com til 142.250.74.36. Hierarkisk system med root-servere, TLD-servere og autoritative servere."
        />
        <MCQ
          letter="f"
          question="Hva er probabilistisk flooding i overlay-nettverk?"
          correct="Hver node videresender en melding med sannsynlighet p < 1, ikke alltid."
          explanation="I ren flooding videresendes til ALLE naboer — gir mange duplikater. Probabilistisk flooding reduserer trafikk ved å videresende med sannsynlighet p (f.eks. 0.7). Avveiing: færre meldinger vs. lavere nåbarhet."
        />
        <MCQ
          letter="g"
          question="Hva er 'rapid elasticity' i cloud computing?"
          correct="Ressurser kan skaleres opp og ned raskt etter behov, ofte automatisk."
          explanation="En av NIST sine fem kjennetegn ved cloud: ressurser virker ubegrensede og kan tildeles/frigjøres automatisk. Brukeren trenger ikke planlegge kapasitet på forhånd."
        />
        <MCQ
          letter="h"
          question="Hva er RPC (Remote Procedure Call)?"
          correct="En mekanisme som lar et program kalle en prosedyre på en annen maskin som om den var lokal."
          explanation="RPC skjuler nettverkskommunikasjonen via stubs. Klient-stub serialiserer (marshalling), sender, server-stub deserialiserer og kaller lokal metode. Svaret returneres tilsvarende."
        />
        <MCQ
          letter="i"
          question="Hva er prosessresiliency i distribuerte systemer via grupper?"
          correct="Organisere prosesser i grupper slik at systemet kan fortsette å fungere selv om noen prosesser feiler."
          explanation="Prosessgrupper gir feiltoleranse: hvis en node feiler, tar de resterende over. Krever replikering og koordinering. Antallet feil systemet tåler avhenger av protokollen (2f+1 for crash, 3f+1 for Byzantine)."
        />
        <MCQ
          letter="j"
          question="Hva gir digitale signaturer?"
          correct="Autentisering og ikke-avvisning (non-repudiation) — mottaker kan verifisere avsender og avsenderen kan ikke nekte for å ha sendt."
          explanation="Digitale signaturer: avsender signerer med privat nøkkel, mottaker verifiserer med avsenders offentlige nøkkel. Gir: 1) Autentisering (hvem sendte?). 2) Integritet (endret?). 3) Non-repudiation (kan ikke nekte)."
        />
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster Jan 2025: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Brede spørsmål fra CN (a–f) og DS (g–j). Merk at spørsmålene er korte og direkte — lær kjernedefinisjonene utenat.
          </span>
        </div>
      </ExamYear>

      {/* Mai 2024 */}
      <ExamYear year="Mai 2024" title="Oppg 1 — Flervalg (10 spørsmål)">
        <MCQ
          letter="a"
          question="Hva er formålet med ARP (Address Resolution Protocol)?"
          correct="Oversette IP-adresser til MAC-adresser på et lokalt nettverk."
          explanation="ARP sender broadcast på LAN: &ldquo;Hvem har IP 192.168.1.5?&rdquo; Eieren svarer med sin MAC-adresse. Svaret caches i ARP-tabellen. Uten ARP kan ikke linklaget sende rammer til riktig mottaker."
        />
        <MCQ
          letter="b"
          question="Hvilke protokoller er applikasjonslag-protokoller? HTTP, FTP, SMTP, DNS — eller TCP, UDP, IP?"
          correct="HTTP, FTP, SMTP og DNS er applikasjonslag-protokoller."
          explanation="Applikasjonslaget: HTTP (web), FTP (filoverføring), SMTP (e-post), DNS (navneoppslag). TCP og UDP er transportlaget, IP er nettverkslaget."
        />
        <MCQ
          letter="c"
          question="Hva er forwardingens funksjon i en ruter?"
          correct="Flytte pakker fra inngangsport til riktig utgangsport basert på forwardingtabellen."
          explanation="Forwarding = dataplanen: lokal per-pakke operasjon basert på header-felt og forwardingtabell. Routing = kontrollplanen: beregne forwardingtabellen via rutingalgoritmer."
        />
        <MCQ
          letter="d"
          question="En organisasjon har CIDR-blokk 200.23.16.0/20. Hvor mange adresser er tilgjengelige?"
          correct="2¹² = 4096 adresser (inkl. nett- og kringkastingsadresse)."
          explanation="/20 betyr 20 bits nettverksdel, 32-20=12 bits hostdel. 2¹² = 4096. I praksis 4094 brukbare (minus nett- og broadcast-adresse)."
        />
        <MCQ
          letter="e"
          question="Hva brukes Type-feltet i Ethernet-rammer til?"
          correct="Identifisere hvilken nettverkslagsprotokoll som er encapsulert i rammens nyttelast (f.eks. IPv4 = 0x0800, ARP = 0x0806)."
          explanation="Ethernet type-felt (2 bytes): forteller mottaker hvilken protokoll som er inni ramma. IPv4 = 0x0800, IPv6 = 0x86DD, ARP = 0x0806. Uten dette vet mottaker ikke hvilken protokoll som skal behandle dataene."
        />
        <MCQ
          letter="f"
          question="Minimum antall meldinger for gjensidig utelukkelse med token-ring i distribuerte systemer?"
          correct="0 meldinger — noden som har tokenet går direkte inn i kritisk seksjon."
          explanation="Med token-ring: hvis du allerede har tokenet, trenger du ikke sende noen meldinger. Hvis du ikke har det: send forespørsel til alle (N-1), vent på N-1 svar = 2(N-1) meldinger. Merk: selve tokenet-passeringen koster ingenting ekstra."
        />
        <MCQ
          letter="g"
          question="Hva er en omission failure (utelatelsesfeil)?"
          correct="En prosess svarer ikke på en melding den mottok (eller en melding går tapt i nettverket)."
          explanation="Omission failure: prosessen kjører, men svarer ikke. Årsaker: crash, buffer full, melding tapt. Skilles fra crash failure (prosessen slutter helt å kjøre)."
        />
        <MCQ
          letter="h"
          question="Hva tilbyr IaaS (Infrastructure as a Service)?"
          correct="Virtualisert infrastruktur: virtuelle maskiner, lagring og nettverk — brukeren administrerer OS og applikasjoner selv."
          explanation="IaaS = laveste lag i cloud. Eksempler: AWS EC2, Google Compute Engine, Azure VMs. Brukeren får VM, ikke ferdig plattform (PaaS) eller ferdig applikasjon (SaaS)."
        />
        <MCQ
          letter="i"
          question="Hva er quorum-basert replikering?"
          correct="Operasjoner krever godkjenning fra et minimum antall replikaer (kvorum) — sikrer konsistens selv med feil."
          explanation="Quorum: les fra minst r replikaer, skriv til minst w replikaer, der r + w > N (total). Sikrer at les alltid finner den nyeste verdien. Brukes i f.eks. Dynamo, Cassandra."
        />
        <MCQ
          letter="j"
          question="Hva verifiserer en mottaker ved digitale signaturer?"
          correct="Mottaker bruker avsenders offentlige nøkkel for å dekryptere signaturen og verifisere at hashen stemmer."
          explanation="Prosess: Avsender hasher meldingen → krypterer hashen med privat nøkkel = signatur. Mottaker: dekrypterer signatur med offentlig nøkkel → sammenligner hash med egen beregning. Match = autentisk og uendret."
        />
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster Mai 2024: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Blanding av CN (a–e) og DS (f–j). Spørsmålene er mer detaljerte enn Jan 2025. CIDR-beregning er typisk.
          </span>
        </div>
      </ExamYear>

      {/* Januar 2024 */}
      <ExamYear year="Jan 2024" title="Oppg 1 — Flervalg (10 spørsmål)">
        <MCQ
          letter="a"
          question="Hvilke lag håndterer en ruter (router)?"
          correct="Fysisk lag, linklaget og nettverkslaget — IKKE transportlaget eller applikasjonslaget."
          explanation="Rutere opererer opp til nettverkslaget (lag 3). De leser IP-adresser for routing, men ser ikke TCP/UDP-porter. Hosts implementerer alle 5 lag inkl. transport og applikasjon."
        />
        <MCQ
          letter="b"
          question="Hva er DHCP brukt til?"
          correct="Automatisk tildeling av IP-adresser til verter på et nettverk."
          explanation="DHCP (Dynamic Host Configuration Protocol): Vert sender DISCOVER (broadcast) → DHCP-server tilbyr adresse (OFFER) → Vert aksepterer (REQUEST) → Server bekrefter (ACK). Gir IP, maske, gateway og DNS-server."
        />
        <MCQ
          letter="c"
          question="Hvilke mekanismer brukes for pålitelig dataoverføring?"
          correct="Sekvensnumre, bekreftelser (ACK), timer/timeout og retransmisjon."
          explanation="rdt (reliable data transfer): 1) Sjekksum for feiloppdagelse. 2) ACK/NAK for bekreftelse. 3) Timer for tap. 4) Sekvensnumre for duplikater. TCP bruker alle disse."
        />
        <MCQ
          letter="d"
          question="Hvordan tildeles IP-adresser i et subnet?"
          correct="Subnet-masken definerer nettverksdelen — alle verter i subnettet deler nettverksprefiks, men har unik hostdel."
          explanation="Subnet: f.eks. 192.168.1.0/24 gir adresser 192.168.1.1–192.168.1.254 (254 brukbare). Nettverksadressen (.0) og kringkastingsadressen (.255) er reserverte."
        />
        <MCQ
          letter="e"
          question="Hva identifiserer Ethernet type-feltet?"
          correct="Hvilken nettverkslagsprotokoll som er encapsulert (IPv4=0x0800, ARP=0x0806, IPv6=0x86DD)."
          explanation="Type-feltet (2 bytes etter destinasjons- og kilde-MAC) forteller hvilken protokoll som mottar dataene. Uten dette kan ikke mottaker demultiplekse til riktig protokoll."
        />
        <MCQ
          letter="f"
          question="Hva er kanten (edge) i et P2P-overlay-nettverk?"
          correct="En logisk forbindelse mellom to peers i overlaygrafen — kan gå over mange fysiske rutere."
          explanation="Overlay: virtuelt nettverk oppå det fysiske. En edge mellom node A og B i overlaygrafen betyr at A og B kommuniserer direkte (logisk), men pakken tar mange hopp i det fysiske nettverket."
        />
        <MCQ
          letter="g"
          question="Hva er en omission failure?"
          correct="En prosess unnlater å motta eller sende en melding."
          explanation="Omission failure: send-omission (sender ikke svaret) eller receive-omission (mottar ikke forespørselen). Skilles fra crash failure (prosessen stopper helt)."
        />
        <MCQ
          letter="h"
          question="Hva er DaaS (Data as a Service)?"
          correct="Tilgang til data via API/nettjenester — data lagres i skyen og er tilgjengelig on-demand."
          explanation="DaaS: leverandøren tilbyr data som en tjeneste. Kunden slipper å lagre og vedlikeholde dataene selv. Eksempler: finansdata-APIer, værtjenester, kartdata."
        />
        <MCQ
          letter="i"
          question="Hva er kravet til antall noder for å tolerere f Byzantine-feil?"
          correct="N ≥ 3f + 1 noder — trenger mer enn 2/3 korrekte noder for konsensus."
          explanation="Byzantine Fault Tolerance: ondsinnede/feilaktige noder kan sende feil info. Trenger N ≥ 3f+1 for å nå konsensus. Med f=1: trenger minst 4 noder. Mye strengere enn crash-toleranse (2f+1)."
        />
        <MCQ
          letter="j"
          question="Hva er ikke-avvisning (non-repudiation) i sikkerhet?"
          correct="Avsender kan ikke i ettertid nekte for å ha sendt en melding — bevises med digital signatur."
          explanation="Non-repudiation: kun avsenderen kjenner sin private nøkkel, så signaturen kan bare komme fra dem. Essensielt i juridiske og finansielle transaksjoner."
        />
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster Jan 2024: </span>
          <span className="text-amber-800 dark:text-amber-300">
            Mer tekniske spørsmål enn 2025. Legg merke til at Byzantine-kravet (3f+1) er et typisk spørsmål — lær formelen.
          </span>
        </div>
      </ExamYear>
    </div>
  );
}
