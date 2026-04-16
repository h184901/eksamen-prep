"use client";

import { useState } from "react";
import Link from "next/link";
import F from "@/components/F";
import FormulaClickCallout from "@/components/FormulaClickCallout";
import InlineLatex from "@/components/InlineLatex";
import { byTopic, type FormulaTopic } from "@/data/ing164/formulas";

interface Theme {
  id: FormulaTopic;
  label: string;
  heading: string;
  chaps: string;
}

const themes: Theme[] = [
  { id: "kinematikk", label: "Kinematikk", heading: "Kinematikk", chaps: "Kap 2–3" },
  { id: "krefter", label: "Krefter", heading: "Newtons lover og krefter", chaps: "Kap 4–5" },
  { id: "energi", label: "Energi", heading: "Arbeid og energi", chaps: "Kap 6–7" },
  { id: "bevegelsesmengde", label: "Bevegelsesmengde", heading: "Bevegelsesmengde og kollisjoner", chaps: "Kap 8" },
  { id: "rotasjon", label: "Rotasjon", heading: "Rotasjon", chaps: "Kap 9–10" },
  { id: "elektrostatikk", label: "Elektrostatikk", heading: "Elektrostatikk", chaps: "Kap 21, 23, 24" },
  { id: "magnetisme", label: "Magnetisme", heading: "Magnetisme", chaps: "Kap 27–28" },
  { id: "induksjon", label: "Induksjon", heading: "Elektromagnetisk induksjon", chaps: "Kap 29" },
];

export default function FormelarkPage() {
  const [filter, setFilter] = useState<FormulaTopic | null>(null);

  const show = (id: FormulaTopic) => !filter || filter === id;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
          <span>/</span>
          <Link href="/ing164" className="hover:text-[var(--accent)]">ING164</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Formelark</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Komplett formelark — ING164</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Alle formler organisert etter tema. Bruk filteret for å fokusere på ett tema om gangen,
          eller klikk på en formel for full forklaring, variabler og bruksområde.
        </p>
      </div>

      <FormulaClickCallout />

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

      {/* Seksjoner drevet av registry */}
      {themes.map((t) =>
        show(t.id) ? (
          <section key={t.id} className="mb-10" id={t.id}>
            <h2 className="text-2xl font-bold mb-1">{t.heading}</h2>
            <p className="text-sm text-[var(--muted)] mb-4">Kapittel {t.chaps.replace("Kap ", "")}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {byTopic(t.id).map((f) => (
                <F key={f.id} id={f.id} />
              ))}
            </div>
          </section>
        ) : null,
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
              <tr><td className="py-2 pr-4">Tyngdeakselerasjon</td><td className="pr-4"><InlineLatex latex="g" /></td><td><InlineLatex latex="9{,}81 \text{ m/s}^2" /></td></tr>
              <tr><td className="py-2 pr-4">Coulombs konstant</td><td className="pr-4"><InlineLatex latex="k" /></td><td><InlineLatex latex="8{,}99 \times 10^9 \text{ N·m}^2\text{/C}^2" /></td></tr>
              <tr><td className="py-2 pr-4">Vakuumpermittivitet</td><td className="pr-4"><InlineLatex latex="\varepsilon_0" /></td><td><InlineLatex latex="8{,}854 \times 10^{-12} \text{ F/m}" /></td></tr>
              <tr><td className="py-2 pr-4">Vakuumpermeabilitet</td><td className="pr-4"><InlineLatex latex="\mu_0" /></td><td><InlineLatex latex="4\pi \times 10^{-7} \text{ T·m/A}" /></td></tr>
              <tr><td className="py-2 pr-4">Elementærladning</td><td className="pr-4"><InlineLatex latex="e" /></td><td><InlineLatex latex="1{,}602 \times 10^{-19} \text{ C}" /></td></tr>
              <tr><td className="py-2 pr-4">Elektronmasse</td><td className="pr-4"><InlineLatex latex="m_e" /></td><td><InlineLatex latex="9{,}109 \times 10^{-31} \text{ kg}" /></td></tr>
              <tr><td className="py-2 pr-4">Protonmasse</td><td className="pr-4"><InlineLatex latex="m_p" /></td><td><InlineLatex latex="1{,}673 \times 10^{-27} \text{ kg}" /></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
