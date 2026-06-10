import type { Metadata } from "next";
import type { ReactNode } from "react";

// Kun metadata-passthrough: hub- og oppsummeringssiden er klientkomponenter og
// kan ikke eksportere metadata selv. Undersider med egne titler overstyrer denne.
export const metadata: Metadata = {
  title: "DAT110 Distribuerte systemer og nettverksteknologi",
  description:
    "Eksamensøving for DAT110 — temaer, begreper, øving og tidligere eksamener.",
};

export default function Dat110Layout({ children }: { children: ReactNode }) {
  return children;
}
