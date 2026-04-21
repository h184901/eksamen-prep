"use client";

import { useState } from "react";

type Field = "model" | "system" | "user" | "response_format" | "temperature" | "max_tokens";

const info: Record<Field, { label: string; text: React.ReactNode }> = {
  model: {
    label: "model",
    text: (
      <>
        <p>
          Vi bruker <code>gpt-4o</code> — OpenAIs multimodale modell som kan
          se bilder. Dyrere enn <code>gpt-4o-mini</code>, men betydelig mer
          presis på tolkning av befaringsbilder.
        </p>
      </>
    ),
  },
  system: {
    label: "system prompt",
    text: (
      <>
        <p>
          Instruksen modellen alltid følger. Her står rollebeskrivelsen («Du
          er en norsk byggmester»), norske prisreferanser, kalkulasjonsregler
          og bransjekontekst — alt for å pushe modellen mot realistiske
          norske priser i stedet for amerikansk snittpris.
        </p>
      </>
    ),
  },
  user: {
    label: "user content",
    text: (
      <>
        <p>
          Det brukeren har sendt inn — instruksjoner og eventuelt bilder.
          Bilder er base64-kodet i <code>data:image/...</code>-URL-er slik at
          modellen kan analysere dem direkte.
        </p>
      </>
    ),
  },
  response_format: {
    label: "response_format",
    text: (
      <>
        <p>
          <code>{`{ type: "json_object" }`}</code> tvinger modellen til å
          svare med gyldig JSON. Sparer oss for parse-feil senere.
        </p>
      </>
    ),
  },
  temperature: {
    label: "temperature",
    text: (
      <>
        <p>
          <code>0.2</code> = veldig deterministisk. Lav temperatur gir
          konsistente, forutsigbare svar — viktig når vi trenger en bestemt
          JSON-struktur og realistiske priser. Høyere verdier (f.eks.{" "}
          <code>0.8</code>) gir mer kreativitet men mer risiko for hallusinasjoner.
        </p>
      </>
    ),
  },
  max_tokens: {
    label: "max_tokens",
    text: (
      <>
        <p>
          <code>3500</code> — maksimal lengde på svaret. Tok mye tokens for et
          fullstendig tilbud med mange poster. Hvis vi setter det for lavt,
          kan JSON-en bli kuttet midt i.
        </p>
      </>
    ),
  },
};

export default function OpenAIPayloadInspector() {
  const [field, setField] = useState<Field>("system");

  return (
    <div className="rounded-xl border border-akseptert-400/40 bg-[var(--card)] overflow-hidden">
      <div className="grid md:grid-cols-[1fr_20rem]">
        <pre className="bg-neutral-950 text-neutral-100 text-[12.5px] font-mono overflow-x-auto p-4 m-0">
          <code className="block whitespace-pre">
            <span className="text-neutral-500">// body som sendes til OpenAI</span>
            {"\n"}
            {"{"}
            {"\n  "}
            <button
              type="button"
              onClick={() => setField("model")}
              className={`underline decoration-dotted underline-offset-4 hover:text-akseptert-300 ${field === "model" ? "bg-akseptert-500/20 text-akseptert-300" : "text-neutral-200"}`}
            >
              &quot;model&quot;: &quot;gpt-4o&quot;
            </button>
            {",\n  \"messages\": [\n    "}
            <button
              type="button"
              onClick={() => setField("system")}
              className={`underline decoration-dotted underline-offset-4 hover:text-akseptert-300 ${field === "system" ? "bg-akseptert-500/20 text-akseptert-300" : "text-neutral-200"}`}
            >
              {"{ \"role\": \"system\", \"content\": systemPrompt }"}
            </button>
            {",\n    "}
            <button
              type="button"
              onClick={() => setField("user")}
              className={`underline decoration-dotted underline-offset-4 hover:text-akseptert-300 ${field === "user" ? "bg-akseptert-500/20 text-akseptert-300" : "text-neutral-200"}`}
            >
              {"{ \"role\": \"user\", \"content\": [ text, ...images ] }"}
            </button>
            {"\n  ],\n  "}
            <button
              type="button"
              onClick={() => setField("response_format")}
              className={`underline decoration-dotted underline-offset-4 hover:text-akseptert-300 ${field === "response_format" ? "bg-akseptert-500/20 text-akseptert-300" : "text-neutral-200"}`}
            >
              &quot;response_format&quot;: {"{ \"type\": \"json_object\" }"}
            </button>
            {",\n  "}
            <button
              type="button"
              onClick={() => setField("max_tokens")}
              className={`underline decoration-dotted underline-offset-4 hover:text-akseptert-300 ${field === "max_tokens" ? "bg-akseptert-500/20 text-akseptert-300" : "text-neutral-200"}`}
            >
              &quot;max_tokens&quot;: 3500
            </button>
            {",\n  "}
            <button
              type="button"
              onClick={() => setField("temperature")}
              className={`underline decoration-dotted underline-offset-4 hover:text-akseptert-300 ${field === "temperature" ? "bg-akseptert-500/20 text-akseptert-300" : "text-neutral-200"}`}
            >
              &quot;temperature&quot;: 0.2
            </button>
            {"\n"}
            {"}"}
          </code>
        </pre>

        <aside className="border-t md:border-t-0 md:border-l border-akseptert-400/30 bg-gradient-to-br from-akseptert-50/80 to-indigo-50/40 dark:from-akseptert-950/40 dark:to-indigo-950/20 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-akseptert-600 dark:text-akseptert-300 mb-1">
            Forklaring
          </p>
          <h4 className="font-bold text-sm mb-2">{info[field].label}</h4>
          <div className="text-sm space-y-2 text-[var(--foreground)]/90">
            {info[field].text}
          </div>
        </aside>
      </div>
    </div>
  );
}
