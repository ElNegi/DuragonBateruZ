# FIREBASE SETUP

Proyecto existente: `dragonlike-3f51d`. No crear otro proyecto ni cambiar `projectId`.

## Authentication

En Firebase Console → Authentication → Sign-in method:

1. Activar **Email/Password**.
2. Activar **Anonymous** si se desea usar “Continuar como invitado”.
3. En Authorized domains añadir `localhost` y el dominio real de Vercel.
4. El dominio usado anteriormente fue `duragon-bateru-z-git-main-negiel.vercel.app`; no está hardcodeado en la lógica del juego.

## Firestore

Crear/activar Cloud Firestore en el mismo proyecto y desplegar `firestore.rules`.

Estructura usada:

- `users/{uid}`
- `users/{uid}/decks/{deckId}`
- `users/{uid}/runs/{runId}`
- `users/{uid}/settings/main`
- `rooms/{roomCode}`

Las salas usan IDs legibles de 6 caracteres. Las actualizaciones críticas de membresía usan transacciones y la sincronización usa snapshots.

## Seguridad

No se incluye Firebase Admin ni credenciales privadas. Las reglas entregadas restringen datos privados por UID y salas a participantes autenticados.
