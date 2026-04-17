"use client";

import React, { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { ChatMessage } from "./TutorContext";

function TutorMessageImpl({ message }: { message: ChatMessage }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--accent)] text-white px-4 py-2.5 text-sm whitespace-pre-wrap shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  const showTypingDots = message.pending && !message.content;

  return (
    <div className="flex gap-2 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-amber-500 flex items-center justify-center text-white shadow-sm">
        <SparkleIcon />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`rounded-2xl rounded-tl-md bg-[var(--card)] border px-4 py-3 text-sm shadow-sm ${
            message.error
              ? "border-red-300 dark:border-red-800"
              : "border-[var(--card-border)]"
          }`}
        >
          {showTypingDots ? (
            <TypingDots />
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none tutor-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {message.content}
              </ReactMarkdown>
              {message.pending && <InlineCaret />}
            </div>
          )}
        </div>
        {!message.pending && !showTypingDots && message.content && (
          <div className="flex items-center gap-2 mt-1.5 ml-1 text-[var(--muted)]">
            <button
              onClick={copy}
              className="text-xs hover:text-[var(--accent)] transition-colors flex items-center gap-1"
              title="Kopier svar"
            >
              {copied ? (
                <>
                  <CheckIcon /> Kopiert
                </>
              ) : (
                <>
                  <CopyIcon /> Kopier
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const TutorMessage = memo(TutorMessageImpl, (prev, next) => {
  return (
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content &&
    prev.message.pending === next.message.pending &&
    prev.message.error === next.message.error
  );
});

export default TutorMessage;

function SparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 14l.9 2.7L22.5 17.5l-2.6.8L19 21l-.9-2.7L15.5 17.5l2.6-.8L19 14z" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:-0.3s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:-0.15s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce" />
    </div>
  );
}

function InlineCaret() {
  return (
    <span className="inline-block w-1.5 h-4 -mb-0.5 ml-0.5 bg-[var(--accent)] animate-pulse" />
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
