Validación de integración + segunda pasada de balance
=====================================================

Catálogo
--------
- Catálogo nuevo cargado: 370 cartas.
- Cartas originales conservadas: 32.
- Total disponible en CARD_POOL: 402 cartas.

Rareza del catálogo importado
-----------------------------
- Común: 72
- Poco común: 131
- Rara: 125
- Épica: 30
- Legendaria: 12

Progresión por ronda (370 importadas)
-------------------------------------
- Ronda 1+: 267
- Ronda 2+: 91
- Ronda 3+: 12
- Todas las Legendarias requieren ronda 3+.
- Todas las cartas importadas de coste 6+ requieren al menos ronda 2.

Pruebas realizadas
------------------
- Progresión de dados conservada: 1, 2, 3, 4, 5, 6, 6...
- `Final Flash` no puede jugarse en ronda 1.
- `Dragon Fist` no puede jugarse en ronda 2 y sí se habilita en ronda 3.
- Las 370 cartas importadas se instanciaron y resolvieron con `CardEngine`: 0 errores.
- Las tiendas de progreso 0 se muestrearon 100 veces: 0 Épicas/Legendarias.
- `cloneCard()` comprobado: modificar una copia no altera el catálogo maestro.
- JavaScript validado con `node --check`:
  * public/catalog-cards.js
  * public/balance-system.js
  * public/card-engine.js
  * public/game.js
  * multiplayer.js
- Script reproducible incluido: `scripts/validate-balance.cjs`.

Compilación
-----------
El `dist/` incluido sigue correspondiendo a una compilación anterior. En este
entorno Linux el `node_modules` del proyecto contiene binarios de Windows y
Rollup no puede cargar `@rollup/rollup-linux-x64-gnu`. En el PC Windows del
proyecto ejecutar:

    npm run build

o durante desarrollo:

    npm run dev

No se cambió package.json ni package-lock.json.
