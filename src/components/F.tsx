"use client";

import FormulaBox from "./FormulaBox";
import { getFormula } from "@/data/ing164/formulas";

interface FProps {
  id: string;
  description?: string;
  titleOverride?: string;
}

export default function F({ id, description, titleOverride }: FProps) {
  const f = getFormula(id);
  return (
    <FormulaBox
      latex={f.latex}
      title={titleOverride ?? f.title}
      variant={f.variant}
      description={description ?? f.description}
      {...(f.meta ?? {})}
    />
  );
}
