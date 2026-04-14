"use client";

import { useState } from "react";
import Link from "next/link";

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    purple: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
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

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MÅ kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">★</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

type HandshakeStep = {
  id: number;
  name: string;
  from: "client" | "server";
  messages: string[];
  explanation: string;
  color: string;
};

const HANDSHAKE_STEPS: HandshakeStep[] = [
  {
    id: 1,
    name: "ClientHello",
    from: "client",
    messages: [
      "TLS version: 1.3",
      "Client random: 32 byte tilfeldig tall",
      "Cipher suites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305...",
      "Extensions: server_name (SNI), supported_groups...",
    ],
    explanation: "Klienten initierer handshake. Sender TLS-versjon den støtter, en tilfeldig verdi (client random), og listen over algoritmer den kan bruke (cipher suites). SNI-extension lar serveren vite hvilket hostname klienten prøver å nå (viktig for hosting).",
    color: "blue",
  },
  {
    id: 2,
    name: "ServerHello + Certificate",
    from: "server",
    messages: [
      "TLS version: 1.3 (valgt)",
      "Server random: 32 byte tilfeldig tall",
      "Cipher suite: TLS_AES_256_GCM_SHA384 (valgt)",
      "Sertifikat: X.509 med offentlig nøkkel",
      "CertificateVerify: signert hash av handshake",
    ],
    explanation: "Serveren svarer med valgt TLS-versjon og cipher suite. Sender sitt X.509-sertifikat (inkl. offentlig nøkkel) utstedt av en CA. I TLS 1.3 autentiserer serveren seg umiddelbart med en signatur (CertificateVerify).",
    color: "green",
  },
  {
    id: 3,
    name: "Nøkkelutveksling (ECDHE)",
    from: "client",
    messages: [
      "Client key share: g^a mod p (ECDHE ephemeral)",
      "Server allerede sendt: g^b mod p i ServerHello",
      "Felles hemmelighet: g^(ab) mod p = pre-master secret",
    ],
    explanation: "I TLS 1.3 brukes ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) for Perfect Forward Secrecy. Nye nøkler genereres for hver sesjon. Pre-master secret beregnes fra DH-utvekslingen.",
    color: "purple",
  },
  {
    id: 4,
    name: "Master Secret og Session Keys",
    from: "client",
    messages: [
      "master_secret = PRF(pre_master_secret, client_random, server_random)",
      "client_write_key = H(master_secret + label + seed)",
      "server_write_key = H(master_secret + label + seed)",
      "client_write_MAC_key, server_write_MAC_key",
    ],
    explanation: "Fra pre-master secret + de to random-verdiene brukes PRF (Pseudo Random Function) til å generere master secret. Fra master secret avledes 4 session keys: to krypteringsnøkler (klient→server og server→klient) og to MAC-nøkler. Symmetriske nøkler — raske!",
    color: "gold",
  },
  {
    id: 5,
    name: "Finished",
    from: "client",
    messages: [
      "Client Finished: MAC av alle handshake-meldinger",
    ],
    explanation: "Klienten sender en 'Finished'-melding: en MAC over alle handshake-meldingene (sikrer integritet av hele handshaken). Serveren sjekker og svarer med sin Finished. Begge bekrefter at handshaken ikke ble tuklet med.",
    color: "network",
  },
  {
    id: 6,
    name: "Application Data",
    from: "client",
    messages: [
      "HTTP-forespørsel: GET / HTTP/1.1",
      "Kryptert med client_write_key (AES-GCM)",
      "MAC med client_write_MAC_key",
      "Alt er kryptert og MAC-sikret",
    ],
    explanation: "Handshake er ferdig! All data er nå kryptert med session keys (AES-GCM i dag) og MAC-sikret. Klient→server bruker client_write_key. Server→klient bruker server_write_key. Disse er kortlivde og kastes etter sesjonen (PFS).",
    color: "green",
  },
];

