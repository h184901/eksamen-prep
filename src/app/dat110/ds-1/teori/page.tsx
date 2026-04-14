"use client";

import Link from "next/link";

const subChapters = [
  { id: "1.1", slug: "1-1", title: "Definisjon og eksempler", desc: "Hva er et distribuert system? Nettverksbaserte, pervasive og distribuerte informasjonssystemer" },
  { id: "1.2", slug: "1-2", title: "Design-mål", desc: "8 transparenstyper, åpenhet, skalerbarhetsdimensjoner (størrelse, geografisk, administrativ)" },
  { id: "1.3", slug: "1-3", title: "Typer distribuerte systemer", desc: "Klient-server, P2P, hybrid, multi-tier, middleware og cloud computing" },
];

export default function DS1TeoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Teori: Introduksjon til distribuerte systemer</h2>
        <p className="text-[var(--muted)] text-sm">DS 1 — Definisjoner, transparens, skalerbarhet og arkitekturtyper</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {subChapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/dat110/ds-1/teori/${ch.slug}`}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-blue-400/60 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{ch.id}</p>
            <p className="font-semibold text-sm mb-1 group-hover:text-[var(--accent)] transition-colors">{ch.title}</p>
            <p className="text-xs text-[var(--muted)]">{ch.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
