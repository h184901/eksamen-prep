"use client";

import React from "react";
import { useTutor } from "./TutorContext";

export default function TutorButton() {
  const { isOpen, isMinimized, open, messages, isStreaming } = useTutor();

  const visible = !isOpen || isMinimized;
  if (!visible) return null;

  const hasMessages = messages.length > 0;

  return (
    <button
      onClick={open}
      aria-label="Åpne AI-tutor"
      className="fixed bottom-5 right-5 z-[80] group"
    >
      <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-60 group-hover:opacity-80 animate-ping-slow" />
      <span className="relative flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-gradient-to-br from-[var(--accent)] to-amber-500 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-95 transition-transform border border-white/20">
        <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M19 14l.9 2.7L22.5 17.5l-2.6.8L19 21l-.9-2.7L15.5 17.5l2.6-.8L19 14z" />
          </svg>
        </span>
        <span className="text-sm">Spør tutoren</span>
        {isStreaming && (
          <span className="ml-1 w-2 h-2 rounded-full bg-white animate-pulse" />
        )}
        {hasMessages && !isStreaming && (
          <span className="ml-1 w-2 h-2 rounded-full bg-white/80" />
        )}
      </span>
    </button>
  );
}
