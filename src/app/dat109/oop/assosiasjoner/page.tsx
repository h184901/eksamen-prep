"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { oopPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Code, RuleCard } from "@/components/dat109/OopComponents";

export default function AssosiasjonerPage() {
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
        <span className="text-[var(--foreground)]">Assosiasjoner</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assosiasjoner → Java-felt</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Den viktigste regelen i Oppgave 4a: multiplisiteten i UML bestemmer hvilken Java-type
          du bruker for feltet. Her er alle relasjonstyper og collection-valgene.
        </p>
      </div>

      {/* ── 2. Assosiasjoner → Java-felt ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">
        2. Assosiasjoner → Java-felt
      </h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        Dette er den viktigste regelen: multiplisiteten i UML bestemmer hvilken
        Java-type du bruker for feltet.
      </p>

      <Section title="1 til 1 — enkel referanse" defaultOpen={true}>
        <RuleCard
          uml={`Monopol ──── Brett
   1          1

// Monopol har ett Brett`}
          java={`public class Monopol {
    private Brett brett;  // én referanse
    ...
}`}
          tip="Ingen samling — bare ett felt av typen Brett"
        />
      </Section>

      <Section title="1 til mange — List eller ArrayList">
        <RuleCard
          uml={`Monopol ────── Spiller
   1          2..8

// Monopol har 2-8 Spillere`}
          java={`public class Monopol {
    // List<Spiller> for aggregering (Monopol eier ikke Spillere)
    private List<Spiller> spillere = new ArrayList<>();
    ...
}`}
          tip="Bruk List<T> som type og ArrayList<T>() som initialisering — dette er professorens standard"
        />
        <Code
          code={`// Fra F05 — professorens faktiske kode for Monopol-klassen:
public class Monopol {
    private List<Spiller> spillere = new ArrayList<>();
    private Hatt hatt = new Hatt();
    private Brett brett = new Brett();

    public void spill() {
        for (int runde = 0; runde < 20; runde++) {
            for (Spiller spiller : spillere) {
                spiller.spillTrekk(hatt);
            }
        }
    }
}`}
        />
      </Section>

      <Section title="Komposisjon — lages i konstruktøren">
        <p className="text-sm text-[var(--muted)]">
          Komposisjon (fylt diamant i UML) betyr at delobjektene{" "}
          <strong>lages av</strong> det sammensatte objektet og lever og dør med
          det. I Java: instantier i konstruktøren.
        </p>
        <RuleCard
          uml={`Brett ◆──── Rute
  1          40

// Brett oppretter alle 40 Ruter
// Ruter kan ikke eksistere uten Brett`}
          java={`public class Brett {
    private List<Rute> ruter = new ArrayList<Rute>(40);

    public Brett() {
        ruter.add(new Rute("Start"));
        for (int i = 1; i < 40; i++) {
            ruter.add(new Rute("Rute " + i));
        }
    }
}`}
          tip="Fylt diamant = komposisjon = lag objektene i konstruktøren"
        />
      </Section>

      <Section title="Arv/spesialisering — extends og implements">
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted)]">
            I UML: pil med tomt pilhode fra subklasse til superklasse.
          </p>
          <RuleCard
            uml={`Rute {abstract}
   ▲
   ├── StartRute
   ├── VanligRute
   └── DeSettesIFengselRute`}
            java={`// Superklasse (abstrakt)
public abstract class Rute {
    private String navn;
    public abstract void landetPa(Spiller spiller);
    public String getNavn() { return navn; }
}

// Subklasse — må implementere abstrakt metode
public class StartRute extends Rute {
    @Override
    public void landetPa(Spiller spiller) {
        spiller.leggTilPenger(2000);
    }
}

// En annen subklasse
public class VanligRute extends Rute {
    @Override
    public void landetPa(Spiller spiller) {
        // Ingenting skjer
    }
}`}
            tip="Husk @Override når du implementerer arvet abstrakt metode"
          />
          <RuleCard
            uml={`<<interface>> Figure
        ▲
   ┌────┴────┐
 Circle    Square`}
            java={`public interface Figure {
    Double area();
    Position getPos();
}

public class Circle implements Figure {
    private Double radius;
    private Position pos;

    @Override
    public Double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public Position getPos() { return pos; }
}

public class Square implements Figure {
    private Double side;
    private Position pos;

    @Override
    public Double area() { return side * side; }

    @Override
    public Position getPos() { return pos; }
}`}
            tip="implements for grensesnitt, extends for klasser"
          />
        </div>
      </Section>

      <Section title="Mange til mange — List på begge sider">
        <p className="text-sm text-[var(--muted)] mb-3">
          Mange-til-mange-assosiasjoner gir <code className="font-mono text-xs">List</code> på <strong>begge</strong> sider.
          Typisk eksempel: en Student kan ta mange Kurs, og et Kurs kan ha mange Studenter.
        </p>
        <RuleCard
          uml={`Student ────── Kurs
   *            *

// Student har mange Kurs
// Kurs har mange Studenter`}
          java={`public class Student {
    private List<Kurs> kurs = new ArrayList<>();
}

public class Kurs {
    private List<Student> studenter = new ArrayList<>();
}`}
          tip="Begge klasser har List<Den andre>. På eksamen: sjekk multiplisiteten i begge ender."
        />
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
          <strong className="text-amber-700 dark:text-amber-400">Eksamenstips:</strong>{" "}
          I de fleste eksamensoppgavene er det 1-til-mange, ikke mange-til-mange. Men det KAN komme — sjekk alltid begge ender av assosiasjonen!
        </div>
      </Section>

      <Section title="Collection-typer: List, Set og Map">
        <p className="text-sm text-[var(--muted)] mb-3">
          Professorens standard er <code className="font-mono text-xs">List&lt;T&gt;</code> for alt.
          Men du bør kjenne til andre typer i tilfelle de dukker opp:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--card-border)]">
                <th className="text-left py-2 px-3">Samling</th>
                <th className="text-left py-2 px-3">Når brukes den?</th>
                <th className="text-left py-2 px-3">Deklarasjon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              <tr>
                <td className="py-2 px-3 font-mono text-xs">List&lt;T&gt;</td>
                <td className="py-2 px-3 text-xs">Ordnet samling, duplikater tillatt. <strong>Standard på eksamen.</strong></td>
                <td className="py-2 px-3 font-mono text-xs">List&lt;Spiller&gt; spillere = new ArrayList&lt;&gt;();</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">Set&lt;T&gt;</td>
                <td className="py-2 px-3 text-xs">Ingen duplikater. Bruk når elementer skal være unike.</td>
                <td className="py-2 px-3 font-mono text-xs">Set&lt;Kort&gt; kort = new HashSet&lt;&gt;();</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs">Map&lt;K, V&gt;</td>
                <td className="py-2 px-3 text-xs">Nøkkel-verdi-par. Bruk for oppslag (f.eks. kode → kurs).</td>
                <td className="py-2 px-3 font-mono text-xs">Map&lt;String, Kurs&gt; kurs = new HashMap&lt;&gt;();</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm mt-3">
          <strong>Professorens standard:</strong>{" "}
          I forelesningene og på eksamen bruker professoren <strong>alltid</strong>{" "}
          <code className="font-mono text-xs">List&lt;T&gt;</code> med{" "}
          <code className="font-mono text-xs">new ArrayList&lt;&gt;()</code>.
          Bruk dette med mindre oppgaven eksplisitt sier noe annet.
        </div>
      </Section>
    </div>
  );
}
