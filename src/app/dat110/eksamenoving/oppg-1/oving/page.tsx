"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  {
    front: "Hva er de fire typene forsinkelse i et pakkesvitsjet nettverk?",
    back: "1) Prosessering (sjekk header, routing). 2) Kø (vente i buffer). 3) Sending (d_trans = L/R). 4) Forplantning (d_prop = d/s).",
  },
  {
    front: "Hva er forskjellen mellom TCP og UDP?",
    back: "TCP: tilkoblingsbasert, pålitelig, flytkontroll, metningskontroll, rekkefølgekontroll. UDP: tilkoblingsløst, best-effort, raskere, mindre overhead. Eksempel: HTTP bruker TCP, DNS bruker UDP.",
  },
  {
    front: "Hva er ARP og hva brukes det til?",
    back: "Address Resolution Protocol: oversetter IP-adresser til MAC-adresser på LAN. Sender broadcast-forespørsel, eieren svarer med sin MAC. Svaret caches i ARP-tabellen.",
  },
  {
    front: "Hva betyr transparency i distribuerte systemer?",
    back: "Skjule at systemet er distribuert for brukere og applikasjoner. Typer: access, location, migration, replication, concurrency, failure, performance transparency.",
  },
  {
    front: "Hva er Chord DHT og hvordan fungerer oppslag?",
    back: "Distribuert hash-tabell med ring-topologi. Nøkler plasseres på noder med konsistent hashing. Fingertabell gir O(log N) oppslag: FT[i] = succ(n + 2^(i-1)).",
  },
  {
    front: "Hva er forskjellen mellom link-state og distance-vector routing?",
    back: "LS (Dijkstra): alle noder kjenner hele topologien, beregner korteste sti sentralt. DV (Bellman-Ford): noder kjenner kun naboers kostnader, distribuert iterasjon. LS konvergerer raskere men krever mer minne.",
  },
  {
    front: "Hva er RPC og hvilke 5 feilklasser finnes?",
    back: "Remote Procedure Call: kall prosedyre på annen maskin som om den var lokal. 5 feilklasser: 1) Klient finner ikke server, 2) Forespørsel tapt, 3) Server krasjer, 4) Svar tapt, 5) Klient krasjer etter svar.",
  },
  {
    front: "Hva er CIDR-notasjon og hvordan beregner du antall adresser?",
    back: "Classless Inter-Domain Routing. Format: a.b.c.d/x der x = nettverksbiter. Antall adresser = 2^(32-x). Eks: /20 gir 2¹² = 4096 adresser.",
  },
  {
    front: "Hva er vektorklokker og hvorfor er de bedre enn Lamport-klokker?",
    back: "Vektorklokker: hver prosess har vektor med en klokke per prosess. Fanger opp kausalitet (happens-before). Lamport-klokker: enkel teller, kan IKKE utlede kausalitet fra klokketall alene. Vektorer er fulle kausale indikatorer.",
  },
  {
    front: "Hva er Ethernet type-feltet og hva sier verdiene?",
    back: "2-bytes felt i Ethernet-rammen som identifiserer nettverkslagsprotokoll: 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6. Brukes for å demultiplekse innkommende rammer.",
  },
  {
    front: "Hva er IaaS, PaaS og SaaS?",
    back: "IaaS: virtuell infrastruktur (VMs, lagring) — brukeren styrer OS og applikasjoner. PaaS: plattform for utvikling (database, runtime) — brukeren styrer applikasjoner. SaaS: ferdig applikasjon (Gmail, Salesforce) — brukeren styrer kun data.",
  },
  {
    front: "Hva er kravet for Byzantine feiltoleranse?",
    back: "N ≥ 3f + 1 noder for å tolerere f Byzantine-feil (ondsinnede/feilaktige noder). Crash-feiltoleranse krever kun N ≥ 2f + 1. Merk: Byzantine er mye strengere.",
  },
  {
    front: "Hva er DNS-hierarkiet?",
    back: "3 nivåer: 1) Root-servere (13 sett globalt, kjenner TLD-servere). 2) TLD-servere (com, no, org — kjenner autoritative). 3) Autoritative servere (vet faktisk IP for domenet). Lokale DNS-servere cacher svar.",
  },
  {
    front: "Hva er probabilistisk flooding i overlay-nettverk?",
    back: "Videresend melding med sannsynlighet p < 1 (ikke alltid). Reduserer nettverkstrafikk sammenlignet med ren flooding (der alle naboer alltid får). Avveiing: lavere overhead vs. risiko for at noen noder ikke nås.",
  },
];

