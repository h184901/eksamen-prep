import ChapterLayout from "@/components/ChapterLayout";
import ChapterSubNav from "@/components/ChapterSubNav";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 9)!;

export default function Kapittel9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChapterLayout chapter={chapter}>
      <ChapterSubNav basePath="/ing164/kapittel-9" />
      {children}
    </ChapterLayout>
  );
}
