"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { oopPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Code, RuleCard } from "@/components/dat109/OopComponents";

export default function UmlTilJavaPage() {
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
        <span className="text-[var(--foreground)]">UML → Java</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UML → Java</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          UML-notasjonen du må kunne huske, hvordan abstrakte klasser og grensesnitt skrives,
          samt <code className="font-mono text-xs">toString</code>, <code className="font-mono text-xs">equals</code>,
          {" "}<code className="font-mono text-xs">hashCode</code> og enum-typer.
        </p>
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
    </div>
  );
}
