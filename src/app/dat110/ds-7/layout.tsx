import DAT110ChapterLayout from "@/components/DAT110ChapterLayout";
import ChapterSubNav from "@/components/ChapterSubNav";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "ds-7")!;

export default function DS7Layout({ children }: { children: React.ReactNode }) {
  return (
    <DAT110ChapterLayout chapter={chapter}>
      <ChapterSubNav basePath="/dat110/ds-7" />
      {children}
    </DAT110ChapterLayout>
  );
}
