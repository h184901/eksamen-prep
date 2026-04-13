import ChapterLayout from "@/components/ChapterLayout";
import ChapterSubNav from "@/components/ChapterSubNav";
import { chapters } from "@/lib/chapters";

const chapter = chapters.find((c) => c.id === 29)!;

export default function Kapittel29Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChapterLayout chapter={chapter}>
      <ChapterSubNav basePath="/ing164/kapittel-29" />
      {children}
    </ChapterLayout>
  );
}
