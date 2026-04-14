"use client";

import Link from "next/link";
import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return !show ? (
    <button
      onClick={() => setShow(true)}
      className="text-xs px-3 py-1 rounded-full border border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 mt-2"
    >
      Vis løsning
    </button>
  ) : (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 p-4 text-sm mt-3">
      {children}
    </div>
  );
}

function Hint({ children, n }: { children: React.ReactNode; n: number }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-amber-400/50 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
        >
          Hint {n}
        </button>
      ) : (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
          {children}
        </div>
      )}
    </div>
  );
}

function ExamTag({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 font-bold ml-2">
      {label}
    </span>
  );
}

function ProfTag() {
  return (
    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-network-100 dark:bg-network-900/30 text-network-700 dark:text-network-400 border border-network-300 dark:border-network-700 font-bold ml-2">
      Fra øving
    </span>
  );
}

/* ── Chord-konfigurasjon for oppgavene ── */
const RING_M5_EX1 = {
  m: 5,
  nodes: [1, 5, 17, 19, 25],
  label: "m=5, noder: 1, 5, 17, 19, 25",
};

export default function DS6OppgaverPage() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/ds-6" className="hover:text-[var(--accent)]">DS-6</Link>
        <span>/</span>
        <span>Oppgaver</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Oppgaver — Navngiving og Chord DHT</h1>
      <p className="text-[var(--muted)] mb-3">
        Chord er alltid 15% av eksamen. Øv fingertabell-beregning til det er automatisk.
      </p>

      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 mb-8 text-sm text-amber-800 dark:text-amber-300">
        <span className="font-bold">Strategi for Chord-oppgaver: </span>
        Alltid i denne rekkefølgen: (1) Tegn ringen og plasser noder, (2) Beregn fingertabeller systematisk, (3) Bruk FT til nøkkelansvar, (4) Simuler oppslag runde for runde med algoritmen.
      </div>

      {/* ── SEKSJON: Strategi ── */}
      <h2 className="text-xl font-bold mb-4">Oppgavestablett — fremgangsmåter</h2>

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {[
          {
            title: "Fingertabell",
            steps: [
              "For i = 1 til m:",
              "Beregn n + 2^(i-1)",
              "Hvis ≥ 2^m: ta mod 2^m",
              "Finn succ() = minste node ≥ resultat",
              "Fyll inn FT[i] = succ(…)",
            ],
            color: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
          },
          {
            title: "Nøkkelansvar",
            steps: [
              "For hvert nøkkel k:",
              "Finn succ(k) = minste node n ≥ k",
              "Husk wrap-around! (k=0 → succ(0)=1)",
              "Svar: nøkkel k tilhører succ(k)",
              "Regel: pred(s) < k ≤ s",
            ],
            color: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
          },
          {
            title: "Oppslag (runde for runde)",
            steps: [
              "Start fra gitt node n",
              "Sjekk: n < k ≤ succ(n)?",
              "Ja → succ(n) er svaret!",
              "Nei → søk FT baklengs (i=m til 1)",
              "FT[i]: n < FT[i] < k? → hopp dit",
              "Gjenta fra ny node",
            ],
            color: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
          },
        ].map(({ title, steps, color }) => (
          <div key={title} className={`rounded-xl border-2 ${color} p-4`}>
            <p className="font-bold mb-2">{title}</p>
            <ol className="space-y-0.5 text-xs list-decimal list-inside text-[var(--muted)]">
              {steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        ))}
      </div>

      {/* ── SEKSJON: Professorens øvingsoppgaver ── */}
      <h2 className="text-xl font-bold mb-4">
        Professorens øvingsoppgaver (DAT110-Naming-I-L9)
        <ProfTag />
      </h2>

      <p className="text-sm text-[var(--muted)] mb-4">
        Chord-ring: <strong>{RING_M5_EX1.label}</strong>. Adresserom: 2^5 = 32 (0–31).
      </p>

      <div className="space-y-5">
        {/* Oppgave P1 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="font-semibold mb-1">Oppgave P1 — Tegn ringen<ProfTag /></p>
          <p className="text-sm text-[var(--muted)] mb-3">
            Tegn Chord-ringen med m=5, noder: 1, 5, 17, 19, 25. Marker nodene på ringen med klokkebevegelse fra 0.
          </p>
          <Answer>
            <p className="font-bold mb-2">Ringen (klokkebevegelse fra topp/0):</p>
            <div className="font-mono text-xs bg-neutral-900 text-green-300 rounded-lg p-3 mb-2">
              {`0 → 1 → 2 → 3 → 4 → 5 → 6 → ... → 16 → 17 → 18 → 19 → 20 → ... → 24 → 25 → ... → 31 → (tilbake til 0)`}
            </div>
            <p className="text-xs">Noder på posisjonene: 1, 5, 17, 19, 25. Mellom-posisjoner er tomme (ingen server der).</p>
            <p className="text-xs mt-1">Aksene: topp = 0, høyre = 8, bunn = 16, venstre = 24 (ca.).</p>
          </Answer>
        </div>

        {/* Oppgave P2 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="font-semibold mb-1">Oppgave P2 — Nøkkelansvar (replikerte filer)<ProfTag /></p>
          <p className="text-sm text-[var(--muted)] mb-3">
            2 filer er replikert. Finn hvilken node som er ansvarlig for hver nøkkel:
          </p>
          <ul className="text-sm list-disc list-inside text-[var(--muted)] mb-2 space-y-0.5">
            <li>k(fil1) = 1, k(fil1) = 23</li>
            <li>k(fil2) = 4, k(fil2) = 11, k(fil2) = 28, k(fil2) = 3</li>
          </ul>
          <Hint n={1}>Regel: succ(k) = minste node n der n ≥ k (sirkulært). Noder er: 1, 5, 17, 19, 25.</Hint>
          <Answer>
            <div className="space-y-1 font-mono text-xs">
              <p className="font-bold font-sans text-sm mb-1">Løsning (regel: k ≤ id, dvs. succ(k)):</p>
              <p>k=1:  succ(1) = <strong>1</strong> (node 1 eksisterer, 1 ≥ 1)</p>
              <p>k=23: succ(23) = <strong>25</strong> (neste node ≥ 23 er 25)</p>
              <p>k=4:  succ(4) = <strong>5</strong>  (neste node ≥ 4 er 5)</p>
              <p>k=11: succ(11) = <strong>17</strong> (neste node ≥ 11 er 17)</p>
              <p>k=28: succ(28) = <strong>1</strong>  (wrap-around! 28 &gt; 25, neste er 1)</p>
              <p>k=3:  succ(3) = <strong>5</strong>  (neste node ≥ 3 er 5)</p>
            </div>
            <div className="mt-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2 text-xs">
              <p className="font-bold">Oppsummert:</p>
              <p>fil1 lagres på noder 1 (kopi 1) og 25 (kopi 2)</p>
              <p>fil2 lagres på noder 5 (k=4), 17 (k=11), 1 (k=28), 5 (k=3) → noder 5 og 17 og 1</p>
            </div>
          </Answer>
        </div>

        {/* Oppgave P3 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="font-semibold mb-1">Oppgave P3 — Fingertabell for alle noder<ProfTag /></p>
          <p className="text-sm text-[var(--muted)] mb-3">
            Beregn fingertabellen for alle noder. m=5, adresserom 0–31.
          </p>
          <Hint n={1}>FT[i] = succ((n + 2^(i-1)) mod 32). Start med i=1: n+1, i=2: n+2, i=3: n+4, i=4: n+8, i=5: n+16.</Hint>
          <Hint n={2}>Node 17, i=5: 17+16=33. 33 mod 32 = 1. succ(1) = 1. Wrap-around!</Hint>
          <Answer>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
                <thead className="bg-blue-100 dark:bg-blue-900/30">
                  <tr>
                    <th className="px-2 py-2">Node</th>
                    <th className="px-2 py-2">i=1 (+1)</th>
                    <th className="px-2 py-2">i=2 (+2)</th>
                    <th className="px-2 py-2">i=3 (+4)</th>
                    <th className="px-2 py-2">i=4 (+8)</th>
                    <th className="px-2 py-2">i=5 (+16)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: 1,  steps: ["succ(2)=5","succ(3)=5","succ(5)=5","succ(9)=17","succ(17)=17"],  ft: [5,5,5,17,17] },
                    { n: 5,  steps: ["succ(6)=17","succ(7)=17","succ(9)=17","succ(13)=17","succ(21)=25"], ft: [17,17,17,17,25] },
                    { n: 17, steps: ["succ(18)=19","succ(19)=19","succ(21)=25","succ(25)=25","succ(1)=1"],  ft: [19,19,25,25,1] },
                    { n: 19, steps: ["succ(20)=25","succ(21)=25","succ(23)=25","succ(27)=1","succ(3)=5"],   ft: [25,25,25,1,5] },
                    { n: 25, steps: ["succ(26)=1","succ(27)=1","succ(29)=1","succ(1)=1","succ(9)=17"],     ft: [1,1,1,1,17] },
                  ].map(({ n, ft, steps }, si) => (
                    <tr key={n} className={si % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-blue-50/30 dark:bg-blue-900/10"}>
                      <td className="px-2 py-1.5 font-bold text-blue-700 dark:text-blue-400">{n}</td>
                      {ft.map((v, i) => (
                        <td key={i} className="px-2 py-1.5 text-center">
                          <span className="text-[var(--muted)] text-xs">{steps[i].split("=")[0]}=</span>
                          <span className="font-bold">{v}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs space-y-1 text-[var(--muted)]">
              <p><strong>Node 17, i=5:</strong> 17+16=33, 33 mod 32=1, succ(1)=1 ← wrap-around</p>
              <p><strong>Node 19, i=4:</strong> 19+8=27, succ(27)=1 (27 &gt; 25, neste er 1) ← wrap-around</p>
              <p><strong>Node 25, i=1..4:</strong> 26,27,29,33→1 — alle runder wrapper til node 1</p>
            </div>
          </Answer>
        </div>

        {/* Oppgave P4 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="font-semibold mb-1">Oppgave P4 — Oppslag k=23 fra node 1<ProfTag /><ExamTag label="Eksamenstypisk" /></p>
          <p className="text-sm text-[var(--muted)] mb-3">
            Bruk fingertabellen og oppslagsalgoritmen til å finne ansvarlig node for k=23, startende fra node 1.
            Vis ALLE runder.
          </p>
          <Hint n={1}>Start: sjekk om 1 {"<"} 23 ≤ succ(1)=5. Er 23 ≤ 5? Nei → bruk FT.</Hint>
          <Hint n={2}>FT_1 søkes baklengs: FT[5]=17. Er 1 {"<"} 17 {"<"} 23? Ja → hopp til 17.</Hint>
          <Answer>
            <div className="space-y-3">
              {[
                {
                  runde: "Runde 1 (n=1)",
                  check: "succ(1)=5. Er 1 < 23 ≤ 5? NEI (23 > 5).",
                  action: "Søk FT_1 baklengs (i=5 til 1):",
                  detail: "FT[5]=17: Er 1 < 17 < 23? JA! → hopp til 17",
                  final: false,
                },
                {
                  runde: "Runde 2 (n=17)",
                  check: "succ(17)=19. Er 17 < 23 ≤ 19? NEI (23 > 19).",
                  action: "Søk FT_17 baklengs:",
                  detail: "FT[5]=1: 17<1<23? nei (wrap). FT[4]=25: 17<25<23? nei (25>23). FT[3]=25: nei. FT[2]=19: Er 17 < 19 < 23? JA! → hopp til 19",
                  final: false,
                },
                {
                  runde: "Runde 3 (n=19)",
                  check: "succ(19)=25. Er 19 < 23 ≤ 25? JA! (23 er mellom 19 og 25)",
                  action: "Returnerer 25.",
                  detail: "SVAR: Server 25 er ansvarlig for nøkkel k=23.",
                  final: true,
                },
              ].map(({ runde, check, action, detail, final }) => (
                <div
                  key={runde}
                  className={`rounded-lg p-3 border ${
                    final
                      ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400"
                      : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"
                  }`}
                >
                  <p className={`font-bold text-sm mb-1 ${final ? "text-emerald-700 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>{runde}</p>
                  <p className="text-xs text-[var(--muted)]">{check}</p>
                  <p className="text-xs mt-0.5">{action}</p>
                  <p className={`text-xs font-bold mt-0.5 ${final ? "text-emerald-700 dark:text-emerald-400" : ""}`}>{detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">3 runder. O(log 5) ≈ 2.3, altså 3 hopp er forventet.</p>
          </Answer>
        </div>

        {/* Oppgave P5 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <p className="font-semibold mb-1">Oppgave P5 — Andre oppslag fra professorens øving<ProfTag /></p>
          <p className="text-sm text-[var(--muted)] mb-3">
            Løs følgende oppslag med fingertabellen fra P3:
          </p>
          <ul className="text-sm list-disc list-inside text-[var(--muted)] mb-2 space-y-0.5">
            <li>k=11 fra node 17</li>
            <li>k=28 fra node 25</li>
            <li>k=4 fra node 1</li>
          </ul>
          <Answer>
            <div className="space-y-4 text-xs">
              <div>
                <p className="font-bold text-sm mb-1">k=11 fra node 17:</p>
                <p>Runde 1 (n=17): succ=19. Er 17 {"<"} 11 ≤ 19? NEI (11 {"<"} 17, wrap-around: nei).</p>
                <p>FT_17 baklengs: FT[5]=1 (17{"<"}1{"<"}11? sirkulært: ja!) → hopp til 1.</p>
                <p>Runde 2 (n=1): succ=5. Er 1 {"<"} 11 ≤ 5? NEI.</p>
                <p>FT_1 baklengs: FT[4]=17 (1{"<"}17{"<"}11? NEI, 17{">"} 11). FT[3]=5 (1{"<"}5{"<"}11? JA!) → hopp til 5.</p>
                <p>Runde 3 (n=5): succ=17. Er 5 {"<"} 11 ≤ 17? JA! → <strong className="text-emerald-700 dark:text-emerald-400">SVAR: node 17</strong></p>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">k=28 fra node 25:</p>
                <p>Runde 1 (n=25): succ(25)=1 (sirkulært). Er 25 {"<"} 28 ≤ 1? (wrap-around: Er 28 {">"} 25 ELLER 28 ≤ 1? 28 {">"} 25 = JA!) → <strong className="text-emerald-700 dark:text-emerald-400">SVAR: node 1</strong></p>
                <p className="text-[var(--muted)]">1 runde. Nøkkel 28 tilhører node 1 fordi pred(1)=25 og 25 {"<"} 28 (sirkulært).</p>
              </div>
              <div>
                <p className="font-bold text-sm mb-1">k=4 fra node 1:</p>
                <p>Runde 1 (n=1): succ=5. Er 1 {"<"} 4 ≤ 5? JA! → <strong className="text-emerald-700 dark:text-emerald-400">SVAR: node 5</strong></p>
                <p className="text-[var(--muted)]">1 runde. Nøkkel 4 er rett i "skyggen" av succ(1)=5.</p>
              </div>
            </div>
          </Answer>
        </div>
      </div>

      {/* ── SEKSJON: Egenproduserte øvingsoppgaver ── */}
      <h2 className="text-xl font-bold mb-4 mt-10">Øvingsoppgaver — ulike vanskelighetsgrader</h2>

      <div className="space-y-5">
        {/* Oppgave E1 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700">Enkel</span>
            <p className="font-semibold">Oppgave E1 — Fingertabell m=4</p>
          </div>
          <p className="text-sm text-[var(--muted)] mb-3">
            Chord-ring: m=4 bits, noder: 1, 6, 11, 15. Adresserom: 0–15 (2^4=16).
            Bygg fingertabellen for node 6.
          </p>
          <Hint n={1}>FT[i] = succ((6 + 2^(i-1)) mod 16). i=1: 6+1=7, i=2: 6+2=8, i=3: 6+4=10, i=4: 6+8=14.</Hint>
          <Answer>
            <div className="font-mono text-xs space-y-1">
              <p>i=1: succ(6+1=7) = succ(7) = <strong>11</strong> (neste ≥ 7 er 11)</p>
              <p>i=2: succ(6+2=8) = succ(8) = <strong>11</strong></p>
              <p>i=3: succ(6+4=10) = succ(10) = <strong>11</strong></p>
              <p>i=4: succ(6+8=14) = succ(14) = <strong>15</strong></p>
            </div>
            <p className="font-bold mt-2 font-mono">FT_6 = [11, 11, 11, 15]</p>
          </Answer>
        </div>

        {/* Oppgave E2 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-700">Medium</span>
            <p className="font-semibold">Oppgave E2 — Nøkkelansvar m=5<ExamTag label="Eksamenstypisk" /></p>
          </div>
          <p className="text-sm text-[var(--muted)] mb-3">
            Chord-ring: m=5 bits, noder: 3, 12, 21, 31. Adresserom: 0–31.
            Hvilken node er ansvarlig for nøklene 0, 4, 13, 22, 31?
          </p>
          <Hint n={1}>Finn succ(k) = minste node n der n ≥ k, sirkulært. pred(3)=31.</Hint>
          <Answer>
            <div className="font-mono text-xs space-y-1">
              <p>k=0:  succ(0) = <strong>3</strong>  (31 {"<"} 0 ≤ 3 sirkulært)</p>
              <p>k=4:  succ(4) = <strong>12</strong> (3 {"<"} 4 ≤ 12)</p>
              <p>k=13: succ(13) = <strong>21</strong> (12 {"<"} 13 ≤ 21)</p>
              <p>k=22: succ(22) = <strong>31</strong> (21 {"<"} 22 ≤ 31)</p>
              <p>k=31: succ(31) = <strong>31</strong> (noden eksisterer eksakt)</p>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">Merk: k=0 tilhører node 3 pga. wrap-around. pred(3)=31, og 31 {"<"} 0 er sant sirkulært (0,1,2,3 alle tilhører 3).</p>
          </Answer>
        </div>

        {/* Oppgave E3 */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700">Vanskelig</span>
            <p className="font-semibold">Oppgave E3 — Fullt oppslag m=5<ExamTag label="Eksamenstypisk" /></p>
          </div>
          <p className="text-sm text-[var(--muted)] mb-3">
            Chord-ring: m=5 bits, noder: 3, 12, 21, 31. Adresserom: 0–31.
            Utfør oppslag k=15 fra node 3. Vis alle runder.
          </p>
          <Hint n={1}>Bygg først FT_3: i=1:succ(4)=12, i=2:succ(5)=12, i=3:succ(7)=12, i=4:succ(11)=12, i=5:succ(19)=21.</Hint>
          <Hint n={2}>Runde 1: succ(3)=12. Er 3 {"<"} 15 ≤ 12? NEI. Søk FT_3 baklengs: FT[5]=21 (3{"<"}21{"<"}15? nei). FT[4]=12 (3{"<"}12{"<"}15? JA!) → hopp til 12.</Hint>
          <Answer>
            <div className="text-xs font-mono space-y-1 mb-3">
              <p className="font-sans font-bold">FT_3: [12, 12, 12, 12, 21]</p>
              <p>i=1: succ(4)=12, i=2: succ(5)=12, i=3: succ(7)=12, i=4: succ(11)=12, i=5: succ(19)=21</p>
            </div>
            <div className="space-y-2">
              {[
                { runde: "Runde 1 (n=3)", txt: "succ(3)=12. Er 3 < 15 ≤ 12? NEI. FT baklengs: FT[5]=21 (3<21<15? nei). FT[4]=12 (3<12<15? JA!) → hopp til 12.", final: false },
                { runde: "Runde 2 (n=12)", txt: "succ(12)=21. Er 12 < 15 ≤ 21? JA! → SVAR: node 21 er ansvarlig for k=15.", final: true },
              ].map(({ runde, txt, final }) => (
                <div key={runde} className={`rounded-lg p-2.5 border text-xs ${final ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400" : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"}`}>
                  <p className={`font-bold mb-0.5 ${final ? "text-emerald-700 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>{runde}</p>
                  <p>{txt}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">2 runder. O(log 4) ≈ 2 hopp — nøyaktig som forventet.</p>
          </Answer>
        </div>

        {/* Oppgave E4 — Wrap-around */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700">Avansert</span>
            <p className="font-semibold">Oppgave E4 — Wrap-around-oppslag<ExamTag label="Eksamenstypisk" /></p>
          </div>
          <p className="text-sm text-[var(--muted)] mb-3">
            Chord-ring: m=5 bits, noder: 1, 5, 17, 19, 25. Utfør oppslag k=26 fra node 1 (k er mellom 25 og 0 — wrap-around!). Vis alle runder med fingertabellen fra P3.
          </p>
          <Hint n={1}>FT_1 = [5,5,5,17,17]. succ(1)=5. Er 1 {"<"} 26 ≤ 5? nei. Søk FT baklengs.</Hint>
          <Hint n={2}>FT[5]=17. Er 1 {"<"} 17 {"<"} 26? JA → hopp til 17.</Hint>
          <Answer>
            <div className="space-y-2 text-xs">
              {[
                { runde: "Runde 1 (n=1)", txt: "FT_1=[5,5,5,17,17]. succ=5. 1<26≤5? NEI. FT[5]=17: 1<17<26? JA → hopp til 17.", final: false },
                { runde: "Runde 2 (n=17)", txt: "FT_17=[19,19,25,25,1]. succ=19. 17<26≤19? NEI. FT[5]=1: 17<1<26? sirkulært: JA! (wrap) → hopp til 25 (neste etter 1 er ikke riktig; faktisk FT[4]=25: 17<25<26? JA!) → hopp til 25.", final: false },
                { runde: "Runde 3 (n=25)", txt: "FT_25=[1,1,1,1,17]. succ(25)=1 (sirkulært). Er 25<26≤1? (wrap: 26>25 JA!) → SVAR: node 1 er ansvarlig for k=26.", final: true },
              ].map(({ runde, txt, final }) => (
                <div key={runde} className={`rounded-lg p-2.5 border ${final ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400" : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"}`}>
                  <p className={`font-bold mb-0.5 ${final ? "text-emerald-700 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>{runde}</p>
                  <p>{txt}</p>
                </div>
              ))}
            </div>
          </Answer>
        </div>
      </div>

      {/* ── SEKSJON: DNS-oppgaver ── */}
      <h2 className="text-xl font-bold mb-4 mt-10">DNS og navngiving — begrepsspørsmål</h2>

      <div className="space-y-4">
        {[
          {
            q: "Hva er de tre kravene til en sann identifikator?",
            a: "(1) Refererer til maks én entitet. (2) Hver entitet har maks én identifikator. (3) Refererer alltid til samme entitet — aldri gjenbrukt. Eksempel: personnummer er en sann ID. IP-adresser er IKKE sanne IDer (kan tildeles på nytt).",
          },
          {
            q: "Forklar forskjellen mellom iterativ og rekursiv DNS-oppslag.",
            a: "Iterativ: den lokale navneserveren gjør alle spørsmål selv — spør Root, får svar, spør TLD, får svar, osv. Klienten venter på ett svar. Rekursiv: Root-serveren spør TLD som spør auth-server, svaret propageres tilbake. Problemet med rekursiv: Root-serverne må håndtere mye belastning.",
          },
          {
            q: "Hva er DNS TTL, og hvorfor er det viktig?",
            a: "Time-To-Live: angir hvor lenge en DNS-post kan caches (sekunder). Lav TTL = raskere propagasjon av endringer, men mer traffik. Høy TTL = bedre ytelse (cachetreff), men tregere å oppdatere. Root/TLD-poster har lang TTL (86400s). Dynamiske tjenester bruker kort TTL.",
          },
          {
            q: "Hva er forskjellen mellom flat, strukturert og attributtbasert navngiving?",
            a: "Flat: ID uten mening, ingen struktur (MAC-adresser). Krever spesiell mekanisme for å finne. Strukturert: hierarkisk, menneskelig lesbar (DNS, filstier). Lokasjons-uavhengig. Attributtbasert: søk basert på egenskaper (LDAP). Mest fleksibelt, men tyngst å implementere.",
          },
          {
            q: "Hvorfor er replikering i Chord viktig? Nevn 4 grunner.",
            a: "(1) Feiltoleranse: hvis en node krasjer, er dataene fortsatt tilgjengelig hos replikaene. (2) Høy tilgjengelighet: data alltid tilgjengelig selv under nettverkspartisjoner. (3) Skalerbarhet: replikaer kan betjene forespørsler parallelt. (4) Ytelse: klienter kan hente fra nærmeste replika.",
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
            <p className="font-semibold text-sm mb-2">Spørsmål {i + 1}: {q}</p>
            <Answer><p>{a}</p></Answer>
          </div>
        ))}
      </div>
    </div>
  );
}
