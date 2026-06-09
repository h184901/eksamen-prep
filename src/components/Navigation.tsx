"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import UserBadge from "./UserBadge";
import Dat110LangToggle from "./dat110/Dat110LangToggle";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Hjem", short: "Hjem" },
  { href: "/ing164", label: "ING164 Fysikk", short: "ING164" },
  { href: "/dat109", label: "DAT109 Systemutvikling", short: "DAT109" },
  { href: "/dat110", label: "DAT110 Nettverk", short: "DAT110" },
  { href: "/dat102", label: "DAT102 Algoritmer", short: "DAT102" },
  { href: "/dat107", label: "DAT107 Databaser", short: "DAT107" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/login") return null;

  // DAT110-only: the language toggle does nothing on other subjects, so it is
  // only shown on /dat110/** routes (next to the theme toggle).
  const isDat110 = pathname.startsWith("/dat110");

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">📚</span>
          <span>Eksamensøving</span>
        </Link>

        {/* Desktop nav — appears at lg (1024px+) so 768–1023 zone uses compact menu */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {/* Short labels (DAT110 etc.) at lg–xl, full labels at xl+ */}
              <span className="xl:hidden">{item.short}</span>
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          ))}
          <UserBadge />
          {isDat110 && <Dat110LangToggle />}
          <ThemeToggle />
        </div>

        {/* Mobile/tablet menu button — visible up to lg */}
        <div className="flex lg:hidden items-center gap-2">
          <UserBadge />
          {isDat110 && <Dat110LangToggle />}
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center"
            aria-label="Meny"
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
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--card-border)] bg-[var(--background)] px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium transition-colors ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
