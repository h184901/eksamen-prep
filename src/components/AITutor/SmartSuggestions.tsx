"use client";

import React from "react";
import { useTutor } from "./TutorContext";

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
        { label: "Koblinger på tvers", prompt: "Hvordan henger dette sammen med andre kapitler vi har hatt?" },
        { label: "Konkret eksempel", prompt: "Gi meg et konkret, gjennomregnet eksempel som illustrerer kjernen i dette kapittelet." },
        { label: "Vanlige feil", prompt: "Hvilke typiske feil gjør studenter med dette temaet?" },
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
        { label: "Vurder besvarelsen min", prompt: "Hvordan ville en sensor vurdert en besvarelse på denne oppgaven?" },
        { label: "Typiske feller", prompt: "Hva er typiske feller sensor ser etter i denne typen eksamensoppgave?" },
        { label: "Fullt løsningsforslag", prompt: "Gi meg et fullstendig eksamensverdig løsningsforslag til oppgaven jeg jobber med." },
      ];
    default:
      return [
        { label: "Gi meg en oversikt", prompt: "Gi meg en kort oversikt over det viktigste i pensum for dette faget." },
        { label: "Hvor bør jeg starte?", prompt: "Jeg skal forberede meg til eksamen. Hvor bør jeg starte og hvordan prioritere?" },
      ];
  }
}

function bySubject(subject: string): Suggestion[] {
  switch (subject) {
    case "ing164":
      return [
        { label: "Vis frilegmediagram", prompt: "Hjelp meg tegne et riktig frilegmediagram for situasjonen i dette kapittelet." },
        { label: "Analogi lineær↔rotasjon", prompt: "Vis meg analogien mellom lineær og rotasjonsmekanikk for temaet på denne siden." },
      ];
    case "dat109":
      return [
        { label: "UML-eksempel", prompt: "Gi meg et konkret UML-eksempel knyttet til temaet på denne siden." },
        { label: "Oversett til Java", prompt: "Vis meg hvordan jeg oversetter et UML-klassediagram til velformet Java-kode." },
        { label: "Forklar SOLID-prinsippet", prompt: "Forklar hvilke SOLID-prinsipper som er relevante her, og vis brudd/oppfylling." },
      ];
    case "dat110":
      return [
        { label: "Forklar protokollen", prompt: "Forklar hovedprotokollen på denne siden lag for lag." },
        { label: "Nettverkslag-rolle", prompt: "Hvor i TCP/IP-stakken hører dette til, og hvorfor?" },
        { label: "Eksamensoppgave-type", prompt: "Hvilken type eksamensoppgave forventer jeg på dette temaet, og hvordan løser jeg den?" },
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
    { label: "Vis annen metode", prompt: "Finnes det en annen måte å løse / forstå dette på?" },
    { label: "Oppsummér", prompt: "Gi meg et kort sammendrag av det viktigste fra samtalen så langt." },
  ];
}

export default function SmartSuggestions() {
  const { context, messages, isStreaming, sendMessage } = useTutor();

  const hasConversation = messages.length > 0;
  const suggestions = hasConversation
    ? followUps()
    : [...baseByPageType(context.pageType), ...bySubject(context.subject)];

  if (!suggestions.length) return null;

  return (
    <div className="border-t border-[var(--card-border)] px-3 pt-2 pb-1">
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {suggestions.map((s) => (
          <button
            key={s.label}
            disabled={isStreaming}
            onClick={() => sendMessage(s.prompt)}
            className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--background)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 border border-[var(--card-border)] text-[var(--muted)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
