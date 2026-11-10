"use client";

import { useEffect, useRef, useState } from "react";
import { sanitizeCommand, sanitizeText, stripUnsafeChars } from "../lib/sanitize";

/* Terminal secreta: se abre con Enter cuando el foco no esta en un control.
   El aviso para encontrarla vive en el footer. */

/* Map y no objeto: un objeto hereda de Object.prototype, así que buscar
   "constructor" o "__proto__" devolvería algo que no es un comando. */
const terminalCommands = new Map<string, string>([
  ["help", "Comandos: help, projects, team, contact, skills, clear"],
  ["projects", "→ TransCar — App de transporte urbano en Cartagena\n→ MarSec — Plataforma de ciberseguridad (🏆 Mejor Proyecto TalentoTech)\n→ EcoOne — Reciclaje con EcoCoins"],
  ["team", "→ Manuel Esteban — Fundador\n→ Angel Acero — Co-founder / Dev\n→ Jerson Díaz — Co-founder / Dev\n→ Gelbert Cantillo — Diseñador UX/UI"],
  ["contact", "→ Email: atencionsentralabs@gmail.com\n→ WhatsApp: +57 321 564 0735\n→ GitHub: github.com/Manuuell"],
  ["skills", "Flutter · React · Next.js · TypeScript · Node.js · Firebase · Azure · OpenAI · SQL Server · Mapbox"],
]);

/* Límites de la entrada: longitud del comando y entradas guardadas en pantalla. */
const MAX_CMD_LENGTH = 64;
const MAX_HISTORY = 50;

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "", output: "Bienvenido a SentraLabs Terminal v1.0\nEscribe 'help' para ver los comandos." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* El atajo no puede quedarse con la tecla de otro: si el foco esta en un
       campo, un boton o un enlace, Enter le pertenece a ese control. Sin esto,
       quien navega con el teclado abre la terminal en vez de seguir el enlace,
       y el chat no podria enviar un mensaje. */
    const ownsEnter = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el || typeof el.tagName !== "string") return false;
      if (el.isContentEditable) return true;
      return ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(el.tagName);
    };

    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        !isOpen &&
        !e.defaultPrevented &&
        !ownsEnter(e.target)
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // echo: lo que se muestra de vuelta. cmd: lo que se busca en la tabla.
    const echo = sanitizeText(input, MAX_CMD_LENGTH);
    const cmd = sanitizeCommand(input, MAX_CMD_LENGTH);
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output =
      terminalCommands.get(cmd) ?? `Comando no encontrado: '${echo}'. Escribe 'help'.`;
    setHistory((h) => [...h, { cmd: echo, output }].slice(-MAX_HISTORY));
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-titlebar">
          <span className="code-dot red" />
          <span className="code-dot yellow" />
          <span className="code-dot green" />
          <span className="terminal-title">sentralabs@web:~$</span>
          <button className="terminal-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="terminal-body" ref={scrollRef}>
          {history.map((h, i) => (
            <div key={i}>
              {h.cmd && (
                <p className="terminal-cmd">
                  <span className="terminal-prompt">{'>'}</span> {h.cmd}
                </p>
              )}
              <pre className="terminal-output">{h.output}</pre>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="terminal-input-line">
            <span className="terminal-prompt">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(stripUnsafeChars(e.target.value).slice(0, MAX_CMD_LENGTH))}
              className="terminal-input"
              maxLength={MAX_CMD_LENGTH}
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

