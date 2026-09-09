"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const items = [
  { href: "/egb339", label: "Oversikt" },
  { href: "/egb339/uker", label: "Uker" },
  { href: "/egb339/temaer", label: "Temaer" },
  { href: "/egb339/vurderinger", label: "Vurderinger" },
  { href: "/egb339/ressurser", label: "Praktisk" },
  { href: "/egb339/oppsummering", label: "Hurtigark" },
];

export default function Egb339Nav() {
  const pathname = usePathname();
  const activeLink = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const link = activeLink.current;
    const nav = link?.parentElement;
    if (!link || !nav || nav.scrollWidth <= nav.clientWidth) return;
    // Only move the horizontal menu. scrollIntoView also moves the document
    // and can override Next's navigation to a knowledge-map #anchor.
    nav.scrollTo({
      left: nav.scrollLeft + link.getBoundingClientRect().left - nav.getBoundingClientRect().left
        - (nav.clientWidth - link.clientWidth) / 2,
      behavior: "auto",
    });
  }, [pathname]);

  return (
    <nav
      aria-label="EGB339-seksjoner"
      className="mb-8 flex gap-2 overflow-x-auto border-b border-[var(--card-border)] pb-3"
    >
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/egb339" && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            ref={active ? activeLink : undefined}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? "border-robotics-700 bg-robotics-700 text-white dark:border-robotics-300 dark:bg-robotics-300 dark:text-robotics-950"
                : "border-robotics-200 bg-white text-robotics-800 hover:border-robotics-400 hover:bg-robotics-50 dark:border-robotics-800 dark:bg-neutral-950 dark:text-robotics-200 dark:hover:bg-robotics-950/50"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
