import type { SVGProps } from "react";

/**
 * EGB339 icon set. 16×16 stroke icons, currentColor, matching the extracted
 * design reference (consistent grid, meaningful — never decorative).
 * Every icon is aria-hidden; the control's accessible name carries meaning.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return <Base {...props}><path d="M4 6l4 4 4-4" /></Base>;
}

export function IconArrowLeft(props: IconProps) {
  return <Base {...props}><path d="M10 3L5 8l5 5" /><path d="M5.5 8H13" /></Base>;
}

export function IconArrowRight(props: IconProps) {
  return <Base {...props}><path d="M6 3l5 5-5 5" /><path d="M3 8h7.5" /></Base>;
}

export function IconPlay(props: IconProps) {
  return <Base {...props}><path d="M5 3.5v9l7-4.5-7-4.5z" fill="currentColor" stroke="none" /></Base>;
}

export function IconCheck(props: IconProps) {
  return <Base {...props}><path d="M3 8.5l3.5 3.5L13 4.5" /></Base>;
}

export function IconBookOpen(props: IconProps) {
  return <Base {...props}><path d="M8 4.5C6.8 3.4 5 3 2.5 3v9.5c2.5 0 4.3.4 5.5 1.5 1.2-1.1 3-1.5 5.5-1.5V3c-2.5 0-4.3.4-5.5 1.5z" /><path d="M8 4.5V14" /></Base>;
}

export function IconFlask(props: IconProps) {
  return <Base {...props}><path d="M6.5 2h3" /><path d="M7 2v4L3.5 12a1.5 1.5 0 001.3 2.2h6.4A1.5 1.5 0 0012.5 12L9 6V2" /><path d="M5.5 10h5" /></Base>;
}

export function IconClipboardCheck(props: IconProps) {
  return <Base {...props}><path d="M5.5 2.5h5v2h-5v-2z" /><path d="M5.5 3.5H4a1 1 0 00-1 1V13a1 1 0 001 1h8a1 1 0 001-1V4.5a1 1 0 00-1-1h-1.5" /><path d="M5.5 9.5l2 2 3.5-4" /></Base>;
}

export function IconSigma(props: IconProps) {
  return <Base {...props}><path d="M11.5 3.5h-7L8 8l-3.5 4.5h7" /></Base>;
}

export function IconMenu(props: IconProps) {
  return <Base {...props}><path d="M2.5 4.5h11" /><path d="M2.5 8h11" /><path d="M2.5 11.5h11" /></Base>;
}
