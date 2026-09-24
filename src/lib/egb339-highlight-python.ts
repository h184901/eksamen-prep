/**
 * Minimal Python syntax highlighter for EGB339 code blocks.
 * Produces token spans; no dependencies. Not a full parser — a conservative
 * tokenizer that never alters the source text.
 */
export interface CodeToken {
  text: string;
  cls: "keyword" | "string" | "number" | "comment" | "builtin" | "function" | "decorator" | "self" | null;
}

const KEYWORDS = new Set([
  "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del",
  "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in",
  "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while",
  "with", "yield", "True", "False", "None",
]);

const BUILTINS = new Set([
  "abs", "all", "any", "bin", "bool", "dict", "enumerate", "filter", "float", "format",
  "hex", "input", "int", "isinstance", "len", "list", "map", "max", "min", "next",
  "oct", "open", "ord", "pow", "print", "range", "repr", "reversed", "round", "set",
  "slice", "sorted", "str", "sum", "tuple", "type", "zip",
]);

export function highlightPython(source: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let i = 0;
  const push = (text: string, cls: CodeToken["cls"]) => { if (text) tokens.push({ text, cls }); };

  while (i < source.length) {
    const ch = source[i];

    // Comments
    if (ch === "#") {
      const end = source.indexOf("\n", i);
      const stop = end === -1 ? source.length : end;
      push(source.slice(i, stop), "comment");
      i = stop;
      continue;
    }

    // Strings: single, double, triple, with optional prefix (f, r, b, u)
    const strMatch = source.slice(i).match(/^(?:[fFrRbBuU]{0,2})("""|'''|"|')/);
    if (strMatch) {
      const quote = strMatch[1];
      const start = i + strMatch[0].length;
      let end = -1;
      if (quote.length === 3) {
        end = source.indexOf(quote, start);
        end = end === -1 ? source.length : end + 3;
      } else {
        let j = start;
        while (j < source.length) {
          if (source[j] === "\\") { j += 2; continue; }
          if (source[j] === quote || source[j] === "\n") break;
          j += 1;
        }
        end = j < source.length && source[j] === quote ? j + 1 : j;
      }
      push(source.slice(i, end), "string");
      i = end;
      continue;
    }

    // Numbers
    const numMatch = source.slice(i).match(/^\d(?:[\d_]*(?:\.[\d_]*)?(?:[eE][+-]?\d+)?[jJ]?)?/);
    if (numMatch && /[\d.]/.test(ch)) {
      push(numMatch[0], "number");
      i += numMatch[0].length;
      continue;
    }

    // Decorators
    if (ch === "@") {
      const match = source.slice(i).match(/^@[\w.]+/);
      if (match) {
        push(match[0], "decorator");
        i += match[0].length;
        continue;
      }
    }

    // Identifiers / keywords
    if (/[A-Za-z_]/.test(ch)) {
      const match = source.slice(i).match(/^[A-Za-z_][\w]*/);
      const word = match![0];
      let j = i + word.length;
      // Function call: identifier followed by (
      const isCall = source[j] === "(";
      if (word === "self") push(word, "self");
      else if (KEYWORDS.has(word)) push(word, "keyword");
      else if (BUILTINS.has(word) && isCall) push(word, "builtin");
      else if (isCall) push(word, "function");
      else push(word, null);
      i = j;
      continue;
    }

    // Everything else (operators, punctuation, whitespace)
    push(ch, null);
    i += 1;
  }
  return tokens;
}
