"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS3_1Page() {
  const [activeTab, setActiveTab] = useState<"prosess" | "trad">("prosess");
  const [showModeller, setShowModeller] = useState<"many-one" | "one-one" | "many-many">("many-one");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-3/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">3.1 Tråder og prosesser</span>
      </div>

      <h1 className="text-2xl font-bold">3.1 Tråder og prosesser</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Prosesser og tråder er grunnleggende byggeklosser i distribuerte systemer.
        Forstå forskjellene og hvorfor tråder er kritiske for ytelse og distribusjon.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips (Oppgave 7)</p>
        <p className="text-amber-900 dark:text-amber-200">
          Oppgave 7 i januar 2025 spurte om stateful vs stateless servers.
          Mai 2024 spurte om formålet med multithreading og callback i RPC-design.
          Du MÅ kunne forklare hvorfor tråder brukes i distribuerte systemer, og forskjellen prosess vs tråd.
        </p>
      </div>

      {/* Teorisammendrag */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hva er en prosess?</h2>
        <p className="text-sm leading-relaxed">
          En <strong>prosess</strong> er et kjørende program — et program i utførelse. Operativsystemet gir
          hver prosess sitt eget isolerte <em>adresserom</em> (virtuelt minneområde). To prosesser kan ikke
          lese hverandres minne direkte uten spesielle mekanismer (IPC — Inter-Process Communication).
        </p>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm">
          <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Nøkkelegenskap ved prosesser:</p>
          <ul className="list-disc pl-4 space-y-1 text-[var(--foreground)]">
            <li>Eget, isolert adresserom (minne, globale variabler, heap, stack)</li>
            <li>Minimum én tråd (main-tråden)</li>
            <li>Kontekstbytte mellom prosesser er <strong>dyrt</strong> (OS bytter hele minnekontekst)</li>
            <li>Feil i én prosess krasjer ikke andre prosesser</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hva er en tråd?</h2>
        <p className="text-sm leading-relaxed">
          En <strong>tråd</strong> (thread) er en lettvekts-utførelsesenhet <em>innenfor</em> en prosess.
          Alle tråder i samme prosess deler adresserommet — de ser det samme heapet og de globale variablene.
          Men hver tråd har sin egen stack, egne registre og sin egen programteller (PC).
        </p>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-sm">
          <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Nøkkelegenskap ved tråder:</p>
          <ul className="list-disc pl-4 space-y-1 text-[var(--foreground)]">
            <li>Deler adresserom med søsken-tråder (samme prosess)</li>
            <li>Egne: stack, registre, programteller (PC)</li>
            <li>Kontekstbytte mellom tråder er <strong>billig</strong> (ingen minnebytte nødvendig)</li>
            <li>En krasjet tråd kan ta ned hele prosessen</li>
          </ul>
        </div>
      </section>

      {/* SVG-diagram */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Diagram: Prosess med tråder</h2>
        <p className="text-sm text-[var(--muted)]">
          Slik ser det ut fra forelesningsnotater (van Steen &amp; Tanenbaum kap. 3): To prosesser med to tråder hver,
          mapper til fysisk minne via OS.
        </p>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 overflow-x-auto">
          <svg viewBox="0 0 700 320" className="w-full max-w-2xl mx-auto">
            {/* Physical memory */}
            <rect x="150" y="10" width="400" height="30" rx="4" fill="#3b82f6" opacity="0.8"/>
            <text x="350" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Fysisk minne (Physical Memory)</text>

            {/* Memory spaces */}
            <rect x="155" y="55" width="150" height="25" rx="3" fill="#93c5fd" opacity="0.7"/>
            <text x="230" y="72" textAnchor="middle" fill="#1e3a5f" fontSize="11">0x0000 minneplass</text>
            <rect x="390" y="55" width="150" height="25" rx="3" fill="#93c5fd" opacity="0.7"/>
            <text x="465" y="72" textAnchor="middle" fill="#1e3a5f" fontSize="11">0x8000 minneplass</text>

            {/* Arrows from memory to processes */}
            <line x1="230" y1="80" x2="230" y2="110" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            <line x1="465" y1="80" x2="465" y2="110" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrow)"/>

            {/* Process 1 */}
            <rect x="80" y="110" width="300" height="120" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
            <text x="230" y="128" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">Prosess 1</text>

            {/* Thread 1 in Process 1 */}
            <rect x="100" y="135" width="110" height="80" rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
            <text x="155" y="152" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Tråd 1</text>
            <text x="155" y="168" textAnchor="middle" fill="#374151" fontSize="10">• Stack</text>
            <text x="155" y="182" textAnchor="middle" fill="#374151" fontSize="10">• Registre</text>
            <text x="155" y="196" textAnchor="middle" fill="#374151" fontSize="10">• PC</text>

            {/* Thread 2 in Process 1 */}
            <rect x="230" y="135" width="110" height="80" rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
            <text x="285" y="152" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Tråd 2</text>
            <text x="285" y="168" textAnchor="middle" fill="#374151" fontSize="10">• Stack</text>
            <text x="285" y="182" textAnchor="middle" fill="#374151" fontSize="10">• Registre</text>
            <text x="285" y="196" textAnchor="middle" fill="#374151" fontSize="10">• PC</text>

            {/* Process 2 */}
            <rect x="320" y="110" width="300" height="120" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
            <text x="470" y="128" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">Prosess 2</text>

            {/* Thread 1 in Process 2 */}
            <rect x="340" y="135" width="110" height="80" rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
            <text x="395" y="152" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Tråd 1</text>
            <text x="395" y="168" textAnchor="middle" fill="#374151" fontSize="10">• Stack</text>
            <text x="395" y="182" textAnchor="middle" fill="#374151" fontSize="10">• Registre</text>
            <text x="395" y="196" textAnchor="middle" fill="#374151" fontSize="10">• PC</text>

            {/* Thread 2 in Process 2 */}
            <rect x="460" y="135" width="110" height="80" rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
            <text x="515" y="152" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Tråd 2</text>
            <text x="515" y="168" textAnchor="middle" fill="#374151" fontSize="10">• Stack</text>
            <text x="515" y="182" textAnchor="middle" fill="#374151" fontSize="10">• Registre</text>
            <text x="515" y="196" textAnchor="middle" fill="#374151" fontSize="10">• PC</text>

            {/* Thread scheduler */}
            <rect x="150" y="248" width="400" height="28" rx="4" fill="#6b7280" opacity="0.8"/>
            <text x="350" y="266" textAnchor="middle" fill="white" fontSize="12">Trådskeduler (OS)</text>

            {/* Arrows to scheduler */}
            <line x1="230" y1="230" x2="280" y2="248" stroke="#6b7280" strokeWidth="1.5"/>
            <line x1="465" y1="230" x2="415" y2="248" stroke="#6b7280" strokeWidth="1.5"/>

            {/* Processors */}
            <rect x="155" y="290" width="150" height="25" rx="4" fill="#4b5563" opacity="0.7"/>
            <text x="230" y="307" textAnchor="middle" fill="white" fontSize="11">Prosessor 1</text>
            <rect x="390" y="290" width="150" height="25" rx="4" fill="#4b5563" opacity="0.7"/>
            <text x="465" y="307" textAnchor="middle" fill="white" fontSize="11">Prosessor 2</text>

            <line x1="270" y1="276" x2="230" y2="290" stroke="#6b7280" strokeWidth="1.5"/>
            <line x1="420" y1="276" x2="465" y2="290" stroke="#6b7280" strokeWidth="1.5"/>

            {/* Shared memory label */}
            <text x="350" y="240" textAnchor="middle" fill="#6b7280" fontSize="10" fontStyle="italic">
              Delt: heap, globale variabler, åpne filer
            </text>

            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* Sammenligningstabellen */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Prosess vs Tråd — sammenligning</h2>

        {/* Toggle */}
        <div className="flex gap-2 flex-wrap">
          {(["prosess", "trad"] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {t === "prosess" ? "Prosess-visning" : "Tråd-visning"}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30">
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Egenskap</th>
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Prosess</th>
                <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Tråd</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {[
                ["Adresserom", "Eget, isolert", "Delt med andre tråder i samme prosess"],
                ["Kontekstbytte", "Dyrt (OS bytter minnekontekst)", "Billig (ingen minnebytte)"],
                ["Kommunikasjon", "Via IPC (sockets, pipes, shared mem.)", "Direkte via delt minne"],
                ["Isolasjon", "Sterk (feil sprer seg ikke)", "Svak (én krasjet tråd = hele prosessen krasjer)"],
                ["Opprettelse", "Langsom (fork())", "Rask (pthread_create)"],
                ["Ressursbruk", "Høy (eget minnekart)", "Lav (deler foreldrens ressurser)"],
                ["Skaleringspotensial", "God for multi-maskin", "God for multi-kjerne på én maskin"],
              ].map(([egenskap, prosess, trad]) => (
                <tr key={egenskap} className={`${activeTab === "trad" ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}>
                  <td className="px-4 py-2 font-medium">{egenskap}</td>
                  <td className={`px-4 py-2 ${activeTab === "prosess" ? "font-semibold text-blue-600 dark:text-blue-400" : "text-[var(--muted)]"}`}>{prosess}</td>
                  <td className={`px-4 py-2 ${activeTab === "trad" ? "font-semibold text-blue-600 dark:text-blue-400" : "text-[var(--muted)]"}`}>{trad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Multithreading-modeller */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Multithreading-modeller</h2>
        <p className="text-sm text-[var(--muted)]">
          Tre klassiske modeller beskriver forholdet mellom user-level tråder og kernel-level tråder:
        </p>

        <div className="flex gap-2 flex-wrap">
          {(["many-one", "one-one", "many-many"] as const).map(m => (
            <button
              key={m}
              onClick={() => setShowModeller(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showModeller === m
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {m === "many-one" ? "Many-to-One" : m === "one-one" ? "One-to-One" : "Many-to-Many"}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 space-y-3">
          {showModeller === "many-one" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Many-to-One (mange brukertråder → én kerneItråd)</h3>
              <svg viewBox="0 0 400 130" className="w-full max-w-sm">
                {["T1","T2","T3"].map((t, i) => (
                  <g key={t}>
                    <rect x={40 + i*100} y={10} width={70} height={35} rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
                    <text x={75 + i*100} y={32} textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">{t}</text>
                    <line x1={75 + i*100} y1={45} x2={200} y2={90} stroke="#6b7280" strokeWidth="1.5"/>
                  </g>
                ))}
                <text x={200} y={8} textAnchor="middle" fill="#6b7280" fontSize="11">Brukernivå (user space)</text>
                <line x1={0} y1={70} x2={400} y2={70} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4"/>
                <text x={200} y={83} textAnchor="middle" fill="#6b7280" fontSize="11">Kernelnivå (kernel space)</text>
                <rect x={150} y={90} width={100} height={30} rx="4" fill="#6b7280" opacity="0.8"/>
                <text x={200} y={110} textAnchor="middle" fill="white" fontSize="11">Kernel-tråd</text>
              </svg>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li><strong>Fordel:</strong> Effektiv trådadministrasjon i user space, ingen kernel-kall for bytte</li>
                <li><strong>Ulempe:</strong> Én blokkerende systemkall blokkerer ALLE tråder (katastrofalt i distribuerte systemer!)</li>
                <li><strong>Eksempel:</strong> Tidlige Java green threads</li>
              </ul>
            </>
          )}
          {showModeller === "one-one" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">One-to-One (én brukertråd → én kerneItråd)</h3>
              <svg viewBox="0 0 400 130" className="w-full max-w-sm">
                {["T1","T2","T3"].map((t, i) => (
                  <g key={t}>
                    <rect x={40 + i*110} y={10} width={70} height={35} rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
                    <text x={75 + i*110} y={32} textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">{t}</text>
                    <line x1={75 + i*110} y1={45} x2={75 + i*110} y2={90} stroke="#6b7280" strokeWidth="1.5"/>
                    <rect x={40 + i*110} y={90} width={70} height={30} rx="4" fill="#6b7280" opacity="0.8"/>
                    <text x={75 + i*110} y={110} textAnchor="middle" fill="white" fontSize="10">KT{i+1}</text>
                  </g>
                ))}
                <line x1={0} y1={70} x2={400} y2={70} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4"/>
              </svg>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li><strong>Fordel:</strong> Ekte parallellisme på flerkjerne. En blokkert tråd stopper ikke andre.</li>
                <li><strong>Ulempe:</strong> Mange kernel-tråder = høy minnekostnad</li>
                <li><strong>Eksempel:</strong> Linux (NPTL), Windows — <em>standard i dag</em></li>
              </ul>
            </>
          )}
          {showModeller === "many-many" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Many-to-Many (mange brukertråder → mange kerneItråder)</h3>
              <svg viewBox="0 0 400 140" className="w-full max-w-sm">
                {["T1","T2","T3","T4"].map((t, i) => (
                  <g key={t}>
                    <rect x={20 + i*90} y={10} width={65} height={30} rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5"/>
                    <text x={52 + i*90} y={30} textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">{t}</text>
                  </g>
                ))}
                {[0,1,2].map(i => (
                  <g key={i}>
                    <line x1={52 + i*90} y1={40} x2={80 + i*80} y2={90} stroke="#6b7280" strokeWidth="1" strokeDasharray="3"/>
                  </g>
                ))}
                <line x1={0} y1={70} x2={400} y2={70} stroke="#d1d5db" strokeWidth="1" strokeDasharray="4"/>
                {["KT1","KT2","KT3"].map((kt, i) => (
                  <g key={kt}>
                    <rect x={40 + i*110} y={90} width={75} height={30} rx="4" fill="#6b7280" opacity="0.8"/>
                    <text x={77 + i*110} y={110} textAnchor="middle" fill="white" fontSize="10">{kt}</text>
                  </g>
                ))}
              </svg>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li><strong>Fordel:</strong> Kombinerer begge — fleksibelt, ingen blokkering, kontrollert ressursbruk</li>
                <li><strong>Ulempe:</strong> Kompleks implementasjon</li>
                <li><strong>Eksempel:</strong> Solaris, eldre HP-UX</li>
              </ul>
            </>
          )}
        </div>
      </section>

      {/* User-level vs kernel-level */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">User-level vs Kernel-level tråder</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">User-level tråder</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Implementert i bibliotek (f.eks. pthreads)</li>
              <li>OS kjenner ikke til dem</li>
              <li>Rask switching (ingen kernel-mode bytte)</li>
              <li>Problem: Blokkerende systemkall = alle tråder blokkerer</li>
              <li>Kan ikke utnytte ekte parallellisme på flerkjerne</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Kernel-level tråder</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>OS kjenner til og styrer dem</li>
              <li>Ekte parallellisme på flerkjerne</li>
              <li>Blokkering av én tråd stopper ikke andre</li>
              <li>Tregere switching (kernel-mode bytte)</li>
              <li>Standard i moderne OS (Linux, Windows)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tråder i distribuerte systemer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hvorfor tråder er viktige i distribuerte systemer</h2>
        <p className="text-sm leading-relaxed">
          <strong>Blokkering er fienden</strong> i distribuerte systemer. Når en klient sender en forespørsel
          til en ekstern server, kan svaret ta lang tid. Uten tråder ville hele prosessen sitte og vente —
          og ikke kunne betjene andre forespørsler.
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-300">Multithreaded klient (web-nettleser)</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Nettleseren henter HTML, bilder, CSS, JS <em>samtidig</em></li>
              <li>Én tråd per forbindelse til server</li>
              <li>Skjuler kommunikasjonslatens for brukeren</li>
              <li>Kan åpne parallelle tilkoblinger til replikerte servere</li>
            </ul>
          </div>
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 space-y-2">
            <h3 className="font-bold text-blue-700 dark:text-blue-300">Multithreaded server</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Betjener mange klienter simultant</li>
              <li>Dispatcher-tråd mottar forespørsler, delegerer til worker-tråder</li>
              <li>Utnytter flerkjerne-arkitekturer (parallelisme)</li>
              <li>Forenkler koden vs asynkrone event-loops</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-4">
          <p className="text-sm font-semibold mb-2">Dispatcher/worker-modellen (fra forelesning):</p>
          <svg viewBox="0 0 500 160" className="w-full max-w-lg">
            {/* Network */}
            <rect x="10" y="60" width="90" height="40" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
            <text x="55" y="85" textAnchor="middle" fill="#374151" fontSize="11">Nettverk</text>
            <line x1="100" y1="80" x2="130" y2="80" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arr2)"/>
            {/* Dispatcher */}
            <rect x="130" y="55" width="90" height="50" rx="4" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2"/>
            <text x="175" y="78" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Dispatcher</text>
            <text x="175" y="95" textAnchor="middle" fill="#1e40af" fontSize="10">tråd</text>
            {/* Workers */}
            {[0,1,2].map(i => (
              <g key={i}>
                <line x1="220" y1={60 + i*25} x2="280" y2={40 + i*30} stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arr2)"/>
                <rect x="280" y={25 + i*30} width="90" height="25" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
                <text x="325" y={42 + i*30} textAnchor="middle" fill="#065f46" fontSize="10">Worker-tråd {i+1}</text>
              </g>
            ))}
            {/* Server boundary */}
            <rect x="125" y="30" width="260" height="110" rx="6" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4"/>
            <text x="255" y="22" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Server-prosess</text>
            <defs>
              <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#6b7280"/>
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">Hva du MÅ kunne til eksamen</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Forskjellen mellom prosess og tråd (adresserom, kontekstbytte, isolasjon)</li>
          <li>Hva tråder deler og hva de eier selv (stack, registre, PC = privat; heap, globale = delt)</li>
          <li>De tre multithreading-modellene: many-to-one, one-to-one, many-to-many</li>
          <li>Hvorfor tråder er viktige i distribuerte systemer (blokkering, parallellisme)</li>
          <li>Dispatcher/worker-modellen for multithreaded servere</li>
          <li>Fordeler med multithreaded klienter (latensgjemming, parallelle tilkoblinger)</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4 text-[var(--foreground)]">
          <li><strong>Feil:</strong> "Tråder har eget adresserom" — NEI, de deler prosessens adresserom</li>
          <li><strong>Feil:</strong> "Many-to-one gir ekte parallellisme" — NEI, bare one-to-one/many-to-many kan utnytte flerkjerne</li>
          <li><strong>Feil:</strong> "Kontekstbytte mellom tråder er dyrt" — Det er billigere enn mellom prosesser, men ikke gratis</li>
          <li><strong>Feil:</strong> Forveksle user-level og kernel-level tråder</li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <div />
        <Link href="/dat110/ds-3/teori/3-2" className="hover:text-[var(--accent)] text-sm">
          3.2 Virtualisering →
        </Link>
      </div>
    </div>
  );
}
