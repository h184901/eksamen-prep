/**
 * Extract a clean, AI-pastable plain-text version of a rendered exercise DOM node.
 *
 * KaTeX-rendered math is replaced with its original LaTeX source wrapped in
 * $…$ (inline) or $$…$$ (display), so an LLM receiving the pasted text can
 * re-render or reason about the formulas. SVG illustrations are dropped.
 */
export function extractExerciseText(root: HTMLElement): string {
  const clone = root.cloneNode(true) as HTMLElement;

  clone.querySelectorAll(".katex-display").forEach((node) => {
    const latex =
      node.querySelector('annotation[encoding="application/x-tex"]')
        ?.textContent?.trim() ?? "";
    node.replaceWith(document.createTextNode(`\n$$${latex}$$\n`));
  });

  clone.querySelectorAll(".katex").forEach((node) => {
    const latex =
      node.querySelector('annotation[encoding="application/x-tex"]')
        ?.textContent?.trim() ?? "";
    node.replaceWith(document.createTextNode(`$${latex}$`));
  });

  clone.querySelectorAll("svg").forEach((node) => node.remove());

  const raw =
    (clone as HTMLElement).innerText ?? clone.textContent ?? "";

  return raw
    .split("\n")
    .map((l) => l.replace(/\s+$/g, ""))
    .reduce<string[]>((acc, line) => {
      if (line.trim() === "" && acc[acc.length - 1] === "") return acc;
      acc.push(line);
      return acc;
    }, [])
    .join("\n")
    .trim();
}

export async function copyExerciseText(
  root: HTMLElement,
  prefix?: string,
): Promise<boolean> {
  const body = extractExerciseText(root);
  const text = prefix ? `${prefix}\n\n${body}` : body;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
