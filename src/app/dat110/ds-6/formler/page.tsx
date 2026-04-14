"use client";

import Link from "next/link";
import { useState } from "react";

function FormulaBox({ label, formula, color, children }: {
  label: string;
  formula: string;
  color: "gold" | "blue" | "red";
  children?: React.ReactNode;
}) {
  const colors = {
    gold: "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
    red:  "border-red-400 bg-red-50 dark:bg-red-950/20",
  };
  const labelColors = {
    gold: "bg-amber-400 text-white",
    blue: "bg-blue-500 text-white",
    red:  "bg-red-500 text-white",
  };
  return (
    <div className={`rounded-xl border-2 ${colors[color]} overflow-hidden my-4`}>
      <div className={`${labelColors[color]} px-4 py-1.5 text-xs font-bold uppercase tracking-wide`}>{label}</div>
      <div className="px-5 py-4">
        <div className="font-mono text-lg font-bold text-center mb-3 bg-white dark:bg-neutral-900 rounded-lg py-3 border border-[var(--card-border)]">
          {formula}
        </div>
        {children}
      </div>
    </div>
  );
}

function VarRow({ sym, meaning }: { sym: string; meaning: string }) {
  return (
    <div className="flex gap-3 text-sm py-1 border-b border-[var(--card-border)] last:border-0">
      <span className="font-mono font-bold text-blue-700 dark:text-blue-400 min-w-[60px]">{sym}</span>
      <span>{meaning}</span>
    </div>
  );
}

