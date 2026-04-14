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

export default function CN8_1Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.1 Hva er nettverkssikkerhet?</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.1</p>
        <h1 className="text-2xl font-bold mb-2">Hva er nettverkssikkerhet?</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Nettverkssikkerhet handler om å beskytte kommunikasjon mellom parter som kan bli angrepet av trusselaktører.
          Forstå de fire pilarene, hvem som er trusselmodellen og grunnleggende kryptografibegreper.
        </p>
      </div>

      <MustKnow items={[
        "De fire pilarene: konfidensialitet, autentisering, meldingsintegritet, tilgjengelighet",
        "Skille mellom Alice, Bob og Trudy (angripermodellen)",
        "Hva er plaintext, ciphertext og krypteringsnøkkel",
        "Hva en eavesdropper og man-in-the-middle kan gjøre",
        "Forskjell mellom passivt angrep (avlytting) og aktivt angrep (modifisering)",
      ]} />

      <Section title="1. De fire pilarene i nettverkssikkerhet" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Konfidensialitet</h4>
                <p className="text-sm">Bare Alice og Bob skal kunne lese meldingen. En avlytter (Trudy) som fanger pakker skal ikke forstå innholdet. Løses med <strong>kryptering</strong>.</p>
              </div>
            </div>
          </Card>
          <Card color="green">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">Meldingsintegritet</h4>
                <p className="text-sm">Meldingen som Bob mottar er <em>nøyaktig</em> den Alice sendte — ikke modifisert underveis. Løses med <strong>hash-funksjoner og MAC</strong>.</p>
              </div>
            </div>
          </Card>
          <Card color="purple">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🪪</span>
              <div>
                <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-1">Autentisering</h4>
                <p className="text-sm">Bob kan bekrefte at meldingen faktisk kom fra Alice — ikke fra Trudy som utgir seg for å være Alice. Løses med <strong>sertifikater og nonces</strong>.</p>
              </div>
            </div>
          </Card>
          <Card color="red">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">Tilgjengelighet</h4>
                <p className="text-sm">Tjenesten er tilgjengelig for legitime brukere. Angrep: <strong>DoS/DDoS</strong> (Denial of Service) som overbelaster servere med falsk trafikk.</p>
              </div>
            </div>
          </Card>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Huskeregel: CIA + Autentisering</h4>
          <p className="text-sm">
            CIA-triaden: <strong>C</strong>onfidentiality (konfidensialitet), <strong>I</strong>ntegrity (integritet), <strong>A</strong>vailability (tilgjengelighet).
            I CN legges autentisering til som den fjerde pilaren. Mange eksamensspørsmål tester om du kjenner alle fire.
          </p>
        </Card>
      </Section>

      <Section title="2. Angripermodellen — Alice, Bob og Trudy">
        <p className="text-sm text-[var(--muted)] mb-3">
          I kryptografibøker brukes alltid de samme navnene. Kjenn disse!
        </p>

        {/* Visuell angripermodell */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="flex items-center justify-between gap-2">
              {/* Alice */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 flex items-center justify-center text-2xl mb-1">👩</div>
                <p className="font-bold text-sm text-blue-600 dark:text-blue-400">Alice</p>
                <p className="text-xs text-[var(--muted)]">Sender</p>
              </div>

              {/* Kanal med Trudy */}
              <div className="flex-1 relative">
                <div className="h-0.5 bg-gradient-to-r from-blue-400 to-green-400 w-full"></div>
                {/* Trudy over */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 border-2 border-red-400 flex items-center justify-center text-xl mb-1">😈</div>
                  <p className="font-bold text-xs text-red-600 dark:text-red-400">Trudy</p>
                  <p className="text-xs text-[var(--muted)]">Angriper</p>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-red-400 border-x-4 border-x-transparent mt-0 -mt-2"></div>
                <p className="text-center text-xs text-[var(--muted)] mt-3">Usikker kanal (internett)</p>
              </div>

              {/* Bob */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 border-2 border-green-400 flex items-center justify-center text-2xl mb-1">👨</div>
                <p className="font-bold text-sm text-green-600 dark:text-green-400">Bob</p>
                <p className="text-xs text-[var(--muted)]">Mottaker</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Passivt angrep (eavesdropping)</h4>
            <p className="text-sm">Trudy <em>lytter</em> på kanalen og leser pakker. Hun endrer ingenting — bare samler informasjon. Vanskelig å oppdage. Trussel mot <strong>konfidensialitet</strong>.</p>
          </Card>
          <Card color="red">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Aktivt angrep</h4>
            <p className="text-sm">Trudy <em>modifiserer</em>, <em>sletter</em> eller <em>injiserer</em> pakker. Kan utgi seg for Alice (impersonation). Trussel mot <strong>integritet og autentisering</strong>.</p>
          </Card>
        </div>

        <Card color="network">
          <h4 className="font-bold mb-2">Man-in-the-Middle (MitM)</h4>
          <p className="text-sm">Trudy posisjonerer seg <em>mellom</em> Alice og Bob. Begge tror de kommuniserer med hverandre, men all trafikk går gjennom Trudy. Hun kan lese, endre og videresende meldinger. Det viktigste forsvaret er <strong>autentisering med sertifikater</strong>.</p>
        </Card>
      </Section>

      <Section title="3. Kryptografibegreper">
        <div className="rounded-xl bg-[var(--card)] border border-[var(--card-border)] p-4 font-mono text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-28 shrink-0 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-300 p-2 text-center text-xs">
                <p className="font-bold text-blue-600 dark:text-blue-400">Plaintext m</p>
                <p className="text-[var(--muted)]">"Hello Bob"</p>
              </div>
              <div className="text-[var(--muted)] text-xs">→ Krypteringsalgoritme K_A(m) →</div>
              <div className="w-28 shrink-0 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 p-2 text-center text-xs">
                <p className="font-bold text-red-600 dark:text-red-400">Ciphertext</p>
                <p className="text-[var(--muted)]">X%#@!&amp;9</p>
              </div>
              <div className="text-[var(--muted)] text-xs">→ Dekryptering K_B(c) →</div>
              <div className="w-28 shrink-0 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 p-2 text-center text-xs">
                <p className="font-bold text-green-600 dark:text-green-400">Plaintext m</p>
                <p className="text-[var(--muted)]">"Hello Bob"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <Card color="blue">
            <h4 className="font-bold text-sm mb-1">Plaintext</h4>
            <p className="text-xs text-[var(--muted)]">Den originale, lesbare meldingen. Det Alice ønsker å sende til Bob (og Trudy ikke skal forstå).</p>
          </Card>
          <Card color="red">
            <h4 className="font-bold text-sm mb-1">Ciphertext</h4>
            <p className="text-xs text-[var(--muted)]">Den krypterte meldingen som sendes over nettverket. Ser ut som tilfeldig støy uten nøkkelen.</p>
          </Card>
          <Card color="gold">
            <h4 className="font-bold text-sm mb-1">Krypteringsnøkkel</h4>
            <p className="text-xs text-[var(--muted)]">Parameteren som styrer krypteringen. Kerckhoffs' prinsipp: algoritmen er offentlig, kun nøkkelen er hemmelig.</p>
          </Card>
        </div>

        <Card color="purple">
          <h4 className="font-bold mb-2">Kerckhoffs' prinsipp</h4>
          <p className="text-sm">Sikkerheten skal hvile på <strong>nøkkelens hemmelighet</strong>, ikke algoritmens hemmelighet. Alle moderne algoritmer (AES, RSA, SHA) er offentlig kjente. Du stoler på matematikken, ikke på at fienden ikke kjenner algoritmen.</p>
          <p className="text-xs text-[var(--muted)] mt-2">Kontrast: "Security through obscurity" — å holde algoritmen hemmelig — regnes som dårlig sikkerhetspraksis.</p>
        </Card>
      </Section>

      <Section title="4. Kryptografisk terminologi">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cyan-50 dark:bg-cyan-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left font-bold">Begrep</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left font-bold">Definisjon</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left font-bold">Eksempel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Kryptografi", "Vitenskapen om å skjule informasjon", "AES, RSA, SHA-256"],
                ["Kryptoanalyse", "Vitenskapen om å knekke kryptografi", "Brute-force, frekvensanalyse"],
                ["Cipher", "En krypteringsalgoritme", "Caesar-chiffer, AES"],
                ["Nøkkel (key)", "Parameteren som styrer kryptering/dekryptering", "128-bit nøkkel i AES"],
                ["Nonce", "Et tall brukt bare én gang — hindrer replay-angrep", "R i autentiseringsprotokoll"],
                ["PKI", "Public Key Infrastructure — rammeverk for sertifikater", "Sertifiseringsinstanser (CA)"],
              ].map(([begrep, def, eks]) => (
                <tr key={begrep} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono font-bold text-cyan-700 dark:text-cyan-400">{begrep}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2">{def}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{eks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="5. Oversikt over sikkerhetstemaene i kapittel 8">
        <p className="text-sm text-[var(--muted)] mb-3">Her er sammenhengen mellom alle delkapitlene — bruk dette som kart:</p>
        <div className="space-y-2">
          {[
            { pillar: "Konfidensialitet", tools: "8.2 Symmetrisk kryptering (AES, DES) + 8.3 Offentlig-nøkkel kryptering (RSA)", color: "blue" },
            { pillar: "Autentisering", tools: "8.4 Autentiseringsprotokoller (ap1.0–ap4.0, nonce)", color: "purple" },
            { pillar: "Meldingsintegritet", tools: "8.5 Hash-funksjoner, MAC, digitale signaturer, PKI/CA", color: "green" },
            { pillar: "Alt + Transport", tools: "8.6 TLS/SSL — kombinerer kryptering, autentisering og integritet", color: "network" },
            { pillar: "Tilgjengelighet + perimeter", tools: "8.9 Brannmurer og IDS/IPS", color: "red" },
            { pillar: "Distribuert sikkerhet", tools: "DS 9 Kerberos, tilgangskontroll, ACL", color: "gold" },
          ].map(({ pillar, tools, color }) => (
            <div key={pillar} className={`rounded-lg border-2 p-3 ${color === "blue" ? "border-blue-300 bg-blue-50 dark:bg-blue-950/20" : color === "purple" ? "border-purple-300 bg-purple-50 dark:bg-purple-950/20" : color === "green" ? "border-green-300 bg-green-50 dark:bg-green-950/20" : color === "network" ? "border-cyan-300 bg-cyan-50 dark:bg-cyan-950/20" : color === "red" ? "border-red-300 bg-red-50 dark:bg-red-950/20" : "border-amber-300 bg-amber-50 dark:bg-amber-950/20"}`}>
              <p className="font-bold text-sm">{pillar}</p>
              <p className="text-xs text-[var(--muted)]">{tools}</p>
            </div>
          ))}
        </div>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.1</h4>
        <ul className="text-sm space-y-1">
          <li>• Flervalg spør ofte: "Hvilke(t) av følgende er IKKE en av de fire pilarene?"</li>
          <li>• Konfuser ikke <strong>autentisering</strong> (hvem er du?) med <strong>autorisasjon</strong> (hva har du lov til?)</li>
          <li>• Trudy er alltid angriperen i CN-eksempler</li>
          <li>• "Non-repudiation" (ikke-avvisbarhet) er relatert, men en separat egenskap</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/cn-8/teori/8-2" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          8.2 Symmetrisk kryptering →
        </Link>
      </div>
    </div>
  );
}
