import Script from "next/script";

/**
 * Google Tag Manager. El checklist pide meter el tracking por GTM en vez de
 * pegar scripts sueltos: desde el contenedor se cuelgan GA4, pixeles, etc.
 *
 * Se activa solo si NEXT_PUBLIC_GTM_ID existe en el build. Sin esa variable no
 * se emite ni una etiqueta, y la CSP tampoco abre los dominios de Google
 * (ver next.config.ts).
 */
const RAW_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/* Formato real de un contenedor: GTM-XXXXXX. Si no encaja, se ignora. */
const GTM_ID = /^GTM-[A-Z0-9]+$/i.test(RAW_GTM_ID) ? RAW_GTM_ID : "";

export function AnalyticsScript() {
  if (!GTM_ID) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Respaldo para quien navega sin JavaScript. Va justo despues de <body>. */
export function AnalyticsNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
