"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import UserBadge from "./UserBadge";
import Dat110LangToggle from "./dat110/Dat110LangToggle";
import Egb339LangToggle from "./egb339/Egb339LangToggle";
import { useEgb339Lang } from "@/lib/egb339-language/store";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Hjem", short: "Hjem", en: "Home" },
  { href: "/dat102", label: "DAT102 Algoritmer", short: "DAT102", en: "DAT102 Algorithms" },
  { href: "/dat107", label: "DAT107 Databaser", short: "DAT107", en: "DAT107 Databases" },
  { href: "/dat109", label: "DAT109 Systemutvikling", short: "DAT109", en: "DAT109 Systems Development" },
  { href: "/dat110", label: "DAT110 Nettverk", short: "DAT110", en: "DAT110 Networks" },
  { href: "/ing164", label: "ING164 Fysikk", short: "ING164", en: "ING164 Physics" },
  { href: "/utveksling", label: "Utveksling", short: "Utveksling", en: "Exchange" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { lang } = useEgb339Lang();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/login") return null;

  // DAT110-only: the language toggle does nothing on other subjects, so it is
  // only shown on /dat110/** routes. The EGB339 language toggle is global; on
  // /dat110 it yields the slot to DAT110's own toggle to avoid twin controls.
  const isDat110 = pathname.startsWith("/dat110");
  const english = pathname.startsWith("/egb339") && lang === "en";
  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(href)) ||
    (href === "/utveksling" && pathname.startsWith("/egb339"));

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md">
      {/* gap-6 garanterer luft mellom brand og nav selv når raden er full;
          shrink-0 hindrer at brand-teksten klemmes inn i første nav-item. */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <Link href="/" aria-label={english ? "Eksamensøving — Home" : "Eksamensøving — hjem"} className="flex shrink-0 items-center gap-2 font-bold text-lg">
          <span className="text-2xl">📚</span>
          <span className="hidden min-[480px]:inline">Eksamensøving</span>
        </Link>

        {/* The full nav needs the 1280px breakpoint to fit beside account and language controls. */}
        <div className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                isActive(item.href)
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {/* Alltid korte labels på desktop: full-label-raden (~1320px med
                  7 items + badge + toggles) overskrider max-w-6xl-containeren
                  (1120px innhold) uansett viewport. Fulle labels vises i
                  mobil-/tabletmenyen, der det er plass. */}
              {english && (item.href === "/" || item.href === "/utveksling") ? item.en : item.short}
            </Link>
          ))}
          <UserBadge />
          {isDat110 ? <Dat110LangToggle /> : <Egb339LangToggle />}
          <ThemeToggle />
        </div>

        {/* Compact menu also covers narrow desktops where the full row would overflow. */}
        <div className="flex xl:hidden items-center gap-2">
          <UserBadge />
          {isDat110 ? <Dat110LangToggle /> : <Egb339LangToggle />}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center"
            aria-label={english ? "Menu" : "Meny"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile/tablet menu — also covers 768–1023 cropped-laptop zone */}
      <div id="site-mobile-menu" hidden={!menuOpen} className="xl:hidden border-t border-[var(--card-border)] bg-[var(--background)] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {english ? item.en : item.label}
            </Link>
          ))}
      </div>
    </nav>
  );
}
