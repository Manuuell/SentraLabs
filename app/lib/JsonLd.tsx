/**
 * Inserta un bloque JSON-LD (schema.org) en el HTML.
 *
 * Los datos son estaticos y nuestros, pero JSON.stringify no escapa "<", asi
 * que un valor con "</script>" podria cerrar la etiqueta antes de tiempo. Se
 * escapa a <, que dentro de JSON significa exactamente lo mismo.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
