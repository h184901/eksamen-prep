import Dat102Section from "@/components/dat102/Dat102Section";
import TopicCard from "@/components/dat102/TopicCard";
import {
  getOrderedTopics,
  getTopicStats,
} from "@/components/dat102/dat102-derived";
import { displayTitle, extractDescription, plainText } from "@/components/dat102/md-utils";
import Dat102Breadcrumbs from "@/components/dat102/Dat102Breadcrumbs";

export const metadata = {
  title: "Temaer — DAT102",
  description:
    "Alle 14 hovedtemaer i DAT102 i semesterrekkefølge — fra Bag-ADT til grafer.",
};

export default function TemaerPage() {
  const topics = getOrderedTopics();

  return (
    <div>
      <Dat102Breadcrumbs trail={[{ label: "Temaer" }]} />
      <Dat102Section
        eyebrow={`${topics.length} temaer · semesterrekkefølge`}
        title="Temaer"
        description="Hvert tema samler begreper, forelesninger og kilder for én del av kurset. Rekkefølgen følger semesterplanen — temaene bygger på hverandre."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((t, i) => {
            const stats = getTopicStats(t.slug);
            return (
              <TopicCard
                key={t.slug}
                index={i + 1}
                slug={t.slug}
                title={displayTitle(t.title)}
                description={plainText(extractDescription(t.body))}
                conceptCount={stats.conceptCount}
                practiceCount={stats.quizCount + stats.drillCount}
                examSubqCount={stats.examSubqCount}
                obligCount={stats.obligCount}
                lectureRefs={stats.lectureRefs}
                chapters={stats.chapters}
              />
            );
          })}
        </div>
      </Dat102Section>
    </div>
  );
}
