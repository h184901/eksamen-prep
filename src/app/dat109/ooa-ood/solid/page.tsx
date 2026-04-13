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
          { href: "/dat109/ooa-ood/solid", label: "SOLID", active: true },
          { href: "/dat109/ooa-ood/grasp", label: "GRASP" },
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
  id,
  letter,
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
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
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-sysdev-100 dark:bg-sysdev-900/30 text-sysdev-700 dark:text-sysdev-400 text-lg font-bold shrink-0">
          {letter}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-lg">{title}</div>
          <div className="text-sm text-[var(--muted)] truncate">{subtitle}</div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
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
      {isOpen && <div className="px-6 pb-6 space-y-5">{children}</div>}
    </div>
  );
}

/* ── Code block ── */
function CodeBlock({
  title,
  variant,
  children,
}: {
  title: string;
  variant: "bad" | "good";
  children: string;
}) {
  const borderColor =
    variant === "bad"
      ? "border-red-400 dark:border-red-600"
      : "border-green-400 dark:border-green-600";
  const bgColor =
    variant === "bad"
      ? "bg-red-50 dark:bg-red-950/20"
      : "bg-green-50 dark:bg-green-950/20";
  const labelColor =
    variant === "bad"
      ? "text-red-600 dark:text-red-400"
      : "text-green-600 dark:text-green-400";
  const icon = variant === "bad" ? "\u2717" : "\u2713";

  return (
    <div className={`rounded-xl border-2 ${borderColor} ${bgColor} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`${labelColor} font-bold text-sm`}>
          {icon} {title}
        </span>
      </div>
      <pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 text-[13px] leading-relaxed overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── Main page ── */
export default function SolidPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    srp: true,
    ocp: true,
    lsp: true,
    isp: true,
    dip: true,
  });

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

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
        <Link href="/dat109/ooa-ood" className="hover:text-[var(--accent)]">
          OOA og OOD
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">SOLID</span>
      </div>

      <SubNav />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">SOLID-prinsippene</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Fem prinsipper for god objektorientert design, formulert av Robert C.
          Martin. Hvert prinsipp handler om å gjøre koden mer fleksibel,
          vedlikeholdbar og testbar.
        </p>
      </div>

      {/* Intro box */}
      <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-5 mb-6">
        <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
          Slik leser du denne siden
        </h3>
        <p className="text-sm text-[var(--muted)]">
          For hvert prinsipp får du: en enkel forklaring, et kodeeksempel som{" "}
          <span className="text-red-600 dark:text-red-400 font-medium">
            bryter
          </span>{" "}
          prinsippet, et kodeeksempel som{" "}
          <span className="text-green-600 dark:text-green-400 font-medium">
            følger
          </span>{" "}
          prinsippet, og en forklaring på hvorfor det er viktig. Kodeeksemplene
          er i Java — samme språk som på eksamen.
        </p>
      </div>

      {/* ═══════════════════ S — SRP ═══════════════════ */}
      <Section
        id="srp"
        letter="S"
        title="Single Responsibility Principle (SRP)"
        subtitle="En klasse skal ha én og bare én grunn til å endre seg"
        isOpen={open.srp}
        onToggle={() => toggle("srp")}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
            Hva betyr det?
          </h4>
          <p className="text-sm">
            En klasse skal ha <strong>ett ansvarsområde</strong>. Hvis du må
            endre klassen av to helt forskjellige grunner (f.eks. fordi
            spillreglene endret seg OG fordi databasen byttet), så gjør klassen
            for mye.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Tenk på det slik
          </h4>
          <p className="text-sm">
            En kokk lager mat. Kokken skal ikke også vaske klær, reparere biler
            og undervise matte. Hver person (klasse) bør ha <em>én jobb</em>.
          </p>
        </div>

        <CodeBlock title="BRYTER prinsippet" variant="bad">
{`class Spiller {
    private String navn;
    private int poeng;

    public void spillTur() {
        // Spillogikk — grunn 1 til å endre klassen
    }

    public void lagreTilDatabase() {
        // Databasekode — grunn 2 til å endre klassen
    }

    public void skrivUtRapport() {
        // Utskriftskode — grunn 3 til å endre klassen
    }

    public void sendEpost(String melding) {
        // E-postkode — grunn 4 til å endre klassen
    }
}
// Spiller-klassen har FIRE forskjellige grunner til å endre seg!`}
        </CodeBlock>

        <CodeBlock title="FØLGER prinsippet" variant="good">
{`class Spiller {
    private String navn;
    private int poeng;

    public void spillTur() {
        // KUN spillogikk — én grunn til å endre seg
    }
}

class SpillerRepository {
    public void lagre(Spiller spiller) {
        // KUN databasekode — én grunn til å endre seg
    }
}

class RapportGenerator {
    public void generer(Spiller spiller) {
        // KUN utskrift — én grunn til å endre seg
    }
}

class EpostTjeneste {
    public void send(String melding) {
        // KUN e-post — én grunn til å endre seg
    }
}
// Nå har hver klasse ETT ansvarsområde!`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            Hvorfor er det viktig?
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              Endringer i databasekoden påvirker ikke spillogikken (og omvendt)
            </li>
            <li>Enklere å teste — hver klasse kan testes isolert</li>
            <li>Enklere å gjenbruke — RapportGenerator kan brukes overalt</li>
            <li>
              Enklere å forstå — du leser klassenavnet og vet hva den gjør
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">
            Kobling til GRASP
          </h4>
          <p className="text-sm text-[var(--muted)]">
            SRP er nesten identisk med GRASP-prinsippet{" "}
            <strong>High Cohesion</strong>. Begge sier at en klasse skal ha et
            fokusert ansvarsområde der alt innholdet henger sammen.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
            Eksamensfelle
          </h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.7:</strong> &quot;En klasse har mange utføringsstier
            og er vanskelig å teste&quot; — svaret er <strong>SRP</strong>. Mange
            utføringsstier = klassen gjør for mye = for mange grunner til å
            endre seg.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ O — OCP ═══════════════════ */}
      <Section
        id="ocp"
        letter="O"
        title="Open/Closed Principle (OCP)"
        subtitle="Åpen for utvidelse, lukket for endring"
        isOpen={open.ocp}
        onToggle={() => toggle("ocp")}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
            Hva betyr det?
          </h4>
          <p className="text-sm">
            Du skal kunne <strong>legge til ny funksjonalitet</strong> uten å{" "}
            <strong>endre eksisterende kode</strong>. Eksisterende klasser er
            &quot;lukket&quot; — du rører dem ikke. Ny funksjonalitet legges til ved å
            lage nye klasser som &quot;utvider&quot; systemet (via grensesnitt eller arv).
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Tenk på det slik
          </h4>
          <p className="text-sm">
            En stikkontakt er &quot;lukket&quot; — du åpner den ikke for å endre ledninger
            inni. Men den er &quot;åpen&quot; for utvidelse — du kan koble inn hva som
            helst som har en støpsel (lampe, lader, TV). Grensesnittet
            (&quot;støpsel-formen&quot;) gjør det mulig.
          </p>
        </div>

        <CodeBlock title="BRYTER prinsippet" variant="bad">
{`class PoengBeregner {
    public double beregnBonus(String spillerType, int poeng) {
        if (spillerType.equals("gull")) {
            return poeng * 2.0;
        } else if (spillerType.equals("sølv")) {
            return poeng * 1.5;
        } else if (spillerType.equals("bronse")) {
            return poeng * 1.0;
        }
        // Vil du legge til "platina"?
        // Da MÅ du ENDRE denne klassen — legge til ny else-if!
        // Det bryter med OCP.
        return poeng;
    }
}`}
        </CodeBlock>

        <CodeBlock title="FØLGER prinsippet" variant="good">
{`interface BonusStrategi {
    double beregnBonus(int poeng);
}

class GullBonus implements BonusStrategi {
    public double beregnBonus(int poeng) { return poeng * 2.0; }
}

class SølvBonus implements BonusStrategi {
    public double beregnBonus(int poeng) { return poeng * 1.5; }
}

// Vil du legge til "platina"? Bare lag en NY klasse!
// Du trenger IKKE endre noen eksisterende kode.
class PlatinaBonus implements BonusStrategi {
    public double beregnBonus(int poeng) { return poeng * 3.0; }
}

class PoengBeregner {
    private BonusStrategi strategi;

    public PoengBeregner(BonusStrategi strategi) {
        this.strategi = strategi;
    }

    public double beregn(int poeng) {
        return strategi.beregnBonus(poeng);
    }
}`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            Hvorfor er det viktig?
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              Du risikerer ikke å innføre feil i eksisterende kode som allerede
              fungerer
            </li>
            <li>
              Andre utviklere kan utvide systemet uten å forstå all intern kode
            </li>
            <li>Mye enklere å teste — nye klasser testes isolert</li>
            <li>Koden er forberedt for fremtidige krav uten å måtte skrives om</li>
          </ul>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
            Eksamensfelle
          </h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.5:</strong> Et HR-system der det kreves
            &quot;betydelige endringer&quot; i eksisterende kode for å legge til ny
            funksjonalitet → bryter med <strong>OCP</strong>.
          </p>
          <p className="text-sm mt-2">
            <strong>2023, oppgave 2.10:</strong> Et spill med grensesnittet{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              Rollable
            </code>{" "}
            der{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              Die
            </code>{" "}
            og{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              TestWith6
            </code>{" "}
            begge implementerer{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              Rollable
            </code>{" "}
            → dette er OCP i praksis.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ L — LSP ═══════════════════ */}
      <Section
        id="lsp"
        letter="L"
        title="Liskov Substitution Principle (LSP)"
        subtitle="Subklasser skal kunne erstatte superklasser uten feil"
        isOpen={open.lsp}
        onToggle={() => toggle("lsp")}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
            Hva betyr det?
          </h4>
          <p className="text-sm">
            Hvis klasse B arver fra klasse A, skal du kunne bruke B{" "}
            <strong>overalt</strong> der du bruker A — uten at programmet
            oppfører seg feil. Subklassen må holde alle løftene superklassen
            gir.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Tenk på det slik
          </h4>
          <p className="text-sm">
            Hvis du bestiller en &quot;sjåfør&quot; (superklassen), forventer du at
            sjåføren kan kjøre. Hvis det kommer en &quot;sjåfør-elev&quot; (subklassen)
            som nekter å kjøre på motorveien, er kontrakten brutt. Du kan ikke
            erstatte sjåføren med sjåfør-eleven uten at ting går galt.
          </p>
        </div>

        <CodeBlock title="BRYTER prinsippet — den klassiske feilen" variant="bad">
{`class Fugl {
    public void flyg() {
        System.out.println("Flyr gjennom lufta!");
    }
}

class Pingvin extends Fugl {
    @Override
    public void flyg() {
        // Pingvinen kan IKKE fly — kaster exception!
        throw new UnsupportedOperationException("Kan ikke fly!");
    }
}

// Problemet:
void fåFuglerTilÅFlyge(List<Fugl> fugler) {
    for (Fugl f : fugler) {
        f.flyg();  // KRASJER når f er en Pingvin!
    }
}
// Koden forventer at alle Fugl-er kan flyge.
// Pingvin bryter dette løftet → LSP-brudd.`}
        </CodeBlock>

        <CodeBlock title="FØLGER prinsippet" variant="good">
{`// Skill mellom fugler som kan fly og de som ikke kan:
interface Fugl {
    void spis();
    void svøm();  // (valgfritt)
}

interface Flygbar {
    void flyg();
}

class Ørn implements Fugl, Flygbar {
    public void spis() { System.out.println("Spiser fisk"); }
    public void svøm() { /* ... */ }
    public void flyg() { System.out.println("Flyr!"); }
}

class Pingvin implements Fugl {
    public void spis() { System.out.println("Spiser fisk"); }
    public void svøm() { System.out.println("Svømmer!"); }
    // Ingen flyg()-metode — Pingvin lover aldri noe den ikke kan holde
}

// Nå er det trygt:
void fåFuglerTilÅFlyge(List<Flygbar> flygere) {
    for (Flygbar f : flygere) {
        f.flyg();  // Bare flygbare fugler er med — aldri crash!
    }
}`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            Hvorfor er det viktig?
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              Kode som bruker superklassen trenger ikke vite om subklassene —
              alt &quot;bare fungerer&quot;
            </li>
            <li>Du unngår uventede krasj og feil midt i kjøring</li>
            <li>
              Polymorfi fungerer bare riktig hvis LSP holdes — ellers er arv
              meningsløst
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
            Eksamensfelle
          </h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.6:</strong> &quot;En utledet klasse overskriver en
            arvet metode ved å kaste en{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              UnsupportedOperationException
            </code>
            &quot; → svaret er <strong>LSP</strong>. Denne er nesten garantert å komme
            igjen! Når du ser{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              UnsupportedOperationException
            </code>{" "}
            i en override — tenk LSP.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ I — ISP ═══════════════════ */}
      <Section
        id="isp"
        letter="I"
        title="Interface Segregation Principle (ISP)"
        subtitle="Klienter skal ikke tvinges til å avhenge av grensesnitt de ikke bruker"
        isOpen={open.isp}
        onToggle={() => toggle("isp")}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
            Hva betyr det?
          </h4>
          <p className="text-sm">
            Det er bedre med <strong>mange små, fokuserte grensesnitt</strong>{" "}
            enn ett stort grensesnitt med alt mulig i. En klasse skal ikke bli
            tvunget til å implementere metoder den ikke trenger.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Tenk på det slik
          </h4>
          <p className="text-sm">
            En fjernkontroll for bare TV-en er bedre enn en universalfjernkontroll
            med 200 knapper (TV, DVD, stereo, projektor, gardinmotor...).
            Du bruker bare 10 av knappene — resten er forvirrende og unødvendig.
          </p>
        </div>

        <CodeBlock title="BRYTER prinsippet — fra eksamen 2023!" variant="bad">
{`// Ett ENORMT grensesnitt med alt mulig:
interface StudentLiv {
    void drikk();
    void spis();
    void beveg();
    void lei();
    void blogg();
    void løp();
    void kjøp();
    void pakkForTur();
}

// Studenten MÅ implementere ALLE 8 metoder —
// selv om den bare trenger spis() og drikk()!
class HjemmeStudent implements StudentLiv {
    public void drikk() { /* OK */ }
    public void spis() { /* OK */ }
    public void beveg() { /* trenger ikke */ }
    public void lei() { /* trenger ikke */ }
    public void blogg() { /* trenger ikke */ }
    public void løp() { /* trenger ikke */ }
    public void kjøp() { /* trenger ikke */ }
    public void pakkForTur() { /* trenger ikke */ }
    // 6 av 8 metoder er tomme/unødvendige!
}`}
        </CodeBlock>

        <CodeBlock title="FØLGER prinsippet" variant="good">
{`// Del opp i små, fokuserte grensesnitt:
interface Spisbar {
    void spis();
    void drikk();
}

interface Trenbar {
    void løp();
    void beveg();
}

interface Reisbar {
    void pakkForTur();
}

interface Handlebar {
    void kjøp();
    void lei();
}

// Nå implementerer hver klasse KUN det den trenger:
class HjemmeStudent implements Spisbar {
    public void spis() { /* OK */ }
    public void drikk() { /* OK */ }
    // Ferdig! Ingen unødvendige metoder.
}

class AktivStudent implements Spisbar, Trenbar {
    public void spis() { /* OK */ }
    public void drikk() { /* OK */ }
    public void løp() { /* OK */ }
    public void beveg() { /* OK */ }
    // Bare det som trengs!
}`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            Hvorfor er det viktig?
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              Klasser blir enklere å implementere — du slipper tomme metoder
            </li>
            <li>
              Endringer i ett grensesnitt påvirker ikke klasser som ikke bruker
              det
            </li>
            <li>
              Koden blir mer oversiktlig — du ser hva en klasse faktisk støtter
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">
            Kobling til GRASP og andre SOLID-prinsipper
          </h4>
          <p className="text-sm text-[var(--muted)]">
            ISP henger sammen med <strong>High Cohesion</strong> (GRASP) — et
            grensesnitt bør ha høy samhørighet. Det henger også sammen med{" "}
            <strong>SRP</strong> — hvert grensesnitt bør ha ett ansvarsområde.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
            Eksamensfelle
          </h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.8:</strong> Grensesnittet{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              StudentLife
            </code>{" "}
            med 8 urelaterte metoder → svaret er <strong>ISP</strong>. Når du
            ser et grensesnitt med mange urelaterte metoder, tenk ISP!
          </p>
        </div>
      </Section>

      {/* ═══════════════════ D — DIP ═══════════════════ */}
      <Section
        id="dip"
        letter="D"
        title="Dependency Inversion Principle (DIP)"
        subtitle="Avheng av abstraksjoner, ikke konkrete klasser"
        isOpen={open.dip}
        onToggle={() => toggle("dip")}
      >
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
            Hva betyr det?
          </h4>
          <p className="text-sm">
            Høynivå-moduler (de som styrer logikken) skal <strong>ikke</strong>{" "}
            avhenge direkte av lavnivå-moduler (de som gjør detaljarbeidet).
            Begge skal avhenge av <strong>abstraksjoner</strong> (grensesnitt).
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
            Tenk på det slik
          </h4>
          <p className="text-sm">
            En sjåfør bør ikke være bygget spesifikt for én biltype. Sjåføren
            bør kunne kjøre alt som har ratt, gass og brems — altså alt som
            følger &quot;grensesnittet&quot; for et kjøretøy. Sjåføren avhenger av
            abstraksjonen &quot;Kjørbar&quot;, ikke av den konkrete bilen.
          </p>
        </div>

        <CodeBlock title="BRYTER prinsippet — fra eksamen 2023!" variant="bad">
{`class Sjåfør {
    // Direkte avhengighet til KONKRET klasse!
    private Motorsykkel kjøretøy = new Motorsykkel();

    public void kjør() {
        kjøretøy.gass();
    }
}
// Problem: Hva om sjåføren skal kjøre Bil i stedet?
// Du MÅ endre Sjåfør-klassen! Tett kobling.

// Enda verre — if/else-kjede:
class MultiSjåfør {
    public void kjør(String type) {
        if (type.equals("bil")) {
            new Bil().gass();
        } else if (type.equals("motorsykkel")) {
            new Motorsykkel().gass();
        } else if (type.equals("lastebil")) {
            new Lastebil().gass();
        }
        // Avhenger av ALLE konkrete klasser!
    }
}`}
        </CodeBlock>

        <CodeBlock title="FØLGER prinsippet — fra eksamen 2023!" variant="good">
{`// 1. Definer en abstraksjon (grensesnitt):
interface Kjørbar {
    void gass();
    void brems();
    void svingVenstre();
    void svingHøyre();
}

// 2. Konkrete klasser implementerer grensesnittet:
class Bil implements Kjørbar {
    public void gass() { /* bilspesifikk */ }
    public void brems() { /* bilspesifikk */ }
    public void svingVenstre() { /* ... */ }
    public void svingHøyre() { /* ... */ }
}

class Motorsykkel implements Kjørbar {
    public void gass() { /* sykkelspesifikk */ }
    public void brems() { /* sykkelspesifikk */ }
    public void svingVenstre() { /* ... */ }
    public void svingHøyre() { /* ... */ }
}

// 3. Sjåføren avhenger av ABSTRAKSJONEN, ikke konkrete klasser:
class Sjåfør {
    private Kjørbar kjøretøy;  // Grensesnitt!

    public Sjåfør(Kjørbar kjøretøy) {
        this.kjøretøy = kjøretøy;
    }

    public void kjør() {
        kjøretøy.gass();  // Fungerer med ALT som er Kjørbar
    }
}

// Bruk:
Sjåfør s1 = new Sjåfør(new Bil());          // Kjører bil
Sjåfør s2 = new Sjåfør(new Motorsykkel());  // Kjører sykkel
// Ingen endring i Sjåfør-klassen nødvendig!`}
        </CodeBlock>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            Hvorfor er det viktig?
          </h4>
          <ul className="text-sm space-y-1">
            <li>
              Klasser kan byttes ut uten å endre kode som bruker dem
            </li>
            <li>Enklere testing — du kan lage &quot;mock&quot;-objekter for testing</li>
            <li>Lav kobling mellom moduler → koden er mer fleksibel</li>
            <li>
              Nye implementasjoner kan legges til uten å røre eksisterende kode
              (henger sammen med OCP!)
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-4">
          <h4 className="font-semibold text-sm mb-2">
            Kobling til GRASP
          </h4>
          <p className="text-sm text-[var(--muted)]">
            DIP henger sammen med GRASP-prinsippene{" "}
            <strong>Low Coupling</strong> (mindre avhengigheter mellom klasser),{" "}
            <strong>Indirection</strong> (grensesnittet er mellomlaget), og{" "}
            <strong>Protected Variations</strong> (grensesnittet beskytter mot
            endringer i konkrete klasser).
          </p>
        </div>

        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
            Eksamensfelle
          </h4>
          <p className="text-sm">
            <strong>2023, oppgave 2.9:</strong> Riktig svar er alternativ c) —{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              Driver
            </code>{" "}
            har et felt{" "}
            <code className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-xs">
              private Driveable vehicle
            </code>
            . Alternativ d) med if/else over konkrete typer er{" "}
            <strong>feil</strong> fordi det avhenger direkte av konkrete klasser.
          </p>
        </div>
      </Section>

      {/* Oppsummering */}
      <div className="rounded-xl border-2 border-sysdev-400/40 bg-gradient-to-br from-sysdev-50 to-emerald-50 dark:from-sysdev-950/30 dark:to-emerald-950/20 p-6 mt-8 mb-4">
        <h2 className="font-bold text-lg mb-3 text-sysdev-700 dark:text-sysdev-400">
          SOLID-oppsummering
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sysdev-200 dark:border-sysdev-800">
                <th className="text-left py-2 pr-3 font-bold">Prinsipp</th>
                <th className="text-left py-2 pr-3 font-bold">Huskeregel</th>
                <th className="text-left py-2 font-bold">Nøkkelord på eksamen</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-3 font-medium text-[var(--foreground)]">SRP</td>
                <td className="py-2 pr-3">Én klasse, én jobb</td>
                <td className="py-2">&quot;gjør for mye&quot;, &quot;mange grunner til å endre&quot;</td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-3 font-medium text-[var(--foreground)]">OCP</td>
                <td className="py-2 pr-3">Utvid, ikke endre</td>
                <td className="py-2">&quot;betydelige endringer&quot;, &quot;ny funksjonalitet&quot;</td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-3 font-medium text-[var(--foreground)]">LSP</td>
                <td className="py-2 pr-3">Subklasser holder løfter</td>
                <td className="py-2">&quot;UnsupportedOperationException&quot;, &quot;erstatte&quot;</td>
              </tr>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                <td className="py-2 pr-3 font-medium text-[var(--foreground)]">ISP</td>
                <td className="py-2 pr-3">Små grensesnitt</td>
                <td className="py-2">&quot;mange urelaterte metoder&quot;, &quot;tvunget til&quot;</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium text-[var(--foreground)]">DIP</td>
                <td className="py-2 pr-3">Avheng av grensesnitt</td>
                <td className="py-2">&quot;konkret klasse&quot;, &quot;abstraksjon&quot;, &quot;if/else type&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Next page link */}
      <div className="flex justify-between items-center mt-8">
        <Link
          href="/dat109/ooa-ood"
          className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Tilbake til oversikt
        </Link>
        <Link
          href="/dat109/ooa-ood/grasp"
          className="flex items-center gap-2 text-sm font-medium text-sysdev-600 dark:text-sysdev-400 hover:underline"
        >
          GRASP-mønstrene
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
