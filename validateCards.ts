PROMPT DEFINITIVO — RECONSTRUIR “ECOS DE KI” DESDE CERO

Quiero que construyas DESDE CERO un videojuego web completo de cartas y combate inspirado en el ritmo de los combates shonen y Dragon Ball, pero con arquitectura, UI y código propios. No reutilices ni intentes reparar ningún proyecto anterior. El objetivo es crear una base nueva, estable, modular y preparada para crecer durante meses sin romperse al añadir contenido.

El proyecto se llamará provisionalmente: ECOS DE KI.

IMPORTANTE: voy a adjuntar un documento Word llamado CATALOGO_COMPLETO_CARTAS.docx. Ese Word contiene 370 cartas diseñadas previamente y debe considerarse la fuente de verdad del catálogo. No inventes nombres, costes, tipos, textos o condiciones diferentes. Primero extrae y normaliza sus datos; luego genera el motor y el JSON. Si una carta es ambigua, conserva su texto exacto y documenta la interpretación en CARD_IMPLEMENTATION_REPORT.md; no la cambies silenciosamente.

==================================================
1. PRIORIDADES DEL PROYECTO
==================================================

Orden de prioridades obligatorio:
1) estabilidad;
2) jugabilidad;
3) arquitectura mantenible;
4) UX;
5) calidad visual;
6) contenido;
7) ampliaciones futuras.

No sacrifiques estabilidad por añadir funciones.
No me entregues una demo que “parece funcionar”. Quiero un proyecto realmente ejecutable y testeado.

Antes de considerarlo terminado deben funcionar y estar verificados:
- npm install
- npm run dev
- npm test
- npm run build
- npm run validate:cards
- navegación completa entre pantallas
- autenticación Firebase
- creación de cuenta
- inicio/cierre/restauración de sesión
- selección de raza
- creación/inicio de expedición
- mapa roguelike
- combate
- dados
- Ki
- robo de cartas
- pago de cartas
- efectos
- daño
- defensa
- recuperación
- estados
- equipamientos
- aliados
- combos
- misiones
- sagas
- escenarios
- reacciones
- transformaciones/despertar
- enemigos
- jefes por fases
- recompensas
- guardado
- multijugador base

Si una prueba depende de una configuración externa de Firebase que no puedas modificar, no finjas que ha pasado: deja el código preparado, explica exactamente qué hay que activar y separa “verificado localmente” de “requiere configuración externa”.

==================================================
2. STACK TÉCNICO
==================================================

Usa:
- Vite
- React
- TypeScript
- Firebase SDK modular
- Firebase Authentication
- Cloud Firestore
- Vitest para tests unitarios
- Playwright para smoke tests/e2e si es viable
- CSS propio moderno (sin depender de un framework visual pesado)
- Zod o un sistema equivalente para validar datos de cartas

Minimiza dependencias.
No uses librerías grandes si no aportan una ventaja clara.

El proyecto debe funcionar con:
- npm install
- npm run dev
- npm test
- npm run build

Vercel debe desplegarlo como un proyecto Vite normal.
No añadas vercel.json salvo que sea realmente necesario. Si Vercel funciona por autodetección, prefiero no tenerlo.

==================================================
3. FIREBASE EXISTENTE — NO CREAR OTRO PROYECTO
==================================================

YA EXISTE un proyecto Firebase que debemos reutilizar.
NO crees un proyecto Firebase nuevo.
NO cambies el projectId.
NO inventes otras credenciales.
NO migres el juego a otro backend.

Configuración Firebase existente:

const firebaseConfig = {
  apiKey: "AIzaSyBefHo9p2GBLEM4Xxw_VfOlslvvCP9d_-w",
  authDomain: "dragonlike-3f51d.firebaseapp.com",
  projectId: "dragonlike-3f51d",
  storageBucket: "dragonlike-3f51d.firebasestorage.app",
  messagingSenderId: "1043327320401",
  appId: "1:1043327320401:web:b31617d1452d410f45d370"
};

