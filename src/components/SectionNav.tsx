"use client";

import { useEffect, useState, useRef } from "react";

export interface Section {
  id: string;
  label: string;
  icon: string;
}

interface SectionNavProps {
  sections: Section[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const navRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isClickScrolling.current = true;
    setActive(id);

    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  // Keep active tab scrolled into view in the nav bar
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector(`[data-section="${active}"]`);
    if (activeBtn) {
      (activeBtn as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--card-border)] -mx-4 px-4 mb-8"
    >
      <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-2" aria-label="Seksjoner">
        {sections.map((s) => (
          <button
            key={s.id}
            data-section={s.id}
            onClick={() => scrollTo(s.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              active === s.id
                ? "bg-[var(--accent)] text-white shadow-sm"
                : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
            }`}
          >
            <span className="text-base leading-none">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
