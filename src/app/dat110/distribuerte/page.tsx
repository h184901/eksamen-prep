"use client";

import Link from "next/link";
import { useState } from "react";

function Card({ color, children }: { color: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    purple: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
    emerald: "border-emerald-400/60 bg-emerald-50 dark:bg-emerald-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>
      {children}
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-3 overflow-hidden">
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

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-2 font-mono text-sm text-blue-800 dark:text-blue-300 my-2">
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
      <span className="font-bold">Tips: </span>{children}
    </div>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return !show
    ? <button onClick={() => setShow(true)} className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 mt-2">Vis svar</button>
    : <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-3 text-sm mt-2">{children}</div>;
}

/* Interaktiv Overlay RDP kalkulator */
function OverlayRDP() {
  const [physBest, setPhysBest] = useState(20);
  const [overlayPath, setOverlayPath] = useState(27);
  const rdp = (overlayPath / physBest).toFixed(3);
  const isEfficient = parseFloat(rdp) < 1.5;

  return (
    <div className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-5">
      <h3 className="font-bold mb-3">Interaktiv: RDP-kalkulator</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium block mb-1">Beste fysiske sti-delay (ms)</label>
          <input
            type="range" min={5} max={100} value={physBest}
            onChange={e => setPhysBest(Number(e.target.value))}
            className="w-full accent-network-500"
          />
          <span className="text-sm font-mono">{physBest} ms</span>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Overlay-sti delay (ms)</label>
          <input
            type="range" min={physBest} max={physBest * 5} value={Math.max(overlayPath, physBest)}
            onChange={e => setOverlayPath(Number(e.target.value))}
            className="w-full accent-network-500"
          />
          <span className="text-sm font-mono">{Math.max(overlayPath, physBest)} ms</span>
        </div>
      </div>
      <div className={`rounded-lg p-3 text-center ${isEfficient ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-red-50 dark:bg-red-950/20"}`}>
        <p className="text-2xl font-bold font-mono">{rdp}</p>
        <p className="text-sm text-[var(--muted)]">RDP = {Math.max(overlayPath, physBest)}/{physBest}</p>
        <p className={`text-sm font-bold mt-1 ${isEfficient ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
          {isEfficient ? "Relativt effektivt overlay" : "Ineffektivt overlay — stor overhead"}
        </p>
      </div>
    </div>
  );
}

/* Vektorklokke visualizer */
function VectorClock() {
  const [step, setStep] = useState(0);

  const events = [
    { desc: "Start — alle klokker er [0,0,0,0]", clocks: [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]] },
    { desc: "P1 intern hendelse a: P1[0]++", clocks: [[1,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]] },
    { desc: "P1 sender s1 til P2 (P1[0]++, send [2,0,0,0])", clocks: [[2,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]] },
    { desc: "P2 mottar r1: VC_P2 = max([0,0,0,0],[2,0,0,0])+P2++", clocks: [[2,0,0,0], [2,1,0,0], [0,0,0,0], [0,0,0,0]] },
    { desc: "P3 intern hendelse e", clocks: [[2,0,0,0], [2,1,0,0], [0,0,1,0], [0,0,0,0]] },
    { desc: "P1 sender s2 til P3 (P1[0]++, send [3,0,0,0])", clocks: [[3,0,0,0], [2,1,0,0], [0,0,1,0], [0,0,0,0]] },
    { desc: "P3 mottar fra P1: max([0,0,1,0],[3,0,0,0])+P3++ = [3,0,2,0]", clocks: [[3,0,0,0], [2,1,0,0], [3,0,2,0], [0,0,0,0]] },
  ];

  const cur = events[Math.min(step, events.length - 1)];

  return (
    <div className="rounded-xl border-2 border-purple-400/40 bg-[var(--card)] p-5">
      <h3 className="font-bold mb-2">Interaktiv: Vektorklokker steg for steg</h3>
      <p className="text-sm text-[var(--muted)] mb-4">Fire prosesser P1-P4. Følg hendelsene:</p>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setStep(s => Math.max(0, s-1))} className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800">← Tilbake</button>
        <button onClick={() => setStep(s => Math.min(events.length-1, s+1))} className="px-3 py-1.5 rounded-lg text-sm bg-purple-500 text-white hover:bg-purple-600">Neste hendelse →</button>
        <button onClick={() => setStep(0)} className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800">Reset</button>
      </div>

      <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 p-3 mb-3 text-sm">
        <span className="font-bold text-purple-700 dark:text-purple-400">Steg {step}/{events.length-1}: </span>
        {cur.desc}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {["P1", "P2", "P3", "P4"].map((p, pi) => (
          <div key={p} className="rounded-lg border border-purple-300 dark:border-purple-700 p-2 text-center">
            <p className="font-bold text-purple-700 dark:text-purple-400 text-sm mb-1">{p}</p>
            <p className="font-mono text-xs">[{cur.clocks[pi].join(",")}]</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DistribuertePage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span>Distribuerte systemer</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Distribuerte systemer</h1>
      <p className="text-[var(--muted)] mb-8">RPC, konsistensmodeller, replikering, feiltoleranse, klokkesett og overlay-nettverk</p>

      {/* RPC */}
      <h2 className="text-xl font-bold mb-4">1. RPC — Remote Procedure Call</h2>

      <Card color="gold">
        <h3 className="font-bold mb-2">Hva er RPC?</h3>
        <p className="text-sm">RPC lar en klientprosess kalle en funksjon på en fjernserver <strong>som om den var lokal</strong>. Mellomvaren (stub) håndterer marshaling/unmarshaling av parametere og nettverkskommunikasjonen.</p>
      </Card>

      <Collapsible title="Synkron vs Asynkron RPC" defaultOpen={true}>
        <div className="space-y-3 text-sm">
          <Card color="blue">
            <h4 className="font-bold mb-1">Synkron RPC</h4>
            <p>Klienten <strong>blokkeres</strong> til den mottar svar fra serveren. Enklest å implementere, men klienten er idle mens den venter.</p>
          </Card>
          <Card color="network">
            <h4 className="font-bold mb-2">Tre typer Asynkron RPC (eksamensfavoritt!)</h4>
            <div className="space-y-2">
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2 border border-network-200 dark:border-network-800">
                <p className="font-bold">1. ACK-kun</p>
                <p className="text-xs text-[var(--muted)]">Server sender kun bekreftelse (acceptance) → klient fortsetter umiddelbart. Ingen venting på resultat.</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2 border border-network-200 dark:border-network-800">
                <p className="font-bold">2. Utsatt synkron (Deferred Synchronous)</p>
                <p className="text-xs text-[var(--muted)]">Server sender ACK. Sender deretter resultatet via separat enveis-RPC til klienten når klart (klient avbrytes/callbacks).</p>
              </div>
              <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2 border border-network-200 dark:border-network-800">
                <p className="font-bold">3. Multicast RPC</p>
                <p className="text-xs text-[var(--muted)]">Klient sender til <em>multiple</em> servere samtidig. Resultater returneres via callbacks. Brukt ved replikering.</p>
              </div>
            </div>
          </Card>
          <Tip>Lær disse tre typene utenat. De spørres i oppgave 9 på nesten alle eksamener.</Tip>
        </div>
      </Collapsible>

      <Collapsible title="De fem klassene av RPC-feil (kritisk!)">
        <div className="text-sm space-y-2">
          <Card color="red">
            <h4 className="font-bold mb-2">Fem feilsituasjoner — lær alle!</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Klienten finner ikke serveren</strong>
                <p className="text-xs text-[var(--muted)] ml-4 mt-0.5">Ingen forespørsel kan sendes. Server kanskje nede eller ikke registrert.</p>
              </li>
              <li>
                <strong>Klientens forespørsel går tapt</strong>
                <p className="text-xs text-[var(--muted)] ml-4 mt-0.5">Melding mistes i nettverket. Server vet ikke at forespørsel ble sendt.</p>
              </li>
              <li>
                <strong>Serveren krasjer etter å ha mottatt forespørsel</strong>
                <p className="text-xs text-[var(--muted)] ml-4 mt-0.5">Tjenesten kan ha startet men ikke fullføres. Klienten vet ikke hva som skjedde.</p>
              </li>
              <li>
                <strong>Serverens svar går tapt</strong>
                <p className="text-xs text-[var(--muted)] ml-4 mt-0.5">Tjenesten er fullført, men klienten mottar aldri svaret. Fare for dobbel-utførelse ved retry.</p>
              </li>
              <li>
                <strong>Klienten krasjer etter å ha sendt forespørsel</strong>
                <p className="text-xs text-[var(--muted)] ml-4 mt-0.5">Server sender svar til nystartet klient som ikke forventer det (orphan computation).</p>
              </li>
            </ol>
          </Card>
          <Tip>Disse fem klassene er eksamensklassikere. Lær dem i rekkefølge: klient-kan-ikke-finne, forespørsel-tapt, server-krasj, svar-tapt, klient-krasj.</Tip>
        </div>
      </Collapsible>

      {/* Konsistens */}
      <h2 className="text-xl font-bold mb-4 mt-8">2. Konsistensmodeller</h2>

      <Card color="gold">
        <h3 className="font-bold mb-3">Data-sentrert vs Klient-sentrert konsistens</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800 p-3">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Data-sentrert konsistens</p>
            <p>Definert fra <strong>datasystemets perspektiv</strong>. Alle prosesser ser oppdateringer i en definert global orden.</p>
            <div className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              <p><strong>Sekvensiell:</strong> Alle ser samme globale rekkefølge</p>
              <p><strong>Kausal:</strong> Årsak → virkning bevares</p>
              <p><strong>FIFO:</strong> Meldinger fra én sender leveres i orden</p>
              <p><strong>Svak/Frigjøring:</strong> Synkronisering kun ved synk-operasjoner</p>
            </div>
          </div>
          <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800 p-3">
            <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Klient-sentrert konsistens</p>
            <p>Garanterer konsistens fra <strong>én enkelt klients perspektiv</strong>. Klienten ser alltid sine egne oppdateringer.</p>
            <div className="mt-2 space-y-1 text-xs text-[var(--muted)]">
              <p><strong>Monoton-lesing:</strong> Leser aldri eldre data enn sist lest</p>
              <p><strong>Monoton-skriving:</strong> Skrivinger fullføres i rekkefølge</p>
              <p><strong>Les-dine-skrivinger:</strong> Ser egne skrivinger ved lesing</p>
              <p><strong>Skrivinger-følger-lesinger:</strong> Skriver etter det man har lest</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Replikering */}
      <h2 className="text-xl font-bold mb-4 mt-8">3. Replikering</h2>

      <Collapsible title="Årsaker til replikering" defaultOpen={false}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { årsak: "Feiltoleranse", forklaring: "Hvis én replika krasjer, tar en annen over. Ingen data går tapt." },
            { årsak: "Ytelse", forklaring: "Data plasseres nær brukerne geografisk. Lastbalansering mellom replikaer." },
            { årsak: "Skalerbarhet", forklaring: "Fordel last over mange noder. Unngå flaskehalser ved én sentral server." },
            { årsak: "Tilgjengelighet", forklaring: "Data tilgjengelig selv om noen noder er nede. Høyere oppetid." },
          ].map(({ årsak, forklaring }) => (
            <div key={årsak} className="rounded-lg border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/20 p-3">
              <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">{årsak}</p>
              <p className="text-xs text-[var(--muted)]">{forklaring}</p>
            </div>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="Primærbasert vs Replikert-skriving">
        <div className="text-sm space-y-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
            <p className="font-bold mb-1">Primærbasert replikering</p>
            <p>Én primærserver mottar alle skrivinger og replikerer til backup-servere. Enklere konsistens. Primær er bottleneck og single-point-of-failure.</p>
            <p className="text-xs mt-1 text-[var(--muted)]">Eksempel: MySQL primary-replica, HDFS NameNode</p>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
            <p className="font-bold mb-1">Replikert-skriving (Active replication)</p>
            <p>Alle replikaer mottar og utfører alle oppdateringer. Mer kompleks koordinering. Ingen single-point-of-failure. Brukes med multicast.</p>
            <p className="text-xs mt-1 text-[var(--muted)]">Eksempel: Chord DHT, Zookeeper</p>
          </div>
        </div>
      </Collapsible>

      {/* Overlay og RDP */}
      <h2 className="text-xl font-bold mb-4 mt-8">4. Overlay-nettverk og RDP</h2>

      <Card color="gold">
        <h3 className="font-bold mb-2">Overlay-nettverk — intuisjon</h3>
        <p className="text-sm">Et <strong>overlay-nettverk</strong> er et logisk nettverk bygget oppå det fysiske nettverket. Nodene er applikasjonsprosesser, og kantene er virtuelle forbindelser implementert via fysiske stier.</p>
        <p className="text-sm mt-2">Eksempler: Chord DHT, BitTorrent, Skype (P2P), CDN-nettverk</p>
      </Card>

      <Collapsible title="RDP — Relative Delay Penalty (eksamensfavoritt!)" defaultOpen={true}>
        <Formula>RDP(A→B) = overlay-sti delay(A→B) / beste fysiske sti delay(A→B)</Formula>
        <div className="text-sm space-y-2">
          <p>RDP er alltid ≥ 1.0 — overlay kan aldri slå den fysiske beste stien.</p>
          <p>RDP nær 1.0 = svært effektivt overlay. RDP = 2.0 = dobbelt så lang forsinkelse som fysisk optimalt.</p>
          <h4 className="font-bold mt-2">Fremgangsmåte for RDP-oppgave:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Bygg fullt overlay-graf: N*(N-1)/2 kanter</li>
            <li>Finn best fysisk sti for hvert overlay-par (Dijkstra eller inspeksjon)</li>
            <li>For gitt multicast-tre: summer overlay-kanter langs treet for A→B</li>
            <li>RDP = (steg 3) / (steg 2 for A→B)</li>
            <li>Total trekkostnad = sum av alle kanter i treet</li>
          </ol>
          <Tip>To separate spørsmål: (1) Hvilket tre er mest effektivt for ett par (lavest RDP)? (2) Hvilket tre er mest effektivt totalt (lavest total kostnad)?</Tip>
        </div>
      </Collapsible>

      <OverlayRDP />

      {/* Klokkesett */}
      <h2 className="text-xl font-bold mb-4 mt-8">5. Logiske klokkesett</h2>

      <Collapsible title="Lamport-klokker">
        <div className="text-sm space-y-2">
          <Formula>
            Intern hendelse i Pi: LC_i++<br/>
            Send fra Pi: LC_i++, send med melding<br/>
            Mottak i Pj fra Pi: LC_j = max(LC_j, LC_i) + 1
          </Formula>
          <p><strong>Formål:</strong> Gir en delvis ordning av hendelser. Hvis a → b, da LC(a) &lt; LC(b). Men LC(a) &lt; LC(b) betyr IKKE nødvendigvis a → b.</p>
          <p><strong>Begrensning:</strong> Kan ikke detektere samtidige hendelser.</p>
        </div>
      </Collapsible>

      <Collapsible title="Vektorklokker — full kausalitetsordning">
        <div className="text-sm space-y-2">
          <Formula>
            Hendelse i Pi: VC_i[i]++<br/>
            Send fra Pi: VC_i[i]++, send VC_i med melding<br/>
            Mottak i Pj fra Pi: VC_j[k] = max(VC_j[k], VC_i[k]) for alle k, deretter VC_j[j]++
          </Formula>
          <p><strong>Fordel over Lamport:</strong> VC(a) &lt; VC(b) ⟺ a → b. Detekterer samtidige hendelser: VC(a) og VC(b) er inkompararbare.</p>
        </div>
      </Collapsible>

      <VectorClock />

      {/* Feiltoleranse */}
      <h2 className="text-xl font-bold mb-4 mt-8">6. Feiltoleranse og prosessgrupper</h2>

      <Collapsible title="Flat vs Hierarkisk gruppe">
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Card color="blue">
            <h4 className="font-bold mb-1">Flat gruppe</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Alle prosesser er like — ingen leder</li>
              <li>Demokratisk beslutningstaking</li>
              <li>Ingen single-point-of-failure</li>
              <li>Mer robust ved svikt</li>
              <li>Kompleks koordinering</li>
            </ul>
          </Card>
          <Card color="network">
            <h4 className="font-bold mb-1">Hierarkisk gruppe</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Én koordinator + arbeidere</li>
              <li>Koordinator fordeler oppgaver</li>
              <li>Enkel koordinering</li>
              <li>Koordinator er single-point-of-failure</li>
              <li>Krever ledervalg ved krasj</li>
            </ul>
          </Card>
        </div>
      </Collapsible>

      <Collapsible title="Hierarkisk tilbakemeldingskontroll (pålitelig multicast)">
        <div className="text-sm space-y-2">
          <p>Brukes for svært store mottakergrupper der individuell ACK/NACK skalerer dårlig:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Del inn i undergrupper organisert som tre</li>
            <li>Hver undergruppe har lokal koordinator C</li>
            <li>C håndterer retransmisjon innen sin gruppe</li>
            <li>Hvis C mangler melding: ber koordinatoren til sender-gruppen om retransmisjon</li>
            <li>Kun koordinatorer kommuniserer på tvers av grupper</li>
          </ol>
          <p className="mt-1">Reduserer antall tilbakemeldinger fra O(N) til O(log N).</p>
        </div>
      </Collapsible>

      {/* Øvingsoppgaver */}
      <h2 className="text-xl font-bold mb-4 mt-8">7. Øvingsoppgaver</h2>

      <div className="space-y-4">
        {[
          {
            q: "Forklar forskjellen mellom stateful og stateless server. Gi ett eksempel på hver.",
            a: (
              <div>
                <p><strong>Stateful:</strong> Opprettholder persistent tilstandsinformasjon om klienter. Eksempel: FTP-server som husker innlogget bruker og gjeldende katalog.</p>
                <p className="mt-1"><strong>Stateless:</strong> Lagrer ingen klienttilstand. Kan endre egen tilstand uten å varsle klienter. Eksempel: DNS-server — hver spørring behandles uavhengig. HTTP i seg selv (tilstand via cookies).</p>
              </div>
            ),
          },
          {
            q: "To prosesser P1 og P2 kommuniserer. P1 sender hendelse s1 til P2. P2 sender hendelse s2 til P3. Tegn vektorklokker for alle hendelser.",
            a: (
              <div>
                <p>Start: P1=[0,0,0], P2=[0,0,0], P3=[0,0,0]</p>
                <p className="mt-1">P1 sender s1 (P1[0]++): P1=[1,0,0], sender [1,0,0]</p>
                <p>P2 mottar s1: VC_P2 = max([0,0,0],[1,0,0])+P2[1]++ = [1,1,0]</p>
                <p>P2 sender s2 (P2[1]++): P2=[1,2,0], sender [1,2,0]</p>
                <p>P3 mottar s2: VC_P3 = max([0,0,0],[1,2,0])+P3[2]++ = [1,2,1]</p>
              </div>
            ),
          },
          {
            q: "Fem prosesser A-E bygger overlay-nettverk. Fysisk: A-B=5, B-C=10, C-D=5, D-E=5. Beregn RDP for Tree 1 (A-B-C-D-E linje) for paret A→D.",
            a: (
              <div>
                <p><strong>Overlay-kant A→D</strong> = best fysisk A→D = A→B→C→D = 5+10+5 = 20</p>
                <p className="mt-1"><strong>Tree 1 (linje A-B-C-D-E):</strong> A→D traverserer A→B→C→D = overlay(A-B)+overlay(B-C)+overlay(C-D) = 5+10+5 = 20</p>
                <p className="mt-1"><strong>RDP = 20/20 = 1.0</strong> — perfekt effektivt!</p>
                <p className="text-xs text-[var(--muted)] mt-1">En linje gir RDP=1.0 når alle noder er lineært ordnet på den fysiske topologien.</p>
              </div>
            ),
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-2">Oppgave {i + 1}</p>
            <p className="text-sm text-[var(--muted)] mb-3">{q}</p>
            <Answer>{a}</Answer>
          </div>
        ))}
      </div>
    </div>
  );
}