Esta es configuración pública del SDK web; no introduzcas credenciales privadas de Firebase Admin en el cliente.

Centraliza Firebase en:
- src/firebase/firebase.ts
- src/firebase/authService.ts
- src/firebase/firestoreService.ts

Firebase debe inicializarse una sola vez.
Los componentes de React no deben contener lógica Firebase desordenada; deben consumir servicios/hooks.

==================================================
4. FIREBASE AUTH
==================================================

Usa Firebase Authentication real como fuente de verdad.
Necesito:
- registro por email/password
- login por email/password
- logout
- restauración automática de sesión
- continuar como invitado con signInAnonymously si Anonymous está habilitado

Flujo:
APP START
→ estado “Comprobando sesión…”
→ onAuthStateChanged
→ si hay usuario: Menú principal
→ si no hay usuario: Login

Nunca debe haber botones muertos.
Cualquier error de Firebase debe mostrarse al usuario con un mensaje entendible.

Mapea como mínimo:
- auth/invalid-credential → correo o contraseña incorrectos
- auth/email-already-in-use → ya existe una cuenta
- auth/weak-password → contraseña demasiado débil
- auth/network-request-failed → error de red
- auth/operation-not-allowed → método no habilitado en Firebase
- auth/unauthorized-domain → dominio no autorizado

Registrar el error técnico completo en consola para depuración.

No crear usuarios falsos del tipo {uid:'admin-local'} para funciones que usen Firestore.
Si hay botón invitado, debe usar Firebase Anonymous real.

Documentar en FIREBASE_SETUP.md:
- habilitar Email/Password
- habilitar Anonymous si se usa invitado
- Authorized domains
- localhost
- dominio real de Vercel

El dominio usado anteriormente fue:
duragon-bateru-z-git-main-negiel.vercel.app

No hardcodees la lógica del juego a ese dominio concreto.

==================================================
5. FIRESTORE
==================================================

Usa Cloud Firestore del mismo proyecto dragonlike-3f51d.

Estructura recomendada:
users/{uid}
users/{uid}/decks/{deckId}
users/{uid}/runs/{runId}
users/{uid}/settings/main
rooms/{roomCode}

Para multijugador, roomCode es un código legible de 6 caracteres y también el ID del documento.

Implementa servicios para:
- crear sala
- unirse
- salir
- marcar listo
- iniciar partida
- sincronizar estado
- jugar acción
- pasar
- terminar ronda

Usa onSnapshot() para sincronización y runTransaction() para mutaciones críticas.

Todo estado guardado en Firestore debe ser serializable JSON.
No guardar funciones, DOM, referencias circulares, Map/Set sin convertir ni instancias complejas.

Debe existir:
serializeGameState()
deserializeGameState()

y una prueba que compruebe JSON.stringify(state) sin excepciones.

Genera firestore.rules seguras. No uses allow read, write: if true.
Los usuarios deben acceder solo a sus datos privados y solo los participantes de una room pueden modificarla.

==================================================
6. ARQUITECTURA
==================================================

Quiero separación clara de responsabilidades. Una estructura razonable sería:

src/
  app/
  core/
    gameRules.ts
    GameState.ts
    TurnManager.ts
    DiceSystem.ts
    ResourceSystem.ts
    EffectEngine.ts
  cards/
    cards.json
    cardSchema.ts
    cardTypes.ts
    CardEngine.ts
    effectHandlers/
  combat/
    CombatEngine.ts
    Combatant.ts
    EnemyAI.ts
    StatusSystem.ts
    ComboSystem.ts
    ReactionSystem.ts
    TransformationSystem.ts
  roguelike/
    MapGenerator.ts
    RewardSystem.ts
    ShopSystem.ts
    EventSystem.ts
    SagaSystem.ts
  multiplayer/
    MultiplayerService.ts
    RoomService.ts
  firebase/
    firebase.ts
    authService.ts
    firestoreService.ts
  ui/
    screens/
    components/
    hooks/
  data/
    races.json
    enemies.json
    sagas.json
    scenarios.json

