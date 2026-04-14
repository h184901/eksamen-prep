"use client";

import { useState } from "react";
import Link from "next/link";

function Card({ color = "blue", children }: { color?: string; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    gold: "border-amber-400/60 bg-amber-50 dark:bg-amber-950/20",
    blue: "border-blue-400/60 bg-blue-50 dark:bg-blue-950/20",
    network: "border-cyan-400/60 bg-cyan-50 dark:bg-cyan-950/20",
    red: "border-red-400/60 bg-red-50 dark:bg-red-950/20",
    green: "border-green-400/60 bg-green-50 dark:bg-green-950/20",
    purple: "border-purple-400/60 bg-purple-50 dark:bg-purple-950/20",
  };
  return <div className={`rounded-xl border-2 p-4 my-3 ${colors[color] ?? colors.blue}`}>{children}</div>;
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
        <span className="font-bold">{title}</span>
        <svg className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

function MustKnow({ items }: { items: string[] }) {
  return (
    <Card color="gold">
      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Hva du MA kunne</h3>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 mt-0.5 shrink-0">*</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// FSM-komponent
function FSMState({ label, x, y, initial = false }: { label: string; x: number; y: number; initial?: boolean }) {
  return (
    <g>
      {initial && <path d={`M ${x - 30} ${y} L ${x - 18} ${y}`} stroke="#0891b2" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)"/>}
      <circle cx={x} cy={y} r="22" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" className="dark:fill-cyan-900/40 dark:stroke-cyan-400"/>
      <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold" className="dark:fill-cyan-300">{label}</text>
    </g>
  );
}

export default function CN3Teori33Page() {
  const [activeRdt, setActiveRdt] = useState<string>("rdt1");
  const [showGBN, setShowGBN] = useState(false);

  const rdtVersions = [
    { id: "rdt1", label: "rdt 1.0", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
    { id: "rdt2", label: "rdt 2.0", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
    { id: "rdt21", label: "rdt 2.1", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
    { id: "rdt22", label: "rdt 2.2", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" },
    { id: "rdt3", label: "rdt 3.0", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/dat110/cn-3/teori" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">CN-3 Teori</Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">3.3 Palitelig dataoverforing</span>
      </div>

      <div>
        <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-1">CN 3.3 — EKSAMENSKRITISK</p>
        <h1 className="text-2xl font-bold mb-2">Palitelig dataoverforing (rdt)</h1>
        <p className="text-[var(--muted)] text-sm max-w-2xl">
          rdt-protokollene viser steg-for-steg hvordan man bygger palitelig kommunikasjon over
          en upalagtelig kanal. Dette er grunnlaget for TCP. Nar du forstar rdt, forstar du TCP.
          Dette temaet tester eksamen alltid.
        </p>
      </div>

      <MustKnow items={[
        "rdt 1.0: perfekt kanal — sender sender, mottaker mottar, ingen feil",
        "rdt 2.0: bit-feil haandteres med checksum + ACK/NAK. Problemet: korrupt ACK/NAK",
        "rdt 2.1: sekvensummer (0/1) loser problemet med korrupte ACK/NAK",
        "rdt 2.2: som rdt 2.1 men uten NAK — bruker ACK(seqnum) istedenfor NAK",
        "rdt 3.0: loser tap med timeout og retransmisjon. Alternating-bit protokoll",
        "Go-Back-N (GBN) vs Selective Repeat (SR): vindusmekanisme for parallelitet",
        "FSM-notasjon: tilstander (sirkler), overganger (piler), hendelse/aksjon",
      ]} />

      <Section title="0. Oversikt — RDT-rammeverket" defaultOpen={true}>
        <Card color="network">
          <h4 className="font-bold mb-3">Hva er rdt?</h4>
          <p className="text-sm">Malet er a bygge en palitelig datatransporttjeneste over en UPALITELIG kanal. Kanalens problemer:</p>
          <div className="grid sm:grid-cols-2 gap-2 mt-3">
            {[
              { problem: "Bit-feil", icon: "B", desc: "Bits kan flippes under overforingen (stoy pa linken)" },
              { problem: "Pakketap", icon: "T", desc: "Pakker kan forsvinne helt (tapte datagrammer)" },
              { problem: "Overtaking", icon: "O", desc: "Pakker kan komme i feil rekkefolge (ulike ruter)" },
              { problem: "Duplisering", icon: "D", desc: "Pakker kan komme to ganger" },
            ].map(({ problem, icon, desc }) => (
              <div key={problem} className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2 flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold shrink-0">{icon}</div>
                <div>
                  <p className="text-xs font-bold">{problem}</p>
                  <p className="text-xs text-[var(--muted)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card color="blue">
          <h4 className="font-bold mb-2">Hendelser og aksjoner i rdt</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {[
              { fn: "rdt_send(data)", besk: "Applikasjonen vil sende data palitelig" },
              { fn: "udt_send(segment)", besk: "Send segment upalagtelig over nettverket" },
              { fn: "rdt_recv(segment)", besk: "Segment ankommer fra nettverkslaget" },
              { fn: "deliver_data(data)", besk: "Lever data til applikasjonslaget" },
            ].map(({ fn, besk }) => (
              <div key={fn} className="rounded bg-blue-100 dark:bg-blue-900/30 p-2">
                <p className="font-bold text-blue-700 dark:text-blue-400">{fn}</p>
                <p className="text-[var(--muted)] mt-0.5 font-sans">{besk}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="1. rdt-protokollene — steg for steg" defaultOpen={true}>
        {/* Versjonvelger */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rdtVersions.map(v => (
            <button
              key={v.id}
              onClick={() => setActiveRdt(v.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border-2 ${
                activeRdt === v.id ? "border-cyan-500 shadow-sm scale-105" : "border-transparent opacity-70 hover:opacity-100"
              } ${v.color}`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {activeRdt === "rdt1" && (
          <div className="space-y-3">
            <Card color="green">
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">rdt 1.0 — Perfekt kanal</h4>
              <p className="text-sm"><strong>Antakelse:</strong> Den underliggende kanalen er helt palitelig — ingen bitfeil, ingen pakketap.</p>
              <p className="text-sm mt-2"><strong>Losning:</strong> Sender sender pakker, mottaker mottar pakker. Ingen spesiell haandtering nodvendig.</p>
            </Card>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-[var(--muted)] mb-2">SENDER FSM:</p>
                <svg viewBox="0 0 200 100" className="w-full border border-[var(--card-border)] rounded-lg bg-white dark:bg-neutral-900 p-2">
                  <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#0891b2"/></marker></defs>
                  <circle cx="100" cy="55" r="30" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5"/>
                  <text x="100" y="52" textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold">Vent pa</text>
                  <text x="100" y="63" textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold">anrop</text>
                  <path d="M 65 45 A 35 35 0 0 1 65 65" stroke="#0891b2" strokeWidth="1" fill="none" markerEnd="url(#arrow)"/>
                  <text x="20" y="52" fontSize="8" fill="#64748b">rdt_send(d)</text>
                  <text x="20" y="62" fontSize="8" fill="#0891b2">udt_send(pkt)</text>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--muted)] mb-2">MOTTAKER FSM:</p>
                <svg viewBox="0 0 200 100" className="w-full border border-[var(--card-border)] rounded-lg bg-white dark:bg-neutral-900 p-2">
                  <defs><marker id="arrow2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#0891b2"/></marker></defs>
                  <circle cx="100" cy="55" r="30" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5"/>
                  <text x="100" y="52" textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold">Vent pa</text>
                  <text x="100" y="63" textAnchor="middle" fontSize="9" fill="#0e7490" fontWeight="bold">pakke</text>
                  <path d="M 130 65 A 35 35 0 0 1 130 45" stroke="#0891b2" strokeWidth="1" fill="none" markerEnd="url(#arrow2)"/>
                  <text x="135" y="52" fontSize="8" fill="#64748b">rdt_recv(pkt)</text>
                  <text x="135" y="62" fontSize="8" fill="#0891b2">deliver(d)</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeRdt === "rdt2" && (
          <div className="space-y-3">
            <Card color="blue">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">rdt 2.0 — Kanal med bitfeil</h4>
              <p className="text-sm"><strong>Antakelse:</strong> Kanalen kan introdusere bitfeil, men pakker kan ikke gaa tapt.</p>
              <p className="text-sm mt-2"><strong>Ny mekanisme:</strong></p>
              <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1 mt-1">
                <li><strong>Checksum</strong> — detekter bitfeil</li>
                <li><strong>ACK</strong> (acknowledgement) — "pakken ble mottatt korrekt"</li>
                <li><strong>NAK</strong> (negative acknowledgement) — "pakken hadde feil, send pa nytt"</li>
              </ul>
            </Card>
            <Card color="red">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Problemet med rdt 2.0: Korrupte ACK/NAK!</h4>
              <p className="text-sm">Hva skjer hvis ACK/NAK-meldingen selv blir korrupt? Senderen vet ikke om pakken kom frem. Senderen kan ikke bare sende pa nytt (mottakeren vet ikke om det er ny pakke eller duplikat).</p>
              <p className="text-sm mt-2 font-bold text-red-700 dark:text-red-400">Losning: sekvensummer → rdt 2.1</p>
            </Card>
          </div>
        )}

        {activeRdt === "rdt21" && (
          <div className="space-y-3">
            <Card color="purple">
              <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">rdt 2.1 — Sekvensummer loser duplikatproblemet</h4>
              <p className="text-sm"><strong>Ny mekanisme:</strong> Legg til et <strong>sekvensnummer</strong> (0 eller 1 — "alternating bit") i hver pakke.</p>
              <div className="mt-3 space-y-2 text-sm">
                <p>Na kan mottakeren skille mellom ny pakke og retransmisjon:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-white/60 dark:bg-neutral-900/40 p-2">
                    <p className="font-bold">Sender:</p>
                    <ul className="list-disc list-inside text-[var(--muted)] mt-1 space-y-0.5">
                      <li>4 tilstander: venter 0, venter ACK 0, venter 1, venter ACK 1</li>
                      <li>Sender pa nytt hvis NAK eller korrupt ACK/NAK</li>
                    </ul>
                  </div>
                  <div className="rounded bg-white/60 dark:bg-neutral-900/40 p-2">
                    <p className="font-bold">Mottaker:</p>
                    <ul className="list-disc list-inside text-[var(--muted)] mt-1 space-y-0.5">
                      <li>Forventer enten seqnum 0 eller 1</li>
                      <li>Hvis duplikat: send ACK men IKKE lever til app</li>
                      <li>Hvis korrekt og ny: lever og send ACK</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeRdt === "rdt22" && (
          <div className="space-y-3">
            <Card color="network">
              <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">rdt 2.2 — Uten NAK</h4>
              <p className="text-sm"><strong>Samme funksjonalitet som rdt 2.1, men uten NAK-meldinger.</strong></p>
              <p className="text-sm mt-2">Istedenfor NAK sender mottakeren en <strong>ACK for den SIST korrekt mottatte pakken</strong> (ACK med sekvensnummer). Dette er nok informasjon for senderen.</p>
              <div className="rounded-lg bg-cyan-100 dark:bg-cyan-900/30 p-2 mt-2 text-xs">
                <strong>Eksempel:</strong> Sender venter pa ACK for pakke 0. Mottar ACK 1 (dvs. mottaker sist fikk pakke 1 korrekt) → duplikat ACK → send pakke 0 pa nytt. Dette er konseptuelt likt det TCP bruker!
              </div>
            </Card>
          </div>
        )}

        {activeRdt === "rdt3" && (
          <div className="space-y-3">
            <Card color="red">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">rdt 3.0 — Lossy kanal med tap og bitfeil</h4>
              <p className="text-sm"><strong>Ny antakelse:</strong> Pakker kan ogsa gaa <em>tapt</em> (ikke bare korrupt).</p>
              <p className="text-sm mt-2"><strong>Ny mekanisme: Timeout og retransmisjon</strong></p>
              <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1 mt-1">
                <li>Senderen starter en <strong>timer</strong> etter hver sendt pakke</li>
                <li>Hvis ACK ikke mottas innen timeout → retransmitter pakken</li>
                <li>Sekvensummer (0/1) haandterer duplikater fra retransmisjon</li>
              </ul>
            </Card>

            <div className="space-y-3">
              <p className="font-bold text-sm">Fire scenarier for rdt 3.0:</p>
              {[
                { scenario: "Normal drift", desc: "Pakke sendes, ACK mottas. Alt fungerer.", color: "border-green-400 bg-green-50 dark:bg-green-950/20" },
                { scenario: "Pakketap", desc: "Pakken forsvinner. Sender timer ut og retransmitterer.", color: "border-red-400 bg-red-50 dark:bg-red-950/20" },
                { scenario: "ACK-tap", desc: "Pakken ankommer korrekt, men ACK forsvinner. Sender timer ut og retransmitterer. Mottaker mottar duplikat med seqnum 0 → kaster det, sender ACK pa nytt.", color: "border-orange-400 bg-orange-50 dark:bg-orange-950/20" },
                { scenario: "For tidlig timeout", desc: "ACK ankommer etter timeout. Sender retransmitterer. Mottaker mottar duplikat → kaster, sender ACK. Senderen mottar duplikat-ACK → ignorerer.", color: "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20" },
              ].map(({ scenario, desc, color }) => (
                <div key={scenario} className={`rounded-lg border-2 p-3 ${color}`}>
                  <p className="font-bold text-sm">{scenario}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">{desc}</p>
                </div>
              ))}
            </div>

            <Card color="gold">
              <h4 className="font-bold mb-2">rdt 3.0 = Alternating-bit protokollen</h4>
              <p className="text-sm">rdt 3.0 er ogsa kjent som <strong>alternating-bit protokollen</strong> fordi sekvensnummeret veksler mellom 0 og 1. Det er en stop-and-wait protokoll: sender venter pa ACK for pakke 0 for den sender pakke 1. <strong>Ulempe: ineffektiv</strong> — senderen er idle mesteparten av tiden pa linker med hoy forsinkelse.</p>
            </Card>
          </div>
        )}
      </Section>

      <Section title="2. Sammenligning — rdt-versjoner">
        <div className="overflow-x-auto">
          <table className="w-full text-xs rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-2 py-2 text-left">Versjon</th>
                <th className="px-2 py-2 text-left">Antatt kanalprob.</th>
                <th className="px-2 py-2 text-left">Ny mekanisme</th>
                <th className="px-2 py-2 text-left">Gjenvaerende problem</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["rdt 1.0", "Ingen", "Ingen", "Ingen — perfekt"],
                ["rdt 2.0", "Bitfeil", "Checksum, ACK, NAK", "Korrupt ACK/NAK"],
                ["rdt 2.1", "Bitfeil + korrupt ACK", "Sekvensummer (0/1)", "Mange tilstander"],
                ["rdt 2.2", "Bitfeil + korrupt ACK", "ACK med seqnum (ingen NAK)", "Lite"],
                ["rdt 3.0", "Bitfeil + pakketap", "Timer + retransmisjon", "Lav effektivitet (stop-and-wait)"],
              ].map(([v, k, m, p], i) => (
                <tr key={v} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-2 py-2 font-bold text-cyan-600 dark:text-cyan-400">{v}</td>
                  <td className="px-2 py-2">{k}</td>
                  <td className="px-2 py-2 text-green-700 dark:text-green-400">{m}</td>
                  <td className="px-2 py-2 text-red-600 dark:text-red-400">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. Go-Back-N (GBN) og Selective Repeat (SR)" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">Stop-and-wait (rdt 3.0) er ineffektiv. Litt: <strong>utnyttelse U = (L/R) / (RTT + L/R)</strong>. Losning: tillat N ubekreftede pakker i "flyet" (pipelining).</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card color="blue">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Go-Back-N (GBN)</h4>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Sender kan ha opptil <strong>N</strong> ukvitterte pakker</li>
              <li>Mottaker aksepterer KUN pakker <em>i orden</em></li>
              <li>Timer per vindu (starter pa eldste ukvitterte pakke)</li>
              <li>Ved timeout: <strong>send pakke n og ALLE etterfolgere pa nytt</strong></li>
              <li>Kumulative ACKer: ACK(n) = kvitter for alle t.o.m. n</li>
              <li>Sendervindu: N. Mottakervindu: <strong>1</strong></li>
            </ul>
            <div className="mt-2 rounded bg-blue-100 dark:bg-blue-900/30 p-2 text-xs">
              <strong>Fordel:</strong> Enkelt mottaker (ingen buffering). <strong>Ulempe:</strong> Wasteful — sender mange pakker pa nytt ved ett tap.
            </div>
          </Card>

          <Card color="purple">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Selective Repeat (SR)</h4>
            <ul className="text-sm text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Sender kan ha opptil <strong>N</strong> ukvitterte pakker</li>
              <li>Mottaker <em>buffrer</em> pakker som ankommer ute av orden</li>
              <li>Timer <em>per pakke</em></li>
              <li>Ved timeout: send KUN den tapte pakken pa nytt</li>
              <li>Individuelle ACKer: ACK(n) = kvitter kun pakke n</li>
              <li>Sendervindu: N. Mottakervindu: <strong>N</strong></li>
            </ul>
            <div className="mt-2 rounded bg-purple-100 dark:bg-purple-900/30 p-2 text-xs">
              <strong>Fordel:</strong> Sender KUN manglende pakker pa nytt. <strong>Ulempe:</strong> Kompleks buffering pa mottakersiden.
            </div>
          </Card>
        </div>

        {/* Visuell pipeline */}
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <h4 className="font-bold text-sm mb-3">Vindusstorrelse og sekvensnummer-krav</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-[var(--muted)] mb-2">GBN — sekvensrummet:</p>
              <div className="text-xs space-y-1">
                <p>Med k-bit sekvensnummer: 2^k mulige verdier</p>
                <p className="font-bold">Max vindusstorrelse for GBN: <span className="text-blue-600 dark:text-blue-400">2^k - 1</span></p>
                <p className="text-[var(--muted)]">Eks: 2-bit seqnum → maks vindu = 3 (ikke 4!)</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--muted)] mb-2">SR — sekvensrummet:</p>
              <div className="text-xs space-y-1">
                <p>Med k-bit sekvensnummer: 2^k mulige verdier</p>
                <p className="font-bold">Max vindusstorrelse for SR: <span className="text-purple-600 dark:text-purple-400">2^k / 2 = 2^(k-1)</span></p>
                <p className="text-[var(--muted)]">Eks: 2-bit seqnum → maks vindu = 2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sammenligning */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden border border-[var(--card-border)]">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-3 py-2 text-left">Egenskap</th>
                <th className="px-3 py-2 text-left text-blue-700 dark:text-blue-400">Go-Back-N</th>
                <th className="px-3 py-2 text-left text-purple-700 dark:text-purple-400">Selective Repeat</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sendervindu", "N (glidende)", "N (glidende)"],
                ["Mottakervindu", "1", "N"],
                ["Mottaker-buffering", "Ingen", "Ja (buffrer ute-av-orden)"],
                ["Retransmisjon", "Alt fra tapt pakke og utover", "Kun tapt pakke"],
                ["Max vindusstorrelse (k-bit seqnum)", "2^k - 1", "2^(k-1)"],
                ["Kompleksitet", "Enklere mottaker", "Kompleks mottaker"],
              ].map(([egenskap, gbn, sr], i) => (
                <tr key={egenskap} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                  <td className="px-3 py-2 font-medium text-xs">{egenskap}</td>
                  <td className="px-3 py-2 text-xs text-blue-600 dark:text-blue-400">{gbn}</td>
                  <td className="px-3 py-2 text-xs text-purple-600 dark:text-purple-400">{sr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Eksamenstips og vanlige feil">
        <Card color="red">
          <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Klassiske eksamensoppgaver om rdt</h4>
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
              <p className="font-bold text-xs">Q: Hva er problemet med rdt 2.0?</p>
              <p className="text-xs text-[var(--muted)] mt-1">A: ACK/NAK-meldinger kan selv bli korrupte. Senderen vet ikke om retransmisjon er nodvendig. Losning: sekvensummer (rdt 2.1).</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
              <p className="font-bold text-xs">Q: Hva er formalet med checksum / timer / sekvensummer / acknowledgement?</p>
              <p className="text-xs text-[var(--muted)] mt-1">Checksum: detektere bitfeil. Timer: detektere tap. Sekvensummer: skille ny pakke fra retransmisjon. Acknowledgement: bekrefte at pakke ble mottatt.</p>
            </div>
            <div className="rounded-lg bg-white/60 dark:bg-neutral-900/40 p-2">
              <p className="font-bold text-xs">Q: Hva slags pakke innkapsler TCP-segmentet seg i?</p>
              <p className="text-xs text-[var(--muted)] mt-1">TCP-segmentet innkapsles i et IP-datagram, som igjen innkapsles i en Ethernet-ramme (eller annen link-layer ramme) ved overfoering.</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Navigasjon */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
        <Link href="/dat110/cn-3/teori/3-2" className="text-sm text-[var(--muted)] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          ← 3.2 UDP
        </Link>
        <Link href="/dat110/cn-3/teori/3-4" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition-colors">
          3.4 TCP segmentstruktur →
        </Link>
      </div>
    </div>
  );
}
