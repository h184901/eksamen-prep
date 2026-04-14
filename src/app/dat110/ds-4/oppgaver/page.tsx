"use client";

import { useState } from "react";

type OppgaveId = string;

export default function DS4OppgaverPage() {
  const [visLosning, setVisLosning] = useState<Set<OppgaveId>>(new Set());
  const [visHint, setVisHint] = useState<Set<string>>(new Set());

  const toggleLosning = (id: OppgaveId) => {
    setVisLosning((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleHint = (id: string) => {
    setVisHint((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Oppgåver — DS-4: Kommunikasjon</h1>
      <p className="text-[var(--muted)] mb-6 text-sm">
        Professorens øvingsoppgåver, eksamensliknande oppgåver og sjølvgenererte oppgåver med fullstendige løysingar.
      </p>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 border-b border-[var(--card-border)] pb-2">Del 1: RPC-feilscenarier</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 1.1 — RPC-feilklassar (medium)</h3>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">Medium</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)] mb-2">
              Ein klient kallar ein fjernprosedyre <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">transferMoney(from, to, amount)</code> via RPC.
              For kvart av dei fem scenarioa: identifiser feilklasse, forklar kva klienten veit, og kva handlingsalternativ klienten har.
            </p>
            <ol className="text-sm text-[var(--muted)] space-y-2 list-decimal list-inside">
              <li>Klienten sender forespørselen, men får aldri svar. Serveren er oppe.</li>
              <li>Klienten sender forespørselen, serveren krasjar under utføring av overføringa.</li>
              <li>Serveren utfører overføringa og sender svar, men pakken tapt i nettverket.</li>
              <li>Klienten krasjar medan han ventar på svar frå serveren.</li>
              <li>Klienten prøvar å kople til serveren, men nameserveren returnerer feil.</li>
            </ol>
          </div>
          <button onClick={() => toggleHint("1.1")} className="text-xs text-blue-600 dark:text-blue-400 underline mb-2 block">
            {visHint.has("1.1") ? "Skjul hint" : "Vis hint"}
          </button>
          {visHint.has("1.1") && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 p-3 mb-3 text-xs text-[var(--muted)]">
              Husk dei 5 feilklassane: (1) finn ikkje server, (2) tapt forespørsel, (3) server krasjar, (4) tapt svar, (5) klienten krasjar.
            </div>
          )}
          <button
            onClick={() => toggleLosning("1.1")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("1.1") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("1.1") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("1.1") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Løysing:</h4>
              <div className="space-y-3 text-sm text-[var(--muted)]">
                <div><strong className="text-[var(--foreground)]">1. Feilklasse 2 — Tapt forespørsel:</strong> Klienten veit at forespørselen ikkje nådde fram (timeout). Klienten kan prøve igjen utan risiko for dobbel utføring — serveren fekk aldri kallet.</div>
                <div><strong className="text-[var(--foreground)]">2. Feilklasse 3 — Server krasjar:</strong> Klienten veit IKKJE om overføringa vart fullført. Sende på nytt risikerer dobbel overføring. Banken treng idempotente kall med sekvensnummer for at-most-once semantikk.</div>
                <div><strong className="text-[var(--foreground)]">3. Feilklasse 4 — Tapt svar:</strong> Overføringa er UTFØRT. Klienten kan ikkje skilje dette frå feilklasse 3. Idempotente kall med sekvensnummer er løysinga.</div>
                <div><strong className="text-[var(--foreground)]">4. Feilklasse 5 — Klienten krasjar:</strong> Serveren arbeider for ein klient som ikkje lenger eksisterer (orphan). Løysingar: extermination, reincarnation, expiration.</div>
                <div><strong className="text-[var(--foreground)]">5. Feilklasse 1 — Finn ikkje server:</strong> Klienten mottek ein exception frå stub-koden. Ingen kall er gjort. Klienten kan prøve igjen seinare.</div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 1.2 — Synkron vs. asynkron RPC (frå forelesing)</h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Frå professor</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)] mb-2">Prosessane A, B, C kommuniserer via synkron RPC. A og C er klientar, B er server.</p>
            <div className="flex items-center justify-center gap-6 py-2">
              <div className="rounded-lg bg-blue-200 dark:bg-blue-800 px-4 py-3 text-center font-bold">A</div>
              <div className="flex flex-col items-center gap-1 text-xs font-mono"><span>request →</span><span>← reply</span></div>
              <div className="rounded-lg bg-green-200 dark:bg-green-800 px-4 py-3 text-center font-bold">B</div>
              <div className="flex flex-col items-center gap-1 text-xs font-mono"><span>← request</span><span>reply →</span></div>
              <div className="rounded-lg bg-blue-200 dark:bg-blue-800 px-4 py-3 text-center font-bold">C</div>
            </div>
            <div className="mt-3 text-sm text-[var(--muted)] space-y-1">
              <p><strong>a)</strong> Forklar korleis prosess B kan endrast til ein asynkron RPC-server.</p>
              <p><strong>b)</strong> Forklar korleis prosess A eller C kan endrast til ein asynkron RPC-klient.</p>
            </div>
          </div>
          <button
            onClick={() => toggleLosning("1.2")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("1.2") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("1.2") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("1.2") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm text-[var(--muted)]">
              <p className="mb-2"><strong className="text-[var(--foreground)]">a) Asynkron server (B):</strong> B sender ein umiddelbar ACK/aksept tilbake til klienten rett etter at forespørselen er motteke, utan å vente til prosedyren er utført. Serveren utfører prosedyren i bakgrunnen og returnerer resultatet seinare via eit callback (one-way RPC) til klienten.</p>
              <p><strong className="text-[var(--foreground)]">b) Asynkron klient (A/C):</strong> A (eller C) held fram med eige arbeid etter å ha motteke akseptet frå serveren, utan å blokkere for fullstendig resultat. For deferred synchronous RPC trengst ein eigen tråd som lyttar etter callback frå serveren.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 border-b border-[var(--card-border)] pb-2">Del 2: MQTT og QoS</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 2.1 — MQTT QoS-val (medium)</h3>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">Medium</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)] mb-2">Vel riktig MQTT QoS-nivå for kvart tilfelle og grunngi svaret:</p>
            <ol className="text-sm text-[var(--muted)] space-y-1 list-decimal list-inside">
              <li>Temperatursensor i eit kontorbygg som publiserer kvar 5. sekund.</li>
              <li>Alarmsystem som skal utløyse brannsirene nøyaktig éin gong.</li>
              <li>Dørsensar som rapporterer open/lukka-tilstand til eit sikkerheitssystem.</li>
              <li>Live-straum av akselerometer-data frå eit smartarmbånd (60 Hz).</li>
            </ol>
          </div>
          <button
            onClick={() => toggleLosning("2.1")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("2.1") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("2.1") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("2.1") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm text-[var(--muted)]">
              <div className="space-y-2">
                <p><strong className="text-[var(--foreground)]">1. QoS 0:</strong> Data kjem inn regelmessig. Tap av enkeltmålingar er ok. Minimal overhead.</p>
                <p><strong className="text-[var(--foreground)]">2. QoS 2:</strong> Brannsirenen MÅ aktiverast nøyaktig éin gong. Dobbel aktivering er farleg. Exactly-once er påkravd.</p>
                <p><strong className="text-[var(--foreground)]">3. QoS 1:</strong> Tilstandsendringar MÅ leverast. Duplikat er ok — applikasjonen forkastas dei via message-ID.</p>
                <p><strong className="text-[var(--foreground)]">4. QoS 0:</strong> 60 Hz er svært høg frekvens. QoS 2 ville gi enorm overhead. Tap av enkeltpunkt akseptabelt.</p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 2.2 — MQTT vs RPC (medium)</h3>
            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded">Medium</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)]">Forklar to hovudsveikheiter ved RPC som gjer MQTT/MOM meir eigna for visse applikasjonar. Gje eit konkret eksempel på ein applikasjon der MQTT er klart betre enn RPC.</p>
          </div>
          <button
            onClick={() => toggleLosning("2.2")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("2.2") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("2.2") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("2.2") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm text-[var(--muted)]">
              <p className="mb-2"><strong className="text-[var(--foreground)]">Sveikheit 1 — Tett kopla i tid:</strong> Begge partar i RPC MÅ vere aktive samstundes. MQTT sin broker lagrar meldingar persistente til mottakaren kjem online igjen.</p>
              <p className="mb-2"><strong className="text-[var(--foreground)]">Sveikheit 2 — Blokkering:</strong> Synkron RPC blokkerer klienten. MQTT er fullstendig asynkron.</p>
              <p><strong className="text-[var(--foreground)]">Eksempel:</strong> Smarthus med 200 sensorar. Med RPC måtte ein kalle kvar sensor separat. Med MQTT publiserer sensorar til broker og applikasjonen abonnerer — fullstendig laust kopla.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 border-b border-[var(--card-border)] pb-2">Del 3: RDP og ALM-kostnadar</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 3.1 — ALM-kostnadar (frå professorens øvingsoppgåve)</h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Frå professor</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)] mb-2">Gitt overlay-nettverket med endepunkt A, B, C, D, E og ruter Ra, Rb, Rc, Rd, Re:</p>
            <div className="font-mono text-xs bg-white dark:bg-gray-900 rounded p-3 mb-3">
              A(1)-Ra, Ra(7)-Rb, Rb(1)-B, Ra(30)-Re, Re(20)-Rc, Re(1)-E, Rc(5)-Rd, Rc(1)-C, Rd(1)-D, Rb(40)-Rd
            </div>
            <div className="text-sm text-[var(--muted)] space-y-1">
              <p><strong>a)</strong> Kva er link stress for ei melding frå A til D?</p>
              <p><strong>b)</strong> Kva er RDP for ruta frå B til C?</p>
              <p><strong>c)</strong> Kva betyr RDP = 2.0?</p>
            </div>
          </div>
          <button
            onClick={() => toggleLosning("3.1")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("3.1") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("3.1") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("3.1") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
              <div className="space-y-3 text-[var(--muted)]">
                <div>
                  <strong className="text-[var(--foreground)]">a) Link stress (A til D):</strong>
                  <div className="font-mono text-xs bg-white dark:bg-gray-900 rounded p-2 mt-1">⟨Ra,Rb⟩ = 2, ⟨Ra,Re⟩ = 1, ⟨Re,Rc⟩ = 1, ⟨Rc,Rd⟩ = 1</div>
                </div>
                <div>
                  <strong className="text-[var(--foreground)]">b) RDP (B til C):</strong>
                  <div className="font-mono text-xs bg-white dark:bg-gray-900 rounded p-2 mt-1">
                    Overlay: B→Rb→Ra→Re→E→Re→Rc→Rd→D→Rd→Rc→C = 1+7+30+1+1+20+5+1+1+5+1 = 73{"\n"}
                    Nett: B→Rb→Rd→Rc→C = 1+40+5+1 = 47{"\n"}
                    RDP = 73/47 ≈ 1.55
                  </div>
                </div>
                <div><strong className="text-[var(--foreground)]">c) RDP = 2.0:</strong> Overlay-stigen er dobbelt så lang som den beste fysiske nettverksstigen.</div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 3.2 — Tree Cost og MST (vanskleg)</h3>
            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">Vanskleg</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)] mb-2">5 prosessar A-E, overlay-forsinkelsar: A-B=9, A-E=32, A-C=52, A-D=47, B-E=39, B-C=62, B-D=37, E-C=22, E-D=27, C-D=7</p>
            <div className="text-sm text-[var(--muted)] space-y-1">
              <p><strong>a)</strong> Tree cost for: A-B(9), B-E(39), E-D(27), D-C(7)</p>
              <p><strong>b)</strong> Tree cost for: A-B(9), A-E(32), E-C(22), C-D(7)</p>
              <p><strong>c)</strong> Er b) eit minimum spanntre? Kvifor?</p>
            </div>
          </div>
          <button
            onClick={() => toggleLosning("3.2")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("3.2") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("3.2") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("3.2") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm text-[var(--muted)]">
              <p><strong className="text-[var(--foreground)]">a)</strong> 9+39+27+7 = <strong>82</strong></p>
              <p><strong className="text-[var(--foreground)]">b)</strong> 9+32+22+7 = <strong>70</strong></p>
              <p><strong className="text-[var(--foreground)]">c)</strong> Ja. Kruskal: C-D(7), A-B(9), E-C(22), A-E(32) → totalt 70. Ingen lågare kostnad er mogleg.</p>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 3.3 — Flooding-meldingstal (frå øvingsoppgåve)</h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Frå professor</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <div className="text-sm text-[var(--muted)] space-y-2">
              <p><strong>1.</strong> P2P overlay med 100 000 noder, p=0.2. Kva er anslått antal meldingar?</p>
              <p><strong>2.</strong> Tre og fullt kopla mesh med 500 noder kvar. Totalt antal meldingar med flooding?</p>
            </div>
          </div>
          <button
            onClick={() => toggleLosning("3.3")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("3.3") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("3.3") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("3.3") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
              <div className="space-y-3 text-[var(--muted)] font-mono text-xs">
                <p><strong className="font-sans text-[var(--foreground)]">1.</strong> M = ½ · 100000 · 99999 · 0.2 ≈ 999 990 000 ≈ ~10⁹ meldingar</p>
                <p><strong className="font-sans text-[var(--foreground)]">2.</strong> Tre: N-1 = 499 | Mesh: ½·500·499 = 124 750 | Totalt: 125 249 meldingar</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 border-b border-[var(--card-border)] pb-2">Del 4: Gossip / Anti-entropy</h2>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-base">Oppgåve 4.1 — Anti-entropy rekneoppgåve (frå øvingsoppgåve)</h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">Frå professor</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-[var(--muted)] mb-2">1000 replikerte noder. Runde i: Infiserte=400, Mottakelege=600, Fjerna=0.</p>
            <p className="text-sm text-[var(--muted)]">Berekn sannsynet for at ein mottakeleg node forblir mottakeleg i runde i+1 for Pull, Push og Push-pull. Kva modell vel du?</p>
          </div>
          <button onClick={() => toggleHint("4.1")} className="text-xs text-blue-600 dark:text-blue-400 underline mb-2 block">
            {visHint.has("4.1") ? "Skjul hint" : "Vis hint"}
          </button>
          {visHint.has("4.1") && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 p-3 mb-3 text-xs text-[var(--muted)]">
              p_i = 400/1000 = 0.4, n = 1000. Pull: (p_i)². Push: p_i·(1-1/n)^(n(1-p_i)). Push-pull = push×pull.
            </div>
          )}
          <button
            onClick={() => toggleLosning("4.1")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visLosning.has("4.1") ? "bg-green-600 text-white" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-green-50 dark:hover:bg-green-950/20"}`}
          >
            {visLosning.has("4.1") ? "Skjul løysing" : "Vis løysing"}
          </button>
          {visLosning.has("4.1") && (
            <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 text-sm">
              <div className="font-mono text-xs bg-white dark:bg-gray-900 rounded p-3 mb-3 space-y-1 text-[var(--muted)]">
                <p>p_i = 0.4, n = 1000</p>
                <p>Pull: p_(i+1) = (0.4)² = 0.16 → 16% forblir mottakelege</p>
                <p>Push: p_(i+1) = 0.4·(0.999)^600 ≈ 0.4·0.549 ≈ 0.22 → 22%</p>
                <p>Push-pull: 0.22 · 0.16 = 0.035 → berre 3.5%!</p>
              </div>
              <p className="text-sm text-[var(--muted)]"><strong className="text-[var(--foreground)]">Val: Push-pull.</strong> Klart best — berre 3.5% forblir utan oppdatering. Kombinerer styrkar frå begge.</p>
            </div>
          )}
        </div>
      </section>

      <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">Eksamenstips for DS-4</h3>
        <ul className="text-sm space-y-2 text-amber-900 dark:text-amber-200">
          <li>▸ <strong>RPC-feilklassar:</strong> Eksamen spør om feilklasse 3 (server krasjar) og 4 (tapt svar) — dei er umulig å skilje frå klienten sin synsvinkel.</li>
          <li>▸ <strong>MQTT QoS 2:</strong> Husk 4-trinns handshaken: PUBLISH → PUBREC → PUBREL → PUBCOMP.</li>
          <li>▸ <strong>RDP-berekning:</strong> Les av ALLE lenkjeforsinkelsar langs overlay-stigen nøye.</li>
          <li>▸ <strong>Tree cost / MST:</strong> Kruskal: sorter kantar, legg til kant viss inga syklus.</li>
          <li>▸ <strong>Gossip:</strong> p_i = brøkdelen som ER infiserte (ikkje mottakelege).</li>
        </ul>
      </div>
    </div>
  );
}