tests/

No quiero un único archivo gigante con miles de líneas.

==================================================
7. SCREEN / ROUTING MANAGER
==================================================

La navegación debe estar centralizada con React Router o un sistema equivalente sencillo.

Pantallas principales:
- Loading Auth
- Login/Register
- Main Menu
- New Run / Race Selection
- Deck
- Roguelike Map
- Event
- Shop
- Rest/Training
- Battle
- Reward
- Multiplayer Hub
- Multiplayer Lobby
- Multiplayer Battle
- Settings

Una sola pantalla principal debe estar activa a la vez.
No quiero manipulación manual de classList.hidden repartida por todo el proyecto.

==================================================
8. REGLA CENTRAL DE DADOS Y KI — NO CAMBIAR
==================================================

La progresión del combate es obligatoria:

Ronda 1 → 1 dado D6
Ronda 2 → 2 dados D6
Ronda 3 → 3 dados D6
Ronda 4 → 4 dados D6
Ronda 5 → 5 dados D6
Ronda 6+ → 6 dados D6 máximo

Nunca se superan 6 dados salvo un efecto temporal explícito de una carta.

Al inicio de cada ronda:
1. procesar efectos de inicio;
2. determinar cantidad de dados = min(ronda, 6);
3. lanzar todos los dados;
4. conservar cada resultado individual;
5. calcular Ki total como suma;
6. robar 2 cartas por jugador;
7. comenzar fase de acciones.

Ejemplo:
dice = [2,5,3]
kiTotal = 10
kiSpent = 4
kiRemaining = 6

NO guardes únicamente la suma porque muchas cartas interactúan con caras concretas, dobles, tríos, 6, etc.

La UI debe mostrar:
- cada dado individual
- total de Ki
- Ki gastado
- Ki restante

==================================================
9. MANO Y MAZO
==================================================

Mazo del jugador:
- deck
- hand
- discardPile
- exile/removed si una carta lo necesita
- permanents in play

Mano inicial configurable; usa 4 como valor inicial por defecto y déjalo centralizado en gameRules.ts para poder cambiarlo fácilmente.

Cada nueva ronda roba 2 cartas.
Cuando el mazo se vacíe, baraja el descarte salvo que una regla específica lo impida.

==================================================
10. FLUJO DE ACCIONES
==================================================

Las acciones son alternas.

Ejemplo PvP:
Jugador A juega una acción.
Jugador B juega una acción.
Jugador A juega una acción.
Jugador B pasa.
Jugador A puede seguir actuando hasta pasar.
Cuando todos han pasado, termina la ronda.

El motor debe soportar un array de combatientes y NO estar diseñado solo para player vs enemy.
Debe permitir evolucionar a:
- 1v1
- todos contra todos
- Battle Royale
- jugador vs varios NPC
- cooperativo
- 2v2 futuro

==================================================
11. ATAQUES: NATURALEZA Y ALCANCE
==================================================

Cada ataque puede tener dos etiquetas independientes:

Naturaleza:
- FISICO
- KI

Alcance:
- CERCANIA
- DISTANCIA

Estas etiquetas deben afectar realmente al motor.

Ejemplos:
Kamehameha = KI + DISTANCIA
Dragon Fist = FISICO + CERCANIA

Defensas/Reacciones pueden comprobar naturaleza y alcance.

==================================================
12. TIPOS DE CARTA
==================================================

El motor debe soportar:
- ATAQUE
- DEFENSA
- RECUPERACION
- TECNICA
- HABILIDAD
- COMBO
- MISION
- SAGA
- ESCENARIO
- EQUIPAMIENTO
- ALIADO
- EVENTO
- REACCION
- ESTADO
- RACIAL
- PODER

