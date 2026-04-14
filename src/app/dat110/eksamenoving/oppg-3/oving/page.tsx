"use client";

import { FlashcardDeck } from "@/components/Flashcard";
import { QuizSet } from "@/components/QuizQuestion";

const flashcards = [
  { front: "Hva er formelen for sendingsforsinkelse?", back: "d_trans = L / R — L er pakkestørrelse i bits, R er linkkapasitet i bps. Avhenger IKKE av avstand." },
  { front: "Hva er formelen for forplantningsforsinkelse?", back: "d_prop = d / s — d er avstand i meter, s er forplantningshastighet (~2×10⁸ m/s i kabel, ~3×10⁸ i luft). Avhenger IKKE av pakkestørrelse." },
  { front: "Hva er de fire typene forsinkelse?", back: "1) Prosessering (d_proc) — sjekk header, routing. 2) Kø (d_queue) — vente i buffer. 3) Sending (d_trans) — L/R. 4) Forplantning (d_prop) — d/s." },
  { front: "Hva er trafikkintensitet?", back: "La = L×a/R der a = pakker per sekund. Når La > 1 vokser køen uendelig. La nær 1 gir stor kø-forsinkelse. La << 1 gir minimal forsinkelse." },
  { front: "Hva er gjennomstrømning (throughput)?", back: "Effektiv datahastighet mellom kilde og mottaker. Begrenset av flaskehalsen: throughput = min(R₁, R₂, ..., Rₙ) langs stien." },
  { front: "Hva er store-and-forward forsinkelse?", back: "Hele pakken må mottas før den sendes videre. For N lenker: total sendingsforsinkelse = N × (L/R) uten propagering og kø." },
  { front: "Hva bestemmer flaskehalsen i et nettverk?", back: "Linken med lavest kapasitet langs stien. Ved delt link: kapasitet/antall samtidige par." },
  { front: "Hva er forskjellen mellom sendingsforsinkelse og forplantningsforsinkelse?", back: "Sending = tid for å pushe alle bits ut på linken (avhenger av pakkestørrelse). Forplantning = tid for signalet å reise gjennom mediet (avhenger av avstand)." },
  { front: "Hvordan beregner du ende-til-ende-forsinkelse?", back: "Summer nodalforsinkelsen for hvert ledd (node) langs stien. Husk: mottakernoden har ingen nodalforsinkelse." },
  { front: "Hva skjer når trafikkintensitet La/R = 1?", back: "Gjennomsnittlig kø-forsinkelse vokser mot uendelig. I praksis betyr det pakketap fordi bufferen er begrenset." },
];

const quizQuestions = [
  {
    question: "En pakke på 1500 bytes sendes over en link med kapasitet 10 Mbps. Hva er sendingsforsinkelsen?",
    options: ["0.15 ms", "1.2 ms", "1.5 ms", "15 ms"],
    correctIndex: 1,
    explanation: "d_trans = L/R = (1500 × 8) / (10 × 10⁶) = 12 000 / 10 000 000 = 0.0012 s = 1.2 ms. Husk: konverter bytes til bits (×8)!",
  },
  {
    question: "Hva er forplantningsforsinkelsen over en 200 km fiberlink (s = 2×10⁸ m/s)?",
    options: ["0.1 ms", "0.5 ms", "1.0 ms", "2.0 ms"],
    correctIndex: 2,
    explanation: "d_prop = d/s = 200 000 / (2×10⁸) = 10⁻³ s = 1.0 ms.",
  },
  {
    question: "To lenker i serie: R₁ = 100 Mbps, R₂ = 10 Mbps. Hva er gjennomstrømningen?",
    options: ["100 Mbps", "55 Mbps", "10 Mbps", "110 Mbps"],
    correctIndex: 2,
    explanation: "Gjennomstrømning = min(R₁, R₂) = min(100, 10) = 10 Mbps. Flaskehalsen bestemmer.",
  },
  {
    question: "En pakke (1000 bits) sendes over 3 lenker (store-and-forward), hver med R = 1 Mbps. Total sendingsforsinkelse?",
    options: ["1 ms", "2 ms", "3 ms", "4 ms"],
    correctIndex: 2,
    explanation: "Store-and-forward: 3 lenker × (1000 / 10⁶) = 3 × 1 ms = 3 ms.",
  },
  {
    question: "d_proc = 0.002 s, d_queue = 0.01 s, d_trans = 0.001 s, d_prop = 0.00002 s. Hva er nodalforsinkelsen?",
    options: ["0.013 s", "0.01302 s", "0.01 s", "0.003 s"],
    correctIndex: 1,
    explanation: "d_nodal = 0.002 + 0.01 + 0.001 + 0.00002 = 0.01302 s. Summer alle fire typene.",
  },
  {
    question: "Med trafikkintensitet La/R = 0.8, hva forventer vi?",
    options: ["Ingen forsinkelse", "Moderat kø-forsinkelse", "Uendelig kø-forsinkelse", "Pakketap"],
    correctIndex: 1,
    explanation: "La/R < 1 betyr stabilt system, men 0.8 er høyt — det vil være merkbar kø-forsinkelse. La/R ≥ 1 gir ustabilt system.",
  },
  {
    question: "4 klienter deler en 100 Mbps-link. Hva er gjennomstrømningen per klient?",
    options: ["100 Mbps", "50 Mbps", "25 Mbps", "10 Mbps"],
    correctIndex: 2,
    explanation: "Ved rettferdig deling: 100/4 = 25 Mbps per klient.",
  },
  {
    question: "Hvilken forsinkelsestype er typisk dominerende for lange avstander?",
    options: ["Prosesseringsforsinkelse", "Kø-forsinkelse", "Sendingsforsinkelse", "Forplantningsforsinkelse"],
    correctIndex: 3,
    explanation: "Over lange avstander dominerer forplantningsforsinkelsen (d/s). Over korte avstander med store pakker dominerer sendingsforsinkelsen (L/R).",
  },
];

export default function Oppg3Oving() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Flashcards</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Klikk på kortet for å se svaret. Øv til du kan alle uten å nøle.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Quiz</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Beregningsoppgaver i eksamensstil. Bruk formlene og sjekk enhetene!
        </p>
        <QuizSet questions={quizQuestions} />
      </div>
    </div>
  );
}
