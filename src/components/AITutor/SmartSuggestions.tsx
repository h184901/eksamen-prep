"use client";

import React, { useMemo } from "react";
import { useTutor } from "./TutorContext";
import { relatedSuggestions } from "@/lib/related-pages";

interface Suggestion {
  label: string;
  prompt: string;
}

function baseByPageType(pageType: string): Suggestion[] {
  switch (pageType) {
    case "teori":
      return [
        { label: "Forklar enklere", prompt: "Forklar hovedkonseptet på denne siden så enkelt som mulig, som om jeg lærer det for første gang." },
        { label: "Hverdagsanalogi", prompt: "Gi meg en god hverdagsanalogi som hjelper meg huske dette." },
        { label: "Konkret eksempel", prompt: "Gi meg et konkret, gjennomregnet eksempel som illustrerer kjernen i dette kapittelet." },
        { label: "Vanlige feil", prompt: "Hvilke typiske feil gjør studenter med dette temaet, og hvordan unngår jeg dem?" },
      ];
    case "formler":
      return [
        { label: "Når bruker jeg hvilken?", prompt: "Lag en kort beslutningsguide: hvilke av formlene på denne siden bruker jeg i hvilke situasjoner?" },
        { label: "Regneeksempel", prompt: "Velg en viktig formel fra denne siden og vis et pedagogisk regneeksempel med den." },
        { label: "Utled formelen", prompt: "Kan du utlede den viktigste formelen på denne siden fra første prinsipper?" },
        { label: "Forskjeller", prompt: "Hva er forskjellen mellom de nært beslektede formlene på denne siden?" },
      ];
    case "oppgaver":
      return [
        { label: "Gi meg et hint", prompt: "Gi meg et lite hint til den aktuelle oppgaven uten å avsløre løsningen." },
        { label: "Steg-for-steg", prompt: "Forklar løsningen på den åpne oppgaven steg for steg." },
        { label: "Lignende oppgave", prompt: "Lag en lignende oppgave jeg kan øve på, med litt andre tall." },
        { label: "Strategi", prompt: "Hvilken generell strategi bruker jeg for denne typen oppgaver?" },
      ];
    case "visualiseringer":
      return [
        { label: "Hva ser jeg?", prompt: "Forklar hva jeg ser i denne visualiseringen og hva hver parameter gjør." },
        { label: "Fysisk tolkning", prompt: "Hva er den fysiske tolkningen av det som skjer her?" },
        { label: "Eksperiment", prompt: "Foreslå et konkret eksperiment / parameterendring jeg kan prøve for å forstå bedre." },
      ];
    case "eksamen":
      return [
        { label: "Sensor-perspektiv", prompt: "Hvordan ville en sensor vurdert en besvarelse på denne oppgaven?" },
        { label: "Typiske feller", prompt: "Hva er typiske feller sensor ser etter i denne typen eksamensoppgave?" },
        { label: "Fullt løsningsforslag", prompt: "Gi meg et fullstendig eksamensverdig løsningsforslag til oppgaven jeg jobber med." },
      ];
    case "oppsummering":
      return [
        { label: "Kortversjon", prompt: "Gi meg den absolutt viktigste kortversjonen av denne oppsummeringen." },
        { label: "Test meg", prompt: "Lag 3 raske spørsmål som tester om jeg har forstått hovedpunktene." },
      ];
    default:
      return [
        { label: "Oversikt", prompt: "Gi meg en kort oversikt over det viktigste i pensum for dette faget." },
        { label: "Hvor starte?", prompt: "Jeg skal forberede meg til eksamen. Hvor bør jeg starte og hvordan prioritere?" },
      ];
  }
}

function bySubject(subject: string): Suggestion[] {
  switch (subject) {
    case "ing164":
      return [
        { label: "Frilegmediagram", prompt: "Hjelp meg tegne et riktig frilegmediagram for situasjonen i dette kapittelet." },
        { label: "Lineær↔rotasjon", prompt: "Vis meg analogien mellom lineær og rotasjonsmekanikk for temaet på denne siden." },
      ];
    case "dat109":
      return [
        { label: "UML-eksempel", prompt: "Gi meg et konkret UML-eksempel knyttet til temaet på denne siden." },
        { label: "SOLID-prinsipp", prompt: "Forklar hvilke SOLID-prinsipper som er relevante her, og vis brudd/oppfylling." },
      ];
    case "dat110":
      return [
        { label: "Lag i stakken", prompt: "Hvor i TCP/IP-stakken hører dette til, og hvorfor?" },
        { label: "Forklar protokollen", prompt: "Forklar hovedprotokollen på denne siden lag for lag." },
      ];
    default:
      return [];
  }
}

