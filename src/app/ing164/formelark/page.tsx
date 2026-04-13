"use client";

import { useState } from "react";
import Link from "next/link";
import FormulaBox from "@/components/FormulaBox";
import InlineLatex from "@/components/InlineLatex";

const themes = [
  { id: "kinematikk", label: "Kinematikk", chaps: "Kap 2–3" },
  { id: "krefter", label: "Krefter", chaps: "Kap 4–5" },
  { id: "energi", label: "Energi", chaps: "Kap 6–7" },
  { id: "bevegelsesmengde", label: "Bevegelsesmengde", chaps: "Kap 8" },
  { id: "rotasjon", label: "Rotasjon", chaps: "Kap 9–10" },
  { id: "elektrostatikk", label: "Elektrostatikk", chaps: "Kap 21, 23, 24" },
  { id: "magnetisme", label: "Magnetisme", chaps: "Kap 27–28" },
  { id: "induksjon", label: "Induksjon", chaps: "Kap 29" },
];

export default function FormelarkPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const show = (id: string) => !filter || filter === id;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Formelark</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Komplett formelark — ING164</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle formler organisert etter tema. Bruk filteret for å fokusere på ett tema om gangen.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8 sticky top-16 z-10 bg-[var(--background)] py-3 border-b border-[var(--card-border)]">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!filter ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"}`}
        >
          Alle
        </button>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(filter === t.id ? null : t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === t.id ? "bg-[var(--accent)] text-white" : "bg-[var(--card)] text-[var(--muted)] border border-[var(--card-border)]"}`}
          >
            {t.label} <span className="opacity-60">({t.chaps})</span>
          </button>
        ))}
      </div>

      {/* ═══════ 1. KINEMATIKK ═══════ */}
      {show("kinematikk") && (
        <section className="mb-10" id="kinematikk">
          <h2 className="text-2xl font-bold mb-1">Kinematikk</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 2 (rettlinjet) og 3 (2D/3D bevegelse)</p>

          <FormulaBox variant="gold" title="Rettlinjet bevegelse — konstant akselerasjon"
            latex="\\begin{aligned} v &= v_0 + at \\\\ x &= x_0 + v_0 t + \\tfrac{1}{2}at^2 \\\\ v^2 &= v_0^2 + 2a(x-x_0) \\\\ x - x_0 &= \\tfrac{1}{2}(v_0+v)t \\end{aligned}"
          />
          <FormulaBox variant="gold" title="Fritt fall (a = −g)"
            latex="v_y = v_{0y} - gt \\qquad y = y_0 + v_{0y}t - \\tfrac{1}{2}gt^2 \\qquad v_y^2 = v_{0y}^2 - 2g(y-y_0)"
          />
          <FormulaBox variant="gold" title="Skrått kast (prosjektilbevegelse)"
            latex="\\begin{aligned} v_{0x} &= v_0\\cos\\theta &\\quad v_{0y} &= v_0\\sin\\theta \\\\ x &= v_{0x}\\,t &\\quad y &= v_{0y}\\,t - \\tfrac{1}{2}gt^2 \\\\ v_x &= v_{0x} = \\text{konst.} &\\quad v_y &= v_{0y} - gt \\end{aligned}"
            description="Horisontal: ingen akselerasjon. Vertikal: fritt fall."
          />
          <FormulaBox variant="blue" title="Nyttige resultater for skrått kast"
            latex="\\text{Maks høyde: } h = \\frac{v_0^2\\sin^2\\theta}{2g} \\qquad \\text{Rekkevidde: } R = \\frac{v_0^2\\sin 2\\theta}{g}"
            description="Gjelder kun for kast fra og til samme høyde."
          />
          <FormulaBox variant="blue" title="Sirkelbevegelse"
            latex="a_\\text{rad} = \\frac{v^2}{r} \\qquad T = \\frac{2\\pi r}{v} \\qquad v = \\frac{2\\pi r}{T}"
            description="a_rad peker alltid mot sentrum."
          />
        </section>
      )}

      {/* ═══════ 2. KREFTER ═══════ */}
      {show("krefter") && (
        <section className="mb-10" id="krefter">
          <h2 className="text-2xl font-bold mb-1">Newtons lover og krefter</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 4–5</p>

          <FormulaBox variant="gold" title="Newtons lover"
            latex="\\begin{aligned} \\text{1. lov:}&\\quad \\sum\\vec{F} = 0 \\implies \\vec{v} = \\text{konst.} \\\\ \\text{2. lov:}&\\quad \\sum\\vec{F} = m\\vec{a} \\\\ \\text{3. lov:}&\\quad \\vec{F}_{A\\to B} = -\\vec{F}_{B\\to A} \\end{aligned}"
          />
          <FormulaBox variant="gold" title="Friksjon"
            latex="f_s \\leq \\mu_s N \\qquad f_k = \\mu_k N"
            description="f_s: statisk friksjon (maks verdi), f_k: kinetisk friksjon. N = normalkraft."
          />
          <FormulaBox variant="blue" title="Skråplan"
            latex="\\begin{aligned} \\text{Langs planet:}&\\quad mg\\sin\\theta - f = ma \\\\ \\text{Vinkelrett:}&\\quad N = mg\\cos\\theta \\end{aligned}"
            description="Velg aksesystem langs og vinkelrett på planet."
          />
          <FormulaBox variant="blue" title="Snordrag og Atwood-maskin"
            latex="a = \\frac{(m_1 - m_2)g}{m_1 + m_2} \\qquad T = \\frac{2m_1 m_2 g}{m_1 + m_2}"
            description="Gjelder for ideelt tau (masseløst, ustrekbart) over friksjonsfri trinse."
          />
        </section>
      )}

      {/* ═══════ 3. ENERGI ═══════ */}
      {show("energi") && (
        <section className="mb-10" id="energi">
          <h2 className="text-2xl font-bold mb-1">Arbeid og energi</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 6–7</p>

          <FormulaBox variant="gold" title="Arbeid"
            latex="W = Fd\\cos\\theta = \\vec{F}\\cdot\\vec{d} \\qquad W_\\text{tot} = \\Delta K"
            description="θ er vinkelen mellom kraft og forflytning."
          />
          <FormulaBox variant="gold" title="Kinetisk energi og arbeid-energi-teoremet"
            latex="K = \\tfrac{1}{2}mv^2 \\qquad W_\\text{tot} = K_2 - K_1 = \\tfrac{1}{2}mv_2^2 - \\tfrac{1}{2}mv_1^2"
          />
          <FormulaBox variant="gold" title="Potensiell energi"
            latex="U_\\text{grav} = mgy \\qquad U_\\text{fjær} = \\tfrac{1}{2}kx^2"
          />
          <FormulaBox variant="gold" title="Energibevaring"
            latex="K_1 + U_1 + W_\\text{andre} = K_2 + U_2"
            description="W_andre = arbeid fra ikke-konservative krefter (friksjon, snordrag, etc.)"
          />
          <FormulaBox variant="blue" title="Effekt"
            latex="P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}"
          />
        </section>
      )}

      {/* ═══════ 4. BEVEGELSESMENGDE ═══════ */}
      {show("bevegelsesmengde") && (
        <section className="mb-10" id="bevegelsesmengde">
          <h2 className="text-2xl font-bold mb-1">Bevegelsesmengde og kollisjoner</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 8</p>

          <FormulaBox variant="gold" title="Bevegelsesmengde og kraftimpuls"
            latex="\\vec{p} = m\\vec{v} \\qquad \\vec{J} = \\Delta\\vec{p} = \\vec{F}_\\text{gj}\\,\\Delta t"
          />
          <FormulaBox variant="gold" title="Bevaring av bevegelsesmengde"
            latex="\\sum \\vec{F}_\\text{ext} = 0 \\implies \\vec{p}_\\text{tot,før} = \\vec{p}_\\text{tot,etter}"
          />
          <FormulaBox variant="blue" title="Elastisk støt (1D)"
            latex="\\begin{aligned} v_1' &= \\frac{m_1-m_2}{m_1+m_2}v_1 + \\frac{2m_2}{m_1+m_2}v_2 \\\\ v_2' &= \\frac{2m_1}{m_1+m_2}v_1 + \\frac{m_2-m_1}{m_1+m_2}v_2 \\end{aligned}"
            description="Både bevegelsesmengde og kinetisk energi er bevart."
          />
          <FormulaBox variant="blue" title="Fullkomment uelastisk støt"
            latex="m_1 v_1 + m_2 v_2 = (m_1+m_2)v_f"
            description="Legemene henger sammen etter støtet. Bevegelsesmengde bevart, K ikke bevart."
          />
          <FormulaBox variant="blue" title="Massesenter"
            latex="\\vec{r}_{CM} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} \\qquad \\vec{v}_{CM} = \\frac{\\sum m_i \\vec{v}_i}{M_\\text{tot}}"
          />
        </section>
      )}

      {/* ═══════ 5. ROTASJON ═══════ */}
      {show("rotasjon") && (
        <section className="mb-10" id="rotasjon">
          <h2 className="text-2xl font-bold mb-1">Rotasjon</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 9–10</p>

          <FormulaBox variant="gold" title="Rotasjonskinematikk (konstant α)"
            latex="\\begin{aligned} \\omega &= \\omega_0 + \\alpha t \\\\ \\theta &= \\theta_0 + \\omega_0 t + \\tfrac{1}{2}\\alpha t^2 \\\\ \\omega^2 &= \\omega_0^2 + 2\\alpha(\\theta-\\theta_0) \\end{aligned}"
          />
          <FormulaBox variant="gold" title="Lineær ↔ vinkelsammenheng"
            latex="v = r\\omega \\qquad a_\\text{tan} = r\\alpha \\qquad a_\\text{rad} = r\\omega^2"
          />
          <FormulaBox variant="gold" title="Treghetsmoment"
            latex="I = \\sum m_i r_i^2 \\qquad I_P = I_{CM} + Md^2"
            description="Parallellakseteoremet: d = avstand fra CM-akse til ny akse."
          />
          <FormulaBox variant="blue" title="Treghetsmoment — vanlige former"
            latex="\\begin{aligned} \\text{Disk:}\\; I &= \\tfrac{1}{2}MR^2 \\quad& \\text{Ring:}\\; I &= MR^2 \\\\ \\text{Stav (senter):}\\; I &= \\tfrac{1}{12}ML^2 \\quad& \\text{Stav (ende):}\\; I &= \\tfrac{1}{3}ML^2 \\\\ \\text{Massiv kule:}\\; I &= \\tfrac{2}{5}MR^2 \\quad& \\text{Hul kule:}\\; I &= \\tfrac{2}{3}MR^2 \\end{aligned}"
          />
          <FormulaBox variant="gold" title="Kraftmoment og Newtons 2. lov for rotasjon"
            latex="\\tau = rF\\sin\\phi \\qquad \\sum\\tau = I\\alpha"
          />
          <FormulaBox variant="gold" title="Rotasjonsenergi og arbeid"
            latex="K_\\text{rot} = \\tfrac{1}{2}I\\omega^2 \\qquad W = \\tau\\Delta\\theta \\qquad P = \\tau\\omega"
          />
          <FormulaBox variant="gold" title="Rulling uten glidning"
            latex="v_{CM} = R\\omega \\qquad K_\\text{tot} = \\tfrac{1}{2}mv_{CM}^2 + \\tfrac{1}{2}I\\omega^2"
          />
          <FormulaBox variant="gold" title="Angulært moment"
            latex="L = I\\omega \\qquad \\sum\\tau = \\frac{dL}{dt} \\qquad I_1\\omega_1 = I_2\\omega_2 \\;(\\text{hvis }\\sum\\tau=0)"
          />
        </section>
      )}

      {/* ═══════ 6. ELEKTROSTATIKK ═══════ */}
      {show("elektrostatikk") && (
        <section className="mb-10" id="elektrostatikk">
          <h2 className="text-2xl font-bold mb-1">Elektrostatikk</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 21, 23, 24</p>

          <FormulaBox variant="gold" title="Coulombs lov"
            latex="F = k\\frac{|q_1 q_2|}{r^2} \\qquad k = \\frac{1}{4\\pi\\varepsilon_0} = 8{,}99 \\times 10^9 \\;\\text{N·m}^2\\text{/C}^2"
          />
          <FormulaBox variant="gold" title="Elektrisk felt"
            latex="\\vec{E} = \\frac{\\vec{F}}{q_0} \\qquad E = k\\frac{|q|}{r^2} \\;\\text{(punktladning)}"
          />
          <FormulaBox variant="blue" title="E-felt fra spesielle fordelinger"
            latex="\\begin{aligned} \\text{Uendelig lang linje:}&\\quad E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} \\\\ \\text{Uendelig plan:}&\\quad E = \\frac{\\sigma}{2\\varepsilon_0} \\\\ \\text{Kuleflate (r > R):}&\\quad E = \\frac{Q}{4\\pi\\varepsilon_0 r^2} \\end{aligned}"
          />
          <FormulaBox variant="gold" title="Elektrisk potensial"
            latex="V = k\\frac{q}{r} \\qquad W_{a\\to b} = q(V_a - V_b) \\qquad \\vec{E} = -\\nabla V"
          />
          <FormulaBox variant="blue" title="Potensiell energi mellom punktladninger"
            latex="U = k\\frac{q_1 q_2}{r}"
            description="Positiv U: frastøtning. Negativ U: tiltrekning."
          />
          <FormulaBox variant="gold" title="Kapasitans"
            latex="C = \\frac{Q}{V_{ab}} \\qquad C_\\text{platekond.} = \\varepsilon_0 \\frac{A}{d} \\qquad U = \\tfrac{1}{2}CV^2 = \\frac{Q^2}{2C}"
          />
          <FormulaBox variant="blue" title="Kobling av kondensatorer"
            latex="\\text{Parallell: } C_\\text{tot} = C_1 + C_2 + \\cdots \\qquad \\text{Serie: } \\frac{1}{C_\\text{tot}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\cdots"
          />
          <FormulaBox variant="blue" title="Dielektrikum"
            latex="C = KC_0 \\qquad \\varepsilon = K\\varepsilon_0"
            description="K = dielektrisk konstant (alltid ≥ 1)."
          />
        </section>
      )}

      {/* ═══════ 7. MAGNETISME ═══════ */}
      {show("magnetisme") && (
        <section className="mb-10" id="magnetisme">
          <h2 className="text-2xl font-bold mb-1">Magnetisme</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 27–28</p>

          <FormulaBox variant="gold" title="Magnetisk kraft på ladning"
            latex="\\vec{F} = q\\vec{v}\\times\\vec{B} \\qquad F = |q|vB\\sin\\phi"
          />
          <FormulaBox variant="blue" title="Sirkelbane i magnetfelt"
            latex="r = \\frac{mv}{|q|B} \\qquad T = \\frac{2\\pi m}{|q|B}"
          />
          <FormulaBox variant="gold" title="Magnetisk kraft på strømførende leder"
            latex="\\vec{F} = I\\vec{l}\\times\\vec{B} \\qquad F = BIl\\sin\\phi"
          />
          <FormulaBox variant="gold" title="Biot-Savarts lov"
            latex="dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\phi}{r^2} \\qquad \\mu_0 = 4\\pi\\times 10^{-7}\\;\\text{T·m/A}"
          />
          <FormulaBox variant="gold" title="B-felt fra vanlige geometrier"
            latex="\\begin{aligned} \\text{Lang rett leder:}&\\quad B = \\frac{\\mu_0 I}{2\\pi r} \\\\ \\text{Senter av sirkelspole:}&\\quad B = \\frac{\\mu_0 I}{2R} \\\\ \\text{Solenoid:}&\\quad B = \\mu_0 n I \\end{aligned}"
          />
          <FormulaBox variant="blue" title="Kraft mellom parallelle ledere"
            latex="\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}"
            description="Tiltrekning ved samme strømretning, frastøtning ved motsatt."
          />
        </section>
      )}

      {/* ═══════ 8. INDUKSJON ═══════ */}
      {show("induksjon") && (
        <section className="mb-10" id="induksjon">
          <h2 className="text-2xl font-bold mb-1">Elektromagnetisk induksjon</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Kapittel 29</p>

          <FormulaBox variant="gold" title="Magnetisk fluks"
            latex="\\Phi_B = BA\\cos\\phi = \\int \\vec{B}\\cdot d\\vec{A}"
            description="φ er vinkelen mellom B og normalen til arealet."
          />
          <FormulaBox variant="gold" title="Faradays lov"
            latex="\\mathcal{E} = -\\frac{d\\Phi_B}{dt} \\qquad \\mathcal{E} = -N\\frac{d\\Phi_B}{dt} \\;\\text{(N viklinger)}"
          />
          <FormulaBox variant="blue" title="Lenz' lov"
            latex="\\text{Den induserte strømmen motvirker fluksendringen som skapte den.}"
          />
          <FormulaBox variant="gold" title="Bevegelig leder i felt"
            latex="\\mathcal{E} = BLv"
            description="L = lederens lengde, v = fart vinkelrett på B og L."
          />
          <FormulaBox variant="blue" title="AC-generator"
            latex="\\mathcal{E}(t) = NBA\\omega\\sin(\\omega t) \\qquad \\mathcal{E}_\\text{maks} = NBA\\omega"
          />
        </section>
      )}

      {/* ═══════ KONSTANTER ═══════ */}
      <section className="mb-10 mt-12" id="konstanter">
        <h2 className="text-2xl font-bold mb-4">Fysiske konstanter</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Størrelse</th>
                <th className="text-left py-2 pr-4">Symbol</th>
                <th className="text-left py-2">Verdi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr><td className="py-2 pr-4">Tyngdeakselerasjon</td><td className="pr-4"><InlineLatex latex="g" /></td><td><InlineLatex latex="9{,}81 \\text{ m/s}^2" /></td></tr>
              <tr><td className="py-2 pr-4">Coulombs konstant</td><td className="pr-4"><InlineLatex latex="k" /></td><td><InlineLatex latex="8{,}99 \\times 10^9 \\text{ N·m}^2\\text{/C}^2" /></td></tr>
              <tr><td className="py-2 pr-4">Vakuumpermittivitet</td><td className="pr-4"><InlineLatex latex="\\varepsilon_0" /></td><td><InlineLatex latex="8{,}854 \\times 10^{-12} \\text{ F/m}" /></td></tr>
              <tr><td className="py-2 pr-4">Vakuumpermeabilitet</td><td className="pr-4"><InlineLatex latex="\\mu_0" /></td><td><InlineLatex latex="4\\pi \\times 10^{-7} \\text{ T·m/A}" /></td></tr>
              <tr><td className="py-2 pr-4">Elementærladning</td><td className="pr-4"><InlineLatex latex="e" /></td><td><InlineLatex latex="1{,}602 \\times 10^{-19} \\text{ C}" /></td></tr>
              <tr><td className="py-2 pr-4">Elektronmasse</td><td className="pr-4"><InlineLatex latex="m_e" /></td><td><InlineLatex latex="9{,}109 \\times 10^{-31} \\text{ kg}" /></td></tr>
              <tr><td className="py-2 pr-4">Protonmasse</td><td className="pr-4"><InlineLatex latex="m_p" /></td><td><InlineLatex latex="1{,}673 \\times 10^{-27} \\text{ kg}" /></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
