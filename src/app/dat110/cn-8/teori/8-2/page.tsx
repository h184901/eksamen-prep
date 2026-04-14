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

function CaesarDemo() {
  const [shift, setShift] = useState(3);
  const [input, setInput] = useState("HELLO");

  const encrypt = (text: string, s: number) => {
    return text.toUpperCase().split("").map(c => {
      if (c >= "A" && c <= "Z") {
        return String.fromCharCode(((c.charCodeAt(0) - 65 + s) % 26) + 65);
      }
      return c;
    }).join("");
  };

  const encrypted = encrypt(input, shift);

  return (
    <div className="rounded-xl border-2 border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20 p-4">
      <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-3">Interaktiv Caesar-chiffer</h4>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium block mb-1">Skriv inn tekst:</label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
            className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="HELLO"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Skift (k = {shift}):</label>
          <input
            type="range"
            min={1}
            max={25}
            value={shift}
            onChange={e => setShift(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>1</span>
            <span>25</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white dark:bg-neutral-800 border border-[var(--card-border)] p-3">
            <p className="text-xs text-[var(--muted)] mb-1">Plaintext:</p>
            <p className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">{input || "?"}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-neutral-800 border border-[var(--card-border)] p-3">
            <p className="text-xs text-[var(--muted)] mb-1">Ciphertext:</p>
            <p className="font-mono text-xl font-bold text-red-600 dark:text-red-400">{encrypted || "?"}</p>
          </div>
        </div>
        <div className="text-xs text-[var(--muted)]">
          <p>Eksempel: "HELLO" med skift 3 → "KHOOR" (H→K, E→H, L→O, L→O, O→R)</p>
          <p className="mt-1 text-red-500">NB: Caesar-chiffer er trivielt å knekke! Kun 25 mulige nøkler.</p>
        </div>
      </div>
    </div>
  );
}

export default function CN8_2Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.2 Symmetrisk kryptering</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.2</p>
        <h1 className="text-2xl font-bold mb-2">Symmetrisk kryptering</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          Symmetrisk kryptering bruker <em>samme nøkkel</em> for kryptering og dekryptering. Sender og mottaker må
          dele nøkkelen på forhånd. Forstå historien fra enkle chiffer til moderne AES, og hva CBC løser.
        </p>
      </div>

      <MustKnow items={[
        "Symmetrisk = samme nøkkel begge veier. Asymmetrisk (RSA) = to forskjellige nøkler",
        "DES: 56-bit nøkkel — for kort, knekkes med brute force. AES: 128/192/256-bit — brukt i dag",
        "ECB-modus: farlig (identiske blokker gir identisk ciphertext). CBC-modus: trygg (bruker XOR med forrige blokk)",
        "Block cipher vs. strømchiffer: block = faste blokker, strøm = én bit/byte om gangen",
        "Nøkkelfordelingsproblemet: hvordan deler Alice og Bob nøkkelen uten at Trudy hører?",
      ]} />

      <Section title="1. Historisk bakgrunn — enkle chiffer" defaultOpen={true}>
        <Card color="blue">
          <h4 className="font-bold mb-2">Monoalfabetisk substitusjonschiffer</h4>
          <p className="text-sm">Hvert bokstav erstattes med et annet. <strong>Caesar-chiffer</strong>: shift alle bokstaver k posisjoner fremover i alfabetet. Julius Caesar brukte k=3.</p>
          <div className="mt-2 font-mono text-sm bg-white dark:bg-neutral-800 rounded p-2">
            <p>Klartekst: a b c d e f ... x y z</p>
            <p>Chiffer:    d e f g h i ... a b c</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">Svakhet: kun 25 mulige nøkler. Kan knekkes på sekunder med brute-force (prøv alle kombinasjoner).</p>
        </Card>

        <CaesarDemo />

        <Card color="purple">
          <h4 className="font-bold mb-2">Polyalfabetisk chiffer — Vigenère</h4>
          <p className="text-sm">Bruker et nøkkelord der hvert bokstav bestemmer et ulikt skift. F.eks. nøkkel "CAT" (3, 1, 20): første bokstav skiftes 3, andre 1, tredje 20, så repeteres. Vanskeligere å knekke, men fortsatt sårbar for <strong>frekvensanalyse</strong>.</p>
        </Card>

        <Card color="gold">
          <h4 className="font-bold mb-2">Frekvensanalyse</h4>
          <p className="text-sm">I norsk (og engelsk) er noen bokstaver mye vanligere (E, R, N, ...). En angriper kan telle bokstav-frekvenser i ciphertexten og gjette hvilken bokstav tilsvarer hvilken. Knekker enkle substitusjonschiffre uten nøkkel.</p>
        </Card>
      </Section>

      <Section title="2. Block Ciphers — DES og AES">
        <p className="text-sm text-[var(--muted)] mb-3">Moderne kryptering bruker <strong>blokk-chiffer</strong>: plaintexten deles i blokker (64 bit for DES, 128 bit for AES) og hver blokk krypteres separat med en kompleks substitusjons-/permuteringsfunksjon.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cyan-50 dark:bg-cyan-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left text-blue-600 dark:text-blue-400">DES</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left text-blue-600 dark:text-blue-400">3DES</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-left text-green-600 dark:text-green-400">AES</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Blokkstørrelse", "64 bit", "64 bit", "128 bit"],
                ["Nøkkellengde", "56 bit", "168 bit (3×56)", "128 / 192 / 256 bit"],
                ["Runder", "16", "48 (3×16)", "10 / 12 / 14"],
                ["Status", "Usikker — knekket", "Sakte, men OK", "Standard i dag"],
                ["År standardisert", "1977", "1995", "2001"],
                ["Brukes til", "Eldre systemer", "Banktransaksjoner (gammel)", "HTTPS, WiFi, disk"],
              ].map(([prop, des, tdes, aes]) => (
                <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{prop}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{des}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-[var(--muted)]">{tdes}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 font-medium text-green-700 dark:text-green-400">{aes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Hvorfor DES er usikker</h4>
          <p className="text-sm">56-bit nøkkel gir 2⁵⁶ ≈ 7,2 × 10¹⁶ mulige nøkler. En moderne datamaskin med spesialisert hardware (FPGA) kan prøve alle kombinasjoner på <strong>under 24 timer</strong>. I 1999 ble DES knekket på 22 timer av EFF DES Cracker ("Deep Crack").</p>
        </Card>

        <Card color="green">
          <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">AES — Rijndael</h4>
          <p className="text-sm">AES (Advanced Encryption Standard) er Belgisk-designet (Rijndael) og ble NIST-standard i 2001. Bygger på substitusjons-boks (S-box) og shift-rows/mix-columns transformasjoner. Med 256-bit nøkkel ville brute-force ta lenger enn universets alder selv med all datakapasitet på jord.</p>
        </Card>
      </Section>

      <Section title="3. Driftsmodi — ECB vs CBC">
        <p className="text-sm text-[var(--muted)] mb-3">Selve blokk-chiffer krypterer én blokk om gangen. Men hva om meldingen er lengre enn én blokk? Driftsmodus bestemmer hvordan vi kobler blokkene.</p>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">ECB — Electronic Codebook (FARLIG)</h4>
          <p className="text-sm">Hver blokk krypteres <em>uavhengig</em> med samme nøkkel. Identiske plaintext-blokker gir <strong>identiske ciphertext-blokker</strong>. Angriperen kan se mønstre i ciphertexten uten å kjenne nøkkelen.</p>
          <div className="mt-2 font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2">
            <p>Plaintext: [BLOCK1] [BLOCK1] [BLOCK2]</p>
            <p>ECB:       [CIPH_A] [CIPH_A] [CIPH_B]  ← Trudy ser at blokk 1 = blokk 2!</p>
          </div>
          <p className="text-xs text-red-500 mt-2">Det berømte "ECB pingvin"-eksempelet: et bitmappbilde av en Linux-pingvin kryptert med ECB avslører konturene — fordi piksler med samme farge gir identisk ciphertext.</p>
        </Card>

        <Card color="green">
          <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">CBC — Cipher Block Chaining (TRYGG)</h4>
          <p className="text-sm mb-2">Hver blokk XORes med <em>forrige ciphertext-blokk</em> FØR kryptering. Første blokk XORes med en <strong>IV (Initialization Vector)</strong> — tilfeldig valgt for hver melding.</p>
          <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-3 space-y-1">
            <p className="text-green-600 dark:text-green-400">C₁ = E_K(P₁ XOR IV)</p>
            <p className="text-green-600 dark:text-green-400">C₂ = E_K(P₂ XOR C₁)</p>
            <p className="text-green-600 dark:text-green-400">C₃ = E_K(P₃ XOR C₂)</p>
            <p className="text-[var(--muted)]">Dekryptering: P₁ = D_K(C₁) XOR IV</p>
          </div>
        </Card>

        <FormulaBox
          latex="C_i = E_K(P_i \oplus C_{i-1}), \quad C_0 = \text{IV}"
          title="CBC kryptering"
          variant="gold"
          description="Ci = ciphertext blokk i, Pi = plaintext blokk i, E_K = krypteringsfunksjon med nøkkel K, ⊕ = XOR. Dekryptering: P_i = D_K(C_i) ⊕ C_{i-1}"
        />

        {/* Visuell CBC-diagram */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <h4 className="font-bold text-sm mb-3">CBC-modus visuelt:</h4>
          <div className="min-w-[600px] flex items-center gap-2">
            {/* IV */}
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-purple-400 bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-xs font-bold text-purple-700 dark:text-purple-400">IV</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Tilfeldig</p>
            </div>
            <div className="text-[var(--muted)]">⊕</div>
            {/* Blokk 1 */}
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-400">P₁</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Plaintext</p>
            </div>
            <div className="text-[var(--muted)]">→</div>
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-400">E_K</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Krypter</p>
            </div>
            <div className="text-[var(--muted)]">→</div>
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-red-400 bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-xs font-bold text-red-700 dark:text-red-400">C₁</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Ciphertext</p>
            </div>
            <div className="text-[var(--muted)]">⊕</div>
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-400">P₂</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Plaintext</p>
            </div>
            <div className="text-[var(--muted)]">→</div>
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-400">E_K</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Krypter</p>
            </div>
            <div className="text-[var(--muted)]">→</div>
            <div className="text-center">
              <div className="w-14 h-10 rounded border-2 border-red-400 bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-xs font-bold text-red-700 dark:text-red-400">C₂</div>
              <p className="text-xs mt-1 text-[var(--muted)]">Ciphertext</p>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-3">C₁ "kjedes" inn i krypteringen av P₂ → identiske plaintext-blokker gir ulik ciphertext!</p>
        </div>
      </Section>

      <Section title="4. Strømchiffer vs Blokkchiffer">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Blokkchiffer</h4>
            <p className="text-sm">Krypterer faste blokker (f.eks. 128 bit). Passer for data som lagres (filer, disk). Krever padding hvis meldingen ikke er et multiplum av blokkstørrelsen.</p>
            <p className="text-xs text-[var(--muted)] mt-2">Eksempler: AES, DES, 3DES</p>
          </Card>
          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Strømchiffer</h4>
            <p className="text-sm">Krypterer én bit/byte om gangen. Genererer en pseudotilfeldig nøkkelstrøm og XOR-er med plaintext. Passer for strømmede data (lyd, video, WiFi).</p>
            <p className="text-xs text-[var(--muted)] mt-2">Eksempler: RC4 (brukt i WEP — nå usikker!), ChaCha20</p>
          </Card>
        </div>
      </Section>

      <Section title="5. Nøkkelfordelingsproblemet">
        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Grunnleggende problem med symmetrisk kryptering</h4>
          <p className="text-sm">Alice og Bob må <em>på forhånd</em> bli enige om en hemmelig nøkkel. Men hvordan deler de nøkkelen uten at Trudy hører? De kan ikke sende den ukryptert over internett...</p>
        </Card>

        <div className="space-y-2 mt-2">
          <p className="text-sm font-bold">Løsninger på nøkkelfordelingsproblemet:</p>
          <div className="space-y-2">
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3">
              <p className="text-sm font-bold">1. Forhåndsavtalt nøkkel (out-of-band)</p>
              <p className="text-xs text-[var(--muted)]">Møtes fysisk, bytter nøkkel på USB-pinne. Upraktisk på internett-skala.</p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3">
              <p className="text-sm font-bold">2. Diffie-Hellman nøkkelutveksling</p>
              <p className="text-xs text-[var(--muted)]">Alice og Bob kan avtale en felles hemmelighet over en offentlig kanal uten at Trudy kan beregne den. Brukes i TLS.</p>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-3">
              <p className="text-sm font-bold">3. Asymmetrisk kryptering (RSA) for å sende symmetrisk nøkkel</p>
              <p className="text-xs text-[var(--muted)]">Alice krypterer AES-nøkkelen med Bobs offentlige RSA-nøkkel. Kun Bob kan dekryptere. Brukt i TLS pre-master secret.</p>
            </div>
          </div>
        </div>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.2</h4>
        <ul className="text-sm space-y-1">
          <li>• Vanlig feil: Tro at CBC er "langsomt" eller uvanlig — det er standard!</li>
          <li>• ECB vs CBC: ECB er farlig fordi identiske blokker → identisk output</li>
          <li>• DES er historisk men ikke lenger sikker — AES er dagens standard</li>
          <li>• "Symmetrisk" = rask kryptering, men nøkkelfordeling er problemet</li>
          <li>• 3DES = DES tre ganger med tre nøkler: E_K3(D_K2(E_K1(P)))</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-1" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.1 Hva er nettverkssikkerhet?
        </Link>
        <Link href="/dat110/cn-8/teori/8-3" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          8.3 Offentlig-nøkkel kryptering (RSA) →
        </Link>
      </div>
    </div>
  );
}