Cada categoría tiene semántica propia.

Misión: permanece activa y registra progreso.
Saga: permanece varios turnos y avanza por capítulos.
Escenario: altera reglas globales.
Equipamiento: permanece unido al personaje.
Aliado: permanece en una zona de aliados y aporta efectos.
Reacción: abre una ventana de respuesta controlada y no puede provocar loops infinitos.
Estado: se procesa mediante StatusSystem.
Racial: valida la raza.
Combo: valida una secuencia/historial de acciones.

==================================================
13. WORD ADJUNTO Y CATÁLOGO DE 370 CARTAS
==================================================

Voy a adjuntar CATALOGO_COMPLETO_CARTAS.docx.
Contiene 370 cartas distribuidas así:
- Ataque: 30
- Defensa: 30
- Recuperación: 30
- Técnica de Ki: 30
- Habilidad: 30
- Combo: 30
- Misión: 30
- Saga: 15
- Escenario: 5
- Equipamiento: 30
- Aliado: 15
- Evento: 5
- Reacción: 20
- Estado: 5
- Raciales: 15 (5 Saiyan, 5 Freezer, 5 Namek)
- Poder: 20
- Técnicas clásicas de Dragon Ball: 30
TOTAL: 370

El Word es la fuente de verdad de contenido.
No copies las cartas manualmente en código suelto.

Primero genera un catálogo estructurado:
src/cards/cards.json

Cada carta debe conservar como mínimo:
- id
- name
- cardType
- cost
- rarity
- raceRestriction si aplica
- nature si aplica
- range si aplica
- damage si aplica
- rulesText EXACTO del Word
- conditions
- targeting
- duration
- keywords
- structuredEffects

Ejemplo:
{
  "id": "final_flash",
  "name": "Final Flash",
  "cardType": "TECNICA",
  "cost": 6,
  "nature": "KI",
  "range": "DISTANCIA",
  "damage": 10,
  "rulesText": "...texto exacto...",
  "structuredEffects": [
    { "type": "DAMAGE", "amount": 10 },
    { "type": "IGNORE_DEFENSE", "amount": 3 }
  ]
}

Evita lógica tipo:
if(card.name === 'Final Flash')...

El motor debe resolver efectos mediante handlers reutilizables.

Si una carta tiene un efecto único que no puede expresarse todavía:
- crear un handler claramente nombrado;
- documentarlo;
- mantener rulesText intacto.

==================================================
14. VALIDACIÓN DEL CATÁLOGO
==================================================

Crear:
npm run validate:cards

Debe comprobar:
- exactamente 370 cartas importadas del Word salvo que yo autorice cambios
- IDs únicos
- nombres no vacíos
- costes válidos
- tipos válidos
- razas válidas
- naturaleza/alcance válidos
- todos los structuredEffects conocidos
- todas las cartas tienen rulesText

Generar CARD_VALIDATION_REPORT.md.

También generar CARD_IMPLEMENTATION_REPORT.md con:
- implementada completamente
- interpretación aplicada
- pendiente/ambigua

No acepto cartas que existan visualmente pero cuyo efecto no esté implementado.

==================================================
15. EL WORD FINAL
==================================================

Además del Word que te adjunto, genera al final un documento limpio:
CATALOGO_COMPLETO_CARTAS_NORMALIZADO.docx

Debe generarse desde cards.json, no mediante una segunda lista manual.
Así cards.json es la fuente única para juego y documentación.

El Word debe incluir:
- introducción al sistema
- sistema de dados/Ki
- tipos de carta
- Físico/Ki
- Cercanía/Distancia
- rarezas
- palabras clave
- tabla de cantidades por tipo
- todas las cartas separadas por tipo

Para cada carta:
Nombre
Tipo
Coste
Rareza
Raza
Naturaleza
Alcance
Daño
Efecto
Condición
Duración
Objetivos
Notas

