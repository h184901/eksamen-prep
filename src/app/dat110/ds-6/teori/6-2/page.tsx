"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS6_2Page() {
  const [dnsStep, setDnsStep] = useState(0);
  const [resolutionType, setResolutionType] = useState<"iterativ" | "rekursiv">("iterativ");

  const dnsSteps = [
    {
      num: 1,
      actor: "Klient",
      message: "Klienten spør sin lokale DNS-server: «Hva er IP-adressen til www.hvl.no?»",
      detail: "Lokal DNS-server sjekker cache. Ingen treff → sender forespørsel videre.",
    },
    {
      num: 2,
      actor: "Lokal DNS → Root-server",
      message: "Lokal DNS kontakter root-serveren (f.eks. l.root-servers.net, 199.7.83.42)",
      detail: "Root-serveren vet ikke svaret direkte, men vet hvilken TLD-server som håndterer .no",
    },
    {
      num: 3,
      actor: "Root → Lokal DNS",
      message: "Root svarer med NS- og A-record for .no TLD-serveren: i.nic.no (194.146.106.6)",
      detail: "Root lagrer: (no, i.nic.no, NS, ...) og (i.nic.no, 194.146.106.6, A, ...)",
    },
    {
      num: 4,
      actor: "Lokal DNS → TLD-server (.no)",
      message: "Lokal DNS spør i.nic.no: «Hvem er autoritativ for hvl.no?»",
      detail: "TLD-serveren har NS-record for alle .no-domener inkludert hvl.no",
    },
    {
      num: 5,
      actor: "TLD → Lokal DNS",
      message: "TLD svarer med NS- og A-record for HVLs navneserver: ns02.hib.no (158.37.87.5)",
      detail: "TLD lagrer: (hvl.no, ns02.hib.no, NS, ...) og (ns02.hib.no, 158.37.87.5, A, ...)",
    },
    {
      num: 6,
      actor: "Lokal DNS → Autoritativ server",
      message: "Lokal DNS spør ns02.hib.no: «Hva er IP-adressen til www.hvl.no?»",
      detail: "Den autoritative serveren har den faktiske A-recorden for alle hvl.no-hostnames",
    },
    {
      num: 7,
      actor: "Autoritativ → Lokal DNS",
      message: "Autoritativ server svarer med A-record: (www.hvl.no, 158.37.32.44, A, 86400)",
      detail: "Svaret inkluderer TTL = 86400 sekunder (24 timer). Lokal DNS cacher resultatet.",
    },
    {
      num: 8,
      actor: "Lokal DNS → Klient",
      message: "Lokal DNS returnerer IP-adressen 158.37.32.44 til klienten",
      detail: "Klienten kan nå opprette TCP-forbindelse til www.hvl.no på port 80/443.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-6/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.2 Strukturert navngiving</span>
      </div>

      <h1 className="text-2xl font-bold">6.2 Strukturert navngiving</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Strukturerte navn har et hierarkisk format som gjør dem menneskevennlige og lette å administrere.
        DNS er det viktigste eksempelet — det omsetter domenenavn til IP-adresser for hele internett.
      </p>

      {/* Grunnleggende begreper */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hierarkisk navnerom</h2>
        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4 space-y-3">
          <p className="text-sm text-[var(--foreground)]">
            Et navnerom organiseres som et rotet tre (directed acyclic graph). Nodene representerer kataloger,
            kantene navnekomponenter, og løvnodene de faktiske entitetene.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { type: "Globalt nivå", color: "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700", desc: "Høynivå kataloger. Administreres på tvers av organisasjoner. Sjeldne endringer." },
              { type: "Administrativt nivå", color: "bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700", desc: "Midtnivå kataloger. Kan tildeles separate administrasjoner. Moderate endringer." },
              { type: "Ledelsesnivå", color: "bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700", desc: "Lavnivå kataloger innen én organisasjon. Kartlegges til lokale navneservere." },
            ].map(({ type, color, desc }) => (
              <div key={type} className={`rounded-lg border p-3 ${color}`}>
                <p className="font-semibold text-sm mb-1">{type}</p>
                <p className="text-xs text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-sm text-[var(--muted)] space-y-1">
            <p><strong>Absolutt stinavn:</strong> starter fra roten — <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/no/hvl/www</code></p>
            <p><strong>Relativt stinavn:</strong> starter fra et kjent kontekstnav — <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">www</code></p>
          </div>
        </div>
      </section>

      {/* Iterativ vs Rekursiv */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Navneoppløsning: Iterativ vs Rekursiv</h2>
        <div className="flex gap-3 mb-3">
          {(["iterativ", "rekursiv"] as const).map(type => (
            <button
              key={type}
              onClick={() => setResolutionType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${resolutionType === type ? "bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40"}`}
            >
              {type === "iterativ" ? "Iterativ oppløsning" : "Rekursiv oppløsning"}
            </button>
          ))}
        </div>

        {resolutionType === "iterativ" && (
          <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
            <h3 className="font-semibold mb-2">Iterativ navneoppløsning</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Klienten gjør ALL oppfølging selv. Serveren svarer kun med adressen til neste server å spørre.
              Klienten sender tre separate forespørsler.
            </p>
            <svg width="480" height="190" viewBox="0 0 480 190" className="max-w-full mx-auto">
              <rect x="10" y="75" width="80" height="40" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="50" y="95" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">Klient</text>
              <text x="50" y="108" textAnchor="middle" fontSize="9" fill="currentColor">(Lokal DNS)</text>
              <rect x="160" y="15" width="80" height="40" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
              <text x="200" y="39" textAnchor="middle" fontSize="11" fill="currentColor">Root DNS</text>
              <rect x="310" y="75" width="80" height="40" rx="6" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
              <text x="350" y="95" textAnchor="middle" fontSize="11" fill="currentColor">TLD (.no)</text>
              <rect x="160" y="140" width="80" height="40" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
              <text x="200" y="164" textAnchor="middle" fontSize="11" fill="currentColor">Autoritativ</text>
              {/* 1: Klient → Root */}
              <line x1="90" y1="83" x2="160" y2="43" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="108" y="55" fontSize="9" fill="#3b82f6">① spør</text>
              <line x1="160" y1="48" x2="90" y2="88" stroke="#10b981" strokeWidth="1.5" />
              <text x="92" y="72" fontSize="9" fill="#10b981">② TLD-adr</text>
              {/* 2: Klient → TLD */}
              <line x1="90" y1="97" x2="310" y2="97" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="195" y="90" fontSize="9" fill="#3b82f6">③ spør</text>
              <line x1="310" y1="104" x2="90" y2="104" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x="195" y="118" fontSize="9" fill="#8b5cf6">④ Auth-adr</text>
              {/* 3: Klient → Auth */}
              <line x1="90" y1="112" x2="160" y2="148" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="95" y="138" fontSize="9" fill="#3b82f6">⑤ spør</text>
              <line x1="160" y1="153" x2="90" y2="117" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="40" y="148" fontSize="9" fill="#f59e0b">⑥ IP!</text>
            </svg>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-green-50 dark:bg-green-950/20 p-2">
                <strong className="text-green-700 dark:text-green-400">Fordeler:</strong>
                <p className="text-xs mt-1">Enkel på servere. Cachingmuligheter lokalt.</p>
              </div>
              <div className="rounded bg-amber-50 dark:bg-amber-950/20 p-2">
                <strong className="text-amber-700 dark:text-amber-400">Ulemper:</strong>
                <p className="text-xs mt-1">Klienten sender mange forespørsler. Mer nettverkstrafikk fra klienten.</p>
              </div>
            </div>
          </div>
        )}

        {resolutionType === "rekursiv" && (
          <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
            <h3 className="font-semibold mb-2">Rekursiv navneoppløsning</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Serverne gjør oppfølgingen. Root spør TLD, TLD spør autoritativ. Svaret bobler tilbake
              gjennom kjeden. Klienten sender kun én forespørsel.
            </p>
            <svg width="480" height="200" viewBox="0 0 480 200" className="max-w-full mx-auto">
              <rect x="10" y="80" width="80" height="40" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
              <text x="50" y="100" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">Klient</text>
              <text x="50" y="113" textAnchor="middle" fontSize="9" fill="currentColor">(Lokal DNS)</text>
              <rect x="160" y="15" width="80" height="40" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
              <text x="200" y="39" textAnchor="middle" fontSize="11" fill="currentColor">Root DNS</text>
              <rect x="310" y="80" width="80" height="40" rx="6" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
              <text x="350" y="104" textAnchor="middle" fontSize="11" fill="currentColor">TLD (.no)</text>
              <rect x="160" y="145" width="80" height="40" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
              <text x="200" y="169" textAnchor="middle" fontSize="11" fill="currentColor">Autoritativ</text>
              {/* Forespørsler (stiplet) */}
              <line x1="90" y1="88" x2="160" y2="43" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="100" y="58" fontSize="9" fill="#3b82f6">① forespørsel</text>
              <line x1="240" y1="43" x2="310" y2="88" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="255" y="58" fontSize="9" fill="#10b981">② videre</text>
              <line x1="310" y1="108" x2="240" y2="153" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="268" y="142" fontSize="9" fill="#8b5cf6">③ videre</text>
              {/* Svar (hel) */}
              <line x1="240" y1="160" x2="310" y2="115" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="310" y1="110" x2="240" y2="55" stroke="#8b5cf6" strokeWidth="1.5" />
              <line x1="160" y1="50" x2="90" y2="95" stroke="#10b981" strokeWidth="1.5" />
              <text x="12" y="78" fontSize="9" fill="#10b981">④ IP-svar!</text>
            </svg>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-green-50 dark:bg-green-950/20 p-2">
                <strong className="text-green-700 dark:text-green-400">Fordeler:</strong>
                <p className="text-xs mt-1">Caching nær root gir global effekt. Klienten sender bare én forespørsel.</p>
              </div>
              <div className="rounded bg-amber-50 dark:bg-amber-950/20 p-2">
                <strong className="text-amber-700 dark:text-amber-400">Ulemper:</strong>
                <p className="text-xs mt-1">Mer kompleks å implementere på servere. Større belastning på root-servere.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* DNS Server-hierarkiet */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">DNS — Domain Name System</h2>
        <p className="text-sm text-[var(--muted)]">
          DNS er internetts distribuerte navneoppløsningssystem. Det oversetter domenenavn (www.hvl.no) til
          IP-adresser (158.37.32.44). Hierarkiet har tre nivåer:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Root-servere (13 logiske)",
              color: "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700",
              tc: "text-green-700 dark:text-green-300",
              points: ["~1892 fysiske instanser globalt", "Vet hvilken TLD-server som håndterer .no, .com etc.", "Lagrer NS- og A-record for alle TLD-servere", "Eks: l.root-servers.net (199.7.83.42)"],
            },
            {
              title: "TLD-servere",
              color: "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700",
              tc: "text-blue-700 dark:text-blue-300",
              points: ["Håndterer .no, .com, .edu, .org ...", "Vet autoritativ server for hvert domene", ".no TLD: i.nic.no (194.146.106.6)", "Lagrer NS- og A-record for autoritative servere"],
            },
            {
              title: "Autoritative servere",
              color: "bg-purple-50 dark:bg-purple-950/20 border-purple-300 dark:border-purple-700",
              tc: "text-purple-700 dark:text-purple-300",
              points: ["Organisasjonens egne DNS-servere", "Har faktisk A-record for hvert hostname", "Eks: ns02.hib.no (158.37.87.5) for hvl.no", "www.hvl.no → 158.37.32.44"],
            },
          ].map(({ title, color, tc, points }) => (
            <div key={title} className={`rounded-lg border p-4 ${color}`}>
              <h3 className={`font-semibold text-sm mb-2 ${tc}`}>{title}</h3>
              <ul className="text-xs space-y-1 list-disc list-inside text-[var(--foreground)]">
                {points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* DNS Resource Records */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">DNS Resource Records (RR)</h2>
        <p className="text-sm text-[var(--muted)]">Format: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(name, value, type, ttl)</code></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { type: "A", desc: "IPv4-adresse", detail: "name=hostname, value=IP-adresse", example: "(www.hvl.no, 158.37.32.44, A, 86400)" },
            { type: "AAAA", desc: "IPv6-adresse", detail: "name=hostname, value=IPv6-adresse", example: "(www.hvl.no, 2001:db8::1, AAAA, 86400)" },
            { type: "NS", desc: "Navneserver", detail: "name=domene, value=autoritativ navneserver", example: "(hvl.no, ns02.hib.no, NS, ...)" },
            { type: "CNAME", desc: "Kanonisk alias", detail: "name=alias, value=kanonisk navn", example: "(www.ibm.com, servereast.backup2.ibm.com, CNAME, ...)" },
            { type: "MX", desc: "E-post-tjener", detail: "name=domene, value=mailserver-navn", example: "(hvl.no, mail.hvl.no, MX, ...)" },
            { type: "SOA", desc: "Start of Authority", detail: "Primær navneserver, admin-epost, serienummer", example: "(hvl.no, ns01.hib.no, SOA, ...)" },
          ].map(({ type, desc, detail, example }) => (
            <div key={type} className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded text-sm">type={type}</span>
                <span className="text-sm text-[var(--muted)]">{desc}</span>
              </div>
              <p className="text-xs text-[var(--muted)]">{detail}</p>
              <code className="text-xs text-green-600 dark:text-green-400 block mt-1">{example}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Interaktivt DNS-oppslag */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">DNS-oppslag steg for steg — interaktivt</h2>
        <p className="text-sm text-[var(--muted)]">Klikk gjennom for å se hva som skjer ved oppslaget av <strong>www.hvl.no</strong> (iterativ):</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDnsStep(Math.max(0, dnsStep - 1))}
            disabled={dnsStep === 0}
            className="px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm disabled:opacity-40 hover:bg-blue-200"
          >
            ← Forrige
          </button>
          <span className="text-sm text-[var(--muted)]">Steg {dnsStep + 1} av {dnsSteps.length}</span>
          <button
            onClick={() => setDnsStep(Math.min(dnsSteps.length - 1, dnsStep + 1))}
            disabled={dnsStep === dnsSteps.length - 1}
            className="px-3 py-1.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm disabled:opacity-40 hover:bg-blue-200"
          >
            Neste →
          </button>
          <button onClick={() => setDnsStep(0)} className="px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">
            Tilbakestill
          </button>
        </div>

        <div className="rounded-lg bg-[var(--card)] border-2 border-blue-300 dark:border-blue-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
              {dnsSteps[dnsStep].num}
            </span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{dnsSteps[dnsStep].actor}</span>
          </div>
          <p className="text-sm font-medium mb-2">{dnsSteps[dnsStep].message}</p>
          <p className="text-xs text-[var(--muted)] italic">{dnsSteps[dnsStep].detail}</p>
        </div>

        <div className="flex gap-1">
          {dnsSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setDnsStep(i)}
              className={`flex-1 h-2 rounded-full transition-colors ${i <= dnsStep ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
            />
          ))}
        </div>
      </section>

      {/* Caching og TTL */}
      <section className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Caching og TTL</h3>
        <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
          <li>DNS-svar caches i <strong>TTL</strong> sekunder — vanligvis 86400 (24 timer)</li>
          <li>Caching reduserer belastningen på root- og TLD-servere drastisk</li>
          <li>En gang oppslått gjenbrukes svaret uten å spørre root igjen inntil TTL utløper</li>
          <li>Problematisk ved IP-endringer: Gammel cache peker til feil adresse inntil TTL utløper</li>
        </ul>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hva du MÅ kunne</h3>
        <ul className="text-sm space-y-1 list-disc list-inside text-[var(--foreground)]">
          <li>Forklare hierarkisk navnerom: noder, kanter, løvnoder og stinavn</li>
          <li>Forklare iterativ vs rekursiv navneoppløsning — og forskjellene</li>
          <li>Beskrive DNS-hierarkiet med tre nivåer og hva hvert nivå lagrer</li>
          <li>Forklare DNS RR-typer: A, AAAA, NS, CNAME, MX</li>
          <li>Gå gjennom et DNS-oppslag steg for steg</li>
          <li>Forklare caching og TTL</li>
        </ul>
      </section>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-6/teori/6-1" className="hover:text-[var(--accent)] text-sm">
          ← 6.1 Flat navngiving
        </Link>
        <Link href="/dat110/ds-6/teori/6-3" className="hover:text-[var(--accent)] text-sm">
          6.3 DHT og Chord →
        </Link>
      </div>
    </div>
  );
}
