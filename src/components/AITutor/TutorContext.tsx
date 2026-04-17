"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { parsePathname, type PageContext } from "@/lib/page-context";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
  error?: boolean;
}

interface TutorState {
  isOpen: boolean;
  isMinimized: boolean;
  isExpanded: boolean;
  messages: ChatMessage[];
  isStreaming: boolean;
  context: PageContext;
  pastQuestions: string[];
  open: () => void;
  close: () => void;
  toggleMinimize: () => void;
  toggleExpand: () => void;
  collapse: () => void;
  newConversation: () => void;
  sendMessage: (text: string) => Promise<void>;
  cancelStream: () => void;
  askAboutFormula: (latex: string, title?: string) => void;
}

const TutorCtx = createContext<TutorState | null>(null);

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

const STORAGE_KEY = "ai-tutor:messages";
const PAST_Q_KEY = "ai-tutor:past-questions";
const MAX_PAST_PER_PAGE = 8;

function contextKey(ctx: PageContext): string {
  return `${ctx.subject}:${ctx.chapterId ?? "_"}:${ctx.pageType}`;
}

function readPastQuestions(ctx: PageContext): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PAST_Q_KEY);
    if (!raw) return [];
    const map = JSON.parse(raw) as Record<string, string[]>;
    return map[contextKey(ctx)] ?? [];
  } catch {
    return [];
  }
}

function writePastQuestion(ctx: PageContext, question: string): void {
  if (typeof window === "undefined") return;
  const q = question.trim();
  if (!q || q.length > 500) return;
  try {
    const raw = localStorage.getItem(PAST_Q_KEY);
    const map: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    const key = contextKey(ctx);
    const existing = (map[key] ?? []).filter((x) => x !== q);
    map[key] = [q, ...existing].slice(0, MAX_PAST_PER_PAGE);
    localStorage.setItem(PAST_Q_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function TutorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const context = useMemo(() => parsePathname(pathname), [pathname]);

  const [isOpen, setOpen] = useState(false);
  const [isMinimized, setMinimized] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setStreaming] = useState(false);
  const [pastVersion, setPastVersion] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const pastQuestions = useMemo(
    () => readPastQuestions(context),
    [context, pastVersion],
  );

  // Hydrate from sessionStorage (per-tab persistence)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const open = useCallback(() => {
    setOpen(true);
    setMinimized(false);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setMinimized(false);
    setExpanded(false);
  }, []);

  const toggleMinimize = useCallback(() => {
    setMinimized((m) => !m);
  }, []);

  const toggleExpand = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  const collapse = useCallback(() => {
    setExpanded(false);
  }, []);

  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  const newConversation = useCallback(() => {
    cancelStream();
    setMessages([]);
  }, [cancelStream]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: trimmed,
      };
      const assistantId = uid();
      const placeholder: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        pending: true,
      };

      const historyForApi = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      setMessages((prev) => [...prev, userMsg, placeholder]);
      setStreaming(true);
      writePastQuestion(context, trimmed);
      setPastVersion((v) => v + 1);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: historyForApi,
            context,
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let errMsg = `HTTP ${res.status}`;
          try {
            const j = await res.json();
            if (j?.error) errMsg = j.error;
          } catch {
            // ignore
          }
          throw new Error(errMsg);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("Ingen strøm tilgjengelig fra API.");

        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          acc += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: acc, pending: true }
                : m,
            ),
          );
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, pending: false } : m,
          ),
        );
      } catch (err) {
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        const msg = isAbort
          ? "Avbrutt."
          : err instanceof Error
            ? err.message
            : "Ukjent feil.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: m.content
                    ? `${m.content}\n\n*Feil: ${msg}*`
                    : `Kunne ikke hente svar: ${msg}`,
                  pending: false,
                  error: true,
                }
              : m,
          ),
        );
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, context, isStreaming],
  );

  const askAboutFormula = useCallback(
    (latex: string, title?: string) => {
      open();
      const label = title ? `«${title}»` : "denne formelen";
      const question = `Forklar ${label} for meg: $$${latex}$$\n\nHva betyr hver størrelse, når bruker jeg formelen, og kan du gi meg et konkret eksempel?`;
      // Fire-and-forget — sendMessage handles state
      void sendMessage(question);
    },
    [open, sendMessage],
  );

  const value = useMemo<TutorState>(
    () => ({
      isOpen,
      isMinimized,
      isExpanded,
      messages,
      isStreaming,
      context,
      pastQuestions,
      open,
      close,
      toggleMinimize,
      toggleExpand,
      collapse,
      newConversation,
      sendMessage,
      cancelStream,
      askAboutFormula,
    }),
    [
      isOpen,
      isMinimized,
      isExpanded,
      messages,
      isStreaming,
      context,
      pastQuestions,
      open,
      close,
      toggleMinimize,
      toggleExpand,
      collapse,
      newConversation,
      sendMessage,
      cancelStream,
      askAboutFormula,
    ],
  );

  return <TutorCtx.Provider value={value}>{children}</TutorCtx.Provider>;
}

export function useTutor(): TutorState {
  const ctx = useContext(TutorCtx);
  if (!ctx) {
    throw new Error("useTutor må brukes innenfor <TutorProvider>");
  }
  return ctx;
}

export function useOptionalTutor(): TutorState | null {
  return useContext(TutorCtx);
}
