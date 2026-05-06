"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { eksamenPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Section, Solution, Code } from "@/components/dat109/EksamenComponents";

export default function Oppgave4OopPage() {
  return (
    <div>
      <DAT109SubNav basePath={dat109BasePaths.eksamen} pages={eksamenPages} />

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
        <Link
          href="/dat109/eksamen"
          className="hover:text-[var(--accent)]"
        >
          Eksamen
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">
          Oppgave 4 — OOP
        </span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Oppgave 4 — OOP (Java fra UML)
        </h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Java-skall fra klassediagram + metode-implementasjon fra
          sekvensdiagram. Forutsigbar struktur med fasit fra 6 eksamener.
          ~20 % av eksamen.
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 mb-4">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
            Oppgave 4 er alltid identisk format
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--muted)]">
            <div>
              <strong>4a) Java-skall fra klassediagram</strong>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                <li>Klasser, felt og metodesignaturer</li>
                <li>Ingen import, konstruktør eller get/set</li>
                <li>Arv (extends) og grensesnitt (implements)</li>
              </ul>
            </div>
            <div>
              <strong>4b) Implementer metode fra sekvensdiagram</strong>
              <ul className="mt-1 space-y-0.5 list-disc list-inside">
                <li>Pil = metodekall, loop = for, alt = if/else</li>
                <li>Gjør BARE det diagrammet sier</li>
                <li>JavaDoc gir plusspoeng (fra 2024)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2024 */}
        <Section
          title="Eksamen vår 2024 — Lerret/Figur"
          badge="Nyeste"
          badgeColor="red"
          defaultOpen={true}
        >
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm space-y-2 mb-3">
            <p>
              <strong>Oppgave:</strong> Tegneprogram med Lerret, grensesnitt
              Figur, Sirkel, Rektangel og Posisjon. Implementer finnAreal()
              og tegn() i Lerret basert på sekvensdiagram.
            </p>
            <p>
              <strong>Nytt i 2024:</strong> To metoder skal implementeres
              (ikke bare én). JavaDoc gir plusspoeng.
            </p>
          </div>
          <Solution>
            <Code
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
     * Tegner alle figurer innenfor lerretets grenser.
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
    public Double getX() { return x; }
    public Double getY() { return y; }
}

// ── Sirkel ──
public class Sirkel implements Figur {
    private Double radius;
    private Posisjon pos;

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

    @Override
    public Double areal() { return bredde * hoyde; }
    @Override
    public Posisjon getPos() { return pos; }
    @Override
    public void tegn() { /* tegner rektangelet */ }
}`}
            />
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
              <strong className="text-amber-700 dark:text-amber-400">
                Sensor ser etter:
              </strong>{" "}
              @Override på alle interface-metoder, private felt, riktig
              bruk av List/ArrayList, JavaDoc på begge metoder.
            </div>
          </Solution>
        </Section>

        {/* 2023 vår */}
        <Section
          title="Eksamen vår 2023 — Canvas/Figure"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
            <p>
              <strong>Oppgave:</strong> Canvas med List&lt;Figure&gt;,
              interface Figure (area(), getPos()), Position, Circle, Square.
              Implementer totalArea() i Canvas.
            </p>
          </div>
          <Solution label="Vis professorens offisielle fasit">
            <Code
              code={`// ── Canvas (professorens kode) ──
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

// ── Figure (interface) ──
public interface Figure {
    Double area();
    Position getPos();
}

// ── Position ──
public class Position {
    private Double x;
    private Double y;
    public Position(Double x, Double y) { this.x = x; this.y = y; }
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
        this.radius = radius; this.pos = pos;
    }
    @Override
    public Double area() { return Math.PI * radius * radius; }
    @Override
    public Position getPos() { return pos; }
}

// ── Square ──
public class Square implements Figure {
    private Double side;
    private Position pos;
    public Square(Double side, Position pos) {
        this.side = side; this.pos = pos;
    }
    @Override
    public Double area() { return side * side; }
    @Override
    public Position getPos() { return pos; }
}`}
            />
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3 text-sm">
              <strong className="text-emerald-700 dark:text-emerald-400">
                Merknad fra professor:
              </strong>{" "}
              Attributten pos i Figure-grensesnittet flyttes til Circle og
              Square — Java-grensesnitt kan ikke ha attributter. Skriv ned
              antagelsen!
            </div>
          </Solution>
        </Section>

        {/* 2021 */}
        <Section
          title="Eksamen vår 2021 — Skole/Student"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
            <p>
              <strong>Oppgave:</strong> Skole med List&lt;Student&gt; og
              List&lt;Kurs&gt;. Student med List&lt;Karakter&gt;. Implementer
              finnSnitt(kode, år) i Skole.
            </p>
          </div>
          <Solution>
            <Code
              code={`// Klasseskall (fasit):
public class Skole {
    private String navn;
    private List<Student> studenter;
    private List<Kurs> kurs;
    public Double finnSnitt(String kode, Integer år) { }
    public Double oppdaterSnitt(Integer karakter) { }
}

public class Student {
    private Integer studentNr;
    private String navn;
    private List<Karakter> karakterer;
    public Integer finnKarakter(String kode, Integer år) { }
}

public class Karakter {
    private Integer karakter;
    private Integer år;
    public Integer finnKarakter(String kode, Integer år) { }
}