==================================================
16. RAZAS
==================================================

Razas iniciales:
- SAIYAN
- NAMEK
- FREEZER

Identidades:
SAIYAN = agresión, combos, físico, riesgo/recompensa, remontada con poca vida.
NAMEK = regeneración, control, supervivencia, estados y eficiencia.
FREEZER = Ki, control, presión, castigo a objetivos debilitados.

Las restricciones raciales deben ser validadas por el motor y por UI.

==================================================
17. DESPERTAR Y TRANSFORMACIONES
==================================================

No usar Transformación como carta normal.
Cada combatiente tiene awakeningMeter.

Se carga de forma distinta por raza.
Al completarse, el jugador puede activar una transformación/despertar durante una duración limitada.

Las transformaciones deben cambiar reglas tácticas: costes, dados, interacción, combos, etc.; no limitarse a +5 daño.

Sistema centralizado en TransformationSystem.

==================================================
18. COMBOS
==================================================

Registrar actionHistory por jugador.
Las cartas Combo pueden validar secuencias como:
FISICO → FISICO → KI
DEFENSA → ATAQUE
TECNICA → ATAQUE
etc.

Mostrar la cadena actual en UI de combate.

==================================================
19. ESTADOS
==================================================

StatusSystem centralizado.
Cada estado define:
- id
- nombre
- duración
- stacks
- trigger de procesamiento
- efecto
- condición de limpieza

Estados iniciales incluyen al menos:
Aturdido
Debilitado
Quemado
Agotado
Sellado

==================================================
20. PERMANENTES
==================================================

Zonas claras para:
- Equipamientos (máximo recomendado 3)
- Aliados
- Misiones activas
- Saga
- Escenario
- Estados

La UI debe hacer visible qué efectos están activos.

==================================================
21. ROGUELIKE
==================================================

Quiero mapa ramificado real, no una lista lineal.

Tipos de nodo:
- Combate
- Élite
- Jefe
- Evento
- Tienda
- Descanso
- Entrenamiento
- Tesoro
- Misión

El jugador debe elegir rutas con riesgo/recompensa.

==================================================
22. SAGAS
==================================================

La expedición se divide en sagas/actos.
Inicialmente:
- Llegada de los Saiyan
- Namek
- Imperio de Freezer

Cada Saga tiene:
- ambientación
- pool de enemigos
- eventos
- reglas
- miniboss
- boss
- recompensas

Arquitectura preparada para añadir más sin modificar el core.

==================================================
23. ENEMIGOS E IA
==================================================

Los NPC pueden usar patrones/IA sin mazo completo.
Arquetipos:
- AGRESIVO
- DEFENSIVO
- CONTROL
- DRENADOR_KI
- CARGADOR
- BERSERKER
- SANADOR
- INVOCADOR
- CONTRAATACANTE

Mostrar la intención de la siguiente acción del enemigo cuando corresponda.

==================================================
24. JEFES POR FASES
==================================================

Los jefes tienen fases de vida.
Ejemplo:
100–60% → fase 1
59–30% → fase 2
<30% → fase 3

Al cambiar fase:
- mensaje visual
- animación
- cambio de patrón
- técnicas nuevas
- resistencias nuevas

==================================================
25. RECOMPENSAS Y DECKBUILDING
==================================================

Tras combate mostrar elección real, por ejemplo:
- 3 cartas, eliges 1
- carta / oro / curación
- equipamiento / mejora / eliminar carta

La oferta debe ponderar:
- raza
- cartas actuales
- build
- rareza
- saga
- enemigo derrotado

No dar siempre recompensas totalmente aleatorias.

==================================================
26. RAREZAS
==================================================

COMUN
POCO_COMUN
RARA
EPICA
LEGENDARIA

Rareza afecta aparición, tienda y recompensas, no debe significar automáticamente “más rota”.

==================================================
27. MEJORAS DE CARTAS
==================================================

