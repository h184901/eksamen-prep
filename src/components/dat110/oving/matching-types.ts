// Lokale typer for matching-øvingen.
// Holdt LOKALT her (ikke i src/lib/dat110-vault/types.ts) per agent-boundary i P2.

import type { VaultTema, LearnMoreLink } from "@/lib/dat110-vault/types";

export interface MatchingPair {
  id: string;
  topic: VaultTema;
  /** Optional kategori for visuell gruppering (eks. "Logiske klokker"). */
  category?: string;
  /** Venstre kolonne — term/etikett. */
  left: string;
  /** Høyre kolonne — definisjon/par-konsept. */
  right: string;
  /** Lenker til konsept-/tema-sider; vises etter en korrekt match. */
  learnMoreLinks?: LearnMoreLink[];
}

export interface MatchingDataset {
  _doc?: string;
  pairs: MatchingPair[];
}
