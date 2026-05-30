import { getAllQuizQuestions, getExamSummaries } from "@/lib/dat110-vault/loader";
import { sourceKindOf } from "@/lib/dat110-quiz-types";
import flashcardsData from "@/data/dat110-vault/flashcards.json";
import matchingData from "@/data/dat110-vault/matching.json";
import calculationData from "@/data/dat110-vault/calculation-drills.json";
import OvingHubContent from "@/components/dat110/oving/OvingHubContent";

export const metadata = {
  title: "Øving og drilling — DAT110",
};

export default function DAT110OvingHubPage() {
  const allQuestions = getAllQuizQuestions();
  const quizCount = allQuestions.length;

  const bySource = { exam: 0, canvas: 0, generated: 0 } as Record<
    "exam" | "canvas" | "generated",
    number
  >;
  for (const q of allQuestions) bySource[sourceKindOf(q.source)] += 1;

  return (
    <OvingHubContent
      quizCount={quizCount}
      flashcardCount={flashcardsData.cards.length}
      matchingCount={matchingData.pairs.length}
      calculationCount={calculationData.drills.length}
      examCount={getExamSummaries().length}
      bySource={bySource}
    />
  );
}
