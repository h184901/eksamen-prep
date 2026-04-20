"use client";

import { useState } from "react";
import Link from "next/link";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";
import FormulaBox from "@/components/FormulaBox";

export default function ObligerPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      {/* Breadcrumb & header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <Link href="/ing164/eksamen" className="hover:text-[var(--accent)]">Eksamensøving</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Obliger</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Obligatoriske oppgaver</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle oppgavene fra de tre obligatoriske innleveringene med fullstendige
          løsningsforslag, formelhenvisninger og lenker til relevant teori.
        </p>
      </div>

      {/* Oblig selector */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { id: "oblig1", label: "Oblig 1", desc: "Kinematikk, prosjektilbevegelse, Newtons lover", chapters: "Kap 2–5", count: "3 oppgaver" },
          { id: "oblig2", label: "Oblig 2", desc: "Sirkelbevegelse, arbeid-energi, kollisjoner, rotasjon", chapters: "Kap 5–10", count: "4 oppgaver" },
          { id: "oblig3", label: "Oblig 3", desc: "Rotasjon, elektrostatikk, potensial, kondensatorer", chapters: "Kap 9–10, 21–24", count: "4 oppgaver" },
        ].map((ob) => (
          <button key={ob.id} onClick={() => setSelected(selected === ob.id ? null : ob.id)}
            className={`text-left rounded-xl border-2 p-5 transition-all ${selected === ob.id ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-md" : "border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:shadow-sm"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg">{ob.label}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">{ob.chapters}</span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-2">{ob.desc}</p>
            <span className="text-xs text-[var(--muted)]">{ob.count}</span>
          </button>
        ))}
      </div>

      {/* Velg-prompt */}
      {!selected && (
        <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-8 text-center">
          <p className="text-lg font-semibold text-[var(--muted)] mb-1">Velg en oblig over for å se oppgavene</p>
          <p className="text-sm text-[var(--muted)]">Klikk på en av de tre obligene for å se oppgaver med løsningsforslag.</p>
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* OBLIG 1 — Kinematikk, prosjektilbevegelse, Newtons lover */}
      {/* ════════════════════════════════════════════════ */}
      {selected === "oblig1" && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold">Oblig 1</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">Kap 2–5</span>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">Kinematikk, prosjektilbevegelse, sirkelbevegelse og Newtons lover.</p>

          {/* ─── OPPGAVE 1: Kjelke på snøbakke ─── */}
          <ExerciseCard
            number={1}
            title="Kjelke på snøbakke — rettlinjet bevegelse"
            difficulty="lett"
            source="Oblig 1"
            relevantChapters={[
              { href: "/ing164/kapittel-2/teori", title: "Kap 2 — Rettlinjet bevegelse" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 420 160" className="w-full max-w-md mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f0f9ff, #ffffff)" }}>
                  <polygon points="40,140 370,50 370,140" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5" />
                  <circle cx="200" cy="108" r="1" fill="#bae6fd" /><circle cx="260" cy="90" r="1" fill="#bae6fd" /><circle cx="310" cy="75" r="1" fill="#bae6fd" /><circle cx="150" cy="120" r="1" fill="#bae6fd" />
                  <line x1="50" y1="136" x2="355" y2="55" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="358,54 348,49 351,59" fill="#ef4444" />
                  <text x="362" y="52" fontSize="14" fill="#ef4444" fontWeight="bold">x</text>
                  <rect x="115" y="106" width="42" height="13" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" transform="rotate(-15 136 112)" />
                  <line x1="162" y1="104" x2="210" y2="90" stroke="#22c55e" strokeWidth="2.5" />
                  <polygon points="213,89 203,84 206,94" fill="#22c55e" />
                  <text x="216" y="87" fontSize="12" fill="#22c55e" fontWeight="bold" fontStyle="italic">v</text>
                  <text x="30" y="155" fontSize="11" fill="#64748b">x = 0</text>
                </svg>

                <p className="mb-3">Ei jente sender en kjelke oppover en snøbakke. Kjelken beveger seg langs ei rett linje, og posisjonen <InlineLatex latex="x(t)" /> er:</p>
                <p className="text-center my-2"><InlineLatex latex="x(t) = C_1 t^2 + C_2 t" /></p>
                <p className="mb-3">der <InlineLatex latex="C_1 = -1{,}0 \text{ m/s}^2" /> og <InlineLatex latex="C_2 = 10 \text{ m/s}" />.</p>
                <p className="mb-1">a) Regn ut kjelkens fart og akselerasjon som funksjon av tiden.</p>
                <p className="mb-1">b) Hvor langt oppover bakken kommer kjelken før den begynner å gli ned igjen?</p>
                <p className="mb-1">c) Hvor lang tid tar det før kjelken er tilbake ved startpunktet? Hvor stor fart har kjelken da?</p>
                <p>d) Tegn <InlineLatex latex="x" />-<InlineLatex latex="t" /> og <InlineLatex latex="v" />-<InlineLatex latex="t" /> diagrammer for kjelkens bevegelse.</p>
              </div>
            }
            hints={[
              { label: "Hint 1", content: <p>Fart er den deriverte av posisjon: <InlineLatex latex="v(t) = \frac{dx}{dt}" />. Akselerasjon er den deriverte av fart: <InlineLatex latex="a(t) = \frac{dv}{dt}" />.</p> },
              { label: "Hint 2", content: <p>Kjelken snur (begynner å gli ned) når farten er null. Sett <InlineLatex latex="v(t) = 0" /> og løs for <InlineLatex latex="t" />.</p> },
              { label: "Hint 3", content: <p>Startpunktet er <InlineLatex latex="x = 0" />. Sett <InlineLatex latex="x(t) = 0" /> og faktoriser for å finne <InlineLatex latex="t" />.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) fart og akselerasjon", formulas: <div><p><InlineLatex latex="v(t) = \frac{dx}{dt} = 2C_1 t + C_2" /></p><p><InlineLatex latex="a(t) = \frac{dv}{dt} = 2C_1" /></p></div> },
              { subQuestion: "b) maksimal posisjon", formulas: <div><p>Sett <InlineLatex latex="v(t) = 0" /> for å finne vendepunktet</p><p>Sett inn i <InlineLatex latex="x(t)" /> for <InlineLatex latex="x_\text{max}" /></p></div> },
              { subQuestion: "c) tilbake ved start", formulas: <div><p>Sett <InlineLatex latex="x(t) = 0" /> og faktoriser: <InlineLatex latex="t(C_1 t + C_2) = 0" /></p></div> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Posisjonen er gitt som funksjon av tid <InlineLatex latex="x(t)" />. Hele kinematikken kan bygges opp ved derivasjon: posisjon ⇒ fart ⇒ akselerasjon. Vendepunktet (der kjelken snur) finner vi ved å løse <InlineLatex latex="v(t) = 0" />. Startpunktet er <InlineLatex latex="x = 0" />, så tilbakekomsten finner vi ved å løse <InlineLatex latex="x(t) = 0" /> for <InlineLatex latex="t > 0" />.</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — kinematikk i 1D</p>
                  <p>Tre store sammenhenger:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Fart = momentanhastighet = stigningstall til <InlineLatex latex="x(t)" />: <InlineLatex latex="v = dx/dt" /></li>
                    <li>Akselerasjon = endring i fart per tid: <InlineLatex latex="a = dv/dt = d^2 x/dt^2" /></li>
                    <li>Med <InlineLatex latex="x(t) = C_1 t^2 + C_2 t" /> blir <InlineLatex latex="v(t) = 2C_1 t + C_2" /> og <InlineLatex latex="a(t) = 2C_1" /> — en parabel for posisjon ⇒ rett linje for fart ⇒ konstant akselerasjon.</li>
                  </ul>
                  <p className="mt-1">Vi kan kjenne igjen formen: dette er klassisk konstant-akselerasjon-bevegelse. <InlineLatex latex="x(t) = v_0 t + \tfrac{1}{2}a t^2" /> med <InlineLatex latex="v_0 = C_2 = 10" /> m/s og <InlineLatex latex="a = 2C_1 = -2{,}0" /> m/s².</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <p><InlineLatex latex="x(t) = C_1 t^2 + C_2 t" />, &nbsp; <InlineLatex latex="C_1 = -1{,}0\;\text{m/s}^2" />, &nbsp; <InlineLatex latex="C_2 = 10\;\text{m/s}" /></p>
                  <p>Startfart positiv (oppover bakken), <InlineLatex latex="C_1" /> negativ ⇒ kjelken bremses (konstant deselerasjon).</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Fart og akselerasjon som funksjon av tid</p>
                <FormulaBox
                  latex="v(t) = \frac{dx}{dt} = 2C_1 t + C_2 = -2{,}0\,t + 10\;\;\text{[m/s]}"
                  variant="blue"
                />
                <FormulaBox
                  latex="a(t) = \frac{dv}{dt} = 2C_1 = -2{,}0\;\text{m/s}^2"
                  variant="gold"
                />
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Akselerasjonen er <em>konstant</em> og negativ (rettet nedover bakken). Det fysiske bildet: tyngdekomponenten <InlineLatex latex="g\sin\theta" /> (kanskje minus en liten friksjon, eller pluss om vi tenker på den glatte snøen) virker på kjelken hele tiden. Ved <InlineLatex latex="t = 0" /> har den fart 10 m/s oppover, men deselereres jevnt med 2,0 m/s². Hvis vi antar at akselerasjonen kun skyldes tyngden, gir <InlineLatex latex="2{,}0 = 9{,}81\sin\theta" /> en bakkevinkel på <InlineLatex latex="\theta \approx 11{,}8°" />.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Hvor langt opp før kjelken snur?</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Hvorfor settes <InlineLatex latex="v = 0" /> ved vendepunktet?</p>
                  <p>Kjelken må stoppe ET ØYEBLIKK før den snur retning — den kan ikke ha både positiv og negativ fart samtidig. Akkurat i vendepunktet er <InlineLatex latex="v = 0" />. Akselerasjonen er FORTSATT −2,0 m/s² (tyngden virker uavbrutt) — derfor snur kjelken og begynner å akselerere nedover.</p>
                </div>
                <FormulaBox
                  latex="v(t) = 0 \;\Longrightarrow\; -2{,}0\,t + 10 = 0 \;\Longrightarrow\; t_\text{snu} = 5{,}0\;\text{s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="x_\text{max} = x(5{,}0) = -1{,}0\cdot 5{,}0^2 + 10\cdot 5{,}0 = -25 + 50 = 25\;\text{m}"
                  variant="gold"
                />
                <p className="font-medium">Kjelken kommer 25 m oppover bakken før den snur.</p>

                <p className="font-semibold text-[var(--accent)]">c) Tilbake ved startpunktet</p>
                <p>Setter <InlineLatex latex="x(t) = 0" /> og faktoriserer for å finne tidspunktene:</p>
                <FormulaBox
                  latex="-1{,}0\,t^2 + 10\,t = 0 \;\Longrightarrow\; t(-1{,}0\,t + 10) = 0"
                  variant="blue"
                />
                <p>To løsninger: <InlineLatex latex="t = 0" /> (selve startøyeblikket) og <InlineLatex latex="t = 10" /> s (tilbake ved start).</p>
                <FormulaBox
                  latex="v(10) = -2{,}0\cdot 10 + 10 = -10\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;t = 10\;\text{s},\;\;|v| = 10\;\text{m/s}\;\text{nedover bakken}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Symmetri — sjekk!</p>
                  <p>Med KONSTANT akselerasjon er bevegelsen symmetrisk rundt vendepunktet: like lang tid opp (0–5 s) som ned (5–10 s), og farten ved samme høyde er like stor i begge retninger. Det stemmer her: 10 m/s opp ⇒ 10 m/s ned, og 5 s + 5 s = 10 s totalt. Energiperspektiv: kinetisk energi ved start er <InlineLatex latex="\tfrac{1}{2}mv_0^2" />, og uten friksjon havner all denne energien tilbake som kinetisk energi når vi er på samme høyde — derfor samme fart-størrelse.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) x-t og v-t diagrammer</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-center mb-1">x-t diagram</p>
                    <svg viewBox="0 0 280 190" className="w-full rounded bg-white dark:bg-neutral-900">
                      <line x1="40" y1="165" x2="265" y2="165" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="40" y1="170" x2="40" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="255" y="180" fontSize="10" fill="#64748b" fontStyle="italic">t (s)</text>
                      <text x="8" y="20" fontSize="10" fill="#64748b" fontStyle="italic">x (m)</text>
                      <line x1="150" y1="165" x2="150" y2="160" stroke="#94a3b8" strokeWidth="1" />
                      <text x="146" y="177" fontSize="9" fill="#94a3b8">5</text>
                      <line x1="260" y1="165" x2="260" y2="160" stroke="#94a3b8" strokeWidth="1" />
                      <text x="253" y="177" fontSize="9" fill="#94a3b8">10</text>
                      <line x1="40" y1="25" x2="45" y2="25" stroke="#94a3b8" strokeWidth="1" />
                      <text x="18" y="29" fontSize="9" fill="#94a3b8">25</text>
                      <line x1="150" y1="165" x2="150" y2="25" stroke="#e2e8f0" strokeWidth="0.7" strokeDasharray="4 3" />
                      <line x1="40" y1="25" x2="150" y2="25" stroke="#e2e8f0" strokeWidth="0.7" strokeDasharray="4 3" />
                      <path d="M 40,165 Q 95,55 150,25 Q 205,55 260,165" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                      <circle cx="150" cy="25" r="4" fill="#ef4444" />
                      <text x="155" y="20" fontSize="9" fill="#ef4444" fontWeight="bold">(5, 25)</text>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-center mb-1">v-t diagram</p>
                    <svg viewBox="0 0 280 190" className="w-full rounded bg-white dark:bg-neutral-900">
                      <line x1="40" y1="95" x2="265" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="40" y1="175" x2="40" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="255" y="110" fontSize="10" fill="#64748b" fontStyle="italic">t (s)</text>
                      <text x="3" y="20" fontSize="10" fill="#64748b" fontStyle="italic">v (m/s)</text>
                      <line x1="150" y1="95" x2="150" y2="90" stroke="#94a3b8" strokeWidth="1" />
                      <text x="146" y="108" fontSize="9" fill="#94a3b8">5</text>
                      <line x1="260" y1="95" x2="260" y2="90" stroke="#94a3b8" strokeWidth="1" />
                      <text x="253" y="108" fontSize="9" fill="#94a3b8">10</text>
                      <text x="20" y="30" fontSize="9" fill="#94a3b8">10</text>
                      <text x="12" y="170" fontSize="9" fill="#94a3b8">{"-10"}</text>
                      <line x1="40" y1="25" x2="260" y2="170" stroke="#3b82f6" strokeWidth="2.5" />
                      <circle cx="150" cy="95" r="4" fill="#3b82f6" />
                      <text x="155" y="90" fontSize="9" fill="#3b82f6" fontWeight="bold">v = 0</text>
                    </svg>
                  </div>
                </div>
                <p><strong>x-t diagrammet</strong> er en nedovervendt parabel med toppunkt ved (5 s, 25 m). <strong>v-t diagrammet</strong> er en rett linje som faller fra 10 m/s til −10 m/s og krysser null ved <InlineLatex latex="t = 5" /> s.</p>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Derivasjon av posisjon gir fart; derivasjon av fart gir akselerasjon</li>
                    <li>Vendepunkt = der farten er null</li>
                    <li>Konstant akselerasjon gir parabolsk x(t) og lineær v(t)</li>
                    <li>Symmetri: med konstant akselerasjon er opp- og nedturen like lange</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 2: Stein fra stup ─── */}
          <ExerciseCard
            number={2}
            title="Stein fra stup — prosjektilbevegelse"
            difficulty="vanskelig"
            source="Oblig 1"
            relevantChapters={[
              { href: "/ing164/kapittel-3/teori", title: "Kap 3 — Prosjektilbevegelse" },
              { href: "/ing164/kapittel-2/teori", title: "Kap 2 — Kinematikk" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 440 250" className="w-full max-w-lg mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f0f9ff, #ecfdf5)" }}>
                  <rect x="110" y="200" width="330" height="50" fill="#bbf7d0" />
                  <rect x="0" y="75" width="110" height="175" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1.5" />
                  <rect x="0" y="68" width="118" height="12" fill="#e7e5e4" stroke="#d6d3d1" strokeWidth="1" />
                  <circle cx="85" cy="53" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                  <line x1="85" y1="60" x2="85" y2="70" stroke="#d97706" strokeWidth="1.5" />
                  <line x1="90" y1="57" x2="115" y2="33" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="117,31 109,30 112,38" fill="#ef4444" />
                  <text x="120" y="30" fontSize="10" fill="#ef4444" fontWeight="bold">v₀ = 25 m/s</text>
                  <path d="M 102 57 A 15 15 0 0 1 96 45" fill="none" stroke="#ef4444" strokeWidth="1.2" />
                  <text x="104" y="49" fontSize="9" fill="#ef4444">70°</text>
                  <path d="M 90 57 C 160 -35, 290 25, 365 200" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 3" />
                  <circle cx="162" cy="5" r="3.5" fill="#8b5cf6" />
                  <text x="168" y="9" fontSize="9" fill="#8b5cf6" fontWeight="bold">toppunkt</text>
                  <line x1="115" y1="75" x2="115" y2="200" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
                  <text x="120" y="142" fontSize="10" fill="#64748b" fontWeight="bold">30 m</text>
                  <circle cx="365" cy="200" r="3.5" fill="#ef4444" />
                  <line x1="85" y1="75" x2="85" y2="10" stroke="#94a3b8" strokeWidth="0.7" strokeDasharray="3 2" />
                  <text x="75" y="10" fontSize="9" fill="#94a3b8">y</text>
                  <line x1="85" y1="75" x2="420" y2="75" stroke="#94a3b8" strokeWidth="0.7" strokeDasharray="3 2" />
                  <text x="422" y="72" fontSize="9" fill="#94a3b8">x</text>
                  <text x="120" y="218" fontSize="9" fill="#64748b">y = −30 m</text>
                </svg>

                <p className="mb-3">Vi kaster en stein skrått oppover fra toppen av et bratt stup. Nedenfor er landskapet flatt, og det ligger 30 m lavere enn toppen av stupet. Startfarten er 25 m/s og danner en vinkel på 70° med horisontalplanet. Vi ser bort fra luftmotstanden.</p>
                <p className="mb-1">a) Hvor høyt over utgangspunktet er steinen i det høyeste punktet?</p>
                <p className="mb-1">b) Hvor lang tid tar det før steinen treffer bakken? Hvor treffer steinen bakken?</p>
                <p className="mb-1">c) Regn ut fartens verdi og retning idet steinen treffer bakken.</p>
                <p>d) Er det mulig å treffe samme punkt på bakken ved å kaste ballen med samme startfart, men en annen utgangsvinkel? Regn i tilfelle ut denne vinkelen.</p>
              </div>
            }
            hints={[
              { label: "Hint 1", content: <p>Splitt startfarten i komponenter: <InlineLatex latex="v_{0x} = v_0 \cos 70°" /> og <InlineLatex latex="v_{0y} = v_0 \sin 70°" />. Horisontal og vertikal bevegelse er uavhengige.</p> },
              { label: "Hint 2", content: <p>Ved høyeste punkt er <InlineLatex latex="v_y = 0" />. Bakken er ved <InlineLatex latex="y = -30" /> m. Sett inn i kinematiske ligninger.</p> },
              { label: "Hint 3", content: <p>For d): Sett opp baneligningen med ukjent <InlineLatex latex="\alpha" /> og kjent landingspunkt. Bruk dobbeltvinkelidentiteter for å løse.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) høyeste punkt", formulas: <div><p><InlineLatex latex="v_y = v_{0y} - gt = 0 \;\Rightarrow\; t_\text{topp} = \frac{v_{0y}}{g}" /></p><p><InlineLatex latex="y_\text{max} = v_{0y} t - \tfrac{1}{2}g t^2" /></p></div> },
              { subQuestion: "b) treffer bakken", formulas: <div><p><InlineLatex latex="y = v_{0y}t - \tfrac{1}{2}gt^2 = -30" /> (andregradslikning)</p><p><InlineLatex latex="x = v_{0x} \cdot t" /></p></div> },
              { subQuestion: "c) fart ved landing", formulas: <div><p><InlineLatex latex="v_x = v_{0x}" />, &nbsp; <InlineLatex latex="v_y = v_{0y} - gt" /></p><p><InlineLatex latex="v = \sqrt{v_x^2 + v_y^2}" />, &nbsp; <InlineLatex latex="\alpha = \arctan(v_y / v_x)" /></p></div> },
              { subQuestion: "d) alternativ vinkel", formulas: <div><p>Bruk: <InlineLatex latex="\sin\alpha\cos\alpha = \tfrac{1}{2}\sin 2\alpha" /></p><p>og <InlineLatex latex="\cos^2\alpha = \tfrac{1}{2}(1 + \cos 2\alpha)" /></p></div> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Prosjektilbevegelse er to UAVHENGIGE 1D-bevegelser: konstant fart i x-retning (ingen kraft) og fri-fall med <InlineLatex latex="a_y = -g" /> i y-retning. Trikset er å splitte startfarten i komponenter, behandle hver akse alene, og koble dem sammen via tiden <InlineLatex latex="t" /> som er felles for begge. Velger origo i kastepunktet, +y oppover, +x i kastets retning. Bakken ligger da på <InlineLatex latex="y = -30" /> m.</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — kinematikkligningene for prosjektil</p>
                  <p>Med startposisjon <InlineLatex latex="(0,0)" /> og startfart <InlineLatex latex="(v_{0x}, v_{0y})" />:</p>
                  <p className="mt-1"><InlineLatex latex="x(t) = v_{0x}t" /> &nbsp;&nbsp;,&nbsp;&nbsp; <InlineLatex latex="v_x(t) = v_{0x}" /> &nbsp;&nbsp;(konstant)</p>
                  <p><InlineLatex latex="y(t) = v_{0y}t - \tfrac{1}{2}g t^2" /> &nbsp;&nbsp;,&nbsp;&nbsp; <InlineLatex latex="v_y(t) = v_{0y} - gt" /></p>
                  <p className="mt-1">Komponenter av startfarten: <InlineLatex latex="v_{0x} = v_0\cos\alpha_0" />, <InlineLatex latex="v_{0y} = v_0\sin\alpha_0" />.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li><InlineLatex latex="v_0 = 25\;\text{m/s}" />, &nbsp; <InlineLatex latex="\alpha_0 = 70°" /></li>
                    <li>Bakken: <InlineLatex latex="y_\text{bakke} = -30\;\text{m}" /></li>
                    <li>Komponenter: <InlineLatex latex="v_{0x} = 25\cos 70° \approx 8{,}55\;\text{m/s}" /></li>
                    <li><InlineLatex latex="v_{0y} = 25\sin 70° \approx 23{,}49\;\text{m/s}" /></li>
                  </ul>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Høyeste punkt</p>
                <p>Ved toppen er <InlineLatex latex="v_y = 0" /> (men <InlineLatex latex="v_x" /> er fortsatt 8,55 m/s — viktig poeng).</p>
                <FormulaBox
                  latex="v_y = v_{0y} - gt = 0 \;\Longrightarrow\; t_\text{topp} = \frac{v_{0y}}{g} = \frac{23{,}49}{9{,}81} \approx 2{,}39\;\text{s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="y_\text{max} = v_{0y}\,t_\text{topp} - \tfrac{1}{2}g\,t_\text{topp}^2 = 23{,}49\cdot 2{,}39 - \tfrac{1}{2}\cdot 9{,}81\cdot 2{,}39^2"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;y_\text{max} \approx 28{,}1\;\text{m over kastepunktet}\;}"
                  variant="gold"
                />
                <p>Det vil si ca. 58,1 m over bakken (siden bakken er 30 m under kastepunktet).</p>

                <p className="font-semibold text-[var(--accent)]">b) Når og hvor treffer steinen bakken?</p>
                <p>Bakken er ved <InlineLatex latex="y = -30" /> m. Setter <InlineLatex latex="y(t) = -30" /> i den vertikale bevegelsesligningen:</p>
                <FormulaBox
                  latex="23{,}49\,t - 4{,}905\,t^2 = -30 \;\Longrightarrow\; 4{,}905\,t^2 - 23{,}49\,t - 30 = 0"
                  variant="blue"
                />
                <p>Andregradsformelen <InlineLatex latex="t = (-b\pm\sqrt{b^2-4ac})/(2a)" /> med <InlineLatex latex="a = 4{,}905" />, <InlineLatex latex="b = -23{,}49" />, <InlineLatex latex="c = -30" />:</p>
                <FormulaBox
                  latex="t = \frac{23{,}49 \pm \sqrt{23{,}49^2 + 4\cdot 4{,}905\cdot 30}}{2\cdot 4{,}905} = \frac{23{,}49 \pm 33{,}77}{9{,}81}"
                  variant="blue"
                />
                <p>Positiv løsning gir <InlineLatex latex="t \approx 5{,}84" /> s (negativ ignoreres — det ville vært "før kastet"):</p>
                <FormulaBox
                  latex="x = v_{0x}\,t = 8{,}55\cdot 5{,}84 \approx 49{,}9\;\text{m}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;t \approx 5{,}84\;\text{s},\;\;x \approx 49{,}9\;\text{m fra stupets fot}\;}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">c) Fart og retning ved landing</p>
                <p>Horisontal fart er uendret (ingen horisontal kraft):</p>
                <FormulaBox
                  latex="v_x = v_{0x} = 8{,}55\;\text{m/s}"
                  variant="blue"
                />
                <p>Vertikal fart ved landing (negativ = nedover):</p>
                <FormulaBox
                  latex="v_y = v_{0y} - gt = 23{,}49 - 9{,}81\cdot 5{,}84 \approx -33{,}80\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="|\vec v| = \sqrt{v_x^2 + v_y^2} = \sqrt{8{,}55^2 + 33{,}80^2} \approx 34{,}9\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\tan\alpha = \frac{v_y}{v_x} = \frac{-33{,}80}{8{,}55} \approx -3{,}95 \;\Longrightarrow\; \alpha \approx -75{,}8°"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v \approx 34{,}9\;\text{m/s},\;\;75{,}8°\;\text{under horisontalen}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning og energisjekk</p>
                  <p>Steinen treffer med 34,9 m/s — mye raskere enn startfarten 25 m/s. Energibevaring forklarer det: ved kastepunktet hadde den <InlineLatex latex="\tfrac{1}{2}m v_0^2" />; ved bakken (30 m under) har den dette pluss <InlineLatex latex="mgh = mg\cdot 30" />. Sjekk: <InlineLatex latex="v = \sqrt{v_0^2 + 2g\cdot 30} = \sqrt{625 + 588{,}6} = \sqrt{1213{,}6} \approx 34{,}8" /> m/s. ✓ (Liten avrundingsforskjell.)</p>
                  <p className="mt-1">Retningen 75,8° under horisontalen viser at den vertikale farten dominerer ved landing — steinen "stuper".</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Finnes det en alternativ kastevinkel?</p>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — baneligningen og hvorfor den gir to vinkler</p>
                  <p>Hvis vi eliminerer <InlineLatex latex="t" /> fra <InlineLatex latex="x = v_0 t\cos\alpha" /> og <InlineLatex latex="y = v_0 t\sin\alpha - \tfrac{1}{2}gt^2" />, får vi <em>baneligningen</em>:</p>
                  <p className="mt-1 text-center"><InlineLatex latex="y = x\tan\alpha - \frac{g x^2}{2 v_0^2 \cos^2\alpha}" /></p>
                  <p className="mt-1">For et FAST punkt <InlineLatex latex="(x, y)" /> og fast <InlineLatex latex="v_0" /> blir dette en kompleks (transcendent) ligning i <InlineLatex latex="\alpha" />. Den har vanligvis TO løsninger (eller ingen, hvis punktet er utenfor rekkevidde) — én "høy" lav-fart-bane og én "lav" høy-fart-bane som treffer samme punkt. Den vanlige skole-versjonen er at "kompletterende vinkler" (45°±θ) treffer samme punkt på flat bakke. Fra et stup blir det skjevere.</p>
                </div>

                <p>Treffepunktet vi vil bekrefte er <InlineLatex latex="(x, y) = (49{,}9, -30)" /> m. Setter inn i baneligningen og samler:</p>
                <FormulaBox
                  latex="-30 = 49{,}9\tan\alpha - \frac{9{,}81\cdot 49{,}9^2}{2\cdot 25^2\cos^2\alpha} = 49{,}9\tan\alpha - \frac{19{,}54}{\cos^2\alpha}"
                  variant="blue"
                />

                <p>Multipliser begge sider med <InlineLatex latex="\cos^2\alpha" /> for å fjerne nevneren:</p>
                <FormulaBox
                  latex="-30\cos^2\alpha = 49{,}9\sin\alpha\cos\alpha - 19{,}54"
                  variant="blue"
                />
                <FormulaBox
                  latex="49{,}9\sin\alpha\cos\alpha + 30\cos^2\alpha - 19{,}54 = 0"
                  variant="blue"
                />

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Triks — bruk dobbeltvinkelidentitetene</p>
                  <p>Ligningen blander <InlineLatex latex="\sin\alpha\cos\alpha" /> og <InlineLatex latex="\cos^2\alpha" />. De to identitetene</p>
                  <p className="mt-1 text-center"><InlineLatex latex="\sin\alpha\cos\alpha = \tfrac{1}{2}\sin 2\alpha,\quad \cos^2\alpha = \tfrac{1}{2} + \tfrac{1}{2}\cos 2\alpha" /></p>
                  <p className="mt-1">gjør at vi får én ligning i den nye variabelen <InlineLatex latex="2\alpha" /> — der både sinus og cosinus av samme vinkel forekommer i lineær form. Det er nøkkelen som gjør hele resten håndterlig.</p>
                </div>

                <p>Setter inn:</p>
                <FormulaBox
                  latex="49{,}9\cdot\tfrac{1}{2}\sin 2\alpha + 30\!\left(\tfrac{1}{2} + \tfrac{1}{2}\cos 2\alpha\right) - 19{,}54 = 0"
                  variant="blue"
                />
                <FormulaBox
                  latex="24{,}95\sin 2\alpha + 15\cos 2\alpha + 15 - 19{,}54 = 0"
                  variant="blue"
                />
                <FormulaBox
                  latex="24{,}95\sin 2\alpha + 15\cos 2\alpha = 4{,}54"
                  variant="blue"
                />

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Triks — omskrivning til <InlineLatex latex="R\sin(\theta + \varphi)" /></p>
                  <p>Et uttrykk på formen <InlineLatex latex="A\sin\theta + B\cos\theta" /> kan alltid skrives om til <InlineLatex latex="R\sin(\theta + \varphi)" /> der <InlineLatex latex="R = \sqrt{A^2 + B^2}" /> og <InlineLatex latex="\tan\varphi = B/A" />. Beviset følger av sin-addisjonsformelen <InlineLatex latex="\sin(\theta+\varphi) = \sin\theta\cos\varphi + \cos\theta\sin\varphi" />, der vi identifiserer <InlineLatex latex="A = R\cos\varphi" /> og <InlineLatex latex="B = R\sin\varphi" />. Da har vi bare én sinus-funksjon å invertere — og ARCSIN gir to løsninger i [0°, 360°], det er der "to vinkler"-fenomenet kommer fra.</p>
                </div>

                <p>Med <InlineLatex latex="A = 24{,}95" /> og <InlineLatex latex="B = 15" />:</p>
                <FormulaBox
                  latex="R = \sqrt{24{,}95^2 + 15^2} = \sqrt{622{,}5 + 225} \approx 29{,}11"
                  variant="blue"
                />
                <FormulaBox
                  latex="\varphi = \arctan(B/A) = \arctan(15/24{,}95) \approx 31°"
                  variant="blue"
                />
                <FormulaBox
                  latex="29{,}11\sin(2\alpha + 31°) = 4{,}54 \;\Longrightarrow\; \sin(2\alpha + 31°) = 0{,}156"
                  variant="blue"
                />

                <p>ARCSIN gir to grunnverdier i intervallet <InlineLatex latex="[0°, 360°]" />: hovedverdien og <InlineLatex latex="180° - " /> hovedverdien.</p>
                <FormulaBox
                  latex="2\alpha + 31° = \arcsin(0{,}156) \approx 9° \quad\text{eller}\quad 2\alpha + 31° = 180° - 9° = 171°"
                  variant="blue"
                />
                <p>Løs for <InlineLatex latex="\alpha" /> i hvert tilfelle:</p>
                <FormulaBox
                  latex="\alpha = \frac{9° - 31°}{2} = -11° \quad\text{eller}\quad \alpha = \frac{171° - 31°}{2} = 70°"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;\alpha = 70°\;\text{(originalen)}\;\;\text{eller}\;\;\alpha \approx -11°\;\text{(11° UNDER horisontalen)}\;}"
                  variant="gold"
                />

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Vanlige feil og fysisk tolkning</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Mange glemmer at man kan kaste NEDOVER fra et stup. Vi forventer ofte to OPPADGÅENDE vinkler (som ved skuddvinkel på flat bakke), men her er den ene under horisontalen.</li>
                    <li>Den nedoverrettede banen er kortere i tid og treffer treffepunktet med større fart — ofte ikke det vi vil i praksis (mer skade).</li>
                    <li>Vinklene "70° opp" og "11° ned" er IKKE supplementære. Symmetrien er rundt 45°-vinkelen som maksimerer rekkevidden på flat bakke; her er bakken under, så symmetripunktet flyttes.</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Prosjektil = to uavhengige 1D-bevegelser, koblet via tiden t</li>
                    <li>Toppunkt: <InlineLatex latex="v_y = 0" />, men <InlineLatex latex="v_x" /> er fortsatt der</li>
                    <li>Energibevaring sjekker farten ved landing rask: <InlineLatex latex="v = \sqrt{v_0^2 + 2g\Delta h}" /></li>
                    <li>Baneligningen + dobbeltvinkelidentiteter gir alternative kastevinkler</li>
                    <li>Omskrivning <InlineLatex latex="A\sin\theta + B\cos\theta = R\sin(\theta+\varphi)" /> er en kraftig teknikk</li>
                    <li>ARCSIN gir alltid to løsninger — derfor finnes det vanligvis to kastevinkler</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 3: Sirkelbevegelse og krefter ─── */}
          <ExerciseCard
            number={3}
            title="Sirkelbevegelse og Newtons lover"
            difficulty="middels"
            source="Oblig 1"
            relevantChapters={[
              { href: "/ing164/kapittel-3/teori", title: "Kap 3 — Sirkelbevegelse" },
              { href: "/ing164/kapittel-4/teori", title: "Kap 4 — Newtons lover" },
              { href: "/ing164/kapittel-5/teori", title: "Kap 5 — Anvendelse av Newtons lover" },
            ]}
            problem={
              <div>
                <p className="mb-1">a) En sleggekaster svinger slegga i en horisontal sirkelbane med radius 1,5 m. Hvor mange omløp må slegga gjøre per sekund dersom sentripetalakselerasjonen skal være lik tyngdeakselerasjonen?</p>
                <p className="mb-1">b) Et legeme beveger seg med urviseren i en sirkelbane med radius 2,0 m. Banefarten varierer med tida som <InlineLatex latex="v(t) = A + Bt" /> der <InlineLatex latex="A = 5{,}0 \text{ m/s}" /> og <InlineLatex latex="B = -0{,}10 \text{ m/s}^2" />. Regn ut akselerasjonens normalkomponent og parallellkomponent etter 5,0 s.</p>
                <p className="mb-1">c) Vi bruker et tau til å trekke en vogn. Vogna har en masse på 1000 kg og ruller med neglisjerbar friksjon på en horisontal skinnegang. Tegn et frittlegemediagram for vogna og sett navn på alle kreftene. Regn ut verdier på de av kreftene som du har nok opplysninger til å regne ut.</p>
                <p>d) Tauet for vogna i forrige oppgave vil ryke dersom snordraget overskrider 3500 N. Hvilken akselerasjon kan vi maksimalt gi vogna uten at tauet ryker?</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Sentripetalakselerasjon: <InlineLatex latex="a_s = v^2/r" />. Sett <InlineLatex latex="a_s = g" /> og bruk <InlineLatex latex="v = 2\pi r / T" /> for å finne frekvens.</p> },
              { label: "Hint b", content: <p>Normalkomponenten er <InlineLatex latex="a_\perp = v^2/r" /> (mot sentrum). Parallellkomponenten er <InlineLatex latex="a_\parallel = dv/dt" /> (tangentiell).</p> },
              { label: "Hint c", content: <p>Tre krefter: tyngde ned, normalkraft opp, snordrag horisontalt. Bruk Newtons 2. lov i y-retning.</p> },
              { label: "Hint d", content: <p><InlineLatex latex="S = ma \;\Rightarrow\; a_\text{max} = S_\text{max}/m" /></p> },
            ]}
            formulaHints={[
              { subQuestion: "a) omløpsfrekvens", formulas: <div><p><InlineLatex latex="a_s = v^2/r = g \;\Rightarrow\; v = \sqrt{gr}" /></p><p><InlineLatex latex="T = 2\pi r / v" />, &nbsp; <InlineLatex latex="f = 1/T" /></p></div> },
              { subQuestion: "b) akselerasjonskomponenter", formulas: <div><p><InlineLatex latex="a_\perp = v^2/r" /> (sentripetalakselerasjon)</p><p><InlineLatex latex="a_\parallel = dv/dt = B" /> (tangentiell)</p></div> },
              { subQuestion: "c) frittlegemediagram", formulas: <div><p><InlineLatex latex="\sum F_y = 0: \; N - mg = 0" /></p><p><InlineLatex latex="mg = 1000 \cdot 9{,}81 \text{ N}" /></p></div> },
              { subQuestion: "d) maks akselerasjon", formulas: <p><InlineLatex latex="\sum F_x = ma \;\Rightarrow\; a_\text{max} = S_\text{max}/m" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Tre uavhengige scenarier som tester sirkelbevegelse, akselerasjonens komponenter, og Newtons 2. lov. Felles tråd: identifiser kreftene, sett opp Newton i radial og/eller tangentiell retning, og isoler den størrelsen vi spør etter. Fysisk intuisjon: <InlineLatex latex="a_\perp" /> (mot sentrum) holder legemet i banen, <InlineLatex latex="a_\parallel" /> (langs banen) endrer farten.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Sleggekaster — omløpsfrekvens</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — sentripetalakselerasjon</p>
                  <p>Et legeme i jevn sirkelbevegelse har akselerasjon <InlineLatex latex="a_s = v^2/r" /> rettet mot sentrum, selv om banefarten er konstant. Akselerasjonen kommer av at <em>retningen</em> til hastighetsvektoren endres hele tiden. Sammenheng mellom fart, radius og periode: <InlineLatex latex="v = 2\pi r/T" /> (omkrets/periode). Frekvens er invers periode: <InlineLatex latex="f = 1/T" />.</p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <p><InlineLatex latex="r = 1{,}5\;\text{m}" />, &nbsp; <InlineLatex latex="a_s = g = 9{,}81\;\text{m/s}^2" /></p>
                </div>
                <p>Setter <InlineLatex latex="a_s = g" /> og løser for farten:</p>
                <FormulaBox
                  latex="\frac{v^2}{r} = g \;\Longrightarrow\; v = \sqrt{gr} = \sqrt{9{,}81\cdot 1{,}5} \approx 3{,}84\;\text{m/s}"
                  variant="blue"
                />
                <p>Omløpstid og frekvens:</p>
                <FormulaBox
                  latex="T = \frac{2\pi r}{v} = \frac{2\pi\cdot 1{,}5}{3{,}84} \approx 2{,}46\;\text{s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;f = \frac{1}{T} \approx 0{,}41\;\text{omløp/s}\;}"
                  variant="gold"
                />
                <p>Med ord: ett omløp hvert 2,5 s — overraskende langsomt for at sentripetalakselerasjonen skal nå tyngdens akselerasjon med så liten radius.</p>

                <p className="font-semibold text-[var(--accent)]">b) Sirkelbevegelse med VARIERENDE fart</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — to akselerasjonskomponenter</p>
                  <p>Når farten ikke er konstant i sirkelbevegelse, har akselerasjonen to perpendikulære komponenter:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li><strong>Normal (radial)</strong>: <InlineLatex latex="a_\perp = v^2/r" />, peker mot sentrum, holder legemet i banen.</li>
                    <li><strong>Tangentiell (langs banen)</strong>: <InlineLatex latex="a_\parallel = dv/dt" />, endrer farten.</li>
                  </ul>
                  <p className="mt-1">Total akselerasjon: <InlineLatex latex="|\vec a| = \sqrt{a_\perp^2 + a_\parallel^2}" />. De to komponentene er ALLTID vinkelrett på hverandre (radielt vs. tangentielt).</p>
                </div>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <p><InlineLatex latex="r = 2{,}0\;\text{m}" />, &nbsp; <InlineLatex latex="v(t) = A + Bt = 5{,}0 - 0{,}10\,t" />, ved <InlineLatex latex="t = 5{,}0" /> s.</p>
                </div>
                <p>Farten ved <InlineLatex latex="t = 5{,}0" /> s:</p>
                <FormulaBox
                  latex="v(5{,}0) = 5{,}0 - 0{,}10\cdot 5{,}0 = 4{,}5\;\text{m/s}"
                  variant="blue"
                />
                <p><strong>Normalkomponent</strong> (mot sentrum):</p>
                <FormulaBox
                  latex="a_\perp = \frac{v^2}{r} = \frac{4{,}5^2}{2{,}0} \approx 10{,}1\;\text{m/s}^2"
                  variant="gold"
                />
                <p><strong>Parallellkomponent</strong> (tangentiell). Siden <InlineLatex latex="v(t)" /> er lineær, er den deriverte rett og slett <InlineLatex latex="B" />:</p>
                <FormulaBox
                  latex="a_\parallel = \frac{dv}{dt} = B = -0{,}10\;\text{m/s}^2"
                  variant="gold"
                />
                <p>Fortegnet på <InlineLatex latex="a_\parallel" /> er negativt = legemet bremser ned (banefarten avtar).</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Normalkomponenten (10,1 m/s²) er ca. 100 ganger større enn parallellkomponenten (0,10 m/s²). Akselerasjonen peker nesten utelukkende mot sentrum — legemet beveger seg nesten i UNIFORM sirkelbevegelse, med veldig svakt avtagende fart. Visuelt: akselerasjonsvektoren peker ikke helt mot sentrum, men er hellet litt bakover (mot der legemet kommer fra) fordi farten avtar.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Frittlegemediagram for vogn</p>
                <svg viewBox="0 0 320 200" className="w-full max-w-xs mx-auto my-3 rounded bg-white dark:bg-neutral-900">
                  <rect x="105" y="80" width="100" height="42" rx="4" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                  <circle cx="130" cy="127" r="7" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
                  <circle cx="180" cy="127" r="7" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="30" y1="134" x2="290" y2="134" stroke="#64748b" strokeWidth="2" />
                  <line x1="45" y1="134" x2="38" y2="142" stroke="#94a3b8" strokeWidth="0.8" />
                  <line x1="65" y1="134" x2="58" y2="142" stroke="#94a3b8" strokeWidth="0.8" />
                  <line x1="85" y1="134" x2="78" y2="142" stroke="#94a3b8" strokeWidth="0.8" />
                  <line x1="230" y1="134" x2="223" y2="142" stroke="#94a3b8" strokeWidth="0.8" />
                  <line x1="250" y1="134" x2="243" y2="142" stroke="#94a3b8" strokeWidth="0.8" />
                  <line x1="270" y1="134" x2="263" y2="142" stroke="#94a3b8" strokeWidth="0.8" />
                  {/* mg down */}
                  <line x1="155" y1="101" x2="155" y2="168" stroke="#ef4444" strokeWidth="2.5" />
                  <polygon points="155,171 150,163 160,163" fill="#ef4444" />
                  <text x="162" y="165" fontSize="12" fill="#ef4444" fontWeight="bold" fontStyle="italic">mg</text>
                  {/* N up */}
                  <line x1="155" y1="80" x2="155" y2="28" stroke="#3b82f6" strokeWidth="2.5" />
                  <polygon points="155,25 150,33 160,33" fill="#3b82f6" />
                  <text x="162" y="37" fontSize="12" fill="#3b82f6" fontWeight="bold" fontStyle="italic">N</text>
                  {/* S right */}
                  <line x1="205" y1="98" x2="272" y2="98" stroke="#22c55e" strokeWidth="2.5" />
                  <polygon points="275,98 267,93 267,103" fill="#22c55e" />
                  <text x="265" y="89" fontSize="12" fill="#22c55e" fontWeight="bold" fontStyle="italic">S</text>
                  <line x1="205" y1="98" x2="300" y2="98" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="5 3" />
                  <text x="117" y="106" fontSize="10" fill="#64748b">m = 1000 kg</text>
                  {/* Coordinate axes */}
                  <line x1="35" y1="188" x2="72" y2="188" stroke="#475569" strokeWidth="1.2" />
                  <polygon points="75,188 69,184 69,192" fill="#475569" />
                  <text x="78" y="192" fontSize="10" fill="#475569" fontWeight="bold">x</text>
                  <line x1="35" y1="188" x2="35" y2="160" stroke="#475569" strokeWidth="1.2" />
                  <polygon points="35,157 31,163 39,163" fill="#475569" />
                  <text x="25" y="158" fontSize="10" fill="#475569" fontWeight="bold">y</text>
                </svg>
                <p className="mb-2">Tre krefter virker på vogna:</p>
                <ul className="list-disc list-inside space-y-1 mb-2">
                  <li><span className="text-blue-600 dark:text-blue-400 font-semibold">N</span> — Normalkraft fra skinnegangen (oppover)</li>
                  <li><span className="text-red-600 dark:text-red-400 font-semibold">mg</span> — Tyngdekraft (nedover)</li>
                  <li><span className="text-green-600 dark:text-green-400 font-semibold">S</span> — Snordrag fra tauet (horisontalt)</li>
                </ul>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Oppskrift på Newton-oppgaver: FBD-metoden</p>
                  <ol className="list-decimal list-inside mt-1 space-y-0.5">
                    <li>Isoler kroppen (vogna alene).</li>
                    <li>Tegn ALLE kreftene som virker på den — ingen "indre" eller "fiktive" krefter.</li>
                    <li>Velg koordinatsystem som passer bevegelsen (her: x langs bevegelsen, y vinkelrett).</li>
                    <li>Skriv Newtons 2. lov komponentvis (<InlineLatex latex="\sum F_x = ma_x" />, <InlineLatex latex="\sum F_y = ma_y" />).</li>
                    <li>Bruk kjente begrensninger (her: ingen vertikal akselerasjon ⇒ <InlineLatex latex="a_y = 0" />).</li>
                  </ol>
                </div>
                <p>Newtons 2. lov i y-retning (ingen vertikal akselerasjon):</p>
                <FormulaBox
                  latex="\sum F_y = 0\;:\;\; N - mg = 0 \;\Longrightarrow\; N = mg = 1000\cdot 9{,}81 = 9810\;\text{N}"
                  variant="gold"
                />
                <p>Snordraget S kan IKKE bestemmes uten å vite akselerasjonen — det er derfor oppgaven gir deg akkurat så mye info.</p>

                <p className="font-semibold text-[var(--accent)]">d) Maksimal akselerasjon før tauet ryker</p>
                <p>Den eneste horisontale kraften er snordraget. Newtons 2. lov i x-retning:</p>
                <FormulaBox
                  latex="\sum F_x = ma\;:\;\; S = ma"
                  variant="blue"
                />
                <p>Når vi bruker maks snordrag som grensen tauet tåler, får vi den maksimale akselerasjonen:</p>
                <FormulaBox
                  latex="a_\text{max} = \frac{S_\text{max}}{m} = \frac{3500}{1000}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;a_\text{max} = 3{,}5\;\text{m/s}^2\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvor fort blir vogna — et perspektiv</p>
                  <p>Med 3,5 m/s² konstant akselerasjon går vogna fra 0 til 60 km/h (16,7 m/s) på ca. 4,8 s — omtrent som en rask personbil. Hvis du prøver å akselerere raskere, går tauet i stykker (med potensielt ubehagelige konsekvenser!).</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Sentripetalakselerasjon: <InlineLatex latex="a_\perp = v^2/r" />, uavhengig av om farten er konstant</li>
                    <li>Tangentiell akselerasjon: <InlineLatex latex="a_\parallel = dv/dt" />, endrer farten</li>
                    <li>Sammenheng sirkelbevegelse: <InlineLatex latex="v = 2\pi r/T" />, <InlineLatex latex="f = 1/T" /></li>
                    <li>FBD-metoden: isoler → tegn krefter → velg akser → Newton pr. akse</li>
                    <li>Newtons 2. lov: <InlineLatex latex="a = F/m" /> — jo større kraft, jo større akselerasjon</li>
                    <li>Maks kraft-begrensning ⇒ maks akselerasjon (praktisk relevant i konstruksjon)</li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* OBLIG 2 — Arbeid, energi, bevegelsesmengde, rotasjon */}
      {/* ════════════════════════════════════════════════ */}
      {selected === "oblig2" && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold">Oblig 2</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">Kap 5–10</span>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">Sentripetalkraft, arbeid og energi, bevegelsesmengde, kollisjoner og rullebevegelse.</p>

          {/* ─── OPPGAVE 1: Fly i loop og bil i sving ─── */}
          <ExerciseCard
            number={1}
            title="Fly i loop og bil i sving — sentripetalkraft"
            difficulty="middels"
            source="Oblig 2"
            relevantChapters={[
              { href: "/ing164/kapittel-5/teori", title: "Kap 5 — Sentripetalkraft" },
              { href: "/ing164/kapittel-4/teori", title: "Kap 4 — Newtons lover" },
            ]}
            problem={
              <div>
                <p className="mb-1">a) Et fly beveger seg i en sirkelformet &quot;loop&quot; med baneradius 500 m. Pilotens masse er 80,0 kg. Banefarten er konstant og lik 100 m/s. Tegn figurer som viser kreftene på piloten i loopens øverste og nederste punkt. Beregn kraften fra setet på piloten i øverste og nederste punkt.</p>
                <p className="mb-1">b) Hvor stor er farten dersom piloten mister kontakt med setet akkurat i toppunktet?</p>
                <p className="mb-1">c) En bil holder konstant fart på 70,0 km/h og svinger mot høyre inn i en sving som er en del av en sirkel. En liten kule som henger i en snor i taket svinger ut til siden og danner en vinkel på 10,0° med loddlinjen. Hva er svingens radius?</p>
                <p>d) Friksjonstallet mellom bilhjulene og asfalten er 0,80. Hva er den største farten bilen kan holde gjennom svingen uten å miste veigrepet?</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Tegn FBD for piloten øverst og nederst. Husk: sentripetalkraften peker alltid <em>mot sentrum</em>. Øverst peker sentrum nedover, nederst peker det oppover.</p> },
              { label: "Hint b", content: <p>Mister kontakt → <InlineLatex latex="N = 0" />. Da er tyngdekraften den eneste kraften, og den alene gir sentripetalakselerasjonen.</p> },
              { label: "Hint c", content: <p>Kula i taket fungerer som et akselerometer. Snorkraften har en horisontal komponent som gir sentripetalkraft. Sett opp x- og y-ligning.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) kraft fra sete", formulas: <div><p>Øverst (begge krefter peker ned): <InlineLatex latex="N + mg = m\frac{v^2}{r}" /></p><p>Nederst (N opp, mg ned): <InlineLatex latex="N - mg = m\frac{v^2}{r}" /></p></div> },
              { subQuestion: "b) mister kontakt", formulas: <p><InlineLatex latex="N = 0 \;\Rightarrow\; mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr}" /></p> },
              { subQuestion: "c) svingens radius", formulas: <div><p><InlineLatex latex="S\cos\alpha = mg" />, &nbsp; <InlineLatex latex="S\sin\alpha = m\frac{v^2}{r}" /></p><p><InlineLatex latex="r = \frac{v^2}{g\tan\alpha}" /></p></div> },
              { subQuestion: "d) maks fart", formulas: <p><InlineLatex latex="\mu mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{\mu g r}" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Sirkelbevegelse med Newtons 2. lov i radial retning. Nøkkelen er at <strong>summen av krefter mot sentrum</strong> = <InlineLatex latex="ma_s = mv^2/r" />. "Sentripetalkraft" er ikke en egen kraft — det er navnet på den NETTO kraften som peker mot sentrum, og den må komme fra ekte krefter (tyngde, normalkraft, snor, friksjon). Vi velger positiv retning MOT sentrum i hvert punkt og sjekker hvilke krefter som peker den veien.</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — sirkelbevegelse</p>
                  <p>Et legeme i jevn sirkelbevegelse har akselerasjonen <InlineLatex latex="a_s = v^2/r" /> rettet INN MOT sentrum. Det er ikke fordi det går saktere eller fortere langs banen (banefarten er konstant), men fordi <em>retningen</em> stadig endres. Newton: <InlineLatex latex="\sum \vec F_\text{radial} = m\vec a_s" />. Hvis den nødvendige sentripetalkraften ikke er der, så følger ikke legemet sirkelen — det fortsetter rett fram (eller bortover langs en bredere kurve).</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Kraft fra setet i øverste og nederste punkt</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <p>Loopradius: <InlineLatex latex="r = 500\;\text{m}" />, &nbsp; pilotmasse: <InlineLatex latex="m = 80{,}0\;\text{kg}" />, &nbsp; banefart: <InlineLatex latex="v = 100\;\text{m/s}" /> (konstant)</p>
                </div>
                <p>Sentripetalakselerasjonen er den samme i alle punkter (samme <InlineLatex latex="v" /> og <InlineLatex latex="r" />):</p>
                <FormulaBox
                  latex="a_s = \frac{v^2}{r} = \frac{100^2}{500} = 20{,}0\;\text{m/s}^2 \;\;(\approx 2g)"
                  variant="blue"
                />

                <div className="grid sm:grid-cols-2 gap-4 my-3">
                  <div>
                    <p className="text-xs font-semibold text-center mb-1">Øverst i loopen</p>
                    <svg viewBox="0 0 200 160" className="w-full max-w-[180px] mx-auto rounded bg-white dark:bg-neutral-900">
                      <path d="M 30,80 Q 30,20 100,20 Q 170,20 170,80" fill="none" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="100" cy="22" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                      <text x="95" y="26" fontSize="8" fill="#64748b">P</text>
                      <line x1="100" y1="32" x2="100" y2="70" stroke="#3b82f6" strokeWidth="2" />
                      <polygon points="100,73 96,65 104,65" fill="#3b82f6" />
                      <text x="106" y="60" fontSize="10" fill="#3b82f6" fontWeight="bold">N</text>
                      <line x1="100" y1="32" x2="100" y2="95" stroke="#ef4444" strokeWidth="2" />
                      <polygon points="100,98 96,90 104,90" fill="#ef4444" />
                      <text x="106" y="90" fontSize="10" fill="#ef4444" fontWeight="bold">mg</text>
                      <text x="55" y="115" fontSize="9" fill="#64748b">Sentrum ↓</text>
                      <text x="50" y="148" fontSize="9" fill="#64748b">N + mg = mv²/r</text>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-center mb-1">Nederst i loopen</p>
                    <svg viewBox="0 0 200 160" className="w-full max-w-[180px] mx-auto rounded bg-white dark:bg-neutral-900">
                      <path d="M 30,80 Q 30,140 100,140 Q 170,140 170,80" fill="none" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="100" cy="138" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                      <text x="95" y="142" fontSize="8" fill="#64748b">P</text>
                      <line x1="100" y1="128" x2="100" y2="85" stroke="#3b82f6" strokeWidth="2" />
                      <polygon points="100,82 96,90 104,90" fill="#3b82f6" />
                      <text x="106" y="95" fontSize="10" fill="#3b82f6" fontWeight="bold">N</text>
                      <line x1="100" y1="148" x2="100" y2="158" stroke="#ef4444" strokeWidth="1.5" />
                      <text x="106" y="158" fontSize="10" fill="#ef4444" fontWeight="bold">mg</text>
                      <text x="55" y="50" fontSize="9" fill="#64748b">Sentrum ↑</text>
                      <text x="50" y="70" fontSize="9" fill="#64748b">N − mg = mv²/r</text>
                    </svg>
                  </div>
                </div>

                <p><strong>Øverst i loopen:</strong> Sentrum er NEDENFOR piloten. Både normalkraft N (fra setet over piloten, peker nedover/innover mot sentrum) og tyngden mg (også nedover) peker MOT sentrum. Newtons 2. lov radialt:</p>
                <FormulaBox
                  latex="N + mg = m\frac{v^2}{r} \;\Longrightarrow\; N = m(a_s - g) = 80{,}0(20{,}0 - 9{,}81)"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;N_\text{topp} \approx 815\;\text{N}\;}"
                  variant="gold"
                />

                <p><strong>Nederst i loopen:</strong> Sentrum er OVENFOR piloten. Normalkraft N (fra setet under piloten, peker oppover mot sentrum) er positiv, mens tyngden mg (peker nedover, BORT fra sentrum) bidrar med <em>minus</em>. Newtons 2. lov radialt:</p>
                <FormulaBox
                  latex="N - mg = m\frac{v^2}{r} \;\Longrightarrow\; N = m(a_s + g) = 80{,}0(20{,}0 + 9{,}81)"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;N_\text{bunn} \approx 2380\;\text{N} = 2{,}38\;\text{kN}\;}"
                  variant="gold"
                />

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning og "g-krefter"</p>
                  <p>Nederst trykker setet med 2380 N — det er nesten <em>3 ganger</em> normal tyngde (785 N). Piloten kjenner det som "3 g". Øverst er kraften 815 N, ca. 1 g — så piloten føler seg nesten normal (ikke vektløs!). Forskjellen kommer av at tyngden enten <em>hjelper</em> sentripetalkraften (øverst) eller <em>motvirker</em> den (nederst). På bunnen må setet alene gi hele sentripetalkraften pluss bære tyngden, derfor mye større N.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Mister kontakt med setet i toppen</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Hva betyr "mister kontakt"?</p>
                  <p>Setet kan bare DYTTE oppover (normalkraft virker normalt på flaten). Den kan ikke TREKKE piloten ned (uten beltene). Hvis sentripetalkraften kun trenger akkurat <InlineLatex latex="mg" /> for å holde piloten i banen, er setets bidrag <InlineLatex latex="N = 0" />. Akkurat da slipper piloten setet — han er i fritt fall, men i en sirkelbane (vektløshet, akkurat som astronauter).</p>
                </div>
                <FormulaBox
                  latex="N = 0 \;\Rightarrow\; mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81\cdot 500}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v \approx 70{,}0\;\text{m/s}\;}"
                  variant="gold"
                />
                <p>Ved 70,0 m/s i toppen er piloten akkurat vektløs — under denne farten faller han fra setet (mister kontakten).</p>

                <p className="font-semibold text-[var(--accent)]">c) Svingens radius (kule i snor som akselerometer)</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — pendel i akselererende referanseramme</p>
                  <p>I et inertialsystem ser vi at bilen (og dermed snorens festepunkt i taket) akselererer mot svingens sentrum med <InlineLatex latex="a_s = v^2/r" />. Snora må gi kula samme akselerasjon. Snora kan bare trekke <em>langs</em> seg selv. For at den horisontale komponenten av snordraget skal gi sentripetalkraft, må snora helle utover svingen — derfor utslagsvinkelen <InlineLatex latex="\alpha" /> med loddlinjen.</p>
                  <p className="mt-1">To likninger, to ukjente (<InlineLatex latex="S" /> og <InlineLatex latex="r" />):</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Vertikalt (kula akselererer ikke vertikalt): <InlineLatex latex="S\cos\alpha = mg" /></li>
                    <li>Horisontalt (sentripetalkraft): <InlineLatex latex="S\sin\alpha = mv^2/r" /></li>
                  </ul>
                  <p className="mt-1">Deler ligning 2 på ligning 1: <InlineLatex latex="\tan\alpha = v^2/(gr)" /> — uavhengig av kulemassen.</p>
                </div>
                <p>Konverter farten: <InlineLatex latex="v = 70{,}0\;\text{km/h} = 70/3{,}6 \approx 19{,}44\;\text{m/s}" />. Med <InlineLatex latex="\alpha = 10°" />:</p>
                <FormulaBox
                  latex="r = \frac{v^2}{g\tan\alpha} = \frac{19{,}44^2}{9{,}81\cdot\tan 10°} = \frac{377{,}9}{9{,}81\cdot 0{,}1763}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;r \approx 219\;\text{m}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Praktisk perspektiv</p>
                  <p>Akkurat samme prinsipp brukes i smarttelefonens akselerometer: en liten masse i fjær avbøyes proporsjonalt med akselerasjonen, og avbøyningen leses elektronisk. En kule i snor er en mekanisk versjon. Et 10°-utslag tilsvarer her ca. 0,18g sideakselerasjon — merkbart, men ikke vilt.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Maks fart uten å miste veigrepet</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — friksjon som sentripetalkraft</p>
                  <p>I en flat sving (uten dosering) er den ENESTE horisontale kraften som kan styre bilen rundt svingen, statisk friksjon mellom dekk og asfalt. Maks statisk friksjon er <InlineLatex latex="R_\text{max} = \mu N = \mu mg" /> (siden N = mg på flat vei). Ved maks fart fyller friksjonen akkurat hele sentripetalkravet:</p>
                </div>
                <FormulaBox
                  latex="\mu mg = m\frac{v^2}{r} \;\Longrightarrow\; v_\text{max} = \sqrt{\mu g r}"
                  variant="blue"
                />
                <FormulaBox
                  latex="v_\text{max} = \sqrt{0{,}80\cdot 9{,}81\cdot 219} \approx 41{,}5\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v_\text{max} \approx 41{,}5\;\text{m/s} \approx 149\;\text{km/h}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvorfor avhenger ikke <InlineLatex latex="v_\text{max}" /> av massen?</p>
                  <p>Tunge biler trenger mer sentripetalkraft (proporsjonalt med m), men har også større normalkraft og dermed større friksjon (også proporsjonalt med m). De to massene kansellerer. Akkurat samme grunn til at alle objekter faller likt i fritt fall.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Sirkelbevegelse: velg alltid positiv retning <em>mot sentrum</em>, og finn hvilke ekte krefter som peker dit</li>
                    <li>"Sentripetalkraft" er ikke en egen kraft — det er navnet på netto radialkraft</li>
                    <li>Vektløshet = normalkraften er null (ikke at tyngdekraften forsvinner!)</li>
                    <li>Pendel i bil/fly fungerer som akselerometer: <InlineLatex latex="\tan\alpha = a/g" /></li>
                    <li>Friksjon i flat sving: <InlineLatex latex="v_\text{max} = \sqrt{\mu g r}" /> — uavhengig av masse</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 2: Skitrekk ─── */}
          <ExerciseCard
            number={2}
            title="Skitrekk — arbeid og energi"
            difficulty="middels"
            source="Oblig 2"
            relevantChapters={[
              { href: "/ing164/kapittel-6/teori", title: "Kap 6 — Arbeid og kinetisk energi" },
              { href: "/ing164/kapittel-7/teori", title: "Kap 7 — Potensiell energi og energibevaring" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f0f9ff, #ecfdf5)" }}>
                  <polygon points="50,180 350,60 350,180" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5" />
                  <line x1="55" y1="176" x2="345" y2="63" stroke="#a8a29e" strokeWidth="3" />
                  <circle cx="150" cy="138" r="6" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                  <line x1="150" y1="132" x2="150" y2="120" stroke="#d97706" strokeWidth="1.5" />
                  <line x1="150" y1="138" x2="200" y2="123" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="5 3" />
                  <line x1="200" y1="123" x2="330" y2="68" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="5 3" />
                  <path d="M 100 165 A 30 30 0 0 1 82 155" fill="none" stroke="#64748b" strokeWidth="1" />
                  <text x="72" y="162" fontSize="10" fill="#64748b">25°</text>
                  <text x="165" y="100" fontSize="10" fill="#64748b" fontWeight="bold">s = 250 m</text>
                  <text x="355" y="65" fontSize="10" fill="#64748b">Topp</text>
                  <text x="45" y="195" fontSize="10" fill="#64748b">Bunn</text>
                </svg>

                <p className="mb-3">Et skitrekk består av et tau som skiløperne holder seg fast i. Tauet drar skiløperne opp en 250 m lang skibakke med 25° helning. Tauet beveger seg med en fart på 10 km/h. Vi ser bort fra friksjon.</p>
                <p className="mb-1">a) Hvor stort arbeid utfører tauet på en skiløper med masse 80,0 kg som fraktes til topps?</p>
                <p className="mb-1">b) Motoren må yte høy nok effekt til at 60 skiløpere kan bli dratt opp samtidig. Hvor stor effekt må motoren da yte?</p>
                <p className="mb-1">c) En skiløper starter fra toppen av bakken med startfart lik null og kjører rett ned uten å svinge. Hvilken fart vil skiløperen ha i bunnen av bakken dersom vi ser bort fra friksjon og luftmotstand?</p>
                <p>d) Skiløperen hadde bare en fart på 50 km/h da han nådde bunnen av bakken. Hvor stort arbeid har friksjon og luftmotstand gjort på skiløperen?</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Konstant fart → taukraften = tyngdekomponenten langs bakken: <InlineLatex latex="T = mg\sin 25°" />. Arbeid = kraft × vei.</p> },
              { label: "Hint b", content: <p>Effekt = kraft × fart: <InlineLatex latex="P = T \cdot v" />. For 60 skiløpere: <InlineLatex latex="P_{60} = 60 \cdot T \cdot v" /></p> },
              { label: "Hint c", content: <p>Energibevaring uten friksjon: all potensiell energi → kinetisk energi. <InlineLatex latex="mgh = \tfrac{1}{2}mv^2" /></p> },
              { label: "Hint d", content: <p>Med friksjon: <InlineLatex latex="E_\text{topp} + W_R = E_\text{bunn}" />. Friksjon gjør negativt arbeid.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) arbeid fra tau", formulas: <div><p><InlineLatex latex="T = mg\sin 25°" /> (konstant fart)</p><p><InlineLatex latex="W = T \cdot s = mg\sin 25° \cdot s" /></p></div> },
              { subQuestion: "b) effekt", formulas: <p><InlineLatex latex="P = 60 \cdot mg\sin 25° \cdot v" /></p> },
              { subQuestion: "c) fart i bunn", formulas: <p><InlineLatex latex="mgh = \tfrac{1}{2}mv^2 \;\Rightarrow\; v = \sqrt{2gh}" /> der <InlineLatex latex="h = s\sin 25°" /></p> },
              { subQuestion: "d) friksjonsarbeid", formulas: <p><InlineLatex latex="W_R = \tfrac{1}{2}mv^2 - mgh" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Klassisk arbeid–energi-oppgave i fire deler. Først analyserer vi opptur i likevekt (kraftmetoden er enkel her). Effekt = kraft × fart følger direkte. Til nedturen bytter vi metode til energibevaring fordi det er raskere og mer naturlig — vi vet bare høydeforskjell og fart, ikke detaljer om kreftene. Til slutt utvider vi energiligningen med arbeid fra ikke-konservative krefter (friksjon + luftmotstand).</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Bakkelengde langs skråplan: <InlineLatex latex="s = 250\;\text{m}" /></li>
                    <li>Vinkel: <InlineLatex latex="\theta = 25°" /></li>
                    <li>Tauets fart: <InlineLatex latex="v_\text{tau} = 10\;\text{km/h} = \tfrac{10000}{3600} = 2{,}78\;\text{m/s}" /></li>
                    <li>Skiløperens masse: <InlineLatex latex="m = 80{,}0\;\text{kg}" /></li>
                    <li>Friksjonsfritt på opptur (det er antagelsen i oppgaven)</li>
                  </ul>
                  <p className="mt-2 font-semibold">Kjekt å regne ut én gang:</p>
                  <p>Vertikal høydeforskjell: <InlineLatex latex="h = s\sin 25° = 250 \cdot 0{,}4226 \approx 105{,}7\;\text{m}" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Arbeid utført av tauet på skiløperen</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — arbeid og kraftbalanse ved konstant fart</p>
                  <p>Arbeid er <InlineLatex latex="W = \vec F\cdot\vec s = F s\cos\phi" />, der <InlineLatex latex="\phi" /> er vinkelen mellom kraftens og forflyttelsens retning. Tauet trekker LANGS bakken, og skiløperen beveger seg LANGS bakken — så <InlineLatex latex="\phi = 0" /> og <InlineLatex latex="W = T\cdot s" />.</p>
                  <p className="mt-1">Ved konstant fart er akselerasjonen null, så Newtons 2. lov gir <InlineLatex latex="\sum F = 0" />. Langs bakken: <InlineLatex latex="T - mg\sin\theta = 0" /> ⇒ <InlineLatex latex="T = mg\sin\theta" />. Ingen friksjon å telle med.</p>
                </div>
                <FormulaBox
                  latex="T = mg\sin 25° = 80{,}0\cdot 9{,}81\cdot 0{,}4226 \approx 331{,}6\;\text{N}"
                  variant="blue"
                />
                <FormulaBox
                  latex="W_\text{tau} = T\cdot s = 331{,}6\cdot 250 \approx 82\,900\;\text{J}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;W_\text{tau} \approx 82{,}9\;\text{kJ}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvorfor er <InlineLatex latex="W_\text{tau} = mgh" /> her?</p>
                  <p>Konstant fart ⇒ <InlineLatex latex="\Delta E_k = 0" />. Friksjonsfritt ⇒ <InlineLatex latex="W_R = 0" />. Den utvidede energiligningen <InlineLatex latex="W_\text{tau} + W_\text{tyngde} + W_R = \Delta E_k" /> blir derfor <InlineLatex latex="W_\text{tau} = -W_\text{tyngde} = mgh" />. Tauets arbeid pumpes rett over til potensiell energi. Tallene stemmer: <InlineLatex latex="mgh = 80\cdot 9{,}81\cdot 105{,}7 \approx 82{,}9" /> kJ. ✓</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Motoreffekt for 60 skiløpere</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — effekt</p>
                  <p>Effekt er arbeid per tid: <InlineLatex latex="P = dW/dt" />. Når kraften er konstant og forflyttelsen langs samme retning, blir det <InlineLatex latex="P = F v" />. På et skitrekk er kraften til hver skiløper <InlineLatex latex="T = mg\sin\theta" />, og hver beveger seg med tauets fart <InlineLatex latex="v = 2{,}78" /> m/s.</p>
                </div>
                <FormulaBox
                  latex="P_1 = T\cdot v = 331{,}6\cdot 2{,}78 \approx 922\;\text{W}"
                  variant="blue"
                />
                <p>For 60 skiløpere skalerer effekten lineært (taukreftene adderes):</p>
                <FormulaBox
                  latex="P_{60} = 60\,P_1 = 60\cdot mg\sin 25°\cdot v \approx 55\,300\;\text{W}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;P_{60} \approx 55{,}3\;\text{kW}\;\;(\text{ca. 75 hestekrefter})\;}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">c) Fart i bunnen uten friksjon (frittenrenn)</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — energibevaring i konservative felt</p>
                  <p>Tyngdekraften er konservativ: arbeidet avhenger BARE av høydeforskjellen, ikke veien som er gått. Med kun tyngdekraft som virker, gjelder <InlineLatex latex="E_k + E_p = \text{konst}" />. Velger nullnivå i bunnen og bruker at startfarten er null:</p>
                  <p className="mt-1"><InlineLatex latex="\underbrace{0}_{E_{k,\text{topp}}} + \underbrace{mgh}_{E_{p,\text{topp}}} = \underbrace{\tfrac{1}{2}mv^2}_{E_{k,\text{bunn}}} + \underbrace{0}_{E_{p,\text{bunn}}}" /></p>
                  <p className="mt-1">Massen kansellerer ⇒ <InlineLatex latex="v = \sqrt{2gh}" />.</p>
                </div>
                <FormulaBox
                  latex="v = \sqrt{2gh} = \sqrt{2\cdot 9{,}81\cdot 105{,}7} \approx 45{,}5\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v \approx 45{,}5\;\text{m/s} \approx 164\;\text{km/h}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Vanlige feil</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Bruker <InlineLatex latex="s = 250" /> i stedet for <InlineLatex latex="h = 105{,}7" /> i energiligningen — det er <em>vertikal</em> høydeforskjell som teller, ikke skrålengden.</li>
                    <li>Glemmer å konvertere mellom km/h og m/s.</li>
                    <li>Tror at formen på bakken (rett, sirkel, hopp) påvirker svaret — det gjør den ikke uten friksjon. Bare høydeforskjellen teller.</li>
                  </ul>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Arbeid fra friksjon og luftmotstand</p>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — den utvidede energi-ligningen (arbeid–energi-teoremet)</p>
                  <p>Når <em>ikke-konservative</em> krefter (friksjon, luftmotstand, drift fra motorer) virker, er den mekaniske energien IKKE bevart. Vi bytter derfor til den utvidede formen:</p>
                  <p className="mt-1 text-center"><InlineLatex latex="E_{k,1} + E_{p,1} + W_\text{andre} = E_{k,2} + E_{p,2}" /></p>
                  <p className="mt-1">Her står <InlineLatex latex="W_\text{andre}" /> for samlet arbeid fra ALLE krefter som ikke er tyngdekraft eller fjær (de konservative som allerede er bakt inn i <InlineLatex latex="E_p" />). I denne oppgaven er det friksjon mot snø + luftmotstand.</p>
                  <p className="mt-2 font-semibold">Hvorfor passer denne formen perfekt her?</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Vi VET <InlineLatex latex="v_1 = 0" />, <InlineLatex latex="v_2 = 50\;\text{km/h}" /> og <InlineLatex latex="h" /> — altså to energi-nivåer.</li>
                    <li>Vi vet IKKE friksjonskraftens størrelse, eller hvordan luftmotstanden varierer med farten. Vi trenger ikke å vite det heller — vi spør bare om totalarbeidet.</li>
                    <li>Sammenlignet med å sette opp Newtons 2. lov og integrere: dette er én ligning vs. en differensialligning. Energi vinner.</li>
                  </ul>
                </div>

                <p><strong>Steg 1 — sett opp ligningen for nedturen.</strong></p>
                <p>Velger nullnivå i bunnen (<InlineLatex latex="y_2 = 0" />). Topp er <InlineLatex latex="y_1 = h = 105{,}7" /> m, og <InlineLatex latex="v_1 = 0" />.</p>
                <FormulaBox
                  latex="\underbrace{0}_{E_{k,1}} + \underbrace{mgh}_{E_{p,1}} + W_R = \underbrace{\tfrac{1}{2}mv_2^2}_{E_{k,2}} + \underbrace{0}_{E_{p,2}}"
                  variant="blue"
                />
                <p><strong>Steg 2 — løs for friksjonsarbeidet.</strong></p>
                <FormulaBox
                  latex="W_R = \tfrac{1}{2}mv_2^2 - mgh"
                  variant="blue"
                />
                <p><strong>Steg 3 — sett inn tall.</strong> Konverter farten først: <InlineLatex latex="v_2 = 50\;\text{km/h} = 13{,}89\;\text{m/s}" />.</p>
                <FormulaBox
                  latex="\tfrac{1}{2}mv_2^2 = \tfrac{1}{2}\cdot 80\cdot (13{,}89)^2 \approx 7\,716\;\text{J}"
                  variant="blue"
                />
                <FormulaBox
                  latex="mgh = 80\cdot 9{,}81\cdot 105{,}7 \approx 82\,950\;\text{J}"
                  variant="blue"
                />
                <FormulaBox
                  latex="W_R = 7\,716 - 82\,950 \approx -75\,200\;\text{J}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;W_R \approx -75{,}2\;\text{kJ}\;}"
                  variant="gold"
                />

                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvorfor må svaret være negativt? (sjekk fortegnet ditt!)</p>
                  <p>Friksjon og luftmotstand virker ALLTID i retning motsatt av bevegelsen. Arbeidet <InlineLatex latex="W = \vec F\cdot\vec s" /> blir da negativt. Pedagogisk sjekk: hvis <InlineLatex latex="v_2" /> uten friksjon var 45,5 m/s ⇒ <InlineLatex latex="E_k \approx 82{,}9" /> kJ (= mgh — perfekt energiomdanning). Med friksjon endte han på 13,89 m/s ⇒ <InlineLatex latex="E_k \approx 7{,}72" /> kJ. Differansen 82,9 − 7,72 ≈ 75,2 kJ er energien som ble omgjort til varme/luftvirvler. Derfor skal svaret være −75,2 kJ. Får du positivt svar? Da har du sannsynligvis byttet om <InlineLatex latex="v_1" /> og <InlineLatex latex="v_2" /> eller plassert <InlineLatex latex="W_R" /> på feil side av ligningen.</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Litt mer kontekst — hvor stor friksjonskraft tilsvarer dette?</p>
                  <p>Hvis vi for et øyeblikk antar at den samlede motstandskraften <InlineLatex latex="R_\text{snitt}" /> er konstant langs ruta, så er <InlineLatex latex="W_R = -R_\text{snitt}\cdot s" />. Det gir <InlineLatex latex="R_\text{snitt} = 75\,200/250 \approx 301\;\text{N}" /> — nesten like mye som tyngdekomponenten langs bakken (<InlineLatex latex="mg\sin 25° \approx 332" /> N!). Det er derfor han knapt akselerer på vei ned: tyngden trekker ham ned, men luft + friksjon nesten matcher det.</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Energiregnskap (oversikt over hvor energien havnet)</p>
                  <p>Tilført energi fra tyngden: <InlineLatex latex="mgh \approx 82{,}9\;\text{kJ}" /></p>
                  <p>→ Beholdt som kinetisk energi i bunnen: <InlineLatex latex="\tfrac{1}{2}mv_2^2 \approx 7{,}7\;\text{kJ}" /> (≈ 9 %)</p>
                  <p>→ Tapt til friksjon + luftmotstand (= varme, lyd, virvler): <InlineLatex latex="\approx 75{,}2\;\text{kJ}" /> (≈ 91 %)</p>
                  <p className="mt-1">Summerer perfekt — ingen energi er "borte", den er bare omfordelt.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Arbeid = kraft × strekning langs kraftens retning: <InlineLatex latex="W = Fs\cos\phi" /></li>
                    <li>Effekt = kraft × fart, skalerer lineært med antall objekter</li>
                    <li>Energibevaring (uten friksjon): <InlineLatex latex="E_p \to E_k" />, høydeforskjellen er det som teller</li>
                    <li>Utvidet energiligning (med friksjon): <InlineLatex latex="E_{k,1} + E_{p,1} + W_\text{andre} = E_{k,2} + E_{p,2}" /></li>
                    <li>Friksjonsarbeid er ALLTID negativt — sjekk fortegnet ditt</li>
                    <li>Energi forsvinner ikke — den omdannes (her: til varme og luftturbulens)</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 3: Ballistisk pendel ─── */}
          <ExerciseCard
            number={3}
            title="Kule og kloss — bevegelsesmengde og kollisjoner"
            difficulty="vanskelig"
            source="Oblig 2"
            relevantChapters={[
              { href: "/ing164/kapittel-8/teori", title: "Kap 8 — Bevegelsesmengde og kollisjoner" },
              { href: "/ing164/kapittel-7/teori", title: "Kap 7 — Energibevaring" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 300 220" className="w-full max-w-sm mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #fafafa, #f5f5f5)" }}>
                  <line x1="80" y1="10" x2="220" y2="10" stroke="#64748b" strokeWidth="3" />
                  <line x1="80" y1="10" x2="80" y2="15" stroke="#64748b" strokeWidth="2" />
                  <line x1="220" y1="10" x2="220" y2="15" stroke="#64748b" strokeWidth="2" />
                  <line x1="150" y1="10" x2="150" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
                  <rect x="130" y="110" width="40" height="35" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                  <text x="138" y="132" fontSize="12" fill="#64748b" fontWeight="bold">M</text>
                  <text x="155" y="55" fontSize="10" fill="#94a3b8" fontStyle="italic">L</text>
                  <circle cx="50" cy="128" r="8" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                  <text x="45" y="132" fontSize="9" fill="#d97706" fontWeight="bold">m</text>
                  <line x1="58" y1="128" x2="100" y2="128" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="103,128 95,124 95,132" fill="#ef4444" />
                  <text x="65" y="120" fontSize="10" fill="#ef4444" fontWeight="bold" fontStyle="italic">v₀</text>
                  <path d="M 150 145 Q 200 145 220 100" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="210" y="95" fontSize="10" fill="#3b82f6" fontStyle="italic">φ</text>
                </svg>

                <p className="mb-3">En kloss med masse <InlineLatex latex="M" /> henger rett ned i en snor med lengde <InlineLatex latex="L" />. En kule med masse <InlineLatex latex="m" /> og hastighet <InlineLatex latex="v_0" /> treffer klossen. Kulen fester seg slik at kloss og kule pendler ut til siden som ett legeme.</p>
                <p className="mb-1">a) Finn felleslegemets hastighet rett etter støtet uttrykt ved <InlineLatex latex="m" />, <InlineLatex latex="M" /> og <InlineLatex latex="v_0" />.</p>
                <p className="mb-1">b) Vis at felleslegemets maksimale vinkelutslag etter støtet er gitt ved <InlineLatex latex="\varphi_\text{max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right)" />.</p>
                <p className="mb-1">c) Dersom kulen ikke fester seg til klossen, men rikosjetterer rett tilbake i et fullstendig elastisk støt, beregn farten til både kule og kloss rett etter støtet. Regn med <InlineLatex latex="m = 0{,}0050" /> kg, <InlineLatex latex="M = 10" /> kg og <InlineLatex latex="v_0 = 100" /> m/s.</p>
                <p>d) Hvor stor var den gjennomsnittlige kraften på klossen fra kula i det elastiske støtet dersom sammenstøtet varte i 0,0050 s?</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Uelastisk støt → bevaring av bevegelsesmengde (men IKKE kinetisk energi): <InlineLatex latex="mv_0 = (m+M)v" /></p> },
              { label: "Hint b", content: <p>Etter støtet: bruk energibevaring for pendelbevegelsen. Kinetisk energi → potensiell energi. Høyden ved vinkel φ er <InlineLatex latex="h = L(1 - \cos\varphi)" />.</p> },
              { label: "Hint c", content: <p>Elastisk støt: bruk formlene <InlineLatex latex="v_1 = \frac{m-M}{m+M}v_0" /> og <InlineLatex latex="v_2 = \frac{2m}{m+M}v_0" />.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) hastighet etter støt", formulas: <p>Bevaring av bevegelsesmengde: <InlineLatex latex="mv_0 = (m+M)v \;\Rightarrow\; v = \frac{mv_0}{m+M}" /></p> },
              { subQuestion: "b) maksimalt vinkelutslag", formulas: <div><p>Energibevaring: <InlineLatex latex="\tfrac{1}{2}(m+M)v^2 = (m+M)gL(1 - \cos\varphi)" /></p></div> },
              { subQuestion: "c) elastisk støt", formulas: <div><p><InlineLatex latex="v_1 = \frac{m-M}{m+M}v_0" /> (kulen)</p><p><InlineLatex latex="v_2 = \frac{2m}{m+M}v_0" /> (klossen)</p></div> },
              { subQuestion: "d) gjennomsnittlig kraft", formulas: <p><InlineLatex latex="F = \frac{\Delta p}{\Delta t} = \frac{M \cdot v_2}{\Delta t}" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>To faser: (1) Støtet — bruk bevaring av bevegelsesmengde (går fort, ytre krefter neglisjerbare). (2) Pendelbevegelse — bruk energibevaring (ingen friksjon).</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — bevegelsesmengde og kollisjoner</p>
                  <p><strong>Bevegelsesmengde</strong> <InlineLatex latex="\vec p = m\vec v" /> er bevart for ethvert SYSTEM hvor netto YTRE kraft er null (og dette gjelder svært godt under en kort kollisjon — de indre kreftene mellom kule og kloss er enorme, mens snor- og tyngdekraft er små i sammenligning og virker bare et lite øyeblikk).</p>
                  <p className="mt-1"><strong>Kinetisk energi</strong> er BARE bevart i fullstendig elastiske støt. I uelastiske støt (kule fester seg, biler kolliderer og krummer) går mye energi tapt til varme, lyd og deformasjon.</p>
                  <p className="mt-1">Tre standardtyper:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li><strong>Fullstendig uelastisk</strong>: legemene henger sammen etter støtet (max energitap)</li>
                    <li><strong>Elastisk</strong>: legemene spretter fra hverandre, ingen energitap</li>
                    <li><strong>Delvis uelastisk</strong>: noe energi tapt, men de spretter (f.eks. tennisball mot bakken)</li>
                  </ul>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Hastighet rett etter det uelastiske støtet</p>
                <p>Kulen fester seg ⇒ fullstendig uelastisk støt. Bruker bevaring av bevegelsesmengde for systemet (kule + kloss):</p>
                <FormulaBox
                  latex="p_\text{før} = p_\text{etter}\;:\;\; mv_0 + M\cdot 0 = (m+M)v"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v = \frac{m}{m+M}\,v_0\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvorfor bruker vi IKKE energibevaring her?</p>
                  <p>Hvis vi feilaktig prøver <InlineLatex latex="\tfrac{1}{2}mv_0^2 = \tfrac{1}{2}(m+M)v^2" /> får vi <InlineLatex latex="v = v_0\sqrt{m/(m+M)}" /> — et helt annet svar. Energi går tapt under støtet (deformasjon, varme) — vi vet ikke hvor mye, så vi kan ikke sette opp ligningen. Bevegelsesmengde derimot er bevart UANSETT.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Maksimalt vinkelutslag (utledning)</p>
                <p>Etter støtet er kollisjonen over og det blir trygt å bruke energibevaring for pendelbevegelsen (snorkraft gjør ikke arbeid — den er alltid vinkelrett på bevegelsen). Velger nullnivå i pendelens hvilepunkt. Ved vinkelen <InlineLatex latex="\varphi" /> er pendelen løftet:</p>
                <FormulaBox
                  latex="h = L - L\cos\varphi = L(1 - \cos\varphi)"
                  variant="blue"
                />
                <p>Energibevaring fra rett etter støtet (når <InlineLatex latex="v" /> er som beregnet i a) til toppunktet (alt KE → PE):</p>
                <FormulaBox
                  latex="\tfrac{1}{2}(m+M)v^2 = (m+M)gL(1-\cos\varphi)"
                  variant="blue"
                />
                <p>Massen <InlineLatex latex="(m+M)" /> kansellerer. Setter inn <InlineLatex latex="v = m v_0 /(m+M)" /> fra a):</p>
                <FormulaBox
                  latex="\tfrac{1}{2}\!\left(\tfrac{m\,v_0}{m+M}\right)^{\!2} = gL(1-\cos\varphi) \;\;\Longrightarrow\;\; \frac{m^2 v_0^2}{2(m+M)^2} = gL(1-\cos\varphi)"
                  variant="blue"
                />
                <p>Løs for <InlineLatex latex="\cos\varphi" />:</p>
                <FormulaBox
                  latex="\cos\varphi = 1 - \frac{m^2 v_0^2}{2gL(m+M)^2}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;\varphi_\text{max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right)\;}\;\;\checkmark"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Praktisk innsikt: ballistisk pendel</p>
                  <p>Dette er prinsippet bak den klassiske <em>ballistiske pendelen</em> (1700-tallet) — historisk eneste måte å måle prosjektilfart på før moderne elektronikk. Du måler utslaget <InlineLatex latex="\varphi_\text{max}" />, kjenner <InlineLatex latex="m, M, L, g" />, og løser baklengs for <InlineLatex latex="v_0" />. Smart kombinasjon av bevegelsesmengde-bevaring (i støtet) og energibevaring (i pendelbanen).</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Elastisk støt — eksplisitte tall</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt:</p>
                  <p><InlineLatex latex="m = 0{,}0050\;\text{kg} = 5\;\text{g}" /> (kule), &nbsp; <InlineLatex latex="M = 10\;\text{kg}" /> (kloss), &nbsp; <InlineLatex latex="v_0 = 100\;\text{m/s}" /></p>
                </div>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — formler for 1D elastisk støt</p>
                  <p>For elastisk støt med <InlineLatex latex="m" /> som treffer hvilende <InlineLatex latex="M" /> har vi to ligninger (bevegelsesmengde + kinetisk energi):</p>
                  <p className="mt-1"><InlineLatex latex="mv_0 = mv_1 + Mv_2" /> &nbsp;&nbsp; og &nbsp;&nbsp; <InlineLatex latex="\tfrac{1}{2}mv_0^2 = \tfrac{1}{2}mv_1^2 + \tfrac{1}{2}Mv_2^2" /></p>
                  <p className="mt-1">Standardløsning (utledes ved å eliminere én variabel):</p>
                  <p className="mt-1"><InlineLatex latex="v_1 = \frac{m-M}{m+M}\,v_0" /> &nbsp;&nbsp; (kule) &nbsp;&nbsp; , &nbsp;&nbsp; <InlineLatex latex="v_2 = \frac{2m}{m+M}\,v_0" /> &nbsp;&nbsp; (kloss)</p>
                </div>
                <FormulaBox
                  latex="v_1 = \frac{0{,}005 - 10}{0{,}005 + 10}\cdot 100 = \frac{-9{,}995}{10{,}005}\cdot 100 \approx -99{,}90\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="v_2 = \frac{2\cdot 0{,}005}{10{,}005}\cdot 100 = \frac{0{,}010}{10{,}005}\cdot 100 \approx 0{,}0999\;\text{m/s}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v_\text{kule} \approx -99{,}9\;\text{m/s},\;\;v_\text{kloss} \approx 0{,}10\;\text{m/s}\;}"
                  variant="gold"
                />
                <p>Negativt fortegn på <InlineLatex latex="v_1" /> betyr at kulen rikosjetterer tilbake i motsatt retning av startfarten.</p>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Grensetilfeller — sjekk forståelsen</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li><InlineLatex latex="m \ll M" /> (her): kule spretter med nesten samme fart, kloss knapt beveger seg. Som ball mot vegg.</li>
                    <li><InlineLatex latex="m = M" />: kule stopper helt, kloss tar over hele farten. Som biljardballer.</li>
                    <li><InlineLatex latex="m \gg M" />: kule fortsetter nesten uforandret, kloss skytes vekk med fart <InlineLatex latex="\approx 2v_0" />.</li>
                  </ul>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Gjennomsnittlig kraft fra kula på klossen</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — impuls–bevegelsesmengde-teoremet</p>
                  <p>Newtons 2. lov i impulsform: <InlineLatex latex="\vec F\,dt = d\vec p" />. Integrert over et tidsrom <InlineLatex latex="\Delta t" /> blir det <InlineLatex latex="\vec J = \int \vec F\,dt = \Delta\vec p" /> — impuls = endring i bevegelsesmengde. For en gjennomsnittlig kraft over støtet er det enkelt: <InlineLatex latex="\bar F\,\Delta t = \Delta p" />, altså <InlineLatex latex="\bar F = \Delta p/\Delta t" />.</p>
                  <p className="mt-1">Vi velger å se på KLOSSEN (siden den har enklest <InlineLatex latex="\Delta p" />: fra ro til <InlineLatex latex="v_2" />). Kraften vi finner er kraften FRA kulen PÅ klossen — ifølge Newtons 3. lov samme størrelse som kraften fra klossen på kulen, bare motsatt rettet.</p>
                </div>
                <FormulaBox
                  latex="\bar F = \frac{\Delta p_\text{kloss}}{\Delta t} = \frac{M\cdot v_2 - 0}{\Delta t} = \frac{10\cdot 0{,}0999}{0{,}0050}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;\bar F \approx 200\;\text{N}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Konsistenssjekk via kulen</p>
                  <p>Endring i kulens bevegelsesmengde: <InlineLatex latex="\Delta p_\text{kule} = m(v_1 - v_0) = 0{,}005(-99{,}9 - 100) = -0{,}9995" /> kg·m/s. Kraft fra klossen på kulen: <InlineLatex latex="\bar F_\text{k→K} = \Delta p_\text{kule}/\Delta t = -0{,}9995/0{,}005 \approx -199{,}9" /> N. Negativ = mot kulens opprinnelige bevegelse. Newtons 3. lov: kraft fra kulen på klossen er motsatt rettet og like stor ⇒ +199,9 ≈ 200 N. ✓</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Bevegelsesmengde er bevart i ALLE kollisjoner (når ytre krefter ≪ støtkrefter)</li>
                    <li>Kinetisk energi er BARE bevart i elastiske støt</li>
                    <li>Ballistisk pendel-strategi: bevegelsesmengde for støtet + energi for pendelbanen</li>
                    <li>1D elastisk støt: <InlineLatex latex="v_1 = \tfrac{m-M}{m+M}v_0" />, <InlineLatex latex="v_2 = \tfrac{2m}{m+M}v_0" /></li>
                    <li>Impuls–bevegelsesmengde-teoremet: <InlineLatex latex="\bar F\Delta t = \Delta p" /> gir gjennomsnittskraft</li>
                    <li>Newtons 3. lov sjekker konsistens: kraft fra A på B = −kraft fra B på A</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 4: Rullende skive på skråplan ─── */}
          <ExerciseCard
            number={4}
            title="Rullende skive på skråplan — translasjon + rotasjon"
            difficulty="vanskelig"
            source="Oblig 2"
            relevantChapters={[
              { href: "/ing164/kapittel-9/teori", title: "Kap 9 — Treghetsmoment" },
              { href: "/ing164/kapittel-10/teori", title: "Kap 10 — Rulling og dynamikk" },
              { href: "/ing164/kapittel-7/teori", title: "Kap 7 — Energibevaring" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 460 220" className="w-full max-w-lg mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
                  {/* horisontalt underlag */}
                  <line x1="20" y1="190" x2="200" y2="190" stroke="#475569" strokeWidth="2.5" />
                  {/* skråplan */}
                  <line x1="200" y1="190" x2="430" y2="80" stroke="#475569" strokeWidth="2.5" />
                  {/* fyll skråplan */}
                  <polygon points="200,190 430,190 430,80" fill="#e2e8f0" stroke="none" />
                  {/* vinkel β */}
                  <path d="M 240 190 A 40 40 0 0 0 232 172" fill="none" stroke="#64748b" strokeWidth="1.2" />
                  <text x="220" y="184" fontSize="13" fill="#64748b" fontStyle="italic">β</text>
                  {/* skiven på horisontalt underlag */}
                  <circle cx="110" cy="170" r="20" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
                  <line x1="110" y1="170" x2="125" y2="160" stroke="#d97706" strokeWidth="1.5" />
                  <text x="100" y="175" fontSize="10" fill="#92400e" fontWeight="bold">m, R</text>
                  {/* fart v0 */}
                  <line x1="135" y1="170" x2="180" y2="170" stroke="#22c55e" strokeWidth="2.5" />
                  <polygon points="183,170 175,166 175,174" fill="#22c55e" />
                  <text x="138" y="163" fontSize="11" fill="#16a34a" fontWeight="bold" fontStyle="italic">v₀</text>
                  {/* rotasjonspil */}
                  <path d="M 115 152 A 14 14 0 1 1 99 158" fill="none" stroke="#2563eb" strokeWidth="1.6" />
                  <polygon points="99,160 95,154 103,153" fill="#2563eb" />
                  <text x="80" y="142" fontSize="11" fill="#2563eb" fontWeight="bold" fontStyle="italic">ω</text>
                  {/* tekst */}
                  <text x="40" y="210" fontSize="10" fill="#64748b">horisontalt underlag</text>
                  <text x="320" y="155" fontSize="10" fill="#64748b">skråplan</text>
                </svg>

                <p className="mb-3">En sirkulær homogen skive med masse <InlineLatex latex="m" /> og radius <InlineLatex latex="R" /> ruller uten å gli på et horisontalt underlag inn mot et skråplan med helningsvinkel <InlineLatex latex="\beta" />. Skivesenterets hastighet er <InlineLatex latex="v_0" />.</p>
                <p className="mb-1">a) Finn skivens kinetiske energi uttrykt ved <InlineLatex latex="m" /> og <InlineLatex latex="v_0" />.</p>
                <p className="mb-3">Skiven ruller videre oppover skråplanet uten å gli. Tyngdeakselerasjonen er <InlineLatex latex="g" />.</p>
                <p className="mb-1">b) Finn skivens akselerasjon uttrykt ved <InlineLatex latex="g" /> og <InlineLatex latex="\beta" />.</p>
                <p className="mb-1">c) Hvor høyt opp på skråplanet kommer skiven før den snur?</p>
                <p>d) Dersom skiven skal rulle uten å gli må friksjonstallet <InlineLatex latex="\mu" /> mellom skive og skråplan oppfylle <InlineLatex latex="\mu \ge \tfrac{1}{3}\tan\beta" />. Vis dette.</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Et rullende objekt har BÅDE translasjons- og rotasjonsenergi. Bruk rullebetingelsen <InlineLatex latex="v_0 = \omega R" /> for å eliminere <InlineLatex latex="\omega" />. Treghetsmoment for kompakt skive: <InlineLatex latex="I = \tfrac{1}{2}mR^2" />.</p> },
              { label: "Hint b", content: <p>To muligheter: (1) Krefter + dreiemoment med rullebetingelsen <InlineLatex latex="a = \alpha R" />, (2) Energi-derivasjon. Begge gir <InlineLatex latex="a = \tfrac{2}{3}g\sin\beta" />.</p> },
              { label: "Hint c", content: <p>Energibevaring: hele <InlineLatex latex="E_k" /> blir <InlineLatex latex="mgh" />, der <InlineLatex latex="h = s\sin\beta" /> og <InlineLatex latex="s" /> er strekningen langs skråplanet.</p> },
              { label: "Hint d", content: <p>Friksjonen er den ENESTE kraften som kan gi rotasjons-deselerasjon. Finn nødvendig friksjon <InlineLatex latex="R" /> fra dreiemomentligningen, og krev <InlineLatex latex="R \le \mu N" /> der <InlineLatex latex="N = mg\cos\beta" />.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) kinetisk energi", formulas: <div><p><InlineLatex latex="E_k = E_{k,\text{trans}} + E_{k,\text{rot}} = \tfrac{1}{2}mv_0^2 + \tfrac{1}{2}I\omega_0^2" /></p><p>Kompakt skive: <InlineLatex latex="I = \tfrac{1}{2}mR^2" />. Rulling: <InlineLatex latex="\omega_0 = v_0/R" />.</p></div> },
              { subQuestion: "b) akselerasjon", formulas: <div><p>Newton (langs skråplan, ned positiv): <InlineLatex latex="mg\sin\beta - R = ma" /></p><p>Dreiemoment om sentrum: <InlineLatex latex="R\cdot R = I\alpha = \tfrac{1}{2}mR^2 \cdot \tfrac{a}{R}" /></p></div> },
              { subQuestion: "c) maks høyde", formulas: <div><p><InlineLatex latex="\tfrac{3}{4}mv_0^2 = mgh" /> med <InlineLatex latex="h = s\sin\beta" /></p></div> },
              { subQuestion: "d) friksjonstall", formulas: <div><p><InlineLatex latex="R = \tfrac{1}{2}ma" /> (fra dreiemomentligningen)</p><p>Statisk friksjon: <InlineLatex latex="R \le \mu N = \mu mg\cos\beta" /></p></div> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Rullebevegelse er nøkkeltemaet: et rullende stivt legeme har BÅDE translasjonsenergi <InlineLatex latex="\tfrac{1}{2}mv^2" /> og rotasjonsenergi <InlineLatex latex="\tfrac{1}{2}I\omega^2" />. Rullebetingelsen <InlineLatex latex="v = \omega R" /> kobler dem sammen. På skråplanet bruker vi enten Newton + dreiemoment, eller energibevaring — begge metodene gir samme svar, og det er pedagogisk å se begge.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Skive: masse <InlineLatex latex="m" />, radius <InlineLatex latex="R" /></li>
                    <li>Senterets hastighet før skråplanet: <InlineLatex latex="v_0" /></li>
                    <li>Skråplanvinkel: <InlineLatex latex="\beta" />, tyngdeakselerasjon: <InlineLatex latex="g" /></li>
                    <li>Skiven ruller UTEN å gli (statisk friksjon, ingen energitap)</li>
                  </ul>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Kinetisk energi for rullende skive</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — energi for rullende stivt legeme</p>
                  <p>Et rullende objekt har to typer kinetisk energi:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li><strong>Translasjon</strong> av massesenteret: <InlineLatex latex="E_{k,\text{trans}} = \tfrac{1}{2}mv_\text{cm}^2" /></li>
                    <li><strong>Rotasjon</strong> om massesenteret: <InlineLatex latex="E_{k,\text{rot}} = \tfrac{1}{2}I_\text{cm}\omega^2" /></li>
                  </ul>
                  <p className="mt-1">For en kompakt sylinder/skive er <InlineLatex latex="I = \tfrac{1}{2}mR^2" /> (fra integrasjon — vises i Kap 9).</p>
                </div>
                <p>Rullebetingelsen er kritisk her. Når skiven ruller uten å gli, beveger kontaktpunktet seg ikke i forhold til underlaget. Det krever at sentrums-farten passer med rotasjonen:</p>
                <FormulaBox
                  latex="v_0 = \omega_0 R \;\;\Longleftrightarrow\;\; \omega_0 = \frac{v_0}{R}"
                  variant="blue"
                />
                <p>Setter sammen begge bidragene:</p>
                <FormulaBox
                  latex="E_k = \tfrac{1}{2}mv_0^2 + \tfrac{1}{2}\!\left(\tfrac{1}{2}mR^2\right)\!\!\left(\tfrac{v_0}{R}\right)^{\!2} = \tfrac{1}{2}mv_0^2 + \tfrac{1}{4}mv_0^2"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;E_k = \tfrac{3}{4}mv_0^2\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Fysisk tolkning</p>
                  <p>Skiven har 50 % mer kinetisk energi enn en glidende kloss med samme fart. <InlineLatex latex="\tfrac{1}{2}mv_0^2" /> er translasjon (massesenteret beveger seg), pluss <InlineLatex latex="\tfrac{1}{4}mv_0^2" /> rotasjon om aksen. For andre former er forholdet annerledes: hul sylinder har <InlineLatex latex="I = mR^2" /> og energien <InlineLatex latex="mv_0^2" /> (dobbelt så mye). En kule har <InlineLatex latex="I = \tfrac{2}{5}mR^2" /> og <InlineLatex latex="\tfrac{7}{10}mv_0^2" />.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Akselerasjon oppover skråplanet</p>
                <p>Vi setter opp Newton i kraft- og dreiemomentform. Velg <strong>positiv retning ned skråplanet</strong> (samme retning som netto kraft fra tyngden), slik at <InlineLatex latex="a" /> blir positiv som <em>magnitude</em> av deselerasjonen mens skiven ruller opp.</p>

                <svg viewBox="0 0 380 220" className="w-full max-w-md mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
                  {/* skråplan */}
                  <polygon points="40,180 360,40 360,180" fill="#e2e8f0" />
                  <line x1="40" y1="180" x2="360" y2="40" stroke="#475569" strokeWidth="2" />
                  <path d="M 90 180 A 30 30 0 0 0 84 162" fill="none" stroke="#64748b" strokeWidth="1.2" />
                  <text x="68" y="174" fontSize="12" fill="#64748b" fontStyle="italic">β</text>

                  {/* skive på skråplanet */}
                  <circle cx="200" cy="120" r="22" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
                  <line x1="200" y1="120" x2="217" y2="106" stroke="#d97706" strokeWidth="1.5" />

                  {/* mg vertikalt nedover */}
                  <line x1="200" y1="120" x2="200" y2="195" stroke="#ef4444" strokeWidth="2.5" />
                  <polygon points="200,200 195,190 205,190" fill="#ef4444" />
                  <text x="207" y="188" fontSize="11" fill="#ef4444" fontWeight="bold" fontStyle="italic">mg</text>

                  {/* normalkraft N - perpendicular til skråplan, peker oppover-venstre */}
                  <line x1="200" y1="120" x2="171" y2="51" stroke="#3b82f6" strokeWidth="2.5" />
                  <polygon points="169,47 169,57 175,52" fill="#3b82f6" />
                  <text x="148" y="48" fontSize="11" fill="#3b82f6" fontWeight="bold" fontStyle="italic">N</text>

                  {/* friksjon R — opp langs skråplanet (fordi skiva ruller opp) */}
                  <line x1="200" y1="120" x2="148" y2="142" stroke="#22c55e" strokeWidth="2.5" />
                  <polygon points="146,143 154,140 152,148" fill="#22c55e" />
                  <text x="118" y="140" fontSize="11" fill="#22c55e" fontWeight="bold" fontStyle="italic">R</text>

                  {/* mg-komponent langs skråplanet (ned) */}
                  <line x1="200" y1="120" x2="252" y2="98" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
                  <polygon points="254,97 246,100 248,92" fill="#dc2626" />
                  <text x="246" y="92" fontSize="10" fill="#dc2626" fontStyle="italic">mg sin β</text>

                  {/* rotasjon */}
                  <path d="M 217 105 A 14 14 0 1 1 200 98" fill="none" stroke="#2563eb" strokeWidth="1.4" />
                  <polygon points="200,99 196,93 204,93" fill="#2563eb" />
                  <text x="222" y="105" fontSize="10" fill="#2563eb" fontStyle="italic">ω (avtar)</text>
                </svg>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Hvorfor peker friksjonen opp skråplanet?</p>
                  <p>Skiven ruller oppover og bremser. Translasjonen bremses av tyngdekomponenten <InlineLatex latex="mg\sin\beta" />. Rotasjonen bremses bare hvis det er et dreiemoment om sentrum. Den eneste kraften som ikke virker gjennom sentrum, er friksjonen (gjennom kontaktpunktet). For at <InlineLatex latex="\omega" /> skal avta i takt med <InlineLatex latex="v" /> (rullebetingelsen), må friksjonen gi et dreiemoment som bremser rotasjonen — det betyr friksjonen peker <em>opp skråplanet</em>.</p>
                </div>

                <p>Newtons 2. lov langs skråplanet (positiv retning: ned skråplanet — samme retning som <InlineLatex latex="a" /> mens skiven bremser oppover):</p>
                <FormulaBox
                  latex="\sum F_\parallel = ma:\;\; mg\sin\beta - R = ma"
                  variant="blue"
                />
                <p>Newtons 2. lov for rotasjon om sentrum (kun friksjonen gir dreiemoment om sentrum, siden <InlineLatex latex="N" /> og <InlineLatex latex="mg" /> går gjennom sentrum eller har null arm):</p>
                <FormulaBox
                  latex="\sum \tau = I\alpha:\;\; R \cdot R = \tfrac{1}{2}mR^2 \cdot \alpha"
                  variant="blue"
                />
                <p>Rullebetingelsen kobler <InlineLatex latex="\alpha" /> og <InlineLatex latex="a" />: <InlineLatex latex="\alpha = a/R" />. Setter inn:</p>
                <FormulaBox
                  latex="R\cdot R = \tfrac{1}{2}mR^2 \cdot \tfrac{a}{R} \;\;\Longrightarrow\;\; R = \tfrac{1}{2}ma"
                  variant="blue"
                />
                <p>Setter dette uttrykket for <InlineLatex latex="R" /> inn i kraftligningen:</p>
                <FormulaBox
                  latex="mg\sin\beta - \tfrac{1}{2}ma = ma \;\;\Longrightarrow\;\; mg\sin\beta = \tfrac{3}{2}ma"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;a = \tfrac{2}{3}g\sin\beta\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Sammenlikning</p>
                  <p>En glidende kloss på samme skråplan har akselerasjon <InlineLatex latex="g\sin\beta" />. Den rullende skiven har bare <InlineLatex latex="\tfrac{2}{3}g\sin\beta" /> — ⅓ av tyngdekomponenten "brukes" til å sakte ned rotasjonen i stedet for translasjonen. Tilsvarende verdier: hul sylinder gir <InlineLatex latex="\tfrac{1}{2}g\sin\beta" />, kule gir <InlineLatex latex="\tfrac{5}{7}g\sin\beta" />.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Hvor høyt opp skråplanet skiven kommer</p>
                <p>Skiven ruller uten å gli, så friksjonen er statisk og gjør INGEN arbeid (kontaktpunktet er momentant i ro). Mekanisk energi er bevart:</p>
                <FormulaBox
                  latex="E_{k,\text{start}} = E_{p,\text{topp}}\;\;\Longrightarrow\;\; \tfrac{3}{4}mv_0^2 = mgh"
                  variant="blue"
                />
                <p>Høyden over startpunktet (kun vertikalt) er <InlineLatex latex="h = s\sin\beta" />, der <InlineLatex latex="s" /> er strekningen langs skråplanet:</p>
                <FormulaBox
                  latex="\tfrac{3}{4}m v_0^2 = mg \cdot s\sin\beta \;\;\Longrightarrow\;\; \boxed{\;s = \frac{3v_0^2}{4g\sin\beta}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Hvorfor gjør statisk friksjon ikke arbeid?</p>
                  <p>Arbeid = <InlineLatex latex="F\cdot v_\text{kontakt}" />. For ren rulling er kontaktpunktets fart null (det "settes ned" og "løftes opp" momentant uten å gli). Ingen forflytning der friksjonen virker → ingen arbeid → mekanisk energi er bevart. Dette er kritisk forskjell fra glidefriksjon, som ALLTID tar bort energi.</p>
                </div>
                <p>Konsistenssjekk: sett inn <InlineLatex latex="v^2 = v_0^2 - 2as" /> (kinematikk med konstant deselerasjon). Med <InlineLatex latex="v=0" /> og <InlineLatex latex="a=\tfrac{2}{3}g\sin\beta" /> får vi samme <InlineLatex latex="s = 3v_0^2/(4g\sin\beta)" />. ✓</p>

                <p className="font-semibold text-[var(--accent)]">d) Krav til friksjonstallet</p>
                <p>For at skiven skal RULLE og ikke gli, må statisk friksjon <InlineLatex latex="R" /> ikke overstige sin maksimale verdi <InlineLatex latex="\mu N" />. Først finner vi normalkraften — vinkelrett på skråplanet, ingen akselerasjon der:</p>
                <FormulaBox
                  latex="\sum F_\perp = 0:\;\; N - mg\cos\beta = 0 \;\;\Longrightarrow\;\; N = mg\cos\beta"
                  variant="blue"
                />
                <p>Vi vet allerede at den nødvendige friksjonen for ren rulling er <InlineLatex latex="R = \tfrac{1}{2}ma = \tfrac{1}{2}m\cdot\tfrac{2}{3}g\sin\beta = \tfrac{1}{3}mg\sin\beta" />.</p>
                <p>Statisk friksjon kan ikke overstige <InlineLatex latex="\mu N" />. Vi krever derfor:</p>
                <FormulaBox
                  latex="R_\text{nødvendig} \le \mu N \;\;\Longrightarrow\;\; \tfrac{1}{3}mg\sin\beta \le \mu \cdot mg\cos\beta"
                  variant="blue"
                />
                <FormulaBox
                  latex="\tfrac{1}{3}\frac{\sin\beta}{\cos\beta} \le \mu \;\;\Longrightarrow\;\; \boxed{\;\mu \ge \tfrac{1}{3}\tan\beta\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvorfor denne grensen?</p>
                  <p>Brattere skråplan ⇒ større <InlineLatex latex="\tan\beta" /> ⇒ kreves mer friksjon for å holde rullingen i synk med translasjonen. Hvis <InlineLatex latex="\mu &lt; \tfrac{1}{3}\tan\beta" />, glir skiven og ruller samtidig — da gjør glidefriksjonen arbeid og energibevaring brytes. Vinkelfunksjonsbetingelsen er uavhengig av <InlineLatex latex="m" /> og <InlineLatex latex="R" /> — bare formen (treghetsmomentet) betyr noe.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Rullende objekt: <InlineLatex latex="E_k = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2" /> med <InlineLatex latex="v = \omega R" /></li>
                    <li>For kompakt skive: <InlineLatex latex="E_k = \tfrac{3}{4}mv^2" />, <InlineLatex latex="a = \tfrac{2}{3}g\sin\beta" /></li>
                    <li>Statisk friksjon ved ren rulling gjør INGEN arbeid (kontaktpunktet er momentant i ro)</li>
                    <li>Newton + dreiemoment + rullebetingelse = tre ligninger som løses sammen</li>
                    <li>Krav for ren rulling avhenger av formen: skive <InlineLatex latex="\tfrac{1}{3}\tan\beta" />, hul sylinder <InlineLatex latex="\tfrac{1}{2}\tan\beta" />, kule <InlineLatex latex="\tfrac{2}{7}\tan\beta" /></li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* OBLIG 3 — Elektrisitet og magnetisme */}
      {/* ════════════════════════════════════════════════ */}
      {selected === "oblig3" && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold">Oblig 3</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">Kap 9–10, 21–24</span>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">Rotasjon (spinn og dreiemoment), elektriske felt, potensial, Coulombs lov og kapasitans.</p>

          {/* ─── OPPGAVE 1: Roterende sylindere ─── */}
          <ExerciseCard
            number={1}
            title="To roterende sylindere — spinn og dreiemoment"
            difficulty="vanskelig"
            source="Oblig 3"
            relevantChapters={[
              { href: "/ing164/kapittel-9/teori", title: "Kap 9 — Treghetsmoment" },
              { href: "/ing164/kapittel-10/teori", title: "Kap 10 — Spinn og dreiemoment" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 300 220" className="w-full max-w-xs mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #fafafa, #f5f5f5)" }}>
                  <line x1="150" y1="15" x2="150" y2="200" stroke="#94a3b8" strokeWidth="2" />
                  <ellipse cx="150" cy="60" rx="80" ry="18" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" />
                  <rect x="70" y="52" width="160" height="16" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" rx="2" />
                  <ellipse cx="150" cy="52" rx="80" ry="18" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="95" y="57" fontSize="11" fill="white" fontWeight="bold">M₁ = 10 kg</text>
                  <path d="M 230 52 A 10 10 0 0 1 238 60" fill="none" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="240,60 234,58 236,65" fill="#ef4444" />
                  <text x="242" y="58" fontSize="10" fill="#ef4444">ω₁</text>
                  <ellipse cx="150" cy="140" rx="80" ry="18" fill="#86efac" stroke="#22c55e" strokeWidth="1.5" />
                  <rect x="70" y="132" width="160" height="16" fill="#bbf7d0" stroke="#22c55e" strokeWidth="1" rx="2" />
                  <ellipse cx="150" cy="132" rx="80" ry="18" fill="#4ade80" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="100" y="137" fontSize="11" fill="white" fontWeight="bold">M₂ = 5 kg</text>
                  <text x="235" y="140" fontSize="10" fill="#22c55e">i ro</text>
                  <text x="155" y="195" fontSize="10" fill="#94a3b8">R = 1,0 m</text>
                </svg>

                <p className="mb-3">To kompakte homogene sylinderformede skiver er plassert over hverandre. Den øvre sylinderen har masse 10 kg, den nedre har masse 5 kg. Begge har radius 1,0 m. Den øvre sylinderen roterer med <InlineLatex latex="\omega_1 = 5{,}0" /> rad/s. Den nedre sylinderen ligger i ro. Akslingen er friksjonsfri.</p>
                <p className="mb-1">a) Finn treghetsmomentet til hver av sylindrene og spinnet (det angulære momentet) til den øvre sylinderen.</p>
                <p className="mb-1">b) Den øvre sylinderen slippes ned på den nedre. Etter en tid roterer de med samme vinkelhastighet pga. friksjon. Finn vinkelhastigheten når de roterer sammen.</p>
                <p className="mb-1">c) Finn arbeidet gjort av friksjonen når sylindrene har samme vinkelhastighet.</p>
                <p>d) Beregn det totale kraftmomentet på den nedre sylinderen under prosessen dersom det tar 5 sekunder fra den øvre slippes ned til de roterer med felles vinkelfart.</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Treghetsmoment for kompakt sylinder: <InlineLatex latex="I = \tfrac{1}{2}MR^2" />. Spinn: <InlineLatex latex="L = I\omega" /></p> },
              { label: "Hint b", content: <p>Ingen ytre dreiemoment om aksen → spinnet er bevart: <InlineLatex latex="L_\text{før} = L_\text{etter}" /></p> },
              { label: "Hint c", content: <p>Friksjonsarbeid = endring i kinetisk rotasjonsenergi: <InlineLatex latex="W = \Delta E_{k,\text{rot}}" /></p> },
              { label: "Hint d", content: <p>Angulær impuls: <InlineLatex latex="\tau \cdot \Delta t = \Delta L" /> for den nedre sylinderen.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) treghetsmoment og spinn", formulas: <div><p><InlineLatex latex="I = \tfrac{1}{2}MR^2" /> (kompakt sylinder)</p><p><InlineLatex latex="L = I\omega" /></p></div> },
              { subQuestion: "b) felles vinkelhastighet", formulas: <p><InlineLatex latex="I_1\omega_1 = (I_1 + I_2)\omega_f \;\Rightarrow\; \omega_f = \frac{I_1\omega_1}{I_1 + I_2}" /></p> },
              { subQuestion: "c) friksjonsarbeid", formulas: <p><InlineLatex latex="W = \tfrac{1}{2}(I_1+I_2)\omega_f^2 - \tfrac{1}{2}I_1\omega_1^2" /></p> },
              { subQuestion: "d) dreiemoment", formulas: <p><InlineLatex latex="\tau = \frac{\Delta L_2}{\Delta t} = \frac{I_2 \omega_f}{\Delta t}" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Dette er den ROTASJONELLE versjonen av en uelastisk kollisjon. Friksjonen mellom skivene er en INDRE kraft for systemet, så den kan ikke endre totalspinnet. Akslingen er friksjonsfri ⇒ ingen ytre dreiemoment heller. Konklusjon: total spinn <InlineLatex latex="L" /> er bevart, og vi finner felles <InlineLatex latex="\omega" /> på samme måte som vi finner felles fart i et uelastisk støt. Energi går derimot tapt til varme i friksjonen mellom skivene.</p>
                </div>

                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — rotasjonens "store fire"</p>
                  <p>Hver translasjons-størrelse har en perfekt rotasjonsanalog:</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li>Posisjon <InlineLatex latex="x" /> ↔ vinkel <InlineLatex latex="\theta" /></li>
                    <li>Fart <InlineLatex latex="v" /> ↔ vinkelfart <InlineLatex latex="\omega" /></li>
                    <li>Akselerasjon <InlineLatex latex="a" /> ↔ vinkelakselerasjon <InlineLatex latex="\alpha" /></li>
                    <li>Masse <InlineLatex latex="m" /> ↔ treghetsmoment <InlineLatex latex="I" /></li>
                    <li>Kraft <InlineLatex latex="F" /> ↔ dreiemoment <InlineLatex latex="\tau" /></li>
                    <li>Bevegelsesmengde <InlineLatex latex="p = mv" /> ↔ spinn <InlineLatex latex="L = I\omega" /></li>
                    <li>Kinetisk energi <InlineLatex latex="\tfrac{1}{2}mv^2" /> ↔ rotasjonsenergi <InlineLatex latex="\tfrac{1}{2}I\omega^2" /></li>
                    <li>Newton: <InlineLatex latex="F = ma" /> ↔ <InlineLatex latex="\tau = I\alpha" /></li>
                    <li>Impuls: <InlineLatex latex="F\Delta t = \Delta p" /> ↔ vinkelimpuls: <InlineLatex latex="\tau\Delta t = \Delta L" /></li>
                  </ul>
                  <p className="mt-1">For en KOMPAKT (solid) sylinder/skive med rotasjonsakse gjennom sentrum: <InlineLatex latex="I = \tfrac{1}{2}MR^2" /> (utledet ved integrasjon i Kap 9).</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Hva vet vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Øvre sylinder: <InlineLatex latex="M_1 = 10\;\text{kg}" />, &nbsp; <InlineLatex latex="\omega_1 = 5{,}0\;\text{rad/s}" /></li>
                    <li>Nedre sylinder: <InlineLatex latex="M_2 = 5\;\text{kg}" />, &nbsp; <InlineLatex latex="\omega_2 = 0" /></li>
                    <li>Begge har radius <InlineLatex latex="R = 1{,}0\;\text{m}" /></li>
                    <li>Akslingen er friksjonsfri ⇒ ingen ytre dreiemoment om aksen</li>
                    <li>Friksjon MELLOM skivene er en intern kraft (men gir energitap som varme)</li>
                  </ul>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Treghetsmoment og spinn</p>
                <FormulaBox
                  latex="I_1 = \tfrac{1}{2}M_1 R^2 = \tfrac{1}{2}\cdot 10\cdot 1{,}0^2 = 5{,}0\;\text{kg·m}^2"
                  variant="blue"
                />
                <FormulaBox
                  latex="I_2 = \tfrac{1}{2}M_2 R^2 = \tfrac{1}{2}\cdot 5\cdot 1{,}0^2 = 2{,}5\;\text{kg·m}^2"
                  variant="blue"
                />
                <p>Spinn til den øvre sylinderen:</p>
                <FormulaBox
                  latex="L_1 = I_1\omega_1 = 5{,}0\cdot 5{,}0 = 25\;\text{kg·m}^2/\text{s}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">b) Felles vinkelhastighet etter at de er sammen</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Hvorfor er spinnet bevart?</p>
                  <p>Newton i rotasjonsform: <InlineLatex latex="\tau_\text{ytre} = dL/dt" />. Akslingen er friksjonsfri og tyngdekraften virker langs aksen (ingen arm) ⇒ <InlineLatex latex="\tau_\text{ytre} = 0" /> om rotasjonsaksen. Friksjonen MELLOM de to skivene er en INTERN kraft for det totale systemet, og indre krefter kommer i Newton-3.-par som kansellerer hverandre i totalt dreiemoment. Konklusjon: <InlineLatex latex="L_\text{tot}" /> er konstant.</p>
                </div>
                <FormulaBox
                  latex="L_\text{før} = L_\text{etter}\;:\;\; I_1\omega_1 + I_2\cdot 0 = (I_1 + I_2)\omega_f"
                  variant="blue"
                />
                <FormulaBox
                  latex="\omega_f = \frac{I_1\omega_1}{I_1 + I_2} = \frac{25}{5{,}0 + 2{,}5} = \frac{25}{7{,}5}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;\omega_f \approx 3{,}33\;\text{rad/s}\;}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">c) Arbeid utført av friksjonen</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Hvorfor IKKE energibevaring?</p>
                  <p>Selv om totalspinnet er bevart, er rotasjonsenergien IKKE bevart. Friksjonen mellom skivene er en GLIDEFRIKSJON (kontaktoverflatene har ulik fart i starten — den øvre roterer, den nedre står stille). Glidefriksjon gjør alltid negativt arbeid på systemet (omdannet til varme). Akkurat som lineær uelastisk støt, hvor <InlineLatex latex="p" /> er bevart men <InlineLatex latex="E_k" /> avtar.</p>
                </div>
                <p>Friksjonens arbeid = endring i total rotasjonsenergi (arbeid–energi-teoremet for rotasjon):</p>
                <FormulaBox
                  latex="W_\text{frik} = E_{k,\text{etter}} - E_{k,\text{før}} = \tfrac{1}{2}(I_1+I_2)\omega_f^2 - \tfrac{1}{2}I_1\omega_1^2"
                  variant="blue"
                />
                <FormulaBox
                  latex="W_\text{frik} = \tfrac{1}{2}\cdot 7{,}5\cdot 3{,}33^2 - \tfrac{1}{2}\cdot 5{,}0\cdot 5{,}0^2 = 41{,}7 - 62{,}5"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;W_\text{frik} \approx -20{,}8\;\text{J}\;}"
                  variant="gold"
                />
                <p>Negativt fortegn ⇒ friksjonen tar bort 20,8 J mekanisk energi, som ender som varme ved kontakt-flatene.</p>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Energifordeling — sjekk størrelsene</p>
                  <p>Før: 62,5 J (alt i øvre). Etter: 41,7 J (delt mellom begge). Det betyr at <InlineLatex latex="62{,}5 - 41{,}7 = 20{,}8" /> J er borte (= varme). Du har altså mistet ca. 33 % av energien — typisk for en uelastisk "støt"-prosess der massene er nokså like.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Gjennomsnittlig dreiemoment på den nedre sylinderen</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — vinkelimpuls</p>
                  <p>Vi vil ha kraftmomentet PÅ den nedre sylinderen. Da må vi se på den isolert. Dreiemomentet kommer fra friksjonen som virker langs kontaktflaten — vi vet ikke kraftens detaljerte tidsforløp, men vi kan finne gjennomsnittet via vinkelimpulsen: <InlineLatex latex="\bar\tau\,\Delta t = \Delta L_2 = I_2\,\Delta\omega_2" />. Den nedre sylinderen går fra <InlineLatex latex="\omega = 0" /> til <InlineLatex latex="\omega_f = 3{,}33" /> rad/s på <InlineLatex latex="\Delta t = 5{,}0" /> s.</p>
                </div>
                <FormulaBox
                  latex="\bar\tau = \frac{\Delta L_2}{\Delta t} = \frac{I_2\,\omega_f - 0}{\Delta t} = \frac{2{,}5\cdot 3{,}33}{5{,}0}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;\bar\tau \approx 1{,}67\;\text{N·m}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Konsistenssjekk via Newtons 3. lov</p>
                  <p>Den nedre sylinderen presser med samme dreiemoment tilbake på den øvre (motsatt rettet). Den øvre gikk fra 25 til <InlineLatex latex="I_1\omega_f = 5\cdot 3{,}33 = 16{,}65" /> kg·m²/s, altså <InlineLatex latex="\Delta L_1 = -8{,}33" /> kg·m²/s på 5 s ⇒ <InlineLatex latex="\bar\tau" /> på den øvre = <InlineLatex latex="-1{,}67" /> N·m. Lik størrelse, motsatt fortegn — konsistent med Newtons 3. lov. ✓</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Treghetsmoment for kompakt sylinder: <InlineLatex latex="I = \tfrac{1}{2}MR^2" /></li>
                    <li>Spinn er bevart når ytre dreiemoment er null (selv om INDRE friksjon virker)</li>
                    <li>Rotasjonsenergi er IKKE bevart når glidefriksjon virker</li>
                    <li>Perfekt analogi til uelastisk støt: <InlineLatex latex="L \leftrightarrow p" />, <InlineLatex latex="I \leftrightarrow m" />, <InlineLatex latex="\omega \leftrightarrow v" /></li>
                    <li>Vinkelimpuls: <InlineLatex latex="\bar\tau\,\Delta t = \Delta L" /> gir gjennomsnittsdreiemoment</li>
                    <li>Newtons 3. lov gjelder også for dreiemoment mellom to legemer</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 2: Platekondensator og Coulombs lov ─── */}
          <ExerciseCard
            number={2}
            title="Platekondensator og Coulombs lov"
            difficulty="middels"
            source="Oblig 3"
            relevantChapters={[
              { href: "/ing164/kapittel-21/teori", title: "Kap 21 — Elektrisk felt" },
              { href: "/ing164/kapittel-23/teori", title: "Kap 23 — Elektrisk potensial" },
              { href: "/ing164/kapittel-24/teori", title: "Kap 24 — Kapasitans" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 320 160" className="w-full max-w-sm mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #fafafa, #f5f5f5)" }}>
                  <rect x="30" y="30" width="10" height="100" fill="#64748b" stroke="#475569" strokeWidth="1" />
                  <line x1="35" y1="55" x2="55" y2="55" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="35" y1="65" x2="55" y2="65" stroke="#64748b" strokeWidth="1.5" />
                  <text x="20" y="55" fontSize="11" fill="#ef4444" fontWeight="bold">+</text>
                  <text x="20" y="70" fontSize="11" fill="#3b82f6" fontWeight="bold">−</text>
                  <text x="8" y="90" fontSize="9" fill="#64748b">500 V</text>
                  <line x1="55" y1="55" x2="110" y2="55" stroke="#64748b" strokeWidth="1" />
                  <line x1="55" y1="65" x2="110" y2="65" stroke="#64748b" strokeWidth="1" />
                  <line x1="110" y1="55" x2="110" y2="40" stroke="#64748b" strokeWidth="1" />
                  <line x1="110" y1="65" x2="110" y2="120" stroke="#64748b" strokeWidth="1" />
                  <rect x="90" y="30" width="180" height="15" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" rx="3" />
                  <text x="155" y="42" fontSize="10" fill="#ef4444" fontWeight="bold">+ + + + +</text>
                  <rect x="90" y="115" width="180" height="15" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
                  <text x="155" y="127" fontSize="10" fill="#3b82f6" fontWeight="bold">− − − − −</text>
                  <line x1="160" y1="50" x2="160" y2="110" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" />
                  <polygon points="160,113 156,105 164,105" fill="#22c55e" />
                  <text x="165" y="85" fontSize="10" fill="#22c55e" fontWeight="bold" fontStyle="italic">E</text>
                  <text x="180" y="85" fontSize="9" fill="#64748b">d = 0,050 m</text>
                </svg>

                <p className="mb-3">To plane, parallelle metallskiver er plassert i innbyrdes avstand 0,050 m. Platene er koplet til en spenningskilde på 500 V.</p>
                <p className="mb-1">a) Forklar hva vi mener med et uniformt elektrisk felt. Hva blir den elektriske feltstyrken mellom platene?</p>
                <p className="mb-1">b) Et elektron slippes fra ro ved den negative plata. Hvilken fart har elektronet når det treffer den positive plata? Hvor lang tid bruker det?</p>
                <p className="mb-1">c) Metallskivene er sirkulære og har radius 0,25 m. Beregn systemets kapasitans. Hvor mye ladning er samlet på hver av platene?</p>
                <p>d) Beregn den elektriske kraften mellom et elektron og et proton med innbyrdes avstand <InlineLatex latex="0{,}529 \times 10^{-10}" /> m. Hvilken akselerasjon vil elektronet få?</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Uniformt felt = konstant styrke og retning overalt. Mellom parallelle plater: <InlineLatex latex="E = V/d" /></p> },
              { label: "Hint b", content: <p>Bruk energibevaring: <InlineLatex latex="eV = \tfrac{1}{2}m_e v^2" />. For tiden: <InlineLatex latex="s = \tfrac{1}{2}at^2" /> der <InlineLatex latex="a = eE/m_e" /></p> },
              { label: "Hint c", content: <p>Platekondensator: <InlineLatex latex="C = \varepsilon_0 A/d" /> der <InlineLatex latex="A = \pi r^2" />. Ladning: <InlineLatex latex="Q = CV" /></p> },
              { label: "Hint d", content: <p>Coulombs lov: <InlineLatex latex="F = ke^2/r^2" />. Akselerasjon: <InlineLatex latex="a = F/m_e" /></p> },
            ]}
            formulaHints={[
              { subQuestion: "a) feltstyrke", formulas: <p><InlineLatex latex="E = \frac{V}{d}" /></p> },
              { subQuestion: "b) fart og tid", formulas: <div><p><InlineLatex latex="eV = \tfrac{1}{2}m_e v^2 \;\Rightarrow\; v = \sqrt{2eV/m_e}" /></p><p><InlineLatex latex="t = \sqrt{2d/a}" /> der <InlineLatex latex="a = eE/m_e" /></p></div> },
              { subQuestion: "c) kapasitans", formulas: <div><p><InlineLatex latex="C = \varepsilon_0 \pi r^2 / d" /></p><p><InlineLatex latex="Q = CV" /></p></div> },
              { subQuestion: "d) Coulombs lov", formulas: <p><InlineLatex latex="F = \frac{ke^2}{r^2}" />, &nbsp; <InlineLatex latex="a = F/m_e" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Fire ganske ulike beregninger om elektriske felt og krefter, alt knyttet til samme oppsett (parallelle plater) eller atomær skala (Bohr-radius). Felles tråd: Newton + arbeid–energi-teoremet i elektriske felt. Husk: 1 V = 1 J/C, så <InlineLatex latex="qV" /> har enheten energi.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Konstanter:</p>
                  <p><InlineLatex latex="e = 1{,}602\times 10^{-19}\;\text{C}" /></p>
                  <p><InlineLatex latex="m_e = 9{,}109\times 10^{-31}\;\text{kg}" /></p>
                  <p><InlineLatex latex="\varepsilon_0 = 8{,}854\times 10^{-12}\;\text{F/m}" /></p>
                  <p><InlineLatex latex="k = 1/(4\pi\varepsilon_0) = 8{,}988\times 10^9\;\text{N·m}^2/\text{C}^2" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Uniformt elektrisk felt</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — uniformt felt</p>
                  <p>Et <em>uniformt</em> elektrisk felt har <strong>samme styrke OG samme retning</strong> i alle punkter (vektor-konstant). Mellom to STORE plane parallelle plater (areal mye større enn avstanden mellom dem) er feltet tilnærmet uniformt. Bortsett fra ved kantene, hvor feltlinjene buer ("kanteffekter"). Sammenheng mellom spenning og felt: <InlineLatex latex="V = \int \vec E\cdot d\vec\ell = E\cdot d" /> for uniformt felt langs en rett linje på avstand <InlineLatex latex="d" />.</p>
                </div>
                <FormulaBox
                  latex="E = \frac{V}{d} = \frac{500}{0{,}050} = 10\,000\;\text{V/m} = 10{,}0\;\text{kV/m}"
                  variant="gold"
                />
                <p>Retning: fra positiv til negativ plate (dvs. fra høyt til lavt potensial).</p>

                <p className="font-semibold text-[var(--accent)]">b) Elektronets fart og tid mellom platene</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — to ekvivalente metoder</p>
                  <p><strong>Metode 1: Energibevaring.</strong> Feltet utfører arbeid <InlineLatex latex="W = qV" /> på ladningen. Med startfart null blir det <InlineLatex latex="\tfrac{1}{2}m v^2 = eV" />. Spørsmålet "hvor stor er <InlineLatex latex="V" />" svares av at elektronet starter ved den negative plata og treffer den positive plata, så det går gjennom hele potensialdifferansen 500 V.</p>
                  <p className="mt-1"><strong>Metode 2: Newton + kinematikk.</strong> Konstant kraft <InlineLatex latex="F = eE" /> ⇒ konstant akselerasjon <InlineLatex latex="a = eE/m_e" />. Bruk <InlineLatex latex="d = \tfrac{1}{2}at^2" /> for tiden og <InlineLatex latex="v = at" /> eller <InlineLatex latex="v^2 = 2ad" /> for farten. Begge gir samme svar.</p>
                </div>
                <p>Vi bruker energibevaring for farten:</p>
                <FormulaBox
                  latex="eV = \tfrac{1}{2}m_e v^2 \;\Longrightarrow\; v = \sqrt{\frac{2eV}{m_e}} = \sqrt{\frac{2\cdot 1{,}602\times 10^{-19}\cdot 500}{9{,}109\times 10^{-31}}}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;v \approx 1{,}33\times 10^{7}\;\text{m/s}\;\;(\approx 4{,}4\%\;\text{av lyshastigheten})\;}"
                  variant="gold"
                />
                <p>For tiden bruker vi at akselerasjonen er konstant:</p>
                <FormulaBox
                  latex="a = \frac{eE}{m_e} = \frac{1{,}602\times 10^{-19}\cdot 10\,000}{9{,}109\times 10^{-31}} \approx 1{,}76\times 10^{15}\;\text{m/s}^2"
                  variant="blue"
                />
                <FormulaBox
                  latex="d = \tfrac{1}{2}at^2 \;\Longrightarrow\; t = \sqrt{\frac{2d}{a}} = \sqrt{\frac{2\cdot 0{,}050}{1{,}76\times 10^{15}}}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;t \approx 7{,}5\;\text{ns}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Konsistenssjekk</p>
                  <p>Sjekk via <InlineLatex latex="v = at" />: <InlineLatex latex="1{,}76\times 10^{15}\cdot 7{,}54\times 10^{-9} \approx 1{,}33\times 10^{7}" /> m/s ✓. Akselerasjonen er nesten <InlineLatex latex="2\times 10^{14}" /> ganger større enn tyngdens 9,81 m/s² — derfor kan vi trygt neglisjere tyngdekraften på elektroner i kondensatorer.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Kapasitans og ladning</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — definisjon av kapasitans</p>
                  <p>Kapasitans er forholdet mellom ladning på platene og spenningen mellom dem: <InlineLatex latex="C = Q/V" />. For en platekondensator (uniformt felt) gir Gauss' lov tettheten <InlineLatex latex="\sigma = \varepsilon_0 E" />, som integrert over arealet og delt på <InlineLatex latex="V = Ed" /> gir den geometriske formelen <InlineLatex latex="C = \varepsilon_0 A/d" />. Sirkulære plater har <InlineLatex latex="A = \pi r^2" />.</p>
                </div>
                <FormulaBox
                  latex="C = \frac{\varepsilon_0\pi r^2}{d} = \frac{8{,}854\times 10^{-12}\cdot \pi\cdot 0{,}25^2}{0{,}050}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;C \approx 3{,}48\times 10^{-11}\;\text{F} = 34{,}8\;\text{pF}\;}"
                  variant="gold"
                />
                <FormulaBox
                  latex="Q = CV = 34{,}8\times 10^{-12}\cdot 500"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;Q \approx 1{,}74\times 10^{-8}\;\text{C} = 17{,}4\;\text{nC}\;}"
                  variant="gold"
                />
                <p>Den ene plata får +17,4 nC, den andre −17,4 nC. Total ladning er null (ladning er bevart i isolert system).</p>

                <p className="font-semibold text-[var(--accent)]">d) Coulombkraften mellom elektron og proton i hydrogen</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt:</p>
                  <p>Avstand: <InlineLatex latex="r = 0{,}529\times 10^{-10}\;\text{m} = 0{,}529" /> Å (Bohr-radius)</p>
                  <p>Begge ladninger har størrelsen <InlineLatex latex="e" />: <InlineLatex latex="q_p = +e" />, <InlineLatex latex="q_e = -e" /></p>
                </div>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — Coulombs lov</p>
                  <p>Mellom to punktladninger virker en kraft <InlineLatex latex="F = k|q_1 q_2|/r^2" /> langs linja som forbinder dem. Krefter har samme fortegn som <InlineLatex latex="q_1 q_2" />: positiv (<InlineLatex latex="++" /> eller <InlineLatex latex="--" />) ⇒ frastøtning; negativ (<InlineLatex latex="+-" />) ⇒ tiltrekning. Her er proton + og elektron −, så de tiltrekker hverandre.</p>
                </div>
                <FormulaBox
                  latex="F = \frac{ke^2}{r^2} = \frac{8{,}988\times 10^{9}\cdot (1{,}602\times 10^{-19})^2}{(0{,}529\times 10^{-10})^2}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;F \approx 8{,}24\times 10^{-8}\;\text{N}\;}"
                  variant="gold"
                />
                <p>Akselerasjon av elektronet (Newton):</p>
                <FormulaBox
                  latex="a = \frac{F}{m_e} = \frac{8{,}24\times 10^{-8}}{9{,}109\times 10^{-31}}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;a \approx 9{,}05\times 10^{22}\;\text{m/s}^2\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Fysisk tolkning og sammenligning</p>
                  <p>Avstanden 0,529 Å er <em>Bohr-radiusen</em> — den klassiske banen til elektronet i hydrogen. Akselerasjonen <InlineLatex latex="9\times 10^{22}" /> m/s² er astronomisk; til sammenligning er gravitasjonsakselerasjonen i jordoverflaten 9,81 m/s². Sjekk: ratio elektrisk/gravitasjon = ca. <InlineLatex latex="10^{22}" /> ganger. Det betyr at gravitasjon er HELT ubetydelig på atomskala.</p>
                  <p className="mt-1">Klassisk fysikk forutsier at en akselererende ladning sender ut elektromagnetisk stråling og ville derfor falle inn i atomkjernen på ca. <InlineLatex latex="10^{-11}" /> s. At dette IKKE skjer var en av de største paradoksene som drev fram kvantemekanikken.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Uniformt felt mellom parallelle plater: <InlineLatex latex="E = V/d" /></li>
                    <li>Energibevaring i E-felt: <InlineLatex latex="qV = \tfrac{1}{2}mv^2" /> for akselerert ladning fra ro</li>
                    <li>Platekondensator: <InlineLatex latex="C = \varepsilon_0 A/d" />, <InlineLatex latex="Q = CV" /></li>
                    <li>Coulombs lov: <InlineLatex latex="F = kq_1 q_2/r^2" />, motsatte fortegn ⇒ tiltrekning</li>
                    <li>På atomskala dominerer elektriske krefter fullstendig over gravitasjon</li>
                    <li>1 elektron-volt (eV) = energien et elektron får ved 1 V akselerasjon = 1,602×10⁻¹⁹ J</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 3: Punktladninger — potensial, arbeid, kraft, felt ─── */}
          <ExerciseCard
            number={3}
            title="To punktladninger — potensial, arbeid, kraft og felt"
            difficulty="vanskelig"
            source="Oblig 3"
            relevantChapters={[
              { href: "/ing164/kapittel-21/teori", title: "Kap 21 — Coulombs lov og E-felt" },
              { href: "/ing164/kapittel-23/teori", title: "Kap 23 — Elektrisk potensial" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 360 280" className="w-full max-w-md mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f8fafc, #eef2ff)" }}>
                  {/* akser */}
                  <line x1="30" y1="220" x2="340" y2="220" stroke="#94a3b8" strokeWidth="1.2" />
                  <polygon points="343,220 335,216 335,224" fill="#94a3b8" />
                  <text x="345" y="224" fontSize="11" fill="#64748b" fontWeight="bold">x</text>
                  <line x1="180" y1="265" x2="180" y2="20" stroke="#94a3b8" strokeWidth="1.2" />
                  <polygon points="180,17 176,25 184,25" fill="#94a3b8" />
                  <text x="186" y="25" fontSize="11" fill="#64748b" fontWeight="bold">y</text>

                  {/* gridmerker */}
                  <line x1="120" y1="218" x2="120" y2="222" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="240" y1="218" x2="240" y2="222" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="178" y1="140" x2="182" y2="140" stroke="#94a3b8" strokeWidth="1" />
                  <text x="113" y="234" fontSize="9" fill="#94a3b8">−3 m</text>
                  <text x="232" y="234" fontSize="9" fill="#94a3b8">3 m</text>
                  <text x="187" y="144" fontSize="9" fill="#94a3b8">4 m</text>

                  {/* q2 venstre */}
                  <circle cx="120" cy="220" r="11" fill="#3b82f6" stroke="#1e40af" strokeWidth="1.5" />
                  <text x="115" y="225" fontSize="11" fill="white" fontWeight="bold">+</text>
                  <text x="98" y="208" fontSize="10" fill="#1e40af" fontWeight="bold">q₂ = 6 μC</text>

                  {/* q1 høyre */}
                  <circle cx="240" cy="220" r="9" fill="#3b82f6" stroke="#1e40af" strokeWidth="1.5" />
                  <text x="236" y="225" fontSize="11" fill="white" fontWeight="bold">+</text>
                  <text x="232" y="208" fontSize="10" fill="#1e40af" fontWeight="bold">q₁ = 3 μC</text>

                  {/* punkt P (0,4) */}
                  <circle cx="180" cy="140" r="6" fill="#a855f7" stroke="#6b21a8" strokeWidth="1.5" />
                  <text x="186" y="135" fontSize="10" fill="#6b21a8" fontWeight="bold">P (0, 4)</text>

                  {/* origo */}
                  <circle cx="180" cy="220" r="3" fill="#ef4444" />
                  <text x="184" y="252" fontSize="10" fill="#ef4444" fontWeight="bold">origo</text>

                  {/* avstandslinjer fra ladningene til P */}
                  <line x1="120" y1="220" x2="180" y2="140" stroke="#a8a29e" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="240" y1="220" x2="180" y2="140" stroke="#a8a29e" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="135" y="180" fontSize="9" fill="#64748b" fontStyle="italic">5 m</text>
                  <text x="215" y="180" fontSize="9" fill="#64748b" fontStyle="italic">5 m</text>
                </svg>

                <p className="mb-3">En punktladning <InlineLatex latex="q_1 = 3\,\mu\text{C}" /> ligger i punktet <InlineLatex latex="(3\,\text{m}, 0)" /> og en annen punktladning <InlineLatex latex="q_2 = 6\,\mu\text{C}" /> ligger i punktet <InlineLatex latex="(-3\,\text{m}, 0)" />.</p>
                <p className="mb-1">a) Hva er det elektriske potensialet i origo og i punktet <InlineLatex latex="(0, 4\,\text{m})" />?</p>
                <p className="mb-1">b) En tredje punktladning <InlineLatex latex="q_3 = 4\,\mu\text{C}" /> plasseres i origo. Hvor stort arbeid må utføres på <InlineLatex latex="q_3" /> hvis den skal flyttes fra origo til <InlineLatex latex="(0, 4\,\text{m})" />?</p>
                <p className="mb-1">c) Finn størrelsen og retningen på den elektrostatiske kraften som virker på <InlineLatex latex="q_3" /> fra de to andre ladningene når <InlineLatex latex="q_3" /> er i punktet <InlineLatex latex="(0, 4\,\text{m})" />.</p>
                <p>d) Beregn nå størrelse og retning på det elektriske feltet i origo.</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Potensialet er en SKALAR — bare summer bidragene: <InlineLatex latex="V = k q_1/r_1 + k q_2/r_2" />. Avstandene fra (3,0) og (−3,0) til origo er begge 3 m. Til (0,4) er begge 5 m (3-4-5-trekant!).</p> },
              { label: "Hint b", content: <p>Arbeid utført PÅ ladningen mot feltet = endring i potensiell energi: <InlineLatex latex="W_\text{ytre} = q_3(V_\text{slutt} - V_\text{start})" />. Får negativt svar? Det betyr feltet hjelper.</p> },
              { label: "Hint c", content: <p>Kraft er en VEKTOR. Tegn vektoren fra hver kildeladning til <InlineLatex latex="q_3" />, finn enhetsvektoren, multipliser med kraftens størrelse <InlineLatex latex="k q q_3 / r^2" />, og summer komponenter.</p> },
              { label: "Hint d", content: <p>E-feltet i origo: vektorer fra kildene til origo, peker BORT FRA positive ladninger. Begge ligger på x-aksen, så y-komponentene kanselleres ikke automatisk — sjekk!</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) potensial", formulas: <div><p><InlineLatex latex="V = k\sum_i q_i/r_i" /> (skalar, summeres direkte)</p><p><InlineLatex latex="k = 8{,}988 \times 10^9 \;\text{N·m}^2/\text{C}^2" /></p></div> },
              { subQuestion: "b) arbeid", formulas: <p><InlineLatex latex="W_\text{ytre} = \Delta U = q_3(V_2 - V_1)" /></p> },
              { subQuestion: "c) kraft (vektor)", formulas: <div><p><InlineLatex latex="\vec F_i = \frac{k q_i q_3}{r_i^2}\,\hat r_i" /> (peker bort fra <InlineLatex latex="q_i" /> hvis begge er positive)</p><p><InlineLatex latex="\vec F_\text{tot} = \sum_i \vec F_i" /></p></div> },
              { subQuestion: "d) E-felt (vektor)", formulas: <div><p><InlineLatex latex="\vec E = \sum_i \frac{k q_i}{r_i^2}\,\hat r_i" /> (fra hver kilde til feltpunktet)</p></div> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Fire ulike størrelser i én oppgave: potensial (skalar), arbeid (skalar via ΔU), kraft (vektor) og E-felt (vektor). Skalarene summeres direkte. Vektorene må splittes i x- og y-komponenter, summeres komponent for komponent, og settes sammen igjen. Geometrien er en symmetrisk konfigurasjon med 3-4-5-trekanter — det forenkler avstandsregningen.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Konstanter og geometri:</p>
                  <p><InlineLatex latex="k = 8{,}988 \times 10^9 \;\text{N·m}^2/\text{C}^2" /></p>
                  <p>Avstand fra (3,0) eller (−3,0) til origo: <InlineLatex latex="r = 3 \text{ m}" /></p>
                  <p>Avstand fra (3,0) eller (−3,0) til (0,4): <InlineLatex latex="r = \sqrt{3^2+4^2} = 5 \text{ m}" /> (3-4-5-trekant)</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Elektrisk potensial</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — potensial som skalar</p>
                  <p>Det elektriske potensialet <InlineLatex latex="V" /> er en SKALAR (ikke vektor). Det betyr at potensialet fra flere kilder bare summeres tallmessig — ingen komponenter, ingen vinkler. Det er den store fordelen med å regne med potensial framfor felt.</p>
                  <p className="mt-1">For en punktladning er <InlineLatex latex="V = kq/r" /> (med <InlineLatex latex="V \to 0" /> i det uendelige).</p>
                </div>
                <p>I origo (begge avstander = 3 m):</p>
                <FormulaBox
                  latex="V_\text{origo} = \frac{kq_1}{3} + \frac{kq_2}{3} = \frac{k(q_1+q_2)}{3} = \frac{8{,}988\times 10^9 \cdot 9\times 10^{-6}}{3}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;V_\text{origo} \approx 2{,}70 \times 10^4\;\text{V} = 27{,}0\;\text{kV}\;}"
                  variant="gold"
                />
                <p>I punktet <InlineLatex latex="(0,4)" /> (begge avstander = 5 m):</p>
                <FormulaBox
                  latex="V_{(0,4)} = \frac{k(q_1+q_2)}{5} = \frac{8{,}988\times 10^9 \cdot 9\times 10^{-6}}{5}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;V_{(0,4)} \approx 1{,}62 \times 10^4\;\text{V} = 16{,}2\;\text{kV}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Sjekk fortegn</p>
                  <p>Begge ladninger er positive ⇒ potensialet er positivt overalt (positive ladninger "skyver opp" potensialet). Origo er nærmere ladningene enn (0,4) ⇒ <InlineLatex latex="V_\text{origo} &gt; V_{(0,4)}" />. Det stemmer.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Arbeid for å flytte <InlineLatex latex="q_3" /> fra origo til <InlineLatex latex="(0,4)" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — arbeid og potensiell energi</p>
                  <p>Den potensielle energien til <InlineLatex latex="q_3" /> i et felt er <InlineLatex latex="U = q_3 V" />. Arbeidet utført av en YTRE kraft for å flytte ladningen kvasistatisk (uten å gi den fart) er endringen i potensiell energi: <InlineLatex latex="W_\text{ytre} = \Delta U = q_3 (V_\text{slutt} - V_\text{start})" />. Hvis svaret er negativt, betyr det at feltet "vil" flytte ladningen denne veien — vi må holde igjen, ikke skyve.</p>
                </div>
                <FormulaBox
                  latex="W_\text{ytre} = q_3\,(V_{(0,4)} - V_\text{origo}) = 4\times 10^{-6}\,(16{,}2 - 27{,}0)\times 10^3"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;W_\text{ytre} \approx -4{,}31\times 10^{-2}\;\text{J} = -43{,}1\;\text{mJ}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hva betyr negativt arbeid her?</p>
                  <p>Origo er nærmere de positive ladningene enn (0,4). En positiv prøveladning <InlineLatex latex="q_3" /> blir derfor frastøtt utover. Når vi flytter <InlineLatex latex="q_3" /> fra origo til (0,4), beveger den seg i retning feltet "vil" sende den. Det elektriske feltet gjør derfor positivt arbeid (43,1 mJ), mens vi som ytre agent må gjøre negativt arbeid (−43,1 mJ) for å holde igjen og levere ladningen ved (0,4) med null fart. Energiregnskap: <InlineLatex latex="W_\text{ytre} + W_\text{felt} = \Delta E_k = 0" /> ⇒ <InlineLatex latex="W_\text{felt} = +43{,}1" /> mJ.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Kraft på <InlineLatex latex="q_3" /> i punktet <InlineLatex latex="(0,4)" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — Coulombs lov som vektor</p>
                  <p>Kraften fra kildeladning <InlineLatex latex="q_i" /> på prøveladningen <InlineLatex latex="q_3" /> har størrelse <InlineLatex latex="F_i = k q_i q_3 / r_i^2" /> og retning langs linja mellom dem (BORT fra <InlineLatex latex="q_i" /> hvis begge har samme fortegn). Vi finner enhetsvektoren <InlineLatex latex="\hat r_i = (\vec r_3 - \vec r_i)/r_i" /> og setter <InlineLatex latex="\vec F_i = F_i\,\hat r_i" />. Resultanten er vektorsummen.</p>
                </div>

                <p><strong>Kraft fra <InlineLatex latex="q_1" /> ved (3,0) på <InlineLatex latex="q_3" /> ved (0,4):</strong></p>
                <p className="pl-4">Vektor fra <InlineLatex latex="q_1" /> til <InlineLatex latex="q_3" />: <InlineLatex latex="(0-3,\,4-0) = (-3, 4)" />, lengde <InlineLatex latex="r_1 = 5" /> m.</p>
                <p className="pl-4">Enhetsvektor: <InlineLatex latex="\hat r_1 = (-3/5,\, 4/5) = (-0{,}6,\, 0{,}8)" /></p>
                <p className="pl-4">Størrelse: <InlineLatex latex="F_1 = \tfrac{k q_1 q_3}{r_1^2} = \tfrac{8{,}988\times 10^9 \cdot 3\times 10^{-6} \cdot 4\times 10^{-6}}{25} = 4{,}31\times 10^{-3}" /> N</p>
                <p className="pl-4">Vektor: <InlineLatex latex="\vec F_1 = 4{,}31\,\text{mN}\cdot(-0{,}6,\, 0{,}8) = (-2{,}59,\, 3{,}45)\,\text{mN}" /></p>

                <p><strong>Kraft fra <InlineLatex latex="q_2" /> ved (−3,0) på <InlineLatex latex="q_3" /> ved (0,4):</strong></p>
                <p className="pl-4">Vektor fra <InlineLatex latex="q_2" /> til <InlineLatex latex="q_3" />: <InlineLatex latex="(0-(-3),\,4-0) = (3, 4)" />, lengde <InlineLatex latex="r_2 = 5" /> m.</p>
                <p className="pl-4">Enhetsvektor: <InlineLatex latex="\hat r_2 = (3/5,\, 4/5) = (0{,}6,\, 0{,}8)" /></p>
                <p className="pl-4">Størrelse: <InlineLatex latex="F_2 = \tfrac{k q_2 q_3}{r_2^2} = \tfrac{8{,}988\times 10^9 \cdot 6\times 10^{-6} \cdot 4\times 10^{-6}}{25} = 8{,}63\times 10^{-3}" /> N</p>
                <p className="pl-4">Vektor: <InlineLatex latex="\vec F_2 = 8{,}63\,\text{mN}\cdot(0{,}6,\, 0{,}8) = (5{,}18,\, 6{,}90)\,\text{mN}" /></p>

                <p><strong>Resultant:</strong></p>
                <FormulaBox
                  latex="\vec F = \vec F_1 + \vec F_2 = (-2{,}59 + 5{,}18,\;3{,}45 + 6{,}90)\,\text{mN} = (2{,}59,\;10{,}35)\,\text{mN}"
                  variant="blue"
                />
                <FormulaBox
                  latex="|\vec F| = \sqrt{2{,}59^2 + 10{,}35^2} = \sqrt{113{,}8} \approx 10{,}7\,\text{mN}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\theta = \arctan\!\left(\tfrac{10{,}35}{2{,}59}\right) \approx 76°\;\text{fra +x-aksen}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;\vec F \approx 10{,}7\,\text{mN},\; \text{ca. } 76°\text{ over +x-aksen (oppover-høyre)}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvorfor ikke rett oppover?</p>
                  <p>Hvis begge ladningene var like, ville x-komponentene kanselleres ut og kraften ville pekt rett oppover. Men <InlineLatex latex="q_2 = 2 q_1" /> — den venstre er sterkere. Den dytter <InlineLatex latex="q_3" /> mer mot høyre enn <InlineLatex latex="q_1" /> dytter mot venstre. Resultanten har derfor en netto x-komponent mot høyre, og helningsvinkelen blir litt mindre enn 90°.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) E-felt i origo</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — E-felt fra punktladninger</p>
                  <p>E-feltet er kraften per ladning som en POSITIV prøveladning ville føle. Fra en positiv kildeladning peker feltet RADIALT UTOVER (fra kilden); fra en negativ kildeladning peker det RADIALT INNOVER. Vi summerer som vektorer:  <InlineLatex latex="\vec E = \sum_i (k q_i / r_i^2)\,\hat r_i" />.</p>
                </div>
                <p>Begge kildeladninger ligger på x-aksen. Avstandene til origo er like (begge 3 m), men ladningene er ulike.</p>
                <p><strong>Bidrag fra <InlineLatex latex="q_1 = 3\,\mu\text{C}" /> ved (3,0):</strong> peker fra (3,0) bort mot origo, dvs. i <em>negativ</em> x-retning.</p>
                <p className="pl-4"><InlineLatex latex="E_1 = \tfrac{k q_1}{r^2} = \tfrac{8{,}988\times 10^9 \cdot 3\times 10^{-6}}{9} = 2996\;\text{V/m}" /></p>
                <p className="pl-4"><InlineLatex latex="\vec E_1 = (-2996,\;0)\;\text{V/m}" /></p>

                <p><strong>Bidrag fra <InlineLatex latex="q_2 = 6\,\mu\text{C}" /> ved (−3,0):</strong> peker fra (−3,0) bort mot origo, dvs. i <em>positiv</em> x-retning.</p>
                <p className="pl-4"><InlineLatex latex="E_2 = \tfrac{k q_2}{r^2} = \tfrac{8{,}988\times 10^9 \cdot 6\times 10^{-6}}{9} = 5992\;\text{V/m}" /></p>
                <p className="pl-4"><InlineLatex latex="\vec E_2 = (+5992,\;0)\;\text{V/m}" /></p>

                <FormulaBox
                  latex="\vec E_\text{origo} = \vec E_1 + \vec E_2 = (-2996 + 5992,\;0) = (2996,\;0)\;\text{V/m}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;|\vec E_\text{origo}| \approx 3{,}00\;\text{kV/m},\;\text{retning: positiv } x\text{-retning}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Fysisk tolkning</p>
                  <p>Den større ladningen <InlineLatex latex="q_2" /> "vinner" og dytter feltet i positiv x-retning. Hvis begge var like ville feltene kansellert hverandre og <InlineLatex latex="\vec E = 0" /> i origo. Konsekvens: en positiv prøveladning i origo ville få en kraft i +x-retning (mot <InlineLatex latex="q_1" />) — den blir frastøtt mer fra <InlineLatex latex="q_2" /> enn fra <InlineLatex latex="q_1" />.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Potensial er SKALAR — summeres direkte uten vektorregning</li>
                    <li>E-felt og kraft er VEKTORER — splitt i komponenter før du summerer</li>
                    <li>Arbeid på en ladning: <InlineLatex latex="W_\text{ytre} = q\Delta V" />. Negativt = feltet hjelper</li>
                    <li>3-4-5-trekanten dukker opp ofte i geometriske oppgaver — utnytt symmetrien</li>
                    <li>Sjekk om svaret stemmer med fysisk intuisjon (større ladning dominerer)</li>
                  </ul>
                </div>
              </div>
            }
          />

          {/* ─── OPPGAVE 4: Platekondensator — energi og dielektrikum ─── */}
          <ExerciseCard
            number={4}
            title="Platekondensator — energi, parallellkobling og dielektrikum"
            difficulty="middels"
            source="Oblig 3"
            relevantChapters={[
              { href: "/ing164/kapittel-24/teori", title: "Kap 24 — Kapasitans og dielektrika" },
              { href: "/ing164/kapittel-23/teori", title: "Kap 23 — Elektrisk potensial" },
            ]}
            problem={
              <div>
                <svg viewBox="0 0 380 200" className="w-full max-w-md mx-auto my-3 rounded-lg" style={{ background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)" }}>
                  {/* øverste plate */}
                  <rect x="80" y="50" width="220" height="14" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" rx="2" />
                  <text x="172" y="61" fontSize="11" fill="#dc2626" fontWeight="bold">+ + + + + +</text>
                  {/* nederste plate */}
                  <rect x="80" y="136" width="220" height="14" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" rx="2" />
                  <text x="172" y="148" fontSize="11" fill="#2563eb" fontWeight="bold">− − − − − −</text>

                  {/* E-felt-piler */}
                  <line x1="120" y1="68" x2="120" y2="132" stroke="#22c55e" strokeWidth="1.7" />
                  <polygon points="120,135 116,127 124,127" fill="#22c55e" />
                  <line x1="170" y1="68" x2="170" y2="132" stroke="#22c55e" strokeWidth="1.7" />
                  <polygon points="170,135 166,127 174,127" fill="#22c55e" />
                  <line x1="220" y1="68" x2="220" y2="132" stroke="#22c55e" strokeWidth="1.7" />
                  <polygon points="220,135 216,127 224,127" fill="#22c55e" />
                  <line x1="270" y1="68" x2="270" y2="132" stroke="#22c55e" strokeWidth="1.7" />
                  <polygon points="270,135 266,127 274,127" fill="#22c55e" />

                  {/* d-mål */}
                  <line x1="320" y1="64" x2="320" y2="136" stroke="#64748b" strokeWidth="1" />
                  <line x1="316" y1="64" x2="324" y2="64" stroke="#64748b" strokeWidth="1" />
                  <line x1="316" y1="136" x2="324" y2="136" stroke="#64748b" strokeWidth="1" />
                  <text x="328" y="105" fontSize="11" fill="#64748b" fontWeight="bold">d</text>
                  <text x="328" y="120" fontSize="9" fill="#64748b">1 mm</text>

                  {/* areal-mål */}
                  <text x="80" y="40" fontSize="10" fill="#64748b">A = 1 cm²</text>
                  <text x="80" y="180" fontSize="10" fill="#64748b">E = 1,0 × 10⁵ V/m</text>

                  {/* E-tekst */}
                  <text x="195" y="105" fontSize="11" fill="#16a34a" fontWeight="bold" fontStyle="italic">E</text>
                </svg>

                <p className="mb-3">En platekondensator er ladet slik at feltet mellom platene er <InlineLatex latex="E = 1{,}0 \times 10^{5}\;\text{V/m}" />. Avstanden mellom platene er <InlineLatex latex="d = 1\;\text{mm}" />, og hver plate har areal <InlineLatex latex="A = 1\;\text{cm}^2" />.</p>
                <p className="mb-1">a) Finn kapasitansen til kondensatoren. Hvor stor ladning er lagret på hver plate? Hvor mye potensiell energi er lagret i kondensatoren?</p>
                <p className="mb-1">b) Kondensatoren blir parallellkoblet med en kondensator med samme kapasitans. Hva blir den resulterende kapasitansen?</p>
                <p className="mb-1">c) Vi ser nå på kun den første kondensatoren alene igjen. Denne får satt inn et dielektrikum med dielektrikumkonstant <InlineLatex latex="K = 4" />. Hva er permittiviteten til dielektrikumet? Hva blir den nye kapasitansen?</p>
                <p>d) Hvor mye energi er nå lagret i kondensatoren?</p>
              </div>
            }
            hints={[
              { label: "Hint a", content: <p>Tre formler du trenger: <InlineLatex latex="C = \varepsilon_0 A/d" />, <InlineLatex latex="V = E\cdot d" />, <InlineLatex latex="Q = CV" />, <InlineLatex latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}QV = Q^2/(2C)" />. Konverter A til m² og d til m først.</p> },
              { label: "Hint b", content: <p>For parallellkobling adderes kapasitansene direkte: <InlineLatex latex="C_\text{tot} = C_1 + C_2" />. Tenk på det som å øke arealet.</p> },
              { label: "Hint c", content: <p>Permittiviteten øker med faktoren <InlineLatex latex="K" />: <InlineLatex latex="\varepsilon = K\varepsilon_0" />. Kapasitansen øker med samme faktor: <InlineLatex latex="C&apos; = K C" />.</p> },
              { label: "Hint d", content: <p>Når dielektrikumet settes inn på en kondensator som er <em>frakoblet</em> spenningskilden, er ladningen <InlineLatex latex="Q" /> bevart. Da synker spenningen og energien: <InlineLatex latex="U&apos; = Q^2/(2C&apos;) = U/K" />.</p> },
            ]}
            formulaHints={[
              { subQuestion: "a) C, Q, U", formulas: <div><p><InlineLatex latex="C = \varepsilon_0 A/d" />, &nbsp; <InlineLatex latex="V = Ed" />, &nbsp; <InlineLatex latex="Q = CV" /></p><p><InlineLatex latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}QV" /></p></div> },
              { subQuestion: "b) parallellkobling", formulas: <p><InlineLatex latex="C_\text{tot} = C_1 + C_2 = 2C" /></p> },
              { subQuestion: "c) dielektrikum", formulas: <div><p><InlineLatex latex="\varepsilon = K\varepsilon_0" />, &nbsp; <InlineLatex latex="C' = \varepsilon A/d = K C" /></p></div> },
              { subQuestion: "d) ny energi", formulas: <p>Konstant Q: <InlineLatex latex="U' = Q^2/(2C') = U/K" /></p> },
            ]}
            solution={
              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Strategi</p>
                  <p>Bygg opp en kjede: geometri (<InlineLatex latex="A,d" />) gir kapasitans (<InlineLatex latex="C" />). Feltet (<InlineLatex latex="E" />) gir spenning (<InlineLatex latex="V" />). Sammen gir de ladning (<InlineLatex latex="Q" />) og energi (<InlineLatex latex="U" />). Parallellkobling er enkel addisjon. Dielektrikum øker både <InlineLatex latex="\varepsilon" /> og <InlineLatex latex="C" /> med faktoren <InlineLatex latex="K" /> — viktig å huske om det er <InlineLatex latex="V" /> eller <InlineLatex latex="Q" /> som er konstant når energien skal regnes.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Konstanter og enheter:</p>
                  <p><InlineLatex latex="\varepsilon_0 = 8{,}854 \times 10^{-12}\;\text{F/m}" /></p>
                  <p>Areal: <InlineLatex latex="A = 1\;\text{cm}^2 = 1\times 10^{-4}\;\text{m}^2" /></p>
                  <p>Avstand: <InlineLatex latex="d = 1\;\text{mm} = 1\times 10^{-3}\;\text{m}" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Kapasitans, ladning og energi</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — platekondensator</p>
                  <p>For to parallelle plater (med stort areal sammenlignet med avstanden) er feltet uniformt og <InlineLatex latex="E = V/d" />. Ladningstettheten på hver plate er <InlineLatex latex="\sigma = Q/A = \varepsilon_0 E" />. Kombinert: <InlineLatex latex="C = Q/V = \varepsilon_0 A/d" />. Energi som er lagret i feltet: <InlineLatex latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}QV = Q^2/(2C)" /> — alle tre uttrykkene er ekvivalente.</p>
                </div>

                <p><strong>Kapasitansen:</strong></p>
                <FormulaBox
                  latex="C = \frac{\varepsilon_0 A}{d} = \frac{8{,}854\times 10^{-12} \cdot 1\times 10^{-4}}{1\times 10^{-3}} = 8{,}854\times 10^{-13}\;\text{F}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;C \approx 0{,}885\;\text{pF}\;}"
                  variant="gold"
                />

                <p><strong>Spenningen og ladningen:</strong></p>
                <p>Med uniformt felt mellom platene:</p>
                <FormulaBox
                  latex="V = E\cdot d = 1{,}0\times 10^{5} \cdot 1\times 10^{-3} = 100\;\text{V}"
                  variant="blue"
                />
                <FormulaBox
                  latex="Q = C V = 8{,}854\times 10^{-13} \cdot 100 = 8{,}854\times 10^{-11}\;\text{C} \approx 88{,}5\;\text{pC}"
                  variant="gold"
                />

                <p><strong>Energien:</strong></p>
                <FormulaBox
                  latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}\cdot 8{,}854\times 10^{-13}\cdot 100^2"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;U \approx 4{,}43\times 10^{-9}\;\text{J} = 4{,}43\;\text{nJ}\;}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">b) Parallellkobling</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — parallell vs. serie</p>
                  <p>I PARALLELL har alle kondensatorer samme spenning (samme to noder). Ladningene fordeler seg etter <InlineLatex latex="Q_i = C_i V" />, og total ladning <InlineLatex latex="Q_\text{tot} = \sum Q_i = (\sum C_i) V" /> ⇒ <InlineLatex latex="C_\text{tot} = \sum C_i" />. I SERIE har alle samme ladning og spenningene adderes: <InlineLatex latex="1/C_\text{tot} = \sum 1/C_i" />. Tenk på parallell som å øke "platearealet" og serie som å øke "avstanden".</p>
                </div>
                <FormulaBox
                  latex="C_\text{tot} = C + C = 2C = 2 \cdot 0{,}885\;\text{pF} \approx 1{,}77\;\text{pF}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">c) Dielektrikum</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Teori — hva gjør et dielektrikum?</p>
                  <p>Et dielektrikum er et isolerende materiale (glass, plast, papir...) som blir polarisert av feltet. Polariseringen lager et indusert motsatt felt som svekker det opprinnelige feltet inne i materialet. Resultat: ved samme ladning blir feltet mindre med faktor <InlineLatex latex="K" />, spenningen blir også mindre med <InlineLatex latex="K" />, og kapasitansen <InlineLatex latex="C = Q/V" /> dermed <em>større</em> med faktor <InlineLatex latex="K" />. Permittiviteten skrives <InlineLatex latex="\varepsilon = K\varepsilon_0" />.</p>
                </div>

                <p><strong>Permittivitet:</strong></p>
                <FormulaBox
                  latex="\varepsilon = K\varepsilon_0 = 4 \cdot 8{,}854\times 10^{-12} = 3{,}54\times 10^{-11}\;\text{F/m}"
                  variant="gold"
                />

                <p><strong>Ny kapasitans:</strong></p>
                <FormulaBox
                  latex="C' = \frac{\varepsilon A}{d} = K \cdot C = 4 \cdot 0{,}885\;\text{pF} \approx 3{,}54\;\text{pF}"
                  variant="gold"
                />

                <p className="font-semibold text-[var(--accent)]">d) Ny energi i kondensatoren</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Viktig: hvilken størrelse er konstant?</p>
                  <p>Kondensatoren ble ladet og er nå frakoblet — det betyr <strong>ladningen <InlineLatex latex="Q" /> er konstant</strong> når dielektrikumet settes inn. Spenningen synker til <InlineLatex latex="V' = Q/C' = V/K" />. Bruk derfor energiformelen i Q-form: <InlineLatex latex="U' = Q^2/(2C')" />. (Hvis kondensatoren derimot var koblet til et batteri som holdt <InlineLatex latex="V" /> konstant, ville energien <em>øke</em> med faktor <InlineLatex latex="K" /> — batteriet leverer ekstra ladning og arbeid.)</p>
                </div>

                <FormulaBox
                  latex="U' = \frac{Q^2}{2C'} = \frac{(8{,}854\times 10^{-11})^2}{2\cdot 3{,}54\times 10^{-12}} = \frac{U}{K} = \frac{4{,}43\;\text{nJ}}{4}"
                  variant="blue"
                />
                <FormulaBox
                  latex="\boxed{\;U' \approx 1{,}11\;\text{nJ}\;}"
                  variant="gold"
                />
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Hvor ble energien av?</p>
                  <p>Energien sank fra 4,43 nJ til 1,11 nJ — altså 3,32 nJ "forsvant". Den ble brukt til å trekke dielektrikumet INN i feltet (feltet polariserer molekylene og trekker materialet inn — du føler dette som et "sug" hvis du holder en plastbit nær). Hvis du gjør det sakte, gjør du negativt arbeid (dvs. systemet gjør positivt arbeid på deg). Energi er bevart — den går ikke tapt, bare overført ut av kondensatoren.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Platekondensator: <InlineLatex latex="C = \varepsilon A/d" />, <InlineLatex latex="V = Ed" />, <InlineLatex latex="Q = CV" /></li>
                    <li>Tre ekvivalente energiformler: <InlineLatex latex="U = \tfrac{1}{2}CV^2 = \tfrac{1}{2}QV = Q^2/(2C)" /></li>
                    <li>Parallell: <InlineLatex latex="C_\text{tot} = \sum C_i" />, &nbsp; Serie: <InlineLatex latex="1/C_\text{tot} = \sum 1/C_i" /></li>
                    <li>Dielektrikum øker <InlineLatex latex="C" /> og <InlineLatex latex="\varepsilon" /> med faktor <InlineLatex latex="K" /></li>
                    <li>Q konstant: <InlineLatex latex="U' = U/K" />. V konstant: <InlineLatex latex="U' = KU" />. Sjekk alltid hva som er konstant!</li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
