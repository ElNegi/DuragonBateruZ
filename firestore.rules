# Integración del catálogo ampliado de cartas

Esta versión mantiene las 32 cartas originales del proyecto y añade las **370 cartas** diseñadas para el juego. El `CARD_POOL` pasa a contener 402 cartas en total sin modificar el orden de las cartas iniciales, por lo que los mazos de inicio siguen siendo los mismos.

## Archivos añadidos

- `public/catalog-cards.js`: catálogo data-driven con las 370 cartas, coste, tipo, raza, naturaleza (Físico/Ki), alcance (Cercanía/Distancia) y texto de efecto.
- `public/card-engine.js`: motor compatible con las cartas nuevas. Gestiona ataques, defensa, curación, manipulación de Ki, habilidades, combos, misiones, sagas, escenarios, equipamiento, aliados, eventos, reacciones, estados, raciales, poderes y técnicas clásicas.
- `docs/Dragon_Ball_Catalogo_Completo_370_Cartas.docx`: documento de referencia del catálogo usado para la integración.

## Archivos modificados

- `index.html`: carga `catalog-cards.js` y `card-engine.js` después de `data.js`.
- `public/game.js`: usa el motor nuevo solo para cartas importadas; las cartas originales continúan con el resolver original. Añade naturaleza/alcance a la UI y aplica la progresión de dados por ronda.
- `multiplayer.js`: integra el mismo motor en el cooperativo y mantiene la sincronización por Firestore.

## Regla de dados respetada

Dentro de **cada combate**:

- Ronda 1: 1 dado
- Ronda 2: 2 dados
- Ronda 3: 3 dados
- Ronda 4: 4 dados
- Ronda 5: 5 dados
- Ronda 6 y posteriores: 6 dados máximo

La energía del turno sigue siendo la suma de los dados, igual que en la arquitectura existente.

## Compatibilidad

Las cartas originales no se convierten ni se reemplazan. Las 370 cartas nuevas se añaden después de las existentes, de modo que el mazo inicial de cada raza conserva exactamente las primeras cartas que ya utilizaba el juego.

Las cartas raciales se añaden al pool de su raza. El resto se añade al pool Neutral para que pueda aparecer en tiendas y recompensas para cualquier raza.

## Efectos orientados a PvP / Battle Royale

El proyecto actual implementa Expedición PvE y multijugador cooperativo. Las cartas cuyo texto está pensado exclusivamente para PvP/Battle Royale se resuelven de forma segura con la parte del efecto que tiene sentido en el modo actual. No se ha convertido el cooperativo existente en PvP para evitar romper su arquitectura.

Las Reacciones se juegan como efectos preparados: quedan activas para responder al siguiente ataque enemigo compatible. Esto permite utilizarlas en el motor PvE actual sin introducir una nueva ventana de prioridad que pudiera romper el flujo existente.

## Compilación

El `dist/` incluido en el ZIP original corresponde a una compilación anterior. Después de sustituir/usar estos archivos, ejecutar en Windows:

```bash
npm run build
```

o para desarrollo:

```bash
npm run dev
```

En el entorno Linux donde se preparó esta integración no se pudo regenerar `dist/` porque el ZIP original contiene los binarios opcionales de Rollup/Esbuild para Windows. Se verificó la sintaxis de los archivos JavaScript y se ejecutó una prueba automática que cargó y resolvió las 370 cartas sin errores de ejecución.

## Segunda pasada de balance y UX

Se añadió `public/balance-system.js` para que las 370 cartas no aparezcan como un pool plano y completamente aleatorio.

### Rarezas

Cada carta recibe una rareza de forma determinista, con excepciones manuales para cartas icónicas:

- Común
- Poco común
- Rara
- Épica
- Legendaria

Distribución actual entre las 370 cartas importadas:

- 72 Comunes
- 131 Poco comunes
- 125 Raras
- 30 Épicas
- 12 Legendarias

Las cartas originales también reciben metadatos de rareza en tiempo de ejecución, sin modificar su texto ni su efecto base.

### Protección de las primeras rondas

Además del coste de energía, algunas cartas potentes tienen `rondaMinima`:

- 267 cartas importadas: ronda 1+
- 91 cartas importadas: ronda 2+
- 12 cartas importadas: ronda 3+

Las Legendarias no se pueden jugar antes de la ronda 3. Las cartas de coste 6+ esperan como mínimo hasta la ronda 2, y las cartas Raras o superiores de coste 5+ también se retrasan a la ronda 2. Esto preserva la intención del sistema de 1 dado → 2 → 3 → ... → 6 y evita que una tirada alta del primer turno permita lanzar inmediatamente un finisher.

### Tienda

La tienda ahora:

- Usa selección ponderada por rareza y progreso de expedición.
- No muestra Épicas/Legendarias al comienzo de la partida.
- Favorece cartas compatibles con la identidad de la raza seleccionada.
- Tiene una alta probabilidad de incluir al menos una carta exclusiva de la raza si todavía queda alguna disponible.
- Evita cartas ya poseídas cuando es posible.
- Calcula el precio usando coste + rareza + progreso.
- Permite renovar las ofertas hasta 2 veces con un coste creciente.
- Ya no descuenta oro si el mazo y el banquillo están llenos.

### Identidad de raza

La afinidad modifica probabilidades, no bloquea construcciones alternativas:

- **Saiyan:** Físico, Cercanía, Ataques y Combos.
- **Freezer:** Ki, Distancia, Habilidades, Estados, Reacciones y Poderes.
- **Namek:** Recuperación, Defensa, Misiones, Aliados y soporte.

### Recompensas de combate

- Combate normal: 38% de probabilidad de mini-draft de 2 cartas.
- Élite: draft garantizado de 3 cartas con peso elevado hacia Raras/Épicas.
- Jefe: draft garantizado de 3 cartas con acceso reforzado a Épicas/Legendarias.
- Siempre se puede renunciar a la carta y recibir oro.
- Si la colección está llena, la carta elegida se convierte automáticamente en oro.

### Gestión del mazo

En la pantalla de mazo ahora se muestra rareza, tipo, naturaleza, alcance, coste, ronda mínima y efecto. También se puede retirar una carta a cambio de oro. El mazo activo debe conservar al menos 8 cartas para evitar construcciones degeneradas de una o dos cartas.

Las cartas añadidas al mazo se clonan desde el pool maestro. Mejorar una carta del jugador ya no modifica accidentalmente las futuras copias de la tienda o del catálogo global.

### Mano de combate

Las cartas muestran:

- Rareza.
- Naturaleza (Físico/Ki).
- Alcance (Cercanía/Distancia).
- Requisito de ronda cuando exista.
- Motivo visible cuando una carta no puede jugarse.

El botón **Golpe Básico** ahora comprueba el coste efectivo y las condiciones reales de las cartas. Antes podía quedar oculto aunque todas las cartas de la mano fueran inválidas por una condición.