function TLSHandshakeViz() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="rounded-xl border-2 border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20 p-4">
      <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-1">TLS 1.3 Handshake — klikk på et steg</h4>
      <p className="text-xs text-[var(--muted)] mb-4">Klikk på en melding for detaljert forklaring</p>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Header */}
          <div className="grid grid-cols-3 text-center mb-3">
            <div className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
              <span>💻</span> Klient (nettleser)
            </div>
            <div className="text-xs text-[var(--muted)] flex items-center justify-center">Internett</div>
            <div className="font-bold text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
              <span>🖥️</span> Server (www.hvl.no)
            </div>
          </div>

          {/* Kolonne-linje */}
          <div className="relative">
            <div className="absolute left-[16.66%] top-0 bottom-0 w-px bg-blue-200 dark:bg-blue-800"></div>
            <div className="absolute left-[83.33%] top-0 bottom-0 w-px bg-green-200 dark:bg-green-800"></div>

            {HANDSHAKE_STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                className="w-full text-left mb-2 group"
              >
                <div className="relative flex items-center">
                  {step.from === "client" ? (
                    <>
                      <div className="w-1/6 flex justify-center">
                        <div className={`w-3 h-3 rounded-full ${activeStep === step.id ? "bg-blue-600" : "bg-blue-300 group-hover:bg-blue-400"} transition-colors`}></div>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className={`flex-1 h-0.5 ${activeStep === step.id ? "bg-blue-600" : "bg-blue-300"} transition-colors`}></div>
                        <div className={`rounded px-2 py-1 text-xs font-medium transition-colors ${activeStep === step.id ? "bg-blue-600 text-white" : "bg-white dark:bg-neutral-800 border border-blue-300 text-blue-700 dark:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"}`}>
                          {step.id}. {step.name} →
                        </div>
                        <div className={`flex-1 h-0.5 ${activeStep === step.id ? "bg-blue-600" : "bg-blue-300"} transition-colors`}></div>
                      </div>
                      <div className="w-1/6 flex justify-center">
                        <div className={`w-3 h-3 rounded-full ${activeStep === step.id ? "bg-green-600" : "bg-green-300 group-hover:bg-green-400"} transition-colors`}></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/6 flex justify-center">
                        <div className={`w-3 h-3 rounded-full ${activeStep === step.id ? "bg-blue-600" : "bg-blue-300 group-hover:bg-blue-400"} transition-colors`}></div>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className={`flex-1 h-0.5 ${activeStep === step.id ? "bg-green-600" : "bg-green-300"} transition-colors`}></div>
                        <div className={`rounded px-2 py-1 text-xs font-medium transition-colors ${activeStep === step.id ? "bg-green-600 text-white" : "bg-white dark:bg-neutral-800 border border-green-300 text-green-700 dark:text-green-400 group-hover:bg-green-50 dark:group-hover:bg-green-900/30"}`}>
                          ← {step.id}. {step.name}
                        </div>
                        <div className={`flex-1 h-0.5 ${activeStep === step.id ? "bg-green-600" : "bg-green-300"} transition-colors`}></div>
                      </div>
                      <div className="w-1/6 flex justify-center">
                        <div className={`w-3 h-3 rounded-full ${activeStep === step.id ? "bg-green-600" : "bg-green-300 group-hover:bg-green-400"} transition-colors`}></div>
                      </div>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detaljpanel */}
      {activeStep !== null && (() => {
        const step = HANDSHAKE_STEPS.find(s => s.id === activeStep);
        if (!step) return null;
        const borderColor = step.from === "client" ? "border-blue-300 bg-blue-50 dark:bg-blue-950/30" : "border-green-300 bg-green-50 dark:bg-green-950/30";
        return (
          <div className={`mt-4 rounded-xl border-2 ${borderColor} p-4`}>
            <h5 className="font-bold mb-2">Steg {step.id}: {step.name}</h5>
            <div className="mb-3">
              <p className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Meldingsinnhold:</p>
              <ul className="space-y-1">
                {step.messages.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-cyan-500 shrink-0 mt-0.5">•</span>
                    <span className="font-mono">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted)] uppercase mb-1">Forklaring:</p>
              <p className="text-sm">{step.explanation}</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default function CN8_6Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.6 TLS/SSL</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.6</p>
        <h1 className="text-2xl font-bold mb-2">TLS/SSL — Sikker transportlagskommunikasjon</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          TLS (Transport Layer Security) er den viktigste sikkerhetsprotokollen på internett.
          Den kombinerer alle teknikkene du har lært: asymmetrisk kryptering for nøkkelutveksling,
          symmetrisk kryptering for data, MAC for integritet og sertifikater for autentisering.
          HTTPS = HTTP over TLS.
        </p>
      </div>

      <MustKnow items={[
        "TLS kombinerer: RSA/DH for nøkkelutveksling, AES for kryptering, SHA for integritet, X.509 sertifikater",
        "Handshake-sekvensen: ClientHello → ServerHello+Cert → nøkkelutveksling → master secret → Finished → Application Data",
        "Pre-master secret → master secret → 4 session keys (kryptering og MAC for begge retninger)",
        "TLS 1.3: raskere (1 RTT i stedet for 2), krever ECDHE (PFS obligatorisk), fjernet svake chiffer",
        "Record Protocol: krypterer og MAC-er applikasjonsdata i blokker",
        "SSL er gammel og usikker (SSL 2.0, 3.0). TLS 1.2 og 1.3 er i bruk",
      ]} />

      <Section title="1. SSL vs TLS — historikk" defaultOpen={true}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cyan-50 dark:bg-cyan-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2">Versjon</th>
                <th className="border border-[var(--card-border)] px-3 py-2">År</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Status</th>
                <th className="border border-[var(--card-border)] px-3 py-2">Kommentar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SSL 2.0", "1995", "Usikker — forbudt (RFC 6176)", "Netscape originale design. Alvorlige svakheter."],
                ["SSL 3.0", "1996", "Usikker — forbudt (RFC 7568)", "POODLE-angrep 2014. Ikke bruk."],
                ["TLS 1.0", "1999", "Avviklet", "BEAST-angrep. Fjernet fra de fleste servere."],
                ["TLS 1.1", "2006", "Avviklet", "Fjernet fra store nettlesere 2020."],
                ["TLS 1.2", "2008", "Godkjent", "Fortsatt bredt brukt. Støtter mange cipher suites."],
                ["TLS 1.3", "2018", "Anbefalt — raskest og sikreste", "Færre RTT, obligatorisk PFS, fjernet svake chiffer."],
              ].map(([ver, year, status, comment]) => (
                <tr key={ver} className={`even:bg-neutral-50 dark:even:bg-neutral-900/30 ${ver.includes("1.3") ? "bg-green-50 dark:bg-green-950/20" : ""}`}>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold font-mono">{ver}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{year}</td>
                  <td className={`border border-[var(--card-border)] px-3 py-2 ${status.includes("Usikker") || status.includes("Avviklet") ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-400"}`}>{status}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)] text-xs">{comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Forholdet mellom SSL og TLS</h4>
          <p className="text-sm">SSL og TLS er teknisk sett ulike protokoller (TLS er ikke "SSL 4.0"), men folk bruker navnene om hverandre. Når du ser "SSL-sertifikat" i dag, menes egentlig TLS. <span className="font-bold">SSL er avviklet — bruk TLS.</span></p>
        </Card>
      </Section>

      <Section title="2. TLS-protokollens arkitektur">
        <p className="text-sm text-[var(--muted)] mb-3">TLS er en protokoll i <strong>applikasjonslaget</strong> (CN-perspektiv) som kjører <em>over</em> TCP. Den består av to underlag:</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="purple">
            <h4 className="font-bold mb-2">TLS Handshake Protocol</h4>
            <p className="text-sm">Etablerer sikker sesjon:</p>
            <ul className="text-sm list-disc list-inside space-y-1 mt-1">
              <li>Autentiserer server (og evt. klient)</li>
              <li>Avtaler krypteringsalgoritme</li>
              <li>Etablerer session keys</li>
            </ul>
          </Card>
          <Card color="blue">
            <h4 className="font-bold mb-2">TLS Record Protocol</h4>
            <p className="text-sm">Krypterer og sender data:</p>
            <ul className="text-sm list-disc list-inside space-y-1 mt-1">
              <li>Deler applikasjonsdata i records (maks 16KB)</li>
              <li>Komprimerer (valgfritt)</li>
              <li>Krypterer med session key</li>
              <li>Beregner og vedlegger MAC</li>
            </ul>
          </Card>
        </div>

        {/* Lag-diagram */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">TLS i protokollstakken:</h4>
          <div className="space-y-1 max-w-sm mx-auto text-center text-sm">
            {[
              { lag: "HTTP", color: "bg-blue-100 dark:bg-blue-900/30 border-blue-400", note: "Applikasjon" },
              { lag: "TLS (Record + Handshake)", color: "bg-purple-100 dark:bg-purple-900/30 border-purple-400", note: "Sikkerhetslag" },
              { lag: "TCP", color: "bg-green-100 dark:bg-green-900/30 border-green-400", note: "Transport" },
              { lag: "IP", color: "bg-amber-100 dark:bg-amber-900/30 border-amber-400", note: "Nettverk" },
            ].map(({ lag, color, note }) => (
              <div key={lag} className={`rounded border-2 ${color} py-2 px-3 flex justify-between items-center`}>
                <span className="font-bold">{lag}</span>
                <span className="text-xs text-[var(--muted)]">{note}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 text-center">HTTPS = HTTP + TLS. Port 443. HTTP alene bruker port 80 (ingen sikkerhet).</p>
        </div>
      </Section>

      <Section title="3. TLS 1.3 Handshake — steg for steg">
        <TLSHandshakeViz />

        <Card color="gold">
          <h4 className="font-bold mb-2">Session Keys — fire nøkler genereres</h4>
          <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-3 space-y-1">
            <p className="text-blue-600 dark:text-blue-400">client_write_key  → klient krypterer data til server</p>
            <p className="text-green-600 dark:text-green-400">server_write_key  → server krypterer data til klient</p>
            <p className="text-blue-400">client_write_MAC  → klient MAC-er data til server</p>
            <p className="text-green-400">server_write_MAC  → server MAC-er data til klient</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">Separate nøkler for hver retning gir ekstra sikkerhet. Alle fire genereres fra master secret via PRF.</p>
        </Card>
      </Section>

      <Section title="4. TLS 1.3 vs TLS 1.2 — viktige forskjeller">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">TLS 1.2</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>2 RTT (round trips) for handshake</li>
              <li>DH og RSA for nøkkelutveksling (RSA uten PFS)</li>
              <li>Støtter svake algoritmer (RC4, DES, MD5)</li>
              <li>Komplisert — mange cipher suites å velge</li>
            </ul>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">TLS 1.3 (anbefalt)</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>1 RTT (halv latens!)</li>
              <li>Kun ECDHE — PFS er obligatorisk</li>
              <li>Svake algoritmer fjernet</li>
              <li>Enklere — 5 cipher suites</li>
              <li>0-RTT mulig (men har replay-risiko)</li>
            </ul>
          </Card>
        </div>

        <Card color="purple">
          <h4 className="font-bold mb-2">Perfect Forward Secrecy (PFS) i TLS 1.3</h4>
          <p className="text-sm">Med ECDHE (Ephemeral) genereres nye DH-nøkler for <em>hver</em> sesjon. Selv om serveres langsiktige private RSA-nøkkel avsløres i fremtiden, kan ikke tidligere trafikk dekrypteres — fordi ECDHE-nøklene er borte. TLS 1.3 krever dette.</p>
        </Card>
      </Section>

      <Section title="5. TLS Record Protocol — datakryptering">
        <p className="text-sm text-[var(--muted)] mb-3">Når handshaken er ferdig, overtar Record Protocol for å kryptere applikasjonsdata.</p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Record-format:</h4>
          <div className="flex items-center gap-1 flex-wrap">
            {[
              { label: "Type (1B)", color: "bg-purple-100 dark:bg-purple-900/30 border-purple-300" },
              { label: "Version (2B)", color: "bg-blue-100 dark:bg-blue-900/30 border-blue-300" },
              { label: "Length (2B)", color: "bg-amber-100 dark:bg-amber-900/30 border-amber-300" },
              { label: "Kryptert payload (variabel)", color: "bg-green-100 dark:bg-green-900/30 border-green-300" },
              { label: "MAC (variabel)", color: "bg-red-100 dark:bg-red-900/30 border-red-300" },
            ].map(({ label, color }) => (
              <div key={label} className={`rounded border ${color} px-2 py-3 text-xs text-center font-mono`}>
                {label}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-xs text-[var(--muted)]">
            <p><strong>Type:</strong> application_data (23), handshake (22), alert (21), change_cipher_spec (20)</p>
            <p><strong>Payload:</strong> Kryptert med AES-GCM (i TLS 1.3). GCM inkluderer autentisering — ingen separat MAC nødvendig</p>
          </div>
        </div>

        <Card color="network">
          <h4 className="font-bold mb-2">AEAD — Authenticated Encryption with Associated Data</h4>
          <p className="text-sm">TLS 1.3 bruker AES-GCM (Galois/Counter Mode) som er et AEAD-chiffer. Det gir kryptering og autentisering i ett steg — ingen separat HMAC nødvendig. Raskere og sikrere enn separate operasjoner.</p>
        </Card>
      </Section>

      <Section title="6. TLS i praksis">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold mb-2">Hva nettleseren sjekker:</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Sertifikatet er ikke utløpt</li>
              <li>Sertifikatet er utstedt av en betrodd CA</li>
              <li>Domenename matcher (CN eller SAN)</li>
              <li>Sertifikatet er ikke tilbakekalt (CRL/OCSP)</li>
            </ul>
          </Card>
          <Card color="red">
            <h4 className="font-bold mb-2">TLS-angrep du bør kjenne:</h4>
            <ul className="text-sm space-y-1">
              <li><strong>BEAST:</strong> CBC i TLS 1.0 — fikset i 1.1+</li>
              <li><strong>POODLE:</strong> SSL 3.0 padding — fjern SSL 3.0</li>
              <li><strong>DROWN:</strong> SSLv2 deling av nøkler</li>
              <li><strong>Heartbleed:</strong> OpenSSL buffer overflow (2014)</li>
            </ul>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Cipher Suite — eksempel</h4>
          <div className="font-mono text-sm bg-white dark:bg-neutral-800 rounded p-3">
            <p className="text-purple-600 dark:text-purple-400">TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-[var(--muted)]">
              <div><span className="text-amber-600 dark:text-amber-400">ECDHE:</span> Nøkkelutveksling (PFS)</div>
              <div><span className="text-amber-600 dark:text-amber-400">RSA:</span> Autentisering av server</div>
              <div><span className="text-amber-600 dark:text-amber-400">AES_256_GCM:</span> Datakryptering</div>
              <div><span className="text-amber-600 dark:text-amber-400">SHA384:</span> Integritets-hash</div>
            </div>
          </div>
        </Card>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.6 (VIKTIG!)</h4>
        <ul className="text-sm space-y-1">
          <li>• TLS = kryptering (AES) + autentisering (sertifikat) + integritet (MAC) + nøkkelutveksling (DH)</li>
          <li>• Handshake bruker asymmetrisk kryptografi, men data-overføring bruker symmetrisk (raskere)</li>
          <li>• "Pre-master secret" → "master secret" → "session keys" via PRF</li>
          <li>• TLS 1.3 er raskere (1 RTT vs 2) og sikrere (kun ECDHE, ingen svake chiffer)</li>
          <li>• SSL er avviklet — ALDRI bruk SSL 2.0 eller 3.0</li>
          <li>• Sertifikater løser MitM-problemet ved å autentisere den offentlige nøkkelen</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-5" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.5 Meldingsintegritet og signaturer
        </Link>
        <Link href="/dat110/cn-8/teori/8-9" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          8.9 Brannmur og IDS →
        </Link>
      </div>
    </div>
  );
}
