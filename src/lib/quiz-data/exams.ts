/**
 * Komplette eksamener for eksamenssimulering.
 * Hver ExamSet har spørsmål i rekkefølge + open parts (oppgave 1 og 4).
 *
 * Mål: V2023, V2024, KontH2023 — de tre med flervalg-format.
 * Fylles inn av agent.
 */

import type { ExamSet } from "@/lib/quiz-types";
import { EXAM_QUESTIONS } from "./exam-extracted";

// Helper for å hente spørsmål fra exam-extracted basert på source
function questionsBySource(source: string) {
  return EXAM_QUESTIONS.filter((q) => q.source === source);
}

export const EXAM_SETS: ExamSet[] = [
  {
    id: "v2024",
    year: "2024",
    label: "Eksamen vår 2024 — Skyjo",
    description: "Mest representative for vår eksamen. Komplett 4-timers eksamen med flervalg + 2 åpne oppgaver.",
    durationMinutes: 240,
    questions: questionsBySource("V2024"),
    openParts: [
      {
        id: "v2024-1",
        number: "1",
        weight: "40%",
        durationMinutes: 96,
        title: "Modellering — Skyjo (kortspill)",
        description:
          "Modellér kortspillet Skyjo (2-8 spillere, 150 kort, mål er færrest poeng). Lag: brukstilfellemodell + brukstilfellebeskrivelser, domenemodell (klassediagram med konseptuelle klasser), og sekvensdiagram for brukstilfellene (maks 3).",
        expectedAnswer:
          "Brukstilfeller (2-3): Init spill, Spill omgang, Spill tur. Domenemodell: Skyjo, Spiller, Kort, Kortstokk, Kastehaug, Omgang, Poengblokk, Rad — vanlige assosiasjoner + multiplisitet, ingen aggregering/komposisjon (per Atles regel for domenemodell). Sekvensdiagram for 'Spill tur': Spiller trekker kort fra kastehaug → loop for kortbytte → opt for å åpne et skjult kort → noter poeng.",
        rubric: [
          "Brukstilfellediagram med aktør, system og 2-4 brukstilfeller (IKKE flytdiagram)",
          "Tekstlige brukstilfellebeskrivelser med nummererte steg og forkrav",
          "Domenemodell uten metoder, med multiplisitet på alle assosiasjoner",
          "Spesialisering brukt der naturlig (men ikke tvunget — Skyjo trenger sannsynligvis ikke arv)",
          "Sekvensdiagram med riktig bruk av loop, alt, opt",
          "Diagrammene er konsistente med hverandre",
          "Atles regel: domenemodell bruker IKKE komposisjon/aggregering — bare vanlige assosiasjoner + spesialisering",
        ],
      },
      {
        id: "v2024-4",
        number: "4",
        weight: "20%",
        durationMinutes: 48,
        title: "OOP — Lerret (tegneprogram)",
        description:
          "Gitt klassediagram for et tegneprogram (Lerret med List<Figur>, Figur-grensesnitt, Sirkel, Rektangel, Posisjon) og to sekvensdiagram. (a) Skriv Java-skall for alle klasser/grensesnitt — bare signatur, ikke implementasjon. (b) Implementer finnAreal() og tegn() i Lerret slik at de samsvarer med sekvensdiagrammet.",
        expectedAnswer:
          "(a) public interface Figur { Double areal(); Posisjon getPos(); void tegn(); } public class Sirkel implements Figur { ... } osv. (b) finnAreal(): for hver figur, hent posisjon, hvis innenfor lerret legg til areal i totalt. tegn(): for hver figur, hvis innenfor lerret kall figur.tegn().",
        rubric: [
          "Alle klasser har riktig synlighet (private felt, public metoder)",
          "Grensesnitt deklarert med interface, ingen attributter",
          "implements brukt for konkrete klasser",
          "List<Figur> med ArrayList<Figur>() i Lerret",
          "@Override på implementerte metoder",
          "JavaDoc på public metoder (gir plusspoeng)",
          "finnAreal() og tegn() følger sekvensdiagrammet eksakt",
          "Antagelser/endringer eksplisitt notert om noe er uklart",
        ],
      },
    ],
  },
  {
    id: "v2023",
    year: "2023",
    label: "Eksamen vår 2023 — Max Mümmelmann",
    description: "Beste referanse — Atles løsningsforslag er komplett. Første eksamen med flervalg-format.",
    durationMinutes: 240,
    questions: questionsBySource("V2023"),
    openParts: [
      {
        id: "v2023-1",
        number: "1",
        weight: "40%",
        durationMinutes: 96,
        title: "Modellering — Max Mümmelmann (kortspill)",
        description:
          "Familiekortspill med 2-4 spillere. Trill terning, flytt brikke, ta kort. Lag brukstilfellemodell, domenemodell og sekvensdiagram (maks 3 brukstilfeller).",
        expectedAnswer:
          "3 brukstilfeller: Init spill, Start spill (includes Init spill), Spill tur. Domenemodell: MaxMummelmann, Brett (1-8 ruter), Spiller (2-4), Brikke, Terning, Kort. Spiller har 0-6 kort (familie). Sekvensdiagram for 'Spill tur': trill, flytt, ta kort, alt-fragment for behold/legg-tilbake, opt for nytt kast hvis 6.",
        rubric: [
          "3 brukstilfeller (Init spill, Start spill, Spill tur)",
          "Include-relasjon mellom Start spill og Init spill",
          "Domenemodell uten metoder, med korrekt multiplisitet (2-4 spillere, 8 ruter, 0-6 kort)",
          "Sekvensdiagram med løkker og betingelser (alt for behold/legg, opt for 6)",
          "Diagrammene er konsistente",
        ],
      },
      {
        id: "v2023-4",
        number: "4",
        weight: "20%",
        durationMinutes: 48,
        title: "OOP — Canvas (tegneprogram)",
        description:
          "Klassediagram med Canvas (List<Figure>), Figure-grensesnitt med area() og getPos(), Square og Circle som implementerer Figure. Implementer totalArea() i Canvas — for hver figur, hvis posisjon (x>0 og y>0), legg til areal.",
        expectedAnswer:
          "public Double totalArea() { Double total = 0.0; for (Figure f : figures) { Position pos = f.getPos(); if (pos.getX() > 0 && pos.getY() > 0) total += f.area(); } return total; }",
        rubric: [
          "for-each over List<Figure>",
          "Hent posisjon med getPos()",
          "Sjekk pos.getX() > 0 && pos.getY() > 0",
          "Legg til f.area() i akkumulator",
          "Returner Double total",
          "JavaDoc",
          "Notere antagelse: Figure-grensesnittet kan ikke ha attributter (Pos), så pos må flyttes til konkrete klasser",
        ],
      },
    ],
  },
];
