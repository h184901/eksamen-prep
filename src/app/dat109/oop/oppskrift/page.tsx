"use client";

import Link from "next/link";
import DAT109SubNav from "@/components/dat109/DAT109SubNav";
import { oopPages, dat109BasePaths } from "@/lib/dat109-subpages";
import { Code } from "@/components/dat109/OopComponents";

export default function OppskriftPage() {
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
        <span className="text-[var(--foreground)]">Oppskrift og maler</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Oppskrift og maler</h1>
        <p className="text-[var(--muted)] max-w-2xl">
          Steg-for-steg-oppskrift for Oppgave 4a og 4b, JavaDoc-mal, fire gjentakende mønstre fra
          2020–2024 og en hurtigreferanse for UML → Java-oversettelser.
        </p>
      </div>

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
