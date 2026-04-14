"use client";

import { useState } from "react";

function FormulaBox({ title, formula, vars, color = "gold", when }: {
  title: string;
  formula: string;
  vars: { symbol: string; meaning: string }[];
  color?: "gold" | "blue" | "network" | "green";
  when?: string;
}) {
  const colors = {
    gold: "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400 bg-network-50 dark:bg-network-950/20",
    green: "border-green-400 bg-green-50 dark:bg-green-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-4 ${colors[color]}`}>
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-mono text-base text-center my-2">
        {formula}
      </div>
      {when && (
        <p className="text-xs text-[var(--muted)] mb-2 italic">Når: {when}</p>
      )}
      <div className="mt-2 space-y-1">
        {vars.map((v) => (
          <div key={v.symbol} className="flex gap-2 text-xs">
            <span className="font-mono font-bold w-20 shrink-0 text-network-700 dark:text-network-300">{v.symbol}</span>
            <span className="text-[var(--muted)]">{v.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-network-700 dark:text-network-300">{title}</h2>
      {children}
    </section>
  );
}

function Collapsible({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-3 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

/* ── Interactive HTTP calculator ── */
function HTTPCalculator() {
  const [rtt, setRtt] = useState(50);
  const [fileSize, setFileSize] = useState(100);
  const [bandwidth, setBandwidth] = useState(10);
  const [mode, setMode] = useState<"np" | "p" | "pp">("np");

  const R = bandwidth * 1e6; // bps
  const L = fileSize * 1000 * 8; // bits
  const transmitTime = L / R; // seconds
  const rttSec = rtt / 1000; // seconds

  let totalTime = 0;
  let description = "";

  if (mode === "np") {
    // Non-persistent: 2RTT + L/R per object (base HTML + 1 object)
    totalTime = 2 * rttSec + transmitTime;
    description = "2RTT + L/R (for ett objekt, ikke-persistent)";
  } else if (mode === "p") {
    // Persistent without pipelining: 2RTT for TCP setup + first req, then RTT + L/R per object
    totalTime = 2 * rttSec + transmitTime;
    description = "2RTT + L/R for første objekt; RTT + L/R for hvert påfølgende (persistent)";
  } else {
    // Persistent with pipelining
    totalTime = 2 * rttSec + transmitTime;
    description = "2RTT for oppkobling + HTML, deretter L/R for alle objekter parallelt (pipelining)";
  }

  return (
    <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5 my-4">
      <h3 className="font-bold mb-4">Interaktiv HTTP-tidkalkulator</h3>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold block mb-1">RTT (ms)</label>
          <input type="range" min={1} max={500} value={rtt} onChange={(e) => setRtt(Number(e.target.value))}
            className="w-full accent-network-500" />
          <span className="text-sm font-mono">{rtt} ms</span>
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Filstørrelse L (KB)</label>
          <input type="range" min={1} max={5000} value={fileSize} onChange={(e) => setFileSize(Number(e.target.value))}
            className="w-full accent-network-500" />
          <span className="text-sm font-mono">{fileSize} KB</span>
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Båndbredde R (Mbps)</label>
          <input type="range" min={1} max={1000} value={bandwidth} onChange={(e) => setBandwidth(Number(e.target.value))}
            className="w-full accent-network-500" />
          <span className="text-sm font-mono">{bandwidth} Mbps</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {([["np", "Ikke-persistent"], ["p", "Persistent"], ["pp", "Persistent + Pipeline"]] as const).map(([val, label]) => (
          <button key={val} onClick={() => setMode(val as "np" | "p" | "pp")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              mode === val
                ? "bg-network-500 text-white border-network-500"
                : "border-network-400 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20"
            }`}>
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-white dark:bg-neutral-900/50 border border-network-200 dark:border-network-800/40 p-4">
        <div className="grid sm:grid-cols-3 gap-3 text-sm mb-3">
          <div>
            <p className="text-xs text-[var(--muted)]">Overforingstid L/R</p>
            <p className="font-mono font-bold text-lg">{(transmitTime * 1000).toFixed(1)} ms</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">RTT</p>
            <p className="font-mono font-bold text-lg">{rtt} ms</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">Total tid (1 obj)</p>
            <p className="font-mono font-bold text-lg text-network-600 dark:text-network-400">{(totalTime * 1000).toFixed(1)} ms</p>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)]">{description}</p>
      </div>
    </div>
  );
}

export default function CN2FormlerPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Formler og nøkkelkonsepter</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">CN 2.1–2.7 — HTTP-tidberegning, P2P-distribusjon og DNS</p>

      {/* Når bruker du hva */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-network-700 dark:text-network-300">Rask oversikt — «Når bruker du hva?»</h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-network-50 dark:bg-network-950/20">
                <th className="text-left p-3 border border-[var(--card-border)]">Situasjon</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Formel/Konsept</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hente 1 objekt via HTTP (ikke-persistent)", "2RTT + L/R"],
                ["Hente HTML + N objekter (ikke-persistent)", "(2N+2)RTT + (N+1)·L/R"],
                ["Persistent HTTP uten pipelining", "2RTT + L/R (1. obj) + N·(RTT + L/R) (øvrige)"],
                ["Persistent HTTP med pipelining", "2RTT + L/R (HTML) + RTT + NL/R (alle obj parallelt)"],
                ["DNS-oppslagstid (iterativt, ingen cache)", "Opptil 3 RTT (lokal → root → TLD → autoritativ)"],
                ["P2P vs klient-server distribusjonstid", "D_cs = max(NF/u_s, F/d_min) vs D_p2p med total upload"],
                ["Web-cache conditional GET — ingen endring", "304 Not Modified — body sendes IKKE"],
              ].map(([situation, formula]) => (
                <tr key={situation} className="border-b border-[var(--card-border)]">
                  <td className="p-3 border border-[var(--card-border)]">{situation}</td>
                  <td className="p-3 font-mono text-xs text-network-700 dark:text-network-300 border border-[var(--card-border)]">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── HTTP-tidberegning ── */}
      <Section title="HTTP-tidberegning">

        <FormulaBox
          title="Ikke-persistent HTTP — tid per objekt"
          formula="T = 2·RTT + L/R"
          color="gold"
          when="Én ny TCP-tilkobling per objekt (HTTP/1.0)"
          vars={[
            { symbol: "T", meaning: "Total tid fra forespørsel sendt til objekt mottatt" },
            { symbol: "RTT", meaning: "Round-Trip Time — tid for liten pakke fra klient til server og tilbake" },
            { symbol: "L", meaning: "Objektstørrelse i bits" },
            { symbol: "R", meaning: "Linkkapasitet / båndbredde i bits per sekund (bps)" },
            { symbol: "L/R", meaning: "Overforingstid — tid for å skyve alle L bits ut på linken" },
            { symbol: "2·RTT", meaning: "1 RTT for TCP-handshake (SYN+SYN-ACK) + 1 RTT for HTTP request/response" },
          ]}
        />

        <FormulaBox
          title="Ikke-persistent HTTP — total tid for HTML + N objekter"
          formula="T_total = (N+1)·(2·RTT + L/R)"
          color="blue"
          when="HTML-side med N innebygde objekter, alle over separate TCP-tilkoblinger (sekvensielt)"
          vars={[
            { symbol: "N", meaning: "Antall innebygde objekter (bilder, CSS, JS, osv.)" },
            { symbol: "N+1", meaning: "N objekter + 1 for HTML-filen selv" },
          ]}
        />

        <FormulaBox
          title="Persistent HTTP (uten pipelining)"
          formula="T = 2·RTT + L_html/R + N·(RTT + L_obj/R)"
          color="green"
          when="Én TCP-tilkobling holdes åpen for alle objekter, men klient venter på svar før neste forespørsel"
          vars={[
            { symbol: "2·RTT + L_html/R", meaning: "Opprette TCP + hente HTML-filen" },
            { symbol: "RTT + L_obj/R", meaning: "Tid per ekstra objekt (ingen ny TCP-handshake)" },
          ]}
        />

        <FormulaBox
          title="Persistent HTTP med pipelining"
          formula="T ≈ 2·RTT + L_html/R + RTT + N·L_obj/R"
          color="network"
          when="Klienten sender alle forespørsler uten å vente på svar — parallell overføring (HTTP/1.1)"
          vars={[
            { symbol: "RTT + N·L_obj/R", meaning: "Én RTT for alle forespørsler + overforingstid for alle N objekter" },
          ]}
        />

        <HTTPCalculator />

        <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm">
          <p className="font-bold mb-1">Intuisjon bak 2RTT:</p>
          <p>
            TCP er tilkoblingsorientert — det kreves ett «håndtrykk» (SYN → SYN-ACK) før data kan sendes.
            Dette koster 1 RTT. Deretter koster selve HTTP-forespørselen og responsen (GET → headers + data)
            ytterligere 1 RTT (pluss overforingstiden L/R). Derav <strong>2RTT + L/R</strong>.
          </p>
          <p className="mt-2">
            Med persistent HTTP sparer vi 1 RTT per etterfølgende objekt siden TCP-tilkoblingen er allerede opprettet.
          </p>
        </div>
      </Section>

      {/* ── P2P distribusjonstid ── */}
      <Section title="P2P vs. klient-server — distribusjonstid">

        <FormulaBox
          title="Klient-server distribusjonstid"
          formula="D_cs = max( N·F / u_s, F / d_min )"
          color="blue"
          when="Server distribuerer fil F til N klienter. Bottleneck er enten server-upload eller sakteste klient-download."
          vars={[
            { symbol: "D_cs", meaning: "Minimum distribusjonstid (klient-server)" },
            { symbol: "N", meaning: "Antall klienter" },
            { symbol: "F", meaning: "Filstørrelse (bits)" },
            { symbol: "u_s", meaning: "Server upload-rate (bps)" },
            { symbol: "d_min", meaning: "Laveste klient download-rate (bps)" },
          ]}
        />

        <FormulaBox
          title="P2P distribusjonstid"
          formula="D_p2p = max( F/u_s, F/d_min, N·F/(u_s + Σu_i) )"
          color="green"
          when="Alle peers bidrar med sin upload-kapasitet — total system-kapasitet øker med N."
          vars={[
            { symbol: "Σu_i", meaning: "Sum av alle N peer-ers upload-rate" },
            { symbol: "u_s + Σu_i", meaning: "Total upload-kapasitet i systemet" },
            { symbol: "N·F/(u_s + Σu_i)", meaning: "Bottleneck: total data som må distribueres / total upload-kapasitet" },
          ]}
        />

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 p-4 text-sm">
          <p className="font-bold mb-2">Nøkkelforskjell:</p>
          <ul className="space-y-1">
            <li>▸ Klient-server: D_cs øker <em>lineært</em> med N — server er flaskehalsen</li>
            <li>▸ P2P: D_p2p øker mye <em>saktere</em> med N fordi total kapasitet (nevneren) også øker med N</li>
            <li>▸ P2P skalerer: jo flere peers, jo raskere distribusjon (self-scalability)</li>
          </ul>
        </div>
      </Section>

      {/* ── DNS ── */}
      <Section title="DNS-oppslagstid og RR-typer">

        <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-4 my-4">
          <h3 className="font-bold mb-2">DNS-oppslagstid (iterativt, ingen cache)</h3>
          <div className="rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-mono text-center my-2">
            T_dns = n × RTT_avg
          </div>
          <div className="mt-2 space-y-1 text-xs">
            <div className="flex gap-2">
              <span className="font-mono font-bold w-24 shrink-0 text-network-700 dark:text-network-300">n</span>
              <span className="text-[var(--muted)]">Antall navneserver-oppslag (typisk 3: lokal → root → TLD → autoritativ)</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono font-bold w-24 shrink-0 text-network-700 dark:text-network-300">RTT_avg</span>
              <span className="text-[var(--muted)]">Gjennomsnittlig RTT per oppslag</span>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">Med DNS-caching reduseres n dramatisk — ofte 0 ekstra RTT hvis svaret allerede er cachet.</p>
        </div>

        <Collapsible title="Fullstendig DNS RR-referanse" defaultOpen>
          <div className="overflow-x-auto">
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="text-left p-2 border border-[var(--card-border)]">Type</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Format: (Navn, Verdi, Type, TTL)</th>
                  <th className="text-left p-2 border border-[var(--card-border)]">Eksempel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A", "(hostname, IPv4-adresse, A, TTL)", "www.hvl.no → 158.37.70.50"],
                  ["AAAA", "(hostname, IPv6-adresse, AAAA, TTL)", "IPv6-oppslag"],
                  ["NS", "(domene, autoritativ navneserver, NS, TTL)", "hvl.no → ns1.hvl.no"],
                  ["CNAME", "(alias, kanonisk navn, CNAME, TTL)", "hvl.no → www.hvl.no"],
                  ["MX", "(domene, e-postserver, MX, TTL)", "hvl.no → mail.hvl.no"],
                ].map(([type, format, ex]) => (
                  <tr key={type} className="border-b border-[var(--card-border)]">
                    <td className="p-2 font-mono font-bold text-network-600 dark:text-network-400 border border-[var(--card-border)]">{type}</td>
                    <td className="p-2 text-xs font-mono border border-[var(--card-border)]">{format}</td>
                    <td className="p-2 text-xs text-[var(--muted)] border border-[var(--card-border)]">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>
      </Section>

      {/* ── Nøkkelkonsepter ── */}
      <Section title="Viktige nøkkelkonsepter (ikke formler)">
        <div className="space-y-3">
          {[
            {
              term: "Conditional GET",
              desc: "Klient/cache inkluderer 'If-Modified-Since: [dato]' i header. Server svarer 304 Not Modified (ingen body) hvis ressursen ikke er endret — sparer båndbredde.",
              color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
            },
            {
              term: "Cookies",
              desc: "4 komponenter: (1) Set-Cookie i HTTP response, (2) Cookie i HTTP request, (3) cookie-fil på klienten, (4) backend DB på server. Gir tilstand til den tilstandsløse HTTP.",
              color: "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
            },
            {
              term: "DNS-caching og TTL",
              desc: "Navneservere cacher svar for TTL-perioden. Reduserer load på root-servere drastisk. Lokal DNS-server husker ofte TLD-serveradressen. Lave TTL-verdier gir fersk informasjon.",
              color: "border-network-400 bg-network-50 dark:bg-network-950/20",
            },
            {
              term: "Self-scalability (P2P)",
              desc: "I P2P bringer nye peers med seg ny tjenestebehov OG ny tjenstekapasitet. Total upload-kapasitet øker med N, noe som holder distribusjonstiden lav selv for store N.",
              color: "border-green-400 bg-green-50 dark:bg-green-950/20",
            },
            {
              term: "Socket som API",
              desc: "Socket er grensesnittet mellom applikasjonslaget og transportlaget. Applikasjonen styrer alt over socketen; OS styrer alt under. Socket identifiseres av IP + portnummer.",
              color: "border-purple-400 bg-purple-50 dark:bg-purple-950/20",
            },
          ].map((item) => (
            <div key={item.term} className={`rounded-xl border-2 p-4 ${item.color}`}>
              <h3 className="font-bold mb-1">{item.term}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Vanlige feil ── */}
      <Section title="Vanlige feil og fallgruver">
        <div className="rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-5">
          <ul className="space-y-3 text-sm">
            {[
              "Glemmer TCP-handshake-RTT: HTTP-forespørselen krever 1 RTT for TCP-oppkobling PLUSS 1 RTT for selve HTTP-request/response — totalt 2 RTT (ikke 1).",
              "Blander L/R og RTT: L/R er tid for å overføre data; RTT er propagasjonsforsinkelse (og litt prosesseringsforsinkelse). Begge må regnes med!",
              "Persistent vs ikke-persistent: Med persistent HTTP uten pipelining er det RTT + L/R (ikke 2RTT) for hvert påfølgende objekt — TCP-tilkoblingen er allerede oppe.",
              "DNS-protokoll: DNS bruker UDP (ikke TCP) — port 53. TCP brukes bare ved sone-overføringer og svar > 512 bytes.",
              "SMTP er push, POP3/IMAP er pull: SMTP sender e-post TIL server; POP3/IMAP brukes AV bruker til å HENTE e-post FRA server.",
              "P2P-formelen: Husk at NF/(u_s + Σu_i) er ett av TRE ledd i max()-uttrykket — alle tre må evalueres.",
            ].map((feil) => (
              <li key={feil} className="flex items-start gap-2">
                <span className="text-red-500 shrink-0 font-bold">!</span>
                <span>{feil}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