function QuickRef({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[var(--card-hover)] transition-colors"
      >
        <span className="text-sm font-medium">{question}</span>
        <span className="text-[var(--muted)] text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-3 text-sm text-[var(--muted)] border-t border-[var(--card-border)] pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function DS6FormlerPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/ds-6" className="hover:text-[var(--accent)]">DS-6</Link>
        <span>/</span>
        <span>Formler</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Formler — Navngiving og Chord DHT</h1>
      <p className="text-[var(--muted)] mb-8">Alle formler du trenger, med forklaringer og bruksguide.</p>

      {/* ── Viktigste formel ── */}
      <h2 className="text-xl font-bold mb-3">Primærformler (alltid på eksamen)</h2>

      <FormulaBox
        label="Fingertabell — VIKTIGST"
        formula="FT_n[i] = succ( (n + 2^(i-1)) mod 2^m )"
        color="gold"
      >
        <div className="space-y-0.5 mb-3">
          <VarRow sym="n" meaning="Node-ID du beregner tabellen for" />
          <VarRow sym="i" meaning="Rad-indeks, fra 1 til m (inklusive)" />
          <VarRow sym="m" meaning="Antall bits i adresserommet" />
          <VarRow sym="2^m" meaning="Adresserommets størrelse (eks: m=5 → 32 posisjoner)" />
          <VarRow sym="succ(x)" meaning="Den noden med minste ID ≥ x (sirkulært)" />
        </div>
        <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
          <p className="font-bold mb-1">Fremgangsmåte:</p>
          <ol className="space-y-0.5 list-decimal list-inside">
            <li>For hvert i fra 1 til m: beregn n + 2^(i-1)</li>
            <li>Ta mod 2^m (kun nødvendig hvis n + 2^(i-1) ≥ 2^m)</li>
            <li>Finn succ() = minste node med ID ≥ resultatet</li>
          </ol>
        </div>
      </FormulaBox>

      <FormulaBox
        label="Nøkkelansvar"
        formula="Nøkkel k tilhører node s der: pred(s) < k ≤ s"
        color="blue"
      >
        <div className="space-y-0.5 mb-3">
          <VarRow sym="k" meaning="Nøkkel-ID (f.eks. hash av filnavn)" />
          <VarRow sym="s" meaning="Ansvarlig server = succ(k)" />
          <VarRow sym="pred(s)" meaning="Forgjengeren til s i ringen (noden rett foran)" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2">
            <p className="font-bold mb-1">Normaltilfelle (s {">"} pred(s)):</p>
            <p>pred(s) {"< k ≤"} s er sant når k er i intervallet (pred(s), s]</p>
            <p className="mt-1 font-mono">Eks: pred=5, s=17 → nøkler 6,7,...,17</p>
          </div>
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2">
            <p className="font-bold mb-1">Wrap-around (s {"<"} pred(s)):</p>
            <p>Skjer for noden med lavest ID. k tilhører s hvis k {">"} pred(s) ELLER k {"≤"} s</p>
            <p className="mt-1 font-mono">Eks: pred=25, s=1 → nøkler 26,27,...,31,0,1</p>
          </div>
        </div>
      </FormulaBox>

      <FormulaBox
        label="Oppslagskompleksitet"
        formula="Antall hopp ≈ O(log₂ N)"
        color="red"
      >
        <div className="space-y-0.5 mb-3">
          <VarRow sym="N" meaning="Antall aktive noder i ringen" />
        </div>
        <div className="rounded-lg bg-red-100 dark:bg-red-900/30 px-3 py-2 text-xs">
          <p className="font-bold mb-1">Intuisjon:</p>
          <p>Hvert hopp halverer (minst) gjenværende avstand til målet. Samme prinsipp som binærsøk.</p>
          <p className="mt-1">Med N=32 noder: forventer log₂(32) = 5 hopp maksimum.</p>
          <p className="mt-1">Med N=1000 noder: forventer ≈10 hopp. Med N=1 million: ≈20 hopp!</p>
        </div>
      </FormulaBox>

      {/* ── Adresserom ── */}
      <h2 className="text-xl font-bold mb-3 mt-8">Adresserom og ring</h2>

      <div className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-5 my-4">
        <h3 className="font-bold mb-3">Adresserom-formler</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-mono bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2 mb-2">
              Adresserom = 2^m posisjoner
            </div>
            <p className="text-xs text-[var(--muted)]">Posisjoner: {"{0, 1, 2, ..., 2^m - 1}"}. Med m=5: 32 posisjoner (0–31).</p>
          </div>
          <div>
            <div className="font-mono bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2 mb-2">
              Identifikator = SHA-1(entitet) mod 2^m
            </div>
            <p className="text-xs text-[var(--muted)]">I praksis m=160 bits (SHA-1). På eksamen brukes små m (3–6) for overkomelig regning.</p>
          </div>
        </div>
      </div>

      {/* ── Oppslagsalgoritme ── */}
      <h2 className="text-xl font-bold mb-3 mt-8">Oppslagsalgoritmen</h2>

      <div className="rounded-xl border-2 border-network-400/40 bg-[var(--card)] p-5 my-4">
        <h3 className="font-bold mb-3">findSuccessor og closestPrecedingNode</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <p className="text-sm font-bold font-sans mb-2">findSuccessor(k) fra node n:</p>
            <div className="bg-neutral-900 text-green-300 rounded-lg p-3">
              <p>if n {"<"} k ≤ succ(n):</p>
              <p className="ml-4">return succ(n)</p>
              <p>else:</p>
              <p className="ml-4">n' = closestPrecedingNode(k)</p>
              <p className="ml-4">return n'.findSuccessor(k)</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold font-sans mb-2">closestPrecedingNode(k) fra node n:</p>
            <div className="bg-neutral-900 text-green-300 rounded-lg p-3">
              <p>for i = m downTo 1:</p>
              <p className="ml-4">if n {"<"} FT[i] {"<"} k:</p>
              <p className="ml-8">return FT[i]</p>
              <p>return n</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-[var(--muted)] mt-3">
          Betingelsene er sirkulære. Når k {"<"} n (wrap-around), betyr n {"<"} FT[i] {"<"} k at FT[i] {">"} n ELLER FT[i] {"<"} k.
        </p>
      </div>

      {/* ── DNS-formler ── */}
      <h2 className="text-xl font-bold mb-3 mt-8">DNS — ressurspost-format</h2>

      <div className="rounded-xl border-2 border-amber-400/40 bg-[var(--card)] p-5 my-4">
        <div className="font-mono text-center bg-amber-50 dark:bg-amber-950/20 rounded-lg px-4 py-3 text-base font-bold mb-4">
          RR = (navn, verdi, type, TTL)
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
          {[
            { type: "A",     fmt: "(hostname, IP-adresse, A, TTL)",          ex: "(www.hvl.no, 158.37.32.44, A, 3600)" },
            { type: "NS",    fmt: "(domene, navneserver-hostname, NS, TTL)",  ex: "(hvl.no, ns02.hib.no, NS, 86400)" },
            { type: "CNAME", fmt: "(alias, kanonisk navn, CNAME, TTL)",       ex: "(www.ibm.com, server.backup.ibm.com, CNAME)" },
            { type: "MX",    fmt: "(domene, e-postserver, MX, TTL)",          ex: "(hvl.no, mail.hvl.no, MX, 86400)" },
          ].map(({ type, fmt, ex }) => (
            <div key={type} className="rounded-lg bg-white dark:bg-neutral-900/50 p-2.5 border border-amber-200 dark:border-amber-800">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">type = {type}</p>
              <p className="text-[var(--muted)]">{fmt}</p>
              <p className="text-neutral-400 mt-1">{ex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hurtigreferanse ── */}
      <h2 className="text-xl font-bold mb-3 mt-8">Hurtigreferanse — vanlige spørsmål</h2>

      <div className="space-y-2">
        <QuickRef
          question="Hva er succ(7) med noder 1, 5, 17, 19, 25 i m=5-ring?"
          answer="succ(7) = 17. Det er den minste noden med ID ≥ 7. Node 5 < 7, node 17 ≥ 7 → succ(7) = 17."
        />
        <QuickRef
          question="Hvem er ansvarlig for nøkkel 0 med noder 1, 5, 17, 19, 25?"
          answer="succ(0) = 1. Node 1 er den minste noden med ID ≥ 0. Regel: pred(1)=25, og 25 < 0 ≤ 1 er sant sirkulært (dvs. 26,27,...,31,0,1 alle tilhører node 1)."
        />
        <QuickRef
          question="Hva skjer med FT[5] for node 17 i m=5-ringen med noder 1,5,17,19,25?"
          answer="FT[5] = succ((17 + 2^4) mod 32) = succ((17+16) mod 32) = succ(33 mod 32) = succ(1) = 1. Wrap-around! 17+16=33 ≥ 32, så vi tar 33 mod 32 = 1."
        />
        <QuickRef
          question="Hvordan sjekker jeg om FT[i] er i (n, k) når det er wrap-around?"
          answer="Hvis n < k (normalt): sjekk n < FT[i] < k. Hvis n > k (wrap-around, f.eks. n=25, k=3): sjekk FT[i] > n ELLER FT[i] < k. Dvs. FT[i] ∈ {26,...,31,0,1,2}."
        />
        <QuickRef
          question="Hva er forskjellen på findSuccessor og closestPrecedingNode?"
          answer="findSuccessor(k) avgjør om succ(n) allerede er svaret (n < k ≤ succ(n)), og hvis ikke, delegerer til closestPrecedingNode som finner den høyeste fingeren < k å hoppe til."
        />
        <QuickRef
          question="Hva betyr 'attributtbasert navngiving'?"
          answer="Man søker etter entiteter basert på attributter (egenskaper), ikke et fast navn. Eksempel: LDAP — finn alle skrivere på 3. etasje med A3-støtte. Fleksibelt, men tyngre å implementere enn flat eller strukturert navngiving."
        />
      </div>

      {/* ── Kompleksitet ── */}
      <h2 className="text-xl font-bold mb-3 mt-8">Kompleksitetssammenligning</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-[var(--card-border)] rounded-lg overflow-hidden">
          <thead className="bg-neutral-100 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-2 text-left">Metode</th>
              <th className="px-4 py-2 text-left">Oppslag</th>
              <th className="px-4 py-2 text-left">Lagringsoverhead</th>
              <th className="px-4 py-2 text-left">Skalerbarhet</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: "Ringgjennomsøk (naive)", lookup: "O(N)", storage: "O(1)", scale: "Dårlig" },
              { method: "Fullt kjennskap (alle noder)", lookup: "O(1)", storage: "O(N)", scale: "Dårlig" },
              { method: "Chord med fingertabell", lookup: "O(log N)", storage: "O(log N)", scale: "God" },
            ].map(({ method, lookup, storage, scale }, i) => (
              <tr key={i} className={`border-t border-[var(--card-border)] ${i === 2 ? "bg-emerald-50 dark:bg-emerald-950/20 font-bold" : ""}`}>
                <td className="px-4 py-2">{method}</td>
                <td className="px-4 py-2 font-mono">{lookup}</td>
                <td className="px-4 py-2 font-mono">{storage}</td>
                <td className="px-4 py-2">{scale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
