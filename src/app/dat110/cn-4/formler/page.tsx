"use client";

function FormulaBox({ label, formula, color, children }: {
  label: string;
  formula: string;
  color: "gold" | "blue" | "red" | "green" | "network";
  children?: React.ReactNode;
}) {
  const colors = {
    gold:    "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
    blue:    "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
    red:     "border-red-400 bg-red-50 dark:bg-red-950/20",
    green:   "border-green-400 bg-green-50 dark:bg-green-950/20",
    network: "border-network-400 bg-network-50 dark:bg-network-950/20",
  };
  const labelColors = {
    gold:    "bg-amber-400 text-white",
    blue:    "bg-blue-500 text-white",
    red:     "bg-red-500 text-white",
    green:   "bg-green-600 text-white",
    network: "bg-network-600 text-white",
  };
  return (
    <div className={`rounded-xl border-2 ${colors[color]} overflow-hidden my-4`}>
      <div className={`${labelColors[color]} px-4 py-1.5 text-xs font-bold uppercase tracking-wide`}>{label}</div>
      <div className="px-5 py-4">
        <div className="font-mono text-base font-bold text-center mb-3 bg-white dark:bg-neutral-900 rounded-lg py-3 border border-[var(--card-border)]">
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
      <span className="font-mono font-bold text-network-700 dark:text-network-300 min-w-[150px]">{sym}</span>
      <span className="text-[var(--muted)]">{meaning}</span>
    </div>
  );
}

