import type { ReactNode } from "react";

type Dat107FigureImageProps =
  | {
      src: string;
      alt: string;
      imageClassName?: string;
    }
  | {
      src?: undefined;
      alt?: string;
      imageClassName?: string;
    };

export type Dat107FigureProps = Dat107FigureImageProps & {
  title?: ReactNode;
  caption?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Dat107Figure({
  title,
  caption,
  children,
  className = "",
  imageClassName = "",
  ...image
}: Dat107FigureProps) {
  return (
    <figure className={`my-6 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-dat107-300/60 bg-gradient-to-br from-white to-dat107-50/60 shadow-sm dark:border-dat107-700/50 dark:from-neutral-950 dark:to-dat107-950/20">
        {title && (
          <div className="border-b border-dat107-200/70 px-4 py-3 dark:border-dat107-800/60">
            <h3 className="text-sm font-bold uppercase tracking-wide text-dat107-700 dark:text-dat107-300">
              {title}
            </h3>
          </div>
        )}

        {image.src && (
          <div className="bg-white/80 p-3 dark:bg-neutral-950/80">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className={`mx-auto block h-auto max-h-[70vh] w-full object-contain ${imageClassName}`}
            />
          </div>
        )}

        {children && <div className="p-4">{children}</div>}
      </div>

      {caption && (
        <figcaption className="mx-auto mt-2 max-w-2xl text-center text-xs leading-relaxed text-[var(--muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
