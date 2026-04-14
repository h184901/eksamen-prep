"use client";

import { useState } from "react";

function Answer({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-2">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="text-xs px-3 py-1 rounded-full border border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          Vis løsning
        </button>
      ) : (
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 p-4 text-sm space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-2 font-mono text-sm text-blue-800 dark:text-blue-300 my-2">
      {children}
    </div>
  );
}

function ExamYear({ year, children }: { year: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {year}
          </span>
          <span className="font-bold">Oppgave 8 — Overlay og multicast</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

export default function Oppg8TidligerePage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)] mb-4">
        Oppgave 8 handler alltid om overlay-nettverk: tegn overlay-grafen, beregn RDP
        (Relative Delay Penalty) for to ulike multicast-trær, og sammenlign trestrukturer etter
        effektivitet. Formelen er enkel — det er systematikken som teller.
      </p>

      <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 px-4 py-3 text-sm mb-4">
        <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">Kjernebegreper</p>
        <ul className="space-y-1 text-blue-900 dark:text-blue-200 list-disc list-inside">
          <li><strong>Overlay-nettverk:</strong> Logisk nett bygget over det fysiske — noder er prosesser, kanter er logiske lenker</li>
          <li><strong>Overlay-kant:</strong> Beste (korteste forsinkelse) fysiske sti mellom to overlay-noder</li>
          <li><strong>RDP = overlay-sti-delay / beste fysiske sti-delay</strong> — lavere er bedre, aldri under 1.0</li>
          <li><strong>Total trekkostnad:</strong> Summer alle overlay-kantkostnader i multicast-treet</li>
        </ul>
      </div>

      {/* Jan 2025 */}
      <ExamYear year="Jan 2025">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Fysisk nettverk:</strong> 5 rutere Ra–Re i kjede</p>
          <p>Ra↔Rb = 5, Rb↔Rc = 10, Rc↔Rd = 5, Rd↔Re = 5, Ra↔Re = 40 (direkte, men aldri optimal)</p>
          <p>5 overlay-prosesser A–E koblet til hver sin ruter (Ra–Re)</p>
        </div>

        {/* SVG — kjede-topologi */}
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/40 p-4 flex justify-center">
          <svg viewBox="0 0 460 160" className="w-full max-w-lg" fill="none">
            {/* Fysiske noder */}
            <circle cx="40" cy="70" r="18" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <text x="40" y="75" textAnchor="middle" fontSize="11" className="fill-current font-bold" fill="#3b82f6">Ra</text>
            <circle cx="135" cy="70" r="18" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <text x="135" y="75" textAnchor="middle" fontSize="11" className="fill-current font-bold" fill="#3b82f6">Rb</text>
            <circle cx="240" cy="70" r="18" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <text x="240" y="75" textAnchor="middle" fontSize="11" className="fill-current font-bold" fill="#3b82f6">Rc</text>
            <circle cx="340" cy="70" r="18" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <text x="340" y="75" textAnchor="middle" fontSize="11" className="fill-current font-bold" fill="#3b82f6">Rd</text>
            <circle cx="420" cy="70" r="18" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <text x="420" y="75" textAnchor="middle" fontSize="11" className="fill-current font-bold" fill="#3b82f6">Re</text>
            {/* Fysiske kanter — kjede */}
            <line x1="58" y1="70" x2="117" y2="70" stroke="#6b7280" strokeWidth="1.5" />
            <text x="87" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">5</text>
            <line x1="153" y1="70" x2="222" y2="70" stroke="#6b7280" strokeWidth="1.5" />
            <text x="187" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">10</text>
            <line x1="258" y1="70" x2="322" y2="70" stroke="#6b7280" strokeWidth="1.5" />
            <text x="290" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">5</text>
            <line x1="358" y1="70" x2="402" y2="70" stroke="#6b7280" strokeWidth="1.5" />
            <text x="380" y="62" textAnchor="middle" fontSize="10" fill="#6b7280">5</text>
            {/* Ra↔Re direkte (bue) */}
            <path d="M 56 62 Q 230 15 404 62" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
            <text x="230" y="25" textAnchor="middle" fontSize="10" fill="#9ca3af">40</text>
            {/* Overlay-prosesser */}
            <circle cx="40" cy="130" r="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="40" y="135" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">A</text>
            <circle cx="135" cy="130" r="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="135" y="135" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">B</text>
            <circle cx="240" cy="130" r="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="240" y="135" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">C</text>
            <circle cx="340" cy="130" r="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="340" y="135" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">D</text>
            <circle cx="420" cy="130" r="12" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="420" y="135" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">E</text>
            {/* Loddrette koblinger */}
            <line x1="40" y1="88" x2="40" y2="118" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="135" y1="88" x2="135" y2="118" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="240" y1="88" x2="240" y2="118" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="340" y1="88" x2="340" y2="118" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="420" y1="88" x2="420" y2="118" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Fyll ut overlay-tabellen — forsinkelse mellom alle par A–E.</p>
            <Answer>
              <p className="font-semibold mb-1">Alle 10 overlay-kanter (beste fysiske sti):</p>
              <div className="overflow-x-auto">
                <table className="text-xs w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100 dark:bg-blue-900/30">
                      <th className="px-2 py-1 text-left">Par</th>
                      <th className="px-2 py-1 text-left">Beste fysiske sti</th>
                      <th className="px-2 py-1 text-left font-bold">Forsinkelse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["A–B", "Ra→Rb", "5"],
                      ["A–C", "Ra→Rb→Rc", "15"],
                      ["A–D", "Ra→Rb→Rc→Rd", "20"],
                      ["A–E", "Ra→Rb→Rc→Rd→Re", "25"],
                      ["B–C", "Rb→Rc", "10"],
                      ["B–D", "Rb→Rc→Rd", "15"],
                      ["B–E", "Rb→Rc→Rd→Re", "20"],
                      ["C–D", "Rc→Rd", "5"],
                      ["C–E", "Rc→Rd→Re", "10"],
                      ["D–E", "Rd→Re", "5"],
                    ].map(([par, sti, kost], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-neutral-900/40" : "bg-neutral-50 dark:bg-neutral-800/30"}>
                        <td className="px-2 py-1 font-mono">{par}</td>
                        <td className="px-2 py-1 font-mono text-[var(--muted)]">{sti}</td>
                        <td className="px-2 py-1 font-bold text-blue-700 dark:text-blue-400">{kost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2">Merk: Ra↔Re = 40 brukes ALDRI — via kjeden er det alltid 5+10+5+5 = 25 ms.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">b) Tree 1: stjerne med A som rot (A→B, A→C, A→D, A→E). Beregn RDP for A→E og total trekkostnad.</p>
            <Answer>
              <Formula>
                Overlay-sti A→E i Tree 1 = direkte kant A–E = 25 ms<br/>
                Beste fysiske A→E = Ra→Rb→Rc→Rd→Re = 25 ms<br/>
                RDP(A→E, Tree 1) = 25 / 25 = 1.0
              </Formula>
              <p><strong>RDP = 1.0</strong> for dette paret.</p>
              <Formula>
                Total kostnad Tree 1 = A–B + A–C + A–D + A–E<br/>
                = 5 + 15 + 20 + 25 = 65 ms
              </Formula>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">c) Tree 2: linje A–B–C–D–E. Beregn RDP for A→E og total trekkostnad.</p>
            <Answer>
              <Formula>
                Overlay-sti A→E i Tree 2 = A→B→C→D→E<br/>
                = 5 + 10 + 5 + 5 = 25 ms<br/>
                Beste fysiske A→E = 25 ms<br/>
                RDP(A→E, Tree 2) = 25 / 25 = 1.0
              </Formula>
              <p><strong>RDP = 1.0</strong> for dette paret også.</p>
              <Formula>
                Total kostnad Tree 2 = A–B + B–C + C–D + D–E<br/>
                = 5 + 10 + 5 + 5 = 25 ms
              </Formula>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">d) Hvilket tre er best, og hvorfor?</p>
            <Answer>
              <p><strong>Tree 2 (linje) er best globalt</strong> — lavere total trekkostnad (25 vs 65).</p>
              <p className="mt-1">Begge har RDP = 1.0 for A→E, men Tree 2 bruker langt færre nettverksressurser totalt.</p>
              <p className="text-xs text-[var(--muted)] mt-1">Eksamen spør nesten alltid om begge: RDP for et spesifikt par OG total trekkostnad. Svar på begge!</p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Eksamenstips: </span>
          <span className="text-amber-800 dark:text-amber-300">Fyll ALLTID ut hele overlay-tabellen (N*(N-1)/2 = 10 kanter for 5 noder) selv om oppgaven bare ber om én RDP. Du trenger tabellen for å svare riktig.</span>
        </div>
      </ExamYear>

      {/* Mai 2024 */}
      <ExamYear year="Mai 2024">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Samme topologi som Jan 2025:</strong> 5 prosesser A–E på rutere Ra–Re i kjede</p>
          <p>Ra↔Rb = 5, Rb↔Rc = 10, Rc↔Rd = 5, Rd↔Re = 5, Ra↔Re = 40</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Overlay-tabellen — identisk med Jan 2025.</p>
            <Answer>
              <p>Samme overlay-tabell som Jan 2025 (se ovenfor). Topologien er identisk.</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Nøkkelverdi: Ra↔Re = 40, men aldri optimal — kjeden (25) er alltid bedre.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">b) Tree 1: B er rot, linje B–A–C–D–E. Beregn RDP for B→E.</p>
            <Answer>
              <Formula>
                Overlay-sti B→E i Tree 1 = B→A→C→D→E<br/>
                = 5 + 15 + 5 + 5 = 30 ms<br/>
                Beste fysiske B→E = Rb→Rc→Rd→Re = 10+5+5 = 20 ms<br/>
                RDP(B→E, Tree 1) = 30 / 20 = 1.5
              </Formula>
              <p><strong>RDP = 1.5</strong> — overlayet er 50% tregere enn optimal fysisk sti for dette paret.</p>
              <p className="text-xs text-[var(--muted)]">Forklaring: treet tvinger ruten via A som er i feil retning fra B mot E.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">c) Tree 2: A er rot, stjerne A→B, A→C, A→D, A→E. Beregn RDP for B→E.</p>
            <Answer>
              <Formula>
                Overlay-sti B→E i Tree 2 (gjennom roten A) = B→A→E<br/>
                = 5 + 25 = 30 ms<br/>
                Beste fysiske B→E = 20 ms<br/>
                RDP(B→E, Tree 2) = 30 / 20 = 1.5
              </Formula>
              <p><strong>RDP = 1.5</strong> — samme som Tree 1 for dette paret.</p>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Lærdom: </span>
          <span className="text-amber-800 dark:text-amber-300">Trestruktur har STOR innvirkning på RDP. Et godt tre for én kilde kan være ineffektivt for et annet kildepar. Total trekkostnad gir det globale bildet.</span>
        </div>
      </ExamYear>

      {/* Jan 2024 */}
      <ExamYear year="Jan 2024">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>5 prosesser B, C, A, D, E koblet til rutere Rb, Rc, Ra, Rd, Re</strong></p>
          <p>Ra↔Rb = 5, Rb↔Rc = 10, Rc↔Rd = 5, Rd↔Re = 5, Ra↔Re = 40</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">a) Overlay-tabellen — alle 10 kanter.</p>
            <Answer>
              <p>Identisk overlay-tabell som de andre eksamene — samme fysiske topologi. Se Jan 2025 for fullstendig tabell.</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Stikkord: A–D = 20, A–E = 25, B–E = 20, C–E = 10, D–E = 5.</p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">b) Tree 1 (A-stjerne: A→B, A→C, A→D, A→E). Beregn total kostnad og RDP for A→D.</p>
            <Answer>
              <Formula>
                Overlay-sti A→D = direkte kant A–D = 20 ms<br/>
                Beste fysiske A→D = Ra→Rb→Rc→Rd = 5+10+5 = 20 ms<br/>
                RDP(A→D, Tree 1) = 20/20 = 1.0<br/>
                Total kostnad Tree 1 = 5+15+20+25 = 65 ms
              </Formula>
              <p><strong>RDP = 1.0, Total kostnad = 65 ms</strong></p>
            </Answer>
          </div>

          <div>
            <p className="font-semibold text-sm">c) Tree 2 (linje A–B–C–D–E). Beregn total kostnad og RDP for A→D.</p>
            <Answer>
              <Formula>
                Overlay-sti A→D i linja = A→B→C→D = 5+10+5 = 20 ms<br/>
                Beste fysiske A→D = 20 ms<br/>
                RDP(A→D, Tree 2) = 20/20 = 1.0<br/>
                Total kostnad Tree 2 = 5+10+5+5 = 25 ms
              </Formula>
              <p><strong>RDP = 1.0, Total kostnad = 25 ms</strong></p>
              <p className="mt-1">Tree 2 er bedre totalt — samme RDP men mye lavere trekkostnad.</p>
            </Answer>
          </div>
        </div>
      </ExamYear>

      {/* 2022 */}
      <ExamYear year="2022">
        <div className="text-sm space-y-1 text-[var(--muted)]">
          <p><strong>Tilsvarende overlay RDP-oppgave som øvrige eksamener</strong></p>
          <p>Tegn overlay, beregn alle kanter, finn RDP for gitte par, sammenlign to trær.</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-sm">Generell fremgangsmåte (identisk hvert år)</p>
            <Answer>
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Tegn overlay-grafen:</strong> N*(N-1)/2 kanter for N noder</li>
                <li><strong>Finn beste fysiske sti</strong> mellom hvert par (Dijkstra eller inspeksjon)</li>
                <li><strong>Fyll inn forsinkelse</strong> i overlay-tabellen</li>
                <li><strong>For et gitt tre:</strong> finn stien i treet mellom de to nodene (summer kantene langs stien)</li>
                <li><strong>RDP = tresti-forsinkelse / fysisk-best-forsinkelse</strong></li>
                <li><strong>Total kostnad</strong> = summer ALLE kanter i treet</li>
                <li><strong>Sammenlign:</strong> lavere RDP for det aktuelle paret, lavere total kostnad for global effektivitet</li>
              </ol>
            </Answer>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 px-4 py-3 text-sm">
          <span className="font-bold text-amber-700 dark:text-amber-400">Mønster: </span>
          <span className="text-amber-800 dark:text-amber-300">Oppgave 8 er nesten identisk hvert år — samme fysiske topologi, ulike trestrukturer. Lær fremgangsmåten, ikke tallene. Eksamen gir alltid poeng for korrekt prosedyre.</span>
        </div>
      </ExamYear>
    </div>
  );
}