function followUps(): Suggestion[] {
  return [
    { label: "Forklar mer", prompt: "Kan du utdype det siste svaret ditt?" },
    { label: "Enda enklere", prompt: "Forklar det samme enda enklere, for en nybegynner." },
    { label: "Lag en oppgave", prompt: "Lag en øvingsoppgave basert på det vi nettopp har snakket om, med løsning." },
    { label: "Annen metode", prompt: "Finnes det en annen måte å løse eller forstå dette på?" },
  ];
}

type Tone = "past" | "followup" | "related" | "cross-page" | "base";

interface Chip {
  key: string;
  label: string;
  prompt: string;
  tone: Tone;
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1).trimEnd() + "…" : s;
}

function toneClasses(tone: Tone, isStreaming: boolean): string {
  const base = [
    "group inline-flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap",
    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
    isStreaming
      ? "opacity-50 cursor-not-allowed"
      : "hover:brightness-[1.05] active:translate-y-px",
  ].join(" ");
  switch (tone) {
    case "past":
      return `${base} bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30 hover:bg-[var(--accent)]/20`;
    case "followup":
      return `${base} bg-[var(--background)] text-[var(--foreground)] border-[var(--card-border)] hover:border-[var(--accent)]/60 hover:text-[var(--accent)]`;
    case "related":
    case "cross-page":
      return `${base} bg-[var(--background)] text-[var(--muted)] border-dashed border-[var(--card-border)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50`;
    case "base":
    default:
      return `${base} bg-[var(--background)] text-[var(--muted)] border-[var(--card-border)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50`;
  }
}

function IconFor({ tone }: { tone: Tone }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (tone) {
    case "past":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "followup":
      return (
        <svg {...common}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "related":
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </svg>
      );
    case "cross-page":
      return (
        <svg {...common}>
          <path d="M4 4h10l6 6v10H4z" />
          <path d="M14 4v6h6" />
        </svg>
      );
    case "base":
    default:
      return (
        <svg {...common}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        </svg>
      );
  }
}

export default function SmartSuggestions() {
  const { context, messages, isStreaming, sendMessage, pastQuestions } =
    useTutor();

  const hasConversation = messages.length > 0;

  const chips = useMemo<Chip[]>(() => {
    const out: Chip[] = [];
    const seenPrompts = new Set<string>();

    const push = (key: string, label: string, prompt: string, tone: Tone) => {
      const trimmed = prompt.trim();
      if (!trimmed || seenPrompts.has(trimmed)) return;
      seenPrompts.add(trimmed);
      out.push({ key, label, prompt: trimmed, tone });
    };

    pastQuestions.slice(0, 5).forEach((q, i) => {
      push(`past-${i}`, truncate(q, 38), q, "past");
    });

    if (hasConversation) {
      followUps().forEach((s, i) =>
        push(`fu-${i}`, s.label, s.prompt, "followup"),
      );
    }

    baseByPageType(context.pageType).forEach((s, i) =>
      push(`base-${i}`, s.label, s.prompt, "base"),
    );

    const related = relatedSuggestions(context);
    related.forEach((s, i) =>
      push(`rel-${i}`, s.label, s.prompt, s.kind === "cross-page" ? "cross-page" : "related"),
    );

    bySubject(context.subject).forEach((s, i) =>
      push(`subj-${i}`, s.label, s.prompt, "base"),
    );

    return out;
  }, [context, hasConversation, pastQuestions]);

  if (!chips.length) return null;

  return (
    <div className="suggestion-row border-t border-[var(--card-border)] px-3 pt-2 pb-1 relative">
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            disabled={isStreaming}
            onClick={() => sendMessage(c.prompt)}
            title={c.prompt}
            aria-label={c.prompt}
            className={toneClasses(c.tone, isStreaming)}
          >
            <span className="opacity-80 group-hover:opacity-100">
              <IconFor tone={c.tone} />
            </span>
            <span className="truncate max-w-[220px]">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
