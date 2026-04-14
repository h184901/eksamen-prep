"use client";

import Link from "next/link";
import { useState } from "react";

function Card({ color, children }: { color: "gold" | "blue" | "network" | "red" | "green"; children: React.ReactNode }) {
  const colors = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-network-400/60 bg-network-50 dark:bg-network-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-emerald-400/60 bg-emerald-50 dark:bg-emerald-950/20",
  };
  return (
    <div className={`rounded-xl border-2 p-4 my-3 ${colors[color]}`}>
      {children}
    </div>
  );
}

function Def({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm py-1.5 border-b border-[var(--card-border)] last:border-0">
      <span className="font-bold text-blue-700 dark:text-blue-400 min-w-[160px] shrink-0">{term}</span>
      <span>{children}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-blue-200 dark:border-blue-800/40">{title}</h2>
      {children}
    </section>
  );
}

function Algo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-neutral-900 text-green-300 font-mono text-xs px-4 py-3 my-2 overflow-x-auto">
      {children}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 px-4 py-3 text-sm text-amber-800 dark:text-amber-300 my-3">
      <span className="font-bold">Eksamenstips: </span>{children}
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-700 px-4 py-3 text-sm text-red-800 dark:text-red-300 my-3">
      <span className="font-bold">Vanlig feil: </span>{children}
    </div>
  );
}

