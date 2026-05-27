"use client";

import { useTutor } from "./AITutor";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function TutorTriggerButton({ className, children }: Props) {
  const tutor = useTutor();
  return (
    <button
      type="button"
      onClick={() => tutor.open()}
      className={className}
    >
      {children}
    </button>
  );
}
