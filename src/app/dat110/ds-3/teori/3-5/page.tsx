"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS3_5Page() {
  const [mobilityType, setMobilityType] = useState<"svak" | "sterk">("svak");
  const [initiatorType, setInitiatorType] = useState<"sender" | "receiver">("sender");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-3/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">3.5 Kode-migrasjon</span>
      </div>

      <h1 className="text-2xl font-bold">3.5 Kode-migrasjon</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Kode-migrasjon er prosessen med å flytte kode (og evt. tilstand) mellom noder i et distribuert system.
        Det er en nøkkelmekanisme for fleksibilitet, ytelse og nærhet til data.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips</p>
        <p className="text-amber-900 dark:text-amber-200">
          Kode-migrasjon er pensum fra kapittel 3 (van Steen &amp; Tanenbaum) og er knyttet til
          virtualisering og portabilitet. Kjenn de tre segmentene (kode, data, utførelse),
          svak vs sterk mobilitet, og sender- vs receiver-initiert migrasjon.
          Koble gjerne til Docker som eksempel på svak mobilitet.
        </p>
      </div>

      {/* Hvorfor flytte kode */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hvorfor flytte kode?</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Ytelse</h3>
            <p>Flytt beregning nær dataene i stedet for å flytte store datamengder over nettverket.
            Eksempel: databasespørring kjøres på databaseserveren.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Fleksibilitet</h3>
            <p>Klienter kan laste ned og kjøre kode dynamisk (f.eks. Java Applets, JavaScript).
            Systemet kan oppdateres uten å reinstallere alt.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Nærhet til ressurser</h3>
            <p>Flytt prosessering til en node med tilgang til spesielle ressurser (GPU, sensordata, spesifikk hardware).</p>
          </div>
        </div>
      </section>

      {/* De tre segmentene */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">De tre segmentene i en kjørende prosess</h2>
        <p className="text-sm text-[var(--muted)]">
          For å forstå kode-migrasjon må vi vite hva som kan flyttes. En prosess består av tre segmenter:
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
          <svg viewBox="0 0 500 130" className="w-full max-w-lg mx-auto p-4">
            {/* Code segment */}
            <rect x="20" y="15" width="140" height="100" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
            <text x="90" y="38" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Kode-segment</text>
            <text x="90" y="58" textAnchor="middle" fill="#374151" fontSize="10">Programkoden</text>
            <text x="90" y="73" textAnchor="middle" fill="#374151" fontSize="10">(instruksjoner)</text>
            <text x="90" y="95" textAnchor="middle" fill="#6b7280" fontSize="9">Overførbar: lett</text>
            <text x="90" y="108" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Alltid med</text>
            {/* Data segment */}
            <rect x="180" y="15" width="140" height="100" rx="6" fill="#c7d2fe" stroke="#818cf8" strokeWidth="2"/>
            <text x="250" y="38" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="bold">Data-segment</text>
            <text x="250" y="58" textAnchor="middle" fill="#374151" fontSize="10">Variabelverdier,</text>
            <text x="250" y="73" textAnchor="middle" fill="#374151" fontSize="10">filer, ressurser</text>
            <text x="250" y="95" textAnchor="middle" fill="#6b7280" fontSize="9">Komplisert (referanser)</text>
            <text x="250" y="108" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Kan flyttes</text>
            {/* Execution segment */}
            <rect x="340" y="15" width="140" height="100" rx="6" fill="#fde68a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="410" y="33" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Utførelses-</text>
            <text x="410" y="48" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">segment</text>
            <text x="410" y="68" textAnchor="middle" fill="#374151" fontSize="10">Programteller (PC),</text>
            <text x="410" y="83" textAnchor="middle" fill="#374151" fontSize="10">stack, registre</text>
            <text x="410" y="98" textAnchor="middle" fill="#6b7280" fontSize="9">Svært vanskelig</text>
            <text x="410" y="112" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Krevende!</text>
          </svg>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30">
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Segment</th>
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Innhold</th>
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Overførbarhet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="px-4 py-2 font-medium text-blue-600 dark:text-blue-400">Kode-segment</td>
                <td className="px-4 py-2 text-[var(--muted)]">Programkode (instruksjoner)</td>
                <td className="px-4 py-2 text-green-600 dark:text-green-400 font-medium">Lett — statisk kode</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-indigo-600 dark:text-indigo-400">Data-segment</td>
                <td className="px-4 py-2 text-[var(--muted)]">Variabler, heap, åpne filer, eksterne refs</td>
                <td className="px-4 py-2 text-amber-600 dark:text-amber-400 font-medium">Middels — referanser er problematiske</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-yellow-600 dark:text-yellow-400">Utførelses-segment</td>
                <td className="px-4 py-2 text-[var(--muted)]">Programteller, stack, registre — kjøretilstand</td>
                <td className="px-4 py-2 text-red-600 dark:text-red-400 font-medium">Svært vanskelig — avhenger av hardware</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Svak vs sterk mobilitet */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Svak vs Sterk mobilitet</h2>

        <div className="flex gap-2">
          {(["svak", "sterk"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMobilityType(m)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                mobilityType === m
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {m === "svak" ? "Svak mobilitet" : "Sterk mobilitet"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-4">
          {mobilityType === "svak" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">Svak mobilitet (Weak mobility)</h3>
              <p className="text-sm">
                Bare <strong>kode-segmentet</strong> (og evt. data) flyttes. Utførelses-segmentet
                (kjøringstilstanden) flyttes <em>ikke</em>. Programmet startes <strong>på nytt</strong>
                på mål-noden. Ingen "live migration" av en kjørende prosess.
              </p>
              <svg viewBox="0 0 440 130" className="w-full max-w-md">
                {/* Source node */}
                <rect x="10" y="10" width="160" height="110" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
                <text x="90" y="30" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Kilde-node</text>
                <rect x="20" y="38" width="140" height="25" rx="3" fill="#bfdbfe"/>
                <text x="90" y="55" textAnchor="middle" fill="#1e40af" fontSize="10">Kode-segment</text>
                <rect x="20" y="67" width="140" height="20" rx="3" fill="#93c5fd" opacity="0.5"/>
                <text x="90" y="81" textAnchor="middle" fill="#6b7280" fontSize="9">(Data — valgfritt)</text>
                <rect x="20" y="91" width="140" height="20" rx="3" fill="#e5e7eb"/>
                <text x="90" y="105" textAnchor="middle" fill="#9ca3af" fontSize="9">Utførelse — IKKE flyttet</text>
                {/* Arrow */}
                <line x1="170" y1="52" x2="250" y2="52" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrmig)"/>
                <text x="210" y="42" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">Kode overføres</text>
                {/* Target node */}
                <rect x="250" y="10" width="170" height="110" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
                <text x="335" y="30" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Mål-node</text>
                <rect x="260" y="38" width="150" height="25" rx="3" fill="#a7f3d0"/>
                <text x="335" y="55" textAnchor="middle" fill="#065f46" fontSize="10">Kode-segment</text>
                <rect x="260" y="67" width="150" height="20" rx="3" fill="#6ee7b7" opacity="0.6"/>
                <text x="335" y="81" textAnchor="middle" fill="#065f46" fontSize="9">(Data — initialisert)</text>
                <rect x="260" y="91" width="150" height="20" rx="3" fill="#10b981" opacity="0.7"/>
                <text x="335" y="105" textAnchor="middle" fill="white" fontSize="9">Starter fra begynnelsen</text>
                <defs>
                  <marker id="arrmig" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/>
                  </marker>
                </defs>
              </svg>
              <div className="text-sm space-y-2">
                <p className="font-semibold text-blue-600 dark:text-blue-400">Eksempler:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>JavaScript i nettleser:</strong> Klienten laster ned JS-kode fra server og kjører den lokalt</li>
                  <li><strong>Java Applets:</strong> Kode lastes ned fra server til klient-nettleser</li>
                  <li><strong>Docker-images:</strong> Container-image (kode + avhengigheter) flyttes, container starter fra scratch på ny node</li>
                  <li><strong>Mobile agenter:</strong> Agent-kode flyttes til dataserver nær dataene</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-xs">
                <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler med svak mobilitet:</p>
                <ul className="list-disc pl-3 space-y-1">
                  <li>Relativt enkel å implementere</li>
                  <li>Fungerer godt mellom heterogene systemer</li>
                  <li>Kode kan overføres kompilert (bytekode) eller som kildekode</li>
                </ul>
              </div>
            </>
          )}
          {mobilityType === "sterk" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">Sterk mobilitet (Strong mobility)</h3>
              <p className="text-sm">
                <strong>Alle tre segmentene</strong> flyttes — inkludert utførelses-segmentet (kjøretilstand).
                Prosessen <strong>fortsetter fra nøyaktig samme punkt</strong> på mål-noden som den var på
                kilde-noden. Dette kalles "live migration" av en kjørende prosess.
              </p>
              <svg viewBox="0 0 440 140" className="w-full max-w-md">
                <rect x="10" y="10" width="160" height="120" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"/>
                <text x="90" y="30" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Kilde-node</text>
                <rect x="20" y="38" width="140" height="22" rx="3" fill="#bfdbfe"/>
                <text x="90" y="53" textAnchor="middle" fill="#1e40af" fontSize="10">Kode-segment</text>
                <rect x="20" y="64" width="140" height="22" rx="3" fill="#93c5fd"/>
                <text x="90" y="79" textAnchor="middle" fill="#1e40af" fontSize="10">Data-segment</text>
                <rect x="20" y="90" width="140" height="30" rx="3" fill="#60a5fa"/>
                <text x="90" y="107" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Utførelses-segment</text>
                <text x="90" y="118" textAnchor="middle" fill="white" fontSize="8">(PC, stack, registre)</text>
                {/* Double arrow */}
                <line x1="170" y1="70" x2="248" y2="70" stroke="#8b5cf6" strokeWidth="2.5" markerEnd="url(#arrmig2)"/>
                <text x="209" y="60" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontWeight="bold">Hele tilstanden</text>
                <text x="209" y="88" textAnchor="middle" fill="#8b5cf6" fontSize="8">overføres!</text>
                <rect x="248" y="10" width="175" height="120" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2"/>
                <text x="335" y="30" textAnchor="middle" fill="#6d28d9" fontSize="11" fontWeight="bold">Mål-node</text>
                <rect x="258" y="38" width="155" height="22" rx="3" fill="#ddd6fe"/>
                <text x="335" y="53" textAnchor="middle" fill="#6d28d9" fontSize="10">Kode-segment</text>
                <rect x="258" y="64" width="155" height="22" rx="3" fill="#c4b5fd"/>
                <text x="335" y="79" textAnchor="middle" fill="#6d28d9" fontSize="10">Data-segment</text>
                <rect x="258" y="90" width="155" height="30" rx="3" fill="#8b5cf6"/>
                <text x="335" y="107" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Utførelses-segment</text>
                <text x="335" y="118" textAnchor="middle" fill="white" fontSize="8">Fortsetter fra SAMME sted!</text>
                <defs>
                  <marker id="arrmig2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#8b5cf6"/>
                  </marker>
                </defs>
              </svg>
              <div className="text-sm space-y-2">
                <p className="font-semibold text-blue-600 dark:text-blue-400">Eksempler:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li><strong>VM live migration:</strong> VMware/KVM kan flytte en kjørende VM fra én fysisk server til en annen uten avbrudd</li>
                  <li><strong>Checkpoint/restart:</strong> Lagre tilstand, flytt, fortsett — brukes i HPC (high-performance computing)</li>
                  <li><strong>Mobile agenter:</strong> En agent som er halvveis gjennom en oppgave migrerer til en annen node</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Ingen avbrudd i kjøring</li>
                    <li>Transparent for brukeren</li>
                    <li>Ideelt for lastbalansering</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1">
                    <li>Svært kompleks implementasjon</li>
                    <li>Krever homogene systemer (samme hardware)</li>
                    <li>Høy kommunikasjonskostnad</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Sender vs receiver-initiated */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Sender- vs Receiver-initiert migrasjon</h2>

        <div className="flex gap-2">
          {(["sender", "receiver"] as const).map(i => (
            <button
              key={i}
              onClick={() => setInitiatorType(i)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                initiatorType === i
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {i === "sender" ? "Sender-initiert" : "Receiver-initiert"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3 text-sm">
          {initiatorType === "sender" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Sender-initiert migrasjon</h3>
              <p>
                <strong>Kildenoden</strong> bestemmer seg for å sende koden til målnoden.
                Initiativet tas av den som sender koden.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Server sender kode til klient (f.eks. JavaScript fra webserver til nettleser)</li>
                <li>Brukes når senderen vet at mottakeren trenger koden</li>
                <li>Eksempel: Push-basert kode-distribusjon, mobile agenter sendt ut fra server</li>
                <li>Problem: Senderen vet kanskje ikke hva mottakeren trenger</li>
              </ul>
            </>
          )}
          {initiatorType === "receiver" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Receiver-initiert migrasjon</h3>
              <p>
                <strong>Målnoden</strong> ber om å få koden — den tar initiativet til migrasjonen.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>Klient ber om kode fra server (f.eks. nettleser laster ned JavaScript)</li>
                <li>Klienten vet hva den trenger og ber om det</li>
                <li>Eksempel: Plugin-nedlastning, dynamisk modul-lasting, container-pull (docker pull)</li>
                <li>Vanligst i praksis — klienten henter det den trenger</li>
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Migrasjon i heterogene systemer */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Migrasjon i heterogene systemer</h2>
        <p className="text-sm leading-relaxed">
          I distribuerte systemer er noder ofte heterogene — ulike hardware-arkitekturer og operativsystemer.
          Dette gjør kode-migrasjon utfordrende:
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-3 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">Problem: Maskin-avhengig kode</h3>
              <ul className="list-disc pl-4 text-xs space-y-1">
                <li>Kompilert maskinkode er maskin-spesifikk (x86 vs ARM)</li>
                <li>Utførelses-segment (registre, stack) er hardware-avhengig</li>
                <li>Sterk mobilitet krever identisk hardware på begge noder</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">Løsning: Virtuell maskin</h3>
              <ul className="list-disc pl-4 text-xs space-y-1">
                <li><strong>JVM/bytekode:</strong> Java-kode kompileres til plattform-uavhengig bytekode</li>
                <li><strong>Containere:</strong> Docker-images med alle avhengigheter pakket inn</li>
                <li><strong>Interpreter-baserte språk:</strong> Python, JavaScript — kildekode tolkes</li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-xs">
            <p className="font-semibold mb-1">Fra forelesning — kobling til virtualisering:</p>
            <p>
              Virtualisering er den viktigste mekanismen for å løse heterogenitetsproblemer i kode-migrasjon.
              En VM (f.eks. JVM) presenterer et <em>uniformt utførelsesmiljø</em> uavhengig av underliggende hardware.
              Docker gjør det samme for prosess-migrasjon mellom Linux-noder.
            </p>
          </div>
        </div>
      </section>

      {/* Sammenligningstabellen svak vs sterk */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Svak vs Sterk mobilitet — oppsummeringstabell</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30">
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Egenskap</th>
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Svak mobilitet</th>
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Sterk mobilitet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {[
                ["Segmenter som flyttes", "Kode (+ evt. data)", "Kode + Data + Utførelse"],
                ["Kjøring på mål", "Starter fra begynnelsen", "Fortsetter fra samme punkt"],
                ["Implementasjonskompleksitet", "Relativt enkel", "Svært kompleks"],
                ["Heterogene systemer", "Fungerer godt (bytekode/kildekode)", "Krever homogent miljø"],
                ["Avbrudd i kjøring", "Ja — prosessen starter på nytt", "Nei — sømløs migrasjon"],
                ["Typiske eksempler", "JavaScript, Docker, Java Applets", "VM live migration, checkpoint/restart"],
                ["Sender/receiver", "Begge varianter vanlig", "Begge varianter vanlig"],
              ].map(([egenskap, svak, sterk]) => (
                <tr key={egenskap} className="hover:bg-[var(--card)]">
                  <td className="px-4 py-2 font-medium">{egenskap}</td>
                  <td className="px-4 py-2 text-[var(--muted)]">{svak}</td>
                  <td className="px-4 py-2 text-[var(--muted)]">{sterk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">Hva du MÅ kunne til eksamen</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>De tre grunnene til kode-migrasjon: ytelse (nærhet til data), fleksibilitet, tilgang til ressurser</li>
          <li>De tre segmentene: kode (lett), data (middels), utførelse (svært vanskelig)</li>
          <li>Svak mobilitet: kun kode (+ evt. data) flyttes — prosessen starter fra scratch</li>
          <li>Sterk mobilitet: alle tre segmenter — prosessen fortsetter fra nøyaktig samme punkt</li>
          <li>Sender-initiert: kildenoden sender koden (push)</li>
          <li>Receiver-initiert: målnoden ber om koden (pull) — vanligst i praksis</li>
          <li>Heterogene systemer: bruk bytekode (JVM) eller containere (Docker) for plattform-uavhengig migrasjon</li>
          <li>Koble virtualisering til kode-migrasjon: VM/container løser heterogenitetsproblemet</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li><strong>Feil:</strong> "Svak og sterk mobilitet er det samme" — Svak starter fra scratch, sterk fortsetter fra samme punkt</li>
          <li><strong>Feil:</strong> Glemme utførelses-segmentet — det er det som gjør sterk mobilitet svært vanskelig</li>
          <li><strong>Feil:</strong> Tro at sender-initiert alltid er server → klient — kan være begge veier</li>
          <li><strong>Feil:</strong> Ikke koble Docker til kode-migrasjon — Docker er svak mobilitet!</li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-3/teori/3-4" className="hover:text-[var(--accent)] text-sm">← 3.4 Server-design</Link>
        <div />
      </div>
    </div>
  );
}
