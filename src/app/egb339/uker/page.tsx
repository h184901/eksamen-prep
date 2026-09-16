import { Egb339Syllabus } from "@/components/egb339/pilot/Egb339CourseNavigation";
import { getEgb339Course } from "@/lib/egb339-course-loader";
export default function Egb339WeeksPage() {
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header"><h1>Emne for emne</h1><p>Leksjoner, oppgaver og pensumkoblinger i kursrekkefølge. Åpne et emne for å se temaene, oppgavene og assessmentene som hører til.</p></header>
    <Egb339Syllabus weeks={getEgb339Course()} />
  </article>;
}
