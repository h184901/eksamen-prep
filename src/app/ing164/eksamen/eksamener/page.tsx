"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import InlineLatex from "@/components/InlineLatex";
import ExerciseCard from "@/components/ExerciseCard";

/* ─── Tidtaker-komponent ─── */
function ExamTimer() {
  const [duration, setDuration] = useState(180); // minutes
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining === null) return;
    if (remaining <= 0) {
      setRunning(false);
      return;
    }
    const id = setInterval(() => setRemaining((r) => (r !== null ? r - 1 : null)), 1000);
    return () => clearInterval(id);
  }, [running, remaining]);

  const start = useCallback(() => {
    setRemaining(duration * 60);
    setRunning(true);
  }, [duration]);
  const toggle = () => setRunning((r) => !r);
  const reset = () => { setRunning(false); setRemaining(null); };

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const pct = remaining !== null ? (remaining / (duration * 60)) * 100 : 100;
  const urgent = remaining !== null && remaining < 600; // under 10 min

  return (
    <div className={`rounded-xl border-2 p-6 mb-8 transition-colors ${urgent ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-[var(--card-border)] bg-[var(--card)]"}`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-lg">Eksamenstidtaker</h3>
          <p className="text-sm text-[var(--muted)]">Sett tiden og simuler eksamensforhold.</p>
        </div>
        {remaining === null ? (
          <div className="flex items-center gap-3">
            <label className="text-sm text-[var(--muted)]">Tid (min):</label>
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-sm">
              <option value={30}>30 min</option>
              <option value={60}>1 time</option>
              <option value={90}>1.5 timer</option>
              <option value={120}>2 timer</option>
              <option value={180}>3 timer (full eksamen)</option>
            </select>
            <button onClick={start} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-semibold text-sm hover:opacity-90 transition">
              Start
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className={`font-mono text-3xl font-bold tabular-nums ${urgent ? "text-red-600 dark:text-red-400 animate-pulse" : ""}`}>
              {fmt(remaining)}
            </span>
            <button onClick={toggle} className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] text-sm font-medium">
              {running ? "Pause" : "Fortsett"}
            </button>
            <button onClick={reset} className="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium">
              Nullstill
            </button>
          </div>
        )}
      </div>
      {remaining !== null && (
        <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${urgent ? "bg-red-500" : "bg-[var(--accent)]"}`} style={{ width: `${pct}%` }} />
        </div>
      )}
      {remaining !== null && remaining <= 0 && (
        <p className="mt-3 text-center text-red-600 dark:text-red-400 font-bold text-lg">Tiden er ute!</p>
      )}
    </div>
  );
}

/* ─── Filter-knapper ─── */
const exams = [
  { id: "var2023", label: "Vår 2023", desc: "Mekanikk — 3 oppgaver", color: "physics" as const },
  { id: "host2023", label: "Høst 2023", desc: "Mekanikk — 3 oppgaver", color: "physics" as const },
  { id: "var2017", label: "Vår 2017", desc: "E&M — 2 oppgaver", color: "network" as const },
  { id: "host2016", label: "Høst 2016", desc: "E&M — 2 oppgaver", color: "network" as const },
];

const topicFilters = [
  { id: "kinematikk", label: "Kinematikk" },
  { id: "krefter", label: "Krefter & friksjon" },
  { id: "energi", label: "Energi & arbeid" },
  { id: "bevegelsesmengde", label: "Bevegelsesmengde" },
  { id: "rotasjon", label: "Rotasjon" },
  { id: "elektrostatikk", label: "Elektrostatikk" },
  { id: "induksjon", label: "Induksjon" },
];

export default function EksamenPage() {
  const [examFilter, setExamFilter] = useState<string | null>(null);
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const show = (exam: string, topic: string) =>
    examFilter === exam &&
    (topicFilter === null || topicFilter === topic);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <Link href="/ing164/eksamen" className="hover:text-[var(--accent)]">Eksamensøving</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Tidligere eksamener</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Tidligere eksamener — ING164</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle oppgaver fra tidligere eksamener med grundige gjennomganger, formelhint per deloppgave, og lenker til relevant teori. Bruk tidtakeren for å simulere ekte eksamensforhold.
        </p>
      </div>

      {/* Timer */}
      <ExamTimer />

      {/* Strategiboks */}
      <div className="rounded-xl border-2 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 p-5 mb-8">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-2">Generell eksamensstrategi</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--muted)]">
          <li>Les ALLE oppgavene først (5 min). Velg rekkefølge etter hva du kan best.</li>
          <li>Hvert sett har 3 oppgaver med 4 deloppgaver = 12 deloppgaver. Planlegg ca. 15 min per deloppgave.</li>
          <li>Tegn ALLTID frilegemediagram for mekanikkoppgaver.</li>
          <li>Skriv opp gitte verdier, hva du søker, og hvilke formler du bruker FØR du regner.</li>
          <li>Sjekk enheter og størrelsesorden på svaret. Er det rimelig?</li>
          <li>Hvis du sitter fast: gå videre og kom tilbake. Deloppgaver er ofte uavhengige.</li>
        </ul>
      </div>

      {/* Velg eksamen */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {exams.map((ex) => (
          <button key={ex.id} onClick={() => { setExamFilter(examFilter === ex.id ? null : ex.id); setTopicFilter(null); }}
            className={`text-left rounded-xl border-2 p-5 transition-all ${examFilter === ex.id ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-md" : "border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:shadow-sm"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">{ex.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ex.color === "network" ? "bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400" : "bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400"}`}>
                {ex.color === "network" ? "E&M" : "Mekanikk"}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)]">{ex.desc}</p>
          </button>
        ))}
      </div>

      {/* Temafilter — vises bare når en eksamen er valgt */}
      {examFilter && (
        <div className="sticky top-16 z-10 bg-[var(--background)] py-3 border-b border-[var(--card-border)] mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--muted)] py-1.5">Filtrer tema:</span>
            <button onClick={() => setTopicFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${topicFilter === null ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"}`}
            >Alle temaer</button>
            {topicFilters.map((f) => (
              <button key={f.id} onClick={() => setTopicFilter(topicFilter === f.id ? null : f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${topicFilter === f.id ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"}`}
              >{f.label}</button>
            ))}
          </div>
        </div>
      )}

      {/* Velg-prompt */}
      {!examFilter && (
        <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] p-8 text-center">
          <p className="text-lg font-semibold text-[var(--muted)] mb-1">Velg en eksamen over for å se oppgavene</p>
          <p className="text-sm text-[var(--muted)]">Klikk på en av eksamenene for å se oppgaver med løsningsforslag.</p>
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* VÅR 2023 */}
      {/* ════════════════════════════════════════════════ */}

      {examFilter === "var2023" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
            Vår 2023
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">ING174</span>
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">3 timer, 3 oppgaver, alle deloppgaver teller likt. Tillatte hjelpemidler: lærebok, enkel kalkulator.</p>

          {show("var2023", "kinematikk") && (
            <ExerciseCard number={1} title="Basketballkast — prosjektilbevegelse" difficulty="vanskelig" source="Vår 2023, Oppgave 1"
              relevantChapters={[
                { href: "/ing164/kapittel-3/teori", title: "Kap 3 — Prosjektilbevegelse" },
                { href: "/ing164/kapittel-6/teori", title: "Kap 6 — Kinetisk energi" },
                { href: "/ing164/kapittel-8/teori", title: "Kap 8 — Kraftimpuls" },
              ]}
              problem={<div>
                <p className="mb-2">En basketballspiller kaster ballen (m = 600 g) mot kurven med utgangsvinkel <InlineLatex latex="\theta = 50°" />. Avstander: horisontalt 4 m, vertikalt fra 2,1 m til 3,0 m.</p>
                <p className="mb-1">a) Vis at startfarten <InlineLatex latex="v_0 = 7{,}0" /> m/s hvis ballen treffer sentrum av kurven.</p>
                <p className="mb-1">b) Hva er ballens kinetiske energi når den treffer kurven?</p>
                <p className="mb-1">c) Hva er ballens maksimale høyde over bakken?</p>
                <p>d) Ballen treffer plata med horisontal fart 5,0 m/s og spretter tilbake med 4,0 m/s. Finn kraftimpuls og gjennomsnittlig kraft (kontakttid 0,15 s).</p>
              </div>}
              hints={[
                { label: "Hint a", content: "Sett opp x = v₀cos50°·t og y = v₀sin50°·t − ½gt². Eliminer t. Sett inn x=4, y=0,9." },
                { label: "Hint d", content: "J = Δp = m(v₂ − v₁). Husk fortegn: retningene er motsatte!" },
              ]}
              formulaHints={[
                { subQuestion: "a) startfart", formulas: <div><p><InlineLatex latex="x = v_0 \cos\theta \cdot t" />, <InlineLatex latex="y = v_0 \sin\theta \cdot t - \tfrac{1}{2}gt^2" /></p><p>Eliminer t og løs for <InlineLatex latex="v_0" /></p></div> },
                { subQuestion: "b) kinetisk energi", formulas: <p>Energibevaring: <InlineLatex latex="E_K = \tfrac{1}{2}mv_0^2 + mg(y_0 - y)" /></p> },
                { subQuestion: "c) maks høyde", formulas: <p>Ved topp: <InlineLatex latex="v_y = 0" />, bruk <InlineLatex latex="v_y = v_{0y} - gt" /> og <InlineLatex latex="y = v_{0y}t - \tfrac{1}{2}gt^2" /></p> },
                { subQuestion: "d) kraftimpuls", formulas: <p><InlineLatex latex="J = \Delta p = m(v_2 - v_1)" />, <InlineLatex latex="\bar{F} = J / \Delta t" /></p> },
              ]}
              solution={<div className="space-y-3 text-sm">
                <p className="font-semibold">a) Vis v₀ = 7,0 m/s:</p>
                <p><InlineLatex latex="x = v_0\cos 50° \cdot t \implies t = \frac{x}{v_0\cos 50°}" /></p>
                <p><InlineLatex latex="y = v_0\sin 50°\cdot t - \tfrac{1}{2}gt^2" />. Sett inn <InlineLatex latex="x = 4" /> m, <InlineLatex latex="y = 0{,}9" /> m:</p>
                <p><InlineLatex latex="y = x\tan 50° - \frac{gx^2}{2v_0^2\cos^2 50°}" /></p>
                <p><InlineLatex latex="v_0 = \sqrt{\frac{-gx^2}{2\cos^2 50°(y - x\tan 50°)}} = 7{,}0 \text{ m/s}" /></p>
                <p className="font-semibold mt-2">b) Kinetisk energi:</p>
                <p>Energibevaring: <InlineLatex latex="E_K = \tfrac{1}{2}mv_0^2 + mg(y_0 - y) = \tfrac{1}{2}(0{,}6)(7{,}0)^2 + 0{,}6(9{,}81)(0 - 0{,}9) = 14{,}7 - 5{,}3 = 9{,}4 \text{ J}" /></p>
                <p className="font-semibold mt-2">c) Maks høyde:</p>
                <p>Ved maks høyde: <InlineLatex latex="v_y = 0 \implies t = \frac{v_0\sin 50°}{g} = 0{,}547 \text{ s}" /></p>
                <p><InlineLatex latex="y_\text{max} = v_{0y}t - \tfrac{1}{2}gt^2 = 1{,}47 \text{ m over utgangsposisjon}" /></p>
                <p>Over bakken: <InlineLatex latex="1{,}47 + 2{,}1 = 3{,}6 \text{ m}" /></p>
                <p className="font-semibold mt-2">d) Kraftimpuls:</p>
                <p><InlineLatex latex="J = m(v_x' - v_{0x}) = 0{,}6(-4{,}0 - 5{,}0) = -5{,}4 \text{ N·s}" /></p>
                <p><InlineLatex latex="\bar{F} = \frac{J}{\Delta t} = \frac{-5{,}4}{0{,}15} = -36 \text{ N}" /> (retning: mot venstre)</p>
              </div>}
            />
          )}

          {show("var2023", "krefter") && (
            <ExerciseCard number={2} title="Kranbil og container — krefter og arbeid" difficulty="vanskelig" source="Vår 2023, Oppgave 2"
              relevantChapters={[
                { href: "/ing164/kapittel-5/teori", title: "Kap 5 — Friksjon og skråplan" },
                { href: "/ing164/kapittel-6/teori", title: "Kap 6 — Arbeid" },
              ]}
              problem={<div>
                <p className="mb-2">En kranbil sleeper en container (1000 kg) med konstant fart. <InlineLatex latex="\mu_k = 0{,}65" />.</p>
                <p className="mb-1">a) Vinkel vaier-bakke = 25°. Finn snordrag og arbeid over 15 m.</p>
                <p className="mb-1">b) Finn arbeid av kranbil og friksjonskraft over 15 m.</p>
                <p className="mb-1">c) Hvilken vinkel gir minst snordrag?</p>
                <p>d) Vaieren ryker ved v = 2,5 m/s. Finn akselerasjon og bremselengde.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "Konstant fart → ΣF = 0. Sett opp x- og y-komponent. N = mg − Fsin25°. Tegn frilegmediagram!" },
                { label: "Hint c", content: "F = μmg/(cosα + μsinα). Deriver og sett lik null: α = arctan(μ)" },
              ]}
              formulaHints={[
                { subQuestion: "a) snordrag", formulas: <div><p><InlineLatex latex="\sum F_x = 0: \; F\cos\alpha - \mu_k N = 0" /></p><p><InlineLatex latex="\sum F_y = 0: \; N + F\sin\alpha - mg = 0" /></p><p><InlineLatex latex="W = F \cdot s \cdot \cos\alpha" /></p></div> },
                { subQuestion: "c) optimal vinkel", formulas: <p>Deriver <InlineLatex latex="F(\alpha) = \frac{\mu mg}{\cos\alpha + \mu\sin\alpha}" /> og sett <InlineLatex latex="F'(\alpha) = 0" /></p> },
                { subQuestion: "d) etter ryking", formulas: <p><InlineLatex latex="a = -\mu_k g" />, <InlineLatex latex="v^2 = v_0^2 + 2as" /></p> },
              ]}
              solution={<div className="space-y-3 text-sm">
                <p className="font-semibold">a) Snordrag:</p>
                <p><InlineLatex latex="\sum F_x = 0: F\cos 25° - \mu_k N = 0" />,  <InlineLatex latex="\sum F_y = 0: N + F\sin 25° - mg = 0" /></p>
                <p><InlineLatex latex="N = mg - F\sin 25°" /></p>
                <p><InlineLatex latex="F(\cos 25° + \mu\sin 25°) = \mu mg \implies F = \frac{0{,}65 \times 1000 \times 9{,}81}{\cos 25° + 0{,}65\sin 25°} = 5{,}4 \text{ kN}" /></p>
                <p className="font-semibold mt-2">b) Arbeid:</p>
                <p><InlineLatex latex="W_F = F \cdot s \cdot \cos 25° = 5400 \times 15 \times \cos 25° = 73 \text{ kJ}" /></p>
                <p><InlineLatex latex="R = \mu(mg - F\sin 25°) = 4{,}9 \text{ kN}" />,  <InlineLatex latex="W_R = -R \cdot s = -73 \text{ kJ}" /></p>
                <p className="font-semibold mt-2">c) Optimal vinkel:</p>
                <p><InlineLatex latex="F = \frac{\mu mg}{\cos\alpha + \mu\sin\alpha}" />. Minimum F når nevner er maks: <InlineLatex latex="\frac{d}{d\alpha}(\cos\alpha+\mu\sin\alpha)=0" /></p>
                <p><InlineLatex latex="\alpha = \arctan\mu = \arctan(0{,}65) = 33°" /></p>
                <p className="font-semibold mt-2">d) Etter ryking:</p>
                <p><InlineLatex latex="a = -\mu g = -0{,}65 \times 9{,}81 = -6{,}4 \text{ m/s}^2" /></p>
                <p><InlineLatex latex="s = \frac{v^2 - v_0^2}{2a} = \frac{0 - (2{,}5)^2}{2(-6{,}4)} = 0{,}49 \text{ m}" /></p>
              </div>}
            />
          )}

          {show("var2023", "rotasjon") && (
            <ExerciseCard number={3} title="Svingdør — treghetsmoment og angulært moment" difficulty="vanskelig" source="Vår 2023, Oppgave 3"
              relevantChapters={[
                { href: "/ing164/kapittel-9/teori", title: "Kap 9 — Treghetsmoment" },
                { href: "/ing164/kapittel-10/teori", title: "Kap 10 — Dreiemoment og spinn" },
              ]}
              problem={<div>
                <p className="mb-2">Svingdør med 4 rektangulære paneler, hvert 60 kg og 1,2 m bredt. Kraftpunkt 0,8 m fra akse.</p>
                <p className="mb-1">a) Beregn samlet treghetsmoment om rotasjonsaksen.</p>
                <p className="mb-1">b) Kraft 90 N i 15° fra normalen i 3,0 s fra ro. Finn vinkelfart.</p>
                <p className="mb-1">c) Finn kinetisk energi og angulært moment.</p>
                <p>d) Kule (10 g, 300 m/s) skytes i samme punkt/retning og fester seg. Finn ny vinkelfart.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "Hvert panel = stav om enden: I = ⅓Ma². Fire paneler gir I_tot = 4 × ⅓Ma²" },
                { label: "Hint d", content: "L bevart: mv₀r sin75° = (I + mr²)ω" },
              ]}
              formulaHints={[
                { subQuestion: "a) treghetsmoment", formulas: <p>Stav om enden: <InlineLatex latex="I = \tfrac{1}{3}Ma^2" />. Totalt: <InlineLatex latex="I_\text{tot} = 4I_1" /></p> },
                { subQuestion: "b) vinkelfart", formulas: <div><p><InlineLatex latex="\tau = F \cdot r \cdot \sin\theta" />, <InlineLatex latex="\alpha = \tau / I" /></p><p><InlineLatex latex="\omega = \omega_0 + \alpha t" /></p></div> },
                { subQuestion: "c) energi og spinn", formulas: <p><InlineLatex latex="E_K = \tfrac{1}{2}I\omega^2" />, <InlineLatex latex="L = I\omega" /></p> },
                { subQuestion: "d) kule fester seg", formulas: <p>Bevaring av spinn: <InlineLatex latex="L_\text{kule} + L_\text{dør} = (I_\text{dør} + m_\text{kule}r^2)\omega'" /></p> },
              ]}
              solution={<div className="space-y-3 text-sm">
                <p className="font-semibold">a) Treghetsmoment:</p>
                <p>Hvert panel er en stav om enden: <InlineLatex latex="I_1 = \frac{1}{3}Ma^2 = \frac{1}{3}(60)(1{,}2)^2 = 28{,}8 \text{ kg·m}^2" /></p>
                <p><InlineLatex latex="I_\text{tot} = 4 \times 28{,}8 = 115 \text{ kg·m}^2" /></p>
                <p className="font-semibold mt-2">b) Vinkelfart:</p>
                <p><InlineLatex latex="\tau = F \cdot r \cdot \sin 75° = 90 \times 0{,}8 \times \sin 75° = 69{,}5 \text{ N·m}" /></p>
                <p><InlineLatex latex="\alpha = \frac{\tau}{I} = \frac{69{,}5}{115} = 0{,}604 \text{ rad/s}^2" /></p>
                <p><InlineLatex latex="\omega = \omega_0 + \alpha t = 0 + 0{,}604 \times 3{,}0 = 1{,}81 \text{ rad/s}" /></p>
                <p className="font-semibold mt-2">c) Energi og angulært moment:</p>
                <p><InlineLatex latex="E_K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(115)(1{,}81)^2 = 189 \text{ J}" /></p>
                <p><InlineLatex latex="L = I\omega = 115 \times 1{,}81 = 209 \text{ kg·m}^2\text{/s}" /></p>
                <p className="font-semibold mt-2">d) Kule fester seg (L bevart):</p>
                <p><InlineLatex latex="L_\text{før} = mv_0 r\sin 75° = 0{,}010 \times 300 \times 0{,}8 \times \sin 75° = 2{,}32 \text{ kg·m}^2\text{/s}" /></p>
                <p><InlineLatex latex="L_\text{etter} = (I + mr^2)\omega" /></p>
                <p><InlineLatex latex="\omega = \frac{2{,}32}{115 + 0{,}010(0{,}8)^2} \approx 0{,}020 \text{ rad/s}" /></p>
              </div>}
            />
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* HØST 2023 */}
      {/* ════════════════════════════════════════════════ */}

      {examFilter === "host2023" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
            Høst 2023
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-physics-100 text-physics-700 dark:bg-physics-900/30 dark:text-physics-400">ING174</span>
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">3 timer, 3 oppgaver, alle deloppgaver teller likt.</p>

          {show("host2023", "kinematikk") && (
            <ExerciseCard number={1} title="Prosjektil fra klippe — skrått kast" difficulty="vanskelig" source="Høst 2023, Oppgave 1"
              relevantChapters={[
                { href: "/ing164/kapittel-3/teori", title: "Kap 3 — Prosjektilbevegelse" },
                { href: "/ing164/kapittel-8/teori", title: "Kap 8 — Bevegelsesmengde" },
              ]}
              problem={<div>
                <p className="mb-2">Prosjektil skytes 115 m over bakken med <InlineLatex latex="v_0 = 65{,}0" /> m/s og 35° med horisontalen.</p>
                <p className="mb-1">a) Finn tiden til P treffer bakken og horisontal avstand X.</p>
                <p className="mb-1">b) Finn farten ved treff og vinkel med bakken.</p>
                <p className="mb-1">c) Hva er maks høyde over bakken?</p>
                <p>d) Prosjektilet sprenges i to like deler i høyeste punkt. Ene delen faller loddrett. Hvor lander den andre?</p>
              </div>}
              hints={[
                { label: "Hint a", content: "y = y₀ + v₀y·t − ½gt² = 0. Andregradslikning med y₀ = 115 m." },
                { label: "Hint d", content: "Bevaring av bevegelsesmengde i x: m·v₀x = (m/2)·0 + (m/2)·vx → vx = 2v₀x" },
              ]}
              formulaHints={[
                { subQuestion: "a) tid og avstand", formulas: <div><p><InlineLatex latex="y = y_0 + v_{0y}t - \tfrac{1}{2}gt^2 = 0" /> (andregradslikning)</p><p><InlineLatex latex="X = v_{0x} \cdot t" /></p></div> },
                { subQuestion: "b) fart ved treff", formulas: <p><InlineLatex latex="v = \sqrt{v_x^2 + v_y^2}" />, <InlineLatex latex="\theta = \arctan(|v_y|/v_x)" /></p> },
                { subQuestion: "d) sprengning", formulas: <p>Bevaring: <InlineLatex latex="m \cdot v_{0x} = \tfrac{m}{2} \cdot 0 + \tfrac{m}{2} \cdot v_x'" /></p> },
              ]}
              solution={<div className="space-y-3 text-sm">
                <p className="font-semibold">a) Tid og avstand:</p>
                <p><InlineLatex latex="v_{0x} = 65\cos 35° = 53{,}24 \text{ m/s}, \quad v_{0y} = 65\sin 35° = 37{,}28 \text{ m/s}" /></p>
                <p><InlineLatex latex="0 = 115 + 37{,}28t - 4{,}905t^2 \implies t = 9{,}96 \text{ s}" /></p>
                <p><InlineLatex latex="X = v_{0x} \cdot t = 53{,}24 \times 9{,}96 = 530 \text{ m}" /></p>
                <p className="font-semibold mt-2">b) Fart ved treff:</p>
                <p><InlineLatex latex="v_x = 53{,}24 \text{ m/s}, \quad v_y = 37{,}28 - 9{,}81(9{,}96) = -60{,}43 \text{ m/s}" /></p>
                <p><InlineLatex latex="v = \sqrt{53{,}24^2 + 60{,}43^2} = 80{,}5 \text{ m/s}" /></p>
                <p><InlineLatex latex="\theta = \arctan\frac{|v_y|}{v_x} = 48{,}6°" /> under horisontalen</p>
                <p className="font-semibold mt-2">c) Maks høyde:</p>
                <p><InlineLatex latex="t_\text{topp} = \frac{v_{0y}}{g} = 3{,}8 \text{ s}" /></p>
                <p><InlineLatex latex="h_\text{max} = 115 + 37{,}28(3{,}8) - \tfrac{1}{2}(9{,}81)(3{,}8)^2 = 186 \text{ m}" /></p>
                <p className="font-semibold mt-2">d) Sprengning i høyeste punkt:</p>
                <p>I toppen: <InlineLatex latex="v_y = 0" />, kun <InlineLatex latex="v_x = v_{0x}" />. Bevaring av <InlineLatex latex="p" />:</p>
                <p><InlineLatex latex="m \cdot v_{0x} = \frac{m}{2}\cdot 0 + \frac{m}{2}\cdot v_x' \implies v_x' = 2v_{0x} = 106{,}5 \text{ m/s}" /></p>
                <p>Del 2 starter i <InlineLatex latex="h = 186 \text{ m}" /> med <InlineLatex latex="v_y = 0" />, <InlineLatex latex="v_x = 106{,}5" /> m/s</p>
                <p>Faller: <InlineLatex latex="t = \sqrt{\frac{2 \times 186}{9{,}81}} = 6{,}16 \text{ s}" /></p>
                <p><InlineLatex latex="X = x_0 + v_x t = 202 + 106{,}5 \times 6{,}16 = 858 \text{ m}" /> fra klippen</p>
              </div>}
            />
          )}

          {show("host2023", "bevegelsesmengde") && (
            <ExerciseCard number={2} title="Kollisjoner og bremsing" difficulty="vanskelig" source="Høst 2023, Oppgave 2"
              relevantChapters={[
                { href: "/ing164/kapittel-8/teori", title: "Kap 8 — Kollisjoner" },
                { href: "/ing164/kapittel-5/teori", title: "Kap 5 — Friksjon" },
              ]}
              problem={<div>
                <p className="mb-1">a) Forklar elastisk støt vs. fullkomment uelastisk støt og bevaringslover.</p>
                <p className="mb-2">b) Bil (1500 kg) stanser fra 72 km/h etter 50 m. Finn friksjonskraft og bremsetid.</p>
                <p className="mb-2">Bil A (1500 kg) og B (900 kg) kolliderer frontalt. Etter: henger sammen med v = 27 km/h i A sin retning.</p>
                <p className="mb-1">c) Begge hevder 60 km/h. Stemmer det med bevaring av bevegelsesmengde?</p>
                <p>d) Bil B kjørte 60 km/h. Finn farten til bil A.</p>
              </div>}
              hints={[
                { label: "Hint b", content: "Bruk v² = v₀² + 2as for å finne a. Deretter F = ma og t = (v−v₀)/a." },
                { label: "Hint c", content: "Regn ut p_før med begge = 60 km/h (motstatt retning) og sammenlign med p_etter." },
              ]}
              formulaHints={[
                { subQuestion: "b) bremsing", formulas: <div><p><InlineLatex latex="v^2 = v_0^2 + 2as" />, <InlineLatex latex="F = ma" /></p><p>Husk: km/h til m/s = del på 3,6</p></div> },
                { subQuestion: "c) og d) kollisjon", formulas: <p>Bevaring: <InlineLatex latex="m_A v_A - m_B v_B = (m_A + m_B)v_f" /></p> },
              ]}
              solution={<div className="space-y-3 text-sm">
                <p className="font-semibold">a) Definisjoner:</p>
                <p><strong>Elastisk støt:</strong> Kinetisk energi er bevart. Bevegelsesmengde bevart.</p>
                <p><strong>Fullkomment uelastisk:</strong> Legemene henger sammen etter støtet. Bevegelsesmengde bevart, K ikke bevart.</p>
                <p className="font-semibold mt-2">b) Bremsing:</p>
                <p><InlineLatex latex="v_0 = 72 \text{ km/h} = 20 \text{ m/s}" /></p>
                <p><InlineLatex latex="a = \frac{v^2-v_0^2}{2s} = \frac{0-400}{100} = -4{,}0 \text{ m/s}^2" /></p>
                <p><InlineLatex latex="f = ma = 1500 \times 4{,}0 = 6{,}0 \text{ kN}" /></p>
                <p><InlineLatex latex="t = \frac{2s}{v_0} = \frac{100}{20} = 5{,}0 \text{ s}" /></p>
                <p className="font-semibold mt-2">c) Sjekk 60 km/h:</p>
                <p><InlineLatex latex="p_\text{etter} = (1500+900) \times 27/3{,}6 = 18\,000 \text{ kg·m/s}" /></p>
                <p>Hvis begge = 60 km/h: <InlineLatex latex="p_\text{før} = 1500(60/3{,}6) - 900(60/3{,}6) = 10\,000 \text{ kg·m/s} \neq 18\,000" /></p>
                <p className="text-red-500">Nei, begge kan ikke ha kjørt 60 km/h — strider mot bevaring av bevegelsesmengde.</p>
                <p className="font-semibold mt-2">d) Fart til A:</p>
                <p><InlineLatex latex="m_A v_A - m_B v_B = (m_A+m_B)v_f" /></p>
                <p><InlineLatex latex="v_A = \frac{(m_A+m_B)v_f + m_B v_B}{m_A} = \frac{2400 \times 7{,}5 + 900 \times 16{,}67}{1500} = 22{,}0 \text{ m/s} = 79{,}2 \text{ km/h}" /></p>
              </div>}
            />
          )}

          {show("host2023", "rotasjon") && (
            <ExerciseCard number={3} title="Bowlingkule — glidning til rulling" difficulty="vanskelig" source="Høst 2023, Oppgave 3"
              relevantChapters={[
                { href: "/ing164/kapittel-9/teori", title: "Kap 9 — Rotasjon" },
                { href: "/ing164/kapittel-10/teori", title: "Kap 10 — Dynamikk" },
              ]}
              problem={<div>
                <p className="mb-2">Bowlingkule: m = 5,2 kg, R = 10,8 cm, <InlineLatex latex="v_0 = 10{,}2" /> m/s, <InlineLatex latex="\omega_0 = 0" />, <InlineLatex latex="\mu_k = 0{,}25" />.</p>
                <p className="mb-1">a) Finn akselerasjon og vinkelakselerasjon under glidning.</p>
                <p className="mb-1">b) Tid til ren rulling, avstand, og fart.</p>
                <p className="mb-1">c) Kinetisk energi og arbeid av friksjon.</p>
                <p>d) Kulen ruller utfor 2,0 m kant. Finn treffpunkt og bevegelsesmengde.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "a = −μg. For α: τ = f·R = Iα der I = ⅖mR²" },
                { label: "Hint b", content: "Betingelse: v = Rω. Sett v₀+at = R(αt) og løs for t." },
              ]}
              formulaHints={[
                { subQuestion: "a) akselerasjoner", formulas: <p><InlineLatex latex="a = -\mu_k g" />, <InlineLatex latex="\alpha = 5\mu_k g/(2R)" /></p> },
                { subQuestion: "b) ren rulling", formulas: <p>Betingelse: <InlineLatex latex="v = R\omega" /></p> },
                { subQuestion: "c) energi", formulas: <p><InlineLatex latex="E_K = \tfrac{7}{10}mv^2" /> (rullende kule)</p> },
              ]}
              solution={<div className="space-y-3 text-sm">
                <p className="font-semibold">a) Akselerasjoner:</p>
                <p><InlineLatex latex="a = -\mu g = -0{,}25 \times 9{,}81 = -2{,}45 \text{ m/s}^2" /></p>
                <p><InlineLatex latex="I = \tfrac{2}{5}mR^2" />,  <InlineLatex latex="\alpha = \frac{\mu mg R}{\frac{2}{5}mR^2} = \frac{5\mu g}{2R} = \frac{5(0{,}25)(9{,}81)}{2(0{,}108)} = 56{,}8 \text{ rad/s}^2" /></p>
                <p className="font-semibold mt-2">b) Tid til rulling:</p>
                <p><InlineLatex latex="v = v_0 + at, \quad \omega = \alpha t, \quad v = R\omega" /></p>
                <p><InlineLatex latex="v_0 + at = R\alpha t \implies t = \frac{v_0}{R\alpha - a} = \frac{10{,}2}{0{,}108(56{,}8)+2{,}45} = 1{,}19 \text{ s}" /></p>
                <p><InlineLatex latex="s = v_0 t + \tfrac{1}{2}at^2 = 10{,}4 \text{ m}" /></p>
                <p><InlineLatex latex="v = v_0 + at = 10{,}2 - 2{,}45(1{,}19) = 7{,}3 \text{ m/s}" /></p>
                <p className="font-semibold mt-2">c) Energi:</p>
                <p><InlineLatex latex="E_K = \tfrac{7}{10}mv^2 = \tfrac{7}{10}(5{,}2)(7{,}3)^2 = 194 \text{ J}" /></p>
                <p><InlineLatex latex="W_\text{friksjon} = \Delta K = 194 - \tfrac{1}{2}(5{,}2)(10{,}2)^2 = 194 - 270 = -76{,}5 \text{ J}" /></p>
                <p className="font-semibold mt-2">d) Fritt fall fra kant:</p>
                <p><InlineLatex latex="t = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2(2{,}0)}{9{,}81}} = 0{,}639 \text{ s}" /></p>
                <p><InlineLatex latex="x = v \cdot t = 7{,}3 \times 0{,}639 = 4{,}66 \text{ m}" /></p>
                <p><InlineLatex latex="v_y = gt = 6{,}27 \text{ m/s}, \quad v_\text{tot} = \sqrt{7{,}3^2+6{,}27^2} = 9{,}62 \text{ m/s}" /></p>
                <p><InlineLatex latex="p = mv = 5{,}2 \times 9{,}62 = 50 \text{ kg·m/s}" /></p>
              </div>}
            />
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* VÅR 2017 (ELE100) */}
      {/* ════════════════════════════════════════════════ */}

      {examFilter === "var2017" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
            Vår 2017
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">ELE100</span>
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">E&M-oppgaver fra ELE100 Elektrofag 1. Relevante for kap 21–29.</p>

          {show("var2017", "elektrostatikk") && (
            <ExerciseCard number={3} title="Punktladninger — arbeid og potensial" difficulty="middels" source="Vår 2017, Oppgave 3"
              relevantChapters={[
                { href: "/ing164/kapittel-21/teori", title: "Kap 21 — Coulombs lov" },
                { href: "/ing164/kapittel-23/teori", title: "Kap 23 — Elektrisk potensial" },
              ]}
              problem={<div>
                <p className="mb-2">Ladning <InlineLatex latex="q_A = 2{,}50 \;\mu\text{C}" /> i x = 2,00 cm.</p>
                <p className="mb-1">a) Arbeid for å bringe <InlineLatex latex="q_B = q_A" /> fra uendelig til x = 4,00 cm.</p>
                <p>b) Elektrisk potensial i origo fra begge ladninger.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "W = ΔU = kq₁q₂/r der r = avstand mellom ladningene = 2 cm" },
              ]}
              formulaHints={[
                { subQuestion: "a) arbeid", formulas: <p><InlineLatex latex="U = k\frac{q_1 q_2}{r}" /></p> },
                { subQuestion: "b) potensial", formulas: <p><InlineLatex latex="V = k\sum \frac{q_i}{r_i}" /> (skalar sum)</p> },
              ]}
              solution={<div className="space-y-2 text-sm">
                <p className="font-semibold">a)</p>
                <p><InlineLatex latex="U = k\frac{q_Aq_B}{r} = 8{,}99 \times 10^9 \times \frac{(2{,}50 \times 10^{-6})^2}{0{,}02} = 2{,}80 \text{ J}" /></p>
                <p className="font-semibold mt-2">b)</p>
                <p><InlineLatex latex="V_0 = k\left(\frac{q_A}{r_1} + \frac{q_B}{r_2}\right) = 8{,}99 \times 10^9\left(\frac{2{,}5 \times 10^{-6}}{0{,}02} + \frac{2{,}5 \times 10^{-6}}{0{,}04}\right) = 1{,}3 \times 10^6 \text{ V}" /></p>
              </div>}
            />
          )}

          {show("var2017", "induksjon") && (
            <ExerciseCard number={4} title="Fallende leder i magnetfelt" difficulty="middels" source="Vår 2017, Oppgave 4"
              relevantChapters={[
                { href: "/ing164/kapittel-27/teori", title: "Kap 27 — Magnetisk kraft" },
                { href: "/ing164/kapittel-29/teori", title: "Kap 29 — Faradays lov" },
              ]}
              problem={<div>
                <p className="mb-2">Strømkrets i B = 0,20 T (normalt inn i arket). Metallstav L (0,10 m) faller langs skinner. Ved konstant fart: I = 0,40 A.</p>
                <p className="mb-1">a) Finn magnetkraft på L og stavens masse.</p>
                <p>b) Forklar hva som skjer med bryter S lukket.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "Ved konstant fart: F_magnet = mg. F = BIL." },
              ]}
              formulaHints={[
                { subQuestion: "a) kraft og masse", formulas: <p><InlineLatex latex="F = BIL" />, ved konstant fart: <InlineLatex latex="F = mg" /></p> },
                { subQuestion: "b) Lenz' lov", formulas: <p>Lenz: indusert strøm motvirker fluks-endring</p> },
              ]}
              solution={<div className="space-y-2 text-sm">
                <p className="font-semibold">a)</p>
                <p><InlineLatex latex="F_m = BIL = 0{,}20 \times 0{,}40 \times 0{,}10 = 8{,}0 \text{ mN}" /></p>
                <p>Ved konstant fart: <InlineLatex latex="F_m = mg \implies m = \frac{F_m}{g} = 8{,}15 \times 10^{-4} \text{ kg}" /></p>
                <p className="font-semibold mt-2">b)</p>
                <p>Lenz&apos; lov: fluks inn i arket minker → indusert strøm danner B inn i arket → strøm med klokka. Magnetkraft på L er oppover.</p>
                <p>Med S lukket: strøm deles i to sløyfer. Netto strøm i L reduseres → mindre bremsekraft.</p>
              </div>}
            />
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* HØST 2016 (ELE100) */}
      {/* ════════════════════════════════════════════════ */}

      {examFilter === "host2016" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-3">
            Høst 2016
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-network-100 text-network-700 dark:bg-network-900/30 dark:text-network-400">ELE100</span>
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">E&M-oppgaver fra ELE100 Elektrofag 1.</p>

          {show("host2016", "elektrostatikk") && (
            <ExerciseCard number={4} title="Tre punktladninger — potensial og E-felt" difficulty="middels" source="Høst 2016, Oppgave 4"
              relevantChapters={[
                { href: "/ing164/kapittel-21/teori", title: "Kap 21 — E-felt" },
                { href: "/ing164/kapittel-23/teori", title: "Kap 23 — Potensial" },
              ]}
              problem={<div>
                <p className="mb-2"><InlineLatex latex="q_1 = 2\;\mu\text{C}" /> i (−3, 0), <InlineLatex latex="q_2 = -3\;\mu\text{C}" /> i (2, 0), <InlineLatex latex="q_3 = 1{,}5\;\mu\text{C}" /> i (0, 4). Koordinater i meter.</p>
                <p className="mb-1">a) Finn elektrisk potensial i origo.</p>
                <p>b) Finn E-feltets styrke og retning i origo.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "V = k(q₁/r₁ + q₂/r₂ + q₃/r₃). Husk fortegn på ladningene!" },
                { label: "Hint b", content: "Beregn E_x og E_y separat fra hver ladning. E er vektor, V er skalar." },
              ]}
              formulaHints={[
                { subQuestion: "a) potensial", formulas: <p><InlineLatex latex="V = k\sum q_i/r_i" /> (skalar — fortegn teller!)</p> },
                { subQuestion: "b) E-felt", formulas: <p><InlineLatex latex="E = kq/r^2" /> (vektor — regn x og y separat)</p> },
              ]}
              solution={<div className="space-y-2 text-sm">
                <p className="font-semibold">a) Potensial:</p>
                <p><InlineLatex latex="r_1 = 3 \text{ m}, r_2 = 2 \text{ m}, r_3 = 4 \text{ m}" /></p>
                <p><InlineLatex latex="V = k\left(\frac{2}{3} + \frac{-3}{2} + \frac{1{,}5}{4}\right)\times 10^{-6} = -4{,}1 \text{ kV}" /></p>
                <p className="font-semibold mt-2">b) E-felt:</p>
                <p><InlineLatex latex="E_x = k\frac{|q_1|}{r_1^2} + k\frac{|q_2|}{r_2^2} = 8{,}99 \times 10^9\left(\frac{2 \times 10^{-6}}{9} + \frac{3 \times 10^{-6}}{4}\right) = 8{,}74 \text{ kV/m}" /></p>
                <p>(Begge peker i +x-retning: q₁ positiv skyver fra venstre, q₂ negativ trekker mot høyre)</p>
                <p><InlineLatex latex="E_y = -k\frac{|q_3|}{r_3^2} = -0{,}843 \text{ kV/m}" /> (q₃ positiv → felt peker vekk, dvs. ned i −y)</p>
                <p><InlineLatex latex="E = \sqrt{E_x^2 + E_y^2} = 8{,}78 \text{ kV/m}" /></p>
                <p><InlineLatex latex="\theta = \arctan\frac{|E_y|}{E_x} = 5{,}5°" /> under x-aksen</p>
              </div>}
            />
          )}

          {show("host2016", "induksjon") && (
            <ExerciseCard number={5} title="Faradays lov — spole i magnetfelt" difficulty="lett" source="Høst 2016, Oppgave 5"
              relevantChapters={[
                { href: "/ing164/kapittel-29/teori", title: "Kap 29 — Faradays lov" },
              ]}
              problem={<div>
                <p className="mb-2">Uniformt B = 0,25 T vinkelrett på sirkulær spole (53 viklinger, r = 15 cm). B reduseres til null på 0,12 s.</p>
                <p className="mb-1">a) Finn gjennomsnittlig indusert EMF.</p>
                <p>b) Tegn og forklar retning på indusert strøm.</p>
              </div>}
              hints={[
                { label: "Hint a", content: "|ε| = N|ΔΦ/Δt| = N·A·|ΔB/Δt|" },
              ]}
              formulaHints={[
                { subQuestion: "a) EMF", formulas: <p><InlineLatex latex="|\mathcal{E}| = N\frac{|\Delta\Phi|}{\Delta t} = N \pi r^2 \frac{|\Delta B|}{\Delta t}" /></p> },
                { subQuestion: "b) retning", formulas: <p>Lenz: strømmen lager B som motvirker fluks-endringen</p> },
              ]}
              solution={<div className="space-y-2 text-sm">
                <p className="font-semibold">a)</p>
                <p><InlineLatex latex="|\mathcal{E}| = N\frac{|\Delta\Phi|}{\Delta t} = N \cdot \pi r^2 \cdot \frac{|\Delta B|}{\Delta t} = 53 \times \pi(0{,}15)^2 \times \frac{0{,}25}{0{,}12} = 7{,}8 \text{ V}" /></p>
                <p className="font-semibold mt-2">b)</p>
                <p>B inn i arket minker → Lenz&apos; lov: strømmen lager B inn i arket → strøm med klokka (sett fra forsiden).</p>
              </div>}
            />
          )}
        </div>
      )}
    </div>
  );
}
