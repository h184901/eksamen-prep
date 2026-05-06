"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { oopPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Code } from "@/components/dat109/OopComponents";

export default function SekvensTilMetodePage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.oop} pages={oopPages} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">
          DAT109
        </Link>
        <span>/</span>
        <Link href="/dat109/oop" className="hover:text-[var(--accent)]">
          OOP
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Sekvens → metode</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Fra sekvensdiagram til metode</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Oppgave 4b. Sekvensdiagrammet er den eksakte oppskriften — hver pil, hver loop og hver alt-boks
          oversettes direkte til Java-kode.
        </p>
      </div>

      {/* ── 3. Fra sekvensdiagram til metode ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">
        3. Fra sekvensdiagram til metode
      </h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        Dette er oppgave 4b. Sekvensdiagrammet er den eksakte oppskriften.
      </p>

      <Section title="Les sekvensdiagrammet slik" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              uml: "Pil fra A til B: metode()",
              java: "b.metode();",
              desc: 'En melding i UML = et metodekall i Java. "A sender melding til B" = a kaller metode på b.',
            },
            {
              uml: "loop [for alle spillere]",
              java: "for (Spiller s : spillere) { ... }",
              desc: "Loop-boks = for-løkke. Legg merke til betingelsen i hakeparentesen.",
            },
            {
              uml: "loop [20 ganger]",
              java: "for (int i = 0; i < 20; i++) { ... }",
              desc: "Teller-løkke. Antall repetisjoner er angitt i diagrammet.",
            },
            {
              uml: "alt [betingelse] / [else]",
              java: "if (betingelse) { ... } else { ... }",
              desc: "Alt-boks = if/else. Hver seksjon i alt-boksen er én gren.",
            },
            {
              uml: "opt [betingelse]",
              java: "if (betingelse) { ... }",
              desc: "Opt-boks = valgfri handling = bare if uten else.",
            },
            {
              uml: "retur = metode()",
              java: "Type retur = objekt.metode();",
              desc: "Returverdi angis med = i diagrammet. Lagre den i en variabel.",
            },
          ].map((item) => (
            <div
              key={item.uml}
              className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] overflow-hidden"
            >
              <div className="p-3 border-b border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-800/50">
                <div className="text-xs font-bold text-[var(--muted)] mb-1">
                  I diagrammet
                </div>
                <code className="text-xs font-mono">{item.uml}</code>
              </div>
              <div className="p-3">
                <div className="text-xs font-bold text-[var(--muted)] mb-1">
                  I Java
                </div>
                <code className="text-xs font-mono text-sysdev-600 dark:text-sysdev-400">
                  {item.java}
                </code>
                <p className="text-xs text-[var(--muted)] mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-neutral-900 dark:bg-neutral-950 border border-neutral-700 p-4 text-sm font-mono text-neutral-100">
          <div className="text-neutral-400 mb-2">
            // Senke melding fra en klasse til en annen (F04 slide 36):
          </div>
          <div>{`public class A {`}</div>
          <div>{`    public void metodeA() {`}</div>
          <div>{`        B b = new B();`}</div>
          <div>{`        b.metodeB(); // melding fra a til b`}</div>
          <div>{`    }`}</div>
          <div>{`}`}</div>
        </div>
      </Section>

      <Section title="Komplett eksempel: spillRunde() fra Monopol (F05)">
        <p className="text-sm text-[var(--muted)] mb-3">
          Sekvensdiagrammet viser:{" "}
          <code className="font-mono text-xs">Monopol → spill()</code> →{" "}
          <code className="font-mono text-xs">
            loop [20 ganger] spillRunde()
          </code>{" "}
          → <code className="font-mono text-xs">Spiller → spillTrekk(hatt)</code>
          . Dette ble direkte til koden under.
        </p>
        <Code
          code={`// Fra sekvensdiagrammet: Monopol kaller spillRunde() i en løkke
// spillRunde() itererer over alle spillere og kaller spillTrekk(kopp)

private void spillRunde() {
    for (Spiller spiller : spillere) {
        spiller.spillTrekk(kopp);
    }
}

// spillTrekk() implementerer resten av sekvensdiagrammet:
// Spiller → Hatt.trill() → Hatt.getSum() → Brikke.getRute()
// → Brett.flytt(rute, sum) → Brikke.setRute(nyRute)

public void spillTrekk(Hatt hatt) {
    hatt.trill();
    Integer sum = hatt.getSum();
    Rute rute = brikke.getRute();
    rute = brett.flytt(rute, sum);
    brikke.setRute(rute);
}`}
        />
      </Section>
    </div>
  );
}
