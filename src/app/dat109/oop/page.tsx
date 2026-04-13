"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Collapsible section ── */
function Section({
  title,
  badge,
  badgeColor = "sysdev",
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors: Record<string, string> = {
    sysdev:
      "bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base">{title}</span>
            {badge && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[badgeColor]}`}
              >
                {badge}
              </span>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

/* ── Code block ── */
function Code({ code, lang = "java" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative rounded-lg bg-neutral-900 dark:bg-neutral-950 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-800/60 border-b border-neutral-700">
        <span className="text-xs font-mono text-neutral-400">{lang}</span>
        <button
          onClick={copy}
          className="text-xs text-neutral-400 hover:text-white transition-colors"
        >
          {copied ? "Kopiert!" : "Kopier"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-neutral-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Exam question ── */
function ExamQuestion({
  year,
  title,
  description,
  code,
  note,
}: {
  year: string;
  title: string;
  description: string;
  code: string;
  note?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl border-2 border-amber-400/40 bg-amber-50/50 dark:bg-amber-950/10 p-5">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">
          Eksamen {year}
        </span>
      </div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted)] mb-3">{description}</p>
      <button
        onClick={() => setShow((s) => !s)}
        className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline"
      >
        {show ? "Skjul løsning" : "Vis løsning"}
      </button>
      {show && (
        <div className="mt-3 space-y-3">
          <Code code={code} />
          {note && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm text-blue-800 dark:text-blue-300">
              <strong>Merknad:</strong> {note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Rule card ── */
function RuleCard({
  uml,
  java,
  tip,
}: {
  uml: string;
  java: string;
  tip?: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--card-border)]">
        <div className="p-4">
          <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
            UML-diagram
          </div>
          <div className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 rounded p-2 whitespace-pre-wrap">
            {uml}
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
            Java-kode
          </div>
          <Code code={java} />
        </div>
      </div>
      {tip && (
        <div className="px-4 py-2 border-t border-[var(--card-border)] bg-sysdev-50/50 dark:bg-sysdev-950/10 text-xs text-sysdev-700 dark:text-sysdev-400">
          <strong>Tips:</strong> {tip}
        </div>
      )}
    </div>
  );
}

export default function OopPage() {
  return (
    <div>
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
        <span className="text-[var(--foreground)]">OOP — Java fra UML</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sysdev-100 text-sysdev-700 dark:bg-sysdev-900/30 dark:text-sysdev-400 mb-3 inline-block">
          ~20% av eksamen
        </span>
        <h1 className="text-3xl font-bold mb-2">OOP — Java fra UML</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Oppgave 4 på eksamen gir deg et klassediagram og et sekvensdiagram.
          Du skal (a) skrive Java-skall for alle klassene, og (b) implementere
          én eller to metoder slik de samsvarer med sekvensdiagrammet. Samme
          mønster hvert eneste år.
        </p>
      </div>

      {/* Eksamensmønster — alltid synlig */}
      <div className="rounded-xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-6 mb-8">
        <h2 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">
          Slik ser Oppgave 4 alltid ut
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-amber-200 dark:border-amber-800/40 p-4">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
              Oppgave 4a
            </div>
            <p className="text-sm font-medium mb-1">Skriv Java-skall</p>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Klasse-deklarasjoner (class / interface / abstract class)</li>
              <li>Felt (attributter) med riktig synlighet og type</li>
              <li>Metodesignaturer — UTEN implementasjon (bare {})</li>
              <li>Arv (extends) og grensesnitt (implements)</li>
              <li>Ikke nødvendig med import, pakke, get/set, konstruktør</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/70 dark:bg-neutral-900/50 border border-amber-200 dark:border-amber-800/40 p-4">
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
              Oppgave 4b
            </div>
            <p className="text-sm font-medium mb-1">Implementer én metode</p>
            <ul className="text-xs text-[var(--muted)] space-y-1 list-disc list-inside">
              <li>Les sekvensdiagrammet nøye — det er oppskriften</li>
              <li>Hver pil i diagrammet = ett metodekall i koden</li>
              <li>Loop-boks = for/while-løkke</li>
              <li>Alt-boks = if/else</li>
              <li>Gjør BARE det diagrammet sier — ikke mer, ikke mindre</li>
            </ul>
          </div>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 text-sm">
          <strong className="text-red-700 dark:text-red-400">
            Vanligste feil:
          </strong>{" "}
          <span className="text-[var(--muted)]">
            Implementere metoder som ikke spørres om (4a) • Glemme @Override på
            implementerte metoder • Feil synlighet (+/- i UML) • Glemme
            JavaDoc (gir minuspoeng)
          </span>
        </div>
      </div>

      {/* ── 1. UML-synligheter ── */}
      <h2 className="text-xl font-bold mb-3">
        1. UML-notasjon du må kunne huske
      </h2>

      <Section
        title="Synligheter: + - # ~"
        badge="Må kunne"
        badgeColor="amber"
        defaultOpen={true}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { symbol: "+", name: "public", color: "emerald" },
            { symbol: "-", name: "private", color: "red" },
            { symbol: "#", name: "protected", color: "blue" },
            { symbol: "~", name: "package (default)", color: "neutral" },
          ].map((v) => (
            <div
              key={v.symbol}
              className="flex items-center gap-3 rounded-lg bg-[var(--card)] border border-[var(--card-border)] p-3"
            >
              <span className="text-2xl font-mono font-bold w-8 text-center">
                {v.symbol}
              </span>
              <div>
                <div className="font-bold text-sm">{v.name}</div>
                <div className="text-xs text-[var(--muted)] font-mono">
                  {v.name === "package (default)"
                    ? "(ingen modifikator)"
                    : `${v.name} <type> <navn>`}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm">
          <strong>Fra forelesningen (F02):</strong> Attributter i Java er nesten
          alltid <code className="font-mono">private</code>. Metoder er nesten
          alltid <code className="font-mono">public</code>. Klassen{" "}
          <code className="font-mono">Person</code> med{" "}
          <code className="font-mono">+navn : String</code> betyr{" "}
          <code className="font-mono text-xs">public String navn;</code>
        </div>
        <Code
          code={`// UML: Person
// +navn : String
// +telefon : String
// +vis() : void

public class Person {
    private String navn;      // konvensjonsvis private, ikke public
    private String telefon;

    public void vis() {
        System.out.println(navn + " " + telefon);
    }

    public String getNavn() { return navn; }
    public void setNavn(String navn) { this.navn = navn; }
    public String getTelefon() { return telefon; }
    public void setTelefon(String telefon) { this.telefon = telefon; }
}`}
        />
      </Section>

      <Section title="Abstrakt klasse og grensesnitt" badge="Viktig">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
              Abstrakt klasse
            </div>
            <p className="text-sm text-[var(--muted)] mb-2">
              I UML: klassenavn i{" "}
              <em>
                kursiv
              </em>{" "}
              eller merket{" "}
              <code className="font-mono text-xs">{"{abstract}"}</code>.
              Metoder kan også være abstrakte (kursiv/abstract).
            </p>
            <Code
              code={`// UML: Rute {abstract}
//   +landetPa() {abstract}

public abstract class Rute {
    private String navn;

    // Abstrakt metode — ingen implementasjon
    public abstract void landetPa(Spiller spiller);

    // Konkret metode — kan ha implementasjon
    public String getNavn() { return navn; }
}`}
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">
              Grensesnitt (interface)
            </div>
            <p className="text-sm text-[var(--muted)] mb-2">
              I UML: merket med{" "}
              <code className="font-mono text-xs">&laquo;interface&raquo;</code>
              . Kan IKKE ha attributter i Java (kun metoder).
            </p>
            <Code
              code={`// UML: <<interface>> Figure
//   +area() : Double
//   +getPos() : Position

public interface Figure {
    Double area();
    Position getPos();
}`}
            />
          </div>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
          <strong className="text-amber-700 dark:text-amber-400">
            Professorens merknad (2023-eksamen):
          </strong>{" "}
          Hvis UML viser{" "}
          <code className="font-mono text-xs">&laquo;interface&raquo;</code> med
          en attributt <code className="font-mono text-xs">pos</code>, kan du
          ikke ta den med i grensesnittet i Java. Flytt attributten til de
          konkrete klassene og noter antagelsen din!
        </div>
      </Section>

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

      {/* ── 2b. toString, equals, hashCode ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">
        2b. toString, equals og hashCode
      </h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        Tre metoder fra <code className="font-mono text-xs">Object</code> som du bør kunne oversette fra UML.
        Professorens eksempler bruker dem sjelden, men de kan dukke opp.
      </p>

      <Section title="toString — lesbar tekstrepresentasjon" defaultOpen={true}>
        <p className="text-sm text-[var(--muted)] mb-3">
          Returnerer en <code className="font-mono text-xs">String</code> som beskriver objektet.
          Kalles automatisk av <code className="font-mono text-xs">System.out.println()</code>.
        </p>
        <Code
          code={`public class Spiller {
    private String navn;
    private int poeng;

    @Override
    public String toString() {
        return "Spiller{navn='" + navn + "', poeng=" + poeng + "}";
    }
}

// Bruk:
Spiller s = new Spiller("Ola", 100);
System.out.println(s);  // Skriver: Spiller{navn='Ola', poeng=100}`}
        />
      </Section>

      <Section title="equals — sammenligne objekter">
        <p className="text-sm text-[var(--muted)] mb-3">
          To objekter er <strong>like</strong> hvis innholdet er likt. Standard{" "}
          <code className="font-mono text-xs">==</code> sammenligner bare referanser (pekere), ikke innhold.
        </p>
        <Code
          code={`public class Kort {
    private String farge;
    private int verdi;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;                  // samme referanse
        if (obj == null) return false;                 // null-sjekk
        if (getClass() != obj.getClass()) return false; // type-sjekk
        Kort other = (Kort) obj;                       // cast
        return verdi == other.verdi
            && Objects.equals(farge, other.farge);      // felt-sammenligning
    }
}`}
        />
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 text-sm mt-3">
          <strong className="text-red-700 dark:text-red-400">Vanlig feil:</strong>{" "}
          <code className="font-mono text-xs">==</code> sjekker om det er <em>samme objekt i minnet</em>.{" "}
          <code className="font-mono text-xs">.equals()</code> sjekker om innholdet er likt.
          Bruk alltid <code className="font-mono text-xs">.equals()</code> for String og andre objekter!
        </div>
      </Section>

      <Section title="hashCode — alltid sammen med equals">
        <p className="text-sm text-[var(--muted)] mb-3">
          <strong>Regel:</strong> Hvis du overstyrer <code className="font-mono text-xs">equals()</code>,{" "}
          MÅ du også overstyre <code className="font-mono text-xs">hashCode()</code>.
          Ellers fungerer ikke <code className="font-mono text-xs">HashSet</code> og{" "}
          <code className="font-mono text-xs">HashMap</code> korrekt.
        </p>
        <Code
          code={`@Override
public int hashCode() {
    return Objects.hash(farge, verdi);
}

// Komplett eksempel — Kort med equals + hashCode:
public class Kort {
    private String farge;
    private int verdi;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Kort)) return false;
        Kort other = (Kort) obj;
        return verdi == other.verdi && Objects.equals(farge, other.farge);
    }

    @Override
    public int hashCode() {
        return Objects.hash(farge, verdi);
    }
}`}
        />
      </Section>

      {/* ── 2c. Enum-typer ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">
        2c. Enum-typer
      </h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        Enums representerer et fast sett med verdier. I UML vises de som
        en klasse merket <code className="font-mono text-xs">&laquo;enumeration&raquo;</code>.
      </p>

      <Section title="UML-enum til Java-enum" defaultOpen={true}>
        <RuleCard
          uml={`<<enumeration>>
Farge
──────
ROED
BLAA
GROENN
GUL`}
          java={`public enum Farge {
    ROED, BLAA, GROENN, GUL
}`}
          tip="Enum-verdier er ALLTID STORE BOKSTAVER i Java"
        />
        <p className="text-sm text-[var(--muted)] mt-3">
          Enums kan også ha attributter og metoder:
        </p>
        <Code
          code={`public enum Farge {
    ROED("Rød"),
    BLAA("Blå"),
    GROENN("Grønn"),
    GUL("Gul");

    private final String norskNavn;

    Farge(String norskNavn) {
        this.norskNavn = norskNavn;
    }

    public String getNorskNavn() {
        return norskNavn;
    }
}

// Bruk i en klasse:
public class Kort {
    private Farge farge;     // enum som felt
    private int verdi;

    public Kort(Farge farge, int verdi) {
        this.farge = farge;
        this.verdi = verdi;
    }
}

// Oppretting:
Kort k = new Kort(Farge.ROED, 7);`}
        />
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3 text-sm mt-3">
          <strong>I praksis på eksamen:</strong>{" "}
          Enums dukker sjelden opp som en stor del av Oppgave 4, men de kan være en del av klassediagrammet.
          Hvis du ser <code className="font-mono text-xs">&laquo;enumeration&raquo;</code> i diagrammet, skriv en
          enkel <code className="font-mono text-xs">enum</code> med verdiene som er listet.
        </div>
      </Section>

      <Section title="Enum med switch — vanlig mønster">
        <Code
          code={`public enum RuteType {
    START, VANLIG, FENGSEL, SJANSE
}

public abstract class Rute {
    private String navn;
    private RuteType type;
    // ...
}

// Alternativt: switch over enum (ikke anbefalt — bruk polymorfi)
public void haandterRute(Rute rute) {
    switch (rute.getType()) {
        case START:
            spiller.leggTilPenger(2000);
            break;
        case FENGSEL:
            spiller.settIFengsel();
            break;
        case SJANSE:
            trekkSjansekort();
            break;
        default:
            break;
    }
}

// Bedre løsning med polymorfi (GRASP):
// Lag subklasser StartRute, FengselsRute, SjanseRute
// med @Override landetPa(Spiller s) — dette er penere design`}
        />
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm mt-3">
          <strong className="text-amber-700 dark:text-amber-400">GRASP-kobling:</strong>{" "}
          Professorens forelesning F05 viser at switch over type bør erstattes med polymorfi
          (GRASP Polymorphism). Enum + switch er OK for enkle ting, men for oppførsel
          knyttet til typen bør du bruke arv og <code className="font-mono text-xs">@Override</code>.
        </div>
      </Section>

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

      {/* ── 4. Eksempler fra eksamen ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">
        4. Alle eksamensoppgaver med løsning
      </h2>

      <ExamQuestion
        year="Vår 2023"
        title="Canvas — tegneprogram med Figure-grensesnitt"
        description="Klassediagram: Canvas (List<Figure>), grensesnitt Figure (area(), getPos()), Position (x, y), Square (side, pos), Circle (radius, pos). Sekvensdiagram for totalArea(): for hver figur → getPos() → sjekk x>0 og y>0 → area() → summer."
        code={`// ── Canvas ──
public class Canvas {
    private List<Figure> figures = new ArrayList<>();

    /**
     * Calculates the total area of all figures on the canvas.
     * @return total area
     */
    public Double totalArea() {
        Double totalArea = 0.0;
        for (Figure figure : figures) {
            Position pos = figure.getPos();
            if (pos.getX() > 0 && pos.getY() > 0) {
                totalArea += figure.area();
            }
        }
        return totalArea;
    }
}

// ── Figure (grensesnitt) ──
public interface Figure {
    Double area();
    Position getPos();
}

// ── Position ──
public class Position {
    private Double x;
    private Double y;

    public Position(Double x, Double y) {
        this.x = x;
        this.y = y;
    }

    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }
    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }
}

// ── Circle ──
public class Circle implements Figure {
    private Double radius;
    private Position pos;

    public Circle(Double radius, Position pos) {
        this.radius = radius;
        this.pos = pos;
    }

    @Override
    public Double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public Position getPos() { return pos; }
    public Double getRadius() { return radius; }
    public void setRadius(Double radius) { this.radius = radius; }
}

// ── Square ──
public class Square implements Figure {
    private Double side;
    private Position pos;

    public Square(Double side, Position pos) {
        this.side = side;
        this.pos = pos;
    }

    @Override
    public Double area() { return side * side; }

    @Override
    public Position getPos() { return pos; }
    public Double getSide() { return side; }
    public void setSide(Double side) { this.side = side; }
}`}
        note="Attributten pos i Figure-grensesnittet flyttes til Circle og Square siden Java-grensesnitt ikke kan ha attributter. Skriv ned antagelsen på eksamen!"
      />

      <ExamQuestion
        year="Vår 2024"
        title="Lerret — tegneprogram med Sirkel og Rektangel"
        description="Tilsvarende 2023-oppgaven. Lerret (List<Figur>), grensesnitt Figur (areal(), getPos()), Posisjon (x, y), Sirkel, Rektangel. Implementer finnAreal() og tegn() i Lerret basert på sekvensdiagrammet."
        code={`// ── Lerret ──
public class Lerret {
    private List<Figur> figurer = new ArrayList<>();
    private Double bredde;
    private Double hoyde;

    /**
     * Beregner totalt areal for alle figurer innenfor lerretet.
     * @return totalt areal
     */
    public Double finnAreal() {
        Double totalt = 0.0;
        for (Figur figur : figurer) {
            Posisjon pos = figur.getPos();
            if (pos.getX() > 0 && pos.getY() > 0) {
                totalt += figur.areal();
            }
        }
        return totalt;
    }

    /**
     * Tegner alle figurer som er innenfor lerretets grenser.
     */
    public void tegn() {
        for (Figur figur : figurer) {
            Posisjon pos = figur.getPos();
            if (pos.getX() > 0 && pos.getY() > 0) {
                figur.tegn();
            }
        }
    }
}

// ── Figur (grensesnitt) ──
public interface Figur {
    Double areal();
    Posisjon getPos();
    void tegn();
}

// ── Posisjon ──
public class Posisjon {
    private Double x;
    private Double y;

    public Posisjon(Double x, Double y) { this.x = x; this.y = y; }
    public Double getX() { return x; }
    public Double getY() { return y; }
    public void setX(Double x) { this.x = x; }
    public void setY(Double y) { this.y = y; }
}

// ── Sirkel ──
public class Sirkel implements Figur {
    private Double radius;
    private Posisjon pos;

    public Sirkel(Double radius, Posisjon pos) {
        this.radius = radius;
        this.pos = pos;
    }

    @Override
    public Double areal() { return Math.PI * radius * radius; }

    @Override
    public Posisjon getPos() { return pos; }

    @Override
    public void tegn() { /* tegner sirkelen */ }
}

// ── Rektangel ──
public class Rektangel implements Figur {
    private Double bredde;
    private Double hoyde;
    private Posisjon pos;

    public Rektangel(Double bredde, Double hoyde, Posisjon pos) {
        this.bredde = bredde;
        this.hoyde = hoyde;
        this.pos = pos;
    }

    @Override
    public Double areal() { return bredde * hoyde; }

    @Override
    public Posisjon getPos() { return pos; }

    @Override
    public void tegn() { /* tegner rektangelet */ }
}`}
        note="2024 følger NØYAKTIG samme mønster som 2023. Lær dette utenat!"
      />

      <ExamQuestion
        year="Høst 2020"
        title="Kortspill — spill() i Kortspill"
        description="Kortspill (stokk: Kortstokk, spillere: List<Spiller>). Sekvensdiagram: loop 2 ganger → stokk.hentNesteKort() → for alle spillere: spiller.delUtKort(kort) → for alle spillere: spiller.getPoeng()"
        code={`// ── Kortspill ──
public class Kortspill {
    private List<Spiller> spillere = new ArrayList<>();
    private Kortstokk stokk;

    /**
     * Spiller kortspillet.
     */
    public void spill() {
        for (int i = 0; i < 2; i++) {
            Kort kort = stokk.hentNesteKort();
            for (Spiller spiller : spillere) {
                spiller.delUtKort(kort);
            }
        }
        for (Spiller spiller : spillere) {
            spiller.getPoeng();
        }
    }
}

// ── Skall-klasser (4a) ──
public class Kort {
    private Integer verdi;
    private String farge;
    public Integer getVerdi() { return verdi; }
    public String getFarge() { return farge; }
}

public class Kortstokk {
    private List<Kort> kort = new ArrayList<>();
    public Kort hentNesteKort() { return null; }
}

public class Spiller {
    private String navn;
    private List<Kort> haand = new ArrayList<>();
    public void delUtKort(Kort kort) {}
    public Integer getPoeng() { return 0; }
    public String getNavn() { return navn; }
}`}
        note="Her er løkken for å dele ut 2 kort ytre, og løkken over spillere er indre. Les diagrammet nøye for rekkefølgen!"
      />

      <ExamQuestion
        year="Vår 2021"
        title="Skole — finnSnitt(kode, år)"
        description="Skole (kurs: List<Kurs>), Kurs (kode: String, år: Integer, karakterer: List<Integer>). Sekvensdiagram: finn kurs med riktig kode og år → sum alle karakterer → returner snitt."
        code={`// ── Skole ──
public class Skole {
    private List<Kurs> kurs = new ArrayList<>();

    /**
     * Beregner snittkarakter for et kurs et gitt år.
     * @param kode kurskode
     * @param ar   årstall
     * @return snittkarakter
     */
    public Double finnSnitt(String kode, Integer ar) {
        for (Kurs k : kurs) {
            if (k.getKode().equals(kode) && k.getAr().equals(ar)) {
                return k.beregnSnitt();
            }
        }
        return 0.0; // ikke funnet
    }
}

// ── Kurs ──
public class Kurs {
    private String kode;
    private Integer ar;
    private List<Integer> karakterer = new ArrayList<>();

    public String getKode() { return kode; }
    public Integer getAr() { return ar; }

    public Double beregnSnitt() {
        if (karakterer.isEmpty()) return 0.0;
        Integer sum = 0;
        for (Integer k : karakterer) { sum += k; }
        return (double) sum / karakterer.size();
    }
}`}
        note="Merknad fra professor: antar at karakter er Integer og snitt er Double."
      />

      <ExamQuestion
        year="Vår 2022"
        title="Butikk — handle() i Kunde"
        description="Kunde (handlekurv: Handlekurv), Handlekurv (varer: List<Vare>), Butikk. Sekvensdiagram: for alle varer i handlekurven → finn vare i butikken → legg til i handlekurv → betal."
        code={`// ── Kunde ──
public class Kunde {
    private Handlekurv handlekurv = new Handlekurv();

    /**
     * Kunden handler i butikken.
     * @param butikk butikken det handles i
     */
    public void handle(Butikk butikk) {
        List<Vare> varer = handlekurv.getVarer();
        for (Vare vare : varer) {
            Vare funnet = butikk.finnVare(vare.getNavn());
            if (funnet != null) {
                handlekurv.leggTil(funnet);
            }
        }
        handlekurv.betal();
    }
}

// ── Handlekurv ──
public class Handlekurv {
    private List<Vare> varer = new ArrayList<>();
    public List<Vare> getVarer() { return varer; }
    public void leggTil(Vare vare) {}
    public void betal() {}
}

// ── Butikk ──
public class Butikk {
    private List<Vare> lager = new ArrayList<>();
    public Vare finnVare(String navn) { return null; }
}

// ── Vare ──
public class Vare {
    private String navn;
    private Double pris;
    public String getNavn() { return navn; }
    public Double getPris() { return pris; }
}`}
        note="Diagrammet definerer HVERT kall i metoden. Gjør BARE det diagrammet sier."
      />

      <ExamQuestion
        year="Konteeksamen 2023"
        title="Terningspill — spill() i Spiller, trill() og getSum() i Kopp"
        description="Spill (spillere: List<Spiller>, kopp: Kopp), Spiller (kopp: Kopp), Kopp (terninger: List<Terning>), Terning (verdi: Integer). Sekvensdiagram: Spill → for alle spillere: spiller.spill(kopp). Kopp.trill() → for alle terninger: terning.trill(). Kopp.getSum() → summer alle verdier."
        code={`// ── Spiller ──
public class Spiller {
    private String navn;

    /**
     * Spilleren spiller ett trekk med koppen.
     * @param kopp kopp med terninger
     */
    public void spill(Kopp kopp) {
        kopp.trill();
        Integer sum = kopp.getSum();
        // videre logikk basert på sekvensdiagrammet...
    }
}

// ── Kopp ──
public class Kopp {
    private List<Terning> terninger = new ArrayList<>();

    /**
     * Triller alle terningene i koppen.
     */
    public void trill() {
        for (Terning terning : terninger) {
            terning.trill();
        }
    }

    /**
     * Returnerer summen av alle terningverdier.
     * @return summen
     */
    public Integer getSum() {
        Integer sum = 0;
        for (Terning terning : terninger) {
            sum += terning.getVerdi();
        }
        return sum;
    }
}

// ── Terning ──
public class Terning {
    private Integer verdi;

    public void trill() {
        verdi = (int)(Math.random() * 6) + 1;
    }

    public Integer getVerdi() { return verdi; }
}`}
        note="Kopp er et eksempel på 'Ren fabrikkering' (GRASP Pure Fabrication) — en hjelpeklasse som ikke finnes i domenemodellen, men som gjør koden bedre."
      />

      <ExamQuestion
        year="Januar 2023"
        title="Handlekurv — betal()"
        description="Handlekurv (varer: List<Vare>). Sekvensdiagram: for alle varer → vare.getPris() → summer → returner total."
        code={`// ── Handlekurv ──
public class Handlekurv {
    private List<Vare> varer = new ArrayList<>();

    /**
     * Betaler for alle varer i handlekurven.
     * @return total beløp
     */
    public Double betal() {
        Double total = 0.0;
        for (Vare vare : varer) {
            total += vare.getPris();
        }
        return total;
    }

    public List<Vare> getVarer() { return varer; }
    public void leggTilVare(Vare vare) { varer.add(vare); }
}

// ── Vare ──
public class Vare {
    private String navn;
    private Double pris;
    public String getNavn() { return navn; }
    public Double getPris() { return pris; }
}`}
      />

      {/* ── 5. Eksamensoppskrift ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">
        5. Steg-for-steg oppskrift til eksamen
      </h2>

      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6">
        <h3 className="font-bold text-base mb-4 text-sysdev-700 dark:text-sysdev-400">
          Oppgave 4a — Skriv Java-skall (gjør i denne rekkefølgen)
        </h3>
        <ol className="space-y-3">
          {[
            {
              step: "1",
              title: "Identifiser typen av hver klasse",
              desc: 'Kursiv / {abstract} = abstract class. <<interface>> = interface. Resten = vanlig class. Legg dette øverst.',
            },
            {
              step: "2",
              title: "Skriv arv og grensesnitt",
              desc: "Pil med tomt pilhode = extends/implements. Subklasser arver fra superklasser.",
            },
            {
              step: "3",
              title: "Legg til attributter",
              desc: "+ = public, - = private. Type er angitt etter :. Multiplisitet > 1 = List<Type>.",
            },
            {
              step: "4",
              title: "Legg til metodesignaturer",
              desc: "Bare signaturen — IKKE implementasjon. Abstrakte metoder: abstract i abstrakt klasse, ingen body i interface.",
            },
            {
              step: "5",
              title: "Legg til @Override",
              desc: "Alle metoder som er definert i superklasse/grensesnitt og implementert i subklasse trenger @Override.",
            },
            {
              step: "6",
              title: "Legg til JavaDoc",
              desc: "/** ... */ over klasse og alle metoder. Gir plusspoeng!",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sysdev-500 text-white text-xs font-bold flex items-center justify-center">
                {item.step}
              </span>
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-[var(--muted)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </ol>

        <div className="mt-6 pt-4 border-t border-sysdev-200 dark:border-sysdev-800/40">
          <h3 className="font-bold text-base mb-4 text-sysdev-700 dark:text-sysdev-400">
            Oppgave 4b — Implementer metoden
          </h3>
          <ol className="space-y-3">
            {[
              {
                step: "1",
                title: "Les hele sekvensdiagrammet",
                desc: "Finn ut hvilken klasse som er fokus (den som eier metoden du skal implementere).",
              },
              {
                step: "2",
                title: "Identifiser alle piler inn og ut",
                desc: "Piler som går UT fra fokus-objektet = metodekall du skal skrive. Piler inn = du er mottaker (ikke implementer).",
              },
              {
                step: "3",
                title: "Oversett boks for boks",
                desc: "Loop → for-løkke. Alt → if/else. Opt → if. Returverdi → variabel.",
              },
              {
                step: "4",
                title: "Bruk feltene som finnes",
                desc: "Objektene du kaller metoder på tilsvarer feltene i klassen. Brett = this.brett, spillere = this.spillere etc.",
              },
              {
                step: "5",
                title: "Skriv ned antagelser",
                desc: 'Hvis noe er uklart i diagrammet: "Jeg antar at..." — dette gir poeng selv om løsningen er litt annerledes.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </ol>
        </div>
      </div>

      {/* ── 6. JavaDoc-mal ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">6. JavaDoc-mal</h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        Professorens standard JavaDoc. Gir plusspoeng på eksamen. Lær dette
        mønsteret utenat.
      </p>
      <Code
        code={`/**
 * Klasse for å representere [hva klassen er].
 *
 * @author Ditt Navn
 */
public class MinKlasse {

    private String felt;

    /**
     * Oppretter et nytt MinKlasse-objekt.
     *
     * @param felt verdi for feltet
     */
    public MinKlasse(String felt) {
        this.felt = felt;
    }

    /**
     * Utfører [hva metoden gjør].
     *
     * @param param1 beskrivelse av parameter 1
     * @return beskrivelse av returverdi
     */
    public String minMetode(String param1) {
        return felt + param1;
    }

    /**
     * Henter verdien av feltet.
     *
     * @return the felt
     */
    public String getFelt() {
        return felt;
    }

    /**
     * Setter verdien av feltet.
     *
     * @param felt the felt to set
     */
    public void setFelt(String felt) {
        this.felt = felt;
    }
}`}
      />

      {/* ── 7. Vanligste mønstre ── */}
      <h2 className="text-xl font-bold mt-8 mb-3">7. Gjentakende mønstre</h2>
      <p className="text-sm text-[var(--muted)] mb-4">
        2020–2024: Oppgave 4 følger alltid ett av disse mønstrene.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            title: "Mønster A — Summer over liste",
            years: "2021, 2022, 2023, 2024",
            code: `public Double summer() {
    Double total = 0.0;
    for (Element e : elementer) {
        total += e.getVerdi();
    }
    return total;
}`,
          },
          {
            title: "Mønster B — Finn og gjør noe",
            years: "2021, 2022",
            code: `public Resultat finn(String kode) {
    for (Element e : elementer) {
        if (e.getKode().equals(kode)) {
            return e.behandle();
        }
    }
    return null;
}`,
          },
          {
            title: "Mønster C — Delegere til underlist",
            years: "2020, 2023",
            code: `public void utfor() {
    for (Element e : elementer) {
        e.utfor(ressurs);
    }
}`,
          },
          {
            title: "Mønster D — Betinget handling",
            years: "2023, 2024",
            code: `public void betinget() {
    for (Element e : elementer) {
        Pos p = e.getPos();
        if (p.getX() > 0 && p.getY() > 0) {
            e.utfor();
        }
    }
}`,
          },
        ].map((pattern) => (
          <div
            key={pattern.title}
            className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-[var(--card-border)] bg-neutral-50 dark:bg-neutral-800/50">
              <div className="font-bold text-sm">{pattern.title}</div>
              <div className="text-xs text-[var(--muted)]">
                Brukt i: {pattern.years}
              </div>
            </div>
            <div className="p-3">
              <Code code={pattern.code} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Hurtigreferanse ── */}
      <div className="mt-8 rounded-xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 p-6">
        <h2 className="font-bold text-lg mb-4 text-amber-700 dark:text-amber-400">
          Hurtigreferanse — Eksamen 4a og 4b
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { uml: "Kursiv / {abstract}", java: "abstract class" },
            { uml: "<<interface>>", java: "interface" },
            { uml: "+ (public)", java: "public" },
            { uml: "- (private)", java: "private" },
            { uml: "# (protected)", java: "protected" },
            { uml: "Pil opp = arv", java: "extends / implements" },
            { uml: "Multiplisitet 1", java: "Type felt;" },
            { uml: "Multiplisitet 2..*", java: "List<Type> felt = new ArrayList<>()" },
            { uml: "Komposisjon (◆)", java: "new Type() i konstruktør" },
            { uml: "Abstrakt metode", java: "abstract void metode();" },
            { uml: "Loop-boks", java: "for / while" },
            { uml: "Alt-boks", java: "if / else" },
            { uml: "Opt-boks", java: "if (uten else)" },
            { uml: "Pil = melding", java: "objekt.metode()" },
            { uml: "Returverdi", java: "Type var = objekt.metode()" },
          ].map((item) => (
            <div
              key={item.uml}
              className="flex items-center gap-2 rounded-lg bg-white/60 dark:bg-neutral-900/40 border border-amber-200 dark:border-amber-800/40 p-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-amber-700 dark:text-amber-400 truncate">
                  {item.uml}
                </p>
                <p className="text-xs font-mono text-neutral-600 dark:text-neutral-300 truncate">
                  {item.java}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
