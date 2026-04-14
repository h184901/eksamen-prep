"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return !show ? (
    <button onClick={() => setShow(true)} className="text-xs px-3 py-1 rounded-full border border-network-400/50 text-network-600 dark:text-network-400 hover:bg-network-50 dark:hover:bg-network-900/20 mt-2">
      Vis losning
    </button>
  ) : (
    <div className="rounded-lg bg-network-50 dark:bg-network-900/20 border border-network-200 dark:border-network-800/40 p-4 text-sm mt-3 space-y-2">{children}</div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return !show ? (
    <button onClick={() => setShow(true)} className="text-xs px-3 py-1 rounded-full border border-amber-400/50 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 mt-2 mr-2">
      Hint
    </button>
  ) : (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-3 py-2 text-sm mt-2 text-amber-800 dark:text-amber-300">{children}</div>
  );
}

function ExerciseCard({ num, title, difficulty, children }: { num: number; title: string; difficulty: "lett" | "middels" | "vanskelig"; children: React.ReactNode }) {
  const diffColor = { lett: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", middels: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", vanskelig: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 my-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-bold text-network-600 dark:text-network-400">Oppgave {num}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diffColor[difficulty]}`}>{difficulty}</span>
        <span className="text-xs text-[var(--muted)]">{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function CN1OppgaverPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Oppgaver: Nettverksmetrikker</h2>
      <p className="text-[var(--muted)] max-w-2xl">
        Forsinkelsesberegning er oppgave 3 pa ALLE eksamener. Ov til du kan gjore det
        i sovne. Oppgavene er sortert etter vanskelighetsgrad.
      </p>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
        <h3 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-2">Oppgavestrategi</h3>
        <ol className="text-sm space-y-1 text-amber-900 dark:text-amber-200 list-decimal list-inside">
          <li>Les oppgaven noyaktig. List opp alle gitte verdier med riktig enhet.</li>
          <li>Identifiser hva du skal finne (total forsinkelse? gjennomstromning? tid for N pakker?).</li>
          <li>Tegn topologien: host — ruter — ruter — host.</li>
          <li>Beregn d_trans = L/R og d_prop = d/s for HVER link.</li>
          <li>Legg sammen. Husk d_proc og d_queue hvis oppgitt.</li>
          <li>Skriv svar med riktig enhet (s, ms, us).</li>
        </ol>
      </div>

      {/* PROFESSOR'S EXERCISES */}
      <h3 className="text-lg font-bold mt-8">Fra professorens oving (L2 Metrics)</h3>

      <ExerciseCard num={1} title="Grunnleggende forsinkelse" difficulty="lett">
        <p className="text-sm text-[var(--muted)] mb-3">
          En pakke pA L = 1000 bits sendes over en link med kapasitet R = 10^6 bits/s.
          Avstanden er d = 10 000 m og signalhastigheten er s = 5 x 10^8 m/s.
          Behandlingsforsinkelse d_proc = 0.002 s, koforsinkelse d_queue = 0.01 s.
          Beregn total nodalforsinkelse.
        </p>
        <Hint>Bruk d_trans = L/R og d_prop = d/s, deretter summer alle fire.</Hint>
        <Answer>
          <p><strong>Gitt:</strong> L = 1000 bits, R = 10^6 bps, d = 10 000 m, s = 5x10^8 m/s</p>
          <p className="font-mono mt-1">d_trans = L/R = 1000 / 10^6 = 0.001 s = 1 ms</p>
          <p className="font-mono">d_prop = d/s = 10 000 / (5x10^8) = 0.00002 s = 0.02 ms</p>
          <p className="font-mono">d_nodal = 0.002 + 0.01 + 0.001 + 0.00002</p>
          <p className="font-mono font-bold">d_nodal = 0.01302 s = 13.02 ms</p>
        </Answer>
      </ExerciseCard>

      <ExerciseCard num={2} title="Ende-til-ende med flere hopp" difficulty="middels">
        <p className="text-sm text-[var(--muted)] mb-3">
          H1 sender til H2 via 3 rutere (dvs. 4 linker). Alle linker: R = 100 Mbps,
          d = 5 km, s = 2 x 10^8 m/s. Pakkelengde L = 1500 bytes.
          Ignorer behandlings- og koforsinkelse.
          Hva er total ende-til-ende forsinkelse?
        </p>
        <Hint>Husk: 1 byte = 8 bits. 4 linker betyr 4 x (d_trans + d_prop).</Hint>
        <Answer>
          <p><strong>Konvertering:</strong> L = 1500 * 8 = 12 000 bits</p>
          <p className="font-mono mt-1">d_trans = 12 000 / 10^8 = 0.00012 s = 0.12 ms</p>
          <p className="font-mono">d_prop = 5000 / (2x10^8) = 0.000025 s = 0.025 ms</p>
          <p className="font-mono">d_per_link = 0.12 + 0.025 = 0.145 ms</p>
          <p className="font-mono font-bold">d_e2e = 4 x 0.145 = 0.58 ms</p>
          <p className="text-[var(--muted)] mt-1">Merk: med store-and-forward ville det vart annerledes for flere pakker.</p>
        </Answer>
      </ExerciseCard>

      <ExerciseCard num={3} title="Trafikkintensitet" difficulty="lett">
        <p className="text-sm text-[var(--muted)] mb-3">
          En ruter har en utgangslink med R = 2 Mbps. Pakker ankommer med rate a = 100 pakker/s,
          og gjennomsnittlig pakkelengde er L = 10 000 bits.
          a) Beregn trafikkintensiteten.
          b) Hva skjer med koforsinkelsen?
        </p>
        <Answer>
          <p className="font-mono">a) I = La/R = (10000 * 100) / (2x10^6) = 1 000 000 / 2 000 000 = 0.5</p>
          <p className="mt-2">b) I = 0.5 betyr moderat belastning. Koforsinkelsen er merkbar men
          ikke kritisk. Forsinkelsen oker ikke-lineert — nAr I narmer seg 1.0 eksploderer den.</p>
        </Answer>
      </ExerciseCard>

      {/* EXAM-STYLE EXERCISES */}
      <h3 className="text-lg font-bold mt-8">Eksamensoppgaver</h3>

      <ExerciseCard num={4} title="Eksamen 2025 - Oppg 3 (forenklet)" difficulty="middels">
        <p className="text-sm text-[var(--muted)] mb-3">
          Host A sender en pakke pA 1000 bytes til Host B via to rutere (3 linker).
          Link 1: R = 10 Mbps, d = 100 km. Link 2: R = 5 Mbps, d = 200 km.
          Link 3: R = 10 Mbps, d = 50 km. s = 2 x 10^8 m/s for alle.
          d_proc = 1 ms per ruter. Ignorer koforsinkelse.
          a) Beregn total ende-til-ende forsinkelse.
          b) Hva er gjennomstromningen?
        </p>
        <Hint>Husk: ulike R-verdier pa hver link! Gjennomstromning = min(alle R).</Hint>
        <Answer>
          <p><strong>L = 1000 * 8 = 8000 bits</strong></p>
          <p className="font-mono mt-1">Link 1: d_trans = 8000/(10x10^6) = 0.0008 s, d_prop = 100000/(2x10^8) = 0.0005 s</p>
          <p className="font-mono">Link 2: d_trans = 8000/(5x10^6) = 0.0016 s, d_prop = 200000/(2x10^8) = 0.001 s</p>
          <p className="font-mono">Link 3: d_trans = 8000/(10x10^6) = 0.0008 s, d_prop = 50000/(2x10^8) = 0.00025 s</p>
          <p className="font-mono mt-1">Sum d_trans = 0.0008 + 0.0016 + 0.0008 = 0.0032 s</p>
          <p className="font-mono">Sum d_prop = 0.0005 + 0.001 + 0.00025 = 0.00175 s</p>
          <p className="font-mono">Sum d_proc = 2 * 0.001 = 0.002 s (2 rutere)</p>
          <p className="font-mono font-bold">d_e2e = 0.0032 + 0.00175 + 0.002 = 0.00695 s = 6.95 ms</p>
          <p className="font-mono mt-2 font-bold">b) Gjennomstromning = min(10, 5, 10) = 5 Mbps</p>
        </Answer>
      </ExerciseCard>

      <ExerciseCard num={5} title="Store-and-forward med flere pakker" difficulty="vanskelig">
        <p className="text-sm text-[var(--muted)] mb-3">
          En fil pA 10 000 bits sendes som 5 pakker (hver 2000 bits) over 2 linker via
          en ruter. Begge linker: R = 1 Mbps. Ignorer forplantning, prosessering og ko.
          Nar er siste bit av siste pakke levert hos mottaker?
        </p>
        <Hint>Forste pakke: 2 x L/R (store-and-forward over 2 linker). Neste pakker overlappes (pipelining).</Hint>
        <Answer>
          <p><strong>d_trans per pakke per link = 2000 / 10^6 = 0.002 s = 2 ms</strong></p>
          <p className="mt-1">Med store-and-forward og pipelining:</p>
          <p className="font-mono">Pakke 1 levert: 2 * 2 ms = 4 ms (to linker)</p>
          <p className="font-mono">Pakke 2 levert: 4 + 2 = 6 ms (overlapper med pakke 1 pa link 2)</p>
          <p className="font-mono">Pakke 3 levert: 6 + 2 = 8 ms</p>
          <p className="font-mono">Pakke 4 levert: 8 + 2 = 10 ms</p>
          <p className="font-mono font-bold">Pakke 5 levert: 10 + 2 = 12 ms</p>
          <p className="text-[var(--muted)] mt-2">Generelt for P pakker over N linker: d = (N + P - 1) * L/R = (2+5-1) * 2 = 12 ms</p>
        </Answer>
      </ExerciseCard>

      <ExerciseCard num={6} title="Gjennomstromning med delt kjernelink" difficulty="middels">
        <p className="text-sm text-[var(--muted)] mb-3">
          4 klienter laster ned fra 4 servere. Hver klient har aksesslink R_c = 10 Mbps.
          Hver server har aksesslink R_s = 20 Mbps. Alle data gar gjennom en felles
          kjernelink med R_core = 30 Mbps.
          Hva er gjennomstromningen per tilkobling?
        </p>
        <Answer>
          <p>Kjernelinken deles: R_core/4 = 30/4 = 7.5 Mbps per tilkobling.</p>
          <p className="mt-1">Per tilkobling: min(R_c, R_s, R_core/4) = min(10, 20, 7.5)</p>
          <p className="font-mono font-bold">Gjennomstromning = 7.5 Mbps per tilkobling</p>
          <p className="text-[var(--muted)] mt-1">Kjernelinken er flaskehalsen.</p>
        </Answer>
      </ExerciseCard>

      <ExerciseCard num={7} title="Pakkeswitching vs kretsswitching" difficulty="lett">
        <p className="text-sm text-[var(--muted)] mb-3">
          En link har kapasitet 1 Mbps. Hver bruker bruker 200 kbps nar aktiv, og er
          aktiv 20% av tiden.
          a) Hvor mange brukere stotter kretsswitching?
          b) Med 8 brukere og pakkeswitching — hva er sannsynligheten for at mer enn
          5 brukere er aktive samtidig? (Binomisk: P(X &gt; 5) med n=8, p=0.2)
        </p>
        <Answer>
          <p className="font-mono">a) Kretsswitching: 1 000 000 / 200 000 = 5 brukere</p>
          <p className="mt-2">b) P(X &gt; 5) = P(6) + P(7) + P(8)</p>
          <p className="font-mono">P(X=k) = C(8,k) * 0.2^k * 0.8^(8-k)</p>
          <p className="font-mono">P(6) = 28 * 0.000064 * 0.04 = 0.0000717</p>
          <p className="font-mono">P(7) = 8 * 0.0000128 * 0.2 = 0.0000205</p>
          <p className="font-mono">P(8) = 1 * 0.00000256 * 1 = 0.00000256</p>
          <p className="font-mono font-bold">P(X &gt; 5) = 0.0000948 ≈ 0.01%</p>
          <p className="text-[var(--muted)] mt-1">Ekstremt lav sannsynlighet — pakkeswitching stotter 8 vs 5 brukere!</p>
        </Answer>
      </ExerciseCard>
    </div>
  );
}
