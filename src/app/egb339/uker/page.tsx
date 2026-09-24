import { Egb339Syllabus } from "@/components/egb339/pilot/Egb339CourseNavigation";
import { getEgb339Course } from "@/lib/egb339-course-loader";
import { T } from "@/components/egb339/T";
import { EGB339_UI } from "@/lib/egb339-language/ui";
export default function Egb339WeeksPage() {
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header"><h1><T no={EGB339_UI.syllabusHeading.no} en={EGB339_UI.syllabusHeading.en} /></h1><p><T no={EGB339_UI.syllabusIntro.no} en={EGB339_UI.syllabusIntro.en} /></p></header>
    <Egb339Syllabus weeks={getEgb339Course()} />
  </article>;
}
