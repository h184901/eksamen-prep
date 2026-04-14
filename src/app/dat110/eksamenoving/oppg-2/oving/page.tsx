"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  // ── Prosjekt 1: RPC ──────────────────────────────────────────
  {
    front: "Hvilke tre lag er bygget i Prosjekt 1?",
    back: "1) Connection-lag: TCP-sockets, åpne/lukke forbindelser. 2) Messaging-lag: 128-byte meldinger, skjuler TCP-framing. 3) RPC-lag: klient-stub (marshalling) og server-stub (unmarshalling + dispatch). Hvert lag bruker laget under.",
  },
  {
    front: "Hva er marshalling og unmarshalling i RPC?",
    back: "Marshalling: serialisering av Java-typer til bytes for nettverksoverføring (klient-stub gjør dette). Unmarshalling: deserialisering av bytes tilbake til Java-typer (server-stub gjør dette). Prosjekt 1 støtter: void, String, int, boolean.",
  },
  {
    front: "Hva angir de første 8 bitsene i en 128-byte melding (Prosjekt 1)?",
    back: "Antall nyttebytes (payload) i de neste 127 bytene (verdi 0–127). Nødvendig fordi ikke alle meldinger fyller 127 bytes — resten er padding. Fast meldingsstørrelse forenkler TCP-framing.",
  },
  {
    front: "Hva er service-ID og method-ID i RPC-laget?",
    back: "Service-ID identifiserer tjenesten (f.eks. TemperaturSensor). Method-ID identifiserer hvilken metode i tjenesten (f.eks. read()). Server-stub slår opp begge i en tabell for å route kallet til riktig Java-metode. Metodenummer 0 er reservert for stop().",
  },
  {
    front: "Hva er de fem RPC-feilklassene?",
    back: "1) Klient finner ikke server. 2) Forespørsel fra klient til server går tapt. 3) Server krasjer etter mottak (metode utføres ikke). 4) Svar fra server til klient går tapt. 5) Klient krasjer etter at svaret er sendt.",
  },
  {
    front: "Hva er de tre typene asynkron RPC?",
    back: "1) ACK-kun: server sender kun bekreftelse, klient fortsetter uten å vente på resultat. 2) Utsatt synkron: ACK + resultat via separat enveis-RPC. 3) Multicast RPC: klient sender til flere servere, resultater via callbacks.",
  },
  // ── Prosjekt 2: Publish-Subscribe ────────────────────────────
  {
    front: "Hva er publish-subscribe mønsteret og hva er løskoblingen?",
    back: "Publisher publiserer melding til topic. Broker distribuerer til alle subscribers på topicet. Publisher og subscriber kjenner ikke hverandre — kun broker. Denne løskoblingen gjør systemet fleksibelt: nye subscribers kan legges til uten å endre publisher.",
  },
  {
    front: "Hva er de sentrale komponentene i pub/sub-megleren (Prosjekt 2)?",
    back: "Broker: mottar og distribuerer meldinger. Storage: lagrer clientSessions (String→ClientSession) og subscriptions (topic→Set<String>). Dispatcher: StoppableThread som itererer over sessions og håndterer meldinger via onConnect(), onPublish() osv.",
  },
  {
    front: "Hva er StoppableThread og hvorfor brukes det?",
    back: "Tråd som kan stoppes ryddig via doStop() som setter running=false. Neste iterasjon av while(running) { doProcess(); } sjekker flagget og avslutter. Unngår Thread.stop() som er deprecated og kan forlate objekter i inkonsistent tilstand.",
  },
  {
    front: "Hva er Storage-datamodellen i Prosjekt 2?",
    back: "To hash-maps: 1) ConcurrentHashMap<String, ClientSession> clients — bruker-ID til tilkoblingssesjonen. 2) ConcurrentHashMap<String, Set<String>> subscriptions — topic-navn til sett av brukernavn. onPublish() henter getSubscribers(topic) og sender til hver.",
  },
  {
    front: "Hva er meldingsprotokollen i Prosjekt 2 mellom klient og broker?",
    back: "Java-objekter serialisert til JSON via gson. Eksempel: {\"type\":\"CONNECT\",\"user\":\"sensor\"}. Typer: CONNECT, DISCONNECT, CREATETOPIC, DELETETOPIC, SUBSCRIBE, UNSUBSCRIBE, PUBLISH. Dispatcher ruter på type-feltet.",
  },
  // ── Prosjekt 3: Chord DHT ─────────────────────────────────────
  {
    front: "Hva er Chord DHT og hva er ringtopologien?",
    back: "Distribuert hash-tabell med ring-topologi (0 til 2^m - 1). Noder og nøkler plasseres via konsistent hashing (MD5 mod 2^m). Nøkkel k tilhører successor(k) = første node n der n ≥ k (med wrap-around). Gir jevn lastfordeling.",
  },
  {
    front: "Fingertabelformelen i Chord",
    back: "FT[i] = successor(n + 2^(i-1) mod 2^m), for i = 1, 2, ..., m. Hvert hopp halverer omtrent gjenværende søkeavstand → O(log N) oppslag. m oppføringer per node.",
  },
  {
    front: "findSuccessor(id) vs closestPrecedingNode(id) i Chord",
    back: "findSuccessor(id): returnerer noden ansvarlig for id. Sjekker om id er mellom n og succ(n); ellers kaller closestPrecedingNode og delegerer. closestPrecedingNode(id): søker fingertabellen baklengs og returnerer høyeste FT[i] i (n, id). Disse to metodene er kjernen i oppslaget.",
  },
  {
    front: "Hva er nøkkelansvar-regelen i Chord?",
    back: "Nøkkel k tilhører noden n der pred(n) < k ≤ n (sirkulært med wrap-around). Med noder {1, 6, 11, 15} og m=4: nøkkel 9 → 6 < 9 ≤ 11 → Server 11. Nøkkel 0 → 15 < 0 ≤ 1 (wrap) → Server 1.",
  },
  {
    front: "Hva er MD5-hashing i Chord DHT (Prosjekt 3)?",
    back: "MD5 mapper nodenavn og filnavn til 128-bit heltall. Trunkeres til m bits. Gir jevn (uniform) fordeling av nøkler over ringen uten at man trenger å velge nøkler manuelt. Brukes for konsistent hashing.",
  },
  {
    front: "Hva er remote-write protokollen i Prosjekt 3?",
    back: "Én replika er primær per fil. Alle skrivinger videresending til primærnoden. Primær oppdaterer sin kopi og varsler alle andre replikaer om å gjøre det samme. Gir sterk konsistens (alle kopier synkrone). Ulempe: primærnoden er single-point-of-failure.",
  },
  {
    front: "Distribuert gjensidig utelukkelse — Ricart-Agrawala. Antall meldinger?",
    back: "2×(N-1) meldinger per kritisk seksjon: (N-1) REQUEST sendes til alle andre noder, (N-1) REPLY mottas. Noder i kritisk seksjon utsetter svar. Ordning: lavest (Lamport-timestamp, node-ID) går først inn i kritisk seksjon.",
  },
];

