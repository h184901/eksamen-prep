"use client";

import Link from "next/link";
import ProgressTracker from "@/components/ProgressTracker";

const sections = ["Teori", "Formler", "Oppgaver", "Visualiseringer"];

export default function Kapittel8Oversikt() {
  return (
    <div>
      <ProgressTracker chapterId={8} sections={sections} />

      <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
        Kapittel 8 handler om <strong>bevegelsesmengde og kollisjoner</strong>. Du lærer
        kraftimpuls-momentteoremet, bevaring av bevegelsesmengde, og hvordan du skiller mellom
        elastiske og inelastiske kollisjoner. Massesenteret og ballistisk pendel er klassiske
        eksamenstemaer.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/ing164/kapittel-8/teori"
          className="rounded-xl border-2 border-blue-400 bg-[var(--card)] p-6 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors group"
        >
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            Teori
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Bevegelsesmengde, kraftimpuls, bevaring, kollisjonstyper og massesenter — forklart med
            intuisjon og eksempler.
          </p>
        </Link>

        <Link
          href="/ing164/kapittel-8/formler"
          className="rounded-xl border-2 border-amber-400 bg-[var(--card)] p-6 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors group"
        >
          <h3 className="font-bold text-lg mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
            Formler
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Alle formler med KaTeX, fargekodede bokser og «Når bruker du hva?»-guide.
          </p>
        </Link>

        <Link
          href="/ing164/kapittel-8/oppgaver"
          className="rounded-xl border-2 border-green-400 bg-[var(--card)] p-6 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors group"
        >
          <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 dark:group-hover:text-green-400">
            Oppgaver
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Strategier, gjennomgåtte eksempler, øvingsoppgaver fra obliger og eksamensoppgaver med
            løsninger.
          </p>
        </Link>

        <Link
          href="/ing164/kapittel-8/visualiseringer"
          className="rounded-xl border-2 border-purple-400 bg-[var(--card)] p-6 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors group"
        >
          <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            Visualiseringer
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Interaktive simuleringer av 1D-kollisjoner, ballistisk pendel og kraftimpuls — juster
            parametere og se resultatet live.
          </p>
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
        <h3 className="font-semibold text-lg mb-4">Temaer i dette kapittelet</h3>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          <li className="flex gap-2">
            <span className="text-[var(--accent)] font-bold">8.1</span>
            <span>Bevegelsesmengde og kraftimpuls — p = mv, J = Δp, impuls-momentum-teoremet</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)] font-bold">8.2</span>
            <span>Bevaring av bevegelsesmengde — Newtons 3. lov, isolerte systemer, 2D-kollisjoner</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)] font-bold">8.3</span>
            <span>Inelastiske kollisjoner — fullstendig inelastisk, energitap, ballistisk pendel</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)] font-bold">8.4</span>
            <span>Elastiske kollisjoner — to ligninger, spesialtilfeller, triviell løsning</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)] font-bold">8.5</span>
            <span>Massesenter — posisjon, fart, akselerasjon, Newtons 2. lov for systemer</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
