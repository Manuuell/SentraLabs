"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import {
  readStoredOption,
  sanitizeText,
  stripUnsafeChars,
  writeStoredOption,
} from "../lib/sanitize";

/* Debe coincidir con MAX_MESSAGE_LENGTH del servidor: recortar aqui evita
   mandar un mensaje que alli se iba a truncar igualmente. */
const MAX_LENGTH = 1000;

/* El aviso solo se ensena una vez por navegador. */
const TEASER_STATES = ["pendiente", "visto"] as const;
const TEASER_KEY = "chat-teaser";
const TEASER_DELAY = 8000;

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

export default function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Aviso flotante: aparece tras unos segundos si nunca se cerro. */
  useEffect(() => {
    if (readStoredOption(TEASER_KEY, TEASER_STATES, "pendiente") === "visto") return;
    const timer = setTimeout(() => setTeaser(true), TEASER_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    writeStoredOption(TEASER_KEY, "visto", TEASER_STATES);
  }, []);

  /* Cerrar con Escape mientras el panel esta abierto. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Seguir el final de la conversacion mientras se escribe la respuesta. */
  useEffect(() => {
    const box = scrollRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages]);

  /* Si el componente se desmonta con una respuesta a medias, se corta. */
  useEffect(() => () => abortRef.current?.abort(), []);

  const openPanel = () => {
    dismissTeaser();
    setOpen(true);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setBusy(false);
    inputRef.current?.focus();
  };

  const send = async (raw: string) => {
    const text = sanitizeText(raw, MAX_LENGTH);
    if (!text || busy) return;

    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages(history);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const fail = (message: string) =>
      setMessages((m) => [...m, { role: "assistant", content: message }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        if (response.status === 429) fail(t.chat.rateLimited);
        else if (response.status === 503) fail(t.chat.unavailable);
        else fail(t.chat.error);
        return;
      }

      // Hueco vacio que se va rellenando con cada trozo que llega.
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: "assistant", content: answer };
          return copy;
        });
      }

      // Stream que termina sin texto: se quita el hueco y se avisa.
      if (!answer.trim()) {
        setMessages((m) => m.slice(0, -1));
        fail(t.chat.error);
      }
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") fail(t.chat.error);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  /* Las sugerencias solo tienen sentido antes del primer mensaje. */
  const showSuggestions = messages.length === 0;

  return (
    <>
      {!open && teaser && (
        <div className="chat-teaser">
          <button
            className="chat-teaser-close"
            onClick={dismissTeaser}
            aria-label={t.chat.teaserClose}
          >
            ✕
          </button>
          <button className="chat-teaser-text" onClick={openPanel}>
            💡 {t.chat.teaser}
          </button>
        </div>
      )}

      <button
        className={`chat-launcher ${open ? "is-open" : ""}`}
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? t.chat.close : t.chat.open}
        aria-expanded={open}
      >
        {open ? (
          "✕"
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label={t.chat.name}>
          <header className="chat-header">
            <span className="chat-avatar" aria-hidden="true">
              ✦
            </span>
            <div className="chat-identity">
              <strong>{t.chat.name}</strong>
              <span className="chat-status">{t.chat.status}</span>
            </div>
            <button
              className="chat-icon-btn"
              onClick={reset}
              aria-label={t.chat.reset}
            >
              ↺
            </button>
            <button
              className="chat-icon-btn"
              onClick={() => setOpen(false)}
              aria-label={t.chat.close}
            >
              ✕
            </button>
          </header>

          <div className="chat-body" ref={scrollRef}>
            <span className="chat-badge">{t.chat.badge}</span>

            <div className="chat-bubble chat-bubble-bot">{t.chat.greeting}</div>

            {messages.map((message, i) => (
              <div
                key={i}
                className={`chat-bubble ${
                  message.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                }`}
              >
                {message.content}
                {/* Ultimo turno del asistente todavia vacio: aun no llega nada. */}
                {message.role === "assistant" &&
                  !message.content &&
                  i === messages.length - 1 && (
                    <span className="chat-typing" aria-label="…">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
              </div>
            ))}

            {showSuggestions && (
              <div className="chat-suggestions">
                <span className="chat-suggestions-label">
                  {t.chat.suggestionsLabel}
                </span>
                <div className="chat-suggestions-grid">
                  {t.chat.suggestions.map((s) => (
                    <button
                      key={s.text}
                      className="chat-suggestion"
                      onClick={() => void send(s.text)}
                    >
                      <span aria-hidden="true">{s.icon}</span> {s.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={(e) => setInput(stripUnsafeChars(e.target.value).slice(0, MAX_LENGTH))}
              placeholder={t.chat.placeholder}
              maxLength={MAX_LENGTH}
              spellCheck={false}
              autoComplete="off"
              disabled={busy}
            />
            <button
              type="submit"
              className="chat-send"
              aria-label={t.chat.send}
              disabled={busy || !input.trim()}
            >
              ➤
            </button>
          </form>

          <p className="chat-disclaimer">{t.chat.disclaimer}</p>
        </div>
      )}
    </>
  );
}
