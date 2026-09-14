# ECOS DE KI

Base nueva de videojuego web de cartas y combate roguelike construida con React + TypeScript + Vite y preparada para Firebase/Vercel.

## Requisitos

- Node.js 20+ (recomendado 22)
- npm 10+
- Acceso al proyecto Firebase existente `dragonlike-3f51d`

## Instalación

```bash
npm install
npm run dev
```

## Pruebas y validación

```bash
npm test
npm run validate:cards
npm run build
```

`npm run validate:cards` exige exactamente 370 cartas, IDs únicos, textos no vacíos, tipos/costes válidos y que todos los `structuredEffects` tengan handler conocido.

## Firebase

El cliente usa únicamente la configuración pública del SDK Web del proyecto existente. Consulta `FIREBASE_SETUP.md` antes de probar autenticación o salas multijugador.

## Vercel

Es un Vite SPA normal y no necesita `vercel.json` para el build base. Consulta `VERCEL_DEPLOY.md`.

## Catálogo

- Fuente de verdad original: `CATALOGO_COMPLETO_CARTAS.docx` (documento facilitado por el usuario, no duplicado dentro del ZIP).
- Fuente de verdad normalizada del juego: `src/cards/cards.json`.
- Documento generado desde JSON: `CATALOGO_COMPLETO_CARTAS_NORMALIZADO.docx`.

La rareza se deja como `null` porque el Word fuente no la define por carta; no se inventó una distribución de rarezas.

## Estado de verificación

Consulta `TEST_REPORT.md`. La validación estructural de 370 cartas y la generación/render del DOCX sí se ejecutaron localmente. La instalación npm no pudo completarse porque este entorno no tuvo resolución DNS hacia `registry.npmjs.org`, por lo que build/tests npm se dejan como **pendientes de ejecución en un entorno con red** y no se marcan falsamente como superados.
