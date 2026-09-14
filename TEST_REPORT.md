# TEST REPORT

## Verificado localmente

- Extracción del DOCX fuente: **370 cartas**.
- IDs: **370 únicos**.
- Distribución por sección: coincide con el documento fuente y suma 370.
- `rulesText`: presente en todas las cartas.
- Validación estructural Python del JSON: **0 errores**.
- Generación de `CATALOGO_COMPLETO_CARTAS_NORMALIZADO.docx`: completada desde `cards.json`.
- Render del DOCX normalizado: **76 páginas** generadas correctamente y revisadas como conjunto visual; no se detectaron tablas cortadas u overflow evidente.
- `JSON.stringify` es compatible por diseño del estado (objetos/arrays/primitivos; sin Map/Set/DOM/funciones).

## Preparado pero no ejecutado en este entorno

`npm install`, `npm test`, `npm run validate:cards` y `npm run build` no pudieron completarse porque el contenedor no pudo resolver `registry.npmjs.org` (DNS). Se intentó `npm install` y una comprobación HTTP; ambas fallaron por falta de resolución del host.

No se marcan esos pasos como superados.

## Firebase externo

Auth real, Firestore y multijugador requieren que Email/Password, Anonymous (si se usa), Firestore y Authorized domains estén habilitados en Firebase Console. El código está preparado, pero este entorno no puede validar la configuración remota de la consola.

## Smoke/E2E

Se incluye Playwright con un smoke test mínimo de carga. Requiere instalar dependencias y navegador Playwright en un entorno con red. Para un E2E de login completo se recomienda Firebase Emulator Suite o un proyecto de prueba con Auth/Firestore habilitados.
