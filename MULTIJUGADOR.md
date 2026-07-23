# Modo Multijugador Cooperativo — Ecos de Ki

## Qué se ha añadido

| Archivo | Cambio |
|---|---|
| `multiplayer.js` | **Nuevo.** Todo el motor de multijugador: salas, lobby, mapa sincronizado y combate cooperativo. |
| `firestore.rules` | **Nuevo.** Reglas de seguridad para la colección `rooms`. Hay que desplegarlas en Firebase Console. |
| `index.html` | Añadidas 5 pantallas nuevas (`mpHubScreen`, `mpLobbyScreen`, `mpMapScreen`, `mpEventScreen`, `mpBattleScreen`) y el `<script type="module" src="/multiplayer.js">`. El botón "Multijugador" del menú ya no dice "Próximamente". |
| `game.js` | El botón `modeMultiplayer` ahora llama a `window.Multiplayer.abrirHub()`. Ningún otro cambio: el modo Expedición en solitario sigue funcionando exactamente igual. |
| `style.css` | Añadidos los estilos de las pantallas nuevas al final del archivo, reutilizando la paleta y componentes existentes (`.btn-primary`, `.race-card`, `.hp-track`, `.card`…). |

No se ha tocado `data.js`, `map.js`, `auth.js` ni `firebase-init.js` — el multijugador reutiliza directamente `window.CARD_POOL`, `window.RACES`, `window.generarMapa` y `window.pickEnemyForNode`.

## Pasos para activarlo

1. **Habilitar Firestore** en el proyecto Firebase `dragonlike-3f51d` (ya usáis Firebase Auth; Firestore es un producto aparte que hay que crear una vez desde la consola: *Firestore Database → Crear base de datos*, modo producción, la región que prefiráis).
2. **Desplegar `firestore.rules`** (copiar/pegar en la pestaña "Reglas" de Firestore, o `firebase deploy --only firestore:rules` si tenéis `firebase-tools` configurado).
3. Sustituir los archivos indicados arriba en el repo y volver a compilar (`npm run build`) o correr `npm run dev`.

No hace falta ninguna dependencia nueva en `package.json`: `firebase/firestore` viene incluido en el paquete `firebase` que ya tenéis instalado (`^10.13.0`).

## Cómo funciona (resumen técnico)

- **Sala = documento Firestore.** `rooms/{codigoDeSala}` (código de 6 caracteres, ej. `K3F9XZ`), que además de identificador único hace de código de invitación.
- **Invitación:** botón "Copiar enlace de invitación" genera una URL tipo `tudominio.com/?room=K3F9XZ`; al abrirla, el código queda precargado en el campo "Unirse a sala".
- **Sincronización en tiempo real:** ambos clientes se suscriben al documento con `onSnapshot`. Cualquier cambio (el compañero elige raza, juega una carta, termina turno…) se refleja al instante en la otra pantalla.
- **Escrituras seguras:** cada acción (unirse, elegir raza, jugar carta, terminar turno, iniciar combate…) se hace con `runTransaction`, así que si los dos jugadores actúan casi a la vez no se pisan los cambios.
- **Mapa:** se genera una única vez (por el anfitrión, al pulsar "Iniciar expedición") con el mismo `generarMapa()` que el modo solitario, y ambos jugadores ven y avanzan por el mismo mapa.
- **Combate cooperativo:** cada nodo de Combate/Élite genera **2 enemigos** (1 en nodos de Jefe, pero sigue siendo "2 jugadores vs X enemigos"); los enemigos son un recurso compartido con HP/escudo comunes. Cada jugador conserva su propia mano, mazo, dados y energía. Es un sistema de **turnos simultáneos**: los dos pueden jugar cartas en el orden que prefieran contra los mismos enemigos; cuando **ambos** pulsan "Terminar", se resuelve de golpe el turno de todos los enemigos (cada uno ataca al jugador con menos HP del equipo) y se abre la siguiente ronda.
- **Derrota de un jugador ≠ derrota del equipo:** si un jugador cae a 0 HP puede seguir mirando mientras su compañero continúa; el combate solo se pierde si ambos caen.
- **Nodos especiales en cooperativo:** Descanso cura a ambos jugadores un 30% de su HP máximo con una sola pulsación; la Tienda vende con el oro individual de quien compra; los Eventos aplican el mismo resultado aleatorio a los dos jugadores.

## Limitaciones conocidas (y cómo seguir mejorándolo)

- **Sin presencia de conexión real:** Firestore no avisa si un jugador cierra la pestaña sin pulsar "Salir de la partida". Para una versión más robusta, se podría añadir Realtime Database solo para presencia (`onDisconnect`), o un timeout de turno que salte automáticamente si un jugador lleva demasiado tiempo sin actuar.
- **Sin reconexión automática tras recargar a mitad de sala nueva:** si cierras el navegador durante el *lobby* (antes de "Iniciar expedición"), puedes volver a entrar con el mismo código y el mismo usuario y seguirás en la lista de jugadores (esto sí está soportado), pero no hay una pantalla de "salas recientes" — habría que guardar el último código en `localStorage` si se quiere esa comodidad.
- **Sin objetivo de curación/ataque sobre el compañero:** las cartas de cura y defensa solo se aplican a uno mismo (igual que en solitario); ampliar esto a "curar/proteger a tu compañero" es una extensión natural del mismo `aplicarEfectoCartaMP`.
- **Limpieza de salas antiguas:** las salas nunca se borran automáticamente. Para producción, conviene una Cloud Function programada que borre documentos `rooms/*` con `updatedAt` de más de, por ejemplo, 24 horas.
