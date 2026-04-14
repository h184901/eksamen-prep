"use client";

import Link from "next/link";
import type { DAT110Chapter } from "@/lib/dat110-chapters";
import { dat110Chapters } from "@/lib/dat110-chapters";

interface DAT110ChapterLayoutProps {
  chapter: DAT110Chapter;
  children: React.ReactNode;
}

export default function DAT110ChapterLayout({
  chapter,
  children,
}: DAT110ChapterLayoutProps) {
  const currentIndex = dat110Chapters.findIndex((c) => c.id === chapter.id);
  const prev = currentIndex > 0 ? dat110Chapters[currentIndex - 1] : null;
  const next =
    currentIndex < dat110Chapters.length - 1
      ? dat110Chapters[currentIndex + 1]
      : null;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[var(--accent)]">
          Hjem
        </Link>
        <span>/</span>
        <Link href="/dat110" className="hover:text-[var(--accent)]">
          DAT110
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{chapter.title}</span>
      </div>

      {/* Chapter header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-network-600 dark:text-network-400 mb-1">
          {chapter.bookRef}
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
            href={`/dat110/${prev.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div>
              <p className="text-xs">Forrige</p>
              <p className="font-medium">
                {prev.bookRef}: {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/dat110/${next.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] text-right"
          >
            <div>
              <p className="text-xs">Neste</p>
              <p className="font-medium">
                {next.bookRef}: {next.title}
              </p>
            </div>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
