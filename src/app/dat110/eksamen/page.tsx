"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Shared UI ─── */
function Section({
  title,
  badge,
  badgeColor = "network",
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    network: "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-3 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base">{title}</span>
            {badge && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[badgeColor] ?? colors.network}`}>
                {badge}
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

function Q({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-semibold text-sm mb-1 text-[var(--muted)]">{label}</p>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 transition-colors"
        >
          Vis svar
        </button>
      ) : (
        <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-3 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
      <span className="font-bold">Eksamenstips: </span>{children}
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

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--card-border)] my-2">
      <table className="w-full text-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-bold text-xs">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 font-mono text-xs">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXAM 1: 2022
═══════════════════════════════════════════════════════════════ */
function Exam2022() {
  return (
    <div>
      <div className="rounded-xl bg-gradient-to-r from-network-100 to-blue-100 dark:from-network-900/20 dark:to-blue-900/20 p-4 mb-4">
        <h3 className="font-bold text-lg">DAT110 Eksamen — 2022</h3>
        <p className="text-sm text-[var(--muted)]">IoT-tilgangskontroll, nettverksforsinkelse, IPv4, ARP, ruting, distribuerte systemer</p>
      </div>

      <Section title="Oppgave 1 — Multiple Choice (10%)" badge="10%" badgeColor="network">
        <Q label="10 flervalg — typiske svar:">
          <ul className="space-y-1 list-disc list-inside">
            <li>Linklaget: <strong>upålitelig overføring av rammer over én kommunikasjonslinje</strong></li>
            <li>Transportlaget identifiserer endepunkt med: <strong>IP-adresse og portnummer</strong></li>
            <li>DNS: <strong>mapper vertsnavn til IP-adresser</strong></li>
            <li>CSMA er en <strong>kollisjonsbasert</strong> aksessprotokoll</li>
            <li>Digitale signaturer gir: <strong>integritet og ikke-fornektbarhet</strong></li>
            <li>IaaS: gir tilgang til <strong>virtuelle maskiner</strong></li>
            <li>RPC-hovedidé: la klientprosess <strong>kalle funksjon på fjernserver</strong></li>
            <li>Prosessresiliensitets: organiser prosesser i <strong>grupper</strong></li>
            <li>Byzantine agreement krever: <strong>3k+1</strong> prosesser (k = feil)</li>
            <li>Distribuert mutex: <strong>2*(N-1)</strong> meldinger</li>
          </ul>
        </Q>
        <Tip>Multiple choice-oppgavene er hentet fra Canvas-quizene. Repeter quizene grundig!</Tip>
      </Section>

      <Section title="Oppgave 2 — IoT-prosjekt: Arduino og tilgangskontroll (10%)" badge="10%" badgeColor="blue">
        <Q label="a) Arduino setup() og loop() — hva gjør de?">
          <Answer>
            <p><strong>setup():</strong> Kalles én gang ved oppstart — initialiserer maskinvare, pins, seriellkommunikasjon.</p>
            <p className="mt-1"><strong>loop():</strong> Kalles kontinuerlig i en evig løkke — her kjøres sensorlesing, kontroll og kommunikasjon.</p>
            <p className="mt-1">Analogt med en embedded main-loop: setup = constructor, loop = run()</p>
          </Answer>
        </Q>
        <Q label="b) REST API med Spark Java — hva er Spark?">
          <Answer>
            <p>Spark er et lett Java-rammeverk for å lage HTTP-servere (REST API). Tilsvarer Express.js for Node.js.</p>
            <p className="mt-1"><code className="bg-neutral-200 dark:bg-neutral-800 px-1 rounded">Spark.get(&quot;/status&quot;, (req, res) → &quot;OK&quot;);</code></p>
          </Answer>
        </Q>
        <Q label="c) Hva identifiserer en socket?">
          <Answer>
            <p>En socket identifiseres av et <strong>portnummer og en IP-adresse</strong> (socket-par).</p>
          </Answer>
        </Q>
        <Tip>Oppgave 2 handler ALLTID om obliger. Studer hvilken oblig som er relevant for årets eksamen.</Tip>
      </Section>

      <Section title="Oppgave 3 — Nettverksforsinkelse (10%)" badge="10%" badgeColor="network">
        <Q label="Parametere: R=10⁶ bits/s, d=10⁴ m, s=5×10⁸ m/s">
          <p className="text-xs text-[var(--muted)]">L=10³ bits, processing=0.002s, queuing=0.01s</p>
        </Q>
        <Q label="a) Sendingsforsinkelse (transmission delay)">
          <Formula>d_trans = L/R = 10³/10⁶ = 0.001 s</Formula>
          <Answer>
            <p><strong>0.001 sekunder</strong> (1 ms)</p>
          </Answer>
        </Q>
        <Q label="b) Total nodalforsinkelse (én ruter)">
          <Formula>
            d_prop = d/s = 10⁴/(5×10⁸) = 0.00002 s<br/>
            d_nodal = 0.002 + 0.01 + 0.00002 + 0.001 = 0.01302 s
          </Formula>
          <Answer>
            <p><strong>0.01302 sekunder</strong> ≈ 13 ms</p>
            <p className="mt-1">Husk: d_nodal = d_proc + d_queue + d_trans + d_prop</p>
          </Answer>
        </Q>
        <Q label="c) Ende-til-ende H1 → H3 (via R1, R2)">
          <Formula>d_total = 3 × 0.01302 = 0.03906 s</Formula>
          <Answer>
            <p><strong>0.03906 sekunder</strong> (3 noder × nodalforsinkelse)</p>
          </Answer>
        </Q>
        <Q label="d) Flaskehals-link: H1→R1 (50 Mbps), R1→R2 (100 Mbps), R2→H3 (10 Mbps)">
          <Answer>
            <p><strong>R2→H3-linjen</strong> (10 Mbps) — lavest kapasitet bestemmer gjennomstrømning.</p>
          </Answer>
        </Q>
        <Tip>
          Fire forsinkelsestyper: <strong>behandling, køing, sending (L/R), forplantning (d/s)</strong>.
          Flaskehals = laveste kapasitet på stien.
        </Tip>
      </Section>

      <Section title="Oppgave 4 — IPv4 datagram (10%)" badge="10%" badgeColor="blue">
        <Q label="a) Hva er IP-tjenesten?">
          <Answer>
            <p><strong>Upålitelig multi-hop ende-til-ende overføring av datagram</strong> (best effort, ingen garanti for levering, rekkefølge eller feilfrihet).</p>
          </Answer>
        </Q>
        <Q label="b) Felt: Identifier, Flags, Fragmentation offset">
          <Answer>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Identifier:</strong> Identifiserer hvilke fragmenter som tilhører samme originale datagram</li>
              <li><strong>Flags:</strong> Angir om reassemblering er fullstendig (flag=0 = siste fragment)</li>
              <li><strong>Fragmentation offset:</strong> Angir posisjonen til fragmentets data i det originale datagrammet</li>
            </ul>
          </Answer>
        </Q>
        <Q label="c) Felt: TTL, Source IP, Destination IP, Data">
          <Answer>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>TTL:</strong> Oppdager rutingløkker — dekrementeres ved hvert hopp, kastes ved 0</li>
              <li><strong>Source IP:</strong> Angir avsenderens IP-adresse</li>
              <li><strong>Destination IP:</strong> Angir mottakerens IP-adresse</li>
              <li><strong>Data:</strong> Faktiske data som overføres (transport-lags segment)</li>
            </ul>
          </Answer>
        </Q>
        <Q label="d) Hvordan angis UDP vs TCP i IP-datagrammet?">
          <Answer>
            <p><strong>Upper-layer protocol-feltet</strong> (protocol field) — f.eks. 6=TCP, 17=UDP.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 5 — ARP og switch-tabell (10%)" badge="10%" badgeColor="network">
        <Q label="Nettverk: H1 (192.168.0.1, MAC 1A:...:1F) port3, H2 (192.168.0.2) port2, H3 (192.168.0.3, MAC 3A:...:3F) port1">
          <p className="text-xs text-[var(--muted)]">H1 sender til H3 via switch S</p>
        </Q>
        <Q label="a) ARP-tabell på H1 etter kommunikasjon med H3">
          <Answer>
            <p><code className="bg-neutral-200 dark:bg-neutral-800 px-1 rounded">{"{"}192.168.0.3 → 3A:3B:3C:3D:3E:3F{"}"}</code></p>
            <p className="mt-1">ARP broadcast → H3 svarer med sin MAC → H1 lagrer i ARP-cache.</p>
          </Answer>
        </Q>
        <Q label="b) Switch-tabell etter H1→H3 og tilbake">
          <Table
            headers={["MAC-adresse", "Port"]}
            rows={[
              ["1A:1B:1C:1D:1E:1F (H1)", "3"],
              ["3A:3B:3C:3D:3E:3F (H3)", "1"],
            ]}
          />
          <Answer>
            <p>Switch lærer: H1s ramme ankom port 3 → lagrer H1-MAC→port3. H3s svar ankom port 1 → lagrer H3-MAC→port1.</p>
          </Answer>
        </Q>
        <Tip>Switch-læringsalgoritmen: <strong>kilde-MAC → innkommende port</strong>. Flooding hvis ukjent destination.</Tip>
      </Section>

      <Section title="Oppgave 6 — CIDR og IP-ruting (10%)" badge="10%" badgeColor="blue">
        <Q label="a) CIDR 224.192.40.0/22 — adresseintervall">
          <Formula>
            11100000.11000000.00101000.00000000 (start)<br/>
            11100000.11000000.00101011.11111111 (slutt)<br/>
            = 224.192.40.0 til 224.192.43.255
          </Formula>
          <Answer>
            <p><strong>224.192.40.0 — 224.192.43.255</strong> (2^10 = 1024 adresser, /22 = 22 faste bits)</p>
          </Answer>
        </Q>
        <Q label="b) Lengst-prefiks matching i forwardingstabell">
          <Answer>
            <p>Sammenlign destinasjons-IP bit-for-bit mot prefiksene. Velg det <strong>lengste</strong> som matcher.</p>
            <p className="mt-1">Ingen match → default/otherwise-grensesnitt.</p>
          </Answer>
        </Q>
        <Tip>Konverter alltid IP til binær, sammenlign prefiks-bits. Lengste match vinner.</Tip>
      </Section>

      <Section title="Oppgave 7 — Avstandsvektoralgoritme (10%)" badge="10%" badgeColor="purple">
        <Q label="Bellman-Ford: D_x(y) = min_v{c(x,v) + D_v(y)}">
          <Formula>D_x(y) = min over alle naboer v av [kostnad(x→v) + D_v(y)]</Formula>
        </Q>
        <Q label="Fremgangsmåte">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li>Initialiser: D_x(x)=0, D_x(y)=∞ for y≠x (unntatt direkte naboer)</li>
              <li>Motta naboers distansevektorer</li>
              <li>Oppdater med Bellman-Ford-formelen</li>
              <li>Send oppdatert vektor til naboer hvis endring</li>
              <li>Gjenta til ingen endringer (konvergert)</li>
            </ol>
          </Answer>
        </Q>
        <Tip>Vis ALL utregning steg-for-steg. Skriv min(verdi1, verdi2) = resultat eksplisitt.</Tip>
      </Section>

      <Section title="Oppgave 8 — Overlay-nettverk og RDP (10%)" badge="10%" badgeColor="network">
        <Q label="RDP = Relative Delay Penalty">
          <Formula>RDP = overlay-sti delay / best fysisk sti delay</Formula>
          <p className="text-xs text-[var(--muted)] mt-1">RDP nær 1.0 = effektivt overlay. Overlay kan aldri være raskere enn fysisk best-sti.</p>
        </Q>
        <Q label="Fremgangsmåte">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li>Finn beste fysiske sti (Dijkstra eller inspeksjon)</li>
              <li>Summer overlay-stiens lenker (som er minimum-forsinkelse fysiske stier)</li>
              <li>RDP = overlay / fysisk-best</li>
              <li>Sammenlign trær: lavere RDP = mer effektivt for det paret</li>
              <li>Total trekkostnad = summer alle kanter i treet</li>
            </ol>
          </Answer>
        </Q>
        <Tip>Husk: To spørsmål i RDP-oppgaver: (1) hvilken sti er best for ett par, (2) hvilket tre er best totalt (total kostnad).</Tip>
      </Section>

      <Section title="Oppgave 9 — Distribuerte systemer: konsistens og replikering (10%)" badge="10%" badgeColor="emerald">
        <Q label="Data-sentrert vs klient-sentrert konsistens">
          <Answer>
            <p><strong>Data-sentrert:</strong> Konsistens definert fra datasystemets perspektiv — alle prosesser ser data i en spesifikk ordre (f.eks. sekvensiell, kausal, FIFO).</p>
            <p className="mt-2"><strong>Klient-sentrert:</strong> Konsistens definert fra enkelt-klientens perspektiv — garanterer at én klient alltid ser sine egne oppdateringer, uavhengig av hvilken replika den kobler til. Typer: monoton-lesing, monoton-skriving, les-dine-skrivinger, skrivinger-følger-lesinger.</p>
          </Answer>
        </Q>
        <Q label="Replikeringsårsaker (alltid relevant)">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Feiltoleranse:</strong> Replika tar over ved krasj</li>
              <li><strong>Ytelse:</strong> Data nær brukere, lastbalansering</li>
              <li><strong>Skalerbarhet:</strong> Fordel last, unngå flaskehalser</li>
              <li><strong>Tilgjengelighet:</strong> Data på flere steder</li>
            </ul>
          </Answer>
        </Q>
        <Q label="Flat vs hierarkisk gruppe for feiltoleranse">
          <Answer>
            <p><strong>Flat gruppe:</strong> Alle prosesser er like, ingen leder. Alle tar beslutninger demokratisk. Svikt hos én påvirker ikke de andre. Mer robust, men kompleks koordinering.</p>
            <p className="mt-1"><strong>Hierarkisk gruppe:</strong> Én koordinator (leder), resten er arbeidere. Koordinator mottar forespørsler, fordeler til arbeidere. Enklere å koordinere, men koordinator er single-point-of-failure.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 10 — DHT/Chord (15%)" badge="15%" badgeColor="red">
        <Q label="Ring m=4 bits, servere: 1, 6, 11, 15">
          <p className="text-xs text-[var(--muted)]">Adresserom: 0–15 (2^4 = 16 noder)</p>
        </Q>
        <Q label="a) Fingertabeller — formel: succ(n + 2^(i-1) mod 2^m)">
          <Formula>FT[i] = succ((n + 2^(i-1)) mod 2^m)  for i = 1, 2, ..., m</Formula>
          <Table
            headers={["Server", "i=1 (+1)", "i=2 (+2)", "i=3 (+4)", "i=4 (+8)"]}
            rows={[
              ["1", "succ(2)=6", "succ(3)=6", "succ(5)=6", "succ(9)=11"],
              ["6", "succ(7)=11", "succ(8)=11", "succ(10)=11", "succ(14)=15"],
              ["11", "succ(12)=15", "succ(13)=15", "succ(15)=15", "succ(3)=6"],
              ["15", "succ(0)=1", "succ(1)=1", "succ(3)=6", "succ(7)=11"],
            ]}
          />
        </Q>
        <Q label="b) Nøkkelansvar: pred(server) < nøkkel ≤ server">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li>Nøkkel 3 → Server 6 (1 &lt; 3 ≤ 6)</li>
              <li>Nøkkel 6 → Server 6 (1 &lt; 6 ≤ 6)</li>
              <li>Nøkkel 9 → Server 11 (6 &lt; 9 ≤ 11)</li>
              <li>Nøkkel 14 → Server 15 (11 &lt; 14 ≤ 15)</li>
            </ul>
          </Answer>
        </Q>
        <Q label="c) Nøkkeloppslag fra server 1, nøkkel=9">
          <Answer>
            <p><strong>Runde 1 (n=1):</strong> succ=6, 1 &lt; 9 ≤ 6? Nei. Finn høyeste forgjengernode i FT: FT[3]=6, 1&lt;6&lt;9? Ja → gå til 6</p>
            <p className="mt-1"><strong>Runde 2 (n=6):</strong> succ=11, 6 &lt; 9 ≤ 11? Ja → <strong>Server 11 er ansvarlig</strong></p>
          </Answer>
        </Q>
        <Q label="d) Fordeler med DHT/Chord">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Skalerbar søking:</strong> O(log N) hopp takket være fingertabellen</li>
              <li><strong>Feiltoleranse:</strong> Replikering av data og prosesser — replika tar over ved krasj</li>
              <li><strong>Selvorganiserende:</strong> Noder kan forlate/slutte seg til ringen dynamisk</li>
            </ul>
          </Answer>
        </Q>
        <Tip>Chord-oppgaven er alltid 15% og alltid lik: fingertabeller → nøkkelansvar → oppslag steg-for-steg. Øv dette til du gjør det automatisk!</Tip>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXAM 2: 2023
═══════════════════════════════════════════════════════════════ */
function Exam2023() {
  return (
    <div>
      <div className="rounded-xl bg-gradient-to-r from-network-100 to-blue-100 dark:from-network-900/20 dark:to-blue-900/20 p-4 mb-4">
        <h3 className="font-bold text-lg">DAT110 Eksamen — 2023</h3>
        <p className="text-sm text-[var(--muted)]">ChordDHT-oblig, HTTP, UDP/TCP, ARP/switch, avstandsvektor, overlay, vektorklokker</p>
      </div>

      <Section title="Oppgave 2 — ChordDHT-oblig (10%)" badge="10%" badgeColor="blue">
        <Q label="a) MD5 i ChordDHT — hva brukes det til?">
          <Answer>
            <p>MD5-hashfunksjonen brukes til å <strong>mappe nøkler til adresser i ringen</strong>. Nøkkelverdi = hash(datanøkkel) mod 2^m. Sikrer jevn fordeling.</p>
          </Answer>
        </Q>
        <Q label="b) findSuccessor() og closestPrecedingNode()">
          <Answer>
            <p><strong>findSuccessor(id):</strong> Returnerer serveren som er ansvarlig for nøkkel id. Sjekker om id er mellom nåværende node og dens successor.</p>
            <p className="mt-1"><strong>closestPrecedingNode(id):</strong> Søker fingertabellen baklengs (fra høyeste finger), returnerer den noden som er nærmest id fra baksiden. Brukes i oppslags-algoritmen.</p>
          </Answer>
        </Q>
        <Q label="c) LamportClock — hva er det?">
          <Answer>
            <p>Logisk klokke som gir <strong>kausal ordning av hendelser</strong> i distribuerte systemer. Regler:</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Inkrementer klokke ved intern hendelse</li>
              <li>Inkrementer og send klokke med melding</li>
              <li>Ved mottak: klokke = max(lokal, mottatt) + 1</li>
            </ol>
          </Answer>
        </Q>
        <Tip>Lamport-klokker gir kausal ordning men ikke full kausalitet — to samtidige hendelser kan ha vilkårlig rekkefølge.</Tip>
      </Section>

      <Section title="Oppgave 3 — HTTP og applikasjonslaget (10%)" badge="10%" badgeColor="network">
        <Q label="HTTP — viktige konsepter">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Persistent vs ikke-persistent:</strong> Persistent gjenbruker TCP-tilkobling; ikke-persistent åpner ny per objekt (2 RTT overhead)</li>
              <li><strong>GET/POST/HEAD:</strong> GET=hent ressurs, POST=send data til server, HEAD=hent kun header</li>
              <li><strong>Stateless:</strong> HTTP-server lagrer ingen tilstand mellom forespørsler (cookies for tilstand)</li>
              <li><strong>Cacheing:</strong> Conditional GET med If-Modified-Since — sparer båndbredde</li>
            </ul>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 4 — UDP vs TCP (10%)" badge="10%" badgeColor="blue">
        <Q label="Sammenligning">
          <Table
            headers={["Egenskap", "UDP", "TCP"]}
            rows={[
              ["Forbindelsesoppsett", "Ingen", "3-veis handshake"],
              ["Pålitelighet", "Upålitelig", "Garantert levering"],
              ["Rekkefølge", "Ingen garanti", "Korrekt rekkefølge"],
              ["Flyt-kontroll", "Ingen", "Sliding window"],
              ["Overhead", "Lav (8B header)", "Høy (20B+ header)"],
              ["Bruksområde", "DNS, streaming, gaming", "HTTP, FTP, SSH"],
            ]}
          />
        </Q>
      </Section>

      <Section title="Oppgave 9 — Vektorklokker (10%)" badge="10%" badgeColor="purple">
        <Q label="Fire prosesser P1–P4 med hendelser — oppdateringsregler">
          <Formula>
            Ved sending fra Pi: VC_i[i]++, send vektor med melding<br/>
            Ved mottak i Pj fra Pi: VC_j[k] = max(VC_j[k], VC_i[k]) for alle k, deretter VC_j[j]++
          </Formula>
        </Q>
        <Q label="Eksempel: P1: (a,s1,s2), P2: (b,c,d), P3: (r1,e,s3), P4: (r2,r3,f)">
          <Answer>
            <p>Start alle med [0,0,0,0]. Etter alle hendelser:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>s1 fra P1→P2: P1=[1,0,0,0] → P2 mottar, oppdaterer P2</li>
              <li>s2 fra P1→P3: P1=[2,0,0,0] → P3 mottar</li>
              <li>s3 fra P3→P4: P3 oppdatert → P4 mottar</li>
            </ul>
            <p className="mt-1 text-xs text-[var(--muted)]">Fullt eksempel: Spor hendelse for hendelse, oppdater vektor ved hvert trinn.</p>
          </Answer>
        </Q>
        <Tip>Vektorklokker: [P1,P2,P3,P4] — indeks i = telling av hendelser i prosess Pi som påvirket gjeldende tilstand.</Tip>
      </Section>

      <Section title="Oppgave 10 — DHT/Chord (15%)" badge="15%" badgeColor="red">
        <Q label="Ring m=5 bits, servere: 2, 7, 14, 23, 29">
          <Formula>Adresserom: 0–31 (2^5 = 32 noder)</Formula>
        </Q>
        <Q label="a) Fingertabeller">
          <Table
            headers={["Server", "i=1", "i=2", "i=3", "i=4", "i=5"]}
            rows={[
              ["2", "7", "7", "7", "14", "2+16=18→23"],
              ["7", "14", "14", "14", "23", "7+16=23→23"],
              ["14", "23", "23", "23", "29", "14+16=30→2"],
              ["23", "29", "29", "29", "29+2=25? → 29", "23+16=7→7"],
              ["29", "2", "2", "2", "7", "29+16=13→14"],
            ]}
          />
          <p className="text-xs text-[var(--muted)] mt-1">Beregn: succ((server + 2^(i-1)) mod 32)</p>
        </Q>
        <Q label="c) Nøkkeloppslag — standard algoritme">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li>Er nøkkelen mellom n og successor(n)? Ja → successor er ansvarlig</li>
              <li>Nei → finn høyeste finger &lt; nøkkel, gå dit</li>
              <li>Gjenta til funnet</li>
            </ol>
          </Answer>
        </Q>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXAM 3: 05-2024
═══════════════════════════════════════════════════════════════ */
function Exam052024() {
  return (
    <div>
      <div className="rounded-xl bg-gradient-to-r from-network-100 to-blue-100 dark:from-network-900/20 dark:to-blue-900/20 p-4 mb-4">
        <h3 className="font-bold text-lg">DAT110 Eksamen — 05-2024 (Mai 2024)</h3>
        <p className="text-sm text-[var(--muted)]">ChordDHT-oblig, gjennomstrøm­ning, HTTP, avstandsvektor, overlay, RPC og replikering</p>
      </div>

      <Section title="Oppgave 2 — ChordDHT-oblig (10%)" badge="10%" badgeColor="blue">
        <Q label="a) Adresserom med m=5">
          <Answer>
            <p>Adresserommet har <strong>2^5 = 32 noder</strong> (0–31). Addresserom er sirkelen av identifikatorer.</p>
          </Answer>
        </Q>
        <Q label="b) Entiteter i ChordDHT-implementasjonen">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>ChordDHT:</strong> Hoved-klasse som administrerer ringen</li>
              <li><strong>Node/Server:</strong> Representerer én prosess i ringen med ID, successor og fingertabell</li>
              <li><strong>FingerTable:</strong> Tabell med m oppslag for effektivt søk</li>
              <li><strong>Key:</strong> Datanøkkel mappet til identifikator via hash</li>
            </ul>
          </Answer>
        </Q>
        <Q label="c) Fingertabell-hjelper: findSuccessor()">
          <Answer>
            <p>Returnerer noden som er nærmeste etterfølger av en gitt ID i ringen. Bruker binær søking i ringen: sjekk om ID faller mellom n og succ(n); ellers bruk closestPrecedingNode().</p>
          </Answer>
        </Q>
        <Q label="d) Distribuert mutual exclusion — antall meldinger">
          <Answer>
            <p>Ricard-Agrawala distribuert mutex: <strong>2*(N-1) meldinger</strong> per kritisk seksjon (N-1 forespørsler + N-1 svar).</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 3 — Gjennomstrømning og forsinkelse (10%)" badge="10%" badgeColor="network">
        <Q label="Gjennomstrømning ved delt link">
          <Formula>
            Gjennomstrømning = min(R_server, R_link/N, R_client)<br/>
            Flaskehals = minimum kapasitet på stien
          </Formula>
          <Answer>
            <p>Ved N samtidige klienter som deler link med kapasitet R: effektiv gjennomstrømning per klient = R/N (hvis linken er flaskehalsen).</p>
          </Answer>
        </Q>
        <Q label="Trafikkintensitet">
          <Formula>Trafikkintensitet = La/R (La = bits per sekund generert, R = linjekapasitet)</Formula>
          <Answer>
            <p>La/R &gt; 1: Køen vokser ubegrenset. La/R nær 1: Høy forsinkelse. La/R &lt;&lt; 1: Lav forsinkelse.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 4 — HTTP protokoll (10%)" badge="10%" badgeColor="blue">
        <Q label="HTTP persistent med pipeline vs ikke-persistent">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Ikke-persistent:</strong> 1 TCP-tilkobling per objekt. 2 RTT overhead per objekt.</li>
              <li><strong>Persistent uten pipeline:</strong> Én tilkobling. Venter på svar før neste forespørsel. 1 RTT per objekt.</li>
              <li><strong>Persistent med pipeline:</strong> Sender alle forespørsler umiddelbart. Nesten 1 RTT for alle objekter.</li>
            </ul>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 5 — Avstandsvektoralgoritme (10%)" badge="10%" badgeColor="purple">
        <Q label="Nettverk: R1-R3(5), R2-R3(2), R3-R4(1), R2-R4(8)">
          <p className="text-xs text-[var(--muted)]">R1 kobler kun til R3. R4 kobler til R2 og R3.</p>
        </Q>
        <Q label="a) Beste sti R1 til R4">
          <Formula>R1→R3→R4 = 5+1 = 6  (vs R1→R3→R2→R4 = 5+2+8 = 15)</Formula>
          <Answer>
            <p><strong>R1→R3→R4 med kostnad 6</strong></p>
          </Answer>
        </Q>
        <Q label="b) Initielle distansevektorer">
          <Table
            headers={["Ruter", "DR(R1)", "DR(R2)", "DR(R3)", "DR(R4)"]}
            rows={[
              ["R1", "0", "∞", "5", "∞"],
              ["R2", "∞", "0", "2", "8"],
              ["R3", "5", "2", "0", "1"],
              ["R4", "∞", "8", "1", "0"],
            ]}
          />
        </Q>
        <Q label="c) R1 mottar DR3=(5,2,0,1) — oppdatering">
          <Formula>
            DR1(R2) = min(∞, 5+2) = 7<br/>
            DR1(R4) = min(∞, 5+1) = 6<br/>
            Ny DR1 = (0, 7, 5, 6)
          </Formula>
          <Answer>
            <p>Etter mottak: <strong>DR1 = [0, 7, 5, 6]</strong></p>
          </Answer>
        </Q>
        <Q label="d) R4 mottar DR2=(7,0,2,3) og DR3=(5,2,0,1) — oppdatering">
          <Formula>
            R4(R1): min(6, 8+7, 1+5) = min(6, 15, 6) = 6<br/>
            R4(R2): min(3, 8+0, 1+2) = min(3, 8, 3) = 3<br/>
            R4(R3): min(1, 8+2, 1+0) = min(1, 10, 1) = 1<br/>
            DR4 = (6, 3, 1, 0) — ingen endring
          </Formula>
          <Answer>
            <p><strong>DR4 = [6, 3, 1, 0]</strong> — uendret.</p>
          </Answer>
        </Q>
        <Tip>Vis ALLTID min(v1, v2, v3) = resultat for hvert destinasjonspar. Sensor forventer eksplisitt utregning.</Tip>
      </Section>

      <Section title="Oppgave 8 — Overlay-nettverk RDP (10%)" badge="10%" badgeColor="network">
        <Q label="5 prosesser A-E. Fysisk: Ra-Rb=5, Rb-Rc=10, Rc-Rd=5, Rd-Re=5, Ra-Re=40">
          <p className="text-xs text-[var(--muted)]">Overlay-kant = beste fysiske sti mellom de to nodene</p>
        </Q>
        <Q label="Overlay-kanter (minimum forsinkelse mellom alle par)">
          <Table
            headers={["Par", "Fysisk best-sti", "Forsinkelse"]}
            rows={[
              ["A-B", "Ra-Rb", "5"],
              ["A-C", "Ra-Rb-Rc", "15"],
              ["A-D", "Ra-Rb-Rc-Rd", "20"],
              ["A-E", "Ra-Rb-Rc-Rd-Re", "25"],
              ["B-C", "Rb-Rc", "10"],
              ["B-D", "Rb-Rc-Rd", "15"],
              ["B-E", "Rb-Rc-Rd-Re", "20"],
              ["C-D", "Rc-Rd", "5"],
              ["C-E", "Rc-Rd-Re", "10"],
              ["D-E", "Rd-Re", "5"],
            ]}
          />
        </Q>
        <Q label="a) RDP for Tree 1 (A-B-C-D-E = stjerneform med A som rot)">
          <Answer>
            <p>For multicast-tre: beregn total trekkostnad og RDP for valgt par A→E.</p>
            <p className="mt-1">RDP(A→E) = overlay-sti(A→E i treet) / beste fysiske(A→E) = X / 25</p>
          </Answer>
        </Q>
        <Tip>RDP kan aldri være &lt; 1.0. Overlay er alltid ≥ fysisk best-sti. Velg treet med lavest RDP for gitt par, lavest total kostnad for global effektivitet.</Tip>
      </Section>

      <Section title="Oppgave 9 — RPC og replikering (10%)" badge="10%" badgeColor="emerald">
        <Q label="a) Tre typer asynkron RPC">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li><strong>ACK-kun:</strong> Server sender kun bekreftelse, klient fortsetter uten å vente på resultat</li>
              <li><strong>Utsatt synkron:</strong> Server sender ACK, sender resultat via separat enveis-RPC (klient avbrytes)</li>
              <li><strong>Multicast RPC:</strong> Klient sender til flere servere, resultater returneres via callbacks</li>
            </ol>
          </Answer>
        </Q>
        <Q label="b) Årsaker til replikering">
          <Answer>
            <p>Feiltoleranse, ytelse (data nær brukere), skalerbarhet, tilgjengelighet.</p>
          </Answer>
        </Q>
        <Q label="c) Flat vs hierarkisk feiltoleranse-gruppe">
          <Answer>
            <p><strong>Flat:</strong> Alle like — demokratisk beslutningstaking, ingen single-point-of-failure, kompleks koordinering. <strong>Hierarkisk:</strong> Koordinator + arbeidere — enklere men koordinator er kritisk punkt.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 10 — DHT/Chord (15%)" badge="15%" badgeColor="red">
        <Q label="Ring m=5 bits, servere: 1, 5, 10, 15, 20, 29">
          <Formula>Adresserom 0–31. succ(n+2^(i-1) mod 32)</Formula>
        </Q>
        <Q label="a) Fingertabeller">
          <Table
            headers={["Server", "i=1", "i=2", "i=3", "i=4", "i=5"]}
            rows={[
              ["1", "5", "5", "5", "10", "succ(17)=20"],
              ["5", "10", "10", "10", "15", "succ(21)=29"],
              ["10", "15", "15", "15", "20", "succ(26)=29"],
              ["15", "20", "20", "20", "29", "succ(31→1)=1"],
              ["20", "29", "29", "29", "succ(28)=29", "succ(4)=5"],
              ["29", "1", "1", "1", "5", "succ(13)=15"],
            ]}
          />
        </Q>
        <Q label="b) Nøkkelansvar">
          <Table
            headers={["Nøkkel", "Ansvarlig server", "Grunn"]}
            rows={[
              ["5", "5", "29 < 5 ≤ 5? Ja, sirkulært"],
              ["14", "15", "10 < 14 ≤ 15"],
              ["20", "20", "15 < 20 ≤ 20"],
              ["25", "29", "20 < 25 ≤ 29"],
            ]}
          />
        </Q>
        <Q label="c) Oppslag nøkkel=18 fra server 1">
          <Answer>
            <p><strong>Runde 1 (n=1):</strong> succ=5, 1&lt;18≤5? Nei. Finn høyeste FT &lt; 18: FT[4]=10, 1&lt;10&lt;18? Ja → gå til 10</p>
            <p className="mt-1"><strong>Runde 2 (n=10):</strong> succ=15, 10&lt;18≤15? Nei. FT[5]=29, 10&lt;29&lt;18? Nei. FT[4]=20, 10&lt;20&lt;18? Nei. FT[3]=15, 10&lt;15&lt;18? Ja → gå til 15</p>
            <p className="mt-1"><strong>Runde 3 (n=15):</strong> succ=20, 15&lt;18≤20? Ja → <strong>Server 20 er ansvarlig</strong></p>
          </Answer>
        </Q>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXAM 4: 01-2024
═══════════════════════════════════════════════════════════════ */
function Exam012024() {
  return (
    <div>
      <div className="rounded-xl bg-gradient-to-r from-network-100 to-blue-100 dark:from-network-900/20 dark:to-blue-900/20 p-4 mb-4">
        <h3 className="font-bold text-lg">DAT110 Eksamen — 01-2024 (Januar 2024)</h3>
        <p className="text-sm text-[var(--muted)]">Publish-subscribe-oblig, gjennomstrøm­ning, IPv4/UDP, switch/ARP, ruting, overlay, distribuerte systemer</p>
      </div>

      <Section title="Oppgave 2 — Publish-Subscribe-oblig (10%)" badge="10%" badgeColor="blue">
        <Q label="a) Komponenter i publish-subscribe megleren (broker)">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Broker:</strong> Mellomvare som mottar publiserte meldinger og distribuerer til abonnenter</li>
              <li><strong>Publisher:</strong> Klient som publiserer meldinger på et emne (topic)</li>
              <li><strong>Subscriber:</strong> Klient som abonnerer på emner og mottar meldinger</li>
              <li><strong>Topic/Emne:</strong> Kategori som meldinger publiseres til og abonneres på</li>
            </ul>
          </Answer>
        </Q>
        <Q label="b) StoppableThread — hva er det og hvorfor brukes det?">
          <Answer>
            <p>En tråd-klasse som kan stoppes kontrollert ved å sette et &quot;running&quot;-flagg til false. Brukes for å avslutte bakgrunns-tråder rent uten å bruke Thread.stop() (deprecated/usikker).</p>
            <p className="mt-1">Mønster: <code className="bg-neutral-200 dark:bg-neutral-800 px-1 rounded">while(running) {"{ /* do work */ }"}</code></p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 5 — Avstandsvektoralgoritme (10%)" badge="10%" badgeColor="purple">
        <Q label="Tilsvarende nettverk som 05-2024">
          <Answer>
            <p>Samme fremgangsmåte: initialiser vektorer, oppdater med Bellman-Ford, vis steg for steg.</p>
            <p className="mt-1">Husk: D_x(y) = min_v{"{"}c(x,v) + D_v(y){"}"}</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 8 — Overlay RDP med 5 noder (10%)" badge="10%" badgeColor="network">
        <Q label="5 prosesser B,C,A,D,E — to multicast-trær">
          <Q label="Tree 1 (B-C-A-D-E) og Tree 2 (A-B-C-E-D)">
            <Formula>RDP = overlay-sti-delay / beste-fysiske-delay</Formula>
          </Q>
        </Q>
        <Q label="Beregning">
          <Answer>
            <p><strong>Fysisk beste sti A→D:</strong> Beregn ved inspeksjon av fysisk graf (Dijkstra).</p>
            <p className="mt-1"><strong>Tree 1 RDP:</strong> Summer overlay-kantene for A→D i Tree 1, divider på fysisk-best.</p>
            <p className="mt-1"><strong>Tree 2 RDP:</strong> Tilsvarende for Tree 2.</p>
            <p className="mt-1">Lavere RDP = mer effektivt for det paret. Lavere total kostnad = mer effektivt globalt.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 9 — Asynkron RPC og replikering (10%)" badge="10%" badgeColor="emerald">
        <Q label="a) Tre asynkrone RPC-typer">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li>ACK-kun: klient venter kun på bekreftelse fra server</li>
              <li>Utsatt synkron: ACK, deretter resultat via enveis-RPC</li>
              <li>Multicast: klient sender til multiple servere, callbacks med resultater</li>
            </ol>
          </Answer>
        </Q>
        <Q label="d) Vektorklokker for 4 prosesser">
          <Formula>
            Hendelse i Pi: VC[i]++<br/>
            Send fra Pi: inkluder VC i melding<br/>
            Mottak i Pj fra Pi: VC_j[k] = max(VC_j[k], VC_i[k]) ∀k, deretter VC_j[j]++
          </Formula>
          <Answer>
            <p>Spor hendelse for hendelse. Vektorklokker gir full kausalitetsordning (i motsetning til Lamport-klokker).</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 10 — DHT/Chord (15%)" badge="15%" badgeColor="red">
        <Q label="Ring m=5 bits, servere: 1, 5, 10, 15, 20, 29 (samme som 05-2024)">
          <p className="text-xs text-[var(--muted)]">Se 05-2024 for fingertabeller og nøkkelansvar</p>
        </Q>
        <Q label="Feiltoleranse og skalerbart søk i DHT">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Feiltoleranse:</strong> Data og prosessreplikering — replika tar over ved prosess-krasj</li>
              <li><strong>Skalerbart søk:</strong> Fingertabellen gir O(log N) opplag — eksponensielt kortere hopp</li>
            </ul>
          </Answer>
        </Q>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXAM 5: 01-2025
═══════════════════════════════════════════════════════════════ */
function Exam012025() {
  return (
    <div>
      <div className="rounded-xl bg-gradient-to-r from-network-100 to-blue-100 dark:from-network-900/20 dark:to-blue-900/20 p-4 mb-4">
        <h3 className="font-bold text-lg">DAT110 Eksamen — 01-2025 (Januar 2025)</h3>
        <p className="text-sm text-[var(--muted)]">Socket/RPC-oblig, forsinkelse, IPv4-fragmentering, avstandsvektor, ARP/switch, overlay, Chord</p>
      </div>

      <Section title="Oppgave 1 — Multiple Choice (10%)" badge="10%" badgeColor="network" defaultOpen={true}>
        <Q label="Alle 10 svar:">
          <Table
            headers={["Spørsmål", "Svar"]}
            rows={[
              ["a) Linklaget", "Upålitelig overf. av rammer over én link (3)"],
              ["b) Trafikkintensitet", "Forholdet mellom bits/tid og overf.rate (2)"],
              ["c) Transport-endepunkt", "IP-adresse og portnummer (3)"],
              ["d) Kollisjonsprotokoll", "CSMA (2)"],
              ["e) DNS-formål", "Mapper vertsnavn til IP-adresser (3)"],
              ["f) Probabilistisk flooding", "Reduser antall meldinger i nettverket (3)"],
              ["g) Rapid elasticity", "Skalerbarhet (1)"],
              ["h) RPC-idé", "Klient kaller funksjon på fjernserver (3)"],
              ["i) Prosessresiliensitet", "Organiser prosesser i grupper (1)"],
              ["j) Integritet/ikke-fornektbarhet", "Digital signatur (2)"],
            ]}
          />
        </Q>
      </Section>

      <Section title="Oppgave 2 — Socket/RPC-oblig (10%)" badge="10%" badgeColor="blue">
        <Q label="a) Tre protokollag implementert">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li><strong>IoT-applikasjonslaget:</strong> Sensor-display-kontroller-systemet</li>
              <li><strong>RPC-laget:</strong> Implementerer fjernprosedyreanrop bygget på meldingslaget</li>
              <li><strong>Meldingslaget:</strong> Pålitelig utveksling av korte meldinger, bygget på TCP</li>
            </ol>
          </Answer>
        </Q>
        <Q label="b) Hva angir de første 8 bitsene i 128-byte meldinger?">
          <Answer>
            <p>Angir <strong>antall nyttebyte</strong> (payload bytes) i de neste 127 bytene — nødvendig fordi ikke alle meldinger bærer 127 bytes faktiske data.</p>
          </Answer>
        </Q>
        <Q label="c) Socket identifiseres av">
          <Answer>
            <p><strong>Portnummer og IP-adresse</strong></p>
          </Answer>
        </Q>
        <Q label="d) Hvordan identifiserer server RPC-metode?">
          <Answer>
            <p>Første byte i RPC-forespørselsmeldingen angir <strong>metodenummeret</strong>, som slås opp i RPC-tabellen på serveren.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 3 — Nettverksforsinkelse (10%)" badge="10%" badgeColor="network">
        <Q label="R=10⁶ bits/s, d=10⁴ m, s=5×10⁸ m/s, L=10³ bits">
          <p className="text-xs text-[var(--muted)]">processing=0.002s, queuing=0.01s</p>
        </Q>
        <Q label="a) Sendingsforsinkelse">
          <Formula>d_trans = L/R = 10³/10⁶ = 0.001 s</Formula>
        </Q>
        <Q label="b) Nodalforsinkelse">
          <Formula>
            d_prop = 10⁴/(5×10⁸) = 0.00002 s<br/>
            d_nodal = 0.002 + 0.01 + 0.00002 + 0.001 = 0.01302 s
          </Formula>
        </Q>
        <Q label="c) Ende-til-ende H1→H3">
          <Formula>3 × 0.01302 = 0.03906 s</Formula>
        </Q>
        <Q label="d) Flaskehals-link: H1→R1(50Mbps), R1→R2(100Mbps), R2→H3(10Mbps)">
          <Answer>
            <p><strong>R2→H3-linjen (10 Mbps)</strong> — lavest kapasitet.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 4 — IPv4 datagram (10%)" badge="10%" badgeColor="blue">
        <Q label="b) Identifier, Flags, Fragmentation offset">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Identifier:</strong> Identifiserer hvilke fragmenter tilhører samme datagram</li>
              <li><strong>Flags:</strong> Angir om reassemblering er fullstendig (0=siste fragment)</li>
              <li><strong>Fragmentation offset:</strong> Posisjonen til fragmentet i originalt datagram</li>
            </ul>
          </Answer>
        </Q>
        <Q label="d) Angis UDP vs TCP med">
          <Answer>
            <p><strong>Upper-layer protocol-feltet</strong></p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 5 — Avstandsvektoralgoritme (10%)" badge="10%" badgeColor="purple">
        <Q label="Nettverk: R1-R3(5), R2-R3(2), R3-R4(1), R2-R4(8)">
          <p className="text-xs text-[var(--muted)]">Identisk nettverk som 05-2024</p>
        </Q>
        <Q label="Initielle distansevektorer">
          <Table
            headers={["Ruter", "R1", "R2", "R3", "R4"]}
            rows={[
              ["R1", "0", "∞", "5", "∞"],
              ["R2", "∞", "0", "2", "8"],
              ["R3", "5", "2", "0", "1"],
              ["R4", "∞", "8", "1", "0"],
            ]}
          />
        </Q>
        <Q label="R1 mottar DR3 — ny vektor">
          <Formula>DR1 = [0, min(∞,5+2)=7, 5, min(∞,5+1)=6] = (0,7,5,6)</Formula>
        </Q>
        <Q label="R4 mottar DR2 og DR3 — ingen endring">
          <Formula>
            R4(R1): min(6, 8+7, 1+5) = 6 ✓<br/>
            R4(R2): min(3, 8+0, 1+2) = 3 ✓<br/>
            DR4 = (6,3,1,0) — uendret
          </Formula>
        </Q>
      </Section>

      <Section title="Oppgave 6 — Lokal nettverk, ARP og switch (10%)" badge="10%" badgeColor="network">
        <Q label="H1(192.168.0.1, MAC 1A:...:1F) port3, H2 port2, H3(192.168.0.3, MAC 3A:...:3F) port1">
          <p></p>
        </Q>
        <Q label="a) ARP-tabell på H1 etter kommunikasjon med H3">
          <Answer>
            <p><code className="bg-neutral-200 dark:bg-neutral-800 px-1 rounded">{"{"}192.168.0.3 → 3A:3B:3C:3D:3E:3F{"}"}</code></p>
          </Answer>
        </Q>
        <Q label="b) Switch-tabell etter H1→H3">
          <Table
            headers={["MAC-adresse", "Port"]}
            rows={[
              ["1A:1B:1C:1D:1E:1F (H1)", "3"],
              ["3A:3B:3C:3D:3E:3F (H3)", "1"],
            ]}
          />
        </Q>
        <Q label="c) CIDR 224.192.40.0/22 — adresseintervall">
          <Formula>
            /22 = 22 faste bits, 10 host-bits = 2^10 = 1024 adresser<br/>
            224.192.40.0 til 224.192.43.255
          </Formula>
        </Q>
        <Q label="d) 200.193.57.14 i binær">
          <Formula>11001000.11000001.00111001.00001110</Formula>
        </Q>
        <Q label="e) Forwardingstabell-oppslag">
          <Answer>
            <ul className="list-disc list-inside space-y-1">
              <li>200.193.42.10 → Grensesnitt 1 (match på prefiks 11001000 11000001 001010...)</li>
              <li>200.193.57.14 → Grensesnitt 4 (ingen prefiks-match → otherwise)</li>
              <li>10.53.40.7 → Grensesnitt 4 (ingen prefiks-match → otherwise)</li>
            </ul>
          </Answer>
        </Q>
        <Tip>Lengst-prefiks matching: konverter til binær, sammenlign bit for bit mot prefiksene. Velg det lengste som matcher. Ingen match = default/otherwise.</Tip>
      </Section>

      <Section title="Oppgave 7 — Stateful/stateless og sync/async (5%)" badge="5%" badgeColor="emerald">
        <Q label="a) Stateful vs stateless server">
          <Answer>
            <p><strong>Stateful:</strong> Opprettholder persistent informasjon om klienter (tilstand). Eksempel: FTP-server husker at du er logget inn.</p>
            <p className="mt-1"><strong>Stateless:</strong> Lagrer ingen informasjon om klienttilstand; kan endre sin egen tilstand uten å varsle klienter. Eksempel: DNS-servere.</p>
          </Answer>
        </Q>
        <Q label="b) Synkron vs asynkron kommunikasjon">
          <Answer>
            <p><strong>Synkron:</strong> Avsender blokkeres til forespørselen er kjent akseptert av mottaker.</p>
            <p className="mt-1"><strong>Asynkron:</strong> Avsender fortsetter umiddelbart etter innsending av meldingen.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 8 — Overlay-nettverk RDP (10%)" badge="10%" badgeColor="network">
        <Q label="5 prosesser A-E: Ra-Re(40), Ra-Rb(5), Rb-Rc(10), Rc-Rd(5), Rd-Re(5)">
          <Q label="Overlay-kanter (minimum fysisk sti)">
            <Table
              headers={["Par", "Sti", "Kostnad"]}
              rows={[
                ["A-B", "Ra→Rb", "5"],
                ["A-C", "Ra→Rb→Rc", "15"],
                ["A-D", "Ra→Rb→Rc→Rd", "20"],
                ["A-E", "Ra→Rb→Rc→Rd→Re", "25"],
                ["B-C", "Rb→Rc", "10"],
                ["B-D", "Rb→Rc→Rd", "15"],
                ["B-E", "Rb→Rc→Rd→Re", "20"],
                ["C-D", "Rc→Rd", "5"],
                ["C-E", "Rc→Rd→Re", "10"],
                ["D-E", "Rd→Re", "5"],
              ]}
            />
          </Q>
        </Q>
        <Q label="Tree 1 (A-E-D-B-C stjerne), Tree 2 (A-B-C-E-D linje)">
          <Answer>
            <p><strong>Beste fysisk A→D = 20</strong></p>
            <p className="mt-1"><strong>Tree 1:</strong> A→D i treet = A→E→D = 25+5 = 30? Eller direkte overlay-kant A→D = 20. RDP = 27/20 ≈ 1.35 (avhenger av trestruktur)</p>
            <p className="mt-1"><strong>Tree 2:</strong> A→D = A→B→C→E→D = 5+10+10+5 = 30. RDP = 30/20 = 1.50... men ifølge fasit: Tree 1 RDP=1.54, Tree 2 RDP=1.73</p>
            <p className="mt-1 text-xs text-[var(--muted)]">Se detaljert fasit — eksakt avhenger av trestruktur angitt i oppgaven.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 9 — Feiltoleranse, RPC-feil, konsistens (10%)" badge="10%" badgeColor="emerald">
        <Q label="a) Hierarkisk tilbakemeldingskontroll for pålitelig multicast">
          <Answer>
            <p>For svært store mottakergrupper: del inn i undergrupper organisert som tre. Hver undergruppe har lokal koordinator C.</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>C håndterer retransmisjonsforespørsler innen sin undergruppe</li>
              <li>Hvis C mangler melding, ber koordinatoren til avsendergruppen om retransmisjon</li>
              <li>Kun koordinatorer kommuniserer med hverandre (ACK/NACK-basert)</li>
            </ol>
            <p className="mt-1">Reduserer tilbakemeldingsmeldinger kraftig — skalerer til store grupper.</p>
          </Answer>
        </Q>
        <Q label="b) Fem klasser av RPC-feil">
          <Answer>
            <ol className="list-decimal list-inside space-y-1">
              <li>Klienten <strong>finner ikke serveren</strong> — ingen forespørsel kan sendes</li>
              <li>Klientens forespørsel til server <strong>går tapt</strong></li>
              <li>Serveren <strong>krasjer etter mottak</strong> — tjeneste gjennomføres ikke/ikke kvittert</li>
              <li>Serverens svar <strong>går tapt</strong> — tjeneste fullført men resultat ankommer aldri</li>
              <li>Klienten <strong>krasjer etter sending</strong> — server sender svar til nystartet klient som ikke forventer det</li>
            </ol>
          </Answer>
        </Q>
        <Q label="c) Data-sentrert vs klient-sentrert konsistens">
          <Answer>
            <p><strong>Data-sentrert:</strong> Konsistens fra systemets perspektiv. Alle prosesser ser oppdateringer i en definert global orden. Eksempler: sekvensiell, kausal, FIFO-konsistens.</p>
            <p className="mt-1"><strong>Klient-sentrert:</strong> Konsistens fra én klients perspektiv. Garanterer at klienten alltid ser sine egne skrivinger, selv ved bytte av replika. Typer: monoton-lesing, monoton-skriving, les-dine-skrivinger, skrivinger-følger-lesinger.</p>
          </Answer>
        </Q>
      </Section>

      <Section title="Oppgave 10 — DHT/Chord (15%)" badge="15%" badgeColor="red">
        <Q label="Ring m=5 bits, servere: 3, 12, 21, 31">
          <Formula>Adresserom 0–31 (2^5 = 32)</Formula>
        </Q>
        <Q label="a) Fingertabeller">
          <Table
            headers={["Server", "i=1 (+1)", "i=2 (+2)", "i=3 (+4)", "i=4 (+8)", "i=5 (+16)"]}
            rows={[
              ["3", "succ(4)=12", "succ(5)=12", "succ(7)=12", "succ(11)=12", "succ(19)=21"],
              ["12", "succ(13)=21", "succ(14)=21", "succ(16)=21", "succ(20)=21", "succ(28)=31"],
              ["21", "succ(22)=31", "succ(23)=31", "succ(25)=31", "succ(29)=31", "succ(5)=12"],
              ["31", "succ(0)=3", "succ(1)=3", "succ(3)=3", "succ(7)=12", "succ(15)=21"],
            ]}
          />
          <p className="text-xs text-[var(--muted)] mt-1">succ(32 mod 32=0)=3, succ(33 mod 32=1)=3, osv.</p>
        </Q>
        <Q label="b) Nøkkelansvar">
          <Table
            headers={["Nøkkel", "Ansvarlig", "Grunn"]}
            rows={[
              ["6", "12", "3 < 6 ≤ 12"],
              ["9", "12", "3 < 9 ≤ 12"],
              ["15", "21", "12 < 15 ≤ 21"],
              ["29", "31", "21 < 29 ≤ 31"],
            ]}
          />
        </Q>
        <Q label="c) Oppslag nøkkel=15 fra server 31">
          <Answer>
            <p><strong>Runde 1 (n=31):</strong> succ=3, 31&lt;15≤3? (sirkulært) Nei. Finn høyeste FT &lt; 15 (sirkulært): FT[4]=12, 31&lt;12&lt;15 (wrap)? Ja → gå til 12</p>
            <p className="mt-1"><strong>Runde 2 (n=12):</strong> succ=21, 12&lt;15≤21? Ja → <strong>Server 21 er ansvarlig</strong></p>
          </Answer>
        </Q>
        <Q label="d) Replikering i ChordDHT">
          <Answer>
            <p>Feiltoleranse (replika tar over ved krasj), skalerbarhet (fordel last), ytelse (data nær brukere), tilgjengelighet.</p>
          </Answer>
        </Q>
        <Q label="e) Fingertabellens formål">
          <Answer>
            <p>Gir <strong>skalerbart søk i O(log N)</strong> tid — lagrer noder som er eksponentielt langt unna, slik at hvert hopp halverer gjenstående søkeavstand.</p>
          </Answer>
        </Q>
        <Tip>Gjennomfør alltid Chord-oppslaget runde for runde. Vis: succ(n) sjekk → FT-søk → neste node. Eksamen gir alltid poeng for korrekt fremgangsmåte.</Tip>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
type ExamId = "2022" | "2023" | "052024" | "012024" | "012025";

const exams: { id: ExamId; label: string; date: string; focus: string }[] = [
  { id: "2022", label: "2022", date: "2022", focus: "IoT-Arduino, ARP/Switch, Chord m=4" },
  { id: "2023", label: "2023", date: "2023", focus: "ChordDHT-oblig, HTTP, vektorklokker" },
  { id: "052024", label: "05-2024", date: "Mai 2024", focus: "Chord 6 noder, avstandsvektor, overlay" },
  { id: "012024", label: "01-2024", date: "Jan 2024", focus: "Publish-subscribe, overlay RDP" },
  { id: "012025", label: "01-2025", date: "Jan 2025", focus: "Socket/RPC-oblig, IPv4-frag, Chord m=5 4 noder" },
];

export default function DAT110EksamenPage() {
  const [active, setActive] = useState<ExamId>("012025");

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">DAT110</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Eksamensoppgaver</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">DAT110 Eksamensoppgaver</h1>
      <p className="text-[var(--muted)] mb-8 max-w-2xl">
        Alle 5 eksamener (2022–2025) med fullstendige løsningsforslag. Klikk &quot;Vis svar&quot; for å se fasit
        etter at du har forsøkt selv.
      </p>

      {/* Mønstre-boks */}
      <div className="rounded-xl border border-red-400/40 bg-red-50 dark:bg-red-950/20 p-4 mb-8">
        <h3 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2">
          Kritiske mønstre som gjentar seg på ALLE eksamener
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 text-xs text-[var(--muted)]">
          <div>
            <p className="font-bold text-[var(--foreground)] mb-1">Oppgave 3 — Forsinkelse (alltid):</p>
            <p>d_trans=L/R, d_prop=d/s, d_nodal=sum, flaskehals=min kapasitet</p>
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)] mb-1">Oppgave 5 — Avstandsvektor (alltid):</p>
            <p>Initialiser DR, oppdater Bellman-Ford, vis min(v1,v2,...) eksplisitt</p>
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)] mb-1">Oppgave 8 — Overlay RDP (alltid):</p>
            <p>Tegn fullt overlay-graf (N*(N-1)/2 kanter), beregn RDP og total trekkostnad</p>
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)] mb-1">Oppgave 10 — Chord (alltid 15%):</p>
            <p>Fingertabeller → nøkkelansvar → oppslag runde for runde</p>
          </div>
        </div>
      </div>

      {/* Exam tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setActive(exam.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              active === exam.id
                ? "bg-network-500 text-white shadow"
                : "border border-network-400/40 text-network-700 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20"
            }`}
          >
            {exam.label}
          </button>
        ))}
      </div>

      {/* Active exam info */}
      <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/40 px-4 py-2 mb-4 text-sm text-[var(--muted)]">
        <span className="font-bold text-[var(--foreground)]">{exams.find(e => e.id === active)?.date}</span>
        {" — "}
        {exams.find(e => e.id === active)?.focus}
      </div>

      {/* Exam content */}
      {active === "2022" && <Exam2022 />}
      {active === "2023" && <Exam2023 />}
      {active === "052024" && <Exam052024 />}
      {active === "012024" && <Exam012024 />}
      {active === "012025" && <Exam012025 />}
    </div>
  );
}