const quizQuestions = [
  {
    question: "Hvilken rekkefølge er lagene i Prosjekt 1 (fra lavest til høyest)?",
    options: [
      "RPC-lag → Messaging-lag → Connection-lag",
      "Connection-lag → Messaging-lag → RPC-lag",
      "Messaging-lag → Connection-lag → RPC-lag",
      "TCP-lag → IP-lag → RPC-lag",
    ],
    correctIndex: 1,
    explanation:
      "Connection-lag (TCP-sockets) er grunnlaget. Messaging-lag bygger på Connection og gir diskrete meldinger. RPC-lag bygger på Messaging og gir metode-kall-abstraksjon. Hvert lag bruker tjenestene til laget under.",
  },
  {
    question: "Hva angir de første 8 bitsene i en 128-byte melding i Prosjekt 1?",
    options: [
      "Meldingstype (REQUEST, RESPONSE eller ERROR)",
      "Avsenders portnummer",
      "Antall nyttebytes i de neste 127 bytene (0–127)",
      "Metodenummeret for RPC-kallet",
    ],
    correctIndex: 2,
    explanation:
      "Første byte = lengde på nyttelast. Verdien (0–127) sier hvor mange av de 127 neste bytene som er faktisk data — resten er padding. Fast meldingsstørrelse forenkler TCP-framing.",
  },
  {
    question: "I pub/sub (Prosjekt 2): hva gjør onPublish()-metoden i Dispatcher?",
    options: [
      "Oppretter et nytt topic og registrerer publisher",
      "Lagrer meldingen i Storage og svarer publisher med ACK",
      "Henter alle subscribers for topicet og sender meldingen til hver av dem",
      "Videresender meldingen til alle tilkoblede klienter uavhengig av topic",
    ],
    correctIndex: 2,
    explanation:
      "onPublish() kaller storage.getSubscribers(topic) for å finne alle abonnenter, og sender PublishMsg til hver via deres ClientSession. Kun abonnenter på det aktuelle topicet mottar meldingen — dette er selve kjernen i pub/sub.",
  },
  {
    question: "Chord DHT med m=4 bits og servere {1, 6, 11, 15}. Hvilken server er ansvarlig for nøkkel 9?",
    options: ["Server 1", "Server 6", "Server 11", "Server 15"],
    correctIndex: 2,
    explanation:
      "Regel: pred(n) < nøkkel ≤ n. For 9: pred(11) = 6, så 6 < 9 ≤ 11 → Server 11. Server 6 eier nøkler (1 < k ≤ 6), Server 11 eier (6 < k ≤ 11).",
  },
  {
    question: "Server n=6, m=4 bits. Hva er FT[3]?",
    options: [
      "successor(6 + 1) = successor(7)",
      "successor(6 + 2) = successor(8)",
      "successor(6 + 4) = successor(10)",
      "successor(6 + 8) = successor(14)",
    ],
    correctIndex: 2,
    explanation:
      "FT[i] = successor(n + 2^(i-1)). For i=3: FT[3] = successor(6 + 2^2) = successor(6 + 4) = successor(10). Med servere {1,6,11,15}: successor(10) = 11.",
  },
  {
    question: "Hva er StoppableThread i Prosjekt 2?",
    options: [
      "En tråd som kan pauses med Thread.suspend()",
      "En tråd som stoppes ryddig via et 'running'-flagg som settes til false",
      "En tråd som automatisk stopper etter 10 sekunder",
      "En tråd med prioritet 1 (lavest mulig)",
    ],
    correctIndex: 1,
    explanation:
      "StoppableThread bruker doStop()-metoden som setter running=false. Tråden kjører while(running) { doProcess(); } og stopper etter gjeldende iterasjon. Unngår Thread.stop() som er deprecated og usikker.",
  },
  {
    question: "Remote-write protokollen i Prosjekt 3 — hva er dens fordel og ulempe?",
    options: [
      "Fordel: alle noder kan skrive parallelt. Ulempe: konsistens er svak.",
      "Fordel: sterk konsistens — alle kopier synkrone. Ulempe: primærnoden er single-point-of-failure.",
      "Fordel: ingen nettverkskommunikasjon ved skriving. Ulempe: data kan gå tapt.",
      "Fordel: lavere forsinkelse enn lokal skriving. Ulempe: krever UDP.",
    ],
    correctIndex: 1,
    explanation:
      "Remote-write: kun primærnode skriver, varsler alle replikaer → sterk konsistens (alle kopier synkrone etter skriving). Ulempe: primærnoden er flaskehals og single-point-of-failure. Sammenlign med quorum-skriving der last fordeles.",
  },
  {
    question: "Distribuert gjensidig utelukkelse med N=5 noder (Ricart-Agrawala). Antall meldinger?",
    options: ["4 meldinger", "8 meldinger", "10 meldinger", "20 meldinger"],
    correctIndex: 1,
    explanation:
      "2×(N-1) = 2×(5-1) = 8 meldinger. Noden sender (N-1)=4 REQUEST-meldinger og mottar (N-1)=4 REPLY-meldinger. RELEASE-meldingene etter kritisk seksjon er ekstra. Generelt: 2(N-1) per kritisk seksjon.",
  },
  {
    question: "Hva er forskjellen mellom findSuccessor() og closestPrecedingNode() i Chord?",
    options: [
      "findSuccessor() søker fremover i ringen; closestPrecedingNode() søker bakover",
      "findSuccessor() returnerer noden ansvarlig for en ID; closestPrecedingNode() søker fingertabellen baklengs for nærmeste node < ID",
      "De gjør det samme — closestPrecedingNode() er bare et alias",
      "findSuccessor() bruker UDP; closestPrecedingNode() bruker TCP",
    ],
    correctIndex: 1,
    explanation:
      "findSuccessor(id): returnerer ansvarlig node for id (kan kalle seg selv rekursivt via andre noder). closestPrecedingNode(id): lokal metode som søker fingertabellen baklengs og returnerer høyeste FT[i] i (n, id). closestPrecedingNode brukes av findSuccessor for å gjøre effektive hopp.",
  },
  {
    question: "I pub/sub (Prosjekt 2): hva skjer med subscriptions når en klient kobler fra?",
    options: [
      "Subscriptions beholdes permanent i Storage",
      "Broker sender alle uleverte meldinger til klienten etter reconnect",
      "ClientSession fjernes fra Storage — subscriptions slettes (ingen bufring i grunnversjonen)",
      "Broker varsler alle andre subscribers om at klienten koblet fra",
    ],
    correctIndex: 2,
    explanation:
      "I grunnversjonen av Prosjekt 2: onDisconnect() fjerner ClientSession. Subscriptions og eventuelle meldinger publisert mens klienten var frakoblet går tapt. Task E (valgfri) implementerer meldings-bufring for reconnect.",
  },
];

export default function Oppg2Oving() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards — Alle tre prosjekter</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på kortet for å se svaret. Kortene dekker RPC-arkitektur (Prosjekt 1),
          publish-subscribe mønstre (Prosjekt 2) og Chord DHT (Prosjekt 3).
          Øv til du kan forklare hvert konsept uten å nøle.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Quiz — Prosjektarkitektur</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Spørsmål i eksamensstil om arkitektur og designvalg i alle tre obligene.
          Les forklaringen nøye — eksamen belønner begrunnelse, ikke bare riktig svar.
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
