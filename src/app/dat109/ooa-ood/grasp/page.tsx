"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Sub-navigation ── */
function SubNav() {
  return (
    <div className="sticky top-0 z-20 -mx-4 px-4 py-2 mb-6 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide text-sm">
        {[
          { href: "/dat109/ooa-ood", label: "Oversikt" },
          { href: "/dat109/ooa-ood/solid", label: "SOLID" },
          { href: "/dat109/ooa-ood/grasp", label: "GRASP", active: true },
          { href: "/dat109/ooa-ood/eksamen", label: "Eksamen" },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              tab.active
                ? "bg-sysdev-500 text-white"
                : "text-[var(--muted)] hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Collapsible section ── */
function Section({
  number,
  title,
  titleEn,
  isOpen,
  onToggle,
  children,
}: {
  number: number;
  title: string;
  titleEn: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] my-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-bold shrink-0">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg">{title}</div>
          <div className="text-sm text-[var(--muted)]">{titleEn}</div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="px-6 pb-6 space-y-5">{children}</div>}
    </div>
  );
}

/* ── Code block ── */
function CodeBlock({ title, variant, children }: { title: string; variant: "bad" | "good" | "neutral"; children: string }) {
  const styles = {
    bad: { border: "border-red-400 dark:border-red-600", bg: "bg-red-50 dark:bg-red-950/20", label: "text-red-600 dark:text-red-400", icon: "\u2717" },
    good: { border: "border-green-400 dark:border-green-600", bg: "bg-green-50 dark:bg-green-950/20", label: "text-green-600 dark:text-green-400", icon: "\u2713" },
    neutral: { border: "border-blue-400 dark:border-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20", label: "text-blue-600 dark:text-blue-400", icon: "\u25B6" },
  };
  const s = styles[variant];
  return (
    <div className={`rounded-xl border-2 ${s.border} ${s.bg} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`${s.label} font-bold text-sm`}>{s.icon} {title}</span>
      </div>
      <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 text-[13px] leading-relaxed overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── Main page ── */
export default function GraspPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    expert: true, creator: true, coupling: true, cohesion: true,
    controller: true, polymorphism: true, fabrication: true,
    indirection: true, protected: true,
  });
  const toggle = (k: string) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">Hjem</Link>
        <span>/</span>
        <Link href="/dat109" className="hover:text-[var(--accent)]">DAT109</Link>
        <span>/</span>
        <Link href="/dat109/ooa-ood" className="hover:text-[var(--accent)]">OOA og OOD</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">GRASP</span>
      </div>

      <SubNav />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">GRASP-mønstrene</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          General Responsibility Assignment Software Patterns — 9 prinsipper for å bestemme
          <strong> hvem som skal ha ansvaret for hva</strong> i et objektorientert system.
          Fra Craig Larmans bok &quot;Applying UML and Patterns&quot;.
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 mb-6">
        <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Når brukes GRASP?</h3>
        <p className="text-sm text-[var(--muted)]">
          Hver gang du lager et <strong>sekvensdiagram</strong> og bestemmer &quot;hvilken klasse bør få
          denne metoden?&quot; — da bruker du GRASP. Prinsippene hjelper deg å plassere ansvar
          på riktig sted, slik at koden blir ryddig, gjenbrukbar og enkel å vedlikeholde.
        </p>
      </div>

      {/* ═══════ 1. Information Expert ═══════ */}
      <Section number={1} title="Informasjonsekspert" titleEn="Information Expert" isOpen={open.expert} onToggle={() => toggle("expert")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvem skal ha ansvaret for å utføre en oppgave? <strong>Den klassen som har informasjonen som trengs.</strong></p>
        </div>

        <p className="text-sm">
          Dette er det viktigste GRASP-prinsippet. Når du lurer på &quot;hvem skal ha denne metoden?&quot;,
          spør deg: <em>&quot;Hvem har dataene som trengs for å gjøre dette?&quot;</em>
        </p>

        <CodeBlock title="Monopol-eksempelet (fra forelesning)" variant="neutral">
{`// Hvem skal finne en rute basert på posisjon?
// Brettet! Fordi brettet INNEHOLDER rutene.

class Brett {
    private List<Rute> ruter;

    // Brett har informasjonen (rutene) → Brett er eksperten
    public Rute finnRute(int posisjon) {
        return ruter.get(posisjon % ruter.size());
    }
}

// FEIL: La Spilleren finne ruter
class Spiller {
    // Spilleren VET IKKE om rutene — har ikke den informasjonen
    // public Rute finnRute(int pos) { ... }  ← GALT!
}`}
        </CodeBlock>

        <CodeBlock title="Eksempel fra eksamen 2023 (Canvas/Figure)" variant="neutral">
{`// Hvem beregner arealet av en figur?
// Figuren selv — fordi den kjenner sine egne dimensjoner!

abstract class Figur {
    public abstract double areal();  // Figuren er eksperten
}

class Sirkel extends Figur {
    private double radius;
    public double areal() {
        return Math.PI * radius * radius;  // Kjenner sin radius
    }
}

class Rektangel extends Figur {
    private double bredde, høyde;
    public double areal() {
        return bredde * høyde;  // Kjenner sine dimensjoner
    }
}`}
        </CodeBlock>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Eksamensfelle</h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.3:</strong> &quot;Hva er informasjonsekspert?&quot; — Riktig svar: <strong>c) Et prinsipp for å tildele ansvar til objekt.</strong>
            Merk: &quot;objekt&quot;, ikke &quot;klasse&quot; — GRASP handler om hvilke objekter som skal gjøre hva i et sekvensdiagram.
          </p>
        </div>
      </Section>

      {/* ═══════ 2. Creator ═══════ */}
      <Section number={2} title="Skaper" titleEn="Creator" isOpen={open.creator} onToggle={() => toggle("creator")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvem skal opprette nye objekter? <strong>Den klassen som eier, inneholder, eller bruker objektet.</strong></p>
        </div>

        <p className="text-sm">
          Klasse B bør opprette objekter av klasse A dersom B oppfyller minst ett av disse (BCORI):
        </p>
        <ul className="text-sm space-y-1 ml-4">
          <li><strong>B</strong> inneholder/aggregerer A (komposisjon)</li>
          <li><strong>C</strong> — B bruker (closely uses) A</li>
          <li><strong>O</strong> — B eier A</li>
          <li><strong>R</strong> — B registrerer/logger A</li>
          <li><strong>I</strong> — B har initialiseringsdataene for A</li>
        </ul>

        <CodeBlock title="Monopol-eksempelet (fra forelesning F04)" variant="neutral">
{`class Monopol {
    private Brett brett;
    private List<Spiller> spillere;
    private Kopp kopp;

    // Monopol oppretter Brett, Spillere og Kopp
    // fordi Monopol INNEHOLDER dem (komposisjon)
    public Monopol(int antallSpillere) {
        this.brett = new Brett();       // ← Monopol er Creator for Brett
        this.kopp = new Kopp();         // ← Monopol er Creator for Kopp
        this.spillere = new ArrayList<>();
        for (int i = 0; i < antallSpillere; i++) {
            spillere.add(new Spiller()); // ← Monopol er Creator for Spiller
        }
    }
}

class Brett {
    private List<Rute> ruter;

    public Brett() {
        // Brett oppretter Ruter — fordi Brett EIER rutene (komposisjon)
        this.ruter = new ArrayList<>();
        ruter.add(new StartRute());
        ruter.add(new VanligRute("Parkveien"));
        // ...
    }
}

class Kopp {
    private Terning t1, t2;

    public Kopp() {
        // Kopp oppretter Terninger — fordi Kopp INNEHOLDER dem
        this.t1 = new Terning();
        this.t2 = new Terning();
    }
}`}
        </CodeBlock>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Eksamensfelle</h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.4:</strong> &quot;Hva er en skaper fra GRASP?&quot; — Riktig svar: <strong>b) Hvem som skal være ansvarlig for å lage en ny forekomst av en klasse.</strong>
            Alternativ d (&quot;forekomst av et objekt&quot;) er feil — du lager forekomst av en <em>klasse</em>, ikke av et objekt.
          </p>
        </div>
      </Section>

      {/* ═══════ 3. Low Coupling ═══════ */}
      <Section number={3} title="Lav kobling" titleEn="Low Coupling" isOpen={open.coupling} onToggle={() => toggle("coupling")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvordan holde avhengigheter mellom klasser på et minimum? <strong>En klasse bør ikke kjenne til for mange andre klasser.</strong></p>
        </div>

        <p className="text-sm">
          Kobling = hvor mye en klasse vet om andre klasser. Høy kobling betyr at endringer i én klasse
          kan knekke mange andre. Målet er at klasser er så uavhengige som mulig.
        </p>

        <CodeBlock title="Monopol: Høy kobling (dårlig)" variant="bad">
{`class Spiller {
    // Spilleren kjenner til mange klasser direkte!
    private Terning t1;
    private Terning t2;
    private Brett brett;
    private Bank bank;

    public int trill() {
        return t1.trill() + t2.trill(); // Kjenner begge terningene
    }
}`}
        </CodeBlock>

        <CodeBlock title="Monopol: Lav kobling (bra)" variant="good">
{`class Spiller {
    // Spilleren kjenner bare Kopp — ikke terningene direkte!
    // Kopp kapsler inn terningene.
}

class Kopp {
    private Terning t1;
    private Terning t2;

    public int trill() {
        return t1.trill() + t2.trill();
    }
}

// Nå kjenner Spilleren bare Kopp.
// Kopp kjenner Terningene.
// → Lavere kobling for Spilleren!`}
        </CodeBlock>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">Kobling til SOLID</h4>
          <p className="text-sm text-[var(--muted)]">
            Lav kobling henger tett sammen med <strong>DIP</strong> (Dependency Inversion) — ved å bruke grensesnitt
            istedenfor konkrete klasser reduserer du koblingen drastisk. Også koblet til <strong>OCP</strong> — lav kobling gjør det
            enklere å utvide uten å endre.
          </p>
        </div>
      </Section>

      {/* ═══════ 4. High Cohesion ═══════ */}
      <Section number={4} title="Høy samhørighet" titleEn="High Cohesion" isOpen={open.cohesion} onToggle={() => toggle("cohesion")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvordan holde klasser fokuserte? <strong>Alt inni en klasse skal henge sammen og handle om det samme.</strong></p>
        </div>

        <p className="text-sm">
          Samhørighet (cohesion) = hvor mye metodene og dataene i en klasse hører sammen.
          Høy samhørighet = klassen gjør <em>én ting</em> og gjør den godt.
          Lav samhørighet = klassen er en &quot;søppelbøtte&quot; med urelaterte ting.
        </p>

        <CodeBlock title="Lav samhørighet (dårlig)" variant="bad">
{`class Spiller {
    private String navn;
    private int poeng;
    private Connection dbConnection; // ← Hører ikke hjemme her!

    public void spillTur() { /* spillogikk */ }
    public void tegnPåSkjerm() { /* UI-kode */ }
    public void lagreTilDB() { /* databasekode */ }
    public void genererPDF() { /* rapportkode */ }
    // Mange urelaterte oppgaver → lav samhørighet
}`}
        </CodeBlock>

        <CodeBlock title="Høy samhørighet (bra)" variant="good">
{`class Spiller {
    private String navn;
    private int poeng;

    public void spillTur() { /* spillogikk */ }
    public int getPoeng() { return poeng; }
    public String getNavn() { return navn; }
    // Alt handler om spilleren → høy samhørighet
}
// UI, database og rapporter hører hjemme i egne klasser`}
        </CodeBlock>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">Kobling til SOLID</h4>
          <p className="text-sm text-[var(--muted)]">
            High Cohesion er <strong>nesten identisk</strong> med SOLID <strong>SRP</strong> (Single Responsibility Principle).
            Begge sier: en klasse skal ha ett fokusert ansvarsområde.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Eksamensfelle</h4>
          <p className="text-sm">
            <strong>2024:</strong> &quot;En klasse har mange metoder og instansvariabler relatert til mange ulike oppgaver — hvilket GRASP-prinsipp er brutt?&quot;
            → Svaret er <strong>High Cohesion</strong>. Spørsmålet spør spesifikt om GRASP, ikke SOLID — ellers ville SRP også vært riktig.
          </p>
        </div>
      </Section>

      {/* ═══════ 5. Controller ═══════ */}
      <Section number={5} title="Kontroller" titleEn="Controller" isOpen={open.controller} onToggle={() => toggle("controller")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvem mottar og koordinerer systemhendelser fra UI-laget? <strong>En kontroller-klasse som delegerer arbeid videre.</strong></p>
        </div>

        <p className="text-sm">
          Kontrolleren er mellomlaget mellom brukergrensesnittet og domenelogikken.
          UI-et snakker <strong>bare</strong> med kontrolleren. Kontrolleren delegerer til de riktige domene-objektene.
        </p>

        <CodeBlock title="Monopol — kontrollermønsteret (fra forelesning)" variant="neutral">
{`// Arkitekturen har 3 lag:
// UI-lag → Kontroller → Domenelag (modell)

// Kontrolleren (Monopol-klassen):
class Monopol {  // ← Dette er kontrolleren
    private Brett brett;
    private List<Spiller> spillere;
    private Kopp kopp;

    // UI kaller BARE denne metoden:
    public void spill() {
        for (int runde = 0; runde < 20; runde++) {
            for (Spiller s : spillere) {
                spillRunde(s);
            }
        }
    }

    private void spillRunde(Spiller s) {
        int sum = kopp.trill();          // Delegerer til Kopp
        Rute rute = brett.flytt(s, sum); // Delegerer til Brett
        rute.landetPå(s);               // Delegerer til Rute
    }
}

// UI-laget snakker ALDRI direkte med Brett, Spiller eller Terning.
// Alt går via Monopol (kontrolleren).`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Slik gjenkjenner du det</h4>
          <p className="text-sm">
            Kontrolleren er typisk klassen som heter det samme som systemet (Monopol, Stigespill, MaxMummelmann)
            eller brukstilfellet. Den har en &quot;start&quot;-metode (<code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded text-xs">spill()</code>,{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded text-xs">start()</code>) som UI-et kaller.
          </p>
        </div>
      </Section>

      {/* ═══════ 6. Polymorphism ═══════ */}
      <Section number={6} title="Polymorfi" titleEn="Polymorphism" isOpen={open.polymorphism} onToggle={() => toggle("polymorphism")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvordan håndtere oppførsel som varierer basert på type? <strong>Bruk polymorfi (overstyrte metoder) istedenfor if/else-kjeder.</strong></p>
        </div>

        <p className="text-sm">
          Når du har mange <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded text-xs">if/else</code> eller{" "}
          <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded text-xs">instanceof</code>-sjekker for å bestemme hva som skal skje basert på objektets type,
          er det et tegn på at du burde bruke polymorfi i stedet.
        </p>

        <CodeBlock title="DÅRLIG: if/else-kjede basert på type" variant="bad">
{`// I Monopol — hva skjer når spilleren lander?
public void landetPå(Rute rute, Spiller spiller) {
    if (rute instanceof StartRute) {
        spiller.leggTilPenger(2000);
    } else if (rute instanceof InntektsskattRute) {
        spiller.trekkFraPenger(2000);
    } else if (rute instanceof SkjøteRute) {
        // kjøpslogikk...
    } else if (rute instanceof FengselsRute) {
        // fengselslogikk...
    }
    // Hver ny rutetype = ny else-if = endring i eksisterende kode!
}`}
        </CodeBlock>

        <CodeBlock title="BRA: polymorfi — fra professorens forelesning F05-F06" variant="good">
{`// Abstrakt superklasse med abstrakt metode:
abstract class Rute {
    public abstract void landetPå(Spiller spiller);
}

// Hver subklasse implementerer sin egen oppførsel:
class StartRute extends Rute {
    public void landetPå(Spiller spiller) {
        spiller.leggTilPenger(2000);  // Start gir penger
    }
}

class InntektsskattRute extends Rute {
    public void landetPå(Spiller spiller) {
        spiller.trekkFraPenger(2000);  // Skatt tar penger
    }
}

class SkjøteRute extends Rute {
    public void landetPå(Spiller spiller) {
        // Kjøpslogikk...
    }
}

// Nå: bare kall metoden — Java velger riktig versjon automatisk!
rute.landetPå(spiller);  // Polymorfi gjør jobben`}
        </CodeBlock>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">Kobling til SOLID</h4>
          <p className="text-sm text-[var(--muted)]">
            Polymorfi er nært knyttet til <strong>OCP</strong> (Open/Closed) — du kan legge til nye rutetyper uten å endre
            eksisterende kode. Også knyttet til <strong>LSP</strong> — subklassene må holde kontrakten til superklassen.
          </p>
        </div>
      </Section>

      {/* ═══════ 7. Pure Fabrication ═══════ */}
      <Section number={7} title="Rein fabrikkering" titleEn="Pure Fabrication" isOpen={open.fabrication} onToggle={() => toggle("fabrication")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hva gjør du når ingen domene-klasse passer for et ansvar? <strong>Lag en ny klasse som ikke finnes i den virkelige verden.</strong></p>
        </div>

        <p className="text-sm">
          Noen ganger finnes det ikke et naturlig &quot;hjem&quot; for en funksjon i domenemodellen.
          Da &quot;dikter du opp&quot; en helt ny klasse utelukkende for å holde koden ryddig.
          Klassen eksisterer bare i programvaren, ikke i den virkelige verden.
        </p>

        <CodeBlock title="Monopol: Kopp/Hatt-klassen" variant="neutral">
{`// I Monopol finnes det ingen "kopp" i spillereglene.
// Men Kopp er en nyttig klasse for å samle terningene:

class Kopp {  // ← Pure Fabrication — finnes ikke i domenet!
    private Terning t1;
    private Terning t2;

    public int trill() {
        return t1.trill() + t2.trill();
    }

    public int sum() {
        return t1.getVerdi() + t2.getVerdi();
    }
}

// Fordeler:
// - Spilleren slipper å kjenne til Terning-klassen (lav kobling)
// - Kopp har høy samhørighet (alt handler om terningkast)
// - Enkel å teste isolert`}
        </CodeBlock>

        <CodeBlock title="Et annet eksempel: DatabaseSaver" variant="neutral">
{`// Hvem skal lagre spillet til databasen?
// Ingen domeneklasse (Spiller, Brett, Terning) bør ha databasekode.
// Løsning: dikter opp en ny klasse!

class SpillRepository {  // ← Pure Fabrication
    public void lagre(Monopol spill) {
        // Databasekode her — isolert fra domeneklassene
    }

    public Monopol last(int spillId) {
        // Lastekode her
    }
}`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Slik gjenkjenner du det</h4>
          <p className="text-sm">
            Spør deg: &quot;Finnes denne klassen i den virkelige verden?&quot; Hvis svaret er nei, men klassen
            gjør koden bedre — da er det Pure Fabrication. Vanlige eksempler: Repository, Service, Factory, Handler.
          </p>
        </div>
      </Section>

      {/* ═══════ 8. Indirection ═══════ */}
      <Section number={8} title="Indireksjon" titleEn="Indirection" isOpen={open.indirection} onToggle={() => toggle("indirection")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvordan unngå direkte kobling mellom to klasser? <strong>Legg inn et mellomledd (grensesnitt eller mellomklasse).</strong></p>
        </div>

        <p className="text-sm">
          &quot;De fleste problemer i informatikk kan løses ved å legge til et ekstra lag av indireksjon.&quot;
          Indireksjon handler om å sette noe <em>imellom</em> to klasser som ellers ville vært direkte koblet.
        </p>

        <CodeBlock title="Fra eksamen 2021 — grensesnitt som mellomledd" variant="neutral">
{`// UTEN indireksjon (høy kobling):
class StudentListe {
    // Avhenger direkte av konkret implementasjon!
    private TabellOrdnetListe<Student> liste = new TabellOrdnetListe<>();
}

// MED indireksjon (lav kobling):
class StudentListe {
    // Avhenger av GRENSESNITTET — ikke konkret klasse
    private OrdnetListe<Student> liste;

    public StudentListe(OrdnetListe<Student> liste) {
        this.liste = liste;  // Grensesnittet er mellomleddet
    }
}
// Nå kan du bytte TabellOrdnetListe med LenkeOrdnetListe
// uten å endre StudentListe!`}
        </CodeBlock>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">Kobling til SOLID</h4>
          <p className="text-sm text-[var(--muted)]">
            Indireksjon er nesten det samme som <strong>DIP</strong> (Dependency Inversion) — begge handler om å
            sette et grensesnitt mellom klasser. DIP formulerer det som et prinsipp (&quot;avheng av abstraksjoner&quot;),
            mens Indirection er mer en teknikk (&quot;legg inn et mellomledd&quot;).
          </p>
        </div>
      </Section>

      {/* ═══════ 9. Protected Variations ═══════ */}
      <Section number={9} title="Beskyttet mot variasjoner" titleEn="Protected Variations" isOpen={open.protected} onToggle={() => toggle("protected")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser</h4>
          <p className="text-sm">Hvordan beskytte systemet mot endringer? <strong>Identifiser hva som kan endre seg, og sett et grensesnitt foran det.</strong></p>
        </div>

        <p className="text-sm">
          Noen deler av systemet vil garantert endre seg over tid (ny database, ny e-postleverandør, nye regler).
          Protected Variations sier: <em>identifiser disse punktene og beskytt resten av systemet med et grensesnitt.</em>
        </p>

        <CodeBlock title="Fra eksamen 2022 — e-posttjeneste" variant="neutral">
{`// E-postleverandøren kan endre seg (Telenor → HVL → Google)
// Beskytt resten av systemet med et grensesnitt:

interface EPostTjeneste {
    void kopleTil();
    void send(String melding);
    void motta();
}

// Konkrete implementasjoner:
class TelenorEPost implements EPostTjeneste {
    public void kopleTil() { /* Telenor-spesifikk */ }
    public void send(String melding) { /* Telenor-spesifikk */ }
    public void motta() { /* Telenor-spesifikk */ }
}

class HvlEPost implements EPostTjeneste {
    public void kopleTil() { /* HVL-spesifikk */ }
    public void send(String melding) { /* HVL-spesifikk */ }
    public void motta() { /* HVL-spesifikk */ }
}

// Resten av systemet bruker grensesnittet:
class Varslingssystem {
    private EPostTjeneste epost;  // Beskyttet mot endringer!

    public void varsle(String melding) {
        epost.send(melding);  // Fungerer uansett leverandør
    }
}`}
        </CodeBlock>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">Kobling til SOLID</h4>
          <p className="text-sm text-[var(--muted)]">
            Protected Variations er nært knyttet til <strong>OCP</strong> (åpen for utvidelse, lukket for endring)
            og <strong>DIP</strong> (avheng av abstraksjoner). Det er i praksis &quot;paraplyen&quot; over flere SOLID-prinsipper.
          </p>
        </div>
      </Section>

      {/* Oppsummering */}
      <div className="rounded-xl border-2 border-teal-400/40 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/20 p-6 mt-8 mb-4">
        <h2 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">GRASP-oppsummering</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-teal-200 dark:border-teal-800">
                <th className="text-left py-2 pr-3 font-bold">#</th>
                <th className="text-left py-2 pr-3 font-bold">Mønster</th>
                <th className="text-left py-2 pr-3 font-bold">Kort huskeregel</th>
                <th className="text-left py-2 font-bold">SOLID-kobling</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {[
                ["1", "Informasjonsekspert", "Den som har dataene, gjør jobben", "—"],
                ["2", "Skaper", "Den som eier/bruker, oppretter", "—"],
                ["3", "Lav kobling", "Minst mulig avhengigheter", "DIP"],
                ["4", "Høy samhørighet", "Én klasse, én jobb", "SRP"],
                ["5", "Kontroller", "Mellomledd mellom UI og domene", "—"],
                ["6", "Polymorfi", "Override istedenfor if/else", "OCP, LSP"],
                ["7", "Rein fabrikkering", "Lag ny klasse som ikke er i domenet", "SRP"],
                ["8", "Indireksjon", "Legg inn mellomledd", "DIP"],
                ["9", "Beskyttet mot variasjoner", "Grensesnitt foran endringspunkter", "OCP, DIP"],
              ].map(([num, name, rule, solid]) => (
                <tr key={num} className="border-b border-neutral-200 dark:border-neutral-800">
                  <td className="py-2 pr-3 font-medium text-[var(--foreground)]">{num}</td>
                  <td className="py-2 pr-3 font-medium text-[var(--foreground)]">{name}</td>
                  <td className="py-2 pr-3">{rule}</td>
                  <td className="py-2">{solid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Link
          href="/dat109/ooa-ood/solid"
          className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          SOLID-prinsippene
        </Link>
        <Link
          href="/dat109/ooa-ood/eksamen"
          className="flex items-center gap-2 text-sm font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline"
        >
          Eksamensdrilling
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
