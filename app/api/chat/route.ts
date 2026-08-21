/**
 * Proxy del asistente contra la API de OpenAI.
 *
 * Existe para que la clave no salga nunca del servidor: el navegador habla solo
 * con este mismo origen, que es lo unico que la CSP permite en connect-src.
 * De paso es el sitio donde se sanea la entrada y se limita el gasto.
 */

import {
  DAILY_LIMIT,
  MAX_HISTORY_MESSAGES,
  MAX_MESSAGE_LENGTH,
  MAX_OUTPUT_TOKENS,
  MODEL,
  RATE_LIMIT,
  SYSTEM_PROMPT,
} from "../../lib/assistant";
import { sanitizeText } from "../../lib/sanitize";

/* Hay estado en memoria (los contadores), asi que no puede prerenderizarse. */
export const dynamic = "force-dynamic";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

/* Contadores en memoria. El VPS corre una sola instancia de PM2 (fork mode),
   asi que un Map basta; con varias instancias habria que sacarlos fuera. */
const hits = new Map<string, number[]>();
let dailyCount = 0;
let dailyStamp = new Date().toDateString();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  const today = new Date().toDateString();
  if (today !== dailyStamp) {
    dailyStamp = today;
    dailyCount = 0;
  }
  if (dailyCount >= DAILY_LIMIT) return true;

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.maxPerWindow) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  dailyCount++;

  // El Map no crece sin freno: se limpian las IPs que ya no tienen ventana viva.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return false;
}

/** Primera IP de X-Forwarded-For, que es la que pone Nginx delante de Next. */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || "desconocida";
}

/** Se queda solo con lo que tiene forma de conversacion; descarta el resto. */
function parseMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  const messages: ChatMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") continue;
    const text = sanitizeText(content, MAX_MESSAGE_LENGTH);
    if (text) messages.push({ role, content: text });
  }

  // Solo el tramo final: la conversacion entera se reenvia en cada turno y es
  // lo que hace crecer el coste.
  return messages.slice(-MAX_HISTORY_MESSAGES);
}

function plain(text: string, status: number): Response {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  // 503 y no 500: no es un fallo, es que el sitio aun no tiene clave puesta.
  if (!apiKey) return plain("unavailable", 503);

  if (rateLimited(clientIp(request))) return plain("rate-limited", 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return plain("bad-request", 400);
  }

  const messages = parseMessages((payload as { messages?: unknown })?.messages);
  if (messages.length === 0) return plain("bad-request", 400);

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
      // Si OpenAI tarda demasiado, se corta aqui en vez de dejar la peticion viva.
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return plain("upstream-error", 502);
  }

  if (!upstream.ok || !upstream.body) {
    // El cuerpo del error puede traer detalles de la cuenta: se queda en el log.
    console.error("[chat] OpenAI respondio", upstream.status, await upstream.text().catch(() => ""));
    return plain("upstream-error", 502);
  }

  /* La respuesta de OpenAI llega como SSE. Al navegador se le manda solo el
     texto, que es lo unico que necesita para irlo pintando. */
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      // La ultima puede estar cortada a media linea: se guarda para el siguiente.
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta) controller.enqueue(encoder.encode(delta));
        } catch {
          /* fragmento suelto que no es JSON: se ignora */
        }
      }
    },
  });

  return new Response(upstream.body.pipeThrough(stream), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      // Nginx no debe acumular el stream en buffer o llegaria todo de golpe.
      "x-accel-buffering": "no",
    },
  });
}
