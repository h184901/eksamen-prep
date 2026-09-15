import Image from "next/image";

export default function StudyFigure({ src, alt, width, height, children, source, sourceHref }: {
  src: string; alt: string; width: number; height: number; children: React.ReactNode; source: string; sourceHref: string;
}) {
  return <figure className="egb-week-source-figure">
    <Image src={src} alt={alt} width={width} height={height} unoptimized sizes="(max-width: 1050px) 90vw, 640px" />
    <figcaption>{children}<span className="egb-week-figure-credit"><a href={sourceHref}>{source}</a></span></figcaption>
  </figure>;
}
