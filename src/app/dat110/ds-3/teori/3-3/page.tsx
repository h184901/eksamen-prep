"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS3_3Page() {
  const [clientView, setClientView] = useState<"thin" | "fat">("thin");
  const [showXWindow, setShowXWindow] = useState(false);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-3/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">3.3 Klient-design</span>
      </div>

      <h1 className="text-2xl font-bold">3.3 Klient-design</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Klienten er porten brukeren bruker for å nå distribuerte tjenester. Klient-design handler om
        hvordan applikasjoner skjuler kompleksiteten av distribusjonen for brukeren (distribusjon-transparens).
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips</p>
        <p className="text-amber-900 dark:text-amber-200">
          Oppgave 7 i mai 2024 spurte om formålet med multithreading og callback i RPC-design — dette er
          direkte relatert til klient-design. Husk: tråder skjuler kommunikasjonslatens fra bruker.
          Kjenn thin vs fat client, og hva klient-side proxy gjør for distribusjonssertifikat-transparens.
        </p>
      </div>

      {/* Multithreaded klienter */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Multithreaded klienter</h2>
        <p className="text-sm leading-relaxed">
          I et distribuert system må klienten ofte vente på svar fra fjerne servere.
          Den viktigste bruken av multithreading på klient-siden er å <strong>skjule kommunikasjonslatens</strong>
          fra brukeren. Mens én tråd venter på svar, kan en annen tråd fortsette med arbeid.
        </p>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">Eksempel: Nettleser (web browser)</h3>
          <p className="text-sm">En nettleser er et klassisk eksempel fra forelesningen på en multithreaded klient:</p>
          <ul className="text-sm list-disc pl-4 space-y-1">
            <li>Henter HTML, bilder, CSS og JavaScript <strong>samtidig</strong> via separate tråder</li>
            <li>Hver tråd åpner en separat nettverkstilkobling til serveren</li>
            <li>Siden vises fortløpende etterhvert som data ankommer — ikke vent til alt er lastet</li>
            <li>Kan åpne parallelle tilkoblinger til <em>replikerte servere</em> for å øke gjennomstrømning</li>
          </ul>

          <svg viewBox="0 0 480 160" className="w-full max-w-lg">
            {/* Browser */}
            <rect x="10" y="30" width="110" height="100" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
            <text x="65" y="50" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Nettleser</text>
            <rect x="20" y="58" width="90" height="18" rx="3" fill="#bfdbfe"/>
            <text x="65" y="71" textAnchor="middle" fill="#1e40af" fontSize="9">Tråd 1: HTML</text>
            <rect x="20" y="80" width="90" height="18" rx="3" fill="#bfdbfe"/>
            <text x="65" y="93" textAnchor="middle" fill="#1e40af" fontSize="9">Tråd 2: Bilder</text>
            <rect x="20" y="102" width="90" height="18" rx="3" fill="#bfdbfe"/>
            <text x="65" y="115" textAnchor="middle" fill="#1e40af" fontSize="9">Tråd 3: CSS/JS</text>
            {/* Arrows to servers */}
            <line x1="120" y1="68" x2="220" y2="55" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrc)"/>
            <line x1="120" y1="89" x2="220" y2="89" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrc)"/>
            <line x1="120" y1="111" x2="220" y2="123" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrc)"/>
            {/* Internet cloud */}
            <ellipse cx="270" cy="89" rx="45" ry="25" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
            <text x="270" y="93" textAnchor="middle" fill="#6b7280" fontSize="10">Internett</text>
            {/* Servers */}
            <rect x="330" y="35" width="90" height="30" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <text x="375" y="54" textAnchor="middle" fill="#065f46" fontSize="10">Server 1</text>
            <rect x="330" y="74" width="90" height="30" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <text x="375" y="93" textAnchor="middle" fill="#065f46" fontSize="10">Server 2</text>
            <rect x="330" y="113" width="90" height="30" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
            <text x="375" y="132" textAnchor="middle" fill="#065f46" fontSize="10">Server 3</text>
            <line x1="315" y1="55" x2="330" y2="52" stroke="#6b7280" strokeWidth="1.5"/>
            <line x1="315" y1="89" x2="330" y2="89" stroke="#6b7280" strokeWidth="1.5"/>
            <line x1="315" y1="123" x2="330" y2="126" stroke="#6b7280" strokeWidth="1.5"/>
            <text x="240" y="150" textAnchor="middle" fill="#6b7280" fontSize="9" fontStyle="italic">Parallelle tilkoblinger skjuler latens</text>
            <defs>
              <marker id="arrc" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
              </marker>
            </defs>
          </svg>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-sm">
            <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Fra forelesning — fordeler med multithreaded klient:</p>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Skjuler kommunikasjonslatens</strong> — data flyter til siden til alt er levert</li>
              <li><strong>Parallelle tilkoblinger</strong> — webservere kan replikeres, klient henter fra alle replika simultant</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Thin vs Fat client */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Thin client vs Fat client</h2>
        <p className="text-sm text-[var(--muted)]">
          Klienter varierer i hvor mye av applikasjonslogikken som kjøres lokalt. Toggle mellom de to:
        </p>

        <div className="flex gap-2">
          {(["thin", "fat"] as const).map(t => (
            <button
              key={t}
              onClick={() => setClientView(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                clientView === t
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {t === "thin" ? "Thin Client" : "Fat Client"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
          {clientView === "thin" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">Thin Client</h3>
              <p className="text-sm">
                En thin client gjør <strong>minimalt med prosessering lokalt</strong>. Den sender
                brukerinndata til serveren og viser resultater. All applikasjonslogikk og datalagring
                skjer på server-siden.
              </p>
              <svg viewBox="0 0 400 130" className="w-full max-w-md">
                <rect x="20" y="20" width="120" height="90" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
                <text x="80" y="42" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Thin Client</text>
                <rect x="30" y="50" width="100" height="25" rx="3" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1"/>
                <text x="80" y="67" textAnchor="middle" fill="#374151" fontSize="9">UI / Display only</text>
                <rect x="30" y="80" width="100" height="25" rx="3" fill="#fee2e2"/>
                <text x="80" y="97" textAnchor="middle" fill="#991b1b" fontSize="8">Ingen lokal logikk</text>
                <line x1="140" y1="65" x2="200" y2="65" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrc2)" markerStart="url(#arrc2start)"/>
                <text x="170" y="58" textAnchor="middle" fill="#6b7280" fontSize="8">input/output</text>
                <rect x="200" y="20" width="160" height="90" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
                <text x="280" y="42" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Server</text>
                <rect x="210" y="50" width="140" height="22" rx="3" fill="#a7f3d0"/>
                <text x="280" y="65" textAnchor="middle" fill="#065f46" fontSize="9">Applikasjonslogikk</text>
                <rect x="210" y="76" width="140" height="22" rx="3" fill="#a7f3d0"/>
                <text x="280" y="91" textAnchor="middle" fill="#065f46" fontSize="9">Database / Data</text>
                <defs>
                  <marker id="arrc2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                  </marker>
                  <marker id="arrc2start" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                  </marker>
                </defs>
              </svg>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Enkel administrasjon (alt sentralt)</li>
                    <li>Lavt krav til klienthardware</li>
                    <li>Enkel oppdatering (kun server)</li>
                    <li>Bedre sikkerhet og datastyring</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Høy nettverkstrafikk og serverbyrde</li>
                    <li>Fungerer ikke uten nettverkstilkobling</li>
                    <li>Høy latens for interaktive applikasjoner</li>
                    <li>Server er flaskehals</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)]">Eksempler: Web-terminal, Citrix, klassisk mainframe-terminal</p>
            </>
          )}
          {clientView === "fat" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">Fat Client (Rich Client)</h3>
              <p className="text-sm">
                En fat client gjør <strong>mye prosessering lokalt</strong>. Applikasjonslogikk kjøres
                på klientmaskinen. Serveren brukes primært for datalagring og koordinering.
              </p>
              <svg viewBox="0 0 400 130" className="w-full max-w-md">
                <rect x="20" y="20" width="160" height="90" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
                <text x="100" y="40" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Fat Client</text>
                <rect x="30" y="48" width="140" height="20" rx="3" fill="#bfdbfe"/>
                <text x="100" y="62" textAnchor="middle" fill="#1e40af" fontSize="9">UI</text>
                <rect x="30" y="72" width="140" height="20" rx="3" fill="#93c5fd"/>
                <text x="100" y="86" textAnchor="middle" fill="#1e3a5f" fontSize="9">Applikasjonslogikk (lokalt)</text>
                <rect x="30" y="96" width="140" height="14" rx="3" fill="#60a5fa" opacity="0.6"/>
                <text x="100" y="107" textAnchor="middle" fill="#1e3a5f" fontSize="8">Lokal cache / data</text>
                <line x1="180" y1="65" x2="230" y2="65" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrc3)"/>
                <text x="205" y="58" textAnchor="middle" fill="#6b7280" fontSize="8">data sync</text>
                <rect x="230" y="30" width="140" height="70" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
                <text x="300" y="52" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Server</text>
                <rect x="240" y="60" width="120" height="30" rx="3" fill="#a7f3d0"/>
                <text x="300" y="79" textAnchor="middle" fill="#065f46" fontSize="9">Database / Data</text>
                <defs>
                  <marker id="arrc3" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                  </marker>
                </defs>
              </svg>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Rask respons (lokal prosessering)</li>
                    <li>Kan fungere offline</li>
                    <li>Lavere serverbyrde</li>
                    <li>Rik brukeropplevelse</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-xs">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Krevende å oppdatere (deploy til alle klienter)</li>
                    <li>Krever kraftig klienthardware</li>
                    <li>Vanskeligere å administrere</li>
                    <li>Sikkerhetsproblemer (logikk på klienten)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)]">Eksempler: Microsoft Office, Spotify desktop-app, PC-spill, IDE-er</p>
            </>
          )}
        </div>
      </section>

      {/* Klient-side software for distribusjonssransparens */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Distribusjonssransparens i klienter
        </h2>
        <p className="text-sm leading-relaxed">
          Et sentralt mål i distribuerte systemer er å skjule at systemet er distribuert for brukeren.
          Klienter bidrar til dette gjennom <strong>klient-side proxy (stub)</strong> — en lokal
          representasjon av en ekstern server.
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-2">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">Klient-side stub (proxy)</h3>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li><strong>Tilgangs-transparens:</strong> Stub gjør at RPC-kall ser ut som lokale funksjonsanrop</li>
            <li><strong>Lokasjon-transparens:</strong> Klienten vet ikke om tjenesten er lokal eller ekstern</li>
            <li><strong>Replikerings-transparens:</strong> Stub kan sende til én av mange replikaer uten at klienten vet det</li>
            <li><strong>Feil-transparens:</strong> Stub kan automatisk prøve på nytt ved feil</li>
          </ul>
        </div>
      </section>

      {/* X Window System */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">X Window System-modellen</h2>
          <button
            onClick={() => setShowXWindow(!showXWindow)}
            className="text-sm px-3 py-1 rounded-lg border border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            {showXWindow ? "Skjul" : "Vis detaljer"}
          </button>
        </div>
        <p className="text-sm">
          X Window System er et interessant eksempel der rollene er snudd:
          <strong> display-serveren</strong> kjører på klientmaskinen, mens <strong>X-klienten</strong>
          (applikasjonen) kjører på en fjern server. Brukergrensesnittet distribueres til brukerens maskin.
        </p>
        {showXWindow && (
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3">
            <svg viewBox="0 0 440 130" className="w-full max-w-md">
              <rect x="10" y="15" width="160" height="100" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
              <text x="90" y="35" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Brukermaskin</text>
              <rect x="20" y="45" width="140" height="60" rx="4" fill="#bfdbfe"/>
              <text x="90" y="62" textAnchor="middle" fill="#1e40af" fontSize="10">X Display Server</text>
              <text x="90" y="78" textAnchor="middle" fill="#6b7280" fontSize="9">(håndterer mus, tastatur,</text>
              <text x="90" y="92" textAnchor="middle" fill="#6b7280" fontSize="9">skjerm for brukeren)</text>
              <line x1="170" y1="65" x2="250" y2="65" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrx)"/>
              <text x="210" y="57" textAnchor="middle" fill="#6b7280" fontSize="8">X Protocol</text>
              <rect x="250" y="15" width="170" height="100" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
              <text x="335" y="35" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Fjern server</text>
              <rect x="260" y="45" width="150" height="60" rx="4" fill="#a7f3d0"/>
              <text x="335" y="65" textAnchor="middle" fill="#065f46" fontSize="10">X-klient (applikasjon)</text>
              <text x="335" y="82" textAnchor="middle" fill="#6b7280" fontSize="9">f.eks. teksteditor,</text>
              <text x="335" y="95" textAnchor="middle" fill="#6b7280" fontSize="9">grafikk-applikasjon</text>
              <defs>
                <marker id="arrx" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                  <path d="M0,0 L5,2.5 L0,5 Z" fill="#6b7280"/>
                </marker>
              </defs>
            </svg>
            <p className="text-xs text-[var(--muted)]">
              X Window demonstrerer distribusjonssransparens: brukeren ser kun vinduet på sin skjerm,
              mens all applikasjonslogikk kjører på fjernserveren. Vanlig i Unix/Linux-systemer.
            </p>
          </div>
        )}
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">Hva du MÅ kunne til eksamen</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Formålet med multithreading i klienter: skjule kommunikasjonslatens</li>
          <li>Nettleser-eksemplet: parallelle tråder for HTML, bilder, CSS — fra forelesning</li>
          <li>Thin client: minimal lokal logikk, alt på server — enkel admin, men nettverksavhengig</li>
          <li>Fat client: rik lokal logikk — rask respons, offline-kapabel, men vanskeligere å deploye</li>
          <li>Klient-side stub/proxy og hvilke typer transparens den gir</li>
          <li>X Window System: display-server på klient, X-klient på fjern server</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li><strong>Feil:</strong> "Thin client er alltid bedre" — avhenger av behov (latens, offline, hardware)</li>
          <li><strong>Feil:</strong> Forveksle X Window-rollene — X-serveren er på klientmaskinen, ikke på fjernserveren</li>
          <li><strong>Feil:</strong> Glemme at tråder i klienten primært handler om å skjule latens, ikke bare parallelisme</li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-3/teori/3-2" className="hover:text-[var(--accent)] text-sm">← 3.2 Virtualisering</Link>
        <Link href="/dat110/ds-3/teori/3-4" className="hover:text-[var(--accent)] text-sm">3.4 Server-design →</Link>
      </div>
    </div>
  );
}
