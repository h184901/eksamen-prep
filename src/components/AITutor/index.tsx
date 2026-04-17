"use client";

import React from "react";
import { TutorProvider } from "./TutorContext";
import TutorButton from "./TutorButton";
import TutorPanel from "./TutorPanel";

export { useTutor, useOptionalTutor } from "./TutorContext";

export default function AITutor({ children }: { children: React.ReactNode }) {
  return (
    <TutorProvider>
      {children}
      <TutorButton />
      <TutorPanel />
    </TutorProvider>
  );
}
