import DAT110ChapterLayout from "@/components/DAT110ChapterLayout";
import ChapterSubNav from "@/components/ChapterSubNav";
import { dat110Chapters } from "@/lib/dat110-chapters";

const chapter = dat110Chapters.find((c) => c.slug === "cn-4")!;

export default function CN4Layout({ children }: { children: React.ReactNode }) {
  return (
    <DAT110ChapterLayout chapter={chapter}>
      <ChapterSubNav basePath="/dat110/cn-4" />
      {children}
    </DAT110ChapterLayout>
  );
}