Las cartas pueden tener versión mejorada durante la expedición.
La mejora debe estar definida por carta, no ser un +20% global.

==================================================
28. EVENTOS NARRATIVOS
==================================================

Crear decisiones con consecuencias, no simples 60/40 aleatorios.
Las opciones pueden depender de:
- raza
- HP
- cartas
- equipamiento
- oro
- estados/progreso

==================================================
29. OBJETIVOS SECUNDARIOS
==================================================

Cada combate puede ofrecer un objetivo opcional:
- ganar antes de ronda 4
- no curarse
- usar 3 ataques físicos
- aplicar 2 estados
- bloquear X daño
- terminar con X Ki

Dan recompensa adicional.

==================================================
30. MULTIJUGADOR Y PvP
==================================================

Preparar motor para:
- cooperativo 2 jugadores
- PvP 1v1
- todos contra todos futuro

PvP usa acciones alternas y ventanas controladas de Reacción.
Evitar loops infinitos de Reacciones.

Cooperativo debe permitir:
- proteger compañero
- curar compañero
- transferir Ki
- interceptar ataques
- combos cooperativos

Cada jugador mantiene mano/mazo/dados/Ki/HP/estados propios.
Enemigos compartidos.

==================================================
31. DISEÑO VISUAL — MUY IMPORTANTE
==================================================

Quiero un acabado visual que destaque y parezca videojuego, no una web de formularios.

Inspiración estética:
- anime/shonen
- Ki/energía
- espacio y ciencia ficción
- artes marciales
- interfaces modernas de videojuegos

Sin copiar assets ni interfaces oficiales de Dragon Ball.

Paleta:
- negro/azul muy oscuro como base
- azul eléctrico y cian
- violeta
- naranja energético
- dorado/amarillo para Ki y momentos especiales

Usar:
- gradientes
- auras
- glow sutil
- partículas CSS/canvas ligeras
- microanimaciones
- transiciones fluidas
- glass/paneles energéticos donde tenga sentido
- feedback visual de impacto

No sobrecargar.
Debe funcionar bien en escritorio y móvil.

==================================================
32. PANTALLA DE COMBATE
==================================================

Debe ser la pantalla más espectacular y legible.

Mostrar claramente:
- enemigo(s)
- HP
- intención
- estados
- fase de jefe
- jugador
- HP
- Awakening
- estados
- permanentes
- mano
- dados
- Ki restante
- cadena Combo
- Saga/Escenario
- botón Pasar
- registro opcional

Cartas ampliables con hover/click/tap.

==================================================
33. DISEÑO DE CARTAS
==================================================

Cada carta debe parecer una carta real de videojuego.
Debe mostrar:
- coste
- nombre
- tipo
- imagen/arte placeholder propio
- texto
- rareza
- etiquetas Ki/Físico/Cercanía/Distancia cuando apliquen

Colores coherentes por tipo:
Ataque = rojo/naranja
Defensa = azul
Recuperación = verde
Técnica = cian/violeta
Combo = amarillo
Misión = dorado
Equipamiento = metálico
Racial = identidad de raza

==================================================
34. FEEDBACK VISUAL Y ACCESIBILIDAD
==================================================

Al hacer daño: número flotante.
Al bloquear: efecto de escudo.
Al curar: feedback verde.
Al gastar Ki: animación dados/Ki → carta.
Al completar Combo: feedback especial.
Al llenar Awakening: aura.
Al transformarse: animación destacada.

Añadir opción “Reducir animaciones”.
Diseño responsive.
Buen contraste.
Navegación teclado donde sea razonable.

==================================================
35. AUDIO
==================================================

Preparar sistema para música, SFX y UI aunque inicialmente use placeholders.
Controles de música, efectos y silenciar.

==================================================
36. GUARDADO
==================================================

Usuarios autenticados: Firestore.
Invitado anónimo Firebase: Firestore si tiene UID, con posibilidad de futura vinculación de cuenta.
Como respaldo local para preferencias no críticas: localStorage.

