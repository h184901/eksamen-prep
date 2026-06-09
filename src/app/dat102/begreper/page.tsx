import Dat102Section from "@/components/dat102/Dat102Section";
import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";
import ConceptBrowser, {
  type ConceptBrowserGroup,
  type ConceptBrowserItem,
} from "@/components/dat102/ConceptBrowser";
import { getAllConcepts } from "@/lib/dat102-vault/loader";
import {
  getOrderedTopics,
  primaryTopicSlug,
  topicTitle,
} from "@/components/dat102/dat102-derived";
import { displayTitle, extractDescription, plainText } from "@/components/dat102/md-utils";

export const metadata = {
  title: "Begreper — DAT102",
  description:
    "Alle sentrale DAT102-begreper med definisjoner — søkbart og gruppert etter tema.",
};

export default function BegreperPage() {
  const concepts = getAllConcepts();

  const items: ConceptBrowserItem[] = concepts
    .map((c) => {
      const topicSlug = primaryTopicSlug(c);
      return {
        slug: c.slug,
        title: displayTitle(c.title),
        description: plainText(extractDescription(c.body)),
        topicSlug,
        topicLabel: topicSlug ? topicTitle(topicSlug) : null,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "nb"));

  // Gruppe-rekkefølge = semesterrekkefølgen på temaer; begreper uten
  // primær-tema havner i "Øvrig" til slutt.
  const groups: ConceptBrowserGroup[] = getOrderedTopics()
    .map((t) => ({ slug: t.slug, label: displayTitle(t.title) }))
    .filter((g) => items.some((i) => i.topicSlug === g.slug));
  if (items.some((i) => i.topicSlug === null)) {
    groups.push({ slug: "ovrig", label: "Øvrig" });
  }

  return (
    <div>
      <Dat102Breadcrumbs trail={[{ label: "Begreper" }]} />
      <Dat102Section
        eyebrow={`${items.length} begreper`}
        title="Begreper"
        description="Hvert begrep har definisjon, eksempler og vanlige feil — hentet fra forelesningsmateriellet. Søk, eller filtrer på tema."
      >
        <ConceptBrowser items={items} groups={groups} />
      </Dat102Section>
    </div>
  );
}