const quizQuestions = [
  {
    question: "Hvilken tjeneste tilbyr linklaget til nettverkslaget?",
    options: [
      "Pålitelig ende-til-ende overføring",
      "Upålitelig overføring mellom to nabonoder",
      "Kryptert overføring mellom to endepunkter",
      "Garantert levering innen en tidsfrist",
    ],
    correctIndex: 1,
    explanation:
      "Linklaget overfører rammer mellom to direkte tilkoblede noder (hop-by-hop). Det gir IKKE pålitelig overføring — det er TCP (transportlaget) sin oppgave. Linklaget kan oppdage feil med CRC, men garanterer ikke levering.",
  },
  {
    question: "En organisasjon har CIDR-blokk 192.168.4.0/22. Hvor mange IP-adresser er i blokken?",
    options: ["256", "512", "1024", "2048"],
    correctIndex: 2,
    explanation:
      "/22 gir 32-22=10 bits hostdel → 2¹⁰ = 1024 adresser totalt (inkl. nett- og broadcast-adresse). Brukbare adresser: 1022.",
  },
  {
    question: "Hva identifiserer unikt et transportlags-endepunkt (socket)?",
    options: [
      "Kun IP-adressen",
      "Kun portnummeret",
      "IP-adresse + portnummer",
      "MAC-adresse + portnummer",
    ],
    correctIndex: 2,
    explanation:
      "En socket er et (IP, port)-par. IP-adressen identifiserer verten, portnummeret identifiserer prosessen. Uten begge kan ikke transportlaget levere til riktig applikasjon.",
  },
  {
    question: "Minimum antall noder for å tolerere f=2 Byzantine-feil?",
    options: ["4", "5", "6", "7"],
    correctIndex: 3,
    explanation:
      "N ≥ 3f + 1 = 3×2 + 1 = 7. Byzantine-toleranse krever 3f+1 fordi ondsinnede noder aktivt kan villede systemet. For crash-toleranse holder 2f+1 = 5.",
  },
  {
    question: "Hvilken protokoll bruker DNS som standard transportprotokoll?",
    options: ["TCP port 53", "UDP port 53", "TCP port 80", "UDP port 80"],
    correctIndex: 1,
    explanation:
      "DNS bruker UDP port 53 for rask oppslag (spørsmål/svar passer i ett UDP-datagram). TCP brukes for soneoverføringer og svar > 512 bytes.",
  },
  {
    question: "Hva er rapid elasticity i cloud computing?",
    options: [
      "Ressurser er alltid tilgjengelige og kan skaleres opp/ned raskt og automatisk",
      "Ressurser faktureres per sekund",
      "Alle ressurser er fysisk isolert fra andre kunder",
      "Data lagres automatisk i 3 kopier",
    ],
    correctIndex: 0,
    explanation:
      "Rapid elasticity (NIST): ressurser kan tildeles og frigjøres elastisk — ofte automatisk. For brukeren virker kapasiteten ubegrenset. Dette er det som skiller cloud fra tradisjonell hosting.",
  },
  {
    question: "Hva er forskjellen mellom link-state og distance-vector routing?",
    options: [
      "LS bruker Bellman-Ford, DV bruker Dijkstra",
      "LS: alle kjenner hele topologien (Dijkstra). DV: kun naboers kostnader (Bellman-Ford, distribuert)",
      "LS er mer skalerbart enn DV",
      "DV konvergerer raskere enn LS",
    ],
    correctIndex: 1,
    explanation:
      "LS (f.eks. OSPF): hvert node flooder topologiinfo til alle, kjører Dijkstra lokalt. DV (f.eks. RIP): noder utveksler avstandsvektorer med naboer, itererer til konvergens. LS konvergerer raskere; DV er enklere å implementere.",
  },
  {
    question: "Hva er en omission failure?",
    options: [
      "En prosess gir feil svar",
      "En prosess stopper helt og gjenoppstår ikke",
      "En prosess unnlater å motta eller sende en melding",
      "En prosess sender meldingen for sent",
    ],
    correctIndex: 2,
    explanation:
      "Omission failure: prosessen kjører men svarer ikke (send-omission) eller mottar ikke (receive-omission). Crash failure: prosessen stopper helt. Byzantine failure: prosessen gir villedende svar.",
  },
  {
    question: "Hva gir en digital signatur som et vanlig passord ikke gir?",
    options: [
      "Konfidensialitet",
      "Raskere autentisering",
      "Ikke-avvisning (non-repudiation)",
      "Symmetrisk kryptering",
    ],
    correctIndex: 2,
    explanation:
      "Digital signatur med privat nøkkel gir non-repudiation: kun avsender kjenner sin private nøkkel, så de kan ikke nekte for å ha signert. Passord beviser ikke dette.",
  },
  {
    question: "Hva er formålet med Chord DHT sin fingertabell?",
    options: [
      "Lagre alle nøkler lokalt for rask tilgang",
      "Finne noden som eier en gitt nøkkel i O(log N) hopp",
      "Oppdage noder som har krasjet i ringen",
      "Fordele belastning jevnt mellom alle noder",
    ],
    correctIndex: 1,
    explanation:
      "Fingertabell: m oppføringer, FT[i] = succ(n + 2^(i-1)). Lar noden hoppe halvveis mot målet for hvert hopp → O(log N) hopp istedenfor O(N) i lineær søk.",
  },
  {
    question: "Hva er CSMA/CD sin rolle?",
    options: [
      "Kryptere Ethernet-rammer",
      "Oppdage kollisjoner og styre retransmisjon på delt medium",
      "Rute pakker mellom subnett",
      "Fordele IP-adresser til noder",
    ],
    correctIndex: 1,
    explanation:
      "CSMA/CD (Carrier Sense Multiple Access with Collision Detection): 1) Lytt før sending. 2) Oppdager kollisjon → send jam-signal. 3) Exponential backoff. Brukes i tradisjonell Ethernet (ikke WiFi som bruker CSMA/CA).",
  },
  {
    question: "Hva er IaaS?",
    options: [
      "Ferdig applikasjon levert over nett (f.eks. Gmail)",
      "Plattform for applikasjonsutvikling (f.eks. Google App Engine)",
      "Virtuell infrastruktur: VMs, lagring, nettverk (f.eks. AWS EC2)",
      "Databasetjeneste som et API",
    ],
    correctIndex: 2,
    explanation:
      "IaaS (Infrastructure as a Service): laveste abstraksjonsniå i cloud. Brukeren får virtuelle maskiner og styrer OS, runtime og applikasjoner selv. PaaS gir ferdig plattform, SaaS gir ferdig applikasjon.",
  },
];

export default function Oppg1Oving() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på kortet for å se svaret. Disse dekker alle typiske
          flervalgstema fra eksamen. Øv til du kan alle uten å nøle.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Quiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Spørsmål i eksamensstil — velg riktig alternativ. Forklaringen hjelper
          deg forstå hvorfor svaret er riktig.
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
