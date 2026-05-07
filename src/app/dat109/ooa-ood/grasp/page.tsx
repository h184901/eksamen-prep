"use client";

import Link from "next/link";
import { useState } from "react";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { ooaOodPages, dat109BasePaths } from "@/lib/dat109-subpages";

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
      <DAT109SubNav basePath={dat109BasePaths.ooaOod} pages={ooaOodPages} />

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

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">GRASP-mønstrene</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          <strong>G</strong>eneral <strong>R</strong>esponsibility <strong>A</strong>ssignment{" "}
          <strong>S</strong>oftware <strong>P</strong>atterns — 9 prinsipper for å bestemme
          <strong> hvem som skal ha ansvaret for hva</strong> i et objektorientert system.
          Fra Craig Larmans bok &quot;Applying UML and Patterns&quot; (3. utg.), kap. 17 og 25.
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

      {/* Responsibilities — RDD */}
      <div className="rounded-xl border-2 border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-950/20 p-5 mb-6">
        <h3 className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
          Hva er et &quot;ansvar&quot; (responsibility)? — Larman kap. 17.3
        </h3>
        <p className="text-sm mb-2">
          UML definerer ansvar som <em>&quot;a contract or obligation of a classifier&quot;</em>.
          Larman deler ansvar i to typer:
        </p>
        <ul className="text-sm space-y-1 ml-4">
          <li>
            <strong className="text-teal-700 dark:text-teal-400">Doing (utføring)</strong> — gjøre
            noe selv (regne, opprette objekt), starte handling i andre objekter, koordinere
            aktiviteter
          </li>
          <li>
            <strong className="text-teal-700 dark:text-teal-400">Knowing (vite)</strong> — kjenne
            egne data (private), kjenne relaterte objekter, kjenne ting som kan utledes/beregnes
          </li>
        </ul>
        <p className="text-sm mt-2 text-[var(--muted)]">
          Et ansvar er <strong>ikke det samme som en metode</strong> — metoder oppfyller ansvar.
          Et lite ansvar tar én metode; et stort ansvar (&quot;gi tilgang til relasjonsdatabaser&quot;) kan
          ta hundrevis av klasser. GRASP ligger inne i den større tilnærmingen{" "}
          <strong>Responsibility-Driven Design (RDD)</strong> — Larman kaller det metaforisk
          &quot;a community of collaborating responsible objects&quot;.
        </p>
      </div>

      {/* ═══════ 1. Information Expert ═══════ */}
      <Section number={1} title="Informasjonsekspert" titleEn="Information Expert" isOpen={open.expert} onToggle={() => toggle("expert")}>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 17.11)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hva er et generelt prinsipp for å tildele ansvar til
            objekter? <strong>Løsning:</strong> &quot;Assign a responsibility to the information
            expert — the class that has the information necessary to fulfill the responsibility.&quot;
          </p>
        </div>

        <p className="text-sm">
          Dette er det mest grunnleggende GRASP-prinsippet. Når du lurer på &quot;hvem skal ha denne
          metoden?&quot;, spør deg: <em>&quot;Hvem har dataene som trengs for å gjøre dette?&quot;</em>
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans NextGen POS-eksempel — Sale.getTotal()
          </h4>
          <p className="text-sm mb-2">
            &quot;Hvem skal vite totalsummen for et salg?&quot; Et <code>Sale</code>-objekt inneholder alle{" "}
            <code>SalesLineItem</code>-instanser; ergo er <code>Sale</code> informasjonseksperten på{" "}
            <code>getTotal()</code>. Men ansvaret er <strong>distribuert</strong>:
          </p>
          <ul className="text-sm space-y-1 ml-4">
            <li><code>Sale</code> kjenner totalen → <code>getTotal()</code></li>
            <li><code>SalesLineItem</code> kjenner sin delsum → <code>getSubtotal()</code></li>
            <li><code>ProductDescription</code> kjenner prisen → <code>getPrice()</code></li>
          </ul>
          <p className="text-sm mt-2 text-[var(--muted)]">
            Larman: &quot;Whenever information is spread across different objects, they will need to
            interact via messages to share the work.&quot; Tre objekter samarbeider for én oppgave.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — Board.getSquare(name) (kap. 17.8)
          </h4>
          <p className="text-sm mb-2">
            &quot;Hvem skal returnere et <code>Square</code>-objekt gitt et navn?&quot; Larman illustrerer
            ved å avvise et <em>Dog</em>-objekt: hvis Dog hadde <code>getSquare</code>, måtte Dog
            først hente <em>alle</em> Squares fra Board (en ekstra Map-samling) — det øker
            kobling. Board kjenner allerede alle Squares (det er informasjonseksperten), så Board
            skal ha metoden.
          </p>
          <p className="text-sm text-[var(--muted)] italic">
            Også kjent som: &quot;Place responsibilities with data&quot;, &quot;That which knows, does&quot;,
            &quot;Do It Myself&quot;.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Når Expert IKKE skal følges (kontraindikasjon)
          </h4>
          <p className="text-sm">
            Larman: hvem skal lagre <code>Sale</code> i database? Sale har dataene, men hvis Sale
            får databasekoden brytes <strong>cohesion</strong> (Sale gjør plutselig SQL/JDBC) og{" "}
            <strong>coupling</strong> øker (Sale knyttes til JDBC). Løsningen er en{" "}
            <em>Pure Fabrication</em> som <code>PersistentStorage</code>. Lærdommen: GRASP-mønstrene
            må veies mot hverandre.
          </p>
        </div>

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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 17.10)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvem skal være ansvarlig for å lage en ny instans av en
            klasse? <strong>Løsning:</strong> Tildel klasse B ansvaret for å opprette en instans av
            klasse A dersom én eller flere av disse er sanne (jo flere, jo bedre):
          </p>
        </div>

        <p className="text-sm">
          Larmans firepunkts-liste (i boken vises de uten R, men &quot;records&quot; er der):
        </p>
        <ul className="text-sm space-y-1 ml-4">
          <li><strong>B inneholder eller komposittaggregerer A</strong> (sterkest indikator)</li>
          <li><strong>B records (registrerer/logger) A</strong></li>
          <li><strong>B closely uses A</strong> (bruker A nært)</li>
          <li>
            <strong>B har initialiseringsdataene for A</strong> som skal sendes inn ved opprettelse
            (Larman: &quot;Thus B is an Expert with respect to creating A&quot;)
          </li>
        </ul>

        <p className="text-sm">
          Larman: &quot;If more than one option applies, usually prefer a class B which aggregates or
          contains class A.&quot; Komposisjon vinner over de andre.
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — Board lager Squares (kap. 17.8)
          </h4>
          <p className="text-sm mb-2">
            &quot;Hvem skaper Square-objektet?&quot; Larman skriver at han har spurt &quot;literally
            thousands of developers, and virtually every one, from India to the USA, will say:
            Make the <em>Board</em> object create the <em>Squares</em>&quot;. Hvorfor? Fordi Board
            inneholder Squares (composite aggregation) — og fordi det matcher vår
            mentale modell av domenet (low representational gap, LRG).
          </p>
          <p className="text-sm text-[var(--muted)]">
            Larman avviser eksplisitt et <em>Dog</em>-objekt som skaper: det bryter LRG. Dog har
            ingenting med Squares å gjøre i monopol-domenet.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            NextGen POS — Sale lager SalesLineItem (Larman 17.10)
          </h4>
          <p className="text-sm">
            Sale &quot;contains/aggregates&quot; SalesLineItem (multiplisitet 1..*). Derfor:{" "}
            <code>Sale</code> er Creator for <code>SalesLineItem</code>. Diagrammet i 17.13 viser
            Register som sender <code>makeLineItem(quantity)</code> til Sale, som så kaller{" "}
            <code>create(quantity)</code> på SalesLineItem.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Kontraindikasjoner (Larman)
          </h4>
          <p className="text-sm">
            Hvis opprettelsen er kompleks (gjenbruk av instanser, betinget oppretting, valg mellom
            klassefamilie) → bruk en <em>Concrete Factory</em> eller <em>Abstract Factory</em>{" "}
            (GoF) i stedet.
          </p>
        </div>

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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 17.12)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvordan støtte lav avhengighet, lav endringspåvirkning og økt
            gjenbruk? <strong>Løsning:</strong> &quot;Assign a responsibility so that coupling remains
            low. Use this principle to evaluate alternatives.&quot;
          </p>
        </div>

        <p className="text-sm">
          Larman: kobling er &quot;a measure of how strongly one element is connected to, has knowledge
          of, or relies on other elements.&quot; Lav kobling er et <em>evaluerings­prinsipp</em> — du
          bruker det til å velge mellom designalternativer, ikke som et selvstendig svar.
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — &quot;Why Board over Dog?&quot; (kap. 17.8)
          </h4>
          <p className="text-sm">
            Hvis <em>Dog</em> hadde fått <code>getSquare</code>-ansvaret, ville Dog ha kobling til{" "}
            <em>både Board og Square</em> (to objekter har kobling til Square). Med Board som
            Expert har bare Board kobling til Square (ett objekt). Larmans nøkkelobservasjon:{" "}
            <em>Expert støtter Low Coupling</em> — fordi vi plasserer ansvaret nær dataene, og data
            ikke trenger å &quot;reise&quot; til andre objekter.
          </p>
        </div>

        <p className="text-sm">
          Larmans former for kobling fra TypeX til TypeY (kap. 17.12):
        </p>
        <ul className="text-sm space-y-1 ml-4">
          <li>X har en attributt (instansvariabel) som refererer til Y eller Y-instans</li>
          <li>X har en metode som refererer Y (parameter, lokal variabel, returverdi)</li>
          <li>X er direkte eller indirekte subklasse av Y</li>
          <li>Y er et grensesnitt og X implementerer det</li>
        </ul>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            &quot;Pick Your Battles&quot; — Larman advarer
          </h4>
          <p className="text-sm">
            Larman: &quot;It is not high coupling per se that is the problem; it is high coupling to
            elements that are <em>unstable</em>.&quot; Høy kobling til stabile elementer (java.util,
            etablerte biblioteker) er greit. Ikke bruk tid på å redusere kobling der det ikke
            finnes realistisk variasjon.
          </p>
        </div>

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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 17.14)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvordan holde objekter fokuserte, forståelige og
            håndterbare, og som bieffekt støtte lav kobling?{" "}
            <strong>Løsning:</strong> &quot;Assign a responsibility so that cohesion remains high.
            Use this to evaluate alternatives.&quot;
          </p>
        </div>

        <p className="text-sm">
          Larman: cohesion (mer presist <strong>functional cohesion</strong>) er &quot;a measure of how
          strongly related and focused the responsibilities of an element are.&quot; Grady Booch:
          høy funksjonell cohesion finnes når elementene &quot;all work together to provide some
          well-bounded behavior.&quot;
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans cohesion-skala (kap. 17.14)
          </h4>
          <ol className="text-sm space-y-1 ml-4 list-decimal">
            <li>
              <strong>Very low cohesion</strong> — én klasse er ansvarlig for mange ting i veldig
              ulike funksjonelle områder (f.eks. <em>RDB-RPC-Interface</em>: både database og RPC).
            </li>
            <li>
              <strong>Low cohesion</strong> — én klasse har eneansvar for én kompleks oppgave i ett
              funksjonelt område, men hundre­vis av metoder (bør splittes).
            </li>
            <li>
              <strong>High cohesion</strong> — moderat ansvar i ett funksjonelt område,
              samarbeider med andre klasser.
            </li>
            <li>
              <strong>Moderate cohesion</strong> — lette ansvar i noen logisk relaterte områder.
            </li>
          </ol>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — &quot;What next?&quot; (kap. 17.8, fig. 17.11)
          </h4>
          <p className="text-sm">
            Når <code>playGame</code> kommer inn til <code>MonopolyGame</code>, er det to design­valg:{" "}
            <strong>(a)</strong> MonopolyGame gjør all jobben selv (doA, doB, doC) →{" "}
            <em>poor cohesion</em>. <strong>(b)</strong> MonopolyGame delegerer til andre objekter
            → <em>better</em>. Larmans poeng: &quot;Bad cohesion usually begets bad coupling, and
            vice versa. I call cohesion and coupling the <em>yin and yang of software
            engineering</em>.&quot;
          </p>
        </div>

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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 17.13)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvilket <em>første</em> objekt utenfor UI-laget mottar og
            koordinerer (&quot;controls&quot;) en systemoperasjon? <strong>Løsning:</strong> Tildel
            ansvaret til en klasse som representerer <em>én av to ting</em>:
          </p>
          <ul className="text-sm space-y-1 ml-4 mt-2">
            <li>
              <strong>Facade controller</strong> — det overordnede &quot;systemet&quot;, et &quot;rotobjekt&quot;,
              en enhet, eller et større delsystem. Eks: <code>Register</code>, <code>POSSystem</code>,{" "}
              <code>MonopolyGame</code>, <code>ChessGame</code>.
            </li>
            <li>
              <strong>Use case (session) controller</strong> — representerer et bruks­tilfelle-scenario der
              systemoperasjonen forekommer, navngitt{" "}
              <code>&lt;UseCaseName&gt;Handler</code>, <code>&lt;UseCaseName&gt;Session</code> eller{" "}
              <code>&lt;UseCaseName&gt;Coordinator</code>. Eks: <code>ProcessSaleHandler</code>.
            </li>
          </ul>
        </div>

        <p className="text-sm">
          Larman: &quot;window&quot;, &quot;view&quot; og &quot;document&quot;-klasser hører <em>ikke</em> hjemme på denne
          listen — UI-objekter skal motta hendelsene og <strong>delegere</strong> til en kontroller.
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — playGame til MonopolyGame (kap. 17.8 / 18.5)
          </h4>
          <p className="text-sm">
            Når Observer trykker &quot;Play Game&quot;, sender <code>JFrame</code> et{" "}
            <code>actionPerformed</code>-event som JFrame oversetter til{" "}
            <code>playGame</code>-meldingen og delegerer videre. Larman velger{" "}
            <code>MonopolyGame</code> (forkortet <em>MGame</em>) som facade controller, fordi de
            fleste andre domene-objektene er &quot;contained within&quot; MonopolyGame, og det er bare to
            systemoperasjoner (<code>initialize</code> og <code>playGame</code>) — ikke nok til å
            bli incohesive.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            &quot;Bloated Controllers&quot; — vanlig feil
          </h4>
          <p className="text-sm">
            Larman: en oppblåst kontroller har lav cohesion fordi den selv utfører jobben i stedet
            for å delegere. Tegn: én controller mottar <em>alle</em> systemhendelser, kontrolleren
            har mange attributter den eier selv, kontrolleren utfører oppgavene direkte. Kuren:
            (1) bytt til <em>use case controllers</em> (en pr. brukstilfelle), (2) la kontrolleren
            <em>delegere</em> arbeidet videre.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Sammenheng med Jacobsons modell
          </h4>
          <p className="text-sm">
            Larman knytter Controller til Jacobsons gamle Objectory-metode: <strong>boundary</strong>{" "}
            (UI), <strong>entity</strong> (domeneobjekter) og <strong>control</strong> (use case
            handlers). Controller-mønsteret tilsvarer Jacobsons control-objekter.
          </p>
        </div>

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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 25.1)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvordan håndtere alternativer basert på type? Hvordan lage
            pluggbare programvarekomponenter? <strong>Løsning:</strong> &quot;When related alternatives
            or behaviors vary by type (class), assign responsibility for the behavior — using
            polymorphic operations — to the types for which the behavior varies.&quot;
          </p>
          <p className="text-sm mt-2 italic text-[var(--muted)]">
            Larmans <strong>corollary</strong>: &quot;Do not test for the type of an object and use
            conditional logic to perform varying alternatives based on type.&quot;
          </p>
        </div>

        <p className="text-sm">
          Larmans definisjon av polymorfi (siterer Coad): &quot;giving the same name to services in
          different objects&quot; når tjenestene er like eller relaterte. De ulike typene
          implementerer typisk et felles grensesnitt eller arver fra en felles superklasse.
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — Square.landedOn (kap. 25.1)
          </h4>
          <p className="text-sm mb-2">
            Når en spiller lander på Go-rute → får $200; Income-Tax → betaler skatt; Go-To-Jail →
            flyttes til fengsel. Larman avviser eksplisitt <code>SWITCH ON square.type</code>{" "}
            (bad design) og lager i stedet en abstrakt <code>landedOn(p)</code>-metode på{" "}
            <code>Square</code>, som overrides i <code>RegularSquare</code>,{" "}
            <code>GoSquare</code>, <code>IncomeTaxSquare</code> og <code>GoToJailSquare</code>.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Spesielt verdt å merke: <code>RegularSquare.landedOn</code> er en{" "}
            <strong>NO-OP</strong> (ingen handling) — Larman: &quot;In code, the body of this method
            will be empty — sometimes called a <strong>NO-OP</strong> (no operation) method.
            Note that to make the magic of polymorphism work, we need to use this approach to avoid
            special case logic.&quot;
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            NextGen POS-eksempel — Tax Calculator Adapter
          </h4>
          <p className="text-sm">
            Tre eksterne tax-kalkulatorer (TaxMaster, GoodAsGoldTaxPro, …) har hver sitt API. Larman
            lager interface <code>ITaxCalculatorAdapter</code> med metoden{" "}
            <code>getTaxes(Sale): List&lt;TaxLineItem&gt;</code>, og lokale adaptere{" "}
            <code>TaxMasterAdapter</code> og <code>GoodAsGoldTaxProAdapter</code>. Hver adapter
            oversetter til sitt eksterne API.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Larmans guideline (25.1)
          </h4>
          <p className="text-sm">
            &quot;Unless there is a default behavior in the superclass, declare a polymorphic
            operation in the superclass to be <code>{`{abstract}`}</code>.&quot;
          </p>
          <p className="text-sm mt-2">
            Mange GoF-mønstre er bygget på polymorfi: <strong>Adapter, Command, Composite, Proxy,
            State, Strategy</strong>.
          </p>
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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 25.2)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvilket objekt skal ha ansvaret når du ikke vil bryte High
            Cohesion eller Low Coupling, men løsningene fra Information Expert ikke er passende?{" "}
            <strong>Løsning:</strong> &quot;Assign a highly cohesive set of responsibilities to an
            artificial or convenience class that does not represent a problem domain concept —
            something made up, to support high cohesion, low coupling, and reuse.&quot;
          </p>
          <p className="text-sm mt-2 italic text-[var(--muted)]">
            Larman: &quot;In English, <em>pure fabrication</em> is an idiom that implies making
            something up, which we do when we&apos;re desperate!&quot;
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans Monopol-eksempel — Cup (kap. 25.2)
          </h4>
          <p className="text-sm mb-2">
            I tidligere iterasjoner trillet <code>Player</code> alle terningene og summerte
            totalen — men det er ikke gjenbrukbart for andre spill. Larmans løsning:{" "}
            &quot;Although there is no cup for the dice in Monopoly, many games do use a dice cup in
            which one shakes all the dice and rolls them onto a table. Therefore, I propose a Pure
            Fabrication called <em>Cup</em>.&quot; Cup samler Die-objekter, har metoder{" "}
            <code>roll()</code> og <code>getTotal()</code>.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Dette er <strong>nøyaktig</strong> Atles Kopp/Hatt-klasse fra forelesningene — Larman
            er kilden.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            NextGen POS-eksempel — PersistentStorage (Larman 25.2)
          </h4>
          <p className="text-sm">
            Hvem skal lagre <code>Sale</code> i database? Information Expert sier Sale (har
            dataene), men det gir lav cohesion (Sale gjør plutselig SQL/JDBC), høy coupling og
            duplisering. Larmans løsning: en Pure Fabrication kalt <code>PersistentStorage</code>{" "}
            med <code>insert(Object)</code> og <code>update(Object)</code>. &quot;PersistentStorage is
            not a domain concept, but something made up or fabricated for the convenience of the
            software developer.&quot;
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Larmans dekomposisjons-perspektiv (25.2 Discussion)
          </h4>
          <p className="text-sm">
            Larman skiller mellom to tilnærminger til objektdesign:
          </p>
          <ul className="text-sm space-y-1 ml-4 mt-2">
            <li>
              <strong>Representational decomposition</strong> — Sale, Customer, Square: klassen
              representerer noe i domenet (low representational gap).
            </li>
            <li>
              <strong>Behavioral decomposition</strong> — TableOfContentsGenerator, Cup,
              PersistentStorage: klassen er gruppert rundt felles oppførsel/algoritmer.
            </li>
          </ul>
          <p className="text-sm mt-2 text-[var(--muted)]">
            Pure Fabrication = behavioral decomposition. <strong>Praktisk talt alle GoF-mønstre er
            Pure Fabrications</strong> (Adapter, Strategy, Command, ...).
          </p>
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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 25.3)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvor skal du tildele et ansvar for å unngå direkte kobling
            mellom to (eller flere) ting? Hvordan dekoble objekter slik at lav kobling støttes og
            gjenbrukspotensial forblir høyt? <strong>Løsning:</strong> &quot;Assign the responsibility
            to an intermediate object to mediate between other components or services so that they
            are not directly coupled.&quot;
          </p>
        </div>

        <p className="text-sm italic text-[var(--muted)]">
          David Wheeler (sitert av Larman): &quot;Most problems in computer science can be solved by
          another level of indirection&quot; — med kontra-tillegget &quot;Most problems in performance
          can be solved by removing another layer of indirection!&quot;
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Larmans hovedeksempel — TaxCalculatorAdapter (kap. 25.3)
          </h4>
          <p className="text-sm">
            <code>TaxMasterAdapter</code> er et mellomledd mellom Sale og det eksterne TaxMaster-systemet.
            Sale snakker bare med adapteren via det stabile <code>ITaxCalculatorAdapter</code>-grensesnittet;
            adapteren oversetter til TaxMasters spesifikke API. Larman: &quot;By adding a level of
            indirection and adding polymorphism, the adapter objects protect the inner design
            against variations in the external interfaces.&quot;
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Sammenheng med andre mønstre (Larman)
          </h4>
          <p className="text-sm">
            Mange Indirection-mellomledd er <strong>Pure Fabrications</strong> (Adapter, Facade,
            Observer, Bridge, Mediator). Motivasjonen for Indirection er typisk{" "}
            <strong>Low Coupling</strong>. Indirection er også et <em>middel</em> til{" "}
            <strong>Protected Variations</strong>.
          </p>
        </div>

        <p className="text-sm">
          Indireksjon handler om å sette noe <em>imellom</em> to klasser som ellers ville vært
          direkte koblet — og slik bryte direkteavhengigheten.
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
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Hva det løser (Larman 25.4)</h4>
          <p className="text-sm">
            <strong>Problem:</strong> Hvordan designe objekter, delsystemer og systemer slik at
            variasjoner eller ustabilitet i disse elementene ikke har uønsket innvirkning på andre
            elementer? <strong>Løsning:</strong> &quot;Identify points of predicted variation or
            instability; assign responsibilities to create a stable interface around them.&quot;
          </p>
          <p className="text-sm mt-2 italic text-[var(--muted)]">
            Larman: &quot;The term &apos;interface&apos; is used in the broadest sense of an access view; it
            does not literally only mean something like a Java interface.&quot;
          </p>
        </div>

        <p className="text-sm">
          Larman: &quot;This is a very important, fundamental principle of software design! Almost
          every software or architectural design trick in books — data encapsulation, polymorphism,
          data-driven designs, interfaces, virtual machines, configuration files, operating
          systems, and much more — is a specialization of Protected Variations.&quot;
        </p>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Variation point vs. evolution point (Larman 25.4)
          </h4>
          <ul className="text-sm space-y-1 ml-4">
            <li>
              <strong>Variation point</strong> — variasjoner i det <em>eksisterende</em> systemet
              eller kravene (f.eks. flere tax-kalkulatorer som <em>må</em> støttes nå).
            </li>
            <li>
              <strong>Evolution point</strong> — spekulative variasjonspunkter som <em>kan</em>{" "}
              dukke opp i fremtiden, men er ikke i dagens krav.
            </li>
          </ul>
          <p className="text-sm mt-2 text-[var(--muted)]">
            Larman advarer: ikke bruk PV på alle evolution points — det leder til &quot;generalize-itis&quot;
            (Larmans egen sykdom da han var ung utvikler). Han kalt det &quot;speculative
            future-proofing&quot;.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Mekanismer som er PV (Larman 25.4)
          </h4>
          <ul className="text-sm space-y-1 ml-4">
            <li><strong>Core:</strong> data-encapsulation, interfaces, polymorphism, indirection, standards</li>
            <li><strong>Data-driven:</strong> config-filer, style sheets, metadata for ORM, property files</li>
            <li><strong>Service lookup:</strong> JNDI, Jini, UDDI</li>
            <li><strong>Interpreter-driven:</strong> rule engines, virtual machines, scripting</li>
            <li><strong>Reflective/meta-level:</strong> java.beans.Introspector</li>
            <li><strong>Uniform Access:</strong> samme syntaks for felt og metode (C#, Eiffel)</li>
            <li><strong>Standard languages:</strong> SQL beskytter mot leverandør-DB-variasjon</li>
          </ul>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Liskov Substitution Principle (LSP) — Larman knytter det inn
          </h4>
          <p className="text-sm">
            LSP formaliserer beskyttelse mot variasjon i ulike implementasjoner av et grensesnitt.
            Software som refererer til type T (interface eller superklasse) skal fortsatt
            fungere &quot;as expected&quot; med enhver substituert subtype S. Larman ser LSP som
            <em> intuisjonen</em> bak PV.
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4">
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Don&apos;t Talk to Strangers (Law of Demeter) — Larman 25.4
          </h4>
          <p className="text-sm mb-2">
            Larman: i 2. utgave erstattet PV det gamle GRASP-mønsteret <em>Don&apos;t Talk to
            Strangers</em>, fordi LoD er en spesialform av PV. Innenfor en metode skal du bare
            sende meldinger til:
          </p>
          <ol className="text-sm space-y-1 ml-4 list-decimal">
            <li><code>this</code> (eller self)</li>
            <li>parametre til metoden</li>
            <li>attributter av <code>this</code></li>
            <li>elementer i samlinger som er attributter av <code>this</code></li>
            <li>objekter opprettet i metoden</li>
          </ol>
          <p className="text-sm mt-2 text-[var(--muted)]">
            <strong>Eksempel på brudd:</strong> <code>sale.getPayment().getTenderedAmount()</code>{" "}
            — Sale er familiar (kjent), Payment er <em>stranger</em>. Bedre:{" "}
            <code>sale.getTenderedAmountOfPayment()</code>.
          </p>
        </div>

        <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 p-4">
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
            Også kjent som — Larmans bro (25.4)
          </h4>
          <p className="text-sm">
            Larman: &quot;PV is essentially the same as the <strong>information hiding</strong>{" "}
            (Parnas, 1972) and <strong>open-closed principles</strong> (Meyer, 1988), which are
            older terms.&quot; Det vil si: PV ≈ OCP ≈ information hiding — alle uttrykker samme
            grunnidé i ulike vokabularer.
          </p>
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

      {/* Use Case Realization — Larman 18 */}
      <div className="rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 p-6 mt-8 mb-4">
        <h2 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">
          Use Case Realization — hvor GRASP brukes (Larman kap. 18)
        </h2>
        <p className="text-sm mb-3">
          En <strong>use case realization</strong> er Larmans navn på prosessen der du designer
          objekter (interaction- og class-diagram) som <em>realiserer</em> et bruks­tilfelle. Det
          er <em>her</em> du anvender GRASP-prinsippene — én og én, mens du tegner sekvens­diagrammer.
        </p>
        <p className="text-sm">
          Larmans Monopol-realisering av <code>playGame</code> (kap. 18.5) går slik:
        </p>
        <ol className="text-sm space-y-1 ml-4 mt-2 list-decimal">
          <li>
            <strong>Velg controller</strong> for <code>playGame</code> → <code>MonopolyGame</code>{" "}
            (facade controller, by Controller).
          </li>
          <li>
            <strong>Hvem styrer game-loop</strong> (for N runder, for hver spiller)? → MonopolyGame
            (by Expert: har <code>roundCnt</code> og listen <code>players</code>).
          </li>
          <li>
            <strong>Hvem tar en tur?</strong> Larman vurderer Player, MonopolyGame, Board som
            partial experts. Konklusjon: <code>Player</code> (by Expert + LRG, fordi Player kjenner
            sin Piece, kontanter og vil ha &quot;color strategy&quot; i fremtidige iterasjoner).
          </li>
          <li>
            <strong>Hvordan trille terninger?</strong> → Die.roll() (by Expert), summert av
            Player — senere refaktorert til <code>Cup</code> (by Pure Fabrication, kap. 25.2).
          </li>
          <li>
            <strong>Hvem beregner ny rute?</strong> → Board.getSquare(oldLoc, fvTotal) (by Expert).
          </li>
          <li>
            <strong>Hva skjer på ruta?</strong> → <code>square.landedOn(player)</code> — by
            Polymorphism, hver Square-subklasse implementerer ulikt (kap. 25.1).
          </li>
        </ol>
        <p className="text-sm mt-3 text-[var(--muted)]">
          Larman illustrerer også <strong>Command-Query Separation Principle</strong> (CQS) i samme
          eksempel: <code>Die.roll()</code> er <code>void</code> (kommando), <code>getFaceValue()</code>{" "}
          er query — ikke kombiner dem. &quot;A method should not be both.&quot;
        </p>
      </div>

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
