import QuizRunner from "@/components/dat110/oving/QuizRunner";
import QuizPageHeader from "@/components/dat110/oving/QuizPageHeader";
import { getAllQuizQuestions } from "@/lib/dat110-vault/loader";

export const metadata = {
  title: "Flervalg-quiz — DAT110",
};

// /dat110/oving hub is implemented in P0c.3; until then the "Øving"-crumb is
// plain text. We keep the route '/dat110/oving/quiz' so we can hot-link from
// the landing redesign (P0c.4) without touching this file again.
export default function QuizPage() {
  const allQuestions = getAllQuizQuestions();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <QuizPageHeader />
      <QuizRunner allQuestions={allQuestions} />
    </div>
  );
}