export default function DS6TeoriPage() {
  const [showLookupDetail, setShowLookupDetail] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/dat110/ds-6" className="hover:text-[var(--accent)]">DS-6</Link>
        <span>/</span>
        <span>Teori</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Navngiving og Chord DHT — Teori</h1>
      <p className="text-[var(--muted)] mb-8">
        Fra navngivingsproblemer i distribuerte systemer til Chord-ringens elegante O(log N)-løsning.
      </p>

      {/* ── 1. Navngiving ── */}
      <Section title="1. Navngiving i distribuerte systemer">
        <p className="text-sm text-[var(--muted)] mb-3">
          En navngiving-tjeneste løser to kjerneproblemer: <strong>unikt identifisere entiteter</strong> og <strong>effektivt finne dem</strong>.
          Tenk på det som internettets telefonkatalog — men spredt over tusenvis av maskiner.
        </p>

        <Card color="blue">
          <h3 className="font-bold mb-3">Grunnleggende begreper (fra professor)</h3>
          <div className="space-y-0.5">
            <Def term="Navn">Bits/tegn som refererer til en entitet. Eksempel: "www.hvl.no"</Def>
            <Def term="Entitet">Det som navnes: resurser (verter, skrivere, filer), prosesser, brukere</Def>
            <Def term="Aksespunkt">Hvor entiteten finnes eller kan nås</Def>
            <Def term="Adresse">Adressen til aksespunktet — trengs for å faktisk nå entiteten</Def>
            <Def term="Identifikator">Et navn som unikt identifiserer én entitet. Tre krav: (1) maks én entitet per ID, (2) maks én ID per entitet, (3) aldri gjenbrukt</Def>
            <Def term="Lokasjons-uavhengig">Et navn som ikke endres selv om entiteten flytter. Eksempel: www.hvl.no</Def>
          </div>
        </Card>

        <Tip>En adresse kan IKKE brukes som identifikator hvis den kan tildeles en annen entitet. IP-adresser er ikke sanne identifikatorer.</Tip>

        <Card color="gold">
          <h3 className="font-bold mb-3">Tre klasser av navngivingssystemer</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Flat navngiving</p>
              <p className="text-xs text-[var(--muted)] mb-2">Ingen meningsbærende struktur</p>
              <ul className="space-y-1 text-xs">
                <li>• MAC-adresser, minne-adresser</li>
                <li>• Trenger spesielle mekanismer for lokasjon</li>
                <li>• Teknikker: kringkasting, videresendingspekere, hjemmebasert, <strong>DHT</strong></li>
              </ul>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Strukturert navngiving</p>
              <p className="text-xs text-[var(--muted)] mb-2">Hierarkisk, menneskelig lesbar</p>
              <ul className="space-y-1 text-xs">
                <li>• DNS: www.hvl.no</li>
                <li>• Fil-stier: /home/erlend/fil.txt</li>
                <li>• Lokasjons-uavhengig, unik</li>
                <li>• Enklere systematisk søk</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">Attributtbasert navngiving</p>
              <p className="text-xs text-[var(--muted)] mb-2">Søk basert på egenskaper</p>
              <ul className="space-y-1 text-xs">
                <li>• LDAP-katalogtjenester</li>
                <li>• Søk: "finn alle skrivere på etasje 3"</li>
                <li>• Fleksibelt, men tyngre å implementere</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card color="network">
          <h3 className="font-bold mb-2">Flat navngiving: fire teknikker</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <span className="font-bold text-network-700 dark:text-network-400 min-w-[200px]">Kringkasting (Broadcasting)</span>
              <span>Send ID til alle, be om nåværende adresse. ARP bruker dette. Skalerer ikke utenfor LAN. O(N).</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-700 dark:text-network-400 min-w-[200px]">Videresendingspekere</span>
              <span>Entiteten etterlater peker til ny lokasjon. Problem: lange kjeder og brutte lenker gir skalerbarhetsproblemer.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-700 dark:text-network-400 min-w-[200px]">Hjemmebasert</span>
              <span>En fast "hjemme"-adresse holder styr på nåværende lokasjon. Problem: hjemmet må eksistere for alltid, dårlig geografisk skalerbarhet.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-network-700 dark:text-network-400 min-w-[200px] text-blue-700 dark:text-blue-400">DHT (Distribuert Hash-tabell)</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">O(log N) — den skalérbare løsningen! Chord er en implementasjon.</span>
            </div>
          </div>
        </Card>
      </Section>

      {/* ── 2. DHT og Chord ── */}
      <Section title="2. Distribuert hash-tabell (DHT) — intuisjonen">
        <p className="text-sm text-[var(--muted)] mb-3">
          Tenk på problemet: du har millioner av filer spredt over tusenvis av noder. Hvordan finner du filen raskt uten en sentral server?
          Løsningen er å <strong>hash filnavnet til en ID</strong> og <strong>lagre filen på noden med nærmeste ID</strong>.
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-2">P2P-løsninger sammenlignet (fra forelesning)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-amber-200 dark:border-amber-800 rounded-lg overflow-hidden">
              <thead className="bg-amber-100 dark:bg-amber-900/30">
                <tr>
                  <th className="px-3 py-2 text-left">Tilnærming</th>
                  <th className="px-3 py-2 text-left">Eksempel</th>
                  <th className="px-3 py-2 text-left">Kompleksitet</th>
                  <th className="px-3 py-2 text-left">Problem</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-t border-amber-200 dark:border-amber-800">
                  <td className="px-3 py-2 font-medium">Sentralisert server</td>
                  <td className="px-3 py-2">Napster</td>
                  <td className="px-3 py-2 font-mono">O(N)</td>
                  <td className="px-3 py-2">Single point of failure</td>
                </tr>
                <tr className="border-t border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
                  <td className="px-3 py-2 font-medium">Oversvømmelse</td>
                  <td className="px-3 py-2">Gnutella</td>
                  <td className="px-3 py-2 font-mono">O(N²)</td>
                  <td className="px-3 py-2">Enormt nettverkstraffik</td>
                </tr>
                <tr className="border-t border-amber-200 dark:border-amber-800">
                  <td className="px-3 py-2 font-bold text-emerald-700 dark:text-emerald-400">DHT</td>
                  <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">Chord, BitTorrent</td>
                  <td className="px-3 py-2 font-mono font-bold text-emerald-700 dark:text-emerald-400">O(log N)</td>
                  <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">Beste valg!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card color="blue">
          <h3 className="font-bold mb-2">DHT-protokollen — kjerneegenskaper</h3>
          <div className="space-y-1 text-sm">
            <Def term="Global visning">Data distribuert over mange noder — alle ser samme ring</Def>
            <Def term="Felles adresserom">Noder og data-elementer mappet inn i samme adresserom (0 til 2^m - 1)</Def>
            <Def term="Skalerbarhet">Spørringer rutes via et lite antall noder til målet</Def>
            <Def term="Lastbalansering">Henting av data forventes jevnt fordelt over alle noder</Def>
            <Def term="Feiltoleranse">Robust mot tilfeldige feil og angrep</Def>
          </div>
        </Card>

        <p className="text-sm text-[var(--muted)] mt-2">
          <strong>Brukseksempler:</strong> Cooperative mirroring (del data), BitTorrent (nøkkel = hash av filinnhold, verdi = IP-adresser til peers), Apache Cassandra (map datablokker til servere).
        </p>
      </Section>

      {/* ── 3. Chord-ring ── */}
      <Section title="3. Chord-protokollen — ring-topologi">
        <p className="text-sm text-[var(--muted)] mb-3">
          Chord organiserer noder i en <strong>logisk ring</strong> med 2^m posisjoner (0 til 2^m - 1).
          Hver node og hver datanøkkel får en m-bits ID (typisk SHA-1 med m=160 bits i produksjon, m=5 i eksameneksempler).
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-3">Chord — fem grunnleggende konsepter</h3>
          <div className="space-y-0.5">
            <Def term="Adresserom">2^m identifikatorer: {"{0, 1, ..., 2^m - 1}"}. Med m=5: 32 posisjoner.</Def>
            <Def term="succ(k)">Successor: den noden med minste ID ≥ k (sirkulært). Finnes alltid.</Def>
            <Def term="pred(n)">Predecessor: noden rett foran n i ringen (med størst ID {"< n"}).</Def>
            <Def term="Nøkkelansvar">Nøkkel k tilhører noden s der pred(s) {"< k ≤ s"} (sirkulært). Altså succ(k).</Def>
            <Def term="Fingertabell">m oppslag per node: FT[i] = succ(n + 2^(i-1)) mod 2^m. Gir O(log N) søk.</Def>
          </div>
        </Card>

        <Card color="network">
          <h3 className="font-bold mb-3">Eksempel fra professor: m=3, noder 0, 1, 3, 6</h3>
          <div className="text-sm space-y-2">
            <p>Adresserom: 0–7. Nøkkelansvar (pred(n) {"< k ≤ n"}):</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {[
                { node: 0, range: "7 < k ≤ 0", keys: "0" },
                { node: 1, range: "0 < k ≤ 1", keys: "1" },
                { node: 3, range: "1 < k ≤ 3", keys: "2, 3" },
                { node: 6, range: "3 < k ≤ 6", keys: "4, 5, 6" },
              ].map(({ node, range, keys }) => (
                <div key={node} className="rounded-lg bg-white dark:bg-neutral-900/50 p-2 border border-network-200 dark:border-network-800">
                  <p className="font-bold text-network-600 dark:text-network-400">Node {node}</p>
                  <p className="text-[var(--muted)]">{range}</p>
                  <p>Nøkler: {keys}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted)]">Merk: node 0 er ansvarlig for nøkkel 0 og nøkkel 7+1=0 (wrap-around)</p>
          </div>
        </Card>

        <Warn>
          Nøkkelansvarsregelen er <strong>pred(s) {"< k ≤ s"}</strong>, IKKE k {"< s"}. Nøkkel k=5 på noden 5 tilhører server 5.
          Nøkkel k=0 tilhører server 0 (sirkulært: pred(0) er siste node, f.eks. 25 — da er 25 {"< 0 ≤ 0"} modulo sant).
        </Warn>
      </Section>

      {/* ── 4. Fingertabell ── */}
      <Section title="4. Fingertabell — formelen og intuisjonen">
        <p className="text-sm text-[var(--muted)] mb-3">
          En fingertabell gjør at hver node kan <strong>hoppe halvveis</strong> mot nøkkelen i hvert steg.
          Uten fingertabell ville vi traversert ringen én node om gangen — O(N). Med fingertabell er det O(log N).
        </p>

        <Card color="gold">
          <h3 className="font-bold mb-3">Fingertabell-formelen (den du må pugge)</h3>
          <div className="rounded-lg bg-white dark:bg-neutral-900 border-2 border-amber-400 px-5 py-4 text-center font-mono text-lg mb-3">
            FT_n[i] = succ((n + 2^(i-1)) mod 2^m)
          </div>
          <div className="text-sm space-y-1">
            <p><strong>n</strong> = noden du beregner tabellen for</p>
            <p><strong>i</strong> = raden i tabellen, fra 1 til m</p>
            <p><strong>m</strong> = antall bits i adresserommet</p>
            <p><strong>2^m</strong> = adresserommets størrelse (mod brukes for sirkulær aritmetikk)</p>
          </div>
        </Card>

        <Card color="blue">
          <h3 className="font-bold mb-3">Eksempel fra professor: m=5, noder 1, 5, 17, 19, 25</h3>
          <p className="text-xs text-[var(--muted)] mb-2">Adresserom: 0–31. Beregn FT for node 1:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
              <thead className="bg-blue-100 dark:bg-blue-900/30">
                <tr>
                  <th className="px-3 py-2 text-left">i</th>
                  <th className="px-3 py-2 text-left">n + 2^(i-1)</th>
                  <th className="px-3 py-2 text-left">mod 32</th>
                  <th className="px-3 py-2 text-left">succ()</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [1, "1+1=2", 2, 5],
                  [2, "1+2=3", 3, 5],
                  [3, "1+4=5", 5, 5],
                  [4, "1+8=9", 9, 17],
                  [5, "1+16=17", 17, 17],
                ].map(([i, expr, mod, succ]) => (
                  <tr key={i as number} className="border-t border-blue-200 dark:border-blue-800">
                    <td className="px-3 py-1.5">{i}</td>
                    <td className="px-3 py-1.5">{expr}</td>
                    <td className="px-3 py-1.5">{mod}</td>
                    <td className="px-3 py-1.5 font-bold text-blue-700 dark:text-blue-400">{succ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">FT_1 = [5, 5, 5, 17, 17]</p>
          <p className="text-xs text-[var(--muted)] mt-1">Merk: når succ(5) = 5 (noden eksisterer eksakt), returneres 5. Med succ(9) = 17 fordi 9 {">"} 5 men {"<"} 17, og 17 er neste server.</p>
        </Card>

        <Card color="blue">
          <h3 className="font-bold mb-3">Fingertabeller for alle noder (m=5, noder 1, 5, 17, 19, 25)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
              <thead className="bg-blue-100 dark:bg-blue-900/30">
                <tr>
                  <th className="px-2 py-2">Node</th>
                  <th className="px-2 py-2">FT[1]</th>
                  <th className="px-2 py-2">FT[2]</th>
                  <th className="px-2 py-2">FT[3]</th>
                  <th className="px-2 py-2">FT[4]</th>
                  <th className="px-2 py-2">FT[5]</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: 1,  ft: [5, 5, 5, 17, 17] },
                  { n: 5,  ft: [17, 17, 17, 17, 25] },
                  { n: 17, ft: [19, 19, 25, 25, 1] },
                  { n: 19, ft: [25, 25, 25, 25, 1] },
                  { n: 25, ft: [1, 1, 1, 1, 5] },
                ].map(({ n, ft }, si) => (
                  <tr key={n} className={si % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-blue-50/30 dark:bg-blue-900/10"}>
                    <td className="px-2 py-1.5 font-bold text-blue-700 dark:text-blue-400">{n}</td>
                    {ft.map((v, i) => <td key={i} className="px-2 py-1.5 text-center">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">Node 17, i=5: 17+16=33, 33 mod 32 = 1, succ(1) = 1. Wrap-around!</p>
        </Card>

        <Tip>
          Beregn alltid fingertabellen systematisk fra i=1 til i=m, og husk å ta mod 2^m når n + 2^(i-1) {"≥"} 2^m.
          En feil her kaskaderer gjennom nøkkelansvar og oppslag-oppgavene!
        </Tip>
      </Section>

      {/* ── 5. Oppslagsalgoritme ── */}
      <Section title="5. Oppslagsalgoritmen — runde for runde">
        <p className="text-sm text-[var(--muted)] mb-3">
          Algoritmen har to deler som kalles vekselvis. Intuisjonen: <strong>hopp alltid til den noden i fingertabellen som er så nær nøkkelen som mulig</strong>, men aldri forbi den.
        </p>

        <Card color="network">
          <h3 className="font-bold mb-2">Algoritme (fra professorens håndskrevne notater)</h3>
          <Algo>
            {`n.findSuccessor(k):\n  if (k ∈ (n, successor])  ← dvs. n < k ≤ succ(n)\n    return successor        ← FUNNET!\n  else\n    n' = closestPrecedingNode(k)\n    return n'.findSuccessor(k)  ← rekursivt hopp\n\nn.closestPrecedingNode(k):\n  for i = m downTo 1\n    if (FT[i] ∈ (n, k))  ← dvs. n < FT[i] < k\n      return FT[i]       ← beste kandidat\n  return n`}
          </Algo>
          <p className="text-xs text-[var(--muted)]">
            Merk: "∈ (n, k)" betyr sirkulært mellom n og k, eksklusivt. Vi søker FT baklengs (fra m til 1) for å finne den <em>høyeste</em> fingeren som er {"<"} k.
          </p>
        </Card>

        <div className="rounded-xl border-2 border-blue-400/40 bg-[var(--card)] p-5 my-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Gjennomgang: Finn k=23 fra node 1 (m=5, noder 1,5,17,19,25)</h3>
            <button
              onClick={() => setShowLookupDetail(!showLookupDetail)}
              className="text-xs px-3 py-1 rounded-full border border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              {showLookupDetail ? "Skjul detaljer" : "Vis detaljer"}
            </button>
          </div>
          <div className="space-y-2 text-sm">
            {[
              {
                step: "Steg 1 — n=1",
                check: "succ(1)=5. Er 1 < 23 ≤ 5? NEI.",
                action: "FT_1 baklengs: FT[5]=17. Er 1 < 17 < 23? JA! → hopp til 17",
                detail: "FT[5]=17. Sjekk: 1 < 17 < 23 = sant. Returnerer 17.",
                final: false,
              },
              {
                step: "Steg 2 — n=17",
                check: "succ(17)=19. Er 17 < 23 ≤ 19? NEI.",
                action: "FT_17 baklengs: FT[5]=1 (17<1<23? nei, wrap). FT[4]=25 (17<25<23? nei). FT[3]=25 (nei). FT[2]=19 (17<19<23? JA!) → hopp til 19",
                detail: "FT[2]=19. Sjekk: 17 < 19 < 23 = sant. Returnerer 19.",
                final: false,
              },
              {
                step: "Steg 3 — n=19",
                check: "succ(19)=25. Er 19 < 23 ≤ 25? JA!",
                action: "Returnerer 25. SVAR: Server 25 er ansvarlig for nøkkel 23.",
                detail: "pred(25)=19. 19 < 23 ≤ 25 = sant. Nøkkel 23 tilhører server 25.",
                final: true,
              },
            ].map(({ step, check, action, detail, final }) => (
              <div
                key={step}
                className={`rounded-lg p-3 border ${
                  final
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400"
                    : "bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700"
                }`}
              >
                <p className={`font-bold mb-1 ${final ? "text-emerald-700 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>{step}</p>
                <p className="text-xs text-[var(--muted)]">{check}</p>
                <p className="text-xs font-medium mt-0.5">{action}</p>
                {showLookupDetail && (
                  <p className="text-xs text-[var(--muted)] mt-1 border-t border-neutral-200 dark:border-neutral-700 pt-1">{detail}</p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">
            3 hopp. O(log 5) ≈ 2.3, dvs. 3 hopp er normalt. Verifisert: server 25 er ansvarlig for nøkler 20–25 (pred(25)=19, 19 {"< k ≤"} 25).
          </p>
        </div>

        <Warn>
          Sirkulær aritmetikk: når du sjekker om FT[i] ∈ (n, k) og k {"<"} n (f.eks. n=25, k=3), er betingelsen FT[i] {">"} n ELLER FT[i] {"<"} k.
          Dette er wrap-around-tilfellet og en vanlig kilde til feil.
        </Warn>

        <Card color="green">
          <h3 className="font-bold mb-2">O(log N) — hvorfor?</h3>
          <p className="text-sm">
            Fingertabell-oppslaget halverer avstanden til målet i hvert steg. I ringen er det N noder.
            Etter k hopp er vi innenfor N/2^k noder fra målet. For å finne målet trengs k {"≈"} log₂(N) hopp.
          </p>
          <p className="text-sm mt-2">
            <strong>Intuisjon:</strong> FT[m] peker halvveis rundt ringen, FT[m-1] peker en kvart vei rundt, osv.
            Hver hopp dobler framgangen. Dette er binærsøk på en sirkel.
          </p>
        </Card>
      </Section>

      {/* ── 6. DNS ── */}
      <Section title="6. DNS som strukturert navngiving">
        <p className="text-sm text-[var(--muted)] mb-3">
          DNS er den viktigste implementasjonen av <strong>strukturert navngiving</strong> i forelesningene.
          Det er et hierarkisk distribuert navnerom der hvert domene lagrer pekere til lavere nivåer.
        </p>

        <Card color="blue">
          <h3 className="font-bold mb-3">DNS-hierarkiet (tre nivåer)</h3>
          <div className="space-y-2 text-sm">
            <Def term="Root-servere (13)">Kjenner til alle TLD-servere. Ca. 1892 instanser (speilet). Eksempel: l.root-servers.net (199.7.83.42)</Def>
            <Def term="TLD-servere">Top Level Domain: .no, .com, .edu, .gov etc. Kjenner til autoritative servere for hvert domene. Eksempel: i.nic.no (194.146.106.6)</Def>
            <Def term="Autoritative servere">Kjenner til faktiske IP-adresser innen ett domene. Eksempel: ns02.hib.no (158.37.87.5) kjenner www.hvl.no = 158.37.32.44</Def>
          </div>
        </Card>

        <Card color="gold">
          <h3 className="font-bold mb-3">DNS Ressurspost-typer (Resource Records)</h3>
          <p className="text-xs text-[var(--muted)] mb-2">Format: (navn, verdi, type, ttl)</p>
          <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
            {[
              { type: "A", desc: "navn = hostname, verdi = IP-adresse", ex: "(www.hvl.no, 158.37.32.44, A, ...)" },
              { type: "NS", desc: "navn = domene, verdi = hostname til navneserver", ex: "(hvl.no, ns02.hib.no, NS, ...)" },
              { type: "CNAME", desc: "navn = alias, verdi = kanonisk navn", ex: "(www.ibm.com, servereast.backup2.ibm.com, CNAME)" },
              { type: "MX", desc: "verdi = navn på e-postserver for domenet", ex: "(hvl.no, mail.hvl.no, MX, ...)" },
            ].map(({ type, desc, ex }) => (
              <div key={type} className="rounded-lg bg-white dark:bg-neutral-900/50 p-2.5 border border-amber-200 dark:border-amber-800">
                <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">type={type}</p>
                <p className="text-[var(--muted)]">{desc}</p>
                <p className="mt-1 text-xs text-neutral-500">{ex}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card color="network">
          <h3 className="font-bold mb-2">Iterativ vs rekursiv navnoppslag</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-bold text-network-700 dark:text-network-400 mb-1">Iterativ (klienten spør)</p>
              <ol className="space-y-1 text-xs">
                <li>1. Klient spør lokal navneserver om www.hvl.no</li>
                <li>2. Lokal NS spør Root → får i.nic.no</li>
                <li>3. Lokal NS spør i.nic.no → får ns02.hib.no</li>
                <li>4. Lokal NS spør ns02.hib.no → får 158.37.32.44</li>
                <li>5. Lokal NS returnerer til klient</li>
              </ol>
            </div>
            <div>
              <p className="font-bold text-network-700 dark:text-network-400 mb-1">Rekursiv (serverne spør)</p>
              <ol className="space-y-1 text-xs">
                <li>1. Klient spør lokal NS</li>
                <li>2. Lokal NS spør Root</li>
                <li>3. Root spør .no-server</li>
                <li>4. .no-server spør hvl-server</li>
                <li>5. Svar propagerer tilbake</li>
              </ol>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)] mt-2">DNS cacher svar for å unngå gjentatte oppslag (TTL-basert). Dette løser skalerbarhetsproblemene.</p>
        </Card>
      </Section>

      {/* ── Sammendrag ── */}
      <Section title="7. Hva du MÅ kunne — eksamensfokus">
        <Card color="gold">
          <h3 className="font-bold mb-3">Chord-eksamen — typisk struktur (Oppg 10, 15%)</h3>
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold">a) Beregn fingertabell for alle noder</p>
              <p className="text-xs text-[var(--muted)]">Vis utregningen for hvert i=1..m: (n + 2^(i-1)) mod 2^m → succ(). Gjør det systematisk, alltid.</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold">b) Nøkkelansvar</p>
              <p className="text-xs text-[var(--muted)]">For hver gitt nøkkel k: finn succ(k) = minste node n der n {"≥"} k sirkulært. Regel: pred(n) {"< k ≤"} n.</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold">c) Nøkkeloppslag — runde for runde</p>
              <p className="text-xs text-[var(--muted)]">Vis ALLE steg. For hvert steg: (1) Sjekk succ(n) — er k ≤ succ(n)? (2) Søk FT baklengs etter høyeste finger {"<"} k. (3) Hopp eller returner.</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-neutral-900/50 p-3 border border-amber-200 dark:border-amber-800">
              <p className="font-bold">d) Replikering og formål</p>
              <p className="text-xs text-[var(--muted)]">Replikering gir: feiltoleranse, høy tilgjengelighet, skalerbarhet, ytelse (lokal kopi). Fingertabell gir O(log N) søketid.</p>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
