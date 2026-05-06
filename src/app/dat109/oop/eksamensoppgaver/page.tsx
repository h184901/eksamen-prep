"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { oopPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { ExamQuestion } from "@/components/dat109/OopComponents";

export default function EksamensoppgaverPage() {
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
        <span className="text-[var(--foreground)]">Eksamensoppgaver</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Alle eksamensoppgaver med løsning</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Komplette løsninger for Oppgave 4 fra 2020 til 2024. Klikk &quot;Vis løsning&quot; for å se
          fullstendig kode med JavaDoc og merknader.
        </p>
      </div>

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
    </div>
  );
}
