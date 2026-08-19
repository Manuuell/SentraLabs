<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logo-dark.png">
    <img src="public/logo-light.png" alt="SentraLabs" width="420">
  </picture>
</p>

<p align="center"><strong>Creamos. Probamos. Lanzamos.</strong></p>

<p align="center">
  Sitio web oficial de <strong>SentraLabs</strong>, un estudio de desarrollo de software enfocado en crear, probar y lanzar productos digitales de alto impacto.
</p>

## 🌐 Demo

Visita el sitio en vivo: [sentralabs.co](https://sentralabs.co)

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework fullstack de React (App Router) |
| [React 19](https://react.dev/) | Librería de UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Framer Motion](https://www.framer.com/motion/) | Animaciones y transiciones |
| [CSS Vanilla](https://developer.mozilla.org/es/docs/Web/CSS) | Estilos personalizados |
| VPS + Nginx + PM2 | Hosting y despliegue (el build lo hace GitHub Actions) |

## ✨ Características

- 🖥️ Diseño dark con estética de terminal
- 🌗 Tema claro / oscuro con persistencia
- 🌐 Multiidioma con URL propia por idioma (`/` español, `/en` inglés) y hreflang
- 🎬 Animaciones fluidas con Framer Motion
- 📱 Totalmente responsive
- ⚡ Optimizado para rendimiento (Next.js App Router)
- 🔤 Tipografía con estética de código (`JetBrains Mono` + `Inter`)

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Manuuell/SentraLabs.git
cd SentraLabs

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔑 Variables de entorno

Todas son opcionales: si no existen, la funcionalidad asociada queda apagada y no se emite ninguna etiqueta. En producción se definen como *repository variables* en GitHub (Settings → Secrets and variables → Actions → Variables) y el workflow de deploy las pasa al build.

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Contenedor de Google Tag Manager (`GTM-XXXXXX`). Al definirla se inyecta el tag **y** la CSP abre los dominios de Google; sin ella no se carga nada de tracking. |
| `GOOGLE_SITE_VERIFICATION` | Código de verificación de Google Search Console (solo el valor del meta, no la etiqueta completa). |
| `BING_SITE_VERIFICATION` | Código de verificación de Bing Webmaster Tools. |

Para probar en local:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX npm run dev
```

## 📦 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |

## 📁 Estructura del Proyecto

```
sentralabs/
├── app/
│   ├── i18n/           # Internacionalización ES/EN (context + traducciones)
│   ├── team/           # Equipo: datos y perfiles dinámicos (/team/[slug])
│   ├── components/     # Componentes reutilizables
│   ├── privacidad/     # Política de privacidad
│   ├── terminos/       # Términos y condiciones
│   ├── globals.css     # Estilos globales
│   ├── layout.tsx      # Layout raíz + metadata
│   ├── page.tsx        # Landing principal
│   ├── icon.png        # Favicon (App Router)
│   └── not-found.tsx   # Página 404
├── public/             # Imágenes, logos y assets estáticos
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 📬 Contacto

- ✉️ atencionsentralabs@gmail.com

## 📄 Licencia

© 2026 SentraLabs. Todos los derechos reservados.
