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

function gcd(a: number, b: number): number {
  while (b !== 0) { [a, b] = [b, a % b]; }
  return a;
}

function modPow(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

function findE(phi: number): number {
  for (let e = 2; e < phi; e++) {
    if (gcd(e, phi) === 1) return e;
  }
  return 3;
}

function modInverse(e: number, phi: number): number {
  for (let d = 1; d < phi * 10; d++) {
    if ((e * d) % phi === 1) return d;
  }
  return -1;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function RSADemo() {
  const [p, setP] = useState(5);
  const [q, setQ] = useState(11);
  const [message, setMessage] = useState(7);
  const [showSteps, setShowSteps] = useState(true);

  const pValid = isPrime(p);
  const qValid = isPrime(q);
  const bothValid = pValid && qValid && p !== q;

  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = findE(phi);
  const d = modInverse(e, phi);
  const msgValid = message > 0 && message < n;
  const c = msgValid ? modPow(message, e, n) : 0;
  const decrypted = msgValid ? modPow(c, d, n) : 0;

  return (
    <div className="rounded-xl border-2 border-purple-400/60 bg-purple-50 dark:bg-purple-950/20 p-4">
      <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-3">RSA Steg-for-steg kalkulator</h4>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium block mb-1">Primtall p:</label>
          <input
            type="number"
            value={p}
            onChange={e => setP(Number(e.target.value))}
            className="w-full rounded border border-[var(--card-border)] bg-[var(--card)] px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
            min={2}
            max={23}
          />
          {!pValid && <p className="text-xs text-red-500 mt-1">Ikke et primtall!</p>}
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Primtall q:</label>
          <input
            type="number"
            value={q}
            onChange={e => setQ(Number(e.target.value))}
            className="w-full rounded border border-[var(--card-border)] bg-[var(--card)] px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
            min={2}
            max={23}
          />
          {!qValid && <p className="text-xs text-red-500 mt-1">Ikke et primtall!</p>}
        </div>
        <div>
          <label className="text-xs font-medium block mb-1">Melding m (0 &lt; m &lt; n={n}):</label>
          <input
            type="number"
            value={message}
            onChange={e => setMessage(Number(e.target.value))}
            className="w-full rounded border border-[var(--card-border)] bg-[var(--card)] px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
            min={1}
            max={n - 1}
          />
          {!msgValid && <p className="text-xs text-red-500 mt-1">m må være mellom 1 og {n - 1}</p>}
        </div>
      </div>

      {bothValid && (
        <div className="space-y-2">
          <button
            onClick={() => setShowSteps(s => !s)}
            className="text-xs text-purple-600 dark:text-purple-400 underline"
          >
            {showSteps ? "Skjul" : "Vis"} steg-for-steg
          </button>

          {showSteps && (
            <div className="space-y-2 font-mono text-sm">
              <div className="rounded bg-white dark:bg-neutral-800 border border-purple-200 dark:border-purple-800 p-3 space-y-1">
                <p className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase">Steg 1: Velg primtall</p>
                <p>p = {p}, q = {q}</p>
              </div>
              <div className="rounded bg-white dark:bg-neutral-800 border border-purple-200 dark:border-purple-800 p-3 space-y-1">
                <p className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase">Steg 2: Beregn n og phi(n)</p>
                <p>n = p × q = {p} × {q} = <strong>{n}</strong></p>
                <p>φ(n) = (p−1)(q−1) = {p - 1} × {q - 1} = <strong>{phi}</strong></p>
              </div>
              <div className="rounded bg-white dark:bg-neutral-800 border border-purple-200 dark:border-purple-800 p-3 space-y-1">
                <p className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase">Steg 3: Velg e (offentlig eksponent)</p>
                <p>Finn e slik at 1 &lt; e &lt; φ(n) og gcd(e, φ(n)) = 1</p>
                <p>e = <strong>{e}</strong>  (gcd({e}, {phi}) = {gcd(e, phi)})</p>
              </div>
              <div className="rounded bg-white dark:bg-neutral-800 border border-purple-200 dark:border-purple-800 p-3 space-y-1">
                <p className="text-purple-600 dark:text-purple-400 font-bold text-xs uppercase">Steg 4: Beregn d (privat eksponent)</p>
                <p>Finn d slik at (e × d) mod φ(n) = 1</p>
                <p>d = <strong>{d}</strong>  ({e} × {d} = {e * d}, mod {phi} = {(e * d) % phi})</p>
              </div>
              <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-300 p-3 space-y-1">
                <p className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase">Nøkkelpar</p>
                <p>Offentlig nøkkel: (n, e) = <strong>({n}, {e})</strong>  ← kan deles med alle</p>
                <p>Privat nøkkel: (n, d) = <strong>({n}, {d})</strong>  ← holdes hemmelig</p>
              </div>
              {msgValid && (
                <>
                  <div className="rounded bg-blue-50 dark:bg-blue-950/20 border border-blue-300 p-3 space-y-1">
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase">Steg 5: Kryptering</p>
                    <p>c = m^e mod n</p>
                    <p>c = {message}^{e} mod {n} = <strong>{c}</strong></p>
                  </div>
                  <div className="rounded bg-green-50 dark:bg-green-950/20 border border-green-300 p-3 space-y-1">
                    <p className="text-green-600 dark:text-green-400 font-bold text-xs uppercase">Steg 6: Dekryptering</p>
                    <p>m = c^d mod n</p>
                    <p>m = {c}^{d} mod {n} = <strong>{decrypted}</strong></p>
                    <p>{decrypted === message ? "✓ Korrekt! Dekryptert melding = original melding" : "Noe gikk galt..."}</p>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-300 p-2 text-center">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Offentlig nøkkel</p>
              <p className="font-mono font-bold">({n}, {e})</p>
            </div>
            <div className="rounded bg-purple-50 dark:bg-purple-950/20 border border-purple-300 p-2 text-center">
              <p className="text-xs font-bold text-purple-700 dark:text-purple-400">Privat nøkkel</p>
              <p className="font-mono font-bold">({n}, {d})</p>
            </div>
            {msgValid && (
              <div className="rounded bg-green-50 dark:bg-green-950/20 border border-green-300 p-2 text-center">
                <p className="text-xs font-bold text-green-700 dark:text-green-400">m={message} → c={c} → m={decrypted}</p>
                <p className="text-xs">{decrypted === message ? "Korrekt!" : "Feil"}</p>
              </div>
            )}
          </div>

          <p className="text-xs text-[var(--muted)]">Prøv klassisk eksempel: p=5, q=11, m=7. Gir n=55, φ=40, e=3, d=27, c=13, tilbake til 7.</p>
        </div>
      )}

      {!bothValid && (
        <p className="text-sm text-red-500">Skriv inn to ulike primtall for å beregne RSA-nøkler.</p>
      )}
    </div>
  );
}

export default function CN8_3Page() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-8/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">8.3 Offentlig-nøkkel kryptering (RSA)</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 8.3</p>
        <h1 className="text-2xl font-bold mb-2">Offentlig-nøkkel kryptering — RSA</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          RSA løste nøkkelfordelingsproblemet: to parter kan kommunisere sikkert uten å ha møtt hverandre.
          Den matematiske genistreken: det er lett å multiplisere to store primtall, men ekstremt vanskelig
          å faktorisere produktet tilbake.
        </p>
      </div>

      <MustKnow items={[
        "Asymmetrisk = offentlig nøkkel krypterer, privat nøkkel dekrypterer",
        "RSA-nøkkelgenerering: p, q (primtall) → n=pq, φ(n)=(p-1)(q-1), e coprime til φ, d = e⁻¹ mod φ",
        "Kryptering: c = m^e mod n. Dekryptering: m = c^d mod n",
        "Sikkerheten baseres på at faktorisering av store tall er umulig i praksis",
        "Diffie-Hellman: lar Alice og Bob avtale hemmelighet over offentlig kanal",
        "RSA er mye tregere enn AES — brukes til å utveksle AES-nøkler, ikke bulk-data",
      ]} />

      <Section title="1. Konseptet — to nøkler i stedet for én" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">
          I symmetrisk kryptering deler Alice og Bob én hemmelig nøkkel. Problemet: hvordan dele nøkkelen sikkert?
          Offentlig-nøkkel kryptering bruker to matematisk relaterte nøkler som løser dette elegant.
        </p>

        {/* Visuell sammenligning */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-sm mb-2">Symmetrisk (ett lås, én nøkkel):</h4>
              <div className="flex items-center gap-2 text-sm">
                <span>👩 Alice</span>
                <span className="text-blue-500 font-mono">→ K(m) →</span>
                <span>👨 Bob</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">Begge bruker nøkkel K. Problem: hvordan dele K?</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2">Asymmetrisk (hengelås + nøkkel):</h4>
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span>👩 Alice</span>
                <span className="text-amber-500 font-mono">→ K_B+(m) →</span>
                <span>👨 Bob</span>
                <span className="text-green-500 font-mono">→ K_B-(c) →</span>
                <span>m</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">Alice bruker Bobs <em>offentlige</em> nøkkel. Kun Bob kan dekryptere med sin <em>private</em> nøkkel.</p>
            </div>
          </div>
        </div>

        <Card color="gold">
          <h4 className="font-bold mb-2">Postkasse-analogien</h4>
          <p className="text-sm">Bob har en postkasse med en åpning alle kan putte brev i (offentlig nøkkel — alle kan kryptere). Men bare Bob har nøkkelen til å åpne postkassen og lese brevene (privat nøkkel). Alle vet <em>adressen</em>, bare Bob kan <em>åpne</em>.</p>
        </Card>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-purple-50 dark:bg-purple-950/30">
                <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-center text-blue-600 dark:text-blue-400">Symmetrisk (AES)</th>
                <th className="border border-[var(--card-border)] px-3 py-2 text-center text-purple-600 dark:text-purple-400">Asymmetrisk (RSA)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Antall nøkler", "1 (delt hemmelighet)", "2 (offentlig + privat)"],
                ["Nøkkelfordeling", "Vanskelig (problem!)", "Enkel (offentlig nøkkel deles fritt)"],
                ["Hastighet", "Meget rask (hardware)", "Tusenvis av ganger tregere"],
                ["Typisk bruk", "Bulk-datakryptering", "Nøkkelutveksling, signaturer"],
                ["Nøkkellengde", "128-256 bit (AES)", "2048-4096 bit (RSA) for tilsvarende sikkerhet"],
              ].map(([prop, sym, asym]) => (
                <tr key={prop} className="even:bg-neutral-50 dark:even:bg-neutral-900/30">
                  <td className="border border-[var(--card-border)] px-3 py-2 font-bold">{prop}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center text-[var(--muted)]">{sym}</td>
                  <td className="border border-[var(--card-border)] px-3 py-2 text-center">{asym}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="2. RSA-algoritmen — matematisk grunnlag">
        <Card color="blue">
          <h4 className="font-bold mb-2">Den matematiske intuisjonen</h4>
          <p className="text-sm">RSA er basert på <strong>modulær aritmetikk</strong> og det faktum at:</p>
          <ul className="text-sm space-y-1 mt-2 list-disc list-inside">
            <li>Det er <em>lett</em> å multiplisere to store primtall: p × q = n</li>
            <li>Det er <em>ekstremt vanskelig</em> å faktorisere n tilbake til p og q</li>
            <li>Med 2048-bit n: ingen kjent algoritme kan faktorisere dette på rimelig tid</li>
          </ul>
        </Card>

        <FormulaBox
          latex="\phi(n) = (p-1)(q-1)"
          title="Eulers totient-funksjon"
          variant="blue"
          description="φ(n) teller antall tall mellom 1 og n som er coprime med n. For n=pq (to primtall) er dette enkelt: (p-1)(q-1)"
        />

        <FormulaBox
          latex="e \cdot d \equiv 1 \pmod{\phi(n)}"
          title="Nøkkelrelasjon — d er multiplikativ invers av e"
          variant="gold"
          description="Dette er kjerne-relasjonen i RSA. d er 'modulær multiplikativ invers' av e modulo φ(n). Beregnes med utvidet Euklids algoritme."
        />

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold mb-3">RSA Nøkkelgenerering — 4 steg:</h4>
          <div className="space-y-3">
            {[
              { steg: "1", title: "Velg to store primtall", detail: "p og q, holdes hemmelige. I praksis: 1024-bit primtall. Eksempel: p=5, q=11" },
              { steg: "2", title: "Beregn n og φ(n)", detail: "n = p × q (offentlig). φ(n) = (p-1)(q-1) (hemmelig). Eksempel: n=55, φ=40" },
              { steg: "3", title: "Velg offentlig eksponent e", detail: "Velg e slik at 1 < e < φ(n) og gcd(e, φ(n)) = 1. Vanlige valg: 3, 65537. Eksempel: e=3" },
              { steg: "4", title: "Beregn privat eksponent d", detail: "d = e⁻¹ mod φ(n) — multiplikativ invers. Krever utvidet Euklids algoritme. Eksempel: d=27 siden 3×27=81≡1 mod 40" },
            ].map(({ steg, title, detail }) => (
              <div key={steg} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{steg}</div>
                <div>
                  <p className="font-bold text-sm">{title}</p>
                  <p className="text-xs text-[var(--muted)]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card color="green">
          <h4 className="font-bold mb-1">Offentlig og privat nøkkel:</h4>
          <p className="text-sm font-mono">Offentlig nøkkel: K⁺ = (n, e) — publiseres til alle</p>
          <p className="text-sm font-mono">Privat nøkkel: K⁻ = (n, d) — aldri deles</p>
        </Card>
      </Section>

      <Section title="3. RSA kryptering og dekryptering">
        <FormulaBox
          latex="c = m^e \pmod{n}"
          title="Kryptering"
          variant="gold"
          description="c = ciphertext, m = plaintext (som tall 0 ≤ m < n), e = offentlig eksponent, n = RSA-modulus. Alice bruker Bobs offentlige nøkkel (n, e)."
        />

        <FormulaBox
          latex="m = c^d \pmod{n}"
          title="Dekryptering"
          variant="blue"
          description="Bob bruker sin private nøkkel (n, d) for å dekryptere. Matematisk bevisbart at dette returnerer original m, forutsatt at m < n."
        />

        <Card color="purple">
          <h4 className="font-bold mb-2">Gjennomgått eksempel: p=5, q=11</h4>
          <div className="font-mono text-sm space-y-1">
            <p className="text-[var(--muted)]">// Nøkkelgenerering</p>
            <p>n = 5 × 11 = <strong>55</strong></p>
            <p>φ(n) = 4 × 10 = <strong>40</strong></p>
            <p>e = 3  (gcd(3, 40) = 1) ✓</p>
            <p>d = 27  (3 × 27 = 81 = 2×40+1 ≡ 1 mod 40) ✓</p>
            <p className="text-[var(--muted)] mt-2">// Offentlig: (55, 3). Privat: (55, 27)</p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">// Krypterer m=7:</p>
            <p>c = 7³ mod 55 = 343 mod 55 = <strong>13</strong></p>
            <p>(343 = 6×55 + 13)</p>
            <p className="text-green-600 dark:text-green-400 mt-2">// Dekrypterer c=13:</p>
            <p>m = 13²⁷ mod 55 = <strong>7</strong> ✓</p>
          </div>
        </Card>

        <RSADemo />

        <Card color="gold">
          <h4 className="font-bold mb-2">Hvorfor fungerer dette matematisk?</h4>
          <p className="text-sm">Eulers teorem: for m {"<"} n og gcd(m,n)=1 gjelder m^φ(n) ≡ 1 (mod n). Siden e·d ≡ 1 (mod φ(n)) betyr det at e·d = kφ(n)+1 for noe k. Dermed: m^(ed) = m^(kφ(n)+1) = (m^φ(n))^k · m = 1^k · m = m (mod n).</p>
        </Card>
      </Section>

      <Section title="4. Sikkerhet — faktorisering">
        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Hvorfor er RSA trygt?</h4>
          <p className="text-sm mb-2">Angriperen kjenner n og e (offentlig). For å finne d trenger hun φ(n) = (p-1)(q-1). Men for å beregne φ(n) trenger hun p og q. Og å faktorisere n = p×q er <strong>computationally infeasible</strong> når p og q er store (1024+ bit).</p>
          <div className="font-mono text-xs bg-white dark:bg-neutral-800 rounded p-2">
            <p>RSA-2048: n er ~617 sifre langt</p>
            <p>Raskeste kjente faktoriseringsalgoritme: ~2¹¹² operasjoner</p>
            <p>Selv alle datamaskiner på jord: umulig i vår levetid</p>
          </div>
        </Card>

        <Card color="purple">
          <h4 className="font-bold mb-2">Fremtidstrusler: kvantecomputing</h4>
          <p className="text-sm">Shors algoritme på en kvantecomputer kan faktorisere RSA-nøkler i polynomisk tid. Derfor jobbes det med <strong>post-kvante kryptografi</strong> (NIST-standardisering pågår): lattice-baserte algoritmer (CRYSTALS-Kyber, CRYSTALS-Dilithium).</p>
        </Card>
      </Section>

      <Section title="5. Diffie-Hellman nøkkelutveksling">
        <p className="text-sm text-[var(--muted)] mb-3">DH lar Alice og Bob avtale en delt hemmelighet over en <em>offentlig</em> kanal — uten å ha møtt hverandre — uten å sende selve hemmeligheten.</p>

        <Card color="green">
          <h4 className="font-bold mb-2">Steg-for-steg:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2"><span className="font-bold text-green-600 dark:text-green-400 w-5 shrink-0">1.</span><span>Alice og Bob blir enige om offentlige parametre: primtall p og generator g (begge offentlige).</span></div>
            <div className="flex gap-2"><span className="font-bold text-green-600 dark:text-green-400 w-5 shrink-0">2.</span><span>Alice velger hemmelig a. Sender A = g^a mod p til Bob.</span></div>
            <div className="flex gap-2"><span className="font-bold text-green-600 dark:text-green-400 w-5 shrink-0">3.</span><span>Bob velger hemmelig b. Sender B = g^b mod p til Alice.</span></div>
            <div className="flex gap-2"><span className="font-bold text-green-600 dark:text-green-400 w-5 shrink-0">4.</span><span>Alice beregner s = B^a mod p = g^(ab) mod p</span></div>
            <div className="flex gap-2"><span className="font-bold text-green-600 dark:text-green-400 w-5 shrink-0">5.</span><span>Bob beregner s = A^b mod p = g^(ab) mod p</span></div>
            <div className="flex gap-2"><span className="font-bold text-amber-600 dark:text-amber-400 w-5 shrink-0">→</span><span><strong>Begge har nå g^(ab) mod p</strong> som delt hemmelighet. Trudy ser A og B men kan ikke beregne g^(ab) uten diskret logaritme.</span></div>
          </div>
        </Card>

        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">DH er sårbar for Man-in-the-Middle!</h4>
          <p className="text-sm">Trudy kan avskjære A og B, lage egne DH-nøkler med Alice og Bob separat. Løsning: <strong>autentisert DH</strong> — signer DH-parametrene med sertifikater. Dette er hva TLS gjør (DHE eller ECDHE).</p>
        </Card>

        <Card color="network">
          <h4 className="font-bold mb-2">Perfect Forward Secrecy (PFS)</h4>
          <p className="text-sm">Hvis en privat nøkkel avsløres i fremtiden, kan tidligere kryptert trafikk ikke dekrypteres dersom <strong>ephemeral DH (DHE/ECDHE)</strong> ble brukt. Hver sesjon har nye DH-nøkler. TLS 1.3 krever PFS.</p>
        </Card>
      </Section>

      <Card color="red">
        <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Eksamenstips — 8.3 (VIKTIG!)</h4>
        <ul className="text-sm space-y-1">
          <li>• RSA er den viktigste algoritmen å kunne i detalj — nøkkelgenerering, kryptering, dekryptering</li>
          <li>• Klassisk eksempel: p=5, q=11 → n=55, φ=40, e=3, d=27 — memorer dette</li>
          <li>• Forvirring: RSA med <em>privat</em> nøkkel = <strong>signatur</strong> (ikke kryptering)</li>
          <li>• RSA brukes IKKE til å kryptere mye data — for treg. Brukes til å sende AES-nøkler</li>
          <li>• "Hardness assumption": faktorisering av store tall</li>
        </ul>
      </Card>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-8/teori/8-2" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 8.2 Symmetrisk kryptering
        </Link>
        <Link href="/dat110/cn-8/teori/8-4" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          8.4 Autentisering →
        </Link>
      </div>
    </div>
  );
}
