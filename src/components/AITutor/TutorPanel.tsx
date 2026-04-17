"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTutor } from "./TutorContext";
import TutorMessage from "./TutorMessage";
import SmartSuggestions from "./SmartSuggestions";
import { describeContext } from "@/lib/page-context";

export default function TutorPanel() {
  const {
    isOpen,
    isMinimized,
    isExpanded,
    messages,
    isStreaming,
    context,
    close,
    toggleMinimize,
    toggleExpand,
    collapse,
    newConversation,
    sendMessage,
    cancelStream,
  } = useTutor();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // ESC: collapse expanded mode first, otherwise close
  useEffect(() => {
    if (!isOpen || isMinimized) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isExpanded) collapse();
      else close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isMinimized, isExpanded, collapse, close]);

  if (!isOpen || isMinimized) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    await sendMessage(text);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  const panelClasses = [
    "fixed z-[100] bg-[var(--background)] border border-[var(--card-border)]",
    "shadow-2xl flex flex-col overflow-hidden",
    "inset-0 md:rounded-2xl transition-[width,height,left,right,top,bottom] duration-200",
    isExpanded
      ? "md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-6 md:bottom-6 md:w-[min(1040px,calc(100vw-3rem))]"
      : "md:inset-auto md:top-4 md:bottom-4 md:right-4 md:w-[440px]",
  ].join(" ");

  const backdropVisible = isExpanded;

  return (
    <>
      {/* Mobile backdrop (always when open) + desktop backdrop when expanded */}
      <div
        className={[
          "fixed inset-0 z-[90] transition-opacity duration-200 bg-black/40",
          backdropVisible ? "md:block md:bg-black/30" : "md:hidden",
        ].join(" ")}
        onClick={isExpanded ? collapse : close}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal={isExpanded ? true : undefined}
        aria-label="AI-tutor"
        className={panelClasses}
      >
        {/* Header */}
        <header className="flex items-center gap-2 px-4 py-3 border-b border-[var(--card-border)] bg-gradient-to-r from-[var(--accent)]/10 via-transparent to-transparent">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-amber-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              <path d="M19 14l.9 2.7L22.5 17.5l-2.6.8L19 21l-.9-2.7L15.5 17.5l2.6-.8L19 14z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">AI-tutor</div>
            <div className="text-xs text-[var(--muted)] truncate">
              {describeContext(context)}
            </div>
          </div>
          <button
            type="button"
            onClick={newConversation}
            title="Ny samtale"
            aria-label="Start ny samtale"
            className="w-8 h-8 rounded-lg hover:bg-[var(--card)] text-[var(--muted)] hover:text-[var(--accent)] flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={toggleExpand}
            title={isExpanded ? "Gjør mindre" : "Utvid chat"}
            aria-label={isExpanded ? "Gjør mindre" : "Utvid chat"}
            className="hidden md:flex w-8 h-8 rounded-lg hover:bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] items-center justify-center transition-colors flex-shrink-0"
          >
            {isExpanded ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 15v6H3" />
                <path d="M3 21l7-7" />
                <path d="M15 9V3h6" />
                <path d="M21 3l-7 7" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h6v6" />
                <path d="M14 10l7-7" />
                <path d="M9 21H3v-6" />
                <path d="M10 14l-7 7" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleMinimize}
            title="Minimer"
            aria-label="Minimer"
            className="w-8 h-8 rounded-lg hover:bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] items-center justify-center transition-colors hidden md:flex flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 12h12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={close}
            title="Lukk"
            aria-label="Lukk"
            className="w-8 h-8 rounded-lg hover:bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className={[
            "flex-1 overflow-y-auto px-3 py-4 space-y-3",
            isExpanded ? "md:px-8 md:py-6" : "",
          ].join(" ")}
        >
          <div className={isExpanded ? "max-w-3xl mx-auto space-y-3" : ""}>
            {messages.length === 0 && <WelcomeCard />}
            {messages.map((m) => (
              <TutorMessage key={m.id} message={m} />
            ))}
          </div>
        </div>

        {/* Smart suggestions */}
        <SmartSuggestions />

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className={[
            "border-t border-[var(--card-border)] px-3 py-3 bg-[var(--card)]",
            isExpanded ? "md:px-8 md:py-4" : "",
          ].join(" ")}
        >
          <div className={isExpanded ? "max-w-3xl mx-auto" : ""}>
            <div className="flex items-end gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--background)] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]/50 transition-colors px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                rows={1}
                placeholder="Spør om hva som helst i dette kapittelet…"
                className="flex-1 resize-none bg-transparent outline-none text-sm placeholder:text-[var(--muted)] max-h-32"
                style={{
                  minHeight: "1.5rem",
                }}
                disabled={isStreaming}
              />
              {isStreaming ? (
                <button
                  type="button"
                  onClick={cancelStream}
                  title="Stopp"
                  aria-label="Stopp generering"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--card-border)] hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center justify-center"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="6" width="12" height="12" rx="1" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  title="Send"
                  aria-label="Send melding"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-[10px] text-[var(--muted)] mt-1.5 text-center">
              Drevet av Claude Sonnet 4.5 • Shift+Enter for ny linje • Esc for å{" "}
              {isExpanded ? "krympe" : "lukke"}
            </p>
          </div>
        </form>
      </aside>
    </>
  );
}

function WelcomeCard() {
  const { context } = useTutor();
  const ctxText = describeContext(context);

  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm space-y-2">
      <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        </svg>
        Hei Erlend!
      </div>
      <p className="text-[var(--muted)]">
        Jeg er din personlige eksamens-tutor. Jeg vet at du er på{" "}
        <span className="font-medium text-[var(--foreground)]">{ctxText}</span>,
        og jeg er her for å forklare, regne og drille med deg.
      </p>
      <p className="text-[var(--muted)]">
        Prøv en av forslagene under, eller skriv ditt eget spørsmål. Klikk på
        utvid-ikonet øverst for å få et større chatvindu.
      </p>
    </div>
  );
}
