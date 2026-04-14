"use client";

import { useState } from "react";
import Link from "next/link";

const ldapOperations = [
  {
    op: "bind",
    desc: "Autentiser mot LDAP-serveren (anonym eller med brukernavn/passord)",
    example: 'ldap_bind($conn, "cn=admin,dc=hvl,dc=no", "passord")',
  },
  {
    op: "search",
    desc: "Søk etter oppføringer basert på filter og attributter",
    example: 'ldap_search($conn, "dc=hvl,dc=no", "(mail=erlend@hvl.no)")',
  },
  {
    op: "add",
    desc: "Legg til ny oppføring i DIT",
    example: 'ldap_add($conn, "cn=Erlend,ou=studenter,dc=hvl,dc=no", $attrs)',
  },
  {
    op: "modify",
    desc: "Endre attributter på en eksisterende oppføring",
    example: 'ldap_modify($conn, "cn=Erlend,ou=studenter,dc=hvl,dc=no", $changes)',
  },
  {
    op: "delete",
    desc: "Slett en oppføring fra DIT",
    example: 'ldap_delete($conn, "cn=Erlend,ou=studenter,dc=hvl,dc=no")',
  },
  {
    op: "compare",
    desc: "Sjekk om en oppføring har en bestemt attributtverdi",
    example: 'ldap_compare($conn, $dn, "mail", "erlend@hvl.no")',
  },
];

const comparisonData = [
  {
    aspect: "Navngiving",
    flat: "Globalt unikt navn (f.eks. MAC-adresse)",
    strukturert: "Hierarkisk path (f.eks. /hvl/studenter/erlend)",
    attributtbasert: "Attributtfilter (f.eks. mail=erlend@hvl.no)",
  },
  {
    aspect: "Oppslag",
    flat: "Broadcasting eller hjemmebasert proxy",
    strukturert: "Traverser navnetrestrukturen",
    attributtbasert: "Søk mot directory service (LDAP)",
  },
  {
    aspect: "Skalerbarhet",
    flat: "Dårlig — broadcast gir O(N) trafikk",
    strukturert: "God — distribuert over DNS-servere",
    attributtbasert: "Moderat — LDAP kan repliseres",
  },
  {
    aspect: "Fleksibilitet",
    flat: "Lav — faste identifikatorer",
    strukturert: "Moderat — fast hierarki",
    attributtbasert: "Høy — søk på vilkårlig attributt",
  },
  {
    aspect: "Typisk bruk",
    flat: "ARP, DHT, Ethernet",
    strukturert: "DNS, filsystemer, URL",
    attributtbasert: "LDAP, Active Directory, X.500",
  },
  {
    aspect: "Eksempel",
    flat: "Finn IP for MAC AA:BB:CC:DD",
    strukturert: "Finn IP for www.hvl.no",
    attributtbasert: "Finn alle ansatte ved avdeling=IKT",
  },
];

