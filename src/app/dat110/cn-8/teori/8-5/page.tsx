"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";

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

// Simplifisert "hash demo" — ikke ekte kryptografisk hash
function simpleHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h) + input.charCodeAt(i);
    h = h & 0xFFFFFFFF;
  }
  const hex = (h >>> 0).toString(16).padStart(8, "0");
  // Fake it to look like SHA-256 output length
  const repeated = (hex + hex + hex + hex + hex + hex + hex + hex).slice(0, 64);
  return repeated;
}

function HashDemo() {
  const [msg, setMsg] = useState("Hei Bob, send meg 100kr");
  const [modified, setModified] = useState("Hei Bob, send meg 900kr");
  const [showHash2, setShowHash2] = useState(false);

  const hash1 = simpleHash(msg);
  const hash2 = simpleHash(modified);
  const hashesMatch = hash1 === hash2;

  return (
    <div className="rounded-xl border-2 border-green-400/60 bg-green-50 dark:bg-green-950/20 p-4">
      <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">Hash-funksjon demo (forenklet)</h4>
      <p className="text-xs text-[var(--muted)] mb-3">NB: Demonstrerer prinsippet — ikke en ekte kryptografisk hash</p>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium block mb-1">Original melding:</label>
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="mt-1 font-mono text-xs text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded p-2 break-all">
            H(m) = {hash1}
          </div>
        </div>

        <button
          onClick={() => setShowHash2(s => !s)}
          className="text-sm underline text-green-600 dark:text-green-400"
        >
          {showHash2 ? "Skjul" : "Vis"} hva som skjer ved modifisert melding (Trudy endrer beløpet)
        </button>

        {showHash2 && (
          <div>
            <label className="text-sm font-medium block mb-1">Modifisert melding (av Trudy):</label>
            <input
              value={modified}
              onChange={e => setModified(e.target.value)}
              className="w-full rounded-lg border border-red-300 bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="mt-1 font-mono text-xs text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded p-2 break-all">
              H(m') = {hash2}
            </div>
            <div className={`mt-2 rounded-lg p-2 text-sm font-bold ${hashesMatch ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"}`}>
              {hashesMatch ? "Hashene er like! (kollisjon — dette er problemet vi unngår med SHA-256)" : "Hashene er ULIKE — Bob oppdager at meldingen er endret!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CN8_5Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.5 Meldingsintegritet og digitale signaturer</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.5</p>
        <h1 className="text-2xl font-bold mb-2">Meldingsintegritet og digitale signaturer</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Kryptering gir konfidensialitet. Men hva om Trudy modifiserer en kryptert melding uten å forstå innholdet?
          Hash-funksjoner, MAC og digitale signaturer gir oss meldingsintegritet og non-repudiation.
        </p>
      </div>

      <MustKnow items={[
        "Hash-funksjoner er ENVEISKRYPTOGRAFI — kan ikke reverseres. Gir fast lengde output uavhengig av input",
        "Kryptografiske krav: kollisjonsresistans, pre-image resistans, avalanche effect",
        "MD5 er kompromittert (kollisjoner funnet). SHA-1 svekket. SHA-256 er standard i dag",
        "MAC = Message Authentication Code = hash av (melding + hemmelig nøkkel). Gir integritet + autentisering",
        "Digital signatur = krypterer hash med PRIVAT nøkkel. Gir integritet + non-repudiation",
        "Sertifikat = CA signerer (identitet + offentlig nøkkel). Løser nøkkelautentiseringsproblemet",
      ]} />

      <Section title="1. Kryptografiske hash-funksjoner" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">
          En hash-funksjon tar inn en melding av vilkårlig lengde og produserer et <strong>fast-lengde fingeravtrykk</strong>.
          Det er umulig (i praksis) å gå tilbake fra hash til original melding.
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="rounded-lg border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 p-3 text-center text-sm">
              <p className="font-mono">"Hei Bob..."</p>
              <p className="text-xs text-[var(--muted)]">Melding m (vilkårlig lengde)</p>
            </div>
            <div className="text-2xl text-[var(--muted)]">→</div>
            <div className="rounded-lg border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 text-center text-sm">
              <p className="font-mono font-bold">H(m)</p>
              <p className="text-xs text-[var(--muted)]">Hash-funksjon</p>
            </div>
            <div className="text-2xl text-[var(--muted)]">→</div>
            <div className="rounded-lg border-2 border-green-400 bg-green-50 dark:bg-green-950/30 p-3 text-center text-sm font-mono">
              <p className="text-xs break-all">a3f2c8d1... (256 bit)</p>
              <p className="text-xs text-[var(--muted)]">Fast lengde "fingeravtrykk"</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <Card color="green">
            <h4 className="font-bold text-sm mb-1">Pre-image resistans</h4>
            <p className="text-xs text-[var(--muted)]">Gitt H(m), umulig å finne m. Hash er "enveisfunksjon".</p>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-sm mb-1">Kollisjonsresistans</h4>
            <p className="text-xs text-[var(--muted)]">Umulig å finne m ≠ m' slik at H(m) = H(m'). Trudy kan ikke lage et falskt dokument med samme hash.</p>
          </Card>
          <Card color="green">
            <h4 className="font-bold text-sm mb-1">Avalanche effect</h4>
            <p className="text-xs text-[var(--muted)]">Én bit endring i input gir drastisk annerledes hash. "Hei" og "hei" (liten h) har helt ulike hashes.</p>
          </Card>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-green-50 dark:bg-green-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Hash-funksjon</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Output-lengde</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Status</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Brukes til</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MD5", "128 bit", "Kompromittert — kollisjoner funnet", "Kun sjekksummer (ikke sikkerhet)"],
                ["SHA-1", "160 bit", "Svekket — Google fant kollisjon 2017", "Utdatert, unngå"],
                ["SHA-256", "256 bit", "Sikker — dagens standard", "TLS, Bitcoin, sertifikater, etc."],
                ["SHA-3 (Keccak)", "Variabel", "Sikker — alternativ design", "Backup til SHA-2"],
              ].map(([name, len, status, use]) => (
                <tr key={name} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold font-mono">{name}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-mono">{len}</td>
                  <td className={`border border-[var(--card-border)] px-3 py-2 ${name === "SHA-256" || name === "SHA-3 (Keccak)" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>{status}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <HashDemo />
      </Section>

      <Section title="2. MAC — Message Authentication Code">
        <p className="text-sm text-[var(--muted)] mb-3">Hash alene løser ikke problemet: Trudy kan modifisere meldingen OG beregne en ny korrekt hash. Vi trenger en <strong>hemmelig nøkkel</strong> i hash-beregningen.</p>

        <Card color="blue">
          <h4 className="font-bold mb-2">Slik fungerer MAC:</h4>
          <div className="space-y-2 text-sm">
            <p>1. Alice og Bob deler en hemmelig nøkkel s.</p>
            <p>2. Alice sender: <span className="font-mono">(m, H(m + s))</span> — meldingen + MAC</p>
            <p>3. Bob beregner H(m + s) og sammenligner med mottatt MAC.</p>
            <p>4. Trudy kan ikke forfalske MAC uten hemmelig nøkkel s.</p>
          </div>
        </Card>

        <FormulaBox
          latex="\text{MAC} = H(m \| s)"
          title="HMAC — Hash-based MAC (forenklet)"
          variant="gold"
          description="m = melding, s = hemmelig nøkkel, ‖ = concatenation. I praksis brukes HMAC som er mer robust: HMAC = H((K ⊕ opad) ‖ H((K ⊕ ipad) ‖ m))"
        />

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">MAC-diagram: Alice sender til Bob</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-300 px-3 py-2 text-center">
                <p className="font-bold">Alice</p>
                <p className="font-mono text-xs">Melding m</p>
                <p className="font-mono text-xs">+ nøkkel s</p>
              </div>
              <div className="text-[var(--muted)]">→ H(m‖s) →</div>
              <div className="rounded bg-green-50 dark:bg-green-950/30 border border-green-300 px-3 py-2 text-center">
                <p className="font-bold">Sender</p>
                <p className="font-mono text-xs">(m, MAC)</p>
              </div>
              <div className="text-[var(--muted)] text-xl">→</div>
              <div className="rounded bg-green-50 dark:bg-green-950/30 border border-green-300 px-3 py-2 text-center">
                <p className="font-bold">Bob</p>
                <p className="font-mono text-xs">Verifiserer</p>
                <p className="font-mono text-xs">H(m‖s) = MAC?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="green">
            <h4 className="font-bold text-sm mb-1">MAC gir:</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Meldingsintegritet — ingen kan endre m uten å bli oppdaget</li>
              <li>Autentisering — bare den som kjenner s kan lage gyldig MAC</li>
            </ul>
          </Card>
          <Card color="red">
            <h4 className="font-bold text-sm mb-1">MAC gir IKKE:</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Non-repudiation — Alice kan nekte å ha sendt meldingen</li>
              <li>Konfidensialitet — meldingen er ikke kryptert</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="3. Digitale signaturer">
        <p className="text-sm text-[var(--muted)] mb-3">Digitale signaturer bruker <strong>asymmetrisk kryptografi</strong>. I stedet for en hemmelig delt nøkkel, brukes avsenderens private nøkkel. Dette gir <strong>non-repudiation</strong> — Alice kan ikke nekte å ha signert.</p>

        <Card color="purple">
          <h4 className="font-bold mb-2">Signerings-og-verifiserings-prosessen:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6 shrink-0">1.</span>
              <span>Alice beregner hashverdien: h = H(m)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6 shrink-0">2.</span>
              <span>Alice krypterer hashen med sin <em>private</em> nøkkel: σ = K_A⁻(h) — dette er signaturen</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6 shrink-0">3.</span>
              <span>Alice sender (m, σ) til Bob</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6 shrink-0">4.</span>
              <span>Bob beregner h' = H(m) og dekrypterer signaturen: h'' = K_A⁺(σ)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600 dark:text-green-400 w-6 shrink-0">5.</span>
              <span>Hvis h' = h'': signaturen er gyldig — meldingen er uendret og fra Alice</span>
            </div>
          </div>
        </Card>

        {/* Diagram for digital signatur */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <h4 className="font-bold text-sm mb-3">Digital signatur — visuelt:</h4>
          <div className="min-w-[550px]">
            <div className="grid grid-cols-2 gap-8">
              {/* Alice sin side */}
              <div className="space-y-2">
                <p className="font-bold text-sm text-blue-600 dark:text-blue-400 mb-2">Alice (sender)</p>
                <div className="rounded border border-[var(--card-border)] p-2 text-xs text-center bg-blue-50 dark:bg-blue-950/20">Melding m</div>
                <div className="text-center text-xs text-[var(--muted)]">↓ H()</div>
                <div className="rounded border border-[var(--card-border)] p-2 text-xs text-center bg-amber-50 dark:bg-amber-950/20">h = H(m) (hash)</div>
                <div className="text-center text-xs text-[var(--muted)]">↓ K_A⁻() (privat nøkkel)</div>
                <div className="rounded border border-[var(--card-border)] p-2 text-xs text-center bg-purple-50 dark:bg-purple-950/20">σ = K_A⁻(h) (signatur)</div>
                <div className="text-center text-xs font-bold text-[var(--muted)]">Sender (m, σ) →</div>
              </div>
              {/* Bob sin side */}
              <div className="space-y-2">
                <p className="font-bold text-sm text-green-600 dark:text-green-400 mb-2">Bob (mottaker)</p>
                <div className="rounded border border-[var(--card-border)] p-2 text-xs text-center bg-green-50 dark:bg-green-950/20">Mottar (m, σ)</div>
                <div className="text-center text-xs text-[var(--muted)]">↓ H(m) og K_A⁺(σ)</div>
                <div className="rounded border border-[var(--card-border)] p-2 text-xs text-center bg-amber-50 dark:bg-amber-950/20">h' = H(m) og h'' = K_A⁺(σ)</div>
                <div className="text-center text-xs text-[var(--muted)]">↓ Sammenlign</div>
                <div className="rounded border border-green-300 p-2 text-xs text-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold">h' = h''? → Gyldig!</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <Card color="green">
            <h4 className="font-bold text-sm mb-1">Integritet</h4>
            <p className="text-xs">Endring i m gir annen hash → mismatch</p>
          </Card>
          <Card color="purple">
            <h4 className="font-bold text-sm mb-1">Autentisering</h4>
            <p className="text-xs">Bare Alice med privat nøkkel kan lage gyldig σ</p>
          </Card>
          <Card color="gold">
            <h4 className="font-bold text-sm mb-1">Non-repudiation</h4>
            <p className="text-xs">Alice kan ikke nekte — bare hun kjenner privat nøkkel</p>
          </Card>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-purple-50 dark:bg-purple-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-center">Hash alene</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-center">MAC</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-center">Digital signatur</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Meldingsintegritet", "❌ Trudy kan endre m+hash", "✓", "✓"],
                ["Autentisering", "❌", "✓ (delt nøkkel)", "✓ (privat nøkkel)"],
                ["Non-repudiation", "❌", "❌ Begge kjenner nøkkelen", "✓"],
                ["Skalerer til internett", "–", "❌ Trenger delt nøkkel", "✓ Offentlig nøkkel deles"],
                ["Hastighet", "Rask", "Rask", "Tregere (RSA-operasjon)"],
              ].map(([prop, hash, mac, sig]) => (
                <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{prop}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center">{hash}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center">{mac}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center">{sig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Sertifikater og Certificate Authority (CA)">
        <p className="text-sm text-[var(--muted)] mb-3">
          Digital signatur løser ikke ett problem: hvordan vet Bob at den offentlige nøkkelen han har faktisk tilhører Alice?
          <strong> Sertifikater</strong> binder en offentlig nøkkel til en identitet, signert av en betrodd tredjepart (CA).
        </p>

        <Card color="green">
          <h4 className="font-bold mb-2">X.509 Sertifikat inneholder:</h4>
          <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-3 space-y-1">
            <p>Subjekt: CN=www.hvl.no, O=HVL, C=NO</p>
            <p>Utsteder (Issuer): DigiCert Global CA</p>
            <p>Offentlig nøkkel: RSA 2048-bit: 30 82 01 0a 02 82 01 01...</p>
            <p>Gyldig fra: 2024-01-15</p>
            <p>Gyldig til: 2025-01-15</p>
            <p>Signatur (av CA): 3d 7a c2 f1... (CA signerer alt ovenfor)</p>
          </div>
        </Card>

        <div className="space-y-2">
          <h4 className="font-bold text-sm">Slik fungerer sertifisering:</h4>
          {[
            { steg: "1", title: "Bob genererer nøkkelpar og sender Certificate Signing Request (CSR) til CA", icon: "📝" },
            { steg: "2", title: "CA verifiserer Bobs identitet (f.eks. sjekker at han eier domenet)", icon: "🔍" },
            { steg: "3", title: "CA utsteder sertifikat: CA-sign(Bob_identitet + Bob_offentlig_nøkkel)", icon: "✅" },
            { steg: "4", title: "Bob legger sertifikatet på nettsiden sin (www.bob.com)", icon: "🌐" },
            { steg: "5", title: "Alice besøker bob.com, mottar sertifikat, verifiserer CA-signaturen med CAs offentlige nøkkel", icon: "🔐" },
            { steg: "6", title: "Alice vet nå at offentlig nøkkel i sertifikatet faktisk tilhører Bob", icon: "✓" },
          ].map(({ steg, title, icon }) => (
            <div key={steg} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{steg}</div>
              <p className="text-sm pt-1">{icon} {title}</p>
            </div>
          ))}
        </div>

        <Card color="blue">
          <h4 className="font-bold mb-2">Sertifikatkjeden (Chain of Trust)</h4>
          <p className="text-sm mb-2">I praksis er det en hierarkisk kjede:</p>
          <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2 space-y-1">
            <p className="text-amber-600 dark:text-amber-400">Root CA (selvundertegnet, innebygd i OS/nettleser)</p>
            <p className="text-[var(--muted)]">  ↓ signerer</p>
            <p className="text-blue-600 dark:text-blue-400">Intermediate CA (f.eks. DigiCert Global CA)</p>
            <p className="text-[var(--muted)]">  ↓ signerer</p>
            <p className="text-green-600 dark:text-green-400">Leaf Certificate (www.hvl.no)</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">Root CA-sertifikater er forhåndsinstallert i nettlesere og OS. Nettleseren din har ~100+ stk.</p>
        </Card>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Hva om en CA blir hacket?</h4>
          <p className="text-sm">DigiNotar-skandalen (2011): iranske hackere tok over nederlandsk CA og utstedte falske sertifikater for google.com. Brukt til MitM-angrep mot iranske borgere. DigiNotar ble fjernet fra alle nettleseres tillitsliste. Selskapet gikk konkurs.</p>
        </Card>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.5 (VIKTIG!)</h4>
        <ul className="text-sm space-y-1">
          <li>• Vanligste feil: Tro at hash = kryptering. FEIL! Hash er enveis, kryptering er toveis</li>
          <li>• MAC vs digital signatur: MAC krever delt nøkkel (ingen non-repudiation). Signatur bruker privat nøkkel (non-repudiation)</li>
          <li>• MD5 og SHA-1 er KOMPROMITTERTE — bruk SHA-256</li>
          <li>• Digital signatur = PRIVAT nøkkel krypterer hashen (ikke meldingen!)</li>
          <li>• Verifisering = OFFENTLIG nøkkel dekrypterer signaturen og sammenligner med H(m)</li>
          <li>• Sertifikat = CA-signert binding av (identitet + offentlig nøkkel)</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-4" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.4 Autentisering
        </Link>
        <Link href="/dat110/cn-8/teori/8-6" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          8.6 TLS/SSL →
        </Link>
      </div>
    </div>
  );
}
