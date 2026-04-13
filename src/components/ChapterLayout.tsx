"use client";

import Link from "next/link";
import type { Chapter } from "@/lib/chapters";
import { chapters } from "@/lib/chapters";

interface ChapterLayoutProps {
  chapter: Chapter;
  children: React.ReactNode;
}

export default function ChapterLayout({ chapter, children }: ChapterLayoutProps) {
  const currentIndex = chapters.findIndex((c) => c.id === chapter.id);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/ing164" className="hover:text-[var(--accent)]">
          ING164
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Kapittel {chapter.id}</span>
      </div>

      {/* Chapter header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-[var(--accent)] mb-1">
          Kapittel {chapter.id}
        </p>
        <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
        <p className="text-[var(--muted)]">{chapter.description}</p>
      </div>

      {/* Content */}
      <div>{children}</div>

      {/* Chapter navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--card-border)]">
        {prev ? (
          <Link
            href={`/ing164/${prev.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <div>
              <p className="text-xs">Forrige</p>
              <p className="font-medium">Kap {prev.id}: {prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/ing164/${next.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] text-right"
          >
            <div>
              <p className="text-xs">Neste</p>
              <p className="font-medium">Kap {next.id}: {next.title}</p>
            </div>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
