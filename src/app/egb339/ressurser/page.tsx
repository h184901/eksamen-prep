import { getEgb339En, getEgb339Resources } from "@/lib/egb339-vault/loader";
import { egb339Title } from "@/lib/egb339-titles";
import { EGB339_UI } from "@/lib/egb339-language/ui";
import { T } from "@/components/egb339/T";
import ResourceList, { type ResourceRow } from "@/components/egb339/ResourceList";

export default function Egb339ResourcesPage() {
  const rows: ResourceRow[] = getEgb339Resources().map((entry) => {
    const en = getEgb339En(entry.slug);
    return {
      slug: entry.slug,
      route: entry.route,
      pageKey: "egb339/ressurs/" + entry.slug,
      titleNo: egb339Title(entry.slug, "no") ?? entry.title,
      titleEn: en?.title ?? entry.title,
      summaryNo: entry.summary,
      summaryEn: en?.summary ?? entry.summary,
      week: entry.week,
    };
  });
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header">
      <h1><T no={EGB339_UI.resourcesPageTitle.no} en={EGB339_UI.resourcesPageTitle.en} /></h1>
      <p><T no={EGB339_UI.resourcesPageIntro.no} en={EGB339_UI.resourcesPageIntro.en} /></p>
    </header>
    <ResourceList rows={rows} />
  </article>;
}