"use client";

import { useState } from "react";
import Link from "next/link";

export default function DS3_2Page() {
  const [activeView, setActiveView] = useState<"type1" | "type2" | "container">("type1");
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/ds-3/teori" className="hover:text-[var(--accent)]">← Alle delkapitler</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">3.2 Virtualisering</span>
      </div>

      <h1 className="text-2xl font-bold">3.2 Virtualisering</h1>
      <p className="text-[var(--muted)] max-w-2xl">
        Virtualisering er partisjonering av ressursene i et fysisk system. Det er en nøkkelteknologi
        for portabilitet, isolasjon og konsolidering i distribuerte systemer.
      </p>

      {/* Eksamenstips */}
      <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm">
        <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Eksamenstips</p>
        <p className="text-amber-900 dark:text-amber-200">
          Forelesningen dekker virtualisering med egne slides (side 17–20). Kjenn distinksjonene:
          Type 1 vs Type 2, og VM vs Container. Docker er et eksempel på OS-level virtualisering.
          Knytt alltid svar til <em>hvorfor</em>: portabilitet, isolasjon, ressurskonsolidering.
        </p>
      </div>

      {/* Hvorfor virtualisering */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Hvorfor virtualisering?</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Portabilitet og kode-migrasjon</h3>
            <p>Kode kan kjøre uavhengig av underliggende hardware. Virtualisering gjør det mulig å flytte kjørende programmer mellom noder.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Isolasjon og pålitelighet</h3>
            <p>Feil eller angrep i én VM/container sprer seg ikke til andre. Kritisk for sikkerhet og pålitelighet i distribuerte systemer.</p>
          </div>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Heterogenitet og konsolidering</h3>
            <p>Mange virtuelle maskiner på én fysisk maskin. Håndterer heterogene miljøer i nettverkssystemer.</p>
          </div>
        </div>
      </section>

      {/* Type 1 vs 2 vs Container interaktiv */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          Type 1 vs Type 2 hypervisor vs Containere
        </h2>

        <div className="flex gap-2 flex-wrap">
          {([
            { key: "type1", label: "Type 1 — Bare-metal" },
            { key: "type2", label: "Type 2 — Hosted" },
            { key: "container", label: "Containere (Docker)" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === key
                  ? "bg-blue-600 text-white"
                  : "bg-[var(--card)] border border-[var(--card-border)] hover:border-blue-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 space-y-4">
          {activeView === "type1" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                Type 1: Para-virtualisering (Bare-metal hypervisor)
              </h3>
              <p className="text-sm">
                Hypervisoren kjører <strong>direkte på hardware</strong> — ingen vertsOS under.
                Gjesteoperativsystemet er <em>modifisert</em> for å kommunisere med hypervisoren (para-virtualisering = Xen)
                eller hardware emuleres fullstendig for umodifiserte gjesteOS (full Type 1 = VMware ESXi).
              </p>
              <svg viewBox="0 0 340 220" className="w-full max-w-sm mx-auto">
                {[
                  { x: 10, label: "Guest OS (Linux)" },
                  { x: 120, label: "Guest OS (Mac)" },
                  { x: 230, label: "Guest OS (Win)" },
                ].map(({ x, label }, i) => (
                  <g key={i}>
                    <rect x={x} y={5} width={100} height={95} rx="5" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5"/>
                    <rect x={x+5} y={10} width={90} height={28} rx="3" fill="#eff6ff"/>
                    <text x={x+50} y={28} textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">App</text>
                    <rect x={x+5} y={43} width={90} height={50} rx="3" fill="#bfdbfe"/>
                    <text x={x+50} y={63} textAnchor="middle" fill="#1e40af" fontSize="9">{label}</text>
                    <text x={x+50} y={80} textAnchor="middle" fill="#6b7280" fontSize="8">(modifisert)</text>
                    <text x={x+50} y={95} textAnchor="middle" fill="#6b7280" fontSize="7">VM {i+1}</text>
                  </g>
                ))}
                <rect x={10} y={112} width={320} height={32} rx="4" fill="#3b82f6"/>
                <text x={170} y={132} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Hypervisor (VMM) — Type 1</text>
                <rect x={10} y={155} width={320} height={32} rx="4" fill="#374151"/>
                <text x={170} y={175} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Hardware (Prosessor, Minne, Disk, Nettverk)</text>
                <text x={170} y={208} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Eksempler: Xen, VMware ESXi, Hyper-V, KVM</text>
              </svg>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>Svært høy ytelse — nær fysisk hardware</li>
                    <li>Sterk isolasjon mellom VM-er</li>
                    <li>Industristandard i datasentre og sky (AWS, Azure)</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>Para-virtualisering krever modifisert gjesteOS</li>
                    <li>Krever kompatibel hardware-støtte</li>
                    <li>Mer kompleks oppsett enn Type 2</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeView === "type2" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                Type 2: Full virtualisering (Hosted hypervisor)
              </h3>
              <p className="text-sm">
                Hypervisoren er en <strong>vanlig applikasjon</strong> som kjøres oppå et vertsOS.
                Gjesteoperativsystemet er <em>umodifisert</em> — hypervisoren simulerer komplett hardware.
                Ekstra lag gir lavere ytelse enn Type 1.
              </p>
              <svg viewBox="0 0 340 240" className="w-full max-w-sm mx-auto">
                {[
                  { x: 10 },
                  { x: 120 },
                  { x: 230 },
                ].map(({ x }, i) => (
                  <g key={i}>
                    <rect x={x} y={5} width={100} height={95} rx="5" fill="#c7d2fe" stroke="#818cf8" strokeWidth="1.5"/>
                    <rect x={x+5} y={10} width={90} height={28} rx="3" fill="white" opacity="0.7"/>
                    <text x={x+50} y={28} textAnchor="middle" fill="#374151" fontSize="10" fontWeight="bold">App</text>
                    <rect x={x+5} y={43} width={90} height={50} rx="3" fill="white" opacity="0.5"/>
                    <text x={x+50} y={62} textAnchor="middle" fill="#374151" fontSize="9">Guest OS</text>
                    <text x={x+50} y={78} textAnchor="middle" fill="#6b7280" fontSize="8">(umodifisert)</text>
                    <text x={x+50} y={94} textAnchor="middle" fill="#6b7280" fontSize="8">VM {i+1}</text>
                  </g>
                ))}
                <rect x={10} y={112} width={320} height={32} rx="4" fill="#6366f1"/>
                <text x={170} y={132} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Hypervisor (Type 2) — f.eks. VirtualBox</text>
                <rect x={10} y={153} width={320} height={32} rx="4" fill="#6b7280"/>
                <text x={170} y={173} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Vertsoperativsystem (Host OS)</text>
                <rect x={10} y={194} width={320} height={30} rx="4" fill="#374151"/>
                <text x={170} y={214} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Hardware</text>
                <text x={170} y={235} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Eksempler: VMware Workstation, VirtualBox, QEMU</text>
              </svg>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler</p>
                  <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>GjesteOS trenger IKKE modifiseres</li>
                    <li>Enkel å installere og bruke (laptop/PC)</li>
                    <li>Kjør Windows på Mac — fleksibelt</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper</p>
                  <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>Lavere ytelse (to OS-lag)</li>
                    <li>Mer ressurskrevende enn Type 1</li>
                    <li>Vertsoperativsystemet er et sikkerhetsrisiko</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeView === "container" && (
            <>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                Containere — OS-level virtualisering
              </h3>
              <p className="text-sm">
                Containere er <strong>ikke</strong> virtuelle maskiner. De deler vertens OS-kjerne (kernel),
                men isolerer applikasjonen med egne prosess-namespaces, filsystem og nettverksoppsett.
                Docker er den vanligste container-teknologien. Fra forelesning:
                <em>"Containers are an abstraction at the app layer that packages code and dependencies together."</em>
              </p>
              <svg viewBox="0 0 340 215" className="w-full max-w-sm mx-auto">
                {["App A","App B","App C","App D","App E","App F"].map((app, i) => (
                  <g key={app}>
                    <rect x={10 + (i%3)*110} y={5 + Math.floor(i/3)*52} width={100} height={45} rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5"/>
                    <rect x={15 + (i%3)*110} y={10 + Math.floor(i/3)*52} width={90} height={18} rx="2" fill="#eff6ff"/>
                    <text x={60 + (i%3)*110} y={23 + Math.floor(i/3)*52} textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">{app}</text>
                    <rect x={15 + (i%3)*110} y={31 + Math.floor(i/3)*52} width={90} height={14} rx="2" fill="#bfdbfe"/>
                    <text x={60 + (i%3)*110} y={42 + Math.floor(i/3)*52} textAnchor="middle" fill="#1e40af" fontSize="8">Bins/Libs</text>
                  </g>
                ))}
                <rect x={10} y={115} width={320} height={30} rx="4" fill="#2563eb"/>
                <text x={170} y={134} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Docker Engine / Container Runtime</text>
                <rect x={10} y={155} width={320} height={30} rx="4" fill="#10b981"/>
                <text x={170} y={174} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Vertsoperativsystem (delt kernel)</text>
                <rect x={10} y={195} width={320} height={20} rx="4" fill="#374151"/>
                <text x={170} y={209} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Hardware / Infrastruktur</text>
              </svg>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-xs">
                <p className="font-semibold mb-1">Eksempel: Dockerfile (fra forelesning)</p>
                <pre className="bg-white dark:bg-gray-900 p-2 rounded text-[10px] leading-relaxed overflow-x-auto">{`FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY . /app
CMD ["uvicorn", "api.restapi:app", "--host", "0.0.0.0", "--port", "8090"]`}</pre>
                <p className="mt-2 text-[var(--muted)]">Main idea: Portabilitet, enkel deploy, isolasjon av prosesser.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Fordeler vs VM</p>
                  <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>Svært lettvektige (MB vs GB)</li>
                    <li>Starter på sekunder (vs minutter)</li>
                    <li>Portabilitet: "fungerer på min maskin" løst</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Ulemper vs VM</p>
                  <ul className="list-disc pl-3 space-y-1 text-xs">
                    <li>Svakere isolasjon (deler OS-kernel)</li>
                    <li>Kernel-sårbarhet kan påvirke alle containere</li>
                    <li>Linux-containere krever Linux-kernel</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Sammenligningstabellen */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">VM vs Container — sammenligning</h2>
          <button
            onClick={() => setShowTable(!showTable)}
            className="text-sm px-3 py-1 rounded-lg border border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            {showTable ? "Skjul" : "Vis"} tabell
          </button>
        </div>
        {showTable && (
          <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/30">
                  <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Egenskap</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Virtuell maskin (VM)</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-700 dark:text-blue-300">Container (Docker)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-border)]">
                {[
                  ["OS-deling", "Eget gjesteOS", "Deler vertens OS-kernel"],
                  ["Størrelse", "Gigabytes (inkl. OS)", "Megabytes (app + libs)"],
                  ["Oppstartstid", "Minutter", "Sekunder"],
                  ["Isolasjon", "Sterk (full HW-emulering)", "Svakere (delt kernel)"],
                  ["Ytelse", "Nær native (Type 1)", "Nær native (minimal overhead)"],
                  ["Portabilitet", "God (komplett OS)", "Meget god (lett, standardisert)"],
                  ["Bruksområde", "Ulike OS, sterk isolasjon", "Microservices, CI/CD, sky"],
                  ["Eksempler", "VMware, VirtualBox, KVM", "Docker, Podman, containerd"],
                ].map(([e, vm, c]) => (
                  <tr key={e} className="hover:bg-[var(--card)]">
                    <td className="px-4 py-2 font-medium">{e}</td>
                    <td className="px-4 py-2 text-[var(--muted)]">{vm}</td>
                    <td className="px-4 py-2 text-[var(--muted)]">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Hva du MÅ kunne */}
      <section className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-5 space-y-2">
        <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">Hva du MÅ kunne til eksamen</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Definisjon av virtualisering: partisjonering av ressurser i et fysisk system</li>
          <li>Tre grunner: portabilitet (kode-migrasjon), isolasjon (pålitelighet), heterogenitet/konsolidering</li>
          <li>Type 1 (bare-metal): hypervisor direkte på hardware — høy ytelse, datasenter (Xen, ESXi)</li>
          <li>Type 2 (hosted): hypervisor som app oppå vertsOS — enklere, lavere ytelse (VirtualBox)</li>
          <li>Para-virtualisering: gjesteOS modifisert. Full virtualisering: umodifisert gjesteOS</li>
          <li>Containere deler OS-kernel, er lettvektige, raskere oppstart, svakere isolasjon enn VM</li>
          <li>Docker = OS-level virtualisering. Dockerfile = oppskrift for container-image</li>
        </ul>
      </section>

      {/* Vanlige feil */}
      <section className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 space-y-2">
        <h2 className="text-base font-bold text-red-700 dark:text-red-400">Vanlige feil</h2>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li><strong>Feil:</strong> "Type 1 har et vertsOS under" — Type 1 kjører direkte på hardware, ingen vertsOS</li>
          <li><strong>Feil:</strong> "Containere er det samme som VM-er" — Containere deler kernel, VM har eget OS</li>
          <li><strong>Feil:</strong> Forveksle Type 1 og Type 2 (husk: Type 1 = bare-metal = datasentre = raskere)</li>
          <li><strong>Feil:</strong> Glemme å forklare HVORFOR virtualisering brukes (ikke bare hva det er)</li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
        <Link href="/dat110/ds-3/teori/3-1" className="hover:text-[var(--accent)] text-sm">← 3.1 Tråder og prosesser</Link>
        <Link href="/dat110/ds-3/teori/3-3" className="hover:text-[var(--accent)] text-sm">3.3 Klient-design →</Link>
      </div>
    </div>
  );
}
