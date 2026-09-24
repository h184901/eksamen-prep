import { getEgb339Assessments, getEgb339En } from "@/lib/egb339-vault/loader";
import { getEgb339AssessmentSolution } from "@/lib/egb339-assessment-solutions";
import { egb339Title } from "@/lib/egb339-titles";
import AssessmentOverviewList from "@/components/egb339/AssessmentOverviewList";
import { T } from "@/components/egb339/T";
import { EGB339_UI } from "@/lib/egb339-language/ui";

export default function Egb339AssessmentsPage() {
  const entries = getEgb339Assessments();
  const groups = [
    { titleNo: "Vurderingsoversikter", titleEn: "Assessment overviews", descriptionNo: "Samlede krav og vurderingsform.", descriptionEn: "Combined requirements and assessment format.", entries: entries.filter((entry) => !/Assessment\s+\d+\.\d+/i.test(entry.title)) },
    { titleNo: "Assessment 1 · Problem-solving tasks", titleEn: "Assessment 1 · Problem-solving tasks", descriptionNo: "Generelle Python-funksjoner testet med offentlige og private tester.", descriptionEn: "General Python functions tested with public and private tests.", entries: entries.filter((entry) => /^Assessment\s+1\./i.test(entry.title)) },
    { titleNo: "Assessment 2 · Applied project", titleEn: "Assessment 2 · Applied project", descriptionNo: "Fra simulert Dobot til fysisk robot. 2.3 og 2.4 legges til når detaljsidene publiseres.", descriptionEn: "From a simulated Dobot to a physical robot. 2.3 and 2.4 are added when the detail pages are published.", entries: entries.filter((entry) => /^Assessment\s+2\./i.test(entry.title)) },
  ];
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header"><h1><T no={EGB339_UI.assessmentsPageTitle.no} en={EGB339_UI.assessmentsPageTitle.en} /></h1><p><T no={EGB339_UI.assessmentsPageIntro.no} en={EGB339_UI.assessmentsPageIntro.en} /></p></header>
    <section aria-labelledby="assessment-weights-heading"><h2 id="assessment-weights-heading"><T no={EGB339_UI.weightsHeading.no} en={EGB339_UI.weightsHeading.en} /></h2>
      <dl className="egb-study-weights">
        <div><dt>Assessment 1 · 20 %</dt><dd><T no="Korte programmeringsoppgaver: 10 % robotikk og 10 % computer vision." en="Short programming tasks: 10 % robotics and 10 % computer vision." /></dd></div>
        <div><dt>Assessment 2 · 45 %</dt><dd><T no="Anvendt prosjekt i fire deler, fra simulering til fysisk robot og vision-guided pick-and-place." en="Applied project in four parts, from simulation to a physical robot and vision-guided pick-and-place." /></dd></div>
        <div><dt><T no="Skriftlig eksamen · 35 %" en="Written exam · 35 %" /></dt><dd><T no="Tester både robotikk- og computer-vision-delen av emnet." en="Tests both the robotics and computer vision parts of the subject." /></dd></div>
      </dl>
      <p className="egb-study-source-warning"><strong><T no={EGB339_UI.vivaRule.no} en={EGB339_UI.vivaRule.en} /></strong> <T no={EGB339_UI.vivaText.no} en={EGB339_UI.vivaText.en} /></p>
    </section>
    {groups.map((group) => <section key={group.titleNo}><h2><T no={group.titleNo} en={group.titleEn} /></h2><p><T no={group.descriptionNo} en={group.descriptionEn} /></p>
      <AssessmentOverviewList rows={group.entries.map((entry) => ({
        slug: entry.slug,
        href: entry.route,
        pageKey: "egb339/vurdering/" + entry.slug,
        titleNo: entry.title,
        titleEn: egb339Title(entry.slug, "en"),
        summaryNo: entry.summary,
        summaryEn: getEgb339En(entry.slug)?.summary ?? null,
        weeks: getEgb339AssessmentSolution(entry.slug)?.weeks ?? [],
        week: entry.week,
      }))} />
    </section>)}
  </article>;
}