public class Kurs {
    private String kode;
    private String navn;
}

// Implementasjon av finnSnitt (følger sekvensdiagrammet):
public Double finnSnitt(String kode, Integer år) {
    Double snitt = 0.0;
    for (Student student : studenter) {
        Integer karakter = student.finnKarakter(kode, år);
        if (karakter != null) {
            snitt = oppdaterSnitt(karakter);
        }
    }
    return snitt;
}`}
            />
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
              <strong className="text-amber-700 dark:text-amber-400">
                Sensors kommentar:
              </strong>{" "}
              &quot;Her er jeg kun ute etter skall som samsvarer med
              UML-diagrammene og en implementert metode som gjør nøyaktig
              det sekvensdiagrammet sier. Ikke interessert i feilretting
              og forbedringer.&quot;
            </div>
          </Solution>
        </Section>

        {/* 2022 vår */}
        <Section title="Eksamen vår 2022 — Kunde/Bestilling">
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
            <p>
              <strong>Oppgave:</strong> Kunde med Vareutvalg og Bestilling.
              Implementer handle() i Kunde basert på sekvensdiagram.
            </p>
          </div>
          <Solution>
            <Code
              code={`// Klasseskall:
public class Kunde {
    private String navn;
    private Vareutvalg varer;
    private Bestilling bestilling;
    public void handle() { }
    public void kjøp() { }
}

public class Bestilling {
    private List<Vare> varer;
    public void leggTil(Vare vare) { }
    public void fullfør() { }
}

public class Vareutvalg {
    private List<Vare> varer;
    public Vare finnVare() { }
}

public class Vare {
    private String navn;
    private String nr;
    public void reserver() { }
    public void send() { }
}

// handle() — følger sekvensdiagrammet:
public void handle() {
    // Antar: looper til finnVare() returnerer null
    Vare vare = varer.finnVare();
    while (vare != null) {
        bestilling.leggTil(vare);  // leggTil kaller reserver() internt
        vare = varer.finnVare();
    }
}`}
            />
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
              <strong className="text-amber-700 dark:text-amber-400">
                Tips:
              </strong>{" "}
              Oppgaven sier &quot;du må definere når kunden er ferdig å
              handle&quot; — skriv ned din antagelse! Sensor aksepterer
              ulike tilnærminger.
            </div>
          </Solution>
        </Section>

        {/* Jan 2023 konte */}
        <Section title="Konteeksamen jan 2023 — Handlekurv + Terningspill">
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
            <p>
              <strong>Del 1:</strong> Handlekurv med List&lt;Vare&gt;.
              Implementer betal().
            </p>
            <p>
              <strong>Del 2:</strong> Terningspill med Spiller, Kopp og
              Terning. Implementer spill(), trill() og getSum().
            </p>
          </div>
          <Solution>
            <Code
              code={`// ── Handlekurv ──
public class Handlekurv {
    private List<Vare> varer = new ArrayList<>();

    public void betal() {
        Double sum = 0.0;
        for (Vare vare : varer) {
            sum += vare.getPris();
        }
        return; // antagelse: sum brukes videre
    }
}

// ── Terningspill ──
public class Spiller {
    private String navn;
    private Kopp kopp;

    public void spill() {
        kopp.trill();
        int sum = kopp.getSum();
    }
}

public class Kopp {
    private List<Terning> terninger;

    public void trill() {
        for (Terning terning : terninger) {
            terning.trill();
        }
    }

    public int getSum() {
        int sum = 0;
        for (Terning terning : terninger) {
            sum += terning.getVerdi();
        }
        return sum;
    }
}

public class Terning {
    private int verdi;
    public void trill() { verdi = (int)(Math.random() * 6) + 1; }
    public int getVerdi() { return verdi; }
}`}
            />
          </Solution>
        </Section>

        {/* 2020 */}
        <Section
          title="Eksamen høst 2020 — Kortspill"
          badge="Med fasit"
          badgeColor="emerald"
        >
          <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 text-sm mb-3">
            <p>
              <strong>Oppgave:</strong> Kortspill med Kortstokk og Spillere.
              Del ut 2 kort til hver spiller. Implementer spill().
            </p>
          </div>
          <Solution>
            <Code
              code={`// Klasseskall:
public class Kortspill {
    private List<Spiller> spillere = new ArrayList<>();
    private Kortstokk stokk;
    public void leggTiSpiller(String navn) { }
    public void spill() { }
}

public class Kortstokk {
    private List<Kort> kort;
    public void stokk() { }
    public Kort hentNesteKort() { }
}

public class Kort {
    private Integer id;
    private String farge;
    private Integer verdi;
}

public class Spiller {
    private String navn;
    private List<Kort> kort;
    public void delUtKort(Kort kort) { }
    public Integer getPoeng() { }
}

// spill() — følger sekvensdiagrammet:
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
}`}
            />
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 text-sm">
              <strong className="text-amber-700 dark:text-amber-400">
                NB 2020-format:
              </strong>{" "}
              Denne eksamen krevde konstruktører (ulikt 2021+). OOP var
              oppgave 5 (15%), ikke oppgave 4 (20%).
            </div>
          </Solution>
        </Section>
      </div>
    </div>
  );
}
