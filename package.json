# Ecos de Ki — Mejora de dinamismo y profundidad

Esta versión amplía el proyecto **sin sustituir la base de combate**. La regla central sigue siendo:

- Ronda 1 → **1 dado D6**
- Ronda 2 → **2 dados D6**
- Ronda 3 → **3 dados D6**
- Ronda 4 → **4 dados D6**
- Ronda 5 → **5 dados D6**
- Ronda 6 y posteriores → **6 dados D6 máximo**
- La energía/Ki disponible sigue siendo la **suma de los resultados** de los dados.

## Sistemas añadidos

### 1. Resonancia de dados
Los dados siguen sumándose exactamente igual, pero determinadas combinaciones dan pequeñas bonificaciones tácticas:

- Pareja → +1 energía ese turno.
- Escalera de 3 valores consecutivos → próxima carta cuesta 1 menos.
- Trío → +2 de escudo.
- Doble 6 → +8 de Despertar.

Así, dos tiradas con la misma suma pueden crear decisiones distintas sin cambiar el sistema económico base.

### 2. Flujo de combate
Jugar acciones distintas de forma encadenada genera **Flujo**. Alternar ataque físico, Ki, defensa, recuperación, etc. es más interesante que repetir siempre la misma acción.

- Flujo 3 → el próximo ataque obtiene +1 de daño.
- Flujo perfecto (5) → roba 1 carta y acelera el Despertar.

El HUD muestra la cadena actual.

### 3. Despertar racial
Cada raza llena una barra de Despertar jugando, recibiendo daño y realizando acciones temáticas. Al llegar a 100 puede activar una forma temporal durante 3 turnos:

- Saiyan → **Super Saiyan**.
- Freezer → **Forma Final**.
- Namek → **Despertar Namekiano**.

No sustituye las cartas de Transformación existentes: es un sistema de combate adicional y temporal.

### 4. Especializaciones
Cada raza tiene tres estilos. En solitario se elige tras la primera gran victoria; en cooperativo se elige en el lobby para que los dos jugadores puedan construir un equipo con roles distintos.

**Saiyan:** Bruto, Maestro del Ki, Guerrero Adaptativo.  
**Freezer:** Ejecutor, Estratega, Tirano.  
**Namek:** Guardián, Regenerador, Místico.

### 5. Enemigos con identidad
Los enemigos ya no se limitan a atacar/bloquear/curar. Existen acciones como:

- Carga de Ki.
- Drenaje de energía.
- Aplicación de Estados.
- Rompeguardia.
- Furia acumulativa.
- Postura de contraataque.

Los enemigos muestran su arquetipo y rasgo en pantalla.

### 6. Jefes por fases
Los jefes cambian de patrón al perder determinados porcentajes de vida. Las fases pueden añadir escudo, Furia o un patrón completamente diferente.

Los Élites/Jefes también pueden **resistir la primera aplicación** de ciertos Estados. No son inmunes permanentemente: insistir en la estrategia sigue siendo útil.

### 7. Objetivos opcionales de combate
Cada encuentro puede incluir un desafío adicional, por ejemplo:

- Ganar antes de cierta ronda.
- Jugar 3 tipos distintos de carta.
- Infligir cierta cantidad de daño Físico.
- Jugar varias técnicas de Ki.
- Ganar sin usar Recuperación.
- Activar Resonancia de dados.

Cumplir el objetivo concede oro adicional y mejora la probabilidad/calidad del botín.

### 8. Sagas / Actos
Los tres Actos tienen identidad y una regla global sencilla:

1. **Llegada de los Saiyan** → ataques Físicos +1 daño.
2. **Batalla por Namek** → ataques de Ki +1 daño y curaciones +1.
3. **El Emperador Galáctico** → enemigos +1 daño, pero las victorias otorgan +10 de oro.

El nombre y efecto de la Saga se muestran en mapa y combate.

### 9. Mapa con decisiones reales
Se añadieron tres bifurcaciones, una por Acto. Elegir una ruta descarta la alternativa y ambas rutas vuelven a converger más adelante. Esto permite escoger entre riesgo, tienda, evento o élite según el estado de la expedición.

### 10. Eventos narrativos con elección
En solitario, los eventos ya no son únicamente un resultado aleatorio. Hay decisiones con coste/riesgo/recompensa: entrenar a cambio de HP u oro, ayudar a un Namekiano, investigar cápsulas, aceptar un duelo, usar un radar, atravesar una tormenta de Ki, etc.

### 11. Cooperativo: Sincronía
Alternar acciones diferentes entre ambos jugadores llena una pequeña cadena de **Sincronía de equipo**. Al completarla:

- Ambos recuperan +1 energía.
- Ambos ganan +3 de Despertar.

También se añadió **Compartir 2 Ki**, una vez por ronda por jugador, para transferir energía al compañero.

### 12. Compatibilidad de las cartas originales
Las 32 cartas originales ahora pasan por las mismas reglas de coste/Estado/Despertar/Especialización que las 370 cartas ampliadas. No se han eliminado ni reemplazado.

## Balance y catálogo

- 32 cartas originales.
- 370 cartas ampliadas.
- **402 cartas totales.**
- Rareza, progresión de ronda, recompensas, tienda y selección de botín siguen activos.

## Archivos principales nuevos/modificados

- `public/engagement-system.js` — Resonancia, Flujo, Despertar, Especializaciones, objetivos, Sagas y fases.
- `public/card-engine.js` — hooks del nuevo sistema y compatibilidad de cartas antiguas.
- `public/map.js` — bifurcaciones, enemigos/arquetipos, jefes y resistencias.
- `public/game.js` — integración completa en Expedición.
- `multiplayer.js` — integración cooperativa, Sincronía y transferencia de Ki.
- `index.html` / `style.css` — HUD y controles nuevos.
- `scripts/validate-engagement.cjs` — pruebas automáticas de las nuevas reglas.

## Validación

Ejecutar:

```bash
node scripts/validate-balance.cjs
node scripts/validate-engagement.cjs
```

La compilación de `dist` no se ha regenerado en el entorno de edición porque el ZIP original incluye los binarios nativos de Rollup para Windows y el entorno de edición es Linux. En el PC de destino:

```bash
npm run dev
# o
npm run build
```

Si las dependencias se han copiado desde otra plataforma y Rollup muestra un error de binario opcional, ejecutar una instalación limpia de dependencias en ese mismo PC antes del build.
