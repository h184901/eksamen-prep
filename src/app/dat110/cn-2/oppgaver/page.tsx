"use client";

import { useState } from "react";

function Section({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-1 text-network-700 dark:text-network-300">{title}</h2>
      {subtitle && <p className="text-sm text-[var(--muted)] mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </section>
  );
}

function Collapsible({ title, children, color = "default" }: {
  title: string; children: React.ReactNode; color?: "default" | "solution" | "hint";
}) {
  const [open, setOpen] = useState(false);
  const colorMap = {
    default: "border-[var(--card-border)] bg-[var(--card)]",
    solution: "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20",
    hint: "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20",
  };
  return (
    <div className={`rounded-xl border my-2 overflow-hidden ${colorMap[color]}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:opacity-80 transition-opacity"
      >
        <span className={`font-semibold text-sm ${color === "solution" ? "text-green-700 dark:text-green-300" : color === "hint" ? "text-amber-700 dark:text-amber-300" : ""}`}>
          {title}
        </span>
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-4 space-y-2 text-sm">{children}</div>}
    </div>
  );
}

function ExerciseCard({ number, title, difficulty, children }: {
  number: number;
  title: string;
  difficulty: "lett" | "middels" | "vanskelig";
  children: React.ReactNode;
}) {
  const diffColor = {
    lett: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    middels: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    vanskelig: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-network-600 dark:text-network-400">Oppgave {number}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffColor[difficulty]}`}>{difficulty}</span>
        </div>
      </div>
      <h3 className="font-bold mb-3">{title}</h3>
      {children}
    </div>
  );
}

/* ── Interactive HTTP calculator for exercises ── */
function HTTPTimingExercise() {
  const [rtt, setRtt] = useState(100);
  const [bandwidth, setBandwidth] = useState(1);
  const [numObjects, setNumObjects] = useState(5);
  const [objectSize, setObjectSize] = useState(50);
  const [htmlSize, setHtmlSize] = useState(10);

  const R = bandwidth * 1e6;
  const L_html = htmlSize * 1000 * 8;
  const L_obj = objectSize * 1000 * 8;
  const rttSec = rtt / 1000;

  const t_html_transmit = L_html / R;
  const t_obj_transmit = L_obj / R;

  // Non-persistent (sequential): (N+1) * (2RTT + L/R)
  const t_np = (numObjects + 1) * (2 * rttSec + t_obj_transmit);
  // Persistent without pipelining
  const t_p = (2 * rttSec + t_html_transmit) + numObjects * (rttSec + t_obj_transmit);
  // Persistent with pipelining
  const t_pp = (2 * rttSec + t_html_transmit) + rttSec + numObjects * t_obj_transmit;

  const fmt = (s: number) => s < 1 ? `${(s * 1000).toFixed(0)} ms` : `${s.toFixed(2)} s`;

  return (
    <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5 my-4">
      <h3 className="font-bold mb-4">Interaktiv: Sammenlign HTTP-modi</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold block mb-1">RTT: {rtt} ms</label>
          <input type="range" min={1} max={500} value={rtt} onChange={(e) => setRtt(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Båndbredde: {bandwidth} Mbps</label>
          <input type="range" min={1} max={100} value={bandwidth} onChange={(e) => setBandwidth(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Antall objekter: {numObjects}</label>
          <input type="range" min={1} max={30} value={numObjects} onChange={(e) => setNumObjects(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Objekt-størrelse: {objectSize} KB</label>
          <input type="range" min={1} max={1000} value={objectSize} onChange={(e) => setObjectSize(Number(e.target.value))} className="w-full accent-network-500" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { label: "Ikke-persistent", time: t_np, color: "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700" },
          { label: "Persistent (uten pipeline)", time: t_p, color: "bg-amber-100 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700" },
          { label: "Persistent + pipeline", time: t_pp, color: "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700" },
        ].map((item) => (
          <div key={item.label} className={`rounded-lg border p-3 ${item.color}`}>
            <p className="text-xs font-semibold mb-1">{item.label}</p>
            <p className="font-mono font-bold text-lg">{fmt(item.time)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CN2OppgaverPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Oppgaver: Applikasjonslaget</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">HTTP-tidberegning, DNS-oppslag, socket-programmering og eksamensoppgaver</p>

      {/* ── STRATEGI ── */}
      <Section title="Oppgavestrategier">
        <Collapsible title="Strategi: HTTP-tidberegning" color="hint">
          <ol className="space-y-2 list-decimal list-inside">
            <li><strong>Identifiser modus:</strong> Er det ikke-persistent eller persistent? Med/uten pipelining?</li>
            <li><strong>Finn L/R:</strong> Konverter filstørrelse til bits, konverter båndbredde til bps. L/R = overforingstid i sekunder.</li>
            <li><strong>Tell TCP-handshakes:</strong> Ikke-persistent = 1 ny handshake (1 RTT) per objekt. Persistent = kun 1 handshake totalt.</li>
            <li><strong>Legg sammen:</strong> Ikke-persistent: (N+1)·(2RTT + L/R). Persistent: 2RTT + L_html/R + N·(RTT + L_obj/R).</li>
            <li><strong>Kontrollsjekk:</strong> Er svaret rimelig? Persistent bør alltid være raskere enn ikke-persistent.</li>
          </ol>
        </Collapsible>
        <Collapsible title="Strategi: DNS-oppslag" color="hint">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Start alltid fra klientens lokale DNS-server (ISP)</li>
            <li>Spør: Er svaret allerede cachet? Hvis ja — hopp direkte.</li>
            <li>Iterativt: Lokal DNS koordinerer alle stegene (klient → lokal → root → TLD → autoritativ)</li>
            <li>Rekursivt: Hvert ledd videresender forespørselen — klienten spør kun lokal DNS</li>
            <li>Tidsberegning: Tell antall RTT-er i hele kjeden</li>
          </ol>
        </Collapsible>
        <Collapsible title="Strategi: P2P distribusjonstid" color="hint">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Beregn alle tre ledd: F/u_s, F/d_min, N·F/(u_s + Σu_i)</li>
            <li>Ta max() av alle tre — det er distribusjonstiden</li>
            <li>Sammenlign med klient-server: max(N·F/u_s, F/d_min)</li>
            <li>Diskuter self-scalability: hvorfor øker P2P-tid saktere med N?</li>
          </ol>
        </Collapsible>
      </Section>

      {/* ── GJENNOMGÅTTE EKSEMPLER ── */}
      <Section title="Gjennomgåtte eksempler">

        <ExerciseCard number={1} title="HTTP-tid: Ikke-persistent vs. persistent" difficulty="middels">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Oppgavetekst:</p>
            <p>En webside består av én HTML-fil (20 KB) og 10 innebygde bilder (hvert 50 KB).
              RTT = 50 ms. Linkkapasiteten er R = 10 Mbps. Beregn total hentetid for:</p>
            <ol className="list-alpha list-inside mt-2 space-y-1">
              <li>Ikke-persistent HTTP (sekvensielt)</li>
              <li>Persistent HTTP uten pipelining</li>
              <li>Persistent HTTP med pipelining</li>
            </ol>
          </div>
          <Collapsible title="Hint 1 — Finn L/R" color="hint">
            <p>HTML: L = 20 KB × 1000 × 8 = 160 000 bits. L/R = 160 000 / 10 000 000 = 0,016 s = 16 ms</p>
            <p>Bilde: L = 50 KB × 1000 × 8 = 400 000 bits. L/R = 400 000 / 10 000 000 = 0,04 s = 40 ms</p>
          </Collapsible>
          <Collapsible title="Hint 2 — Tell tilkoblinger" color="hint">
            <p>Ikke-persistent: 11 objekter × 1 TCP-tilkobling = 11 tilkoblinger = 11 × 2RTT handshakes</p>
            <p>Persistent: 1 TCP-tilkobling for alle 11 objekter = kun 1 handshake</p>
          </Collapsible>
          <Collapsible title="Fullstendig løsning" color="solution">
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Gitt:</p>
                <ul className="space-y-0.5">
                  <li>RTT = 50 ms = 0,05 s</li>
                  <li>R = 10 Mbps = 10⁷ bps</li>
                  <li>L_html = 20 KB × 8 000 = 160 000 bits → L_html/R = 16 ms</li>
                  <li>L_obj = 50 KB × 8 000 = 400 000 bits → L_obj/R = 40 ms</li>
                  <li>N = 10 objekter</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">a) Ikke-persistent (sekvensielt):</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  T = (N+1) × (2RTT + L/R){"\n"}
                  = 11 × (2 × 50 + 40) ms{"\n"}
                  = 11 × 140 ms = <strong>1540 ms</strong>
                </p>
                <p className="text-xs text-[var(--muted)]">Merk: vi bruker bilde-størrelsen for alle objekter inkl. HTML her (forenkling). Mer presist: 1×(2×50+16) + 10×(2×50+40) = 116 + 1400 = 1516 ms</p>
              </div>
              <div>
                <p className="font-semibold">b) Persistent uten pipelining:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  T = (2RTT + L_html/R) + N×(RTT + L_obj/R){"\n"}
                  = (100 + 16) ms + 10×(50 + 40) ms{"\n"}
                  = 116 ms + 900 ms = <strong>1016 ms</strong>
                </p>
              </div>
              <div>
                <p className="font-semibold">c) Persistent med pipelining:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  T = (2RTT + L_html/R) + RTT + N×L_obj/R{"\n"}
                  = (100 + 16) ms + 50 ms + 10×40 ms{"\n"}
                  = 116 + 50 + 400 = <strong>566 ms</strong>
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded p-2 text-xs">
                <strong>Hva lærte vi?</strong> Persistent med pipelining er nesten 3× raskere enn ikke-persistent.
                Besparelsen kommer fra å eliminere gjentatte TCP-handshakes og sende forespørsler parallelt.
              </div>
            </div>
          </Collapsible>
        </ExerciseCard>

        <ExerciseCard number={2} title="DNS iterativt oppslag — tegn flyten" difficulty="lett">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Oppgavetekst:</p>
            <p>Erlend sitter hjemme og skriver inn <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">www.hvl.no</code> i nettleseren.
              DNS-cachen er tom. Forklar steg for steg hva som skjer (iterativt oppslag), og
              angi hvem som snakker med hvem i hvert steg.</p>
          </div>
          <Collapsible title="Hint" color="hint">
            <p>Iterativt: Den lokale DNS-serveren gjør ALL jobben. Den spør root → TLD → autoritativ og samler svarene.</p>
          </Collapsible>
          <Collapsible title="Fullstendig løsning" color="solution">
            <div className="space-y-2">
              <ol className="space-y-2 list-decimal list-inside text-sm">
                <li><strong>Klient → Lokal DNS-server (ISP):</strong> &quot;Hva er IP-adressen til www.hvl.no?&quot;</li>
                <li><strong>Lokal DNS → Root-server:</strong> &quot;Hva er TLD-serveren for .no?&quot; → Svar: adresse til .no TLD-server</li>
                <li><strong>Lokal DNS → .no TLD-server:</strong> &quot;Hva er den autoritative navneserveren for hvl.no?&quot; → Svar: ns1.hvl.no</li>
                <li><strong>Lokal DNS → ns1.hvl.no (autoritativ):</strong> &quot;Hva er IP-adressen til www.hvl.no?&quot; → Svar: 158.37.70.50 (A-record)</li>
                <li><strong>Lokal DNS → Klient:</strong> Returnerer 158.37.70.50 + cacher svaret (med TTL)</li>
                <li><strong>Klient oppretter TCP-tilkobling til 158.37.70.50:80</strong> og sender HTTP GET</li>
              </ol>
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded p-2 text-xs mt-2">
                <strong>Tidsbruk:</strong> Uten caching: 3 RTT ekstra (lokal→root, lokal→TLD, lokal→autoritativ).
                Neste oppslag til hvl.no: 0 ekstra RTT (cachet i lokal DNS).
              </div>
            </div>
          </Collapsible>
        </ExerciseCard>

        <ExerciseCard number={3} title="Conditional GET — web-caching" difficulty="lett">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Oppgavetekst:</p>
            <p>En web-cache (proxy) har et cachet objekt med dato <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">Last-Modified: Mon, 10 Apr 2026</code>.
              En klient forespør objektet. Forklar hva proxy-en gjør og hva serveren svarer i de to tilfellene:</p>
            <ol className="list-alpha list-inside mt-1">
              <li>Objektet er ikke endret siden 10. april</li>
              <li>Objektet er oppdatert siden 10. april</li>
            </ol>
          </div>
          <Collapsible title="Fullstendig løsning" color="solution">
            <div className="space-y-2 text-sm">
              <p><strong>Proxy sender:</strong> <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">GET /object HTTP/1.1 | If-Modified-Since: Mon, 10 Apr 2026</code></p>
              <div>
                <p className="font-semibold">a) Ikke endret:</p>
                <p>Server svarer: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">HTTP/1.1 304 Not Modified</code></p>
                <p className="text-[var(--muted)] text-xs">Ingen body sendes — proxy bruker cachet versjon. Sparer båndbredde!</p>
              </div>
              <div>
                <p className="font-semibold">b) Endret:</p>
                <p>Server svarer: <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">HTTP/1.1 200 OK</code> + ny versjon av objektet i body</p>
                <p className="text-[var(--muted)] text-xs">Proxy oppdaterer cachen med det nye objektet.</p>
              </div>
            </div>
          </Collapsible>
        </ExerciseCard>

        <ExerciseCard number={4} title="P2P distribusjonstid" difficulty="middels">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Oppgavetekst:</p>
            <p>En server skal distribuere en fil F = 1 Gbit til N = 100 klienter.</p>
            <ul className="mt-1 space-y-0.5">
              <li>Server upload-rate: u_s = 30 Mbps</li>
              <li>Alle klienter: upload = 1 Mbps, download = 2 Mbps</li>
            </ul>
            <p className="mt-2">Beregn minimum distribusjonstid for a) klient-server og b) P2P.</p>
          </div>
          <Collapsible title="Fullstendig løsning" color="solution">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold">a) Klient-server:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  D_cs = max( N·F/u_s, F/d_min ){"\n"}
                  = max( 100 × 10⁹ / 30×10⁶, 10⁹ / 2×10⁶ ){"\n"}
                  = max( 3333 s, 500 s ){"\n"}
                  = <strong>3333 sekunder ≈ 55,6 min</strong>
                </p>
                <p className="text-xs text-[var(--muted)]">Flaskehalsen er server-upload (serveren må sende til 100 klienter)</p>
              </div>
              <div>
                <p className="font-semibold">b) P2P:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  Σu_i = 100 × 1 Mbps = 100 Mbps{"\n"}
                  D_p2p = max( F/u_s, F/d_min, N·F/(u_s + Σu_i) ){"\n"}
                  = max( 10⁹/30×10⁶, 10⁹/2×10⁶, 100×10⁹/(30+100)×10⁶ ){"\n"}
                  = max( 33,3 s, 500 s, 769 s ){"\n"}
                  = <strong>769 sekunder ≈ 12,8 min</strong>
                </p>
                <p className="text-xs text-[var(--muted)]">P2P er over 4× raskere! Flaskehalsen er nå total upload-kapasitet.</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded p-2 text-xs">
                <strong>Konklusjon:</strong> P2P-arkitektur skalerer langt bedre enn klient-server for store filfordelinger
                med mange brukere, fordi total nettverkskapasitet øker med antall peers.
              </div>
            </div>
          </Collapsible>
        </ExerciseCard>

        <ExerciseCard number={5} title="DNS RR-typer — identifiser riktig type" difficulty="lett">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Oppgavetekst:</p>
            <p>Hvilken DNS RR-type brukes for hvert av følgende tilfeller?</p>
            <ol className="list-alpha list-inside mt-1 space-y-0.5">
              <li>Mappe hvl.no → ns1.hvl.no (navneserver)</li>
              <li>Mappe www.hvl.no → 158.37.70.50 (IPv4)</li>
              <li>Mappe hvl.no → mail.hvl.no (e-post)</li>
              <li>Mappe alias hvl.no → kanonisk navn www.hvl.no</li>
            </ol>
          </div>
          <Collapsible title="Løsning" color="solution">
            <ol className="list-alpha list-inside space-y-1 text-sm">
              <li><strong>NS</strong> — (hvl.no, ns1.hvl.no, NS, TTL)</li>
              <li><strong>A</strong> — (www.hvl.no, 158.37.70.50, A, TTL)</li>
              <li><strong>MX</strong> — (hvl.no, mail.hvl.no, MX, TTL)</li>
              <li><strong>CNAME</strong> — (hvl.no, www.hvl.no, CNAME, TTL)</li>
            </ol>
          </Collapsible>
        </ExerciseCard>
      </Section>

      {/* ── INTERAKTIV ── */}
      <Section title="Interaktiv sammenligning">
        <HTTPTimingExercise />
      </Section>

      {/* ── SOCKET-PROGRAMMERING ── */}
      <Section title="Oppgaver: Socket-programmering">

        <ExerciseCard number={6} title="TCP vs UDP socket — hva er forskjellen?" difficulty="lett">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p>Forklar de viktigste forskjellene mellom TCP- og UDP-sockets i Java. Nevn hvilke
              klasser som brukes og hva programmeringsmodellen er for server og klient i begge tilfeller.</p>
          </div>
          <Collapsible title="Løsning" color="solution">
            <div className="space-y-2 text-sm">
              <p><strong>TCP:</strong> Tilkoblingsorientert. Server bruker <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">ServerSocket</code>,
                klient bruker <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">Socket</code>. Server kaller <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">accept()</code> som blokkerer til en klient kobler til.
                Kommunikasjon via <em>byte-strømmer</em>. Pålitelig, orden garantert.</p>
              <p><strong>UDP:</strong> Tilkoblingsløs. Begge bruker <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">DatagramSocket</code>.
                Data sendes som <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">DatagramPacket</code> — hver pakke inneholder mottakeradressen.
                Upålitelig, ingen ordre-garanti.</p>
              <p><strong>Nøkkelpunkt:</strong> TCP krever handshake og etablerer en <em>tilkobling</em> (logisk rør). UDP sender
                diskrete datagrammer — ingen oppkobling. UDP har lavere overhead og forsinkelse.</p>
            </div>
          </Collapsible>
        </ExerciseCard>

        <ExerciseCard number={7} title="EchoServer — hva gjør denne koden?" difficulty="middels">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Gitt følgende Java-kode:</p>
            <pre className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-xs overflow-x-auto">{`ServerSocket ss = new ServerSocket(8080);
Socket s = ss.accept();
BufferedReader in = new BufferedReader(
    new InputStreamReader(s.getInputStream()));
PrintWriter out = new PrintWriter(s.getOutputStream(), true);

String line;
while ((line = in.readLine()) != null) {
    out.println(line);  // echo back
}
s.close();`}</pre>
            <p className="mt-2">Svar:</p>
            <ol className="list-alpha list-inside mt-1">
              <li>Hva gjør denne koden?</li>
              <li>Er dette TCP eller UDP?</li>
              <li>Hva er svakheten med denne implementasjonen?</li>
            </ol>
          </div>
          <Collapsible title="Løsning" color="solution">
            <div className="space-y-2 text-sm">
              <p><strong>a)</strong> En enkel TCP EchoServer som lytter på port 8080 og ekkoer tilbake alle linjer den mottar fra én klient.</p>
              <p><strong>b)</strong> TCP — bruker <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">ServerSocket</code> og <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">Socket</code>.</p>
              <p><strong>c) Svakheter:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 ml-2">
                  <li>Håndterer kun én klient av gangen (ingen tråder/thread pool)</li>
                  <li>ServerSocket lukkes aldri (ressurslekkasje)</li>
                  <li>Ingen feilhåndtering (IOException)</li>
                </ul>
              </p>
              <p className="text-xs text-[var(--muted)]">For å håndtere flere klienter: wrap <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 rounded">accept()</code>-blokken i en while-løkke og start en ny tråd per klient.</p>
            </div>
          </Collapsible>
        </ExerciseCard>
      </Section>

      {/* ── EKSAMENSOPPGAVER ── */}
      <Section title="Eksamensrelaterte oppgaver" subtitle="Basert på typisk eksamensstil DAT110">

        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/20 p-4 mb-4">
          <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips</p>
          <ul className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
            <li>▸ Eksamensoppgave 1 er alltid flervalg — kjenn protokollnavn og hvilke lag de tilhører</li>
            <li>▸ HTTP-tidberegning dukker opp som beregningsoppgave (oppgave 3-4)</li>
            <li>▸ DNS-flyt kan komme som tegn-oppgave eller kort svar</li>
            <li>▸ Kortfattede svar kreves (2-3 setninger per delspørsmål)</li>
          </ul>
        </div>

        <ExerciseCard number={8} title="Flervalg — applikasjonslaget" difficulty="lett">
          <div className="space-y-4 text-sm">
            {[
              {
                q: "Hvilke protokoller tilhører applikasjonslaget i TCP/IP-stakken?",
                options: ["IP og UDP", "HTTP og DNS", "TCP og UDP", "Ethernet og IP"],
                answer: 1,
                explanation: "HTTP og DNS er applikasjonslagsprotokollen. IP tilhører nettverkslaget; TCP/UDP er transportlaget; Ethernet er linklaget.",
              },
              {
                q: "Hva er RTT (Round-Trip Time)?",
                options: [
                  "Tid for å overføre alle bits av en fil",
                  "Tid fra en liten pakke sendes til svaret mottas",
                  "Tid for DNS-oppslag",
                  "Gjennomsnittlig forsinkelse i nettverket",
                ],
                answer: 1,
                explanation: "RTT er propagasjonsrundetid — tid fra sendt til mottatt svar for en liten pakke. Brukes for å beregne TCP-handshake og HTTP-tid.",
              },
              {
                q: "Hva svarer en server med når en conditional GET treffer en uendret ressurs?",
                options: ["200 OK med ny kopi", "304 Not Modified uten body", "404 Not Found", "301 Moved Permanently"],
                answer: 1,
                explanation: "304 Not Modified uten body — klienten/cachen bruker sin eksisterende kopi. Sparer båndbredde!",
              },
            ].map((item, idx) => (
              <FlervalgsOppgave key={idx} {...item} />
            ))}
          </div>
        </ExerciseCard>

        <ExerciseCard number={9} title="Eksamensstil: HTTP-tidberegning med forsinkelse" difficulty="vanskelig">
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-4 mb-3 text-sm">
            <p className="font-semibold mb-2">Oppgavetekst (eksamensstil):</p>
            <p>
              En webside inneholder 1 HTML-basisfil og 8 innebygde objekter. Alle filer er 100 KB.
              Linkkapasitet: R = 2 Mbps. RTT mellom klient og server: 80 ms.
            </p>
            <p className="mt-2">a) Beregn total hentetid med ikke-persistent HTTP.</p>
            <p>b) Beregn total hentetid med persistent HTTP med pipelining.</p>
            <p>c) Hvor mye raskere er pipelining sammenlignet med ikke-persistent?</p>
          </div>
          <Collapsible title="Fullstendig løsning" color="solution">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold">Gitt:</p>
                <ul className="space-y-0.5">
                  <li>RTT = 80 ms = 0,08 s</li>
                  <li>R = 2 Mbps = 2×10⁶ bps</li>
                  <li>L = 100 KB = 100×10³×8 = 800 000 bits</li>
                  <li>L/R = 800 000 / 2×10⁶ = 0,4 s = 400 ms</li>
                  <li>N = 8 innebygde objekter (+1 HTML = 9 totalt)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">a) Ikke-persistent:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  T = 9 × (2 × 80 + 400) ms{"\n"}
                  = 9 × 560 ms{"\n"}
                  = <strong>5040 ms = 5,04 s</strong>
                </p>
              </div>
              <div>
                <p className="font-semibold">b) Persistent med pipelining:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  T = (2×80 + 400) + 80 + 8×400{"\n"}
                  = 560 + 80 + 3200{"\n"}
                  = <strong>3840 ms = 3,84 s</strong>
                </p>
              </div>
              <div>
                <p className="font-semibold">c) Forbedring:</p>
                <p className="font-mono text-xs mt-1 bg-neutral-100 dark:bg-neutral-800 rounded p-2">
                  Forbedring = 5040 / 3840 ≈ <strong>1,31× raskere (≈ 24% reduksjon)</strong>
                </p>
              </div>
            </div>
          </Collapsible>
        </ExerciseCard>
      </Section>
    </div>
  );
}

/* ── Flervalgs-komponent ── */
function FlervalgsOppgave({ q, options, answer, explanation }: {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
      <p className="font-semibold mb-2">{q}</p>
      <div className="space-y-1">
        {options.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === answer;
          let bg = "hover:bg-neutral-50 dark:hover:bg-neutral-800/30";
          if (chosen !== null) {
            if (isCorrect) bg = "bg-green-100 dark:bg-green-900/30 border-green-400";
            else if (isChosen) bg = "bg-red-100 dark:bg-red-900/30 border-red-400";
          }
          return (
            <button
              key={i}
              onClick={() => setChosen(i)}
              disabled={chosen !== null}
              className={`w-full text-left px-3 py-2 rounded border border-transparent text-xs transition-colors ${bg}`}
            >
              <span className="font-mono mr-2">{i + 1}.</span>{opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div className={`mt-2 p-2 rounded text-xs ${chosen === answer ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"}`}>
          <strong>{chosen === answer ? "Riktig!" : "Feil."}</strong> {explanation}
        </div>
      )}
    </div>
  );
}
