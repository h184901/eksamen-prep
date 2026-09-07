import Link from "next/link";

const items = [
  { href: "/egb339", label: "Oversikt" },
  { href: "/egb339/uker", label: "Uker" },
  { href: "/egb339/temaer", label: "Temaer" },
  { href: "/egb339/vurderinger", label: "Vurderinger" },
  { href: "/egb339/ressurser", label: "Praktisk" },
  { href: "/egb339/oppsummering", label: "Hurtigark" },
];

export default function Egb339Nav() {
  return (
    <nav
      aria-label="EGB339-seksjoner"
      className="mb-8 flex gap-2 overflow-x-auto border-b border-[var(--card-border)] pb-3"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="shrink-0 rounded-full border border-robotics-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-robotics-800 transition-colors hover:border-robotics-400 hover:bg-robotics-50 dark:border-robotics-800 dark:bg-neutral-950 dark:text-robotics-200 dark:hover:bg-robotics-950/50"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
