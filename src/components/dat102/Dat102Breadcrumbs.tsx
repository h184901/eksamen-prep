import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

// Brødsmulesti for DAT102-sider: Hjem / DAT102 / … (siste ledd uten lenke).
export default function Dat102Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav
      aria-label="Brødsmuler"
      className="mb-6 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-wrap"
    >
      <Link href="/" className="hover:text-dat102-600 dark:hover:text-dat102-400 transition-colors">
        Hjem
      </Link>
      <span aria-hidden>/</span>
      <Link
        href="/dat102"
        className="hover:text-dat102-600 dark:hover:text-dat102-400 transition-colors"
      >
        DAT102
      </Link>
      {trail.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          <span aria-hidden>/</span>
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="hover:text-dat102-600 dark:hover:text-dat102-400 transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-neutral-700 dark:text-neutral-200">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