Guardar:
- perfil
- preferencias
- decks
- estadísticas
- run roguelike en curso

==================================================
37. TESTS OBLIGATORIOS
==================================================

Tests unitarios para:
- progresión de dados 1→2→3→4→5→6 y cap en 6
- suma Ki
- gasto Ki
- robo 2 cartas por ronda
- reshuffle de descarte
- daño
- defensa
- curación
- estados
- permanentes
- combos
- misiones
- sagas
- escenarios
- reacciones
- raciales
- transformaciones
- IA enemiga
- fases de boss
- mapa
- recompensas
- serialización Firestore

Smoke/E2E:
login mock o emulator
→ menú
→ elegir raza
→ iniciar run
→ abrir mapa
→ entrar combate
→ jugar carta
→ terminar ronda
→ comprobar que ronda 2 tiene 2 dados
→ ganar combate
→ elegir recompensa
→ volver al mapa

==================================================
38. PROCESO DE DESARROLLO POR FASES
==================================================

No construyas todo a la vez.

FASE A
- proyecto Vite/React/TS
- layout visual base
- Firebase
- Auth
- routing
- tests básicos
VALIDAR.

FASE B
- core de combate
- dados
- Ki
- turn manager
- 5 cartas de prueba
VALIDAR.

FASE C
- CardEngine
- EffectEngine
- tipos
- StatusSystem
- ReactionSystem
- ComboSystem
VALIDAR.

FASE D
- roguelike
- mapa
- IA
- rewards
VALIDAR.

FASE E
- transformaciones
- sagas
- bosses
- pulido de combate
VALIDAR.

FASE F
- multiplayer/firestore
VALIDAR.

FASE G
- importar las 370 cartas del Word
- implementar todos los efectos
- validate:cards
VALIDAR.

FASE H
- pulido visual completo
- responsive
- accesibilidad
- performance
VALIDAR.

FASE I
- npm install limpio
- npm test
- npm run validate:cards
- npm run build
- smoke test producción

Si una fase falla, arreglarla antes de continuar.

==================================================
39. ENTREGA FINAL
==================================================

Entrégame:
1) proyecto completo en ZIP
2) src/cards/cards.json
3) CATALOGO_COMPLETO_CARTAS_NORMALIZADO.docx
4) README.md
5) ARCHITECTURE.md
6) FIREBASE_SETUP.md
7) VERCEL_DEPLOY.md
8) CARD_ENGINE.md
9) CARD_VALIDATION_REPORT.md
10) CARD_IMPLEMENTATION_REPORT.md
11) TEST_REPORT.md
12) firestore.rules

README debe explicar desde cero:
- requisitos
- npm install
- npm run dev
- npm test
- npm run validate:cards
- npm run build
- deploy en Vercel

==================================================
40. CRITERIO DE ACEPTACIÓN FINAL
==================================================

No digas “debería funcionar”.
Antes de entregar, ejecuta los comandos y reporta los resultados reales.

La entrega solo se considera terminada cuando:
- build de producción pasa
- tests pasan
- catálogo valida
- no hay imports rotos
- no hay IDs duplicados
- no hay warnings graves de React
- no hay errores de consola en el flujo básico
- Login → Menú funciona
- Logout → Login funciona
- recargar con sesión → Menú funciona
- run roguelike básica funciona
- combate básico funciona
- dados progresan correctamente
- una carta de cada gran familia ha sido probada
- cards.json contiene las 370 cartas del Word

Si alguna parte no puede verificarse por configuración externa de Firebase, indícalo explícitamente y deja un checklist exacto de Firebase Console.

REGLA FINAL:
No repares el proyecto anterior.
Construye una base nueva.
El Word adjunto define las cartas.
El Firebase existente dragonlike-3f51d debe reutilizarse.
La estabilidad es más importante que añadir funciones deprisa.
