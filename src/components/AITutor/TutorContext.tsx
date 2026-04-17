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
  messages: ChatMessage[];
  isStreaming: boolean;
  context: PageContext;
  open: () => void;
  close: () => void;
  toggleMinimize: () => void;
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

export function TutorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const context = useMemo(() => parsePathname(pathname), [pathname]);

  const [isOpen, setOpen] = useState(false);
  const [isMinimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
  }, []);

  const toggleMinimize = useCallback(() => {
    setMinimized((m) => !m);
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
      messages,
      isStreaming,
      context,
      open,
      close,
      toggleMinimize,
      newConversation,
      sendMessage,
      cancelStream,
      askAboutFormula,
    }),
    [
      isOpen,
      isMinimized,
      messages,
      isStreaming,
      context,
      open,
      close,
      toggleMinimize,
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
