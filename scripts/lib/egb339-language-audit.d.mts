export type LanguageFinding = { line: number; text: string; wrong: number; right: number };
export function scanLanguage(text: string, language: "no" | "en"): LanguageFinding[];