export default function DS6_4Page() {
  const [activeOp, setActiveOp] = useState(0);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-6/teori" className="hover:text-[var(--accent)]">
          ← Alle delkapitler
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">6.4 Attributtbasert navngiving</span>
      </div>

      <h1 className="text-2xl font-bold">6.4 Attributtbasert navngiving</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Navngiving basert på attributter og egenskaper: LDAP og directory services for fleksibelt
        oppslag.
      </p>

      {/* Introduksjon */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Hva er attributtbasert navngiving?</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          I de to foregående kapitlene brukte vi enten et fast unikt navn (flat navngiving) eller en
          hierarkisk path (strukturert navngiving). Attributtbasert navngiving er annerledes: en
          ressurs har ingen fast adresse — du finner den ved å <strong>beskrive egenskaper</strong>{" "}
          du ønsker, og directory-tjenesten finner alle oppføringer som matcher.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-2xl mb-2">📛</div>
            <h3 className="font-semibold text-sm mb-1">Flat navngiving</h3>
            <p className="text-xs text-[var(--muted)]">"Finn noden med ID 14" — direkte oppslag på unik identifikator</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            <div className="text-2xl mb-2">🌳</div>
            <h3 className="font-semibold text-sm mb-1">Strukturert navngiving</h3>
            <p className="text-xs text-[var(--muted)]">"Finn /hvl/ikt/erlend" — traverser hierarki fra roten</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 border-blue-500/40 bg-blue-500/5">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-semibold text-sm mb-1">Attributtbasert navngiving</h3>
            <p className="text-xs text-[var(--muted)]">"Finn alle med avdeling=IKT og rolle=student" — søk på egenskaper</p>
          </div>
        </div>
      </section>

      {/* Directory Services */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Directory Services</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          En <strong>directory service</strong> er en spesialisert database optimalisert for
          lesing og søk (ikke skriving). Den lagrer oppføringer med attributter, og lar deg søke
          på kombinasjoner av attributtverdier. Typiske bruksområder: brukerdatabaser,
          adressebøker, nettverksressurser.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-semibold mb-3">Kjente directory services</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▶</span>
                <span><strong className="text-[var(--foreground)]">X.500</strong> — ISO-standard, hierarkisk, tung å implementere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▶</span>
                <span><strong className="text-[var(--foreground)]">LDAP</strong> — Lightweight Directory Access Protocol, forenklet X.500 over TCP/IP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▶</span>
                <span><strong className="text-[var(--foreground)]">Active Directory</strong> — Microsofts implementasjon av LDAP + Kerberos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▶</span>
                <span><strong className="text-[var(--foreground)]">OpenLDAP</strong> — åpen kildekode-implementasjon</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
            <h3 className="font-semibold mb-3">Typisk bruk</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Autentisering: sjekk brukernavn/passord mot LDAP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>E-postadressebok: finn e-post for alle i avdeling X</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Tilgangskontroll: hvilke grupper er brukeren i?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>SSO (Single Sign-On): én innlogging for mange systemer</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DIT og DN */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">DIT og Distinguished Name</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Directory Information Tree (DIT)</h3>
            <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
              LDAP organiserer oppføringer i et tre kalt DIT. Hvert node i treet er en{" "}
              <strong>entry</strong> med attributter. Treet har en rot og grener ned til
              individuelle oppføringer.
            </p>
            {/* DIT SVG */}
            <svg viewBox="0 0 320 220" className="w-full max-w-sm mx-auto" style={{ fontFamily: "monospace" }}>
              {/* Lines */}
              <line x1="160" y1="30" x2="80" y2="80" stroke="var(--card-border)" strokeWidth="1.5" />
              <line x1="160" y1="30" x2="240" y2="80" stroke="var(--card-border)" strokeWidth="1.5" />
              <line x1="80" y1="95" x2="50" y2="145" stroke="var(--card-border)" strokeWidth="1.5" />
              <line x1="80" y1="95" x2="110" y2="145" stroke="var(--card-border)" strokeWidth="1.5" />
              <line x1="240" y1="95" x2="210" y2="145" stroke="var(--card-border)" strokeWidth="1.5" />
              <line x1="240" y1="95" x2="270" y2="145" stroke="var(--card-border)" strokeWidth="1.5" />
              <line x1="50" y1="160" x2="50" y2="190" stroke="var(--card-border)" strokeWidth="1.5" />

              {/* Root */}
              <rect x="120" y="14" width="80" height="24" rx="4" fill="#3b82f620" stroke="#3b82f6" strokeWidth="1" />
              <text x="160" y="30" textAnchor="middle" fontSize="9" fill="#3b82f6" dy="3">dc=hvl,dc=no</text>

              {/* Level 2 */}
              <rect x="45" y="79" width="70" height="22" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
              <text x="80" y="91" textAnchor="middle" fontSize="8" fill="var(--muted)" dy="3">ou=studenter</text>

              <rect x="205" y="79" width="70" height="22" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
              <text x="240" y="91" textAnchor="middle" fontSize="8" fill="var(--muted)" dy="3">ou=ansatte</text>

              {/* Level 3 */}
              <rect x="14" y="143" width="72" height="22" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
              <text x="50" y="155" textAnchor="middle" fontSize="7.5" fill="var(--muted)" dy="3">cn=Erlend</text>

              <rect x="74" y="143" width="72" height="22" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
              <text x="110" y="155" textAnchor="middle" fontSize="7.5" fill="var(--muted)" dy="3">cn=Kari</text>

              <rect x="174" y="143" width="72" height="22" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
              <text x="210" y="155" textAnchor="middle" fontSize="7.5" fill="var(--muted)" dy="3">cn=Per</text>

              <rect x="234" y="143" width="72" height="22" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
              <text x="270" y="155" textAnchor="middle" fontSize="7.5" fill="var(--muted)" dy="3">cn=Lisa</text>

              {/* Attributter */}
              <rect x="8" y="183" width="84" height="30" rx="4" fill="#10b98120" stroke="#10b981" strokeWidth="1" />
              <text x="50" y="193" textAnchor="middle" fontSize="6.5" fill="#10b981" dy="3">mail: erlend@hvl.no</text>
              <text x="50" y="206" textAnchor="middle" fontSize="6.5" fill="#10b981">avd: IKT</text>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Distinguished Name (DN)</h3>
            <p className="text-sm text-[var(--muted)] mb-3 leading-relaxed">
              Hver oppføring i DIT har et unikt <strong>Distinguished Name (DN)</strong> som
              beskriver den fullstendige stien fra oppføringen til roten av treet.
            </p>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 space-y-3">
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Eksempel-DN:</p>
                <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded block">
                  cn=Erlend, ou=studenter, dc=hvl, dc=no
                </code>
              </div>
              <div className="border-t border-[var(--card-border)] pt-3 space-y-2">
                <p className="text-xs font-semibold text-[var(--muted)]">Attributttyper:</p>
                {[
                  { abbr: "cn", full: "Common Name", ex: "Erlend Moheim" },
                  { abbr: "ou", full: "Organizational Unit", ex: "studenter, ansatte" },
                  { abbr: "dc", full: "Domain Component", ex: "hvl, no" },
                  { abbr: "o", full: "Organization", ex: "HVL" },
                  { abbr: "mail", full: "E-postadresse", ex: "erlend@hvl.no" },
                  { abbr: "uid", full: "User ID", ex: "h184901" },
                ].map(({ abbr, full, ex }) => (
                  <div key={abbr} className="flex gap-2 text-xs">
                    <span className="font-mono text-blue-400 w-10 shrink-0">{abbr}</span>
                    <span className="text-[var(--foreground)] w-36 shrink-0">{full}</span>
                    <span className="text-[var(--muted)]">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LDAP-operasjoner */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">LDAP-operasjoner</h2>
        <p className="text-sm text-[var(--muted)]">
          Klikk på en operasjon for å se detaljer og eksempel:
        </p>
        <div className="flex flex-wrap gap-2">
          {ldapOperations.map((op, i) => (
            <button
              key={op.op}
              onClick={() => setActiveOp(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
                activeOp === i
                  ? "bg-blue-500 text-white"
                  : "border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {op.op}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-3">
          <h3 className="font-semibold text-blue-400 font-mono">{ldapOperations[activeOp].op}</h3>
          <p className="text-sm text-[var(--muted)]">{ldapOperations[activeOp].desc}</p>
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">Eksempel (PHP):</p>
            <code className="text-xs text-green-400 bg-[var(--card-bg)] border border-[var(--card-border)] px-3 py-2 rounded block overflow-x-auto whitespace-nowrap">
              {ldapOperations[activeOp].example}
            </code>
          </div>
        </div>

        {/* Search filter */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
          <h3 className="font-semibold mb-3">LDAP-søkefilter-syntaks</h3>
          <p className="text-sm text-[var(--muted)] mb-3">
            LDAP bruker prefiks-notasjon (polsk notasjon) for søkefiltre:
          </p>
          <div className="space-y-2">
            {[
              { filter: "(mail=erlend@hvl.no)", desc: "Eksakt match på e-post" },
              { filter: "(cn=Erl*)", desc: "Wildcard: navn som starter med 'Erl'" },
              { filter: "(&(ou=studenter)(avd=IKT))", desc: "AND: studenter OG avdeling IKT" },
              { filter: "(|(avd=IKT)(avd=AI))", desc: "OR: avdeling IKT eller AI" },
              { filter: "(!( avd=HR))", desc: "NOT: ikke i HR-avdeling" },
            ].map(({ filter, desc }) => (
              <div key={filter} className="flex gap-3 text-sm items-start">
                <code className="text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-0.5 rounded shrink-0">{filter}</code>
                <span className="text-[var(--muted)]">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LDAP-sesjon */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">En typisk LDAP-sesjon</h2>
        <div className="space-y-2">
          {[
            { step: 1, icon: "🔌", title: "Koble til", desc: "Klient åpner TCP-tilkobling til LDAP-server (port 389 eller 636 for LDAPS)" },
            { step: 2, icon: "🔑", title: "bind", desc: "Autentiser med DN og passord (eller anonym bind)" },
            { step: 3, icon: "🔍", title: "search", desc: "Send søkefilter og spesifiser base-DN og søkedybde (base/one/sub)" },
            { step: 4, icon: "📋", title: "Motta svar", desc: "Server returnerer matchende oppføringer med ønskede attributter" },
            { step: 5, icon: "✏️", title: "modify (valgfritt)", desc: "Gjør endringer i oppføringer (krever skrivetilgang)" },
            { step: 6, icon: "🚪", title: "unbind", desc: "Avslutt sesjonen og lukk tilkoblingen" },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="flex gap-4 items-start">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 mt-0.5">
                {step}
              </div>
              <div className="flex-1 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-3">
                <span className="mr-2">{icon}</span>
                <span className="font-mono text-sm font-semibold text-blue-400">{title}</span>
                <span className="text-sm text-[var(--muted)] ml-2">— {desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sammenligning */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sammenligning: Alle tre navngivingstyper</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4 text-[var(--muted)] font-medium w-32">Aspekt</th>
                <th className="text-left py-2 px-3 text-[var(--muted)] font-medium">Flat navngiving</th>
                <th className="text-left py-2 px-3 text-[var(--muted)] font-medium">Strukturert navngiving</th>
                <th className="text-left py-2 px-3 text-blue-400 font-medium">Attributtbasert</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className="border-b border-[var(--card-border)] hover:bg-[var(--card-bg)]">
                  <td className="py-2.5 pr-4 font-medium text-xs text-[var(--muted)] uppercase tracking-wide">{row.aspect}</td>
                  <td className="py-2.5 px-3 text-xs text-[var(--muted)]">{row.flat}</td>
                  <td className="py-2.5 px-3 text-xs text-[var(--muted)]">{row.strukturert}</td>
                  <td className="py-2.5 px-3 text-xs text-blue-400">{row.attributtbasert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-blue-400">Hva du MÅ kunne</h2>
        <ul className="space-y-2">
          {[
            "Forklare forskjellen mellom flat, strukturert og attributtbasert navngiving",
            "Hva er en directory service, og hva er den optimalisert for (lesing/søk)?",
            "Hva er DIT (Directory Information Tree) og DN (Distinguished Name)?",
            "Kjenne til LDAP-operasjonene: bind, search, add, modify, delete, compare",
            "Lese og skrive enkle LDAP-søkefiltre med AND (&), OR (|), NOT (!)",
            "Forstå en typisk LDAP-sesjon (connect → bind → search → unbind)",
            "Gi eksempler på systemer som bruker LDAP (Active Directory, OpenLDAP)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-blue-400 mt-0.5 shrink-0">✓</span>
              <span className="text-[var(--muted)]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link
          href="/dat110/ds-6/teori/6-3"
          className="hover:text-[var(--accent)] text-sm"
        >
          ← 6.3 DHT og Chord
        </Link>
        <div />
      </div>
    </div>
  );
}
