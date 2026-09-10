import { egb339DisplayTitle } from "./egb339";
import { getEgb339AssessmentSolution } from "./egb339-assessment-solutions";
import { EGB339_COURSE_ORDER, type Egb339CourseWeek } from "./egb339-course";
import { getEgb339Assessments, getEgb339Concept, getEgb339Week } from "./egb339-vault/loader";

/** Server-side projection: only link metadata, never the full source bodies, reaches the sidebar. */
export function getEgb339Course(): Egb339CourseWeek[] {
  return EGB339_COURSE_ORDER.map(({ week, topics }) => {
    const entry = getEgb339Week(`uke-${week}`);
    if (!entry) throw new Error(`Missing EGB339 week ${week}`);
    return {
      week, href: entry.route, title: egb339DisplayTitle(entry), pageKey: `egb339/uke/${entry.slug}`,
      topics: topics.map((slug) => {
        const topic = getEgb339Concept(slug);
        if (!topic) throw new Error(`Missing EGB339 topic ${slug}`);
        return {
          href: topic.route,
          title: slug === "se-2-homogeneous-transformations" ? "SE(2): rotasjon og translasjon" : topic.title,
          pageKey: `egb339/tema/${slug}`,
        };
      }),
      // Curriculum association, not submission week. Reuses the authored source mapping.
      assessments: getEgb339Assessments().filter((assessment) =>
        getEgb339AssessmentSolution(assessment.slug)?.weeks.includes(week),
      ).map((assessment) => ({
        href: assessment.route, title: assessment.title.replace(/^Assessment /, ""),
        pageKey: `egb339/vurdering/${assessment.slug}`,
      })),
    };
  });
}
