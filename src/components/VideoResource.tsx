interface VideoResourceProps {
  title: string;
  channel: string;
  url: string;
  duration?: string;
  covers: string;
  description: string;
}

export default function VideoResource({
  title,
  channel,
  url,
  duration,
  covers,
  description,
}: VideoResourceProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:border-[var(--accent)] transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814Z" />
            <path d="m9.545 15.568 6.272-3.568-6.272-3.568v7.136Z" fill="white" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-[var(--muted)]">
            <span>{channel}</span>
            {duration && (
              <>
                <span className="text-[var(--card-border)]">|</span>
                <span>{duration}</span>
              </>
            )}
          </div>
          <div className="mt-2 inline-block px-2 py-0.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium">
            {covers}
          </div>
          <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
