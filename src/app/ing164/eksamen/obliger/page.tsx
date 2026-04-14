"use client";

import { useState } from "react";
import Link from "next/link";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

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
      <div className="flex flex-wrap gap-3 mb-8">
        <button onClick={() => setSelected(null)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selected === null ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)] hover:border-[var(--accent)]"}`}>
          Alle obliger
        </button>
        {[
          { id: "oblig1", label: "Oblig 1" },
          { id: "oblig2", label: "Oblig 2" },
          { id: "oblig3", label: "Oblig 3" },
        ].map((ob) => (
          <button key={ob.id} onClick={() => setSelected(selected === ob.id ? null : ob.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selected === ob.id ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)] hover:border-[var(--accent)]"}`}>
            {ob.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* OBLIG 1 — Kinematikk, prosjektilbevegelse, Newtons lover */}
      {/* ════════════════════════════════════════════════ */}
      {(!selected || selected === "oblig1") && (
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
                  <p>Vi har posisjonen <InlineLatex latex="x(t)" /> som et polynom i <InlineLatex latex="t" />. Derivasjon gir fart og akselerasjon. Vendepunktet finner vi der farten er null, og startpunktet er der <InlineLatex latex="x = 0" />.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt:</p>
                  <p><InlineLatex latex="x(t) = C_1 t^2 + C_2 t" />, &nbsp; <InlineLatex latex="C_1 = -1{,}0 \text{ m/s}^2" />, &nbsp; <InlineLatex latex="C_2 = 10 \text{ m/s}" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Fart og akselerasjon</p>
                <p>Farten er den tidsderiverte av posisjonen:</p>
                <p className="pl-4"><InlineLatex latex="v(t) = \frac{dx}{dt} = 2C_1 t + C_2 = -2{,}0t + 10 \;\; \text{[m/s]}" /></p>
                <p>Akselerasjonen er den tidsderiverte av farten:</p>
                <p className="pl-4"><InlineLatex latex="a(t) = \frac{dv}{dt} = 2C_1 = -2{,}0 \;\; \text{m/s}^2" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Akselerasjonen er <em>konstant</em> og negativ (rettet nedover bakken). Kjelken bremser jevnt opp — den har konstant retardasjon på 2,0 m/s². Ved <InlineLatex latex="t = 0" /> har den fart 10 m/s oppover bakken.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Maksimal posisjon</p>
                <p>Kjelken snur når farten er null (den stopper et øyeblikk):</p>
                <p className="pl-4"><InlineLatex latex="v(t) = 0 \;\Rightarrow\; -2{,}0t + 10 = 0 \;\Rightarrow\; t = 5{,}0 \text{ s}" /></p>
                <p>Sett inn i posisjonsfunksjonen:</p>
                <p className="pl-4"><InlineLatex latex="x_\text{max} = -1{,}0 \cdot 5{,}0^2 + 10 \cdot 5{,}0 = -25 + 50 = 25 \text{ m}" /></p>
                <p className="font-medium">Kjelken kommer 25 m oppover bakken.</p>

                <p className="font-semibold text-[var(--accent)]">c) Tilbake ved startpunktet</p>
                <p>Sett <InlineLatex latex="x(t) = 0" /> og faktoriser:</p>
                <p className="pl-4"><InlineLatex latex="-1{,}0t^2 + 10t = 0 \;\Rightarrow\; t(-1{,}0t + 10) = 0" /></p>
                <p>To løsninger: <InlineLatex latex="t = 0" /> (start) og <InlineLatex latex="t = 10 \text{ s}" /> (tilbake ved start).</p>
                <p>Farten ved <InlineLatex latex="t = 10" /> s:</p>
                <p className="pl-4"><InlineLatex latex="v(10) = -2{,}0 \cdot 10 + 10 = -10 \text{ m/s}" /></p>
                <p className="font-medium">Kjelken er tilbake etter 10 s med fart 10 m/s ned bakken (negativt fortegn = nedover).</p>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Legg merke til</p>
                  <p>Farten er like stor som startfarten (10 m/s) men i motsatt retning. Med konstant akselerasjon bruker kjelken like lang tid opp (0–5 s) som ned (5–10 s). Bevegelsen er symmetrisk rundt vendepunktet.</p>
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
                  <p>Prosjektilbevegelse: splitt i uavhengig horisontal (konstant fart) og vertikal (fri-fall med <InlineLatex latex="a = -g" />) bevegelse. Vi velger origo i kastepunktet med y-aksen oppover.</p>
                </div>

                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt og komponenter:</p>
                  <p><InlineLatex latex="v_0 = 25 \text{ m/s}, \;\; \alpha_0 = 70°, \;\; y_\text{bakke} = -30 \text{ m}" /></p>
                  <p className="mt-1"><InlineLatex latex="v_{0x} = 25\cos 70° = 8{,}55 \text{ m/s}" /></p>
                  <p><InlineLatex latex="v_{0y} = 25\sin 70° = 23{,}49 \text{ m/s}" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Høyeste punkt</p>
                <p>Ved toppunktet er den vertikale fartkomponenten null:</p>
                <p className="pl-4"><InlineLatex latex="v_y = v_{0y} - gt = 0 \;\Rightarrow\; t_\text{topp} = \frac{23{,}49}{9{,}81} = 2{,}39 \text{ s}" /></p>
                <p>Høyden over startpunktet:</p>
                <p className="pl-4"><InlineLatex latex="y_\text{max} = 23{,}49 \cdot 2{,}39 - \tfrac{1}{2}(9{,}81)(2{,}39)^2 = 56{,}1 - 28{,}0 = 28{,}1 \text{ m}" /></p>
                <p className="font-medium">Steinen når 28,1 m over startpunktet (dvs. 58,1 m over bakken).</p>

                <p className="font-semibold text-[var(--accent)]">b) Tid og sted for landing</p>
                <p>Bakken er ved <InlineLatex latex="y = -30" /> m. Setter inn i vertikal bevegelsesligning:</p>
                <p className="pl-4"><InlineLatex latex="23{,}49\,t - 4{,}905\,t^2 = -30" /></p>
                <p className="pl-4"><InlineLatex latex="4{,}905\,t^2 - 23{,}49\,t - 30 = 0" /></p>
                <p>Andregradsformelen gir:</p>
                <p className="pl-4"><InlineLatex latex="t = \frac{23{,}49 \pm \sqrt{23{,}49^2 + 4 \cdot 4{,}905 \cdot 30}}{2 \cdot 4{,}905} = \frac{23{,}49 \pm 33{,}77}{9{,}81}" /></p>
                <p>Positiv løsning: <InlineLatex latex="t = 5{,}84" /> s. Horisontal avstand:</p>
                <p className="pl-4"><InlineLatex latex="x = v_{0x} \cdot t = 8{,}55 \cdot 5{,}84 = 49{,}9 \text{ m}" /></p>
                <p className="font-medium">Steinen treffer bakken etter 5,84 s, og 49,9 m fra stupets fot.</p>

                <p className="font-semibold text-[var(--accent)]">c) Fart og retning ved landing</p>
                <p>Horisontal fart er uendret: <InlineLatex latex="v_x = 8{,}55" /> m/s</p>
                <p>Vertikal fart ved <InlineLatex latex="t = 5{,}84" /> s:</p>
                <p className="pl-4"><InlineLatex latex="v_y = 23{,}49 - 9{,}81 \cdot 5{,}84 = -33{,}80 \text{ m/s}" /></p>
                <p>Total fart og retning:</p>
                <p className="pl-4"><InlineLatex latex="v = \sqrt{8{,}55^2 + 33{,}80^2} = 34{,}9 \text{ m/s}" /></p>
                <p className="pl-4"><InlineLatex latex="\tan\alpha = \frac{-33{,}80}{8{,}55} = -3{,}95 \;\Rightarrow\; \alpha = -75{,}8°" /></p>
                <p className="font-medium">Fart: 34,9 m/s, retning: 75,8° under horisontalen.</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Steinen treffer med mye større fart (34,9 m/s) enn startfarten (25 m/s) — den har falt 30 m ekstra. Den beveger seg nesten rett nedover (75,8°) fordi den vertikale farten dominerer.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Alternativ vinkel</p>
                <p>Vi vil treffe samme punkt (<InlineLatex latex="x = 49{,}9" /> m, <InlineLatex latex="y = -30" /> m) med <InlineLatex latex="v_0 = 25" /> m/s og en annen vinkel <InlineLatex latex="\alpha" />.</p>
                <p>Fra baneligningen (etter å eliminere <InlineLatex latex="t" />) og gange med <InlineLatex latex="\cos^2\alpha" />:</p>
                <p className="pl-4"><InlineLatex latex="49{,}9\sin\alpha\cos\alpha + 30\cos^2\alpha - 19{,}54 = 0" /></p>
                <p>Bruker dobbeltvinkelidentiteter:</p>
                <p className="pl-4"><InlineLatex latex="24{,}95\sin 2\alpha + 15\cos 2\alpha = 4{,}54" /></p>
                <p>Skriver om til <InlineLatex latex="R\sin(2\alpha + \varphi) = 4{,}54" /> der <InlineLatex latex="R = 29{,}11" /> og <InlineLatex latex="\varphi = 31°" />:</p>
                <p className="pl-4"><InlineLatex latex="\sin(2\alpha + 31°) = 0{,}156" /></p>
                <p className="pl-4"><InlineLatex latex="2\alpha + 31° = 9° \;\;\text{eller}\;\; 171°" /></p>
                <p className="pl-4"><InlineLatex latex="\alpha = -11° \;\;\text{eller}\;\; 70°" /></p>
                <p className="font-medium"><InlineLatex latex="\alpha = 70°" /> er originalen. Alternativ: <InlineLatex latex="\alpha = -11°" /> (11° under horisontalen).</p>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Vanlig feil</p>
                  <p>Mange glemmer at man kan kaste <em>nedover</em> fra et stup. Med en lav vinkel under horisontalen treffer steinen samme punkt — kortere flytid, men større horisontal fart.</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Fra høyde finnes det ofte <em>to</em> vinkler som gir samme treffpunkt</li>
                    <li>Dobbeltvinkel-identiteter løser opp kompliserte trig-ligninger</li>
                    <li>Negativ vinkel = kast under horisontalen</li>
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
                <p className="font-semibold text-[var(--accent)]">a) Sleggekaster — omløpsfrekvens</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt: <InlineLatex latex="r = 1{,}5 \text{ m}" />, &nbsp; <InlineLatex latex="a_s = g = 9{,}81 \text{ m/s}^2" /></p>
                </div>
                <p>Sentripetalakselerasjon lik <InlineLatex latex="g" />:</p>
                <p className="pl-4"><InlineLatex latex="\frac{v^2}{r} = g \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 1{,}5} = 3{,}84 \text{ m/s}" /></p>
                <p>Omløpstid og frekvens:</p>
                <p className="pl-4"><InlineLatex latex="T = \frac{2\pi r}{v} = \frac{2\pi \cdot 1{,}5}{3{,}84} = 2{,}46 \text{ s}" /></p>
                <p className="pl-4"><InlineLatex latex="f = \frac{1}{T} = \frac{1}{2{,}46} = 0{,}407 \text{ omløp/s}" /></p>
                <p className="font-medium">Slegga må gjøre ca. 0,41 omløp per sekund (ett omløp hvert 2,5 s).</p>

                <p className="font-semibold text-[var(--accent)]">b) Sirkelbevegelse med varierende fart</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt: <InlineLatex latex="r = 2{,}0 \text{ m}" />, &nbsp; <InlineLatex latex="v(t) = 5{,}0 - 0{,}10t" /></p>
                </div>
                <p>Farten ved <InlineLatex latex="t = 5{,}0" /> s:</p>
                <p className="pl-4"><InlineLatex latex="v(5{,}0) = 5{,}0 - 0{,}10 \cdot 5{,}0 = 4{,}5 \text{ m/s}" /></p>
                <p><strong>Normalkomponent</strong> (sentripetalakselerasjon, peker mot sentrum):</p>
                <p className="pl-4"><InlineLatex latex="a_\perp = \frac{v^2}{r} = \frac{4{,}5^2}{2{,}0} = 10{,}1 \text{ m/s}^2" /></p>
                <p><strong>Parallellkomponent</strong> (tangentiell, langs banen):</p>
                <p className="pl-4"><InlineLatex latex="a_\parallel = \frac{dv}{dt} = B = -0{,}10 \text{ m/s}^2" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Normalkomponenten (10,1 m/s²) er 100 ganger større enn parallellkomponenten (0,10 m/s²). Akselerasjonen peker nesten utelukkende mot sentrum — legemet beveger seg nesten i uniform sirkelbevegelse, med svakt avtagende fart.</p>
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
                <p>Newtons 2. lov i y-retning (ingen vertikal akselerasjon):</p>
                <p className="pl-4"><InlineLatex latex="\sum F_y = 0: \;\; N - mg = 0 \;\Rightarrow\; N = mg = 1000 \cdot 9{,}81 = 9810 \text{ N}" /></p>
                <p className="font-medium">Normalkraften er 9810 N. Snordraget kan ikke bestemmes uten å vite akselerasjonen.</p>

                <p className="font-semibold text-[var(--accent)]">d) Maksimal akselerasjon</p>
                <p>Eneste horisontale kraft er snordraget. Newtons 2. lov i x-retning:</p>
                <p className="pl-4"><InlineLatex latex="\sum F_x = ma: \;\; S = ma" /></p>
                <p>Maks snordrag gir maks akselerasjon:</p>
                <p className="pl-4"><InlineLatex latex="a_\text{max} = \frac{S_\text{max}}{m} = \frac{3500}{1000} = 3{,}5 \text{ m/s}^2" /></p>
                <p className="font-medium">Maksimal akselerasjon er 3,5 m/s².</p>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li><InlineLatex latex="a_\perp = v^2/r" /> (mot sentrum), <InlineLatex latex="a_\parallel = dv/dt" /> (langs banen)</li>
                    <li>FBD: tegn ALLE krefter, velg koordinatsystem, sett opp Newtons 2. lov per akse</li>
                    <li>Newtons 2. lov: <InlineLatex latex="a = F/m" /> gir sammenheng mellom kraft og akselerasjon</li>
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
      {(!selected || selected === "oblig2") && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold">Oblig 2</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">Kap 6–10</span>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">Sentripetalkraft, arbeid, energi, bevegelsesmengde og kollisjoner.</p>

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
                  <p>Sirkelbevegelse med Newtons 2. lov: summen av krefter mot sentrum = <InlineLatex latex="mv^2/r" />. Nøkkelen er å velge positiv retning <em>mot sentrum</em> i hvert punkt.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Kraft fra setet</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt: <InlineLatex latex="r = 500 \text{ m}" />, <InlineLatex latex="m = 80{,}0 \text{ kg}" />, <InlineLatex latex="v = 100 \text{ m/s}" /></p>
                </div>
                <p>Sentripetalakselerasjon: <InlineLatex latex="a_s = v^2/r = 100^2/500 = 20{,}0 \text{ m/s}^2" /></p>

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

                <p><strong>Øverst:</strong> Begge krefter peker mot sentrum (nedover):</p>
                <p className="pl-4"><InlineLatex latex="N = m(a_s - g) = 80{,}0(20{,}0 - 9{,}81) = 815 \text{ N}" /></p>
                <p><strong>Nederst:</strong> N peker mot sentrum, mg peker bort:</p>
                <p className="pl-4"><InlineLatex latex="N = m(a_s + g) = 80{,}0(20{,}0 + 9{,}81) = 2380 \text{ N} \approx 2{,}38 \text{ kN}" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Nederst trykker setet med nesten 3g (3 ganger tyngden). Øverst er kraften mye lavere — piloten føler seg nesten vektløs. Forskjellen skyldes at tyngdekraften hjelper/motvirker sentripetalkraften.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Mister kontakt øverst</p>
                <p>Mister kontakt betyr <InlineLatex latex="N = 0" />. Da er tyngden alene sentripetalkraften:</p>
                <p className="pl-4"><InlineLatex latex="mg = m\frac{v^2}{r} \;\Rightarrow\; v = \sqrt{gr} = \sqrt{9{,}81 \cdot 500} = 70{,}0 \text{ m/s}" /></p>
                <p className="font-medium">Ved 70,0 m/s mister piloten akkurat kontakten øverst (vektløshet).</p>

                <p className="font-semibold text-[var(--accent)]">c) Svingens radius</p>
                <p>Omregning: <InlineLatex latex="70{,}0 \text{ km/h} = 19{,}44 \text{ m/s}" />. Kulen i snor med vinkel <InlineLatex latex="\alpha = 10°" />:</p>
                <p>Vertikal likevekt: <InlineLatex latex="S\cos\alpha = mg" /> → <InlineLatex latex="S = mg/\cos\alpha" /></p>
                <p>Horisontal (sentripetalkraft): <InlineLatex latex="S\sin\alpha = mv^2/r" /></p>
                <p>Kombinerer: <InlineLatex latex="g\tan\alpha = v^2/r" /> → </p>
                <p className="pl-4"><InlineLatex latex="r = \frac{v^2}{g\tan\alpha} = \frac{19{,}44^2}{9{,}81 \cdot \tan 10°} = 219 \text{ m}" /></p>

                <p className="font-semibold text-[var(--accent)]">d) Maks fart i svingen</p>
                <p>Friksjonen gir sentripetalkraft: <InlineLatex latex="\mu mg = mv^2/r" /></p>
                <p className="pl-4"><InlineLatex latex="v = \sqrt{\mu g r} = \sqrt{0{,}80 \cdot 9{,}81 \cdot 219} = 41{,}5 \text{ m/s} = 149 \text{ km/h}" /></p>
                <p className="font-medium">Maks fart er 149 km/h.</p>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Sirkelbevegelse: velg alltid positiv retning <em>mot sentrum</em></li>
                    <li>Vektløshet = normalkraften er null (ikke at tyngdekraften forsvinner!)</li>
                    <li>Pendel i bil fungerer som akselerometer: <InlineLatex latex="a = g\tan\alpha" /></li>
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
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt:</p>
                  <p><InlineLatex latex="s = 250 \text{ m}" />, <InlineLatex latex="\theta = 25°" />, <InlineLatex latex="v_\text{tau} = 10 \text{ km/h} = 2{,}78 \text{ m/s}" />, <InlineLatex latex="m = 80{,}0 \text{ kg}" /></p>
                  <p>Høyde: <InlineLatex latex="h = s\sin 25° = 250 \cdot 0{,}4226 = 105{,}7 \text{ m}" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Arbeid fra tauet</p>
                <p>Konstant fart → likevekt langs bakken: <InlineLatex latex="T = mg\sin 25°" /></p>
                <p className="pl-4"><InlineLatex latex="W = T \cdot s = mg\sin 25° \cdot s = 80{,}0 \cdot 9{,}81 \cdot \sin 25° \cdot 250 = 82{,}9 \text{ kJ}" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Merk</p>
                  <p>Arbeidet er lik endringen i potensiell energi: <InlineLatex latex="W = mgh" />. Det er fordi kinetisk energi ikke endres (konstant fart) og det ikke er friksjon.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Motoreffekt for 60 skiløpere</p>
                <p>Effekt for én skiløper: <InlineLatex latex="P_1 = T \cdot v" /></p>
                <p>For 60 skiløpere:</p>
                <p className="pl-4"><InlineLatex latex="P_{60} = 60 \cdot mg\sin 25° \cdot v = 60 \cdot 80{,}0 \cdot 9{,}81 \cdot \sin 25° \cdot 2{,}78 = 55{,}3 \text{ kW}" /></p>
                <p className="font-medium">Motoren må yte 55,3 kW (ca. 75 hk).</p>

                <p className="font-semibold text-[var(--accent)]">c) Fart i bunnen (friksjonsfritt)</p>
                <p>Energibevaring — all potensiell energi blir kinetisk:</p>
                <p className="pl-4"><InlineLatex latex="mgh = \tfrac{1}{2}mv^2 \;\Rightarrow\; v = \sqrt{2gh} = \sqrt{2 \cdot 9{,}81 \cdot 105{,}7} = 45{,}5 \text{ m/s} = 164 \text{ km/h}" /></p>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Vanlig feil</p>
                  <p>Noen bruker <InlineLatex latex="s" /> i stedet for <InlineLatex latex="h" /> i energiligningen. Husk: det er <em>høydeforskjellen</em> som teller, ikke skrålengden. <InlineLatex latex="h = s\sin\theta" /></p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Friksjonsarbeid</p>
                <p>Med friksjon: <InlineLatex latex="v = 50 \text{ km/h} = 13{,}9 \text{ m/s}" /> (mye lavere enn 164 km/h)</p>
                <p>Energibevaring med friksjon:</p>
                <p className="pl-4"><InlineLatex latex="mgh + W_R = \tfrac{1}{2}mv^2" /></p>
                <p className="pl-4"><InlineLatex latex="W_R = \tfrac{1}{2}mv^2 - mgh = \tfrac{1}{2}(80)(13{,}9)^2 - 80 \cdot 9{,}81 \cdot 105{,}7" /></p>
                <p className="pl-4"><InlineLatex latex="W_R = 7730 - 82\,900 = -75{,}2 \text{ kJ}" /></p>
                <p className="font-medium">Friksjon og luftmotstand har gjort −75,2 kJ arbeid (negativt = tar bort energi).</p>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Arbeid = kraft × vei (langs kraftretningen)</li>
                    <li>Effekt = kraft × fart, skalerer lineært med antall objekter</li>
                    <li>Energibevaring: <InlineLatex latex="E_\text{pot} \to E_\text{kin}" /> (uten friksjon)</li>
                    <li>Friksjon gir alltid negativt arbeid (tar bort mekanisk energi)</li>
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

                <p className="font-semibold text-[var(--accent)]">a) Hastighet etter uelastisk støt</p>
                <p>Kulen fester seg → fullstendig uelastisk støt. Bevaring av bevegelsesmengde:</p>
                <p className="pl-4"><InlineLatex latex="mv_0 = (m + M)v \;\Rightarrow\; v = \frac{mv_0}{m + M}" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Viktig</p>
                  <p>I et uelastisk støt kan vi IKKE bruke energibevaring — kinetisk energi går tapt til varme og deformasjon. Men bevegelsesmengde er ALLTID bevart i kollisjoner.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">b) Maksimalt vinkelutslag</p>
                <p>Etter støtet pendler systemet opp. Energibevaring (KE → PE):</p>
                <p className="pl-4"><InlineLatex latex="\tfrac{1}{2}(m+M)v^2 = (m+M)gL(1 - \cos\varphi)" /></p>
                <p>Setter inn <InlineLatex latex="v = mv_0/(m+M)" />:</p>
                <p className="pl-4"><InlineLatex latex="\frac{m^2v_0^2}{2(m+M)^2} = gL(1 - \cos\varphi)" /></p>
                <p className="pl-4"><InlineLatex latex="\cos\varphi = 1 - \frac{m^2 v_0^2}{2gL(m+M)^2}" /></p>
                <p className="pl-4"><InlineLatex latex="\varphi_\text{max} = \arccos\!\left(1 - \frac{m^2 v_0^2}{2gL(m+M)^2}\right) \;\;\checkmark" /></p>

                <p className="font-semibold text-[var(--accent)]">c) Elastisk støt</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt: <InlineLatex latex="m = 0{,}0050 \text{ kg}" />, <InlineLatex latex="M = 10 \text{ kg}" />, <InlineLatex latex="v_0 = 100 \text{ m/s}" /></p>
                </div>
                <p>For fullstendig elastisk støt (bevarer BÅDE bevegelsesmengde og kinetisk energi):</p>
                <p className="pl-4"><InlineLatex latex="v_\text{kule} = \frac{m - M}{m + M}v_0 = \frac{0{,}005 - 10}{0{,}005 + 10} \cdot 100 = -99{,}9 \text{ m/s}" /></p>
                <p className="pl-4"><InlineLatex latex="v_\text{kloss} = \frac{2m}{m + M}v_0 = \frac{2 \cdot 0{,}005}{10{,}005} \cdot 100 = 0{,}10 \text{ m/s}" /></p>
                <p className="font-medium">Kulen spretter tilbake med nesten uendret fart (99,9 m/s). Klossen beveger seg sakte fremover (0,10 m/s).</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Når <InlineLatex latex="m \ll M" />, spretter den lette kulen tilbake med nesten samme fart, mens den tunge klossen knapt beveger seg. Tenk på en ball som spretter mot en vegg.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">d) Gjennomsnittlig kraft</p>
                <p>Impuls-momentteoremet for klossen:</p>
                <p className="pl-4"><InlineLatex latex="F_\text{snitt} = \frac{\Delta p_\text{kloss}}{\Delta t} = \frac{M \cdot v_\text{kloss}}{\Delta t} = \frac{10 \cdot 0{,}10}{0{,}0050} = 200 \text{ N}" /></p>
                <p className="font-medium">Gjennomsnittlig kraft: 200 N.</p>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Bevegelsesmengde er bevart i ALLE kollisjoner</li>
                    <li>Kinetisk energi er bare bevart i elastiske støt</li>
                    <li>Ballistisk pendel: støt → bevegelsesmengde; pendel → energibevaring</li>
                    <li><InlineLatex latex="m \ll M" /> elastisk: kule spretter tilbake, kloss knapt påvirket</li>
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
      {(!selected || selected === "oblig3") && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold">Oblig 3</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">Kap 21–29</span>
          </div>
          <p className="text-sm text-[var(--muted)] mb-6">Rotasjon (spinn og dreiemoment), elektriske felt, kapasitans og Coulombs lov.</p>

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
              { label: "Hint c", content: <p>Friksjonsarbeid = endring i kinetisk rotasjonsenergi: <InlineLatex latex="W = \Delta KE_\text{rot}" /></p> },
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
                  <p>Dette er den rotasjonelle ekvivalenten til en uelastisk kollisjon. Spinn (angulært moment) er bevart fordi det ikke er ytre dreiemoment om aksen. Men rotasjonsenergi går tapt til friksjon.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">a) Treghetsmoment og spinn</p>
                <p>For kompakt (solid) sylinder: <InlineLatex latex="I = \tfrac{1}{2}MR^2" /></p>
                <p className="pl-4"><InlineLatex latex="I_1 = \tfrac{1}{2}(10)(1{,}0)^2 = 5{,}0 \text{ kg·m}^2" /></p>
                <p className="pl-4"><InlineLatex latex="I_2 = \tfrac{1}{2}(5)(1{,}0)^2 = 2{,}5 \text{ kg·m}^2" /></p>
                <p>Spinn til den øvre:</p>
                <p className="pl-4"><InlineLatex latex="L_1 = I_1\omega_1 = 5{,}0 \times 5{,}0 = 25 \text{ kg·m}^2\text{/s}" /></p>

                <p className="font-semibold text-[var(--accent)]">b) Felles vinkelhastighet</p>
                <p>Bevaring av angulært moment (ingen ytre dreiemoment om aksen):</p>
                <p className="pl-4"><InlineLatex latex="I_1\omega_1 = (I_1 + I_2)\omega_f" /></p>
                <p className="pl-4"><InlineLatex latex="\omega_f = \frac{25}{5{,}0 + 2{,}5} = \frac{25}{7{,}5} = 3{,}33 \text{ rad/s}" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Analogi</p>
                  <p>Dette er rotasjonsversjonen av et uelastisk støt: <InlineLatex latex="L" /> er bevart (som <InlineLatex latex="p" /> i lineært støt), men rotasjonsenergi går tapt til varme fra friksjonen mellom skivene.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Friksjonsarbeid</p>
                <p>Endring i rotasjonsenergi:</p>
                <p className="pl-4"><InlineLatex latex="W = \tfrac{1}{2}(I_1+I_2)\omega_f^2 - \tfrac{1}{2}I_1\omega_1^2" /></p>
                <p className="pl-4"><InlineLatex latex="= \tfrac{1}{2}(7{,}5)(3{,}33)^2 - \tfrac{1}{2}(5{,}0)(5{,}0)^2 = 41{,}7 - 62{,}5 = -20{,}8 \text{ J}" /></p>
                <p className="font-medium">Friksjonen har fjernet 20,8 J mekanisk energi (omgjort til varme).</p>

                <p className="font-semibold text-[var(--accent)]">d) Dreiemoment på den nedre sylinderen</p>
                <p>Den nedre sylinderen går fra <InlineLatex latex="\omega = 0" /> til <InlineLatex latex="\omega_f = 3{,}33" /> rad/s på 5 s:</p>
                <p className="pl-4"><InlineLatex latex="\tau = \frac{\Delta L_2}{\Delta t} = \frac{I_2 \omega_f - 0}{\Delta t} = \frac{2{,}5 \times 3{,}33}{5{,}0} = 1{,}67 \text{ N·m}" /></p>
                <p className="font-medium">Gjennomsnittlig dreiemoment: 1,67 N·m.</p>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Angulært moment (<InlineLatex latex="L" />) er bevart når ytre dreiemoment er null</li>
                    <li>Rotasjonsenergi er IKKE bevart når friksjon virker</li>
                    <li>Perfekt analogi: lineær bevegelsesmengde ↔ angulært moment</li>
                    <li>Angulær impuls: <InlineLatex latex="\tau \cdot \Delta t = \Delta L" /></li>
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
                <p className="font-semibold text-[var(--accent)]">a) Uniformt elektrisk felt</p>
                <p>Et <em>uniformt</em> elektrisk felt har samme styrke og retning i alle punkter. Mellom to store, plane, parallelle plater er feltet tilnærmet uniformt.</p>
                <p className="pl-4"><InlineLatex latex="E = \frac{V}{d} = \frac{500}{0{,}050} = 10\,000 \text{ V/m} = 10{,}0 \text{ kV/m}" /></p>
                <p>Feltet peker fra positiv til negativ plate.</p>

                <p className="font-semibold text-[var(--accent)]">b) Elektronets fart og tid</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Konstanter:</p>
                  <p><InlineLatex latex="e = 1{,}602 \times 10^{-19} \text{ C}" />, &nbsp; <InlineLatex latex="m_e = 9{,}109 \times 10^{-31} \text{ kg}" /></p>
                </div>
                <p>Energibevaring — arbeid fra feltet blir kinetisk energi:</p>
                <p className="pl-4"><InlineLatex latex="eV = \tfrac{1}{2}m_e v^2 \;\Rightarrow\; v = \sqrt{\frac{2eV}{m_e}} = \sqrt{\frac{2 \cdot 1{,}602 \times 10^{-19} \cdot 500}{9{,}109 \times 10^{-31}}}" /></p>
                <p className="pl-4"><InlineLatex latex="v = \sqrt{1{,}759 \times 10^{14}} = 1{,}33 \times 10^{7} \text{ m/s}" /></p>
                <p>Akselerasjon og tid:</p>
                <p className="pl-4"><InlineLatex latex="a = \frac{eE}{m_e} = \frac{1{,}602 \times 10^{-19} \cdot 10\,000}{9{,}109 \times 10^{-31}} = 1{,}76 \times 10^{15} \text{ m/s}^2" /></p>
                <p className="pl-4"><InlineLatex latex="t = \sqrt{\frac{2d}{a}} = \sqrt{\frac{2 \cdot 0{,}050}{1{,}76 \times 10^{15}}} = 7{,}54 \times 10^{-9} \text{ s} \approx 7{,}5 \text{ ns}" /></p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Legg merke til</p>
                  <p>Farten (<InlineLatex latex="1{,}33 \times 10^7" /> m/s) er ca. 4,4 % av lyshastigheten. I dette tilfellet er den ikke-relativistiske beregningen akseptabel, men for høyere spenninger må vi bruke relativistisk mekanikk.</p>
                </div>

                <p className="font-semibold text-[var(--accent)]">c) Kapasitans og ladning</p>
                <p className="pl-4"><InlineLatex latex="C = \frac{\varepsilon_0 A}{d} = \frac{\varepsilon_0 \pi r^2}{d} = \frac{8{,}854 \times 10^{-12} \cdot \pi \cdot 0{,}25^2}{0{,}050} = 34{,}8 \text{ pF}" /></p>
                <p className="pl-4"><InlineLatex latex="Q = CV = 34{,}8 \times 10^{-12} \cdot 500 = 17{,}4 \text{ nC}" /></p>
                <p className="font-medium">Kapasitans: 34,8 pF. Ladning på hver plate: 17,4 nC (positiv på den ene, negativ på den andre).</p>

                <p className="font-semibold text-[var(--accent)]">d) Coulombs lov — elektron og proton</p>
                <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--card-border)]">
                  <p className="font-semibold mb-1">Gitt: <InlineLatex latex="r = 0{,}529 \times 10^{-10} \text{ m}" /> (Bohr-radius), <InlineLatex latex="k = 8{,}988 \times 10^9" /> N·m²/C²</p>
                </div>
                <p className="pl-4"><InlineLatex latex="F = \frac{ke^2}{r^2} = \frac{8{,}988 \times 10^9 \cdot (1{,}602 \times 10^{-19})^2}{(0{,}529 \times 10^{-10})^2} = 8{,}24 \times 10^{-8} \text{ N}" /></p>
                <p>Akselerasjon av elektronet:</p>
                <p className="pl-4"><InlineLatex latex="a = \frac{F}{m_e} = \frac{8{,}24 \times 10^{-8}}{9{,}109 \times 10^{-31}} = 9{,}05 \times 10^{22} \text{ m/s}^2" /></p>
                <p className="font-medium">Kraften er <InlineLatex latex="8{,}24 \times 10^{-8}" /> N og akselerasjonen er enorm: <InlineLatex latex="9{,}05 \times 10^{22}" /> m/s².</p>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Fysisk tolkning</p>
                  <p>Avstanden 0,529 Å er Bohr-radiusen — gjennomsnittlig avstand mellom elektron og proton i et hydrogenatom. Til tross for den enorme akselerasjonen, forblir elektronet i bane fordi det beveger seg i en sirkel (sentripetalakselerasjon = Coulomb-akselerasjon).</p>
                </div>

                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">Hva lærte vi?</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Uniformt felt mellom parallelle plater: <InlineLatex latex="E = V/d" /></li>
                    <li>Energibevaring: <InlineLatex latex="qV = \tfrac{1}{2}mv^2" /> for akselerert ladning</li>
                    <li>Platekondensator: <InlineLatex latex="C = \varepsilon_0 A/d" />, &nbsp; <InlineLatex latex="Q = CV" /></li>
                    <li>Coulombs lov: <InlineLatex latex="F = kq_1 q_2/r^2" /></li>
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