export default function CN4FormlerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Formler — Nettverkslaget</h1>
      <p className="text-[var(--muted)] mb-8 text-sm">
        CN Kapittel 4 — CIDR/subnetting, IP-fragmentering, Dijkstra, Bellman-Ford og RDP
      </p>

      {/* ── Hurtigoversikt ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Rask oversikt — «Når bruker du hva?»</h2>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-network-50 dark:bg-network-950/20">
                <th className="text-left p-3 border border-[var(--card-border)]">Situasjon</th>
                <th className="text-left p-3 border border-[var(--card-border)]">Bruk</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Finn antall vertsadresser i subnett", "2^(32−prefix) − 2  (trekk fra nettverksadr. og broadcast)"],
                ["Finn nettverksadresse", "IP AND subnet-maske (bitvis AND)"],
                ["Finn broadcast-adresse", "Sett alle vertsbitene til 1"],
                ["Finn offset ved fragmentering", "offset = (startposisjon i bytes) / 8"],
                ["Sjekk om det er siste fragment", "MF-flag = 0 på siste fragment"],
                ["Korteste vei (komplett informasjon)", "Dijkstras algoritme (LS — Link State)"],
                ["Korteste vei (delvis informasjon)", "Bellman-Ford (DV — Distance Vector)"],
                ["Mål overlay-overhead", "RDP = d_overlay(A,B) / d_unicast(A,B)"],
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

      {/* ── CIDR og subnetting ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">CIDR og subnetting</h2>

        <FormulaBox label="CIDR — antall adresser" formula="Antall adresser = 2^(32 − prefix)" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="prefix" meaning="Antall nettverksbits i CIDR-notasjon (f.eks. /24 → prefix=24)" />
            <VarRow sym="32 − prefix" meaning="Antall vertsadresse-bits" />
            <VarRow sym="2^(32−prefix)" meaning="Totalt antall adresser (inkl. nettverksadr. og broadcast)" />
            <VarRow sym="2^(32−prefix) − 2" meaning="Brukbare vertsadresser (minus nettverksadr. og broadcast)" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Eksempler:</p>
            <div className="grid sm:grid-cols-3 gap-2 font-mono">
              <div className="bg-white dark:bg-neutral-900 rounded p-2 border border-[var(--card-border)]">
                <p className="text-[var(--muted)]">/24</p>
                <p>2^8 = 256 adr.</p>
                <p className="text-green-600">254 verter</p>
              </div>
              <div className="bg-white dark:bg-neutral-900 rounded p-2 border border-[var(--card-border)]">
                <p className="text-[var(--muted)]">/25</p>
                <p>2^7 = 128 adr.</p>
                <p className="text-green-600">126 verter</p>
              </div>
              <div className="bg-white dark:bg-neutral-900 rounded p-2 border border-[var(--card-border)]">
                <p className="text-[var(--muted)]">/30</p>
                <p>2^2 = 4 adr.</p>
                <p className="text-green-600">2 verter</p>
              </div>
            </div>
          </div>
        </FormulaBox>

        <div className="rounded-xl border-2 border-blue-400 bg-blue-50 dark:bg-blue-950/20 p-5 my-4">
          <h3 className="font-bold mb-4">Subnettberegning — fremgangsmåte</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-2">1. Nettverksadresse</p>
              <p className="text-[var(--muted)]">IP AND subnetmaske (bitvis AND)</p>
              <p className="font-mono mt-2">192.168.1.100/26</p>
              <p className="font-mono">AND 255.255.255.192</p>
              <p className="font-mono text-green-600">= 192.168.1.64</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-2">2. Broadcast</p>
              <p className="text-[var(--muted)]">Sett alle vertsbitene til 1</p>
              <p className="font-mono mt-2">192.168.1.64</p>
              <p className="font-mono">+ 63 (2^6−1)</p>
              <p className="font-mono text-red-600">= 192.168.1.127</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900 border border-blue-200 dark:border-blue-800 p-3">
              <p className="font-bold text-blue-700 dark:text-blue-300 mb-2">3. Vertsintervall</p>
              <p className="text-[var(--muted)]">Nettverksadr.+1 til broadcast−1</p>
              <p className="font-mono mt-2">192.168.1.65</p>
              <p className="font-mono">til</p>
              <p className="font-mono text-blue-600">192.168.1.126</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-network-400 bg-network-50 dark:bg-network-950/20 p-5 my-4">
          <h3 className="font-bold mb-3">Subnet-maske raskt</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-network-100 dark:bg-network-900/30">
                  <th className="border border-[var(--card-border)] px-3 py-2">Prefix</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Subnet-maske</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Verter</th>
                  <th className="border border-[var(--card-border)] px-3 py-2">Subnett av /24</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["/24", "255.255.255.0", "254", "1"],
                  ["/25", "255.255.255.128", "126", "2"],
                  ["/26", "255.255.255.192", "62", "4"],
                  ["/27", "255.255.255.224", "30", "8"],
                  ["/28", "255.255.255.240", "14", "16"],
                  ["/29", "255.255.255.248", "6", "32"],
                  ["/30", "255.255.255.252", "2", "64"],
                ].map(([prefix, mask, hosts, subnets]) => (
                  <tr key={prefix} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-mono font-bold text-network-700 dark:text-network-300">{prefix}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] font-mono">{mask}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-center">{hosts}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-center text-[var(--muted)]">{subnets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── IP Fragmentering ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">IP-fragmentering</h2>

        <FormulaBox label="Fragment offset-formel" formula="offset = (startposisjon i bytes) / 8" color="blue">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="offset" meaning="Feltet i IP-headeren — posisjon av fragmentets data i originalpakken" />
            <VarRow sym="startposisjon" meaning="Antall bytes fra starten av original IP-data til dette fragmentet" />
            <VarRow sym="/ 8" meaning="IP-offset måles i enheter av 8 bytes (64 bits)" />
            <VarRow sym="MF-flag" meaning="More Fragments = 1 hvis det kommer flere, = 0 for siste fragment" />
            <VarRow sym="DF-flag" meaning="Don't Fragment = 1 → router MÅ IKKE fragmentere pakken" />
          </div>
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-2">Eksempel: 4000 bytes data, MTU=1500 bytes</p>
            <div className="font-mono space-y-1 text-[var(--muted)]">
              <p>IP-header = 20 bytes → maks dataper fragment = 1500−20 = 1480 bytes</p>
              <p>Fragment 1: data 0–1479, offset = 0/8 = 0, MF=1</p>
              <p>Fragment 2: data 1480–2959, offset = 1480/8 = 185, MF=1</p>
              <p>Fragment 3: data 2960–3999 (1040b), offset = 2960/8 = 370, MF=0</p>
            </div>
          </div>
        </FormulaBox>
      </section>

      {/* ── Dijkstra ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Dijkstras algoritme (Link State)</h2>

        <FormulaBox label="Dijkstra — oppdateringsregel" formula="D(v) = min( D(v), D(w) + c(w,v) )" color="gold">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="D(v)" meaning="Nåværende estimert korteste avstand fra kilde til node v" />
            <VarRow sym="D(w)" meaning="Bekreftet korteste avstand til node w (allerede ferdigbehandlet)" />
            <VarRow sym="c(w,v)" meaning="Linkkostnad mellom noder w og v" />
            <VarRow sym="min(...)" meaning="Oppdater D(v) kun hvis ny vei er kortere" />
          </div>
          <div className="rounded-lg bg-amber-100 dark:bg-amber-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Algoritmeskritt:</p>
            <ol className="list-decimal list-inside space-y-0.5 text-[var(--muted)]">
              <li>Initialiser: D(kilde)=0, D(alle andre)=∞</li>
              <li>Velg node w med lavest D(w) blant ikke-behand.</li>
              <li>For alle naboer v til w: D(v) = min(D(v), D(w)+c(w,v))</li>
              <li>Merk w som ferdigbehandlet, gå til steg 2</li>
              <li>Stopp når alle noder er ferdigbehandlet</li>
            </ol>
            <p className="mt-2">Kompleksitet: O(N²) naivt, O(N log N + E) med prioritetskø</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── Bellman-Ford ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Bellman-Ford (Distance Vector)</h2>

        <FormulaBox label="Bellman-Ford — oppdateringsregel" formula="d_x(y) = min_v { c(x,v) + d_v(y) }" color="blue">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="d_x(y)" meaning="Node x sin estimerte korteste avstand til destinasjon y" />
            <VarRow sym="min_v {...}" meaning="Minimum over alle naboer v av x" />
            <VarRow sym="c(x,v)" meaning="Linkkostnad fra x til nabo v" />
            <VarRow sym="d_v(y)" meaning="Nabo v sin rapporterte avstand til y (fra DV-tabell)" />
          </div>
          <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Distribuert beregning:</p>
            <p className="text-[var(--muted)]">Hver node sender sin DV-tabell til naboer. Naboer oppdaterer sine tabeller. Konvergerer etter nok iterasjoner.</p>
            <p className="text-[var(--muted)] mt-1">Problem: count-to-infinity ved linkkostnad-økning. Løses med poison reverse.</p>
          </div>
        </FormulaBox>

        <div className="rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] p-5 mt-2">
          <h3 className="font-semibold mb-3">Dijkstra vs. Bellman-Ford</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-network-50 dark:bg-network-950/20">
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Egenskap</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Dijkstra (LS)</th>
                  <th className="border border-[var(--card-border)] px-3 py-2 text-left">Bellman-Ford (DV)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kunnskap", "Global — alle kjenner hele topologien", "Lokal — kun naboers DV-tabeller"],
                  ["Beregning", "Sentralisert per node", "Distribuert"],
                  ["Konvergens", "Rask — O(N²)", "Tregere — kan svinge"],
                  ["Problemer", "Nettverkstrafikk ved store grafer", "Count-to-infinity"],
                  ["Brukes i", "OSPF (intra-AS)", "RIP, BGP-prinsipper"],
                  ["Kompleksitet", "O(N²) eller O(N log N + E)", "O(N·E) per iterasjon"],
                ].map(([prop, dijkstra, bf]) => (
                  <tr key={prop} className="border-b border-[var(--card-border)]">
                    <td className="px-3 py-2 border border-[var(--card-border)] font-medium">{prop}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{dijkstra}</td>
                    <td className="px-3 py-2 border border-[var(--card-border)] text-xs text-[var(--muted)]">{bf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RDP ── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">RDP — Relative Delay Penalty</h2>

        <FormulaBox label="RDP — overlay-overhead" formula="RDP = d_overlay(A,B) / d_unicast(A,B)" color="network">
          <div className="space-y-0.5 mb-3">
            <VarRow sym="RDP" meaning="Relative Delay Penalty — overhead-faktor for overlay-nettverket" />
            <VarRow sym="d_overlay(A,B)" meaning="Forsinkelse langs overlay-stien mellom A og B" />
            <VarRow sym="d_unicast(A,B)" meaning="Korteste forsinkelse i underliggende nett mellom A og B" />
            <VarRow sym="RDP = 1.0" meaning="Perfekt — overlay-sti er like rask som beste fysiske sti" />
            <VarRow sym="RDP > 1.0" meaning="Overhead — overlay-stien er lenger enn optimal" />
          </div>
          <div className="rounded-lg bg-network-100 dark:bg-network-900/30 px-3 py-2 text-xs">
            <p className="font-bold mb-1">Intuisjon:</p>
            <p>RDP kan aldri være under 1.0 (overlay kan aldri være raskere enn direkte unicast). Jo nærmere 1.0, jo bedre overlay-design.</p>
          </div>
        </FormulaBox>
      </section>

      {/* ── Vanlige feil ── */}
      <section className="mb-4">
        <h2 className="text-lg font-bold mb-4 text-network-700 dark:text-network-300">Vanlige eksamenfeil</h2>
        <div className="rounded-xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 p-5">
          <ul className="space-y-3 text-sm">
            {[
              "Fragment offset: divider med 8 (ikke 4 eller 16). Offset er i 8-byte-enheter.",
              "MF-flag = 0 betyr det ER det siste fragmentet (ikke at det ikke er fragmentert — DF-flag brukes til det).",
              "Subnett: husk å trekke fra 2 verter (nettverksadresse og broadcast) for brukbare verter.",
              "Dijkstra: D(v) oppdateres kun for ubehandlede noder. Allerede ferdigbehandlede noder endres aldri.",
              "Bellman-Ford: count-to-infinity kan skje ved økte kostnader. Poison reverse er en delvis løsning.",
              "CIDR: /32 betyr én enkelt vert (0 vertsadresse-bits). /0 betyr alle adresser.",
              "Antall verter = 2^(32−prefix) − 2, men /31 og /32 er spesialtilfeller uten broadcast/nettverksadr.",
            ].map((feil, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 shrink-0 font-bold">!</span>
                <span>{feil}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
